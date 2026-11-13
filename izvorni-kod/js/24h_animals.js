/* =================== ANIMALS 2.0: every friend plays differently =================== */
/* Each animal has its own game or power: the rabbit races, the hedgehog becomes a football, the sheep blows a trampoline cloud,
   the cat sniffs out buried treasure, the parrot quizzes you on sentences from your own books, the owl sees through walls,
   the penguin teaches belly-sliding, the frog grows a path of lily pads. Some friends can be ridden: the camel, the turtle,
   a dolphin met in the open sea, a starry pony from the market, and a little dragon that hatches from an egg warmed by reading. */

/* ---- icons for hearts, stars and the egg ---- */
ITEM_DRAW.heart=(x,P,hi,ol)=>{x.beginPath();x.moveTo(32,54);x.bezierCurveTo(6,36,6,14,22,14);x.bezierCurveTo(28,14,32,20,32,24);x.bezierCurveTo(32,20,36,14,42,14);x.bezierCurveTo(58,14,58,36,32,54);x.closePath();x.fillStyle="#ff5a7a";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();hi(22,24,4);};
ITEM_DRAW.star=(x,P,hi,ol)=>{const pts=[];for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?11:24;pts.push([32+Math.cos(a)*r,34+Math.sin(a)*r]);}P(pts,"#ffc53d");hi(26,26,3);};
ITEM_DRAW.egg=(x,P,hi,ol)=>{x.beginPath();x.ellipse(32,35,17,22,0,0,7);x.fillStyle="#6ad8c0";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();x.fillStyle="#9a6ae8";[[25,28,4],[38,24,3],[36,42,5],[24,44,3]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill();});hi(25,22,4);};
/* ---- new models ---- */
MODELS.dupin=function(){const g=new THREE.Group();const B=std(0x5d8fbe),L=std(0xe6eef5),D=std(0x4a77a2);const body=new THREE.Mesh(new THREE.SphereGeometry(.5,12,9),B);body.scale.set(.8,.72,2.1);body.position.y=.35;g.add(body);
  const belly=new THREE.Mesh(new THREE.SphereGeometry(.46,12,9),L);belly.scale.set(.66,.5,1.8);belly.position.set(0,.22,.05);g.add(belly);
  const fin=new THREE.Mesh(new THREE.ConeGeometry(.2,.55,4),D);fin.position.set(0,.8,-.15);fin.rotation.x=-.55;g.add(fin);
  const tail=new THREE.Group();tail.position.set(0,.38,-.95);const tb=new THREE.Mesh(new THREE.BoxGeometry(.9,.08,.32),D);tb.position.z=-.22;tail.add(tb);g.add(tail);
  const sn=new THREE.Mesh(new THREE.ConeGeometry(.15,.45,8),B);sn.rotation.x=Math.PI/2;sn.position.set(0,.3,1.18);g.add(sn);
  for(const s of [-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(.06,8,6),std(0x16243a));e.position.set(s*.27,.48,.7);g.add(e);const f=new THREE.Mesh(new THREE.BoxGeometry(.4,.05,.2),D);f.position.set(s*.42,.18,.3);f.rotation.z=s*-.5;g.add(f);}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});g.userData.parts={tail};return g;};
MODELS.panda=function(){const R=0xc8582a,K=0x3a2418,Wt=0xfff2e0,hd={name:"head",px:0,py:.5,pz:.28},tl={name:"tail",px:0,py:.4,pz:-.3};
  return mk([[.42,.34,.6,0,.36,0,R],[.4,.34,.34,0,.58,.34,R,hd],[.1,.12,.06,-.15,.8,.32,R,hd],[.1,.12,.06,.15,.8,.32,R,hd],[.06,.07,.03,-.15,.79,.35,Wt,hd],[.06,.07,.03,.15,.79,.35,Wt,hd],
    [.16,.1,.04,-.1,.62,.515,Wt,hd],[.16,.1,.04,.1,.62,.515,Wt,hd],[.05,.06,.02,-.1,.6,.535,K,hd],[.05,.06,.02,.1,.6,.535,K,hd],[.14,.1,.12,0,.5,.52,Wt,hd],[.06,.05,.03,0,.53,.585,K,hd],
    [.18,.18,.22,0,.4,-.42,R,tl],[.19,.19,.18,0,.4,-.6,0xf2c890,tl],[.18,.18,.2,0,.4,-.78,R,tl],[.17,.17,.16,0,.4,-.94,0xf2c890,tl]].concat(legs(.12,.24,.14,.2,K,.24)));};
MODELS.konjic=function(){const Wt=0xf8f4ff,P=0xffb6d8,Y=0xffd86a,Bl=0x8ad0ff,Pu=0xc0a0ff,G=0xffc53d,K=0x2a2440,hd={name:"head",px:0,py:1.15,pz:.45},tl={name:"tail",px:0,py:.95,pz:-.5};
  return mk([[.46,.46,1,0,.85,0,Wt],[.2,.5,.22,0,1.15,.45,Wt,hd],[.26,.26,.5,0,1.42,.62,Wt,hd],[.2,.16,.2,0,1.36,.9,0xffe8f4,hd],[.05,.06,.02,-.12,1.5,.72,K,hd],[.05,.06,.02,.12,1.5,.72,K,hd],
    [.07,.12,.06,-.09,1.62,.52,Wt,hd],[.07,.12,.06,.09,1.62,.52,Wt,hd],[.1,.1,.03,0,1.5,.88,G,hd],
    [.08,.14,.14,0,1.6,.44,P,hd],[.08,.14,.14,0,1.46,.36,Y,hd],[.08,.14,.14,0,1.32,.3,Bl,hd],[.08,.14,.14,0,1.18,.26,Pu,hd],
    [.12,.36,.12,0,.92,-.62,P,tl],[.12,.3,.12,0,.68,-.66,Bl,tl],[.12,.24,.12,0,.48,-.68,Pu,tl]].concat(legs(.13,.62,.14,.36,Wt,.62)).concat([[.15,.08,.15,-.14,.04,.36,G],[.15,.08,.15,.14,.04,.36,G],[.15,.08,.15,-.14,.04,-.36,G],[.15,.08,.15,.14,.04,-.36,G]]));};
MODELS.zmaj=function(){const T2=0x3ab8a0,D=0x2a8a78,C=0xffe6a0,Pu=0x9a6ae8,G=0xffc53d,K=0x16243a,hd={name:"head",px:0,py:.62,pz:.32},tl={name:"tail",px:0,py:.38,pz:-.32},wl={name:"wl",px:-.2,py:.6,pz:0},wr={name:"wr",px:.2,py:.6,pz:0};
  return mk([[.4,.36,.56,0,.4,0,T2],[.3,.28,.36,0,.36,.06,C],[.36,.32,.38,0,.68,.38,T2,hd],[.24,.14,.18,0,.62,.6,D,hd],[.07,.08,.03,-.11,.74,.57,0xffffff,hd],[.07,.08,.03,.11,.74,.57,0xffffff,hd],[.035,.05,.02,-.11,.74,.585,K,hd],[.035,.05,.02,.11,.74,.585,K,hd],
    [.06,.14,.06,-.12,.9,.3,G,hd],[.06,.14,.06,.12,.9,.3,G,hd],[.08,.08,.08,0,.86,.2,Pu,hd],
    [.5,.05,.3,-.42,.62,-.02,Pu,wl],[.5,.05,.3,.42,.62,-.02,Pu,wr],[.06,.06,.32,-.2,.66,-.02,D,wl],[.06,.06,.32,.2,.66,-.02,D,wr],
    [.18,.16,.3,0,.36,-.42,T2,tl],[.12,.12,.28,0,.34,-.66,T2,tl],[.16,.14,.08,0,.38,-.84,Pu,tl],[.08,.08,.08,0,.62,.05,Pu],[.08,.08,.08,0,.62,-.15,Pu]].concat(legs(.12,.2,.13,.16,D,.2)));};

/* ---- the new friends ---- */
Object.assign(PETS,{
  dupin:{fav:"riba",n:"Dupin Plavko",src:"sea",d:"Najbrži plivač u moru. Obožava skakati preko valova.",gd:"Iz dubine donosi bisere i koralje.",gift:()=>Math.random()<.5?[["biser",2]]:[[["koralj_p","koralj_r","koralj_z","koralj_c","koralj_l"][Math.floor(Math.random()*5)],3]],stay:"Plavko živi u moru."},
  panda:{fav:"bobice",n:"Crvena panda Mimi",src:"buy",price:180,d:"Obožava skrivače i spava u krošnjama.",gd:"Pronalazi zlatnike skrivene u grmlju.",gift:()=>[["coins",15],["bobice",2]]},
  konjic:{fav:"mrkva",n:"Zvjezdani konjić Luna",src:"buy",price:450,d:"Galopira tako brzo da iza sebe ostavlja dugu.",gd:"Nosi zvjezdanu prašinu i čarobno sjeme.",gift:()=>[["s_svjetlo",1],["coins",10]]},
  zmaj:{fav:"svjetlocvijet",n:"Zmajić Iskra",src:"egg",d:"Izlegao se iz jajeta koje je grijalo tvoje čitanje.",gd:"Iz špilje donosi kristale.",gift:()=>[["kristal",2],["coins",10]]}});
