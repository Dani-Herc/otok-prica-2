/* =================== v38: SOBE: every book building has a room you can walk into ===================
   "Uđi" in explore mode no longer opens a sheet: the room is built from real blocks high above the sea (only while
   you are inside, never saved), so walking, jumping and the camera work exactly as outside. Town buildings get a
   themed room with their host (the favoured animal), the game at its proper place (blackboard, oven, counter ...),
   a guest book (the old building sheet) and a small daily treat. Other book buildings get a cosy reading room.
   Save: S.grad.vis[bookId]=day (optional). */
const IN={on:false,X0:12,Y0:50,Z0:12,cells:[],grp:null,hot:[],b:null,back:null,near:null,host:null,busy:false};
const INH={skola:["sova","Učiteljica Sova",["Najstarija hrvatska tiskana knjiga otisnuta je 1483. godine, i to glagoljicom.","Hrvatska abeceda ima 30 slova. Znaš li ih sva napamet?","Sove mogu okrenuti glavu za čak 270 stupnjeva."]],
  pekara:["panda","Pekar Panda",["Kruh naraste jer kvasac u tijestu stvara sitne mjehuriće plina.","Crvene pande najviše jedu bambus, ali vole i slatko voće.","Tijesto mora odmarati na toplom. Na hladnom kvasac spava."]],
  posta:["zec","Poštar Zec",["Prva poštanska marka na svijetu izdana je 1840. u Engleskoj.","Nekad su poruke nosili golubovi pismonoše.","Zec u trku može biti brži od 50 kilometara na sat."]],
  vatrogasci:["pingvin","Vatrogasac Pingvin",["Vatrogasce u Hrvatskoj zoveš na 193, a sve hitne službe na 112.","Vatri treba zrak. Zato se mali plamen u tavi gasi poklopcem.","Carski pingvini griju se tako da se stisnu u veliku skupinu."]],
  ambulanta:["macka","Doktorica Mačka",["Odrasla mačka ima 30 zuba, a odrasli pas 42.","Zdrav pas ima višu temperaturu od čovjeka, oko 38 i pol stupnjeva.","Mačke prespavaju i do 16 sati na dan."]],
  cvjecarna:["jez","Cvjećar Jež",["Mladi suncokreti danju okreću glavicu za suncem.","Pčele vide boje koje mi ne vidimo, pa cvijet njima izgleda drukčije.","Jež na leđima ima više od 5000 bodlji."]],
  muzej:["rida","Kustosica Lisica",["Riječ muzej dolazi od muza, grčkih zaštitnica umjetnosti.","U Krapini je nađeno nalazište neandertalaca staro oko 130 000 godina.","Lisica čuje miša čak i pod snijegom."]]};
