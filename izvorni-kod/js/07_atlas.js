/* =================== ATLAS =================== */
/* block textures: high-res repeating sets with relief (normal) and gloss maps, packed into two atlases */
const REG=__REGIONS__;
const TX={trava:["grass_top","grass_side","dirt"],zemlja:["dirt"],pijesak:["sand"],kamen:["stone"],drvo:["log_top","log_side","log_top"],daske:["planks"],lisce:["leaves"],
  cigla:["bricks"],staklo:["glass"],snijeg:["snow"],lampion:["glowstone"],zlato:["gold"],kristal:["sealantern"],crvena:["red"],bijela:["calcite"],carlisce:["leaves_m"],
  gljiva:["mush"],sijeno:["hay_top","hay_side","hay_top"],krov:["roof"],polica:["planks","shelf","planks"],kaldrma:["cobble"],svjetlo:["froglight"],
  jesen:["leaves_a"],tresnja:["cherry"],staza:["path","dirt","dirt"],mahovina:["moss"],sljunak:["gravel"],smreka:["leaves_s"],voda:["glass"],
  pjescenjak:["b_sandstone_top","b_sandstone","b_sandstone_bottom"],kaktus:["b_cactus_top","b_cactus_side","b_cactus_top"],led:["b_packed_ice"],micelij:["b_mycelium_top","b_mycelium_side","dirt"],
  stapka:["b_mushroom_stem"],ametist:["b_amethyst"],r_ugljen:["b_coal_ore"],r_bakar:["b_copper_ore"],r_zeljezo:["b_iron_ore"],r_zlato:["b_gold_ore"],r_dijamant:["b_diamond_ore"],r_smaragd:["b_emerald_ore"],
  glina:["b_clay"],koralj_p:["b_tube_coral_block"],koralj_r:["b_brain_coral_block"],koralj_z:["b_horn_coral_block"],koralj_c:["b_fire_coral_block"],koralj_l:["b_bubble_coral_block"],
  prizmarin:["b_prismarine"],prizcigla:["b_prismarine_bricks"],duboki:["b_deepslate_top","b_deepslate","b_deepslate_top"],stol:["b_crafting_table_top","b_crafting_table_front","planks"],
  bacva:["b_barrel_top","b_barrel_side","b_barrel_top"],bundeva:["b_pumpkin_top","b_pumpkin_side","b_pumpkin_top"],lubenica:["b_melon_top","b_melon_side","b_melon_top"],oranica:["b_farmland_moist","dirt","dirt"],
  kcigla:["b_stonebricks"],smreka_d:["b_spruce_log_top","b_spruce_log","b_spruce_log_top"],breza_d:["b_birch_log_top","b_birch_log","b_birch_log_top"],lisce_b:["leaves_b"],
  tdaske:["b_dark_oak_planks"],sdaske:["b_spruce_planks"],bdaske:["b_birch_planks"],kvarc:["b_quartz_block_side"],upjescenjak:["b_chiseled_sandstone","b_cut_sandstone","b_sandstone_bottom"],
  tuf:["b_tuff_bricks"],zcigla:["b_mud_bricks"],
  vuna_c:["b_wool_red"],vuna_b:["b_wool_white"],vuna_z:["b_wool_yellow"],vuna_p:["b_wool_light_blue"],vuna_l:["b_wool_lime"],vuna_n:["b_wool_orange"],vuna_r:["b_wool_pink"],vuna_lj:["b_wool_purple"],
  vuna_t:["b_wool_blue"],vuna_zl:["b_wool_green"],vuna_ts:["b_wool_cyan"],vuna_s:["b_wool_brown"],stalak:["b_lectern_top","b_lectern_front","b_lectern_base"],polica2:["b_chiseled_bookshelf_top","b_chiseled_bookshelf","b_chiseled_bookshelf_top"],oblak:["b_wool_white"],skocni:["b_wool_pink"],pled:["b_ice"],tobogan:["b_ice"],zar:["b_fire_coral_block"],blato:["b_packed_mud"],lopoc:["moss"],jantar:["b_horn_coral_block"]};
const FACESET=[];/* per type: [top,side,bottom] region lists */
TYPES.forEach((t,i)=>{if(!t)return;const a=TX[t.k]||["stone"];FACESET[i]=[REG[a[0]],REG[a[1]||a[0]],REG[a[2]||a[0]]];});
const ATLAS_C="__ATLAS_C__",ATLAS_N="__ATLAS_N__";
const texLoader=new THREE.TextureLoader();
function atlasT(src,srgb,an){const t=texLoader.load(src,()=>{if(window.__onAtlas)window.__onAtlas();});t.colorSpace=srgb?THREE.SRGBColorSpace:THREE.NoColorSpace;
  t.magFilter=THREE.NearestFilter;t.minFilter=THREE.LinearMipmapLinearFilter;t.anisotropy=an||Math.min(8,renderer.capabilities.getMaxAnisotropy());return t;}
