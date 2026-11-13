/* =================== v17: interiors for Životinje, Znanost, Priče iz života (see 25j_unutra.js) =================== */
/* ---------- Životinje i priroda ---------- */
UNB["zivotinje/0"]=(K,b)=>{/* Sunčana farma: the barn, stalls with animals, hens on nests, a hay loft, the feeding trough */
  K.box(16,13,9,(i,j,k)=>i<=4||i>=12?T.sijeno:T.daske,(i,j,k)=>j>=7?T.tdaske:T.crvena,T.tdaske,T.bijela);
  for(const [i,k] of [[3,3],[8,3],[13,3],[3,9],[8,9],[13,9]])K.V(i,9,k,T.svjetlo);for(let k=1;k<12;k+=2)K.P(14,.26,.26,0x5a3a22,8,7.6,k+.5);
  for(const k of [4,8]){K.V(0,3,k,T.staklo);K.V(15,3,k,T.staklo);}
  /* stalls along the left wall */
  for(const z of [1.1,4.1,7.1,10.1]){K.P(3.8,.08,.08,0xe8dcc0,2.9,.9,z);K.P(3.8,.08,.08,0xe8dcc0,2.9,.45,z);}for(const z of [1.1,2.6,4.1,5.6,7.1,8.6,10.1])K.P(.1,1.05,.1,0xe8dcc0,4.8,0,z);
  for(const z of [2.6,5.6,8.6]){K.P(.08,.08,1.4,0xe8dcc0,4.8,.9,z);K.P(.6,.3,.4,0x8a5a30,1.4,0,z);K.P(.5,.1,.3,0xd9c27a,1.4,.3,z);}
  K.res("krava","Krava Mila",2.8,2.6,0,["Muuu! Dobro došla u staju. Ovdje svi spavamo na mekanom sijenu.","Svakog jutra dajem mlijeko za cijeli otok. Muuu!","Gladni prijatelji čekaju kod korita u sredini. Pomogneš nam?"],Math.PI/2);
  K.pet("ponij","Ponij Zlatko",2.8,5.6,0,"Iii-ha! Ponekad me jašu po cijelom otoku.",Math.PI/2);
  K.pet("prase","Prase Ružica",2.8,8.6,0,"Rok-rok! Blato je najbolja kupka.",Math.PI/2);
  /* hens on their nests */
  for(const [i,k] of [[13,6],[14,7],[13,8]]){K.V(i,1,k,T.sijeno);K.S(.09,0xfff8e6,i+.3,1.05,k+.4);}
  K.pet("kokos","Koka Pjegica",13.5,6.6,1,"Kokodak! Snijela sam jaje!",-Math.PI/2);K.pet("kokos","Koka Točkica",14.4,7.6,1,"Kokoda-daak!",-Math.PI/2);
  /* hay loft and the bale steps */
  K.fill(6,14,5,5,1,3,T.daske);K.stairs(12,7,0,-1,1,4,T.sijeno,2);for(const [i,k] of [[7,1],[8,1],[7,2],[10,1]])K.V(i,6,k,T.sijeno);K.V(7,7,1,T.sijeno);
  for(let x=6.2;x<14.5;x+=1.4)K.P(.08,.8,.08,0x5a3a22,x,5,3.95);K.P(8.4,.08,.08,0x5a3a22,10.2,5.75,3.95);
  /* feeding trough: the genre's activity */
  K.P(2.4,.5,.7,0x7a5230,8.5,0,6.5);K.P(2.2,.12,.5,0xd9c27a,8.5,.45,6.5);for(let n=0;n<4;n++)K.cone(.07,.3,0xff8a2a,7.8+n*.45,.5,6.4,{rz:1.5});
  K.act(8.5,7.6,0,"Korito za gladne prijatelje",1.5);
  /* milk cans, pitchfork, wheelbarrow */
  for(const x of [10.6,11.1])K.C(.2,.6,0xcfd6de,x,0,10.8,{rt:.14});K.P(.05,1.6,.05,0x8a6a4a,14.6,0,10.9,{rz:.12});K.P(.4,.05,.05,0x9aa3ad,14.7,1.55,10.9);
  K.P(.8,.3,.6,0x4a7fd6,6.5,.3,10.6,{rz:.1});K.C(.18,.08,0x2c2c34,7,.18,10.6,{rx:Math.PI/2,mid:1});
  const dust=[];for(let n=0;n<30;n++)dust.push(K.S(.025,0xfff6c0,1+Math.random()*14,Math.random()*7,1+Math.random()*11,{glow:1,op:.5}));K.anim((dt,t)=>dust.forEach((m,n)=>{m.position.y+=Math.sin(t*.5+n)*dt*.12;m.position.x+=Math.cos(t*.3+n)*dt*.08;}));
  K.lantern(8,7.5,9,.08);K.read(10.5,9.2,0,Math.PI);
  K.door(8,12,0xb83a2e);K.pt(0xfff0c8,.38,20,8,4,6.5);
  K.gems([[10.5,5,1.8],[14.5,0,11],[5.6,0,11.3]]);
  return {intro:"Staja puna prijatelja. Na sijeno se penješ po balama!"};};

