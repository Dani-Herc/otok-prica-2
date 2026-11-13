/* =================== OP2 v7: Svjetleći zaljev (portal world of Lučki grad) =================== */
/* A crescent bay at night under a big moon. The water glows blue wherever Rida swims or rows, fireflies dance over
   the dunes, sea turtles hatch on the beach. An observatory on the west headland, a glow-worm cave in the east one,
   giant glowing jellyfish around a sea stack, a moon arch at the mouth of the bay, a lantern raft far out.
   Ten moonstones wake the little Moon temple on the hill. */
MSKIN.zaljev={n:"Svjetleća lisica",d:"Krzno joj svijetli plavo kao more u Svjetlećem zaljevu. Noću je vidiš izdaleka!",p:0,rar:"l",O:0x3ab8ff,W:0xd8f6ff,B:0x0a1a3a,D:0x7affe8,glowO:.35,fx:"kristal",wr:"Svjetleći zaljev"};
MTRAIL.plankton={n:"Svjetleći plankton",d:"Gdje Rida prođe, zasvijetli plavi sjaj kao more u zaljevu.",p:0,rar:"l",wr:"Svjetleći zaljev"};
TR.plankton=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.5,y:p.y+.15+Math.random()*.2,z:p.z+(Math.random()-.5)*.5,vy:.25,life:1.3,size:.26,size2:.03,col:[0x5ae8ff,0x7affe8,0x3a8aff],add:1,op:.95});TRATE.plankton=11;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","zaljev",MSKIN.zaljev);ins("trail","plankton",MTRAIL.plankton);}
PRESETS.zaljev={top:0x060c2a,hz:0x1c3a7a,sun:0xc8d8ff,si:1.25,hemi:.78,el:.5,az:2.0,fog:0x10204a,glow:1.3,stars:1,sh:0x2a8aaa,dp:0x06203e,exp:1.06,night:.8};

/* ---------- creatures ---------- */
MODELS.raza=function(){const B=0x2a5a9a,L=0x8ae8ff,K=0x0a1a2a,tl={name:"tail",px:0,py:.2,pz:-.4};const sp=[[.5,.14,.7,0,.2,0,B],[.4,.04,.5,0,.28,0,L]];
  for(const s of [-1,1]){sp.push([.42,.08,.5,s*.44,.2,-.04,B]);sp.push([.24,.06,.3,s*.78,.2,-.1,B]);sp.push([.12,.04,.14,s*.6,.25,0,L]);}
  sp.push([.06,.06,.02,-.12,.3,.36,K],[.06,.06,.02,.12,.3,.36,K],[.06,.06,.8,0,.2,-.76,K,tl],[.1,.04,.1,0,.22,-1.12,L,tl]);const g=mk(sp);
  g.traverse(o=>{if(o.isMesh&&o.material&&o.material.color&&o.material.color.getHex()===LC(L))o.material=std(L,{emissive:LC(0x3ab8ff),emissiveIntensity:.9});});return g;};
MODELS.rakun=function(){const G=0x8a8a92,D=0x3a3a42,L=0xe8e4dc,K=0x111111,hd={name:"head",px:0,py:.56,pz:.36},tl={name:"tail",px:0,py:.4,pz:-.38};
  const sp=[[.44,.38,.68,0,.4,0,G],[.4,.34,.34,0,.6,.44,G,hd],[.42,.1,.06,0,.64,.6,D,hd],[.16,.12,.12,0,.52,.64,L,hd],[.07,.06,.04,0,.55,.71,K,hd],[.06,.06,.02,-.1,.65,.635,0xffffff,hd],[.06,.06,.02,.1,.65,.635,0xffffff,hd],
    [.03,.03,.02,-.1,.65,.645,K,hd],[.03,.03,.02,.1,.65,.645,K,hd],[.12,.14,.08,-.14,.84,.4,D,hd],[.12,.14,.08,.14,.84,.4,D,hd],[.1,.22,.1,-.14,.12,.22,D],[.1,.22,.1,.14,.12,.22,D],[.1,.22,.1,-.14,.12,-.22,D],[.1,.22,.1,.14,.12,-.22,D]];
  for(let i=0;i<5;i++)sp.push([.18,.18,.14,0,.5+i*.02,-.46-i*.13,i%2?D:G,tl]);return mk(sp);};
MODELS.kornjacica=function(){const g=MODELS.kornjaca();g.scale.setScalar(.45);const w=new THREE.Group();w.add(g);w.userData.parts=g.userData.parts;return w;};
MODELS.zvjezdana=function(){const g=MODELS.sova(),hd=g.userData.parts.head;const h=new THREE.Mesh(new THREE.ConeGeometry(.24,.5,4),std(0x2a3a8a));h.position.set(0,.5,0);h.rotation.y=Math.PI/4;hd.add(h);
  const s=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,.02),std(0xffe060,{emissive:LC(0xffc030),emissiveIntensity:.8}));s.position.set(0,.5,.12);hd.add(s);return g;};
MODELS.kornjacica2=()=>MODELS.kornjacica();MODELS.rakun2=()=>MODELS.rakun();
pwPets("zaljev","luka",[
  {k:"raza",fav:"riba",n:"Raža Svjetlica",d:"Mala raža čija krila noću svijetle plavo. Klizi kroz vodu kao da leti.",gd:"Iz mora donosi bisere i svjetleće školjke.",gift:()=>[["biser",1],["coins",15]],spd:1.1,
   spec:{n:"Svjetlucavo plivanje",d:"Svjetlica te nosi kroz valove i pod vodu, a iza vas ostaje plavi sjaj!",ride:1,ic:"riba"},ride:{water:1,under:1,leap:1,speed:9.6,seat:.4},tip:"Svjetlica te nosi! U moru je najbrža, a može i roniti."},
  {k:"rakun",fav:"bobice",n:"Rakun Maskić",d:"Znatiželjni rakun s maskom oko očiju. Noću istražuje plažu i pere sve što nađe.",gd:"S plaže donosi školjke i izgubljene zlatnike.",gift:()=>[["bobice",3],["coins",16]],spd:1.7,
   spec:{n:"Rakunov trk",d:"Maskić juri preko pijeska i dina i skače dvaput zaredom!",ride:1,ic:"star"},ride:{land:1,speed:10.4,jump:10.5,dbl:1,seat:.66},tip:"Maskić te nosi! Juri brzo i skače dvaput zaredom."}]);
