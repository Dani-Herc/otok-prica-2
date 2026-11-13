/* =================== OP2 v6: Grad na kanalima (portal world of Lučki grad) =================== */
/* A colourful city on a lagoon in carnival time. Canals between the blocks, little arched bridges, gondolas,
   a piazza with pigeons, a bell tower, a clock tower, a glass workshop, a mask shop, a hedge maze in the palace
   garden, rooftops to run over, a well that leads to a hidden cistern. Ten golden masks open the palace treasury. */
MSKIN.karneval={n:"Karnevalska lisica",d:"Ljubičasto-zlatni karnevalski kostim. Svaki korak je kao ples!",p:0,rar:"l",O:0x8a3ad8,W:0xffe6a0,B:0x2a1440,D:0xf5c33b,glowO:.06,fx:"iskre",wr:"Grad na kanalima"};
MTRAIL.konfeti={n:"Konfeti",d:"Iza Ride lete šareni karnevalski konfeti.",p:0,rar:"l",wr:"Grad na kanalima"};
TR.konfeti=p=>mgSpawn({t:"petal",x:p.x+(Math.random()-.5)*.4,y:p.y+.5+Math.random()*.4,z:p.z+(Math.random()-.5)*.4,vy:.6,life:1.4,size:.22,size2:.12,col:[0xff5a8a,0xffd23a,0x5ac8ff,0x8aff6a,0xb07aff],grav:1,op:1});TRATE.konfeti=10;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","karneval",MSKIN.karneval);ins("trail","konfeti",MTRAIL.konfeti);}

/* ---------- creatures ---------- */
MODELS.golub=function(){const G=0x9aa2b0,D=0x6a7282,N=0x5a9a8a,K=0x111111,O=0xff8a3a,hd={name:"head",px:0,py:.48,pz:.16};
  return mk([[.3,.3,.44,0,.3,0,G],[.12,.06,.2,0,.3,-.3,D],[.06,.22,.34,-.16,.32,-.02,D],[.06,.22,.34,.16,.32,-.02,D],[.24,.12,.22,0,.42,.14,N],[.2,.2,.2,0,.56,.18,G,hd],[.06,.04,.08,0,.54,.32,0xe8c0a0,hd],
    [.04,.05,.02,-.07,.6,.285,O,hd],[.04,.05,.02,.07,.6,.285,O,hd],[.02,.025,.022,-.07,.6,.297,K,hd],[.02,.025,.022,.07,.6,.297,K,hd],[.05,.14,.05,-.07,.08,.04,0xd86a6a],[.05,.14,.05,.07,.08,.04,0xd86a6a]]);};
MODELS.paun=function(){const B=0x1a5ad8,T=0x1a9a7a,G=0x2a8a3a,K=0x111111,Y=0xf5c33b,hd={name:"head",px:0,py:.95,pz:.18},tl={name:"tail",px:0,py:.5,pz:-.26};
  const sp=[[.34,.4,.44,0,.42,0,B],[.14,.36,.14,0,.78,.14,B],[.2,.2,.24,0,1.0,.2,B,hd],[.08,.06,.1,0,.98,.36,0xd8c8a0,hd],[.05,.05,.02,-.09,1.04,.32,K,hd],[.05,.05,.02,.09,1.04,.32,K,hd],[.03,.12,.03,0,1.16,.18,T,hd],[.1,.05,.05,0,1.24,.18,B,hd],
    [.06,.26,.06,-.08,.12,0,0xa08a6a],[.06,.26,.06,.08,.12,0,0xa08a6a],[.08,.3,.36,-.18,.44,-.04,0x6a5a3a],[.08,.3,.36,.18,.44,-.04,0x6a5a3a]];
  for(let i=0;i<7;i++){const a=(i-3)*.32,r=.62;sp.push([.14,.9,.06,Math.sin(a)*r*.75,.62+Math.cos(a)*.42,-.34,i%2?T:G,tl]);sp.push([.14,.14,.07,Math.sin(a)*r*1.05,.6+Math.cos(a)*.86,-.35,i%2?Y:0x2a6ad8,tl]);}
  return mk(sp);};
MODELS.golub2=()=>MODELS.golub();MODELS.paun2=()=>MODELS.paun();
function knHat(hd,col,band){const S=std(col);const a=new THREE.Mesh(new THREE.BoxGeometry(.56,.04,.56),S);a.position.set(0,.16,.04);hd.add(a);const b=new THREE.Mesh(new THREE.BoxGeometry(.36,.14,.36),S);b.position.set(0,.25,.04);hd.add(b);
  const c=new THREE.Mesh(new THREE.BoxGeometry(.37,.05,.37),std(band));c.position.set(0,.21,.04);hd.add(c);}
MODELS.gondolijer=function(){const g=MODELS.macka(),P=g.userData.parts;knHat(P.head,0xf0d890,0xd83a3a);
  const W=std(0xffffff),R=std(0x1a2a5a);for(let i=0;i<3;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(.46,.05,.5),i%2?W:R);s.position.set(0,.3+i*.09,0);g.add(s);}return g;};
MODELS.maskarka=function(){const g=MODELS.macka(),hd=g.userData.parts.head;const m=new THREE.Mesh(new THREE.BoxGeometry(.42,.12,.06),std(0xf5c33b,{metalness:.5,roughness:.3}));m.position.set(0,.04,.22);hd.add(m);
  for(const [x,c] of [[-.08,0xff5a8a],[0,0xb07aff],[.08,0x5ac8ff]]){const f=new THREE.Mesh(new THREE.BoxGeometry(.05,.3,.05),std(c));f.position.set(x,.3,.06);f.rotation.z=x*3;hd.add(f);}return g;};
MODELS.staklar=function(){const g=MODELS.macka(),hd=g.userData.parts.head;const a=new THREE.Mesh(new THREE.BoxGeometry(.4,.1,.04),std(0x2a2a2a));a.position.set(0,.06,.22);hd.add(a);
  const ap=new THREE.Mesh(new THREE.BoxGeometry(.4,.4,.04),std(0x8a5a3a));ap.position.set(0,.3,.23);g.add(ap);return g;};
