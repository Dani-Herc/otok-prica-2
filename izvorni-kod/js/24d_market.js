/* =================== THE MARKET, THE WARDROBE AND ANIMAL FRIENDS =================== */
/* ---- the stall: striped awning, a counter with gourds, a wall of books, and Sjajka the magpie on the counter ---- */
const MARKET={};
function placeMarket(){const st=SITES.trznica,fr=siteFrame(st),h=st.h;MARKET.fr=fr;
  for(let v=-2;v<=3;v++)for(let u=-3;u<=3;u++){const [x,z]=fr.at(u,v);for(let y=h;y<h+6;y++)vox[I(x,y,z)]=0;vox[I(x,h-1,z)]=T.kaldrma;}
  const set=(u,v,y,t)=>{const [x,z]=fr.at(u,v);vox[I(x,h+y,z)]=t;};
  for(const u of [-3,3])for(const v of [-2,2])for(let y=0;y<3;y++)set(u,v,y,T.drvo);
  for(let v=-2;v<=2;v++)for(let u=-3;u<=3;u++)set(u,v,3,(u+3)%2?T.vuna_b:T.vuna_c);
  for(let u=-3;u<=3;u++)set(u,3,2,(u+3)%2?T.vuna_b:T.vuna_c);
  for(let u=-2;u<=2;u++)set(u,1,0,Math.abs(u)===2?T.bacva:T.sdaske);
  set(-2,1,1,T.bundeva);set(2,1,1,T.lubenica);
  for(let u=-2;u<=2;u++){set(u,-2,0,T.polica2);if(Math.abs(u)<2)set(u,-2,1,T.polica2);}
  set(0,-1,2,T.lampion);
  set(4,2,0,T.bacva);set(4,1,0,T.sijeno);set(-4,1,0,T.bacva);set(-4,2,0,T.bacva);set(-4,2,1,T.vuna_z);
  set(1,1,1,T.bacva);const [cx,cz]=fr.at(1,1);MARKET.spot={x:cx+.5,y:h+2,z:cz+.5,ry:Math.atan2(fr.F[0],fr.F[1])};
  POI.push({k:"trznica",n:"Tržnica",x:st.x+.5,z:st.z+.5,r:7});}
/* ---- new animals that live on the far isles ---- */
MODELS.pingvin=function(){const K=0x22242c,Wt=0xf6f4ee,O=0xf29a1e,hd={name:"head",px:0,py:.66,pz:0},wl={name:"wl",px:-.2,py:.6,pz:0},wr={name:"wr",px:.2,py:.6,pz:0};
  return mk([[.4,.55,.36,0,.38,0,K],[.3,.42,.06,0,.36,.18,Wt],[.32,.28,.3,0,.8,.02,K,hd],[.24,.16,.04,0,.78,.17,Wt,hd],[.08,.06,.14,0,.76,.24,O,hd],[.04,.05,.02,-.07,.83,.18,K,hd],[.04,.05,.02,.07,.83,.18,K,hd],
    [.06,.34,.2,-.23,.42,0,K,wl],[.06,.34,.2,.23,.42,0,K,wr],[.12,.04,.18,-.09,.03,.08,O],[.12,.04,.18,.09,.03,.08,O]]);};
MODELS.zaba=function(){const G=0x5aa83a,L=0xb8e07a,Wt=0xffffff,K=0x1c1c1c,hd={name:"head",px:0,py:.24,pz:.12};
  return mk([[.44,.22,.42,0,.16,0,G],[.36,.06,.34,0,.06,.02,L],[.4,.16,.24,0,.3,.16,G,hd],[.13,.13,.13,-.12,.42,.18,G,hd],[.13,.13,.13,.12,.42,.18,G,hd],[.09,.09,.02,-.12,.43,.25,Wt,hd],[.09,.09,.02,.12,.43,.25,Wt,hd],
    [.04,.06,.01,-.12,.43,.262,K,hd],[.04,.06,.01,.12,.43,.262,K,hd],[.28,.02,.01,0,.25,.285,0x2e5a1e,hd],[.14,.08,.28,-.25,.06,-.1,G],[.14,.08,.28,.25,.06,-.1,G],[.08,.12,.08,-.16,.06,.18,G],[.08,.12,.08,.16,.06,.18,G]]);};
MODELS.deva=function(){const Tn=0xd8a868,T2=0xc89050,R=0xc8403a,Gd=0xffc53d,K=0x2a2018,hd={name:"head",px:0,py:1.3,pz:.5};
  return mk([[.5,.42,.9,0,.95,0,Tn],[.34,.26,.38,0,1.27,-.08,T2],[.52,.04,.46,0,1.17,.22,R],[.54,.05,.06,0,1.15,.45,Gd],[.18,.5,.18,0,1.25,.5,Tn,hd],[.24,.22,.4,0,1.55,.62,Tn,hd],[.06,.1,.04,-.08,1.7,.5,T2,hd],[.06,.1,.04,.08,1.7,.5,T2,hd],
    [.04,.05,.02,-.1,1.6,.82,K,hd],[.04,.05,.02,.1,1.6,.82,K,hd],[.14,.06,.04,0,1.48,.83,T2,hd]].concat(legs(.13,.75,.18,.32,Tn,.75)));};
