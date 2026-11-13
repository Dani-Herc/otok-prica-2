/* =================== OP2 v4: Gusarska uvala (portal world of Lučki grad) =================== */
/* A sunny archipelago on open sea: the arrival island with the home portal and a lookout tower, a plank walk to
   Otok lubanje with the pirate village, the tavern, the ship Crni galeb at the pier and the old fort on the hill;
   Skull rock with its cave, a wreck on a sandbar, an atoll with a coral lagoon and a sea stack reached by cannon. */
MSKIN.gusarska={n:"Gusarska lisica",d:"Hrđavo narančasta, s tamnim čizmama i crvenom maramom. Za njom svjetlucaju zlatni dukati.",p:0,rar:"l",O:0xc0582a,W:0xfff0d8,B:0x1e1a20,D:0x7a2418,glowO:.12,fx:"zlato",wr:"Gusarska uvala"};
MTRAIL.dukati={n:"Zlatni dukati",d:"Iza Ride se kotrljaju i svjetlucaju zlatni dukati.",p:0,rar:"l",wr:"Gusarska uvala"};
TR.dukati=p=>mgSpawn({t:"gold",x:p.x,y:p.y+.25,z:p.z,vy:1.4,vx:(Math.random()-.5)*.8,vz:(Math.random()-.5)*.8,life:.9,size:.24,size2:.2,col:[0xffd23d,0xffe890],grav:5,spin:6});TRATE.dukati=5;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","gusarska",MSKIN.gusarska);ins("trail","dukati",MTRAIL.dukati);}

/* ---------- creatures ---------- */
MODELS.majmun=function(){const B=0x7a4a2a,F=0xe6c49a,K=0x1a1410,hd={name:"head",px:0,py:.78,pz:.16},tl={name:"tail",px:0,py:.46,pz:-.24};
  return mk([[.4,.44,.38,0,.5,0,B],[.28,.3,.04,0,.48,.2,F],[.4,.36,.34,0,.84,.16,B,hd],[.3,.24,.06,0,.82,.34,F,hd],[.2,.12,.08,0,.75,.39,F,hd],[.06,.07,.02,-.08,.88,.375,K,hd],[.06,.07,.02,.08,.88,.375,K,hd],
    [.06,.03,.02,0,.78,.435,K,hd],[.12,.06,.02,0,.72,.435,0x8a3a2a,hd],[.1,.14,.08,-.25,.86,.14,F,hd],[.1,.14,.08,.25,.86,.14,F,hd],
    [.07,.07,.36,0,.46,-.4,B,tl],[.07,.3,.07,0,.62,-.56,B,tl],[.07,.07,.16,0,.78,-.5,B,tl]].concat(legs(.11,.32,.14,.11,B,.32)).concat([[.12,.08,.14,-.14,.03,.13,F],[.12,.08,.14,.14,.03,.13,F]]));};
MODELS.tukan=function(){const Bk=0x1e1e26,Y=0xfff0a0,O=0xff9a1e,R=0xe0402a,Bl=0x3ab8ff,K=0x111111,hd={name:"head",px:0,py:.68,pz:.06};
  return mk([[.3,.4,.32,0,.42,0,Bk],[.22,.22,.06,0,.5,.17,Y],[.26,.26,.28,0,.76,.06,Bk,hd],[.2,.16,.04,0,.74,.21,Y,hd],[.14,.16,.32,0,.74,.36,O,hd],[.14,.06,.1,0,.68,.53,R,hd],[.15,.04,.3,0,.8,.36,0x6ab84a,hd],
    [.08,.08,.02,-.11,.8,.205,Bl,hd],[.08,.08,.02,.11,.8,.205,Bl,hd],[.04,.04,.02,-.11,.8,.217,K,hd],[.04,.04,.02,.11,.8,.217,K,hd],
    [.12,.3,.26,-.17,.44,-.02,0x2a2a34],[.12,.3,.26,.17,.44,-.02,0x2a2a34],[.16,.06,.34,0,.28,-.28,Bk],[.06,.12,.06,-.07,.15,0,0x5a6a80],[.06,.12,.06,.07,.15,0,0x5a6a80]]);};
function guHat(g,y,z,col){const B=std(0x1e1a22),Wt=std(0xffffff);const a=new THREE.Mesh(new THREE.BoxGeometry(.5,.07,.4),B);a.position.set(0,y,z);g.add(a);const b=new THREE.Mesh(new THREE.BoxGeometry(.32,.15,.28),B);b.position.set(0,y+.1,z);g.add(b);
  const c=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,.02),Wt);c.position.set(0,y+.1,z+.15);g.add(c);const f=new THREE.Mesh(new THREE.BoxGeometry(.33,.03,.29),std(col||0xffc53d,{metalness:.5,roughness:.35}));f.position.set(0,y+.04,z);g.add(f);}
MODELS.kapetan=function(){const g=MODELS.rak();guHat(g,.52,.06);return g;};
MODELS.gusar=function(){const g=MODELS.macka(),hd=g.userData.parts.head;const R=std(0xd8303a),K=std(0x16161a);const b=new THREE.Mesh(new THREE.BoxGeometry(.4,.08,.33),R);b.position.set(0,.15,.06);hd.add(b);
  const k=new THREE.Mesh(new THREE.BoxGeometry(.08,.12,.1),R);k.position.set(.12,.1,-.13);hd.add(k);const p=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.03),K);p.position.set(-.09,.06,.225);hd.add(p);
  const s=new THREE.Mesh(new THREE.BoxGeometry(.4,.02,.02),K);s.position.set(0,.09,.225);s.rotation.z=-.5;hd.add(s);return g;};
MODELS.gusarka=function(){const g=MODELS.macka(),hd=g.userData.parts.head;guHat(hd,.16,.05,0xd8303a);const e=new THREE.Mesh(new THREE.BoxGeometry(.05,.05,.05),std(0xffd23d,{metalness:.7,roughness:.3}));e.position.set(.2,0,.06);hd.add(e);return g;};
pwPets("gusari","luka",[
  {k:"majmun",fav:"bobice",n:"Majmunčić Koko",d:"Nestašni majmunčić iz gusarskog sela. Skakuće po palmama i krade banane kuharici Mici.",gd:"S palmi donosi kokose i zlatnike.",gift:()=>[["bobice",4],["coins",14]],spd:1.6,
   spec:{n:"Majmunski skokovi",d:"Koko skače dvostruko: skoči, pa u zraku skoči još jednom!",ride:1,ic:"star"},ride:{land:1,speed:8.4,jump:11.5,dbl:1,seat:.72},tip:"Koko te nosi! Skoči dvaput zaredom za majmunski skok."},
  {k:"tukan",fav:"bobice",n:"Tukan Kljunko",d:"Šareni tukan s atola. Kljun mu je velik kao banana, a lagan kao pero.",gd:"S mora donosi školjke i bisere.",gift:()=>[["biser",1],["coins",15]],spd:1.3,
   spec:{n:"Tukanov let",d:"Kljunko raširi krila i letite iznad mora! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:9.6,jump:9,seat:.62},tip:"Kljunko leti! Skok je gore, Roni je dolje."}]);
PWIT.dukat={n:"Dukat",mk:g=>{const m=new THREE.MeshStandardMaterial({color:LC(0xffc53d),emissive:LC(0xb07a00),emissiveIntensity:.6,roughness:.25,metalness:.7});const d=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.07,20).rotateX(Math.PI/2),m);g.add(d);
  const e=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.09,16).rotateX(Math.PI/2),new THREE.MeshStandardMaterial({color:LC(0xffe890),emissive:LC(0xc89a20),emissiveIntensity:.6,roughness:.2,metalness:.6}));g.add(e);},glow:0xffe080};
