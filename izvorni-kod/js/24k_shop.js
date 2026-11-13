/* =================== ČAROBNA TRGOVINA & KUTIJE OTKRIĆA =================== */
/* The magic shop sells new fur for Rida, other characters to play as (each with a power), sparkly trails, magic gadgets
   (spring paws, rocket boots, umbrella glider, water shoes, a hoverboard, fireworks, a travel compass), dances and three new friends.
   Every new place, every new animal friend and the first rare find opens a Discovery Box; every reading day opens a Reader's Box. */

/* ---------- sprite particles: hearts, stars, notes, leaves, bubbles, butterflies ---------- */
function mgShape(x,k,fill,ol){x.save();x.lineJoin="round";x.lineCap="round";x.fillStyle=fill;x.strokeStyle=ol||"rgba(22,36,58,.9)";x.lineWidth=4;
  const star=(cx,cy,R,r)=>{x.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,q=i%2?r:R;x.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q);}x.closePath();};
  if(k==="spark"){const g=x.createRadialGradient(32,32,0,32,32,30);g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(.3,"rgba(255,255,255,.75)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,64,64);}
  else if(k==="star"){const g=x.createRadialGradient(32,32,0,32,32,30);g.addColorStop(0,"rgba(255,255,255,.7)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,64,64);x.fillStyle=fill;star(32,33,24,10);x.fill();if(ol)x.stroke();}
  else if(k==="heart"){x.beginPath();x.moveTo(32,54);x.bezierCurveTo(4,36,6,12,22,12);x.bezierCurveTo(28,12,32,18,32,22);x.bezierCurveTo(32,18,36,12,42,12);x.bezierCurveTo(58,12,60,36,32,54);x.closePath();x.fill();x.stroke();x.fillStyle="rgba(255,255,255,.8)";x.beginPath();x.arc(21,23,4,0,7);x.fill();}
  else if(k==="note"){x.beginPath();x.ellipse(22,46,10,8,-.4,0,7);x.fill();x.stroke();x.beginPath();x.ellipse(46,40,10,8,-.4,0,7);x.fill();x.stroke();x.lineWidth=5;x.beginPath();x.moveTo(30,44);x.lineTo(30,12);x.lineTo(54,6);x.lineTo(54,38);x.stroke();x.lineWidth=3;x.strokeStyle=fill;x.beginPath();x.moveTo(30,42);x.lineTo(30,13);x.lineTo(53,7);x.lineTo(53,37);x.stroke();}
  else if(k==="bubble"){x.beginPath();x.arc(32,32,22,0,7);x.fillStyle="rgba(255,255,255,.18)";x.fill();x.lineWidth=4;x.strokeStyle=fill;x.stroke();x.fillStyle="rgba(255,255,255,.95)";x.beginPath();x.ellipse(24,22,6,4,-.6,0,7);x.fill();}
  else if(k==="leaf"){x.beginPath();x.moveTo(10,54);x.quadraticCurveTo(8,14,54,8);x.quadraticCurveTo(52,50,10,54);x.closePath();x.fill();x.stroke();x.lineWidth=3;x.beginPath();x.moveTo(12,52);x.lineTo(44,18);x.stroke();}
  else if(k==="flake"){x.strokeStyle=fill;x.lineWidth=5;for(let i=0;i<6;i++){const a=i*Math.PI/3;x.beginPath();x.moveTo(32,32);x.lineTo(32+Math.cos(a)*26,32+Math.sin(a)*26);x.stroke();const bx=32+Math.cos(a)*16,by=32+Math.sin(a)*16;x.beginPath();x.moveTo(bx,by);x.lineTo(bx+Math.cos(a+.8)*8,by+Math.sin(a+.8)*8);x.moveTo(bx,by);x.lineTo(bx+Math.cos(a-.8)*8,by+Math.sin(a-.8)*8);x.stroke();}}
  else if(k==="fly"){x.beginPath();x.ellipse(18,24,14,16,-.5,0,7);x.fill();x.stroke();x.beginPath();x.ellipse(46,24,14,16,.5,0,7);x.fill();x.stroke();x.beginPath();x.ellipse(20,46,10,9,.4,0,7);x.fill();x.stroke();x.beginPath();x.ellipse(44,46,10,9,-.4,0,7);x.fill();x.stroke();
    x.fillStyle="#2a2440";x.beginPath();x.ellipse(32,34,4,18,0,0,7);x.fill();x.fillStyle="rgba(255,255,255,.75)";x.beginPath();x.arc(16,20,4,0,7);x.arc(48,20,4,0,7);x.fill();}
  else if(k==="z"){x.font="900 50px system-ui,sans-serif";x.textAlign="center";x.textBaseline="middle";x.lineWidth=7;x.strokeText("Z",32,34);x.fillText("Z",32,34);}
  else if(k==="ring"){x.beginPath();x.arc(32,32,26,0,7);x.lineWidth=6;x.strokeStyle=fill;x.stroke();}
  x.restore();}
const MGT={};
function mgTex(k){if(MGT[k])return MGT[k];const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");
  const glowy=k==="spark"||k==="star"||k==="flake"||k==="ring"||k==="bubble";mgShape(x,k,"#ffffff",glowy?null:"rgba(22,36,58,.85)");
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return MGT[k]=t;}
const MGP={list:[],grp:new THREE.Group()};scene.add(MGP.grp);
(function(){for(let i=0;i<260;i++){const m=new THREE.SpriteMaterial({map:mgTex("spark"),transparent:true,depthWrite:false,fog:false});const s=new THREE.Sprite(m);s.visible=false;s.renderOrder=6;MGP.grp.add(s);MGP.list.push({s,on:false,age:0});}})();
let mgPi=0;
function mgSpawn(o){let p=null;for(let i=0;i<MGP.list.length;i++){const q=MGP.list[(mgPi+i)%MGP.list.length];if(!q.on){p=q;mgPi=(mgPi+i+1)%MGP.list.length;break;}}
  if(!p){p=MGP.list[mgPi];mgPi=(mgPi+1)%MGP.list.length;}
  const s=p.s,m=s.material;p.on=true;p.age=0;p.life=o.life||1;p.x=o.x;p.y=o.y;p.z=o.z;p.vx=o.vx||0;p.vy=o.vy||0;p.vz=o.vz||0;p.size=o.size||.3;p.size2=o.size2==null?p.size:o.size2;
  p.grav=o.grav||0;p.drag=o.drag||0;p.wob=o.wob||0;p.wf=2+Math.random()*3;p.ph=Math.random()*6;p.spin=o.spin||0;p.flap=!!o.flap;p.op=o.op==null?1:o.op;
  m.map=mgTex(o.t||"spark");const col=Array.isArray(o.col)?o.col[Math.floor(Math.random()*o.col.length)]:(o.col==null?0xffffff:o.col);m.color.copy(LC(col));
  m.blending=o.add?THREE.AdditiveBlending:THREE.NormalBlending;m.rotation=o.rot!=null?o.rot:(o.spin?Math.random()*6:0);s.visible=true;s.position.set(p.x,p.y,p.z);s.scale.setScalar(p.size);m.opacity=0;return p;}
function mgParts(dt){for(const p of MGP.list){if(!p.on)continue;p.age+=dt;const k=p.age/p.life;if(k>=1){p.on=false;p.s.visible=false;continue;}
    p.vy-=p.grav*dt;if(p.drag){const f=Math.max(0,1-p.drag*dt);p.vx*=f;p.vy*=f;p.vz*=f;}p.x+=p.vx*dt+(p.wob?Math.sin(p.age*p.wf+p.ph)*p.wob*dt:0);p.y+=p.vy*dt;p.z+=p.vz*dt+(p.wob?Math.cos(p.age*p.wf*.8+p.ph)*p.wob*dt*.6:0);
    const s=p.s;s.position.set(p.x,p.y,p.z);const sz=p.size+(p.size2-p.size)*k;s.scale.set(sz*(p.flap?.35+.65*Math.abs(Math.sin(p.age*13+p.ph)):1),sz,1);
    s.material.rotation+=p.spin*dt;s.material.opacity=p.op*Math.min(1,k*7)*Math.min(1,(1-k)*3);}}

/* ---------- the catalogue ---------- */
const FOXPAL={O:0xe8772e,W:0xfff4e6,B:0x22201e,D:0x5a3420};
const MSKIN={
  sumska:{n:"Šumska lisica",d:"Zelena kao mahovina u Velikoj šumi. Za njom lete listići.",p:90,rar:"c",O:0x5aa83a,W:0xe4f6b8,B:0x24401a,D:0x3a6a2a,fx:"lisce"},
  arkticka:{n:"Arktička lisica",d:"Bijela kao snijeg na vrhu planine.",p:120,rar:"r",O:0xf2f6fc,W:0xffffff,B:0x4a6a98,D:0xb8cade},
  srebrna:{n:"Srebrna lisica",d:"Sjaji kao mjesečina na moru.",p:150,rar:"r",O:0xb8c2ce,W:0xf2f5f8,B:0x2e3440,D:0x66707e,m:{metalness:.55,roughness:.32}},
  bombon:{n:"Bombon lisica",d:"Ružičasta kao šećerna vuna na sajmu.",p:180,rar:"r",O:0xff9ad0,W:0xfff0fa,B:0x8a4ad8,D:0x5ad0c0},
  nocna:{n:"Noćna lisica",d:"Tamna kao noćno nebo, a oči joj svijetle.",p:260,rar:"e",O:0x2c3266,W:0x8ab0ff,B:0x6af0ff,D:0x161a3a,glowB:1},
  vatrena:{n:"Vatrena lisica",d:"Iz krzna joj frcaju iskre, a ne peče nikoga!",p:380,rar:"e",O:0xff5a1e,W:0xffd23a,B:0x3a0a00,D:0x8a1a00,glowO:.45,fx:"iskre"},
  zlatna:{n:"Zlatna lisica",d:"Prava zlatna, od vrha ušiju do repa.",p:600,rar:"l",O:0xffc53d,W:0xfff2b0,B:0x7a4a00,D:0xc98a00,m:{metalness:.75,roughness:.25},fx:"zlato"},
  kristalna:{n:"Kristalna lisica",d:"Svjetluca kao kristali iz duboke špilje.",p:700,rar:"l",O:0x8ae8ff,W:0xeafcff,B:0x2a6aa8,D:0x5ab8e8,glowO:.3,m:{metalness:.2,roughness:.12},fx:"kristal"},
  dugina:{n:"Dugina lisica",d:"Polako mijenja sve boje duge.",p:800,rar:"l",O:0xff5a5a,W:0xffffff,B:0x22201e,D:0x5a3a8a,rainbow:1},
  galakticka:{n:"Galaktička lisica",d:"U krznu nosi zvijezde i daleke galaksije.",p:950,rar:"l",O:0x2a1a5a,W:0xc8b0ff,B:0xfff0a0,D:0x14103a,glowO:.35,glowB:1,fx:"galaksija"}};
const MCHAR={
  zec:{n:"Zečica Skokica",d:"Malo je, ali skače kao opruga!",perk:"Skače puno više",p:300,rar:"r",sc:1.25},
  macka:{n:"Mačka Brzica",d:"Tiha i brza kao vjetar.",perk:"Trči brže",p:300,rar:"r",sc:1.35},
  pingvin:{n:"Pingvin Plivko",d:"Na kopnu se gega, a u moru leti.",perk:"Pliva dvaput brže i nikad se ne umori",p:320,rar:"r",sc:1.3},
  jez:{n:"Ježić Kotrljko",d:"Kad potrči, smota se u loptu i kotrlja!",perk:"Kotrljanje u trku",p:380,rar:"e",sc:1.55},
  panda:{n:"Crvena panda Akrobatka",d:"Najspretnija penjačica na otoku.",perk:"Dvostruki skok",p:450,rar:"e",sc:1.35},
  sova:{n:"Sovica Lepršica",d:"Raširi krila i jedri kroz zrak.",perk:"Lebdi kad u zraku držiš Skok",p:500,rar:"e",sc:1.1}};
const MTRAIL={
  lisce:{n:"Lišće na vjetru",d:"Šareni listići vrte se iza tebe.",p:70,rar:"c"},
  zvjezdice:{n:"Zvjezdice",d:"Iza svakog koraka zablista zvijezda.",p:80,rar:"c"},
  mjehurici:{n:"Mjehurići",d:"Sapunasti mjehurići lebde prema nebu.",p:80,rar:"c"},
  srca:{n:"Srca",d:"Gdje god prođeš, ostane malo ljubavi.",p:120,rar:"r"},
  pahulje:{n:"Pahulje",d:"Mala zima prati tvoje korake.",p:120,rar:"r"},
  note:{n:"Glazbene note",d:"Svaki korak zasvira tihu melodiju.",p:140,rar:"r"},
  iskre:{n:"Vatrene iskre",d:"Iskre frcaju kao s vatrometa.",p:200,rar:"e"},
  leptiri:{n:"Leptirići",d:"Šareni leptiri lete za tobom.",p:260,rar:"e"},
  duga:{n:"Duga",d:"Za tobom se proteže prava duga!",p:350,rar:"l"}};
const MGAD={
  opruge:{n:"Opružne šape",d:"Svaki skok je puno viši. Boing!",p:220,rar:"r",tog:1},
  vatromet:{n:"Vatromet",d:"Ukrasi nebo šarenim vatrometom kad god želiš.",p:160,rar:"r",act:1},
  cizme:{n:"Raketne čizme",d:"U zraku skoči još jednom, uz plamen!",p:380,rar:"e",tog:1},
  kisobran:{n:"Kišobran-jedrilica",d:"U zraku drži Skok i lagano lebdi kao maslačak.",p:420,rar:"e",tog:1},
  vodene:{n:"Vodene cipele",d:"Hodaj po moru kao po livadi!",p:450,rar:"e",tog:1},
  kompas:{n:"Kompas putnika",d:"Odmah otputuj na bilo koje mjesto koje si otkrila.",p:600,rar:"l",act:1},
  daska:{n:"Lebdeća daska",d:"Juri po otoku i preko mora na dasci koja lebdi!",p:750,rar:"l",act:1}};
const MEMO={
  mahni:{n:"Mahanje",d:"Bok svima!",p:0,rar:"c",dur:1.7},
  ples:{n:"Ples",d:"Rida pleše uz glazbu.",p:80,rar:"c",dur:3.4},
  srca:{n:"Puno ljubavi",d:"Oblak srdaca za sve prijatelje.",p:100,rar:"r",dur:2},
  salto:{n:"Salto",d:"Skok s okretom unatrag.",p:120,rar:"r",dur:.95},
  vrtnja:{n:"Vrtuljak",d:"Vrti se, vrti, sve do zvijezda!",p:140,rar:"r",dur:2},
  spavanje:{n:"Drijemež",d:"Mali odmor na suncu. Zzz...",p:160,rar:"r",dur:999},
  zvijezda:{n:"Zvjezdani skok",d:"Visoki skok koji eksplodira zvijezdama!",p:220,rar:"e",dur:1.7}};
const MCAT=[];const mgAdd=(cat,k,o)=>{const it=Object.assign({id:cat+":"+k,cat,k},o);MCAT.push(it);return it;};
mgAdd("skin","",{n:"Klasična Rida",d:"Narančasta lisica kakvu svi znaju i vole.",p:0,rar:"c",free:1});for(const k in MSKIN)mgAdd("skin",k,MSKIN[k]);
mgAdd("char","",{n:"Lisica Rida",d:"Tvoja vjerna prijateljica s otoka.",p:0,rar:"c",free:1});for(const k in MCHAR)mgAdd("char",k,MCHAR[k]);
mgAdd("trail","",{n:"Bez traga",d:"Samo otisci šapica.",p:0,rar:"c",free:1});for(const k in MTRAIL)mgAdd("trail",k,MTRAIL[k]);
for(const k in MGAD)mgAdd("gad",k,MGAD[k]);
for(const k in MEMO)mgAdd("emo",k,Object.assign({free:MEMO[k].p===0?1:0},MEMO[k]));
const MPETS=["kapibara","robopas","feniks"];
const mgIt=id=>MCAT.find(i=>i.id===id);
const mgOwn=it=>!!it&&(!!it.free||!!S.mg.own[it.id]||(it.cat==="pet"&&!!S.met[it.k]));
const mgOn=it=>it.cat==="skin"?S.mg.skin===it.k:it.cat==="char"?S.mg.char===it.k:it.cat==="trail"?S.mg.trail===it.k:it.cat==="gad"?(it.tog?S.mg.gad[it.k]===1:false):false;
const mgGad=k=>!!S.mg&&!!S.mg.own["gad:"+k]&&S.mg.gad[k]===1;

/* ---------- three new friends ---------- */
MODELS.kapibara=function(){const B=0xa8784a,D=0x7a5434,N=0x3a2818,Or=0xff9a1e,G=0x4aa83a,hd={name:"head",px:0,py:.5,pz:.36};
  return mk([[.56,.46,.82,0,.42,0,B],[.5,.1,.7,0,.68,-.02,D],[.42,.38,.4,0,.52,.52,B,hd],[.4,.26,.14,0,.46,.78,D,hd],[.08,.05,.03,-.1,.5,.855,N,hd],[.08,.05,.03,.1,.5,.855,N,hd],[.06,.06,.02,-.13,.64,.725,N,hd],[.06,.06,.02,.13,.64,.725,N,hd],
    [.09,.07,.06,-.16,.74,.42,D,hd],[.09,.07,.06,.16,.74,.42,D,hd],[.2,.18,.2,0,.81,.48,Or,hd],[.06,.04,.1,.02,.92,.48,G,hd]].concat(legs(.13,.22,.19,.27,D,.22)));};
MODELS.robopas=function(){const M=0xb8c4d0,D=0x5a6676,Bl=0x4af0ff,R=0xff4a5a,hd={name:"head",px:0,py:.6,pz:.32},tl={name:"tail",px:0,py:.5,pz:-.32};
  const g=mk([[.4,.32,.62,0,.42,0,M],[.42,.06,.5,0,.6,0,D],[.06,.1,.3,-.21,.44,0,Bl],[.06,.1,.3,.21,.44,0,Bl],[.36,.32,.34,0,.66,.4,M,hd],[.3,.12,.06,0,.68,.58,0x1a2230,hd],[.07,.06,.02,-.08,.69,.615,Bl,hd],[.07,.06,.02,.08,.69,.615,Bl,hd],[.12,.08,.1,0,.56,.6,D,hd],
    [.08,.14,.08,-.14,.88,.36,D,hd],[.08,.14,.08,.14,.88,.36,D,hd],[.03,.18,.03,0,.92,.32,D,hd],[.07,.07,.07,0,1.03,.32,R,hd],[.06,.06,.3,0,.56,-.46,D,tl],[.08,.08,.08,0,.58,-.62,Bl,tl]].concat(legs(.12,.24,.14,.22,D,.24)));
  const gl=[LC(Bl).getHex(),LC(R).getHex()];g.traverse(o=>{if(!o.isMesh)return;if(gl.includes(o.material.color.getHex())){o.material.emissive=o.material.color.clone();o.material.emissiveIntensity=1;}else{o.material.metalness=.5;o.material.roughness=.35;}});return g;};
MODELS.feniks=function(){const R=0xe8402a,O=0xff8a1e,Y=0xffd23a,K=0x2a1408,hd={name:"head",px:0,py:.78,pz:.22},tl={name:"tail",px:0,py:.5,pz:-.28},wl={name:"wl",px:-.18,py:.62,pz:0},wr={name:"wr",px:.18,py:.62,pz:0};
  const g=mk([[.34,.38,.5,0,.5,0,R],[.28,.26,.12,0,.46,.24,O],[.3,.3,.32,0,.84,.24,R,hd],[.12,.08,.16,0,.8,.46,Y,hd],[.05,.06,.02,-.1,.88,.405,K,hd],[.05,.06,.02,.1,.88,.405,K,hd],[.06,.2,.06,0,1.06,.2,Y,hd],[.06,.15,.06,0,1.03,.09,O,hd],
    [.5,.05,.32,-.42,.62,-.02,O,wl],[.32,.05,.24,-.8,.62,-.08,Y,wl],[.5,.05,.32,.42,.62,-.02,O,wr],[.32,.05,.24,.8,.62,-.08,Y,wr],
    [.14,.06,.5,0,.52,-.55,O,tl],[.1,.05,.44,-.13,.5,-.64,Y,tl],[.1,.05,.44,.13,.5,-.64,Y,tl],[.05,.22,.05,-.08,.2,.04,Y],[.05,.22,.05,.08,.2,.04,Y]]);
  g.traverse(o=>{if(o.isMesh&&o.material.color.getHex()!==LC(K).getHex()){o.material.emissive=o.material.color.clone();o.material.emissiveIntensity=.35;}});return g;};
Object.assign(PETS,{
  kapibara:{fav:"lubenica",n:"Kapibara Bubi",src:"shop",price:350,d:"Najmirnija životinja na svijetu. Svi je vole, čak i ptice koje joj sjedaju na glavu.",gd:"Donosi mandarine i zlatnike koje nađe u travi.",gift:()=>[["coins",15],["bobice",2]]},
  robopas:{fav:"krumpir",n:"Robo-pas Bip",src:"shop",price:520,d:"Mali robot-pas s antenom. Kaže da mu krumpir puni baterije. Bip-bip!",gd:"Svojim skenerom nađe rude.",gift:()=>[["zeljezo",3],["bakar",3]]},
  feniks:{fav:MATS.svjetlocvijet?"svjetlocvijet":"bobice",n:"Feniks Plamko",src:"shop",price:900,d:"Vatrena ptica koja nikad ne peče, samo grije. Leti brže od zmaja!",gd:"Donosi zlatne grumene i čarobno sjeme.",gift:()=>[["grumen",2],["s_svjetlo",1]]}});
Object.assign(SPEC,{
  kapibara:{n:"Mandarine s neba",d:"Bubi se opusti u toploj kupki, a s neba padaju mandarine. Uhvati ih prije nego što padnu na tlo!",ic:"coin"},
  robopas:{n:"Lov na iskrice",d:"Bip ispusti svjetleće iskrice koje lete u krug. Trči, skači i pohvataj ih sve!",ic:"star"},
  feniks:{n:"Let na feniksu",d:"Plamko raširi vatrena krila i poleti s Ridom, a iza vas ostaje trag iskri!",ride:1,ic:"star"}});
RIDES.feniks={air:1,land:1,speed:10.5,jump:9,seat:1.0,scale:1.8};
NEWPETS.push(...MPETS);
for(const k of MPETS)mgAdd("pet",k,{n:PETS[k].n,d:PETS[k].d,p:PETS[k].price,rar:k==="feniks"?"l":k==="robopas"?"e":"r",perk:SPEC[k].n});
mgAdd("pet","panda",{n:PETS.panda.n,d:PETS.panda.d,p:PETS.panda.price,rar:"r",perk:SPEC.panda.n,sj:1});
mgAdd("pet","konjic",{n:PETS.konjic.n,d:PETS.konjic.d,p:PETS.konjic.price,rar:"e",perk:SPEC.konjic.n,sj:1});
{const _snp=spawnNewPet;spawnNewPet=function(k){if(!MPETS.includes(k))return _snp(k);let e=petEnt(k);if(e)return e;
  const near={x:LIB.x+.5+(k==="feniks"?-7:k==="kapibara"?7:0),z:LIB.z+11};e=spawn(k,PETS[k].n,{speed:k==="kapibara"?.8:1.5,near});if(k==="feniks")e.g.scale.setScalar(1.15);return e;};}
{const _pm=pickupMesh;pickupMesh=function(type){if(type!=="orange")return _pm(type);const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(.24,12,10),std(0xff9a1e,{emissive:LC(0xa04800),emissiveIntensity:.5,flatShading:false}));g.add(m);
  const lf=new THREE.Mesh(new THREE.BoxGeometry(.12,.04,.2),std(0x4aa83a));lf.position.set(.04,.25,0);lf.rotation.z=.4;g.add(lf);const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffb050,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7}));gl.scale.set(1.4,1.4,1);g.add(gl);g.userData.gl=gl;return g;};}
