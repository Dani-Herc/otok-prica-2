/* =================== RIDA'S GARDEN: crops that grow while she reads =================== */
/* every crop grows a little by itself (up to 60%), and reading brings it the rest of the way: one page = one step for every plant */
const CROPS={
  mrkva:{n:"Mrkva",seed:"s_mrkva",need:16,st:["carrots_stage0","carrots_stage1","carrots_stage2","carrots_stage3"],out:"mrkva",y:[2,4]},
  krumpir:{n:"Krumpir",seed:"s_krumpir",need:20,st:["potatoes_stage0","potatoes_stage1","potatoes_stage2","potatoes_stage3"],out:"krumpir",y:[2,4]},
  cikla:{n:"Cikla",seed:"s_cikla",need:20,st:["beetroots_stage0","beetroots_stage1","beetroots_stage2","beetroots_stage3"],out:"cikla",y:[2,3]},
  bobice:{n:"Bobice",seed:"s_bobice",need:26,st:["sweet_berry_bush_stage0","sweet_berry_bush_stage1","sweet_berry_bush_stage2","sweet_berry_bush_stage3"],out:"bobice",y:[3,5],regrow:.55},
  bundeva:{n:"Bundeva",seed:"s_bundeva",need:34,st:["potatoes_stage1","beetroots_stage2","beetroots_stage2","beetroots_stage2"],block:"bundeva",y:[1,1]},
  lubenica:{n:"Lubenica",seed:"s_lubenica",need:34,st:["potatoes_stage1","beetroots_stage2","beetroots_stage2","beetroots_stage2"],block:"lubenica",y:[1,1]},
  svjetlo:{n:"Svjetlocvijet",seed:"s_svjetlo",need:48,st:["torchflower_crop_stage0","torchflower_crop_stage1","torchflower_crop_stage1","torchflower"],out:"svjetlocvijet",y:[1,2],glow:1}};
const SEED2CROP={};for(const k in CROPS)SEED2CROP[CROPS[k].seed]=k;
const cropStage=c=>{const C=CROPS[c.k];return c.g>=C.need?3:Math.min(2,Math.floor(c.g/C.need*3));};
const cropPct=c=>Math.min(100,Math.floor(c.g/CROPS[c.k].need*100));
/* ---- the starter garden: a raised bed with a little pool, lanterns on the corners and a scarecrow ---- */
const GARDEN={cells:[]};
function siteFrame(st){const dx=LIB.x-st.x,dz=LIB.z-st.z,l=Math.hypot(dx,dz)||1;const fx=Math.round(dx/l),fz=Math.round(dz/l);
  /* snap the facing to an axis so the beds line up with the blocks */
  const ax=Math.abs(dx)>Math.abs(dz);const F=ax?[Math.sign(dx),0]:[0,Math.sign(dz)];const R=[-F[1],F[0]];return {F,R,at:(u,v)=>[st.x+R[0]*u+F[0]*v,st.z+R[1]*u+F[1]*v]};}
function placeGarden(){const st=SITES.vrt,fr=siteFrame(st),h=st.h;GARDEN.cells=[];GARDEN.fr=fr;
  for(let v=-2;v<=2;v++)for(let u=-3;u<=3;u++){const [x,z]=fr.at(u,v);const edge=Math.abs(u)===3||Math.abs(v)===2;
    for(let y=h;y<h+4;y++)vox[I(x,y,z)]=0;
    vox[I(x,h-1,z)]=T.zemlja;
    if(edge){const cor=Math.abs(u)===3&&Math.abs(v)===2;vox[I(x,h,z)]=cor?T.drvo:T.sdaske;if(cor)vox[I(x,h+1,z)]=T.lampion;}
    else if(u===0&&v===0){vox[I(x,h,z)]=T.voda;baseWater.add(x+","+h+","+z);vox[I(x,h-1,z)]=T.glina;}
    else{vox[I(x,h,z)]=T.oranica;GARDEN.cells.push([x,h+1,z]);}}
  /* a scarecrow with a pumpkin head beside the bed */
  {const [x,z]=fr.at(4,-1);vox[I(x,h,z)]=T.sijeno;vox[I(x,h+1,z)]=T.bundeva;}
  {const [x,z]=fr.at(-4,1);vox[I(x,h,z)]=T.bacva;}
  POI.push({k:"vrt",n:"Ridin vrt",x:st.x+.5,z:st.z+.5,r:7});}
