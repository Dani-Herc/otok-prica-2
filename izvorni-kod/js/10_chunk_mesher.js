/* =================== CHUNK MESHER =================== */
const FACES=[
 {n:[-1,0,0],c:[[0,1,0],[0,0,0],[0,1,1],[0,0,1]],f:1},
 {n:[1,0,0],c:[[1,1,1],[1,0,1],[1,1,0],[1,0,0]],f:1},
 {n:[0,-1,0],c:[[1,0,1],[0,0,1],[1,0,0],[0,0,0]],f:2},
 {n:[0,1,0],c:[[0,1,1],[1,1,1],[0,1,0],[1,1,0]],f:0},
 {n:[0,0,-1],c:[[1,0,0],[0,0,0],[1,1,0],[0,1,0]],f:1},
 {n:[0,0,1],c:[[0,0,1],[1,0,1],[0,1,1],[1,1,1]],f:1}];
const AO=[.5,.68,.85,1];
const isLeaf=t=>t&&TYPES[t].leaf;
const kindOf=ty=>ty.water?"water":ty.glass?"glass":ty.glow?"glow":ty.leaf?"leaf":"opaque";
const occ=(x,y,z)=>{const t=get(x,y,z);if(!t||TYPES[t].water||TYPES[t].glass)return 0;return TYPES[t].leaf?.6:1;};
/* world-space texture coordinates: repeating sets tile across neighbouring blocks, random sets pick one tile per face */
function faceUV(F,r,x,y,z,c){const n=F.n;let u,v,lu,lv;
  if(n[1]){u=x+c[0];v=z+c[2];lu=c[0];lv=c[2];}else if(n[0]){u=z+c[2];v=-(y+c[1]);lu=c[2];lv=1-c[1];}else{u=x+c[0];v=-(y+c[1]);lu=c[0];lv=1-c[1];}
  if(r[4]===1&&r[5]===1)return [lu*.998+.001,lv*.998+.001];return [u/r[4],v/r[5]];}
function shadeVar(t,x,y,z){if(TYPES[t].glow)return 1;let v=1+(hash3(x,y,z)-.5)*.08;if(t===T.trava){v*=.94+vnoise(x*.15,z*.15,7)*.14;}return v;}
function meshChunk(cx,cz,kind,glowOut){if(kind==="water")return meshWater(cx,cz);
  const P=[],N=[],U=[],C=[],R=[],X=[],LT=[];const x0=cx*CS,z0=cz*CS;
  for(let y=0;y<H;y++)for(let z=z0;z<z0+CS;z++)for(let x=x0;x<x0+CS;x++){
    const t=vox[I(x,y,z)];if(!t)continue;const ty=TYPES[t];if(kindOf(ty)!==kind)continue;
    if(glowOut&&ty.glow)glowOut.push([x+.5,y+.5,z+.5,t]);
    const sv=shadeVar(t,x,y,z);
    for(const F of FACES){const nx=x+F.n[0],ny=y+F.n[1],nz=z+F.n[2];const nt=get(nx,ny,nz);
      if(nt){const nT=TYPES[nt];if(ty.glass)continue;if(ty.leaf){if(!nT.glass&&!nT.leaf&&!nT.water)continue;}else if(!nT.glass&&!nT.leaf&&!nT.water)continue;}
      if(ny<0)continue;if(F.n[1]===0&&y<1&&!inb(nx,ny,nz))continue;
      const r=regionOf(t,F.f,x,y,z);const ax=F.n[0]?[1,2]:F.n[1]?[0,2]:[0,1];const vi=P.length/3;const ao=[];
      for(let ci=0;ci<4;ci++){const c=F.c[ci];P.push(x+c[0],y+c[1],z+c[2]);N.push(F.n[0],F.n[1],F.n[2]);U.push(...faceUV(F,r,x,y,z,c));R.push(r[0],r[1],r[2],r[3]);
        const d1=[0,0,0],d2=[0,0,0];d1[ax[0]]=c[ax[0]]*2-1;d2[ax[1]]=c[ax[1]]*2-1;
        let a=3;if(!ty.glass&&!ty.glow){
          const s1=occ(nx+d1[0],ny+d1[1],nz+d1[2]),s2=occ(nx+d2[0],ny+d2[1],nz+d2[2]),s3=occ(nx+d1[0]+d2[0],ny+d1[1]+d2[1],nz+d1[2]+d2[2]);a=(s1>=1&&s2>=1)?0:Math.max(0,3-(s1+s2+s3));}
        {/* smooth light: average the open cells around this corner (glowing blocks only keep a little of their own light: the rest is emissive) */let ls=0,lb=0,ln=0;
          for(let q=0;q<4;q++){const X=nx+(q&1?d1[0]:0)+(q&2?d2[0]:0),Y=ny+(q&1?d1[1]:0)+(q&2?d2[1]:0),Z=nz+(q&1?d1[2]:0)+(q&2?d2[2]:0);
            if(!inb(X,Y,Z)){if(q===0){ls+=15;ln++;}continue;}const j=I(X,Y,Z);if(q&&!passL(vox[j]))continue;ls+=LSKY[j];lb+=LBLK[j];ln++;}
          if(ty.glow)LT.push(ln?Math.max(.45,ls/ln/15):1,.4);else LT.push(ln?ls/ln/15:1,ln?lb/ln/15:0);}
        ao.push(a);const ai=Math.floor(a),af=a-ai;let v=(AO[ai]+(AO[Math.min(3,ai+1)]-AO[ai])*af)*sv;if(F.f===2)v*=.85;C.push(v,v,v);}
      if(ao[0]+ao[3]<ao[1]+ao[2])X.push(vi,vi+1,vi+3,vi,vi+3,vi+2);else X.push(vi,vi+1,vi+2,vi+2,vi+1,vi+3);}}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(P,3));g.setAttribute("normal",new THREE.Float32BufferAttribute(N,3));
  g.setAttribute("uv",new THREE.Float32BufferAttribute(U,2));g.setAttribute("reg",new THREE.Float32BufferAttribute(R,4));g.setAttribute("color",new THREE.Float32BufferAttribute(C,3));g.setAttribute("lt",new THREE.Float32BufferAttribute(LT,2));g.setIndex(X);g.computeBoundingSphere();return g;}