function guCoin(){const g=pwItemMesh("dukat");g.scale.setScalar(1.25);return g;}

/* ---------- terrain ---------- */
const GU={bells:[],gulls:[],dolph:[],flag:null};
function guIsl(x,z,cx,cz,r,top,sd,amp){const dx=x-cx,dz=z-cz,a=Math.atan2(dz,dx),rr=r*(1+.2*(vnoise(Math.cos(a)*1.7+sd,Math.sin(a)*1.7+sd,7)-.5)),d=Math.hypot(dx,dz)/rr;if(d>1.25)return -99;
  const land=sstep(1.25,.75,d);return SL-2+(top-SL+2)*land+(fbm(x*.07+sd,z*.07)-.5)*(amp||1.5)*land;}
function guH(x,z){let h=SL-3+(fbm(x*.03+4,z*.03+9)-.5)*4;
  h=Math.max(h,guIsl(x,z,118,120,42,15,3,2),guIsl(x,z,128,207,15,14,11,1),guIsl(x,z,196,150,11,13,17,.5),guIsl(x,z,160,192,4,13,23,.3),guIsl(x,z,88,192,5,13,29,.3),guIsl(x,z,168,100,4,13,31,.3));
  {const d=Math.hypot(x-122,z-92);if(d<27){const q=Math.max(0,1-Math.max(0,d-9)/18);h=Math.max(h,15+13*sstep(0,1,q));}}
  {const d=Math.hypot(x-74,z-118);if(d<16)h=Math.max(h,SL+2+Math.min(1,(16-d)/5)*2);}
  {const d=Math.hypot(x-196,z-70),rd=Math.abs(d-14);if(rd<4.6)h=Math.max(h,SL+3-(rd>2.4?(rd-2.4)*1.7:0)+(fbm(x*.2,z*.2)-.5)*.5);if(d<11.2)h=Math.min(h,SL-2+(fbm(x*.15,z*.15)-.5)*1.5);
    const dd=Math.hypot(x-210,z-71);if(dd<3.4)h=Math.max(h,SL+5+(3.4-dd)*.3);}
  {const d=Math.hypot(x-56,z-52);if(d<7.2)h=Math.max(h,d<4.6?34:SL+3+(7.2-d)*3.4);}
  return Math.round(h);}
