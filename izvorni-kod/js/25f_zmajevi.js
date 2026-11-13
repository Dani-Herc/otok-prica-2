/* =================== OP2 v13: Zmajevi vrhovi (portal world of Gorski kraj) =================== */
/* Mountain peaks rising out of a sea of sunset clouds, joined by rope bridges. A dragon nest with a sleeping mother
   dragon and her hatchlings, a waterfall you walk through, a bell pagoda, an ice peak with a spiral path, a smoking
   volcano with warm updraft, a cable car to the Eagle's Needle and a dragon catapult to a floating islet. */
MSKIN.zmajska={n:"Zmajska lisica",d:"Crveno-zlatne ljuske, mala krila na leđima i rep koji tinja kao žeravica.",p:0,rar:"l",O:0xd8301a,W:0xffd27a,B:0x3a0a0a,D:0xffa020,glowO:.1,fx:"iskre",wr:"Zmajevi vrhovi"};
MTRAIL.zeravice={n:"Zmajeve iskre",d:"Iza Ride frcaju tople iskre i sitni plamičci, kao da je upravo kihnuo zmajić.",p:0,rar:"l",wr:"Zmajevi vrhovi"};
TR.zeravice=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.4,y:p.y+.25,z:p.z+(Math.random()-.5)*.4,vy:1.4+Math.random(),vx:(Math.random()-.5),vz:(Math.random()-.5),grav:-.4,life:.8,size:.2,size2:.03,col:[0xffd060,0xff7a20,0xff3a10],add:1,op:1});TRATE.zeravice=12;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","zmajska",MSKIN.zmajska);ins("trail","zeravice",MTRAIL.zeravice);}
PRESETS.zmajevi={top:0x3a5ab8,hz:0xffb47a,sun:0xffc890,si:2.0,hemi:.72,el:.28,az:2.4,fog:0xf0b898,glow:.6,stars:0,sh:0x5a8ab8,dp:0x2a4a8a,exp:.92,night:0};

/* ---------- creatures (blocky) ---------- */
function zmDragon(R,D,C,Wg,G){const hd={name:"head",px:0,py:.62,pz:.32},tl={name:"tail",px:0,py:.38,pz:-.32},wl={name:"wl",px:-.2,py:.6,pz:0},wr={name:"wr",px:.2,py:.6,pz:0},K=0x1a0a0a;
  return mk([[.42,.38,.58,0,.4,0,R],[.32,.28,.4,0,.34,.04,C],[.38,.34,.4,0,.7,.36,R,hd],[.26,.16,.22,0,.64,.6,D,hd],[.06,.04,.02,-.07,.7,.715,K,hd],[.06,.04,.02,.07,.7,.715,K,hd],
    [.08,.09,.03,-.12,.78,.56,0xfff6e0,hd],[.08,.09,.03,.12,.78,.56,0xfff6e0,hd],[.04,.06,.02,-.12,.78,.575,K,hd],[.04,.06,.02,.12,.78,.575,K,hd],
    [.06,.16,.06,-.13,.94,.28,G,hd],[.06,.16,.06,.13,.94,.28,G,hd],[.06,.06,.12,0,.9,.2,Wg,hd],
    [.56,.05,.34,-.46,.66,-.02,Wg,wl],[.56,.05,.34,.46,.66,-.02,Wg,wr],[.06,.07,.36,-.22,.7,-.02,D,wl],[.06,.07,.36,.22,.7,-.02,D,wr],
    [.2,.18,.32,0,.38,-.44,R,tl],[.14,.14,.3,0,.36,-.7,R,tl],[.18,.16,.1,0,.4,-.88,Wg,tl],[.08,.1,.08,0,.64,.06,Wg],[.08,.1,.08,0,.62,-.14,Wg],[.08,.08,.08,0,.58,-.32,Wg]].concat(legs(.12,.2,.13,.16,D,.2)));}
MODELS.zmajic=()=>zmDragon(0xd8341e,0xa8200e,0xffd27a,0xffa020,0xfff0c0);
MODELS.zmajic_z=()=>zmDragon(0x3ab84a,0x1a8a2a,0xe8f0a0,0xffd23a,0xfff0c0);
MODELS.zmajic_p=()=>zmDragon(0x6a5ad8,0x4a3aa8,0xd8d0ff,0x7affe8,0xfff0c0);
MODELS.zmajica=()=>zmDragon(0xb82a2a,0x7a1414,0xffc870,0xe8862a,0xffe8b0);
MODELS.kozorog=function(){const B=0x9a8a7a,L=0xe8e0d0,D=0x5a4a3a,K=0x1a1a1a,H=0x6a5a4a,hd={name:"head",px:0,py:.66,pz:.3};
  return mk([[.36,.36,.64,0,.56,0,B],[.3,.14,.5,0,.4,0,L],[.26,.3,.3,0,.8,.36,B,hd],[.2,.16,.14,0,.72,.54,L,hd],[.05,.05,.02,-.1,.86,.515,K,hd],[.05,.05,.02,.1,.86,.515,K,hd],
    [.06,.32,.08,-.08,1.06,.26,H,hd],[.06,.08,.2,-.08,1.24,.14,H,hd],[.06,.32,.08,.08,1.06,.26,H,hd],[.06,.08,.2,.08,1.24,.14,H,hd],[.1,.14,.06,0,.6,.56,L,hd],
    [.08,.08,.08,0,.62,-.34,L]].concat(legs(.1,.38,.12,.24,D,.2)));};
MODELS.kozorog2=()=>MODELS.kozorog();
MODELS.jak=function(){const B=0x4a3a2a,F=0x6a5a48,Hn=0xf0e8d0,K=0x111111,hd={name:"head",px:0,py:.6,pz:.44};
  return mk([[.66,.58,.9,0,.62,0,B],[.7,.24,.94,0,.34,0,F],[.36,.36,.32,0,.62,.56,B,hd],[.06,.06,.02,-.12,.7,.725,K,hd],[.06,.06,.02,.12,.7,.725,K,hd],[.22,.12,.06,0,.52,.73,0x2a2018,hd],
    [.12,.06,.06,-.24,.82,.54,Hn,hd],[.06,.14,.06,-.32,.92,.54,Hn,hd],[.12,.06,.06,.24,.82,.54,Hn,hd],[.06,.14,.06,.32,.92,.54,Hn,hd],[.4,.14,.3,0,.98,.1,F]].concat(legs(.16,.3,.2,.3,0x2a2018,.15)));};
MODELS.orao=function(){const B=0x5a3a1a,Wh=0xf4f0e8,Y=0xffc030,K=0x111111,hd={name:"head",px:0,py:.6,pz:.12},wl={name:"wl",px:-.14,py:.48,pz:0},wr={name:"wr",px:.14,py:.48,pz:0};
  return mk([[.3,.36,.4,0,.42,0,B],[.22,.22,.22,0,.68,.12,Wh,hd],[.08,.08,.12,0,.66,.28,Y,hd],[.05,.05,.02,-.07,.72,.23,K,hd],[.05,.05,.02,.07,.72,.23,K,hd],
    [.06,.3,.42,-.18,.46,-.02,B,wl],[.06,.3,.42,.18,.46,-.02,B,wr],[.22,.06,.24,0,.3,-.3,Wh],[.06,.14,.06,-.08,.14,.04,Y],[.06,.14,.06,.08,.14,.04,Y]]);};