const atlasTex=atlasT(ATLAS_C,true),nrmTex=atlasT(ATLAS_N,false),plantTex=atlasT(ATLAS_C,true,1);
const atlasImg=new Image();atlasImg.src=ATLAS_C;
const GRAD=true;
const VOX_VERT_PARS="attribute vec4 reg;attribute vec2 lt;varying vec4 vReg;varying vec2 vUvr;varying vec3 vWN,vWT,vWB,vWP;varying vec2 vLt;uniform float uTime;\n";
const VOX_VERT="vReg=reg;vUvr=uv;vLt=lt;vWP=(modelMatrix*vec4(position,1.)).xyz;vec3 on=normal;vec3 ot=abs(on.y)>.5?vec3(1.,0.,0.):abs(on.x)>.5?vec3(0.,0.,1.):vec3(1.,0.,0.);vec3 ob=abs(on.y)>.5?vec3(0.,0.,1.):vec3(0.,-1.,0.);"+
  "mat3 mm=mat3(modelMatrix);vWN=normalize(mm*on);vWT=normalize(mm*ot);vWB=normalize(mm*ob);\n";
const VOX_SAMPLE="vec2 fu=fract(vUvr);vec2 au=vReg.xy+fu*vReg.zw;au.y=1.-au.y;vec2 gx=dFdx(vUvr)*vReg.zw,gy=dFdy(vUvr)*vReg.zw;gx.y=-gx.y;gy.y=-gy.y;\n"+
  (GRAD?"vec2 tsz=vec2(textureSize(map,0));float lm=max(dot(gx*tsz,gx*tsz),dot(gy*tsz,gy*tsz));vec4 texelColor,nrmS;\n"+
    /* close up: crisp texels (some GPUs blur magnified textures when anisotropic filtering is on) */
    "if(lm<1.){vec2 sn=(floor(au*tsz)+.5)/tsz;texelColor=textureLod(map,sn,0.);nrmS=textureLod(nrmMap,sn,0.);}else{texelColor=textureGrad(map,au,gx,gy);nrmS=textureGrad(nrmMap,au,gx,gy);}\n":
    "vec4 texelColor=texture2D(map,au);vec4 nrmS=texture2D(nrmMap,au);\n");
const voxU={uNStr:{value:1},uGS:{value:1},uMinL:{value:.03},uBlkC:{value:new THREE.Vector3(1.32,1.12,.9)},uWaterY:{value:WATER},uUnder:{value:0},uLamp:{value:new THREE.Vector4(0,-99,0,0)}};
/* light from the light grid (sky and lanterns), the sea tints and ripples what lies below it */
const VOX_LIGHT="float skyF=max(pow(.8,(1.-vLt.x)*15.),uMinL);vec3 blkL=uBlkC*pow(.79,(1.-vLt.y)*15.)*step(.02,vLt.y);"+
  "reflectedLight.directDiffuse*=skyF;reflectedLight.directSpecular*=skyF;reflectedLight.indirectDiffuse*=skyF;reflectedLight.indirectSpecular*=skyF;reflectedLight.indirectDiffuse+=diffuseColor.rgb*blkL;"+
  "vec3 lpv=uLamp.xyz-vWP;float lpd=length(lpv);float lpa=uLamp.w*clamp(1.-lpd/9.,0.,1.);lpa*=lpa;if(lpa>0.){float lnd=max(dot(normal,normalize((viewMatrix*vec4(lpv,0.)).xyz)),0.);reflectedLight.indirectDiffuse+=diffuseColor.rgb*vec3(1.,.78,.5)*lpa*(.3+.7*lnd);}"+
  "if(vWP.y<uWaterY){float dd=clamp((uWaterY-vWP.y)/8.,0.,1.);vec2 cp=vWP.xz*.55;float ca=sin(cp.x*1.7+uTime*1.1+sin(cp.y*1.3+uTime*.7)*1.6)*sin(cp.y*1.9-uTime*.9+sin(cp.x*1.1-uTime*.6)*1.6);ca=pow(.5+.5*ca,3.);"+
  "vec3 tint=mix(vec3(.82,.95,1.),vec3(.34,.62,.82),dd);reflectedLight.directDiffuse*=tint*(.55+ca*1.6);reflectedLight.indirectDiffuse*=tint;reflectedLight.directSpecular*=.3;}\n";
