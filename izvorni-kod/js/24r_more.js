/* =================== v22: Podvodni grad =================== */
/* A sunny lighthouse island on the surface, and below it a whole sunken world: a city of glass domes, the Pearl Temple,
   a coral reef with a giant clam, a swaying kelp forest, a shipwreck, a singing whale, a dark trench of glowing jellyfish,
   bubble vents under a stone arch, a dolphin arena and a crystal cave. Rida breathes through a magic bubble and swims freely.
   Three sea friends live only here (seahorse, manta, octopus) and can be ridden. */
const SEA=50;
WORLDS.more={n:"Podvodni grad",d:"Potonuli grad staklenih kupola, koraljni greben s divovskom školjkom, šuma algi, potonuli brod, kit koji pjeva i duboki jarak sa svijetlećim meduzama. Ovdje žive morski konjić, manta i hobotnica!",lv:9};
PRESETS.more={top:0x2a86e6,hz:0xbfeaff,sun:0xfff2d8,si:2.3,hemi:.82,el:.78,az:1.25,fog:0xbfe4f4,glow:.5,stars:0,sh:0x46d6d8,dp:0x1a6cc0,exp:.98,night:0};
if(typeof MOODS!=="undefined")MOODS.more={root:63,sc:[0,2,4,7,9],ch:[[0,4,7,11],[-3,0,4,7],[5,9,12,16],[2,7,11,14]],bpm:58,p:.4,inst:"glass"};

/* ---------- world-only rewards ---------- */
MSKIN.morska={n:"Morska lisica",d:"Tirkizna kao plitko more, s bisernim trbuhom. Za njom se dižu mjehurići.",p:0,rar:"l",O:0x2ec8c0,W:0xfff6fa,B:0x123a5a,D:0x1a8aa8,glowO:.12,fx:"mjehur",wr:"Podvodni grad"};
MTRAIL.mjehurici={n:"Mjehurići",d:"Iza Ride se dižu sjajni mjehurići, i na kopnu i pod vodom.",p:0,rar:"l",wr:"Podvodni grad"};
TR.mjehurici=p=>mgSpawn({t:"puff",x:p.x+(Math.random()-.5)*.5,y:p.y+.2+Math.random()*.4,z:p.z+(Math.random()-.5)*.5,vy:1.1,life:1.6,size:.12,size2:.26,col:[0xe8fbff,0xbff0ff,0xffffff],drag:.3,op:.75,wob:.8});TRATE.mjehurici=8;
const MRGAD={mjehur:{n:"Čarobni mjehurić",d:"Mjehurić oko glave: Rida pod vodom diše cijelu minutu, pliva brže i lebdi kamo želi. Radi i na Otoku priča!",p:0,rar:"l",act:1,wr:"Podvodni grad",how:"Dodirni mjehurić na traci i zaroni. Traje jednu minutu."}};
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};
  ins("skin","morska",MSKIN.morska);ins("trail","mjehurici",MTRAIL.mjehurici);MGAD.mjehur=MRGAD.mjehur;ins("gad","mjehur",MRGAD.mjehur);}

/* ---------- creatures: three ridable friends, the old turtle, crabs ---------- */
MODELS.mkonjic=function(){const C=0xffa82e,L=0xffe08a,F=0xff7a3a,K=0x1a1410,hd={name:"head",px:0,py:1.3,pz:.08},tl={name:"tail",px:0,py:.62,pz:0};
  return mk([[.38,.7,.36,0,.95,0,C],[.3,.56,.1,0,.9,.18,L],[.05,.4,.28,0,1.0,-.22,F],[.36,.3,.36,0,1.42,.12,C,hd],[.13,.13,.36,0,1.36,.42,C,hd],[.06,.06,.06,0,1.36,.62,F,hd],
    [.07,.08,.02,-.15,1.46,.22,K,hd],[.07,.08,.02,.15,1.46,.22,K,hd],[.1,.18,.12,0,1.64,.06,L,hd],[.06,.12,.06,-.12,1.62,0,L,hd],[.06,.12,.06,.12,1.62,0,L,hd],
    [.26,.3,.26,0,.5,-.02,C,tl],[.2,.22,.22,0,.28,-.14,C,tl],[.16,.16,.18,0,.16,-.3,C,tl],[.13,.13,.13,0,.22,-.44,L,tl],[.1,.1,.1,0,.34,-.48,L,tl]]);};
MODELS.manta=function(){const D=0x24486e,Wt=0xe8f2f8,G=0x7ff6ff,K=0x0a1420,wl={name:"wl",px:-.4,py:.6,pz:0},wr={name:"wr",px:.4,py:.6,pz:0},tl={name:"tail",px:0,py:.6,pz:-.6},hd={name:"head",px:0,py:.6,pz:.5};
  const g=mk([[.9,.2,1.2,0,.6,0,D],[.8,.06,1.0,0,.48,0,Wt],[1.2,.1,.86,-1.0,.6,-.08,D,wl],[1.2,.1,.86,1.0,.6,-.08,D,wr],[.5,.08,.4,-1.75,.6,-.25,D,wl],[.5,.08,.4,1.75,.6,-.25,D,wr],
    [.14,.12,.34,-.3,.6,.72,D,hd],[.14,.12,.34,.3,.6,.72,D,hd],[.08,.08,.04,-.3,.7,.62,K,hd],[.08,.08,.04,.3,.7,.62,K,hd],
    [.07,.07,1.3,0,.6,-1.25,D,tl],[.12,.04,.12,-.25,.71,.1,G],[.12,.04,.12,.25,.71,-.15,G],[.1,.04,.1,0,.71,.35,G],[.12,.04,.12,-1.1,.66,0,G,wl],[.12,.04,.12,1.1,.66,0,G,wr],[.1,.04,.1,-.7,.66,-.3,G,wl],[.1,.04,.1,.7,.66,-.3,G,wr]]);
  g.traverse(o=>{if(o.isMesh&&o.material.color.getHex()===LC(G).getHex()){o.material=o.material.clone();o.material.emissive=LC(0x5af0ff);o.material.emissiveIntensity=1;}});return g;};
MODELS.hobotnica=function(){const P=0xc05ad8,L=0xf0a8f0,K=0x1a1020,Wt=0xffffff,hd={name:"head",px:0,py:.9,pz:0};const B=[[.74,.7,.74,0,1.0,-.06,P,hd],[.6,.2,.6,0,1.42,-.08,P,hd],[.1,.1,.1,-.2,1.18,.3,L,hd],[.1,.1,.1,.24,1.3,.22,L,hd],
    [.14,.16,.04,-.18,.92,.32,Wt,hd],[.14,.16,.04,.18,.92,.32,Wt,hd],[.07,.09,.02,-.18,.92,.345,K,hd],[.07,.09,.02,.18,.92,.345,K,hd],[.6,.2,.6,0,.62,0,P]];
  const g=mk(B);const parts=g.userData.parts;const m=std(P),m2=std(L);
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const pg=new THREE.Group();pg.position.set(Math.sin(a)*.26,.6,Math.cos(a)*.26);pg.rotation.y=a;g.add(pg);
    for(let k=0;k<3;k++){const s=new THREE.Mesh(new THREE.BoxGeometry(.12-k*.025,.1,.22),k===2?m2:m);s.position.set(0,-.04-k*.06,.12+k*.2);pg.add(s);}parts["t"+i]=pg;}return g;};
MODELS.starakornjaca=function(){const g=MODELS.kornjaca();const add=(w,h,d,x,y,z,c)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),std(c));o.position.set(x,y,z);g.add(o);return o;};
  add(.5,.06,.18,0,.62,.36,0xf4f0e6);add(.1,.1,.1,-.2,.64,.38,0x8a8a92);add(.1,.1,.1,.2,.64,.38,0x8a8a92);return g;};
MODELS.mkornjaca=()=>MODELS.kornjaca();
MODELS.rak=function(){const R=0xe0483a,D=0xa82a20,K=0x1a1010,cl={name:"head",px:0,py:.25,pz:.2};
  return mk([[.5,.2,.4,0,.22,0,R],[.08,.14,.06,-.1,.38,.14,R],[.08,.14,.06,.1,.38,.14,R],[.06,.06,.04,-.1,.46,.16,K],[.06,.06,.04,.1,.46,.16,K],
    [.16,.12,.18,-.34,.28,.3,D,cl],[.16,.12,.18,.34,.28,.3,D,cl]].concat(legs(.06,.18,.26,.08,D,.18)));};
Object.assign(PETS,{
  mkonjic:{fav:"bobice",src:"world",world:"more",n:"Morski konjić Mjehurko",d:"Malen, narančast i jako znatiželjan. Kad se smije, iz njuškice mu izlaze mjehurići.",gd:"Donosi šarene koralje.",gift:()=>[[["koralj_p","koralj_r","koralj_z","koralj_l"][Math.floor(Math.random()*4)],3],["coins",12]]},
  manta:{fav:"riba",src:"world",world:"more",n:"Manta Zvjezdica",d:"Golema i nježna. Na leđima joj svijetle točkice kao zvijezde, a pliva kao da leti.",gd:"Iz dubine donosi bisere.",gift:()=>[["biser",1],["coins",14]]},
  hobotnica:{fav:"biser",src:"world",world:"more",n:"Hobotnica Osmica",d:"Ima osam ruku i skuplja sve što sjaji. Najbolje se skriva od svih u moru.",gd:"Iz potonulog broda donosi zlatnike i morske cigle.",gift:()=>[["prizcigla",4],["coins",20]]}});
Object.assign(SPEC,{
  mkonjic:{n:"Konjićev galop",d:"Mjehurko juri kroz vodu, a iza vas ostaje trag mjehurića!",ride:1,ic:"biser"},
  manta:{n:"Mantin let",d:"Zvjezdica klizi morem kao ptica. Na površini pritisni Skok i poletjet ćete iz vode!",ride:1,ic:"star"},
  hobotnica:{n:"Osmičin vrtlog",d:"Osmica te nosi s osam ruku, a kad ubrza, iza vas ostaje oblačić tinte.",ride:1,ic:"biser"}});
Object.assign(RIDES,{mkonjic:{water:1,under:1,speed:8.6,seat:.92},manta:{water:1,under:1,leap:1,speed:11.5,seat:.34},hobotnica:{water:1,under:1,speed:7.6,seat:1.2}});
const MRPETS=["mkonjic","manta","hobotnica"];NEWPETS.push(...MRPETS);
{const _snp=spawnNewPet;spawnNewPet=function(k){if(!MRPETS.includes(k))return _snp(k);let e=petEnt(k);if(e)return e;if(WORLD)return null;
  const sp=S.portalSpot||{x:LIB.x+.5,z:LIB.z+10};let near=null;for(let r=6;r<70&&!near;r+=2)for(let a=0;a<6.28&&!near;a+=.3){const x=sp.x+Math.cos(a)*r,z=sp.z+Math.sin(a)*r;if(walkable(x,z,true)!=null&&walkable(x+3,z,true)!=null&&walkable(x,z+3,true)!=null)near={x,z};}
  if(!near)return null;e=spawn(k,PETS[k].n,{swim:true,speed:k==="manta"?1.6:1.1,near});return e;};}
{const _mu=mountUp;mountUp=function(k){_mu(k);if(!MRPETS.includes(k)||!FP.mount||FP.mount.k!==k)return;
  if(typeof NQ!=="undefined"){for(let i=NQ.length-1;i>=0;i--)if(NQ[i].t&&/^Jašeš na/.test(NQ[i].t))NQ.splice(i,1);if(nCur&&nCur.t&&/^Jašeš na/.test(nCur.t)){clearTimeout(nT);nDone();}}
  const L={mkonjic:"Mjehurko te nosi! Gore i Roni vode vas gore-dolje.",manta:"Zvjezdica raširi krila! Na površini pritisni Skok i poletjet ćete iz vode.",hobotnica:"Osmica te čvrsto drži s osam ruku! Kad jurite, iza vas ostaje tinta."}[k];
  toast(L+" Za silazak: gumb Siđi"+(PAD.on?" ili Y":"")+".",4600);};}