MODELS.zmajarka=function(){const S=0xf0c8a0,Hr=0xd8501a,R=0xb82a2a,G=0xffc030,Br=0x5a3a1a,K=0x1a1a1a,hd={name:"head",px:0,py:1.06,pz:0};
  return mk([[.42,.46,.28,0,.72,0,R],[.44,.1,.3,0,.52,0,G],[.14,.42,.16,-.1,.24,0,Br],[.14,.42,.16,.1,.24,0,Br],[.12,.42,.12,-.28,.74,0,R],[.12,.42,.12,.28,.74,0,R],[.12,.12,.12,-.28,.5,.02,S],[.12,.12,.12,.28,.5,.02,S],
    [.34,.34,.3,0,1.12,0,S,hd],[.06,.06,.02,-.08,1.14,.155,K,hd],[.06,.06,.02,.08,1.14,.155,K,hd],[.12,.04,.02,0,1.04,.155,0xd86a6a,hd],[.38,.16,.34,0,1.32,-.02,Hr,hd],[.1,.4,.1,0,1.04,-.2,Hr,hd],
    [.38,.06,.06,0,1.3,.16,G,hd],[.5,.6,.06,0,.78,-.18,0xffa020]]);};
MODELS.plamenko=function(){const S=0xe8c098,Bd=0xe8e4dc,R=0x7a1a1a,G=0xffc030,Br=0x4a3a2a,K=0x1a1a1a,hd={name:"head",px:0,py:1.06,pz:0};
  return mk([[.46,.5,.32,0,.72,0,R],[.48,.08,.34,0,.48,0,G],[.16,.42,.18,-.11,.24,0,Br],[.16,.42,.18,.11,.24,0,Br],[.12,.44,.12,-.3,.74,0,R],[.12,.44,.12,.3,.74,0,R],
    [.36,.34,.32,0,1.12,0,S,hd],[.06,.06,.02,-.08,1.16,.165,K,hd],[.06,.06,.02,.08,1.16,.165,K,hd],[.36,.26,.12,0,.96,.17,Bd,hd],[.2,.2,.1,0,.8,.17,Bd,hd],[.38,.1,.34,0,1.32,0,Bd,hd],
    [.06,.9,.06,.38,.66,.1,Br],[.16,.16,.16,.38,1.14,.1,0xff7a20]]);};
pwPets("zmajevi","gora",[
  {k:"zmajic",fav:"bobice",n:"Zmajić Iskrica",d:"Mali crveni zmaj koji se tek izlegao. Kad kihne, iz nosa mu frcnu iskrice.",gd:"Iz gnijezda donosi zlatnike i tople kamenčiće.",gift:()=>[["bobice",3],["coins",26]],spd:1.4,
   spec:{n:"Zmajev let",d:"Iskrica raširi krila i letite iznad oblaka! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:10.4,jump:9,seat:.66},tip:"Iskrica leti! Skok je gore, Roni je dolje."},
  {k:"kozorog",fav:"bobice",n:"Kozorog Rogo",d:"Planinski kozorog koji skače po stijenama kao da su stube. Nikad se ne boji visine.",gd:"S planinskih livada donosi cvijeće i zlatnike.",gift:()=>[["bobice",3],["coins",20]],spd:1.6,
   spec:{n:"Kozorogov skok",d:"Rogo skače visoko i daleko, i to dvaput zaredom!",ride:1,ic:"star"},ride:{land:1,speed:10.6,jump:13,dbl:1,seat:.8},tip:"Rogo te nosi! Skoči dvaput zaredom."}]);
PWIT.zeravica={n:"Zmajeva žeravica",mk:g=>{const m=new THREE.Mesh(new THREE.DodecahedronGeometry(.2,0),std(0xff7a20,{emissive:LC(0xff4a10),emissiveIntensity:1.1,flatShading:true}));g.add(m);
  const c=new THREE.Mesh(new THREE.DodecahedronGeometry(.11,0),std(0xffe080,{emissive:LC(0xffc040),emissiveIntensity:1.2}));c.position.set(.12,.1,.05);g.add(c);},glow:0xff8a30};
PWIT.runolist={n:"Runolist",mk:g=>{const p=std(0xf4f0e0,{emissive:LC(0x606050),emissiveIntensity:.3});for(let i=0;i<6;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.08,.03,.26),p);l.rotation.y=i/6*Math.PI;g.add(l);}
  const c=new THREE.Mesh(new THREE.BoxGeometry(.1,.06,.1),std(0xe8d070));c.position.y=.03;g.add(c);const s=new THREE.Mesh(new THREE.BoxGeometry(.04,.3,.04),std(0x6a9a5a));s.position.y=-.16;g.add(s);},glow:0xffffff};
PWIT.jaje={n:"Zmajevo jaje",mk:g=>{const e=new THREE.Mesh(new THREE.SphereGeometry(.22,12,10),std(0xe85a3a,{emissive:LC(0x501008),emissiveIntensity:.4,roughness:.35}));e.scale.y=1.3;g.add(e);
  for(const [y,c] of [[.05,0xffd27a],[-.1,0xffa020]]){const r=new THREE.Mesh(new THREE.TorusGeometry(.2,.025,4,14),std(c));r.rotation.x=Math.PI/2;r.position.y=y;g.add(r);}},glow:0xffa060};
function zmItem(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0xffb040),emissive:LC(0xff6a10),emissiveIntensity:.8,roughness:.2,metalness:.4,flatShading:true});
  const s=new THREE.Mesh(new THREE.OctahedronGeometry(.3,0),m);s.scale.set(.8,1.3,.8);g.add(s);const k=new THREE.Mesh(new THREE.OctahedronGeometry(.13,0),new THREE.MeshStandardMaterial({color:LC(0xfff0b0),emissive:LC(0xffd060),emissiveIntensity:1}));k.position.y=.05;g.add(k);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffa040,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(2.4,2.4,1);g.add(sp);return g;}

