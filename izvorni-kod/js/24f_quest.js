/* =================== THE GREAT BOOK: SEVEN LOST PAGES =================== */
/* The Wind of Forgetting tore seven pages out of the Great Book in the library. Each one waits somewhere on the
   island or the far isles, guarded by a puzzle, and each one holds a chapter of the island's own story. */
const QPAGES=[
  {k:"vrt",L:"Č",pz:"riddle",title:"Otok od riječi",
   hint:"Prva stranica zapela je u Ridinom vrtu, uz strašilo s bundevom.",
   intro:"Na stranici je zagonetka. Riješi je i stranica je tvoja!",
   text:"Na početku nije bilo ničega osim mora i jedne tihe misli: što kad bi netko ispričao priču?\nIz te misli izronio je otok, malen kao zrno graška. Prva riječ koju je netko pročitao naglas pala je na pijesak i iz nje je niknula trava. Druga je postala drvo. Treća je postala sunce koje je grijalo i travu i drvo.\nTako je otok naučio svoje najvažnije pravilo: sve što se pročita, ovdje raste."},
  {k:"trznica",L:"I",pz:"memory",title:"Lisica koja je skupljala riječi",
   hint:"Vjetar je drugu stranicu odnio do tržnice svrake Sjajke.",
   intro:"Sjajka je stranicu sakrila među svoje sjajne stvari i sve ih promiješala. Pronađi sve parove!",
   text:"Prva stanovnica otoka bila je mala lisica s repom boje jeseni. Zvali su je Rida.\nRida nije znala čitati, ali je voljela slušati. Svake večeri sjedila je uz more i čekala da joj vjetar donese neku riječ iz dalekih knjiga. Riječi su dolazile rijetko, kao kapi kiše usred ljeta, a Rida ih je spremala u svoju torbu kao najveće blago.\nNajdraža joj je bila riječ „zajedno”."},
  {k:"spilja",L:"T",pz:"melody",title:"Kristali koji pamte",
   hint:"Treća je pala u kristalnu dvoranu duboko u planini. Uđi u špilju kroz rudarska vrata i prati svjetlucanje.",
   intro:"Kristali čuvaju stranicu. Poslušaj njihovu melodiju i ponovi je!",
   text:"Jednog dana Rida je u srcu planine pronašla dvoranu punu kristala. Svaki je kristal pjevao drugim glasom, a kad bi ih dotaknula redom, zvučali su kao rečenica.\n„Kristali pamte priče”, šapnula je sova Mudrica, koja je ondje sjedila otkad zna za sebe. „Ali samo dok ih netko čita. Priča koju nitko ne čita polako utihne, kao kristal koji nitko ne dira.”"},
  {k:"brod",L:"A",pz:"slide",title:"Brod pun pisaca",
   hint:"Četvrta je potonula do starog broda na dnu mora. Roni! Ronilačka maska iz radionice pomaže dulje ostati pod vodom.",
   intro:"More je natopilo stranicu i slika na njoj raspala se na komadiće. Složi je ponovno!",
   text:"Mudrica je Ridi ispričala o Velikoj knjizi. U njoj je zapisana cijela priča otoka: svako drvo, svaki kamen i svaka zvijezda.\nKnjigu je davno donio brod pun pisaca, ali oluja ga je potopila nadomak obale. Pisci su doplivali do plaže, a knjiga je doplutala za njima. Iz zahvalnosti su joj sagradili dom: knjižnicu s tornjem i svjetlom koje se nikad ne gasi."},
  {k:"hram",L:"N",pz:"cipher",title:"Gosti iz pročitanih priča",
   hint:"Peta se skriva kod pustinjskog hrama na Pustinjskom otoku. Do njega ćeš brodom.",
   intro:"Na zidu hrama urezana je tajna riječ. Odgonetni znakove pomoću ključa!",
   text:"Velika knjiga imala je čudnu moć. Svaki put kad bi netko, bilo gdje na svijetu, pročitao knjigu do kraja, u njoj bi se pojavila nova stranica.\nI sa svakom novom stranicom na otok bi stigao novi gost. Tako su došli pingvin s ledenog brijega, deva iz zlatne pustinje i žaba iz cvjetnog vrta. Svatko od njih stigao je iz neke pročitane priče, i svatko je donio svoj komadić svijeta."},
  {k:"iglu",L:"J",pz:"anagram",word:"KNJIGA",title:"Vjetar Zaborava",
   hint:"Šesta je zapela uz iglu na Snježnom otoku.",
   intro:"Mraz je ispremiještao slova na stranici. Složi ih u pravu riječ!",
   text:"Onda je došao Vjetar Zaborava. On ne voli priče, jer se priče pamte, a on bi htio da se sve zaboravi.\nPuhao je tri dana i tri noći. Otvorio je prozore knjižnice, istrgnuo sedam stranica iz Velike knjige i razbacao ih po kopnu i moru. Otok je počeo blijedjeti, a svjetlo na tornju treperilo je kao svijeća na propuhu."},
  {k:"kula",L:"E",pz:"final",word:"ČITANJE",title:"Nastavak pišeš ti",
   hint:"Posljednja je na staroj kuli na Otoku ruševina.",
   intro:"Posljednja stranica! Složi sva slova sa stranica u jednu čarobnu riječ.",
   text:"Rida je znala da sama ne može pronaći sve stranice. Trebala je nekoga tko zna čitati. Nekoga hrabrog i znatiželjnog, tko će svaki dan otvoriti knjigu i pustiti da riječi rastu.\nI tada si stigla ti{IME}. Svaka stranica koju pročitaš vraća otoku boju.\nVelika knjiga opet je cijela, ali nije završena. Njezin nastavak pišeš ti, svaki put kad otvoriš novu knjigu."}];
