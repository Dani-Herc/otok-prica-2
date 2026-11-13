/* ===== v25: Igraonica 2.0: framework for the new minigames + animated "wow" skins =====
   Each minigame runs in its own arena floating high above the island, costs one karta and gives bronze, silver
   or gold medals. The first gold medal of every game unlocks a legendary animated skin. */

/* ---------- animated skins: real textures that move on Rida's fur ---------- */
const WOWTX={};
function wowCanvas(k,draw){if(WOWTX[k])return WOWTX[k];const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");draw(x,c);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;return WOWTX[k]=t;}
const WOWSKIN={
  disko:{n:"Disko lisica",d:"Neonske pruge pulsiraju u ritmu glazbe i mijenjaju boje kao disko kugla.",O:0x1a1030,W:0x2a1a48,B:0xff4ad8,D:0x120a24,glowB:1,m:{metalness:.4,roughness:.3},
    tex:()=>wowCanvas("disko",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);x.strokeStyle="#fff";x.lineWidth=7;for(let i=-128;i<256;i+=32){x.beginPath();x.moveTo(i,0);x.lineTo(i+128,128);x.stroke();}x.fillStyle="#fff";for(let i=0;i<14;i++){x.beginPath();x.arc((i*47)%128,(i*71)%128,3,0,7);x.fill();}}),
    anim:(ms,t)=>{const tx=WOWTX.disko;if(tx){tx.offset.x=(t*.35)%1;}const beat=Math.pow(Math.abs(Math.sin(t*Math.PI*1.9)),6);for(const o of ms){const m=o.material;m.emissive.setHSL((t*.18+o.position.y*.4+o.position.z*.3)%1,1,.55);m.emissiveIntensity=.55+beat*.9;}},fx:"disko"},
  holo:{n:"Holografska lisica",d:"Prelijeva se svim duginim bojama dok se okrećeš, kao sjajna holografska naljepnica.",O:0xe8e0ff,W:0xffffff,B:0x6a5ab8,D:0xc8d8ff,m:{metalness:.3,roughness:.2},
    anim:(ms,t)=>{const yaw=(typeof FP!=="undefined"&&FP.cam?FP.cam.yaw:0)+(G2&&G2.cam?t*.6:0);for(const o of ms){const m=o.material,pk=o.userData.pk;if(pk==="B")continue;const h=(yaw*.25+o.position.x*.9+o.position.y*.6+o.position.z*.5+t*.04)%1;
      const c=new THREE.Color().setHSL((h+1)%1,.8,pk==="W"?.84:.7).convertSRGBToLinear();if(o.userData.bc){o.userData.bc.copy(c);m.color.copy(c).multiplyScalar((typeof rida!=="undefined"&&rida&&rida.shadeF)||1);}else m.color.copy(c);m.emissive.setHSL((h+.33+1)%1,.9,.55);m.emissiveIntensity=.28;}},fx:"holo"},
  lava:{n:"Lava lisica",d:"Tamna kao vulkanska stijena, a kroz pukotine joj teče užarena lava.",O:0x2a1a14,W:0x4a3028,B:0xff7a1a,D:0x1a100c,glowB:1,m:{metalness:.1,roughness:.85},
    tex:()=>wowCanvas("lava",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);x.lineCap="round";const R=(i)=>((Math.sin(i*91.7)*43758.5)%1+1)%1;
      for(let k=0;k<3;k++)for(let i=0;i<9;i++){let px=R(i+k*20)*128,py=R(i*3+k*7)*128;x.beginPath();x.moveTo(px,py);for(let s=0;s<6;s++){px+=(R(i*s+k)-.5)*44;py+=(R(i+s*5+k)-.3)*30;x.lineTo(px,py);}
        x.strokeStyle=k===0?"rgba(255,90,10,.9)":k===1?"rgba(255,180,40,.9)":"rgba(255,240,160,1)";x.lineWidth=k===0?9:k===1?5:2;x.stroke();}}),
    anim:(ms,t)=>{const tx=WOWTX.lava;if(tx){tx.offset.y=(-t*.06)%1;tx.offset.x=Math.sin(t*.3)*.05;}for(const o of ms){const m=o.material;if(o.userData.pk==="B")continue;m.emissive.setRGB(1,.42,.08);m.emissiveIntensity=.85+.35*Math.sin(t*2.2+o.position.z*3);}},fx:"lava"},
  zvjezdana:{n:"Lisica zvjezdane prašine",d:"U krznu joj trepere tisuće zvjezdica, a preko leđa plovi šarena maglica.",O:0x141040,W:0x2a2468,B:0xfff0a0,D:0x0a0828,glowB:1,m:{metalness:.2,roughness:.5},
    tex:()=>wowCanvas("zvjezdana",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);const g=x.createRadialGradient(40,60,4,40,60,60);g.addColorStop(0,"rgba(200,90,255,.55)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,128,128);
      const g2=x.createRadialGradient(96,30,2,96,30,46);g2.addColorStop(0,"rgba(60,170,255,.5)");g2.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g2;x.fillRect(0,0,128,128);x.fillStyle="#fff";
      for(let i=0;i<70;i++){const s=i%9===0?2.4:i%3===0?1.4:.8;x.globalAlpha=.5+((i*37)%50)/100;x.beginPath();x.arc((i*53.3)%128,(i*29.7+i*i*.13)%128,s,0,7);x.fill();}x.globalAlpha=1;}),
    anim:(ms,t)=>{const tx=WOWTX.zvjezdana;if(tx){tx.offset.x=(t*.02)%1;tx.offset.y=(t*.013)%1;}for(const o of ms){const m=o.material;if(o.userData.pk==="B")continue;m.emissive.setRGB(1,1,1);m.emissiveIntensity=.75+.3*Math.sin(t*3.1+o.position.x*7+o.position.z*5);}},fx:"zvjezde"},
  dijamant:{n:"Dijamantna lisica",d:"Brušena kao dragi kamen. Na svakom koraku prska duginim odsjajima.",O:0x7ac8ff,W:0xd0f0ff,B:0x3a6ab8,D:0x4a90d0,m:{metalness:.3,roughness:.12},
    tex:()=>wowCanvas("dijamant",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);for(let i=0;i<16;i++){const cx=(i*41)%128,cy=(i*67)%128,r=3+(i%4)*2;x.fillStyle="hsl("+(i*47)%360+",100%,75%)";x.beginPath();x.moveTo(cx,cy-r*2);x.lineTo(cx+r*.5,cy-r*.5);x.lineTo(cx+r*2,cy);x.lineTo(cx+r*.5,cy+r*.5);x.lineTo(cx,cy+r*2);x.lineTo(cx-r*.5,cy+r*.5);x.lineTo(cx-r*2,cy);x.lineTo(cx-r*.5,cy-r*.5);x.fill();}}),
    anim:(ms,t)=>{const tx=WOWTX.dijamant;if(tx){tx.offset.x=Math.floor(t*6)*.37%1;tx.offset.y=Math.floor(t*6)*.61%1;}for(const o of ms){const m=o.material;m.emissive.setRGB(1,1,1);m.emissiveIntensity=.55+.45*Math.max(0,Math.sin(t*9+o.position.x*13+o.position.y*7));}},fx:"dijamant"}};
