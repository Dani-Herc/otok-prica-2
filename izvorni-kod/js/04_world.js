/* =================== WORLD =================== */
/* a big home island with a hollow mountain, a reef and a sunken ship, two islets close by and six far islands, each its own little world */
const W=256,H=64,CX=128,CZ=128,SL=10,WATER=SL+2.62,CS=16,NC=W/CS;
const TYPES=[null,
 {k:"trava",n:"Trava",c:0x62b23f},
 {k:"zemlja",n:"Zemlja",c:0x93673f},
 {k:"pijesak",n:"Pijesak",c:0xecd7a0},
 {k:"kamen",n:"Kamen",c:0xa2a8b0},
 {k:"drvo",n:"Deblo",c:0x8f603a},
 {k:"daske",n:"Daske",c:0xc99a60},
 {k:"lisce",n:"Lišće",c:0x58a646,leaf:1},
 {k:"cigla",n:"Cigla",c:0xb5583f},
 {k:"staklo",n:"Staklo",c:0xd8f2ff,glass:1},
 {k:"snijeg",n:"Snijeg",c:0xf7fafd},
 {k:"lampion",n:"Lampion",c:0xffd27a,glow:0xffc35a,light:15},
 {k:"zlato",n:"Zlatni blok",c:0xf5c33b},
 {k:"kristal",n:"Kristal mašte",c:0x86ece2,glow:0x7fe9e0,light:14},
 {k:"crvena",n:"Crvena boja",c:0xd8504f},
 {k:"bijela",n:"Bijela žbuka",c:0xf4f0e6},
 {k:"carlisce",n:"Čarobno lišće",c:0xbf7ce6,leaf:1},
 {k:"gljiva",n:"Klobuk gljive",c:0xd8504f},
 {k:"sijeno",n:"Sijeno",c:0xe8c55c},
 {k:"krov",n:"Crijep",c:0x5f8bbd},
 {k:"polica",n:"Knjižna polica",c:0xa0703c},
 {k:"kaldrma",n:"Kaldrma",c:0xbab4a8},
 {k:"svjetlo",n:"Svjetlo",c:0xfff5cf,glow:0xffe39a,light:15},
 {k:"jesen",n:"Jesensko lišće",c:0xe08a3a,leaf:1},
 {k:"tresnja",n:"Cvijet trešnje",c:0xf2a7c3,leaf:1},
 {k:"staza",n:"Zemljana staza",c:0xb08a52},
 {k:"mahovina",n:"Mahovina",c:0x6f8a4a},
 {k:"sljunak",n:"Šljunak",c:0x8f8a86},
 {k:"smreka",n:"Smrekove grane",c:0x3f6a3c,leaf:1},
 {k:"voda",n:"Voda",c:0x3f8fd8,water:1},
 /* v9 */
 {k:"pjescenjak",n:"Pješčenjak",c:0xe0cf9a},
 {k:"kaktus",n:"Kaktus",c:0x4f8a3a},
 {k:"led",n:"Led",c:0xa9c8f5},
 {k:"micelij",n:"Čarobna zemlja",c:0x8a7a8e},
 {k:"stapka",n:"Stapka gljive",c:0xe9e0d0},
 {k:"ametist",n:"Ametist",c:0x9a6ad6,light:7},
 {k:"r_ugljen",n:"Ruda ugljena",c:0x5a5a5a,ore:"ugljen"},
 {k:"r_bakar",n:"Bakrena ruda",c:0xc07a50,ore:"bakar"},
 {k:"r_zeljezo",n:"Željezna ruda",c:0xc8a890,ore:"zeljezo"},
 {k:"r_zlato",n:"Zlatna ruda",c:0xe8c040,ore:"grumen"},
 {k:"r_dijamant",n:"Dijamantna ruda",c:0x6fe0e0,ore:"dijamant"},
 {k:"r_smaragd",n:"Smaragdna ruda",c:0x40c070,ore:"smaragd"},
 {k:"glina",n:"Glina",c:0xa4a9b8},
 {k:"koralj_p",n:"Plavi koralj",c:0x3a64d8},
 {k:"koralj_r",n:"Ružičasti koralj",c:0xe070a8},
 {k:"koralj_z",n:"Žuti koralj",c:0xe8d040},
 {k:"koralj_c",n:"Crveni koralj",c:0xd03a3a},
 {k:"koralj_l",n:"Ljubičasti koralj",c:0xa040c8},
 {k:"prizmarin",n:"Prizmarin",c:0x5aa898},
 {k:"prizcigla",n:"Prizmarinske cigle",c:0x6ab8a8},
 {k:"duboki",n:"Tamni kamen",c:0x4a4a52},
 {k:"stol",n:"Radni stol",c:0xa07040},
 {k:"bacva",n:"Bačva",c:0x8a6038},
 {k:"bundeva",n:"Bundeva",c:0xe08a20},
 {k:"lubenica",n:"Lubenica",c:0x6a9a30},
 {k:"oranica",n:"Oranica",c:0x6a4a2a},
 {k:"kcigla",n:"Kamene cigle",c:0x8a8a8a},
 {k:"smreka_d",n:"Smrekovo deblo",c:0x5a4028},
 {k:"breza_d",n:"Brezovo deblo",c:0xe8e4d8},
 {k:"lisce_b",n:"Brezovo lišće",c:0x80a755,leaf:1},
 {k:"tdaske",n:"Tamne daske",c:0x4a3220},
 {k:"sdaske",n:"Smrekove daske",c:0x7a5a38},
 {k:"bdaske",n:"Brezove daske",c:0xd8c890},
 {k:"kvarc",n:"Kvarc",c:0xeee8e0},
 {k:"upjescenjak",n:"Ukrasni pješčenjak",c:0xe0cf9a},
 {k:"tuf",n:"Tamne cigle",c:0x6a6a62},
 {k:"zcigla",n:"Zemljane cigle",c:0x9a7a5a},
 /* v10: coloured wool from the market and the sheep, a reading desk and a full bookcase */
 {k:"vuna_c",n:"Crvena vuna",c:0xc8403a},{k:"vuna_b",n:"Bijela vuna",c:0xf2f0ea},{k:"vuna_z",n:"Žuta vuna",c:0xf2c838},{k:"vuna_p",n:"Svjetloplava vuna",c:0x5ab8e8},
 {k:"vuna_l",n:"Svijetlozelena vuna",c:0x80c838},{k:"vuna_n",n:"Narančasta vuna",c:0xf08a28},{k:"vuna_r",n:"Ružičasta vuna",c:0xf0a0c0},{k:"vuna_lj",n:"Ljubičasta vuna",c:0x8a40b8},
 {k:"vuna_t",n:"Plava vuna",c:0x3a48a8},{k:"vuna_zl",n:"Zelena vuna",c:0x5a7a28},{k:"vuna_ts",n:"Tirkizna vuna",c:0x18989a},{k:"vuna_s",n:"Smeđa vuna",c:0x7a5030},
 {k:"stalak",n:"Stalak za knjigu",c:0xb08050},{k:"polica2",n:"Puna polica",c:0x8a6038},
 /* v16: blocks from Svijet oblaka */
 {k:"oblak",n:"Oblak",c:0xffffff},{k:"skocni",n:"Skočni oblak",c:0xffb0dc,glow:0xff9ad0,light:6},
 /* v17: Ledeno kraljevstvo */
 {k:"pled",n:"Plavi led",c:0x8ab8f0},{k:"tobogan",n:"Ledeni tobogan",c:0x9ad0ff},
 /* v23: Džungla dinosaura */
 {k:"zar",n:"Užarena stijena",c:0xff6a20,glow:0xff5a10,light:11},{k:"blato",n:"Blato",c:0x8a6a4a},{k:"lopoc",n:"Lopoč",c:0x5a9a30},{k:"jantar",n:"Jantar",c:0xffb030,glow:0xffa020,light:9}];