/* in the sea world, swimmers hover above the sea floor instead of floating on the island's sea level */
{const _wk=walkable;walkable=function(x,z,swim){if(WORLD==="more"&&swim){const y=topY(x,z);if(y<0)return null;const h=y+1.7;return h<SEA-1.2?h:null;}return _wk.apply(this,arguments);};}
{const _wa=waterAt;waterAt=function(x,y,z){if(WORLD==="more"){const t=get(Math.floor(x),Math.floor(y),Math.floor(z));if(t)return !!TYPES[t].water;return y<SEA&&y>=0;}return _wa(x,y,z);};}
{const _wt=waterTop;waterTop=function(x,y,z){if(WORLD==="more")return y<SEA?SEA-.14:SEA-.14;return _wt(x,y,z);};}

/* ---------- the generator ---------- */
const MR={domes:[],kelp:[],reefKelp:[],vents:[],jel:[],fish:[],rings:[],pick:[],clam:null,whale:null,whaleStar:null,ringStar:null,clamStar:null,lh:null,crabs:[]};
const MRQ={mkonjic:{need:3,item:"skoljkica",ask:"Bok! Ja sam Mjehurko. Struja mi je odnijela tri šarene školjkice u Šumu algi, zapadno odavde. Pomogneš mi ih naći?",got:"Šarena školjkica",
    done:"Moje školjkice! Hvala ti! Sad smo najbolji prijatelji. Uhvati se za mene, jurimo!"},
  manta:{need:4,item:"cvor",ask:"Joj, zapetljala sam se u staru ribarsku mrežu! Ja sam Zvjezdica. Dodirni četiri čvora oko mene i mreža će se raspasti.",got:"Čvor mreže",
    done:"Slobodna sam! Hvala ti, mala lisice. Popni mi se na leđa, pokazat ću ti kako mante lete!"},
  hobotnica:{need:4,item:"zlatnik",ask:"Psst, ovdje dolje! Ja sam Osmica. Valovi su mi raznijeli blago iz kapetanove škrinje, četiri stara zlatnika oko broda. Vratiš mi ih?",got:"Stari zlatnik",
    done:"Moje blago! Hvala ti, hvala, hvala, hvala! To je osam hvala, za svaku ruku jedna. Sad te mogu nositi!"}};
function mrH(x,z){const dx=x-128,dz=z-128,r=Math.hypot(dx,dz),a=Math.atan2(dz,dx);
  let h=19+(fbm(x*.03,z*.03)-.5)*7+(fbm(x*.11+7,z*.11)-.5)*2;
  const rr=r*(1+.16*(vnoise(Math.cos(a)*2.4+3,Math.sin(a)*2.4+3,5)-.5));h+=sstep(92,118,rr)*(16+fbm(x*.05,z*.05+4)*12);
  {const d=Math.hypot(x-128,z-122);if(d<34)h=20+(h-20)*sstep(28,34,d);}
  {const d=Math.hypot(x-128,z-80);if(d<20)h=Math.max(h,23-Math.max(0,d-13)*.6);}
  {const d=Math.hypot(x-128,z-212);if(d<26)h=Math.max(h,d<9.5?SEA+1:SEA+1-Math.pow((d-9.5)/16.5,.7)*(SEA-17));}
  {const d=Math.hypot(x-46,z-118);if(d<22)h=Math.max(h,20+Math.pow(1-d/22,.8)*20);}
  {const d=Math.hypot(x-62,z-156);if(d<26)h=17+(h-17)*sstep(18,26,d);}
  {const d=Math.hypot(x-192,z-158);if(d<26)h+=(fbm(x*.14,z*.14)-.4)*5*(1-d/26);}
  {const q=Math.hypot((x-202)/12,(z-84)/30);if(q<1.45)h=Math.min(h,q<1?5+(fbm(x*.2,z*.2)-.5)*2:5+(h-5)*sstep(1,1.45,q));}
  return Math.max(3,Math.min(H-3,h));}
function mrCol(x,z,top,t){for(let y=top+1;y<H;y++){if(prot[I(x,y,z)])break;vox[I(x,y,z)]=0;}for(let y=1;y<top;y++)if(!vox[I(x,y,z)])vox[I(x,y,z)]=T.kamen;wput(x,top,z,t);}
function mrFlat(cx,cz,r,y,t){for(let dx=-Math.ceil(r);dx<=r;dx++)for(let dz=-Math.ceil(r);dz<=r;dz++)if(Math.hypot(dx,dz)<=r)mrCol(cx+dx,cz+dz,y,typeof t==="function"?t(dx,dz):t);}
function mrDome(cx,y,cz,R,shell,ring){for(let dx=-R;dx<=R;dx++)for(let dz=-R;dz<=R;dz++)for(let dy=0;dy<=R;dy++){const d=Math.hypot(dx,dy,dz);if(d<=R+.25&&d>R-.85)wput(cx+dx,y+dy,cz+dz,dy===0&&ring?ring:shell,1);else if(d<=R-.85&&!prot[I(cx+dx,y+dy,cz+dz)])vox[I(cx+dx,y+dy,cz+dz)]=0;}}
function mrPalm(x,z){const y=wTopAt(x,z);const h=5+Math.floor(hash2(x,z,7)*2);let px=x,pz=z;const lean=hash2(x,z,8)<.5?1:-1;
  for(let i=1;i<=h;i++){if(i===3||i===5)px+=lean;wput(px,y+i,pz,T.drvo);}const ty=y+h+1;wput(px,ty,pz,T.lisce);
  for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])for(let k=1;k<=3;k++)wput(px+a*k,ty-(k===3?1:0),pz+b*k,T.lisce);for(const [a,b] of [[1,1],[-1,1],[1,-1],[-1,-1]])wput(px+a,ty,pz+b,T.lisce);}
function mrCoral(x,z,kind){const y=wTopAt(x,z);if(y<6||y>SEA-6)return;const C=[T.koralj_p,T.koralj_r,T.koralj_z,T.koralj_c,T.koralj_l];const c=C[Math.floor(hash2(x,z,31)*5)];
  if(kind<.45){const h=2+Math.floor(hash2(x,z,32)*5);for(let i=1;i<=h;i++){wput(x,y+i,z,c);if(i>1&&hash3(x,y+i,z)<.42){const d=[[1,0],[-1,0],[0,1],[0,-1]][Math.floor(hash3(x,i,z)*4)];wput(x+d[0],y+i,z+d[1],c);if(hash3(z,i,x)<.5)wput(x+d[0],y+i+1,z+d[1],c);}}}
  else if(kind<.7){for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)if(hash2(x+dx,z+dz,33)<.85)wput(x+dx,y+1,z+dz,c);wput(x,y+2,z,c);if(hash2(x,z,34)<.5){wput(x+1,y+2,z,c);wput(x,y+2,z+1,c);}}
  else if(kind<.88){const ax=hash2(x,z,35)<.5;for(let a=-1;a<=1;a++)for(let h=1;h<=3;h++)if(hash3(x+a,h,z)<.8||h===1)wput(x+(ax?a:0),y+h,z+(ax?0:a),T.koralj_l);}
  else{wput(x,y+1,z,T.prizmarin);if(hash2(x,z,36)<.5)wput(x+1,y+1,z,T.prizmarin);wput(x,y+2,z,c);}}
function mrHouse(cx,cz,face,tall){const y=20;const s=2;for(let dx=-s;dx<=s;dx++)for(let dz=-s;dz<=s;dz++){mrCol(cx+dx,cz+dz,y,T.prizcigla);for(let h=1;h<=3+tall;h++){const wall=Math.abs(dx)===s||Math.abs(dz)===s;
    const door=h<=2&&((face===0&&dz===s&&dx===0)||(face===1&&dx===-s&&dz===0)||(face===2&&dz===-s&&dx===0)||(face===3&&dx===s&&dz===0));const win=h===2+tall&&wall&&!door&&(dx===0||dz===0);
    wput(cx+dx,y+h,cz+dz,wall&&!door?(win?T.staklo:(h===1?T.prizmarin:T.prizcigla)):0,1);}}
  for(let dx=-s;dx<=s;dx++)for(let dz=-s;dz<=s;dz++)wput(cx+dx,y+4+tall,cz+dz,(Math.abs(dx)===s||Math.abs(dz)===s)?T.prizmarin:T.staklo,1);MR.domes.push({x:cx+.5,y:y+5+tall,z:cz+.5,r:2.9});wput(cx,y+1,cz,T.svjetlo,1);if(hash2(cx,cz,41)<.5)wput(cx+1,y+1,cz-1,T.bacva,1);}
