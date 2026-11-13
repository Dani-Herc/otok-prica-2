/* =================== OP2 v14: Pustinjski kanjon (portal world of Gorski kraj) =================== */
/* A red rock canyon with a little stream, a natural stone arch, a narrow slot canyon full of light beams, cliff
   dwellings reached by warm air, a temple carved into the cliff, an oasis with palms and a well over a hidden cistern,
   golden dunes with a sand slide, and a tall butte you reach with a hot spring geyser. */
MSKIN.pustinjska={n:"Pustinjska lisica",d:"Svijetlo pješčano krzno i ogromne uši kao u feneka, s narančastim šalom karavane.",p:0,rar:"l",O:0xf0c890,W:0xfff4e0,B:0x5a3a1a,D:0xe8702a,glowO:.04,fx:"zlato",wr:"Pustinjski kanjon"};
MTRAIL.pijesak={n:"Pješčani vrtlog",d:"Iza Ride se diže zlatni pijesak i vrti se kao mali pustinjski vjetar.",p:0,rar:"l",wr:"Pustinjski kanjon"};
TR.pijesak=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.6,y:p.y+.1,z:p.z+(Math.random()-.5)*.6,vy:.8+Math.random()*.6,vx:(Math.random()-.5)*1.2,vz:(Math.random()-.5)*1.2,grav:2,life:.9,size:.16,size2:.05,col:[0xf0c870,0xe8a050,0xfff0c0],op:.9});TRATE.pijesak=14;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","pustinjska",MSKIN.pustinjska);ins("trail","pijesak",MTRAIL.pijesak);}
PRESETS.kanjon={top:0x3a86e0,hz:0xffe2b8,sun:0xfff0d4,si:1.95,hemi:.66,el:.5,az:1.7,fog:0xf2d4a8,glow:.45,stars:0,sh:0x5aa0c8,dp:0x2a6aa8,exp:.76,night:0};

/* red rock: in this world sandstone is painted in red, orange and cream layers, sand turns warm gold */
const KJU={value:0};
{const ob=matOpaque.onBeforeCompile;matOpaque.onBeforeCompile=sh=>{ob(sh);sh.uniforms.uKjRed=KJU;
  sh.fragmentShader="uniform float uKjRed;\n"+sh.fragmentShader.replace("diffuseColor*=texelColor;\n","diffuseColor*=texelColor;\n"+
    "if(uKjRed>.5){bool sst=abs(vReg.y-.41797)<.002&&vReg.x>.05&&vReg.x<.2;bool snd=abs(vReg.y-.10547)<.002&&vReg.x<.01;"+
    "if(sst){float b=floor(vWP.y/2.+.3*sin(vWP.x*.11+vWP.z*.07));float k=fract(sin(b*12.9898)*43758.5453);vec3 c=k<.4?vec3(1.,.5,.36):(k<.75?vec3(1.,.64,.44):vec3(1.,.8,.62));diffuseColor.rgb*=c;}"+
    "else if(snd){diffuseColor.rgb*=vec3(1.04,.84,.62);}}\n");};}

/* ---------- creatures (blocky) ---------- */
MODELS.fenek=function(){const F=0xf0d4a0,L=0xfff4e0,P=0xf0a0a0,K=0x1a1a1a,hd={name:"head",px:0,py:.36,pz:.24},tl={name:"tail",px:0,py:.3,pz:-.24};
  return mk([[.3,.26,.48,0,.3,0,F],[.24,.12,.36,0,.22,.02,L],[.28,.24,.24,0,.42,.3,F,hd],[.12,.1,.12,0,.36,.46,L,hd],[.05,.04,.04,0,.38,.53,K,hd],[.05,.05,.02,-.07,.46,.425,K,hd],[.05,.05,.02,.07,.46,.425,K,hd],
    [.12,.36,.06,-.14,.72,.28,F,hd],[.07,.26,.02,-.14,.72,.31,P,hd],[.12,.36,.06,.14,.72,.28,F,hd],[.07,.26,.02,.14,.72,.31,P,hd],
    [.14,.14,.32,0,.32,-.38,F,tl],[.14,.14,.1,0,.32,-.58,0x3a2a1a,tl]].concat(legs(.07,.16,.08,.16,F,.12)));};
MODELS.fenek2=()=>MODELS.fenek();
MODELS.kamila=function(){const B=0xd8b07a,D=0xb88a5a,K=0x1a1a1a,R=0xd8402a,Y=0xffc030,hd={name:"head",px:0,py:1.3,pz:.66};
  return mk([[.56,.5,1.1,0,1.1,0,B],[.42,.36,.4,0,1.48,.14,B],[.42,.3,.36,0,1.44,-.3,B],[.22,.6,.24,0,1.36,.62,B],[.24,.24,.4,0,1.66,.76,B,hd],[.2,.14,.2,0,1.6,.98,D,hd],[.05,.06,.02,-.12,1.74,.82,K,hd],[.05,.06,.02,.12,1.74,.82,K,hd],
    [.06,.08,.06,-.1,1.84,.66,D,hd],[.06,.08,.06,.1,1.84,.66,D,hd],[.6,.06,.6,0,1.34,-.08,R],[.62,.08,.1,0,1.3,.2,Y],[.62,.08,.1,0,1.3,-.36,Y],[.06,.3,.06,0,.98,-.6,D]].concat(legs(.14,.86,.16,.4,D,.18)));};
MODELS.kamila2=()=>MODELS.kamila();
MODELS.surikata=function(){const F=0xd8b888,D=0x8a6a4a,K=0x1a1a1a,hd={name:"head",px:0,py:.56,pz:.04};
  return mk([[.18,.4,.16,0,.36,0,F],[.12,.26,.04,0,.36,.08,0xf0dcb0],[.16,.14,.18,0,.62,.06,F,hd],[.08,.08,.1,0,.6,.18,D,hd],[.05,.04,.02,-.05,.66,.155,K,hd],[.05,.04,.02,.05,.66,.155,K,hd],
    [.06,.06,.06,-.08,.7,.0,D,hd],[.06,.06,.06,.08,.7,.0,D,hd],[.06,.16,.06,-.1,.42,.08,F],[.06,.16,.06,.1,.42,.08,F],[.06,.06,.32,0,.06,-.16,D],[.08,.16,.08,-.06,.08,0,F],[.08,.16,.08,.06,.08,0,F]]);};
MODELS.guster=function(){const G=0x6ab84a,D=0x3a8a2a,Y=0xffd23a,K=0x111111,hd={name:"head",px:0,py:.1,pz:.24};
  return mk([[.2,.1,.4,0,.1,0,G],[.16,.08,.18,0,.1,.3,G,hd],[.04,.04,.02,-.06,.14,.36,K,hd],[.04,.04,.02,.06,.14,.36,K,hd],[.08,.06,.4,0,.08,-.38,D],[.04,.04,.2,0,.07,-.66,Y],
    [.12,.04,.06,-.14,.04,.12,D],[.12,.04,.06,.14,.04,.12,D],[.12,.04,.06,-.14,.04,-.12,D],[.12,.04,.06,.14,.04,-.12,D],[.06,.02,.3,0,.16,0,Y]]);};
