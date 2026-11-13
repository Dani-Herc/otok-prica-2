/* ===== v26: every character gets a wardrobe, legendary outfits are earned by playing as that character, new wow costumes for Rida ===== */
/* which original colour on each model is which part */
const CWROLE={zec:{0xf2f0ec:"A",0xf4b6c2:"P",0xffffff:"T"},macka:{0x8a8f98:"A",0x5d626b:"D",0x9be06a:"E"},pingvin:{0x22242c:"A",0xf6f4ee:"W",0xf29a1e:"O"},
  jez:{0x6b4a30:"A",0xd9b48c:"F",0x3b2a1c:"S"},panda:{0xc8582a:"A",0x3a2418:"K",0xfff2e0:"W",0xf2c890:"T"},sova:{0x8a6038:"A",0xd8bb8a:"L",0xe8a020:"Y",0xfff6d8:"EW"}};
const CWRK={};for(const k in CWROLE){CWRK[k]={};for(const h in CWROLE[k])CWRK[k][LC(+h).getHex()]=CWROLE[k][h];}
const CWSMALL={E:1,EW:1,P:1,O:1,Y:1};
/* ---------- textures ---------- */
const cwRnd=i=>((Math.sin(i*127.1+11.7)*43758.5453)%1+1)%1;
const cwT={
  zig:()=>wowCanvas("cw_zig",x=>{const c=["#ff7ab8","#5ac0ff","#ffd23a","#7ad85a","#b07aff","#ff9a4a","#3ad0b0","#ff6a9a"];for(let i=0;i<8;i++){x.fillStyle=c[i];x.fillRect(0,i*16,128,16);}
    x.strokeStyle="#ffffff";x.lineWidth=4;for(let r=0;r<8;r++){x.beginPath();for(let i=0;i<=8;i++)x.lineTo(i*16,r*16+(i%2?13:3));x.stroke();}x.fillStyle="#ff6aa8";for(let i=0;i<10;i++){x.beginPath();x.arc(cwRnd(i)*128,cwRnd(i+40)*128,3,0,7);x.fill();}}),
  crater:()=>wowCanvas("cw_crater",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);for(let i=0;i<26;i++){const r=2+cwRnd(i+3)*7,cx=cwRnd(i)*128,cy=cwRnd(i+9)*128;const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,"rgba(200,230,255,.95)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,r,0,7);x.fill();}}),
  meadow:()=>wowCanvas("cw_meadow",x=>{x.fillStyle="#9ad86a";x.fillRect(0,0,128,128);x.fillStyle="#7ac84a";for(let i=0;i<40;i++)x.fillRect(cwRnd(i)*128,cwRnd(i+5)*128,3,8);const fc=["#ff6a9a","#ffd23a","#ffffff","#b88aff","#ff9a4a"];
    for(let i=0;i<14;i++){const cx=cwRnd(i+20)*128,cy=cwRnd(i+60)*128;x.fillStyle=fc[i%5];for(let p=0;p<5;p++){const a=p/5*6.283;x.beginPath();x.arc(cx+Math.cos(a)*4,cy+Math.sin(a)*4,3.2,0,7);x.fill();}x.fillStyle="#ffe680";x.beginPath();x.arc(cx,cy,2.4,0,7);x.fill();}}),
  tiger:()=>wowCanvas("cw_tiger",x=>{x.fillStyle="#ff9a2a";x.fillRect(0,0,128,128);x.fillStyle="#22201e";for(let i=0;i<7;i++){const y=i*19+4;x.beginPath();x.moveTo(0,y);x.quadraticCurveTo(40,y+8,64,y+3);x.quadraticCurveTo(90,y-2,128,y+6);x.lineTo(128,y+11);x.quadraticCurveTo(80,y+8,60,y+10);x.quadraticCurveTo(30,y+14,0,y+7);x.fill();}}),
  nebula:()=>wowCanvas("cw_nebula",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);[[30,40,"rgba(255,90,200,.6)"],[90,80,"rgba(140,90,255,.6)"],[70,20,"rgba(90,200,255,.45)"]].forEach(([cx,cy,c])=>{const g=x.createRadialGradient(cx,cy,2,cx,cy,52);g.addColorStop(0,c);g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,128,128);});
    x.fillStyle="#fff";for(let i=0;i<60;i++){x.globalAlpha=.4+cwRnd(i)*.6;const s=i%8===0?2.2:.9;x.beginPath();x.arc(cwRnd(i+1)*128,cwRnd(i+77)*128,s,0,7);x.fill();}x.globalAlpha=1;}),
  bolt:()=>wowCanvas("cw_bolt",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);x.lineCap="round";for(let k=0;k<5;k++){let px=cwRnd(k)*128,py=0;x.beginPath();x.moveTo(px,py);for(let s=0;s<7;s++){px+=(cwRnd(k*9+s)-.5)*40;py+=20;x.lineTo(px,py);}
      x.strokeStyle="rgba(90,200,255,.55)";x.lineWidth=7;x.stroke();x.strokeStyle="#e8fbff";x.lineWidth=2.4;x.stroke();}}),
  facets:()=>wowCanvas("cw_facets",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);for(let i=0;i<18;i++){const cx=cwRnd(i)*128,cy=cwRnd(i+30)*128,r=6+cwRnd(i+2)*10;x.strokeStyle="rgba(220,245,255,.9)";x.lineWidth=1.6;x.beginPath();for(let p=0;p<6;p++){const a=p/6*6.283;x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);}x.closePath();x.stroke();
      x.fillStyle="rgba(150,220,255,.25)";x.fill();}x.fillStyle="#fff";for(let i=0;i<14;i++){x.beginPath();x.arc(cwRnd(i+90)*128,cwRnd(i+50)*128,1.6,0,7);x.fill();}}),
  aurora:()=>wowCanvas("cw_aurora",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);const cs=["rgba(80,255,170,.75)","rgba(60,200,255,.6)","rgba(200,90,255,.6)"];for(let k=0;k<3;k++){x.beginPath();for(let i=0;i<=128;i+=4)x.lineTo(i,30+k*34+Math.sin(i*.07+k*2)*12);x.lineTo(128,128);x.lineTo(0,128);x.closePath();
      const g=x.createLinearGradient(0,20+k*34,0,60+k*34);g.addColorStop(0,cs[k]);g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fill();}x.fillStyle="#fff";for(let i=0;i<20;i++){x.beginPath();x.arc(cwRnd(i)*128,cwRnd(i+3)*30,1,0,7);x.fill();}}),
  cactus:()=>wowCanvas("cw_cactus",x=>{x.fillStyle="#3a8a3a";x.fillRect(0,0,128,128);x.fillStyle="#5aaa4a";for(let i=0;i<8;i++)x.fillRect(i*16+5,0,5,128);const fc=["#ff6aa8","#ffd23a","#ffffff"];for(let i=0;i<9;i++){const cx=cwRnd(i)*128,cy=cwRnd(i+7)*128;x.fillStyle=fc[i%3];for(let p=0;p<6;p++){const a=p/6*6.283;x.beginPath();x.arc(cx+Math.cos(a)*5,cy+Math.sin(a)*5,3.6,0,7);x.fill();}}}),
  leaves:()=>wowCanvas("cw_leaves",x=>{x.fillStyle="#c86a2a";x.fillRect(0,0,128,128);const lc=["#ffb02a","#e8401a","#ffd85a","#a8481a","#ff8a2a"];for(let i=0;i<22;i++){x.save();x.translate(cwRnd(i)*128,cwRnd(i+11)*128);x.rotate(cwRnd(i+5)*6.283);x.fillStyle=lc[i%5];
      x.beginPath();x.moveTo(0,-10);x.quadraticCurveTo(9,0,0,10);x.quadraticCurveTo(-9,0,0,-10);x.fill();x.strokeStyle="rgba(90,30,10,.6)";x.lineWidth=1;x.beginPath();x.moveTo(0,-9);x.lineTo(0,9);x.stroke();x.restore();}}),
  sequin:()=>wowCanvas("cw_sequin",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);for(let r=0;r<11;r++)for(let c=0;c<11;c++){const v=cwRnd(r*13+c);x.fillStyle=v>.7?"#fff4b0":v>.4?"#ff8ae8":"#b88aff";x.globalAlpha=.35+v*.65;x.beginPath();x.arc(c*12+(r%2)*6+3,r*12+5,4.4,0,7);x.fill();}x.globalAlpha=1;}),
  bamboo:()=>wowCanvas("cw_bamboo",x=>{x.fillStyle="#6ab84a";x.fillRect(0,0,128,128);for(let i=0;i<4;i++){x.fillStyle=i%2?"#4a983a":"#8ad05a";x.fillRect(i*32,0,22,128);x.fillStyle="#2a6a2a";for(let j=0;j<4;j++)x.fillRect(i*32,j*32+(i%2)*14,22,4);}}),
  flame:()=>wowCanvas("cw_flame",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);for(let i=0;i<10;i++){const cx=cwRnd(i)*128,w=10+cwRnd(i+4)*14;const g=x.createLinearGradient(0,128,0,10);g.addColorStop(0,"rgba(255,240,140,1)");g.addColorStop(.45,"rgba(255,120,20,.95)");g.addColorStop(1,"rgba(200,20,0,0)");
      x.fillStyle=g;x.beginPath();x.moveTo(cx-w,128);x.quadraticCurveTo(cx-w*.6,60,cx,6+cwRnd(i+8)*40);x.quadraticCurveTo(cx+w*.6,60,cx+w,128);x.fill();}}),
  speck:()=>wowCanvas("cw_speck",x=>{x.fillStyle="#ffffff";x.fillRect(0,0,128,128);x.fillStyle="#2a2a34";for(let i=0;i<46;i++){x.save();x.translate(cwRnd(i)*128,cwRnd(i+31)*128);x.rotate(.4);x.fillRect(-3,-1.5,6,3);x.restore();}}),
  peacock:()=>wowCanvas("cw_peacock",x=>{x.fillStyle="#1a8a7a";x.fillRect(0,0,128,128);for(let r=0;r<4;r++)for(let c=0;c<4;c++){const cx=c*32+(r%2)*16+8,cy=r*32+16;[[13,"#3ad0a0"],[9,"#ffd23a"],[6,"#2a6ad8"],[3,"#16243a"]].forEach(([rr,col])=>{x.fillStyle=col;x.beginPath();x.ellipse(cx,cy,rr*.8,rr,0,0,7);x.fill();});}}),
  goldstar:()=>wowCanvas("cw_goldstar",x=>{x.fillStyle="#000";x.fillRect(0,0,128,128);x.fillStyle="#ffd860";for(let i=0;i<16;i++){const cx=cwRnd(i)*128,cy=cwRnd(i+19)*128,r=2.5+cwRnd(i+3)*3;x.beginPath();for(let p=0;p<10;p++){const a=p/10*6.283-1.57,rr=p%2?r*.45:r;x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);}x.fill();}})};