/* ---- crops in the world ---- */
const cropObjs=new Map();
const cropGeoC={};const cropGeo=(n,s)=>cropGeoC[n+s]||(cropGeoC[n+s]=plantGeo(n,s));
const regionMatC={};
function regionMat(name){if(regionMatC[name])return regionMatC[name];const r=REG[name]&&REG[name][0];const c=document.createElement("canvas");c.width=c.height=32;const x=c.getContext("2d");x.imageSmoothingEnabled=false;
  const draw=()=>{if(r&&atlasImg.naturalWidth){const W2=atlasImg.naturalWidth,H2=atlasImg.naturalHeight;x.drawImage(atlasImg,r[0]*W2,r[1]*H2,r[2]*W2/(r[4]||1),r[3]*H2/(r[5]||1),0,0,32,32);return true;}x.fillStyle="#d08a30";x.fillRect(0,0,32,32);return false;};
  const t=new THREE.CanvasTexture(c);if(!draw())atlasImg.addEventListener("load",()=>{draw();t.needsUpdate=true;});t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.colorSpace=THREE.SRGBColorSpace;return regionMatC[name]=new THREE.MeshStandardMaterial({map:t,roughness:.85});}
function gourd(k,sc){const C=CROPS[k];const side=regionMat(C.block==="bundeva"?"b_pumpkin_side":"b_melon_side"),top=regionMat(C.block==="bundeva"?"b_pumpkin_top":"b_melon_top");
  const m=new THREE.Mesh(new THREE.BoxGeometry(sc,sc,sc),[side,side,top,top,side,side]);m.castShadow=true;return m;}
const cropGlowMat=new THREE.SpriteMaterial({map:GLOW,color:0xffb050,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.55});
function cropMesh(c){const C=CROPS[c.k],s=cropStage(c);const g=new THREE.Group();g.position.set(c.x+.5,c.y,c.z+.5);g.userData.crop=c;
  const name=C.st[s];const sc=C.block?(s===0?.7:.95):(.62+s*.14);const m=new THREE.Mesh(cropGeo(name,sc),plantMat);m.rotation.y=hash2(c.x,c.z,5)*3;m.userData.crop=c;g.add(m);
  if(C.block&&s>=2){const fr=gourd(c.k,s===2?.42:.78);fr.position.set(.12,(s===2?.42:.78)/2,.1);fr.userData.crop=c;g.add(fr);}
  if(C.glow&&s===3){const sp=new THREE.Sprite(cropGlowMat);sp.scale.set(1.8,1.8,1);sp.position.y=.7;g.add(sp);}
  /* a ripe crop sparkles gently so she can see it is ready */
  if(s===3){const sp=new THREE.Sprite(ripeMat);sp.scale.set(.5,.5,1);sp.position.y=1.15;sp.userData.ripe=1;g.add(sp);}
  scene.add(g);return g;}
const ripeMat=new THREE.SpriteMaterial({map:GLOW,color:0xfff0a0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7});
function cropKey(c){return c.x+","+c.y+","+c.z;}
function cropRefresh(c){const key=cropKey(c);const old=cropObjs.get(key);if(old){scene.remove(old);const ti=tapObjs.indexOf(old);if(ti>=0)tapObjs.splice(ti,1);old.traverse(o=>{if(o.isMesh&&o.geometry&&!Object.values(cropGeoC).includes(o.geometry))o.geometry.dispose();});}
  if(S.farm.includes(c)){const g=cropMesh(c);g.userData.stage=cropStage(c);g.userData.onTap=()=>{if(FP.on)faceTo([c.x,c.y,c.z]);harvest(c);};cropObjs.set(key,g);tapObjs.push(g);}else cropObjs.delete(key);}
