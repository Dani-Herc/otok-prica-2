/* =================== v23: Džungla dinosaura =================== */
/* A lost valley ringed by cliffs: a smoking volcano with a lava tube, a river you ride on a raft, a lagoon of sinking lily pads
   guarded by an old crocodile, a fossil dig, a canopy walk between giant trees, pterosaur cliffs with updrafts, a nest of a
   good-mother dinosaur, three singing Parasaurolophus and the Amber Temple. Every amber Rida finds tells a true fact
   about dinosaurs. Three friends live only here (baby T-rex, pteranodon, long-neck) and can be ridden. */
WORLDS.dzungla={n:"Džungla dinosaura",d:"Izgubljena dolina okružena liticama: vulkan koji se dimi, rijeka za vožnju splavom, laguna s lopočima, iskopine fosila, staze u krošnjama i litice pterosaura. Ovdje žive mali T-rex, pteranodon i dugovrat!",lv:12};
PRESETS.dzungla={top:0x4a9ae0,hz:0xffe0a8,sun:0xffe2b0,si:2.35,hemi:.8,el:.52,az:2.1,fog:0xc8d4a0,glow:.6,stars:0,sh:0x5ac8a0,dp:0x2a8a7a,exp:1.0,night:0};
if(typeof MOODS!=="undefined")MOODS.dzungla={root:62,sc:[0,2,5,7,9],ch:[[0,7,14],[-3,4,9],[5,9,14],[2,9,12]],bpm:70,p:.46,inst:"box"};

/* ---------- world-only rewards ---------- */
MSKIN.jantarna={n:"Jantarna lisica",d:"Zlatna kao jantar na suncu, s tamnim prugama. Za njom svjetlucaju zlatne iskrice.",p:0,rar:"l",O:0xf0a020,W:0xfff0c0,B:0x4a2208,D:0xb85a10,glowO:.16,fx:"zlato",wr:"Džungla dinosaura"};
MTRAIL.otisci={n:"Dino otisci",d:"Gdje god Rida hoda, iza nje ostaju otisci malog dinosaura.",p:0,rar:"l",wr:"Džungla dinosaura"};
const JGAD={cekic:{n:"Čekić paleontologa",d:"Kucni po tlu i možda iskopaš pravi fosil! Svaki fosil ide u zbirku Fosili i otkriva ti nešto novo. Radi i na Otoku priča!",p:0,rar:"l",act:1,wr:"Džungla dinosaura",how:"Stani na zemlju, pijesak ili kamen i dodirni čekić na traci."}};
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};
  ins("skin","jantarna",MSKIN.jantarna);ins("trail","otisci",MTRAIL.otisci);MGAD.cekic=JGAD.cekic;ins("gad","cekic",JGAD.cekic);}
/* dinosaur footprints: flat prints on the ground that fade */
const JPR={list:[],i:0,side:0};
function jgPrintTex(){if(jgPrintTex.t)return jgPrintTex.t;const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");x.fillStyle="rgba(60,36,18,.85)";
  x.beginPath();x.ellipse(32,40,10,12,0,0,7);x.fill();for(const [a,l] of [[-.55,20],[0,24],[.55,20]]){x.save();x.translate(32,34);x.rotate(a);x.beginPath();x.ellipse(0,-l*.6,4.2,l*.55,0,0,7);x.fill();x.restore();}
  return jgPrintTex.t=new THREE.CanvasTexture(c);}
function jgPrint(p){if(JPR.list.length<36){const m=new THREE.Mesh(new THREE.PlaneGeometry(.42,.42).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({map:jgPrintTex(),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3}));m.renderOrder=2;scene.add(m);JPR.list.push({m,t:0});}
  const it=JPR.list[JPR.i++%JPR.list.length];const y=floorY(p.x,p.y+.6,p.z);if(y<0||FP.swim)return;JPR.side^=1;const yaw=FP.yaw,s=JPR.side?.13:-.13;
  it.m.position.set(p.x+Math.cos(yaw)*s,y+1.02,p.z-Math.sin(yaw)*s);it.m.rotation.y=yaw+Math.PI;it.t=4;it.m.material.opacity=.9;it.m.visible=true;}
TR.otisci=p=>jgPrint(p);TRATE.otisci=2.4;
function jgPrintTick(dt){for(const it of JPR.list){if(it.t<=0)continue;it.t-=dt;it.m.material.opacity=Math.min(.9,it.t/1.5*.9);if(it.t<=0)it.m.visible=false;}}

/* ---------- the fossil collection, filled by the paleontologist's hammer ---------- */
const FOSSILS={k:"fosili",n:"Fosili",where:"none",items:[
  {k:"trilobit",n:"Trilobit",r:0,sh:"fossil",c:["#6a5a4a","#c8b494"],f:"Trilobiti su živjeli u morima prije više od 250 milijuna godina, još prije dinosaura!"},
  {k:"amonit",n:"Amonit",r:0,sh:"snail",c:["#8a7a6a","#e0c8a0"],f:"Amoniti su bili morske životinje sa spiralnom kućicom, daleki rođaci današnjih hobotnica i lignji."},
  {k:"paprat",n:"Otisak paprati",r:1,sh:"leaf",c:["#5a7a4a","#c8d0b0"],f:"Paprati su rasle i prije dinosaura. Neke njihove rođakinje i danas rastu u našim šumama!"},
  {k:"zub",n:"Zub T-rexa",r:1,sh:"flint",c:["#e8e0d0","#a89880"],f:"Tiranosaur je imao oko 60 zuba, a najveći su bili dugi kao banana!"},
  {k:"jantarkukac",n:"Jantar s kukcem",r:2,sh:"nugget",c:["#ffa020","#ffe08a"],f:"Jantar je okamenjena smola drveća. U njemu se ponekad sačuvaju kukci stari milijunima godina."},
  {k:"dinojaje",n:"Fosilno jaje",r:3,sh:"egg",c:["#8a7a6a","#d8c8a8"],f:"Neki dinosauri polagali su jaja u gnijezda i čuvali ih, baš kao današnje ptice."}]};
SETS.push(FOSSILS);FOSSILS.items.forEach(it=>{it.set="fosili";ALLIT[it.k]=it;});
function mgCekic(){if(!needFP())return;if(FP.swim||!FP.ground){toast("Stani na čvrsto tlo pa kucni čekićem.",2400);return;}
  const P=FP.p,t=get(Math.floor(P.x),Math.floor(P.y-.1),Math.floor(P.z));const k=t&&TYPES[t].k;const ok=["trava","zemlja","pijesak","kamen","sljunak","glina","blato","mahovina","snijeg","pjescenjak","duboki","tuf","kaldrma"].includes(k);
  if(!ok){toast("Ovdje nema fosila. Probaj na zemlji, pijesku ili kamenu!",2600);return;}
  const now=performance.now();if(now<(mgCekic.cd||0)){toast("Čekić se odmara. Probaj za "+Math.ceil((mgCekic.cd-now)/1000)+" s, ili na drugom mjestu!",2200);return;}mgCekic.cd=now+(WORLD==="dzungla"?9000:20000);
  for(let i=0;i<3;i++)tone(300+i*40,.06,"square",.02,i*.12);burst(P.x,P.y+.1,P.z,26,[[.75,.6,.42],[.9,.8,.6],[.6,.5,.4]],2,2.4,.7);if(rida)rida.celebrate=.5;
  const luck=WORLD==="dzungla"?.75:.5;if(Math.random()>luck){setTimeout(()=>toast("Samo kamenčići i zemlja. Paleontolozi ponekad kopaju danima! Probaj negdje drugdje.",3200),450);return;}
  const w=[6,6,4,4,2.4,1];let r=Math.random()*w.reduce((a,b)=>a+b,0),it=FOSSILS.items[0];for(let i=0;i<w.length;i++){r-=w[i];if(r<=0){it=FOSSILS.items[i];break;}}
  const isNew=!S.found[it.k];S.found[it.k]=(S.found[it.k]||0)+1;const coins=[5,8,15,30][it.r];S.coins+=coins;save();renderEco();
  setTimeout(()=>{[880,1175,1568].forEach((f,i)=>tone(f,.18,"triangle",.04,i*.07));showFind(ic(it.sh,it.c),(isNew?"Novo u zbirci! ":"")+it.n,RAR[it.r],"+"+coins+" zlatnika");setTimeout(()=>jgFact(it.f,it.n),900);
    if(isNew&&FOSSILS.items.every(i=>S.found[i.k]))setTimeout(()=>{toast("Zbirka „Fosili“ je potpuna! Nagrada te čeka u Igre → Zbirka.");sfx.fanfare();},2400);},500);}
{const _mu=mgUse;mgUse=function(k){if(k==="cekic"){if(S.mg&&mgOwn(mgIt("gad:cekic")))beltPush("gad:cekic");return mgCekic();}return _mu.apply(this,arguments);};}
/* a small "Did you know?" card for true facts */
function jgFact(text,title){let el=$("factCard");if(!el){document.body.insertAdjacentHTML("beforeend",'<div id="factCard" hidden><div class="fcI"></div><div><b></b><p></p></div></div>');el=$("factCard");el.addEventListener("click",()=>{el.hidden=true;});}
  el.querySelector(".fcI").innerHTML='<img alt="" src="'+itemIcon("jg_fact")+'">';el.querySelector("b").textContent="Znaš li?"+(title?" · "+title:"");el.querySelector("p").textContent=text;el.hidden=false;el.classList.remove("in");void el.offsetWidth;el.classList.add("in");
  clearTimeout(jgFact.t);jgFact.t=setTimeout(()=>{el.hidden=true;},Math.min(12000,4200+text.length*55));tone(660,.12,"sine",.02);tone(990,.16,"sine",.016,.1);}

/* ---------- creatures ---------- */
MODELS.trorog=function(){const G=0x6f8c5c,L=0xb8c49a,F=0xd0783a,Y=0xffd060,Iv=0xf4ecd8,K=0x1a1410,D=0x4a5a3c,hd={name:"head",px:0,py:1.15,pz:.8},tl={name:"tail",px:0,py:1.0,pz:-.8};
  return mk([[1.1,.9,1.6,0,.98,0,G],[1.0,.2,1.4,0,.56,0,L],[.6,.12,1.0,0,1.47,-.1,D],
    [.8,.7,.8,0,1.08,1.08,G,hd],[.44,.4,.36,0,.92,1.58,D,hd],[1.5,1.15,.14,0,1.5,.74,F,hd],[1.62,.14,.16,0,2.06,.74,Y,hd],[.22,.22,.03,-.42,1.62,.66,Y,hd],[.22,.22,.03,.42,1.62,.66,Y,hd],[.18,.18,.03,0,1.84,.66,Y,hd],
    [.12,.12,.75,-.26,1.5,1.56,Iv,hd],[.12,.12,.75,.26,1.5,1.56,Iv,hd],[.12,.26,.12,0,1.2,1.66,Iv,hd],[.06,.1,.08,-.41,1.24,1.2,K,hd],[.06,.1,.08,.41,1.24,1.2,K,hd],
    [.5,.46,.8,0,.98,-1.15,G,tl],[.32,.3,.6,0,.88,-1.72,G,tl]].concat(legs(.3,.62,.4,.5,D,.62)));};
MODELS.dugovrat=function(){const G=0x8aac62,D=0x5a7a42,L=0xdde4b4,K=0x1a1410,hd={name:"head",px:0,py:1.5,pz:.7},tl={name:"tail",px:0,py:1.22,pz:-.75};
  return mk([[.92,.82,1.5,0,1.22,0,G],[.82,.2,1.3,0,.83,0,L],[.22,.06,.22,-.2,1.64,.2,D],[.26,.06,.26,.16,1.64,-.3,D],[.18,.06,.18,0,1.64,.55,D],
    [.38,.38,.5,0,1.72,.95,G,hd],[.33,.33,.5,0,2.12,1.18,G,hd],[.3,.3,.5,0,2.52,1.38,G,hd],[.42,.34,.58,0,2.84,1.64,G,hd],[.07,.09,.03,-.18,2.9,1.78,K,hd],[.07,.09,.03,.18,2.9,1.78,K,hd],[.24,.03,.03,0,2.74,1.94,D,hd],[.2,.05,.2,0,3.03,1.56,D,hd],
    [.52,.46,.72,0,1.17,-1.06,G,tl],[.38,.34,.72,0,1.02,-1.62,G,tl],[.24,.2,.72,0,.86,-2.18,G,tl],[.14,.12,.5,0,.74,-2.66,D,tl]].concat(legs(.3,.86,.32,.5,D,.86)));};
MODELS.trex=function(){const G=0x7ab85a,L=0xf0e2a0,S2=0x4a8a3a,K=0x1a1410,Wt=0xffffff,hd={name:"head",px:0,py:1.15,pz:.4},tl={name:"tail",px:0,py:.86,pz:-.4};
  return mk([[.6,.62,.82,0,.86,0,G],[.5,.42,.1,0,.82,.41,L],[.62,.06,.2,0,1.18,-.1,S2],[.62,.06,.2,0,1.18,.2,S2],
    [.56,.5,.72,0,1.3,.72,G,hd],[.52,.18,.58,0,1.0,.76,L,hd],[.42,.05,.04,0,1.09,1.04,Wt,hd],[.13,.15,.03,-.2,1.46,.94,Wt,hd],[.13,.15,.03,.2,1.46,.94,Wt,hd],[.07,.09,.02,-.2,1.45,.955,K,hd],[.07,.09,.02,.2,1.45,.955,K,hd],[.05,.04,.02,-.1,1.32,1.085,K,hd],[.05,.04,.02,.1,1.32,1.085,K,hd],
    [.22,.56,.3,-.2,.28,0,G,{name:"l0",px:-.2,py:.56,pz:0}],[.22,.56,.3,.2,.28,0,G,{name:"l1",px:.2,py:.56,pz:0}],[.08,.22,.08,-.27,.86,.42,G,{name:"l2",px:-.27,py:.96,pz:.38}],[.08,.22,.08,.27,.86,.42,G,{name:"l3",px:.27,py:.96,pz:.38}],
    [.42,.36,.6,0,.86,-.7,G,tl],[.27,.24,.6,0,.78,-1.22,G,tl],[.15,.13,.44,0,.72,-1.66,S2,tl]]);};
MODELS.ptero=function(){const B=0xd08848,Wm=0xe8b070,C=0xd83a3a,Bk=0xf0d080,K=0x1a1410,hd={name:"head",px:0,py:1.15,pz:.45},wl={name:"wl",px:-.2,py:1.0,pz:0},wr={name:"wr",px:.2,py:1.0,pz:0},tl={name:"tail",px:0,py:.95,pz:-.4};
  return mk([[.44,.44,.86,0,.98,0,B],[.36,.12,.7,0,.74,0,Bk],
    [.36,.36,.48,0,1.2,.6,B,hd],[.14,.14,.9,0,1.13,1.16,Bk,hd],[.07,.46,.64,0,1.46,.3,C,hd],[.07,.09,.02,-.19,1.26,.74,K,hd],[.07,.09,.02,.19,1.26,.74,K,hd],
    [1.5,.07,.7,-.95,1.0,-.05,Wm,wl],[.8,.07,.42,-2.05,1.0,-.24,Wm,wl],[.1,.1,.1,-1.7,1.06,.16,B,wl],[1.5,.07,.7,.95,1.0,-.05,Wm,wr],[.8,.07,.42,2.05,1.0,-.24,Wm,wr],[.1,.1,.1,1.7,1.06,.16,B,wr],
    [.14,.1,.4,0,.95,-.6,B,tl]].concat(legs(.08,.5,.16,.2,B,.5)));};
MODELS.stego=function(){const G=0x7a8a6a,P=0xe07a3a,L=0xc8c8a0,K=0x1a1410,hd={name:"head",px:0,py:.8,pz:.8},tl={name:"tail",px:0,py:.95,pz:-.8};const b=[[.9,.85,1.5,0,1.0,0,G],[.8,.2,1.3,0,.6,0,L],
    [.3,.32,.45,0,.72,1.0,G,hd],[.06,.07,.02,-.15,.8,1.2,K,hd],[.06,.07,.02,.15,.8,1.2,K,hd],[.34,.3,.7,0,.9,-1.1,G,tl],[.2,.2,.6,0,.8,-1.7,G,tl],[.06,.06,.4,-.16,.92,-1.9,L,tl],[.06,.06,.4,.16,.92,-1.9,L,tl],[.06,.06,.4,-.16,.92,-1.6,L,tl],[.06,.06,.4,.16,.92,-1.6,L,tl]];
  for(let i=0;i<6;i++){const z=.6-i*.3,h=.32+Math.sin(i/5*Math.PI)*.22;b.push([.06,h,.26,(i%2?.12:-.12),1.42+h/2,z,P]);}return mk(b.concat(legs(.26,.55,.32,.5,G,.55)));};