const QN=QPAGES.length;
const RIDDLES=[
  ["Ima listove, a nije biljka. Ima hrbat, a nije životinja. Što je to?",["Knjiga","Drvo","Kornjača"]],
  ["Zelena kuća, crvena soba, crni stanari. Što je to?",["Lubenica","Jabuka","Trešnja"]],
  ["Leti bez krila, plače bez očiju. Što je to?",["Oblak","Ptica","Leptir"]],
  ["Što se razbije čim ga izgovoriš?",["Tišina","Staklo","Jaje"]],
  ["Što ima tipke, a ne otvara nijedna vrata?",["Klavir","Ključ","Brava"]],
  ["Što je puno rupa, a ipak drži vodu?",["Spužva","Sito","Kanta"]],
  ["Što raste kad ga hraniš, a nestane kad ga poliješ vodom?",["Vatra","Cvijet","Mačka"]],
  ["Što ima vrat, a nema glavu?",["Boca","Žirafa","Lisica"]],
  ["Što ima jedno oko, a ništa ne vidi?",["Igla","Gusar","Sova"]],
  ["Što teče, a nema nogu?",["Rijeka","Zec","Kamen"]],
  ["Što je tvoje, a drugi ga koriste više nego ti?",["Tvoje ime","Tvoj bicikl","Tvoja olovka"]],
  ["Danju spava, noću leti i visi naglavačke. Tko je to?",["Šišmiš","Sova","Mjesec"]],
  ["Nosi kućicu na leđima i za sobom ostavlja srebrni trag. Tko je to?",["Puž","Kornjača","Rak"]],
  ["Ima šest strana, a nijednu ne možeš pročitati. Što je to?",["Kocka","Bilježnica","Lopta"]],
  ["Što je sve mokrije što više briše?",["Ručnik","Sunce","Vjetar"]],
  ["Što uvijek ide samo gore, a nikad dolje?",["Tvoje godine","Balon","Lopta"]],
  ["Što je teže: kilogram perja ili kilogram željeza?",["Jednako su teški","Željezo","Perje"]],
  ["Koliko mjeseci u godini ima 28 dana?",["Svi","Jedan","Dva"]],
  ["Pijetao snese jaje na samom vrhu krova. Na koju stranu jaje padne?",["Pijetlovi ne nesu jaja","Na lijevu","Na desnu"]],
  ["Kad ga trebaju, bace ga u more. Kad ga ne trebaju, izvuku ga. Što je to?",["Sidro","Mreža","Udica"]],
  ["Ima zube, a ne grize. Kosu uredi, a frizer nije. Što je to?",["Češalj","Pas","Pila"]],
  ["Što možeš uhvatiti, a ne možeš baciti?",["Prehladu","Loptu","Ribu"]],
  ["Ima šešir, a nema glavu. Ima nogu, a ne hoda. Što je to?",["Gljiva","Strašilo","Kišobran"]],
  ["Bijelo polje, crno sjeme. Tko ga zna čitati, mudar je. Što je to?",["Stranica knjige","Snijeg s makom","Šahovska ploča"]],
  ["Što putuje cijelim svijetom, a stalno stoji u kutu?",["Poštanska marka","Ormar","Metla"]],
  ["Što je to: što ga više ima, to se manje vidi?",["Mrak","Voda","Vjetar"]],
  ["Ima ruke, a nema prste. Ima lice, a nema usta. Što je to?",["Sat","Lutka","Rukavica"]],
  ["Ja nemam krila, a letim od ruke do ruke. Nemam usta, a pričam priče. Tko sam ja?",["Knjiga","Ptica","Zmaj"]]];
/* the reward chest in the secret room above the library */
CHESTS.push({id:"tajna",x:LIB.x+.5,y:LIB.h+6,z:LIB.z+1.5,n:"Tajna škrinja Velike knjige"});
LOOT.tajna={coins:120,mats:{dijamant:3,smaragd:3,biser:3},blocks:{zlato:6,kristal:6,polica2:4},msg:"Pisci s potonulog broda ostavili su ovo za onoga tko vrati sve stranice. Hvala ti, čuvarice priča!"};
const QUEST={pos:[],obj:null,beam:null,book:null,doorBeam:null,near:-1,cool:0,lect:null};
const qActive=()=>S.quest&&!S.quest.done?S.quest.got.length:-1;
/* ---- where each page lies ---- */
function floorBelow(x,y,z){for(let yy=Math.floor(y);yy>1;yy--){if(solidAt(x+.5,yy+.5,z+.5)&&!solidAt(x+.5,yy+1.5,z+.5)&&!solidAt(x+.5,yy+2.5,z+.5))return yy+1;}return Math.floor(y);}
function spotNear(cx,cy,cz){const X=Math.floor(cx),Z=Math.floor(cz),Y=Math.floor(cy);
  for(const r of [1,2,3])for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dz))!==r)continue;for(const dy of [0,1,-1,2]){const x=X+dx,z=Z+dz,y=Y+dy;
    if(!get(x,y,z)&&!get(x,y+1,z)&&get(x,y-1,z)&&!TYPES[get(x,y-1,z)].water&&!chestObjs.some(c=>Math.abs(c.x-x-.5)<1&&Math.abs(c.z-z-.5)<1))return {x:x+.5,y:y+1,z:z+.5};}}
  return {x:cx,y:cy+1.4,z:cz};}