function mrGen(){vox.fill(0);prot.fill(0);hmap.fill(0);mask.fill(0);biome.fill(0);POI.length=0;CHESTS.length=0;FALLS.clear();WG.stars.length=0;WG.wind.length=0;WG.gate.length=0;WG.isl={};WG.fall=null;
  MR.domes.length=0;MR.kelp.length=0;MR.reefKelp.length=0;MR.vents.length=0;MR.rings.length=0;MR.pick.length=0;
  const HM=new Int16Array(W*W);for(let z=0;z<W;z++)for(let x=0;x<W;x++)HM[x+z*W]=Math.round(mrH(x,z));
  for(let z=1;z<W-1;z++)for(let x=1;x<W-1;x++){const h=HM[x+z*W];let sl=0;for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])sl=Math.max(sl,Math.abs(HM[x+a+(z+b)*W]-h));
    const n=fbm(x*.07+11,z*.07);const above=h>=SEA;
    for(let y=1;y<=h;y++){let t;if(y>h-3){t=sl>=3?(h<10?T.duboki:T.kamen):above?(y===h&&Math.hypot(x-128,z-212)<5.5?T.trava:T.pijesak):(n<.36?T.sljunak:n>.66?T.glina:T.pijesak);if(y<h&&t===T.trava)t=T.zemlja;}
      else{t=h<10&&y>h-8?T.duboki:T.kamen;const q=hash3(x,y,z);if(q<.012)t=T.prizmarin;else if(q<.02)t=T.r_zlato;else if(q<.026)t=T.r_dijamant;else if(q<.032)t=T.ametist;}vox[I(x,y,z)]=t;}
    if(h>=SEA-1)hmap[x+z*W]=h;}
  const I2=WG.isl;const isl=(k,x,z,r,y)=>{I2[k]={x,z,r,y:y!=null?y:wTopAt(x,z)};};
  /* ---- lighthouse island (surface): portal, palms, a dock and the lighthouse ---- */
  {const py=SEA+1;wPortalArch(128,py,221);WG.portal={x:128.5,y:py+1,z:221.5,ry:0};WG.spawn={x:128.5,y:py+1,z:212.5,cam:0};isl("svjetionik",128,212,10,py);
    for(const [x,z] of [[121,207],[121,217],[134,219]])mrPalm(x,z);
    for(let z=200;z<=204;z++)for(let dx=-1;dx<=1;dx++){wput(128+dx,py,z,T.daske,1);for(let y=py+1;y<=py+3;y++)vox[I(128+dx,y,z)]=0;if(Math.abs(dx)===1&&z%2===0)for(let y=py-1;y>py-6;y--)wput(128+dx,y,z,T.drvo,1);}
    for(const [x,z] of [[126,200],[130,200]]){wput(x,py+1,z,T.drvo,1);wput(x,py+2,z,T.lampion,1);}
    const cx=134,cz=210,y0=py,top=py+8;
    for(let y=y0+1;y<=top;y++)for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const d=Math.hypot(dx,dz);if(d>2.6)continue;const wall=d>1.6;const win=wall&&(y-y0)%3===2&&(dx===0||dz===0);
      wput(cx+dx,y,cz+dz,wall?(win?T.staklo:(Math.floor((y-y0-1)/2)%2?T.crvena:T.bijela)):T.bijela,1);}
    for(let a=0;a<=(top+1-y0)/2+.05;a+=.02){const Y=y0+Math.min(top+1-y0,Math.floor(a*2)+1);for(const rr of [3.3,4.0,4.6]){const X=Math.round(cx+Math.cos(a+3.14)*rr),Z=Math.round(cz+Math.sin(a+3.14)*rr);
        if(!prot[I(X,Y,Z)]||get(X,Y,Z)===T.daske){wput(X,Y,Z,T.daske,1);for(let k=1;k<=3;k++)if(!prot[I(X,Y+k,Z)]&&Y+k<H)vox[I(X,Y+k,Z)]=0;}}}
    for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){const d=Math.hypot(dx,dz);if(d<=4.1)wput(cx+dx,top+1,cz+dz,d<1.7?T.kvarc:T.daske,1);if(d<=4.1&&d>3.3&&(dx+dz)%2===0)wput(cx+dx,top+2,cz+dz,T.drvo,1);}
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){const e=Math.abs(dx)+Math.abs(dz);wput(cx+dx,top+2,cz+dz,e===0?T.svjetlo:T.staklo,1);wput(cx+dx,top+3,cz+dz,T.krov,1);}wput(cx,top+4,cz,T.crvena,1);
    MR.lh={x:cx+.5,y:top+2.5,z:cz+.5};wStar("svjetionik",cx-2.5,top+2.6,cz+.5,"Na balkonu svjetionika, iznad mora. Popni se stubama oko tornja!");addChest("m_svjetionik",cx+3,top+2,cz-2,"Škrinja svjetioničara");}
  /* ---- the city of domes ---- */
  {const C={x:128,z:122};
    for(let dx=-31;dx<=31;dx++)for(let dz=-31;dz<=31;dz++){const d=Math.hypot(dx,dz);if(d>30)continue;const X=C.x+dx,Z=C.z+dz;const a=Math.atan2(dz,dx);const spoke=Math.abs(Math.sin(a*3))<.12+1.4/(d+1);const ring=Math.abs(d-17)<1.2;
      if(spoke||ring||d<7)vox[I(X,20,Z)]=d<7?((dx+dz)&1?T.prizcigla:T.kvarc):T.prizcigla;else if(hash2(X,Z,51)<.05)vox[I(X,20,Z)]=T.prizmarin;}
    for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const e=Math.abs(dx)===2||Math.abs(dz)===2;if(e)wput(C.x+dx,21,C.z+dz,T.prizmarin,1);}wput(C.x,21,C.z,T.kristal,1);MR.vents.push({x:C.x+.5,z:C.z+.5,y:21.5,top:36,r:1.2,soft:1});
    const H2=[];for(let i=0;i<18;i++){const a=i/18*Math.PI*2+.17,r=i%2?12.5:23;const x=Math.round(C.x+Math.cos(a)*r),z=Math.round(C.z+Math.sin(a)*r);if(Math.abs(x-C.x)<4&&z<C.z)continue;if(Math.hypot(x-146,z-108)<8)continue;
      const ang=Math.atan2(C.z-z,C.x-x);const face=Math.abs(Math.cos(ang))>Math.abs(Math.sin(ang))?(Math.cos(ang)>0?3:1):(Math.sin(ang)>0?0:2);mrHouse(x,z,face,i%5===0?2:i%3===0?1:0);H2.push([x,z]);}
    for(let i=0;i<24;i++){const a=i/24*Math.PI*2,r=17;const x=Math.round(C.x+Math.cos(a)*r),z=Math.round(C.z+Math.sin(a)*r);if(i%3)continue;if(get(x,21,z))continue;wput(x,21,z,T.prizmarin,1);wput(x,22,z,T.prizmarin,1);wput(x,23,z,T.svjetlo,1);}
    {const tx=146,tz=108,ty=20,tt=44;for(let y=ty+1;y<=tt;y++)for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const d=Math.hypot(dx,dz);if(d>3.2)continue;const wall=d>2.2;const win=wall&&y%4===2&&(dx===0||dz===0);const door=y<=ty+2&&dx===0&&dz===3;
        wput(tx+dx,y,tz+dz,wall&&!door?(win?T.staklo:(y%6===0?T.kvarc:T.prizcigla)):(y%8===0&&!door&&d<1?T.svjetlo:0),1);}
      for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){const d=Math.hypot(dx,dz);if(d<=4.2)wput(tx+dx,tt+1,tz+dz,d<1.5?T.kristal:T.kvarc,1);if(d<=4.2&&d>3.3&&(dx+dz)%2===0)wput(tx+dx,tt+2,tz+dz,T.prizmarin,1);}
      for(let i=0;i<14;i++){const a=i*.9,yy=ty+3+i*1.6;mrCoral(Math.round(tx+Math.cos(a)*3.6),Math.round(tz+Math.sin(a)*3.6),.95);}
      wStar("toranj",tx+.5,tt+2.6,tz+.5,"Na vrhu Koraljnog tornja u Gradu kupola. Zapliva gore uz toranj!");isl("toranj",tx,tz,5,20);}
    for(let z=104;z>=92;z-=4)for(const dx of [-5,5]){for(let h=1;h<=6;h++)wput(C.x+dx,20+h,z,h===6?T.kvarc:T.prizmarin,1);wput(C.x+dx,27,z,T.lampion,1);}
    for(let z=92;z<=104;z++)for(let dx=-2;dx<=2;dx++)vox[I(C.x+dx,20,z)]=Math.abs(dx)===2?T.kvarc:T.prizcigla;
    for(let i=0;i<40;i++){const a=hash2(i,1,52)*6.28,r=8+hash2(i,2,52)*22;const x=Math.round(C.x+Math.cos(a)*r),z=Math.round(C.z+Math.sin(a)*r);if(get(x,21,z)||vox[I(x,20,z)]===T.prizcigla)continue;mrCoral(x,z,hash2(i,3,52)*.9);}
    isl("grad",C.x,C.z,30,20);}
  /* ---- the Pearl Temple (finale) ---- */
  {const cx=128,cz=80,y=23;for(let dx=-11;dx<=11;dx++)for(let dz=-10;dz<=11;dz++){const e=Math.max(Math.abs(dx)-9,dz-9,-dz-8,0);mrCol(cx+dx,cz+dz,y-Math.min(2,e),e>0?T.prizcigla:((dx+dz)&1?T.kvarc:T.bijela));}
    const Wd=8,F=7,B=-7;for(let dx=-Wd;dx<=Wd;dx++)for(let dz=B;dz<=F;dz++){if(Math.abs(dx)!==Wd&&dz!==B&&dz!==F)continue;for(let h=1;h<=8;h++){const gate=dz===F&&Math.abs(dx)<=1&&h<=4;
      wput(cx+dx,y+h,cz+dz,gate?T.kristal:(h===1||h===8?T.kvarc:(h===5&&(dx+dz)%3===0?T.staklo:T.bijela)),1);if(gate)WG.gate.push([cx+dx,y+h,cz+dz]);}}
    for(const dx of [-7,-4,4,7]){for(let h=1;h<=8;h++)wput(cx+dx,y+h,cz+F+3,h===1||h===8?T.kvarc:T.bijela,1);}for(let dx=-8;dx<=8;dx++)for(let dz=F;dz<=F+3;dz++)wput(cx+dx,y+9,cz+dz,T.kvarc,1);
    for(let dx=-Wd;dx<=Wd;dx++)for(let dz=B;dz<=F;dz++)wput(cx+dx,y+9,cz+dz,T.kvarc,1);
    mrDome(cx,y+10,cz,7,T.bijela,T.zlato);for(let a=0;a<6.28;a+=.26){wput(Math.round(cx+Math.cos(a)*6.5),y+12,Math.round(cz+Math.sin(a)*6.5),T.staklo,1);}
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)for(let dy=0;dy<=2;dy++)if(Math.hypot(dx,dy-1,dz)<=1.5)wput(cx+dx,y+17+dy,cz+dz,T.kvarc,1);wput(cx,y+20,cz,T.svjetlo,1);
    for(let dx=-1;dx<=1;dx++)for(let dz=B+1;dz<=B+2;dz++)wput(cx+dx,y+1,cz+dz,T.zlato,1);wput(cx,y+2,cz+B+1,T.kristal,1);
    for(const dx of [-6,6])for(const dz of [B+2,0,F-2]){wput(cx+dx,y+1,cz+dz,T.kvarc,1);wput(cx+dx,y+2,cz+dz,T.svjetlo,1);}for(let dz=B+3;dz<=F;dz++)wput(cx,y,cz+dz,T.vuna_ts,1);
    addChest("m_hram",cx,y+1,cz+B+3,"Blago Bisernog hrama");isl("hram",cx,cz,13,y);}
  /* ---- coral reef with the giant clam ---- */
  {const C={x:192,z:158};for(let i=0;i<190;i++){const a=hash2(i,1,61)*6.28,r=Math.sqrt(hash2(i,2,61))*25;const x=Math.round(C.x+Math.cos(a)*r),z=Math.round(C.z+Math.sin(a)*r);if(Math.hypot(x-196,z-162)<4)continue;mrCoral(x,z,hash2(i,3,61));}
    for(let i=0;i<60;i++){const a=hash2(i,1,62)*6.28,r=Math.sqrt(hash2(i,2,62))*26;const x=C.x+Math.cos(a)*r,z=C.z+Math.sin(a)*r;MR.reefKelp.push({x,z,y:wTopAt(Math.round(x),Math.round(z))+1,h:2+hash2(i,3,62)*4});}
    const cy=wTopAt(196,162);mrFlat(196,162,3,cy,T.pijesak);MR.clam={x:196.5,y:cy+1,z:162.5,open:0};wStar("skoljka",196.5,-100,162.5,"U divovskoj školjki na Koraljnom grebenu. Pričekaj da se otvori!");
    addChest("m_greben",187,wTopAt(187,166)+1,166,"Škrinja s grebena");isl("greben",C.x,C.z,24);}
  /* ---- kelp forest with a mossy rock in the middle ---- */
  {const C={x:62,z:156};const g=wTopAt(C.x,C.z);for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++)for(let dy=0;dy<=6;dy++){const d=Math.hypot(dx,dy*.9,dz);if(d<4.6)wput(C.x+dx,g+dy,C.z+dz,dy>3&&hash3(dx,dy,dz)<.4?T.mahovina:T.kamen,1);}
    for(let x=C.x-1;x<=C.x+1;x++)for(let y=g+1;y<=g+2;y++)for(let z=C.z+2;z<=C.z+5;z++){vox[I(x,y,z)]=0;prot[I(x,y,z)]=0;}wput(C.x,g,C.z+3,T.ametist,1);
    wStar("alge",C.x+.5,g+1.6,C.z+3.5,"U stijeni usred Šume algi. Uđi u mali otvor s južne strane!");
    let n=0;for(let i=0;i<500&&n<190;i++){const a=hash2(i,1,71)*6.28,r=5.5+Math.sqrt(hash2(i,2,71))*20;const x=C.x+Math.cos(a)*r,z=C.z+Math.sin(a)*r;const t=wTopAt(Math.round(x),Math.round(z));if(t>26)continue;MR.kelp.push({x,z,y:t+1,h:9+hash2(i,3,71)*17});n++;}
    for(const [x,z,y] of [[52,146,2],[70,168,4],[48,162,1]])MR.pick.push({k:"mkonjic",x:x+.5,y:wTopAt(x,z)+1+y,z:z+.5});
    isl("alge",C.x,C.z,24);}
  /* ---- the shipwreck: a heeled hull with a pointed bow, broken deck, tilted mast, torn sail and the captain's cabin ---- */
  {const cx=70,cz=86,g=wTopAt(cx,cz);const yb=g-1;const HEEL=.36;const Y=(h,dz)=>yb+h+Math.round(dz*HEEL);
    const hwAt=x=>x>=7?4.2*(1-Math.pow((x-7)/8,1.5)):x<-11?4.2-(-11-x)*.7:4.2;
    for(let dx=-14;dx<=15;dx++){const w=hwAt(dx);if(w<=.2)continue;for(let h=0;h<=7;h++){const hw=w*Math.min(1,.42+h*.17);for(let dz=-5;dz<=5;dz++){const ad=Math.abs(dz);if(ad>hw+.45)continue;
        const shell=ad>hw-.75||h===0||dx===-14;const X=cx+dx,Z=cz+dz,YY=Y(h,dz);const hole=dz>0&&dx>=-3&&dx<=0&&h>=2&&h<=4;
        if(shell&&!hole)wput(X,YY,Z,h===7?T.daske:(h%3===0?T.sdaske:T.tdaske),1);else if(YY>g&&!prot[I(X,YY,Z)])vox[I(X,YY,Z)]=0;}}
      const w7=w*1.0;for(let dz=-4;dz<=4;dz++){if(Math.abs(dz)>w7-.75)continue;if(dx>-9&&dx<6&&hash2(dx,dz,81)<.22)continue;wput(cx+dx,Y(7,dz),cz+dz,T.daske,1);}
      if(dx%2===0)for(const sd of [-1,1]){const dz=Math.round(sd*(w7-.3));if(Math.abs(dz)>=1)wput(cx+dx,Y(8,dz),cz+dz,T.drvo,1);}}
    for(let k=0;k<5;k++)wput(cx+16+k,Y(6+Math.floor(k*.6),0),cz,T.drvo,1);
    for(let k=1;k<=11;k++){wput(cx+1,Y(7,0)+k,cz-Math.round(k*HEEL),T.drvo,1);}for(let k=-3;k<=3;k++)wput(cx+1,Y(7,0)+9-Math.round(k*HEEL*0),cz-Math.round(9*HEEL)+k,T.drvo,1);
    for(let k=2;k<=8;k++)for(let w=-3;w<=3;w++){if(hash2(k,w,82)<.28)continue;wput(cx+2,Y(7,0)+k,cz-Math.round(k*HEEL)+w,T.vuna_b,1);}
    for(let k=0;k<10;k++)wput(cx-4+Math.round(k*.2),g+1,cz+8+k,T.drvo,1);
    const sx=cx-10;for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++)for(let h=8;h<=11;h++){const wall=Math.abs(dx)===3||Math.abs(dz)===3;const door=dx===3&&dz===0&&h<=9;const win=h===10&&wall&&!door&&(dx===0||dz===0);
      wput(sx+dx,Y(h,dz),cz+dz,wall&&!door?(win?T.staklo:T.tdaske):0,1);}
    for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++)wput(sx+dx,Y(12,dz),cz+dz,T.tdaske,1);wput(sx-3,Y(13,0),cz,T.lampion,1);
    wput(sx-1,Y(8,0),cz,T.stol,1);wput(sx+1,Y(8,-2),cz-2,T.lampion,1);wStar("brod",sx-.5,Y(8,0)+1.7,cz+.5,"U kapetanovoj kabini potonulog broda, na stolu. Vrata kabine gledaju prema pramcu!");addChest("m_brod",sx-1,Y(8,1),cz+2,"Kapetanova škrinja");
    for(const [x,z,dy] of [[cx-6,cz+2,1],[cx+4,cz-6,1],[cx-12,cz+7,1],[cx+9,cz+5,2]])MR.pick.push({k:"hobotnica",x:x+.5,y:wTopAt(x,z)+1+dy*.4,z:z+.5});
    isl("brod",cx,cz,16);}
  /* ---- the crystal cave inside the mound ---- */
  {const C={x:46,y:27,z:118};for(let x=32;x<=60;x++)for(let z=104;z<=132;z++)for(let y=19;y<=38;y++){const q=((x-C.x)/11)**2+((y-C.y)/6.5)**2+((z-C.z)/10)**2;if(q<1&&y>=21)vox[I(x,y,z)]=0;
      else if(q<1.2&&vox[I(x,y,z)]){const h=hash3(x,y,z);vox[I(x,y,z)]=h<.07?T.kristal:h<.16?T.ametist:h<.3?T.duboki:T.kamen;}}
    for(let x=55;x<=71;x++){const zc=118+Math.round(Math.sin(x*.3));for(let dz=-2;dz<=2;dz++)for(let y=21;y<=25;y++){if(Math.abs(dz)===2&&(y===21||y===25))continue;vox[I(x,y,zc+dz)]=0;}if(x%5===0){wput(x,26,zc,T.svjetlo);wput(x,23,zc-3,T.kristal);}}
    for(let x=38;x<=54;x++)for(let z=110;z<=126;z++){if(get(x,21,z))continue;if(hash2(x,z,91)<.06){let Y=21;while(Y<38&&!get(x,Y,z))Y++;const L=1+Math.floor(hash2(x,z,92)*3);for(let k=1;k<=L;k++)if(Y-k>23)wput(x,Y-k,z,k===L?T.kristal:T.ametist);}
      if(hash2(x,z,93)<.05)wput(x,21,z,T.ametist);}
    for(let h=21;h<=23;h++)wput(38,h,118,T.ametist,1);wput(38,24,118,T.kristal,1);wStar("spilja",38.5,25.6,118.5,"Duboko u Bisernoj špilji, na ljubičastom stupu. Ulaz je s istočne strane brda!");
    addChest("m_spilja",50,21,125,"Škrinja Biserne špilje");isl("spilja",C.x,C.z,12,21);}
  /* ---- the deep trench ---- */
  {for(let x=186;x<=218;x++)for(let z=50;z<=118;z++){const top=wTopAt(x,z);for(let y=4;y<=Math.min(top,24);y++){const t=get(x,y,z);if(!t)continue;let open=false;for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])if(!get(x+a,y,z+b)&&y<SEA){open=true;break;}
      if(open&&hash3(x,y,z)<.09)vox[I(x,y,z)]=hash3(z,y,x)<.5?T.kristal:T.ametist;}}
    const by=wTopAt(202,84);mrFlat(202,84,2.5,by,T.duboki);for(let h=1;h<=2;h++)wput(202,by+h,84,T.duboki,1);wput(202,by+3,84,T.kristal,1);
    wStar("jarak",202.5,by+4.6,84.5,"Na dnu Dubokog jarka, gdje svijetle meduze. Zaroni do kraja!");addChest("m_jarak",205,by+1,88,"Škrinja iz dubine");isl("jarak",202,84,14,by);}
  /* ---- bubble vents under the stone arch ---- */
  {const C={x:183,z:202};const g0=wTopAt(C.x,C.z);const pil=(px,pz)=>{for(let y=wTopAt(px,pz)-2;y<=42;y++)for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const r=2.6-Math.sin((y-g0)*.18)*.5;if(Math.hypot(dx,dz)<=r)wput(px+dx,y,pz+dz,hash3(px+dx,y,pz+dz)<.12?T.prizmarin:T.kamen,1);}};
    pil(174,202);pil(192,202);for(let x=171;x<=195;x++){const t=(x-183)/12;const yc=Math.round(42+3*(1-t*t));for(let dz=-2;dz<=2;dz++)for(let dy=-1;dy<=1;dy++)if(Math.abs(dz)+Math.abs(dy)<=2)wput(x,yc+dy,C.z+dz,hash3(x,yc+dy,dz)<.15?T.mahovina:T.kamen,1);}
    wput(183,47,202,T.koralj_r,1);wStar("mjehurici",183.5,47.6,203.5,"Na vrhu Kamenog luka. Mjehurići iz vrela nosit će te gore!");
    for(const [x,z] of [[180,198],[186,206],[183,209],[178,208],[188,196]]){const y=wTopAt(x,z);for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]])wput(x+a,y,z+b,T.duboki);vox[I(x,y,z)]=T.ametist;MR.vents.push({x:x+.5,z:z+.5,y:y+1,top:40,r:1.3});}
    isl("mjehurici",C.x,C.z,12);}
  /* ---- the dolphin arena: tiers in a ring, golden hoops around it ---- */
  {const C={x:78,z:196};const g=wTopAt(C.x,C.z);mrFlat(C.x,C.z,9.5,g,(dx,dz)=>Math.hypot(dx,dz)<3?T.kvarc:T.pijesak);
    for(let dx=-17;dx<=17;dx++)for(let dz=-17;dz<=17;dz++){const d=Math.hypot(dx,dz);if(d<10||d>16.5)continue;const tier=Math.floor((d-10)/1.7);const top=g+1+tier;const a=Math.atan2(dz,dx);if(Math.abs(a-1.57)<.22)continue;
      for(let y=g+1;y<=top;y++)wput(C.x+dx,y,C.z+dz,y===top?(tier%2?T.prizcigla:T.prizmarin):T.prizmarin,1);}
    for(let h=1;h<=3;h++)wput(C.x,g+h,C.z,T.kvarc,1);wput(C.x,g+4,C.z,T.zlato,1);
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const y=g+6+Math.sin(i/12*Math.PI*4)*3;MR.rings.push({x:C.x+.5+Math.cos(a)*8,y,z:C.z+.5+Math.sin(a)*8,ry:a,i});}
    wStar("arena",C.x+.5,-100,C.z+.5,"U Dupinovoj areni. Proplivaj kroz svih 12 zlatnih obruča i biser će se pojaviti na stupu!");MR.ringC={x:C.x+.5,y:g+5.6,z:C.z+.5};isl("arena",C.x,C.z,16);}
  /* ---- the whale's pearl rides along on its back (moved every frame) ---- */
  wStar("kit",128,-100,140,"Na leđima Kita pjevača, koji polako pliva oko grada. Dopliva do njega!");
  /* ---- manta's meadow with the old net ---- */
  {const x=104,z=176,y=wTopAt(x,z);MR.mantaAt={x:x+.5,z:z+.5};for(let i=0;i<4;i++){const a=i/4*Math.PI*2+.4;MR.pick.push({k:"manta",x:x+.5+Math.cos(a)*2.6,y:y+2+(i%2)*1.2,z:z+.5+Math.sin(a)*2.6});}
    for(let i=0;i<30;i++){const a=hash2(i,1,101)*6.28,r=3+hash2(i,2,101)*10;const X=Math.round(x+Math.cos(a)*r),Z=Math.round(z+Math.sin(a)*r);MR.reefKelp.push({x:X+.5,z:Z+.5,y:wTopAt(X,Z)+1,h:1.5+hash2(i,3,101)*2.5});}isl("manta",x,z,8);}
  /* scattered life on the open sea floor: corals, rocks, sea grass */
  const keep=[[128,122,33],[128,80,15],[192,158,26],[62,156,26],[70,86,16],[46,118,22],[202,84,18],[183,202,13],[78,196,18],[128,212,26]];
  for(let i=0;i<900;i++){const x=8+Math.floor(hash2(i,1,111)*240),z=8+Math.floor(hash2(i,2,111)*240);if(Math.hypot(x-128,z-128)>104)continue;if(keep.some(([a,b,rr])=>Math.hypot(x-a,z-b)<rr))continue;
    const q=hash2(i,3,111);if(q<.35)mrCoral(x,z,hash2(i,4,111));else if(q<.47){const t=wTopAt(x,z);if(t<SEA-4){wput(x,t+1,z,T.kamen);if(q<.42)wput(x+1,t+1,z,T.prizmarin);}}
    else if(q<.8){const t=wTopAt(x,z);if(t<SEA-6)MR.reefKelp.push({x:x+.5,z:z+.5,y:t+1,h:1.2+hash2(i,5,111)*2.6});}}
  [["m_svjetionik","Svjetionik","svjetionik"],["m_grad","Grad kupola","grad"],["m_toranj","Koraljni toranj","toranj"],["m_hram","Biserni hram","hram"],["m_greben","Koraljni greben","greben"],["m_alge","Šuma algi","alge"],
   ["m_brod","Potonuli brod","brod"],["m_spilja","Biserna špilja","spilja"],["m_jarak","Duboki jarak","jarak"],["m_mjehurici","Kameni luk i vrela mjehurića","mjehurici"],["m_arena","Dupinova arena","arena"]].forEach(([k,n,i])=>{const c=I2[i];if(c)POI.push({k,n,x:c.x,z:c.z,r:Math.max(7,Math.min(14,c.r)),y:(c.y||20)-6});});}
