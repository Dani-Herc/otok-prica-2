/* =================== START =================== */
const HOMEA=Math.atan2(HOME.p.z-CZ,HOME.p.x-CX);
function startDay(){const t=today();if(S.lastVisit===t)return false;const firstEver=!S.lastVisit;S.lastVisit=t;
  if(firstEver&&!S.letters.length)S.letters.push({id:"l0",text:"Bok!\n\nOvaj otok je od danas tvoj. Zove se Otok priča jer na njemu sve raste od knjiga koje čitaš.\n\nSvaki put kad pročitaš nekoliko stranica, pritisni „Čitala sam!“ i gledaj što se događa. Ja ću biti ovdje i čekati tvoje priče.",from:"Tvoja Rida",d:t,read:false});
  else{S.bloom=(S.bloom||0)+1;S.tickets=Math.min(12,(S.tickets||0)+1);}save();return !firstEver;}
function boot(){
  migrateWorld();if(typeof migrateWorld10==="function")migrateWorld10();if(typeof migrateWorld11==="function")migrateWorld11();if(typeof migrateWorld13==="function")migrateWorld13();
  genTerrain();
  for(const b of S.books){if(!PLOTS[b.plot])continue;paveFor(b);stampList(PLOTS[b.plot],blueprint(bkey(b)),targetCount(b));shown[b.id]=targetCount(b);}
  plantTrees();
  for(const k in S.edits){const p=k.split(",").map(Number);setV(p[0],p[1],p[2],S.edits[k],true);}
  buildShore();shoreTex.needsUpdate=true;
  lightAll();lightReady=true;advInit();
  for(let cz=0;cz<NC;cz++)for(let cx=0;cx<NC;cx++)buildChunk(cx,cz);
  buildLife();buildPier();grow();buildStream();buildChests();farmInit();if(typeof regionsInit==="function")regionsInit();
  rida=spawn("rida","Rida",{speed:1.7});rida.x=LIB.x+.5;rida.z=LIB.z+6.5;rida.y=walkable(rida.x,rida.z)||LIB.h;setHat(S.hat||null);
  syncVisitors();syncSigns();syncSpecials();marketInit();if(typeof diaryInit==="function")diaryInit();if(typeof questInit==="function")questInit();if(typeof animalsInit==="function")animalsInit();
  setTime(autoPreset(),true);renderSound();resize();renderHUD();lastUnlocked=unlockList();if(!S.bag){S.bag={daske:24,drvo:4,zemlja:8,trava:8,kamen:8,pijesak:8,staza:8};lastUnlocked.filter(k=>(PALETTE.find(p=>p[0]===k)||[])[1]).forEach(k=>S.bag[k]=8);save();}
  const newDay=startDay();syncBottle();dailyTreasures();quests();renderEco();
  flight={from:{t:HOME.t.clone().add(new THREE.Vector3(0,10,0)),p:camera.position.clone()},t:HOME.t.clone(),p:homeP(),k:0,d:4.2};
  requestAnimationFrame(frame);setTimeout(()=>$("loading").classList.add("out"),150);if(S.name)camHint();
  if(!S.name){setTimeout(()=>{openSheet('<h2>Dobro došla na otok!</h2><div class="rida">'+RIDA_SVG+'<div class="say">Bok! Ja sam Rida, lisica s ovog otoka. Otok je od danas tvoj, ali je još skoro prazan. Svaka knjiga koju pročitaš ovdje će izgraditi nešto novo: šumu, svjetionik, farmu ili čak zvjezdarnicu!</div></div>'+
    '<div class="field"><label for="wN">Kako se zoveš?</label><input type="text" id="wN" maxlength="30" autocomplete="off"></div><button class="btn big" id="wGo">Idemo!</button>',()=>{renderHUD();if(bottle){flyTo(bottle.position.x,WATER+1,bottle.position.z,30);}setTimeout(()=>say(rida,(S.name?"Drago mi je, "+S.name+"! ":"")+"Vidiš li bocu u moru? Dodirni je!",7000),1600);});
    const go=()=>{S.name=$("wN").value.trim().slice(0,30);save();closeSheet();setTimeout(camHint,4000);};$("wGo").onclick=go;$("wN").onkeydown=e=>{if(e.key==="Enter")go();};},4600);}
  else if(newDay){const V=nextVisitor();setTimeout(()=>say(rida,"Dobro jutro, "+S.name+"! Preko noći je na otoku izraslo novo cvijeće.",5500),4800);if(V)setTimeout(()=>arrive(V),7500);}
  else setTimeout(()=>ridaTalk(),4800);}
boot();

/* cloud sync on claude.ai. Pages read (xp) and finished books only ever grow, so the save with more reading wins,
   whatever its timestamp: a fresh game opened in a new browser can never overwrite real progress. Only a deliberate
   reset or a restore from a file (resetAt) may replace a save that has read more. A copy of the cloud save is kept each day. */
/* v21: with the same pages and books, the save with the higher level (exploring, animals, chests) wins, not the newer one */
function progKey(s){if(!s)return [-1,-1,-1];return [Number(s.xp)||0,Array.isArray(s.books)?s.books.length:0,typeof saveLevel==="function"?saveLevel(s):0];}
function richer(a,b){const A=progKey(a),B=progKey(b);for(let i=0;i<3;i++){if(A[i]!==B[i])return A[i]>B[i];}return false;}
function cloudPick(loc,rem){/* true: take the cloud save */if(!rem)return false;
  const lr=loc.resetAt||0,rr=rem.resetAt||0;if(rr>lr&&rr>(loc.updatedAt||0))return true;if(lr>rr&&lr>(rem.updatedAt||0))return false;
  if(richer(rem,loc))return true;if(richer(loc,rem))return false;return (rem.updatedAt||0)>(loc.updatedAt||0);}
(async function(){try{if(!window.claude||!window.claude.use)return;const [db,user]=await Promise.all([window.claude.use("db"),window.claude.use("user")]);if(!db||!user)return;
  const id=await user.id();if(!id)return;const col=db.collection("data/users/"+id);const ref=col.doc("otok3");
  const snap=await Promise.race([ref.get(),new Promise((_,r)=>setTimeout(()=>r(new Error("t")),10000))]);
  let rem=null;if(snap.exists){const d=snap.data();if(d&&d.json){try{rem=JSON.parse(d.json);}catch(e){}}}
  if(rem&&progKey(rem)[0]>0){try{if(localStorage.getItem(KEY+"-cbak")!==today()){await col.doc("otok3bak").set({json:JSON.stringify(rem),updatedAt:rem.updatedAt||0,day:today()});localStorage.setItem(KEY+"-cbak",today());}}catch(e){}}
  if(rem&&cloudPick(S,rem)&&(rem.updatedAt||0)!==(S.updatedAt||0)){try{if(progKey(S)[0]>0)localStorage.setItem(KEY+"-bak",JSON.stringify(S));saveBlock=true;localStorage.setItem(KEY,JSON.stringify(rem));location.reload();return;}catch(e){}}
  remote=ref;if(!rem||!cloudPick(S,rem))ref.set({json:JSON.stringify(S),updatedAt:S.updatedAt}).catch(()=>{});}catch(e){}})();
})();
