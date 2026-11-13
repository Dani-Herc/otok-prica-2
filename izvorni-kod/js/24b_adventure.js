/* =================== ADVENTURE: DIGGING, CHESTS, PLACES, BAG & WORKSHOP =================== */
/* the island grew in version 9: old edits pointed at the old map, so placed blocks go back into the bag */
function migrateWorld(){if((S.worldV||0)>=9)return;const B=S.bag||null;if(B){for(const k in S.edits||{}){const t=S.edits[k];if(t&&TYPES[t]&&!TYPES[t].water){B[TYPES[t].k]=(B[TYPES[t].k]||0)+1;}}}
  S.edits={};S.spawns=[];S.spawnDay="";S.isletDay={};S.worldV=9;const used=new Set();for(const b of S.books){if(b.plot>=PLOTS.length||used.has(b.plot)){const f=PLOTS.findIndex((_,i)=>!used.has(i)&&!S.books.some(x=>x!==b&&x.plot===i));if(f>=0)b.plot=f;}used.add(b.plot);}save();}
function advInit(){S.tools=S.tools||{};S.gear=S.gear||{};S.mats=S.mats||{};S.chests=S.chests||{};S.poi=S.poi||{};S.mined=S.mined||0;S.crafted=S.crafted||0;
  if(!Array.isArray(S.hot))S.hot=["daske","kamen","zemlja","staklo","lampion","pijesak","cigla"];}