const ID={};TYPES.forEach((t,i)=>{if(t)ID[t.k]=i;});const T=ID;

const prot=new Uint8Array(W*H*W);/* cells of old buildings that stay whole */
const vox=new Uint8Array(W*H*W),hmap=new Int16Array(W*W),mask=new Uint8Array(W*W),biome=new Uint8Array(W*W);
/* mask: 1 plot, 2 path, 3 stream, 4 library, 5 windmill | biome: 0 home, 1 desert, 2 cherry, 3 snow, 4 mushroom, 5 crystal, 6 ruins, 7 reef, 8 islet */
const I=(x,y,z)=>x+W*(z+W*y);
const inb=(x,y,z)=>x>=0&&y>=0&&z>=0&&x<W&&y<H&&z<W;
const get=(x,y,z)=>inb(x,y,z)?vox[I(x,y,z)]:0;
const MA=-0.3,MX=CX+Math.cos(MA)*48,MZ=CZ+Math.sin(MA)*48;
const RA=1.15;/* reef direction */
const ISLETS=[{x:CX+Math.cos(2.05)*82,z:CZ+Math.sin(2.05)*82,r:5,h:4.4},{x:CX+Math.cos(3.55)*81,z:CZ+Math.sin(3.55)*81,r:4,h:3.8}];
const ISLES=[
  {k:"pustinja",n:"Pustinjski otok",b:1,a:.28,d:106,r:16,h:6},
  {k:"tresnja",n:"Otok trešanja",b:2,a:1.62,d:106,r:14,h:7},
  {k:"snijeg",n:"Snježni otok",b:3,a:2.72,d:106,r:14,h:9},
  {k:"gljive",n:"Gljivin otok",b:4,a:3.85,d:105,r:13,h:5},
  {k:"kristal",n:"Kristalni otok",b:5,a:4.85,d:106,r:12,h:8},
  {k:"rusevine",n:"Otok ruševina",b:6,a:5.75,d:104,r:12,h:5}];
