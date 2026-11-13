/* ===== v24: Album otkrića + kvizovi =====
   Pages are discovered by meeting animals and visiting places in every world. The first fact of a page is free;
   the other two are revealed with a magnifier (lupa), and a lupa is earned for every 10 pages read.
   Animals with a "?" above their head ask a question about a fact Dorotea has already revealed.
   The first right answer for a fact earns its star of knowledge. */
const ENCCH=k=>ENCH.find(c=>c.k===k)||ENCH[0];
function encS(){if(!S.enc)S.enc={d:{},f:{},m:{},nw:{},lupe:0,lp:0,qd:{d:"",n:0},st:0,best:0,ms:{},cq:{},ok:0,init:0};const E2=S.enc;
  if(!E2.init){E2.init=1;E2.lupe=Math.min(12,Math.floor((S.xp||0)/10));E2.lp=(S.xp||0)%10;
    const quiet=k=>{if(!E2.d[k]){E2.d[k]=today();E2.f[k]=1;}};quiet("knjiznica");
    for(const e of ENC){if(!e.ent)continue;if(e.ent.some(k=>(S.visitors||[]).includes(k)||(S.met&&S.met[k])))quiet(e.k);}
    if(S.poi)for(const e of ENC)if(e.poi&&S.poi[e.poi])quiet(e.k);
    if(S.wst)for(const e of ENC){if(e.star&&S.wst[e.w]&&S.wst[e.w][e.star])quiet(e.k);if((e.wcount||e.enter)&&S.wst[e.wcount||e.enter]&&Object.keys(S.wst[e.wcount||e.enter]).length)quiet(e.k);}
    save();}
  return E2;}
const encGot=k=>!!encS().d[k];
const encRev=k=>encS().f[k]||0;
const encStar=(k,i)=>!!encS().m[k+":"+i];
const encStars=()=>Object.keys(encS().m).length;
const encCount=()=>ENC.filter(e=>encGot(e.k)).length;
/* pictures: animals use their 3D portrait, places and wonders a painted tile */
const ENCIMG={};
function encTile(em,bg){const key=em+bg;if(ENCIMG[key])return ENCIMG[key];const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");
  const g=x.createRadialGradient(64,50,10,64,64,90);g.addColorStop(0,"#ffffff");g.addColorStop(.35,bg);g.addColorStop(1,"#16243a");x.fillStyle=g;x.beginPath();x.roundRect?x.roundRect(4,4,120,120,26):x.rect(4,4,120,120);x.fill();
  x.fillStyle="rgba(255,255,255,.18)";for(let i=0;i<9;i++){x.beginPath();x.arc(20+((i*37)%90),18+((i*53)%92),2+(i%3),0,7);x.fill();}
  if(em==="#meduza"){x.save();x.translate(64,58);x.fillStyle="rgba(255,170,230,.92)";x.beginPath();x.ellipse(0,0,30,24,0,Math.PI,0);x.fill();x.strokeStyle="rgba(255,190,240,.9)";x.lineWidth=4;x.lineCap="round";for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(i*11,0);x.bezierCurveTo(i*11-8,18,i*11+8,32,i*11,48);x.stroke();}x.fillStyle="#fff";x.beginPath();x.arc(-10,-10,4,0,7);x.fill();x.restore();}
  else if(em==="#greben"){const cols=["#ff7a6a","#ffb84a","#c87aff","#ff9ad0"];for(let i=0;i<4;i++){x.strokeStyle=cols[i];x.lineWidth=7;x.lineCap="round";const bx=30+i*22;x.beginPath();x.moveTo(bx,104);x.lineTo(bx,74);x.lineTo(bx-9,58);x.moveTo(bx,82);x.lineTo(bx+10,64);x.stroke();}x.fillStyle="#ffd23a";x.beginPath();x.ellipse(66,44,13,8,0,0,7);x.fill();x.beginPath();x.moveTo(53,44);x.lineTo(44,36);x.lineTo(44,52);x.fill();x.fillStyle="#16243a";x.beginPath();x.arc(72,42,2,0,7);x.fill();}
  else{x.font='70px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';x.textAlign="center";x.textBaseline="middle";x.fillText(em,64,70);}
  return ENCIMG[key]=c.toDataURL();}
