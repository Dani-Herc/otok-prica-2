/* =================== SQUIRREL (first person) =================== */
/* explore the island at squirrel height: walk, jump, climb walls and trees, pick up treasures by touching them, build from the bag */
var FP={on:false,p:new THREE.Vector3(),v:new THREE.Vector3(),yaw:0,pitch:0,ground:false,safe:new THREE.Vector3(),safeT:0,keys:{},joy:{x:0,y:0,id:null},look:null,jump:false,bob:0,step:0,climb:false,splash:0,wet:false,last:null,tgt:null};
const FPR=.26,FPH=.7,FPE=.58,FPREACH=5.5;
function fpSolid(x,y,z){const t=get(Math.floor(x),Math.floor(y),Math.floor(z));return !!t&&!TYPES[t].water;}
function fpHits(px,py,pz){for(const dx of [-FPR,FPR])for(const dz of [-FPR,FPR])for(const dy of [.02,FPH*.5,FPH-.02]){if(fpSolid(px+dx,py+dy,pz+dz))return true;}return false;}
function fpStartSpot(){if(FP.last&&!fpHits(FP.last.p.x,FP.last.p.y,FP.last.p.z))return FP.last.p.clone();
  const c=rida?[rida.x,rida.z]:[LIB.x+.5,LIB.z+12];for(let r=1.5;r<10;r+=.5)for(let a=0;a<6.28;a+=.4){const x=c[0]+Math.cos(a)*r,z=c[1]+Math.sin(a)*r;const y=topY(x,z);if(y<2)continue;
  const t=vox[I(Math.floor(x),y,Math.floor(z))];if(TYPES[t].leaf||TYPES[t].water)continue;if(fpHits(x,y+1,z))continue;return new THREE.Vector3(x,y+1,z);}return new THREE.Vector3(LIB.x+.5,LIB.h+.01,LIB.z+12);}
const fpTouch=()=>matchMedia("(pointer:coarse)").matches||navigator.maxTouchPoints>0;
function startSquirrel(){closeSheet();enterGame("squirrel");G2.cam=true;FP.on=true;$("gameUI").hidden=true;$("fpUI").hidden=false;$("fpPal").hidden=true;document.body.classList.add("fp");$("fpUI").classList.toggle("touch",fpTouch());
  const resume=!!FP.last;FP.p.copy(fpStartSpot());FP.safe.copy(FP.p);FP.v.set(0,0,0);
  FP.yaw=resume?FP.last.yaw:Math.atan2(-(FP.p.x-(LIB.x+.5)),-(FP.p.z-(LIB.z+.5)));plantU.uFPk.value=1;FP.pitch=-.05;FP.keys={};FP.joy.x=FP.joy.y=0;FP.joy.id=null;FP.look=null;
  camera.near=.05;camera.fov=innerWidth<innerHeight?75:68;camera.updateProjectionMatrix();if(ssao){ssao.minDistance=.0001;ssao.maxDistance=.004;}
  flight=null;ghost.children[0].visible=false;ghost.children[1].material.color.set(0xffffff);fpUI();fpTools();sfx.chime();
  if(!S.fpSeen){S.fpSeen=1;save();
    toast((fpTouch()?"Lijevim krugom hodaš, povlačenjem prsta gledaš okolo, a žutim gumbom skačeš.":"Tipke W A S D ili strelice za hodanje, razmaknica za skok, a mišem povuci za pogled.")+" Uz zid ili stablo samo hodaj naprijed i vjeverica se penje!",7500);
    setTimeout(()=>{if(FP.on)toast("Blago skupljaš tako da dotrčiš do njega. Na otočićima u moru čeka posebno blago, ali vjeverice ne plivaju: sagradi most gumbom Postavi!",7500);},8000);}
  else toast(S.spawns.length?"Strelica gore pokazuje put do najbližeg blaga.":"Danas je sve blago pronađeno. Možeš graditi i istraživati!",3500);}
function endSquirrel(){if(!FP.on)return;FP.on=false;plantU.uFPk.value=0;FP.last={p:FP.safe.clone(),yaw:FP.yaw};$("fpUI").hidden=true;document.body.classList.remove("fp");camera.near=.5;ghost.visible=false;ghost.children[0].visible=true;
  if(ssao){ssao.minDistance=.0005;ssao.maxDistance=.02;}exitGame();resize();
  const tg=FP.p.clone();controls.target.copy(tg);if(controls.want)controls.want.copy(tg);
  flight={from:{t:tg.clone(),p:camera.position.clone()},t:tg,p:tg.clone().add(new THREE.Vector3(Math.sin(FP.yaw)*20,15,Math.cos(FP.yaw)*20)),k:0,d:1.6};}