/* ---- friends: favourite food, what a best friend brings every day ---- */
const PETS={
  zec:{fav:"mrkva",gd:"Svaki dan donese malo sjemena.",gift:()=>[[["s_mrkva","s_krumpir","s_cikla"][Math.floor(Math.random()*3)],2]]},
  patka:{fav:"cikla",gd:"Roni po jezeru i nađe bisere ili ribu.",gift:()=>Math.random()<.45?[["biser",1]]:[["riba",2]],stay:"Kvaki voli vodu pa ostaje na jezeru."},
  jez:{fav:"bobice",gd:"U grmlju nađe bobice.",gift:()=>[["bobice",3],["s_bobice",1]]},
  ovca:{fav:"bundeva",gd:"Daje mekanu bijelu vunu.",gift:()=>[["vuna_b",3]]},
  kornjaca:{fav:"lubenica",gd:"Donosi blago s grebena.",gift:()=>[[["koralj_p","koralj_r","koralj_z","koralj_c","koralj_l"][Math.floor(Math.random()*5)],2],["prizmarin",2]]},
  macka:{fav:"riba",gd:"Nađe zlatnike koje je vjetar raznio.",gift:()=>[["coins",10]]},
  papiga:{fav:"krumpir",gd:"S dalekih otoka donosi sjajno kamenje.",gift:()=>Math.random()<.35?[["smaragd",1]]:[["grumen",2]]},
  sova:{fav:"svjetlocvijet",gd:"Šapne gdje se krije neotvorena škrinja.",gift:()=>[["hint",1]],stay:"Mudrica čuva knjižnicu i ne napušta je."},
  pingvin:{fav:"riba",isle:"snijeg",n:"Pingvin Pipo",d:"Klizi po ledu i skuplja sjajne stvari.",gd:"Nađe biser ili donese led i snijeg.",gift:()=>Math.random()<.4?[["biser",1]]:[["led",4],["snijeg",4]]},
  zaba:{fav:"bobice",isle:"tresnja",n:"Žaba Kvakica",d:"Pjeva uz ribnjak kad padne mrak.",gd:"Ponekad nađe čarobno sjeme.",gift:()=>Math.random()<.3?[["s_svjetlo",1]]:[[["s_mrkva","s_cikla","s_bobice"][Math.floor(Math.random()*3)],2]]},
  deva:{fav:"mrkva",isle:"pustinja",n:"Deva Dina",d:"Zna sve putove kroz pijesak.",gd:"Iz pustinje donosi zlatne grumene.",gift:()=>[["grumen",2],["pjescenjak",6]]}};
/* accusative for short item names: "volim mrkvu", "tražim biser" */
const accName=k=>{const n=thingName(k).toLowerCase();return /\s/.test(n)?n:n.replace(/a$/,"u");};
const FOODS=["mrkva","krumpir","cikla","bobice","riba","svjetlocvijet","bundeva","lubenica"];
const petName=k=>PETS[k]&&PETS[k].n||((VISITORS.find(v=>v.k===k)||{}).n)||k;
const petInfo=k=>(S.pets[k]||(S.pets[k]={h:0,fed:"",gift:""}));
const isleEnts={};
function spawnIsleAnimals(){for(const k in PETS){const P=PETS[k];if(!P.isle||isleEnts[k])continue;const s=ISLES.find(q=>q.k===P.isle);if(!s)continue;
    const e=spawn(k,P.n,{near:{x:s.x,z:s.z},speed:k==="pingvin"?.7:k==="deva"?.9:1.2});e.home={x:s.x,z:s.z,r:s.r};isleEnts[k]=e;}}
/* keep isle animals on their island while they are not following Rida */
function keepHome(e){if(!e.home||S.pet===e.kind)return;const d=Math.hypot(e.x-e.home.x,e.z-e.home.z);if(d>e.home.r+2&&e.tx!=null){const a=Math.atan2(e.home.z-e.z,e.home.x-e.x);e.tx=e.x+Math.cos(a)*3;e.tz=e.z+Math.sin(a)*3;}}
function feedPet(k,food,en){const P=PETS[k],I2=petInfo(k);if(I2.fed===today())return "fed";if(!haveN(food))return "none";
  giveN(food,-1);I2.fed=today();const add=food===P.fav?2:1;const was=I2.h;I2.h=Math.min(5,I2.h+add);bump("feed",1);save();
  if(en){en.celebrate=1.2;burst(en.x,en.y+.9,en.z,24,[[1,.45,.6],[1,.8,.9],[1,1,1]],1.6,2,.8);}
  sfx.chime();if(I2.h===5&&was<5){setTimeout(()=>{sfx.fanfare();toast(petName(k)+" ti je sada najbolji prijatelj! Svaki dan ima dar za tebe"+(P.stay?".":", a može i pratiti Ridu u istraživanju."),5200);},700);}
  return add;}
function claimGift(k,en){const P=PETS[k],I2=petInfo(k);if(I2.h<5||I2.gift===today())return null;I2.gift=today();const got=P.gift();const lines=[];
  for(const [it,n] of got){if(it==="coins"){S.coins+=n;lines.push("+"+n+" zlatnika");}else if(it==="hint"){const c=markHint();lines.push(c?"Sova ti je na karti označila škrinju!":"Sve škrinje su otvorene. Sova ti daje čarobno sjeme.");if(!c)giveN("s_svjetlo",1);}else{giveN(it,n);lines.push("+"+n+" "+thingName(it));}}
  if(en){en.celebrate=1;burst(en.x,en.y+1,en.z,30,[[1,.85,.3],[1,1,1]],2,2,.9);}sfx.fanfare();save();renderEco();return lines;}
/* tapping an animal in the world: meet it, feed it, take its gift */
function animalTap(en,explore){const k=en.kind,P=PETS[k];if(!P)return false;const I2=petInfo(k);bump("greet",1);
  if(P.isle&&!S.met[k]){S.met[k]=today();save();sfx.fanfare();en.celebrate=1.2;say(en,"Bok! Ja sam "+P.n+". "+P.d,6000);toast("Novi prijatelj: "+P.n+"! Voli "+accName(P.fav)+".",4200);return true;}
  if(I2.h>=5&&I2.gift!==today()){const l=claimGift(k,en);say(en,"Ovo je za tebe!",3500);toast(petName(k)+": "+l.join(", "),4200);return true;}
  if(I2.fed!==today()){const food=haveN(P.fav)?P.fav:FOODS.find(f=>haveN(f));
    if(food){const r=feedPet(k,food,en);say(en,r===2?"Njam! To mi je najdraža hrana!":"Njam, hvala!",3800);miniPop(thingIcon(food),"Prijateljstvo +"+r+" ♥");return true;}
    say(en,"Najviše volim "+accName(P.fav)+". Potraži u vrtu ili na tržnici!",5000);return true;}
  say(en,(I2.h>=5?"Sutra imam novi dar za tebe!":"Hvala za hranu! Vidimo se sutra.")+" "+"♥".repeat(I2.h),4000);return true;}