function guGen(){for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,guH(x,z));hmap[x+z*W]=h;const stack=Math.hypot(x-56,z-52)<7.2&&h>SL+4;
    for(let y=0;y<h;y++){let t=T.kamen;if(stack)t=y===h-1?T.trava:T.kamen;else if(y>=h-3)t=h<=SL+3?T.pijesak:(y===h-1?T.trava:T.zemlja);vox[I(x,y,z)]=t;}}
  const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)mask[(x+dx)+(z+dz)*W]=2;};
  const Y=(x,z)=>hmap[x+z*W];
  /* ----- the fort on the hill ----- */
  {const cx=122,cz=92,g=27;for(let dz=-11;dz<=11;dz++)for(let dx=-11;dx<=11;dx++){const x=cx+dx,z=cz+dz;for(let y=g+1;y<H;y++)vox[I(x,y,z)]=0;for(let y=hmap[x+z*W];y<=g;y++)vox[I(x,y,z)]=y===g?T.trava:T.zemlja;hmap[x+z*W]=g+1;}
    for(let dz=-8;dz<=8;dz++)for(let dx=-8;dx<=8;dx++){const x=cx+dx,z=cz+dz,ed=Math.abs(dx)===8||Math.abs(dz)===8;wput(x,g,z,(dx+dz)&1?T.kaldrma:T.kamen,1);
      if(ed){const gate=dz===8&&Math.abs(dx)<=1;for(let h=1;h<=4;h++)if(!(gate&&h<=3))wput(x,g+h,z,h===4?T.kaldrma:T.kcigla,1);if((dx+dz)%2===0&&!gate)wput(x,g+5,z,T.kcigla,1);}}
    for(const [a,b] of [[-8,-8],[8,-8],[-8,8],[8,8]])for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){for(let h=1;h<=7;h++)wput(cx+a+dx,g+h,cz+b+dz,h===7?T.kaldrma:T.kcigla,1);if(dx===0&&dz===0)wput(cx+a,g+8,cz+b,T.lampion,1);}
    /* the vault with the golden grille */
    for(let dx=-3;dx<=3;dx++)for(let dz=-7;dz<=-4;dz++){const ed=Math.abs(dx)===3||dz===-4;for(let h=1;h<=3;h++){if(dz===-4&&Math.abs(dx)<=1){wput(cx+dx,g+h,cz+dz,T.zlato,1);WG.gate.push([cx+dx,g+h,cz+dz]);}else if(ed)wput(cx+dx,g+h,cz+dz,T.kcigla,1);else vox[I(cx+dx,g+h,cz+dz)]=0;}wput(cx+dx,g+4,cz+dz,T.kcigla,1);}
    wput(cx-2,g+1,cz-7,T.zlato,1);wput(cx+2,g+1,cz-7,T.zlato,1);wput(cx-2,g+2,cz-7,T.svjetlo,1);wput(cx+2,g+2,cz-7,T.svjetlo,1);
    /* bell pads and the order flags on the west wall */
    const PAD=[["vuna_c",392],["vuna_z",494],["vuna_t",587],["vuna_b",659]],px=[-6,-4,4,6];
    PAD.forEach(([b,f],i)=>{const x=cx+px[i],z=cz+2;wput(x,g,z,T[b],1);GU.bells.push({x,y:g,z,f,col:new THREE.Color(LC(TCOL(b)))});for(const s of [-1,1]){wput(x+s,g+1,z-1,T.tdaske,1);wput(x+s,g+2,z-1,T.tdaske,1);}wput(x-1,g+3,z-1,T.tdaske,1);wput(x,g+3,z-1,T.tdaske,1);wput(x+1,g+3,z-1,T.tdaske,1);});
    const ORDER=[2,0,3,1];ORDER.forEach((j,i)=>{for(const h of [2,3])wput(cx-8,g+h,cz-2+i,T[PAD[j][0]],1);});wput(cx-8,g+4,cz-3,T.lampion,1);
    pwSeq("zvona",{pads:GU.bells.map(b=>({x:b.x,y:b.y,z:b.z,f:b.f,col:b.col})),order:ORDER,win:"Bim-bam-bum-bom! Zvona su zazvonila pravim redom i vrata male kule su se otvorila!",wrong:"Ups, zvona nisu zazvonila pravim redom. Pogledaj zastavice na zidu i kreni ispočetka!"});
    for(let dz=-1;dz<=1;dz++)for(let dy=1;dy<=3;dy++)for(let dx=-1;dx<=1;dx++){if(dx===0&&dz===0&&dy===2)continue;pwCell("zvona",cx+5+dx,g+dy,cz-5+dz,T.kcigla);}
    wStar("zvona",cx+5.5,g+2.5,cz-4.5,"U maloj kuli u utvrdi. Zazvoni zvonima redom kao što pokazuju zastavice na zidu.");
    /* the cannon that shoots to the sea stack */
    wput(cx-6,g,cz-2,T.zlato,1);pwLaunch({k:"hrid",x:cx-5.5,y:g+1,z:cz-1.5,to:[56.5,34.2,53.5],h:20,dur:2.8,msg:"BUM! Top te ispalio prema visokoj hridi!"});GU.can=[[cx-5.5,g+1,cz-2.6,[56.5,52.5]]];
    WG.isl.utvrda={x:cx,z:cz,y:g+1,r:9};addChest("g_blago",cx,g+1,cz-6,"Riznica utvrde");POI.push({k:"g_utvrda",n:"Stara utvrda",x:cx,z:cz,r:12});busy(cx,cz,11);
    /* a stone path from the village up the hill */
    for(let t=0;t<=1;t+=.01){const x=Math.round(104+(cx-104)*t+Math.sin(t*3)*4),z=Math.round(130+(cz+9-130)*t);for(const w of [-1,0,1]){const X=x+w,yy=hmap[X+z*W]-1;if(vox[I(X,yy,z)]===T.trava){vox[I(X,yy,z)]=T.kaldrma;mask[X+z*W]=2;}}}}
  /* ----- the pirate village ----- */
  {const huts=[[90,128,2,2,T.krov],[86,140,2,2,T.vuna_c],[108,148,2,2,T.vuna_t],[96,118,2,2,T.vuna_z]];for(const [x,z,w,d,r] of huts){const y=Y(x,z)-1;if(y<SL+2)continue;pwHut(x,z,y,{w,d,roof:r,stilt:1});busy(x,z,4);}
    {const x=100,z=134,y=Y(100,134)-1;pwHut(x,z,y,{w:3,d:3,roof:T.vuna_c,wall:T.tdaske});busy(x,z,6);for(const [a,b] of [[-2,-2],[2,-2]])wput(x+a,y+1,z+b,T.bacva,1);wput(x,y+1,z-2,T.stol,1);wput(x-1,y+1,z-1,T.stol,1);wput(x+1,y+1,z-1,T.stol,1);
      for(let i=1;i<=3;i++)for(let j=0;j<4-i;j++)wput(x+4+i,y+1+j,z,j===3-i?T.bacva:T.sdaske,1);
      wStar("krcma",x+.5,y+10,z+.5,"Na krovu krčme Kod sidra. Popni se po bačvama sa strane!");GU.tav={x,y,z};POI.push({k:"g_krcma",n:"Krčma Kod sidra",x,z,r:7});}
    {const x=96,z=144,y=Y(96,144);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)if(a||b)wput(x+a,y,z+b,T.kamen,1);wput(x,y-1,z,T.zar,1);vox[I(x,y,z)]=0;GU.fire={x:x+.5,y,z:z+.5};
      for(const [a,b] of [[-2,-2],[2,2],[-2,2]])wput(x+a,y,z+b,T.drvo,1);}
    [[105,138],[109,136]].forEach(([x,z],i)=>{const y=Y(x,z);for(let a=-1;a<=1;a++){wput(x+a,y,z,a?T.bacva:T.stol,1);wput(x+a,y+2,z,a?[T.vuna_c,T.vuna_t][i]:T.vuna_b,1);}wput(x-1,y+1,z,T.tdaske,1);wput(x+1,y+1,z,T.tdaske,1);busy(x,z,2);});
    /* crates around the huts: bananas wait on top */
    GU.ban=[];[[94,133,2],[82,134,1],[112,152,2],[100,122,1]].forEach(([x,z,n])=>{const y=Y(x,z);for(let i=0;i<n;i++)wput(x,y+i,z,i%2?T.sdaske:T.bacva,1);GU.ban.push([x+.5,y+n+.7,z+.5]);});
    addChest("g_selo",87,Y(87,141),141,"Škrinja u gusarskoj kolibi");POI.push({k:"g_selo",n:"Gusarsko selo",x:96,z:134,r:16});}
  /* ----- the pier and the ship Crni galeb ----- */
  {const pz=147;for(let x=60;x<=88;x++)for(let dz=-1;dz<=1;dz++){const z=pz+dz;if(hmap[x+z*W]>=SL+4)continue;wput(x,SL+3,z,T.sdaske,1);for(let y=SL+4;y<SL+7;y++)vox[I(x,y,z)]=0;if(dz&&x%4===0)for(let y=SL+2;y>=1&&!vox[I(x,y,z)];y--)wput(x,y,z,T.tdaske,1);if(dz&&x%8===2){wput(x,SL+4,z,T.tdaske,1);wput(x,SL+5,z,T.lampion,1);}}
    POI.push({k:"g_mol",n:"Gusarski mol",x:72,z:pz,r:8});guShip(56,154,SL+4,false);}
  /* ----- Otok lubanje: the skull rock ----- */
  {const cx=74,cz=118;for(let x=cx-11;x<=cx+11;x++)for(let z=cz-12;z<=cz+12;z++)for(let y=SL+1;y<=34;y++){const e=Math.pow((x-cx)/9.5,2)+Math.pow((y-23)/9,2)+Math.pow((z-cz)/10,2);const jaw=x>=cx-7&&x<=cx+8&&y>=SL+2&&y<=SL+8&&Math.abs(z-cz)<=7-(y<SL+4?1:0);
      if(e<=1||jaw)wput(x,y,z,hash3(x,y,z)<.1?T.mahovina:hash3(x+3,y,z)<.25?T.sljunak:T.kamen,1);}
    for(let x=cx-9;x<=cx+9;x++)for(let z=cz-9;z<=cz+9;z++)for(let y=SL+3;y<=SL+12;y++){const e=Math.pow((x-cx+1)/7,2)+Math.pow((y-SL-6)/6,2)+Math.pow((z-cz)/7,2);if(e<1){vox[I(x,y,z)]=0;prot[I(x,y,z)]=0;}}
    for(let x=cx-8;x<=cx+8;x++)for(let z=cz-8;z<=cz+8;z++)if(!vox[I(x,SL+3,z)]&&vox[I(x,SL+2,z)])wput(x,SL+2,z,T.pijesak,1);
    for(let x=cx+3;x<=cx+10;x++)for(let z=cz-4;z<=cz+4;z++)for(let y=SL+3;y<=SL+6;y++){vox[I(x,y,z)]=0;prot[I(x,y,z)]=0;}
    for(let z=cz-4;z<=cz+4;z++){if((z-cz)%2===0)wput(cx+8,SL+6,z,T.bijela,1);else wput(cx+8,SL+3,z,T.bijela,1);wput(cx+9,SL+2,z,T.pijesak,1);}
    for(const s of [-1,1])for(let y=21;y<=25;y++)for(let z=cz+s*4-2;z<=cz+s*4+2;z++)for(let x=cx+5;x<=cx+11;x++){if(Math.hypot(z-(cz+s*4),(y-23)*1.1)>2.3)continue;vox[I(x,y,z)]=x<=cx+5?T.duboki:0;prot[I(x,y,z)]=x<=cx+5?1:0;}
    for(let y=17;y<=19;y++)for(let z=cz-(19-y);z<=cz+(19-y);z++)for(let x=cx+6;x<=cx+11;x++){vox[I(x,y,z)]=x===cx+6?T.duboki:0;}
    for(const [a,b] of [[0,.6],[2.2,.3],[3.4,.8],[4.6,.2],[5.6,.5]]){let px=cx-1,py=SL+6,pz=cz;const dx=Math.cos(a),dz=Math.sin(a);for(let i=0;i<12;i++){px+=dx*.6;py+=b*.3;pz+=dz*.6;const X=Math.floor(px),Y2=Math.floor(py),Z=Math.floor(pz);if(vox[I(X,Y2,Z)]){wput(X,Y2,Z,T.svjetlo,1);break;}}}
    for(const [x,z] of [[cx-3,cz+3],[cx-2,cz+4],[cx-3,cz+4],[cx+1,cz-4]])wput(x,SL+3,z,T.zlato,1);wput(cx-4,SL+3,cz-3,T.gljiva,1);wput(cx+2,SL+3,cz+5,T.gljiva,1);
    wStar("lubanja",cx-4.5,SL+4.6,cz+.5,"U špilji u Otoku lubanje. Uđi kroz usta, između zubi!");addChest("g_lubanja",cx-2,SL+3,cz-4,"Blago u lubanji");POI.push({k:"g_lubanja",n:"Otok lubanje",x:cx,z:cz,r:14});busy(cx,cz,12);}
  /* ----- the wreck on the eastern sandbar ----- */
  {const x0=186,L=20,zc=150;for(let u=0;u<=L;u++){const x=x0+u,yd=Math.round(SL+1+u*5/L),yk=yd-5,hw=Math.max(1,Math.round(3.2*Math.pow(Math.sin(Math.PI*(u+1.5)/(L+3)),.6)));
      for(let y=yk;y<=yd;y++){const wy=Math.round(hw*(.55+.45*(y-yk)/Math.max(1,yd-yk)));for(let w=-hw-1;w<=hw+1;w++){const z=zc+w,i=I(x,y,z);if(Math.abs(w)>wy){continue;}
        const edge=Math.abs(w)===wy||y===yk||u===0||u===L;if(y===yd){vox[i]=(hash3(x,y,z)<.16||(u>=13&&u<=14&&Math.abs(w)<=1))?0:T.sdaske;prot[i]=vox[i]?1:0;}else if(edge){vox[i]=hash3(x,y,z)<.1&&y>yk?0:T.tdaske;prot[i]=vox[i]?1:0;}else{vox[i]=0;prot[i]=0;}}}}
    for(let u=0;u<=2;u++)for(let w=-4;w<=4;w++)for(let y=SL-3;y<=SL+4;y++){const i=I(x0+u,y,zc+w);if(prot[i]&&y>SL-2){vox[i]=0;prot[i]=0;}}
    for(let i=0;i<4;i++){const x=202-i,u=x-x0,yk=Math.round(SL+1+u*5/L)-5;for(let y=yk+1;y<=yk+1+i;y++)wput(x,y,zc-1,T.bacva,1);}
    for(let i=0;i<9;i++)wput(196-i,SL+4+Math.max(0,3-Math.floor(i/2)),152+Math.floor(i*.9),T.drvo,1);
    wStar("olupina",203.5,SL+2.4,150.5,"U potpalublju olupine na pješčanom sprudu. Uđi kroz rupu u palubi!");addChest("g_olupina",196,SL-1,151,"Škrinja iz olupine");POI.push({k:"g_olupina",n:"Olupina",x:196,z:150,r:12});busy(196,150,11);}
  /* ----- the atoll and its lagoon ----- */
  {const cx=196,cz=70;for(let z=cz-11;z<=cz+11;z++)for(let x=cx-11;x<=cx+11;x++){const d=Math.hypot(x-cx,z-cz);if(d>11)continue;const h=hmap[x+z*W];if(hash2(x,z,13)<.16&&d<10)wput(x,h,z,[T.koralj_p,T.koralj_r,T.koralj_z,T.koralj_c,T.koralj_l][Math.floor(hash2(x,z,14)*5)]);else if(hash2(x,z,15)<.04)wput(x,h,z,T.prizmarin);}
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)wput(cx+a,hmap[(cx+a)+(cz+b)*W],cz+b,T.prizmarin,1);wStar("laguna",cx+.5,hmap[cx+cz*W]+2.2,cz+.5,"Na dnu lagune u atolu, među koraljima. Zaroni!");
    {const x=210,z=71,y=hmap[x+z*W]-1;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("blago",x+a,y,z+b,(a===b||a===-b)?T.crvena:T.pijesak);pwCell("blago",x+a,y-1,z+b,T.pijesak);}
      wStar("blago",x+.5,y-1.4,z+.5,"Zakopano pod velikim crvenim X-om na atolu. Stani na X i kopaj!");pwDig("blago",x,y,z,"Kopaš, kopaš... i eno ga! Nešto zlatno svjetluca u pijesku!");}
    addChest("g_atol",cx,hmap[cx+(cz-14)*W],cz-14,"Škrinja na atolu");POI.push({k:"g_atol",n:"Atol",x:cx,z:cz,r:18});}
  /* ----- the sea stack ----- */
  {const x=56,z=52,y=34;wStar("hrid",57.5,y+1.1,53.5,"Na vrhu visoke hridi na sjeverozapadu. Do nje te nosi top iz utvrde!");wput(55,y-1,51,T.zlato,1);
    pwLaunch({k:"selo",x:55.5,y,z:51.5,to:[102.5,0,142.5],h:16,dur:2.6,msg:"BUM! Natrag prema gusarskom selu!"});GU.can.push([55.5,y,50.4,[102.5,142.5]]);for(const [a,b] of [[-2,0],[2,1],[0,2]])wput(x+a,y,z+b,T.lisce,1);POI.push({k:"g_hrid",n:"Visoka hrid",x,z,r:8});}
  /* ----- the arrival island: portal, lookout tower, cannon, plank walk ----- */
  {const g=hmap[128+216*W]-1;wPortalArch(128,g,216);WG.portal={x:128.5,y:g+1,z:216.5,ry:Math.PI};WG.spawn={x:128.5,y:hmap[128+207*W],z:207.5,cam:0};busy(128,212,5);
    const tx=136,tz=201,ty=hmap[tx+tz*W];for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)for(let h=0;h<6;h++)wput(tx+dx,ty+h,tz+dz,(dx||dz)?(h%2?T.tdaske:T.drvo):T.drvo,1);
    for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){wput(tx+dx,ty+6,tz+dz,T.sdaske,1);if((Math.abs(dx)===2||Math.abs(dz)===2)&&(dx+dz)%2===0&&!(dz===0&&dx===-2))wput(tx+dx,ty+7,tz+dz,T.tdaske,1);}wput(tx+2,ty+8,tz+2,T.lampion,1);
    for(let i=1;i<=6;i++){const x=tx-9+i,y0=hmap[x+tz*W];for(let h=y0;h<=ty+i-1;h++)wput(x,h,tz,(i%2)?T.sdaske:T.bacva,1);}
    wStar("pristan",tx+.5,ty+8.2,tz+.5,"Na vrhu promatračnice na pristaništu. Popni se po bačvama!");
    wput(141,hmap[141+211*W]-1,211,T.zlato,1);const sb=[194.5,0,158.5];pwLaunch({k:"olupina",x:141.5,y:hmap[141+211*W],z:211.5,to:sb,h:14,dur:2.4,msg:"BUM! Top te nosi do olupine na sprudu!"});GU.can.push([141.5,hmap[141+211*W],210.4,[194.5,158.5]]);
    for(let z=150;z<=200;z++)for(let x=126;x<=130;x++){if(hmap[x+z*W]>=SL+4)continue;const ed=x===126||x===130;wput(x,SL+3,z,(z%3)?T.sdaske:T.tdaske,1);for(let y=SL+4;y<SL+7;y++)vox[I(x,y,z)]=0;
      if(ed&&z%2===0){wput(x,SL+4,z,T.tdaske,1);if(z%8===0)wput(x,SL+5,z,T.lampion,1);}if(ed&&z%4===0)for(let y=SL+2;y>=1&&!vox[I(x,y,z)];y--)wput(x,y,z,T.tdaske,1);}
    POI.push({k:"g_pristan",n:"Pristanište",x:128,z:207,r:12});}
  /* resolve landing heights for the cannons */
  for(const L of PW.launch)if(!L.to[1]){const x=Math.floor(L.to[0]),z=Math.floor(L.to[2]);L.to[1]=floorY(x+.5,H-1,z+.5)+1;}
  /* ----- the race along the plank walk ----- */
  {const pts=[[128.5,0,188.5],[128.5,0,178.5],[128.5,0,168.5],[130.5,0,158.5],[137.5,0,150.5],[144.5,0,143.5],[149.5,0,134.5],[151.5,0,125.5],[149.5,0,116.5]].map(([x,_,z])=>[x,Math.max(WATER,floorY(x,H-1,z)+1)+1.5,z]);
    const st=[128.5,floorY(128.5,H-1,197.5)+1,197.5];const ex=145,ez=111,ey=floorY(ex+.5,H-1,ez+.5)+1;
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)for(let dy=0;dy<3;dy++){if(dx===0&&dz===0&&dy===1)continue;pwCell("utrka",ex+dx,ey+dy,ez+dz,dy===2||(dx&&dz)?T.sdaske:T.bacva);}
    wStar("utrka",ex+.5,ey+1.5,ez+.5,"U sanduku na kraju Gusarske utrke. Utrka počinje kod zlatnog kruga na sjeveru pristaništa.");
    pwRings("utrka",{start:st,pts,time:34,col:0xffd23d,name:"Gusarska utrka",win:"Bravo, stigla si na vrijeme! Sanduk na cilju se otvorio!"});}
  /* ----- the ship's crow's nest star ----- */
  wStar("jarbol",65.5,SL+18.9,153.5,"Na košu na jarbolu broda Crni galeb. Stani kraj jarbola i vjetar te digne!");
  /* ----- palms everywhere they fit ----- */
  GU.palm=[];for(let z=4;z<W-4;z++)for(let x=4;x<W-4;x++){const h=hmap[x+z*W];if(h<SL+3||h>SL+8||mask[x+z*W])continue;if(vox[I(x,h-1,z)]!==T.trava&&vox[I(x,h-1,z)]!==T.pijesak)continue;if(get(x,h,z))continue;
    const atoll=Math.abs(Math.hypot(x-196,z-70)-14)<2;if(hash2(x,z,41)<(atoll?.05:.012)){let ok=true;for(let a=-3;a<=3&&ok;a++)for(let b=-3;b<=3;b++)if(get(x+a,h,z+b)){ok=false;break;}if(ok){const p=pwPalm(x,z);if(p)GU.palm.push(p);}}}
  /* shells for the toucan, bananas for the monkey */
  GU.shell=[[119,211],[192,158],[62,118],[152,108]].map(([x,z])=>[x+.5,floorY(x+.5,H-1,z+.5)+1.4,z+.5]);
  /* ----- loot ----- */
  Object.assign(LOOT,{g_selo:{coins:45,mats:{zeljezo:2},blocks:{tdaske:16,bacva:4,lampion:2},msg:"Gusarske daske i bačve. Sagradi si svoj mol!"},
    g_lubanja:{coins:70,mats:{grumen:2,biser:1},blocks:{zlato:2,kvarc:10},msg:"Zlato iz Otoka lubanje! Gusari su ga skrivali baš ovdje."},
    g_olupina:{coins:55,mats:{bakar:3,biser:1},blocks:{sdaske:16,staklo:4},msg:"Iz olupine: daske, staklo i jedan biser iz školjke."},
    g_atol:{coins:50,mats:{biser:2},blocks:{koralj_r:4,koralj_z:4,prizmarin:8},msg:"Koralji i biseri s atola."},
    g_brod:{coins:80,mats:{grumen:2,smaragd:1},blocks:{vuna_c:8,vuna_b:8},msg:"Kapetanova škrinja s broda Crni galeb! Platno za jedra i malo zlata."},
    g_blago:{coins:300,mats:{dijamant:2,smaragd:2,grumen:5,biser:3},blocks:{zlato:6,lampion:4},msg:"Pravo gusarsko blago! Riznica utvrde je tvoja."}});}
