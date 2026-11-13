/* =================== v48: LIKOVI (fit, animation layer, auras) ===================
   Everything here is additive: the old poses run first, this layer adds on top.
   Nothing is written to the save. */
const LK={on:true,idle:0,sit:0,tail:0,yaw0:0,hy:0,earT:3,earK:0,earS:1,fold:0,foldT:0};
const lkFoxParts=()=>rida?(rida.g.userData.foxParts||rida.g.userData.parts):null;
const lkWrap=a=>{while(a>Math.PI)a-=Math.PI*2;while(a<-Math.PI)a+=Math.PI*2;return a;};

/* ---------- ears become two hinged groups, so hats can fold them and they can twitch ---------- */
function lkEars(){const g=rida&&rida.g;if(!g)return null;if(g.userData.lkEars)return g.userData.lkEars;const P=lkFoxParts(),hd=P&&P.head;if(!hd)return null;
  const E=[];for(const s of [-1,1]){const piv=new THREE.Group();piv.position.set(s*.15,.21,.04);piv.userData.s=s;
    for(const m of hd.children.slice()){if(!m.isMesh||m.position.y<.25||Math.sign(m.position.x)!==s)continue;hd.remove(m);m.position.x-=piv.position.x;m.position.y-=piv.position.y;m.position.z-=piv.position.z;piv.add(m);}
    if(!piv.children.length)return g.userData.lkEars=[];hd.add(piv);E.push(piv);}
  return g.userData.lkEars=E;}
/* hats that cover the head: ears fold out to the sides under the brim instead of poking through the hat */
const LKFOLD={carobnjak:1,detektiv:1,pirat:1,propeler:1,slamnati:1,rudar:1,kapetan:1,pero:1};
const LKHS={vijenac:1.14,kruna:1.2,dugakruna:1.16};
{const _sh=setHat;setHat=function(k){_sh.apply(this,arguments);LK.fold=k&&LKFOLD[k]?1:0;if(typeof hatObj!=="undefined"&&hatObj&&k&&LKHS[k]){hatObj.scale.set(LKHS[k],1,LKHS[k]);}lkEarPose(0,0,0);};}
function lkEarPose(rx,tw,dt){const E=lkEars();if(!E||!E.length)return;LK.foldT+=(LK.fold-LK.foldT)*(dt?Math.min(1,dt*10):1);const f=LK.foldT;
  for(const e of E){const s=e.userData.s;e.position.set(s*(.15+.1*f),.21-.15*f,.04);e.rotation.set(rx*(1-f),0,-s*1.2*f+(s===LK.earS?tw:0)*(1-f*.6));}}