const WOWFX={disko:p=>mgSpawn({t:"star",x:p.x,y:p.y+.3+Math.random()*.9,z:p.z,vy:.3,life:.7,size:.24,size2:.02,col:[0xff4ad8,0x4af0ff,0xfff04a,0x7aff6a],add:1,spin:4}),
  holo:p=>mgSpawn({t:"spark",x:p.x,y:p.y+.3+Math.random()*.9,z:p.z,vy:.25,life:.8,size:.26,size2:.04,col:[0xffb8f0,0xb8f0ff,0xf8ffb8,0xd8b8ff],add:1}),
  lava:p=>mgSpawn({t:"spark",x:p.x,y:p.y+.2+Math.random()*.6,z:p.z,vy:1.2+Math.random(),vx:(Math.random()-.5)*.6,vz:(Math.random()-.5)*.6,life:.9,size:.2,size2:.03,col:[0xffa040,0xff5a10,0xffe080],add:1,grav:2}),
  zvjezde:p=>mgSpawn({t:"star",x:p.x,y:p.y+.4+Math.random()*1.1,z:p.z,vy:.1,life:1.3,size:.18,size2:.02,col:[0xffffff,0xfff0a0,0xc8a0ff,0x8ad0ff],add:1,spin:1}),
  dijamant:p=>mgSpawn({t:"flake",x:p.x,y:p.y+.3+Math.random()*.9,z:p.z,vy:.2,life:.7,size:.22,size2:.03,col:[0xffffff,0xff9ad0,0x9ae8ff,0xfff09a],add:1,spin:5})};