function buildCrops(){for(const [,g] of cropObjs){scene.remove(g);const ti=tapObjs.indexOf(g);if(ti>=0)tapObjs.splice(ti,1);}cropObjs.clear();for(const c of S.farm)cropRefresh(c);}
const cropAt=(x,y,z)=>S.farm.find(c=>c.x===x&&c.y===y&&c.z===z);
/* ---- growth ---- */
function farmTime(){const now=Date.now();let changed=false;
  for(const c of S.farm){const C=CROPS[c.k];if(!c.tg)c.tg=now;const mins=(now-c.tg)/60000;c.tg=now;if(mins<=0)continue;
    const add=Math.min(mins/6,Math.max(0,C.need*.6-(c.gt||0)));if(add>0){c.gt=(c.gt||0)+add;const s0=cropStage(c);c.g+=add;if(cropStage(c)!==s0)changed=true;}}
  if(changed){for(const c of S.farm){const g=cropObjs.get(cropKey(c));if(!g||g.userData.stage!==cropStage(c))cropRefresh(c);}}}
/* pages read: every plant grows by the same number of steps */
function farmRead(pages){if(!S.farm||!S.farm.length)return 0;let ripe=0;
  for(const c of S.farm){const was=cropStage(c);c.g=Math.min(CROPS[c.k].need,c.g+pages);if(cropStage(c)===3&&was!==3)ripe++;}
  for(const c of S.farm){const g=cropObjs.get(cropKey(c));if(!g||g.userData.stage!==cropStage(c))cropRefresh(c);}
  S.farmPages=(S.farmPages||0)+pages;return ripe;}
/* ---- planting and harvesting ---- */
function plantSeed(cell){const seed=FP.hand;const k=SEED2CROP[seed];if(!k)return false;if(!haveN(seed)){toast("Nemaš više: "+MATS[seed].n+".",2200);return true;}
  const [x,y,z]=cell.inside;const t=get(x,y,z);
  if(!(t===T.oranica||t===T.trava||t===T.zemlja)){toast(MATS[seed].n+" se sadi u zemlju, travu ili oranicu.",2600);sfx.click();return true;}
  if(get(x,y+1,z)||cropAt(x,y+1,z)){toast("Iznad mora biti slobodno mjesto.",2000);sfx.click();return true;}
  if(waterAt(x+.5,y+1.2,z+.5)){toast("Pod vodom ništa ne raste.",2000);return true;}
  if(t!==T.oranica){if(protectWhy([x,y,z])&&!GARDEN.cells.some(q=>q[0]===x&&q[2]===z)){toast(protectWhy([x,y,z]),2600);return true;}setV(x,y,z,T.oranica);S.edits[x+","+y+","+z]=T.oranica;}
  giveN(seed,-1);const c={k,x,y:y+1,z,g:0,gt:0,tg:Date.now(),d:today()};S.farm.push(c);cropRefresh(c);
  faceTo([x,y,z]);rida.hop=.5;burst(x+.5,y+1.1,z+.5,10,[[.55,.4,.25],[.4,.75,.3]],1.2,1.4,.5);tone(330,.06,"triangle",.03);tone(495,.08,"triangle",.03,.06);
  S.planted=(S.planted||0)+1;bump("plant",1);save();hotbarRender();
  if(S.planted===1)say(rida,"Posađeno! Biljka raste i sama, a svaka pročitana stranica pomaže joj da dozrije.",6500);
  return true;}
function harvest(c,silent){const C=CROPS[c.k];if(cropStage(c)<3){if(!silent){toast(C.n+" još raste: "+cropPct(c)+"%. Svaka pročitana stranica pomaže!",3000);sfx.click();}return null;}
  const n=C.y[0]+Math.floor(Math.random()*(C.y[1]-C.y[0]+1));const out=C.block||C.out;giveN(out,n);const seeds=C.regrow?0:(Math.random()<.45?2:1);if(seeds)giveN(C.seed,seeds);
  if(C.regrow){c.g=C.need*C.regrow;c.gt=Math.min(c.gt||0,C.need*.6);}else S.farm.splice(S.farm.indexOf(c),1);
  cropRefresh(c);S.harvested=(S.harvested||0)+n;bump("harvest",n);
  burst(c.x+.5,c.y+.6,c.z+.5,18,[[1,.85,.3],[.5,.9,.4],[1,1,1]],1.6,2,.7);
  if(!silent){sfx.chime();miniPop(thingIcon(out),"+"+n+" "+thingName(out)+(seeds?" · +"+seeds+" "+MATS[C.seed].n.toLowerCase():""));}
  save();return {out,n,seeds};}