const INSPOT={skola:"Ploča",pekara:"Peć",posta:"Šalter",vatrogasci:"Vatrogasno vozilo",ambulanta:"Stol za preglede",cvjecarna:"Stol s cvijećem",muzej:"Glavni izložak"};
function inTx(w,h,draw){const c=document.createElement("canvas");c.width=w;c.height=h;draw(c.getContext("2d"),w,h);const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;return t;}
function inBuild(b){const gk=GRD[b.bld]?b.bld:null,X0=IN.X0,Y0=IN.Y0,Z0=IN.Z0;IN.cells=[];IN.hot=[];IN.host=null;const grp=new THREE.Group();IN.grp=grp;
  const V=(i,j,k,t)=>{const id=I(X0+i,Y0+j,Z0+k);vox[id]=t;prot[id]=t?1:0;IN.cells.push(id);};
  const fill=(i0,i1,j0,j1,k0,k1,t)=>{for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++)for(let k=k0;k<=k1;k++)V(i,j,k,t);};
  const mat=(col,o)=>new THREE.MeshLambertMaterial(Object.assign({color:new THREE.Color(col).multiplyScalar(.32),emissive:new THREE.Color(col).multiplyScalar(.05)},o||{}));
  const top=(i0,i1,k)=>{for(let i=i0;i<=i1;i++)V(i,1,k,T.sdaske);P(i1-i0+1.1,.09,1.1,0xd9b27a,(i0+i1+1)/2,1,k+.5);};
  const desk=(x,z,col)=>{P(.95,.08,.6,0xd9b27a,x,.62,z);for(const [a,b] of [[-.4,-.24],[.4,-.24],[-.4,.24],[.4,.24]])P(.08,.62,.08,0x7a5230,x+a,0,z+b);P(.4,.05,.3,col,x,.7,z);};
  const P=(w,h,d,col,x,y,z,o)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),o&&o.map?new THREE.MeshBasicMaterial({map:o.map}):mat(col,o&&o.m));m.position.set(X0+x,Y0+1+y+h/2,Z0+z);if(o&&o.ry)m.rotation.y=o.ry;grp.add(m);return m;};
  const C=(r,h,col,x,y,z,o)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(o&&o.rt!=null?o.rt:r,r,h,o&&o.seg||14),mat(col));m.position.set(X0+x,Y0+1+y+h/2,Z0+z);if(o&&o.rz)m.rotation.z=o.rz;if(o&&o.rx)m.rotation.x=o.rx;grp.add(m);return m;};
  const Sp=(r,col,x,y,z)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,12,10),mat(col));m.position.set(X0+x,Y0+1+y,Z0+z);grp.add(m);return m;};
  const shell=(floor,wall,trim,ceil,o)=>{o=o||{};fill(0,12,0,0,0,10,floor);fill(0,12,6,6,0,10,ceil);
    for(let j=1;j<=5;j++)for(let i=0;i<=12;i++)for(let k=0;k<=10;k++){if(i>0&&i<12&&k>0&&k<10)continue;let t=j===1?trim:wall;const side=(i===0||i===12)&&(k===2||k===3||k===6||k===7||k===8&&o.glass),back=k===0&&o.glass&&i>=2&&i<=10;if((side||back)&&j>=3&&j<=(o.glass?5:4))t=T.staklo;V(i,j,k,t);}
    fill(1,11,1,5,1,9,0);V(6,1,10,T.tdaske);V(6,2,10,T.tdaske);V(5,3,10,T.sdaske);V(6,3,10,T.sdaske);V(7,3,10,T.sdaske);V(6,0,9,T.pled);
    for(const [i,k] of [[3,3],[9,3],[3,7],[9,7]])V(i,6,k,T.svjetlo);P(.12,.12,.3,0xf2b22e,6.85,.95,9.95);};
  const stool=(x,z)=>P(.5,.45,.5,0x9a6a3c,x,0,z);
  const pot=(x,y,z,col,s)=>{s=s||1;C(.2*s,.3*s,0xb5653a,x,y,z,{rt:.26*s});Sp(.26*s,col,x,y+.52*s,z);C(.04*s,.22*s,0x4f9a4a,x,y+.28*s,z);};
  const host=(kind,name,x,z,ry)=>{if(!MODELS[kind])kind="rida";const g=MODELS[kind]();g.position.set(X0+x,Y0+1,Z0+z);g.rotation.y=ry||0;grp.add(g);IN.host={name,g,x:X0+x,y:Y0+1,z:Z0+z,kind};};
  const lectern=(x,z)=>{P(.5,.9,.5,0x7a5230,x,0,z);P(.8,.1,.6,0x9a6a3c,x,.9,z);P(.6,.06,.44,0xfff8e6,x,1,z);};
  let spot=[8.5,3.6],hostAt=[3.5,3],led=[10.5,8.2];
  if(gk==="skola"){shell(T.daske,T.bijela,T.cigla,T.sdaske);
    P(5,2.2,.12,0x1f4a38,8,1.4,1.07,{map:inTx(160,70,(x,w,h)=>{x.fillStyle="#22543d";x.fillRect(0,0,w,h);x.strokeStyle="#c9a26b";x.lineWidth=5;x.strokeRect(2,2,w-4,h-4);x.fillStyle="#f4f1e8";x.font="bold 20px sans-serif";x.fillText("A B C Č Ć",12,28);x.fillText("7 + 5 = 12",40,56);})});
    top(7,9,2);Sp(.32,0x3f8fd0,9.5,1.5,2.5);C(.06,.2,0x7a5230,9.5,1.09,2.5);P(.5,.08,.36,0xe04a3a,7.5,1.09,2.5);
    for(const [i,k] of [[2,5],[4,5],[2,7],[4,7],[9,6],[10.6,6],[9,8]]){desk(i+.5,k+.5,[0x4a7fd6,0xf2b22e,0xe04a3a,0x3fa86a][Math.floor(i+k)%4]);stool(i+.5,k+1.25);}
    fill(1,2,1,3,1,1,T.polica);P(.9,.9,.08,0xfff8e6,4.5,2.2,1.06,{map:inTx(64,64,(x,w,h)=>{x.fillStyle="#fff8e6";x.fillRect(0,0,w,h);x.strokeStyle="#16243a";x.lineWidth=4;x.beginPath();x.arc(32,32,26,0,7);x.stroke();x.beginPath();x.moveTo(32,32);x.lineTo(32,14);x.moveTo(32,32);x.lineTo(44,38);x.stroke();})});
    for(let n=0;n<6;n++)P(.5,.5,.06,[0xe04a3a,0xf2b22e,0x3fa86a,0x4a7fd6,0xc08bff,0xff8fb0][n],1.06,2.6,3.6+n*.8,{ry:Math.PI/2});hostAt=[5.5,2.4];spot=[8.5,3.7];}
  else if(gk==="pekara"){shell(T.daske,T.bijela,T.sdaske,T.tdaske);
    fill(7,9,1,4,1,1,T.cigla);V(8,2,1,T.zar||T.lampion);V(8,1,1,T.kamen);P(1.1,.2,.5,0x4a3a2e,8.5,.95,2.2);for(const dx of [-.3,.3])P(.36,.18,.26,0xc98a3e,8.5+dx,1.15,2.2);
    top(3,6,4);for(let n=0;n<5;n++){const x=3.4+n*.75;P(.5,.24,.3,n%2?0xd99a4e:0xb8702e,x,1.09,4.5,{ry:n*.3});}
    for(const j of [1.3,2.2,3.1]){P(2.6,.08,.5,0x9a6a3c,2.4,j,1.3);for(let n=0;n<4;n++)P(.44,.22,.3,[0xd99a4e,0xc98a3e,0xb8702e][n%3],1.4+n*.66,j+.08,1.3);}
    V(1,1,7,T.bacva);V(1,1,8,T.bacva);V(2,1,8,T.bacva);for(const [x,z] of [[10.6,2],[10.8,3],[10.2,2.8]])P(.7,.85,.55,0xf3ead8,x,0,z,{ry:x});P(.5,.5,.5,0xf3ead8,10.5,.85,2.4);
    P(.9,.6,.06,0x7a5230,10.9,2.4,6,{ry:Math.PI/2,map:inTx(64,40,(x,w,h)=>{x.fillStyle="#7a5230";x.fillRect(0,0,w,h);x.fillStyle="#fff3c4";x.font="bold 15px sans-serif";x.fillText("KRUH",9,18);x.fillText("PECIVO",3,35);})});hostAt=[4.5,2.6];spot=[8.5,3.4];}
  else if(gk==="posta"){shell(T.daske,T.vuna_z||T.bijela,T.sdaske,T.sdaske);
    top(4,9,3);P(4.2,2.4,.3,0x7a5230,6.5,.9,1.2,{map:inTx(126,72,(x,w,h)=>{x.fillStyle="#6a4526";x.fillRect(0,0,w,h);for(let r=0;r<4;r++)for(let c=0;c<7;c++){x.fillStyle="#2c1c10";x.fillRect(4+c*18,4+r*17,14,13);if((r*3+c*5)%4<2){x.fillStyle=["#fff8e6","#ffd9a0","#cfe6ff"][(r+c)%3];x.fillRect(6+c*18,10+r*17,10,6);}}})});
    P(.5,.3,.4,0x6b7a8c,5,1.09,3.5);P(.6,.04,.4,0xfff8e6,7.2,1.09,3.5);P(.3,.3,.3,0xe04a3a,8.6,1.09,3.5);
    for(const [x,z,s,c] of [[2,6,.9,0xc79a5a],[2.9,6.3,.7,0xb8864a],[2.2,7,.6,0xd1a868],[2.3,6.2,.5,0xb8864a]]){const m=P(s,s*(c===0xb8864a&&s===.5?1:.8),s,c,x,s===.5?.72:0,z,{ry:x});P(s+.02,.06,.12,0xe04a3a,x,(s===.5?.72:0)+s*.4,z,{ry:x});}
    P(.9,1.5,.8,0xe04a3a,10.3,0,7.6);P(.6,.08,.05,0x16243a,10.3,1.05,7.18);P(.96,.14,.86,0xb83a2e,10.3,1.5,7.6);for(const [x,z] of [[1.7,2],[2.4,2.6]]){Sp(.5,0xd8c9a8,x,.45,z);P(.2,.2,.2,0xb8a888,x,.85,z);}
    P(1.6,.9,.06,0xf2b22e,1.06,2.4,4.5,{ry:Math.PI/2,map:inTx(80,45,(x,w,h)=>{x.fillStyle="#f2b22e";x.fillRect(0,0,w,h);x.strokeStyle="#16243a";x.lineWidth=4;x.strokeRect(14,10,52,26);x.beginPath();x.moveTo(14,10);x.lineTo(40,26);x.lineTo(66,10);x.stroke();})});hostAt=[6.5,2.2];spot=[6.5,4.6];led=[10.5,4.5];}
  else if(gk==="vatrogasci"){shell(T.kamen,T.cigla,T.kcigla,T.sdaske);for(let k=1;k<=9;k++)V(6,0,k,k===9?T.pled:T.vuna_c);for(let k=1;k<=9;k++){if(k%2)V(5,0,k,T.vuna_b);}
    C(.09,5,0xf2c12e,3.5,0,6.5);C(.5,.06,0x6b7a8c,3.5,0,6.5);
    P(3.2,1.1,1.5,0xd8342a,8.6,.45,4.5);P(1.1,1,1.5,0xd8342a,7.5,1.3,4.5);P(.06,.6,1.2,0x9fd8f0,6.94,1.5,4.5);P(2,.12,.5,0xcfd6de,9.2,1.6,4.5);for(let n=0;n<5;n++)P(.08,.14,.5,0x8a96a3,8.4+n*.4,1.66,4.5);
    for(const [x,z] of [[7.6,3.72],[9.7,3.72],[7.6,5.28],[9.7,5.28]])C(.42,.3,0x1c232e,x,.03,z,{rx:Math.PI/2});Sp(.16,0x3f8fd0,7.5,2.42,4.5);P(.5,.2,.06,0xfff3c4,10.22,.8,4.1,{ry:Math.PI/2});P(.5,.2,.06,0xfff3c4,10.22,.8,4.9,{ry:Math.PI/2});
    C(.55,.3,0xb83a2e,1.2,2.2,3,{rz:Math.PI/2});C(.3,.34,0x2c3440,1.2,2.2,3,{rz:Math.PI/2});
    P(2.4,.08,.5,0x9a6a3c,3,2.2,1.3);for(let n=0;n<3;n++){Sp(.26,0xf2c12e,2.2+n*.8,2.5,1.3);P(.6,.05,.5,0xf2c12e,2.2+n*.8,2.28,1.35);}
    V(1,1,8,T.bacva);V(2,1,8,T.bacva);for(const z of [1.5,2.1])C(.14,.6,0xd8342a,10.6,0,z);hostAt=[4.5,3.2];spot=[8.5,6.4];}
  else if(gk==="ambulanta"){shell(T.kvarc,T.bijela,T.vuna_p||T.bijela,T.bijela);
    V(7,1,3,T.kvarc);V(8,1,3,T.kvarc);P(1.9,.14,.9,0x9fd0f0,8,1,3.5);P(.4,.1,.6,0xffffff,7.3,1.14,3.5);
    P(1.6,2,.4,0xffffff,8,1,1.25);P(1.4,.06,.3,0xcfd6de,8,1.6,1.3);P(1.4,.06,.3,0xcfd6de,8,2.3,1.3);for(let n=0;n<4;n++)C(.09,.26,[0x4a7fd6,0xe04a3a,0x3fa86a,0xf2b22e][n],7.5+n*.33,1.66,1.42);
    P(.9,.9,.06,0xffffff,4,2.6,1.06,{map:inTx(48,48,(x,w,h)=>{x.fillStyle="#fff";x.fillRect(0,0,w,h);x.fillStyle="#e04a3a";x.fillRect(19,8,10,32);x.fillRect(8,19,32,10);})});
    for(const k of [5,7]){V(2,1,k,T.vuna_b);V(1,1,k,T.vuna_b);P(.5,.14,.7,0xcfe6ff,1.4,1,k+.5);}P(.7,.1,.7,0x6b7a8c,10.4,0,2.4);P(.1,1.3,.1,0x6b7a8c,10.4,.1,2.7);P(.5,.3,.08,0xffffff,10.4,1.3,2.66);
    pot(10.4,0,6.5,0x4f9a4a,1.6);P(1.4,.5,.8,0x9a6a3c,4.6,0,7.2);P(1.2,.34,.6,0xf2b22e,4.6,.5,7.2);hostAt=[5.4,3.2];spot=[8,4.7];}
  else if(gk==="cvjecarna"){shell(T.daske,T.bijela,T.sdaske,T.vuna_r||T.sdaske,{glass:1});
    const cols=[0xff6b6b,0xffd24a,0xc08bff,0xff8fb0,0xffffff,0xff9a3a,0x6cc4e0];
    for(const [x0,z0,ry] of [[2,2,0],[10.4,3,0]]){for(let s=0;s<3;s++){P(1.6,.08,.5,0x9a6a3c,x0,.5+s*.7,z0-s*.3+.3);for(let n=0;n<3;n++)pot(x0-.5+n*.5,.58+s*.7,z0-s*.3+.3,cols[(s*3+n+(x0>5?2:0))%7],.75);}}
    top(7,8,4);P(.7,.05,.5,0xff8fb0,7.4,1.09,4.5);pot(8.5,1.09,4.5,0xff6b6b,.9);C(.05,.5,0x4f9a4a,7.4,1.14,4.5,{rz:1.2});
    for(const [i,k,t] of [[1,8,T.tresnja],[1,7,T.carlisce],[11,8,T.lisce_b],[11,7,T.tresnja],[1,9,T.carlisce],[11,9,T.carlisce]])if(t)V(i,1,k,t);V(1,2,8,T.tresnja);V(11,2,8,T.lisce_b);
    for(let n=0;n<5;n++)pot(4+n*1.2,0,1.6,cols[(n*2+1)%7],1.3);C(.28,.4,0x6b9ad6,9.6,0,7.5);C(.05,.5,0x6b9ad6,9.95,.3,7.5,{rz:-1});
    for(let n=0;n<3;n++){C(.02,.8,0x8a96a3,4+n*2.4,4.2,5);pot(4+n*2.4,3.6,5,cols[(n+3)%7],.9);}hostAt=[5.5,3.2];spot=[8,5.7];}
  else if(gk==="muzej"){shell(T.kvarc,T.kvarc,T.prizcigla||T.kvarc,T.kvarc);for(let k=2;k<=9;k++)V(6,0,k,T.vuna_c);
    V(6,1,3,T.kvarc);V(6,2,3,T.kristal);P(1.1,1.2,1.1,0xcfe6ff,6.5,1,3.5,{m:{transparent:true,opacity:.22}});
    V(3,1,3,T.kvarc);for(const [w,h,d,x,y,z] of [[.7,.34,.5,3.5,1,3.5],[.34,.2,.3,3.5,1.3,3.75],[.5,.12,.3,3.5,.92,3.82]])P(w,h,d,0xf1ead8,x,y,z);P(.1,.1,.1,0x16243a,3.35,1.18,3.76);P(.1,.1,.1,0x16243a,3.65,1.18,3.76);
    V(9,1,3,T.kvarc);C(.24,.5,0xc7813a,9.5,1,3.5,{rt:.14});C(.14,.18,0xc7813a,9.5,1.5,3.5,{rt:.2});P(.5,.06,.06,0x16243a,9.5,1.2,3.74);
    V(3,1,6,T.kvarc);V(3,2,6,T.zlato);V(9,1,6,T.kvarc);V(9,2,6,T.ametist||T.kristal);
    const pic=(n)=>inTx(64,48,(x,w,h)=>{const sky=["#8fd0ff","#ffd9a0","#1c2a4a"][n],gr=["#4f9a4a","#c79a5a","#2f5d46"][n];x.fillStyle=sky;x.fillRect(0,0,w,h);x.fillStyle=["#ffe27a","#ff8f5a","#fff8e6"][n];x.beginPath();x.arc(46,14,7,0,7);x.fill();x.fillStyle=gr;x.beginPath();x.moveTo(0,h);x.lineTo(0,30);x.lineTo(22,18);x.lineTo(40,32);x.lineTo(64,24);x.lineTo(64,h);x.fill();x.strokeStyle="#c9a23a";x.lineWidth=6;x.strokeRect(0,0,w,h);});
    P(1.6,1.2,.08,0xffffff,3.5,1.8,1.06,{map:pic(0)});P(1.6,1.2,.08,0xffffff,9.5,1.8,1.06,{map:pic(1)});P(1.6,1.2,.08,0xffffff,1.06,1.8,5,{ry:Math.PI/2,map:pic(2)});
    for(const x of [4.6,8.4]){C(.06,.9,0xc9a23a,x,0,5);C(.06,.9,0xc9a23a,x,0,2);P(.06,.06,3,0xb83a2e,x,.8,3.5);}hostAt=[9.5,7.6];spot=[6.5,5];led=[2.5,8.2];}
  else{const G=GENRES[b.genre],col=new THREE.Color(G&&G.col||"#4a7fd6").getHex();shell(T.daske,T.sdaske,T.tdaske,T.sdaske);fill(1,11,1,4,1,1,T.polica);fill(1,1,1,3,2,4,T.polica);fill(4,8,0,0,4,7,T.pled);
    for(const [x,z,ry] of [[4.5,5.2,.5],[8.5,5.2,-.5]]){P(1,.5,1,col,x,0,z,{ry});P(1,.7,.25,col,x,.5,z-.4,{ry});}top(6,6,5);P(.5,.08,.36,col,6.5,1.09,5.5,{ry:.3});V(11,1,8,T.lampion);V(1,1,8,T.lampion);
    P(1.4,1.8,.1,col,10.9,1.4,5,{ry:Math.PI/2,map:inTx(96,128,(x,w,h)=>{x.fillStyle=G&&G.col||"#4a7fd6";x.fillRect(0,0,w,h);x.strokeStyle="#fff8e6";x.lineWidth=5;x.strokeRect(6,6,w-12,h-12);x.fillStyle="#fff8e6";x.font="bold 13px sans-serif";x.textAlign="center";const ws=String(b.title).split(" ");let l="",y=44;for(const wd of ws){if((l+" "+wd).length>11){x.fillText(l,48,y);y+=17;l=wd;}else l=l?l+" "+wd:wd;}x.fillText(l,48,y);})});spot=[6.5,6.6];hostAt=null;led=null;}
  if(gk&&hostAt){const Hh=INH[gk];host(Hh[0],Hh[1],hostAt[0],hostAt[1],Math.atan2(6.5-hostAt[0],8-hostAt[1]));IN.hot.push({x:X0+hostAt[0],z:Z0+hostAt[1],r:1.7,n:"Razgovaraj: "+Hh[1],act:()=>inTalk(b,gk)});}
  IN.hot.push({x:X0+spot[0],z:Z0+spot[1],r:1.5,n:gk?(b.done?"Igraj: "+GRD[gk].g:INSPOT[gk]):"Otvori knjigu",act:()=>{if(gk&&b.done)GGAME[gk](b);else sheetBuilding(b);}});
  if(led){lectern(led[0],led[1]);IN.hot.push({x:X0+led[0],z:Z0+led[1],r:1.4,n:"Knjiga zgrade",act:()=>sheetBuilding(b)});}
  IN.hot.push({x:X0+6.5,z:Z0+9.6,r:1.05,n:"Izađi van",act:()=>inLeave()});
  const pl=new THREE.PointLight(0xfff0d0,.3,16);pl.position.set(X0+6.5,Y0+5,Z0+5);grp.add(pl);scene.add(grp);
  lightBox(X0-2,X0+15,Z0-2,Z0+13);for(let cx=0;cx<=Math.floor((X0+14)/CS);cx++)for(let cz=0;cz<=Math.floor((Z0+12)/CS);cz++)dirtyChunks.add(cx+","+cz);}