PWIT.mladunac={n:"Kornjačica",mk:g=>{const s=std(0x4a8a5a),b=std(0x7ac88a);const sh=new THREE.Mesh(new THREE.BoxGeometry(.3,.12,.34),s);sh.position.y=.06;g.add(sh);const h=new THREE.Mesh(new THREE.BoxGeometry(.12,.1,.12),b);h.position.set(0,.06,.22);g.add(h);
  for(const [x,z] of [[-.18,.1],[.18,.1],[-.16,-.12],[.16,-.12]]){const f=new THREE.Mesh(new THREE.BoxGeometry(.12,.03,.07),b);f.position.set(x,.03,z);g.add(f);}},glow:0xb0ffc0};
PWIT.skoljkas={n:"Svjetleća školjka",mk:g=>{const m=std(0xd8f6ff,{emissive:LC(0x3ab8ff),emissiveIntensity:.6});for(let i=0;i<5;i++){const r=new THREE.Mesh(new THREE.BoxGeometry(.07,.04,.3),m);r.rotation.y=(i-2)*.32;r.position.set((i-2)*.06,0,0);g.add(r);}},glow:0x9ae8ff};
function zlMoon(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(.24,16,12),new THREE.MeshStandardMaterial({color:LC(0xe8f2ff),emissive:LC(0x8ab8ff),emissiveIntensity:1,roughness:.2,metalness:.1}));g.add(m);
  const r=new THREE.Mesh(new THREE.TorusGeometry(.33,.03,6,24),new THREE.MeshBasicMaterial({color:0xbfe6ff,transparent:true,opacity:.7}));g.add(r);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x9ad8ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9}));sp.scale.set(2.4,2.4,1);g.add(sp);return g;}

/* ---------- terrain ---------- */
const ZL={c:{x:128,z:150},shore:[],fire:[],jelly:[],babies:[],baby:[],shells:[],nests:[],hatch:null,glow:[]};
function zlH(x,z){const dx=x-128,dz=z-150,d=Math.hypot(dx,dz);let h=SL-4+(fbm(x*.05,z*.05)-.5)*2;
  {const endz=sstep(176,162,z),q=sstep(30,35,d)*sstep(76,70,d)*endz;if(q>0){const t=Math.max(0,(d-35)/36);
      const dune=SL+3+8*Math.pow(Math.sin(Math.min(1,Math.max(0,(t-.1)/.55))*Math.PI),1.3)*(.55+.45*fbm(x*.08+3,z*.08+5));const plat=SL+6+2*fbm(x*.05,z*.05);
      const land=t<.08?SL+3:t<.65?dune:plat;h=Math.max(h,SL-4+(land-SL+4)*q);}}
  for(const [cx,cz,r,top] of [[76,148,15,SL+18],[180,148,15,SL+15]]){const d2=Math.hypot(x-cx,z-cz)*(1+.12*(vnoise(x*.2,z*.2,4)-.5));if(d2<r){const q=sstep(r,r-6,d2);h=Math.max(h,SL+2+(top-SL-2)*q);}}
  {const d3=Math.hypot(x-150,z-96);if(d3<9)h=Math.max(h,SL+15-d3*.9);}
  {const d4=Math.hypot(x-56,z-198);if(d4<6.5)h=Math.max(h,d4<4.5?SL+3:SL+2);}
  {const d5=Math.hypot(x-200,z-190);if(d5<6)h=Math.max(h,d5<4.2?SL+22:SL+2);}
  for(const px of [119,137]){const d6=Math.hypot(x-px,z-186);if(d6<3.4)h=Math.max(h,SL+13);}
  {const d7=Math.hypot(x-150,z-135);if(d7<9)h=Math.min(h,SL-4+d7*.4);}
  return Math.round(h);}