UNB["zivotinje/1"]=(K,b)=>{/* Vjetrenjača: the turning shaft and millstone, gears at the top, stairs along the wall, sails outside the window */
  const cx=6,cz=6;
  K.round(cx,cz,5,13,T.kamen,(i,j,k)=>{const a=Math.atan2(k-cz,i-cx);return (j===3&&Math.abs(Math.cos(a*2))<.18)||(j>=9&&j<=10&&k<cz-3&&Math.abs(i-cx)<=1)?T.staklo:T.bijela;},T.tdaske,T.kamen);
  K.fill(cx-5,cx+5,8,8,cz-5,cz+5,(i,j,k)=>{const d=K.dist(i,k,cx,cz);return d>=2.5&&d<4.5&&K.G(i,j,k)===0?T.daske:K.G(i,j,k);});
  K.arc(cx,cz,3.6,Math.PI*.55,.48,1,7,T.tdaske);
  for(const [i,k] of [[3,6],[9,6],[6,3]])K.V(i,13,k,T.svjetlo);K.V(2,4,6,T.lampion);K.V(10,4,6,T.lampion);
  /* millstone and shaft */
  K.fill(5,7,1,1,5,7,T.kamen);const stone=K.C(1.25,.36,0x9aa3ad,6.5,1,6.5,{seg:24});K.C(.18,.02,0xfff8e6,6.5,1.36,6.5);
  const shaft=K.C(.2,11.3,0x8a5a30,6.5,1.36,6.5);const crown=K.gear(6.5,11.4,6.5,1.1,"y",.7,0x9a6a3c);const pin=K.gear(6.5,11.95,4.9,.55,"z",-1.4,0x9a6a3c);
  K.P(.14,.14,5.2,0x8a5a30,6.5,11.88,3.2);
  K.anim((dt)=>{stone.rotation.y+=dt*.7;shaft.rotation.y+=dt*.7;});
  K.hot(6.5,8.6,1.4,"Mlinski kamen",()=>{sfx.pop();const p=K.at(6.5,1.5,6.5);burst(p.x,p.y,p.z,35,[[1,1,1],[1,.97,.85]],1.5,1.5,1.4);K.say(IN.host,"Kamen melje zrno u brašno. Vjetar okreće krila, krila okreću ovaj veliki stup.");},0);
  /* sails outside, seen from the balcony window */
  const sails=K.grp(6.5,9.8,-.6);for(let n=0;n<4;n++){const arm=new THREE.Group();arm.rotation.z=n*Math.PI/2;sails.add(arm);K.P(.16,4.2,.12,0x7a5230,0,0,0,{par:arm});K.P(.9,3.4,.04,0xf3ead8,.55,.7,0,{par:arm});}
  K.C(.3,.5,0x5a3a22,0,0,0,{par:sails,rx:Math.PI/2,mid:1});K.anim((dt)=>sails.rotation.z-=dt*.7);
  /* flour sacks and the activity */
  for(const [x,z,r] of [[2.6,8.2,.2],[3.2,9,.9],[2.4,9.2,1.6],[9.6,3.6,.5]]){K.P(.6,.7,.45,0xe8dcc0,x,0,z,{ry:r});K.P(.4,.1,.3,0xd9c9a8,x,.7,z,{ry:r});}
  K.act(9.6,8.6,0,"Brašno za gladne prijatelje",1.3);K.P(.8,.5,.5,0x7a5230,9.8,0,9.2);for(let n=0;n<3;n++)K.S(.13,0xf3ead8,9.5+n*.3,.55,9.2);
  const fl=[];for(let n=0;n<24;n++)fl.push(K.S(.03,0xffffff,6.5,1.5,6.5,{glow:1,op:.6}));K.anim((dt,t)=>fl.forEach((m,n)=>{const q=(t*.15+n/24)%1,a=n*2.4+t*.3;m.position.set(K.X0+6.5+Math.cos(a)*(.6+q*3),K.Y0+1+1.4+q*5,K.Z0+6.5+Math.sin(a)*(.6+q*3));m.material.opacity=.6*(1-q);}));
  K.res("vjeverica","Vjeverica Mlinarica",8.6,3.6,8,["Dobro došla u mlin! Ja ovdje meljem brašno za kruh cijelog otoka.","Popni se uz zid do balkona i pogledaj kroz prozor kako se krila okreću.","Vjetrenjače su nekad mljele žito u svakom selu."],-.4);
  K.read(3.6,4,0,.8);
  K.door(6,11);K.pt(0xfff0c8,.38,16,6.5,4,6.5);
  K.gems([[6.5,8,2.6],[3.5,0,7.2],[9.6,8,6.5]]);
  return {intro:"Mlin radi! Vjetar okreće krila, a krila mlinski kamen."};};

UNB["zivotinje/2"]=(K,b)=>{/* Staklenik: glass walls and roof, beds of vegetables, a pond with a frog, butterflies, a sprinkler */
  K.box(15,13,7,(i,j,k)=>(i===7||k===6)?T.staza:T.zemlja,(i,j,k)=>j===1?T.bijela:(i%4===0||k%4===0?T.bijela:T.staklo),(i,j,k)=>(i%4===0||k%4===0)?T.bijela:T.staklo,T.bijela);
  for(const [i,k] of [[4,4],[10,4],[4,9],[10,9]])K.V(i,7,k,T.svjetlo);
  /* vegetable beds */
  const crops=[];const bed=(i0,i1,k0,k1,kind)=>{for(let i=i0;i<=i1;i++)for(let k=k0;k<=k1;k++){K.V(i,0,k,T.oranica);const x=i+.5,z=k+.5;
      if(kind===0){K.C(.03,.5,0x3f8a3f,x,0,z);const t=K.S(.12,0xe04a3a,x,.42,z);crops.push(t);}else if(kind===1){K.cone(.08,.22,0xff8a2a,x,-.1,z,{rx:Math.PI});crops.push(K.S(.13,0x4f9a4a,x,.18,z));}else crops.push(K.S(.22,0x7ac46a,x,.16,z));}};
  bed(2,5,2,4,0);bed(9,12,2,4,1);bed(2,5,8,10,2);
  K.anim((dt,t)=>crops.forEach((c,n)=>c.rotation.z=Math.sin(t*1.2+n)*.08));
  /* pond with lily pads and a frog */
  K.fill(9,12,0,0,8,10,T.voda);K.fill(9,12,-1,-1,8,10,T.kamen);for(const [x,z] of [[9.6,8.6],[11.4,9.8],[12.4,8.4]])K.C(.32,.03,0x3fa86a,x,-.08,z);K.S(.09,0xff8fb0,11.4,0,9.8,{glow:1});
  K.res("zaba","Žaba Kreketalica",10.6,9,0,["Kre-kre! Dobro došla u staklenik. Ovdje je uvijek toplo, čak i zimi.","Staklo pušta sunce unutra, a toplinu ne pušta van. Zato biljke rastu brže!","Zalij biljke i vidi kako se raduju."],-.6);
  /* hanging pots */
  for(const [x,z] of [[3.5,6.5],[11.5,6.5],[7.5,2.5]]){K.P(.02,1.2,.02,0xd9c9a8,x,5.6,z);K.C(.22,.3,0xb5653a,x,5.3,z,{rt:.28});for(let n=0;n<5;n++)K.P(.05,.5+n*.1,.05,0x4f9a4a,x+Math.cos(n)*.2,4.9-n*.08,z+Math.sin(n)*.2);}
  /* butterflies */
  const bf=[];for(let n=0;n<7;n++){const g=K.grp(7,3,6);const col=[0xffd24a,0xff8fb0,0x6cc4e0,0xc08bff][n%4];const w1=K.P(.18,.02,.14,col,-.1,0,0,{par:g,glow:1}),w2=K.P(.18,.02,.14,col,.1,0,0,{par:g,glow:1});bf.push({g,w1,w2,a:n*.9,r:1.5+n*.5,h:1.4+(n%3)*.8});}
  K.anim((dt,t)=>bf.forEach((f,n)=>{const a=t*.4+f.a;f.g.position.set(K.X0+7.5+Math.cos(a)*f.r*.9,K.Y0+1+f.h+Math.sin(t*2+n)*.3,K.Z0+6.5+Math.sin(a*1.3)*f.r*.6);f.g.rotation.y=-a;const w=Math.sin(t*16+n)*.9;f.w1.rotation.z=w;f.w2.rotation.z=-w;}));
  /* sprinkler and feeder */
  K.C(.05,.9,0x9aa3ad,7.5,0,8.2);const head=K.C(.12,.08,0x9aa3ad,7.5,.9,8.2);let spray=0;
  K.anim((dt)=>{spray=Math.max(0,spray-dt);head.rotation.y+=dt*(1+spray*12);if(spray>0&&Math.random()<.6){const p=K.at(7.5,1,8.2);burst(p.x,p.y,p.z,3,[[.6,.85,1],[1,1,1]],2.5,1.5,.8);}});
  K.hot(7.5,8.2,1.3,"Zalij biljke",()=>{spray=3;sfx.splash();crops.forEach(c=>c.scale.setScalar(1.15));setTimeout(()=>crops.forEach(c=>c.scale.setScalar(1)),3000);K.say(IN.host,"Kre! Biljke piju vodu korijenjem. Hvala ti!");},0);
  K.P(.9,.8,.6,0x9a6a3c,13,0,11);for(let n=0;n<3;n++)K.C(.14,.08,0xc79a5a,12.7+n*.3,.8,11);K.pet("jez","Jež Bodljo",12,11.2,0,"Frk-frk! Ja jedem bubice, a ne cvijeće.",-2.4);
  K.act(12.4,10.3,0,"Hranilica za gladne prijatelje",1.2);
  for(const [i,k] of [[1,11],[2,11],[13,1]])K.V(i,1,k,T.bundeva);K.pot(1.6,1.6,0,0xff6b6b,1.3);K.pot(13.4,6,0,0xffd24a,1.3);
  K.read(1.8,6.6,0,Math.PI/2);
  K.door(7,12,0xe8e0d0);K.pt(0xfffbe0,.3,18,7.5,4,6.5);
  K.gems([[1.5,0,1.5],[13.5,0,2.5],[2.5,0,11.6]]);
  return {intro:"Stakleni vrt pun povrća, cvijeća i leptira."};};