const chunks={};const chunkMeshes=[];const dirtyChunks=new Set();
const glowMatW=new THREE.SpriteMaterial({map:GLOW,color:0xffc870,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.2});
const glowMatC=new THREE.SpriteMaterial({map:GLOW,color:0x7fe9e0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.2});
/* stream water: real water blocks, top sits a little lower, falls show on the open sides */
function meshWater(cx,cz){const P=[],N=[],X=[];const x0=cx*CS,z0=cz*CS;const isW=(x,y,z)=>{const t=get(x,y,z);return t&&TYPES[t].water;};
  for(let y=0;y<H;y++)for(let z=z0;z<z0+CS;z++)for(let x=x0;x<x0+CS;x++){const t=vox[I(x,y,z)];if(!t||!TYPES[t].water)continue;const capped=isW(x,y+1,z);
    for(const F of FACES){if(F.n[1]<0)continue;const nx=x+F.n[0],ny=y+F.n[1],nz=z+F.n[2];const nt=get(nx,ny,nz);if(nt&&(TYPES[nt].water||!(TYPES[nt].glass||TYPES[nt].leaf)))continue;
      if(F.n[1]>0&&capped)continue;const vi=P.length/3;
      for(const c of F.c){P.push(x+c[0],y+(c[1]&&!capped?.86:c[1]),z+c[2]);N.push(F.n[0],F.n[1],F.n[2]);}X.push(vi,vi+1,vi+2,vi+2,vi+1,vi+3);}}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(P,3));g.setAttribute("normal",new THREE.Float32BufferAttribute(N,3));g.setIndex(X);g.computeBoundingSphere();return g;}
const waterBlockMat=new THREE.ShaderMaterial({uniforms:{uTime,uFogC:waterU.uFogC,uFogD:waterU.uFogD,uSunDir:waterU.uSunDir,uNight:waterU.uNight,uSky:waterU.uSky},transparent:true,depthWrite:false,
  vertexShader:"varying vec3 vW,vN;varying float vD;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vN=normal;vec4 mv=viewMatrix*w;vD=-mv.z;gl_Position=projectionMatrix*mv;}",
  fragmentShader:"uniform float uTime,uFogD,uNight;uniform vec3 uFogC,uSunDir,uSky;varying vec3 vW,vN;varying float vD;"+
  "float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}"+
  "void main(){vec3 base=vec3(.22,.52,.86);vec3 c;float a;"+
  "if(vN.y>.5){vec2 q=vW.xz*2.;float r=n2(q+vec2(uTime*.7,uTime*.4))*.6+n2(q*2.3-vec2(uTime*.5,uTime*.9))*.4;c=mix(base,vec3(.55,.8,1.),smoothstep(.55,.9,r)*.6);"+
  "vec3 V=normalize(cameraPosition-vW);vec3 R=reflect(-uSunDir,vec3((r-.5)*.3,1.,(n2(q*1.7+uTime)-.5)*.3));c+=pow(max(dot(R,V),0.),60.)*.5*(1.-uNight*.7);a=.78;}"+
  "else{float u=(vW.x+vW.z)*3.;float s=n2(vec2(u,vW.y*1.6+uTime*4.))*.6+n2(vec2(u*2.1,vW.y*3.+uTime*6.))*.4;c=mix(base*.9,vec3(.85,.95,1.),smoothstep(.45,.85,s)*.85);a=.86;"+
  "float foam=smoothstep(.6,.0,fract(vW.y));c=mix(c,vec3(1.),foam*.25*smoothstep(.5,.9,s));}"+
  "c*=mix(1.,.45,uNight);float f=1.-exp(-uFogD*uFogD*vD*vD);c=mix(c,uFogC,f);gl_FragColor=vec4(c,a);}"});
