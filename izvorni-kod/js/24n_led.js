/* =================== v17: Ledeno kraljevstvo =================== */
/* a moonlit valley under the northern lights: a frozen lake to skate on, an ice cave, hot springs with geysers,
   a toboggan run, an ice maze, an observatory, a frozen waterfall, an igloo village and the Ice Palace.
   Three animals live only here (mammoth calf, floating reindeer, polar bear cub) and become Rida's friends. */
PRESETS.led={top:0x081434,hz:0x2c5c8c,sun:0xc4d8ff,si:1.4,hemi:.8,el:.62,az:2.3,fog:0x1a3456,glow:1.25,stars:1,sh:0x3a7a9a,dp:0x0c2a4a,exp:1.02,night:.82};

/* ---------- world-only rewards ---------- */
MSKIN.polarna={n:"Polarna lisica",d:"Bijela kao snijeg pod mjesečinom, a za njom trepere boje polarne svjetlosti.",p:0,rar:"l",O:0xe6f8ff,W:0xffffff,B:0x167a7a,D:0x58d4c0,glowO:.16,fx:"aurora",wr:"Ledeno kraljevstvo"};
MTRAIL.aurora={n:"Polarna svjetlost",d:"Iza Ride vijore zelene i ljubičaste vrpce svjetla.",p:0,rar:"l",wr:"Ledeno kraljevstvo"};
TR.aurora=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.4,y:p.y+.25+Math.random()*.6,z:p.z+(Math.random()-.5)*.4,vy:.55,life:1.5,size:.26,size2:.62,col:[0x5affb0,0x6ae8ff,0xb46cff,0x8affd0],add:1,wob:1.2,op:.85});TRATE.aurora=11;
const LWGAD={ledeni:{n:"Ledeni štapić",d:"Mahni i voda pred Ridom se zaledi. Hodaj po moru, po jezeru, kamo god poželiš!",p:0,rar:"l",act:1,wr:"Ledeno kraljevstvo",how:"Stani kraj vode i dodirni štapić na traci. Led se otopi nakon pola minute."}};
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};
  ins("skin","polarna",MSKIN.polarna);ins("trail","aurora",MTRAIL.aurora);MGAD.ledeni=LWGAD.ledeni;ins("gad","ledeni",LWGAD.ledeni);}

/* ---------- the three friends who live only here ---------- */
MODELS.mamut=function(){const F=0x8a5a3a,D=0x60402a,Iv=0xf4ecd8,K=0x1a1410,hd={name:"head",px:0,py:1.1,pz:.5},tl={name:"tail",px:0,py:.95,pz:-.56};
  return mk([[.92,.78,1.1,0,.88,0,F],[.96,.2,1.04,0,.52,0,D],[.5,.22,.6,0,1.32,-.1,D],[.72,.68,.6,0,1.15,.62,F,hd],[.34,.22,.34,0,1.56,.6,D,hd],
    [.1,.44,.36,-.4,1.12,.56,D,hd],[.1,.44,.36,.4,1.12,.56,D,hd],[.07,.08,.02,-.2,1.26,.93,K,hd],[.07,.08,.02,.2,1.26,.93,K,hd],
    [.22,.3,.22,0,.9,.98,F,hd],[.18,.26,.18,0,.66,1.04,F,hd],[.16,.12,.22,0,.53,1.12,D,hd],[.08,.08,.34,-.22,.86,1.0,Iv,hd],[.08,.08,.34,.22,.86,1.0,Iv,hd],
    [.1,.32,.1,0,.82,-.6,D,tl],[.14,.12,.12,0,.64,-.62,K,tl]].concat(legs(.26,.52,.28,.36,D,.52)));};
MODELS.irvas=function(){const B=0xa87a50,C=0xf0e2c8,L=0x5a3a24,K=0x241810,A=0xcff8ff,hd={name:"head",px:0,py:1.35,pz:.45},tl={name:"tail",px:0,py:1.12,pz:-.52};
  const g=mk([[.5,.5,1.0,0,1.02,0,B],[.38,.32,.14,0,1.0,.5,C],[.26,.5,.26,0,1.38,.46,B,hd],[.3,.3,.48,0,1.7,.64,B,hd],[.22,.18,.16,0,1.64,.92,C,hd],[.1,.08,.05,0,1.68,1.0,K,hd],
    [.06,.07,.02,-.13,1.78,.84,K,hd],[.06,.07,.02,.13,1.78,.84,K,hd],[.18,.08,.06,-.22,1.82,.52,B,hd],[.18,.08,.06,.22,1.82,.52,B,hd],
    [.06,.42,.06,-.12,2.05,.52,A,hd],[.06,.42,.06,.12,2.05,.52,A,hd],[.06,.06,.32,-.16,2.18,.42,A,hd],[.06,.06,.32,.16,2.18,.42,A,hd],[.26,.06,.06,-.24,2.12,.54,A,hd],[.26,.06,.06,.24,2.12,.54,A,hd],
    [.06,.26,.06,-.34,2.28,.54,A,hd],[.06,.26,.06,.34,2.28,.54,A,hd],[.06,.22,.06,-.16,2.36,.3,A,hd],[.06,.22,.06,.16,2.36,.3,A,hd],
    [.16,.16,.1,0,1.14,-.55,C,tl]].concat(legs(.12,.78,.17,.36,L,.78)));
  g.traverse(o=>{if(o.isMesh&&o.material.color.getHex()===LC(A).getHex()){o.material=o.material.clone();o.material.emissive=LC(0x7fe9ff);o.material.emissiveIntensity=.9;}});return g;};
MODELS.medvjedic=function(){const Wt=0xf6f3ea,Sh=0xdcd4c2,K=0x1a1a1e,Bl=0x3a8ad8,hd={name:"head",px:0,py:.72,pz:.5},tl={name:"tail",px:0,py:.66,pz:-.48};
  return mk([[.62,.56,.9,0,.56,0,Wt],[.5,.1,.22,0,.66,.44,Bl],[.14,.26,.08,.2,.5,.5,Bl],[.48,.44,.42,0,.78,.6,Wt,hd],[.26,.18,.18,0,.7,.86,Sh,hd],[.1,.07,.05,0,.77,.96,K,hd],
    [.13,.13,.07,-.17,1.0,.54,Wt,hd],[.13,.13,.07,.17,1.0,.54,Wt,hd],[.06,.06,.02,-.12,.87,.815,K,hd],[.06,.06,.02,.12,.87,.815,K,hd],[.13,.12,.1,0,.66,-.48,Wt,tl]].concat(legs(.19,.3,.19,.3,Sh,.3)));};
MODELS.carpingvin=function(){const g=MODELS.pingvin();const hd=g.userData.parts.head;const G=std(0xffc53d,{metalness:.6,roughness:.3}),R=std(0xd8304a),Bl=std(0x7fe9e0,{emissive:LC(0x3ad8c8),emissiveIntensity:.8});
  const add=(w,h,d,x,y,z,m,par)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);(par||g).add(o);return o;};
  for(const [x,z] of [[-.12,-.12],[.12,-.12],[-.12,.12],[.12,.12],[0,.13],[0,-.13],[.13,0],[-.13,0]])add(.06,.14,.06,x,.36,z,G,hd);add(.32,.06,.32,0,.28,0,G,hd);add(.07,.07,.07,0,.33,.17,Bl,hd);
  add(.52,.5,.08,0,.42,-.2,R);add(.56,.06,.12,0,.66,-.16,std(0xffffff));return g;};
MODELS.pingvinko=()=>MODELS.pingvin();
MODELS.snjezec=()=>MODELS.zec();
Object.assign(PETS,{
  mamut:{fav:"bundeva",src:"world",world:"led",n:"Mamutić Kosko",d:"Mali mamut iz Ledenog kraljevstva. Krzno mu je toplo, ali surla mu se stalno smrzava.",gd:"Iz snijega iskopa plavi led i zlatnike.",gift:()=>[["pled",4],["coins",12]]},
  irvas:{fav:MATS.svjetlocvijet?"svjetlocvijet":"bobice",src:"world",world:"led",n:"Irvas Zvjezdan",d:"Rogovi mu svijetle kao zvijezde, a kad skoči, lebdi kroz zrak.",gd:"Donosi zvjezdanu prašinu i čarobno sjeme.",gift:()=>[["s_svjetlo",1],["coins",15]]},
  medvjedic:{fav:"riba",src:"world",world:"led",n:"Medvjedić Grudko",d:"Bijeli medvjedić s plavim šalom. Obožava ribu i klizanje na trbuhu.",gd:"Iz mora donosi bisere.",gift:()=>[["biser",1],["coins",10]]}});
Object.assign(SPEC,{
  mamut:{n:"Mamutovo jahanje",d:"Kosko te nosi kroz snijeg. Kad doskoči, zemlja zadrhti i snijeg poleti uvis!",ride:1,ic:"pled"},
  irvas:{n:"Zvjezdani let",d:"Zvjezdan trči brže od vjetra. U zraku drži Skok i lebdjet ćete među zvijezdama!",ride:1,ic:"star"},
  medvjedic:{n:"Medvjeđe klizanje",d:"Grudko te nosi, a na ledu klizi na trbuhu kao raketa!",ride:1,ic:"led"}});
Object.assign(RIDES,{mamut:{land:1,speed:6.4,jump:8.8,seat:1.02,stomp:1},irvas:{land:1,speed:9.8,jump:10,seat:1.02,glide:1},medvjedic:{land:1,speed:7.4,jump:8.2,seat:.64,ice:1}});
const LWPETS=["mamut","irvas","medvjedic"];NEWPETS.push(...LWPETS);
{const _snp=spawnNewPet;spawnNewPet=function(k){if(!LWPETS.includes(k))return _snp(k);let e=petEnt(k);if(e)return e;if(WORLD)return null;
  const sp=S.portalSpot||{x:LIB.x+.5,z:LIB.z+10,ry:0};const i=LWPETS.indexOf(k)-1;const c=Math.cos(sp.ry),s=Math.sin(sp.ry);
  const near={x:sp.x+Math.sin(sp.ry)*5+c*i*4,z:sp.z+Math.cos(sp.ry)*5-s*i*4};e=spawn(k,PETS[k].n,{speed:k==="mamut"?.9:k==="irvas"?1.5:1.2,near});return e;};}
{const _mu=mountUp;mountUp=function(k){_mu(k);if(!FP.mount||FP.mount.k!==k)return;const L={mamut:"Kosko te nosi! Kad doskoči, snijeg poleti uvis.",irvas:"Zvjezdan juri! Skoči i drži Skok, pa ćete lebdjeti.",medvjedic:"Grudko te nosi! Na ledu klizi kao raketa."}[k];
  if(L)toast(L+" Za silazak: gumb Siđi"+(PAD.on?" ili Y":"")+".",4600);};}

