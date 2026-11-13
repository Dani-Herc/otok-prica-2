/* =================== v45: MEKO: soft, rounded animals with big living eyes ===================
   The box animals are replaced one by one with smooth models built from ellipsoids, cones and lathe shapes.
   Every model keeps the contract of mk(): userData.parts with the same pivots (head, tail, l0..l3, wl, wr), one
   material per mesh and the same body colours, so skins, outfits, hats, rides and all old animations keep working.
   New: userData.eyes (blink), parts.earL / parts.earR (twitch), a soft fuzz rim on the fur. Nothing is saved. */
const MEKO={on:true,old:{}};
function mkFur(col,o){const m=new THREE.MeshStandardMaterial(Object.assign({color:LC(col),roughness:.86},o||{}));
  m.onBeforeCompile=sh=>{sh.fragmentShader=sh.fragmentShader.replace("#include <dithering_fragment>","float mkF=pow(1.0-clamp(dot(normalize(vNormal),normalize(vViewPosition)),0.0,1.0),3.0);gl_FragColor.rgb+=(gl_FragColor.rgb*.2+vec3(.03,.028,.025))*mkF;\n#include <dithering_fragment>");};
  return m;}
const MKG={};
function mkGeo(kind,a,b){const key=kind+"|"+(a||0)+"|"+(b||0);if(MKG[key])return MKG[key];let g;
  if(kind==="s")g=new THREE.SphereGeometry(1,22,16);
  else if(kind==="c")g=new THREE.ConeGeometry(1,1,16,1);
  else if(kind==="cap"){/* capsule along y: radius 1, body length a (in radii) */const pts=[],n=8;for(let i=0;i<=n;i++){const t=-Math.PI/2+i/n*Math.PI/2;pts.push(new THREE.Vector2(Math.cos(t),Math.sin(t)-a/2));}for(let i=0;i<=n;i++){const t=i/n*Math.PI/2;pts.push(new THREE.Vector2(Math.cos(t),Math.sin(t)+a/2));}g=new THREE.LatheGeometry(pts,16);}
  else if(kind==="drop"){/* teardrop along y from 0 (thin root) to 1 (round end); a = where it is widest */const pts=[],n=18,w=a||.62;for(let i=0;i<=n;i++){const t=i/n;const r=t<w?Math.sin(t/w*Math.PI/2):Math.cos((t-w)/(1-w)*Math.PI/2);pts.push(new THREE.Vector2(Math.max(.001,Math.pow(r,.8)*(.25+.75*Math.min(1,t/w*1.2))),t));}g=new THREE.LatheGeometry(pts,18);}
  g.computeVertexNormals();return MKG[key]=g;}
/* builder: add(shape,[sx,sy,sz],[x,y,z],colour,part,[rx,ry,rz],matOpts,geoArg) */
function mkSoft(){const g=new THREE.Group(),parts={},eyes=[];
  const par=part=>{if(!part)return g;if(!parts[part.name]){const pg=new THREE.Group();pg.position.set(part.px,part.py,part.pz);g.add(pg);parts[part.name]=pg;}return parts[part.name];};
  const add=(kind,s,p,col,part,rot,mo,ga)=>{const m=new THREE.Mesh(mkGeo(kind,ga),mo&&mo.basic?new THREE.MeshBasicMaterial({color:col}):mkFur(col,mo));m.scale.set(s[0],s[1],s[2]);
    const P=par(part);if(part)m.position.set(p[0]-part.px,p[1]-part.py,p[2]-part.pz);else m.position.set(p[0],p[1],p[2]);if(rot)m.rotation.set(rot[0],rot[1],rot[2]);m.castShadow=true;P.add(m);return m;};
  /* a big glossy eye looking along +z; r = half height */
  const eye=(p,r,iris,part,yaw,o)=>{o=o||{};const P=par(part),e=new THREE.Group();if(part)e.position.set(p[0]-part.px,p[1]-part.py,p[2]-part.pz);else e.position.set(p[0],p[1],p[2]);e.rotation.y=yaw||0;if(o.pitch)e.rotation.x=o.pitch;
    const S=(s,z,c,mo,x,y)=>{const m=new THREE.Mesh(mkGeo("s"),mo&&mo.basic?new THREE.MeshBasicMaterial({color:c}):new THREE.MeshStandardMaterial(Object.assign({color:LC(c),roughness:.18},mo||{})));m.scale.set(s[0],s[1],s[2]);m.position.set(x||0,y||0,z);e.add(m);return m;};
    const w=o.w||.86;S([r*w,r,r*.42],0,o.white||0xfbfbf8);S([r*w*.8,r*.86,r*.3],r*.2,iris);S([r*w*.52,r*.6,r*.24],r*.34,0x15110f);
    const sx=(o.side||1);S([r*.24,r*.26,r*.1],r*.56,0xfefefe,{basic:1},sx*r*.22,r*.34);S([r*.11,r*.12,r*.06],r*.55,0xfefefe,{basic:1},-sx*r*.24,-r*.26);
    P.add(e);eyes.push(e);return e;};
  const done=()=>{g.userData.parts=parts;g.userData.eyes=eyes;g.userData.meko=1;return g;};
  return {g,add,eye,par,parts,done};}

