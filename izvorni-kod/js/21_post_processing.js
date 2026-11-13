/* =================== POST PROCESSING =================== */
/* contact shadows (desktop), soft glow on bright things, gentle colour grade, edge smoothing */
const rtMain=new THREE.WebGLRenderTarget(innerWidth,innerHeight,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBAFormat,});rtMain.otokDisplay=true;/* scene materials tone-map and encode straight into the composer buffers */
const composer=new THREE.EffectComposer(renderer,rtMain);composer.renderTarget1.otokDisplay=composer.renderTarget2.otokDisplay=true;
const renderPass=new THREE.RenderPass(scene,camera);composer.addPass(renderPass);
let ssao=null;
if(!small){try{ssao=new THREE.SSAOPass(scene,camera,innerWidth,innerHeight);ssao.kernelRadius=5;ssao.minDistance=.0005;ssao.maxDistance=.02;composer.addPass(ssao);renderPass.enabled=false;
  const ro=ssao.renderOverride.bind(ssao);const hid=[];ssao.renderOverride=function(r,m,rt,c,a){hid.length=0;scene.traverseVisible(o=>{if(o.isSprite||o.isPoints||o.isLine||o.userData.noAO)hid.push(o);});hid.forEach(o=>o.visible=false);ro(r,m,rt,c,a);hid.forEach(o=>o.visible=true);};}catch(e){console.warn("SSAO off",e&&e.message);ssao=null;renderPass.enabled=true;}}
const bloom=new THREE.UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.32,.5,.86);composer.addPass(bloom);
const grade=new THREE.ShaderPass({uniforms:{tDiffuse:{value:null},uNight:{value:0}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
  fragmentShader:"uniform sampler2D tDiffuse;uniform float uNight;varying vec2 vUv;"+
  "void main(){vec3 c=max(texture2D(tDiffuse,vUv).rgb,0.);float l=dot(c,vec3(.299,.587,.114));c=mix(vec3(l),c,1.1);c=mix(c,c*vec3(1.04,1.,.95),.55*(1.-uNight));c=mix(c,c*c*(3.-2.*c),.18);vec2 d=vUv-.5;c*=1.-dot(d,d)*(.5+uNight*.3);gl_FragColor=vec4(c,1.);}"});
composer.addPass(grade);
const fxaa=new THREE.ShaderPass(THREE.FXAAShader);composer.addPass(fxaa);fxaa.enabled=!rtMain.samples;/* true multisampling keeps edges crisp where the device has the power; FXAA only on small screens */
function postSize(){const pr=renderer.getPixelRatio();composer.setPixelRatio(pr);composer.setSize(innerWidth,innerHeight);if(ssao)ssao.setSize(innerWidth*pr,innerHeight*pr);fxaa.uniforms.resolution.value.set(1/(innerWidth*pr),1/(innerHeight*pr));}
let qual=small?1:2;/* 2: full, 1: no AO, 0: lean */
function setQual(q){qual=q;if(ssao){ssao.enabled=q>=2;renderPass.enabled=!ssao.enabled;}bloom.enabled=q>=1;}

