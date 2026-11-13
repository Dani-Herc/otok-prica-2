/* =================== v15: levels that matter, help, the magic belt, new gadgets =================== */
/* ---------- levels ---------- */
for(let i=11;i<=30;i++)LEVELS[i]=i<15?"Čarobnica priča":i<20?"Kraljica knjiga":i<25?"Legenda otoka":i<30?"Zvjezdana čitateljica":"Vladarica Otoka priča";
const nKeys=o=>o?Object.keys(o).length:0;
function exXP(){return 15*nKeys(S.poi)+10*nKeys(S.chests)+10*nKeys(S.met)+3*((S.mg&&S.mg.boxes)||0)+Math.min(150,Math.floor((S.mined||0)/20))+2*(S.crafted||0);}
function lvXP(){return (S.xp||0)+exXP();}
level=function(){return 1+Math.floor(Math.sqrt(lvXP()/20));};
const lvNeed=lv=>20*(lv-1)*(lv-1);
{const _rh=renderHUD;renderHUD=function(){_rh.apply(this,arguments);const lv=level(),x=lvXP(),a=lvNeed(lv),b=lvNeed(lv+1);
  $("lvlName").textContent="Razina "+lv+" · "+LEVELS[Math.min(lv,LEVELS.length-1)];$("xpBar").style.width=Math.max(3,Math.round(100*(x-a)/(b-a)))+"%";};}
const PERKS={dah:{n:"Dugi dah",d:"Rida pod vodom ima pola više zraka."},plivanje:{n:"Brzo plivanje",d:"Rida pliva četvrtinu brže."},kramp:{n:"Jake šape",d:"Kopanje je puno brže."},
  brzina:{n:"Brze noge",d:"Rida trči malo brže."},sreca:{n:"Sretna zvijezda",d:"U svakoj kutiji pola više zlatnika."}};
const LVR={2:[["c",50],["i","emo:salto"],["i","gad:grudve"]],3:[["box"],["c",40]],4:[["i","trail:mjehurici"],["i","gad:konfeti"]],5:[["perk","dah"],["c",60]],6:[["i","gad:stapic"]],
  7:[["i","skin:sumska"],["c",80]],8:[["perk","plivanje"]],9:[["c",150],["box"]],10:[["i","gad:opruge"],["box"]],11:[["i","emo:vrtnja"],["c",100]],12:[["i","char:zec"]],13:[["i","gad:kuka"]],
  14:[["i","trail:leptiri"],["c",120]],15:[["perk","kramp"]],16:[["magic"],["c",100]],17:[["i","gad:trampolin"]],18:[["i","skin:nocna"]],19:[["c",250]],20:[["i","gad:kisobran"],["perk","brzina"]],
  21:[["magic"]],22:[["c",300]],23:[["i","emo:zvijezda"]],24:[["i","char:sova"]],25:[["perk","sreca"]],26:[["magic"],["c",200]],27:[["i","trail:duga"]],28:[["i","skin:zlatna"]],29:[["c",500]],30:[["i","skin:galakticka"],["c",1000]]};
const lvRew=L=>LVR[L]||[["c",100+L*10]];
function lvChip(r){if(r[0]==="c")return {ic:itemIcon("coin"),n:"+"+r[1]+" zlatnika"};if(r[0]==="perk")return {ic:itemIcon("mg_perk_"+r[1]),n:"Moć: "+PERKS[r[1]].n};
  if(r[0]==="box")return {ic:itemIcon("mg_box_disc"),n:"Kutija iznenađenja"};if(r[0]==="magic")return {ic:itemIcon("mg_box_buy"),n:"Čarobna kutija"};const it=mgIt(r[1]);return it?{ic:mgIcon(it),n:it.n}:{ic:itemIcon("star"),n:"?"};}
function lvReveal(){const to=level(),from=S.lvSeen||1;lvQ=false;if(to<=from)return;const items=[],got=[],perks=[];let coins=0;
  for(let L=from+1;L<=to;L++)for(const r of lvRew(L)){
    if(r[0]==="c")coins+=r[1];
    else if(r[0]==="perk"){if(!S.perks[r[1]]){S.perks[r[1]]=1;perks.push(r[1]);items.push({ic:itemIcon("mg_perk_"+r[1]),n:PERKS[r[1]].n,cnt:0,rar:"e"});}}
    else{const it=r[0]==="i"?mgIt(r[1]):mgPickNew(r[0]==="magic"?"e":null);if(it&&!mgOwn(it)){mgGive(it);got.push(it);items.push({ic:mgIcon(it),n:it.n,cnt:0,rar:it.rar});}else coins+=80;}}
  if(coins){S.coins+=coins;items.unshift(rwItem("coins",coins));}
  S.lvSeen=to;applyPerks();save();renderEco();renderHUD();hotbarRender();if(typeof beltRender==="function")beltRender(true);
  let more=items.length>8?items.length-8:0;if(more){items.length=8;}
  const nx=lvRew(to+1).map(r=>lvChip(r).n).join(" i ");
  const sub=(got.length?"Novo: "+got.map(i=>i.n).join(", ")+(more?" i još "+more+"!":"")+". ":"")+(perks.length?perks.map(k=>PERKS[k].n+": "+PERKS[k].d).join(" ")+" ":"")+"Na razini "+(to+1)+" čeka: "+nx+".";
  rewardReveal({kicker:to-from>1?"Nove razine!":"Nova razina!",title:"Razina "+to+" · "+LEVELS[Math.min(to,LEVELS.length-1)],chest:"gold",items,sub,ok:"Jupi!"});
  if(rida)rida.celebrate=1.2;}
