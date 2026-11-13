/* =================== OP2 v5: Otok svjetionika (portal world of Lučki grad) =================== */
/* A rocky island at sunset. The old lighthouse went dark: ten pearls of light are scattered over the island and the
   sea. A fishing village with a harbour and signal lamps, tide pools, a sea cave with a blowhole, seal rocks,
   a gull islet with bounce pads, a bell buoy, a boat regatta. With all ten pearls the lamp lights up again. */
MSKIN.kabanica={n:"Lisica u kabanici",d:"Žuta kišna kabanica i plave čizme. Ni oluja je ne može zaustaviti!",p:0,rar:"l",O:0xffc93a,W:0xfff6d8,B:0x1e2a44,D:0x2a5a9a,glowO:.08,fx:"kristal",wr:"Otok svjetionika"};
MTRAIL.svjetionik={n:"Zrake svjetionika",d:"Iza Ride trepere tople zrake svjetla, kao s vrha svjetionika.",p:0,rar:"l",wr:"Otok svjetionika"};
TR.svjetionik=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.3,y:p.y+.3+Math.random()*.4,z:p.z+(Math.random()-.5)*.3,vy:.9,life:1.1,size:.34,size2:.04,col:[0xfff0a0,0xffd060,0xffffff],add:1,op:.9});TRATE.svjetionik=9;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","kabanica",MSKIN.kabanica);ins("trail","svjetionik",MTRAIL.svjetionik);}

/* ---------- creatures ---------- */
MODELS.morz=function(){const B=0x8a5a44,L=0xc8a080,D=0x6a4232,K=0x1a1410,Wt=0xf6f0e0,hd={name:"head",px:0,py:.82,pz:.5},tl={name:"tail",px:0,py:.2,pz:-.6};
  return mk([[.9,.66,1.2,0,.4,0,B],[.8,.3,.5,0,.8,.32,B],[.6,.5,.5,0,.95,.6,B,hd],[.52,.24,.2,0,.8,.88,L,hd],[.14,.08,.06,0,.9,.99,K,hd],[.07,.07,.02,-.16,1.08,.855,K,hd],[.07,.07,.02,.16,1.08,.855,K,hd],
    [.06,.32,.06,-.13,.6,.93,Wt,hd],[.06,.32,.06,.13,.6,.93,Wt,hd],[.04,.02,.04,-.3,.86,.9,Wt,hd],[.04,.02,.04,.3,.86,.9,Wt,hd],
    [.32,.08,.34,-.5,.08,.42,D],[.32,.08,.34,.5,.08,.42,D],[.56,.08,.3,0,.08,-.72,D,tl]]);};
MODELS.tuljan=function(){const G=0x8a96a2,L=0xc8d0d8,D=0x5a6672,K=0x111418,hd={name:"head",px:0,py:.48,pz:.48},tl={name:"tail",px:0,py:.18,pz:-.5};
  return mk([[.46,.38,1.0,0,.26,0,G],[.12,.06,.12,-.12,.46,-.1,D],[.1,.06,.1,.14,.46,.18,D],[.38,.34,.36,0,.5,.6,G,hd],[.24,.14,.1,0,.44,.8,L,hd],[.09,.1,.02,-.1,.57,.785,K,hd],[.09,.1,.02,.1,.57,.785,K,hd],
    [.07,.05,.02,0,.48,.855,K,hd],[.03,.03,.02,-.07,.6,.79,0xffffff,hd],[.24,.06,.2,-.3,.08,.28,D],[.24,.06,.2,.3,.08,.28,D],[.4,.06,.2,0,.1,-.62,D,tl]]);};
MODELS.pufin=function(){const K=0x16161c,Wt=0xf8f6f0,O=0xff6a2a,Y=0xffc040,hd={name:"head",px:0,py:.62,pz:.04};
  return mk([[.3,.4,.3,0,.38,0,K],[.24,.3,.04,0,.34,.16,Wt],[.28,.26,.28,0,.72,.04,K,hd],[.24,.18,.04,0,.72,.19,Wt,hd],[.14,.15,.14,0,.68,.27,O,hd],[.15,.04,.15,0,.73,.27,Y,hd],
    [.05,.05,.02,-.08,.76,.215,K,hd],[.05,.05,.02,.08,.76,.215,K,hd],[.1,.26,.22,-.17,.4,-.02,0x22222a],[.1,.26,.22,.17,.4,-.02,0x22222a],[.08,.06,.14,-.07,.03,.06,O],[.08,.06,.14,.07,.03,.06,O]]);};
MODELS.tuljan2=()=>MODELS.tuljan();MODELS.pufin2=()=>MODELS.pufin();
MODELS.ribar=function(){const g=MODELS.macka(),hd=g.userData.parts.head,Y=std(0xffc93a);const a=new THREE.Mesh(new THREE.BoxGeometry(.5,.05,.5),Y);a.position.set(0,.15,.04);hd.add(a);
  const b=new THREE.Mesh(new THREE.BoxGeometry(.32,.14,.3),Y);b.position.set(0,.24,.04);hd.add(b);const c=new THREE.Mesh(new THREE.BoxGeometry(.42,.14,.08),Y);c.position.set(0,.08,-.2);hd.add(c);return g;};
