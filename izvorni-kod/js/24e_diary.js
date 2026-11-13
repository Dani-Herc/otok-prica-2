/* =================== DEEP READING DIARY =================== */
/* every reading session is logged, each book gets its own page with characters, quotes and a pixel-art cover,
   and there is a calendar, charts and badges */
const COVER_PAL=["#fffdf7","#16243a","#7a5233","#e8772e","#ffc53d","#8fdc6a","#3a9a4a","#63b5e8","#2a4aa8","#9b6ad8","#ff7fa8","#d8403a","#f4d8b0","#8a93a6","#22a39a","#000000"];
const ROLES=["Glavni lik","Prijatelj","Zločesti","Smiješni","Mudri","Tajanstveni"];
function diaryInit(){S.log=S.log||[];S.badges=S.badges||{};S.riddles=S.riddles||{};S.covers=S.covers||0;
  for(const b of S.books){b.chars=b.chars||[];b.quotes=b.quotes||[];}
  const nw=checkBadges(true);if(nw.length)setTimeout(()=>toast("Novi dnevnik čitanja! Već imaš "+nw.length+" "+(nw.length===1?"značku":nw.length<5?"značke":"znački")+". Pogledaj u Dnevniku.",5000),9000);}
/* ---- every page you log becomes a session in the diary ---- */
const _sheetProgressD=sheetProgress;
sheetProgress=function(b){_sheetProgressD(b);const go=$("pgGo");if(!go)return;const f=go.onclick;
  go.onclick=()=>{const before=b.page;f();if(b.page>before){S.log.push({d:today(),b:b.id,p:b.page-before});if(S.log.length>3000)S.log.splice(0,S.log.length-3000);if(b.done&&!b.doneD)b.doneD=today();save();setTimeout(()=>checkBadges(),5200);}};};
/* ---- pixel covers: 16×16, one hex digit per pixel ---- */
const coverC={};
function coverURL(b,size){const key=(b.cover||"")+"|"+b.genre+"|"+b.title+"|"+(size||64);if(coverC[key])return coverC[key];const N=size||64,c=document.createElement("canvas");c.width=c.height=N;const x=c.getContext("2d");x.imageSmoothingEnabled=false;
  if(b.cover&&b.cover.length===256){const px=N/16;for(let i=0;i<256;i++){x.fillStyle=COVER_PAL[parseInt(b.cover[i],16)];x.fillRect((i%16)*px,Math.floor(i/16)*px,Math.ceil(px),Math.ceil(px));}}
  else{const G=GENRES[b.genre]||{col:"#8a93a6"};x.fillStyle=G.col;x.fillRect(0,0,N,N);x.fillStyle="rgba(0,0,0,.18)";x.fillRect(0,0,N*.12,N);x.fillStyle="rgba(255,255,255,.85)";x.fillRect(N*.22,N*.18,N*.66,N*.3);
    x.fillStyle="#16243a";x.font="700 "+Math.round(N*.24)+"px 'Pixelify Sans',monospace";x.textAlign="center";x.textBaseline="middle";x.fillText((b.title||"?").trim().charAt(0).toUpperCase(),N*.55,N*.34);
    x.fillStyle="rgba(255,255,255,.55)";for(let i=0;i<3;i++)x.fillRect(N*.22,N*(.6+i*.1),N*(.66-i*.14),N*.045);}
  return coverC[key]=c.toDataURL();}
