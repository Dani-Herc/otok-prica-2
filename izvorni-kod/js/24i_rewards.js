/* =================== REWARD REVEAL =================== */
/* every real treasure gets a little show: the chest lands and shakes, bursts open in a flash of light,
   and the cards flip one by one. Rare things glow blue, epic ones purple, legendary ones gold with a rainbow shimmer. */
const RWR={c:{n:"Obično",col:"#c9d2de"},r:{n:"Rijetko",col:"#4aa8ff"},e:{n:"Epsko",col:"#b46cff"},l:{n:"Legendarno",col:"#ffc53d"}};
const RAR_OF={dijamant:"e",smaragd:"r",biser:"r",zlato:"e",kristal:"e",grumen:"r",s_svjetlo:"e",prizmarin:"r",polica:"c",ametist:"r",zlatnik:"c"};
function rarOf(k,n){if(k==="coins")return n>=150?"e":n>=60?"r":"c";return RAR_OF[k]||(n>=8?"r":"c");}
function rwItem(k,n){return {ic:k==="coins"?itemIcon("coin"):thingIcon(k),n:k==="coins"?"Zlatnici":thingName(k),cnt:n,rar:rarOf(k,n)};}
let RW=null;
function rewardReveal(o){if(RW)rwEnd(true);const el=document.createElement("div");el.id="rw";el.className="rw "+(o.chest||"wood");
  const items=(o.items||[]).slice(0,8);const best=items.reduce((m,i)=>"crel".indexOf(i.rar)>"crel".indexOf(m)?i.rar:m,"c");
  el.innerHTML='<canvas class="rwfx"></canvas><div class="rwrays"></div><div class="rwtop"><small>'+esc(o.kicker||"Blago!")+'</small><h2>'+esc(o.title||"")+'</h2></div>'+
    '<div class="rwstage">'+(o.portrait?'<div class="rwpet"><img alt="" src="'+o.portrait+'"></div>':'<div class="rwchest"><div class="lid"><i></i></div><div class="box"><i></i><b></b></div></div>')+'</div>'+
    '<div class="rwcards">'+items.map((it,i)=>'<div class="rwcard r-'+it.rar+'" style="--i:'+i+'"><div class="in"><div class="back"><span>?</span></div><div class="face"><img alt="" src="'+it.ic+'"><b>'+esc(it.n)+'</b>'+(it.cnt?'<em>+'+it.cnt+'</em>':'')+'<small>'+RWR[it.rar].n+'</small></div></div></div>').join("")+'</div>'+
    '<p class="rwsub">'+(o.sub?esc(o.sub):'')+'</p><button class="btn big rwok" id="rwOk" hidden>'+esc(o.ok||"Super!")+'</button><span class="rwskip">Dodirni za brže</span>';
  document.body.appendChild(el);window.RWON=true;RW={el,o,t:0,stage:0,items,best,flipped:0,parts:[],raf:0,skip:false};
  const cv=el.querySelector(".rwfx"),cx=cv.getContext("2d");const fit=()=>{cv.width=innerWidth;cv.height=innerHeight;};fit();RW.fit=fit;addEventListener("resize",fit);
  FP.keys={};if(FP.joy){FP.joy.x=FP.joy.y=0;}
  el.addEventListener("pointerdown",e=>{if(e.target.id==="rwOk")return;rwFast();});$("rwOk").onclick=()=>{sfx.click();rwEnd();};
  /* timeline */
  const P=o.portrait;const T0=performance.now();let lastTick=0;
  const loop=now=>{if(!RW||RW.el!==el)return;RW.raf=requestAnimationFrame(loop);const t=(now-T0)/1000*(RW.skip?3:1)+(RW.skipT||0);RW.t=t;
    if(RW.stage===0){if(!P&&t>.45&&t<1.35){const k=(t-.45)/.9;if(now-lastTick>Math.max(45,140-k*110)){lastTick=now;tone(180+k*240,.03,"square",.02);el.classList.toggle("sh",!el.classList.contains("sh"));}el.style.setProperty("--glow",k.toFixed(2));}
      if(t>(P?.5:1.4)){RW.stage=1;rwBurst(cx);}}
    else if(RW.stage===1){const gap=RW.skip?.12:.38;const want=Math.min(items.length,Math.floor((t-(P?.6:1.55))/gap)+1);while(RW.flipped<want){rwFlip(RW.flipped++);}
      if(RW.flipped>=items.length&&t>(P?.6:1.55)+gap*items.length+.3){RW.stage=2;$("rwOk").hidden=false;el.querySelector(".rwskip").hidden=true;if(typeof padFocus==="function"&&PAD.on)padFocus($("rwOk"));}}
    rwParts(cx,cv);};
  RW.raf=requestAnimationFrame(loop);sfx.pop();setTimeout(()=>tone(120,.25,"sine",.05),60);return el;}
