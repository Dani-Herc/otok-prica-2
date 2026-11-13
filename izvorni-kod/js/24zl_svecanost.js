/* =================== v41: SVECANOSTI: a festival on one square every weekend ===================
   From Friday to Sunday one land (the home island or an open district, a different one each week) dresses up its
   square: flags, balloons and either market stalls (sajam), a little stage with animal musicians (koncert) or
   floating lanterns (lampionska večer). Eight festival balloons float around the square; catching all of them
   gives the festival reward. The third finished festival gives the fox skin "Svečana lisica".
   Save: S.fest={n,w:{[weekId]:{got,done}}} (optional). */
const FS={grp:null,bal:[],mus:[],lan:[],c:null,built:null,mt:0,force:null,told:false};
const FST={sajam:{n:"Sajam",d:"Štandovi, zastavice i baloni"},koncert:{n:"Koncert",d:"Životinje sviraju na maloj pozornici"},lampioni:{n:"Lampionska večer",d:"Lampioni lebde nad trgom"}};
Object.assign(MSKIN,{svecana:{n:"Svečana lisica",d:"Crvena i zlatna kao zastavice na trgu. Dar za tri svečanosti.",p:0,rar:"l",O:0xd8392f,W:0xfff3c4,B:0xf2b22e,D:0x7a1f2a,wr:"Svečanosti"}});mgAdd("skin","svecana",MSKIN.svecana);
function fsS(){S.fest=S.fest||{};S.fest.n=S.fest.n||0;S.fest.w=S.fest.w||{};return S.fest;}
function fsNow(){if(FS.force)return FS.force;const d=new Date(),day=d.getDay(),mon=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((day+6)%7)),id=Math.round(mon.getTime()/864e5/7);
  const lands=["main"].concat(DSK.filter(k=>dOpen(k))),types=Object.keys(FST);return {id:String(id),land:lands[id%lands.length],type:types[id%3],on:day===5||day===6||day===0,wait:day>=1&&day<=4?5-day:0};}
const fsHere=()=>WORLD?(DST[WORLD]?WORLD:null):"main";
function fsLine(){const F=fsNow(),T2=FST[F.type],W=fsS().w[F.id];if(F.on)return T2.n+": "+dLocName(F.land)+", do nedjelje navečer."+(W&&W.done?" Nagradu već imaš!":" Skupi osam svečanih balona na trgu.");
  return "Sljedeća svečanost: "+T2.n.toLowerCase()+", "+dLocName(F.land)+". Počinje "+(F.wait===1?"sutra":"u petak")+".";}