MODELS.trubac=function(col){const C=col||0x5a8ad8,L=0xf0e4c8,K=0x1a1410,Cr=0xffd060,hd={name:"head",px:0,py:1.55,pz:.55},tl={name:"tail",px:0,py:1.0,pz:-.6};
  return mk([[.66,.8,1.2,0,1.08,0,C],[.56,.2,1.0,0,.66,0,L],[.3,.4,.3,0,1.55,.62,C,hd],[.36,.32,.56,0,1.86,.8,C,hd],[.3,.12,.3,0,1.72,1.06,L,hd],[.06,.07,.02,-.18,1.93,.92,K,hd],[.06,.07,.02,.18,1.93,.92,K,hd],
    [.14,.14,1.0,0,2.12,.4,Cr,hd],[.12,.12,.2,0,2.02,-.06,Cr,hd],[.42,.36,.7,0,1.0,-.9,C,tl],[.24,.22,.6,0,.9,-1.46,C,tl],
    [.24,.62,.34,-.22,.31,-.05,C,{name:"l0",px:-.22,py:.62,pz:-.05}],[.24,.62,.34,.22,.31,-.05,C,{name:"l1",px:.22,py:.62,pz:-.05}],[.12,.42,.12,-.26,.9,.42,C,{name:"l2",px:-.26,py:1.1,pz:.42}],[.12,.42,.12,.26,.9,.42,C,{name:"l3",px:.26,py:1.1,pz:.42}]]);};
MODELS.trubac_p=()=>MODELS.trubac(0x4a7ad8);MODELS.trubac_z=()=>MODELS.trubac(0xe8b830);MODELS.trubac_c=()=>MODELS.trubac(0xd84a3a);
MODELS.majka=function(){const g=MODELS.trubac(0x9a7a52);g.traverse(o=>{if(o.isMesh&&o.material.color.getHex()===LC(0xffd060).getHex())o.visible=false;});return g;};
MODELS.kompy=function(){const G=0x9ab84a,L=0xe8e0a0,K=0x1a1410,hd={name:"head",px:0,py:.42,pz:.2},tl={name:"tail",px:0,py:.34,pz:-.16};
  return mk([[.2,.2,.34,0,.34,0,G],[.16,.14,.24,0,.46,.26,G,hd],[.04,.05,.02,-.08,.5,.3,K,hd],[.04,.05,.02,.08,.5,.3,K,hd],[.14,.06,.2,0,.38,.26,L,hd],[.1,.1,.4,0,.34,-.36,G,tl],
    [.07,.24,.08,-.07,.12,0,G,{name:"l0",px:-.07,py:.24,pz:0}],[.07,.24,.08,.07,.12,0,G,{name:"l1",px:.07,py:.24,pz:0}],[.04,.08,.04,-.1,.3,.14,G,{name:"l2",px:-.1,py:.34,pz:.14}],[.04,.08,.04,.1,.3,.14,G,{name:"l3",px:.1,py:.34,pz:.14}]]);};
MODELS.krokodil=function(){const G=0x4a6a3a,L=0xc8c890,K=0x1a1410,Wt=0xffffff,hd={name:"head",px:0,py:.3,pz:.7},tl={name:"tail",px:0,py:.3,pz:-.8};
  return mk([[.8,.36,1.6,0,.3,0,G],[.7,.1,1.4,0,.12,0,L],[.1,.08,1.2,-.22,.52,0,0x3a5a2a],[.1,.08,1.2,.22,.52,0,0x3a5a2a],
    [.56,.28,.6,0,.32,1.0,G,hd],[.4,.18,.7,0,.26,1.6,G,hd],[.36,.03,.6,0,.18,1.6,Wt,hd],[.16,.12,.14,-.18,.5,1.0,G,hd],[.16,.12,.14,.18,.5,1.0,G,hd],[.07,.07,.03,-.18,.52,1.08,0xffd040,hd],[.07,.07,.03,.18,.52,1.08,0xffd040,hd],
    [.5,.26,.8,0,.28,-1.2,G,tl],[.3,.18,.8,0,.24,-1.9,G,tl],[.14,.12,.6,0,.2,-2.5,G,tl]].concat(legs(.16,.2,.46,.5,G,.2)));};
Object.assign(PETS,{
  trex:{fav:"riba",src:"world",world:"dzungla",n:"Mali T-rex Ričko",d:"Malen, zelen i uvijek gladan. Ruke su mu prekratke, ali zato rikne glasnije od svih!",gd:"Iz džungle donosi bobice i zlatnike.",gift:()=>[["bobice",4],["coins",14]]},
  ptero:{fav:"riba",src:"world",world:"dzungla",n:"Pteranodon Krilko",d:"Leteći rođak dinosaura s crvenom krijestom. Nekad se bojao visine, a sad je najbolji letač u dolini!",gd:"S litica donosi perje i jantar.",gift:()=>[["grumen",1],["coins",16]]},
  dugovrat:{fav:"bobice",src:"world",world:"dzungla",n:"Dugovrat Lišćko",d:"Mladi dugovrati dinosaur. Glavom doseže najviše lišće, a hoda polako i nježno.",gd:"Iz krošnji donosi plodove i drvo.",gift:()=>[["drvo",6],["coins",12]]}});
Object.assign(SPEC,{
  trex:{n:"T-rex trk",d:"Ričko juri kroz džunglu, a kad doskoči, rikne tako da sve zatrese!",ride:1,ic:"star"},
  ptero:{n:"Krilkov let",d:"Krilko raširi krila i letite nad cijelom dolinom! Skok je gore, Roni je dolje.",ride:1,ic:"star"},
  dugovrat:{n:"Pogled s visine",d:"S Lišćkovih leđa vidiš cijelu džunglu, a kad prolazite kraj drveća, on ti dohvati plodove.",ride:1,ic:"star"}});
Object.assign(RIDES,{trex:{land:1,speed:10.6,jump:10,seat:.95,roar:1},ptero:{air:1,land:1,speed:10.5,jump:9,seat:.98},dugovrat:{land:1,speed:5.6,jump:8.2,seat:1.62,fruit:1}});
const JGPETS=["trex","ptero","dugovrat"];NEWPETS.push(...JGPETS);
{const _snp=spawnNewPet;spawnNewPet=function(k){if(!JGPETS.includes(k))return _snp(k);let e=petEnt(k);if(e)return e;if(WORLD)return null;
  const sp=S.portalSpot||{x:LIB.x+.5,z:LIB.z+10,ry:0};const i=JGPETS.indexOf(k)-1;const c=Math.cos(sp.ry),s=Math.sin(sp.ry);
  const near={x:sp.x+Math.sin(sp.ry)*8+c*i*5,z:sp.z+Math.cos(sp.ry)*8-s*i*5};e=spawn(k,PETS[k].n,{speed:k==="dugovrat"?.7:k==="trex"?1.4:1.1,near});return e;};}
{const _mu=mountUp;mountUp=function(k){_mu(k);if(!JGPETS.includes(k)||!FP.mount||FP.mount.k!==k)return;
  if(typeof NQ!=="undefined"){for(let i=NQ.length-1;i>=0;i--)if(NQ[i].t&&/^(Jašeš na|Iskra|Juhu)/.test(NQ[i].t))NQ.splice(i,1);if(nCur&&nCur.t&&/^(Jašeš na|Iskra|Juhu)/.test(nCur.t)){clearTimeout(nT);nDone();}}
  const L={trex:"Ričko juri! Skoči i kad doskočite, on rikne.",ptero:"Krilko raširi krila! Skok je gore, Roni je dolje.",dugovrat:"Lišćko te nosi visoko! Prođi kraj drveća i on će ti dohvatiti plodove."}[k];
  toast(L+" Za silazak: gumb Siđi"+(PAD.on?" ili Y":"")+".",4600);};}

/* ---------- the generator ---------- */
const JG={vines:[],ferns:[],bamboo:[],flowers:[],lily:[],pads:[],bones:[],pick:[],raftPath:[],trub:null,croc:null,nest:null,lavaC:null,lavaP:[],wisps:[],fire:[],eggs:[],crater:null,rimAt:null,vpath:new Set(),hot:new Set()};
const JRIV=[[47,108],[54,109],[62,111],[73,118],[84,127],[96,133],[108,138],[118,146],[128,153],[140,157],[152,158],[164,160],[176,164],[185,167]];
const JFOOT=[[114,128],[110,121],[104,116],[103,109],[106,103],[103,98]];
const JQ={trex:{need:3,item:"zvjezdica",ask:"Rrrr! Ja sam Ričko. Gladan sam, a moje omiljeno zvjezdano voće visi na granama. Ruke su mi prekratke da ga dohvatim! Doneseš mi tri ploda? Popni se po granama!",got:"Zvjezdano voće",
    done:"Njam! Najslađe voće na svijetu! Hvala ti, sad smo najbolji prijatelji. Skoči mi na leđa, jurimo kroz džunglu!",fact:"T-rex je imao kratke ruke, ali jako jake. Znanstvenici misle da je svakom rukom mogao podići težinu dvaju odraslih ljudi!"},
  ptero:{need:4,item:"pero",ask:"Bok... Ja sam Krilko. Ja sam pteranodon, ali bojim se letjeti. Mama kaže da hrabrost čuvaju pera vjetra koja lebde u zračnim strujama oko litice. Doneseš mi četiri?",got:"Pero vjetra",
    done:"Četiri pera vjetra! Osjećam se hrabro! Hvala ti! Sjedni mi na leđa, idemo letjeti nad cijelom dolinom!",fact:"Pterosauri nisu bili dinosauri, nego njihovi leteći rođaci. Krila su im bila od kože razapete na jako dugom četvrtom prstu."},
  dugovrat:{need:5,item:"paprat",ask:"Mmm, zdravo... Ja sam Lišćko. Volim plave paprati koje svijetle u Močvari, južno od rijeke. Moj vrat je dug, ali noge mi zapinju u blatu. Doneseš mi pet paprati?",got:"Plava paprat",
    done:"Plave paprati! Mmmm, njam! Hvala ti, mala lisice. Popni mi se na leđa. Odozgo se vidi cijela džungla!",fact:"Dugovrati dinosauri bili su najveće životinje koje su ikad hodale po kopnu. Neki su bili dugi kao tri autobusa!"}};
function jgH(x,z){const dx=x-128,dz=z-128,r=Math.hypot(dx,dz),a=Math.atan2(dz,dx);
  let h=22+(fbm(x*.03,z*.03)-.5)*6+(fbm(x*.1+3,z*.1)-.5)*2;
  const rr=r*(1+.15*(vnoise(Math.cos(a)*2.3+7,Math.sin(a)*2.3+7,11)-.5));h+=sstep(88,106,rr)*(26+fbm(x*.05+9,z*.05)*16);
  {const d=Math.hypot(x-120,z-134);if(d<24)h=21.5+(h-21.5)*(.25+.75*sstep(16,24,d));}
  {const d=Math.hypot(x-154,z-121);if(d<12)h=22+(h-22)*sstep(8,12,d);}
  {const d=Math.hypot(x-106,z-178);if(d<10)h=22+(h-22)*sstep(6,10,d);}
  {const d=Math.hypot(x-128,z-104);if(d<21)h=23+(h-23)*sstep(16,21,d);}
  {const d=Math.hypot(x-128,z-198);if(d<15)h=22+(h-22)*sstep(10,15,d);}
  {const d=Math.hypot(x-100,z-92);if(d<11)h=Math.max(h,23.5+(1-d/11)*2.5);}
  {const d=Math.hypot(x-156,z-184);if(d<16)h=20.4+(fbm(x*.2,z*.2)-.5)*1.6+(h-20.4)*sstep(11,16,d);}
  {const d=Math.hypot(x-180,z-108);if(d<17){const lv=22-Math.min(6,Math.floor(Math.max(0,15-d)/1.9));h=Math.min(h,d<15?lv:22+(h-22)*sstep(15,17,d));}}
  {const d=Math.hypot(x-194,z-168);if(d<15)h=Math.min(h,d<12?15+d*.15:15+1.8+(d-12)*1.5);}
  {const d=Math.hypot(x-128,z-56);if(d<42){const c=22+38*Math.pow(Math.max(0,1-d/40),.9)+(fbm(x*.15,z*.15)-.5)*2.2*(1-d/42);h=Math.max(h,c);if(d<8.6)h=45+Math.pow(d/8.6,2)*7.6;}}
  if(x<=45&&Math.abs(z-108)<=19)h=Math.max(h,47+(fbm(x*.2,z*.2)-.5)*1.5);
  return Math.max(4,Math.min(58,h));}
const jgDV=(x,z)=>Math.hypot(x-128,z-56);
function jgCol(x,z,top,t){for(let y=top+1;y<H;y++){if(prot[I(x,y,z)])break;vox[I(x,y,z)]=0;}for(let y=1;y<top;y++)if(!vox[I(x,y,z)])vox[I(x,y,z)]=T.kamen;wput(x,top,z,t);}
function jgLeaf(x,y,z){if(!get(x,y,z))wput(x,y,z,hash3(x,y,z)<.3?T.lisce_b:T.lisce);}
function jgCanopy(cx,cy,cz,R,ry){const c=Math.ceil(R)+1;for(let dx=-c;dx<=c;dx++)for(let dz=-c;dz<=c;dz++)for(let dy=-Math.ceil(ry);dy<=Math.ceil(ry);dy++){const q=(dx*dx+dz*dz)/(R*R)+(dy*dy)/(ry*ry);if(q>1)continue;
    const X=Math.round(cx+dx),Z=Math.round(cz+dz),Y=Math.round(cy+dy);if(q>.7&&hash3(X,Y,Z)<.3)continue;jgLeaf(X,Y,Z);}}
function jgTree(x,z,sz){const y=wTopAt(x,z);if(y<19)return false;const g0=get(x,y,z);if(g0!==T.trava&&g0!==T.mahovina&&g0!==T.zemlja)return false;
  const big=sz===2,tw=big?2:1;const h=sz===0?3+Math.floor(hash2(x,z,5)*2):sz===1?7+Math.floor(hash2(x,z,5)*4):15+Math.floor(hash2(x,z,5)*5);
  for(let i=1;i<=h;i++)for(let a=0;a<tw;a++)for(let b=0;b<tw;b++)wput(x+a,y+i,z+b,T.drvo);
  if(big){for(const [a,b,l] of [[-1,0,2],[2,1,2],[0,-1,1],[1,2,2],[-1,1,1],[2,0,1]]){for(let k=1;k<=l;k++)wput(x+a,y+k,z+b,T.drvo);}}
  const cx=x+(tw-1)/2,cz=z+(tw-1)/2,top=y+h;const R=sz===0?2.2:sz===1?3.4+hash2(x,z,6)*.8:5.6+hash2(x,z,6)*1.2;
  jgCanopy(cx,top+.5,cz,R,sz===0?1.6:big?2.6:2);if(big){jgCanopy(cx+2.5,top-3,cz-1.5,3.2,1.6);jgCanopy(cx-2.2,top-5,cz+2,2.8,1.4);for(let i=1;i<=3;i++){wput(Math.round(cx+i),top-3,Math.round(cz),T.drvo);wput(Math.round(cx-i),top-5,Math.round(cz+i*.7),T.drvo);}}
  if(sz>0){const n=sz===2?7:3;for(let i=0;i<n;i++){const a=hash2(x,z+i,7)*6.28,r=R*(.5+hash2(x+i,z,8)*.45);const vx=cx+Math.cos(a)*r,vz=cz+Math.sin(a)*r;const vt=top-(sz===2?1.6:.8);const len=2+hash2(x,i,9)*(sz===2?7:3.5);
    if(vt-len>y+1)JG.vines.push({x:vx+.5,z:vz+.5,y:vt-len,h:len});}}
  return true;}
function jgPalm(x,z){const y=wTopAt(x,z);if(y<19)return;const h=6+Math.floor(hash2(x,z,7)*3);let px=x,pz=z;const lx=hash2(x,z,8)<.5?1:-1,lz=hash2(x,z,9)<.5?1:-1;
  for(let i=1;i<=h;i++){if(i===3)px+=lx;if(i===5)pz+=lz;wput(px,y+i,pz,T.drvo);}const ty=y+h+1;wput(px,ty,pz,T.lisce);
  for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])for(let k=1;k<=3;k++)wput(px+a*k,ty-(k===3?1:0),pz+b*k,T.lisce);for(const [a,b] of [[1,1],[-1,1],[1,-1],[-1,-1]])wput(px+a,ty,pz+b,T.lisce);}
