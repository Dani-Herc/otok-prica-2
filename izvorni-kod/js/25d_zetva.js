/* =================== OP2 v11: Jesenska žetva (portal world of Cvjetna dolina) =================== */
/* A golden valley in autumn. A windmill with turning sails and a spiral stair inside, a corn maze, a pumpkin house with a
   glowing face, an orchard with a giant apple tree and hay bale steps, a red barn and a seesaw that flings you onto its
   roof, a hot air balloon you reach on a whirl of leaves, a water mill on the brook, and the golden granary (finale). */
MSKIN.jesen={n:"Jesenska lisica",d:"Krzno boje jesenskog lišća, od zlatne do crvene. Kad potrči, oko nje zaplešu listići.",p:0,rar:"l",O:0xe0701a,W:0xffe8b0,B:0x5a2a10,D:0xc8301a,glowO:.04,fx:"lisce",wr:"Jesenska žetva"};
MTRAIL.listici={n:"Jesenski listići",d:"Iza Ride padaju narančasti, crveni i žuti listići.",p:0,rar:"l",wr:"Jesenska žetva"};
TR.listici=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.5,y:p.y+.7+Math.random()*.4,z:p.z+(Math.random()-.5)*.5,vy:.2,vx:(Math.random()-.5)*.8,vz:(Math.random()-.5)*.8,grav:1.2,life:1.6,size:.24,size2:.2,spin:1,col:[0xe0701a,0xc8301a,0xf0b020,0xa04a10],op:1});TRATE.listici=9;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","jesen",MSKIN.jesen);ins("trail","listici",MTRAIL.listici);}
PRESETS.zetva={top:0x5a8ad8,hz:0xffd8a0,sun:0xffcf8a,si:2.0,hemi:.74,el:.36,az:2.2,fog:0xf0c890,glow:.55,stars:0,sh:0x5a9ab8,dp:0x2a5a8a,exp:.9,night:0};

/* ---------- creatures (blocky) ---------- */
MODELS.kokos=function(){const Wt=0xf6f0e6,R=0xe0302a,Y=0xf0b030,hd={name:"head",px:0,py:.5,pz:.18};
  return mk([[.32,.3,.42,0,.32,0,Wt],[.1,.24,.16,0,.46,-.24,Wt],[.2,.24,.2,0,.56,.2,Wt,hd],[.1,.06,.1,0,.52,.33,Y,hd],[.06,.1,.12,0,.72,.2,R,hd],[.06,.1,.04,0,.44,.3,R,hd],
    [.04,.05,.02,-.07,.6,.305,0x111111,hd],[.04,.05,.02,.07,.6,.305,0x111111,hd],[.04,.18,.04,-.08,.09,0,Y],[.04,.18,.04,.08,.09,0,Y]]);};
MODELS.krava=function(){const Wt=0xf6f2ea,K=0x2a2624,P=0xf0a8a8,hd={name:"head",px:0,py:.95,pz:.62};
  return mk([[.7,.6,1.2,0,.85,0,Wt],[.3,.3,.02,-.2,.95,.605,K],[.36,.3,.02,.14,.8,-.3,K],[.02,.3,.4,.355,.9,.1,K],[.02,.26,.36,-.355,.8,-.2,K],
    [.42,.42,.4,0,1.0,.74,Wt,hd],[.44,.18,.12,0,.86,.96,P,hd],[.06,.06,.02,-.12,1.08,.945,K,hd],[.06,.06,.02,.12,1.08,.945,K,hd],[.06,.14,.06,-.18,1.26,.66,0xe8dcc0,hd],[.06,.14,.06,.18,1.26,.66,0xe8dcc0,hd],
    [.16,.08,.1,-.28,1.12,.66,Wt,hd],[.16,.08,.1,.28,1.12,.66,Wt,hd],[.2,.12,.2,0,.5,-.2,P]].concat(legs(.16,.55,.24,.42,Wt,.55)));};
MODELS.prase=function(){const P=0xf4a8b0,D=0xe08890,K=0x2a1a1a,hd={name:"head",px:0,py:.42,pz:.3};
  return mk([[.44,.36,.6,0,.38,0,P],[.32,.3,.24,0,.44,.38,P,hd],[.16,.12,.06,0,.4,.52,D,hd],[.04,.04,.02,-.04,.4,.555,K,hd],[.04,.04,.02,.04,.4,.555,K,hd],[.05,.05,.02,-.08,.52,.505,K,hd],[.05,.05,.02,.08,.52,.505,K,hd],
    [.1,.1,.04,-.12,.62,.36,D,hd],[.1,.1,.04,.12,.62,.36,D,hd],[.04,.12,.04,0,.5,-.32,D]].concat(legs(.1,.2,.14,.2,D,.2)));};
MODELS.prase2=()=>MODELS.prase();MODELS.kokos2=()=>MODELS.kokos();MODELS.krava2=()=>MODELS.krava();
MODELS.ponij=function(){const G=0xe8b04a,M=0xfff0c8,D=0x8a5a2a,K=0x1a1a1a,hd={name:"head",px:0,py:1.1,pz:.5},tl={name:"tail",px:0,py:.95,pz:-.55};
  return mk([[.5,.5,1.05,0,.82,0,G],[.32,.46,.32,0,1.16,.44,G],[.3,.3,.54,0,1.42,.62,G,hd],[.24,.2,.14,0,1.32,.92,0xd8a040,hd],[.06,.08,.02,-.16,1.48,.74,K,hd],[.06,.08,.02,.16,1.48,.74,K,hd],
    [.08,.12,.06,-.1,1.64,.5,G,hd],[.08,.12,.06,.1,1.64,.5,G,hd],[.08,.5,.22,0,1.42,.38,M,hd],[.08,.42,.24,0,1.12,.3,M],[.12,.5,.12,0,.78,-.6,M,tl],[.52,.06,.5,0,1.08,0,0xc8301a],[.54,.1,.16,0,1.02,.06,D]].concat(legs(.14,.6,.17,.38,G,.6)));};
MODELS.guska=function(){const Gr=0x9a9a92,D=0x6a6a62,Wt=0xf2f0ea,O=0xf08a20,K=0x1a1a1a,hd={name:"head",px:0,py:.9,pz:.36},wl={name:"wl",px:-.2,py:.5,pz:0},wr={name:"wr",px:.2,py:.5,pz:0};
  return mk([[.42,.36,.7,0,.46,0,Gr],[.44,.14,.6,0,.3,0,Wt],[.12,.4,.12,0,.72,.32,K],[.18,.18,.24,0,.96,.38,K,hd],[.1,.06,.16,0,.94,.56,O,hd],[.12,.08,.02,0,.92,.38,Wt,hd],[.04,.04,.02,-.06,.99,.505,0xffffff,hd],[.04,.04,.02,.06,.99,.505,0xffffff,hd],
    [.08,.3,.6,-.24,.52,-.04,D,wl],[.08,.3,.6,.24,.52,-.04,D,wr],[.2,.1,.2,0,.5,-.4,K],[.06,.22,.06,-.1,.12,0,O],[.06,.22,.06,.1,.12,0,O],[.14,.03,.16,-.1,.02,.06,O],[.14,.03,.16,.1,.02,.06,O]]);};
