/* =================== v21: KAMO IDEMO? ===================
   Dani (2026-11-13): "moving between portals, islands and worlds is terribly hard; you have to remember 3-4 steps
   to get anywhere". One window, from a compass button at the top (or ☰ Back on the controller):
   - Putuj: the island, the three districts and every world, each one tap away (locked ones say at which level).
   - Ovdje: the people and animals with tasks on this map, with what they need, and "Pokaži put": a tall light
     beam over the target, a red mark on the compass and a small sign with the distance until she is there.
   Nothing new is saved except where she is (the same fields the bridges and portals already use). */
const KAMO={goal:null,beam:null,chip:null,arr:0};
const KAMO_SVG='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="#fff" stroke="#16243a" stroke-width="2.4"/><path d="M12 4.5l3 7.5-3 7.5-3-7.5z" fill="#e04a3a"/><path d="M12 12l3 0-3 7.5-3-7.5z" fill="#4a7fd6"/><circle cx="12" cy="12" r="1.6" fill="#16243a"/></svg>';
document.head.insertAdjacentHTML("beforeend",`<style>
.kamoSec{margin:10px 0 4px;font:800 1rem var(--display),sans-serif}
.kamoGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.kamoT{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;padding:9px 11px;border:3px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 3px 0 var(--line);cursor:pointer;font:inherit;color:inherit;min-height:56px}
.kamoT b{font-family:var(--display);font-size:1rem}.kamoT small{opacity:.75}
.kamoT.here{background:#e8f7e3}.kamoT.off{opacity:.5;cursor:default;box-shadow:none}
.kamoT:not(.off):active{transform:translateY(2px);box-shadow:0 1px 0 var(--line)}
.kamoD{margin-top:4px;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.kamoP{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border:2px solid var(--line);border-radius:12px;background:#fff;margin-top:6px}
.kamoP div{min-width:0}.kamoP small{display:block;opacity:.75}
.kamoP.done{background:#eef8ea}
#kamoChip{position:absolute;left:50%;top:58px;transform:translateX(-50%);background:#e04a3a;color:#fff;border:3px solid var(--line);border-radius:999px;padding:3px 12px;font:800 .9rem var(--display),sans-serif;box-shadow:0 3px 0 var(--line);white-space:nowrap;pointer-events:auto;cursor:pointer;z-index:6}
#kamoChip[hidden]{display:none}
@media (max-height:480px){#kompas{width:min(440px,calc(100vw - 590px))}#kamoChip{top:50px}}
</style>`);
function kamoName(id){if(!id||id==="main")return "Otok priča";if(DST[id])return dLocName(id);return WORLDS[id]?WORLDS[id].n:id;}
function kamoLv(id){if(!id)return 1;if(DST[id])return DST[id].lv;const w=WORLDS[id];return w?w.lv:99;}
function kamoOpen(id){if(!id)return true;if(DST[id])return dOpen(id);const w=WORLDS[id];if(!w||w.soon)return false;if(w.dist&&!dOpen(w.dist)&&level()<w.lv)return false;
  return level()>=w.lv||!!(S.wst&&S.wst[id]&&Object.keys(S.wst[id]).length)||!!(S.wed&&S.wed[id]);}
function kamoGo(dest){dest=dest||null;const cur=S.world||null;if(dest===cur){closeSheet();toast("Već si ovdje!",2000);return;}
  if(!kamoOpen(dest)){sfx.click();toast(kamoName(dest)+" se otvara na razini "+kamoLv(dest)+".",3000);return;}
  try{if(typeof IN!=="undefined"&&IN.on)inLeave(true);}catch(e){}
  closeSheet();sfx.chime();S.wed=S.wed||{};if(cur)S.wed[cur]=S.edits;else S.wed.__isle=S.edits;
  if(dest){S.edits=S.wed[dest]||{};S.wed[dest]=S.edits;}else{S.edits=S.wed.__isle||{};delete S.wed.__isle;}
  S.world=dest;S.worldBack=null;S.distAt=null;S.brodTo=null;S.distFrom=cur&&DST[cur]?cur:"main";if(dest&&DST[dest]){S.dst=S.dst||{};S.dst[dest]=S.dst[dest]||today();}
  save();try{if(remote)remote.set({json:JSON.stringify(S),updatedAt:S.updatedAt}).catch(()=>{});}catch(e){}
  warpGo(!dest,()=>location.reload());}
