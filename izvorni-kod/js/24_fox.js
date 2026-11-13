/* =================== RIDA, THIRD PERSON =================== */
/* the player becomes Rida: walk, hop up single blocks, swim, dive, sail. Drag to look around, tap a block to place,
   hold on a block to dig it. Rida herself is the avatar, so there is only ever one fox on the island. */
var FP={on:false,p:new THREE.Vector3(),v:new THREE.Vector3(),yaw:0,ground:false,safe:new THREE.Vector3(),safeT:0,keys:{},joy:{x:0,y:0,id:null},jump:false,diveB:false,upB:false,
  cam:{yaw:0,pitch:.36,tdist:6.5,cur:6.5},camT:new THREE.Vector3(),swim:false,under:false,breath:9,stamina:8,boat:false,boatPark:null,boatCD:0,last:null,step:0,walk:0,
  dig:null,hand:"",gest:null,hover:null,mouse:null,lampK:0,tired:false,warned:0,ptrs:new Map(),pinch:null,moveK:0};
const FR=.3,FHT=1.15,REACH=5.6;
const fpTouch=()=>matchMedia("(pointer:coarse)").matches||navigator.maxTouchPoints>0;
function solidAt(x,y,z){const t=get(Math.floor(x),Math.floor(y),Math.floor(z));return !!t&&!TYPES[t].water;}
function hitsAt(px,py,pz){for(const dx of [-FR,FR])for(const dz of [-FR,FR])for(const dy of [.02,FHT*.5,FHT-.02]){if(solidAt(px+dx,py+dy,pz+dz))return true;}
  for(const c of chestObjs)if(!c.open&&Math.abs(c.x-px)<.75&&Math.abs(c.z-pz)<.65&&py<c.y+.8&&py+FHT>c.y)return true;return false;}
function waterAt(x,y,z){const t=get(Math.floor(x),Math.floor(y),Math.floor(z));if(t){if(TYPES[t].water&&FALLS.size&&FALLS.has(Math.floor(x)+","+Math.floor(y)+","+Math.floor(z)))return false;return !!TYPES[t].water;}return y<WATER&&y>=0;}
function waterTop(x,y,z){let Y=Math.floor(y);while(Y<H&&waterAt(x,Y+.5,z))Y++;const t=get(Math.floor(x),Y-1,Math.floor(z));return t&&TYPES[t].water?Y-1+.86:WATER;}
function floorY(x,y,z){x=Math.floor(x);z=Math.floor(z);if(x<0||z<0||x>=W||z>=W)return -1;for(let Y=Math.min(H-1,Math.floor(y));Y>=0;Y--){const t=vox[I(x,Y,z)];if(t&&!TYPES[t].glass&&!TYPES[t].water)return Y;}return -1;}
const breathMax=()=>(S.gear&&S.gear.maska?45:9)*(S.perks&&S.perks.dah?1.5:1),stamMax=()=>8;
function fpStartSpot(){const c=[LIB.x+.5,LIB.z+12];for(let r=1.5;r<12;r+=.5)for(let a=0;a<6.28;a+=.4){const x=c[0]+Math.cos(a)*r,z=c[1]+Math.sin(a)*r;const y=topY(x,z);if(y<SL)continue;
  const t=vox[I(Math.floor(x),y,Math.floor(z))];if(TYPES[t].leaf||TYPES[t].water)continue;if(hitsAt(x,y+1,z))continue;return new THREE.Vector3(x,y+1,z);}return new THREE.Vector3(LIB.x+.5,LIB.h+.01,LIB.z+12);}
/* Rida's little tools and lantern, shown in her mouth while she works */
const foxTool=new THREE.Group();const foxLamp=new THREE.Group();
(function(){const wood=new THREE.MeshStandardMaterial({color:LC(0x8a5a32),roughness:.8});const handle=new THREE.Mesh(new THREE.BoxGeometry(.05,.05,.5),wood);handle.position.z=.12;foxTool.add(handle);
  const headM=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.5,metalness:.2});foxTool.userData.headM=headM;
  const pk=new THREE.Mesh(new THREE.BoxGeometry(.42,.07,.07),headM);pk.position.z=.36;const sh=new THREE.Mesh(new THREE.BoxGeometry(.16,.03,.2),headM);sh.position.z=.44;const ax=new THREE.Mesh(new THREE.BoxGeometry(.05,.18,.16),headM);ax.position.set(0,.06,.34);
  foxTool.userData.heads={kramp:pk,lopata:sh,sjekira:ax};foxTool.add(pk,sh,ax);foxTool.visible=false;
  const lm=new THREE.MeshStandardMaterial({color:LC(0xffe2a0),emissive:LC(0xffb84a),emissiveIntensity:1.6});const lb=new THREE.Mesh(new THREE.BoxGeometry(.13,.16,.13),lm);lb.position.y=-.12;
  const cap=new THREE.Mesh(new THREE.BoxGeometry(.15,.04,.15),new THREE.MeshStandardMaterial({color:0x2c2a30}));cap.position.y=-.02;foxLamp.add(lb,cap);
  const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffc870,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.6}));gl.scale.set(1.6,1.6,1);gl.position.y=-.12;foxLamp.add(gl);foxLamp.visible=false;})();
let boatMesh=null;
function makeBoat(){const g=new THREE.Group();const dk=std(0x5e3a20),md=std(0x9a6a3c),lt=std(0xc99a60),rp=std(0xe8dcc0);
  const box=(w,h,d,m,x,y,z,ry)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);if(ry)b.rotation.y=ry;g.add(b);return b;};
  /* a little rowing boat: planked hull, pointed bow, dark rim, a bench and oars */
  box(1.1,.12,2.2,dk,0,-.1,0);box(.66,.12,.5,dk,0,-.1,1.32);box(.3,.12,.3,dk,0,-.1,1.62);
  for(const s of [-1,1]){box(.12,.66,2.2,md,s*.6,.17,0);box(.18,.07,2.26,dk,s*.6,.52,0);box(.125,.05,2.2,lt,s*.6,.3,0);
    const a=-s*.723;box(.12,.66,.96,md,s*.3,.17,1.44,a);box(.18,.07,1,dk,s*.3,.52,1.44,a);box(.125,.05,.96,lt,s*.3,.3,1.44,a);}
  box(1.32,.66,.12,md,0,.17,-1.1);box(1.38,.07,.18,dk,0,.52,-1.1);box(.16,.78,.16,dk,0,.24,1.8);
  box(1.08,.05,2.16,lt,0,.2,0);box(1.1,.07,.34,lt,0,.36,-.62);box(.9,.06,.06,rp,0,.6,-1.18);
  for(const s of [-1,1]){const oar=new THREE.Group();const sh=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,1.6),lt);oar.add(sh);const bl=new THREE.Mesh(new THREE.BoxGeometry(.04,.22,.42),md);bl.position.z=-.82;oar.add(bl);
    oar.position.set(s*.86,.46,-.2);oar.rotation.set(-.12,s*.42,s*.28);g.add(oar);}
  g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});g.visible=false;scene.add(g);return g;}
