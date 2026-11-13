/* =================== HUD & UI =================== */
function renderHUD(){const s=streak(),lv=level();$("streakN").textContent=s;$("streakL").textContent=(s%10===1&&s%100!==11)?"dan zaredom":"dana zaredom";
  $("streakChip").classList.toggle("hot",s>0);$("pagesN").textContent=S.xp;$("who").textContent=S.name||"Čitateljica";
  $("lvlName").textContent="Razina "+lv+" · "+LEVELS[Math.min(lv,LEVELS.length-1)];const a=20*(lv-1)*(lv-1),b=20*lv*lv;$("xpBar").style.width=Math.round(100*(S.xp-a)/(b-a))+"%";
  $("readBtn").classList.toggle("pulse",!S.days[today()]);renderEco();}
let toastT=0;function toast(t,ms){const el=$("toast");el.textContent=t;el.hidden=false;el.style.animation="none";void el.offsetWidth;el.style.animation="";clearTimeout(toastT);toastT=setTimeout(()=>el.hidden=true,ms||3200);}
let bubbleE=null,bubbleT=0;
function say(e,text,ms){if(!e)return;bubbleE=e;$("bubble").innerHTML="<b>"+esc(e.name)+"</b>"+esc(text);$("bubble").hidden=false;bubbleT=ms||5000;}
const v3=new THREE.Vector3();
function tickBubble(dt){if(!bubbleE)return;if(!$("veil").hidden){$("bubble").style.opacity=0;return;}bubbleT-=dt*1000;if(bubbleT<=0){$("bubble").hidden=true;bubbleE=null;return;}
  v3.set(bubbleE.x,bubbleE.y+1.7,bubbleE.z).project(camera);const el=$("bubble");if(v3.z>1){el.style.opacity=0;return;}el.style.opacity=1;
  const hw=Math.min(innerWidth/2,(el.offsetWidth||280)/2+12);el.style.left=Math.max(hw,Math.min(innerWidth-hw,(v3.x+1)/2*innerWidth))+"px";const fpe=typeof FP!=="undefined"&&FP.on?document.querySelector(".fptop"):null;let fpt=fpe?fpe.getBoundingClientRect().bottom+18:24;const tst=document.getElementById("toast");if(tst&&!tst.hidden){const tb=tst.getBoundingClientRect();if(tb.height)fpt=Math.max(fpt,tb.bottom+18);}el.style.top=Math.max(fpt+el.offsetHeight,(1-v3.y)/2*innerHeight)+"px";}
let sheetClose=null;
function openSheet(html,onClose){$("sheetBody").innerHTML=html;$("veil").hidden=false;$("sheet").scrollTop=0;sheetClose=onClose||null;const f=$("sheetBody").querySelector("input,textarea");setTimeout(()=>{if(f&&!small)f.focus();},50);}
function closeSheet(){$("veil").hidden=true;const f=sheetClose;sheetClose=null;if(f)f();}
$("sheetX").onclick=()=>{sfx.click();closeSheet();};
$("veil").addEventListener("click",e=>{if(e.target===$("veil"))closeSheet();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("veil").hidden)closeSheet();});
const RIDA_SVG='<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M2 1h3v1h1v2h4V2h1V1h3v6h1v4h-1v2h-2v1h-2v1H6v-1H4v-1H2v-2H1V7h1z"/><path fill="#e8772e" d="M3 2h1v1h1v2h6V3h1V2h1v5h1v3h-1v2h-2v1H5v-1H3v-2H2V7h1z"/><path fill="#16243a" d="M3 2h1v1H3zM12 2h1v1h-1z"/><path fill="#fff4e6" d="M4 9h3v1h2V9h3v2h-1v1h-1v1H6v-1H5v-1H4z"/><path fill="#16243a" d="M5 7h1v1H5zM10 7h1v1h-1zM7 11h2v1H7z"/></svg>';
function star(on){return '<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="'+(on?"#ffc53d":"#e2dccd")+'" stroke="#16243a" stroke-width=".6" d="M5 .5l1.3 3h3.2L7 5.5l1 3.5L5 7.2 2 9l1-3.5L.5 3.5h3.2z"/></svg>';}

$("readBtn").onclick=()=>{sfx.click();sheetRead();};
function bookCard(b){const G=GENRES[b.genre],pct=b.done?100:Math.round(100*b.page/b.pages);
  return '<button class="bookc" data-id="'+b.id+'"><span class="sw" style="background:'+G.col+'"></span><b>'+esc(b.title)+'</b><span class="pct">'+pct+'%</span><small>'+esc(bldName(b))+' · stranica '+b.page+' od '+b.pages+'</small></button>';}
