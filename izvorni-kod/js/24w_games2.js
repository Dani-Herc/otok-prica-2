/* ===== v25 minigames, part 2: Plesna zabava (rhythm), Slovna oluja (spelling), Valovi (surfing) ===== */
let MINIMUTE=false;
function miniAC(){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==="suspended")actx.resume();}catch(e){}return actx;}
let NOISEB=null;function noiseBuf(){if(NOISEB)return NOISEB;const C=actx,b=C.createBuffer(1,Math.floor(C.sampleRate*.5),C.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return NOISEB=b;}
const mFreq=m=>440*Math.pow(2,(m-69)/12);
const linC=h=>new THREE.Color(h).convertSRGBToLinear();

/* ---------- 3. PLESNA ZABAVA: four lanes, a song made right here, the dancer copies every hit ---------- */
const PL={};const PLB=60/112,PLTRV=1.55;
const PLA=[[0,76,1],[1,79,1],[2,76,.5],[2.5,74,.5],[3,72,1],[4,74,1],[5,79,1],[6,74,.5],[6.5,72,.5],[7,71,1],[8,72,1],[9,76,1],[10,81,1],[11,79,1],[12,77,1],[13,76,.5],[13.5,74,.5],[14,72,2]];
const PLBm=[[0,79,.5],[.5,79,.5],[1,81,1],[2,79,.5],[2.5,76,.5],[3,72,1],[4,74,.5],[4.5,76,.5],[5,79,1],[6,83,1],[7,79,1],[8,81,.5],[8.5,79,.5],[9,76,1],[10,72,.5],[10.5,76,.5],[11,81,1],[12,77,1],[13,79,1],[14,84,2]];
const PLCH=[[48,52,55],[43,47,50],[45,48,52],[41,45,48]];
const PLSONGS=[{n:"Disko pod zvijezdama",A:PLA,B:PLBm,ch:PLCH},
 {n:"Skakutava polka",ch:[[48,52,55],[45,48,52],[41,45,48],[43,47,50]],A:[[0,72,.5],[.5,76,.5],[1,79,1],[2,76,1],[3,72,1],[4,69,.5],[4.5,72,.5],[5,76,1],[6,72,1],[7,69,1],[8,65,.5],[8.5,69,.5],[9,72,1],[10,77,1],[11,72,1],[12,74,1],[13,79,1],[14,83,.5],[14.5,79,.5],[15,74,1]],
  B:[[0,84,1],[1,79,1],[2,76,.5],[2.5,79,.5],[3,84,1],[4,81,1],[5,76,1],[6,72,.5],[6.5,76,.5],[7,81,1],[8,77,1],[9,81,1],[10,84,.5],[10.5,81,.5],[11,77,1],[12,79,.5],[12.5,83,.5],[13,86,1],[14,84,2]]},
 {n:"Ples na mjesečini",ch:[[45,48,52],[41,45,48],[48,52,55],[43,47,50]],A:[[0,69,1],[1,72,1],[2,76,1],[3,72,.5],[3.5,69,.5],[4,65,1],[5,69,1],[6,72,1],[7,77,1],[8,76,1],[9,72,.5],[9.5,76,.5],[10,79,1],[11,76,1],[12,74,1],[13,71,1],[14,74,.5],[14.5,79,.5],[15,83,1]],
  B:[[0,81,.5],[.5,84,.5],[1,81,1],[2,76,1],[3,72,1],[4,77,.5],[4.5,81,.5],[5,77,1],[6,72,1],[7,69,1],[8,79,1],[9,76,.5],[9.5,79,.5],[10,84,1],[11,79,1],[12,83,1],[13,79,1],[14,81,2]]}];
const PLCOL=["#ff5ab4","#3ad8ff","#ffd23a","#6af07a"],PLARR=["◀","▼","▲","▶"];
function plSong(si){const SG=PLSONGS[si||0],PLA=SG.A,PLBm=SG.B,PLCH=SG.ch;const ev=[],notes=[];const phr=[PLA,PLA,PLBm,PLA,PLBm],intro=8,end=intro+phr.length*16;
  for(let b=0;b<end+4;b++){const ch=PLCH[Math.floor(b/4)%4];ev.push({b,k:"kick"});if(b>=end)continue;if(b%2===1)ev.push({b,k:"snare"});ev.push({b:b+.5,k:"hat"});
    ev.push({b,k:"bass",f:ch[0]-12});ev.push({b:b+.5,k:"bass",f:b%2?ch[0]:ch[0]-12});if(b>=4)ev.push({b:b+.5,k:"stab",ch});}
  ev.push({b:end,k:"pad",ch:PLCH[0]});ev.push({b:end,k:"lead",f:84,l:3});
  phr.forEach((P,p)=>{for(const [o,m,l] of P){const b=intro+p*16+o;const inc=p===0?o%2===0:p===1?o%1===0:true;const lane=Math.floor(((m-60)%12)/3);
    if(inc){notes.push({t:b*PLB,lane,f:m});if(p>=3&&o%4===0)notes.push({t:b*PLB,lane:(lane+2)%4,f:m+12,dbl:1});}else ev.push({b,k:"lead",f:m,l});}});
  ev.sort((a,b)=>a.b-b.b);notes.sort((a,b)=>a.t-b.t||a.lane-b.lane);notes.forEach((n,i)=>{n.i=i;if(notes.some(q=>q!==n&&q.t===n.t))n.dbl=1;if(i%8===7&&!n.dbl)n.gold=1;});return {ev,notes,end:end*PLB};}
function plPlay(e,t){const C=actx,o=PL.out;if(!C||!o)return;try{
  if(e.k==="kick"){const s=C.createOscillator(),g=C.createGain();s.type="sine";s.frequency.setValueAtTime(150,t);s.frequency.exponentialRampToValueAtTime(42,t+.13);g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);s.connect(g);g.connect(o);s.start(t);s.stop(t+.25);}
  else if(e.k==="snare"||e.k==="hat"){const s=C.createBufferSource();s.buffer=noiseBuf();const f=C.createBiquadFilter(),g=C.createGain();const sn=e.k==="snare";f.type=sn?"bandpass":"highpass";f.frequency.value=sn?1800:7500;g.gain.setValueAtTime(sn?.24:.06,t);g.gain.exponentialRampToValueAtTime(.001,t+(sn?.15:.05));s.connect(f);f.connect(g);g.connect(o);s.start(t,Math.random()*.3);s.stop(t+.2);
    if(sn){const q=C.createOscillator(),qg=C.createGain();q.type="triangle";q.frequency.setValueAtTime(200,t);q.frequency.exponentialRampToValueAtTime(120,t+.08);qg.gain.setValueAtTime(.09,t);qg.gain.exponentialRampToValueAtTime(.001,t+.1);q.connect(qg);qg.connect(o);q.start(t);q.stop(t+.12);}}
  else if(e.k==="bass"){const s=C.createOscillator(),f=C.createBiquadFilter(),g=C.createGain();s.type="sawtooth";s.frequency.value=mFreq(e.f);f.type="lowpass";f.frequency.setValueAtTime(900,t);f.frequency.exponentialRampToValueAtTime(220,t+.2);g.gain.setValueAtTime(.13,t);g.gain.exponentialRampToValueAtTime(.001,t+.24);s.connect(f);f.connect(g);g.connect(o);s.start(t);s.stop(t+.26);}
  else if(e.k==="stab"||e.k==="pad"){const d=e.k==="pad"?2.4:.12;for(const m of e.ch){const s=C.createOscillator(),f=C.createBiquadFilter(),g=C.createGain();s.type="square";s.frequency.value=mFreq(m+12);f.type="lowpass";f.frequency.value=e.k==="pad"?1400:2400;g.gain.setValueAtTime(e.k==="pad"?.03:.022,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(o);s.start(t);s.stop(t+d+.02);}}
  else if(e.k==="lead"||e.k==="hit"){const d=e.k==="hit"?.42:Math.min(1.2,e.l*PLB*.9);for(const [mul,v,ty] of [[1,e.k==="hit"?.075:.05,"triangle"],[2,e.k==="hit"?.04:.012,"sine"],[3,e.k==="hit"?.02:0,"sine"]]){if(!v)continue;const s=C.createOscillator(),g=C.createGain();s.type=ty;s.frequency.value=mFreq(e.f)*mul;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(g);g.connect(o);s.start(t);s.stop(t+d+.02);}}
  }catch(err){}}
miniReg("ples",{n:"Plesna zabava",d:"Disko pod zvijezdama! Pritisni strelicu točno kad stigne do kruga. Tri pjesme se izmjenjuju, a zlatne note donose zlatnike.",col:["#ff9ae0","#7a3ad8"],reward:"disko",
  medals:[55,75,90],fmt:v=>v==null?"-":v+"%",mlab(m){return this.medals[m]+"% točnosti";},touch:0,fog:.0012,
  icon(x){x.fillStyle="#d8d8e8";x.beginPath();x.arc(48,34,16,0,7);x.fill();x.strokeStyle="#16243a";x.lineWidth=2;for(let i=-2;i<=2;i++){x.beginPath();x.moveTo(32,34+i*6);x.lineTo(64,34+i*6);x.stroke();x.beginPath();x.moveTo(48+i*6,18);x.lineTo(48+i*6,50);x.stroke();}
    PLCOL.forEach((c,i)=>{x.fillStyle=c;x.beginPath();x.arc(18+i*20,76,8,0,7);x.fill();x.stroke();});x.fillStyle="#fff";x.font="bold 16px sans-serif";x.fillText("♪",70,22);x.fillText("♫",14,26);},
  ui(){return '<div class="plHw" id="plHw"><div class="plProg"><i id="plProg"></i></div>'+PLCOL.map((c,i)=>'<div class="plLane" data-l="'+i+'" style="--c:'+c+'"><div class="plRec">'+PLARR[i]+'</div></div>').join("")+'<div class="plCombo" id="plCombo"></div><div class="plJ" id="plJ"></div></div>';},
  start(M,A){Object.assign(PL,{A,st:-1.4,t0a:null,ei:0,nl:[],pts:0,judged:0,combo:0,maxC:0,cnt:[0,0,0,0],beat:-1,move:null,fever:0,done:0});PL.song=(miniRec("ples").plays||0)%PLSONGS.length;PL.gold=0;const S0=plSong(PL.song);setTimeout(()=>{if(MG.cur===MINI.ples&&!MG.over)miniMsg("♪ "+PLSONGS[PL.song].n,2600);},500);PL.ev=S0.ev;PL.notes=S0.notes;PL.end=S0.end;
    MINIMUTE=true;const C=miniAC();if(C){PL.out=C.createGain();PL.out.gain.value=.9;PL.out.connect(auOut());}
    A.children.forEach(o=>{if(o.isHemisphereLight)o.intensity=.32;if(o.isDirectionalLight)o.intensity=.35;});
    mSky(A,0x1a0c44,0x2a1250);PL.fogC=linC(0x2a1250);const vd=new THREE.Mesh(new THREE.CircleGeometry(900,32),new THREE.MeshBasicMaterial({color:linC(0x2a1250),fog:false,toneMapped:false}));vd.rotation.x=-Math.PI/2;vd.position.y=-26;A.add(vd);const sp=[];for(let i=0;i<260;i++){const v=new THREE.Vector3().setFromSphericalCoords(140,Math.acos(Math.random()*.9),Math.random()*6.283);sp.push(v.x,v.y,v.z);}
    const sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.Float32BufferAttribute(sp,3));const stars=new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:1.3,fog:false}));A.add(stars);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(9.5,6,3,12),mStd(0x2a1a4a,{flatShading:true}));base.position.y=-1.8;A.add(base);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(9.3,.18,6,48),mStd(0xffffff,{emissive:0xff5ab4,emissiveIntensity:1}));rim.rotation.x=Math.PI/2;rim.position.y=-.25;A.add(rim);PL.rim=rim;
    PL.tiles=[];for(let i=0;i<6;i++)for(let j=0;j<6;j++){const m=mBox(A,1.86,.3,1.86,0x1a1030,-5+j*2,-.15,-5+i*2,{emissive:0xffffff,emissiveIntensity:.3,roughness:.35});PL.tiles.push({m,i,j});}
    PL.cols=PLCOL.map(linC);PL.white=new THREE.Color(1,1,1);
    const bt=wowCanvas("plball",(x)=>{for(let i=0;i<16;i++)for(let j=0;j<16;j++){const v=150+Math.random()*105|0;x.fillStyle="rgb("+v+","+v+","+(v+10)+")";x.fillRect(i*8,j*8,7,7);}});bt.keep=1;
    const ball=new THREE.Mesh(new THREE.SphereGeometry(1.1,18,12),mStd(0xffffff,{map:bt,emissiveMap:bt,emissive:0xffffff,emissiveIntensity:.7,flatShading:true,roughness:.25,metalness:.3}));ball.position.set(0,8.2,0);A.add(ball);PL.ball=ball;
    const str=mBox(A,.05,3,.05,0xcccccc,0,10.7,0);PL.beams=new THREE.Group();PL.beams.position.copy(ball.position);A.add(PL.beams);
    for(let i=0;i<6;i++){const g=new THREE.ConeGeometry(1.5,10,14,1,true);g.translate(0,-5,0);const b=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:linC(PLCOL[i%4]),transparent:true,opacity:.11,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));
      b.rotation.set(.55,i/6*6.283,0,"YXZ");PL.beams.add(b);}
    PL.spk=[];for(const sx of [-7.6,7.6]){mBox(A,1.7,2.8,1.3,0x16122a,sx,1.4,-1.5,{roughness:.6});for(const [yy,r] of [[2.1,.42],[.9,.55]]){const w=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.2,18),mStd(0x3a3450,{emissive:0x7a3aff,emissiveIntensity:.4}));w.rotation.x=Math.PI/2;w.position.set(sx,yy,-.82);A.add(w);PL.spk.push(w);}}
    PL.crew=[];const ks=Object.keys(MCHAR).filter(k=>k!==(S.mg&&S.mg.char)&&MODELS[k]).slice(0,4);ks.forEach((k,i)=>{const g=MODELS[k]();g.scale.setScalar(MCHAR[k].sc*.75);const x=[-5,-2,2,5][i];g.position.set(x,0,-4.2);A.add(g);PL.crew.push({g,x,ph:i*.7});});
    PL.actor=miniActor(1.15);A.add(PL.actor);
    const hw=$("plHw");hw.querySelectorAll(".plLane").forEach(el=>{const l=+el.dataset.l;el.addEventListener("pointerdown",e=>{e.preventDefault();this.press(l);});const up=()=>this.release(l);el.addEventListener("pointerup",up);el.addEventListener("pointerleave",up);el.addEventListener("pointercancel",up);});
    PL.lanes=[...hw.querySelectorAll(".plLane")];PL.H=PL.lanes[0].clientHeight||300;PL.recY=PL.H-10-29;
    miniHUD('<span class="tm">Plesna zabava</span>','<span class="sc">🎯 100%</span>');this.judge("Spremi se...",0);},
  env(){sun.intensity=.45;hemi.intensity=.3;scene.fog.color.copy(PL.fogC);renderer.toneMappingExposure=1;},
  now(){const C=actx;if(C&&C.state==="running"&&PL.t0a!=null)return C.currentTime-PL.t0a;return PL.st;},
  laneKey:{arrowleft:0,d:0,a:0,arrowdown:1,f:1,s:1,arrowup:2,j:2,w:2,arrowright:3,k:3,l:3},
  key(k,d){const l=this.laneKey[k];if(l==null)return;if(d)this.press(l);else this.release(l);},
  press(l){if(MG.over||!PL.lanes)return;const el=PL.lanes[l];el.classList.add("on");const s=this.now();let best=null,bd=.21;
    for(const n of PL.notes){if(n.j||n.lane!==l)continue;const d=Math.abs(n.t-s);if(d<bd){bd=d;best=n;}if(n.t-s>.3)break;}
    if(!best)return;const g=bd<.075?0:bd<.14?1:2;best.j=1;PL.pts+=[1,.7,.4][g];PL.judged++;PL.cnt[g]++;PL.combo++;PL.maxC=Math.max(PL.maxC,PL.combo);
    if(best.gold){PL.gold++;sfx.chime();miniMsg("Zlatna nota! +2 zlatnika",900);}if(best.el){best.el.remove();best.el=null;}el.classList.remove("hit");void el.offsetWidth;el.classList.add("hit");
    if(actx&&!muted)plPlay({k:"hit",f:best.f},actx.currentTime);
    this.judge(["Savršeno!","Dobro!","Blizu!"][g],g);PL.move={l,t:0};PL.flash=PL.flash||[0,0,0,0];PL.flash[l]=1;
    const A=MG.arena.position;if(g===0)burst(A.x+PL.actor.position.x,A.y+1.4,A.z+PL.actor.position.z,10,[[1,1,1],[1,.6,.9],[.5,.9,1]],2,2,.5);
    if(PL.combo>0&&PL.combo%10===0){sfx.chime();miniMsg("Niz "+PL.combo+"!",1200);burst(A.x,A.y+3,A.z,40,[[1,.4,.8],[.3,.9,1],[1,.9,.3],[.4,1,.5]],4,4,.9);}
    if(PL.combo===20){PL.fever=1;miniMsg("Plesna groznica!",1600);}this.hud();},
  release(l){if(PL.lanes&&PL.lanes[l])PL.lanes[l].classList.remove("on");},
  miss(n){n.j=1;PL.judged++;PL.cnt[3]++;if(n.el){n.el.classList.add("gone");const e=n.el;setTimeout(()=>e.remove(),250);n.el=null;}if(PL.combo>=10)tone(180,.18,"sawtooth",.025);PL.combo=0;PL.fever=0;this.judge("Promašaj",3);this.hud();},
  judge(t,g){const el=$("plJ");if(!el)return;el.textContent=t;el.className="plJ j"+g;void el.offsetWidth;el.classList.add("pop");},
  acc(all){const tot=all?PL.notes.length:Math.max(1,PL.judged);return Math.round(PL.pts/tot*100);},
  hud(){const c=$("plCombo");if(c)c.textContent=PL.combo>=3?"Niz "+PL.combo+(PL.fever?" 🔥":""):"";miniHUD('<span class="tm">Plesna zabava</span>','<span class="sc">🎯 '+(PL.judged?this.acc():100)+'%</span>');},
  tick(dt,t,M){const C=actx;PL.st+=dt;if(C&&C.state==="running"){if(PL.t0a==null)PL.t0a=C.currentTime-PL.st;PL.st=C.currentTime-PL.t0a;}const s=PL.st;
    const run=C&&C.state==="running"&&!muted&&PL.out;while(PL.ei<PL.ev.length&&PL.ev[PL.ei].b*PLB<s+.3){const e=PL.ev[PL.ei++];if(run){const at=PL.t0a+e.b*PLB;if(at>C.currentTime-.01)plPlay(e,at);}}
    const b=Math.floor(s/PLB);if(b!==PL.beat&&s>=0){PL.beat=b;PL.pulse=1;if(b>=4&&b<8)this.judge(["3","2","1","Pleši!"][b-4],0);}
    for(const n of PL.notes){const dtn=n.t-s;if(dtn>PLTRV+.1)break;if(n.j)continue;if(dtn<-.21){this.miss(n);continue;}
      if(!n.el){const el=document.createElement("div");el.className="plN"+(n.dbl?" dbl":"")+(n.gold?" gold":"");el.style.setProperty("--c",PLCOL[n.lane]);el.textContent=PLARR[n.lane];PL.lanes[n.lane].appendChild(el);n.el=el;}
      n.el.style.transform="translateY("+(PL.recY-dtn/PLTRV*PL.recY).toFixed(1)+"px)";}
    const pr=$("plProg");if(pr)pr.style.width=Math.max(0,Math.min(100,s/PL.end*100)).toFixed(1)+"%";
    if(s>PL.end+1.4&&!PL.done){PL.done=1;const a=this.acc(true);miniFinish({score:a,label:a+"% · najduži niz "+PL.maxC,title:a>=90?"Plesna zvijezda!":a>=75?"Super ples!":"Bravo, plesačice!",bonus:Math.round(PL.maxC/4)+PL.gold*2});}
    this.vis(dt,t,s);},
  vis(dt,t,s){const bp=s>=0?(s/PLB)%1:0;PL.pulse=Math.max(0,(PL.pulse||0)-dt*3.2);const fl=PL.flash||[0,0,0,0];for(let i=0;i<4;i++)fl[i]=Math.max(0,fl[i]-dt*4);PL.flash=fl;
    for(const T of PL.tiles){const k=PL.fever?(T.i+T.j+Math.floor(t*8))%4:(T.i+T.j+Math.max(0,PL.beat))%4;const ln=Math.min(3,Math.floor(T.j*4/6));const f=fl[ln];T.m.material.emissive.copy(PL.cols[k]).lerp(PL.white,f*.8);T.m.material.emissiveIntensity=.22+PL.pulse*.55+f*.8;}
    PL.ball.rotation.y+=dt*.8;PL.beams.rotation.y+=dt*(PL.fever?1.6:.6);PL.beams.children.forEach((b,i)=>{b.material.opacity=.07+PL.pulse*.08+(PL.fever?.05:0);});
    PL.rim.material.emissive.copy(PL.cols[Math.max(0,PL.beat)%4]);PL.rim.material.emissiveIntensity=.6+PL.pulse;PL.spk.forEach(w=>w.scale.set(1+PL.pulse*.25,1,1+PL.pulse*.25));
    for(const c of PL.crew){const hop=PL.fever?Math.abs(Math.sin((s/PLB)*Math.PI))*.7:Math.abs(Math.sin((s/PLB)*Math.PI))*.18;c.g.position.y=hop;c.g.rotation.y=Math.sin(s/PLB*Math.PI*.5+c.ph)*.5;}
    const a=PL.actor,m=PL.move;let x=0,y=Math.abs(Math.sin(bp*Math.PI))*.15,ry=Math.sin(s/PLB*Math.PI*.5)*.35,rz=0,sy=1;
    if(m){m.t+=dt*3.4;const k=Math.sin(Math.min(1,m.t)*Math.PI);if(m.l===0){x=-.9*k;rz=.35*k;}else if(m.l===1){sy=1-.22*k;y=0;}else if(m.l===2){y=1.1*k;ry+=Math.min(1,m.t)*6.283;}else{x=.9*k;rz=-.35*k;}if(m.t>=1)PL.move=null;}
    a.position.set(x,y,.6);a.rotation.set(0,ry,rz);a.scale.y=a.scale.x*sy;miniAnimActor(a,t,!!m);
    const port=innerWidth<innerHeight*1.05,wide=innerWidth>=900&&innerWidth>innerHeight*1.25;camTo(Math.sin(t*.25)*2+(wide?3:0),port?7:5.4,port?16:12.5,wide?3:0,port?-1.2:1.8,0,2.5,dt);},
  idle(dt,t){if(PL.tiles)this.vis(dt,t,PL.st+=dt);},
  stop(){MINIMUTE=false;if(PL.out){const o=PL.out;try{o.gain.setTargetAtTime(0,actx.currentTime,.05);}catch(e){}setTimeout(()=>{try{o.disconnect();}catch(e){}},400);PL.out=null;}PL.lanes=null;},
  quit(){if(!PL.done){PL.done=1;const a=this.acc(true);miniFinish({score:a,label:a+"% · najduži niz "+PL.maxC,title:"Plesna zabava"});}}});