let lvQ=false,lvT=0,lvLast=-1;
function lvWatch(){const x=lvXP();if(x!==lvLast){lvLast=x;renderHUD();}if(!lvQ&&level()>(S.lvSeen||1)){lvQ=true;MGQ.push({run:lvReveal});}}
function sheetLevels(){const lv=level(),x=lvXP(),a=lvNeed(lv),b=lvNeed(lv+1),ex=exXP();
  const rows=[];for(let L=2;L<=30;L++){const st=L<=lv?"done":L===lv+1?"next":"";
    rows.push('<div class="lvrow '+st+'"><span class="lvn">'+L+'</span><div class="lvr">'+lvRew(L).map(r=>{const c=lvChip(r);return '<span class="lvc"><img alt="" src="'+c.ic+'">'+esc(c.n)+'</span>';}).join("")+'</div><em>'+(L<=lv?"Osvojeno!":L===lv+1?"Još "+(b-x):lvNeed(L)+" bodova")+'</em></div>');}
  openSheet('<div class="lvhead"><div class="lvbig"><small>Razina</small><b>'+lv+'</b></div><div class="lvinfo"><h2>Put razina</h2><p class="lvname">'+esc(LEVELS[Math.min(lv,LEVELS.length-1)])+'</p>'+
    '<div class="lvbar"><i style="width:'+Math.max(3,Math.round(100*(x-a)/(b-a)))+'%"></i></div><p class="muted">Još <b>'+(b-x)+'</b> bodova do razine '+(lv+1)+'.</p></div></div>'+
    '<div class="lvsrc"><span><b>'+(S.xp||0)+'</b> bodova od čitanja</span><span><b>'+ex+'</b> bodova od istraživanja</span></div>'+
    '<p class="muted">Svaka pročitana stranica je 1 bod. Nova mjesta, novi prijatelji, škrinje i kutije daju još bodova. Na svakoj razini čeka nagrada, a neke donose i posebne moći!</p>'+
    '<div class="lvpath">'+rows.join("")+'</div><button class="btn soft" id="lvHow">Kako se igra?</button>');
  $("lvHow").onclick=()=>{sfx.click();sheetHow();};
  setTimeout(()=>{const n=document.querySelector(".lvrow.next")||document.querySelector(".lvrow.done:last-of-type");if(n)n.scrollIntoView({block:"center"});},60);}

/* ---------- how to play ---------- */
function sheetHow(){const k=t=>'<kbd>'+t+'</kbd>';
  const S2=[["paw","Hodanje i kamera",k("W A S D")+" ili strelice vode Ridu, "+k("Shift")+" je trčanje. Na tabletu je lijevo palica za hodanje, a povlačenjem prsta okrećeš pogled. Na joysticku: lijeva palica hoda, desna gleda."],
    ["mg_gad_opruge","Skok",k("Razmaknica")+", gumb Skok ili "+k("A")+" na joysticku. Što duže držiš, Rida skoči više."],
    ["mg_gad_cizme","Posebni skokovi","Dupli skok: s Raketnim čizmama ili kao Crvena panda skoči, pa u zraku pritisni Skok još jednom. Lebdenje: s Kišobranom ili kao Sovica skoči i drži Skok dok padaš. Superskok: Opružne šape ili Zečica Skokica. A trampolin te baci do oblaka!"],
    ["maska","Ronjenje i maska","U vodi drži Roni (tipka "+k("C")+", gumb Roni ili "+k("B")+") i Rida zaroni. Skok je vodi gore. Mjehurići pokazuju koliko zraka ima: bez maske 9 sekundi, s Ronilačkom maskom 45! Masku izradiš u Radionici u torbi ("+k("E")+"). Pod morem čekaju koralji, biseri i potopljeno blago."],
    ["camac","Čamac","Kad imaš čamac, Rida sama sjedne u njega u dubokom moru. Izlaziš tipkom Roni ili kad dođeš do obale. Želiš li plivati, isključi čamac na traci, na stranici s čarolijama."],
    ["kramp","Kopanje","Drži prst ili miš na kockici ("+k("RT")+" na joysticku). Rida sama uzme pravi alat: kramp za kamen, lopatu za zemlju i pijesak, sjekiru za drvo. Bolji kramp kopa tvrđe rude."],
    ["mg_gad_kuka","Traka s oruđima i čarolijama","Dolje na ekranu je traka. Na prvoj stranici su šapa i kockice, na drugoj alati, čamac, lampa i čarolije. Stranicu mijenjaš tipkom "+k("Q")+" ili dodirom na mali štapić. Tipke "+k("1")+" do "+k("9")+" biraju mjesto. Zelena točka znači uključeno. Joystick: "+k("◀ ▶")+" bira, "+k("▲")+" koristi. Tipka "+k("Z")+" baca kuku, "+k("X")+" grudvu."],
    ["mg_emo_ples","Plesovi i čarolije","Dodirni gumb s notom gore (tipka "+k("G")+" ili "+k("R3")+") i odaberi ples. Nove plesove i čarolije nađeš u Čarobnoj trgovini (tipka "+k("T")+")."],
    ["mg_perk_sreca","Razine","Čitanje i istraživanje daju bodove. Svaka razina donosi nagradu: nove stvari, zlatnike i posebne moći. Dodirni svoje ime gore lijevo i vidi Put razina."],
    ["mg_box_disc","Kutije","Novo mjesto, novi prijatelj i prvo rijetko blago donose Kutiju otkrića. Svaki dan kad čitaš čeka te Kutija čitača."]];
  openSheet('<h2>Kako se igra?</h2><div class="howto">'+S2.map(s=>'<div class="howr"><img alt="" src="'+itemIcon(s[0],s[0]==="kramp"?2:0)+'"><div><b>'+s[1]+'</b><p>'+s[2]+'</p></div></div>').join("")+'</div><button class="btn big" id="howOk">Idemo!</button><button class="btn soft" id="howLv">Put razina</button>');
  $("howOk").onclick=()=>{sfx.click();closeSheet();};$("howLv").onclick=()=>{sfx.click();sheetLevels();};}
function tipOnce(k,t,ms){S.tips=S.tips||{};if(S.tips[k])return;S.tips[k]=1;save();toast(t,ms||5200);}
for(const [id,h] of [["gad:cizme","Skoči, pa u zraku pritisni Skok još jednom!"],["gad:kisobran","Skoči i drži Skok dok padaš."],["char:sova","Skoči i drži Skok dok padaš, pa lebdi."],["char:panda","Skoči, pa u zraku pritisni Skok još jednom!"],
  ["char:jez","Trči (Shift ili palica do kraja) i Ježić se smota u kuglu."],["char:pingvin","Uđi u more i vidi kako brzo pliva!"],["char:zec","Samo skoči. Visoko!"],["gad:opruge","Samo skoči. Boing!"],["gad:vodene","Uđi u more i hodaj po vodi. Za ronjenje drži Roni."]]){const it=mgIt(id);if(it)it.how=h;}