function cwCol(o,h,s,l){const c=new THREE.Color().setHSL(h,s,l).convertSRGBToLinear();const m=o.material;if(o.userData.bc){o.userData.bc.copy(c);m.color.copy(c).multiplyScalar((typeof rida!=="undefined"&&rida&&rida.shadeF)||1);}else m.color.copy(c);}
const cwHue=(ms,t,sp,sat,li,int)=>{for(const o of ms){if(o.userData.cr==="E"||o.userData.cr==="EW")continue;const m=o.material,h=((t*sp+o.position.x*.8+o.position.y*.6+o.position.z*.5)%1+1)%1;cwCol(o,h,.85,.62);m.emissive.setHSL(h,sat,li);m.emissiveIntensity=int;}};
/* ---------- outfits: three to buy and one legendary, earned only by playing as that character ---------- */
const CWO={
  zec:{
    pisanica:{n:"Uskršnja pisanica",d:"Šarene pastelne cik-cak pruge, kao najljepše oslikano jaje.",p:220,rar:"r",col:{A:0xffffff,T:0xffffff,P:0xff7ac0},tx:cwT.zig,tr:["A","T"],mode:"map"},
    mjesec:{n:"Mjesečeva zečica",d:"Srebrno krzno s kraterima koji tiho svijetle, kao da je skočila s Mjeseca.",p:320,rar:"e",col:{A:0xa8b4d8,T:0xe0e8ff,P:0x9ab0ff},tx:cwT.crater,tr:["A","T"],m:{metalness:.35,roughness:.35},gi:.8,gc:0xbfe0ff,
      anim:(ms,t)=>{for(const o of ms){if(o.material.emissiveMap)o.material.emissiveIntensity=.6+.35*Math.sin(t*1.6+o.position.y*4);}},fx:"zvjezde"},
    livada:{n:"Cvjetna livada",d:"Krzno puno sitnog cvijeća. Proljeće na četiri šape!",p:200,rar:"r",col:{A:0xffffff,T:0xffe0f0,P:0xff6a9a},tx:cwT.meadow,mode:"map"},
    dugin:{n:"Dugin skok",d:"Legendarno: krzno se prelijeva svim bojama duge i iskri na svakom skoku.",rar:"l",col:{A:0xffffff,T:0xffffff,P:0xffffff},m:{roughness:.4},anim:(ms,t)=>cwHue(ms,t,.35,1,.55,.75),fx:"duga",
      leg:{st:"jump",need:150,txt:"Skoči 150 puta kao Zečica Skokica",u:"skokova"}}},
  macka:{
    tigrica:{n:"Mala tigrica",d:"Narančaste i crne pruge. Opasno slatka!",p:220,rar:"r",col:{A:0xffffff,D:0x22201e},tx:cwT.tiger,mode:"map"},
    ninja:{n:"Mačka nindža",d:"Crna kao noć, s crvenim ušima i očima koje svijetle u mraku.",p:260,rar:"r",col:{A:0x1a1a24,D:0xd8303a,E:0xffe040},glow:{E:1.6,D:.25},m:{roughness:.55}},
    galaksija:{n:"Galaktička mačka",d:"U krznu joj se vrti cijela galaksija, s ružičastim i ljubičastim maglicama.",p:340,rar:"e",col:{A:0x140c34,D:0x24104a,E:0xff8ae8},tx:cwT.nebula,tr:["A","D"],gi:.9,glow:{E:1.2},
      anim:(ms,t)=>{const tx=WOWTX.cw_nebula;if(tx){tx.offset.x=(t*.03)%1;tx.offset.y=(t*.017)%1;}},fx:"zvjezde"},
    munja:{n:"Mačka munja",d:"Legendarno: krzno pucketa plavim munjama, a za njom lete iskre.",rar:"l",col:{A:0x142454,D:0x0a1030,E:0x8af0ff},tx:cwT.bolt,tr:["A","D"],gi:1.2,gc:0xbff4ff,glow:{E:1.8},
      anim:(ms,t)=>{const tx=WOWTX.cw_bolt;if(tx){tx.offset.y=(-t*.5)%1;tx.offset.x=Math.floor(t*7)*.29%1;}const f=Math.random()<.12?2.2:1;for(const o of ms)if(o.material.emissiveMap)o.material.emissiveIntensity=f;},fx:"munja",
      leg:{st:"run",need:2000,txt:"Pretrči 2000 metara kao Mačka Brzica",u:"m"}}},
  pingvin:{
    led:{n:"Ledeni kristal",d:"Prozirno plavi kao santa leda, s bridovima koji blistaju.",p:300,rar:"e",col:{A:0x6ab8e8,W:0xe8f8ff,O:0xa8e0ff},tx:cwT.facets,tr:["A","W"],m:{metalness:.25,roughness:.12},gi:.8,
      anim:(ms,t)=>{for(const o of ms)if(o.material.emissiveMap)o.material.emissiveIntensity=.5+.5*Math.max(0,Math.sin(t*5+o.position.x*9+o.position.y*5));},fx:"dijamant"},
    heroj:{n:"Superpingvin",d:"Plavo-žuto odijelo junaka. Uz plašt iz ormara poleti kroz valove!",p:220,rar:"r",col:{A:0x2a4ad8,W:0xffd23a,O:0xd8303a},m:{roughness:.45}},
    zlatni:{n:"Zlatni pingvin",d:"Sjaji kao zlatna medalja s pobjedničkog postolja.",p:360,rar:"e",col:{A:0xd8a020,W:0xfff2c8,O:0xff8a20},m:{metalness:.65,roughness:.25},glow:{A:.12}},
    aurora:{n:"Polarna svjetlost",d:"Legendarno: po krznu plešu zelene i ljubičaste svjetlosne zavjese polarnog neba.",rar:"l",col:{A:0x081428,W:0x16284a,O:0x6af0c0},tx:cwT.aurora,tr:["A","W"],gi:1.1,
      anim:(ms,t)=>{const tx=WOWTX.cw_aurora;if(tx){tx.offset.x=(t*.05)%1;tx.offset.y=Math.sin(t*.4)*.08;}},fx:"aurora",
      leg:{st:"swim",need:800,txt:"Preplivaj 800 metara kao Pingvin Plivko",u:"m"}}},
  jez:{
    kaktus:{n:"Cvjetni kaktus",d:"Zelene bodlje i ružičasti cvjetići. Bodlja kaže da ne bocka!",p:220,rar:"r",col:{A:0x4a9a4a,F:0xd8f0b0,S:0xffffff},tx:cwT.cactus,tr:["S","A"],mode:"map"},
    zlatni:{n:"Zlatni jež",d:"Svaka bodlja je od čistog zlata. Kotrlja se kao blago!",p:340,rar:"e",col:{A:0xc89a30,F:0xffe8b0,S:0xffd040},m:{metalness:.65,roughness:.25},glow:{S:.25}},
    kesten:{n:"Jesenji kesten",d:"Krzno od šarenog jesenskog lišća i bodlje boje kestena.",p:200,rar:"r",col:{A:0xffffff,S:0x8a3a1a,F:0xf0c890},tx:cwT.leaves,mode:"map"},
    vatromet:{n:"Ježev vatromet",d:"Legendarno: svaka bodlja svijetli drugom bojom, a u trku prska iskre.",rar:"l",col:{A:0x24143a,S:0xffffff,F:0xe8d0ff},glow:{S:1},anim:(ms,t)=>{for(const o of ms){if(o.userData.cr!=="S")continue;const h=((t*.6+o.position.x*2+o.position.z*3)%1+1)%1;cwCol(o,h,1,.6);o.material.emissive.setHSL(h,1,.55);o.material.emissiveIntensity=1;}},fx:"disko",
      leg:{st:"roll",need:1500,txt:"Kotrljaj se 1500 metara kao Ježić Kotrljko",u:"m"}}},
  panda:{
    cirkus:{n:"Cirkuska zvijezda",d:"Svjetlucavi šljokičasti kostim za najveću akrobatkinju u cirkusu.",p:320,rar:"e",col:{A:0x5a1aa8,K:0x24104a,W:0xffe0f8,T:0xffd23a},tx:cwT.sequin,tr:["A","T"],gi:.9,m:{metalness:.3,roughness:.3},
      anim:(ms,t)=>{const tx=WOWTX.cw_sequin;if(tx)tx.offset.x=Math.floor(t*5)*.083%1;},fx:"disko"},
    bambus:{n:"Bambus nindža",d:"Zeleno odijelo s prugama bambusa. Tiha i brza na granama.",p:220,rar:"r",col:{A:0xffffff,K:0x16201a,W:0xd8f0c0,T:0x8ad05a},tx:cwT.bamboo,mode:"map"},
    jesen:{n:"Jesenje lišće",d:"Krzno od crvenog, narančastog i zlatnog lišća. Šuška dok skače!",p:200,rar:"r",col:{A:0xffffff,T:0xffd23a},tx:cwT.leaves,mode:"map"},
    vatrena:{n:"Vatrena panda",d:"Legendarno: krzno gori toplim plamenom koji nikoga ne peče.",rar:"l",col:{A:0x2a0a04,K:0x1a0804,W:0xffd080,T:0xff8a20},tx:cwT.flame,tr:["A","T"],gi:1.1,glow:{W:.3},
      anim:(ms,t)=>{const tx=WOWTX.cw_flame;if(tx){tx.offset.y=(-t*.6)%1;tx.offset.x=Math.sin(t*2)*.04;}},fx:"lava",
      leg:{st:"dbl",need:60,txt:"Napravi 60 dvostrukih skokova kao Crvena panda",u:"skokova"}}},
  sova:{
    snjezna:{n:"Snježna sova",d:"Bijela kao prvi snijeg, s crnim pjegicama i zlatnim kljunom.",p:200,rar:"r",col:{A:0xffffff,L:0xffffff,Y:0xffc020},tx:cwT.speck,tr:["A","L"],mode:"map"},
    paun:{n:"Paunova sova",d:"Perje s paunovim okima u tirkiznoj, zlatnoj i plavoj boji.",p:280,rar:"e",col:{A:0xffffff,L:0x2ab8a8,Y:0xffd040},tx:cwT.peacock,mode:"map",m:{roughness:.4}},
    mudra:{n:"Mudra knjižničarka",d:"Ljubičasti plašt posut zlatnim zvjezdicama, za sovu koja je pročitala sve knjige.",p:260,rar:"r",col:{A:0x4a1a7a,L:0xd8c8ff,Y:0xffd040},tx:cwT.goldstar,gi:.9,gc:0xffd860},
    feniks:{n:"Sova feniks",d:"Legendarno: perje gori kao feniks, a dok jedri iza nje ostaje vatreni trag.",rar:"l",col:{A:0x3a0a04,L:0xff8a20,Y:0xfff0a0},tx:cwT.flame,gi:1.2,glow:{L:.6},
      anim:(ms,t)=>{const tx=WOWTX.cw_flame;if(tx){tx.offset.y=(-t*.6)%1;}},fx:"lava",
      leg:{st:"glide",need:60,txt:"Jedri ukupno 60 sekundi kao Sovica Lepršica",u:"s"}}}};