function jgDead(x,z){const y=wTopAt(x,z);const h=4+Math.floor(hash2(x,z,3)*4);for(let i=1;i<=h;i++)wput(x,y+i,z,T.drvo);const d=[[1,0],[-1,0],[0,1],[0,-1]];for(let k=0;k<2;k++){const [a,b]=d[Math.floor(hash2(x,z+k,4)*4)];const yy=y+h-1-k*2;wput(x+a,yy,z+b,T.drvo);wput(x+a*2,yy+1,z+b*2,T.drvo);}
  JG.vines.push({x:x+1.5,z:z+.5,y:y+h-3,h:2.5});}
function jgGen(){vox.fill(0);prot.fill(0);hmap.fill(0);mask.fill(0);biome.fill(0);POI.length=0;CHESTS.length=0;FALLS.clear();WG.stars.length=0;WG.wind.length=0;WG.gate.length=0;WG.isl={};WG.fall=null;
  for(const k in JG)if(Array.isArray(JG[k]))JG[k].length=0;
  const HM=new Int16Array(W*W);for(let z=0;z<W;z++)for(let x=0;x<W;x++)HM[x+z*W]=Math.round(jgH(x,z));
  for(let z=1;z<W-1;z++)for(let x=1;x<W-1;x++){const h=HM[x+z*W];let sl=0;for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])sl=Math.max(sl,Math.abs(HM[x+a+(z+b)*W]-h));
    const dv=jgDV(x,z),wet=fbm(x*.06+4,z*.06),r=Math.hypot(x-128,z-128);const volc=dv<42&&h>29;
    for(let y=1;y<=h;y++){let t;
      if(y===h){if(volc){const q=hash2(x,z,21);t=dv<9?T.duboki:q<.5?T.duboki:q<.75?T.tuf:T.sljunak;if(h>36&&q>.985)t=T.zar;}else if(sl>=3)t=hash2(x,z,22)<.4?T.mahovina:T.kamen;else t=wet>.6?T.mahovina:T.trava;}
      else if(y>h-3)t=volc?T.duboki:sl>=3?T.kamen:T.zemlja;
      else{t=volc&&y>h-8?T.duboki:T.kamen;const q=hash3(x,y,z);if(q<.016)t=T.r_bakar;else if(q<.026)t=T.r_zeljezo;else if(q<.031)t=T.r_zlato;else if(q<.034)t=T.r_smaragd;}
      vox[I(x,y,z)]=t;}
    if(r<96&&!volc)biome[x+z*W]=6;}
  const put=(x,y,z,t)=>wput(x,y,z,t);const clearUp=(x,y,z,n)=>{for(let k=0;k<n;k++)if(!prot[I(x,y+k,z)])vox[I(x,y+k,z)]=0;};
  const GT=(x,z)=>HM[x+z*W];const setGT=(x,z,y)=>{HM[x+z*W]=y;};
  /* ---- the river, the falls pool, the plateau channel and the lagoon ---- */
  for(let z=80;z<200;z++)for(let x=40;x<200;x++){const d=lwPathD(x+.5,z+.5,JRIV);const dp=Math.hypot(x-50,z-108);if(d>4.6&&dp>5.4)continue;
    if(d<2.5||dp<4.8){const bed=dp<4.8?15:16;jgCol(x,z,bed,hash2(x,z,31)<.5?T.sljunak:T.pijesak);for(let y=bed+1;y<=19;y++)vox[I(x,y,z)]=T.voda;setGT(x,z,bed);}
    else{const h=Math.min(GT(x,z),20);if(GT(x,z)>20||GT(x,z)<20){jgCol(x,z,h,hash2(x,z,32)<.45?T.pijesak:hash2(x,z,33)<.5?T.sljunak:T.mahovina);setGT(x,z,h);}else vox[I(x,h,z)]=hash2(x,z,32)<.5?T.pijesak:T.mahovina;}}
  for(let z=104;z<=112;z++)for(let x=26;x<=45;x++){if(Math.abs(z-108)>2)continue;jgCol(x,z,44,T.sljunak);vox[I(x,45,z)]=T.voda;vox[I(x,46,z)]=T.voda;}
  for(let z=106;z<=110;z++)for(let y=20;y<=46;y++){vox[I(46,y,z)]=T.voda;FALLS.add(46+","+y+","+z);}WG.fall={x:47,y:19.6,z:108.5};
  for(let dx=-15;dx<=15;dx++)for(let dz=-15;dz<=15;dz++){const d=Math.hypot(dx,dz);if(d>=12.6)continue;const X=194+dx,Z=168+dz;const b=GT(X,Z);if(b<19){for(let y=b+1;y<=19;y++)vox[I(X,y,Z)]=T.voda;for(let y=20;y<24;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;vox[I(X,b,Z)]=hash2(X,Z,34)<.6?T.pijesak:T.glina;}}
  for(let dx=-16;dx<=16;dx++)for(let dz=-16;dz<=16;dz++){const d=Math.hypot(dx,dz);if(d<12.6||d>15)continue;const X=194+dx,Z=168+dz;const t=GT(X,Z);if(t<=21&&get(X,t,Z)!==T.voda)vox[I(X,t,Z)]=T.pijesak;}
  /* ---- explorers' camp and the portal ---- */
  const I2=WG.isl;const isl=(k,x,z,r,y)=>{I2[k]={x,z,r,y:y!=null?y:wTopAt(x,z)};};
  {const py=22;for(let dx=-6;dx<=6;dx++)for(let dz=-5;dz<=13;dz++){const X=128+dx,Z=198+dz;if(Math.hypot(dx,dz-4)<8.5)jgCol(X,Z,py,(Math.abs(dx)<=1)?T.kaldrma:hash2(X,Z,41)<.3?T.sljunak:T.trava);}
    for(let h=1;h<=5;h++){put(126,py+h,209,T.tuf);put(130,py+h,209,T.tuf);prot[I(126,py+h,209)]=prot[I(130,py+h,209)]=1;}for(let dx=-2;dx<=2;dx++){put(128+dx,py+6,209,dx===0?T.jantar:T.upjescenjak);prot[I(128+dx,py+6,209)]=1;}
    put(126,py+7,209,T.mahovina);put(130,py+7,209,T.mahovina);for(let dx=-1;dx<=1;dx++)for(let h=1;h<=5;h++)vox[I(128+dx,py+h,209)]=0;
    WG.portal={x:128.5,y:py+1,z:209.5,ry:0};WG.spawn={x:128.5,y:py+1,z:201.5,cam:0};isl("kamp",128,200,12,py);
    const tent=(cx,cz,col,face)=>{for(let k=0;k<=2;k++)for(let l=-2;l<=2;l++){const X=face?cx+l:cx-k,Z=face?cz-k:cz+l;const X2=face?cx+l:cx+k,Z2=face?cz+k:cz+l;put(X,py+3-k,Z,col);put(X2,py+3-k,Z2,col);}
      for(let l=-2;l<=2;l++){const X=face?cx+l:cx,Z=face?cz:cz+l;if(Math.abs(l)===2)put(X,py+1,Z,T.drvo);}};
    tent(120,196,T.vuna_n,0);tent(136,195,T.vuna_z,0);tent(121,204,T.vuna_b,0);
    for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])put(128+a*2,py+1,195+b*2,T.kamen);put(128,py+1,195,T.lampion);JG.fire.push({x:128.5,y:py+1.6,z:195.5});
    put(134,py+1,201,T.stol);put(135,py+1,201,T.bacva);put(135,py+1,202,T.bacva);put(135,py+2,202,T.bacva);put(121,py+1,199,T.bacva);
    for(let h=1;h<=6;h++)put(133,py+h,205,T.drvo);put(134,py+6,205,T.vuna_c);put(135,py+6,205,T.vuna_c);put(134,py+5,205,T.vuna_c);
    for(const [x,z] of [[123,192],[133,191],[124,208],[132,208]]){put(x,py+1,z,T.drvo);put(x,py+2,z,T.lampion);}
    for(let z=158;z<=191;z++)for(let dx=-1;dx<=1;dx++){const X=128+dx;const t=GT(X,z);if(t>=20&&t<=24&&!get(X,t+1,z)){vox[I(X,t,z)]=Math.abs(dx)===1&&hash2(X,z,42)<.4?T.sljunak:T.staza||T.kaldrma;}}}
  /* ---- the bridge over the river on the main road ---- */
  {for(let z=147;z<=159;z++)for(let dx=-2;dx<=2;dx++){const X=128+dx;const y=z<=147||z>=159?20:z===148||z===158?21:z===149||z===157?22:23;if(Math.abs(dx)<=1){put(X,y,z,T.daske);prot[I(X,y,z)]=1;clearUp(X,y+1,z,4);}else{if(z%3===0){put(X,y+1,z,T.drvo);put(X,y+2,z,T.drvo);}else put(X,y+1,z,T.vuna_s);}}
    for(const z of [147,159])for(const dx of [-2,2]){put(128+dx,21,z,T.drvo);put(128+dx,22,z,T.drvo);put(128+dx,23,z,T.lampion);}}
  /* ---- the Amber Temple: a stepped pyramid with a crystal shrine on top ---- */
  {const cx=128,cz=104,y0=23;for(let k=0;k<7;k++){const hf=12-k*1.6;const c=Math.ceil(hf);for(let dx=-c;dx<=c;dx++)for(let dz=-c;dz<=c;dz++){if(Math.abs(dx)>hf||Math.abs(dz)>hf)continue;
        for(let y=y0+1+k*2;y<=y0+2+k*2;y++){const edge=Math.abs(dx)>hf-1||Math.abs(dz)>hf-1;const q=hash3(cx+dx,y,cz+dz);put(cx+dx,y,cz+dz,edge?(q<.14?T.mahovina:(y%2?T.upjescenjak:T.tuf)):T.kcigla);prot[I(cx+dx,y,cz+dz)]=1;}}}
    for(let s=0;s<=13;s++){const y=y0+1+s,z=118-s;for(let x=126;x<=130;x++){for(let yy=y0+1;yy<=y;yy++){put(x,yy,z,yy===y?(x===126||x===130?T.tuf:T.pjescenjak):T.kcigla);prot[I(x,yy,z)]=1;}for(let k=1;k<=4;k++){prot[I(x,y+k,z)]=0;vox[I(x,y+k,z)]=0;}}}
    for(const x of [124,132]){put(x,y0+1,119,T.tuf);put(x,y0+2,119,T.tuf);put(x,y0+3,119,T.upjescenjak);put(x,y0+4,119,T.lampion);}
    const top=y0+14;for(let x=124;x<=132;x++)for(let z=98;z<=106;z++){put(x,top,z,(x+z)%2?T.upjescenjak:T.pjescenjak);prot[I(x,top,z)]=1;for(let k=1;k<=6;k++){prot[I(x,top+k,z)]=0;vox[I(x,top+k,z)]=0;}}
    for(let x=125;x<=131;x++)for(let z=99;z<=104;z++)for(let h=1;h<=5;h++){const wall=x===125||x===131||z===99||z===104;const gate=z===104&&x>=127&&x<=129&&h<=3;
      if(h===5){put(x,top+h,z,T.upjescenjak);prot[I(x,top+h,z)]=1;continue;}if(!wall)continue;put(x,top+h,z,gate?T.kristal:((x===125||x===131)&&(z===99||z===104)?T.tuf:(h===2&&(x+z)%2?T.jantar:T.upjescenjak)));prot[I(x,top+h,z)]=1;if(gate)WG.gate.push([x,top+h,z]);}
    for(let x=126;x<=130;x++)for(let z=100;z<=102;z++)put(x,top+6,z,T.tuf);put(128,top+7,101,T.jantar);
    for(const [x,z] of [[124,98],[132,98],[124,106],[132,106]]){put(x,top+1,z,T.tuf);put(x,top+2,z,T.lampion);}
    addChest("j_hram",128,top+1,101,"Blago Hrama jantara");isl("hram",cx,cz,14,y0);
    for(let z=120;z<=146;z++)for(let dx=-1;dx<=1;dx++){const X=128+dx,t=GT(X,z);if(t>=20&&t<=25)vox[I(X,t,z)]=T.kaldrma;}
    for(let z=124;z<=144;z+=5)for(const dx of [-3,3]){const X=128+dx,t=GT(X,z);put(X,t+1,z,T.tuf);put(X,t+2,z,hash2(X,z,43)<.5?T.mahovina:T.upjescenjak);if(z%10===4)put(X,t+3,z,T.lampion);}}
  /* ---- the volcano: a spiral path to the rim, a lava lake in the crater, a lava stream down the north side ---- */
  {let last=null;for(let t=0;t<=1;t+=1/1400){const a=Math.PI/2+t*Math.PI*2*1.6,y=Math.round(24+t*28),d=40*(1-Math.pow((y-22)/38,1.111))+.6;const px=128+Math.cos(a)*d,pz=56+Math.sin(a)*d;
      for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const X=Math.round(px+dx),Z=Math.round(pz+dz);if(Math.hypot(X+.5-px,Z+.5-pz)>1.9)continue;if(prot[I(X,y,Z)])continue;JG.vpath.add(X+','+Z);jgCol(X,Z,y,hash2(X,Z,51)<.7?T.sljunak:T.tuf);}last={x:px,z:pz,y,a};}
    JG.rimAt=last;const ra=last.a;const rx=Math.round(128+Math.cos(ra)*9.6),rz=Math.round(56+Math.sin(ra)*9.6);
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const X=rx+dx,Z=rz+dz;jgCol(X,Z,Math.max(52,GT(X,Z)),T.duboki);}put(rx,53,rz,T.duboki);
    wStar("vulkan",rx+.5,54.7,rz+.5,"Na rubu kratera Vatrene planine. Staza se penje oko vulkana!");isl("vulkan",128,56,30,52);
    for(let dx=-9;dx<=9;dx++)for(let dz=-9;dz<=9;dz++){const d=Math.hypot(dx,dz);if(d<4.6){vox[I(128+dx,45,56+dz)]=T.zar;}}JG.crater={x:128.5,z:56.5,y:46.3,r:5.2};
    for(let z=8;z<=47;z++){const cxl=128+Math.sin(z*.21)*2.6;for(let x=Math.floor(cxl-1.6);x<=Math.ceil(cxl+1.6);x++){if(Math.abs(x+.5-cxl)>1.25)continue;const t=GT(x,z);if(jgDV(x,z)<9.5||t<27||JG.vpath.has(x+','+z))continue;vox[I(x,t,z)]=T.zar;JG.hot.add(x+','+t+','+z);}}
    /* lava tube into the east flank */
    const LT=[[171,66],[163,64],[155,67],[148,64],[141,61]];for(let z=52;z<=74;z++)for(let x=126;x<=174;x++){const d=lwPathD(x+.5,z+.5,LT);const q=((x-135)/8)**2+((z-60)/7)**2;
      if(d<2.2||q<1){for(let y=23;y<=(q<1?30:26);y++){if(q<1&&((y-23)/7.5)**2+q>1)continue;vox[I(x,y,z)]=0;}vox[I(x,22,z)]=hash2(x,z,52)<.07?T.zar:T.duboki;}
      else if(d<3.4||q<1.25){for(let y=22;y<=(q<1.25?31:27);y++){if(!vox[I(x,y,z)])continue;const h=hash3(x,y,z);vox[I(x,y,z)]=h<.07?T.zar:h<.11?T.ametist:h<.5?T.duboki:T.tuf;}}}
    for(let x=166;x<=176;x++)for(let z=63;z<=69;z++){const t=GT(x,z);if(t<=23&&!get(x,23,z))vox[I(x,22,z)]=T.duboki;}
    for(const [x,z] of [[131,63],[132,63],[131,64],[132,64],[139,56],[140,56],[139,57]]){vox[I(x,22,z)]=T.zar;JG.hot.add(x+',22,'+z);}JG.lavaP.push({x:132,z:64,w:2,d:2},{x:140,z:57,w:2,d:2});
    put(135,23,57,T.duboki);put(134,23,57,T.ametist);put(136,23,58,T.ametist);wStar("tunel",135.5,24.5,57.5,"Duboko u Lavinom tunelu. Ulaz je na istočnoj strani vulkana!");
    addChest("j_tunel",139,23,63,"Škrinja Lavinog tunela");isl("tunel",150,64,10,23);}
  /* ---- the great waterfall: steps up the cliff, a mossy alcove halfway, a chest at the top ---- */
  {const step=(x0,z,y)=>{for(const x of [x0,x0+1]){put(x,y,z,hash2(x,z,61)<.5?T.mahovina:T.kamen);for(let Y=y-1;Y>15&&!get(x,Y,z);Y--)put(x,Y,z,T.kamen);clearUp(x,y+1,z,3);}};
    for(let k=1;k<=13;k++)step(46,92+k,20+k);for(let k=14;k<=27;k++)step(48,105-(k-13),33+(k-13));for(const x of [46,47])for(const z of [90,91])put(x,47,z,T.mahovina);for(const z of [90,91])clearUp(46,48,z,3),clearUp(47,48,z,3);
    for(let x=42;x<=45;x++)for(let z=102;z<=105;z++){put(x,33,z,T.mahovina);clearUp(x,34,z,3);}put(42,34,102,T.lampion);
    wStar("slap",44,34.6,103.5,"U mahovinastoj špiljici na pola Velikog slapa. Stube se penju uz liticu!");addChest("j_slap",38,48,101,"Škrinja na vrhu slapa");isl("slap",48,108,8,20);
    for(const [x,z] of [[36,98],[40,116],[32,113]])jgTree(x,z,1);}
  /* ---- the canopy walk: three giant trees joined by rope bridges, a treehouse on the last one ---- */
  {const G=[[72,164],[88,178],[70,186]],PY=36;
    for(const [gx,gz] of G){const y=wTopAt(gx,gz);for(let h=1;h<=PY+10-y;h++)for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){put(gx+a,y+h,gz+b,T.drvo);prot[I(gx+a,y+h,gz+b)]=1;}
      for(const [a,b,l] of [[-2,0,4],[2,0,3],[0,-2,4],[0,2,3],[-2,-2,2],[2,2,2],[2,-2,1],[-2,2,1]])for(let k=1;k<=l;k++)put(gx+a,wTopAt(gx+a,gz+b)+1,gz+b,T.drvo);
      jgCanopy(gx,PY+8,gz,8.5,3.6);jgCanopy(gx+4,PY+5,gz+3,4,2);jgCanopy(gx-4,PY+6,gz-3,4.5,2);
      const pr=gx===70?6.2:4.4;for(let dx=-7;dx<=7;dx++)for(let dz=-7;dz<=7;dz++){const d=Math.hypot(dx,dz);if(d>pr||(Math.abs(dx)<=1&&Math.abs(dz)<=1))continue;const X=gx+dx,Z=gz+dz;put(X,PY,Z,T.daske);prot[I(X,PY,Z)]=1;for(let k=1;k<=3;k++)if(get(X,PY+k,Z)!==T.drvo){vox[I(X,PY+k,Z)]=0;prot[I(X,PY+k,Z)]=0;}
        if(d>pr-1&&(dx+dz)%2===0)put(X,PY+1,Z,T.vuna_s);}
      for(let i=0;i<10;i++){const a=i/10*6.28,r=pr+.3;JG.vines.push({x:gx+.5+Math.cos(a)*r,z:gz+.5+Math.sin(a)*r,y:PY-3-hash2(gx,i,3)*6,h:3+hash2(gx,i,4)*6});}}
    {const [gx,gz]=G[0];const y0=wTopAt(gx-3,gz);for(let a=0;a<=(PY-y0)/2+.05;a+=.02){const Y=y0+Math.min(PY-y0,Math.floor(a*2)+1);for(const rr of [2.3,2.9,3.5]){const X=Math.round(gx+.5+Math.cos(a+3.14)*rr-.5),Z=Math.round(gz+.5+Math.sin(a+3.14)*rr-.5);
        if(get(X,Y,Z)===T.drvo&&prot[I(X,Y,Z)])continue;put(X,Y,Z,T.daske);prot[I(X,Y,Z)]=1;for(let k=1;k<=3;k++)if(get(X,Y+k,Z)!==T.drvo||!prot[I(X,Y+k,Z)]){if(get(X,Y+k,Z)===T.daske&&prot[I(X,Y+k,Z)])continue;vox[I(X,Y+k,Z)]=0;}}}}
    const bridge=(A,B)=>{const ax=A[0]+.5,az=A[1]+.5,bx=B[0]+.5,bz=B[1]+.5,L=Math.hypot(bx-ax,bz-az),ux=(bx-ax)/L,uz=(bz-az)/L,px=-uz,pz=ux;
      for(let s=4.2;s<=L-4.2;s+=.25){const t=s/L,y=Math.round(PY-Math.sin(t*Math.PI)*1.4);const cx=ax+ux*s,cz=az+uz*s;for(const o of [-.6,0,.6]){const X=Math.floor(cx+px*o),Z=Math.floor(cz+pz*o);if(!prot[I(X,y,Z)]||get(X,y,Z)===T.daske){put(X,y,Z,T.daske);prot[I(X,y,Z)]=1;for(let k=1;k<=3;k++){vox[I(X,y+k,Z)]=0;prot[I(X,y+k,Z)]=0;}}}
        for(const o of [-1.7,1.7]){const X=Math.floor(cx+px*o),Z=Math.floor(cz+pz*o);if(!get(X,y,Z)||!prot[I(X,y,Z)])put(X,y+1,Z,T.vuna_s);}
        if(Math.random()<.08)JG.vines.push({x:cx+px*1.7,z:cz+pz*1.7,y:y-2-Math.random()*3,h:2+Math.random()*3});}};
    bridge(G[0],G[1]);bridge(G[1],G[2]);
    {const hx=70,hz=190;for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++)for(let h=1;h<=4;h++){const wall=Math.abs(dx)===2||Math.abs(dz)===2;const door=dz===-2&&dx===0&&h<=2;const win=wall&&h===2&&(dx===0||dz===0)&&!door;
        const X=hx+dx,Z=hz+dz;if(h===4){put(X,PY+h,Z,T.tdaske);prot[I(X,PY+h,Z)]=1;continue;}put(X,PY+h,Z,wall&&!door?(win?0:T.daske):0);prot[I(X,PY+h,Z)]=1;}
      for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){put(hx+dx,PY+5,hz+dz,T.tdaske);prot[I(hx+dx,PY+5,hz+dz)]=1;}
      put(hx,PY+1,hz+1,T.stol);put(hx-1,PY+1,hz+1,T.lampion);wStar("krosnje",hx+.5,PY+2.3,hz+1.5,"U kućici na drvetu, visoko u krošnjama. Penji se stubama oko najvećeg stabla!");}
    addChest("j_krosnje",91,PY+1,180,"Škrinja u krošnjama");isl("krosnje",78,176,14,PY);}
  /* ---- the lily-pad lagoon: sinking pads, the crocodile's rock ---- */
  {const rc={x:194,z:168};for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const d=Math.hypot(dx,dz);if(d>2.3)continue;const X=rc.x+dx,Z=rc.z+dz;jgCol(X,Z,d<1.3?22:21,d<1.3?T.mahovina:T.kamen);prot[I(X,22,Z)]=prot[I(X,21,Z)]=1;}
    put(rc.x+1,23,rc.z-1,T.lampion);
    for(const [x,z,grp] of [[184,171,0],[187,172,1],[190,170,2],[188,166,3],[185,163,4],[189,161,5]]){const cells=[];for(let a=0;a<2;a++)for(let b=0;b<2;b++){vox[I(x+a,19,z+b)]=T.lopoc;cells.push([x+a,z+b]);}JG.pads.push({x:x+1,z:z+1,cells,grp,t:0,sunk:0,rt:0});}
    wStar("lopoci",rc.x+.5,23.6,rc.z+.5,"Na stijeni usred Lopočeve lagune. Skači po lopočima, ali brzo, jer tonu!");addChest("j_laguna",rc.x-1,22,rc.z+1,"Krokodilova škrinja");isl("laguna",194,168,13,20);JG.croc={x:197,z:172,home:{x:197,z:172}};
    for(const [x,z] of [[180,176],[202,178],[205,160],[182,158],[206,170]])jgPalm(x,z);}
  /* ---- the fossil dig: rock layers, scaffolds, buried bones, a display stand ---- */
  {const C={x:180,z:108};for(let dx=-17;dx<=17;dx++)for(let dz=-17;dz<=17;dz++){const d=Math.hypot(dx,dz);if(d>15.2)continue;const X=C.x+dx,Z=C.z+dz,t=GT(X,Z);for(let y=Math.max(1,t-4);y<=t;y++){const band=Math.floor(y/2)%4;vox[I(X,y,Z)]=y===t?(d<4.5?T.pijesak:hash2(X,Z,71)<.5?T.pijesak:T.sljunak):[T.pjescenjak,T.glina,T.zcigla,T.pijesak][band];}}
    const sp=[[0,0],[1,0],[2,0],[3,0],[-1,0],[-2,0],[-3,0],[-4,0],[4,1],[5,1]];for(const [a,b] of sp)vox[I(C.x+a,16,C.z+b)]=T.bijela;for(const a of [-2,-1,0,1,2])for(const s of [-1,1]){vox[I(C.x+a,16,C.z+s)]=T.bijela;if(Math.abs(a)<2)vox[I(C.x+a,16,C.z+s*2)]=T.bijela;}
    const sx=180,sz=91,sy=GT(sx,sz);for(let dx=-3;dx<=3;dx++)for(let dz=-1;dz<=1;dz++){jgCol(sx+dx,sz+dz,sy,T.kaldrma);put(sx+dx,sy+1,sz+dz,T.kvarc);}JG.stand={x:sx+.5,y:sy+2,z:sz+.5};
    for(const [x,z] of [[164,100],[196,100],[166,118],[194,118]]){const t=GT(x,z);for(let h=1;h<=5;h++)put(x,t+h,z,T.drvo);put(x,t+6,z,T.daske);put(x,t+5,z+1,T.vuna_s);}
    {const t=GT(172,94);for(let k=0;k<=2;k++)for(let l=-2;l<=2;l++){put(172-k,t+3-k,94+l,T.vuna_b);put(172+k,t+3-k,94+l,T.vuna_b);}put(174,t+1,96,T.stol);put(170,t+1,93,T.bacva);}
    const BN=[[175,104,"lubanja"],[186,103,"rebra"],[184,115,"kraljeznica"],[173,113,"noga"],[180,108,"rep"]];for(const [x,z,k] of BN){const y=wTopAt(x,z);JG.bones.push({x:x+.5,y:y+1.3,z:z+.5,k,got:false});}
    wStar("iskopine",JG.stand.x,-100,JG.stand.z,"Na Iskopinama. Pronađi svih pet kostiju u jami i kostur će se složiti!");addChest("j_iskopine",168,wTopAt(168,96)+1,96,"Škrinja paleontologa");isl("iskopine",180,108,16);}
  /* ---- the good-mother nest, and footprints that lead to it ---- */
  {const nx=100,nz=92,y=wTopAt(nx,nz);for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){const d=Math.hypot(dx,dz);if(d<=3.7&&d>2.5){put(nx+dx,y+1,nz+dz,hash2(dx,dz,81)<.5?T.sijeno:T.drvo);if(hash2(dx,dz,82)<.3)put(nx+dx,y+2,nz+dz,T.sijeno);}else if(d<=2.5)vox[I(nx+dx,y,nz+dz)]=T.sijeno;}
    JG.nest={x:nx+.5,y:y+1,z:nz+.5};for(let i=0;i<4;i++){const a=i*1.57+.4;JG.eggs.push({x:nx+.5+Math.cos(a)*1.25,y:y+1.35,z:nz+.5+Math.sin(a)*1.25,a});}
    wStar("gnijezdo",nx+.5,y+1.7,nz+.5,"U gnijezdu dobre mame dinosaura. Prati velike otiske stopala od Ravnice dugovrata!");isl("gnijezdo",100,92,8);
    for(let i=0;i<JFOOT.length-1;i++){const [ax,az]=JFOOT[i],[bx,bz]=JFOOT[i+1];const L=Math.hypot(bx-ax,bz-az),ux=(bx-ax)/L,uz=(bz-az)/L;let side=1;
      for(let s=0;s<L;s+=3.2){side=-side;const cx=ax+ux*s-uz*side*.9,cz=az+uz*s+ux*side*.9;const X=Math.floor(cx),Z=Math.floor(cz);for(const [a,b] of [[0,0],[Math.round(ux),Math.round(uz)],[Math.round(ux-uz),Math.round(uz+ux)],[Math.round(ux+uz),Math.round(uz-ux)]]){const t=wTopAt(X+a,Z+b);const g=get(X+a,t,Z+b);if(g===T.trava||g===T.mahovina||g===T.zemlja)vox[I(X+a,t,Z+b)]=T.blato;}}}
    for(const [x,z] of [[96,133],[95,131]]){}}
  /* a stone arch over the river: the raft passes right under the amber hanging from it */
  {const cx=102,cz=135.5,px=-.385,pz=.923;for(const sd of [-4.6,4.6]){const X0=cx+px*sd,Z0=cz+pz*sd;for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const X=Math.round(X0+dx),Z=Math.round(Z0+dz);if(Math.hypot(X+.5-X0,Z+.5-Z0)>1.5)continue;for(let y=15;y<=26;y++)put(X,y,Z,hash3(X,y,Z)<.3?T.mahovina:T.kamen);}}
    for(let t=-5.2;t<=5.2;t+=.25){const yc=Math.round(24.6+(1-(t/4.6)**2)*1.2);const X0=cx+px*t,Z0=cz+pz*t;for(const o of [-.7,0,.7]){const X=Math.round(X0+pz*o),Z=Math.round(Z0-px*o);for(let y=yc;y<=yc+1;y++)put(X,y,Z,hash3(X,y,Z)<.35?T.mahovina:T.kamen);}JG.vines.push({x:X0+.5,z:Z0+.5,y:yc-1.6-Math.random()*1.4,h:1.6+Math.random()*1.4});}
    wStar("splav",cx,21.6,cz,"Visi ispod Kamenog luka iznad rijeke. Plivanjem ga ne dohvatiš, ali splavom proplovi točno ispod njega!");isl("splav",cx,cz,7,20);}
  /* the raft dock at the foot of the falls */
  for(const [x,z] of [[59,107],[64,107]]){const t=wTopAt(x,z);put(x,t+1,z,T.drvo);put(x,t+2,z,T.lampion);}
  for(let x=60;x<=63;x++)for(let z=107;z<=108;z++){put(x,20,z,T.daske);clearUp(x,21,z,3);}
  /* ---- the singing meadow: three Parasaurolophus and three coloured stones ---- */
  {const y=GT(154,121);JG.trub={pads:[{x:149,z:121,c:"p",col:T.vuna_t},{x:153,z:118,c:"z",col:T.vuna_z},{x:157,z:121,c:"c",col:T.vuna_c}],start:{x:153,z:125},y};
    for(const p of JG.trub.pads)for(let a=0;a<2;a++)for(let b=0;b<2;b++){vox[I(p.x+a,y,p.z+b)]=p.col;clearUp(p.x+a,y+1,p.z+b,3);}for(let a=0;a<2;a++)for(let b=0;b<2;b++)vox[I(153+a,y,125+b)]=T.kvarc;
    for(let i=0;i<14;i++){const a=i/14*6.28;const X=Math.round(154+Math.cos(a)*7.5),Z=Math.round(122+Math.sin(a)*7.5);if(Z<124||Z>127)put(X,y+1,Z,T.kamen);}
    wStar("trubac",154,-100,122,"Na Pjevajućoj livadi. Poslušaj pjesmu trubača i ponovi je stajući na obojeno kamenje!");isl("trubac",154,121,9);}
  /* ---- pterosaur cliffs: a rock massif, ledges with nests, three updrafts ---- */
  {const cx=208,cz=82;for(let dx=-10;dx<=10;dx++)for(let dz=-10;dz<=10;dz++){const X=cx+dx,Z=cz+dz;const g=GT(X,Z);for(let y=g;y<=52;y++){const r=6.3+(vnoise(X*.3,y*.25,17)-.5)*1.6+(y>=48?(y-47)*.55:0);if(Math.hypot(dx,dz)<=r){const q=hash3(X,y,Z);put(X,y,Z,y===52?T.trava:q<.25?T.mahovina:q<.3?T.r_bakar:T.kamen);}}}
    const ledge=(x0,z0,y)=>{for(let x=x0;x<=x0+4;x++)for(let z=z0;z<=z0+4;z++){if(Math.hypot(x-x0-2,z-z0-2)>2.9)continue;put(x,y,z,T.mahovina);put(x,y-1,z,T.kamen);if(Math.hypot(x-x0-2,z-z0-2)<2)put(x,y-2,z,T.kamen);clearUp(x,y+1,z,3);}};
    ledge(198,85,32);ledge(198,75,44);for(const [x,z,y] of [[200,87,33],[200,77,45]]){put(x,y,z,T.sijeno);put(x+1,y,z,T.sijeno);}
    const g0=Math.min(wTopAt(197,92,30),24);WG.wind.push({x:196.5,z:91.5,r:1.7,y0:g0,y1:34.5},{x:198.5,z:82.5,r:1.6,y0:30,y1:46.5},{x:197.5,z:73.5,r:1.6,y0:42,y1:56});
    for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const d=Math.hypot(dx,dz);if(d<=2.6&&d>1.5){put(cx+dx,53,cz+dz,T.sijeno);}else if(d<=1.5)vox[I(cx+dx,52,cz+dz)]=T.sijeno;}
    wStar("litica",cx+.5,53.7,cz+.5,"Na vrhu Litica pterosaura. Zračne struje nose te s izbočine na izbočinu!");addChest("j_litica",cx+3,53,cz-3,"Škrinja s litice");isl("litica",204,82,10,33);
    JG.feathers=[[196.5,28,91.5],[198.5,40,82.5],[197.5,51,73.5],[201.5,55,76.5]];JG.kriAt={x:200.5,z:88.5};}
  /* ---- Ričko's clearing: fruit trees with branch steps ---- */
  {JG.fruits=[];for(const [x,z,dir] of [[102,174,0],[111,173,1],[106,184,2]]){const y=wTopAt(x,z);for(let h=1;h<=7;h++)put(x,y+h,z,T.drvo);jgCanopy(x,y+8,z,3.4,1.8);
      const D=[[1,0],[0,1],[-1,0],[0,-1]];for(let k=0;k<4;k++){const [a,b]=D[(k+dir)%4];put(x+a,y+1+k,z+b,T.drvo);if(k===3){const e=[x+a*2,z+b*2];put(e[0],y+4,e[1],T.drvo);JG.fruits.push({x:e[0]+.5,y:y+5.7,z:e[1]+.5});}}}
    isl("ricko",106,178,8);}
  /* ---- the swamp: mud, puddles, dead trees, glowing ferns ---- */
  {const C={x:156,z:184};for(let dx=-15;dx<=15;dx++)for(let dz=-15;dz<=15;dz++){const d=Math.hypot(dx,dz);if(d>13.5)continue;const X=C.x+dx,Z=C.z+dz,t=GT(X,Z);if(get(X,t,Z)===T.voda)continue;
      const n=fbm(X*.18,Z*.18);vox[I(X,t,Z)]=n<.4?T.voda:n<.62?T.blato:T.mahovina;if(n<.4)vox[I(X,t-1,Z)]=T.blato;}
    for(const [x,z] of [[150,178],[162,180],[158,190],[148,188],[165,187],[153,193]])jgDead(x,z);
    JG.swampFerns=[[149,181],[160,177],[163,190],[151,191],[157,185]].map(([x,z])=>({x:x+.5,y:wTopAt(x,z)+1.3,z:z+.5}));isl("mocvara",156,184,13);addChest("j_mocvara",166,wTopAt(166,182)+1,182,"Močvarna škrinja");}
  /* palms along the river and around camp, bamboo groves */
  for(const [x,z] of [[66,106],[80,132],[102,144],[136,164],[160,152],[146,166],[116,206],[142,206],[112,190],[146,190]])jgPalm(x,z);
  for(const [cx,cz,n] of [[112,198,22],[145,202,18],[60,122,16],[170,150,14]])for(let i=0;i<n;i++){const x=Math.round(cx+(hash2(i,cx,91)-.5)*8),z=Math.round(cz+(hash2(i,cz,92)-.5)*8);const t=wTopAt(x,z);const g=get(x,t,z);if(g!==T.trava&&g!==T.mahovina)continue;if(get(x,t+1,z))continue;JG.bamboo.push({x:x+.5,y:t+1,z:z+.5,n:4+Math.floor(hash2(x,z,93)*5)});}
  /* ---- scattered jungle ---- */
  const keep=[[128,200,13],[128,104,22],[128,56,42],[46,108,9],[194,168,15],[180,108,18],[100,92,7],[154,121,10],[208,82,12],[106,178,8],[156,184,15],[120,134,14],[72,164,9],[88,178,9],[70,186,10],[168,66,6],[180,91,5]];
  let placed=0;for(let i=0;i<2600&&placed<620;i++){const x=6+Math.floor(hash2(i,1,101)*244),z=6+Math.floor(hash2(i,2,101)*244);const r=Math.hypot(x-128,z-128);if(r>95)continue;
    if(keep.some(([a,b,rr])=>Math.hypot(x-a,z-b)<rr))continue;if(lwPathD(x+.5,z+.5,JRIV)<5)continue;if(Math.abs(x-128)<4&&z>116&&z<196)continue;
    const q=hash2(i,3,101);if(jgTree(x,z,q<.24?0:q<.86?1:2))placed++;}
  for(let i=0;i<1400;i++){const x=6+Math.floor(hash2(i,1,111)*244),z=6+Math.floor(hash2(i,2,111)*244);if(Math.hypot(x-128,z-128)>94)continue;const t=wTopAt(x,z);const g=get(x,t,z);if(g!==T.trava&&g!==T.mahovina)continue;if(get(x,t+1,z))continue;
    if(Math.abs(x-128)<3&&z>116&&z<196)continue;const q=hash2(i,3,111);if(q<.5)JG.ferns.push({x:x+.5,y:t+1,z:z+.5,s:1.5+hash2(i,4,111)*1.3,ry:q*40});else if(q<.7)JG.flowers.push({x:x+.5,y:t+1,z:z+.5,k:["torchflower","blue_orchid","allium","orange_tulip","pink_tulip","poppy"][Math.floor(hash2(i,5,111)*6)],s:1.1});}
  /* lily pads on the lagoon and swamp puddles */
  for(let dx=-12;dx<=12;dx++)for(let dz=-12;dz<=12;dz++){const X=194+dx,Z=168+dz;if(get(X,19,Z)!==T.voda||get(X,20,Z))continue;if(hash2(X,Z,121)<.07)JG.lily.push({x:X+.5,y:20.02,z:Z+.5,s:1,ry:hash2(X,Z,122)*6});}
  /* ground heights for plants and the map */
  for(let z=1;z<W-1;z++)for(let x=1;x<W-1;x++){for(let y=H-2;y>2;y--){const t=vox[I(x,y,z)];if(!t)continue;if(TYPES[t].leaf||t===T.drvo)continue;hmap[x+z*W]=y+1;break;}}
  [["j_kamp","Kamp istraživača","kamp"],["j_hram","Hram jantara","hram"],["j_vulkan","Vatrena planina","vulkan"],["j_tunel","Lavin tunel","tunel"],["j_splav","Kameni luk na rijeci","splav"],["j_slap","Veliki slap","slap"],["j_krosnje","Staze u krošnjama","krosnje"],
   ["j_laguna","Lopočeva laguna","laguna"],["j_iskopine","Iskopine fosila","iskopine"],["j_gnijezdo","Gnijezdo dobre mame","gnijezdo"],["j_trubac","Pjevajuća livada","trubac"],["j_litica","Litice pterosaura","litica"],["j_ricko","Ričkova čistina","ricko"],["j_mocvara","Močvara","mocvara"]]
   .forEach(([k,n,i])=>{const c=I2[i];if(c)POI.push({k,n,x:c.x,z:c.z,r:Math.max(7,Math.min(14,c.r)),y:(c.y||22)-6});});}