/* ---------- neck items rebuilt as a real collar around the neck ---------- */
function lkNeck(k){const g=new THREE.Group();const box=(w,h,d,c,x,y,z,o,par)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),std(c,o));m.position.set(x,y,z);m.castShadow=true;(par||g).add(m);return m;};
  const collar=(c,h,o)=>{box(.58,h,.045,c,0,.545,.548,o);for(const s of [-1,1]){box(.04,h,.26,c,s*.27,.545,.4,o);box(.04,.2,.1,c,s*.27,.635,.225,o);}box(.58,.04,.1,c,0,.73,.225,o);};
  if(k==="sal"){const R=0xd8403a,Wt=0xf4f0e6;collar(R,.14);box(.585,.03,.05,Wt,0,.51,.55);for(const s of [-1,1])box(.045,.03,.265,Wt,s*.27,.51,.4);
    box(.15,.14,.07,R,.15,.53,.585);const t=new THREE.Group();t.position.set(.15,.47,.6);g.add(t);box(.13,.3,.045,R,0,-.15,0,null,t);box(.135,.04,.05,Wt,0,-.2,0,null,t);box(.135,.04,.05,Wt,0,-.27,0,null,t);
    const t2=new THREE.Group();t2.position.set(.2,.47,.585);t2.rotation.z=-.35;g.add(t2);box(.11,.2,.04,0xb8322e,0,-.1,0,null,t2);
    g.userData.anim=tt=>{t.rotation.z=Math.sin(tt*2.3)*.1;t.rotation.x=Math.sin(tt*1.7)*.08;t2.rotation.x=Math.sin(tt*2.1+1)*.1;};}
  else if(k==="masna"){collar(0x8a2a68,.06);const C=0xe04aa8,Dk=0xb83a8a;for(const s of [-1,1]){const w=new THREE.Group();w.position.set(s*.045,.5,.59);w.rotation.z=-s*.16;g.add(w);
      box(.17,.2,.05,C,s*.1,0,0,null,w);box(.05,.12,.055,Dk,s*.035,0,0,null,w);box(.04,.2,.056,0xf47ac4,s*.17,0,0,null,w);}
    box(.09,.11,.075,Dk,0,.5,.595);}
  else if(k==="marama"){const G=0x3a8a4a,L=0x5fb06a;collar(G,.1);[[.46,.09,.49],[.34,.08,.405],[.22,.08,.325],[.1,.07,.25]].forEach((r,i)=>box(r[0],r[1],.04,i%2?L:G,0,r[2],.56+i*.004));
    box(.08,.08,.05,0xffc53d,0,.49,.585);box(.1,.08,.1,G,0,.77,.2);box(.07,.12,.05,L,.07,.76,.13).rotation.z=-.4;}
  else if(k==="medaljon"){const Au={metalness:.6,roughness:.3},Y=0xffc53d;collar(Y,.035,Au);for(const s of [-1,1])box(.03,.13,.03,Y,s*.05,.475,.572,Au).rotation.z=s*.45;
    box(.16,.16,.035,Y,0,.385,.575,Au).rotation.z=Math.PI/4;const p=box(.095,.095,.05,0xf6f0ff,0,.385,.585,{roughness:.15,metalness:.1,emissive:LC(0xbfd0ff),emissiveIntensity:.35});p.rotation.z=Math.PI/4;
    g.userData.anim=tt=>{p.material.emissiveIntensity=.3+Math.pow(Math.max(0,Math.sin(tt*1.6)),8)*.9;};}
  else if(k==="neonogrlica"){const B=[],bead=(x,y,z)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,.06),new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xffffff,emissiveIntensity:1.1,roughness:.4}));b.position.set(x,y,z);b.rotation.set(.6,.6,0);g.add(b);B.push(b);};
    for(let i=0;i<7;i++)bead(-.24+i*.08,.535-Math.sin(i/6*Math.PI)*.05,.565);for(const s of [1,-1])for(let i=0;i<4;i++)bead(s*.285,.55+i*.05,.47-i*.085);for(let i=0;i<5;i++)bead(.2-i*.1,.75,.21);
    g.userData.anim=tt=>{B.forEach((b,i)=>{b.material.emissive.setHSL((tt*.3+i/B.length)%1,1,.55);b.material.color.copy(b.material.emissive);b.material.emissiveIntensity=.9+Math.sin(tt*5+i)*.35;});};}
  else return null;return g;}
{const _cm=costumeMesh;costumeMesh=function(k){const n=lkNeck(k);if(n){if(n.userData.anim)try{n.userData.anim(1.3,0);}catch(e){}return n;}
  const g=_cm.apply(this,arguments);
  if(g&&(k==="plast"||k==="zvjezdani")){/* the cape gets a drape that hangs behind, split so the tail passes through */
    const c=k==="plast"?0x7a3ab8:0x1e2a6a,e=k==="plast"?0xffc53d:0xbfd8ff,dr=new THREE.Group();dr.position.set(0,.745,-.47);g.add(dr);
    const bx=(w,h,d,col,x,y,z,o)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),std(col,o));m.position.set(x,y,z);m.castShadow=true;dr.add(m);return m;};
    bx(.6,.07,.04,c,0,-.02,0);for(const s of [-1,1]){bx(.15,.36,.04,c,s*.225,-.2,0);bx(.16,.05,.05,e,s*.225,-.37,0);if(k==="zvjezdani")bx(.05,.05,.05,0xfff0a0,s*.225,-.2,-.012,{emissive:LC(0xffd040),emissiveIntensity:1}).rotation.z=.78;}
    const _a=g.userData.anim;g.userData.anim=(tt,dt)=>{if(_a)_a(tt,dt);const hs=typeof FP!=="undefined"&&FP.on?Math.min(1,Math.hypot(FP.v.x,FP.v.z)/6):0;dr.rotation.x=.1+hs*.75+Math.sin(tt*(3+hs*6))*(.05+hs*.07);};}
  return g;};}