MODELS.strasilo=function(){const S=0xe8c55c,B=0x3a5aa8,R=0xc8301a,H=0x6a4a2a,F=0xf0d8a8,K=0x1a1a1a,hd={name:"head",px:0,py:1.6,pz:0};
  return mk([[.1,1.2,.1,0,.6,0,0x8f603a],[1.6,.1,.1,0,1.25,0,0x8f603a],[.56,.6,.3,0,1.15,0,R],[.2,.16,.3,-.42,1.22,0,R],[.2,.16,.3,.42,1.22,0,R],[.14,.16,.14,-.62,1.2,0,S],[.14,.16,.14,.62,1.2,0,S],
    [.12,.14,.04,-.1,1.0,.16,B],[.12,.14,.04,.12,1.3,.16,B],[.6,.22,.32,0,.82,0,B],[.12,.28,.12,-.14,.62,0,S],[.12,.28,.12,.14,.62,0,S],
    [.42,.42,.4,0,1.66,0,F,hd],[.08,.08,.02,-.1,1.72,.205,K,hd],[.08,.08,.02,.1,1.72,.205,K,hd],[.24,.04,.02,0,1.56,.205,K,hd],[.06,.06,.02,0,1.64,.205,R,hd],
    [.66,.06,.66,0,1.9,0,H,hd],[.36,.24,.36,0,2.04,0,H,hd],[.4,.06,.38,0,1.94,0,R,hd],[.12,.14,.06,-.22,1.48,.1,S,hd],[.12,.14,.06,.22,1.48,.1,S,hd]]);};
MODELS.farmerica=function(){const S=0xf0c8a0,Hr=0xa0501a,D=0x3a6ab8,Sh=0xe8dcc0,K=0x2a1a10,Hat=0xe8c55c,hd={name:"head",px:0,py:1.36,pz:0};
  return mk([[.44,.5,.26,0,.98,0,0xd8402a],[.46,.36,.28,0,.58,0,D],[.48,.1,.3,0,.8,0,D],[.12,.4,.12,-.36,.98,0,0xd8402a],[.12,.4,.12,.36,.98,0,0xd8402a],[.12,.12,.12,-.36,.74,0,S],[.12,.12,.12,.36,.74,0,S],
    [.16,.4,.18,-.11,.2,0,D],[.16,.4,.18,.11,.2,0,D],[.18,.08,.24,-.11,.02,.03,K],[.18,.08,.24,.11,.02,.03,K],
    [.4,.4,.36,0,1.38,0,S,hd],[.06,.06,.02,-.09,1.42,.185,K,hd],[.06,.06,.02,.09,1.42,.185,K,hd],[.14,.04,.02,0,1.3,.185,0xc85a4a,hd],[.42,.3,.12,0,1.42,-.16,Hr,hd],[.12,.36,.12,-.2,1.24,-.12,Hr,hd],[.12,.36,.12,.2,1.24,-.12,Hr,hd],
    [.74,.05,.74,0,1.6,0,Hat,hd],[.42,.18,.4,0,1.7,0,Hat,hd],[.44,.05,.42,0,1.64,0,0xc8301a,hd]]);};
pwPets("zetva","dolina",[
  {k:"ponij",fav:"bobice",n:"Ponij Zlatko",d:"Zlatni ponij s bijelom grivom i crvenim sedlom. Najbrži je na cijelom imanju i voli mrkve.",gd:"S polja donosi mrkve i zlatnike.",gift:()=>[["bobice",4],["coins",20]],spd:2,
   spec:{n:"Galop preko polja",d:"Zlatko galopira brže od vjetra i preskače ograde!",ride:1,ic:"star"},ride:{land:1,speed:11.6,jump:11,seat:1.15},tip:"Zlatko te nosi! Galopiraj preko polja."},
  {k:"guska",fav:"bobice",n:"Divlja guska Siva",d:"Siva divlja guska koja svake jeseni leti na jug. Ovaj put je zastala na imanju da se odmori.",gd:"S ribnjaka donosi perca i zlatnike.",gift:()=>[["bobice",3],["coins",16]],spd:1.2,
   spec:{n:"Let s guskom",d:"Siva te nosi visoko iznad zlatnih polja! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,water:1,speed:9.4,jump:9,seat:.62},tip:"Siva leti! Skok je gore, Roni je dolje."}]);
PWIT.mrkva={n:"Mrkva",mk:g=>{const b=new THREE.Mesh(new THREE.ConeGeometry(.12,.5,6).rotateX(Math.PI),std(0xf08a20,{emissive:LC(0x803a00),emissiveIntensity:.25}));g.add(b);for(const a of [-.4,0,.4]){const l=new THREE.Mesh(new THREE.BoxGeometry(.04,.26,.04),std(0x3ab83a));l.position.set(Math.sin(a)*.06,.34,0);l.rotation.z=a;g.add(l);}},glow:0xffb060};
PWIT.pero={n:"Gusje pero",mk:g=>{const q=new THREE.Mesh(new THREE.BoxGeometry(.03,.5,.03),std(0xf2f0ea));g.add(q);const v=new THREE.Mesh(new THREE.BoxGeometry(.18,.38,.03),std(0x9a9a92,{emissive:LC(0x4a4a42),emissiveIntensity:.2}));v.position.y=.06;g.add(v);g.rotation.z=.4;},glow:0xe0e0d8};
PWIT.klip={n:"Klip kukuruza",mk:g=>{const c=new THREE.Mesh(new THREE.BoxGeometry(.18,.42,.18),std(0xffd23a,{emissive:LC(0xa07a10),emissiveIntensity:.3}));g.add(c);for(const s of [-1,1]){const l=new THREE.Mesh(new THREE.BoxGeometry(.06,.4,.16),std(0x8ac83a));l.position.set(s*.12,-.08,0);l.rotation.z=s*.25;g.add(l);}},glow:0xffe080};
function ztItem(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0xffc83a),emissive:LC(0xe08a10),emissiveIntensity:.8,roughness:.2,metalness:.5});
  const s=new THREE.Mesh(new THREE.SphereGeometry(.24,14,10),m);g.add(s);const l=new THREE.Mesh(new THREE.BoxGeometry(.3,.05,.18),new THREE.MeshStandardMaterial({color:LC(0xe0701a),emissive:LC(0xc84a10),emissiveIntensity:.5,roughness:.4}));l.position.set(.12,.26,0);l.rotation.z=-.4;g.add(l);
  const st=new THREE.Mesh(new THREE.BoxGeometry(.05,.16,.05),std(0x6a4a2a));st.position.y=.28;g.add(st);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffd080,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.8}));sp.scale.set(2.2,2.2,1);g.add(sp);return g;}

