/* =================== v40: NOVE ZIVOTINJE: six kinds that live only in the districts ===================
   Lučki grad: galeb (circles above the shore) and rak (walks sideways on the beach). Gorski kraj: vjeverica and
   jelen in the spruce forest. Cvjetna dolina: leptir and pčela above the meadow. They join the habitat guide of
   their land (S.dst.zoo), so the album of each district grows by two. No new save keys. */
MODELS.galeb=function(){const Wh=0xf4f4f0,G=0x9aa3ad,Y=0xf2b22e,hd={name:"head",px:0,py:.46,pz:.22};return mk([[.28,.24,.5,0,.3,0,Wh],[.22,.22,.22,0,.5,.26,Wh,hd],[.08,.06,.16,0,.46,.43,Y,hd],[.04,.04,.02,-.08,.54,.375,0x111111,hd],[.04,.04,.02,.08,.54,.375,0x111111,hd],
  [.5,.05,.3,-.38,.4,0,G,{name:"wl",px:-.14,py:.4,pz:0}],[.16,.05,.22,-.7,.4,0,0x3a3f46,{name:"wl",px:-.14,py:.4,pz:0}],[.5,.05,.3,.38,.4,0,G,{name:"wr",px:.14,py:.4,pz:0}],[.16,.05,.22,.7,.4,0,0x3a3f46,{name:"wr",px:.14,py:.4,pz:0}],
  [.2,.06,.18,0,.32,-.32,G],[.05,.16,.05,-.08,.1,0,Y],[.05,.16,.05,.08,.1,0,Y]]);};
MODELS.rak=function(){const R=0xd8452e,D=0xa8301e,a=[[.5,.18,.34,0,.2,0,R],[.4,.06,.26,0,.31,0,D],[.05,.14,.05,-.1,.36,.14,R],[.05,.14,.05,.1,.36,.14,R],[.07,.07,.07,-.1,.45,.14,0x111111],[.07,.07,.07,.1,.45,.14,0x111111],
  [.18,.14,.2,-.36,.22,.26,R,{name:"cl",px:-.3,py:.22,pz:.16}],[.18,.14,.2,.36,.22,.26,R,{name:"cr",px:.3,py:.22,pz:.16}]];for(const x of [-.3,.3])for(const z of [-.12,0,.12])a.push([.05,.12,.05,x,.06,z,D]);return mk(a);};
MODELS.vjeverica=function(){const C=0xc0612a,L=0xf3dcc0,hd={name:"head",px:0,py:.44,pz:.2},tl={name:"tail",px:0,py:.34,pz:-.22};return mk([[.24,.26,.42,0,.28,0,C],[.18,.18,.06,0,.26,.2,L],[.24,.22,.22,0,.48,.26,C,hd],[.07,.1,.05,-.08,.63,.24,C,hd],[.07,.1,.05,.08,.63,.24,C,hd],
  [.04,.05,.02,-.07,.51,.375,0x111111,hd],[.04,.05,.02,.07,.51,.375,0x111111,hd],[.06,.04,.03,0,.44,.38,0x3a2618,hd],[.16,.4,.16,0,.54,-.3,C,tl],[.2,.2,.22,0,.8,-.22,0xd9803e,tl]].concat(legs(.07,.14,.08,.14,C,.14)));};
MODELS.jelen=function(){const B=0xa8713f,D=0x6a4526,L=0xf3e2c8,A=0xd9c9a8,hd={name:"head",px:0,py:1.02,pz:.4};const a=[[.42,.42,.9,0,.84,0,B],[.3,.1,.5,0,.66,0,L],[.2,.44,.2,0,1.14,.42,B,hd],[.26,.24,.36,0,1.42,.54,B,hd],[.14,.12,.1,0,1.36,.76,D,hd],
  [.05,.06,.02,-.1,1.47,.725,0x111111,hd],[.05,.06,.02,.1,1.47,.725,0x111111,hd],[.1,.14,.05,-.18,1.56,.42,B,hd],[.1,.14,.05,.18,1.56,.42,B,hd],[.14,.16,.06,0,.94,-.48,L]];
  for(const s of [-1,1]){a.push([.05,.34,.05,s*.09,1.72,.46,A,hd],[.2,.05,.05,s*.18,1.8,.46,A,hd],[.05,.16,.05,s*.26,1.9,.46,A,hd],[.05,.05,.16,s*.09,1.86,.56,A,hd]);}return mk(a.concat(legs(.11,.64,.14,.34,D,.64)));};