function encImg(e){if(e.pic||e.ent){const k=e.pic||e.ent[0];if(MODELS[k])try{return portrait(k);}catch(err){}}return encTile(e.em||"📖",e.bg||ENCCH(e.ch).c);}
{const kr=ENCK.krokodil;if(kr)kr.pic="krokodil";const me=ENCK.meduza;if(me){me.em="#meduza";me.bg="#6a4ab8";}const ko=ENCK.koralji;if(ko)ko.em="#greben";const kt=ENCK.kit;if(kt){kt.em="🐋";kt.bg="#2a6ab8";}}
/* ---------- discovering pages ---------- */
const ENCQ=[];let encQT=0;
function encFind(k,quiet){const e=ENCK[k];if(!e||encGot(k))return false;const E2=encS();E2.d[k]=today();E2.f[k]=1;E2.nw[k]=1;save();encBadge();
  if(!quiet)ENCQ.push(e);encMilestones();return true;}
function encPopTick(dt){if(encQT>0){encQT-=dt;return;}if(!ENCQ.length||window.RWON||!$("veil").hidden)return;const e=ENCQ.shift();encQT=3.2;
  showFind(encImg(e),"Nova stranica: "+e.n,RAR[e.t==="c"?3:e.t==="d"?2:1],"Album otkrića · "+ENCCH(e.ch).n);[784,988,1175].forEach((f,i)=>tone(f,.14,"triangle",.035,i*.08));
  tipOnce("enc1","Nova stranica u tvojoj enciklopediji! Otvori knjigu gumbom s knjigom i pročitaj zanimljivosti.");}
const ENCKIND={};for(const e of ENC)if(e.ent)for(const k of e.ent)ENCKIND[k]=e.k;
let encScanT=0;
function encScan(dt){encScanT-=dt;if(encScanT>0)return;encScanT=.7;if(typeof S==="undefined"||!S.days)return;const P=FP.on?FP.p:(typeof controls!=="undefined"?controls.target:null);if(!P)return;
  for(const en of ents){const k=ENCKIND[en.kind];if(!k||encGot(k))continue;if(en.g&&en.g.visible===false)continue;if(FP.on&&Math.hypot(en.x-P.x,en.z-P.z)<3.2&&Math.abs((en.y||P.y)-P.y)<4)encFind(k);/* a page is earned only by walking right up to the animal */}
  const W=WORLD||null;
  for(const e of ENC){if(encGot(e.k))continue;
    if(e.poi&&!W){const q=POI.find(p=>p.k===e.poi);if(q&&((S.poi&&S.poi[e.poi])||Math.hypot(q.x-P.x,q.z-P.z)<(q.r||15)))encFind(e.k);}
    else if(e.isl&&W===e.w&&WG.isl&&WG.isl[e.isl]){const q=WG.isl[e.isl];if(Math.hypot(q.x-P.x,q.z-P.z)<Math.max(8,(q.r||12)*.8))encFind(e.k);}
    else if(e.enter&&W===e.enter&&FP.on)encFind(e.k);
    else if(e.star&&W===e.w&&S.wst&&S.wst[e.w]&&S.wst[e.w][e.star])encFind(e.k);
    else if(e.wcount&&W===e.wcount&&S.wst&&S.wst[W]&&Object.keys(S.wst[W]).length)encFind(e.k);}}
/* ---------- the magnifier: one for every 10 pages read ---------- */
{const _ep=earnPages;earnPages=function(delta,oldLv){const r=_ep.apply(this,arguments);if(delta>0){const E2=encS();E2.lp+=delta;let n=0;while(E2.lp>=10){E2.lp-=10;E2.lupe++;n++;}
    if(n){save();encBadge();setTimeout(()=>toast((n>1?n+" nove lupe":"Nova lupa")+" za enciklopediju! Svakih 10 pročitanih stranica donosi lupu koja otkriva novu zanimljivost.",4600),1800);}}return r;};}
function encUseLupa(k){const E2=encS(),e=ENCK[k];if(!e||!encGot(k)||E2.lupe<=0||encRev(k)>=e.facts.length)return false;E2.lupe--;E2.f[k]=encRev(k)+1;save();encBadge();
  sfx.chime();[660,880,1320].forEach((f,i)=>tone(f,.12,"sine",.03,i*.07));return true;}