pwPets("kanali","luka",[
  {k:"golub",fav:"bobice",n:"Golub Gugi",d:"Pametni golub s trga. Zna svaki krov i svaki dimnjak u gradu.",gd:"S krovova donosi sjemenke i izgubljene zlatnike.",gift:()=>[["bobice",3],["coins",14]],spd:1.3,
   spec:{n:"Golubov let",d:"Gugi te nosi preko krovova i kanala! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:9,jump:9,seat:.48},tip:"Gugi leti! Skok je gore, Roni je dolje."},
  {k:"paun",fav:"bobice",n:"Paun Šarko",d:"Ponosni paun iz palačina vrta. Kad raširi rep, cijeli trg zastane.",gd:"Iz vrta donosi šarena pera i bobice.",gift:()=>[["bobice",4],["coins",15]],spd:1.4,
   spec:{n:"Paunov skok",d:"Šarko skače visoko i dvaput zaredom, a rep mu se raširi kao lepeza!",ride:1,ic:"star"},ride:{land:1,speed:8.8,jump:12,dbl:1,seat:.9},tip:"Šarko te nosi! Skoči dvaput zaredom za paunov skok."}]);
PWIT.mrvice={n:"Mrvice kruha",mk:g=>{const m=std(0xe8b870);for(const [x,z,s] of [[0,0,.16],[.14,.06,.1],[-.1,.1,.12],[.04,-.14,.1]]){const o=new THREE.Mesh(new THREE.BoxGeometry(s,s*.7,s),m);o.position.set(x,0,z);g.add(o);}},glow:0xffe0a0};
PWIT.perla={n:"Staklena perla",mk:g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.18,14,10),new THREE.MeshStandardMaterial({color:LC(0x5ac8ff),emissive:LC(0x2a6ad8),emissiveIntensity:.4,roughness:.05,metalness:.2,transparent:true,opacity:.85}));g.add(m);},glow:0x9ae0ff};
PWIT.pero={n:"Karnevalsko pero",mk:g=>{const c=[0xff5a8a,0xb07aff,0x5ac8ff][Math.floor(Math.random()*3)];const f=new THREE.Mesh(new THREE.BoxGeometry(.08,.5,.16),std(c,{emissive:LC(c),emissiveIntensity:.25}));f.rotation.z=.4;g.add(f);
  const s=new THREE.Mesh(new THREE.BoxGeometry(.02,.6,.02),std(0xffffff));s.rotation.z=.4;g.add(s);},glow:0xffb0e0};
function knMask(){const g=new THREE.Group();const gm=new THREE.MeshStandardMaterial({color:LC(0xf5c33b),emissive:LC(0xa06a10),emissiveIntensity:.5,roughness:.25,metalness:.8});
  const f=new THREE.Mesh(new THREE.BoxGeometry(.56,.26,.08),gm);g.add(f);const n=new THREE.Mesh(new THREE.BoxGeometry(.1,.14,.12),gm);n.position.set(0,-.08,.06);g.add(n);
  const k=std(0x1a0a2a);for(const s of [-1,1]){const e=new THREE.Mesh(new THREE.BoxGeometry(.13,.07,.02),k);e.position.set(s*.13,.02,.045);g.add(e);const w=new THREE.Mesh(new THREE.BoxGeometry(.12,.14,.06),gm);w.position.set(s*.32,.08,-.01);w.rotation.z=s*-.5;g.add(w);}
  for(const [x,c] of [[-.1,0xff5a8a],[.02,0xb07aff],[.14,0x5ac8ff]]){const p=new THREE.Mesh(new THREE.BoxGeometry(.06,.34,.04),std(c,{emissive:LC(c),emissiveIntensity:.3}));p.position.set(x,.3,-.02);p.rotation.z=-x*2;g.add(p);}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffe090,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7}));sp.scale.set(2,2,1);g.add(sp);return g;}

/* ---------- the city plan ---------- */
const GY=SL+4;/* walking level of the city */
const KN={gond:[],flags:[],pig:[],moss:[],feath:[],crumbs:[],beads:[],fw:0};
const KG=i=>70+24*i;/* block i spans KG(i)..KG(i)+17, canals 6 wide in between */
const KREG=[[94,118,135,159,"trg"],[142,118,159,159,"palaca"],[142,70,183,111,"vrt"],[118,166,135,183,"dolazak"],[70,118,87,135,"staklo"],[70,142,87,159,"maske"],
  [118,94,135,111,"pozornica"],[70,70,87,87,"sat"],[166,118,183,183,"krovovi"],[94,70,111,87,"k"],[118,70,135,87,"k"],[70,94,87,111,"k"],[94,94,111,111,"k"],[70,166,87,183,"k"],[94,166,111,183,"k"],[142,166,159,183,"k"]];
