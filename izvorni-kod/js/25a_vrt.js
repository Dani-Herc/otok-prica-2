/* =================== OP2 v8: Divovski vrt (portal world of Cvjetna dolina) =================== */
/* Rida is as small as a ladybird. Blades of grass tower like trees, a sunflower is a skyscraper, a dewdrop is as big
   as a house. A beehive, an old snail shell, an ant hill with tunnels, a puddle that is a lake, a watering can half
   full of water, bluebells that ring, a vegetable bed with something buried. Ten sun drops open the giant rosebud. */
MSKIN.bubamara={n:"Lisica bubamara",d:"Crvena kao bubamara, s crnim točkicama. Najmanja i najhrabrija u vrtu!",p:0,rar:"l",O:0xe0302a,W:0x1a1a1a,B:0x111111,D:0xff6a4a,glowO:.04,fx:"lisce",wr:"Divovski vrt"};
MTRAIL.latice={n:"Latice",d:"Iza Ride lete ružičaste i bijele latice cvijeća.",p:0,rar:"l",wr:"Divovski vrt"};
TR.latice=p=>mgSpawn({t:"petal",x:p.x+(Math.random()-.5)*.4,y:p.y+.6+Math.random()*.4,z:p.z+(Math.random()-.5)*.4,vy:.3,life:1.6,size:.26,size2:.18,col:[0xff9ac8,0xffffff,0xffd0e8,0xffe070],grav:.6,op:1});TRATE.latice=9;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","bubamara",MSKIN.bubamara);ins("trail","latice",MTRAIL.latice);}
PRESETS.vrt={top:0x4a9af0,hz:0xe0f4ff,sun:0xfff2d0,si:2.4,hemi:.85,el:.7,az:1.1,fog:0xd8eef8,glow:.5,stars:0,sh:0x5ab8c8,dp:0x2a6a9a,exp:.98,night:0};

/* ---------- creatures (all blocky) ---------- */
MODELS.bubamara=function(){const R=0xe0302a,K=0x16161a,W=0xffffff,hd={name:"head",px:0,py:.3,pz:.36};
  const sp=[[.62,.34,.66,0,.3,0,R],[.04,.36,.66,0,.31,0,K],[.56,.12,.6,0,.08,0,K],[.34,.24,.2,0,.28,.4,K,hd],[.08,.08,.02,-.1,.32,.505,W,hd],[.08,.08,.02,.1,.32,.505,W,hd],[.04,.04,.02,-.1,.32,.515,K,hd],[.04,.04,.02,.1,.32,.515,K,hd],
    [.03,.22,.03,-.08,.48,.44,K,hd],[.03,.22,.03,.08,.48,.44,K,hd]];
  for(const [x,z] of [[-.17,.14],[.17,.14],[-.2,-.12],[.2,-.12],[-.1,-.26],[.1,-.26]])sp.push([.13,.04,.13,x,.47,z,K]);
  for(const [x,z] of [[-.3,.16],[.3,.16],[-.32,0],[.32,0],[-.3,-.16],[.3,-.16]])sp.push([.08,.04,.04,x,.06,z,K]);return mk(sp);};
MODELS.skakavac=function(){const G=0x6ac83a,D=0x3a8a2a,K=0x111111,Y=0xd8f07a,hd={name:"head",px:0,py:.42,pz:.42};
  return mk([[.26,.26,.8,0,.32,0,G],[.2,.08,.6,0,.46,-.02,D],[.24,.28,.24,0,.46,.46,G,hd],[.07,.09,.02,-.09,.52,.585,K,hd],[.07,.09,.02,.09,.52,.585,K,hd],[.14,.06,.04,0,.36,.58,Y,hd],
    [.03,.4,.03,-.06,.72,.5,D,hd],[.03,.4,.03,.06,.72,.5,D,hd],[.08,.46,.1,-.18,.5,-.22,D],[.08,.46,.1,.18,.5,-.22,D],[.06,.36,.08,-.2,.2,-.36,G],[.06,.36,.08,.2,.2,-.36,G],
    [.05,.2,.05,-.14,.1,.2,D],[.05,.2,.05,.14,.1,.2,D],[.04,.04,.5,-.13,.44,-.12,0xa8e870],[.04,.04,.5,.13,.44,-.12,0xa8e870]]);};
MODELS.mrav=function(){const B=0x3a2218,K=0x111111,hd={name:"head",px:0,py:.22,pz:.36};const sp=[[.2,.18,.22,0,.2,0,B],[.28,.24,.36,0,.24,-.32,B],[.22,.2,.2,0,.24,.34,B,hd],[.05,.05,.02,-.07,.28,.445,K,hd],[.05,.05,.02,.07,.28,.445,K,hd],
    [.02,.2,.02,-.06,.4,.42,K,hd],[.02,.2,.02,.06,.4,.42,K,hd]];for(const z of [-.08,0,.08])for(const s of [-1,1])sp.push([.2,.03,.03,s*.17,.1,z,K]);return mk(sp);};
MODELS.puz=function(){const S=0xb8c8a0,D=0x8aa078,O=0xc87a3a,O2=0x8a4a2a,K=0x111111,hd={name:"head",px:0,py:.22,pz:.6};
  const sp=[[.36,.2,1.3,0,.1,0,S],[.3,.3,.3,0,.26,.56,S,hd],[.04,.36,.04,-.08,.56,.62,D,hd],[.04,.36,.04,.08,.56,.62,D,hd],[.08,.08,.08,-.08,.76,.62,K,hd],[.08,.08,.08,.08,.76,.62,K,hd]];
  for(let i=0;i<4;i++){const s=.9-i*.18;sp.push([.5-i*.02,s,s,0,.2+s/2+i*.04,-.1-i*.02,i%2?O2:O]);}return mk(sp);};
