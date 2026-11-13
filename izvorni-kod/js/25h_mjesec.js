/* =================== OP2 v15: Mjesečeva postaja (portal world of Gorski kraj) =================== */
/* The Moon: low gravity (every jump goes four blocks high), grey plains full of craters, the Earth hanging in a black
   sky, a moon base with a greenhouse, a rocket with a climbing gantry, a monorail to the observatory mesa, floating
   asteroids, a radio telescope, an ice crater, a lava tube with a skylight and a golden dome. */
MSKIN.astronaut={n:"Lisica astronautkinja",d:"Bijelo svemirsko odijelo s narančastim prugama, zlatni vizir i mala zastavica na leđima.",p:0,rar:"l",O:0xf4f4f8,W:0xffffff,B:0x2a2a3a,D:0xff7a20,glowO:.06,fx:"galaksija",wr:"Mjesečeva postaja"};
MTRAIL.prasina={n:"Mjesečeva prašina",d:"Svaki korak diže oblačić srebrne mjesečeve prašine koji polako lebdi, jer na Mjesecu nema vjetra.",p:0,rar:"l",wr:"Mjesečeva postaja"};
TR.prasina=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.5,y:p.y+.1,z:p.z+(Math.random()-.5)*.5,vy:.5+Math.random()*.5,vx:(Math.random()-.5)*.8,vz:(Math.random()-.5)*.8,grav:.5,life:1.6,size:.14,size2:.08,col:[0xd8dce8,0xb8bcc8,0xffffff],op:.85});TRATE.prasina=12;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","astronaut",MSKIN.astronaut);ins("trail","prasina",MTRAIL.prasina);}
PRESETS.mjesec={top:0x000006,hz:0x0a0c1c,sun:0xfff6ea,si:2.1,hemi:.42,el:.42,az:2.3,fog:0x05060e,glow:.9,stars:1,sh:0x3a3a4a,dp:0x101018,exp:1.02,night:.35};

/* ---------- creatures and people (blocky) ---------- */
MODELS.mjzec=function(){const Wt=0xf4f4f8,P=0xf0b0c0,K=0x1a1a2a,hd={name:"head",px:0,py:.42,pz:.2};
  return mk([[.32,.3,.44,0,.3,0,Wt],[.26,.24,.24,0,.48,.24,Wt,hd],[.05,.05,.02,-.08,.52,.365,K,hd],[.05,.05,.02,.08,.52,.365,K,hd],[.05,.04,.02,0,.45,.37,P,hd],
    [.08,.34,.06,-.07,.76,.2,Wt,hd],[.04,.24,.02,-.07,.76,.23,P,hd],[.08,.34,.06,.07,.76,.2,Wt,hd],[.04,.24,.02,.07,.76,.23,P,hd],[.14,.14,.14,0,.36,-.26,Wt],
    [.1,.1,.24,-.12,.1,-.08,Wt],[.1,.1,.24,.12,.1,-.08,Wt],[.08,.14,.08,-.1,.12,.16,Wt],[.08,.14,.08,.1,.12,.16,Wt]]);};
MODELS.mjzec2=()=>MODELS.mjzec();
MODELS.robot=function(){const Wt=0xe8ecf4,G=0x8a90a0,B=0x2a8ae8,K=0x1a1a2a,Y=0xffc030,hd={name:"head",px:0,py:.72,pz:0};
  return mk([[.44,.38,.36,0,.42,0,Wt],[.3,.2,.04,0,.44,.19,B],[.06,.06,.02,-.08,.46,.215,Y],[.06,.06,.02,.08,.46,.215,0xff4a4a],[.36,.28,.3,0,.76,0,Wt,hd],[.28,.12,.04,0,.78,.16,K,hd],[.08,.06,.02,-.07,.78,.18,0x5affe8,hd],[.08,.06,.02,.07,.78,.18,0x5affe8,hd],
    [.03,.2,.03,0,1.0,0,G,hd],[.08,.08,.08,0,1.12,0,0xff4a4a,hd],[.08,.26,.08,-.28,.44,0,G],[.08,.26,.08,.28,.44,0,G],[.12,.12,.12,-.28,.28,.04,G],[.12,.12,.12,.28,.28,.04,G],
    [.12,.18,.18,-.16,.12,0,K],[.12,.18,.18,.16,.12,0,K],[.32,.06,.3,0,.22,0,G]]);};
MODELS.robot2=()=>MODELS.robot();
MODELS.astronautkinja=function(){const Wt=0xf4f4f8,O=0xff7a20,G=0xffc030,Gy=0x9aa0b0,K=0x1a1a1a,hd={name:"head",px:0,py:1.1,pz:0};
  return mk([[.46,.5,.32,0,.74,0,Wt],[.48,.08,.34,0,.52,0,O],[.16,.46,.18,-.11,.24,0,Wt],[.16,.46,.18,.11,.24,0,Wt],[.18,.08,.22,-.11,.04,.02,Gy],[.18,.08,.22,.11,.04,.02,Gy],
    [.14,.44,.14,-.31,.76,0,Wt],[.14,.44,.14,.31,.76,0,Wt],[.14,.12,.14,-.31,.5,.02,Gy],[.14,.12,.14,.31,.5,.02,Gy],[.36,.46,.16,0,.78,-.24,Gy],[.08,.08,.02,-.08,.86,.17,0x2a8ae8],[.08,.08,.02,.06,.86,.17,0xff4a4a],
    [.44,.42,.42,0,1.16,0,Wt,hd],[.34,.24,.04,0,1.16,.21,G,hd],[.12,.06,.02,-.08,1.22,.235,0xfff4c0,hd],[.04,.2,.04,.14,1.44,-.1,Gy,hd]]);};