function zlGen(){for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,zlH(x,z));hmap[x+z*W]=h;const rock=(Math.hypot(x-76,z-148)<14&&h>SL+7)||(Math.hypot(x-180,z-148)<14&&h>SL+7)||Math.hypot(x-200,z-190)<4.5||[119,137].some(px=>Math.hypot(x-px,z-186)<3.4);
    for(let y=0;y<h;y++){let t=T.pijesak;if(rock)t=y===h-1&&hash2(x,z,3)<.5?T.mahovina:T.kamen;else if(h>SL+5&&y===h-1){const d=Math.hypot(x-128,z-150);t=d>60||h>SL+8&&d>56?T.trava:T.pijesak;}else if(y<h-4)t=T.pjescenjak;vox[I(x,y,z)]=t;}}
  const Y=(x,z)=>hmap[x+z*W];const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)mask[(x+dx)+(z+dz)*W]=2;};
  /* the arch between the two pillars at the mouth of the bay */
  for(let x=119;x<=137;x++){const t=(x-119)/18,y=Math.round(SL+13+Math.sin(t*Math.PI)*3);for(let w=-1;w<=1;w++){wput(x,y,186+w,T.kamen,1);wput(x,y-1,186+w,T.kamen,1);if(hash2(x,w,4)<.4)wput(x,y+1,186+w,T.mahovina,1);}}
  wStar("luk",128.5,SL+18.2,186.5,"Na vrhu Mjesečevih vrata, kamenog luka na ulazu u zaljev. Školjka-katapult na plaži te baca gore!");POI.push({k:"z_luk",n:"Mjesečeva vrata",x:128,z:186,r:12});
  /* the giant clam catapult on the beach */
  {const x=128,z=114,y=Y(x,z);wput(x,y-1,z,T.zlato,1);ZL.clam={x:x+.5,y,z:z+.5};pwLaunch({k:"luk",x:x+.5,y,z:z+.5,to:[128.5,0,186.5],h:12,dur:2.8,col:[0x7ae8ff,0xffffff],msg:"Školjka se zatvorila i PLJUS! Letiš prema Mjesečevim vratima!"});busy(x,z,3);}
  /* ----- the Moon temple on the hill (finale) ----- */
  {const cx=128,cz=86,g=Y(cx,cz);for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++){const x=cx+dx,z=cz+dz,d=Math.hypot(dx,dz);if(d>7.4)continue;for(let y=g;y<H;y++)vox[I(x,y,z)]=0;for(let y=Y(x,z);y<g;y++)vox[I(x,y,z)]=T.pjescenjak;vox[I(x,g-1,z)]=d<5.5?T.kvarc:T.upjescenjak;hmap[x+z*W]=g;}
    for(let a=0;a<8;a++){const an=a*Math.PI/4,x=Math.round(cx+Math.cos(an)*5),z=Math.round(cz+Math.sin(an)*5);for(let y=g;y<g+5;y++)wput(x,y,z,T.kvarc,1);wput(x,g+5,z,T.prizmarin,1);}
    for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const d=Math.hypot(dx,dz);if(d<=5.4&&d>=3.6)wput(cx+dx,g+6,cz+dz,T.prizcigla,1);if(d<3.6)wput(cx+dx,g+7,cz+dz,T.prizmarin,1);}wput(cx,g+8,cz,T.kristal,1);
    for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){if(dx===0&&dz===0)continue;for(let y=g;y<g+3;y++){wput(cx+dx,y,cz+dz,T.kristal,1);WG.gate.push([cx+dx,y,cz+dz]);}}
    for(let y=g+1;y<g+3;y++){wput(cx,y,cz-1,T.kristal,1);}
    WG.isl.hram={x:cx,z:cz,y:g,r:6};addChest("z_blago",cx,g,cz,"Blago Mjesečevog hrama");POI.push({k:"z_hram",n:"Mjesečev hram",x:cx,z:cz,r:9});busy(cx,cz,8);ZL.temple={x:cx+.5,y:g,z:cz+.5};}
  /* ----- the observatory on the west headland ----- */
  {const cx=76,cz=146,g=Y(cx,cz);for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++){const x=cx+dx,z=cz+dz;if(Math.hypot(dx,dz)>7.4)continue;for(let y=g;y<H;y++)vox[I(x,y,z)]=0;for(let y=Y(x,z);y<g;y++)vox[I(x,y,z)]=T.kamen;vox[I(x,g-1,z)]=T.kaldrma;hmap[x+z*W]=g;}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const d=Math.hypot(dx,dz);if(d>4.4)continue;for(let y=g;y<g+4;y++)if(d>3.4&&!(dz===4&&dx>=-1&&dx<=1&&y<g+3))wput(cx+dx,y,cz+dz,T.bijela,1);
      for(let k=0;k<4;k++){if(d<=4.4-k&&d>3.4-k&&!(dx===0&&k>0&&dz<0))wput(cx+dx,g+4+k,cz+dz,k===3?T.bijela:T.kvarc,1);}}
    for(let k=0;k<4;k++)wput(cx,g+4+k,cz-4+k,0,1);
    const L=[["vuna_t",523],["vuna_lj",659],["vuna_ts",784],["vuna_z",988]],PP=[[-2,-1],[2,-1],[-2,2],[2,2]],ORD=[3,0,2,1];
    const pads=PP.map(([a,b],i)=>{vox[I(cx+a,g-1,cz+b)]=T[L[i][0]];prot[I(cx+a,g-1,cz+b)]=1;return {x:cx+a,y:g-1,z:cz+b,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    ORD.forEach((j,i)=>wput(cx-4+(i>1?1:0)*0,g+3-i,cz+1,T[L[j][0]],1));
    pwSeq("zvjezdarnica",{pads,order:ORD,win:"Teleskop se okrenuo prema pravom zviježđu! Ormarić sove zvjezdoznanke se otvorio.",wrong:"Hm, to nije to zviježđe. Pogledaj zvjezdanu kartu na zidu, odozgo prema dolje, i kreni ispočetka."});
    for(let a=-1;a<=1;a++)for(let h=0;h<=2;h++)for(let b=0;b<=1;b++){if(a===0&&h<2&&b===0)continue;pwCell("zvjezdarnica",cx+a,g+h,cz-3+b,h===2?T.vuna_t:T.bijela);}
    wStar("zvjezdarnica",cx+.5,g+.9,cz-2.5,"U zvjezdarnici na zapadnom rtu. Stani na ploče redom kao na zvjezdanoj karti!");ZL.scope={x:cx+.5,y:g,z:cz+.5};
    /* a winding path down to the beach */
    for(let t=0;t<=1;t+=.01){const x=Math.round(cx+5+t*22),z=Math.round(cz+4-Math.sin(t*Math.PI)*6+t*-14);for(const w of [0,1]){const X=x,Z=z+w,yy=Y(X,Z)-1;if(vox[I(X,yy,Z)]===T.trava||vox[I(X,yy,Z)]===T.mahovina||vox[I(X,yy,Z)]===T.kamen)vox[I(X,yy,Z)]=T.staza;}}
    busy(cx,cz,8);POI.push({k:"z_zvjezd",n:"Zvjezdarnica",x:cx,z:cz,r:9});}
  /* ----- glow-worm cave in the east headland ----- */
  {const cx=180,cz=148;const ent=[166,140];for(let t=0;t<=1;t+=.02){const x=Math.round(ent[0]+(cx-ent[0])*t),z=Math.round(ent[1]+(cz-ent[1])*t),y0=SL+3+Math.round(t*1);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let y=y0;y<=y0+2;y++)vox[I(x+a,y,z+b)]=0;}
    for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++)for(let y=SL+3;y<=SL+10;y++){const e=(dx*dx+dz*dz)/36+Math.pow((y-SL-5)/5,2);if(e<1)vox[I(cx+dx,y,cz+dz)]=0;}
    for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const x=cx+dx,z=cz+dz;if(!vox[I(x,SL+3,z)]&&vox[I(x,SL+2,z)])vox[I(x,SL+2,z)]=hash2(x,z,8)<.3?T.mahovina:T.sljunak;
      for(let y=SL+10;y>=SL+5;y--){if(vox[I(x,y,z)]&&!vox[I(x,y-1,z)]){ZL.glow.push([x+.5,y-.2,z+.5]);if(hash2(x,z,9)<.12)vox[I(x,y,z)]=T.svjetlo;break;}}}
    for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)vox[I(cx+dx,SL+2,cz+dz)]=T.kamen;vox[I(cx,SL+3,cz)]=T.kamen;
    wStar("spilja",cx+.5,SL+4.9,cz+.5,"U špilji svjetlećih crvića na istočnom rtu. Ulaz je s plaže.");addChest("z_spilja",cx+3,SL+3,cz+2,"Škrinja u špilji");
    busy(cx,cz,8);POI.push({k:"z_spilja",n:"Špilja svjetlećih crvića",x:cx,z:cz,r:9});}
  /* ----- the tall dune ----- */
  {const x=150,z=96;wStar("dina",x+.5,Y(x,z)+1.2,z+.5,"Na vrhu Velike dine. Penji se po pijesku!");addChest("z_dina",x-2,Y(x-2,z+1),z+1,"Škrinja na dini");POI.push({k:"z_dina",n:"Velika dina",x,z,r:8});}
  /* ----- the glowing cove: a deep pool in the bay full of glowing coral ----- */
  {const cx=150,cz=135;for(let dz=-8;dz<=8;dz++)for(let dx=-8;dx<=8;dx++){const x=cx+dx,z=cz+dz,h=Y(x,z);if(Math.hypot(dx,dz)>8.5)continue;if(hash2(x,z,21)<.22)wput(x,h,z,[T.koralj_p,T.koralj_l,T.prizmarin][Math.floor(hash2(x,z,22)*3)],1);else if(hash2(x,z,23)<.06)wput(x,h,z,T.svjetlo,1);}
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)wput(cx+a,Y(cx,cz),cz+b,T.prizmarin,1);wStar("sjaj",cx+.5,Y(cx,cz)+2.2,cz+.5,"Na dnu svjetleće uvale u zaljevu, među plavim koraljima. Zaroni!");POI.push({k:"z_sjaj",n:"Svjetleća uvala",x:cx,z:cz,r:9});}
  /* ----- turtle nests and the hatchery ----- */
  {const nests=[[108,120],[118,116],[140,117],[100,128]];for(const [x,z] of nests){const y=Y(x,z)-1;for(const [a,b] of [[0,0],[1,0],[0,1],[-1,0],[0,-1]])if(a||b)wput(x+a,y+1,z+b,T.sljunak,1);ZL.nests.push([x+.5,y+1,z+.5]);}
    const hx=114,hz=104,hy=Y(hx,hz)-1;pwHut(hx,hz,hy,{w:2,d:2,roof:T.sijeno,wall:T.bdaske});for(let h=1;h<=3;h++)pwCell("kornjace",hx,hy+h,hz+2,T.bdaske);
    wStar("kornjace",hx+.5,hy+1.6,hz+.5,"U kućici za kornjače. Pomozi baki Mirti skupiti izgubljene kornjačice!");busy(hx,hz,4);ZL.hatch={x:hx+.5,z:hz+3.5};POI.push({k:"z_gnijezda",n:"Kornjačja gnijezda",x:114,z:116,r:12});}
  ZL.baby=[[96,104],[134,100],[160,108],[92,116],[146,92]].map(([x,z])=>[x+.5,Y(x,z)+.9,z+.5]);
  ZL.shells=[[104,120],[152,122],[88,134],[168,132]].map(([x,z])=>[x+.5,Y(x,z)+.9,z+.5]);
  /* ----- firefly run over the dunes ----- */
  {const pts=[[118,108],[108,100],[98,94],[104,84],[118,80],[138,80],[152,84],[160,96],[154,108]].map(([x,z])=>[x+.5,Y(x,z)+1.4,z+.5]);
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){const x=164+a,z=114+b,y=Y(164,114);if(a===0&&b===0&&h<2)continue;pwCell("krijesnice",x,y+h,z,h===2?T.lisce:T.drvo);}
    wStar("krijesnice",164.5,Y(164,114)+.9,114.5,"U šupljem panju kraj dina. Otvara se kad uhvatiš sve krijesnice! Start je kraj kornjačjih gnijezda.");
    pwRings("krijesnice",{start:[124.5,Y(124,110),110.5],pts,time:55,col:0xd8ff6a,name:"Ples krijesnica",win:"Uhvatila si sve krijesnice! Šuplji panj kraj dina se otvorio."});
    ZL.fire=pts.map(p=>[p[0],p[1],p[2]]);}
  /* ----- jellyfish stack with an updraft ----- */
  {const x=200,z=190;for(let a=-6;a<=-4;a++)for(let b=-1;b<=1;b++){for(let y=1;y<=SL+2;y++)vox[I(x+a,y,z+b)]=y===SL+2?T.mahovina:T.kamen;hmap[(x+a)+(z+b)*W]=SL+3;}WG.wind.push({x:x-4.5,z:z+.5,r:1.3,y0:SL+3,y1:SL+25,k:"meduze"});wStar("meduze",x+.5,SL+23,z+.5,"Na vrhu Hridi meduza. Div-meduza te diže strujom zraka uz hrid!");addChest("z_meduze",x+1,SL+22,z-1,"Škrinja na hridi");
    POI.push({k:"z_meduze",n:"Hrid meduza",x,z,r:10});}
  /* ----- coconut islet with buried treasure ----- */
  {const x=56,z=198,y=SL+2;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("kokos",x+a,y,z+b,(a===b||a===-b)?T.crvena:T.pijesak);pwCell("kokos",x+a,y-1,z+b,T.pijesak);}
    wStar("kokos",x+.5,y-.4,z+.5,"Zakopano pod crvenim X-om na Kokosovu otočiću. Kopaj!");pwDig("kokos",x,y,z,"Kopaš, kopaš... i eno ga! Mjesečev kamen svijetli u pijesku!");
    pwPalm(x-3,z+2,{});pwPalm(x+3,z-2,{});addChest("z_kokos",x+2,SL+3,z+2,"Škrinja na otočiću");POI.push({k:"z_kokos",n:"Kokosov otočić",x,z,r:7});}
  /* ----- the lantern raft ----- */
  {const x=128,z=216;for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)wput(x+a,SL+2,z+b,(a+b)&1?T.bdaske:T.daske,1);for(const [a,b] of [[-3,-3],[3,-3],[-3,3],[3,3]]){wput(x+a,SL+3,z+b,T.drvo,1);wput(x+a,SL+4,z+b,T.lampion,1);}
    wStar("splav",x+.5,SL+3.9,z+.5,"Na splavi s lampionima daleko izvan zaljeva. Plivaj ili veslaj!");addChest("z_splav",x-1,SL+3,z+1,"Škrinja na splavi");POI.push({k:"z_splav",n:"Splav s lampionima",x,z,r:6});}
  /* palms along the back of the beach, beach grass on the dunes */
  for(const [x,z] of [[96,112],[104,104],[142,104],[156,112],[90,124],[166,124],[124,98],[132,96]]){if(Y(x,z)>SL+3)pwPalm(x,z,{});}
  for(let z=60;z<175;z++)for(let x=60;x<200;x++){if(mask[x+z*W])continue;const h=Y(x,z);if(h>SL+4&&vox[I(x,h-1,z)]===T.pijesak&&hash2(x,z,31)<.05)wput(x,h,z,T.lisce_b);}
  /* the portal on the eastern beach */
  {const x=150,z=116;for(let dz=-6;dz<=8;dz++)for(let dx=-5;dx<=5;dx++){const X=x+dx,Z=z+dz;if(mask[X+Z*W])continue;for(let y=SL+3;y<H;y++)vox[I(X,y,Z)]=0;for(let y=1;y<SL+3;y++)if(!vox[I(X,y,Z)])vox[I(X,y,Z)]=T.pijesak;hmap[X+Z*W]=SL+3;}
    const g=SL+2;wPortalArch(x,g,z);WG.portal={x:x+.5,y:g+1,z:z+.5,ry:0};WG.spawn={x:x+.5,y:SL+3,z:z+6.5,cam:Math.PI};busy(x,z,5);}
  Object.assign(LOOT,{z_dina:{coins:45,mats:{kremen:2},blocks:{pijesak:16,pjescenjak:8},msg:"Pijesak s Velike dine. Sagradi pješčani dvorac!"},
    z_spilja:{coins:65,mats:{smaragd:1,biser:1},blocks:{svjetlo:4,mahovina:8},msg:"Svjetleći crvići čuvali su ovo blago."},
    z_meduze:{coins:55,mats:{biser:2},blocks:{prizmarin:8},msg:"Meduze su na hridi sakrile bisere."},
    z_kokos:{coins:45,mats:{grumen:1},blocks:{pijesak:10},msg:"Gusari su davno ovdje ostavili zlatni grumen."},
    z_splav:{coins:50,mats:{biser:1},blocks:{lampion:4,daske:8},msg:"Lampioni sa splavi, da i tvoj otok noću svijetli."},
    z_blago:{coins:320,mats:{dijamant:2,biser:4,smaragd:1},blocks:{prizmarin:10,prizcigla:10,kristal:2,svjetlo:4},msg:"Blago Mjesečevog hrama! Svijetli kao sam zaljev."}});}