/* ---- a best friend can walk with Rida while she explores ---- */
function tickCompanion(dt){if(!FP.on||!S.pet)return;const en=ents.find(e=>e.kind===S.pet);if(!en)return;const P=FP.p;const d=Math.hypot(en.x-P.x,en.z-P.z);
  if(d>18||Math.abs(en.y-P.y)>6){for(let i=0;i<12;i++){const a=FP.yaw+Math.PI+(Math.random()-.5)*1.6,r=1.6+Math.random()*1.5;const x=P.x+Math.sin(a)*r,z=P.z+Math.cos(a)*r;const y=walkable(x,z,en.swim);if(y!=null&&Math.abs(y-P.y)<2.5){en.x=x;en.z=z;en.y=y;en.goto=null;en.tx=null;break;}}return;}
  if(d>2.4){const bx=P.x-Math.sin(FP.yaw)*1.5,bz=P.z-Math.cos(FP.yaw)*1.5;en.goto={x:bx,z:bz,force:true};en.speed=Math.max(en.speed,d>6?3.4:2.2);}else if(en.goto&&d<1.6){en.goto=null;en.tx=null;}}
/* ---- portraits: the real 3D models, rendered once into small pictures ---- */
const portraitC={};
function portrait(kind){return snapModel("p:"+kind,()=>kind==="sjajka"?makeMagpie():MODELS[kind](),kind==="sjajka"?1.05:.55);}
function costumeIcon(c){return snapModel("c:"+c.k,()=>c.slot==="glava"?hatMesh(c.k):costumeMesh(c.k),c.slot==="ledja"?2.6:.5,1.6);}
function snapModel(key,make,ry,fill){if(portraitC[key]!=null)return portraitC[key];try{const sc=new THREE.Scene();sc.add(new THREE.HemisphereLight(0xffffff,0x8a7a6a,1.1));const dl=new THREE.DirectionalLight(0xffffff,1.3);dl.position.set(2,3,4);sc.add(dl);
    const g=make();if(!g)return portraitC[key]="";sc.add(g);g.rotation.y=ry;g.updateMatrixWorld(true);const box=new THREE.Box3().setFromObject(g);const ctr=box.getCenter(new THREE.Vector3()),sz=box.getSize(new THREE.Vector3());
    const cam=new THREE.PerspectiveCamera(30,1,.05,50);const dist=Math.max(sz.x,sz.y,sz.z)*(fill||2.3);cam.position.set(ctr.x+dist*.25,ctr.y+dist*.22,ctr.z+dist);cam.lookAt(ctr);
    const N=128,rt=new THREE.WebGLRenderTarget(N,N);rt.texture.colorSpace=THREE.SRGBColorSpace;const prevC=renderer.getClearColor(new THREE.Color()),prevA=renderer.getClearAlpha();
    renderer.setRenderTarget(rt);renderer.setClearColor(0x000000,0);renderer.clear();renderer.render(sc,cam);const buf=new Uint8Array(N*N*4);renderer.readRenderTargetPixels(rt,0,0,N,N,buf);renderer.setRenderTarget(null);renderer.setClearColor(prevC,prevA);rt.dispose();
    const c=document.createElement("canvas");c.width=c.height=N;const x=c.getContext("2d");const img=x.createImageData(N,N);for(let y=0;y<N;y++)img.data.set(buf.subarray((N-1-y)*N*4,(N-y)*N*4),y*N*4);x.putImageData(img,0,0);
    if(key.startsWith("p:"))g.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});return portraitC[key]=c.toDataURL();}catch(e){return portraitC[key]="";}}
/* ---- Sjajka the magpie ---- */
function makeMagpie(){const K=0x1c1c24,Wt=0xf4f4f0,B=0x2a4aa8,G=0xffc53d,R=0xd8403a,hd={name:"head",px:0,py:.5,pz:.1},tl={name:"tail",px:0,py:.38,pz:-.2},wl={name:"wl",px:-.17,py:.44,pz:0},wr={name:"wr",px:.17,py:.44,pz:0};
  return mk([[.34,.3,.46,0,.32,0,K],[.3,.2,.28,0,.26,.08,Wt],[.06,.22,.38,-.19,.34,-.02,B,wl],[.065,.08,.16,-.2,.4,.06,Wt,wl],[.06,.22,.38,.19,.34,-.02,B,wr],[.065,.08,.16,.2,.4,.06,Wt,wr],
    [.12,.06,.52,0,.36,-.44,B,tl],[.26,.24,.26,0,.6,.16,K,hd],[.06,.06,.16,0,.57,.36,0x2a2a2a,hd],[.05,.06,.02,-.08,.64,.29,Wt,hd],[.05,.06,.02,.08,.64,.29,Wt,hd],[.025,.035,.01,-.08,.64,.305,K,hd],[.025,.035,.01,.08,.64,.305,K,hd],
    [.3,.06,.22,0,.47,.14,R],[.05,.05,.02,.1,.47,.26,G],[.03,.16,.03,-.07,.09,.02,0x3a3a3a],[.03,.16,.03,.07,.09,.02,0x3a3a3a]]);}
let sjajka=null;const sjE={name:"Svraka Sjajka",x:0,y:0,z:0};
function buildMarketKeeper(){if(!MARKET.spot)return;const g=makeMagpie();g.scale.setScalar(1.5);const s=MARKET.spot;g.position.set(s.x,s.y,s.z);g.rotation.y=s.ry;scene.add(g);
  g.userData.onTap=()=>openMarket();tapObjs.push(g);sjajka={g,ph:0,hop:0,flap:0,look:0};sjE.x=s.x;sjE.y=s.y-.7;sjE.z=s.z;}
const SJ_HI=["Dobro došla na tržnicu! Kupujem sve što sja i sve što raste.","Ooo, sjajno! Što mi danas donosiš?","Svraka Sjajka na usluzi! Imam sjeme, vunu i jednu tajnu kartu.","Plodovi iz tvog vrta su najslađi na cijelom otoku!"];
let sjNear=false;
function tickMarket(dt,tt){if(sjajka){const s=sjajka,p=s.g.userData.parts;s.ph+=dt;s.flap=Math.max(0,s.flap-dt);
    if(Math.random()<dt*.25&&s.hop<=0)s.hop=1;s.hop=Math.max(0,s.hop-dt*2.8);s.g.position.y=MARKET.spot.y+Math.sin(s.hop*Math.PI)*.22;
    const tx=FP.on?FP.p.x:camera.position.x,tz=FP.on?FP.p.z:camera.position.z;const want=Math.atan2(tx-s.g.position.x,tz-s.g.position.z)-s.g.rotation.y;
    if(p.head){p.head.rotation.y=Math.max(-1,Math.min(1,Math.atan2(Math.sin(want),Math.cos(want))))*.8+Math.sin(tt*.9)*.15;p.head.rotation.x=Math.sin(tt*1.7)*.08;}
    const fl=(s.flap>0||s.hop>0)?Math.sin(tt*28)*.7:0;if(p.wl){p.wl.rotation.z=-fl;p.wr.rotation.z=fl;}if(p.tail)p.tail.rotation.x=-.15+Math.sin(tt*2.2)*.12;
    if(FP.on){const d=Math.hypot(FP.p.x-MARKET.spot.x,FP.p.z-MARKET.spot.z);if(d<3.4&&!sjNear){sjNear=true;s.flap=1;say(sjE,(S.met.sjajka?SJ_HI[Math.floor(Math.random()*SJ_HI.length)]:SJ_HI[0])+" Dodirni me!",5000);S.met.sjajka=S.met.sjajka||today();}else if(d>6)sjNear=false;}}
  for(const k in isleEnts)keepHome(isleEnts[k]);tickCompanion(dt);costumeAnim(dt,tt);beamTick(tt);}