pwPets("mjesec","gora",[
  {k:"mjzec",fav:"bobice",n:"Mjesečev zec Skok",d:"Bijeli zečić s Mjeseca. Stare priče kažu da se na Mjesecu vidi zec, a evo ga stvarno!",gd:"S Mjeseca donosi zvjezdane mrkvice i zlatnike.",gift:()=>[["bobice",3],["coins",24]],spd:1.7,
   spec:{n:"Mjesečev skok",d:"Skok te nosi skokovima visokim kao kuća! I to dvaput zaredom.",ride:1,ic:"star"},ride:{land:1,speed:10.8,jump:11.5,dbl:1,seat:.56},tip:"Skok te nosi! Na Mjesecu skače do neba."},
  {k:"robot",fav:"bobice",n:"Robot Bip",d:"Mali robot istraživač s antenom. Kad je sretan, zatreperi plavim i zapiska melodiju.",gd:"Iz postaje donosi dijelove i zlatnike.",gift:()=>[["bobice",3],["coins",22]],spd:1.2,
   spec:{n:"Robotski mlazni let",d:"Bip upali male mlaznice i letite iznad kratera! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:9.6,jump:9,seat:.98},tip:"Bip leti na mlaznice! Skok je gore, Roni je dolje."}]);
PWIT.zmrkva={n:"Zvjezdana mrkvica",mk:g=>{const c=new THREE.Mesh(new THREE.ConeGeometry(.1,.4,6),std(0xff8a20,{emissive:LC(0xff6a10),emissiveIntensity:.5}));c.rotation.x=Math.PI;g.add(c);
  const l=new THREE.Mesh(new THREE.BoxGeometry(.04,.16,.12),std(0x5ad84a));l.position.y=.26;g.add(l);const s=new THREE.Mesh(new THREE.OctahedronGeometry(.08,0),std(0xfff4a0,{emissive:LC(0xffe060),emissiveIntensity:1}));s.position.set(.12,.2,0);g.add(s);},glow:0xffb060};
PWIT.vijak={n:"Robotski vijak",mk:g=>{const m=std(0xb8c0d0,{metalness:.8,roughness:.3});const h=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.08,6),m);h.position.y=.14;g.add(h);
  const s=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.3,8),m);g.add(s);for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(.065,.015,4,8),m);r.rotation.x=Math.PI/2;r.position.y=-.1+i*.06;g.add(r);}},glow:0x9ad8ff};
PWIT.celija={n:"Solarna ćelija",mk:g=>{const p=new THREE.Mesh(new THREE.BoxGeometry(.5,.04,.34),std(0x1a3a8a,{emissive:LC(0x0a2a6a),emissiveIntensity:.6,metalness:.4,roughness:.25}));p.rotation.x=-.4;g.add(p);
  const f=new THREE.Mesh(new THREE.BoxGeometry(.54,.02,.38),std(0xd8dce8,{metalness:.7}));f.rotation.x=-.4;f.position.y=-.03;g.add(f);for(let i=-1;i<=1;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(.01,.05,.34),std(0x8ab8ff));l.position.x=i*.14;l.rotation.x=-.4;g.add(l);}},glow:0x5a9aff};
function mjItem(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0xe8f0ff),emissive:LC(0x9ab0ff),emissiveIntensity:.7,roughness:.15,metalness:.4,flatShading:true});
  const s=new THREE.Mesh(new THREE.IcosahedronGeometry(.26,0),m);g.add(s);const r=new THREE.Mesh(new THREE.TorusGeometry(.4,.035,6,24),new THREE.MeshStandardMaterial({color:LC(0xffd060),emissive:LC(0xffb020),emissiveIntensity:.8,metalness:.6}));r.rotation.x=1.2;g.add(r);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xb8c8ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85}));sp.scale.set(2.4,2.4,1);g.add(sp);return g;}

/* ---------- the Moon ---------- */
const MJG=16;
const MJ={rail:null,mrkve:[],vijci:[],celije:[],ast:[]};
const MJC=[[80,96,24,10,1],[198,70,13,9,0],[160,108,7,3,0],[106,140,6,2.5,0],[226,100,9,4,0],[60,152,8,3,0],[150,58,10,4,0],[30,60,9,4,0],[222,150,7,3,0],[44,226,8,3,0],[214,232,7,3,0]];
function mjH(x,z){let h=MJG+(fbm(x*.03,z*.03)-.5)*6;for(const [cx,cz,R,dp,pk] of MJC){const d=Math.hypot(x-cx,z-cz)+(vnoise(x*.2,z*.2,9)-.5)*1.4;
    if(d<R){h-=dp*(1-(d/R)*(d/R));if(pk&&d<6)h+=14*Math.pow(1-d/6,1.2);}else if(d<R*1.45){h+=dp*.35*(1-(d-R)/(R*.45));}}
  {const d=Math.hypot(x-40,z-192);if(d<11)h=Math.max(h,MJG+18);else if(d<12.5)h=Math.max(h,MJG+18-(d-11)*10);}
  return Math.round(h);}