function startSquirrel(){if(!rida)return;closeSheet();enterGame("squirrel");G2.cam=true;FP.on=true;$("gameUI").hidden=true;$("fpUI").hidden=false;document.body.classList.add("fp");$("fpUI").classList.toggle("touch",fpTouch());
  rida.frozen=true;rida.goto=null;rida.arrive=null;rida.tx=null;rida.celebrate=0;
  let p=new THREE.Vector3(rida.x,rida.y,rida.z);if(hitsAt(p.x,p.y,p.z)||waterAt(p.x,p.y+.5,p.z)||Math.hypot(p.x-LIB.x-.5,p.z-LIB.z-.5)<8)p=fpStartSpot();
  FP.p.copy(p);FP.safe.copy(p);FP.v.set(0,0,0);
  /* start with the camera where there is the most open space, Rida facing away from it */
  let best=0,by=0;for(let i=0;i<16;i++){const a=i*Math.PI/8;let d=0;for(let t=.5;t<9;t+=.5){if(solidAt(p.x+Math.sin(a)*t*.93,p.y+1.05+t*.35,p.z+Math.cos(a)*t*.93))break;d=t;}
    const toLib=Math.atan2(LIB.x+.5-p.x,LIB.z+.5-p.z);const score=d+Math.cos(a-(toLib+Math.PI))*1.5;if(score>best){best=score;by=a;}}
  FP.cam.yaw=by;FP.yaw=by+Math.PI;FP.cam.pitch=.36;FP.cam.cur=FP.cam.tdist;FP.camT.set(p.x,p.y+1.05,p.z);
  FP.keys={};FP.joy.x=FP.joy.y=0;FP.joy.id=null;FP.gest=null;FP.dig=null;FP.ptrs.clear();FP.breath=breathMax();FP.stamina=stamMax();FP.boat=false;FP.boatPark=null;
  if(!boatMesh)boatMesh=makeBoat();const hd=rida.g.userData.parts.head;if(hd&&foxTool.parent!==hd){hd.add(foxTool);foxTool.position.set(.1,-.12,.3);hd.add(foxLamp);foxLamp.position.set(0,-.26,.32);}
  plantU.uFPk.value=1;camera.near=.1;camera.fov=innerWidth<innerHeight?72:60;camera.updateProjectionMatrix();flight=null;ghost.visible=false;hotbarRender();fpUI();sfx.chime();
  if(!S.foxSeen){S.foxSeen=1;save();
    toast((fpTouch()?"Lijevim krugom vodiš Ridu, povlačenjem prsta okrećeš pogled, a žutim gumbom skačeš.":"W A S D ili strelice vode Ridu, razmaknica skače, a povlačenjem miša okrećeš pogled.")+" Rida sama skače na jednu kockicu.",8000);
    setTimeout(()=>{if(FP.on)toast("Drži prst (ili tipku miša) na kockici i Rida će je iskopati. Kratki dodir postavlja kockicu iz ruke.",8000);},8500);
    setTimeout(()=>{if(FP.on)say(rida,"Uz knjižnicu je radni stol. Otvori torbu, napravi drveni kramp i idemo kopati!",7000);},17500);}
  else toast(S.spawns.length?"Strelica gore pokazuje put do najbližeg blaga.":"Danas je sve blago pronađeno. Istraži špilju, more i daleke otoke!",3500);}
function endSquirrel(){if(!FP.on)return;FP.on=false;plantU.uFPk.value=0;stopDig();$("fpUI").hidden=true;document.body.classList.remove("fp");camera.near=.5;ghost.visible=false;ghost.children[0].visible=true;
  foxTool.visible=false;foxLamp.visible=false;if(boatMesh)boatMesh.visible=false;voxU.uLamp.value.w=0;
  const p=(FP.swim||FP.boat)?FP.safe:FP.p;rida.x=p.x;rida.y=p.y;rida.z=p.z;rida.frozen=false;rida.g.rotation.set(0,FP.yaw,0);entShade(rida,1);if(rida.fadeA!=null&&rida.fadeA<1){rida.fadeA=1;rida.g.traverse(o=>{if(o.isMesh&&o.material){o.material.transparent=false;o.material.opacity=1;o.material.depthWrite=true;}});}
  exitGame();resize();const tg=p.clone();controls.target.copy(tg);if(controls.want)controls.want.copy(tg);
  flight={from:{t:tg.clone(),p:camera.position.clone()},t:tg,p:tg.clone().add(new THREE.Vector3(Math.sin(FP.cam.yaw)*22,16,Math.cos(FP.cam.yaw)*22)),k:0,d:1.6};}
function fpTools(){hotbarRender();}
function fpUI(){const n=S.spawns.length;$("fpInfo").innerHTML=n?"Blago: <b>"+n+"</b>":"Sve blago je pronađeno";}
function nearestTreasure(){let best=null,bd=1e9;for(const tr of treasures){if(tr.leaving)continue;const d=Math.hypot(tr.g.position.x-FP.p.x,tr.g.position.z-FP.p.z);if(d<bd){bd=d;best=tr;}}return best?{tr:best,d:bd}:null;}
/* which block lies under a screen point: walk the grid along the view ray */
const pickRay=new THREE.Raycaster(),pickV=new THREE.Vector2();
function pickCell(sx,sy,forPlace){const r=renderer.domElement.getBoundingClientRect();pickV.set(((sx-r.left)/r.width)*2-1,-((sy-r.top)/r.height)*2+1);pickRay.setFromCamera(pickV,camera);
  const o=pickRay.ray.origin,d=pickRay.ray.direction;const head=new THREE.Vector3(FP.p.x,FP.p.y+.9,FP.p.z);const max=FP.cam.cur+REACH+3;
  let ts=1e9;if(d.y<-1e-4&&o.y>WATER){ts=(WATER-o.y)/d.y;}
  let x=Math.floor(o.x),y=Math.floor(o.y),z=Math.floor(o.z);const sxn=Math.sign(d.x),syn=Math.sign(d.y),szn=Math.sign(d.z);
  const tdx=Math.abs(1/d.x),tdy=Math.abs(1/d.y),tdz=Math.abs(1/d.z);let tx=(sxn>0?x+1-o.x:o.x-x)*tdx,ty=(syn>0?y+1-o.y:o.y-y)*tdy,tz=(szn>0?z+1-o.z:o.z-z)*tdz;
  for(let i=0;i<90;i++){const px=x,py=y,pz=z;let t;if(tx<ty&&tx<tz){x+=sxn;t=tx;tx+=tdx;}else if(ty<tz){y+=syn;t=ty;ty+=tdy;}else{z+=szn;t=tz;tz+=tdz;}
    if(t>max||t>ts)break;const b=get(x,y,z);if(b&&!TYPES[b].water){const far=Math.hypot(x+.5-head.x,y+.5-head.y,z+.5-head.z)>REACH;return {inside:[x,y,z],out:[px,py,pz],far,t};}}
  /* the open sea close to the shore: offer the cell at water level so a bridge grows plank by plank */
  if(ts<max){const hx=o.x+d.x*ts,hz=o.z+d.z*ts;const cx=Math.floor(hx),cz=Math.floor(hz),Y=SL+2;const ax=Math.abs(d.x)>Math.abs(d.z);
    const cands=[[cx,cz],ax?[cx-Math.sign(d.x),cz]:[cx,cz-Math.sign(d.z)],ax?[cx,cz-Math.sign(d.z)]:[cx-Math.sign(d.x),cz]];
    for(const c of cands){if(c[0]<0||c[1]<0||c[0]>=W||c[1]>=W)continue;if(get(c[0],Y,c[1]))continue;
      if(solidAt(c[0]+1.5,Y+.5,c[1]+.5)||solidAt(c[0]-.5,Y+.5,c[1]+.5)||solidAt(c[0]+.5,Y+.5,c[1]+1.5)||solidAt(c[0]+.5,Y+.5,c[1]-.5)||solidAt(c[0]+.5,Y-.5,c[1]+.5)){
        const far=Math.hypot(c[0]+.5-head.x,Y+.5-head.y,c[1]+.5-head.z)>REACH;return {sea:true,out:[c[0],Y,c[1]],far,t:ts};}}}
  return null;}