/* ---------- the valley ---------- */
const ZTG=SL+2;
const ZT={leaves:[],mrk:[],per:[],klip:[]};
const ztXb=z=>214+Math.sin(z/18)*4;
function ztH(x,z){let h=ZTG+Math.round((fbm(x*.025+5,z*.025+3)-.5)*6);const e=Math.max(Math.abs(x-128),Math.abs(z-128));if(e>104)h=Math.max(h,ZTG+Math.round((e-104)*2+fbm(x*.1,z*.1)*5));
  if(z>=14&&z<=242){const d=Math.abs(x-ztXb(z));if(d<2.4)h=ZTG-3;else if(d<3.6)h=Math.min(h,ZTG);}
  {const d=Math.hypot(x-216,z-170)*(1+.12*(vnoise(x*.2,z*.2,4)-.5));if(d<10)h=Math.min(h,ZTG-4+Math.round(Math.max(0,d-7)*1.4));}
  return h;}
function ztGen(){const Y=(x,z)=>hmap[x+z*W];const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};
  const flat=(x0,z0,x1,z1,g)=>{for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){for(let y=1;y<g;y++)if(!prot[I(x,y,z)])vox[I(x,y,z)]=y===g-1?T.trava:T.zemlja;for(let y=g;y<H;y++)if(!prot[I(x,y,z)])vox[I(x,y,z)]=0;hmap[x+z*W]=g;}};
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,ztH(x,z));hmap[x+z*W]=h;
    for(let y=0;y<h;y++){let t=y<h-4?T.kamen:T.zemlja;if(y===h-1)t=h<ZTG-1?T.pijesak:(hash2(x,z,4)<.025?T.vuna_n:T.trava);vox[I(x,y,z)]=t;}
    if(h<ZTG-1)for(let y=h;y<ZTG-1;y++)vox[I(x,y,z)]=T.voda;}
  busy(128,190,9);busy(124,184,4);
  /* ----- the windmill (spiral stair inside, room at the top) ----- */
  {const cx=128,cz=104,g=ZTG;flat(118,94,138,114,g);const top=g+18;const RING=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
    for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const d=Math.hypot(dx,dz);if(d>4.6)continue;for(let y=g;y<top;y++){if(d<3.4){vox[I(cx+dx,y,cz+dz)]=0;continue;}if(dz>=4&&dx===0&&y<g+2)continue;
        let t=(y-g)<3?T.kcigla:T.bijela;if(y%5===3&&(dx===0||dz===0))t=T.staklo;wput(cx+dx,y,cz+dz,t,1);}}
    for(let y=g;y<top;y++)wput(cx,y,cz,T.drvo,1);for(let k=0;k<top-g;k++){const [a,b]=RING[(2+k)%8];wput(cx+a,g+k,cz+b,T.sdaske,1);}
    {const [ha,hb]=RING[(2+top-g-1)%8],[ia,ib]=RING[(2+top-g-2)%8];for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const d=Math.hypot(dx,dz);if(d>5.3)continue;if(dx===ha&&dz===hb||dx===ia&&dz===ib)continue;wput(cx+dx,top,cz+dz,d>4.6?T.tdaske:T.sdaske,1);if(d>4.6&&(dx+dz)%2===0)wput(cx+dx,top+1,cz+dz,T.tdaske,1);}}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d>3.3)continue;for(let y=top+1;y<top+5;y++){if(d<2.4)continue;if(dz>=2&&dx===0&&y<top+3)continue;wput(cx+dx,y,cz+dz,(y===top+2&&(dx===0||dz===0))?T.staklo:T.sdaske,1);}}
    for(let k=0;k<6;k++){const r=4.2-k*.75;if(r<.3)break;for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)if(Math.hypot(dx,dz)<=r)wput(cx+dx,top+5+k,cz+dz,k%2?T.cigla:T.tdaske,1);}
    wStar("vjetrenjaca",cx+.5,top+1.9,cz-1.5,"U sobici na vrhu vjetrenjače. Uđi unutra i penji se zavojitim stubama oko osovine!");ZT.mill={x:cx+.5,y:top+3,z:cz+5.6};
    busy(cx,cz,10);POI.push({k:"j_mlin",n:"Vjetrenjača",x:cx,z:cz,r:8});}
  /* ----- the corn maze ----- */
  {const X0=44,Z0=52,N=21;const open=[];for(let i=0;i<N*N;i++)open.push(0);const O=(a,b)=>a>=0&&b>=0&&a<N&&b<N;
    const st=[[11,11]];open[11+11*N]=1;let seed=7;const rnd=()=>{seed++;return hash2(seed,seed*3,77);};
    while(st.length){const [a,b]=st[st.length-1];const nb=[[2,0],[-2,0],[0,2],[0,-2]].filter(([u,v])=>O(a+u,b+v)&&a+u>0&&b+v>0&&a+u<N-1&&b+v<N-1&&!open[a+u+(b+v)*N]);
      if(!nb.length){st.pop();continue;}const [u,v]=nb[Math.floor(rnd()*nb.length)];open[a+u/2+(b+v/2)*N]=1;open[a+u+(b+v)*N]=1;st.push([a+u,b+v]);}
    for(let a=9;a<=13;a++)for(let b=9;b<=13;b++)open[a+b*N]=1;open[11+(N-1)*N]=1;open[11+(N-2)*N]=1;open[11+0*N]=0;
    flat(X0-2,Z0-2,X0+N*2+1,Z0+N*2+1,ZTG);
    for(let b=0;b<N;b++)for(let a=0;a<N;a++)for(let q=0;q<2;q++)for(let r=0;r<2;r++){const x=X0+a*2+q,z=Z0+b*2+r;vox[I(x,ZTG-1,z)]=open[a+b*N]?T.oranica:T.trava;
      if(!open[a+b*N])for(let h=0;h<3;h++)wput(x,ZTG+h,z,h<2?(hash3(x,h,z)<.12?T.sijeno:T.lisce_b):(hash3(x,h,z)<.5?T.sijeno:T.lisce_b),1);}
    const cx=X0+11*2+1,cz=Z0+11*2+1;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)wput(cx+a,ZTG-1,cz+b,T.sijeno,1);
    wStar("labirint",cx+.5,ZTG+.9,cz+.5,"U samom središtu kukuruznog labirinta na sjeverozapadu. Ne odustaj u slijepim ulicama!");addChest("j_labirint",cx+2,ZTG,cz+2,"Škrinja u labirintu");
    ZT.mazeKlip=[[X0+1*2+1,Z0+1*2+1],[X0+19*2+1,Z0+1*2+1]];ZT.maze={x:X0+21,z:Z0+N*2+1};busy(X0+21,Z0+21,25);POI.push({k:"j_labirint",n:"Kukuruzni labirint",x:X0+21,z:Z0+21,r:22});}
  /* ----- the pumpkin house with a glowing face ----- */
  {const cx=66,cz=150,g=ZTG;flat(56,140,76,164,g);for(let dz=-8;dz<=8;dz++)for(let dx=-8;dx<=8;dx++)for(let y=g;y<g+11;y++){const e=(dx*dx+dz*dz)/49+Math.pow((y-g-4)/5.6,2);if(e>1)continue;const X=cx+dx,Z=cz+dz;
      if(e<.62){vox[I(X,y,Z)]=0;continue;}const an=Math.atan2(dz,dx);let t=(Math.floor((an+Math.PI)/(Math.PI/6))%2)?T.bundeva:T.vuna_n;
      if(dz>0){const fy=y-g;if((fy===6||fy===7)&&(Math.abs(dx-2.5)<1||Math.abs(dx+2.5)<1))t=T.lampion;if(fy===3&&Math.abs(dx)<=3)t=T.lampion;if(fy===4&&(Math.abs(dx)===3||Math.abs(dx)===1))t=T.lampion;if(fy===2&&Math.abs(dx)<=1)t=T.lampion;}
      wput(X,y,Z,t,1);}
    for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)if(dx*dx+dz*dz<30)vox[I(cx+dx,g-1,cz+dz)]=T.daske;
    for(let k=0;k<3;k++)wput(cx,g+10+k,cz,T.vuna_zl,1);wput(cx+1,g+12,cz,T.lisce,1);
    {for(let zz=cz+1;zz<=cz+6;zz++)for(let h=0;h<2;h++){vox[I(cx,g+h,zz)]=0;prot[I(cx,g+h,zz)]=0;}for(let h=0;h<2;h++)pwCell("slamko",cx,g+h,cz+5,T.vuna_n);}
    wStar("bundeva",cx+.5,g+.9,cz+.5,"U kućici od goleme bundeve. Strašilo Slamko čuva vrata!");ZT.slamko={x:cx+2.5,z:cz+10.5};wput(cx-2,g+3,cz-3,T.lampion,1);
    for(const [x,z,r] of [[50,160,2],[54,140,3],[80,162,2],[82,140,2]]){for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)for(let y=0;y<r*2;y++){if(dx*dx+dz*dz+((y-r+.5)*1.2)**2<=r*r+.5)wput(x+dx,g+y,z+dz,(dx+dz)&1?T.bundeva:T.vuna_n,1);}wput(x,g+r*2,z,T.vuna_zl,1);}
    busy(cx,cz,16);POI.push({k:"j_bundeva",n:"Bundeva-kuća",x:cx,z:cz,r:14});}
  /* ----- the orchard and the giant apple tree with hay bale steps ----- */
  {for(let z=42;z<=96;z+=8)for(let x=146;x<=200;x+=8){if(Math.hypot(x-172,z-64)<14)continue;const g=Y(x,z);if(g<ZTG-1||g>ZTG+3||mask[x+z*W])continue;for(let y=g;y<g+4;y++)wput(x,y,z,T.drvo,1);
      for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)for(let y=g+3;y<=g+7;y++){const e=(dx*dx+dz*dz)/10+((y-g-5)**2)/5;if(e<1&&hash3(x+dx,y,z+dz)<.9&&!get(x+dx,y,z+dz))wput(x+dx,y,z+dz,hash3(x+dx,y+3,z+dz)<.1?T.crvena:(hash2(x,z,8)<.35?T.jesen:T.lisce),1);}busy(x,z,3);}
    const cx=172,cz=64,g=ZTG;flat(162,54,182,84,g);for(let y=g;y<g+15;y++)for(const [a,b] of [[0,0],[1,0],[0,1],[1,1]])wput(cx+a,y,cz+b,T.drvo,1);
    for(let dz=-9;dz<=10;dz++)for(let dx=-9;dx<=10;dx++)for(let y=g+11;y<=g+23;y++){const e=((dx-.5)**2+(dz-.5)**2)/72+((y-g-17)**2)/36;if(e<1&&e>.25&&hash3(cx+dx,y,cz+dz)<.9)wput(cx+dx,y,cz+dz,hash3(cx+dx,y+7,cz+dz)<.09?T.crvena:(hash3(cx,y,cz+dz)<.25?T.jesen:T.lisce),1);}
    const P=g+14;for(let dz=-4;dz<=5;dz++)for(let dx=-4;dx<=5;dx++){const d=Math.hypot(dx-.5,dz-.5);if(d>4.4)continue;if(dx>=0&&dx<=1&&dz>=0&&dz<=1)continue;wput(cx+dx,P,cz+dz,T.daske,1);for(let y=P+1;y<P+4;y++)if(!prot[I(cx+dx,y,cz+dz)]||get(cx+dx,y,cz+dz)!==T.drvo)vox[I(cx+dx,y,cz+dz)]=0;}
    for(let k=0;k<=13;k++){const z=cz+18-k;for(const a of [0,1]){const x=cx+a;for(let y=g;y<=g+k;y++)wput(x,y,z,y===g+k?T.sijeno:T.bdaske,1);for(let y=g+k+1;y<g+k+5;y++)vox[I(x,y,z)]=0;}}
    for(let z=cz+5;z<=cz+6;z++)for(const a of [0,1])for(let y=P+1;y<P+4;y++)vox[I(cx+a,y,z)]=0;
    wStar("jabuka",cx+3.5,P+1.9,cz+.5,"Na platformi u krošnji golemog stabla jabuke. Penji se po stubama od bala sijena!");addChest("j_jabuka",cx-3,P+1,cz+1,"Škrinja u krošnji");
    busy(cx,cz,12);POI.push({k:"j_vocnjak",n:"Voćnjak",x:172,z:70,r:26});}
  /* ----- the red barn and the seesaw ----- */
  {const cx=96,cz=174,w=7,d=6,h=7,g=ZTG;flat(86,165,106,198,g);for(let dz=-d;dz<=d;dz++)for(let dx=-w;dx<=w;dx++){const edge=Math.abs(dx)===w||Math.abs(dz)===d,corner=Math.abs(dx)===w&&Math.abs(dz)===d;
      for(let y=g;y<g+h;y++){if(!edge){vox[I(cx+dx,y,cz+dz)]=0;continue;}if(dz===d&&Math.abs(dx)<=1&&y<g+4)continue;let t=corner||y===g+h-1?T.bdaske:T.crvena;if(dz===d&&Math.abs(dx)===2&&y<g+4)t=T.bdaske;if(y===g+3&&dz===d&&Math.abs(dx)<=1)t=T.bdaske;wput(cx+dx,y,cz+dz,t,1);}}
    for(let k=0;k<=d+1;k++){const y=g+h+k;for(let dx=-w-1;dx<=w+1;dx++)for(const s of [-1,1]){const dz=s*(d+1-k);wput(cx+dx,y,cz+dz,k===d+1?T.tdaske:(k%2?T.cigla:T.tdaske),1);}if(k<=d)for(let dz=-(d-k);dz<=d-k;dz++)for(const s of [-1,1])wput(cx+s*w,y,cz+dz,T.crvena,1);}
    wput(cx,g+h+3,cz+d,T.svjetlo,1);for(let dz=-d+1;dz<=d-1;dz+=2)for(let dx=-w+1;dx<=w-1;dx+=3)if(hash2(dx,dz,3)<.5)wput(cx+dx,g,cz+dz,T.sijeno,1);
    const ridge=g+h+d+1;wStar("stala",cx+.5,ridge+1.9,cz+.5,"Na sljemenu krova crvene štale. Klackalica ispred štale baca te ravno gore!");
    const sx=96;for(const x of [95,96,97])wput(x,g,192,T.drvo,1);for(let z=189;z<=195;z++)wput(sx,z===195?g:g+1,z,T.daske,1);wput(sx,g,189,T.sijeno,1);for(let z=189;z<=191;z++)wput(sx,g+2,z,T.sijeno,1);
    pwLaunch({k:"klackalica",x:sx+.5,y:g+1,z:195.5,to:[cx+.5,0,cz+.5],h:10,dur:2,col:[0xffd060,0xe0701a],msg:"HOP! Bala sijena pala je na klackalicu i odbacila te na krov štale!"});ZT.saw={x:sx+.5,z:195.5};
    for(let dz=-3;dz<=3;dz++)for(let dx=-4;dx<=4;dx++)if(dx*dx/16+dz*dz/9<1)vox[I(78+dx,g-1,186+dz)]=T.blato;
    busy(cx,cz,10);busy(sx,192,4);busy(78,186,5);POI.push({k:"j_stala",n:"Crvena štala",x:cx,z:cz,r:10});}
  /* ----- the hot air balloon over a whirl of leaves ----- */
  {const wx=160,wz=150,g=ZTG;flat(154,144,170,156,g);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)if(dx*dx+dz*dz<=5)vox[I(wx+dx,g-1,wz+dz)]=T.vuna_n;
    const bx=164,bz=150,by=g+24;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(bx+dx,by,bz+dz,T.tdaske,1);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){if(Math.abs(dx)<2&&Math.abs(dz)<2)continue;wput(bx+dx,by,bz+dz,T.sdaske,1);if((dx+dz)%2===0)wput(bx+dx,by+1,bz+dz,T.sdaske,1);}
    for(const [a,b] of [[-2,-2],[2,-2],[-2,2],[2,2]])for(let y=by+1;y<by+7;y++)wput(bx+a,y,bz+b,T.tdaske,1);
    const C=[T.vuna_c,T.vuna_z,T.vuna_n,T.vuna_p];for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++)for(let y=by+6;y<=by+20;y++){const yy=y-by-13;const e=(dx*dx+dz*dz)/(yy<0?36+yy*2.2:42)+yy*yy/49;if(e>1||e<.7)continue;const an=Math.atan2(dz,dx);wput(bx+dx,y,bz+dz,C[(Math.floor((an+Math.PI)/(Math.PI/4))+8)%4],1);}
    WG.wind.push({x:wx+.5,z:wz+.5,r:1.6,y0:g,y1:by+3,k:"lisce"});ZT.whirl={x:wx+.5,y:g,z:wz+.5,top:by+3};
    wStar("balon",bx+.5,by+1.9,bz+.5,"U košari balona koji lebdi nad poljem. Uskoči u vrtlog lišća i pusti da te digne!");busy(wx,wz,8);POI.push({k:"j_balon",n:"Balon",x:bx,z:bz,r:8});}
  /* ----- the golden granary (finale) ----- */
  {const cx=128,cz=148,g=ZTG;flat(119,139,137,158,g);for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const d=Math.hypot(dx,dz);if(d>5.6)continue;for(let y=g;y<g+9;y++){const edge=d>4.5;if(!edge){vox[I(cx+dx,y,cz+dz)]=0;continue;}
        if(dz>=5&&Math.abs(dx)<=1&&y<g+3){wput(cx+dx,y,cz+dz,T.kristal,1);WG.gate.push([cx+dx,y,cz+dz]);continue;}wput(cx+dx,y,cz+dz,(y-g)%3===2?T.sdaske:T.bdaske,1);}}
    for(let k=0;k<7;k++){const r=5.8-k*.9;if(r<.3)break;for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++)if(Math.hypot(dx,dz)<=r)wput(cx+dx,g+9+k,cz+dz,T.zlato,1);}wput(cx,g+16,cz,T.svjetlo,1);
    for(const [a,b] of [[-2,-2],[2,-2],[-2,2],[2,2],[0,-3]])wput(cx+a,g,cz+b,T.sijeno,1);wput(cx,g+4,cz-4,T.lampion,1);
    WG.isl.zitnica={x:cx,z:cz,y:g,r:4};addChest("j_blago",cx,g,cz,"Blago zlatne žitnice");busy(cx,cz,9);POI.push({k:"j_zitnica",n:"Zlatna žitnica",x:cx,z:cz,r:8});}
  /* ----- the water mill on the brook ----- */
  {const z=120,xb=Math.round(ztXb(z));const g=ZTG;flat(xb-12,z-6,xb-5,z+6,g);for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const X=xb-9+dx,Z=z+dz;for(let y=g;y<g+5;y++){const edge=Math.abs(dx)===3||Math.abs(dz)===3;if(!edge){vox[I(X,y,Z)]=0;continue;}if(dx===-3&&dz===0&&y<g+2)continue;wput(X,y,Z,y<g+2?T.kamen:T.sdaske,1);}}
    for(let k=0;k<=4;k++)for(let dz=-4+k;dz<=4-k;dz++)for(let dx=-4;dx<=4;dx++)wput(xb-9+dx,g+5+k,z+dz,k%2?T.krov:T.tdaske,1);
    for(let x=xb-5;x<=xb-3;x++)wput(x,g+1,z,T.drvo,1);
    wStar("vodenica",xb+.5,g-2.5,z+2.5,"Na dnu potoka, iza mlinskog kola vodenice na istoku. Zaroni!");ZT.wheel={x:xb+.5,y:g+1,z:z+.5};busy(xb-9,z,7);POI.push({k:"j_vodenica",n:"Vodenica",x:xb,z,r:8});
    for(const bz of [60,200]){const bxb=Math.round(ztXb(bz));for(let dx=-4;dx<=4;dx++)for(let w=-1;w<=1;w++){wput(bxb+dx,g-1,bz+w,T.tdaske,1);for(let y=g;y<g+4;y++)if(!prot[I(bxb+dx,y,bz+w)])vox[I(bxb+dx,y,bz+w)]=0;}for(let dx=-4;dx<=4;dx++)for(const w of [-2,2])wput(bxb+dx,g,bz+w,T.sdaske,1);busy(bxb,bz,5);}}
  /* ----- fruit baskets (sequence) ----- */
  {const cx=100,cz=128;const L=[["crvena",523],["vuna_z",659],["vuna_lj",784],["vuna_n",988]],PP=[[-4,-2],[-1,-4],[3,-3],[4,1]],ORD=[3,1,2,0];
    const pads=PP.map(([a,b],i)=>{const x=cx+a,z=cz+b,y=Y(x,z)-1;vox[I(x,y,z)]=T[L[i][0]];prot[I(x,y,z)]=1;const ox=a>0?1:-1;wput(x+ox,y+1,z,T.sdaske,1);wput(x+ox,y+2,z,T[L[i][0]],1);
      return {x,y,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    {const x=cx,z=cz+5,y=Y(x,z);for(let a=-2;a<=2;a++)for(let h=0;h<5;h++)wput(x+a,y+h,z,T.tdaske,1);ORD.forEach((j,i)=>wput(x,y+4-i,z-1,T[L[j][0]],1));}
    {const x=cx,z=cz,y=Y(x,z);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("kosare",x+a,y+h,z+b,h===2?T.tdaske:T.sdaske);}wStar("kosare",x+.5,y+.9,z+.5,"U drvenom sanduku među košarama voća. Stani na ploče redom kao na ploči s voćem!");}
    pwSeq("kosare",{pads,order:ORD,win:"Voće je posloženo kako treba! Sanduk u sredini se otvorio.",wrong:"Ups, krivo voće. Pogledaj drvenu ploču, odozgo prema dolje, i kreni ispočetka!"});busy(cx,cz,7);POI.push({k:"j_kosare",n:"Košare voća",x:cx,z:cz,r:8});}
  /* ----- the potato field (dig) ----- */
  {const bx=154,bz=182;for(let dz=-6;dz<=6;dz++)for(let dx=-7;dx<=7;dx++){const X=bx+dx,Z=bz+dz,y=Y(X,Z)-1;vox[I(X,y,Z)]=T.oranica;if(dz%2===0&&(dx+dz)%3!==0&&Math.abs(dx)>1)wput(X,y+1,Z,T.lisce,1);}
    const y=Y(bx,bz)-1;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("polje",bx+a,y,bz+b,(a===b||a===-b)?T.crvena:T.oranica);pwCell("polje",bx+a,y-1,bz+b,T.zemlja);}
    wStar("polje",bx+.5,y-.4,bz+.5,"Zakopano pod crvenim X-om u polju krumpira. Kopaj!");pwDig("polje",bx,y,bz,"Kopaš, kopaš... krumpir, krumpir... i zlatna jabučica!");busy(bx,bz,8);POI.push({k:"j_polje",n:"Polje krumpira",x:bx,z:bz,r:8});}
  /* ----- path of autumn leaves (rings) ----- */
  {const pts=[[104,120],[96,108],[96,96],[104,84],[118,74],[134,74],[142,88],[144,104],[140,122],[124,132]].map(([x,z])=>[x+.5,Y(x,z)+1.8,z+.5]);for(const p of pts)busy(Math.floor(p[0]),Math.floor(p[2]),2);
    const cx=114,cz=150,g=Y(cx,cz);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("lisce",cx+a,g+h,cz+b,(a+b+h)%2?T.jesen:T.vuna_n);}
    wStar("lisce",cx+.5,g+.9,cz+.5,"U hrpi lišća kraj žitnice. Otvara se kad prođeš stazu jesenskog lišća!");busy(cx,cz,3);
    pwRings("lisce",{start:[112.5,Y(112,140),140.5],pts,time:60,col:0xf08a20,name:"Staza jesenskog lišća",win:"Prošla si cijelu stazu lišća! Hrpa lišća kraj žitnice se rasula."});}
  /* pickups */
  ZT.mrk=[[110,192],[150,198],[84,206],[140,166]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  ZT.per=[[200,100],[180,206],[40,186]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  ZT.klip=ZT.mazeKlip.concat([[60,124],[100,214],[30,104]]).map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  /* autumn trees, hay bales and small pumpkins */
  for(let z=10;z<W-10;z+=8)for(let x=10;x<W-10;x+=8){const X=x+Math.floor(hash2(x,z,51)*5),Z=z+Math.floor(hash2(x,z,52)*5);if(mask[X+Z*W]||mask[X+1+Z*W]||mask[X+(Z+1)*W])continue;const g=Y(X,Z);if(g<ZTG||g>ZTG+5)continue;
    const r=hash2(X,Z,53);if(r<.36){const h=5+Math.floor(hash2(X,Z,54)*4),c=hash2(X,Z,55)<.55?T.jesen:(hash2(X,Z,56)<.5?T.lisce_b:T.lisce),bz=hash2(X,Z,57)<.3;for(let y=g;y<g+h;y++)wput(X,y,Z,bz?T.breza_d:T.drvo);
      for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)for(let y=g+h-2;y<=g+h+2;y++){const e=(dx*dx+dz*dz)/10+((y-g-h)**2)/6;if(e<1&&hash3(X+dx,y,Z+dz)<.88&&!get(X+dx,y,Z+dz))wput(X+dx,y,Z+dz,c);}
      for(let i=0;i<2;i++){const a=X-3+Math.floor(hash2(X,i,58)*7),b=Z-3+Math.floor(hash2(Z,i,59)*7);if(Y(a,b)===g&&!get(a,g,b))vox[I(a,g-1,b)]=T.vuna_n;}}
    else if(r<.46){for(let a=0;a<2;a++)for(let b=0;b<2;b++)wput(X+a,g,Z+b,T.sijeno);if(hash2(X,Z,60)<.5)for(let a=0;a<2;a++)wput(X+a,g+1,Z,T.sijeno);}
    else if(r<.54){wput(X,g,Z,T.bundeva);if(hash2(X,Z,61)<.5)wput(X+1,g,Z+1,T.bundeva);}}
  for(const P of [ZT.mrk,ZT.per,ZT.klip])for(const p of P)p[1]=Y(Math.floor(p[0]),Math.floor(p[2]))+1.3;
  /* the portal */
  {const x=128,z=200,g=Y(x,z);for(let dz=-12;dz<=6;dz++)for(let dx=-5;dx<=5;dx++){const X=x+dx,Z=z+dz;for(let y=Y(X,Z);y<g;y++)wput(X,y,Z,T.trava);for(let y=g;y<H;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;hmap[X+Z*W]=g;}
    wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:g,z:z-8.5,cam:0};}
  Object.assign(LOOT,{j_labirint:{coins:55,mats:{smaragd:1},blocks:{sijeno:12,lisce_b:10},msg:"U srcu labirinta: sijeno i kukuruzno lišće za tvoj vlastiti labirint."},
    j_jabuka:{coins:55,mats:{ametist:1},blocks:{jesen:14,drvo:8},msg:"Jesensko lišće iz krošnje! Posadi jesen na svom otoku."},
    j_blago:{coins:330,mats:{dijamant:2,smaragd:2,ametist:3},blocks:{jesen:16,bundeva:8,sijeno:12,zlato:4},msg:"Blago zlatne žitnice! Cijela jesen u jednoj škrinji."}});}