/* who has something to say or to ask on this map */
function kamoPeople(){const out=[],seen=new Set();
  if(typeof PW!=="undefined"&&PW.q)for(const k in PW.q){const o=PW.q[k];if(!o.en||seen.has(o.en))continue;seen.add(o.en);const done=pwQDone(k),q=pwQS(k)||{};
    let st,tgt=o.en,tl="Pokaži put";
    if(done)st=o.pet?"Prijatelj! ✓":"Zadatak riješen ✓";
    else if(q.on){st=(o.got||"Skupljeno")+": "+(q.n||0)+" / "+o.need;const left=PW.pick.filter(p=>p.k===k&&!p.got&&p.g&&p.g.visible);
      if(left.length){const P=FP.on?FP.p:{x:128,z:128};left.sort((a,b)=>Math.hypot(a.x-P.x,a.z-P.z)-Math.hypot(b.x-P.x,b.z-P.z));tgt={x:left[0].x,y:left[0].y,z:left[0].z,name:o.got||"Sljedeći"};tl="Pokaži najbliži";}}
    else st="Ima zadatak za tebe. Razgovaraj!";
    out.push({n:o.en.name,st,done,tgt,tl,en:o.en});}
  for(const e of ents){if(e===rida||!e.name||!e.home||!e.frozen||seen.has(e))continue;seen.add(e);out.push({n:e.name,st:"Rado popriča s tobom.",done:false,tgt:e,tl:"Pokaži put",en:e});}
  if(!WORLD&&typeof JB!=="undefined")try{for(const m of JB.mk){if(m.k==="far")continue;out.push({n:m.k==="from"?"Zadatak stanovnika":(($("jcT")&&$("jcT").textContent)||"Dostava"),st:"Narančasti znak na kompasu.",done:false,tgt:{x:m.x,y:m.y||topY(Math.floor(m.x),Math.floor(m.z))+1,z:m.z,name:"Zadatak"},tl:"Pokaži put"});}}catch(e){}
  return out;}
function kamoPlaces(){const out=[];if(typeof PWH!=="undefined"&&PWH.hub&&HERE)out.push({n:"Trg portala",st:"Četiri portala u četiri svijeta.",tgt:{x:PWH.hub.x,y:topY(Math.floor(PWH.hub.x),Math.floor(PWH.hub.z))+1,z:PWH.hub.z,name:"Trg portala"},tl:"Pokaži put"});
  if(WORLD&&WG&&WG.spawn&&!DST[WORLD])out.push({n:"Izlazni portal",st:"Put natrag.",tgt:{x:WG.spawn.x,y:topY(Math.floor(WG.spawn.x),Math.floor(WG.spawn.z))+1,z:WG.spawn.z,name:"Izlaz"},tl:"Pokaži put"});
  return out;}