PETS.zmaj.fav=MATS.svjetlocvijet?"svjetlocvijet":"bobice";
const NEWPETS=["dupin","panda","konjic","zmaj"];
const RIDES={deva:{land:1,speed:7.4,jump:8.4,seat:.95,slow:2.4},kornjaca:{water:1,under:1,speed:6,seat:.38,slow:2.2},dupin:{water:1,under:1,leap:1,speed:9.5,seat:.55},
  konjic:{land:1,speed:9,jump:10.5,dbl:1,trail:1,seat:1.02},zmaj:{air:1,land:1,speed:9,jump:9,seat:1.05,scale:2.2}};
const SPEC={
  zec:{n:"Utrka mrkvica",d:"Skupi sve zlatne mrkvice prije nego što Skok dotrči do cilja!",ic:"mrkva"},
  patka:{n:"Biseri u vodi",d:"Kvaki zaroni i pokaže gdje se pod vodom kriju biseri.",ic:"biser"},
  jez:{n:"Ježev nogomet",d:"Bodlja se smota u loptu. Gurni je u gol tri puta!",ic:"coin"},
  ovca:{n:"Oblak trampolin",d:"Vunica napuše oblak. Skoči na njega i dohvati zvijezde na nebu!",ic:"vuna_b"},
  kornjaca:{n:"Jahanje pod morem",d:"Polka te nosi kroz more. Pod vodom možeš ostati koliko želiš!",ride:1,ic:"prizmarin"},
  macka:{n:"Mačji njuh",d:"Mrvica nanjuši zakopano blago. Prati šapice i kopaj na oznaci!",ic:"coin"},
  papiga:{n:"Papigin kviz",d:"Rio pamti rečenice iz tvojih knjiga i priče otoka. Znaš li odgovore?",ic:"coin"},
  sova:{n:"Sovin pogled",d:"Mudrica na minutu otkrije sva skrivena blaga oko tebe, čak i kroz zidove.",ic:"karta"},
  pingvin:{n:"Klizanje na trbuhu",d:"Pipo te uči klizati. Pokupi sve ribice prije nego što istekne vrijeme!",ic:"riba"},
  zaba:{n:"Lopoči i krijesnice",d:"Kvakica stvori stazu lopoča. Skači s lopoča na lopoč i skupi krijesnice!",ic:"s_svjetlo"},
  deva:{n:"Jahanje kroz pustinju",d:"Dina zna sve putove. Na njoj Rida juri preko pijeska!",ride:1,ic:"pjescenjak"},
  dupin:{n:"Jahanje na dupinu",d:"Plavko juri morem i skače preko valova. Pritisni skok na površini!",ride:1,ic:"biser"},
  panda:{n:"Skrivača",d:"Mimi se sakrije negdje u blizini. Prati Toplo i Hladno i pronađi je tri puta!",ic:"bobice"},
  konjic:{n:"Galop duge",d:"Luna galopira brže od vjetra i može skočiti dvaput u zraku.",ride:1,ic:"star"},
  zmaj:{n:"Let na zmaju",d:"Iskra raširi krila i poleti s Ridom iznad otoka!",ride:1,ic:"kristal"}};
const petHere=k=>{const P=PETS[k];if(!P)return false;if(NEWPETS.includes(k)||P.isle)return !!S.met[k];return S.visitors.includes(k);};
const petEnt=k=>ents.find(e=>e.kind===k);

/* ---- tapping a friend opens its card ---- */
const _animalTapA=animalTap;
animalTap=function(en,explore){const k=en.kind,P=PETS[k];if(!P)return false;
  if((P.isle||P.src==="sea")&&!S.met[k]){return _animalTapA(en,explore);}
  if(FP.mount&&FP.mount.k===k)return true;sheetAnimal(k);return true;};
function heartsHTML(h){return '<span class="hearts">'+[0,1,2,3,4].map(i=>'<i class="'+(i<h?'on':'')+'"></i>').join("")+'</span>';}
function sheetAnimal(k){const P=PETS[k],I2=petInfo(k),Sp=SPEC[k],V=VISITORS.find(v=>v.k===k);const name=petName(k);const en=petEnt(k);
  const fedT=I2.fed===today(),food=haveN(P.fav)?P.fav:FOODS.find(f=>haveN(f));const giftR=I2.h>=5&&I2.gift!==today();const playedT=(S.play||{})[k]===today();
  const rideOK=!Sp.ride||I2.h>=2;const desc=V?V.d:P.d;
  openSheet('<div class="anh"><img alt="" src="'+portrait(k)+'"><div><h2>'+esc(name)+'</h2>'+heartsHTML(I2.h)+'<p class="muted">'+esc(desc)+'</p></div></div>'+
    '<div class="anspec"><div class="ansi"><img alt="" src="'+(Sp.ic==="coin"||Sp.ic==="karta"||ITEM_DRAW[Sp.ic]?itemIcon(Sp.ic):thingIcon(Sp.ic))+'"></div><div><b>'+esc(Sp.n)+'</b><small>'+esc(Sp.d)+'</small>'+
      '<small class="'+(playedT?'':'gold')+'">'+(Sp.ride?(rideOK?(playedT?"Danas ste već jahali zajedno ✓":"Prvo jahanje danas donosi nagradu i srce!"):"Za jahanje trebate biti prijatelji: 2 srca."):(playedT?"Današnja nagrada je osvojena ✓ Igrati možete opet!":"Danas te čeka nagrada i jedno srce prijateljstva!"))+'</small></div></div>'+
    '<div class="row anbtns">'+(FP.on?(rideOK?'<button class="btn big green" id="anGo">'+(Sp.ride?"Jaši!":"Igrajmo!")+'</button>':''):'<button class="btn big" id="anEx">Istraži s Ridom i igraj</button>')+'</div>'+
    '<div class="row anbtns">'+(giftR?'<button class="btn green" id="anGift">Uzmi dar</button>':'')+(fedT?'<span class="muted">Danas je već jelo ✓</span>':food?'<button class="btn soft" id="anFeed"><img class="mi" alt="" src="'+thingIcon(food)+'"> Nahrani</button>':'<span class="muted">Najdraže jelo: '+esc(thingName(P.fav))+'. Potraži ga u vrtu ili na tržnici.</span>')+
      (I2.h>=3&&!P.stay&&!Sp.ride?'<button class="btn '+(S.pet===k?'green':'soft')+'" id="anPet">'+(S.pet===k?'Prati Ridu ✓':'Povedi u istraživanje')+'</button>':'')+'</div>'+
    '<p class="muted small">'+((fedT||food)?'Najdraže jelo: <img class="mi" alt="" src="'+thingIcon(P.fav)+'">'+esc(thingName(P.fav))+' · ':'')+(I2.h>=5?'Najbolji prijatelji! '+esc(P.gd):'Do najboljeg prijateljstva: '+(5-I2.h)+' '+(5-I2.h===1?'srce':'srca'))+'</p>');
  if($("anGo"))$("anGo").onclick=()=>{closeSheet();if(Sp.ride)mountUp(k);else startAct(k);};
  if($("anEx"))$("anEx").onclick=()=>{closeSheet();$("exploreBtn").click();};
  if($("anFeed"))$("anFeed").onclick=()=>{const r=feedPet(k,food,en);if(typeof r==="number"){miniPop(thingIcon(food),"Prijateljstvo +"+r+" ♥");if(en)say(en,r===2?"Njam! To mi je najdraža hrana!":"Njam, hvala!",3000);}sheetAnimal(k);};
  if($("anGift"))$("anGift").onclick=()=>{const l=claimGift(k,en);closeSheet();if(l)rewardReveal({kicker:"Dar prijatelja",title:name,portrait:portrait(k),items:giftItems(l),sub:P.gd});};
  if($("anPet"))$("anPet").onclick=()=>{S.pet=S.pet===k?null:k;save();sfx.click();sheetAnimal(k);};}