for(const k in WOWSKIN){const W2=WOWSKIN[k];MSKIN[k]=Object.assign({p:0,rar:"l",wr:"Igraonica: zlatna medalja"},W2,{fx:null,wowfx:W2.fx});}
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};for(const k in WOWSKIN)ins("skin",k,MSKIN[k]);}
/* put textures on a set of meshes (or take them off again) */
function wowTexApply(ms,sk){const tx=sk&&sk.tex?sk.tex():null;for(const o of ms){let m=o.material;if(!o.userData.wowCl){o.material=m=m.clone();o.userData.wowCl=1;}
    if(tx){if(m.emissiveMap!==tx){m.emissiveMap=tx;m.needsUpdate=true;}}else if(m.emissiveMap&&o.userData.wowT){m.emissiveMap=null;m.needsUpdate=true;}o.userData.wowT=!!tx;}}
{const _as=applySkin;applySkin=function(){_as.apply(this,arguments);if(!rida)return;const sk=MSKIN[S.mg.skin];const ms=foxBody();if(sk&&(sk.tex||sk.anim))wowTexApply(ms,sk);else if(ms.some(o=>o.userData.wowT))wowTexApply(ms,null);};}
{const _pg=mgPaintGroup;mgPaintGroup=function(g,sk){g.traverse(o=>{if(o.isMesh&&o.userData.pk==null){const pk=FOXHEX[o.material.color.getHex()];if(pk)o.userData.pk=pk;}});_pg.apply(this,arguments);
  const list=[];g.traverse(o=>{if(o.isMesh&&o.userData.pk)list.push(o);});if(sk&&(sk.tex||sk.anim)){wowTexApply(list,sk);if(sk.anim)sk.anim(list,1.3);}else if(list.some(o=>o.userData.wowT))wowTexApply(list,null);};}
let wowFxT=0;
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);if(!S.mg||!rida||MCHAR[S.mg.char])return;const sk=MSKIN[S.mg.skin];if(!sk||!sk.anim)return;const t=performance.now()/1000;sk.anim(foxBody(),t);
  if(FP.on&&sk.wowfx&&WOWFX[sk.wowfx]&&!(FP.under)){const hs=Math.hypot(FP.v.x,FP.v.z);wowFxT+=dt*(hs>.8?11:3.5);while(wowFxT>1){wowFxT--;const P=FP.p;WOWFX[sk.wowfx]({x:P.x+(Math.random()-.5)*.6,y:P.y,z:P.z+(Math.random()-.5)*.6});}}};}

/* ---------- the minigame framework ---------- */
const MINI={},MINIL=[];const MG={cur:null,arena:null,keys:{},over:true,t:0,score:0};const ARY=112;
function miniReg(k,o){o.k=k;MINI[k]=o;MINIL.push(o);}
function miniRec(k){S.mini=S.mini||{};return S.mini[k]||(S.mini[k]={best:null,medal:0,plays:0,gold:0});}
function miniMedal(g,sc){const M=g.medals;let m=0;for(let i=0;i<3;i++)if(g.low?sc<=M[i]:sc>=M[i])m=i+1;return m;}
const MEDALN=["","Brončana","Srebrna","Zlatna"],MEDALC=["","#c8783a","#a8b4c4","#ffc53d"];
function miniActor(sc){const ch=S.mg&&MCHAR[S.mg.char]?S.mg.char:null;const g=ch?MODELS[ch]():MODELS.rida();if(!ch&&S.mg&&S.mg.skin&&MSKIN[S.mg.skin])mgPaintGroup(g,MSKIN[S.mg.skin]);
  g.scale.setScalar((sc||1)*(ch?MCHAR[ch].sc*.8:1));g.userData.ms=[];g.traverse(o=>{if(o.isMesh&&o.userData.pk)g.userData.ms.push(o);});return g;}