function TCOL(b){const r=TYPES[T[b]];return r&&r.c!=null?r.c:0xffffff;}
/* the ship builder: bow points to +x; wreck=true makes it a broken half-sunk hull */
function guShip(x0,zc,yd,wreck){const L=24;
  for(let u=0;u<=L;u++){const x=x0+u,hw=Math.max(1,Math.round(3.4*Math.pow(Math.sin(Math.PI*(u+1.4)/(L+2.8)),.55))),yk=yd-6;
    for(let y=yk;y<=yd;y++){const wy=Math.max(1,Math.round(hw*(.45+.55*(y-yk)/(yd-yk))));for(let w=-wy;w<=wy;w++){const z=zc+w;wput(x,y,z,y===yd?T.sdaske:y===yd-1?T.bdaske:T.tdaske,1);}}
    for(const w of [-hw,hw]){const z=zc+w;if(!(u>=15&&u<=17&&w<0))wput(x,yd+1,z,T.tdaske,1);}}
  for(let i=1;i<=4;i++){wput(x0+L+i,yd+Math.floor(i/2),zc,T.drvo,1);}wput(x0+L,yd+1,zc,T.tdaske,1);
  /* the stern cabin with the quarterdeck on top */
  for(let u=0;u<=5;u++)for(let w=-3;w<=3;w++){const x=x0+u,z=zc+w;if(vox[I(x,yd,z)]!==T.sdaske)continue;const ed=u===5||Math.abs(w)===3||u===0||!get(x,yd,z+Math.sign(w));
    for(let h=1;h<=2;h++){if(ed&&!(u===5&&w===0))wput(x,yd+h,z,h===2&&u===5&&Math.abs(w)===2?T.staklo:T.tdaske,1);else vox[I(x,yd+h,z)]=0;}wput(x,yd+3,z,T.sdaske,1);}
  for(let w=-3;w<=3;w++)if(get(x0,yd+3,zc+w)){wput(x0,yd+4,zc+w,T.tdaske,1);}wput(x0+1,yd+2,zc-2,T.lampion,1);
  wput(x0+7,yd+1,zc+2,T.bacva,1);wput(x0+6,yd+1,zc+2,T.bacva,1);wput(x0+6,yd+2,zc+2,T.bacva,1);
  addChest("g_brod",x0+1,yd+1,zc+1,"Kapetanova škrinja");
  /* masts, sails, the crow's nest */
  for(const [u,top] of [[9,15],[16,13]]){const x=x0+u;for(let h=1;h<=top;h++)wput(x,yd+h,zc,T.drvo,1);for(let w=-4;w<=4;w++)wput(x,yd+top-3,zc+w,T.drvo,1);
    for(let h=4;h<=top-4;h++)for(let w=-4;w<=4;w++){const bul=Math.abs(w)<=2&&h>5&&h<top-5;wput(x-1-(bul?1:0),yd+h,zc+w,h===top-6?T.vuna_c:T.vuna_b,1);}
    wput(x,yd+top+1,zc,T.vuna_c,1);wput(x,yd+top+1,zc+1,T.vuna_c,1);wput(x,yd+top+2,zc+1,T.vuna_c,1);}
  {const x=x0+9;for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++){if(a===1&&b===0)continue;if(a||b)wput(x+a,yd+13,zc+b,T.sdaske,1);if((Math.abs(a)===2||Math.abs(b)===2)&&(a+b)%2===0)wput(x+a,yd+14,zc+b,T.tdaske,1);}
    WG.wind.push({x:x+1.5,z:zc+.5,r:.95,y0:yd+.5,y1:yd+15.2,k:"jarbol"});}
  POI.push({k:"g_brod",n:"Brod Crni galeb",x:x0+12,z:zc,r:12});GU.ship={x0,zc,yd};}