/* ---------- blinking: eyes are found by shape (small thin mirrored boxes on the head) ---------- */
function lkEyes(g){if(g.userData.lkEyes)return g.userData.lkEyes;const P=g.userData.parts,hd=P&&P.head,out=[];
  if(hd){const c=[];hd.traverse(m=>{const q=m.isMesh&&m.geometry&&m.geometry.parameters;if(!q||q.width==null)return;if(q.width<=.1&&q.height<=.11&&q.depth<=.045&&Math.abs(m.position.x)>.03&&m.position.z>0)c.push(m);});
    for(const a of c)if(c.some(b=>b!==a&&Math.abs(b.position.x+a.position.x)<.01&&Math.abs(b.position.y-a.position.y)<.01&&Math.abs(b.position.z-a.position.z)<.01))out.push(a);}
  return g.userData.lkEyes=out;}
function lkBlink(o,dt){if(o.lkB==null)o.lkB=1+Math.random()*4;o.lkB-=dt;const E=lkEyes(o.g);if(!E.length)return;let s=1;if(o.lkB<0){s=.12;if(o.lkB<-.13)o.lkB=o.lkB2?2+Math.random()*4:(o.lkB2=Math.random()<.25,o.lkB2?.16:2+Math.random()*4);if(o.lkB>.2)o.lkB2=false;}
  if(o.lkBs!==s){o.lkBs=s;for(const m of E)m.scale.y=s;}}

/* ---------- animals: look at Rida, wag, waddle ---------- */
const LKWAD=/patka|pingvin|kokos|guska|pile|galeb|papiga|sova|puran/;
{const _te=tickEnt;tickEnt=function(e,dt,t){_te.apply(this,arguments);if(!LK.on||!e.g)return;const fp=typeof FP!=="undefined"&&FP.on;if(e===rida&&fp)return;lkBlink(e,dt);
  const p=e.g.userData.parts;if(!p)return;const moving=e.tx!=null&&!e.roof;
  if(moving){const a=LKWAD.test(e.kind)?.13:.035;e.g.rotation.z=Math.sin(t*12+(e.ph||0))*a;e.lkW=1;if(p.head)p.head.rotation.x=Math.sin(t*12+(e.ph||0))*.06;}else if(e.lkW){e.g.rotation.z*=Math.max(0,1-dt*10);if(Math.abs(e.g.rotation.z)<.004){e.g.rotation.z=0;e.lkW=0;}}
  if(e!==rida&&rida&&p.head&&!moving&&!e.sleep&&!(e.celebrate>0)){const dx=rida.x-e.x,dz=rida.z-e.z,d=Math.hypot(dx,dz);
    if(d<6&&d>.5){const a=Math.max(-1,Math.min(1,lkWrap(Math.atan2(dx,dz)-e.g.rotation.y)));e.lkH=(e.lkH==null?p.head.rotation.y:e.lkH)+(a-(e.lkH==null?p.head.rotation.y:e.lkH))*Math.min(1,dt*4);p.head.rotation.y=e.lkH;p.head.rotation.x=-.08;
      if(p.tail&&d<3.5)p.tail.rotation.y=Math.sin(t*13+(e.ph||0))*.65;}
    else e.lkH=null;}else e.lkH=null;};}