/* ---------- milestones ---------- */
const ENCMS=[{id:"d5",need:()=>encCount()>=5,c:30,t:"5 stranica u enciklopediji!"},{id:"d15",need:()=>encCount()>=15,c:60,box:1,t:"15 stranica u enciklopediji!"},
  {id:"d30",need:()=>encCount()>=30,c:100,box:1,t:"30 stranica u enciklopediji!"},{id:"dall",need:()=>encCount()>=ENC.length,c:300,box:1,t:"Cijela enciklopedija je otkrivena!"},
  {id:"s10",need:()=>encStars()>=10,c:50,t:"10 zvjezdica znanja!"},{id:"s20",need:()=>encStars()>=20,c:80,trail:1,t:"20 zvjezdica znanja! Novi trag: Slova na vjetru"},
  {id:"s50",need:()=>encStars()>=50,c:150,box:1,t:"50 zvjezdica znanja!"},{id:"sall",need:()=>encStars()>=ENC.length*3,c:500,box:1,t:"Sve zvjezdice znanja! Ti si prava znanstvenica!"}];
function encMilestones(){const E2=encS();for(const m of ENCMS){if(E2.ms[m.id]||!m.need())continue;E2.ms[m.id]=today();S.coins+=m.c;save();renderEco();
    setTimeout(()=>{toast("🏅 "+m.t+" +"+m.c+" zlatnika",4400);sfx.fanfare();},1200);
    if(m.trail){const it=MCAT.find(i=>i.id==="trail:slova");if(it&&!mgOwn(it)){mgGive(it);save();}}
    if(m.box&&typeof mgQueue==="function")mgQueue({kind:"enc",title:m.t});}}
/* ---------- the book ---------- */
let ENCV={ch:"otok",k:null};
function encBadge(){const E2=encS();const n=Object.keys(E2.nw).length;for(const id of ["encBadge","fpEncB"]){const b=$(id);if(!b)continue;b.hidden=!n&&!E2.lupe;b.textContent=n?n:"🔍";b.classList.toggle("lupa",!n);}}
function encStarsHTML(e){let h='<span class="encSt">';for(let i=0;i<e.facts.length;i++)h+='<i class="'+(encStar(e.k,i)?"on":i<encRev(e.k)?"rv":"")+'"></i>';return h+'</span>';}
function sheetEnc(ch,k){if(ch)ENCV.ch=ch;ENCV.k=k||null;const E2=encS();sfx.page&&sfx.page();
  if(ENCV.k)return encPage(ENCV.k);
  const all=ENC.length,got=encCount(),stars=encStars();const C=ENCCH(ENCV.ch);const list=ENC.filter(e=>e.ch===ENCV.ch);
  const tabs='<div class="encTabs">'+ENCH.map(c=>{const L=ENC.filter(e=>e.ch===c.k),g=L.filter(e=>encGot(e.k)).length,nw=L.some(e=>E2.nw[e.k]);return '<button data-ch="'+c.k+'" aria-pressed="'+(c.k===ENCV.ch)+'" style="--cc:'+c.c+'"><span class="em">'+c.em+'</span><b>'+esc(c.n)+'</b><small>'+g+' / '+L.length+(E2.cq[c.k]?' · 🏅':'')+'</small>'+(nw?'<i class="nw"></i>':'')+'</button>';}).join("")+'</div>';
  const grid='<div class="encGrid">'+list.map(e=>{const o=encGot(e.k);return '<button class="encCard'+(o?'':' lock')+'" data-k="'+e.k+'" style="--cc:'+C.c+'"><span class="pic"><img alt="" src="'+encImg(e)+'"></span>'+(E2.nw[e.k]?'<i class="nw">NOVO</i>':'')+'<b>'+(o?esc(e.n):'???')+'</b>'+(o?encStarsHTML(e):'<small>'+esc(ENCT[e.t])+'</small>')+'</button>';}).join("")+'</div>';
  const rev=list.reduce((a,e)=>a+(encGot(e.k)?encRev(e.k):0),0);
  const quiz=rev>=3?'<button class="btn purple encQuizB" id="encCQ">Kviz poglavlja · 5 pitanja</button>':'<p class="muted encQuizN">Kviz poglavlja otvara se kad u ovom poglavlju otkriješ barem 3 zanimljivosti.</p>';
  openSheet('<div class="encHead"><div class="encBook">📖</div><div><h2>Album otkrića</h2><p class="muted">Stranice: <b>'+got+' / '+all+'</b> · Zvjezdice znanja: <b>'+stars+' / '+all*3+'</b></p></div></div>'+
    '<div class="encLupa"><span class="lp">🔍 <b>'+E2.lupe+'</b> '+(E2.lupe===1?'lupa':E2.lupe>1&&E2.lupe<5?'lupe':'lupa')+'</span><span class="muted">Svakih 10 pročitanih stranica donosi lupu. Još <b>'+(10-E2.lp)+'</b> do sljedeće.</span></div>'+
    tabs+grid+quiz+(E2.st>1?'<p class="encStreak">🔥 Niz točnih odgovora: '+E2.st+' · Najbolji: '+E2.best+'</p>':'<p class="muted encTip">Životinje s upitnikom iznad glave imaju pitanje za tebe. Priđi im!</p>'));
  const B=$("sheetBody");B.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>{sfx.click();sheetEnc(b.dataset.ch);});
  B.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{sfx.click();sheetEnc(null,b.dataset.k);});
  const q=$("encCQ");if(q)q.onclick=()=>{sfx.click();encChapterQuiz(ENCV.ch);};}