ISLES.forEach(s=>{s.x=CX+Math.cos(s.a)*s.d;s.z=CZ+Math.sin(s.a)*s.d;});
const LIB={x:CX,z:CZ,h:SL+6};
function islandR(a){return 64+(fbm(Math.cos(a)*1.6+11,Math.sin(a)*1.6+4)-.5)*18;}
function seaFloor(off,x,z){return SL+2.3-Math.min(SL-2.5,Math.max(0,off)*.42)+(fbm(x*.07+5,z*.07+1)-.5)*2.4;}
function raw(x,z){const dx=x-CX,dz=z-CZ,d=Math.hypot(dx,dz),a=Math.atan2(dz,dx),R=islandR(a),t=d/R;
  const land=sstep(1.06,.8,t);let lh=SL+1+5.6*land;
  lh+=(fbm(x*.04+2,z*.04+9)-.42)*5*sstep(1,.62,t);
  const dm=Math.hypot(x-MX,z-MZ);
  if(dm<31){const k=1-dm/31;lh+=(31*Math.pow(k,1.35)+(fbm(x*.14,z*.14)-.5)*6*k)*sstep(1.13,.96,t);}
  let fl=seaFloor(d-R,x,z);
  /* the reef: a shallow sandy shelf off one coast */
  let da=a-RA;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;const rk=sstep(.55,.2,Math.abs(da))*sstep(30,14,d-R)*sstep(1,6,d-R);
  fl=fl*(1-rk)+(SL-3.2+(fbm(x*.12,z*.12)-.5)*2.2)*rk;
  let h=t<1.06?fl*(1-land)+lh*land:fl;
  for(const s of ISLETS.concat(ISLES)){const di=Math.hypot(x-s.x,z-s.z);if(di>s.r+30)continue;const li=sstep(s.r*1.05,s.r*.72,di);
    const ih=SL+1+s.h*sstep(s.r,s.r*.25,di)+(di<s.r?(fbm(x*.25+s.x,z*.25)-.5)*2:0);const fi=seaFloor(di-s.r,x,z);h=Math.max(h,fi*(1-li)+ih*li);}
  if(typeof regionRaw==="function")h=regionRaw(x,z,h);
  return h;}
const PLOTS=[];
(function(){for(let k=0;k<12;k++){const a=k*Math.PI*2/12+.18;const x=Math.round(CX+Math.cos(a)*24),z=Math.round(CZ+Math.sin(a)*24);
  if(Math.hypot(x-MX,z-MZ)<27)continue;if(islandR(a)-24<10)continue;PLOTS.push({x,z,h:0,a});}})();

/* Rida's garden and the market sit on the open side of the square, toward the mountain, where no book plots are */
const SITES={};(function(){const as=PLOTS.map(p=>((p.a%(2*Math.PI))+2*Math.PI)%(2*Math.PI)).sort((a,b)=>a-b);let best=0,bs=0;
  for(let i=0;i<as.length;i++){const a0=as[i],a1=i+1<as.length?as[i+1]:as[0]+2*Math.PI;if(a1-a0>best){best=a1-a0;bs=a0;}}
  const at=f=>{const a=bs+best*f;return {x:Math.round(LIB.x+Math.cos(a)*13.5),z:Math.round(LIB.z+Math.sin(a)*13.5),h:LIB.h,a};};SITES.vrt=at(.27);SITES.trznica=at(.73);})();