/* ---- the treasure-map hint: a beam of light over one unopened chest ---- */
let hintBeam=null;
function markHint(){const P=FP.on?FP.p:{x:rida.x,z:rida.z};let best=null,bd=1e9;for(const c of chestObjs){if(c.open||(c.id==="tajna"&&!(S.quest&&S.quest.done)))continue;const d=Math.hypot(c.x-P.x,c.z-P.z);if(d<bd){bd=d;best=c;}}
  if(!best)return null;S.hint=best.id;save();showHint();return best;}
function showHint(){if(hintBeam){scene.remove(hintBeam);hintBeam=null;}const c=S.hint&&chestObjs.find(q=>q.id===S.hint&&!q.open);if(!c){S.hint="";return;}
  const m=new THREE.Mesh(new THREE.CylinderGeometry(.35,.6,60,10,1,true),new THREE.MeshBasicMaterial({color:0xffc53d,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
  m.position.set(c.x,c.y+30,c.z);scene.add(m);hintBeam=m;}
function beamTick(tt){if(!hintBeam)return;const c=chestObjs.find(q=>q.id===S.hint);if(!c||c.open){scene.remove(hintBeam);hintBeam=null;S.hint="";save();return;}hintBeam.material.opacity=.2+Math.sin(tt*2)*.08;}
function mapExtra(x,S2){const c=S.hint&&chestObjs.find(q=>q.id===S.hint&&!q.open);if(!c)return;const px=c.x*S2,pz=c.z*S2;x.lineCap="round";
  for(const [w,col] of [[9,"#16243a"],[5,"#e8443a"]]){x.lineWidth=w;x.strokeStyle=col;x.beginPath();x.moveTo(px-9,pz-9);x.lineTo(px+9,pz+9);x.moveTo(px+9,pz-9);x.lineTo(px-9,pz+9);x.stroke();}}
/* ---- trading ---- */
const SELL={ugljen:2,bakar:3,zeljezo:5,grumen:6,dijamant:24,smaragd:30,biser:20,mrkva:3,krumpir:3,cikla:4,bobice:2,svjetlocvijet:28,riba:6,
  bundeva:12,lubenica:12,ametist:3,kristal:10,koralj_p:2,koralj_r:2,koralj_z:2,koralj_c:2,koralj_l:2,zlato:40,kvarc:6,prizmarin:2,vuna_b:2};
const DEMAND_POOL=["mrkva","krumpir","cikla","bobice","riba","ugljen","bakar","zeljezo","biser","ametist","bundeva","lubenica","grumen"];
function demand(){const d=today();let h=7;for(const ch of d)h=(h*31+ch.charCodeAt(0))>>>0;const n=DEMAND_POOL.length;const a=DEMAND_POOL[h%n];let b=DEMAND_POOL[(h>>>7)%n];if(b===a)b=DEMAND_POOL[(h%n+5)%n];return [a,b];}
const sellPrice=k=>SELL[k]*(demand().includes(k)?2:1);
const WOOLS=["vuna_c","vuna_b","vuna_z","vuna_n","vuna_l","vuna_zl","vuna_ts","vuna_p","vuna_t","vuna_lj","vuna_r","vuna_s"];
const BUY=[{k:"s_mrkva",n:1,p:5},{k:"s_krumpir",n:1,p:5},{k:"s_cikla",n:1,p:7},{k:"s_bobice",n:1,p:9},{k:"s_bundeva",n:1,p:14},{k:"s_lubenica",n:1,p:14},{k:"oranica",n:4,p:4}]
  .concat(WOOLS.map(k=>({k,n:4,p:8}))).concat([{k:"stalak",n:1,p:30},{k:"polica2",n:1,p:25},{sp:"karta",n:"Sjajkina karta blaga",p:40,d:"Označi najbližu neotvorenu škrinju na karti i iznad nje upali stup svjetla."}]);
function openMarket(tab){sfx.click();if(sjajka)sjajka.flap=1.2;sheetMarket(tab||"prodaj");}
function sheetMarket(tab,keep){const tabs='<div class="tabs" role="tablist">'+[["prodaj","Prodaj"],["kupi","Kupi"],["prijatelji","Prijatelji"],["ormar","Ormar"]].map(t=>'<button role="tab" data-t="'+t[0]+'" aria-selected="'+(t[0]===tab)+'">'+t[1]+'</button>').join("")+'</div>';
  const pic=portrait("sjajka");const dem=demand();let line=SJ_HI[Math.floor(Math.random()*SJ_HI.length)];let body="";
  if(tab==="prodaj"){line="Danas posebno tražim "+accName(dem[0])+" i "+accName(dem[1])+". Za njih plaćam dvostruko!";
    const have=Object.keys(SELL).filter(k=>haveN(k)>0).sort((a,b)=>(dem.includes(b)?1:0)-(dem.includes(a)?1:0));
    body='<div class="demand">'+dem.map(k=>'<span><img alt="" src="'+thingIcon(k)+'">'+esc(thingName(k))+' <b>×2</b></span>').join("")+'</div>';
    body+=have.length?'<div class="trades">'+have.map(k=>{const n=haveN(k),p=sellPrice(k);return '<div class="trade'+(dem.includes(k)?' hot':'')+'"><img alt="" src="'+thingIcon(k)+'"><div><b>'+esc(thingName(k))+'</b><small>Imaš '+n+' · '+COIN_SVG+p+' za komad</small></div><button class="btn soft" data-sell="'+k+'" data-n="1">Prodaj 1</button>'+(n>1?'<button class="btn green" data-sell="'+k+'" data-n="'+n+'">Sve '+COIN_SVG+(p*n)+'</button>':'')+'</div>';}).join("")+'</div>'
      :'<p class="muted">Još nemaš ništa što Sjajka kupuje. Ona voli plodove iz vrta, ribu, rude, bisere, kristale i koralje.</p>';}
  if(tab==="kupi"){line="Sjeme, vuna u svim bojama i jedna tajanstvena karta. Što ti treba?";
    body='<div class="trades">'+BUY.map((b,i)=>{const name=b.sp?b.n:thingName(b.k)+(b.n>1?" ×"+b.n:"");const ic=b.sp?itemIcon("karta"):thingIcon(b.k);const ok=S.coins>=b.p&&(!b.sp||chestObjs.some(c=>!c.open));
      return '<div class="trade"><img alt="" src="'+ic+'"><div><b>'+esc(name)+'</b><small>'+(b.sp?esc(b.d):(MATS[b.k]&&MATS[b.k].seed?"Dozrije za "+Math.round(CROPS[SEED2CROP[b.k]].need)+" stranica":"Za gradnju"))+'</small></div><button class="btn '+(ok?'green':'soft')+'" data-buy="'+i+'"'+(ok?'':' aria-disabled="true"')+'>'+COIN_SVG+b.p+'</button></div>';}).join("")+'</div>';}
  if(tab==="prijatelji"){line="Životinje na otoku obožavaju hranu iz tvog vrta. Nahrani ih svaki dan i postat ćete prijatelji!";
    const list=VISITORS.map(v=>v.k).concat(Object.keys(PETS).filter(k=>PETS[k].isle));
    body='<div class="pets">'+list.map(k=>{const P=PETS[k],V=VISITORS.find(v=>v.k===k);const here=V?S.visitors.includes(k):!!S.met[k];const I2=petInfo(k);
      if(!here)return '<div class="pet locked"><div class="pp">?</div><div><b>???</b><small>'+(V?"Dolazi kad pročitaš "+V.min+" "+(V.min===1?"knjigu":V.min<5?"knjige":"knjiga")+" do kraja.":"Živi na jednom od dalekih otoka. Pronađi ga u istraživanju!")+'</small></div></div>';
      const fedT=I2.fed===today(),giftR=I2.h>=5&&I2.gift!==today(),canFeed=!fedT&&(V?true:false);const food=haveN(P.fav)?P.fav:FOODS.find(f=>haveN(f));
      return '<div class="pet"><img class="pp" alt="" src="'+portrait(k)+'"><div class="pb"><b>'+esc(petName(k))+'</b><span class="hearts">'+[0,1,2,3,4].map(i=>'<i class="'+(i<I2.h?'on':'')+'"></i>').join("")+'</span>'+
        '<small>Najdraže: <img class="mi" alt="" src="'+thingIcon(P.fav)+'">'+esc(thingName(P.fav))+(I2.h>=5?' · '+esc(P.gd):'')+'</small></div><div class="pa">'+
        (giftR?'<button class="btn green" data-gift="'+k+'">Dar!</button>':'')+
        (fedT?'<small>Danas je već jelo ✓</small>':V?(food?'<button class="btn" data-feed="'+k+'">Nahrani</button>':'<small>Nemaš hrane</small>'):'<small>Nahrani na otoku</small>')+
        (I2.h>=5&&!P.stay?'<button class="btn '+(S.pet===k?'green':'soft')+'" data-pet="'+k+'">'+(S.pet===k?'Prati Ridu':'Povedi')+'</button>':'')+'</div></div>';}).join("")+'</div>';}
  if(tab==="ormar"){line="Za tebe imam šešire, šalove i plašteve. Neke možeš kupiti, a neke otključava samo prava avantura!";
    const own=COSTUMES.filter(c=>S.hats.includes(c.k)).length;
    body='<p class="muted">Kostima: <b>'+own+' od '+COSTUMES.length+'</b>. Neki se kupuju zlatnicima, a neki se otključavaju čitanjem, istraživanjem i radom u vrtu.</p><button class="btn big" id="openWard">Isprobaj u ormaru</button>'+SLOTS.map(sl=>'<h3>'+sl[1]+'</h3><div class="clist">'+COSTUMES.filter(c=>c.slot===sl[0]).map(c=>{const st=costumeState(c),ic=costumeIcon(c);return '<span class="'+(st.own?'on':st.ok?'ready':'')+'">'+(ic?'<img alt="" src="'+ic+'">':'')+'<b>'+esc(c.n)+'</b><small>'+(st.own?"Tvoj je ✓":c.p?COIN_SVG+c.p:st.ok?"Otključano!":esc(st.txt))+'</small></span>';}).join("")+'</div>').join("");}
  const sc=keep?$("sheet").scrollTop:0;
  openSheet('<h2>Tržnica</h2><div class="rida sj">'+(pic?'<img alt="" src="'+pic+'">':'')+'<div class="say"><b>Svraka Sjajka</b>'+esc(line)+'</div></div><div class="coinbar">'+COIN_SVG+'<b>'+S.coins+'</b> zlatnika</div>'+tabs+body);if(keep)$("sheet").scrollTop=sc;
  const B=$("sheetBody");B.querySelectorAll("[role=tab]").forEach(t=>t.onclick=()=>{sfx.click();sheetMarket(t.dataset.t);});
  B.querySelectorAll("[data-sell]").forEach(b=>b.onclick=()=>{const k=b.dataset.sell,n=Math.min(+b.dataset.n,haveN(k));if(n<=0)return;const p=sellPrice(k)*n;giveN(k,-n);S.coins+=p;S.sold=(S.sold||0)+n;bump("sell",n);
    tone(880,.06,"square",.03);tone(1320,.08,"square",.03,.07);if(sjajka)sjajka.flap=.8;save();renderEco();toast("+"+p+" zlatnika",1600);sheetMarket("prodaj",true);});
  B.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>{const it=BUY[+b.dataset.buy];if(S.coins<it.p){toast("Treba još "+(it.p-S.coins)+" zlatnika. Čitanjem i prodajom zaradiš nove!",2800);sfx.click();return;}
    if(it.sp==="karta"){const c=markHint();if(!c){toast("Sve škrinje su već otvorene!",2400);return;}S.coins-=it.p;save();renderEco();sfx.fanfare();toast("Sjajka je na karti označila škrinju crvenim X, a iznad nje sja stup svjetla!",4200);sheetMarket("kupi",true);return;}
    S.coins-=it.p;giveN(it.k,it.n);if(ID[it.k]!=null)hotAdd(it.k);save();renderEco();tone(660,.06,"triangle",.03);tone(990,.08,"triangle",.03,.06);miniPop(thingIcon(it.k),"+"+it.n+" "+thingName(it.k));sheetMarket("kupi",true);});
  B.querySelectorAll("[data-feed]").forEach(b=>b.onclick=()=>{const k=b.dataset.feed,P=PETS[k];const food=haveN(P.fav)?P.fav:FOODS.find(f=>haveN(f));if(!food)return;const en=ents.find(e=>e.kind===k);const r=feedPet(k,food,en);if(en)say(en,r===2?"Njam! Najdraža hrana!":"Njam, hvala!",3000);sheetMarket("prijatelji",true);});
  B.querySelectorAll("[data-gift]").forEach(b=>b.onclick=()=>{const k=b.dataset.gift;const l=claimGift(k,ents.find(e=>e.kind===k));if(l)toast(petName(k)+": "+l.join(", "),4200);sheetMarket("prijatelji",true);});
  B.querySelectorAll("[data-pet]").forEach(b=>b.onclick=()=>{const k=b.dataset.pet;sfx.click();S.pet=S.pet===k?"":k;save();if(S.pet)toast(petName(k)+" će pratiti Ridu kad istražuješ.",3000);sheetMarket("prijatelji",true);});
  const ow=$("openWard");if(ow)ow.onclick=()=>{closeSheet();openShop();};}
/* ---- costumes: a hat, something round the neck and something on the back ---- */
const COSTUMES=HATS.map(h=>({k:h.k,slot:"glava",n:h.n,p:h.p})).concat([
  {k:"slamnati",slot:"glava",n:"Slamnati šešir",req:"harvested",need:10,txt:"Uberi 10 plodova"},
  {k:"rudar",slot:"glava",n:"Rudarska kaciga",req:"mined",need:150,txt:"Iskopaj 150 kockica",d:"Ima svjetiljku: svijetli u špilji!"},
  {k:"kapetan",slot:"glava",n:"Kapetanska kapa",req:"chest",id:"brod",need:1,txt:"Otvori škrinju na potopljenom brodu"},
  {k:"sal",slot:"vrat",n:"Crveni šal",p:40},{k:"masna",slot:"vrat",n:"Leptir-mašna",p:70},
  {k:"marama",slot:"vrat",n:"Istraživačka marama",req:"poi",need:6,txt:"Otkrij 6 mjesta na karti"},
  {k:"medaljon",slot:"vrat",n:"Biserni medaljon",req:"chests",need:5,txt:"Otvori 5 škrinja"},
  {k:"ruksak",slot:"ledja",n:"Ruksak istraživača",p:120},
  {k:"plast",slot:"ledja",n:"Plašt čitača",req:"books",need:3,txt:"Pročitaj 3 knjige do kraja"},
  {k:"krila",slot:"ledja",n:"Krila leptira",req:"pages",need:1000,txt:"Pročitaj ukupno 1000 stranica"},
  {k:"zvjezdani",slot:"ledja",n:"Zvjezdani plašt",p:450}]);
const SLOTS=[["glava","Glava"],["vrat","Vrat"],["ledja","Leđa"]];
function costumeState(c){const own=S.hats.includes(c.k);if(own||c.p)return {own,ok:own};let have=0;
  if(c.req==="harvested")have=S.harvested||0;else if(c.req==="mined")have=S.mined||0;else if(c.req==="chest")have=S.chests[c.id]?1:0;else if(c.req==="poi")have=Object.keys(S.poi).length;
  else if(c.req==="chests")have=Object.keys(S.chests).length;else if(c.req==="books")have=finished().length;else if(c.req==="pages")have=S.books.reduce((a,b)=>a+(b.page||0),0);else if(c.req==="quest")have=(S.quest&&S.quest.done)?1:0;
  return {own:false,ok:have>=c.need,have,txt:c.txt+(c.need>1?" ("+Math.min(have,c.need)+"/"+c.need+")":"")};}
const wornIn=slot=>slot==="glava"?S.hat:(S.wear[slot]||"");
const partObj={};
function setPart(slot,k){if(!rida)return;if(partObj[slot]){rida.g.remove(partObj[slot]);partObj[slot]=null;}if(!k)return;const m=costumeMesh(k);if(!m)return;rida.g.add(m);partObj[slot]=m;rida.shadeF=null;rida.fadeA=null;}
function applyCostume(){setHat(S.hat||null);setPart("vrat",S.wear.vrat);setPart("ledja",S.wear.ledja);if(rida)rida.shadeF=null;}
function costumeMesh(k){const g=new THREE.Group(),M=(c,o)=>std(c,o);const box=(w,h,d,c,x,y,z,o)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(c,o));m.position.set(x,y,z);m.castShadow=true;g.add(m);return m;};
  switch(k){
  case"sal":box(.56,.13,.3,0xd8403a,0,.66,.34);box(.58,.04,.32,0xf4f0e6,0,.62,.34);{const t=box(.13,.3,.06,0xd8403a,.17,.5,.5);t.rotation.z=.15;box(.14,.04,.07,0xf4f0e6,.19,.37,.5).rotation.z=.15;}break;
  case"masna":box(.08,.08,.06,0xb83a8a,0,.58,.47);{const a=box(.14,.14,.05,0xd84aa8,-.1,.58,.46);a.rotation.z=.6;const b=box(.14,.14,.05,0xd84aa8,.1,.58,.46);b.rotation.z=-.6;}break;
  case"marama":box(.54,.08,.28,0x3a8a4a,0,.68,.34);{const t=new THREE.Mesh(new THREE.ConeGeometry(.17,.26,3),M(0x3a8a4a));t.rotation.x=Math.PI;t.position.set(0,.52,.47);t.scale.z=.35;g.add(t);}box(.06,.06,.05,0xffc53d,0,.63,.49);break;
  case"medaljon":{const r=new THREE.Mesh(new THREE.TorusGeometry(.24,.018,6,22),M(0xffc53d,{metalness:.6,roughness:.3}));r.rotation.x=Math.PI/2-.5;r.position.set(0,.64,.36);g.add(r);
    const p=new THREE.Mesh(new THREE.SphereGeometry(.065,12,10),M(0xf6f0ff,{roughness:.2,metalness:.1}));p.position.set(0,.5,.5);g.add(p);box(.1,.03,.03,0xffc53d,0,.56,.49,{metalness:.6,roughness:.3});}break;
  case"ruksak":box(.38,.32,.34,0x9a5a2a,0,.88,-.12);box(.4,.1,.36,0x7a4420,0,1.02,-.1);box(.2,.14,.06,0xb8743a,0,.84,-.31);box(.06,.06,.02,0xffc53d,0,.92,-.34);
    for(const s of [-1,1])box(.04,.04,.42,0x5a3418,s*.2,.74,.1);{const r=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.42,10),M(0x5a8a4a));r.rotation.z=Math.PI/2;r.position.set(0,1.1,-.24);g.add(r);}break;
  case"plast":case"zvjezdani":{const c=k==="plast"?0x7a3ab8:0x1e2a6a,e=k==="plast"?0xffc53d:0xbfd8ff;box(.58,.04,.86,c,0,.735,-.04);
    const l=box(.035,.24,.86,c,-.3,.62,-.04),r=box(.035,.24,.86,c,.3,.62,-.04);box(.6,.05,.06,e,0,.75,.38);g.userData.flaps=[l,r];
    if(k==="zvjezdani"){for(let i=0;i<9;i++){const st=new THREE.Mesh(new THREE.OctahedronGeometry(.035),M(0xfff0a0,{emissive:LC(0xffd040),emissiveIntensity:1}));st.position.set((hash2(i,3,1)-.5)*.48,.76,(hash2(i,5,2)-.5)*.76);g.add(st);}}
    else box(.12,.02,.12,0xffc53d,0,.76,0);}break;
  case"krila":{const mk2=(s)=>{const w=new THREE.Group();w.position.set(s*.12,.82,-.05);const mat=new THREE.MeshStandardMaterial({color:LC(0xff8ad0),transparent:true,opacity:.82,side:THREE.DoubleSide,roughness:.4,emissive:LC(0x6a2a80),emissiveIntensity:.25});
      const a=new THREE.Mesh(new THREE.CircleGeometry(.3,14),mat);a.position.set(s*.26,.14,0);a.rotation.y=Math.PI/2;w.add(a);const b=new THREE.Mesh(new THREE.CircleGeometry(.2,12),mat.clone());b.material.color.set(LC(0x8ad0ff));b.position.set(s*.2,-.1,-.12);b.rotation.y=Math.PI/2;w.add(b);
      const sp=new THREE.Mesh(new THREE.CircleGeometry(.07,10),new THREE.MeshStandardMaterial({color:LC(0xffe680),side:THREE.DoubleSide}));sp.position.set(s*.3,.16,.01*s);sp.rotation.y=Math.PI/2;w.add(sp);g.add(w);return w;};
    g.userData.wings=[mk2(-1),mk2(1)];}break;
  default:return null;}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});return g;}