function fpOverlap(c){return c[0]<FP.p.x+FR&&c[0]+1>FP.p.x-FR&&c[2]<FP.p.z+FR&&c[2]+1>FP.p.z-FR&&c[1]<FP.p.y+FHT&&c[1]+1>FP.p.y;}
/* tap: talk, open, place */
function fpTap(sx,sy){if(FP.shopping)return;const r=renderer.domElement.getBoundingClientRect();pickV.set(((sx-r.left)/r.width)*2-1,-((sy-r.top)/r.height)*2+1);pickRay.setFromCamera(pickV,camera);
  const objs=ents.filter(e=>e!==rida&&e.g.visible).map(e=>e.g).concat(chestObjs.map(c=>c.g)).concat(tapObjs.filter(o=>o.visible));if(bottle)objs.push(bottle);const h=pickRay.intersectObjects(objs,true)[0];
  const cell=pickCell(sx,sy,true);
  if(h&&(!cell||h.distance<cell.t+.3)){let o=h.object;while(o&&!o.userData.ent&&!o.userData.bottle&&!o.userData.chest&&!o.userData.onTap)o=o.parent;
    if(o&&o.userData.onTap){const wp=o.getWorldPosition(new THREE.Vector3());if(Math.hypot(wp.x-FP.p.x,wp.z-FP.p.z)>REACH+1.5){toast("Priđi bliže!",1600);sfx.click();return;}o.userData.onTap();return;}
    if(o&&o.userData.chest){const c=o.userData.chest;if(Math.hypot(c.x-FP.p.x,c.z-FP.p.z)>REACH){toast("Priđi bliže škrinji!",1800);return;}openChest(c);return;}
    if(o&&o.userData.bottle){openLetter();return;}
    if(o&&o.userData.ent){const en=o.userData.ent;sfx.click();if(typeof animalTap==="function"&&animalTap(en,true))return;const V=VISITORS.find(v=>v.k===en.kind);say(en,V?V.d:"Bok!",4500);en.celebrate=.6;bump("greet",1);return;}}
  if(!cell)return;if(cell.far){toast("Predaleko! Priđi bliže.",1600);sfx.click();return;}
  const tb=cell.inside?get(...cell.inside):0;
  /* the garden: tap a plant to pick it, tap soil with a seed in the paw to sow */
  if(!cell.sea){const ci=cell.inside,co=cell.out;const cr=(co&&cropAt(co[0],co[1],co[2]))||(ci&&cropAt(ci[0],ci[1]+1,ci[2]));if(cr){faceTo([cr.x,cr.y,cr.z]);harvest(cr);return;}
    if(FP.hand&&MATS[FP.hand]&&MATS[FP.hand].seed){plantSeed(cell);return;}}
  if(tb===T.stol&&!FP.hand){sheetBag("radionica");return;}
  if(!FP.hand){toast(fpTouch()?"Drži prst na kockici i Rida će je iskopati. Za gradnju odaberi kockicu dolje.":"Drži tipku miša na kockici i Rida će je iskopati. Za gradnju odaberi kockicu dolje (1-8).",3600);sfx.click();return;}
  if(fpOverlap(cell.out)){toast("Tu stoji Rida! Odaberi malo dalje.",1800);sfx.click();return;}
  for(const c of chestObjs)if(Math.floor(c.x)===cell.out[0]&&Math.floor(c.z)===cell.out[2]&&Math.abs(c.y-cell.out[1])<1){sfx.click();return;}
  sel=ID[FP.hand];if(placeAt(cell.out)){faceTo(cell.out);rida.hop=.6;hotbarRender();}}
function faceTo(c){FP.yaw=Math.atan2(c[0]+.5-FP.p.x,c[2]+.5-FP.p.z);}
/* digging */
const CRACKS=(()=>{const a=[];const R=(()=>{let s=99;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};})();const lines=[];
  for(let i=0;i<26;i++){let x=16,y=16;const a2=R()*6.283;const L=[];for(let k=0;k<5+R()*6;k++){x+=Math.cos(a2+(R()-.5)*1.6)*3;y+=Math.sin(a2+(R()-.5)*1.6)*3;L.push([x,y]);}lines.push(L);}
  for(let s=0;s<9;s++){const c=document.createElement("canvas");c.width=c.height=32;const x=c.getContext("2d");x.strokeStyle="rgba(20,16,12,.85)";x.lineWidth=1.3;x.lineCap="square";
    const n=Math.round((s+1)/9*lines.length);for(let i=0;i<n;i++){const L=lines[i];const len=Math.max(2,Math.round(L.length*Math.min(1,(s+2)/7)));x.beginPath();x.moveTo(16,16);for(let k=0;k<len;k++)x.lineTo(L[k][0],L[k][1]);x.stroke();}
    const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;a.push(t);}return a;})();