/* ---- numbers ---- */
function pagesOn(d){let n=0;for(const l of S.log)if(l.d===d)n+=l.p;return n;}
function bestStreak(){const ds=Object.keys(S.days).filter(d=>S.days[d]).sort();let best=0,cur=0,prev=null;for(const d of ds){cur=prev&&addDays(prev,1)===d?cur+1:1;best=Math.max(best,cur);prev=d;}return best;}
function weekPages(){const t=today();let n=0;for(const l of S.log)if(l.d>addDays(t,-7))n+=l.p;return n;}
function hrN(n,a,b,c){return n%10===1&&n%100!==11?a:(n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?b:c);}
function bookSessions(b){return S.log.filter(l=>l.b===b.id);}
const allQuotes=()=>S.books.reduce((a,b)=>a+(b.quotes||[]).length,0),allChars=()=>S.books.reduce((a,b)=>a+(b.chars||[]).length,0);
/* ---- badges ---- */
const BADGES=[
  {k:"knjiga1",n:"Prva knjiga",d:"Pročitaj jednu knjigu do kraja",v:()=>finished().length,need:1,sym:"1",c:"#e8772e"},
  {k:"knjiga5",n:"Knjiški moljac",d:"Pročitaj 5 knjiga do kraja",v:()=>finished().length,need:5,sym:"5",c:"#d8403a"},
  {k:"knjiga10",n:"Gospodarica knjiga",d:"Pročitaj 10 knjiga do kraja",v:()=>finished().length,need:10,sym:"10",c:"#9b6ad8"},
  {k:"str100",n:"Sto stranica",d:"Pročitaj ukupno 100 stranica",v:()=>S.xp,need:100,sym:"100",c:"#63b5e8"},
  {k:"str500",n:"Petsto stranica",d:"Pročitaj ukupno 500 stranica",v:()=>S.xp,need:500,sym:"500",c:"#2a4aa8"},
  {k:"str1000",n:"Tisuću stranica",d:"Pročitaj ukupno 1000 stranica",v:()=>S.xp,need:1000,sym:"1K",c:"#3a9a4a"},
  {k:"str3000",n:"Tri tisuće stranica",d:"Pročitaj ukupno 3000 stranica",v:()=>S.xp,need:3000,sym:"3K",c:"#16243a"},
  {k:"niz3",n:"Tri dana zaredom",d:"Čitaj 3 dana zaredom",v:bestStreak,need:3,sym:"3",c:"#ffc53d"},
  {k:"niz7",n:"Tjedan čitanja",d:"Čitaj 7 dana zaredom",v:bestStreak,need:7,sym:"7",c:"#e8772e"},
  {k:"niz14",n:"Dva tjedna",d:"Čitaj 14 dana zaredom",v:bestStreak,need:14,sym:"14",c:"#d8403a"},
  {k:"niz30",n:"Mjesec čitanja",d:"Čitaj 30 dana zaredom",v:bestStreak,need:30,sym:"30",c:"#9b6ad8"},
  {k:"zanr3",n:"Putnica kroz žanrove",d:"Čitaj knjige 3 različite vrste",v:()=>new Set(S.books.map(b=>b.genre)).size,need:3,sym:"3",c:"#8fdc6a"},
  {k:"zanr6",n:"Svi svjetovi",d:"Čitaj knjige svih vrsta",v:()=>new Set(S.books.map(b=>b.genre)).size,need:Object.keys(GENRES).length,sym:"★",c:"#3a9a4a"},
  {k:"citat5",n:"Lovica citata",d:"Zapiši 5 omiljenih rečenica",v:allQuotes,need:5,sym:"„“",c:"#63b5e8"},
  {k:"lik5",n:"Poznavateljica likova",d:"Upiši 5 likova iz knjiga",v:allChars,need:5,sym:"☺",c:"#ff7fa8"},
  {k:"crtez",n:"Ilustratorica",d:"Nacrtaj naslovnicu za knjigu",v:()=>S.books.filter(b=>b.cover).length,need:1,sym:"✎",c:"#e8772e"},
  {k:"ocjena3",n:"Kritičarka",d:"Ocijeni 3 pročitane knjige",v:()=>S.books.filter(b=>b.stars).length,need:3,sym:"★",c:"#ffc53d"},
  {k:"misli10",n:"Mislilica",d:"Odgovori na 10 Ridinih pitanja",v:()=>S.answers.length,need:10,sym:"?",c:"#2a4aa8"},
  {k:"zag10",n:"Rješavateljica zagonetki",d:"Riješi 10 zagonetki",v:()=>Object.keys(S.riddles||{}).length+((S.quest&&S.quest.got)||[]).length,need:10,sym:"!",c:"#9b6ad8"},
  {k:"cuvarica",n:"Čuvarica priča",d:"Vrati svih 7 stranica Velikoj knjizi",v:()=>(S.quest&&S.quest.done)?1:0,need:1,sym:"♛",c:"#c98a00"}];