/* ---------- new gadgets ---------- */
const MORE={kuka:{n:"Kuka za penjanje",d:"Baci kuku na brdo, stijenu ili krov i uže te povuče gore. Vuuuš!",p:650,rar:"l",act:1,how:"Okreni se prema brdu ili kući i dodirni kuku na traci (tipka Z)."},
  trampolin:{n:"Džepni trampolin",d:"Postavi trampolin bilo gdje i odskoči do oblaka!",p:200,rar:"r",act:1,how:"Dodirni ga na traci i trampolin se pojavi ispred Ride. Skoči na njega!"},
  grudve:{n:"Vreća grudvi",d:"Snježne grudve koje nikad ne ponestanu. Gađaj prijatelje!",p:60,rar:"c",act:1,how:"Dodirni grudve na traci (tipka X) i Rida baci grudvu kamo gledaš."},
  konfeti:{n:"Konfeti-top",d:"Bum! Šarena kiša konfeta za svaku proslavu.",p:50,rar:"c",act:1,how:"Dodirni ga na traci i proslavi!"},
  stapic:{n:"Čarobni štapić",d:"Mahni i oko Ride nikne šareno cvijeće!",p:300,rar:"e",act:1,how:"Dodirni štapić na traci i gledaj kako cvijeće raste."}};
{const at=MCAT.findIndex(i=>i.cat==="emo");const add=[];for(const k in MORE){MGAD[k]=MORE[k];const it=mgAdd("gad",k,MORE[k]);MCAT.pop();add.push(it);}MCAT.splice(at<0?MCAT.length:at,0,...add);}
const needFP=()=>{if(FP.on)return true;toast("To radi u istraživanju. Pritisni Istraži!",2600);return false;};
{const _mu=mgUse;mgUse=function(k){if(S.mg&&mgOwn(mgIt("gad:"+k)))beltPush("gad:"+k);if(k==="kuka")return mgHook();if(k==="trampolin")return mgTramp();if(k==="grudve")return mgSnow();if(k==="konfeti")return mgConf();if(k==="stapic")return mgWand();return _mu.apply(this,arguments);};}
{const _ms=mgShape;mgShape=function(x,k,fill,ol){if(k==="conf"){x.save();x.fillStyle=fill;x.fillRect(10,20,44,24);x.restore();return;}if(k==="petal"){x.save();x.fillStyle=fill;x.beginPath();x.ellipse(32,32,16,10,0,0,7);x.fill();x.restore();return;}return _ms.apply(this,arguments);};}
const fwd=()=>{const cy=FP.cam.yaw;return [-Math.sin(cy),-Math.cos(cy)];};
const BOXG=new THREE.BoxGeometry(1,1,1);const matC={};const mat=c=>matC[c]||(matC[c]=std(c));
function vbox(g,w,h,d,x,y,z,c){const m=new THREE.Mesh(BOXG,mat(c));m.scale.set(w,h,d);m.position.set(x,y,z);m.castShadow=true;g.add(m);return m;}

/* the grappling hook */
const HOOK={g:null,rope:null};
function hookFind(){const P=FP.p,[fx,fz]=fwd(),ox=P.x,oy=P.y+1,oz=P.z;
  for(const up of [.2,.4,.65,.95,1.35,1.9,2.8]){const L=Math.hypot(1,up),dx=fx/L,dy=up/L,dz=fz/L;
    for(let s=.6;s<=24;s+=.12){const x=ox+dx*s,y=oy+dy*s,z=oz+dz*s;if(y>=H-1)break;const t=get(Math.floor(x),Math.floor(y),Math.floor(z));if(!t||TYPES[t].water)continue;
      if(s<2)break;const bx=Math.floor(x),bz=Math.floor(z);let ty=Math.floor(y);for(let i=0;i<8&&solidAt(bx+.5,ty+1.5,bz+.5);i++)ty++;
      if(solidAt(bx+.5,ty+1.5,bz+.5)||ty+1<P.y+.9)break;if(hitsAt(bx+.5,ty+1.02,bz+.5))break;return {x:bx+.5,y:ty+1.02,z:bz+.5,ax:x,ay:y,az:z};}}
  return null;}
function mgHook(){if(!needFP())return;if(FP.hook)return;if(FP.boat){toast("Iz čamca kuka ne može. Prvo izađi na obalu!",2400);return;}
  const tg=hookFind();const P=FP.p;
  if(!tg){toast("Kuka nema za što zapeti. Okreni se prema brdu, stijeni, drvetu ili krovu!",3000);tone(300,.08,"square",.02);tone(200,.1,"square",.02,.08);return;}
  if(FP.mount)dismount();if(ACT)endAct(false,true);FP.emo=null;
  if(!HOOK.g){HOOK.g=new THREE.Group();vbox(HOOK.g,.22,.22,.22,0,0,0,0x8a96a8);vbox(HOOK.g,.5,.08,.08,0,.1,0,0x8a96a8);vbox(HOOK.g,.08,.08,.5,0,.1,0,0x8a96a8);scene.add(HOOK.g);
    HOOK.rope=new THREE.Mesh(BOXG,mat(0xb07a3a));scene.add(HOOK.rope);}
  HOOK.g.visible=HOOK.rope.visible=true;HOOK.g.position.set(tg.ax,tg.ay,tg.az);
  FP.hook={x:tg.x,y:tg.y,z:tg.z,ax:tg.ax,ay:tg.ay,az:tg.az,t:0,fly:0,stuck:0,best:1e9,stall:0};FP.yaw=Math.atan2(tg.x-P.x,tg.z-P.z);
  tone(900,.05,"square",.02);for(let i=0;i<6;i++)tone(500+i*90,.05,"sawtooth",.012,i*.03);}