/* ---------- the peaks ---------- */
const ZM={eggs:[],zeravice:[],runolisti:[],cable:null,bridges:[],smoke:null};
/* id, x, z, radius, plateau height */
const ZMP=[["S",128,200,17,28],["N",128,128,26,36],["F",58,152,19,32],["B",198,150,17,32],["I",68,68,19,34],["V",188,70,19,30]];
function zmGen(){const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};
  const Y=(x,z)=>hmap[x+z*W];const P={};for(const p of ZMP)P[p[0]]={x:p[1],z:p[2],r:p[3],top:p[4]};ZM.P=P;
  /* height field: flat-topped peaks with steep cliffs, falling into the clouds */
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){let h=0,who=null;for(const k in P){const p=P[k];const wob=(vnoise(x*.09+p.x,z*.09,11)-.5)*5;const d=Math.hypot(x-p.x,z-p.z)+wob;if(d>=p.r)continue;
      const t=d/p.r,pl=.48;let y=t<pl?p.top+Math.round((fbm(x*.08,z*.08)-.5)*1.6):p.top-Math.pow((t-pl)/(1-pl),1.35)*(p.top+4);y=Math.round(y);if(y>h){h=y;who=k;}}
    if(h<2){hmap[x+z*W]=0;continue;}hmap[x+z*W]=h;
    const snow=who==="I"&&h>=P.I.top-1;for(let y=0;y<h;y++){const top=y===h-1;vox[I(x,y,z)]=top?(snow?T.snijeg:(h>=20?T.trava:T.kamen)):(y>h-3&&h>=20?(snow?T.snijeg:T.zemlja):(hash3(x,y,z)<.08?T.tuf:(y%5<2?T.duboki:T.kamen)));}}
  /* the floating islet for the catapult and the Eagle's Needle */
  const blob=(cx,cz,r,top,depth)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const d=Math.hypot(dx,dz)+(vnoise((cx+dx)*.3,(cz+dz)*.3,5)-.5)*1.2;if(d>r)continue;const bot=Math.round(top-1-depth*(1-Math.pow(d/r,1.6))-1);
      for(let y=Math.max(1,bot);y<top;y++)wput(cx+dx,y,cz+dz,y===top-1?T.trava:(y>top-3?T.zemlja:T.kamen));hmap[cx+dx+(cz+dz)*W]=top;}};
  blob(156,100,6,40,10);P.O={x:156,z:100,top:40};
  {const nx=184,nz=208;for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const d=Math.hypot(dx,dz);const top=d<2.6?46:Math.round(46-(d-2.6)*14);if(top<2)continue;for(let y=1;y<top;y++)wput(nx+dx,y,nz+dz,y===top-1&&d<2.6?T.trava:(y%4?T.kamen:T.duboki));hmap[nx+dx+(nz+dz)*W]=Math.max(Y(nx+dx,nz+dz),top);}
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){wput(nx+dx,45,nz+dz,T.tdaske,1);hmap[nx+dx+(nz+dz)*W]=46;}P.E={x:nx,z:nz,top:46};}
  /* ----- rope bridges between the peaks ----- */
  const edge=(a,b,inset)=>{const dx=b.x-a.x,dz=b.z-a.z,L=Math.hypot(dx,dz);const ux=dx/L,uz=dz/L;let k=Math.round(a.r*.3);for(;k<a.r;k++){const x=Math.round(a.x+ux*k),z=Math.round(a.z+uz*k);if(Y(x,z)<a.top-1)break;}k-=inset||2;return [a.x+ux*k,a.z+uz*k];};
  const bridge=(A,B,sag)=>{const [ax,az]=edge(A,B),[bx,bz]=edge(B,A);const ya=A.top,yb=B.top,L=Math.hypot(bx-ax,bz-az),ux=(bx-ax)/L,uz=(bz-az)/L,px=-uz,pz=ux;const n=Math.ceil(L*3);const deck=[];
    for(let i=0;i<=n;i++){const t=i/n,x=ax+(bx-ax)*t,z=az+(bz-az)*t,y=Math.round(ya+(yb-ya)*t-sag*Math.sin(Math.PI*t));deck.push([x,y,z,t]);
      for(let o=-1;o<=1;o++){const X=Math.round(x+px*o),Z=Math.round(z+pz*o);wput(X,y-1,Z,(Math.round(t*L)%4===0)?T.tdaske:T.sdaske,1);for(let h=0;h<3;h++)if(!prot[I(X,y+h,Z)])vox[I(X,y+h,Z)]=0;if(Y(X,Z)<y)hmap[X+Z*W]=y;}
      for(const o of [-2,2]){const X=Math.round(x+px*o),Z=Math.round(z+pz*o);if(Y(X,Z)>=y)continue;wput(X,y,Z,T.vuna_s,1);if(Math.round(t*L)%5===0){wput(X,y+1,Z,T.tdaske,1);wput(X,y-1,Z,T.tdaske,1);}}}
    for(const [t,s] of [[0,1],[1,-1]]){const x=t?bx:ax,z=t?bz:az,y=t?yb:ya;for(const o of [-2,2]){const X=Math.round(x+px*o-ux*s),Z=Math.round(z+pz*o-uz*s);for(let h=0;h<4;h++)wput(X,y+h,Z,T.tdaske,1);wput(X,y+4,Z,T.lampion,1);}}
    ZM.bridges.push({deck,ax,az,bx,bz,ya,yb});busy(Math.round((ax+bx)/2),Math.round((az+bz)/2),2);return deck;};
  const dSN=bridge(P.S,P.N,3);bridge(P.N,P.F,3);bridge(P.N,P.B,3);bridge(P.F,P.I,4);bridge(P.B,P.V,3);
  /* ----- Start peak: portal, keeper, cable car station ----- */
  {const x=128,z=206,g=P.S.top;for(let dz=-10;dz<=3;dz++)for(let dx=-4;dx<=4;dx++){const X=x+dx,Z=z+dz;if(Y(X,Z)<g-3)continue;for(let y=g;y<g+6;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;for(let y=Math.max(1,g-3);y<g;y++)wput(X,y,Z,y===g-1?T.trava:T.kamen);hmap[X+Z*W]=g;}
    wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:g,z:z-8.5,cam:0};busy(x,z-4,7);
    /* cable car station */
    const sx=139,sz=201;for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){wput(sx+dx,g-1,sz+dz,T.tdaske,1);for(let y=g;y<g+5;y++)if(!prot[I(sx+dx,y,sz+dz)])vox[I(sx+dx,y,sz+dz)]=0;hmap[sx+dx+(sz+dz)*W]=g;}
    for(const [a,b] of [[-2,-2],[2,-2],[-2,2],[2,2]])for(let y=g;y<g+5;y++)wput(sx+a,y,sz+b,T.tdaske,1);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)wput(sx+dx,g+5,sz+dz,T.crvena,1);
    wput(sx,g+4,sz-2,T.lampion,1);ZM.station={x:sx+.5,y:g,z:sz+.5};busy(sx,sz,4);
    /* the cable: from the station roof to the needle */
    const E=P.E,a=[sx+.5,g+.02,sz+.5],b=[E.x+.5,E.top+.02,E.z+.5];const pts=[];for(let i=0;i<=80;i++){const t=i/80;pts.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t-4*Math.sin(Math.PI*t),a[2]+(b[2]-a[2])*t]);}
    ZM.cable={pts,on:false,t:0,cool:0};
    wStar("zicara",E.x+.5,E.top+.9,E.z-1+.5,"Na vrhu Orlove igle, visoke stijene istočno od portala. Do nje vozi žičara sa stanice kraj portala!");wput(E.x+2,E.top,E.z+2,T.lampion,1);
    /* rings cage */
    const cx=121,cz=199;for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const X=cx+dx,Z=cz+dz;for(let y=Math.max(1,g-4);y<g;y++)wput(X,y,Z,y===g-1?T.trava:T.kamen);for(let y=g;y<g+4;y++)vox[I(X,y,Z)]=0;hmap[X+Z*W]=g;}for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("let",cx+a,Y(cx,cz)+h,cz+b,(a+b+h)%2?T.crvena:T.zlato);}
    wStar("let",cx+.5,Y(cx,cz)+.9,cz+.5,"U zlatno-crvenom kavezu kraj portala. Otvara se kad proletiš kroz sve zmajeve prstenove na mostu!");busy(cx,cz,3);
    const rp=[];for(let i=1;i<=10;i++){const d=dSN[Math.round(i/10.6*(dSN.length-1))];rp.push([d[0],d[1]+1.7+(i%2)*1.3,d[2]]);}
    pwRings("let",{start:[128.5,g,193.5],pts:rp,time:40,col:0xff7a30,name:"Zmajevi prstenovi",win:"Proletjela si kroz sve zmajeve prstenove! Kavez kraj portala se otvorio."});
    POI.push({k:"zm_start",n:"Vrh dobrodošlice",x:128,z:200,r:12});}
  /* ----- Nest peak: the mother dragon's nest, the horn pillar, the hoard, Plamenko's hut, the treasury ----- */
  {const p=P.N,g=p.top;
    const nx=128,nz=132;for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++){const d=Math.hypot(dx,dz);if(d>6.6)continue;const X=nx+dx,Z=nz+dz;for(let y=g;y<g+4;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;
      wput(X,g-1,Z,d<4.6?T.sijeno:T.drvo,1);if(d>4.6){const h=d>5.6?2:1;for(let y=g;y<g+h;y++)wput(X,y,Z,(X+Z+y)%3?T.drvo:T.sijeno,1);}}
    for(const [a,b] of [[-6,0],[6,0],[0,6]])for(let h=0;h<3;h++)vox[I(nx+a,g+h,nz+b)]=0;
    ZM.nest={x:nx+.5,y:g,z:nz+.5};busy(nx,nz,8);
    /* horn pillar with stepping stones */
    const hx=114,hz=124,ht=g+13;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)for(let y=g;y<ht;y++)wput(hx+dx,y,hz+dz,(y-g)%4===3?T.tuf:T.kamen,1);
    for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(hx+dx,ht,hz+dz,T.zlato,1);
    for(let k=0;k<12;k++){const a=-.6+k*.62,x=Math.round(hx+Math.cos(a)*4.4),z=Math.round(hz+Math.sin(a)*4.4),y=g+k;wput(x,y,z,k%3===2?T.zlato:T.crvena,1);for(let h=1;h<4;h++)if(!prot[I(x,y+h,z)])vox[I(x,y+h,z)]=0;}
    wStar("rog",hx+.5,ht+1.9,hz+.5,"Na vrhu Zmajevog roga, kamenog stupa kraj gnijezda. Skači po crvenim kamenčićima oko njega!");busy(hx,hz,6);
    /* the dragon hoard: dig under the red X */
    const dx0=140,dz0=124;for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++){if(a*a+b*b>10)continue;wput(dx0+a,g-1,dz0+b,T.zlato,1);if(a*a+b*b<5&&(a||b))wput(dx0+a,g,dz0+b,T.zlato,1);}
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){vox[I(dx0+a,g,dz0+b)]=0;pwCell("zlato",dx0+a,g-1,dz0+b,(a===b||a===-b)?T.crvena:T.zlato);pwCell("zlato",dx0+a,g-2,dz0+b,T.kamen);}
    wStar("zlato",dx0+.5,g-1.4,dz0+.5,"Zakopan u zmajevoj hrpi zlata, pod crvenim X-om. Kopaj!");pwDig("zlato",dx0,g-1,dz0,"Kopaš kroz hrpu zlatnika... i eno ga! Zmajev kamen!");busy(dx0,dz0,4);
    /* Plamenko's hut: a little pagoda, its door is the egg cage */
    const ux=139,uz=137;for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){wput(ux+dx,g-1,uz+dz,T.tdaske,1);for(let y=g;y<g+3;y++){const e=Math.abs(dx)===2||Math.abs(dz)===2;if(!e){vox[I(ux+dx,y,uz+dz)]=0;continue;}if(dz===2&&dx===0&&y<g+2)continue;
        wput(ux+dx,y,uz+dz,(Math.abs(dx)===2&&Math.abs(dz)===2)?T.crvena:(y===g+1&&dx===0?T.staklo:T.bdaske),1);}}
    for(let k=0;k<2;k++)for(let dz=-3+k;dz<=3-k;dz++)for(let dx=-3+k;dx<=3-k;dx++)wput(ux+dx,g+3+k,uz+dz,k?T.zlato:T.crvena,1);wput(ux,g+5,uz,T.lampion,1);
    for(let h=0;h<2;h++)pwCell("jaja",ux,g+h,uz+2,T.crvena);wStar("jaja",ux+.5,g+.9,uz+.5,"U pagodi zmajara Plamenka u gnijezdu. Vrati mu izgubljena zmajeva jaja!");ZM.hut={x:ux+.5,z:uz+4.5};busy(ux,uz,4);
    /* the treasury */
    const tx=128,tz=113;for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){wput(tx+dx,g-1,tz+dz,(dx+dz)%2?T.zlato:T.crvena,1);for(let y=g;y<g+8;y++){const d=Math.max(Math.abs(dx),Math.abs(dz));
        const roof=y-g-4;if(roof>=0){if(d<=4-roof)wput(tx+dx,y,tz+dz,roof%2?T.zlato:T.crvena,1);continue;}if(d<3){vox[I(tx+dx,y,tz+dz)]=0;continue;}if(d>3)continue;
        if(dz===3&&Math.abs(dx)<=1&&y<g+3){wput(tx+dx,y,tz+dz,T.kristal,1);WG.gate.push([tx+dx,y,tz+dz]);continue;}wput(tx+dx,y,tz+dz,Math.abs(dx)===3&&Math.abs(dz)===3?T.crvena:T.kamen,1);}}
    wput(tx-2,g,tz-2,T.lampion,1);wput(tx+2,g,tz-2,T.lampion,1);WG.isl.riznica={x:tx,z:tz,y:g,r:4};addChest("zm_blago",tx,g,tz,"Zmajeva riznica");busy(tx,tz,6);
    POI.push({k:"zm_gnijezdo",n:"Zmajevo gnijezdo",x:128,z:128,r:16});}
  /* ----- Waterfall peak: a cliff with a curtain of water and a cave behind it ----- */
  {const p=P.F,g=p.top,x0=p.x,z0=p.z+6;const ch=g+10;
    for(let dz=-1;dz<=3;dz++)for(let dx=-6;dx<=6;dx++){for(let y=g-3;y<g;y++)wput(x0+dx,y,z0+dz,T.kamen,1);for(let y=g;y<ch-Math.max(0,Math.abs(dx)-3);y++)wput(x0+dx,y,z0+dz,hash3(x0+dx,y,z0+dz)<.2?T.mahovina:T.kamen,1);hmap[x0+dx+(z0+dz)*W]=ch-Math.max(0,Math.abs(dx)-3);}
    for(let dx=-2;dx<=2;dx++)for(let y=g;y<ch-1;y++)wput(x0+dx,y,z0-2,T.voda,1);
    for(let dz=-5;dz<=-3;dz++)for(let dx=-3;dx<=3;dx++){wput(x0+dx,g-1,z0+dz,T.voda,1);wput(x0+dx,g-2,z0+dz,T.kamen,1);for(let y=g;y<g+3;y++)if(!prot[I(x0+dx,y,z0+dz)])vox[I(x0+dx,y,z0+dz)]=0;}
    for(let dz=-1;dz<=2;dz++)for(let dx=-1;dx<=1;dx++)for(let y=g;y<g+3;y++){vox[I(x0+dx,y,z0+dz)]=0;prot[I(x0+dx,y,z0+dz)]=1;}
    wput(x0,g+2,z0+2,T.svjetlo,1);
    wStar("slap",x0+.5,g+.9,z0+1+.5,"U špilji iza slapa na Vrhu slapova. Prođi ravno kroz vodu!");addChest("zm_slap",x0+1,g,z0+2,"Škrinja iza slapa");
    ZM.fall={x:x0+.5,z:z0-2.5,y0:g,y1:ch-1,dir:-1};busy(x0,z0,8);POI.push({k:"zm_slap",n:"Vrh slapova",x:p.x,z:p.z,r:14});}
  /* ----- Bell peak: a pagoda and four bells ----- */
  {const p=P.B,g=p.top,cx=p.x+1,cz=p.z-2;
    for(let t=0;t<3;t++){const r=3-t,y0=g+t*4;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const e=Math.abs(dx)===r||Math.abs(dz)===r;for(let y=y0;y<y0+3;y++){if(!e){vox[I(cx+dx,y,cz+dz)]=0;continue;}
        if(t===0&&dz===r&&dx===0&&y<y0+2)continue;wput(cx+dx,y,cz+dz,(Math.abs(dx)===r&&Math.abs(dz)===r)?T.crvena:(y===y0+1&&t>0?T.staklo:T.bdaske),1);}}
      for(let dz=-r-1;dz<=r+1;dz++)for(let dx=-r-1;dx<=r+1;dx++)wput(cx+dx,y0+3,cz+dz,(Math.abs(dx)===r+1||Math.abs(dz)===r+1)?T.zlato:T.crvena,1);}
    wput(cx,g+12,cz,T.zlato,1);wput(cx,g+13,cz,T.lampion,1);
    for(let h=0;h<2;h++)pwCell("zvona",cx,g+h,cz+3,T.zlato);wStar("zvona",cx+.5,g+.9,cz+.5,"U pagodi na Vrhu zvona. Zazvoni zvona pravim redom!");
    const L=[["zlato",523],["crvena",659],["svjetlo",784],["lampion",988]],PP=[[-6,4],[-2,7],[3,7],[7,4]],ORD=[1,3,0,2];
    const pads=PP.map(([a,b],i)=>{const x=cx+a,z=cz+b,y=Y(x,z)-1;wput(x,y,z,T[L[i][0]],1);for(let h=1;h<=3;h++)wput(x+(a>0?1:-1),y+h,z,h===3?T[L[i][0]]:T.tdaske,1);return {x,y,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    {const x=cx-6,z=cz-1,y=Y(x,z);for(let h=0;h<5;h++)wput(x,y+h,z,T.tdaske,1);ORD.forEach((j,i)=>wput(x+1,y+4-i,z,T[L[j][0]],1));}
    pwSeq("zvona",{pads,order:ORD,win:"Zvona su zazvonila zmajevu pjesmu! Vrata pagode su se otvorila.",wrong:"Krivo zvono! Pogledaj drveni stup s kockicama, odozgo prema dolje, i kreni ispočetka."});
    /* dragon catapult to the floating islet */
    const lx=p.x-8,lz=p.z-6,ly=Y(lx,lz);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(lx+dx,ly-1,lz+dz,(dx||dz)?T.crvena:T.zlato,1);
    pwLaunch({k:"katapult",x:lx+.5,y:ly,z:lz+.5,to:[P.O.x+.5,0,P.O.z+.5],h:12,dur:2.4,col:[0xff7a30,0xffd060],msg:"ŠUŠ! Zmajev katapult te bacio sve do lebdećeg otočića!"});ZM.cat={x:lx+.5,y:ly,z:lz+.5};
    busy(cx,cz,9);busy(lx,lz,2);POI.push({k:"zm_zvona",n:"Vrh zvona",x:p.x,z:p.z,r:12});}
  /* the floating islet: star, and a way back */
  {const O=P.O;wStar("otocic",O.x+.5,O.top+.9,O.z+.5,"Na lebdećem otočiću između Gnijezda i Vulkana. Do njega te baci zmajev katapult na Vrhu zvona!");
    for(const [a,b] of [[-3,-2],[3,2],[-2,3]]){wput(O.x+a,O.top,O.z+b,T.cvijet,1);}wput(O.x+2,O.top,O.z-3,T.lampion,1);
    const bx=O.x-4,bz=O.z+4,by=O.top;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(bx+dx,by-1,bz+dz,(dx||dz)?T.crvena:T.zlato,1);
    pwLaunch({k:"natrag",x:bx+.5,y:by,z:bz+.5,to:[128.5,0,141.5],h:6,dur:1.8,col:[0xff7a30,0xffd060],msg:"Katapult te vratio u Zmajevo gnijezdo!"});busy(O.x,O.z,6);}
  /* ----- Ice peak: snow, ice and a summit spire with a spiral path ----- */
  {const p=P.I,g=p.top,cx=p.x,cz=p.z,top=g+16;
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const d=Math.hypot(dx,dz);if(d>2.5)continue;for(let y=g;y<top;y++)wput(cx+dx,y,cz+dz,y>top-4?T.snijeg:(hash3(cx+dx,y,cz+dz)<.3?T.led:T.kamen),1);}
    const FL=new Map(),PC=[];let last=null;for(let i=0;i<=500;i++){const t=i/500,a=1.57+t*2.2*6.283,r=3.9,y=g+Math.round(t*(top-g-1));for(const w of [0,1]){const x=Math.round(cx+.5+Math.cos(a)*(r+w)),z=Math.round(cz+.5+Math.sin(a)*(r+w));
        const k=x+","+(y-1)+","+z;if(!FL.has(k))FL.set(k,[x,y-1,z]);PC.push([x,y,z]);}last=[cx+.5+Math.cos(a)*r,y,cz+.5+Math.sin(a)*r];}
    for(const [x,y,z] of FL.values()){wput(x,y,z,T.snijeg,1);for(let yy=y-1;yy>=Math.max(g,y-4);yy--){if(get(x,yy,z)||FL.has(x+","+yy+","+z))break;wput(x,yy,z,T.led,1);}}
    for(const [x,y,z] of PC)for(let yy=y;yy<y+3;yy++)if(!FL.has(x+","+yy+","+z)){vox[I(x,yy,z)]=0;prot[I(x,yy,z)]=1;}
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)if(Math.hypot(dx,dz)<=2.5)wput(cx+dx,top-1,cz+dz,T.snijeg,1);
    wStar("vrh",cx+.5,top+.9,cz+.5,"Na samom vrhu Ledenog vrha. Penji se po snježnoj stazi oko stijene!");
    for(let i=0;i<14;i++){const a=hash2(i,3,17)*6.283,r=6+hash2(i,4,17)*5,x=Math.round(cx+Math.cos(a)*r),z=Math.round(cz+Math.sin(a)*r);if(Y(x,z)<g-1||mask[x+z*W])continue;wput(x,Y(x,z)-1,z,T.led);}
    for(let i=0;i<5;i++){const a=i*1.3,x=Math.round(cx+Math.cos(a)*8),z=Math.round(cz+Math.sin(a)*8);if(Y(x,z)<g-1)continue;const y=Y(x,z);for(let h=0;h<4;h++)wput(x,y+h,z,T.smreka_d||T.drvo);for(let h=2;h<6;h++)for(const [a2,b2] of [[1,0],[-1,0],[0,1],[0,-1]])if(h<5||!a2&&!b2)wput(x+a2,y+h,z+b2,T.snijeg);wput(x,y+5,z,T.snijeg);}
    ZM.ice={x:cx,z:cz};busy(cx,cz,6);POI.push({k:"zm_led",n:"Ledeni vrh",x:cx,z:cz,r:14});}
  /* ----- Volcano peak: a crater with glowing embers and warm air ----- */
  {const p=P.V,g=p.top,cx=p.x,cz=p.z;for(let dz=-10;dz<=10;dz++)for(let dx=-10;dx<=10;dx++){const d=Math.hypot(dx,dz);if(d>9.5)continue;const X=cx+dx,Z=cz+dz;
      if(d<4){wput(X,g-1,Z,d<2.4?T.zar:T.tuf,1);for(let y=g;y<g+30;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;continue;}
      const rim=Math.round(8-Math.abs(d-6.2)*2.6);for(let y=g;y<g+rim;y++)wput(X,y,Z,(y===g+rim-1)?T.tuf:(hash3(X,y,Z)<.25?T.duboki:T.kamen),1);hmap[X+Z*W]=g+Math.max(0,rim);}
    for(let k=0;k<3;k++){const x=cx+8-k*0,z=cz+3+k;}
    /* a notch through the rim on the bridge side */
    for(let z=cz+3;z<=cz+11;z++)for(let a=-1;a<=1;a++){wput(cx+a,g-1,z,T.tuf,1);for(let y=g;y<g+9;y++){vox[I(cx+a,y,z)]=0;prot[I(cx+a,y,z)]=1;}hmap[cx+a+z*W]=g;}
    for(let z=cz+3;z<=cz+10;z+=3)for(const a of [-2,2])wput(cx+a,g+Math.max(0,Math.round(8-Math.abs(Math.hypot(a,z-cz)-6.2)*2.6)),z,T.lampion,1);
    const ly=g+20,lx=cx+4;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=2;dx++)wput(lx+dx,ly,cz+dz,dx===2||Math.abs(dz)===1?T.tuf:T.duboki,1);for(let k=1;k<3;k++)wput(lx+1,ly-k,cz,T.tuf,1);
    WG.wind.push({x:cx+.5,z:cz+.5,r:1.8,y0:g,y1:ly+3,k:"vulkan"});ZM.vent={x:cx+.5,y:g,z:cz+.5};
    wStar("vulkan",lx+1.5,ly+1.9,cz+.5,"Na lebdećoj stijeni iznad vulkana. Topli zrak iz kratera nosi te gore!");addChest("zm_vulkan",cx-7,Y(cx-7,cz)+0,cz-4,"Vulkanska škrinja");
    busy(cx,cz,11);POI.push({k:"zm_vulkan",n:"Vulkan",x:cx,z:cz,r:14});}
  /* pickups and decoration */
  const spot=([x,z])=>{busy(x,z,1);return [x+.5,Y(x,z)+1.3,z+.5];};
  ZM.eggs=[[134,193],[50,148],[72,78],[192,156],[160,103]].map(spot);
  ZM.zeravice=[[184,78],[196,64],[132,124],[120,140]].map(spot);
  ZM.runolisti=[[60,62],[78,74],[64,144]].map(spot);
  for(let z=4;z<W-4;z+=3)for(let x=4;x<W-4;x+=3){const X=x+Math.floor(hash2(x,z,71)*3),Z=z+Math.floor(hash2(x,z,72)*3),i=X+Z*W;const y=Y(X,Z);if(y<20||mask[i])continue;const top=get(X,y-1,Z);if(top!==T.trava&&top!==T.snijeg)continue;const r=hash2(X,Z,73);
    if(r<.05&&top===T.trava){const h=4+Math.floor(hash2(X,Z,74)*3);for(let k=0;k<h;k++)wput(X,y+k,Z,T.drvo);for(let k=2;k<=h;k++){const rr=k===h?0:(k>h-2?1:2);for(let a=-rr;a<=rr;a++)for(let b=-rr;b<=rr;b++)if(Math.abs(a)+Math.abs(b)<=rr+(rr>1?0:1)&&!(a===0&&b===0&&k<h))wput(X+a,y+k,Z+b,T.smreka||T.lisce);}wput(X,y+h,Z,T.smreka||T.lisce);}
    else if(r<.13&&top===T.trava)wput(X,y,Z,hash2(X,Z,75)<.5?T.cvijet:T.trava_v||T.cvijet);
    else if(r<.17){wput(X,y,Z,T.kamen);if(hash2(X,Z,76)<.5)wput(X+1,y,Z,T.tuf);}}
  Object.assign(LOOT,{zm_slap:{coins:60,mats:{biser:2,smaragd:1},blocks:{mahovina:10,voda:4},msg:"Iza slapa netko je sakrio biserje i mahovinu za vrt."},
    zm_vulkan:{coins:60,mats:{dijamant:1,ametist:2},blocks:{tuf:12,zar:4},msg:"Vulkanski kamen i žar koji tinja. Sagradi kamin!"},
    zm_blago:{coins:360,mats:{dijamant:3,smaragd:3,ametist:2},blocks:{zlato:10,crvena:12,lampion:6},msg:"Zmajeva riznica! Zlato, rubin-crveni kamen i fenjeri iz zmajeve pagode."}});}