MODELS.karavanka=function(){const S=0xc89068,Hr=0x2a1a10,R=0xd8402a,T2=0x1a8a9a,Y=0xffc030,K=0x111111,hd={name:"head",px:0,py:1.06,pz:0};
  return mk([[.42,.5,.28,0,.72,0,T2],[.5,.42,.34,0,.3,0,R],[.44,.08,.3,0,.5,0,Y],[.12,.42,.12,-.28,.74,0,T2],[.12,.42,.12,.28,.74,0,T2],[.12,.12,.12,-.28,.5,.02,S],[.12,.12,.12,.28,.5,.02,S],
    [.34,.34,.3,0,1.12,0,S,hd],[.06,.06,.02,-.08,1.14,.155,K,hd],[.06,.06,.02,.08,1.14,.155,K,hd],[.1,.04,.02,0,1.04,.155,0xa04a3a,hd],[.4,.2,.36,0,1.32,-.02,R,hd],[.4,.36,.1,0,1.1,-.18,R,hd],[.06,.06,.06,-.18,1.06,.04,Y,hd]]);};
MODELS.arheologinja=function(){const S=0xf0c8a0,Hr=0xa85a2a,Kh=0xc8b078,Br=0x6a4a2a,K=0x1a1a1a,hd={name:"head",px:0,py:1.06,pz:0};
  return mk([[.42,.46,.28,0,.72,0,Kh],[.44,.08,.3,0,.5,0,Br],[.14,.44,.16,-.1,.24,0,0x7a6a4a],[.14,.44,.16,.1,.24,0,0x7a6a4a],[.12,.42,.12,-.28,.74,0,Kh],[.12,.42,.12,.28,.74,0,Kh],[.12,.12,.12,-.28,.5,.02,S],[.12,.12,.12,.28,.5,.02,S],
    [.34,.34,.3,0,1.12,0,S,hd],[.06,.06,.02,-.08,1.14,.155,K,hd],[.06,.06,.02,.08,1.14,.155,K,hd],[.1,.04,.02,0,1.04,.155,0xd86a6a,hd],[.36,.22,.3,0,1.26,-.04,Hr,hd],
    [.56,.04,.52,0,1.34,0,Kh,hd],[.36,.14,.34,0,1.42,0,Kh,hd],[.38,.04,.36,0,1.37,0,Br,hd],[.18,.14,.06,.2,.7,.17,Br]]);};
pwPets("kanjon","gora",[
  {k:"fenek",fav:"bobice",n:"Fenek Uško",d:"Najmanja lisica na svijetu, s ušima većim od glave. Čuje i kukca kako hoda po pijesku.",gd:"Iz pustinje donosi datulje i zlatnike.",gift:()=>[["bobice",3],["coins",20]],spd:1.8,
   spec:{n:"Fenekov sprint",d:"Uško juri po pijesku brže od vjetra i skače preko dina!",ride:1,ic:"star"},ride:{land:1,speed:12,jump:11,dbl:1,seat:.5},tip:"Uško te nosi! Skoči dvaput zaredom."},
  {k:"kamila",fav:"bobice",n:"Kamila Grbica",d:"Mirna kamila s dvije grbe. Danima hoda pustinjom i nikad ne žuri, ali kad potrči, nitko je ne stigne.",gd:"S karavanom donosi zlatnike i tkanine.",gift:()=>[["bobice",4],["coins",26]],spd:1.1,
   spec:{n:"Jahanje kamile",d:"Grbica te nosi visoko iznad pijeska. Odozgo se vidi cijela pustinja!",ride:1,ic:"star"},ride:{land:1,speed:10.8,jump:9,seat:1.62},tip:"Jašeš Grbicu! Odozgo se sve vidi."}]);
PWIT.datulja={n:"Datulja",mk:g=>{const m=std(0x8a4a1a,{emissive:LC(0x301008),emissiveIntensity:.3,roughness:.35});for(const [x,y] of [[0,0],[.14,.06],[-.12,.08]]){const d=new THREE.Mesh(new THREE.SphereGeometry(.1,8,6),m);d.scale.y=1.6;d.position.set(x,y,0);g.add(d);}
  const s=new THREE.Mesh(new THREE.BoxGeometry(.3,.03,.03),std(0xc8a050));s.position.y=.24;g.add(s);},glow:0xffc070};
PWIT.kcvijet={n:"Kaktusov cvijet",mk:g=>{const p=std(0xff5aa8,{emissive:LC(0x801a50),emissiveIntensity:.45});for(let i=0;i<5;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.1,.04,.24),p);l.rotation.y=i/5*Math.PI;l.position.y=.06;g.add(l);}
  const c=new THREE.Mesh(new THREE.BoxGeometry(.1,.08,.1),std(0xffe060));c.position.y=.1;g.add(c);const k=new THREE.Mesh(new THREE.BoxGeometry(.22,.2,.22),std(0x4f8a3a));k.position.y=-.06;g.add(k);},glow:0xff8ac8};
PWIT.vrc={n:"Vrč za vodu",mk:g=>{const m=std(0xc8703a,{roughness:.6});const b=new THREE.Mesh(new THREE.CylinderGeometry(.14,.2,.32,10),m);g.add(b);const n=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,.14,10),m);n.position.y=.22;g.add(n);
  const r=new THREE.Mesh(new THREE.TorusGeometry(.17,.02,4,14),std(0x1a8a9a));r.rotation.x=Math.PI/2;r.position.y=.02;g.add(r);},glow:0x7ad8ff};
function kjItem(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0x3ad8c8),emissive:LC(0x1a9a8a),emissiveIntensity:.8,roughness:.2,metalness:.3,flatShading:true});
  const s=new THREE.Mesh(new THREE.BoxGeometry(.32,.48,.14),m);g.add(s);const e=new THREE.Mesh(new THREE.BoxGeometry(.2,.06,.16),new THREE.MeshStandardMaterial({color:LC(0xffd040),emissive:LC(0xc08010),emissiveIntensity:.7}));e.position.y=.08;g.add(e);
  const e2=e.clone();e2.position.y=-.08;e2.scale.x=.6;g.add(e2);const o=new THREE.Mesh(new THREE.BoxGeometry(.08,.08,.16),e.material);o.position.y=.18;g.add(o);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x5affe8,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.8}));sp.scale.set(2.3,2.3,1);g.add(sp);return g;}