const waterMeshes=[];
const KINDS=["opaque","leaf","glass","glow","water"];const KMAT={opaque:matOpaque,leaf:matLeaf,glass:matGlass,glow:matGlow,water:waterBlockMat};
function buildChunk(cx,cz){const key=cx+","+cz;let ch=chunks[key];
  if(!ch){ch={g:new THREE.Group(),m:{}};KINDS.forEach(k=>{const m=new THREE.Mesh(new THREE.BufferGeometry(),KMAT[k]);
    m.castShadow=k!=="glass"&&k!=="water";m.receiveShadow=k!=="water";if(k==="leaf")m.customDepthMaterial=leafDepth;if(k==="water"){m.renderOrder=3;m.userData.noAO=1;waterMeshes.push(m);}else chunkMeshes.push(m);ch.m[k]=m;ch.g.add(m);});ch.spr=new THREE.Group();ch.g.add(ch.spr);scene.add(ch.g);chunks[key]=ch;}
  const glows=[];KINDS.forEach(k=>{ch.m[k].geometry.dispose();const g=meshChunk(cx,cz,k,k==="glow"?glows:null);ch.m[k].geometry=g;ch.m[k].visible=!!(g.index&&g.index.count);});
  while(ch.spr.children.length)ch.spr.remove(ch.spr.children[0]);
  for(const g of glows){const s=new THREE.Sprite(g[3]===T.kristal?glowMatC:glowMatW);s.position.set(g[0],g[1],g[2]);const sc=g[3]===T.svjetlo?9:4.6;s.scale.set(sc,sc,1);ch.spr.add(s);}}
function markDirty(x,z){const cx=Math.floor(x/CS),cz=Math.floor(z/CS);const add=(a,b)=>{if(a>=0&&b>=0&&a<NC&&b<NC)dirtyChunks.add(a+","+b);};add(cx,cz);
  const lx=x-cx*CS,lz=z-cz*CS;if(lx===0)add(cx-1,cz);if(lx===CS-1)add(cx+1,cz);if(lz===0)add(cx,cz-1);if(lz===CS-1)add(cx,cz+1);}
function setV(x,y,z,t,silent){if(!inb(x,y,z))return;vox[I(x,y,z)]=t;plantCheck(x,y,z,t);if(!silent){markDirty(x,z);if(lightReady)relightAt(x,y,z);}}
let lightReady=false;
function flushChunks(limit){let n=0;for(const k of dirtyChunks){const p=k.split(",").map(Number);buildChunk(p[0],p[1]);dirtyChunks.delete(k);if(++n>=limit)break;}}

/* single block geometry */
const blockGeoCache={};
function blockGeo(t){if(blockGeoCache[t])return blockGeoCache[t];const P=[],N=[],U=[],C=[],R=[],X=[],LT=[];
  for(const F of FACES){const r=FACESET[t][F.f===0?0:F.f===2?2:1][0],vi=P.length/3;for(let ci=0;ci<4;ci++){const c=F.c[ci];P.push(c[0]-.5,c[1]-.5,c[2]-.5);N.push(...F.n);
    const uv=faceUV(F,[r[0],r[1],r[2],r[3],1,1],0,0,0,c);const k=r[4]>1?1/r[4]:1,k2=r[5]>1?1/r[5]:1;U.push(uv[0]*k,uv[1]*k2);R.push(r[0],r[1],r[2],r[3]);C.push(1,1,1);LT.push(1,0);}X.push(vi,vi+1,vi+2,vi+2,vi+1,vi+3);}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(P,3));g.setAttribute("normal",new THREE.Float32BufferAttribute(N,3));g.setAttribute("uv",new THREE.Float32BufferAttribute(U,2));
  g.setAttribute("reg",new THREE.Float32BufferAttribute(R,4));g.setAttribute("color",new THREE.Float32BufferAttribute(C,3));g.setAttribute("lt",new THREE.Float32BufferAttribute(LT,2));g.setIndex(X);return blockGeoCache[t]=g;}
function matFor(t){return KMAT[kindOf(TYPES[t])];}

