/* =================== v33: CETVRTI: three districts the size of the home island ===================
   Each district is its own 256 map (like the portal worlds, WORLD=id), 200 blocks from the home island. Whatever map
   is loaded shows the other lands as light far meshes, so the archipelago reads as one when you zoom out. Walking
   a bridge or sailing past the half-way line reloads into the neighbour at the matching spot.
   Plots: PLOTS gets 12 more per district; plots of lands that are not loaded are flagged away (off-map coordinates).
   Save: only optional keys (S.distAt, S.distFrom, S.dst, S.wed[id], S.wst[id]). */
const DRAD=Math.PI/180,DD=200,DMID=100,DBY=SL+4;
const DST={
  luka:{n:"Lučki grad",a:50*DRAD,lv:5,sd:31,amp:3,leaf:"lisce",trunk:"drvo",tree:.012,grass:[.42,.72,.3],guide:["papiga","Kapetanica Rita"],d:"Ravni grad uz more s dugim molom i tržnicom."},
  dolina:{n:"Cvjetna dolina",a:190*DRAD,lv:8,sd:57,amp:7,leaf:"tresnja",trunk:"breza_d",tree:.02,grass:[.5,.78,.38],guide:["ovca","Pastirica Runa"],d:"Valovita brda, trešnje u cvatu i jezerce s lopočima."},
  gora:{n:"Gorski kraj",a:250*DRAD,lv:11,sd:83,amp:5,leaf:"smreka",trunk:"smreka_d",tree:.03,grass:[.3,.56,.3],guide:["sova","Čuvarica Hukalica"],d:"Smrekova šuma pod snježnim vrhom s vidikovcem."}};
const DSK=Object.keys(DST);
const HERE=DST[S.world]?S.world:null;
const DQ={p:null,gate:{},imps:[],near:null,warn:0};
for(const k of DSK){const D=DST[k];D.b=D.a+Math.PI;D.off={x:Math.round(Math.cos(D.a)*DD),z:Math.round(Math.sin(D.a)*DD)};
  D.hill=k==="gora"?{x:128+Math.cos(D.a)*42,z:128+Math.sin(D.a)*42,r:24,h:20}:null;D.pond=k==="dolina"?{x:128+Math.cos(D.a+1.1)*40,z:128+Math.sin(D.a+1.1)*40,r:7}:null;
  D.plots=[];for(let i=0;i<8;i++){const a=D.b+(22.5+45*i)*DRAD;D.plots.push({x:Math.round(128+Math.cos(a)*25),z:Math.round(128+Math.sin(a)*25),a});}
  for(const da of [70,-70,125,-125]){const a=D.b+da*DRAD;D.plots.push({x:Math.round(128+Math.cos(a)*42),z:Math.round(128+Math.sin(a)*42),a});}}
function dPages(){let n=0;for(const b of S.books)n+=b.page||0;return n;}
const dOpen=k=>level()>=DST[k].lv||HERE===k||!!(S.dst&&S.dst[k])||S.books.some(b=>PLOTS[b.plot]&&PLOTS[b.plot].dist===k);
/* where another land sits, seen from the map that is loaded */
function dDelta(k){const o=k?DST[k].off:{x:0,z:0},h=HERE?DST[HERE].off:{x:0,z:0};return {x:o.x-h.x,z:o.z-h.z};}
/* plots: home ones first (unchanged indices), then 12 per district */
const DPN=PLOTS.length;
PLOTS.forEach(p=>{p.dist=null;});
DSK.forEach(k=>DST[k].plots.forEach(q=>PLOTS.push({x:q.x,z:q.z,h:SL+6,a:q.a,dist:k})));
PLOTS.forEach(p=>{const here=(p.dist||null)===HERE&&!(S.world&&!HERE);if(!here){const d=dDelta(p.dist);p.x+=d.x;p.z+=d.z;p.away=true;}});
const dLoc=i=>PLOTS[i]?PLOTS[i].dist||"main":"main";
const dLocName=w=>w==="main"?"Glavni otok":DST[w].n;

/* ---------- height of a district ---------- */
function dH(k,x,z){const D=DST[k],sd=D.sd,dx=x-128,dz=z-128,d=Math.hypot(dx,dz),a=Math.atan2(dz,dx);
  const R=61+(fbm(Math.cos(a)*1.5+sd,Math.sin(a)*1.5+sd*.7)-.5)*16,t=d/R,land=sstep(1.06,.8,t);
  let lh=SL+1+5.2*land+(fbm(x*.045+sd,z*.045+3)-.45)*D.amp*sstep(1,.62,t)*sstep(12,28,d);
  if(D.hill){const dm=Math.hypot(x-D.hill.x,z-D.hill.z);if(dm<D.hill.r){const q=1-dm/D.hill.r;lh+=(D.hill.h*Math.pow(q,1.25)+(fbm(x*.14,z*.14)-.5)*4*q)*sstep(1.1,.95,t);}}
  const fl=seaFloor(d-R,x,z);let h=t<1.06?fl*(1-land)+lh*land:fl;
  const pk=sstep(15,10,d);h=h*(1-pk)+(SL+6)*pk;
  for(const p of D.plots){const dp=Math.hypot(x-p.x,z-p.z);if(dp<9.5){const q=sstep(9.5,6.6,dp);h=h*(1-q)+(SL+6)*q;}}
  return h;}