function fsBuild(F){if(FS.grp){scene.remove(FS.grp);FS.grp=null;}const here=fsHere(),c=here==="main"?jbSpot(LIB.x+.5,LIB.z+17.5):[128.5,128.5],gy=Math.max(topY(c[0],c[1]+6),WATER)+1;FS.c={x:c[0],z:c[1],y:gy};const g=new THREE.Group();FS.grp=g;FS.bal=[];FS.mus=[];FS.lan=[];
  const M=(col,o)=>new THREE.MeshLambertMaterial(Object.assign({color:new THREE.Color(col).multiplyScalar(.42),emissive:new THREE.Color(col).multiplyScalar(.06)},o||{}));
  const B=(w,h,d,col,x,y,z,ry)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(col));m.position.set(c[0]+x,gy+y,c[1]+z);if(ry)m.rotation.y=ry;g.add(m);return m;};
  const cols=[0xe04a3a,0xf2b22e,0x3fa86a,0x4a7fd6,0xc08bff,0xff8fb0],R=here==="main"?7:9.5,posts=[];
  const gyAt=(x,z)=>Math.max(topY(c[0]+x,c[1]+z),WATER)+1-gy;
  for(let i=0;i<6;i++){const a=i/6*6.283+.5,x=Math.cos(a)*R,z=Math.sin(a)*R,y0=gyAt(x,z);const p=new THREE.Mesh(new THREE.CylinderGeometry(.09,.11,4.6,8),M(0x8a5a34));p.position.set(c[0]+x,gy+y0+2.3,c[1]+z);g.add(p);posts.push([x,y0+4.5,z]);
    for(let k=0;k<3;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),M(cols[(i+k)%6]));s.position.set(c[0]+x+(k-1)*.34,gy+y0+5+(k===1?.34:0),c[1]+z);g.add(s);}}
  for(let i=0;i<6;i++){const a=posts[i],b=posts[(i+1)%6];for(let k=1;k<10;k++){const t=k/10,sag=Math.sin(t*Math.PI)*.8,f=new THREE.Mesh(new THREE.BoxGeometry(.44,.5,.05),M(cols[(i*3+k)%6],{emissive:new THREE.Color(cols[(i*3+k)%6]).multiplyScalar(.18)}));f.position.set(c[0]+a[0]+(b[0]-a[0])*t,gy+a[1]+(b[1]-a[1])*t-sag-.2,c[1]+a[2]+(b[2]-a[2])*t);f.rotation.y=-Math.atan2(b[2]-a[2],b[0]-a[0]);g.add(f);}}
  if(F.type==="sajam"){for(let i=0;i<3;i++){const a=i/3*6.283+1.6,x=Math.cos(a)*(R-2.2),z=Math.sin(a)*(R-2.2),y0=gyAt(x,z),ry=-a+Math.PI/2;B(2,.9,1,0x9a6a3c,x,y0+.45,z,ry);for(let k=0;k<5;k++)B(.4,.08,1.3,k%2?0xfff8e6:cols[i*2],x+Math.cos(-ry)*(k-2)*.4,y0+2.3,z+Math.sin(-ry)*(k-2)*.4,ry);
      for(const s of [-1,1])B(.1,2.3,.1,0x8a5a34,x+Math.cos(-ry)*s*.95,y0+1.15,z+Math.sin(-ry)*s*.95,ry);for(let k=0;k<3;k++)B(.3,.26,.3,cols[(i+k*2)%6],x+Math.cos(-ry)*(k-1)*.55,y0+1.03,z+Math.sin(-ry)*(k-1)*.55,ry);}}
  else if(F.type==="koncert"){const a=2.2,x=Math.cos(a)*(R-2.5),z=Math.sin(a)*(R-2.5),y0=gyAt(x,z);B(5,.5,3,0x8a5a34,x,y0+.25,z,-a+Math.PI/2);B(5.2,.1,3.2,0xb83a2e,x,y0+.55,z,-a+Math.PI/2);
    ["sova","zec","macka"].forEach((k,i)=>{if(!MODELS[k])return;const m=MODELS[k](),o=(i-1)*1.5;m.position.set(c[0]+x+Math.sin(a)*o,gy+y0+.6,c[1]+z-Math.cos(a)*o);m.rotation.y=Math.atan2(-x,-z);g.add(m);FS.mus.push({g:m,y:gy+y0+.6,ph:i*1.3});});}
  else{for(let i=0;i<14;i++){const a=i/14*6.283,r=3+((i*7)%5)*1.6,l=new THREE.Mesh(new THREE.BoxGeometry(.4,.5,.4),new THREE.MeshBasicMaterial({color:[0xffb04a,0xff8a5a,0xffd27a][i%3]}));l.position.set(c[0]+Math.cos(a)*r,gy+3+(i%4)*.9,c[1]+Math.sin(a)*r);g.add(l);FS.lan.push({m:l,y:l.position.y,ph:i});}}
  /* the eight festival balloons */
  const W2=fsS().w[F.id]||{got:0};for(let i=W2.got;i<8;i++){const a=i/8*6.283+.9,r=4+((i*5)%4)*2.2+(here==="main"?0:2),x0=Math.cos(a)*r,z0=Math.sin(a)*r;let x=x0,z=z0,y0=gyAt(x,z);for(let q=.8;Math.abs(y0)>3&&q>.1;q-=.2){x=x0*q;z=z0*q;y0=gyAt(x,z);}const b=new THREE.Group(),s=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),M(cols[i%6],{emissive:new THREE.Color(cols[i%6]).multiplyScalar(.2)}));s.scale.y=1.2;b.add(s);
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.9,4),M(0xffffff));st.position.y=-.95;b.add(st);const star=new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.04),new THREE.MeshBasicMaterial({color:0xfff3c4}));star.position.set(0,0,.4);b.add(star);
    b.position.set(c[0]+x,gy+y0+1.3+(i%3)*.5,c[1]+z);g.add(b);FS.bal.push({g:b,x:c[0]+x,z:c[1]+z,y:b.position.y,ph:i});}
  scene.add(g);FS.built=F.id;
  /* neighbours come to watch */
  let n=0;for(const e of ents){if(!e.hab||e.roof||e.swim||e.fl)continue;if(n++%2)continue;const a=n*1.7;e.hab={x:c[0]+Math.cos(a)*(R-3),z:c[1]+Math.sin(a)*(R-3),r:6};e.goto={x:e.hab.x,z:e.hab.z};}}