/* ---------- Rida in explore mode: gallop, ears, tail follow-through, sitting down, looking at friends ---------- */
function lkRida(dt,tt){if(!rida||typeof FP==="undefined"||!FP.on)return;lkBlink(rida,dt);if(S.mg&&MCHAR[S.mg.char]){LK.idle=0;LK.sit=0;return;}
  const P=lkFoxParts();if(!P||!P.head)return;const g=rida.g,V=FP.v,hs=Math.hypot(V.x,V.z),moving=hs>.4,M=FP.mount,swim=FP.swim,busy=!!(FP.boat||M||FP.emo||FP.dig||swim);
  const yr=dt>0?lkWrap(FP.yaw-LK.yaw0)/dt:0;LK.yaw0=FP.yaw;LK.tail+=(Math.max(-.75,Math.min(.75,-yr*.11))-LK.tail)*Math.min(1,dt*6);
  if(P.tail&&!busy){P.tail.rotation.y+=LK.tail;if(!FP.ground)P.tail.rotation.x=Math.max(-.7,Math.min(.5,-.25-V.y*.05));}
  /* gallop */
  if(!busy&&FP.ground&&hs>5.5&&P.l0){const ph=FP.walk*2.2,k=Math.min(1,(hs-5.5)/1.5),a=Math.sin(ph)*1.05,b=Math.sin(ph-1.9)*1.05;
    P.l0.rotation.x+=(a-P.l0.rotation.x)*k;P.l1.rotation.x+=(Math.sin(ph+.35)*1.05-P.l1.rotation.x)*k;P.l2.rotation.x+=(b-P.l2.rotation.x)*k;P.l3.rotation.x+=(Math.sin(ph-1.55)*1.05-P.l3.rotation.x)*k;
    g.rotation.x+=Math.sin(ph+.7)*.075*k;P.head.rotation.x-=Math.sin(ph+.7)*.06*k;if(P.tail)P.tail.rotation.x=-.02+Math.sin(ph-.6)*.14*k;}
  /* idle: sit down after a while, look at the nearest friend */
  if(!busy&&!moving&&FP.ground)LK.idle+=dt;else LK.idle=0;LK.sit+=((LK.idle>7?1:0)-LK.sit)*Math.min(1,dt*(LK.idle>7?3.5:12));if(LK.sit<.004)LK.sit=0;
  const s=LK.sit;if(s>0&&P.l0){const e=s*s*(3-2*s);g.rotation.x-=.38*e;g.position.y-=.085*e;P.l0.rotation.x=P.l1.rotation.x=.38*e;P.l2.rotation.x=P.l3.rotation.x=-1.2*e;P.head.rotation.x+=.3*e;P.head.rotation.z=Math.sin(tt*.45)*.09*e;
    if(P.tail){P.tail.rotation.x=-.25+.6*e;P.tail.rotation.y=Math.sin(tt*2.2)*.55;}}else P.head.rotation.z=0;
  let tg=null;if(!busy&&!moving&&LK.idle>.6){let bd=7.5;for(const en of ents){if(en===rida||!en.g||!en.g.visible)continue;const dx=en.x-rida.x,dz=en.z-rida.z,d=Math.hypot(dx,dz);if(d<bd&&Math.abs(en.y-rida.y)<3){bd=d;tg=Math.atan2(dx,dz);}}}
  if(tg!=null){const a=Math.max(-1.05,Math.min(1.05,lkWrap(tg-FP.yaw)));LK.hy+=(a-LK.hy)*Math.min(1,dt*3.5);P.head.rotation.y=LK.hy;}else LK.hy=P.head.rotation.y;
  /* ears: swept back at speed and in the air, a flick now and then */
  LK.earT-=dt;if(LK.earT<0){LK.earT=2.5+Math.random()*5;LK.earK=.22;LK.earS=Math.random()<.5?-1:1;}LK.earK=Math.max(0,LK.earK-dt);
  const tw=LK.earK>0?Math.sin((1-LK.earK/.22)*Math.PI*2)*.38:0,back=busy?0:!FP.ground?-.5:-Math.min(.42,hs*.06);LK.earX=(LK.earX||0)+(back-(LK.earX||0))*Math.min(1,dt*9);lkEarPose(LK.earX,tw,dt);}