function knLand(x,z){for(const r of KREG)if(x>=r[0]&&x<=r[2]&&z>=r[1]&&z<=r[3])return r;return null;}
function knH(x,z){if(knLand(x,z))return GY;const d=Math.hypot(x-40,z-206);if(d<6.5)return d<4?SL+3:SL+2;return Math.round(SL-3+(fbm(x*.04+2,z*.04+9)-.5)*3);}
function knGen(){const Y=(x,z)=>hmap[x+z*W];
  const fill=(x0,z0,x1,z1,y0,y1,t)=>{for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)wput(x,y,z,t,1);};
  const clear=(x0,z0,x1,z1,y0,y1)=>{for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)vox[I(x,y,z)]=0;};
  const busy=(x0,z0,x1,z1)=>{for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)mask[x+z*W]=2;};
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,knH(x,z));hmap[x+z*W]=h;const land=knLand(x,z);
    for(let y=0;y<h;y++){let t=T.pijesak;if(land){const edge=!knLand(x-1,z)||!knLand(x+1,z)||!knLand(x,z-1)||!knLand(x,z+1);t=y===h-1?(edge?T.kcigla:((x+z)&1?T.kaldrma:T.kamen)):edge?T.kcigla:T.kamen;}else if(y<h-1)t=T.pijesak;vox[I(x,y,z)]=t;}
    if(land)mask[x+z*W]=2;}
  /* ----- houses: rows of tall narrow painted houses on every plain block ----- */
  const WALLS=[T.bijela,T.vuna_r,T.vuna_n,T.vuna_z,T.cigla,T.upjescenjak,T.vuna_p,T.crvena];
  const house=(x0,z0,x1,z1,top,face,seed,flat)=>{const wl=WALLS[Math.floor(hash2(x0,z0,seed)*WALLS.length)];
    for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){const ex=x===x0||x===x1,ez=z===z0||z===z1;for(let y=GY;y<top;y++){if(!(ex||ez)){vox[I(x,y,z)]=y===top-1?T.cigla:0;continue;}
        const fl=(y-GY)%3,u=ez?x:z;let t=wl;if(y>GY&&fl===1&&u%2===0&&!(ex&&ez))t=T.staklo;
        if(y<GY+2&&ex===false&&ez&&((face===2&&z===z1)||(face===0&&z===z0))&&x===((x0+x1)>>1))t=T.tdaske;if(y<GY+2&&ez===false&&ex&&((face===1&&x===x1)||(face===3&&x===x0))&&z===((z0+z1)>>1))t=T.tdaske;
        if(y===GY+3&&fl===0)t=T.kvarc;vox[I(x,y,z)]=t;prot[I(x,y,z)]=1;}
      if((ex||ez)&&!flat){vox[I(x,top,z)]=(x+z)%2?T.crvena:T.cigla;prot[I(x,top,z)]=1;}}
    if(!flat&&hash2(x0,z1,seed+1)<.6){const cx=x0+1+Math.floor(hash2(x1,z0,seed)*(x1-x0-1)),cz=z0+1;wput(cx,top,cz,T.crvena,1);wput(cx,top+1,cz,T.crvena,1);wput(cx,top+2,cz,T.cigla,1);}
  };
  for(const r of KREG){if(r[4]!=="k")continue;const [x0,z0,x1,z1]=r;let s=1;
    /* a row along each side, set back two blocks from the canal for the walkway */
    for(let x=x0+2;x<=x1-2;){const w=4+Math.floor(hash2(x,z0,7)*3),xe=Math.min(x+w-1,x1-2);if(xe-x>=2){house(x,z0+2,xe,z0+6,GY+7+Math.floor(hash2(x,z0,8)*6),0,s++);house(x,z1-6,xe,z1-2,GY+7+Math.floor(hash2(x,z1,8)*6),2,s++);}x=xe+1;}
    for(let z=z0+7;z<=z1-7;){const w=4,ze=Math.min(z+w-1,z1-7);if(ze-z>=2){house(x0+2,z,x0+6,ze,GY+7+Math.floor(hash2(x0,z,9)*5),3,s++);house(x1-6,z,x1-2,ze,GY+7+Math.floor(hash2(x1,z,9)*5),1,s++);}z=ze+1;}
    const cx=(x0+x1)>>1,cz=(z0+z1)>>1;wput(cx,GY,cz,T.lisce,1);for(let y=GY;y<GY+3;y++)wput(cx,y,cz,T.drvo,1);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let y=GY+3;y<GY+5;y++)if(Math.abs(a)+Math.abs(b)+(y-GY-3)<3)wput(cx+a,y,cz+b,T.lisce,1);
    busy(x0,z0,x1,z1);}
  /* ----- bridges over every canal where two blocks face each other ----- */
  KN.bridges=[];
  const bridgeX=(xa,z)=>{/* canal from xa to xa+5 along x */for(let w=-2;w<=2;w++){const zz=z+w;if(Math.abs(w)<2){wput(xa-1,GY,zz,T.kcigla,1);wput(xa+6,GY,zz,T.kcigla,1);}for(let x=xa;x<=xa+5;x++){wput(x,GY+1,zz,(Math.abs(w)>1?T.kcigla:T.kaldrma),1);clear(x,zz,x,zz,GY-1,GY);}
}for(const w of [-2,2])for(let x=xa;x<=xa+5;x++)wput(x,GY+2,z+w,T.kcigla,1);for(const x of [xa,xa+5])for(const w of [-2,2])wput(x,GY+3,z+w,T.lampion,1);KN.bridges.push([xa+3,z]);};
  const bridgeZ=(x,za)=>{for(let w=-2;w<=2;w++){const xx=x+w;if(Math.abs(w)<2){wput(xx,GY,za-1,T.kcigla,1);wput(xx,GY,za+6,T.kcigla,1);}for(let z=za;z<=za+5;z++){wput(xx,GY+1,z,(Math.abs(w)>1?T.kcigla:T.kaldrma),1);clear(xx,z,xx,z,GY-1,GY);}
}for(const w of [-2,2])for(let z=za;z<=za+5;z++)wput(x+w,GY+2,z,T.kcigla,1);for(const z of [za,za+5])for(const w of [-2,2])wput(x+w,GY+3,z,T.lampion,1);KN.bridges.push([x,za+3]);};
  for(let c=0;c<4;c++){const xa=KG(c)+18;for(let j=0;j<5;j++){const z=KG(j)+8;if(knLand(xa-1,z)&&knLand(xa+6,z)&&!knLand(xa+2,z)&&!(xa===160&&j===2))bridgeX(xa,z);}}
  for(let c=0;c<4;c++){const za=KG(c)+18;for(let i=0;i<5;i++){const x=KG(i)+8;if(knLand(x,za-1)&&knLand(x,za+6)&&!knLand(x,za+2))bridgeZ(x,za);}}
  /* the steps up to the bridges are 1 block, the bridge deck is one higher: the walkway beside the canal stays free */
  /* ----- the piazza: well, bell tower, pigeons, cafe tables ----- */
  {const [x0,z0,x1,z1]=[94,118,135,159];for(let z=z0+1;z<=z1-1;z++)for(let x=x0+1;x<=x1-1;x++)vox[I(x,GY-1,z)]=((Math.floor((x-x0)/3)+Math.floor((z-z0)/3))&1)?T.bijela:T.kaldrma;
    /* the arcades around the piazza: a long low building on the north and west sides */
    for(let x=x0+12;x<=x1-2;x++)for(let z=z0+2;z<=z0+5;z++)for(let y=GY;y<=GY+6;y++){const front=z===z0+5;let t=T.upjescenjak;if(front&&y<GY+3)t=(x%3===0)?T.kvarc:0;if(!front&&z>z0+2&&y<GY+6)t=0;if(z===z0+2&&y%3===1&&x%2===0)t=T.staklo;if(y===GY+6)t=T.cigla;if(y===GY+3&&front)t=T.kvarc;if(t)wput(x,y,z,t,1);}
    /* the well */
    const wx=113,wz=137;for(let a=-1;a<=2;a++)for(let b=-1;b<=2;b++){const inner=a>=0&&a<=1&&b>=0&&b<=1;if(inner){for(let y=10;y<GY;y++)vox[I(wx+a,y,wz+b)]=T.voda;}else wput(wx+a,GY,wz+b,T.kcigla,1);}
    for(const [a,b] of [[-1,-1],[2,2]]){wput(wx+a,GY+1,wz+b,T.drvo,1);wput(wx+a,GY+2,wz+b,T.drvo,1);}for(let a=-1;a<=2;a++)for(let b=-1;b<=2;b++)if(a===b||Math.abs(a-b)<=1)wput(wx+a,GY+3,wz+b,T.krov,1);
    /* the cistern below the well */
    for(let x=108;x<=119;x++)for(let z=132;z<=143;z++)for(let y=5;y<=11;y++){const wall=x===108||x===119||z===132||z===143||y===5||y===11;if(wall){if(!(y===11&&x>=wx&&x<=wx+1&&z>=wz&&z<=wz+1))wput(x,y,z,T.kcigla,1);}else vox[I(x,y,z)]=T.voda;}
    for(const [x,z] of [[109,137],[118,138],[113,133],[114,142]])wput(x,8,z,T.svjetlo,1);for(let y=6;y<=9;y++)for(const [x,z] of [[111,135],[116,135],[111,140],[116,140]])wput(x,y,z,T.kvarc,1);
    wStar("bunar",116.5,7.4,140.5,"Na dnu stare cisterne ispod bunara na trgu. Skoči u bunar i zaroni!");addChest("k_bunar",110,6,141,"Škrinja u cisterni");
    /* bell tower in the north-west corner */
    {const tx=98,tz=124;fill(tx-2,tz-2,tx+2,tz+2,GY,GY+26,T.cigla);for(let y=GY+2;y<GY+26;y+=4)for(const [a,b] of [[0,-2],[0,2],[-2,0],[2,0]])wput(tx+a,y,tz+b,T.tdaske,1);
      const bt=GY+27;for(const [a,b] of [[-2,-2],[2,-2],[-2,2],[2,2]])for(let y=bt;y<bt+4;y++)wput(tx+a,y,tz+b,T.kvarc,1);for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)wput(tx+a,bt+4,tz+b,T.kvarc,1);
      for(let k=0;k<5;k++)for(let a=-2+Math.ceil(k/2);a<=2-Math.ceil(k/2);a++)for(let b=-2+Math.ceil(k/2);b<=2-Math.ceil(k/2);b++)wput(tx+a,bt+5+k,tz+b,T.vuna_zl,1);wput(tx,bt+10,tz,T.zlato,1);
      const RING=[];for(let i=-3;i<3;i++)RING.push([i,3]);for(let i=3;i>-3;i--)RING.push([3,i]);for(let i=3;i>-3;i--)RING.push([i,-3]);for(let i=-3;i<3;i++)RING.push([-3,i]);
      for(let k=0;k<=26;k++){const [a,b]=RING[(k+3)%24];wput(tx+a,GY+k,tz+b,T.kcigla,1);}
      KN.bell={x:tx+.5,y:bt+2.2,z:tz+.5};wStar("zvonik",tx+.5,bt+1,tz+.5,"Gore u zvoniku na trgu. Stube se penju oko tornja!");busy(tx-4,tz-4,tx+4,tz+4);POI.push({k:"k_zvonik",n:"Zvonik",x:tx,z:tz,r:6});}
    /* cafe tables */
    for(const [x,z] of [[124,128],[128,128],[124,132],[128,132],[104,150],[108,150]]){wput(x,GY,z,T.drvo,1);wput(x,GY+1,z,T.stol||T.daske,1);}
    addChest("k_trg",132,GY,156,"Škrinja na trgu");POI.push({k:"k_trg",n:"Trg golubova",x:114,z:140,r:16});}
  /* ----- the palace with the treasury ----- */
  {const [x0,z0,x1,z1]=[144,120,158,157];for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)for(let y=GY;y<=GY+13;y++){const ex=x===x0||x===x1,ez=z===z0||z===z1;let t=0;
      if(ex||ez){t=y<GY+4?T.kvarc:((x+z+y)%4===0?T.vuna_r:T.bijela);if(y<GY+3&&x===x0&&(z-z0)%3!==0)t=0;if(y>=GY+5&&y<=GY+7&&(ex?(z%3===1):(x%3===1)))t=T.staklo;if(y>=GY+10&&y<=GY+11&&(ex?(z%3===1):(x%3===1)))t=T.staklo;}
      else if(y===GY+4||y===GY+9)t=T.tdaske;else if(y===GY+13)t=T.kvarc;if(t)wput(x,y,z,t,1);}
    for(let z=z0;z<=z1;z+=2)for(let x=x0;x<=x1;x+=2)if(x===x0||x===x1||z===z0||z===z1)wput(x,GY+14,z,T.bijela,1);
    for(let z=z0+1;z<=z1-1;z++)for(let y=GY;y<GY+4;y++)if(!(z>=137&&z<=139&&y<GY+3))wput(150,y,z,T.vuna_r,1);
    for(let z=137;z<=139;z++)for(let y=GY;y<GY+3;y++){wput(150,y,z,T.kristal,1);WG.gate.push([150,y,z]);}
    for(const [x,z] of [[146,124],[146,152],[156,124],[156,152],[153,138]])wput(x,GY+3,z,T.lampion,1);for(let z=z0+3;z<=z1-3;z+=4)wput(147,GY,z,T.zlato,1);
    for(let z=134;z<=142;z++)for(let x=152;x<=157;x++)vox[I(x,GY-1,z)]=T.vuna_c;
    WG.isl.palaca={x:154,z:138,y:GY,r:7};addChest("k_blago",155,GY,138,"Riznica karnevala");POI.push({k:"k_palaca",n:"Palača karnevala",x:151,z:138,r:12});
    /* the covered bridge to the rooftops quarter, with a star under it */
    for(let x=159;x<=166;x++)for(let z=136;z<=140;z++)for(let y=GY+4;y<=GY+8;y++){const sh=z===136||z===140||y===GY+4||y===GY+8;if(!sh)continue;let t=T.bijela;if((z===136||z===140)&&y===GY+6&&x%2===0)t=T.tdaske;if(y===GY+4&&(x===159||x===166))t=T.kvarc;wput(x,y,z,t,1);}
    for(const x of [159,166])for(let y=GY;y<GY+4;y++)for(const z of [136,140])wput(x,y,z,T.kvarc,1);
    wStar("most",162.5,WATER+.9,138.5,"Ispod natkrivenog mosta između palače i krovova. Doplivaj ili doveslaj kanalom!");POI.push({k:"k_most",n:"Most uzdaha",x:162,z:138,r:5});}
  /* ----- the palace garden with a hedge maze ----- */
  {const [x0,z0,x1,z1]=[142,70,183,111];for(let z=z0+1;z<=z1-1;z++)for(let x=x0+1;x<=x1-1;x++)vox[I(x,GY-1,z)]=T.trava;
    const N=11,mx=152,mz=79;const C=new Uint8Array(N*N);const st=[[5,10]];C[5+10*N]=1;let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
    const wallAt=new Set();for(let i=0;i<=2*N;i++)for(let j=0;j<=2*N;j++)if(i%2===0||j%2===0)wallAt.add(i+","+j);
    while(st.length){const [cx,cz]=st[st.length-1];const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>[cx+a,cz+b]).filter(([a,b])=>a>=0&&b>=0&&a<N&&b<N&&!C[a+b*N]);if(!nb.length){st.pop();continue;}
      const [nx,nz]=nb[Math.floor(rnd()*nb.length)];C[nx+nz*N]=1;wallAt.delete((cx+nx+1)+","+(cz+nz+1));st.push([nx,nz]);}
    wallAt.delete((2*5+1)+","+(2*N));/* entrance on the south side */
    for(const k of wallAt){const [i,j]=k.split(",").map(Number);for(let y=GY;y<GY+3;y++)wput(mx+i,y,mz+j,(i+j+y)%7===0?T.carlisce:T.lisce,1);}
    const cx=mx+11,cz=mz+11;wStar("labirint",cx+.5,GY+1.1,cz+.5,"U samom središtu labirinta u palačinom vrtu.");addChest("k_vrt",cx,GY,cz-1,"Škrinja u labirintu");wput(cx+1,GY,cz,T.zlato,1);
    for(let x=x0+2;x<=x1-2;x+=3)for(const z of [z0+3,z1-3])if(x<mx-1||x>mx+2*N+1){wput(x,GY,z,T.lisce,1);}
    for(const [x,z] of [[146,76],[146,104],[180,76],[180,104]]){for(let y=GY;y<GY+3;y++)wput(x,y,z,T.drvo,1);for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)for(let y=GY+3;y<=GY+5;y++)if(Math.abs(a)+Math.abs(b)+Math.abs(y-GY-4)<4)wput(x+a,y,z+b,T.tresnja,1);}
    {const fx=147,fz=90;for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++){if(Math.abs(a)===2||Math.abs(b)===2)wput(fx+a,GY,fz+b,T.kvarc,1);else vox[I(fx+a,GY-1,fz+b)]=T.voda;}for(let y=GY;y<GY+3;y++)wput(fx,y,fz,T.kvarc,1);KN.fount={x:fx+.5,y:GY+3,z:fz+.5};}
    busy(x0,z0,x1,z1);POI.push({k:"k_vrt",n:"Palačin vrt",x:163,z:90,r:18});}
  /* ----- glass workshop ----- */
  {const [x0,z0,x1,z1]=[72,120,85,133];for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)for(let y=GY;y<=GY+6;y++){const wall=x===x0||z===z0||z===z1;const post=x===x1&&(z===z0||z===z1||z===(z0+z1>>1));
      if(y===GY+6)wput(x,y,z,(x+z)&1?T.cigla:T.crvena,1);else if(wall||post){let t=T.kcigla;if(wall&&y===GY+3&&(x+z)%3===0)t=T.staklo;wput(x,y,z,t,1);}}
    for(let a=-1;a<=1;a++)for(let y=GY;y<GY+4;y++){wput(x0+1,y,126+a,T.kcigla,1);wput(x0+2,y,126+a,y<GY+2&&a===0?T.zar:T.kcigla,1);}for(let y=GY+4;y<=GY+9;y++)wput(x0+1,y,126,T.kcigla,1);
    const L=[["vuna_c",523],["vuna_z",659],["vuna_t",784],["vuna_zl",988]],PZ=[123,125,127,129],ORD=[2,0,3,1];
    const pads=PZ.map((z,i)=>{vox[I(80,GY-1,z)]=T[L[i][0]];prot[I(80,GY-1,z)]=1;return {x:80,y:GY-1,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    ORD.forEach((j,i)=>{wput(x0,GY+5-i,124,T[L[j][0]],1);});wput(x0+1,GY+5,122,T.lampion,1);
    pwSeq("staklo",{pads,order:ORD,win:"Peć je zapjevala! Staklar Marko otvara vitrinu sa staklenim blagom.",wrong:"Staklo je puklo! Pogledaj vitraj na zidu radionice, odozgo prema dolje, i kreni ispočetka."});
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("staklo",76+a,GY+h,131+b,h===2?T.kristal:T.staklo);}
    wStar("staklo",76.5,GY+.9,131.5,"U staklenoj vitrini u staklarskoj radionici. Upali peć pravim redom boja!");addChest("k_staklo",83,GY,121,"Staklareva škrinja");
    busy(70,118,87,135);POI.push({k:"k_staklo",n:"Staklarska radionica",x:78,z:126,r:9});}
  /* ----- mask shop ----- */
  {const [x0,z0,x1,z1]=[72,145,82,156];for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)for(let y=GY;y<=GY+9;y++){const ex=x===x0||x===x1,ez=z===z0||z===z1;if(!(ex||ez)&&y<GY+9)continue;
      let t=T.vuna_lj;if(y===GY+9)t=T.cigla;else if(y%3===1&&((ex&&z%2===0)||(ez&&x%2===0)))t=T.staklo;if(x===x1&&y<GY+3&&z>=149&&z<=152)t=0;if(y===GY+4)t=T.vuna_z;wput(x,y,z,t,1);}
    for(let z=147;z<=154;z++){wput(x1+1,GY+3,z,z%2?T.vuna_c:T.vuna_b,1);}
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("maske",77+a,GY+h,150+b,h===2?T.vuna_z:T.staklo);}
    wStar("maske",77.5,GY+.9,150.5,"U izlogu Inesine radionice maski. Pomozi Ines skupiti karnevalska pera!");KN.ines={x:84.5,z:150.5};
    busy(70,142,87,159);POI.push({k:"k_maske",n:"Radionica maski",x:78,z:150,r:9});}
  /* ----- carnival stage with the confetti cannon ----- */
  {const [x0,z0,x1,z1]=[120,96,133,109];fill(x0,z0,x1,z0+5,GY,GY,T.tdaske);for(let x=x0;x<=x1;x++)for(let z=z0;z<=z0+5;z++)vox[I(x,GY,z)]=(x+z)&1?T.vuna_c:T.vuna_z;
    for(const x of [x0,x1])for(let y=GY+1;y<=GY+6;y++)wput(x,y,z0,T.vuna_lj,1);for(let x=x0;x<=x1;x++){wput(x,GY+7,z0,(x&1)?T.vuna_lj:T.vuna_z,1);}for(let x=x0+1;x<x1;x++)if(x%2===0)wput(x,GY+6,z0,T.lampion,1);
    for(let x=x0;x<=x1;x++)for(const z of [z0+8,z0+11])if(x%2===0)wput(x,GY,z,T.drvo,1);
    wput(126,GY,106,T.zlato,1);pwLaunch({k:"sat",x:126.5,y:GY+1,z:106.5,to:[78.5,0,78.5],h:16,dur:2.6,msg:"BUM! Konfeti-top te ispalio ravno na vrh gradskog sata!"});KN.can=[126.5,GY+1,105.4];
    busy(118,94,135,111);POI.push({k:"k_pozornica",n:"Karnevalska pozornica",x:126,z:100,r:10});}
  /* ----- clock tower ----- */
  {const tx=78,tz=78;fill(tx-2,tz-2,tx+2,tz+2,GY,GY+24,T.upjescenjak);for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)if(Math.abs(a)===2||Math.abs(b)===2)wput(tx+a,GY+25,tz+b,T.cigla,1);
    for(const [ax,az] of [[0,1],[0,-1],[1,0],[-1,0]]){for(let u=-1;u<=1;u++)for(let v=-1;v<=1;v++){const x=tx+ax*3+(az?u:0),z=tz+az*3+(ax?u:0);wput(x,GY+19+v,z,u===0&&v===0?T.zlato:T.vuna_t,1);}wput(tx+ax*3+(az?0:0),GY+21,tz+az*3,T.zlato,1);}
    for(let y=GY;y<GY+2;y++)wput(tx,y,tz+2,T.tdaske,1);
    wStar("sat",tx+.5,GY+25.9,tz+.5,"Na vrhu gradskog sata. Do njega te nosi konfeti-top s karnevalske pozornice!");wput(tx+1,GY+24,tz-1,T.zlato,1);
    pwLaunch({k:"satdolje",x:tx+1.5,y:GY+25,z:tz-.5,to:[126.5,0,102.5],h:12,dur:2.4,msg:"Juhuu! Natrag na karnevalsku pozornicu!"});
    busy(70,70,87,87);POI.push({k:"k_sat",n:"Gradski sat",x:tx,z:tz,r:7});
    /* a few houses around the clock */
    house(72,82,75,86,GY+8,0,91);house(81,72,86,75,GY+9,1,92);house(81,82,86,86,GY+7,2,93);}
  /* ----- the rooftops quarter ----- */
  {const R=[[168,178,172,182,18],[174,176,178,180,19],[176,170,180,174,20],[170,166,174,170,21],[168,159,172,164,22],[174,156,178,161,23],[176,149,181,154,24],[172,146,174,150,25]];
    R.forEach(([a,b,c,d,t],i)=>house(a,b,c,d,t,i%4,40+i,1));
    wput(167,GY-1,180,T.skocni,1);prot[I(167,GY-1,180)]=1;
    house(168,120,172,126,GY+8,2,60);house(176,122,181,130,GY+10,3,61);house(168,130,172,134,GY+6,1,62);
    wStar("krovovi",173.5,25.9,148.5,"Na najvišem krovu u četvrti krovova. Skoči na skočni oblak i trči po krovovima!");addChest("k_krov",177,24,151,"Škrinja na krovu");
    busy(166,118,183,183);POI.push({k:"k_krovovi",n:"Četvrt krovova",x:174,z:164,r:16});}
  /* ----- arrival: the portal and the gondola pier ----- */
  {const [x0,z0,x1,z1]=[118,166,135,183];house(119,167,123,172,GY+8,1,70);
    for(let z=184;z<=192;z++)for(let x=124;x<=129;x++){wput(x,GY-1,z,(z%3)?T.sdaske:T.tdaske,1);if((x===124||x===129)&&z%4===0)for(let y=GY-2;y>=2&&!vox[I(x,y,z)];y--)wput(x,y,z,T.tdaske,1);}
    for(const x of [124,129]){wput(x,GY,192,T.drvo,1);wput(x,GY+1,192,T.lampion,1);}
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("gondole",131+a,GY+h,170+b,h===2?T.vuna_t:T.bijela);}
    wStar("gondole",131.5,GY+.9,170.5,"U paviljonu gondolijera kod portala. Otvara se kad pobijediš u utrci gondola!");
    const g=GY-1;wPortalArch(126,g,181);WG.portal={x:126.5,y:g+1,z:181.5,ry:Math.PI};WG.spawn={x:126.5,y:GY,z:172.5,cam:0};busy(x0,z0,x1,z1);}
  /* ----- the gondola race through the canals ----- */
  {const pts=[[126,196],[114,186],[90,164],[90,140],[90,116],[100,92],[114,92],[138,92],[138,114],[138,140],[138,162],[114,163]].map(([x,z])=>[x+.5,WATER+.6,z+.5]);
    pwRings("gondole",{start:[126.5,GY,190.5],pts,time:95,col:0xff7ad8,name:"Utrka gondola",win:"Pobjeda u utrci gondola! Paviljon gondolijera se otvorio."});}
  /* ----- the sandbar out in the lagoon ----- */
  {const x=40,z=206,y=SL+2;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("sprud",x+a,y,z+b,(a===b||a===-b)?T.crvena:T.pijesak);pwCell("sprud",x+a,y-1,z+b,T.pijesak);}
    wStar("sprud",x+.5,y-.4,z+.5,"Zakopano pod crvenim X-om na pješčanom sprudu daleko u laguni. Kopaj!");pwDig("sprud",x,y,z,"Kopaš, kopaš... i eno ga! Zlatna maska u pijesku!");
    for(const [a,b] of [[-3,1],[2,-3],[3,2]]){wput(x+a,SL+3,z+b,T.drvo,1);wput(x+a,SL+4,z+b,T.lisce,1);}addChest("k_sprud",x-2,SL+3,z-2,"Škrinja na sprudu");POI.push({k:"k_sprud",n:"Pješčani sprud",x,z,r:7});}
  /* quest pickups */
  KN.crumbs=[[112,150],[122,124],[104,132],[130,146]].map(([x,z])=>[x+.5,GY+1.3,z+.5]);
  KN.beads=[[80,121],[160,106],[176,96],[146,110]].map(([x,z])=>[x+.5,GY+1.3,z+.5]);
  KN.feath=[[95,104],[106,71],[90.5,140],[150,167],[126,71]].map(([x,z])=>{const X=Math.floor(x),Z=Math.floor(z);return [X+.5,floorY(X+.5,H-1,Z+.5)+1.3,Z+.5];});
  {const b=KN.bridges.find(([x,z])=>Math.abs(x-91)<2&&Math.abs(z-150)<2);if(b)KN.feath[2]=[b[0]+.5,GY+2.3,b[1]+.5];}
  Object.assign(LOOT,{k_trg:{coins:45,mats:{zeljezo:2},blocks:{kaldrma:16,bijela:8},msg:"Kamen s trga: sagradi i ti svoj mali trg!"},
    k_bunar:{coins:70,mats:{biser:2,grumen:1},blocks:{kcigla:10,svjetlo:2},msg:"Davno izgubljeno blago iz cisterne!"},
    k_vrt:{coins:55,mats:{smaragd:1},blocks:{lisce:16,tresnja:8},msg:"Vrtlarova škrinja: živica i cvjetovi trešnje."},
    k_staklo:{coins:55,mats:{bakar:2},blocks:{staklo:16,vuna_lj:8},msg:"Staklar Marko ti daruje staklo za prozore."},
    k_krov:{coins:60,mats:{grumen:2},blocks:{crvena:10,cigla:10},msg:"Crijep i cigle s najvišeg krova u gradu."},
    k_sprud:{coins:45,mats:{biser:1},blocks:{pijesak:12},msg:"Pijesak i biser sa spruda u laguni."},
    k_blago:{coins:320,mats:{dijamant:2,smaragd:2,grumen:4},blocks:{zlato:4,vuna_lj:10,vuna_z:10,lampion:4},msg:"Riznica karnevala! Najsjajnije blago u cijelom gradu."}});}