const haveN=k=>MATS[k]?(S.mats[k]||0):(bag()[k]||0);
const giveN=(k,n)=>{if(MATS[k])S.mats[k]=(S.mats[k]||0)+n;else{const B=bag();B[k]=(B[k]||0)+n;}};
/* ---- small pictures for things that are not blocks ---- */
const itemIconCache={};
function itemIcon(k,tier){const key=k+(tier||"");if(itemIconCache[key])return itemIconCache[key];const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d");
  const ol="#16243a";x.lineJoin="round";x.lineCap="round";const P=(pts,fill)=>{x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();x.fillStyle=fill;x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();};
  const hi=(px,py,r)=>{x.fillStyle="rgba(255,255,255,.75)";x.beginPath();x.arc(px,py,r,0,7);x.fill();};
  const stick=()=>{x.lineWidth=9;x.strokeStyle=ol;x.beginPath();x.moveTo(16,52);x.lineTo(44,20);x.stroke();x.lineWidth=5;x.strokeStyle="#a0703c";x.stroke();};
  const tc=TIERC[tier||1];
  if(k==="stap"){x.lineWidth=10;x.strokeStyle=ol;x.beginPath();x.moveTo(14,52);x.lineTo(50,12);x.stroke();x.lineWidth=6;x.strokeStyle="#b07a44";x.stroke();}
  else if(k==="ugljen"){P([[14,40],[20,20],[38,14],[52,26],[50,46],[30,52]],"#3a3a42");hi(26,26,3.5);}
  else if(k==="bakar"||k==="zeljezo"){P([[10,44],[18,26],[46,26],[54,44]],MATS[k].c);x.fillStyle="rgba(255,255,255,.35)";x.fillRect(20,30,22,5);}
  else if(k==="grumen"){P([[12,42],[18,24],[34,16],[50,24],[52,42],[32,50]],"#ffc53d");hi(26,26,4);x.fillStyle="#c98a00";x.beginPath();x.arc(40,38,4,0,7);x.fill();}
  else if(k==="dijamant"||k==="smaragd"){P([[32,8],[54,26],[32,56],[10,26]],MATS[k].c);x.strokeStyle="rgba(255,255,255,.6)";x.lineWidth=2.5;x.beginPath();x.moveTo(10,26);x.lineTo(54,26);x.moveTo(32,8);x.lineTo(22,26);x.lineTo(32,56);x.lineTo(42,26);x.lineTo(32,8);x.stroke();}
  else if(k==="biser"){x.beginPath();x.arc(32,34,17,0,7);x.fillStyle="#f6f0ff";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();hi(26,28,5);}
  else if(k==="kramp"){stick();P([[10,22],[24,10],[40,8],[54,14],[42,16],[28,20],[18,30]],tc);}
  else if(k==="lopata"){stick();P([[40,8],[56,10],[58,24],[50,28],[38,20]],tc);}
  else if(k==="sjekira"){stick();P([[34,10],[48,6],[56,18],[50,30],[40,26],[44,18]],tc);}
  else if(k==="maska"){P([[8,24],[56,24],[56,42],[40,42],[32,36],[24,42],[8,42]],"#ffb02e");x.fillStyle="#9fe3ff";x.fillRect(14,28,14,10);x.fillRect(36,28,14,10);hi(18,31,2.5);hi(40,31,2.5);}
  else if(k==="camac"){P([[6,30],[58,30],[50,48],[14,48]],"#9a6a3c");x.fillStyle="#c99a60";x.fillRect(12,32,40,5);x.lineWidth=4;x.strokeStyle=ol;x.beginPath();x.moveTo(32,30);x.lineTo(32,8);x.stroke();P([[34,10],[50,26],[34,26]],"#fdf8ec");}
  else if(k==="lampa"){P([[22,18],[42,18],[44,52],[20,52]],"#ffe2a0");x.fillStyle="#2c2a30";x.fillRect(20,12,24,7);x.fillRect(19,50,26,6);x.fillStyle="#ffb84a";x.beginPath();x.arc(32,36,7,0,7);x.fill();x.lineWidth=4;x.strokeStyle=ol;x.beginPath();x.arc(32,10,6,Math.PI,0);x.stroke();}
  else if(k==="paw"){x.fillStyle="#e8772e";x.strokeStyle=ol;x.lineWidth=4;[[32,40,12],[18,24,6],[28,16,6],[38,16,6],[47,24,6]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill();x.stroke();});}
  else if(k==="torba"){P([[12,22],[52,22],[56,54],[8,54]],"#c47a3a");x.lineWidth=4;x.strokeStyle=ol;x.beginPath();x.arc(32,22,10,Math.PI,0);x.stroke();x.fillStyle="#ffc53d";x.fillRect(27,32,10,8);}
  else if(k==="coin"){x.beginPath();x.arc(32,32,20,0,7);x.fillStyle="#ffc53d";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();x.fillStyle="#c98a00";x.fillRect(30,20,5,24);hi(25,25,4);}
  else if(ITEM_DRAW[k])ITEM_DRAW[k](x,P,hi,ol);
  return itemIconCache[key]=c.toDataURL();}
const thingIcon=k=>MATS[k]||TOOLS[k]||GEAR[k]?itemIcon(k):icon(ID[k]);
const thingName=k=>MATS[k]?MATS[k].n:TYPES[ID[k]]?TYPES[ID[k]].n:k;
/* ---- protection ---- */
function protectWhy(c){const [x,y,z]=c;if(y<=0)return "Ovo je dno svijeta. Dublje se ne može.";const i=I(x,y,z),key=c.join(","),mk=mask[x+z*W];
  if(prot[i]&&!S.edits[key])return "Ovo je dio stare građevine. Neka ostane cijela da je svi mogu istraživati!";
  if(!S.edits[key]&&mk===4)return "Knjižnica je čarobna i ne može se srušiti.";
  if(!S.edits[key]&&mk===1)return y<hmap[x+z*W]?"Ovo tlo čuva mjesto za građevine iz tvojih knjiga.":"Ovo je sagradila tvoja knjiga i ne može se srušiti.";
  for(const ch of chestObjs)if(Math.floor(ch.x)===x&&Math.floor(ch.z)===z&&Math.round(ch.y)===y+1)return "Na ovome stoji škrinja.";
  return null;}