/* ---------- Rida, the fox ---------- */
MEKO.rida=function(){const O=0xe8772e,Wh=0xfff4e6,B=0x22201e,D=0x5a3420,hd={name:"head",px:0,py:.82,pz:.42},tl={name:"tail",px:0,py:.62,pz:-.45},eL={name:"earL",px:-.18,py:1.02,pz:.46},eR={name:"earR",px:.18,py:1.02,pz:.46};
  const M=mkSoft(),a=M.add;
  a("s",[.25,.245,.4],[0,.53,-.04],O);a("s",[.215,.215,.2],[0,.53,.26],O);a("s",[.18,.19,.13],[0,.5,.36],Wh);a("s",[.17,.1,.3],[0,.36,.04],Wh);
  a("s",[.17,.17,.16],[0,.68,.36],O);
  /* head */
  a("s",[.32,.275,.285],[0,.84,.52],O,hd);a("s",[.17,.135,.14],[-.2,.76,.6],Wh,hd,[0,-.5,.25]);a("s",[.17,.135,.14],[.2,.76,.6],Wh,hd,[0,.5,-.25]);
  a("c",[.07,.17,.05],[-.33,.71,.52],Wh,hd,[0,0,2.2]);a("c",[.07,.17,.05],[.33,.71,.52],Wh,hd,[0,0,-2.2]);
  a("s",[.12,.09,.16],[0,.76,.79],Wh,hd);a("s",[.09,.06,.13],[0,.81,.76],O,hd);a("s",[.052,.042,.04],[0,.8,.945],B,hd);
  a("s",[.011,.011,.05],[-.03,.722,.915],B,hd,[0,.55,0]);a("s",[.011,.011,.05],[.03,.722,.915],B,hd,[0,-.55,0]);
  M.eye([-.135,.885,.755],.1,0x9a5a18,hd,-.24);M.eye([.135,.885,.755],.1,0x9a5a18,hd,.24);
  /* ears */
  for(const [E,sx] of [[eL,-1],[eR,1]]){const rz=-sx*.22,ax=[sx*.218,.976];a("c",[.13,.32,.075],[sx*.18,1.19,.46],O,E,[-.1,0,rz]);a("c",[.08,.2,.04],[sx*.175,1.15,.505],Wh,E,[-.1,0,rz]);a("c",[.052,.12,.034],[sx*.18+ax[0]*.103,1.19+ax[1]*.103,.45],B,E,[-.1,0,rz]);}
  M.parts.head.add(M.parts.earL);M.parts.earL.position.set(eL.px-hd.px,eL.py-hd.py,eL.pz-hd.pz);M.parts.head.add(M.parts.earR);M.parts.earR.position.set(eR.px-hd.px,eR.py-hd.py,eR.pz-hd.pz);
  /* tail: a bushy drop with a white tip */
  {const rx=-Math.PI/2+.4,dy=Math.sin(.4),dz=-Math.cos(.4),L=.66;a("drop",[.21,L,.21],[0,.62,-.42],O,tl,[rx,0,0],null,.62);a("s",[.16,.2,.16],[0,.62+dy*L*.84,-.42+dz*L*.84],Wh,tl,[rx,0,0]);}
  /* legs with haunches and little paws */
  [["l0",-.14,.27],["l1",.14,.27],["l2",-.15,-.27],["l3",.15,-.27]].forEach((l,i)=>{const p={name:l[0],px:l[1],py:.3,pz:l[2]};a("s",i<2?[.1,.15,.11]:[.12,.17,.15],[l[1],.4,l[2]],O,p);a("cap",[.075,.075,.075],[l[1],.18,l[2]],D,p,null,null,2.2);a("s",[.085,.05,.105],[l[1],.05,l[2]+.035],D,p);});
  return M.done();};