/* ---------- life ---------- */
function knLife(){S.wq=S.wq||{};
  PW.guide=pwPut("gondolijer","Gondolijer Toni",128.5,173.5,{frozen:true,ry:-2.6});
  const ines=pwPut("maskarka","Maskarka Ines",KN.ines.x,KN.ines.z,{frozen:true,ry:Math.PI/2});pwPut("staklar","Staklar Marko",83.5,127.5,{frozen:true,ry:-Math.PI/2});
  pwPut("macka","Mačak Brko",104.5,140.5,{speed:.8});pwPut("macka","Maca Lili",160.5,90.5,{speed:.8});pwPut("zec","Zeko Hop",170.5,100.5,{speed:1});
  [[110,128],[118,146],[122,134],[106,144],[116,124],[128,140],[100,136]].forEach(([x,z],i)=>KN.pig.push(pwPut("golub2",["Gugu","Siva","Perica","Mrva","Dudu","Lepa","Grlica"][i],x+.5,z+.5,{speed:.7})));
  [["Kvak",100.5,114.5],["Kvačica",139.5,128.5],["Patkić",90.5,150.5]].forEach(([n,x,z])=>{const e=spawn("patka",n,{swim:true,speed:.8,near:{x,z}});e.home={x,z};});
  pwPut("paun2","Paunica Lea",150.5,100.5,{speed:.5});
  const gu=pwPut("golub",PETS.golub.n,120.5,140.5,{speed:.6});const sa=pwPut("paun",PETS.paun.n,176.5,86.5,{speed:.5});
  pwQuest("golub",{pet:1,en:gu,auto:1,need:4,item:"mrvice",spots:KN.crumbs,got:"Mrvice kruha",
    ask:"Gru-gru! Ja sam Gugi. Netko je na trgu prosuo mrvice kruha, a ja ih ne mogu sve pronaći. Doneseš mi četiri hrpice? Onda te provedem preko krovova!",
    done:"Gru-gru, kakva gozba! Sad smo prijatelji. Popni se, letimo iznad kanala!",fact:"Golubovi uvijek pronađu put kući, čak i kad su stotinama kilometara daleko."});
  pwQuest("paun",{pet:1,en:sa,auto:1,need:4,item:"perla",spots:KN.beads,got:"Staklena perla",
    ask:"Hm-hm, dobar dan! Ja sam Šarko. Skupljam sve što svjetluca, a izgubio sam četiri staklene perle. Jedna je kod staklara, druge su u palačinom vrtu. Doneseš mi ih?",
    done:"Prekrasne su! Pogledaj kako mi se rep sjaji. Hoćeš li skakati sa mnom?",fact:"Samo paun mužjak ima dugi šareni rep. Kad ga raširi, ima više od sto pera s okom."});
  pwQuest("maske",{en:ines,need:5,item:"pero",spots:KN.feath,got:"Karnevalsko pero",cage:"maske",
    ask:"Dobro došla, mala! Ja sam Ines i radim karnevalske maske. Vjetar mi je odnio pet šarenih pera po cijelom gradu: na mostove, trgove i kod pozornice. Doneseš mi ih? Bez pera maska nije maska!",
    done:"Svih pet pera! Sad je moja najljepša maska gotova. Pogledaj u izlog, ostavila sam ti nešto posebno!",thanks:"Maska je gotova, hvala ti! U izlogu te čeka dar.",remind:"Šarena pera svjetlucaju po gradu."});}
