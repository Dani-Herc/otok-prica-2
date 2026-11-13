/* =================== v20: ALBUM OTKRIĆA ===================
   Dani (2026-11-13): an album with blurred pictures that fill in as each animal or thing is discovered, and a page
   with interesting facts for every animal, so she learns while playing. The encyclopedia (24t_enc) already worked
   like that for the first island and the four old worlds; 25q_album_data.js adds 69 pages for the districts and all
   12 portal worlds (animals, magical creatures, people from the stories and the worlds themselves).
   Here: undiscovered pictures are a soft blur instead of a black shadow, a "?" sits on them, the album opens with a
   count per kind, and pages for animals Dorotea already met are filled in once, quietly. All state stays in S.enc. */
document.head.insertAdjacentHTML("beforeend",`<style>
.encCard.lock img,.encPg.lock .pic img{filter:blur(6px) saturate(.55) brightness(1.05) opacity(.8);transform:scale(1.08)}
.encCard.lock .pic,.encPg.lock .pic{position:relative}
.encCard.lock .pic::after,.encPg.lock .pic::after{content:"?";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:800 2.1rem var(--display),sans-serif;color:#fff;text-shadow:0 2px 0 var(--line),0 0 10px rgba(22,36,58,.55)}
.albSum{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 4px}
.albSum span{display:inline-flex;align-items:center;gap:6px;background:#fff;border:2px solid var(--line);border-radius:999px;padding:3px 10px;font-size:.85rem}
.albSum b{font-family:var(--display)}
.albSum i{display:inline-block;width:46px;height:7px;border-radius:4px;background:#e2e7ef;overflow:hidden;position:relative}
.albSum i u{position:absolute;left:0;top:0;bottom:0;background:#3fa86a;border-radius:4px}
.encTabs{flex-wrap:nowrap}
</style>`);
/* animals with an extra model kind */
for(const [k,p] of [["trubac","trubac"],["zvjezdana","sova"],["golub2","golub"],["paun2","paun"]])if(ENCK[p]&&!ENCKIND[k])ENCKIND[k]=p;
/* pages for animals and worlds she already knows are filled in once, without pop-ups */
function albBackfill(){const E2=encS();if(E2.v20)return;E2.v20=1;
  const met=k=>(S.visitors||[]).includes(k)||(S.met&&S.met[k]);
  for(const e of ENC){if(!e.v20||E2.d[e.k])continue;
    if((e.ent&&e.ent.some(met))||(e.enter&&S.wst&&S.wst[e.enter]&&Object.keys(S.wst[e.enter]).length)){E2.d[e.k]=today();E2.f[e.k]=1;}}
  save();}
try{albBackfill();}catch(e){}
const ALBG=[["Životinje",e=>e.t==="z"||e.t==="d"],["Čarobna bića",e=>e.t==="c"],["Likovi",e=>e.t==="l"],["Mjesta i čuda",e=>e.t==="m"||e.t==="p"]];
{const _se=sheetEnc;sheetEnc=function(ch,k){try{albBackfill();}catch(e){}const r=_se.apply(this,arguments);
  if(!ENCV.k){const head=$("sheetBody").querySelector(".encHead");if(head&&!$("albSum")){
    const h='<div class="albSum" id="albSum">'+ALBG.map(([n,f])=>{const L=ENC.filter(f),g=L.filter(e=>encGot(e.k)).length;return '<span>'+n+' <b>'+g+' / '+L.length+'</b><i><u style="width:'+Math.round(100*g/Math.max(1,L.length))+'%"></u></i></span>';}).join("")+'</div>';
    head.insertAdjacentHTML("afterend",h);}
    const t=$("sheetBody").querySelector(".encTabs [aria-pressed=true]");if(t)try{t.scrollIntoView({block:"nearest",inline:"center"});}catch(e){}}
  return r;};}