function voxify(mat,o){o=o||{};mat.extensions={derivatives:true};
  mat.onBeforeCompile=sh=>{sh.uniforms.nrmMap={value:nrmTex};sh.uniforms.uTime=uTime;sh.uniforms.uNStr=voxU.uNStr;sh.uniforms.uGS=voxU.uGS;
    let v=VOX_VERT_PARS+sh.vertexShader;v=v.replace("#include <begin_vertex>","#include <begin_vertex>\n"+VOX_VERT+(o.wave?"transformed+=vec3(sin(uTime*1.7+position.x*.7+position.y*.4),sin(uTime*1.3+position.z*.6)*.4,cos(uTime*1.5+position.z*.7))*.035;\n":""));
    sh.vertexShader=v;
    sh.uniforms.uMinL=voxU.uMinL;sh.uniforms.uBlkC=voxU.uBlkC;sh.uniforms.uWaterY=voxU.uWaterY;sh.uniforms.uLamp=voxU.uLamp;
    let f="uniform sampler2D nrmMap;uniform float uNStr,uGS,uMinL,uWaterY,uTime;uniform vec3 uBlkC;uniform vec4 uLamp;varying vec4 vReg;varying vec2 vUvr;varying vec3 vWN,vWT,vWB,vWP;varying vec2 vLt;\n"+sh.fragmentShader;
    f=f.replace("#include <aomap_fragment>","#include <aomap_fragment>\n"+VOX_LIGHT);
    f=f.replace("#include <map_fragment>",VOX_SAMPLE+"diffuseColor*=texelColor;\n");
    f=f.replace("#include <roughnessmap_fragment>","float roughnessFactor=clamp(pow(1.-nrmS.b,2.)*"+(o.rough||"1.")+",.18,1.);\n");
    f=f.replace("#include <normal_fragment_maps>","vec2 nxy=(nrmS.rg*2.-1.)*uNStr;float nzz=sqrt(max(.001,1.-dot(nxy,nxy)));vec3 nw=normalize(vWT*nxy.x-vWB*nxy.y*uGS+vWN*nzz);normal=normalize((viewMatrix*vec4(nw,0.)).xyz);\n");
    if(o.glow)f=f.replace("#include <emissivemap_fragment>","totalEmissiveRadiance*=texelColor.rgb*texelColor.rgb*2.2;\n");
    sh.fragmentShader=f;};
  mat.customProgramCacheKey=()=>"vox"+(o.wave?1:0)+(o.glow?1:0)+(o.rough||"");return mat;}
function voxDepth(){const m=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,map:atlasTex,alphaTest:.5});m.extensions={derivatives:true};
  m.onBeforeCompile=sh=>{sh.uniforms.nrmMap={value:nrmTex};sh.uniforms.uTime=uTime;
    sh.vertexShader=VOX_VERT_PARS+sh.vertexShader.replace("#include <begin_vertex>","#include <begin_vertex>\n"+VOX_VERT+"transformed+=vec3(sin(uTime*1.7+position.x*.7+position.y*.4),sin(uTime*1.3+position.z*.6)*.4,cos(uTime*1.5+position.z*.7))*.035;\n");
    sh.fragmentShader="uniform sampler2D nrmMap;varying vec4 vReg;varying vec2 vUvr;varying vec3 vWN,vWT,vWB,vWP;varying vec2 vLt;\n"+sh.fragmentShader.replace("#include <map_fragment>",VOX_SAMPLE+"diffuseColor*=texelColor;\n");};
  m.customProgramCacheKey=()=>"voxdepth";return m;}
const matOpaque=voxify(new THREE.MeshStandardMaterial({map:atlasTex,vertexColors:true,roughness:1,metalness:0}));
const matLeaf=voxify(new THREE.MeshStandardMaterial({map:atlasTex,vertexColors:true,roughness:1,metalness:0,alphaTest:.5}),{wave:1});
const matGlass=voxify(new THREE.MeshStandardMaterial({map:atlasTex,vertexColors:true,transparent:true,depthWrite:false,roughness:.1,metalness:.1}),{rough:".2"});
const matGlow=voxify(new THREE.MeshStandardMaterial({map:atlasTex,vertexColors:true,emissive:0xffffff,emissiveIntensity:.48,roughness:.6}),{glow:1});
const leafDepth=voxDepth();
function regionOf(t,f,x,y,z){const L=FACESET[t][f===0?0:f===2?2:1];return L.length>1?L[Math.floor(hash3(x*3+f,y,z)*L.length)%L.length]:L[0];}
const iconCache={};
function icon(t){if(iconCache[t])return iconCache[t];if(!atlasImg.complete||!atlasImg.naturalWidth)return "";const c=document.createElement("canvas");c.width=c.height=88;const x=c.getContext("2d");x.imageSmoothingEnabled=false;
  const AW=atlasImg.naturalWidth,AH=atlasImg.naturalHeight;
  const face=(f,a,b,cc,d,e,ff,shade)=>{const r=FACESET[t][f][0];x.save();x.setTransform(a,b,cc,d,e,ff);x.drawImage(atlasImg,r[0]*AW,r[1]*AH,32,32,0,0,32,32);
    x.globalCompositeOperation="source-atop";x.fillStyle="rgba(10,20,40,"+shade+")";x.fillRect(0,0,32,32);x.restore();};
  const s=30/32;face(1,s,s*.5,0,s*1.12,14,28,.18);face(1,s,-s*.5,0,s*1.12,44,43,.36);face(0,s,s*.5,-s,s*.5,44,13,0);
  return iconCache[t]=c.toDataURL();}