/* a crop sits on the block below it: if that block goes, or something is placed in its cell, the plant comes back as a seed */
const _setVFarm=setV;
setV=function(x,y,z,t){_setVFarm(x,y,z,t);if(!S.farm||!S.farm.length)return;
  let c=cropAt(x,y+1,z);if(c&&t!==T.oranica){S.farm.splice(S.farm.indexOf(c),1);cropRefresh(c);giveN(cropStage(c)===3&&!CROPS[c.k].regrow?(CROPS[c.k].block||CROPS[c.k].out):CROPS[c.k].seed,1);}
  c=cropAt(x,y,z);if(c&&t){S.farm.splice(S.farm.indexOf(c),1);cropRefresh(c);giveN(CROPS[c.k].seed,1);}};
/* ---- first visit: a few seeds and a bed that is already sprouting ---- */
function farmInit(){if(!Array.isArray(S.farm))S.farm=[];
  if(!S.farmInit){S.farmInit=1;const pre=[["mrkva",.45],["mrkva",.3],["krumpir",.25],["mrkva",.95]];
    pre.forEach((p,i)=>{const q=GARDEN.cells[[1,3,5,8][i]];if(!q||cropAt(q[0],q[1],q[2]))return;S.farm.push({k:p[0],x:q[0],y:q[1],z:q[2],g:CROPS[p[0]].need*p[1],gt:CROPS[p[0]].need*Math.min(.6,p[1]),tg:Date.now(),d:today()});});
    giveN("s_mrkva",4);giveN("s_krumpir",3);giveN("s_bobice",2);giveN("s_bundeva",1);}
  /* the garden bed may have been edited by an old save: keep crops only where there is farmland */
  S.farm=S.farm.filter(c=>CROPS[c.k]&&get(c.x,c.y-1,c.z)===T.oranica&&!get(c.x,c.y,c.z));
  farmTime();buildCrops();}
let farmT=0,ripeT=0;
function tickFarm(dt,tt){farmT-=dt;if(farmT<=0){farmT=30;farmTime();}
  ripeT+=dt;for(const [,g] of cropObjs){for(const o of g.children)if(o.userData.ripe){o.position.y=1.12+Math.sin(tt*2.4+g.position.x)*.08;o.material.opacity=.45+Math.sin(tt*3+g.position.z)*.25;}}}