function giftItems(lines){return lines.map(t=>({ic:/zlatnik/.test(t)?itemIcon("coin"):itemIcon("star"),n:t.replace(/^\+\d+ /,""),cnt:+(t.match(/\+(\d+)/)||[])[1]||0,rar:"r"}));}
/* one heart and a little prize the first time each day you play with a friend */
function playReward(k,extra,title){S.play=S.play||{};const first=S.play[k]!==today();const P=PETS[k],I2=petInfo(k),name=petName(k);
  const items=[];if(first){S.play[k]=today();const was=I2.h;I2.h=Math.min(5,I2.h+1);const c=25+Math.floor(Math.random()*20);S.coins+=c;items.push(rwItem("coins",c));
    for(const [it,n] of extra||[]){if(it==="coins"){S.coins+=n;items.push(rwItem("coins",n));}else{giveN(it,n);items.push(rwItem(it,n));}}
    items.push({ic:itemIcon("heart"),n:"Prijateljstvo",cnt:1,rar:I2.h===5&&was<5?"l":"r"});save();renderEco();hotbarRender();}
  rewardReveal({kicker:title||"Bravo!",title:name,portrait:portrait(k),items,sub:first?(I2.h>=5?name+" ti je najbolji prijatelj!":"Prijateljstvo: "+I2.h+" od 5 srca."):"Današnju nagradu već imaš. Sutra opet!"});}

/* ---- ACTIVITIES: one at a time, with a small HUD ---- */
let ACT=null;const actGroup=new THREE.Group();scene.add(actGroup);
function actHud(){const a=ACT;$("actHud").hidden=!a;{const ft=document.querySelector(".fptop");if(ft)ft.style.visibility=a?"hidden":"";}if(!a)return;$("actT").textContent=a.title;$("actN").innerHTML=a.label?a.label():(a.got+" / "+a.need);
  const bar=$("actBar");bar.hidden=!a.limit;if(a.limit)bar.firstChild.style.width=Math.max(0,100*(1-a.t/a.limit))+"%";}
$("actX").onclick=()=>{sfx.click();endAct(false,true);};
function clearAct(){while(actGroup.children.length){const o=actGroup.children.pop();o.traverse(m=>{if(m.isMesh||m.isSprite){if(m.geometry)m.geometry.dispose();}});}XSOLID.clear();}
function startAct(k){if(!FP.on){toast("Igre s prijateljima igraju se u istraživanju.",2600);return;}if(ACT)endAct(false,true);if(FP.mount)dismount();const en=petEnt(k);if(!en){toast(petName(k)+" nije u blizini.",2000);return;}
  const f=ACTS[k];if(!f)return;ACT={k,en,t:0,got:0,need:1,limit:0,objs:[],title:SPEC[k].n};let ok;try{ok=f(ACT);}catch(e){console.error(e);ok=false;}if(ok===false){ACT=null;clearAct();actHud();return;}sfx.chime();actHud();}
function endAct(win,quiet){const a=ACT;if(!a)return;ACT=null;if(a.end)a.end(win);clearAct();actHud();if(a.en){a.en.goto=null;a.en.tx=null;a.en.frozen=false;a.en.g.visible=true;}
  FP.spMul=1;FP.accMul=1;FP.slide=false;
  if(win){sfx.fanfare();if(rida)rida.celebrate=1;setTimeout(()=>playReward(a.k,a.prize,a.winT||"Pobjeda!"),500);}else if(!quiet){toast(a.loseT||"Uf, vrijeme je isteklo! Pokušaj ponovno.",3200);}}
/* pickups that spin and glow, collected by walking through them */
function pickupMesh(type){const g=new THREE.Group();let m;
  if(type==="carrot"){m=new THREE.Mesh(new THREE.ConeGeometry(.16,.55,6),std(0xffa020,{emissive:LC(0x804000),emissiveIntensity:.5}));m.rotation.x=Math.PI;const t=new THREE.Mesh(new THREE.ConeGeometry(.12,.25,5),std(0x5ac83a));t.position.y=.38;g.add(t);}
  else if(type==="pearl"){m=new THREE.Mesh(new THREE.SphereGeometry(.2,12,10),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.15,metalness:.3,emissive:0xbfd8ff,emissiveIntensity:.4}));}
  else if(type==="star"){const sh=new THREE.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2,r=i%2?.16:.38;i?sh.lineTo(Math.cos(a)*r,Math.sin(a)*r):sh.moveTo(Math.cos(a)*r,Math.sin(a)*r);}
    m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.12,bevelEnabled:false}),std(0xffd23d,{emissive:LC(0xffa000),emissiveIntensity:.8,flatShading:true}));m.geometry.center();}
  else if(type==="fish"){m=new THREE.Mesh(new THREE.BoxGeometry(.14,.24,.46),std(0x5ab0e8,{emissive:LC(0x204a70),emissiveIntensity:.4}));const t=new THREE.Mesh(new THREE.BoxGeometry(.04,.26,.16),std(0x3a8ac8));t.position.z=-.3;g.add(t);}
  else if(type==="fly"){m=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),new THREE.MeshBasicMaterial({color:0xfff2a0}));}
  else{m=new THREE.Mesh(new THREE.OctahedronGeometry(.25),std(0xffd23d,{emissive:LC(0xffa000),emissiveIntensity:.8}));}
  g.add(m);const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:type==="pearl"?0xcfe4ff:type==="fly"?0xfff080:0xffd070,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.75}));gl.scale.set(1.5,1.5,1);g.add(gl);
  g.userData.gl=gl;return g;}
function addPickups(a,pts,type,r){a.items=pts.map(p=>{const g=pickupMesh(type);g.position.set(p.x,p.y,p.z);actGroup.add(g);return {g,p,r:r||1.1,taken:false};});a.need=a.items.length;}
function tickPickups(a,dt,tt){const P=FP.p;for(const it of a.items||[]){if(it.taken)continue;it.g.rotation.y+=dt*2.4;it.g.position.y=it.p.y+Math.sin(tt*2.4+it.p.x)*.12;
    const d=Math.hypot(P.x-it.p.x,(P.y+.6)-it.p.y,P.z-it.p.z);if(d<it.r){it.taken=true;actGroup.remove(it.g);a.got++;burst(it.p.x,it.p.y,it.p.z,22,[[1,.9,.4],[1,1,1]],1.8,2,.7);tone(700+a.got*90,.08,"triangle",.04);if(typeof padRumble==="function"&&PAD.on)padRumble(60,.2,.3);actHud();if(a.onGot)a.onGot(it);}}
  if(a.got>=a.need)endAct(true);}
/* extra solid cells for lily pads */
const XSOLID=new Set();
const _solidAtX=solidAt;solidAt=function(x,y,z){if(XSOLID.size&&XSOLID.has(Math.floor(x)+","+Math.floor(y)+","+Math.floor(z)))return true;return _solidAtX(x,y,z);};
function landSpot(cx,cz,rMin,rMax,tries){for(let i=0;i<(tries||80);i++){const a=Math.random()*Math.PI*2,r=rMin+Math.random()*(rMax-rMin);const x=Math.floor(cx+Math.cos(a)*r)+.5,z=Math.floor(cz+Math.sin(a)*r)+.5;const y=walkable(x,z,false);if(y==null)continue;if(Math.abs(y-FP.p.y)>6)continue;
    if(get(Math.floor(x),Math.floor(y),Math.floor(z))||get(Math.floor(x),Math.floor(y)+1,Math.floor(z)))continue;return {x,y,z};}return null;}