function encPage(k){const e=ENCK[k],E2=encS(),C=ENCCH(e.ch);const o=encGot(k);if(E2.nw[k]){delete E2.nw[k];save();encBadge();}
  let body='<button class="btn soft encBack" id="encBack">← '+esc(C.n)+'</button>';
  if(!o){body+='<div class="encPg lock" style="--cc:'+C.c+'"><span class="pic"><img alt="" src="'+encImg(e)+'"></span><div><span class="encType">'+esc(ENCT[e.t])+'</span><h2>???</h2><p>'+esc(e.h||"Ovu stranicu još nisi otkrila.")+'</p><p class="muted">Otkrij je u svijetu: <b>'+esc(C.n)+'</b>.</p></div></div>';}
  else{const fr=e.ent&&e.ent.map(x=>PETS[x]&&(S.met&&S.met[x]||(S.visitors||[]).includes(x))?petName(x):null).find(Boolean);
    body+='<div class="encPg" style="--cc:'+C.c+'"><span class="pic"><img alt="" src="'+encImg(e)+'"></span><div><span class="encType">'+esc(ENCT[e.t])+'</span><h2>'+esc(e.n)+'</h2>'+(e.sci?'<p class="encSci">'+esc(e.sci)+'</p>':'')+(fr?'<p class="encFr">💛 Tvoj prijatelj: '+esc(fr)+'</p>':'')+
      (e.info?'<div class="encInfo">'+e.info.map(([a,b])=>'<span><small>'+esc(a)+'</small>'+esc(b)+'</span>').join("")+'</div>':'')+'</div></div><h3 class="encFH">Znaš li?</h3><ol class="encFacts">';
    e.facts.forEach((f,i)=>{if(i<encRev(k))body+='<li class="'+(encStar(k,i)?'st':'')+'"><span>'+esc(f[0])+'</span>'+(encStar(k,i)?'<i title="Zvjezdica znanja">★</i>':'<i class="q" title="Odgovori točno na pitanje o ovome">☆</i>')+'</li>';
      else body+='<li class="lk">'+(i===encRev(k)?(E2.lupe>0?'<button class="btn" id="encLupa">🔍 Otkrij lupom (imaš '+E2.lupe+')</button>':'<span>🔒 Pročitaj još '+(10-E2.lp)+' stranica i dobit ćeš lupu za ovu zanimljivost.</span>'):'<span>🔒 Skrivena zanimljivost</span>')+'</li>';});
    body+='</ol>';const unk=e.facts.map((f,i)=>i).filter(i=>i<encRev(k)&&!encStar(k,i));if(unk.length)body+='<button class="btn purple encQuizB" id="encPQ">Odgovori na pitanje i osvoji zvjezdicu</button>';}
  openSheet(body);$("encBack").onclick=()=>{sfx.click();sheetEnc(e.ch);};
  const l=$("encLupa");if(l)l.onclick=()=>{if(encUseLupa(k)){encPage(k);const li=$("sheetBody").querySelectorAll(".encFacts li")[encRev(k)-1];if(li){li.classList.add("new");}}};
  const pq=$("encPQ");if(pq)pq.onclick=()=>{sfx.click();const unk=e.facts.map((f,i)=>i).filter(i=>i<encRev(k)&&!encStar(k,i));encQuiz({qs:[{k,i:unk[Math.floor(Math.random()*unk.length)]}],who:{n:"Sova Mudrica",img:portrait("sova")},back:()=>encPage(k)});};}