function miniAnimActor(g,t,run){const p=g.userData.parts||{};const s=Math.sin(t*(run?14:3))*(run?.7:.08);if(p.l0){p.l0.rotation.x=s;p.l1&&(p.l1.rotation.x=-s);p.l2&&(p.l2.rotation.x=-s);p.l3&&(p.l3.rotation.x=s);}if(p.tail)p.tail.rotation.y=Math.sin(t*4)*.3;
  const sk=S.mg&&!MCHAR[S.mg.char]&&MSKIN[S.mg.skin];if(sk&&sk.anim&&g.userData.ms.length)sk.anim(g.userData.ms,performance.now()/1000);}
function miniStart(k){const g=MINI[k];if(!g)return;if(S.tickets<1)return noTickets();S.tickets--;save();closeSheet();enterGame("mini");G2.cam=true;
  const A=new THREE.Group();A.position.set(CX,ARY,CZ);scene.add(A);const hl=new THREE.HemisphereLight(0xffffff,0x8a9ab8,.55);A.add(hl);const dl=new THREE.DirectionalLight(0xfff4e0,.65);dl.position.set(20,40,14);A.add(dl);A.add(dl.target);
  Object.assign(MG,{cur:g,arena:A,keys:{},over:false,t:0,score:0,ui:{}});MG.bv=beam.visible;beam.visible=false;MG.fog=scene.fog.density;scene.fog.density=g.fog!=null?g.fog:.0026;
  const P=$("miniPanel");P.hidden=false;P.className="mini mini-"+k;P.innerHTML=(g.ui?g.ui():"")+'<div class="miniMsg" id="miniMsg"></div>';$("gTitle").innerHTML="";$("gInfo").innerHTML="";
  const tc=$("miniTouch");tc.hidden=!g.touch;miniRec(k);g.start(MG,A);if(g.hint)setTimeout(()=>miniMsg(g.hint,3200),300);}
