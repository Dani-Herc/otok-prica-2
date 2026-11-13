/* =================== OP2 v12: Kristalne dubine (portal world of Gorski kraj) =================== */
/* Under the mountain. Halls and tunnels with a stone ceiling: the Great Crystal Hall with a crystal tower and a glass
   skylight, an underground lake under a ceiling of glow worms, a mine with a mine cart ride, a mushroom grotto with
   stepping caps over a chasm, a fossil hall with a giant skeleton you can climb, a geode that opens to a crystal song. */
MSKIN.kristal={n:"Kristalna lisica",d:"Krzno svjetluca kao ametist, a rep svijetli tirkizno poput kristala iz dubina.",p:0,rar:"l",O:0x9a6ad6,W:0xe0fff8,B:0x2a1a4a,D:0x7fe9e0,glowO:.12,fx:"kristal",wr:"Kristalne dubine"};
MTRAIL.krhotine={n:"Kristalne krhotine",d:"Iza Ride ostaju sitne krhotine kristala koje svijetle tirkizno i ljubičasto.",p:0,rar:"l",wr:"Kristalne dubine"};
TR.krhotine=p=>mgSpawn({t:"star",x:p.x+(Math.random()-.5)*.5,y:p.y+.2+Math.random()*.4,z:p.z+(Math.random()-.5)*.5,vy:.6,grav:1.5,life:1.1,size:.22,size2:.04,col:[0x7fe9e0,0x9a6ad6,0xe0fff8],add:1,op:1});TRATE.krhotine=10;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","kristal",MSKIN.kristal);ins("trail","krhotine",MTRAIL.krhotine);}
PRESETS.kristal={top:0x0a0a1e,hz:0x2a2050,sun:0xc8d8ff,si:1.3,hemi:1.15,el:.62,az:1.2,fog:0x1a1236,glow:1.25,stars:0,sh:0x2a6a8a,dp:0x0a1a3a,exp:1.3,night:.5};

/* ---------- creatures (blocky) ---------- */
MODELS.krtica=function(){const G=0x3a3640,D=0x2a262e,P=0xf0a0b0,K=0x111111,hd={name:"head",px:0,py:.32,pz:.34};
  return mk([[.56,.42,.7,0,.3,0,G],[.4,.34,.3,0,.32,.42,G,hd],[.16,.12,.14,0,.28,.6,P,hd],[.06,.04,.02,-.1,.4,.575,K,hd],[.06,.04,.02,.1,.4,.575,K,hd],
    [.22,.08,.2,-.32,.12,.24,P],[.22,.08,.2,.32,.12,.24,P],[.16,.08,.16,-.22,.08,-.24,D],[.16,.08,.16,.22,.08,-.24,D],[.06,.06,.16,0,.3,-.4,P],[.5,.06,.06,0,.22,.42,0xffd23a,hd]]);};
MODELS.sismis=function(){const B=0x4a3a5a,D=0x2a2034,P=0xd890b0,K=0xffe05a,hd={name:"head",px:0,py:.5,pz:.12},wl={name:"wl",px:-.12,py:.5,pz:0},wr={name:"wr",px:.12,py:.5,pz:0};
  const sp=[[.26,.32,.24,0,.44,0,B],[.26,.24,.24,0,.66,.06,B,hd],[.08,.16,.04,-.09,.84,.04,B,hd],[.08,.16,.04,.09,.84,.04,B,hd],[.05,.05,.02,-.06,.7,.185,K,hd],[.05,.05,.02,.06,.7,.185,K,hd],[.08,.05,.02,0,.62,.185,P,hd]];
  for(const [s,w] of [[-1,wl],[1,wr]]){sp.push([.5,.3,.04,s*.38,.5,0,D,w],[.3,.2,.04,s*.7,.44,0,D,w],[.06,.4,.05,s*.62,.52,.01,B,w]);}return mk(sp);};
MODELS.patuljak=function(){const S=0xf0c8a0,Bd=0xf4f0e8,R=0xd8302a,G=0x3a7a3a,Br=0x6a4a2a,K=0x1a1a1a,hd={name:"head",px:0,py:.9,pz:0};
  return mk([[.46,.4,.32,0,.5,0,G],[.48,.08,.34,0,.34,0,Br],[.14,.28,.16,-.11,.14,0,Br],[.14,.28,.16,.11,.14,0,Br],[.12,.32,.12,-.3,.52,0,G],[.12,.32,.12,.3,.52,0,G],[.12,.12,.12,-.3,.32,.02,S],[.12,.12,.12,.3,.32,.02,S],
    [.36,.32,.3,0,.88,0,S,hd],[.06,.06,.02,-.08,.94,.155,K,hd],[.06,.06,.02,.08,.94,.155,K,hd],[.1,.08,.04,0,.86,.17,0xf09a8a,hd],[.38,.3,.12,0,.68,.16,Bd,hd],[.2,.16,.1,0,.52,.16,Bd,hd],
    [.4,.14,.34,0,1.08,0,R,hd],[.28,.18,.26,0,1.22,-.02,R,hd],[.16,.18,.16,0,1.38,-.06,R,hd],[.1,.08,.1,0,1.5,-.08,0xffe05a,hd],[.06,.6,.06,.38,.6,.08,Br],[.3,.12,.12,.38,.92,.08,0x9aa0a8]]);};
MODELS.ribica=function(){const P=0xf6d0d0,D=0xe8a8b0,R=0xff7a8a,hd={name:"head",px:0,py:.12,pz:.4};
  return mk([[.14,.12,.76,0,.12,0,P],[.16,.12,.2,0,.12,.46,P,hd],[.06,.1,.04,-.1,.16,.42,R,hd],[.06,.1,.04,.1,.16,.42,R,hd],[.06,.06,.04,-.11,.18,.36,R,hd],[.06,.06,.04,.11,.18,.36,R,hd],
    [.04,.08,.4,0,.12,-.54,D],[.08,.04,.04,-.1,.04,.24,D],[.08,.04,.04,.1,.04,.24,D],[.08,.04,.04,-.1,.04,-.2,D],[.08,.04,.04,.1,.04,-.2,D]]);};