function questSpots(){const P=[];const at=(fr,u,v)=>{const [x,z]=fr.at(u,v);return {x:x+.5,y:topY(x,z)+2,z:z+.5};};
  P.push(GARDEN.fr?at(GARDEN.fr,4,1):{x:LIB.x+8,y:LIB.h+1,z:LIB.z});
  P.push(MARKET.fr?at(MARKET.fr,-4,0):{x:LIB.x-8,y:LIB.h+1,z:LIB.z});
  {const c=CAVE.cavern;P.push(c?{x:c.x+.5,y:floorBelow(Math.floor(c.x),c.y+2,Math.floor(c.z))+1,z:c.z+.5}:{x:LIB.x,y:LIB.h+2,z:LIB.z+12});}
  {const q=POI.find(p=>p.k==="brod");const c=CHESTS.find(c=>c.id==="brod");const b=c||q;P.push(b?spotNear(b.x+1.5,c?c.y:floorBelow(Math.floor(b.x),WATER,Math.floor(b.z)),b.z):{x:30,y:WATER-3,z:30});}
  for(const id of ["hram","iglu","kula"]){const c=CHESTS.find(q=>q.id===id);P.push(c?spotNear(c.x,c.y,c.z):{x:CX,y:LIB.h+3,z:CZ});}
  return P;}
/* ---- 3D: the lost page, its beam, the Great Book on the lectern ---- */
const pageTex=(()=>{let t=null;return L=>{const c=document.createElement("canvas");c.width=96;c.height=128;const x=c.getContext("2d");
  x.fillStyle="#fbf3dc";x.fillRect(0,0,96,128);x.fillStyle="#efe2bd";x.fillRect(0,0,96,8);x.fillRect(0,120,96,8);
  x.fillStyle="#c98a00";x.fillRect(10,12,30,30);x.fillStyle="#fffdf7";x.font="700 26px 'Pixelify Sans',monospace";x.textAlign="center";x.textBaseline="middle";x.fillText(L,25,28);
  x.fillStyle="#8a7a5a";for(let i=0;i<9;i++)x.fillRect(i<3?46:10,16+i*11,i<3?40:(i===8?44:76),3);
  const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;return tx;};})();
function makePage(L){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.PlaneGeometry(.62,.82,4,1),new THREE.MeshStandardMaterial({map:pageTex(L),side:THREE.DoubleSide,roughness:.9,emissive:LC(0xfff1c0),emissiveIntensity:.35}));
  const p=m.geometry.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i);p.setZ(i,Math.sin(x*4.2)*.05);}m.geometry.computeVertexNormals();g.add(m);
  const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffd870,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7}));gl.scale.set(2.2,2.2,1);g.add(gl);g.userData.glow=gl;g.userData.sheet=m;return g;}
function makeBeam(col,h){const m=new THREE.Mesh(new THREE.CylinderGeometry(.32,.5,h,12,1,true),new THREE.MeshBasicMaterial({map:BEAMTEX,color:col,transparent:true,opacity:.32,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));return m;}
function makeGreatBook(){const g=new THREE.Group(),M=(c,o)=>std(c,o);const cov=M(0x8a2a2a,{roughness:.6}),gold=M(0xffc53d,{metalness:.6,roughness:.35}),pg=M(0xfbf3dc,{roughness:.95});
  [-1,1].forEach(s=>{const h=new THREE.Group();h.rotation.z=s*.16;g.add(h);const b=new THREE.Mesh(new THREE.BoxGeometry(.46,.04,.64),cov);b.position.set(s*.24,0,0);h.add(b);
    const p=new THREE.Mesh(new THREE.BoxGeometry(.42,.07,.58),pg);p.position.set(s*.23,.05,0);h.add(p);const c=new THREE.Mesh(new THREE.BoxGeometry(.06,.045,.06),gold);c.position.set(s*.44,.01,.29);h.add(c);const c2=c.clone();c2.position.z=-.29;h.add(c2);});
  const sp=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,.66),gold);sp.position.y=-.01;g.add(sp);
  const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffe090,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.5}));gl.scale.set(1.8,1.8,1);gl.position.y=.25;g.add(gl);g.userData.glow=gl;
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});return g;}
function buildQuestWorld(){QUEST.pos=questSpots();
  const lx=LIB.x+.5,lz=LIB.z+.5,ly=LIB.h+2.02;const bk=makeGreatBook();bk.position.set(lx,ly,lz);scene.add(bk);QUEST.book=bk;QUEST.lect={x:lx,y:ly,z:lz};
  const l=lightAt(lx,ly,lz);entShade({g:bk},Math.max(.45,Math.max(Math.pow(.8,15-l[0]),Math.pow(.79,15-l[1])*1.1)));
  bk.userData.onTap=()=>bookMenu();tapObjs.push(bk);syncQuest();}