/* ---------- life ---------- */
function zmLife(){S.wq=S.wq||{};const P=ZM.P;
  PW.guide=pwPut("zmajarka","Zmajarka Iskra",124.5,194.5,{frozen:true,ry:Math.PI*.8,sc:1.5,y:P.S.top+2});
  const pl=pwPut("plamenko","Zmajar Plamenko",ZM.hut.x,ZM.hut.z,{frozen:true,ry:0,sc:1.5,y:P.N.top+2});
  const ma=pwPut("zmajica","Zmajica Ruža",ZM.nest.x,ZM.nest.z,{frozen:true,ry:Math.PI*.15,sc:3.2,y:P.N.top+2});ZM.mama=ma;
  [[125,129,"zmajic_z","Zmajić Mahić"],[131,135,"zmajic_p","Zmajić Ljubić"],[131,129,"zmajic_z","Zmajić Travko"]].forEach(([x,z,k,n])=>pwPut(k,n,x+.5,z+.5,{speed:.4,y:P.N.top+2}));
  [[74,62],[60,74]].forEach(([x,z],i)=>pwPut("jak",["Jak Čupko","Jakica Runa"][i],x+.5,z+.5,{speed:.3,sc:1.4,y:P.I.top+2}));
  [[64,146],[192,144]].forEach(([x,z],i)=>pwPut("kozorog2",["Kozorog Kamenko","Koza Stijenka"][i],x+.5,z+.5,{speed:.7,y:40}));
  [[186,206],[114,124],[150,98]].forEach(([x,z],i)=>pwPut("orao",["Orao Krešimir","Orlica Vida","Orlić Brzić"][i],x+.5,z+.5,{frozen:true,ry:i*2,y:50}));
  const iz=pwPut("zmajic",PETS.zmajic.n,186.5,78.5,{speed:.5,y:P.V.top+2});const ko=pwPut("kozorog",PETS.kozorog.n,72.5,76.5,{speed:.6,y:P.I.top+2});
  pwQuest("zmajic",{pet:1,en:iz,auto:1,need:4,item:"zeravica",spots:ZM.zeravice,got:"Zmajeva žeravica",
    ask:"Hep-ćih! Oprosti, kihnuo sam. Ja sam Iskrica. Zmajići moraju jesti tople žeravice da im se vatra u trbuhu ne ugasi. Doneseš mi četiri? Narančasto svijetle, pa ih je lako naći.",
    done:"Mmm, toplo! Vatra mi opet gori u trbuhu. Sad mogu letjeti! Hoćeš sa mnom iznad oblaka?",fact:"Zmajevi postoje samo u pričama, ali na otoku Komodu živi pravi gušter zvan komodski zmaj. Dug je kao krevet i najveći je gušter na svijetu!"});
  pwQuest("kozorog",{pet:1,en:ko,auto:1,need:3,item:"runolist",spots:ZM.runolisti,got:"Runolist",
    ask:"Meee! Ja sam Rogo. Volim runolist, bijeli planinski cvijet sa zvjezdastim laticama. Raste samo visoko u planinama. Doneseš mi tri?",
    done:"Najljepši runolist na svim vrhovima! Penji se, skakat ćemo po stijenama!",fact:"Kozorozi imaju posebna kopita s mekim jastučićima koji se drže stijene kao gumene čizmice. Zato se penju po strmim liticama bez straha."});
  pwQuest("jaja",{en:pl,need:5,item:"jaje",spots:ZM.eggs,got:"Zmajevo jaje",cage:"jaja",
    ask:"Oh, dobro da si tu! Ja sam zmajar Plamenko. Vjetar je otpuhao pet zmajevih jaja iz gnijezda, a Zmajica Ruža spava i ništa ne zna. Pronađeš ih prije nego se probudi? Jaja su na svim vrhovima.",
    done:"Svih pet jaja je natrag u gnijezdu! Ruža će biti presretna. Uđi u moju pagodu, čeka te dar!",thanks:"Jaja su na sigurnom, hvala ti!",remind:"Zmajeva jaja su crvena sa zlatnim prugama. Ima ih na svim vrhovima."});}
