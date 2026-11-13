/* =================== v30: ZIVOT OTOKA + AKROBACIJE ===================
   Seasons follow the real calendar, weather changes through the day, the island leaves small gifts to find,
   and Rida gets a triple jump, a ground pound that shakes trees, and a pound-bounce.
   Save: one optional key S.zv. Everything is skipped inside the other worlds. */
const ZV={gT:9,chain:0,pound:0,pt:0,pb:0,dPrev:false,items:[],made:false,rk:0,sk:0,wT:0,w:null,force:null,t:0,err:0};
const ZSEAS=[{k:"proljece",n:"Proljeće",c:[1,1,1]},{k:"ljeto",n:"Ljeto",c:[1,1,1]},{k:"jesen",n:"Jesen",c:[1.06,.9,.7]},{k:"zima",n:"Zima",c:[.92,.98,1.06]}];
function zvSeason(){const m=new Date().getMonth();return ZSEAS[m>=2&&m<=4?0:m>=5&&m<=7?1:m>=8&&m<=10?2:3];}
const ZITEMS={
  proljece:[{k:"jaglac",n:"Jaglac",c:0xffd84a,c2:0x5ac83a,v:6},{k:"visibaba",n:"Visibaba",c:0xffffff,c2:0x5ac83a,v:8},{k:"pero",n:"Ptičje pero",c:0x7ac4ff,c2:0xffffff,v:14}],
  ljeto:[{k:"skoljka",n:"Školjka",c:0xffc9d8,c2:0xfff4e0,v:6},{k:"jagoda",n:"Šumska jagoda",c:0xe8324a,c2:0x5ac83a,v:8},{k:"suncokret",n:"Sjemenka suncokreta",c:0xffc53d,c2:0x6a4a2a,v:14}],
  jesen:[{k:"kesten",n:"Kesten",c:0x8a4a22,c2:0xd9a066,v:6},{k:"zir",n:"Žir",c:0xb8823a,c2:0x6a4a2a,v:8},{k:"zlatnilist",n:"Zlatni list",c:0xffb02e,c2:0xff7a1e,v:14}],
  zima:[{k:"sisarka",n:"Šišarka",c:0x7a5230,c2:0x5a3a1e,v:6},{k:"bobice",n:"Crvene bobice",c:0xe8324a,c2:0x2f6a2a,v:8},{k:"kristal",n:"Ledeni kristal",c:0xa8e4ff,c2:0xffffff,v:14}]};
const ZRAIN={k:"gljiva",n:"Kišna gljiva",c:0xe8324a,c2:0xfff4e0,v:18},ZSTAR={k:"zvjezdica",n:"Pala zvjezdica",c:0xfff1a8,c2:0xffc53d,v:25};
const ZEV={0:{n:"Dan darova",d:"Nedjeljom svi darovi otoka vrijede dvostruko."},3:{n:"Dan akrobata",d:"Srijedom svaki trostruki skok donosi zlatnik (najviše 30)."},5:{n:"Noć zvjezdica",d:"Petkom navečer na otok padaju zvjezdice. Potraži ih kad padne mrak!"}};
function zv(){S.zv=S.zv||{};const z=S.zv,d=today();if(z.d!==d){z.d=d;z.got=[];z.shake=0;z.ak3=0;}z.col=z.col||{};z.set=z.set||{};z.tri=z.tri||0;z.pnd=z.pnd||0;z.got=z.got||[];return z;}
function zvDayN(){const d=new Date();return Math.floor((d.getTime()-d.getTimezoneOffset()*60000)/864e5);}
/* weather: one roll per 3-hour block, so it changes while you play but everyone sees the same sky for a while */
function zvWeatherAt(h){const r=hash2(zvDayN(),Math.floor(h/3),77),s=zvSeason().k;const wet=s==="jesen"?.3:s==="proljece"?.26:s==="zima"?.24:.14;return r<wet?(s==="zima"?"snijeg":"kisa"):r<wet+.22?"vjetar":"sunce";}
function zvWeather(){return ZV.force||zvWeatherAt(new Date().getHours());}
const ZWN={sunce:"Sunčano",vjetar:"Vjetrovito",kisa:"Kiša",snijeg:"Snijeg"};
const ZWI={sunce:'<circle cx="12" cy="12" r="5" fill="#ffc53d"/><g stroke="#ffc53d" stroke-width="2" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></g>',
  vjetar:'<g fill="none" stroke="#7ab6d9" stroke-width="2.2" stroke-linecap="round"><path d="M3 9h11a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 19h7"/></g>',
  kisa:'<path d="M7 14a4 4 0 0 1 .6-8 5 5 0 0 1 9.6 1.2A3.5 3.5 0 0 1 17 14z" fill="#9fb4c8"/><g stroke="#4aa8ff" stroke-width="2" stroke-linecap="round"><path d="M8 17l-1 3M12 17l-1 3M16 17l-1 3"/></g>',
  snijeg:'<path d="M7 13a4 4 0 0 1 .6-8 5 5 0 0 1 9.6 1.2A3.5 3.5 0 0 1 17 13z" fill="#c9d6e2"/><g fill="#7ac4ff"><circle cx="8" cy="18" r="1.4"/><circle cx="12" cy="20" r="1.4"/><circle cx="16" cy="18" r="1.4"/></g>'};