const ACTS={
  zec(a){const pts=[];let x=FP.p.x,z=FP.p.z,y=FP.p.y;let dir=FP.yaw;
    for(let i=0;i<9&&pts.length<8;i++){let ok=false;for(let tr=0;tr<14;tr++){const d2=dir+(Math.random()-.5)*1.4*(1+tr*.15);const nx=x+Math.sin(d2)*5.5,nz=z+Math.cos(d2)*5.5;const ny=walkable(nx,nz,false);if(ny==null||Math.abs(ny-y)>2.2)continue;x=nx;z=nz;y=ny;dir=d2;ok=true;break;}if(!ok)dir+=Math.PI*.7;else pts.push({x,y:y+.9,z});}
    if(pts.length<4){toast("Ovdje je premalo mjesta za utrku. Pokušaj na livadi!",2800);return false;}
    addPickups(a,pts,"carrot",1.3);a.limit=8+pts.length*4.6;a.path=pts;a.pi=0;a.en.speed=2.6;say(a.en,"Na mjesta, pozor, sad! Tko prije do zadnje mrkvice!",3500);
    a.tick=(dt,tt)=>{const en=a.en;if(!en.goto&&a.pi<a.path.length){const q=a.path[a.pi];en.goto={x:q.x,z:q.z,force:true};en.arrive=()=>{a.pi++;};}if(a.pi>=a.path.length&&a.got<a.need){a.loseT="Skok je stigao prvi! Pokušaj opet, sad znaš put.";endAct(false);return;}tickPickups(a,dt,tt);};
    a.prize=[["s_mrkva",3]];a.winT="Brža si od zeca!";},
  patka(a){const pts=[];const c=a.en;for(let i=0;i<300&&pts.length<5;i++){const ang=Math.random()*Math.PI*2,r=3+Math.random()*16;const x=Math.floor(c.x+Math.cos(ang)*r)+.5,z=Math.floor(c.z+Math.sin(ang)*r)+.5;const ty=topY(x,z);if(ty<0||ty>WATER-2.2)continue;
      if(pts.some(p=>Math.hypot(p.x-x,p.z-z)<3))continue;pts.push({x,y:ty+1.5,z});}
    if(pts.length<3){toast("Ovdje je voda preplitka za bisere.",2400);return false;}addPickups(a,pts,"pearl",1.2);a.limit=90;say(c,"Kvak! Ispod vode nešto sja. Zaroni!",3500);
    a.tick=(dt,tt)=>{for(const it of a.items)if(!it.taken&&Math.random()<dt*3)burst(it.p.x,it.p.y+.3,it.p.z,1,[[.9,.97,1]],.1,1.4,1.6,-1.4);tickPickups(a,dt,tt);};a.prize=[["biser",2]];a.winT="Svi biseri su tvoji!";},
  jez(a){const en=a.en;const fw=FP.yaw;let gx=FP.p.x+Math.sin(fw)*10,gz=FP.p.z+Math.cos(fw)*10;let gy=walkable(gx,gz,false);
    if(gy==null||Math.abs(gy-FP.p.y)>2){const s=landSpot(FP.p.x,FP.p.z,7,11);if(!s){toast("Treba nam ravna livada za nogomet.",2400);return false;}gx=s.x;gz=s.z;gy=s.y;}
    const goal=new THREE.Group();const wm=std(0xfffdf7),nm=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35,wireframe:true});
    [[-1.4,0],[1.4,0]].forEach(([u])=>{const p=new THREE.Mesh(new THREE.BoxGeometry(.18,1.7,.18),wm);p.position.set(u,.85,0);goal.add(p);});const bar=new THREE.Mesh(new THREE.BoxGeometry(3,.18,.18),wm);bar.position.y=1.7;goal.add(bar);
    const net=new THREE.Mesh(new THREE.BoxGeometry(2.8,1.6,1),nm);net.position.set(0,.8,-.55);goal.add(net);const ga=Math.atan2(FP.p.x-gx,FP.p.z-gz);goal.position.set(gx,gy,gz);goal.rotation.y=ga;actGroup.add(goal);
    const ball=new THREE.Group();const bm=new THREE.Mesh(new THREE.SphereGeometry(.34,12,10),std(0x8a5a3a));ball.add(bm);for(let i=0;i<26;i++){const sp=new THREE.Mesh(new THREE.ConeGeometry(.05,.18,4),std(0x4a3020));const v=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize();sp.position.copy(v.multiplyScalar(.36));sp.lookAt(v.multiplyScalar(2));sp.rotateX(Math.PI/2);ball.add(sp);}
    actGroup.add(ball);en.g.visible=false;en.frozen=true;a.need=3;a.limit=120;a.goal={x:gx,y:gy,z:gz,a:ga};
    const reset=()=>{const bx=FP.p.x+Math.sin(FP.yaw)*1.6,bz=FP.p.z+Math.cos(FP.yaw)*1.6;a.b={x:bx,z:bz,y:(walkable(bx,bz,false)||FP.p.y),vx:0,vz:0,vy:0};};reset();
    a.label=()=>"Golovi: "+a.got+" / 3";toast("Gurni ježa-loptu u gol! Kreni na njega i lopta se otkotrlja.",3600);
    a.tick=(dt,tt)=>{const B=a.b,P=FP.p;const d=Math.hypot(B.x-P.x,B.z-P.z);if(d<.75&&Math.abs(B.y-P.y)<1.2){const nx=(B.x-P.x)/(d||1),nz=(B.z-P.z)/(d||1);const sp=Math.hypot(FP.v.x,FP.v.z)+3.5;B.vx=nx*sp*1.4;B.vz=nz*sp*1.4;B.vy=2.2;tone(220,.05,"triangle",.03);B.x=P.x+nx*.76;B.z=P.z+nz*.76;}
      const nxp=B.x+B.vx*dt,nzp=B.z+B.vz*dt;if(_solidAtX(nxp,B.y+.3,B.z)){B.vx*=-.6;}else B.x=nxp;if(_solidAtX(B.x,B.y+.3,nzp)){B.vz*=-.6;}else B.z=nzp;
      const gy2=walkable(B.x,B.z,false);const fl=gy2==null?B.y-1:gy2;B.vy-=18*dt;B.y+=B.vy*dt;if(B.y<fl){B.y=fl;B.vy=Math.abs(B.vy)>2?-B.vy*.35:0;}if(gy2==null&&B.y<WATER-1)reset();
      const fr=Math.exp(-dt*1.2);B.vx*=fr;B.vz*=fr;ball.position.set(B.x,B.y+.34,B.z);ball.rotation.x+=B.vz*dt*2.6;ball.rotation.z-=B.vx*dt*2.6;
      const G2g=a.goal,cs=Math.cos(G2g.a),sn=Math.sin(G2g.a);const lx=(B.x-G2g.x)*cs-(B.z-G2g.z)*sn,lz=(B.x-G2g.x)*sn+(B.z-G2g.z)*cs;
      if(Math.abs(lx)<1.25&&lz<0&&lz>-.9&&B.y<G2g.y+1.6){a.got++;actHud();sfx.fanfare();for(let i=0;i<3;i++)setTimeout(()=>burst(G2g.x,G2g.y+1.2,G2g.z,40,[[1,.85,.3],[1,1,1],[.6,.9,1]],3,3,1),i*150);if(typeof padRumble==="function"&&PAD.on)padRumble(300,.6,.5);
        if(a.got>=a.need){endAct(true);return;}toast("GOOOL! Još "+(a.need-a.got)+"!",1800);reset();}};
    a.end=()=>{en.g.visible=true;en.frozen=false;en.x=a.b.x;en.z=a.b.z;en.y=walkable(en.x,en.z,false)||en.y;};a.prize=[["bobice",3]];a.winT="Hat-trick!";},
  ovca(a){const en=a.en;let cx=FP.p.x+Math.sin(FP.yaw)*2.6,cz=FP.p.z+Math.cos(FP.yaw)*2.6;let cy=walkable(cx,cz,false);if(cy==null){cx=FP.p.x;cz=FP.p.z;cy=FP.p.y;}
    const cloud=new THREE.Group();const cm=std(0xffffff,{flatShading:false,emissive:LC(0xdde8ff),emissiveIntensity:.25});[[0,0,0,.9],[.8,.1,.2,.7],[-.8,.05,-.1,.72],[.2,.25,.75,.6],[-.3,.2,-.75,.62],[.1,.45,0,.6]].forEach(q=>{const s=new THREE.Mesh(new THREE.SphereGeometry(q[3],12,10),cm);s.position.set(q[0],q[1],q[2]);cloud.add(s);});
    cloud.position.set(cx,cy+.55,cz);actGroup.add(cloud);a.cloud={x:cx,y:cy+.55,z:cz};const pts=[];for(let i=0;i<6;i++){const ang=i/6*Math.PI*2+Math.random()*.4,r=1.5+Math.random()*3;pts.push({x:cx+Math.cos(ang)*r,y:cy+6+i*1.7,z:cz+Math.sin(ang)*r});}
    addPickups(a,pts,"star",1.3);a.limit=75;say(en,"Bee! Skoči na moj oblak i dohvati zvijezde!",3600);
    a.tick=(dt,tt)=>{const C=a.cloud,P=FP.p;cloud.scale.y=1+Math.sin(tt*3)*.05;if(Math.hypot(P.x-C.x,P.z-C.z)<1.5&&P.y>=C.y+.1&&P.y<C.y+1.4&&FP.v.y<=0){FP.v.y=19;FP.ground=false;P.y=C.y+1.41;cloud.scale.y=.7;[330,495,660].forEach((f,i)=>tone(f,.12,"sine",.05,i*.04));burst(C.x,C.y+.8,C.z,26,[[1,1,1],[.85,.92,1]],2.2,2.5,.7);}
      tickPickups(a,dt,tt);};a.prize=[["vuna_b",4]];a.winT="Do zvijezda i natrag!";},
  macka(a){const en=a.en;let s=null;for(let i=0;i<60&&!s;i++){const q=landSpot(FP.p.x,FP.p.z,12,24);if(!q)continue;const t=get(Math.floor(q.x),Math.floor(q.y)-1,Math.floor(q.z));const ty=TYPES[t];if(!ty||!/trava|zemlja|pijesak|snijeg|oranica/.test(ty.k||"")||protectWhy([Math.floor(q.x),Math.floor(q.y)-1,Math.floor(q.z)]))continue;s=q;}
    if(!s){toast("Mrvica ovdje ne nanjuši ništa. Pokušaj na otvorenom!",2600);return false;}a.spot=[Math.floor(s.x),Math.floor(s.y)-1,Math.floor(s.z)];a.need=1;a.limit=0;
    const mark=new THREE.Group();const xm=new THREE.MeshBasicMaterial({color:0xd8403a,transparent:true,opacity:.9,depthWrite:false});[1,-1].forEach(r=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.9,.04,.16),xm);b.rotation.y=r*Math.PI/4;mark.add(b);});mark.position.set(s.x,s.y+.03,s.z);actGroup.add(mark);
    const col=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,14,10,1,true),new THREE.MeshBasicMaterial({color:0xffd070,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));col.position.set(s.x,s.y+7,s.z);actGroup.add(col);col.visible=false;a.col=col;
    en.goto={x:s.x+.8,z:s.z,force:true};en.speed=2.2;a.pawT=0;say(en,"Mijau! Nešto njušim... Prati me!",3500);a.label=()=>"Prati Mrvicu i kopaj na oznaci X";
    en.arrive=()=>{a.col.visible=true;say(en,"Tu! Kopaj ovdje!",3500);};
    a.tick=(dt,tt)=>{a.pawT-=dt;if(a.pawT<=0&&en.goto){a.pawT=.35;burst(en.x,en.y+.05,en.z,2,[[.4,.3,.25]],.05,.1,3,0);}
      if(get(...a.spot)===0){a.need=1;a.got=1;const c=40+Math.floor(Math.random()*40);const gem=["smaragd","biser","dijamant","grumen"][Math.floor(Math.random()*4)];a.prize=[["coins",c],[gem,gem==="dijamant"?1:2]];endAct(true);}};a.winT="Zakopano blago!";},
  papiga(a){const qs=parrotQs();if(!qs.length){toast("Rio još nema pitanja. Zapiši omiljene rečenice u dnevnik!",3000);return false;}a.need=qs.length;a.qs=qs;a.qi=0;a.score=0;a.label=()=>"Pitanje "+Math.min(a.qi+1,a.need)+" / "+a.need;
    a.tick=()=>{};setTimeout(()=>parrotAsk(a),300);},
  sova(a){a.need=1;a.limit=60;a.label=()=>"Sovin pogled: "+Math.ceil(60-a.t)+" s";const marks=[];
    const add=(x,y,z,col)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,40,10,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,side:THREE.DoubleSide}));b.position.set(x,y+20,z);b.renderOrder=9;actGroup.add(b);
      const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:col,blending:THREE.AdditiveBlending,depthTest:false,depthWrite:false,transparent:true}));s.scale.set(3,3,1);s.position.set(x,y+.6,z);s.renderOrder=9;actGroup.add(s);marks.push(s);};
    let n=0;for(const c of chestObjs)if(!c.open&&(c.id!=="tajna"||(S.quest&&S.quest.done))){add(c.x,c.y,c.z,0xffc53d);n++;}for(const tr of treasures){if(!tr.leaving){add(tr.g.position.x,tr.g.position.y,tr.g.position.z,0x8af0ff);n++;}}
    if(typeof qActive==="function"&&S.quest&&!S.quest.done){const i=qActive();if(i>=0&&QUEST.pos[i]){const q=QUEST.pos[i];add(q.x,q.y,q.z,0xffffff);n++;}}
    say(a.en,n?"Huu-huu! Vidim "+n+" skrivenih stvari. Prati svjetla!":"Huu! Sve je već pronađeno, bravo!",4500);a.tick=(dt,tt)=>{for(const m of marks)m.material.opacity=.6+Math.sin(tt*4)*.3;if(a.t>=a.limit){a.got=1;endAct(true);}};a.prize=[];a.winT="Sovine oči";},
  pingvin(a){const pts=[];for(let i=0;i<80&&pts.length<6;i++){const s=landSpot(FP.p.x,FP.p.z,4,15);if(!s)continue;if(pts.some(p=>Math.hypot(p.x-s.x,p.z-s.z)<3))continue;pts.push({x:s.x,y:s.y+.7,z:s.z});}
    if(pts.length<3){toast("Treba nam više mjesta za klizanje.",2400);return false;}addPickups(a,pts,"fish",1.3);a.limit=40;FP.spMul=1.9;FP.accMul=.28;FP.slide=true;say(a.en,"Lezi na trbuh i kliiizi! Wiii!",3500);
    a.tick=(dt,tt)=>{if(rida&&FP.ground)rida.g.rotation.x=-1.25;if(Math.hypot(FP.v.x,FP.v.z)>3&&Math.random()<dt*20)burst(FP.p.x,FP.p.y+.1,FP.p.z,1,[[1,1,1],[.85,.93,1]],.4,.3,.5);tickPickups(a,dt,tt);};
    a.end=()=>{if(rida)rida.g.rotation.x=0;};a.prize=[["riba",3]];a.winT="Prava klizačica!";},
  zaba(a){const wet=(x,z)=>{const ty=topY(Math.floor(x)+.5,Math.floor(z)+.5);return ty>=0&&ty<WATER-.5;};let pads=[];
    for(let att=0;att<16&&pads.length<6;att++){let start=null,dir=0;const a0=Math.random()*Math.PI*2;
      for(let i=0;i<24&&!start;i++){const ang=a0+i/24*Math.PI*2;for(let r=1;r<15;r++){const x=FP.p.x+Math.sin(ang)*r,z=FP.p.z+Math.cos(ang)*r;if(wet(x,z)&&topY(x,z)<WATER-1){start={x,z};dir=ang;break;}}}
      if(!start)break;const pp=[];let x=start.x,z=start.z,d=dir;pp.push({cx:Math.floor(x),cz:Math.floor(z)});
      for(let i=0;i<14&&pp.length<8;i++){let ok=false;for(const off of [0,.45,-.45,.9,-.9,1.4,-1.4]){const dd=d+off+(Math.random()-.5)*.3,nx=x+Math.sin(dd)*2.6,nz=z+Math.cos(dd)*2.6;const cx=Math.floor(nx),cz=Math.floor(nz);
        if(wet(nx,nz)&&!pp.some(p=>Math.abs(p.cx-cx)<2&&Math.abs(p.cz-cz)<2)){x=nx;z=nz;d=dd;pp.push({cx,cz});ok=true;break;}}if(!ok)break;}
      if(pp.length>pads.length)pads=pp;}
    if(!pads.length){toast("Kvakica treba vodu u blizini. Priđi jezeru ili moru!",2800);return false;}
    if(pads.length<4){toast("Ovdje nema dovoljno vode za lopoče.",2400);return false;}
    const Y=Math.floor(WATER);const lm=std(0x4aa83a,{flatShading:true}),fm=std(0xffb6d8);const pts=[];
    for(const p of pads){XSOLID.add(p.cx+","+Y+","+p.cz);const g=new THREE.Group();const m=new THREE.Mesh(new THREE.CylinderGeometry(.62,.66,.16,14,1,false,0,Math.PI*1.82),lm);g.add(m);const f=new THREE.Mesh(new THREE.ConeGeometry(.14,.2,6),fm);f.position.set(.22,.16,.1);g.add(f);g.position.set(p.cx+.5,Y+.92,p.cz+.5);actGroup.add(g);pts.push({x:p.cx+.5,y:Y+2.2,z:p.cz+.5});}
    addPickups(a,pts,"fly",1.2);a.limit=70;say(a.en,"Kvak-kvak! Skači s lopoča na lopoč!",3500);a.tick=(dt,tt)=>tickPickups(a,dt,tt);a.prize=[["s_svjetlo",1]];a.winT="Krijesnice svijetle za tebe!";},
  panda(a){a.need=3;a.round=0;a.limit=0;a.label=()=>"Pronađena: "+a.got+" / 3 · "+(a.heat||"");const en=a.en;
    a.hide=()=>{let s=null;for(let i=0;i<80&&!s;i++){const q=landSpot(FP.p.x,FP.p.z,9,20);if(!q)continue;const near=[[1,0],[-1,0],[0,1],[0,-1]].some(o=>{const t=get(Math.floor(q.x)+o[0],Math.floor(q.y),Math.floor(q.z)+o[1]);return t&&!TYPES[t].water;});const leafUp=TYPES[get(Math.floor(q.x),Math.floor(q.y)+2,Math.floor(q.z))||0];if(near||(leafUp&&leafUp.leaf)||i>50)s=q;}
      if(!s){s=landSpot(FP.p.x,FP.p.z,6,14)||{x:FP.p.x+5,y:FP.p.y,z:FP.p.z};}en.x=s.x;en.z=s.z;en.y=s.y;en.frozen=true;en.g.position.set(s.x,s.y-.25,s.z);en.g.rotation.y=Math.random()*6.28;a.gig=1.5;burst(en.x,en.y+.5,en.z,18,[[1,.6,.4],[1,1,1]],1,1,.5);};
    a.hide();say(rida,"Mimi se sakrila! Prati Toplo i Hladno.",3000);
    a.tick=(dt,tt)=>{const d=Math.hypot(en.x-FP.p.x,en.z-FP.p.z);a.heat=d<4?"Vruće! 🔥":d<8?"Toplo":d<14?"Mlako":"Hladno ❄";$("actN").innerHTML=a.label();en.g.position.y=en.y-.25+Math.max(0,Math.sin(tt*1.3))*.18;
      a.gig-=dt;if(a.gig<=0){a.gig=3.2;const v=Math.max(.006,.05-d*.002);[1250,1480,1250].forEach((f,i)=>tone(f-d*12,.06,"triangle",v,i*.09));}
      if(d<1.7&&Math.abs(en.y-FP.p.y)<2.5){a.got++;actHud();sfx.fanfare();en.celebrate=1;burst(en.x,en.y+.8,en.z,30,[[1,.6,.4],[1,1,.6]],2,2,.8);if(a.got>=a.need){en.frozen=false;endAct(true);return;}say(en,"Našla si me! Ajmo opet!",2000);a.round++;a.wait=1.4;a.tick2=true;a.hideT=1.4;}
      if(a.hideT){a.hideT-=dt;if(a.hideT<=0){a.hideT=0;a.hide();}}};
    a.end=()=>{en.frozen=false;};a.prize=[["bobice",3]];a.winT="Majstorica skrivača!";}};
