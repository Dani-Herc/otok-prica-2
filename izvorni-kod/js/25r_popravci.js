/* =================== v18: POPRAVCI: entering is never on the jump key; water never traps Rida ===================
   Dani (2026-11-13): "sometimes she wants to jump and goes into the room instead", and "sometimes in water she stays
   on the bottom as if it were the surface and cannot get out".
   1. Keyboard/mouse: the door button (and the X action button) can never take keyboard focus, so Space (jump) never
      presses it. Entering is Enter on the keyboard, X on the controller.
   2. Districts are built over the island map; the island's waterfall cells (FALLS, counted as "not water") stayed in
      memory, so a lake in a district could have cells where Rida did not swim but sank and walked on the bottom.
      FALLS is now emptied for district and world maps.
   3. Standing in water that is too shallow to swim (one block) next to a high bank, a jump is stronger, so she
      can always climb out. */
for(const id of ["bldGo","padCtx"]){const el=$(id);if(el){el.setAttribute("tabindex","-1");el.addEventListener("mousedown",e=>e.preventDefault());el.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse")e.preventDefault();});}}
addEventListener("keydown",e=>{if(!FP.on||!$("veil").hidden)return;const a=document.activeElement;
  if((e.key===" "||e.key==="Enter")&&a&&a.tagName==="BUTTON"&&(a.id==="bldGo"||a.id==="padCtx"||a.closest("#fpUI")))a.blur();
  if(e.key==="Enter"&&!e.repeat&&!(a&&/INPUT|TEXTAREA/.test(a.tagName))){const bg=$("bldGo"),pc=$("padCtx");
    if(bg&&!bg.hidden){e.preventDefault();bg.click();}else if(pc&&!pc.hidden&&typeof PJ!=="undefined"&&PJ.ctx){e.preventDefault();pc.click();}}},true);
if(typeof dGen==="function"){const _dg=dGen;dGen=function(){try{FALLS.clear();}catch(e){}return _dg.apply(this,arguments);};}
{const _ts=tickSquirrel;tickSquirrel=function(dt){if(FP.on&&!FP.boat&&!FP.mount){const P=FP.p;const inW=!FP.swim&&waterAt(P.x,P.y+.15,P.z);
    if(inW&&!FP._wj){FP._wj=1;FP._wjOld=FP.jumpV;FP.jumpV=Math.max(FP.jumpV||7.6,10.6);}else if(!inW&&FP._wj){FP._wj=0;FP.jumpV=FP._wjOld;}}
  const jp=FP.on&&FP.swim&&!FP.under&&!FP.boat&&!FP.mount&&(FP.jump||FP.keys[" "]||FP.upB);
  const r=_ts.apply(this,arguments);
  /* swimming at the surface next to a high bank: jump leaps out (also out of holes dug at the shore) */
  if(jp&&FP.swim&&!FP.under&&performance.now()>(FP._leapT||0)){const P=FP.p;
    for(const [dx,dz] of [[.5,0],[-.5,0],[0,.5],[0,-.5]]){const x=P.x+dx,z=P.z+dz;if(hitsAt(x,P.y+1.05,z)&&!solidAt(x,P.y+2.6,z)&&!solidAt(P.x,P.y+2.2,P.z)){FP.v.y=12;FP._leapT=performance.now()+700;sfx.splash();burst(P.x,P.y+.6,P.z,14,[[.8,.93,1],[1,1,1]],1.4,2,.6);break;}}}
  return r;};}
