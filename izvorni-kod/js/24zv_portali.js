/* =================== OP2 v4: four portal worlds behind every district =================== */
/* Every district gets a "Trg portala": a round paved square with four portal arches, one per world.
   The worlds themselves live in their own files and register through pwWorld(). This file also holds the
   shared world kit: cages that open, dig spots, cannons, ring courses, sequence pads, fetch quests and
   world pets that later wait on the main island next to the bridge of their district. */
const PWD={},PWL={luka:[],dolina:[],gora:[]};
function pwReg(id,o){if(PWD[id])Object.assign(PWD[id],o);else{PWD[id]=o;PWL[o.dist].push(id);}const C=PWD[id];
  Object.defineProperty(WORLDS,id,{value:{n:C.n,d:C.d,lv:C.lv,soon:C.soon?1:0,dist:C.dist},enumerable:false,configurable:true,writable:true});}
[["gusari","luka",5,"Gusarska uvala","Tropski otočići, gusarsko selo s krčmom, brod Crni galeb, olupina, laguna s koraljima i topovi koji te ispaljuju preko mora!",["tdaske","sdaske","zlato"],0xffc53d,0xd8501e],
 ["svjetionik","luka",6,"Otok svjetionika","Stjenoviti otok u sumrak: visoki svjetionik koji se ugasio, tuljani na stijenama i plimne lokve pune rakova.",["bijela","crvena","svjetlo"],0xfff2c0,0xd83a3a],
 ["kanali","luka",7,"Grad na kanalima","Šareni grad na vodi: gondole, stotinu mostića, karneval s maskama i trgovi puni golubova.",["kvarc","prizcigla","lampion"],0x8ad8ff,0x3a6ad8],
 ["zaljev","luka",8,"Svjetleći zaljev","Noćna plaža na kojoj more svijetli plavim sjajem, kornjačice se legu, a krijesnice plešu nad dinama.",["prizmarin","prizcigla","kristal"],0x7affe8,0x1a4ab8],
 ["vrt","dolina",8,"Divovski vrt","Rida je malena kao bubamara! Vlati trave visoke kao stabla, kapi rose kao lopte, košnica i puževa kućica.",["stapka","lisce","tresnja"],0xb8ff7a,0x3aa83a],
 ["vila","dolina",9,"Vilinska šuma","Šuma u vječnom sumraku: svjetleće gljive, vilinske kućice u deblima, jednorog i krugovi od cvijeća.",["micelij","gljiva","ametist"],0xe0a0ff,0x5a2ab8],
 ["slatko","dolina",10,"Slatkišna zemlja","Rijeka od čokolade, lizalice umjesto drveća, kućice od medenjaka i oblaci od šećerne vune.",["vuna_r","bijela","vuna_c"],0xffb0e0,0xff5aa8],
 ["zetva","dolina",11,"Jesenska žetva","Zlatna dolina u jesen: labirint u kukuruzu, vjetrenjača, bundeve velike kao kuće i voćnjak pun jabuka.",["sijeno","bundeva","lampion"],0xffd070,0xd86a1a],
 ["kristal","gora",11,"Kristalne dubine","Ispod planine: špilje pune kristala, podzemno jezero, rudnička kolica i crvići koji svijetle u mraku.",["ametist","kristal","svjetlo"],0xc8a0ff,0x3a2a9a],
 ["zmajevi","gora",12,"Zmajevi vrhovi","Planine koje lebde u oblacima, viseći mostovi, slapovi i gnijezda malih zmajeva.",["crvena","zlato","lampion"],0xffa060,0xb8201a],
 ["kanjon","gora",13,"Pustinjski kanjon","Crveni kanjon, oaza s palmama, stari hram u stijeni i dine po kojima se kliže.",["pjescenjak","upjescenjak","zlato"],0xffe0a0,0xd8803a],
 ["mjesec","gora",14,"Mjesečeva postaja","Raketom na Mjesec! Ovdje skačeš visoko kao nikad. Krateri, svemirska postaja i Zemlja na nebu.",["kvarc","bijela","svjetlo"],0xe8f0ff,0x4a5ab8]
].forEach(([id,dist,lv,n,d,fr,ca,cb])=>pwReg(id,{dist,lv,n,d,fr,ca,cb,soon:1}));

/* ---------- the square with four portals in each district ---------- */
const PWH={hub:null,portals:[]};
function pwHubSpot(k){const D=DST[k];
  for(let pass=0;pass<3;pass++){const cand=[];for(let r=34;r<=48;r+=2)for(let deg=0;deg<360;deg+=5){const rel=((deg+540)%360)-180;if(Math.abs(rel)<20)continue;if(k==="luka"&&Math.abs(rel-90)<24)continue;
      const a=D.b+deg*DRAD,x=Math.floor(128.5+Math.cos(a)*r),z=Math.floor(128.5+Math.sin(a)*r);
      if(D.plots.some(p=>Math.hypot(p.x-x,p.z-z)<(pass>1?14:17)))continue;
      if(pass<2&&WG.stars.some(s=>Math.hypot(s.x-x,s.z-z)<13))continue;
      if(pass<1&&CHESTS.some(c=>Math.hypot(c.x-x,c.z-z)<13))continue;
      if(D.hill&&Math.hypot(D.hill.x-x,D.hill.z-z)<D.hill.r+12)continue;
      if(D.pond&&Math.hypot(D.pond.x-x,D.pond.z-z)<D.pond.r+12)continue;
      let bad=0,sc=0;for(let dz=-12;dz<=12;dz++)for(let dx=-12;dx<=12;dx++){if(dx*dx+dz*dz>144)continue;const h=hmap[(x+dx)+(z+dz)*W];if(h<SL+4)bad++;sc+=Math.abs(h-(SL+6));}
      if(bad)continue;cand.push({x,z,sc:sc+r*4});}
    if(cand.length){cand.sort((a,b)=>a.sc-b.sc);return cand[0];}}
  return {x:Math.floor(128.5+Math.cos(D.b+DRAD*60)*38),z:Math.floor(128.5+Math.sin(D.b+DRAD*60)*38)};}