function mjGen(){const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};const Y=(x,z)=>hmap[x+z*W];
  const flat=(cx,cz,r,g)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=cx+dx,Z=cz+dz;if(Math.hypot(dx,dz)>r+.5)continue;for(let y=1;y<g;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=y===g-1?T.glina:T.kamen;for(let y=g;y<H;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;hmap[X+Z*W]=g;}};
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=mjH(x,z);hmap[x+z*W]=h;const n=hash2(x,z,7),ice=Math.hypot(x-198,z-70)<7;
    for(let y=0;y<h;y++)vox[I(x,y,z)]=y===h-1?(ice?(n<.5?T.led:T.pled):(n<.12?T.bijela:(n<.2?T.sljunak:T.glina))):(y>h-3?T.glina:(y%6<2?T.duboki:T.kamen));}
  /* scattered moon rocks */
  for(let i=0;i<220;i++){const x=4+Math.floor(hash2(i,1,31)*248),z=4+Math.floor(hash2(i,2,31)*248);const y=Y(x,z);const s=hash2(i,3,31);wput(x,y,z,s<.5?T.kamen:T.duboki);if(s<.2){wput(x+1,y,z,T.kamen);wput(x,y+1,z,T.duboki);}}
  /* ----- landing site: portal and the lander ----- */
  {const x=128,z=236,g=MJG;flat(x,z-4,9,g);wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:g,z:z-8.5,cam:0};busy(x,z-4,9);
    const lx=114,lz=230;for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)for(let y=g+2;y<g+5;y++){const e=Math.abs(dx)===2||Math.abs(dz)===2;if(e||y===g+4)wput(lx+dx,y,lz+dz,y===g+3&&e?T.zlato:T.bijela,1);}
    for(const [a,b] of [[-3,-3],[3,3],[-3,3],[3,-3]]){wput(lx+a,g,lz+b,T.zeljezo,1);wput(lx+Math.sign(a)*2,g+1,lz+Math.sign(b)*2,T.zeljezo,1);}for(let y=g+5;y<g+7;y++)wput(lx,y,lz,T.zeljezo,1);wput(lx,g+7,lz,T.svjetlo,1);
    for(let y=g;y<g+5;y++)wput(lx+5,y,lz,T.zeljezo,1);wput(lx+6,g+4,lz,T.vuna_t,1);wput(lx+6,g+3,lz,T.bijela,1);wput(lx+7,g+4,lz,T.vuna_c,1);wput(lx+7,g+3,lz,T.vuna_t,1);
    busy(lx,lz,6);}
  /* ----- the moon base: habitat, greenhouse, solar panels; the airlock is the quest cage ----- */
  {const cx=128,cz=188,g=MJG;flat(cx,cz,14,g);
    for(let dz=-4;dz<=4;dz++)for(let dx=-6;dx<=6;dx++)for(let y=g;y<g+6;y++){const e=Math.abs(dx)===6||Math.abs(dz)===4;const roof=y===g+5;const r2=Math.abs(dx)>=5&&y>=g+4||Math.abs(dz)>=4&&y>=g+5;
      if(!e&&!roof){vox[I(cx+dx,y,cz+dz)]=0;continue;}wput(cx+dx,y,cz+dz,roof?(Math.abs(dx)<6&&Math.abs(dz)<4?T.kvarc:T.bijela):(y===g+2&&(dx%3===0)&&Math.abs(dz)===4||y===g+2&&Math.abs(dx)===6&&dz%2===0?T.staklo:(y===g?T.zeljezo:T.bijela)),1);}
    for(let dx=-5;dx<=5;dx++)for(let dz=-3;dz<=3;dz++)wput(cx+dx,g-1,cz+dz,(dx+dz)%2?T.kvarc:T.bijela,1);
    for(const [a,b] of [[-5,-3],[5,-3],[-5,3],[5,3]])wput(cx+a,g+4,cz+b,T.svjetlo,1);wput(cx-4,g,cz-2,T.stol,1);wput(cx+4,g,cz-2,T.bacva,1);wput(cx-4,g,cz+2,T.polica,1);
    for(let h=0;h<2;h++){vox[I(cx,g+h,cz+4)]=0;pwCell("postaja",cx,g+h,cz+4,T.vuna_n);}for(const a of [-1,1])for(let h=0;h<3;h++)wput(cx+a,g+h,cz+5,T.zeljezo,1);wput(cx,g+2,cz+5,T.zeljezo,1);
    wStar("postaja",cx+.5,g+.9,cz+.5,"U Mjesečevoj postaji. Astronautkinja Vega otvorit će zračnu komoru kad joj vratiš solarne ćelije!");
    /* greenhouse dome */
    const gx=cx+11,gz=cz;for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)for(let y=g;y<g+6;y++){const d=Math.hypot(dx,dz,(y-g)*1.05);if(d>5.2)continue;if(d<4.3){vox[I(gx+dx,y,gz+dz)]=0;continue;}wput(gx+dx,y,gz+dz,(dx===0||dz===0)&&y<g+4?T.kvarc:T.staklo,1);}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++)if(Math.hypot(dx,dz)<4.2)wput(gx+dx,g-1,gz+dz,T.trava,1);for(let dz=-1;dz<=1;dz++)for(let h=0;h<2;h++)vox[I(gx-5,g+h,gz+dz)]=0;
    for(const [a,b] of [[1,1],[-2,2],[2,-2],[0,-3],[3,1]])wput(gx+a,g,gz+b,hash2(a,b,3)<.5?T.cvijet:T.trava);wput(gx-1,g,gz-1,T.lubenica,1);wput(gx+2,g,gz+2,T.bundeva,1);
    /* solar panels */
    for(const [a,b] of [[-12,-6],[-12,6],[-16,0],[12,9],[0,-12]]){const X=cx+a,Z=cz+b;for(let y=g;y<g+3;y++)wput(X,y,Z,T.zeljezo,1);for(let dx=-2;dx<=2;dx++)for(let dz=-1;dz<=1;dz++)wput(X+dx,g+3,Z+dz,T.vuna_t,1);}
    for(let x=cx-16;x<=cx+6;x+=2)wput(x,g,cz+8,T.zeljezo);
    MJ.base={x:cx,z:cz};busy(cx,cz,16);POI.push({k:"mj_postaja",n:"Mjesečeva postaja",x:cx,z:cz,r:14});}
  /* ----- the rocket and its gantry ----- */
  {const rx=154,rz=212,g=MJG;flat(rx+3,rz,9,g);
    for(let y=g;y<g+26;y++){const k=y-g;const r=k<20?2.4:Math.max(.4,2.4-(k-20)*.45);for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d>r)continue;
        wput(rx+dx,y,rz+dz,k>=20?T.crvena:(k%7===6?T.crvena:(k===13&&Math.abs(dz)<1&&dx<0?T.staklo:T.bijela)),1);}}
    for(const [a,b] of [[-3,0],[3,0],[0,-3],[0,3]])for(let y=g;y<g+5;y++){wput(rx+a,y,rz+b,T.crvena,1);if(y<g+3)wput(rx+a*1.34|0,y,rz+b*1.34|0,T.crvena,1);}
    const tx=rx+6,tz=rz;for(let y=g;y<g+25;y++)for(const [a,b] of [[-2,-2],[2,-2],[-2,2],[2,2]])wput(tx+a,y,tz+b,y%4===3?T.vuna_c:T.zeljezo,1);
    for(let k=0;k<8;k++){const y=g+2+k*3,side=k%2?1:-1;for(let dz=1;dz<=2;dz++)for(let dx=-1;dx<=1;dx++)wput(tx+dx,y,tz+side*dz,T.kvarc,1);}
    const top=g+26;for(let dz=-2;dz<=0;dz++)for(let dx=-2;dx<=2;dx++)wput(tx+dx,top,tz+dz,T.kvarc,1);for(let x=rx+2;x<tx-1;x++)wput(x,top,tz,T.zeljezo,1);wput(tx+2,top+1,tz-2,T.svjetlo,1);
    wStar("raketa",tx+.5,top+1.9,tz-.5,"Na vrhu lansirnog tornja kraj rakete. Na Mjesecu skačeš visoko: skači s police na policu!");MJ.gantry={x:tx,z:tz};busy(rx+3,rz,8);POI.push({k:"mj_raketa",n:"Raketa",x:rx,z:rz,r:8});}
  /* ----- the golden dome (finale) ----- */
  {const cx=128,cz=156,g=MJG;flat(cx,cz,9,g);for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){wput(cx+dx,g-1,cz+dz,Math.hypot(dx,dz)<5.6?(dx+dz)%2?T.zlato:T.kvarc:T.bijela,1);for(let y=g;y<g+7;y++){const d=Math.hypot(dx,dz,(y-g)*1.1);if(d>6.1)continue;if(d<5.1){vox[I(cx+dx,y,cz+dz)]=0;continue;}
      if(dz>=4&&Math.abs(dx)<=1&&y<g+3){wput(cx+dx,y,cz+dz,T.kristal,1);WG.gate.push([cx+dx,y,cz+dz]);continue;}wput(cx+dx,y,cz+dz,(dx===0||dz===0)?T.zlato:T.staklo,1);}}
    wput(cx-3,g,cz-2,T.svjetlo,1);wput(cx+3,g,cz-2,T.svjetlo,1);WG.isl.kupola={x:cx,z:cz,y:g,r:5};addChest("mj_blago",cx,g,cz-1,"Blago Zlatne kupole");busy(cx,cz,8);POI.push({k:"mj_kupola",n:"Zlatna kupola",x:cx,z:cz,r:7});}
  /* ----- the monorail to the observatory mesa ----- */
  {const g=MJG,sx=108,sz=192;flat(sx,sz,4,g);for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)wput(sx+dx,g-1,sz+dz,T.kvarc,1);for(const [a,b] of [[-2,-2],[-2,2]])for(let y=g;y<g+5;y++)wput(sx+a,y,sz+b,T.zeljezo,1);for(let dz=-2;dz<=2;dz++)wput(sx-2,g+5,sz+dz,T.bijela,1);
    const E=[46,192],top=MJG+18;const pts=[];for(let i=0;i<=90;i++){const t=i/90;const x=sx+.5+(E[0]+.5-sx-.5)*t,z=sz+.5+Math.sin(t*Math.PI)*-8,y=g+.02+(top-g)*(t<.15?0:Math.min(1,(t-.15)/.7));pts.push([x,y+(t>.1&&t<.9?2.4*Math.sin((t-.1)/.8*Math.PI):0),z]);}
    MJ.rail={pts,on:false,t:0,cool:0,st:{x:sx+.5,y:g,z:sz+.5}};
    for(let i=6;i<pts.length-6;i+=6){const [x,y,z]=pts[i];const X=Math.floor(x),Z=Math.floor(z);for(let yy=Y(X,Z);yy<Math.floor(y)-1;yy++)wput(X,yy,Z,T.zeljezo,1);}
    /* observatory on the mesa */
    const ox=38,oz=192;for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)for(let y=top;y<top+5;y++){const d=Math.hypot(dx,dz,Math.max(0,y-top-1)*1.1);if(d>3.6)continue;if(d<2.7){vox[I(ox+dx,y,oz+dz)]=0;continue;}if(dx===3&&Math.abs(dz)<=0&&y<top+2)continue;wput(ox+dx,y,oz+dz,y>=top+3&&dz===0?T.staklo:T.bijela,1);}
    for(let k=0;k<4;k++)wput(ox-1+k,top+4+(k>>1),oz,T.zeljezo,1);
    wStar("opservatorij",ox+.5,top+.9,oz+.5,"U opservatoriju na visokoj stijeni zapadno od postaje. Vozi se Mjesečevim monorailom!");MJ.obs={x:E[0]+.5,y:top,z:192.5};busy(ox,oz,6);busy(sx,sz,4);POI.push({k:"mj_opservatorij",n:"Opservatorij",x:40,z:192,r:10});}
  /* ----- the big crater with its central peak ----- */
  {const cx=80,cz=96;let py=0;for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)py=Math.max(py,Y(cx+dx,cz+dz));wput(cx,py,cz,T.kristal,1);wput(cx+1,py,cz,T.kristal,1);
    wStar("krater",cx+.5,py+1.9,cz+.5,"Na vrhu središnje stijene u Velikom krateru. Skači uz strme stijene, gravitacija je mala!");busy(cx,cz,4);POI.push({k:"mj_krater",n:"Veliki krater",x:cx,z:cz,r:22});}
  /* ----- floating asteroids to hop across ----- */
  {const rock=(cx,cy,cz,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)for(let dy=-r;dy<=r;dy++){const d=Math.hypot(dx,dy*1.3,dz)+(vnoise((cx+dx)*.5,(cz+dz)*.5+dy,13)-.5)*.8;if(d>r)continue;wput(cx+dx,cy+dy,cz+dz,dy===Math.floor(r/1.3)||d>r-1&&dy>0?T.glina:(hash3(cx+dx,cy+dy,cz+dz)<.15?T.r_zeljezo:T.kamen),1);}};
    let x=104,z=168,y=MJG+3;const path=[];for(let k=0;k<8;k++){rock(x,k===7?y-2:y,z,k===7?3:1.6);path.push([x,y,z]);x-=4;z-=5;y+=2;}MJ.ast=path;
    const [ex,ey,ez]=path[path.length-1];let ty=ey;while(get(ex,ty+1,ez))ty++;wStar("asteroidi",ex+.5,ty+1.9,ez+.5,"Na najvišem lebdećem asteroidu sjeverozapadno od postaje. Skači s kamena na kamen!");}
  /* ----- the mass driver launch to the golden asteroid ----- */
  {const lx=112,lz=150,g=Y(lx,lz);flat(lx,lz,2,g);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(lx+dx,g-1,lz+dz,(dx||dz)?T.zeljezo:T.svjetlo,1);for(const a of [-2,2])for(let h=0;h<3;h++)wput(lx+a,g+h,lz,T.zeljezo,1);
    const ax=128,az=116,ay=MJG+30;for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++)for(let dy=-3;dy<=1;dy++){const d=Math.hypot(dx,dz,dy*1.5);if(d>4.3)continue;wput(ax+dx,ay+dy,az+dz,dy===1?T.zlato:(d>3.4?T.r_zlato:T.kamen),1);}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++)if(get(ax+dx,ay+1,az+dz))hmap[ax+dx+(az+dz)*W]=ay+2;
    pwLaunch({k:"top",x:lx+.5,y:g,z:lz+.5,to:[ax+.5,ay+2,az+.5],h:8,dur:2.6,col:[0xffffff,0x9ab0ff],msg:"ŽUUUM! Elektromagnetski top lansirao te na Zlatni asteroid!"});
    wStar("top",ax+.5,ay+2.9,az+1.5,"Na Zlatnom asteroidu koji lebdi visoko iznad Kupole. Do njega te lansira elektromagnetski top!");MJ.cannon={x:lx+.5,z:lz+.5};busy(lx,lz,3);}
  /* ----- the ice crater: dig for water ice ----- */
  {const cx=198,cz=70,g=Y(cx,cz);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("led",cx+a,g-1,cz+b,(a===b||a===-b)?T.crvena:T.led);pwCell("led",cx+a,g-2,cz+b,T.pled);}
    wStar("led",cx+.5,g-1.4,cz+.5,"Zakopan pod ledom na dnu Ledenog kratera, gdje sunce nikad ne sja. Kopaj kroz led!");pwDig("led",cx,g-1,cz,"Kopaš kroz zaleđenu vodu... i eno ga! Mjesečev kristal!");busy(cx,cz,3);POI.push({k:"mj_led",n:"Ledeni krater",x:cx,z:cz,r:12});}
  /* ----- the radio telescope and its signal pads ----- */
  {const cx=196,cz=146,g=Y(cx,cz);flat(cx,cz,10,g);for(let y=g;y<g+6;y++)for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)if(dx||dz||y>g+1)wput(cx+dx,y,cz+dz,T.zeljezo,1);
    for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const d=Math.hypot(dx,dz);if(d>6.2)continue;const y=g+6+Math.round((d/6)*(d/6)*4);wput(cx+dx,y,cz+dz,d>5.6?T.zeljezo:T.kvarc,1);}
    for(let y=g+7;y<g+11;y++)wput(cx,y,cz,T.zeljezo,1);wput(cx,g+11,cz,T.svjetlo,1);
    for(let h=0;h<2;h++)pwCell("signal",cx,g+h,cz+1,T.vuna_t);vox[I(cx,g,cz)]=0;vox[I(cx,g+1,cz)]=0;wStar("signal",cx+.5,g+.9,cz+.5,"Ispod velike radio-antene. Pošalji pravi signal pločama oko nje!");
    const L=[["vuna_t",523],["vuna_c",659],["zlato",784],["vuna_zl",988]],PP=[[-8,4],[-3,8],[3,8],[8,4]],ORD=[3,1,0,2];
    const pads=PP.map(([a,b],i)=>{const x=cx+a,z=cz+b,y=g-1;wput(x,y,z,T[L[i][0]],1);for(let h=0;h<2;h++)wput(x+(a>0?1:-1),g+h,z,T.zeljezo,1);wput(x+(a>0?1:-1),g+2,z,T[L[i][0]],1);return {x,y,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    {const x=cx-8,z=cz-2;for(let h=0;h<5;h++)wput(x,g+h,z,T.zeljezo,1);ORD.forEach((j,i)=>wput(x+1,g+4-i,z,T[L[j][0]],1));}
    pwSeq("signal",{pads,order:ORD,win:"Signal je poslan na Zemlju! Antena je zabljesnula i otvorila se mala vrata ispod nje.",wrong:"Krivi signal! Pogledaj stup s kockicama, odozgo prema dolje, i kreni ispočetka."});
    busy(cx,cz,11);POI.push({k:"mj_antena",n:"Radio-antena",x:cx,z:cz,r:10});}
  /* ----- the lava tube under a skylight ----- */
  {const P=[[176,176,MJG-7],[188,184,MJG-7],[200,194,MJG-6],[210,204,MJG-3],[218,212,MJG+1]];const pts=[];for(let i=0;i<P.length-1;i++)for(let t=0;t<1;t+=.05){pts.push(P[i].map((v,j)=>v+(P[i+1][j]-v)*t));}
    for(const [px,pz,py] of pts)for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)for(let dy=-1;dy<=5;dy++){const X=Math.round(px+dx),Z=Math.round(pz+dz),Yy=Math.round(py+dy);const d=Math.hypot(X-px,Z-pz,(Yy-py-1.5)*1.2);if(d>4)continue;if(!prot[I(X,Yy,Z)])vox[I(X,Yy,Z)]=0;}
    for(const [px,pz,py] of pts){const X=Math.round(px),Z=Math.round(pz),Yy=Math.round(py)-1;for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)if(!get(X+dx,Yy+1,Z+dz)&&get(X+dx,Yy,Z+dz)===0)wput(X+dx,Yy,Z+dz,T.duboki);}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){if(Math.hypot(dx,dz)>2.6)continue;for(let y=MJG-3;y<H;y++)if(!prot[I(176+dx,y,176+dz)])vox[I(176+dx,y,176+dz)]=0;}
    for(let i=0;i<pts.length;i+=4){const [px,pz,py]=pts[i];const a=i*1.7;wput(Math.round(px+Math.cos(a)*3.4),Math.round(py+2),Math.round(pz+Math.sin(a)*3.4),i%8?T.kristal:T.svjetlo);}
    for(const [px,pz] of pts)busy(Math.round(px),Math.round(pz),2);
    const sp=pts[Math.floor(pts.length*.35)];let sy=Math.round(sp[2]);while(get(Math.round(sp[0]),sy,Math.round(sp[1])))sy++;wput(Math.round(sp[0]),sy-1,Math.round(sp[1]),T.kristal,1);
    wStar("cijev",Math.round(sp[0])+.5,sy+.9,Math.round(sp[1])+.5,"U lavinoj cijevi ispod Mjesečeve površine. Skoči kroz okruglu rupu i polako padaj u mrak!");
    MJ.sky={x:176.5,z:176.5};POI.push({k:"mj_cijev",n:"Lavina cijev",x:190,z:188,r:16});}
  /* ----- rings over the plain ----- */
  {const pts=[];for(let i=0;i<10;i++){const x=150+i*6,z=126+Math.sin(i*.9)*6;const X=Math.round(x),Z=Math.round(z);pts.push([X+.5,Y(X,Z)+2.6+(i%3)*1.6,Z+.5]);busy(X,Z,1);}
    const cx=146,cz=134,g=Y(cx,cz);flat(cx,cz,2,g);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("orbita",cx+a,g+h,cz+b,(a+b+h)%2?T.kvarc:T.vuna_t);}
    wStar("orbita",cx+.5,g+.9,cz+.5,"U plavom kavezu istočno od Kupole. Otvara se kad proletiš kroz sve orbitalne prstenove!");busy(cx,cz,3);
    pwRings("orbita",{start:[146.5,g,128.5],pts,time:45,col:0x9ab8ff,name:"Orbitalni prstenovi",win:"Proletjela si kroz sve orbitalne prstenove! Plavi kavez se otvorio."});}
  /* pickups */
  const spot=([x,z])=>{busy(x,z,1);return [x+.5,Y(x,z)+1.3,z+.5];};
  MJ.mrkve=[[139,188],[90,200],[60,120],[170,150]].map(spot);
  MJ.vijci=[[150,230],[200,110],[110,110]].map(spot);
  MJ.celije=[[96,226],[176,214],[58,170],[190,40],[226,180]].map(spot);
  Object.assign(LOOT,{mj_blago:{coins:380,mats:{dijamant:3,smaragd:2,ametist:3},blocks:{kvarc:16,staklo:12,zlato:8,svjetlo:4},msg:"Blago Zlatne kupole! Kvarc, staklo i zlato za tvoju svemirsku postaju."}});}