function zvIco(w,s){return '<svg width="'+(s||20)+'" height="'+(s||20)+'" viewBox="0 0 24 24" aria-hidden="true">'+ZWI[w]+'</svg>';}

/* ---------- sky particles: rain streaks, and one drifting layer for snow, leaves or petals ---------- */
function zvSkyBuild(){const N=1500,g=new THREE.BufferGeometry();const a=new Float32Array(N*6);g.setAttribute("position",new THREE.BufferAttribute(a,3));
  const m=new THREE.LineBasicMaterial({color:0xd4e6ff,transparent:true,opacity:0,depthWrite:false,fog:false});const L=new THREE.LineSegments(g,m);L.frustumCulled=false;L.renderOrder=6;L.visible=false;scene.add(L);
  const o=new Float32Array(N*3);for(let i=0;i<N;i++){o[i*3]=(Math.random()-.5)*34;o[i*3+1]=Math.random()*20;o[i*3+2]=(Math.random()-.5)*34;}ZV.rain={L,a,o,N};
  const M=260,g2=new THREE.BufferGeometry(),b=new Float32Array(M*3);g2.setAttribute("position",new THREE.BufferAttribute(b,3));
  const cv=document.createElement("canvas");cv.width=cv.height=32;const x=cv.getContext("2d");x.fillStyle="#fff";x.beginPath();x.ellipse(16,16,13,8,.6,0,6.3);x.fill();const tx=new THREE.CanvasTexture(cv);tx.keep=1;
  const m2=new THREE.PointsMaterial({map:tx,size:.22,transparent:true,opacity:0,depthWrite:false,alphaTest:.05,color:0xffffff});const P=new THREE.Points(g2,m2);P.frustumCulled=false;P.visible=false;scene.add(P);
  const o2=new Float32Array(M*4);for(let i=0;i<M;i++){o2[i*4]=(Math.random()-.5)*30;o2[i*4+1]=Math.random()*14;o2[i*4+2]=(Math.random()-.5)*30;o2[i*4+3]=Math.random()*6.3;}ZV.drift={P,b,o:o2,M};}