const badgeC={};
function badgeIcon(B,on){const key=B.k+(on?1:0);if(badgeC[key])return badgeC[key];const N=96,c=document.createElement("canvas");c.width=c.height=N;const x=c.getContext("2d");
  const col=on?B.c:"#c9c4b8",dk=on?"#16243a":"#9a958a";
  x.fillStyle=on?"#d8403a":"#bdb7aa";x.beginPath();x.moveTo(30,4);x.lineTo(44,4);x.lineTo(40,40);x.lineTo(26,40);x.fill();x.fillStyle=on?"#2a4aa8":"#ada79a";x.beginPath();x.moveTo(52,4);x.lineTo(66,4);x.lineTo(70,40);x.lineTo(56,40);x.fill();
  x.fillStyle=dk;x.beginPath();x.arc(48,56,34,0,7);x.fill();x.fillStyle=col;x.beginPath();x.arc(48,56,29,0,7);x.fill();
  x.fillStyle="rgba(255,255,255,.35)";x.beginPath();x.arc(40,46,13,0,7);x.fill();
  x.fillStyle=on?"#fff":"#efebe2";x.font="700 "+(B.sym.length>2?24:B.sym.length>1?30:36)+"px 'Pixelify Sans',monospace";x.textAlign="center";x.textBaseline="middle";x.lineWidth=5;x.strokeStyle=dk;x.strokeText(B.sym,48,58);x.fillText(B.sym,48,58);
  return badgeC[key]=c.toDataURL();}
function checkBadges(silent){const nw=[];for(const B of BADGES){if(S.badges[B.k])continue;if(B.v()>=B.need){S.badges[B.k]=today();nw.push(B);}}
  if(nw.length){if(!silent){S.coins+=20*nw.length;renderEco&&renderEco();sfx.fanfare();nw.forEach((B,i)=>setTimeout(()=>miniPop(badgeIcon(B,true),"Značka: "+B.n+" · +20 zlatnika"),i*1600));}save();}return nw;}
