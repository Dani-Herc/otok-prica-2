/* =================== v17: interiors for Fantastika, Misterij, Avantura (see 25j_unutra.js) =================== */
/* ---------- Fantastika ---------- */
UNB["fantazija/0"]=(K,b)=>{/* Začarana šuma: a glade inside, glowing mushrooms, a wishing well, fireflies, a unicorn */
  const cx=8,cz=8;
  K.round(cx,cz,7.5,11,(i,j,k)=>(i*3+k*5)%7<2?T.trava:T.mahovina,(i,j,k)=>j<=2?((i+k)%3?T.drvo:T.mahovina):j>=8?T.carlisce:((i*7+k*3+j)%5<2?T.lisce:T.carlisce),T.lisce);
  for(let i=0;i<=16;i++)for(let k=0;k<=16;k++){const d=K.dist(i,k,cx,cz);if(d<8){K.V(i,12,k,(i+k)%3?T.carlisce:T.lisce);K.V(i,13,k,T.lisce);}else if(d<9)for(let j=2;j<=12;j++)K.V(i,j,k,T.lisce);}
  for(const [i,k] of [[5,5],[11,5],[5,11],[11,11],[8,3]])K.V(i,11,k,T.svjetlo);
  /* two giant trunks, the left one with a branch platform to climb to */
  for(const [i0,k0] of [[3,10],[12,9]]){K.fill(i0,i0+1,1,10,k0,k0+1,T.drvo);K.fill(i0-1,i0+2,9,10,k0-1,k0+2,T.carlisce);}
  K.fill(1,5,5,5,9,12,(i,j,k)=>K.G(i,j,k)===T.drvo?T.drvo:T.daske);K.fill(1,2,1,1,8,8,T.mahovina);
  /* pond with crystals */
  K.fill(3,5,0,0,3,5,T.voda);K.fill(3,5,-1,-1,3,5,T.kamen);for(const [i,k] of [[2,3],[6,5],[2,6]])K.V(i,1,k,T.kristal);K.V(6,1,2,T.ametist);
  /* wishing well (the genre's activity) */
  K.fill(10,12,1,1,3,5,T.kaldrma);K.V(11,1,4,T.voda);K.V(11,0,4,T.voda);for(const x of [10.2,12.8])K.P(.14,1.6,.14,0x7a5230,x,1,4.5);
  K.P(3,.12,1.4,0xb83a2e,11.5,2.6,4.5,{rz:.0});K.P(2.4,.1,.1,0x5a3a22,11.5,2.4,4.5);K.C(.16,.24,0x9a6a3c,11.5,1.6,4.5);K.P(.02,.6,.02,0xd9c9a8,11.5,1.85,4.5);
  K.act(11.5,6.2,0,"Zdenac želja");
  /* mushrooms: blocks and glowing caps */
  for(const [i,k] of [[13,7],[2,8],[9,13],[13,12]]){K.V(i,1,k,T.stapka);K.V(i,2,k,T.gljiva);}
  const caps=[];for(let n=0;n<9;n++){const a=n/9*Math.PI*2,x=8.5+Math.cos(a)*1.9,z=8.5+Math.sin(a)*1.9;K.C(.05,.22,0xf3ead8,x,0,z);caps.push(K.S(.14,n%2?0x7ae8ff:0xff9ad8,x,.26,z,{glow:1,op:.9}));}
  K.anim((dt,t)=>caps.forEach((c,n)=>c.scale.setScalar(1+Math.sin(t*2+n)*.15)));
  K.hot(8.5,8.5,1.2,"Vilinski krug",()=>{sfx.chime();const p=K.at(8.5,.6,8.5);burst(p.x,p.y,p.z,60,[[.6,1,1],[1,.6,.9],[1,1,1]],3,3,1.4);K.say(IN.host,"Krug je zaiskrio! Kažu da vile ovdje plešu kad nitko ne gleda.");});
  K.flies(26,8.5,8.5,5.5,.8,6.5);
  K.res("jednorog","Jednorog Sjajko",6.5,6,0,["Dobro došla u Začaranu šumu! Ovdje gljive svijetle cijelu noć.","Stani u vilinski krug u sredini i vidi što će se dogoditi.","Na grani velikog stabla netko je vidio nešto što svjetluca. Penji se uz deblo!","Zdenac želja ispunjava jednu želju na dan."],.6);
  K.read(12.5,12,0,-.7);
  K.door(8,15);K.pt(0xbfffd8,.4,20,8.5,5,8.5);
  K.gems([[3.5,5,11.5],[13.5,0,6.5],[8.5,0,2.5]]);
  return {intro:"Unutra je cijela čarobna šuma!"};};