/* ---------- accessories: one on the head and one on the body ---------- */
const cwBox=(g,w,h,d,c,x,y,z,o)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mStd(c,o));m.position.set(x,y,z);g.add(m);return m;};
const cwMesh=(g,geo,c,x,y,z,o)=>{const m=new THREE.Mesh(geo,mStd(c,o));m.position.set(x,y,z);g.add(m);return m;};
function cwWing(g,s,cols,px,py,pz,sc){const w=new THREE.Group();w.position.set(px,py,pz);g.add(w);cols.forEach((c,i)=>{const m=new THREE.Mesh(new THREE.CircleGeometry(.22*sc*(i?.72:1),16),new THREE.MeshStandardMaterial({color:LC(c),transparent:true,opacity:.78,side:THREE.DoubleSide,roughness:.3,emissive:LC(c),emissiveIntensity:.35,depthWrite:false}));
  m.scale.set(1,1.35,1);m.position.set(s*.2*sc*(i?.8:1),i?-.12*sc:.1*sc,-.02*i);m.rotation.y=Math.PI/2;m.rotation.x=i?.5:-.4;w.add(m);});return w;}
const CWA={
  zec:{
    masne:{n:"Mašne na ušima",d:"Dvije ružičaste mašne. Uši nikad nisu izgledale ljepše!",p:120,rar:"c",s:"g",at:"head",b(g){for(const s of [-1,1]){cwBox(g,.05,.05,.05,0xff4aa0,s*.08,.2,.04);const a=cwBox(g,.09,.07,.03,0xff7ac0,s*.08-.055,.2,.04);a.rotation.z=.5;const b=cwBox(g,.09,.07,.03,0xff7ac0,s*.08+.055,.2,.04);b.rotation.z=-.5;}}},
    mrkva:{n:"Mrkva-ruksak",d:"Ruksak u obliku goleme mrkve. Grickalica za put!",p:150,rar:"r",s:"t",at:"root",b(g){const c=cwMesh(g,new THREE.ConeGeometry(.12,.46,8),0xff8a20,0,.66,-.08,{flatShading:true});c.rotation.x=-Math.PI/2;
      for(let i=0;i<3;i++){const l=cwBox(g,.04,.16,.04,0x3aa83a,(i-1)*.05,.72,.2);l.rotation.z=(i-1)*.4;}for(const s of [-1,1])cwBox(g,.03,.03,.5,0x8a5a32,s*.14,.52,0);}},
    vila:{n:"Vilinska krila",d:"Prozirna krila koja se prelijevaju i lepršaju dok skačeš.",p:260,rar:"e",s:"t",at:"root",b(g){const W=[cwWing(g,-1,[0xb8f0ff,0xffc8f0],-.1,.56,-.05,1),cwWing(g,1,[0xb8f0ff,0xffc8f0],.1,.56,-.05,1)];
      g.userData.anim=(t,mv)=>{W.forEach((w,i)=>{w.rotation.y=(i?-1:1)*(.4+Math.sin(t*(mv>.2?16:5))*(mv>.2?.55:.25));w.children.forEach((m,j)=>m.material.emissive.setHSL((t*.15+j*.3+i*.1)%1,.8,.6));});};}}},
  macka:{
    zvono:{n:"Ogrlica sa zvončićem",d:"Crvena ogrlica i zlatni zvončić koji zazvoni kad trčiš.",p:120,rar:"c",s:"t",at:"root",b(g){const r=cwMesh(g,new THREE.TorusGeometry(.19,.035,6,18),0xd8303a,0,.52,.3);r.rotation.x=Math.PI/2-.35;r.scale.set(1,.75,1);
      cwMesh(g,new THREE.SphereGeometry(.055,10,8),0xffd040,0,.43,.44,{metalness:.7,roughness:.25});g.userData.bell=1;}},
    kruna:{n:"Kruna kraljice mačaka",d:"Zlatna kruna s rubinima i safirima. Mijau, veličanstvo!",p:240,rar:"e",s:"g",at:"head",b(g){const gold={metalness:.65,roughness:.28,side:THREE.DoubleSide};cwMesh(g,new THREE.CylinderGeometry(.13,.13,.08,14,1,true),0xf5c33b,0,.22,.06,gold);
      for(let i=0;i<5;i++){const a=i/5*6.283;cwMesh(g,new THREE.ConeGeometry(.035,.1,5),0xf5c33b,Math.cos(a)*.13,.31,.06+Math.sin(a)*.13,gold);cwMesh(g,new THREE.OctahedronGeometry(.025),[0xff3a5a,0x3a8aff,0x3aff9a][i%3],Math.cos(a)*.135,.22,.06+Math.sin(a)*.135,{emissive:[0xff3a5a,0x3a8aff,0x3aff9a][i%3],emissiveIntensity:.6});}}},
    srce:{n:"Naočale srca",d:"Ružičaste sunčane naočale u obliku srca. Zvijezda otoka!",p:160,rar:"r",s:"g",at:"head",b(g){const sh=new THREE.Shape();sh.moveTo(0,-.05);sh.bezierCurveTo(.07,.0,.06,.07,0,.035);sh.bezierCurveTo(-.06,.07,-.07,0,0,-.05);
      for(const s of [-1,1]){const f=cwMesh(g,new THREE.ExtrudeGeometry(sh,{depth:.015,bevelEnabled:false}),0xff4aa8,s*.09,.06,.235);const l=cwMesh(g,new THREE.ShapeGeometry(sh),0x3a1a4a,s*.09,.06,.252,{roughness:.1,metalness:.3});l.scale.setScalar(.75);}cwBox(g,.06,.015,.015,0xff4aa8,0,.075,.24);}}},
  pingvin:{
    pompon:{n:"Kapa s pomponom",d:"Topla pletena kapa s velikim bijelim pomponom.",p:140,rar:"c",s:"g",at:"head",b(g){cwMesh(g,new THREE.CylinderGeometry(.15,.17,.12,14),0xd8303a,0,.31,.02);cwMesh(g,new THREE.CylinderGeometry(.175,.175,.05,14),0xffffff,0,.26,.02);cwMesh(g,new THREE.SphereGeometry(.07,10,8),0xffffff,0,.41,.02,{roughness:1});}},
    ronilac:{n:"Ronilačke naočale",d:"Žute naočale i disalica. Spreman za istraživanje dna mora!",p:160,rar:"r",s:"g",at:"head",b(g){for(const s of [-1,1]){const f=cwMesh(g,new THREE.CylinderGeometry(.06,.06,.04,14),0xffd23a,s*.075,.17,.19);f.rotation.x=Math.PI/2;const l=cwMesh(g,new THREE.CircleGeometry(.045,14),0x8ad8ff,s*.075,.17,.212,{roughness:.05,metalness:.4,emissive:0x3a8ab8,emissiveIntensity:.3});}
      const b=cwMesh(g,new THREE.TorusGeometry(.17,.015,6,20),0x16243a,0,.17,.02);b.rotation.x=Math.PI/2;const t=cwMesh(g,new THREE.CylinderGeometry(.018,.018,.32,6),0xff8a20,.17,.3,.06);cwMesh(g,new THREE.SphereGeometry(.03,8,6),0xff8a20,.17,.46,.06);}},
    plast:{n:"Plašt junaka",d:"Crveni plašt sa zlatnom zvijezdom. Leprša dok jurišaš!",p:220,rar:"r",s:"t",at:"root",b(g){const pv=new THREE.Group();pv.position.set(0,.64,-.19);g.add(pv);const c=cwBox(pv,.4,.52,.02,0xd8303a,0,-.26,0,{side:THREE.DoubleSide});
      const st=cwMesh(pv,new THREE.OctahedronGeometry(.07),0xffd23a,0,-.22,-.02,{emissive:0xffb000,emissiveIntensity:.5});st.scale.z=.3;g.userData.anim=(t,mv)=>{pv.rotation.x=-(.08+mv*.6+Math.sin(t*(4+mv*8))*(.05+mv*.12));};}}},
  jez:{
    jabuka:{n:"Jabuka na bodljama",d:"Prava ježeva tradicija: crvena jabuka nabodena na leđa.",p:120,rar:"c",s:"t",at:"root",b(g){cwMesh(g,new THREE.SphereGeometry(.11,12,10),0xe8302a,.06,.6,-.1,{roughness:.35});cwBox(g,.02,.06,.02,0x6a4020,.06,.72,-.1);const l=cwBox(g,.07,.02,.04,0x4ab83a,.1,.73,-.1);l.rotation.z=-.4;}},
    gljiva:{n:"Gljiva-šešir",d:"Crveni klobuk s bijelim točkama. Šumski stil!",p:160,rar:"r",s:"g",at:"head",b(g){const c=cwMesh(g,new THREE.SphereGeometry(.16,14,8,0,6.283,0,Math.PI/2),0xd8302a,0,.08,.06,{roughness:.5});c.scale.y=.75;
      cwMesh(g,new THREE.CylinderGeometry(.16,.16,.02,14),0xfff4e0,0,.08,.06);for(let i=0;i<6;i++){const a=i/6*6.283;cwMesh(g,new THREE.SphereGeometry(.025,6,4),0xffffff,Math.cos(a)*.1,.15,.06+Math.sin(a)*.1);}cwMesh(g,new THREE.SphereGeometry(.03,6,4),0xffffff,0,.2,.06);}},
    balon:{n:"Balon na uzici",d:"Šareni balon privezan za bodlju. Pleše na vjetru!",p:200,rar:"e",s:"t",at:"root",b(g){const pv=new THREE.Group();pv.position.set(-.12,.5,-.12);g.add(pv);cwBox(pv,.012,.9,.012,0xffffff,0,.45,0);
      const b=cwMesh(pv,new THREE.SphereGeometry(.2,16,12),0xff4aa8,0,1.05,0,{roughness:.2,metalness:.1,emissive:0xff4aa8,emissiveIntensity:.15});b.scale.y=1.18;cwMesh(pv,new THREE.ConeGeometry(.04,.06,6),0xff4aa8,0,.82,0);cwMesh(pv,new THREE.SphereGeometry(.05,8,6),0xffffff,.07,1.13,.12,{emissive:0xffffff,emissiveIntensity:.5});
      g.userData.anim=(t,mv)=>{pv.rotation.z=Math.sin(t*1.7)*.15-mv*.1;pv.rotation.x=mv*.5+Math.sin(t*1.3)*.08;};}}},
  panda:{
    stap:{n:"Bambusov štap",d:"Dugi štap od bambusa za akrobacije na vrhovima drveća.",p:140,rar:"c",s:"t",at:"root",b(g){const pv=new THREE.Group();pv.position.set(0,.62,-.06);pv.rotation.z=.95;g.add(pv);cwMesh(pv,new THREE.CylinderGeometry(.03,.03,1.1,8),0x8ad05a,0,0,0);
      for(let i=-2;i<=2;i++)cwMesh(pv,new THREE.CylinderGeometry(.036,.036,.03,8),0x4a8a2a,0,i*.22,0);const l=cwBox(pv,.12,.02,.05,0x5ab83a,.05,.5,0);l.rotation.z=.6;}},
    cilindar:{n:"Cirkuski cilindar",d:"Mali crni cilindar s crvenom vrpcom, nakrivljen za šou.",p:180,rar:"r",s:"g",at:"head",b(g){const pv=new THREE.Group();pv.position.set(.07,.27,.04);pv.rotation.z=-.3;g.add(pv);cwMesh(pv,new THREE.CylinderGeometry(.14,.14,.02,16),0x16161a,0,0,0);cwMesh(pv,new THREE.CylinderGeometry(.09,.09,.18,16),0x16161a,0,.1,0);
      cwMesh(pv,new THREE.CylinderGeometry(.093,.093,.04,16),0xd8303a,0,.03,0);cwMesh(pv,new THREE.OctahedronGeometry(.03),0xffd23a,.09,.04,.02,{emissive:0xffb000,emissiveIntensity:.6});}},
    lampion:{n:"Lampion na repu",d:"Crveni papirnati lampion koji toplo svijetli u mraku.",p:220,rar:"e",s:"t",at:"tail",b(g){cwBox(g,.02,.3,.02,0x6a4020,0,.62,-.86);const L=cwMesh(g,new THREE.CylinderGeometry(.08,.08,.15,10),0xff4a2a,0,.86,-.86,{emissive:0xff7a2a,emissiveIntensity:.9,roughness:.6});
      cwMesh(g,new THREE.CylinderGeometry(.05,.05,.03,10),0xffd23a,0,.95,-.86);cwMesh(g,new THREE.CylinderGeometry(.05,.05,.03,10),0xffd23a,0,.77,-.86);g.userData.anim=t=>{L.material.emissiveIntensity=.8+Math.sin(t*9)*.1+Math.sin(t*23)*.08;L.rotation.z=Math.sin(t*2.2)*.12;};}}},
  sova:{
    naocale:{n:"Naočale za čitanje",d:"Okrugle zlatne naočale. Za čitanje najdebljih knjiga!",p:120,rar:"c",s:"g",at:"head",b(g){for(const s of [-1,1]){cwMesh(g,new THREE.TorusGeometry(.09,.014,6,18),0xc8a040,s*.12,.2,.25,{metalness:.6,roughness:.3});cwMesh(g,new THREE.CircleGeometry(.08,16),0xd8f0ff,s*.12,.2,.252,{transparent:true,opacity:.3,roughness:.05});}
      cwBox(g,.07,.014,.014,0xc8a040,0,.22,.25,{metalness:.6,roughness:.3});}},
    diploma:{n:"Diplomska kapa",d:"Crna kapa sa zlatnom resom. Doktorica svih priča!",p:200,rar:"r",s:"g",at:"head",b(g){cwMesh(g,new THREE.CylinderGeometry(.18,.19,.1,4),0x16161a,0,.4,0).rotation.y=Math.PI/4;const t=cwBox(g,.5,.03,.5,0x16161a,0,.46,0);t.rotation.y=Math.PI/4;
      cwMesh(g,new THREE.SphereGeometry(.025,8,6),0xffd23a,0,.48,0);const r=cwBox(g,.014,.22,.014,0xffd23a,.2,.37,.0);cwMesh(g,new THREE.ConeGeometry(.03,.07,6),0xffd23a,.2,.24,0);}},
    svjetiljka:{n:"Mala svjetiljka",d:"Svjetiljka s krijesnicom u kandžama. Sova vidi i u najmračnijoj noći.",p:220,rar:"e",s:"t",at:"root",b(g){const pv=new THREE.Group();pv.position.set(.12,.18,.22);g.add(pv);cwBox(pv,.012,.12,.012,0x5a5a5a,0,.06,0);
      const f=cwBox(pv,.12,.14,.12,0x3a3a44,0,-.08,0,{metalness:.5,roughness:.4});f.material.transparent=true;f.material.opacity=.35;const L=cwMesh(pv,new THREE.SphereGeometry(.045,10,8),0xfff0a0,0,-.08,0,{emissive:0xffe060,emissiveIntensity:1.4});
      cwMesh(pv,new THREE.ConeGeometry(.08,.05,4),0x3a3a44,0,.02,0).rotation.y=Math.PI/4;g.userData.anim=t=>{L.material.emissiveIntensity=1.2+Math.sin(t*6)*.25;pv.rotation.z=Math.sin(t*2)*.15;};}}}};