/* ---------- life ---------- */
function ztLife(){S.wq=S.wq||{};
  PW.guide=pwPut("farmerica","Farmerica Jesenka",124.5,186.5,{frozen:true,ry:Math.PI*.8,sc:1.3});
  const sl=pwPut("strasilo","Strašilo Slamko",ZT.slamko.x,ZT.slamko.z,{frozen:true,ry:0,sc:1.3});
  [[108,168],[112,174],[106,180],[114,164]].forEach(([x,z],i)=>pwPut("kokos2",["Koka","Pirgica","Šarenka","Kokodaka"][i],x+.5,z+.5,{speed:.8,sc:1.2}));
  [[146,112],[136,126]].forEach(([x,z],i)=>pwPut("krava2",["Milka","Rumenka"][i],x+.5,z+.5,{speed:.3}));
  [[76,184],[80,188],[78,183]].forEach(([x,z],i)=>pwPut("prase2",["Blatko","Rozi","Njuškica"][i],x+.5,z+.5,{speed:.6}));
  [[150,124],[156,116]].forEach(([x,z],i)=>pwPut("ovca",["Bijelka","Kovrčica"][i],x+.5,z+.5,{speed:.5}));
  [[206,160],[208,178],[228,170]].forEach(([x,z],i)=>pwPut("patka",["Gaga","Kvak","Patkica"][i],x+.5,z+.5,{speed:.6}));
  pwPut("jez","Ježić Jabučić",184.5,80.5,{speed:.6});pwPut("vjeverica","Vjeverica Lješnjakica",160.5,52.5,{speed:1});pwPut("zec","Zeko Mrkvić",120.5,176.5,{speed:1});
  const po=pwPut("ponij",PETS.ponij.n,148.5,104.5,{speed:.5});const gu=pwPut("guska",PETS.guska.n,204.5,150.5,{speed:.5});
  pwQuest("ponij",{pet:1,en:po,auto:1,need:4,item:"mrkva",spots:ZT.mrk,got:"Mrkva",
    ask:"Iiiha! Ja sam Zlatko. Jesen je vrijeme mrkvi, a ja sam ih rasuo po cijelom imanju dok sam galopirao. Doneseš mi četiri? Narančaste su, vidi ih se izdaleka.",
    done:"Njam, hrsk, hrsk! Najslađe mrkve! Sad smo prijatelji. Popni se u sedlo, galopirat ćemo preko polja!",fact:"Konji spavaju i stojeći! Noge im se zaključaju pa ne padnu ni kad drijemaju."});
  pwQuest("guska",{pet:1,en:gu,auto:1,need:3,item:"pero",spots:ZT.per,got:"Gusje pero",
    ask:"Ga-ga! Ja sam Siva. Letim na jug, ali vjetar mi je otpuhao tri pera. Bez njih ne mogu dalje. Pomogneš mi ih naći?",
    done:"Ga-ga-ga! Krila su opet cijela. Prije nego odletim na jug, hoćeš letjeti sa mnom iznad imanja?",fact:"Divlje guske lete na jug u obliku slova V. Tako manje troše snage, jer svaka leti u zavjetrini one ispred sebe."});
  pwQuest("slamko",{en:sl,need:5,item:"klip",spots:ZT.klip,got:"Klip kukuruza",cage:"slamko",
    ask:"Dobar dan, mala lisice! Ja sam strašilo Slamko. Vrane su mi ukrale pet klipova kukuruza i razbacale ih po imanju, čak i u labirint! Doneseš mi ih? Onda ti otvaram bundeva-kuću.",
    done:"Svih pet klipova! Sad imam dovoljno za zimu. Bundeva-kuća je otvorena, uđi slobodno!",thanks:"Vrane me se opet boje. Hvala ti!",remind:"Klipovi su žuti. Dva su u kukuruznom labirintu, u kutovima."});}