/* ---------- the generator ---------- */
const LWQ={mamut:{need:3,item:"toplik",at:"vrela",ask:"Brrr! Ja sam Kosko. Tako mi je hladno da mi se surla smrznula! Na toplim vrelima sjaje topli kamenčići. Doneseš mi tri?",
    got:"Topli kamenčić",done:"Toplo! Surla mi se odmrznula! Hvala ti, sad smo prijatelji. Popni se, nosit ću te!"},
  irvas:{need:5,item:"lisaj",at:"suma",ask:"Pssst... Ja sam Zvjezdan. Rogovi mi sjaje samo kad pojedem svjetleći lišaj. U šumi raste pet komadića. Pomogneš mi?",
    got:"Svjetleći lišaj",done:"Gle, rogovi mi opet sjaje! Hvala ti. Skoči mi na leđa, poletjet ćemo!"},
  medvjedic:{need:3,item:"riba",at:"jezero",ask:"Ja sam Grudko! Gladan sam, a ribe iskaču iz rupe u ledu prebrzo za mene. Uhvatiš mi tri? Dodirni ribu dok se praćaka na ledu!",
    got:"Riba za Grudka",done:"Njam, njam! Najbolja riba na svijetu! Sad smo prijatelji. Hoćeš klizati sa mnom?"}};
const LW={pick:[],rings:[],gey:[],pools:[],fish:null,hole:null,snow:null,aur:[],aurI:.4,lich:[],warm:[],chute:[]};
function lwH(x,z){const dx=x-128,dz=z-128,r=Math.hypot(dx,dz),a=Math.atan2(dz,dx);
  let h=17+(fbm(x*.035,z*.035)-.5)*3;
  const rr=r*(1+.14*(vnoise(Math.cos(a)*2.2+5,Math.sin(a)*2.2+5,9)-.5));h+=sstep(80,104,rr)*(22+fbm(x*.045+3,z*.045)*22);
  {const d=Math.hypot(x-50,z-128);if(d<36)h=Math.max(h,17+Math.pow(1-d/36,1.3)*40+(fbm(x*.08,z*.08)-.5)*4*(1-d/36));}
  {const d=Math.hypot(x-76,z-186);if(d<34)h=Math.max(h,17+24*Math.min(1,Math.max(0,1-(d-5)/29)));}
  {const d=Math.hypot(x-74,z-66);if(d<22)h=Math.max(h,17+12*Math.min(1,Math.max(0,1-(d-4)/18)));}
  {const d=Math.hypot((x-128)*.75,z-44);if(d<31)h=Math.max(h,d<21?24:24-(d-21)*.72);}
  {const d=Math.hypot(x-188,z-138);if(d<20)h-=2*sstep(0,1,1-d/20);}
  {const d=Math.hypot(x-128,z-126);if(d<33)h=16.4+(h-16.4)*sstep(25,33,d);}
  return Math.min(60,h);}
function lwCol(x,z,top,t){/* make one column end exactly at top with block t */for(let y=top+1;y<H;y++){if(prot[I(x,y,z)])break;vox[I(x,y,z)]=0;}for(let y=1;y<top;y++)if(!vox[I(x,y,z)])vox[I(x,y,z)]=T.kamen;wput(x,top,z,t);}
function lwFlat(cx,cz,r,y,t){for(let dx=-Math.ceil(r);dx<=r;dx++)for(let dz=-Math.ceil(r);dz<=r;dz++)if(Math.hypot(dx,dz)<=r)lwCol(cx+dx,cz+dz,y,t||T.snijeg);}
function lwSpruce(x,z,hh,big){const y=wTopAt(x,z);if(y<17)return false;const g0=get(x,y,z);if(g0!==T.snijeg&&g0!==T.kamen&&g0!==T.mahovina)return false;
  const tw=big?2:1;for(let i=1;i<=hh;i++)for(let a=0;a<tw;a++)for(let b=0;b<tw;b++)wput(x+a,y+i,z+b,T.smreka_d);
  const top=y+hh+1,cx=x+(tw-1)/2,cz=z+(tw-1)/2;wput(x,top,z,T.smreka);wput(x,top+1,z,T.smreka);wput(x,top+2,z,T.snijeg);
  const R=big?6.2:3.2;for(let ly=top;ly>=y+(big?6:3);ly--){const k=top-ly;const r=Math.min(R,.7+k*(big?.36:.42))*((k%3===2)?.72:1);const c=Math.ceil(r)+1;
    for(let dx=-c;dx<=c;dx++)for(let dz=-c;dz<=c;dz++){const X=Math.round(cx+dx),Z=Math.round(cz+dz);if(Math.hypot(X-cx,Z-cz)>r)continue;if(!get(X,ly,Z))wput(X,ly,Z,T.smreka);}}
  for(let dx=-7;dx<=7;dx++)for(let dz=-7;dz<=7;dz++)for(let ly=top+1;ly>=y+3;ly--){const X=x+dx,Z=z+dz;if(get(X,ly,Z)===T.smreka&&!get(X,ly+1,Z)&&hash3(X,ly,Z)<.55){wput(X,ly+1,Z,T.snijeg);break;}}
  return top;}
function lwArch(x,y,z){for(let h=1;h<=5;h++){wput(x-2,y+h,z,T.pled,1);wput(x+2,y+h,z,T.pled,1);}for(let dx=-2;dx<=2;dx++)wput(x+dx,y+6,z,dx===0?T.kristal:T.kvarc,1);
  wput(x-3,y+1,z,T.kvarc,1);wput(x+3,y+1,z,T.kvarc,1);wput(x-2,y+7,z,T.pled,1);wput(x+2,y+7,z,T.pled,1);wput(x,y+7,z,T.pled,1);for(let dx=-1;dx<=1;dx++)for(let h=1;h<=5;h++)vox[I(x+dx,y+h,z)]=0;}