/* ---- pictures for seeds and produce ---- */
(function(){const packet=(col)=>(x,P,hi,ol)=>{P([[16,14],[48,14],[50,56],[14,56]],"#f3e3c0");x.fillStyle="#d8c08a";x.fillRect(16,14,32,8);x.lineWidth=3;x.strokeStyle=ol;x.strokeRect(16,14,32,8);
    x.fillStyle=col;x.beginPath();x.arc(32,38,9,0,7);x.fill();x.lineWidth=3;x.stroke();x.fillStyle="#4a9a3a";x.beginPath();x.ellipse(37,27,6,3,-.6,0,7);x.fill();x.stroke();};
  for(const k in MATS)if(MATS[k].seed)ITEM_DRAW[k]=packet(MATS[k].c);
  ITEM_DRAW.s_svjetlo=(x,P,hi,ol)=>{const g=x.createRadialGradient(32,34,2,32,34,26);g.addColorStop(0,"rgba(255,230,140,1)");g.addColorStop(1,"rgba(255,180,60,0)");x.fillStyle=g;x.fillRect(0,0,64,64);
    x.beginPath();x.ellipse(32,36,9,12,0,0,7);x.fillStyle="#ffcf5a";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();hi(28,31,3.5);};
  ITEM_DRAW.mrkva=(x,P,hi,ol)=>{P([[18,20],[30,16],[50,52]],"#f08a24");x.strokeStyle="rgba(120,50,0,.6)";x.lineWidth=2;x.beginPath();x.moveTo(28,26);x.lineTo(33,25);x.moveTo(33,34);x.lineTo(38,33);x.stroke();
    x.fillStyle="#4aa83a";x.strokeStyle=ol;x.lineWidth=3;[[16,10,-.9],[22,8,-.4],[12,16,-1.4]].forEach(a=>{x.beginPath();x.ellipse(a[0],a[1],8,3,a[2],0,7);x.fill();x.stroke();});};
  ITEM_DRAW.krumpir=(x,P,hi,ol)=>{x.beginPath();x.ellipse(32,34,20,15,-.3,0,7);x.fillStyle="#c8a060";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();x.fillStyle="#8a6a3a";[[24,30],[38,36],[30,42]].forEach(p=>{x.beginPath();x.arc(p[0],p[1],2,0,7);x.fill();});hi(24,26,4);};
  ITEM_DRAW.cikla=(x,P,hi,ol)=>{x.beginPath();x.arc(32,38,15,0,7);x.fillStyle="#a8304e";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();x.beginPath();x.moveTo(32,53);x.lineTo(34,60);x.stroke();
    x.fillStyle="#4aa83a";x.lineWidth=3;[[26,16,-.5],[38,14,.5]].forEach(a=>{x.beginPath();x.ellipse(a[0],a[1],5,9,a[2],0,7);x.fill();x.stroke();});hi(26,33,4);};
  ITEM_DRAW.bobice=(x,P,hi,ol)=>{x.fillStyle="#4aa83a";x.strokeStyle=ol;x.lineWidth=3;x.beginPath();x.ellipse(40,16,10,5,-.5,0,7);x.fill();x.stroke();
    [[24,36],[38,38],[30,48],[22,24]].forEach(p=>{x.beginPath();x.arc(p[0],p[1],8,0,7);x.fillStyle="#d02840";x.fill();x.lineWidth=3.5;x.stroke();hi(p[0]-2,p[1]-2,2);});};
  ITEM_DRAW.svjetlocvijet=(x,P,hi,ol)=>{const g=x.createRadialGradient(32,28,2,32,28,28);g.addColorStop(0,"rgba(255,220,120,.9)");g.addColorStop(1,"rgba(255,160,60,0)");x.fillStyle=g;x.fillRect(0,0,64,64);
    x.strokeStyle=ol;x.lineWidth=4;x.beginPath();x.moveTo(32,34);x.lineTo(32,58);x.stroke();x.strokeStyle="#3a8a2a";x.lineWidth=2;x.stroke();
    for(let i=0;i<6;i++){const a=i/6*6.283;x.beginPath();x.ellipse(32+Math.cos(a)*10,28+Math.sin(a)*10,7,4,a,0,7);x.fillStyle=i%2?"#ff9a3a":"#ffcf4a";x.fill();x.lineWidth=2.5;x.strokeStyle=ol;x.stroke();}
    x.beginPath();x.arc(32,28,5,0,7);x.fillStyle="#7a3a10";x.fill();};
  ITEM_DRAW.riba=(x,P,hi,ol)=>{x.beginPath();x.ellipse(30,32,18,11,0,0,7);x.fillStyle="#7ab0d8";x.fill();x.lineWidth=4;x.strokeStyle=ol;x.stroke();P([[46,32],[58,22],[58,42]],"#5a90c0");x.fillStyle=ol;x.beginPath();x.arc(20,29,2.5,0,7);x.fill();hi(26,26,3);};})();