function syncQuest(){const a=qActive();
  if(QUEST.obj){scene.remove(QUEST.obj);const i=tapObjs.indexOf(QUEST.obj);if(i>=0)tapObjs.splice(i,1);QUEST.obj=null;}if(QUEST.beam){scene.remove(QUEST.beam);QUEST.beam=null;}
  if(a>=0&&QUEST.pos[a]){const P=QUEST.pos[a],g=makePage(QPAGES[a].L);g.position.set(P.x,P.y,P.z);scene.add(g);QUEST.obj=g;g.userData.onTap=()=>{if(!FP.on){toast("Do stranice moraš doći s Ridom. Pritisni Istraži!",2600);return;}openPagePuzzle(a);};tapObjs.push(g);
    const bm=makeBeam(0xffd060,46);bm.position.set(P.x,P.y+23,P.z);scene.add(bm);QUEST.beam=bm;}
  const wantDoor=!S.quest;if(wantDoor&&!QUEST.doorBeam){const bm=makeBeam(0xfff0b0,30);bm.position.set(LIB.x+.5,LIB.h+15,LIB.z+.5);scene.add(bm);QUEST.doorBeam=bm;}
  if(!wantDoor&&QUEST.doorBeam){scene.remove(QUEST.doorBeam);QUEST.doorBeam=null;}
  if(QUEST.book)QUEST.book.userData.glow.material.color.set(S.quest&&S.quest.done?0xffd040:0xffe090);}
function tickQuest(dt,tt){const o=QUEST.obj;
  if(o){const P=QUEST.pos[qActive()];o.position.y=P.y+Math.sin(tt*1.6)*.12;o.userData.sheet.rotation.y=tt*1.1;o.userData.sheet.rotation.z=Math.sin(tt*1.3)*.12;o.userData.glow.material.opacity=.55+Math.sin(tt*3)*.15;
    if(Math.random()<dt*3)burst(P.x+(Math.random()-.5)*.6,o.position.y+(Math.random()-.5)*.5,P.z+(Math.random()-.5)*.6,1,[[1,.9,.5],[1,1,.85]],.2,.5,1.3,-.04);}
  if(QUEST.beam)QUEST.beam.material.opacity=.24+Math.sin(tt*2)*.08;if(QUEST.doorBeam)QUEST.doorBeam.material.opacity=.18+Math.sin(tt*1.7)*.07;
  if(QUEST.book){const b=QUEST.book;b.userData.glow.material.opacity=.38+Math.sin(tt*2.2)*.14+(S.quest?S.quest.got.length*.03:0);b.position.y=QUEST.lect.y+Math.sin(tt*1.4)*.03;}
  if(!FP.on||!$("veil").hidden||FP.shopping)return;
  /* Rida hears the Great Book calling the first time she explores */
  if(!S.quest&&!S.qCall&&!WORLD){QUEST.callT=(QUEST.callT||0)+dt;if(QUEST.callT>9){S.qCall=1;save();say(rida,"Čuješ li? Iz knjižnice nas netko zove, a iznad nje sja zlatno svjetlo. Idemo vidjeti!",7000);}}
  const P=FP.p;
  if(!S.quest&&QUEST.lect&&Math.hypot(P.x-QUEST.lect.x,P.z-QUEST.lect.z)<2.4&&Math.abs(P.y-LIB.h-1)<1.5&&performance.now()>QUEST.cool){QUEST.cool=performance.now()+4000;questIntro();return;}
  const a=qActive();if(a<0||!QUEST.pos[a])return;const Q=QUEST.pos[a];const d=Math.hypot(P.x-Q.x,P.z-Q.z),dy=Math.abs(P.y+.6-Q.y);
  if(d<1.5&&dy<1.8){if(QUEST.near!==a&&performance.now()>QUEST.cool){QUEST.near=a;openPagePuzzle(a);}}else if(d>3)QUEST.near=-1;}
/* ---- story sheets ---- */
function chapterText(i){const n=(S.name||"").trim();return QPAGES[i].text.replace("{IME}",n?", "+n:"");}
function chapterHTML(i){return '<div class="story"><small>Poglavlje '+(i+1)+' od '+QN+'</small><h2>'+esc(QPAGES[i].title)+'</h2>'+chapterText(i).split("\n").map(p=>'<p>'+esc(p)+'</p>').join("")+'</div>';}
function lettersHTML(){const got=S.quest?S.quest.got:[];return '<div class="qletters">'+QPAGES.map((p,i)=>'<span class="'+(got.includes(i)?'on':'')+'">'+(got.includes(i)?p.L:'?')+'</span>').join("")+'</div>';}
function questIntro(){sfx.chime();if(QUEST.book)burst(QUEST.lect.x,QUEST.lect.y+.4,QUEST.lect.z,40,[[1,.9,.5],[1,1,1]],1.6,2,1.2);
  openSheet('<div class="story"><small>Velika knjiga</small><h2>Izgubljene stranice</h2><p>Na stalku leži Velika knjiga. U njoj je zapisana cijela priča otoka, ali nedostaje joj sedam stranica.</p><p>Vjetar Zaborava istrgnuo ih je i razbacao po otoku i moru. Bez njih otok polako zaboravlja svoju priču.</p><p>Svaku stranicu čuva jedna zagonetka. Na svakoj stranici sjaji po jedno slovo, a kad skupiš svih sedam, otkrit ćeš čarobnu riječ.</p></div>'+lettersHTML()+'<button class="btn big" id="qGo">Pomoći ću! Krenimo</button>');
  $("qGo").onclick=()=>{S.quest={got:[],start:today(),done:false};save();closeSheet();syncQuest();sfx.fanfare();setTimeout(()=>say(rida,QPAGES[0].hint+" Prati zlatno svjetlo!",7000),400);};}