/* ---------- Znanost i svemir ---------- */
UNB["znanost/0"]=(K,b)=>{/* Zvjezdarnica: dome full of stars, big turning telescope, orrery on a table */
  const cx=7,cz=7;
  K.round(cx,cz,6,12,(i,j,k)=>K.dist(i,k,cx,cz)<2.5?T.vuna_t:T.tdaske,(i,j,k)=>j<=4?T.bijela:T.kvarc,T.vuna_t,T.kvarc);
  const sky=K.tex(512,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,"#0b1430");g.addColorStop(1,"#22305e");x.fillStyle=g;x.fillRect(0,0,w,h);for(let n=0;n<420;n++){x.fillStyle="rgba(255,255,255,"+(.3+Math.random()*.7)+")";const s=Math.random()<.1?2:1;x.fillRect(Math.random()*w,Math.random()*h,s,s);}
    x.strokeStyle="rgba(170,200,255,.55)";x.lineWidth=1;for(const c of [[[60,40],[80,55],[100,50],[120,70]],[[300,60],[320,40],[345,52],[330,80]],[[420,30],[440,60],[470,64]]]){x.beginPath();c.forEach((p,n)=>n?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();}});
  const dome=K.add(new THREE.SphereGeometry(5.9,40,20,0,Math.PI*2,0,Math.PI/2),new THREE.MeshBasicMaterial({map:sky,side:THREE.BackSide}),7.5,4.4,7.5);
  const shoot=K.P(1.2,.04,.04,0xffffff,7.5,9,7.5,{glow:1,op:0});K.anim((dt,t)=>{const q=(t*.25)%1;shoot.material.opacity=q<.2?Math.sin(q/.2*Math.PI)*.9:0;const a=Math.floor(t*.25)*2.1;shoot.position.set(K.X0+7.5+Math.cos(a)*3-q*4,K.Y0+1+8.4-q*1.5,K.Z0+7.5+Math.sin(a)*3);dome.rotation.y+=dt*.01;});
  for(const [i,k] of [[1,7],[13,7],[7,1],[7,13],[3,3],[11,3],[3,11],[11,11]])K.V(i,3,k,T.svjetlo);
  /* telescope on its platform */
  K.fill(6,8,1,1,6,8,T.kvarc);K.V(7,1,9,T.kvarc);const tel=K.grp(7.5,1,7.5);K.C(.25,1.2,0x2c3440,0,0,0,{par:tel});const tube=new THREE.Group();tube.position.y=1.3;tel.add(tube);
  K.C(.32,2.8,0xe8e0d0,0,0,0,{par:tube,rx:-.9,mid:1,rt:.24});K.C(.36,.12,0xc9a23a,0,.0,0,{par:tube,rx:-.9,mid:1});K.anim((dt,t)=>tel.rotation.y=Math.sin(t*.12)*1.2);
  K.act(7.5,9.4,1,"Teleskop",1.5);
  /* orrery */
  K.table(3.6,9.6,0,1.3,1.3);const sun=K.S(.22,0xffc84a,3.6,1.2,9.6,{glow:1});const pls=[];for(const [r,s,c,z] of [[.35,1.6,0x9aa3ad,.06],[.5,1.1,0xffd9a0,.09],[.65,.8,0x4a9fe0,.1],[.82,.55,0xe0603a,.08]]){const m=K.S(z,c,3.6,1.2,9.6);pls.push({m,r,s});}
  K.anim((dt,t)=>pls.forEach(p=>p.m.position.set(K.X0+3.6+Math.cos(t*p.s)*p.r,K.Y0+1+1.2,K.Z0+9.6+Math.sin(t*p.s)*p.r)));
  K.hot(3.6,9.6,1.3,"Planetarij",()=>{sfx.chime();K.say(IN.host,["Huu! Merkur je najbliži Suncu i najbrže ga obiđe.","Huu! Zemlja je treći planet od Sunca, plavi od mora.","Huu! Mars je crven jer mu je tlo puno hrđe.","Huu! Svjetlost Sunca do nas putuje oko osam minuta."][Math.floor(Math.random()*4)],5000);},0);
  K.sign(1.2,.9,1.6,2.2,7.5,Math.PI/2,(x,w,h)=>{x.fillStyle="#16243a";x.fillRect(0,0,w,h);x.fillStyle="#ffd24a";[[18,14],[30,22],[44,18],[56,32],[40,44]].forEach(p=>{x.beginPath();x.arc(p[0],p[1],2.5,0,7);x.fill();});x.strokeStyle="#9fc4ff";x.beginPath();x.moveTo(18,14);x.lineTo(30,22);x.lineTo(44,18);x.lineTo(56,32);x.lineTo(40,44);x.stroke();});
  K.res("sova","Sova Zvjezdoznanka",10.6,8.6,0,["Huu! Dobro došla u zvjezdarnicu. Kupola je puna zvijezda.","Kroz teleskop se vide planeti i mjeseci. Popni se na postolje!","Gledaj gore: ponekad proleti zvijezda padalica."],-.8);
  K.read(10.2,4.6,0,-.8);
  K.door(7,13);K.pt(0xa8c0ff,.32,16,7.5,4,7.5);
  K.gems([[2.6,0,6.5],[11.6,0,6.5],[7.5,0,2.4]]);
  return {intro:"Zvjezdarnica: kupola puna zvijezda i veliki teleskop."};};