/* the three new hats */
const _hatMeshOld=hatMesh;
hatMesh=function(k){if(k!=="slamnati"&&k!=="rudar"&&k!=="kapetan")return _hatMeshOld(k);const g=new THREE.Group(),M=(c,o)=>std(c,o);
  if(k==="slamnati"){const b=new THREE.Mesh(new THREE.CylinderGeometry(.44,.46,.04,20),M(0xe8c860));g.add(b);const c=new THREE.Mesh(new THREE.CylinderGeometry(.2,.23,.2,16),M(0xe8c860));c.position.y=.11;g.add(c);
    const band=new THREE.Mesh(new THREE.CylinderGeometry(.235,.235,.06,16),M(0xd8403a));band.position.y=.05;g.add(band);}
  if(k==="rudar"){const h=new THREE.Mesh(new THREE.SphereGeometry(.27,16,10,0,Math.PI*2,0,Math.PI/2),M(0xf2c030,{roughness:.4}));g.add(h);const br=new THREE.Mesh(new THREE.CylinderGeometry(.31,.31,.03,18),M(0xd8a020));g.add(br);
    const lp=new THREE.Mesh(new THREE.CylinderGeometry(.07,.08,.08,12),M(0xfff6c0,{emissive:LC(0xffe080),emissiveIntensity:1.2}));lp.rotation.x=Math.PI/2;lp.position.set(0,.12,.25);g.add(lp);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.08,.02,6,14),M(0x5a5a5a));ring.position.set(0,.12,.28);g.add(ring);}
  if(k==="kapetan"){const c=new THREE.Mesh(new THREE.CylinderGeometry(.27,.24,.16,18),M(0x1e2a5a));c.position.y=.08;g.add(c);const t=new THREE.Mesh(new THREE.CylinderGeometry(.29,.29,.05,18),M(0xf6f4ee));t.position.y=.18;g.add(t);
    const v=new THREE.Mesh(new THREE.BoxGeometry(.36,.025,.16),M(0x16161a));v.position.set(0,.01,.27);v.rotation.x=.15;g.add(v);const bd=new THREE.Mesh(new THREE.OctahedronGeometry(.05),M(0xffc53d,{metalness:.6,roughness:.3}));bd.position.set(0,.1,.26);g.add(bd);}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});return g;};