function bookMenu(){if(!FP.on){toast("Velika knjiga je u knjižnici. Uđi s Ridom!",2400);return;}if(!S.quest){questIntro();return;}
  const got=S.quest.got,a=qActive();const rd=riddleToday();const solved=!!S.riddles[today()];
  openSheet('<h2>Velika knjiga</h2>'+lettersHTML()+(S.quest.done?'<p>Sve stranice su na svom mjestu. Hvala ti, čuvarice priča!</p>':'<p class="muted">Vraćeno '+got.length+' od '+QN+' stranica. Sljedeća: '+esc(QPAGES[a].hint)+'</p>')+
    (got.length?'<div class="row"><button class="btn soft" id="qRead">Pročitaj priču</button></div>':'')+
    '<div class="riddle"><b>Zagonetka dana</b><p>'+esc(rd[0])+'</p>'+(solved?'<p class="muted">Danas si je već riješila. Sutra te čeka nova!</p>':'<div class="pzopts" id="rdOpts">'+shuffleSeed(rd[1].slice(),today()).map(o=>'<button class="btn soft" data-o="'+esc(o)+'">'+esc(o)+'</button>').join("")+'</div><p class="pzmsg" id="rdMsg"></p>')+'</div>');
  if($("qRead"))$("qRead").onclick=()=>readStory(0);
  const ro=$("rdOpts");if(ro)ro.querySelectorAll("button").forEach(b=>b.onclick=()=>{if(b.dataset.o===rd[1][0]){S.riddles[today()]=1;S.coins+=10;renderEco();save();sfx.fanfare();miniPop(itemIcon("coin"),"Točno! +10 zlatnika");checkBadges();bookMenu();}
    else{sfx.click();$("rdMsg").textContent="Hmm, nije to. Pročitaj zagonetku još jednom!";b.disabled=true;b.classList.add("shake");}});}
function readStory(i){const got=(S.quest?S.quest.got:[]).slice().sort((a,b)=>a-b);if(!got.length)return;const k=Math.max(0,got.indexOf(i));const idx=got[k];
  openSheet(chapterHTML(idx)+'<div class="row spread">'+(k>0?'<button class="btn soft" id="stPrev">‹ Prethodno</button>':'<span></span>')+(k<got.length-1?'<button class="btn" id="stNext">Sljedeće ›</button>':'<button class="btn" id="stOk">Zatvori</button>')+'</div>');
  if($("stPrev"))$("stPrev").onclick=()=>{sfx.click();readStory(got[k-1]);};if($("stNext"))$("stNext").onclick=()=>{sfx.click();readStory(got[k+1]);};if($("stOk"))$("stOk").onclick=closeSheet;}