/* ---------- 4. SLOVNA OLUJA: run around a meadow and pick letters in the right order ---------- */
const SLO={};
const SLW=[["ZEC","🐰"],["JEŽ","🦔"],["KIT","🐋"],["SOVA","🦉"],["ŽABA","🐸"],["RIBA","🐟"],["MORE","🌊"],["OTOK","🏝️"],["DUGA","🌈"],["KIŠA","🌧️"],["ŠUMA","🌲"],["KRUH","🍞"],["ZMAJ","🐉"],["VLAK","🚂"],["BROD","⛵"],
  ["MAČKA","🐱"],["PANDA","🐼"],["SUNCE","☀️"],["PČELA","🐝"],["OBLAK","☁️"],["PRIČA","📜"],["BALON","🎈"],["TORTA","🎂"],["LOPTA","⚽"],["LISICA","🦊"],["KNJIGA","📖"],["CVIJET","🌸"],["JABUKA","🍎"],["LEPTIR","🦋"],["DVORAC","🏰"],
  ["KOŠARA","🧺"],["GITARA","🎸"],["MJESEC","🌙"],["SLONIĆ","🐘"],["ŠKOLJKA","🐚"],["PINGVIN","🐧"],["ZVIJEZDA","⭐"],["DINOSAUR","🦕"],["ČAROLIJA","✨"],["KORNJAČA","🐢"]];