pwPets("svjetionik","luka",[
  {k:"tuljan",fav:"riba",n:"Tuljanka Pega",d:"Okrugla siva tuljanka s pjegama. Na kopnu poskakuje na trbuhu, a u moru je brza kao strijela.",gd:"Iz mora donosi ribu i bisere.",gift:()=>[["riba",3],["coins",13]],spd:1,
   spec:{n:"Tuljanovo plivanje",d:"Pega pliva kroz valove i roni pod vodu. Na kopnu poskakuje sporije, ali vrlo veselo!",ride:1,ic:"riba"},ride:{water:1,under:1,leap:1,speed:9.2,seat:.5},tip:"Pega te nosi! U moru je najbrža, a može i roniti."},
  {k:"pufin",fav:"riba",n:"Pufin Klempo",d:"Mali pufin šarenog kljuna. Zbog kljuna ga zovu morski klaun.",gd:"S hridi donosi pera i ribice.",gift:()=>[["riba",2],["coins",15]],spd:1.2,
   spec:{n:"Pufinov let",d:"Klempo brzo maše krilima i letite nisko iznad valova! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:9.4,jump:9,seat:.6},tip:"Klempo leti! Skok je gore, Roni je dolje."}]);
PWIT.riba={n:"Ribica",mk:g=>{const m=std(0x8ab8d8,{emissive:LC(0x204a6a),emissiveIntensity:.3,metalness:.3,roughness:.35});const b=new THREE.Mesh(new THREE.BoxGeometry(.12,.2,.38),m);g.add(b);const t=new THREE.Mesh(new THREE.BoxGeometry(.04,.22,.12),m);t.position.z=-.24;g.add(t);
  const e=new THREE.Mesh(new THREE.BoxGeometry(.13,.04,.04),std(0x111111));e.position.set(0,.04,.13);g.add(e);},glow:0xa0e0ff};
PWIT.plovak={n:"Plovak",mk:g=>{const a=new THREE.Mesh(new THREE.SphereGeometry(.24,12,8,0,Math.PI*2,0,Math.PI/2),std(0xe0302a));g.add(a);const b=new THREE.Mesh(new THREE.SphereGeometry(.24,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),std(0xffffff));g.add(b);},glow:0xffb0a0};
PWIT.mahovina={n:"Mahovina",mk:g=>{const m=std(0x6ab84a,{emissive:LC(0x204a10),emissiveIntensity:.3});for(const [x,y,z,s] of [[0,0,0,.3],[.14,.06,.08,.2],[-.12,.04,-.06,.22]]){const o=new THREE.Mesh(new THREE.BoxGeometry(s,s*.7,s),m);o.position.set(x,y,z);g.add(o);}},glow:0xc0ff90};
function svPearl(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(.26,16,12),new THREE.MeshStandardMaterial({color:LC(0xfff6e0),emissive:LC(0xffe0a0),emissiveIntensity:.9,roughness:.15,metalness:.1}));g.add(m);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xfff0b0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(2.2,2.2,1);g.add(sp);return g;}

/* ---------- terrain ---------- */
const SV={tw:{x:124,z:98,y0:26},beam:null,lit:false,eggs:[],stars:[],spout:{x:100.5,z:116.5,y:25},floats:[],fish:[],moss:[]};
const SVRING=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
function svH(x,z){let h=SL-3+(fbm(x*.03+7,z*.03+3)-.5)*4;
  h=Math.max(h,guIsl(x,z,124,128,36,17,5,2.5));
  {const d=Math.hypot(x-124,z-100);if(d<22&&h>SL+2){const q=Math.max(0,1-Math.max(0,d-9)/11);h=Math.max(h,17+9*sstep(0,1,q));}}
  {const d=Math.hypot(x-154,z-126);if(d<10&&h>SL+1)h=Math.min(h,SL+3+(d>7?(d-7)*.8:0));}
  for(const [cx,cz,r,t] of [[70,72,5,SL+4],[80,62,3,SL+3],[62,60,3.2,SL+3],[86,78,2.6,SL+3],[72,52,4,SL+5]]){const d=Math.hypot(x-cx,z-cz)*(1+.18*(vnoise(x*.3,z*.3,3)-.5));if(d<r+1.5)h=Math.max(h,d<r?t:SL+1);}
  {const d=Math.hypot(x-196,z-186);if(d<11)h=Math.max(h,d<2.6?SL+13:d<4.6?SL+10:d<6.6?SL+7:d<9?SL+4:SL+1);}
  return Math.round(h);}
function svGen(){for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,svH(x,z));hmap[x+z*W]=h;const rocky=h>SL+3&&(Math.hypot(x-196,z-186)<10||[[70,72],[80,62],[62,60],[86,78],[72,52]].some(([a,b])=>Math.hypot(x-a,z-b)<6));
    for(let y=0;y<h;y++){let t=T.kamen;if(rocky)t=y===h-1?(hash2(x,z,5)<.45?T.trava:hash2(x,z,6)<.5?T.sljunak:T.kamen):T.kamen;else if(y>=h-3)t=h<=SL+3?T.pijesak:(y===h-1?T.trava:T.zemlja);if(!rocky&&h>SL+3&&y===h-1&&hash2(x,z,9)<.06)t=T.kamen;vox[I(x,y,z)]=t;}}
  const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)mask[(x+dx)+(z+dz)*W]=2;};const Y=(x,z)=>hmap[x+z*W];
  const lit=wStars("svjetionik")>=WSTAR_N;
  /* ----- the lighthouse ----- */
  {const {x:cx,z:cz,y0}=SV.tw;for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const x=cx+dx,z=cz+dz;for(let y=y0;y<H;y++)vox[I(x,y,z)]=0;for(let y=hmap[x+z*W];y<y0;y++)vox[I(x,y,z)]=y===y0-1?T.kaldrma:T.kamen;hmap[x+z*W]=y0;}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d>3.3)continue;const x=cx+dx,z=cz+dz,wall=d>2.3;
      for(let y=y0;y<=56;y++){if(wall){const door=(dx===0&&dz===3&&y<y0+2)||(dx===0&&dz===-3&&y>=53&&y<=54);if(door)continue;const win=(y%6===3&&(dx===0||dz===0))||(y>=53&&y<=55&&(dx===0||dz===0)&&!(dx===0&&dz===-3));wput(x,y,z,win?T.staklo:(((y-y0)>>2)&1?T.crvena:T.bijela),1);}}
      if(!wall){if(!(dx===0&&dz===1)&&!(dx===-1&&dz===1))wput(x,52,z,T.sdaske,1);if(!(dx===1&&dz===-1)&&!(dx===1&&dz===0))wput(x,57,z,T.sdaske,1);}else wput(x,57,z,T.bijela,1);
      for(let y=58;y<=61;y++){if(wall)wput(x,y,z,(y===61)?T.crvena:T.staklo,1);}
      if(d<=3.3)wput(x,62,z,T.crvena,1);if(d<=2.3)wput(x,63,z,T.crvena,1);}
    for(let y=y0;y<=57;y++)wput(cx,y,cz,T.kvarc,1);wput(cx,58,cz,lit?T.svjetlo:T.staklo,1);wput(cx,59,cz,lit?T.svjetlo:T.staklo,1);SV.lamp=[[cx,58,cz],[cx,59,cz]];
    for(let k=0;k<=25;k++){const [a,b]=SVRING[(2+k)%8];wput(cx+a,y0+k,cz+b,T.sdaske,1);}
    [[5,53],[6,54],[7,55],[0,56]].forEach(([i,y])=>{const [a,b]=SVRING[i];wput(cx+a,y,cz+b,T.sdaske,1);});
    for(const [a,b] of [[1,-1],[1,0]]){wput(cx+a,57,cz+b,T.kristal,1);WG.gate.push([cx+a,57,cz+b]);}
    for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const d=Math.hypot(dx,dz);if(d<=3.3||d>5.3)continue;wput(cx+dx,52,cz+dz,T.bijela,1);if(d>4.4&&(dx+dz)%2===0)wput(cx+dx,53,cz+dz,T.crvena,1);}
    wStar("balkon",cx+.5,53.9,cz-4.5,"Na balkonu svjetionika. Penji se zavojitim stubama do vrha!");addChest("s_lampa",cx-1,58,cz-1,"Škrinja kraj velike lampe");
    WG.isl.toranj={x:cx,z:cz,y:58,r:6};POI.push({k:"s_toranj",n:"Svjetionik",x:cx,z:cz,r:8});busy(cx,cz,7);
    /* the keeper's house and a path down to the village */
    {const x=cx+9,z=cz+4,y=Y(x,z)-1;pwHut(x,z,y,{w:2,d:2,roof:T.crvena,wall:T.bijela});busy(x,z,4);addChest("s_kuca",x-1,y+1,z-1,"Svjetioničareva škrinja");}
    for(let t=0;t<=1;t+=.008){const x=Math.round(cx+(126-cx)*t+Math.sin(t*4)*3),z=Math.round(cz+4+(146-cz-4)*t);for(const w of [-1,0,1]){const X=x+w,yy=hmap[X+z*W]-1;if(vox[I(X,yy,z)]===T.trava){vox[I(X,yy,z)]=T.kaldrma;mask[X+z*W]=2;}}}}
  /* ----- the fishing village ----- */
  {const px=126,pz=148;for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const d=Math.hypot(dx,dz);if(d>5.3)continue;const x=px+dx,z=pz+dz,y=Y(x,z)-1;if(y<SL+2)continue;wput(x,y,z,(dx+dz)&1?T.kaldrma:T.kamen,1);mask[x+z*W]=2;}
    {const y=Y(px,pz);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){if(a||b){wput(px+a,y,pz+b,T.kcigla,1);}else{wput(px,y-1,pz,T.voda,1);}}wput(px-1,y+1,pz-1,T.tdaske,1);wput(px+1,y+1,pz-1,T.tdaske,1);wput(px-1,y+2,pz-1,T.tdaske,1);wput(px+1,y+2,pz-1,T.tdaske,1);for(let a=-1;a<=1;a++)wput(px+a,y+3,pz-1,T.krov,1);}
    for(const [x,z,r] of [[116,144,T.vuna_t],[136,144,T.vuna_t],[117,155,T.vuna_ts],[135,155,T.vuna_t],[112,134,T.vuna_ts]]){const y=Y(x,z)-1;if(y<SL+2)continue;pwHut(x,z,y,{w:2,d:2,roof:r,wall:T.bijela});busy(x,z,4);}
    addChest("s_selo",113,Y(113,145),145,"Ribarska škrinja");
    /* drying nets */
    for(const [x,z] of [[104,150],[108,152]]){const y=Y(x,z);for(let h=0;h<3;h++){wput(x,y+h,z,T.drvo,1);wput(x+3,y+h,z,T.drvo,1);}for(let a=0;a<=3;a++)wput(x+a,y+3,z,T.drvo,1);for(let a=1;a<=2;a++)for(let h=1;h<=2;h++)wput(x+a,y+h,z,T.vuna_s,1);}
    POI.push({k:"s_selo",n:"Ribarsko selo",x:px,z:pz,r:14});}
  /* ----- the harbour: pier, signal lamps, the fisherwoman's shed ----- */
  {const x0=140;for(let z=152;z<=181;z++)for(let dx=-1;dx<=1;dx++){const x=x0+dx;if(hmap[x+z*W]>=SL+4)continue;wput(x,SL+3,z,(z%3)?T.sdaske:T.tdaske,1);for(let y=SL+4;y<SL+7;y++)vox[I(x,y,z)]=0;if(dx&&z%4===0)for(let y=SL+2;y>=1&&!vox[I(x,y,z)];y--)wput(x,y,z,T.tdaske,1);if(dx&&z%8===2){wput(x,SL+4,z,T.tdaske,1);wput(x,SL+5,z,T.lampion,1);}}
    const L=[["vuna_c",523],["vuna_zl",659],["vuna_z",784],["vuna_b",988]],PP=[[x0-1,166],[x0+1,166],[x0-1,170],[x0+1,170]],ORD=[1,3,0,2];
    const pads=PP.map(([x,z],i)=>{wput(x,SL+3,z,T[L[i][0]],1);return {x,y:SL+3,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    for(let h=1;h<=8;h++)wput(x0+2,SL+3+h,174,T.drvo,1);wput(x0+2,SL+3,174,T.tdaske,1);ORD.forEach((j,i)=>wput(x0+3,SL+11-i,174,T[L[j][0]],1));
    pwSeq("svjetla",{pads,order:ORD,win:"Signalna svjetla gore pravim redom! Kućica na kraju mola se otvorila.",wrong:"Ups, krivo svjetlo. Pogledaj zastavice na jarbolu, odozgo prema dolje, i kreni ispočetka!"});
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=1;h<=3;h++){if(a===0&&b===0&&h===2)continue;pwCell("svjetla",x0+a,SL+3+h,179+b,h===3?T.crvena:T.bijela);}
    wStar("svjetla",x0+.5,SL+5.5,179.5,"U kućici na kraju mola. Upali signalna svjetla redom kao zastavice na jarbolu!");
    {const x=146,z=156,y=Y(x,z)-1;pwHut(x,z,y,{w:2,d:2,roof:T.vuna_c,wall:T.tdaske});busy(x,z,4);for(let h=1;h<=3;h++)pwCell("plovci",x,y+h,z+2,T.tdaske);wStar("plovci",x+.5,y+1.6,z+.5,"U Nelinoj ribarskoj kućici. Pomozi Neli skupiti plovke!");SV.nela={x:x+.5,z:z+3.5};}
    POI.push({k:"s_luka",n:"Ribarska luka",x:x0,z:166,r:10});}
  /* ----- tide pools ----- */
  {const cx=154,cz=126;const pools=[[0,0,1.8],[5,3,1.4],[-4,4,1.3],[3,-5,1.5],[-5,-3,1.2]];for(let dz=-9;dz<=9;dz++)for(let dx=-9;dx<=9;dx++){const x=cx+dx,z=cz+dz;const h=hmap[x+z*W];if(h<SL+3||h>SL+4)continue;
      const inP=pools.some(([a,b,r])=>Math.hypot(dx-a,dz-b)<r)||(fbm(x*.25,z*.25)>.66&&Math.hypot(dx,dz)<8);if(inP){vox[I(x,h-1,z)]=T.voda;vox[I(x,h-2,z)]=T.voda;vox[I(x,h-3,z)]=T.pijesak;}else{vox[I(x,h-1,z)]=hash2(x,z,3)<.5?T.kamen:T.sljunak;}}
    wStar("lokve",cx+.5,SL+3.5,cz+.5,"Iznad najveće plimne lokve na istočnoj obali.");SV.fish=pools.slice(1,4).map(([a,b])=>[cx+a+.5,SL+2.4,cz+b+.5]);SV.star=pools.slice(1).map(([a,b])=>[cx+a+.5,SL+2,cz+b+.5]);
    POI.push({k:"s_lokve",n:"Plimne lokve",x:cx,z:cz,r:10});busy(cx,cz,9);}
  /* ----- the western headland: sea cave and blowhole ----- */
  {const cx=97,cz=116;for(let dz=-10;dz<=10;dz++)for(let dx=-10;dx<=10;dx++){const d=Math.hypot(dx,dz)*(1+.15*(vnoise((cx+dx)*.3,(cz+dz)*.3,7)-.5));if(d>8.6)continue;const x=cx+dx,z=cz+dz;for(let y=1;y<=24;y++)vox[I(x,y,z)]=y===24?T.trava:y>21?T.zemlja:T.kamen;for(let y=25;y<H;y++)vox[I(x,y,z)]=0;hmap[x+z*W]=25;}
    for(let x=78;x<=97;x++)for(let z=cz-1;z<=cz+1;z++){for(let y=11;y<=14;y++){vox[I(x,y,z)]=0;}if(x>86)vox[I(x,10,z)]=T.kamen;}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++)for(let y=12;y<=17;y++){const e=(dx*dx+dz*dz)/14+Math.pow((y-13.5)/3.6,2);if(e<1)vox[I(cx+2+dx,y,cz+dz)]=0;}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const x=cx+2+dx,z=cz+dz;if(!vox[I(x,13,z)]&&vox[I(x,12,z)]!==0)wput(x,12,z,T.pijesak,1);if(!vox[I(x,13,z)]&&!vox[I(x,12,z)]&&Math.hypot(dx,dz)<3.4)wput(x,12,z,T.pijesak,1);}
    for(let y=16;y<=25;y++)for(const [a,b] of [[0,0],[1,0],[0,1],[1,1]])vox[I(cx+3+a,y,cz+b)]=0;
    WG.wind.push({x:cx+4,z:cz+1,r:1.1,y0:12.6,y1:27,k:"puhalica"});SV.spout={x:cx+4,z:cz+1,y:25};
    for(const [a,b,y] of [[-1,3,15],[4,-3,14],[5,2,16],[0,-3,13]]){const x=cx+2+a,z=cz+b;let X=x,Z=z;for(let i=0;i<4;i++){if(vox[I(X,y,Z)])break;X+=Math.sign(a)||0;Z+=Math.sign(b)||0;}wput(X,y,Z,T.svjetlo,1);}
    wStar("spilja",cx+.5,13.8,cz+2.5,"U morskoj špilji ispod zapadne stijene. Uplivaj kroz otvor na moru!");wStar("puhalica",cx-3.5,26,cz-2.5,"Na vrhu zapadne stijene. Do njega te nosi puhalica iz špilje!");
    addChest("s_spilja",cx+1,13,cz-2,"Škrinja u morskoj špilji");POI.push({k:"s_spilja",n:"Morska špilja",x:cx,z:cz,r:9});busy(cx,cz,10);}
  /* ----- seal rocks ----- */
  wStar("tuljani",72.5,SL+6.2,52.5,"Na najvišoj tuljanovoj stijeni na sjeverozapadu.");addChest("s_tuljani",70,SL+5,72,"Škrinja na tuljanovoj stijeni");POI.push({k:"s_tuljani",n:"Tuljanove stijene",x:72,z:64,r:16});
  /* ----- gull islet with bounce pads and nests ----- */
  {const cx=196,cz=186;for(const [dz,t] of [[7,13],[5,16],[3,19]])wput(cx,t,cz+dz,T.skocni,1);
    for(const [a,b,t] of [[-6,2,14],[5,-5,14],[-4,-3,17],[3,3,17],[-2,-1,20]]){wput(cx+a,t,cz+b,T.sijeno,1);SV.eggs.push([cx+a+.5,t+1.1,cz+b+.5]);}
    wStar("galebovi",cx+.5,SL+13.9,cz+.5,"Na vrhu Otočića galebova. Skočni kamenčići te nose gore!");addChest("s_galeb",cx-6,SL+4,cz-3,"Škrinja galebova");POI.push({k:"s_galeb",n:"Otočić galebova",x:cx,z:cz,r:11});}
  /* ----- the bell buoy ----- */
  {const x=214,z=112;for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++){if(Math.abs(a)===2&&Math.abs(b)===2)continue;wput(x+a,12,z+b,T.tdaske,1);}for(let y=1;y<12;y++)wput(x,y,z,T.zeljezo||T.kamen,1);
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let y=13;y<=14;y++)wput(x+a,y,z+b,y===13?T.crvena:T.bijela,1);wput(x+2,13,z,T.crvena,1);
    wStar("plutaca",x+.5,15.9,z+.5,"Na plutači sa zvonom daleko na istoku. Plivaj ili veslaj do nje!");SV.buoy={x:x+.5,y:15,z:z+.5};POI.push({k:"s_plutaca",n:"Plutača sa zvonom",x,z,r:6});}
  /* ----- the regatta ----- */
  {const pts=[[152,184],[166,190],[180,186],[188,172],[180,158],[166,168],[152,176]].map(([x,z])=>[x+.5,WATER+.5,z+.5]);
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h===1)continue;pwCell("regata",130+a,SL+3+h,186+b,h===2?T.vuna_t:T.bijela);}
    for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++){if(!get(130+a,SL+3,186+b))wput(130+a,SL+2,186+b,T.tdaske,1);}wput(130,SL+3,186,T.tdaske,1);
    wStar("regata",130.5,SL+4.5,186.5,"Na splavi južno od luke. Otvara se kad pobijediš u regati! Start je na kraju mola.");
    pwRings("regata",{start:[140.5,SL+4,176.5],pts,time:70,col:0x7ae0ff,name:"Regata",win:"Pobjeda u regati! Splav južno od luke se otvorila."});}
  /* pickups for quests */
  SV.floats=[[152,168],[118,172],[100,140],[164,150],[132,192],[176,130],[108,96]].map(([x,z])=>[x+.5,WATER+.15,z+.5]).filter(p=>hmap[Math.floor(p[0])+Math.floor(p[2])*W]<SL+1).slice(0,5);
  SV.moss=[[117,92],[95,113],[80,62],[132,136]].map(([x,z])=>[x+.5,floorY(x+.5,H-1,z+.5)+1.4,z+.5]);
  /* trees: a few wind-bent pines and flowers on the grass */
  for(let z=6;z<W-6;z++)for(let x=6;x<W-6;x++){const h=hmap[x+z*W];if(h<SL+5||h>SL+15||mask[x+z*W])continue;if(vox[I(x,h-1,z)]!==T.trava)continue;if(hash2(x,z,61)<.01){let ok=true;for(let a=-3;a<=3&&ok;a++)for(let b=-3;b<=3;b++)if(get(x+a,h,z+b)){ok=false;break;}
      if(ok){const th=4+Math.floor(hash2(x,z,62)*3);for(let i=0;i<th;i++)wput(x+(i>2?1:0),h+i,z,T.smreka_d);const tx=x+1;for(let i=2;i<=th+1;i++){const r=i>th-1?0:i%2?1:2;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r+1;dx++)if(Math.abs(dx)+Math.abs(dz)<=r+1&&!get(tx+dx,h+i,z+dz))wput(tx+dx,h+i,z+dz,T.smreka);}}}}
  {const g=Y(126,161)-1;wPortalArch(126,g,161);WG.portal={x:126.5,y:g+1,z:161.5,ry:Math.PI};WG.spawn={x:126.5,y:Y(126,154),z:154.5,cam:0};busy(126,158,4);}
  Object.assign(LOOT,{s_selo:{coins:45,mats:{zeljezo:2},blocks:{bijela:16,vuna_t:8},msg:"Bijeli kamen i plavo platno, kao kuće u ribarskom selu."},
    s_kuca:{coins:50,mats:{bakar:2},blocks:{crvena:10,bijela:10,lampion:2},msg:"Svjetioničar ti daruje crveno-bijele blokove. Sagradi svoj svjetionik!"},
    s_spilja:{coins:65,mats:{biser:2},blocks:{prizmarin:8,svjetlo:2},msg:"Biseri iz morske špilje!"},
    s_tuljani:{coins:45,mats:{biser:1},blocks:{sljunak:12},msg:"Tuljani su ovdje čuvali šljunak i jedan biser."},
    s_galeb:{coins:50,mats:{grumen:1},blocks:{sijeno:8},msg:"Galebovi ti daju sijeno za gnijezda i jedan zlatni grumen."},
    s_lampa:{coins:300,mats:{dijamant:2,biser:4,grumen:4},blocks:{svjetlo:6,staklo:12,crvena:8},msg:"Svjetionik ponovno svijetli! Ovo je blago svjetioničara."}});}