const PWDIR=[[1,0],[0,1],[-1,0],[0,-1]];
function pwHub(k){const sp=pwHubSpot(k),cx=sp.x,cz=sp.z,Y=SL+6,D=DST[k];
  const trunk=new Set([T.drvo,T[D.trunk],T.breza_d,T.smreka_d].filter(Boolean));
  for(let dz=-15;dz<=15;dz++)for(let dx=-15;dx<=15;dx++){const d=Math.hypot(dx,dz);if(d>15.2)continue;const x=cx+dx,z=cz+dz;
    if(d>12.2){for(let y=hmap[x+z*W];y<H;y++){const i=I(x,y,z),t=vox[i];if(t&&!prot[i]&&(TYPES[t].leaf||trunk.has(t)))vox[i]=0;}continue;}
    const q=d<10?1:sstep(12.2,10,d),h=Math.round(hmap[x+z*W]*(1-q)+Y*q);
    for(let y=1;y<H;y++){const i=I(x,y,z);if(prot[i])continue;if(y<h-4)vox[i]=vox[i]||T.kamen;else if(y<h-1)vox[i]=T.zemlja;else if(y===h-1)vox[i]=T.trava;else vox[i]=0;}
    hmap[x+z*W]=h;if(d<=11.4)mask[x+z*W]=2;
    if(d<=10.6){const path=Math.abs(dx)<=1||Math.abs(dz)<=1;wput(x,Y-1,z,d<2.6?T.kvarc:d>9.9?T.kcigla:path?T.kaldrma:((dx+dz)&1?T.kamen:T.kaldrma),1);}}
  /* centre stone with a glowing crystal, four lamps on the diagonals */
  for(let h=0;h<3;h++)wput(cx,Y+h,cz,T.kvarc,1);wput(cx,Y+3,cz,T.ametist,1);
  for(const [a,b] of [[6,6],[-6,6],[6,-6],[-6,-6]]){wput(cx+a,Y,cz+b,T.tdaske,1);wput(cx+a,Y+1,cz+b,T.tdaske,1);wput(cx+a,Y+2,cz+b,T.lampion,1);}
  const arches=[];PWL[k].forEach((id,i)=>{const [ux,uz]=PWDIR[i],C=PWD[id],ax=cx+ux*8,az=cz+uz*8,fr=C.fr.map(n=>T[n]||T.kvarc);
    for(let o=-2;o<=2;o++){const x=ax-uz*o,z=az+ux*o;wput(x,Y-1,z,T.kcigla,1);if(Math.abs(o)===2)for(let h=0;h<5;h++)wput(x,Y+h,z,fr[0],1);else for(let h=0;h<5;h++){const i2=I(x,Y+h,z);vox[i2]=0;}wput(x,Y+5,z,fr[1],1);}
    wput(ax,Y+6,az,fr[2],1);wput(ax-uz*2,Y+6,az+ux*2,fr[1],1);wput(ax+uz*2,Y+6,az-ux*2,fr[1],1);
    arches.push({id,x:ax+.5,z:az+.5,y:Y,ux,uz,ry:Math.atan2(-ux,-uz)});});
  PWH.hub={k,x:cx+.5,z:cz+.5,y:Y,arches};POI.push({k:"pw_"+k,n:"Trg portala",x:cx+.5,z:cz+.5,r:12});
  const at=S.distAt;if(at&&at.to===k&&at.pw){const A=arches.find(a=>a.id===at.pw);if(A)WG.spawn={x:A.x-A.ux*3,z:A.z-A.uz*3,y:Y,cam:Math.atan2(A.ux,A.uz)};}}
function pwLabel(t1,t2,col){const c=document.createElement("canvas");c.width=512;c.height=170;const x=c.getContext("2d");
  x.fillStyle="rgba(22,36,58,.78)";const r=34;x.beginPath();x.moveTo(r,8);x.arcTo(504,8,504,162,r);x.arcTo(504,162,8,162,r);x.arcTo(8,162,8,8,r);x.arcTo(8,8,504,8,r);x.closePath();x.fill();
  x.lineWidth=6;x.strokeStyle="#"+new THREE.Color(col).getHexString();x.stroke();x.textAlign="center";x.fillStyle="#fff";x.font='800 58px "Baloo 2", system-ui, sans-serif';x.fillText(t1,256,80);
  x.font='700 40px "Baloo 2", system-ui, sans-serif';x.fillStyle="#ffe7a0";x.fillText(t2,256,136);
  const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tx,transparent:true,depthWrite:false,fog:false}));sp.scale.set(4.5,1.5,1);sp.renderOrder=6;return sp;}
function pwStatus(id){const w=WORLDS[id];if(w.soon)return "Uskoro!";if(level()<w.lv)return "Razina "+w.lv;const n=wStars(id);return n>=WSTAR_N?"Sve pronađeno ✓":(WDEF[id]&&WDEF[id].item?WDEF[id].item.hud:"Blago")+" "+n+" / "+WSTAR_N;}
function pwHubLife(){const H0=PWH.hub;if(!H0)return;for(const A of H0.arches){const C=PWD[A.id],w=WORLDS[A.id],on=!w.soon&&level()>=w.lv;
    const p=portalMesh(A.x,A.y-.3,A.z,A.ry,false);const U=p.g.children[0].material.uniforms;U.uA.value.set(on?C.ca:0xb8bcc8);U.uB.value.set(on?C.cb:0x5a6070);p.g.children[1].material.color.set(on?C.ca:0x9aa0b0);p.g.children[1].material.opacity=on?.6:.25;
    p.id=A.id;PWH.portals.push(p);const lb=pwLabel(w.n,pwStatus(A.id),on?C.ca:0x9aa0b0);lb.position.set(A.x,A.y+7.6,A.z);scene.add(lb);A.lb=lb;}}
