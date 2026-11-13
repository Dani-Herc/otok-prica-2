/* =================== GAMEPAD =================== */
/* A game controller works everywhere: Rida walks with the left stick and looks with the right one, RT digs, X touches or builds,
   and in every window the d-pad moves a golden frame from button to button (A presses, B closes). Standard mapping (Xbox / PlayStation / Switch Pro). */
const PAD={on:false,prev:[],axes:[0,0,0,0],t:0,focus:null,known:false,used:0,rep:{},hint:false,keys:{}};
const PB={A:0,B:1,X:2,Y:3,LB:4,RB:5,LT:6,RT:7,BACK:8,START:9,L3:10,R3:11,UP:12,DOWN:13,LEFT:14,RIGHT:15};
const dz=v=>Math.abs(v)<.18?0:(v-Math.sign(v)*.18)/.82;
function padGet(){const list=navigator.getGamepads?navigator.getGamepads():[];for(const g of list)if(g&&g.connected&&g.buttons&&g.buttons.length>=12)return g;return null;}
function padRumble(ms,strong,weak){try{const g=padGet();if(g&&g.vibrationActuator&&g.vibrationActuator.playEffect)g.vibrationActuator.playEffect("dual-rumble",{duration:ms||120,strongMagnitude:strong==null?.5:strong,weakMagnitude:weak==null?.35:weak});}catch(_){}}
addEventListener("gamepadconnected",e=>{if(!PAD.known){PAD.known=true;toast("Joystick je spojen! Pritisni A za početak, a u igri drži gumb Start za pomoć.",4200);sfx.chime();}});
addEventListener("gamepaddisconnected",()=>{if(!padGet()){padRelease();padFocus(null);document.body.classList.remove("pad");}});
/* which part of the screen is in charge right now */
function padRoot(){if(!$("veil").hidden)return $("sheet");if(!$("shopUI").hidden)return $("shopUI");
  const gp=$("gPop");if(gp&&!gp.hidden)return gp;if(FP.on)return null;if(mode==="game")return null;return document.body;}
function padFocusables(root){const out=[];const sel='button,[role=tab],input,textarea,select,a[href],.mc';const vw=innerWidth,vh=innerHeight;
  root.querySelectorAll(sel).forEach(el=>{if(el.disabled||el.closest("[hidden]")||el.closest("#fpUI"))return;const r=el.getBoundingClientRect();if(r.width<6||r.height<6)return;
    if(root===document.body&&(r.bottom<0||r.top>vh||r.right<0||r.left>vw))return;const cs=getComputedStyle(el);if(cs.visibility==="hidden"||cs.display==="none"||+cs.opacity===0)return;out.push(el);});return out;}
function padFocus(el){if(PAD.focus&&PAD.focus!==el)PAD.focus.classList.remove("padf");PAD.focus=el;if(el){el.classList.add("padf");try{el.scrollIntoView({block:"nearest",inline:"nearest"});}catch(_){}}}
function padDefault(root){const f=padFocusables(root);if(!f.length)return null;
  return f.find(e=>e.classList.contains("big")&&!e.classList.contains("x"))||f.find(e=>e.getAttribute("aria-selected")==="true")||f.find(e=>e.id!=="sheetX"&&!e.classList.contains("x"))||f[0];}
function padMove(dx,dy){const root=padRoot();if(!root)return;const f=padFocusables(root);if(!f.length)return;
  if(!PAD.focus||!f.includes(PAD.focus)){padFocus(padDefault(root));sfx.click();return;}
  const a=PAD.focus.getBoundingClientRect(),ax=a.left+a.width/2,ay=a.top+a.height/2;let best=null,bs=1e9;
  for(const el of f){if(el===PAD.focus)continue;const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const vx=cx-ax,vy=cy-ay;
    const along=vx*dx+vy*dy;if(along<=4)continue;const across=Math.abs(vx*dy-vy*dx);
    /* elements that overlap on the cross axis are strongly preferred, so rows and columns feel natural */
    const overlap=dx?(r.bottom>a.top&&r.top<a.bottom):(r.right>a.left&&r.left<a.right);const s=along+across*(overlap?.6:2.6)+(overlap?0:60);if(s<bs){bs=s;best=el;}}
  if(best){padFocus(best);tone(880,.03,"triangle",.02);}else if(root===$("sheet")){$("sheet").scrollTop+=dy*120;}}