/* ---------- the land ---------- */
const KJMT=32,KJCF=14,KJOF=15;
const KJ={slide:new Map(),datulje:[],cvjetovi:[],vrcevi:[]};
const KJCP=[[128,256],[126,224],[112,198],[118,170],[138,150],[150,128],[140,100],[118,82],[110,50],[124,0]],KJSP=[[116,176],[92,162],[66,152]];
function kjSegD(px,pz,P){let b=1e9;for(let i=0;i<P.length-1;i++){const [ax,az]=P[i],[bx,bz]=P[i+1];const dx=bx-ax,dz=bz-az,L=dx*dx+dz*dz;let t=((px-ax)*dx+(pz-az)*dz)/L;t=Math.max(0,Math.min(1,t));b=Math.min(b,Math.hypot(px-ax-dx*t,pz-az-dz*t));}return b;}
function kjH(x,z){let h=KJMT;
  const wall=(d,w,floor)=>{if(d<w)return floor;const q=d-w;return Math.min(KJMT,floor+6*Math.ceil(q/2.6));};
  const n=(vnoise(x*.07,z*.07,21)-.5)*5;
  h=Math.min(h,wall(kjSegD(x,z,KJCP)+n,9,KJCF));h=Math.min(h,wall(kjSegD(x,z,KJSP)+n*.6,5.5,KJCF));
  h=Math.min(h,wall(Math.hypot(x-52,z-150)+n-20,0,KJOF));
  /* the temple cliff and the dwelling cliff stay solid */
  if(x>=159&&x<=186&&z>=114&&z<=142)h=Math.max(h,KJMT);
  if(x>=92&&x<=104&&z>=70&&z<=94)h=Math.max(h,KJMT);
  /* dunes in the south east */
  const q=Math.min(x-170,z-118);if(q>0){const big=17*Math.exp(-((x-218)*(x-218)+(z-212)*(z-212))/(2*11*11));
    const dn=17+4.5*(Math.sin(x*.16+Math.sin(z*.08)*2.4)*.5+.5)+3*fbm(x*.05,z*.05)+big;h=Math.min(h,Math.max(Math.round(dn),KJMT-5*Math.ceil(q/2.2)));}
  return h;}
function kjSpiral(cx,cz,g,top,r,turns,floorT,supT){const FL=new Map(),PC=[];let last=null;const n=Math.round((top-g)*30);
  for(let i=0;i<=n;i++){const t=i/n,a=1.57+t*turns*6.283,y=g+Math.round(t*(top-g-1));for(const w of [0,1]){const x=Math.round(cx+.5+Math.cos(a)*(r+w)),z=Math.round(cz+.5+Math.sin(a)*(r+w));
      const k=x+","+(y-1)+","+z;if(!FL.has(k))FL.set(k,[x,y-1,z]);PC.push([x,y,z]);}last=[cx+.5+Math.cos(a)*r,y,cz+.5+Math.sin(a)*r];}
  for(const [x,y,z] of FL.values()){wput(x,y,z,floorT,1);for(let yy=y-1;yy>=Math.max(g,y-4);yy--){if(get(x,yy,z)||FL.has(x+","+yy+","+z))break;wput(x,yy,z,supT,1);}}
  for(const [x,y,z] of PC)for(let yy=y;yy<y+3;yy++)if(!FL.has(x+","+yy+","+z)){vox[I(x,yy,z)]=0;prot[I(x,yy,z)]=1;}return last;}