/* ---------- life ---------- */
function zlLife(){S.wq=S.wq||{};
  PW.guide=pwPut("starakornjaca","Baka Mirta",ZL.hatch.x+2,ZL.hatch.z+1,{frozen:true,ry:Math.PI*.8,sc:1.1});
  pwPut("zvjezdana","Sova Zvjezdana",ZL.scope.x+2,ZL.scope.z+2,{frozen:true,ry:Math.PI});
  [["Klik",112.5,126.5],["Klak",146.5,126.5],["Pustinjak",96.5,132.5],["Kliješta",132.5,120.5]].forEach(([n,x,z])=>pwPut("rak",n,x,z,{speed:.5}));
  [["Brzi",134.5,124.5],["Mali",104.5,126.5],["Zelenko",120.5,124.5]].forEach(([n,x,z])=>{const e=pwPut("kornjacica2",n,x,z,{speed:.4});ZL.babies.push(e);});
  [["Noćko",158.5,100.5]].forEach(([n,x,z])=>pwPut("rakun2",n,x,z,{speed:.7}));
  [["Val",128.5,160.5],["Sjaj",112.5,170.5]].forEach(([n,x,z])=>{const e=spawn("dupin",n,{swim:true,speed:2,near:{x,z}});e.home={x,z};});
  const sv=pwPut("raza",PETS.raza.n,134.5,142.5,{swim:true,speed:1.2});const mk=pwPut("rakun",PETS.rakun.n,100.5,110.5,{speed:.8});
  pwQuest("raza",{pet:1,en:sv,auto:1,need:4,item:"skoljkas",spots:ZL.shells,got:"Svjetleća školjka",
    ask:"Bok! Ja sam Svjetlica. Moje svjetleće školjke more je izbacilo na plažu, a bez njih ne mogu zaspati. Doneseš mi četiri? Onda te vodim kroz svjetleće valove!",
    done:"Moje školjke! Hvala ti. Sad smo prijateljice, skoči mi na leđa!",fact:"Raže dišu kroz male rupice na leđima, pa mogu ležati zakopane u pijesku."});
  pwQuest("rakun",{pet:1,en:mk,auto:1,need:3,item:"skoljka",spots:ZL.nests.slice(0,3).map(([x,y,z])=>[x+1.6,y+.4,z]),got:"Školjka za Maskića",
    ask:"Psst, bok! Ja sam Maskić. Volim prati školjke u moru, a kraj kornjačjih gnijezda ima najljepših. Doneseš mi tri? Ali nježno, ne smetaj kornjačicama!",
    done:"Joj, kako sjaje kad ih operem! Hoćeš juriti sa mnom po dinama?",fact:"Rakuni imaju vrlo osjetljive prednje šape. Prije jela često drže hranu u vodi i opipavaju je."});
  pwQuest("kornjace",{en:PW.guide,need:5,item:"mladunac",spots:ZL.baby,got:"Kornjačica",cage:"kornjace",
    ask:"Dobra večer, dušo. Ja sam baka Mirta. Noćas se legu male kornjače, a pet ih je krenulo krivo, prema dinama umjesto prema moru! Pronađeš ih i doneseš meni? Onda ih zajedno pustimo u more.",
    done:"Svih pet! Gledaj kako jure prema moru, pa-pa, mališani! U mojoj kućici čeka te dar.",thanks:"Kornjačice su sretno stigle u more. Hvala ti!",remind:"Kornjačice svjetlucaju među dinama.",
    after:()=>{ZL.run=0;}});}