function fpUI(){const n=S.spawns.length;$("fpInfo").innerHTML=n?"Blago: <b>"+n+"</b>":"Sve je pronađeno!";}
function fpTools(){if(!$("fpSel"))return;const n=bag()[TYPES[sel].k]||0;$("fpSel").querySelector("img").src=icon(sel);$("fpSel").querySelector(".cnt").textContent=n;$("fpSel").classList.toggle("empty",!n);$("fpSel").title=TYPES[sel].n+" ("+n+")";}
function nearestTreasure(){let best=null,bd=1e9;for(const tr of treasures){if(tr.leaving)continue;const d=Math.hypot(tr.g.position.x-FP.p.x,tr.g.position.z-FP.p.z);if(d<bd){bd=d;best=tr;}}return best?{tr:best,d:bd}:null;}
/* which block is under the crosshair: step through the grid along the view ray (stops at the sea surface) */
const fpDir=new THREE.Vector3();
function fpTarget(forPlace){const o=camera.position,d=fpDir;camera.getWorldDirection(d);let max=FPREACH,ts=1e9;if(d.y<-1e-4&&o.y>WATER){ts=(WATER-o.y)/d.y;max=Math.min(max,ts);}
  let x=Math.floor(o.x),y=Math.floor(o.y),z=Math.floor(o.z);const sx=Math.sign(d.x),sy=Math.sign(d.y),sz=Math.sign(d.z);
  const tdx=Math.abs(1/d.x),tdy=Math.abs(1/d.y),tdz=Math.abs(1/d.z);let tx=(sx>0?x+1-o.x:o.x-x)*tdx,ty=(sy>0?y+1-o.y:o.y-y)*tdy,tz=(sz>0?z+1-o.z:o.z-z)*tdz;
  for(let i=0;i<40;i++){const px=x,py=y,pz=z;let t;if(tx<ty&&tx<tz){x+=sx;t=tx;tx+=tdx;}else if(ty<tz){y+=sy;t=ty;ty+=tdy;}else{z+=sz;t=tz;tz+=tdz;}
    if(t>max)break;const b=get(x,y,z);if(b&&!TYPES[b].water){if(forPlace&&py===y+1&&fpOverlap([px,py,pz]))continue;return {inside:[x,y,z],out:[px,py,pz]};}}
  /* looking at open sea close by: offer the water-level cell next to something solid, so a bridge grows plank by plank */
  if(ts<=FPREACH+1.5){const hx=o.x+d.x*ts,hz=o.z+d.z*ts;const cx=Math.floor(hx),cz=Math.floor(hz);const ax=Math.abs(d.x)>Math.abs(d.z);
    const cands=[[cx,cz],ax?[cx-Math.sign(d.x),cz]:[cx,cz-Math.sign(d.z)],ax?[cx,cz-Math.sign(d.z)]:[cx-Math.sign(d.x),cz]];
    for(const c of cands){if(c[0]<0||c[1]<0||c[0]>=W||c[1]>=W)continue;if(hmap[c[0]+c[1]*W]>2||get(c[0],2,c[1]))continue;
      if(fpSolid(c[0]+1.5,2.5,c[1]+.5)||fpSolid(c[0]-.5,2.5,c[1]+.5)||fpSolid(c[0]+.5,2.5,c[1]+1.5)||fpSolid(c[0]+.5,2.5,c[1]-.5))return {sea:true,out:[c[0],2,c[1]]};}}
  return null;}
function fpOverlap(c){return c[0]<FP.p.x+FPR&&c[0]+1>FP.p.x-FPR&&c[2]<FP.p.z+FPR&&c[2]+1>FP.p.z-FPR&&c[1]<FP.p.y+FPH+.02&&c[1]+1>FP.p.y;}
function fpPlace(){const t=fpTarget(true);if(!t){sfx.click();toast("Pogledaj kockicu uz koju želiš staviti novu, ili vodu tik uz obalu ili most. Mora biti blizu.",3000);return;}
  if(fpOverlap(t.out)){sfx.click();toast("Tu stojiš ti! Pogledaj malo dalje.",2000);return;}placeAt(t.out);}