let STREAM=[];const baseWater=new Set();const CHESTS=[];const CAVE={};const POI=[];
function genTerrain(){
  PLOTS.forEach(p=>{p.h=Math.max(SL+5,Math.min(SL+7,Math.round(raw(p.x,p.z))));});
  const flat=[{p:LIB,r:10,m:4}].concat(PLOTS.map(p=>({p,r:6.5,m:1}))).concat([{p:SITES.vrt,r:4.8,m:7},{p:SITES.trznica,r:4.8,m:8}]);
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){let h=raw(x,z);
    for(const q of flat){const d=Math.hypot(x-q.p.x,z-q.p.z);if(d<q.r){h=q.p.h;mask[x+z*W]=q.m;}else if(d<q.r+3.5){const t=sstep(0,1,(d-q.r)/3.5);h=q.p.h*(1-t)+h*t;}}
    hmap[x+z*W]=Math.max(2,Math.min(H-12,Math.round(h)));
    let b=0;for(const s of ISLES)if(Math.hypot(x-s.x,z-s.z)<s.r+4)b=s.b;for(const s of ISLETS)if(Math.hypot(x-s.x,z-s.z)<s.r+3)b=8;
    if(!b&&typeof regionBiome==="function"&&hmap[x+z*W]>SL+3)b=regionBiome(x,z);
    if(!b){const a=Math.atan2(z-CZ,x-CX);let da=a-RA;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;if(Math.abs(da)<.5&&Math.hypot(x-CX,z-CZ)>islandR(a)+3)b=7;}
    biome[x+z*W]=b;}
  // reserved paths
  for(const p of PLOTS){const dx=p.x-LIB.x,dz=p.z-LIB.z,len=Math.hypot(dx,dz),px=-dz/len,pz=dx/len;
    for(let t=0;t<=len;t+=.4){for(let w=-1;w<=1;w++){const x=Math.round(LIB.x+dx*t/len+px*w*.7),z=Math.round(LIB.z+dz*t/len+pz*w*.7);if(!mask[x+z*W])mask[x+z*W]=2;}}}
  // stream from the mountain spring down to the sea
  const SA=MA+.55,ox=Math.cos(SA),oz=Math.sin(SA),qx=-oz,qz=ox;const carved=new Set();const pts=[];
  for(let t=7;t<60;t+=.3){const x=MX+ox*t+qx*Math.sin(t*.38)*2.4,z=MZ+oz*t+qz*Math.sin(t*.38)*2.4;const c=Math.floor(x)+Math.floor(z)*W;
    if(hmap[c]<=SL+2)break;pts.push([x,z]);
    for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){const X=Math.floor(x+dx*.6),Z=Math.floor(z+dz*.6),k=X+Z*W;if(!carved.has(k)){carved.add(k);mask[k]=3;}}}
  carved.forEach(k=>{hmap[k]=Math.max(SL+2,hmap[k]-1);});
  STREAM=pts;
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const hc=hmap[x+z*W],bm=biome[x+z*W];let mx=0;
    for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){const X=x+d[0],Z=z+d[1];if(X>=0&&Z>=0&&X<W&&Z<W)mx=Math.max(mx,Math.abs(hmap[X+Z*W]-hc));}
    const r5=hash2(x,z,5);
    for(let y=0;y<hc;y++){let t;const dep=hc-1-y;
      if(y<3)t=T.duboki;
      else if(hc<=SL+2){/* sea floor */t=dep<2?(bm===7?(r5<.08?T.sljunak:T.pijesak):(vnoise(x*.15,z*.15,21)>.68?T.sljunak:vnoise(x*.13,z*.13,23)>.72?T.glina:T.pijesak)):T.kamen;}
      else if(hc<=SL+3)t=dep<3?T.pijesak:T.kamen;
      else if(bm===1)t=dep<3?T.pijesak:dep<7?T.pjescenjak:T.kamen;
      else if(bm===3)t=dep===0?T.snijeg:dep<3?(mx>=2?T.kamen:T.zemlja):T.kamen;
      else if(bm===4)t=dep===0?T.micelij:dep<3?T.zemlja:T.kamen;
      else if(bm===5)t=dep===0?(r5<.5?T.kamen:T.bijela):T.kamen;
      else if(bm===6)t=dep===0?(r5<.25?T.mahovina:T.trava):dep<3?T.zemlja:T.kamen;
      else if(bm===10)t=dep===0?(r5<.18?T.mahovina:hc>=SL+14&&mx>=3?T.kamen:T.trava):dep<3?T.zemlja:T.kamen;
      else if(dep===0)t=hc>=SL+30+Math.floor(vnoise(x*.2,z*.2,31)*4)?T.snijeg:(mx>=3||(hc>=SL+14&&r5<.45))?T.kamen:T.trava;
      else if(dep<3)t=(hc>=SL+14||mx>=3)?T.kamen:T.zemlja;else t=y<SL-1?T.duboki:T.kamen;
      vox[I(x,y,z)]=t;}}
  placeOres();
  carveCave();
  /* stream of real water blocks on a gravel bed, with falling water where it steps down or meets the sea */
  for(const k of carved){const x=k%W,z=(k/W)|0,h=hmap[k];if(h<SL+3)continue;vox[I(x,h-1,z)]=T.sljunak;vox[I(x,h,z)]=T.voda;baseWater.add(x+","+h+","+z);}
  for(const k of carved){const x=k%W,z=(k/W)|0,h=hmap[k];if(h<SL+3)continue;
    for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){const X=x+d[0],Z=z+d[1];if(X<0||Z<0||X>=W||Z>=W)continue;const kk=X+Z*W,hn=hmap[kk];if(!(mask[kk]===3||hn<=SL+2))continue;
      for(let y=hn<=SL+2?SL+2:hn+1;y<h;y++){if(!vox[I(X,y,Z)]){vox[I(X,y,Z)]=T.voda;baseWater.add(X+","+y+","+Z);}}}}
  const snap=vox.slice();
  stampList(LIB,libraryBP(),1e9);
  // library plaza
  for(let z=-10;z<=10;z++)for(let x=-10;x<=10;x++){const d=Math.hypot(x,z);if(d>9.6)continue;const X=LIB.x+x,Z=LIB.z+z;if(vox[I(X,LIB.h-1,Z)]===T.trava)vox[I(X,LIB.h-1,Z)]=(d>7.2&&d<8.2)?T.kamen:T.kaldrma;}
  /* a workbench and a barrel by the library, for everyone */
  vox[I(LIB.x+6,LIB.h,LIB.z+5)]=T.stol;vox[I(LIB.x+7,LIB.h,LIB.z+5)]=T.bacva;
  if(typeof placeGarden==="function")placeGarden();if(typeof placeMarket==="function")placeMarket();
  buildReef();buildIsles();if(typeof buildRegions==="function")buildRegions();
  {let py=0;for(let z=-3;z<=3;z++)for(let x=-3;x<=3;x++)py=Math.max(py,hmap[Math.floor(MX+x)+Math.floor(MZ+z)*W]);POI.push({k:"vrh",n:"Vrh planine",x:MX,z:MZ,r:6,y:py-3});}
  const keep=new Set([T.koralj_p,T.koralj_r,T.koralj_z,T.koralj_c,T.koralj_l,T.prizmarin,T.ametist,T.kristal,T.led,T.kamen,T.bijela,T.voda,T.glina,T.pijesak]);
  for(let i=0;i<vox.length;i++){const t=vox[i];if(t&&t!==snap[i]&&!keep.has(t))prot[i]=1;}
  for(const c of CHESTS){const i=I(Math.floor(c.x),c.y-1,Math.floor(c.z));prot[i]=1;}
  for(const i of CAVE.frame||[])prot[i]=1;
}
/* ore veins in the stone: coal everywhere, iron lower, gold and diamonds deep, emeralds only in the mountain */
function placeOres(){const R=(()=>{let s=777;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};})();
  const veins=[["r_ugljen",1600,SL+30,5],["r_bakar",750,SL+16,4],["r_zeljezo",680,SL+12,4],["r_zlato",270,SL+6,3],["r_dijamant",110,SL+5,2],["r_smaragd",80,SL+24,2],["glina",160,SL+3,5]];
  for(const [k,n,ymax,sz] of veins){for(let i=0;i<n;i++){const x=2+Math.floor(R()*(W-4)),z=2+Math.floor(R()*(W-4)),hc=hmap[x+z*W];if(hc<5)continue;
    const y=3+Math.floor(R()*Math.max(1,Math.min(ymax,hc-2)-3));if(k==="r_smaragd"&&Math.hypot(x-MX,z-MZ)>27)continue;
    let cx=x,cy=y,cz=z;const m=sz+Math.floor(R()*sz);for(let j=0;j<m;j++){const t=get(cx,cy,cz);if(t===T.kamen||t===T.duboki||(k==="glina"&&(t===T.pijesak||t===T.sljunak)))vox[I(cx,cy,cz)]=T[k];
      const d=Math.floor(R()*6);if(d===0)cx++;else if(d===1)cx--;else if(d===2)cz++;else if(d===3)cz--;else if(d===4)cy++;else cy--;}}}
  /* the mountain hides a lot more near where the cave runs */
  for(let i=0;i<340;i++){const a=R()*6.283,r=R()*25,x=Math.floor(MX+Math.cos(a)*r),z=Math.floor(MZ+Math.sin(a)*r),y=SL+3+Math.floor(R()*16);const t=get(x,y,z);if(t===T.kamen)vox[I(x,y,z)]=R()<.6?T.r_ugljen:R()<.7?T.r_zeljezo:T.r_zlato;}}
