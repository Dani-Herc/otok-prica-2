/* =================== CREATURES =================== */
function mk(boxes){const g=new THREE.Group();const parts={};
  for(const b of boxes){const [w,h,d,x,y,z,col,part]=b;const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:LC(col),roughness:.8}));m.castShadow=true;
    if(part){if(!parts[part.name]){const pg=new THREE.Group();pg.position.set(part.px,part.py,part.pz);g.add(pg);parts[part.name]=pg;}m.position.set(x-part.px,y-part.py,z-part.pz);parts[part.name].add(m);}else{m.position.set(x,y,z);g.add(m);}}
  g.userData.parts=parts;return g;}
const legs=(w,h,sx,sz,col,ly)=>[["l0",-sx,sz],["l1",sx,sz],["l2",-sx,-sz],["l3",sx,-sz]].map(l=>[w,h,w,l[1],ly-h/2,l[2],col,{name:l[0],px:l[1],py:ly,pz:l[2]}]);
const MODELS={
  rida(){const O=0xe8772e,Wh=0xfff4e6,B=0x22201e,D=0x5a3420,hd={name:"head",px:0,py:.82,pz:.42},tl={name:"tail",px:0,py:.62,pz:-.45};
    return mk([[.5,.42,.9,0,.5,0,O],[.36,.3,.12,0,.45,.46,Wh],[.5,.44,.44,0,.82,.52,O,hd],[.26,.18,.22,0,.72,.82,Wh,hd],[.09,.08,.07,0,.78,.94,B,hd],[.07,.09,.03,-.13,.9,.75,B,hd],[.07,.09,.03,.13,.9,.75,B,hd],
      [.14,.22,.08,-.15,1.14,.46,O,hd],[.14,.22,.08,.15,1.14,.46,O,hd],[.15,.07,.09,-.15,1.27,.46,B,hd],[.15,.07,.09,.15,1.27,.46,B,hd],[.26,.26,.52,0,.62,-.72,O,tl],[.27,.27,.17,0,.62,-1.04,Wh,tl]].concat(legs(.13,.3,.15,.3,D,.3)));},
  zec(){const C=0xf2f0ec,P=0xf4b6c2,hd={name:"head",px:0,py:.55,pz:.25};return mk([[.4,.36,.55,0,.32,0,C],[.36,.34,.34,0,.55,.3,C,hd],[.08,.36,.06,-.08,.88,.26,C,hd],[.08,.36,.06,.08,.88,.26,C,hd],[.04,.3,.02,-.08,.88,.295,P,hd],[.04,.3,.02,.08,.88,.295,P,hd],[.05,.06,.02,-.1,.6,.47,0x222222,hd],[.05,.06,.02,.1,.6,.47,0x222222,hd],[.07,.05,.03,0,.52,.48,P,hd],[.18,.18,.12,0,.36,-.32,0xffffff]].concat(legs(.1,.14,.12,.18,C,.14)));},
  patka(){const Y=0xffffff,O=0xf29a1e,hd={name:"head",px:0,py:.55,pz:.2};return mk([[.4,.3,.55,0,.2,0,Y],[.14,.2,.14,0,.45,.2,Y,hd],[.26,.26,.26,0,.66,.24,Y,hd],[.18,.07,.16,0,.6,.42,O,hd],[.04,.05,.02,-.1,.7,.37,0x111111,hd],[.04,.05,.02,.1,.7,.37,0x111111,hd],[.2,.1,.18,0,.36,-.3,Y]]);},
  jez(){const S2=0x6b4a30,F=0xd9b48c,hd={name:"head",px:0,py:.22,pz:.25};const a=[[.46,.28,.56,0,.24,0,S2],[.24,.2,.22,0,.22,.33,F,hd],[.06,.06,.04,0,.22,.46,0x111111,hd]];for(let i=0;i<10;i++)a.push([.08,.18,.08,(i%3-1)*.15,.44,(Math.floor(i/3)-1.3)*.16,0x3b2a1c]);return mk(a.concat(legs(.08,.1,.14,.16,F,.1)));},
  ovca(){const Wl=0xf6f3ea,B=0x2a2624,hd={name:"head",px:0,py:.6,pz:.35};return mk([[.6,.5,.8,0,.55,0,Wl],[.66,.2,.6,0,.86,0,Wl],[.28,.3,.3,0,.62,.52,B,hd],[.06,.05,.02,-.08,.68,.68,0xffffff,hd],[.06,.05,.02,.08,.68,.68,0xffffff,hd],[.3,.12,.12,0,.78,.46,Wl,hd]].concat(legs(.12,.32,.2,.26,B,.32)));},
  kornjaca(){const G=0x3e8a3a,L=0x8bbf5a,hd={name:"head",px:0,py:.24,pz:.34};return mk([[.6,.28,.7,0,.28,0,G],[.46,.1,.56,0,.46,0,0x2f6e2e],[.22,.18,.22,0,.24,.44,L,hd],[.04,.04,.02,-.07,.28,.555,0x111111,hd],[.04,.04,.02,.07,.28,.555,0x111111,hd]].concat(legs(.14,.12,.26,.24,L,.14)));},
  macka(){const G=0x8a8f98,D=0x5d626b,hd={name:"head",px:0,py:.6,pz:.32},tl={name:"tail",px:0,py:.5,pz:-.3};return mk([[.36,.32,.66,0,.4,0,G],[.38,.32,.3,0,.62,.38,G,hd],[.1,.12,.06,-.12,.83,.36,D,hd],[.1,.12,.06,.12,.83,.36,D,hd],[.06,.07,.02,-.09,.66,.54,0x9be06a,hd],[.06,.07,.02,.09,.66,.54,0x9be06a,hd],[.08,.08,.5,0,.58,-.52,D,tl],[.37,.06,.2,0,.57,0,D],[.37,.06,.2,0,.57,-.2,D]].concat(legs(.1,.24,.11,.24,D,.24)));},
  papiga(){const R=0xe0333a,B=0x2b6fd6,Y=0xffd23a,hd={name:"head",px:0,py:.7,pz:.05};return mk([[.3,.44,.3,0,.42,0,R],[.32,.3,.12,0,.42,-.16,B],[.26,.26,.26,0,.78,.06,R,hd],[.1,.14,.12,0,.72,.24,0xf2e8c8,hd],[.05,.05,.02,-.1,.82,.19,0x111111,hd],[.05,.05,.02,.1,.82,.19,0x111111,hd],[.12,.36,.06,0,.18,-.2,Y],[.06,.1,.06,-.06,.15,0,0x555555],[.06,.1,.06,.06,.15,0,0x555555]]);},
  sova(){const Br=0x8a6038,L=0xd8bb8a,hd={name:"head",px:0,py:.7,pz:0};return mk([[.46,.5,.4,0,.4,0,Br],[.34,.36,.06,0,.38,.2,L],[.5,.4,.42,0,.86,0,Br,hd],[.16,.16,.04,-.12,.9,.22,0xfff6d8,hd],[.16,.16,.04,.12,.9,.22,0xfff6d8,hd],[.07,.08,.03,-.12,.9,.245,0x111111,hd],[.07,.08,.03,.12,.9,.245,0x111111,hd],[.08,.1,.08,0,.78,.24,0xe8a020,hd],[.1,.14,.08,-.18,1.1,0,Br,hd],[.1,.14,.08,.18,1.1,0,Br,hd],[.1,.06,.1,-.1,.15,.05,0xe8a020],[.1,.06,.1,.1,.15,.05,0xe8a020]]);}
};
const ents=[];
function walkable(x,z,swim){const y=topY(x,z);if(y<0)return null;if(swim)return y+1<=WATER?WATER-.2:null;if(y+1<WATER+.3)return null;if(mask[Math.floor(x)+Math.floor(z)*W]===3)return null;if(TYPES[vox[I(Math.floor(x),y,Math.floor(z))]].leaf)return null;return y+1;}
function spawn(kind,name,opts){const g=MODELS[kind]();const e={kind,name,g,x:0,z:0,y:0,tx:null,tz:null,wait:1+Math.random()*2,speed:(opts&&opts.speed)||1.4,swim:opts&&opts.swim,ph:Math.random()*10,hop:0,celebrate:0,roof:opts&&opts.roof};
  g.userData.ent=e;scene.add(g);ents.push(e);placeRandom(e,opts&&opts.near);return e;}