UNB["znanost/1"]=(K,b)=>{/* Raketa: engine room, crew deck, cockpit with a window to space and a countdown */
  const cx=5,cz=5;
  K.round(cx,cz,4,13,T.kvarc,(i,j,k)=>{const a=Math.atan2(k-cz,i-cx);if(j>=11&&k<cz)return T.staklo;if(j===7&&Math.abs(Math.sin(a))>.92)return T.staklo;return j===5||j===10?T.crvena:T.bijela;},T.crvena,T.duboki);
  for(const j of [5,10])K.fill(cx-4,cx+4,j,j,cz-4,cz+4,(i,jj,k)=>K.dist(i,k,cx,cz)<3.5&&K.G(i,jj,k)===0?T.kvarc:K.G(i,jj,k));
  K.spiral(cx,cz,1,10,T.duboki,T.bijela,2);
  for(const [i,k] of [[3,3],[7,7]])for(const j of [5,10])K.V(i,j,k,T.svjetlo);K.V(3,13,6,T.svjetlo);K.V(7,13,6,T.svjetlo);
  /* engine room */
  const core=K.C(.5,1.6,0xff8a2a,7.4,0,5.5,{glow:1,op:.85});K.C(.62,.12,0x9aa3ad,7.4,0,5.5);K.C(.62,.12,0x9aa3ad,7.4,1.55,5.5);K.anim((dt,t)=>{core.material.opacity=.7+Math.sin(t*4)*.15;core.scale.set(1+Math.sin(t*4)*.04,1,1+Math.sin(t*4)*.04);});
  for(const y of [.6,1.4])K.C(.08,3,0x9aa3ad,4.5,y,2.4,{rz:Math.PI/2,mid:1});K.sign(.8,.6,2.2,1.4,3.2,Math.PI/4,(x,w,h)=>{x.fillStyle="#1c232e";x.fillRect(0,0,w,h);x.strokeStyle="#6dff8a";x.lineWidth=2;x.beginPath();for(let n=0;n<w;n++)x.lineTo(n,h/2+Math.sin(n/4)*10);x.stroke();});
  K.pet("robopas","Robopas Vijak",3.2,7.2,0,"Bip-vau! Motori su spremni za let!",.8);
  /* crew deck */
  K.bed(7.2,4.6,5,Math.PI/2,0x4a7fd6);K.P(.9,.06,.4,0xcfd6de,2.6,6.3,3.2,{ry:.8});for(let n=0;n<4;n++)K.C(.06,.24,[0xff6b6b,0x6dff8a,0xffd24a,0x6cc4e0][n],2.4+n*.15,6.36,3.0+n*.15);
  K.sign(1,.7,2.1,5.8,6.6,Math.PI/2+.3,(x,w,h)=>{x.fillStyle="#0b1430";x.fillRect(0,0,w,h);for(let n=0;n<40;n++){x.fillStyle="#fff";x.fillRect(Math.random()*w,Math.random()*h,1,1);}x.strokeStyle="#ffd24a";x.beginPath();x.moveTo(10,30);x.lineTo(24,12);x.lineTo(40,20);x.lineTo(54,8);x.stroke();});
  K.act(2.6,6.4,5,"Zvjezdana karta",1.2);
  /* cockpit */
  for(const x of [4,6.2]){K.P(.7,.4,.7,0xe8e0d0,x,10,5.6);K.P(.7,.8,.16,0xe8e0d0,x,10.4,6);}K.P(3.2,.7,.5,0x2c3440,5.1,10,2.4,{rx:-.3});
  const btn=[];for(let n=0;n<10;n++)btn.push(K.P(.14,.05,.14,[0xff6b6b,0x6dff8a,0xffd24a,0x6cc4e0][n%4],3.8+(n%5)*.6,10.76,2.35+Math.floor(n/5)*.25,{glow:1}));K.anim((dt,t)=>btn.forEach((m,n)=>m.visible=Math.sin(t*(2+n%3)+n)>-.4));
  const space=K.tex(256,128,(x,w,h)=>{x.fillStyle="#04060f";x.fillRect(0,0,w,h);for(let n=0;n<200;n++){x.fillStyle="rgba(255,255,255,"+Math.random()+")";x.fillRect(Math.random()*w,Math.random()*h,1,1);}x.fillStyle="#4a9fe0";x.beginPath();x.arc(200,110,40,0,7);x.fill();x.fillStyle="#7ac46a";x.beginPath();x.arc(190,100,14,0,7);x.fill();});
  space.wrapS=space.wrapT=THREE.RepeatWrapping;K.add(new THREE.PlaneGeometry(14,7),new THREE.MeshBasicMaterial({map:space}),5,12.5,-3);
  let go=0;K.anim((dt)=>{space.offset.y+=dt*(.004+go*.6);if(go>0){go=Math.max(0,go-dt*.25);IN.grp.position.x=(Math.random()-.5)*.06*go;}else IN.grp.position.x=0;});
  K.hot(5.1,3.6,1.6,"Odbrojavanje",()=>{if(go>0)return;sfx.click();toast("3...",900);setTimeout(()=>toast("2...",900),1000);setTimeout(()=>toast("1...",900),2000);setTimeout(()=>{go=1;sfx.fanfare();toast("Polijetanje! Letimo kroz svemir!",2600);try{padRumble(800,.8,.6);}catch(e){}},3000);},10);
  K.res("robot","Robot Pipko",7,7.4,10,["Bip-bup! Dobro došla u raketu, astronautkinjo!","Dolje su motori, u sredini spavamo, a ovdje gore upravljamo.","Sjedni u kokpit i pritisni Odbrojavanje. Bip!"],-2.2);
  K.read(2.8,7.4,0,2.2);
  K.door(5,9);K.pt(0xd8e8ff,.38,14,5.5,6,5.5);
  K.gems([[2.6,10,5.6],[7.4,5,3.4],[3.5,0,3.4]]);
  return {intro:"Tri kata rakete: motori, spavaonica i kokpit na vrhu!"};};