function pwSheet(id){const w=WORLDS[id],C=PWD[id],lv=level(),open=!w.soon&&lv>=w.lv,n=wStars(id),WD=WDEF[id];sfx.chime();
  const ic=ITEM_DRAW["w_"+id]?wIcon(id):wIcon("portal");
  openSheet('<h2>'+esc(w.n)+'</h2><div class="anh"><img alt="" src="'+ic+'"><div><p>'+esc(w.d)+'</p>'+(C.feat?'<p class="muted">'+C.feat.map(esc).join(' · ')+'</p>':'')+'</div></div>'+
    (w.soon?'<p class="wst">Ovaj svijet još gradimo. Uskoro se otvara!</p>':open?'<p class="muted">'+esc(WD.item.hud)+': <b>'+n+' / '+WSTAR_N+'</b>'+(n>=WSTAR_N?' ✓':'')+'</p><button class="btn big purple" id="pwGo">Putuj!</button>':
      '<p class="wst">Otključava se na razini '+w.lv+'. Sada si na razini '+lv+'.</p>')+'<button class="btn soft" id="pwNo">Zatvori</button>');
  if($("pwGo"))$("pwGo").onclick=()=>pwEnter(id);$("pwNo").onclick=()=>{sfx.click();closeSheet();};}
function pwEnter(id){const w=WORLDS[id];if(!w||w.soon||!HERE||level()<w.lv)return;closeSheet();S.wed=S.wed||{};S.wed[HERE]=S.edits;S.edits=S.wed[id]||{};S.wed[id]=S.edits;
  S.world=id;S.worldBack=null;S.distAt=null;save();warpGo(false,()=>location.reload());}
for(const k of DSK){const W0=WDEF[k];const g0=W0.gen,l0=W0.life;W0.gen=function(){g0.apply(this,arguments);try{pwHub(k);}catch(e){console.warn("trg portala",e);}};
  W0.life=function(){l0.apply(this,arguments);try{pwHubLife();}catch(e){console.warn("trg portala",e);}};}
{const _lw=leaveWorld;leaveWorld=function(){const w=WORLD&&WORLDS[WORLD];if(!w||!w.dist)return _lw.apply(this,arguments);closeSheet();const k=w.dist;
  S.wed[WORLD]=S.edits;S.edits=S.wed[k]||{};S.wed[k]=S.edits;S.distAt={to:k,pw:WORLD,x:128.5,z:128.5,yaw:0};S.world=k;S.worldBack=null;save();warpGo(true,()=>location.reload());};}
{const _sh=sheetHome;sheetHome=function(){const w=WORLD&&WORLDS[WORLD];if(!w||!w.dist)return _sh.apply(this,arguments);const n=wStars(WORLD),WD=WDEF[WORLD];
  openSheet('<div class="anh"><img alt="" src="'+wIcon("portal_home")+'"><div><h2>Natrag u '+esc(DST[w.dist].n)+'?</h2><p class="muted">'+esc(WD.item.hud)+': <b>'+n+' / '+WSTAR_N+'</b>. Sve što si skupila ostaje tvoje, a ovamo se vraćaš kroz portal na Trgu portala.</p></div></div>'+
    '<button class="btn big" id="whGo">Vrati me u '+esc(DST[w.dist].n)+'</button><button class="btn soft" id="whStay">Ostajem još malo</button>');
  $("whGo").onclick=()=>leaveWorld();$("whStay").onclick=()=>{sfx.click();closeSheet();};};}
{const _km=kpMarks;kpMarks=function(){const o=_km.apply(this,arguments);try{const H0=PWH.hub;if(HERE&&H0&&FP.on)o.push({x:H0.x,z:H0.z,k:"dom",n:"Trg portala",d:Math.hypot(H0.x-FP.p.x,H0.z-FP.p.z)});}catch(e){}return o;};}

/* ---------- the world kit ---------- */
const PW={guide:null,cages:{},digs:[],launch:[],fly:null,rings:[],seqs:[],q:{},pick:[],fx:[],chip:null};
const pwKey=k=>"pw_"+WORLD+"_"+k;
function pwDone(k){return !!(S.wq&&S.wq[pwKey(k)]);}
function pwSetDone(k){S.wq=S.wq||{};S.wq[pwKey(k)]=today();save();}
function pwCage(k,cells){(PW.cages[k]=PW.cages[k]||[]).push(...cells);}
function pwCell(k,x,y,z,t){wput(x,y,z,t,1);pwCage(k,[[x,y,z]]);}
function pwOpen(k,quiet){if(pwDone(k))return;pwSetDone(k);for(const [x,y,z] of (PW.cages[k]||[])){prot[I(x,y,z)]=0;setV(x,y,z,0);burst(x+.5,y+.5,z+.5,8,[[1,.95,.6],[1,1,1]],1.6,1.6,.7);}
  if(!quiet){sfx.fanfare();if(typeof padRumble==="function"&&PAD.on)padRumble(200,.6,.5);}}
function pwPut(kind,name,x,z,o){o=o||{speed:1};const e=spawn(kind,name,o);e.x=x;e.z=z;e.y=o.swim?WATER-.2:(walkable(e.x,e.z,false)||wTopAt(Math.floor(x),Math.floor(z),o.y)+1);if(o.y!=null)e.y=wTopAt(Math.floor(x),Math.floor(z),o.y)+1;e.home={x,z};
  if(o.frozen)e.frozen=true;if(o.ry!=null)e.g.rotation.y=o.ry;if(o.sc)e.g.scale.setScalar(o.sc);return e;}