UNB["fantazija/1"]=(K,b)=>{/* Vilinski toranj: potion lab below, spiral stairs, star chamber above */
  const cx=7,cz=7;
  K.round(cx,cz,6,13,T.kaldrma,(i,j,k)=>{const a=Math.atan2(k-cz,i-cx);const win=Math.abs(Math.sin(a*3))<.22;return (win&&(j===3||j===4||j===9||j===10))?T.staklo:T.kvarc;},T.vuna_lj,T.kvarc);
  K.fill(cx-6,cx+6,6,6,cz-6,cz+6,(i,j,k)=>K.dist(i,k,cx,cz)<5.5&&K.G(i,j,k)===0?T.sdaske:K.G(i,j,k));
  K.spiral(cx,cz,1,6,T.kvarc,T.kvarc,4);
  for(const [i,k] of [[4,4],[10,4],[4,10],[10,10]])K.V(i,6,k,T.svjetlo);for(const [i,k] of [[5,7],[9,7],[7,4]])K.V(i,13,k,T.svjetlo);
  /* potion lab */
  K.C(.62,.7,0x2c2c34,10.5,0,7.5,{rt:.74});const brew=K.C(.6,.04,0x6dff8a,10.5,.7,7.5,{glow:1});K.fire(10.5,0,7.5,.5);
  const bub=[];for(let n=0;n<6;n++)bub.push(K.S(.07,0x9dffb0,10.5,.8,7.5,{glow:1,op:.8}));
  K.anim((dt,t)=>{bub.forEach((m,n)=>{const q=(t*.6+n/6)%1;m.position.set(K.X0+10.5+Math.sin(n*2.1)*.35,K.Y0+1+.78+q*.9,K.Z0+7.5+Math.cos(n*1.7)*.35);m.material.opacity=.8*(1-q);});brew.material.color.setHSL(.36+Math.sin(t*.4)*.08,.9,.55);});
  K.hot(10.5,7.5,1.5,"Kotlić s napitkom",()=>{sfx.splash();const p=K.at(10.5,1,7.5);burst(p.x,p.y,p.z,40,[[.4,1,.5],[.9,.5,1]],2.5,3,1.2);K.say(IN.host,["Mmm, miriše na jagode i kišu.","Pazi, ovaj napitak te natjera da kišeš duginim bojama!","Napitak za hrabrost. Dovoljna je jedna kapljica."][Math.floor(Math.random()*3)]);});
  K.fill(2,2,1,2,5,9,T.polica);for(let n=0;n<8;n++)K.C(.07,.2,[0xff6b6b,0x6cc4e0,0xc08bff,0x6dff8a,0xffd24a][n%5],3.15,n<4?1.05:2.05,5.6+(n%4)*.9,{glow:1,op:.85});
  K.table(4.5,10,0,1.2,.7);K.sign(.6,.42,4.5,.82,10,0,(x,w,h)=>{x.fillStyle="#f3e3c0";x.fillRect(0,0,w,h);x.fillStyle="#7a52c7";for(let n=0;n<14;n++)x.fillRect(4+(n%7)*5,6+Math.floor(n/7)*12,3,6);},{rx:-1.3});
  K.read(9.5,10.5,0,-.6);
  /* upper floor: star chamber */
  const ball=K.S(.42,0xc79bff,7.5,7.6,3.2,{glow:1,op:.75});K.C(.2,.5,0xc9a23a,7.5,6,3.2,{rt:.12});K.anim((dt,t)=>{ball.scale.setScalar(1+Math.sin(t*1.8)*.05);ball.material.opacity=.6+Math.sin(t*2.3)*.15;});
  K.hot(7.5,3.6,1.3,"Kristalna kugla",()=>{sfx.chime();K.say(IN.host,["Vidim... da ćeš danas pročitati nešto napeto!","Vidim zmaja koji čita knjigu. Hm, to si možda ti u kostimu?","Kugla kaže: tvoja sljedeća knjiga bit će još bolja."][Math.floor(Math.random()*3)]);},6);
  K.C(.6,.5,0xe8e0ff,10.6,6,8,{rt:.7});const font=K.C(.52,.05,0x9fe6ff,10.6,6.5,8,{glow:1,op:.85});K.anim((dt,t)=>font.material.opacity=.7+Math.sin(t*3)*.15);
  K.act(10.6,8,6,"Fontana želja",1.3);
  for(let n=0;n<40;n++){const a=Math.random()*7,r=Math.random()*5;K.S(.04,0xffffff,7.5+Math.cos(a)*r,12.85,7.5+Math.sin(a)*r,{glow:1});}
  K.res("vila","Vila Zvjezdica",4,7.5,6,["Dobro došla u moj toranj! Dolje kuham napitke, a gore gledam zvijezde.","Kristalna kugla zna što će se dogoditi. Pitaj je!","Stube se vrte oko stupa kao zavojnica. Gore je moja zvjezdana soba."],1.4);
  K.door(7,13);K.pt(0xe0c8ff,.4,18,7.5,4,7.5);
  K.gems([[7.5,6,11.5],[10.5,0,4.5],[3.5,6,9.5]]);
  return {intro:"Dolje je čarobni laboratorij, a gore zvjezdana soba."};};

