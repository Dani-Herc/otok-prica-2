/* ===== v25 minigames, part 1: Toranj do oblaka (stacking) and Ježev golf (mini golf) ===== */

/* ---------- 1. TORANJ DO OBLAKA: drop sliding blocks, keep only the part that overlaps ---------- */
const TW={};
miniReg("toranj",{n:"Toranj do oblaka",d:"Kocka klizi lijevo-desno. Pusti je točno na toranj! Svaka šesta kocka je zlatna: savršen pogodak ponovno proširi toranj. Toranj raste kroz oblake sve do svemira.",col:["#ffd8a0","#ff8a6a"],reward:"dijamant",
  medals:[10,20,32],fmt:v=>v==null?"-":v+" kat"+(v%10===1&&v%100!==11?"":v%10>=2&&v%10<=4&&(v%100<12||v%100>14)?"a":"ova"),mlab(m){return this.medals[m]+" katova";},touch:1,fog:.002,
  hint:"Dodirni ekran ili pritisni Razmak da pustiš kocku!",
  icon(x){const cols=["#5a8ad8","#6ad0a0","#ffd23a","#ff8a4a","#ff5a7a"];for(let i=0;i<5;i++){x.fillStyle=cols[i];const w=54-i*5,o=i%2?4:-3;x.fillRect(21+(54-w)/2+o,74-i*12,w,11);x.strokeStyle="#16243a";x.lineWidth=2.5;x.strokeRect(21+(54-w)/2+o,74-i*12,w,11);}
    x.fillStyle="#fff";x.beginPath();x.arc(74,22,9,0,7);x.arc(64,24,7,0,7);x.fill();},
  start(M,A){TW.sky=mSky(A,0x8ab8f0,0xffd8b0);TW.stage=0;TW.gold=0;TW.A=A;TW.blocks=[];TW.falls=[];TW.H=.9;TW.n=0;TW.perf=0;TW.dead=0;TW.camY=4;
    const base=new THREE.Group();A.add(base);const rock=new THREE.Mesh(new THREE.CylinderGeometry(7,3,8,9),mStd(0x8a7a6a,{flatShading:true}));rock.position.y=-4.6;base.add(rock);
    const top=new THREE.Mesh(new THREE.CylinderGeometry(7.3,7,1,9),mStd(0x5aa83a,{flatShading:true}));top.position.y=-.5;base.add(top);
    for(let i=0;i<10;i++){const a=i/10*6.283;const t=new THREE.Mesh(new THREE.ConeGeometry(.9,2.4,6),mStd(0x2f7a3a,{flatShading:true}));t.position.set(Math.cos(a)*5.6,1.1,Math.sin(a)*5.6);if(Math.abs(Math.sin(a*1.7))>.3)base.add(t);}
    for(let i=0;i<14;i++){const c=new THREE.Mesh(new THREE.SphereGeometry(2+Math.random()*2.5,8,6),mStd(0xffffff,{roughness:1,emissive:0xffffff,emissiveIntensity:.25}));const a=Math.random()*6.283,r=22+Math.random()*30;c.position.set(Math.cos(a)*r,-8+Math.random()*60,Math.sin(a)*r);c.scale.y=.55;A.add(c);}
    const b0={x:0,z:0,w:4,d:4,y:0,m:mBox(A,4,TW.H,4,0x8a94a8,0,TW.H/2,0)};TW.blocks.push(b0);
    TW.actor=miniActor(1);TW.actor.position.set(1.2,TW.H,1.2);A.add(TW.actor);this.next();miniHUD('<span class="tm">Toranj</span>','<span class="sc">🧱 0</span>');},
  colr(n){return new THREE.Color().setHSL((.58-n*.035+10)%1,.7,.56).convertSRGBToLinear();},
  next(){const p=TW.blocks[TW.blocks.length-1];const ax=TW.n%2===0?"x":"z";const gold=(TW.n+1)%6===0;const side=TW.n>=8&&Math.random()<.5?1:-1;const b={w:p.w,d:p.d,y:(TW.n+1)*TW.H,ax,dir:-side,gold,sp:Math.min(8.6,3.4+TW.n*.16)*(gold?.82:1)};b.x=ax==="x"?9*side:p.x;b.z=ax==="z"?9*side:p.z;
    b.m=new THREE.Mesh(new THREE.BoxGeometry(1,TW.H,1),gold?mStd(0xffc53d,{roughness:.25,metalness:.5,emissive:0xffa000,emissiveIntensity:.55}):mStd(this.colr(TW.n+1),{roughness:.45,metalness:.1}));if(gold)miniMsg("Zlatna kocka! Pogodi je savršeno i toranj se proširi.",1900);b.m.scale.set(b.w,1,b.d);TW.A.add(b.m);TW.cur=b;},
  drop(){const b=TW.cur,p=TW.blocks[TW.blocks.length-1];if(!b||TW.dead)return;const ax=b.ax,size=ax==="x"?"w":"d";let off=b[ax]-p[ax];
    if(Math.abs(off)<.14){off=0;b[ax]=p[ax];TW.perf++;}else TW.perf=0;const over=b[size]-Math.abs(off);
    if(over<=0){TW.dead=1;TW.falls.push({m:b.m,vy:0,vr:(Math.random()-.5)*4});TW.cur=null;tone(160,.4,"sawtooth",.04);sfx.splash&&sfx.splash();miniMsg("Promašaj!",1500);setTimeout(()=>miniFinish({score:TW.n,label:TW.n+" katova",title:"Toranj se srušio!",bonus:TW.gold*4}),1100);return;}
    if(off!==0){const cut=Math.abs(off),side=Math.sign(off);const fm=new THREE.Mesh(new THREE.BoxGeometry(1,TW.H,1),b.m.material.clone());const fx=ax==="x"?b.x+side*(over/2+cut/2):b.x,fz=ax==="z"?b.z+side*(over/2+cut/2):b.z;
      fm.scale.set(ax==="x"?cut:b.w,1,ax==="z"?cut:b.d);fm.position.set(fx,b.y+TW.H/2,fz);TW.A.add(fm);TW.falls.push({m:fm,vy:0,vr:side*2.5,ax});b[size]=over;b[ax]=p[ax]+off/2;}
    else if(TW.perf>=3&&b[size]<4){b[size]=Math.min(4,b[size]+.35);}
    if(off===0&&b.gold){b.w=Math.min(4,b.w+1.3);b.d=Math.min(4,b.d+1.3);TW.gold++;TW.goldHit=1;}else TW.goldHit=0;
    b.m.scale.set(b.w,1,b.d);b.m.position.set(b.x,b.y+TW.H/2,b.z);TW.blocks.push(b);TW.n++;TW.cur=null;
    const A=MG.arena.position;if(off===0){const n=TW.perf;tone(523*Math.pow(1.0595,Math.min(n,12)*2),.18,"triangle",.05);tone(1046*Math.pow(1.0595,Math.min(n,12)*2),.12,"sine",.03,.06);mgRing(A.x+b.x,A.y+b.y+TW.H+.05,A.z+b.z,0xffffff);
      burst(A.x+b.x,A.y+b.y+TW.H,A.z+b.z,24,[[1,1,1],[1,.9,.5]],2,2,.6);miniMsg(TW.goldHit?"Zlatno! Toranj je opet širok!":TW.perf>=3?"Savršeno ×"+TW.perf+"! Kocka raste!":"Savršeno!",1100);if(TW.goldHit){[784,988,1318,1568].forEach((f,i)=>tone(f,.14,"triangle",.045,i*.06));burst(A.x+b.x,A.y+b.y+TW.H,A.z+b.z,50,[[1,.85,.3],[1,1,.7],[1,.6,.2]],3.4,3.6,.9);}}
    else tone(330+TW.n*8,.12,"square",.025);
    TW.actor.userData.hop={t:0,fx:TW.actor.position.x,fz:TW.actor.position.z,fy:TW.actor.position.y,tx:b.x+Math.min(.6,b.w*.25),tz:b.z+Math.min(.6,b.d*.25),ty:b.y+TW.H};
    miniHUD('<span class="tm">Toranj</span>','<span class="sc">🧱 '+TW.n+'</span>');if(TW.n===MINI.toranj.medals[0]||TW.n===MINI.toranj.medals[1]||TW.n===MINI.toranj.medals[2]){sfx.chime();miniMsg(MEDALN[MINI.toranj.medals.indexOf(TW.n)+1]+" medalja!",1600);}
    const st=TW.n>=30?3:TW.n>=20?2:TW.n>=10?1:0;if(st!==TW.stage){TW.stage=st;miniMsg(["","Iznad oblaka! Sunce zalazi.","Među zvijezdama!","Svemirski toranj!"][st],1900);}
    this.next();},
  onDown(){this.drop();},key(k,d){if(d&&(k===" "||k==="enter"||k==="arrowdown"))this.drop();},
  tick(dt,t,M){const b=TW.cur;if(b){b[b.ax]+=b.dir*b.sp*dt;if(b[b.ax]>9){b[b.ax]=9;b.dir=-1;}if(b[b.ax]<-9){b[b.ax]=-9;b.dir=1;}b.m.position.set(b.x,b.y+TW.H/2,b.z);}
    for(let i=TW.falls.length-1;i>=0;i--){const f=TW.falls[i];f.vy-=24*dt;f.m.position.y+=f.vy*dt;if(f.ax==="x")f.m.rotation.z-=f.vr*dt;else f.m.rotation.x+=f.vr*dt;if(f.m.position.y<-40){TW.A.remove(f.m);TW.falls.splice(i,1);}}
    const a=TW.actor,h=a.userData.hop;if(h){h.t+=dt*3;const k=Math.min(1,h.t);a.position.set(h.fx+(h.tx-h.fx)*k,h.fy+(h.ty-h.fy)*k+Math.sin(k*Math.PI)*1.2,h.fz+(h.tz-h.fz)*k);if(k>=1)a.userData.hop=null;}
    a.rotation.y=t*.4;miniAnimActor(a,t,!!h);
    if(TW.sky){const U=TW.sky.material.uniforms,C=TW.skyC||(TW.skyC=[[0x8ab8f0,0xffd8b0],[0x6a5ad8,0xffa07a],[0x101848,0x5a3a9a],[0x05061a,0x2a1a5a]].map(p=>p.map(h=>new THREE.Color(h))));const k=Math.min(1,dt*1.2);U.a.value.lerp(C[TW.stage][0],k);U.b.value.lerp(C[TW.stage][1],k);
      if(TW.stage>=2&&Math.random()<dt*6){const A2=MG.arena.position,an=Math.random()*6.283,r=10+Math.random()*14;mgSpawn({t:"star",x:A2.x+Math.cos(an)*r,y:A2.y+TW.camY+Math.random()*10-2,z:A2.z+Math.sin(an)*r,life:1.6,size:.3,size2:.02,col:[0xffffff,0xfff1a8,0xa8d8ff],add:1});}}
    TW.camY+=((TW.n+1)*TW.H+3-TW.camY)*Math.min(1,dt*2);const r=15+Math.min(10,TW.n*.15),ang=.8+t*.05;camTo(Math.cos(ang)*r,TW.camY+6,Math.sin(ang)*r,0,TW.camY-1.5,0,3,dt);},
  idle(dt,t){this.tick(dt,t);},
  quit(){if(!TW.dead){TW.dead=1;miniFinish({score:TW.n,label:TW.n+" katova",title:"Toranj do oblaka",bonus:TW.gold*4});}}});

