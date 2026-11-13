/* =================== v48: SVIJET: a cleaner, more detailed world ===================
   1. Leaves: the ambient-occlusion pass drew every leaf block as a solid cube, so the gaps between leaves were
      shaded as if something were there (a grey veil in the crowns and a dark halo around trees). The pass now
      draws leaves with their real cut-out shape. */
if(ssao){try{
  const leafNrm=new THREE.ShaderMaterial({uniforms:{map:{value:atlasTex},nrmMap:{value:nrmTex},uTime},
    vertexShader:VOX_VERT_PARS+"varying vec3 vNv;void main(){"+VOX_VERT+"vec3 tp=position+vec3(sin(uTime*1.7+position.x*.7+position.y*.4),sin(uTime*1.3+position.z*.6)*.4,cos(uTime*1.5+position.z*.7))*.035;vNv=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(tp,1.);}",
    fragmentShader:"uniform sampler2D map,nrmMap;varying vec4 vReg;varying vec2 vUvr;varying vec3 vWN,vWT,vWB,vWP,vNv;varying vec2 vLt;void main(){"+VOX_SAMPLE+"if(texelColor.a<.5)discard;gl_FragColor=vec4(normalize(vNv)*.5+.5,1.);}"});
  leafNrm.extensions={derivatives:true};
  const ro=ssao.renderOverride;let bad=0;
  ssao.renderOverride=function(r,m,rt,c,a){if(bad||m!==ssao.normalMaterial)return ro.apply(this,arguments);
    const lv=[];for(const k in chunks){const mm=chunks[k].m&&chunks[k].m.leaf;if(mm&&mm.visible&&chunks[k].g.visible!==false){lv.push(mm);mm.visible=false;}}
    ro.apply(this,arguments);for(const mm of lv){mm.visible=true;mm.layers.enable(1);}
    if(!lv.length)return;const om=scene.overrideMaterial,ac=r.autoClear,mask=camera.layers.mask,prt=r.getRenderTarget();
    try{scene.overrideMaterial=leafNrm;r.autoClear=false;camera.layers.set(1);r.setRenderTarget(rt);r.render(scene,camera);}catch(e){bad=1;console.warn("leaf ao",e);}
    camera.layers.mask=mask;r.autoClear=ac;scene.overrideMaterial=om;r.setRenderTarget(prt);};
}catch(e){console.warn("svijet",e);}}

/* 2. Bridges. The old bridge was a strip of plank cubes with a wall of cubes on each side, stair-stepped because
      the bridges run diagonally. Now the cubes are only the hidden floor you walk on. On top sits a straight timber
      bridge: a plank deck, kerb beams, railings with posts, lantern posts with little roofs, flower boxes on the
      outer ledge and a gate arch with a banner at the shore. Lantern light still comes from real lantern blocks,
      now set into the floor under the planks. The railing is a thin unseen wall, so nobody slips into the sea. */
const MO={list:[],tex:null,k:.62};
function moTex(){if(MO.tex)return MO.tex;const cv=document.createElement("canvas");cv.width=64;cv.height=64;const g=cv.getContext("2d");let sd=7;const rnd=()=>{sd=(sd*16807)%2147483647;return sd/2147483647;};
  for(let p=0;p<4;p++){const base=[[176,124,72],[164,112,62],[184,134,82],[158,108,60]][p],off=Math.floor(rnd()*64);
    for(let y=0;y<64;y+=4)for(let x=0;x<16;x+=4){const n=(rnd()-.5)*18,gr=((y+off)%64<4)?-34:0,ed=(x===0)?-26:(x===12?-8:0);g.fillStyle="rgb("+Math.round(base[0]+n+gr+ed)+","+Math.round(base[1]+n+gr+ed)+","+Math.round(base[2]+n*.7+gr+ed)+")";g.fillRect(p*16+x,y,4,4);}
    g.fillStyle="rgba(60,40,24,.75)";g.fillRect(p*16+6,(off+8)%64,2,2);g.fillRect(p*16+6,(off+56)%64,2,2);}
  const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.magFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;return MO.tex=t;}