Object.assign(LOOT,{
  m_svjetionik:{coins:40,mats:{},blocks:{bijela:10,crvena:10,svjetlo:3},msg:"Svjetioničarevo blago! Sagradi i ti svjetionik na svom otoku."},
  m_greben:{coins:50,mats:{biser:2},blocks:{koralj_p:6,koralj_r:6,koralj_z:6,koralj_l:6},msg:"Koralji svih boja! Na otoku će izgledati kao mali greben."},
  m_brod:{coins:70,mats:{grumen:3},blocks:{tdaske:12,vuna_b:6},msg:"Kapetanova škrinja puna starog zlata. Arrr!"},
  m_spilja:{coins:55,mats:{dijamant:1},blocks:{ametist:8,kristal:4},msg:"Biserna špilja svjetluca kao noćno nebo."},
  m_jarak:{coins:60,mats:{biser:2,dijamant:1},blocks:{duboki:12,prizmarin:8},msg:"Iz najdubljeg mjesta u moru. Nitko prije tebe nije bio ovdje!"},
  m_hram:{coins:340,mats:{biser:5,dijamant:2,smaragd:2},blocks:{prizcigla:20,prizmarin:16,staklo:16,svjetlo:6},msg:"Deset svjetlećih bisera vratilo je sjaj Bisernom hramu. Cijeli Podvodni grad ti zahvaljuje!"}});