/* ---------- life ---------- */
function guLife(){S.wq=S.wq||{};
  PW.guide=pwPut("kapetan","Kapetan Kliješto",131.5,205.5,{frozen:true,ry:-2.4,sc:1.8});
  pwPut("kornjaca","Stara Morska",120.5,204.5,{speed:.25,sc:1.5});
  pwPut("gusar","Mornar Brko",73.5,147.5,{frozen:true,ry:Math.PI*.5,y:SL+5});pwPut("gusarka","Kuharica Mica",100.5,133.5,{frozen:true,ry:0,y:hmap[100+134*W]+2});
  pwPut("gusar","Pirat Ribica",95.5,141.5,{speed:.6});pwPut("gusarka","Kapetanica Perla",122.5,96.5,{speed:.5,y:30});
  [["Ara",98.5,128.5],["Kokos",104.5,142.5],["Mango",92.5,136.5]].forEach(([n,x,z])=>pwPut("papiga",n,x,z,{speed:.8}));
  [["Štipko",124.5,214.5],["Rakica",188.5,158.5],["Bočko",64.5,124.5],["Kliško",203.5,73.5],["Mrvica",150.5,146.5]].forEach(([n,x,z])=>pwPut("rak",n,x,z,{speed:.7}));
  [["Bijelko",160.5,192.5],["Krilaš",88.5,192.5],["Vjetrić",168.5,100.5]].forEach(([n,x,z])=>pwPut("galeb",n,x,z,{speed:.6}));
  [["Skok",170.5,170.5],["Val",216.5,90.5]].forEach(([n,x,z])=>{const e=spawn("dupin",n,{swim:true,speed:2,near:{x,z}});e.home={x,z};});
  const ko=pwPut("majmun",PETS.majmun.n,110.5,140.5,{speed:1.4});const tu=pwPut("tukan",PETS.tukan.n,184.5,71.5,{speed:.8});if(!S.met.tukan)tu.frozen=true;
  pwQuest("majmun",{pet:1,en:ko,auto:1,need:4,item:"banana",spots:GU.ban,got:"Banana za Koka",
    ask:"Hi-hi! Ja sam Koko! Kuharica Mica je sakrila banane na sanduke po selu. Doneseš mi četiri? Onda ćemo zajedno skakati po palmama!",
    done:"Njam, njam, banane! Najbolji si prijatelj na svijetu! Popni se, skakat ćemo dvostruko!",fact:"Majmuni se njišu po granama držeći se rukama, a neki i repom, kao da imaju petu ruku."});
  pwQuest("tukan",{pet:1,en:tu,auto:1,need:4,item:"skoljka",spots:GU.shell,got:"Školjka za Kljunka",
    ask:"Kre-kre! Ja sam Kljunko. Gradim gnijezdo od najljepših školjki, ali val mi ih je raznio na četiri otoka: pristanište, sprud s olupinom, Otok lubanje i istočnu plažu. Doneseš mi ih?",
    done:"Kakve divne školjke! Gnijezdo je gotovo. Hvala ti! Hoćeš letjeti sa mnom iznad mora?",fact:"Tukanov kljun izgleda težak, ali je lagan kao spužva jer je iznutra pun zraka."});}