ACTS.kapibara=function(a){const en=a.en;const c={x:en.x,z:en.z,y:en.y};const pts=[];for(let i=0;i<40&&pts.length<8;i++){const s=landSpot(c.x,c.z,2.5,8,30);if(s)pts.push({x:s.x,y:s.y+5+pts.length*1.1,z:s.z,gy:s.y});}
  if(pts.length<5){toast("Ovdje nema dovoljno mjesta za mandarine. Pokušaj na livadi!",2800);return false;}
  addPickups(a,pts,"orange",1.3);a.limit=45;a.items.forEach((it,i)=>{it.gy=pts[i].gy;it.sp=.8+Math.random()*.5;});
  const pool=new THREE.Mesh(new THREE.CircleGeometry(1.1,20),new THREE.MeshBasicMaterial({color:0x7ad8ff,transparent:true,opacity:.75}));pool.rotation.x=-Math.PI/2;pool.position.set(en.x,en.y+.04,en.z);actGroup.add(pool);
  en.frozen=true;en.goto=null;en.tx=null;say(en,"Ahh, topla kupka... A sad pazi, s neba padaju mandarine!",4000);
  a.tick=(dt,tt)=>{for(const it of a.items){if(it.taken)continue;it.p.y-=it.sp*dt;if(it.p.y<it.gy+.35){burst(it.p.x,it.gy+.3,it.p.z,10,[[1,.6,.1],[1,.9,.5]],1,1.2,.5);tone(200,.05,"triangle",.02);
        const s=landSpot(c.x,c.z,2.5,8,30);if(s){it.p.x=s.x;it.p.z=s.z;it.gy=s.y;it.g.position.x=s.x;it.g.position.z=s.z;}it.p.y=it.gy+7+Math.random()*3;}}
    if(Math.random()<dt*5)mgSpawn({t:"spark",x:en.x+(Math.random()-.5)*1.4,y:en.y+.2,z:en.z+(Math.random()-.5)*1.4,vy:.7,life:1.6,size:.5,size2:1.1,col:0xffffff,op:.35,wob:.3});tickPickups(a,dt,tt);};
  a.prize=[["bobice",3]];a.winT="Sve mandarine su uhvaćene!";};