function zlEnv(){/* glowing plankton patches on the water near the shore, jellyfish, fireflies, the moon */
  const pm=new THREE.SpriteMaterial({map:GLOW,color:0x3ae0ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.5,fog:false});
  for(let i=0;i<120;i++){const a=Math.PI*(-.05+Math.random()*1.1),r=29+Math.random()*7,x=128+Math.cos(a)*r,z=150-Math.sin(a)*r;if(get(Math.floor(x),Math.floor(WATER),Math.floor(z)))continue;
    const s=new THREE.Sprite(pm.clone());s.position.set(x,WATER+.06,z);const k=.8+Math.random()*1.6;s.scale.set(k,k,1);scene.add(s);ZL.shore.push({s,ph:Math.random()*7,k});}
  const jm=new THREE.MeshStandardMaterial({color:LC(0xd8a8ff),emissive:LC(0xb070ff),emissiveIntensity:.7,transparent:true,opacity:.6,roughness:.2});const tm=new THREE.MeshBasicMaterial({color:0xe0c0ff,transparent:true,opacity:.5});
  const mkJ=(x,z,sc)=>{const g=new THREE.Group();const d=new THREE.Mesh(new THREE.SphereGeometry(1,16,10,0,Math.PI*2,0,Math.PI/2),jm);d.scale.set(1,.7,1);g.add(d);for(let i=0;i<8;i++){const t=new THREE.Mesh(new THREE.BoxGeometry(.06,1.6,.06),tm);t.position.set(Math.cos(i*.8)*.6,-.8,Math.sin(i*.8)*.6);g.add(t);}
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xc090ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.6}));sp.scale.set(4,4,1);g.add(sp);g.scale.setScalar(sc);g.position.set(x,WATER+.3,z);scene.add(g);ZL.jelly.push({g,x,z,ph:Math.random()*7,sc});return g;};
  {const gm=new THREE.SpriteMaterial({map:GLOW,color:0x7affd8,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9,fog:false});ZL.gw=[];
    for(const [x,y,z] of ZL.glow)for(let i=0;i<3;i++){const s=new THREE.Sprite(gm.clone());const k=.18+Math.random()*.22;s.scale.set(k,k,1);s.position.set(x+(Math.random()-.5)*.9,y-Math.random()*.25,z+(Math.random()-.5)*.9);scene.add(s);ZL.gw.push({s,ph:Math.random()*7});}}
  mkJ(195.5,190.5,1.8);ZL.jelly[0].big=1;for(const [x,z,s] of [[188,198,1],[208,182,1.2],[210,200,.9],[186,180,.8],[170,200,.7]])mkJ(x,z,s);
  {const ff=new THREE.SpriteMaterial({map:GLOW,color:0xd8ff6a,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9,fog:false});ZL.ff=[];
    for(let i=0;i<90;i++){const a=Math.PI*(1.1+Math.random()*.8),r=44+Math.random()*20,x=128+Math.cos(a)*r,z=150-Math.abs(Math.sin(a))*r;const s=new THREE.Sprite(ff);s.scale.set(.35,.35,1);const y=floorY(x,H-1,z)+1+Math.random()*2.5;s.position.set(x,y,z);scene.add(s);ZL.ff.push({s,x,y,z,ph:Math.random()*7});}}
  {const m=new THREE.Mesh(new THREE.CircleGeometry(16,40),new THREE.MeshBasicMaterial({color:0xf2f6ff,fog:false}));m.position.set(128,95,330);m.lookAt(128,40,128);scene.add(m);
    const h=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x9ab8ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.55,fog:false}));h.scale.set(110,110,1);h.position.set(128,95,328);scene.add(h);
    const path=new THREE.Mesh(new THREE.PlaneGeometry(10,150),new THREE.MeshBasicMaterial({color:0xbfd8ff,transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));path.rotation.x=-Math.PI/2;path.position.set(128,WATER+.05,250);scene.add(path);}
  {const t=new THREE.Group(),m=std(0x8a8a9a,{metalness:.6,roughness:.3});const b=new THREE.Mesh(new THREE.CylinderGeometry(.35,.5,3,12),m);b.rotation.x=-.8;b.position.y=1.6;t.add(b);const l=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,1.4,6),std(0x3a3a42));l.position.y=.6;t.add(l);
    t.position.set(ZL.scope.x,ZL.scope.y,ZL.scope.z+.4);scene.add(t);ZL.scopeM=b;}
  {const c=new THREE.Group(),sm=std(0xe8d8f8,{emissive:LC(0x8a6ad8),emissiveIntensity:.3});for(const s of [1,-1]){const h=new THREE.Mesh(new THREE.SphereGeometry(1.1,14,8,0,Math.PI*2,0,Math.PI/2),sm);h.scale.set(1,.45,1);if(s<0){h.rotation.x=Math.PI;}h.position.y=s>0?.25:.2;c.add(h);if(s>0)ZL.lid=h;}
    const p=new THREE.Mesh(new THREE.SphereGeometry(.3,12,10),new THREE.MeshStandardMaterial({color:LC(0xffffff),emissive:LC(0x9ad8ff),emissiveIntensity:.8}));p.position.y=.3;c.add(p);c.position.set(ZL.clam.x,ZL.clam.y-.05,ZL.clam.z);scene.add(c);}}