function hookRope(){const h=FP.hook,P=FP.p;if(!h)return;const k=Math.min(1,h.fly/.16);const hx=P.x+(h.ax-P.x)*k,hy=P.y+.9+(h.ay-P.y-.9)*k,hz=P.z+(h.az-P.z)*k;
  HOOK.g.position.set(hx,hy,hz);const r=HOOK.rope;r.position.set((P.x+hx)/2,(P.y+.9+hy)/2,(P.z+hz)/2);const d=Math.hypot(hx-P.x,hy-P.y-.9,hz-P.z);r.scale.set(.06,.06,Math.max(.01,d));r.lookAt(hx,hy,hz);}
function hookEnd(ok){const h=FP.hook;FP.hook=null;if(HOOK.g){HOOK.g.visible=HOOK.rope.visible=false;}if(!h)return;const P=FP.p;
  if(ok){FP.v.set(0,4.2,0);FP.flipT=.5;burst(P.x,P.y+.2,P.z,18,[[1,1,1],[1,.9,.6]],1.6,1.6,.5);sfx.pop();}else FP.v.set(0,0,0);}
function hookPre(dt){const h=FP.hook,P=FP.p;h.t+=dt;h.fly+=dt;if(h.fly<.16)return;const dx=h.x-P.x,dy=h.y-P.y,dz=h.z-P.z,d=Math.hypot(dx,dy,dz);
  if(d<.3||h.t>3.2){if(d<.6&&!hitsAt(h.x,h.y,h.z))P.set(h.x,h.y,h.z);hookEnd(d<1.2);return;}
  const st=Math.min(d,20*dt);const nx=P.x+dx/d*st,ny=P.y+dy/d*st,nz=P.z+dz/d*st;
  if(!hitsAt(nx,ny,nz))P.set(nx,ny,nz);else if(!hitsAt(P.x,P.y+st,P.z))P.y+=st;else if(!hitsAt(nx,P.y,nz)){P.x=nx;P.z=nz;}else{h.stuck+=dt;if(h.stuck>.3){hookEnd(false);return;}}
  if(d<h.best-.04){h.best=d;h.stall=0;}else{h.stall+=dt;if(h.stall>.3){hookEnd(false);FP.v.y=5.5;return;}}
  FP.v.set(0,0,0);FP.ground=false;if(Math.random()<.4)mgSpawn({t:"spark",x:P.x,y:P.y+.4,z:P.z,life:.35,size:.25,size2:.02,col:0xffffff,add:1});}

/* pocket trampolines */
const TRAMP=[];
function mgTramp(){if(!needFP())return;const P=FP.p,[fx,fz]=fwd();if(FP.swim||FP.boat){toast("Trampolin treba čvrsto tlo!",2200);return;}
  let spot=null;for(const r of [1.8,2.4,1.3,3]){const x=Math.floor(P.x+fx*r)+.5,z=Math.floor(P.z+fz*r)+.5;const fy=floorY(x,P.y+2.5,z);if(fy<0)continue;const y=fy+1;
    if(Math.abs(y-P.y)>2.6||waterAt(x,y+.3,z)||solidAt(x,y+.5,z)||solidAt(x,y+1.5,z))continue;spot={x,y,z};break;}
  if(!spot){toast("Ovdje nema mjesta za trampolin. Pokušaj na ravnom!",2400);return;}
  if(TRAMP.length>=3){const o=TRAMP.shift();scene.remove(o.g);}
  const g=new THREE.Group();const cols=[0xff5a8a,0x4aa8ff,0x5ac83a,0xb46cff];const c=cols[Math.floor(Math.random()*cols.length)];
  vbox(g,1.5,.06,1.5,0,.16,0,c);for(const [a,b,w,d] of [[0,.72,1.6,.12],[0,-.72,1.6,.12],[.72,0,.12,1.6],[-.72,0,.12,1.6]])vbox(g,w,.1,d,a,.17,b,0xffc53d);
  for(const a of [-.65,.65])for(const b of [-.65,.65])vbox(g,.1,.14,.1,a,.06,b,0x16243a);
  g.position.set(spot.x,spot.y,spot.z);g.scale.setScalar(.01);scene.add(g);TRAMP.push({x:spot.x,y:spot.y,z:spot.z,g,t:40,sq:0,born:0});
  mgRing(spot.x,spot.y+.2,spot.z,c);sfx.pop();tone(330,.08,"triangle",.03);tone(660,.1,"triangle",.03,.08);
  tipOnce("tramp","Skoči na trampolin! Drži Skok kad sletiš i odskočit ćeš još više.");}
function trampTick(dt){for(let i=TRAMP.length-1;i>=0;i--){const t=TRAMP[i];t.t-=dt;t.born=Math.min(1,t.born+dt*4);t.sq=Math.max(0,t.sq-dt*3);
    const sc=t.t<1?Math.max(.01,t.t):t.born<1?1.15*Math.sin(t.born*1.9)+.01:1;t.g.scale.set(sc*(1+t.sq*.25),sc*(1-t.sq*.6),sc*(1+t.sq*.25));
    if(t.t<=0){scene.remove(t.g);TRAMP.splice(i,1);}}}
function trampBounce(){if(!TRAMP.length||FP.swim||FP.boat||FP.hook)return;const P=FP.p,V=FP.v;
  for(const t of TRAMP){if(t.born<.6)continue;if(Math.abs(P.x-t.x)<.95&&Math.abs(P.z-t.z)<.95&&P.y>t.y-.15&&P.y<t.y+.5&&V.y<=.5&&(FP.ground||V.y<0&&P.y<t.y+.25)){
    const hi=FP.keys[" "]||FP.jump;V.y=hi?20:16.5;FP.ground=false;P.y=Math.max(P.y,t.y+.05);t.sq=1;FP.flipT=.5;FP.dblUsed=0;
    burst(t.x,t.y+.3,t.z,20,[[1,1,1],[1,.85,.4],[.6,.85,1]],2.2,2.4,.6);tone(180,.07,"sine",.04);tone(520,.12,"triangle",.03,.04);tone(880,.1,"sine",.02,.1);if(typeof padRumble==="function"&&PAD.on)padRumble(70,.3,.2);break;}}}