function placeRandom(e,near){for(let i=0;i<300;i++){const c=near||{x:CX,z:CZ};const r=near?4+Math.random()*4:6+Math.random()*24;const a=Math.random()*Math.PI*2;
  const x=Math.floor(c.x+Math.cos(a)*r)+.5,z=Math.floor(c.z+Math.sin(a)*r)+.5;const y=walkable(x,z,e.swim);if(y==null)continue;e.x=x;e.z=z;e.y=y;break;}
  if(e.roof){e.x=LIB.x+.5;e.z=LIB.z+.5;e.y=topY(e.x,e.z)+1;}}
function tickEnt(e,dt,t){const p=e.g.userData.parts;let moving=false;
  if(e.roof){e.y=topY(e.x,e.z)+1;}else if(e.goto){e.tx=e.goto.x;e.tz=e.goto.z;}
  if(!e.roof&&e.tx==null){e.wait-=dt;if(e.wait<=0){const a=Math.random()*Math.PI*2,r=2+Math.random()*6;e.tx=e.x+Math.cos(a)*r;e.tz=e.z+Math.sin(a)*r;e.wait=1.5+Math.random()*3;}}
  const done=()=>{e.tx=null;if(e.goto){e.goto=null;if(e.arrive){const f=e.arrive;e.arrive=null;f();}}};
  if(!e.roof&&e.tx!=null){const dx=e.tx-e.x,dz=e.tz-e.z,d=Math.hypot(dx,dz);
    if(d<.15)done();else{const s=Math.min(d,e.speed*(e.goto?2.4:1)*dt),nx=e.x+dx/d*s,nz=e.z+dz/d*s;const ny=walkable(nx,nz,e.swim);
      if(ny==null||ny-e.y>1.1||e.y-ny>2.1){if(e.goto&&e.goto.force&&ny!=null){e.x=nx;e.z=nz;e.y=ny;moving=true;}else done();}
      else{if(ny>e.y+.01)e.hop=1;e.x=nx;e.z=nz;e.y+=(ny-e.y)*Math.min(1,dt*10);moving=true;
        const ang=Math.atan2(dx,dz);let da=ang-e.g.rotation.y;while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;e.g.rotation.y+=da*Math.min(1,dt*8);}}}
  else if(!e.roof){const ny=walkable(e.x,e.z,e.swim);if(ny!=null)e.y+=(ny-e.y)*Math.min(1,dt*10);}
  e.hop=Math.max(0,e.hop-dt*3);let bob=0;
  if(e.celebrate>0){e.celebrate-=dt;bob=Math.abs(Math.sin(t*9))*.7;e.g.rotation.y+=dt*5;}
  else if(moving)bob=(e.kind==="zec")?Math.abs(Math.sin(t*10))*.35:Math.abs(Math.sin(t*12))*.06;
  if(e.swim)bob=Math.sin(t*2+e.ph)*.05;
  e.g.position.set(e.x,e.y+bob+Math.sin(e.hop*Math.PI)*.4,e.z);const sw=moving?Math.sin(t*12+e.ph)*.6:0;
  if(p.l0){p.l0.rotation.x=sw;p.l3.rotation.x=sw;p.l1.rotation.x=-sw;p.l2.rotation.x=-sw;}
  if(p.tail){p.tail.rotation.y=Math.sin(t*(moving?8:3)+e.ph)*.5;p.tail.rotation.x=-.25;}
  if(p.head){p.head.rotation.y=moving?0:Math.sin(t*.7+e.ph)*.5;p.head.rotation.x=moving?0:Math.sin(t*.5+e.ph)*.12;}}
let rida=null;
function syncVisitors(){for(const v of S.visitors){if(ents.find(e=>e.kind===v))continue;const V=VISITORS.find(x=>x.k===v);if(!V)continue;spawn(v,V.n,{speed:v==="kornjaca"?.4:v==="patka"?.8:1.1,swim:v==="patka",roof:v==="sova"});}}