/* ---------- the shop items ---------- */
const CWIT=[];
for(const ch in CWO)for(const k in CWO[ch]){const o=CWO[ch][k];const it=mgAdd("co",ch+":"+k,Object.assign({ch,ok:k,how:""},o,o.leg?{wr:"Legendarno: "+o.leg.txt,p:0}:{}));CWIT.push(it);}
for(const ch in CWA)for(const k in CWA[ch]){const o=CWA[ch][k];const it=mgAdd("ca",ch+":"+k,{ch,ok:k,n:o.n,d:o.d,p:o.p,rar:o.rar,s:o.s});CWIT.push(it);}
catName.co="Odijelo lika";catName.ca="Dodatak lika";
function cwState(ch){S.mg.cw=S.mg.cw||{};return S.mg.cw[ch]||(S.mg.cw[ch]={o:"",g:"",t:""});}
function cwStats(ch){S.mg.cst=S.mg.cst||{};return S.mg.cst[ch]||(S.mg.cst[ch]={});}
/* ---------- painting and dressing a character model ---------- */
function cwPaint(g,ch,oid){const R=CWRK[ch];if(!R)return [];const O=oid&&CWO[ch]?CWO[ch][oid]:null;const ms=[];
  g.traverse(o=>{if(!o.isMesh||o.userData.cwAcc)return;const ud=o.userData;
    if(ud.cr===undefined){const p=o.geometry.parameters||{};const vol=(p.width||1)*(p.height||1)*(p.depth||1);const base=ud.bc||o.material.color;const r=R[base.getHex()];ud.cr=r&&(vol>.0006||CWSMALL[r])?r:null;ud.oc=base.clone();}
    if(!ud.cr)return;ms.push(o);if(!ud.cwCl){o.material=o.material.clone();ud.cwCl=1;}const m=o.material,r=ud.cr;
    const c=O&&O.col&&O.col[r]!=null?LC(O.col[r]):ud.oc.clone();if(ud.bc)ud.bc.copy(c);else m.color.copy(c);
    const mm=O&&O.m||{};m.metalness=mm.metalness||0;m.roughness=mm.roughness!=null?mm.roughness:.8;
    const tx=O&&O.tx&&(O.tr||["A"]).includes(r)?O.tx():null;const mapT=tx&&O.mode==="map"?tx:null,emT=tx&&O.mode!=="map"?tx:null;
    if(m.map!==mapT){m.map=mapT;m.needsUpdate=true;}if(m.emissiveMap!==emT){m.emissiveMap=emT;m.needsUpdate=true;}
    if(emT){m.emissive.copy(LC(O.gc||0xffffff));m.emissiveIntensity=O.gi||.9;}else if(O&&O.glow&&O.glow[r]){m.emissive.copy(c);m.emissiveIntensity=O.glow[r];}else{m.emissive.setRGB(0,0,0);m.emissiveIntensity=1;}});
  g.userData.cwms=ms;g.userData.cwo=O;if(O&&O.anim)O.anim(ms,1.3);return ms;}