Object.assign(LOOT,{
  j_tunel:{coins:60,mats:{dijamant:1},blocks:{zar:6,duboki:12,ametist:6},msg:"Užarene stijene iz Lavinog tunela. Ne peku, samo svijetle!"},
  j_slap:{coins:45,mats:{biser:1},blocks:{mahovina:12,lisce:12},msg:"Na vrhu Velikog slapa vidi se cijela dolina!"},
  j_krosnje:{coins:55,mats:{},blocks:{daske:16,vuna_s:8,drvo:10},msg:"Sagradi i ti kućicu na drvetu na svom otoku!"},
  j_laguna:{coins:50,mats:{biser:2},blocks:{lopoc:8,pijesak:10},msg:"Zubko je ipak dobar krokodil. Ovu škrinju čuva samo za hrabre skakače."},
  j_iskopine:{coins:60,mats:{grumen:2},blocks:{bijela:10,pjescenjak:12},msg:"Paleontolozi su ti ostavili alat i kamenje. Možda i ti nađeš fosil!"},
  j_litica:{coins:55,mats:{smaragd:1},blocks:{sijeno:8,kamen:12},msg:"Gnijezdo pterosaura na vrhu svijeta!"},
  j_mocvara:{coins:40,mats:{},blocks:{blato:16,mahovina:8},msg:"Blato iz Močvare. Ljepljivo, ali korisno za gradnju!"},
  j_hram:{coins:360,mats:{dijamant:3,smaragd:2,grumen:3},blocks:{jantar:12,upjescenjak:20,tuf:16,zar:4},msg:"Deset komadića jantara vratilo je sjaj Hramu jantara. Cijela dolina dinosaura ti zahvaljuje!"}});