/* ---- the diary ---- */
const DTABS=[["knjige","Knjige"],["velika","Velika knjiga"],["kalendar","Kalendar"],["znacke","Značke"],["biljeske","Bilješke"]];
let calM=null;
sheetDiary=function(tab){tab=tab||"knjige";const tabs='<div class="tabs dtabs" role="tablist">'+DTABS.map(t=>'<button role="tab" data-t="'+t[0]+'" aria-selected="'+(t[0]===tab)+'">'+t[1]+'</button>').join("")+'</div>';let body="";
  const tiles='<div class="dtiles"><div><b>'+streak()+'</b><span>'+(streak()===1?"dan":"dana")+' zaredom</span></div><div><b>'+S.xp+'</b><span>stranica</span></div><div><b>'+finished().length+'</b><span>knjiga do kraja</span></div><div><b>'+Object.keys(S.badges).length+'/'+BADGES.length+'</b><span>znački</span></div></div>';
  if(tab==="knjige"){body=tiles+(S.books.length?'<div class="dbooks">'+S.books.slice().reverse().map(b=>{const G=GENRES[b.genre],pct=b.done?100:Math.round(100*b.page/b.pages);
      return '<button class="dbook" data-id="'+b.id+'"><img alt="" src="'+coverURL(b,64)+'"><span class="dbt"><b>'+esc(b.title)+'</b><small>'+(b.author?esc(b.author)+' · ':'')+esc(bldName(b))+'</small>'+
        '<span class="prog sm"><i style="width:'+pct+'%;background:'+G.col+'"></i></span><small>'+(b.done?'Pročitano'+(b.stars?' · '+'★'.repeat(b.stars):''):'Stranica '+b.page+' od '+b.pages)+[(b.chars||[]).length?b.chars.length+' '+hrN(b.chars.length,'lik','lika','likova'):'',(b.quotes||[]).length?b.quotes.length+' '+hrN(b.quotes.length,'rečenica','rečenice','rečenica'):''].filter(Boolean).map(t=>' · '+t).join('')+'</small></span></button>';}).join("")+'</div>'
      :'<p class="muted">Još nema knjiga. Pritisni „Čitala sam!” i dodaj prvu.</p>')+'<p class="muted">Dodirni knjigu da otvoriš njezinu stranicu u dnevniku: likovi, omiljene rečenice, tvoje misli i naslovnica koju sama nacrtaš.</p>';}
  if(tab==="velika")body=typeof questDiaryHTML==="function"?questDiaryHTML():"";
  if(tab==="kalendar")body=calendarHTML();
  if(tab==="znacke")body='<p class="muted">Za svaku novu značku dobivaš 20 zlatnika.</p><div class="bdgs">'+BADGES.map(B=>{const on=!!S.badges[B.k],v=Math.min(B.v(),B.need);
      return '<div class="bdg'+(on?' on':'')+'"><img alt="" src="'+badgeIcon(B,on)+'"><b>'+esc(B.n)+'</b><small>'+(on?'Osvojeno '+fmtD(S.badges[B.k]):esc(B.d))+'</small>'+(on?'':'<span class="prog sm"><i style="width:'+Math.round(100*v/B.need)+'%"></i></span><small>'+v+' / '+B.need+'</small>')+'</div>';}).join("")+'</div>';
  if(tab==="biljeske"){const qs=[];for(const b of S.books)for(const q of b.quotes||[])qs.push([b,q]);
    body=(qs.length?'<h3>Omiljene rečenice</h3>'+qs.slice().reverse().map(([b,q])=>'<blockquote class="dq">'+esc(q.t)+'<small>'+esc(b.title)+(q.p?', str. '+q.p:'')+'</small></blockquote>').join(""):'')+
      '<h3>Odgovori na Ridina pitanja</h3>'+(S.answers.length?S.answers.slice().reverse().map(a=>{const b=S.books.find(x=>x.id===a.book);return '<div class="ans"><small>'+esc(fmtD(a.d))+' · '+esc(b?b.title:"")+'</small><b>'+esc(a.q)+'</b><p>'+esc(a.a)+'</p></div>';}).join(""):'<p class="muted">Ovdje se skupljaju tvoji odgovori na Ridina pitanja.</p>');}
  openSheet('<h2>Moj dnevnik</h2>'+tabs+body);const B=$("sheetBody");
  B.querySelectorAll("[role=tab]").forEach(t=>t.onclick=()=>{sfx.click();sheetDiary(t.dataset.t);});{const sel=B.querySelector('[role=tab][aria-selected="true"]'),bar=sel&&sel.parentNode;if(bar&&bar.scrollWidth>bar.clientWidth)bar.scrollLeft=Math.max(0,sel.offsetLeft-bar.offsetLeft-(bar.clientWidth-sel.offsetWidth)/2);}
  B.querySelectorAll(".dbook").forEach(c=>c.onclick=()=>{sfx.click();sheetBook(c.dataset.id);});
  B.querySelectorAll("[data-cal]").forEach(c=>c.onclick=()=>{sfx.click();calM=addMonth(calM,+c.dataset.cal);sheetDiary("kalendar");});
  if(tab==="velika"&&typeof questDiaryBind==="function")questDiaryBind();};