MODELS.gusjenica=function(){const G=0x8ad83a,D=0x5aa82a,K=0x111111,Y=0xffe060,hd={name:"head",px:0,py:.2,pz:.5};const sp=[[.3,.3,.26,0,.18,.5,G,hd],[.07,.07,.02,-.08,.22,.635,K,hd],[.07,.07,.02,.08,.22,.635,K,hd],[.03,.14,.03,-.08,.38,.52,D,hd],[.03,.14,.03,.08,.38,.52,D,hd]];
  for(let i=0;i<6;i++){sp.push([.26,.24,.18,0,.14,.32-i*.17,i%2?D:G]);sp.push([.05,.05,.05,0,.28,.32-i*.17,Y]);}return mk(sp);};
MODELS.pcelica=function(){const g=MODELS.pcela();g.scale.setScalar(1.6);const w=new THREE.Group();w.add(g);w.userData.parts=g.userData.parts;return w;};
MODELS.bubamara2=()=>MODELS.bubamara();MODELS.mrav2=()=>MODELS.mrav();MODELS.pcela2=()=>MODELS.pcela();
pwPets("vrt","dolina",[
  {k:"pcelica",fav:"bobice",n:"Pčelica Medica",d:"Vrijedna pčelica iz Divovskog vrta. Zuji od cvijeta do cvijeta i nikad se ne umori.",gd:"S cvijeća donosi med i pelud.",gift:()=>[["bobice",3],["coins",15]],spd:1.4,
   spec:{n:"Pčelin let",d:"Medica te nosi od cvijeta do cvijeta! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:9.4,jump:9,seat:.42},tip:"Medica leti! Skok je gore, Roni je dolje."},
  {k:"skakavac",fav:"bobice",n:"Skakavac Skokić",d:"Zeleni skakavac s jakim stražnjim nogama. Skače dvadeset puta dalje od svoje duljine!",gd:"Iz trave donosi sjemenke i zlatnike.",gift:()=>[["bobice",3],["coins",16]],spd:1.8,
   spec:{n:"Skakavčev skok",d:"Skokić skače nevjerojatno visoko, i to dvaput zaredom!",ride:1,ic:"star"},ride:{land:1,speed:9,jump:15,dbl:1,seat:.62},tip:"Skokić te nosi! Skoči, pa u zraku skoči još jednom."}]);
PWIT.pelud={n:"Pelud",mk:g=>{const m=std(0xffd23a,{emissive:LC(0xa07a10),emissiveIntensity:.35});const c=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.3),m);g.add(c);for(let i=0;i<6;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1),m);s.position.set(Math.sin(i)*.18,Math.cos(i*1.7)*.18,Math.cos(i)*.18);g.add(s);}},glow:0xffe080};
PWIT.rosa={n:"Kap rose",mk:g=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.22,14,10),new THREE.MeshStandardMaterial({color:LC(0xd8f4ff),roughness:.02,metalness:.1,transparent:true,opacity:.6,emissive:LC(0x4a8ab8),emissiveIntensity:.3}));m.scale.y=.85;g.add(m);},glow:0xbfe8ff};
PWIT.sjemenka={n:"Sjemenka",mk:g=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.18,.12,.3),std(0x8a5a2a));g.add(m);const s=new THREE.Mesh(new THREE.BoxGeometry(.12,.04,.2),std(0xc89a5a));s.position.y=.07;g.add(s);},glow:0xffd0a0};
function vrDrop(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0xffe26a),emissive:LC(0xffb020),emissiveIntensity:.8,roughness:.1,metalness:.2});
  const b=new THREE.Mesh(new THREE.SphereGeometry(.24,16,12),m);g.add(b);const t=new THREE.Mesh(new THREE.ConeGeometry(.17,.3,14),m);t.position.y=.26;g.add(t);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffe080,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.8}));sp.scale.set(2.2,2.2,1);g.add(sp);return g;}

/* ---------- the garden ---------- */
const VG=SL+2;/* lawn walking level */
const VR={drops:[],bees:[],flies:[],ants:[],pollen:[],dew:[],seeds:[],dewM:[]};
function vrH(x,z){let h=VG+Math.round((fbm(x*.03+4,z*.03+8)-.5)*2.4);
  {const d=Math.hypot(x-190,z-182);if(d<14)h=Math.max(h,VG+Math.round(10*Math.pow(1-d/14,.8)));}
  {const d=Math.hypot(x-66,z-176)*(1+.15*(vnoise(x*.2,z*.2,2)-.5));if(d<17)h=Math.min(h,VG-3+Math.round(Math.max(0,d-14)));}
  return h;}