/* ---------- the look of the valley: hills beyond the cliffs, vines, ferns, bamboo, lava, smoke, pterosaurs, fireflies ---------- */
const JGV={smoke:[],ptero:[],flies:null,lava:[],bonesG:[],skel:null,eggs:[],raft:null,padM:[],croc:null,fruitG:[],featherG:[],fernG:[],mist:[]};
function jgSoftTex(){if(jgSoftTex.t)return jgSoftTex.t;const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,"rgba(255,255,255,.9)");g.addColorStop(.5,"rgba(255,255,255,.45)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,64,64);return jgSoftTex.t=new THREE.CanvasTexture(c);}
function jgVineTex(){const c=document.createElement("canvas");c.width=32;c.height=128;const x=c.getContext("2d");x.strokeStyle="#3a6a24";x.lineWidth=3;x.beginPath();x.moveTo(16,0);for(let y=0;y<=128;y+=8)x.lineTo(16+Math.sin(y*.15)*3,y);x.stroke();
  for(let y=6;y<128;y+=10){const s=(y/10)%2?1:-1;x.fillStyle=y%20?"#4f8a2e":"#6aa83a";x.beginPath();x.ellipse(16+s*6,y,5,3,s*.6,0,7);x.fill();}const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;return t;}
function jgInst(geo,mat,list,fn){if(!list.length)return null;const im=new THREE.InstancedMesh(geo,mat,list.length);const o=new THREE.Object3D();list.forEach((k,i)=>{fn(o,k,i);o.updateMatrix();im.setMatrixAt(i,o.matrix);});im.frustumCulled=false;scene.add(im);return im;}
function jgAmber(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.DodecahedronGeometry(.3,0),new THREE.MeshStandardMaterial({color:0xffb030,emissive:LC(0xff8a10),emissiveIntensity:.8,roughness:.15,metalness:.1,transparent:true,opacity:.86,flatShading:true}));m.scale.set(1,1.25,.9);g.add(m);
  const bug=new THREE.Mesh(new THREE.BoxGeometry(.1,.05,.16),new THREE.MeshBasicMaterial({color:0x3a1a08}));g.add(bug);const w1=new THREE.Mesh(new THREE.BoxGeometry(.14,.01,.06),new THREE.MeshBasicMaterial({color:0x6a3a10}));w1.position.set(0,.04,.02);g.add(w1);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffc060,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.95}));sp.scale.set(2.4,2.4,1);g.add(sp);return g;}
function jgPickMesh(item){const g=new THREE.Group();let gl;
  if(item==="zvjezdica"){gl=0xffe060;const m=std(0xffd23a,{emissive:LC(0xffa000),emissiveIntensity:.6});for(let i=0;i<5;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.1,.3,.12),m);b.rotation.z=i/5*Math.PI*2;b.position.set(Math.sin(i/5*6.28)*.1,Math.cos(i/5*6.28)*.1,0);g.add(b);}}
  else if(item==="pero"){gl=0xbff0ff;const m=std(0xffffff,{emissive:LC(0x8ad8ff),emissiveIntensity:.8});const a=new THREE.Mesh(new THREE.BoxGeometry(.03,.5,.03),m);g.add(a);for(let i=0;i<5;i++)for(const s of [-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(.14,.05,.02),m);b.position.set(s*.08,.2-i*.09,0);b.rotation.z=s*.5;g.add(b);}}
  else if(item==="paprat"){gl=0x6ad8ff;const m=std(0x5ac8ff,{emissive:LC(0x2a9ae8),emissiveIntensity:1});for(let i=0;i<5;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.06,.5,.03),m);b.rotation.z=(i-2)*.32;b.position.set((i-2)*.07,.2,0);g.add(b);}}
  else{gl=0xfff4d8;const m=std(0xf4ecd8,{emissive:LC(0x8a7a5a),emissiveIntensity:.4});const a=new THREE.Mesh(new THREE.BoxGeometry(.5,.1,.1),m);g.add(a);for(const s of [-1,1]){const b=new THREE.Mesh(new THREE.BoxGeometry(.12,.18,.14),m);b.position.x=s*.28;g.add(b);}}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:gl,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(1.5,1.5,1);g.add(sp);return g;}
function jgLavaMat(){const U={uTime};return new THREE.ShaderMaterial({uniforms:U,fog:false,
  vertexShader:"varying vec2 vP;void main(){vec4 w=modelMatrix*vec4(position,1.);vP=w.xz;gl_Position=projectionMatrix*viewMatrix*w;}",
  fragmentShader:"uniform float uTime;varying vec2 vP;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}"+
    "void main(){vec2 p=vP*.7;float a=n(p+vec2(uTime*.12,uTime*.07))*.6+n(p*2.3-uTime*.15)*.4;float crust=smoothstep(.52,.62,a);vec3 hot=mix(vec3(1.,.85,.25),vec3(1.,.35,.05),smoothstep(.2,.55,a));vec3 c=mix(hot*1.6,vec3(.18,.06,.03),crust*.85);gl_FragColor=vec4(c,1.);}"});}