const zvC=new THREE.Vector3(),zvD=new THREE.Vector3(),ZGREY=new THREE.Color(.56,.62,.7);
function zvSkyTick(dt){if(!ZV.rain)zvSkyBuild();const w=ZV.w,se=zvSeason().k;const open=!envUnder&&G2.mode!=="mini"&&!(typeof CINE!=="undefined"&&CINE);
  const rT=w==="kisa"&&open?1:0;ZV.rk+=(rT-ZV.rk)*Math.min(1,dt*.6);
  const dT=!open?0:w==="snijeg"?1:se==="jesen"?(w==="vjetar"?.9:.45):se==="proljece"?(w==="vjetar"?.7:.3):0;ZV.sk+=(dT-ZV.sk)*Math.min(1,dt*.6);
  camera.getWorldDirection(zvD);zvC.copy(camera.position).addScaledVector(zvD,FP.on?6:14);
  const R=ZV.rain;R.L.visible=ZV.rk>.02;if(R.L.visible){R.L.material.opacity=.5*ZV.rk;const a=R.a,o=R.o;for(let i=0;i<R.N;i++){let y=o[i*3+1]-dt*26;if(y<-4)y+=20;o[i*3+1]=y;
      const px=zvC.x+o[i*3],py=zvC.y+y-4,pz=zvC.z+o[i*3+2];a[i*6]=px;a[i*6+1]=py;a[i*6+2]=pz;a[i*6+3]=px+.05;a[i*6+4]=py+.8;a[i*6+5]=pz;}R.L.geometry.attributes.position.needsUpdate=true;}
  const D=ZV.drift;D.P.visible=ZV.sk>.02;if(D.P.visible){const snow=w==="snijeg";D.P.material.opacity=Math.min(1,ZV.sk*1.2)*(snow?.95:.9);D.P.material.size=snow?.16:.24;
    D.P.material.color.setHex(snow?0xffffff:se==="jesen"?0xf0902a:0xffc4dc);const b=D.b,o=D.o,wind=w==="vjetar"?3.2:.8,fall=snow?1.5:1.1;const n=Math.round(D.M*Math.min(1,ZV.sk+.1));
    for(let i=0;i<D.M;i++){if(i>=n){b[i*3+1]=-999;continue;}let y=o[i*4+1]-dt*fall*(.7+(i%5)*.12);if(y<-3)y+=14;o[i*4+1]=y;o[i*4]+=dt*wind;if(o[i*4]>15)o[i*4]-=30;const ph=o[i*4+3]+ZV.t*1.7;
      b[i*3]=zvC.x+o[i*4]+Math.sin(ph)*.7;b[i*3+1]=zvC.y+y-3;b[i*3+2]=zvC.z+o[i*4+2]+Math.cos(ph*.8)*.7;}D.P.geometry.attributes.position.needsUpdate=true;}
  /* grey light and thicker air while it rains or snows */
  const k=Math.max(ZV.rk,w==="snijeg"&&open?ZV.sk*.6:0);if(k>.01){sun.intensity=cur.si*(1-.68*k);hemi.intensity*=1-.3*k;skyU.top.value.lerp(ZGREY,k*.85);skyU.hz.value.lerp(ZGREY,k*.8);if(!envUnder&&G2.mode!=="mini"){scene.fog.density=.0034+.0065*k;scene.fog.color.lerp(envTmp.copy(ZGREY).convertSRGBToLinear(),k*.6);}}
  else if(ZV.fogOn&&!envUnder&&G2.mode!=="mini")scene.fog.density=.0034;ZV.fogOn=k>.01;
  if(typeof AU!=="undefined"&&AU&&AU.L&&AU.L.sea){if(!AU.L.zrain)AU.L.zrain=auLoop(AU.noise,[bq("highpass",1100,.5),bq("lowpass",6800,.4)]);auSet(AU.L.zrain.g.gain,ZV.rk*.2*(AU.env&&AU.env.inside?.4:1),.5);}
  /* autumn and winter tint on the leaves */
  const sc=zvSeason().c;if(!ZV.tinted){ZV.tinted=1;matLeaf.color.setRGB(sc[0],sc[1],sc[2]);}}

/* ---------- gifts of the island: small things to find every day ---------- */
function zvList(){const z=zv(),se=zvSeason().k,L=ZITEMS[se],day=zvDayN(),out=[];const dbl=new Date().getDay()===0?2:1;
  for(let i=0;i<8;i++){const it=L[i<4?0:i<7?1:2];out.push({i,it,se,v:it.v*dbl});}
  let rained=false;for(let h=6;h<=new Date().getHours();h+=3)if(zvWeatherAt(h)==="kisa")rained=true;if(rained||ZV.force==="kisa")for(let i=8;i<11;i++)out.push({i,it:ZRAIN,se:"posebno",v:ZRAIN.v*dbl});
  if(new Date().getDay()===5&&(cur.night||0)>.5)for(let i=11;i<16;i++)out.push({i,it:ZSTAR,se:"posebno",v:ZSTAR.v});
  for(const o of out){let ok=false;for(let t=0;t<40&&!ok;t++){const a=hash2(day,o.i*41+t,5)*6.283,r=6+hash2(day,o.i*41+t,9)*56,x=Math.floor(CX+Math.cos(a)*r),zz=Math.floor(CZ+Math.sin(a)*r);const y=topY(x,zz);
      if(y<WATER+.2||y>WATER+34)continue;const T=TYPES[vox[I(x,y,zz)]];if(!T||T.leaf||T.glass||T.water)continue;if(typeof FALLS!=="undefined"&&FALLS.has&&FALLS.has(I(x,y,zz)))continue;o.x=x+.5;o.y=y+1;o.z=zz+.5;ok=true;}
    o.ok=ok&&z.got.indexOf(o.i)<0;}
  return out;}
