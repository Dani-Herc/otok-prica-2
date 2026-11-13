/* =================== OP2 v10: Slatkišna zemlja (portal world of Cvjetna dolina) =================== */
/* A land made of sweets. A chocolate river with a chocolate waterfall, a bombon castle, a three-tier cake you reach
   from a popcorn machine, an ice cream mountain with a wafer path, cotton candy clouds you bounce on, a soda geyser that
   lifts you to a floating doughnut, a gingerbread village, jelly drums, a rock candy cave and a sugar beach. */
MSKIN.bombon={n:"Bombon lisica",d:"Ružičasto-bijelo krzno kao šećerna vuna, sa šarenim mrvicama. Miriše na jagode!",p:0,rar:"l",O:0xff8ac8,W:0xfff0f8,B:0x6a2a4a,D:0x8ae0ff,glowO:.06,fx:"duga",wr:"Slatkišna zemlja"};
MTRAIL.mrvice={n:"Šarene mrvice",d:"Iza Ride padaju šarene šećerne mrvice, kao s torte.",p:0,rar:"l",wr:"Slatkišna zemlja"};
TR.mrvice=p=>mgSpawn({t:"spark",x:p.x+(Math.random()-.5)*.5,y:p.y+.5+Math.random()*.4,z:p.z+(Math.random()-.5)*.5,vy:1.2,vx:(Math.random()-.5),vz:(Math.random()-.5),grav:5,life:1.1,size:.16,size2:.12,col:[0xff6aa8,0x6ac8ff,0xffe04a,0x8ae86a,0xffffff,0xc89aff],op:1});TRATE.mrvice=12;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);return it;};ins("skin","bombon",MSKIN.bombon);ins("trail","mrvice",MTRAIL.mrvice);}
PRESETS.slatko={top:0x6aa8f8,hz:0xf8c8e8,sun:0xffeef4,si:1.7,hemi:.72,el:.62,az:1.5,fog:0xf0c8e4,glow:.4,stars:0,sh:0xd890c0,dp:0x8a4a6a,exp:.84,night:0};

/* chocolate: the block-water shader gets colour uniforms; this world turns them brown, every other world keeps blue */
{const M=waterBlockMat;M.uniforms.uBase={value:new THREE.Color(.22,.52,.86)};M.uniforms.uHi={value:new THREE.Color(.55,.8,1)};M.uniforms.uA={value:.78};
  const f=M.fragmentShader;const g=f.replace("void main(){vec3 base=vec3(.22,.52,.86);","uniform vec3 uBase,uHi;uniform float uA;void main(){vec3 base=uBase;").replace("c=mix(base,vec3(.55,.8,1.),","c=mix(base,uHi,").replace("a=.78;","a=uA;").replace("vec3(.85,.95,1.)","uHi*1.15");
  if(g!==f){M.fragmentShader=g;M.needsUpdate=true;}}
function szChoc(on){const U=waterBlockMat.uniforms;if(!U.uBase)return;if(on){U.uBase.value.setRGB(.30,.15,.07);U.uHi.value.setRGB(.55,.33,.18);U.uA.value=.95;}else{U.uBase.value.setRGB(.22,.52,.86);U.uHi.value.setRGB(.55,.8,1);U.uA.value=.78;}}
{const _lw=leaveWorld;leaveWorld=function(){const r=_lw.apply(this,arguments);szChoc(false);return r;};}

/* ---------- creatures (blocky) ---------- */
function szGummy(R,L){return function(){const K=0x1a1a1a,hd={name:"head",px:0,py:.95,pz:.05};
  const g=mk([[.6,.62,.5,0,.48,0,R],[.36,.4,.06,0,.46,.25,L],[.2,.3,.2,-.17,.12,0,R],[.2,.3,.2,.17,.12,0,R],[.16,.4,.16,-.38,.6,.04,R],[.16,.4,.16,.38,.6,.04,R],
    [.52,.44,.44,0,1.0,.05,R,hd],[.15,.15,.1,-.18,1.26,0,R,hd],[.15,.15,.1,.18,1.26,0,R,hd],[.22,.14,.1,0,.92,.3,L,hd],[.08,.06,.04,0,.97,.36,K,hd],[.07,.08,.02,-.11,1.06,.275,K,hd],[.07,.08,.02,.11,1.06,.275,K,hd]]);
  g.traverse(o=>{if(o.isMesh&&o.material&&o.material.color){const c=o.material.color.getHex();if(c===LC(R)||c===LC(L))o.material=new THREE.MeshStandardMaterial({color:o.material.color.clone(),emissive:o.material.color.clone(),emissiveIntensity:.18,roughness:.08,transparent:true,opacity:.86});}});return g;};}
MODELS.gumko=szGummy(0xff3a4a,0xff9aa0);MODELS.gumko_z=szGummy(0x4ad83a,0xb0f09a);MODELS.gumko_y=szGummy(0xffc81a,0xfff09a);MODELS.gumko_p=szGummy(0x3a8aff,0xa0d0ff);
MODELS.ovcica=function(){const P=0xffa8d8,L=0xffd0ea,F=0xffe8d8,K=0x2a1a2a,D=0x8a5a6a,hd={name:"head",px:0,py:.9,pz:.55};
  const sp=[[.8,.6,1,0,.72,0,P],[.12,.42,.12,-.24,.22,.3,D],[.12,.42,.12,.24,.22,.3,D],[.12,.42,.12,-.24,.22,-.3,D],[.12,.42,.12,.24,.22,-.3,D],
    [.34,.38,.36,0,.9,.66,F,hd],[.42,.18,.3,0,1.1,.6,P,hd],[.16,.08,.24,-.24,.96,.58,F,hd],[.16,.08,.24,.24,.96,.58,F,hd],[.07,.08,.02,-.08,.94,.845,K,hd],[.07,.08,.02,.08,.94,.845,K,hd],[.08,.05,.02,0,.82,.845,0xd86a8a,hd]];
  for(const [x,y,z] of [[-.3,1.02,.25],[.3,1.02,-.1],[0,1.08,-.35],[-.28,1.0,-.38],[.26,.98,.32],[0,1.1,.12],[-.4,.7,0],[.4,.7,.1],[0,.62,-.52]])sp.push([.34,.3,.34,x,y,z,L]);return mk(sp);};
MODELS.ovcica2=()=>MODELS.ovcica();
MODELS.medenjak=function(){const G=0xc07a3a,Wt=0xfff6ee,K=0x2a1a10,R=0xe0303a,hd={name:"head",px:0,py:1.12,pz:0};
  return mk([[.5,.6,.22,0,.62,0,G],[.5,.14,.2,-.46,.8,0,G],[.5,.14,.2,.46,.8,0,G],[.17,.42,.2,-.13,.18,0,G],[.17,.42,.2,.13,.18,0,G],
    [.06,.16,.02,-.66,.8,.105,Wt],[.06,.16,.02,.66,.8,.105,Wt],[.17,.05,.02,-.13,.08,.105,Wt],[.17,.05,.02,.13,.08,.105,Wt],
    [.09,.09,.02,0,.78,.115,R],[.09,.09,.02,0,.58,.115,0x3ac84a],[.09,.09,.02,0,.4,.115,0x3a8aff],
    [.46,.42,.22,0,1.12,0,G,hd],[.07,.07,.02,-.1,1.18,.115,K,hd],[.07,.07,.02,.1,1.18,.115,K,hd],[.2,.04,.02,0,1.03,.115,Wt,hd],[.04,.04,.02,-.12,1.06,.115,Wt,hd],[.04,.04,.02,.12,1.06,.115,Wt,hd]]);};