ACTS.robopas=function(a){const en=a.en;const c={x:FP.p.x,y:FP.p.y,z:FP.p.z};const pts=[];for(let i=0;i<7;i++)pts.push({x:c.x,y:c.y+.8,z:c.z});
  addPickups(a,pts,"star",1.25);a.limit=40;a.c=c;a.items.forEach((it,i)=>{it.ang=i/7*Math.PI*2;it.rad=2.4+(i%3)*1.5;it.h=.75+(i%2)*1.25;it.spd=(.55+Math.random()*.35)*(i%2?1:-1);});
  say(en,"Bip-bip! Iskrice su mi pobjegle! Uhvati ih!",3500);
  a.tick=(dt,tt)=>{for(const it of a.items){if(it.taken)continue;it.ang+=it.spd*dt;it.p.x=a.c.x+Math.cos(it.ang)*it.rad;it.p.z=a.c.z+Math.sin(it.ang)*it.rad;const gy=walkable(it.p.x,it.p.z,false);it.p.y=(gy!=null&&Math.abs(gy-a.c.y)<4?gy:a.c.y)+it.h;it.g.position.x=it.p.x;it.g.position.z=it.p.z;
      if(Math.random()<dt*8)mgSpawn({t:"star",x:it.p.x,y:it.p.y,z:it.p.z,life:.5,size:.25,size2:.02,col:[0x6af0ff,0xffffff],add:1});}
    tickPickups(a,dt,tt);};
  a.prize=[["zeljezo",2]];a.winT="Bip-bip-hura!";};
{const _mu=mountUp;mountUp=function(k){_mu(k);if(k==="feniks"&&FP.mount&&FP.mount.k==="feniks")toast("Plamko širi vatrena krila! Skok je gore, Roni je dolje. Za silazak: Siđi"+(PAD.on?" ili Y":"")+".",4600);};}

/* ---------- Rida's looks ---------- */
const FOXHEX={};for(const k in FOXPAL)FOXHEX[LC(FOXPAL[k]).getHex()]=k;
function mgPaint(o,pk,sk){const m=o.material;const hex=sk?sk[pk]:FOXPAL[pk];const c=LC(hex);if(o.userData.bc)o.userData.bc.copy(c);else m.color.copy(c);
  const mm=sk&&sk.m||{};m.metalness=mm.metalness||0;m.roughness=mm.roughness!=null?mm.roughness:.8;
  const gl=sk?(pk==="B"&&sk.glowB?1:pk==="O"&&sk.glowO?sk.glowO:pk==="W"&&sk.glowO?sk.glowO*.6:0):0;m.emissive.copy(gl?c:new THREE.Color(0));m.emissiveIntensity=gl||1;}
function mgPaintGroup(g,sk){g.traverse(o=>{if(!o.isMesh)return;const pk=FOXHEX[o.material.color.getHex()];if(pk)mgPaint(o,pk,sk);});}
function foxBody(){const g=rida.g;if(g.userData.body)return g.userData.body;const skip=new Set();const add=o=>o&&o.traverse(m=>skip.add(m));add(foxTool);add(foxLamp);if(typeof hatObj!=="undefined")add(hatObj);for(const k in partObj)add(partObj[k]);
  const out=[];g.traverse(o=>{if(!o.isMesh||skip.has(o))return;const c=o.userData.bc||o.material.color;const pk=FOXHEX[c.getHex()];if(pk){o.userData.pk=pk;out.push(o);}});return g.userData.body=out;}
function applySkin(){if(!rida)return;const sk=MSKIN[S.mg.skin]||null;for(const o of foxBody())mgPaint(o,o.userData.pk,sk);rida.shadeF=null;}
let charPiv=null;
function applyChar(){if(!rida)return;const g=rida.g,ud=g.userData;foxBody();if(!ud.foxParts)ud.foxParts=ud.parts;
  if(charPiv){g.remove(charPiv);charPiv.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});charPiv=null;}
  const k=S.mg.char,C=MCHAR[k];for(const o of ud.body)o.visible=!C;
  if(C){const m=MODELS[k]();m.scale.setScalar(C.sc);const box=new THREE.Box3().setFromObject(m);const cy=(box.min.y+box.max.y)/2;charPiv=new THREE.Group();charPiv.position.y=cy;m.position.y=-cy;charPiv.add(m);g.add(charPiv);ud.parts=m.userData.parts;}
  else ud.parts=ud.foxParts;
  const hd=ud.parts.head;if(hd&&foxTool.parent!==hd){hd.add(foxTool);foxTool.position.set(.1,-.12,.3);hd.add(foxLamp);foxLamp.position.set(0,-.26,.32);}
  mgCostumeVis();rida.shadeF=null;rida.fadeA=null;}
function mgCostumeVis(){const v=!(S.mg&&MCHAR[S.mg.char]);if(typeof hatObj!=="undefined"&&hatObj)hatObj.visible=v;for(const k in partObj)if(partObj[k])partObj[k].visible=v;}
{const _sh=setHat;setHat=function(k){_sh(k);if(S.mg)mgCostumeVis();};const _sp=setPart;setPart=function(s,k){_sp(s,k);if(S.mg)mgCostumeVis();};}
function applyPerks(){const C=S.mg.char;FP.jumpV=Math.max(mgGad("opruge")?9.8:0,C==="zec"?10.4:0)||0;FP.airJumps=(mgGad("cizme")||C==="panda")?1:0;FP.glide=mgGad("kisobran")||C==="sova";
  FP.waterWalk=mgGad("vodene");const pk=S.perks||{};FP.charSp=(C==="macka"?1.22:C==="jez"?1.1:1)*(pk.brzina?1.07:1);FP.swimMul=(C==="pingvin"?2:1)*(pk.plivanje?1.25:1);}
/* an umbrella for gliding */
let umbrella=null;
function makeUmbrella(){const g=new THREE.Group();const cols=[0xff7fa8,0xffd23a,0x6ad0ff,0x8fdc6a];for(let i=0;i<8;i++){const seg=new THREE.Mesh(new THREE.ConeGeometry(.75,.42,8,1,true,i*Math.PI/4,Math.PI/4),std(cols[i%4],{side:THREE.DoubleSide,flatShading:true}));g.add(seg);}
  const st=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.95,6),std(0x5a3420));st.position.y=-.45;g.add(st);const tp=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),std(0xffc53d));tp.position.y=.23;g.add(tp);g.position.set(0,1.75,.05);g.visible=false;return g;}
/* the hoverboard */
let boardG=null;
function makeBoard(){const g=new THREE.Group();const top=new THREE.Mesh(new THREE.BoxGeometry(.66,.07,1.25),std(0x7a52c7));top.position.y=.16;g.add(top);
  const st=new THREE.Mesh(new THREE.BoxGeometry(.2,.076,1.12),std(0xffc53d));st.position.y=.162;g.add(st);
  for(const s of [-1,1]){const n=new THREE.Mesh(new THREE.BoxGeometry(.56,.07,.24),std(0x9a72e8));n.position.set(0,.2,s*.7);n.rotation.x=s*-.3;g.add(n);}
  const glow=new THREE.Mesh(new THREE.BoxGeometry(.52,.03,1.02),new THREE.MeshBasicMaterial({color:0x6af0ff}));glow.position.y=.11;g.add(glow);
  const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x6af0ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.75}));gl.scale.set(1.8,1.8,1);gl.position.y=.04;g.add(gl);
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});g.userData.parts={};return g;}
function mgBoard(){if(!FP.on){toast("Lebdeća daska radi u istraživanju. Pritisni Istraži!",2600);return;}if(FP.mount&&FP.mount.k==="daska"){dismount();return;}if(ACT)endAct(false,true);if(FP.mount)dismount();
  if(FP.swim&&!FP.onWater){toast("Prvo izađi iz vode, pa stani na dasku.",2400);return;}if(FP.boat){FP.boat=false;FP.boatPark=FP.p.clone();FP.boatPark.y=WATER-.2;}
  if(!boardG)boardG=makeBoard();const P=FP.p;boardG.position.copy(P);boardG.rotation.set(0,FP.yaw,0);scene.add(boardG);
  const en={kind:"daska",name:"Lebdeća daska",g:boardG,x:P.x,y:P.y,z:P.z,frozen:true};FP.mount={k:"daska",en,land:1,hover:1,speed:10.5,jump:9.2,seat:.3,trail:1};
  sfx.fanfare();mgRing(P.x,P.y+.2,P.z,0x6af0ff);for(let i=0;i<20;i++)mgSpawn({t:"star",x:P.x,y:P.y+.2,z:P.z,vx:(Math.random()-.5)*4,vy:Math.random()*3,vz:(Math.random()-.5)*4,life:.8,size:.3,size2:.02,col:[0x6af0ff,0xffffff,0xb46cff],add:1,drag:2});
  if(typeof padRumble==="function"&&PAD.on)padRumble(200,.4,.4);toast("Daska lebdi! Juri preko trave i mora. Za silazak: Siđi"+(PAD.on?" ili Y":"")+".",3600);fpStat();}
{const _dm=dismount;dismount=function(){const M=FP.mount;if(M&&M.k==="daska"){FP.mount=null;scene.remove(M.en.g);rida.fadeA=null;sfx.pop();mgRing(FP.p.x,FP.p.y+.2,FP.p.z,0x6af0ff);fpStat();return;}_dm();if(M&&M.k==="feniks"&&M.en)M.en.g.scale.setScalar(1.15);};}