function kjGen(){const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};
  const Y=(x,z)=>hmap[x+z*W];
  const rock=(x,y,z)=>(y%5===4?T.upjescenjak:T.pjescenjak);
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=kjH(x,z);hmap[x+z*W]=h;const dune=Math.min(x-170,z-118)>0&&h<KJMT;const oasis=Math.hypot(x-52,z-150)<17;const floor=h<=KJCF+1;
    for(let y=0;y<h;y++){let t;if(y<3)t=T.kamen;else if(y===h-1){t=dune?T.pijesak:oasis?(Math.hypot(x-52,z-150)<13?T.trava:T.pijesak):floor?(hash2(x,z,3)<.3?T.sljunak:T.pijesak):(h>=KJMT&&hash2(x,z,4)<.12?T.pijesak:rock(x,y,z));}
      else if(dune&&y>h-4)t=T.pijesak;else t=rock(x,y,z);vox[I(x,y,z)]=t;}}
  /* the stream along the canyon floor */
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const d=kjSegD(x,z,KJCP);if(d<1.4&&Y(x,z)===KJCF){wput(x,KJCF-1,z,T.voda);wput(x,KJCF-2,z,T.pijesak);}}
  /* ----- the portal at the canyon mouth ----- */
  {const x=126,z=236,g=KJCF;for(let dz=-12;dz<=4;dz++)for(let dx=-5;dx<=5;dx++){const X=x+dx,Z=z+dz;for(let y=g;y<g+8;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;for(let y=3;y<g;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=y===g-1?T.pijesak:T.pjescenjak;hmap[X+Z*W]=g;}
    wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:g,z:z-8.5,cam:0};busy(x,z-4,7);}
  /* ----- the lookout tower: a wooden stair up to the mesa ----- */
  {const cx=121,cz=210,g=Y(cx,cz);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)if(Math.hypot(dx,dz)<=2.3)for(let y=g;y<KJMT+1;y++)wput(cx+dx,y,cz+dz,(y-g)%4===3?T.tdaske:T.sdaske,1);
    const last=kjSpiral(cx,cz,g,KJMT+1,3.6,2.4,T.bdaske,T.tdaske);
    for(let k=0;k<26;k++){const X=cx+3+k;if(k>3&&Y(X,Math.round(last[2]))>=KJMT)break;for(const o of [-1,0,1]){const Z=Math.round(last[2])+o;wput(X,KJMT,Z,T.bdaske,1);hmap[X+Z*W]=Math.max(Y(X,Z),KJMT+1);for(let h=1;h<4;h++)if(!prot[I(X,KJMT+h,Z)])vox[I(X,KJMT+h,Z)]=0;}if(k%4===0)for(const o of [-2,2]){const Z=Math.round(last[2])+o;if(!get(X,KJMT,Z)){for(let y=KJMT;y>=KJCF&&!get(X,y,Z);y--)wput(X,y,Z,T.tdaske,1);}wput(X,KJMT+1,Z,T.tdaske,1);}}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)if(Math.hypot(dx,dz)<=3.2&&Math.hypot(dx,dz)>2.3&&!get(cx+dx,KJMT,cz+dz))wput(cx+dx,KJMT,cz+dz,T.bdaske,1);
    wput(cx,KJMT+1,cz,T.lampion,1);KJ.tower={x:cx,z:cz};busy(cx,cz,6);POI.push({k:"kj_vidikovac",n:"Vidikovac",x:cx,z:cz,r:6});}
  /* ----- the natural arch over the canyon ----- */
  {const z0=184,cx=114;for(let x=cx-22;x<=cx+22;x++){const u=(x-cx)/16;const yu=Math.round(KJMT-4-10*u*u);for(let z=z0-2;z<=z0+1;z++){if(Y(x,z)>=KJMT)continue;for(let y=Math.max(Y(x,z),yu);y<KJMT;y++)wput(x,y,z,rock(x,y,z),1);hmap[x+z*W]=KJMT;}}
    wStar("luk",cx+.5,KJMT+.9,z0-.5,"Na vrhu Kamenog luka iznad kanjona. Popni se na vidikovac kod portala i hodaj po rubu kanjona!");busy(cx,z0,4);POI.push({k:"kj_luk",n:"Kameni luk",x:cx,z:z0,r:10});}
  /* ----- the slot canyon: a narrow winding crack full of light ----- */
  {const P=[];for(let i=0;i<=60;i++){const t=i/60;P.push([146+t*32+Math.sin(t*9)*3,100-t*10+Math.sin(t*13+1)*2.4]);}const cells=new Set();
    for(const [px,pz] of P)for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const X=Math.round(px+dx),Z=Math.round(pz+dz);if(Math.hypot(X-px,Z-pz)>1.25)continue;cells.add(X+","+Z);}
    for(const k of cells){const [X,Z]=k.split(",").map(Number);for(let y=KJCF;y<KJMT+2;y++){const w=(y-KJCF)/(KJMT-KJCF);if(y>KJCF+3&&hash3(X,y,Z)<.25*w)continue;if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;}wput(X,KJCF-1,Z,T.pijesak);hmap[X+Z*W]=KJCF;}
    const [ex,ez]=P[P.length-1];const EX=Math.round(ex),EZ=Math.round(ez);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){for(let y=KJCF;y<KJCF+5;y++)if(!prot[I(EX+dx,y,EZ+dz)])vox[I(EX+dx,y,EZ+dz)]=0;wput(EX+dx,KJCF-1,EZ+dz,T.pijesak);hmap[EX+dx+(EZ+dz)*W]=KJCF;}
    wput(EX+1,KJCF,EZ-1,T.kaktus,1);wStar("pukotina",EX+.5,KJCF+.9,EZ+.5,"Na kraju uske Svjetlosne pukotine, istočno od kanjona kod hrama. Uđi u procjep u stijeni!");
    KJ.slot=P;KJ.slotIn={x:P[0][0],z:P[0][1]};for(const [px,pz] of P)busy(Math.round(px),Math.round(pz),1);POI.push({k:"kj_pukotina",n:"Svjetlosna pukotina",x:162,z:95,r:12});}
  /* ----- the temple in the cliff ----- */
  {const g=KJCF,fx=160;for(let z=116;z<=140;z++)for(let x=146;x<fx;x++){for(let y=g;y<KJMT+2;y++)if(!prot[I(x,y,z)])vox[I(x,y,z)]=0;if(Y(x,z)>g)wput(x,g-1,z,T.pijesak);hmap[x+z*W]=g;}
    for(let z=118;z<=138;z++)for(let y=g;y<g+16;y++){const pil=(z-118)%4===0;const top=y>=g+12;wput(fx,y,z,top?(y===g+12||y===g+15?T.zlato:T.kvarc):(pil?T.kvarc:T.bijela),1);if(pil&&!top)wput(fx-1,y,z,y===g||y===g+11?T.zlato:T.kvarc,1);}
    for(let z=124;z<=132;z++){const k=Math.abs(z-128);for(let y=g+13;y<g+17-Math.floor(k/3);y++)wput(fx-1,y,z,y===g+16-Math.floor(k/3)?T.zlato:T.kvarc,1);}
    for(let z=118;z<=138;z++)for(let x=fx-1;x>=fx-3;x--){wput(x,g-1,z,T.kvarc,1);}for(const z of [126,130])wput(fx-1,g+3,z,T.lampion,1);
    const room=(x0,x1,z0,z1,h)=>{for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){for(let y=g;y<g+h;y++){vox[I(x,y,z)]=0;prot[I(x,y,z)]=1;}wput(x,g-1,z,(x+z)%2?T.upjescenjak:T.pjescenjak,1);}};
    for(let z=127;z<=129;z++)for(let y=g;y<g+4;y++){vox[I(fx,y,z)]=0;prot[I(fx,y,z)]=1;}
    room(161,171,123,133,7);room(164,168,135,139,5);room(173,181,124,132,7);
    for(let x=165;x<=167;x++)for(let h=0;h<2;h++){vox[I(x,g+h,134)]=0;}for(let h=0;h<2;h++)pwCell("hram",166,g+h,134,T.upjescenjak);
    for(const [x,z] of [[162,124],[162,132],[170,124],[170,132],[174,125],[180,125],[174,131],[180,131]])wput(x,g+3,z,T.lampion,1);
    for(const [x,z] of [[163,125],[163,131],[169,125],[169,131]])for(let y=g;y<g+7;y++)wput(x,y,z,T.upjescenjak,1);
    wStar("hram",166.5,g+.9,137.5,"U skrivenoj sobi Hrama u stijeni. Hijeroglifi na podu otvaraju vrata!");wput(166,g+3,139,T.lampion,1);
    const L=[["vuna_t",523],["vuna_c",659],["zlato",784],["vuna_zl",988]],PP=[[164,127],[164,129],[168,127],[168,129]],ORD=[2,0,3,1];
    const pads=PP.map(([x,z],i)=>{wput(x,g-1,z,T[L[i][0]],1);return {x,y:g-1,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    ORD.forEach((j,i)=>wput(171,g+4-i,128,T[L[j][0]],1));
    pwSeq("hram",{pads,order:ORD,win:"Hijeroglifi su zasjali i kamena vrata su se odmaknula! Skrivena soba hrama je otvorena.",wrong:"Krivi znak! Pogledaj znakove na stražnjem zidu, odozgo prema dolje, i kreni ispočetka."});
    for(let z=127;z<=129;z++)for(let y=g;y<g+3;y++){vox[I(172,y,z)]=0;wput(172,y,z,T.kristal,1);WG.gate.push([172,y,z]);}
    for(let z=123;z<=133;z++)for(let y=g;y<g+7;y++)if(z<127||z>129||y>=g+3)wput(172,y,z,T.upjescenjak,1);
    for(const [x,z] of [[176,126],[176,130],[179,128]])wput(x,g,z,T.zlato,1);
    WG.isl.hram={x:177,z:128,y:g,r:4};addChest("kj_blago",177,g,128,"Blago faraonskog hrama");
    KJ.temple={x:fx-2,z:128};busy(165,128,14);busy(176,128,8);POI.push({k:"kj_hram",n:"Hram u stijeni",x:166,z:128,r:12});}
  /* ----- the cliff dwellings, reached by warm air ----- */
  {const g=KJCF,ly=KJCF+11;for(let z=74;z<=90;z++)for(let x=103;x<=106;x++){wput(x,ly-1,z,x===106?T.upjescenjak:T.pjescenjak,1);for(let y=ly;y<ly+5;y++)if(!prot[I(x,y,z)])vox[I(x,y,z)]=0;hmap[x+z*W]=Math.max(Y(x,z),ly);}
    for(const [z0,w] of [[75,4],[80,5],[86,4]]){for(let z=z0;z<z0+w;z++)for(let x=98;x<=102;x++){for(let y=ly;y<ly+4;y++){const e=x===98||z===z0||z===z0+w-1;vox[I(x,y,z)]=0;prot[I(x,y,z)]=1;if(e&&x!==102)wput(x,y,z,T.zcigla,1);}wput(x,ly-1,z,T.zcigla,1);}
      for(let z=z0;z<z0+w;z++)for(let y=ly;y<ly+4;y++){const door=z===z0+(w>>1)&&y<ly+2;const win=y===ly+2&&(z===z0+1||z===z0+w-2);if(door)continue;wput(102,y,z,win?T.staklo:T.zcigla,1);}
      for(let z=z0;z<z0+w;z++)wput(103,ly+4,z,T.tdaske,1);}
    wput(100,ly+2,82,T.lampion,1);wStar("zid",100.5,ly+.9,82.5,"U kući u stijeni, visoko na zapadnom zidu kanjona. Topli zrak s dna kanjona te diže do police!");addChest("kj_kuce",99,ly,77,"Škrinja drevnih graditelja");
    const wx=109,wz=82;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(wx+dx,g-1,wz+dz,(dx||dz)?T.upjescenjak:T.zar,1);
    WG.wind.push({x:wx+.5,z:wz+.5,r:1.4,y0:g,y1:ly+3,k:"pustinja"});KJ.vent={x:wx+.5,y:g,z:wz+.5};busy(wx,wz,3);busy(100,82,9);POI.push({k:"kj_kuce",n:"Kuće u stijeni",x:101,z:82,r:10});}
  /* ----- the oasis: palms, pond, the caravan tent and the well over the cistern ----- */
  {const cx=52,cz=150;for(let dz=-9;dz<=9;dz++)for(let dx=-9;dx<=9;dx++){const d=Math.hypot(dx,dz)+(vnoise((cx+dx)*.3,(cz+dz)*.3,4)-.5)*1.5;if(d>7.5)continue;const X=cx-2+dx,Z=cz+dz;for(let y=12;y<KJOF;y++)wput(X,y,Z,y===12?T.pijesak:T.voda);hmap[X+Z*W]=KJOF;}
    for(let i=0;i<12;i++){const a=i/12*6.283+.2,r=10.5+hash2(i,1,5)*2.5;pwPalm(Math.round(cx-2+Math.cos(a)*r),Math.round(cz+Math.sin(a)*r),{h:6});}
    for(let i=0;i<8;i++){const a=i/8*6.283,r=8.6;const X=Math.round(cx-2+Math.cos(a)*r),Z=Math.round(cz+Math.sin(a)*r);if(get(X,KJOF-1,Z)===T.trava)wput(X,KJOF,Z,i%2?T.cvijet:T.trava);}
    /* the tent */
    const tx=36,tz=150;for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){wput(tx+dx,KJOF-1,tz+dz,T.vuna_s,1);for(let y=KJOF;y<KJOF+6;y++){const r=3-Math.max(0,y-KJOF-2);const e=Math.max(Math.abs(dx),Math.abs(dz));if(e>r){continue;}
        if(e<r&&y<KJOF+5){vox[I(tx+dx,y,tz+dz)]=0;continue;}if(dx===3&&Math.abs(dz)<=0&&y<KJOF+2)continue;wput(tx+dx,y,tz+dz,(dz+dx+y)%2?T.vuna_c:T.vuna_b,1);}}
    wput(tx,KJOF+6,tz,T.zlato,1);for(let h=0;h<2;h++)pwCell("vrcevi",tx+3,KJOF+h,tz,T.vuna_n);wput(tx-1,KJOF,tz+1,T.bacva,1);
    wStar("vrcevi",tx+.5,KJOF+.9,tz+.5,"U šatoru karavanke Zare u oazi. Pomozi joj naći izgubljene vrčeve!");KJ.tent={x:tx+5.5,z:tz+2.5};busy(tx,tz,5);
    /* the well and the hidden cistern */
    const wx=60,wz=138;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){if(dx||dz){wput(wx+dx,KJOF,wz+dz,T.upjescenjak,1);}}for(let y=6;y<KJOF;y++){wput(wx,y,wz,T.voda,1);}
    for(const [a,b] of [[-1,-1],[1,1]])for(let h=1;h<3;h++)wput(wx+a,KJOF+h,wz+b,T.tdaske,1);for(let dx=-1;dx<=1;dx++)wput(wx+dx,KJOF+3,wz,T.tdaske,1);
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){for(let y=4;y<9;y++)wput(wx+dx,y,wz+dz,T.voda,1);wput(wx+dx,3,wz+dz,(dx+dz)%2?T.upjescenjak:T.pjescenjak,1);wput(wx+dx,9,wz+dz,T.pjescenjak,1);}
    for(const [a,b] of [[-3,-3],[3,3],[-3,3],[3,-3]])for(let y=4;y<9;y++)wput(wx+a,y,wz+b,T.upjescenjak,1);wput(wx,9,wz,T.voda,1);wput(wx-3,8,wz,T.svjetlo,1);wput(wx+3,8,wz,T.svjetlo,1);
    wStar("bunar",wx+2.5,5.6,wz+.5,"Na dnu starog bunara u oazi, u skrivenoj podzemnoj cisterni. Zaroni u bunar!");busy(wx,wz,5);
    POI.push({k:"kj_oaza",n:"Oaza",x:cx,z:cz,r:18});}
  /* ----- the dunes: sand slide, the big dune, the butte with the hot spring ----- */
  {const A=[160,158],B=[208,170];const yb=Math.round(kjH(B[0],B[1]));const n=180;let lastY=KJMT;
    for(let i=0;i<=n;i++){const t=i/n,x=A[0]+(B[0]-A[0])*t,z=A[1]+(B[1]-A[1])*t+Math.sin(t*6.283)*4,y=Math.round(KJMT-(KJMT-yb)*Math.pow(t,.9));const dir=[B[0]-A[0],(B[1]-A[1])+Math.cos(t*6.283)*4*6.283];const L=Math.hypot(dir[0],dir[1]);
      for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const X=Math.round(x+dx),Z=Math.round(z+dz);const d=Math.hypot(X-x,Z-z);if(d>1.9)continue;const k=X+","+Z;const c=KJ.slide.get(k);if(c&&c.y<=y)continue;
        KJ.slide.set(k,{y,d:[dir[0]/L,dir[1]/L]});}}
    for(const [k,c] of KJ.slide){const [X,Z]=k.split(",").map(Number);for(let y=c.y;y<c.y+6;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;wput(X,c.y-1,Z,T.pijesak,1);for(let y=c.y-2;y>2&&!get(X,y,Z);y--)wput(X,y,Z,T.pjescenjak);hmap[X+Z*W]=c.y;}
    for(const [k,c] of KJ.slide){const [X,Z]=k.split(",").map(Number);for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const k2=(X+a)+","+(Z+b);if(KJ.slide.has(k2))continue;if(!get(X+a,c.y,Z+b))wput(X+a,c.y,Z+b,T.upjescenjak,1);}}
    KJ.slideTop={x:A[0]+.5,z:A[1]+.5};wput(A[0]-1,KJMT,A[1]-3,T.lampion,1);wput(A[0]-1,KJMT,A[1]+3,T.lampion,1);busy(184,164,4);
    /* the big dune */
    let bx=218,bz=212,by=Y(bx,bz);for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)if(Y(bx+dx,bz+dz)>by){by=Y(bx+dx,bz+dz);}
    wStar("dina",bx+.5,by+.9,bz+.5,"Na vrhu Velike dine na jugoistoku pustinje. Penji se po pijesku sve do vrha!");busy(bx,bz,3);
    /* the butte and the hot spring geyser */
    const ux=198,uz=148,ut=50;for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const d=Math.hypot(dx,dz)+(vnoise((ux+dx)*.4,(uz+dz)*.4,6)-.5);if(d>4.8)continue;const t=d<3.6?ut:ut-Math.round((d-3.6)*16);for(let y=3;y<t;y++)wput(ux+dx,y,uz+dz,rock(ux+dx,y,uz+dz),1);hmap[ux+dx+(uz+dz)*W]=Math.max(Y(ux+dx,uz+dz),t);}
    wput(ux+1,ut,uz+1,T.kaktus,1);wput(ux+1,ut+1,uz+1,T.kaktus,1);
    wStar("stup",ux-.5,ut+.9,uz-.5,"Na vrhu Pješčanog stupa u dinama. Do njega te baci vrući izvor!");
    const gx=188,gz=160,gy=Y(gx,gz);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const d=Math.hypot(dx,dz);if(d>2.3)continue;wput(gx+dx,gy-1,gz+dz,d<1.2?T.svjetlo:(d<1.9?T.voda:T.upjescenjak),1);}
    pwLaunch({k:"izvor",x:gx+.5,y:gy,z:gz+.5,to:[ux+.5,0,uz+.5],h:11,dur:2.2,col:[0xffffff,0x9ae8ff],fx:"bubble",msg:"ŠŠŠŠ! Vrući izvor te izbacio sve do vrha Pješčanog stupa!"});KJ.geyser={x:gx+.5,y:gy,z:gz+.5};
    busy(ux,uz,7);busy(gx,gz,3);
    /* buried caravan chest under the red X */
    const dx0=204,dz0=196,dy=Y(dx0,dz0);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){for(let y=dy;y<dy+3;y++)if(!prot[I(dx0+a,y,dz0+b)])vox[I(dx0+a,y,dz0+b)]=0;hmap[dx0+a+(dz0+b)*W]=dy;
      pwCell("blago",dx0+a,dy-1,dz0+b,(a===b||a===-b)?T.crvena:T.pijesak);pwCell("blago",dx0+a,dy-2,dz0+b,T.pjescenjak);}
    wStar("blago",dx0+.5,dy-1.4,dz0+.5,"Zakopan u dinama pod crvenim X-om. Kopaj!");pwDig("blago",dx0,dy-1,dz0,"Kopaš kroz vrući pijesak... i eno ga! Izgubljeno blago karavane!");busy(dx0,dz0,3);
    POI.push({k:"kj_dine",n:"Zlatne dine",x:200,z:190,r:26});}
  /* ----- rings along the canyon floor ----- */
  {const pts=[];const P=[[150,128],[144,139],[138,150],[132,155],[126,162],[120,168]];for(let i=0;i<10;i++){const t=i/9*(P.length-1),k=Math.min(P.length-2,Math.floor(t)),f=t-k;const x=P[k][0]+(P[k+1][0]-P[k][0])*f+(i%2?2:-2),z=P[k][1]+(P[k+1][1]-P[k][1])*f;
      pts.push([x+.5,KJCF+1.8+(i%3===1?1.4:0),z+.5]);busy(Math.round(x),Math.round(z),1);}
    const cx=146,cz=120,g=Y(cx,cz);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("staza",cx+a,g+h,cz+b,(a+b+h)%2?T.upjescenjak:T.zlato);}
    wStar("staza",cx+.5,g+.9,cz+.5,"U zlatnom kavezu ispred Hrama u stijeni. Otvara se kad protrčiš kroz sve prstenove u kanjonu!");busy(cx,cz,3);
    pwRings("staza",{start:[150.5,KJCF,124.5],pts,time:50,col:0xffa040,name:"Prstenovi kanjona",win:"Protrčala si kroz sve prstenove kanjona! Zlatni kavez ispred hrama se otvorio."});}
  /* pickups */
  const spot=([x,z])=>{busy(x,z,1);return [x+.5,Y(x,z)+1.3,z+.5];};
  KJ.datulje=[[58,160],[46,140],[64,154],[40,160]].map(spot);
  KJ.cvjetovi=[[124,120],[196,176],[140,214]].map(spot);
  KJ.vrcevi=[[120,200],[146,140],[180,210],[116,60],[150,96]].map(spot);
  /* decoration: cacti, rocks, bushes, dry trees */
  for(let z=4;z<W-4;z+=3)for(let x=4;x<W-4;x+=3){const X=x+Math.floor(hash2(x,z,81)*3),Z=z+Math.floor(hash2(x,z,82)*3),i=X+Z*W;const y=Y(X,Z);if(mask[i]||y<KJCF)continue;const top=get(X,y-1,Z);if(top===T.voda||top===T.trava&&Math.hypot(X-52,Z-150)<13)continue;const r=hash2(X,Z,83);
    if(r<.035){const h=2+Math.floor(hash2(X,Z,84)*3);for(let k=0;k<h;k++)wput(X,y+k,Z,T.kaktus);if(h>2){const s=hash2(X,Z,85)<.5?1:-1;wput(X+s,y+1,Z,T.kaktus);wput(X+s,y+2,Z,T.kaktus);}}
    else if(r<.06&&y<KJMT){wput(X,y,Z,rock(X,y,Z));if(hash2(X,Z,86)<.4)wput(X+1,y,Z,T.pjescenjak);}
    else if(r<.075&&y>=KJMT){const h=3;for(let k=0;k<h;k++)wput(X,y+k,Z,T.drvo);wput(X+1,y+2,Z,T.drvo);wput(X-1,y+3,Z,T.drvo);}}
  Object.assign(LOOT,{kj_kuce:{coins:60,mats:{bakar:3,smaragd:1},blocks:{zcigla:16,staklo:4},msg:"Drevni graditelji ostavili su zemljane cigle. Sagradi kuću u stijeni!"},
    kj_blago:{coins:350,mats:{dijamant:3,smaragd:2,ametist:3},blocks:{upjescenjak:16,zlato:8,pjescenjak:16},msg:"Blago faraonskog hrama! Zlato i ukrasni pješčenjak za tvoju piramidu."}});}