/* ---------- a wooden bridge from the shore to the edge of the map ---------- */
function dBridge(a,gateKey){const c=Math.cos(a),s=Math.sin(a),px=-s,pz=c,Y=DBY;let r0=45;
  for(let r=112;r>30;r-=.5){const x=Math.floor(128.5+c*r),z=Math.floor(128.5+s*r);if(hmap[x+z*W]>=Y+1){r0=r;break;}}
  const cells=new Map();for(let r=r0-1.5;r<=127.4;r+=.4)for(let w=-2;w<=2;w+=.5){const x=Math.floor(128.5+c*r+px*w),z=Math.floor(128.5+s*r+pz*w);if(!inb(x,1,z))continue;const key=x+","+z,o=cells.get(key);if(!o||Math.abs(w)<o.w)cells.set(key,{x,z,w:Math.abs(w),r});}
  for(const q of cells.values()){for(let y=Y+1;y<=Y+5;y++){vox[I(q.x,y,q.z)]=0;prot[I(q.x,y,q.z)]=0;}const edge=q.w>=1.75;wput(q.x,Y,q.z,edge?T.tdaske:T.daske,1);if(edge)wput(q.x,Y+1,q.z,T.tdaske,1);}
  for(let r=r0+4;r<=126;r+=9)for(const w of [-2,2]){const x=Math.floor(128.5+c*r+px*w),z=Math.floor(128.5+s*r+pz*w);if(!inb(x,1,z))continue;wput(x,Y+1,z,T.tdaske,1);wput(x,Y+2,z,T.tdaske,1);wput(x,Y+3,z,T.lampion,1);for(let y=Y-1;y>=1&&!vox[I(x,y,z)];y--)wput(x,y,z,T.kcigla,1);}
  if(gateKey){const g=[];const r=r0+7;for(let w=-1.5;w<=1.5;w+=.5)for(let y=Y+1;y<=Y+3;y++){const x=Math.floor(128.5+c*r+px*w),z=Math.floor(128.5+s*r+pz*w);wput(x,y,z,y===Y+3?T.zlato:T.kcigla,1);g.push([x,y,z]);}DQ.gate[gateKey]={cells:g,x:128.5+c*r,z:128.5+s*r};}
  return r0;}
{const _bs=buildShore;buildShore=function(){if(!WORLD&&!DQ.br){DQ.br=1;try{for(const k of DSK)DST[k].r0=dBridge(DST[k].a,dOpen(k)?null:k);}catch(e){console.warn("bridge",e);}}return _bs.apply(this,arguments);};}