MODELS.medenjak2=()=>MODELS.medenjak();
MODELS.medenka=function(){const G=0xc07a3a,Wt=0xfff6ee,K=0x2a1a10,P=0xff7ab0,hd={name:"head",px:0,py:1.14,pz:0};
  return mk([[.5,.4,.22,0,.78,0,G],[.66,.42,.36,0,.36,0,P],[.5,.38,.04,0,.44,.2,Wt],[.5,.14,.2,-.46,.82,0,G],[.5,.14,.2,.46,.82,0,G],[.16,.12,.2,-.13,.08,0,G],[.16,.12,.2,.13,.08,0,G],
    [.46,.42,.22,0,1.14,0,G,hd],[.07,.07,.02,-.1,1.2,.115,K,hd],[.07,.07,.02,.1,1.2,.115,K,hd],[.2,.04,.02,0,1.05,.115,Wt,hd],[.1,.06,.02,-.17,1.1,.115,0xff9ab0,hd],[.1,.06,.02,.17,1.1,.115,0xff9ab0,hd],
    [.5,.1,.26,0,1.36,-.02,Wt,hd],[.22,.2,.2,0,1.46,-.1,Wt,hd],[.1,.1,.04,0,.92,.115,P]]);};
pwPets("slatko","dolina",[
  {k:"gumko",fav:"bobice",n:"Gumeni medo Gumko",d:"Crveni gumeni medvjedić koji se klima kad hoda. Prozirni je i svjetluca na suncu, a skače kao lopta!",gd:"Iz Slatkišne zemlje donosi jagode i zlatnike.",gift:()=>[["bobice",4],["coins",20]],spd:1.6,
   spec:{n:"Gumeni skok",d:"Gumko odskače kao lopta, i to dvaput zaredom! Juri brže od svih.",ride:1,ic:"star"},ride:{land:1,speed:10.6,jump:12,dbl:1,seat:1.25},tip:"Gumko te nosi! Skoči dvaput zaredom."},
  {k:"ovcica",fav:"bobice",n:"Ovčica Vunica",d:"Ružičasta ovčica od šećerne vune. Toliko je lagana da lebdi kao oblačić.",gd:"S oblaka donosi šećernu vunu i zlatnike.",gift:()=>[["bobice",3],["coins",16]],spd:1.1,
   spec:{n:"Let na oblačiću",d:"Vunica lebdi s tobom iznad cijele Slatkišne zemlje! Skok je gore, Roni je dolje.",ride:1,ic:"star"},ride:{air:1,land:1,speed:8.8,jump:9,seat:1.2},tip:"Vunica leti! Skok je gore, Roni je dolje."}]);
PWIT.jagoda={n:"Jagoda",mk:g=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.3,.32,.3),std(0xe8283a,{emissive:LC(0x801018),emissiveIntensity:.3}));g.add(b);const t=new THREE.Mesh(new THREE.BoxGeometry(.2,.2,.2),std(0xe8283a));t.position.y=-.2;g.add(t);
  const l=new THREE.Mesh(new THREE.BoxGeometry(.34,.06,.34),std(0x3ab83a));l.position.y=.18;g.add(l);for(const [x,y,z] of [[.1,.06,.16],[-.08,-.06,.16],[.16,-.02,-.04]]){const s=new THREE.Mesh(new THREE.BoxGeometry(.04,.04,.02),std(0xfff0a0));s.position.set(x,y,z);g.add(s);}},glow:0xff8a9a};
PWIT.vunica={n:"Šećerna vuna",mk:g=>{const m=std(0xffb0e0,{emissive:LC(0xff6ab8),emissiveIntensity:.25});for(const [x,y,z,s] of [[0,.1,0,.34],[.14,0,.06,.24],[-.12,.02,-.06,.26],[0,.24,-.04,.22]]){const b=new THREE.Mesh(new THREE.BoxGeometry(s,s,s),m);b.position.set(x,y,z);g.add(b);}
  const st=new THREE.Mesh(new THREE.BoxGeometry(.05,.4,.05),std(0xfff6ee));st.position.y=-.26;g.add(st);},glow:0xffb0e0};
PWIT.bombon={n:"Bombon",mk:g=>{const c=new THREE.Mesh(new THREE.BoxGeometry(.24,.24,.24),std(0x5ab8ff,{emissive:LC(0x2a6ad8),emissiveIntensity:.3}));g.add(c);for(const s of [-1,1]){const w=new THREE.Mesh(new THREE.ConeGeometry(.14,.2,6).rotateZ(s*Math.PI/2),std(0xfff06a));w.position.x=s*.2;g.add(w);}},glow:0x8ad0ff};
function szItem(){const g=new THREE.Group();const m=new THREE.MeshStandardMaterial({color:LC(0xff7ac0),emissive:LC(0xff3a9a),emissiveIntensity:.7,roughness:.15,metalness:.2});
  const b=new THREE.Mesh(new THREE.SphereGeometry(.26,16,12),m);g.add(b);const s=new THREE.MeshStandardMaterial({color:LC(0xffffff),emissive:LC(0xffe0f0),emissiveIntensity:.5,roughness:.2});
  const st=new THREE.Mesh(new THREE.TorusGeometry(.26,.04,6,20),s);st.rotation.x=Math.PI/2;g.add(st);const st2=st.clone();st2.rotation.set(0,0,Math.PI/2);g.add(st2);
  for(const sx of [-1,1]){const w=new THREE.Mesh(new THREE.ConeGeometry(.2,.26,8).rotateZ(sx*Math.PI/2),new THREE.MeshStandardMaterial({color:LC(0xfff0a0),emissive:LC(0xffd040),emissiveIntensity:.5,roughness:.3,flatShading:true}));w.position.x=sx*.36;g.add(w);}
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffb0e0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.8}));sp.scale.set(2.2,2.2,1);g.add(sp);return g;}

/* ---------- the land ---------- */
const SZG=SL+2;
const SZ={river:[],bub:[],puffs:[],jag:[],vun:[],bom:[],clouds:[]};
const szZc=x=>150+Math.sin((x-46)/24)*5;
function szH(x,z){let h=SZG+Math.round((fbm(x*.03+2,z*.03+9)-.5)*3);const e=Math.max(Math.abs(x-128),Math.abs(z-128));if(e>104)h=Math.max(h,SZG+Math.round((e-104)*2.4+fbm(x*.1,z*.1)*5));
  {const d=Math.hypot(x-70,z-84);if(d<18)h=Math.max(h,SZG+Math.round(26*(.5+.5*Math.cos(Math.PI*d/18))));}
  if(x<46&&Math.abs(z-150)<18)h=Math.max(h,SZG+14+Math.round(fbm(x*.1,z*.1)*3));
  if(x>=46&&x<=231){const d=Math.abs(z-szZc(x));if(d<2.6)h=SZG-3;else if(d<3.8)h=Math.min(h,SZG);}
  return h;}