function lwPathD(px,pz,P){let best=1e9;for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1];const dx=b[0]-a[0],dz=b[1]-a[1],L2=dx*dx+dz*dz;let t=((px-a[0])*dx+(pz-a[1])*dz)/L2;t=Math.max(0,Math.min(1,t));best=Math.min(best,Math.hypot(px-a[0]-dx*t,pz-a[1]-dz*t));}return best;}
const LW_CHUTE=[[81,181],[92,171],[105,173],[110,184],[102,194],[111,201],[119,199]];
function lwGen(){vox.fill(0);prot.fill(0);hmap.fill(0);mask.fill(0);biome.fill(0);POI.length=0;CHESTS.length=0;FALLS.clear();WG.stars.length=0;WG.wind.length=0;WG.gate.length=0;WG.isl={};WG.fall=null;
  LW.pick.length=0;LW.rings.length=0;LW.gey.length=0;LW.pools.length=0;LW.lich.length=0;LW.warm.length=0;
  /* terrain */
  const HM=new Int16Array(W*W);for(let z=0;z<W;z++)for(let x=0;x<W;x++)HM[x+z*W]=Math.round(lwH(x,z));
  for(let z=1;z<W-1;z++)for(let x=1;x<W-1;x++){const h=HM[x+z*W];const dl=Math.hypot(x-128,z-126);
    if(dl<25.5){for(let y=1;y<=11;y++)vox[I(x,y,z)]=T.kamen;vox[I(x,12,z)]=hash2(x,z,5)<.5?T.sljunak:T.pijesak;for(let y=13;y<=15;y++)vox[I(x,y,z)]=T.voda;vox[I(x,16,z)]=T.led;continue;}
    let sl=0;for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])sl=Math.max(sl,Math.abs(HM[x+a+(z+b)*W]-h));
    for(let y=1;y<=h;y++){let t;if(y===h)t=sl>=3?T.kamen:T.snijeg;else if(y>h-3)t=sl>=3?T.kamen:T.snijeg;else{t=T.kamen;const q=hash3(x,y,z);if(q<.02)t=T.pled;else if(q<.03)t=T.r_zeljezo;else if(q<.036)t=T.r_bakar;else if(q<.039)t=T.r_dijamant;}vox[I(x,y,z)]=t;}}
  const I2=WG.isl;const isl=(k,x,z,r)=>{I2[k]={x,z,r,y:wTopAt(x,z)};};
  /* portal meadow */
  {const py=17;lwFlat(128,201,6.5,py);lwArch(128,py,204);WG.portal={x:128.5,y:py+1,z:204.5,ry:0};lwFlat(128,194,5,py);WG.spawn={x:128.5,y:py+1,z:196.5,cam:0};isl("livada",128,196,10);
    for(const [x,z] of [[121,201],[135,201],[122,195],[134,195]]){for(let h=1;h<=2;h++)wput(x,py+h,z,T.kvarc,1);wput(x,py+3,z,T.lampion,1);}}
  /* giant snowman with a snowball stair around him */
  {const cx=142,cz=186,y=wTopAt(cx,cz);const B=[[3.3,y+3.2],[2.4,y+8.2],[1.8,y+11.8]];
    for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++)for(let Y=y;Y<=y+14;Y++){for(const [r,cy] of B){if(Math.hypot(dx,(Y-cy)*1.05,dz)<=r){wput(cx+dx,Y,cz+dz,T.snijeg);break;}}}
    const fz=-1;/* faces west, toward the portal path */
    wput(cx-2,y+12,cz-1,T.r_ugljen);wput(cx-2,y+12,cz+1,T.r_ugljen);wput(cx-3,y+11,cz,T.vuna_n);wput(cx-4,y+11,cz,T.vuna_n);for(const yy of [y+7,y+9])wput(cx-3,yy,cz,T.r_ugljen);
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){wput(cx+dx,y+14,cz+dz,T.vuna_c);}wput(cx,y+15,cz,T.vuna_c);wput(cx,y+16,cz,T.vuna_b);
    for(let i=1;i<=3;i++){wput(cx,y+8+Math.floor(i/2),cz-2-i,T.smreka_d);wput(cx,y+8+i,cz+1+i,T.smreka_d);}
    for(let i=0;i<=14;i++){const a=Math.PI*.9+i*.62,Y=y+1+i;let rr=1;for(const [r,cy] of B){const q=r*r-(Y-cy)*(Y-cy);if(q>0)rr=Math.max(rr,Math.sqrt(q));}rr+=1.15;
      for(const da of [-.18,0,.18]){const X=Math.round(cx+Math.cos(a+da)*rr),Z=Math.round(cz+Math.sin(a+da)*rr);if(!get(X,Y,Z))wput(X,Y,Z,T.snijeg);}}
    wStar("snjegovic",cx+.5,y+17.6,cz+.5,"Na šeširu divovskog snjegovića. Penji se po grudama oko njega!");isl("snjegovic",cx,cz,5);}
  /* frozen lake: an ice spire in the middle, a fishing hole, ice spikes */
  {const C={x:128,z:126};for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){const d=Math.hypot(dx,dz);if(d<=4.2)wput(C.x+dx,17,C.z+dz,T.snijeg);if(d<=2.6)wput(C.x+dx,18,C.z+dz,T.snijeg);}
    for(let Y=19;Y<=25;Y++)for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)if(Math.hypot(dx,dz)<=1.2-(Y-19)*.05)wput(C.x+dx,Y,C.z+dz,T.pled,1);wput(C.x,26,C.z,T.kristal,1);
    for(let i=0;i<=7;i++){const a=i*.82,Y=19+i;for(const rr of [2.3,3.1]){const X=Math.round(C.x+Math.cos(a)*rr),Z=Math.round(C.z+Math.sin(a)*rr);wput(X,Y,Z,T.pled,1);}}
    wStar("jezero",C.x+.5,27.4,C.z+.5,"Na vrhu ledenog tornja usred zaleđenog jezera. Kliži do njega!");isl("jezero",128,126,25);
    for(let i=0;i<16;i++){const a=hash2(i,1,33)*6.28,r=8+hash2(i,2,33)*14;const x=Math.round(128+Math.cos(a)*r),z=Math.round(126+Math.sin(a)*r);if(Math.hypot(x-143,z-117)<4||Math.hypot(x-116,z-146)<6)continue;const hh=1+Math.floor(hash2(i,3,33)*4);for(let k=1;k<=hh;k++)wput(x,16+k,z,k===hh?T.kristal:T.pled);}
    LW.hole={x:143,z:117,y:16};for(const [a,b] of [[0,0],[1,0],[0,1],[1,1]])vox[I(143+a,16,117+b)]=T.voda;for(const [a,b] of [[-1,0],[2,1],[0,2],[1,-1],[-1,2],[2,-1]])wput(143+a,17,117+b,T.snijeg);}
  /* ice cave inside the western peak */
  {const cy=24;for(let x=54;x<=94;x++){const zc=128+Math.round(Math.sin(x*.21)*1.4);if(HM[x+zc*W]<=19&&x>70)break;
      for(let dz=-2;dz<=2;dz++)for(let y=18;y<=21;y++){if(Math.abs(dz)===2&&y===21)continue;vox[I(x,y,zc+dz)]=0;}vox[I(x,17,zc)]=T.kamen;
      if(x%5===0){wput(x,20,zc-3,T.kristal);wput(x,20,zc+3,T.kristal);}}
    for(let x=40;x<=67;x++)for(let z=116;z<=140;z++)for(let y=17;y<=33;y++){const q=((x-54)/12.5)**2+((y-cy)/8.5)**2+((z-128)/11.5)**2;if(q<1&&y>=18)vox[I(x,y,z)]=0;
      else if(q<1.18&&y>=17&&vox[I(x,y,z)]){const h=hash3(x,y,z);vox[I(x,y,z)]=h<.07?T.kristal:h<.24?T.pled:h<.3?T.ametist:T.kamen;}}
    for(let x=42;x<=66;x++)for(let z=118;z<=138;z++){if(get(x,18,z))continue;if(Math.hypot(x-55,z-131)<5)vox[I(x,17,z)]=T.led;
      if(hash2(x,z,42)<.09){let Y=33;while(Y>19&&!get(x,Y,z))Y--;/* Y is floor, find ceiling */let c=Y+1;while(c<34&&!get(x,c,z))c++;const L=1+Math.floor(hash2(x,z,43)*3);for(let k=1;k<=L;k++)if(!get(x,c-k,z)&&c-k>Y+2)wput(x,c-k,z,T.led);}
      if(hash2(x,z,44)<.05){const L=1+Math.floor(hash2(x,z,45)*2);for(let k=0;k<L;k++)if(!get(x,18+k,z))wput(x,18+k,z,k===L-1?T.kristal:T.pled);}}
    for(let y=18;y<=19;y++)for(let dx=0;dx<=1;dx++)for(let dz=0;dz<=1;dz++)wput(45+dx,y,127+dz,T.pled,1);
    wStar("spilja",46,21.4,128,"Duboko u Ledenoj špilji, na ledenom stupu. Uđi s istočne strane planine!");addChest("l_spilja",58,18,137,"Škrinja Ledene špilje");isl("spilja",54,128,12);}
  /* toboggan run down the sledding hill, with rings to fly through */
  {const P=LW_CHUTE;const segL=[];let L=0;for(let i=0;i<P.length-1;i++){const l=Math.hypot(P[i+1][0]-P[i][0],P[i+1][1]-P[i][1]);segL.push(l);L+=l;}
    const y0=41,y1=18;const at=s=>{let i=0;while(i<segL.length-1&&s>segL[i]){s-=segL[i];i++;}const t=Math.min(1,s/segL[i]);return [P[i][0]+(P[i+1][0]-P[i][0])*t,P[i][1]+(P[i+1][1]-P[i][1])*t];};
    const cells=new Map();for(let s=0;s<=L;s+=.25){const [cx,cz]=at(s);const y=Math.round(y0+(y1-y0)*Math.pow(s/L,.92));LW.chute.push({x:cx,z:cz,y,s});
      for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const X=Math.round(cx+dx),Z=Math.round(cz+dz),d=Math.hypot(X+.5-cx-.5,Z+.5-cz-.5);if(d>2.7)continue;const k=X+","+Z;const c=cells.get(k);
        if(d<=1.75){if(!c||!c.ch||y<c.y)cells.set(k,{X,Z,y,ch:1});}else if(!c)cells.set(k,{X,Z,y,ch:0});}}
    for(const c of cells.values()){if(!c.ch)continue;for(let Y=c.y+1;Y<=c.y+6;Y++)vox[I(c.X,Y,c.Z)]=0;wput(c.X,c.y,c.Z,T.tobogan);for(let Y=c.y-1;Y>0&&!get(c.X,Y,c.Z);Y--)wput(c.X,Y,c.Z,T.snijeg);}
    for(const c of cells.values()){if(c.ch)continue;let y=c.y;for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=cells.get((c.X+a)+","+(c.Z+b));if(n&&n.ch)y=Math.min(y,n.y);}
      if(!get(c.X,y+1,c.Z)){wput(c.X,y+1,c.Z,T.snijeg);for(let Y=y;Y>0&&!get(c.X,Y,c.Z);Y--)wput(c.X,Y,c.Z,T.snijeg);}}
    for(let s=10;s<L-6;s+=8){const [cx,cz]=at(s),[nx,nz]=at(s+.5);const y=Math.round(y0+(y1-y0)*Math.pow(s/L,.92));LW.rings.push({x:cx+.5,y:y+1.9,z:cz+.5,ry:Math.atan2(nx-cx,nz-cz)});}
    const top=wTopAt(78,185);lwFlat(78,185,4.5,top);for(const [x,z] of [[75,182],[81,188],[75,188]]){wput(x,top+1,z,T.kvarc,1);wput(x,top+2,z,T.lampion,1);}
    wStar("brijeg",77.5,top+1.6,186.5,"Na vrhu Sanjkaškog brijega. Odozgo se spusti ledenim toboganom!");addChest("l_brijeg",80,top+1,184,"Sanjkaška škrinja");isl("brijeg",78,185,8);}
  /* observatory with a ramp spiralling around it */
  {const cx=74,cz=66,y0=wTopAt(cx,cz);lwFlat(cx,cz,7.5,y0);const top=y0+19;
    for(let y=y0+1;y<=top;y++)for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){const d=Math.hypot(dx,dz);if(d>3.6)continue;const wall=d>2.5;const win=wall&&(y-y0)%5===3&&(dx===0||dz===0);
      wput(cx+dx,y,cz+dz,wall?(win?T.staklo:((y-y0)%6===0?T.kvarc:T.pled)):((y-y0)%7===0?T.lampion:T.kvarc),1);}
    for(let a=0;a<=(top+1-y0)/2+.05;a+=.02){const Y=y0+Math.min(top+1-y0,Math.floor(a*2)+1);for(const rr of [4.1,4.7,5.3,5.9]){const X=Math.round(cx+Math.cos(a+1.57)*rr),Z=Math.round(cz+Math.sin(a+1.57)*rr);
        if(!prot[I(X,Y,Z)]||get(X,Y,Z)===T.pled){wput(X,Y,Z,T.pled,1);for(let k=1;k<=3;k++)if(!prot[I(X,Y+k,Z)])vox[I(X,Y+k,Z)]=0;}}}
    for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){const d=Math.hypot(dx,dz);if(d>3.95)continue;wput(cx+dx,top+1,cz+dz,d<1.6?T.kristal:T.kvarc,1);for(let k=2;k<=4;k++)vox[I(cx+dx,top+k,cz+dz)]=0;}
    for(let k=0;k<4;k++){wput(cx-1+k,top+2+Math.floor(k*.8),cz-2,T.tdaske,1);}wput(cx+3,top+5,cz-2,T.staklo,1);wput(cx-1,top+2,cz-3,T.tdaske,1);
    wStar("zvjezdarnica",cx+.5,top+2.6,cz+1.5,"Na vrhu Zvjezdarnice. Idi stazom koja se vije oko tornja!");isl("zvjezdarnica",cx,cz,7);}
  /* ice maze */
  {const cx=100,cz=92,N=8,S=3,half=Math.floor((N*S+1)/2);const y=wTopAt(cx,cz);lwFlat(cx,cz,half+2.5,y);
    const ox=cx-half,oz=cz-half;const wall=(x,z)=>{for(let h=1;h<=3;h++)wput(ox+x,y+h,oz+z,h===3&&hash2(x,z,61)<.035?T.kristal:T.pled,1);};
    const open=new Set();const vis=new Set();const cell=(i,j)=>i+","+j;const st=[[0,N-1]];vis.add(cell(0,N-1));let seed=7;const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;};
    while(st.length){const [i,j]=st[st.length-1];const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>[i+a,j+b]).filter(([a,b])=>a>=0&&b>=0&&a<N&&b<N&&!vis.has(cell(a,b)));
      if(!nb.length){st.pop();continue;}const [a,b]=nb[Math.floor(rnd()*nb.length)];open.add(cell(i,j)+"|"+cell(a,b));open.add(cell(a,b)+"|"+cell(i,j));vis.add(cell(a,b));st.push([a,b]);}
    const c0=N/2-1;for(const [a,b,c,d] of [[c0,c0,c0+1,c0],[c0,c0+1,c0+1,c0+1],[c0,c0,c0,c0+1],[c0+1,c0,c0+1,c0+1]]){open.add(cell(a,b)+"|"+cell(c,d));open.add(cell(c,d)+"|"+cell(a,b));}
    for(let i=0;i<=N;i++)for(let j=0;j<=N;j++)wall(i*S,j*S);
    for(let i=0;i<N;i++)for(let j=0;j<=N;j++){/* horizontal walls between (i,j-1) and (i,j) */const o=j>0&&j<N&&open.has(cell(i,j-1)+"|"+cell(i,j));const gate=(j===N&&i===Math.floor(N/2));if(!o&&!gate)for(let k=1;k<S;k++)wall(i*S+k,j*S);}
    for(let i=0;i<=N;i++)for(let j=0;j<N;j++){const o=i>0&&i<N&&open.has(cell(i-1,j)+"|"+cell(i,j));if(!o)for(let k=1;k<S;k++)wall(i*S,j*S+k);}
    for(let x=0;x<=N*S;x++)for(let z=0;z<=N*S;z++)if(!get(ox+x,y+1,oz+z)&&hash2(x,z,62)<.35)vox[I(ox+x,y,oz+z)]=T.led;
    const mc=ox+N*S/2,mz=oz+N*S/2;for(let h=1;h<=3;h++){vox[I(ox+N*S/2,y+h,oz+N*S/2)]=0;prot[I(ox+N*S/2,y+h,oz+N*S/2)]=0;}for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)vox[I(Math.floor(mc)+dx,y,Math.floor(mz)+dz)]=T.kvarc;
    wStar("labirint",Math.floor(mc)+.5,y+1.6,Math.floor(mz)+.5,"U srcu Ledenog labirinta. Ulaz je s južne strane!");addChest("l_labirint",ox+1.5,y+1,oz+1.5,"Škrinja u labirintu");isl("labirint",cx,cz,half+2);}
  /* hot springs: steaming pools, green moss where the snow melted, geysers and a tall rock */
  {const C={x:188,z:138};for(let dx=-17;dx<=17;dx++)for(let dz=-17;dz<=17;dz++){const d=Math.hypot(dx,dz);if(d>16)continue;const X=C.x+dx,Z=C.z+dz,t=wTopAt(X,Z);if(get(X,t,Z)===T.snijeg&&hash2(X,Z,71)<1.15-d/14)vox[I(X,t,Z)]=hash2(X,Z,72)<.3?T.trava:T.mahovina;}
    for(const [x,z,r] of [[184,134,3.4],[193,142,2.8],[181,145,2.6],[192,131,2.3],[200,138,2.2]]){const g=wTopAt(x,z);const R=Math.ceil(r)+1;
      for(let dx=-R;dx<=R;dx++)for(let dz=-R;dz<=R;dz++){const d=Math.hypot(dx,dz);const X=x+dx,Z=z+dz;if(d<=r){for(let Y=g+1;Y<g+5;Y++)vox[I(X,Y,Z)]=0;for(let Y=g-2;Y<=g;Y++)vox[I(X,Y,Z)]=T.voda;vox[I(X,g-3,Z)]=T.sljunak;}
        else if(d<=r+1.1){lwCol(X,Z,g,hash2(X,Z,73)<.5?T.kamen:T.sljunak);}}LW.pools.push({x:x+.5,z:z+.5,y:g+.9,r});}
    for(const [x,z,h,big] of [[196,126,15,1],[178,130,8,0],[189,152,8,0]]){const g=wTopAt(x,z);lwCol(x,z,g,T.kcigla);for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]])lwCol(x+a,z+b,g,T.kcigla);vox[I(x,g,z)]=T.voda;
      LW.gey.push({x:x+.5,z:z+.5,y0:g,h,big,per:big?6.5:5+hash2(x,z,74)*2,ph:hash2(x,z,75)*6,on:0,t:0});}
    {const x=199,z=125,g=wTopAt(x,z),T2=g+11;for(let Y=g+1;Y<=T2;Y++)for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const r=Math.hypot(dx,dz);const rr=Y>T2-2?2.6:1.7+Math.sin(Y*.9)*.25;if(r<=rr)wput(x+dx,Y,z+dz,Y>=T2?T.snijeg:T.kamen,1);}
      for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++)if(Math.hypot(dx,dz)<=3.1)wput(x+dx,T2,z+dz,T.snijeg,1);
      wStar("vrela",x+.5,T2+1.6,z+.5,"Na visokoj stijeni kraj gejzira. Stani na gejzir kad proključa i poletjet ćeš uvis!");}
    addChest("l_vrela",178,wTopAt(178,147)+1,147,"Topla škrinja");isl("vrela",188,138,16);
    for(const [x,z] of [[187,130],[196,145],[179,141]]){LW.warm.push({x:x+.5,z:z+.5,y:wTopAt(x,z)+1.5});}}
  /* mammoth valley */
  {const cx=190,cz=168,g=wTopAt(cx,cz);lwFlat(cx,cz,6,g);for(let dx=-1;dx<=1;dx++)for(let dz=-2;dz<=2;dz++)wput(cx+4+dx,g+1,cz+dz,T.sijeno);wput(cx+4,g+2,cz,T.sijeno);wput(cx+4,g+2,cz-1,T.sijeno);
    for(let i=0;i<7;i++){const a=i*.9+.3,r=7+hash2(i,1,81)*2;const x=Math.round(cx+Math.cos(a)*r),z=Math.round(cz+Math.sin(a)*r);const t=wTopAt(x,z);for(let dx=0;dx<=1;dx++)for(let dz=0;dz<=1;dz++)for(let k=1;k<=1+(i%2);k++)wput(x+dx,t+k,z+dz,k===1+(i%2)?T.snijeg:T.kamen);}
    isl("mamut",cx,cz,7);}
  /* spruce forest with a giant tree */
  {const cx=180,cz=84;const gx=182,gz=86;const gt=lwSpruce(gx,gz,25,true);
    if(gt){const y0=wTopAt(gx-3,gz);for(let a=0;a<=(gt-y0)/2;a+=.02){const Y=y0+Math.floor(a*2)+1;if(Y>gt)break;for(const rr of [2.4,3.1,3.8]){const X=Math.round(gx+.5+Math.cos(a)*rr),Z=Math.round(gz+.5+Math.sin(a)*rr);if(get(X,Y,Z)===T.smreka_d)continue;wput(X,Y,Z,T.sdaske,1);for(let k=1;k<=3;k++)if(get(X,Y+k,Z)!==T.smreka_d&&!prot[I(X,Y+k,Z)])vox[I(X,Y+k,Z)]=0;}}
      for(let dx=-2;dx<=3;dx++)for(let dz=-2;dz<=3;dz++){wput(gx+dx,gt+3,gz+dz,T.sdaske,1);for(let k=4;k<=6;k++)vox[I(gx+dx,gt+k,gz+dz)]=0;if((dx===-2||dx===3||dz===-2||dz===3)&&(dx+dz)%2===0)wput(gx+dx,gt+4,gz+dz,T.smreka_d,1);}
      wput(gx-2,gt+5,gz-2,T.lampion,1);wput(gx+3,gt+5,gz+3,T.lampion,1);
      wStar("suma",gx+1,gt+4.6,gz+1,"Na vrhu Stare smreke u šumi. Stube se vrte oko debla!");}
    let n=0;for(let i=0;i<400&&n<70;i++){const a=hash2(i,1,91)*6.28,r=Math.sqrt(hash2(i,2,91))*27;const x=Math.round(cx+Math.cos(a)*r),z=Math.round(cz+Math.sin(a)*r);
      if(Math.hypot(x-gx,z-gz)<9||Math.hypot(x-176,z-73)<7)continue;if(lwSpruce(x,z,4+Math.floor(hash2(i,3,91)*5)))n++;}
    for(const [x,z] of [[168,92],[192,92],[176,68],[188,76],[164,78]]){const t=wTopAt(x,z);LW.lich.push({x:x+.5,z:z+.5,y:t+1.3});}
    {const X=gx-4,Z=gz+5,g=HM[X+Z*W];for(let k=1;k<=3;k++){vox[I(X,g+k,Z)]=0;}addChest("l_suma",X,g+1,Z,"Šumska škrinja");}isl("suma",cx,cz,24);}
  /* frozen waterfall with a grotto behind the ice */
  {for(let x=200;x<=226;x++)for(let z=88;z<=112;z++){if(x<213)lwCol(x,z,17,x>=203&&x<=210&&z>=93&&z<=107?T.led:T.snijeg);else{const hc=Math.max(40,wTopAt(x,z));lwCol(x,z,hc,T.snijeg);for(let Y=18;Y<hc-1;Y++)if(vox[I(x,Y,z)]===T.snijeg)vox[I(x,Y,z)]=T.kamen;}}
    for(let x=213;x<=220;x++)for(let z=96;z<=104;z++)for(let y=18;y<=23;y++){const q=((x-217)/4)**2+((z-100)/4.5)**2+((y-18)/5.5)**2;if(q<1)vox[I(x,y,z)]=0;}
    for(let x=212;x<=216;x++)for(let z=103;z<=105;z++)for(let y=18;y<=20;y++)vox[I(x,y,z)]=0;
    for(let z=95;z<=103;z++){const L=40-18-Math.floor(hash2(z,1,95)*3);for(let y=40;y>=18;y--){const x=212;const gap=(z>=101)&&y<=21;if(gap){vox[I(x,y,z)]=0;continue;}wput(x,y,z,(y+z)%4===0?T.led:T.pled,1);if(hash2(z,y,96)<.3&&y<38)wput(x-1,y,z,T.pled,1);}}
    for(let z=94;z<=104;z++)wput(211,17,z,T.led);
    wput(220,20,98,T.kristal);wput(220,20,102,T.kristal);wput(216,22,96,T.kristal);
    wStar("slap",218,19.6,100,"Iza Zaleđenog slapa skriva se špiljica. Uđi kroz procjep sa strane!");addChest("l_slap",219,18,103,"Škrinja iza slapa");isl("slap",210,100,9);}
  /* igloo village */
  {const igloo=(cx,cz,R,door)=>{const by=wTopAt(cx,cz);lwFlat(cx,cz,R+1.5,by);for(let y=0;y<=R;y++)for(let z=-R-1;z<=R+1;z++)for(let x=-R-1;x<=R+1;x++){const d=Math.hypot(x,y*1.05,z);if(d<=R+.2&&d>R-.8)wput(cx+x,by+1+y,cz+z,T.snijeg,1);else if(d<=R-.8)vox[I(cx+x,by+1+y,cz+z)]=0;}
      const [ddx,ddz]=door;for(let k=Math.floor(R-1);k<=R+1;k++)for(let w=-1;w<=1;w++)for(let h=1;h<=2;h++){const X=cx+ddx*k+(ddz?w:0),Z=cz+ddz*k+(ddx?w:0);if(Math.abs(w)===1){if(h===1&&k>=R)wput(X,by+h,Z,T.snijeg,1);continue;}vox[I(X,by+h,Z)]=0;prot[I(X,by+h,Z)]=0;}
      for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)vox[I(cx+dx,by,cz+dz)]=T.vuna_b;const lr=Math.max(1,R-2);wput(cx-ddx*lr+(ddz?lr:0),by+1,cz-ddz*lr+(ddx?lr:0),T.lampion,1);return by;};
    const b1=igloo(162,178,4,[0,1]);igloo(172,174,3,[-1,0]);const b3=igloo(167,188,3,[0,-1]);
    const fy=wTopAt(167,181);for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])wput(167+a,fy+1,181+b,T.kamen);wput(167,fy+1,181,T.lampion);
    for(const [x,z] of [[158,186],[176,184],[164,170]]){const t=wTopAt(x,z);wput(x,t+1,z,T.kvarc);wput(x,t+2,z,T.lampion);}
    wStar("iglu",162.5,b1+2.6,178.5,"U najvećem igluu u Iglu selu. Ulaz je s južne strane!");addChest("l_iglu",167,b3-2,187,"Škrinja u igluu");isl("iglu",167,181,12);}
  /* the Ice Palace on the northern plateau */
  {const cx=128,cz=44,y=24;lwPalace(cx,cz,y);isl("palaca",cx,cz,18);
    for(let z=104;z>=62;z--){const t=wTopAt(cx,z);for(let dx=-2;dx<=2;dx++){const X=cx+dx;const tt=wTopAt(X,z);if(tt>=17&&get(X,tt,z)===T.snijeg)vox[I(X,tt,z)]=Math.abs(dx)===2?T.kvarc:T.kaldrma;}
      if(z%6===0)for(const dx of [-3,3]){const tt=wTopAt(cx+dx,z);wput(cx+dx,tt+1,z,T.kvarc,1);wput(cx+dx,tt+2,z,T.lampion,1);}}}
  /* scattered spruces and snowy boulders across the valley */
  const keep=[[128,126,32],[128,44,34],[100,92,19],[188,138,19],[180,84,30],[167,181,14],[128,198,10],[142,186,7],[74,66,10],[190,168,9],[212,100,12],[54,128,16],[78,185,9]];
  for(let i=0;i<900;i++){const x=6+Math.floor(hash2(i,1,99)*244),z=6+Math.floor(hash2(i,2,99)*244);const r=Math.hypot(x-128,z-128);if(r>98)continue;
    if(keep.some(([a,b,rr])=>Math.hypot(x-a,z-b)<rr))continue;if(lwPathD(x,z,LW_CHUTE)<5)continue;if(Math.abs(x-128)<5&&z>58&&z<106)continue;
    const q=hash2(i,3,99);if(q<.62)lwSpruce(x,z,3+Math.floor(hash2(i,4,99)*5));else if(q<.72){const t=wTopAt(x,z);if(t>=17){wput(x,t+1,z,T.kamen);if(q<.68)wput(x+1,t+1,z,T.kamen);wput(x,t+2,z,T.snijeg);}}}
  /* places to discover */
  [["l_livada","Snježna livada","livada"],["l_snjegovic","Divovski snjegović","snjegovic"],["l_jezero","Zaleđeno jezero","jezero"],["l_spilja","Ledena špilja","spilja"],["l_brijeg","Sanjkaški brijeg","brijeg"],
   ["l_zvjezdarnica","Zvjezdarnica","zvjezdarnica"],["l_labirint","Ledeni labirint","labirint"],["l_vrela","Topla vrela","vrela"],["l_mamut","Mamutova dolina","mamut"],["l_suma","Smrekova šuma","suma"],
   ["l_slap","Zaleđeni slap","slap"],["l_iglu","Iglu selo","iglu"],["l_palaca","Ledena palača","palaca"]].forEach(([k,n,i])=>{const c=I2[i];if(c)POI.push({k,n,x:c.x,z:c.z,r:Math.max(7,Math.min(14,c.r)),y:(c.y||17)-6});});}