function riddleToday(){const d=today().split("-").map(Number);const n=Math.floor(Date.UTC(d[0],d[1]-1,d[2])/864e5);return RIDDLES[n%RIDDLES.length];}
function shuffleSeed(a,seed){let h=0;for(const ch of String(seed))h=(h*31+ch.charCodeAt(0))>>>0;for(let i=a.length-1;i>0;i--){h=(h*1103515245+12345)>>>0;const j=h%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
function shuffleR(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
/* ---- the puzzles ---- */
function openPagePuzzle(i){if(!$("veil").hidden)return;FP.keys={};FP.joy.x=FP.joy.y=0;const P=QPAGES[i];sfx.chime();
  openSheet('<h2>Stranica '+(i+1)+' od '+QN+'</h2><p class="muted">'+esc(P.intro)+'</p><div id="pzBox" class="pz"></div>',()=>{QUEST.cool=performance.now()+2500;});
  PUZ[P.pz]($("pzBox"),()=>collectPage(i),P);}
const PUZ={
  riddle(box,done){const q=["Nema usta, a priča. Nema nogu, a putuje od ruke do ruke. Ima hrbat, a nije životinja. Što je to?",["Knjiga","Pismo","Kornjača"]];
    box.innerHTML='<div class="pzq">'+esc(q[0])+'</div><div class="pzopts">'+shuffleR(q[1].slice()).map(o=>'<button class="btn soft" data-o="'+esc(o)+'">'+esc(o)+'</button>').join("")+'</div><p class="pzmsg" id="pzMsg"></p>';
    box.querySelectorAll("button").forEach(b=>b.onclick=()=>{if(b.dataset.o===q[1][0]){sfx.fanfare();b.classList.add("ok");setTimeout(done,500);}else{sfx.click();b.disabled=true;b.classList.add("shake");$("pzMsg").textContent="Nije to. Pročitaj zagonetku još jednom!";}});},
  memory(box,done){const ks=["mrkva","riba","biser","smaragd","kristal","lubenica"];const cards=shuffleR(ks.concat(ks));let open=[],found=0,moves=0,lock=false;
    box.innerHTML='<div class="mem">'+cards.map((k,i)=>'<button class="mc" data-i="'+i+'" aria-label="Kartica"><span class="b"></span><span class="f"><img alt="" src="'+thingIcon(k)+'"></span></button>').join("")+'</div><p class="pzmsg" id="pzMsg">Okreni dvije kartice.</p>';
    box.querySelectorAll(".mc").forEach(b=>b.onclick=()=>{if(lock||b.classList.contains("up"))return;b.classList.add("up");tone(660+open.length*220,.06,"triangle",.03);open.push(b);
      if(open.length===2){moves++;const [a,c]=open;if(cards[+a.dataset.i]===cards[+c.dataset.i]){a.classList.add("ok");c.classList.add("ok");open=[];found++;tone(990,.1,"triangle",.04,.05);
          if(found===ks.length){$("pzMsg").textContent="Svi parovi! Trebalo ti je "+moves+" poteza.";sfx.fanfare();setTimeout(done,900);}else $("pzMsg").textContent="Par! Još "+(ks.length-found)+".";}
        else{lock=true;setTimeout(()=>{a.classList.remove("up");c.classList.remove("up");open=[];lock=false;},750);}}});},
  melody(box,done){const F=[523,659,784,1047],C=["#b98cf0","#63b5e8","#8fdc6a","#ff7fa8"];const seq=[];for(let i=0;i<5;i++)seq.push(Math.floor(Math.random()*4));let len=3,pos=0,busy=true;
    box.innerHTML='<div class="mel">'+C.map((c,i)=>'<button class="cr" data-i="'+i+'" style="--c:'+c+'" aria-label="Kristal '+(i+1)+'"></button>').join("")+'</div><p class="pzmsg" id="pzMsg"></p><div class="row"><button class="btn soft" id="melAgain">Poslušaj opet</button></div>';
    const bts=[...box.querySelectorAll(".cr")];const flash=(i,d)=>{bts[i].classList.add("lit");tone(F[i],.32,"sine",.06);setTimeout(()=>bts[i].classList.remove("lit"),d||380);};
    const play=()=>{busy=true;pos=0;$("pzMsg").textContent="Slušaj... ("+len+" tona)";for(let k=0;k<len;k++)setTimeout(()=>flash(seq[k]),500+k*620);setTimeout(()=>{busy=false;$("pzMsg").textContent="Tvoj red!";},500+len*620);};
    bts.forEach(b=>b.onclick=()=>{if(busy)return;const i=+b.dataset.i;flash(i,220);if(i!==seq[pos]){busy=true;$("pzMsg").textContent="Ups! Poslušaj još jednom.";setTimeout(play,900);return;}pos++;
      if(pos>=len){if(len>=5){busy=true;$("pzMsg").textContent="Kristali pjevaju zajedno!";setTimeout(()=>{sfx.fanfare();done();},700);}else{len++;busy=true;$("pzMsg").textContent="Bravo! Sad još jedan ton.";setTimeout(play,1000);}}});
    $("melAgain").onclick=()=>{if(!busy)play();};setTimeout(play,500);},
  slide(box,done){const cv=document.createElement("canvas");drawMap(cv);const s=document.createElement("canvas");s.width=s.height=300;const sx=s.getContext("2d");const crop=cv.width*.62,o=(cv.width-crop)/2;sx.drawImage(cv,o,o,crop,crop,0,0,300,300);const url=s.toDataURL();
    let t=[0,1,2,3,4,5,6,7,8];let e=8,last=-1;const nb=i=>[i-3,i+3,(i%3)?i-1:-1,(i%3<2)?i+1:-1].filter(j=>j>=0&&j<9);
    for(let k=0;k<70;k++){const opts=nb(e).filter(j=>j!==last);const j=opts[Math.floor(Math.random()*opts.length)];[t[e],t[j]]=[t[j],t[e]];last=e;e=j;}
    if(t.every((v,i)=>v===i)){[t[7],t[8]]=[t[8],t[7]];e=7;[t[4],t[7]]=[t[7],t[4]];e=4;}
    const render=()=>{box.innerHTML='<div class="slide">'+t.map((v,i)=>v===8?'<span class="em"></span>':'<button data-i="'+i+'" style="background-image:url('+url+');background-position:'+(v%3)*50+'% '+Math.floor(v/3)*50+'%" aria-label="Komadić '+(v+1)+'"></button>').join("")+'</div><p class="pzmsg">Dodirni komadić do praznog mjesta da ga pomakneš. Slika je karta otoka!</p>';
      box.querySelectorAll(".slide button").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(!nb(e).includes(i))return;[t[e],t[i]]=[t[i],t[e]];e=i;tone(520,.04,"triangle",.03);
        if(t.every((v,k)=>v===k)){box.innerHTML='<div class="slide done"><img alt="Složena karta otoka" src="'+url+'"></div><p class="pzmsg">Složila si je!</p>';sfx.fanfare();setTimeout(done,900);}else render();});};render();},
  cipher(box,done){const word="SUNCE";const letters=shuffleR(["S","U","N","C","E","K","A","R"]);const syms=["☀","☾","★","◆","▲","●","✿","♥"];const map={};letters.forEach((l,i)=>map[l]=syms[i]);let ans="";
    const render=(bad)=>{box.innerHTML='<div class="ckey">'+letters.map(l=>'<span><i>'+map[l]+'</i>'+l+'</span>').join("")+'</div><p class="muted">Ključ s pločice: svaki znak je jedno slovo.</p><div class="ccode">'+word.split("").map(l=>'<i>'+map[l]+'</i>').join("")+'</div>'+
      '<div class="slots'+(bad?' shake':'')+'">'+word.split("").map((_,i)=>'<span>'+(ans[i]||"")+'</span>').join("")+'</div><div class="keys">'+letters.slice().sort().map(l=>'<button class="btn soft" data-l="'+l+'">'+l+'</button>').join("")+'<button class="btn soft" data-l="<" aria-label="Obriši slovo">⌫</button></div>';
      box.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{const l=b.dataset.l;tone(600,.04,"triangle",.03);if(l==="<")ans=ans.slice(0,-1);else if(ans.length<word.length)ans+=l;
        if(ans.length===word.length){if(ans===word){render();sfx.fanfare();setTimeout(done,700);return;}ans="";render(true);return;}render();});};render();},
  anagram(box,done,P){const word=P.word||"KNJIGA";const L=word.split("");let order;do{order=shuffleR(L.map((_,i)=>i));}while(order.every((v,i)=>v===i));const used=[];
    const render=(bad)=>{box.innerHTML='<div class="slots'+(bad?' shake':'')+'">'+L.map((_,i)=>'<span>'+(used[i]!=null?L[used[i]]:"")+'</span>').join("")+'</div><div class="keys tiles">'+order.map(i=>'<button class="btn soft tile" data-i="'+i+'"'+(used.includes(i)?' disabled':'')+'>'+L[i]+'</button>').join("")+'<button class="btn soft" data-i="-1" aria-label="Obriši slovo">⌫</button></div>';
      box.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;tone(620,.04,"triangle",.03);if(i<0)used.pop();else if(!used.includes(i))used.push(i);
        if(used.length===L.length){const w=used.map(k=>L[k]).join("");if(w===word){render();sfx.fanfare();setTimeout(done,700);return;}used.length=0;render(true);return;}render();});};render();},
  final(box,done,P){PUZ.anagram(box,done,P);}};