/* ---------- life ---------- */
function kjLife(){S.wq=S.wq||{};
  PW.guide=pwPut("arheologinja","Arheologinja Nada",122.5,228.5,{frozen:true,ry:Math.PI*.8,sc:1.5,y:KJCF+2});
  const za=pwPut("karavanka","Karavanka Zara",KJ.tent.x,KJ.tent.z,{frozen:true,ry:Math.PI*.4,sc:1.5,y:KJOF+2});
  [[44,166,"Kamila Sahara"],[40,170,"Kamila Dina"]].forEach(([x,z,n])=>pwPut("kamila2",n,x+.5,z+.5,{speed:.25,sc:1.2,y:KJOF+2}));
  [[66,164],[67,165],[65,166],[68,163]].forEach(([x,z],i)=>pwPut("surikata",["Surikata Stražar","Surikata Mrvica","Surikata Brko","Surikata Pjega"][i],x+.5,z+.5,{frozen:true,ry:Math.PI*(.2+i*.3),y:KJOF+2}));
  [[136,170],[150,110],[196,200]].forEach(([x,z],i)=>pwPut("guster",["Gušter Sunčko","Gušterica Brza","Gušter Pjesko"][i],x+.5,z+.5,{speed:1.2,y:34}));
  [[188,186],[46,134]].forEach(([x,z],i)=>pwPut("fenek2",["Fenek Pustinjko","Fenekica Uška"][i],x+.5,z+.5,{speed:.8,y:34}));
  const fe=pwPut("fenek",PETS.fenek.n,60.5,166.5,{speed:.6,y:KJOF+2});const ka=pwPut("kamila",PETS.kamila.n,130.5,196.5,{speed:.3,y:KJCF+2});
  pwQuest("fenek",{pet:1,en:fe,auto:1,need:4,item:"datulja",spots:KJ.datulje,got:"Datulja",
    ask:"Psst! Čuješ li me? Ja sam Uško, fenek. Moje uši čuju sve, ali moj trbuščić kruli. Palme u oazi su ispustile datulje. Doneseš mi četiri?",
    done:"Njam, slatke datulje! Hvala ti! Hoćeš juriti sa mnom po dinama? Nitko nije brži od feneka!",fact:"Fenek ima najveće uši u odnosu na tijelo od svih lisica. Kroz uši izbacuje toplinu, pa mu nije vruće ni u pustinji!"});
  pwQuest("kamila",{pet:1,en:ka,auto:1,need:3,item:"kcvijet",spots:KJ.cvjetovi,got:"Kaktusov cvijet",
    ask:"Mmmm. Polako, polako. Ja sam Grbica. Kaktusi u pustinji cvjetaju samo jednom godišnje, a ja jako volim njihove ružičaste cvjetove. Doneseš mi tri?",
    done:"Prekrasni cvjetovi! Penji se na moju grbu, pokazat ću ti pustinju odozgo.",fact:"Kamila u grbi ne nosi vodu nego mast. Zato može danima hodati bez hrane, a kad pije, popije cijelu kadu vode odjednom!"});
  pwQuest("vrcevi",{en:za,need:5,item:"vrc",spots:KJ.vrcevi,got:"Vrč za vodu",cage:"vrcevi",
    ask:"Dobro došla u oazu, putnice! Ja sam Zara i vodim karavanu. Pješčana oluja raznijela je naših pet vrčeva za vodu po cijelom kanjonu. Bez njih ne možemo dalje. Pomogneš nam?",
    done:"Svih pet vrčeva! Karavana može nastaviti put. Uđi u moj šator, ostavila sam ti nešto posebno.",thanks:"Vrčevi su puni, hvala ti!",remind:"Vrčevi su od crvene gline s tirkiznim obručem. Ima ih po cijelom kanjonu."});}