/* ---- digging a block ---- */
const ORE_TIP={ugljen:"Ugljen! Od njega nastaju staklo, lampioni i cigle.",bakar:"Bakar! Treba za ronilačku masku.",zeljezo:"Željezo! Od njega su jaki alati i ručna lampa.",grumen:"Zlatni grumen! Šest grumena daje zlatni blok.",dijamant:"DIJAMANT! Najtvrđi kamen na svijetu.",smaragd:"Smaragd! Rijedak zeleni dragulj."};
function mineBlock(c){const t=get(...c);if(!t)return;const ty=TYPES[t];const key=c.join(",");
  if(ty.ore){const n=ty.ore==="ugljen"&&Math.random()<.4?2:1;giveN(ty.ore,n);S.seenMat=S.seenMat||{};if(!S.seenMat[ty.ore]){S.seenMat[ty.ore]=1;toast(ORE_TIP[ty.ore],4200);}
    else miniPop(itemIcon(ty.ore),"+"+n);}
  else{giveN(ty.k,1);hotAdd(ty.k);miniPop(icon(t),"+1");}
  if(baseWater.has(key)){delete S.edits[key];setV(c[0],c[1],c[2],T.voda);}else{S.edits[key]=0;setV(c[0],c[1],c[2],0);}
  S.mined++;bump("mine",1);sfx.pop();burst(c[0]+.5,c[1]+.5,c[2]+.5,16,[avgColor(t)],2.2,2.2,.6);hotbarRender();save();}
/* a tiny "+1" that floats up from the bag button */
function miniPop(src,txt){const el=document.createElement("div");el.className="minipop";el.innerHTML='<img alt="" src="'+src+'"><b>'+txt+'</b>';document.body.appendChild(el);setTimeout(()=>el.remove(),1100);}
/* ---- hotbar ---- */
function hotAdd(k){if(!S.hot.includes(k)){const i=S.hot.findIndex(h=>!haveN(h));if(i>=0)S.hot[i]=k;else if(S.hot.length<7)S.hot.push(k);}}
function hotbarRender(){const el=$("hotbar");if(!el)return;S.hot=S.hot.filter(k=>ID[k]!=null||(MATS[k]&&MATS[k].seed)).slice(0,7);
  let h='<button class="slot'+(!FP.hand?' on':'')+'" data-k="" title="Šapa: kopaj držanjem" aria-label="Šapa"><img alt="" src="'+itemIcon("paw")+'"></button>';
  for(const k of S.hot){const n=haveN(k);h+='<button class="slot'+(FP.hand===k?' on':'')+(n?'':' empty')+'" data-k="'+k+'" title="'+esc(thingName(k))+' ('+n+')" aria-label="'+esc(thingName(k))+', '+n+'"><img alt="" src="'+thingIcon(k)+'"><span class="cnt">'+n+'</span></button>';}
  h+='<button class="slot bagb" id="bagBtn" title="Torba i radionica (E)" aria-label="Torba i radionica"><img alt="" src="'+itemIcon("torba")+'"></button>';el.innerHTML=h;
  el.querySelectorAll(".slot[data-k]").forEach(b=>b.onclick=()=>{const k=b.dataset.k;sfx.click();if(k&&!haveN(k)){toast("U torbi više nema: "+thingName(k)+(MATS[k]?". Još ih ima na tržnici i u vrtu!":". Iskopaj ili napravi još!"),2600);}FP.hand=k;if(k&&ID[k]!=null)sel=ID[k];if(k&&MATS[k]&&MATS[k].seed&&!S.seedTip){S.seedTip=1;toast("Dodirni zemlju, travu ili oranicu i Rida će posaditi sjeme.",3600);}hotbarRender();});
  $("bagBtn").onclick=()=>{sfx.click();sheetBag("kockice");};
  if(FP.hand&&!haveN(FP.hand)&&!S.hot.includes(FP.hand))FP.hand="";}