function knGondola(){const g=new THREE.Group();const K=std(0x14141a,{roughness:.35,metalness:.2});const hull=new THREE.Mesh(new THREE.BoxGeometry(1.1,.36,5),K);hull.position.y=.18;g.add(hull);
  for(const s of [1,-1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.5,.3,.9),K);p.position.set(0,.42,s*2.7);p.rotation.x=s*-.45;g.add(p);}
  const f=new THREE.Mesh(new THREE.BoxGeometry(.4,.5,.12),std(0xd8d8e0,{metalness:.7,roughness:.25}));f.position.set(0,.75,2.95);g.add(f);
  const se=new THREE.Mesh(new THREE.BoxGeometry(.9,.18,1.1),std(0xb02a4a));se.position.set(0,.42,.2);g.add(se);
  const m=MODELS.gondolijer();m.position.set(0,.36,-1.6);m.scale.setScalar(.95);g.add(m);const oar=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,2.6),std(0x8a6a3a));oar.position.set(.5,.9,-1.4);oar.rotation.x=.9;g.add(oar);g.userData.oar=oar;g.userData.m=m;return g;}
function knEnv(){/* gondolas glide along loops through the canals */
  const loops=[[[90,92],[90,164],[114,164],[114,186],[62,186],[62,92]],[[138,114],[138,164],[162,164],[162,114]],[[90,92],[138,92],[138,64],[90,64]]];
  for(const L of loops){const pts=[];L.forEach(([x,z],i)=>{const [X,Z]=L[(i+1)%L.length],n=Math.max(1,Math.round(Math.hypot(X-x,Z-z)/3));for(let k=0;k<n;k++){const t=k/n;if(k===0||(t>.2&&t<.8)||n<4)pts.push(new THREE.Vector3(x+(X-x)*t+.5,WATER-.12,z+(Z-z)*t+.5));}});const curve=new THREE.CatmullRomCurve3(pts,true,"centripetal");const g=knGondola();scene.add(g);KN.gond.push({g,curve,t:Math.random(),sp:2.2/curve.getLength()});}
  /* carnival bunting between the houses over the piazza */
  const cols=[0xff5a8a,0xffd23a,0x5ac8ff,0x8aff6a,0xb07aff,0xff8a3a];const geo=new THREE.ConeGeometry(.28,.6,3);geo.rotateX(Math.PI);
  for(const [a,b] of [[[96,130],[134,130]],[[96,146],[134,146]],[[110,120],[110,158]],[[120,96],[134,96]]]){const n=Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/1.2);
    for(let i=1;i<n;i++){const t=i/n,x=a[0]+(b[0]-a[0])*t+.5,z=a[1]+(b[1]-a[1])*t+.5,y=GY+8.2-Math.sin(t*Math.PI)*1.6;const m=new THREE.Mesh(geo,std(cols[i%cols.length],{emissive:LC(cols[i%cols.length]),emissiveIntensity:.15}));m.position.set(x,y,z);m.rotation.y=Math.atan2(b[0]-a[0],b[1]-a[1]);scene.add(m);KN.flags.push(m);}}
  /* the bell in the tower, the confetti cannon, the fountain spray */
  {const b=new THREE.Group(),gm=new THREE.MeshStandardMaterial({color:LC(0xffc53d),roughness:.3,metalness:.75});const c=new THREE.Mesh(new THREE.CylinderGeometry(.4,.9,1.2,14,1,true),gm);c.position.y=-.6;b.add(c);
    const t=new THREE.Mesh(new THREE.SphereGeometry(.42,12,6,0,Math.PI*2,0,Math.PI/2),gm);b.add(t);b.position.set(KN.bell.x,KN.bell.y+.9,KN.bell.z);scene.add(b);KN.bellM=b;}
  {const [x,y,z]=KN.can;pwCannonMesh(x,y,z,Math.PI*1.25,.7);}}