function vrGen(){const Y=(x,z)=>hmap[x+z*W];const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=vrH(x,z);hmap[x+z*W]=h;const pud=Math.hypot(x-66,z-176)<17&&h<VG;for(let y=0;y<h;y++){let t=T.zemlja;if(y===h-1)t=pud?T.blato:(hash2(x,z,3)<.06?T.mahovina:T.trava);vox[I(x,y,z)]=t;}
    if(pud)for(let y=h;y<VG-1;y++)vox[I(x,y,z)]=T.voda;}
  const SEEDS=[[150,124],[112,116],[176,206],[210,170],[140,92]],DEWS=[[92,104],[176,160],[48,200]];for(const [x,z] of SEEDS.concat(DEWS))busy(x,z,1);
  /* ----- the garden fence all round ----- */
  for(let i=0;i<W;i++)for(const [x,z] of [[i,2],[i,W-3],[2,i],[W-3,i]]){const board=Math.floor(i/5)%2;for(let y=Y(x,z);y<58-(i%5===2?0:2);y++)vox[I(x,y,z)]=board?T.daske:T.bdaske;}
  for(let i=0;i<W;i++)for(const [x,z] of [[i,3],[i,W-4],[3,i],[W-4,i]])for(const y of [22,23,44,45])vox[I(x,y,z)]=T.tdaske;
  /* ----- the giant sunflower in the middle ----- */
  {const cx=128,cz=128,top=46;for(let y=Y(cx,cz);y<top;y++)for(const [a,b] of [[0,0],[1,0],[0,1],[1,1]])wput(cx+a,y,cz+b,T.vuna_zl,1);
    for(let dz=-8;dz<=9;dz++)for(let dx=-8;dx<=9;dx++){const d=Math.hypot(dx-.5,dz-.5);if(d>8.6)continue;const petal=d>4.4;const ang=Math.atan2(dz-.5,dx-.5),wob=Math.cos(ang*12)*.8;if(petal&&d>7.6+wob)continue;
      wput(cx+dx,top,cz+dz,petal?T.vuna_z:((dx+dz)&1?T.vuna_s:T.sijeno),1);if(!petal)wput(cx+dx,top+1,cz+dz,(hash2(dx,dz,4)<.5)?T.vuna_s:T.sijeno,1);}
    for(const [y,a,b,len] of [[20,1,0,6],[28,-1,0,5],[35,0,1,5],[24,0,-1,6]])for(let k=1;k<=len;k++)for(let w=-1;w<=1;w++){const x=cx+(a>0?1:0)+a*k+(b?w:0),z=cz+(b>0?1:0)+b*k+(a?w:0);wput(x,y+Math.floor(k/3),z,T.vuna_l,1);}
    wStar("suncokret",cx+1,top+2.9,cz+1,"Na vrhu divovskog suncokreta! Žličica-katapult kraj trga baca te gore.");busy(cx,cz,9);POI.push({k:"v_suncokret",n:"Divovski suncokret",x:cx,z:cz,r:10});
    VR.sun={x:cx+1,y:top,z:cz+1};}
  /* the spoon catapult */
  {const x=128,z=150,y=Y(x,z);for(let k=0;k<7;k++)wput(x,y,z+1+k,T.kvarc,1);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)wput(x+a,y,z+b,T.kvarc,1);wput(x,y,z,T.zlato,1);
    pwLaunch({k:"suncokret",x:x+.5,y:y+1,z:z+.5,to:[129,0,129],h:22,dur:3,col:[0xffe060,0xffffff],msg:"Žličica je zamahnula i HOP! Letiš na suncokret!"});VR.spoon={x:x+.5,y,z:z+.5};busy(x,z+3,4);}
  /* ----- the beehive ----- */
  {const cx=70,cz=78,g=Y(cx,cz);for(const [a,b] of [[-6,-6],[6,-6],[-6,6],[6,6]])for(let y=g;y<g+3;y++)wput(cx+a,y,cz+b,T.tdaske,1);
    for(let lvl=0;lvl<3;lvl++){const y0=g+3+lvl*6;for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++)for(let y=y0;y<y0+6;y++){const wall=Math.abs(dx)===7||Math.abs(dz)===7;const fl=y===y0;
        if(wall){const door=lvl===0&&dz===7&&Math.abs(dx)<=1&&y>y0&&y<y0+3;if(door)continue;wput(cx+dx,y,cz+dz,y===y0+5?T.vuna_z:(lvl===1?T.bdaske:T.sdaske),1);}else if(fl&&(lvl===0||!(Math.abs(dx)<=1&&Math.abs(dz-4)<=1)))wput(cx+dx,y,cz+dz,T.daske,1);
        else if(!fl&&((dx+7)%4===0)&&Math.abs(dz)<3&&y<y0+5)wput(cx+dx,y,cz+dz,(y+dz)&1?T.jantar:T.sijeno,1);}}
    for(let dz=-8;dz<=8;dz++)for(let dx=-8;dx<=8;dx++)wput(cx+dx,g+21,cz+dz,T.tdaske,1);for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++)wput(cx+dx,g+22,cz+dz,Math.abs(dx)<6&&Math.abs(dz)<6?T.tdaske:T.daske,1);
    for(let k=0;k<6;k++)wput(cx-4+k,g+4+k,cz+4,T.daske,1);for(let k=0;k<6;k++)wput(cx+4-k,g+10+k,cz+4,T.daske,1);
    wput(cx-1,g+2,cz+8,T.daske,1);wput(cx,g+2,cz+8,T.daske,1);wput(cx+1,g+2,cz+8,T.daske,1);wput(cx,g+1,cz+9,T.daske,1);
    wStar("kosnica",cx+.5,g+16.9,cz-4.5,"U samom vrhu košnice, među saćem. Uđi kroz otvor na dnu i penji se!");addChest("v_kosnica",cx+4,g+4,cz-5,"Škrinja s medom");
    VR.hive={x:cx+.5,y:g+12,z:cz+.5};busy(cx,cz,9);POI.push({k:"v_kosnica",n:"Košnica",x:cx,z:cz,r:10});}
  /* ----- the old snail shell ----- */
  {const cx=190,cz=78,g=Y(cx,cz);for(let dz=-9;dz<=9;dz++)for(let dx=-9;dx<=9;dx++)for(let y=g;y<g+14;y++){const ex=dx/9,ey=(y-g)/13,ez=dz/7.5,e=ex*ex+ey*ey+ez*ez;if(e>1)continue;const inner=e<.62;
      if(inner){vox[I(cx+dx,y,cz+dz)]=0;continue;}const a=Math.atan2(dz,dx)+(y-g)*.18+Math.hypot(dx,dz)*.25;wput(cx+dx,y,cz+dz,Math.sin(a*2)>0?T.vuna_n:(Math.sin(a*2)>-.6?T.upjescenjak:T.vuna_s),1);}
    for(let dz=4;dz<=8;dz++)for(let dx=-2;dx<=2;dx++)for(let y=g;y<g+4;y++)vox[I(cx+dx,y,cz+dz)]=0;for(let dz=-6;dz<=6;dz++)for(let dx=-7;dx<=7;dx++)if(!vox[I(cx+dx,g,cz+dz)]&&vox[I(cx+dx,g-1,cz+dz)])vox[I(cx+dx,g-1,cz+dz)]=T.pijesak;
    wStar("kucica",cx+.5,g+1.1,cz-2.5,"U staroj puževoj kućici na istoku vrta. Ulaz je s južne strane.");addChest("v_kucica",cx-3,g,cz-2,"Puževa škrinja");busy(cx,cz,10);POI.push({k:"v_kucica",n:"Puževa kućica",x:cx,z:cz,r:11});}
  /* ----- the ant hill with tunnels and the storage chamber ----- */
  {const cx=190,cz=182,g0=VG;const ent=[184,194];for(let t=0;t<=1;t+=.01){const x=Math.round(ent[0]+(cx-2-ent[0])*t),z=Math.round(ent[1]+(cz-ent[1])*t),y=Math.round(g0-t*5);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<3;h++)vox[I(x+a,y+h,z+b)]=0;}
    for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)for(let y=g0-6;y<=g0-2;y++)if(Math.hypot(dx,dz)<5.3)vox[I(cx+dx,y,cz+dz)]=0;for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)if(Math.hypot(dx,dz)<5.3)vox[I(cx+dx,g0-7,cz+dz)]=T.staza;
    for(const [a,b] of [[-4,0],[4,0],[0,-4],[0,4]])wput(cx+a,g0-3,cz+b,T.svjetlo,1);
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("mravi",cx+3+a,g0-6+h,cz-2+b,h===2?T.zemlja:T.zcigla);}
    wStar("mravi",cx+3.5,g0-5.1,cz-1.5,"U mravljoj smočnici duboko u mravinjaku. Mrav Mravko je otvara kad mu doneseš sjemenke.");
    for(let i=0;i<14;i++){const a=i*.9,r=3+i*.5,x=Math.round(cx+Math.cos(a)*r),z=Math.round(cz+Math.sin(a)*r);if(get(x,Y(x,z)-1,z))vox[I(x,Y(x,z)-1,z)]=T.staza;}
    VR.anthill={x:cx,z:cz};busy(cx,cz,14);POI.push({k:"v_mravi",n:"Mravinjak",x:cx,z:cz,r:14});}
  /* ----- the puddle lake with lily pads ----- */
  {const cx=66,cz=176;for(const [a,b] of [[0,0],[-6,4],[5,-5],[7,6],[-8,-3]]){const x=cx+a,z=cz+b;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)if(Math.abs(dx)+Math.abs(dz)<2||!a){vox[I(x+dx,VG-2,z+dz)]=T.lopoc;prot[I(x+dx,VG-2,z+dz)]=1;}}
    wStar("lokva",cx+.5,VG-.2,cz+.5,"Na lopoču usred velike lokve na zapadu. Skači s lista na list!");POI.push({k:"v_lokva",n:"Velika lokva",x:cx,z:cz,r:16});busy(cx,cz,16);}
  /* ----- the watering can, half full of water ----- */
  {const cx=128,cz=66,g=Y(cx,cz),r=6.5;for(let dz=-7;dz<=7;dz++)for(let dx=-7;dx<=7;dx++){const d=Math.hypot(dx,dz);if(d>r+.4)continue;const x=cx+dx,z=cz+dz;
      for(let y=g;y<g+13;y++){if(d>r-.6)wput(x,y,z,y===g+12||y===g+6?T.kvarc:T.vuna_ts,1);else if(y===g)wput(x,y,z,T.vuna_ts,1);else if(y<g+7)vox[I(x,y,z)]=T.voda;}}
    for(let k=0;k<12;k++){const x=cx+7+k,y=g+2+Math.round(k*.75);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)if(Math.abs(a)+Math.abs(b)>0)wput(x,y+a,cz+b,T.vuna_ts,1);}
    for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)wput(cx+19,g+11+(a===0&&b===0?0:0),cz+b,a===0?T.kvarc:T.vuna_ts,1);
    for(let t=0;t<=1;t+=.04){const x=Math.round(cx-6+t*12),y=Math.round(g+12+Math.sin(t*Math.PI)*7);wput(x,y,cz,T.vuna_ts,1);}
    for(let k=0;k<6;k++){const an=k*.55,x=Math.round(cx+Math.cos(an)*5.4),z=Math.round(cz+Math.sin(an)*5.4);wput(x,g+7+k,z,T.daske,1);}
    WG.wind.push({x:cx-9.5,z:cz+.5,r:1.4,y0:g,y1:g+17,k:"prskalica"});VR.spr={x:cx-9.5,y:g,z:cz+.5};
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)wput(cx-10+a,g-1,cz+b,T.kvarc,1);
    wStar("kanta",cx+.5,g+1.6,cz+.5,"Na dnu kante za zalijevanje, pod vodom. Prskalica te diže do ruba, onda skoči unutra i zaroni!");addChest("v_kanta",cx-13,g,cz+3,"Škrinja kraj prskalice");
    busy(cx+6,cz,16);POI.push({k:"v_kanta",n:"Kanta za zalijevanje",x:cx,z:cz,r:9});}
  /* ----- bluebells that ring ----- */
  {const cx=88,cz=126;const L=[["vuna_t",523],["vuna_lj",659],["vuna_p",784],["vuna_b",988]],PP=[[-6,0],[-2,-4],[3,-3],[6,2]],ORD=[1,3,0,2];
    const pads=PP.map(([a,b],i)=>{const x=cx+a,z=cz+b,y=Y(x,z)-1;vox[I(x,y,z)]=T[L[i][0]];prot[I(x,y,z)]=1;
      for(let h=1;h<=13;h++)wput(x+(h>10?1:0),y+h,z+1,T.vuna_zl,1);for(let a2=-1;a2<=1;a2++)for(let b2=-1;b2<=1;b2++)for(let h=0;h<3;h++)if(h<2||Math.abs(a2)+Math.abs(b2)<2)wput(x+1+a2,y+11-h,z+1+b2,T[L[i][0]],1);
      return {x,y,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    {const x=cx,z=cz+6,y=Y(x,z);wput(x,y,z,T.drvo,1);wput(x,y+1,z,T.drvo,1);for(let a=-2;a<=2;a++)for(let h=2;h<=5;h++)wput(x+a,y+h,z,T.tdaske,1);ORD.forEach((j,i)=>wput(x,y+5-i,z+1,T[L[j][0]],1));}
    {const x=cx,z=cz-1,y=Y(x,z);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("zvoncici",x+a,y+h,z+b,T.cigla);}wStar("zvoncici",x+.5,y+.9,z+.5,"Pod prevrnutom teglicom među zvončićima. Pozvoni zvončićima redom kao na pločici!");}
    pwSeq("zvoncici",{pads,order:ORD,win:"Zvončići su zasvirali pjesmu! Teglica se podigla.",wrong:"Ups, kriva nota. Pogledaj pločicu s bojama, odozgo prema dolje, i kreni ispočetka!"});
    busy(cx,cz,9);POI.push({k:"v_zvoncici",n:"Zvončići",x:cx,z:cz,r:9});}
  /* ----- the vegetable bed with something buried ----- */
  {const cx=160,cz=150;for(let dz=-8;dz<=8;dz++)for(let dx=-6;dx<=6;dx++){const x=cx+dx,z=cz+dz,y=Y(x,z)-1;vox[I(x,y,z)]=(dz%3===0)?T.staza:T.oranica;
      if(dz%3!==0&&dx%3===0){for(let h=1;h<=4;h++)wput(x,y+h,z,T.vuna_l,1);wput(x-1,y+4,z,T.lisce,1);wput(x+1,y+5,z,T.lisce,1);}}
    {const x=cx+2,z=cz+3,y=Y(x,z)-1;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("gredica",x+a,y,z+b,(a===b||a===-b)?T.crvena:T.oranica);pwCell("gredica",x+a,y-1,z+b,T.zemlja);}
      for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=1;h<=5;h++)if(get(x+a,y+h,z+b))vox[I(x+a,y+h,z+b)]=0;
      wStar("gredica",x+.5,y-.4,z+.5,"Zakopano pod crvenim X-om u povrtnjaku. Kopaj!");pwDig("gredica",x,y,z,"Kopaš, kopaš... i eno je! Sunčana kap među korijenjem!");}
    for(let i=0;i<6;i++){const x=cx-10+(i%2)*2,z=cz-6+i*3,y=Y(x,z);for(let a=0;a<2;a++)for(let b=0;b<2;b++)for(let h=0;h<2;h++)wput(x+a,y+h,z+b,T.vuna_c,1);wput(x,y+2,z,T.lisce,1);wput(x+1,y+2,z+1,T.lisce,1);}
    busy(cx,cz,10);POI.push({k:"v_gredica",n:"Povrtnjak",x:cx,z:cz,r:10});}
  /* ----- the dewdrop on a giant leaf ----- */
  {const x0=96,z0=162;for(let k=0;k<=18;k++){const y=VG+Math.round(k*.6),w=k<3?1:k>15?2:3;for(let b=-w;b<=w;b++)wput(x0+k,y,z0+b,b===0?T.vuna_zl:T.lisce,1);}
    const tx=x0+18,ty=VG+11,tz=z0;VR.dewTop={x:tx+.5,y:ty+1.8,z:tz+.5};wStar("rosa",tx+.5,ty+1.8,tz+.5,"U divovskoj kapi rose na vrhu velikog lista. Penji se po listu!");POI.push({k:"v_rosa",n:"Kap rose",x:tx,z:tz,r:6});busy(x0+9,z0,10);}
  /* ----- the ring race between the grass blades ----- */
  {const pts=[[128,186],[112,178],[100,190],[86,200],[98,214],[120,220],[146,214],[160,200],[150,186],[138,176]].map(([x,z])=>[x+.5,Y(x,z)+1.4,z+.5]);
    for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("utrka",140+a,Y(140,206)+h,206+b,h===2?T.vuna_r:T.bijela);}
    wStar("utrka",140.5,Y(140,206)+.9,206.5,"U kućici od latica kraj portala. Otvara se kad pobijediš u utrci bubamara!");
    for(const p of pts)busy(Math.floor(p[0]),Math.floor(p[2]),2);pwRings("utrka",{start:[134.5,Y(134,190),190.5],pts,time:55,col:0xff6a8a,name:"Utrka bubamara",win:"Pobjeda! Kućica od latica kraj portala se otvorila."});}
  /* ----- the rosebud (finale) ----- */
  {const cx=158,cz=104,g=Y(cx,cz);for(let y=g;y<g+3;y++)wput(cx,y,cz,T.vuna_zl,1);for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)for(let y=g;y<g+13;y++){const ey=(y-g-6)/6.5,e=(dx*dx+dz*dz)/25+ey*ey*(ey<0?1:.7);if(e>1)continue;
      if(e>.55){let t=y<g+4?T.vuna_zl:(Math.sin(Math.atan2(dz,dx)*3+y*.6)>0?T.vuna_c:T.crvena);wput(cx+dx,y,cz+dz,t,1);}else vox[I(cx+dx,y,cz+dz)]=0;}
    for(let y=g;y<g+3;y++)for(let a=-1;a<=1;a++){for(let dz=3;dz<=5;dz++)vox[I(cx+a,y,cz+dz)]=0;wput(cx+a,y,cz+3,T.kristal,1);WG.gate.push([cx+a,y,cz+3]);}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++)if(get(cx+dx,g-1,cz+dz)&&!get(cx+dx,g,cz+dz)&&Math.hypot(dx,dz)<3.6)vox[I(cx+dx,g-1,cz+dz)]=T.vuna_r;
    WG.isl.ruza={x:cx,z:cz,y:g,r:6};addChest("v_blago",cx,g,cz-1,"Blago ružinog pupoljka");busy(cx,cz,7);POI.push({k:"v_ruza",n:"Ružin pupoljak",x:cx,z:cz,r:8});}
  /* ----- giant grass blades, clover, pebbles, flowers ----- */
  const blade=(x,z)=>{const y0=Y(x,z),h=10+Math.floor(hash2(x,z,41)*16),lx=hash2(x,z,42)<.5?1:-1,c=hash2(x,z,43)<.5?T.vuna_zl:T.vuna_l;for(let i=0;i<h;i++){const X=x+(i>h*.6?lx:0)+(i>h*.85?lx:0);wput(X,y0+i,z,c);}};
  for(let z=8;z<W-8;z+=3)for(let x=8;x<W-8;x+=3){const xx=x+Math.floor(hash2(x,z,44)*3),zz=z+Math.floor(hash2(x,z,45)*3);if(mask[xx+zz*W])continue;const n=fbm(xx*.04+9,zz*.04+1);
    if(n>.6&&hash2(xx,zz,46)<.42)blade(xx,zz);else if(n<.32&&hash2(xx,zz,47)<.08){const y=Y(xx,zz);for(let a=0;a<3;a++)for(let b=0;b<3;b++)for(let h=0;h<2;h++)if(!(h===1&&(a!==1&&b!==1)))wput(xx+a,y+h,zz+b,T.kamen,1);}}
  for(const [x,z,c] of [[110,100,T.vuna_r],[150,180,T.vuna_lj],[100,140,T.vuna_b],[176,120,T.vuna_n],[60,120,T.vuna_r],[200,140,T.vuna_lj],[110,232,T.vuna_b],[40,60,T.vuna_n],[220,60,T.vuna_r],[36,226,T.vuna_lj]]){if(mask[x+z*W])continue;const y=Y(x,z),h=14+Math.floor(hash2(x,z,5)*8);
    const RG=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];for(let i=0;i<h;i++){wput(x,y+i,z,T.vuna_zl,1);if(i<h-1){const [a,b]=RG[i%8];wput(x+a,y+i,z+b,T.vuna_l,1);}}for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++){const d=Math.abs(a)+Math.abs(b);if(d>4)continue;wput(x+a,y+h,z+b,d<2?T.vuna_z:c,1);}busy(x,z,4);}
  for(const [x,z] of [[44,140],[210,110],[100,60],[226,200]])for(let a=-3;a<=3;a++)for(let b=-3;b<=3;b++)if(Math.abs(a)+Math.abs(b)<=4&&(Math.abs(a)<2||Math.abs(b)<2))wput(x+a,Y(x,z)+((a+b)&1),z+b,T.vuna_zl,1);
  /* quest pickups */
  VR.pollen=[[110,100],[150,180],[60,120],[200,140]].map(([x,z])=>{let y=H-1;while(y>0&&!get(x,y,z))y--;return [x+.5,y+1.3,z+.5];});
  VR.dew=DEWS.map(([x,z])=>[x+.5,Y(x,z)+1.3,z+.5]);
  VR.seeds=SEEDS.map(([x,z])=>[x+.5,Y(x,z)+1.3,z+.5]);
  /* the portal */
  {const x=128,z=200,g=Y(x,z);for(let dz=-5;dz<=5;dz++)for(let dx=-4;dx<=4;dx++){const X=x+dx,Z=z+dz;for(let y=g;y<g+30;y++)if(vox[I(X,y,Z)]&&!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;}
    wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:Y(x,z-9),z:z-8.5,cam:0};busy(x,z-4,5);}
  Object.assign(LOOT,{v_kosnica:{coins:55,mats:{grumen:1},blocks:{jantar:6,sijeno:10},msg:"Pčele su ti ostavile saće i malo jantara."},
    v_kucica:{coins:50,mats:{biser:1},blocks:{vuna_n:10,upjescenjak:10},msg:"Puž Polagani kaže: moja stara kućica sad je tvoja!"},
    v_kanta:{coins:55,mats:{zeljezo:2},blocks:{vuna_ts:12,voda:2},msg:"Škrinja iz kante, malo mokra, ali puna blaga."},
    v_blago:{coins:320,mats:{dijamant:2,smaragd:2,grumen:3},blocks:{vuna_r:12,vuna_c:12,tresnja:8,lopoc:6},msg:"Blago ružinog pupoljka! Najljepše u cijelom vrtu."}});}