/* ---- light-aware tinting of creature models ---- */
function entShade(e,f){if(e.shadeF!=null&&Math.abs(e.shadeF-f)<.02)return;e.shadeF=f;e.g.traverse(o=>{if(!o.isMesh||!o.material||!o.material.color)return;if(!o.userData.bc)o.userData.bc=o.material.color.clone();o.material.color.copy(o.userData.bc).multiplyScalar(f);});}
/* ---- chests ---- */
const chestObjs=[];
function buildChests(){const body=std(0x7a5233),band=new THREE.MeshStandardMaterial({color:LC(0xffc53d),roughness:.35,metalness:.6}),dark=std(0x4a3220);
  for(const c of CHESTS){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(.9,.52,.66),body);b.position.y=.26;g.add(b);
    const trim=new THREE.Mesh(new THREE.BoxGeometry(.94,.08,.7),dark);trim.position.y=.5;g.add(trim);
    const lid=new THREE.Group();lid.position.set(0,.52,-.33);const lm=new THREE.Mesh(new THREE.BoxGeometry(.9,.24,.66),body);lm.position.set(0,.12,.33);lid.add(lm);
    const lb=new THREE.Mesh(new THREE.BoxGeometry(.1,.26,.68),band);lb.position.set(0,.12,.33);lid.add(lb);g.add(lid);
    const lock=new THREE.Mesh(new THREE.BoxGeometry(.14,.16,.06),band);lock.position.set(0,.46,.35);g.add(lock);[-.36,.36].forEach(x=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.08,.54,.7),band);s.position.set(x,.27,0);g.add(s);});
    g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffe27a,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.55}));glow.scale.set(2.4,2.4,1);glow.position.y=.6;g.add(glow);
    g.position.set(c.x,c.y,c.z);g.rotation.y=Math.atan2(CX-c.x,CZ-c.z);const ch={id:c.id,n:c.n,x:c.x,y:c.y,z:c.z,g,lid,glow,open:!!S.chests[c.id],a:0};if(ch.open){lid.rotation.x=-1.9;glow.visible=false;ch.a=1;}
    g.userData.chest=ch;scene.add(g);chestObjs.push(ch);const l=lightAt(c.x,c.y+.5,c.z);entShade(ch,Math.max(.12,Math.max(Math.pow(.8,15-l[0]),Math.pow(.79,15-l[1])*1.1)));}}
function tickChests(dt,t){for(const ch of chestObjs){if(ch.open&&ch.a<1){ch.a=Math.min(1,ch.a+dt*2.5);ch.lid.rotation.x=-1.9*(1-Math.pow(1-ch.a,3));}
  if(!ch.open){ch.glow.material.opacity=.35+Math.sin(t*2.5+ch.x)*.2;if(Math.random()<dt*1.5)burst(ch.x+(Math.random()-.5)*.8,ch.y+.7,ch.z+(Math.random()-.5)*.8,1,[[1,.9,.4],[1,1,.8]],.2,.5,1.2,-.05);}}}
function openChest(ch){if(ch.open){toast("Ova škrinja je prazna. Sve blago iz nje već je tvoje!",2400);return;}const L=LOOT[ch.id]||{coins:10};ch.open=true;S.chests[ch.id]=today();ch.glow.visible=false;
  S.coins+=L.coins||0;const got=[];for(const k in L.mats||{}){giveN(k,L.mats[k]);got.push([k,L.mats[k]]);}for(const k in L.blocks||{}){giveN(k,L.blocks[k]);got.push([k,L.blocks[k]]);hotAdd(k);}
  sfx.fanfare();for(let i=0;i<4;i++)setTimeout(()=>burst(ch.x,ch.y+.9,ch.z,30,[[1,.85,.3],[1,1,.7],[1,.6,.2]],2.4,3.2,1),i*180);if(rida)rida.celebrate=1;bump("chest",1);save();renderEco();hotbarRender();
  setTimeout(()=>{openSheet('<h2>'+esc(ch.n)+'</h2><p>'+esc(L.msg||"")+'</p><div class="loot"><div><img alt="" src="'+itemIcon("coin")+'">+'+(L.coins||0)+' zlatnika</div>'+
    got.map(g=>'<div><img alt="" src="'+thingIcon(g[0])+'">+'+g[1]+' '+esc(thingName(g[0]))+'</div>').join("")+'</div><p class="muted">Otvorene škrinje: '+chestObjs.filter(c=>c.open).length+' od '+chestObjs.length+'. Ostale se kriju u špilji, pod morem i na dalekim otocima.</p><button class="btn big" id="chOk">Super!</button>');$("chOk").onclick=closeSheet;},700);}
