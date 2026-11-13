/* =================== v18: JOYSTICK: always clear what to press ===================
   Dani (2026-11-13): with the controller a lot still needed the mouse. Now:
   - while exploring, the nearest thing Rida can use (door, resident, animal, chest, letter, egg...) gets a big
     on-screen button with a green A, and A does exactly that (A only jumps when nothing is near);
   - every on-screen button shows its controller button (A, B, X, Y, LB/RB, ☰) as soon as a controller is used;
   - every window opens with the golden frame already on the main button, a strip at the bottom says what the
     buttons do, and sliders / number fields change with ◀ ▶;
   Nothing here touches the save. */
const PJ={ctx:null,t:0,mt:0,root:null,last:""};
document.head.insertAdjacentHTML("beforeend",`<style>
body.pad [data-pk]::before{content:attr(data-pk);display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;padding:0 5px;margin-right:8px;border-radius:12px;font:700 .8rem var(--display),sans-serif;color:#fff;background:#3aa84a;border:2px solid var(--line);vertical-align:middle;line-height:1;flex:none}
body.pad [data-pk="B"]::before{background:#d8403a}body.pad [data-pk="X"]::before{background:#2f74d8}body.pad [data-pk="Y"]::before{background:#e8b020;color:var(--ink)}
body.pad [data-pk="☰"]::before,body.pad [data-pk="LB · RB"]::before{background:#52637a;border-radius:7px}
body.pad #sheetX[data-pk]::before{position:absolute;left:-30px;top:50%;transform:translateY(-50%);margin:0}
body.pad #hotbar[data-pk]::before{position:absolute;left:50%;top:-30px;transform:translateX(-50%);margin:0}
#padCtx{position:fixed;left:50%;bottom:calc(96px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:30;font-size:1.05rem;padding:10px 18px;box-shadow:0 4px 0 var(--line);max-width:min(86vw,520px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#padCtx[hidden]{display:none}
#padHint{position:fixed;left:50%;bottom:calc(8px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:200;display:flex;gap:14px;align-items:center;background:rgba(22,36,58,.88);color:#fff;border-radius:14px;padding:6px 14px;font-size:.9rem;pointer-events:none;white-space:nowrap}
#padHint[hidden]{display:none}#padHint .pk{min-width:24px;height:24px;font-size:.78rem;border-width:2px;margin-right:5px}
body.foto #padCtx,body.foto #padHint{display:none!important}
body.pad #sheet{padding-bottom:58px;scroll-padding-bottom:58px}
</style>`);
document.body.insertAdjacentHTML("beforeend",'<button class="btn" id="padCtx" data-pk="X" hidden></button><div id="padHint" hidden></div>');
/* which controller button each on-screen button belongs to */
function pjMark(){for(const [id,k] of [["fpJump","A"],["fpDive","B"],["fpOff","Y"],["bldGo","X"],["fpExit","☰"],["exploreBtn","A"],["readBtn","X"],["sheetX","B"],["hotbar","LB · RB"]]){const el=$(id);if(el&&el.dataset.pk!==k)el.dataset.pk=k;}}
pjMark();
/* the nearest thing Rida can use, without having to aim */
function pjFind(){if(!FP.on||!$("veil").hidden||FP.shopping)return null;const bg=$("bldGo");if(bg&&!bg.hidden)return null;
  const px=FP.p.x,pz=FP.p.z,py=FP.p.y,fw=new THREE.Vector3();camera.getWorldDirection(fw);fw.y=0;fw.normalize();
  let best=null,bs=1e9;const cand=(x,y,z,max,o)=>{const dx=x-px,dz=z-pz,d=Math.hypot(dx,dz);if(d>max||Math.abs(y-py)>2.4)return;
    const front=d<.01?1:(dx*fw.x+dz*fw.z)/d;if(d>2.1&&front<.15)return;const s=d-front*.8;if(s<bs){bs=s;best=o;}};
  for(const e of ents){if(e===rida||!e.g||!e.g.visible||e.dead)continue;const y=e.g.position.y;cand(e.g.position.x,y,e.g.position.z,2.9,{t:"ent",e});}
  for(const c of chestObjs){if(c.open||!c.g||!c.g.visible)continue;cand(c.x,c.y==null?py:c.y,c.z,2.6,{t:"chest",c});}
  if(bottle&&bottle.visible)cand(bottle.position.x,py,bottle.position.z,2.8,{t:"bottle"});
  const wp=new THREE.Vector3();for(const o of tapObjs){if(!o.visible||!o.parent)continue;o.getWorldPosition(wp);cand(wp.x,wp.y,wp.z,2.5,{t:"tap",o});}
  return best;}
function pjLabel(c){if(c.t==="ent"){const e=c.e;const un=typeof suUnknown==="function"&&suUnknown(e);return un?"Upoznaj novu životinju":"Pozdravi: "+(e.name||"prijatelja");}
  if(c.t==="chest")return "Otvori škrinju";if(c.t==="bottle")return "Pročitaj pismo";return "Pogledaj";}