/* ---------- effects ---------- */
function mgRing(x,y,z,col){mgSpawn({t:"ring",x,y,z,life:.55,size:.4,size2:3.2,col:col||0xffffff,add:1,op:.9});}
function mgPoof(){if(!rida)return;const p=FP.on?FP.p:{x:rida.x,y:rida.y,z:rida.z};mgRing(p.x,p.y+.7,p.z,0xffe080);
  for(let i=0;i<34;i++){const a=Math.random()*Math.PI*2,s=1.5+Math.random()*2.5;mgSpawn({t:i%3?"star":"spark",x:p.x,y:p.y+.4+Math.random()*.8,z:p.z,vx:Math.cos(a)*s,vy:1+Math.random()*2.5,vz:Math.sin(a)*s,life:.9+Math.random()*.4,size:.35,size2:.03,col:[0xffd23d,0xff7fa8,0x6ad0ff,0xffffff,0xb46cff],add:1,drag:2.2,spin:3});}
  [784,988,1175,1568].forEach((f,i)=>tone(f,.18,"triangle",.035,i*.05));FP.squash=-.22;if(rida)rida.hop=1;}
const FWS=[];
function fireworks(){const b=FP.on?FP.p:rida?{x:rida.x,y:rida.y,z:rida.z}:null;if(!b)return;const cy=FP.on?FP.cam.yaw:Math.atan2(camera.position.x-b.x,camera.position.z-b.z);const fx=-Math.sin(cy),fz=-Math.cos(cy);if(FP.on){FP.camIdle=0;FP.cam.pitch=Math.min(FP.cam.pitch,-.08);}
  for(let i=0;i<6;i++)setTimeout(()=>{const d=13+Math.random()*8,sd=(Math.random()-.5)*14;FWS.push({x:b.x+fx*d+fz*sd,y:b.y+1,z:b.z+fz*d-fx*sd,vy:13+Math.random()*3,t:0,ty:.75+Math.random()*.3,col:[[0xff5a8a,0xffd23d],[0x6ad0ff,0xffffff],[0x8fdc6a,0xffe680],[0xb46cff,0xff9ad0],[0xffb02e,0xff5a1e]][Math.floor(Math.random()*5)]});
    for(let k=0;k<6;k++)tone(500+k*120,.05,"sine",.012,k*.05);},i*420);}
function tickFW(dt){for(let i=FWS.length-1;i>=0;i--){const r=FWS[i];r.t+=dt;r.y+=r.vy*dt;r.vy-=6*dt;if(Math.random()<.9)mgSpawn({t:"spark",x:r.x,y:r.y,z:r.z,vy:-.5,life:.45,size:.35,size2:.05,col:0xffe0a0,add:1});
    if(r.t>=r.ty){FWS.splice(i,1);mgSpawn({t:"spark",x:r.x,y:r.y,z:r.z,life:.35,size:3,size2:7,col:r.col[1],add:1,op:.8});
      const cs=r.col.map(h=>{const c=new THREE.Color(h);return [c.r,c.g,c.b];});for(let k=0;k<90;k++){const u=Math.random()*2-1,a=Math.random()*Math.PI*2,s=7+Math.random()*2,q=Math.sqrt(1-u*u);if(parts.length>=PMAX)parts.shift();parts.push({x:r.x,y:r.y,z:r.z,vx:Math.cos(a)*q*s,vy:u*s,vz:Math.sin(a)*q*s,l:1.1+Math.random()*.6,g:3,c:cs[k%cs.length]});}
      for(let k=0;k<38;k++){const u=Math.random()*2-1,a=Math.random()*Math.PI*2,s=5+Math.random()*3.5,q=Math.sqrt(1-u*u);mgSpawn({t:k%3?"spark":"star",x:r.x,y:r.y,z:r.z,vx:Math.cos(a)*q*s,vy:u*s,vz:Math.sin(a)*q*s,life:1.5,size:k%3?1.1:.9,size2:.12,col:r.col,add:1,drag:1.6,grav:1.5,spin:2});}
      tone(70,.35,"sawtooth",.05);tone(110,.25,"square",.025,.02);for(let k=0;k<5;k++)tone(1800+Math.random()*1500,.03,"square",.01,.25+k*.07);if(typeof padRumble==="function"&&PAD.on)padRumble(120,.5,.2);}}}
/* trails: what falls behind Rida's paws */
const TR={
  zvjezdice:p=>mgSpawn({t:"star",x:p.x,y:p.y+.2+Math.random()*.4,z:p.z,vy:.5,life:.9,size:.34,size2:.04,col:[0xffd23d,0xfff3a0,0xffffff],add:1,spin:2}),
  srca:p=>mgSpawn({t:"heart",x:p.x,y:p.y+.4,z:p.z,vy:1,life:1.4,size:.26,size2:.4,col:[0xff5a8a,0xff8ab0,0xff3a6a],wob:.7}),
  mjehurici:p=>mgSpawn({t:"bubble",x:p.x,y:p.y+.3,z:p.z,vy:.8,life:1.6,size:.18,size2:.38,col:[0xcfefff,0xffffff,0xffd0f0],wob:.6}),
  lisce:p=>mgSpawn({t:"leaf",x:p.x,y:p.y+.9,z:p.z,vy:.3,life:1.7,size:.28,col:[0x5ac83a,0x9ad83a,0xffb02e,0xe8742a],grav:.5,wob:1.2,spin:3}),
  pahulje:p=>mgSpawn({t:"flake",x:p.x,y:p.y+.5+Math.random()*.6,z:p.z,vy:.35,life:1.6,size:.26,col:[0xffffff,0xd8f0ff],add:1,grav:.25,wob:.5,spin:1.2}),
  note:p=>mgSpawn({t:"note",x:p.x,y:p.y+.5,z:p.z,vy:1,life:1.4,size:.34,col:[0xff5a8a,0x4aa8ff,0xffc53d,0x8fdc6a,0xb46cff],wob:.9}),
  iskre:p=>mgSpawn({t:"spark",x:p.x,y:p.y+.25,z:p.z,vx:(Math.random()-.5)*1.6,vy:1.4+Math.random()*1.6,vz:(Math.random()-.5)*1.6,life:.7,size:.24,size2:.02,col:[0xffb02e,0xff6a1e,0xffe080],add:1,grav:3}),
  leptiri:p=>mgSpawn({t:"fly",x:p.x,y:p.y+.6,z:p.z,vy:.6,life:2.4,size:.36,col:[0xff9ad0,0x8ad0ff,0xffe680,0xb8f08a,0xd0a8ff],wob:1.4,flap:1}),
  duga:p=>{const cs=[0xff4a4a,0xffa52a,0xffe83a,0x5ad85a,0x4aa8ff,0x9a6ae8];for(let i=0;i<6;i++)mgSpawn({t:"spark",x:p.x,y:p.y+1.05-i*.13,z:p.z,life:1,size:.3,size2:.18,col:cs[i],op:.9});}};
const TRATE={zvjezdice:14,srca:7,mjehurici:9,lisce:6,pahulje:10,note:4,iskre:18,leptiri:3.5,duga:0};
let mgLast=null,mgAcc=0,mgDist=0,mgNoteT=0;
function tickTrail(dt,tt){if(!rida||!S.mg)return;const g=rida.g.position;const cur={x:g.x,y:FP.on?FP.p.y:rida.y,z:g.z};if(!mgLast){mgLast=cur;return;}
  const dx=cur.x-mgLast.x,dz=cur.z-mgLast.z,d=Math.hypot(dx,dz);mgLast=cur;if(d>3)return;const hs=d/Math.max(dt,1e-4);const yaw=FP.on?FP.yaw:rida.g.rotation.y;
  const back={x:cur.x-Math.sin(yaw)*.45+(Math.random()-.5)*.25,y:cur.y,z:cur.z-Math.cos(yaw)*.45+(Math.random()-.5)*.25};
  const T=S.mg.trail,under=FP.on&&FP.under;if(T&&TR[T]&&hs>.8&&!under){if(T==="duga"){mgDist+=d;while(mgDist>.16){mgDist-=.16;TR.duga(back);}}else{mgAcc+=dt*TRATE[T]*Math.min(1.6,hs/4);while(mgAcc>1){mgAcc--;TR[T](back);}}
    if(T==="note"){mgNoteT-=dt;if(mgNoteT<=0){mgNoteT=.45;const sc=[523,587,659,784,880,1046];tone(sc[Math.floor(Math.random()*sc.length)],.16,"sine",.014);}}}
  const sk=MSKIN[S.mg.skin];if(sk&&sk.fx&&!under&&!MCHAR[S.mg.char]){const f=sk.fx,r=dt*(hs>.8?10:3.5);if(Math.random()<r){const p={x:cur.x+(Math.random()-.5)*.6,y:cur.y,z:cur.z+(Math.random()-.5)*.6};
      if(f==="iskre")TR.iskre(p);else if(f==="lisce"&&hs>.8)TR.lisce(back);else if(f==="zlato")mgSpawn({t:"star",x:p.x,y:p.y+.3+Math.random()*.8,z:p.z,life:.6,size:.22,size2:.02,col:[0xffd23d,0xffffff],add:1,spin:3});
      else if(f==="kristal")mgSpawn({t:"flake",x:p.x,y:p.y+.3+Math.random()*.8,z:p.z,vy:.2,life:.9,size:.22,size2:.04,col:[0x8ae8ff,0xffffff],add:1,spin:2});
      else if(f==="galaksija")mgSpawn({t:"star",x:p.x,y:p.y+.2+Math.random()*1,z:p.z,vy:.15,life:1.1,size:.2,size2:.02,col:[0xfff0a0,0xc8b0ff,0xffffff,0x8ab0ff],add:1,spin:1.5});}}
  if(S.mg.skin==="dugina"&&!MCHAR[S.mg.char]){const f=rida.shadeF||1;for(const o of foxBody()){if(o.userData.pk!=="O"&&o.userData.pk!=="D")continue;const c=new THREE.Color().setHSL((tt*.1+o.position.z*.25+(o.userData.pk==="D"?.5:0))%1,.8,o.userData.pk==="D"?.42:.58).convertSRGBToLinear();
      if(o.userData.bc)o.userData.bc.copy(c);o.material.color.copy(c).multiplyScalar(f);}}}

/* ---------- dances ---------- */
function mgDance(k){if(!FP.on){toast("Plesovi se plešu u istraživanju. Pritisni Istraži!",2600);return;}if(FP.mount&&FP.mount.k!=="daska"){toast("Prvo siđi s prijatelja, pa pleši!",2200);return;}if(FP.mount)dismount();
  if(!FP.ground||FP.swim){toast("Za ples treba čvrsto tlo!",2000);return;}FP.emo={k,t:0,fx:0};FP.v.x=FP.v.z=0;
  if(k==="mahni")say(rida,["Bok!","Hej, ovdje sam!","Pozdrav svima!"][Math.floor(Math.random()*3)],1800);
  if(k==="ples")[523,659,784,659,523,784,1046].forEach((f,i)=>tone(f,.16,"triangle",.03,i*.22));if(k==="srca")sfx.chime();if(k==="salto")[400,600,800,1000].forEach((f,i)=>tone(f,.06,"sine",.025,i*.04));
  if(k==="vrtnja")for(let i=0;i<10;i++)tone(600+i*80,.06,"triangle",.02,i*.12);if(k==="spavanje")say(rida,"Samo malo ću odmoriti...",2200);}