/* the cave: a rubble-blocked mouth facing the library, a winding tunnel up into a crystal cavern with a pool, and side passages full of ore */
function carveCave(){const R=(()=>{let s=4242;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};})();
  const carve=(cx,cy,cz,r,ry)=>{ry=ry||r;for(let y=Math.floor(cy-ry);y<=Math.ceil(cy+ry);y++)for(let z=Math.floor(cz-r);z<=Math.ceil(cz+r);z++)for(let x=Math.floor(cx-r);x<=Math.ceil(cx+r);x++){
    if(!inb(x,y,z)||y<SL+3)continue;const dx=(x+.5-cx)/r,dy=(y+.5-cy)/ry,dz=(z+.5-cz)/r;if(dx*dx+dy*dy+dz*dz>1)continue;const t=vox[I(x,y,z)];if(t&&!TYPES[t].water)vox[I(x,y,z)]=0;}};
  const toLib=Math.atan2(CZ-MZ,CX-MX);let ex=MX,ez=MZ;
  for(let r=8;r<32;r+=.5){const x=MX+Math.cos(toLib)*r,z=MZ+Math.sin(toLib)*r;const h=hmap[Math.floor(x)+Math.floor(z)*W];if(h<=SL+11){ex=x;ez=z;break;}}
  const ey=hmap[Math.floor(ex)+Math.floor(ez)*W];CAVE.mouth={x:ex,y:ey,z:ez};
  /* keep the mouth and its approach clear of trees and tall plants so it can be seen from the path */
  for(let r=-2;r<9;r+=.5){const ax=ex+Math.cos(toLib)*r,az=ez+Math.sin(toLib)*r;const rr=r<2?4.5:3;for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){if(dx*dx+dz*dz>rr*rr)continue;const X=Math.floor(ax+dx),Z=Math.floor(az+dz);if(X<0||Z<0||X>=W||Z>=W)continue;if(!mask[X+Z*W])mask[X+Z*W]=6;}}
  /* main tunnel: from the mouth into the mountain, rising gently to the cavern */
  const cav={x:MX+Math.cos(toLib)*2,y:SL+11,z:MZ+Math.sin(toLib)*2};CAVE.cavern=cav;const path=[];
  const steps=60;for(let i=0;i<=steps;i++){const k=i/steps;const x=ex+(cav.x-ex)*k+Math.sin(k*7)*2.2*Math.sin(k*Math.PI),z=ez+(cav.z-ez)*k+Math.cos(k*5)*2*Math.sin(k*Math.PI),y=ey+.9+(cav.y-ey-.9)*k*k;
    carve(x,y+.6,z,1.55,1.5);path.push([x,y,z]);}
  CAVE.path=path;
  /* the cavern with a crystal shell and a pool */
  carve(cav.x,cav.y+1.5,cav.z,8.5,5);
  for(let y=Math.floor(cav.y-5);y<=cav.y+8;y++)for(let z=Math.floor(cav.z-11);z<=cav.z+11;z++)for(let x=Math.floor(cav.x-11);x<=cav.x+11;x++){if(!inb(x,y,z))continue;const t=vox[I(x,y,z)];if(!t||TYPES[t].water)continue;
    let open=false;for(const d of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]){if(!get(x+d[0],y+d[1],z+d[2])&&Math.hypot(x-cav.x,(y-cav.y)*1.4,z-cav.z)<10){open=true;break;}}
    if(open){const r=hash3(x,y,z);if(r<.16)vox[I(x,y,z)]=T.kristal;else if(r<.62)vox[I(x,y,z)]=T.ametist;else if(r<.7)vox[I(x,y,z)]=T.r_dijamant;}}
  for(let z=-3;z<=3;z++)for(let x=-3;x<=3;x++){const d=Math.hypot(x,z);if(d>3.2)continue;const X=Math.floor(cav.x+3+x),Z=Math.floor(cav.z-2+z);let fy=-1;for(let y=Math.floor(cav.y+6);y>cav.y-6;y--){if(get(X,y,Z)&&!TYPES[get(X,y,Z)].water){fy=y;break;}}
    if(fy<0)continue;const dep=d<2?2:1;for(let k=0;k<dep;k++){vox[I(X,fy-k,Z)]=T.voda;baseWater.add(X+","+(fy-k)+","+Z);}vox[I(X,fy-dep,Z)]=T.glina;}
  /* side passages */
  const ends=[];for(let w=0;w<4;w++){let x=cav.x,y=cav.y+.5,z=cav.z,a=R()*6.283,p=(R()-.5)*.3;const len=16+R()*16;
    for(let i=0;i<len;i++){a+=(R()-.5)*.6;p=Math.max(-.35,Math.min(.35,p+(R()-.5)*.2));x+=Math.cos(a);z+=Math.sin(a);y+=p;if(y<SL+4){y=SL+4;p=.1;}
      if(Math.hypot(x-MX,z-MZ)>28)break;carve(x,y+.5,z,1.3+R()*.5,1.3);}
    ends.push([x,y,z]);}
  CAVE.ends=ends;
  /* lanterns along the tunnel, set into the wall */
  for(let i=8;i<path.length-4;i+=9){const p=path[i];const side=(i/9)%2?1:-1;const q=path[Math.min(path.length-1,i+1)];const dx=q[0]-p[0],dz=q[2]-p[2],l=Math.hypot(dx,dz)||1;
    for(let r=1;r<4;r++){const X=Math.floor(p[0]-dz/l*side*r),Y=Math.floor(p[1])+2,Z=Math.floor(p[2]+dx/l*side*r);const t=get(X,Y,Z);if(t&&!TYPES[t].water){vox[I(X,Y,Z)]=T.lampion;break;}}}
  /* rubble in the mouth: dig through with a shovel (or paws) */
  for(let i=1;i<=3;i++){const p=path[i];for(let y=0;y<3;y++)for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const X=Math.floor(p[0]+dx),Y=Math.floor(p[1])+y+1,Z=Math.floor(p[2]+dz);if(inb(X,Y,Z)&&!vox[I(X,Y,Z)]&&Math.hypot(dx,dz)<1.8)vox[I(X,Y,Z)]=T.sljunak;}}
  /* a timber mine frame where the tunnel enters the hill, with two lanterns, so the way in is easy to spot */
  CAVE.frame=[];{let i0=1;for(let i=1;i<20;i++){const p=path[i];if(hmap[Math.floor(p[0])+Math.floor(p[2])*W]>=Math.floor(p[1])+4){i0=i;break;}}
    const p=path[i0],q=path[i0+2];const dx=q[0]-p[0],dz=q[2]-p[2],l=Math.hypot(dx,dz)||1;const px=-dz/l,pz=dx/l;const y0=Math.floor(p[1])+1;
    const put=(X,Y,Z,t)=>{if(!inb(X,Y,Z))return;vox[I(X,Y,Z)]=t;CAVE.frame.push(I(X,Y,Z));};
    for(let w=-1;w<=1;w++)for(let y=0;y<3;y++){const X=Math.floor(p[0]+px*w),Z=Math.floor(p[2]+pz*w);if(inb(X,y0+y,Z)&&vox[I(X,y0+y,Z)]!==T.sljunak)vox[I(X,y0+y,Z)]=0;}
    for(const sd of [-2,2]){const X=Math.floor(p[0]+px*sd),Z=Math.floor(p[2]+pz*sd);put(X,y0,Z,T.smreka_d);put(X,y0+1,Z,T.smreka_d);put(X,y0+2,Z,T.lampion);put(X,y0-1,Z,T.kaldrma);}
    for(let w=-2;w<=2;w++){const X=Math.floor(p[0]+px*w),Z=Math.floor(p[2]+pz*w);put(X,y0+3,Z,T.smreka_d);}
    CAVE.door={x:p[0],y:y0,z:p[2]};}
  /* the deepest passage hides a chest */
  const far=ends.reduce((b,e)=>Math.hypot(e[0]-cav.x,e[2]-cav.z)>Math.hypot(b[0]-cav.x,b[2]-cav.z)?e:b,ends[0]);
  addChest("spilja",far[0],far[1],far[2],"Škrinja iz dubine špilje");
  addChest("geoda",cav.x-4,cav.y,cav.z+3,"Kristalna škrinja");
  POI.push({k:"spilja",n:"Špilja",x:ex,z:ez});}