/* ---------- quizzes ---------- */
function encPool(ch,prefK){const out=[],un=[];for(const e of ENC){if(!encGot(e.k))continue;if(ch&&e.ch!==ch)continue;for(let i=0;i<encRev(e.k);i++){const q={k:e.k,i};out.push(q);if(!encStar(e.k,i))un.push(q);}}
  if(prefK){const a=un.filter(q=>q.k===prefK);if(a.length)return a;const b=out.filter(q=>q.k===prefK);if(b.length&&!un.length)return b;}return un.length?un:out;}
function encQuiz(o){const st={i:0,ok:0,o};encAsk(st);}
function encAsk(st){const o=st.o,q=o.qs[st.i];if(!q){encQuizEnd(st);return;}const e=ENCK[q.k],f=e.facts[q.i];const E2=encS();
  const opts=shuffleR([f[2],f[3],f[4]]);
  openSheet('<div class="anh"><img alt="" src="'+o.who.img+'"><div><h2>'+esc(o.who.n)+' te pita</h2><p class="muted">'+(o.qs.length>1?'Pitanje '+(st.i+1)+' od '+o.qs.length+' · Točno: '+st.ok:'Stranica: '+esc(e.n))+(E2.st>1?' · 🔥 '+E2.st:'')+'</p></div></div><div class="pzq">'+esc(f[1])+'</div><div class="pzopts">'+opts.map(x=>'<button class="btn soft" data-o="'+esc(x)+'">'+esc(x)+'</button>').join("")+'</div><p class="pzmsg encMsg" id="encMsg"></p><div id="encNext"></div>',()=>{st.closed=1;});
  const B=$("sheetBody");B.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{if(st.ans)return;st.ans=1;const ok=b.dataset.o===f[2];const key=q.k+":"+q.i,first=ok&&!E2.m[key];
    B.querySelectorAll("[data-o]").forEach(x=>{x.disabled=true;if(x.dataset.o===f[2])x.classList.add("ok");});
    if(ok){st.ok++;E2.st++;E2.best=Math.max(E2.best,E2.st);E2.ok++;const c=first?15:Math.min(14,4+E2.st*2);if(first)E2.m[key]=today();S.coins+=c;save();renderEco();
      sfx.chime();[880,1175,1568].forEach((fq,i)=>tone(fq,.16,"triangle",.04,i*.07));if(rida){rida.celebrate=.8;}
      $("encMsg").innerHTML='<b class="okT">Točno!</b> +'+c+' zlatnika'+(first?' · <span class="stT">★ Nova zvjezdica znanja!</span>':'')+(E2.st>=3?' · 🔥 Niz: '+E2.st:'');
      if(E2.st===5||E2.st===10||E2.st===20){const bon=E2.st*5;S.coins+=bon;save();renderEco();setTimeout(()=>{toast("🔥 "+E2.st+" točnih zaredom! Bonus +"+bon+" zlatnika",3600);sfx.fanfare();},500);}}
    else{b.classList.add("shake");E2.st=0;save();tone(240,.18,"sawtooth",.025);tone(190,.24,"sawtooth",.025,.12);
      $("encMsg").innerHTML='<b class="noT">Nije baš.</b> Točan odgovor: <b>'+esc(f[2])+'</b>.<br><span class="muted">'+esc(f[0])+'</span>';}
    encMilestones();
    const last=st.i>=o.qs.length-1;$("encNext").innerHTML='<button class="btn purple" id="encGo">'+(last?(o.back?'Natrag':'Super!'):'Sljedeće pitanje')+'</button>';
    $("encGo").onclick=()=>{sfx.click();st.ans=0;st.i++;if(st.i>=o.qs.length)encQuizEnd(st);else encAsk(st);};});}
function encQuizEnd(st){const o=st.o;if(o.ch&&o.qs.length>1){const E2=encS();const perfect=st.ok===o.qs.length;let msg="Točno "+st.ok+" od "+o.qs.length+".";
    if(perfect&&!E2.cq[o.ch]){E2.cq[o.ch]=today();S.coins+=40;msg+=" Savršeno! Medalja poglavlja i +40 zlatnika!";sfx.fanfare();}
    else if(perfect){S.coins+=10;msg+=" Savršeno opet! +10 zlatnika.";}save();renderEco();toast(msg,4200);}
  if(o.back){o.back();return;}if(o.ch){sheetEnc(o.ch);return;}closeSheet();if(o.done)o.done();}