function lwSpire(x,z,y0,h,r){for(let Y=y0;Y<=y0+h;Y++){const t=(Y-y0)/h;const rr=t<.62?r:r*(1-(t-.62)/.38)*1.05;const c=Math.ceil(rr);for(let dx=-c;dx<=c;dx++)for(let dz=-c;dz<=c;dz++){const d=Math.hypot(dx,dz);if(d>rr)continue;
    const shell=d>rr-1.1||t>=.62;if(shell)wput(x+dx,Y,z+dz,t>=.62?((Y%3)?T.pled:T.led):((Y-y0)%5===0?T.kvarc:T.pled),1);}}wput(x,y0+h+1,z,T.kristal,1);wput(x,y0+h+2,z,T.kristal,1);}
function lwPalace(cx,cz,y){const F=14,B=-12,Wd=16;
  for(let dx=-Wd-2;dx<=Wd+2;dx++)for(let dz=B-2;dz<=F+2;dz++){const X=cx+dx,Z=cz+dz;lwCol(X,Z,y,(Math.abs(dx)<Wd&&dz>B&&dz<F)?(((dx+dz)&1)?T.kvarc:T.pled):T.snijeg);}
  for(let dx=-Wd;dx<=Wd;dx++)for(let dz=B;dz<=F;dz++){if(Math.abs(dx)!==Wd&&dz!==B&&dz!==F)continue;for(let h=1;h<=7;h++){const gate=dz===F&&Math.abs(dx)<=1&&h<=4;wput(cx+dx,y+h,cz+dz,gate?T.kristal:h===1?T.kvarc:(h===5&&(dx+dz)%4===0?T.kristal:T.pled),1);if(gate)WG.gate.push([cx+dx,y+h,cz+dz]);}
    if((dx+dz)%2===0)wput(cx+dx,y+8,cz+dz,T.led,1);}
  for(let dx=-2;dx<=2;dx++)for(let h=5;h<=9;h++)if(!(Math.abs(dx)<=1&&h<=4))wput(cx+dx,y+h,cz+F,h===9&&Math.abs(dx)<2?T.kristal:T.pled,1);
  for(const [sx,sz] of [[-Wd,F],[Wd,F],[-Wd,B],[Wd,B]])lwSpire(cx+sx,cz+sz,y+1,22,2.6);
  for(const dx of [-5,5])lwSpire(cx+dx,cz+F+1,y+1,13,1.4);
  /* the keep */
  const kz0=B+1,kz1=B+11;for(let dx=-9;dx<=9;dx++)for(let dz=kz0;dz<=kz1;dz++)for(let h=1;h<=10;h++){const wall=Math.abs(dx)===9||dz===kz0||dz===kz1;const door=dz===kz1&&Math.abs(dx)<=1&&h<=4;
    const win=wall&&!door&&(h===4||h===5||h===8)&&((Math.abs(dx)===9&&(dz-kz0)%3===1)||(dz===kz1&&Math.abs(dx)%3===0&&Math.abs(dx)>1)||(dz===kz0&&Math.abs(dx)%3===0));
    wput(cx+dx,y+h,cz+dz,wall&&!door?(win?T.staklo:(h===1||h===10?T.kvarc:T.pled)):0,1);}
  for(let k=0;k<6;k++)for(let dx=-10+k;dx<=10-k;dx++)for(let dz=kz0-1+k;dz<=kz1+1-k;dz++)if(dx===-10+k||dx===10-k||dz===kz0-1+k||dz===kz1+1-k)wput(cx+dx,y+11+k,cz+dz,k%2?T.led:T.pled,1);
  for(const dx of [-6,6])lwSpire(cx+dx,cz+kz0+4,y+11,22,2);lwSpire(cx,cz+kz0+5,y+16,26,1.8);
  for(let dx=-1;dx<=1;dx++)for(let dz=kz0+1;dz<=kz0+2;dz++)wput(cx+dx,y+1,cz+dz,T.zlato,1);for(const dx of [-1,1])for(let h=2;h<=3;h++)wput(cx+dx,y+h,cz+kz0+1,T.zlato,1);wput(cx,y+4,cz+kz0+1,T.kristal,1);
  for(const dx of [-7,7])for(const dz of [kz0+2,kz0+6,kz1-2]){wput(cx+dx,y+1,cz+dz,T.kvarc,1);wput(cx+dx,y+2,cz+dz,T.svjetlo,1);}
  for(let dz=kz0+3;dz<=kz1;dz++)wput(cx,y,cz+dz,T.vuna_p,1);
  addChest("l_palaca",cx,y+1,cz+kz0+3,"Blago Ledene palače");
  /* courtyard: a frozen fountain and lanterns */
  const fz=cz+5;for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const d=Math.hypot(dx,dz);if(d<=3.2&&d>2.2)wput(cx+dx,y+1,fz+dz,T.kvarc,1);else if(d<=2.2)wput(cx+dx,y+1,fz+dz,T.led,1);}
  for(let h=2;h<=5;h++)wput(cx,y+h,fz,T.pled,1);for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){wput(cx+a,y+4,fz+b,T.pled,1);wput(cx+a*2,y+3,fz+b*2,T.pled,1);wput(cx+a*2,y+2,fz+b*2,T.led,1);}wput(cx,y+6,fz,T.kristal,1);
  for(const dx of [-11,11])for(const dz of [-6,0,6,11]){wput(cx+dx,y+1,cz+dz,T.kvarc,1);wput(cx+dx,y+2,cz+dz,T.lampion,1);}}