function pwDig(k,x,y,z,msg){PW.digs.push({k,x,y,z,msg,t:0});}
function pwLaunch(o){PW.launch.push(Object.assign({cool:0},o));}
function pwRings(k,o){PW.rings.push(Object.assign({k,st:0,i:0,t:0,m:[]},o));}
function pwSeq(k,o){PW.seqs.push(Object.assign({k,i:0,last:-1},o));}
function pwQuest(k,o){PW.q[k]=o;}
const pwQK=k=>PW.q[k].pet?k:"pwq_"+WORLD+"_"+k;
const pwQS=k=>S.wq&&S.wq[pwQK(k)];
const pwQDone=k=>{const o=PW.q[k];return o.pet?!!S.met[k]:!!(pwQS(k)&&pwQS(k).done);};
function pwReset(){vox.fill(0);prot.fill(0);hmap.fill(0);mask.fill(0);biome.fill(0);POI.length=0;CHESTS.length=0;FALLS.clear();WG.stars.length=0;WG.wind.length=0;WG.gate.length=0;WG.isl={};WG.fall=null;
  Object.assign(PW,{guide:null,cages:{},digs:[],launch:[],fly:null,rings:[],seqs:[],q:{},pick:[],fx:[]});}
function pwPostGen(){for(const L of PW.launch)if(!L.to[1]){const x=Math.floor(L.to[0]),z=Math.floor(L.to[2]);L.to[1]=floorY(x+.5,H-1,z+.5)+1;}for(const k in PW.cages)if(pwDone(k))for(const [x,y,z] of PW.cages[k]){vox[I(x,y,z)]=0;prot[I(x,y,z)]=0;}}

/* pickups for fetch quests: a small model with a soft glow */
const PWIT={
  banana:{n:"Banana",mk:g=>{const m=std(0xffd23a,{emissive:LC(0x806000),emissiveIntensity:.25});[[0,0,-.1,.4],[0,.08,0,0],[0,.18,.1,-.4]].forEach(([x,y,z,r])=>{const o=new THREE.Mesh(new THREE.BoxGeometry(.12,.1,.16),m);o.position.set(x,y,z);o.rotation.x=r;g.add(o);});},glow:0xffe080},
  skoljka:{n:"Školjka",mk:g=>{const m=std(0xffc0d0,{emissive:LC(0x804050),emissiveIntensity:.25});for(let i=-2;i<=2;i++){const o=new THREE.Mesh(new THREE.BoxGeometry(.07,.3-Math.abs(i)*.05,.06),m);o.position.set(i*.07,0,0);o.rotation.z=-i*.25;g.add(o);}const b=new THREE.Mesh(new THREE.BoxGeometry(.14,.07,.07),std(0xf0e0d0));b.position.y=-.14;g.add(b);},glow:0xffb0d0},
  gem:{n:"Dragulj",mk:(g,c)=>{const o=new THREE.Mesh(new THREE.OctahedronGeometry(.2,0),new THREE.MeshStandardMaterial({color:LC(c||0x7ae8ff),emissive:LC(c||0x7ae8ff),emissiveIntensity:.6,roughness:.2,metalness:.2,flatShading:true}));o.scale.y=1.3;g.add(o);},glow:0x9ae8ff},
  box:{n:"Paket",mk:(g,c)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(.34,.34,.34),std(c||0xc89060));g.add(o);const r=new THREE.Mesh(new THREE.BoxGeometry(.36,.08,.36),std(0xd8303a));g.add(r);},glow:0xffe0a0}};
function pwItemMesh(kind,col){const D=PWIT[kind]||PWIT.gem,g=new THREE.Group();D.mk(g,col);g.traverse(o=>{if(o.isMesh)o.castShadow=true;});
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:D.glow,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7}));sp.scale.set(1.5,1.5,1);g.add(sp);return g;}
function pwPickBuild(){S.wq=S.wq||{};PW.pick.length=0;for(const k in PW.q){const o=PW.q[k];if(pwQDone(k))continue;const q=pwQS(k)||{};
    o.spots.forEach((p,i)=>{const g=pwItemMesh(o.item,o.col);g.position.set(p[0],p[1],p[2]);const got=i<(q.n||0);g.visible=!!q.on&&!got;scene.add(g);PW.pick.push({k,x:p[0],y:p[1],z:p[2],g,got,i});});}}
function pwQStart(k){const o=PW.q[k];S.wq=S.wq||{};const K=pwQK(k);if(!S.wq[K])S.wq[K]={on:1,n:0};else S.wq[K].on=1;S.wq[K].seen=1;save();if(o.en)say(o.en,o.ask,9500);sfx.chime();
  for(const p of PW.pick)if(p.k===k&&!p.got){p.g.visible=true;burst(p.x,p.y,p.z,18,[[1,.9,.5],[.6,1,.9]],1.6,2,.8);}
  toast((o.gotN||o.got)+": "+(S.wq[K].n||0)+" / "+o.need+". Svjetlucaju, pa ih lako vidiš!",4200);}