const crackMesh=new THREE.Mesh(new THREE.BoxGeometry(1.012,1.012,1.012),new THREE.MeshBasicMaterial({map:CRACKS[0],transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,opacity:.9}));crackMesh.visible=false;crackMesh.renderOrder=4;scene.add(crackMesh);
function stopDig(){FP.dig=null;crackMesh.visible=false;foxTool.visible=false;}
function tickDig(dt){const g=FP.gest;const hold=!FP.shopping&&((g&&g.hold)||(FP.mouse&&FP.mouse.hold));if(!hold){if(FP.dig)stopDig();return;}
  const pt=g&&g.hold?g:FP.mouse;const c=pickCell(pt.x,pt.y);if(!c||c.sea||c.far){if(FP.dig)stopDig();if(c&&c.far&&!pt.farT){pt.farT=1;toast("Predaleko! Priđi bliže.",1500);}return;}
  const key=c.inside.join(",");const t=get(...c.inside);
  if(!FP.dig||FP.dig.key!==key){const why=protectWhy(c.inside);if(why){if(!pt.warned){pt.warned=1;toast(why,3200);sfx.click();}stopDig();return;}
    const info=breakInfo(t);if(!info.ok){if(!pt.warned){pt.warned=1;toast(TYPES[t].n+": treba "+(info.need>1?TIERS[info.need].toLowerCase()+" ili bolji ":"")+"kramp. Napravi ga u radionici!",3600);sfx.click();}stopDig();return;}
    FP.dig={key,c:c.inside,t:0,need:Math.max(.12,info.s*(S.perks&&S.perks.kramp?.7:1)),tool:info.tool,tier:info.tier,pt:0};}
  const D=FP.dig;D.t+=dt;D.pt-=dt;faceTo(D.c);const k=Math.min(.999,D.t/D.need);crackMesh.visible=true;crackMesh.position.set(D.c[0]+.5,D.c[1]+.5,D.c[2]+.5);crackMesh.material.map=CRACKS[Math.min(8,Math.floor(k*9))];
  if(D.tool){foxTool.visible=true;for(const n in foxTool.userData.heads)foxTool.userData.heads[n].visible=n===D.tool;foxTool.userData.headM.color.set(TIERC[D.tier]||"#ffffff");}else foxTool.visible=false;
  if(D.pt<=0){D.pt=.16;burst(D.c[0]+.5,D.c[1]+.6,D.c[2]+.5,4,[avgColor(t)],1.2,1.6,.4);tone(D.tool==="kramp"?520+Math.random()*80:D.tool==="sjekira"?260+Math.random()*50:180+Math.random()*60,.04,"square",.02);}
  if(D.t>=D.need){mineBlock(D.c);FP.dig=null;crackMesh.visible=false;if(pt)pt.warned=0;}}