function sheetRead(){const curB=S.books.filter(b=>!b.done);const full=S.books.length>=PLOTS.length;
  openSheet('<h2>Što si čitala?</h2>'+(curB.length?'<p class="muted">Odaberi knjigu i upiši do koje si stranice stigla.</p><div class="books">'+curB.map(bookCard).join("")+'</div>':'<div class="rida">'+RIDA_SVG+'<div class="say">Dodaj knjigu koju sada čitaš. Na otoku će odmah niknuti temelji njezine građevine!</div></div>')+
    (full?'<p class="muted">Svih '+PLOTS.length+' mjesta na otoku je zauzeto. Sva su mjesta puna!</p>':'<button class="btn green" id="newBook">Nova knjiga</button>'));
  $("sheetBody").querySelectorAll(".bookc").forEach(c=>c.onclick=()=>{sfx.click();sheetProgress(S.books.find(b=>b.id===c.dataset.id));});
  const nb=$("newBook");if(nb)nb.onclick=()=>{sfx.click();sheetNewBook();};}
function sheetNewBook(){let genre=null;const used=S.books.map(b=>b.genre);
  openSheet('<h2>Nova knjiga</h2><div class="field"><label for="nbT">Naslov</label><input type="text" id="nbT" maxlength="70" autocomplete="off" placeholder="npr. Čudnovate zgode šegrta Hlapića"></div>'+
   '<div class="field"><label for="nbA">Autor (ako znaš)</label><input type="text" id="nbA" maxlength="50" autocomplete="off"></div>'+
   '<div class="field"><label for="nbP">Koliko knjiga ima stranica?</label><input type="number" id="nbP" min="5" max="3000" inputmode="numeric" placeholder="npr. 180"></div>'+
   '<div class="field"><span class="lbl">Kakva je to knjiga? Od toga ovisi što će izrasti na otoku.</span><div class="genres">'+
   Object.keys(GENRES).map(k=>{const G=GENRES[k];return '<button class="genre" data-g="'+k+'" aria-pressed="false"><i style="background:'+G.col+'"></i><b>'+G.n+'</b><span>'+G.place+(used.includes(k)?" (još jedna!)":"")+'</span><span>'+G.d+'</span></button>';}).join("")+'</div></div>'+
   '<p class="err" id="nbErr" hidden></p><button class="btn big" id="nbGo">Posadi knjigu</button>');
  $("sheetBody").querySelectorAll(".genre").forEach(g=>g.onclick=()=>{sfx.click();genre=g.dataset.g;$("sheetBody").querySelectorAll(".genre").forEach(x=>x.setAttribute("aria-pressed",String(x===g)));});
  $("nbGo").onclick=()=>{const t=$("nbT").value.trim(),p=parseInt($("nbP").value,10);const err=m=>{$("nbErr").textContent=m;$("nbErr").hidden=false;};
    if(!t)return err("Upiši naslov knjige.");if(!(p>=5&&p<=3000))return err("Upiši broj stranica (barem 5).");if(!genre)return err("Odaberi kakva je knjiga.");
    const order=PLOTS.map((_,i)=>i).sort((a,b)=>Math.abs(Math.sin(PLOTS[a].a-HOMEA))-Math.abs(Math.sin(PLOTS[b].a-HOMEA)));
    const free=order.find(i=>!S.books.some(b=>b.plot===i));if(free==null)return err("Na otoku više nema mjesta.");
    const b={id:"b"+Date.now().toString(36),title:t,author:$("nbA").value.trim(),pages:p,page:0,genre,plot:free,started:today(),done:false,stars:0};
    S.books.push(b);save();closeSheet();shown[b.id]=0;sfx.chime();paveFor(b);
    const plot=PLOTS[free];flyTo(plot.x+.5,plot.h+3,plot.z+.5,38);ridaGo(plot,()=>say(rida,"Ovdje će niknuti "+GENRES[genre].place+"! Što više čitaš, to više raste.",6000));
    setTimeout(()=>growBook(b,()=>{syncSigns();renderHUD();}),1500);syncSigns();};}