function ztEnv(){
  /* windmill sails */
  {const g=new THREE.Group();const Wd=std(0x8a6a4a),Cl=std(0xf2ead8,{side:THREE.DoubleSide});const hub=new THREE.Mesh(new THREE.BoxGeometry(.8,.8,.8),Wd);g.add(hub);
    for(let i=0;i<4;i++){const arm=new THREE.Group();arm.rotation.z=i*Math.PI/2;const bar=new THREE.Mesh(new THREE.BoxGeometry(.3,10.5,.3),Wd);bar.position.y=5.4;arm.add(bar);
      const sail=new THREE.Mesh(new THREE.BoxGeometry(1.8,8,.08),Cl);sail.position.set(1.1,6.2,0);arm.add(sail);for(let k=0;k<5;k++){const r=new THREE.Mesh(new THREE.BoxGeometry(2,.12,.16),Wd);r.position.set(1.1,2.6+k*1.8,.05);arm.add(r);}g.add(arm);}
    g.position.set(ZT.mill.x,ZT.mill.y,ZT.mill.z+.6);g.traverse(o=>{if(o.isMesh)o.castShadow=true;});scene.add(g);ZT.sails=g;}
  /* water wheel */
  {const g=new THREE.Group();const Wd=std(0x6a4a2a);const rim=new THREE.Mesh(new THREE.TorusGeometry(3,.18,6,24).rotateY(Math.PI/2),Wd);g.add(rim);const rim2=rim.clone();rim2.position.x=1.2;g.add(rim2);
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const p=new THREE.Mesh(new THREE.BoxGeometry(1.4,.1,1),Wd);p.position.set(.6,Math.sin(a)*3,Math.cos(a)*3);p.rotation.x=-a;g.add(p);const s=new THREE.Mesh(new THREE.BoxGeometry(.12,.12,3),Wd);s.rotation.x=-a;s.position.set(.6,Math.sin(a)*1.5,Math.cos(a)*1.5);g.add(s);}
    g.position.set(ZT.wheel.x-1.1,ZT.wheel.y,ZT.wheel.z);scene.add(g);ZT.wh=g;}
  /* falling leaves everywhere */
  const lg=new THREE.BoxGeometry(.28,.03,.2);const LM=[0xe0701a,0xc8301a,0xf0b020,0xa04a10].map(c=>std(c));
  for(let i=0;i<120;i++){const m=new THREE.Mesh(lg,LM[i%4]);const x=20+Math.random()*216,z=20+Math.random()*216;m.position.set(x,ZTG+Math.random()*16,z);scene.add(m);ZT.leaves.push({m,x,z,y0:ZTG+2+Math.random()*16,ph:Math.random()*7,v:.6+Math.random()*.6});}
  ZT.whirlL=[];for(let i=0;i<50;i++){const m=new THREE.Mesh(lg,LM[i%4]);scene.add(m);ZT.whirlL.push({m,a:Math.random()*6.28,h:Math.random(),r:.6+Math.random()*1.4});}
  for(const p of [[66.5,ZTG+5,154],[128.5,ZTG+12,148.5]]){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffb050,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.35}));s.scale.set(9,9,1);s.position.set(p[0],p[1],p[2]);scene.add(s);}}