/* ---------- auras for legendary and wow looks ---------- */
const LKAURA={
  zlatna:{orb:{n:3,col:[0xffd23d,0xfff2a0],r:.95,y:.55,sp:1.5,sz:.1},ring:[0xffc53d],flash:{col:[0xfff6c0,0xffd23d],rate:3}},
  jantarna:{orb:{n:3,col:[0xffb030,0xffe08a],r:.95,y:.55,sp:1.3,sz:.1,gem:1},ring:[0xf0a020],flash:{col:[0xffe08a],rate:2}},
  kristalna:{orb:{n:5,col:[0x8ae8ff,0xeafcff,0x5ab8e8],r:1,y:.6,sp:1.1,sz:.11,gem:1,bob:.25},ring:[0x8ae8ff],flash:{col:[0xffffff,0xbff4ff],rate:2.5}},
  nebeska:{orb:{n:4,col:[0xffffff,0xd8ecff],r:.9,y:.3,sp:.8,sz:.16,bob:.1},ring:[0x8cc8ff],flash:{col:[0xffffff],rate:1.5}},
  dugina:{orb:{n:6,col:[0xffffff],r:1,y:.6,sp:1.6,sz:.1,hue:1},ring:[0xffffff],ringHue:1,rise:{col:[0xff5a5a,0xffc53d,0x5ad85a,0x5ab0ff,0xb070ff],rate:5,sz:.07,vy:.9}},
  galakticka:{orb:{n:7,col:[0xfff0a0,0xc8b0ff,0xffffff,0x8ab0ff],r:1.15,y:.7,sp:.9,sz:.075,gem:1,tilt:.45},ring:[0x8a60ff],flash:{col:[0xffffff,0xc8b0ff],rate:3}},
  vatrena:{ring:[0xff7a1e],rise:{col:[0xff5a1e,0xffa01e,0xffd23a],rate:16,sz:.1,vy:1.5,body:1},flash:{col:[0xffd23a],rate:1.5}},
  nocna:{orb:{n:5,col:[0xd8ff70,0xfff0a0],r:1.2,y:.8,sp:.5,sz:.055,bob:.4},ring:[0x6af0ff]},
  polarna:{orb:{n:4,col:[0xffffff,0xbff4ff],r:.95,y:.6,sp:.9,sz:.07,bob:.2},ring:[0x58d4c0],rise:{col:[0x6af0c0,0xb070ff,0x58d4c0],rate:6,sz:.08,vy:.8}},
  morska:{ring:[0x2ec8c0],rise:{col:[0xbff4ff,0xffffff,0x8ae8ff],rate:6,sz:.09,vy:.7},flash:{col:[0xffffff],rate:1}},
  svecana:{ring:[0xf2b22e],rise:{col:[0xd8392f,0xf2b22e,0x3fae52,0x3f8fe0,0xffffff],rate:7,sz:.07,vy:1.1},flash:{col:[0xfff3c4],rate:1.5}},
  disko:{orb:{n:6,col:[0xff4ad8,0x4ad8ff,0xffe04a,0x6aff8a],r:1.05,y:.7,sp:2.6,sz:.09,hue:1},ring:[0xffffff],ringHue:3,flash:{col:[0xffffff,0xff4ad8,0x4ad8ff],rate:5}},
  holo:{orb:{n:4,col:[0xffffff],r:1,y:.65,sp:1.2,sz:.1,gem:1,hue:1},ring:[0xffffff],ringHue:.6,flash:{col:[0xffffff],rate:3}},
  lava:{ring:[0xff5a10],rise:{col:[0xff7a1a,0xffc040,0xff3a00],rate:11,sz:.085,vy:1.2,body:1}},
  zvjezdana:{orb:{n:9,col:[0xfff0a0,0xffffff,0xbfd8ff],r:1.15,y:.75,sp:.8,sz:.065,gem:1,tilt:.5,bob:.15},ring:[0xbfd8ff],flash:{col:[0xffffff,0xfff0a0],rate:4}},
  dijamant:{orb:{n:4,col:[0xffffff,0xd8f4ff],r:.95,y:.65,sp:1.4,sz:.12,gem:1},ring:[0xd8f4ff],flash:{col:[0xffffff,0xd8f4ff,0xffd8f4],rate:7}},
  munja:{orb:{n:3,col:[0x8af0ff,0xffffff],r:.9,y:.6,sp:3.2,sz:.07},ring:[0x6ad0ff],flash:{col:[0xbff4ff,0xffffff],rate:6}}};