/* ---------- 2. JEŽEV GOLF: six holes, aim by dragging, the hedgehog is the ball ---------- */
const GH=[
 {par:2,map:["#######","#S...C#","#######"],tip:"Povuci prst unatrag od ježa i pusti. Što dulje povučeš, to jači udarac!"},
 {par:2,map:["#########","#S......#","#######.#","#C..G...#","#########"],alt:["#########","#S..~~.G#","#.#####.#","#...C...#","#########"],atip:"Pijesak usporava ježa. Kraći put ide preko pijeska, dulji okolo."},
 {par:3,map:["#########","#S..B..G#","#...B.O.#","#.O...B.#","#G..B..C#","#########"],tip:"Okrugli odbojnici te odbace. Iskoristi ih!"},
 {par:2,map:["###########","#S..>>>..G#","#####.#####","    #.#    ","    #C#    ","    ###    "],alt:["###########","#S..>>>..G#","#####~#####","    #.#    ","    #C#    ","    ###    "],tip:"Strelice na tlu ubrzavaju ježa."},
 {par:3,map:["#########","#S.....G#","#.......#","#...W...#","#.......#","#G.....C#","#########"],tip:"Pazi na vjetrenjaču! Pričekaj pravi trenutak."},
 {par:3,map:["###########","#S.#G...O.#","#..#.##...#","#..#.G#.B.#","#.....#..C#","###########"],alt:["###########","#S...#..G.#","#.O..#.~~.#","#....#.~~.#","#..B.....C#","###########"],tip:"Zadnja rupa! Polako i pažljivo."}];