function jgEnv(){water.visible=false;if(life.boat)life.boat.visible=false;
  /* jungle hills beyond the cliffs, so the edge of the world never shows */
  const sh=new THREE.Shape();sh.moveTo(-1600,-1600);sh.lineTo(1600+W,-1600);sh.lineTo(1600+W,1600+W);sh.lineTo(-1600,1600+W);sh.lineTo(-1600,-1600);
  const hole=new THREE.Path();hole.moveTo(1,1);hole.lineTo(1,W-1);hole.lineTo(W-1,W-1);hole.lineTo(W-1,1);hole.lineTo(1,1);sh.holes.push(hole);
  const gp=new THREE.Mesh(new THREE.ShapeGeometry(sh).rotateX(Math.PI/2),new THREE.MeshStandardMaterial({color:0x3a6a2c,roughness:1,side:THREE.DoubleSide}));gp.position.y=44;scene.add(gp);
  /* hanging vines */
  {const geo=new THREE.PlaneGeometry(.7,1,1,6);geo.translate(0,.5,0);const m=new THREE.MeshStandardMaterial({map:jgVineTex(),alphaTest:.5,side:THREE.DoubleSide,roughness:.9});if(typeof mrSway==="function")mrSway(m,.05);
    jgInst(geo,m,JG.vines,(o,k,i)=>{o.position.set(k.x,k.y,k.z);o.rotation.set(0,hash2(i,3,7)*3.14,0);o.scale.set(1,k.h,1);});}
  /* big ferns, bamboo, flowers, lily pads */
  if(typeof plantGeo==="function"){instanced(plantGeo("fern",1),plantMat,JG.ferns.map(f=>({x:f.x,y:f.y,z:f.z,s:f.s,sy:f.s*.9,ry:f.ry})));
    const bam=[];for(const b of JG.bamboo)for(let k=0;k<b.n;k++)bam.push({x:b.x,y:b.y+k,z:b.z,s:1,ry:hash2(b.x|0,k,5)*6});instanced(plantGeo("sugar_cane",1),plantMat,bam);
    const byK={};for(const f of JG.flowers)(byK[f.k]=byK[f.k]||[]).push(f);for(const k in byK)instanced(plantGeo(k,1),plantMat,byK[k]);
    instanced(flatGeo("lily_pad",1),flatMat,JG.lily);}
  /* lava in the crater and in the tube */
  {const lm=jgLavaMat();const C=JG.crater;const d=new THREE.Mesh(new THREE.CircleGeometry(C.r,28).rotateX(-Math.PI/2),lm);d.position.set(C.x,C.y,C.z);scene.add(d);JGV.lava.push(d);
    for(const p of JG.lavaP){const q=new THREE.Mesh(new THREE.PlaneGeometry(p.w,p.d).rotateX(-Math.PI/2),lm);q.position.set(p.x,23.04,p.z);scene.add(q);}
    const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xff7a20,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7}));gl.scale.set(26,14,1);gl.position.set(C.x,C.y+3,C.z);scene.add(gl);JGV.lavaGlow=gl;}
  /* smoke plume */
  {const tex=jgSoftTex();for(let i=0;i<30;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0x8a8078,transparent:true,depthWrite:false,opacity:.0,fog:true}));s.userData={t:i/30*14,life:14,ph:Math.random()*6};scene.add(s);JGV.smoke.push(s);}}
  /* pterosaurs circling high over the volcano */
  for(let i=0;i<6;i++){const g=MODELS.ptero();g.scale.setScalar(.75+Math.random()*.4);g.traverse(o=>{if(o.isMesh)o.castShadow=false;});scene.add(g);JGV.ptero.push({g,r:24+i*6+Math.random()*6,y:63+Math.random()*8,sp:(.08+Math.random()*.06)*(i%2?1:-1),a:Math.random()*6.28,ph:Math.random()*6});}
  /* fireflies and pollen drifting around the camera */
  {const N=700,pos=new Float32Array(N*3);for(let i=0;i<N*3;i++)pos[i]=Math.random()*60;const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
    const p=new THREE.Points(geo,new THREE.PointsMaterial({map:GLOW,size:.32,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.75,color:0xfff0a0}));p.frustumCulled=false;p.userData.base=pos.slice();scene.add(p);JGV.flies=p;}
  /* swamp mist */
  {const tex=jgSoftTex();for(let i=0;i<16;i++){const a=Math.random()*6.28,r=Math.random()*11;const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:0xd8e8d0,transparent:true,depthWrite:false,opacity:.22}));s.scale.set(7,2.4,1);s.position.set(156+Math.cos(a)*r,21.3,184+Math.sin(a)*r);s.userData={ph:Math.random()*6,x:s.position.x,z:s.position.z};scene.add(s);JGV.mist.push(s);}}
  /* the nest's eggs, the dig's bones and skeleton */
  for(const e of JG.eggs){const m=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),std(0xe8dcc0,{roughness:.6}));m.scale.set(1,1.3,1);m.position.set(e.x,e.y,e.z);m.castShadow=true;scene.add(m);
    for(let k=0;k<6;k++){const sp=new THREE.Mesh(new THREE.SphereGeometry(.07,6,4),std(0x8a6a4a));const a=Math.random()*6.28,b=Math.random()*2-1;sp.position.set(Math.cos(a)*.4*Math.sqrt(1-b*b),b*.5,Math.sin(a)*.4*Math.sqrt(1-b*b));m.add(sp);}JGV.eggs.push(m);}
  jgSkeleton();S.wq=S.wq||{};const bq=S.wq.kosti||{};for(const b of JG.bones){b.got=!!(bq[b.k]);const g=jgPickMesh("kost");g.position.set(b.x,b.y,b.z);g.visible=!b.got&&!wGot("iskopine");scene.add(g);b.g=g;}
  /* the raft */
  {const g=new THREE.Group();const m=std(0x8a5a30),m2=std(0x6a4020),r=std(0xd8c088);for(let i=0;i<5;i++){const l=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,2.6,8),i%2?m:m2);l.rotation.x=Math.PI/2;l.position.set(-1+i*.5,0,0);l.castShadow=true;g.add(l);}
    for(const z of [-.9,.9]){const b=new THREE.Mesh(new THREE.BoxGeometry(2.7,.08,.16),r);b.position.set(0,.2,z);g.add(b);}const mast=new THREE.Mesh(new THREE.BoxGeometry(.1,1.6,.1),m2);mast.position.set(.8,.9,-.8);g.add(mast);
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(.7,.45),new THREE.MeshStandardMaterial({color:0xe8503c,side:THREE.DoubleSide}));fl.position.set(1.15,1.5,-.8);g.add(fl);g.userData.fl=fl;scene.add(g);JGV.raft=g;jgRaftInit();}
  /* lily pads that sink */
  for(const p of JG.pads){const m=new THREE.Mesh(new THREE.CircleGeometry(1.25,18,.3,5.9).rotateX(-Math.PI/2),new THREE.MeshStandardMaterial({color:0x4f9a34,roughness:.8,side:THREE.DoubleSide}));m.position.set(p.x,20.04,p.z);m.rotation.y=hash2(p.x,p.z,3)*6;scene.add(m);
    const f=new THREE.Mesh(new THREE.SphereGeometry(.16,8,6),std(0xffa0d0,{emissive:LC(0xff6ab0),emissiveIntensity:.3}));f.position.set(.4,.1,.3);m.add(f);p.m=m;}
  /* the crocodile */
  {const g=MODELS.krokodil();g.scale.setScalar(1.5);scene.add(g);JGV.croc=g;}
  /* quest pickups */
  jgPickups();
  /* waterfall mist sprite */
  {const s=new THREE.Sprite(new THREE.SpriteMaterial({map:jgSoftTex(),color:0xffffff,transparent:true,depthWrite:false,opacity:.35}));s.scale.set(9,6,1);s.position.set(48,22,108.5);scene.add(s);}}
function wGot(k){return !!(S.wst&&S.wst.dzungla&&S.wst.dzungla[k]);}
function jgSkeleton(){const S2=JG.stand;if(!S2)return;const g=new THREE.Group();const m=std(0xf2ead6,{roughness:.6});const parts={};const add=(k,w,h,d,x,y,z,rx)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);if(rx)o.rotation.x=rx;o.castShadow=true;(parts[k]=parts[k]||[]).push(o);g.add(o);};
  add("lubanja",.6,.5,.8,0,1.8,1.6);add("lubanja",.5,.16,.6,0,1.46,1.7);add("lubanja",.4,.05,.05,0,1.56,2.0);
  add("kraljeznica",.16,.16,2.2,0,1.6,0);add("kraljeznica",.16,.5,.16,0,1.75,.9,-.4);
  for(let i=0;i<5;i++)for(const s of [-1,1])add("rebra",.06,.7,.06,s*.28,1.3,.6-i*.28,0),parts.rebra[parts.rebra.length-1].rotation.z=s*.35;
  for(const s of [-1,1]){add("noga",.16,.9,.18,s*.3,.75,-.6);add("noga",.14,.7,.16,s*.3,.2,-.45,.3);add("noga",.3,.06,.36,s*.3,.03,-.3);add("noga",.06,.4,.06,s*.32,1.15,.85,.6);}
  add("rep",.14,.14,1.2,0,1.5,-1.6,-.15);add("rep",.1,.1,1.0,0,1.3,-2.6,-.25);add("rep",.06,.06,.8,0,1.08,-3.4,-.3);
  g.position.set(S2.x,S2.y,S2.z);g.rotation.y=Math.PI/2;scene.add(g);JGV.skel={g,parts};jgSkelShow();}
function jgSkelShow(){const K=JGV.skel;if(!K)return;const q=(S.wq&&S.wq.kosti)||{};const all=wGot("iskopine");for(const k in K.parts)for(const o of K.parts[k])o.visible=all||!!q[k];}

/* ---------- life: the old triceratops, the long-neck herd, the singers, the good mother, little runners, and the three friends ---------- */
MODELS.dugovrat_v=()=>MODELS.dugovrat();
let trorog=null;
function jgLife(){const put=(kind,name,x,z,o)=>{o=o||{speed:1};const e=spawn(kind,name,o);e.x=x;e.z=z;e.y=walkable(e.x,e.z,false)||wTopAt(Math.floor(x),Math.floor(z))+1;e.home={x,z};return e;};
  trorog=put("trorog","Djed Trorog",134.5,199.5);trorog.frozen=true;trorog.g.rotation.y=-1.9;trorog.g.scale.setScalar(1.6);
  [["Velika Lisa",114,130],["Stari Hrast",124,128],["Teta Grana",118,140],["Visoki Vjetar",128,136]].forEach(([n,x,z])=>{const e=put("dugovrat_v",n,x,z,{speed:.35});e.g.scale.setScalar(3);e.big=1;});
  [["Pločko",146,138],["Šiljko",160,142]].forEach(([n,x,z])=>{const e=put("stego",n,x,z,{speed:.5});e.g.scale.setScalar(1.6);});
  ["Cvrčko","Brzić","Mrvica","Fiju","Skok"].forEach((n,i)=>put("kompy",n,136+(i%3)*2,186+Math.floor(i/3)*2,{speed:2.6}));
  {const e=put("majka","Mama Maja",105.5,97.5,{speed:.4});e.g.scale.setScalar(1.7);}
  const TB=JG.trub;[["trubac_p","Plavko",147.5,116.5],["trubac_z","Žutko",154,113.5],["trubac_c","Crvenko",160.5,116.5]].forEach(([k,n,x,z],i)=>{const e=put(k,n,x,z);e.frozen=true;e.g.rotation.y=(i-1)*-.35;e.g.scale.setScalar(1.5);TB.pads[i].en=e;});
  put("trex",PETS.trex.n,107.5,178.5,{speed:1.3});put("dugovrat",PETS.dugovrat.n,124.5,140.5,{speed:.6});
  const kr=put("ptero",PETS.ptero.n,JG.kriAt.x,JG.kriAt.z,{speed:.8});if(!S.met.ptero)kr.frozen=true;kr.g.rotation.y=-.8;}
function jgPickups(){S.wq=S.wq||{};JG.pick.length=0;const src={trex:JG.fruits,ptero:JG.feathers.map(([x,y,z])=>({x,y,z})),dugovrat:JG.swampFerns};
  for(const k of JGPETS){if(S.met[k])continue;const q=S.wq[k]||{};(src[k]||[]).forEach((p,i)=>{const g=jgPickMesh(JQ[k].item);g.position.set(p.x,p.y,p.z);const got=i<(q.n||0);g.visible=!!q.on&&!got;scene.add(g);JG.pick.push({k,x:p.x,y:p.y,z:p.z,g,got,i});});}}
function jgQuestOn(k){return S.wq&&S.wq[k]&&S.wq[k].on;}
function jgQuestStart(k,en){S.wq=S.wq||{};if(!S.wq[k])S.wq[k]={on:1,n:0};else S.wq[k].on=1;save();const Q=JQ[k];say(en,Q.ask,9500);sfx.chime();
  for(const p of JG.pick)if(p.k===k&&!p.got){p.g.visible=true;burst(p.x,p.y,p.z,18,[[1,.9,.5],[.6,1,.9]],1.6,2,.8);}
  toast(Q.got+": "+(S.wq[k].n||0)+" / "+Q.need+". Svjetlucaju, pa ih lako vidiš!",4200);}
function jgQuestStep(k){const Q=JQ[k],q=S.wq[k];q.n=(q.n||0)+1;save();if(q.n>=Q.need){jgBefriend(k);return;}toast(Q.got+" "+q.n+" / "+Q.need+"!",2600);tone(880,.1,"triangle",.03);tone(1175,.12,"triangle",.03,.08);}
function jgBefriend(k){const P=PETS[k];S.met[k]=today();const I2=petInfo(k);I2.h=Math.max(I2.h,2);S.wq[k].on=0;S.wq[k].done=1;save();const en=petEnt(k);
  if(en){en.frozen=false;say(en,JQ[k].done,7000);en.celebrate=1.4;for(let i=0;i<14;i++)mgSpawn({t:"heart",x:en.x,y:en.y+1.4,z:en.z,vx:(Math.random()-.5)*2,vy:1.5+Math.random()*2,vz:(Math.random()-.5)*2,life:1.4,size:.35,size2:.1,col:[0xff6a8a,0xff9ab0],grav:1});}
  sfx.fanfare();fpUI();
  setTimeout(()=>rewardReveal({kicker:"Novi prijatelj!",title:P.n,portrait:portrait(k),items:[{ic:thingIcon(P.fav),n:"Voli: "+thingName(P.fav),cnt:0,rar:"r"},{ic:itemIcon("star"),n:SPEC[k].n,cnt:0,rar:"l"}],
    sub:P.d+" Dodirni ga i jaši! Čekat će te i na Otoku priča, kraj čarobnog portala.",ok:"Jupi!",onDone:()=>setTimeout(()=>jgFact(JQ[k].fact,P.n),600)}),1600);}
const JFACT={vulkan:"Lava se hladi i pretvara u tamnu stijenu koja se zove bazalt. U doba dinosaura vulkani su bili puno aktivniji nego danas.",
  splav:"Spinosaurus je bio dinosaur koji je volio vodu. Lovio je ribu u rijekama, a na leđima je imao veliko jedro od kože.",
  lopoci:"Krokodili su živjeli već u doba dinosaura i preživjeli su sve do danas. Zato ih ponekad zovu živim fosilima.",
  iskopine:"Paleontolozi proučavaju fosile. Kosti dinosaura polako su se pretvorile u kamen, zato su se sačuvale milijunima godina.",
  gnijezdo:"Maiasaura znači 'dobra majka gušterica'. Ti dinosauri čuvali su jaja u gnijezdima i hranili svoje mladunce.",
  litica:"Najveći pterosaur, Quetzalcoatlus, imao je raspon krila kao mali avion, a ipak je bio lagan i mogao je letjeti.",
  krosnje:"Brahiosaur je bio visok kao zgrada od četiri kata i mogao je brstiti lišće s vrhova drveća.",
  tunel:"Lavin tunel nastaje kad se vanjski dio rijeke lave ohladi i stvrdne, a vruća lava ispod nastavi teći i isprazni tunel.",
  slap:"Ptice su potomci dinosaura! Kad gledaš vrapca ili kokoš, gledaš malog rođaka T-rexa.",
  trubac:"Parasaurolophus je kroz šuplju krijestu na glavi puštao zvuk kao truba. Tako je dozivao svoje krdo."};
{const _sg=starGet;starGet=function(s){_sg.apply(this,arguments);if(WORLD==="dzungla"&&JFACT[s.k])setTimeout(()=>jgFact(JFACT[s.k]),3600);};}
function jgTalk(){const n=wStars("dzungla");const need=JGPETS.filter(k=>!S.met[k]);
  const L=n>=WSTAR_N?(WG.gateOpen?"Kristalna vrata na vrhu Hrama jantara su otvorena! Hram je sjeverno od rijeke, pred vulkanom. Popni se velikim stubama!":"Svih deset jantara! Hram se budi..."):
    n===0?"Dobro došla u Izgubljenu dolinu, mala lisice! Ja sam Djed Trorog, najstariji triceratops u džungli. Potres je raznio deset komadića jantara iz Hrama jantara po cijeloj dolini. Svaki jantar čuva jednu tajnu o dinosaurima. Pronađi ih i otvorit ćeš hram!":
    "Imaš "+n+" od "+WSTAR_N+" jantara. Strelica gore pokazuje najbliži. Jedan visi ispod kamenog luka na rijeci, pa ti treba splav kraj slapa. A u laguni pazi, lopoči tonu!";
  say(trorog,L+(need.length&&n<WSTAR_N?" U dolini žive i dinosauri kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),9500);}
{const _at=animalTap;animalTap=function(en,explore){const k=en.kind;
  if(k==="trorog"){jgTalk();return true;}
  if(k==="dugovrat_v"){const L=["Mmmmm... ja sam dugovrat. Jedem lišće cijeli dan, svaki dan!","Vrat mi je dug kao drvo. Vidim sve, čak i tebe, malu lisicu!","Pazi na noge, mi smo veliki, ali nježni."];say(en,L[Math.floor(Math.random()*L.length)],4200);jgCall(en,.8);return true;}
  if(k==="stego"){say(en,"Šiljke na mom repu znanstvenici zovu 'thagomizer'. Ime su dobili po jednom smiješnom stripu!",5200);return true;}
  if(k==="kompy"){say(en,["Cvrk! Kompsognatus sam, velik sam kao kokoš!","Brzo, brzo, brzo!","Jesi li vidjela Ričkovo zvjezdano voće?"][Math.floor(Math.random()*3)],3200);en.celebrate=.5;return true;}
  if(k==="majka"){say(en,wGot("gnijezdo")?"Hvala ti što paziš na moja jaja. Uskoro će se izleći mali dinosaurići!":"Ja sam Mama Maja. Moje gnijezdo je iza brežuljka. Smiješ pogledati jaja, samo nježno!",5000);return true;}
  if(/^trubac/.test(k)){const i=["trubac_p","trubac_z","trubac_c"].indexOf(k);jgHonk(i,1);en.celebrate=.5;say(en,"Tuuu! Moja krijesta je šuplja kao truba!",3000);return true;}
  if(JGPETS.includes(k)&&!S.met[k]){if(!WORLD)return true;const q=S.wq&&S.wq[k];if(q&&q.on)say(en,JQ[k].got+": "+(q.n||0)+" / "+JQ[k].need+". Hvala što mi pomažeš!",4000);else jgQuestStart(k,en);return true;}
  return _at.apply(this,arguments);};}

/* ---------- sounds of the valley ---------- */
const JHZ=[196,247,294];
function jgHonk(i,v){if(muted||typeof AU==="undefined"||!auBuild()||AU.C.state!=="running")return;const C=AU.C,t0=C.currentTime,f=JHZ[i]||220;v=v||1;
  const o=C.createOscillator(),o2=C.createOscillator(),lp=C.createBiquadFilter(),g=C.createGain(),vib=C.createOscillator(),vg=C.createGain();o.type="sawtooth";o2.type="square";o.frequency.value=f;o2.frequency.value=f*1.005;lp.type="lowpass";lp.frequency.setValueAtTime(400,t0);lp.frequency.linearRampToValueAtTime(1300,t0+.12);lp.frequency.linearRampToValueAtTime(700,t0+.9);lp.Q.value=4;
  vib.frequency.value=5.5;vg.gain.value=f*.012;vib.connect(vg);vg.connect(o.frequency);vg.connect(o2.frequency);const g2=C.createGain();g2.gain.value=.4;
  g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.05*v,t0+.06);g.gain.setValueAtTime(.045*v,t0+.6);g.gain.exponentialRampToValueAtTime(.0001,t0+1.0);o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(AU.sfx);
  for(const x of [o,o2,vib]){x.start(t0);x.stop(t0+1.05);}}
function jgCall(en,v){if(muted||typeof AU==="undefined"||!AU||AU.C.state!=="running")return;const C=AU.C,t0=C.currentTime;const o=C.createOscillator(),lp=C.createBiquadFilter(),g=C.createGain();o.type="sawtooth";o.frequency.setValueAtTime(90,t0);o.frequency.linearRampToValueAtTime(130,t0+.5);o.frequency.linearRampToValueAtTime(70,t0+1.6);
  lp.type="lowpass";lp.frequency.value=380;g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.06*(v||1),t0+.3);g.gain.exponentialRampToValueAtTime(.0001,t0+1.8);o.connect(lp);lp.connect(g);g.connect(AU.amb);o.start(t0);o.stop(t0+1.9);}
function jgRoar(){if(muted||typeof AU==="undefined"||!auBuild()||AU.C.state!=="running")return;const C=AU.C,t0=C.currentTime;const s=C.createBufferSource();s.buffer=AU.brown;const b=C.createBiquadFilter();b.type="bandpass";b.frequency.setValueAtTime(260,t0);b.frequency.linearRampToValueAtTime(520,t0+.25);b.frequency.linearRampToValueAtTime(180,t0+.9);b.Q.value=2.5;
  const g=C.createGain();g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.5,t0+.08);g.gain.exponentialRampToValueAtTime(.0001,t0+1);s.connect(b);b.connect(g);g.connect(AU.sfx);s.start(t0,Math.random()*2,1.1);
  osc(AU.sfx,"sawtooth",150,.8,.03,0,80,0,.05);}