/* the parrot's questions come from the girl's own diary: quotes from her books, and chapters of the Great Book */
function parrotQs(){const out=[];const books=S.books.filter(b=>b.title);const quotes=[];books.forEach(b=>(b.quotes||[]).forEach(q=>quotes.push({t:q.t,b})));
  shuffleR(quotes).slice(0,2).forEach(q=>{const others=shuffleR(books.filter(b=>b!==q.b)).slice(0,2).map(b=>b.title);if(others.length)out.push({q:"„"+q.t+"“ Iz koje je knjige ova rečenica?",o:[q.b.title].concat(others)});});
  const chars=[];books.forEach(b=>(b.chars||[]).forEach(c=>chars.push({c,b})));shuffleR(chars).slice(0,1).forEach(x=>{const others=shuffleR(books.filter(b=>b!==x.b)).slice(0,2).map(b=>b.title);if(others.length)out.push({q:"U kojoj knjizi je lik "+x.c.n+"?",o:[x.b.title].concat(others)});});
  if(S.quest&&S.quest.got&&S.quest.got.length>=2){const got=S.quest.got.slice();const i=got[Math.floor(Math.random()*got.length)];const others=shuffleR(QPAGES.filter((p,j)=>j!==i)).slice(0,2).map(p=>p.title);out.push({q:"Kako se zove "+(i+1)+". poglavlje Velike knjige?",o:[QPAGES[i].title].concat(others)});}
  const rd=shuffleR(RIDDLES.slice());while(out.length<3&&rd.length){const r=rd.pop();out.push({q:r[0],o:r[1].slice()});}return out.slice(0,3);}