function collectPage(i){if(!S.quest||S.quest.got.includes(i))return;S.quest.got.push(i);S.coins+=25;const P=QUEST.pos[i];if(P)for(let k=0;k<4;k++)setTimeout(()=>burst(P.x,P.y,P.z,30,[[1,.85,.3],[1,1,.8],[.9,.6,1]],2.2,2.6,1.1),k*170);
  if(rida)rida.celebrate=1.4;const last=S.quest.got.length>=QN;if(last){S.quest.done=today();}save();renderEco();syncQuest();if(last)questFinale();
  openSheet(chapterHTML(i)+'<p class="qgot">Na poleđini stranice sjaji slovo <b>'+QPAGES[i].L+'</b> · +25 zlatnika</p>'+lettersHTML()+'<button class="btn big" id="chOk">'+(last?'Velika knjiga je cijela!':'Dalje')+'</button>',()=>{
    if(last)setTimeout(finaleSheet,300);else setTimeout(()=>say(rida,"Sljedeća stranica: "+QPAGES[i+1].hint,7500),300);});
  $("chOk").onclick=closeSheet;checkBadges();}
function questFinale(){const y=LIB.h+5,z=LIB.z-2;for(let x=-1;x<=1;x++){setV(LIB.x+x,y,z,0);burst(LIB.x+x+.5,y+.5,z+.5,20,[[1,.9,.5],[1,1,1]],1.5,1.5,1);}
  S.coins+=150;S.tickets=Math.min(12,(S.tickets||0)+3);if(!S.hats.includes("pero"))S.hats.push("pero");save();renderEco();sfx.fanfare();for(let i=0;i<6;i++)setTimeout(()=>burst(LIB.x+.5,LIB.h+16+Math.random()*3,LIB.z+.5,60,[[1,.85,.3],[1,1,.7],[.9,.6,1],[.5,.8,1]],4,3,1.6),i*400);}
function finaleSheet(){openSheet('<div class="story fin"><small>Velika knjiga</small><h2>Čuvarica priča</h2><p>Svih sedam stranica vratilo se u Veliku knjigu, a svjetlo na tornju opet sja punim sjajem.</p><p>Na katu knjižnice otvorila su se tajna vrata. Popni se stepenicama iza stalka i potraži škrinju!</p></div>'+lettersHTML()+
  '<div class="loot"><div><img alt="" src="'+itemIcon("coin")+'">+150 zlatnika</div><div><img alt="" src="'+costumeIconByKey("pero")+'">Pero priče</div><div>+3 karte za igre</div></div><button class="btn big" id="finOk">Hvala!</button>');$("finOk").onclick=closeSheet;}