function cwDress(g,ch,only){const old=g.userData.cwAccs||[];for(const a of old){if(a.parent)a.parent.remove(a);a.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});}g.userData.cwAccs=[];
  const st=cwState(ch),parts=g.userData.parts||{};const ids=only?[only]:[st.g,st.t].filter(Boolean);
  for(const id of ids){const A=CWA[ch]&&CWA[ch][id];if(!A)continue;const grp=new THREE.Group();A.b(grp);grp.traverse(o=>{if(o.isMesh){o.userData.cwAcc=1;o.castShadow=true;}});
    let par=g;if(A.at==="head"&&parts.head)par=parts.head;else if(A.at==="tail"&&parts.tail){par=parts.tail;grp.position.set(0,-parts.tail.position.y+.0,-parts.tail.position.z);}par.add(grp);g.userData.cwAccs.push(grp);}
  return g;}
function cwOutfit(ch){const st=cwState(ch);return st.o&&mgOwn(mgIt("co:"+ch+":"+st.o))?st.o:"";}
function cwIcon(it){const ch=it.ch;return snapModel("cw:"+it.id,()=>{const g=MODELS[ch]();cwPaint(g,ch,it.cat==="co"?it.ok:cwOutfit(ch));if(it.cat==="ca")cwDress(g,ch,it.ok);return g;},.55,it.cat==="ca"&&it.ok==="balon"?3:2.3);}
{const _mi=mgIcon;mgIcon=function(it){if(it&&(it.cat==="co"||it.cat==="ca"))return cwIcon(it);if(it&&it.cat==="char"&&it.k&&(cwOutfit(it.k)||cwState(it.k).g||cwState(it.k).t)){const ch=it.k,o=cwOutfit(ch),s=cwState(ch);
  return snapModel("cwp:"+ch+":"+o+":"+s.g+":"+s.t,()=>{const g=MODELS[ch]();cwPaint(g,ch,o);cwDress(g,ch);return g;},.55,2.3);}return _mi(it);};}
