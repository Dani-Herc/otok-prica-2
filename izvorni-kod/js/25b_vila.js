/* =================== OP2 v9: Vilinska šuma (portal world of Cvjetna dolina) =================== */
/* A forest in everlasting twilight. Glowing mushrooms, fairy houses in tree trunks, fairy rings that carry you
   across the forest, bouncy mushrooms, a waterfall with a hidden cave, a friendly troll under his bridge, a unicorn.
   In the middle stands the Great Tree: a whirl of petals lifts you through its hollow trunk to the fairy palace. */
MSKIN.vila={n:"Vilinska lisica",d:"Lila krzno koje svjetluca kao vilinska prašina. Gdje prođe, šuma zasvijetli.",p:0,rar:"l",O:0xc89aff,W:0xfff0ff,B:0x3a1a6a,D:0xff9ae0,glowO:.2,fx:"galaksija",wr:"Vilinska šuma"};
MTRAIL.prasina={n:"Vilinska prašina",d:"Iza Ride ostaje šarena svjetlucava prašina, kao iza vile.",p:0,rar:"l",wr:"Vilinska šuma"};
TR.prasina=p=>mgSpawn({t:"star",x:p.x+(Math.random()-.5)*.5,y:p.y+.3+Math.random()*.6,z:p.z+(Math.random()-.5)*.5,vy:.35,life:1.3,size:.24,size2:.03,col:[0xff9ae0,0xc89aff,0x9ae0ff,0xfff09a],add:1,op:1});TRATE.prasina=11;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","vila",MSKIN.vila);ins("trail","prasina",MTRAIL.prasina);}
PRESETS.vila={top:0x2a1a5a,hz:0xd08ae0,sun:0xffc0e8,si:1.5,hemi:.8,el:.22,az:2.6,fog:0x7a5aaa,glow:1.15,stars:.6,sh:0x5a8ab8,dp:0x2a2a6a,exp:1.06,night:.45};

/* ---------- creatures ---------- */
MODELS.jednorog=function(){const Wt=0xfaf6ff,L=0xe8e0f8,K=0x1a1a2a,G=0xffd86a,hd={name:"head",px:0,py:1.1,pz:.5},tl={name:"tail",px:0,py:.9,pz:-.55};
  const sp=[[.5,.5,1.1,0,.85,0,Wt],[.36,.5,.36,0,1.2,.48,Wt],[.32,.32,.56,0,1.48,.66,Wt,hd],[.24,.2,.16,0,1.38,.98,L,hd],[.06,.08,.02,-.17,1.54,.8,K,hd],[.06,.08,.02,.17,1.54,.8,K,hd],
    [.06,.4,.06,0,1.86,.82,G,hd],[.1,.12,.06,-.1,1.72,.56,Wt,hd],[.1,.12,.06,.1,1.72,.56,Wt,hd]];
  const RB=[0xff6a8a,0xffb03a,0xfff06a,0x7ae86a,0x6ab8ff,0xb07aff];RB.forEach((c,i)=>sp.push([.1,.22,.1,0,1.62-i*.08,.5-i*.07,c,hd]));RB.forEach((c,i)=>sp.push([.1,.34,.1,(i-2.5)*.03,.82-i*.05,-.6-i*.03,c,tl]));
  for(const [x,z] of [[-.17,.38],[.17,.38],[-.17,-.38],[.17,-.38]]){sp.push([.14,.6,.14,x,.3,z,Wt]);sp.push([.15,.1,.15,x,.04,z,G]);}return mk(sp);};
MODELS.leptirduga=function(){const B=0x2a1a3a,wl={name:"wl",px:-.08,py:.3,pz:0},wr={name:"wr",px:.08,py:.3,pz:0},hd={name:"head",px:0,py:.3,pz:.3};
  const sp=[[.12,.12,.6,0,.3,0,B],[.14,.14,.14,0,.32,.36,B,hd],[.02,.2,.02,-.05,.48,.4,B,hd],[.02,.2,.02,.05,.48,.4,B,hd]];
  const C=[[0xff6aa8,0xffd06a],[0x6ab8ff,0xb07aff]];for(const [s,w] of [[-1,wl],[1,wr]]){sp.push([.7,.04,.5,s*.44,.3,.14,C[0][0],w]);sp.push([.5,.04,.4,s*.36,.3,-.26,C[1][0],w]);sp.push([.22,.05,.18,s*.5,.31,.16,C[0][1],w]);sp.push([.16,.05,.14,s*.4,.31,-.26,C[1][1],w]);}
  return mk(sp);};
MODELS.vila=function(){const S=0xffe0c8,H=0xffd060,D=0xc87aff,K=0x2a1a2a,wl={name:"wl",px:-.06,py:.5,pz:-.06},wr={name:"wr",px:.06,py:.5,pz:-.06},hd={name:"head",px:0,py:.72,pz:0};
  const sp=[[.24,.36,.18,0,.4,0,D],[.3,.12,.24,0,.2,0,D],[.06,.2,.06,-.06,.06,0,S],[.06,.2,.06,.06,.06,0,S],[.24,.24,.22,0,.72,0,S,hd],[.26,.1,.24,0,.86,-.01,H,hd],[.08,.18,.06,0,.66,-.12,H,hd],
    [.04,.04,.02,-.06,.74,.115,K,hd],[.04,.04,.02,.06,.74,.115,K,hd],[.05,.02,.02,0,.66,.115,0xff8a9a,hd]];
  const wm=0xd8f0ff;sp.push([.04,.4,.3,-.12,.56,-.18,wm,wl],[.04,.3,.24,-.12,.34,-.16,wm,wl],[.04,.4,.3,.12,.56,-.18,wm,wr],[.04,.3,.24,.12,.34,-.16,wm,wr]);const g=mk(sp);
  g.traverse(o=>{if(o.isMesh&&o.material&&o.material.color&&o.material.color.getHex()===LC(wm)){o.material=new THREE.MeshStandardMaterial({color:LC(wm),emissive:LC(0x9ad8ff),emissiveIntensity:.6,transparent:true,opacity:.55});}});return g;};