/* ---------- life ---------- */
function mjLife(){S.wq=S.wq||{};
  PW.guide=pwPut("astronautkinja","Astronaut Luka",124.5,228.5,{frozen:true,ry:Math.PI*.8,sc:1.5,y:MJG+2});
  const ve=pwPut("astronautkinja","Astronautkinja Vega",MJ.base.x+2.5,MJ.base.z+7.5,{frozen:true,ry:0,sc:1.5,y:MJG+2});
  [[134,196,"Robot Čistko"],[120,200,"Robot Kopko"],[190,150,"Robot Antenko"]].forEach(([x,z,n])=>pwPut("robot2",n,x+.5,z+.5,{speed:.5,sc:1.1,y:MJG+3}));
  [[70,140],[160,170],[100,220]].forEach(([x,z],i)=>pwPut("mjzec2",["Zečica Mjesečina","Zec Krater","Zečić Prašinko"][i],x+.5,z+.5,{speed:.9,y:MJG+3}));
  const ze=pwPut("mjzec",PETS.mjzec.n,92.5,176.5,{speed:.6,y:MJG+3});const ro=pwPut("robot",PETS.robot.n,184.5,140.5,{speed:.5,y:MJG+3});
  pwQuest("mjzec",{pet:1,en:ze,auto:1,need:4,item:"zmrkva",spots:MJ.mrkve,got:"Zvjezdana mrkvica",
    ask:"Hop! Hop! Ja sam Skok, Mjesečev zec. Na Mjesecu rastu zvjezdane mrkvice, svijetle kao male zvijezde. Ispustio sam ih dok sam skakao. Doneseš mi četiri?",
    done:"Hrum-hrum, slatko! Sad imam snage za najveće skokove. Penji se, skočit ćemo do zvijezda!",fact:"Na Mjesecu je gravitacija šest puta slabija nego na Zemlji. Kad bi ti tamo skočila, skočila bi šest puta više!"});
  pwQuest("robot",{pet:1,en:ro,auto:1,need:3,item:"vijak",spots:MJ.vijci,got:"Robotski vijak",
    ask:"Bip-bup! Ja sam robot Bip. Ispali su mi vijci iz mlaznica pa ne mogu letjeti. Bip! Pronađeš mi tri vijka?",
    done:"Bip-bip-hura! Mlaznice rade! Hoćeš letjeti sa mnom iznad kratera?",fact:"Na Mjesecu i Marsu voze roboti istraživači, roveri. Upravljaju se sa Zemlje, a poruka do Marsa putuje i po dvadeset minuta!"});
  pwQuest("postaja",{en:ve,need:5,item:"celija",spots:MJ.celije,got:"Solarna ćelija",cage:"postaja",
    ask:"Bok, mala astronautkinjo! Ja sam Vega. Meteoriti su razbacali pet solarnih ćelija po Mjesecu, a bez njih postaja nema struje i zračna komora se ne otvara. Doneseš mi ih?",
    done:"Svih pet ćelija! Postaja opet ima struju. Zračna komora je otvorena, uđi! Unutra te čeka nešto posebno.",thanks:"Postaja svijetli, hvala ti!",remind:"Solarne ćelije su plave pločice koje svjetlucaju. Raspale su se po cijelom Mjesecu."});}