MODELS.krtica2=()=>MODELS.krtica();MODELS.sismis2=()=>MODELS.sismis();MODELS.ribica2=()=>MODELS.ribica();
pwPets("kristal","gora",[
  {k:"krtica",fav:"bobice",n:"Krtica Kopka",d:"Krtica s rudarskom svjetiljkom na glavi. Pod zemljom nikad ne zaluta i zna svaki prečac.",gd:"Iz dubina donosi kristale i zlatnike.",gift:()=>[["bobice",4],["coins",22]],spd:1.6,
   spec:{n:"Krtičin juriš",d:"Kopka juri kroz špilje kao strijela i skače preko kamenja!",ride:1,ic:"star"},ride:{land:1,speed:11.2,jump:11,dbl:1,seat:.66},tip:"Kopka te nosi! Skoči dvaput zaredom."},
  {k:"sismis",fav:"bobice",n:"Šišmiš Noćko",d:"Mali šišmiš voćar. Vidi ušima: vikne, pa sluša kako mu se glas odbija od zidova.",gd:"Iz voćnjaka iznad planine donosi smokve i zlatnike.",gift:()=>[["bobice",3],["coins",18]],spd:1.3,
   spec:{n:"Let kroz špilje",d:"Noćko te nosi kroz mrak i nikad ne udari u zid! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:9.4,jump:9,seat:.62},tip:"Noćko leti! Skok je gore, Roni je dolje."}]);
PWIT.gljivica={n:"Svjetleća gljivica",mk:g=>{const s=new THREE.Mesh(new THREE.BoxGeometry(.1,.26,.1),std(0xe9e0d0));s.position.y=-.1;g.add(s);const c=new THREE.Mesh(new THREE.BoxGeometry(.34,.12,.34),std(0x7affd8,{emissive:LC(0x3affc0),emissiveIntensity:.9}));c.position.y=.08;g.add(c);},glow:0x7affd8};
PWIT.smokva={n:"Smokva",mk:g=>{const b=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),std(0x7a3a6a,{emissive:LC(0x3a1030),emissiveIntensity:.3}));b.scale.y=1.2;g.add(b);const t=new THREE.Mesh(new THREE.BoxGeometry(.05,.12,.05),std(0x5a8a3a));t.position.y=.26;g.add(t);},glow:0xd890c0};
PWIT.fenjer={n:"Rudarski fenjer",mk:g=>{const f=std(0x3a3a42,{metalness:.6,roughness:.4});const b=new THREE.Mesh(new THREE.BoxGeometry(.26,.04,.26),f);b.position.y=-.16;g.add(b);const t=b.clone();t.position.y=.16;g.add(t);
  const l=new THREE.Mesh(new THREE.BoxGeometry(.18,.28,.18),std(0xffd27a,{emissive:LC(0xffb030),emissiveIntensity:1}));g.add(l);const h=new THREE.Mesh(new THREE.TorusGeometry(.1,.02,4,10),f);h.position.y=.26;g.add(h);},glow:0xffd27a};
function kdItem(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0x9af8ff),emissive:LC(0x3ae0f0),emissiveIntensity:.9,roughness:.08,metalness:.25,flatShading:true});
  for(const [x,y,z,s,r] of [[0,0,0,1,0],[.16,-.06,.04,.6,.5],[-.14,-.08,-.02,.55,-.45]]){const o=new THREE.Mesh(new THREE.OctahedronGeometry(.22*s,0),m);o.scale.y=1.8;o.position.set(x,y,z);o.rotation.z=r;g.add(o);}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x9af8ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(2.4,2.4,1);g.add(sp);return g;}

/* ---------- the caves ---------- */
const KDG=SL+2;
const KD={F:null,C:null,worms:[],cart:null,gljivice:[],smokve:[],fenjeri:[]};
const KDH=[[128,200,15,14],[128,124,36,40],[58,112,28,22],[198,92,24,26],[196,178,20,18],[60,190,22,26]];
const KDT=[[128,186,128,158,5],[100,118,80,114,5],[158,112,180,100,5],[152,150,184,168,5],[116,200,74,192,5],[58,138,60,174,5]];
function kdSeg(px,pz,ax,az,bx,bz){const dx=bx-ax,dz=bz-az,L=dx*dx+dz*dz;let t=((px-ax)*dx+(pz-az)*dz)/L;t=Math.max(0,Math.min(1,t));return Math.hypot(px-ax-dx*t,pz-az-dz*t);}
function kdOpen(x,z){let hc=0;const wob=(vnoise(x*.12,z*.12,7)-.5)*4;for(const [cx,cz,r,hm] of KDH){const d=Math.hypot(x-cx,z-cz)+wob;if(d<r)hc=Math.max(hc,Math.max(5,hm*Math.sqrt(1-(d/r)*(d/r))));}
  for(const [ax,az,bx,bz,w] of KDT){const d=kdSeg(x,z,ax,az,bx,bz)+wob*.4;if(d<w/2+.6)hc=Math.max(hc,7);}return hc;}