/* ---------- life ---------- */
function vrLife(){S.wq=S.wq||{};
  PW.guide=pwPut("bubamara","Bubamara Točkica",131.5,189.5,{frozen:true,ry:Math.PI*.85,sc:1.6});
  const mravko=pwPut("mrav","Mrav Mravko",184.5,197.5,{frozen:true,ry:Math.PI,sc:1.6});pwPut("puz","Puž Polagani",182.5,90.5,{speed:.15,sc:2.2});
  pwPut("gusjenica","Gusjenica Gricko",158.5,160.5,{speed:.25,sc:1.6});pwPut("leptir","Leptirica Šarenka",100.5,140.5,{speed:.9});pwPut("leptir","Leptirić Plavko",150.5,176.5,{speed:.9});
  [[120,170],[140,160],[110,150]].forEach(([x,z],i)=>pwPut("bubamara2",["Pjegica","Crvenka","Točka"][i],x+.5,z+.5,{speed:.6}));
  for(let i=0;i<6;i++){const e=pwPut("mrav2",["Mrvko","Kopko","Nosko","Vrijedna","Trčko","Mala"][i],184.5+(i%3)*3,170.5+Math.floor(i/3)*24,{speed:.9});VR.ants.push(e);}
  const me=pwPut("pcelica",PETS.pcelica.n,74.5,96.5,{speed:.6,y:VG+3});const sk=pwPut("skakavac",PETS.skakavac.n,112.5,170.5,{speed:.8});
  pwQuest("pcelica",{pet:1,en:me,auto:1,need:4,item:"pelud",spots:VR.pollen,got:"Pelud",
    ask:"Zzz-zdravo! Ja sam Medica. Trebam pelud za med, a najbolja je na vrhu divovskih cvjetova. Doneseš mi pelud s četiri cvijeta? Penji se po listićima oko stabljike!",
    done:"Zzzz, kakva pelud! Napravit ću najslađi med. Hoćeš letjeti sa mnom od cvijeta do cvijeta?",fact:"Pčele plešu da bi drugim pčelama pokazale gdje je cvijeće. Taj ples zove se pčelinji ples."});
  pwQuest("skakavac",{pet:1,en:sk,auto:1,need:3,item:"rosa",spots:VR.dew,got:"Kap rose",
    ask:"Hop-hop! Ja sam Skokić. Jutros sam toliko skakao da sam ožednio. Doneseš mi tri kapi rose? Leže na lišću po vrtu.",
    done:"Hop! Sad imam snage za najveći skok na svijetu! Skoči mi na leđa!",fact:"Skakavci čuju nogama! Uši su im na trbuhu ili na prednjim nogama."});
  pwQuest("mravi",{en:mravko,need:5,item:"sjemenka",spots:VR.seeds,got:"Sjemenka",cage:"mravi",
    ask:"Stoj! Tko ide? Ah, prijateljica. Ja sam Mravko. Zima dolazi, a smočnica nam je prazna. Doneseš nam pet sjemenki? Raznio ih je vjetar po cijelom vrtu.",
    done:"Pet sjemenki! Smočnica je puna, cijeli mravinjak ti zahvaljuje. Siđi dolje u smočnicu, ostavili smo ti nešto!",thanks:"Smočnica je puna! Hvala ti, prijateljice.",remind:"Sjemenke su raštrkane po vrtu."});}