const FSMEL={sajam:[523,659,784,659,523,587,698,587],koncert:[392,523,659,784,659,523,440,523],lampioni:[330,392,494,392,330,294,392,330]};
function fsTick(dt,tt){const F=fsNow(),here=fsHere();if(!here||!F.on||F.land!==here||G2.mode==="mini"){if(FS.grp){scene.remove(FS.grp);FS.grp=null;FS.built=null;FS.bal=[];}return;}
  if(FS.built!==F.id)fsBuild(F);const C=FS.c;for(const b of FS.bal){b.g.position.y=b.y+Math.sin(tt*1.4+b.ph)*.22;b.g.rotation.y=tt*.6+b.ph;}
  for(const m of FS.mus){m.g.position.y=m.y+Math.abs(Math.sin(tt*4+m.ph))*.22;m.g.rotation.z=Math.sin(tt*4+m.ph)*.12;}for(const l of FS.lan)l.m.position.y=l.y+Math.sin(tt*.5+l.ph)*.6;
  if(!FP.on)return;const P=FP.p,d=Math.hypot(P.x-C.x,P.z-C.z);
  if(d<26){FS.mt-=dt;if(FS.mt<=0){FS.mt=5.2;const v=Math.max(.008,.03*(1-d/26));FSMEL[F.type].forEach((f,i)=>tone(f,.22,"triangle",v,i*.3));if(FS.mus.length&&d<16)for(const m of FS.mus)mgSpawn({t:"star",x:m.g.position.x,y:m.g.position.y+1.2,z:m.g.position.z,vy:.9,life:1.2,size:.16,size2:.02,col:[0xffd23d,0xff8fb0],add:1});}}
  if(!FS.told&&d<30){FS.told=true;const W2=fsS().w[F.id];toast(FST[F.type].n+" na trgu! "+(W2&&W2.done?"Nagradu već imaš, ali glazba svira dalje.":"Skupi svih osam svečanih balona."),4600);}
  for(let i=FS.bal.length-1;i>=0;i--){const b=FS.bal[i];if(Math.hypot(P.x-b.x,P.z-b.z)<1.25&&P.y+1.9>b.y-1.2&&P.y<b.y+.9){FS.grp.remove(b.g);FS.bal.splice(i,1);const D=fsS(),W2=D.w[F.id]=D.w[F.id]||{got:0};W2.got=Math.min(8,W2.got+1);S.coins+=5;sfx.pop();burst(b.x,b.y,b.z,18,[[1,.4,.4],[1,.85,.3],[.4,.7,1]],2.2,2,.7);
      if(W2.got>=8&&!W2.done){W2.done=today();D.n++;S.coins+=60;if(S.tickets<12)S.tickets++;let ex="";if(D.n>=3){const it=mgIt("skin:svecana");if(it&&!mgOwn(it)){mgGive(it);ex=" Treća svečanost: Svečana lisica je tvoja!";}}save();renderEco();sfx.fanfare();if(typeof fireworks==="function")fireworks();
        toast("Svih osam balona! "+FST[F.type].n+" ti donosi 60 zlatnika i kartu za igre."+(ex||(D.n<3?" Još "+(3-D.n)+" do Svečane lisice.":"")),6500);}
      else{save();renderEco();toast("Svečani balon "+W2.got+" od 8! +5 zlatnika",2200);}}}}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);try{fsTick(dt,tt);}catch(e){if(!FS.err){FS.err=1;console.warn("svecanost",e);}}};}
if(typeof sheetZivot==="function"){const _sz=sheetZivot;sheetZivot=function(){_sz.apply(this,arguments);try{const F=fsNow();$("sheetBody").insertAdjacentHTML("beforeend",'<div class="card fsCard'+(F.on?" on":"")+'"><b>'+(F.on?"Svečanost je u tijeku!":"Svečanosti na trgu")+'</b><span>'+esc(fsLine())+'</span><small class="muted">Obavljenih svečanosti: '+fsS().n+'. Treća donosi izgled Svečana lisica.</small></div>');}catch(e){}};}
/* a word about it once a day when the game starts */
{const _boot=boot;boot=function(){const r=_boot.apply(this,arguments);try{const F=fsNow(),D=fsS();if(D.day!==today()&&(F.on||F.wait===1)){D.day=today();save();setTimeout(()=>toast(fsLine(),5200),9000);}}catch(e){}return r;};}