/* the timber bridge along angle a, from distance ra to rb from the middle of the map, built into parent */
function moSkin(parent,a,ra,rb,o){o=o||{};const c=Math.cos(a),s=Math.sin(a),px=-s,pz=c,Y=DBY,len=rb-ra,q=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),-a),K=MO.k;
  const B={dark:[],mid:[],light:[],stone:[],lamp:[],ban:[],f0:[],f1:[],f2:[],leaf:[]};
  const put=(L,r,w,y,l,h,wd)=>L.push(new THREE.Matrix4().compose(new THREE.Vector3(128.5+c*r+px*w,y,128.5+s*r+pz*w),q,new THREE.Vector3(l,h,wd)));
  const tx=moTex().clone();tx.needsUpdate=true;tx.repeat.set(len/2,3.25);
  const deck=new THREE.Mesh(new THREE.BoxGeometry(len,.14,6.5),new THREE.MeshStandardMaterial({map:tx,color:new THREE.Color(K,K,K),roughness:.95,fog:!o.far}));deck.position.set(128.5+c*(ra+len/2),Y+1.0,128.5+s*(ra+len/2));deck.quaternion.copy(q);deck.receiveShadow=!o.far;parent.add(deck);
  for(const sg of [-1,1]){put(B.dark,ra+len/2,sg*3.2,Y+.42,len,1.62,.26);put(B.mid,ra+len/2,sg*3.2,Y+1.27,len,.1,.36);
    put(B.dark,ra+len/2,sg*1.95,Y+2.12,len,.16,.2);put(B.mid,ra+len/2,sg*1.95,Y+1.62,len,.1,.1);put(B.dark,ra+len/2,sg*1.95,Y+1.13,len,.14,.3);
    for(let r=ra+1.5;r<rb-.5;r+=3){put(B.dark,r,sg*1.95,Y+1.62,.24,1.16,.24);put(B.light,r,sg*1.95,Y+2.25,.32,.1,.32);}
    for(let r=ra+5.5,i=0;r<rb-1;r+=9,i++){put(B.dark,r,sg*2.6,Y+2.3,.26,2.5,.26);put(B.dark,r,sg*2.6,Y+1.2,.5,.3,.5);put(B.dark,r,sg*2.42,Y+3.5,.16,.16,.62);
      put(B.lamp,r,sg*2.25,Y+3.12,.44,.5,.44);put(B.dark,r,sg*2.25,Y+3.43,.62,.1,.62);put(B.dark,r,sg*2.25,Y+3.53,.34,.1,.34);put(B.dark,r,sg*2.25,Y+2.84,.5,.07,.5);
      if(r+4.5<rb-1){const fr=r+4.5,fl=[B.f0,B.f1,B.f2];put(B.mid,fr,sg*2.62,Y+1.26,1.7,.36,.56);put(B.leaf,fr,sg*2.62,Y+1.47,1.5,.12,.4);for(let j=0;j<4;j++)put(fl[(i+j+(sg>0?1:0))%3],fr-.57+j*.38,sg*(2.56+(j%2)*.12),Y+1.6+(j%2)*.06,.2,.2,.2);}}
    put(B.stone,ra+len/2,sg*2.4,Y-.2,len,.4,.5);}
  for(let r=ra+5.5;r<rb-1;r+=9)put(B.stone,r,0,Y-.2,.6,.4,5.2);
  if(o.arch){const r=ra+2.2;for(const sg of [-1,1]){put(B.dark,r,sg*2.3,Y+3.1,.4,4.1,.4);put(B.stone,r,sg*2.3,Y+1.35,.7,.6,.7);put(B.light,r,sg*2.3,Y+5.2,.56,.14,.56);}
    put(B.dark,r,0,Y+4.75,.4,.4,5.6);put(B.mid,r,0,Y+5.0,.56,.12,6);put(B.ban,r,0,Y+4.0,.08,1.1,1.9);put(B.ban,r,0,Y+3.32,.08,.3,1.1);put(B.light,r,0,Y+4.1,.1,.34,.34);}
  const C={dark:0x5d3f24,mid:0x8a6238,light:0xc79a5e,stone:0x8d8a84,ban:o.ban||0xf2b22e,f0:0xe8556a,f1:0xffd34d,f2:0xf6f1e6,leaf:0x4f9a3e};
  for(const k in B){const L=B[k];if(!L.length)continue;const col=LC(C[k]).multiplyScalar(k==="lamp"?1:K);
    const m=k==="lamp"?new THREE.MeshStandardMaterial({color:LC(0xffe2a0).multiplyScalar(.5),emissive:LC(0xffb648),emissiveIntensity:.85,roughness:.5,fog:!o.far}):new THREE.MeshStandardMaterial({color:col,roughness:.92,fog:!o.far});
    const im=new THREE.InstancedMesh(new THREE.BoxGeometry(1,1,1),m,L.length);L.forEach((mx,i)=>im.setMatrixAt(i,mx));im.instanceMatrix.needsUpdate=true;im.castShadow=!o.far&&k!=="lamp";im.receiveShadow=!o.far;im.frustumCulled=false;parent.add(im);}}