/* ---- discovering places ---- */
let poiT=0;
function poiCheck(P){poiT-=.016;if(poiT>0)return;poiT=.5;for(const q of POI){if(S.poi[q.k])continue;if(Math.hypot(q.x-P.x,q.z-P.z)<(q.r||15)&&(q.y==null||P.y>=q.y)){S.poi[q.k]=today();S.coins+=15;save();renderEco();sfx.chime();
  toast("Otkrila si novo mjesto: "+q.n+"! +15 zlatnika",4200);if(rida)rida.celebrate=.8;bump("poi",1);}}}
/* ---- bag and workshop ---- */
$("bagOpen").onclick=()=>{sfx.click();sheetBag("kockice");};
function nearBench(){const p=FP.on?FP.p:rida?{x:rida.x,y:rida.y,z:rida.z}:null;if(!p)return false;const x0=Math.floor(p.x),y0=Math.floor(p.y),z0=Math.floor(p.z);
  for(let y=y0-2;y<=y0+3;y++)for(let z=z0-6;z<=z0+6;z++)for(let x=x0-6;x<=x0+6;x++)if(get(x,y,z)===T.stol)return true;return false;}
function canCraft(r){for(const k in r.cost)if(haveN(k)<r.cost[k])return false;return true;}
function recipeState(r){if(r.gate&&!(finished().length>=r.gate))return {lock:BKT(r.gate)};if(r.tool&&(S.tools[r.tool[0]]||0)>=r.tool[1])return {own:1};if(r.gear&&S.gear[r.gear])return {own:1};
  if(r.tool&&(S.tools[r.tool[0]]||0)<r.tool[1]-1)return {later:1};return {};}
function craft(id){const r=RECIPES.find(x=>x.id===id);if(!r)return;const st=recipeState(r);if(st.lock||st.own)return;if(r.bench&&!nearBench()){toast("Ovo se radi uz radni stol. Jedan stoji kod knjižnice, a možeš i sagraditi svoj.",3600);return;}
  if(!canCraft(r)){toast("Nedostaje još materijala.",2000);sfx.click();return;}for(const k in r.cost)giveN(k,-r.cost[k]);
  let what;if(r.out){giveN(r.out[0],r.out[1]);if(ID[r.out[0]]!=null)hotAdd(r.out[0]);what=r.out[1]+"× "+r.n;}else if(r.tool){S.tools[r.tool[0]]=r.tool[1];what=r.n;}else if(r.gear){S.gear[r.gear]=1;what=r.n;}
  S.crafted++;bump("craft",1);save();sfx.chime();if(rida){rida.celebrate=.6;burst(rida.x,rida.y+1.2,rida.z,24,[[1,.9,.4],[1,1,1]],1.6,2.2,.8);}hotbarRender();toast("Napravila si: "+what+"!",2400);
  if(r.gear==="camac")setTimeout(()=>toast("Čamac je u torbi. Kad Rida zapliva u duboko more, sama sjedne u njega!",4800),2500);
  if(r.gear==="maska")setTimeout(()=>toast("Uz masku Rida dugo roni. Pod morem je koraljni greben i potonuli brod!",4800),2500);
  if(r.gear==="lampa")setTimeout(()=>toast("Rida će u mraku sama upaliti lampu.",3600),2500);
  sheetBag("radionica",true);}