const MONTHS=["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac"];
const MONTHS_G=["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenoga","prosinca"];
function fmtD(d){if(!d)return "";const p=d.split("-").map(Number);return p[2]+". "+MONTHS_G[p[1]-1];}
function addMonth(m,n){const p=(m||today().slice(0,7)).split("-").map(Number);const dt=new Date(p[0],p[1]-1+n,1);return dt.getFullYear()+"-"+String(dt.getMonth()+1).padStart(2,"0");}
function calendarHTML(){calM=calM||today().slice(0,7);const [Y,M]=calM.split("-").map(Number);const first=new Date(Y,M-1,1),days=new Date(Y,M,0).getDate(),off=(first.getDay()+6)%7,t=today();
  let mp=0,md=0;let cells="";for(let i=0;i<off;i++)cells+='<i class="e"></i>';
  for(let d=1;d<=days;d++){const ds=calM+"-"+String(d).padStart(2,"0"),on=!!S.days[ds],p=pagesOn(ds);if(on){md++;mp+=p;}const lv=!on?0:p>=40?4:p>=20?3:p>=8?2:1;
    cells+='<i class="l'+lv+(ds===t?' t':'')+'" title="'+d+'. '+MONTHS_G[M-1]+(on?': '+(p?p+' str.':'čitala si'):'')+'">'+d+'</i>';}
  let h='<div class="dtiles"><div><b>'+streak()+'</b><span>niz sada</span></div><div><b>'+bestStreak()+'</b><span>najduži niz</span></div><div><b>'+weekPages()+'</b><span>str. u 7 dana</span></div><div><b>'+md+'</b><span>dana ovaj mjesec</span></div></div>';
  h+='<div class="calhead"><button class="btn soft" data-cal="-1" aria-label="Prethodni mjesec">‹</button><b>'+MONTHS[M-1]+' '+Y+'</b><button class="btn soft" data-cal="1" aria-label="Sljedeći mjesec">›</button></div>';
  h+='<div class="cal">'+["Po","Ut","Sr","Če","Pe","Su","Ne"].map(d=>'<em>'+d+'</em>').join("")+cells+'</div><p class="muted cleg"><i class="l1"></i>malo <i class="l2"></i><i class="l3"></i><i class="l4"></i>puno stranica</p>';
  /* the last 14 days as bars */
  const bars=[];for(let i=13;i>=0;i--){const d=addDays(t,-i);bars.push([d,pagesOn(d),!!S.days[d]]);}const mx=Math.max(10,...bars.map(b=>b[1]));
  h+='<h3>Zadnjih 14 dana</h3>'+(S.log.length?'<div class="bars">'+bars.map(b=>'<div><span style="height:'+Math.round(100*b[1]/mx)+'%"'+(b[1]?'':' class="z"')+'>'+(b[1]?'<em>'+b[1]+'</em>':'')+'</span><small>'+Number(b[0].slice(8))+'.</small></div>').join("")+'</div>':'<p class="muted">Graf se puni kako upisuješ pročitane stranice.</p>');
  /* what kinds of books */
  const gc={};for(const b of S.books)gc[b.genre]=(gc[b.genre]||0)+1;const gk=Object.keys(gc).sort((a,b)=>gc[b]-gc[a]);
  if(false&&gk.length)h+='<h3>Moje vrste knjiga</h3><div class="gbars">'+gk.map(k=>'<div><b>'+esc(GENRES[k].n)+'</b><span><i style="width:'+Math.round(100*gc[k]/S.books.length)+'%;background:'+GENRES[k].col+'"></i></span><small>'+gc[k]+'</small></div>').join("")+'</div>';
  return h;}