Object.assign(LOOT,{
  l_spilja:{coins:50,mats:{dijamant:1},blocks:{pled:12,kristal:3},msg:"Ledena špilja čuva najljepši plavi led. Napravi od njega nešto na svom otoku!"},
  l_brijeg:{coins:40,mats:{},blocks:{tobogan:16,snijeg:12},msg:"Ledeni tobogan! Složi ga niz brdo na otoku i spuštaj se kao raketa."},
  l_labirint:{coins:60,mats:{smaragd:1},blocks:{pled:12},msg:"Našla si put kroz labirint! Ni car Mrazko to ne zna napamet."},
  l_vrela:{coins:45,mats:{biser:2},blocks:{mahovina:8,kcigla:8},msg:"Topla vrela griju cijelu dolinu. Ova škrinja je čak i malo topla!"},
  l_suma:{coins:40,mats:{},blocks:{smreka:10,smreka_d:6,sdaske:12},msg:"Mirisne smrekove grane iz Ledenog kraljevstva."},
  l_slap:{coins:55,mats:{dijamant:1,biser:1},blocks:{pled:8,led:8},msg:"Iza slapa nitko nikad ne gleda. Osim tebe!"},
  l_iglu:{coins:35,mats:{},blocks:{snijeg:16,lampion:4},msg:"Sagradi i ti iglu na svom otoku!"},
  l_palaca:{coins:320,mats:{dijamant:3,smaragd:2,biser:3},blocks:{pled:24,kristal:6,tobogan:12},msg:"Deset snježnih kristala vratilo je sjaj Ledenoj palači. Polarna svjetlost sad blista za tebe!"}});