function fpBreak(){const t=fpTarget();if(!t||t.sea){sfx.click();toast("Pogledaj kockicu koju želiš srušiti. Mora biti blizu.",2600);return;}removeAt(t.inside);}
function tickSquirrel(dt){if(!FP.on)return;dt=Math.min(dt,.05);
  const k=FP.keys;let mx=(k.d||k.arrowright?1:0)-(k.a||k.arrowleft?1:0),mz=(k.w||k.arrowup?1:0)-(k.s||k.arrowdown?1:0);
  if(FP.joy.id!=null){mx=FP.joy.x;mz=-FP.joy.y;}
  if(k.q)FP.yaw+=dt*2.2;if(k.e)FP.yaw-=dt*2.2;
  const ft=get(Math.floor(FP.p.x),Math.floor(FP.p.y+.1),Math.floor(FP.p.z));const inW=!!ft&&!!TYPES[ft].water;
  if(inW&&!FP.wet){burst(FP.p.x,Math.floor(FP.p.y)+.86,FP.p.z,14,[[.8,.93,1],[1,1,1]],1.4,1.8,.5);tone(330,.12,"sine",.03);}FP.wet=inW;
  const run=k.shift?1.6:1,sp=4.4*run*(inW?.6:1);const len=Math.hypot(mx,mz);if(len>1){mx/=len;mz/=len;}
  const sy=Math.sin(FP.yaw),cy=Math.cos(FP.yaw);
  const wx=(-sy*mz+cy*mx)*sp,wz=(-cy*mz-sy*mx)*sp;
  const acc=FP.ground?14:5;FP.v.x+=(wx-FP.v.x)*Math.min(1,acc*dt);FP.v.z+=(wz-FP.v.z)*Math.min(1,acc*dt);
  FP.v.y-=24*dt;if(FP.v.y<-20)FP.v.y=-20;
  if((k[" "]||FP.jump)&&FP.ground){FP.v.y=7.2;FP.ground=false;sfx.click();}
  FP.jump=false;
  /* move per axis with collision; pushing against a wall climbs it */
  let blocked=false;
  const nx=FP.p.x+FP.v.x*dt;if(!fpHits(nx,FP.p.y,FP.p.z))FP.p.x=nx;else{blocked=true;FP.v.x=0;}
  const nz=FP.p.z+FP.v.z*dt;if(!fpHits(FP.p.x,FP.p.y,nz))FP.p.z=nz;else{blocked=true;FP.v.z=0;}
  FP.climb=blocked&&len>.3;if(FP.climb&&FP.v.y<3.4)FP.v.y=3.4;
  const ny=FP.p.y+FP.v.y*dt;if(!fpHits(FP.p.x,ny,FP.p.z)){FP.p.y=ny;FP.ground=false;}else{if(FP.v.y<0){FP.ground=true;for(let i=0;i<40;i++){const t=FP.p.y-.02;if(fpHits(FP.p.x,t,FP.p.z))break;FP.p.y=t;}}FP.v.y=0;}
  FP.p.x=Math.max(.5,Math.min(W-.5,FP.p.x));FP.p.z=Math.max(.5,Math.min(W-.5,FP.p.z));
  /* the sea: squirrels do not swim */
  const gy=topY(FP.p.x,FP.p.z);const sea=FP.p.y<WATER+.05&&gy<WATER-.2;
  if(sea||FP.p.y<-2){FP.splash+=dt;if(FP.splash>.25){burst(FP.p.x,WATER+.1,FP.p.z,24,[[.8,.93,1],[1,1,1]],2,2.4,.6);tone(220,.18,"sine",.05);FP.p.copy(FP.safe);FP.v.set(0,0,0);FP.splash=0;toast("Brrr! Vjeverice ne plivaju. Sagradi most od dasaka!",2800);}}
  else FP.splash=0;
  FP.safeT+=dt;if(FP.ground&&!sea&&FP.safeT>.4){FP.safeT=0;FP.safe.copy(FP.p);}
  /* camera */
  const hs=Math.hypot(FP.v.x,FP.v.z),moving=FP.ground&&hs>.5;FP.bob+=moving?dt*hs*2.3:0;
  if(moving){FP.step+=dt*hs;if(FP.step>.9){FP.step=0;tone(inW?260+Math.random()*80:140+Math.random()*60,.05,inW?"sine":"triangle",.018);}}
  camera.position.set(FP.p.x,FP.p.y+FPE+(moving?Math.abs(Math.sin(FP.bob))*.05:0),FP.p.z);
  plantU.uCamP.value.copy(FP.p);camera.rotation.order="YXZ";camera.rotation.set(FP.pitch,FP.yaw,0);camera.updateMatrixWorld();
  /* crosshair block */
  const tg=fpTarget(true);FP.tgt=tg;if(tg){const c=tg.sea?tg.out:tg.inside;ghost.visible=true;ghost.children[0].visible=!!tg.sea;ghost.position.set(c[0]+.5,c[1]+.5,c[2]+.5);}else ghost.visible=false;
  /* treasures */
  for(const tr of treasures){if(tr.leaving)continue;const g=tr.g.position;if(Math.hypot(g.x-FP.p.x,g.z-FP.p.z)<1.1&&Math.abs((g.y-1.15)-FP.p.y)<1.6){collectTreasure(tr,scr(g));fpUI();}}
  const nt=nearestTreasure();const ar=$("fpArrow");if(nt){const a=Math.atan2(nt.tr.g.position.x-FP.p.x,nt.tr.g.position.z-FP.p.z);const rel=a-(FP.yaw+Math.PI);ar.hidden=false;ar.style.transform="rotate("+(-rel)+"rad)";$("fpDist").textContent=Math.round(nt.d)+" m";}else{ar.hidden=true;$("fpDist").textContent="";}}