function guEnv(){const B=new THREE.Group();scene.add(B);
  /* bells over the pads */
  const gm=new THREE.MeshStandardMaterial({color:LC(0xffc53d),roughness:.3,metalness:.75});GU.bellM=GU.bells.map(b=>{const g=new THREE.Group();const c=new THREE.Mesh(new THREE.CylinderGeometry(.18,.42,.6,12,1,true),gm);c.position.y=-.3;g.add(c);
    const t=new THREE.Mesh(new THREE.SphereGeometry(.2,10,6,0,Math.PI*2,0,Math.PI/2),gm);g.add(t);const cl=new THREE.Mesh(new THREE.SphereGeometry(.08,8,6),std(0x5a4a3a));cl.position.y=-.55;g.add(cl);g.position.set(b.x+.5,b.y+2.95,b.z-.5);g.traverse(o=>{if(o.isMesh)o.castShadow=true;});B.add(g);return g;});
  for(const [x,y,z,t] of GU.can)pwCannonMesh(x,y,z,Math.atan2(t[0]-x,t[1]-z),.55);
  if(GU.ship){const {x0,zc,yd}=GU.ship;for(const [u,w] of [[11,-3],[11,3],[19,-3],[19,3]])pwCannonMesh(x0+u+.5,yd+1,zc+w+.5-Math.sign(w)*.6,w<0?Math.PI:0,.05);
    const wh=new THREE.Group();const wm=std(0x7a5233);const r=new THREE.Mesh(new THREE.TorusGeometry(.42,.06,6,16),wm);wh.add(r);for(let i=0;i<4;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(1.1,.06,.06),wm);s.rotation.z=i*Math.PI/4;wh.add(s);}wh.position.set(x0+3.5,yd+4.9,zc+.5);wh.rotation.y=Math.PI/2;scene.add(wh);GU.wheel=wh;}
  /* gulls circling in the sky */
  for(let i=0;i<6;i++){const g=MODELS.galeb();g.scale.setScalar(1.2);scene.add(g);GU.gulls.push({g,a:Math.random()*6.28,r:30+i*14,y:28+i*3,sp:(.12+Math.random()*.08)*(i%2?1:-1),cx:118+(i%3)*14,cz:130-(i%2)*30});}
  /* a soft glow over the campfire */
  if(GU.fire){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xff9a40,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.6}));sp.scale.set(3,3,1);sp.position.set(GU.fire.x,GU.fire.y+.4,GU.fire.z);scene.add(sp);GU.fireS=sp;}}