const slTok=w=>w.match(/DŽ|LJ|NJ|./g);
const SLABC="ABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ".split(""),SLSIM={C:"ČĆ",Č:"CĆ",Ć:"ČC",S:"Š",Š:"S",Z:"Ž",Ž:"Z",D:"ĐB",Đ:"D",N:"M",M:"N",B:"DP",P:"B",E:"F",O:"Q",I:"J",J:"I",L:"I",NJ:"N",LJ:"L",DŽ:"Ž"};
const SLPAL=["#ff7a9a","#ffb03a","#ffd83a","#7ad85a","#4ac8f0","#a87aff","#ff8a5a"];
function slTex(tk,ci){const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");x.fillStyle=SLPAL[ci%SLPAL.length];x.fillRect(0,0,128,128);x.fillStyle="#fff";x.beginPath();x.roundRect?x.roundRect(12,12,104,104,18):x.rect(12,12,104,104);x.fill();
  x.lineWidth=6;x.strokeStyle="#16243a";x.stroke();x.fillStyle="#16243a";x.font="900 "+(tk.length>1?58:78)+"px Arial Black, Arial, sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText(tk,64,70);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;}
function slSay(w){try{const ss=window.speechSynthesis;if(!ss||muted)return;const v=ss.getVoices().find(v=>/^hr/i.test(v.lang));if(!v)return;const u=new SpeechSynthesisUtterance(w.toLowerCase());u.voice=v;u.lang=v.lang;u.rate=.85;ss.cancel();ss.speak(u);}catch(e){}}
miniReg("slova",{n:"Slovna oluja",d:"Slova su se razbježala po livadi! Trči i skupljaj ih pravim redom da složiš riječ. Riječ bez greške donosi dodatno vrijeme, a kocka +4 još sekundi. Pazi na kvačice: Č, Ć, Š, Ž!",col:["#c8f5a0","#3aa8c8"],reward:"zvjezdana",
  medals:[3,6,9],fmt:v=>v==null?"-":v===1?"1 riječ":v+" riječi",mlab(m){return this.medals[m]+" riječi";},touch:1,fog:.002,
  hint:"Trči do slova redom. Strelice ili WASD, a na mobitelu povuci prstom!",
  icon(x){[["A","#ff7a9a",14,46],["B","#ffd83a",40,30],["C","#4ac8f0",62,52]].forEach(([l,c,px,py],i)=>{x.save();x.translate(px+12,py+12);x.rotate((i-1)*.18);x.fillStyle=c;x.fillRect(-14,-14,28,28);x.strokeStyle="#16243a";x.lineWidth=3;x.strokeRect(-14,-14,28,28);x.fillStyle="#16243a";x.font="900 20px Arial";x.textAlign="center";x.textBaseline="middle";x.fillText(l,0,1);x.restore();});
    x.strokeStyle="#fff";x.lineWidth=3;x.beginPath();x.arc(30,22,8,3.5,6);x.stroke();x.beginPath();x.arc(74,30,6,3.5,6);x.stroke();},
  ui(){return '<div class="slWord" id="slWord"></div><div class="slJoy" id="slJoy" hidden><i></i></div>';},
  start(M,A){Object.assign(SLO,{A,time:75,done:0,lets:0,used:{},cubes:[],fly:[],word:null,toks:[],k:0,since:0,hintT:0,wait:0,tickS:0,joy:{x:0,y:0},jo:null,px:0,pz:3,named:0,cheer:0,err:0,clean:0});
    mSky(A,0x6ab8f0,0xe0f4ff);
    const top=new THREE.Mesh(new THREE.CylinderGeometry(12,12,.5,28),mStd(0x6ac84a,{flatShading:true,roughness:.95}));top.position.y=-.25;A.add(top);
    const dirt=new THREE.Mesh(new THREE.CylinderGeometry(12,4,7,14),mStd(0x9a7a5a,{flatShading:true}));dirt.position.y=-4;A.add(dirt);
    const rnd=(a,b)=>a+Math.random()*(b-a);
    for(let i=0;i<70;i++){const a=rnd(0,6.283),r=Math.sqrt(Math.random())*11;const tf=mBox(A,.12,.3,.12,0x4aa83a,Math.cos(a)*r,.12,Math.sin(a)*r);tf.rotation.y=a;}
    const fc=[0xff6a8a,0xffd23a,0xffffff,0xa87aff,0xff9a3a];for(let i=0;i<46;i++){const a=rnd(0,6.283),r=rnd(2,11.3);const st=mBox(A,.05,.35,.05,0x3a8a2a,Math.cos(a)*r,.17,Math.sin(a)*r);const fl=new THREE.Mesh(new THREE.SphereGeometry(.13,6,4),mStd(fc[i%5],{emissive:fc[i%5],emissiveIntensity:.15}));fl.position.set(Math.cos(a)*r,.38,Math.sin(a)*r);A.add(fl);}
    for(let i=0;i<9;i++){const a=i/9*6.283+rnd(-.2,.2),r=rnd(11.2,12.2);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.18,.24,1.4,6),mStd(0x8a5a32));tr.position.set(Math.cos(a)*r,.7,Math.sin(a)*r);A.add(tr);
      const cr=new THREE.Mesh(new THREE.IcosahedronGeometry(1.1,0),mStd(i%3?0x3a9a3a:0x5ab84a,{flatShading:true}));cr.position.set(Math.cos(a)*r,2,Math.sin(a)*r);A.add(cr);}
    for(let i=0;i<14;i++){const c=new THREE.Mesh(new THREE.SphereGeometry(rnd(2,4),8,6),mStd(0xffffff,{roughness:1,emissive:0xffffff,emissiveIntensity:.25}));const a=rnd(0,6.283),r=rnd(30,60);c.position.set(Math.cos(a)*r,rnd(-10,25),Math.sin(a)*r);c.scale.y=.55;A.add(c);}
    SLO.cg=new THREE.BoxGeometry(.95,.95,.95);SLO.actor=miniActor(1);SLO.actor.position.set(0,0,3);A.add(SLO.actor);this.hud();setTimeout(()=>{if(MG.cur===MINI.slova&&!MG.over)this.nextWord();},600);},
  pick(){const n=SLO.done;let maxL=n<2?4:n<4?5:n<6?6:9;const nm=(S.name||"").trim().toUpperCase();
    if(!SLO.named&&n===3&&/^[A-ZČĆŽŠĐ]{2,9}$/.test(nm)){SLO.named=1;return [nm,"⭐",1];}
    const pool=SLW.filter(w=>slTok(w[0]).length<=maxL&&!SLO.used[w[0]]&&(n<2||slTok(w[0]).length>=Math.min(maxL-1,5)||Math.random()<.3));const P=pool.length?pool:SLW.filter(w=>!SLO.used[w[0]]);const w=(P.length?P:SLW)[Math.floor(Math.random()*(P.length||SLW.length))];SLO.used[w[0]]=1;return w;},
  nextWord(){const w=this.pick();SLO.word=w;SLO.toks=slTok(w[0]);SLO.k=0;SLO.since=0;const A=SLO.A;
    const need=SLO.toks.slice();const dist=[];const nd=3+Math.min(4,SLO.done);for(let i=0;i<nd;i++){const base=need[Math.floor(Math.random()*need.length)];const sim=SLSIM[base];let l;if(sim&&Math.random()<.65){const opts=slTok(sim);l=opts[Math.floor(Math.random()*opts.length)];}else l=SLABC[Math.floor(Math.random()*SLABC.length)];if(!need.includes(l))dist.push(l);}
    const all=need.map(t=>({t,ok:1})).concat(dist.map(t=>({t,ok:0})));const pts=[];
    all.forEach((L,i)=>{let x,z,tries=0;do{const a=Math.random()*6.283,r=2+Math.sqrt(Math.random())*7.6;x=Math.cos(a)*r;z=Math.sin(a)*r;tries++;}while(tries<40&&(Math.hypot(x-SLO.px,z-SLO.pz)<2.6||pts.some(p=>Math.hypot(p.x-x,p.z-z)<1.9)));pts.push({x,z});
      const m=new THREE.Mesh(SLO.cg,mStd(0xffffff,{map:slTex(L.t,i),roughness:.5,emissive:0xffffff,emissiveIntensity:0}));m.material.emissiveMap=m.material.map;m.position.set(x,-1,z);A.add(m);
      SLO.cubes.push({m,t:L.t,x,z,ph:Math.random()*6,vx:0,vz:0,cool:0,born:0,drift:SLO.done>=4?.5+Math.random()*.6:0,da:Math.random()*6.283});
      const Ap=MG.arena.position;setTimeout(()=>{if(MG.cur===MINI.slova)burst(Ap.x+x,Ap.y+.6,Ap.z+z,10,[[1,1,1],[1,.95,.6]],1.6,2.2,.5);},i*40);});
    SLO.err=0;if(SLO.done>=1&&Math.random()<.55){let x,z,tries=0;do{const a=Math.random()*6.283,r=6+Math.random()*4;x=Math.cos(a)*r;z=Math.sin(a)*r;tries++;}while(tries<40&&(Math.hypot(x-SLO.px,z-SLO.pz)<4||pts.some(p=>Math.hypot(p.x-x,p.z-z)<1.9)));
      const m=new THREE.Mesh(SLO.cg,mStd(0xffffff,{map:slTex("+4",2),roughness:.4,emissive:0xffffff,emissiveIntensity:.35}));m.material.emissiveMap=m.material.map;m.scale.setScalar(.8);m.position.set(x,-1,z);A.add(m);SLO.cubes.push({m,t:"+4",bonus:1,x,z,ph:1,vx:0,vz:0,cool:0,born:0,drift:.9,da:Math.random()*6.283});}
    this.drawWord();miniMsg(w[2]?"Tvoje ime! "+w[1]:w[1]+" Složi riječ!",1500);tone(660,.1,"triangle",.04);tone(880,.12,"triangle",.04,.08);},
  drawWord(pop){const el=$("slWord");if(!el)return;el.innerHTML='<span class="slEm">'+SLO.word[1]+'</span>'+SLO.toks.map((t,i)=>'<span class="slS'+(i<SLO.k?" got":i===SLO.k?" next":"")+(pop&&i===SLO.k-1?" pop":"")+'">'+(i<SLO.k?t:"")+'</span>').join("");},
  onDown(p){SLO.jo=p;const j=$("slJoy");j.hidden=false;j.style.left=p.x+"px";j.style.top=p.y+"px";j.firstChild.style.transform="";},
  onMove(p){if(!SLO.jo)return;let dx=p.x-SLO.jo.x,dy=p.y-SLO.jo.y;const L=Math.hypot(dx,dy),R=56;if(L>R){dx*=R/L;dy*=R/L;}SLO.joy={x:dx/R,y:dy/R};$("slJoy").firstChild.style.transform="translate("+dx+"px,"+dy+"px)";},
  onUp(){SLO.jo=null;SLO.joy={x:0,y:0};$("slJoy").hidden=true;},
  hud(){miniHUD('<span class="tm">Slovna oluja</span>','<span class="sc'+(SLO.time<=10?" low":"")+'">⏱ '+Math.ceil(SLO.time)+' · 📝 '+SLO.done+'</span>');},
  grab(c){const Ap=MG.arena.position;if(!SLO.word||SLO.wait>0)return;const need=SLO.toks[SLO.k];
    if(c.bonus){SLO.cubes.splice(SLO.cubes.indexOf(c),1);SLO.fly.push({c,t:0,y0:c.m.position.y});SLO.time+=4;tone(988,.1,"triangle",.045);tone(1318,.14,"sine",.035,.07);burst(Ap.x+c.x,Ap.y+.8,Ap.z+c.z,18,[[.5,.9,1],[1,1,1]],2,2.4,.5);miniMsg("Sat! +4 s",1000);this.hud();return;}
    if(c.t===need){SLO.cubes.splice(SLO.cubes.indexOf(c),1);SLO.fly.push({c,t:0,y0:c.m.position.y});SLO.k++;SLO.lets++;SLO.since=0;const n=SLO.k;tone(523*Math.pow(1.0595,n*2),.14,"triangle",.05);tone(1046*Math.pow(1.0595,n*2),.1,"sine",.025,.04);
      burst(Ap.x+c.x,Ap.y+.8,Ap.z+c.z,14,[[1,1,1],[1,.95,.5]],2,2.4,.5);this.drawWord(1);
      if(SLO.k>=SLO.toks.length)this.wordDone();return;}
    if(c.cool>0)return;c.cool=.8;const dx=c.x-SLO.px,dz=c.z-SLO.pz,d=Math.hypot(dx,dz)||1;c.vx=dx/d*8;c.vz=dz/d*8;tone(240,.08,"triangle",.03);if(c.pen)return;c.pen=1;SLO.err++;SLO.time=Math.max(0,SLO.time-2);
    tone(150,.16,"square",.035);tone(110,.2,"sawtooth",.02,.05);const later=SLO.toks.indexOf(c.t,SLO.k)>SLO.k;miniMsg(later?"Ne još! Prvo traži "+need+" (−2 s)":"Ups, to je "+c.t+". Treba "+need+" (−2 s)",1500);
    const w=$("slWord");if(w){w.classList.remove("shake");void w.offsetWidth;w.classList.add("shake");}this.hud();},
  wordDone(){const Ap=MG.arena.position;const cl=SLO.err===0;if(cl){SLO.clean++;SLO.time+=2;}SLO.done++;SLO.time+=5;SLO.wait=1.1;SLO.cheer=1.2;const W=SLO.word;
    [784,988,1175,1568].forEach((f,i)=>tone(f,.18,"triangle",.05,i*.08));burst(Ap.x+SLO.px,Ap.y+1.5,Ap.z+SLO.pz,46,[[1,.5,.7],[1,.9,.3],[.5,.9,1],[.6,1,.5]],3.4,4,.9);if(SLO.done%3===0&&typeof fireworks==="function")fireworks();
    miniMsg(W[0]+" "+W[1]+(cl?" Bez greške! +7 s":" Bravo! +5 s"),1700);slSay(W[0]);
    for(const c of SLO.cubes){burst(Ap.x+c.x,Ap.y+.6,Ap.z+c.z,8,[[1,1,1]],1.5,1.5,.4);SLO.A.remove(c.m);c.m.material.map.dispose();c.m.material.dispose();}SLO.cubes=[];
    if(SLO.done===MINI.slova.medals[0]||SLO.done===MINI.slova.medals[1]||SLO.done===MINI.slova.medals[2]){setTimeout(()=>{sfx.chime();miniMsg(MEDALN[MINI.slova.medals.indexOf(SLO.done)+1]+" medalja!",1500);},1200);}
    this.hud();setTimeout(()=>{if(MG.cur===MINI.slova&&!MG.over)this.nextWord();},1100);},
  tick(dt,t,M){const kk=M.keys;SLO.time-=SLO.wait>0?0:dt;SLO.wait=Math.max(0,SLO.wait-dt);SLO.since+=dt;
    if(SLO.time<=10&&Math.ceil(SLO.time)!==SLO.tickS){SLO.tickS=Math.ceil(SLO.time);if(SLO.time>0)tone(1200,.05,"square",.02);}
    if(SLO.time<=0){SLO.time=0;this.hud();miniFinish({score:SLO.done,label:SLO.done===1?"1 riječ":SLO.done+" riječi",title:"Vrijeme je isteklo!",bonus:Math.floor(SLO.lets/3)+SLO.clean*2});return;}
    if(Math.floor(SLO.time*4)!==SLO.ht){SLO.ht=Math.floor(SLO.time*4);this.hud();}
    let ix=(kk.arrowright||kk.d?1:0)-(kk.arrowleft||kk.a?1:0)+SLO.joy.x,iz=(kk.arrowdown||kk.s?1:0)-(kk.arrowup||kk.w?1:0)+SLO.joy.y;const L=Math.hypot(ix,iz);if(L>1){ix/=L;iz/=L;}
    const sp=6.4*(S.mg&&S.mg.char==="macka"?1.12:1);const a=SLO.actor;const mv=L>.08&&SLO.wait<=0;if(mv){SLO.px+=ix*sp*dt;SLO.pz+=iz*sp*dt;const r=Math.hypot(SLO.px,SLO.pz);if(r>10.8){SLO.px*=10.8/r;SLO.pz*=10.8/r;}
      const ty=Math.atan2(ix,iz);let d=ty-a.rotation.y;d=Math.atan2(Math.sin(d),Math.cos(d));a.rotation.y+=d*Math.min(1,dt*12);if(Math.random()<dt*8)burst(MG.arena.position.x+SLO.px,MG.arena.position.y+.1,MG.arena.position.z+SLO.pz,2,[[.6,.85,.4]],.6,.8,.35);}
    SLO.cheer=Math.max(0,SLO.cheer-dt);a.position.set(SLO.px,SLO.cheer>0?Math.abs(Math.sin(SLO.cheer*9))*.9:0,SLO.pz);if(SLO.cheer>0)a.rotation.y+=dt*9;miniAnimActor(a,t,mv);
    const need=SLO.word&&SLO.toks[SLO.k];const hint=SLO.since>7;
    for(const c of SLO.cubes){c.born=Math.min(1,c.born+dt*2.2);c.cool=Math.max(0,c.cool-dt);if(c.vx||c.vz){c.x+=c.vx*dt;c.z+=c.vz*dt;c.vx*=Math.pow(.04,dt);c.vz*=Math.pow(.04,dt);if(Math.hypot(c.vx,c.vz)<.1)c.vx=c.vz=0;}
      if(c.drift){c.da+=dt*(Math.random()-.5)*2;c.x+=Math.cos(c.da)*c.drift*dt;c.z+=Math.sin(c.da)*c.drift*dt;}const r=Math.hypot(c.x,c.z);if(r>10.2){c.x*=10.2/r;c.z*=10.2/r;c.vx*=-.5;c.vz*=-.5;c.da+=Math.PI;}
      const isN=c.t===need&&hint;c.m.position.set(c.x,(.75+Math.sin(t*2.2+c.ph)*.16+(isN?Math.abs(Math.sin(t*5))*.35:0))*c.born-(1-c.born),c.z);c.m.rotation.y+=dt*(isN?3:.7);c.m.rotation.x=Math.sin(t*1.3+c.ph)*.15;
      c.m.material.emissiveIntensity=isN?.25+Math.sin(t*8)*.2:c.cool>0?.5:0;if(c.cool>0)c.m.material.emissive.setRGB(1,.3,.3);else c.m.material.emissive.setRGB(1,1,1);
      if(isN&&(SLO.hintT-=dt)<0){SLO.hintT=.9;const Ap=MG.arena.position;mgRing(Ap.x+c.x,Ap.y+c.m.position.y,Ap.z+c.z,0xffe14a);}
      if(Math.hypot(c.x-SLO.px,c.z-SLO.pz)<1&&c.born>=1){this.grab(c);if(MG.over)return;}}
    for(let i=SLO.fly.length-1;i>=0;i--){const f=SLO.fly[i];f.t+=dt*2.2;const m=f.c.m;m.position.y=f.y0+f.t*4;m.scale.setScalar(Math.max(.01,1-f.t));m.rotation.y+=dt*10;if(f.t>=1){SLO.A.remove(m);m.material.map.dispose();m.material.dispose();SLO.fly.splice(i,1);}}
    if(innerWidth<innerHeight)camTo(SLO.px*.55,19,SLO.pz*.55+10,SLO.px*.75,0,SLO.pz*.75-2.2,3,dt);else camTo(SLO.px*.7,11.5,SLO.pz*.7+10.5,SLO.px*.85,0,SLO.pz*.85-.5,3,dt);},
  idle(dt,t){if(SLO.actor)miniAnimActor(SLO.actor,t,false);},
  stop(){try{window.speechSynthesis&&speechSynthesis.cancel();}catch(e){}},
  quit(){miniFinish({score:SLO.done,label:SLO.done===1?"1 riječ":SLO.done+" riječi",title:"Slovna oluja",bonus:Math.floor(SLO.lets/3)+SLO.clean*2});}});