function kdGen(){const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};
  const F=new Int16Array(W*W),C=new Int16Array(W*W);KD.F=F;KD.C=C;const FY=(x,z)=>F[x+z*W];
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const i=x+z*W;const hc=kdOpen(x,z);let f=KDG+Math.round((fbm(x*.05+3,z*.05+1)-.5)*3),lake=0;
    {const d=Math.hypot(x-58,z-112)*(1+.1*(vnoise(x*.2,z*.2,3)-.5));if(d<17){f=Math.min(f,KDG-6+Math.round(Math.max(0,d-11)*1.1));lake=1;}}
    {const d=Math.hypot(x-128,z-200);if(d<11)f=KDG;}
    {if(x>=182&&x<=214&&Math.abs(z-178)<4.5)f=KDG-9;}
    if(hc<3){for(let y=0;y<H;y++)vox[I(x,y,z)]=y<4?T.duboki:(hash3(x,y,z)<.06?T.tuf:(y%7<3?T.duboki:T.kamen));F[i]=0;C[i]=0;hmap[i]=H-1;continue;}
    const c=Math.min(H-3,Math.max(f,KDG)+Math.round(hc));F[i]=f;C[i]=c;hmap[i]=f;
    for(let y=0;y<f;y++)vox[I(x,y,z)]=y===f-1?(hash2(x,z,4)<.25?T.glina:(hash2(x,z,5)<.15?T.tuf:T.kamen)):(y<4?T.duboki:T.kamen);
    for(let y=c;y<H;y++)vox[I(x,y,z)]=(y%6<2?T.duboki:T.kamen);
    if(lake&&f<KDG-1)for(let y=f;y<KDG-1;y++)vox[I(x,y,z)]=T.voda;}
  /* ore veins on the walls around the mine */
  for(let z=60;z<126;z++)for(let x=166;x<232;x++){if(F[x+z*W])continue;for(let y=KDG;y<KDG+22;y++){const h=hash3(x,y,z);if(h<.035)vox[I(x,y,z)]=[T.r_zlato,T.r_dijamant,T.r_smaragd,T.r_bakar,T.r_zeljezo,T.r_ugljen][Math.floor(hash3(z,x,y)*6)];}}
  busy(128,196,10);
  /* ----- the Great Crystal Hall: tower, skylight, vent ----- */
  {const cx=128,cz=124,f=KDG;for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const i=cx+dx+(cz+dz)*W;for(let y=F[i];y<f;y++)vox[I(cx+dx,y,cz+dz)]=T.kamen;for(let y=f;y<C[i];y++)vox[I(cx+dx,y,cz+dz)]=0;F[i]=f;hmap[i]=f;}
    const top=f+24;for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d>2.9)continue;for(let y=f;y<top;y++){const vein=hash3(cx+dx,y,cz+dz);wput(cx+dx,y,cz+dz,d<1.5?T.kvarc:(vein<.12?T.kristal:vein<.3?T.ametist:T.kvarc),1);}}
    for(let k=0;k<5;k++)for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)if(Math.hypot(dx,dz)<=2.2-k*.45)wput(cx+dx,top+k,cz+dz,k%2?T.ametist:T.kristal,1);
    let last=null;const FL=new Map(),PC=[];for(let i=0;i<=700;i++){const t=i/700,a=1.57+t*2.6*6.283,r=4.6,y=f+Math.round(t*(top-f-1));for(const w of [0,1]){const x=Math.round(cx+.5+Math.cos(a)*(r+w)),z=Math.round(cz+.5+Math.sin(a)*(r+w));
        const k=x+","+(y-1)+","+z;if(!FL.has(k))FL.set(k,[x,y-1,z]);PC.push([x,y,z]);}last=[cx+.5+Math.cos(a)*r,y,cz+.5+Math.sin(a)*r];}
    for(const [x,y,z] of FL.values()){wput(x,y,z,T.kvarc,1);for(let yy=y-1;yy>=Math.max(f,y-4);yy--){if(get(x,yy,z)||FL.has(x+","+yy+","+z))break;wput(x,yy,z,T.ametist,1);}}
    for(const [x,y,z] of PC)for(let yy=y;yy<y+3;yy++)if(!FL.has(x+","+yy+","+z)){vox[I(x,yy,z)]=0;prot[I(x,yy,z)]=1;}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d<=2.9&&d>2.2)wput(cx+dx,top,cz+dz,T.kvarc,1);}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)if(Math.hypot(dx,dz)<=3.4)wput(cx+dx,top-1,cz+dz,T.kvarc,1);
    wStar("toranj",last[0],last[1]+.9,last[2],"Na vrhu Kristalnog tornja usred Velike dvorane. Penji se po stubama oko tornja!");
    /* skylight: a shaft up through the ceiling closed by glass */
    for(let dz=-8;dz<=8;dz++)for(let dx=-8;dx<=8;dx++){const d=Math.hypot(dx,dz);if(d>7.5)continue;const i=cx+dx+(cz+dz)*W;for(let y=C[i];y<H;y++){vox[I(cx+dx,y,cz+dz)]=0;}wput(cx+dx,H-3,cz+dz,d>6.6?T.kvarc:T.staklo,1);C[i]=H-3;}
    for(let a=0;a<28;a++){const an=a/28*6.283;for(let y=KDG+30;y<H-3;y++){const X=Math.round(cx+Math.cos(an)*8.2),Z=Math.round(cz+Math.sin(an)*8.2);if(!get(X,y,Z))wput(X,y,Z,T.kamen,1);}}
    KD.sky={x:cx+.5,z:cz+.5,top:H-3,f};
    /* warm air vent and a floating crystal ledge */
    const vx=148,vz=104,vf=FY(vx,vz);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const d=Math.hypot(dx,dz);if(d<1.5)wput(vx+dx,vf-1,vz+dz,T.zar,1);else if(d<2.6)wput(vx+dx,vf-1,vz+dz,T.tuf,1);}
    const lx=vx+4,ly=Math.min(vf+16,C[lx+vz*W]-7);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=2;dx++)wput(lx+dx,ly,vz+dz,T.ametist,1);for(let y=ly+1;y<C[lx+vz*W];y++)wput(lx+1,y,vz,y%3?T.ametist:T.kristal,1);
    for(let k=1;k<4;k++)wput(lx,ly-k,vz,T.kristal,1);
    WG.wind.push({x:vx+.5,z:vz+.5,r:1.6,y0:vf,y1:ly+3,k:"topli"});KD.vent={x:vx+.5,y:vf,z:vz+.5};
    wStar("zraka",lx+.5,ly+1.9,vz-.5,"Na lebdećoj kristalnoj polici u Velikoj dvorani. Topli zrak iz užarenog procjepa te diže gore!");
    busy(cx,cz,10);busy(vx,vz,5);POI.push({k:"kd_dvorana",n:"Velika kristalna dvorana",x:cx,z:cz,r:30});}
  /* ----- the underground lake with glow worms ----- */
  {const cx=58,cz=112;for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){if(dx*dx+dz*dz>5)continue;const i=cx+dx+(cz+dz)*W;for(let y=F[i];y<KDG;y++)vox[I(cx+dx,y,cz+dz)]=y===KDG-1?T.mahovina:T.kamen;F[i]=KDG;hmap[i]=KDG;}
    for(let k=0;k<3;k++)wput(cx,KDG+k,cz,T.stapka,1);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(cx+dx,KDG+3,cz+dz,T.kristal,1);
    const sx=cx+6,sz=cz+4,sb=FY(sx,sz);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(sx+dx,sb-1,sz+dz,T.kristal,1);
    wStar("jezero",sx+.5,sb+.6,sz+.5,"Na dnu Podzemnog jezera, kraj svjetlećeg kristala. Zaroni!");
    for(let i=0;i<22;i++){const x=cx-16+Math.floor(hash2(i,1,9)*32),z=cz-16+Math.floor(hash2(i,2,9)*32),f=FY(x,z);if(f&&f<KDG-2&&!get(x,f,z))wput(x,f,z,hash2(i,3,9)<.4?T.kristal:T.koralj_l,1);}
    KD.lake={x:cx,z:cz};busy(cx,cz,20);POI.push({k:"kd_jezero",n:"Podzemno jezero",x:cx,z:cz,r:24});}
  /* ----- the mine: scaffolds, the dwarf's hut, the mine cart ride, buried crystal ----- */
  {const cx=198,cz=92,f=KDG;for(let dz=-14;dz<=14;dz++)for(let dx=-14;dx<=14;dx++){if(Math.hypot(dx,dz)>13.5)continue;const i=cx+dx+(cz+dz)*W;if(!F[i])continue;for(let y=F[i];y<f;y++)vox[I(cx+dx,y,cz+dz)]=T.kamen;for(let y=f;y<f+4;y++)if(!prot[I(cx+dx,y,cz+dz)])vox[I(cx+dx,y,cz+dz)]=0;F[i]=f;hmap[i]=f;}
    const pts=[];const R=14,A0=1.9,A1=A0+1.55*Math.PI,top=f+13;for(let i=0;i<=60;i++){const t=i/60,a=A0+(A1-A0)*t;const y=f+Math.max(0,Math.min(top-f,(t-.08)*1.15*(top-f)));pts.push([cx+.5+Math.cos(a)*R,y,cz+.5+Math.sin(a)*R]);}
    for(let i=0;i<pts.length;i+=3){const [x,y,z]=pts[i];const X=Math.floor(x),Z=Math.floor(z);if(y>f+1)for(let yy=f;yy<Math.floor(y)-0;yy++)wput(X,yy,Z,T.sdaske,1);}
    for(const [x,y,z] of pts){const X=Math.floor(x),Z=Math.floor(z);for(let yy=Math.floor(y);yy<Math.floor(y)+3;yy++)if(!prot[I(X,yy,Z)])vox[I(X,yy,Z)]=0;}
    {const [ex,ey,ez]=pts[pts.length-1];const X=Math.floor(ex),Z=Math.floor(ez),ty=Math.floor(ey);const ax=Math.cos(A1),az=Math.sin(A1);
      for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){wput(X+dx,ty-1,Z+dz,T.sdaske,1);for(let yy=ty;yy<ty+3;yy++)if(!prot[I(X+dx,yy,Z+dz)])vox[I(X+dx,yy,Z+dz)]=0;}
      for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)if(Math.abs(dx)===2||Math.abs(dz)===2){if((dx+dz)%2===0)wput(X+dx,ty,Z+dz,T.tdaske,1);}
      for(let y=f;y<ty-1;y++)for(const [a,b] of [[-2,-2],[2,2],[-2,2],[2,-2]])wput(X+a,y,Z+b,T.sdaske,1);
      wStar("kolica",X+.5-ax*1.2,ty+.9,Z+.5-az*1.2,"Na visokoj polici u rudniku. Sjedni u rudnička kolica na stanici i vozi se gore!");wput(X,ty+2,Z+2,T.lampion,1);KD.ledge={x:X+.5,y:ty,z:Z+.5};}
    KD.cart={pts,on:false,t:0,cool:0,st:{x:pts[0][0],y:f,z:pts[0][2]}};
    {const [sx,,sz]=pts[0];const X=Math.floor(sx),Z=Math.floor(sz);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)if(dx||dz)wput(X+dx,f-1,Z+dz,T.sdaske,1);wput(X+2,f,Z,T.lampion,1);}
    /* the dwarf's hut */
    {const hx=190,hz=82;for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)for(let y=f;y<f+4;y++){const edge=Math.abs(dx)===2||Math.abs(dz)===2;if(!edge){vox[I(hx+dx,y,hz+dz)]=0;continue;}if(dz===2&&dx===0&&y<f+2)continue;wput(hx+dx,y,hz+dz,(Math.abs(dx)===2&&Math.abs(dz)===2)?T.tdaske:(y===f+2&&dx===0?T.staklo:T.sdaske),1);}
      for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)wput(hx+dx,f+4,hz+dz,T.tdaske,1);wput(hx+1,f+2,hz+3,T.lampion,1);
      for(let h=0;h<2;h++)pwCell("rudar",hx,f+h,hz+2,T.tdaske);wStar("rudar",hx+.5,f+.9,hz+.5,"U kolibi patuljka Kremenka u rudniku. Pomozi mu pronaći fenjere!");KD.dwarf={x:hx+2.5,z:hz+4.5};}
    /* buried crystal under gravel */
    {const bx=206,bz=104;for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)if(dx*dx+dz*dz<=10)vox[I(bx+dx,f-1,bz+dz)]=T.glina;
      for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("ruda",bx+a,f-1,bz+b,(a===b||a===-b)?T.crvena:T.glina);pwCell("ruda",bx+a,f-2,bz+b,T.kamen);}
      wStar("ruda",bx+.5,f-1.4,bz+.5,"Zakopan pod crvenim X-om u šljunku rudnika. Kopaj!");pwDig("ruda",bx,f-1,bz,"Kopaš kroz šljunak... i eno ga! Kristal iz dubina!");}
    for(const [x,z] of [[186,94],[206,82],[198,104]])for(let y=f;y<f+5;y++){wput(x,y,z,T.sdaske,1);if(y===f+4)for(const d of [-1,1]){wput(x+d,y,z,T.sdaske,1);}}
    addChest("kd_rudnik",186,f,100,"Rudarska škrinja");busy(cx,cz,24);POI.push({k:"kd_rudnik",n:"Stari rudnik",x:cx,z:cz,r:22});}
  /* ----- the mushroom grotto: stepping caps over the chasm ----- */
  {const caps=[[186,175,0],[190,180,1],[194,176,2],[198,180,1],[202,176,2],[206,180,2]];for(const [x,z,dy] of caps){const top=KDG-1+dy;const pf=FY(x,z)||KDG-9;for(let y=pf;y<top;y++)wput(x,y,z,T.stapka,1);
      for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){wput(x+dx,top,z+dz,(dx||dz)?T.gljiva:T.svjetlo,1);}for(const [a,b] of [[-2,0],[2,0],[0,-2],[0,2]])wput(x+a,top-1,z+b,T.gljiva,1);}
    const px=210,pz=178,pt=KDG+1;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){const pf=FY(px+dx,pz+dz)||KDG-9;for(let y=pf;y<pt;y++)wput(px+dx,y,pz+dz,y===pt-1?T.mahovina:T.kamen,1);}
    wStar("gljive",px+.5,pt+.9,pz+.5,"Na stijeni na kraju Gljivarske špilje. Skači po klobucima gljiva preko provalije!");
    for(let k=0;k<=8;k++){const x=194+k;for(let y=KDG-9;y<=KDG-9+k;y++)wput(x,y,182,T.kamen,1);}
    for(let i=0;i<26;i++){const x=180+Math.floor(hash2(i,4,2)*34),z=162+Math.floor(hash2(i,5,2)*32);const f=FY(x,z);if(!f||f<KDG-1||mask[x+z*W])continue;const h=2+Math.floor(hash2(i,6,2)*4);for(let y=f;y<f+h;y++)wput(x,y,z,T.stapka,1);
      for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(x+dx,f+h,z+dz,hash2(i,7,2)<.5?T.gljiva:T.micelij,1);wput(x,f+h-1,z+1,T.kristal,1);}
    KD.grotto={x:186,z:172};busy(196,178,20);POI.push({k:"kd_gljive",n:"Gljivarska špilja",x:196,z:178,r:18});}
  /* ----- the fossil hall: a giant skeleton you can climb ----- */
  {const z=190,f=KDG;for(let dz=-6;dz<=6;dz++)for(let x=40;x<=82;x++){const i=x+(z+dz)*W;if(!F[i])continue;for(let y=F[i];y<f;y++)vox[I(x,y,z+dz)]=T.kamen;for(let y=f;y<f+3;y++)if(!prot[I(x,y,z+dz)])vox[I(x,y,z+dz)]=0;F[i]=f;hmap[i]=f;}
    const sp=x=>x<56?f+Math.round((x-46)*.55):x<66?f+6:x<72?f+6+Math.round((x-66)*.6):f+9;
    for(let x=46;x<=72;x++)wput(x,sp(x),z,T.kvarc,1);for(let x=72;x<=76;x++)for(let dz=-1;dz<=1;dz++)for(let y=f+8;y<=f+10;y++){const edge=y===f+10||Math.abs(dz)===1||x===76;if(edge)wput(x,y,z+dz,T.kvarc,1);}
    wput(75,f+9,z-1,T.duboki,1);wput(75,f+9,z+1,T.duboki,1);for(let x=73;x<=76;x++)wput(x,f+8,z,T.kvarc,1);
    for(let x=58;x<=66;x+=2)for(const s of [-1,1])for(let k=1;k<=4;k++){wput(x,f+6-Math.max(0,k-2),z+s*k,T.kvarc,1);}
    for(const lx of [56,66])for(const s of [-1,1])for(let y=f;y<f+6;y++)wput(lx,y,z+s*2,T.kvarc,1);
    wStar("fosil",75.5,f+11.9,z+.5,"Na lubanji golemog fosila u Dvorani fosila. Penji se po kralježnici od repa do glave!");addChest("kd_fosil",52,f,z+4,"Škrinja paleontologa");
    for(const [lx,lz] of [[44,184],[52,196],[64,184],[70,197],[80,186],[58,180]]){const g2=FY(lx,lz);if(g2){wput(lx,g2,lz,T.duboki,1);wput(lx,g2+1,lz,T.lampion,1);}}
    for(const [lx,lz] of [[46,200],[74,180],[62,202]]){const g2=FY(lx,lz);if(g2)for(let k=0;k<3;k++)wput(lx+(k===2?1:0),g2+k-(k===2?2:0),lz,T.kristal,1);}
    KD.fossil={x:47,z:z+.5};busy(60,z,16);POI.push({k:"kd_fosil",n:"Dvorana fosila",x:60,z,r:16});}
  /* ----- the geode and the crystal chimes ----- */
  {const gx=112,gz=132,f=KDG;for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++)for(let y=f;y<f+10;y++){const d=Math.hypot(dx,dz,(y-f-2.5)*1.1);if(d>5.4)continue;const X=gx+dx,Z=gz+dz;if(d<3.6){vox[I(X,y,Z)]=0;continue;}wput(X,y,Z,d<4.4?(hash3(X,y,Z)<.4?T.kristal:T.ametist):(hash3(X,y,Z)<.3?T.glina:T.kamen),1);}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)if(dx*dx+dz*dz<12)wput(gx+dx,f-1,gz+dz,T.ametist,1);
    for(let x=gx+3;x<=gx+6;x++)for(let h=0;h<2;h++){vox[I(x,f+h,gz)]=0;prot[I(x,f+h,gz)]=0;}for(let h=0;h<2;h++)pwCell("geoda",gx+5,f+h,gz,T.glina);
    wStar("geoda",gx+.5,f+.9,gz+.5,"Unutar goleme geode u Velikoj dvorani. Kristalni zvončići otvaraju njezinu pukotinu!");
    const cx=gx,cz=gz-12;const L=[["kristal",659],["ametist",523],["jantar",784],["vuna_r",988]],PP=[[-4,-2],[-1,-4],[3,-3],[4,1]],ORD=[2,0,3,1];
    const pads=PP.map(([a,b],i)=>{const x=cx+a,z=cz+b,y=FY(x,z)-1;vox[I(x,y,z)]=T[L[i][0]];prot[I(x,y,z)]=1;const ox=a>0?1:-1;for(let h=1;h<=3-(i%2);h++)wput(x+ox,y+h,z,T[L[i][0]],1);
      return {x,y,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    {const x=cx,z=cz+5,y=FY(x,z);for(let a=-2;a<=2;a++)for(let h=0;h<5;h++)wput(x+a,y+h,z,T.duboki,1);ORD.forEach((j,i)=>wput(x,y+4-i,z-1,T[L[j][0]],1));}
    pwSeq("geoda",{pads,order:ORD,win:"Kristalni zvončići zazvonili su čarobnu pjesmu! Pukotina u geodi se otvorila.",wrong:"Kriva nota! Pogledaj kamenu ploču, odozgo prema dolje, i kreni ispočetka."});
    busy(gx,gz,8);busy(cx,cz,6);POI.push({k:"kd_geoda",n:"Golema geoda",x:gx,z:gz,r:8});}
  /* ----- ring course around the crystal tower ----- */
  {const pts=[];for(let i=0;i<10;i++){const a=Math.PI/2+i/10*Math.PI*2*.95;const x=Math.round(128+Math.cos(a)*24),z=Math.round(124+Math.sin(a)*24);pts.push([x+.5,(FY(x,z)||KDG)+1.8,z+.5]);busy(x,z,2);}
    const cx=119,cz=154,g=FY(cx,cz);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("staza",cx+a,g+h,cz+b,(a+b+h)%2?T.ametist:T.kvarc);}
    wStar("staza",cx+.5,g+.9,cz+.5,"U kristalnom kavezu na ulazu u Veliku dvoranu. Otvara se kad proletiš kroz sve kristalne prstenove!");busy(cx,cz,3);
    pwRings("staza",{start:[128.5,FY(128,150),150.5],pts,time:60,col:0x7fe9e0,name:"Kristalni prstenovi",win:"Proletjela si kroz sve kristalne prstenove! Kristalni kavez na ulazu se otvorio."});}
  /* ----- the heart of the mountain: the crystal vault ----- */
  {const cx=128,cz=96,g=FY(cx,cz);for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const i=cx+dx+(cz+dz)*W;if(!F[i])continue;for(let y=F[i];y<g;y++)vox[I(cx+dx,y,cz+dz)]=T.kamen;F[i]=g;hmap[i]=g;}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){wput(cx+dx,g-1,cz+dz,(dx+dz)%2?T.ametist:T.kvarc,1);for(let y=g;y<g+8;y++){const d=Math.hypot(dx,dz,Math.max(0,y-g-3)*1.2);if(d>4.6){continue;}
      const edge=d>3.6;if(!edge){vox[I(cx+dx,y,cz+dz)]=0;continue;}if(dz===4&&Math.abs(dx)<=1&&y<g+3){wput(cx+dx,y,cz+dz,T.kristal,1);WG.gate.push([cx+dx,y,cz+dz]);continue;}
      wput(cx+dx,y,cz+dz,hash3(cx+dx,y,cz+dz)<.35?T.kristal:T.ametist,1);}}
    wput(cx-2,g,cz-2,T.svjetlo,1);wput(cx+2,g,cz-2,T.svjetlo,1);for(const a of [-2,2])wput(cx+a,g+3,cz+5,T.kristal,1);
    WG.isl.srce={x:cx,z:cz,y:g,r:4};addChest("kd_blago",cx,g,cz,"Blago iz srca planine");busy(cx,cz,7);POI.push({k:"kd_srce",n:"Srce planine",x:cx,z:cz,r:6});}
  /* pickups */
  const spot=([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];};
  KD.gljivice=[[190,166],[206,190],[36,112],[120,96]].map(spot);
  KD.smokve=[[84,118],[112,100],[66,198]].map(spot);
  KD.fenjeri=[[214,86],[182,104],[150,124],[128,180],[66,130]].map(spot);
  /* decorations: crystal clusters, stalagmites, stalactites, glow worms */
  for(let z=6;z<W-6;z+=3)for(let x=6;x<W-6;x+=3){const X=x+Math.floor(hash2(x,z,61)*3),Z=z+Math.floor(hash2(x,z,62)*3),i=X+Z*W;if(!F[i]||mask[i])continue;const f=F[i],c=C[i];if(c-f<6)continue;const r=hash2(X,Z,63);
    if(f>=KDG-1&&r<.06){const h=1+Math.floor(hash2(X,Z,64)*3),t=hash2(X,Z,65)<.5?T.kristal:T.ametist;for(let y=f;y<f+h;y++)wput(X,y,Z,t);if(hash2(X,Z,66)<.5)wput(X+1,f,Z,t);}
    else if(f>=KDG-1&&r<.13){const h=2+Math.floor(hash2(X,Z,67)*4);for(let y=f;y<f+h;y++)wput(X,y,Z,T.kamen);if(h>3)for(const [a,b] of [[1,0],[0,1]])wput(X+a,f,Z+b,T.kamen);}
    else if(r<.24){const h=2+Math.floor(hash2(X,Z,68)*Math.min(6,(c-f)/3));for(let y=c-1;y>=c-h;y--)wput(X,y,Z,y===c-h&&hash2(X,Z,69)<.4?T.kristal:T.kamen);}
    else if(r<.27){wput(X,c-1,Z,T.kristal);}}
  for(const P of [KD.gljivice,KD.smokve,KD.fenjeri])for(const p of P){const i=Math.floor(p[0])+Math.floor(p[2])*W;p[1]=(F[i]||KDG)+1.3;}
  /* the portal */
  {const x=128,z=204,g=KDG;for(let dz=-12;dz<=6;dz++)for(let dx=-5;dx<=5;dx++){const X=x+dx,Z=z+dz,i=X+Z*W;if(!F[i])continue;for(let y=F[i];y<g;y++)wput(X,y,Z,T.kamen);for(let y=g;y<C[i];y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;F[i]=g;hmap[i]=g;}
    wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:g,z:z-8.5,cam:0};
    for(const [a,b] of [[-6,-2],[6,-2],[-6,-8],[6,-8]])wput(x+a,g+3,z+b,T.lampion,1);}
  Object.assign(LOOT,{kd_rudnik:{coins:60,mats:{dijamant:1,grumen:2},blocks:{r_zlato:4,sdaske:10},msg:"Rudari su ovdje spremili zlatnu rudu i daske za podupirače."},
    kd_fosil:{coins:55,mats:{ametist:2},blocks:{kvarc:12,duboki:8},msg:"Paleontolog je ostavio kvarc i tamni kamen. Sagradi svoj muzej!"},
    kd_blago:{coins:340,mats:{dijamant:3,smaragd:2,ametist:3},blocks:{kristal:8,ametist:12,kvarc:12},msg:"Blago iz srca planine! Kristali koji svijetle i u najdubljem mraku."}});}