function zmEnv(){
  if(typeof buildCloudSea==="function"){buildCloudSea();const U=cloudSea&&cloudSea.userData.U;if(U){U.uA.value.set(0xfff0e8);U.uB.value.set(0xe8a0a8);U.uFog.value.set(0xf0b898);}if(cloudPuffs&&cloudPuffs.material){cloudPuffs.material.emissive.set(0xf0c0b0);}}
  /* cable and the gondola */
  {const C=ZM.cable,P=C.pts;const pts=P.map(p=>new THREE.Vector3(p[0],p[1]+3.1,p[2]));const ln=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0x2a2a2a}));scene.add(ln);
    const g=new THREE.Group();const red=std(0xc8301e),gold=std(0xffc030,{metalness:.5,roughness:.4}),gl=new THREE.MeshStandardMaterial({color:0xcfe8ff,transparent:true,opacity:.35,roughness:.1});
    const fl=new THREE.Mesh(new THREE.BoxGeometry(1.8,.14,1.8),red);fl.position.y=-.05;g.add(fl);const rf=new THREE.Mesh(new THREE.BoxGeometry(2,.18,2),red);rf.position.y=2.3;g.add(rf);
    for(const sx of [-.85,.85])for(const sz of [-.85,.85]){const p=new THREE.Mesh(new THREE.BoxGeometry(.12,2.3,.12),gold);p.position.set(sx,1.1,sz);g.add(p);}
    for(const [w,d,x,z] of [[1.7,.04,0,.86],[1.7,.04,0,-.86],[.04,1.7,.86,0],[.04,1.7,-.86,0]]){const p=new THREE.Mesh(new THREE.BoxGeometry(w,.8,d),gl);p.position.set(x,1.5,z);g.add(p);const b=new THREE.Mesh(new THREE.BoxGeometry(w,.6,d),red);b.position.set(x,.3,z);g.add(b);}
    const arm=new THREE.Mesh(new THREE.BoxGeometry(.12,.9,.12),gold);arm.position.y=2.8;g.add(arm);const wh=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.12,12).rotateZ(Math.PI/2),gold);wh.position.y=3.15;g.add(wh);
    g.position.set(P[0][0],P[0][1],P[0][2]);scene.add(g);C.m=g;}
  /* waterfall mist and the volcano smoke */
  {const sm=[];for(let i=0;i<14;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x7a6a6a,transparent:true,opacity:.25,depthWrite:false}));s.scale.set(5,5,1);scene.add(s);sm.push({s,h:Math.random()});}ZM.smoke=sm;}
  {const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xff6a20,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.55}));sp.scale.set(9,9,1);sp.position.set(ZM.vent.x,ZM.vent.y+.6,ZM.vent.z);scene.add(sp);}}