/* snowballs */
const SNOW=[];
function mgSnow(){if(!needFP())return;const P=FP.p,[fx,fz]=fwd();if(SNOW.length>14){const o=SNOW.shift();scene.remove(o.m);}
  const m=new THREE.Mesh(BOXG,mat(0xf4f8ff));m.scale.setScalar(.3);const up=Math.max(-.2,.5-FP.cam.pitch);m.position.set(P.x+fx*.5,P.y+1.1,P.z+fz*.5);scene.add(m);
  SNOW.push({m,vx:fx*15+FP.v.x*.5,vy:4.2+up*9,vz:fz*15+FP.v.z*.5,t:0});FP.yaw=Math.atan2(fx,fz);if(rida)rida.throwT=.3;tone(700,.04,"triangle",.02);tone(400,.06,"sine",.02,.03);}
const SNOWSAY=["Hihi! Hladno je!","Grudanje! Hura!","Ej, pogodila si me!","Uhvati me ako možeš!","Brrr, snijeg!"];
function snowTick(dt){for(let i=SNOW.length-1;i>=0;i--){const s=SNOW[i],p=s.m.position;s.t+=dt;s.vy-=18*dt;const ox=p.x,oy=p.y,oz=p.z;p.x+=s.vx*dt;p.y+=s.vy*dt;p.z+=s.vz*dt;s.m.rotation.x+=dt*9;s.m.rotation.y+=dt*7;
    let hit=solidAt(p.x,p.y,p.z)||waterAt(p.x,p.y,p.z)||s.t>3.5,who=null;
    if(!hit)for(const e of ents){if(!e.g||!e.g.visible||e===FP.mount)continue;if(Math.abs(e.x-p.x)<.7&&Math.abs(e.z-p.z)<.7&&p.y>e.y-.1&&p.y<e.y+1.4){hit=true;who=e;break;}}
    if(hit){const wat=waterAt(p.x,p.y,p.z);burst(ox,oy,oz,14,wat?[[.8,.93,1],[1,1,1]]:[[1,1,1],[.9,.95,1]],1.6,1.8,.45);if(wat)sfx.splash();else tone(160+Math.random()*60,.06,"square",.018);
      if(who){who.celebrate=.7;burst(who.x,who.y+1,who.z,10,[[1,1,1]],1.4,2,.5);if(Math.random()<.5)say(who,SNOWSAY[Math.floor(Math.random()*SNOWSAY.length)],1800);bump("snow",1);}
      scene.remove(s.m);SNOW.splice(i,1);}}}

/* confetti cannon */
function mgConf(){if(!needFP())return;const P=FP.p,[fx,fz]=fwd();const cols=[0xff5a8a,0xffc53d,0x4aa8ff,0x5ac83a,0xb46cff,0xff8a3d,0xffffff];
  for(let i=0;i<110;i++){const a=(Math.random()-.5)*1.3,s=5+Math.random()*7,cx=fx*Math.cos(a)-fz*Math.sin(a),cz=fz*Math.cos(a)+fx*Math.sin(a);
    mgSpawn({t:i%9?"conf":"star",x:P.x+fx*.4,y:P.y+1,z:P.z+fz*.4,vx:cx*s*.55,vy:4+Math.random()*7,vz:cz*s*.55,life:2+Math.random()*1.4,size:.42,size2:.34,col:cols,spin:(Math.random()-.5)*14,grav:7,drag:1.4,wob:1.6,flap:i%2===0});}
  mgRing(P.x+fx*.4,P.y+1,P.z+fz*.4,0xffc53d);if(rida)rida.celebrate=.8;
  tone(120,.09,"square",.04);tone(90,.12,"sawtooth",.03,.02);[784,988,1175,1568].forEach((f,i)=>tone(f,.12,"triangle",.025,.12+i*.07));if(typeof padRumble==="function"&&PAD.on)padRumble(120,.6,.3);}

/* the flower wand */
const FLOW=[];const FCOL=[0xff5a8a,0xffc53d,0xb46cff,0xffffff,0x4aa8ff,0xff8a3d];
function mgWand(){if(!needFP())return;const P=FP.p;let n=0;
  for(let tries=0;tries<70&&n<18;tries++){const a=Math.random()*6.28,r=1.2+Math.random()*5,x=P.x+Math.cos(a)*r,z=P.z+Math.sin(a)*r;const fy=floorY(x,P.y+3,z);if(fy<0)continue;const y=fy+1;
    if(Math.abs(y-P.y)>3.5||waterAt(x,y+.2,z)||solidAt(x,y+.4,z))continue;
    if(FLOW.length>=60){const o=FLOW.shift();scene.remove(o.g);}
    const g=new THREE.Group(),c=FCOL[Math.floor(Math.random()*FCOL.length)],h=.3+Math.random()*.25;vbox(g,.06,h,.06,0,h/2,0,0x3f9a2e);vbox(g,.16,.05,.08,.07,h*.45,0,0x5ac83a);
    vbox(g,.24,.1,.24,0,h+.03,0,c);vbox(g,.1,.12,.1,0,h+.06,0,0xffd23d);g.position.set(x,y,z);g.rotation.y=Math.random()*6.28;g.scale.setScalar(.01);scene.add(g);
    FLOW.push({g,t:90,d:r*.09,age:0,x,y,z,c});n++;}
  if(!n){toast("Ovdje cvijeće ne može rasti. Probaj na travi!",2200);return;}
  FP.emo={k:"mahni",t:0,fx:0};for(let i=0;i<24;i++){const a=Math.random()*6.28;mgSpawn({t:"star",x:P.x+Math.cos(a)*.5,y:P.y+1.3,z:P.z+Math.sin(a)*.5,vx:Math.cos(a)*2.5,vy:1+Math.random()*2,vz:Math.sin(a)*2.5,life:.9,size:.3,size2:.02,col:[0xffd23d,0xff9ad0,0xffffff],add:1,drag:2});}
  [659,784,988,1319,1568,1976].forEach((f,i)=>tone(f,.14,"sine",.025,i*.07));}