function parrotAsk(a){if(ACT!==a)return;const q=a.qs[a.qi];if(!q){if(a.score>=2)endAct(true);else{a.loseT="Rio kaže: skoro! Probaj opet, pitanja se mijenjaju.";endAct(false);}return;}actHud();
  openSheet('<div class="anh"><img alt="" src="'+portrait("papiga")+'"><div><h2>Papigin kviz</h2><p class="muted">Pitanje '+(a.qi+1)+' od '+a.need+' · Točno: '+a.score+'</p></div></div><div class="pzq">'+esc(q.q)+'</div><div class="pzopts">'+shuffleR(q.o.slice()).map(o=>'<button class="btn soft" data-o="'+esc(o)+'">'+esc(o)+'</button>').join("")+'</div><p class="pzmsg" id="pqMsg"></p>',()=>{if(ACT===a&&!a.answering)endAct(false,true);});
  $("sheetBody").querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{if(a.answering)return;a.answering=true;const ok=b.dataset.o===q.o[0];if(ok){a.score++;a.got=a.score;b.classList.add("ok");sfx.chime();$("pqMsg").textContent="Točno! Rio pjeva od sreće!";}
    else{b.classList.add("shake");sfx.click();$("pqMsg").textContent="Nije. Točan odgovor: "+q.o[0];}
    setTimeout(()=>{a.answering=false;a.qi++;if(a.qi>=a.need){a.answering=true;closeSheet();a.answering=false;if(a.score>=2)endAct(true);else{a.loseT="Rio kaže: skoro! Probaj opet, pitanja se mijenjaju.";endAct(false);}}else parrotAsk(a);},1300);});}

/* ---- RIDING ---- */
function mountUp(k){if(!FP.on)return;const R=RIDES[k];const en=petEnt(k);if(!R||!en)return;if(ACT)endAct(false,true);if(FP.mount)dismount();
  if(R.water&&!FP.swim&&!FP.boat){toast(petName(k)+" pliva samo u vodi. Uđi u more i pritisni gumb Dozovi"+(PAD.on?" (ili Y)":"")+"!",3400);return;}
  if(FP.boat){FP.boat=false;FP.boatPark=FP.p.clone();FP.boatPark.y=WATER-.2;}
  FP.mount=Object.assign({k,en},R);en.frozen=true;en.goto=null;en.tx=null;if(R.scale)en.g.scale.setScalar(R.scale);
  const P=FP.p;if(!R.water){en.x=P.x;en.z=P.z;}sfx.fanfare();burst(P.x,P.y+.8,P.z,30,[[1,.85,.3],[1,1,1]],2,2,.7);if(typeof padRumble==="function"&&PAD.on)padRumble(200,.5,.4);
  S.play=S.play||{};if(S.play[k]!==today()){FP.mount.reward=true;FP.mount.dist=0;}
  toast((R.air?"Iskra širi krila! Skok je gore, Roni je dolje.":R.water?"Jašeš na "+(k==="dupin"?"Plavku":"Polki")+"! "+(R.leap?"Na površini pritisni Skok za skok preko valova.":"Pod vodom možeš ostati koliko želiš."):"Juhu! "+(R.dbl?"Luna može skočiti dvaput u zraku.":"Dina juri preko otoka."))+" Za silazak: gumb Siđi"+(PAD.on?" ili Y":"")+".",4600);fpStat();}
function dismount(){const M=FP.mount;if(!M)return;FP.mount=null;const en=M.en;en.g.traverse(o=>{if(o.isMesh&&o.material&&o.userData.fm){o.material.transparent=false;o.material.opacity=1;o.material.depthWrite=true;}});rida.fadeA=null;en.frozen=false;if(M.scale)en.g.scale.setScalar(zmajScale());
  const P=FP.p;const sw=!!M.water&&!M.land;let placed=false;for(let r=1.2;r<7&&!placed;r+=.8)for(let a=0;a<6.28&&!placed;a+=.5){const x=P.x+Math.sin(FP.yaw+Math.PI+a)*r,z=P.z+Math.cos(FP.yaw+Math.PI+a)*r;const y=walkable(x,z,sw);if(y!=null){en.x=x;en.z=z;en.y=y;placed=true;}}
  if(!placed){en.x=P.x;en.z=P.z;en.y=P.y;}
  en.g.rotation.set(0,FP.yaw,0);if(rida)rida.g.rotation.x=0;sfx.pop();fpStat();
  if(M.reward&&M.dist>40){playReward(M.k,[],"Super vožnja!");}else if(M.reward)toast("Jašite još malo za današnju nagradu!",2200);}
/* in the sea, a water friend can be called with a whistle */
function waterFriend(){if(FP.mount||!(FP.swim||FP.boat)||ACT)return null;for(const k of ["dupin","kornjaca"]){if(!S.met[k]&&!(k==="kornjaca"&&petEnt(k)))continue;if(!petEnt(k))continue;if(petInfo(k).h<2&&k!=="dupin")continue;return k;}return null;}
function callWater(k){k=k||waterFriend();if(!k)return;const en=petEnt(k);const P=FP.p;const a=FP.cam.yaw+Math.PI;en.x=P.x+Math.sin(a)*1.6;en.z=P.z+Math.cos(a)*1.6;en.y=WATER-.6;en.g.position.set(en.x,en.y,en.z);
  tone(880,.12,"sine",.04);tone(1175,.16,"sine",.04,.12);burst(en.x,WATER,en.z,24,[[.7,.9,1],[1,1,1]],2,2.5,.8);mountUp(k);}