function zvMesh(it){const g=new THREE.Group();const b=(c,sx,sy,sz,x,y,z)=>{const m=new THREE.Mesh(BOXG,mat(c));m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.castShadow=true;g.add(m);return m;};
  const k=it.k;if(k==="gljiva"||k==="jaglac"||k==="visibaba"||k==="suncokret"){b(it.c2,.12,.3,.12,0,.15,0);b(it.c,.4,.18,.4,0,.38,0);if(k==="gljiva")b(0xffffff,.1,.05,.1,.1,.48,.05);}
  else if(k==="kristal"||k==="zvjezdica"){const m=b(it.c,.3,.5,.3,0,.34,0);m.rotation.set(.5,.6,.3);const m2=b(it.c2,.18,.3,.18,.12,.3,.08);m2.rotation.set(-.4,.2,.6);}
  else if(k==="pero"||k==="zlatnilist"){const m=b(it.c,.42,.05,.2,0,.3,0);m.rotation.z=.5;b(it.c2,.3,.04,.05,0,.3,0).rotation.z=.5;}
  else{b(it.c,.32,.28,.32,0,.16,0);b(it.c2,.22,.1,.22,0,.34,0);if(k==="bobice"||k==="jagoda")b(it.c,.2,.2,.2,.24,.12,.1);}
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.16,.3,3.4,8,1,true),new THREE.MeshBasicMaterial({color:k==="zvjezdica"?0xfff1a8:0xfff6c8,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));beam.position.y=1.8;g.add(beam);g.userData.beam=beam;return g;}
function zvSpawn(){for(const o of ZV.items)if(o.g)scene.remove(o.g);ZV.items=zvList().filter(o=>o.ok);for(const o of ZV.items){o.g=zvMesh(o.it);o.g.position.set(o.x,o.y,o.z);scene.add(o.g);}ZV.made=true;ZV.sig=zvSig();}
function zvSig(){return today()+"|"+(ZV.w==="kisa"?1:0)+"|"+((cur.night||0)>.5?1:0);}
function zvGive(it,v,x,y,z,why){const zz=zv();zz.col[it.k]=(zz.col[it.k]||0)+1;S.coins+=v;renderEco();save();burst(x,y+.4,z,22,[[1,.95,.6],[1,1,1],[1,.8,.3]],1.8,2.2,.7);sfx.chime();flyCoins(v,{x:innerWidth/2,y:innerHeight*.55});
  toast((why||"Dar otoka")+": "+it.n+"! +"+v+" zlatnika",2600);
  for(const s of ZSEAS){if(zz.set[s.k])continue;if(ZITEMS[s.k].every(q=>zz.col[q.k])){zz.set[s.k]=1;S.coins+=150;save();renderEco();setTimeout(()=>{if(typeof rewardReveal==="function")rewardReveal({kicker:"Sezonska zbirka",title:s.n+" je potpuna!",chest:"gold",items:[{ic:"",n:"Zlatnici",cnt:150,rar:"e"}],sub:"Pronašla si sve darove ovog godišnjeg doba. Sljedeće doba donosi nove!",ok:"Super!"});},900);}}
  if(typeof questCheck==="function")questCheck();}