function zlTick(dt,tt){const P=FP.p;
  for(const o of ZL.shore){const v=.5+.5*Math.sin(tt*1.3+o.ph);o.s.material.opacity=.15+.45*v;}
  for(const j of ZL.jelly){const b=Math.sin(tt*1.2+j.ph);j.g.position.y=(j.big?SL+8:WATER+.3)+b*.25;j.g.scale.set(j.sc*(1+b*.06),j.sc*(1-b*.08),j.sc*(1+b*.06));}
  if(ZL.ff)for(const f of ZL.ff){f.s.position.set(f.x+Math.sin(tt*.7+f.ph)*.8,f.y+Math.sin(tt*1.1+f.ph*2)*.4,f.z+Math.cos(tt*.6+f.ph)*.8);f.s.material.opacity=.5+.5*Math.sin(tt*3+f.ph*5);}
  if(ZL.gw)for(const o of ZL.gw)o.s.material.opacity=.45+.45*Math.sin(tt*1.7+o.ph);
  if(ZL.lid)ZL.lid.rotation.x=-.5-Math.sin(tt*1.4)*.12;if(ZL.scopeM)ZL.scopeM.parent.rotation.y=Math.sin(tt*.2)*.6;
  /* the water glows where Rida moves through it */
  if(FP.on&&(FP.swim||FP.boat||FP.mount)&&P.y<WATER+1.4&&P.y>WATER-2.5){const sp=Math.hypot(FP.v.x,FP.v.z);if(Math.random()<dt*(6+sp*10))for(let i=0;i<2;i++)mgSpawn({t:"spark",x:P.x+(Math.random()-.5)*1.4,y:WATER+.08,z:P.z+(Math.random()-.5)*1.4,vy:.15,life:1.4,size:.32,size2:.04,col:[0x3ae0ff,0x7affe8,0x3a8aff],add:1,op:.95});}
  if(Math.random()<dt*3){const o=ZL.shore[Math.floor(Math.random()*ZL.shore.length)];if(o)mgSpawn({t:"spark",x:o.s.position.x+(Math.random()-.5)*2,y:WATER+.1,z:o.s.position.z+(Math.random()-.5)*2,vy:.1,life:1.6,size:.3,size2:.04,col:[0x3ae0ff,0x7affe8],add:1,op:.9});}
  /* baby turtles from the hatchery run to the sea once the quest is done */
  if(pwDone("kornjace")&&ZL.run!=null&&ZL.run<1){ZL.run+=dt/9;if(!ZL.runE){ZL.runE=[];for(let i=0;i<8;i++){const g=MODELS.kornjacica();scene.add(g);ZL.runE.push({g,ox:(i-3.5)*1.2,d:Math.random()*.15});}}
    for(const r of ZL.runE){const t=Math.min(1,Math.max(0,(ZL.run-r.d)/(1-r.d)));const x=114.5+r.ox,z=ZL.hatch.z+t*(132-ZL.hatch.z);r.g.position.set(x,floorY(x,H-1,z)+1,z);r.g.rotation.y=0;r.g.visible=t<.98;}
    if(ZL.run>=1){for(const r of ZL.runE)scene.remove(r.g);ZL.runE=null;ZL.run=null;}}
  if(!FP.on)return;
  if(Math.hypot(P.x-ZL.clam.x,P.z-ZL.clam.z)<5)tipOnce("z_skoljka","Div-školjka! Stani na zlatni biser u njoj i ona te baci na Mjesečeva vrata.",4600);
  if(Math.hypot(P.x-76,P.z-146)<8)tipOnce("z_zvjezd","Zvjezdarnica! Zvjezdana karta na zidu pokazuje redoslijed ploča.",4400);
  if(Math.hypot(P.x-170,P.z-142)<5)tipOnce("z_spilja","Špilja svjetlećih crvića! Strop svijetli kao noćno nebo.",4200);
  if(Math.hypot(P.x-195,P.z-190)<8)tipOnce("z_meduze","Div-meduza! Popni se na kamenčić ispod nje, sa zapadne strane hridi, i struja te digne na vrh.",4600);}