function jgJungleAmb(dt){if(muted||typeof AU==="undefined"||!AU||AU.C.state!=="running")return;const C=AU.C,E=AU.env;
  if(!AU.L.insect){AU.L.insect=auLoop(AU.noise,[bq("bandpass",5200,6),bq("highpass",3800,.7)]);AU.L.lava=auLoop(AU.brown,[bq("lowpass",160,.8)]);}
  const inn=E.inside||0,P=FP.on?FP.p:controls.target;const dv=Math.hypot(P.x-128,P.z-56);const sw=.5+.5*Math.sin(C.currentTime*1.7)*Math.sin(C.currentTime*.37);
  auSet(AU.L.insect.g.gain,(.012+E.leaf*.05)*(.5+.5*sw)*(1-inn*.8),.3);auSet(AU.L.lava.g.gain,cl01(1-dv/60)*.35*(P.y>40?1.3:1),.5);
  JGV.dc=(JGV.dc||8)-dt;if(JGV.dc<=0){JGV.dc=9+Math.random()*14;jgCall(null,.35+Math.random()*.4);}
  JGV.tk=(JGV.tk||3)-dt;if(JGV.tk<=0){JGV.tk=1.5+Math.random()*3;if(E.leaf>.05&&Math.random()<.6){const pan=(Math.random()*2-1)*.8,f=900+Math.random()*700;for(let i=0;i<3;i++)osc(AU.amb,"sine",f*(1+i*.18),.12,.012,i*.14,f*1.6,pan,.01);}}}

/* ---------- per-frame world logic ---------- */
const jgStar=k=>WG.stars.find(s=>s.k===k);
function jgVolcTick(dt,tt){const C=JG.crater;if(!C)return;const P=FP.p;
  for(const s of JGV.smoke){const u=s.userData;u.t+=dt;if(u.t>u.life)u.t-=u.life;const f=u.t/u.life;s.position.set(C.x+Math.sin(u.ph+tt*.1)*f*6+f*f*14,C.y+2+f*34,C.z+Math.cos(u.ph)*f*4-f*6);const sc=3+f*16;s.scale.set(sc,sc,1);s.material.opacity=Math.min(1,f*6)*(1-f)*.5;s.material.color.setHex(f<.12?0xffa060:0x8a8078);}
  if(JGV.lavaGlow)JGV.lavaGlow.material.opacity=.55+.2*Math.sin(tt*1.3)+.1*Math.sin(tt*3.7);
  if(Math.random()<dt*2.2)mgSpawn({t:"spark",x:C.x+(Math.random()-.5)*6,y:C.y+.4,z:C.z+(Math.random()-.5)*6,vx:(Math.random()-.5)*2,vy:4+Math.random()*5,vz:(Math.random()-.5)*2,life:1.6,size:.22,size2:.04,col:[0xffa040,0xff5a10,0xffe080],add:1,grav:4});
  if(!FP.on)return;const d=Math.hypot(P.x-C.x,P.z-C.z);
  if(d<C.r+1.4&&P.y<C.y+.9&&!FP.mount){const r=JG.rimAt;P.set(r.x,r.y+1.2,r.z);FP.v.set(0,3,0);burst(P.x,P.y,P.z,24,[[1,.6,.2],[1,.9,.5]],2,2,.7);sfx.pop();toast("Au, vruće! Lava je prevruća za lisičje šape. Rida je odskočila natrag na stazu.",3600);}
  if(d<22&&P.y>44)tipOnce("krater","Krater Vatrene planine! Lava je jako vruća, zato ne silazi dolje. Jantar je na rubu kratera.");
  JGV.rum=(JGV.rum||14)-dt;if(JGV.rum<=0){JGV.rum=16+Math.random()*16;if(d<70){if(typeof osc==="function"&&typeof AU!=="undefined"&&AU&&AU.C.state==="running")osc(AU.amb,"sine",42,2.4,.12*cl01(1-d/70),0,30,0,.4);FP.camT.y+=.06;for(let i=0;i<20;i++)mgSpawn({t:"spark",x:C.x+(Math.random()-.5)*5,y:C.y+.5,z:C.z+(Math.random()-.5)*5,vx:(Math.random()-.5)*4,vy:7+Math.random()*7,vz:(Math.random()-.5)*4,life:2,size:.3,size2:.05,col:[0xffa040,0xff5a10],add:1,grav:6});}}}
function jgHotTick(){if(!FP.on||!FP.ground||FP.mount)return;const P=FP.p;const fx=Math.floor(P.x),fy=Math.floor(P.y-.1),fz=Math.floor(P.z);if(get(fx,fy,fz)!==T.zar||!JG.hot.has(fx+','+fy+','+fz))return;
  let bx=0,bz=0,bd=99;for(let r=1;r<=4&&bd>50;r++)for(let k=0;k<16;k++){const a=k/16*6.283,x=Math.floor(P.x+Math.cos(a)*r),z=Math.floor(P.z+Math.sin(a)*r);const y=floorY(x+.5,Math.floor(P.y)+2,z+.5);const g=get(x,y,z);if(g&&!JG.hot.has(x+','+y+','+z)&&Math.abs(y+1-P.y)<1.6){bd=r;bx=Math.cos(a);bz=Math.sin(a);break;}}
  if(bd>50){const a=Math.random()*6.28;bx=Math.cos(a);bz=Math.sin(a);bd=1;}const sp=1.4+bd*2;FP.v.set(bx*sp,6.8,bz*sp);JG.hotT=.6;FP.ground=false;burst(P.x,P.y,P.z,14,[[1,.6,.2],[1,.85,.4]],1.6,1.6,.5);tone(700,.08,"square",.02);tone(500,.1,"square",.02,.06);
  if(performance.now()>(jgHotTick.t||0)){jgHotTick.t=performance.now()+5000;toast("Au! Lava je vruća. Hop, natrag!",2200);}}
function jgPteroTick(dt,tt){for(const p of JGV.ptero){p.a+=p.sp*dt;const x=128+Math.cos(p.a)*p.r,z=56+Math.sin(p.a)*p.r*.8,y=p.y+Math.sin(tt*.5+p.ph)*2;p.g.position.set(x,y,z);p.g.rotation.y=Math.atan2(-Math.sin(p.a)*Math.sign(p.sp),Math.cos(p.a)*.8*Math.sign(p.sp));p.g.rotation.z=-Math.sign(p.sp)*.25;
    const pr=p.g.userData.parts;const f=Math.sin(tt*2.2+p.ph)*.5;if(pr.wl){pr.wl.rotation.z=f;pr.wr.rotation.z=-f;}}}
function jgFliesTick(dt,tt){const N=JGV.flies;if(!N)return;const cp=camera.position,a=N.geometry.attributes.position,p=a.array,b=N.userData.base;const sw=Math.hypot(cp.x-156,cp.z-184)<20;
  for(let i=0;i<p.length;i+=3){b[i]+=Math.sin(tt*.6+i)*dt*.4;b[i+1]+=Math.cos(tt*.5+i*.7)*dt*.25;b[i+2]+=Math.cos(tt*.4+i)*dt*.4;const wx=((b[i]-cp.x)%60+90)%60-30,wy=((b[i+1]-cp.y)%24+36)%24-12,wz=((b[i+2]-cp.z)%60+90)%60-30;p[i]=cp.x+wx;p[i+1]=cp.y+wy;p[i+2]=cp.z+wz;}
  a.needsUpdate=true;N.material.opacity=(sw?.95:.55)*(.75+.25*Math.sin(tt*3));N.material.size=sw?.42:.3;
  for(const m of JGV.mist){const u=m.userData;m.position.x=u.x+Math.sin(tt*.12+u.ph)*2;m.position.z=u.z+Math.cos(tt*.1+u.ph)*2;m.material.opacity=.16+.08*Math.sin(tt*.3+u.ph);}}
/* the raft: from the dock under the falls, down the river, under the stone arch, into the lagoon */
const RF={path:[],L:0,s:0,on:false,back:0};
function jgRaftInit(){RF.path.length=0;const P=JRIV.slice(2);let L=0;for(let i=0;i<P.length-1;i++){const [ax,az]=P[i],[bx,bz]=P[i+1];const l=Math.hypot(bx-ax,bz-az);for(let s=0;s<l;s+=.5)RF.path.push({x:ax+.5+(bx-ax)*s/l,z:az+.5+(bz-az)*s/l,s:L+s});L+=l;}RF.path.push({x:P[P.length-1][0]+.5,z:P[P.length-1][1]+.5,s:L});RF.L=L;RF.s=0;jgRaftPlace(0);}
function jgRaftAt(s){const P=RF.path;let i=Math.min(P.length-2,Math.max(0,Math.floor(s/.5)));const a=P[i],b=P[i+1];const t=Math.min(1,Math.max(0,(s-a.s)/((b.s-a.s)||1)));return {x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t,yaw:Math.atan2(b.x-a.x,b.z-a.z)};}
function jgRaftPlace(s,tt){const g=JGV.raft;if(!g)return;const p=jgRaftAt(s);g.position.set(p.x,19.98+Math.sin((tt||0)*1.6)*.05,p.z);g.rotation.y=p.yaw+Math.PI/2;g.rotation.z=Math.sin((tt||0)*1.2)*.03;return p;}
function jgRaftTick(dt,tt){const g=JGV.raft;if(!g)return;const P=FP.p;if(g.userData.fl)g.userData.fl.rotation.y=Math.sin(tt*4)*.3;
  if(RF.back>0){RF.back-=dt;if(RF.back<=0){RF.s=0;burst(g.position.x,20.5,g.position.z,20,[[.8,.93,1],[1,1,1]],1.6,2,.6);}return;}
  if(!RF.on){const p=jgRaftPlace(RF.s,tt);if(FP.on&&!FP.mount&&Math.hypot(P.x-p.x,P.z-p.z)<1.5&&P.y>19.4&&P.y<22&&RF.s===0){RF.on=true;RF.t0=tt;sfx.splash();toast("Splav kreće niz rijeku! Uživaj u vožnji. Za iskakanje pritisni Skok.",4200);tipOnce("splav","Splavom proplovi ispod Kamenog luka i uzmi jantar koji visi s njega!");}return;}
  RF.s+=dt*(RF.s<4?1.8+RF.s*.4:3.4);const p=jgRaftPlace(RF.s,tt);
  if(Math.random()<dt*6)mgSpawn({t:"puff",x:p.x-Math.sin(p.yaw)*1.3+(Math.random()-.5),y:20.1,z:p.z-Math.cos(p.yaw)*1.3+(Math.random()-.5),vy:.2,life:.9,size:.2,size2:.5,col:[0xffffff,0xe8f6ff],drag:1,op:.6});
  if(RF.s>=RF.L){RF.on=false;RF.back=2.5;const sh=[181.5,170.5];P.set(sh[0],(walkable(sh[0],sh[1])||21)+.05,sh[1]);FP.v.set(0,0,0);FP.safe.copy(P);toast("Stigla si do Lopočeve lagune! Splav se vraća do slapa.",3200);sfx.chime();return;}}
function jgRaftJump(){if(!RF.on||!FP.on)return;if((FP.keys[" "]||FP.jump)&&RF.s>1.5){RF.on=false;RF.back=3;FP.ground=true;toast("Hop! Rida je skočila sa splava.",2000);}}
function jgRaftRide(){if(!RF.on||!FP.on)return false;const g=JGV.raft,P=FP.p;P.set(g.position.x,g.position.y+.38,g.position.z);FP.v.set(0,0,0);FP.ground=true;FP.swim=false;return true;}
/* sinking lily pads */
function jgPadTick(dt,tt){const P=FP.p;let on=null;if(FP.on&&FP.ground){const t=get(Math.floor(P.x),Math.floor(P.y-.1),Math.floor(P.z));if(t===T.lopoc)on=JG.pads.find(p=>p.cells.some(([x,z])=>x===Math.floor(P.x)&&z===Math.floor(P.z)));}
  for(const p of JG.pads){if(p.sunk){p.rt-=dt;p.m.position.y+=(19.2-p.m.position.y)*Math.min(1,dt*3);if(p.rt<=0){const inside=p.cells.some(([x,z])=>Math.floor(P.x)===x&&Math.floor(P.z)===z&&P.y<21);if(!inside){p.sunk=0;p.t=0;for(const [x,z] of p.cells)setV(x,19,z,T.lopoc);burst(p.x,20.1,p.z,12,[[.5,.9,.4],[.8,1,.7]],1.2,1.4,.5);}}continue;}
    if(p===on){p.t+=dt;if(!p.warn){p.warn=1;tone(300,.1,"sine",.02);}}else{p.t=Math.max(0,p.t-dt*.8);p.warn=0;}
    p.m.position.y=20.04-p.t*.14;p.m.rotation.x=p.t>.4?Math.sin(tt*18)*.04*p.t:0;
    if(p.t>1.05){p.sunk=1;p.rt=3.4;for(const [x,z] of p.cells)setV(x,19,z,T.voda);sfx.splash();burst(p.x,20.1,p.z,18,[[.8,.93,1],[1,1,1]],1.6,2,.6);}}
  if(on)tipOnce("lopoci","Lopoči tonu ako na njima predugo stojiš! Skači dalje, brzo!");}
/* Zubko the crocodile keeps swimmers out of his lagoon */
function jgCrocTick(dt,tt){const g=JGV.croc,c=JG.croc;if(!g||!c)return;const P=FP.p;const inL=FP.on&&FP.swim&&Math.hypot(P.x-194,P.z-168)<12.8;
  const tx=inL?P.x:c.home.x+Math.cos(tt*.13)*3,tz=inL?P.z:c.home.z+Math.sin(tt*.13)*3;const dx=tx-c.x,dz=tz-c.z,d=Math.hypot(dx,dz);const sp=inL?4.2:.8;if(d>.3){c.x+=dx/d*Math.min(d,sp*dt);c.z+=dz/d*Math.min(d,sp*dt);c.yaw=Math.atan2(dx,dz);}
  g.position.set(c.x,19.2+Math.sin(tt*.8)*.06,c.z);let da=(c.yaw||0)-g.rotation.y;while(da>Math.PI)da-=6.283;while(da<-Math.PI)da+=6.283;g.rotation.y+=da*Math.min(1,dt*3);const pr=g.userData.parts;if(pr.tail)pr.tail.rotation.y=Math.sin(tt*(inL?6:1.5))*.4;if(pr.head)pr.head.rotation.x=inL?-.25-Math.abs(Math.sin(tt*5))*.2:0;
  if(inL&&d<3.2){const ox=P.x-194,oz=P.z-168,ol=Math.hypot(ox,oz)||1;FP.v.x+=ox/ol*dt*40;FP.v.z+=oz/ol*dt*40;if(performance.now()>(c.said||0)){c.said=performance.now()+7000;toast("Krokodil Zubko: Hej, ovo je moja laguna! Ne plivaj, skači po lopočima!",3800);tone(110,.25,"sawtooth",.03);}}
  if(FP.on&&Math.hypot(P.x-194,P.z-168)<2.4&&P.y>21.5&&!c.cheer){c.cheer=1;toast("Krokodil Zubko: Bravo, skakačice! Takve hrabre lisice ja poštujem.",3800);}}