function mjEnv(){if(skyU.uCloud)skyU.uCloud.value=0;
  /* the Earth in the black sky */
  {const c=document.createElement("canvas");c.width=512;c.height=256;const x=c.getContext("2d");x.fillStyle="#1a4ab8";x.fillRect(0,0,512,256);
    const blob=(cx,cy,r,col)=>{x.fillStyle=col;for(let i=0;i<14;i++){const a=Math.random()*6.28,d=Math.random()*r;x.beginPath();x.ellipse(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.6,r*.5,r*.32,Math.random(),0,7);x.fill();}};
    for(const [cx,cy,r] of [[90,90,38],[110,170,30],[250,80,46],[270,150,26],[400,100,40],[440,190,22],[330,200,18]])blob(cx,cy,r,"#3a9a4a");blob(260,90,22,"#c8a860");blob(420,96,18,"#c8a860");
    x.fillStyle="#f4f8ff";x.fillRect(0,0,512,18);x.fillRect(0,238,512,18);x.globalAlpha=.7;for(let i=0;i<40;i++){x.beginPath();x.ellipse(Math.random()*512,20+Math.random()*216,20+Math.random()*40,4+Math.random()*6,Math.random()*.4-.2,0,7);x.fill();}
    const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const e=new THREE.Mesh(new THREE.SphereGeometry(70,48,28),new THREE.MeshStandardMaterial({map:tex,roughness:.8,emissive:LC(0x2a4a8a),emissiveIntensity:.25,fog:false}));
    e.position.set(CX-260,240,CZ-520);e.rotation.z=.4;scene.add(e);MJ.earth=e;
    const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0x6ab8ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.6,fog:false}));gl.scale.set(220,220,1);gl.position.copy(e.position);scene.add(gl);}
  /* monorail beam and car */
  {const R=MJ.rail,P=R.pts;const bm=std(0xd8dce8,{metalness:.5,roughness:.35});for(let i=0;i<P.length-1;i++){const a=new THREE.Vector3(...P[i]),b=new THREE.Vector3(...P[i+1]);const d=b.clone().sub(a),L=d.length();const mid=a.clone().add(b).multiplyScalar(.5);
      const m=new THREE.Mesh(new THREE.BoxGeometry(.5,.4,L+.06),bm);m.position.set(mid.x,mid.y-.3,mid.z);m.rotation.set(-Math.asin(d.y/L),Math.atan2(d.x,d.z),0,"YXZ");scene.add(m);}
    const g=new THREE.Group();const wt=std(0xf4f4f8,{metalness:.3,roughness:.3}),bl=std(0x2a8ae8),gl=new THREE.MeshStandardMaterial({color:0x9ad8ff,transparent:true,opacity:.35,roughness:.1});
    const fl=new THREE.Mesh(new THREE.BoxGeometry(1.8,.16,2.2),wt);fl.position.y=-.06;g.add(fl);const rf=new THREE.Mesh(new THREE.BoxGeometry(1.8,.2,2.2),wt);rf.position.y=2.2;g.add(rf);
    for(const [w,dd,px,pz] of [[1.8,.06,0,1.08],[1.8,.06,0,-1.08],[.06,2.2,.88,0],[.06,2.2,-.88,0]]){const p=new THREE.Mesh(new THREE.BoxGeometry(w,1.1,dd),gl);p.position.set(px,1.4,pz);g.add(p);const b=new THREE.Mesh(new THREE.BoxGeometry(w,.7,dd),bl);b.position.set(px,.36,pz);g.add(b);}
    for(const sx of [-.85,.85])for(const sz of [-1.05,1.05]){const p=new THREE.Mesh(new THREE.BoxGeometry(.1,2.2,.1),wt);p.position.set(sx,1.1,sz);g.add(p);}
    g.position.set(P[0][0],P[0][1],P[0][2]);scene.add(g);R.m=g;}
  /* earthlight glow on the dome and a beacon on the antenna */
  {const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffd060,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.35}));sp.scale.set(12,12,1);sp.position.set(128.5,MJG+3,156.5);scene.add(sp);}}