/* ---- the Vrt tab in the bag ---- */
function farmTabHTML(){const ripe=S.farm.filter(c=>cropStage(c)===3);
  let h='<div class="earn farmnote"><img alt="" src="'+itemIcon("mrkva")+'"><span>Biljke rastu i same do pola puta. Do kraja ih dovede <b>čitanje</b>: svaka pročitana stranica je jedan korak za svaku biljku u vrtu.</span></div>';
  if(!S.farm.length)h+='<p class="muted">Vrt je prazan. Pokreni <b>Istraži</b>, uzmi sjeme u šapu i dodirni zemlju ili travu.</p>';
  else{h+='<h3>U vrtu raste</h3><div class="crops">'+S.farm.map(c=>{const C=CROPS[c.k],p=cropPct(c),out=C.block||C.out;return '<div class="crop'+(p>=100?' ripe':'')+'"><img alt="" src="'+thingIcon(out)+'"><b>'+esc(C.n)+'</b><div class="prog"><i style="width:'+p+'%"></i></div><small>'+(p>=100?"Zrelo! Uberi":p+"%")+'</small></div>';}).join("")+'</div>';
    if(ripe.length)h+='<button class="btn big green" id="harvAll">Uberi sve zrelo ('+ripe.length+')</button>';}
  const seeds=Object.keys(MATS).filter(k=>MATS[k].seed&&S.mats[k]>0);
  h+='<h3>Sjeme</h3>'+(seeds.length?'<div class="matRow seeds">'+seeds.map(k=>'<button class="mat seedb" data-s="'+k+'"><img alt="" src="'+itemIcon(k)+'"><b>'+S.mats[k]+'</b> '+esc(MATS[k].n)+'<small>'+(FP.on?"Uzmi u šapu":"Sadi se u istraživanju")+'</small></button>').join("")+'</div>':'<p class="muted">Nemaš sjemena. Kupi ga kod svrake Sjajke na tržnici ili uberi zrele biljke.</p>');
  const prod=Object.keys(MATS).filter(k=>MATS[k].farm&&S.mats[k]>0);const blocks=["bundeva","lubenica"].filter(k=>bag()[k]>0);
  if(prod.length||blocks.length)h+='<h3>Ubrano</h3><div class="matRow">'+prod.map(k=>'<span class="mat"><img alt="" src="'+itemIcon(k)+'"><b>'+S.mats[k]+'</b> '+esc(MATS[k].n)+'</span>').join("")+blocks.map(k=>'<span class="mat"><img alt="" src="'+icon(ID[k])+'"><b>'+bag()[k]+'</b> '+esc(TYPES[ID[k]].n)+'</span>').join("")+'</div><p class="muted">Plodove možeš prodati na tržnici ili njima nahraniti životinje.</p>';
  h+='<p class="muted">Ukupno ubrano: <b>'+(S.harvested||0)+'</b> · Stranica za vrt: <b>'+(S.farmPages||0)+'</b></p>';return h;}
function farmTabBind(){const b=$("harvAll");if(b)b.onclick=()=>{let n=0;const got={};for(const c of S.farm.slice()){if(cropStage(c)<3)continue;const r=harvest(c,true);if(r){n+=r.n;got[r.out]=(got[r.out]||0)+r.n;}}
    sfx.fanfare();toast("Ubrano: "+Object.keys(got).map(k=>got[k]+" × "+thingName(k)).join(", "),3800);sheetBag("vrt",true);};
  $("sheetBody").querySelectorAll(".seedb").forEach(e=>e.onclick=()=>{const k=e.dataset.s;sfx.click();if(!FP.on){toast("Pokreni Istraži i Rida će posaditi sjeme gdje dodirneš zemlju.",3200);return;}
    FP.hand=k;S.hot=[k].concat(S.hot.filter(h=>h!==k)).slice(0,7);save();hotbarRender();closeSheet();toast("Dodirni zemlju, travu ili oranicu i Rida će posaditi "+MATS[k].n.toLowerCase()+".",3200);});}

/* version 10 moved the ground around the new garden and market: blocks placed there go back into the bag */
function migrateWorld10(){if((S.worldV||0)>=10)return;const B=S.bag;const near=(x,z)=>[SITES.vrt,SITES.trznica].some(q=>Math.hypot(x-q.x,z-q.z)<11)||Math.hypot(x-114,z-90)<10;
  for(const k in S.edits||{}){const p=k.split(",").map(Number);if(!near(p[0],p[2]))continue;const t=S.edits[k];if(B&&t&&TYPES[t]&&!TYPES[t].water)B[TYPES[t].k]=(B[TYPES[t].k]||0)+1;delete S.edits[k];}
  S.worldV=10;save();}