MODELS.trol=function(){const G=0x7a9a6a,D=0x5a7a4a,B=0x8a6a4a,K=0x1a1a1a,Wt=0xf6f0e0,hd={name:"head",px:0,py:1.5,pz:.2};
  return mk([[.9,1,.7,0,.9,0,G],[.92,.3,.72,0,.5,0,B],[.3,.5,.3,-.24,.2,0,D],[.3,.5,.3,.24,.2,0,D],[.26,.9,.26,-.6,.9,.08,G],[.26,.9,.26,.6,.9,.08,G],
    [.7,.6,.6,0,1.6,.24,G,hd],[.2,.24,.16,0,1.52,.6,D,hd],[.12,.12,.02,-.18,1.72,.545,Wt,hd],[.12,.12,.02,.18,1.72,.545,Wt,hd],[.06,.06,.02,-.18,1.72,.555,K,hd],[.06,.06,.02,.18,1.72,.555,K,hd],
    [.08,.1,.04,-.12,1.36,.55,Wt,hd],[.08,.1,.04,.12,1.36,.55,Wt,hd],[.16,.3,.1,-.4,1.84,.2,D,hd],[.16,.3,.1,.4,1.84,.2,D,hd],[.5,.1,.5,0,1.94,.24,0x5a3a7a,hd]]);};
MODELS.vila2=()=>MODELS.vila();MODELS.jednorog2=()=>MODELS.jednorog();
pwPets("vila","dolina",[
  {k:"jednorog",fav:"bobice",n:"Jednorog Zvjezdan",d:"Bijeli jednorog sa zlatnim rogom i grivom u bojama duge. Kad galopira, iza njega ostaje duga.",gd:"Iz šume donosi zvjezdano cvijeće i zlatnike.",gift:()=>[["bobice",4],["coins",18]],spd:1.8,
   spec:{n:"Dugin galop",d:"Zvjezdan juri kroz šumu i skače dvaput zaredom, a iza vas ostaje duga!",ride:1,ic:"star"},ride:{land:1,speed:10.8,jump:11,dbl:1,seat:1.1},tip:"Zvjezdan te nosi! Skoči dvaput zaredom."},
  {k:"leptirduga",fav:"bobice",n:"Leptir Duga",d:"Golemi leptir šarenih krila. Leti tiho kao šapat i nikad ne zaluta.",gd:"S cvijeća donosi nektar i šarena pera.",gift:()=>[["bobice",3],["coins",15]],spd:1.2,
   spec:{n:"Let na leptiru",d:"Duga te nosi visoko iznad krošanja! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:9.2,jump:9,seat:.45},tip:"Duga leti! Skok je gore, Roni je dolje."}]);
PWIT.cvijet={n:"Zvjezdani cvijet",mk:g=>{const m=std(0xfff6a0,{emissive:LC(0xffd040),emissiveIntensity:.6});for(let i=0;i<5;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(.1,.04,.24),m);p.rotation.y=i*1.2566;p.position.set(Math.sin(i*1.2566)*.12,0,Math.cos(i*1.2566)*.12);g.add(p);}
  const c=new THREE.Mesh(new THREE.BoxGeometry(.1,.08,.1),std(0xff9a3a));g.add(c);},glow:0xfff0a0};
PWIT.nektar={n:"Kap nektara",mk:g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.2,14,10),new THREE.MeshStandardMaterial({color:LC(0xffb0e0),emissive:LC(0xff6ab8),emissiveIntensity:.5,roughness:.05,transparent:true,opacity:.8}));g.add(m);},glow:0xffb0e0};
PWIT.bocica={n:"Bočica vilinske prašine",mk:g=>{const gl=new THREE.MeshStandardMaterial({color:LC(0xe0f0ff),transparent:true,opacity:.5,roughness:.05});const b=new THREE.Mesh(new THREE.BoxGeometry(.22,.26,.22),gl);g.add(b);
  const d=new THREE.Mesh(new THREE.BoxGeometry(.16,.14,.16),std(0xff9ae0,{emissive:LC(0xff6ad8),emissiveIntensity:.9}));d.position.y=-.04;g.add(d);const c=new THREE.Mesh(new THREE.BoxGeometry(.1,.08,.1),std(0x8a5a3a));c.position.y=.17;g.add(c);},glow:0xffb0f0};
function vsGem(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0xf0b0ff),emissive:LC(0xc060ff),emissiveIntensity:.9,roughness:.1,metalness:.3,flatShading:true});
  const o=new THREE.Mesh(new THREE.OctahedronGeometry(.3,0),m);o.scale.y=1.4;g.add(o);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xe0a0ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(2.3,2.3,1);g.add(sp);return g;}

/* ---------- the forest ---------- */
const VFG=SL+2;
const VLS={bounce:new Set(),rings:[],ff:[],shrooms:[],wisp:[],flowers:[],nectar:[],bottles:[],tp:0};
function vsH(x,z){let h=VFG+Math.round((fbm(x*.035+1,z*.035+6)-.5)*5);const e=Math.max(Math.abs(x-128),Math.abs(z-128));if(e>104)h=Math.max(h,VFG+Math.round((e-104)*2.4+fbm(x*.1,z*.1)*6));
  {const d=Math.hypot(x-200,z-200)*(1+.12*(vnoise(x*.2,z*.2,3)-.5));if(d<11)h=Math.max(h,VFG+20);}
  {const d=Math.hypot(x-178,z-78);if(d<6)h=Math.max(h,VFG+20);}
  {const d=Math.hypot(x-62,z-150)*(1+.12*(vnoise(x*.25,z*.25,5)-.5));if(d<13)h=Math.min(h,VFG-4+Math.round(Math.max(0,d-10)*1.3));}
  if(x<50&&Math.abs(z-150)<16)h=Math.max(h,VFG+16+Math.round(fbm(x*.1,z*.1)*4));
  {const t=(x-72)/70;if(t>0&&t<1){const zc=154+Math.sin(t*5)*4;if(Math.abs(z-zc)<2.2)h=Math.min(h,VFG-2);}}
  return h;}