function sheetProgress(b){const G=GENRES[b.genre];
  openSheet('<h2>'+esc(b.title)+'</h2><p class="muted">'+esc(bldName(b))+(b.author?' · '+esc(b.author):'')+'</p><div class="prog"><i style="width:'+Math.round(100*b.page/b.pages)+'%;background:'+G.col+'"></i></div>'+
   '<div class="field"><label for="pgIn">Do koje si stranice stigla? (knjiga ima '+b.pages+')</label><div class="stepper"><button class="btn soft" id="pgM" aria-label="Manje">−</button><input type="number" id="pgIn" min="'+b.page+'" max="'+b.pages+'" value="'+Math.min(b.pages,b.page+10)+'" inputmode="numeric"><button class="btn soft" id="pgP" aria-label="Više">+</button></div></div>'+
   '<div class="quick"><button data-d="5">+5</button><button data-d="10">+10</button><button data-d="20">+20</button><button data-d="50">+50</button><button data-end="1">Do kraja!</button></div>'+
   '<p class="err" id="pgErr" hidden></p><button class="btn big" id="pgGo">Gradi!</button>');
  const inp=$("pgIn");const clamp=v=>Math.max(b.page,Math.min(b.pages,v));
  $("pgM").onclick=()=>{inp.value=clamp((+inp.value||0)-1);};$("pgP").onclick=()=>{inp.value=clamp((+inp.value||0)+1);};
  $("sheetBody").querySelectorAll(".quick button").forEach(q=>q.onclick=()=>{sfx.click();inp.value=q.dataset.end?b.pages:clamp(b.page+(+q.dataset.d));});
  $("pgGo").onclick=()=>{const v=parseInt(inp.value,10);if(!(v>b.page)){$("pgErr").textContent="Upiši stranicu veću od "+b.page+".";$("pgErr").hidden=false;return;}
    const np=Math.min(v,b.pages),delta=np-b.page,oldLv=level();b.page=np;S.xp+=delta;const t=today(),first=!S.days[t];S.days[t]=true;earnPages(delta,oldLv);if(first)G2.bonusT=bonusTreasures();if(np>=b.pages)b.done=true;b.lastRead=t;save();closeSheet();
    const plot=PLOTS[b.plot];flyTo(plot.x+.5,plot.h+3,plot.z+.5,34);ridaGo(plot);
    setTimeout(()=>growBook(b,()=>{syncSigns();renderHUD();if(b.done)finishBook(b);else setTimeout(()=>askQuestion(b,delta,first,oldLv),600);}),1300);};}
function plural(n){return n%10===1&&n%100!==11?"stranica":(n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?"stranice":"stranica");}
function askQuestion(b,delta,first,oldLv){if(!$("veil").hidden){afterRead();return;}sfx.chime();rida&&(rida.celebrate=1.2);const q=QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];const lvUp=level()>oldLv;
  openSheet('<h2>+'+delta+' '+plural(delta)+'!</h2>'+earnLine()+(lvUp?'<p style="font-family:var(--display);font-size:1.25rem;color:var(--leaf-dk)">Nova razina: '+level()+' · '+LEVELS[Math.min(level(),LEVELS.length-1)]+'</p>':'')+
    (first&&streak()>1?'<p class="muted">Već '+streak()+' dana zaredom. Svjetlo na knjižnici sjaji jače!</p>':'')+
    '<div class="rida">'+RIDA_SVG+'<div class="say">'+esc(q)+'</div></div><div class="field"><label for="ansIn">Tvoj odgovor</label><textarea id="ansIn" maxlength="600"></textarea></div>'+
    '<div class="row"><button class="btn green" id="ansGo">Pošalji Ridi</button><button class="btn soft" id="ansNo">Možda drugi put</button></div>',()=>afterRead());
  $("ansGo").onclick=()=>{const v=$("ansIn").value.trim();if(v){S.answers.push({book:b.id,q,a:v,d:today()});bump("ans",1);save();}closeSheet();if(v)say(rida,"Hvala! Spremila sam to u tvoj dnevnik.",4000);};$("ansNo").onclick=()=>closeSheet();}
function finishBook(b){sfx.fanfare();const plot=PLOTS[b.plot];syncSpecials();
  for(let i=0;i<7;i++)setTimeout(()=>burst(plot.x+.5+(Math.random()-.5)*8,plot.h+13+Math.random()*4,plot.z+.5+(Math.random()-.5)*8,80,[[1,.3,.4],[1,.85,.2],[.4,.8,1],[.6,1,.5],[.9,.5,1]],5,3,1.8,4),i*380);
  rida&&(rida.celebrate=3);let stars=0;
  giveN("dijamant",1);giveN("zeljezo",3);
  openSheet('<h2>Knjiga pročitana!</h2>'+earnLine()+'<div class="bagline"><span>Knjiški dar za alate:</span><i><img alt="" src="'+itemIcon("dijamant")+'">+1 Dijamant</i><i><img alt="" src="'+itemIcon("zeljezo")+'">+3 Željezo</i></div>'+'<p><b>'+esc(b.title)+'</b> sada stoji na otoku kao '+esc(bldName(b))+'.</p>'+
   '<div class="field"><span class="lbl">Koliko zvjezdica daješ knjizi?</span><div class="stars" id="stars">'+[1,2,3,4,5].map(i=>'<button data-s="'+i+'" aria-label="'+i+' zvjezdica">'+star(false)+'</button>').join("")+'</div></div>'+
   '<div class="field"><label for="recIn">Kome bi je preporučila i zašto?</label><textarea id="recIn" maxlength="600"></textarea></div><button class="btn big" id="finGo">Spremi</button>',()=>{afterRead();});
  const paint2=()=>$("stars").querySelectorAll("button").forEach(x=>x.innerHTML=star(+x.dataset.s<=stars));
  $("stars").querySelectorAll("button").forEach(x=>x.onclick=()=>{stars=+x.dataset.s;sfx.click();paint2();});
  $("finGo").onclick=()=>{b.stars=stars;const v=$("recIn").value.trim();if(v)S.answers.push({book:b.id,q:"Kome bi preporučila ovu knjigu?",a:v,d:today()});save();syncSigns();closeSheet();};}