/* the island character */
function cwModel(){return typeof charPiv!=="undefined"&&charPiv?charPiv.children[0]:null;}
{const _ac=applyChar;applyChar=function(){_ac.apply(this,arguments);const k=S.mg&&S.mg.char;if(!MCHAR[k])return;const m=cwModel();if(!m)return;cwPaint(m,k,cwOutfit(k));cwDress(m,k);if(rida){rida.shadeF=null;}};}
/* minigames use the dressed character too */
{const _ma=miniActor;miniActor=function(sc){const g=_ma.apply(this,arguments);const ch=S.mg&&MCHAR[S.mg.char]?S.mg.char:null;if(ch){cwPaint(g,ch,cwOutfit(ch));cwDress(g,ch);}return g;};}
{const _aa=miniAnimActor;miniAnimActor=function(g,t,run){_aa.apply(this,arguments);const O=g.userData.cwo,tt=performance.now()/1000;if(O&&O.anim)O.anim(g.userData.cwms,tt);for(const a of g.userData.cwAccs||[])if(a.userData.anim)a.userData.anim(tt,run?1:0);};}
/* ---------- particles for outfits ---------- */
const CWFX=Object.assign({},WOWFX,{
  duga:p=>mgSpawn({t:"star",x:p.x,y:p.y+.2+Math.random()*.8,z:p.z,vy:.4,life:.8,size:.22,size2:.02,col:[0xff5a5a,0xffb03a,0xffe85a,0x6ae86a,0x5ab8ff,0xb87aff],add:1,spin:3}),
  munja:p=>mgSpawn({t:"spark",x:p.x,y:p.y+.2+Math.random()*.7,z:p.z,vx:(Math.random()-.5)*2,vy:.6+Math.random(),vz:(Math.random()-.5)*2,life:.35,size:.22,size2:.02,col:[0xbff4ff,0x6ad0ff,0xffffff],add:1}),
  aurora:p=>mgSpawn({t:"spark",x:p.x,y:p.y+.4+Math.random()*.9,z:p.z,vy:.35,life:1,size:.24,size2:.03,col:[0x6affc0,0x5ad8ff,0xc88aff],add:1})});
let cwFxT=0,cwChk=0;
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);if(!S.mg||!rida)return;const k=S.mg.char;if(!MCHAR[k])return;const m=cwModel();if(!m)return;const t=performance.now()/1000;
  const O=m.userData.cwo;if(O&&O.anim)O.anim(m.userData.cwms,t);const hs=FP.on?Math.hypot(FP.v.x,FP.v.z):0;const mv=FP.on?Math.min(1,hs/5):(rida.tx!=null?.5:0);
  for(const a of m.userData.cwAccs||[]){if(a.userData.anim)a.userData.anim(t,mv);if(a.userData.bell&&FP.on&&FP.ground&&hs>2&&Math.random()<dt*3)tone(2400+Math.random()*300,.12,"sine",.012);}
  if(FP.on&&O&&O.fx&&CWFX[O.fx]&&!FP.under){cwFxT+=dt*(hs>.8?10:3);while(cwFxT>1){cwFxT--;const P=FP.p;CWFX[O.fx]({x:P.x+(Math.random()-.5)*.6,y:P.y,z:P.z+(Math.random()-.5)*.6});}}
  /* stats for legendary outfits */
  if(FP.on){const st=cwStats(k);if(k==="macka"&&FP.ground&&!FP.swim&&hs>1.5)st.run=(st.run||0)+hs*dt;if(k==="jez"&&FP.ground&&!FP.swim&&hs>3)st.roll=(st.roll||0)+hs*dt;if(k==="pingvin"&&FP.swim&&hs>.5)st.swim=(st.swim||0)+hs*dt;if(k==="sova"&&FP.gliding)st.glide=(st.glide||0)+dt;}
  if((cwChk-=dt)<=0){cwChk=1;cwLegCheck(k);}};}
{const _fj=onFoxJump;onFoxJump=function(dbl){_fj.apply(this,arguments);if(!S.mg)return;const k=S.mg.char;if(k==="zec"&&!dbl){const st=cwStats(k);st.jump=(st.jump||0)+1;}if(k==="panda"&&dbl){const st=cwStats(k);st.dbl=(st.dbl||0)+1;}};}
function cwLeg(ch){for(const k in CWO[ch])if(CWO[ch][k].leg)return k;return null;}
function cwLegCheck(ch){const lk=cwLeg(ch);if(!lk)return;const O=CWO[ch][lk],it=mgIt("co:"+ch+":"+lk);if(!it||mgOwn(it))return;const v=cwStats(ch)[O.leg.st]||0;
  const st=cwStats(ch);const q=Math.floor(v/O.leg.need*4);if(q>(st.q||0)&&q<4){st.q=q;toast(MCHAR[ch].n+": legendarno odijelo "+O.n+" je "+q*25+"% otključano!",3000);}
  if(v>=O.leg.need){S.mg.own[it.id]=today();cwState(ch).o=lk;save();if(S.mg.char===ch)applyChar();mgPoof();if(typeof fireworks==="function")fireworks();
    rewardReveal({kicker:"Legendarno odijelo!",title:O.n,chest:"gold",items:[{ic:cwIcon(it),n:O.n,cnt:0,rar:"l"}],sub:"Zaslužila si ga igrajući kao "+MCHAR[ch].n+". Odmah ga nosiš, a mijenjaš ga u Čarobnoj trgovini, kartica Ormar.",ok:"Jupi!"});}}