function zvItemsTick(dt){if(WORLD)return;if(!ZV.made||ZV.sig!==zvSig())zvSpawn();const P=FP.p;for(let i=ZV.items.length-1;i>=0;i--){const o=ZV.items[i];o.g.rotation.y+=dt*1.2;o.g.children[0].position.y+=Math.sin(ZV.t*3+o.i)*dt*.05;o.g.userData.beam.material.opacity=.16+.08*Math.sin(ZV.t*2+o.i);
    if(FP.on&&Math.abs(P.x-o.x)<1.1&&Math.abs(P.z-o.z)<1.1&&Math.abs(P.y-o.y)<2){scene.remove(o.g);ZV.items.splice(i,1);zv().got.push(o.i);zvGive(o.it,o.v,o.x,o.y,o.z);}}}
function zvNearest(){if(!ZV.items.length)return null;const P=FP.on?FP.p:controls.target;let b=null,bd=1e9;for(const o of ZV.items){const d=Math.hypot(o.x-P.x,o.z-P.z);if(d<bd){bd=d;b=o;}}const dx=b.x-P.x,dz=b.z-P.z;
  const dir=Math.abs(dx)>Math.abs(dz)*2?(dx>0?"istoku":"zapadu"):Math.abs(dz)>Math.abs(dx)*2?(dz>0?"jugu":"sjeveru"):(dz>0?"jugo":"sjevero")+(dx>0?"istoku":"zapadu");return {o:b,d:Math.round(bd),dir};}

/* ---------- acrobatics ---------- */
function zvMile(key,n,name){const M=[[10,30],[50,80],[150,200],[400,400]];for(const [need,c] of M)if(n===need){S.coins+=c;renderEco();save();setTimeout(()=>{toast("Akrobatkinja! "+need+"x "+name+": +"+c+" zlatnika",3800);sfx.fanfare&&sfx.fanfare();},500);}}
{const _oj=onFoxJump;onFoxJump=function(dbl){_oj.apply(this,arguments);try{if(dbl||FP.mount||WORLD&&0)return;const V=FP.v,P=FP.p;
    if(ZV.pb>0){ZV.pb=0;ZV.chain=0;V.y=Math.max(V.y,12.6);FP.flipT=.55;FP.canCut=false;tone(330,.08,"triangle",.03);tone(660,.14,"sine",.03,.06);for(let i=0;i<16;i++)mgSpawn({t:"star",x:P.x,y:P.y+.2,z:P.z,vx:(Math.random()-.5)*4,vy:1+Math.random()*3,vz:(Math.random()-.5)*4,life:.6,size:.3,size2:.04,col:[0xfff1a8,0xffc53d,0xffffff],add:1,drag:2});return;}
    const sp=Math.hypot(V.x,V.z);if(ZV.gT<.3&&sp>2.2&&ZV.chain<2)ZV.chain++;else ZV.chain=0;
    if(ZV.chain===1){V.y*=1.17;tone(520,.06,"triangle",.025);burst(P.x,P.y+.1,P.z,8,[[1,1,1],[.8,.95,1]],1.2,.6,.4);}
    else if(ZV.chain===2){V.y*=1.44;FP.flipT=.6;FP.canCut=false;[660,880,1175].forEach((f,i)=>tone(f,.09,"triangle",.028,i*.05));
      for(let i=0;i<22;i++)mgSpawn({t:"star",x:P.x+(Math.random()-.5)*.4,y:P.y+.2,z:P.z+(Math.random()-.5)*.4,vx:(Math.random()-.5)*3,vy:Math.random()*2,vz:(Math.random()-.5)*3,life:.8,size:.32,size2:.04,col:[0xff9ad0,0x9ad0ff,0xfff1a8],add:1,drag:1.6});
      const z=zv();z.tri++;zvMile("tri",z.tri,"trostruki skok");if(new Date().getDay()===3&&z.ak3<30){z.ak3++;S.coins++;renderEco();}if(z.tri%5===0)save();
      if(z.tri===1)toast("Trostruki skok! Tri skoka zaredom u trku, svaki čim Rida dotakne tlo.",4200);}
  }catch(e){}};}