function padPress(){const root=padRoot();if(!root)return false;const f=padFocusables(root);if(!PAD.focus||!f.includes(PAD.focus)){const d=padDefault(root);if(d){padFocus(d);if(root!==document.body)return true;}else return false;}
  const el=PAD.focus;if(!el)return false;if(/INPUT|TEXTAREA|SELECT/.test(el.tagName)){el.focus();return true;}
  el.classList.add("padhit");setTimeout(()=>el.classList.remove("padhit"),160);el.click();setTimeout(()=>{const r2=padRoot();if(r2&&PAD.focus&&!padFocusables(r2).includes(PAD.focus))padFocus(null);},60);return true;}
function padBack(){if(!$("veil").hidden){const bk=$("sheetBody").querySelector(".back");if(bk){bk.click();return;}closeSheet();sfx.click();return;}
  if(!$("shopUI").hidden){const x=$("shopClose");if(x)x.click();return;}
  const gp=$("gPop");if(gp&&!gp.hidden){const b=$("gBack");if(b)b.click();return;}
  if(FP.on)return;if(PAD.focus)padFocus(null);}
/* virtual keys for the island camera and the mini-games, which already listen to the keyboard */
function vkey(k,down){if(!!PAD.keys[k]===down)return;PAD.keys[k]=down;dispatchEvent(new KeyboardEvent(down?"keydown":"keyup",{key:k,bubbles:true}));}
function padRelease(){for(const k in PAD.keys)if(PAD.keys[k])vkey(k,false);if(controls&&controls.hold)controls.hold={};FP.padM=null;if(FP.mouse&&FP.mouse.pad){FP.mouse.hold=FP.mouse.down=false;FP.mouse.pad=false;}FP.upB=false;FP.diveB=false;if(FP.keys)FP.keys.shift=false;}
function padAim(){return {x:innerWidth/2,y:innerHeight*.44};}
function tickPad(dt){const g=padGet();if(!g){if(PAD.on){PAD.on=false;padRelease();}return;}
  const b=g.buttons.map(x=>x.pressed||x.value>.5),ax=[dz(g.axes[0]||0),dz(g.axes[1]||0),dz(g.axes[2]||0),dz(g.axes[3]||0)];
  const pr=i=>b[i]&&!PAD.prev[i],rl=i=>!b[i]&&PAD.prev[i];
  const any=b.some(Boolean)||ax.some(v=>v!==0);if(any){PAD.used=performance.now();if(!PAD.on){PAD.on=true;document.body.classList.add("pad");}}
  if(!PAD.on){PAD.prev=b;return;}
  if(typeof RW!=="undefined"&&RW){if(pr(PB.A)||pr(PB.B)){if(RW.stage===2)rwEnd();else rwFast();}FP.padM=null;PAD.prev=b;return;}
  /* directional repeat for menus: d-pad or left stick */
  const dirs=[["u",b[PB.UP]||ax[1]<-.6,0,-1],["d",b[PB.DOWN]||ax[1]>.6,0,1],["l",b[PB.LEFT]||ax[0]<-.6,-1,0],["r",b[PB.RIGHT]||ax[0]>.6,1,0]];
  const root=padRoot();const menu=root&&root!==document.body;
  if(menu){FP.padM=null;if(FP.mouse&&FP.mouse.pad)FP.mouse.hold=false;
    for(const [n,on,dx,dy] of dirs){const r=PAD.rep[n];if(on){if(!r){PAD.rep[n]=.38;padMove(dx,dy);}else{PAD.rep[n]-=dt;if(PAD.rep[n]<=0){PAD.rep[n]=.11;padMove(dx,dy);}}}else PAD.rep[n]=0;}
    if(ax[3]&&root===$("sheet"))$("sheet").scrollTop+=ax[3]*900*dt;
    if(pr(PB.A))padPress();if(pr(PB.B))padBack();if(pr(PB.Y)&&!$("veil").hidden&&FP.on)closeSheet();
    if(pr(PB.LB)||pr(PB.RB)){const tabs=[...root.querySelectorAll("[role=tab]")];if(tabs.length){let i=tabs.findIndex(t=>t.getAttribute("aria-selected")==="true");i=(i+(pr(PB.RB)?1:-1)+tabs.length)%tabs.length;tabs[i].click();setTimeout(()=>{const t2=[...$("sheet").querySelectorAll("[role=tab]")][i];if(t2)padFocus(t2);},40);}}
    PAD.prev=b;return;}
  if(PAD.focus&&!(root===document.body))padFocus(null);
  if(FP.on){/* exploring with Rida */
    FP.padM=(ax[0]||ax[1])?{x:ax[0],y:ax[1]}:null;
    if(ax[2]||ax[3]){FP.camIdle=0;FP.cam.yaw-=ax[2]*Math.abs(ax[2])*3.2*dt;FP.cam.pitch=Math.max(-.35,Math.min(1.35,FP.cam.pitch+ax[3]*Math.abs(ax[3])*2.2*dt));}
    if(pr(PB.A)){FP.jump=true;FP.upB=true;}if(rl(PB.A))FP.upB=false;FP.diveB=!!b[PB.B];if(b[PB.L3])FP.keys.shift=true;else if(PAD.prev[PB.L3])FP.keys.shift=false;
    const aim=padAim();
    if(b[PB.RT]){FP.mouse=FP.mouse&&FP.mouse.pad?FP.mouse:{};Object.assign(FP.mouse,{x:aim.x,y:aim.y,down:true,hold:true,pad:true});}else if(FP.mouse&&FP.mouse.pad){FP.mouse.hold=FP.mouse.down=false;FP.mouse.pad=false;FP.mouse.warned=0;FP.mouse.farT=0;}
    if(pr(PB.X)||pr(PB.LT))fpTap(aim.x,aim.y);
    if(pr(PB.Y)){if(FP.mount&&typeof dismount==="function")dismount();else if(typeof waterFriend==="function"&&waterFriend())callWater();else sheetBag("kockice");}if(pr(PB.BACK))sheetBag("karta");
    if(pr(PB.LEFT)||pr(PB.RIGHT)){if(typeof beltSel==="function")beltSel(pr(PB.RIGHT)?1:-1);}if(pr(PB.UP)&&typeof beltUse==="function")beltUse();if(pr(PB.DOWN)){const Z=[4.2,6.8,10.5];let j=Z.findIndex(z=>z>FP.cam.tdist+.3);FP.cam.tdist=Z[j<0?0:j];}
    if((pr(PB.LB)||pr(PB.RB))&&typeof TRK!=="undefined"&&TRK.page===1){TRK.page=0;hotbarRender();}
    if(pr(PB.LB)||pr(PB.RB)){const s=[...$("hotbar").querySelectorAll(".slot[data-k]")];let i=s.findIndex(x=>x.classList.contains("on"));i=(i+((pr(PB.RB)||pr(PB.RIGHT))?1:-1)+s.length)%s.length;if(s[i])s[i].click();}
    
    if(b[PB.START]){PAD.startT=(PAD.startT||0)+dt;if(PAD.startT>.6&&!PAD.helped){PAD.helped=true;padHelp();}}else{if(PAD.startT&&PAD.startT<=.6&&rl(PB.START))endSquirrel();PAD.startT=0;PAD.helped=false;}
    $("padRet").hidden=!$("veil").hidden;
    if(!S.padSeen){S.padSeen=1;save();setTimeout(padHelp,600);}
    PAD.prev=b;return;}
  $("padRet").hidden=true;FP.padM=null;
  if(mode==="game"){/* the mini-games listen to the keyboard */
    if(G2.mode==="balloon"){vkey("ArrowLeft",ax[0]<-.3||!!b[PB.LEFT]);vkey("ArrowRight",ax[0]>.3||!!b[PB.RIGHT]);vkey(" ",!!b[PB.A]||ax[1]<-.5||!!b[PB.UP]);}
    else if(G2.mode==="fish"){vkey(" ",!!b[PB.A]);}
    if(pr(PB.B)){const gb=$("gBack")||$("gameUI").querySelector(".exit,[data-exit]");if(gb&&gb.offsetParent)gb.click();}
    PAD.prev=b;return;}
  /* the island view: left stick slides over the island, right stick turns and zooms, d-pad picks a button */
  vkey("w",ax[1]<-.4);vkey("s",ax[1]>.4);vkey("a",ax[0]<-.4);vkey("d",ax[0]>.4);
  if(controls.hold){controls.hold.l=ax[2]<-.35;controls.hold.r=ax[2]>.35;controls.hold.i=ax[3]<-.35||!!b[PB.RT];controls.hold.o=ax[3]>.35||!!b[PB.LT];}
  for(const [n,on,dx,dy] of [["u",b[PB.UP],0,-1],["d",b[PB.DOWN],0,1],["l",b[PB.LEFT],-1,0],["r",b[PB.RIGHT],1,0]]){const r=PAD.rep[n];if(on){if(!r){PAD.rep[n]=.38;padMove(dx,dy);}else{PAD.rep[n]-=dt;if(PAD.rep[n]<=0){PAD.rep[n]=.14;padMove(dx,dy);}}}else PAD.rep[n]=0;}
  if(pr(PB.A)){if(PAD.focus&&padFocusables(document.body).includes(PAD.focus))padPress();else $("exploreBtn").click();}
  if(pr(PB.START))$("exploreBtn").click();if(pr(PB.Y)&&typeof sheetDiary==="function")sheetDiary();if(pr(PB.X)){const rb=$("readBtn");if(rb)rb.click();}
  if(pr(PB.B))padBack();
  PAD.prev=b;}