/* ---------- the sea itself: surface, light shafts, drifting motes, kelp, fish, jellyfish, the whale, the clam ---------- */
const MRV={rays:null,snow:null,kelpM:null,fishB:null,fishT:null,schools:[],jel:[],whale:null,clamG:null,ringM:[],helm:null,under:false,uT:0};
function mrKelpTex(col,col2){const c=document.createElement("canvas");c.width=32;c.height=128;const x=c.getContext("2d");x.clearRect(0,0,32,128);x.fillStyle=col2;x.fillRect(14,0,4,128);
  x.fillStyle=col;for(let y=4;y<128;y+=9){const s=y%18?1:-1;x.beginPath();x.moveTo(16,y);x.quadraticCurveTo(16+s*16,y+2,16+s*13,y+11);x.quadraticCurveTo(16+s*6,y+8,16,y+6);x.fill();}
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;return t;}
function mrSway(mat,amp){mat.onBeforeCompile=sh=>{sh.uniforms.uTime=uTime;sh.vertexShader="uniform float uTime;\n"+sh.vertexShader.replace("#include <begin_vertex>",
  "#include <begin_vertex>\nfloat hgt=position.y;\n#ifdef USE_INSTANCING\nvec2 ip=vec2(instanceMatrix[3][0],instanceMatrix[3][2]);\n#else\nvec2 ip=vec2(0.);\n#endif\ntransformed.x+=sin(uTime*1.1+ip.x*.31+hgt*2.2)*hgt*hgt*"+amp+";transformed.z+=cos(uTime*.9+ip.y*.27+hgt*1.7)*hgt*hgt*"+(amp*.7)+";");};}
function mrKelp(list,h0,col,col2,amp){if(!list.length)return null;const geo=new THREE.PlaneGeometry(1.1,1,1,8);geo.translate(0,.5,0);const g2=geo.clone();g2.rotateY(Math.PI/2);
  const bg=new THREE.BufferGeometry();const P=[],U=[],IDX=[];let base=0;for(const G of [geo,g2]){const p=G.attributes.position.array,uv=G.attributes.uv.array;for(let i=0;i<p.length;i++)P.push(p[i]);for(let i=0;i<uv.length;i++)U.push(uv[i]);for(const ix of G.index.array)IDX.push(ix+base);base+=p.length/3;}
  bg.setAttribute("position",new THREE.Float32BufferAttribute(P,3));bg.setAttribute("uv",new THREE.Float32BufferAttribute(U,2));bg.setIndex(IDX);bg.computeVertexNormals();
  const m=new THREE.MeshStandardMaterial({map:mrKelpTex(col,col2),alphaTest:.5,side:THREE.DoubleSide,roughness:.9,color:0x9ab890});mrSway(m,amp);
  const im=new THREE.InstancedMesh(bg,m,list.length);const o=new THREE.Object3D();list.forEach((k,i)=>{o.position.set(k.x,k.y-.1,k.z);o.rotation.set(0,hash2(i,7,3)*3.14,0);o.scale.set(1,k.h*h0,1);o.updateMatrix();im.setMatrixAt(i,o.matrix);});
  im.frustumCulled=false;scene.add(im);return im;}
function mrRays(){const g=new THREE.Group();const U={uTime,uA:{value:1}};
  const m=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false,
    vertexShader:"varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"uniform float uTime,uA;varying vec2 vU;void main(){float e=smoothstep(0.,.35,vU.x)*smoothstep(1.,.65,vU.x);float v=pow(vU.y,1.6);float fl=.6+.4*sin(uTime*.7+vU.x*6.);gl_FragColor=vec4(vec3(.75,.95,1.)*e*v*fl*uA*.16,1.);}"});
  for(let i=0;i<16;i++){const w=1.4+Math.random()*3.2,h=44;const me=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);me.userData={a:Math.random()*6.28,r:4+Math.random()*30,ph:Math.random()*6,w};me.frustumCulled=false;g.add(me);}
  g.visible=false;scene.add(g);g.userData.U=U;return g;}
function mrSnow(){const N=1600,pos=new Float32Array(N*3);for(let i=0;i<N*3;i++)pos[i]=Math.random()*60;const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
  const c=document.createElement("canvas");c.width=c.height=16;const x=c.getContext("2d");const gr=x.createRadialGradient(8,8,0,8,8,8);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=gr;x.fillRect(0,0,16,16);
  const p=new THREE.Points(geo,new THREE.PointsMaterial({map:new THREE.CanvasTexture(c),size:.14,transparent:true,depthWrite:false,opacity:.7,color:0xd8f6ff}));p.frustumCulled=false;p.userData.base=pos.slice();p.visible=false;scene.add(p);return p;}
function mrFish(){const SCH=[{x:192,z:158,y:26,r:6,c:[0xff8a2a,0xffffff],n:18,s:.5},{x:128,z:122,y:31,r:9,c:[0x3a7ae8,0xffd23a],n:22,s:.35},{x:62,z:156,y:27,r:7,c:[0xc8d8e8,0x9ab0c8],n:20,s:.42},{x:70,z:86,y:28,r:6,c:[0xffd23a,0xfff4a8],n:16,s:.55},
    {x:78,z:196,y:31,r:7,c:[0xb46cff,0xffffff],n:16,s:.45},{x:150,z:170,y:38,r:10,c:[0xd8e8f4,0x8ab0d0],n:26,s:.28},{x:128,z:198,y:45,r:6,c:[0xffe03a,0x3a8ae8],n:14,s:.6},{x:202,z:84,y:16,r:5,c:[0x7ff6ff,0xb46cff],n:12,s:.4,glow:1}];
  let N=0;SCH.forEach(s=>N+=s.n);const bg=new THREE.BoxGeometry(.16,.24,.46),tg=new THREE.BoxGeometry(.03,.22,.18);tg.translate(0,0,-.3);
  const bm=new THREE.MeshStandardMaterial({roughness:.5,metalness:.1}),tm=new THREE.MeshStandardMaterial({roughness:.6});const B=new THREE.InstancedMesh(bg,bm,N),Tl=new THREE.InstancedMesh(tg,tm,N);const col=new THREE.Color();
  let k=0;SCH.forEach((s,si)=>{s.f=[];for(let j=0;j<s.n;j++){const f={i:k,a:Math.random()*6.28,rr:s.r*(.4+Math.random()*.6),dy:(Math.random()-.5)*3,ph:Math.random()*6,sz:.7+Math.random()*.6,off:new THREE.Vector3()};s.f.push(f);
      col.setHex(s.c[j%2?1:0]);if(s.glow)col.multiplyScalar(1.6);B.setColorAt(k,col);col.setHex(s.c[0]);Tl.setColorAt(k,col);k++;}});
  if(SCH.some(s=>s.glow)){bm.emissive=new THREE.Color(0x000000);}B.frustumCulled=Tl.frustumCulled=false;scene.add(B);scene.add(Tl);MRV.fishB=B;MRV.fishT=Tl;MRV.schools=SCH;}
function mrJelly(){const cols=[0xff8ad8,0x8af0ff,0xc8a0ff,0xffc0f0];const spots=[];for(let i=0;i<12;i++)spots.push({x:196+Math.random()*12,y:8+Math.random()*14,z:62+Math.random()*44,glow:1.2});
  for(let i=0;i<8;i++){const a=Math.random()*6.28,r=14+Math.random()*50;spots.push({x:128+Math.cos(a)*r,y:30+Math.random()*12,z:128+Math.sin(a)*r,glow:.7});}
  for(const s of spots){const c=cols[Math.floor(Math.random()*cols.length)];const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(c),emissive:LC(c),emissiveIntensity:s.glow,transparent:true,opacity:.62,roughness:.3,depthWrite:false});
    const dome=new THREE.Mesh(new THREE.SphereGeometry(.55,14,8,0,Math.PI*2,0,Math.PI/2),m);g.add(dome);const core=new THREE.Mesh(new THREE.SphereGeometry(.2,8,6),new THREE.MeshStandardMaterial({color:LC(0xffffff),emissive:LC(c),emissiveIntensity:s.glow*1.6}));core.position.y=.15;g.add(core);
    const tm=new THREE.MeshStandardMaterial({color:LC(c),emissive:LC(c),emissiveIntensity:s.glow*.8,transparent:true,opacity:.5,depthWrite:false});const ten=[];
    for(let k=0;k<6;k++){const a=k/6*Math.PI*2;const t=new THREE.Mesh(new THREE.BoxGeometry(.03,1.3,.03),tm);t.geometry.translate(0,-.65,0);t.position.set(Math.cos(a)*.32,0,Math.sin(a)*.32);g.add(t);ten.push(t);}
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:c,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.5*s.glow}));sp.scale.set(2.6,2.6,1);g.add(sp);
    g.position.set(s.x,s.y,s.z);scene.add(g);MRV.jel.push({g,dome,ten,x:s.x,y:s.y,z:s.z,ph:Math.random()*6,hit:0});}}
function mrWhaleMesh(){const g=new THREE.Group();const B=std(0x3a5a7e),L=std(0xd8e4ec),D=std(0x2a4462),K=std(0x101820);const add=(w,h,d,x,y,z,m,par)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);(par||g).add(o);return o;};
  add(3.2,2.6,7.5,0,0,0,B);add(2.8,1.0,6.6,0,-1.3,.3,L);add(2.6,2.2,2.6,0,-.1,4.8,B);add(2.2,.6,2.2,0,-1.2,4.6,L);add(.3,.3,.1,-1.32,.2,5.5,K);add(.3,.3,.1,1.32,.2,5.5,K);
  for(let i=0;i<6;i++)add(2.5,.08,.2,0,-1.82,4.8-i*.6,D);add(.5,.6,1.2,0,1.5,-1.6,D);
  const fl=new THREE.Group();fl.position.set(-1.7,-.8,2.2);g.add(fl);add(2.2,.2,1.1,-1,0,0,D,fl);const fr=new THREE.Group();fr.position.set(1.7,-.8,2.2);g.add(fr);add(2.2,.2,1.1,1,0,0,D,fr);
  const tail=new THREE.Group();tail.position.set(0,0,-3.7);g.add(tail);add(2.2,1.8,3,0,0,-1.4,B,tail);const fluke=new THREE.Group();fluke.position.set(0,0,-3);tail.add(fluke);add(5.2,.25,1.6,0,0,-.6,D,fluke);
  for(const [x,y,z] of [[-.8,1.32,1.2],[.6,1.32,.4],[.2,1.32,2.4],[-.4,1.32,-1]])add(.25,.12,.25,x,y,z,std(0xc8c0b0));
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});g.userData={fl,fr,tail,fluke};scene.add(g);return g;}
function mrClam(){const C=MR.clam;if(!C)return;const g=new THREE.Group();const m=std(0xd890c8,{roughness:.55}),m2=std(0xf4d8ec,{roughness:.4});
  const bot=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,8,0,Math.PI*2,Math.PI/2,Math.PI/2),m);bot.scale.set(1,.45,1);g.add(bot);const inner=new THREE.Mesh(new THREE.CircleGeometry(1.42,20).rotateX(-Math.PI/2),m2);inner.position.y=.01;g.add(inner);
  const hinge=new THREE.Group();hinge.position.set(0,0,-1.45);g.add(hinge);const top=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,8,0,Math.PI*2,0,Math.PI/2),m);top.scale.set(1,.45,1);top.position.set(0,0,1.45);hinge.add(top);
  for(let i=-3;i<=3;i++){const r=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,2.9),m2);r.position.set(i*.38,.55-Math.abs(i)*.06,1.45);hinge.add(r);}
  g.position.set(C.x,C.y+.55,C.z);g.traverse(o=>{if(o.isMesh)o.castShadow=true;});scene.add(g);MRV.clamG=g;g.userData.hinge=hinge;}