function szGen(){const Y=(x,z)=>hmap[x+z*W];const busy=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X>=0&&Z>=0&&X<W&&Z<W)mask[X+Z*W]=2;}};
  const flat=(x0,z0,x1,z1,g)=>{for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){for(let y=1;y<g;y++)if(!prot[I(x,y,z)])vox[I(x,y,z)]=y===g-1?T.vuna_l:T.blato;for(let y=g;y<H;y++)if(!prot[I(x,y,z)])vox[I(x,y,z)]=0;hmap[x+z*W]=g;}};
  for(let z=0;z<W;z++)for(let x=0;x<W;x++){const h=Math.max(2,szH(x,z));hmap[x+z*W]=h;const e=Math.max(Math.abs(x-128),Math.abs(z-128));const md=Math.hypot(x-70,z-84);const pink=fbm(x*.05+7,z*.05+1)>.62;
    for(let y=0;y<h;y++){let t=T.blato;
      if(md<18&&y>=SZG){const r=y-SZG+Math.round((hash2(x,z,3)-.5)*2);t=r<8?T.blato:r<17?T.vuna_r:T.snijeg;if(y===h-1&&t===T.snijeg&&hash2(x,z,8)<.06)t=[T.vuna_z,T.vuna_p,T.vuna_l,T.vuna_c][Math.floor(hash2(x,z,9)*4)];}
      else if(e>100&&h>SZG+5)t=y===h-1?T.snijeg:(y%3===0?T.vuna_s:T.sijeno);
      else if(x<46&&Math.abs(z-150)<18&&h>SZG+5)t=y===h-1?T.snijeg:(y%3===0?T.vuna_s:T.sijeno);
      else if(y===h-1)t=pink?T.vuna_r:T.vuna_l;else if(y===h-4)t=T.vuna_c;
      vox[I(x,y,z)]=t;}
    if(h<SZG-1)for(let y=h;y<SZG-1;y++)vox[I(x,y,z)]=T.voda;}
  busy(128,190,9);busy(124,184,4);
  /* ----- the chocolate waterfall with a cave behind it ----- */
  {const fx=46,fz=150;const top=Y(fx-3,fz);for(let y=SZG-3;y<top;y++)for(let b=-2;b<=2;b++){vox[I(fx,y,fz+b)]=T.voda;prot[I(fx,y,fz+b)]=1;}
    for(let b=-2;b<=2;b++)for(let a=1;a<=5;a++){vox[I(fx-a,SZG-2,fz+b)]=T.vuna_s;for(let y=SZG-1;y<SZG+3;y++)vox[I(fx-a,y,fz+b)]=0;}
    for(const b of [-2,2])wput(fx-4,SZG+1,fz+b,T.lampion,1);for(let a=1;a<=5;a++)for(const b of [-3,3])for(let y=SZG-1;y<SZG+3;y++)if(!get(fx-a,y,fz+b))wput(fx-a,y,fz+b,T.sijeno,1);
    wStar("slap",fx-3.5,SZG-.1,fz+.5,"U špilji iza čokoladnog slapa na zapadu. Proplivaj kroz slap!");SZ.fall={x:fx+.5,y0:SZG-2,y1:top,z:fz+.5};busy(fx,fz,6);POI.push({k:"s_slap",n:"Čokoladni slap",x:fx,z:fz,r:6});}
  /* ----- candy cane bridges ----- */
  for(const bx of [128,86,176]){const zc=Math.round(szZc(bx));for(let a=-4;a<=4;a++)for(let w=-2;w<=2;w++){const z=zc+a,x=bx+w;for(let y=SZG;y<SZG+4;y++)if(!prot[I(x,y,z)])vox[I(x,y,z)]=0;wput(x,SZG-1,z,Math.abs(w)===2?T.vuna_c:T.vuna_s,1);
      if(Math.abs(w)===2)wput(x,SZG,z,(a&1)?T.crvena:T.vuna_b,1);}busy(bx,zc,5);}
  /* ----- the bombon castle (finale) ----- */
  {const cx=128,cz=104,g=SZG;flat(114,90,142,116,g);const x0=118,x1=138,z0=97,z1=111;
    for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){const edge=x===x0||x===x1||z===z0||z===z1;for(let y=g;y<g+8;y++){if(!edge&&y<g+7)continue;
        if(z===z1&&Math.abs(x-cx)<=1&&y<g+3){wput(x,y,z,T.kristal,1);WG.gate.push([x,y,z]);continue;}
        let t=y===g?T.vuna_lj:(y===g+7?T.vuna_r:((y-g)%3===0?T.vuna_b:T.vuna_r));if(edge&&y===g+4&&(x+z)%4===0&&!(z===z1&&Math.abs(x-cx)<=2))t=T.staklo;wput(x,y,z,t,1);}
      if((x===x0||x===x1||z===z0||z===z1)&&(x+z)%2===0)wput(x,g+8,z,T.vuna_r,1);}
    for(let x=cx-2;x<=cx+2;x++)wput(x,g+3,z1,T.vuna_z,1);wput(cx-2,g+2,z1,T.vuna_z,1);wput(cx+2,g+2,z1,T.vuna_z,1);
    for(const [x,z] of [[x0+2,z0+2],[x1-2,z0+2],[x0+2,z1-2],[x1-2,z1-2]])wput(x,g+5,z,T.lampion,1);
    const tower=(tx,tz,r,h,c1,c2,cap)=>{for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const d=Math.hypot(dx,dz);if(d>r)continue;for(let y=g;y<g+h;y++)wput(tx+dx,y,tz+dz,(y-g)%4<2?c1:c2,1);
        if(d>r-1&&(dx+dz)%2===0)wput(tx+dx,g+h,tz+dz,c1,1);}
      for(let k=0;k<7;k++){const rr=r+.6-k*.62;if(rr<.4)break;for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++)if(Math.hypot(dx,dz)<=rr)wput(tx+dx,g+h+1+k,tz+dz,k%2?cap:T.vuna_b,1);}
      wput(tx,g+h+8,tz,T.svjetlo,1);};
    tower(x0,z0,2.8,12,T.vuna_p,T.vuna_b,T.vuna_z);tower(x1,z0,2.8,12,T.vuna_p,T.vuna_b,T.vuna_z);tower(x0,z1,2.8,12,T.vuna_l,T.vuna_b,T.vuna_r);tower(x1,z1,2.8,12,T.vuna_l,T.vuna_b,T.vuna_r);
    tower(cx,z0-3,3.8,17,T.vuna_lj,T.vuna_r,T.vuna_z);
    WG.isl.dvorac={x:cx,z:cz,y:g,r:7};addChest("s_blago",cx,g,cz-1,"Blago bombonskog dvorca");busy(cx,cz,16);POI.push({k:"s_dvorac",n:"Bombonski dvorac",x:cx,z:cz,r:14});}
  /* ----- the three-tier cake and the popcorn machine ----- */
  {const cx=170,cz=90,g=SZG;flat(154,74,186,106,g);const tiers=[[13,6],[9,6],[5,6]];let top=g;
    tiers.forEach(([r,h],i)=>{const b=g+i*6;for(let dz=-14;dz<=14;dz++)for(let dx=-14;dx<=14;dx++){const d=Math.hypot(dx,dz);if(d>r+.3)continue;const side=d>r-.8;
        for(let y=b;y<b+h;y++){const rel=y-b;let t=rel===h-1?T.vuna_r:(rel===2?T.vuna_c:T.blato);if(side&&rel>=h-3&&rel<h-1&&hash3(cx+dx,y,cz+dz)<.45)t=T.vuna_r;if(side&&rel<h-1&&rel!==2&&hash3(cx+dx,y+5,cz+dz)<.08)t=T.vuna_b;wput(cx+dx,y,cz+dz,t,1);}}
      top=b+h;if(i<2)for(let k=0;k<12;k++){const a=k/12*6.283,X=Math.round(cx+Math.cos(a)*(r-1.4)),Z=Math.round(cz+Math.sin(a)*(r-1.4));wput(X,top,Z,k%2?T.crvena:T.vuna_b,1);}});
    for(let k=0;k<6;k++){const a=k/6*6.283,X=Math.round(cx+Math.cos(a)*3),Z=Math.round(cz+Math.sin(a)*3);for(let y=top;y<top+3;y++)wput(X,y,Z,k%2?T.vuna_z:T.vuna_p,1);wput(X,top+3,Z,T.svjetlo,1);}
    wStar("torta",cx+.5,top+.9,cz+.5,"Na vrhu goleme torte, među svjećicama. Stroj za kokice kraj torte te ispali gore!");SZ.cake={x:cx+.5,y:top,z:cz+.5};
    const mx=174,mz=114;flat(166,109,179,119,g);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){for(let y=g;y<g+2;y++)wput(mx+dx,y,mz+dz,(dx+dz)&1?T.vuna_b:T.vuna_c,1);for(let y=g+2;y<g+4;y++)wput(mx+dx,y,mz+dz,(dx||dz)?T.staklo:T.sijeno,1);wput(mx+dx,g+4,mz+dz,T.vuna_c,1);}wput(mx,g+5,mz,T.vuna_z,1);
    wput(170,g-1,114,T.vuna_z,1);wput(169,g-1,114,T.vuna_c,1);wput(171,g-1,114,T.vuna_c,1);
    pwLaunch({k:"kokice",x:170.5,y:g,z:114.5,to:[170.5,0,90.5],h:14,dur:2.4,col:[0xfff6d0,0xffe080,0xffffff],msg:"PUF! Stroj za kokice te ispalio ravno na tortu!"});SZ.pop={x:mx+.5,y:g+4,z:mz+.5};
    addChest("s_torta",cx+11,g+6,cz,"Škrinja na torti");busy(cx,cz,16);busy(mx,mz,3);busy(170,114,2);POI.push({k:"s_torta",n:"Golema torta",x:cx,z:cz,r:14});}
  /* ----- the ice cream mountain with a wafer path spiralling up ----- */
  {const cx=70,cz=84,top=SZG+25;let last=null;for(let i=0;i<=900;i++){const t=i/900,a=.8+t*2.25*6.283,r=16.5-13.5*t,y=SZG+Math.round(t*(top-SZG));
      for(const w of [0,1]){const x=Math.round(cx+Math.cos(a)*(r+w)),z=Math.round(cz+Math.sin(a)*(r+w));for(let yy=y-1;yy>=SZG-1&&(!get(x,yy,z)||yy===y-1);yy--)wput(x,yy,z,yy===y-1?T.sijeno:T.vuna_s,1);for(let yy=y;yy<y+4;yy++)if(!prot[I(x,yy,z)])vox[I(x,yy,z)]=0;}
      last=[cx+Math.cos(a)*r,y,cz+Math.sin(a)*r];}
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)for(let dy=-2;dy<=2;dy++)if(dx*dx+dz*dz+dy*dy<=4.6)wput(cx+dx,top+3+dy,cz+dz,T.crvena,1);for(let k=0;k<3;k++)wput(cx+(k>1?1:0),top+6+k,cz,T.vuna_zl,1);
    wStar("sladoled",last[0],last[1]+.9,last[2],"Na vrhu Sladoledne planine, kraj trešnje. Penji se vafl-stazom oko planine!");busy(cx,cz,20);POI.push({k:"s_sladoled",n:"Sladoledna planina",x:cx,z:cz,r:18});
    addChest("s_planina",Math.round(cx+Math.cos(.8)*17),SZG,Math.round(cz+Math.sin(.8)*17)+2,"Škrinja pod planinom");}
  /* ----- cotton candy clouds you bounce on ----- */
  {flat(104,118,112,126,SZG);const P=[[108,122,-1],[106,118,2],[102,115,5],[101,111,8],[104,107,11],[108,104,14],[106,100,17],[102,97,20]];P.forEach(([x,z,dy],i)=>{const y=SZG+dy;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){wput(x+a,y,z+b,T.skocni,1);if(i&&Math.abs(a)+Math.abs(b)<2)wput(x+a,y-1,z+b,T.skocni,1);}
      if(i)for(const [a,b] of [[-2,0],[2,0],[0,-2],[0,2]])wput(x+a,y-1,z+b,T.oblak,1);busy(x,z,2);});
    const ix=100,iz=91,iy=SZG+23;for(let dz=-5;dz<=5;dz++)for(let dx=-6;dx<=6;dx++){const d=Math.hypot(dx/1.2,dz);if(d>4.8)continue;wput(ix+dx,iy,iz+dz,hash2(dx,dz,5)<.3?T.skocni:T.oblak,1);if(d<3.6)wput(ix+dx,iy-1,iz+dz,T.oblak,1);if(d<2)wput(ix+dx,iy-2,iz+dz,T.oblak,1);}
    for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)wput(ix+dx,iy,iz+dz,T.oblak,1);
    wStar("oblak",ix+.5,iy+1.9,iz+.5,"Na oblaku od šećerne vune iznad bombonskog dvorca. Skači po ružičastim oblačićima, jedan po jedan!");addChest("s_oblak",ix-3,iy+1,iz,"Škrinja na oblaku");
    SZ.cloudStart={x:108.5,z:122.5};busy(ix,iz,6);POI.push({k:"s_oblak",n:"Oblaci od šećerne vune",x:106,z:110,r:10});}
  /* ----- the soda geyser and the floating doughnut ----- */
  {const gx=192,gz=130,g=Y(gx,gz);flat(gx-4,gz-4,gx+4,gz+4,g);for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d<1.6)wput(gx+dx,g-1,gz+dz,T.vuna_p,1);else if(d<3.2){wput(gx+dx,g-1,gz+dz,T.vuna_ts,1);if(d>2.4)wput(gx+dx,g,gz+dz,T.vuna_ts,1);}}
    const dy=g+19;for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const d=Math.hypot(dx,dz);if(d<2.5||d>5.4)continue;wput(gx+dx,dy,gz+dz,T.sijeno,1);const sp=hash2(gx+dx,gz+dz,6);wput(gx+dx,dy+1,gz+dz,sp<.1?T.vuna_z:sp<.2?T.vuna_p:sp<.28?T.vuna_l:sp<.34?T.vuna_b:T.vuna_r,1);}
    WG.wind.push({x:gx+.5,z:gz+.5,r:1.6,y0:g,y1:dy+5,k:"sok"});SZ.gey={x:gx+.5,y:g,z:gz+.5,top:dy+5};
    wStar("krafna",gx+4.5,dy+2.9,gz+.5,"Na letećoj krafni iznad gaziranog gejzira. Stani u mjehuriće i pusti da te dignu!");busy(gx,gz,7);POI.push({k:"s_gejzir",n:"Gazirani gejzir",x:gx,z:gz,r:6});}
  /* ----- the gingerbread village ----- */
  {const house=(x,z,w,d,h,rA,rB)=>{const g=SZG;flat(x-w-2,z-d-2,x+w+2,z+d+3,g);for(let dz=-d;dz<=d;dz++)for(let dx=-w;dx<=w;dx++){const edge=Math.abs(dx)===w||Math.abs(dz)===d,corner=Math.abs(dx)===w&&Math.abs(dz)===d;
        for(let y=g;y<g+h;y++){if(!edge){vox[I(x+dx,y,z+dz)]=0;continue;}if(dz===d&&dx===0&&y<g+2)continue;let t=corner?T.vuna_b:T.zcigla;if(y===g+2&&!corner&&(dx===-2||dx===2||dz===0&&Math.abs(dx)===w))t=T.staklo;if(y===g+h-1&&!corner&&(dx+dz)%2===0)t=T.vuna_b;wput(x+dx,y,z+dz,t,1);}}
      for(let k=0;k<=d+1;k++){const y=g+h+k;for(let dx=-w-1;dx<=w+1;dx++)for(const s of [-1,1]){const dz=s*(d+1-k);wput(x+dx,y,z+dz,k===d+1?T.snijeg:(k%2?rA:rB),1);}
        if(k<=d)for(let dz=-(d-k);dz<=d-k;dz++)for(const s of [-1,1])wput(x+s*w,y,z+dz,T.zcigla,1);}
      wput(x+1,g+2,z+d+1,T.lampion,1);for(const [a,b] of [[-w-1,d+2],[w+1,d+2]])wput(x+a,g,z+b,[T.vuna_r,T.vuna_l,T.vuna_z][Math.floor(hash2(x,z+a,2)*3)],1);busy(x,z,Math.max(w,d)+3);};
    house(84,184,4,3,4,T.vuna_r,T.vuna_c);house(100,198,3,3,4,T.vuna_l,T.vuna_zl);house(68,198,3,2,3,T.vuna_p,T.vuna_t);house(100,172,3,2,4,T.vuna_lj,T.vuna_r);house(66,174,3,3,4,T.vuna_z,T.vuna_n);
    for(let h=0;h<2;h++)pwCell("medenka",84,SZG+h,187,T.vuna_c);wStar("medenjak",84.5,SZG+.9,184.5,"U kućici bake Medenke u medenjak-selu. Baki treba pomoć!");SZ.baka={x:86.5,z:189.5};
    POI.push({k:"s_selo",n:"Medenjak-selo",x:84,z:186,r:18});}
  /* ----- jelly drums ----- */
  {const cx=62,cz=124;const L=[["vuna_c",523],["vuna_z",659],["vuna_l",784],["vuna_p",988]],PP=[[-4,-2],[-1,-4],[3,-3],[4,1]],ORD=[1,3,0,2];
    const pads=PP.map(([a,b],i)=>{const x=cx+a,z=cz+b,y=Y(x,z)-1;vox[I(x,y,z)]=T[L[i][0]];prot[I(x,y,z)]=1;const ox=a>0?1:-1;for(let q=0;q<2;q++)for(let r=0;r<2;r++)for(let h=1;h<=2;h++)wput(x+ox+(ox>0?q:-q),y+h,z+r-(b<0?1:0),T[L[i][0]],1);
      return {x,y,z,f:L[i][1],col:new THREE.Color(LC(TCOL(L[i][0])))};});
    {const x=cx,z=cz+5,y=Y(x,z);for(let a=-2;a<=2;a++)for(let h=0;h<5;h++)wput(x+a,y+h,z,T.vuna_s,1);ORD.forEach((j,i)=>wput(x,y+4-i,z-1,T[L[j][0]],1));}
    {const x=cx,z=cz,y=Y(x,z);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("zele",x+a,y+h,z+b,h===2?T.vuna_r:T.vuna_lj);}wStar("zele",x+.5,y+.9,z+.5,"U ljubičastom žele-bombonu usred žele-bubnjeva. Stani na bubnjeve redom kao na čokoladnoj ploči!");}
    pwSeq("zele",{pads,order:ORD,win:"Žele-bubnjevi su odsvirali slatku pjesmu! Bombon u sredini se otvorio.",wrong:"Bum, kriva nota! Pogledaj čokoladnu ploču, odozgo prema dolje, i kreni ispočetka."});busy(cx,cz,7);POI.push({k:"s_zele",n:"Žele-bubnjevi",x:cx,z:cz,r:8});}
  /* ----- the rock candy cave in the north cliff ----- */
  {const x=180;for(let z=10;z<=28;z++)for(let a=-1;a<=1;a++){for(let y=SZG;y<SZG+4;y++){vox[I(x+a,y,z)]=0;prot[I(x+a,y,z)]=1;}vox[I(x+a,SZG-1,z)]=T.vuna_s;}
    for(let z=10;z<=26;z++)for(const a of [-2,2])for(let y=SZG;y<SZG+4;y++)if(hash3(x+a,y,z)<.5)wput(x+a,y,z,[T.ametist,T.kristal,T.vuna_ts,T.vuna_r][Math.floor(hash3(x,y,z+a)*4)],1);
    for(let z=10;z<=26;z++)for(let a=-1;a<=1;a++)if(hash3(x+a,SZG+4,z)<.35)wput(x+a,SZG+4,z,hash3(z,a,1)<.5?T.kristal:T.ametist,1);
    for(let y=SZG;y<SZG+5;y++)for(const a of [-2,2])wput(x+a,y,28,y%2?T.crvena:T.vuna_b,1);for(let a=-2;a<=2;a++)wput(x+a,SZG+4,28,a%2?T.crvena:T.vuna_b,1);
    wput(x,SZG+3,18,T.svjetlo,1);wStar("spilja",x+.5,SZG+.9,11.5,"Na kraju Špilje kamenih bombona u sjevernoj litici.");busy(x,32,4);POI.push({k:"s_spilja",n:"Špilja kamenih bombona",x,z:24,r:6});}
  /* ----- the sugar beach with buried treasure ----- */
  {const bx=196,bz=188;for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){if(Math.hypot(dx,dz)>6.2)continue;const X=bx+dx,Z=bz+dz,y=Y(X,Z)-1;vox[I(X,y,Z)]=T.pijesak;}
    const y=Y(bx,bz)-1;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){pwCell("secer",bx+a,y,bz+b,(a===b||a===-b)?T.vuna_c:T.pijesak);pwCell("secer",bx+a,y-1,bz+b,T.pijesak);}
    wStar("secer",bx+.5,y-.4,bz+.5,"Zakopano pod crvenim X-om na šećernoj plaži. Kopaj!");pwDig("secer",bx,y,bz,"Kopaš po šećeru... i eno ga! Čarobni bombon!");busy(bx,bz,7);POI.push({k:"s_plaza",n:"Šećerna plaža",x:bx,z:bz,r:7});}
  /* ----- the lollipop race and the gift box ----- */
  {const pts=[[140,168],[160,164],[184,166],[206,172],[216,190],[206,208],[182,214],[158,210],[146,198]].map(([x,z])=>[x+.5,Y(x,z)+1.6,z+.5]);for(const p of pts)busy(Math.floor(p[0]),Math.floor(p[2]),2);
    const cx=138,cz=186,g=Y(cx,cz);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)for(let h=0;h<=2;h++){if(a===0&&b===0&&h<2)continue;pwCell("staza",cx+a,g+h,cz+b,(a===0||b===0||h===2&&(a===0||b===0))?T.vuna_z:T.vuna_r);}
    wStar("staza",cx+.5,g+.9,cz+.5,"U velikom poklonu kraj portala. Otvara se kad prođeš lizalica-stazu!");busy(cx,cz,3);
    pwRings("staza",{start:[140.5,Y(140,176),176.5],pts,time:60,col:0xff6ab8,name:"Lizalica-staza",win:"Prošla si cijelu lizalica-stazu! Veliki poklon kraj portala se otvorio."});}
  /* pickups */
  SZ.jag=[[110,136],[150,130],[44,110],[208,140]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  SZ.vun=[[140,60],[100,56],[220,100]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  SZ.bom=[[56,206],[112,208],[42,182],[154,196],[90,166]].map(([x,z])=>{busy(x,z,1);return [x+.5,0,z+.5];});
  /* sweets everywhere: lollipops, candy canes, gumdrops, cupcakes */
  const LC6=[T.vuna_r,T.vuna_c,T.vuna_lj,T.vuna_p,T.vuna_z,T.vuna_n];
  for(let z=10;z<W-10;z+=7)for(let x=10;x<W-10;x+=7){const X=x+Math.floor(hash2(x,z,51)*4),Z=z+Math.floor(hash2(x,z,52)*4);if(mask[X+Z*W]||mask[X+1+Z*W]||mask[X+(Z+1)*W])continue;const g=Y(X,Z);if(g<SZG-1||g>SZG+3)continue;
    const r=hash2(X,Z,53);
    if(r<.2){const h=4+Math.floor(hash2(X,Z,54)*3),cA=LC6[Math.floor(hash2(X,Z,55)*6)],ax=hash2(X,Z,56)<.5;for(let y=g;y<g+h;y++)wput(X,y,Z,T.vuna_b);const cy=g+h+2;
      for(let u=-3;u<=3;u++)for(let v=-3;v<=3;v++){const d=Math.hypot(u,v);if(d>2.7)continue;const an=Math.atan2(v,u)+d*1.3;const band=((Math.floor((an+Math.PI*4)/(Math.PI/3))%2)+2)%2;wput(ax?X+u:X,cy+v,ax?Z:Z+u,band?cA:T.vuna_b);}}
    else if(r<.29){const h=5+Math.floor(hash2(X,Z,57)*3);for(let y=g;y<g+h;y++)wput(X,y,Z,(y-g)%2?T.vuna_b:T.crvena);const dx=hash2(X,Z,58)<.5?1:-1;wput(X+dx,g+h,Z,T.crvena);wput(X+2*dx,g+h-1,Z,T.vuna_b);wput(X+2*dx,g+h-2,Z,T.crvena);wput(X,g+h,Z,T.vuna_b);}
    else if(r<.47){const c=[T.vuna_l,T.vuna_n,T.vuna_z,T.vuna_lj,T.vuna_r,T.vuna_p][Math.floor(hash2(X,Z,59)*6)];for(let u=-2;u<=2;u++)for(let v=-2;v<=2;v++)for(let y=0;y<3;y++){if(u*u+v*v+(y*1.4)**2<=4.6)wput(X+u,g+y,Z+v,c);}}
    else if(r<.53){for(let u=-1;u<=1;u++)for(let v=-1;v<=1;v++)for(let y=0;y<2;y++)wput(X+u,g+y,Z+v,(u+v)&1?T.vuna_p:T.vuna_b);for(let u=-2;u<=2;u++)for(let v=-2;v<=2;v++)for(let y=0;y<3;y++)if(u*u+v*v+(y*1.2)**2<=5.2)wput(X+u,g+2+y,Z+v,T.vuna_r);wput(X,g+5,Z,T.crvena);}}
  for(const P of [SZ.jag,SZ.vun,SZ.bom])for(const p of P)p[1]=Y(Math.floor(p[0]),Math.floor(p[2]))+1.3;
  for(let x=47;x<=230;x+=3)SZ.river.push([x+.5,szZc(x)]);
  /* the portal */
  {const x=128,z=200,g=Y(x,z);for(let dz=-12;dz<=6;dz++)for(let dx=-5;dx<=5;dx++){const X=x+dx,Z=z+dz;for(let y=Y(X,Z);y<g;y++)wput(X,y,Z,T.vuna_l);for(let y=g;y<H;y++)if(!prot[I(X,y,Z)])vox[I(X,y,Z)]=0;hmap[X+Z*W]=g;}
    wPortalArch(x,g-1,z);WG.portal={x:x+.5,y:g,z:z+.5,ry:Math.PI};WG.spawn={x:x+.5,y:g,z:z-8.5,cam:0};}
  Object.assign(LOOT,{s_torta:{coins:55,mats:{ametist:1},blocks:{vuna_r:12,vuna_c:8},msg:"Na torti je škrinja puna šarene vune za tvoje slastičarske kuće."},
    s_planina:{coins:55,mats:{smaragd:1},blocks:{snijeg:12,sijeno:10},msg:"Sladoledari su ovdje spremili vaniliju i vafle."},
    s_oblak:{coins:60,mats:{dijamant:1},blocks:{skocni:6,oblak:12},msg:"Skočni oblaci! Stavi ih na otok i skači do neba."},
    s_blago:{coins:330,mats:{dijamant:2,smaragd:2,ametist:3},blocks:{vuna_r:16,vuna_p:12,vuna_z:12,skocni:6},msg:"Blago bombonskog dvorca! Hrpa šarenih kocki i dragulja."}});}

/* ---------- life ---------- */
function szLife(){S.wq=S.wq||{};
  PW.guide=pwPut("medenjak","Medenjak Mrvica",124.5,186.5,{frozen:true,ry:Math.PI*.8,sc:1.5});
  const baka=pwPut("medenka","Baka Medenka",SZ.baka.x,SZ.baka.z,{frozen:true,ry:0,sc:1.5});
  [["Medenko",92,180],["Cimetko",76,192],["Mrvičica",96,188],["Đumbirko",72,182]].forEach(([n,x,z])=>pwPut("medenjak2",n,x+.5,z+.5,{speed:.7,sc:1.25}));
  [["gumko_z","Gumica Zelenka",150,120],["gumko_y","Gumko Limunko",112,150],["gumko_p","Gumica Borovnica",200,110]].forEach(([k,n,x,z])=>pwPut(k,n,x+.5,z+.5,{speed:1}));
  [[96,64],[112,70],[130,58]].forEach(([x,z],i)=>pwPut("ovcica2",["Vunko","Mekica","Pahuljica"][i],x+.5,z+.5,{speed:.5}));
  pwPut("zec","Zeko Karamelko",150.5,150.5+20,{speed:1});
  const gu=pwPut("gumko",PETS.gumko.n,150.5,112.5,{speed:.6});const ov=pwPut("ovcica",PETS.ovcica.n,120.5,64.5,{speed:.4});
  pwQuest("gumko",{pet:1,en:gu,auto:1,need:4,item:"jagoda",spots:SZ.jag,got:"Jagoda",
    ask:"Bok! Ja sam Gumko, gumeni medo. Najdraže mi je jesti jagode, a vjetar je raznio jagode iz moje košarice. Doneseš mi četiri? Crvene su, pa se lako vide.",
    done:"Njam, njam! Najslađe jagode na svijetu! Sad smo prijatelji. Penji se, skakat ćemo kao lopte!",fact:"Jagoda je jedino voće koje ima sjemenke izvana. Na jednoj jagodi ima oko dvjesto sjemenki!"});
  pwQuest("ovcica",{pet:1,en:ov,auto:1,need:3,item:"vunica",spots:SZ.vun,got:"Šećerna vuna",
    ask:"Bee! Ja sam Vunica. Kad mi nestane šećerne vune, ne mogu lebdjeti. Na sjeveru su tri štapića šećerne vune. Doneseš mi ih?",
    done:"Bee-hee! Opet sam mekana i lagana. Hoćeš lebdjeti sa mnom iznad Slatkišne zemlje?",fact:"Šećerna vuna nastaje kad se šećer rastopi i vrti tako brzo da se pretvori u tanke niti, tanje od kose."});
  pwQuest("medenka",{en:baka,need:5,item:"bombon",spots:SZ.bom,got:"Bombon",cage:"medenka",
    ask:"Joj, dušo! Ja sam baka Medenka. Pekla sam kolače za veliku proslavu, a bomboni za ukras su mi se otkotrljali po cijelom selu. Pet ih nedostaje. Pomogneš mi?",
    done:"Svih pet bombona! Kolači će biti najljepši na svijetu. Uđi u moju kućicu, ostavila sam ti nešto posebno!",thanks:"Kolači su gotovi, hvala ti, dušo!",remind:"Bomboni su plavi sa žutim omotom. Traži ih po selu i oko njega."});}
function szEnv(){szChoc(true);
  /* floating cotton candy clouds in the sky */
  const cm=[std(0xffb8e0,{emissive:LC(0xff8ac8),emissiveIntensity:.15}),std(0xb8e0ff,{emissive:LC(0x8ac8ff),emissiveIntensity:.15}),std(0xfff0f8)];
  for(let i=0;i<16;i++){const g=new THREE.Group();const m=cm[i%3];for(let k=0;k<6;k++){const s=2+Math.random()*3;const b=new THREE.Mesh(new THREE.BoxGeometry(s,s*.7,s),m);b.position.set((Math.random()-.5)*7,(Math.random()-.5)*1.5,(Math.random()-.5)*5);g.add(b);}
    g.position.set(20+Math.random()*216,SZG+34+Math.random()*12,20+Math.random()*216);scene.add(g);SZ.clouds.push({g,v:.4+Math.random()*.5});}
  /* sparkle halo over the doughnut and the cake candles */
  for(const p of [[SZ.gey.x,SZ.gey.top-4,SZ.gey.z],[SZ.cake.x,SZ.cake.y+4,SZ.cake.z]]){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffd0e8,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.45}));s.scale.set(10,10,1);s.position.set(p[0],p[1],p[2]);scene.add(s);}}