UNB["fantazija/2"]=(K,b)=>{/* Kuća u stablu: inside the hollow trunk, loft ring, swing, owl */
  const cx=7,cz=7;
  K.round(cx,cz,6,12,(i,j,k)=>Math.floor(K.dist(i,k,cx,cz))%2?T.sdaske:T.daske,(i,j,k)=>{const a=Math.atan2(k-cz,i-cx);return (j===8||j===9)&&Math.abs(Math.sin(a*2.5))<.25?T.lisce:(j===3&&Math.abs(Math.cos(a*2))<.15?T.staklo:T.drvo);},T.carlisce,T.drvo);
  K.fill(cx-6,cx+6,6,6,cz-6,cz+6,(i,j,k)=>{const d=K.dist(i,k,cx,cz);return d>=3.5&&d<5.5?T.daske:K.G(i,j,k);});
  K.arc(cx,cz,4.4,Math.PI*.62,.42,1,5,T.drvo);
  for(const [i,k] of [[3,7],[11,7],[7,3]])K.V(i,7,k,T.lampion);K.V(7,12,7,T.svjetlo);K.V(4,12,10,T.svjetlo);K.V(10,12,4,T.svjetlo);
  /* swing hanging from the loft edge */
  const sw=K.grp(7.5,5.95,4.2);K.P(.03,2.7,.03,0xd9c9a8,-.35,-2.7,0,{par:sw});K.P(.03,2.7,.03,0xd9c9a8,.35,-2.7,0,{par:sw});K.P(.86,.08,.34,0x9a6a3c,0,-2.75,0,{par:sw});
  K.anim((dt,t)=>{sw.rotation.x=Math.sin(t*1.1)*.28;});
  K.hot(7.5,4.2,1.1,"Ljuljačka",()=>{sfx.pop();K.say(IN.host,"Uuu, ljuljaj se do krošnje! Ovu ljuljačku je napravila vjeverica.");},0);
  /* stump table, mushroom stools, honey and acorns */
  K.C(.62,.62,0x8a5a30,7.5,0,8.4);K.C(.64,.06,0xd9b27a,7.5,.62,8.4);for(const [x,z] of [[6.4,9.2],[8.7,9.1]]){K.C(.07,.36,0xf3ead8,x,0,z);K.C(.26,.12,0xe04a3a,x,.36,z,{rt:.1});}
  for(let n=0;n<3;n++)K.C(.13,.22,0xf2b22e,7.2+n*.28,.68,8.2,{glow:n===1?1:0,op:.9});K.S(.1,0x9a6a3c,7.9,.75,8.7);
  K.read(10.6,9.5,0,-.9);
  /* tiny pool in the roots: the wishing spot */
  K.V(3,0,8,T.voda);K.V(4,0,8,T.voda);K.V(3,0,9,T.voda);for(const [x,z,r] of [[2.6,7.6,.4],[4.9,8.4,1.2],[3.4,10.1,2.2]])K.P(1.2,.26,.3,0x6b4a2a,x,0,z,{ry:r});
  K.act(3.9,8.8,0,"Izvor želja",1.2);
  /* the loft: owl perch, beds of leaves, a little telescope out of the leaf window */
  K.P(1,.2,1.8,0x4f9a4a,10,6,6.5);K.P(1,.2,1.8,0x3f8a3f,10,6,8.4);K.P(.08,.8,.08,0x7a5230,4.2,6,4.2);K.P(.9,.08,.08,0x7a5230,4.2,6.8,4.2);
  K.res("sova","Sova Hukica",4.2,4.2,6.9,["Huu! Dobro došla u kuću u stablu. Na katu se spava na lišću.","Kroz lisnate prozore vidim cijelu šumu.","Na katu se penješ po korijenu uz zid. Samo hodaj gore!"],.8);
  K.flies(12,7.5,7.5,3.5,2,9,0xfff0a0);
  K.door(7,13);K.pt(0xffe0b0,.38,18,7.5,4,7.5);
  K.gems([[3.5,6,4.5],[10.5,6,9.5],[7.5,0,3.2]]);
  return {intro:"Uđi u deblo! Uz zid se penješ na kat."};};

/* ---------- Misterij ---------- */
UNB["misterij/0"]=(K,b)=>{/* Svjetionik: keeper's room, spiral stairs round the column, rotating lamp on top */
  const cx=6,cz=6;
  K.round(cx,cz,5,13,T.kaldrma,(i,j,k)=>{if(j>=10)return T.staklo;const a=Math.atan2(k-cz,i-cx);if(j===3&&Math.abs(Math.sin(a*2))<.2)return T.staklo;return Math.floor((j-1)/3)%2?T.crvena:T.bijela;},T.crvena,T.kamen);
  K.fill(cx-5,cx+5,9,9,cz-5,cz+5,(i,j,k)=>K.dist(i,k,cx,cz)<4.5&&K.G(i,j,k)===0?T.tdaske:K.G(i,j,k));
  K.spiral(cx,cz,1,9,T.tdaske,T.bijela,1);
  for(const [i,k] of [[3,3],[9,3],[3,9],[9,9]])K.V(i,9,k,T.svjetlo);
  /* the lamp and its beam */
  const lamp=K.grp(6.5,9.6,6.5);K.C(.5,.5,0xc9a23a,0,0,0,{par:lamp,mid:1});K.S(.42,0xfff0a0,0,.45,0,{par:lamp,glow:1});
  const beam=new THREE.Group();lamp.add(beam);for(const s of [1,-1]){const m=K.add(new THREE.CylinderGeometry(.35,1.6,14,16,1,true),K.glowM(0xfff6c0,.16),0,.45,s*7.2,{rx:-s*Math.PI/2},beam);m.material.side=THREE.DoubleSide;}
  const ll=K.pt(0xfff0b0,.8,10,6.5,10.5,6.5);K.anim((dt,t)=>{beam.rotation.y+=dt*.9;ll.intensity=.7+Math.sin(t*1.8)*.1;});
  K.act(6.5,6.5,9,"Tajni signal",2);
  /* keeper's room */
  K.table(3.5,7,0,1.3,.9);K.sign(1.2,.8,3.5,.8,7,0,(x,w,h)=>{x.fillStyle="#d8c79a";x.fillRect(0,0,w,h);x.strokeStyle="#4a7fd6";x.lineWidth=2;for(let n=0;n<5;n++){x.beginPath();x.arc(20+n*9,30+n*3,10+n*2,0,3);x.stroke();}x.fillStyle="#b83a2e";x.fillRect(50,14,6,6);},{rx:-Math.PI/2});
  K.candle(4,.78,7.3);K.chair(3.5,8.1,0,Math.PI);
  K.C(.12,.34,0xcfe6ff,8.6,1.1,8.3,{glow:1,op:.35,rz:Math.PI/2});K.P(.22,.06,.05,0x8a5a30,8.6,1.1,8.3);K.table(8.6,8.4,0,.8,.5);
  K.hot(8.6,8.4,1.1,"Brod u boci",()=>{sfx.pop();K.say(IN.host,"Taj brodić sam stavio u bocu dok sam bio mlad galeb. Pitaš se kako? To je tajna svjetioničara!");},0);
  K.tor(.32,.08,0xd9c9a8,2.4,.1,4.4,{rx:Math.PI/2});K.tor(.22,.07,0xd9c9a8,2.4,.24,4.4,{rx:Math.PI/2});
  K.P(.1,.9,.1,0x2c3440,9.2,0,4.2);K.P(.6,.1,.1,0x2c3440,9.2,.8,4.2);K.C(.09,.5,0x2c3440,9.2,.9,4.2,{rt:.05});
  K.read(4.5,4,0,.7);
  K.res("galeb","Galeb Kapetan",8.5,6,0,["Dobro došla u svjetionik! Gore svjetiljka pokazuje brodovima put kroz maglu.","Stube vijugaju oko stupa sve do svjetiljke. Penji se!","Iz vrha se vidi cijelo more. Ponekad i kitovi."],-1);
  K.door(6,11);K.pt(0xffe8c8,.35,16,6.5,4,6.5);
  K.gems([[3.5,9,5.5],[9.5,0,5.5],[6.5,0,2.3]]);
  return {intro:"Stube vode sve do velike svjetiljke na vrhu."};};