function emoteTick(dt,tt){const r={y:0,rx:0,ry:0,rz:0};if(!rida||!S.mg)return r;const p=rida.g.userData.parts,M=FP.mount;const hs=Math.hypot(FP.v.x,FP.v.z);
  if(M&&M.k==="daska"&&p.l0){[p.l0,p.l1,p.l2,p.l3].forEach(l=>l.rotation.x=0);r.rz+=FP.lean*.8;}
  const C=S.mg.char;
  if(C==="jez"&&FP.ground&&hs>4.6&&!FP.swim&&!M){FP.roll=(FP.roll||0)+dt*hs*2.4;if(charPiv)charPiv.rotation.x=FP.roll;if(Math.random()<dt*10)burst(FP.p.x,FP.p.y+.05,FP.p.z,1,[[.75,.62,.45]],.6,.6,.4);}else if(charPiv&&FP.roll){FP.roll=0;charPiv.rotation.x=0;}
  if(C==="pingvin"){if(FP.ground&&hs>.5&&!M)r.rz+=Math.sin(FP.walk*4.4)*.14;if(p.wl){const f=FP.swim?Math.sin(tt*10)*.9:hs>.5?Math.sin(FP.walk*4.4)*.3:0;p.wl.rotation.z=-f;p.wr.rotation.z=f;}}
  if(umbrella){const on=!!FP.gliding&&mgGad("kisobran")&&C!=="sova";if(on&&!umbrella.visible){tone(700,.12,"sine",.02);}umbrella.visible=on;if(on)umbrella.rotation.y+=dt*2;}
  if(C==="sova"&&FP.gliding&&Math.random()<dt*12)mgSpawn({t:"flake",x:FP.p.x,y:FP.p.y+.6,z:FP.p.z,vy:-.2,life:.6,size:.2,size2:.02,col:0xffffff,add:1});
  const E=FP.emo;if(!E)return r;
  if(hs>.9||!FP.ground&&E.k!=="salto"&&E.k!=="zvijezda"||FP.swim||(M&&M.k!=="daska")||FP.dig){FP.emo=null;return r;}
  E.t+=dt;const t=E.t,D=MEMO[E.k].dur;if(t>D){FP.emo=null;return r;}const P=FP.p;const spawnT=(n)=>{E.fx-=dt;if(E.fx<=0){E.fx=n;return true;}return false;};
  switch(E.k){
  case"mahni":r.rz+=Math.sin(t*7)*.06;r.y+=Math.abs(Math.sin(t*7))*.04;if(p.l0)p.l0.rotation.x=-2.3+Math.sin(t*16)*.45;if(p.head)p.head.rotation.z=Math.sin(t*7)*.15;break;
  case"ples":r.y+=Math.abs(Math.sin(t*8))*.2;r.ry+=Math.sin(t*4)*.7;r.rz+=Math.sin(t*8)*.14;if(p.l0){p.l0.rotation.x=Math.sin(t*8)*.9;p.l1.rotation.x=-Math.sin(t*8)*.9;}if(spawnT(.28))TR.note({x:P.x+(Math.random()-.5),y:P.y+.6,z:P.z+(Math.random()-.5)});
    if(spawnT(.28)){}break;
  case"srca":r.y+=Math.abs(Math.sin(t*6))*.12;if(spawnT(.07))mgSpawn({t:"heart",x:P.x,y:P.y+1,z:P.z,vx:(Math.random()-.5)*3,vy:2+Math.random()*1.5,vz:(Math.random()-.5)*3,life:1.3,size:.3,size2:.42,col:[0xff5a8a,0xff8ab0,0xff3a6a],drag:1.5,wob:.6});break;
  case"salto":{const k2=Math.min(1,t/D);r.y+=Math.sin(k2*Math.PI)*1.5;r.rx-=k2*Math.PI*2;if(p.l0)[p.l0,p.l1,p.l2,p.l3].forEach(l=>l.rotation.x=.9);if(spawnT(.04))mgSpawn({t:"spark",x:P.x,y:P.y+.5+r.y,z:P.z,life:.4,size:.3,size2:.05,col:0xffffff,add:1});if(t+dt>D){mgRing(P.x,P.y+.1,P.z);burst(P.x,P.y+.1,P.z,14,[[.9,.85,.7]],1.5,1,.5);}}break;
  case"vrtnja":r.ry+=t*t*7;r.y+=Math.min(.3,t*.3);if(spawnT(.04)){const a=t*20;mgSpawn({t:"star",x:P.x+Math.cos(a)*.7,y:P.y+.4+Math.random()*.6,z:P.z+Math.sin(a)*.7,vy:.8,life:.8,size:.3,size2:.03,col:[0xffd23d,0x6ad0ff,0xff7fa8,0xffffff],add:1});}break;
  case"spavanje":r.rz+=Math.min(1,t*2)*1.25;r.y+=Math.min(1,t*2)*.12;if(p.head)p.head.rotation.x=.3;if(p.tail)p.tail.rotation.y=.9;if(t>.6&&spawnT(1.1)){mgSpawn({t:"z",x:P.x+.2,y:P.y+.9,z:P.z,vx:.25,vy:.45,life:2,size:.22,size2:.5,col:0xbfe0ff,wob:.3});tone(220,.4,"sine",.012);}break;
  case"zvijezda":{if(t<.25){r.y-=t*.4;FP.squash=.12;}else{const k2=Math.min(1,(t-.25)/(D-.25));r.y+=Math.sin(k2*Math.PI)*2.6-.1*(1-k2);r.ry+=k2*Math.PI*4;if(!E.boom&&k2>.48){E.boom=1;const y=P.y+2.6;mgRing(P.x,y,P.z,0xffd23d);
      for(let i=0;i<40;i++){const a=Math.random()*Math.PI*2,u=Math.random()*2-1,s=4+Math.random()*3,q=Math.sqrt(1-u*u);mgSpawn({t:"star",x:P.x,y,z:P.z,vx:Math.cos(a)*q*s,vy:u*s,vz:Math.sin(a)*q*s,life:1,size:.45,size2:.05,col:[0xffd23d,0xfff3a0,0xff7fa8,0x6ad0ff],add:1,drag:2.5,spin:3});}
      [784,988,1175,1568,2093].forEach((f,i)=>tone(f,.3,"triangle",.04,i*.05));if(typeof padRumble==="function"&&PAD.on)padRumble(160,.5,.4);}}}break;}
  return r;}
function onFoxJump(dbl){if(!S.mg)return;const P=FP.p;
  if(dbl){if(mgGad("cizme")&&S.mg.char!=="panda"){tone(160,.18,"sawtooth",.035);tone(90,.25,"square",.02,.03);for(let i=0;i<22;i++)mgSpawn({t:"spark",x:P.x+(Math.random()-.5)*.3,y:P.y+.05,z:P.z+(Math.random()-.5)*.3,vx:(Math.random()-.5)*2,vy:-3-Math.random()*3,vz:(Math.random()-.5)*2,life:.5,size:.42,size2:.05,col:[0xffb02e,0xff5a1e,0xffe080],add:1,drag:3});}
    else if(S.mg.char==="panda")[880,1175].forEach((f,i)=>tone(f,.08,"triangle",.025,i*.05));}
  else if(FP.jumpV>8){tone(260,.06,"sine",.03);tone(520,.1,"sine",.025,.05);}}

/* ---------- discovery boxes ---------- */
const MGQ=[];let mgQT=0,mgClock=0,mgChk=0;
function mgQueue(o){MGQ.push(o);}
const BOXMATS=[["grumen",3,30],["biser",2,25],["ametist",4,25],["smaragd",1,15],["kristal",2,15],["s_svjetlo",1,12],["dijamant",1,10],["zlato",1,8]];
function mgPickNew(minR){const W2={c:50,r:30,e:15,l:6};const ord="crel";const pool=MCAT.filter(it=>!mgOwn(it)&&it.cat!=="pet"&&!it.wr&&(!minR||ord.indexOf(it.rar)>=ord.indexOf(minR)));
  if(!pool.length)return minR?mgPickNew(null):null;let sum=0;for(const it of pool)sum+=W2[it.rar];let r=Math.random()*sum;for(const it of pool){r-=W2[it.rar];if(r<=0)return it;}return pool[pool.length-1];}
function mgGive(it){S.mg.own[it.id]=today();if(it.cat==="trail"&&!S.mg.trail)S.mg.trail=it.k;if(it.cat==="gad"&&it.tog){S.mg.gad[it.k]=1;applyPerks();}if(it.cat==="skin"&&!S.mg.skin&&!S.mg.char){S.mg.skin=it.k;applySkin();}}
function mgIcon(it){if(!it)return "";const pv=(skin,ch)=>snapModel("p:pv:"+skin+"|"+ch,()=>{const g=ch?MODELS[ch]():MODELS.rida();if(!ch&&skin)mgPaintGroup(g,MSKIN[skin]);return g;},ch?.55:.75,ch?2.3:1.55);
  if(it.cat==="skin")return pv(it.k,"");if(it.cat==="char")return it.k?portrait(it.k):pv("","");if(it.cat==="pet")return portrait(it.k);return itemIcon("mg_"+it.cat+"_"+it.k);}
const catName={skin:"Izgled",char:"Lik",trail:"Trag",gad:"Čarolija",emo:"Ples",pet:"Životinja"};
function mgOpenBox(o){S.mg.boxes=(S.mg.boxes||0)+1;const n=S.mg.boxes;const items=[];const got=[];
  const big=o.kind==="read"||o.kind==="buy"||o.kind==="welcome";
  let coins=o.kind==="buy"?10+Math.floor(Math.random()*20):big?40+Math.floor(Math.random()*30):25+Math.floor(Math.random()*30);if(o.kind==="welcome")coins=100;
  if(Math.random()<.12&&o.kind!=="welcome"){coins+=100;items.push({ic:itemIcon("coin"),n:"Zlatna kiša!",cnt:100,rar:"l"});}
  if(S.perks&&S.perks.sreca)coins=Math.round(coins*1.5);S.coins+=coins;items.unshift(rwItem("coins",coins));
  const nm=o.kind==="buy"?0:big?2:1;for(let i=0;i<nm;i++){let sum=0;for(const m of BOXMATS)sum+=m[2];let r=Math.random()*sum;let pick=BOXMATS[0];for(const m of BOXMATS){r-=m[2];if(r<=0){pick=m;break;}}
    const q=1+Math.floor(Math.random()*pick[1]);S.mg.firsts[pick[0]]=1;giveN(pick[0],q);items.push(rwItem(pick[0],q));}
  const nItems=o.kind==="welcome"?2:o.kind==="read"?(Math.random()<.35?2:1):o.kind==="buy"?1:(n<=3||Math.random()<.6)?1:0;
  for(let i=0;i<nItems;i++){const it=o.kind==="welcome"&&i===0?mgIt("trail:zvjezdice"):o.kind==="welcome"?mgIt("emo:ples"):mgPickNew(n%5===0&&i===0?"e":o.kind==="buy"?"r":null);if(!it||mgOwn(it))continue;mgGive(it);got.push(it);items.push({ic:mgIcon(it),n:it.n,cnt:0,rar:it.rar});}
  if(!got.length&&nItems){S.coins+=60;items.push({ic:itemIcon("star"),n:"Zvjezdana prašina",cnt:60,rar:"e"});}
  save();renderEco();hotbarRender();mgBadge();
  const what=got.map(it=>catName[it.cat].toLowerCase()+" „"+it.n+"“").join(" i ");
  const sub=o.kind==="welcome"?"Svako novo mjesto, svaki novi prijatelj i prvo rijetko blago donose Kutiju otkrića. Svaki dan kad čitaš čeka te Kutija čitača. Trgovinu otvaraš zvjezdanim gumbom s darom.":
    (got.length?"Novo: "+what+". "+(got.some(i=>i.cat==="trail"&&S.mg.trail===i.k)?"Rida ga već nosi! ":"")+"Sve nađeš u Čarobnoj trgovini.":"Svako otkriće puni tvoju zbirku. Zbirka: "+mgCount()[0]+" od "+mgCount()[1]+".");
  rewardReveal({kicker:o.kind==="welcome"?"Dar za tebe!":o.kind==="read"?"Kutija čitača":o.kind==="buy"?"Čarobna kutija":"Kutija otkrića!",title:o.title||"",chest:"disc",items,sub,ok:got.length&&o.kind!=="welcome"?"Jupi!":"Super!",onDone:o.onDone});}