function knTick(dt,tt){const P=FP.p;
  for(const o of KN.gond){o.t=(o.t+dt*o.sp)%1;const p=o.curve.getPointAt(o.t),q=o.curve.getPointAt((o.t+.004)%1);o.g.position.copy(p);o.g.position.y=WATER-.12+Math.sin(tt*1.5+o.t*20)*.04;o.g.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);o.g.userData.oar.rotation.z=Math.sin(tt*1.6)*.25;}
  for(let i=0;i<KN.flags.length;i++)KN.flags[i].rotation.x=Math.sin(tt*2+i*.7)*.15;
  if(KN.bellM){KN.bellM.rotation.z=Math.sin(tt*.9)*.22;if(FP.on&&Math.sin(tt*.9)>.995&&!knTick.b&&Math.hypot(P.x-KN.bell.x,P.z-KN.bell.z)<60){knTick.b=1;tone(523,1,"sine",.02);tone(784,.8,"sine",.012,.02);}if(Math.sin(tt*.9)<.9)knTick.b=0;}
  if(KN.fount&&Math.random()<dt*14)mgSpawn({t:"puff",x:KN.fount.x+(Math.random()-.5)*.3,y:KN.fount.y,z:KN.fount.z+(Math.random()-.5)*.3,vx:(Math.random()-.5)*1.6,vy:3+Math.random(),vz:(Math.random()-.5)*1.6,life:.9,size:.14,size2:.2,col:[0xd8f0ff,0xffffff],grav:7,op:.8});
  /* pigeons flutter up when Rida runs through them */
  if(FP.on)for(const e of KN.pig){const d=Math.hypot(P.x-e.x,P.z-e.z);if(d<2.2&&!e.fly){e.fly=1.6;sfx&&sfx.pop&&sfx.pop();for(let i=0;i<3;i++)mgSpawn({t:"puff",x:e.x,y:e.y+.5,z:e.z,vy:1.4,life:.5,size:.12,size2:.04,col:[0xc8ccd8],grav:1,op:.8});}
    if(e.fly){e.fly-=dt;e.g.position.y=e.y+Math.sin(Math.max(0,e.fly)/1.6*Math.PI)*2.2;if(e.fly<=0){e.fly=0;e.g.position.y=e.y;}}}
  /* fireworks over the city at night once the treasury is open */
  if(WG.gateOpen&&Math.random()<dt*.35)mgSpawn({t:"ring",x:100+Math.random()*60,y:GY+22+Math.random()*8,z:100+Math.random()*60,life:1.2,size:.3,size2:5,col:[0xff5a8a,0xffd23a,0x5ac8ff,0xb07aff][Math.floor(Math.random()*4)],add:1,op:.9});
  if(!FP.on)return;
  if(Math.hypot(P.x-113.5,P.z-137.5)<4&&P.y>GY-1)tipOnce("k_bunar","Stari bunar! Kažu da ispod trga postoji tajna cisterna. Skoči unutra i zaroni!",5000);
  if(Math.hypot(P.x-80,P.z-126)<6)tipOnce("k_staklo","Staklarska radionica! Stani na obojene ploče redom kao boje na vitraju.",4600);
  if(Math.hypot(P.x-167.5,P.z-180.5)<4)tipOnce("k_krovovi","Skočni oblak! Odbaci se na krov i trči od krova do krova sve do najvišeg.",4600);
  if(Math.hypot(P.x-163,P.z-90)<14)tipOnce("k_vrt","Labirint od živice! Nađi put do sredine.",3800);}