/* ---------- life ---------- */
function svLife(){S.wq=S.wq||{};
  PW.guide=pwPut("morz","Djed Lovro",129.5,152.5,{frozen:true,ry:-2.6,sc:1.35});
  const nela=pwPut("ribar","Ribarica Nela",SV.nela.x,SV.nela.z,{frozen:true,ry:0});pwPut("ribar","Ribar Jakov",139.5,160.5,{frozen:true,ry:Math.PI*.5,y:SL+5});
  pwPut("macka","Mačić Luka",124.5,146.5,{speed:1});pwPut("ovca","Ovčica Bijela",112.5,120.5,{speed:.6});pwPut("ovca","Runka",118.5,114.5,{speed:.6});
  [["Kriko",150.5,121.5],["Bistra",158.5,130.5],["Kliješta",151.5,131.5]].forEach(([n,x,z])=>pwPut("rak",n,x,z,{speed:.6}));
  [["Jura",196.5,180.5],["Vjetrić",192.5,190.5],["Bijela",201.5,184.5],["Kriki",130.5,140.5],["Pero",142.5,170.5,SL+5]].forEach(([n,x,z,y])=>pwPut("galeb",n,x,z,{speed:.5,y}));
  [["Siva",80.5,62.5],["Pjegica",62.5,60.5],["Brk",86.5,78.5]].forEach(([n,x,z])=>pwPut("tuljan2",n,x,z,{speed:.3}));
  [["Mali",193.5,183.5],["Klaun",199.5,188.5]].forEach(([n,x,z])=>pwPut("pufin2",n,x,z,{speed:.6}));
  [["Val",170.5,150.5],["Pjena",110.5,186.5]].forEach(([n,x,z])=>{const e=spawn("dupin",n,{swim:true,speed:2,near:{x,z}});e.home={x,z};});
  const pg=pwPut("tuljan",PETS.tuljan.n,70.5,72.5,{speed:.4});const kl=pwPut("pufin",PETS.pufin.n,196.5,182.5,{speed:.6,y:SL+8});if(!S.met.pufin)kl.frozen=true;
  pwQuest("tuljan",{pet:1,en:pg,auto:1,need:3,item:"riba",spots:SV.fish,got:"Ribica za Pegu",
    ask:"Arf, arf! Ja sam Pega. Gladna sam, a ribice su se sakrile u plimne lokve na istočnoj obali. Doneseš mi tri? Onda te vodim plivati!",
    done:"Arf! Najukusnije ribice! Sad smo prijateljice. Skoči mi na leđa, idemo u valove!",fact:"Mladi tuljani imaju bijelo, mekano krzno koje ih grije na hladnoći."});
  pwQuest("pufin",{pet:1,en:kl,auto:1,need:4,item:"mahovina",spots:SV.moss,got:"Mahovina za gnijezdo",
    ask:"Pip-pip! Ja sam Klempo. Gradim gnijezdo, a treba mi mekana mahovina. Raste kraj svjetionika, na vrhu zapadne stijene, na tuljanovoj stijeni i kraj luke. Doneseš mi četiri busena?",
    done:"Kakvo meko gnijezdo! Hvala ti. Hoćeš letjeti sa mnom nisko iznad valova?",fact:"Pufini mogu u kljunu odjednom nositi i deset malih ribica!"});
  pwQuest("plovci",{en:nela,need:5,item:"plovak",spots:SV.floats,got:"Plovak",cage:"plovci",
    ask:"Joj, mala! Ja sam Nela. Oluja mi je otkinula pet plovaka s mreže i raznijela ih po zaljevu. Pronađeš ih? Plivaj ili veslaj, crveno-bijeli su pa se lako vide!",
    done:"Svih pet plovaka! Hvala ti, mreža je opet cijela. Uđi u moju kućicu, ostavila sam ti nešto lijepo!",thanks:"Mreža je opet cijela, hvala ti! U kućici te čeka dar.",remind:"Crveno-bijeli plovci plutaju po zaljevu."});}