$("fpOff").onclick=()=>{sfx.click();if(FP.mount)dismount();else callWater();};
{const _fpStat=fpStat;fpStat=function(){_fpStat();const mo=$("fpOff");if(!mo)return;const wf=FP.mount?null:waterFriend();const lab=FP.mount?"Siđi":wf?"Dozovi":"";if(mo.textContent!==lab&&lab)mo.textContent=lab;mo.hidden=!lab;};}
function tickMount(dt,tt){const M=FP.mount;if(!M)return;if(!FP.on){FP.mount=null;M.en.frozen=false;return;}const en=M.en,P=FP.p,g=en.g;
  const hs=Math.hypot(FP.v.x,FP.v.z);M.dist=(M.dist||0)+hs*dt;
  if(M.land&&!M.air&&FP.swim){toast(petName(M.k)+" ne pliva. Sišla si na obalu.",2400);dismount();return;}
  if(M.water&&!M.land&&!FP.swim&&FP.ground){dismount();return;}
  if(M.reward&&M.dist>40&&!M.told){M.told=1;toast("Odlično jašete! Siđi kad želiš i uzmi nagradu.",2600);}
  en.x=P.x;en.y=P.y;en.z=P.z;const air=M.air&&!FP.ground;const bank=air?Math.max(-.4,Math.min(.4,(M.lastYaw!=null?M.lastYaw-FP.yaw:0)*8)):0;M.lastYaw=FP.yaw;
  const water=M.water&&FP.swim;g.position.set(P.x,P.y+(water?-.25:air?.05:0)+(air?Math.sin(tt*2.5)*.12:0),P.z);g.rotation.set(water?-FP.v.y*.06:air?-FP.v.y*.05:0,FP.yaw,bank);
  M.bob=air?Math.sin(tt*2.5)*.12:water?-.25:hs>1&&FP.ground?Math.abs(Math.sin(tt*hs*1.6))*.12:0;M.tilt=g.rotation.x;
  const p=g.userData.parts;const sw=hs>.5&&FP.ground?Math.sin(tt*hs*2.2)*.8:0;if(p.l0){p.l0.rotation.x=sw;p.l3.rotation.x=sw;p.l1.rotation.x=-sw;p.l2.rotation.x=-sw;if(air){[p.l0,p.l1,p.l2,p.l3].forEach(l=>l.rotation.x=.9);}}
  if(p.wl){const f=air?Math.sin(tt*9)*.8:Math.sin(tt*2)*.15;p.wl.rotation.z=f;p.wr.rotation.z=-f;}if(p.tail){p.tail.rotation.y=Math.sin(tt*(water?6:4))*.5;}
  if(M.trail&&hs>3&&Math.random()<dt*40){const c=[[1,.5,.6],[1,.8,.4],[1,1,.5],[.5,1,.6],[.5,.8,1],[.8,.6,1]][Math.floor(tt*12)%6];burst(P.x-Math.sin(FP.yaw)*.9,P.y+.7,P.z-Math.cos(FP.yaw)*.9,2,[c],.2,.3,1.1,0);}
  if(air&&Math.random()<dt*10)burst(P.x-Math.sin(FP.yaw)*1.2,P.y+.4,P.z-Math.cos(FP.yaw)*1.2,1,[[1,.85,.5],[.7,1,.9]],.3,.2,.8,0);
  if(water&&hs>3&&Math.random()<dt*14)burst(P.x,WATER+.05,P.z,2,[[1,1,1],[.8,.93,1]],.6,.8,.6);}

/* ---- the dolphin: met in the open sea ---- */
function tickDolphinMeet(dt){if(S.met.dupin||!FP.on||!(FP.swim||FP.boat))return;const j=life.jump;if(!j)return;const d=Math.hypot(j.x-FP.p.x,j.z-FP.p.z);if(d>16)return;
  S.met.dupin=today();petInfo("dupin");save();const e=spawnNewPet("dupin");sfx.fanfare();setTimeout(()=>rewardReveal({kicker:"Novi prijatelj!",title:"Dupin Plavko",portrait:portrait("dupin"),items:[{ic:thingIcon("riba"),n:"Voli ribu",cnt:0,rar:"r"},{ic:itemIcon("heart"),n:"Može te nositi morem",cnt:0,rar:"l"}],
    sub:"Plavko je doplivao do Ride! Nahrani ga ribom i postat ćete prijatelji. S 2 srca možeš jahati na njemu.",ok:"Bok, Plavko!"}),400);}
function spawnNewPet(k){let e=petEnt(k);if(e)return e;const P=FP.on?FP.p:{x:CX,z:CZ};
  if(k==="dupin"){e=spawn("dupin",PETS.dupin.n,{swim:true,speed:2.2,near:{x:P.x,z:P.z}});}
  else if(k==="panda"){e=spawn("panda",PETS.panda.n,{speed:1.3,near:MARKET.spot?{x:MARKET.spot.x,z:MARKET.spot.z}:null});}
  else if(k==="konjic"){e=spawn("konjic",PETS.konjic.n,{speed:1.5,near:GARDEN.fr?{x:GARDEN.fr.at(0,0)[0],z:GARDEN.fr.at(0,0)[1]}:null});}
  else if(k==="zmaj"){e=spawn("zmaj",PETS.zmaj.n,{speed:1.6,near:{x:LIB.x+.5,z:LIB.z+8}});e.g.scale.setScalar(zmajScale());}
  return e;}
const zmajScale=()=>1.3;

/* ---- the dragon egg: hidden in the crystal cavern, hatched by reading ---- */
const EGG_N=40;let eggObj=null,nestObj=null;
function makeEgg(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(.36,16,12),new THREE.MeshStandardMaterial({color:0x6ad8c0,roughness:.35,metalness:.1,emissive:0x1a6050,emissiveIntensity:.5}));m.scale.y=1.3;m.position.y=.46;g.add(m);
  for(let i=0;i<7;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.07,8,6),std(0xb07af0,{emissive:LC(0x5a2aa0),emissiveIntensity:.6}));const a=i*2.4,h=.2+i*.09;s.position.set(Math.cos(a)*.33*Math.sin(h*3),h+.12,Math.sin(a)*.33*Math.sin(h*3));g.add(s);}
  const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x7af0d0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7}));gl.scale.set(2.2,2.2,1);gl.position.y=.5;g.add(gl);g.userData.egg=m;return g;}
function eggSpot(){const c=CAVE.cavern;if(!c)return {x:LIB.x+14.5,y:topY(LIB.x+14,LIB.z+3)+1,z:LIB.z+3.5};for(let r=2;r<7;r++)for(let a=0;a<6.28;a+=.5){const x=Math.floor(c.x+Math.cos(a)*r),z=Math.floor(c.z+Math.sin(a)*r);const y=floorBelow(x,c.y+2,z);if(y!=null&&y>0&&!get(x,y+1,z)&&!get(x,y+2,z))return {x:x+.5,y:y+1,z:z+.5};}return {x:c.x+.5,y:c.y,z:c.z+.5};}
function nestSpot(){const x=LIB.x+4,z=LIB.z+7;return {x:x+.5,y:topY(x,z)+1,z:z+.5};}
function buildEgg(){if(eggObj){scene.remove(eggObj);tapObjs.splice(tapObjs.indexOf(eggObj),1);eggObj=null;}if(nestObj){scene.remove(nestObj);tapObjs.splice(tapObjs.indexOf(nestObj),1);nestObj=null;}
  if(S.met.zmaj)return;if(!S.egg){const s=eggSpot();eggObj=makeEgg();eggObj.position.set(s.x,s.y,s.z);scene.add(eggObj);eggObj.userData.onTap=takeEgg;tapObjs.push(eggObj);return;}
  const s=nestSpot();nestObj=new THREE.Group();const nm=std(0xb08850);for(let i=0;i<14;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.7,.12,.12),nm);b.position.set(Math.cos(i/14*6.28)*.42,.1+(i%2)*.06,Math.sin(i/14*6.28)*.42);b.rotation.y=-i/14*6.28;nestObj.add(b);}
  const egg=makeEgg();egg.position.y=.05;nestObj.add(egg);nestObj.userData.eggG=egg;nestObj.position.set(s.x,s.y,s.z);scene.add(nestObj);nestObj.userData.onTap=()=>eggInfo();tapObjs.push(nestObj);}
function takeEgg(){S.egg={p0:S.xp,d:today()};save();buildEgg();sfx.fanfare();if(typeof padRumble==="function"&&PAD.on)padRumble(400,.7,.5);
  rewardReveal({kicker:"Tajanstveno jaje!",title:"Zmajevo jaje",chest:"magic",items:[{ic:itemIcon("egg"),n:"Zmajevo jaje",cnt:1,rar:"l"}],sub:"Jaje je toplo i lagano se miče. Rida ga je odnijela u gnijezdo kraj knjižnice. Treba mu toplina priča: pročitaj još "+EGG_N+" stranica i izleći će se!",ok:"Čuvat ću ga!"});}