function mrPearl(){const g=new THREE.Group();const sh=new THREE.Mesh(new THREE.SphereGeometry(.42,12,6,0,Math.PI*2,Math.PI/2,Math.PI/2),std(0xffb8d8,{roughness:.4}));sh.scale.set(1,.35,1);sh.position.y=-.2;g.add(sh);
  const p=new THREE.Mesh(new THREE.SphereGeometry(.24,16,12),new THREE.MeshStandardMaterial({color:0xfff8fc,emissive:LC(0xffd8f0),emissiveIntensity:.75,roughness:.12,metalness:.3}));g.add(p);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffe0f4,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.95}));sp.scale.set(2.3,2.3,1);g.add(sp);return g;}
function mrPickMesh(item){const g=new THREE.Group();let gl;
  if(item==="skoljkica"){gl=0xffa0d0;const m=new THREE.Mesh(new THREE.SphereGeometry(.24,10,6,0,Math.PI*2,0,Math.PI/2),std(0xff8ac0,{emissive:LC(0xff5aa0),emissiveIntensity:.7}));m.scale.set(1,.5,1);g.add(m);}
  else if(item==="zlatnik"){gl=0xffd060;const m=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.06,14),std(0xffc53d,{metalness:.7,roughness:.25,emissive:LC(0xc08000),emissiveIntensity:.5}));m.rotation.x=Math.PI/2;g.add(m);}
  else{gl=0xfff0c0;const m=new THREE.Mesh(new THREE.TorusGeometry(.2,.07,6,12),std(0xd8b880,{emissive:LC(0x806020),emissiveIntensity:.5}));g.add(m);}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:gl,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(1.5,1.5,1);g.add(sp);return g;}
function mrEnv(){water.visible=true;water.position.y=SEA;voxU.uWaterY.value=SEA;if(waterU.uClear)waterU.uClear.value=.42;if(life.boat)life.boat.visible=false;
  MRV.rays=mrRays();MRV.snow=mrSnow();mrKelp(MR.kelp,1,"#3f9a3a","#2a6a2a",.9);mrKelp(MR.reefKelp,1,"#5ac860","#2f8a3a",.14);mrFish();mrJelly();MRV.whale=mrWhaleMesh();mrClam();
  const geo=new THREE.TorusGeometry(1.15,.13,8,24),m=std(0xffc53d,{emissive:LC(0xff9a00),emissiveIntensity:.9,metalness:.5,roughness:.3});S.mrRings=S.mrRings||0;
  for(const r of MR.rings){const g=new THREE.Mesh(geo,m);g.position.set(r.x,r.y,r.z);g.rotation.y=r.ry;scene.add(g);r.g=g;r.got=false;}
  mrDomes();}
function mrDomes(){if(!MR.domes.length)return;const gm=new THREE.SphereGeometry(1,22,10,0,Math.PI*2,0,Math.PI/2);const m=new THREE.MeshStandardMaterial({color:0xa8f0ff,emissive:LC(0x1a5a6a),emissiveIntensity:.35,transparent:true,opacity:.3,roughness:.06,metalness:.4,side:THREE.DoubleSide,depthWrite:false});
  const rm=std(0x5aa898);const im=new THREE.InstancedMesh(gm,m,MR.domes.length);const o=new THREE.Object3D();MR.domes.forEach((d,i)=>{o.position.set(d.x,d.y-.5,d.z);o.scale.setScalar(d.r);o.rotation.set(0,0,0);o.updateMatrix();im.setMatrixAt(i,o.matrix);});im.renderOrder=3;scene.add(im);
  const rib=new THREE.TorusGeometry(1,.035,5,28,Math.PI);const ri=new THREE.InstancedMesh(rib,rm,MR.domes.length*3);let k=0;MR.domes.forEach(d=>{for(let j=0;j<3;j++){o.position.set(d.x,d.y-.5,d.z);o.scale.setScalar(d.r);o.rotation.set(0,j*Math.PI/3,0);o.updateMatrix();ri.setMatrixAt(k++,o.matrix);}});scene.add(ri);}
function mrHelm(){const m=new THREE.Mesh(new THREE.SphereGeometry(.44,18,12),new THREE.MeshStandardMaterial({color:0xcff4ff,emissive:LC(0x3a8aa0),emissiveIntensity:.25,transparent:true,opacity:.2,roughness:.04,metalness:.3,depthWrite:false}));
  const hl=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7}));hl.position.set(-.18,.2,.24);m.add(hl);m.visible=false;m.renderOrder=6;scene.add(m);return m;}
const mrHv=new THREE.Vector3();
function mrHelmTick(){const on=FP.on&&FP.under&&(WORLD==="more"||FP.bubbleT>0);if(on&&!MRV.helm)MRV.helm=mrHelm();if(!MRV.helm)return;MRV.helm.visible=on;if(!on||!rida)return;const hd=rida.g.userData.parts.head;if(!hd)return;
  hd.getWorldPosition(mrHv);MRV.helm.position.copy(mrHv);MRV.helm.position.y+=.06;}

/* ---------- life: the old turtle, crabs, sea turtles and the three friends ---------- */
let lunja=null;
function mrLife(){const put=(kind,name,x,z,o)=>{o=o||{speed:1};const e=spawn(kind,name,o);e.x=x;e.z=z;e.y=walkable(e.x,e.z,!!o.swim)||wTopAt(Math.floor(x),Math.floor(z))+1;e.home={x,z};return e;};
  lunja=put("starakornjaca","Kornjača Lunja",124.5,213.5);lunja.frozen=true;lunja.g.rotation.y=.9;lunja.g.scale.setScalar(1.7);
  [["Štipko",120,120],["Rakica",196,150],["Kliješto",138,132],["Bočko",70,94],["Crvenko",126,208]].forEach(([n,x,z])=>put("rak",n,x,z,{speed:.7}));
  [["Starica Ola",150,140],["Plovko",100,170]].forEach(([n,x,z])=>{const e=put("mkornjaca",n,x,z,{speed:1.3,swim:true});e.g.scale.setScalar(1.3);});
  put("mkonjic",PETS.mkonjic.n,187.5,152.5,{speed:.8,swim:true});put("manta",PETS.manta.n,MR.mantaAt.x,MR.mantaAt.z,{speed:1.2,swim:true});put("hobotnica",PETS.hobotnica.n,63.5,93.5,{speed:.7,swim:true});
  const mt=petEnt("manta");if(mt&&!S.met.manta){mt.frozen=true;}
  S.wq=S.wq||{};MR.pick.forEach((p,i)=>{if(S.met[p.k])return;const q=S.wq[p.k]||{};const idx=MR.pick.filter(o=>o.k===p.k).indexOf(p);const g=mrPickMesh(MRQ[p.k].item);g.position.set(p.x,p.y,p.z);p.g=g;p.got=idx<(q.n||0);p.i=i;g.visible=!!q.on&&!p.got;scene.add(g);});}
function mrQuestOn(k){return S.wq&&S.wq[k]&&S.wq[k].on;}
function mrQuestStart(k,en){S.wq=S.wq||{};if(!S.wq[k])S.wq[k]={on:1,n:0};else S.wq[k].on=1;save();const Q=MRQ[k];say(en,Q.ask,9000);sfx.chime();
  for(const p of MR.pick)if(p.k===k&&!p.got&&p.g){p.g.visible=true;burst(p.x,p.y,p.z,18,[[1,.9,.6],[.6,1,1]],1.6,2,.8);}toast(Q.got+": "+(S.wq[k].n||0)+" / "+Q.need+". Svjetlucaju, pa ih lako vidiš!",4200);}
function mrQuestStep(k){const Q=MRQ[k],q=S.wq[k];q.n=(q.n||0)+1;save();if(q.n>=Q.need){mrBefriend(k);return;}toast(Q.got+" "+q.n+" / "+Q.need+"!",2600);tone(880,.1,"triangle",.03);tone(1175,.12,"triangle",.03,.08);}
function mrBefriend(k){const P=PETS[k];S.met[k]=today();const I2=petInfo(k);I2.h=Math.max(I2.h,2);S.wq[k].on=0;S.wq[k].done=1;save();const en=petEnt(k);
  if(en){en.frozen=false;say(en,MRQ[k].done,7000);en.celebrate=1.4;for(let i=0;i<14;i++)mgSpawn({t:"heart",x:en.x,y:en.y+1.2,z:en.z,vx:(Math.random()-.5)*2,vy:1.5+Math.random()*2,vz:(Math.random()-.5)*2,life:1.4,size:.35,size2:.1,col:[0xff6a8a,0xff9ab0],grav:1});}
  if(k==="manta"&&en)for(let i=0;i<30;i++)mgSpawn({t:"spark",x:en.x,y:en.y+.6,z:en.z,vx:(Math.random()-.5)*5,vy:(Math.random()-.2)*3,vz:(Math.random()-.5)*5,life:1,size:.2,size2:.04,col:[0xd8b880,0xfff0c0]});
  sfx.fanfare();fpUI();
  setTimeout(()=>rewardReveal({kicker:"Novi prijatelj!",title:P.n,portrait:portrait(k),items:[{ic:thingIcon(P.fav),n:"Voli: "+thingName(P.fav),cnt:0,rar:"r"},{ic:itemIcon("star"),n:SPEC[k].n,cnt:0,rar:"l"}],
    sub:P.d+" Dodirni ga i jaši! Čekat će te i u moru kraj Otoka priča.",ok:"Jupi!"}),1600);}