function pjDo(c){if(!c)return;sfx.click();
  if(c.t==="ent"){const en=c.e;if(typeof faceTo==="function")faceTo([en.g.position.x,en.g.position.y,en.g.position.z]);if(typeof animalTap==="function"&&animalTap(en,true))return;
    const V=VISITORS.find(v=>v.k===en.kind);say(en,V?V.d:"Bok!",4500);en.celebrate=.6;bump("greet",1);return;}
  if(c.t==="chest"){openChest(c.c);return;}if(c.t==="bottle"){openLetter();return;}
  if(c.t==="tap"&&c.o.userData.onTap)c.o.userData.onTap();}
$("padCtx").onclick=()=>{const c=PJ.ctx;PJ.ctx=null;$("padCtx").hidden=true;pjDo(c);};
/* the strip at the bottom of every window */
function pjHint(root){const el=$("padHint");if(!root||root===document.body){if(!el.hidden)el.hidden=true;return;}
  const k=(c,t)=>'<span class="pk '+c+'">'+t+'</span>';const tabs=root.querySelector("[role=tab]");
  const f=PAD.focus,slide=f&&f.tagName==="INPUT"&&(f.type==="range"||f.type==="number");
  const h='<span>'+k("sh","✥")+'biraj</span>'+(slide?'<span>'+k("sh","◀▶")+'mijenjaj</span>':'')+'<span>'+k("a","A")+'odaberi</span><span>'+k("b","B")+'natrag</span>'+(tabs?'<span>'+k("sh","LB")+k("sh","RB")+'kartice</span>':'');
  if(PJ.last!==h){PJ.last=h;el.innerHTML=h;}el.hidden=false;}
/* sliders and number fields: ◀ ▶ change the value instead of jumping away */
{const _pm=padMove;padMove=function(dx,dy){const f=PAD.focus;
  if(dx&&f&&f.tagName==="INPUT"&&(f.type==="range"||f.type==="number")&&padRoot()&&padFocusables(padRoot()).includes(f)){
    const st=parseFloat(f.step)||1,mn=f.min!==""?parseFloat(f.min):-1e9,mx=f.max!==""?parseFloat(f.max):1e9;let v=parseFloat(f.value);if(isNaN(v))v=f.type==="number"?Math.max(mn,0):mn;
    const big=f.type==="number"&&(mx-mn)>200?5:1;v=Math.max(mn,Math.min(mx,v+dx*st*big*(f.type==="range"&&(mx-mn)/st>40?2:1)));f.value=String(v);
    f.dispatchEvent(new Event("input",{bubbles:true}));f.dispatchEvent(new Event("change",{bubbles:true}));tone(700+dx*120,.03,"triangle",.02);return;}
  return _pm.apply(this,arguments);};}
{const _tp=tickPad;tickPad=function(dt){const g=padGet();const xNow=!!(g&&g.buttons[PB.X]&&(g.buttons[PB.X].pressed||g.buttons[PB.X].value>.5));const aPr=xNow&&!PAD.prev[PB.X];
  const wasCtx=PJ.ctx,bg=$("bldGo"),bldVis=FP.on&&bg&&!bg.hidden&&$("veil").hidden;
  /* X does the action; the original X (touch what is in the middle) is skipped this time */
  if(aPr&&FP.on&&$("veil").hidden&&(bldVis||wasCtx))PAD.prev[PB.X]=true;
  _tp.apply(this,arguments);
  if(!PAD.on){if(!$("padCtx").hidden)$("padCtx").hidden=true;if(!$("padHint").hidden)$("padHint").hidden=true;PJ.ctx=null;return;}
  /* X does the main action when a button with X is on screen; A is only ever jump (Dani: jumping by the door went inside) */
  if(aPr&&FP.on&&$("veil").hidden&&(bldVis||wasCtx)){if(bldVis){bg.classList.add("padhit");setTimeout(()=>bg.classList.remove("padhit"),160);bg.click();}else{PJ.ctx=null;$("padCtx").hidden=true;pjDo(wasCtx);}}
  PJ.t-=dt;if(PJ.t<=0){PJ.t=.12;pjMark();const c=pjFind();PJ.ctx=c;const el=$("padCtx");if(c){const l=pjLabel(c);if(el.textContent!==jzT(l))el.textContent=l;}el.hidden=!c;}
  /* windows: the golden frame is already on the main button */
  const root=padRoot(),menu=root&&root!==document.body;PJ.mt-=dt;
  if(menu&&PJ.mt<=0){PJ.mt=.2;const f=padFocusables(root);if(!PAD.focus||!f.includes(PAD.focus)){const d=padDefault(root);if(d)padFocus(d);}}
  pjHint(menu?root:null);if(menu&&!$("padCtx").hidden)$("padCtx").hidden=true;};}
/* the touch/mouse player never sees any of this: it only appears with body.pad */
{const _end=endSquirrel;endSquirrel=function(){$("padCtx").hidden=true;PJ.ctx=null;return _end.apply(this,arguments);};}