/* input */
addEventListener("keydown",e=>{if(!FP.on)return;if(e.target&&e.target.closest&&e.target.closest("input,textarea"))return;const key=e.key.toLowerCase();FP.keys[key]=true;if(key===" "||key.startsWith("arrow"))e.preventDefault();
  if(e.repeat)return;if(key==="escape")endSquirrel();if(key==="f")fpPlace();if(key==="r")fpBreak();if(key==="b"){$("fpPal").hidden=!$("fpPal").hidden;}});
addEventListener("keyup",e=>{FP.keys[e.key.toLowerCase()]=false;});addEventListener("blur",()=>{FP.keys={};});
(function(){const ui=$("fpUI"),pad=$("fpJoy"),knob=$("fpKnob");
  const lookStart=e=>{if(!FP.on||e.target.closest(".pe"))return;if(e.pointerType==="touch")ui.classList.add("touch");$("fpPal").hidden=true;FP.look={id:e.pointerId,x:e.clientX,y:e.clientY};};
  ui.addEventListener("pointerdown",lookStart);
  addEventListener("pointermove",e=>{if(!FP.on)return;
    if(FP.joy.id===e.pointerId){const r=pad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=(e.clientX-cx)/(r.width/2),dy=(e.clientY-cy)/(r.height/2);const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l;}FP.joy.x=dx;FP.joy.y=dy;knob.style.transform="translate("+dx*34+"px,"+dy*34+"px)";return;}
    if(FP.look&&FP.look.id===e.pointerId){const s=e.pointerType==="mouse"?.0042:.0065;FP.yaw-=(e.clientX-FP.look.x)*s;FP.pitch=Math.max(-1.45,Math.min(1.45,FP.pitch-(e.clientY-FP.look.y)*s));FP.look.x=e.clientX;FP.look.y=e.clientY;}});
  const up=e=>{if(FP.joy.id===e.pointerId){FP.joy.id=null;FP.joy.x=FP.joy.y=0;knob.style.transform="";}if(FP.look&&FP.look.id===e.pointerId)FP.look=null;};
  addEventListener("pointerup",up);addEventListener("pointercancel",up);
  pad.addEventListener("pointerdown",e=>{e.preventDefault();FP.joy.id=e.pointerId;try{pad.setPointerCapture(e.pointerId);}catch(_){}});
  $("fpJump").addEventListener("pointerdown",e=>{e.preventDefault();FP.jump=true;});
  $("fpPlace").addEventListener("click",()=>fpPlace());$("fpBreak").addEventListener("click",()=>fpBreak());
  $("fpSel").addEventListener("click",()=>{sfx.click();renderPalette();$("fpPal").hidden=!$("fpPal").hidden;});
  $("fpExit").onclick=()=>{sfx.click();endSquirrel();};
  ui.addEventListener("contextmenu",e=>e.preventDefault());})();
$("exploreBtn").onclick=()=>{sfx.click();startSquirrel();};