function pwQStep(k){const o=PW.q[k],q=S.wq[pwQK(k)];q.n=(q.n||0)+1;save();if(q.n>=o.need){pwQFinish(k);return;}toast(o.got+" "+q.n+" / "+o.need+"!",2600);tone(880,.1,"triangle",.03);tone(1175,.12,"triangle",.03,.08);}
function pwQFinish(k){const o=PW.q[k],q=S.wq[pwQK(k)];q.on=0;q.done=1;save();const en=o.en;
  if(en){say(en,o.done,7000);en.celebrate=1.4;for(let i=0;i<14;i++)mgSpawn({t:"heart",x:en.x,y:en.y+1.4,z:en.z,vx:(Math.random()-.5)*2,vy:1.5+Math.random()*2,vz:(Math.random()-.5)*2,life:1.4,size:.35,size2:.1,col:[0xff6a8a,0xff9ab0],grav:1});}
  if(o.pet){pwBefriend(k);return;}sfx.fanfare();if(o.cage)setTimeout(()=>pwOpen(o.cage),900);if(o.after)o.after();fpUI();}
function pwBefriend(k){const P=PETS[k];S.met[k]=today();const I2=petInfo(k);I2.h=Math.max(I2.h,2);save();const en=petEnt(k);if(en)en.frozen=false;sfx.fanfare();fpUI();const o=PW.q[k];
  setTimeout(()=>rewardReveal({kicker:"Novi prijatelj!",title:P.n,portrait:portrait(k),items:[{ic:thingIcon(P.fav),n:"Voli: "+thingName(P.fav),cnt:0,rar:"r"},{ic:itemIcon("star"),n:SPEC[k].n,cnt:0,rar:"l"}],
    sub:P.d+" Dodirni ga i jaši! Čekat će te i na glavnom otoku, kraj mosta za "+DST[P.pw].n+".",ok:"Jupi!",onDone:()=>{if(o&&o.fact)setTimeout(()=>jgFact(o.fact,P.n),600);}}),1600);}

/* pets that come from a portal world: registered by the world, they wait on the main island by the bridge */
const PWPETS=[];
function pwPets(world,dist,list){for(const p of list){const k=p.k;PETS[k]={fav:p.fav,src:"world",world,pw:dist,n:p.n,d:p.d,gd:p.gd,gift:p.gift,spd:p.spd};SPEC[k]=p.spec;if(p.ride)RIDES[k]=p.ride;NEWPETS.push(k);PWPETS.push(k);if(p.tip)PW_TIPS[k]=p.tip;}}
const PW_TIPS={};
{const _snp=spawnNewPet;spawnNewPet=function(k){const P=PETS[k];if(!P||!P.pw)return _snp.apply(this,arguments);let e=petEnt(k);if(e)return e;if(WORLD)return null;
  const D=DST[P.pw],r=(D.r0||52)-9,same=PWPETS.filter(q=>PETS[q].pw===P.pw),i=same.indexOf(k);const a=D.a+(i-same.length/2)*.07;
  e=spawn(k,P.n,{speed:P.spd||1.2,near:{x:128.5+Math.cos(a)*r,z:128.5+Math.sin(a)*r}});return e;};}
{const _mu=mountUp;mountUp=function(k){_mu.apply(this,arguments);if(!PW_TIPS[k]||!FP.mount||FP.mount.k!==k)return;toast(PW_TIPS[k]+" Za silazak: gumb Siđi"+(PAD.on?" ili Y":"")+".",4600);};}

/* register a full world */
function pwWorld(id,C){pwReg(id,Object.assign({soon:0,kit:1},C));
  WDEF[id]={gen:()=>{pwReset();C.gen();pwPostGen();},
    env:()=>{if(C.sea){water.visible=true;water.position.y=WATER;}if(life.boat)life.boat.visible=false;if(C.env)C.env();pwEnvBuild();},
    life:()=>{C.life();pwPickBuild();},preset:id,fog:C.fog||.0034,floor:C.floor==null?null:C.floor,noClouds:C.noClouds||0,guide:()=>PW.guide,talk:()=>C.talk(),
    tick:(dt,tt)=>{pwTick(dt,tt);if(C.tick)C.tick(dt,tt);},itemMesh:C.itemMesh,itemCol:C.itemCol,itemBurst:C.itemBurst,itemFx:C.itemFx||"spark",item:C.item,intro:C.intro,after:C.after,finale:C.finale};
  if(C.preset)PRESETS[id]=C.preset;}
{const _wa=waterAt;waterAt=function(x,y,z){const C=WORLD&&PWD[WORLD];if(C&&C.sea){const t=get(Math.floor(x),Math.floor(y),Math.floor(z));if(t)return !!TYPES[t].water;return y<WATER&&y>=0;}return _wa.apply(this,arguments);};}
{const _sg=starGet;starGet=function(s){_sg.apply(this,arguments);const C=WORLD&&PWD[WORLD];if(C&&C.facts&&C.facts[s.k])setTimeout(()=>jgFact(C.facts[s.k]),3600);};}
{const _at=animalTap;animalTap=function(en,explore){const C=WORLD&&PWD[WORLD];if(!C||!C.kit)return _at.apply(this,arguments);
  if(en===PW.guide){C.talk();return true;}
  for(const k in PW.q){const o=PW.q[k];if(o.en!==en)continue;if(pwQDone(k)){if(o.pet)break;say(en,o.thanks||o.done,5200);return true;}
    const q=pwQS(k);if(q&&q.on)say(en,o.got+": "+(q.n||0)+" / "+o.need+". "+(o.remind||"Hvala što mi pomažeš!"),4600);else pwQStart(k);return true;}
  const L=C.chat&&(C.chat[en.name]||C.chat[en.kind]);if(L){const t=typeof L==="function"?L(en):L[Math.floor(Math.random()*L.length)];if(t){say(en,t,5600);en.celebrate=.4;return true;}}
  return _at.apply(this,arguments);};}