function costumeAnim(dt,tt){const mv=FP.on?Math.min(1,Math.hypot(FP.v.x,FP.v.z)/4):(rida&&rida.tx!=null?.6:0);
  const b=partObj.ledja;if(!b)return;if(b.userData.flaps)b.userData.flaps.forEach((f,i)=>{f.rotation.z=(i?-1:1)*(.05+mv*.25+Math.sin(tt*9)*.05*mv);});
  if(b.userData.wings)b.userData.wings.forEach((w,i)=>{w.rotation.y=(i?-1:1)*(.35+Math.sin(tt*(mv>.2?14:4))*(mv>.2?.5:.25));});}
/* the wardrobe overlay, now with three slots */
let shopSlot="glava";
renderShop=function(){const list=COSTUMES.filter(c=>c.slot===shopSlot);let cur=COSTUMES.find(c=>c.k===shopSel&&c.slot===shopSlot)||list[0];shopSel=cur.k;
  $("shopCoins").innerHTML=COIN_SVG+"<b>"+S.coins+"</b>";
  $("shopSlots").innerHTML=SLOTS.map(s=>'<button role="tab" data-s="'+s[0]+'" aria-selected="'+(s[0]===shopSlot)+'">'+s[1]+'</button>').join("");
  $("shopSlots").querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{sfx.click();applyCostume();shopSlot=b.dataset.s;shopSel=wornIn(shopSlot)||COSTUMES.find(c=>c.slot===shopSlot).k;previewC();renderShop();});
  $("shopList").innerHTML=list.map(c=>{const st=costumeState(c);const ic=costumeIcon(c);return '<button class="hat'+(st.own?'':c.p?'':st.ok?' ready':' lock')+'" data-k="'+c.k+'" aria-pressed="'+(c.k===shopSel)+'">'+(ic?'<img alt="" src="'+ic+'">':'')+'<b>'+esc(c.n)+'</b><small>'+(st.own?(wornIn(c.slot)===c.k?"Nosi":"Tvoj je"):c.p?COIN_SVG+c.p:st.ok?"Otključano!":"Zaključano")+'</small></button>';}).join("");
  const selB=$("shopList").querySelector("[aria-pressed=true]");if(selB&&selB.scrollIntoView)selB.scrollIntoView({inline:"center",block:"nearest"});
  $("shopList").querySelectorAll(".hat").forEach(b=>b.onclick=()=>{sfx.click();shopSel=b.dataset.k;previewC();renderShop();if(rida)rida.celebrate=.4;});
  const st=costumeState(cur);const rq=$("shopReq");rq.hidden=!(cur.d||(!st.own&&!cur.p));rq.textContent=(cur.d?cur.d+" ":"")+(!st.own&&!cur.p?(st.ok?"Otključala si ga!":"Kako ga dobiti: "+st.txt):"");
  const a=$("shopAct");a.disabled=false;if(st.own)a.textContent=wornIn(cur.slot)===cur.k?"Skini":"Stavi";else if(cur.p){if(S.coins>=cur.p)a.innerHTML="Kupi za "+COIN_SVG+cur.p;else{a.textContent="Treba još "+(cur.p-S.coins)+" zlatnika";a.disabled=true;}}
  else if(st.ok)a.textContent="Uzmi!";else{a.textContent="Zaključano";a.disabled=true;}};