/* fossil bones in the dig */
function jgBoneTick(dt,tt){const P=FP.p;S.wq=S.wq||{};const q=S.wq.kosti=S.wq.kosti||{};
  for(const b of JG.bones){if(b.got||!b.g)continue;b.g.rotation.y+=dt*1.5;b.g.position.y=b.y+Math.sin(tt*2+b.x)*.12;if(Math.random()<dt*3)mgSpawn({t:"puff",x:b.x,y:b.y-.6,z:b.z,vy:.4,life:1,size:.2,size2:.45,col:[0xd8c8a0,0xe8dcc0],drag:1,op:.6});
    if(FP.on&&Math.hypot(P.x-b.x,P.z-b.z)<1.3&&Math.abs(P.y+.5-b.y)<1.7){b.got=true;b.g.visible=false;q[b.k]=1;save();sfx.pop();burst(b.x,b.y,b.z,22,[[.95,.9,.8],[1,1,1]],1.8,2,.7);jgSkelShow();
      const n=JG.bones.filter(x=>x.got).length;const nm={lubanja:"Lubanja",rebra:"Rebra",kraljeznica:"Kralježnica",noga:"Kosti nogu",rep:"Rep"}[b.k];
      if(n>=JG.bones.length){const s=jgStar("iskopine");if(s&&!s.got){s.y=JG.stand.y+3.4;burst(s.x,s.y,s.z,40,[[1,.8,.3],[1,1,1]],2.4,2.4,.9);toast("Svih pet kostiju! Kostur dinosaura je složen, a iznad njega zasjao je jantar!",4600);sfx.fanfare();}}
      else toast(nm+"! Kosti: "+n+" / "+JG.bones.length+". Svaka kost ide na svoje mjesto na kosturu.",3200);}}
  if(FP.on&&Math.hypot(P.x-180,P.z-108)<16)tipOnce("iskopine","Iskopine fosila! U jami je pet kostiju. Vidiš kako je zemlja složena u slojeve? Svaki sloj je stariji od onoga iznad njega.");}
/* the singing meadow: listen, then repeat by stepping on the coloured stones */
const TBS={st:"idle",seq:[],i:0,t:0,last:-1,demo:0};
function jgTrubTick(dt,tt){const B=JG.trub;if(!B||!B.pads[0].en)return;const P=FP.p;const s=jgStar("trubac");if(s&&s.got)TBS.st="done";
  const padAt=()=>{const x=Math.floor(P.x),z=Math.floor(P.z);if(Math.abs(P.y-1-B.y)>.6)return -2;for(let i=0;i<3;i++){const p=B.pads[i];if(x>=p.x&&x<=p.x+1&&z>=p.z&&z<=p.z+1)return i;}if(x>=B.start.x&&x<=B.start.x+1&&z>=B.start.z&&z<=B.start.z+1)return 9;return -1;};
  const lift=i=>{const e=B.pads[i].en;e.celebrate=.35;mgRing(B.pads[i].x+1,B.y+1.2,B.pads[i].z+1,[0x5a8ad8,0xffd23a,0xd84a3a][i]);for(let k=0;k<6;k++)mgSpawn({t:"note",x:e.x,y:e.y+3.4,z:e.z+.6,vx:(Math.random()-.5),vy:1.5,vz:.4,life:1.2,size:.32,size2:.2,col:[[0x8ab8ff],[0xffe060],[0xff8a6a]][i][0]});jgHonk(i,1.1);};
  const near=FP.on&&Math.hypot(P.x-154,P.z-121)<11;const pa=FP.on?padAt():-1;
  if(TBS.st==="done"){TBS.t-=dt;if(near&&TBS.t<=0){TBS.t=7+Math.random()*6;lift(Math.floor(Math.random()*3));}return;}
  if(near)tipOnce("trubac","Pjevajuća livada! Stani na bijeli kamen i trubači će zapjevati. Onda ponovi pjesmu stajući na obojeno kamenje.");
  if(TBS.st==="idle"){if(pa===9&&TBS.last!==9){TBS.seq=[];const L=4+(S.wq&&S.wq.trubTry?1:0);for(let i=0;i<L;i++)TBS.seq.push(Math.floor(Math.random()*3));TBS.st="demo";TBS.i=0;TBS.t=.8;toast("Slušaj pjesmu trubača...",2200);}}
  else if(TBS.st==="demo"){TBS.t-=dt;if(TBS.t<=0){if(TBS.i<TBS.seq.length){lift(TBS.seq[TBS.i]);TBS.i++;TBS.t=.95;}else{TBS.st="input";TBS.i=0;toast("Sad ti! Stani na kamenje istim redom.",2600);}}}
  else if(TBS.st==="input"){if(pa>=0&&pa<3&&pa!==TBS.last){if(pa===TBS.seq[TBS.i]){lift(pa);TBS.i++;if(TBS.i>=TBS.seq.length){TBS.st="done";TBS.t=4;setTimeout(()=>{for(let i=0;i<3;i++)setTimeout(()=>lift(i),i*120);},500);
          if(s&&!s.got){s.y=B.y+1.7;burst(s.x,s.y,s.z,40,[[1,.85,.4],[1,1,1]],2.4,2.4,.9);}toast("Savršeno! Trubači pjevaju od sreće, a na livadi je zasjao jantar!",4200);sfx.fanfare();}}
      else{tone(240,.2,"sawtooth",.03);tone(180,.3,"sawtooth",.03,.15);toast("Ups, ne baš tako. Slušaj još jednom!",2400);TBS.st="demo";TBS.i=0;TBS.t=1.6;}}
    if(!near){TBS.st="idle";}}
  if(pa!==-2)TBS.last=pa;}
/* quest pickups and starting a quest by walking up to a friend */
function jgPickTick(dt,tt){const P=FP.p;for(const p of JG.pick){if(p.got||!p.g.visible)continue;p.g.rotation.y+=dt*2;p.g.position.y=p.y+Math.sin(tt*2.4+p.i)*.15;
    if(Math.hypot(P.x-p.x,P.z-p.z)<1.3&&Math.abs(P.y+.5-p.y)<1.7){p.got=true;p.g.visible=false;burst(p.x,p.y,p.z,20,[[1,.9,.6],[.7,1,1]],1.8,2,.7);sfx.pop();jgQuestStep(p.k);}}
  for(const k of JGPETS){if(S.met[k]||jgQuestOn(k))continue;const en=petEnt(k);if(en&&Math.hypot(P.x-en.x,P.z-en.z)<4.4&&Math.abs(P.y-en.y)<4&&!(S.wq&&S.wq[k]&&S.wq[k].seen)){S.wq=S.wq||{};S.wq[k]=S.wq[k]||{n:0};S.wq[k].seen=1;jgQuestStart(k,en);}}}
function jgMiscTick(dt,tt){const P=FP.p;
  for(let i=0;i<JGV.eggs.length;i++){const m=JGV.eggs[i];const w=Math.max(0,Math.sin(tt*.9+i*1.7)-.85)*6;m.rotation.z=Math.sin(tt*14+i)*.12*w;}
  const kr=petEnt("ptero");if(kr){const pr=kr.g.userData.parts;if(!(FP.mount&&FP.mount.k==="ptero")&&pr.wl){const f=kr.frozen?.15+Math.sin(tt*1.2)*.08:Math.sin(tt*2)*.1;pr.wl.rotation.z=-f;pr.wr.rotation.z=f;}}
  for(const e of ents)if(e.big&&Math.random()<dt*.03&&FP.on&&Math.hypot(P.x-e.x,P.z-e.z)<40)jgCall(e,.7);
  if(FP.on&&FP.ground&&!FP.mount){const t=get(Math.floor(P.x),Math.floor(P.y-.1),Math.floor(P.z));if(t===T.blato){if(Math.random()<dt*Math.hypot(FP.v.x,FP.v.z)*.8)mgSpawn({t:"puff",x:P.x,y:P.y+.05,z:P.z,vy:.3,life:.6,size:.15,size2:.3,col:[0x6a4a2a,0x8a6a4a],drag:1.5,op:.8});tipOnce("blato","Blato je ljepljivo, pa Rida ovdje hoda sporije.");}}
  const M=FP.mount;if(M&&M.fruit&&FP.on){JGV.fr=(JGV.fr||0)-dt;if(JGV.fr<=0){JGV.fr=2;let leaf=0;for(const [a,b] of [[2,0],[-2,0],[0,2],[0,-2]])for(let y=2;y<6;y++){const t=get(Math.floor(P.x+a),Math.floor(P.y+y),Math.floor(P.z+b));if(t&&TYPES[t].leaf)leaf++;}
      if(leaf>=2&&Math.hypot(FP.v.x,FP.v.z)>1&&(M.fruitN||0)<12){M.fruitN=(M.fruitN||0)+1;giveN("bobice",1);miniPop(thingIcon("bobice"),"Bobice +1");tone(880,.08,"sine",.03);mgSpawn({t:"leaf",x:P.x,y:P.y+3.4,z:P.z,vy:-1,life:1,size:.3,size2:.2,col:[0x5ab84a,0x8ad85a]});}}}
  /* place tips */
  if(FP.on){if(Math.hypot(P.x-50,P.z-108)<12)tipOnce("slap_j","Veliki slap! Kraj slapa je splav, a uz liticu se penju kamene stube.");if(Math.hypot(P.x-208,P.z-82)<16)tipOnce("litica_j","Litice pterosaura! Uđi u zračnu struju koja svjetluca i ona će te podići na izbočinu.");
    if(Math.hypot(P.x-165,P.z-66)<8)tipOnce("tunel_j","Ulaz u Lavin tunel! Unutra svijetle užarene stijene, a na dnu su jezerca lave. U lavu ne staj, vruća je!");if(Math.hypot(P.x-79,P.z-177)<16&&P.y>34)tipOnce("krosnje_j","Staze u krošnjama! Mostovi od užeta vode od stabla do stabla.");}}
function jgTick(dt,tt){jgVolcTick(dt,tt);jgHotTick();jgPteroTick(dt,tt);jgFliesTick(dt,tt);jgRaftTick(dt,tt);jgPadTick(dt,tt);jgCrocTick(dt,tt);jgBoneTick(dt,tt);jgTrubTick(dt,tt);jgPickTick(dt,tt);jgMiscTick(dt,tt);jgJungleAmb(dt);}

/* ---------- movement: the raft carries Rida, mud slows her, the T-rex roars when he lands ---------- */
{const _ts=tickSquirrel;tickSquirrel=function(dt){if(WORLD!=="dzungla"||!FP.on)return _ts.apply(this,arguments);
  let set=false,hot=false;const P=FP.p;if(JG.hotT>0){JG.hotT-=dt;FP.accMul=.1;hot=true;}if(FP.ground&&!FP.mount){const t=get(Math.floor(P.x),Math.floor(P.y-.1),Math.floor(P.z));if(t===T.blato){FP.spMul=(FP.spMul||1)*.55;set=true;}}
  jgRaftJump();if(RF.on)FP.ground=true;const r=_ts.apply(this,arguments);if(set)FP.spMul=1;if(hot)FP.accMul=1;jgRaftRide();return r;};}
{const _fl=foxLand;foxLand=function(vy){_fl(vy);const M=FP.mount;if(M&&M.roar&&vy<-5.5){const P=FP.p;jgRoar();mgRing(P.x,P.y+.3,P.z,0xffe0a0);burst(P.x,P.y+.2,P.z,30,[[.7,.6,.4],[.9,.85,.7]],3,2.6,.7);if(typeof padRumble==="function"&&PAD.on)padRumble(260,.9,.7);FP.camT.y-=.2;
    for(const e of ents)if(e.kind==="kompy"&&Math.hypot(e.x-P.x,e.z-P.z)<14){const a=Math.atan2(e.z-P.z,e.x-P.x);e.tx=e.x+Math.cos(a)*8;e.tz=e.z+Math.sin(a)*8;e.celebrate=.4;}
    tipOnce("rika","RRROAR! Ričko rikne svaki put kad doskoči. Kompsognati se razbježe!");}};}
{const _fs=fpStat;fpStat=function(){_fs.apply(this,arguments);};}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);jgPrintTick(dt);};}

/* ---------- icons ---------- */
(function(){const D=ITEM_DRAW;
  D.w_dzungla=(x,P,hi,ol)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#ffd8a0");g.addColorStop(1,"#ffb070");x.fillStyle=g;x.fillRect(0,0,64,64);
    P([[16,58],[34,14],[52,58]],"#5a4a46");P([[28,26],[34,14],[40,26]],"#ff6a1e");x.fillStyle="rgba(120,110,100,.6)";x.beginPath();x.arc(36,10,5,0,7);x.arc(42,5,4,0,7);x.fill();
    P([[0,64],[0,38],[10,32],[16,64]],"#2f8a2a");P([[48,64],[54,36],[64,30],[64,64]],"#3f9a2e");x.fillStyle="#8aac62";x.fillRect(20,46,14,8);x.fillRect(31,36,4,12);x.fillRect(32,34,7,4);x.fillRect(22,54,3,6);x.fillRect(30,54,3,6);x.fillRect(14,48,7,3);};
  D.jg_fact=(x,P,hi,ol)=>{x.save();x.translate(32,32);x.fillStyle="#ffb030";x.strokeStyle="#16243a";x.lineWidth=3;x.beginPath();for(let i=0;i<6;i++){const a=i/6*6.283-1.57;x.lineTo(Math.cos(a)*22,Math.sin(a)*26);}x.closePath();x.fill();x.stroke();
    x.fillStyle="#ffe08a";x.beginPath();x.ellipse(-6,-8,6,8,.4,0,7);x.fill();x.fillStyle="#3a1a08";x.fillRect(-3,-2,8,4);x.fillRect(-6,-5,4,2);x.fillRect(5,-5,4,2);x.restore();};
  D.mg_trail_otisci=(x,P,hi,ol)=>{for(const [cx,cy,a] of [[20,46,-.3],[42,22,.2]]){x.save();x.translate(cx,cy);x.rotate(a);x.fillStyle="#6a4a2a";x.beginPath();x.ellipse(0,4,7,8,0,0,7);x.fill();for(const [b,l] of [[-.55,13],[0,15],[.55,13]]){x.save();x.rotate(b);x.beginPath();x.ellipse(0,-l*.6,3,l*.5,0,0,7);x.fill();x.restore();}x.restore();}};
  D.mg_gad_cekic=(x,P,hi,ol)=>{P([[14,56],[20,60],[44,26],[38,22]],"#8a6038");P([[28,14],[50,14],[54,22],[50,30],[28,30],[24,22]],"#9aa4b0");P([[28,14],[34,14],[34,30],[28,30]],"#c8d0d8");x.fillStyle="#ffb030";x.beginPath();x.arc(14,18,6,0,7);x.fill();};})();

WDEF.dzungla={gen:jgGen,env:jgEnv,life:jgLife,preset:"dzungla",fog:.0036,floor:null,noClouds:0,guide:()=>trorog,talk:jgTalk,tick:jgTick,itemMesh:jgAmber,itemCol:[0xffb030,0xffffff,0xffe08a],itemBurst:[[1,.75,.25],[1,1,1],[1,.9,.5]],itemFx:"spark",
  item:{one:"Komadić jantara",hud:"Jantari",done:"Svi jantari!",all:"Svih 10 komadića jantara! Hram jantara se budi i kristalna vrata na njegovu vrhu se otvaraju!",first:"Bravo, prvi jantar! Svaki jantar čuva jednu tajnu o dinosaurima. Strelica gore pokazuje najbliži."},
  intro:()=>"Džungla dinosaura! Jantari: "+wStars("dzungla")+" / "+WSTAR_N+". Djed Trorog te čeka kraj kampa.",
  finale:{chest:"j_hram",isl:"hram",at:{x:128,z:106},rewards:["skin:jantarna","trail:otisci","gad:cekic"],locked:"Kristalna vrata drže škrinju zatvorenom. Skupi svih 10 komadića jantara!",
    kicker:"Dolina dinosaura je spašena!",title:"Blago Hrama jantara",sub:"Jantarna lisica, Dino otisci i Čekić paleontologa sad su tvoji. Čekićem možeš kopati fosile i na Otoku priča!"}};