function vrEnv(){/* dewdrops on the grass, the big dewdrop on the leaf, bees around the hive, butterflies, petals */
  const dm=new THREE.MeshStandardMaterial({color:LC(0xd8f4ff),roughness:.02,metalness:.15,transparent:true,opacity:.42,emissive:LC(0x3a7ab8),emissiveIntensity:.15});
  {const d=new THREE.Mesh(new THREE.SphereGeometry(2.2,24,16),dm);d.scale.y=.85;d.position.set(VR.dewTop.x,VR.dewTop.y-.3,VR.dewTop.z);scene.add(d);VR.dewM.push(d);}
  for(let i=0;i<26;i++){const x=20+Math.random()*216,z=20+Math.random()*216;const y=floorY(x,H-1,z)+1;if(y>VG+30)continue;const r=.5+Math.random()*1.1;const d=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),dm);d.scale.y=.8;d.position.set(x,y+r*.6,z);scene.add(d);VR.dewM.push(d);}
  for(let i=0;i<10;i++){const b=MODELS.pcela2();b.scale.setScalar(1.4);scene.add(b);VR.bees.push({g:b,ph:Math.random()*7,r:9+Math.random()*5,h:Math.random()*10});}
  {const sp=VR.spr;const n=new THREE.Group(),m=std(0x9aa0aa,{metalness:.7,roughness:.3});const c=new THREE.Mesh(new THREE.CylinderGeometry(.5,.7,.6,12),m);c.position.y=.3;n.add(c);const a=new THREE.Mesh(new THREE.BoxGeometry(2.4,.12,.2),m);a.position.y=.7;n.add(a);n.position.set(sp.x,sp.y,sp.z);scene.add(n);VR.sprM=a;}
  {const s=new THREE.Group(),m=std(0xd8d8e0,{metalness:.8,roughness:.2});const bowl=new THREE.Mesh(new THREE.SphereGeometry(1.4,16,10,0,Math.PI*2,Math.PI/2,Math.PI/2),m);bowl.scale.set(1,.4,1.3);bowl.position.set(0,.6,0);s.add(bowl);
    s.position.set(VR.spoon.x,VR.spoon.y,VR.spoon.z);scene.add(s);}}