/* the cave keeps animals and launches under the ceiling */
{const _ty=topY;topY=function(x,z){if(WORLD==="kristal"&&KD.C){const X=Math.floor(x),Z=Math.floor(z);if(X<0||Z<0||X>=W||Z>=W)return -1;const c=KD.C[X+Z*W];if(!c)return -1;for(let y=c-1;y>=0;y--){const t=vox[I(X,y,Z)];if(t&&!TYPES[t].glass&&!TYPES[t].water)return y;}return -1;}return _ty.apply(this,arguments);};}
{const _fy=floorY;floorY=function(x,y,z){if(WORLD==="kristal"&&KD.C){const X=Math.floor(x),Z=Math.floor(z);if(X>=0&&Z>=0&&X<W&&Z<W){const c=KD.C[X+Z*W];if(c&&y>=c)y=c-1;}}return _fy.call(this,x,y,z);};}

/* ---------- life ---------- */
function kdLife(){S.wq=S.wq||{};
  PW.guide=pwPut("patuljak","Patuljak Kremenko",124.5,192.5,{frozen:true,ry:Math.PI*.8,sc:1.6,y:KDG+2});
  const dw=pwPut("patuljak","Patuljak Grumenko",KD.dwarf.x,KD.dwarf.z,{frozen:true,ry:0,sc:1.6,y:KDG+2});
  [[52,98],[70,124],[44,120]].forEach(([x,z],i)=>pwPut("ribica2",["Ribica Bjelka","Ribica Ružica","Ribica Stoljetnica"][i],x+.5,z+.5,{speed:.3,sc:1.4,y:KDG+2}));
  [[140,110],[112,136]].forEach(([x,z],i)=>pwPut("krtica2",["Krtica Rovka","Krtica Njuška"][i],x+.5,z+.5,{speed:.8,y:KDG+2}));
  [[60,184],[200,170]].forEach(([x,z],i)=>pwPut("sismis2",["Šišmiš Uško","Šišmiš Kriško"][i],x+.5,z+.5,{speed:.6,y:KDG+3}));
  const kr=pwPut("krtica",PETS.krtica.n,118.5,140.5,{speed:.5,y:KDG+2});const si=pwPut("sismis",PETS.sismis.n,72.5,104.5,{speed:.4,y:KDG+3});
  pwQuest("krtica",{pet:1,en:kr,auto:1,need:4,item:"gljivica",spots:KD.gljivice,got:"Svjetleća gljivica",
    ask:"Njuš, njuš! Ja sam Kopka. Svjetiljka na mojoj kacigi se ugasila, a svjetleće gljivice daju joj svjetlo. Doneseš mi četiri? Svijetle tirkizno, pa ih je lako vidjeti u mraku.",
    done:"Gledaj, svjetiljka opet svijetli! Sad smo prijatelji. Penji se, pokazat ću ti sve prečace u špiljama!",fact:"Krtice gotovo ne vide, ali imaju nevjerojatan njuh i opip. U jednom danu iskopaju tunel dug kao dvadeset autobusa!"});
  pwQuest("sismis",{pet:1,en:si,auto:1,need:3,item:"smokva",spots:KD.smokve,got:"Smokva",
    ask:"Psst, ovdje gore! Ja sam Noćko, šišmiš voćar. Donio sam smokve iz vrta iznad planine, ali sam ih ispustio u mraku. Pomogneš mi naći tri?",
    done:"Mmm, slatke smokve! Hvala ti! Hoćeš letjeti sa mnom kroz špilje? Ne boj se, ja nikad ne udarim u zid!",fact:"Šišmiši vide ušima: puste tihi zvuk i slušaju jeku. Tako u potpunom mraku znaju gdje je svaki zid i svaki kukac."});
  pwQuest("rudar",{en:dw,need:5,item:"fenjer",spots:KD.fenjeri,got:"Rudarski fenjer",cage:"rudar",
    ask:"Hej, mala istraživačice! Ja sam patuljak Grumenko. Moji rudarski fenjeri su se otkotrljali po svim dvoranama i sad je rudnik mračan. Doneseš mi svih pet? Onda ti otvaram kolibu.",
    done:"Svih pet fenjera! Rudnik opet svijetli. Uđi u moju kolibu, čeka te nešto što sam iskopao baš za tebe!",thanks:"Rudnik svijetli, hvala ti!",remind:"Fenjeri svijetle žuto. Ima ih u svim dvoranama."});}