function mgCount(){const all=MCAT.filter(i=>!i.free&&!i.sj);return [all.filter(mgOwn).length,all.length];}
poiCheck=function(P){poiT-=.016;if(poiT>0)return;poiT=.5;for(const q of POI){if(S.poi[q.k])continue;if(Math.hypot(q.x-P.x,q.z-P.z)<(q.r||15)&&(q.y==null||P.y>=q.y)){S.poi[q.k]=today();if(S.mg)S.mg.seen.poi[q.k]=1;save();renderEco();sfx.chime();
  toast("Otkrila si novo mjesto: "+q.n+"!",2600);if(rida)rida.celebrate=.8;bump("poi",1);mgQueue({kind:"poi",title:"Novo mjesto: "+q.n});}}};
const RAREF={dijamant:"Prvi dijamant!",smaragd:"Prvi smaragd!",zlato:"Prvo zlato!",kristal:"Prvi kristal!",biser:"Prvi biser!",s_svjetlo:"Prvo čarobno sjeme!"};
function mgWatch(){const sn=S.mg.seen;for(const k in S.met){if(sn.met[k])continue;sn.met[k]=1;const P=PETS[k];if(!P||P.src==="buy"||P.src==="shop"||k==="zmaj")continue;mgQueue({kind:"met",title:"Novi prijatelj: "+petName(k)});}
  for(const k in RAREF){if(S.mg.firsts[k])continue;if(haveN(k)>0){S.mg.firsts[k]=1;mgQueue({kind:"first",title:RAREF[k]});}}
  const rd=!!S.days[today()];if(rd&&!mgWatch.rd&&S.mg.readBox!==today()){setTimeout(()=>{if(S.mg.readBox!==today())toast("Čitala si danas! Kutija čitača te čeka u Čarobnoj trgovini.",4200);},2500);}mgWatch.rd=rd;mgBadge();}
function mgBadge(){const b=$("mgBadge");if(!b)return;const n=(S.days[today()]&&S.mg.readBox!==today())?1:0;b.hidden=!n;b.textContent="!";const f=$("fpMg");if(f)f.classList.toggle("glow",!!n);}

/* ---------- the shop window ---------- */
const MTABS=[["skin","Izgled"],["char","Likovi"],["trail","Tragovi"],["gad","Čarolije"],["emo","Plesovi"],["pet","Životinje"],["box","Kutije"]];
const MLINES={skin:"Nova boja krzna? Rida se pretvori u tren oka!",char:"Popij čarobni napitak i igraj kao netko drugi. Svaki lik ima svoju moć!",trail:"Iza Ridinih šapica može ostati duga, srca ili leptiri.",
  gad:"Čarobne sprave za prave istraživače. Stalno ih možeš uključiti ili isključiti.",emo:"Plesovi i trikovi za svaki trenutak. Pleši ih tipkom G ili gumbom s notom.",pet:"Tri nova prijatelja čekaju dom. Svaki ima svoju igru!",box:"Kutije su pune iznenađenja. Ono što već imaš nikad ne dobiješ dvaput!"};
let mgTab="skin";
function sheetMagic(tab,keep){tab=tab||mgTab;mgTab=tab;const sc=keep?$("sheet").scrollTop:0;const [own,all]=mgCount();
  const pv=mgIcon({cat:MCHAR[S.mg.char]?"char":"skin",k:MCHAR[S.mg.char]?S.mg.char:S.mg.skin});
  let body="";
  if(tab==="box"){const rd=!!S.days[today()],took=S.mg.readBox===today();const left=MCAT.filter(i=>!i.free&&!i.sj&&i.cat!=="pet"&&!mgOwn(i)).length;
    body='<div class="mgrid">'+
      '<div class="mcard r-e"><span class="tag">Svaki dan</span><div class="mic"><img alt="" src="'+itemIcon("mg_box_read")+'"></div><b>Kutija čitača</b><small>Otvara se svaki dan kad pritisneš „Čitala sam!“ i upišeš stranice.</small>'+
        (took?'<button class="btn soft" aria-disabled="true">Sutra opet ✓</button>':rd?'<button class="btn green big" data-box="read">Otvori!</button>':'<button class="btn soft" data-box="noread">Prvo čitaj</button>')+'</div>'+
      '<div class="mcard r-l"><span class="tag">Iznenađenje</span><div class="mic"><img alt="" src="'+itemIcon("mg_box_buy")+'"></div><b>Čarobna kutija</b><small>Uvijek nešto novo: izgled, trag, čarolija ili ples koji još nemaš.</small>'+
        (left?'<button class="btn '+(S.coins>=150?'green':'soft')+'" data-box="buy">'+COIN_SVG+'150</button>':'<button class="btn soft" aria-disabled="true">Imaš sve!</button>')+'</div>'+
      '<div class="mcard r-r"><span class="tag">Otkrića</span><div class="mic"><img alt="" src="'+itemIcon("mg_box_disc")+'"></div><b>Kutija otkrića</b><small>Dobiješ je za svako novo mjesto, novog prijatelja i prvo rijetko blago. Do sada: '+(S.mg.boxes||0)+'.</small><button class="btn soft" data-box="map">Gdje istražiti?</button></div></div>';}
  else{const list=MCAT.filter(i=>i.cat===tab);body='<div class="mgrid">'+list.map(it=>{const ow=mgOwn(it),on=mgOn(it);let btn="";
      if(tab==="pet"){btn=ow?'<button class="btn soft" data-mg="'+it.id+'">Pogledaj</button>':'<button class="btn '+(S.coins>=it.p?'green':'soft')+'" data-mg="'+it.id+'">'+COIN_SVG+it.p+'</button>';}
      else if(!ow)btn=it.wr?'<button class="btn soft wrb" data-mg="'+it.id+'">'+esc(it.wr)+'</button>':'<button class="btn '+(S.coins>=it.p?'green':'soft')+'" data-mg="'+it.id+'">'+COIN_SVG+it.p+'</button>';
      else if(tab==="emo")btn='<button class="btn" data-mg="'+it.id+'">Pleši!</button>';
      else if(tab==="gad")btn=it.act?'<button class="btn" data-mg="'+it.id+'">Koristi</button>':'<button class="btn '+(on?'green':'soft')+'" data-mg="'+it.id+'">'+(on?'Uključeno ✓':'Isključeno')+'</button>';
      else btn=on?'<button class="btn green" data-mg="'+it.id+'">'+(tab==="char"?"Igraš ✓":"Nosiš ✓")+'</button>':'<button class="btn soft" data-mg="'+it.id+'">'+(tab==="char"?"Igraj":"Stavi")+'</button>';
      return '<div class="mcard r-'+it.rar+(on?' on':'')+(ow?' own':'')+'">'+(it.free?'':'<span class="tag">'+RWR[it.rar].n+'</span>')+'<div class="mic"><img alt="" src="'+mgIcon(it)+'"></div><b>'+esc(it.n)+'</b><small>'+esc(it.d||"")+'</small>'+(it.perk?'<em class="perk">'+esc(it.perk)+'</em>':'')+(ow&&it.how?'<small class="how">'+esc(it.how)+'</small>':'')+btn+'</div>';}).join("")+'</div>';}
  openSheet('<div class="mshop"><div class="mshead">'+(pv?'<img alt="" src="'+pv+'">':'')+'<div class="msht"><h2>Čarobna trgovina</h2><p>'+esc(MLINES[tab])+'</p><div class="msbar"><span class="mscoin">'+COIN_SVG+'<b>'+S.coins+'</b></span><span class="mscol">Zbirka <b>'+own+' / '+all+'</b><i><u style="width:'+Math.round(own/all*100)+'%"></u></i></span></div></div></div>'+
    '<div class="tabs dtabs" role="tablist">'+MTABS.map(t=>'<button role="tab" data-t="'+t[0]+'" aria-selected="'+(t[0]===tab)+'">'+t[1]+(t[0]==="box"&&S.days[today()]&&S.mg.readBox!==today()?' <span class="mdot"></span>':'')+'</button>').join("")+'</div>'+body+'</div>');
  $("sheet").classList.add("mwide");if(keep)$("sheet").scrollTop=sc;
  const B=$("sheetBody");B.querySelectorAll("[role=tab]").forEach(t=>t.onclick=()=>{sfx.click();sheetMagic(t.dataset.t);});
  B.querySelectorAll("[data-mg]").forEach(b=>b.onclick=()=>mgClick(b));B.querySelectorAll("[data-box]").forEach(b=>b.onclick=()=>mgBoxBtn(b.dataset.box,b));}
{const _os=openSheet;openSheet=function(h,c){$("sheet").classList.remove("mwide");return _os(h,c);};}
function mgArm(b,txt){if(b.dataset.arm){return true;}b.dataset.arm="1";const old=b.innerHTML;b.innerHTML=txt;b.classList.add("arm");tone(660,.05,"triangle",.025);setTimeout(()=>{if(b.isConnected){delete b.dataset.arm;b.innerHTML=old;b.classList.remove("arm");}},3200);return false;}
function mgClick(b){const it=mgIt(b.dataset.mg);if(!it)return;
  if(it.cat==="pet"){if(mgOwn(it)){sheetAnimal(it.k);return;}if(S.coins<it.p){mgPoor(it.p);return;}if(!mgArm(b,"Kupi?"))return;if(it.sj){buyPet(it.k);return;}mgBuyPet(it.k);return;}
  if(!mgOwn(it)){if(it.wr){toast("Ovo se ne može kupiti. Čeka te kao nagrada: "+it.wr+"!",3600);sfx.click();return;}if(S.coins<it.p){mgPoor(it.p);return;}if(!mgArm(b,"Kupi za "+it.p+"?"))return;S.coins-=it.p;S.mg.own[it.id]=today();
    if(it.cat==="skin"){S.mg.skin=it.k;applySkin();if(MCHAR[S.mg.char]){S.mg.char="";applyChar();applyPerks();}}else if(it.cat==="char"){S.mg.char=it.k;applyChar();applyPerks();}else if(it.cat==="trail")S.mg.trail=it.k;else if(it.cat==="gad"&&it.tog){S.mg.gad[it.k]=1;applyPerks();}
    save();renderEco();closeSheet();mgPoof();if(typeof padRumble==="function"&&PAD.on)padRumble(260,.6,.5);
    rewardReveal({kicker:"Kupljeno!",title:it.n,chest:"disc",items:[{ic:mgIcon(it),n:it.n,cnt:0,rar:it.rar}],sub:mgHow(it),ok:"Super!",onDone:()=>sheetMagic(it.cat,false)});return;}
  sfx.click();
  if(it.cat==="emo"){closeSheet();mgDance(it.k);return;}
  if(it.cat==="gad"&&it.act){closeSheet();mgUse(it.k);return;}
  if(it.cat==="gad"){S.mg.gad[it.k]=S.mg.gad[it.k]?0:1;applyPerks();save();if(S.mg.gad[it.k])mgPoof();sheetMagic(mgTab,true);return;}
  if(it.cat==="skin"){S.mg.skin=it.k;if(MCHAR[S.mg.char]){S.mg.char="";applyChar();applyPerks();}applySkin();}
  else if(it.cat==="char"){S.mg.char=it.k;applyChar();applyPerks();}
  else if(it.cat==="trail")S.mg.trail=S.mg.trail===it.k?"":it.k;
  save();mgPoof();sheetMagic(mgTab,true);}