function previewC(){const c=COSTUMES.find(x=>x.k===shopSel);if(!c)return;if(c.slot==="glava")setHat(c.k);else setPart(c.slot,c.k);}
function wearC(c){if(c.slot==="glava")S.hat=S.hat===c.k?"":c.k;else S.wear[c.slot]=S.wear[c.slot]===c.k?"":c.k;}
$("shopAct").onclick=()=>{const c=COSTUMES.find(x=>x.k===shopSel);if(!c)return;const st=costumeState(c);
  if(st.own){wearC(c);sfx.click();}
  else if(c.p&&S.coins>=c.p||(!c.p&&st.ok)){if(c.p)S.coins-=c.p;S.hats.push(c.k);if(c.slot==="glava")S.hat=c.k;else S.wear[c.slot]=c.k;sfx.fanfare();rida.celebrate=1.4;burst(rida.x,rida.y+1.4,rida.z,50,[[1,.85,.3],[1,1,1],[.9,.5,1]],2.5,2.5,1);say(rida,"Obožavam ga! Hvala ti!",3500);}
  applyCostume();if(!st.own||wornIn(c.slot)===c.k)previewC();save();renderShop();renderEco();};
$("shopClose").onclick=()=>{sfx.click();applyCostume();
  if(FP.shopping){const o=FP.shopping;FP.shopping=null;FP.cam.yaw=o.yaw;FP.cam.pitch=o.pitch;FP.cam.tdist=o.td;$("shopUI").hidden=true;document.body.classList.remove("shopping");return;}
  rida.frozen=false;exitGame();};