function flowTick(dt){for(let i=FLOW.length-1;i>=0;i--){const f=FLOW[i];f.t-=dt;f.age+=dt;const k=f.age-f.d;
    if(k>0&&k<dt+.001)mgSpawn({t:"petal",x:f.x,y:f.y+.4,z:f.z,vy:1.2,life:.6,size:.16,size2:.02,col:f.c});
    const s=f.t<1?Math.max(.01,f.t):k<=0?.01:k<.35?Math.sin(k/.35*1.9)*1.15+.01:1;f.g.scale.setScalar(s);f.g.rotation.z=Math.sin(f.age*2+f.x)*.06;
    if(f.t<=0){scene.remove(f.g);FLOW.splice(i,1);}}}

/* ---------- the magic belt ---------- */
const TOOLN={kramp:["Šapa","Drveni kramp","Kameni kramp","Željezni kramp","Dijamantni kramp"],lopata:["Šapa","Drvena lopata","Kamena lopata","Željezna lopata","Dijamantna lopata"],sjekira:["Šapa","Drvena sjekira","Kamena sjekira","Željezna sjekira","Dijamantna sjekira"]};
const TOOLT={kramp:["","Kopa kamen, ugljen i bakar. Za željezo treba Kameni kramp.","Kopa i željezo. Za zlato i dijamante treba Željezni kramp.","Kopa sve rude, i zlato i dijamante! Dijamantni je još brži.","Najbrži kramp na otoku. Kopa baš sve!"],
  lopata:["","Kopa zemlju, pijesak i snijeg.","Kopa zemlju, pijesak i snijeg brže.","Brzo kopa zemlju, pijesak i snijeg.","Najbrža lopata na otoku!"],sjekira:["","Siječe drvo.","Siječe drvo brže.","Brzo siječe drvo.","Najbrža sjekira na otoku!"]};
let beltSig="",beltI=0,beltL=[],beltTipT=0;
function beltPush(id){S.beltRec=[id].concat((S.beltRec||[]).filter(x=>x!==id)).slice(0,10);}
function gadSlot(it){const k=it.k;if(it.tog)return {id:it.id,ic:mgIcon(it),n:it.n,on:S.mg.gad[k]===1,use:()=>{S.mg.gad[k]=S.mg.gad[k]===1?0:1;beltPush(it.id);applyPerks();save();tone(S.mg.gad[k]?880:440,.06,"triangle",.025);return it.n+(S.mg.gad[k]?" · uključeno":" · isključeno");}};
  return {id:it.id,ic:mgIcon(it),n:it.n,key:k==="kuka"?"Z":k==="grudve"?"X":k==="vatromet"?"V":k==="daska"?"H":"",use:()=>{mgUse(k);return it.n;}};}
const ownGads=()=>MCAT.filter(it=>it.cat==="gad"&&mgOwn(it));
function beltItems(){const L=[];if(!S.mg)return L;const T=S.tools||{},G=S.gear||{};
  const tl=["kramp","lopata","sjekira"].filter(k=>T[k]);if(tl.length){const k0=tl[0];L.push({id:"t:"+tl.map(k=>k+T[k]).join(),ic:itemIcon(k0,T[k0]),n:TOOLN[k0][T[k0]],use:()=>{
    toast(tl.map(k=>TOOLN[k][T[k]]).join(", ")+". Rida sama uzme pravi alat kad kopaš! "+(T.kramp?TOOLT.kramp[T.kramp]:"Kramp izradiš u Radionici."),5200);return null;}});}
  if(G.camac)L.push({id:"camac",ic:itemIcon("camac"),n:"Čamac",on:!S.boatOff,use:()=>{S.boatOff=!S.boatOff;if(S.boatOff&&FP.boat){FP.boat=false;FP.boatPark=null;FP.boatCD=1.2;FP.v.y=-1;sfx.splash();}save();
    if(!S.boatOff)toast("Čamac je uključen. Rida sjedne u njega u dubokom moru.",2800);else toast("Čamac je isključen. Rida sad pliva i roni.",2800);return null;}});
  if(G.maska)L.push({id:"maska",ic:itemIcon("maska"),n:"Ronilačka maska",use:()=>{toast("Maska je uvijek na Ridi kad roni: 45 sekundi zraka! U vodi drži Roni (C) za ronjenje.",4200);return null;}});
  if(G.lampa||S.hat==="rudar")L.push({id:"lampa",ic:itemIcon("lampa"),n:"Lampa",on:!S.lampOff,use:()=>{S.lampOff=!S.lampOff;save();tone(S.lampOff?400:800,.05,"square",.02);return S.lampOff?"Lampa · ugašena":"Lampa · upaljena";}});
  const all=ownGads(),rec=(S.beltRec||[]).map(mgIt).filter(it=>it&&all.includes(it));
  const ord=rec.concat(all.filter(it=>it.act&&!rec.includes(it)),all.filter(it=>!it.act&&!rec.includes(it)));const cap=all.length>6?5:6;
  for(const it of ord.slice(0,cap))L.push(gadSlot(it));
  if(all.length>cap)L.push({id:"more",ic:itemIcon("mg_belt_more"),n:"Sve čarolije",use:()=>{sheetBelt();return "Sve čarolije";}});
  return L;}
function sheetBelt(){const all=ownGads();
  openSheet('<h2>Sve čarolije</h2><p class="muted">Dodirni čaroliju da je upotrijebiš ili uključiš. Zelene su uključene. Zadnje korištene ostaju na traci.</p><div class="mmenu">'+
    all.map(it=>'<button class="mgbtn'+(it.tog?(S.mg.gad[it.k]===1?" on":" off"):"")+'" data-bg="'+it.id+'"><img alt="" src="'+mgIcon(it)+'"><b>'+esc(it.n)+'</b>'+(it.tog?'<small>'+(S.mg.gad[it.k]===1?"uključeno":"isključeno")+'</small>':'')+'</button>').join("")+'</div>');
  $("sheetBody").querySelectorAll("[data-bg]").forEach(b=>b.onclick=()=>{const it=mgIt(b.dataset.bg),sl=gadSlot(it);if(it.tog){sl.use();sheetBelt();}else{closeSheet();sl.use();}beltRender(true);});}