/* ---- one book's page ---- */
function sheetBook(id,keep){const b=S.books.find(x=>x.id===id);if(!b)return sheetDiary("knjige");b.chars=b.chars||[];b.quotes=b.quotes||[];const G=GENRES[b.genre],pct=b.done?100:Math.round(100*b.page/b.pages);
  const ses=bookSessions(b),avg=ses.length?Math.round(ses.reduce((a,l)=>a+l.p,0)/ses.length):0;const ans=S.answers.filter(a=>a.book===b.id);const sc=keep?$("sheet").scrollTop:0;
  let h='<button class="back" id="bkBack">‹ Svi dnevnici</button><div class="bhead"><button class="cov" id="bkCov" aria-label="Nacrtaj naslovnicu"><img alt="" src="'+coverURL(b,128)+'"><span>✎</span></button><div><h2>'+esc(b.title)+'</h2><p class="muted">'+(b.author?esc(b.author)+' · ':'')+esc(bldName(b))+'</p>'+
    '<span class="prog"><i style="width:'+pct+'%;background:'+G.col+'"></i></span><small class="muted">'+(b.done?'Pročitano'+(b.doneD?' '+fmtD(b.doneD):''):'Stranica '+b.page+' od '+b.pages+' ('+pct+'%)')+'</small></div></div>';
  h+='<div class="bstats">'+((()=>{const st=b.started||ses.map(x=>x.d).sort()[0];return st?'<span>Počela <b>'+esc(fmtD(st))+'</b></span>':'';})())+'<span>Čitanja <b>'+ses.length+'</b></span>'+(avg?'<span>Prosjek <b>'+avg+' str.</b></span>':'')+'</div>';
  h+='<div class="field"><span class="lbl">'+(b.done?'Tvoja ocjena':'Ocjena (kad je pročitaš)')+'</span><div class="stars" id="bkStars">'+[1,2,3,4,5].map(i=>'<button data-s="'+i+'" aria-label="'+i+' zvjezdica"'+(b.done?'':' disabled')+'>'+star(i<=(b.stars||0))+'</button>').join("")+'</div></div>';
  h+='<div class="row">'+(b.done?'':'<button class="btn green" id="bkRead">Upiši stranice</button>')+'<button class="btn soft" id="bkFly">Pokaži na otoku</button></div>';
  h+='<h3>Likovi</h3>'+(b.chars.length?'<div class="chars">'+b.chars.map((c,i)=>'<div class="chr"><b>'+esc(c.n)+'</b><em>'+esc(c.r||"")+'</em>'+(c.o?'<p>'+esc(c.o)+'</p>':'')+'<button class="xdel" data-dc="'+i+'" aria-label="Obriši lik">×</button></div>').join("")+'</div>':'<p class="muted">Tko se sve pojavljuje u knjizi? Upiši likove da ih ne zaboraviš.</p>')+
    '<details class="add"><summary>+ Dodaj lik</summary><div class="field"><label for="chN">Ime</label><input type="text" id="chN" maxlength="40" autocomplete="off"></div><div class="field"><span class="lbl">Kakav je to lik?</span><div class="roles">'+ROLES.map((r,i)=>'<button data-r="'+i+'" aria-pressed="false">'+r+'</button>').join("")+'</div></div>'+
    '<div class="field"><label for="chO">Što misliš o njemu? (ne moraš)</label><input type="text" id="chO" maxlength="120" autocomplete="off"></div><button class="btn" id="chGo">Spremi lik</button></details>';
  h+='<h3>Omiljene rečenice</h3>'+(b.quotes.length?b.quotes.map((q,i)=>'<blockquote class="dq">'+esc(q.t)+'<small>'+(q.p?'str. '+q.p:'')+'</small><button class="xdel" data-dq="'+i+'" aria-label="Obriši rečenicu">×</button></blockquote>').join(""):'<p class="muted">Kad ti se neka rečenica jako svidi, zapiši je ovdje.</p>')+
    '<details class="add"><summary>+ Zapiši rečenicu</summary><div class="field"><label for="qT">Rečenica iz knjige</label><textarea id="qT" maxlength="400"></textarea></div><div class="field"><label for="qP">Stranica (ne moraš)</label><input type="number" id="qP" min="1" max="'+b.pages+'" inputmode="numeric" style="max-width:120px"></div><button class="btn" id="qGo">Spremi rečenicu</button></details>';
  if(ans.length)h+='<h3>Moje misli</h3>'+ans.map(a=>'<div class="ans"><small>'+esc(fmtD(a.d))+'</small><b>'+esc(a.q)+'</b><p>'+esc(a.a)+'</p></div>').join("");
  openSheet(h);$("sheet").scrollTop=keep?sc:0;setTimeout(()=>{const ae=document.activeElement;if(ae&&ae.blur&&$("sheetBody").contains(ae))ae.blur();$("sheet").scrollTop=keep?sc:0;},70);let role="";
  $("bkBack").onclick=()=>{sfx.click();sheetDiary("knjige");};$("bkCov").onclick=()=>{sfx.click();sheetCover(b.id);};
  $("bkFly").onclick=()=>{closeSheet();const p=PLOTS[b.plot];if(FP.on){toast("Knjiga je označena na karti u torbi.",2400);return;}flyTo(p.x+.5,p.h+3,p.z+.5,32);};
  if($("bkRead"))$("bkRead").onclick=()=>{closeSheet();sheetProgress(b);};
  $("bkStars").querySelectorAll("button").forEach(x=>x.onclick=()=>{if(!b.done)return;b.stars=+x.dataset.s;sfx.click();save();syncSigns();checkBadges();sheetBook(b.id,true);});
  $("sheetBody").querySelectorAll(".roles button").forEach(x=>x.onclick=()=>{role=ROLES[+x.dataset.r];sfx.click();$("sheetBody").querySelectorAll(".roles button").forEach(y=>y.setAttribute("aria-pressed",String(y===x)));});
  $("chGo").onclick=()=>{const n=$("chN").value.trim();if(!n){$("chN").focus();return;}b.chars.push({n,r:role,o:$("chO").value.trim()});save();sfx.chime();checkBadges();sheetBook(b.id,true);};
  $("qGo").onclick=()=>{const t=$("qT").value.trim();if(!t){$("qT").focus();return;}const p=parseInt($("qP").value,10);b.quotes.push({t,p:p>0?p:0,d:today()});save();sfx.chime();checkBadges();sheetBook(b.id,true);};
  $("sheetBody").querySelectorAll("[data-dc]").forEach(x=>x.onclick=()=>{b.chars.splice(+x.dataset.dc,1);save();sheetBook(b.id,true);});
  $("sheetBody").querySelectorAll("[data-dq]").forEach(x=>x.onclick=()=>{b.quotes.splice(+x.dataset.dq,1);save();sheetBook(b.id,true);});}