function svEnv(){const {x:cx,z:cz}=SV.tw;
  /* the beam of the lighthouse, visible once all pearls are back */
  const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xfff2b0,transparent:true,opacity:.16,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false});
  for(const s of [1,-1]){const c=new THREE.Mesh(new THREE.ConeGeometry(5,80,20,1,true),m);c.rotation.z=s*Math.PI/2;c.position.x=s*40;g.add(c);}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xfff0b0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9,fog:false}));sp.scale.set(9,9,1);g.add(sp);
  g.position.set(cx+.5,59,cz+.5);g.visible=WG.gateOpen;scene.add(g);SV.beam=g;SV.lit=WG.gateOpen;
  /* eggs, starfish, the buoy bell */
  const em=std(0xe8e0c8);SV.eggM=SV.eggs.map(([x,y,z],i)=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.16,10,8),em);e.scale.y=1.3;e.position.set(x+(i%2?.15:-.15),y-.85,z);e.castShadow=true;scene.add(e);return e;});
  const sm=std(0xff8a3a);for(const p of SV.star){const s=new THREE.Group();for(let i=0;i<5;i++){const a=new THREE.Mesh(new THREE.BoxGeometry(.08,.04,.3),sm);a.position.set(Math.sin(i*1.2566)*.15,0,Math.cos(i*1.2566)*.15);a.rotation.y=i*1.2566;s.add(a);}s.position.set(p[0]+.4,p[1]-.75,p[2]-.3);scene.add(s);}
  {const b=new THREE.Group(),gm=new THREE.MeshStandardMaterial({color:LC(0xffc53d),roughness:.3,metalness:.75});const c=new THREE.Mesh(new THREE.CylinderGeometry(.22,.48,.7,12,1,true),gm);c.position.y=-.35;b.add(c);
    const t=new THREE.Mesh(new THREE.SphereGeometry(.23,10,6,0,Math.PI*2,0,Math.PI/2),gm);b.add(t);const fr=std(0x2a2e36,{metalness:.6,roughness:.4});for(const s of [-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.1,1.6,.1),fr);p.position.set(s*.7,-.2,0);b.add(p);}const tp=new THREE.Mesh(new THREE.BoxGeometry(1.5,.1,.1),fr);tp.position.y=.6;b.add(tp);
    b.position.set(SV.buoy.x+1.2,SV.buoy.y+.9,SV.buoy.z);scene.add(b);SV.bell=b;}}