function addChest(id,x,y,z,n){x=Math.floor(x);z=Math.floor(z);let yy=Math.floor(y)+3;for(let k=0;k<10&&yy>1;k++){if(get(x,yy-1,z)&&!TYPES[get(x,yy-1,z)].water&&!get(x,yy,z))break;yy--;}
  if(get(x,yy,z))vox[I(x,yy,z)]=0;if(get(x,yy+1,z))vox[I(x,yy+1,z)]=0;CHESTS.push({id,x:x+.5,y:yy,z:z+.5,n});}
function colTop(x,z){for(let y=H-1;y>0;y--){const t=vox[I(x,y,z)];if(t&&!TYPES[t].water&&!TYPES[t].leaf)return y;}return 0;}
/* the reef: coral heads on the sand shelf and a sunken ship */
function buildReef(){const cs=[T.koralj_p,T.koralj_r,T.koralj_z,T.koralj_c,T.koralj_l];
  for(let z=1;z<W-1;z++)for(let x=1;x<W-1;x++){if(biome[x+z*W]!==7)continue;const h=hmap[x+z*W];if(h>SL+1)continue;const r=hash2(x,z,91);
    if(r<.05){const c=cs[Math.floor(hash2(x,z,92)*5)];const hh=1+Math.floor(hash2(x,z,93)*3);for(let y=0;y<hh&&h+y<SL+1;y++)vox[I(x,h+y,z)]=c;}
    else if(r<.07)vox[I(x,h,z)]=T.prizmarin;}
  const a=RA+.1,d=islandR(RA)+17;const sx=Math.floor(CX+Math.cos(a)*d),sz=Math.floor(CZ+Math.sin(a)*d);const fy=hmap[sx+sz*W];
  const b=BP();/* hull along x */for(let x=-6;x<=6;x++){const w=x<-3?Math.max(0,2-(-3-x)):x>4?Math.max(0,2-(x-4)):2;
    for(let z=-w;z<=w;z++){b.set(x,0,z,T.tdaske);if(Math.abs(z)===w){b.set(x,1,z,T.tdaske);if(x%3!==0)b.set(x,2,z,T.tdaske);}}}
  for(let x=-4;x<=3;x++)for(let z=-1;z<=1;z++)if((x+z)%4)b.set(x,2,z,T.daske);
  for(let y=1;y<7;y++)b.set(0,y,0,T.drvo);b.set(1,5,0,T.drvo);b.set(2,5,0,T.drvo);b.set(-5,1,0,T.drvo);
  const L=b.list();for(const p of L){const X=sx+p[0],Y=fy+p[1],Z=sz+p[2];if(inb(X,Y,Z)&&!(hash3(X,Y,Z)<.12&&p[1]>0))vox[I(X,Y,Z)]=p[3];}
  for(let x=-3;x<=3;x++)for(let z=-1;z<=1;z++)vox[I(sx+x,fy+1,sz+z)]=0;
  addChest("brod",sx+2,fy+1,sz,"Škrinja s potonulog broda");CAVE.ship={x:sx,y:fy,z:sz};POI.push({k:"brod",n:"Potonuli brod",x:sx,z:sz});}