/* meshes for the kit parts */
function pwCannonMesh(x,y,z,yaw,pitch){const g=new THREE.Group(),M=std(0x2a2e36,{roughness:.4,metalness:.6}),Wd=std(0x7a5233);
  const car=new THREE.Mesh(new THREE.BoxGeometry(.9,.35,1.3),Wd);car.position.y=.3;g.add(car);for(const sx of [-.5,.5])for(const sz of [-.4,.4]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.12,10).rotateZ(Math.PI/2),Wd);w.position.set(sx,.24,sz);g.add(w);}
  const bar=new THREE.Group();bar.position.set(0,.62,0);bar.rotation.x=-(pitch==null?.6:pitch);g.add(bar);const b=new THREE.Mesh(new THREE.CylinderGeometry(.26,.34,1.6,12).rotateX(Math.PI/2),M);b.position.z=.3;bar.add(b);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(.27,.07,6,14),M);rim.position.z=1.1;bar.add(rim);const bk=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),M);bk.position.z=-.5;bar.add(bk);
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;}});g.position.set(x,y,z);g.rotation.y=yaw;scene.add(g);return g;}
function pwEnvBuild(){PW.chip=$("pwChip");if(!PW.chip&&$("fpUI")){$("fpUI").insertAdjacentHTML("beforeend",'<div id="pwChip" hidden></div>');PW.chip=$("pwChip");}
  for(const R of PW.rings){const n=R.pts.length;R.m=R.pts.map((p,i)=>{const nx=R.pts[Math.min(n-1,i+1)],pv=R.pts[Math.max(0,i-1)];const m=new THREE.Mesh(new THREE.TorusGeometry(1.25,.13,8,28),new THREE.MeshStandardMaterial({color:LC(R.col||0xffd23d),emissive:LC(R.col||0xffd23d),emissiveIntensity:.5,roughness:.4,metalness:.3,transparent:true,opacity:.35}));
      m.position.set(p[0],p[1],p[2]);m.rotation.y=Math.atan2((nx[0]-pv[0]),(nx[2]-pv[2]))||0;scene.add(m);return m;});
    const s=R.start;const pad=new THREE.Mesh(new THREE.RingGeometry(.6,1.05,28).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:R.col||0xffd23d,transparent:true,opacity:.8,depthWrite:false,fog:false}));pad.position.set(s[0],s[1]+.06,s[2]);scene.add(pad);R.pad=pad;
    const done=pwDone(R.k);R.m.forEach(m=>m.visible=!done);pad.visible=!done;}
  for(const Q of PW.seqs){Q.m=Q.pads.map(p=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.02,.08,1.02),new THREE.MeshBasicMaterial({color:p.col||0xffffff,transparent:true,opacity:0,depthWrite:false,fog:false,blending:THREE.AdditiveBlending}));m.position.set(p.x+.5,p.y+1.03,p.z+.5);scene.add(m);return m;});}}
function pwChip(t){const c=PW.chip;if(!c)return;if(!t){c.hidden=true;return;}c.hidden=false;c.innerHTML=t;}

/* the kit's tick: pickups, quest starts, dig spots, cannons, rings, sequence pads, skin particles */
function pwTick(dt,tt){const P=FP.p;if(!FP.on)return;
  for(const p of PW.pick){if(p.got||!p.g.visible)continue;p.g.rotation.y+=dt*2;p.g.position.y=p.y+Math.sin(tt*2.4+p.i)*.15;
    if(Math.hypot(P.x-p.x,P.z-p.z)<1.3&&Math.abs(P.y+.5-p.y)<1.7){p.got=true;p.g.visible=false;burst(p.x,p.y,p.z,20,[[1,.9,.6],[.7,1,1]],1.8,2,.7);sfx.pop();pwQStep(p.k);}}
  for(const k in PW.q){const o=PW.q[k];if(!o.en||!o.auto||pwQDone(k))continue;const q=pwQS(k);if(q&&q.seen)continue;const en=o.en;if(Math.hypot(P.x-en.x,P.z-en.z)<4.4&&Math.abs(P.y-en.y)<4)pwQStart(k);}
  for(const d of PW.digs){if(pwDone(d.k))continue;const on=FP.ground&&Math.abs(P.x-d.x-.5)<1.3&&Math.abs(P.z-d.z-.5)<1.3&&Math.abs(P.y-d.y-1)<1.3;
    if(Math.random()<dt*2)mgSpawn({t:"star",x:d.x+.5+(Math.random()-.5),y:d.y+1.2,z:d.z+.5+(Math.random()-.5),vy:.5,life:.8,size:.2,size2:.02,col:[0xffe080,0xffffff],add:1});
    if(on){if(d.t===0)tipOnce("dig","Tu nešto ima! Ostani na mjestu i Rida će kopati.",3200);d.t+=dt;if(Math.random()<dt*14)mgSpawn({t:"puff",x:P.x+(Math.random()-.5)*.6,y:P.y+.1,z:P.z+(Math.random()-.5)*.6,vy:1.6,life:.6,size:.16,size2:.32,col:[0xe8d29a,0xc8a868],grav:3,op:.9});
      if(d.t>1.5){pwOpen(d.k);if(d.msg)toast(d.msg,3800);}}else d.t=Math.max(0,d.t-dt*2);}
  for(const L of PW.launch){L.cool-=dt;if(PW.fly||FP.mount||!FP.ground||L.cool>0)continue;if(Math.hypot(P.x-L.x,P.z-L.z)<.9&&Math.abs(P.y-L.y)<1.3)pwFire(L);}
  for(const R of PW.rings)pwRingTick(R,dt,tt);
  for(const Q of PW.seqs)pwSeqTick(Q,dt,tt);
  const sk=S.mg&&MSKIN[S.mg.skin];if(sk&&sk.pfx&&Math.hypot(FP.v.x,FP.v.z)>.8&&Math.random()<dt*9)sk.pfx(P);}