function vrTick(dt,tt){const P=FP.p;
  for(const b of VR.bees){const a=tt*.8+b.ph;b.g.position.set(VR.hive.x+Math.cos(a)*b.r,VR.hive.y-4+b.h+Math.sin(tt*2+b.ph)*.8,VR.hive.z+Math.sin(a)*b.r);b.g.rotation.y=-a;const P2=b.g.userData.parts;if(P2&&P2.wl){P2.wl.rotation.z=Math.sin(tt*40)*.6;P2.wr.rotation.z=-Math.sin(tt*40)*.6;}}
  if(VR.sprM){VR.sprM.parent.rotation.y+=dt*3;if(Math.random()<dt*30){const a=Math.random()*6.28;mgSpawn({t:"puff",x:VR.spr.x+Math.cos(a)*1.2,y:VR.spr.y+.8,z:VR.spr.z+Math.sin(a)*1.2,vx:Math.cos(a)*1.5,vy:5+Math.random()*3,vz:Math.sin(a)*1.5,life:1.2,size:.2,size2:.35,col:[0xd8f0ff,0xffffff],grav:5,op:.8});}}
  for(let i=0;i<VR.dewM.length;i++){const d=VR.dewM[i];d.rotation.y=tt*.2+i;}
  if(Math.random()<dt*2)mgSpawn({t:"petal",x:P.x+(Math.random()-.5)*30,y:P.y+12+Math.random()*6,z:P.z+(Math.random()-.5)*30,vy:-.8,vx:.6,life:7,size:.4,size2:.4,col:[0xff9ac8,0xffffff,0xffe070],grav:.05,op:1});
  /* ants carry leaves along their trail */
  for(let i=0;i<VR.ants.length;i++){const e=VR.ants[i];if(!e.leaf){const l=new THREE.Mesh(new THREE.BoxGeometry(.6,.04,.4),std(0x6ac83a));l.position.set(0,.55,0);l.rotation.z=.3;e.g.add(l);e.leaf=l;}}
  if(!FP.on)return;
  if(Math.hypot(P.x-VR.spoon.x,P.z-VR.spoon.z)<5)tipOnce("v_zlica","Divovska žličica! Stani na zlatnu točku i ona te baci na vrh suncokreta.",4600);
  if(Math.hypot(P.x-VR.spr.x,P.z-VR.spr.z)<5)tipOnce("v_prskalica","Prskalica! Stani u mlaz i voda te digne do ruba kante.",4400);
  if(Math.hypot(P.x-70,P.z-88)<6)tipOnce("v_kosnica","Košnica! Uđi kroz otvor i penji se po stubama od saća.",4200);
  if(Math.hypot(P.x-184,P.z-194)<5)tipOnce("v_mravi","Ulaz u mravinjak! Tunel vodi duboko pod zemlju.",4000);}