function rwFast(){if(!RW)return;if(RW.stage===2){rwEnd();return;}RW.skip=true;}
function rwBurst(cx){const el=RW.el;el.classList.add("open");el.classList.remove("sh");sfx.fanfare();if(typeof padRumble==="function"&&PAD.on)padRumble(380,.7,.5);
  [523,659,784,1046,1318].forEach((f,i)=>tone(f,.4,"triangle",.045,i*.05));
  const W2=innerWidth/2,H2=innerHeight*.48;const cols=RW.best==="l"?["#ffc53d","#ff7fa8","#63b5e8","#8fdc6a","#b46cff","#fff"]:RW.best==="e"?["#b46cff","#e2c8ff","#ffc53d","#fff"]:["#ffc53d","#fff3c0","#ff9a3d","#fff"];
  for(let i=0;i<(RW.best==="l"?240:150);i++){const a=Math.random()*Math.PI*2,s=4+Math.random()*11;RW.parts.push({x:W2,y:H2,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,r:3+Math.random()*5,c:cols[i%cols.length],rot:Math.random()*6,vr:(Math.random()-.5)*.4,life:2.2+Math.random()*1.4,sq:Math.random()<.6});}}
function rwFlip(i){const c=RW.el.querySelectorAll(".rwcard")[i];if(!c)return;c.classList.add("up");const it=RW.items[i];const base=[660,740,880,990,1175,1320,1480,1760][i%8];tone(base,.12,"triangle",.04);
  if(it.rar==="e"){tone(base*1.5,.25,"sine",.035,.08);}if(it.rar==="l"){[784,988,1175,1568].forEach((f,j)=>tone(f,.5,"triangle",.05,.08+j*.07));if(typeof padRumble==="function"&&PAD.on)padRumble(260,.9,.6);
    const r=c.getBoundingClientRect();for(let k=0;k<60;k++){const a=Math.random()*Math.PI*2,s=2+Math.random()*7;RW.parts.push({x:r.left+r.width/2,y:r.top+r.height/2,vx:Math.cos(a)*s,vy:Math.sin(a)*s-3,r:2+Math.random()*3,c:["#ffc53d","#fff","#ff7fa8","#63b5e8"][k%4],rot:0,vr:.2,life:1.4,sq:false,star:true});}}}
function rwParts(cx,cv){cx.clearRect(0,0,cv.width,cv.height);const P=RW.parts;for(let i=P.length-1;i>=0;i--){const p=P[i];p.life-=1/60;if(p.life<=0){P.splice(i,1);continue;}p.vy+=.28;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;
    cx.save();cx.globalAlpha=Math.min(1,p.life*1.5);cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle=p.c;if(p.star){cx.beginPath();for(let k=0;k<5;k++){const a=k*1.2566-1.5708;cx.lineTo(Math.cos(a)*p.r*2,Math.sin(a)*p.r*2);cx.lineTo(Math.cos(a+.628)*p.r*.8,Math.sin(a+.628)*p.r*.8);}cx.fill();}else if(p.sq)cx.fillRect(-p.r,-p.r*.5,p.r*2,p.r);else{cx.beginPath();cx.arc(0,0,p.r*.7,0,6.283);cx.fill();}cx.restore();}}
function rwEnd(silent){if(!RW)return;const r=RW;RW=null;window.RWON=false;cancelAnimationFrame(r.raf);removeEventListener("resize",r.fit);r.el.classList.add("bye");setTimeout(()=>r.el.remove(),280);if(!silent&&r.o.onDone)r.o.onDone();}
/* chests now open with the show */
openChest=function(ch){if(ch.open){toast("Ova škrinja je prazna. Sve blago iz nje već je tvoje!",2400);return;}const L=LOOT[ch.id]||{coins:10};ch.open=true;S.chests[ch.id]=today();ch.glow.visible=false;
  S.coins+=L.coins||0;const items=[];if(L.coins)items.push(rwItem("coins",L.coins));for(const k in L.mats||{}){giveN(k,L.mats[k]);items.push(rwItem(k,L.mats[k]));}for(const k in L.blocks||{}){giveN(k,L.blocks[k]);items.push(rwItem(k,L.blocks[k]));hotAdd(k);}
  for(let i=0;i<4;i++)setTimeout(()=>burst(ch.x,ch.y+.9,ch.z,30,[[1,.85,.3],[1,1,.7],[1,.6,.2]],2.4,3.2,1),i*180);if(rida)rida.celebrate=1;bump("chest",1);save();renderEco();hotbarRender();
  if(typeof padRumble==="function"&&PAD.on)padRumble(300,.6,.4);
  setTimeout(()=>rewardReveal({kicker:"Blago!",title:ch.n,chest:ch.id==="tajna"?"magic":"gold",items,sub:(L.msg?L.msg+" ":"")+"Otvorene škrinje: "+chestObjs.filter(c=>c.open).length+" od "+chestObjs.length+"."}),500);};