/* ---- the cover editor ---- */
function sheetCover(id){const b=S.books.find(x=>x.id===id);if(!b)return;let px=(b.cover&&b.cover.length===256?b.cover:"0".repeat(256)).split("");let col=1,tool="kist";const undo=[];
  openSheet('<button class="back" id="cvBack">‹ Natrag na knjigu</button><h2>Naslovnica</h2><p class="muted">Nacrtaj naslovnicu za „'+esc(b.title)+'”. Pojavit će se u dnevniku i na natpisu iznad knjige na otoku.</p>'+
    '<div class="cvwrap"><canvas id="cvC" width="320" height="320" aria-label="Platno za crtanje"></canvas></div>'+
    '<div class="pal">'+COVER_PAL.map((c,i)=>'<button data-c="'+i+'" aria-label="Boja '+(i+1)+'" aria-pressed="'+(i===col)+'" style="background:'+c+'"></button>').join("")+'</div>'+
    '<div class="row tools"><button class="btn soft" data-tool="kist" aria-pressed="true">Kist</button><button class="btn soft" data-tool="kanta" aria-pressed="false">Kanta</button><button class="btn soft" data-tool="gumica" aria-pressed="false">Gumica</button><button class="btn soft" id="cvUndo">Vrati</button><button class="btn soft" id="cvClr">Očisti</button></div>'+
    '<button class="btn big" id="cvSave">Spremi naslovnicu</button>');
  const cv=$("cvC"),x=cv.getContext("2d");const draw=()=>{for(let i=0;i<256;i++){x.fillStyle=COVER_PAL[parseInt(px[i],16)];x.fillRect((i%16)*20,Math.floor(i/16)*20,20,20);}x.strokeStyle="rgba(22,36,58,.08)";x.lineWidth=1;for(let i=1;i<16;i++){x.beginPath();x.moveTo(i*20+.5,0);x.lineTo(i*20+.5,320);x.moveTo(0,i*20+.5);x.lineTo(320,i*20+.5);x.stroke();}};draw();
  const cell=e=>{const r=cv.getBoundingClientRect();const cx=Math.floor((e.clientX-r.left)/r.width*16),cy=Math.floor((e.clientY-r.top)/r.height*16);return cx>=0&&cy>=0&&cx<16&&cy<16?cy*16+cx:-1;};
  const hex=n=>n.toString(16);
  const fill=(i,to)=>{const from=px[i];if(from===to)return;const st=[i];while(st.length){const j=st.pop();if(px[j]!==from)continue;px[j]=to;const cx=j%16,cy=Math.floor(j/16);if(cx>0)st.push(j-1);if(cx<15)st.push(j+1);if(cy>0)st.push(j-16);if(cy<15)st.push(j+16);}};
  let down=false;const paint=e=>{const i=cell(e);if(i<0)return;if(tool==="kanta"){fill(i,hex(col));}else px[i]=tool==="gumica"?"0":hex(col);draw();};
  cv.onpointerdown=e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);undo.push(px.join(""));if(undo.length>40)undo.shift();down=true;paint(e);};
  cv.onpointermove=e=>{if(down&&tool!=="kanta")paint(e);};cv.onpointerup=cv.onpointercancel=()=>{down=false;};
  $("sheetBody").querySelectorAll("[data-c]").forEach(bt=>bt.onclick=()=>{col=+bt.dataset.c;if(tool==="gumica")tool="kist";sfx.click();$("sheetBody").querySelectorAll("[data-c]").forEach(y=>y.setAttribute("aria-pressed",String(y===bt)));$("sheetBody").querySelectorAll("[data-tool]").forEach(y=>y.setAttribute("aria-pressed",String(y.dataset.tool===tool)));});
  $("sheetBody").querySelectorAll("[data-tool]").forEach(bt=>bt.onclick=()=>{tool=bt.dataset.tool;sfx.click();$("sheetBody").querySelectorAll("[data-tool]").forEach(y=>y.setAttribute("aria-pressed",String(y===bt)));});
  $("cvUndo").onclick=()=>{if(undo.length){px=undo.pop().split("");draw();}};$("cvClr").onclick=()=>{undo.push(px.join(""));px="0".repeat(256).split("");draw();};
  $("cvBack").onclick=()=>{sfx.click();sheetBook(b.id);};
  $("cvSave").onclick=()=>{const s=px.join("");b.cover=/[^0]/.test(s)?s:"";save();sfx.fanfare();if(signs[b.id])signs[b.id].userData.key="";syncSigns();checkBadges();toast("Naslovnica je spremljena. Pogledaj natpis iznad knjige na otoku!",3200);sheetBook(b.id);};}