let lastUnlocked=null;
function unlockList(){return PALETTE.filter(p=>!p[1]||p[1]()).map(p=>p[0]);}
function unlockCheck(){const now=unlockList();if(lastUnlocked){const nw=now.filter(k=>!lastUnlocked.includes(k));if(nw.length){const B=bag();nw.forEach(k=>B[k]=(B[k]||0)+10);save();if($("veil").hidden){
  openSheet('<h2>Nove kockice!</h2><p>Pročitana knjiga otkrila je nove kockice za gradnju. U torbi te čeka po 10 komada:</p><div class="loot">'+nw.map(k=>'<div><img alt="" src="'+icon(ID[k])+'">'+esc(TYPES[ID[k]].n)+'</div>').join("")+'</div><button class="btn big" id="okU">Super!</button>');
  sfx.chime();$("okU").onclick=closeSheet;}}}lastUnlocked=now;}
function afterRead(){renderHUD();unlockCheck();}
function ridaGo(plot,cb){if(!rida)return;for(let i=0;i<12;i++){const a=Math.random()*Math.PI*2;const tx=plot.x+.5+Math.cos(a)*6.5,tz=plot.z+.5+Math.sin(a)*6.5;if(walkable(tx,tz)==null)continue;
    if(Math.hypot(rida.x-tx,rida.z-tz)>14){rida.x=tx+Math.cos(a)*3;rida.z=tz+Math.sin(a)*3;const y=walkable(rida.x,rida.z);if(y==null){rida.x=tx;rida.z=tz;rida.y=walkable(tx,tz);}else rida.y=y;}
    rida.goto={x:tx,z:tz,force:true};rida.arrive=cb||null;return;}cb&&cb();}
function nextVisitor(){const s=Math.max(streak(),0);return VISITORS.find(v=>!S.visitors.includes(v.k)&&v.min<=s);}
function arrive(V){S.visitors.push(V.k);save();syncVisitors();const e=ents.find(x=>x.kind===V.k);
  setTimeout(()=>{if(e){flyTo(e.x,e.y+1,e.z,22);say(e,"Bok! Ja sam "+V.n+". "+V.d,6500);sfx.chime();burst(e.x,e.y+1,e.z,40,[[1,.9,.4],[1,1,1]],2,2,1);}toast("Na otok je stigao novi posjetitelj: "+V.n+"!");},1400);}

$("diaryBtn").onclick=()=>{sfx.click();sheetDiary("knjige");};
function sheetDiary(tab){
  const tabs='<div class="tabs" role="tablist">'+[["knjige","Knjige"],["odgovori","Odgovori"],["posjetitelji","Posjetitelji"]].map(t=>'<button role="tab" data-t="'+t[0]+'" aria-selected="'+(t[0]===tab)+'">'+t[1]+'</button>').join("")+'</div>';let body="";
  if(tab==="knjige"){body=S.books.length?'<div class="books">'+S.books.slice().reverse().map(b=>bookCard(b)+(b.done&&b.stars?'<div class="stars" style="margin:-4px 0 4px 14px;transform:scale(.6);transform-origin:left">'+[1,2,3,4,5].map(i=>star(i<=b.stars)).join("")+'</div>':"")).join("")+'</div>':'<p class="muted">Još nema knjiga. Pritisni „Čitala sam!“ i dodaj prvu.</p>';
    body+='<p class="muted">Ukupno '+S.xp+' pročitanih stranica, '+finished().length+' knjiga do kraja, '+Object.keys(S.days).length+' dana čitanja.</p>';}
  if(tab==="odgovori")body=S.answers.length?S.answers.slice().reverse().map(a=>{const b=S.books.find(x=>x.id===a.book);return '<div class="ans"><small>'+esc(a.d)+' · '+esc(b?b.title:"")+'</small><b>'+esc(a.q)+'</b><p>'+esc(a.a)+'</p></div>';}).join(""):'<p class="muted">Ovdje se skupljaju tvoji odgovori na Ridina pitanja.</p>';
  if(tab==="posjetitelji")body='<div class="vgrid">'+VISITORS.map(v=>S.visitors.includes(v.k)?'<div class="vis"><b>'+esc(v.n)+'</b><span>'+esc(v.d)+'</span></div>':'<div class="vis no"><b>???</b><span>'+(v.min?"Dolazi kad čitaš "+v.min+" "+(v.min===1?"dan":"dana")+" zaredom.":"Dolazi uskoro.")+'</span></div>').join("")+'</div><p class="muted">Svaki novi dan na otok može doći netko novi.</p>';
  openSheet('<h2>Moj dnevnik</h2>'+tabs+body);
  $("sheetBody").querySelectorAll("[role=tab]").forEach(t=>t.onclick=()=>{sfx.click();sheetDiary(t.dataset.t);});
  $("sheetBody").querySelectorAll(".bookc").forEach(c=>c.onclick=()=>{const b=S.books.find(x=>x.id===c.dataset.id);closeSheet();const p=PLOTS[b.plot];flyTo(p.x+.5,p.h+3,p.z+.5,32);if(!b.done)setTimeout(()=>sheetProgress(b),1500);});}