UNB["znanost/2"]=(K,b)=>{/* Laboratorij: benches with bubbling flasks, a tesla coil, robot arm, aquarium with glowing jellyfish */
  K.box(15,13,8,(i,j,k)=>(i+k)%2?T.kvarc:T.bijela,T.bijela,(i,j,k)=>i>=5&&i<=9&&k>=4&&k<=8?T.staklo:T.bijela,T.kvarc);
  for(const [i,k] of [[2,2],[12,2],[2,10],[12,10],[4,6],[10,6]])K.V(i,8,k,T.svjetlo);
  /* two benches with flasks */
  const fl=[];for(const z of [3.2,6.4]){K.P(5,.9,.9,0xe8e0d0,4.2,0,z);K.P(5.1,.08,1,0x2c3440,4.2,.9,z);for(let n=0;n<5;n++){const x=2.2+n*1,c=[0x6dff8a,0xff6b6b,0x6cc4e0,0xffd24a,0xc08bff][(n+(z>4?2:0))%5];K.C(.16,.32,0xcfe6ff,x,.98,z,{glow:1,op:.25});fl.push(K.C(.13,.18,c,x,.98,z,{glow:1,op:.85}));}}
  K.anim((dt,t)=>fl.forEach((m,n)=>m.scale.y=1+Math.sin(t*3+n)*.15));
  K.hot(4.2,4.8,1.6,"Pokus",()=>{sfx.splash();fl.forEach(m=>m.material.color.setHSL(Math.random(),.9,.55));const p=K.at(4.2,1.4,4.8);burst(p.x,p.y,p.z,50,[[.4,1,.6],[1,.6,1],[1,1,1]],3,3,1.3);
    K.say(IN.host,["Bip! Kad pomiješaš ocat i sodu bikarbonu, nastane puno pjene.","Bip! Voda se smrzava na nula stupnjeva, a kipi na sto.","Bip! Sve oko nas sastoji se od sitnih atoma."][Math.floor(Math.random()*3)],5000);},0);
  /* tesla coil with sparks */
  K.C(.3,1.8,0x9aa3ad,12.5,0,2.5,{rt:.18});K.tor(.36,.14,0xcfd6de,12.5,2,2.5,{rx:Math.PI/2});const sp=[];for(let n=0;n<5;n++)sp.push(K.P(.03,.03,.9,0xb8e0ff,12.5,2,2.5,{glow:1}));
  K.anim((dt,t)=>sp.forEach((m,n)=>{const on=Math.random()<.35;m.visible=on;if(on){m.rotation.set(Math.random()*3,Math.random()*3,0);m.position.set(K.X0+12.5+(Math.random()-.5)*.6,K.Y0+1+2+(Math.random()-.3)*.5,K.Z0+2.5+(Math.random()-.5)*.6);}}));
  /* robot arm */
  const base=K.grp(11.5,0,7);K.C(.4,.3,0xf2b22e,0,0,0,{par:base});const a1=new THREE.Group();a1.position.y=.3;base.add(a1);K.P(.2,1.1,.2,0xf2b22e,0,0,0,{par:a1});const a2=new THREE.Group();a2.position.y=1.1;a1.add(a2);K.P(.16,.9,.16,0xe0a030,0,0,0,{par:a2});K.P(.3,.12,.12,0x2c3440,0,.9,0,{par:a2});
  K.anim((dt,t)=>{base.rotation.y=Math.sin(t*.5)*1.2;a1.rotation.z=Math.sin(t*.7)*.5;a2.rotation.z=.8+Math.sin(t*.9)*.5;});
  /* screen on the back wall and the activity */
  K.sign(3,1.7,7.5,1.8,1.06,0,(x,w,h)=>{x.fillStyle="#0b1430";x.fillRect(0,0,w,h);x.strokeStyle="#6cc4e0";x.lineWidth=2;for(let n=0;n<3;n++){x.beginPath();x.ellipse(50,54,36,12,n*1.05,0,7);x.stroke();}x.fillStyle="#ff6b6b";x.beginPath();x.arc(50,54,6,0,7);x.fill();
    x.strokeStyle="#6dff8a";for(let n=0;n<16;n++){const y=10+n*5.5;x.beginPath();x.moveTo(120+Math.sin(n*.8)*20,y);x.lineTo(120-Math.sin(n*.8)*20,y);x.stroke();}x.fillStyle="#ffd24a";for(let n=0;n<20;n++)x.fillRect(150+Math.random()*40,10+Math.random()*90,2,2);});
  K.act(7.5,2.4,0,"Zvjezdani zaslon",1.4);
  /* aquarium with jellyfish */
  K.P(2.4,1.4,.9,0x6cc4e0,2.6,0,10.6,{glow:1,op:.22});K.P(2.5,.1,1,0x2c3440,2.6,1.4,10.6);const jf=[];for(let n=0;n<4;n++)jf.push(K.S(.14,[0xff8fd8,0x9fe6ff,0xc08bff,0xfff0a0][n],1.9+n*.45,.6,10.6,{glow:1,op:.8}));
  K.anim((dt,t)=>jf.forEach((m,n)=>{m.position.y=K.Y0+1+.5+Math.sin(t*.9+n*1.7)*.35;m.scale.set(1,.7+Math.sin(t*3+n)*.2,1);}));
  K.table(10.5,10.4,0,1.2,.7,0xe8e0d0,0x9aa3ad);K.C(.12,.1,0x2c3440,10.3,.78,10.4);K.P(.08,.4,.08,0x2c3440,10.3,.88,10.3,{rx:.4});K.S(.08,0xf2c12e,10.8,.84,10.5);
  K.res("robot","Robot Pipko",9.5,4.8,0,["Bip-bup! Dobro došla u laboratorij. Ovdje sve istražujemo.","Pritisni Pokus na stolu s bočicama i vidi što će se dogoditi!","Ne diraj teslin svitak, iskri! Bip."],-.5);
  K.read(13,9.8,0,-1.2);
  K.door(7,12,0xcfd6de);K.pt(0xe8f4ff,.33,18,7.5,4,6.5);
  K.gems([[13.5,0,1.5],[1.5,0,1.5],[13.5,0,11]]);
  return {intro:"Laboratorij pun pokusa, iskri i svjetlucavih meduza!"};};