function szTick(dt,tt){const P=FP.p;
  for(const c of SZ.clouds){c.g.position.x+=c.v*dt;if(c.g.position.x>250)c.g.position.x=6;}
  if(Math.random()<dt*14){const r=SZ.river[Math.floor(Math.random()*SZ.river.length)];if(!FP.on||Math.hypot(r[0]-P.x,r[1]-P.z)<60)mgSpawn({t:"bubble",x:r[0]+(Math.random()-.5)*3,y:SZG-1.1,z:r[1]+(Math.random()-.5)*3,vy:.5,life:1.2,size:.3,size2:.5,col:[0x8a4a2a,0xa0603a,0x6a3a1a],op:.9});}
  if(SZ.fall&&Math.random()<dt*8)mgSpawn({t:"bubble",x:SZ.fall.x+1+Math.random(),y:SZ.fall.y0+.6,z:SZ.fall.z+(Math.random()-.5)*4,vy:1.2,vx:.8,life:1.2,size:.35,size2:.7,col:[0x8a4a2a,0xb87a4a],grav:-.2,op:.7});
  if(SZ.pop&&Math.random()<dt*4)mgSpawn({t:"spark",x:SZ.pop.x+(Math.random()-.5),y:SZ.pop.y+.6,z:SZ.pop.z+(Math.random()-.5),vy:3,vx:(Math.random()-.5)*2,vz:(Math.random()-.5)*2,grav:8,life:1,size:.28,size2:.24,col:[0xfff6d0,0xffe8a0],op:1});
  if(SZ.gey&&Math.random()<dt*16){const a=Math.random()*6.28,r=Math.random()*1.4;mgSpawn({t:"bubble",x:SZ.gey.x+Math.cos(a)*r,y:SZ.gey.y+Math.random()*3,z:SZ.gey.z+Math.sin(a)*r,vy:6+Math.random()*4,life:1.6,size:.22,size2:.34,col:[0xb8f0ff,0xffffff,0x8ae0ff],op:.8});}
  if(!FP.on)return;
  if(Math.hypot(P.x-SZ.gey.x,P.z-SZ.gey.z)<7&&P.y<SZ.gey.y+3)tipOnce("s_gejzir","Gazirani gejzir! Stani u mjehuriće i dignut će te do leteće krafne.",4600);
  if(Math.hypot(P.x-SZ.cloudStart.x,P.z-SZ.cloudStart.z)<6)tipOnce("s_oblaci","Ružičasti oblačići su skočni! Skači s jednog na drugi sve do velikog oblaka.",4600);
  if(Math.hypot(P.x-170.5,P.z-114.5)<5)tipOnce("s_kokice","Stroj za kokice! Stani na žutu ploču ispred njega.",4000);}