function zvPoundStart(){const P=FP.p,V=FP.v;ZV.pound=1;ZV.pt=.14;V.x=0;V.z=0;V.y=2.5;FP.flipT=.3;tone(700,.05,"triangle",.03);tone(300,.12,"sawtooth",.02,.05);}
function zvShock(){const P=FP.p;const z=zv();z.pnd++;zvMile("pnd",z.pnd,"tres o tlo");ZV.pb=.26;
  for(let i=0;i<36;i++){const a=i/36*6.283;mgSpawn({t:"spark",x:P.x+Math.cos(a)*.4,y:P.y+.12,z:P.z+Math.sin(a)*.4,vx:Math.cos(a)*7,vy:.4,vz:Math.sin(a)*7,life:.45,size:.5,size2:.06,col:[0xffffff,0xfff1a8,0xffd9a0],add:1,drag:3.2});}
  burst(P.x,P.y+.1,P.z,34,[[.9,.85,.7],[1,1,1]],3.4,1.6,.6);tone(70,.3,"sine",.09);tone(120,.16,"square",.03);FP.camT.y-=.45;FP.squash=.3;if(typeof padRumble==="function"&&PAD.on)padRumble(220,.9,.6);
  if(z.pnd===1)toast("Tres o tlo! Odmah zatim pritisni Skok za veliki odskok. Tres pod krošnjom otrese darove.",5200);
  /* shake a tree: any leaves close above */
  if(WORLD)return;let lx=0,ly=0,lz=0,n=0;const bx=Math.floor(P.x),by=Math.floor(P.y),bz=Math.floor(P.z);for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++)for(let dy=1;dy<=8;dy++){const t=get(bx+dx,by+dy,bz+dz);if(t&&TYPES[t].leaf){lx+=bx+dx+.5;ly+=by+dy;lz+=bz+dz+.5;n++;}}
  if(n<6)return;lx/=n;ly/=n;lz/=n;for(let i=0;i<26;i++)mgSpawn({t:"petal",x:lx+(Math.random()-.5)*4,y:ly+(Math.random()-.5)*2,z:lz+(Math.random()-.5)*4,vx:(Math.random()-.5)*1.5,vy:-.5-Math.random(),vz:(Math.random()-.5)*1.5,life:1.6+Math.random(),size:.2,size2:.16,col:zvSeason().k==="jesen"?[0xf0902a,0xd9641e,0xffc53d]:[0x5ac83a,0x3f9a2e,0x8adf5a],grav:2.5,drag:1.5,wob:1.4,flap:true,spin:6});
  tone(2400,.2,"triangle",.012);if(z.shake>=10){if(!ZV.shakeTip){ZV.shakeTip=1;toast("Krošnje su za danas otresene. Sutra opet nešto padne!",3000);}return;}z.shake++;
  const L=ZITEMS[zvSeason().k];const r=Math.random();if(r<.3){const it=L[r<.06?2:r<.16?1:0];setTimeout(()=>zvGive(it,it.v,P.x,P.y,P.z,"Palo s krošnje"),450);}
  else{const c=3+Math.floor(Math.random()*5);S.coins+=c;renderEco();save();setTimeout(()=>{sfx.coin?sfx.coin():sfx.pop();flyCoins(c,{x:innerWidth/2,y:innerHeight*.5});},350);}}
{const _fl=foxLand;foxLand=function(vy){const pd=ZV.pound;ZV.pound=0;_fl.apply(this,arguments);if(pd)try{zvShock();}catch(e){}};}
{const _ts=tickSquirrel;tickSquirrel=function(dt){if(FP.on){const d=Math.min(dt,.05),P=FP.p,V=FP.v;ZV.pb=Math.max(0,ZV.pb-d);if(FP.ground)ZV.gT+=d;else ZV.gT=0;
    const busy=!$("veil").hidden||!!FP.shopping||!!window.RWON;const dive=!busy&&!!(FP.keys.c||FP.keys.control||FP.diveB);
    if(ZV.pound){if(FP.swim||FP.boat||FP.mount||FP.hook){ZV.pound=0;}else{ZV.pt-=d;if(ZV.pt<=0){V.y=-25;V.x*=.5;V.z*=.5;if(Math.random()<.6)mgSpawn({t:"spark",x:P.x,y:P.y+.6,z:P.z,vy:3,life:.25,size:.3,size2:.03,col:[0xffffff,0xfff1a8],add:1});}else{V.x=0;V.z=0;}}}
    else if(dive&&!ZV.dPrev&&zvCanPound())zvPoundStart();ZV.dPrev=dive;}
  _ts.apply(this,arguments);if(FP.on&&ZV.pound&&FP.ground){ZV.pound=0;try{zvShock();}catch(e){}}};}