/* ---------- Priče iz života ---------- */
UNB["zivot/0"]=(K,b)=>{/* Kućica s vrtom: living room with a fireplace, kitchen, a cat, and a back door into a little garden */
  K.box(14,12,6,T.daske,(i,j,k)=>j===1?T.daske:T.bijela,T.sdaske,T.daske);
  for(let i=1;i<13;i+=3)K.P(.24,.24,10,0x7a5230,i+.5,4.76,6);for(const [i,k] of [[3,4],[10,4],[3,8],[10,8]])K.V(i,6,k,T.svjetlo);
  for(const k of [4,8])K.V(13,3,k,T.staklo);K.V(0,3,8,T.staklo);
  /* fireplace on the left wall */
  K.fill(1,1,1,4,3,6,T.kcigla);K.fill(1,1,1,2,4,5,0);K.fill(0,0,1,2,4,5,T.tuf);K.fire(1.5,0,5,.7);K.P(.6,.16,2.6,0x5a3a22,1.7,2.95,5);for(let n=0;n<3;n++)K.C(.08,.26,[0xff6b6b,0xffd24a,0x6cc4e0][n],1.7,3.1,4.2+n*.6);
  K.sofa(4.6,5,0,-Math.PI/2,0x4a7fd6,2.2);K.fill(2,3,0,0,3,7,T.vuna_c);K.table(3.2,5,0,.7,1.1);K.S(.08,0xc79a5a,3.1,.82,4.7);K.S(.08,0xc79a5a,3.3,.82,5.2);
  K.pet("macka","Mačka Mica",2.6,6.6,0,"Mrrr... prede kraj vatre.",1.2);
  /* kitchen in the back right */
  K.P(4,.9,.7,0xe8e0d0,10.5,0,1.5);K.P(4.1,.08,.8,0x9a6a3c,10.5,.9,1.5);K.P(.8,.06,.6,0x2c2c34,12,.98,1.5);K.S(.06,0xff6b3a,11.8,1.02,1.4,{glow:1});
  K.P(.8,1.9,.7,0xf3f3f3,8,0,1.5);K.P(.06,.6,.04,0x9aa3ad,8.3,1.1,1.88);
  const kettle=K.C(.18,.26,0xd8342a,12,1,1.5,{rt:.12});let steam=0;
  K.anim((dt)=>{steam=Math.max(0,steam-dt);if(steam>0&&Math.random()<.4){const p=K.at(12,1.4,1.5);burst(p.x,p.y,p.z,2,[[1,1,1]],.6,1.6,1.2,-.5);}});
  K.hot(11.6,2.6,1.3,"Skuhaj čaj",()=>{steam=4;sfx.pop();K.say(IN.host,"Čaj od kamilice s medom. Najbolji uz dobru knjigu!");},0);
  for(let n=0;n<5;n++)K.C(.1,.24,[0xffd24a,0xe04a3a,0x3fa86a][n%3],9.2+n*.4,1.9,1.15);K.P(2.4,.06,.3,0x9a6a3c,10,1.85,1.15);
  /* dining table */
  K.table(9.5,6,0,1.6,1);for(const [x,z,r] of [[8.4,6,Math.PI/2],[10.6,6,-Math.PI/2],[9.5,7,Math.PI]])K.chair(x,z,0,r);K.C(.12,.2,0xfff8e6,9.5,.78,6);K.S(.1,0xff8fb0,9.5,1.02,6);
  /* memory corner: armchair and photo wall (the activity) */
  K.chair(11.6,9.6,0,-2.4,0x8a2a2a);for(let n=0;n<4;n++)K.sign(.5,.42,12.94,1.6+(n%2)*.6,8.6+Math.floor(n/2)*.7,-Math.PI/2,(x,w,h)=>{x.fillStyle="#fff8e6";x.fillRect(0,0,w,h);x.fillStyle=["#8fd0ff","#ffd9a0","#c8f0c0","#ffc8e0"][n];x.fillRect(3,3,w-6,h-9);x.fillStyle="#e07a3a";x.beginPath();x.arc(w/2,h/2,5,0,7);x.fill();});
  K.act(11.6,9.6,0,"Kutak uspomena",1.3);
  /* back door into the garden */
  K.V(6,1,0,0);K.V(6,2,0,0);K.fill(1,12,0,0,-5,-1,T.trava);K.fill(1,12,-1,-1,-5,-1,T.zemlja);for(let i=0;i<=13;i++){K.V(i,1,-6,T.lisce);K.V(i,2,-6,T.lisce);}for(let k=-6;k<0;k++){K.V(0,1,k,T.lisce);K.V(0,2,k,T.lisce);K.V(13,1,k,T.lisce);K.V(13,2,k,T.lisce);}
  K.fill(10,10,1,3,-4,-4,T.drvo);K.fill(9,11,4,5,-5,-3,T.lisce);K.V(10,6,-4,T.lisce);for(const [x,z] of [[9.6,-3.2],[10.8,-4.6]])K.S(.12,0xe04a3a,x,3.8,z);
  for(let n=0;n<10;n++){const x=2+n%5*1.2,z=-1.6-Math.floor(n/5)*2;K.C(.02,.3,0x3f8a3f,x,0,z);K.S(.1,[0xff6b6b,0xffd24a,0xc08bff,0xff8fb0,0xffffff][n%5],x,.34,z,{glow:1,op:.9});}
  K.P(1.4,.4,.5,0x9a6a3c,4,0,-4.6);K.hot(6.5,-1.2,1.3,"Vrt",()=>{sfx.chime();K.say(IN.host,"Mijau! U vrtu rastu jabuke i cvijeće. Lijepo je čitati na klupi.");},0);
  K.read(5,9.6,0,Math.PI);
  K.door(7,11);K.pt(0xffe0c0,.34,16,7,3,6);
  K.gems([[2.5,0,-3.5],[12.5,0,3.2],[6.6,0,9.6]]);
  return {intro:"Topla kućica. Kroz stražnja vrata ideš u vrt!"};};