const tmpTarget=new THREE.Vector3();
/* the main tick */
function tickSquirrel(dt){if(!FP.on)return;dt=Math.min(dt,.05);const busy=!$("veil").hidden||!!FP.shopping||!!window.RWON;
  const k=busy?{}:FP.keys;let mx=(k.d||k.arrowright?1:0)-(k.a||k.arrowleft?1:0),mz=(k.w||k.arrowup?1:0)-(k.s||k.arrowdown?1:0);
  if(FP.joy.id!=null&&!busy){mx=FP.joy.x;mz=-FP.joy.y;}if(FP.padM&&!busy){mx=FP.padM.x;mz=-FP.padM.y;}let len=Math.hypot(mx,mz);if(len>1){mx/=len;mz/=len;len=1;}
  const cy=FP.cam.yaw;const fx=-Math.sin(cy),fz=-Math.cos(cy),rx=Math.cos(cy),rz=-Math.sin(cy);
  let wx=rx*mx+fx*mz,wz=rz*mx+fz*mz;
  const P=FP.p,V=FP.v;
  const swim=waterAt(P.x,P.y+.55,P.z)&&!FP.boat;const wasSwim=FP.swim;FP.swim=swim;
  if(swim&&!wasSwim){burst(P.x,waterTop(P.x,P.y,P.z),P.z,16,[[.8,.93,1],[1,1,1]],1.6,2,.5);sfx.splash();}
  const colTop=floorY(P.x,P.y+1,P.z);const deep=swim&&colTop<WATER-1.6&&waterAt(P.x,P.y+.5,P.z)&&!get(Math.floor(P.x),Math.floor(P.y+.5),Math.floor(P.z));
  /* boat */
  FP.boatCD=Math.max(0,FP.boatCD-dt);
  if(!FP.boat&&S.gear&&S.gear.camac&&!S.boatOff&&deep&&!k.c&&!FP.diveB&&FP.boatCD<=0&&P.y>WATER-1.3&&(!FP.boatPark||FP.boatPark.distanceTo(P)<2.2)){FP.boat=true;FP.boatPark=null;P.y=WATER-.2;V.y=0;sfx.pop();if(!S.boatSeen){S.boatSeen=1;save();toast("Rida je sjela u čamac! Sad može ploviti do dalekih otoka.",4200);}}
  const run=(k.shift||FP.padRun)?1.45:(FP.joy.id!=null&&len>.93)?1.3:1;const M=FP.mount;let sp=FP.boat?6.6:swim?2.5*(FP.swimMul||1):4.6*run;
  if(M){if(M.air)sp=M.speed*(k.shift?1.3:1);else if(swim)sp=M.water?M.speed:2.5;else sp=M.land?M.speed*(k.shift?1.2:1):(M.slow||2.2);}sp*=(FP.spMul||1)*(M?1:(FP.charSp||1));
  let acc=FP.boat?3:swim?5:FP.ground?16:6;if(M&&M.air)acc=4;else if(M&&M.land&&FP.ground)acc=10;acc*=FP.accMul||1;V.x+=(wx*sp-V.x)*Math.min(1,acc*dt);V.z+=(wz*sp-V.z)*Math.min(1,acc*dt);
  const jumpK=(k[" "]||FP.jump)&&!busy;const diveK=(k.c||k.control||FP.diveB)&&!busy;const upK=(k[" "]||FP.upB)&&!busy;
  if(M&&M.air){V.y+=((upK?5.5:diveK?-5.5:0)-V.y)*Math.min(1,dt*4);FP.ground=false;}
  else if(FP.boat){V.y=0;P.y+=(WATER-.2-P.y)*Math.min(1,dt*8);if(diveK){FP.boat=false;FP.boatPark=P.clone();FP.boatPark.y=WATER-.2;FP.boatCD=1.2;V.y=-2;sfx.splash();}}
  else if(swim){const top=waterTop(P.x,P.y,P.z);const want=top-.62;const under=P.y+.95<top-.05;
    if(M&&M.leap&&upK&&!under&&performance.now()>(FP.leapCD||0)){V.y=9.5;FP.leapCD=performance.now()+900;sfx.splash();burst(P.x,top,P.z,24,[[.8,.93,1],[1,1,1]],2,3,.7);}
    else if(diveK&&(FP.breath>.5||(M&&M.water))){V.y+=(-2.6*(FP.vMul||1)-V.y)*Math.min(1,dt*5);}
    else if(upK&&under){V.y+=(3*(FP.vMul||1)-V.y)*Math.min(1,dt*5);}
    else if(FP.neutral&&under){V.y-=V.y*Math.min(1,dt*2.5);}else{V.y+=((want-P.y)*7-V.y*3)*dt;}
    if(FP.breath<=0&&V.y<3)V.y=3.2;}
  else{const gl=FP.glide&&V.y<0&&upK&&!M;FP.gliding=gl;const G=gl?9:26;V.y-=G*dt;if(V.y<-24)V.y=-24;if(gl&&V.y<-2.2)V.y=-2.2;
    if(FP.ground){FP.dblUsed=0;FP.coyote=.13;}else FP.coyote=Math.max(0,(FP.coyote||0)-dt);
    const press=jumpK&&!FP.jHeld;if(press)FP.jbuf=.15;else FP.jbuf=Math.max(0,(FP.jbuf||0)-dt);
    const extra=M?(M.dbl?1:0):(FP.airJumps||0);
    if(FP.jbuf>0&&(FP.ground||FP.coyote>0)){FP.jbuf=0;FP.coyote=0;V.y=M&&M.jump||FP.jumpV||7.6;FP.ground=false;FP.canCut=true;FP.squash=-.12;tone(420,.05,"triangle",.02);if(typeof onFoxJump==="function")onFoxJump(false);}
    else if(press&&!FP.ground&&FP.dblUsed<extra){FP.dblUsed++;FP.jbuf=0;V.y=(M&&M.jump)||FP.jumpV||7.6;FP.flipT=M?0:.5;burst(P.x,P.y+.3,P.z,18,[[1,.7,.9],[.7,.9,1],[1,1,.6]],1.4,1,.6);tone(620,.06,"triangle",.025);if(typeof onFoxJump==="function")onFoxJump(true);}
    if(!upK&&V.y>4.5&&FP.canCut&&!M){V.y*=.72;FP.canCut=false;}if(V.y<=0)FP.canCut=false;}
  FP.jHeld=jumpK;
  FP.jump=false;
  /* move per axis; walking into a single step hops up it, swimming into a ledge climbs out */
  let blocked=false;const tryAxis=(ax,d)=>{if(!d)return;const nx=ax===0?P.x+d:P.x,nz=ax===2?P.z+d:P.z;if(!hitsAt(nx,P.y,nz)){if(ax===0)P.x=nx;else P.z=nz;return;}blocked=true;if(ax===0)V.x=0;else V.z=0;};
  tryAxis(0,V.x*dt);tryAxis(2,V.z*dt);
  if(blocked&&len>.3){const ax=P.x+wx*.45,az=P.z+wz*.45;if(!hitsAt(ax,P.y+1.05,az)&&hitsAt(ax,P.y,az)){if((FP.ground||FP.coyote>0)&&!FP.boat&&!hitsAt(P.x,P.y+1.05,P.z)){const ny2=Math.floor(P.y+.02)+1.001;const lift=ny2-P.y;if(lift>0&&lift<1.25&&!hitsAt(P.x,ny2,P.z)){P.y=ny2;FP.visOff=(FP.visOff||0)-lift;V.y=0;FP.ground=true;const sx=P.x+wx*Math.min(.12,sp*dt),sz=P.z+wz*Math.min(.12,sp*dt);if(!hitsAt(sx,P.y,sz)){P.x=sx;P.z=sz;}V.x=wx*sp*.85;V.z=wz*sp*.85;}else{V.y=7.6;FP.ground=false;}}else if(swim){V.y=6.4;}
      else if(FP.boat&&P.y+.6+1>=0&&!hitsAt(ax,P.y+.8,az)){FP.boat=false;FP.boatPark=null;P.y+=.85;V.y=3;}}}
  if(FP.boat){const fy=floorY(P.x,P.y+1.2,P.z);if(fy>=WATER-.7){FP.boat=false;FP.boatPark=null;P.y=Math.max(P.y,fy+1);V.y=2;}}
  const ny=P.y+V.y*dt;const wasG=FP.ground,vyPre=V.y;if(!hitsAt(P.x,ny,P.z)){P.y=ny;FP.ground=false;}else{if(V.y<0){FP.ground=true;if(!wasG&&!swim)foxLand(vyPre);for(let i=0;i<40;i++){const t=P.y-.02;if(hitsAt(P.x,t,P.z))break;P.y=t;}}V.y=0;}
  if(FP.ground&&V.y===0&&!hitsAt(P.x,P.y-.04,P.z))FP.ground=false;
  if((FP.waterWalk||(M&&M.hover))&&!FP.diveB&&!k.c&&V.y<=0&&P.y<WATER-.12+.2&&P.y>WATER-1.3&&waterAt(P.x,WATER-.5,P.z)&&!get(Math.floor(P.x),Math.floor(WATER-.5),Math.floor(P.z))){if(!FP.ground&&vyPre<-6)foxLand(vyPre);P.y=WATER-.12+.2;V.y=0;FP.ground=true;FP.onWater=true;}else FP.onWater=false;
  P.x=Math.max(.5,Math.min(W-.5,P.x));P.z=Math.max(.5,Math.min(W-.5,P.z));if(P.y<-4){P.copy(FP.safe);V.set(0,0,0);}
  /* breath and tiredness */
  const top2=FP.boat?WATER+1:waterTop(P.x,P.y,P.z);FP.under=swim&&P.y+.95<top2-.05;FP.wtop=top2;
  if(FP.under&&!(M&&M.water)){FP.breath=Math.max(0,FP.breath-dt);if(FP.breath<=0&&!FP.outT){FP.outT=1;toast(S.gear&&S.gear.maska?"Rida mora na zrak!":"Rida mora na zrak! S ronilačkom maskom može roniti puno dulje.",3200);}}
  else{FP.breath=Math.min(breathMax(),FP.breath+dt*breathMax()/2.5);if(FP.breath>2)FP.outT=0;}
  if(deep&&!FP.boat&&!(M&&M.water)){FP.stamina-=dt;if(FP.stamina<stamMax()*.4&&!FP.warned){FP.warned=1;toast("Rida se umara! Vrati se na kopno."+(S.gear&&S.gear.camac?"":" Za daleke otoke napravi čamac u radionici."),3500);}
    if(FP.stamina<=0){FP.stamina=stamMax();FP.warned=0;burst(P.x,WATER+.1,P.z,24,[[.8,.93,1],[1,1,1]],2,2.4,.6);P.copy(FP.safe);V.set(0,0,0);FP.swim=false;sfx.splash();
      toast(S.gear&&S.gear.camac?"Uf, Rida se umorila. Vratila se na obalu.":"Uf, Rida se umorila od plivanja i vratila na obalu. Za daleka mora napravi čamac!",4200);}}
  else if(!swim){FP.stamina=Math.min(stamMax(),FP.stamina+dt*3);if(FP.stamina>stamMax()*.7)FP.warned=0;}
  FP.safeT+=dt;if(FP.ground&&!swim&&!FP.boat&&FP.safeT>.4){FP.safeT=0;FP.safe.copy(P);}
  /* Rida's body */
  const hs=Math.hypot(V.x,V.z);let turn=0;if(hs>.4&&len>.1){const ang=Math.atan2(V.x,V.z);let da=ang-FP.yaw;while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;turn=da*Math.min(1,dt*12);FP.yaw+=turn;}
  FP.lean=(FP.lean||0)+((M?0:Math.max(-.28,Math.min(.28,-turn/Math.max(dt,.001)*.045*Math.min(1,hs/5))))-(FP.lean||0))*Math.min(1,dt*8);
  FP.visOff=(FP.visOff||0)*Math.max(0,1-dt*16);if(Math.abs(FP.visOff)<.002)FP.visOff=0;FP.squash=(FP.squash||0)*Math.max(0,1-dt*9);
  rida.x=P.x;rida.y=P.y;rida.z=P.z;rida.hop=Math.max(0,(rida.hop||0)-dt*3);const parts=rida.g.userData.parts;FP.walk+=dt*hs*2.2;
  const moving=hs>.4;const sw=FP.boat?0:!FP.ground&&!swim&&!M?.9:moving?Math.sin(FP.walk*2.2)*(swim?.9:hs>5.5?1.05:.7):0;
  if(parts.l0){if(FP.boat||M){[parts.l0,parts.l1,parts.l2,parts.l3].forEach(l=>l.rotation.x=-1.1);}else{if(!FP.ground&&!swim){parts.l0.rotation.x=parts.l1.rotation.x=-.8;parts.l2.rotation.x=parts.l3.rotation.x=.8;}else{parts.l0.rotation.x=sw;parts.l3.rotation.x=sw;parts.l1.rotation.x=-sw;parts.l2.rotation.x=-sw;}}}
  if(parts.tail){parts.tail.rotation.y=Math.sin(tt*(moving?9:3))*.5;parts.tail.rotation.x=swim?.1:-.25;}
  if(parts.head){parts.head.rotation.x=FP.dig?Math.sin(tt*16)*.25+.25:swim?-.25:moving?Math.sin(FP.walk*4.4)*.05:Math.sin(tt*.7)*.08;parts.head.rotation.y=FP.dig||moving?0:Math.sin(tt*.5)*.35;}
  const bob=FP.boat?Math.sin(tt*1.6)*.06+.32:swim?Math.sin(tt*2)*.04:moving&&FP.ground?Math.abs(Math.sin(FP.walk*2.2))*.06:0;
  rida.g.rotation.order="YXZ";FP.flipT=Math.max(0,(FP.flipT||0)-dt);const flip=FP.flipT>0?(1-FP.flipT/.5)*Math.PI*2:0;const emo=typeof emoteTick==="function"?emoteTick(dt,tt):null;
  rida.g.position.set(P.x,P.y+(FP.visOff||0)+(M?M.seat+(M.bob||0):bob)+Math.sin(rida.hop*Math.PI)*.25+(emo&&emo.y||0),P.z);
  const airPitch=!FP.ground&&!swim&&!M?Math.max(-.35,Math.min(.35,-V.y*.03)):0;rida.g.rotation.set((swim&&!FP.boat&&!M?-.35:(M&&M.tilt)||airPitch)-flip+(emo&&emo.rx||0),FP.yaw+(emo&&emo.ry||0),FP.lean+(emo&&emo.rz||0));
  {const q=FP.squash||0;const br=moving||M?0:Math.sin(tt*2.2)*.012;rida.g.scale.set(1-q*.5,1+q+br,1-q*.5);}
  if(boatMesh){if(FP.boat){boatMesh.visible=true;boatMesh.position.set(P.x,WATER-.12+Math.sin(tt*1.6)*.06,P.z);boatMesh.rotation.set(Math.sin(tt*1.3)*.04,FP.yaw,Math.sin(tt*1.1)*.05);if(hs>2&&Math.random()<dt*14)burst(P.x-Math.sin(FP.yaw)*1.3,WATER+.05,P.z-Math.cos(FP.yaw)*1.3,1,[[1,1,1]],.5,.4,.7,0);}
    else if(FP.boatPark){boatMesh.visible=true;boatMesh.position.set(FP.boatPark.x,WATER-.12+Math.sin(tt*1.6)*.06,FP.boatPark.z);}else boatMesh.visible=false;}
  if(moving&&FP.ground){FP.step+=dt*hs;if(FP.step>.75){FP.step=0;stepSound();}}
  if(swim&&moving&&!FP.under&&Math.random()<dt*5)burst(P.x,waterTop(P.x,P.y,P.z)+.02,P.z,2,[[.85,.95,1],[1,1,1]],.6,.8,.5,0);
  if(FP.under&&Math.random()<dt*3)burst(P.x+Math.sin(FP.yaw)*.4,P.y+1.05,P.z+Math.cos(FP.yaw)*.4,2,[[.9,.97,1],[1,1,1]],.15,.6,1.6,-1.2);
  if(FP.ground&&!swim)FP.boatPark=null;
  /* light: Rida darkens in caves, her lantern glows when it is dark */
  FP.lightT=(FP.lightT||0)-dt;if(FP.lightT<=0){FP.lightT=.12;const l=lightAt(P.x,P.y+.8,P.z);const day=1-(cur.night||0)*.6;const sk=Math.pow(.8,15-l[0])*day,bl=Math.pow(.79,15-l[1]);const f=Math.max(.08,Math.max(sk,bl*1.1));
    const dark=1-Math.min(1,Math.max(sk*1.4,bl));FP.lampK+=((hasLamp()?dark:dark*.25)-FP.lampK)*.5;entShade(rida,Math.max(f,FP.lampK*.9));}
  foxLamp.visible=FP.lampK>.12&&!!(hasLamp());voxU.uLamp.value.set(P.x,P.y+1,P.z,FP.lampK*(hasLamp()?2.4:1.1));
  /* camera: orbit behind, pulled in by walls */
  const MT=FP.mount;const mUp=MT?(MT.seat||.6)*(MT.scale?1.2:1)+.35:0,TD=FP.cam.tdist+(MT?(MT.air?3.2:2.2):0)+(FP.charCam||0);
  /* the camera target trails Rida a little and leans ahead of where she is going */
  const la=Math.min(1,hs/6)*.55;tmpTarget.set(P.x+V.x*.09*la,P.y+1.05+mUp+(FP.visOff||0),P.z+V.z*.09*la);
  const kxz=Math.min(1,dt*(MT?9:13));FP.camT.x+=(tmpTarget.x-FP.camT.x)*kxz;FP.camT.z+=(tmpTarget.z-FP.camT.z)*kxz;
  if(Math.hypot(tmpTarget.x-FP.camT.x,tmpTarget.z-FP.camT.z)>3){FP.camT.x=tmpTarget.x;FP.camT.z=tmpTarget.z;}
  const ky=FP.ground||swim?Math.min(1,dt*10):Math.min(1,dt*4);FP.camT.y+=(tmpTarget.y-FP.camT.y)*ky;if(Math.abs(tmpTarget.y-FP.camT.y)>4)FP.camT.y=tmpTarget.y;
  if(FP.under)FP.camT.y=Math.min(FP.camT.y,(FP.wtop||WATER)-.45);if(k.q||k.r)FP.camIdle=0;if(k.q)FP.cam.yaw+=dt*2;if(k.r)FP.cam.yaw-=dt*2;
  const c=FP.cam;
  /* lazy follow: after a moment without touching the camera it swings in behind Rida as she runs forward */
  FP.camIdle=(FP.camIdle||0)+dt;
  if(FP.camIdle>1.1&&hs>1.2&&!FP.dig&&!FP.shopping&&!busy){const want=FP.yaw+Math.PI;let da=want-c.yaw;while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;
    const fwd=Math.min(1,(Math.max(0,mz)+Math.abs(mx)*.45)/(len||1));const ramp=Math.min(1,(FP.camIdle-1.1)/.8);if(Math.abs(da)<2.6)c.yaw+=da*Math.min(1,dt*1.6)*ramp*Math.min(1,hs/4)*(MT?1:fwd);
    if(FP.camIdle>2.5)c.pitch+=((MT&&MT.air?.42:.34)-c.pitch)*Math.min(1,dt*.5);}
  {const want=(innerWidth<innerHeight?72:60)+(hs>5.2?Math.min(7,(hs-5.2)*1.6):0)+(MT&&MT.air?4:0);FP.fov=(FP.fov||want)+(want-(FP.fov||want))*Math.min(1,dt*3);if(Math.abs(camera.fov-FP.fov)>.05){camera.fov=FP.fov;camera.updateProjectionMatrix();}}
  /* in tunnels and under trees the camera drops toward the fox's back instead of squashing into its head */
  const camSolid=b=>b&&!TYPES[b].water&&!TYPES[b].leaf;
  const castD=pt=>{const cq=Math.cos(pt),ax=Math.sin(c.yaw)*cq,ay=Math.sin(pt),az=Math.cos(c.yaw)*cq;const px=Math.cos(c.yaw),pz=-Math.sin(c.yaw);let best=TD;
    for(const off of [0,-.28,.28]){for(let t=.4;t<best;t+=.12){const b=get(Math.floor(FP.camT.x+ax*t+px*off),Math.floor(FP.camT.y+ay*t),Math.floor(FP.camT.z+az*t+pz*off));if(camSolid(b)){best=Math.min(best,Math.max(.6,t-.32));break;}}}return best;};
  let pt=c.pitch,dd=castD(pt);
  if(dd<Math.min(3.4,TD*.65))for(const alt of [.16,.02,-.12]){if(alt>=c.pitch)continue;const d2=castD(alt);if(d2>dd+.7){pt=alt;dd=d2;break;}}
  c.pe=c.pe==null?pt:c.pe+(pt-c.pe)*Math.min(1,dt*4);
  const cp=Math.cos(c.pe);const ox=Math.sin(c.yaw)*cp,oy=Math.sin(c.pe),oz=Math.cos(c.yaw)*cp;const d=castD(c.pe);
  c.cur=d<c.cur?(d<c.cur-.8?d:c.cur+(d-c.cur)*Math.min(1,dt*18)):c.cur+(d-c.cur)*Math.min(1,dt*2.2);
  /* when the camera is pressed close, Rida turns see-through so the way ahead stays visible */
  const fade=c.cur<1.7?Math.max(.45,(c.cur-.5)/1.2):1;if(Math.abs((rida.fadeA==null?1:rida.fadeA)-fade)>.03){rida.fadeA=fade;if(MT&&MT.en)MT.en.g.traverse(o=>{if(o.isMesh&&o.material){if(!o.userData.fm){o.material=o.material.clone();o.userData.fm=1;}o.material.transparent=fade<.99;o.material.opacity=fade;o.material.depthWrite=true;}});rida.g.traverse(o=>{if(o.isMesh&&o.material&&!o.isSprite){if(!o.userData.fm){o.material=o.material.clone();o.userData.fm=1;}o.material.transparent=fade<.99;o.material.opacity=fade;o.material.depthWrite=true;}});}
  camera.position.set(FP.camT.x+ox*c.cur,FP.camT.y+oy*c.cur,FP.camT.z+oz*c.cur);
  if(!FP.under&&camera.position.y<WATER+.3&&waterAt(camera.position.x,camera.position.y,camera.position.z))camera.position.y=WATER+.3;
  if(FP.under&&camera.position.y>(FP.wtop||WATER)-.3)camera.position.y=(FP.wtop||WATER)-.3;
  {const kf=Math.max(0,Math.min(1,(1.7-c.cur)/1.1));if(kf>0){tmpV.set(FP.camT.x-Math.sin(c.yaw)*kf*3,FP.camT.y-kf*.15,FP.camT.z-Math.cos(c.yaw)*kf*3);camera.lookAt(tmpV);}else if(FP.shopping)camera.lookAt(tmpV.set(FP.camT.x,FP.camT.y-1.15,FP.camT.z));else camera.lookAt(FP.camT);}plantU.uCamP.value.set(P.x,P.y,P.z);
  /* digging and the hover outline */
  if(!busy)tickDig(dt);
  const hv=FP.mouse&&!FP.mouse.down?pickCell(FP.mouse.x,FP.mouse.y,true):(FP.gest&&FP.gest.hold?pickCell(FP.gest.x,FP.gest.y):null);
  if(hv&&!busy){const cc=(FP.hand&&!(FP.gest&&FP.gest.hold)&&!(FP.mouse&&FP.mouse.hold))||hv.sea?hv.out:hv.inside;ghost.visible=true;ghost.children[0].visible=!!(FP.hand&&!hv.far);ghost.position.set(cc[0]+.5,cc[1]+.5,cc[2]+.5);ghost.children[1].material.color.set(hv.far?0x8a93a6:0xffffff);}else ghost.visible=false;
  /* treasures, chests, places */
  for(const tr of treasures){if(tr.leaving)continue;const g=tr.g.position;if(Math.hypot(g.x-P.x,g.z-P.z)<1.2&&Math.abs((g.y-1.15)-P.y)<1.7){collectTreasure(tr,scr(g));fpUI();}}
  for(const ch of chestObjs){if(!ch.open&&Math.hypot(ch.x-P.x,ch.z-P.z)<1.35&&Math.abs(ch.y-P.y)<1.2)openChest(ch);}
  poiCheck(P);
  const nt=nearestTreasure();const ar=$("fpArrow");if(nt){const a=Math.atan2(nt.tr.g.position.x-P.x,nt.tr.g.position.z-P.z);const rel=a-(c.yaw+Math.PI);ar.hidden=false;ar.style.transform="rotate("+(-rel)+"rad)";$("fpDist").textContent=Math.round(nt.d)+" m";}else{ar.hidden=true;$("fpDist").textContent="";}
  fpStat();}