function inClear(){for(const id of IN.cells){vox[id]=0;prot[id]=0;}IN.cells=[];if(IN.grp){scene.remove(IN.grp);IN.grp.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose();}});IN.grp=null;}
  lightBox(IN.X0-2,IN.X0+15,IN.Z0-2,IN.Z0+13);for(let cx=0;cx<=Math.floor((IN.X0+14)/CS);cx++)for(let cz=0;cz<=Math.floor((IN.Z0+12)/CS);cz++)dirtyChunks.add(cx+","+cz);IN.hot=[];IN.host=null;}
function inVeil(fn){let v=$("inVeil");if(!v){document.body.insertAdjacentHTML("beforeend",'<div id="inVeil"></div>');v=$("inVeil");}v.classList.add("on");setTimeout(()=>{try{fn();}catch(e){console.error("soba",e);}setTimeout(()=>v.classList.remove("on"),260);},230);}
function inEnter(b){if(IN.on||IN.busy||!FP.on)return;if(FP.mount){toast("Prvo siđi, pa uđi na vrata.");return;}IN.busy=true;sfx.click();
  inVeil(()=>{IN.back={x:FP.p.x,y:FP.p.y,z:FP.p.z,yaw:FP.cam.yaw};IN.b=b;inBuild(b);IN.on=true;IN.busy=false;FP.p.set(IN.X0+6.5,IN.Y0+1.05,IN.Z0+8.4);FP.v.set(0,0,0);FP.safe.copy(FP.p);FP.cam.yaw=0;FP.yaw=Math.PI;FP.cam.cur=2.5;FP.camT.set(FP.p.x,FP.p.y+1.05,FP.p.z);
    $("bldGo").hidden=true;IN.near=null;const gk=GRD[b.bld]?b.bld:null;setTimeout(()=>toast(gk?GRD[gk].n+". "+INH[gk][1]+" te čeka!":bldName(b)+": čitaonica knjige „"+b.title+"”.",3600),500);});}