function kjEnv(){KJU.value=1;
  /* light beams in the slot canyon */
  const m=new THREE.MeshBasicMaterial({color:0xffe0a8,transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false});
  for(const i of [12,28,44]){const [x,z]=KJ.slot[i];const b=new THREE.Mesh(new THREE.CylinderGeometry(.5,.9,KJMT-KJCF+2,8,1,true),m);b.position.set(x+.5,(KJMT+KJCF)/2+1,z+.5);b.rotation.z=.12;scene.add(b);}
  KJ.dust=[];for(let i=0;i<40;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffe8c0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.5}));s.scale.set(.16,.16,1);scene.add(s);
    const p=KJ.slot[Math.floor(Math.random()*KJ.slot.length)];KJ.dust.push({s,x:p[0]+.5,z:p[1]+.5,h:Math.random(),v:.02+Math.random()*.03});}
  /* heat shimmer over the hot spring */
  {const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xbff0ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.45}));sp.scale.set(6,6,1);sp.position.set(KJ.geyser.x,KJ.geyser.y+.4,KJ.geyser.z);scene.add(sp);}}
function kjTick(dt,tt){const P=FP.p,V=FP.v;
  if(KJ.dust)for(const d of KJ.dust){d.h=(d.h+dt*d.v)%1;d.s.position.set(d.x+Math.sin(d.h*9)*.3,KJCF+d.h*(KJMT-KJCF),d.z);}
  if(KJ.geyser&&Math.random()<dt*12){const G=KJ.geyser;mgSpawn({t:"bubble",x:G.x+(Math.random()-.5)*1.4,y:G.y+.1,z:G.z+(Math.random()-.5)*1.4,vy:3+Math.random()*3,life:.9,size:.25,size2:.5,col:[0xffffff,0xd8f4ff],op:.6});}
  if(KJ.vent&&Math.random()<dt*8){const v=KJ.vent;mgSpawn({t:"spark",x:v.x+(Math.random()-.5)*2,y:v.y+Math.random()*4,z:v.z+(Math.random()-.5)*2,vy:4+Math.random()*2,life:1,size:.14,size2:.04,col:[0xffd080,0xffa050],add:1,op:.8});}
  if(!FP.on)return;
  /* sandboarding: the slide pushes you downhill */
  const c=!FP.mount&&!PW.fly&&KJ.slide.get(Math.floor(P.x)+","+Math.floor(P.z));if(c&&Math.abs(P.y-c.y)<1.6){if(!KJ.onSlide){KJ.onSlide=1;KJ.acc0=FP.accMul||1;}FP.accMul=.12;}else if(KJ.onSlide){KJ.onSlide=0;FP.accMul=KJ.acc0||1;}
  if(FP.ground&&c&&Math.abs(P.y-c.y)<1.3){{const hs=Math.hypot(V.x,V.z);if(hs<14){V.x+=c.d[0]*dt*24;V.z+=c.d[1]*dt*24;}
      if(Math.random()<dt*Math.max(4,hs*2))mgSpawn({t:"spark",x:P.x,y:P.y+.1,z:P.z,vx:-V.x*.12+(Math.random()-.5),vy:1+Math.random(),vz:-V.z*.12+(Math.random()-.5),grav:4,life:.6,size:.18,size2:.06,col:[0xf0c870,0xe8a050],op:.9});
      tipOnce("kj_tobogan","Wiii! Pješčani tobogan te nosi niz dinu!",3000);}}
  if(Math.hypot(P.x-KJ.slideTop.x,P.z-KJ.slideTop.z)<6)tipOnce("kj_vrh","Pješčani tobogan! Zakorači na pijesak i kliži sve do dina.",4000);
  if(Math.hypot(P.x-KJ.vent.x,P.z-KJ.vent.z)<5)tipOnce("kj_zrak","Vrući zrak s dna kanjona diže se uz zid! Stani na užareni kamen.",4600);
  if(Math.hypot(P.x-KJ.geyser.x,P.z-KJ.geyser.z)<5)tipOnce("kj_izvor","Vrući izvor! Stani u sredinu i čekaj da izbaci.",3600);
  if(Math.hypot(P.x-KJ.slotIn.x,P.z-KJ.slotIn.z)<6)tipOnce("kj_pukotina","Svjetlosna pukotina! Uska staza vijuga kroz stijenu, a sunce ulazi odozgo u zrakama.",4800);
  if(Math.hypot(P.x-KJ.tower.x,P.z-KJ.tower.z)<7)tipOnce("kj_toranj","Vidikovac! Stube oko tornja vode na rub kanjona.",3800);}