function zlTalk(){const n=wStars("zaljev");const need=["raza","rakun"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.zaljev&&S.wst.zaljev[s.k]));
  const L=n>=WSTAR_N?"Mjesečev hram se otvorio! Takvu noć ovaj zaljev nije vidio sto godina. Uđi, dušo, blago je tvoje.":
    n===0?"Dobra večer, dušo. Ja sam baka Mirta i ovdje čuvam kornjačja gnijezda. Ovo je Svjetleći zaljev: noću more svijetli plavo! Na brdu je Mjesečev hram, a otvara ga deset mjesečevih kamenova koji su se rasuli po zaljevu. Pronađi ih, a usput pazi na moje mališane.":
    "Imaš "+n+" od "+WSTAR_N+" mjesečevih kamenova. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" Na plaži ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_zaljev=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#060c2a");g.addColorStop(1,"#1c3a7a");x.fillStyle=g;x.fillRect(0,0,64,64);x.fillStyle="#f2f6ff";x.beginPath();x.arc(46,16,8,0,7);x.fill();
    x.fillStyle="#0a3a6a";x.fillRect(0,40,64,24);x.fillStyle="#3ae0ff";for(let i=0;i<14;i++){x.globalAlpha=.4+(i%3)*.2;x.fillRect((i*19)%60,44+(i*7)%16,4,2);}x.globalAlpha=1;P([[0,44],[20,36],[40,40],[64,34],[64,44]],"#c8b890");x.fillStyle="#d8ff6a";for(const [a,b] of [[10,30],[24,26],[34,32]])x.fillRect(a,b,2,2);};
  D.mg_trail_plankton=(x)=>{for(let i=0;i<26;i++){x.fillStyle=["#3ae0ff","#7affe8","#3a8aff"][i%3];x.globalAlpha=.5+.5*((i*7)%5)/5;x.beginPath();x.arc(8+(i*37)%50,8+(i*23)%50,2+(i%3),0,7);x.fill();}x.globalAlpha=1;};})();