let miniMsgT=0;function miniMsg(t,ms){const el=$("miniMsg");if(!el)return;el.innerHTML=t;el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop");clearTimeout(miniMsgT);miniMsgT=setTimeout(()=>{el.innerHTML="";},ms||1600);}
function miniHUD(title,info){$("gTitle").innerHTML=title;$("gInfo").innerHTML=info;}
function miniFinish(res){if(MG.over)return;MG.over=true;const g=MG.cur,R=miniRec(g.k);const sc=res.score;const rec=R.best==null||(g.low?sc<R.best:sc>R.best);if(rec)R.best=sc;R.plays++;
  const medal=miniMedal(g,sc);const was=R.medal;if(medal>R.medal)R.medal=medal;const coins=Math.round([8,20,35,55][medal]+(res.bonus||0));S.coins+=coins;
  let reward=null;if(medal===3&&!R.gold){R.gold=1;const it=mgIt("skin:"+g.reward);if(it&&!mgOwn(it)){mgGive(it);reward=it;}}save();renderEco();if(typeof questCheck==="function")questCheck();
  sfx.fanfare();if(medal>=2&&typeof fireworks==="function")setTimeout(fireworks,300);flyCoins(coins,{x:innerWidth/2,y:innerHeight/2});
  const el=$("gPop");el.className="gpop card minipop";el.innerHTML='<img alt="" src="'+miniIcon(g)+'"><h3>'+esc(res.title||g.n)+'</h3><p class="miniSc">'+esc(res.label)+'</p>'+
    (medal?'<div class="medal m'+medal+'"><i></i><b>'+MEDALN[medal]+' medalja</b>'+(medal>was&&was?'<small>Bolja nego prije!</small>':'')+'</div>':'<p class="muted">Za brončanu medalju: '+esc(g.mlab(0))+'</p>')+
    (rec&&R.plays>1?'<span class="newb gold">Novi rekord!</span>':'<p class="muted">Rekord: '+esc(g.fmt(R.best))+'</p>')+
    (medal<3?'<p class="muted miniNext">Sljedeća medalja: '+esc(g.mlab(medal))+(R.gold?'':' · Zlatna donosi legendarno odijelo!')+'</p>':'')+
    '<div class="earn">'+COIN_SVG+'<b>+'+coins+'</b><span>zlatnika</span></div><div class="row" style="justify-content:center">'+(S.tickets>0?'<button class="btn green" id="gAgain">Igraj opet ('+TIX_SVG+' 1)</button>':'')+'<button class="btn" id="gBack">Natrag na otok</button></div>';el.hidden=false;
  $("gBack").onclick=()=>{sfx.click();miniClose();exitGame();goHome();};const ag=$("gAgain");if(ag)ag.onclick=()=>{sfx.click();const k=g.k;miniClose();exitGame();miniStart(k);};
  if(reward)setTimeout(()=>rewardReveal({kicker:"Prva zlatna medalja!",title:reward.n,chest:"gold",items:[{ic:mgIcon(reward),n:reward.n,cnt:0,rar:"l"}],sub:"Novo legendarno odijelo za Ridu: "+reward.d+" Obuci ga u Čarobnoj trgovini.",ok:"Jupi!"}),900);}
function miniClose(){const g=MG.cur;if(g&&g.stop)try{g.stop(MG);}catch(e){}if(MG.arena){scene.remove(MG.arena);MG.arena.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];for(const m of ms){if(m.map&&!m.map.keep)m.map.dispose();m.dispose();}}});}
  MG.arena=null;MG.cur=null;MG.over=true;MG.keys={};if(MG.bv!=null){beam.visible=MG.bv;MG.bv=null;}if(MG.fog!=null)scene.fog.density=MG.fog;$("miniPanel").hidden=true;$("miniTouch").hidden=true;$("gPop").hidden=true;G2.cam=false;}
{const _tg=tickGames;tickGames=function(dt,t){_tg.apply(this,arguments);if(G2.mode==="mini"&&MG.cur&&!MG.over){MG.t+=dt;MG.cur.tick(Math.min(dt,.05),t,MG);}else if(G2.mode==="mini"&&MG.cur&&MG.cur.idle)MG.cur.idle(Math.min(dt,.05),t,MG);};}
{const ex=$("gExit");const _oc=ex.onclick;ex.onclick=e=>{if(G2.mode==="mini"){sfx.click();if(MG.over){miniClose();exitGame();goHome();}else if(MG.cur.quit)MG.cur.quit(MG);else{miniClose();exitGame();goHome();}return;}_oc&&_oc(e);};}
{const _tt=tickTime;tickTime=function(dt){_tt.apply(this,arguments);if(G2.mode==="mini"&&MG.cur&&MG.cur.env)try{MG.cur.env();}catch(e){}};}
/* keyboard + touch: games read MG.keys, and get onDown/onUp/onMove for pointer play */
addEventListener("keydown",e=>{if(G2.mode!=="mini"||!MG.cur)return;const k=e.key.toLowerCase();if(k===" "||k.startsWith("arrow"))e.preventDefault();if(e.repeat)return;MG.keys[k]=true;if(MG.cur.key&&!MG.over)MG.cur.key(k,true,MG);});
addEventListener("keyup",e=>{if(G2.mode!=="mini"||!MG.cur)return;const k=e.key.toLowerCase();MG.keys[k]=false;if(MG.cur.key&&!MG.over)MG.cur.key(k,false,MG);});
document.body.insertAdjacentHTML("beforeend",'<div id="miniTouch" hidden></div><div id="miniPanel" class="mini" hidden></div>');
{const tc=$("miniTouch");const pos=e=>({x:e.clientX,y:e.clientY});tc.addEventListener("pointerdown",e=>{if(!MG.cur||MG.over)return;tc.setPointerCapture(e.pointerId);MG.pd=pos(e);MG.cur.onDown&&MG.cur.onDown(pos(e),MG);});
  tc.addEventListener("pointermove",e=>{if(!MG.cur||MG.over||!MG.pd)return;MG.cur.onMove&&MG.cur.onMove(pos(e),MG);});
  const up=e=>{if(!MG.cur||!MG.pd)return;MG.pd=null;if(!MG.over)MG.cur.onUp&&MG.cur.onUp(pos(e),MG);};tc.addEventListener("pointerup",up);tc.addEventListener("pointercancel",up);}