function ztTick(dt,tt){const P=FP.p;
  if(ZT.sails)ZT.sails.rotation.z-=dt*.5;if(ZT.wh)ZT.wh.rotation.x+=dt*.6;
  for(const l of ZT.leaves){const k=((tt*l.v*.25+l.ph)%1);l.m.position.set(l.x+Math.sin(tt*.7+l.ph)*2,l.y0-k*12,l.z+Math.cos(tt*.5+l.ph)*2);l.m.rotation.set(tt*2+l.ph,tt+l.ph,0);}
  {const W0=ZT.whirl;for(const p of ZT.whirlL){p.a+=dt*(2.4+p.r*.3);p.h=(p.h+dt*.08)%1;p.m.position.set(W0.x+Math.cos(p.a)*p.r,W0.y+p.h*(W0.top-W0.y),W0.z+Math.sin(p.a)*p.r);p.m.rotation.set(p.a,p.a*2,0);}}
  if(ZT.wh&&Math.random()<dt*10)mgSpawn({t:"bubble",x:ZT.wheel.x+(Math.random()-.5)*2,y:ZTG-1.1,z:ZT.wheel.z+(Math.random()-.5)*6,vy:.6,life:1,size:.3,size2:.6,col:[0xffffff,0xd8f0ff],op:.7});
  if(!FP.on)return;
  if(Math.hypot(P.x-ZT.whirl.x,P.z-ZT.whirl.z)<7&&P.y<ZT.whirl.y+3)tipOnce("j_vrtlog","Vrtlog jesenskog lišća! Stani u sredinu i nosit će te gore do balona.",4600);
  if(Math.hypot(P.x-ZT.saw.x,P.z-ZT.saw.z)<5)tipOnce("j_klackalica","Klackalica! Stani na niži kraj daske.",4000);
  if(Math.hypot(P.x-ZT.maze.x,P.z-ZT.maze.z)<5)tipOnce("j_labirint","Kukuruzni labirint! Savjet: drži se jednog zida i nećeš se izgubiti.",5200);}