function vrTalk(){const n=wStars("vrt");const need=["pcelica","skakavac"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.vrt&&S.wst.vrt[s.k]));
  const L=n>=WSTAR_N?"Ružin pupoljak se otvorio! Vidiš kako sve cvjeta? Uđi, blago je tvoje!":
    n===0?"Bok, mala! Ja sam bubamara Točkica. Ne boj se, nisi se izgubila, samo si sada malena kao mi! Ovo je Divovski vrt. Deset sunčanih kapi palo je po vrtu, a bez njih se ružin pupoljak ne može otvoriti. Pomozi nam ih skupiti!":
    "Imaš "+n+" od "+WSTAR_N+" sunčanih kapi. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" U vrtu ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_vrt=(x,P)=>{x.fillStyle="#bfe6ff";x.fillRect(0,0,64,64);x.fillStyle="#5ab83a";x.fillRect(0,48,64,16);for(const [a,h] of [[6,40],[14,30],[50,36],[58,44]]){x.fillStyle="#3a8a2a";x.fillRect(a,64-h,4,h);}
    x.fillStyle="#3a8a2a";x.fillRect(30,22,4,30);x.fillStyle="#ffd23a";x.beginPath();x.arc(32,20,13,0,7);x.fill();x.fillStyle="#6a3a1a";x.beginPath();x.arc(32,20,6,0,7);x.fill();
    x.fillStyle="#e0302a";x.beginPath();x.arc(46,54,5,0,7);x.fill();x.fillStyle="#111";x.fillRect(45,49,2,10);};
  D.mg_trail_latice=(x)=>{for(let i=0;i<16;i++){x.fillStyle=["#ff9ac8","#ffffff","#ffd0e8","#ffe070"][i%4];x.save();x.translate(8+(i*37)%50,8+(i*23)%50);x.rotate(i);x.beginPath();x.ellipse(0,0,7,4,0,0,7);x.fill();x.restore();}};})();