/* ---------- generator ---------- */
function dGen(k){const D=DST[k],Tl=T[D.leaf],Tt=T[D.trunk];Object.assign(WG,{stars:[],wind:[],isl:{},gate:[],portal:null,npcs:[],gateOpen:true,fall:null});
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,Math.round(dH(k,x,z)));hmap[x+z*W]=h;const d=Math.hypot(x-128,z-128);
    for(let y=0;y<h;y++){let t=T.kamen;if(y>=h-4){if(h<=SL+3)t=T.pijesak;else if(D.hill&&h>SL+24)t=y===h-1?T.snijeg:T.kamen;else if(D.hill&&h>SL+17)t=T.kamen;else t=y===h-1?T.trava:T.zemlja;}vox[I(x,y,z)]=t;}
    if(h>SL+3){if(d<10.5){vox[I(x,h-1,z)]=d>9.3?T.kcigla:((x+z)&1?T.kaldrma:T.kamen);mask[x+z*W]=2;}else if(Math.abs(d-17)<1.1&&h<=SL+7){vox[I(x,h-1,z)]=T.kaldrma;mask[x+z*W]=2;}}
    biome[x+z*W]=k==="dolina"?2:0;}
  for(const p of D.plots)for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++)if(dx*dx+dz*dz<=42)mask[(p.x+dx)+(p.z+dz)*W]=1;
  /* road from the square to the bridge, then the bridge */
  {const c=Math.cos(D.b),s=Math.sin(D.b);for(let r=10;r<70;r+=.5)for(let w=-1;w<=1;w++){const x=Math.floor(128.5+c*r-s*w),z=Math.floor(128.5+s*r+c*w),h=hmap[x+z*W];if(h<=SL+3)continue;if(vox[I(x,h-1,z)]===T.trava){vox[I(x,h-1,z)]=T.kaldrma;mask[x+z*W]=2;}}}
  D.r0=dBridge(D.b,null);
  /* fountain on the square */
  {const y=SL+6;for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d>3.3)continue;if(d>2.3)wput(128+dx,y,128+dz,T.kvarc,1);else wput(128+dx,y-1,128+dz,T.voda,1);}
    for(let h=-1;h<=2;h++)wput(128,y+h,128,T.kvarc,1);wput(128,y+3,128,T.svjetlo,1);
    for(const [dx,dz] of [[7,7],[-7,7],[7,-7],[-7,-7]]){wput(128+dx,y,128+dz,T.tdaske,1);wput(128+dx,y+1,128+dz,T.tdaske,1);wput(128+dx,y+2,128+dz,T.lampion,1);}
    const AW=[T.vuna_c,T.vuna_p,T.vuna_z];[[-6,0],[0,-7],[6,-1]].forEach(([dx,dz],i)=>{for(let a=-1;a<=1;a++){wput(128+dx+a,y,128+dz,a?T.bacva:T.stol,1);wput(128+dx+a,y+2,128+dz,a?AW[i]:T.vuna_b,1);}wput(128+dx-1,y+1,128+dz,T.tdaske,1);wput(128+dx+1,y+1,128+dz,T.tdaske,1);});
    WG.isl.trg={x:128,z:128,y,r:10};}
  /* trees */
  const free=(x,z)=>!mask[x+z*W]&&Math.hypot(x-128,z-128)>13;
  for(let z=6;z<W-6;z++)for(let x=6;x<W-6;x++){const h=hmap[x+z*W];if(h<SL+5||h>SL+22||!free(x,z)||vox[I(x,h-1,z)]!==T.trava)continue;if(hash2(x,z,D.sd)<D.tree&&!D.plots.some(p=>Math.hypot(p.x-x,p.z-z)<11.5)){
      if(k==="gora"){const th=5+Math.floor(hash2(x,z,5)*4);for(let i=0;i<th;i++)wput(x,h+i,z,Tt);for(let i=2;i<=th+1;i++){const r=i>th-1?0:i%2?1:2;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(Math.abs(dx)+Math.abs(dz)<=r+(r>1?1:0)&&!get(x+dx,h+i,z+dz))wput(x+dx,h+i,z+dz,Tl);}}
      else wTree(x,z,k==="dolina"&&hash2(x,z,9)<.4?T.lisce_b:Tl,Tt,k==="luka"?5:4);}}
  const stars=[],gy=(x,z)=>hmap[Math.floor(x)+Math.floor(z)*W];const at=(deg,r)=>({x:Math.floor(128+Math.cos(D.b+deg*DRAD)*r)+.5,z:Math.floor(128+Math.sin(D.b+deg*DRAD)*r)+.5});
  stars.push(["trg",128.5,SL+9.3,131.5,"Iznad fontane na trgu. Popni se na rub i skoči!"]);
  [[40,48,"u šumarku"],[95,35,"kraj ceste"],[150,50,"blizu obale"],[-45,46,"na livadi"],[-100,34,"iza kuća"],[-155,52,"na rtu"],[180,34,"s druge strane trga"]].forEach(([deg,r,w],i)=>{const p=at(deg,r);let y=gy(p.x,p.z);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)for(let h=0;h<5;h++){const X=Math.floor(p.x)+dx,Z=Math.floor(p.z)+dz;if(vox[I(X,y+h,Z)]&&!prot[I(X,y+h,Z)])vox[I(X,y+h,Z)]=0;}
    stars.push(["g"+i,p.x,Math.max(y,SL+3)+1.2,p.z,"Negdje "+w]);});
  {const r=Math.min(96,D.r0+22);stars.push(["most",128.5+Math.cos(D.b)*r,DBY+2.2,128.5+Math.sin(D.b)*r,"Na mostu prema glavnom otoku"]);}
  if(k==="luka"){/* long pier with a boat house */const a=D.b+Math.PI/2,c=Math.cos(a),s=Math.sin(a);let r0=50;for(let r=80;r>30;r--){if(hmap[Math.floor(128.5+c*r)+Math.floor(128.5+s*r)*W]>=DBY+1){r0=r;break;}}
    for(let r=r0-1;r<=r0+22;r+=.5)for(let w=-1;w<=1;w++){const x=Math.floor(128.5+c*r-s*w),z=Math.floor(128.5+s*r+c*w);for(let y=DBY+1;y<DBY+5;y++)vox[I(x,y,z)]=0;wput(x,DBY,z,T.sdaske,1);if(w&&Math.floor(r)%6===0)for(let y=DBY-1;y>=1&&!vox[I(x,y,z)];y--)wput(x,y,z,T.tdaske,1);}
    const ex=128.5+c*(r0+22),ez=128.5+s*(r0+22);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){wput(Math.floor(ex)+dx,DBY,Math.floor(ez)+dz,T.sdaske,1);if(Math.abs(dx)===2&&Math.abs(dz)===2){for(let h=1;h<=3;h++)wput(Math.floor(ex)+dx,DBY+h,Math.floor(ez)+dz,T.tdaske,1);}wput(Math.floor(ex)+dx,DBY+4,Math.floor(ez)+dz,(dx+dz)&1?T.vuna_c:T.vuna_b,1);}
    wput(Math.floor(ex),DBY+3,Math.floor(ez),T.lampion,1);stars.push(["mol",ex,DBY+2.2,ez,"Na kraju dugog mola, pod crveno-bijelim krovom"]);POI.push({k:"d_mol",n:"Dugi mol",x:ex,z:ez,r:8});}
  if(k==="dolina"){const P=D.pond,y=hmap[Math.floor(P.x)+Math.floor(P.z)*W];for(let dz=-8;dz<=8;dz++)for(let dx=-8;dx<=8;dx++){const d=Math.hypot(dx,dz);if(d>P.r+.5)continue;const X=Math.floor(P.x)+dx,Z=Math.floor(P.z)+dz;for(let Y=y-3;Y<y+6;Y++)vox[I(X,Y,Z)]=0;const dep=d>P.r-1.5?1:3;for(let Y=y-dep;Y<y;Y++)vox[I(X,Y,Z)]=T.voda;wput(X,y-dep-1,Z,T.pijesak);for(let Y=y-dep-2;Y>y-6;Y--)if(!vox[I(X,Y,Z)])wput(X,Y,Z,T.kamen);hmap[X+Z*W]=y-dep;mask[X+Z*W]=3;if(d<P.r-2&&hash2(X,Z,4)<.12)wput(X,y,Z,T.lopoc);}
    for(let a=0;a<6.28;a+=.1){const X=Math.floor(P.x+Math.cos(a)*(P.r+1.4)),Z=Math.floor(P.z+Math.sin(a)*(P.r+1.4));for(let Y=y-4;Y<y;Y++)if(!vox[I(X,Y,Z)]||vox[I(X,Y,Z)]===T.voda)wput(X,Y,Z,T.zemlja);if(hash2(X,Z,6)<.5&&!vox[I(X,y,Z)])wput(X,y,Z,hash2(X,Z,7)<.5?T.tresnja:T.carlisce);}
    stars.push(["jezero",Math.floor(P.x)+.5,y-1.6,Math.floor(P.z)+.5,"Na dnu jezerca s lopočima. Zaroni!"]);POI.push({k:"d_jezero",n:"Jezerce s lopočima",x:P.x,z:P.z,r:10});}
  if(k==="gora"){const Hh=D.hill,x0=Math.floor(Hh.x),z0=Math.floor(Hh.z),y=hmap[x0+z0*W];for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){for(let Y=y;Y<y+12;Y++)vox[I(x0+dx,Y,z0+dz)]=0;for(let Y=hmap[(x0+dx)+(z0+dz)*W];Y<y;Y++)wput(x0+dx,Y,z0+dz,T.kcigla,1);wput(x0+dx,y-1,z0+dz,T.kcigla,1);const e=Math.abs(dx)===3||Math.abs(dz)===3;
      if(e&&!(dz===3&&dx===0))for(let h=0;h<9;h++)wput(x0+dx,y+h,z0+dz,h%4===2&&(dx===0||dz===0)?T.staklo:T.kcigla,1);if(e&&dz===3&&dx===0)for(let h=2;h<9;h++)wput(x0,y+h,z0+3,T.kcigla,1);wput(x0+dx,y+9,z0+dz,T.sdaske,1);}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++)if(Math.abs(dx)===4||Math.abs(dz)===4){wput(x0+dx,y+9,z0+dz,T.sdaske,1);if((dx+dz)&1)wput(x0+dx,y+10,z0+dz,T.tdaske,1);}
    wput(x0,y+9,z0,0);vox[I(x0,y+9,z0)]=0;WG.wind.push({x:x0+.5,z:z0+.5,r:1.6,y0:y,y1:y+11,k:"vidik"});wput(x0+2,y+10,z0+2,T.lampion,1);
    stars.push(["vidik",x0+2.5,y+11.2,z0-1.5,"Na vrhu vidikovca na snježnom brdu. Uđi i pusti vjetar da te digne!"]);POI.push({k:"d_vidik",n:"Vidikovac",x:Hh.x,z:Hh.z,r:10});}
  stars.forEach(s=>wStar(s[0],s[1],s[2],s[3],s[4]));
  [[70,40,"Škrinja kraj puta"],[-70,45,"Škrinja u travi"],[165,47,"Škrinja na obali"]].forEach(([deg,r,n],i)=>{const p=at(deg,r);addChest("d_"+k+"_"+(i+1),p.x,gy(p.x,p.z),p.z,n);});
  addChest("d_"+k,134,SL+6,131,"Gradska škrinja");
  POI.push({k:"d_"+k,n:D.n,x:128,z:128,r:16});POI.push({k:"d_"+k+"_most",n:"Most prema glavnom otoku",x:128+Math.cos(D.b)*70,z:128+Math.sin(D.b)*70,r:8});
  const at0=S.distAt;let sp=null;if(at0&&at0.to===k){const y0=wTopAt(Math.floor(at0.x),Math.floor(at0.z));sp={x:at0.x,z:at0.z,y:Math.max(y0+1,WATER-.4),cam:at0.yaw};}
  if(!sp){const r=Math.max(D.r0+6,70);sp={x:128.5+Math.cos(D.b)*r,z:128.5+Math.sin(D.b)*r,y:DBY+1,cam:Math.atan2(-Math.cos(D.b),-Math.sin(D.b))+Math.PI};}WG.spawn=sp;}
