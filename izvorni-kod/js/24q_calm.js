/* =================== CALM UI: one notice at a time, quieter HUD per activity =================== */
/* Notices (toasts and find cards) now wait their turn instead of replacing each other.
   Finds go first, repeats are dropped, long queues read a little faster, and nothing shows during a film. */
const NQ=[];let nCur=null,nT=0;const _toast0=toast,_find0=showFind;
function nLen(t){return Math.min(5600,Math.max(2400,1300+String(t).length*40));}
toast=function(t,ms){t=String(t==null?"":t);if(!t)return;
  if(nCur&&nCur.k==="t"&&nCur.t===t){if(!nCur.ext){nCur.ext=1;clearTimeout(nT);nT=setTimeout(nDone,1800);}return;}
  if(NQ.some(q=>q.k==="t"&&q.t===t))return;
  NQ.push({k:"t",t,ms});while(NQ.length>6){const i=NQ.findIndex(q=>q.k==="t");NQ.splice(i>=0?i:0,1);}nPump();};
showFind=function(img,title,rar,sub){const i=NQ.findIndex(q=>q.k!=="f");const it={k:"f",a:[img,title,rar,sub]};if(i<0)NQ.push(it);else NQ.splice(i,0,it);nPump();};
function nPump(){if(nCur||!NQ.length)return;if(typeof CINE!=="undefined"&&CINE)return;
  nCur=NQ.shift();const more=NQ.length>0;let ms;
  if(nCur.k==="t"){ms=nCur.ms||nLen(nCur.t);if(more)ms=Math.max(2200,Math.min(ms,nLen(nCur.t))*(NQ.length>2?.65:.85));_toast0(nCur.t,ms+4000);}
  else{ms=more?2600:3200;_find0.apply(null,nCur.a);}
  clearTimeout(nT);nT=setTimeout(nDone,ms);}
function nDone(){if(!nCur)return;const el=$(nCur.k==="t"?"toast":"findPop");if(el)el.hidden=true;nCur=null;setTimeout(nPump,220);}
setInterval(nPump,400);
$("toast").addEventListener("click",()=>{if(nCur&&nCur.k==="t"){clearTimeout(nT);nDone();}});
$("toast").title="Dodirni za sljedeću poruku";

/* While exploring, the top bar keeps only what matters there (coins); the rest peeks in when it changes. */
function peekChip(el){if(!el||!document.body.classList.contains("fp"))return;el.classList.add("peek");clearTimeout(el._pk);el._pk=setTimeout(()=>el.classList.remove("peek"),3500);}
for(const id of ["tixN","pagesN","streakN"]){const n=$(id);if(!n)continue;let last=n.textContent;new MutationObserver(()=>{if(n.textContent!==last){last=n.textContent;peekChip(n.closest(".chip"));}}).observe(n,{childList:true,characterData:true,subtree:true});}

/* Camera buttons fade back after a while unused; hovering or touching brings them back. */
{const cc=$("camCtl");if(cc){let t=0;const wake=()=>{cc.classList.remove("idle");clearTimeout(t);t=setTimeout(()=>cc.classList.add("idle"),9000);};
  cc.addEventListener("pointerdown",wake);cc.addEventListener("pointerenter",wake);wake();}}