/* ---------- the Ormar tab in the magic shop ---------- */
MTABS.splice(2,0,["ormar","Ormar"]);MLINES.ormar="Svaki lik ima svoj ormar s posebnim odijelima i dodacima. Legendarno odijelo ne može se kupiti: zaslužiš ga igrajući kao taj lik!";
let cwSel="";
function cwFmt(v,u){return u==="m"?Math.floor(v)+" m":u==="s"?Math.floor(v)+" s":Math.floor(v)+" "+u;}
function cwHTML(){const chars=Object.keys(MCHAR);if(!cwSel)cwSel=MCHAR[S.mg.char]?S.mg.char:chars.find(k=>mgOwn(mgIt("char:"+k)))||chars[0];const ch=cwSel,C=MCHAR[ch],own=mgOwn(mgIt("char:"+ch)),st=cwState(ch);
  let h='<div class="cwchips">'+chars.map(k=>'<button class="cwchip'+(k===ch?' on':'')+(mgOwn(mgIt("char:"+k))?'':' lock')+'" data-cwc="'+k+'"><img alt="" src="'+portrait(k)+'"><span>'+esc(MCHAR[k].n.split(" ").slice(-1)[0])+'</span></button>').join("")+'</div>';
  h+='<div class="cwhead"><b>'+esc(C.n)+'</b>'+(own?(S.mg.char===ch?' <span class="cwplay">Sada igraš ovim likom ✓</span>':' <button class="btn green" data-cwplay="'+ch+'">Igraj s ovim likom</button>'):' <button class="btn soft" data-cwbuy="1">Prvo nabavi lik u kartici Likovi</button>')+'</div>';
  const card=(it,on,btn,extra)=>'<div class="mcard r-'+it.rar+(on?' on':'')+(mgOwn(it)?' own':'')+'"><span class="tag">'+RWR[it.rar].n+'</span><div class="mic"><img alt="" src="'+cwIcon(it)+'"></div><b>'+esc(it.n)+'</b><small>'+esc(it.d||"")+'</small>'+(extra||"")+btn+'</div>';
  h+='<h3 class="cwh">Odijela</h3><div class="mgrid">';
  h+='<div class="mcard r-c'+(!st.o?' on':'')+' own"><div class="mic"><img alt="" src="'+portrait(ch)+'"></div><b>Osnovno krzno</b><small>Onakva kakvu je svi poznaju.</small><button class="btn '+(!st.o?'green':'soft')+'" data-cwo="">'+(!st.o?'Nosi ✓':'Obuci')+'</button></div>';
  for(const k in CWO[ch]){const it=mgIt("co:"+ch+":"+k),O=CWO[ch][k],ow=mgOwn(it),on=ow&&st.o===k;let btn,extra="";
    if(ow)btn='<button class="btn '+(on?'green':'soft')+'" data-cwo="'+k+'">'+(on?'Nosi ✓':'Obuci')+'</button>';
    else if(O.leg){const v=cwStats(ch)[O.leg.st]||0,pc=Math.min(100,Math.round(v/O.leg.need*100));extra='<div class="cwleg"><i style="width:'+pc+'%"></i></div><small class="cwlt">'+esc(O.leg.txt)+'<br><b>'+Math.floor(Math.min(v,O.leg.need))+' / '+cwFmt(O.leg.need,O.leg.u)+'</b></small>';btn='<button class="btn soft" data-cwlock="'+k+'">Zaslužuje se igrom</button>';}
    else btn='<button class="btn '+(own&&S.coins>=it.p?'green':'soft')+'" data-cwo="'+k+'">'+COIN_SVG+it.p+'</button>';
    h+=card(it,on,btn,extra);}
  h+='</div><h3 class="cwh">Dodaci</h3><div class="mgrid">';
  for(const k in CWA[ch]){const it=mgIt("ca:"+ch+":"+k),A=CWA[ch][k],ow=mgOwn(it),on=ow&&st[A.s]===k;const btn=ow?'<button class="btn '+(on?'green':'soft')+'" data-cwa="'+k+'">'+(on?'Nosi ✓':'Stavi')+'</button>':'<button class="btn '+(own&&S.coins>=it.p?'green':'soft')+'" data-cwa="'+k+'">'+COIN_SVG+it.p+'</button>';
    h+=card(it,on,btn,'<em class="perk">'+(A.s==="g"?"Na glavi":"Na tijelu")+'</em>');}
  return h+'</div>';}
function cwApply(ch){if(S.mg.char===ch)applyChar();}
function cwBind(){const B=$("sheetBody");
  B.querySelectorAll("[data-cwc]").forEach(b=>b.onclick=()=>{sfx.click();cwSel=b.dataset.cwc;sheetMagic("ormar",true);});
  B.querySelectorAll("[data-cwplay]").forEach(b=>b.onclick=()=>{sfx.click();S.mg.char=b.dataset.cwplay;applyChar();applyPerks();save();mgPoof();sheetMagic("ormar",true);});
  B.querySelectorAll("[data-cwbuy]").forEach(b=>b.onclick=()=>{sfx.click();sheetMagic("char");});
  B.querySelectorAll("[data-cwlock]").forEach(b=>b.onclick=()=>{sfx.click();const O=CWO[cwSel][b.dataset.cwlock];toast(O.leg.txt+". Napredak se broji samo dok igraš kao taj lik u istraživanju!",4200);});
  const buyOr=(b,it,wear)=>{const ch=cwSel;if(mgOwn(it)){sfx.click();wear();save();cwApply(ch);mgPoof();sheetMagic("ormar",true);return;}
    if(!mgOwn(mgIt("char:"+ch))){sfx.click();toast("Prvo nabavi lik "+MCHAR[ch].n+" u kartici Likovi!",3000);return;}if(S.coins<it.p){mgPoor(it.p);return;}if(!mgArm(b,"Kupi za "+it.p+"?"))return;
    S.coins-=it.p;S.mg.own[it.id]=today();wear();save();renderEco();cwApply(ch);closeSheet();mgPoof();
    rewardReveal({kicker:"Novo u ormaru!",title:it.n,chest:"disc",items:[{ic:cwIcon(it),n:it.n,cnt:0,rar:it.rar}],sub:(S.mg.char===ch?MCHAR[ch].n+" to odmah nosi!":"Obući će to kad zaigraš kao "+MCHAR[ch].n+".")+" Mijenjaš u kartici Ormar.",ok:"Super!",onDone:()=>sheetMagic("ormar",false)});};
  B.querySelectorAll("[data-cwo]").forEach(b=>b.onclick=()=>{const k=b.dataset.cwo,ch=cwSel,st=cwState(ch);if(!k){sfx.click();st.o="";save();cwApply(ch);sheetMagic("ormar",true);return;}buyOr(b,mgIt("co:"+ch+":"+k),()=>{st.o=k;});});
  B.querySelectorAll("[data-cwa]").forEach(b=>b.onclick=()=>{const k=b.dataset.cwa,ch=cwSel,st=cwState(ch),A=CWA[ch][k];const it=mgIt("ca:"+ch+":"+k);buyOr(b,it,()=>{st[A.s]=st[A.s]===k?"":k;});});}
{const _sm=sheetMagic;sheetMagic=function(tab,keep){const r=_sm.apply(this,arguments);if((tab||mgTab)!=="ormar")return r;const box=$("sheetBody").querySelector(".mgrid");if(box){box.insertAdjacentHTML("beforebegin",cwHTML());box.remove();}cwBind();return r;};}
/* boxes only give character items for characters you already have */
{const _pn=mgPickNew;mgPickNew=function(minR){for(let i=0;i<10;i++){const it=_pn(minR);if(!it||!(it.cat==="co"||it.cat==="ca")||mgOwn(mgIt("char:"+it.ch)))return it;}return null;};}
{const _gv=mgGive;mgGive=function(it){_gv.apply(this,arguments);if(it&&it.cat==="ca"){const st=cwState(it.ch),A=CWA[it.ch][it.ok];if(!st[A.s])st[A.s]=it.ok;cwApply(it.ch);}if(it&&it.cat==="co"){const st=cwState(it.ch);if(!st.o)st.o=it.ok;cwApply(it.ch);}};}