UNB["zivot/1"]=(K,b)=>{/* Slastičarnica: counter with a cake display, ice cream to choose, a giant cake, candy jars */
  K.box(15,12,7,(i,j,k)=>(i+k)%2?T.bijela:T.vuna_r,(i,j,k)=>j===1?T.bijela:((i+k)%2?T.vuna_r:T.bijela),T.bijela,T.bijela);
  for(const [i,k] of [[3,3],[11,3],[3,8],[11,8],[7,5]])K.V(i,7,k,T.svjetlo);
  /* counter with the glass display */
  K.P(9,.95,.9,0xff8fb0,7.5,0,4);K.P(9.1,.08,1,0xfff8e6,7.5,.95,4);K.P(4,.7,.8,0xcfe6ff,5.2,1.03,4,{glow:1,op:.18});
  for(let n=0;n<4;n++){const x=3.7+n*1;K.C(.3,.14,0xfff3d6,x,1.05,4);K.C(.28,.08,[0xff8fb0,0x8a5a30,0xffd24a,0x6dff8a][n],x,1.19,4);K.S(.06,0xe04a3a,x,1.36,4);}
  K.P(.5,.4,.4,0x2c3440,10.6,1.03,4);
  /* ice cream freezer */
  K.P(2,.2,.8,0xcfd6de,9,1.03,4);const tubs=[0xff8fb0,0x8a5a30,0xfff3d6,0x6dff8a];tubs.forEach((c,n)=>K.P(.4,.06,.5,c,8.25+n*.5,1.23,4));
  const FL=["jagoda","čokolada","vanilija","pistacija"];let cones=0;
  K.hot(9,5.2,1.3,"Kugla sladoleda",()=>{const n=Math.floor(Math.random()*4);sfx.pop();if(cones<6){const x=4+cones*.4;K.cone(.08,.3,0xd9a060,x,1.03,4.7,{rx:Math.PI});K.S(.11,tubs[n],x,1.4,4.7);cones++;}K.say(IN.host,"Izvoli! Kugla sladoleda, okus: "+FL[n]+". Njam!",3500);},0);
  /* giant cake */
  for(const [r,h,c,y] of [[1,.6,0xfff3d6,0],[.75,.5,0xff8fb0,.6],[.5,.45,0xfff3d6,1.1]]){K.C(r,h,c,7.5,y,1.5);K.C(r+.02,.06,0xe04a3a,7.5,y+h-.03,1.5);}for(let n=0;n<5;n++){const a=n/5*Math.PI*2;K.candle(7.5+Math.cos(a)*.32,1.55,1.5+Math.sin(a)*.32);}
  K.hot(7.5,2.6,1.2,"Divovska torta",()=>{sfx.chime();const p=K.at(7.5,2,1.5);burst(p.x,p.y,p.z,50,[[1,.6,.8],[1,1,.6],[1,1,1]],3,3,1.3);K.say(IN.host,"Ova torta ima pet katova sreće! Puhni svjećice i zaželi želju.");},0);
  /* candy jars and lollipops */
  K.P(3,.08,.5,0xfff8e6,2.5,2,1.3);for(let n=0;n<3;n++){const x=1.6+n*.9;K.C(.26,.5,0xcfe6ff,x,2.08,1.3,{glow:1,op:.25});for(let q=0;q<7;q++)K.S(.06,[0xff6b6b,0xffd24a,0x6dff8a,0xc08bff,0x6cc4e0][(q+n)%5],x+Math.cos(q)*.13,2.15+(q%3)*.12,1.3+Math.sin(q)*.13);}
  const lp=[];for(let n=0;n<5;n++){const g=K.grp(3+n*2.2,5.6,8);K.P(.02,.8,.02,0xd9c9a8,0,-.8,0,{par:g});K.P(.04,.5,.04,0xfff8e6,0,-1.3,0,{par:g});
    K.add(new THREE.CircleGeometry(.3,24),new THREE.MeshBasicMaterial({map:K.tex(32,32,(x,w,h)=>{for(let r=16;r>0;r-=4){x.fillStyle=r%8?"#ff6b9a":"#fff";x.beginPath();x.arc(16,16,r,0,7);x.fill();}}),side:THREE.DoubleSide}),0,-1.6,0,null,g);lp.push(g);}
  K.anim((dt,t)=>lp.forEach((g,n)=>g.rotation.y=t*.6+n));
  /* tables for guests and the memory corner booth */
  for(const [x,z] of [[3,9],[12,9]]){K.C(.5,.06,0xfff8e6,x,.72,z);K.C(.06,.72,0xc9a23a,x,0,z);for(const s of [-1,1])K.C(.22,.45,0xff8fb0,x+s*.75,0,z);}
  K.sofa(7.5,10.2,0,Math.PI,0xff8fb0,2.4);K.sign(2.2,.9,7.5,1.7,10.94,Math.PI,(x,w,h)=>{x.fillStyle="#fff3d6";x.fillRect(0,0,w,h);for(let n=0;n<5;n++){x.fillStyle=["#8fd0ff","#ffd9a0","#c8f0c0","#ffc8e0","#e8d8ff"][n];x.fillRect(6+n*27,8,22,24);x.fillStyle="#e07a3a";x.beginPath();x.arc(17+n*27,22,4,0,7);x.fill();}});
  K.act(7.5,9.2,0,"Kutak uspomena",1.3);
  K.res("medvjedic","Medvjedić Medo",6.5,2.8,0,["Dobro došla u slastičarnicu! Ovdje je sve slatko.","Izaberi kuglu sladoleda kod hladnjaka. Okus je iznenađenje!","Divovska torta iza mene ima pet svjećica. Zaželi želju!"],0);
  K.read(13.2,6,0,-Math.PI/2);
  K.door(7,11,0xff8fb0);K.pt(0xfff0f4,.36,16,7.5,4,6);
  K.gems([[13.5,0,2],[1.5,0,10.3],[12.4,0,1.5]]);
  return {intro:"Slastičarnica! Torte, bomboni i sladoled."};};