function openLetter(){const l=S.letters.find(x=>!x.read);if(!l)return;sfx.splash();if(bottle)burst(bottle.position.x,WATER+.3,bottle.position.z,40,[[.8,.95,1],[1,1,1]],2,2.5,.9);
  openSheet('<h2>Poruka u boci</h2><div class="letter">'+esc(l.text)+'<span class="from">'+esc(l.from)+'</span></div><button class="btn big" id="lOk">Spremi pismo</button>',()=>{l.read=true;save();syncBottle();});$("lOk").onclick=closeSheet;}
$("parentBtn").onclick=()=>{sfx.click();openSheet('<h2>Kutak za roditelje</h2><div class="field"><label for="gIn">Za ulaz riješite: 17 × 23 = ?</label><div class="row"><input type="number" id="gIn" style="max-width:140px" inputmode="numeric"><button class="btn" id="gGo">Uđi</button></div></div><p class="err" id="gErr" hidden>Nije točno.</p>');
  const go=()=>{if($("gIn").value.trim()==="391")sheetParents();else $("gErr").hidden=false;};$("gGo").onclick=go;$("gIn").onkeydown=e=>{if(e.key==="Enter")go();};};
function sheetParents(){const sent=S.letters.filter(l=>l.from!=="Tvoja Rida");
  openSheet('<h2>Kutak za roditelje</h2><div class="field"><label for="pN">Ime djeteta</label><input type="text" id="pN" maxlength="30" value="'+esc(S.name)+'"></div>'+
   '<div class="field"><label for="pL">Pošaljite poruku u boci</label><textarea id="pL" maxlength="800" placeholder="Boca će doplutati do otoka. Kad je otvori, pročitat će vašu poruku."></textarea></div>'+
   '<div class="field"><label for="pF">Potpis</label><input type="text" id="pF" maxlength="30" value="'+esc(S.sig||"")+'" placeholder="npr. Tata, Mama, Baka"></div>'+
   '<div class="row"><button class="btn green" id="pSave">Spremi i pošalji</button><span class="muted" id="pNote"></span></div>'+
   (sent.length?'<p class="muted">Poslane poruke: '+sent.length+', pročitane: '+sent.filter(l=>l.read).length+'.</p>':'')+
   '<p class="muted">Ukupno '+S.xp+' stranica, '+finished().length+' pročitanih knjiga, '+Object.keys(S.days).length+' dana čitanja, '+S.answers.length+' odgovora u dnevniku (vidljivi u Dnevniku).</p>'+
   '<p class="muted">Igre: '+S.tickets+' '+kart(S.tickets)+', '+S.coins+' zlatnika. Karte za igre zarađuju se samo čitanjem (10 stranica = 1 karta) i jedna besplatna dnevno, najviše 12 odjednom.</p>'+
   '<div class="field"><label>Sigurnosna kopija napretka</label><p class="muted" style="margin:0 0 8px">Spremite napredak u datoteku na računalo. Iz nje ga uvijek možete vratiti, i na drugom uređaju.'+(saveOk?'':' <b style="color:#d8504f">Preglednik trenutno ne sprema napredak, zato ga sada spremite u datoteku!</b>')+'</p>'+
   '<div class="row"><button class="btn green" id="pExp">Spremi u datoteku</button><button class="btn soft" id="pCopy">Kopiraj kao tekst</button><button class="btn soft" id="pImp">Vrati iz datoteke</button><input type="file" id="pFile" accept=".json,application/json,text/plain" hidden></div>'+
   '<details style="margin-top:8px"><summary class="muted">Vrati iz kopiranog teksta</summary><textarea id="pPaste" placeholder="Ovdje zalijepite tekst napretka" style="margin-top:6px"></textarea><button class="btn soft" id="pPasteGo" style="margin-top:6px">Provjeri tekst</button></details>'+
   '<div id="pImpBox"></div></div>'+
   '<div class="field"><label for="pR">Obriši sav napredak: upišite OBRIŠI</label><div class="row"><input type="text" id="pR" style="max-width:160px"><button class="btn red" id="pRGo">Obriši</button></div></div>');
  $("pSave").onclick=()=>{S.name=$("pN").value.trim().slice(0,30);const t=$("pL").value.trim();S.sig=$("pF").value.trim().slice(0,30);
    if(t){S.letters.push({id:"l"+Date.now(),text:t,from:S.sig||"Netko tko te voli",d:today(),read:false});$("pL").value="";}save();renderHUD();syncBottle();$("pNote").textContent=t?"Poruka je poslana. Boca pluta prema otoku.":"Spremljeno.";};
  parentBackupUI();
  $("pRGo").onclick=()=>{if(!["OBRIŠI","LÖSCHEN"].includes($("pR").value.trim().toUpperCase())){$("pNote").textContent="Za brisanje upišite OBRIŠI.";return;}try{if(typeof keepBefore==="function")keepBefore(S);}catch(e){}S=fresh();S.resetAt=Date.now();save();try{localStorage.removeItem(KEY);localStorage.removeItem("otok-prica-3d-v1");}catch(e){}if(remote)remote.set({json:JSON.stringify(S),updatedAt:S.updatedAt}).finally(()=>location.reload());else location.reload();};}