function guTick(dt,tt){const P=FP.p;
  for(const G of GU.gulls){G.a+=G.sp*dt;const x=G.cx+Math.cos(G.a)*G.r,z=G.cz+Math.sin(G.a)*G.r;G.g.position.set(x,G.y+Math.sin(tt*.6+G.r)*1.5,z);const sg=Math.sign(G.sp);G.g.rotation.y=Math.atan2(-Math.sin(G.a)*sg,Math.cos(G.a)*sg);G.g.rotation.z=Math.sin(tt*3+G.r)*.15;}
  const Q=PW.seqs[0];if(Q&&GU.bellM)GU.bellM.forEach((g,i)=>{const lit=Q.m&&Q.m[i]?Q.m[i].material.opacity:0;g.rotation.x=Math.sin(tt*9)*lit*.5;});
  if(GU.wheel)GU.wheel.rotation.x=Math.sin(tt*.4)*.4;
  if(GU.fire&&Math.random()<dt*10)mgSpawn({t:"spark",x:GU.fire.x+(Math.random()-.5)*.4,y:GU.fire.y+.3,z:GU.fire.z+(Math.random()-.5)*.4,vy:1.8,life:.8,size:.12,size2:.02,col:[0xffb040,0xff6a20],add:1});
  if(GU.fireS)GU.fireS.material.opacity=.45+Math.sin(tt*11)*.08+Math.random()*.05;
  if(!FP.on)return;
  if(Math.hypot(P.x-122,P.z-92)<10&&P.y>26)tipOnce("g_utvrda","Stara utvrda! Iza zlatne rešetke je riznica. Zastavice na zidu pokazuju kojim redom treba zazvoniti zvonima.",5200);
  if(Math.hypot(P.x-74,P.z-118)<16)tipOnce("g_lubanja","Otok lubanje! Usta su ulaz u špilju.",3600);
  if(Math.hypot(P.x-68,P.z-154)<12&&P.y>SL+4)tipOnce("g_brod","Brod Crni galeb! Kraj prednjeg jarbola puše vjetar koji te digne do koša.",4600);
  if(Math.hypot(P.x-196,P.z-70)<20)tipOnce("g_atol","Atol! Unutra je plitka laguna s koraljima, a na istočnoj dini nešto je zakopano pod X-om.",4800);}
function guTalk(){const n=wStars("gusari");const need=["majmun","tukan"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.gusari&&S.wst.gusari[s.k]));
  const L=n>=WSTAR_N?(WG.gateOpen?"Zlatna rešetka riznice je otvorena! Utvrda je na brdu, iznad sela. Blago je tvoje, mornarko!":"Svih deset dukata! Rešetka se otvara..."):
    n===0?"Ahoj, mala lisice! Ja sam Kapetan Kliješto. Oluja je raznijela deset zlatnih dukata iz riznice stare utvrde po cijeloj uvali. Nađi ih i zlatna rešetka riznice će se otvoriti! Preko mosta je Otok lubanje sa selom, brodom i utvrdom, a na moru su olupina, atol i visoka hrid. Zlatne ploče kraj topova ispaljuju te preko mora!":
    "Imaš "+n+" od "+WSTAR_N+" dukata. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" A u uvali ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