function kjTalk(){const n=wStars("kanjon");const need=["fenek","kamila"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.kanjon&&S.wst.kanjon[s.k]));
  const L=n>=WSTAR_N?"Riznica hrama je otvorena! Hram je isklesan u istočnom zidu kanjona, a riznica je iza kristalnih vrata.":
    n===0?"Dobro došla u Pustinjski kanjon! Ja sam arheologinja Nada. Ovdje je skriveno deset drevnih skarabeja. Kad ih skupiš, otvorit će se riznica hrama u stijeni. Ponesi vode, sunce je jako!":
    "Imaš "+n+" od "+WSTAR_N+" skarabeja. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" U pustinji ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_kanjon=(x,P)=>{x.fillStyle="#7ab8f0";x.fillRect(0,0,64,64);P([[0,64],[0,20],[18,20],[18,30],[26,30],[26,64]],"#c8603a");P([[38,64],[38,26],[46,26],[46,16],[64,16],[64,64]],"#c8603a");
    P([[0,34],[26,34],[26,38],[0,38]],"#e8904a");P([[38,40],[64,40],[64,44],[38,44]],"#e8904a");P([[26,64],[26,52],[38,52],[38,64]],"#f0c870");x.fillStyle="#3a8ae0";x.fillRect(29,58,6,6);};
  D.mg_trail_pijesak=(x)=>{const c=["#f0c870","#e8a050","#fff0c0"];for(let i=0;i<26;i++){x.fillStyle=c[i%3];x.beginPath();x.arc(8+(i*37)%50,8+(i*23)%50,1.5+(i%3),0,7);x.fill();}};})();