function beltRender(force){const b=$("belt");if(!b||!FP.on)return;const L=beltItems();if(beltI>=L.length)beltI=0;const sig=L.map(i=>i.id+(i.on==null?"":i.on?1:0)).join("|")+"#"+beltI+(PAD.on?1:0);
  if(!force&&sig===beltSig)return;beltSig=sig;beltL=L;b.hidden=!L.length;
  b.innerHTML=L.map((it,i)=>'<button class="bslot'+(it.on===true?" on":it.on===false?" off":"")+(PAD.on&&i===beltI?" sel":"")+'" data-bi="'+i+'" aria-label="'+esc(it.n)+'"><img alt="" src="'+it.ic+'">'+(it.key&&!fpTouch()?'<kbd>'+it.key+'</kbd>':'')+'</button>').join("");
  b.querySelectorAll("[data-bi]").forEach(el=>{el.onpointerdown=e=>e.stopPropagation();el.onclick=e=>{e.stopPropagation();beltI=+el.dataset.bi;beltUse();};});}
function beltTip(i,t){const el=$("beltTip"),s=$("belt").children[i];if(!el||!s)return;const r=s.getBoundingClientRect();el.textContent=t;el.hidden=false;el.style.top=(r.top+r.height/2)+"px";el.style.left=(r.right+10)+"px";
  el.style.animation="none";void el.offsetWidth;el.style.animation="";clearTimeout(beltTipT);beltTipT=setTimeout(()=>el.hidden=true,1700);}
function beltUse(){if(!FP.on||!$("veil").hidden||window.RWON)return;const it=beltL[beltI];if(!it)return;sfx.click();const t=it.use();beltRender(true);const s=$("belt").children[beltI];if(s){s.classList.remove("pop");void s.offsetWidth;s.classList.add("pop");}if(t)beltTip(beltI,t);}
function beltSel(d){const n=beltL.length;if(!n||!$("veil").hidden)return;beltI=(beltI+d+n)%n;beltRender(true);beltTip(beltI,beltL[beltI].n);tone(660,.03,"triangle",.015);}

/* ---------- init and per-frame ---------- */
{const _ai=animalsInit;animalsInit=function(){_ai.apply(this,arguments);S.perks=S.perks||{};S.tips=S.tips||{};if(S.lvSeen==null)S.lvSeen=1;applyPerks();
  const ui=$("fpUI");if(ui&&!$("belt"))ui.insertAdjacentHTML("beforeend",'<div class="belt pe" id="belt" aria-label="Čarobni pojas" hidden></div><div class="belttip" id="beltTip" hidden></div>');
  const ex=$("fpExit");if(ex&&!$("fpHelp")){ex.insertAdjacentHTML("beforebegin",'<button class="fpico" id="fpHelp" aria-label="Kako se igra?"><b>?</b></button>');$("fpHelp").onclick=()=>{sfx.click();sheetHow();};}
  const who=document.querySelector(".hud-top .who");if(who&&!who.dataset.lv){who.dataset.lv=1;who.classList.add("pe","lvtap");who.setAttribute("role","button");who.setAttribute("tabindex","0");who.setAttribute("aria-label","Put razina");who.onclick=()=>{sfx.click();sheetLevels();};}
  renderHUD();};}
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);const b=$("mmShop");if(b)b.insertAdjacentHTML("afterend",'<div class="row" style="gap:8px;justify-content:center"><button class="btn soft" id="mmHow">Kako se igra?</button><button class="btn soft" id="mmLv">Put razina</button></div>');
  if($("mmHow")){$("mmHow").onclick=()=>{sfx.click();sheetHow();};$("mmLv").onclick=()=>{sfx.click();sheetLevels();};}};}
{const _ph=padHelp;padHelp=function(){_ph.apply(this,arguments);const b=$("padOk");if(b){b.insertAdjacentHTML("afterend",'<button class="btn soft" id="padHow">Kako se igra?</button>');$("padHow").onclick=()=>{sfx.click();sheetHow();};}};}
{const _ts=tickSquirrel;tickSquirrel=function(dt){if(FP.on&&FP.hook)hookPre(Math.min(dt,.05));_ts.apply(this,arguments);if(!FP.on)return;if(FP.hook){FP.v.set(0,0,0);hookRope();}else trampBounce();};}
{const _es=endSquirrel;endSquirrel=function(){if(FP.hook)hookEnd(false);_es.apply(this,arguments);};}
{const _ss=startSquirrel;startSquirrel=function(){const first=!S.foxSeen;_ss.apply(this,arguments);if(!FP.on)return;beltSig="";beltRender(true);
  setTimeout(()=>{if(FP.on&&beltL.length)void 0;},first?26000:2500);};}
let moreT=0;
function tickMore(dt){if(!S.mg)return;trampTick(dt);snowTick(dt);flowTick(dt);moreT+=dt;
  if(moreT>.5){moreT=0;lvT++;if(lvT%2===0)lvWatch();if(FP.on){beltRender();
    if(FP.swim&&!FP.boat){if(S.gear&&S.gear.maska)tipOnce("swimM","Ronilačka maska je na Ridi! Drži Roni (C) i istražuj podmorje cijelih 45 sekundi.");else tipOnce("swim","Rida pliva! Drži Roni (tipka C ili gumb Roni) za ronjenje. Zraka ima 9 sekundi, a s Ronilačkom maskom iz Radionice čak 45!",6500);}
    if(FP.under&&FP.breath<3.5&&!(S.gear&&S.gear.maska))tipOnce("air","Zrak je pri kraju! Pritisni Skok i Rida izroni. Ronilačka maska daje puno više zraka.");}}}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);tickMore(dt,tt);};}
addEventListener("keydown",e=>{if(!FP.on||e.repeat||!S.mg)return;if(e.target&&e.target.closest&&e.target.closest("input,textarea"))return;if(!$("veil").hidden||window.RWON)return;const k=e.key.toLowerCase();
  if(k==="z"&&mgOwn(mgIt("gad:kuka")))mgHook();else if(k==="x"&&mgOwn(mgIt("gad:grudve")))mgSnow();else if(k==="?"||k==="f1"){e.preventDefault();sheetHow();}});