function mrTalk(){const n=wStars("more");const need=MRPETS.filter(k=>!S.met[k]);
  const L=n>=WSTAR_N?(WG.gateOpen?"Vrata Bisernog hrama su otvorena! Hram je na sjevernom kraju Grada kupola, iza stupova. Blago te čeka unutra.":"Svi biseri su tu! Hram se budi..."):
    n===0?"Dobro došla, mala lisice! Ja sam kornjača Lunja i čuvam ovaj svjetionik već sto godina. Oluja je raznijela deset svjetlećih bisera iz Bisernog hrama dolje na dnu mora. Bez njih vrata hrama ostaju zatvorena. Ne boj se vode, čarobni mjehurić pomoći će ti disati!":
    "Imaš "+n+" od "+WSTAR_N+" bisera. Strelica gore pokazuje najbliži. Jedan biser nosi Kit pjevač na leđima, a jedan čuva divovska školjka. Pričekaj da se otvori!";
  say(lunja,L+(need.length&&n<WSTAR_N?" Dolje žive i stvorenja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),9500);}
{const _at=animalTap;animalTap=function(en,explore){const k=en.kind;
  if(k==="starakornjaca"){mrTalk();return true;}
  if(k==="rak"){const L=["Klik-klak! Ja hodam postrance, a ti?","Pazi gdje staješ, ovo je moj pijesak!","Jesi li vidjela kita? Pjeva tako lijepo da mi klješta zadrhte.","U potonulom brodu živi netko s osam ruku!"];say(en,L[Math.floor(Math.random()*L.length)],3600);en.celebrate=.5;return true;}
  if(k==="mkornjaca"){say(en,"Plivam ovuda već dvjesto godina. More je puno čuda, samo treba gledati!",4200);return true;}
  if(MRPETS.includes(k)&&!S.met[k]){if(!WORLD)return true;const q=S.wq&&S.wq[k];if(q&&q.on)say(en,MRQ[k].got+": "+(q.n||0)+" / "+MRQ[k].need+". Hvala što mi pomažeš!",4000);else mrQuestStart(k,en);return true;}
  return _at.apply(this,arguments);};}

/* ---------- per-frame: whale, clam, hoops, jellyfish, vents, fish, pickups ---------- */
const mrStar=k=>WG.stars.find(s=>s.k===k);
function mrWhaleTick(dt,tt){const g=MRV.whale;if(!g)return;const P=FP.p;const W2=MR.whaleS||(MR.whaleS={u:.25,sp:.012});
  const ex=(u)=>[128+Math.cos(u*6.2832)*76,44+Math.sin(u*12.566)*1.2,140+Math.sin(u*6.2832)*56];const [x,y,z]=ex(W2.u);const d=Math.hypot(P.x-x,P.y-y,P.z-z);
  const want=d<16?.0028:.0085;W2.sp+=(want-W2.sp)*Math.min(1,dt*.8);W2.u=(W2.u+W2.sp*dt)%1;const [x2,y2,z2]=ex((W2.u+.004)%1);
  g.position.set(x,y,z);g.rotation.order="YXZ";g.rotation.y=Math.atan2(x2-x,z2-z);g.rotation.x=-(y2-y)*.6;g.rotation.z=Math.sin(tt*.4)*.06;
  const U=g.userData;U.tail.rotation.x=Math.sin(tt*1.3)*.22;U.fluke.rotation.x=Math.sin(tt*1.3-.6)*.32;U.fl.rotation.z=-.25+Math.sin(tt*.9)*.15;U.fr.rotation.z=.25-Math.sin(tt*.9)*.15;
  const s=mrStar("kit");if(s&&!s.got){const v=new THREE.Vector3(0,1.95,1.2).applyEuler(g.rotation);s.x=x+v.x;s.y=y+v.y;s.z=z+v.z;s.g.position.x=s.x;s.g.position.z=s.z;
    if(FP.on&&Math.hypot(P.x-s.x,P.z-s.z)<2.4&&Math.abs(P.y+.5-s.y)<2.4)starGet(s);}
  if(d<70&&Math.random()<dt*1.2)mgSpawn({t:"puff",x:x+(Math.random()-.5)*2,y:y+1.4,z:z+(Math.random()-.5)*2,vy:1.2,life:2,size:.15,size2:.3,col:[0xe8fbff,0xffffff],drag:.3,op:.6});
  MR.songT=(MR.songT||6)-dt;if(MR.songT<=0){MR.songT=13+Math.random()*9;if(d<55&&typeof mrSong==="function")mrSong(cl01(1-d/55));}
  if(d<14)tipOnce("kit","Kit pjevač! Kad mu se približiš, uspori da ga možeš sustići. Biser mu je na leđima.");}
function mrSong(v){if(muted||typeof AU==="undefined"||!AU||AU.C.state!=="running")return;const C=AU.C,t0=C.currentTime;const seq=[[180,260,2.2],[260,150,2.6],[140,210,1.8]];let t=0;
  for(const [f1,f2,d] of seq){const o=C.createOscillator(),o2=C.createOscillator(),g=C.createGain(),lp=C.createBiquadFilter();lp.type="lowpass";lp.frequency.value=900;o.type="sine";o2.type="triangle";
    o.frequency.setValueAtTime(f1,t0+t);o.frequency.exponentialRampToValueAtTime(f2,t0+t+d);o2.frequency.setValueAtTime(f1*2.01,t0+t);o2.frequency.exponentialRampToValueAtTime(f2*2.01,t0+t+d);
    g.gain.setValueAtTime(.0001,t0+t);g.gain.linearRampToValueAtTime(.05*v,t0+t+d*.4);g.gain.exponentialRampToValueAtTime(.0001,t0+t+d);const g2=C.createGain();g2.gain.value=.25;
    o.connect(g);o2.connect(g2);g2.connect(g);g.connect(lp);lp.connect(AU.amb);o.start(t0+t);o2.start(t0+t);o.stop(t0+t+d+.1);o2.stop(t0+t+d+.1);t+=d*.8;}}
function mrClamTick(dt,tt){const C=MR.clam,g=MRV.clamG;if(!C||!g)return;const ph=(tt%7.5);const open=ph<3.8;C.open+=((open?1:0)-C.open)*Math.min(1,dt*(open?2.2:5));g.userData.hinge.rotation.x=-C.open*1.0;
  const s=mrStar("skoljka");if(s&&!s.got){s.y=C.open>.6?C.y+.95:-100;if(C.open>.6&&Math.random()<dt*6)mgSpawn({t:"spark",x:C.x+(Math.random()-.5)*.8,y:C.y+1+Math.random()*.6,z:C.z+(Math.random()-.5)*.8,vy:.5,life:.8,size:.16,size2:.02,col:[0xffe0f4,0xffffff],add:1});}
  if(FP.on&&Math.hypot(FP.p.x-C.x,FP.p.z-C.z)<5)tipOnce("skoljka","Divovska školjka se polako otvara i zatvara. Kad se otvori, brzo uzmi biser!");
  if(open&&!C.wasOpen&&FP.on&&Math.hypot(FP.p.x-C.x,FP.p.z-C.z)<20){tone(220,.3,"sine",.02);tone(330,.4,"sine",.015,.1);}C.wasOpen=open;}
function mrRingTick(dt,tt){const P=FP.p;for(const r of MR.rings){if(!r.g)continue;if(r.got){r.g.visible=false;continue;}r.g.rotation.z+=dt*1.2;
    if(Math.hypot(P.x-r.x,P.z-r.z)<1.35&&Math.abs(P.y+.5-r.y)<1.4){r.got=true;S.coins+=3;renderEco();mgRing(r.x,r.y,r.z,0xffc53d);burst(r.x,r.y,r.z,16,[[1,.85,.3],[1,1,.7]],1.8,1.6,.6);
      const n=MR.rings.filter(x=>x.got).length;tone(880+n*70,.12,"triangle",.03);if(n===MR.rings.length){sfx.fanfare();const s=mrStar("arena");if(s&&!s.got){s.y=MR.ringC.y;burst(s.x,s.y,s.z,40,[[1,.9,.6],[1,1,1]],2.4,2.4,.9);toast("Svih 12 obruča! Biser se pojavio na zlatnom stupu u sredini arene!",4200);}else{S.coins+=20;renderEco();toast("Svih 12 obruča! +20 zlatnika",3000);}}
      else if(n===1)tipOnce("obruci","Zlatni obruči! Proplivaj kroz svih 12 i nešto će se dogoditi u sredini arene.");}}}
function mrJellyTick(dt,tt){const P=FP.p;for(const j of MRV.jel){const p=Math.sin(tt*1.6+j.ph);j.dome.scale.set(1+p*.12,1-p*.2,1+p*.12);j.y+=Math.sin(tt*.5+j.ph)*dt*.25;j.x+=Math.cos(tt*.13+j.ph)*dt*.12;
    j.g.position.set(j.x,j.y+Math.max(0,p)*.15,j.z);j.ten.forEach((t,i)=>{t.rotation.x=Math.sin(tt*1.6+j.ph+i)*.25;t.rotation.z=Math.cos(tt*1.3+j.ph+i)*.2;});
    if(FP.on){const dx=P.x-j.x,dy=P.y+.5-j.y,dz=P.z-j.z,d=Math.hypot(dx,dy,dz);j.hit=Math.max(0,j.hit-dt);if(d<1.15&&!j.hit){j.hit=1;const k=4/(d||1);FP.v.x+=dx*k;FP.v.y+=dy*k+1;FP.v.z+=dz*k;
      burst(j.x,j.y,j.z,14,[[1,.6,.95],[.6,1,1]],1.6,1.4,.6);tone(520,.15,"sine",.03);tone(780,.12,"sine",.02,.06);tipOnce("meduza","Bok! Meduze su mekane i svijetle, ali bolje ih je obići.");}}}}
function mrVentTick(dt,tt){const P=FP.p,V=FP.v;let inV=false;for(const v of MR.vents){const near=Math.hypot(P.x-v.x,P.z-v.z);
    if(near<50&&Math.random()<dt*(v.soft?6:14))mgSpawn({t:"puff",x:v.x+(Math.random()-.5)*v.r,y:v.y+Math.random()*2,z:v.z+(Math.random()-.5)*v.r,vy:v.soft?2.2:4.5+Math.random()*2,life:v.soft?2.6:3.2,size:.1,size2:.24,col:[0xe8fbff,0xbff0ff,0xffffff],drag:.05,op:.8,wob:.6});
    if(!v.soft&&near<v.r&&P.y>v.y-1&&P.y<v.top&&FP.swim){inV=true;V.y+=(9-V.y)*Math.min(1,dt*4);}}
  if(inV&&!mrVentTick.on){mrVentTick.on=1;for(let i=0;i<5;i++)tone(400+i*120,.15,"sine",.012,i*.05);tipOnce("vrelo_m","Mjehurići te nose gore! Na vrhu luka čeka biser.");}if(!inV)mrVentTick.on=0;}
const mrO=new THREE.Object3D();
function mrFishTick(dt,tt){const B=MRV.fishB,Tl=MRV.fishT;if(!B)return;const P=FP.p;
  for(const s of MRV.schools){const cx=s.x+Math.cos(tt*.07+s.x)*4,cz=s.z+Math.sin(tt*.06+s.z)*4;for(const f of s.f){f.a+=dt*s.s*(1+Math.sin(tt+f.ph)*.2);const x=cx+Math.cos(f.a)*f.rr,z=cz+Math.sin(f.a)*f.rr,y=s.y+f.dy+Math.sin(tt*.8+f.ph)*.6;
      const dx=x+f.off.x-P.x,dy=y+f.off.y-P.y-.5,dz=z+f.off.z-P.z,d=Math.hypot(dx,dy,dz);if(FP.on&&d<3.2){const k=(3.2-d)*dt*6/(d||1);f.off.x+=dx*k;f.off.y+=dy*k;f.off.z+=dz*k;}f.off.multiplyScalar(Math.max(0,1-dt*.6));
      mrO.position.set(x+f.off.x,y+f.off.y,z+f.off.z);mrO.rotation.set(0,f.a+(s.s>0?Math.PI:0)+Math.sin(tt*8+f.ph)*.18,0);mrO.scale.setScalar(f.sz);mrO.updateMatrix();B.setMatrixAt(f.i,mrO.matrix);
      mrO.rotation.y+=Math.sin(tt*10+f.ph)*.35;mrO.updateMatrix();Tl.setMatrixAt(f.i,mrO.matrix);}}
  B.instanceMatrix.needsUpdate=true;Tl.instanceMatrix.needsUpdate=true;}
function mrPickTick(dt,tt){const P=FP.p;for(const p of MR.pick){if(!p.g||p.got||!p.g.visible)continue;p.g.rotation.y+=dt*2;p.g.position.y=p.y+Math.sin(tt*2.4+p.i)*.15;
    if(Math.hypot(P.x-p.x,P.z-p.z)<1.3&&Math.abs(P.y+.5-p.y)<1.6){p.got=true;p.g.visible=false;burst(p.x,p.y,p.z,20,[[1,.8,.9],[1,1,.8]],1.8,2,.7);sfx.pop();mrQuestStep(p.k);}}
  for(const k of MRPETS){if(S.met[k]||mrQuestOn(k))continue;const en=petEnt(k);if(en&&Math.hypot(P.x-en.x,P.z-en.z)<4.4&&Math.abs(P.y-en.y)<4&&!(S.wq&&S.wq[k]&&S.wq[k].seen)){S.wq=S.wq||{};S.wq[k]=S.wq[k]||{n:0};S.wq[k].seen=1;mrQuestStart(k,en);}}}
function mrPetAnim(dt,tt){const mo=FP.mount&&FP.mount.k;const m=petEnt("manta");if(m){const p=m.g.userData.parts;const f=Math.sin(tt*(mo==="manta"?3.2:1.8))*.32;if(p.wl){p.wl.rotation.z=f;p.wr.rotation.z=-f;}if(mo!=="manta")m.g.position.y+=Math.sin(tt*.9)*.2;}
  const o=petEnt("hobotnica");if(o){const p=o.g.userData.parts;for(let i=0;i<8;i++)if(p["t"+i])p["t"+i].rotation.x=Math.sin(tt*2.4+i*.8)*.35-.1;if(mo==="hobotnica"&&Math.hypot(FP.v.x,FP.v.z)>5&&Math.random()<dt*10){const P=FP.p;mgSpawn({t:"puff",x:P.x-FP.v.x*.08,y:P.y+.5,z:P.z-FP.v.z*.08,vy:.1,life:1.4,size:.3,size2:.9,col:[0x2a1a3a,0x3a2a4a],drag:1.2,op:.55});}}
  const k=petEnt("mkonjic");if(k){const p=k.g.userData.parts;if(p.tail)p.tail.rotation.x=Math.sin(tt*2)*.2;if(mo!=="mkonjic")k.g.position.y+=Math.sin(tt*1.4)*.15;if(mo==="mkonjic"&&Math.random()<dt*8){const P=FP.p;mgSpawn({t:"puff",x:P.x,y:P.y+.4,z:P.z,vy:1.4,life:1.4,size:.1,size2:.22,col:[0xe8fbff,0xffffff],drag:.3,op:.75});}}
  for(const e of ents)if(e.kind==="mkornjaca"&&e.g.userData.parts.l0){const f=Math.sin(tt*2+e.ph)*.5;const p=e.g.userData.parts;p.l0.rotation.z=f;p.l1.rotation.z=-f;}}
function mrTick(dt,tt){mrWhaleTick(dt,tt);mrClamTick(dt,tt);mrRingTick(dt,tt);mrJellyTick(dt,tt);mrVentTick(dt,tt);mrFishTick(dt,tt);mrPickTick(dt,tt);mrPetAnim(dt,tt);
  const P=FP.p;
  if(FP.under){MR.bubT=(MR.bubT||0)-dt;if(MR.bubT<=0){MR.bubT=.35+Math.random()*.4;mgSpawn({t:"puff",x:P.x+(Math.random()-.5)*.3,y:P.y+1.1,z:P.z+(Math.random()-.5)*.3,vy:1.6,life:1.8,size:.07,size2:.16,col:[0xffffff,0xd8f6ff],drag:.2,op:.8,wob:.5});}
    tipOnce("mrPod",fpTouch()?"Rida diše kroz čarobni mjehurić! Gumbi Gore i Roni vode je gore-dolje kroz more.":"Rida diše kroz čarobni mjehurić! Razmaknica je gore, C je dolje, a Shift ubrzava.",6000);}
  if(Math.hypot(P.x-202,P.z-84)<14&&P.y<18)tipOnce("jarak","Duboki jarak. Ovdje je mračno, ali meduze i kristali svijetle!");}

/* ---------- under the surface: colour by depth, light shafts, drifting motes ---------- */
const MR_C0=new THREE.Color(0x2aa0cc),MR_C1=new THREE.Color(0x13548c),MR_C2=new THREE.Color(0x051632),mrTmp=new THREE.Color();
{const _te=tickEnv;tickEnv=function(dt){_te.apply(this,arguments);if(WORLD!=="more")return;const cp=camera.position;const under=cp.y<SEA-.06;
  if(under){const d=SEA-cp.y;if(d<24)mrTmp.copy(MR_C0).lerp(MR_C1,d/24);else mrTmp.copy(MR_C1).lerp(MR_C2,Math.min(1,(d-24)/20));
    scene.fog.color.copy(mrTmp).convertSRGBToLinear();scene.fog.density=.0125+Math.min(.022,d*.00045);waterU.uFogC.value.copy(mrTmp);waterU.uFogD.value=scene.fog.density;waterU.uUnder.value=1;
    if(!MRV.under){MRV.under=true;sky.visible=false;if(typeof starM!=="undefined")starM.visible=false;}if(!scene.background||!scene.background.isColor)scene.background=new THREE.Color();scene.background.copy(scene.fog.color);
    renderer.toneMappingExposure=(cur.exp||1)*(1-Math.min(.42,Math.max(0,d-16)/60));
    const R=MRV.rays;if(R){R.visible=true;R.userData.U.uA.value=Math.max(0,1-d/38);const sx=tmpV.x,sz=tmpV.z;for(const m of R.children){const u=m.userData;const a=u.a+tt*.01;m.position.set(cp.x+Math.cos(a)*u.r,SEA-20,cp.z+Math.sin(a)*u.r);
      m.lookAt(cp.x,SEA-20,cp.z);m.rotateZ(.22+Math.sin(tt*.2+u.ph)*.05);m.rotateX(-.12);m.material.opacity=1;}}
    const N=MRV.snow;if(N){N.visible=true;const a=N.geometry.attributes.position,p=a.array,b=N.userData.base;for(let i=0;i<p.length;i+=3){b[i+1]-=dt*.08;b[i]+=Math.sin(tt*.3+i)*dt*.05;const wx=((b[i]-cp.x)%60+90)%60-30,wy=((b[i+1]-cp.y)%40+60)%40-20,wz=((b[i+2]-cp.z)%60+90)%60-30;p[i]=cp.x+wx;p[i+1]=Math.min(SEA-.3,cp.y+wy);p[i+2]=cp.z+wz;}a.needsUpdate=true;}}
  else if(MRV.under||scene.background){MRV.under=false;sky.visible=true;if(typeof starM!=="undefined")starM.visible=true;scene.background=null;const f=WDEF.more.fog;scene.fog.density=f;waterU.uFogD.value=f;waterU.uUnder.value=0;if(MRV.rays)MRV.rays.visible=false;if(MRV.snow)MRV.snow.visible=false;}};}

/* ---------- swimming: hover where you stop, swim faster, breathe through the bubble ---------- */
{const _ts=tickSquirrel;tickSquirrel=function(dt){const bub=FP.bubbleT>0;if(!FP.on||(WORLD!=="more"&&!bub))return _ts.apply(this,arguments);
  const k=FP.keys,sm=FP.swimMul||1,bo=S.boatOff;FP.neutral=1;FP.vMul=1.9;FP.swimMul=sm*((k.shift||FP.padRun)?2.9:2.1);if(WORLD==="more")S.boatOff=1;
  _ts.apply(this,arguments);S.boatOff=bo;FP.neutral=0;FP.vMul=1;FP.swimMul=sm;if(FP.under||WORLD==="more"){FP.breath=breathMax();FP.outT=0;}if(WORLD==="more"){FP.stamina=stamMax();FP.warned=0;}
  if(bub){FP.bubbleT-=Math.min(dt,.05);if(FP.bubbleT<=0){FP.bubbleT=0;toast("Čarobni mjehurić je pukao. Pop!",2400);sfx.pop();}
    else if(FP.bubbleT<6&&!FP.bubWarn){FP.bubWarn=1;toast("Mjehurić će uskoro puknuti. Zapliva gore!",2600);}}};}
{const _fs=fpStat;fpStat=function(){_fs.apply(this,arguments);if(WORLD==="more"||FP.bubbleT>0){const el=$("fpStat");if(el)el.hidden=true;}};}
{const _tl=tickLife;tickLife=function(dt,t,night){_tl.apply(this,arguments);if(WORLD!=="more")return;for(const g of life.birds)g.position.y+=14;for(const g of life.bf)g.visible=false;if(life.boat)life.boat.visible=false;if(life.mill)life.mill.visible=false;};}
function mgBubble(){if(!needFP())return;FP.bubbleT=60;FP.bubWarn=0;const P=FP.p;for(let i=0;i<16;i++)mgSpawn({t:"puff",x:P.x,y:P.y+1,z:P.z,vx:(Math.random()-.5)*2,vy:1+Math.random()*2,vz:(Math.random()-.5)*2,life:1.2,size:.1,size2:.25,col:[0xe8fbff,0xffffff],drag:.4,op:.8});
  sfx.chime();tone(660,.15,"sine",.02);tone(990,.2,"sine",.015,.08);toast("Čarobni mjehurić! Jednu minutu Rida diše pod vodom, brže pliva i lebdi kamo želi.",3800);}
{const _mu=mgUse;mgUse=function(k){if(k==="mjehur"){if(S.mg&&mgOwn(mgIt("gad:mjehur")))beltPush("gad:mjehur");return mgBubble();}return _mu.apply(this,arguments);};}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);mrHelmTick();
  if(S.mg&&S.mg.skin==="morska"&&FP.on&&!MCHAR[S.mg.char]&&Math.random()<dt*(Math.hypot(FP.v.x,FP.v.z)>.8?8:3)){const P=FP.p;mgSpawn({t:"puff",x:P.x+(Math.random()-.5)*.5,y:P.y+.3+Math.random()*.6,z:P.z+(Math.random()-.5)*.5,vy:.9,life:1.3,size:.08,size2:.2,col:[0xe8fbff,0xbff0ff],drag:.3,op:.7,wob:.6});}};}

