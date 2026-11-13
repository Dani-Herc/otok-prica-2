import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {SSAOPass} from 'three/addons/postprocessing/SSAOPass.js';
import {GTAOPass} from 'three/addons/postprocessing/GTAOPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {SMAAPass} from 'three/addons/postprocessing/SMAAPass.js';
import {FXAAShader} from 'three/addons/shaders/FXAAShader.js';
import {CopyShader} from 'three/addons/shaders/CopyShader.js';
import {SimplexNoise} from 'three/addons/math/SimplexNoise.js';

/* The game keeps its own colour handling (colours are converted by hand, lights use the classic non-physical scale). */
T.ColorManagement.enabled=false;
const C=T.ShaderChunk;let n=0;const rep=(k,a,b)=>{const s=C[k];if(!s.includes(a))console.warn("otok three patch missed",k,a);else n++;C[k]=s.split(a).join(b);};
rep("lights_pars_begin","vec3 irradiance = ambientLightColor;","vec3 irradiance = ambientLightColor * PI;");
rep("lights_pars_begin","light.color = directionalLight.color;","light.color = directionalLight.color * PI;");
rep("lights_pars_begin","light.color = pointLight.color;","light.color = pointLight.color * PI;");
rep("lights_pars_begin","light.color = spotLight.color * spotAttenuation;","light.color = spotLight.color * spotAttenuation * PI;");
rep("lights_pars_begin","vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );","vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight ) * PI;");
{const k="lights_pars_begin",s=C[k],i=s.indexOf("float getDistanceAttenuation("),j=s.indexOf("\n}",i);
 if(i<0||j<0)console.warn("otok three patch missed attenuation");else C[k]=s.slice(0,i)+"float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\treturn 1.0;"+s.slice(j);}

class PointLight extends T.PointLight{constructor(c,i,d=0,decay=1){super(c,i,d,decay);}}
/* SSAO that draws the scene itself first, like the pass the game was written against */
class SSAOPassSelf extends SSAOPass{
  constructor(scene,camera,w,h,k){super(scene,camera,w,h,k);this.selfBeauty=true;}
  renderOverride(r,m,rt,c,a){return SSAOPass.prototype._renderOverride.call(this,r,m,rt,c,a);}
  _renderOverride(r,m,rt,c,a){return this.renderOverride(r,m,rt,c,a);}
  render(renderer,writeBuffer,readBuffer,dt,mask){
    if(this.selfBeauty){const ac=renderer.autoClear;renderer.autoClear=true;renderer.setRenderTarget(readBuffer);renderer.render(this.scene,this.camera);renderer.autoClear=ac;}
    super.render(renderer,writeBuffer,readBuffer,dt,mask);}
}
const THREE=Object.assign({},T,{PointLight,EffectComposer,RenderPass,ShaderPass,SSAOPass:SSAOPassSelf,SSAOPassBase:SSAOPass,GTAOPass,UnrealBloomPass,OutputPass,SMAAPass,FXAAShader,CopyShader,SimplexNoise,OTOK_PATCHES:n});
window.THREE=THREE;