function encChapterQuiz(ch){const pool=shuffleR(encPool(ch).slice());const all=[];for(const e of ENC)if(e.ch===ch&&encGot(e.k))for(let i=0;i<encRev(e.k);i++)all.push({k:e.k,i});
  const qs=pool.slice(0,5);for(const q of shuffleR(all.slice()))if(qs.length<5&&!qs.some(x=>x.k===q.k&&x.i===q.i))qs.push(q);
  encQuiz({qs:shuffleR(qs),ch,who:{n:"Sova Mudrica",img:portrait("sova")}});}
/* ---------- animals with a question ---------- */
const EQB={en:null,spr:null,t:0,cd:12,q:null};
function encQTex(){if(encQTex.t)return encQTex.t;const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");
  x.fillStyle="#16243a";x.beginPath();x.arc(64,56,46,0,7);x.fill();x.beginPath();x.moveTo(48,96);x.lineTo(64,124);x.lineTo(80,96);x.fill();
  const g=x.createLinearGradient(0,14,0,100);g.addColorStop(0,"#ffe680");g.addColorStop(1,"#ffb020");x.fillStyle=g;x.beginPath();x.arc(64,56,39,0,7);x.fill();x.beginPath();x.moveTo(53,92);x.lineTo(64,113);x.lineTo(75,92);x.fill();
  x.fillStyle="#16243a";x.font="bold 62px Inter,Arial,sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText("?",64,60);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return encQTex.t=t;}
function encBubbleOff(cd){if(EQB.spr){scene.remove(EQB.spr);EQB.spr.material.dispose();}EQB.spr=null;EQB.en=null;EQB.q=null;EQB.cd=cd;}
function encQuizTick(dt,tt){if(!FP.on||typeof S==="undefined"||!S.days){if(EQB.spr)encBubbleOff(10);return;}const E2=encS();if(E2.qd.d!==today()){E2.qd.d=today();E2.qd.n=0;}
  const busy=!$("veil").hidden||window.RWON||(typeof ACT!=="undefined"&&ACT)||FP.mount||(typeof CINE!=="undefined"&&CINE);const P=FP.p;
  if(EQB.spr){const en=EQB.en;if(!en||ents.indexOf(en)<0){encBubbleOff(15);return;}EQB.t-=dt;
    const h=EQB.h*(en.g.scale.y||1);EQB.spr.position.set(en.x,en.y+h+.55+Math.sin(tt*3)*.12,en.z);const s=.9+Math.sin(tt*5)*.05;EQB.spr.scale.set(s,s,1);
    if(EQB.t<=0){encBubbleOff(25);return;}
    if(!busy&&Math.hypot(en.x-P.x,en.z-P.z)<2.9+(EQB.h>3?1.5:0)&&Math.abs(en.y-P.y)<3.5){const q=EQB.q,who={n:en.name||ENCK[ENCKIND[en.kind]]&&ENCK[ENCKIND[en.kind]].n||"Prijatelj",img:MODELS[en.kind]?portrait(en.kind):portrait("sova")};
      E2.qd.n++;save();en.celebrate=.6;encBubbleOff(45);say&&say(en,"Imam pitanje za tebe!",1600);setTimeout(()=>encQuiz({qs:[q],who}),350);}
    return;}
  EQB.cd-=dt;if(EQB.cd>0||busy||E2.qd.n>=6)return;EQB.cd=4;
  const pool0=encPool(null);if(!pool0.length)return;
  const cand=ents.filter(en=>en.kind!=="rida"&&en.g&&en.g.visible!==false&&(ENCKIND[en.kind]||PETS[en.kind])&&Math.hypot(en.x-P.x,en.z-P.z)<16&&Math.hypot(en.x-P.x,en.z-P.z)>4&&Math.abs(en.y-P.y)<6);if(!cand.length)return;
  const en=cand[Math.floor(Math.random()*cand.length)];const ek=ENCKIND[en.kind];const W=WORLD||"otok";
  let pool=encPool(null,ek&&encGot(ek)?ek:null);if(!(ek&&pool.some(q=>q.k===ek))){const pc=encPool(W);if(pc.length)pool=pc;}
  const q=pool[Math.floor(Math.random()*pool.length)];if(!q)return;
  const box=new THREE.Box3().setFromObject(en.g);EQB.h=Math.max(.8,(box.max.y-box.min.y)/(en.g.scale.y||1));
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:encQTex(),transparent:true,depthTest:false,fog:false}));sp.renderOrder=9;scene.add(sp);EQB.spr=sp;EQB.en=en;EQB.q=q;EQB.t=70;
  if(!E2.qtip){E2.qtip=1;save();toast("Vidiš upitnik? "+(en.name||"Jedan prijatelj")+" ima pitanje za tebe. Priđi i odgovori!",4200);}tone(1320,.08,"sine",.02);tone(1760,.1,"sine",.02,.08);}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);try{encScan(dt);encPopTick(dt);encQuizTick(dt,tt);}catch(err){if(!encQuizTick.e){encQuizTick.e=1;console.warn("enc",err);}}};}