UNB["misterij/1"]=(K,b)=>{/* Detektivska vila: study, fireplace, clue board, a portrait that watches, a secret room behind the shelf */
  K.box(15,13,7,(i,j,k)=>(i+k)%2?T.tdaske:T.sdaske,T.tdaske,T.tdaske,T.kcigla);
  K.fill(14,20,0,5,3,9,(i,j,k)=>(i>14&&i<20&&k>3&&k<9&&j>0&&j<5)?0:(j===0?T.vuna_c:T.kcigla));
  for(const [i,k] of [[4,4],[10,4],[4,9],[10,9]])K.V(i,7,k,T.svjetlo);K.V(17,5,6,T.svjetlo);
  /* fireplace */
  K.fill(5,9,1,4,1,1,T.kcigla);K.fill(6,8,1,2,1,1,0);K.fill(6,8,1,2,0,0,T.tuf);K.fire(7.5,0,1.5,.8);K.P(5.4,.2,.6,0x5a3a22,7.5,3.95,1.6);
  /* portrait whose eyes follow you */
  K.sign(1.3,1.1,7.5,4.6,2.05,0,(x,w,h)=>{x.fillStyle="#3a2a1e";x.fillRect(0,0,w,h);x.fillStyle="#c9a23a";x.fillRect(3,3,w-6,h-6);x.fillStyle="#2d3a5a";x.fillRect(8,8,w-16,h-16);x.fillStyle="#e07a3a";x.beginPath();x.moveTo(26,60);x.lineTo(30,26);x.lineTo(42,40);x.lineTo(54,26);x.lineTo(58,60);x.fill();x.fillStyle="#fff";x.fillRect(32,40,8,7);x.fillRect(46,40,8,7);x.fillStyle="#16243a";x.fillRect(22,14,40,10);x.fillRect(30,6,24,10);});
  const eyes=[K.S(.04,0x111111,7.5-.14,5.07,2.1),K.S(.04,0x111111,7.5+.1,5.07,2.1)];K.anim(()=>{const dx=Math.max(-1,Math.min(1,(FP.p.x-(K.X0+7.5))/5));eyes.forEach((e,n)=>e.position.x=K.X0+7.5+(n?.1:-.14)+dx*.03);});
  /* clue board with red strings */
  K.sign(3,1.6,1.05,1.6,6.5,Math.PI/2,(x,w,h)=>{x.fillStyle="#b88a5a";x.fillRect(0,0,w,h);const pts=[[20,20],[70,15],[130,25],[160,60],[40,70],[100,75]];x.strokeStyle="#d8342a";x.lineWidth=2;x.beginPath();pts.forEach((p,n)=>{n?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]);});x.stroke();
    pts.forEach((p,n)=>{x.fillStyle=["#fff8e6","#ffe27a","#cfe6ff"][n%3];x.fillRect(p[0]-12,p[1]-10,24,20);x.fillStyle="#d8342a";x.beginPath();x.arc(p[0],p[1]-8,3,0,7);x.fill();x.fillStyle="#555";x.fillRect(p[0]-8,p[1]-2,16,2);x.fillRect(p[0]-8,p[1]+3,10,2);});});
  K.hot(1.8,6.5,1.4,"Ploča s tragovima",()=>{sfx.click();K.say(IN.host,"Tragovi vode do police s knjigama. Jedna knjiga ne izgleda kao ostale...");},0);
  /* desk with a magnifier */
  K.table(10.5,4.5,0,1.6,.9,0x6a4526);K.chair(10.5,5.5,0,Math.PI,0x8a2a2a);K.tor(.13,.025,0xc9a23a,10.2,.84,4.4,{rx:-Math.PI/2});K.C(.12,.01,0xcfe6ff,10.2,.84,4.4,{glow:1,op:.4});K.P(.03,.03,.22,0x3a2a1e,10.2,.82,4.65);
  K.P(.5,.02,.36,0xfff8e6,10.9,.79,4.6,{ry:.3});K.candle(11.2,.78,4.2);
  K.sofa(4,8.5,0,Math.PI*.5,0x8a2a2a,1.6);K.fill(5,9,0,0,6,10,T.vuna_c);K.read(9.5,9.5,0,Math.PI);
  /* the shelf with the secret door */
  K.fill(13,13,1,3,4,8,T.polica);K.P(.12,.3,.22,0xd8342a,12.92,1.35,4.5,{glow:0});
  const secret=K.hot(12.3,4.5,1.2,"Čudna crvena knjiga",()=>{if(IN.secret)return;IN.secret=1;sfx.chime();for(const j of [1,2])for(const i of [13,14])K.V(i,j,6,0);K.remesh();
    const p=K.at(13.5,1,6.5);burst(p.x,p.y,p.z,40,[[.8,.7,.5],[1,1,1]],2,2,1);toast("Polica se odmaknula! Iza nje je tajna soba.",3200);secret.n="Tajni prolaz je otvoren";},0);
  K.act(17.5,6.5,0,"Tajni signal",1.4);K.P(1.2,.9,.4,0x2c3440,17.5,0,4.5);for(let n=0;n<6;n++){const l=K.S(.07,[0xff6b6b,0xffd24a,0x6dff8a][n%3],17.1+(n%3)*.4,.95+Math.floor(n/3)*.25,4.28,{glow:1});const p=n*1.3;K.anim((dt,t)=>l.visible=Math.sin(t*3+p)>-.3);}
  K.res("rakun","Rakun Inspektor",3.5,4,0,["Dobro došla, kolegice detektivko! Ovdje rješavamo najteže zagonetke.","Pravi detektiv gleda pažljivo. Primijetila si da te portret prati očima?","Jedna knjiga na polici desno je malo čudna. Dodirni je!"],.6);
  K.door(7,12);K.pt(0xffd8a8,.3,16,7.5,4,7);
  K.gems([[18.5,0,7.5],[2.5,0,2.5],[12.5,0,10.5]]);
  return {intro:"Detektivska radna soba. Negdje je skriven tajni prolaz..."};};