pwWorld("kanjon",{dist:"gora",lv:13,n:"Pustinjski kanjon",d:"Crveni kanjon s potokom: kameni luk, uska svjetlosna pukotina, kuće u stijeni, hram isklesan u liticu, oaza s palmama i bunarom, zlatne dine s pješčanim toboganom.",
  feat:["Arheologinja Nada","Fenek Uško","Kamila Grbica","hram u stijeni","pješčani tobogan","svjetlosna pukotina"],fr:["pjescenjak","upjescenjak","zlato"],ca:0xffe0a0,cb:0xd8803a,sea:0,fog:.0026,noClouds:0,
  preset:PRESETS.kanjon,
  gen:kjGen,env:kjEnv,life:kjLife,talk:kjTalk,tick:kjTick,itemMesh:kjItem,itemCol:[0x3ad8c8,0xffd040,0xffffff],itemBurst:[[.3,1,.9],[1,.85,.3],[1,1,1]],itemFx:"star",
  item:{one:"Drevni skarabej",hud:"Drevni skarabeji",done:"Svi drevni skarabeji!",all:"Svih 10 drevnih skarabeja! Riznica hrama u stijeni se otvorila!",first:"Prvi drevni skarabej! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Pustinjski kanjon! Drevni skarabeji: "+wStars("kanjon")+" / "+WSTAR_N+". Arheologinja Nada te čeka kod portala.",
  facts:{luk:"Kameni lukovi nastaju tisućama godina dok vjetar i voda polako odnose mekši kamen, a tvrđi ostaje stajati kao most.",
    pukotina:"Uske kanjone kroz koje prolazi sunčeva zraka izdubila je voda od kiše. Kad pada kiša, kroz njih juri bujica, pa se u njih ulazi samo po suhom vremenu.",
    hram:"Stari Egipćani pisali su hijeroglifima, sličicama umjesto slova. Bilo ih je više od tisuću različitih!",
    zid:"Prije više od sedam stotina godina ljudi u Americi gradili su cijela sela u udubinama litica. Penjali su se do njih ljestvama.",
    vrcevi:"Karavane su nizovi kamila koje nose robu preko pustinje. Putovale su mjesecima, od oaze do oaze.",
    bunar:"Ispod pustinje često se skriva voda. Oaza nastaje tamo gdje ta podzemna voda izbija na površinu.",
    dina:"Pješčane dine se miču! Vjetar nosi zrnca pijeska preko vrha, pa cijela dina polako putuje pustinjom.",
    stup:"Visoki kameni stupovi u pustinji su ostaci velikih stijena. Sve oko njih vjetar je odnio, a oni stoje kao divovi.",
    blago:"Skarabej je kukac balegar. Stari Egipćani su ga smatrali svetim i od dragog kamena izrađivali su skarabeje za sreću.",
    staza:"Danju je u pustinji jako vruće, a noću može biti hladnije nego u hladnjaku. Zato pustinjske životinje danju spavaju u rupama."},
  chat:{surikata:["Surikata stoji na stražarskom položaju i pazi da ne dođe orao.","Pssst! Tiho, stražarim!"],guster:["Gušter se sunča na toplom kamenu. Mašu ti repom!"],
    kamila2:["Mmmm. Kamila polako žvače i gleda te dugim trepavicama."],fenek2:["Fenek okrene velike uši prema tebi. Čuje ti srce kako kuca!"]},
  finale:{chest:"kj_blago",isl:"hram",at:{x:177,z:128},rewards:["skin:pustinjska","trail:pijesak"],locked:"Kristalna vrata riznice hrama su zatvorena. Skupi svih 10 drevnih skarabeja!",
    kicker:"Riznica hrama je otvorena!",title:"Blago Pustinjskog kanjona",sub:"Pustinjska lisica i Pješčani vrtlog sad su tvoji. Arheologinja Nada kaže da si najveća istraživačica pustinje!"}});