function zvCanPound(){if(!FP.on||FP.ground||FP.swim||FP.boat||FP.mount||FP.hook||FP.gliding)return false;const P=FP.p;if(waterAt(P.x,P.y-.4,P.z))return false;const fy=floorY(P.x,P.y,P.z);return P.y-(fy+1)>1.6;}
/* touch: the dive button turns into "Tres!" while Rida is high in the air */
{const _ui=fpUI;fpUI=function(){_ui.apply(this,arguments);try{const b=$("fpDive");if(b&&b.hidden&&zvCanPound()){b.hidden=false;b.textContent="Tres!";}}catch(e){}};}
/* pounding onto a trampoline: a huge bounce */
{const _tb=trampBounce;trampBounce=function(){const pd=ZV.pound,vy0=FP.v.y;_tb.apply(this,arguments);if(pd&&FP.v.y>10&&vy0<0){ZV.pound=0;FP.v.y=27;FP.flipT=.7;[440,660,880,1320].forEach((f,i)=>tone(f,.1,"triangle",.03,i*.05));
    for(let i=0;i<30;i++)mgSpawn({t:"star",x:FP.p.x,y:FP.p.y,z:FP.p.z,vx:(Math.random()-.5)*6,vy:Math.random()*5,vz:(Math.random()-.5)*6,life:.9,size:.36,size2:.04,col:[0xff9ad0,0x9ad0ff,0xfff1a8,0x9affc0],add:1,drag:1.5});tipOnce("megaTr","Mega odskok! Tres o trampolin baca Ridu do oblaka.");}};}
/* the magic wand also points to the nearest gift; snowballs and confetti are untouched */
{const _mw=mgWand;mgWand=function(){_mw.apply(this,arguments);try{if(WORLD||!FP.on)return;const n=zvNearest();if(!n)return;const P=FP.p,dx=(n.o.x-P.x)/n.d,dz=(n.o.z-P.z)/n.d;
    for(let i=0;i<26;i++)mgSpawn({t:"star",x:P.x+dx*i*.5,y:P.y+1+Math.sin(i*.5)*.3,z:P.z+dz*i*.5,vy:.4,life:.9+i*.05,size:.26,size2:.03,col:[0xfff1a8,0xffc53d,0xffffff],add:1});
    setTimeout(()=>toast("Štapić pokazuje: "+n.o.it.n+" je "+n.d+" koraka prema "+n.dir+".",3600),600);}catch(e){}};}