UNB["misterij/2"]=(K,b)=>{/* Toranj sa satom: clockwork, real-time clock face, pendulum, bell to ring */
  K.box(11,11,13,T.kaldrma,T.kamen,T.tdaske,T.kcigla);
  K.fill(1,9,7,7,1,4,T.daske);K.stairs(1,9,0,-1,1,6,T.tdaske,2);
  for(const [i,k] of [[2,8],[8,8],[5,5]])K.V(i,13,k,T.svjetlo);K.V(1,7,5,T.lampion);K.V(9,7,5,T.lampion);for(const [i,k] of [[2,2],[8,2]])K.V(i,13,k,T.svjetlo);
  /* clock face on the back wall, hands follow the real time */
  const face=K.add(new THREE.CircleGeometry(2.1,40),new THREE.MeshBasicMaterial({map:K.tex(128,128,(x,w,h)=>{x.fillStyle="#fff3d6";x.beginPath();x.arc(64,64,62,0,7);x.fill();x.strokeStyle="#c9a23a";x.lineWidth=6;x.stroke();x.fillStyle="#3a2a1e";for(let n=0;n<12;n++){const a=n/12*Math.PI*2;x.fillRect(62+Math.sin(a)*50,62-Math.cos(a)*50,5,n%3?5:11);}})}),5.5,9.4,1.06);
  const hand=(len,wd,col)=>{const g=new THREE.Group();g.position.set(K.X0+5.5,K.Y0+1+9.4,K.Z0+1.12);const m=new THREE.Mesh(new THREE.BoxGeometry(wd,len,.04),K.mat(col));m.position.y=len/2-.15;g.add(m);IN.grp.add(g);return g;};
  const hH=hand(1.1,.14,0x2c2c2c),hM=hand(1.7,.09,0x2c2c2c),hS=hand(1.8,.03,0xd8342a);
  K.anim(()=>{const d=new Date(),s=d.getSeconds()+d.getMilliseconds()/1000,m=d.getMinutes()+s/60,h=(d.getHours()%12)+m/60;hS.rotation.z=-s/60*Math.PI*2;hM.rotation.z=-m/60*Math.PI*2;hH.rotation.z=-h/12*Math.PI*2;});
  /* gears on the walls, meshing in turn */
  K.gear(1.15,3,4.5,1,"x",.8);K.gear(1.15,4.6,6.6,.6,"x",-1.33);K.gear(9.85,3.4,5.5,1.2,"x",-.6);K.gear(9.85,5.6,7.2,.7,"x",1.03);K.gear(4,10.6,1.2,.8,"z",.5,0xb08a3a);K.gear(7.2,10.9,1.2,.5,"z",-.8,0xb08a3a);
  /* pendulum */
  const pd=K.grp(5.5,7,1.6);K.P(.05,3.2,.05,0xc9a23a,0,-3.2,0,{par:pd});K.C(.36,.08,0xc9a23a,0,-3.4,0,{par:pd,rx:Math.PI/2,mid:1});K.anim((dt,t)=>pd.rotation.z=Math.sin(t*2.2)*.32);
  /* bell on the platform */
  const bell=K.grp(5.5,11.8,2.5);K.C(.7,1,0xd9a93a,0,-1,0,{par:bell,rt:.32,seg:20});K.S(.14,0x8a6a2a,0,-1.08,0,{par:bell});K.P(.12,.4,.12,0x5a3a22,0,0,0,{par:bell});let ring=0;
  K.anim((dt)=>{ring=Math.max(0,ring-dt*.5);bell.rotation.z=Math.sin(ring*18)*.45*ring;});
  K.hot(5.5,3.3,1.5,"Zazvoni zvono",()=>{ring=1;sfx.chime();setTimeout(()=>sfx.chime(),380);setTimeout(()=>sfx.chime(),760);K.say(IN.host,"Ding, dong! Sad cijeli otok zna koliko je sati.",3000);},7);
  K.act(8.5,8.2,0,"Tajni signal",1.3);K.P(1,1,.5,0x5a4a3a,8.5,0,8.9);for(let n=0;n<3;n++)K.P(.08,.5,.08,[0xd8342a,0xf2b22e,0x3fa86a][n],8.2+n*.3,1,8.75,{rz:.3});
  K.read(3,8.8,0,Math.PI*.8);
  K.res("golub","Golub Tik-Tak",3,3,7,["Tik-tak! Ja navijam ovaj sat svako jutro.","Kazaljke na satu pokazuju pravo vrijeme. Pogledaj koliko je sati!","Gore na podestu visi zvono. Dodirni ga i zazvoni!"],.4);
  K.V(0,3,5,T.lampion);K.V(10,3,5,T.lampion);K.V(0,9,6,T.lampion);K.V(10,9,6,T.lampion);K.door(5,10);K.pt(0xffe0b0,.55,18,5.5,5,5.5);
  K.gems([[9,7,1.6],[9.5,0,8.6],[1.5,7,1.6]]);
  return {intro:"Ovdje kucaju zupčanici. Sat pokazuje pravo vrijeme!"};};