pwWorld("zaljev",{dist:"luka",lv:8,n:"Svjetleći zaljev",d:"Noćna plaža na kojoj more svijetli plavim sjajem: kornjačice se legu, krijesnice plešu nad dinama, a div-meduze svijetle oko hridi.",
  feat:["Baka Mirta","Raža Svjetlica","Rakun Maskić","svjetleće more","ples krijesnica","div-školjka"],fr:["prizmarin","prizcigla","kristal"],ca:0x7affe8,cb:0x1a4ab8,sea:1,fog:.0034,
  preset:PRESETS.zaljev,
  gen:zlGen,env:zlEnv,life:zlLife,talk:zlTalk,tick:zlTick,itemMesh:zlMoon,itemCol:[0x9ad8ff,0xffffff,0x7affe8],itemBurst:[[.6,.85,1],[1,1,1],[.5,1,.9]],itemFx:"star",
  item:{one:"Mjesečev kamen",hud:"Mjesečevi kamenovi",done:"Svi mjesečevi kamenovi!",all:"Svih 10 mjesečevih kamenova! Kristalna vrata Mjesečevog hrama na brdu su se otvorila!",first:"Prvi mjesečev kamen! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Svjetleći zaljev! Mjesečevi kamenovi: "+wStars("zaljev")+" / "+WSTAR_N+". Baka Mirta te čeka kraj kornjačjih gnijezda.",
  facts:{luk:"Kameni lukovi u moru nastaju kad valovi tisućama godina dube stijenu sa dvije strane, dok se u sredini ne spoje.",
    zvjezdarnica:"Zviježđa su skupine zvijezda koje su ljudi povezali u slike. Mornari su se po njima noću snalazili na moru.",
    spilja:"Svjetleći crvići žive na stropu špilja i svijetle da bi namamili sitne mušice. Strop tada izgleda kao zvjezdano nebo.",
    dina:"Dine su brežuljci od pijeska koje gradi vjetar. Polako putuju, ponekad i nekoliko metara na godinu.",
    sjaj:"More svijetli zbog sićušnih bića, planktona. Kad ih nešto zaljulja, zasvijetle plavo, kao male lampice.",
    kornjace:"Morske kornjače izlegu se noću i odmah jure prema moru. Snalaze se po svjetlu mjeseca na vodi.",
    krijesnice:"Krijesnice svijetle stražnjim dijelom tijela. Svjetlom dozivaju jedna drugu, svaka vrsta svojim ritmom.",
    meduze:"Meduze nemaju ni mozak ni srce, a žive na Zemlji duže od dinosaura. Neke svijetle u mraku.",
    kokos:"Kokosov orah može plutati morem mjesecima. Kad ga valovi izbace na obalu, iz njega može izrasti nova palma.",
    splav:"Ribari su nekad noću palili lampione na brodicama da bi ribe doplivale prema svjetlu."},
  chat:{"Sova Zvjezdana":["Huu! Vidiš li ono zviježđe? Zove se Veliki medvjed.","Zvjezdana karta na zidu pokazuje kojim redom staješ na ploče: odozgo prema dolje."],
    rak:["Klik-klak! Noću je plaža najljepša.","Pazi, ne zgazi kornjačice!"],kornjacica2:["Mora! Moram do mora!","Je li ono mjesec ili velika svjetiljka?"],rakun2:["Psst, imaš li nešto sjajno?"],dupin:["Iii-iii! Pliva se kroz svjetlo!"]},
  finale:{chest:"z_blago",isl:"hram",at:{x:128,z:86},rewards:["skin:zaljev","trail:plankton"],locked:"Kristalna vrata Mjesečevog hrama su zatvorena. Skupi svih 10 mjesečevih kamenova!",
    kicker:"Zaljev svijetli za tebe!",title:"Blago Mjesečevog hrama",sub:"Svjetleća lisica i Svjetleći plankton sad su tvoji. Baka Mirta kaže da će kornjačice zauvijek pamtiti tvoje ime!"}});