function szTalk(){const n=wStars("slatko");const need=["gumko","ovcica"].filter(k=>!S.met[k]);const left=WG.stars.filter(s=>!(S.wst&&S.wst.slatko&&S.wst.slatko[s.k]));
  const L=n>=WSTAR_N?"Kristalna vrata bombonskog dvorca su otvorena! Trči preko mosta od lizalica, blago te čeka u dvorištu dvorca.":
    n===0?"Dobro došla u Slatkišnu zemlju! Ja sam Medenjak Mrvica. Ovdje je sve slatko: rijeka je od čokolade, drveće od lizalica, a oblaci od šećerne vune. Deset čarobnih bombona rasulo se po zemlji, a bez njih se vrata bombonskog dvorca ne otvaraju. Pronađeš ih?":
    "Imaš "+n+" od "+WSTAR_N+" čarobnih bombona. "+(left.length?"Savjet: "+left[Math.floor(Math.random()*left.length)].hint:"");
  say(PW.guide,L+(need.length&&n<WSTAR_N?" U zemlji ima i prijatelja kojima treba pomoć: "+need.map(k=>PETS[k].n).join(", ")+".":""),10000);}

(function(){const D=ITEM_DRAW;
  D.w_slatko=(x,P)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,"#7ab8ff");g.addColorStop(1,"#ffd8f0");x.fillStyle=g;x.fillRect(0,0,64,64);
    x.fillStyle="#6a3a1a";x.fillRect(0,48,64,16);x.fillStyle="#8a5a2a";x.fillRect(0,50,64,3);x.fillStyle="#f2f0ea";x.fillRect(19,24,4,26);
    const cs=["#ff6aa8","#ffffff"];for(let r=12;r>0;r-=3){x.fillStyle=cs[(r/3)%2|0];x.beginPath();x.arc(21,18,r,0,7);x.fill();}
    x.fillStyle="#ff8ac8";x.fillRect(38,30,18,18);x.fillStyle="#ffd84a";x.fillRect(38,26,18,4);x.fillStyle="#c84a3a";x.fillRect(45,20,4,6);};
  D.mg_trail_mrvice=(x)=>{const c=["#ff6aa8","#6ac8ff","#ffe04a","#8ae86a","#c89aff"];for(let i=0;i<26;i++){x.save();x.translate(8+(i*37)%50,8+(i*23)%50);x.rotate(i*.7);x.fillStyle=c[i%5];x.fillRect(-4,-1.5,8,3);x.restore();}};})();