function fpStat(){const wm=FP.mount&&FP.mount.water;const showB=!wm&&(FP.under||FP.breath<breathMax()-.05),showS=!wm&&((FP.swim&&!FP.boat)||FP.stamina<stamMax()-.05);const el=$("fpStat");el.hidden=!(showB||showS);
  if(showB){const n=Math.ceil(FP.breath/breathMax()*10);$("fpBreath").innerHTML="<i></i>".repeat(n)+'<i class="o"></i>'.repeat(10-n);}$("fpBreath").hidden=!showB;
  if(showS){$("fpStam").firstChild.style.width=Math.max(0,FP.stamina/stamMax()*100)+"%";}$("fpStam").hidden=!showS;
  const air=FP.mount&&FP.mount.air;$("fpDive").hidden=!(FP.swim||FP.boat||air);$("fpDive").textContent=air?"Dolje":"Roni";$("fpJump").textContent=air||FP.swim&&!(FP.mount&&FP.mount.leap)?"Gore":"Skok";const mo=$("fpOff");if(mo)mo.hidden=!FP.mount;}
/* landing: a puff of dust, a squash, and a jolt on big drops */
function foxLand(vy){const P=FP.p;const hard=-vy;if(hard<5)return;FP.squash=Math.min(.22,hard*.012);FP.camT.y-=Math.min(.35,hard*.02);
  const t=get(Math.floor(P.x),Math.floor(P.y-.5),Math.floor(P.z));const col=t?avgColor(t):[.9,.9,.85];burst(P.x,P.y+.05,P.z,Math.min(26,Math.round(hard*1.4)),[col,[1,1,1]],1.2+hard*.06,.6,.45);
  tone(110+Math.random()*30,.07,"triangle",Math.min(.05,.012+hard*.002));if(hard>13&&typeof padRumble==="function"&&PAD.on)padRumble(140,.5,.3);}