function mjRailPos(t){const P=MJ.rail.pts;let i=0,acc=0;while(i<P.length-1){const a=P[i],b=P[i+1];const L=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);if(acc+L>=t){const k=(t-acc)/L;return [a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k,Math.atan2(b[0]-a[0],b[2]-a[2]),false];}acc+=L;i++;}const e=P[P.length-1];return [e[0],e[1],e[2],0,true];}
function mjTick(dt,tt){const P=FP.p,V=FP.v,R=MJ.rail;
  if(MJ.earth)MJ.earth.rotation.y+=dt*.02;
  if(R){R.cool=Math.max(0,R.cool-dt);
    if(R.on){R.t+=dt*R.dir*6;const end=R.dir>0?mjRailPos(R.t)[4]:R.t<=0;if(R.t<0)R.t=0;const [x,y,z,yaw]=mjRailPos(R.t);R.m.position.set(x,y,z);R.m.rotation.y=yaw;
      if(FP.on){FP.p.set(x,y+.12,z);FP.v.set(0,0,0);FP.ground=true;FP.safe.copy(FP.p);}
      if(end){R.on=false;R.cool=1;R.out=1;if(FP.on){if(R.dir>0)FP.p.set(MJ.obs.x-2.5,MJ.obs.y+.02,MJ.obs.z);else FP.p.set(R.st.x+1.6,R.st.y+.02,R.st.z);FP.safe.copy(FP.p);}tone(784,.15,"sine",.05);tone(1047,.2,"sine",.04,.12);
        if(R.dir>0)toast("Stigla si do opservatorija! Za povratak opet uđi u monorail.",3600);}}
    else if(FP.on&&R.cool<=0&&!FP.mount&&!PW.fly){const [x,y,z]=mjRailPos(R.t);if(R.out){if(Math.hypot(P.x-x,P.z-z)>1.5)R.out=0;}else if(Math.hypot(P.x-x,P.z-z)<1&&Math.abs(P.y-y)<1.3){R.on=true;R.dir=R.t>1?-1:1;tone(523,.2,"sine",.04);tone(659,.2,"sine",.04,.12);tipOnce("mj_rail","Monorail kreće! Drži se.",2600);}}}
  if(!FP.on)return;
  /* low gravity: the fox falls slowly and every jump goes high */
  const M=FP.mount&&RIDES[FP.mount.k];if(!FP.ground&&!FP.swim&&!PW.fly&&!R.on&&!(M&&M.air)){V.y+=19*dt;if(Math.random()<dt*2&&V.y>0)mgSpawn({t:"spark",x:P.x,y:P.y,z:P.z,vy:-.3,life:.8,size:.12,size2:.04,col:[0xd8dce8],op:.6});}
  if(FP.ground&&Math.hypot(V.x,V.z)>2&&Math.random()<dt*6)mgSpawn({t:"spark",x:P.x,y:P.y+.05,z:P.z,vy:.4,vx:(Math.random()-.5)*.6,vz:(Math.random()-.5)*.6,grav:.4,life:1.4,size:.12,size2:.1,col:[0xc8ccd8,0xe8ecf4],op:.7});
  tipOnce("mj_grav","Na Mjesecu je gravitacija slaba! Skoči i vidi kako visoko letiš.",4800);
  if(Math.hypot(P.x-R.st.x,P.z-R.st.z)<6&&!R.on)tipOnce("mj_stanica","Stanica monoraila! Uđi u kabinu i vozi se do opservatorija na stijeni.",4200);
  if(Math.hypot(P.x-MJ.gantry.x,P.z-MJ.gantry.z)<6)tipOnce("mj_toranj","Lansirni toranj! Police su na svakih nekoliko kockica. Na Mjesecu ih lako doskočiš.",4600);
  if(Math.hypot(P.x-MJ.cannon.x,P.z-MJ.cannon.z)<4)tipOnce("mj_top","Elektromagnetski top! Stani na svijetlu ploču.",3600);
  if(Math.hypot(P.x-MJ.sky.x,P.z-MJ.sky.z)<6)tipOnce("mj_rupa","Okrugla rupa vodi u lavinu cijev! Ne boj se, na Mjesecu padaš polako.",4600);}