/* ---------- seven new wow costumes for Rida ---------- */
COSTUMES.push({k:"dugakruna",slot:"glava",n:"Dugina kruna",p:600},{k:"aureola",slot:"glava",n:"Zvjezdana aureola",p:480},{k:"rog",slot:"glava",n:"Jednorogov rog",p:420},{k:"neonusi",slot:"glava",n:"Neonske mačje uši",p:260},
  {k:"neonogrlica",slot:"vrat",n:"Neonska ogrlica",p:220},{k:"raketa",slot:"ledja",n:"Raketni ruksak",p:650},{k:"dugakrila",slot:"ledja",n:"Dugina krila",p:700});
{const _hm=hatMesh;hatMesh=function(k){const g=new THREE.Group();
  if(k==="dugakruna"){cwMesh(g,new THREE.TorusGeometry(.22,.03,6,24),0xf5c33b,0,.03,0,{metalness:.6,roughness:.3}).rotation.x=Math.PI/2;const cr=[];for(let i=0;i<7;i++){const a=i/7*6.283;const c=cwMesh(g,new THREE.OctahedronGeometry(.07),0xffffff,Math.cos(a)*.22,.16,Math.sin(a)*.22,{roughness:.1,metalness:.2,emissive:0xffffff,emissiveIntensity:.8,flatShading:true});c.scale.set(.8,2.2,.8);c.userData.i=i;cr.push(c);}
    const top=cwMesh(g,new THREE.OctahedronGeometry(.06),0xffffff,0,.26,.22,{emissive:0xff4aa8,emissiveIntensity:1});
    g.userData.anim=t=>{cr.forEach(c=>{c.material.emissive.setHSL((t*.25+c.userData.i/7)%1,1,.55);c.material.color.copy(c.material.emissive);c.position.y=.16+Math.sin(t*3+c.userData.i)*.02;});top.material.emissive.setHSL((t*.4)%1,1,.6);};}
  else if(k==="aureola"){const r=cwMesh(g,new THREE.TorusGeometry(.24,.025,8,30),0xffe080,0,.32,0,{emissive:0xffc040,emissiveIntensity:1.1,metalness:.4});r.rotation.x=Math.PI/2;const orb=new THREE.Group();orb.position.y=.32;g.add(orb);
    for(let i=0;i<6;i++){const a=i/6*6.283;const s=cwMesh(orb,new THREE.OctahedronGeometry(.045),0xffffff,Math.cos(a)*.32,0,Math.sin(a)*.32,{emissive:[0xfff0a0,0xffb8f0,0xb8f0ff][i%3],emissiveIntensity:1.2});}
    g.userData.anim=t=>{orb.rotation.y=t*1.4;r.position.y=orb.position.y=.32+Math.sin(t*2)*.03;orb.children.forEach((s,i)=>{s.rotation.y=t*4;s.position.y=Math.sin(t*3+i)*.04;});};}
  else if(k==="rog"){const h=cwMesh(g,new THREE.ConeGeometry(.07,.46,14),0xfff8f0,0,.22,.14,{roughness:.2,metalness:.15,emissive:0xffffff,emissiveIntensity:.3});h.rotation.x=.35;const rings=[];
    for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(.06-i*.013,.009,6,16),mStd(0xffd860,{metalness:.6,roughness:.25}));r.position.set(0,-.17+i*.1,0);r.rotation.x=Math.PI/2;r.rotation.y=.3;h.add(r);rings.push(r);}
    g.userData.anim=t=>{h.material.emissive.setHSL((t*.2)%1,.9,.6);h.material.emissiveIntensity=.35+Math.sin(t*3)*.15;if(Math.random()<.06&&rida&&FP.on){const P=FP.p;mgSpawn({t:"star",x:P.x,y:P.y+1.6,z:P.z,vy:.5,life:.6,size:.16,size2:.02,col:[0xffb8f0,0xb8f0ff,0xfff0a0],add:1,spin:3});}};}
  else if(k==="neonusi"){const b=cwMesh(g,new THREE.TorusGeometry(.25,.02,6,20,Math.PI),0x16243a,0,0,0);const E=[];for(const s of [-1,1]){const e=cwMesh(g,new THREE.ConeGeometry(.11,.22,4),0xffffff,s*.17,.19,0,{emissive:0xff4ad8,emissiveIntensity:1.2,flatShading:true});e.rotation.z=-s*.25;E.push(e);
      const i2=cwMesh(g,new THREE.ConeGeometry(.04,.08,4),0x16243a,s*.17,.15,.07);i2.rotation.z=-s*.25;}
    g.userData.anim=t=>{E.forEach((e,i)=>{e.material.emissive.setHSL((t*.3+i*.5)%1,1,.55);e.material.emissiveIntensity=.9+Math.pow(Math.abs(Math.sin(t*3.4)),4)*.8;});};}
  else return _hm(k);
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});if(g.userData.anim)try{g.userData.anim(1.3,0);}catch(e){}return g;};}
{const _cm=costumeMesh;costumeMesh=function(k){const g=new THREE.Group();
  if(k==="neonogrlica"){const B=[];for(let i=0;i<14;i++){const a=i/14*6.283;const b=new THREE.Mesh(new THREE.SphereGeometry(.035,8,6),mStd(0xffffff,{emissive:0xffffff,emissiveIntensity:1}));b.position.set(Math.cos(a)*.24,0,Math.sin(a)*.24);B.push(b);}
    const ring=new THREE.Group();B.forEach(b=>ring.add(b));ring.position.set(0,.6,.36);ring.rotation.x=-.5;g.add(ring);g.userData.anim=t=>{B.forEach((b,i)=>{b.material.emissive.setHSL((t*.3+i/14)%1,1,.55);b.material.color.copy(b.material.emissive);});};}
  else if(k==="raketa"){const F=[];for(const s of [-1,1]){cwMesh(g,new THREE.CylinderGeometry(.09,.09,.38,12),0xd8dce8,s*.12,.92,-.24,{metalness:.6,roughness:.3});cwMesh(g,new THREE.ConeGeometry(.09,.14,12),0xd8303a,s*.12,1.18,-.24);
      cwMesh(g,new THREE.CylinderGeometry(.06,.08,.06,12),0x4a4a55,s*.12,.7,-.24,{metalness:.5});const f=new THREE.Mesh(new THREE.ConeGeometry(.065,.3,10),new THREE.MeshBasicMaterial({color:LC(0xffa030),transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));f.rotation.x=Math.PI;f.position.set(s*.12,.52,-.24);g.add(f);F.push(f);}
    cwBox(g,.14,.24,.06,0x8a8f9a,0,.92,-.18,{metalness:.5,roughness:.35});cwBox(g,.06,.04,.02,0x5ad8ff,0,.98,-.145,{emissive:0x3ab8ff,emissiveIntensity:1});
    g.userData.anim=(t,dt)=>{const mv=FP.on?Math.min(1,Math.hypot(FP.v.x,FP.v.z)/5+(FP.ground?0:.6)):0;F.forEach(f=>{const s=.35+mv*.9+Math.random()*.25;f.scale.set(1,s,1);f.position.y=.67-.15*s;f.material.opacity=.4+mv*.5;});
      if(FP.on&&mv>.3&&Math.random()<.5){const P=FP.p,c=Math.cos(FP.yaw),sn=Math.sin(FP.yaw);mgSpawn({t:"spark",x:P.x-sn*.3,y:P.y+.5,z:P.z-c*.3,vy:-2-Math.random()*2,life:.4,size:.25,size2:.04,col:[0xffd060,0xff7a20,0xffffff],add:1,drag:2});}};}
  else if(k==="dugakrila"){const cols=[0xff5a7a,0xffb03a,0xffe85a,0x6ae87a,0x5ab8ff,0xb87aff];const W=[];for(const s of [-1,1]){const w=new THREE.Group();w.position.set(s*.12,.95,-.12);g.add(w);
      cols.forEach((c,i)=>{const sh=new THREE.Shape();sh.moveTo(0,0);sh.quadraticCurveTo(.25,.12+i*.03,.62-i*.05,.02+i*.06-.12);sh.quadraticCurveTo(.3,-.02,0,0);const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshStandardMaterial({color:LC(c),emissive:LC(c),emissiveIntensity:.55,transparent:true,opacity:.82,side:THREE.DoubleSide,depthWrite:false,roughness:.3}));
        m.rotation.y=s>0?0:Math.PI;m.rotation.z=(i-2.5)*.16;m.position.z=-i*.004;w.add(m);});W.push(w);}
    g.userData.anim=(t,dt)=>{const mv=FP.on?Math.min(1,Math.hypot(FP.v.x,FP.v.z)/4+(FP.ground?0:.8)):0;W.forEach((w,i)=>{w.rotation.y=(i?1:-1)*(.5+Math.sin(t*(mv>.2?12:3.5))*(mv>.2?.5:.18));});};}
  else return _cm(k);
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});if(g.userData.anim)try{g.userData.anim(1.3,0);}catch(e){}return g;};}
{const _ca=costumeAnim;costumeAnim=function(dt,tt){_ca.apply(this,arguments);if(typeof hatObj!=="undefined"&&hatObj&&hatObj.userData.anim)hatObj.userData.anim(tt,dt);for(const s in partObj){const o=partObj[s];if(o&&o.userData.anim)o.userData.anim(tt,dt);}};}