/* ---------- Avantura ---------- */
UNB["avantura/0"]=(K,b)=>{/* Piratska utvrda: cannons at the ports, map table, lookout platform, a sand pit to dig */
  K.box(16,13,8,T.daske,(i,j,k)=>j===7?T.tdaske:T.drvo,T.tdaske,T.tdaske);
  for(const k of [4,8]){K.V(0,2,k,0);K.V(0,3,k,0);K.V(15,2,k,0);K.V(15,3,k,0);}
  for(const [i,k] of [[4,4],[11,4],[4,9],[11,9]])K.V(i,8,k,T.svjetlo);for(let i=1;i<15;i+=3)K.P(.3,.3,11,0x5a3a22,i+.5,6.7,6.5);
  for(const [x,z,s] of [[1.6,4.5,1],[1.6,8.5,1],[14.4,4.5,-1],[14.4,8.5,-1]]){K.C(.24,1.5,0x2c2c34,x,.72,z,{rz:Math.PI/2,mid:1,rt:.2});K.C(.27,.12,0x2c2c34,x-s*.72,.72,z,{rz:Math.PI/2,mid:1});
    for(const w of [-.32,.32])K.C(.26,.08,0x6b4a2a,x+.1*s,.26,z+w,{rx:Math.PI/2,mid:1});K.P(.7,.22,.5,0x7a5230,x+.1*s,.22,z);for(let n=0;n<3;n++)K.S(.12,0x2c2c34,x+s*.9,.12,z-.25+n*.2);}
  K.hot(2.2,4.5,1.1,"Top",()=>{sfx.splash();const p=K.at(-.5,1.7,4.5);burst(p.x,p.y,p.z,30,[[.8,.8,.8],[1,.7,.3]],3,1,1);K.say(IN.host,"BUM! Hihi, samo vježbamo. Ne gađamo nikoga, plašimo galebove.",3500);},0);
  /* treasure map table */
  K.table(6.5,6.5,0,2,1.2);K.sign(1.8,1.1,6.5,.8,6.5,0,(x,w,h)=>{x.fillStyle="#d8c08a";x.fillRect(0,0,w,h);x.fillStyle="#7ab06a";x.beginPath();x.ellipse(60,34,40,22,0,0,7);x.fill();x.strokeStyle="#8a5a30";x.setLineDash([4,4]);x.lineWidth=2;x.beginPath();x.moveTo(30,40);x.lineTo(55,28);x.lineTo(80,40);x.stroke();x.setLineDash([]);x.strokeStyle="#d8342a";x.lineWidth=4;x.beginPath();x.moveTo(76,34);x.lineTo(86,46);x.moveTo(86,34);x.lineTo(76,46);x.stroke();},{rx:-Math.PI/2});
  K.candle(5.8,.78,6.1);K.candle(7.3,.78,7);for(const [x,z,r] of [[5.2,6.5,1.6],[7.8,6.5,-1.6],[6.5,7.5,Math.PI]])K.chair(x,z,0,r);
  /* barrels, crates, flag */
  for(const [x,z] of [[13.5,10.8],[14.2,10],[13.6,11.6]])K.barrel(x,z,0);K.barrel(13.9,10.6,.86,.9);for(const [x,z,y] of [[1.8,11,0],[2.6,11.2,0],[2.2,11,.8]])K.crate(x,z,y,.8,x);
  K.sign(1.8,1.2,7.5,3.6,1.07,0,(x,w,h)=>{x.fillStyle="#1c232e";x.fillRect(0,0,w,h);x.fillStyle="#f3ead8";x.beginPath();x.arc(58,30,13,0,7);x.fill();x.fillRect(51,38,14,9);x.fillStyle="#1c232e";x.fillRect(51,26,6,6);x.fillRect(60,26,6,6);x.strokeStyle="#f3ead8";x.lineWidth=6;x.beginPath();x.moveTo(30,52);x.lineTo(86,70);x.moveTo(86,52);x.lineTo(30,70);x.stroke();});
  /* lookout platform with spyglass */
  K.fill(11,14,4,4,1,4,T.daske);K.stairs(14,8,0,-1,1,4,T.tdaske);for(const [x,z] of [[11.1,4.9],[12.5,4.9],[13.9,4.9]])K.P(.1,.8,.1,0x5a3a22,x,4,z);K.P(3,.08,.08,0x5a3a22,12.5,4.8,4.9);
  K.P(.06,.9,.06,0x5a3a22,12.2,4,1.8);K.C(.07,.7,0xc9a23a,12.2,4.95,1.6,{rx:1.2,mid:1,rt:.05});
  K.hot(12.3,2.4,1.3,"Dalekozor",()=>{sfx.pop();K.say(IN.host,["Kra! Vidim brod na obzoru!","Kra! Ono je otok s palmama. Možda ima blaga?","Kra! Vidim kita kako izbacuje vodu."][Math.floor(Math.random()*3)],3500);},4);
  /* sand pit for the map game */
  K.fill(2,5,0,0,8,10,T.pijesak);K.P(.7,.04,.12,0xd8342a,3.6,.02,9,{ry:.78});K.P(.7,.04,.12,0xd8342a,3.6,.02,9,{ry:-.78});K.P(.06,1,.06,0x8a6a4a,4.6,0,8.5,{rz:-.3});K.P(.3,.36,.04,0x9aa3ad,4.85,.02,8.5,{rz:-.3});
  K.act(3.6,9,0,"Kopaj: Karta blaga",1.4);
  for(const [x,z] of [[4.5,3],[10.5,3],[8,10]])K.lantern(x,6.9,z,.12);
  K.pet("papiga","Papiga Koko",8.3,7.2,.78,"Kra! Blago! Blago! Kra!",-.5);
  K.res("gusar","Kapetan Brko",9.5,4,0,["Ahoj, mornarko! Dobro došla u našu utvrdu.","Na stolu je karta blaga. Crveni X pokazuje gdje kopati!","Popni se na stražarnicu i pogledaj kroz dalekozor."],0);
  K.read(10.2,10,0,Math.PI);
  K.door(8,12);K.pt(0xffd0a0,.35,18,8,4,6.5);
  K.gems([[13,4,2],[1.5,0,1.5],[14.5,0,1.5]]);
  return {intro:"Piratska utvrda: topovi, karta blaga i stražarnica!"};};