function mgHow(it){return {skin:"Rida je odmah promijenila krzno! Klasičnu boju uvijek možeš vratiti.",char:"Sad igraš kao "+it.n+"! Moć: "+(it.perk||"")+". Ridu vraćaš u kartici Likovi.",trail:"Prošeći i pogledaj iza sebe!",
  gad:it.tog?"Čarolija je uključena! Isključuješ je na traci dolje, na stranici s čarolijama (tipka Q).":"Nađeš je na traci dolje, na stranici s čarolijama (tipka Q), i u izborniku s notom.",emo:"Pleši ga iz izbornika s notom, tipkom G ili R3 na joysticku!"}[it.cat]+(it.how?" "+it.how:"")||"";}
function mgPoor(p){sfx.click();toast("Treba ti još "+(p-S.coins)+" zlatnika. Čitaj, otkrivaj nova mjesta i otvaraj škrinje!",3000);}
function mgBuyPet(k){const P=PETS[k];if(S.met[k])return;S.coins-=P.price;S.met[k]=today();S.mg.seen.met[k]=1;const I2=petInfo(k);I2.h=Math.max(I2.h,2);save();renderEco();closeSheet();spawnNewPet(k);sfx.fanfare();
  rewardReveal({kicker:"Novi prijatelj!",title:P.n,portrait:portrait(k),items:[{ic:thingIcon(P.fav),n:"Voli: "+thingName(P.fav),cnt:0,rar:"r"},{ic:itemIcon("star"),n:SPEC[k].n,cnt:0,rar:"l"}],sub:P.d+" Čeka te kraj knjižnice.",ok:"Jupi!"});}
function mgBoxBtn(k,b){if(k==="noread"){toast("Pritisni „Čitala sam!“ i upiši koliko si danas pročitala. Tada se kutija otvara!",3600);sfx.click();return;}
  if(k==="map"){closeSheet();if(typeof sheetBag==="function")sheetBag("karta");return;}
  if(k==="read"){if(S.mg.readBox===today()||!S.days[today()])return;S.mg.readBox=today();save();closeSheet();mgOpenBox({kind:"read",title:"Bravo, čitateljice!",onDone:()=>sheetMagic("box")});return;}
  if(k==="buy"){if(S.coins<150){mgPoor(150);return;}if(!mgArm(b,"Kupi za 150?"))return;S.coins-=150;save();closeSheet();mgOpenBox({kind:"buy",title:"Što li je unutra?",onDone:()=>sheetMagic("box")});}}
function mgUse(k){if(k==="vatromet"){fireworks();return;}if(k==="daska"){mgBoard();return;}if(k==="kompas")sheetTravel();}
function sheetTravel(){if(!FP.on){toast("Kompas radi u istraživanju. Pritisni Istraži!",2600);return;}const list=POI.filter(q=>S.poi[q.k]);
  openSheet('<div class="anh"><img alt="" src="'+itemIcon("mg_gad_kompas")+'"><div><h2>Kompas putnika</h2><p class="muted">Kamo želiš otputovati? Kompas zna sva mjesta koja si otkrila.</p></div></div>'+
    (list.length?'<div class="mtravel">'+list.map(q=>'<button class="btn soft" data-tv="'+q.k+'">'+esc(q.n)+'</button>').join("")+'</div>':'<p class="muted">Još nisi otkrila nijedno mjesto. Istraži otok!</p>'));
  $("sheetBody").querySelectorAll("[data-tv]").forEach(b=>b.onclick=()=>mgTravel(b.dataset.tv));}
function mgTravel(k){const q=POI.find(p=>p.k===k);if(!q||!FP.on)return;closeSheet();if(FP.mount)dismount();if(ACT)endAct(false,true);FP.emo=null;
  let best=null;for(let r=1.5;r<=10;r+=1.5){for(let a=0;a<6.28;a+=.35){const x=Math.floor(q.x+Math.cos(a)*r)+.5,z=Math.floor(q.z+Math.sin(a)*r)+.5;const y=walkable(x,z,false);if(y==null)continue;if(q.y!=null&&y<q.y-1)continue;if(hitsAt(x,y+.02,z))continue;if(!best||y<best.y)best={x,y,z};}}
  if(!best){toast("Kompas ne može naći mjesto za slijetanje. Pokušaj drugo mjesto.",2600);return;}
  const P=FP.p;mgRing(P.x,P.y+.6,P.z,0xb46cff);for(let i=0;i<30;i++){const a=Math.random()*6.28;mgSpawn({t:"star",x:P.x+Math.cos(a)*.6,y:P.y+Math.random()*1.4,z:P.z+Math.sin(a)*.6,vy:3+Math.random()*3,life:.8,size:.3,size2:.02,col:[0xb46cff,0x6ad0ff,0xffffff],add:1});}
  [523,659,784,1046,1318,1568].forEach((f,i)=>tone(f,.12,"sine",.03,i*.05));
  setTimeout(()=>{P.set(best.x,best.y+.02,best.z);FP.v.set(0,0,0);FP.safe.copy(P);FP.camT.set(best.x,best.y+1.05,best.z);FP.ground=false;FP.cam.cur=FP.cam.tdist;
    mgRing(best.x,best.y+.6,best.z,0x6ad0ff);for(let i=0;i<30;i++){const a=Math.random()*6.28,s=1+Math.random()*2;mgSpawn({t:"star",x:best.x,y:best.y+.8,z:best.z,vx:Math.cos(a)*s,vy:Math.random()*2,vz:Math.sin(a)*s,life:.9,size:.35,size2:.02,col:[0xb46cff,0x6ad0ff,0xffffff,0xffd23d],add:1,drag:2});}
    sfx.chime();toast("Kompas te odnio do: "+q.n+"!",2600);},260);}
/* the quick menu: dances and gadgets */
function mgMenu(){const emos=MCAT.filter(i=>i.cat==="emo"&&mgOwn(i));const acts=MCAT.filter(i=>i.cat==="gad"&&i.act&&mgOwn(i));
  openSheet('<h2>Plesovi i čarolije</h2><div class="mmenu">'+emos.concat(acts).map(it=>'<button class="mgbtn" data-mu="'+it.id+'"><img alt="" src="'+mgIcon(it)+'"><b>'+esc(it.n)+'</b></button>').join("")+'</div>'+
    (acts.length?'':'<p class="muted">U Čarobnoj trgovini čekaju još plesovi, vatromet, lebdeća daska i kompas putnika!</p>')+'<button class="btn big purple" id="mmShop">Čarobna trgovina</button>');
  $("sheetBody").querySelectorAll("[data-mu]").forEach(b=>b.onclick=()=>{const it=mgIt(b.dataset.mu);closeSheet();if(it.cat==="emo")mgDance(it.k);else mgUse(it.k);});
  $("mmShop").onclick=()=>{sfx.click();sheetMagic();};}