pwWorld("slatko",{dist:"dolina",lv:10,n:"Slatkišna zemlja",d:"Zemlja od slatkiša: čokoladna rijeka i slap, bombonski dvorac, golema torta, sladoledna planina, oblaci od šećerne vune, gazirani gejzir i medenjak-selo.",
  feat:["Medenjak Mrvica","Gumeni medo Gumko","Ovčica Vunica","čokoladna rijeka","skočni oblaci","gazirani gejzir"],fr:["vuna_r","bijela","vuna_c"],ca:0xffb0e0,cb:0xff5aa8,sea:0,fog:.003,
  preset:PRESETS.slatko,
  gen:szGen,env:szEnv,life:szLife,talk:szTalk,tick:szTick,itemMesh:szItem,itemCol:[0xff7ac0,0xffffff,0xfff0a0],itemBurst:[[1,.5,.8],[1,1,1],[1,.95,.6]],itemFx:"star",
  item:{one:"Čarobni bombon",hud:"Čarobni bomboni",done:"Svi čarobni bomboni!",all:"Svih 10 čarobnih bombona! Kristalna vrata bombonskog dvorca su se otvorila!",first:"Prvi čarobni bombon! Kompas na vrhu pokazuje najbliži."},
  intro:()=>"Slatkišna zemlja! Čarobni bomboni: "+wStars("slatko")+" / "+WSTAR_N+". Medenjak Mrvica te čeka kod portala.",
  facts:{slap:"Čokolada se radi od zrna kakaovca. Kakaovac raste na drvetu u toplim šumama, a zrna su mu u velikim mahunama.",
    torta:"Najveća torta na svijetu bila je teška kao deset slonova! Napravili su je slastičari za veliku proslavu.",
    sladoled:"Kornet za sladoled izmišljen je slučajno: prodavaču su ponestale zdjelice, pa je susjed smotao vafl u tuljac.",
    oblak:"Pravi oblaci su od sićušnih kapljica vode. Jedan običan oblak težak je koliko stotinu slonova, ali lebdi jer su kapljice raspršene.",
    krafna:"Mjehurići u gaziranom soku su plin ugljikov dioksid. Kad otvoriš bocu, plin izlazi i zato sok šumi.",
    medenjak:"Medenjaci se rade od meda i začina poput cimeta i đumbira. Licitarsko srce s crvenom glazurom je hrvatski medenjak!",
    zele:"Žele se trese jer je u njemu mreža sitnih niti koja drži vodu, kao spužva.",
    spilja:"Kameni bombon raste kao kristal: u vrućoj šećernoj vodi ostavi se štapić i šećer se na njega polako lijepi.",
    secer:"Šećer se dobiva iz šećerne trske ili iz šećerne repe. U Hrvatskoj se šećer radi od repe.",
    staza:"Lizalice se rade od rastopljenog šećera koji se ohladi i stvrdne. Prve lizalice bile su na štapiću da se ne lijepe za prste."},
  chat:{"Baka Medenka":["Pecivo se peče, a bomboni se skupljaju!"],medenjak2:["Ne jedi me, molim te! Hihi, šalim se.","Pazi da ne staneš u čokoladu, sva se slijepi!","Na torti je stroj za kokice, isprobaj ga!"],
    gumko_z:["Boing, boing! Mi gumeni medvjedići obožavamo skakati."],gumko_y:["Ja sam limunov okus, najkiseliji u obitelji!"],gumko_p:["Borovnica je najfinija, to svi znaju."],
    ovcica2:["Bee! Oblačići su skočni, probaj!","Kad pojedemo šećernu vunu, lebdimo kao baloni."],"Zeko Karamelko":["Karamela mi se zalijepila za brkove!"]},
  finale:{chest:"s_blago",isl:"dvorac",at:{x:128,z:104},rewards:["skin:bombon","trail:mrvice"],locked:"Kristalna vrata bombonskog dvorca su zatvorena. Skupi svih 10 čarobnih bombona!",
    kicker:"Bombonski dvorac je otvoren!",title:"Blago bombonskog dvorca",sub:"Bombon lisica i Šarene mrvice sad su tvoji. Medenjak Mrvica kaže da si najslađa istraživačica!"}});