UNB["avantura/1"]=(K,b)=>{/* Piratski brod: the hold, curved hull, swinging hammocks, portholes onto the sea, treasure chest */
  K.box(15,11,6,T.daske,T.tdaske,T.tdaske,T.tdaske);
  for(let k=1;k<10;k++){K.V(1,1,k,T.tdaske);K.V(13,1,k,T.tdaske);}for(let i=2;i<13;i+=2)K.P(.24,.22,9,0x5a3a22,i+.5,4.78,5.5);
  for(const [i,k] of [[4,3],[10,3],[7,7]])K.V(i,6,k,T.svjetlo);
  /* portholes with the sea outside, waves moving */
  const sea=K.tex(128,64,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,"#8fd0ff");g.addColorStop(.45,"#cfeaff");g.addColorStop(.5,"#2f7fbf");g.addColorStop(1,"#1c4a7a");x.fillStyle=g;x.fillRect(0,0,w,h);x.strokeStyle="rgba(255,255,255,.5)";for(let n=0;n<10;n++){x.beginPath();x.arc(n*14,40+(n%3)*6,6,3.4,6);x.stroke();}});
  sea.wrapS=THREE.RepeatWrapping;sea.repeat.set(.5,1);
  for(const [i,k] of [[0,3],[0,7],[14,3],[14,7]]){K.V(i,3,k,T.staklo);const x=i?i+1.6:-.6;const m=K.add(new THREE.PlaneGeometry(3,2.2),new THREE.MeshBasicMaterial({map:sea}),x,2.5,k+.5,{ry:i?-Math.PI/2:Math.PI/2});K.tor(.42,.07,0xc9a23a,i?i-.02:1.02,2.5,k+.5,{ry:Math.PI/2});}
  K.anim((dt,t)=>{sea.offset.x=(t*.03)%1;sea.offset.y=Math.sin(t*.8)*.03;});
  /* hammocks */
  for(const z of [2.6,5,7.4]){const h=K.grp(3.4,3.6,z);const sling=K.add(new THREE.CylinderGeometry(.32,.32,2.2,12,1,true,0,Math.PI),K.mat(0xe8dcc0,{side:THREE.DoubleSide}),0,-.55,0,{rz:Math.PI/2},h);
    for(const s of [-1,1])K.P(.02,.6,.02,0xd9c9a8,s*1.1,-.55,0,{par:h,rz:s*.6});const p=z;K.anim((dt,t)=>h.rotation.x=Math.sin(t*1.2+p)*.12);}
  K.hot(3.4,5,1.3,"Viseća mreža",()=>{sfx.pop();K.say(IN.host,"Mornari spavaju u visećim mrežama jer se ljuljaju zajedno s brodom. Nitko ne padne iz kreveta!");},0);
  /* cargo and the treasure chest */
  for(const [x,z] of [[12,1.6],[12.6,2.4],[11.4,2.3]])K.barrel(x,z,0);for(const [x,z,y] of [[12.2,8.4,0],[11.4,8.8,0],[12,8.6,.8]])K.crate(x,z,y,.8);K.P(.6,.4,.5,0xd9c9a8,10.8,0,9.1,{ry:.4});
  K.P(1.3,.7,.8,0x7a4a26,7.5,0,1.6);const lid=K.grp(7.5,.7,1.2);K.P(1.32,.24,.82,0x8a5a30,0,0,.4,{par:lid});K.P(1.1,.4,.6,0xf2c12e,7.5,.42,1.6,{glow:1,op:.9});for(const x of [7,8])K.P(.1,.74,.84,0xc9a23a,x,0,1.6);lid.rotation.x=-.7;
  /* captain's table: the map game */
  K.table(7.5,4.5,0,1.8,1);K.sign(1.6,.9,7.5,.8,4.5,0,(x,w,h)=>{x.fillStyle="#d8c08a";x.fillRect(0,0,w,h);x.strokeStyle="#8a5a30";x.lineWidth=2;x.strokeRect(4,4,w-8,h-8);x.fillStyle="#7ab06a";x.beginPath();x.arc(30,30,14,0,7);x.arc(70,26,10,0,7);x.fill();x.strokeStyle="#d8342a";x.lineWidth=4;x.beginPath();x.moveTo(66,22);x.lineTo(74,30);x.moveTo(74,22);x.lineTo(66,30);x.stroke();},{rx:-Math.PI/2});
  K.candle(6.8,.78,4.2);K.chair(7.5,3.5,0,0,0x8a2a2a);K.act(7.5,5.6,0,"Kapetanova karta",1.3);
  /* hatch with sunlight */
  K.V(7,6,8,T.staklo);K.P(.9,4.8,.9,0xfff6c0,7.5,0,8.5,{glow:1,op:.1});
  const ln=[K.lantern(4.5,4.7,4,.25),K.lantern(10.5,4.7,6,.25)];
  K.res("gusarka","Mornarka Zvjezdana",10.5,5,0,["Dobro došla u potpalublje! Ovdje spavamo i čuvamo blago.","Kroz okrugle prozore vidi se more. Brod se lagano ljulja, osjećaš li?","Kapetanova karta je na stolu. Tamo počinje svaka potraga za blagom."],-1);
  K.read(2.6,9,0,Math.PI*.6);
  K.door(7,10);K.pt(0xffd0a0,.35,16,7.5,3,5);
  K.gems([[12.5,1.6,9.2],[2.5,0,1.6],[8.6,1.2,1.6]]);
  return {intro:"Potpalublje pravog gusarskog broda!"};};