/* ---------- icons ---------- */
(function(){const D=ITEM_DRAW;const trailIc=(k,cols)=>(x)=>{[[20,40,.5],[42,24,.62],[30,14,.36]].forEach((p,i)=>{x.save();x.translate(p[0]-32*p[2],p[1]-32*p[2]);x.scale(p[2],p[2]);mgShape(x,k,cols[i%cols.length],"#16243a");x.restore();});};
  D.mg_trail_=(x,P,hi,ol)=>{x.fillStyle="#e8772e";x.strokeStyle=ol;x.lineWidth=3;[[22,46,7],[16,36,3.5],[22,32,3.5],[28,36,3.5],[42,26,7],[36,16,3.5],[42,12,3.5],[48,16,3.5]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill();x.stroke();});};
  D.mg_trail_zvjezdice=trailIc("star",["#ffd23d","#fff3a0"]);D.mg_trail_srca=trailIc("heart",["#ff5a8a","#ff8ab0"]);D.mg_trail_mjehurici=trailIc("bubble",["#6ad0ff","#8ab0ff"]);
  D.mg_trail_lisce=trailIc("leaf",["#5ac83a","#ffb02e","#e8742a"]);D.mg_trail_pahulje=trailIc("flake",["#6ab8e8","#8ad0ff"]);D.mg_trail_note=trailIc("note",["#4aa8ff","#ff5a8a","#ffc53d"]);
  D.mg_trail_iskre=trailIc("star",["#ff6a1e","#ffb02e"]);D.mg_trail_leptiri=trailIc("fly",["#ff9ad0","#8ad0ff","#ffe680"]);
  D.mg_trail_duga=(x,P,hi,ol)=>{const cs=["#ff4a4a","#ffa52a","#ffe83a","#5ad85a","#4aa8ff","#9a6ae8"];x.lineWidth=6;cs.forEach((c,i)=>{x.strokeStyle=c;x.beginPath();x.arc(32,50,30-i*5,Math.PI,0);x.stroke();});x.lineWidth=3;x.strokeStyle=ol;x.beginPath();x.arc(32,50,33,Math.PI,0);x.stroke();x.beginPath();x.arc(32,50,4,Math.PI,0);x.stroke();};
  D.mg_gad_opruge=(x,P,hi,ol)=>{const z=()=>{x.beginPath();x.moveTo(22,58);for(let i=0;i<6;i++)x.lineTo(i%2?20:44,52-i*6);x.stroke();};x.lineWidth=9;x.strokeStyle=ol;z();x.lineWidth=5;x.strokeStyle="#c8d2de";z();
    x.fillStyle="#e8772e";x.strokeStyle=ol;x.lineWidth=3;[[32,16,10],[19,8,4.5],[27,3,4.5],[37,3,4.5],[45,8,4.5]].forEach(a=>{x.beginPath();x.arc(a[0],a[1]+2,a[2],0,7);x.fill();x.stroke();});};
  D.mg_gad_cizme=(x,P,hi,ol)=>{P([[22,46],[30,62],[36,48],[42,62],[48,46]],"#ffb02e");P([[28,46],[33,56],[38,46]],"#fff0a0");P([[14,6],[34,6],[34,28],[52,30],[54,46],[14,46]],"#d8403a");x.fillStyle="#ffc53d";x.fillRect(16,12,16,6);hi(22,24,3);};
  D.mg_gad_kisobran=(x,P,hi,ol)=>{x.beginPath();x.moveTo(4,34);x.quadraticCurveTo(32,-4,60,34);x.closePath();x.fillStyle="#ff7fa8";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();x.beginPath();x.moveTo(32,7);x.quadraticCurveTo(42,20,41,34);x.lineTo(23,34);x.quadraticCurveTo(22,20,32,7);x.fillStyle="#ffd23a";x.fill();x.stroke();
    x.lineWidth=5;x.beginPath();x.moveTo(32,34);x.lineTo(32,52);x.arc(26,52,6,0,Math.PI);x.stroke();};
  D.mg_gad_vodene=(x,P,hi,ol)=>{x.fillStyle="#6ad0ff";x.strokeStyle=ol;x.lineWidth=4;x.beginPath();x.moveTo(4,52);x.quadraticCurveTo(16,44,28,52);x.quadraticCurveTo(40,60,60,50);x.lineTo(60,60);x.lineTo(4,60);x.closePath();x.fill();x.stroke();
    P([[10,24],[26,24],[30,34],[50,36],[54,46],[10,46]],"#2d86d0");x.fillStyle="#fff";x.fillRect(12,28,12,4);hi(44,40,3);x.beginPath();x.moveTo(46,6);x.quadraticCurveTo(56,20,46,24);x.quadraticCurveTo(36,20,46,6);x.fillStyle="#8ad0ff";x.fill();x.stroke();};
  D.mg_gad_vatromet=(x,P,hi,ol)=>{P([[18,58],[24,30],[30,58]],"#d8403a");P([[19,30],[24,18],[29,30]],"#ffc53d");x.strokeStyle=ol;x.lineWidth=3;x.beginPath();x.moveTo(24,58);x.lineTo(24,63);x.stroke();
    const cs=["#ff5a8a","#ffd23d","#6ad0ff","#8fdc6a","#b46cff"];for(let i=0;i<10;i++){const a=i/10*Math.PI*2;x.strokeStyle=cs[i%5];x.lineWidth=4;x.beginPath();x.moveTo(44+Math.cos(a)*5,20+Math.sin(a)*5);x.lineTo(44+Math.cos(a)*16,20+Math.sin(a)*16);x.stroke();}};
  D.mg_gad_daska=(x,P,hi,ol)=>{x.fillStyle="rgba(106,240,255,.5)";x.beginPath();x.ellipse(32,50,26,7,0,0,7);x.fill();P([[6,34],[14,26],[54,26],[60,34],[54,42],[12,42]],"#7a52c7");x.fillStyle="#ffc53d";x.fillRect(16,32,32,4);hi(18,30,3);};
  D.mg_gad_kompas=(x,P,hi,ol)=>{x.beginPath();x.arc(32,34,24,0,7);x.fillStyle="#ffc53d";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();x.beginPath();x.arc(32,34,17,0,7);x.fillStyle="#fffdf7";x.fill();x.stroke();
    P([[32,18],[37,34],[27,34]],"#e8443a");P([[32,50],[37,34],[27,34]],"#4a6a98");x.fillStyle=ol;x.beginPath();x.arc(32,34,3,0,7);x.fill();x.fillRect(29,4,6,6);};
  D.mg_emo_mahni=(x,P,hi,ol)=>{x.fillStyle="#e8772e";x.strokeStyle=ol;x.lineWidth=4;[[30,40,13],[16,22,6],[26,13,6],[38,13,6],[48,22,6]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill();x.stroke();});x.lineWidth=3;x.beginPath();x.arc(30,36,26,-.5,.5);x.stroke();x.beginPath();x.arc(30,36,30,-.4,.4);x.stroke();};
  D.mg_emo_ples=(x)=>{x.save();x.translate(4,6);x.scale(.85,.85);mgShape(x,"note","#4aa8ff","#16243a");x.restore();x.save();x.translate(36,0);x.scale(.4,.4);mgShape(x,"star","#ffd23d","#16243a");x.restore();};
  D.mg_emo_srca=(x)=>{x.save();x.translate(2,8);x.scale(.8,.8);mgShape(x,"heart","#ff5a8a","#16243a");x.restore();x.save();x.translate(34,2);x.scale(.45,.45);mgShape(x,"heart","#ff8ab0","#16243a");x.restore();};
  D.mg_emo_salto=(x,P,hi,ol)=>{x.lineWidth=10;x.strokeStyle=ol;x.beginPath();x.arc(32,32,20,-.3,Math.PI*1.6);x.stroke();x.lineWidth=6;x.strokeStyle="#8fdc6a";x.stroke();P([[46,4],[56,22],[38,20]],"#8fdc6a");};
  D.mg_emo_vrtnja=(x,P,hi,ol)=>{x.lineWidth=8;x.strokeStyle=ol;const sp=()=>{x.beginPath();for(let i=0;i<60;i++){const a=i*.22,r=2+i*.42;x.lineTo(32+Math.cos(a)*r,32+Math.sin(a)*r);}x.stroke();};sp();x.lineWidth=4;x.strokeStyle="#b46cff";sp();};
  D.mg_emo_spavanje=(x,P,hi,ol)=>{[[18,44,.55],[34,28,.42],[46,14,.3]].forEach(p=>{x.save();x.translate(p[0]-32*p[2],p[1]-32*p[2]);x.scale(p[2],p[2]);mgShape(x,"z","#8ab0ff","#16243a");x.restore();});};
  D.mg_emo_zvijezda=(x)=>{mgShape(x,"star","#ffd23d","#16243a");};
  const chest=(lid,box,rib)=>(x,P,hi,ol)=>{P([[8,30],[56,30],[56,56],[8,56]],box);P([[6,18],[58,18],[58,32],[6,32]],lid);x.fillStyle=rib;x.fillRect(28,18,8,38);x.lineWidth=3;x.strokeStyle=ol;x.strokeRect(28,18,8,38);hi(14,24,3);};
  D.mg_box_disc=chest("#5ae0e8","#2ab8c8","#ffc53d");D.mg_box_buy=(x,P,hi,ol)=>{chest("#a87ef0","#7048c0","#ffc53d")(x,P,hi,ol);x.save();x.translate(38,-4);x.scale(.4,.4);mgShape(x,"star","#ffd23d","#16243a");x.restore();};
  D.mg_box_read=(x,P,hi,ol)=>{chest("#ff9a5a","#e8643a","#fff4e6")(x,P,hi,ol);P([[16,8],[30,12],[30,24],[16,20]],"#fff");P([[48,8],[34,12],[34,24],[48,20]],"#fff");};})();

/* ---------- init, buttons, keys and the per-frame tick ---------- */
function mgInit(){if(!S.mg){S.mg={own:{},skin:"",char:"",trail:"",gad:{},boxes:0,seen:{met:{},poi:{}},firsts:{},readBox:"",welcome:0};for(const k in S.met)S.mg.seen.met[k]=1;for(const k in S.poi)S.mg.seen.poi[k]=1;for(const k in RAREF)if(haveN(k)>0)S.mg.firsts[k]=1;save();}
  const m=S.mg;m.own=m.own||{};m.gad=m.gad||{};m.seen=m.seen||{met:{},poi:{}};m.seen.met=m.seen.met||{};m.seen.poi=m.seen.poi||{};m.firsts=m.firsts||{};
  foxBody();if(!umbrella){umbrella=makeUmbrella();rida.g.add(umbrella);}
  if(m.skin&&!MSKIN[m.skin])m.skin="";if(m.char&&!MCHAR[m.char])m.char="";applySkin();if(m.char)applyChar();applyPerks();mgWatch.rd=!!S.days[today()];mgBadge();
  if(!m.welcome){m.welcome=1;save();mgQueue({kind:"welcome",title:"Čarobna trgovina je otvorena!",onDone:()=>sheetMagic("trail")});}}
{const _ai=animalsInit;animalsInit=function(){_ai();mgInit();};}
{const sb=$("sideBtns");if(sb&&!$("mgBtn")){sb.insertAdjacentHTML("afterbegin",'<button class="card round rel mgside" id="mgBtn" aria-label="Čarobna trgovina"><svg viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M0 4h12v4h-1v4H1V8H0zM3 1h2v1h2V1h2v1h1v2H2V2h1z"/><path fill="#b46cff" d="M1 5h10v2H1z"/><path fill="#7a52c7" d="M2 8h8v3H2z"/><path fill="#ffc53d" d="M5 5h2v6H5zM3 2h2v2H3zM7 2h2v2H7z"/><path fill="#fff" d="M2 5h1v1H2z"/></svg><span class="badge" id="mgBadge" hidden>!</span></button>');}
  const ft=document.querySelector(".fptop");if(ft&&!$("fpMg")){const ex=$("fpExit");ex.insertAdjacentHTML("beforebegin",'<button class="fpico" id="fpEmo" aria-label="Plesovi i čarolije"><svg viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M4 0h6v7H9v1H6V6h3V2H5v6H4v1H1V8H0V6h1V5h3z"/><path fill="#4aa8ff" d="M1 6h3v2H1zM6 6h3v1H6zM5 1h4v1H5z"/></svg></button><button class="fpico" id="fpMg" aria-label="Čarobna trgovina"><svg viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M0 4h12v4h-1v4H1V8H0zM3 1h2v1h2V1h2v1h1v2H2V2h1z"/><path fill="#b46cff" d="M1 5h10v2H1z"/><path fill="#7a52c7" d="M2 8h8v3H2z"/><path fill="#ffc53d" d="M5 5h2v6H5zM3 2h2v2H3zM7 2h2v2H7z"/></svg></button>');}
  $("mgBtn").onclick=()=>{sfx.click();sheetMagic();};$("fpMg").onclick=()=>{sfx.click();sheetMagic();};$("fpEmo").onclick=()=>{sfx.click();mgMenu();};}
addEventListener("keydown",e=>{if(!FP.on||e.repeat||!S.mg)return;if(e.target&&e.target.closest&&e.target.closest("input,textarea"))return;if(!$("veil").hidden||window.RWON)return;const k=e.key.toLowerCase();
  if(k==="t")sheetMagic();else if(k==="g")mgMenu();else if(k==="h"&&mgOwn(mgIt("gad:daska")))mgBoard();else if(k==="v"&&mgOwn(mgIt("gad:vatromet")))fireworks();});
let mgPadPrev=false;
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){const M=FP.mount;if(M&&M.k==="daska"&&FP.swim){toast("Daska ne može pod vodu. Rida je skočila u more!",2400);dismount();}
  if(boardG&&boardG.parent&&!(FP.mount&&FP.mount.k==="daska"))scene.remove(boardG);
  _ta(dt,tt);tickMagic(dt,tt);};}
function tickMagic(dt,tt){if(!S.mg)return;mgClock+=dt;mgParts(dt);tickFW(dt);tickTrail(dt,tt);
  mgChk-=dt;if(mgChk<=0){mgChk=1;mgWatch();}
  if(FP.on&&S.mg.char==="pingvin"&&FP.swim)FP.stamina=Math.max(FP.stamina,7.9);
  if(FP.on&&FP.onWater&&Math.hypot(FP.v.x,FP.v.z)>1&&Math.random()<dt*9)burst(FP.p.x,WATER+.1,FP.p.z,2,[[.85,.95,1],[1,1,1]],.7,.7,.4);
  if(FP.mount&&FP.mount.k==="daska"&&Math.random()<dt*14){const P=FP.p;mgSpawn({t:"spark",x:P.x+(Math.random()-.5)*.5,y:P.y+.05,z:P.z+(Math.random()-.5)*.5,vy:-.3,life:.5,size:.35,size2:.05,col:[0x6af0ff,0xb46cff],add:1});}
  const fe=petEnt("feniks");if(fe){const mo=FP.mount&&FP.mount.k==="feniks";if(!mo){const p=fe.g.userData.parts;if(p.wl){const f=Math.sin(tt*5)*.45;p.wl.rotation.z=f;p.wr.rotation.z=-f;}fe.g.position.y+=.3+Math.sin(tt*2)*.12;}
    if(Math.random()<dt*(mo?30:5)){const g=fe.g.position;mgSpawn({t:"spark",x:g.x+(Math.random()-.5)*.6,y:g.y+.5,z:g.z+(Math.random()-.5)*.6,vy:mo?-.4:.8,life:.6,size:.3,size2:.03,col:[0xffb02e,0xff5a1e,0xffe080],add:1});}}
  const rp=petEnt("robopas");if(rp&&rp.g.userData.parts.head){const a=rp.g.userData.parts.head;a.rotation.z=Math.sin(tt*3)*.08;}
  if(MGQ.length&&!window.RWON&&$("veil").hidden&&!ACT&&!flight&&mgClock>8){mgQT+=dt;if(mgQT>1.1){mgQT=0;const o=MGQ.shift();if(o.run)o.run();else mgOpenBox(o);}}else mgQT=0;
  if(FP.on&&typeof padGet==="function"&&PAD.on){const g=padGet();const r3=!!(g&&g.buttons[11]&&g.buttons[11].pressed);if(r3&&!mgPadPrev&&$("veil").hidden&&!window.RWON)mgMenu();mgPadPrev=r3;}}