for(const k of DSK){const N=DST[k].n;LOOT["d_"+k+"_1"]={coins:40,mats:{bakar:2},blocks:{kaldrma:12,lampion:2},msg:"Kamen za staze i dva lampiona. "+N+" dijeli s tobom!"};
  LOOT["d_"+k+"_2"]={coins:45,mats:{zeljezo:2},blocks:{daske:16,staklo:6},msg:"Daske i staklo, taman za novu kuću."};LOOT["d_"+k+"_3"]={coins:50,mats:{biser:1},blocks:{cigla:14,krov:8},msg:"Cigle i crijep s obale."};
  LOOT["d_"+k]={coins:250,mats:{dijamant:1,smaragd:1,grumen:3},blocks:{zlato:4,kvarc:16,svjetlo:4},msg:"Svih deset ključića! "+N+" ti poklanja svoje najljepše kamenje."};}

/* ---------- far lands ---------- */
function dImp(k){const d=dDelta(k),D=k?DST[k]:null,st=3,n=Math.floor(255/st)+1,pos=[],col=[],hs=new Float32Array(n*n),cs=new Float32Array(n*n*3);const gr=D?D.grass:[.38,.68,.3];
  for(let j=0;j<n;j++)for(let i=0;i<n;i++){const x=i*st,z=j*st;let h=k?dH(k,x,z):raw(x,z);let c;if(h<SL+3.3)c=[.9,.84,.62];else if(h>SL+26)c=[.96,.97,.98];else if(h>SL+18)c=[.6,.62,.64];else{const f=hash2(x,z,3);c=f<.3?[gr[0]*.62,gr[1]*.68,gr[2]*.6]:gr;if(f<.3)h+=2.4;if(k==="dolina"&&f>.86)c=[.95,.66,.78];}
    hs[i+j*n]=h;cs.set([c[0]*.31,c[1]*.34,c[2]*.29],(i+j*n)*3);}
  const v=(i,j)=>{pos.push(i*st,hs[i+j*n],j*st);col.push(cs[(i+j*n)*3],cs[(i+j*n)*3+1],cs[(i+j*n)*3+2]);};
  for(let j=0;j<n-1;j++)for(let i=0;i<n-1;i++){if(Math.max(hs[i+j*n],hs[i+1+j*n],hs[i+(j+1)*n],hs[i+1+(j+1)*n])<SL+2.5)continue;v(i,j);v(i,j+1);v(i+1,j);v(i+1,j);v(i,j+1);v(i+1,j+1);}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("color",new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();
  const grp=new THREE.Group();grp.add(new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-60})));
  const box=(x,y,z,w,h,dp,c,ry)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,dp),new THREE.MeshStandardMaterial({color:LC(c),roughness:1}));m.position.set(x,y,z);if(ry)m.rotation.y=ry;grp.add(m);return m;};
  /* the bridge between this land and the home island, and the buildings of its books */
  if(k){box(128.5+Math.cos(D.b)*84,DBY+.6,128.5+Math.sin(D.b)*84,56,1,5,0x8a6038,-D.b);box(128,SL+8,128,3,6,3,0xeee8e0);}
  else if(HERE){const A=DST[HERE].a;box(128.5+Math.cos(A)*84,DBY+.6,128.5+Math.sin(A)*84,56,1,5,0x8a6038,-A);box(LIB.x,LIB.h+5,LIB.z,12,10,12,0xc99a60);box(LIB.x,LIB.h+12,LIB.z,8,5,8,0x5f8bbd);}
  S.books.forEach(b=>{if(dLoc(b.plot)!==(k||"main"))return;const p=PLOTS[b.plot];if(!p)return;const f=Math.max(.25,b.done?1:b.page/Math.max(1,b.pages));const X=p.x-d.x,Z=p.z-d.z;box(X,p.h+3*f,Z,8,6*f,8,0xe8dcc0);if(f>.6)box(X,p.h+6*f+1.2,Z,9,2.4,9,GENRES[b.genre]?GENRES[b.genre].col:0xb5583f);});
  grp.position.set(d.x,0,d.z);grp.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false;}});scene.add(grp);DQ.imps.push(grp);return grp;}