const _openShopOld=openShop;openShop=function(){shopSlot="glava";
  /* while exploring, the wardrobe opens right where Rida stands and the camera swings round to her face */
  if(FP.on){closeSheet();if(!FP.shopping)FP.shopping={yaw:FP.cam.yaw,pitch:FP.cam.pitch,td:FP.cam.tdist};{const P=FP.p,free=a=>{let d=0;for(let t=.5;t<=4;t+=.25){if(solidAt(P.x+Math.sin(a)*t*.96,P.y+1.05+t*.28,P.z+Math.cos(a)*t*.96))break;d=t;}return d;};let by=FP.yaw,bd=-1;
    for(const o of [0,.45,-.45,.9,-.9,1.4,-1.4,2,-2,2.6,-2.6,Math.PI]){const d=free(FP.yaw+o);if(d>bd+.01){bd=d;by=FP.yaw+o;}if(d>=3.9)break;}FP.yaw=by;FP.cam.yaw=by;}FP.cam.pitch=.28;FP.cam.tdist=3.7;FP.keys={};FP.joy.x=FP.joy.y=0;FP.joy.id=null;stopDig();
    document.body.classList.add("shopping");$("shopUI").hidden=false;shopSel=S.hat||HATS[0].k;applyCostume();previewC();renderShop();say(rida,"Što ćemo danas obući?",3000);return;}
  _openShopOld();applyCostume();previewC();renderShop();};
/* ---- the map sheet item icon ---- */
ITEM_DRAW.karta=(x,P,hi,ol)=>{P([[8,14],[24,8],[40,14],[56,8],[56,50],[40,56],[24,50],[8,56]],"#f3e3c0");x.strokeStyle="rgba(22,36,58,.35)";x.lineWidth=2;x.beginPath();x.moveTo(24,8);x.lineTo(24,50);x.moveTo(40,14);x.lineTo(40,56);x.stroke();
  x.setLineDash([3,3]);x.strokeStyle="#8a5a2a";x.beginPath();x.moveTo(14,44);x.quadraticCurveTo(26,26,40,34);x.stroke();x.setLineDash([]);x.lineWidth=4;x.strokeStyle="#e8443a";x.beginPath();x.moveTo(40,28);x.lineTo(50,38);x.moveTo(50,28);x.lineTo(40,38);x.stroke();};
/* ---- start ---- */
function marketInit(){S.pets=S.pets||{};S.met=S.met||{};S.wear=S.wear||{vrat:"",ledja:""};if(S.hint==null)S.hint="";
  buildMarketKeeper();spawnIsleAnimals();applyCostume();showHint();}