function vsGen(){const Y=(x,z)=>hmap[x+z*W];const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,vsH(x,z));hmap[x+z*W]=h;const cliff=h>VFG+8;const myc=fbm(x*.06+3,z*.06+3)>.58;
    for(let y=0;y<h;y++){let t=T.zemlja;if(cliff)t=y===h-1&&hash2(x,z,2)<.5?T.mahovina:T.kamen;else if(y===h-1)t=myc?T.micelij:(hash2(x,z,4)<.12?T.mahovina:T.trava);vox[I(x,y,z)]=t;}
    if(h<VFG-1)for(let y=h;y<VFG-1;y++)vox[I(x,y,z)]=T.voda;}
  busy(128,190,9);busy(124,184,4);
  /* ----- the Great Tree with the fairy palace in its crown ----- */
  {const cx=128,cz=104,g=Y(cx,cz),top=g+32;for(let dz=-9;dz<=9;dz++)for(let dx=-9;dx<=9;dx++){const d=Math.hypot(dx,dz);const x=cx+dx,z=cz+dz;
      const rr=6.5+Math.max(0,3-(0))*0;for(let y=g-1;y<top;y++){const r=y<g+3?rr+2.2-(y-g)*.7:rr;if(d>r)continue;if(d<r-1.6&&y>=g){vox[I(x,y,z)]=0;continue;}if(dz>=5&&Math.abs(dx)<=1&&y>=g&&y<g+3)continue;wput(x,y,z,(Math.floor(Math.atan2(dz,dx)*4)+y)%5===0?T.tdaske:T.drvo,1);}}
    for(let dz=-15;dz<=15;dz++)for(let dx=-15;dx<=15;dx++){const d=Math.hypot(dx,dz);if(d>14.6||d<4.4)continue;wput(cx+dx,top,cz+dz,d>13.6?T.tdaske:T.sdaske,1);if(d>13.6&&(dx+dz)%2===0)wput(cx+dx,top+1,cz+dz,T.lampion,1);}
    WG.wind.push({x:cx+.5,z:cz+.5,r:3,y0:g,y1:top+5,k:"vrtlog"});VLS.whirl={x:cx+.5,y:g,z:cz+.5,top};
    for(let dz=-16;dz<=16;dz++)for(let dx=-16;dx<=16;dx++)for(let y=top+9;y<=top+22;y++){const e=(dx*dx+dz*dz)/256+Math.pow((y-top-14)/8,2);if(e<1&&e>.55&&hash3(cx+dx,y,cz+dz)<.85)wput(cx+dx,y,cz+dz,hash3(cx+dx,y+1,cz+dz)<.3?T.tresnja:T.carlisce,1);}
    for(const [a,b] of [[-9,-9],[9,-9],[-9,9],[9,9],[0,-13],[0,13],[-13,0],[13,0]])for(let y=top+1;y<top+10;y++)wput(cx+a,y,cz+b,T.drvo,1);
    /* the palace on the platform, behind the stair gap */
    const px=cx,pz=cz-9;for(let dz=-3;dz<=3;dz++)for(let dx=-4;dx<=4;dx++)for(let y=top+1;y<=top+6;y++){const ex=Math.abs(dx)===4,ez=Math.abs(dz)===3;if(y===top+6){wput(px+dx,y,pz+dz,T.ametist,1);continue;}if(!(ex||ez))continue;
      if(dz===3&&Math.abs(dx)<=1&&y<=top+3){wput(px+dx,y,pz+dz,T.kristal,1);WG.gate.push([px+dx,y,pz+dz]);continue;}wput(px+dx,y,pz+dz,(y===top+3&&(dx+dz)%2===0)?T.kristal:T.ametist,1);}
    for(let k=0;k<3;k++)wput(px,top+7+k,pz,k===2?T.kristal:T.ametist,1);
    WG.isl.kruna={x:px,z:pz,y:top+1,r:5};addChest("f_blago",px,top+1,pz-1,"Blago vilinske kraljice");POI.push({k:"f_stablo",n:"Stablo svih stabala",x:cx,z:cz,r:12});busy(cx,cz,16);}
  /* ----- the fairy village with mushroom houses ----- */
  {const hs=[[146,146,T.gljiva],[160,140,T.vuna_lj],[156,158,T.gljiva],[140,160,T.vuna_t],[168,152,T.vuna_r]];for(const [x,z,cap] of hs){const g=Y(x,z);
      for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)for(let y=g;y<g+4;y++){const wall=Math.abs(dx)===2||Math.abs(dz)===2;if(!wall){vox[I(x+dx,y,z+dz)]=0;continue;}if(dz===2&&dx===0&&y<g+2)continue;wput(x+dx,y,z+dz,(y===g+2&&(dx===0||dz===0))?T.staklo:T.stapka,1);}
      for(let k=0;k<4;k++){const r=4-k;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(Math.hypot(dx,dz)<=r+.3)wput(x+dx,g+4+k,z+dz,(k<3&&hash2(x+dx,z+dz,7+k)<.18)?T.bijela:cap,1);}
      wput(x+2,g+2,z+3,T.lampion,1);busy(x,z,5);}
    {const [x,z]=[146,146],g=Y(x,z);for(let h=0;h<2;h++)pwCell("prasina",x,g+h,z+2,T.tdaske);wStar("prasina",x+.5,g+.9,z+.5,"U kućici vile Iskrice u vilinskom selu. Pomozi Iskrici pronaći bočice prašine!");VLS.iskra={x:x+1.5,z:z+4.5};}
    POI.push({k:"f_selo",n:"Vilinsko selo",x:154,z:150,r:16});}
  /* ----- the treehouse in an old oak (spiral stair inside the trunk) ----- */
  {const cx=80,cz=84,g=Y(cx,cz),top=g+22;const RING=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const d=Math.hypot(dx,dz);if(d>3.6)continue;for(let y=g;y<top;y++){if(d<2.5){vox[I(cx+dx,y,cz+dz)]=0;continue;}if(dz>=3&&dx===0&&y<g+2)continue;if(y%5===3&&(dx===0||dz===0))continue;wput(cx+dx,y,cz+dz,T.drvo,1);}}
    for(let y=g;y<top;y++)wput(cx,y,cz,T.drvo,1);for(let k=0;k<top-g;k++){const [a,b]=RING[(2+k)%8];wput(cx+a,g+k,cz+b,T.daske,1);}
    for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const d=Math.hypot(dx,dz);if(d>6.3)continue;const [a,b]=RING[(2+top-g-1)%8],[a2,b2]=RING[(2+top-g-2)%8];if(dx===a&&dz===b||dx===a2&&dz===b2)continue;if(d<1)continue;wput(cx+dx,top,cz+dz,d>5.5?T.tdaske:T.daske,1);}
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)for(let y=top+1;y<=top+4;y++){const wall=Math.abs(dx)===2||Math.abs(dz)===2;if(y===top+4){wput(cx+dx+3,y,cz+dz,T.gljiva,1);continue;}if(wall&&!(dx===-2&&dz===0&&y<top+3))wput(cx+dx+3,y,cz+dz,(y===top+2&&(dx===0||dz===0))?T.staklo:T.bdaske,1);}
    for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++)for(let y=top+5;y<=top+12;y++){const e=(dx*dx+dz*dz)/49+Math.pow((y-top-8)/4,2);if(e<1&&e>.5&&hash3(cx+dx,y,cz+dz)<.8)wput(cx+dx,y,cz+dz,T.lisce,1);}
    wStar("deblo",cx+3.5,top+1.9,cz+.5,"U vilinskoj kućici na vrhu starog hrasta. Uđi u deblo i penji se zavojitim stubama!");addChest("f_hrast",cx-4,top+1,cz+3,"Škrinja na hrastu");
    busy(cx,cz,8);POI.push({k:"f_hrast",n:"Stari hrast",x:cx,z:cz,r:8});}
  /* ----- bouncy mushrooms up to the rock pillar ----- */
  {const M=[[170,96,4,3],[176,90,8,3],[171,84,13,3]];M.forEach(([x,z,h,r],i)=>{const g=Y(x,z);for(let y=g;y<g+h;y++)wput(x,y,z,T.stapka,1);
      for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.hypot(dx,dz)>r+.3)continue;const X=x+dx,Z=z+dz,yy=g+h;wput(X,yy,Z,(hash2(X,Z,9)<.2)?T.bijela:T.gljiva,1);VLS.bounce.add(X+","+yy+","+Z);}VLS.shrooms.push([x+.5,g+h+1,z+.5]);});
    const x=178,z=78,t=Y(x,z);wStar("gljive",x+.5,t+1.1,z+.5,"Na vrhu kamenog stupa na istoku. Skočne gljive te bacaju sve više!");addChest("f_stup",x+1,t,z+1,"Škrinja na stupu");
    busy(174,86,12);POI.push({k:"f_gljive",n:"Skočne gljive",x:174,z:88,r:10});}
  /* ----- fairy rings: step in and you are carried to the other ring ----- */
  {const R=[[100,170],[200,200]];R.forEach(([x,z],i)=>{const g=Y(x,z);for(let a=0;a<16;a++){const an=a/16*Math.PI*2,X=Math.round(x+Math.cos(an)*3.4),Z=Math.round(z+Math.sin(an)*3.4);wput(X,g,Z,a%2?T.gljiva:T.bijela,1);}
      for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){if(Math.hypot(dx,dz)<2.6)vox[I(x+dx,g-1,z+dz)]=T.micelij;}VLS.rings.push({x:x+.5,y:g,z:z+.5,to:1-i,t:0});busy(x,z,5);});
    const x=204,z=196,g=Y(x,z);wStar("krug",x+.5,g+1.1,z+.5,"Na visokoj stijeni na jugoistoku. Do nje se ne može pješice: stani u vilinski krug kraj potoka!");addChest("f_stijena",x-6,g,z+3,"Škrinja na stijeni");POI.push({k:"f_krug",n:"Vilinski krugovi",x:100,z:170,r:6});}
  /* ----- the waterfall with a cave behind it, and the pond ----- */
  {const fx=48,fz=150;const top=Y(fx-2,fz);for(let y=VFG-1;y<top;y++)for(let b=-2;b<=2;b++){vox[I(fx,y,fz+b)]=T.voda;prot[I(fx,y,fz+b)]=1;}
    for(let y=VFG-1;y<VFG+3;y++)for(let b=-2;b<=2;b++)for(let a=1;a<=5;a++)vox[I(fx-a,y,fz+b)]=0;for(let b=-2;b<=2;b++)for(let a=1;a<=5;a++)vox[I(fx-a,VFG-2,fz+b)]=T.kamen;
    for(let b=-2;b<=2;b++)vox[I(fx-1,VFG-2,fz+b)]=T.kamen;for(const b of [-2,2])wput(fx-4,VFG+1,fz+b,T.svjetlo,1);
    wStar("slap",fx-3.5,VFG,fz+.5,"U špilji iza slapa na zapadu. Prođi kroz vodu!");VLS.fall={x:fx+.5,y0:VFG-1,y1:top,z:fz+.5};POI.push({k:"f_slap",n:"Slap",x:fx,z:fz,r:6});
    const cx=62,cz=150,b=Y(cx,cz);for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++)wput(cx+a,b,cz+c,T.ametist,1);wStar("jezero",cx+.5,b+2.1,cz+.5,"Na dnu Mjesečevog jezerca, kod ametista. Zaroni!");
    for(let i=0;i<14;i++){const x=cx-9+Math.floor(hash2(i,1,3)*18),z=cz-9+Math.floor(hash2(i,2,3)*18),y=Y(x,z);if(y<VFG-2&&!get(x,y,z))wput(x,y,z,hash2(i,3,3)<.4?T.svjetlo:T.koralj_l,1);}
    for(const [x,z] of [[56,140],[70,144],[52,160]])if(Y(x,z)>=VFG-1)wput(x,VFG-2,z,T.lopoc,1);busy(cx,cz,13);POI.push({k:"f_jezero",n:"Mjesečevo jezerce",x:cx,z:cz,r:12});}
  /* ----- the troll bridge over the brook ----- */
  {const bx=110,t=(bx-72)/70,bz=Math.round(154+Math.sin(t*5)*4);for(let a=-3;a<=3;a++)for(let w=-1;w<=1;w++){const y=VFG+(Math.abs(a)<2?1:0);wput(bx+w,y,bz+a,T.kcigla,1);}for(const w of [-2,2])for(let a=-3;a<=3;a++)wput(bx+w,VFG+1+(Math.abs(a)<2?1:0),bz+a,T.kcigla,1);
    for(let a=-1;a<=1;a++)for(let w=-1;w<=1;w++)vox[I(bx+w,VFG,bz+a)]=0;for(let a=-1;a<=1;a++)for(let w=-1;w<=1;w++){vox[I(bx+w,VFG-1,bz+a)]=0;vox[I(bx+w,VFG-2,bz+a)]=T.sijeno;}
    wStar("trol",bx+.5,VFG-.9,bz+.5,"Ispod trolova mosta na potoku. Trol Brundo spava, ali ne smeta mu kad tiho prođeš.");VLS.troll={x:bx-1.5,z:bz+3.5};POI.push({k:"f_most",n:"Trolov most",x:bx,z:bz,r:6});busy(bx,bz,4);}
  /* ----- singing mushrooms ----- */
  {const cx=166,cz=122;const L=[["vuna_lj",523],["vuna_r",659],["vuna_ts",784],["vuna_z",988]],PP=[[-4,-2],[-1,-4],[3,-3],[4,1]],ORD=[2,0,3,1];
    const pads=PP.map(([a,b],i)=>{const x=cx+a,z=cz+b,y=Y(x,z)-1;vox[I(x,y,z)]=T[L[i][0]];prot[I(x,y,z)]=1;for(let h=1;h<=3;h++)wput(x+(a>0?1:-1),y+h,z,T.stapka,1);for(let q=-1;q<=1;q++)for(let r=-1;r<=1;r++)wput(x+(a>0?1:-1)+q,y+4,z+r,T[L[i][0]],1);wput(x+(a>0?1:-1),y+5,z,T.svjetlo,1);
      return {x,y,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    {const x=cx,z=cz+5,y=Y(x,z);for(let a=-2;a<=2;a++)for(let h=0;h<5;h++)wput(x+a,y+h,z,T.kamen,1);ORD.forEach((j,i)=>wput(x,y+4-i,z-1,T[L[j][0]],1));}
    {const x=cx,z=cz,y=Y(x,z);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("pjesma",x+a,y+h,z+b,h===2?T.gljiva:T.stapka);}wStar("pjesma",x+.5,y+.9,z+.5,"U gljivi usred kruga pjevajućih gljiva. Stani na ploče redom kao na kamenoj ploči!");}
    pwSeq("pjesma",{pads,order:ORD,win:"Gljive su zapjevale vilinsku pjesmu! Srednja gljiva se otvorila.",wrong:"Ups, kriva nota. Pogledaj kamenu ploču, odozgo prema dolje, i kreni ispočetka!"});busy(cx,cz,7);POI.push({k:"f_pjesma",n:"Pjevajuće gljive",x:cx,z:cz,r:8});}
  /* ----- treasure under the roots of the old willow ----- */
  {const x=56,z=96,g=Y(x,z);for(let y=g;y<g+10;y++)for(const [a,b] of [[0,0],[1,0],[0,1],[1,1]])wput(x+a,y,z+b,T.drvo,1);for(let i=0;i<8;i++){const an=i/8*6.28;for(let r=1;r<5;r++)wput(Math.round(x+.5+Math.cos(an)*r),g+(r<3?1:0),Math.round(z+.5+Math.sin(an)*r),T.drvo,1);}
    for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++)for(let y=g+7;y<g+13;y++){const e=(dx*dx+dz*dz)/36+Math.pow((y-g-10)/3,2);if(e<1&&e>.4)wput(x+dx,y,z+dz,T.lisce_b,1);}
    for(let i=0;i<20;i++){const an=i/20*6.28;const X=Math.round(x+Math.cos(an)*6),Z=Math.round(z+Math.sin(an)*6);for(let y=g+3;y<g+9;y++)if(hash2(X,y,Z)<.7)wput(X,y,Z,T.lisce_b,1);}
    const dx0=x+4,dz0=z+5,y=Y(dx0,dz0)-1;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("korijenje",dx0+a,y,dz0+b,(a===b||a===-b)?T.crvena:T.zemlja);pwCell("korijenje",dx0+a,y-1,dz0+b,T.zemlja);}
    wStar("korijenje",dx0+.5,y-.4,dz0+.5,"Zakopano pod crvenim X-om kraj stare vrbe. Kopaj!");pwDig("korijenje",dx0,y,dz0,"Kopaš, kopaš... i eno ga! Vilinski kristal među korijenjem!");busy(x,z,8);POI.push({k:"f_vrba",n:"Stara vrba",x,z,r:8});}
  /* ----- path of fairy dust: ring course ----- */
  {const pts=[[128,176],[112,166],[96,150],[90,128],[100,112],[114,128],[140,128],[150,112],[146,92],[128,84]].map(([x,z])=>[x+.5,Y(x,z)+1.6,z+.5]);for(const p of pts)busy(Math.floor(p[0]),Math.floor(p[2]),2);
    const cx=136,cz=176,g=Y(cx,cz);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("staza",cx+a,g+h,cz+b,h===2?T.carlisce:T.bdaske);}
    wStar("staza",cx+.5,g+.9,cz+.5,"U vilinskom paviljonu kraj portala. Otvara se kad prođeš stazu vilinske prašine!");
    pwRings("staza",{start:[122.5,Y(122,180),180.5],pts,time:60,col:0xff9ae0,name:"Staza vilinske prašine",win:"Prošla si cijelu stazu! Vilinski paviljon kraj portala se otvorio."});}
  /* pickups */
  VLS.flowers=[[90,110],[160,108],[110,190],[70,120]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  VLS.nectar=[[150,170],[104,90],[188,140]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  VLS.bottles=[[120,140],[176,170],[86,180],[60,120],[150,80]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  /* the forest: big trees with purple and green crowns, glowing mushrooms, flowers */
  for(let z=10;z<W-10;z+=5)for(let x=10;x<W-10;x+=5){const X=x+Math.floor(hash2(x,z,51)*4),Z=z+Math.floor(hash2(x,z,52)*4);if(mask[X+Z*W]||mask[X+1+Z*W]||mask[X+(Z+1)*W])continue;const g=Y(X,Z);if(g<VFG||g>VFG+10)continue;
    const r=hash2(X,Z,53);if(r<.42){const h=9+Math.floor(hash2(X,Z,54)*8),c=hash2(X,Z,55)<.45?T.carlisce:(hash2(X,Z,56)<.5?T.lisce:T.tresnja);for(let y=g;y<g+h;y++)for(const [a,b] of [[0,0],[1,0],[0,1],[1,1]])wput(X+a,y,Z+b,T.drvo);
      for(let dz=-4;dz<=5;dz++)for(let dx=-4;dx<=5;dx++)for(let y=g+h-3;y<=g+h+3;y++){const e=((dx-.5)**2+(dz-.5)**2)/20+((y-g-h)**2)/10;if(e<1&&hash3(X+dx,y,Z+dz)<.88&&!get(X+dx,y,Z+dz))wput(X+dx,y,Z+dz,c);}}
    else if(r<.55){const h=2+Math.floor(hash2(X,Z,57)*3);for(let y=g;y<g+h;y++)wput(X,y,Z,T.stapka);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)wput(X+a,g+h,Z+b,hash2(X,Z,58)<.5?T.gljiva:T.vuna_lj);wput(X,g+h-1,Z+1,T.svjetlo);}}
  for(const P of [VLS.flowers,VLS.nectar,VLS.bottles])for(const p of P)p[1]=Y(Math.floor(p[0]),Math.floor(p[2]))+1.3;
  /* the portal */
  {const x=128,z=196,g=Y(x,z);for(let dz=-12;dz<=6;dz++)for(let dx=-5;dx<=5;dx++){const X=x+dx,Z=z+dz;for(let y=Y(X,Z);y<g;y++)wput(X,y,Z,T.trava);for(let y=g;y<H;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;hmap[X+Z*W]=g;}
    wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:g,z:z-8.5,cam:0};busy(x,z-4,6);}
  Object.assign(LOOT,{f_hrast:{coins:55,mats:{smaragd:1},blocks:{lisce:12,daske:10},msg:"Vile iz hrasta daruju ti lišće i daske za kućicu na drvetu."},
    f_stup:{coins:55,mats:{ametist:2},blocks:{gljiva:8,stapka:8},msg:"Gljivari su ovdje sakrili ametiste."},
    f_stijena:{coins:60,mats:{dijamant:1},blocks:{micelij:12},msg:"Na stijeni do koje vodi samo vilinski krug, blago je posebno."},
    f_blago:{coins:330,mats:{dijamant:2,smaragd:2,ametist:3},blocks:{ametist:10,kristal:4,carlisce:12,micelij:10},msg:"Blago vilinske kraljice! Svjetluca svim bojama."}});}

/* ---------- life ---------- */
function vsLife(){S.wq=S.wq||{};
  PW.guide=pwPut("vila","Vila Lucija",124.5,186.5,{frozen:true,ry:Math.PI*.8,sc:1.5,y:VFG+1});
  const iskra=pwPut("vila","Vila Iskrica",VLS.iskra.x,VLS.iskra.z,{frozen:true,ry:0,sc:1.4});pwPut("trol","Trol Brundo",VLS.troll.x,VLS.troll.z,{frozen:true,ry:Math.PI*.5,sc:1.5});
  [[150,150],[160,146],[144,156],[162,160]].forEach(([x,z],i)=>VLS.wisp.push(pwPut("vila2",["Rosica","Zvončica","Lila","Treptalica"][i],x+.5,z+.5,{speed:.7,sc:1.2})));
  pwPut("sova","Sova Mudrica",86.5,96.5,{frozen:true,ry:Math.PI});[["Zeko Vilenjak",110.5,120.5],["Zečica Mjesečica",140.5,100.5]].forEach(([n,x,z])=>pwPut("zec",n,x,z,{speed:1}));
  [["Jelenko",96.5,136.5],["Košutica",170.5,176.5]].forEach(([n,x,z])=>pwPut("jelen",n,x,z,{speed:.6}));pwPut("jednorog2","Jednorožica Bijela",186.5,120.5,{speed:.5});
  const zv=pwPut("jednorog",PETS.jednorog.n,108.5,104.5,{speed:.5});const du=pwPut("leptirduga",PETS.leptirduga.n,150.5,176.5,{speed:.6,y:VFG+2});
  pwQuest("jednorog",{pet:1,en:zv,auto:1,need:4,item:"cvijet",spots:VLS.flowers,got:"Zvjezdani cvijet",
    ask:"Dobra večer, mala lisice. Ja sam Zvjezdan. Bez zvjezdanog cvijeća moja griva gubi boje. Doneseš mi četiri cvijeta? Svijetle žuto, pa ih lako nađeš u sumraku.",
    done:"Gledaj, griva mi opet sja svim bojama duge! Sad smo prijatelji. Popni se, galopirat ćemo kroz šumu!",fact:"Jednorozi postoje samo u pričama, ali narvali u moru imaju pravi dugi rog. To je zapravo zub!"});
  pwQuest("leptirduga",{pet:1,en:du,auto:1,need:3,item:"nektar",spots:VLS.nectar,got:"Kap nektara",
    ask:"Psst, ovdje gore! Ja sam Duga. Krila su mi umorna, a nektar je u cvjetovima po cijeloj šumi. Doneseš mi tri kapi? Onda te vodim iznad krošanja!",
    done:"Mmm, kako slatko! Sad imam snage za dugi let. Hoćeš sa mnom?",fact:"Leptiri okus osjete nogama! Kad slete na cvijet, odmah znaju je li nektar ukusan."});
  pwQuest("prasina",{en:iskra,need:5,item:"bocica",spots:VLS.bottles,got:"Bočica vilinske prašine",cage:"prasina",
    ask:"Joj, joj! Ja sam vila Iskrica. Spremala sam vilinsku prašinu za ples, a vjetar mi je raznio pet bočica po šumi! Bez prašine vile ne mogu letjeti. Pomogneš mi?",
    done:"Svih pet bočica! Sad sve vile mogu na ples. Uđi u moju kućicu, ostavila sam ti nešto što svjetluca!",thanks:"Vile opet lete, hvala ti!",remind:"Bočice svjetlucaju ružičasto po šumi."});}
function vsEnv(){/* fireflies and floating sparks, glowing mushroom halos, the whirl of petals, waterfall mist */
  const ff=new THREE.SpriteMaterial({map:GLOW,color:0xfff09a,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9,fog:false});
  for(let i=0;i<140;i++){const x=24+Math.random()*208,z=24+Math.random()*208;const y=floorY(x,H-1,z)+1+Math.random()*4;if(y>VFG+24)continue;const s=new THREE.Sprite(i%3?ff:ff.clone());if(i%3===0)s.material.color.set(0xd8a0ff);s.scale.set(.32,.32,1);s.position.set(x,y,z);scene.add(s);VLS.ff.push({s,x,y,z,ph:Math.random()*7});}
  for(const r of VLS.rings){const m=new THREE.Mesh(new THREE.RingGeometry(2.2,3.2,40),new THREE.MeshBasicMaterial({color:0xffb0f0,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(r.x,r.y+.06,r.z);scene.add(m);r.m=m;}
  {const pg=new THREE.BoxGeometry(.3,.04,.2);VLS.petals=[];for(let i=0;i<70;i++){const m=new THREE.Mesh(pg,std([0xff9ae0,0xffffff,0xc89aff][i%3],{emissive:LC(0xff6ad8),emissiveIntensity:.25}));scene.add(m);VLS.petals.push({m,a:Math.random()*6.28,h:Math.random(),r:.8+Math.random()*2});}}
  for(const p of VLS.shrooms){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xff7a9a,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.5}));s.scale.set(6,6,1);s.position.set(p[0],p[1]-.5,p[2]);scene.add(s);}}
function vsTick(dt,tt){const P=FP.p;
  for(const f of VLS.ff){f.s.position.set(f.x+Math.sin(tt*.5+f.ph)*1.2,f.y+Math.sin(tt*.9+f.ph*2)*.6,f.z+Math.cos(tt*.45+f.ph)*1.2);f.s.material.opacity=.45+.5*Math.sin(tt*2.6+f.ph*4);}
  if(VLS.petals){const W0=VLS.whirl;for(const p of VLS.petals){p.a+=dt*(1.6+p.r*.2);p.h=(p.h+dt*.06)%1;p.m.position.set(W0.x+Math.cos(p.a)*p.r,W0.y+p.h*(W0.top+6-W0.y),W0.z+Math.sin(p.a)*p.r);p.m.rotation.set(p.a,p.a*2,0);}}
  for(const r of VLS.rings)if(r.m)r.m.material.opacity=.25+.2*Math.sin(tt*2+r.x);
  if(VLS.fall&&Math.random()<dt*10)mgSpawn({t:"puff",x:VLS.fall.x+1+Math.random(),y:VLS.fall.y0+.5,z:VLS.fall.z+(Math.random()-.5)*4,vy:1.2,vx:.8,life:1.4,size:.4,size2:1.1,col:[0xffffff,0xe0e8ff],grav:-.2,op:.5});
  if(!FP.on)return;
  /* bouncy mushrooms */
  if(FP.ground&&!FP.mount){const k=Math.floor(P.x)+","+Math.floor(P.y-.1)+","+Math.floor(P.z);if(VLS.bounce.has(k)){FP.v.y=16;FP.ground=false;FP.dblUsed=0;tone(392,.18,"triangle",.04);tone(784,.22,"sine",.025,.06);
    for(let i=0;i<10;i++)mgSpawn({t:"spark",x:P.x,y:P.y,z:P.z,vx:(Math.random()-.5)*4,vy:Math.random()*3,vz:(Math.random()-.5)*4,life:.6,size:.25,size2:.04,col:[0xff9ae0,0xffffff],add:1});tipOnce("f_boing","Boing! Skočne gljive te bacaju visoko. Skači s gljive na gljivu!",4200);}}
  /* fairy rings */
  VLS.tp=Math.max(0,VLS.tp-dt);for(const r of VLS.rings){const inR=Math.hypot(P.x-r.x,P.z-r.z)<1.6&&Math.abs(P.y-r.y)<1.5&&!PW.fly;if(inR&&VLS.tp<=0){r.t+=dt;if(Math.random()<dt*30)mgSpawn({t:"star",x:P.x+(Math.random()-.5)*2,y:P.y+Math.random()*2,z:P.z+(Math.random()-.5)*2,vy:1.5,life:.8,size:.26,size2:.04,col:[0xff9ae0,0xc89aff,0xffffff],add:1});
      if(r.t===dt)tipOnce("f_krug","Vilinski krug! Ostani u sredini i vile će te prenijeti.",3600);if(r.t>1.2){const o=VLS.rings[r.to];FP.p.set(o.x,o.y+.2,o.z);FP.v.set(0,0,0);FP.safe.copy(FP.p);r.t=0;VLS.tp=2.5;sfx.chime();burst(o.x,o.y+1,o.z,30,[[1,.6,.9],[.8,.6,1],[1,1,1]],2.4,2.4,.9);}}else r.t=0;}
  if(Math.hypot(P.x-VLS.whirl.x,P.z-VLS.whirl.z)<6&&P.y<VLS.whirl.y+3)tipOnce("f_vrtlog","Vrtlog latica u deblu Stabla svih stabala! Stani unutra i nosi te gore do vilinske palače.",5000);
  if(Math.hypot(P.x-VLS.troll.x,P.z-VLS.troll.z)<5)tipOnce("f_trol","Pssst... Trol Brundo spava. Tiho!",3200);}
function vsTalk(){const n=wStars("vila");const need=["jednorog","leptirduga"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.vila&&S.wst.vila[s.k]));
  const L=n>=WSTAR_N?"Vrata vilinske palače su otvorena! Vrtlog latica u Stablu svih stabala odnijet će te gore. Kraljica te čeka!":
    n===0?"Dobro došla u Vilinsku šumu! Ja sam vila Lucija. Ovdje je uvijek sumrak, a gljive svijetle. Deset vilinskih kristala rasulo se po šumi, a bez njih vrata palače u krošnji Stabla svih stabala ostaju zatvorena. Pronađeš ih?":
    "Imaš "+n+" od "+WSTAR_N+" vilinskih kristala. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" U šumi ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_vila=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#2a1a5a");g.addColorStop(1,"#d08ae0");x.fillStyle=g;x.fillRect(0,0,64,64);x.fillStyle="#3a2a4a";x.fillRect(26,22,12,42);
    x.fillStyle="#8a4ad8";x.beginPath();x.arc(32,20,18,0,7);x.fill();x.fillStyle="#d84a6a";P([[6,64],[6,52],[18,46],[20,52],[20,64]],"#e8e0d8");x.fillStyle="#d84a6a";x.fillRect(4,44,18,6);
    x.fillStyle="#fff09a";for(const [a,b] of [[12,30],[50,36],[44,14],[20,12]]){x.beginPath();x.arc(a,b,2,0,7);x.fill();}};
  D.mg_trail_prasina=(x)=>{for(let i=0;i<24;i++){x.fillStyle=["#ff9ae0","#c89aff","#9ae0ff","#fff09a"][i%4];const a=8+(i*37)%50,b=8+(i*23)%50;x.beginPath();x.moveTo(a,b-4);x.lineTo(a+1.5,b-1);x.lineTo(a+4,b);x.lineTo(a+1.5,b+1);x.lineTo(a,b+4);x.lineTo(a-1.5,b+1);x.lineTo(a-4,b);x.lineTo(a-1.5,b-1);x.fill();}};})();