MODELS.leptir=function(){const c=[[0xff8fb0,0xc0407a],[0xffd24a,0xe07a1e],[0x7fc8ff,0x2f6fd6],[0xc08bff,0x6a3fb8]][Math.floor(Math.random()*4)],wl={name:"wl",px:-.03,py:.12,pz:0},wr={name:"wr",px:.03,py:.12,pz:0};
  const g=mk([[.06,.06,.26,0,.1,0,0x2a2420],[.03,.03,.1,-.03,.15,.16,0x2a2420],[.03,.03,.1,.03,.15,.16,0x2a2420],[.3,.03,.26,-.19,.12,.07,c[0],wl],[.24,.03,.2,-.16,.12,-.13,c[1],wl],[.3,.03,.26,.19,.12,.07,c[0],wr],[.24,.03,.2,.16,.12,-.13,c[1],wr]]);g.userData.parts.wl.rotation.z=-.6;g.userData.parts.wr.rotation.z=.6;return g;};
MODELS.pcela=function(){const Y=0xf2b22e,B=0x2a2420,wl={name:"wl",px:-.05,py:.22,pz:0},wr={name:"wr",px:.05,py:.22,pz:0};return mk([[.18,.16,.28,0,.14,0,Y],[.19,.17,.06,0,.14,-.02,B],[.19,.17,.06,0,.14,-.12,B],[.16,.15,.12,0,.14,.2,B],[.04,.04,.02,-.05,.17,.265,0xffffff],[.04,.04,.02,.05,.17,.265,0xffffff],
  [.2,.02,.14,-.14,.23,-.02,0xdff3ff,wl],[.2,.02,.14,.14,.23,-.02,0xdff3ff,wr],[.04,.04,.06,0,.14,-.18,B]]);};
Object.assign(STN,{
  galeb:["obala","nad obalom","Galeb","Galebovi žive uz more. Mogu piti i slanu vodu, a višak soli izbace kroz nosnice."],
  rak:["obala","na žalu","Rak","Rak hoda postrance jer mu se noge savijaju u stranu. Kad naraste, odbaci stari oklop i napravi novi."],
  vjeverica:["suma","pod smrekama","Vjeverica","Vjeverica u jesen zakopava orahe i sjemenke. One koje zaboravi ponekad izrastu u nova stabla."],
  jelen:["suma","u gorskoj šumi","Jelen","Jelenu rogovi svake godine otpadnu pa narastu novi. Košuta, njegova ženka, rogove nema."],
  leptir:["livada","iznad cvijeća","Leptir","Leptir okus osjeća nogama. Prije nego što dobije krila, živi kao gusjenica pa kao kukuljica."],
  pcela:["livada","na cvijetu","Pčela","Pčela drugim pčelama plesom pokaže gdje je cvijeće. Za žlicu meda treba obići tisuće cvjetova."]});
Object.assign(STNAMES,{galeb:["Krik","Bjelko"],rak:["Štipko","Kliješto"],vjeverica:["Lješnjak","Repka"],jelen:["Rogan","Šumko"],leptir:["Šarenko","Lepršavka","Latica"],pcela:["Zujka","Medena"]});
STLAND.luka.push(["galeb",2],["rak",2]);STLAND.gora.push(["vjeverica",2],["jelen",2]);STLAND.dolina.push(["leptir",3],["pcela",2]);
const ZVF={galeb:{h:3.6,a:.5,sp:2.2,flap:5,w:.5},leptir:{h:.9,a:.35,sp:.9,flap:11,w:1.1},pcela:{h:.75,a:.18,sp:1.3,flap:38,w:.5}};
{const _ss=stSpawn;stSpawn=function(){const n0=ents.length;const r=_ss.apply(this,arguments);for(let i=n0;i<ents.length;i++){const e=ents[i],F=ZVF[e.kind];const same=ents.slice(n0,i).filter(q=>q.kind===e.kind).length,N=STNAMES[e.kind];if(N)e.name=N[same%N.length];if(F){e.fl=F;e.speed=F.sp;}else if(e.kind==="rak"){e.speed=.7;const inner=new THREE.Group();inner.rotation.y=Math.PI/2;while(e.g.children.length)inner.add(e.g.children[0]);e.g.add(inner);}else if(e.kind==="vjeverica")e.speed=2.1;else if(e.kind==="jelen"){e.speed=1.2;e.g.scale.setScalar(1.15);}}return r;};}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);for(const e of ents){const F=e.fl;if(!F||!e.g.visible)continue;const p=e.g.userData.parts;e.g.position.y+=F.h+Math.sin(tt*1.7+e.ph)*F.a;const w=(e.kind==="leptir"?-.5:0)+Math.sin(tt*F.flap+e.ph)*F.w;if(p.wl){p.wl.rotation.z=w;p.wr.rotation.z=-w;}}};}