function costHTML(r){return Object.keys(r.cost).map(k=>{const ok=haveN(k)>=r.cost[k];return '<span class="cost'+(ok?'':' no')+'" title="'+esc(thingName(k))+'"><img alt="" src="'+thingIcon(k)+'">'+haveN(k)+'/'+r.cost[k]+'</span>';}).join("");}
/* ---- the map: drawn from the world itself ---- */
function drawMap(cv){const S2=2,x=cv.getContext("2d");cv.width=cv.height=W*S2;const img=x.createImageData(W,W);const sea=[[26,92,150],[63,143,216],[120,200,230]];
  for(let z=0;z<W;z++)for(let X=0;X<W;X++){let r,g,b;const h=hmap[X+z*W];let ty=0,yy=0;for(let y=H-1;y>0;y--){const t=vox[I(X,y,z)];if(t){ty=t;yy=y;break;}}
    if(yy<WATER-.5&&!(ty&&TYPES[ty].water)){const d=Math.min(1,(WATER-yy)/9);const c=new THREE.Color(TYPES[ty]?TYPES[ty].c:0xd8c890);r=c.r*255*(1-d)*.5+sea[1][0]*(.5+d*.5)-d*30;g=c.g*255*(1-d)*.5+sea[1][1]*(.5+d*.5)-d*40;b=c.b*255*(1-d)*.5+sea[1][2]*(.5+d*.5)-d*30;}
    else{const c=new THREE.Color(TYPES[ty]?TYPES[ty].c:0x888888);const sh=.75+Math.min(.45,(yy-SL)/60)+((hmap[Math.min(W-1,X+1)+z*W]-h)*-.05);r=c.r*255*sh;g=c.g*255*sh;b=c.b*255*sh;}
    const i=(X+z*W)*4;img.data[i]=r;img.data[i+1]=g;img.data[i+2]=b;img.data[i+3]=255;}
  const tmp=document.createElement("canvas");tmp.width=tmp.height=W;tmp.getContext("2d").putImageData(img,0,0);x.imageSmoothingEnabled=false;x.drawImage(tmp,0,0,W*S2,W*S2);
  const dot=(px,pz,col,r,ring)=>{x.beginPath();x.arc(px*S2,pz*S2,r,0,7);x.fillStyle=col;x.fill();x.lineWidth=2.5;x.strokeStyle=ring||"#16243a";x.stroke();};
  x.font="700 15px 'Pixelify Sans',monospace";x.textAlign="center";
  /* names never sit on top of each other: try above, below, right, left, else leave just the dot */
  const placed=[];const fits=r=>r.x>2&&r.y>2&&r.x+r.w<W*S2-2&&r.y+r.h<W*S2-2&&!placed.some(o=>r.x<o.x+o.w&&o.x<r.x+r.w&&r.y<o.y+o.h&&o.y<r.y+r.h);
  for(const q of POI){const on=S.poi[q.k];dot(q.x,q.z,on?"#8fdc6a":"#fffdf7",6);placed.push({x:q.x*S2-7,y:q.z*S2-7,w:14,h:14});if(!on){x.fillStyle="#16243a";x.fillText("?",q.x*S2,q.z*S2+5);}}
  for(const q of POI){if(!S.poi[q.k])continue;const tw=x.measureText(q.n).width+6,th=17,cx=q.x*S2,cz=q.z*S2;
    const opts=[[cx,cz-11,cx-tw/2,cz-11-14],[cx,cz+23,cx-tw/2,cz+9],[cx+10+tw/2,cz+5,cx+10,cz-9],[cx-10-tw/2,cz+5,cx-10-tw,cz-9]];
    for(const o of opts){const r={x:o[2],y:o[3],w:tw,h:th};if(!fits(r))continue;placed.push(r);x.lineWidth=4;x.strokeStyle="#16243a";x.strokeText(q.n,o[0],o[1]);x.fillStyle="#fff";x.fillText(q.n,o[0],o[1]);break;}}
  for(const ch of chestObjs)if(!ch.open&&(ch.id!=="tajna"||(S.quest&&S.quest.done))&&S.poi[(POI.find(q=>Math.hypot(q.x-ch.x,q.z-ch.z)<18)||{}).k])dot(ch.x,ch.z,"#ffc53d",4);
  for(const tr of treasures)if(!tr.leaving)dot(tr.g.position.x,tr.g.position.z,"#ff7fa8",4,"#fff");
  if(typeof mapExtra==="function")mapExtra(x,S2,dot);
  const rp=FP.on?FP.p:rida?{x:rida.x,z:rida.z}:null;if(rp){x.save();x.translate(rp.x*S2,rp.z*S2);x.rotate(-(FP.on?FP.yaw:rida.g.rotation.y));x.beginPath();x.moveTo(0,10);x.lineTo(7,-7);x.lineTo(0,-3);x.lineTo(-7,-7);x.closePath();x.fillStyle="#e8772e";x.fill();x.lineWidth=2.5;x.strokeStyle="#fff";x.stroke();x.restore();}}