pwWorld("vila",{dist:"dolina",lv:9,n:"Vilinska šuma",d:"Šuma u vječnom sumraku: svjetleće gljive, vilinske kućice u deblima, jednorog, skočne gljive, vilinski krugovi i palača u krošnji Stabla svih stabala.",
  feat:["Vila Lucija","Jednorog Zvjezdan","Leptir Duga","vilinski krugovi","skočne gljive","vrtlog latica"],fr:["micelij","gljiva","ametist"],ca:0xe0a0ff,cb:0x5a2ab8,sea:0,fog:.0042,
  preset:PRESETS.vila,
  gen:vsGen,env:vsEnv,life:vsLife,talk:vsTalk,tick:vsTick,itemMesh:vsGem,itemCol:[0xe0a0ff,0xffffff,0xff9ae0],itemBurst:[[.9,.6,1],[1,1,1],[1,.6,.9]],itemFx:"star",
  item:{one:"Vilinski kristal",hud:"Vilinski kristali",done:"Svi vilinski kristali!",all:"Svih 10 vilinskih kristala! Vrata vilinske palače u krošnji Stabla svih stabala su se otvorila!",first:"Prvi vilinski kristal! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Vilinska šuma! Vilinski kristali: "+wStars("vila")+" / "+WSTAR_N+". Vila Lucija te čeka kod portala.",
  facts:{deblo:"Hrastovi mogu živjeti i tisuću godina. U jednom starom hrastu živi više stotina vrsta kukaca, ptica i gljiva.",
    gljive:"Gljive nisu biljke. Najveći dio gljive živi pod zemljom kao mreža tankih niti, a ono što vidimo samo je njezin plod.",
    krug:"Vilinski krug je prsten gljiva koji izraste na livadi. Nastaje jer gljiva pod zemljom raste na sve strane jednako.",
    slap:"Iza nekih slapova kriju se špilje. Voda tisućama godina dubi mekšu stijenu iza tvrđe, pa nastane prostor.",
    jezero:"Ametist je ljubičasti kristal. Ljudi su nekad mislili da donosi mirne i lijepe snove.",
    trol:"Trolovi su bića iz sjevernih bajki. U pričama se boje sunca, pa danju spavaju ispod mostova i u špiljama.",
    pjesma:"Neke gljive na svijetu svijetle u mraku zelenkastim svjetlom. To se zove bioluminiscencija.",
    prasina:"Krila leptira prekrivena su sićušnim ljuskicama, kao prašinom. Zbog njih krila imaju tako lijepe boje.",
    staza:"Krijesnice i neke gljive svijetle bez topline. To je hladno svjetlo, pa se ne mogu opeći.",
    korijenje:"Korijenje stabla zna biti šire od same krošnje. Preko korijenja stabla u šumi čak razmjenjuju hranu."},
  chat:{"Trol Brundo":["Hrrrr... zzzz... hrrrr...","Mmm... još pet minuta, mama... zzz"],"Sova Mudrica":["Huu! U sumraku vidim najbolje.","Vilinski krug kraj potoka vodi na visoku stijenu. Stani u sredinu!"],
    vila2:["Hihi, uhvati me ako možeš!","Kad skupimo prašinu, idemo na ples!","Volim svjetleće gljive, one su naše svjetiljke."],"Jednorožica Bijela":["Zvjezdan je moj brat. On je malo hvalisav, hihi."],
    zec:["Skočne gljive su najbolja igra u šumi!"],jelen:["Šuma je mirna u sumraku. Slušaj kako pjevaju gljive."]},
  finale:{chest:"f_blago",isl:"kruna",at:{x:128,z:95},rewards:["skin:vila","trail:prasina"],locked:"Kristalna vrata vilinske palače su zatvorena. Skupi svih 10 vilinskih kristala!",
    kicker:"Vilinska palača je otvorena!",title:"Blago vilinske kraljice",sub:"Vilinska lisica i Vilinska prašina sad su tvoji. Vila Lucija kaže da će vile o tebi pjevati pjesme!"}});