function inLeave(silent){if(!IN.on)return;const done=()=>{const B=IN.back;IN.on=false;inClear();if(B){FP.p.set(B.x,B.y+.1,B.z);FP.v.set(0,0,0);FP.safe.copy(FP.p);FP.cam.yaw=B.yaw;FP.camT.set(B.x,B.y+1.05,B.z);}IN.b=null;IN.near=null;$("bldGo").hidden=true;DQ.near=null;};
  if(silent)done();else{sfx.click();inVeil(done);}}
function inTalk(b,gk){const Hh=INH[gk],G=gradS();G.vis=G.vis||{};const t=today();IN.host.hop=1;
  if(G.vis[b.id]!==t){G.vis[b.id]=t;S.coins+=10;save();renderEco();sfx.chime();say(IN.host,"Lijepo te je vidjeti, "+S.name+"! Evo ti 10 zlatnika za danas. "+(b.done?"Igra te čeka: "+INSPOT[gk].toLowerCase()+".":"Kad pročitaš knjigu do kraja, ovdje te čeka igra."),6500);return;}
  G.talk=((G.talk||0)+1)%3;say(IN.host,Hh[2][G.talk],6500);sfx.pop();}
function inTick(dt,tt){if(!IN.on)return;if(IN.host){const g=IN.host.g;IN.host.hop=Math.max(0,(IN.host.hop||0)-dt*2.2);g.position.y=IN.Y0+1+Math.abs(Math.sin(tt*2))*.03+Math.sin(Math.min(1,IN.host.hop)*Math.PI)*.35;
    const a=Math.atan2(FP.p.x-IN.host.x,FP.p.z-IN.host.z);let d=a-g.rotation.y;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;g.rotation.y+=d*Math.min(1,dt*4);}
  if(FP.p.y<IN.Y0-3){FP.p.set(IN.X0+6.5,IN.Y0+1.05,IN.Z0+8.4);FP.v.set(0,0,0);}
  let best=null,bd=9;for(const h of IN.hot){const d=Math.hypot(FP.p.x-h.x,FP.p.z-h.z);if(d<h.r&&d<bd){bd=d;best=h;}}const el=$("bldGo"),open=$("veil").hidden;
  if(best!==IN.near||el.hidden!==!(best&&open)){IN.near=best;el.hidden=!(best&&open);if(best)el.textContent=best.n;}}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);try{inTick(dt,tt);}catch(e){if(!IN.err){IN.err=1;console.warn("soba",e);}}};}