function knTalk(){const n=wStars("kanali");const need=["golub","paun"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.kanali&&S.wst.kanali[s.k]));
  const L=n>=WSTAR_N?"Bravo, mala! Riznica karnevala je otvorena. Pogledaj vatromet iznad grada, to je za tebe!":
    n===0?"Ciao, dobro došla u Grad na kanalima! Ja sam Toni, gondolijer. Večeras je veliki karneval, ali deset zlatnih maski izgubilo se po gradu i bez njih se riznica u palači ne otvara. Pronađi ih! Možeš hodati preko mostića ili veslati kanalima.":
    "Imaš "+n+" od "+WSTAR_N+" zlatnih maski. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" Pomozi i prijateljima u gradu: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_kanali=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#5a7ad8");g.addColorStop(1,"#ffb08a");x.fillStyle=g;x.fillRect(0,0,64,64);
    x.fillStyle="#f4e0c0";x.fillRect(4,22,16,30);x.fillStyle="#e87a6a";x.fillRect(22,16,14,36);x.fillStyle="#f5c33b";x.fillRect(38,26,22,26);x.fillStyle="#2a5a9a";x.fillRect(0,50,64,14);
    x.fillStyle="#1a2a5a";for(const [a,b] of [[8,30],[14,30],[26,24],[30,34],[44,32],[52,32]])x.fillRect(a,b,3,5);x.fillStyle="#141418";P([[12,56],[46,56],[52,52],[8,52]],"#141418");x.fillStyle="#d8d8e0";x.fillRect(50,46,3,6);};
  D.mg_trail_konfeti=(x)=>{const c=["#ff5a8a","#ffd23a","#5ac8ff","#8aff6a","#b07aff"];for(let i=0;i<22;i++){x.fillStyle=c[i%5];x.save();x.translate(8+(i*37)%50,8+(i*23)%50);x.rotate(i);x.fillRect(-4,-2,8,4);x.restore();}};})();