/* ---------- icons ---------- */
(function(){const D=ITEM_DRAW;
  D.mg_gad_kuka=(x,P,hi,ol)=>{x.lineWidth=4;x.strokeStyle="#b07a3a";x.beginPath();x.moveTo(10,58);x.bezierCurveTo(20,40,8,30,26,26);x.stroke();
    P([[26,22],[34,22],[34,34],[26,34]],"#8a96a8");P([[30,8],[34,8],[34,24],[30,24]],"#a8b4c4");P([[34,10],[48,4],[52,10],[38,16]],"#a8b4c4");P([[30,10],[16,4],[12,10],[26,16]],"#a8b4c4");hi(33,11,2);};
  D.mg_gad_trampolin=(x,P,hi,ol)=>{P([[10,44],[14,44],[14,58],[10,58]],"#16243a");P([[50,44],[54,44],[54,58],[50,58]],"#16243a");P([[4,36],[60,36],[60,46],[4,46]],"#ffc53d");P([[10,34],[54,34],[54,40],[10,40]],"#4aa8ff");
    x.save();x.translate(18,-6);x.scale(.45,.45);mgShape(x,"star","#ffd23d","#16243a");x.restore();};
  D.mg_gad_grudve=(x,P,hi,ol)=>{P([[12,24],[52,24],[56,60],[8,60]],"#c8a070");P([[16,18],[48,18],[52,26],[12,26]],"#a87a48");[[24,14,9],[40,12,8],[33,4,6]].forEach(a=>{x.beginPath();x.arc(a[0],a[1]+6,a[2],0,7);x.fillStyle="#f4f8ff";x.fill();x.lineWidth=3;x.strokeStyle=ol;x.stroke();});hi(22,18,3);};
  D.mg_gad_konfeti=(x,P,hi,ol)=>{P([[8,52],[30,30],[40,40],[18,62]],"#ff5a8a");P([[8,52],[18,62],[14,64],[4,56]],"#ffc53d");
    [["#4aa8ff",38,14],["#5ac83a",50,24],["#ffc53d",30,8],["#b46cff",54,40],["#ff8a3d",44,4]].forEach(a=>{x.fillStyle=a[0];x.save();x.translate(a[1],a[2]);x.rotate(a[1]);x.fillRect(-4,-3,8,6);x.strokeStyle=ol;x.lineWidth=2;x.strokeRect(-4,-3,8,6);x.restore();});};
  D.mg_gad_stapic=(x,P,hi,ol)=>{P([[10,58],[38,24],[44,30],[16,62]],"#7a52c7");P([[10,58],[16,62],[12,64],[6,60]],"#ffc53d");x.save();x.translate(14,-14);x.scale(.62,.62);mgShape(x,"star","#ffd23d","#16243a");x.restore();
    x.fillStyle="#ff9ad0";x.beginPath();x.arc(52,46,4,0,7);x.fill();x.fillStyle="#6ad0ff";x.beginPath();x.arc(46,56,3,0,7);x.fill();};
  D.mg_belt_more=(x,P,hi,ol)=>{P([[12,22],[52,22],[56,58],[8,58]],"#a87ef0");P([[18,12],[46,12],[52,22],[12,22]],"#7048c0");[20,32,44].forEach(c=>{x.beginPath();x.arc(c,40,5,0,7);x.fillStyle="#ffd23d";x.fill();x.lineWidth=3;x.strokeStyle=ol;x.stroke();});};
  D.mg_perk_dah=(x,P,hi,ol)=>{[[20,44,12],[40,28,9],[30,12,6],[48,50,5]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fillStyle="#8ad6ff";x.fill();x.lineWidth=3;x.strokeStyle=ol;x.stroke();hi(a[0]-a[2]*.35,a[1]-a[2]*.35,a[2]*.3);});};
  D.mg_perk_plivanje=(x,P,hi,ol)=>{x.lineWidth=5;x.lineCap="round";[["#4aa8ff",28],["#8ad6ff",42]].forEach(a=>{x.strokeStyle=ol;x.lineWidth=9;x.beginPath();for(let i=0;i<=48;i+=2)x.lineTo(8+i,a[1]+Math.sin(i/6)*5);x.stroke();x.strokeStyle=a[0];x.lineWidth=5;x.stroke();});
    P([[40,8],[52,16],[40,22]],"#ffc53d");};
  D.mg_perk_kramp=(x,P,hi,ol)=>{x.fillStyle="#e8772e";x.strokeStyle=ol;x.lineWidth=3;[[32,42,13],[16,26,6],[27,17,6],[38,17,6],[49,26,6]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill();x.stroke();});
    x.save();x.translate(30,22);x.scale(.5,.5);mgShape(x,"star","#ffd23d","#16243a");x.restore();};
  D.mg_perk_brzina=(x,P,hi,ol)=>{P([[18,22],[38,22],[40,40],[56,46],[56,56],[16,56]],"#ff5a8a");P([[16,50],[56,50],[56,56],[16,56]],"#fffdf7");x.strokeStyle=ol;x.lineWidth=4;[[2,30,12],[0,40,10],[4,50,8]].forEach(a=>{x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(a[0]+a[2],a[1]);x.stroke();});};
  D.mg_perk_sreca=(x,P,hi,ol)=>{[[22,22],[42,22],[22,42],[42,42]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],11,0,7);x.fillStyle="#5ac83a";x.fill();x.lineWidth=3;x.strokeStyle=ol;x.stroke();});x.beginPath();x.arc(32,32,7,0,7);x.fillStyle="#3f9a2e";x.fill();
    x.strokeStyle=ol;x.lineWidth=4;x.beginPath();x.moveTo(36,40);x.quadraticCurveTo(44,54,40,62);x.stroke();x.save();x.translate(30,-6);x.scale(.4,.4);mgShape(x,"star","#ffd23d","#16243a");x.restore();};})();