/* the floating sign above a book shows its cover */
const _signTexD=signTex;
signTex=function(b){if(!b.cover||b.cover.length!==256)return _signTexD(b);const c=document.createElement("canvas");c.width=512;c.height=150;const x=c.getContext("2d");const G=GENRES[b.genre];
  const rr=(X,Y,w,h,r)=>{x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath();};
  rr(6,6,500,120,26);x.fillStyle="#fffdf7";x.fill();x.lineWidth=8;x.strokeStyle="#16243a";x.stroke();
  for(let i=0;i<256;i++){x.fillStyle=COVER_PAL[parseInt(b.cover[i],16)];x.fillRect(18+(i%16)*6,18+Math.floor(i/16)*6,6,6);}x.lineWidth=4;x.strokeRect(16,16,100,100);
  x.fillStyle="#16243a";const TW=350,fit=(t,w)=>{if(x.measureText(t).width<=w)return t;while(x.measureText(t+"…").width>w&&t.length>2)t=t.slice(0,-1);return t.trim()+"…";};let fs=40;for(;fs>=30;fs-=2){x.font="700 "+fs+"px 'Pixelify Sans', monospace";if(x.measureText(b.title).width<=TW)break;}
  let y2=100;if(fs>=30)x.fillText(b.title,132,60);else{x.font="700 30px 'Pixelify Sans', monospace";const w=b.title.split(" ");let l1="";while(w.length&&x.measureText((l1+" "+w[0]).trim()).width<=TW)l1=(l1+" "+w.shift()).trim();if(!l1)l1=fit(w.shift(),TW);x.fillText(l1,132,48);x.fillText(fit(w.join(" "),TW),132,82);y2=112;}
  const pct=b.done?100:Math.round(100*b.page/b.pages);x.font="600 24px Lexend, sans-serif";x.fillStyle="#52637a";
  if(y2>100)x.font="600 20px Lexend, sans-serif";
  if(!b.done){x.fillText(bldName(b),132,y2);rr(330,y2-20,110,22,10);x.fillStyle="#f1ede2";x.fill();x.lineWidth=4;x.stroke();rr(330,y2-20,Math.max(16,110*pct/100),22,10);x.fillStyle=G.col;x.fill();x.fillStyle="#16243a";x.font="700 26px 'Pixelify Sans',monospace";x.fillText(pct+"%",448,y2+1);}
  else{x.fillText("Pročitano!",132,y2);x.fillStyle="#c98a00";x.font="700 "+(y2>100?24:30)+"px 'Pixelify Sans',monospace";x.fillText("★".repeat(b.stars||0),y2>100?262:300,y2+2);}
  x.beginPath();x.moveTo(236,126);x.lineTo(256,146);x.lineTo(276,126);x.fillStyle="#16243a";x.fill();const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;return tex;};