/* ---------- sky: northern lights, falling snow, a snowfield beyond the mountains ---------- */
function lwEnv(){const U={uTime,uI:{value:LW.aurI}};LW.aurU=U;
  const m=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false,
    vertexShader:"varying vec2 vU;uniform float uTime;void main(){vU=uv;vec3 p=position;p.z+=sin(p.x*.011+uTime*.13)*34.+sin(p.x*.029-uTime*.21)*11.;p.y+=sin(p.x*.017+uTime*.09)*14.;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",
    fragmentShader:"uniform float uTime,uI;varying vec2 vU;float h(float x){return fract(sin(x*127.1)*43758.5453);}float n(float x){float i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(h(i),h(i+1.),f);}"+
      "void main(){float x=vU.x*46.;float rays=.45+.55*n(x*2.7+uTime*.5)*(.6+.4*n(x*.9-uTime*.3));float band=n(x*.31+uTime*.07);float bot=smoothstep(0.,.1,vU.y)*(.75+.25*n(x*4.+uTime));float top=1.-smoothstep(.22+.55*band,1.,vU.y);"+
      "vec3 g=vec3(.22,1.,.58),c=vec3(.25,.85,1.),p=vec3(.78,.32,1.);vec3 col=mix(g,c,smoothstep(.12,.55,vU.y));col=mix(col,p,smoothstep(.5,.95,vU.y));"+
      "float edge=smoothstep(0.,.1,vU.x)*smoothstep(1.,.9,vU.x);float a=bot*top*rays*edge*uI;gl_FragColor=vec4(col*a*1.5,a);}"});
  for(const [ang,d,len,y] of [[-1.75,340,760,175],[-1.1,380,620,205],[-2.5,360,640,190],[.2,420,560,215],[2.6,400,600,200]]){const geo=new THREE.PlaneGeometry(len,170,160,1);const me=new THREE.Mesh(geo,m);
    me.position.set(CX+Math.cos(ang)*d,y,CZ+Math.sin(ang)*d);me.lookAt(CX,y,CZ);me.renderOrder=-1;me.frustumCulled=false;scene.add(me);LW.aur.push(me);}
  /* snowfield around the valley so the edge of the world never shows */
  const sh=new THREE.Shape();sh.moveTo(-1600,-1600);sh.lineTo(1600+W,-1600);sh.lineTo(1600+W,1600+W);sh.lineTo(-1600,1600+W);sh.lineTo(-1600,-1600);
  const hole=new THREE.Path();hole.moveTo(1,1);hole.lineTo(1,W-1);hole.lineTo(W-1,W-1);hole.lineTo(W-1,1);hole.lineTo(1,1);sh.holes.push(hole);
  const gp=new THREE.Mesh(new THREE.ShapeGeometry(sh).rotateX(Math.PI/2),new THREE.MeshStandardMaterial({color:0xe8f0ff,roughness:1,side:THREE.DoubleSide}));gp.position.y=40;scene.add(gp);
  /* falling snow that wraps around the camera */
  const c=document.createElement("canvas");c.width=c.height=32;const x=c.getContext("2d");const gr=x.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(.45,"rgba(255,255,255,.8)");gr.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=gr;x.fillRect(0,0,32,32);
  const N=2400,pos=new Float32Array(N*3),sp=new Float32Array(N);for(let i=0;i<N;i++){pos[i*3]=Math.random()*90;pos[i*3+1]=Math.random()*46;pos[i*3+2]=Math.random()*90;sp[i]=.7+Math.random()*1.3;}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(pos,3));const base=pos.slice();
  LW.snow=new THREE.Points(g,new THREE.PointsMaterial({map:new THREE.CanvasTexture(c),size:.26,transparent:true,depthWrite:false,opacity:.85,color:0xf4f8ff}));LW.snow.frustumCulled=false;LW.snow.userData={sp,base};scene.add(LW.snow);}
function lwSnowTick(dt,tt){const S2=LW.snow;if(!S2)return;const a=S2.geometry.attributes.position,p=a.array,{sp,base}=S2.userData;const cx=camera.position.x,cy=camera.position.y,cz=camera.position.z;
  for(let i=0;i<sp.length;i++){base[i*3+1]-=sp[i]*dt;if(base[i*3+1]<0)base[i*3+1]+=46;base[i*3]+=Math.sin(tt*.7+i)*.35*dt+.25*dt;
    const wx=((base[i*3]-cx)%90+135)%90-45,wy=((base[i*3+1]-cy)%46+69)%46-23,wz=((base[i*3+2]-cz)%90+135)%90-45;p[i*3]=cx+wx;p[i*3+1]=cy+wy;p[i*3+2]=cz+wz;}a.needsUpdate=true;}

/* ---------- collectibles: snowflake crystals ---------- */
function lwFlake(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:0xdffcff,emissive:LC(0x5ad8ff),emissiveIntensity:1.1,roughness:.2,metalness:.2,flatShading:true});
  for(let i=0;i<3;i++){const arm=new THREE.Group();arm.rotation.z=i*Math.PI/3;const b=new THREE.Mesh(new THREE.BoxGeometry(.09,.95,.09),m);arm.add(b);
    for(const s of [-1,1])for(const yy of [.26,-.26]){const t=new THREE.Mesh(new THREE.BoxGeometry(.07,.24,.07),m);t.position.set(s*.08,yy+Math.sign(yy)*.1,0);t.rotation.z=-s*Math.sign(yy)*.7;arm.add(t);}g.add(arm);}
  const core=new THREE.Mesh(new THREE.OctahedronGeometry(.13,0),m);g.add(core);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x8ae8ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.95}));sp.scale.set(2.4,2.4,1);g.add(sp);return g;}

/* ---------- life: the emperor, a penguin colony, snow hares and the three friends ---------- */
let carM=null;
function lwLife(){const put=(kind,name,x,z,o)=>{const e=spawn(kind,name,o||{speed:1});e.x=x;e.z=z;e.y=walkable(e.x,e.z,false)||wTopAt(Math.floor(x),Math.floor(z))+1;e.home={x,z};return e;};
  carM=put("carpingvin","Car Mrazko",133.5,193.5);carM.frozen=true;carM.g.rotation.y=-2.2;carM.g.scale.setScalar(1.45);
  ["Pingo","Klizko","Bubica","Frula","Točkica","Šlapko"].forEach((n,i)=>put("pingvinko",n,114+(i%3)*3,145+Math.floor(i/3)*3,{speed:.9}));
  [["Pahulja",150,170],["Bijelko",96,150],["Inje",160,98]].forEach(([n,x,z])=>put("snjezec",n,x,z,{speed:1.2}));
  put("mamut",PETS.mamut.n,189,167,{speed:.8});put("irvas",PETS.irvas.n,176.5,73.5,{speed:1.1});put("medvjedic",PETS.medvjedic.n,146.5,114.5,{speed:.9});
  lwPickups();lwRings();}
function lwPickMesh(k){const g=new THREE.Group();let col,gl;
  if(k==="toplik"){col=0xff8a3a;gl=0xffa060;const m=new THREE.Mesh(new THREE.DodecahedronGeometry(.24,0),std(0xff7a2a,{emissive:LC(0xff5a10),emissiveIntensity:.9}));g.add(m);}
  else{col=0x6af0d8;gl=0x7affe0;for(const [x,y,z,s] of [[0,0,0,.14],[.12,.06,.04,.1],[-.1,.04,-.06,.11],[.02,.14,-.1,.08]]){const m=new THREE.Mesh(new THREE.SphereGeometry(s,8,6),std(0x5ae8c8,{emissive:LC(0x2ad8b0),emissiveIntensity:1}));m.position.set(x,y,z);g.add(m);}}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:gl,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(1.6,1.6,1);g.add(sp);return g;}
function lwPickups(){S.wq=S.wq||{};for(const [k,list,item] of [["mamut",LW.warm,"toplik"],["irvas",LW.lich,"lisaj"]]){if(S.met[k])continue;
    const q=S.wq[k]||{};list.forEach((p,i)=>{const g=lwPickMesh(item);g.position.set(p.x,p.y,p.z);const got=i<(q.n||0);g.visible=!!q.on&&!got;scene.add(g);LW.pick.push({k,item,x:p.x,y:p.y,z:p.z,g,got,i});});}}
function lwRings(){const geo=new THREE.TorusGeometry(.95,.12,8,24),m=std(0xffc53d,{emissive:LC(0xff9a00),emissiveIntensity:.9,metalness:.5,roughness:.3});
  for(const r of LW.rings){const g=new THREE.Mesh(geo,m);g.position.set(r.x,r.y,r.z);g.rotation.y=r.ry;scene.add(g);r.g=g;r.got=false;}}
function lwQuestOn(k){return S.wq&&S.wq[k]&&S.wq[k].on;}
function lwQuestStart(k,en){S.wq=S.wq||{};if(!S.wq[k])S.wq[k]={on:1,n:0};else S.wq[k].on=1;save();const Q=LWQ[k];say(en,Q.ask,9000);sfx.chime();
  for(const p of LW.pick)if(p.k===k&&!p.got){p.g.visible=true;burst(p.x,p.y,p.z,18,[[1,.9,.5],[.6,1,.9]],1.6,2,.8);}
  if(k==="medvjedic")toast("Ribe iskaču iz rupe u ledu i praćakaju se. Dodirni ribu prije nego što skoči natrag!",5200);
  else toast(Q.got+": "+(S.wq[k].n||0)+" / "+Q.need+". Svjetlucaju, pa ih lako vidiš!",4200);}
function lwQuestStep(k){const Q=LWQ[k],q=S.wq[k];q.n=(q.n||0)+1;save();const en=petEnt(k);
  if(q.n>=Q.need){lwBefriend(k);return;}toast(Q.got+" "+q.n+" / "+Q.need+"!",2600);tone(880,.1,"triangle",.03);tone(1175,.12,"triangle",.03,.08);}
function lwBefriend(k){const P=PETS[k];S.met[k]=today();const I2=petInfo(k);I2.h=Math.max(I2.h,2);S.wq[k].on=0;S.wq[k].done=1;save();const en=petEnt(k);
  if(en){say(en,LWQ[k].done,7000);en.celebrate=1.4;for(let i=0;i<14;i++)mgSpawn({t:"heart",x:en.x,y:en.y+1.2,z:en.z,vx:(Math.random()-.5)*2,vy:1.5+Math.random()*2,vz:(Math.random()-.5)*2,life:1.4,size:.35,size2:.1,col:[0xff6a8a,0xff9ab0],grav:1});}
  sfx.fanfare();fpUI();
  setTimeout(()=>rewardReveal({kicker:"Novi prijatelj!",title:P.n,portrait:portrait(k),items:[{ic:thingIcon(P.fav),n:"Voli: "+thingName(P.fav),cnt:0,rar:"r"},{ic:itemIcon("star"),n:SPEC[k].n,cnt:0,rar:"l"}],
    sub:P.d+" Dodirni ga i jaši! Čekat će te i na Otoku priča, kraj čarobnog portala.",ok:"Jupi!"}),1600);}