pwWorld("vrt",{dist:"dolina",lv:8,n:"Divovski vrt",d:"Rida je malena kao bubamara! Vlati trave visoke kao stabla, suncokret kao neboder, kapi rose kao kuće, košnica, mravinjak i puževa kućica.",
  feat:["Bubamara Točkica","Pčelica Medica","Skakavac Skokić","žličica-katapult","mravinjak","zvončići"],fr:["stapka","lisce","tresnja"],ca:0xb8ff7a,cb:0x3aa83a,sea:0,fog:.0022,
  preset:PRESETS.vrt,
  gen:vrGen,env:vrEnv,life:vrLife,talk:vrTalk,tick:vrTick,itemMesh:vrDrop,itemCol:[0xffe080,0xffffff,0xffc040],itemBurst:[[1,.9,.4],[1,1,1],[1,.8,.3]],itemFx:"star",
  item:{one:"Sunčana kap",hud:"Sunčane kapi",done:"Sve sunčane kapi!",all:"Svih 10 sunčanih kapi! Kristalna vrata ružinog pupoljka su se otvorila!",first:"Prva sunčana kap! Kompas na vrhu pokazuje najbližu."},
  intro:()=>"Divovski vrt! Sunčane kapi: "+wStars("vrt")+" / "+WSTAR_N+". Bubamara Točkica te čeka kod portala.",
  facts:{suncokret:"Suncokret okreće glavu prema suncu dok je mlad. Jedan cvijet suncokreta ima i tisuću sjemenki.",
    kosnica:"U jednoj košnici živi i pedeset tisuća pčela. Saće grade od voska, a svaka stanica ima šest stranica.",
    kucica:"Puž nosi kućicu cijeli život i ona raste zajedno s njim. Kad je opasno, puž se sav uvuče unutra.",
    mravi:"Mravi mogu nositi i pedeset puta više od svoje težine. Kad bi ti to mogla, podigla bi auto!",
    lokva:"U lokvama žive sitna bića koja se vide samo povećalom. Jedna kap vode za njih je cijeli bazen.",
    kanta:"Biljke piju vodu korijenjem. Najbolje ih je zalijevati ujutro ili navečer, kad sunce ne prži.",
    zvoncici:"Zvončići se tako zovu jer im cvijet izgleda kao malo zvono. Bumbari se uvuku unutra po nektar.",
    gredica:"Iz jedne male sjemenke može izrasti velika biljka. Sjemenci treba zemlja, voda i sunce.",
    rosa:"Rosa nastaje noću kad se zrak ohladi, pa se vlaga iz zraka skupi u kapljice na lišću.",
    utrka:"Bubamara pojede i pedeset lisnih uši na dan, pa je vrtlari jako vole."},
  chat:{"Puž Polagani":["Polako, polako... kamo se žuriš?","Moja stara kućica je na istoku vrta. Sad imam novu, veću!"],"Gusjenica Gricko":["Njam, njam, list! Kad narastem, bit ću leptir!"],
    "Leptirica Šarenka":["Lepršam od cvijeta do cvijeta!","Zvončići sviraju kad staneš na ploču ispod njih."],"Leptirić Plavko":["Jesi li vidjela onu veliku kap rose? Svjetluca kao dijamant!"],
    bubamara2:["Točkica je moja sestrična!","Brojiš li moje točkice? Imam ih sedam!"],mrav2:["Ne smetaj, nosim list!","Lijevo, desno, lijevo, desno!"]},
  finale:{chest:"v_blago",isl:"ruza",at:{x:158,z:104},rewards:["skin:bubamara","trail:latice"],locked:"Kristalna vrata čuvaju ružin pupoljak. Skupi svih 10 sunčanih kapi!",
    kicker:"Ruža je procvala!",title:"Blago ružinog pupoljka",sub:"Lisica bubamara i Latice sad su tvoji. Točkica kaže da si najhrabrija mala lisica u vrtu!"}});