function sheetKamo(){const cur=S.world||null;
  const tile=(id,sub)=>{const open=kamoOpen(id),here=(id||null)===cur;const w=id&&WORLDS[id];
    const n=w&&!DST[id]?wStars(id):null;
    return '<button class="kamoT'+(here?" here":"")+(open?"":" off")+'" data-kamo="'+(id||"")+'"><b>'+esc(kamoName(id))+'</b><small>'+(here?"Ovdje si sada":!open?"Razina "+kamoLv(id):(n!=null&&WDEF[id]&&WDEF[id].item?esc(WDEF[id].item.hud)+" "+n+" / "+WSTAR_N:(sub||"Putuj")))+'</small></button>';};
  const people=(FP.on||WORLD)?kamoPeople():[];const places=kamoPlaces();
  const row=(p,i)=>'<div class="kamoP'+(p.done?" done":"")+'"><div><b>'+esc(p.n)+'</b><small>'+esc(p.st)+'</small></div>'+(p.done&&!p.tgt?'':'<button class="btn soft" data-kp="'+i+'">'+esc(p.tl)+'</button>')+'</div>';
  const all=people.concat(places);
  const old=Object.keys(WORLDS).filter(id=>!WORLDS[id].dist&&!DST[id]&&!WORLDS[id].soon);
  let h='<h2>Kamo idemo?</h2>';
  if(all.length)h+='<div class="kamoSec">Ovdje: '+esc(kamoName(cur))+'</div>'+all.map(row).join("");
  h+='<div class="kamoSec">Putuj</div><div class="kamoGrid">'+tile(null,"Knjižnica i dom")+DSK.map(k=>tile(k,"Četvrt")).join("")+'</div>';
  for(const k of DSK){const L=(typeof PWL!=="undefined"&&PWL[k])||[];if(!L.length)continue;h+='<div class="kamoSec">Svjetovi: '+esc(dLocName(k))+'</div><div class="kamoD">'+L.map(id=>tile(id)).join("")+'</div>';}
  if(old.length)h+='<div class="kamoSec">Svjetovi s Otoka priča</div><div class="kamoD">'+old.map(id=>tile(id)).join("")+'</div>';
  if(KAMO.goal)h+='<p><button class="btn soft" id="kamoOff">Makni oznaku puta</button></p>';
  h+='<p class="muted">Jedan dodir i Rida putuje. Na karti u torbi vidiš cijelu kartu ovog mjesta.</p>';
  openSheet(h);
  $("sheetBody").querySelectorAll("[data-kamo]").forEach(b=>b.onclick=()=>kamoGo(b.dataset.kamo||null));
  $("sheetBody").querySelectorAll("[data-kp]").forEach(b=>b.onclick=()=>{const p=all[+b.dataset.kp];kamoSet(p.tgt,p.n);});
  if($("kamoOff"))$("kamoOff").onclick=()=>{kamoClear();closeSheet();};}
/* the way to a target: light beam, compass mark and a distance sign */
function kamoSet(t,n){if(!t)return;closeSheet();sfx.chime();KAMO.goal={t,n:t.name||n||"Cilj"};KAMO.arr=0;
  if(!KAMO.beam){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xff6a4a,transparent:true,opacity:.32,depthWrite:false,fog:false});
    const c=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,60,10,1,true),m);c.position.y=30;g.add(c);
    const m2=new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:.9,depthWrite:false,fog:false});const a=new THREE.Mesh(new THREE.ConeGeometry(.55,.9,4),m2);a.rotation.x=Math.PI;a.position.y=3.2;a.name="arr";g.add(a);
    g.renderOrder=5;KAMO.beam=g;}
  scene.add(KAMO.beam);if(!FP.on&&typeof startSquirrel==="function")startSquirrel();toast("Prati crveni stup svjetla i crvenu oznaku na kompasu!",3200);}