/* ---------- icons ---------- */
(function(){const D=ITEM_DRAW;
  D.w_more=(x,P,hi,ol)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#5ad0f0");g.addColorStop(.3,"#1a7ac0");g.addColorStop(1,"#0a2a5a");x.fillStyle=g;x.fillRect(0,0,64,64);
    x.globalAlpha=.25;x.fillStyle="#fff";P([[10,0],[18,0],[26,64],[14,64]],"#e8fbff");P([[38,0],[44,0],[50,64],[40,64]],"#e8fbff");x.globalAlpha=1;
    P([[6,64],[6,44],[14,44],[14,64]],"#5aa898");x.fillStyle="#cff4ff";x.beginPath();x.arc(10,44,6,Math.PI,0);x.fill();P([[40,64],[40,40],[52,40],[52,64]],"#6ab8a8");x.fillStyle="#cff4ff";x.beginPath();x.arc(46,40,8,Math.PI,0);x.fill();
    P([[24,64],[24,30],[32,22],[40,30],[40,64]],"#f4f0e6");x.fillStyle="#fff8fc";x.beginPath();x.arc(32,18,4,0,7);x.fill();
    [[18,12,2],[54,20,2.5],[28,40,1.5]].forEach(a=>{x.strokeStyle="#e8fbff";x.lineWidth=1.5;x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.stroke();});};
  D.mg_trail_mjehurici=(x,P,hi,ol)=>{x.strokeStyle="#16243a";x.lineWidth=3;[[20,46,9],[40,30,7],[28,16,5],[48,52,5]].forEach(a=>{x.fillStyle="#cff4ff";x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill();x.stroke();x.fillStyle="#fff";x.beginPath();x.arc(a[0]-a[2]*.35,a[1]-a[2]*.35,a[2]*.3,0,7);x.fill();});};
  D.mg_gad_mjehur=(x,P,hi,ol)=>{x.fillStyle="#cff4ff";x.strokeStyle="#16243a";x.lineWidth=3;x.beginPath();x.arc(32,32,22,0,7);x.fill();x.stroke();x.fillStyle="#fff";x.beginPath();x.arc(24,22,6,0,7);x.fill();
    x.save();x.translate(14,14);x.scale(.56,.56);P([[20,40],[44,40],[40,52],[24,52]],"#e8772e");P([[20,40],[26,26],[32,36],[38,26],[44,40]],"#e8772e");x.restore();};})();

WDEF.more={gen:mrGen,env:mrEnv,life:mrLife,preset:"more",fog:.0026,floor:null,guide:()=>lunja,talk:mrTalk,tick:mrTick,itemMesh:mrPearl,itemCol:[0xffe0f4,0xffffff,0xbff0ff],itemBurst:[[1,.88,.96],[1,1,1],[.75,.95,1]],itemFx:"spark",
  item:{one:"Svjetleći biser",hud:"Biseri",done:"Svi biseri!",all:"Svih 10 svjetlećih bisera! Biserni hram se budi i njegova vrata se otvaraju!",first:"Bravo, prvi biser! Strelica gore pokazuje najbliži. Pod vodom pliviš kamo god želiš."},
  intro:()=>"Podvodni grad! Biseri: "+wStars("more")+" / "+WSTAR_N+". Kornjača Lunja te čeka kraj svjetionika.",
  finale:{chest:"m_hram",isl:"hram",at:{x:128,z:92},rewards:["skin:morska","trail:mjehurici","gad:mjehur"],locked:"Čarolija drži škrinju zatvorenom. Skupi svih 10 svjetlećih bisera!",
    kicker:"Podvodni grad je spašen!",title:"Blago Bisernog hrama",sub:"Morska lisica, Mjehurići i Čarobni mjehurić sad su tvoji. S mjehurićem možeš roniti i na Otoku priča!"}};