function dImps(){try{for(const k of [null].concat(DSK))if(k!==HERE)dImp(k);}catch(e){console.warn("imp",e);}}

/* ---------- travelling ---------- */
function dGo(to,at){if(DQ.going)return;DQ.going=1;S.wed=S.wed||{};if(HERE)S.wed[HERE]=S.edits;else S.wed.__isle=S.edits;
  if(to){S.edits=S.wed[to]||{};S.wed[to]=S.edits;S.world=to;}else{S.edits=S.wed.__isle||{};delete S.wed.__isle;S.world=null;}
  S.worldBack=null;S.distFrom=HERE||"main";S.distAt=at?Object.assign({to:to||"main"},at):null;S.dst=S.dst||{};if(to)S.dst[to]=S.dst[to]||today();save();
  document.body.insertAdjacentHTML("beforeend",'<div id="distVeil"><div><small>Putujemo u</small><b>'+dLocName(to||"main")+'</b></div></div>');[392,523,659,784].forEach((f,i)=>tone(f,.2,"sine",.025,i*.1));setTimeout(()=>location.reload(),700);}
function dCross(){if(!FP.on||DQ.going||(WORLD&&!HERE))return;const P=FP.p;const chk=(k,ang,to)=>{const c=Math.cos(ang),s=Math.sin(ang),dot=(P.x-128)*c+(P.z-128)*s,lat=-(P.x-128)*s+(P.z-128)*c;if(Math.abs(lat)>92)return;
    if(dot>DMID-22&&!DQ["seen"+k]&&(!to||dOpen(k))){DQ["seen"+k]=1;toast((to?"Pred tobom je "+DST[k].n:"Pred tobom je glavni otok")+". Samo nastavi ravno!",3200);}
    if(dot<=DMID)return;if(to&&!dOpen(k)){FP.p.x-=c*3;FP.p.z-=s*3;FP.v.set(0,0,0);dLocked(k);return;}
    const o=DST[k].off,sg=to?1:-1;dGo(to?k:null,{x:P.x-sg*o.x+c*6,z:P.z-sg*o.z+s*6,yaw:FP.cam.yaw});};
  if(HERE)chk(HERE,DST[HERE].b,false);else for(const k of DSK)chk(k,DST[k].a,true);}