function padHelp(){const k=(c,t)=>'<span class="pk '+c+'">'+t+'</span>';
  openSheet('<h2>Igranje joystickom</h2><div class="padmap">'+
    [[k("st","L"),"Lijeva palica vodi Ridu (pritisni je za trčanje)"],[k("st","R"),"Desna palica okreće pogled"],[k("a","A"),"Skok, a u vodi plivanje prema gore"],[k("b","B"),"Ronjenje i izlaz iz čamca"],
     [k("tr","RT"),"Drži za kopanje kockice ispred Ride"],[k("x","X"),"Radnja: kad je na ekranu gumb s plavim X (uđi, razgovaraj, otvori), X radi to. Inače dodir onoga što je u sredini ekrana: gradnja, berba"],[k("y","Y"),"Torba i radionica (na životinji: siđi)"],[k("sh","LB")+k("sh","RB"),"Odabir kockice u šapi"],
     [k("sh","◀▶"),"Odabir oruđa ili čarolije na traci"],[k("sh","▲"),"Koristi odabrano oruđe ili čaroliju"],[k("sh","▼"),"Kamera bliže ili dalje"],[k("st","R3"),"Plesovi i čarolije"],[k("sh","☰"),"Kratko: natrag na otok. Drži: ova pomoć"]].map(r=>'<div class="pmr"><span class="pmk">'+r[0]+'</span><span>'+r[1]+'</span></div>').join("")+
    '</div><p class="muted">U svakom prozoru zlatni okvir je odmah na glavnom gumbu. Križić (ili palica) ga pomiče, A pritišće gumb, a B zatvara. LB i RB mijenjaju kartice, a ◀ ▶ pomiču klizače. Na svakom gumbu na ekranu piše koji gumb joysticka mu pripada.</p><button class="btn big" id="padOk">Idemo!</button>');$("padOk").onclick=closeSheet;}
/* a small rumble when Rida breaks a block or finds treasure */
const _mineBlockP=mineBlock;mineBlock=function(c){const r=_mineBlockP.apply(this,arguments);if(PAD.on)padRumble(90,.35,.25);return r;};
const _openChestP=openChest;openChest=function(ch){const was=ch.open;const r=_openChestP.apply(this,arguments);if(PAD.on&&!was)padRumble(420,.8,.6);return r;};