function ztTalk(){const n=wStars("zetva");const need=["ponij","guska"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.zetva&&S.wst.zetva[s.k]));
  const L=n>=WSTAR_N?"Kristalna vrata zlatne žitnice su otvorena! Žitnica je odmah sjeverno od portala, a unutra te čeka žetveno blago.":
    n===0?"Dobro došla na imanje u Jesenskoj žetvi! Ja sam farmerica Jesenka. Deset zlatnih jabučica rasulo se po dolini, a bez njih se zlatna žitnica ne otvara. Pomogneš mi u žetvi?":
    "Imaš "+n+" od "+WSTAR_N+" zlatnih jabučica. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" Na imanju ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_zetva=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#5a8ad8");g.addColorStop(1,"#ffd8a0");x.fillStyle=g;x.fillRect(0,0,64,64);x.fillStyle="#e8c55c";x.fillRect(0,46,64,18);
    x.fillStyle="#f4f0e6";x.fillRect(22,20,14,28);x.fillStyle="#7a5a38";P([[20,22],[29,10],[38,22]],"#7a5a38");x.strokeStyle="#6a4a2a";x.lineWidth=3;x.beginPath();x.moveTo(17,8);x.lineTo(41,32);x.moveTo(41,8);x.lineTo(17,32);x.stroke();
    x.fillStyle="#e08a20";x.beginPath();x.ellipse(50,52,9,7,0,0,7);x.fill();x.fillStyle="#3a8a2a";x.fillRect(49,42,3,5);};
  D.mg_trail_listici=(x)=>{const c=["#e0701a","#c8301a","#f0b020","#a04a10"];for(let i=0;i<18;i++){x.save();x.translate(8+(i*37)%50,8+(i*23)%50);x.rotate(i*.9);x.fillStyle=c[i%4];x.beginPath();x.ellipse(0,0,6,3,0,0,7);x.fill();x.restore();}};})();