pwWorld("kanali",{dist:"luka",lv:7,n:"Grad na kanalima",d:"Šareni grad na vodi u vrijeme karnevala: gondole, mostići, trg s golubovima, zvonik, staklarska radionica, labirint u palačinom vrtu i tajna cisterna ispod bunara.",
  feat:["Gondolijer Toni","Golub Gugi","Paun Šarko","utrka gondola","labirint","konfeti-top"],fr:["kvarc","prizcigla","lampion"],ca:0x8ad8ff,cb:0x3a6ad8,sea:1,fog:.0028,
  preset:{top:0x4a6ad8,hz:0xffb89a,sun:0xffc890,si:2.3,hemi:.7,el:.3,az:2.4,fog:0xe0b0a8,glow:.7,stars:.12,sh:0x3a9ab0,dp:0x1a4a6e,exp:1.05,night:.1},
  gen:knGen,env:knEnv,life:knLife,talk:knTalk,tick:knTick,itemMesh:knMask,itemCol:[0xffe090,0xff9ad8,0x9ae0ff],itemBurst:[[1,.85,.4],[1,.6,.85],[.6,.85,1]],itemFx:"star",
  item:{one:"Zlatna maska",hud:"Zlatne maske",done:"Sve zlatne maske!",all:"Svih 10 zlatnih maski! Kristalna vrata riznice u palači su se otvorila, a nad gradom počinje vatromet!",first:"Prva zlatna maska! Kompas na vrhu pokazuje najbližu."},
  intro:()=>"Grad na kanalima! Zlatne maske: "+wStars("kanali")+" / "+WSTAR_N+". Gondolijer Toni te čeka kod portala.",
  facts:{zvonik:"Zvonici su se gradili visoko da se zvona čuju po cijelom gradu, a s vrha se moglo vidjeti dolazi li brod.",
    bunar:"Gradovi na moru nemaju izvore pitke vode, pa su ljudi kišnicu skupljali u velike podzemne cisterne ispod trgova.",
    staklo:"Staklo se radi od pijeska koji se rastali u jako vrućoj peći. Staklar ga zatim puše kroz dugu cijev, kao balon.",
    maske:"Na karnevalu ljudi nose maske i kostime, pa nitko ne zna tko je tko. Neke karnevalske maske rade se od papira i ljepila.",
    gondole:"Gondola je duga crna lađa. Gondolijer je vesla stojeći, samo jednim veslom, na stražnjem kraju lađe.",
    sat:"Prije nego što su ljudi imali satove na ruci, cijeli grad je gledao u veliki sat na tornju.",
    krovovi:"U gradovima na vodi kuće su gusto zbijene jer na otočićima nema puno mjesta, pa rastu u visinu.",
    labirint:"Labirinti od živice sade se u vrtovima već stotinama godina. Iz svakog labirinta možeš izaći ako se rukom stalno držiš istog zida.",
    most:"Grad na vodi može imati i više od četiristo mostova. Mnogi su zaobljeni da ispod njih prođu lađe.",
    sprud:"Sprud je plitko pješčano mjesto u moru. Za oseke izviri iz vode, a za plime ga more opet prekrije."},
  chat:{"Staklar Marko":["Peć mora biti jako vruća, više od tisuću stupnjeva!","Pogledaj moj vitraj na zidu. Boje idu odozgo prema dolje."],
    "Mačak Brko":["Mijau, golubovi su me opet nadmudrili!","Najbolje ribe su kod ribarnice, ali psst."],"Maca Lili":["U labirintu sam se izgubila tri puta. Drži se jednog zida!"],
    "Zeko Hop":["Juhu, karneval! Volim konfete!"],golub2:["Gru-gru!","Mrvica? Imaš li mrvicu?","Gru, s krova se vidi cijeli grad!"],paun2:["Pogledaj moj rep! Lijep je, zar ne?"],patka:["Kvak! Ovo je moj kanal!","Kvak-kvak, pazi na gondole!"],
    "Paunica Lea":["Šarko je najljepši paun u vrtu, ali to mu nemoj reći."]},
  finale:{chest:"k_blago",isl:"palaca",at:{x:154,z:138},rewards:["skin:karneval","trail:konfeti"],locked:"Kristalna vrata čuvaju riznicu palače. Skupi svih 10 zlatnih maski!",
    kicker:"Karneval može početi!",title:"Riznica karnevala",sub:"Karnevalska lisica i Konfeti sad su tvoji. Toni kaže da je ovo najljepši karneval u povijesti grada!"}});