UNB["zivot/2"]=(K,b)=>{/* Kuća na kat: living room and kitchen below, stairs up to a bedroom, and a balcony */
  K.box(15,13,11,T.daske,(i,j,k)=>j===5?T.tdaske:(j===1||j===6?T.daske:T.bijela),T.sdaske,T.daske);
  K.fill(1,13,5,5,1,11,T.sdaske);K.stairs(1,10,0,-1,1,4,T.tdaske,2);
  for(const [i,k] of [[4,3],[10,3],[4,9],[10,9]]){K.V(i,5,k,T.svjetlo);K.V(i,11,k,T.svjetlo);}
  for(const j of [2,3,7,8])for(const k of [4,8]){K.V(14,j,k,T.staklo);}K.V(0,3,4,T.staklo);K.V(0,8,8,T.staklo);
  /* living room */
  K.sofa(9,8.6,0,Math.PI,0x3fa86a,2.4);K.fill(7,11,0,0,5,7,T.vuna_n);K.table(9,6.2,0,1.2,.6);
  const tv=K.tex(128,80,(x,w,h)=>{});const tvc=tv.image.getContext("2d");let on=0;
  K.sign(1.8,1.05,9,1.3,1.06,0,()=>{},{});const scr=IN.grp.children[IN.grp.children.length-1];scr.material.map=tv;scr.material.needsUpdate=true;
  const drawTV=(t)=>{const x=tvc,w=128,h=80;x.fillStyle=on?"#2f7fbf":"#16243a";x.fillRect(0,0,w,h);if(on){for(let n=0;n<4;n++){const fx=((t*20+n*37)%160)-16,fy=16+n*16;x.fillStyle=["#ffd24a","#ff8a2a","#ff8fb0","#6dff8a"][n];x.beginPath();x.ellipse(fx,fy,8,5,0,0,7);x.fill();x.beginPath();x.moveTo(fx-8,fy);x.lineTo(fx-14,fy-5);x.lineTo(fx-14,fy+5);x.fill();}x.fillStyle="#c8a060";x.fillRect(0,h-8,w,8);}tv.needsUpdate=true;};
  drawTV(0);let tl=0;K.anim((dt,t)=>{if(on&&t-tl>.06){tl=t;drawTV(t);}});K.P(2,.5,.5,0x7a5230,9,0,1.4);
  K.hot(9,2.6,1.3,"Upali televizor",()=>{on=!on;sfx.click();drawTV(0);if(on)K.say(IN.host,"Crtić o ribicama! Ali knjiga je ipak najbolja priča.");},0);
  /* kitchen */
  K.P(.7,.9,4,0xe8e0d0,12.9,0,3.5);K.P(.8,.08,4.1,0x9a6a3c,12.9,.9,3.5);K.P(.5,.06,.6,0x2c2c34,12.9,.98,2.5);K.table(11,3.5,0,1,1.4);for(const z of [3,4])K.chair(10.2,z,0,Math.PI/2);
  /* upstairs bedroom */
  K.bed(11.6,3,5,0,0xc08bff);K.table(13,1.6,5,.6,.5);K.lantern(13,6.4,1.6,0);K.P(1,.6,.6,0xe04a3a,8.5,5,1.6);K.P(1.04,.1,.64,0xffd24a,8.5,5.6,1.6);
  K.S(.24,0xc79a5a,8.5,6.1,1.6);K.S(.14,0xc79a5a,8.5,6.45,1.6);for(const s of [-1,1])K.S(.07,0xc79a5a,8.5+s*.12,6.6,1.6);
  K.table(4,1.8,5,1.4,.7);K.chair(4,2.6,5,Math.PI);K.books(4,5.78,1.7,6);K.fill(1,1,6,8,3,6,T.polica);
  K.sign(1.2,.9,6.5,7.6,1.06,0,(x,w,h)=>{x.fillStyle="#8fd0ff";x.fillRect(0,0,w,h);x.fillStyle="#ffd24a";x.beginPath();x.arc(60,14,8,0,7);x.fill();x.fillStyle="#4f9a4a";x.beginPath();x.moveTo(0,h);x.lineTo(20,30);x.lineTo(40,h);x.fill();x.fillStyle="#e07a3a";x.fillRect(30,36,10,10);});
  K.C(.5,.5,0xffffff,12.6,5,9.6,{rt:.55});K.C(.46,.05,0x9fe6ff,12.6,5.42,9.6,{glow:1,op:.8});
  K.act(4,8.6,5,"Kutak uspomena",1.4);K.chair(4,8.6,5,0,0x8a2a2a);for(let n=0;n<3;n++)K.sign(.5,.42,1.06,6.4+n*.0,7.4+n*.7,Math.PI/2,(x,w,h)=>{x.fillStyle="#fff8e6";x.fillRect(0,0,w,h);x.fillStyle=["#ffd9a0","#c8f0c0","#ffc8e0"][n];x.fillRect(3,3,w-6,h-9);});
  /* balcony at the back */
  for(const i of [6,7,8])for(const j of [6,7])K.V(i,j,0,0);K.fill(4,10,5,5,-3,-1,T.sdaske);for(let i=4;i<=10;i++)K.V(i,6,-3,T.tdaske);for(let k=-3;k<0;k++){K.V(4,6,k,T.tdaske);K.V(10,6,k,T.tdaske);}
  K.pot(5,-2.4,5,0xff6b6b,1.2);K.pot(9.6,-2.4,5,0xffd24a,1.2);K.hot(7.5,-1.6,1.4,"Balkon",()=>{sfx.chime();K.say(IN.host,"S balkona se vidi cijelo nebo. Lijepo mjesto za čitanje!");},5);
  K.res("zec","Zec Skokić",6,8,0,["Dobro došla u našu kuću! Dolje je dnevni boravak, a gore spavaća soba.","Stube su uz lijevi zid. Gore je i balkon!","Upali televizor ako želiš, ali dobra knjiga je ipak bolja."],Math.PI*.8);
  K.read(3,9.6,0,Math.PI*.6);
  K.door(7,12);K.pt(0xffe8c8,.34,18,7.5,4,6.5);
  K.gems([[13.5,5,6.5],[7.5,5,-2],[2.4,0,1.6]]);
  return {intro:"Kuća na kat: dnevni boravak, spavaća soba i balkon!"};};