function zmCablePos(t){const P=ZM.cable.pts;let i=0,acc=0;while(i<P.length-1){const a=P[i],b=P[i+1];const L=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);if(acc+L>=t){const k=(t-acc)/L;return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k,Math.atan2(b[0]-a[0],b[2]-a[2]),false];}acc+=L;i++;}const e=P[P.length-1];return [e[0],e[1],e[2],0,true];}
function zmTick(dt,tt){const P=FP.p,C=ZM.cable;
  if(ZM.smoke)for(const s of ZM.smoke){s.h=(s.h+dt*.06)%1;const y=ZM.vent.y+2+s.h*30;s.s.position.set(ZM.vent.x+Math.sin(s.h*7+tt*.2)*2*s.h,y,ZM.vent.z+Math.cos(s.h*5)*1.5*s.h);s.s.scale.setScalar(3+s.h*9);s.s.material.opacity=.3*(1-s.h);}
  if(ZM.vent&&Math.random()<dt*10){const a=Math.random()*6.28,r=Math.random()*2;mgSpawn({t:"spark",x:ZM.vent.x+Math.cos(a)*r,y:ZM.vent.y+Math.random()*3,z:ZM.vent.z+Math.sin(a)*r,vy:5+Math.random()*3,life:1.2,size:.18,size2:.04,col:[0xffa040,0xff5a10,0xffe080],add:1,op:1});}
  if(ZM.fall&&Math.random()<dt*16){const F=ZM.fall;mgSpawn({t:"bubble",x:F.x+(Math.random()-.5)*5,y:F.y0+.3,z:F.z-1-Math.random(),vy:1.2,vx:(Math.random()-.5),life:1,size:.3,size2:.7,col:[0xffffff,0xd8f0ff],op:.5});}
  if(ZM.mama&&ZM.mama.g&&Math.random()<dt*.4){const m=ZM.mama;mgSpawn({t:"ring",x:m.x,y:m.y+2.6,z:m.z+1,vy:.6,life:2.4,size:.4,size2:1.4,col:[0xffffff],op:.4});}
  if(C){C.cool=Math.max(0,C.cool-dt);
    if(C.on){C.t+=dt*C.dir*4.2;const end=C.dir>0?zmCablePos(C.t)[4]:C.t<=0;if(C.t<0)C.t=0;const [x,y,z,yaw]=zmCablePos(C.t);C.m.position.set(x,y,z);C.m.rotation.y=yaw;C.m.rotation.z=Math.sin(tt*1.7)*.03;
      if(FP.on){FP.p.set(x,y+.05,z);FP.v.set(0,0,0);FP.ground=true;FP.safe.copy(FP.p);}
      if(end){C.on=false;C.cool=1;C.out=1;if(FP.on){const E=C.dir>0?ZM.P.E:null;if(E)FP.p.set(E.x+.5,E.top+.02,E.z-1.3);else FP.p.set(ZM.station.x-1.4,ZM.station.y+.02,ZM.station.z);FP.safe.copy(FP.p);}tone(659,.15,"triangle",.05);tone(880,.2,"triangle",.04,.12);if(C.dir>0)toast("Stigla si na Orlovu iglu! Za povratak opet stani u kabinu.",3600);}}
    else if(FP.on&&C.cool<=0&&!FP.mount&&!PW.fly){const [x,y,z]=zmCablePos(C.t);if(C.out){if(Math.hypot(P.x-x,P.z-z)>1.4)C.out=0;}else if(Math.hypot(P.x-x,P.z-z)<.9&&Math.abs(P.y-y)<1.2){C.on=true;C.dir=C.t>1?-1:1;tone(330,.25,"sine",.04);tone(440,.25,"sine",.04,.15);tipOnce("zm_zicara","Žičara kreće! Uživaj u pogledu.",3000);}}}
  if(!FP.on)return;
  /* a fall into the clouds: a little dragon catches you */
  if(P.y<8&&!FP.mount&&!PW.fly){P.copy(FP.safe);FP.v.set(0,0,0);burst(P.x,P.y+.6,P.z,18,[[1,.5,.2],[1,.9,.5]],2,2,.6);tone(523,.12,"triangle",.05);tone(784,.16,"triangle",.04,.1);toast("Uh! Mali zmaj te uhvatio u oblacima i vratio na stijenu.",3200);}
  if(Math.hypot(P.x-ZM.station.x,P.z-ZM.station.z)<6&&!C.on)tipOnce("zm_stanica","Stanica žičare! Stani u crvenu kabinu i vozi se do Orlove igle.",4200);
  if(Math.hypot(P.x-ZM.nest.x,P.z-ZM.nest.z)<10)tipOnce("zm_gnijezdo","Psst! Zmajica Ruža spava u gnijezdu. Hodaj tiho!",4200);
  if(Math.hypot(P.x-ZM.vent.x,P.z-ZM.vent.z)<9)tipOnce("zm_vulkan","Vulkan je topao, ali ne peče. Stani u sredinu kratera i topli zrak će te dići!",4800);
  if(Math.hypot(P.x-ZM.cat.x,P.z-ZM.cat.z)<4)tipOnce("zm_kat","Zmajev katapult! Stani na zlatnu ploču.",3600);
  if(Math.hypot(P.x-ZM.fall.x,P.z-ZM.fall.z)<7)tipOnce("zm_slap","Iza slapa nešto svjetluca. Prođi kroz vodu!",4000);}