function svTick(dt,tt){const P=FP.p;
  if(SV.beam){if(WG.gateOpen&&!SV.lit){SV.lit=true;for(const [x,y,z] of SV.lamp)setV(x,y,z,T.svjetlo);SV.beam.visible=true;fireworks();}if(SV.beam.visible)SV.beam.rotation.y+=dt*.6;}
  if(SV.bell){SV.bell.rotation.z=Math.sin(tt*1.3)*.18;SV.bell.position.y=SV.buoy.y+.9+Math.sin(tt*1.1)*.06;if(FP.on&&Math.sin(tt*1.3)>.995&&Math.hypot(P.x-SV.buoy.x,P.z-SV.buoy.z)<40&&!svTick.b){svTick.b=1;tone(988,.8,"sine",.02);tone(1318,.6,"sine",.012,.02);}if(Math.sin(tt*1.3)<.9)svTick.b=0;}
  for(let i=0;i<(SV.eggM||[]).length;i++){const w=Math.max(0,Math.sin(tt*.8+i*2.1)-.9)*8;SV.eggM[i].rotation.z=Math.sin(tt*16+i)*.15*w;}
  {const S0=SV.spout;if(Math.random()<dt*(Math.sin(tt*.7)>.6?26:3))mgSpawn({t:"puff",x:S0.x+(Math.random()-.5)*.8,y:S0.y+.3,z:S0.z+(Math.random()-.5)*.8,vy:5+Math.random()*4,life:1,size:.3,size2:.7,col:[0xffffff,0xd8f0ff],grav:6,op:.8});}
  if(!FP.on)return;
  if(Math.hypot(P.x-124,P.z-98)<9)tipOnce("s_toranj","Svjetionik! Unutra se zavojite stube penju sve do balkona. Gore je velika lampa, ali ugašena je...",5200);
  if(Math.hypot(P.x-154,P.z-126)<9)tipOnce("s_lokve","Plimne lokve! U njima žive rakovi i zvjezdače, a jedna lokva skriva biser svjetla.",4400);
  if(Math.hypot(P.x-99,P.z-116)<6&&P.y<16)tipOnce("s_spilja","Morska špilja! Ono što šumi gore je puhalica. Stani u nju i val te izbaci na vrh stijene!",5200);
  if(Math.hypot(P.x-196,P.z-186)<11)tipOnce("s_galeb","Otočić galebova! Skočni kamenčići te bacaju na višu terasu.",4000);}