LKAURA["cw:dugin"]=LKAURA.dugina;LKAURA["cw:munja"]=LKAURA.munja;LKAURA["cw:aurora"]=LKAURA.polarna;LKAURA["cw:vatromet"]=LKAURA.svecana;LKAURA["cw:vatrena"]=LKAURA.vatrena;LKAURA["cw:feniks"]=LKAURA.vatrena;
const LA={key:null,grp:null,orb:[],rise:[],fl:[],ring:null,ra:0,fa:0,air:0};
function lkPix(kind){const c=document.createElement("canvas");c.width=c.height=32;const x=c.getContext("2d");x.fillStyle="#fff";
  if(kind==="ring"){for(let i=0;i<32;i++)for(let j=0;j<32;j++){const d=Math.hypot(i-15.5,j-15.5);const a=d>15.5?0:d>12.5?.95:d>10.5?.4:d>5?.1*(d-5)/5.5:0;if(a>0){x.globalAlpha=a*(((i+j)&1)&&d<12.5?.6:1);x.fillRect(i,j,1,1);}}}
  else{x.globalAlpha=1;x.fillRect(14,2,4,28);x.fillRect(2,14,28,4);x.fillRect(11,11,10,10);x.globalAlpha=.55;x.fillRect(9,9,14,14);}
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;return t;}
function lkAuraKey(){if(!rida||!S.mg)return null;const ch=S.mg.char;if(MCHAR[ch]){const o=typeof cwOutfit==="function"?cwOutfit(ch):"";return o&&LKAURA["cw:"+o]&&typeof CWO!=="undefined"&&CWO[ch]&&CWO[ch][o]&&CWO[ch][o].rar==="l"?"cw:"+o:null;}return LKAURA[S.mg.skin]?S.mg.skin:null;}
function lkAuraBuild(key){if(LA.grp){scene.remove(LA.grp);LA.grp.traverse(o=>{if(o.isMesh||o.isSprite){if(o.geometry&&o.isMesh)o.geometry.dispose();o.material.dispose();}});}LA.grp=null;LA.orb=[];LA.rise=[];LA.fl=[];LA.ring=null;LA.key=key;if(!key)return;
  const A=LKAURA[key],G=LA.grp=new THREE.Group();scene.add(G);const bm=c=>new THREE.MeshBasicMaterial({color:LC(c),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,fog:false});
  if(A.orb){const o=A.orb;for(let i=0;i<o.n;i++){const m=new THREE.Mesh(o.gem?new THREE.OctahedronGeometry(o.sz*.85):new THREE.BoxGeometry(o.sz,o.sz,o.sz),bm(o.col[i%o.col.length]));m.material.opacity=.95;const core=new THREE.Mesh(new THREE.BoxGeometry(o.sz*2.1,o.sz*2.1,o.sz*2.1),bm(o.col[i%o.col.length]));core.material.opacity=.16;m.add(core);G.add(m);LA.orb.push(m);}}
  if(A.ring){if(!LA.rt)LA.rt=lkPix("ring");const m=new THREE.Mesh(new THREE.PlaneGeometry(2.5,2.5),new THREE.MeshBasicMaterial({map:LA.rt,color:LC(A.ring[0]),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,fog:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.renderOrder=3;G.add(m);LA.ring=m;}
  if(A.rise)for(let i=0;i<18;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),bm(0xffffff));m.visible=false;m.userData.t=0;G.add(m);LA.rise.push(m);}
  if(A.flash){if(!LA.st)LA.st=lkPix("star");for(let i=0;i<7;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:LA.st,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,fog:false}));s.visible=false;s.userData.t=0;G.add(s);LA.fl.push(s);}}}