function dLocked(k){const now=performance.now();if(now-DQ.warn<5000)return;DQ.warn=now;toast("Most za "+DST[k].n+" otvara se na razini "+DST[k].lv+". Sada si na razini "+level()+".",4200);}
function dGateTick(){for(const k in DQ.gate){const G=DQ.gate[k];if(dOpen(k)){for(const [x,y,z] of G.cells){prot[I(x,y,z)]=0;setV(x,y,z,0);burst(x+.5,y+.5,z+.5,8,[[1,.9,.5],[1,1,1]],1.6,1.6,.7);}delete DQ.gate[k];sfx.fanfare();toast("Most za "+DST[k].n+" je otvoren! Nova četvrt čeka tvoje knjige.",5200);continue;}
    if(FP.on&&Math.hypot(FP.p.x-G.x,FP.p.z-G.z)<4.5)dLocked(k);}}
/* a button to step into the building you stand next to */
function dNear(){if(!FP.on||!$("veil").hidden){if(DQ.near){DQ.near=null;$("bldGo").hidden=true;}return;}let best=null,bd=8.5;for(const b of S.books){const p=PLOTS[b.plot];if(!p||p.away)continue;const d=Math.hypot(FP.p.x-p.x-.5,FP.p.z-p.z-.5);if(d<bd){bd=d;best=b;}}
  if(best!==DQ.near){DQ.near=best;const el=$("bldGo");el.hidden=!best;if(best)el.textContent=bldName(best)+": uđi";}}
document.body.insertAdjacentHTML("beforeend",'<button class="btn" id="bldGo" hidden></button>');$("bldGo").onclick=()=>{if(DQ.near){sfx.click();sheetBuilding(DQ.near);}};
{const _ta=tickAnimals2;let acc=0;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);acc+=dt;if(acc<.2)return;acc=0;try{dCross();if(!WORLD)dGateTick();dNear();
    if(!WORLD&&!FP.on&&typeof envUnder!=="undefined"&&!envUnder&&!(typeof MG!=="undefined"&&MG.cur)&&!(typeof ZV!=="undefined"&&ZV.fogOn)){const dd=camera.position.distanceTo(controls.target);const f=.0034*Math.max(.12,Math.min(1,110/dd));scene.fog.density=f;waterU.uFogD.value=f;}
    else if(DQ.fogFar&&FP.on){scene.fog.density=.0034;waterU.uFogD.value=.0034;}DQ.fogFar=!FP.on;}catch(e){}};}