/* backup: export the whole save as a file or text, and bring it back after a check */
function backupName(){return "otok-prica-napredak-"+(S.name?S.name.replace(/[^a-zA-Z0-9čćžšđČĆŽŠĐ]+/g,"-")+"-":"")+today()+".json";}
function parentBackupUI(){const note=t=>{$("pNote").textContent=t;};
  $("pExp").onclick=async()=>{save();let dl=null;try{if(window.claude&&window.claude.use)dl=await Promise.race([window.claude.use("downloads"),new Promise(r=>setTimeout(()=>r(null),3000))]);}catch(e){dl=null;}
    if(dl){try{await dl.save({filename:backupName(),data:JSON.stringify(S)});note("Napredak je spremljen u datoteku "+backupName()+".");}catch(e){note(e&&e.code==="declined"?"Spremanje je otkazano.":"Spremanje datoteke ovdje ne radi. Koristite Kopiraj kao tekst.");}return;}
    try{const b=new Blob([JSON.stringify(S)],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=backupName();document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);
      note("Datoteka "+backupName()+" se sprema. Ako se ništa ne dogodi, koristite Kopiraj kao tekst.");}catch(e){note("Spremanje datoteke nije uspjelo. Koristite Kopiraj kao tekst.");}};
  $("pCopy").onclick=()=>{const t=JSON.stringify(S);const done=()=>note("Napredak je kopiran. Zalijepite ga u bilješke ili e-poštu i spremite.");
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(done,()=>{$("pPaste").value=t;$("pPaste").closest("details").open=true;$("pPaste").select();note("Tekst je označen ispod. Kopirajte ga ručno (Ctrl+C).");});
    else{$("pPaste").value=t;$("pPaste").closest("details").open=true;$("pPaste").select();note("Tekst je označen ispod. Kopirajte ga ručno (Ctrl+C).");}};
  $("pImp").onclick=()=>$("pFile").click();
  $("pFile").onchange=()=>{const f=$("pFile").files[0];if(!f)return;const r=new FileReader();r.onload=()=>backupCheck(String(r.result));r.onerror=()=>note("Datoteku nije moguće pročitati.");r.readAsText(f);};
  $("pPasteGo").onclick=()=>backupCheck($("pPaste").value);}
function backupCheck(txt){const box=$("pImpBox");let o=null;try{o=JSON.parse(String(txt||"").trim());}catch(e){}
  if(!o||typeof o!=="object"||!Array.isArray(o.books)||typeof o.xp!=="number"){box.innerHTML='<p class="err">To nije ispravna datoteka napretka Otoka priča.</p>';return;}
  const fin=o.books.filter(b=>b&&b.done).length;
  box.innerHTML='<div class="card" style="padding:10px 12px;margin-top:10px"><p style="margin:0 0 8px"><b>Pronađeni napredak:</b> '+esc(o.name||"bez imena")+', '+o.xp+' stranica, '+fin+' pročitanih knjiga, '+(o.coins||0)+' zlatnika'+(o.updatedAt?', spremljeno '+esc(new Date(o.updatedAt).toLocaleString("hr-HR")):'')+'.</p>'+
    '<p class="muted" style="margin:0 0 8px">Trenutni napredak ('+S.xp+' stranica) bit će zamijenjen ovim. Trenutni napredak prvo spremite u datoteku ako ga želite sačuvati.</p><button class="btn green" id="pImpGo">Da, vrati ovaj napredak</button></div>';
  $("pImpGo").onclick=()=>{try{if(typeof keepBefore==="function")keepBefore(S);}catch(e){}S=migrate(o);S.updatedAt=Date.now();S.resetAt=S.updatedAt;save();try{localStorage.setItem(KEY+"-bak",JSON.stringify(S));localStorage.setItem(KEY+"-bakd",today());}catch(e){}
    $("pImpGo").disabled=true;$("pImpGo").textContent="Učitavam...";const go=()=>location.reload();if(remote)remote.set({json:JSON.stringify(S),updatedAt:S.updatedAt}).then(go,go);else setTimeout(go,300);};}

/* build mode */
let mode="look",sel=T.trava,placeMode=true;
const ghost=new THREE.Group();{const gm=new THREE.Mesh(new THREE.BoxGeometry(1.02,1.02,1.02),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.25,depthWrite:false}));
  const ge=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.04,1.04,1.04)),new THREE.LineBasicMaterial({color:0xffffff}));ghost.add(gm,ge);ghost.visible=false;scene.add(ghost);}