/* the six far islands, each with its own landmark */
function buildIsles(){for(const s of ISLES){const cx=Math.floor(s.x),cz=Math.floor(s.z);const top=(x,z)=>colTop(x,z);POI.push({k:s.k,n:s.n,x:cx,z:cz});
  if(s.k==="pustinja"){/* stepped sandstone temple with a room inside */const by=top(cx,cz)+1;const b=BP();
    for(let l=0;l<4;l++){const r=5-l;b.box(-r,l*2,-r,r,l*2+1,r,l%2?T.upjescenjak:T.pjescenjak);}b.box(-3,1,-3,3,3,3,0);b.box(-1,1,4,1,2,5,0);b.box(-1,1,-5,1,2,-4,0);
    b.set(-3,1,-3,T.lampion);b.set(3,1,-3,T.lampion);b.set(-3,1,3,T.lampion);b.set(3,1,3,T.lampion);b.box(-1,8,-1,1,8,1,T.zlato);b.set(0,9,0,T.lampion);
    for(const p of b.list()){const X=cx+p[0],Y=by+p[1],Z=cz+p[2];if(inb(X,Y,Z))vox[I(X,Y,Z)]=p[3];}
    for(const p of b.list())if(!p[3]){const X=cx+p[0],Y=by+p[1],Z=cz+p[2];if(inb(X,Y,Z))vox[I(X,Y,Z)]=0;}addChest("hram",cx,by+1,cz,"Škrinja iz pustinjskog hrama");}
  if(s.k==="snijeg"){/* an igloo */const by=top(cx,cz)+1;for(let y=0;y<=4;y++)for(let z=-4;z<=4;z++)for(let x=-4;x<=4;x++){const d=Math.hypot(x,y*1.05,z);if(d<=4.2&&d>3.2)vox[I(cx+x,by+y,cz+z)]=T.snijeg;else if(d<=3.2)vox[I(cx+x,by+y,cz+z)]=0;}
    for(let y=0;y<2;y++)for(let z=3;z<=5;z++)vox[I(cx,by+y,cz+z)]=0;vox[I(cx+2,by,cz-1)]=T.lampion;
    for(let z=-6;z<=6;z++)for(let x=-6;x<=6;x++){const X=cx+x+5,Z=cz+z-4;if(Math.hypot(x,z)<3.2){const y=top(X,Z);if(get(X,y,Z)===T.snijeg)vox[I(X,y,Z)]=T.led;}}
    addChest("iglu",cx-1,by,cz-1,"Škrinja iz iglua");}
  if(s.k==="gljive"){for(let i=0;i<7;i++){const a=i*2.4,r=i?3+i%3*2:0;const x=Math.floor(cx+Math.cos(a)*r),z=Math.floor(cz+Math.sin(a)*r);const y=top(x,z)+1;const h=4+((i*7)%4);
    for(let k=0;k<h;k++)vox[I(x,y+k,z)]=T.stapka;const cr=i?2:3;for(let dz=-cr;dz<=cr;dz++)for(let dx=-cr;dx<=cr;dx++){if(Math.abs(dx)===cr&&Math.abs(dz)===cr)continue;vox[I(x+dx,y+h,z+dz)]=T.gljiva;if(Math.abs(dx)<cr&&Math.abs(dz)<cr)vox[I(x+dx,y+h+1,z+dz)]=T.gljiva;}
    if(i===0){for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)vox[I(x+dx,y+h+2,z+dz)]=T.gljiva;}}
    addChest("gljiva",cx+2,top(cx+2,cz+1)+1,cz+1,"Škrinja ispod gljiva");}
  if(s.k==="tresnja"){/* pond and a little pavilion */for(let z=-3;z<=3;z++)for(let x=-3;x<=3;x++){if(Math.hypot(x,z*1.2)>3.3)continue;const X=cx-3+x,Z=cz+z;const y=top(X,Z);vox[I(X,y,Z)]=T.voda;baseWater.add(X+","+y+","+Z);vox[I(X,y-1,Z)]=T.glina;}
    const bx=cx+4,bz=cz-1,by=top(bx,bz)+1;const b=BP();b.box(-2,0,-2,2,0,2,T.tdaske);[[-2,-2],[2,-2],[-2,2],[2,2]].forEach(c=>{for(let y=1;y<=3;y++)b.set(c[0],y,c[1],T.drvo);});
    b.box(-3,4,-3,3,4,3,T.krov);b.box(-2,5,-2,2,5,2,T.krov);b.set(0,6,0,T.krov);b.set(0,3,0,T.lampion);
    for(const p of b.list()){const X=bx+p[0],Y=by+p[1],Z=bz+p[2];if(inb(X,Y,Z))vox[I(X,Y,Z)]=p[3];}addChest("paviljon",bx,by+1,bz+1,"Škrinja u paviljonu");}
  if(s.k==="kristal"){/* a geode, half open */const gy=top(cx,cz)-1;for(let y=-5;y<=5;y++)for(let z=-5;z<=5;z++)for(let x=-5;x<=5;x++){const d=Math.hypot(x,y,z);const X=cx+x,Y=gy+y,Z=cz+z;if(!inb(X,Y,Z))continue;
      if(d<=5.2&&d>4.4)vox[I(X,Y,Z)]=T.kamen;else if(d<=4.4&&d>3.7)vox[I(X,Y,Z)]=T.bijela;else if(d<=3.7&&d>3)vox[I(X,Y,Z)]=hash3(X,Y,Z)<.25?T.kristal:T.ametist;else if(d<=3)vox[I(X,Y,Z)]=0;}
    for(let y=0;y<=6;y++)for(let z=-6;z<=6;z++)for(let x=1;x<=6;x++){if(Math.hypot(x-4,y-2,z)<3.2&&inb(cx+x,gy+y,cz+z))vox[I(cx+x,gy+y,cz+z)]=0;}
    addChest("geoda2",cx-1,gy-2,cz,"Škrinja u geodi");}
  if(s.k==="rusevine"){/* a broken stone tower with a winding stair */const by=top(cx,cz)+1;
    for(let y=0;y<13;y++)for(let z=-3;z<=3;z++)for(let x=-3;x<=3;x++){const edge=Math.abs(x)===3||Math.abs(z)===3;const X=cx+x,Y=by+y,Z=cz+z;
      if(edge){if(y>9&&hash3(X,Y,Z)<.45){vox[I(X,Y,Z)]=0;continue;}vox[I(X,Y,Z)]=hash3(X,Y,Z)<.2?T.mahovina:T.kcigla;}else vox[I(X,Y,Z)]=0;}
    const ring=[[-2,-2],[-1,-2],[0,-2],[1,-2],[2,-2],[2,-1],[2,0],[2,1],[2,2],[1,2],[0,2],[-1,2],[-2,2],[-2,1],[-2,0],[-2,-1]];for(let y=0;y<11;y++){const c=ring[y%16];vox[I(cx+c[0],by+y,cz+c[1])]=T.kcigla;}
    for(let y=0;y<2;y++)vox[I(cx,by+y,cz+3)]=0;for(let y=0;y<2;y++)vox[I(cx,by+6+y,cz-3)]=T.staklo;
    for(let z=-1;z<=1;z++)for(let x=-1;x<=1;x++)vox[I(cx+x,by+10,cz+z)]=T.kcigla;
    for(const w of [[6,2],[-5,5],[3,-6]])for(let k=0;k<4;k++){const X=cx+w[0]+k,Z=cz+w[1];const y=top(X,Z)+1;for(let h=0;h<1+((k*3)%3);h++)vox[I(X,y+h,Z)]=T.kcigla;}
    addChest("kula",cx,by+11,cz,"Škrinja na vrhu kule");}}}
function stampList(plot,list,n){const c=Math.min(n,list.length);for(let i=0;i<c;i++){const p=list[i];setV(plot.x+p[0],plot.h+p[1],plot.z+p[2],p[3],true);}}
function paveFor(b){const p=PLOTS[b.plot];if(!p)return;const dx=p.x-LIB.x,dz=p.z-LIB.z,len=Math.hypot(dx,dz),px=-dz/len,pz=dx/len;
  for(let t=0;t<=len;t+=.4){for(let w=-1;w<=1;w++){const x=Math.round(LIB.x+dx*t/len+px*w*.6),z=Math.round(LIB.z+dz*t/len+pz*w*.6);
    if(Math.hypot(x-LIB.x,z-LIB.z)<9.6||Math.hypot(x-p.x,z-p.z)<4.5)continue;const y=topY(x,z);if(y<0)continue;const t0=get(x,y,z);if(t0===T.trava||t0===T.pijesak||t0===T.zemlja)setV(x,y,z,T.staza,true);}}
  for(let t=8;t<len-5;t+=7){const s=(Math.floor(t/7)%2)?1:-1;const x=LIB.x+dx*t/len+px*s*1.9,z=LIB.z+dz*t/len+pz*s*1.9;addLantern(x,z);}}