dBridge=function(a,gateKey){const c=Math.cos(a),s=Math.sin(a),px=-s,pz=c,Y=DBY;let r0=45;
  for(let r=112;r>30;r-=.5){const x=Math.floor(128.5+c*r),z=Math.floor(128.5+s*r);if(hmap[x+z*W]>=Y+1){r0=r;break;}}
  const cells=new Map();for(let r=r0-1.5;r<=128.4;r+=.3)for(let w=-3.3;w<=3.3;w+=.3){const x=Math.floor(128.5+c*r+px*w),z=Math.floor(128.5+s*r+pz*w);if(!inb(x,1,z))continue;const dx=x-128,dz=z-128,cw=Math.abs(dx*px+dz*pz),cr=dx*c+dz*s;if(cw>2.45||cr<r0-2.2)continue;cells.set(x+","+z,{x,z});}
  for(const q of cells.values()){for(let y=Y+1;y<=Y+5;y++){vox[I(q.x,y,q.z)]=0;prot[I(q.x,y,q.z)]=0;}wput(q.x,Y,q.z,T.daske,1);}
  for(let r=r0+5.5;r<=126;r+=9)for(const w of [-1.5,1.5]){const x=Math.floor(128.5+c*r+px*w),z=Math.floor(128.5+s*r+pz*w);if(!inb(x,1,z))continue;wput(x,Y,z,T.lampion,1);for(let y=Y-1;y>=1&&!vox[I(x,y,z)];y--)wput(x,y,z,T.kcigla,1);}
  if(gateKey){const g=[];const r=r0+7;for(let w=-2;w<=2;w+=.5)for(let y=Y+1;y<=Y+3;y++){const x=Math.floor(128.5+c*r+px*w),z=Math.floor(128.5+s*r+pz*w);wput(x,y,z,y===Y+3?T.zlato:T.kcigla,1);g.push([x,y,z]);}DQ.gate[gateKey]={cells:g,x:128.5+c*r,z:128.5+s*r};}
  let ban=0xf2b22e;try{if(!HERE)for(const k of DSK)if(Math.abs(DST[k].a-a)<1e-6)ban={luka:0x3a7fd0,dolina:0xe86aa0,gora:0x4a9a5a}[k]||ban;}catch(e){}
  try{MO.list.push({c,s,px,pz,r0});moSkin(scene,a,r0-1.2,128.4,{arch:true,ban});}catch(e){console.warn("most",e);}
  return r0;};
/* the unseen wall along the railings */
function moWall(x,y,z){if(!MO.list.length||y<DBY+1||y>=DBY+2.5)return false;const dx=x-128.5,dz=z-128.5;for(const b of MO.list){const r=dx*b.c+dz*b.s;if(r<b.r0+1.2||r>129)continue;const w=Math.abs(dx*b.px+dz*b.pz);if(w>1.82&&w<2.3)return true;}return false;}
{const _sa=solidAt;solidAt=function(x,y,z){return _sa(x,y,z)||moWall(x,y,z);};}
/* the far half of each bridge, on the lands you see across the water */
{const _di=dImp;dImp=function(k){const grp=_di.apply(this,arguments);try{const A=k?DST[k].b:(HERE?DST[HERE].a:null);if(A==null||!grp)return grp;
    const kill=[];grp.children.forEach(o=>{const p=o.geometry&&o.geometry.parameters;if(!p)return;if(p.width===56||(p.width===.8&&p.height===2.6)||(p.width===1&&p.height===1&&p.depth===1&&o.material&&o.material.isMeshBasicMaterial&&Math.abs(o.position.y-(DBY+3.7))<.01))kill.push(o);});kill.forEach(o=>grp.remove(o));
    moSkin(grp,A,50,72.6,{far:1});}catch(e){console.warn("most daleko",e);}return grp;};}