/* ---------- Zec, the rabbit ---------- */
MEKO.zec=function(){const C=0xf2f0ec,P=0xf4b6c2,hd={name:"head",px:0,py:.55,pz:.25},eL={name:"earL",px:-.09,py:.74,pz:.24},eR={name:"earR",px:.09,py:.74,pz:.24};
  const M=mkSoft(),a=M.add;
  a("s",[.22,.215,.28],[0,.27,-.03],C);a("s",[.16,.16,.14],[0,.27,.15],C);a("s",[.1,.1,.09],[0,.3,-.31],0xffffff);
  a("s",[.23,.21,.21],[0,.57,.27],C,hd);a("s",[.115,.09,.09],[-.085,.5,.4],C,hd);a("s",[.115,.09,.09],[.085,.5,.4],C,hd);
  a("s",[.036,.028,.025],[0,.54,.475],P,hd);a("s",[.028,.04,.02],[0,.45,.435],C,hd);
  M.eye([-.105,.615,.425],.074,0x5a3a26,hd,-.32);M.eye([.105,.615,.425],.074,0x5a3a26,hd,.32);
  a("s",[.045,.03,.03],[-.16,.52,.39],P,hd,null,{transparent:true,opacity:.5});a("s",[.045,.03,.03],[.16,.52,.39],P,hd,null,{transparent:true,opacity:.5});
  for(const [E,sx] of [[eL,-1],[eR,1]]){a("cap",[.058,.058,.03],[sx*.09,.94,.24],C,E,[-.1,0,-sx*.12],null,5);a("cap",[.03,.03,.012],[sx*.09,.94,.264],P,E,[-.1,0,-sx*.12],null,7.5);}
  M.parts.head.add(M.parts.earL);M.parts.earL.position.set(eL.px-hd.px,eL.py-hd.py,eL.pz-hd.pz);M.parts.head.add(M.parts.earR);M.parts.earR.position.set(eR.px-hd.px,eR.py-hd.py,eR.pz-hd.pz);
  [["l0",-.1,.18],["l1",.1,.18],["l2",-.14,-.14],["l3",.14,-.14]].forEach((l,i)=>{const p={name:l[0],px:l[1],py:.14,pz:l[2]};
    if(i<2){a("cap",[.05,.05,.05],[l[1],.1,l[2]],C,p,null,null,1.6);a("s",[.055,.04,.07],[l[1],.04,l[2]+.03],C,p);}
    else{a("s",[.11,.13,.15],[l[1],.17,l[2]],C,p);a("s",[.065,.045,.14],[l[1],.045,l[2]+.1],C,p);}});
  return M.done();};

/* ---------- Sova, the owl ---------- */
MEKO.sova=function(){const Br=0x8a6038,L=0xd8bb8a,Or=0xe8a020,hd={name:"head",px:0,py:.7,pz:0},wl={name:"wl",px:-.22,py:.56,pz:0},wr={name:"wr",px:.22,py:.56,pz:0};
  const M=mkSoft(),a=M.add;
  a("s",[.25,.29,.23],[0,.4,0],Br);a("s",[.19,.22,.12],[0,.37,.14],L);
  for(let r=0;r<3;r++)for(let c=-1;c<=1;c++)if(!(r===2&&c))a("s",[.035,.02,.02],[c*.075+(r%2?.037:0),.44-r*.075,.245-Math.abs(c)*.012-r*.004],Br);
  a("s",[.28,.235,.24],[0,.86,0],Br,hd);
  a("s",[.135,.14,.05],[-.115,.87,.205],0xfff6d8,hd,[0,-.2,0]);a("s",[.135,.14,.05],[.115,.87,.205],0xfff6d8,hd,[0,.2,0]);
  M.eye([-.115,.875,.235],.095,0xf2a81e,hd,-.2,{w:.95,white:0xf2a81e});M.eye([.115,.875,.235],.095,0xf2a81e,hd,.2,{w:.95,white:0xf2a81e});
  a("c",[.04,.09,.045],[0,.79,.27],Or,hd,[Math.PI-.5,0,0]);
  a("c",[.07,.16,.05],[-.19,1.08,0],Br,hd,[0,0,.4]);a("c",[.07,.16,.05],[.19,1.08,0],Br,hd,[0,0,-.4]);
  a("s",[.07,.2,.17],[-.25,.42,-.01],Br,wl,[0,0,-.12]);a("s",[.07,.2,.17],[.25,.42,-.01],Br,wr,[0,0,.12]);
  a("s",[.06,.035,.08],[-.1,.12,.06],Or);a("s",[.06,.035,.08],[.1,.12,.06],Or);
  return M.done();};

/* swap the models in; the box ones stay reachable for comparison (MEKO.on=false) */
for(const k of ["rida","zec","sova"]){MEKO.old[k]=MODELS[k];const soft=MEKO[k];MODELS[k]=function(){return MEKO.on?soft.apply(this,arguments):MEKO.old[k].apply(this,arguments);};}
if(MODELS.snjezec)MODELS.snjezec=()=>MODELS.zec();

/* life in the face: blinking and ear twitches */
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);
  for(const e of ents){const g=e.g,ud=g&&g.userData;if(!ud||!ud.meko||g.visible===false)continue;
    if(e.mkB==null){e.mkB=1+Math.random()*4;e.mkE=3+Math.random()*6;}
    e.mkB-=dt;let k=1;if(e.mkB<0){const u=-e.mkB/.16;k=u>=1?1:Math.abs(1-2*u)*.92+.08;if(u>=1)e.mkB=Math.random()<.2?.25:2+Math.random()*4;}
    if(e.sleepy)k=.1;for(const ey of ud.eyes)ey.scale.y=k;
    const p=ud.parts;if(p.earL){e.mkE-=dt;let tw=0;if(e.mkE<0){const u=-e.mkE/.35;tw=u>=1?0:Math.sin(u*Math.PI*2)*.22;if(u>=1)e.mkE=3+Math.random()*7;}
      const sway=Math.sin(tt*2.1+e.ph)*.03;p.earL.rotation.z=tw+sway;p.earR.rotation.z=-sway;p.earL.rotation.x=p.earR.rotation.x=-(e.hop||0)*.25;}}};}