function kdEnv(){
  /* glow worms over the lake: hanging threads of light */
  const tm=new THREE.SpriteMaterial({map:GLOW,color:0x5affe0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9,fog:false});
  const lm=new THREE.LineBasicMaterial({color:0x8affe8,transparent:true,opacity:.35});
  for(let i=0;i<260;i++){const a=Math.random()*6.283,r=Math.sqrt(Math.random())*24;const x=KD.lake.x+Math.cos(a)*r,z=KD.lake.z+Math.sin(a)*r;const X=Math.floor(x),Z=Math.floor(z),c=KD.C[X+Z*W];if(!c)continue;
    const len=.5+Math.random()*2.5;const s=new THREE.Sprite(tm);s.scale.set(.32,.32,1);s.position.set(x,c-len,z);scene.add(s);
    const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,c,z),new THREE.Vector3(x,c-len,z)]);scene.add(new THREE.Line(g,lm));KD.worms.push({s,ph:Math.random()*7});}
  /* sunbeam through the skylight */
  {const S0=KD.sky;const m=new THREE.Mesh(new THREE.CylinderGeometry(6.4,7.5,S0.top-S0.f,24,1,true),new THREE.MeshBasicMaterial({color:0xfff2c8,transparent:true,opacity:.08,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));
    m.position.set(S0.x,(S0.top+S0.f)/2,S0.z);scene.add(m);KD.beam=m;KD.dust=[];for(let i=0;i<60;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xfff0c0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.6}));s.scale.set(.18,.18,1);scene.add(s);KD.dust.push({s,a:Math.random()*6.28,r:Math.random()*6,h:Math.random(),v:.02+Math.random()*.03});}}
  /* mine rails and the cart */
  {const P=KD.cart.pts;const rm=std(0x6a6a72,{metalness:.7,roughness:.35}),wm=std(0x6a4a2a);
    for(let i=0;i<P.length-1;i++){const a=new THREE.Vector3(...P[i]),b=new THREE.Vector3(...P[i+1]);const d=b.clone().sub(a),L=d.length();const mid=a.clone().add(b).multiplyScalar(.5);
      const yaw=Math.atan2(d.x,d.z),pitch=Math.asin(d.y/L);for(const o of [-.45,.45]){const r=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,L+.05),rm);r.position.set(mid.x+Math.cos(yaw)*o,mid.y+.05,mid.z-Math.sin(yaw)*o);r.rotation.set(-pitch,yaw,0,"YXZ");scene.add(r);}
      const sl=new THREE.Mesh(new THREE.BoxGeometry(1.2,.08,.22),wm);sl.position.set(mid.x,mid.y,mid.z);sl.rotation.set(-pitch,yaw,0,"YXZ");scene.add(sl);}
    const g=new THREE.Group();const body=std(0x5a4a3a),iron=std(0x3a3a42,{metalness:.6,roughness:.4});const b=new THREE.Mesh(new THREE.BoxGeometry(1.1,.55,1.5),body);b.position.y=.5;g.add(b);
    const rim=new THREE.Mesh(new THREE.BoxGeometry(1.2,.1,1.6),iron);rim.position.y=.8;g.add(rim);for(const sx of [-.5,.5])for(const sz of [-.5,.5]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,.1,10).rotateZ(Math.PI/2),iron);w.position.set(sx,.2,sz);g.add(w);}
    const ore=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.3),std(0xe8c040,{emissive:LC(0x806010),emissiveIntensity:.4}));ore.position.set(.25,.82,-.4);g.add(ore);
    g.position.set(P[0][0],P[0][1],P[0][2]);scene.add(g);KD.cart.m=g;}
  /* soft glow over the lava vent and the dwarf's lamps */
  for(const [x,y,z,c,s] of [[KD.vent.x,KD.vent.y+.5,KD.vent.z,0xff7a30,6],[KD.ledge.x,KD.ledge.y+1,KD.ledge.z,0xffd27a,5]]){const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:c,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.5}));sp.scale.set(s,s,1);sp.position.set(x,y,z);scene.add(sp);}}