/* ---------- 5. VALOVI: surf through the sunset, jump the ramps, dodge the rocks ---------- */
const VL={};
function vlWave(x,z){const o=VL.off||0;return Math.sin(x*.3+(z-o)*.22)*.28+Math.sin((z-o)*.11-x*.15)*.5;}
function vlStarGeo(){const s=new THREE.Shape();for(let i=0;i<10;i++){const r=i%2?.2:.46,a=i/10*6.283+Math.PI/2;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y);}s.closePath();const g=new THREE.ExtrudeGeometry(s,{depth:.14,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:1});g.center();return g;}
miniReg("valovi",{n:"Valovi",d:"Surfaj kroz zalazak sunca! Skupljaj zvjezdice, skači s rampi i radi salta. Magnet privlači zvjezdice, mjehur štiti od sudara, a srce vraća život.",col:["#ffd0a0","#2a8ad8"],reward:"holo",
  medals:[35,70,105],fmt:v=>v==null?"-":v+" zvjezdic"+(v%10===1&&v%100!==11?"a":v%10>=2&&v%10<=4&&(v%100<12||v%100>14)?"e":"a"),mlab(m){return this.medals[m]+" zvjezdica";},touch:1,fog:.0105,
  hint:"Lijevo-desno upravljaš, Razmak je skok. Na mobitelu povuci prstom, a kratki dodir je skok!",
  icon(x){x.fillStyle="#ffe08a";x.beginPath();x.arc(66,30,13,0,7);x.fill();x.fillStyle="#2a8ad8";x.beginPath();x.moveTo(0,62);for(let i=0;i<=96;i+=8)x.quadraticCurveTo(i+4,52+(i%16?8:-6),i+8,60);x.lineTo(96,96);x.lineTo(0,96);x.fill();
    x.save();x.translate(40,58);x.rotate(-.35);x.fillStyle="#ff5a8a";x.beginPath();x.ellipse(0,0,26,6,0,0,7);x.fill();x.strokeStyle="#16243a";x.lineWidth=2.5;x.stroke();x.fillStyle="#fff";x.fillRect(-20,-1,40,2);x.restore();
    x.fillStyle="#ffd23a";x.font="20px sans-serif";x.fillText("★",16,30);},
  start(M,A){Object.assign(VL,{A,off:0,time:60,stars:0,lives:3,inv:0,px:0,vx:0,tx:null,py:0,vy:0,air:0,trick:null,tricks:0,objs:[],ns:24,sp:15,shake:0,foam:0,done:0,dol:[],mag:0,shield:0,pw:0});
    VL.fogC=linC(0xffb89a);
    mSky(A,0x4a6ad8,0xffb89a);
    const sun=new THREE.Mesh(new THREE.CircleGeometry(16,32),new THREE.MeshBasicMaterial({color:linC(0xfff0b0),fog:false}));sun.position.set(10,14,-230);A.add(sun);
    const glow=new THREE.Mesh(new THREE.CircleGeometry(30,32),new THREE.MeshBasicMaterial({color:linC(0xffc070),transparent:true,opacity:.35,fog:false,depthWrite:false}));glow.position.set(10,14,-231);A.add(glow);
    ["#ff4a5a","#ff9a3a","#ffe04a","#5ad86a","#4ab0ff","#8a6aff"].forEach((c,i)=>{const r=new THREE.Mesh(new THREE.TorusGeometry(70-i*2.4,1.2,6,60,Math.PI),new THREE.MeshBasicMaterial({color:linC(c),transparent:true,opacity:.55,fog:false,depthWrite:false}));r.position.set(-40,-6,-260);A.add(r);});
    for(const [x,z,s] of [[-60,-170,22],[-35,-190,14],[55,-180,18],[80,-200,26]]){const m=new THREE.Mesh(new THREE.ConeGeometry(s,s*.8,7),new THREE.MeshBasicMaterial({color:linC(0x9a6aa8),fog:false}));m.position.set(x,s*.3-3,z);A.add(m);}
    const g=new THREE.PlaneGeometry(130,150,52,60);g.rotateX(-Math.PI/2);g.translate(0,0,-55);VL.wg=g;const wm=mStd(0x2a9ae0,{flatShading:true,roughness:.6,metalness:0,emissive:0x0a4a8a,emissiveIntensity:.35});
    VL.water=new THREE.Mesh(g,wm);A.add(VL.water);const far=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),wm);far.rotation.x=-Math.PI/2;far.position.set(0,-.7,-500);A.add(far);
    VL.starG=vlStarGeo();VL.starM=mStd(0xffd23a,{emissive:0xffb000,emissiveIntensity:.7,roughness:.3,metalness:.2});VL.bigM=mStd(0xff7ad8,{emissive:0xff4ab8,emissiveIntensity:.8,roughness:.3});
    VL.rockG=new THREE.DodecahedronGeometry(1,0);VL.rockM=mStd(0x6a6a7a,{flatShading:true});
    const rig=new THREE.Group();A.add(rig);VL.rig=rig;const bs=new THREE.Shape();bs.absellipse(0,0,.5,1.3,0,6.283);const bg=new THREE.ExtrudeGeometry(bs,{depth:.1,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:2});bg.rotateX(Math.PI/2);
    const bt=wowCanvas("vlboard",(x)=>{const c=["#ff5a8a","#ffd23a","#5ad8ff","#ffffff"];for(let i=0;i<128;i+=16){x.fillStyle=c[(i/16)%4];x.fillRect(0,i,128,16);}});bt.keep=1;bt.repeat.set(1,.8);
    const board=new THREE.Mesh(bg,mStd(0xffffff,{map:bt,roughness:.35}));board.position.y=.08;rig.add(board);VL.board=board;
    VL.bub=new THREE.Mesh(new THREE.SphereGeometry(1.25,16,12),new THREE.MeshBasicMaterial({color:linC(0x8ae8ff),transparent:true,opacity:.28,depthWrite:false,fog:false}));VL.bub.position.y=.8;VL.bub.visible=false;rig.add(VL.bub);
    VL.actor=miniActor(.95);VL.actor.rotation.y=Math.PI-.55;VL.actor.position.y=.16;rig.add(VL.actor);
    for(let i=0;i<2;i++){const d=new THREE.Group();const body=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),mStd(0x6a8ab8,{flatShading:true}));body.scale.set(.75,.75,2.2);d.add(body);const fin=new THREE.Mesh(new THREE.ConeGeometry(.25,.6,4),mStd(0x5a7aa8));fin.position.set(0,.5,-.1);fin.rotation.x=-.4;d.add(fin);
      const tail=new THREE.Mesh(new THREE.BoxGeometry(.9,.08,.3),mStd(0x5a7aa8));tail.position.z=1.1;d.add(tail);A.add(d);VL.dol.push({g:d,x:i?-11:11,ph:i*2.2,z:-14-i*6});}
    VL.gulls=[];for(let i=0;i<4;i++){const gg=new THREE.Group();const w1=mBox(gg,.9,.05,.25,0xffffff,-.4,0,0),w2=mBox(gg,.9,.05,.25,0xffffff,.4,0,0);A.add(gg);VL.gulls.push({g:gg,w1,w2,ph:i*1.6,r:12+i*4,y:8+i*1.5});}
    this.hud();this.updWater();},
  hud(){miniHUD('<span class="tm">Valovi</span>','<span class="sc">⭐ '+VL.stars+' · '+"❤️".repeat(VL.lives)+'<span class="lost">'+"🤍".repeat(3-VL.lives)+'</span> · ⏱ '+Math.ceil(VL.time)+(VL.mag>0?" · 🧲":"")+(VL.shield?" · 🫧":"")+'</span>');},
  updWater(){const p=VL.wg.attributes.position,a=p.array;for(let i=0;i<a.length;i+=3)a[i+1]=vlWave(a[i],a[i+2]);p.needsUpdate=true;},
  add(type,x,z,o){const A=VL.A;let m,r=.5,h=0,y=0;
    if(type==="star"||type==="big"){m=new THREE.Mesh(VL.starG,type==="big"?VL.bigM:VL.starM);if(type==="big")m.scale.setScalar(1.6);r=type==="big"?.8:.55;y=(o&&o.y)||.9;}
    else if(type==="rock"){const s=.8+Math.random()*.6;m=new THREE.Mesh(VL.rockG,VL.rockM);m.scale.set(s,s*.85,s);m.rotation.set(Math.random()*3,Math.random()*3,0);r=s*.85;h=s*.9;}
    else if(type==="buoy"){m=new THREE.Group();const c=new THREE.Mesh(new THREE.CylinderGeometry(.4,.5,1.1,10),mStd(0xff4a3a,{roughness:.5}));c.position.y=.3;m.add(c);const s=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.25,10),mStd(0xffffff));s.position.y=.45;m.add(s);
      const l=new THREE.Mesh(new THREE.SphereGeometry(.14,8,6),mStd(0xffff80,{emissive:0xffe040,emissiveIntensity:1}));l.position.y=1;m.add(l);r=.55;h=1;}
    else if(type==="magnet"||type==="shield"||type==="heart"){const c=type==="magnet"?0xff5a5a:type==="shield"?0x5ae8ff:0xff7ab8;m=new THREE.Group();const core=new THREE.Mesh(type==="heart"?new THREE.OctahedronGeometry(.42,0):type==="shield"?new THREE.SphereGeometry(.42,12,8):new THREE.TorusGeometry(.34,.14,8,14,Math.PI),mStd(c,{emissive:c,emissiveIntensity:.9,roughness:.3}));m.add(core);
      const halo=new THREE.Mesh(new THREE.TorusGeometry(.7,.06,6,20),mStd(0xffffff,{emissive:0xffffff,emissiveIntensity:1}));m.add(halo);r=.9;y=1;}
    else if(type==="ramp"){m=new THREE.Group();const rp=new THREE.Mesh(new THREE.BoxGeometry(2.8,.25,3.4),mStd(0xc88a4a,{roughness:.7}));rp.rotation.x=.32;rp.position.y=.45;m.add(rp);
      for(let i=0;i<3;i++){const ar=new THREE.Mesh(new THREE.ConeGeometry(.3,.5,3),mStd(0x5ad8ff,{emissive:0x3ab8ff,emissiveIntensity:.9}));ar.rotation.set(-Math.PI/2+.32,0,0);ar.position.set(0,.66+(1-i)*.32,(i-1)*1.0);m.add(ar);}r=1.4;}
    m.position.set(x,0,z);A.add(m);VL.objs.push({type,m,x,z,r,h,y,ph:Math.random()*6,hit:0});},
  pattern(){const z=-112,R=()=>(Math.random()*2-1)*4.6,diff=Math.min(1,(60-VL.time)/45),p=Math.random();
    if(++VL.pw>=4&&Math.random()<.45){VL.pw=0;const q=Math.random();this.add(VL.lives<3&&q<.3?"heart":q<.65?"magnet":"shield",R(),z-10,{y:1});}
    if(p<.18){const x=R();for(let i=0;i<5;i++)this.add("star",x,z-i*2.4);}
    else if(p<.32){const x=R()*.6;for(let i=0;i<7;i++)this.add("star",x+Math.sin(i*.9)*2.6,z-i*2.2);}
    else if(p<.32+.16*(.6+diff)){const gap=R()*.8;this.add("rock",gap-3.2,z);this.add("rock",gap+3.2,z);for(let i=0;i<3;i++)this.add("star",gap,z+2-i*2);if(diff>.5&&Math.random()<.5)this.add("rock",gap+(Math.random()<.5?-6:6),z-4);}
    else if(p<.66){const x=R()*.7;this.add("ramp",x,z);for(let i=0;i<7;i++){const d=4+i*2.8,tau=(d-1.8)/VL.sp,y=.9+Math.max(0,12.5*tau-11*tau*tau);if(y>1.3)this.add("star",x,z-d,{y});}}
    else if(p<.8){for(let i=0;i<3;i++){const x=(i%2?-1:1)*2.4;this.add("buoy",x,z-i*6);this.add("star",-x*.9,z-i*6);}}
    else if(p<.88){this.add("big",R(),z,{y:1});const x=R();this.add("rock",x,z-6);}
    else{const x=R();this.add("rock",x,z);this.add("star",x>0?x-2.6:x+2.6,z);this.add("star",x>0?x-2.6:x+2.6,z-2.4);}},
  jump(){if(!VL.air){VL.vy=8.6;VL.air=1;tone(330,.12,"triangle",.04);tone(500,.1,"sine",.025,.05);this.splash(12);}else if(!VL.trick){VL.trick={t:0,ax:Math.random()<.5?"x":"y",ramp:0};tone(700,.1,"triangle",.03);}},
  splash(n){const A=MG.arena.position;burst(A.x+VL.px,A.y+vlWave(VL.px,0)+.1,A.z+.6,n,[[1,1,1],[.7,.9,1]],2.4,2.6,.6);},
  key(k,d){if(d&&(k===" "||k==="arrowup"||k==="w"))this.jump();},
  onDown(p){VL.pd={x:p.x,y:p.y,t:performance.now(),px:VL.px,sw:0};},
  onMove(p){const d=VL.pd;if(!d)return;const dx=p.x-d.x,dy=p.y-d.y;if(Math.abs(dx)>10||Math.abs(dy)>10)d.moved=1;VL.tx=Math.max(-5.4,Math.min(5.4,d.px+dx/Math.min(innerWidth,700)*14));if(!d.sw&&dy<-45&&Math.abs(dy)>Math.abs(dx)){d.sw=1;this.jump();}},
  onUp(p){const d=VL.pd;VL.pd=null;VL.tx=null;if(d&&!d.moved&&!d.sw&&performance.now()-d.t<300)this.jump();},
  hurt(){if(VL.inv>0)return;if(VL.shield){VL.shield=0;VL.inv=1.2;VL.bub.visible=false;this.splash(30);tone(520,.2,"sine",.05);tone(260,.25,"triangle",.04,.05);miniMsg("Mjehur te spasio!",1300);this.hud();return;}VL.lives--;VL.inv=1.8;VL.shake=.5;VL.trick=null;tone(120,.3,"sawtooth",.05);tone(80,.35,"square",.03,.05);this.splash(26);this.hud();
    if(VL.lives<=0){miniMsg("Bljuc! Valovi su te prevrnuli.",1800);setTimeout(()=>this.end("Valovi su bili jaki!"),900);VL.done=1;}else miniMsg("Au! Još "+VL.lives+(VL.lives===1?" srce":" srca"),1300);},
  end(title){miniFinish({score:VL.stars,label:VL.stars+" zvjezdic"+(VL.stars%10===1&&VL.stars%100!==11?"a":VL.stars%10>=2&&VL.stars%10<=4&&(VL.stars%100<12||VL.stars%100>14)?"e":"a")+(VL.tricks?" · "+VL.tricks+" trikova":""),title,bonus:VL.lives*4+VL.tricks*2});},
  tick(dt,t,M){const kk=M.keys,A=M.arena.position;if(!VL.done){VL.time-=dt;if(VL.time<=0){VL.time=0;VL.done=1;this.hud();this.end("Super vožnja!");return;}}
    if(Math.ceil(VL.time)!==VL.ht){VL.ht=Math.ceil(VL.time);this.hud();}
    VL.sp=15+Math.min(10,(60-VL.time)*.17);const dz=VL.sp*dt;VL.off+=dz;
    const ax=(kk.arrowright||kk.d?1:0)-(kk.arrowleft||kk.a?1:0);if(ax){VL.vx+=(ax*10-VL.vx)*Math.min(1,dt*6);VL.px+=VL.vx*dt;}else if(VL.tx!=null){const nv=(VL.tx-VL.px)*10;VL.vx=Math.max(-14,Math.min(14,nv));VL.px+=VL.vx*dt;}else{VL.vx*=Math.pow(.02,dt);VL.px+=VL.vx*dt;}
    VL.px=Math.max(-5.6,Math.min(5.6,VL.px));
    if(VL.air){VL.vy-=22*dt;VL.py+=VL.vy*dt;if(VL.py<=0){VL.py=0;VL.air=0;VL.vy=0;this.splash(18);tone(200,.12,"triangle",.03);
        if(VL.trick){if(VL.trick.t>=1){const b=VL.trick.ramp?3:2;VL.stars+=b;VL.tricks++;miniMsg((VL.trick.ramp?"Super trik!":"Salto!")+" +"+b+" ⭐",1200);[660,880,1100].forEach((f,i)=>tone(f,.12,"triangle",.04,i*.06));this.hud();}else miniMsg("Ups, skoro!",900);VL.trick=null;}}}
    if(VL.trick){VL.trick.t+=dt*(VL.trick.ramp?1.5:1.9);}
    VL.inv=Math.max(0,VL.inv-dt);VL.shake=Math.max(0,VL.shake-dt);if(VL.mag>0){VL.mag-=dt;if(VL.mag<=0)this.hud();}if(VL.bub.visible)VL.bub.scale.setScalar(1+Math.sin(t*5)*.05);
    if(VL.off>=VL.ns&&!VL.done){this.pattern();VL.ns+=25+Math.random()*8-Math.min(7,(60-VL.time)*.12);}
    for(let i=VL.objs.length-1;i>=0;i--){const o=VL.objs[i];o.z+=dz;const wy=vlWave(o.x,o.z);
      if(o.type==="star"||o.type==="big"){if(VL.mag>0&&!o.hit&&o.z>-11&&o.z<1.5){o.x+=(VL.px-o.x)*Math.min(1,dt*7);o.y+=(VL.py+.9-o.y)*Math.min(1,dt*7);}o.m.position.set(o.x,wy+o.y+Math.sin(t*3+o.ph)*.12,o.z);o.m.rotation.y+=dt*3;}
      else if(o.type==="magnet"||o.type==="shield"||o.type==="heart"){o.m.position.set(o.x,wy+1+Math.sin(t*3+o.ph)*.15,o.z);o.m.rotation.y+=dt*2.5;}
      else if(o.type==="buoy"){o.m.position.set(o.x,wy-.2,o.z);o.m.rotation.z=Math.sin(t*2+o.ph)*.15;}
      else if(o.type==="rock"){o.m.position.set(o.x,wy-.25,o.z);}else o.m.position.set(o.x,wy-.15,o.z);
      if(!o.hit&&Math.abs(o.z)<o.r+.4&&Math.abs(o.x-VL.px)<o.r+.42){const py=VL.py;
        if(o.type==="star"||o.type==="big"){if(Math.abs(o.y-(py+.9))<1.25){o.hit=1;const v=o.type==="big"?5:1;VL.stars+=v;const n=VL.stars;tone(880+(n%8)*60,.09,"triangle",.04);if(v>1){miniMsg("Duga zvijezda! +5",1100);[880,1100,1320,1760].forEach((f,j)=>tone(f,.12,"sine",.04,j*.05));}
          burst(A.x+o.x,A.y+wy+o.y,A.z+o.z,v>1?30:8,v>1?[[1,.5,.9],[.5,.9,1],[1,1,.5]]:[[1,.9,.4],[1,1,1]],2,2,.45);this.hud();
          if(MINI.valovi.medals.includes(n)){sfx.chime();miniMsg(MEDALN[MINI.valovi.medals.indexOf(n)+1]+" medalja!",1400);}}}
        else if(o.type==="magnet"||o.type==="shield"||o.type==="heart"){if(py<2.4){o.hit=1;o.m.visible=false;[660,880,1320].forEach((f,j)=>tone(f,.12,"triangle",.045,j*.05));burst(A.x+o.x,A.y+wy+1,A.z+o.z,26,[[1,1,1],[.5,.9,1],[1,.6,.8]],2.4,2.4,.6);
          if(o.type==="magnet"){VL.mag=7;miniMsg("Magnet! Zvjezdice lete k tebi.",1400);}else if(o.type==="shield"){VL.shield=1;VL.bub.visible=true;miniMsg("Mjehur! Štiti od jednog sudara.",1400);}else{VL.lives=Math.min(3,VL.lives+1);miniMsg("Srce! +1 život",1200);}this.hud();}}
        else if(o.type==="ramp"){if(!VL.air){o.hit=1;VL.air=1;VL.vy=12.5;VL.trick={t:0,ax:Math.random()<.5?"x":"y",ramp:1};this.splash(16);[392,523,659].forEach((f,j)=>tone(f,.12,"triangle",.04,j*.05));}}
        else if(py<o.h*.8){o.hit=1;this.hurt();}}
      if(o.hit&&(o.type==="star"||o.type==="big")){o.m.visible=false;}
      if(o.z>10){VL.A.remove(o.m);if(o.type!=="star"&&o.type!=="big"&&o.type!=="rock")o.m.traverse(q=>{if(q.geometry)q.geometry.dispose();if(q.material)q.material.dispose();});VL.objs.splice(i,1);}}
    this.updWater();const wy=vlWave(VL.px,0),slope=vlWave(VL.px,-1)-wy;const rig=VL.rig;rig.position.set(VL.px,wy+VL.py+.05,0);
    rig.rotation.set(VL.air?-.15:slope*.5,0,-VL.vx*.045,"YXZ");if(VL.trick){const k=Math.min(1,VL.trick.t),e=k<1?k:1;if(VL.trick.ax==="y")rig.rotation.y=e*6.283;else rig.rotation.x=-e*6.283;}
    rig.visible=VL.inv>0?Math.floor(t*12)%2===0:true;miniAnimActor(VL.actor,t,false);VL.actor.position.y=.16+(VL.air?0:Math.sin(t*4)*.03);
    if(!VL.air&&(VL.foam-=dt)<0){VL.foam=.05;burst(A.x+VL.px+(Math.random()-.5)*.6,A.y+wy+.05,A.z+1.3,2,[[1,1,1],[.8,.95,1]],.8,1,.5);}
    for(const d of VL.dol){const ph=(t*.55+d.ph)%3;const k=ph<1.1?ph/1.1:-1;const y=k>=0?Math.sin(k*Math.PI)*2.6-.4:-2;d.g.position.set(d.x,vlWave(d.x,d.z)+y,d.z);d.g.rotation.x=k>=0?(k-.5)*2.2:0;if(k>=0&&k<.04||k>.96&&k<1)burst(A.x+d.x,A.y+.2,A.z+d.z,4,[[1,1,1]],1.4,1.6,.4);}
    for(const gl of VL.gulls){const a=t*.25+gl.ph;gl.g.position.set(Math.cos(a)*gl.r,gl.y,-30+Math.sin(a)*gl.r*.5);gl.g.rotation.y=-a;const f=Math.sin(t*6+gl.ph)*.4;gl.w1.rotation.z=f;gl.w2.rotation.z=-f;}
    const sh=VL.shake>0?(Math.random()-.5)*VL.shake*.8:0;camTo(VL.px*.55+sh,4.4+VL.py*.35,8.8,VL.px*.75,1.2+VL.py*.5,-9,6,dt);},
  idle(dt,t){if(VL.rig){VL.off+=dt*4;this.updWater();miniAnimActor(VL.actor,t,false);}},
  env(){scene.fog.color.copy(VL.fogC);sun.intensity=Math.min(sun.intensity,2);},
  quit(){if(!VL.done){VL.done=1;this.end("Valovi");}}});