function miniBtn(id,on,off){const el=$(id);if(!el)return;const d=e=>{e.preventDefault();el.classList.add("on");on&&on();},u=e=>{el.classList.remove("on");off&&off();};el.addEventListener("pointerdown",d);el.addEventListener("pointerup",u);el.addEventListener("pointerleave",u);el.addEventListener("pointercancel",u);}
/* shared helpers for arenas */
const mStd=(c,o)=>{o=Object.assign({},o||{});if(typeof o.emissive==="number")o.emissive=LC(o.emissive);return new THREE.MeshStandardMaterial(Object.assign({color:typeof c==="number"?LC(c):c,roughness:.8,metalness:0},o));};
function mBox(A,w,h,d,c,x,y,z,o){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mStd(c,o));m.position.set(x,y,z);A.add(m);return m;}
function mSky(A,top,bot){const m=new THREE.Mesh(new THREE.SphereGeometry(300,24,12),new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:{a:{value:new THREE.Color(top)},b:{value:new THREE.Color(bot)}},
  vertexShader:"varying vec3 vp;void main(){vp=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform vec3 a,b;varying vec3 vp;void main(){gl_FragColor=vec4(mix(b,a,smoothstep(-.15,.6,vp.y)),1.);}"}));m.renderOrder=-5;A.add(m);return m;}
function camTo(px,py,pz,lx,ly,lz,k,dt){const A=MG.arena.position;const tp=new THREE.Vector3(A.x+px,A.y+py,A.z+pz);if(k>=1)camera.position.copy(tp);else camera.position.lerp(tp,Math.min(1,dt*k));camera.lookAt(A.x+lx,A.y+ly,A.z+lz);}
/* icons for the game cards */
const MINIIC={};
function miniIcon(g){if(MINIIC[g.k])return MINIIC[g.k];const c=document.createElement("canvas");c.width=c.height=96;const x=c.getContext("2d");const gr=x.createLinearGradient(0,0,0,96);gr.addColorStop(0,g.col[0]);gr.addColorStop(1,g.col[1]);x.fillStyle=gr;
  x.beginPath();x.roundRect?x.roundRect(2,2,92,92,20):x.rect(2,2,92,92);x.fill();x.lineWidth=4;x.strokeStyle="#16243a";x.stroke();g.icon(x);return MINIIC[g.k]=c.toDataURL();}
/* the Igraonica lists the new games */
{const _sg=sheetGames;sheetGames=function(tab){_sg.apply(this,arguments);if(tab!=="igre")return;const box=$("sheetBody").querySelector(".games");if(!box)return;
  const html='<h3 class="miniH">Nove igre</h3>'+MINIL.map(g=>{const R=miniRec(g.k);return '<div class="gcard minicard"><img alt="" src="'+miniIcon(g)+'"><div><b>'+esc(g.n)+'</b><span class="muted">'+esc(g.d)+'</span><small>'+(R.medal?'<i class="mdot m'+R.medal+'"></i>'+MEDALN[R.medal]+' medalja · ':'')+'Rekord: '+(R.best==null?'još nema':esc(g.fmt(R.best)))+(R.gold?'':' · Zlato: legendarno odijelo')+'</small></div><button class="btn green" data-mini="'+g.k+'">Igraj</button></div>';}).join("");
  box.insertAdjacentHTML("afterbegin",html);box.querySelectorAll("[data-mini]").forEach(b=>b.onclick=()=>{sfx.click();miniStart(b.dataset.mini);});};}