/* fish that leap out of the ice hole and flop on the ice */
function lwFishTick(dt,tt){const H0=LW.hole;if(!H0)return;let F=LW.fish;
  if(!F){const g=pickupMesh("fish");scene.add(g);F=LW.fish={g,st:"wait",t:1.2,x:H0.x+1,y:H0.y,z:H0.z+1,vx:0,vy:0,vz:0};g.visible=false;}
  const cxh=H0.x+1,czh=H0.z+1;F.t-=dt;
  if(F.st==="wait"){F.g.visible=false;if(F.t<=0){const a=Math.random()*6.28,d=2.4+Math.random()*2.2;F.st="out";F.x=cxh;F.z=czh;F.y=H0.y+.6;const T2=.8;F.vx=Math.cos(a)*d/T2;F.vz=Math.sin(a)*d/T2;F.vy=7;F.t=T2;F.g.visible=true;burst(cxh,H0.y+1,czh,14,[[.8,.93,1],[1,1,1]],1.4,2.4,.6);sfx.splash();}}
  else if(F.st==="out"||F.st==="back"){F.vy-=17.5*dt;F.x+=F.vx*dt;F.z+=F.vz*dt;F.y+=F.vy*dt;F.g.rotation.x+=dt*8;
    if(F.st==="out"&&F.y<=17.15&&F.vy<0){F.y=17.15;F.st="flop";F.t=4.5;F.g.rotation.x=0;}
    if(F.st==="back"&&F.t<=0){F.st="wait";F.t=1.4+Math.random()*1.4;burst(cxh,H0.y+1,czh,10,[[.8,.93,1],[1,1,1]],1,2,.5);}}
  else if(F.st==="flop"){const hop=Math.abs(Math.sin(tt*9))*.25;F.g.position.y=F.y+.12+hop;F.g.rotation.z=Math.PI/2+Math.sin(tt*14)*.4;F.g.rotation.y+=dt*2;
    if(F.t<=0){const T2=.75;F.st="back";F.vx=(cxh-F.x)/T2;F.vz=(czh-F.z)/T2;F.vy=7;F.t=T2;}}
  if(F.st!=="flop")F.g.position.set(F.x,F.y,F.z);else{F.g.position.x=F.x;F.g.position.z=F.z;}
  if(FP.on&&F.g.visible&&F.st!=="wait"){const P=FP.p;if(Math.hypot(P.x-F.x,P.z-F.z)<1.15&&Math.abs(P.y+.4-F.y)<1.6){F.st="wait";F.t=1.6;F.g.visible=false;burst(F.x,F.y+.3,F.z,16,[[.5,.8,1],[1,1,1]],1.6,2,.6);sfx.pop();
      if(!S.met.medvjedic&&lwQuestOn("medvjedic"))lwQuestStep("medvjedic");else{giveN("riba",1);miniPop(thingIcon("riba"),"Riba +1");if(!S.met.medvjedic){const g2=petEnt("medvjedic");if(g2&&!lwQuestOn("medvjedic"))say(g2,"Hej, to je moja riba! Dođi do mene!",3500);}}}}}
/* geysers: bubbles, then a column of hot water that throws Rida into the air */
function lwGeyTick(dt,tt){for(const g of LW.gey){const t=((tt+g.ph)%g.per),on=t<2.1,soon=t>g.per-1.1;const near=FP.on&&Math.hypot(FP.p.x-g.x,FP.p.z-g.z)<60;
    if(near){if(on){for(let i=0;i<(g.big?5:3);i++)mgSpawn({t:"puff",x:g.x+(Math.random()-.5)*.6,y:g.y0+1+Math.random()*g.h*.9,z:g.z+(Math.random()-.5)*.6,vy:6+Math.random()*4,life:.9,size:.45,size2:1.2,col:[0xffffff,0xeaf6ff],drag:.8,op:.85});
        if(!g.on){g.on=1;if(Math.hypot(FP.p.x-g.x,FP.p.z-g.z)<26){tone(110,.4,"sawtooth",.02);tone(80,.5,"sine",.04);}}}else g.on=0;
      if(soon&&Math.random()<dt*14)burst(g.x+(Math.random()-.5)*.6,g.y0+1,g.z+(Math.random()-.5)*.6,1,[[.9,.97,1],[1,1,1]],.4,1.4,.5);
      if(Math.random()<dt*2.5)mgSpawn({t:"puff",x:g.x,y:g.y0+1.2,z:g.z,vy:1,life:2,size:.5,size2:1.4,col:0xffffff,drag:.4,op:.4});}
    if(on&&FP.on){const P=FP.p;if(Math.hypot(P.x-g.x,P.z-g.z)<1.25&&P.y>g.y0-.5&&P.y<g.y0+g.h){const v=g.big?30:17;if(FP.v.y<v-2){FP.v.y=v;FP.ground=false;FP.dblUsed=0;FP.flipT=.6;burst(P.x,P.y,P.z,24,[[.9,.97,1],[1,1,1]],2,3,.7);sfx.splash();
          tipOnce("gejzir","Gejzir te baca uvis! U zraku se usmjeri prema stijeni.");}}}}
  for(const p of LW.pools)if(Math.random()<dt*3&&FP.on&&Math.hypot(FP.p.x-p.x,FP.p.z-p.z)<60)mgSpawn({t:"puff",x:p.x+(Math.random()-.5)*p.r*1.6,y:p.y,z:p.z+(Math.random()-.5)*p.r*1.6,vy:.7,life:2.6,size:.5,size2:1.6,col:[0xffffff,0xeef6ff],drag:.3,op:.42,wob:.6});}
