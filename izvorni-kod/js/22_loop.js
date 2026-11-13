/* =================== LOOP =================== */
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=FP&&FP.on?(w<h?75:68):(w<h?55:40);camera.updateProjectionMatrix();postSize();}
addEventListener("resize",resize);
let lastT=performance.now(),tt=0,autoCheck=0,pfT=0,pfN=0,prNow=renderer.getPixelRatio();const prMax=prNow;
function frame(now){requestAnimationFrame(frame);const lastT0=lastT;const dt=Math.min(.05,(now-lastT)/1000);lastT=now;tt+=dt;uTime.value=tt;
  if(dirtyChunks.size)flushChunks(4);
  for(const e of ents){if(!e.frozen)tickEnt(e,dt,tt);}
  if(bottle){bottle.position.y=WATER+Math.sin(tt*2)*.1;bottle.rotation.y+=dt*.3;bottle.rotation.z=Math.sin(tt*1.4)*.12;}
  beam.rotation.y+=dt*.4;
  beams.forEach(g=>{if(g.sparkle&&Math.random()<dt*8)burst(g.sparkle[0]+(Math.random()-.5)*7,g.sparkle[1]+Math.random()*5,g.sparkle[2]+(Math.random()-.5)*7,1,[[.85,.6,1],[1,.85,1],[.6,1,.95]],.3,.3,2,-.05);});
  if(!controls.autoRotate&&!flight&&mode==="look"&&$("veil").hidden){idleT+=dt;if(idleT>40)controls.autoRotate=true;}
  pfT+=(now-lastT0)/1000;pfN++;if(pfT>2.5){const fps=pfN/pfT;pfT=0;pfN=0;
    if(fps<42){if(qual>=2&&ssao)setQual(1);else if(prNow>.9){prNow=Math.max(.9,prNow-.25);renderer.setPixelRatio(prNow);resize();}else if(qual>0)setQual(0);}
    else if(fps>57&&prNow<prMax){prNow=Math.min(prMax,prNow+.25);renderer.setPixelRatio(prNow);resize();}}
  tickFlight(Math.min(.25,(now-lastT0)/1000));tickFalling(dt);tickLife(dt,tt,cur.night||0);tickGames(dt,tt);tickParts(dt);tickTime(dt);
  autoCheck+=dt;if(timeMode==="auto"&&autoCheck>30){autoCheck=0;if(tgt.name!==autoPreset())setTime(autoPreset());}
  if(!G2.cam)controls.update(dt);
  if(!FP.on&&camera.position.y<WATER+1.5)camera.position.y=WATER+1.5;
  if(typeof tickPad==="function")tickPad(dt);tickSquirrel(dt);tickPop(dt);tickChests(dt,tt);tickEnv(dt);tickFarm(dt,tt);tickMarket(dt,tt);if(typeof tickQuest==="function")tickQuest(dt,tt);if(typeof tickAnimals2==="function")tickAnimals2(dt,tt);if(typeof tickRegions==="function")tickRegions(dt,tt);
  tickBubble(dt);
  for(const id in signs){const sg=signs[id];const k=Math.max(.22,Math.min(1,camera.position.distanceTo(sg.position)/30));sg.scale.set(5*k,1.47*k,1);}
  grade.uniforms.uNight.value=cur.night||0;
  composer.render(dt);}