function bag(){return S.bag||(S.bag={});}
function blab(){return TYPES[sel].n+" · u torbi: "+(bag()[TYPES[sel].k]||0);}
function renderPalette(){const un=unlockList(),B=bag();const BASIC=["daske","kamen","zemlja","trava","pijesak"];const html=PALETTE.filter(p=>(B[p[0]]||0)>0||(p[1]&&!p[1]())||BASIC.includes(p[0])).map(p=>{const k=p[0],ok=un.includes(k),n=B[k]||0;return '<button class="slot'+(ok?"":" locked")+(ok&&!n?" empty":"")+'" data-k="'+k+'" aria-pressed="'+(ID[k]===sel)+'" aria-label="'+esc(TYPES[ID[k]].n)+(ok?", u torbi "+n:", zaključano")+'" title="'+esc(ok?TYPES[ID[k]].n+" ("+n+")":p[2])+'"><img alt="" src="'+icon(ID[k])+'">'+(ok?'<span class="cnt">'+n+'</span>':'')+'</button>';}).join("");
  ["palette","fpPal"].forEach(id=>{const el=$(id);if(!el)return;el.innerHTML=html;el.querySelectorAll(".slot").forEach(b=>b.onclick=()=>{const p=PALETTE.find(x=>x[0]===b.dataset.k);
    if(b.classList.contains("locked")){$("blabel").textContent="Zaključano: "+p[2];if(FP.on)toast(TYPES[ID[p[0]]].n+": "+p[2].toLowerCase()+".",2600);sfx.click();return;}
    sel=ID[b.dataset.k];setPlace(true);renderPalette();sfx.click();if(id==="fpPal")$("fpPal").hidden=true;fpTools();});});
  $("blabel").textContent=placeMode?blab():"Ruši: dodirni kockicu i vrati je u torbu";}
function setPlace(v){placeMode=v;$("modePlace").setAttribute("aria-pressed",String(v));$("modeRemove").setAttribute("aria-pressed",String(!v));$("blabel").textContent=v?blab():"Ruši: dodirni kockicu i vrati je u torbu";}
$("buildBtn").onclick=()=>{sfx.click();mode="build";$("mainBar").hidden=true;$("buildBar").hidden=false;renderPalette();controls.autoRotate=false;
  if(camera.position.distanceTo(controls.target)>60){const tg=rida?new THREE.Vector3(rida.x,rida.y,rida.z):HOME.t;flyTo(tg.x,tg.y,tg.z,30);}toast("Dodirni otok da postaviš kockicu iz torbe. Povuci za pomicanje pogleda, a dva prsta ili desna tipka miša okreću.",5500);};
$("buildDone").onclick=()=>{sfx.click();mode="look";$("mainBar").hidden=false;$("buildBar").hidden=true;ghost.visible=false;};
$("modePlace").onclick=()=>{setPlace(true);sfx.click();};$("modeRemove").onclick=()=>{setPlace(false);sfx.click();};

/* input */
const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
function setNdc(e){const r=renderer.domElement.getBoundingClientRect();ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,camera);}
function voxHit(){const h=ray.intersectObjects(chunkMeshes,false)[0];if(!h||!h.face)return null;const n=h.face.normal,p=h.point;
  return {inside:[Math.floor(p.x-n.x*.5),Math.floor(p.y-n.y*.5),Math.floor(p.z-n.z*.5)],out:[Math.floor(p.x+n.x*.5),Math.floor(p.y+n.y*.5),Math.floor(p.z+n.z*.5)]};}
let down=null;
renderer.domElement.addEventListener("pointerdown",e=>{if(e.button!==0||controls.multi){down=null;return;}down={x:e.clientX,y:e.clientY,t:performance.now()};});
renderer.domElement.addEventListener("pointerup",e=>{if(!down||controls.multi){down=null;return;}const moved=Math.hypot(e.clientX-down.x,e.clientY-down.y),dt=performance.now()-down.t;down=null;if(moved>8||dt>500)return;tap(e);});
renderer.domElement.addEventListener("pointermove",e=>{if(mode!=="build"||e.pointerType!=="mouse")return;setNdc(e);const h=voxHit();if(!h){ghost.visible=false;return;}const c=placeMode?h.out:h.inside;ghost.visible=true;ghost.position.set(c[0]+.5,c[1]+.5,c[2]+.5);ghost.children[1].material.color.set(placeMode?0xffffff:0xff5a6e);});
const popIn=[];
function tap(e){if(mode==="game")return;setNdc(e);
  if(mode==="look"){if(tapTreasure(e))return;const objs=ents.filter(x=>x.g.visible).map(x=>x.g).concat(tapObjs.filter(o=>o.visible));if(bottle)objs.push(bottle);const h=ray.intersectObjects(objs,true)[0];
    if(h){let o=h.object;while(o&&!o.userData.ent&&!o.userData.bottle&&!o.userData.onTap)o=o.parent;if(o&&o.userData.bottle){openLetter();return;}if(o&&o.userData.onTap){o.userData.onTap();return;}
      if(o&&o.userData.ent){const en=o.userData.ent;sfx.click();if(en===rida)ridaTalk();else if(typeof animalTap==="function"&&animalTap(en,false))return;else{const V=VISITORS.find(v=>v.k===en.kind);say(en,V?V.d:"Bok!",4500);en.celebrate=.6;bump("greet",1);}return;}}
    const sh=ray.intersectObjects(Object.values(signs),false)[0];if(sh){const b=S.books.find(x=>x.id===sh.object.userData.book);if(b&&!b.done)sheetProgress(b);else if(b)toast(b.title+": pročitano!");}return;}
  const h=voxHit();if(!h)return;
  if(placeMode)placeAt(h.out);else removeAt(h.inside);}