function sheetBag(tab,keep){const tabs='<div class="tabs" role="tablist">'+[["kockice","Kockice"],["radionica","Radionica"],["vrt","Vrt"],["blago","Alati i blago"],["karta","Karta"]].map(t=>'<button role="tab" data-t="'+t[0]+'" aria-selected="'+(t[0]===tab)+'">'+t[1]+'</button>').join("")+'</div>';let body="";
  if(tab==="kockice"){const B=bag();const have=PALETTE.filter(p=>B[p[0]]>0);
    body=have.length?'<p class="muted">Dodirni kockicu da je staviš u ruku. Kopanjem i u radionici dobivaš nove.</p><div class="bagGrid">'+have.map(p=>'<button class="slot" data-k="'+p[0]+'" title="'+esc(TYPES[ID[p[0]]].n)+'"><img alt="" src="'+icon(ID[p[0]])+'"><span class="cnt">'+B[p[0]]+'</span><small>'+esc(TYPES[ID[p[0]]].n)+'</small></button>').join("")+'</div>':'<p class="muted">Torba je prazna. Iskopaj nešto!</p>';
    const mats=Object.keys(MATS).filter(k=>S.mats[k]>0);if(mats.length)body+='<h3>Materijali</h3><div class="matRow">'+mats.map(k=>'<span class="mat"><img alt="" src="'+itemIcon(k)+'"><b>'+S.mats[k]+'</b> '+esc(MATS[k].n)+'</span>').join("")+'</div>';}
  if(tab==="radionica"){const nb=nearBench();
    body='<div class="bench'+(nb?' ok':'')+'"><img alt="" src="'+icon(T.stol)+'"><span>'+(nb?"Radni stol je blizu. Možeš raditi sve.":"Bez radnog stola rade se samo jednostavne stvari. Jedan stoji kod knjižnice.")+'</span></div>';
    const groups=[["Osnovno",r=>r.out&&!r.bench&&!r.gate],["Alati",r=>r.tool],["Oprema za avanture",r=>r.gear],["Za gradnju",r=>r.out&&(r.bench||r.gate)]];
    for(const [gn,f] of groups){const list=RECIPES.filter(f).filter(r=>!recipeState(r).later);if(!list.length)continue;body+='<h3>'+gn+'</h3><div class="recipes">';
      for(const r of list){const st=recipeState(r);const outIcon=r.out?thingIcon(r.out[0]):r.tool?itemIcon(r.tool[0],r.tool[1]):itemIcon(r.gear);const ready=!st.lock&&!st.own&&canCraft(r)&&(!r.bench||nb);
        body+='<div class="recipe'+(st.own?' own':'')+(st.lock?' locked':'')+'"><img class="ri" alt="" src="'+outIcon+'"><div class="rb"><b>'+esc(r.n)+(r.out&&r.out[1]>1?' ×'+r.out[1]:'')+'</b>'+
          (st.lock?'<small>'+esc(st.lock)+'</small>':st.own?'<small>Već imaš</small>':'<div class="costs">'+costHTML(r)+'</div>')+(r.gear&&!st.own?'<small>'+esc(GEAR[r.gear].d)+'</small>':'')+'</div>'+
          (st.lock||st.own?'':'<button class="btn'+(ready?' green':' soft')+'" data-r="'+r.id+'"'+(ready?'':' aria-disabled="true"')+'>'+(r.bench&&!nb?'Uz stol':'Napravi')+'</button>')+'</div>';}
      body+='</div>';}}
  if(tab==="blago"){body='<h3>Alati</h3><div class="matRow">'+Object.keys(TOOLS).map(k=>{const t=S.tools[k]||0;return '<span class="mat'+(t?'':' dim')+'"><img alt="" src="'+itemIcon(k,t||1)+'"><b>'+(t?TIERS[t]:"Nemaš")+'</b> '+esc(TOOLS[k].n.toLowerCase())+'<small>'+esc(TOOLS[k].d)+'</small></span>';}).join("")+'</div>';
    body+='<h3>Oprema</h3><div class="matRow">'+Object.keys(GEAR).map(k=>'<span class="mat'+(S.gear[k]?'':' dim')+'"><img alt="" src="'+itemIcon(k)+'"><b>'+esc(GEAR[k].n)+'</b><small>'+(S.gear[k]?esc(GEAR[k].d):"Napravi u radionici")+'</small></span>').join("")+'</div>';
    const mats=Object.keys(MATS).filter(k=>!MATS[k].seed&&!MATS[k].farm);body+='<h3>Materijali</h3><div class="matRow">'+mats.map(k=>'<span class="mat'+(S.mats[k]?'':' dim')+'"><img alt="" src="'+itemIcon(k)+'"><b>'+(S.mats[k]||0)+'</b> '+esc(MATS[k].n)+'</span>').join("")+'</div>';
    body+='<h3>Istraživanje</h3><p class="muted">Otkrivena mjesta: <b>'+POI.filter(q=>S.poi[q.k]).length+' od '+POI.length+'</b> · Otvorene škrinje: <b>'+chestObjs.filter(c=>c.open).length+' od '+chestObjs.length+'</b> · Iskopano kockica: <b>'+S.mined+'</b></p>'+
      '<div class="poiList">'+POI.map(q=>'<span class="'+(S.poi[q.k]?'on':'')+'">'+(S.poi[q.k]?esc(q.n):'???')+'</span>').join("")+'</div>';}
  if(tab==="vrt")body=farmTabHTML();
  if(tab==="karta")body='<p class="muted">Narančasta strelica je Rida, ružičaste točke su blago, a žute neotvorene škrinje. Upitnici su mjesta koja još nisi otkrila.</p><canvas id="mapCv" class="mapcv" aria-label="Karta otoka"></canvas>';
  const sc=keep?$("sheet").scrollTop:0;openSheet('<h2>Torba</h2>'+tabs+body);if(keep)$("sheet").scrollTop=sc;
  $("sheetBody").querySelectorAll("[role=tab]").forEach(t=>t.onclick=()=>{sfx.click();sheetBag(t.dataset.t);});
  $("sheetBody").querySelectorAll(".bagGrid .slot").forEach(b=>b.onclick=()=>{const k=b.dataset.k;sfx.click();sel=ID[k];FP.hand=k;S.hot=[k].concat(S.hot.filter(h=>h!==k)).slice(0,7);save();hotbarRender();if(mode==="build")renderPalette();closeSheet();});
  $("sheetBody").querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>craft(b.dataset.r));if(tab==="karta")drawMap($("mapCv"));if(tab==="vrt")farmTabBind();}