function kdCartPos(t){const P=KD.cart.pts;let i=0,acc=0;while(i<P.length-1){const a=P[i],b=P[i+1];const L=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);if(acc+L>=t){const k=(t-acc)/L;return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k,Math.atan2(b[0]-a[0],b[2]-a[2]),false];}acc+=L;i++;}const e=P[P.length-1];return [e[0],e[1],e[2],0,true];}
function kdTick(dt,tt){const P=FP.p,K=KD.cart;
  for(const w of KD.worms)w.s.material.opacity=.55+.4*Math.sin(tt*1.3+w.ph);
  if(KD.dust){const S0=KD.sky;for(const d of KD.dust){d.h=(d.h+dt*d.v)%1;d.a+=dt*.2;d.s.position.set(S0.x+Math.cos(d.a)*d.r,S0.f+d.h*(S0.top-S0.f),S0.z+Math.sin(d.a)*d.r);}}
  if(KD.vent&&Math.random()<dt*14){const a=Math.random()*6.28,r=Math.random()*1.3;mgSpawn({t:"spark",x:KD.vent.x+Math.cos(a)*r,y:KD.vent.y+Math.random()*2,z:KD.vent.z+Math.sin(a)*r,vy:5+Math.random()*3,life:1.2,size:.16,size2:.04,col:[0xffa040,0xff6a20,0xffe080],add:1,op:1});}
  if(K){K.cool=Math.max(0,K.cool-dt);
    if(K.on){K.t+=dt*7;const [x,y,z,yaw,end]=kdCartPos(K.t);K.m.position.set(x,y,z);K.m.rotation.y=yaw;if(FP.on){FP.p.set(x,y+.55,z);FP.v.set(0,0,0);FP.ground=true;FP.safe.copy(FP.p);}
      if(Math.random()<dt*12)mgSpawn({t:"spark",x:x+(Math.random()-.5),y:y+.1,z:z+(Math.random()-.5),vy:1.5,vx:(Math.random()-.5)*2,vz:(Math.random()-.5)*2,grav:6,life:.4,size:.14,size2:.03,col:[0xffd060,0xffffff],add:1});
      if(end){K.on=false;K.cool=3;if(FP.on){const L=KD.ledge;FP.p.set(L.x,L.y+.05,L.z);FP.v.set(0,0,0);FP.safe.copy(FP.p);}tone(523,.15,"triangle",.05);tone(784,.2,"triangle",.04,.12);toast("Stigla si na vrh rudnika! Za povratak samo skoči dolje na skelu.",3600);}}
    else{if(K.t>0&&K.cool<=0){K.t=0;const [x,y,z]=K.pts[0];K.m.position.set(x,y,z);}
      if(FP.on&&K.cool<=0&&!FP.mount&&!PW.fly&&Math.hypot(P.x-K.st.x,P.z-K.st.z)<1.3&&Math.abs(P.y-K.st.y)<1.4){K.on=true;K.t=0;tone(196,.3,"sawtooth",.03);tone(262,.3,"sawtooth",.03,.15);tipOnce("kd_kolica","Vožnja rudničkim kolicima! Drži se!",3000);}}}
  if(!FP.on)return;
  if(Math.hypot(P.x-KD.vent.x,P.z-KD.vent.z)<6&&P.y<KD.vent.y+3)tipOnce("kd_zrak","Užareni procjep! Topli zrak diže sve gore. Stani u sredinu!",4600);
  if(Math.hypot(P.x-KD.grotto.x,P.z-KD.grotto.z)<8)tipOnce("kd_gljive","Klobuci gljiva vode preko provalije. Skači pažljivo! Ako padneš, kamene stube su uz južni rub provalije.",5200);
  if(Math.hypot(P.x-KD.fossil.x,P.z-KD.fossil.z)<5)tipOnce("kd_fosil","Golemi fosil! Popni se na rep i hodaj po kralježnici do glave.",4600);
  if(Math.hypot(P.x-K.st.x,P.z-K.st.z)<5&&!K.on)tipOnce("kd_stanica","Stanica rudničkih kolica. Stani u kolica i krećeš!",4000);}