pwWorld("zetva",{dist:"dolina",lv:11,n:"Jesenska žetva",d:"Zlatna dolina u jesen: vjetrenjača, kukuruzni labirint, bundeva-kuća, voćnjak s golemom jabukom, crvena štala s klackalicom, balon nad poljem i vodenica.",
  feat:["Farmerica Jesenka","Ponij Zlatko","Divlja guska Siva","kukuruzni labirint","vjetrenjača","balon"],fr:["sijeno","bundeva","lampion"],ca:0xffd070,cb:0xd86a1a,sea:0,fog:.0034,
  preset:PRESETS.zetva,
  gen:ztGen,env:ztEnv,life:ztLife,talk:ztTalk,tick:ztTick,itemMesh:ztItem,itemCol:[0xffc83a,0xffffff,0xe0701a],itemBurst:[[1,.8,.3],[1,1,1],[1,.5,.2]],itemFx:"star",
  item:{one:"Zlatna jabučica",hud:"Zlatne jabučice",done:"Sve zlatne jabučice!",all:"Svih 10 zlatnih jabučica! Kristalna vrata zlatne žitnice su se otvorila!",first:"Prva zlatna jabučica! Kompas na vrhu pokazuje najbližu."},
  intro:()=>"Jesenska žetva! Zlatne jabučice: "+wStars("zetva")+" / "+WSTAR_N+". Farmerica Jesenka te čeka kod portala.",
  facts:{vjetrenjaca:"Vjetrenjače su nekad mljele žito u brašno. Vjetar okreće krila, a krila okreću golemi kamen koji melje zrno.",
    labirint:"Najveći kukuruzni labirinti na svijetu veći su od dvadeset nogometnih igrališta! Kad se kukuruz požanje, labirint nestane.",
    bundeva:"Najveća bundeva na svijetu bila je teža od malog automobila. Bundeva je zapravo voće, rođakinja krastavca i lubenice.",
    jabuka:"Na svijetu postoji više od sedam tisuća vrsta jabuka. Kad bi svaki dan jela drugu, trebalo bi ti skoro dvadeset godina da probaš sve!",
    kosare:"Jesen je vrijeme berbe: beru se jabuke, kruške, šljive, grožđe i orasi. Ljudi voće spremaju u podrume za zimu.",
    lisce:"Lišće u jesen mijenja boju jer stablo prestaje raditi zelenu tvar. Tada se vide žuta i narančasta boja koje su cijelo vrijeme bile skrivene u listu.",
    stala:"Kokoš snese otprilike jedno jaje svaki dan. Krava daje toliko mlijeka dnevno da bi napunila punu kadu za kupanje svaki tjedan!",
    balon:"Balon na vrući zrak leti jer je topli zrak lakši od hladnog. Prvi putnici u balonu bili su ovca, patka i pijetao!",
    vodenica:"Vodenica radi isto što i vjetrenjača, samo je pokreće voda. Na rijekama u Hrvatskoj i danas ima starih vodenica.",
    polje:"Krumpir raste pod zemljom. Iz jednog posađenog krumpira izraste cijela obitelj od deset i više novih krumpira."},
  chat:{"Strašilo Slamko":["Buuu! Hihi, plašim samo vrane, ne lisice."],kokos2:["Kokodak! Snijela sam jaje!","Kokoda-kodak, tko mi je pojeo zrnje?"],krava2:["Muuu! Jesenska trava je najslađa."],
    prase2:["Rok-rok! Blato je najbolja kupka na svijetu!"],ovca:["Beee! Vuna mi je narasla za zimu."],patka:["Kvak! Voda u ribnjaku je baš osvježavajuća."],
    "Ježić Jabučić":["Skupljam jabuke za zimu. Nosim ih na bodljama!"],"Vjeverica Lješnjakica":["Sakrila sam lješnjake, samo se ne sjećam gdje..."],"Zeko Mrkvić":["Ima li još koja mrkva? Pitam za prijatelja."]},
  finale:{chest:"j_blago",isl:"zitnica",at:{x:128,z:148},rewards:["skin:jesen","trail:listici"],locked:"Kristalna vrata zlatne žitnice su zatvorena. Skupi svih 10 zlatnih jabučica!",
    kicker:"Zlatna žitnica je otvorena!",title:"Blago zlatne žitnice",sub:"Jesenska lisica i Jesenski listići sad su tvoji. Farmerica Jesenka kaže da si najbolja pomoćnica u žetvi!"}});