function kamoClear(){KAMO.goal=null;if(KAMO.beam&&KAMO.beam.parent)KAMO.beam.parent.remove(KAMO.beam);if(KAMO.chip)KAMO.chip.hidden=true;}
function kamoTick(t){const G=KAMO.goal;if(!G){if(KAMO.chip)KAMO.chip.hidden=true;return;}const T0=G.t;const x=T0.x,z=T0.z,y=T0.y!=null?T0.y:topY(Math.floor(x),Math.floor(z))+1;
  if(KAMO.beam){KAMO.beam.position.set(x,y,z);const a=KAMO.beam.getObjectByName("arr");if(a){a.position.y=3.2+Math.sin(t*3)*.35;a.rotation.y=t*2;}}
  if(!FP.on){if(KAMO.chip)KAMO.chip.hidden=true;return;}
  if(!KAMO.chip){$("fpUI").insertAdjacentHTML("beforeend",'<div id="kamoChip" hidden></div>');KAMO.chip=$("kamoChip");KAMO.chip.onclick=()=>{sfx.click();kamoClear();};}
  const d=Math.hypot(x-FP.p.x,z-FP.p.z);KAMO.chip.hidden=false;KAMO.chip.textContent="➜ "+G.n+" · "+Math.round(d)+" m";
  if(d<2.6&&Math.abs(y-FP.p.y)<4){if(!KAMO.arr){KAMO.arr=1;sfx.fanfare&&sfx.fanfare();toast("Stigla si: "+G.n+"!",2600);setTimeout(()=>{if(KAMO.goal===G)kamoClear();},1200);}}}
{let tt=0,last=performance.now();const loop=()=>{const n=performance.now();tt+=Math.min(.1,(n-last)/1000);last=n;try{kamoTick(tt);}catch(e){}requestAnimationFrame(loop);};requestAnimationFrame(loop);}
/* compass: the target is a red mark */
{const _km=kpMarks;kpMarks=function(){const r=_km.apply(this,arguments);const G=KAMO.goal;if(G&&FP.on)r.unshift({x:G.t.x,z:G.t.z,k:"cilj",n:G.n,d:Math.hypot(G.t.x-FP.p.x,G.t.z-FP.p.z)});return r;};}
{const _ki=kpIcon;kpIcon=function(x,k,px,py,s){if(k!=="cilj")return _ki.apply(this,arguments);
  x.fillStyle="#16243a";x.beginPath();x.arc(px,py,s*.55,0,6.283);x.fill();x.fillStyle="#e04a3a";x.beginPath();x.arc(px,py,s*.42,0,6.283);x.fill();x.fillStyle="#fff";x.beginPath();x.arc(px,py,s*.16,0,6.283);x.fill();};}
/* the button: in explore mode at the top, in the island view in the menu */
function kamoBtn(){const ft=document.querySelector(".fptop");if(!ft||$("fpKamo"))return;const ref=$("fpEnc")||$("fpEmo")||$("fpExit");if(!ref)return;
  ref.insertAdjacentHTML("beforebegin",'<button class="fpico" id="fpKamo" aria-label="Kamo idemo?" title="Kamo idemo?">'+KAMO_SVG+'</button>');
  $("fpKamo").onclick=()=>{sfx.click();sheetKamo();};}
try{kamoBtn();}catch(e){}setTimeout(()=>{try{kamoBtn();}catch(e){}},1500);
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);try{const r=$("mmKarta")||$("mmJob")||$("mmStan")||$("mmHow");if(r&&!$("mmKamo")){r.insertAdjacentHTML("beforebegin",'<button class="btn" id="mmKamo">Kamo idemo?</button>');$("mmKamo").onclick=()=>{sfx.click();sheetKamo();};}}catch(e){}};}
/* controller: ☰ Back opens this window (the map is still in the bag) */
{const _tp=tickPad;tickPad=function(dt){const g=padGet();const on=!!(g&&g.buttons[PB.BACK]&&(g.buttons[PB.BACK].pressed||g.buttons[PB.BACK].value>.5));
  if(on&&!PAD.prev[PB.BACK]&&$("veil").hidden){PAD.prev[PB.BACK]=true;try{sheetKamo();}catch(e){}}return _tp.apply(this,arguments);};}
addEventListener("keydown",e=>{if((e.key==="m"||e.key==="M")&&!e.repeat&&$("veil").hidden&&!(document.activeElement&&/INPUT|TEXTAREA/.test(document.activeElement.tagName))){e.preventDefault();sheetKamo();}});
