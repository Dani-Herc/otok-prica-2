/* =================== v21: PRONAĐI NAJBOLJI NAPREDAK ===================
   Dani (2026-11-13): Dorotea had reached level 13, every copy in the cloud was level 11 (same 377 pages). A restore
   from a file at 16:31 had replaced the richer save, and the sync rule only compared pages and books.
   - saveLevel(s): the level of any save, used by the sync (25_start progKey) so a higher level wins over a newer save.
   - keepBefore(s): before a restore from file or a reset, the save that is about to be replaced is kept in its own
     local key (otok-prica-v3-prije) and cloud doc (otok3prije), which nothing else overwrites.
   - Kutak za roditelje gets "Pronađi najbolji napredak": every copy this browser and the cloud hold, with level,
     pages, coins and time; one tap restores the chosen one (as a deliberate restore, so it wins everywhere). */
function saveLevel(s){if(!s||typeof s!=="object")return 0;const keep=S;try{S=migrate(JSON.parse(JSON.stringify(s)));return level();}catch(e){return 0;}finally{S=keep;}}
async function napDb(){try{if(!window.claude||!window.claude.use)return null;const [db,user]=await Promise.race([Promise.all([window.claude.use("db"),window.claude.use("user")]),new Promise(r=>setTimeout(()=>r([null,null]),6000))]);
  if(!db||!user)return null;const id=await user.id();return id?db.collection("data/users/"+id):null;}catch(e){return null;}}
function keepBefore(s){if(!s||!(Number(s.xp)>0||saveLevel(s)>1))return;const js=JSON.stringify(s);
  try{const old=localStorage.getItem(KEY+"-prije");let o=null;try{o=old&&JSON.parse(old);}catch(e){}
    if(!o||saveLevel(s)>=saveLevel(o)||Number(s.xp)>Number(o.xp))localStorage.setItem(KEY+"-prije",js);}catch(e){}
  napDb().then(col=>{if(col)col.doc("otok3prije").set({json:js,updatedAt:s.updatedAt||Date.now(),day:today()}).catch(()=>{});});}
async function napList(){const out=[];const add=(src,s)=>{if(!s||typeof s!=="object"||!Array.isArray(s.books))return;out.push({src,s,lv:saveLevel(s),xp:Number(s.xp)||0,coins:s.coins||0,t:s.updatedAt||0});};
  const P=k=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}};
  add("Ovaj preglednik, sada",S);add("Ovaj preglednik, dnevna kopija",P(KEY+"-bak"));add("Ovaj preglednik, prije vraćanja iz datoteke",P(KEY+"-prije"));
  const col=await napDb();if(col){for(const [d,n] of [["otok3","Oblak, glavni"],["otok3bak","Oblak, dnevna kopija"],["otok3prije","Oblak, prije vraćanja iz datoteke"]]){
    try{const sn=await col.doc(d).get();if(sn.exists){const x=sn.data();if(x&&x.json)add(n,JSON.parse(x.json));}}catch(e){}}}
  const seen=new Set();return out.filter(o=>{const k=o.xp+"|"+o.lv+"|"+o.coins+"|"+o.t;if(seen.has(k))return false;seen.add(k);return true;}).sort((a,b)=>b.lv-a.lv||b.xp-a.xp||b.t-a.t);}
async function napShow(){const box=$("napBox");if(!box)return;box.innerHTML='<p class="muted">Tražim sve kopije...</p>';const L=await napList();
  if(!L.length){box.innerHTML='<p class="muted">Nema drugih kopija.</p>';return;}
  box.innerHTML=L.map((o,i)=>'<div class="card" style="padding:8px 10px;margin-top:8px;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div><b>Razina '+o.lv+'</b> · '+o.xp+' stranica · '+o.coins+' zlatnika<br><small class="muted">'+esc(o.src)+(o.t?' · '+esc(new Date(o.t).toLocaleString("hr-HR")):'')+'</small></div>'+
    (o.s===S?'<small class="muted">trenutno u igri</small>':'<button class="btn soft" data-nap="'+i+'">Vrati ovu</button>')+'</div>').join("");
  box.querySelectorAll("[data-nap]").forEach(b=>b.onclick=()=>{const o=L[+b.dataset.nap];if(b.dataset.ok!=="1"){b.dataset.ok="1";b.textContent="Sigurno? Pritisni opet";return;}
    keepBefore(S);S=migrate(JSON.parse(JSON.stringify(o.s)));S.updatedAt=Date.now();S.resetAt=S.updatedAt;save();
    b.disabled=true;b.textContent="Učitavam...";const go=()=>location.reload();if(remote)remote.set({json:JSON.stringify(S),updatedAt:S.updatedAt}).then(go,go);else setTimeout(go,300);});}
{const _pb=parentBackupUI;parentBackupUI=function(){_pb.apply(this,arguments);const ib=$("pImpBox");if(!ib||$("napGo"))return;
  ib.insertAdjacentHTML("afterend",'<div style="margin-top:12px"><button class="btn" id="napGo">Pronađi najbolji napredak</button><p class="muted" style="margin:6px 0 0">Pokaže sve spremljene kopije u ovom pregledniku i u oblaku, s razinom svake. Možete vratiti bilo koju.</p><div id="napBox"></div></div>');
  $("napGo").onclick=()=>{sfx.click();napShow();};};}
/* v21: automatic saving. Every action already saved, but the cloud copy waited almost a second and some progress
   (walking, exploring, minigame rounds) was only written at the next action. Now the game is also saved every
   15 seconds while it is open, and at once (browser and cloud) when the tab is hidden, the window is closed or
   the device goes to sleep. */
function napFlush(){if(saveBlock||!S)return;try{save();}catch(e){}
  if(remote){clearTimeout(pushT);try{remote.set({json:JSON.stringify(S),updatedAt:S.updatedAt}).catch(()=>{});}catch(e){}}}
setInterval(()=>{if(!document.hidden)try{save();}catch(e){}},15000);
document.addEventListener("visibilitychange",()=>{if(document.hidden)napFlush();});
addEventListener("pagehide",napFlush);addEventListener("beforeunload",napFlush);addEventListener("blur",()=>{try{save();}catch(e){}});