/* input */
addEventListener("keydown",e=>{if(!FP.on)return;if(e.target&&e.target.closest&&e.target.closest("input,textarea"))return;const key=e.key.toLowerCase();FP.keys[key]=true;if(key===" "||key.startsWith("arrow"))e.preventDefault();
  if(e.repeat)return;if(key==="escape"&&$("veil").hidden)endSquirrel();if(key==="e"||key==="i"||key==="b"){if($("veil").hidden)sheetBag("kockice");else closeSheet();}
  if(key==="f"&&FP.mount&&typeof dismount==="function")dismount();
  if(/^[1-9]$/.test(key)){const s=$("hotbar").querySelectorAll(".slot")[+key-1];if(s)s.click();}});
addEventListener("keyup",e=>{FP.keys[e.key.toLowerCase()]=false;});addEventListener("blur",()=>{FP.keys={};FP.gest=null;if(FP.mouse)FP.mouse.hold=FP.mouse.down=false;});
(function(){const ui=$("fpUI"),pad=$("fpJoy"),knob=$("fpKnob");
  const zoom=f=>{FP.cam.tdist=Math.max(2.6,Math.min(15,FP.cam.tdist*f));};
  ui.addEventListener("pointerdown",e=>{if(!FP.on||e.target.closest(".pe"))return;if(e.pointerType==="touch")ui.classList.add("touch");try{ui.setPointerCapture(e.pointerId);}catch(_){}
    FP.ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(FP.ptrs.size===2){const a=[...FP.ptrs.values()];FP.pinch=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);FP.gest=null;stopDig();return;}
    const rot=e.button===2||e.button===1;FP.gest={id:e.pointerId,x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:performance.now(),moved:rot,hold:false,rot,mouse:e.pointerType==="mouse"};
    if(e.pointerType==="mouse"){FP.mouse=FP.mouse||{};FP.mouse.down=true;FP.mouse.x=e.clientX;FP.mouse.y=e.clientY;}});
  ui.addEventListener("pointermove",e=>{if(!FP.on)return;if(e.pointerType==="mouse"){FP.mouse=FP.mouse||{};FP.mouse.x=e.clientX;FP.mouse.y=e.clientY;}
    const pp=FP.ptrs.get(e.pointerId);if(pp){pp.x=e.clientX;pp.y=e.clientY;}
    if(FP.ptrs.size>=2&&FP.pinch){const a=[...FP.ptrs.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);zoom(FP.pinch/d);FP.pinch=d;return;}
    const g=FP.gest;if(!g||g.id!==e.pointerId)return;const dx=e.clientX-g.x,dy=e.clientY-g.y;
    if(!g.moved&&!g.hold&&Math.hypot(e.clientX-g.sx,e.clientY-g.sy)>9)g.moved=true;
    if(g.moved){FP.camIdle=0;const s=e.pointerType==="mouse"?.0055:.0075;FP.cam.yaw-=dx*s;FP.cam.pitch=Math.max(-.35,Math.min(1.35,FP.cam.pitch+dy*s*.8));}
    g.x=e.clientX;g.y=e.clientY;});
  const up=e=>{FP.ptrs.delete(e.pointerId);if(FP.ptrs.size<2)FP.pinch=null;const g=FP.gest;if(e.pointerType==="mouse"&&FP.mouse){FP.mouse.down=false;FP.mouse.hold=false;}
    if(!g||g.id!==e.pointerId)return;FP.gest=null;if(!g.moved&&!g.hold&&performance.now()-g.t<400&&e.type==="pointerup")fpTap(e.clientX,e.clientY);};
  ui.addEventListener("pointerup",up);ui.addEventListener("pointercancel",up);
  ui.addEventListener("wheel",e=>{if(!FP.on)return;e.preventDefault();zoom(Math.exp(Math.max(-200,Math.min(200,e.deltaY*(e.deltaMode===1?16:1)))*.0015));},{passive:false});
  setInterval(()=>{const g=FP.gest;if(FP.on&&g&&!g.moved&&!g.hold&&!g.rot&&performance.now()-g.t>230){g.hold=true;if(g.mouse&&FP.mouse)FP.mouse.hold=true;}},40);
  addEventListener("pointermove",e=>{if(!FP.on||FP.joy.id!==e.pointerId)return;const r=pad.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let dx=(e.clientX-cx)/(r.width/2),dy=(e.clientY-cy)/(r.height/2);const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l;}FP.joy.x=dx;FP.joy.y=dy;knob.style.transform="translate("+dx*34+"px,"+dy*34+"px)";});
  const jup=e=>{if(FP.joy.id===e.pointerId){FP.joy.id=null;FP.joy.x=FP.joy.y=0;knob.style.transform="";}};addEventListener("pointerup",jup);addEventListener("pointercancel",jup);
  pad.addEventListener("pointerdown",e=>{e.preventDefault();FP.joy.id=e.pointerId;try{pad.setPointerCapture(e.pointerId);}catch(_){}});
  const hold=(id,on,off)=>{const b=$(id);b.addEventListener("pointerdown",e=>{e.preventDefault();on();try{b.setPointerCapture(e.pointerId);}catch(_){}});["pointerup","pointercancel","lostpointercapture"].forEach(n=>b.addEventListener(n,off));};
  hold("fpJump",()=>{FP.jump=true;FP.upB=true;},()=>{FP.upB=false;});hold("fpDive",()=>{FP.diveB=true;},()=>{FP.diveB=false;});
  $("fpExit").onclick=()=>{sfx.click();endSquirrel();};
  ui.addEventListener("contextmenu",e=>e.preventDefault());})();
$("exploreBtn").onclick=()=>{sfx.click();startSquirrel();};