function lkAura(dt,tt){const key=LK.on?lkAuraKey():null;if(key!==LA.key)lkAuraBuild(key);if(!LA.grp)return;const A=LKAURA[key],g=rida.g,G=LA.grp;
  const under=typeof FP!=="undefined"&&FP.on&&FP.under;G.visible=g.visible&&!under&&!rida.frozenHide;if(!G.visible)return;G.position.copy(g.position);const sc=(S.mg&&MCHAR[S.mg.char]?.9:1);
  const yaw=g.rotation.y,cy=Math.cos(yaw),sy=Math.sin(yaw),fp=typeof FP!=="undefined"&&FP.on,grounded=!fp||FP.ground||FP.swim;LA.air+=((grounded?1:0)-LA.air)*Math.min(1,dt*8);
  if(A.orb){const o=A.orb,ti=o.tilt||.22;LA.orb.forEach((m,i)=>{const a=tt*o.sp+i/o.n*Math.PI*2,r=o.r*sc*(1+Math.sin(tt*.9+i)*.06);const x=Math.cos(a)*r,z=Math.sin(a)*r;m.position.set(x,o.y+z*Math.sin(ti)+(o.bob?Math.sin(tt*1.7+i*2.1)*o.bob:0),z*Math.cos(ti));m.rotation.set(tt*1.3+i,tt*1.7+i,0);
      const pu=.8+Math.sin(tt*4+i*1.7)*.2;m.scale.setScalar(pu);if(o.hue){m.material.color.setHSL((tt*.25+i/o.n)%1,1,.6);m.children[0].material.color.copy(m.material.color);}});}
  if(LA.ring){const m=LA.ring;m.position.y=.07;m.rotation.z=tt*.5;const pu=1+Math.sin(tt*2.6)*.06;m.scale.setScalar(pu*sc);m.material.opacity=(.45+Math.sin(tt*2.6)*.12)*LA.air;if(A.ringHue)m.material.color.setHSL((tt*.12*A.ringHue)%1,1,.6);}
  if(A.rise){const r=A.rise;LA.ra+=dt*r.rate;for(const m of LA.rise){if(m.userData.t>0){m.userData.t-=dt;const k=Math.max(0,m.userData.t/m.userData.l);m.position.y+=dt*r.vy*(.6+k*.6);m.position.x+=Math.sin(tt*3+m.userData.p)*dt*.25;m.scale.setScalar(r.sz*(.35+k*.75));m.rotation.y+=dt*2;m.material.opacity=Math.min(1,k*1.6);if(m.userData.t<=0)m.visible=false;}
      else if(LA.ra>=1){LA.ra--;m.visible=true;m.userData.l=m.userData.t=.7+Math.random()*.6;m.userData.p=Math.random()*6;let lx=(Math.random()-.5)*(r.body?.5:1.5),lz=r.body?-1+Math.random()*1.5:(Math.random()-.5)*1.5;m.position.set(lx*cy+lz*sy,(r.body?.7:.05)+Math.random()*.3,-lx*sy+lz*cy);m.material.color.copy(LC(r.col[Math.floor(Math.random()*r.col.length)]));}}if(LA.ra>3)LA.ra=3;}
  if(A.flash){const f=A.flash;LA.fa+=dt*f.rate;for(const s of LA.fl){if(s.userData.t>0){s.userData.t-=dt;const k=1-Math.max(0,s.userData.t/.4),e=Math.sin(k*Math.PI);s.scale.setScalar(.08+e*s.userData.z);s.material.opacity=e;s.material.rotation=k*1.2;if(s.userData.t<=0)s.visible=false;}
      else if(LA.fa>=1){LA.fa--;s.visible=true;s.userData.t=.4;s.userData.z=.1+Math.random()*.12;const lx=(Math.random()-.5)*.6,lz=-1+Math.random()*1.85,ly=.35+Math.random()*(lz>.2?.9:.45);s.position.set(lx*cy+lz*sy,ly,-lx*sy+lz*cy);s.material.color.copy(LC(f.col[Math.floor(Math.random()*f.col.length)]));}}if(LA.fa>3)LA.fa=3;}}

{const _tb=tickBubble;tickBubble=function(dt){_tb.apply(this,arguments);if(!LK.on)return;try{lkRida(dt,tt);lkAura(dt,tt);}catch(e){if(!LK.err){LK.err=1;console.warn("likovi",e);}}};}