function pwBoom(x,y,z){tone(62,.5,"sawtooth",.07);tone(44,.7,"sine",.09);tone(120,.12,"square",.03);burst(x,y,z,34,[[.5,.5,.5],[.8,.8,.8],[1,.7,.3]],3,3,.9);
  for(let i=0;i<14;i++)mgSpawn({t:"puff",x,y,z,vx:(Math.random()-.5)*3,vy:1+Math.random()*2,vz:(Math.random()-.5)*3,life:1.2,size:.4,size2:1.1,col:[0x9a9aa0,0xd0d0d8],drag:2,op:.8});if(typeof padRumble==="function"&&PAD.on)padRumble(300,1,.8);}
function pwFire(L){const P=FP.p;PW.fly={L,t:0,from:{x:L.x,y:P.y,z:L.z}};const dx=L.to[0]-L.x,dz=L.to[2]-L.z;FP.cam.yaw=Math.atan2(-dx,-dz);FP.yaw=FP.cam.yaw+Math.PI;
  pwBoom(L.x,P.y+.8,L.z);if(rida)rida.celebrate=1;if(L.msg)tipOnce("top_"+WORLD+"_"+(L.k||""),L.msg,3600);}
{const _ts=tickSquirrel;tickSquirrel=function(dt){const r=_ts.apply(this,arguments);const F=PW.fly;if(F&&FP.on&&WORLD){F.t+=dt;const L=F.L,s=Math.min(1,F.t/L.dur),a=F.from,b=L.to;
    FP.p.set(a.x+(b[0]-a.x)*s,a.y+(b[1]-a.y)*s+L.h*4*s*(1-s),a.z+(b[2]-a.z)*s);FP.v.set(0,0,0);FP.ground=false;FP.dblUsed=0;
    if(Math.random()<.7)mgSpawn({t:L.fx||"star",x:FP.p.x,y:FP.p.y+.4,z:FP.p.z,vy:.2,life:.8,size:.3,size2:.04,col:L.col||[0xffe080,0xffffff,0xff9a50],add:1});
    if(s>=1){PW.fly=null;FP.v.set(0,-2,0);L.cool=1.5;FP.safe.copy(FP.p);burst(b[0],b[1],b[2],22,[[1,1,1],[1,.9,.6]],2,2,.6);sfx.pop();}}return r;};}
function pwRingTick(R,dt,tt){if(pwDone(R.k)){if(R.st!==3){R.st=3;R.m.forEach(m=>m.visible=false);if(R.pad)R.pad.visible=false;pwChip(null);}return;}const P=FP.p;
  if(R.pad){R.pad.material.opacity=.5+Math.sin(tt*4)*.3;R.pad.rotation.y+=dt;}
  if(R.st===0){R.m.forEach((m,i)=>{m.material.opacity=.3;m.rotation.z=0;});const s=R.start;if(Math.hypot(P.x-s[0],P.z-s[2])<1.3&&Math.abs(P.y-s[1])<1.6){R.st=1;R.i=0;R.t=R.time;sfx.chime();toast((R.name||"Utrka")+"! Prođi kroz svih "+R.pts.length+" obruča za "+R.time+" sekundi!",3200);}return;}
  if(R.st===1){R.t-=dt;R.m.forEach((m,i)=>{m.visible=i>=R.i;m.material.opacity=i===R.i?1:.45;m.material.emissiveIntensity=i===R.i?1.2:.4;if(i===R.i)m.rotation.z+=dt*2;});
    pwChip('<b>'+(R.name||"Utrka")+'</b> '+R.i+' / '+R.pts.length+' · <b>'+Math.max(0,Math.ceil(R.t))+'</b> s');
    const p=R.pts[R.i];if(Math.hypot(P.x-p[0],P.y+.6-p[1],P.z-p[2])<1.7){mgRing(p[0],p[1],p[2],R.col||0xffd23d);tone(523*Math.pow(1.12246,R.i),.14,"triangle",.04);R.i++;
      if(R.i>=R.pts.length){R.st=2;pwChip(null);toast(R.win||"Bravo! Stigla si na vrijeme!",4200);fireworks();pwOpen(R.cage||R.k);return;}}
    if(R.t<=0){R.st=0;pwChip(null);R.m.forEach(m=>m.visible=true);tone(220,.3,"sawtooth",.03);toast("Vrijeme je isteklo! Vrati se na svjetleći krug na startu i probaj opet.",3800);}}}
function pwSeqTick(Q,dt,tt){Q.m.forEach(m=>{m.material.opacity=Math.max(0,m.material.opacity-dt*1.5);});if(pwDone(Q.k))return;const P=FP.p;let j=-1;
  if(FP.ground){const fx=Math.floor(P.x),fy=Math.floor(P.y-.1),fz=Math.floor(P.z);j=Q.pads.findIndex(p=>p.x===fx&&p.z===fz&&p.y===fy);}
  if(j===Q.last)return;Q.last=j;if(j<0)return;const pd=Q.pads[j];Q.m[j].material.opacity=.9;tone(pd.f||440,.4,"sine",.05);tone((pd.f||440)*2,.25,"triangle",.015);
  if(Q.order[Q.i]===j){Q.i++;burst(pd.x+.5,pd.y+1.2,pd.z+.5,12,[[1,1,.7],[1,1,1]],1.4,1.6,.6);if(Q.i>=Q.order.length){toast(Q.win||"Točno! Nešto se otvorilo!",4000);setTimeout(()=>pwOpen(Q.cage||Q.k),500);}}
  else{const restart=Q.order[0]===j;if(Q.i>0){tone(160,.35,"sawtooth",.03,.15);toast(Q.wrong||"Ups, krivi redoslijed. Kreni ispočetka!",2600);}Q.i=restart?1:0;}}