function svTalk(){const n=wStars("svjetionik");const need=["tuljan","pufin"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.svjetionik&&S.wst.svjetionik[s.k]));
  const L=n>=WSTAR_N?"Svjetionik opet svijetli! Brodovi sad sigurno nalaze put. Gore u sobi s lampom čeka te moja škrinja, zaslužila si je.":
    n===0?"Dobro došla na Otok svjetionika, malena! Ja sam Djed Lovro, svjetioničar. Sinoć je oluja ugasila moju lampu i raznijela deset bisera svjetla po otoku i po moru. Bez njih svjetionik ne može svijetliti, a brodovi se noću izgube. Pomozi mi ih skupiti!":
    "Imaš "+n+" od "+WSTAR_N+" bisera svjetla. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" Na otoku ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_svjetionik=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#3a3a7a");g.addColorStop(.6,"#ff9a70");g.addColorStop(1,"#ffd0a0");x.fillStyle=g;x.fillRect(0,0,64,64);x.fillStyle="#1a4a7a";x.fillRect(0,50,64,14);
    P([[4,52],[14,40],[44,40],[58,52]],"#6a6a70");P([[24,42],[26,16],[38,16],[40,42]],"#ffffff");x.fillStyle="#d83a3a";x.fillRect(25,22,14,5);x.fillRect(24,32,15,5);P([[24,16],[32,8],[40,16]],"#d83a3a");
    x.fillStyle="rgba(255,240,170,.75)";x.beginPath();x.moveTo(32,14);x.lineTo(64,6);x.lineTo(64,20);x.closePath();x.fill();x.fillStyle="#fff2a0";x.beginPath();x.arc(32,14,3,0,7);x.fill();};
  D.mg_trail_svjetionik=(x,P)=>{x.fillStyle="#fff2a0";x.beginPath();x.moveTo(10,32);x.lineTo(58,14);x.lineTo(58,50);x.closePath();x.globalAlpha=.6;x.fill();x.globalAlpha=1;x.beginPath();x.arc(12,32,8,0,7);x.fillStyle="#ffd060";x.fill();x.lineWidth=3;x.strokeStyle="#16243a";x.stroke();};})();