function zmTalk(){const n=wStars("zmajevi");const need=["zmajic","kozorog"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.zmajevi&&S.wst.zmajevi[s.k]));
  const L=n>=WSTAR_N?"Zmajeva riznica je otvorena! Nalazi se u Zmajevom gnijezdu, iza mame zmajice.":
    n===0?"Dobro došla na Zmajeve vrhove! Ja sam zmajarka Iskra. Zmajevi su sakrili deset zmajevih kamena po vrhovima. Kad ih skupiš, otvorit će se zmajeva riznica. Mostovi su čvrsti, a ako padneš u oblake, zmajić te uhvati!":
    "Imaš "+n+" od "+WSTAR_N+" zmajevih kamena. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" Na vrhovima ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_zmajevi=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#4a6ac8");g.addColorStop(1,"#ffb47a");x.fillStyle=g;x.fillRect(0,0,64,64);
    P([[0,64],[0,46],[10,22],[20,46]],"#6a5a5a");P([[16,64],[30,14],[44,64]],"#7a6a6a");P([[26,22],[30,14],[34,22]],"#ffffff");P([[40,64],[50,32],[64,52],[64,64]],"#6a5a5a");
    x.fillStyle="#fff0e8";x.fillRect(0,54,64,10);x.fillStyle="#d8341e";P([[38,20],[46,16],[52,20],[46,22]],"#d8341e");P([[42,18],[44,10],[48,18]],"#ffa020");};
  D.mg_trail_zeravice=(x)=>{const c=["#ffd060","#ff7a20","#ff3a10"];for(let i=0;i<18;i++){x.fillStyle=c[i%3];x.beginPath();x.arc(8+(i*37)%50,8+(i*23)%50,2+(i%3),0,7);x.fill();}};})();