function kdTalk(){const n=wStars("kristal");const need=["krtica","sismis"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.kristal&&S.wst.kristal[s.k]));
  const L=n>=WSTAR_N?"Kristalna vrata u srcu planine su otvorena! Ulaz je u Velikoj dvorani, ispod kristalnog tornja.":
    n===0?"Dobro došla u Kristalne dubine! Ja sam patuljak Kremenko. Ovdje pod planinom ima deset kristala iz dubina. Kad ih skupiš, otvorit će se kristalna vrata u srcu planine. Ne boj se mraka, kristali svijetle!":
    "Imaš "+n+" od "+WSTAR_N+" kristala iz dubina. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" U špiljama ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_kristal=(x,P)=>{x.fillStyle="#140c2a";x.fillRect(0,0,64,64);x.fillStyle="#2a2244";P([[0,64],[0,30],[14,22],[30,30],[44,18],[64,26],[64,64]],"#2a2244");
    const cr=(a,b,h,c)=>{x.fillStyle=c;x.beginPath();x.moveTo(a,b);x.lineTo(a+5,b-h*.7);x.lineTo(a+2,b-h);x.lineTo(a-3,b-h*.7);x.closePath();x.fill();};cr(18,58,30,"#7fe9e0");cr(28,60,22,"#9a6ad6");cr(40,58,34,"#7fe9e0");cr(50,60,18,"#9a6ad6");
    x.fillStyle="rgba(127,233,224,.25)";x.beginPath();x.arc(32,44,22,0,7);x.fill();};
  D.mg_trail_krhotine=(x)=>{const c=["#7fe9e0","#9a6ad6","#e0fff8"];for(let i=0;i<16;i++){x.save();x.translate(8+(i*37)%50,8+(i*23)%50);x.rotate(i*.6);x.fillStyle=c[i%3];x.beginPath();x.moveTo(0,-6);x.lineTo(3,0);x.lineTo(0,6);x.lineTo(-3,0);x.closePath();x.fill();x.restore();}};})();