/* ---------- icons ---------- */
(function(){const D=ITEM_DRAW;
  D.w_gusari=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#7ad0ff");g.addColorStop(1,"#c8f0ff");x.fillStyle=g;x.fillRect(0,0,64,64);x.fillStyle="#2aa8d8";x.fillRect(0,46,64,18);
    P([[6,48],[20,38],[44,38],[58,48]],"#f0d890");x.fillStyle="#7a4a2a";x.fillRect(30,18,3,22);P([[33,14],[33,30],[50,26]],"#ffffff");P([[29,16],[29,28],[14,26]],"#f4f4f4");x.fillStyle="#d8303a";x.fillRect(31,10,9,5);
    x.fillStyle="#ffc53d";x.beginPath();x.arc(14,54,5,0,7);x.fill();x.strokeStyle="#16243a";x.lineWidth=2;x.stroke();};
  D.mg_trail_dukati=(x,P)=>{for(const [cx,cy,r] of [[22,40,12],[42,26,10],[44,48,8]]){x.fillStyle="#ffc53d";x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.lineWidth=3;x.strokeStyle="#16243a";x.stroke();x.fillStyle="#ffe890";x.beginPath();x.arc(cx-2,cy-2,r*.45,0,7);x.fill();}};
  PWIT.banana.n="Banana";})();

pwWorld("gusari",{dist:"luka",lv:5,n:"Gusarska uvala",d:"Tropski otočići, gusarsko selo s krčmom, brod Crni galeb, olupina, laguna s koraljima i topovi koji te ispaljuju preko mora!",
  feat:["Kapetan Kliješto","Majmunčić Koko","Tukan Kljunko","topovi","Gusarska utrka","zakopano blago"],fr:["tdaske","sdaske","zlato"],ca:0xffc53d,cb:0xd8501e,sea:1,fog:.0026,
  preset:{top:0x2f8fea,hz:0xbfeaff,sun:0xfff0d0,si:2.6,hemi:.66,el:.62,az:.9,fog:0xbfe8f8,glow:.35,stars:0,sh:0x3ae0d0,dp:0x1078b8,exp:1.0,night:0},
  gen:guGen,env:guEnv,life:guLife,talk:guTalk,tick:guTick,itemMesh:guCoin,itemCol:[0xffc53d,0xffffff,0xffe890],itemBurst:[[1,.82,.25],[1,1,.8],[1,.9,.5]],itemFx:"star",
  item:{one:"Zlatni dukat",hud:"Dukati",done:"Svi dukati!",all:"Svih 10 zlatnih dukata! Zlatna rešetka u riznici utvrde se otvara!",first:"Prvi dukat! Kompas na vrhu pokazuje put do najbližeg."},
  intro:()=>"Gusarska uvala! Dukati: "+wStars("gusari")+" / "+WSTAR_N+". Kapetan Kliješto te čeka na pristaništu.",
  facts:{pristan:"S visine se vidi mnogo dalje. Zato su mornari stajali na visokim promatračnicama i jarbolima s dalekozorom u ruci.",
    krcma:"Mornari su na dugim plovidbama jeli dvopek, kruh pečen dvaput. Bio je tako tvrd da se nije kvario mjesecima.",
    lubanja:"Gusarska zastava s lubanjom zove se Jolly Roger. Gusari su je dizali da ih drugi brodovi prepoznaju izdaleka.",
    jarbol:"Mjesto za promatrača na vrhu jarbola zove se koš. Odande se brod na pučini vidi i do dvadeset kilometara daleko.",
    olupina:"Na dnu mora leže tisuće starih olupina. Ronioci ih proučavaju jer otkrivaju kako su ljudi nekad gradili brodove i plovili.",
    laguna:"Koraljne grebene grade sićušne životinjice koje se zovu koralji. Grebeni rastu toliko polako da su veliki grebeni stari tisućama godina.",
    hrid:"Visoke stijene usred mora zovu se hridi. Valovi ih stoljećima udaraju i polako oblikuju, kamenčić po kamenčić.",
    blago:"Gusari su vrlo rijetko zakapali blago. Ali priče o kartama s velikim X-om toliko su lijepe da ih pričamo i danas!",
    zvona:"Na brodovima se zvonom mjerilo vrijeme. Svakih pola sata mornar bi udario u zvono, pa su svi znali kad je smjena.",
    utrka:"Papige mogu doživjeti više od pedeset godina, a neke nauče izgovarati i desetke riječi."},
  chat:{"Mornar Brko":["Ovo je Crni galeb, najbrži brod u uvali! Popni se na palubu.","Kraj prednjeg jarbola uvijek puše vjetar. Uhvati ga i odnijet će te gore u koš!","U kapetanovoj kabini na krmi stoji škrinja. Samo tiho, kapetanica spava!"],
    "Kuharica Mica":["Dobro došla u krčmu Kod sidra! Danas kuham juhu od kokosa.","Onaj nestašni Koko mi stalno krade banane!","Kažu da se s krova krčme vidi cijelo selo. Popni se po bačvama."],
    "Pirat Ribica":["Arr! Ja sam najmanji gusar u uvali, ali najglasniji!","Jesi li probala topove? BUM, i letiš preko mora!"],
    "Kapetanica Perla":["Ova utvrda čuva riznicu već sto godina.","Zvona zvone pravim redom samo ako slušaš zastavice na zapadnom zidu: plava, crvena, bijela, žuta."],
    "Stara Morska":["Plivam ovim morem već dvjesto godina, dušo.","Morske kornjače se uvijek vraćaju na plažu na kojoj su se izlegle. Čudesno, zar ne?","Na atolu je laguna. Zaroni i vidjet ćeš koralje svih boja."],
    papiga:["Dukati! Dukati! Kra!","Kapetan Kliješto! Kapetan Kliješto!","Ahoj, mornarko! Ahoj!"],rak:["Klik-klak! Hodam bočno, a ti?","Pazi, ne staj mi na kliješta!","Pijesak je topao, baš kako volim."],galeb:["Kri-kri! Ovo je moj kamen!","Vidjela sam iz zraka nešto zlatno na atolu!"],
    dupin:["Iii-iii! Uhvati me ako možeš!"]},
  finale:{chest:"g_blago",isl:"utvrda",at:{x:122,z:86},rewards:["skin:gusarska","trail:dukati"],locked:"Zlatna rešetka čuva riznicu. Skupi svih 10 zlatnih dukata!",
    kicker:"Uvala slavi!",title:"Blago utvrde",sub:"Gusarska lisica i trag Zlatnih dukata sad su tvoji. A kapetan kaže da si najbolja mornarka u uvali!"}});