pwWorld("svjetionik",{dist:"luka",lv:6,n:"Otok svjetionika",d:"Stjenoviti otok u sumrak: visoki svjetionik koji se ugasio, ribarsko selo, plimne lokve, morska špilja s puhalicom, tuljani i regata po zaljevu.",
  feat:["Djed Lovro","Tuljanka Pega","Pufin Klempo","puhalica","regata","signalna svjetla"],fr:["bijela","crvena","svjetlo"],ca:0xfff2c0,cb:0xd83a3a,sea:1,fog:.003,
  preset:{top:0x2a2e72,hz:0xff9a70,sun:0xffb07a,si:2.1,hemi:.6,el:.17,az:1.9,fog:0xd8908a,glow:.85,stars:.3,sh:0x3aa8b8,dp:0x0e3a6e,exp:1.05,night:.22},
  gen:svGen,env:svEnv,life:svLife,talk:svTalk,tick:svTick,itemMesh:svPearl,itemCol:[0xfff0b0,0xffffff,0xffe080],itemBurst:[[1,.95,.75],[1,1,1],[1,.9,.6]],itemFx:"star",
  item:{one:"Biser svjetla",hud:"Biseri svjetla",done:"Svi biseri svjetla!",all:"Svih 10 bisera svjetla! Velika lampa svjetionika ponovno svijetli i kristalni poklopac na vrhu se otvara!",first:"Prvi biser svjetla! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Otok svjetionika! Biseri svjetla: "+wStars("svjetionik")+" / "+WSTAR_N+". Djed Lovro te čeka na trgu.",
  facts:{balkon:"Svjetlo svjetionika vidi se i trideset kilometara daleko. Svaki svjetionik bljeska na svoj način, pa mornari po bljeskovima znaju koji je.",
    lokve:"U plimnim lokvama žive životinje koje izdrže i vodu i sunce: rakovi, puževi, moruzgve i zvjezdače.",
    spilja:"More stotinama godina udara u stijenu i polako je dubi. Tako nastaju morske špilje.",
    puhalica:"Puhalica je rupa u stijeni iznad morske špilje. Kad val udari u špilju, voda izleti kroz rupu visoko u zrak, kao kad kit diše.",
    tuljani:"Tuljani mogu ostati pod vodom i do pola sata. Na kopnu se kreću poskakujući na trbuhu.",
    galebovi:"Galebovi su vrlo pametni. Neki bacaju školjke na kamen da se razbiju, pa pojedu ono što je unutra.",
    plutaca:"Plutače pokazuju brodovima put. Neke imaju zvono koje zazvoni kad ih zaljuljaju valovi, pa se čuju i u magli.",
    regata:"Regata je natjecanje brodova na jedra. Neke regate na svijetu održavaju se već više od sto pedeset godina.",
    svjetla:"Brodovi noću nose svjetla: crveno na lijevoj strani, zeleno na desnoj i bijelo na jarbolu. Tako drugi brodovi znaju kamo plove.",
    plovci:"Ribari vežu mreže za plovke da ne potonu i da ih lako pronađu na moru."},
  chat:{"Ribar Jakov":["Večeras je more mirno kao ulje.","Signalna svjetla na molu pale se redom kao zastavice na jarbolu: odozgo prema dolje.","Regata kreće s kraja mola. Prođi kroz sve plave obruče na moru!"],
    "Mačić Luka":["Kad narastem, bit ću svjetioničar kao Djed Lovro!","Jesi li vidjela puhalicu na zapadnoj stijeni? Pšššš!"],
    tuljan2:["Arf! Arf!","Sunčam se na stijeni, ne smetaj, molim te.","U moru ima toliko ribica!"],pufin2:["Pip! Kakav lijep dan za ribarenje!","Moj kljun je najšareniji na otoku!"],
    galeb:["Kri-kri! Ovo je moje mjesto!","Vidjela sam biser svjetla iz zraka!"],rak:["Klik-klak!","Pazi, u lokvi su zvjezdače, nemoj ih zgaziti."],ovca:["Beee! Ovdje gore puše vjetar!","Mmm, slana trava je najbolja."],dupin:["Iii-iii! Utrkuj se sa mnom!"]},
  finale:{chest:"s_lampa",isl:"toranj",at:{x:124,z:98},rewards:["skin:kabanica","trail:svjetionik"],locked:"Kristalni poklopac drži sobu s lampom zatvorenom. Skupi svih 10 bisera svjetla!",
    kicker:"Svjetionik opet svijetli!",title:"Blago svjetioničara",sub:"Lisica u kabanici i Zrake svjetionika sad su tvoji. Djed Lovro kaže da su brodovi noćas sigurni zahvaljujući tebi!"}});