pwWorld("kristal",{dist:"gora",lv:11,n:"Kristalne dubine",d:"Ispod planine: Velika kristalna dvorana sa svjetlarnikom, podzemno jezero pod svjetlećim crvićima, stari rudnik s kolicima, gljivarska špilja, golemi fosil i geoda.",
  feat:["Patuljak Kremenko","Krtica Kopka","Šišmiš Noćko","rudnička kolica","svjetleći crvići","golemi fosil"],fr:["ametist","kristal","svjetlo"],ca:0xc8a0ff,cb:0x3a2a9a,sea:0,fog:.0062,noClouds:1,
  preset:PRESETS.kristal,
  gen:kdGen,env:kdEnv,life:kdLife,talk:kdTalk,tick:kdTick,itemMesh:kdItem,itemCol:[0x9af8ff,0xffffff,0xc8a0ff],itemBurst:[[.6,1,1],[1,1,1],[.8,.6,1]],itemFx:"star",
  item:{one:"Kristal iz dubina",hud:"Kristali iz dubina",done:"Svi kristali iz dubina!",all:"Svih 10 kristala iz dubina! Kristalna vrata u srcu planine su se otvorila!",first:"Prvi kristal iz dubina! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Kristalne dubine! Kristali iz dubina: "+wStars("kristal")+" / "+WSTAR_N+". Patuljak Kremenko te čeka kod portala.",
  facts:{toranj:"Kristali rastu jako polako, sloj po sloj. Najveći kristali na svijetu, u jednoj špilji u Meksiku, dugi su kao autobus!",
    zraka:"Duboko pod zemljom stijene su vruće. Što dublje kopaš, to je toplije, a u samom središtu Zemlje vruće je kao na površini Sunca.",
    jezero:"U špiljama Hrvatske živi čovječja ribica. Slijepa je, ružičasta, može živjeti sto godina i deset godina izdržati bez hrane!",
    kolica:"Nekad su u rudnicima radili i poniji koji su vukli kolica. Danas kolica vuku male lokomotive.",
    geoda:"Geoda izvana izgleda kao običan kamen, a iznutra je šupljina puna kristala. Nastaje kad voda stotinama godina kaplje u šupljinu stijene.",
    rudar:"Rudari su nekad u rudnike nosili kanarince. Ptičica bi upozorila rudare ako bi zrak postao loš.",
    ruda:"Dijamant je najtvrđi prirodni kamen. Napravljen je od istog ugljika kao olovka, samo pod golemim pritiskom duboko u zemlji.",
    gljive:"Neke gljive u špiljama svijetle u mraku. To svjetlo zove se bioluminiscencija, kao kod krijesnica.",
    fosil:"Fosili su ostaci životinja koje su živjele prije milijuna godina. Kosti su se polako pretvorile u kamen.",
    staza:"Siga koja visi sa stropa zove se stalaktit, a ona koja raste s poda stalagmit. Narastu samo oko centimetar u sto godina!"},
  chat:{"Patuljak Grumenko":["Kremenko je moj brat. On priča, a ja kopam!"],ribica2:["...","Ribica te gleda, iako nema očiju. Osjeti te po vodi."],krtica2:["Njuš-njuš! Ovdje negdje ima gljivica."],
    sismis2:["Ciii! Ti si lisica, čujem te po jeci.","Danju spavamo naglavačke, a noću letimo van po voće."]},
  finale:{chest:"kd_blago",isl:"srce",at:{x:128,z:96},rewards:["skin:kristal","trail:krhotine"],locked:"Kristalna vrata u srcu planine su zatvorena. Skupi svih 10 kristala iz dubina!",
    kicker:"Srce planine je otvoreno!",title:"Blago iz srca planine",sub:"Kristalna lisica i Kristalne krhotine sad su tvoji. Patuljak Kremenko kaže da si prava istraživačica dubina!"}});