pwWorld("zmajevi",{dist:"gora",lv:12,n:"Zmajevi vrhovi",d:"Vrhovi iznad mora oblaka spojeni visećim mostovima: zmajevo gnijezdo, slap kroz koji se prolazi, pagoda sa zvonima, ledeni vrh, vulkan, žičara i zmajev katapult.",
  feat:["Zmajarka Iskra","Zmajić Iskrica","Kozorog Rogo","viseći mostovi","žičara","zmajev katapult"],fr:["crvena","zlato","lampion"],ca:0xffa060,cb:0xb8201a,sea:0,fog:.0026,noClouds:0,
  preset:PRESETS.zmajevi,
  gen:zmGen,env:zmEnv,life:zmLife,talk:zmTalk,tick:zmTick,itemMesh:zmItem,itemCol:[0xffb040,0xffffff,0xff6a20],itemBurst:[[1,.7,.3],[1,1,1],[1,.4,.1]],itemFx:"star",
  item:{one:"Zmajev kamen",hud:"Zmajevi kamenovi",done:"Svi zmajevi kamenovi!",all:"Svih 10 zmajevih kamena! Zmajeva riznica u gnijezdu se otvorila!",first:"Prvi zmajev kamen! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Zmajevi vrhovi! Zmajevi kamenovi: "+wStars("zmajevi")+" / "+WSTAR_N+". Zmajarka Iskra te čeka kod portala.",
  facts:{zicara:"Najduža žičara na svijetu vozi preko sedam kilometara. Kabine ponekad visoko nad dolinom voze ljude do sela u planinama.",
    let:"Orlovi lete visoko bez mahanja krilima. Koriste tople zračne struje koje se dižu od zemlje, baš kao ti iznad vulkana!",
    rog:"Kad se planine dižu, stijene se lome i ostaju visoki kameni stupovi. Neki stoje usamljeni stotinama godina.",
    zlato:"Zlato ne hrđa i ne tamni, pa izgleda isto i nakon tisuću godina. Zato su ga ljudi oduvijek smatrali blagom.",
    jaja:"Najveće jaje na svijetu snese noj. Teško je kao dvadeset kokošjih jaja, a ljuska mu je tvrda kao porculan.",
    slap:"Najviši slap na svijetu, Anđeoski slap, pada skoro kilometar u dubinu. Voda se raspe u maglu prije nego stigne do dna!",
    zvona:"Pagode su tornjevi s mnogo krovova jedan iznad drugog. Na rubovima krovova često vise mala zvonca koja zvone na vjetru.",
    otocic:"Oblaci su napravljeni od sitnih kapljica vode. Jedan obični oblak može biti težak kao sto slonova, a ipak lebdi!",
    vrh:"Najviša planina na svijetu je Mount Everest. Na vrhu je tako hladno i zrak tako rijedak da planinari nose bocu s kisikom.",
    vulkan:"Vulkan je planina kroz koju iz dubine Zemlje izlazi užarena lava. U Hrvatskoj nema aktivnih vulkana, ali Italija ih ima nekoliko."},
  chat:{"Zmajica Ruža":["Zzzz... hrrr... zzzz...","Ruža se nasmiješi u snu i ispusti mali oblačić dima."],zmajic_z:["Hep-ćih! Pazi, iskrice!"],zmajic_p:["Kad narastem, letjet ću do Mjeseca!"],
    jak:["Muuu. Hladno mi nije, imam najtopliji kaput na planini."],kozorog2:["Meee! Pogledaj kako skačem!"],orao:["Orao te gleda oštrim pogledom. Vidi miša s visine od kilometra!"]},
  finale:{chest:"zm_blago",isl:"riznica",at:{x:128,z:113},rewards:["skin:zmajska","trail:zeravice"],locked:"Kristalna vrata zmajeve riznice su zatvorena. Skupi svih 10 zmajevih kamena!",
    kicker:"Zmajeva riznica je otvorena!",title:"Blago zmajevih vrhova",sub:"Zmajska lisica i Zmajeve iskre sad su tvoji. Zmajica Ruža se probudila i kaže da si prava prijateljica zmajeva!"}});