/* ---------- plots that are not on this map stay untouched ---------- */
{const _sl=stampList;stampList=function(plot){if(!plot||plot.away)return;return _sl.apply(this,arguments);};}
{const _pf=paveFor;paveFor=function(b){const p=PLOTS[b.plot];if(!p||p.away)return;return _pf.apply(this,arguments);};}
{const _gb=growBook;growBook=function(b,onDone){const p=PLOTS[b.plot];if(!p||p.away){shown[b.id]=targetCount(b);onDone&&onDone();return;}return _gb.apply(this,arguments);};}
{const _br=bldRebuild;bldRebuild=function(b,n){const p=PLOTS[b.plot];if(p&&p.away){if(isNaN(+n))b.bld=n;else if(n)b.bld=+n;else delete b.bld;save();toast("Zgrada je u četvrti "+dLocName(dLoc(b.plot))+". Preuređenu ćeš vidjeti kad dođeš tamo.",4200);return;}return _br.apply(this,arguments);};}
{const _pi=plotInfo;plotInfo=function(i){const p=PLOTS[i];if(p&&p.dist){const j=DST[p.dist].plots.findIndex(q=>q.a===p.a);return {shore:j>=8?4:30,mt:99,gv:99,tr:99,t:DST[p.dist].n+", "+(j>=8?"uz obalu":"kraj trga")};}return _pi.apply(this,arguments);};}
nbStep3=function(st){const here=HERE||(WORLD?"-":"main");const locs=["main"].concat(DSK.filter(dOpen));const freeIn=w=>PLOTS.map((_,i)=>i).filter(i=>dLoc(i)===w&&!S.books.some(b=>b.plot===i));
  if(!st.where||!locs.includes(st.where))st.where=locs.includes(here)&&freeIn(here).length?here:(locs.find(w=>freeIn(w).length)||"main");const free=freeIn(st.where),local=st.where===here;
  const best=free.slice().sort((a,b)=>plotScore(st.genre,b)-plotScore(st.genre,a))[0];if(!free.includes(st.plot))st.plot=best;
  const nxt=DSK.find(k=>!dOpen(k));const name=GRD[st.bld]?GRD[st.bld].n:BLD[st.genre][st.bld||0][0];
  openSheet('<h2>Gdje gradimo?</h2><p class="muted">Korak 3 od 3 · '+name+'</p><div class="dtabs">'+locs.map(w=>'<button class="btn soft" data-w="'+w+'" aria-pressed="'+(w===st.where)+'">'+dLocName(w)+' <small>'+freeIn(w).length+'</small></button>').join("")+'</div>'+
    (free.length?(local?'<div class="rida">'+RIDA_SVG+'<div class="say">Ja bih gradila na mjestu sa zvjezdicom. '+(PLOT_WHY[st.genre]||"")+' Ali ti biraš: dotakni bilo koji bijeli krug!</div></div><canvas id="nbMap" class="mapcv" aria-label="Karta slobodnih mjesta"></canvas><p id="nbWhere" style="font-weight:600;text-align:center"></p>':
      '<div class="rida">'+RIDA_SVG+'<div class="say">'+dLocName(st.where)+' ima '+free.length+' slobodnih mjesta. Građevina će rasti tamo dok čitaš, a izdaleka ćeš je vidjeti i odavde. Kad prijeđeš most, možeš ući u nju!</div></div>'):
      '<p class="muted">Ovdje su sva mjesta zauzeta. Odaberi drugi kraj.</p>')+(nxt?'<p class="muted">Sljedeća četvrt, '+DST[nxt].n+', otvara se na razini '+DST[nxt].lv+' (sada si na razini '+level()+').</p>':'')+
    '<div class="row"><button class="btn soft" id="nbBack">Natrag</button><button class="btn big" id="nbGo"'+(free.length?'':' disabled')+'>Posadi knjigu</button></div>');
  $("sheetBody").querySelectorAll("[data-w]").forEach(x=>x.onclick=()=>{sfx.click();st.where=x.dataset.w;st.plot=-1;nbStep3(st);});
  if(free.length&&local){const draw=()=>{plotMap($("nbMap"),st.plot,best,i=>{if(!free.includes(i))return;sfx.click();st.plot=i;draw();});$("nbWhere").textContent="Odabrano mjesto: "+plotInfo(st.plot).t+(st.plot===best?" (Ridin prijedlog)":"");};draw();}
  $("nbBack").onclick=()=>{sfx.click();nbStep2(st);};
  $("nbGo").onclick=()=>{if(!free.length||S.books.some(b=>b.plot===st.plot))return;const b={id:"b"+Date.now().toString(36),title:st.t,author:st.a,pages:st.p,page:0,genre:st.genre,plot:st.plot,started:today(),done:false,stars:0};if(st.bld)b.bld=st.bld;
    S.books.push(b);save();closeSheet();shown[b.id]=0;sfx.chime();const plot=PLOTS[b.plot];
    if(plot.away){toast("Knjiga je posađena u četvrti "+dLocName(st.where)+"! Prijeđi most da vidiš kako raste.",5200);syncSigns();renderHUD();return;}
    paveFor(b);if(!FP.on)flyTo(plot.x+.5,plot.h+3,plot.z+.5,38);if(!WORLD)ridaGo(plot,()=>say(rida,"Ovdje će niknuti "+bldName(b)+"! Što više čitaš, to više raste.",6000));setTimeout(()=>growBook(b,()=>{syncSigns();renderHUD();}),1500);syncSigns();};};

/* ---------- the district as a world ---------- */
let dGuide=null;
function dLife(){const D=DST[HERE];const put=(kind,name,x,z,o)=>{const e=spawn(kind,name,o||{speed:1});e.x=x+.5;e.z=z+.5;e.y=walkable(e.x,e.z,false)||hmap[Math.floor(x)+Math.floor(z)*W];e.home={x:e.x,z:e.z};return e;};
  dGuide=put(D.guide[0],D.guide[1],131,124);dGuide.frozen=true;dGuide.g.rotation.y=Math.PI*.2;
}
function dTalk(){const n=wStars(HERE),D=DST[HERE];say(dGuide,n>=WSTAR_N?"Svi ključići su tu! Gradska škrinja na trgu je tvoja. I ne zaboravi: ovdje ima mjesta za još tvojih knjiga.":n===0?"Dobro došla u "+D.n+"! Ja sam "+D.guide[1]+". Po četvrti je skriveno deset zlatnih ključića. Skupi ih i otvorit ćeš gradsku škrinju. A svaka nova knjiga može sagraditi zgradu baš ovdje!":"Imaš "+n+" od "+WSTAR_N+" ključića. Strelica gore pokazuje najbliži.",8000);}
for(const k of DSK){const D=DST[k];WDEF[k]={gen:()=>dGen(k),env:dImps,life:dLife,get preset(){return DQ.p||autoPreset();},fog:.0034,floor:null,guide:()=>dGuide,talk:dTalk,
    item:{one:"Zlatni ključić",hud:"Ključići",done:"Svi ključići!",all:"Svih 10 zlatnih ključića! Gradska škrinja na trgu se otvara!",first:"Bravo! Strelica gore pokazuje put do najbližeg ključića."},
    intro:()=>D.n+"! Ključići: "+wStars(k)+" / "+WSTAR_N+". Most iza tebe vodi natrag na glavni otok.",
    finale:{chest:"d_"+k,at:{x:134.5,z:131.5},rewards:[],locked:"Gradska škrinja se otvara kad skupiš svih 10 zlatnih ključića!",kicker:D.n+" slavi!",title:"Dar četvrti",sub:"Skupila si sve ključiće. Stanovnici su ti napunili torbu blagom i kamenjem za gradnju."}};}
{const _st=setTime;setTime=function(p,inst){DQ.p=p;return _st.apply(this,arguments);};}
{const _wa=waterAt;waterAt=function(x,y,z){if(HERE){const t=get(Math.floor(x),Math.floor(y),Math.floor(z));if(t)return !!TYPES[t].water;return y<WATER&&y>=0;}return _wa.apply(this,arguments);};}
{const _sh=sheetHome;sheetHome=function(){if(!HERE)return _sh.apply(this,arguments);const n=wStars(HERE);
  openSheet('<h2>Natrag na glavni otok?</h2><p class="muted">'+DST[HERE].n+' · Ključići: <b>'+n+' / '+WSTAR_N+'</b>. Možeš se vratiti i pješice preko mosta ili morem. Sve što si ovdje sagradila ostaje.</p><button class="btn big" id="whGo">Vrati me na glavni otok</button><button class="btn soft" id="whStay">Ostajem još malo</button>');
  $("whGo").onclick=()=>dGo(null,null);$("whStay").onclick=()=>{sfx.click();closeSheet();};};}
