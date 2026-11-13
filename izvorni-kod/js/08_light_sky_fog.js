/* =================== LIGHT, SKY, FOG =================== */
const hemi=new THREE.HemisphereLight(0xcfe8ff,0x5a6a3a,.7);scene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,2);sun.castShadow=true;const SM=small?1536:2048;sun.shadow.mapSize.set(SM,SM);
Object.assign(sun.shadow.camera,{left:-64,right:64,top:64,bottom:-64,near:10,far:340});sun.shadow.bias=-.0004;sun.shadow.normalBias=.03;
sun.target.position.set(CX,0,CZ);scene.add(sun,sun.target);
scene.fog=new THREE.FogExp2(0xcbe8fb,.0034);
const skyU={top:{value:new THREE.Color()},hz:{value:new THREE.Color()},sunDir:{value:new THREE.Vector3(0,1,0)},sunC:{value:new THREE.Color()},night:{value:0}};
const sky=new THREE.Mesh(new THREE.SphereGeometry(900,32,16),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:skyU,
  vertexShader:"varying vec3 vp;void main(){vp=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
  fragmentShader:"uniform vec3 top;uniform vec3 hz;uniform vec3 sunDir;uniform vec3 sunC;uniform float night;varying vec3 vp;void main(){float h=clamp(vp.y,0.,1.);vec3 c=mix(hz,top,pow(h,.55));if(vp.y<0.)c=hz;float s=max(dot(vp,sunDir),0.);c+=sunC*(pow(s,600.)*3.+pow(s,24.)*.35+pow(s,5.)*.12)*(1.-night*.7);gl_FragColor=vec4(c,1.);}"}));
sky.position.set(CX,0,CZ);sky.renderOrder=-10;scene.add(sky);
const starG=new THREE.BufferGeometry();{const a=[];for(let i=0;i<900;i++){const u=Math.random()*Math.PI*2,v=Math.asin(Math.random()*.95+.04),r=780;a.push(CX+Math.cos(u)*Math.cos(v)*r,Math.sin(v)*r,CZ+Math.sin(u)*Math.cos(v)*r);}starG.setAttribute("position",new THREE.Float32BufferAttribute(a,3));}
const starM=new THREE.PointsMaterial({color:0xffffff,size:1.8,sizeAttenuation:false,transparent:true,opacity:0,fog:false,depthWrite:false});scene.add(new THREE.Points(starG,starM));
function glowTex(inner,outer){const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,inner);g.addColorStop(.25,outer);g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);}
const BEAMTEX=(()=>{const c=document.createElement("canvas");c.width=4;c.height=128;const x=c.getContext("2d");const g=x.createLinearGradient(0,128,0,0);g.addColorStop(0,"rgba(255,255,255,0)");g.addColorStop(.7,"rgba(255,255,255,.35)");g.addColorStop(1,"rgba(255,255,255,1)");x.fillStyle=g;x.fillRect(0,0,4,128);const t=new THREE.CanvasTexture(c);return t;})();
const GLOW=glowTex("rgba(255,255,240,1)","rgba(255,200,110,.35)");
const sunSpr=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex("rgba(255,255,240,1)","rgba(255,230,160,.45)"),blending:THREE.AdditiveBlending,depthWrite:false,fog:false,transparent:true}));sunSpr.scale.set(140,140,1);scene.add(sunSpr);
const moonSpr=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex("rgba(255,255,250,1)","rgba(170,190,255,.3)"),blending:THREE.AdditiveBlending,depthWrite:false,fog:false,transparent:true,opacity:0}));moonSpr.scale.set(90,90,1);scene.add(moonSpr);