function mjTalk(){const n=wStars("mjesec");const need=["mjzec","robot"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.mjesec&&S.wst.mjesec[s.k]));
  const L=n>=WSTAR_N?"Zlatna kupola je otvorena! Nalazi se sjeverno od postaje, između postaje i Velikog kratera.":
    n===0?"Dobro došla na Mjesec! Ja sam astronaut Luka. Po Mjesecu je raspršeno deset mjesečevih kristala. Kad ih skupiš, otvorit će se Zlatna kupola. I pazi: ovdje skačeš visoko kao nikad!":
    "Imaš "+n+" od "+WSTAR_N+" mjesečevih kristala. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" Na Mjesecu ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

{const _te=tickEnv;tickEnv=function(dt){_te(dt);if(WORLD==="mjesec"&&typeof mdCS!=="undefined")mdCS.value.z=0;};}
(function(){const D=ITEM_DRAW;
  D.w_mjesec=(x,P)=>{x.fillStyle="#05060e";x.fillRect(0,0,64,64);x.fillStyle="#ffffff";for(let i=0;i<14;i++)x.fillRect((i*37)%60,(i*23)%36,1.5,1.5);
    x.fillStyle="#2a6ae8";x.beginPath();x.arc(46,16,9,0,7);x.fill();x.fillStyle="#3a9a4a";x.beginPath();x.arc(44,14,4,0,7);x.fill();
    P([[0,64],[0,42],[20,38],[44,44],[64,40],[64,64]],"#a8acb8");x.fillStyle="#8a8e9a";x.beginPath();x.ellipse(22,52,9,3,0,0,7);x.fill();P([[30,44],[34,24],[38,44]],"#f4f4f8");P([[32,24],[34,18],[36,24]],"#e8402a");};
  D.mg_trail_prasina=(x)=>{const c=["#d8dce8","#b8bcc8","#ffffff"];for(let i=0;i<22;i++){x.fillStyle=c[i%3];x.globalAlpha=.6+(i%3)*.15;x.beginPath();x.arc(8+(i*37)%50,8+(i*23)%50,2+(i%4),0,7);x.fill();}x.globalAlpha=1;};})();