function lwTalk(){const n=wStars("led");const need=LWPETS.filter(k=>!S.met[k]);
  const L=n>=WSTAR_N?(WG.gateOpen?"Vrata Ledene palače su otvorena! Palača je na sjeveru, iza zaleđenog jezera. Blago te čeka u prijestolnoj dvorani.":"Svi kristali su tu! Vrata palače se otvaraju..."):
    n===0?"Dobro došla u Ledeno kraljevstvo! Ja sam car Mrazko. Mećava je raznijela deset snježnih kristala iz krune Ledene palače. Bez njih se vrata ne otvaraju, a polarna svjetlost blijedi. Pomogneš li nam?":
    "Imaš "+n+" od "+WSTAR_N+" kristala. Vidiš kako polarna svjetlost jača? Strelica gore pokazuje najbliži kristal. Pazi, led je sklizak!";
  say(carM,L+(need.length&&n<WSTAR_N?" U dolini žive i životinje kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),9000);}
{const _at=animalTap;animalTap=function(en,explore){const k=en.kind;
  if(k==="carpingvin"){lwTalk();return true;}
  if(k==="pingvinko"){const L=["Wiii! Led je najbolji za klizanje!","Car Mrazko je najmudriji pingvin na svijetu.","Jesi li vidjela ribe kako iskaču iz rupe u ledu?","Polarna svjetlost je jača sa svakim kristalom!","Mi pingvini nikad ne padnemo. Pa, skoro nikad."];say(en,L[Math.floor(Math.random()*L.length)],4000);en.celebrate=.6;return true;}
  if(k==="snjezec"){say(en,"Hop! Ljeti sam smeđ, a zimi bijel kao snijeg!",3500);en.celebrate=.6;return true;}
  if(LWPETS.includes(k)&&!S.met[k]){if(!WORLD){return true;}const q=S.wq&&S.wq[k];if(q&&q.on)say(en,LWQ[k].got+": "+(q.n||0)+" / "+LWQ[k].need+". Hvala što mi pomažeš!",4000);else lwQuestStart(k,en);return true;}
  return _at.apply(this,arguments);};}

/* ---------- the frost wand: freeze water into a path of ice for half a minute ---------- */
const FROZE=[];
function mgFreeze(){if(!needFP())return;const P=FP.p,[fx,fz]=fwd();let n=0;const y0=FP.swim?Math.floor(P.y+.6):Math.floor(P.y-.5);
  for(let r=0;r<=6;r+=.5)for(let w=-2;w<=2;w++){const x=Math.floor(P.x+fx*r-fz*w*.8),z=Math.floor(P.z+fz*r+fx*w*.8);for(const y of [y0,y0-1,Math.floor(WATER-.5)]){if(!inb(x,y,z))continue;const t=get(x,y,z);
      const wet=(t&&TYPES[t].water)||(!t&&!WORLD&&y<WATER&&y>=Math.floor(WATER-1)&&waterAt(x+.5,y+.5,z+.5));if(!wet)continue;if(get(x,y+1,z)&&!TYPES[get(x,y+1,z)].water)continue;if(TYPES[get(x,y+1,z)||0]&&get(x,y+1,z))continue;
      FROZE.push({x,y,z,prev:t,t:30});setV(x,y,z,T.pled);n++;if(n%3===0)mgSpawn({t:"flake",x:x+.5,y:y+1.2,z:z+.5,vy:.6,life:1,size:.3,size2:.05,col:[0xbff6ff,0xffffff],add:1,spin:2});break;}}
  if(!n){toast("Ovdje nema vode za zaleđivanje. Stani kraj mora ili jezera!",2600);return;}
  if(FP.swim){P.y=Math.max(P.y,y0+1.02);FP.v.y=2;}
  sfx.chime();tone(1568,.2,"sine",.02);tone(2093,.25,"sine",.015,.1);mgRing(P.x,P.y+.3,P.z,0xbff6ff);tipOnce("ledeni","Voda se zaledila! Led se otopi za pola minute.");}
function lwFrozeTick(dt){for(let i=FROZE.length-1;i>=0;i--){const f=FROZE[i];f.t-=dt;if(f.t<3&&Math.random()<dt*2)burst(f.x+.5,f.y+1,f.z+.5,1,[[.8,.95,1]],.3,1,.5);
    if(f.t<=0){if(get(f.x,f.y,f.z)===T.pled)setV(f.x,f.y,f.z,f.prev||0);FROZE.splice(i,1);}}}
{const _mu=mgUse;mgUse=function(k){if(k==="ledeni"){if(S.mg&&mgOwn(mgIt("gad:ledeni")))beltPush("gad:ledeni");return mgFreeze();}return _mu.apply(this,arguments);};}

/* ---------- movement on ice, the toboggan, the rings, snow puffs, riding tricks ---------- */
{const _ts=tickSquirrel;tickSquirrel=function(dt){let set=false;const M=FP.mount;
  if(FP.on&&!ACT){const P=FP.p;const t=get(Math.floor(P.x),Math.floor(P.y-.08),Math.floor(P.z));const ice=FP.ground&&!FP.swim&&(t===T.led||t===T.pled||t===T.tobogan);
    if(ice&&(!M||M.ice)){FP.accMul=M?.4:.15;FP.spMul=M?1.65:1.3;set=true;}}
  _ts.apply(this,arguments);if(set){FP.accMul=1;FP.spMul=1;}
  if(!FP.on)return;const P=FP.p,V=FP.v,hs=Math.hypot(V.x,V.z);const t=get(Math.floor(P.x),Math.floor(P.y-.08),Math.floor(P.z));
  if(t===T.tobogan&&FP.ground&&!M){const d=hs>.6?[V.x/hs,V.z/hs]:null;if(d&&hs<13.5){V.x+=d[0]*dt*15;V.z+=d[1]*dt*15;}if(Math.random()<dt*hs*1.2)mgSpawn({t:"flake",x:P.x,y:P.y+.1,z:P.z,vx:-V.x*.1,vy:.6,vz:-V.z*.1,life:.6,size:.22,size2:.04,col:[0xdff6ff,0xffffff],add:1});
    if(!tickSquirrel.sled&&hs>6){tickSquirrel.sled=1;tipOnce("tobogan","Wiii! Ledeni tobogan te nosi sve brže. Pokušaj proletjeti kroz zlatne prstenove!");}}else if(hs<3)tickSquirrel.sled=0;
  if(FP.ground&&(t===T.led||t===T.pled)&&hs>4.5&&Math.random()<dt*6)mgSpawn({t:"flake",x:P.x,y:P.y+.05,z:P.z,vy:.3,life:.5,size:.18,size2:.03,col:0xeaf8ff,add:1});
  if(FP.ground&&t===T.snijeg&&hs>2.5&&Math.random()<dt*hs*1.6)mgSpawn({t:"puff",x:P.x+(Math.random()-.5)*.4,y:P.y+.1,z:P.z+(Math.random()-.5)*.4,vy:.6,life:.6,size:.18,size2:.42,col:[0xffffff,0xf0f6ff],drag:1.4,op:.9});
  if(M&&M.glide&&!FP.ground&&!FP.swim&&((FP.keys[" "]||FP.upB))&&V.y<-2){V.y=-2;if(Math.random()<dt*24)mgSpawn({t:"star",x:P.x+(Math.random()-.5)*.8,y:P.y+.4,z:P.z+(Math.random()-.5)*.8,vy:-.4,life:.9,size:.26,size2:.03,col:[0xbff8ff,0xffffff,0xfff0a0],add:1,spin:2});if(!M.gl){M.gl=1;tipOnce("irvasl","Zvjezdan lebdi! Dok držiš Skok, polako jedrite kroz zrak.");}}};}
{const _fl=foxLand;foxLand=function(vy){_fl(vy);const M=FP.mount;if(M&&M.stomp&&vy<-6.5){const P=FP.p;burst(P.x,P.y+.2,P.z,40,[[1,1,1],[.92,.96,1]],3.2,3.4,.8);mgRing(P.x,P.y+.2,P.z,0xffffff);tone(70,.3,"sine",.06);tone(55,.4,"sine",.05,.05);if(typeof padRumble==="function"&&PAD.on)padRumble(220,.9,.6);FP.camT.y-=.25;}};}

/* ---------- per-frame world logic ---------- */
function lwTick(dt,tt){const n=wStars("led");LW.aurI+=((.32+.68*n/WSTAR_N)-LW.aurI)*Math.min(1,dt*.8);if(LW.aurU)LW.aurU.uI.value=LW.aurI*(.9+.1*Math.sin(tt*.7));
  lwSnowTick(dt,tt);lwFishTick(dt,tt);lwGeyTick(dt,tt);const P=FP.p;
  for(const r of LW.rings){if(r.got){r.g.visible=false;continue;}r.g.rotation.z+=dt*1.5;if(Math.hypot(P.x-r.x,P.z-r.z)<1.25&&Math.abs(P.y+.5-r.y)<1.4){r.got=true;S.coins+=3;renderEco();mgRing(r.x,r.y,r.z,0xffc53d);burst(r.x,r.y,r.z,16,[[1,.85,.3],[1,1,.7]],1.8,1.6,.6);
      tone(1046+LW.rings.filter(x=>x.got).length*60,.1,"triangle",.03);if(LW.rings.every(x=>x.got)){S.coins+=25;renderEco();toast("Svi zlatni prstenovi! +25 zlatnika",3200);sfx.fanfare();}}}
  for(const p of LW.pick){if(p.got||!p.g.visible)continue;p.g.rotation.y+=dt*2;p.g.position.y=p.y+Math.sin(tt*2.4+p.i)*.15;if(Math.random()<dt*4)mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.5,y:p.y+(Math.random()-.5)*.5,z:p.z+(Math.random()-.5)*.5,vy:.5,life:.7,size:.16,size2:.02,col:p.item==="toplik"?0xffa060:0x7affe0,add:1});
    if(Math.hypot(P.x-p.x,P.z-p.z)<1.2&&Math.abs(P.y+.5-p.y)<1.6){p.got=true;p.g.visible=false;burst(p.x,p.y,p.z,20,p.item==="toplik"?[[1,.6,.3],[1,.9,.5]]:[[.4,1,.85],[.8,1,1]],1.8,2,.7);sfx.pop();lwQuestStep(p.k);}}
  for(const k of LWPETS){if(S.met[k]||lwQuestOn(k))continue;const en=petEnt(k);if(en&&Math.hypot(P.x-en.x,P.z-en.z)<4.2&&!(S.wq&&S.wq[k]&&S.wq[k].seen)){S.wq=S.wq||{};S.wq[k]=S.wq[k]||{n:0};S.wq[k].seen=1;lwQuestStart(k,en);}}
  if(FP.swim&&LW.pools.some(p=>Math.hypot(P.x-p.x,P.z-p.z)<p.r+.6))tipOnce("vrelo","Mmm, toplo! Ova vrela griju cijelu dolinu.");
  if(Math.hypot(P.x-128,P.z-126)<24&&FP.ground)tipOnce("klizanje","Led je sklizak! Rida klizi, pa kreni ranije i polako koči.");}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);if(FROZE.length)lwFrozeTick(dt);
  if(S.mg&&S.mg.skin==="polarna"&&FP.on&&!MCHAR[S.mg.char]&&!FP.under&&Math.random()<dt*(Math.hypot(FP.v.x,FP.v.z)>.8?9:3)){const P=FP.p;mgSpawn({t:"spark",x:P.x+(Math.random()-.5)*.6,y:P.y+.4+Math.random()*.8,z:P.z+(Math.random()-.5)*.6,vy:.35,life:1.1,size:.2,size2:.4,col:[0x5affb0,0x6ae8ff,0xb46cff],add:1,wob:1,op:.85});}};}

WDEF.led={gen:lwGen,env:lwEnv,life:lwLife,preset:"led",fog:.0046,floor:null,noClouds:1,guide:()=>carM,talk:lwTalk,tick:lwTick,itemMesh:lwFlake,itemCol:[0x8ae8ff,0xffffff,0xbff6ff],itemBurst:[[.6,.95,1],[1,1,1],[.7,.85,1]],itemFx:"flake",
  item:{one:"Snježni kristal",hud:"Kristali",done:"Svi kristali!",all:"Svih 10 snježnih kristala! Polarna svjetlost blista, a vrata Ledene palače se otvaraju!",first:"Bravo! Strelica gore pokazuje najbliži kristal. Svaki kristal vraća sjaj polarnoj svjetlosti!"},
  intro:()=>"Ledeno kraljevstvo! Kristali: "+wStars("led")+" / "+WSTAR_N+". Car Mrazko te čeka kraj portala.",
  finale:{chest:"l_palaca",isl:"palaca",at:{x:128,z:36},rewards:["skin:polarna","trail:aurora","gad:ledeni"],locked:"Led drži škrinju zatvorenom. Skupi svih 10 snježnih kristala!",
    kicker:"Ledeno kraljevstvo je spašeno!",title:"Blago Ledene palače",sub:"Polarna lisica, Polarna svjetlost i Ledeni štapić sad su tvoji. Štapićem možeš zalediti more i hodati po njemu, čak i na Otoku priča!"}};

/* ---------- icons ---------- */
(function(){const D=ITEM_DRAW;
  D.w_led=(x,P,hi,ol)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#0a1a44");g.addColorStop(1,"#2c5c8c");x.fillStyle=g;x.fillRect(0,0,64,64);
    x.globalAlpha=.8;x.fillStyle="#5affb0";x.beginPath();x.moveTo(0,22);x.quadraticCurveTo(20,6,40,18);x.quadraticCurveTo(54,26,64,12);x.lineTo(64,22);x.quadraticCurveTo(52,34,40,26);x.quadraticCurveTo(20,16,0,32);x.fill();
    x.fillStyle="#b46cff";x.globalAlpha=.55;x.beginPath();x.moveTo(0,14);x.quadraticCurveTo(24,0,44,10);x.lineTo(44,14);x.quadraticCurveTo(24,6,0,20);x.fill();x.globalAlpha=1;
    P([[0,64],[0,46],[14,34],[26,44],[40,30],[52,40],[64,34],[64,64]],"#f4f8ff");P([[24,64],[24,40],[28,30],[32,40],[32,64]],"#8ab8f0");P([[34,64],[34,46],[38,38],[42,46],[42,64]],"#a9c8f5");P([[30,30],[28,24],[32,24]],"#86ece2");};
  D.mg_trail_aurora=(x,P,hi,ol)=>{x.lineWidth=7;x.lineCap="round";for(const [c,o] of [["#5affb0",0],["#6ae8ff",9],["#b46cff",18]]){x.strokeStyle=c;x.beginPath();x.moveTo(6,46-o);x.bezierCurveTo(20,20-o,36,60-o,58,26-o);x.stroke();}};
  D.mg_gad_ledeni=(x,P,hi,ol)=>{P([[12,56],[18,60],[44,22],[38,18]],"#8a6038");P([[38,18],[44,22],[46,18],[40,14]],"#ffc53d");
    x.save();x.translate(46,14);x.strokeStyle="#bff6ff";x.lineWidth=4;x.lineCap="round";for(let i=0;i<3;i++){x.rotate(Math.PI/3);x.beginPath();x.moveTo(-12,0);x.lineTo(12,0);x.stroke();}x.restore();
    x.fillStyle="#ffffff";x.beginPath();x.arc(46,14,3.5,0,7);x.fill();};})();