/* helpers the worlds share */
function pwSea(o){/* sea floor everywhere with a gentle sandy slope */for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,Math.round(SL-3+(fbm(x*.03+o,z*.03+2*o)-.5)*4));hmap[x+z*W]=h;for(let y=0;y<h;y++)vox[I(x,y,z)]=y<h-2?T.kamen:T.pijesak;}}
function pwIsle(cx,cz,r,top,o){/* a round island with beach, grass and optional hill; returns its record */o=o||{};const R=Math.ceil(r*1.25)+2,sd=o.sd||(cx*3+cz*7)%53;
  for(let dz=-R;dz<=R;dz++)for(let dx=-R;dx<=R;dx++){const x=cx+dx,z=cz+dz;if(x<1||z<1||x>=W-1||z>=W-1)continue;const a=Math.atan2(dz,dx),rr=r*(1+.22*(vnoise(Math.cos(a)*1.6+sd,Math.sin(a)*1.6+sd,7)-.5)),d=Math.hypot(dx,dz)/rr;if(d>1.18)continue;
    const land=sstep(1.18,.72,d);let h=SL-1+(top-SL+1)*land+(fbm(x*.08+sd,z*.08)-.5)*(o.rough||2)*land;if(o.hill){const q=Math.max(0,1-d/o.hill[1]);h+=o.hill[0]*Math.pow(q,1.4);}
    h=Math.round(h);if(h<=hmap[x+z*W])continue;hmap[x+z*W]=h;const beach=h<=SL+3+(o.beach||0);
    for(let y=0;y<h;y++){let t=T.kamen;if(y>=h-3)t=beach?T.pijesak:(y===h-1?(o.grass||T.trava):T.zemlja);if(o.rock&&h>SL+o.rock)t=y===h-1&&o.rockTop?o.rockTop:T.kamen;vox[I(x,y,z)]=t;}}
  const rec={x:cx,z:cz,r,y:top};return rec;}
function pwPalm(x,z,o){o=o||{};const y=wTopAt(x,z);if(y<SL+2)return null;const h=(o.h||6)+Math.floor(hash2(x,z,7)*3);const lx=hash2(x,z,8)<.5?1:-1,lz=hash2(x,z,9)<.5?1:-1;let px=x,pz=z;
  for(let i=1;i<=h;i++){if(i===Math.floor(h*.55))px+=lx;wput(px,y+i,pz,o.trunk||T.drvo);}const ty=y+h,L=o.leaf||T.lisce;wput(px,ty+1,pz,L);
  for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){wput(px+a,ty+1,pz+b,L);wput(px+a*2,ty+1,pz+b*2,L);wput(px+a*3,ty,pz+b*3,L);wput(px+a*4,ty-1,pz+b*4,L);}
  for(const [a,b] of [[1,1],[-1,-1],[1,-1],[-1,1]]){wput(px+a,ty+1,pz+b,L);wput(px+a*2,ty,pz+b*2,L);wput(px+a*3,ty-1,pz+b*3,L);}
  return {x:px+.5,y:ty+.2,z:pz+.5};}
function pwHut(x,z,y,o){/* a small stilt hut: o.w,o.d, roof colour, door side +z */o=o||{};const w=o.w||2,d=o.d||2,R=o.roof||T.krov,F=o.wall||T.tdaske,fl=o.floor||T.sdaske;
  for(let a=-w;a<=w;a++)for(let b=-d;b<=d;b++){const ed=Math.abs(a)===w||Math.abs(b)===d;wput(x+a,y,z+b,fl,1);if(ed&&!(b===d&&a===0)){for(let h=1;h<=3;h++)wput(x+a,y+h,z+b,(Math.abs(a)===w&&Math.abs(b)===d)?T.drvo:(h===2&&(a===0||b===0)?T.staklo:F),1);}else for(let h=1;h<=3;h++)vox[I(x+a,y+h,z+b)]=0;
    if(o.stilt&&Math.abs(a)===w&&Math.abs(b)===d)for(let yy=y-1;yy>=1&&!vox[I(x+a,yy,z+b)];yy--)wput(x+a,yy,z+b,T.drvo,1);}
  for(let s=0;s<=Math.max(w,d)+1;s++){const ww=w+1-s,dd=d+1;if(ww<0)break;for(let a=-ww;a<=ww;a++)for(let b=-dd;b<=dd;b++)if(Math.abs(a)===ww)wput(x+a,y+4+s,z+b,R,1);if(ww===0)for(let b=-dd;b<=dd;b++)wput(x,y+4+s,z+b,R,1);}
  for(let s=0;s<=w;s++)for(let a=-(w-s);a<=w-s;a++){wput(x+a,y+4+s,z-d,F,1);wput(x+a,y+4+s,z+d,F,1);}
  wput(x+1,y+3,z+d+1,T.lampion,1);}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);if(!HERE||!FP.on||!PWH.portals.length)return;for(const p of PWH.portals)portalCheck(p,()=>pwSheet(p.id));
  const H0=PWH.hub;if(H0&&Math.hypot(FP.p.x-H0.x,FP.p.z-H0.z)<11)tipOnce("pwtrg","Trg portala! Četiri portala vode u četiri nova svijeta. Prođi kroz portal i vidi kamo vodi.",4600);};}
/* the main island's windmill and library fountain disc were built by buildLife inside every portal world too */
{const _bl=buildLife;buildLife=function(){const r=_bl.apply(this,arguments);if(WORLD&&!HERE){try{if(life.mill&&life.mill.parent)life.mill.parent.visible=false;
  for(const o of scene.children)if(o.isMesh&&o.geometry&&o.geometry.type==="CircleGeometry"&&Math.abs(o.position.x-(LIB.x+.5))<.01&&Math.abs(o.position.z-(LIB.z+9.5))<.01)o.visible=false;}catch(e){}}return r;};}