$("bldGo").onclick=()=>{if(IN.on){if(IN.near){sfx.click();IN.near.act();}return;}if(DQ.near)inEnter(DQ.near);};
{const _dc=dCross;dCross=function(){if(IN.on)return;return _dc.apply(this,arguments);};}
{const _dn=dNear;dNear=function(){if(IN.on||IN.busy)return;return _dn.apply(this,arguments);};}
{const _es=endSquirrel;endSquirrel=function(){if(IN.on)inLeave(true);return _es.apply(this,arguments);};}
{const _pa=placeAt;placeAt=function(c){if(IN.on){toast("U sobi se ne gradi. Izađi van pa gradi koliko želiš.",2600);return;}return _pa.apply(this,arguments);};}
if(typeof fpPlace==="function"){const _fp=fpPlace;fpPlace=function(){if(IN.on){toast("U sobi se ne gradi. Izađi van pa gradi koliko želiš.",2600);return;}return _fp.apply(this,arguments);};}
if(typeof zvSkyTick==="function"){const _zs=zvSkyTick;zvSkyTick=function(dt){_zs.apply(this,arguments);if(IN.on&&ZV.rain){ZV.rain.L.visible=false;if(ZV.drift)ZV.drift.P.visible=false;}};}
if(typeof jbTick==="function"){const _jt=jbTick;jbTick=function(){if(IN.on)return;return _jt.apply(this,arguments);};}