function placeAt(c){if(!inb(c[0],c[1],c[2]))return false;const cur=get(c[0],c[1],c[2]);if(cur&&!TYPES[cur].water)return false;
  if(rida&&Math.floor(rida.x)===c[0]&&Math.floor(rida.z)===c[2]&&Math.abs(rida.y-c[1])<1.5){say(rida,"Ej, tu stojim ja!",2000);return false;}
  const k=TYPES[sel].k,B=bag();if(!(B[k]>0)){sfx.click();toast("U torbi više nema kockica „"+TYPES[sel].n+"“. Svakih 10 pročitanih stranica donosi nove, a što srušiš vraća se u torbu.",5200);return false;}
  B[k]--;S.edits[c.join(",")]=sel;setV(c[0],c[1],c[2],sel);bump("blocks",1);sfx.pop();burst(c[0]+.5,c[1]+.1,c[2]+.5,8,[avgColor(sel)],1.3,1.6,.45);
  const m=new THREE.Mesh(blockGeo(sel),matFor(sel));m.position.set(c[0]+.5,c[1]+.5,c[2]+.5);m.scale.setScalar(.3);scene.add(m);popIn.push({m,t:0});renderPalette();fpTools();save();return true;}
function removeAt(c){const t=get(c[0],c[1],c[2]);if(!t||c[1]===0||TYPES[t].water)return false;const why=protectWhy(c);if(why){sfx.click();toast(why,3200);return false;}
  const info=breakInfo(t);if(!info.ok){sfx.click();toast(TYPES[t].n+": treba "+(info.need>1?TIERS[info.need].toLowerCase()+" ili bolji ":"")+"kramp. Napravi ga u radionici!",3600);return false;}
  mineBlock(c);renderPalette();return true;}
function removeAtOld(c){const t=get(c[0],c[1],c[2]);if(!t||c[1]===0||TYPES[t].water)return false;const key=c.join(","),mk=mask[c[0]+c[2]*W];
  if(!S.edits[key]&&(mk===1||mk===4)){sfx.click();toast(mk===4?"Knjižnica je čarobna i ne može se srušiti.":c[1]<hmap[c[0]+c[2]*W]?"Ovo tlo čuva mjesto za građevine iz tvojih knjiga.":"Ovo je sagradila tvoja knjiga i ne može se srušiti.",3200);return false;}
  const B=bag(),k=TYPES[t].k;B[k]=(B[k]||0)+1;
  if(baseWater.has(key)){delete S.edits[key];setV(c[0],c[1],c[2],T.voda);}else{S.edits[key]=0;setV(c[0],c[1],c[2],0);}
  sfx.pop();burst(c[0]+.5,c[1]+.5,c[2]+.5,14,[avgColor(t)],2,2,.6);renderPalette();fpTools();save();return true;}
function tickPop(dt){for(let i=popIn.length-1;i>=0;i--){const p=popIn[i];p.t+=dt;const k=Math.min(1,p.t/.18);const s=.3+.75*k-(k>.8?(k-.8)*.25:0);p.m.scale.set(s,s,s);if(p.t>.2){scene.remove(p.m);popIn.splice(i,1);}}}
function ridaTalk(){rida.celebrate=.5;const s=streak(),t=today(),reading=S.books.find(b=>!b.done);let line;
  if(!S.books.length)line="Pritisni veliki gumb „Čitala sam!“ i dodaj knjigu koju čitaš. Ja ću paziti na gradilište!";
  else if(!S.days[t]&&reading)line="Danas još nismo čitale. Koliko stranica „"+reading.title+"“ ćeš pročitati?";
  else if(s>=2&&Math.random()<.4)line="Već "+s+" dana zaredom! Vidiš kako svjetlo na knjižnici sjaji?";
  else if(reading&&Math.random()<.4)line="Jedva čekam vidjeti kako će izgledati "+bldName(reading)+" kad je dovršiš!";
  else line=RIDA_IDLE[Math.floor(Math.random()*RIDA_IDLE.length)];say(rida,line,6000);}