/* ---------- the trail reward: letters drifting behind Rida ---------- */
const ENCL="ABCČDEFGHIJKLMNOPRSŠTUVZŽ";
function encLetterTex(ch){const k="L_"+ch;if(MGT[k])return k;const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");x.font="bold 46px Georgia,serif";x.textAlign="center";x.textBaseline="middle";
  x.lineWidth=7;x.strokeStyle="rgba(22,36,58,.85)";x.strokeText(ch,32,35);x.fillStyle="#fff";x.fillText(ch,32,35);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;MGT[k]=t;return k;}
MTRAIL.slova={n:"Slova na vjetru",d:"Iza Ride lete šarena slova iz knjiga. Dobiješ ga za 20 zvjezdica znanja u enciklopediji.",p:0,rar:"l",wr:"Album otkrića"};
TR.slova=p=>mgSpawn({t:encLetterTex(ENCL[Math.floor(Math.random()*ENCL.length)]),x:p.x+(Math.random()-.5)*.5,y:p.y+.35+Math.random()*.5,z:p.z+(Math.random()-.5)*.5,vy:.6,vx:(Math.random()-.5)*.4,vz:(Math.random()-.5)*.4,life:1.6,size:.34,size2:.2,col:[0xff7fa8,0xffd23a,0x6ad0ff,0x8fdc6a,0xb46cff],spin:.6,wob:.3});
TRATE.slova=7;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("trail","slova",MTRAIL.slova);}
/* ---------- buttons ---------- */
const ENC_SVG='<svg viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M0 1h5v1h2V1h5v10H7v1H5v-1H0z"/><path fill="#3fa86a" d="M1 2h4v8H1z"/><path fill="#4aa8d8" d="M7 2h4v8H7z"/><path fill="#fff" d="M2 3h2v1H2zM2 5h2v1H2zM8 3h2v1H8zM8 5h2v1H8z"/><path fill="#ffc53d" d="M5 2h2v9H5z"/></svg>';
function encButtons(){const sb=$("sideBtns");if(sb&&!$("encBtn")){const mg=$("mgBtn");const html='<button class="card round rel" id="encBtn" aria-label="Album otkrića">'+ENC_SVG+'<span class="badge" id="encBadge" hidden>0</span></button>';if(mg)mg.insertAdjacentHTML("afterend",html);else sb.insertAdjacentHTML("afterbegin",html);$("encBtn").onclick=()=>{sfx.click();sheetEnc();};}
  const ft=document.querySelector(".fptop");if(ft&&!$("fpEnc")){const ref=$("fpEmo")||$("fpExit");if(ref){ref.insertAdjacentHTML("beforebegin",'<button class="fpico rel" id="fpEnc" aria-label="Album otkrića">'+ENC_SVG+'<span class="badge" id="fpEncB" hidden>0</span></button>');$("fpEnc").onclick=()=>{sfx.click();sheetEnc(WORLD||"otok");};}}
  encBadge();}
encButtons();setTimeout(encButtons,1500);
addEventListener("keydown",e=>{if(e.repeat||e.target&&e.target.closest&&e.target.closest("input,textarea"))return;if(e.key.toLowerCase()==="k"&&$("veil").hidden&&!window.RWON){sheetEnc(WORLD||"otok");}});
/* the animal card links to its page */
{const _sa=sheetAnimal;sheetAnimal=function(k){_sa.apply(this,arguments);const ek=ENCKIND[k];if(!ek||!encGot(ek))return;const B=$("sheetBody");if(!B||$("encLink"))return;
  B.insertAdjacentHTML("beforeend",'<button class="btn soft encLinkB" id="encLink">📖 Stranica u enciklopediji</button>');$("encLink").onclick=()=>{sfx.click();sheetEnc(ENCK[ek].ch,ek);};};}