const GF={T:1.6,R:.26};
miniReg("golf",{n:"Ježev golf",d:"Bodlja se smotao u lopticu! Šest rupa s odbojnicima, ubrzivačima, pijeskom i vjetrenjačom. Točkice pokazuju kamo će se jež odbiti. Dragulji uz stazu donose zlatnike. Staze se mijenjaju iz igre u igru.",col:["#b8f0a0","#3a9a4a"],reward:"lava",low:1,
  medals:[24,19,15],fmt:v=>v==null?"-":v+" udar"+(v%10===1&&v%100!==11?"ac":v%10>=2&&v%10<=4&&(v%100<12||v%100>14)?"ca":"aca"),mlab(m){return "najviše "+this.medals[m]+" udaraca";},touch:1,fog:.0018,
  icon(x){x.fillStyle="#2f8a3a";x.beginPath();x.ellipse(48,70,36,14,0,0,7);x.fill();x.fillStyle="#16243a";x.beginPath();x.ellipse(64,70,7,3,0,0,7);x.fill();x.fillStyle="#fff";x.fillRect(63,26,3,44);x.fillStyle="#ff4a5a";x.beginPath();x.moveTo(66,26);x.lineTo(84,32);x.lineTo(66,38);x.fill();
    x.fillStyle="#8a5a32";x.beginPath();x.arc(30,62,11,0,7);x.fill();x.strokeStyle="#4a2a12";x.lineWidth=2.5;for(let i=0;i<9;i++){const a=i/9*6.28;x.beginPath();x.moveTo(30+Math.cos(a)*9,62+Math.sin(a)*9);x.lineTo(30+Math.cos(a)*15,62+Math.sin(a)*15);x.stroke();}},
  start(M,A){mSky(A,0x6ab0f0,0xd8f0ff);GF.A=A;GF.hole=0;GF.total=0;GF.cards=[];GF.gems=0;GF.vr=(miniRec("golf").plays||0)%2;
    for(let i=0;i<16;i++){const c=new THREE.Mesh(new THREE.SphereGeometry(3+Math.random()*3,8,6),mStd(0xffffff,{roughness:1,emissive:0xffffff,emissiveIntensity:.25}));const a=Math.random()*6.283,r=40+Math.random()*40;c.position.set(Math.cos(a)*r,-14+Math.random()*30,Math.sin(a)*r);c.scale.y=.5;A.add(c);}
    GF.ball=this.makeBall();A.add(GF.ball);GF.aim=new THREE.Group();const ar=new THREE.Mesh(new THREE.ConeGeometry(.28,.6,8),mStd(0xffffff,{emissive:0xffd23a,emissiveIntensity:.8}));ar.rotation.x=Math.PI/2;ar.position.z=.3;GF.aim.add(ar);
    GF.dots=[];for(let i=0;i<12;i++){const d=new THREE.Mesh(new THREE.SphereGeometry(.07,6,4),mStd(0xffffff,{emissive:0xffffff,emissiveIntensity:.8}));GF.aim.add(d);GF.dots.push(d);}GF.aimHead=ar;A.add(GF.aim);GF.aim.visible=false;
    GF.actor=miniActor(.9);A.add(GF.actor);this.load(0);},
  makeBall(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.IcosahedronGeometry(GF.R,1),mStd(0x8a5a32,{flatShading:true}));g.add(b);const sp=mStd(0x4a2a12,{flatShading:true});
    for(let i=0;i<22;i++){const c=new THREE.Mesh(new THREE.ConeGeometry(.05,.16,4),sp);const v=new THREE.Vector3().setFromSphericalCoords(1,Math.acos(1-2*(i+.5)/22),i*2.4);c.position.copy(v).multiplyScalar(GF.R);c.lookAt(v.clone().multiplyScalar(2));c.rotateX(Math.PI/2);g.add(c);}
    const nose=new THREE.Mesh(new THREE.SphereGeometry(.06,6,4),mStd(0x16243a));nose.position.set(0,0,GF.R);g.add(nose);g.userData.body=g;return g;},
  load(i){const H=GH[i];if(GF.hg){GF.A.remove(GF.hg);GF.hg.traverse(o=>{if(o.geometry)o.geometry.dispose();});}const g=new THREE.Group();GF.A.add(g);GF.hg=g;const T=GF.T;const map=GF.vr&&H.alt?H.alt:H.map;const rows=map.length,cols=Math.max(...map.map(r=>r.length));
    GF.grid=[];GF.bump=[];GF.boost=[];GF.mill=null;GF.gem=[];GF.sand={};const sandM=mStd(0xecd9a0,{roughness:1});const ox=-cols*T/2,oz=-rows*T/2;GF.ox=ox;GF.oz=oz;GF.rows=rows;GF.cols=cols;
    const green=mStd(0x5ac04a,{roughness:.9}),green2=mStd(0x4aae3e,{roughness:.9}),wall=mStd(0xf2e8d0,{roughness:.6}),wood=mStd(0x9a6a3a),stone=mStd(0x8a8a9a,{flatShading:true});
    for(let r=0;r<rows;r++){GF.grid[r]=[];for(let c=0;c<cols;c++){const ch=map[r][c]||" ";const open=".SC><^vOW~G".includes(ch);GF.grid[r][c]=open?1:ch==="B"?2:0;const x=ox+(c+.5)*T,z=oz+(r+.5)*T;
        if(open){const t=new THREE.Mesh(new THREE.BoxGeometry(T,.4,T),ch==="~"?sandM:(r+c)%2?green:green2);t.position.set(x,-.2,z);g.add(t);}
        if(ch==="~")GF.sand[r+","+c]=1;
        if(ch==="G"){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.24,0),mStd(0x5af0ff,{emissive:0x2ad8ff,emissiveIntensity:.9,roughness:.2,flatShading:true}));m.position.set(x,.45,z);g.add(m);GF.gem.push({x,z,m});}
        if(ch==="#"){const nb=[[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]].some(([a,b])=>".SC><^vOWB~G".includes((map[r+a]||"")[c+b]||" "));if(nb){const w=new THREE.Mesh(new THREE.BoxGeometry(T,.55,T),wall);w.position.set(x,.08,z);g.add(w);const cap=new THREE.Mesh(new THREE.BoxGeometry(T,.1,T),wood);cap.position.set(x,.4,z);g.add(cap);}}
        if(ch==="B"){const t=new THREE.Mesh(new THREE.BoxGeometry(T,.4,T),green);t.position.set(x,-.2,z);g.add(t);const b=new THREE.Mesh(new THREE.BoxGeometry(T*.9,.9,T*.9),stone);b.position.set(x,.45,z);b.rotation.y=(r*7+c)%3*.1;g.add(b);}
        if(ch==="S")GF.start={x,z};if(ch==="C")GF.cup={x,z};
        if(ch==="O"){GF.bump.push({x,z,r:.5});const b=new THREE.Mesh(new THREE.CylinderGeometry(.5,.55,.5,16),mStd(0xff5a7a,{roughness:.3,emissive:0xff2a5a,emissiveIntensity:.25}));b.position.set(x,.25,z);g.add(b);const rg=new THREE.Mesh(new THREE.TorusGeometry(.5,.08,6,16),mStd(0xffffff));rg.rotation.x=Math.PI/2;rg.position.set(x,.5,z);g.add(rg);GF.bump[GF.bump.length-1].m=b;}
        if("><^v".includes(ch)){const d={">":[1,0],"<":[-1,0],"^":[0,-1],"v":[0,1]}[ch];GF.boost.push({x,z,dx:d[0],dz:d[1]});const a=new THREE.Mesh(new THREE.ConeGeometry(.35,.6,3),mStd(0xffd23a,{emissive:0xffa000,emissiveIntensity:.6}));a.rotation.order="YXZ";a.rotation.set(-Math.PI/2,Math.atan2(-d[0],-d[1]),0);a.position.set(x,.03,z);a.scale.z=.3;g.add(a);GF.boost[GF.boost.length-1].m=a;}
        if(ch==="W"){const hub=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,1.2,10),mStd(0xc84a3a));hub.position.set(x,.6,z);g.add(hub);const bar=new THREE.Mesh(new THREE.BoxGeometry(T*3.2,.4,.3),mStd(0xffffff,{roughness:.5}));bar.position.set(x,.35,z);g.add(bar);GF.mill={x,z,m:bar,a:0,L:T*1.6};}}}
    const C=GF.cup;const cup=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,.05,20),mStd(0x16243a));cup.position.set(C.x,.01,C.z);g.add(cup);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.8,6),mStd(0xffffff));pole.position.set(C.x,.9,C.z);g.add(pole);
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(.7,.42),mStd(0xff4a5a,{side:THREE.DoubleSide,emissive:0xff2a2a,emissiveIntensity:.2}));fl.position.set(C.x+.36,1.55,C.z);g.add(fl);GF.flag=fl;
    const isl=new THREE.Mesh(new THREE.CylinderGeometry(Math.max(cols,rows)*T*.62,Math.max(cols,rows)*T*.2,6,10),mStd(0x8a7a6a,{flatShading:true}));isl.position.y=-3.45;g.add(isl);
    GF.b={x:GF.start.x,z:GF.start.z,vx:0,vz:0,moving:false,sunk:false};GF.strokes=0;GF.ang=Math.atan2(C.x-GF.start.x,C.z-GF.start.z);GF.pow=0;GF.charge=0;
    GF.actor.position.set(GF.start.x-.9,0,GF.start.z-.4);GF.actor.lookAt(MG.arena.position.x+GF.start.x,MG.arena.position.y,MG.arena.position.z+GF.start.z);GF.actor.rotation.x=0;GF.actor.rotation.z=0;
    GF.view=Math.max(cols,rows)*T;this.hud();const tip=GF.vr&&H.alt&&H.atip?H.atip:H.tip;if(tip)setTimeout(()=>miniMsg(tip,3600),400);else miniMsg("Rupa "+(i+1)+" · Par "+H.par,1800);},
  hud(){const H=GH[GF.hole];miniHUD('<span class="tm">Rupa '+(GF.hole+1)+'/'+GH.length+'</span>','<span class="sc">⛳ '+GF.strokes+' · Ukupno '+(GF.total+GF.strokes)+'</span>');},
  solid(x,z){const c=Math.floor((x-GF.ox)/GF.T),r=Math.floor((z-GF.oz)/GF.T);if(r<0||c<0||r>=GF.rows||c>=GF.cols)return true;return GF.grid[r][c]!==1;},
  shoot(){const b=GF.b;if(b.moving||b.sunk||GF.pow<.05)return;const sp=2+GF.pow*13;b.vx=Math.sin(GF.ang)*sp;b.vz=Math.cos(GF.ang)*sp;b.moving=true;GF.strokes++;GF.pow=0;GF.aim.visible=false;this.hud();
    tone(220,.08,"square",.04);tone(140,.12,"triangle",.05,.02);GF.actor.userData.cheer=.5;},
  onDown(p){if(GF.b.moving||GF.b.sunk)return;GF.drag={x:p.x,y:p.y};},
  onMove(p){if(!GF.drag)return;const dx=p.x-GF.drag.x,dy=p.y-GF.drag.y;const L=Math.hypot(dx,dy);if(L<8)return;const A=MG.arena.position;let fx=A.x+GF.b.x-camera.position.x,fz=A.z+GF.b.z-camera.position.z;const fl=Math.hypot(fx,fz)||1;fx/=fl;fz/=fl;
    const rx=-fz,rz=fx;const sx=-rx*dx+fx*dy,sz=-rz*dx+fz*dy;GF.ang=Math.atan2(sx,sz);GF.pow=Math.min(1,L/Math.min(innerWidth,innerHeight)*2.4);},
  onUp(){if(!GF.drag)return;GF.drag=null;this.shoot();},
  key(k,d){if(k===" "){if(d){GF.charge=1;GF.pow=0;GF.cdir=1;}else if(GF.charge){GF.charge=0;this.shoot();}}},
  tick(dt,t,M){const b=GF.b,A=M.arena.position;const kk=M.keys;if(!b.moving&&!b.sunk){if(kk.arrowleft||kk.a)GF.ang+=dt*1.8;if(kk.arrowright||kk.d)GF.ang-=dt*1.8;if(GF.charge){GF.pow+=GF.cdir*dt*.9;if(GF.pow>1){GF.pow=1;GF.cdir=-1;}if(GF.pow<0){GF.pow=0;GF.cdir=1;}}}
    if(GF.mill){GF.mill.a+=dt*1.6;GF.mill.m.rotation.y=GF.mill.a;}
    if(b.moving){const steps=Math.ceil(Math.hypot(b.vx,b.vz)*dt/.08)+1;for(let s=0;s<steps;s++){const h=dt/steps;let nx=b.x+b.vx*h,nz=b.z+b.vz*h;const R=GF.R;
        if(this.solid(nx+Math.sign(b.vx)*R,b.z)||this.solid(nx+Math.sign(b.vx)*R,b.z+R*.7)||this.solid(nx+Math.sign(b.vx)*R,b.z-R*.7)){b.vx*=-.72;nx=b.x;if(Math.abs(b.vx)>1.2)tone(300,.05,"square",.02);}
        if(this.solid(nx,nz+Math.sign(b.vz)*R)||this.solid(nx+R*.7,nz+Math.sign(b.vz)*R)||this.solid(nx-R*.7,nz+Math.sign(b.vz)*R)){b.vz*=-.72;nz=b.z;if(Math.abs(b.vz)>1.2)tone(300,.05,"square",.02);}
        b.x=nx;b.z=nz;
        for(const o of GF.bump){const dx=b.x-o.x,dz=b.z-o.z,d=Math.hypot(dx,dz);if(d<o.r+R){const nx2=dx/d,nz2=dz/d;b.x=o.x+nx2*(o.r+R+.01);b.z=o.z+nz2*(o.r+R+.01);const dot=b.vx*nx2+b.vz*nz2;if(dot<0){b.vx-=2*dot*nx2;b.vz-=2*dot*nz2;b.vx*=1.15;b.vz*=1.15;}o.hit=.3;tone(880,.08,"triangle",.04);}}
        if(GF.mill){const m=GF.mill;const ca=Math.cos(m.a),sa=Math.sin(m.a);const lx=b.x-m.x,lz=b.z-m.z;const along=lx*ca-lz*sa,perp=lx*sa+lz*ca;if(Math.abs(along)<m.L&&Math.abs(perp)<.15+R){const sgn=Math.sign(perp)||1;b.vx+=sa*sgn*6*h*20;b.vz+=ca*sgn*6*h*20;const np=sgn*(.16+R);b.x=m.x+along*ca+np*sa;b.z=m.z-along*sa+np*ca;}}
        for(const o of GF.boost)if(Math.abs(b.x-o.x)<GF.T/2&&Math.abs(b.z-o.z)<GF.T/2){b.vx+=o.dx*h*26;b.vz+=o.dz*h*26;}
        for(const o of GF.gem)if(!o.got&&Math.hypot(b.x-o.x,b.z-o.z)<.55){o.got=1;o.m.visible=false;GF.gems++;tone(1320,.1,"triangle",.045);tone(1760,.14,"sine",.035,.06);burst(A.x+o.x,A.y+.5,A.z+o.z,18,[[.4,.95,1],[1,1,1]],2.2,2.4,.6);miniMsg("Dragulj! +3 zlatnika",1100);}}
      const sp=Math.hypot(b.vx,b.vz);const onS=GF.sand[Math.floor((b.z-GF.oz)/GF.T)+","+Math.floor((b.x-GF.ox)/GF.T)]?3.2:1;const f=Math.max(0,sp-(1.1*sp+.55)*onS*dt);if(sp>0){b.vx*=f/sp;b.vz*=f/sp;}
      const C=GF.cup,dc=Math.hypot(b.x-C.x,b.z-C.z);if(dc<.36&&sp<7.5){this.sink();}else if(dc<.5&&sp<2.5){b.vx+=(C.x-b.x)*dt*12;b.vz+=(C.z-b.z)*dt*12;}
      if(sp<.08&&!b.sunk){b.moving=false;b.vx=b.vz=0;if(GF.strokes>=8){miniMsg("Osam udaraca je dosta. Idemo dalje!",1800);GF.strokes=9;this.sink(true);}}
      GF.ball.rotation.x+=b.vz*dt/GF.R;GF.ball.rotation.z-=b.vx*dt/GF.R;}
    for(const o of GF.bump)if(o.hit>0){o.hit-=dt;o.m.scale.setScalar(1+o.hit);}
    GF.ball.position.set(b.x,b.sunk?-.3:GF.R,b.z);GF.flag.rotation.y=Math.sin(t*3)*.3;
    GF.aim.visible=!b.moving&&!b.sunk&&!M.over;if(GF.aim.visible){GF.aim.position.set(0,.15,0);GF.aim.rotation.y=0;GF.aimHead.material.emissive.setHSL(.15-GF.pow*.15,1,.5);let x=b.x,z=b.z,dx=Math.sin(GF.ang),dz=Math.cos(GF.ang);const L=.8+GF.pow*5.4,n=GF.dots.length,st=L/n/4;
      for(let i=0;i<n;i++){for(let q=0;q<4;q++){let nx=x+dx*st,nz=z+dz*st;if(this.solid(nx+Math.sign(dx)*GF.R,z)){dx=-dx;nx=x;}if(this.solid(nx,nz+Math.sign(dz)*GF.R)){dz=-dz;nz=z;}x=nx;z=nz;}const d=GF.dots[i];d.position.set(x,0,z);d.visible=GF.pow>.03||i<4;}
      GF.aimHead.position.set(x+dx*.2,0,z+dz*.2);GF.aimHead.rotation.set(Math.PI/2,Math.atan2(dx,dz),0,"YXZ");}
    for(const o of GF.gem)if(!o.got){o.m.rotation.y+=dt*2.4;o.m.position.y=.45+Math.sin(t*3+o.x)*.08;}
    const a=GF.actor;a.userData.cheer=Math.max(0,(a.userData.cheer||0)-dt);a.position.y=a.userData.cheer>0?Math.abs(Math.sin(a.userData.cheer*12))*.4:0;miniAnimActor(a,t,a.userData.cheer>0);
    const cx=(b.x+GF.cup.x)/2,cz=(b.z+GF.cup.z)/2;const V=GF.view;camTo(cx,V*.75+4,cz+V*.62+3,cx,0,cz-.5,2.5,dt);},
  sink(skip){const b=GF.b;if(b.sunk)return;b.sunk=true;b.moving=false;const H=GH[GF.hole],A=MG.arena.position;const s=Math.min(GF.strokes,9);GF.total+=s;
    if(!skip){const d=s-H.par;const lab=s===1?"Rupa iz prvog udarca!":d<=-2?"Orao! Dva ispod para!":d===-1?"Ptičica! Jedan ispod para!":d===0?"Par! Odlično!":"Ubačeno!";miniMsg(lab,2200);
      [784,988,1175,1568].forEach((f,i)=>tone(f,.16,"triangle",.045,i*.07));burst(A.x+GF.cup.x,A.y+.4,A.z+GF.cup.z,40,[[1,.9,.4],[1,1,1],[.6,1,.6]],2.6,3,.8);if(s===1&&typeof fireworks==="function")fireworks();}
    GF.actor.userData.cheer=1.6;this.hud();
    setTimeout(()=>{if(MG.over||MG.cur!==MINI.golf)return;GF.hole++;if(GF.hole>=GH.length){const par=GH.reduce((a,h)=>a+h.par,0);miniFinish({score:GF.total,label:GF.total+" udaraca (par "+par+")"+(GF.gems?" · "+GF.gems+" dragulja":""),title:"Svih šest rupa!",bonus:Math.max(0,par+4-GF.total)*3+GF.gems*3});}else this.load(GF.hole);},1800);},
  idle(dt,t){const a=GF.actor;if(a)miniAnimActor(a,t,false);},
  quit(){miniClose();exitGame();goHome();}});