function costumeIconByKey(k){const c=COSTUMES.find(q=>q.k===k);return c?costumeIcon(c):"";}
/* ---- the diary page for the Great Book ---- */
function questDiaryHTML(){if(!S.quest)return '<div class="story"><small>Velika knjiga</small><h2>Netko zove iz knjižnice</h2><p>U knjižnici na stalku leži Velika knjiga, a iznad krova sja zlatno svjetlo. Uđi u knjižnicu s Ridom i saznaj što se dogodilo!</p></div><button class="btn big" id="qExplore">Istraži s Ridom</button>';
  const got=S.quest.got,a=qActive();
  return lettersHTML()+'<div class="qlist">'+QPAGES.map((p,i)=>got.includes(i)?'<button class="qp on" data-ch="'+i+'"><b>'+(i+1)+'. '+esc(p.title)+'</b><small>Pročitaj poglavlje</small></button>':i===a?'<div class="qp cur"><b>'+(i+1)+'. Sljedeća stranica</b><small>'+esc(p.hint)+'</small></div>':'<div class="qp"><b>'+(i+1)+'. ???</b><small>Još je skrivena.</small></div>').join("")+'</div>'+
    (S.quest.done?'<p class="muted">Velika knjiga je cijela od '+esc(fmtD(S.quest.done))+'. Zagonetka dana čeka te svaki dan kod Velike knjige.</p>':'<p class="muted">Zlatni stup svjetla pokazuje gdje je sljedeća stranica, a na karti u torbi označena je zlatnom zvijezdom.</p>');}
function questDiaryBind(){const B=$("sheetBody");const ex=$("qExplore");if(ex)ex.onclick=()=>{closeSheet();if(!FP.on)$("exploreBtn").click();};
  B.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>{sfx.click();readStory(+b.dataset.ch);});}
/* ---- map star for the page Rida is looking for ---- */
const _mapExtraQ=mapExtra;
mapExtra=function(x,S2,dot){_mapExtraQ(x,S2,dot);const a=qActive();const P=a>=0?QUEST.pos[a]:(!S.quest?{x:LIB.x+.5,z:LIB.z+.5}:null);if(!P)return;const cx=P.x*S2,cz=P.z*S2;x.beginPath();
  for(let i=0;i<10;i++){const r=i%2?5:12,an=-Math.PI/2+i*Math.PI/5;x.lineTo(cx+Math.cos(an)*r,cz+Math.sin(an)*r);}x.closePath();x.fillStyle="#ffd040";x.fill();x.lineWidth=2.5;x.strokeStyle="#16243a";x.stroke();};
/* ---- the golden quill: reward costume ---- */
COSTUMES.push({k:"pero",slot:"glava",n:"Pero priče",req:"quest",need:1,txt:"Vrati sve stranice Velikoj knjizi"});
const _hatMeshQ=hatMesh;
hatMesh=function(k){if(k!=="pero")return _hatMeshQ(k);const g=new THREE.Group(),M=(c,o)=>std(c,o);
  const ber=new THREE.Mesh(new THREE.SphereGeometry(.27,16,8,0,Math.PI*2,0,Math.PI/2),M(0x2a3a8a,{roughness:.8}));ber.scale.set(1.12,.5,1.05);ber.position.set(-.02,0,-.01);ber.rotation.z=.12;g.add(ber);
  const nub=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),M(0x2a3a8a));nub.position.set(-.04,.14,0);g.add(nub);
  const q=new THREE.Group();q.position.set(.2,.04,-.02);q.rotation.set(-.55,0,-.45);g.add(q);const gold=M(0xffc53d,{metalness:.55,roughness:.3,emissive:LC(0x6a4a00),emissiveIntensity:.25});
  const shaft=new THREE.Mesh(new THREE.BoxGeometry(.02,.5,.02),M(0xf6e7b0));shaft.position.y=.22;q.add(shaft);
  for(let i=0;i<7;i++){const w=.03+Math.sin((i+1)/8*Math.PI)*.07;const v=new THREE.Mesh(new THREE.BoxGeometry(w,.06,.012),gold);v.position.set(-w/2-.01,.12+i*.055,0);v.rotation.z=.35;q.add(v);const v2=v.clone();v2.position.x=w/2+.01;v2.rotation.z=-.35;q.add(v2);}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});return g;};
function questInit(){buildQuestWorld();}
/* blocks placed inside the library before it had furniture go back to the bag */
function migrateWorld11(){if((S.worldV||0)>=11)return;const B=S.bag;
  for(const k in S.edits||{}){const p=k.split(",").map(Number);if(Math.abs(p[0]-LIB.x)>5||Math.abs(p[2]-LIB.z)>5||p[1]<LIB.h||p[1]>LIB.h+9)continue;const t=S.edits[k];if(B&&t&&TYPES[t]&&!TYPES[t].water)B[TYPES[t].k]=(B[TYPES[t].k]||0)+1;delete S.edits[k];}
  S.worldV=11;save();}