/* ---------- Glas otoka: today's page ---------- */
function sheetZivot(){const z=zv(),se=zvSeason(),w=zvWeather(),ev=ZEV[new Date().getDay()],h=new Date().getHours();const all=zvList(),got=all.filter(o=>z.got.indexOf(o.i)>=0).length,near=zvNearest();
  const fc=[];for(let b=Math.max(6,Math.floor(h/3)*3);b<=21;b+=3)fc.push('<div class="zvf'+(b<=h&&h<b+3?" on":"")+'">'+zvIco(b<=h&&h<b+3?w:zvWeatherAt(b),26)+'<small>'+(b<=h&&h<b+3?"sada":b+" h")+'</small></div>');
  const col=k=>ZITEMS[k].map(it=>'<div class="zvi'+(z.col[it.k]?"":" no")+'"><i style="background:#'+it.c.toString(16).padStart(6,"0")+'"></i><b>'+(z.col[it.k]?esc(it.n):"???")+'</b><small>'+(z.col[it.k]?"× "+z.col[it.k]:"još nije nađeno")+'</small></div>').join("");
  openSheet('<div class="sheet-head"><h2>Glas otoka</h2><button class="x" id="zvX" aria-label="Zatvori">×</button></div>'+
    '<div class="zvtop card"><div class="zvw">'+zvIco(w,44)+'</div><div><b>'+se.n+' · '+ZWN[w]+'</b><p class="muted">'+(w==="kisa"?"Kad pada kiša, niknu rijetke kišne gljive. Potraži ih!":w==="snijeg"?"Pada snijeg. Otok je tih i bijel.":w==="vjetar"?"Vjetar nosi "+(se.k==="jesen"?"lišće":"latice")+" preko otoka.":"Lijep dan za istraživanje.")+'</p></div></div>'+
    '<div class="zvfc">'+fc.join("")+'</div>'+
    (ev?'<div class="card zvev"><b>Danas: '+ev.n+'</b><p class="muted">'+ev.d+'</p></div>':"")+
    '<h3>Darovi otoka</h3><p class="muted">Svaki dan otok sakrije male darove. Svijetle stupom svjetla. Danas pronađeno: <b>'+got+' od '+all.length+'</b>.'+(near?' Najbliži je oko '+near.d+' koraka prema '+near.dir+'.':all.length===got?' Sve je pronađeno, bravo!':'')+'</p>'+
    '<div class="zvgrid">'+col(se.k)+(z.col.gljiva?'<div class="zvi"><i style="background:#e8324a"></i><b>Kišna gljiva</b><small>× '+z.col.gljiva+'</small></div>':'')+(z.col.zvjezdica?'<div class="zvi"><i style="background:#fff1a8"></i><b>Pala zvjezdica</b><small>× '+z.col.zvjezdica+'</small></div>':'')+'</div>'+
    '<p class="muted">'+(z.set[se.k]?"Zbirka ovog doba je potpuna.":"Pronađi sve tri vrste za sezonsku nagradu od 150 zlatnika.")+' Čarobni štapić pokazuje put do najbližeg dara.</p>'+
    '<h3>Akrobacije</h3><div class="zvak"><div class="card"><b>Trostruki skok</b><p class="muted">Tri skoka zaredom u trku. Skoči čim Rida dotakne tlo: drugi je viši, treći najviši.</p><small>Izvedeno: '+z.tri+'</small></div>'+
    '<div class="card"><b>Tres o tlo</b><p class="muted">U zraku pritisni Roni (C). Pod krošnjom otrese darove i zlatnike (10 puta na dan).</p><small>Izvedeno: '+z.pnd+'</small></div>'+
    '<div class="card"><b>Veliki odskok</b><p class="muted">Odmah nakon tresa pritisni Skok. Tres o trampolin baca još više!</p></div></div>');
  $("zvX").onclick=()=>{sfx.click();closeSheet();};}
document.querySelector(".hud-top .stats").insertAdjacentHTML("afterbegin",'<button class="card chip zvchip" id="zvChip" title="Glas otoka"></button>');
$("zvChip").onclick=()=>{sfx.click();sheetZivot();};
function zvChip(){const w=zvWeather(),n=ZV.items.length,sig=w+n+WORLD;if(sig===ZV.chipSig)return;ZV.chipSig=sig;const c=$("zvChip");c.hidden=!!WORLD;c.innerHTML=zvIco(w,20)+'<b>'+n+'</b><small>'+(n===1?"dar":"darova")+'</small>';}
addEventListener("keydown",e=>{if(e.key.toLowerCase()==="o"&&!e.repeat&&!(e.target&&e.target.closest&&e.target.closest("input,textarea"))&&$("veil").hidden&&G2.mode!=="mini"&&!WORLD)sheetZivot();});

{const _te=tickEnv;tickEnv=function(dt){_te(dt);if(ZV.err>3)return;try{ZV.t+=dt;if(WORLD){if(!ZV.hid){ZV.hid=1;$("zvChip").hidden=true;}return;}
    ZV.wT-=dt;if(ZV.wT<=0){ZV.wT=5;const w=zvWeather();if(ZV.w&&w!==ZV.w&&FP.on)toast(w==="kisa"?"Počinje kiša. Niknut će kišne gljive!":w==="snijeg"?"Počinje padati snijeg.":w==="vjetar"?"Diže se vjetar.":"Razvedrilo se.",3000);ZV.w=w;zvChip();}
    zvSkyTick(dt);zvItemsTick(dt);if(ZV.chipN!==ZV.items.length){ZV.chipN=ZV.items.length;zvChip();}}catch(e){ZV.err++;console.warn("zivot",e);}};}