function eggLeft(){return S.egg?Math.max(0,EGG_N-(S.xp-S.egg.p0)):EGG_N;}
function eggInfo(){const n=eggLeft();if(n<=0){hatchEgg();return;}openSheet('<div class="anh"><img alt="" src="'+itemIcon("egg")+'"><div><h2>Zmajevo jaje</h2><p class="muted">Jaje se grije svaki put kad čitaš.</p></div></div><span class="prog"><i style="width:'+Math.round(100*(EGG_N-n)/EGG_N)+'%;background:#6ad8c0"></i></span><p>Još <b>'+n+'</b> '+plural(n)+' do izlijeganja. Upiši pročitane stranice gumbom Čitala sam!</p><button class="btn big" id="egOk">U redu</button>');$("egOk").onclick=closeSheet;}
function hatchEgg(){if(S.met.zmaj)return;const s=nestSpot();S.met.zmaj=today();const I2=petInfo("zmaj");I2.h=2;S.egg.done=today();save();
  let k=0;const shake=setInterval(()=>{k++;if(nestObj&&nestObj.userData.eggG){nestObj.userData.eggG.rotation.z=Math.sin(k*1.7)*.25;}tone(300+k*30,.04,"square",.02);burst(s.x,s.y+.6,s.z,4,[[.6,1,.9],[1,1,1]],1,1,.5);
    if(k>22){clearInterval(shake);for(let i=0;i<5;i++)setTimeout(()=>burst(s.x,s.y+.8,s.z,40,[[.5,1,.85],[.8,.6,1],[1,.9,.4]],3,3.4,1.1),i*140);buildEgg();const e=spawnNewPet("zmaj");e.x=s.x;e.z=s.z+1;e.y=walkable(e.x,e.z,false)||s.y;e.celebrate=2;
      rewardReveal({kicker:"Izleglo se!",title:"Zmajić Iskra",portrait:portrait("zmaj"),items:[{ic:itemIcon("heart"),n:"Novi prijatelj",cnt:0,rar:"l"},{ic:thingIcon("kristal"),n:"Svijetli u mraku",cnt:0,rar:"e"},{ic:itemIcon("star"),n:"Leti s Ridom",cnt:0,rar:"l"}],
        sub:"Tvoje čitanje izleglo je pravog malog zmaja! Iskra može letjeti s Ridom iznad cijelog otoka.",ok:"Bok, Iskra!"});}},70);}
/* ---- buying friends at the market ---- */
function buyPet(k){const P=PETS[k];if(S.met[k])return;if(S.coins<P.price){toast("Treba ti "+P.price+" zlatnika. Prodaj plodove iz vrta ili otvori škrinju!",3000);sfx.click();return;}
  S.coins-=P.price;S.met[k]=today();const I2=petInfo(k);I2.h=Math.max(I2.h,2);save();renderEco();closeSheet();spawnNewPet(k);sfx.fanfare();
  rewardReveal({kicker:"Novi prijatelj!",title:P.n,portrait:portrait(k),items:[{ic:thingIcon(P.fav),n:"Voli: "+thingName(P.fav),cnt:0,rar:"r"},{ic:itemIcon("star"),n:SPEC[k].n,cnt:0,rar:"l"}],sub:P.d+" Čeka te kraj "+(k==="panda"?"tržnice":"vrta")+".",ok:"Jupi!"});}
const _sheetMarketA=sheetMarket;
sheetMarket=function(tab,keep){_sheetMarketA(tab,keep);if(tab!=="prijatelji")return;const box=$("sheetBody").querySelector(".pets");if(!box)return;
  const shop=NEWPETS.filter(k=>PETS[k].src==="buy");const html='<h3>Sjajkini posebni prijatelji</h3><div class="pets">'+shop.map(k=>{const P=PETS[k];const own=!!S.met[k];
      return '<div class="pet"><img class="pp" alt="" src="'+portrait(k)+'"><div class="pb"><b>'+esc(P.n)+'</b><small>'+esc(P.d)+'</small><small class="gold">'+esc(SPEC[k].n)+': '+esc(SPEC[k].d)+'</small></div><div class="pa">'+(own?'<button class="btn soft" data-anv="'+k+'">Pogledaj</button>':'<button class="btn '+(S.coins>=P.price?'green':'soft')+'" data-buyp="'+k+'">'+COIN_SVG+P.price+'</button>')+'</div></div>';}).join("")+'</div>'+
    '<h3>Prijatelji iz divljine</h3><div class="pets">'+["dupin","zmaj"].map(k=>{const P=PETS[k];if(S.met[k])return '<div class="pet"><img class="pp" alt="" src="'+portrait(k)+'"><div class="pb"><b>'+esc(P.n)+'</b>'+heartsHTML(petInfo(k).h)+'<small>'+esc(SPEC[k].n)+'</small></div><div class="pa"><button class="btn soft" data-anv="'+k+'">Pogledaj</button></div></div>';
      return '<div class="pet locked"><div class="pp">?</div><div><b>???</b><small>'+(k==="dupin"?"Skače u otvorenom moru. Doplivaj ili doplovi blizu dok skače!":S.egg?"Jaje u gnijezdu kraj knjižnice. Još "+eggLeft()+" "+plural(eggLeft())+" čitanja!":"U kristalnoj špilji nešto tajanstveno svijetli...")+'</small></div></div>';}).join("")+'</div><h3>Prijatelji s otoka</h3>';
  box.insertAdjacentHTML("beforebegin",html);$("sheetBody").querySelectorAll("[data-buyp]").forEach(b=>b.onclick=()=>buyPet(b.dataset.buyp));$("sheetBody").querySelectorAll("[data-anv]").forEach(b=>b.onclick=()=>sheetAnimal(b.dataset.anv));
  box.querySelectorAll(".pet:not(.locked)").forEach((row,i)=>{});};
/* best friends follow from 3 hearts now */
/* ---- per-frame ---- */
let eggChk=0;
function tickAnimals2(dt,tt){tickMount(dt,tt);tickDolphinMeet(dt);
  if(ACT){ACT.t+=dt;if(ACT.limit&&ACT.t>=ACT.limit&&ACT.k!=="sova"){endAct(false);}else if(ACT.tick)ACT.tick(dt,tt);if(ACT&&ACT.limit)actHud();if(ACT&&!FP.on)endAct(false,true);}
  if(eggObj){eggObj.rotation.y+=dt*.5;eggObj.position.y+=Math.sin(tt*2)*.002;if(FP.on&&Math.hypot(FP.p.x-eggObj.position.x,FP.p.z-eggObj.position.z)<1.6&&Math.abs(FP.p.y-eggObj.position.y)<2)takeEgg();}
  if(nestObj&&nestObj.userData.eggG){const left=eggLeft();const k=1-left/EGG_N;nestObj.userData.eggG.rotation.z=Math.sin(tt*(2+k*8))*(.03+k*.12);if(left<=0&&Math.random()<dt*2)burst(nestObj.position.x,nestObj.position.y+.7,nestObj.position.z,2,[[.6,1,.9]],.5,.6,.6);}
  eggChk-=dt;if(eggChk<=0){eggChk=2;if(S.egg&&!S.met.zmaj&&eggLeft()<=0&&!S.egg.ready){S.egg.ready=1;save();toast("Zmajevo jaje se miče! Dodirni gnijezdo kraj knjižnice!",5000);}}
  const z=petEnt("zmaj");if(z&&!(FP.mount&&FP.mount.k==="zmaj")){const p=z.g.userData.parts;if(p.wl){const f=Math.sin(tt*6)*.5;p.wl.rotation.z=f;p.wr.rotation.z=-f;}z.g.position.y+=.35+Math.sin(tt*2.2)*.15;}
  const d=petEnt("dupin");if(d&&!(FP.mount&&FP.mount.k==="dupin")){d.g.position.y-=.25;if(d.g.userData.parts.tail)d.g.userData.parts.tail.rotation.x=Math.sin(tt*5)*.4;}}
function animalsInit(){S.play=S.play||{};if(WORLD)return;for(const k of NEWPETS){if(S.met[k])spawnNewPet(k);}buildEgg();
  if(typeof hatchEgg==="function"&&S.egg&&!S.met.zmaj&&eggLeft()<=0)S.egg.ready=1;}
/* companions from 3 hearts */
const _tickCompA=tickCompanion;tickCompanion=function(dt){if(S.pet&&(FP.mount||ACT))return;_tickCompA(dt);};