UNB["avantura/2"]=(K,b)=>{/* Hram u džungli: pillars with torches, water channels, golden idol, three pressure plates open a niche */
  K.box(15,15,9,T.kaldrma,(i,j,k)=>(i*3+j+k)%5===0?T.mahovina:(j>=6?T.upjescenjak:T.kamen),T.kamen,T.pjescenjak);
  for(const [i,k] of [[3,3],[11,3],[3,10],[11,10]]){K.fill(i,i,1,8,k,k,T.pjescenjak);K.flame(i+.5,2.2,k+1.12,1.4);K.P(.3,.12,.3,0x5a4a3a,i+.5,2.05,k+1.1);}
  for(const [i,k] of [[7,7],[5,11],[9,11]]){K.V(i,9,k,0);K.V(i,10,k,0);K.P(.9,8.9,.9,0xfff6c0,i+.5,0,k+.5,{glow:1,op:.07});}
  K.V(4,9,5,T.svjetlo);K.V(10,9,5,T.svjetlo);K.V(7,9,12,T.svjetlo);
  /* water channels with lily pads */
  for(const i of [1,13])for(let k=2;k<=12;k++){K.V(i,0,k,T.voda);K.V(i,-1,k,T.kamen);}for(const [x,z] of [[1.5,4],[13.5,7.5],[1.5,10]])K.C(.3,.03,0x3fa86a,x,-.08,z);
  /* stepped altar and golden idol */
  K.fill(5,9,1,1,1,4,T.pjescenjak);K.fill(6,8,2,2,1,3,T.pjescenjak);K.V(7,3,2,T.zlato);
  const idol=K.grp(7.5,4,2.5);K.P(.5,.7,.36,0xf2c12e,0,0,0,{par:idol,m:{emissive:new THREE.Color(0x3a2a00)}});K.P(.6,.5,.5,0xf2c12e,0,.7,0,{par:idol,m:{emissive:new THREE.Color(0x3a2a00)}});
  for(const s of [-1,1])K.P(.1,.08,.04,0x6dff8a,s*.14,.98,.26,{par:idol,glow:1});K.P(.7,.1,.1,0xf2c12e,0,1.25,0,{par:idol});
  K.act(7.5,5.4,0,"Karta drevnog hrama",1.5);
  /* three plates: step on all three to open the niche in the altar */
  const pl=[];for(const [x,z] of [[4.5,7.5],[7.5,9.5],[10.5,7.5]]){const m=K.P(1,.06,1,0x8a7a5a,x,0,z);pl.push({m,x,z,on:0});}let opened=0;
  K.anim(()=>{if(opened)return;for(const q of pl){if(!q.on&&Math.hypot(FP.p.x-(K.X0+q.x),FP.p.z-(K.Z0+q.z))<.6&&FP.p.y<K.Y0+2.3){q.on=1;q.m.material=K.glowM(0x6dff8a,.8);sfx.pop();}}
    if(pl.every(q=>q.on)){opened=1;K.V(7,1,4,0);K.V(7,1,5,0);K.remesh();sfx.chime();toast("Kamen u oltaru se pomaknuo! Otvorila se tajna niša.",3200);}});
  K.V(7,1,5,T.pjescenjak);
  K.hot(7.5,8,1,"Kamene ploče",()=>{K.say(IN.host,"Ugh-ugh! Tri kamene ploče na podu. Stani na svaku i vidi što će se dogoditi!");},0);
  /* vines */
  for(let n=0;n<16;n++){const x=1.5+((n*5)%12),z=1.5+((n*7)%12),l=1+((n*3)%4)*.5;K.P(.06,l,.06,0x3f8a3f,x,8-l,z);K.S(.14,0x4f9a4a,x,8-l,z);}
  K.res("majmun","Majmun Bananko",11.5,5.5,0,["Ugh-ugh! Dobro došla u stari hram. Ovdje je sve od kamena i zlata.","Zlatni kip čuva tajnu. Kažu da tri ploče na podu otvaraju nešto u oltaru.","Pazi na kanale s vodom, tamo žive male ribice."],-.6);
  K.read(3.5,12.3,0,Math.PI*.8);
  K.door(7,14);K.pt(0xffd8a0,.42,20,7.5,4,7.5);
  K.gems([[7.5,0,4.5]],{fix:[7.5,0,4.5],when:()=>opened});
  return {intro:"Stari hram u džungli. Što skrivaju kamene ploče?"};};