function dBoot(id){WORLD=id;const D=DST[id];S.pets=S.pets||{};S.met=S.met||{};S.wear=S.wear||{vrat:"",ledja:""};if(S.hint==null)S.hint="";if(!Array.isArray(S.farm))S.farm=[];S.isletDay=S.isletDay||{};S.wed=S.wed||{};if(!S.wed.__isle){S.wed.__isle=S.edits;S.edits=S.wed[id]||{};S.wed[id]=S.edits;}S.wst=S.wst||{};
  const WD=WDEF[id];WD.gen();
  for(const b of S.books){const p=PLOTS[b.plot];if(!p||p.away)continue;paveFor(b);stampList(p,blueprint(bkey(b)),targetCount(b));shown[b.id]=targetCount(b);}
  for(const k in S.edits){const p=k.split(",").map(Number);setV(p[0],p[1],p[2],S.edits[k],true);}
  buildShore();shoreTex.needsUpdate=true;lightAll();lightReady=true;advInit();
  for(let cz=0;cz<NC;cz++)for(let cx=0;cx<NC;cx++)buildChunk(cx,cz);
  buildLife();grow();for(let i=CHESTS.length-1;i>=0;i--)if(String(CHESTS[i].id).indexOf("d_"))CHESTS.splice(i,1);buildChests();
  rida=spawn("rida","Rida",{speed:1.7});rida.x=WG.spawn.x;rida.z=WG.spawn.z;rida.y=WG.spawn.y;setHat(S.hat||null);
  if(typeof diaryInit==="function")diaryInit();if(typeof animalsInit==="function")animalsInit();
  beam.visible=false;if(life.balloon)life.balloon.visible=false;WD.env();buildStars();WD.life();syncSigns();syncSpecials();
  S.foxSeen=1;setTime(autoPreset(),true);renderSound();resize();renderHUD();quests();renderEco();
  requestAnimationFrame(frame);setTimeout(()=>$("loading").classList.add("out"),150);
  setTimeout(()=>{startSquirrel();FP.p.set(WG.spawn.x,WG.spawn.y,WG.spawn.z);FP.safe.copy(FP.p);const cy=WG.spawn.cam!=null?WG.spawn.cam:Math.PI;FP.cam.yaw=cy;FP.yaw=cy+Math.PI;FP.camT.set(FP.p.x,FP.p.y+1.05,FP.p.z);FP.cam.cur=FP.cam.tdist;fpUI();
    toast(WD.intro(),5000);S.distAt=null;save();},300);}
{const _boot=boot;boot=function(){if(HERE){try{return dBoot(HERE);}catch(e){console.error(e);if(!DQ.failed){DQ.failed=1;S.edits=(S.wed&&S.wed.__isle)||{};if(S.wed)delete S.wed.__isle;S.world=null;S.distAt=null;save();location.reload();}return;}}
  _boot();if(WORLD)return;try{controls.maxDistance=560;dImps();}catch(e){console.warn(e);}
  const at=S.distAt;if(at&&at.to==="main"){S.distAt=null;S.distFrom="main";save();setTimeout(()=>{const y0=floorY(at.x,H-1,at.z),yy=Math.max(y0+1,WATER-.4);if(rida){rida.x=at.x;rida.z=at.z;rida.y=yy;}startSquirrel();FP.p.set(at.x,yy,at.z);FP.safe.copy(FP.p);FP.cam.yaw=at.yaw||0;FP.yaw=FP.cam.yaw+Math.PI;FP.camT.set(FP.p.x,FP.p.y+1.05,FP.p.z);FP.cam.cur=FP.cam.tdist;toast("Dobro došla natrag na glavni otok!",3000);},600);}
  else if(S.distFrom&&S.distFrom!=="main"&&!at){const k=S.distFrom;S.distFrom="main";save();if(DST[k])setTimeout(()=>{const D=DST[k],r=(D.r0||66)+3;if(rida){rida.x=128.5+Math.cos(D.a)*r;rida.z=128.5+Math.sin(D.a)*r;rida.y=DBY+2;}startSquirrel();FP.p.set(128.5+Math.cos(D.a)*r,DBY+2,128.5+Math.sin(D.a)*r);FP.safe.copy(FP.p);FP.cam.yaw=Math.atan2(Math.cos(D.a),Math.sin(D.a));FP.yaw=FP.cam.yaw+Math.PI;},600);}};}