pwWorld("mjesec",{dist:"gora",lv:14,n:"Mjesečeva postaja",d:"Raketom na Mjesec! Slaba gravitacija i skokovi do neba, krateri, Mjesečeva postaja sa staklenikom, monorail do opservatorija, lebdeći asteroidi, lavina cijev i Zemlja na crnom nebu.",
  feat:["Astronautkinja Vega","Mjesečev zec Skok","Robot Bip","slaba gravitacija","monorail","lebdeći asteroidi"],fr:["kvarc","bijela","svjetlo"],ca:0xe8f0ff,cb:0x4a5ab8,sea:0,fog:.0009,noClouds:1,
  preset:PRESETS.mjesec,
  gen:mjGen,env:mjEnv,life:mjLife,talk:mjTalk,tick:mjTick,itemMesh:mjItem,itemCol:[0xe8f0ff,0xffd060,0x9ab0ff],itemBurst:[[.9,.95,1],[1,.85,.4],[.6,.7,1]],itemFx:"star",
  item:{one:"Mjesečev kristal",hud:"Mjesečevi kristali",done:"Svi mjesečevi kristali!",all:"Svih 10 mjesečevih kristala! Zlatna kupola se otvorila!",first:"Prvi mjesečev kristal! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Mjesečeva postaja! Mjesečevi kristali: "+wStars("mjesec")+" / "+WSTAR_N+". Astronaut Luka te čeka kod portala.",
  facts:{postaja:"Međunarodna svemirska postaja kruži oko Zemlje i obiđe je šesnaest puta svaki dan. Astronauti tamo vide šesnaest izlazaka sunca dnevno!",
    raketa:"Prvi ljudi na Mjesecu bili su Neil Armstrong i Buzz Aldrin, 1969. godine. Njihovi otisci stopala još su tamo, jer na Mjesecu nema vjetra koji bi ih otpuhao.",
    opservatorij:"S Mjeseca se zvijezde vide i danju, jer Mjesec nema zrak koji bi raspršio sunčevu svjetlost. Nebo je uvijek crno!",
    krater:"Krateri nastaju kad u Mjesec udari svemirska stijena, meteorit. Mjesec ih ima stotine tisuća!",
    asteroidi:"Asteroidi su stijene koje kruže oko Sunca. Neki su mali kao kamenčić, a neki veliki kao cijela država.",
    top:"Na Mjesecu nema zraka, pa nema ni zvuka. Kad bi netko vikao, ne bi ga čula, čak i da stoji tik do tebe!",
    led:"Na dnu nekih kratera na Mjesecu sunce nikad ne sja. Tamo se skriva led, voda koju bi astronauti jednom mogli piti.",
    signal:"Radio-antene šalju poruke kroz svemir. Signal od Mjeseca do Zemlje putuje malo više od jedne sekunde.",
    cijev:"Lavine cijevi su tuneli koje je davno izdubila užarena lava. Znanstvenici misle da bi u njima jednom mogle biti kuće za astronaute.",
    orbita:"Mjesec se uvijek okreće Zemlji istom stranom. Zato sa Zemlje nikad ne vidimo drugu stranu Mjeseca."},
  chat:{robot2:["Bip-bup! Čistim prašinu sa solarnih ploča.","Bip! Sve sustave provjerio sam dvaput."],mjzec2:["Hop! Na Mjesecu skačem do oblaka. Ali ovdje nema oblaka!"],"Astronaut Luka":["Pogledaj gore! Ono plavo na nebu je naša Zemlja."]},
  finale:{chest:"mj_blago",isl:"kupola",at:{x:128,z:156},rewards:["skin:astronaut","trail:prasina"],locked:"Kristalna vrata Zlatne kupole su zatvorena. Skupi svih 10 mjesečevih kristala!",
    kicker:"Zlatna kupola je otvorena!",title:"Blago Mjesečeve postaje",sub:"Lisica astronautkinja i Mjesečeva prašina sad su tvoji. Astronaut Luka kaže da si prava astronautkinja!"}});
