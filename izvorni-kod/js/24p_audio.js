/* =================== AUDIO 2: buses, settings, footsteps, ambience, rooms, music =================== */
const AUS={m:.5,a:.7,s:.8};try{Object.assign(AUS,JSON.parse(localStorage.getItem("otok-audio")||"{}"));}catch(e){}
function auSaveS(){try{localStorage.setItem("otok-audio",JSON.stringify(AUS));}catch(e){}}
const cl01=v=>v<0?0:v>1?1:v;
function auIR(C,dur,decay){const n=Math.floor(C.sampleRate*dur),b=C.createBuffer(2,n,C.sampleRate);
  for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);for(let i=0;i<n;i++){const k=i/n;d[i]=(Math.random()*2-1)*Math.pow(1-k,decay)*(i<C.sampleRate*.012?i/(C.sampleRate*.012):1);}}return b;}
function auNoiseBuf(C,brown){const n=C.sampleRate*4,b=C.createBuffer(1,n,C.sampleRate),d=b.getChannelData(0);let l=0;
  for(let i=0;i<n;i++){const w=Math.random()*2-1;if(brown){l=(l+.02*w)/1.02;d[i]=l*3.2;}else d[i]=w;}
  /* crossfade the loop seam */const F=2048;for(let i=0;i<F;i++){const a=i/F;d[i]=d[i]*a+d[n-F+i]*(1-a);}return b;}
function auBuild(){if(AU)return AU;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();}catch(e){return null;}
  try{const C=actx;
    const master=C.createGain(),muff=C.createBiquadFilter(),comp=C.createDynamicsCompressor();muff.type="lowpass";muff.frequency.value=18000;muff.Q.value=.4;
    comp.threshold.value=-16;comp.knee.value=14;comp.ratio.value=3;comp.attack.value=.008;comp.release.value=.3;
    master.connect(muff);muff.connect(comp);comp.connect(C.destination);
    const sfx=C.createGain(),mus=C.createGain(),amb=C.createGain();sfx.connect(master);mus.connect(master);amb.connect(master);mus.gain.value=0;
    /* room reverb: everything that happens in the world (steps, effects, nature) is sent into it */
    const verb=C.createConvolver();verb.buffer=auIR(C,2.6,2.8);const wet=C.createGain();wet.gain.value=.03;const send=C.createGain();
    sfx.connect(send);amb.connect(send);send.connect(verb);verb.connect(wet);wet.connect(master);
    /* music has its own soft echo, so it never changes with the room */
    const mIn=C.createGain(),dl=C.createDelay(1),fb=C.createGain(),dlp=C.createBiquadFilter();dl.delayTime.value=.39;fb.gain.value=.32;dlp.type="lowpass";dlp.frequency.value=2200;
    mIn.connect(mus);mIn.connect(dl);dl.connect(dlp);dlp.connect(fb);fb.connect(dl);dlp.connect(mus);
    AU={C,master,muff,sfx,mus,mIn,amb,wet,noise:auNoiseBuf(C,false),brown:auNoiseBuf(C,true),L:{},env:{sea:0,leaf:0,grass:0,inside:0,kind:"",falls:99,h:0},
      fallsN:-1,fallsW:"-",fl:[],scanT:0,bird:2,cri:1,drip:1,ev:3,swimT:0,bub:1,m:{next:C.currentTime+5,bar:0,beat:0,ph:null,deg:2,on:false}};
    auApplyVol();auAmbStart();
  }catch(e){AU=null;}
  return AU;}
function auApplyVol(){if(!AU)return;const t=AU.C.currentTime;AU.master.gain.setTargetAtTime(muted?0:1.4,t,.05);AU.sfx.gain.setTargetAtTime(AUS.s,t,.05);AU.amb.gain.setTargetAtTime(AUS.a,t,.1);}
function auKick(){if(muted)return;const a=auBuild();if(a&&a.C.state==="suspended"&&!document.hidden)a.C.resume().catch(()=>{});}
["pointerdown","keydown","touchstart"].forEach(e=>addEventListener(e,auKick,{passive:true,capture:true}));
document.addEventListener("visibilitychange",()=>{if(!AU)return;if(document.hidden)AU.C.suspend().catch(()=>{});else if(!muted)AU.C.resume().catch(()=>{});});
function bq(type,f,Q){const b=AU.C.createBiquadFilter();b.type=type;b.frequency.value=f;if(Q!=null)b.Q.value=Q;return b;}
function auLoop(buf,chain){const C=AU.C,s=C.createBufferSource();s.buffer=buf;s.loop=true;let n=s;for(const f of chain){n.connect(f);n=f;}const g=C.createGain();g.gain.value=0;n.connect(g);g.connect(AU.amb);s.start(0,Math.random()*3.5);return {s,g,f:chain};}
function auAmbStart(){const L=AU.L;
  L.sea=auLoop(AU.brown,[bq("lowpass",600,.6)]);L.surf=auLoop(AU.noise,[bq("bandpass",1700,.55),bq("lowpass",3200,.5)]);
  L.wind=auLoop(AU.noise,[bq("bandpass",600,1.6),bq("lowpass",1800,.5)]);L.leaf=auLoop(AU.noise,[bq("highpass",3200,.6),bq("lowpass",9000,.5)]);
  L.fall=auLoop(AU.noise,[bq("highpass",280,.5),bq("lowpass",2600,.4)]);L.rumble=auLoop(AU.brown,[bq("lowpass",200,.7)]);
  L.under=auLoop(AU.brown,[bq("lowpass",320,.8)]);L.room=auLoop(AU.brown,[bq("bandpass",140,.7)]);}
function auSet(p,v,tc){p.setTargetAtTime(v,AU.C.currentTime,tc||.4);}

/* one-shot helpers into a bus */
function nb(bus,type,f,Q,d,vol,delay,f2,pan){const C=AU.C,t0=C.currentTime+(delay||0);const s=C.createBufferSource();s.buffer=AU.noise;const b=C.createBiquadFilter();b.type=type;b.frequency.setValueAtTime(f,t0);
  if(f2)b.frequency.exponentialRampToValueAtTime(f2,t0+d);b.Q.value=Q||1;const g=C.createGain();g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(vol,t0+Math.min(.012,d*.25));g.gain.exponentialRampToValueAtTime(.0001,t0+d);
  s.connect(b);b.connect(g);auPan(g,pan,bus);s.start(t0,Math.random()*3.5,d+.06);}
function osc(bus,type,f,d,vol,delay,f2,pan,att){const C=AU.C,t0=C.currentTime+(delay||0);const o=C.createOscillator(),g=C.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d*.8);
  g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(vol,t0+(att||.008));g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);auPan(g,pan,bus);o.start(t0);o.stop(t0+d+.05);}
function auPan(n,pan,bus){if(pan&&AU.C.createStereoPanner){const p=AU.C.createStereoPanner();p.pan.value=pan;n.connect(p);p.connect(bus);}else n.connect(bus);}

/* ---------- footsteps by surface ---------- */
function surfKind(t){if(!t)return "trava";const k=TYPES[t].k;
  if(/^(trava|lisce|carlisce|jesen|tresnja|smreka|lisce_b|mahovina|sijeno|staza|zemlja|oranica|micelij|gljiva|bundeva|lubenica|kaktus)$/.test(k))return "trava";
  if(/^(pijesak|pjescenjak)$/.test(k))return "pijesak";if(k==="snijeg")return "snijeg";if(k==="sljunak")return "sljunak";
  if(/^(drvo|daske|tdaske|sdaske|bdaske|smreka_d|breza_d|polica|stol|bacva|krov|stalak|sijeno)$/.test(k))return "drvo";
  if(/^(led|pled|tobogan|staklo|kristal|ametist)$/.test(k))return "led";if(/^vuna/.test(k))return "vuna";if(/^(oblak|skocni)$/.test(k))return "oblak";return "kamen";}
function stepSound(heavy){if(muted||!auBuild())return;const P=FP.p,B=AU.sfx,r=Math.random(),h=heavy||1;
  const wet=waterAt(P.x,P.y+.12,P.z);const kind=wet?"voda":surfKind(get(Math.floor(P.x),Math.floor(P.y-.08),Math.floor(P.z)));const pan=(FP.stepLR=-(FP.stepLR||.12))*.6;const v=.9*h;
  switch(kind){
    case "trava":nb(B,"lowpass",1200+r*500,.7,.09*h,.05*v,0,700,pan);nb(B,"highpass",4200,.5,.05,.012*v,0,0,pan);break;
    case "pijesak":nb(B,"lowpass",900+r*200,.6,.14*h,.05*v,0,420,pan);break;
    case "snijeg":for(let i=0;i<3;i++)nb(B,"bandpass",1500+Math.random()*900,2,.035,.03*v,i*.02,0,pan);nb(B,"lowpass",600,.7,.11*h,.035*v,0,0,pan);break;
    case "sljunak":for(let i=0;i<3;i++)nb(B,"bandpass",2400+Math.random()*1400,1.6,.03,.026*v,i*.017,0,pan);nb(B,"lowpass",420,.7,.06,.03*v,0,0,pan);break;
    case "drvo":nb(B,"bandpass",480+r*140,2.6,.07*h,.08*v,0,0,pan);osc(B,"sine",115+r*30,.09*h,.05*v,0,80,pan);break;
    case "led":nb(B,"highpass",3000,.7,.04,.022*v,0,0,pan);osc(B,"sine",1500+r*500,.08,.012*v,0,0,pan);osc(B,"sine",180,.05,.02*v,0,0,pan);break;
    case "vuna":nb(B,"lowpass",480,.5,.08*h,.04*v,0,0,pan);break;
    case "oblak":nb(B,"lowpass",640,.5,.18*h,.03*v,0,280,pan);break;
    case "voda":nb(B,"bandpass",950+r*300,1,.17*h,.06*v,0,480,pan);nb(B,"highpass",2600,.6,.08,.02*v,.03,0,pan);break;
    default:nb(B,"bandpass",2100+r*700,1.4,.045,.05*v,0,0,pan);nb(B,"lowpass",340,.7,.05*h,.045*v,0,0,pan);}}
{const _fl=foxLand;foxLand=function(vy){if(-vy>=5&&FP.on)stepSound(Math.min(1.9,1+(-vy-5)*.08));return _fl.apply(this,arguments);};}

/* ---------- where is the listener? ---------- */
const STONY=/kamen|duboki|kvarc|kristal|ametist|^led$|pled|^r_|tuf|glina|sljunak|prizmarin|prizcigla|kcigla|cigla|kaldrma/;
function auListener(){return FP.on?FP.p:controls.target;}
function auFalls(){if(AU.fallsN===FALLS.size&&AU.fallsW===String(WORLD))return;AU.fallsN=FALLS.size;AU.fallsW=String(WORLD);const a=[...FALLS];const st=Math.max(1,Math.ceil(a.length/500));AU.fl=[];
  for(let i=0;i<a.length;i+=st){const p=a[i].split(",");AU.fl.push(+p[0]+.5,+p[1]+.5,+p[2]+.5);}}
function auScan(){const L=auListener(),E=AU.env;const x0=Math.floor(L.x),z0=Math.floor(L.z),hy=Math.floor(L.y+(FP.on?.7:1));
  let n=0,water=0,leaf=0,grass=0;const seaY=!WORLD?WATER:WORLD==="more"?50:-99;const R=FP.on?24:40,st=FP.on?4:8;
  for(let dz=-R;dz<=R;dz+=st)for(let dx=-R;dx<=R;dx+=st){const X=x0+dx,Z=z0+dz;n++;if(X<0||Z<0||X>=W||Z>=W){if(!WORLD)water++;continue;}
    let hit=false;for(let y=Math.min(H-1,hy+10);y>=Math.max(0,hy-18);y--){const t=get(X,y,Z);if(!t)continue;hit=true;const ty=TYPES[t];if(ty.water||y<seaY-1)water++;else if(ty.leaf)leaf++;else if(t===T.trava||t===T.mahovina)grass++;break;}if(!hit&&hy-18<seaY)water++;}
  E.sea=FP.on||WORLD?water/n:Math.max(.5,water/n);E.leaf=leaf/n;E.grass=grass/n;
  let cov=0,enc=0,stone=0,books=0,hits=0;
  if(FP.on){for(const [dx,dz] of [[0,0],[3,0],[-3,0],[0,3],[0,-3]])for(let y=hy+1;y<Math.min(H,hy+24);y++){const t=get(x0+dx,y,z0+dz);if(t&&!TYPES[t].leaf&&!TYPES[t].water){cov++;break;}}
    for(let a=0;a<8;a++){const ax=Math.cos(a*Math.PI/4),az=Math.sin(a*Math.PI/4);for(let r=1;r<=10;r++){const t=get(Math.floor(L.x+ax*r),hy,Math.floor(L.z+az*r));
      if(t&&!TYPES[t].leaf&&!TYPES[t].water){enc++;hits++;const k=TYPES[t].k;if(STONY.test(k))stone++;if(k==="polica")books++;break;}}}}
  cov/=5;enc/=8;E.inside=FP.on?cl01(cov*Math.min(1,enc*1.35)):0;E.kind=E.inside<.35?"":books>=1?"lib":(hits&&stone>=hits*.6)?"cave":"room";
  E.h=cl01((L.y-WATER)/34);auFalls();let best=1e9;const fl=AU.fl;for(let i=0;i<fl.length;i+=3){const d=(fl[i]-L.x)**2+(fl[i+1]-L.y)**2*.5+(fl[i+2]-L.z)**2;if(d<best)best=d;}E.falls=Math.sqrt(best);}

/* ---------- critters and room events ---------- */
function birdCall(near){const B=AU.amb,pan=(Math.random()*2-1)*.85,v=(.35+Math.random()*.65)*near,k=Math.floor(Math.random()*5);
  if(k===0){const n=2+Math.floor(Math.random()*3);for(let i=0;i<n;i++)osc(B,"sine",3000+Math.random()*500,.07,.02*v,i*.11,4300,pan,.004);}
  else if(k===1){const f=2100+Math.random()*500;osc(B,"sine",f,.22,.02*v,0,f*.98,pan,.03);osc(B,"sine",f*.8,.26,.018*v,.28,f*.78,pan,.03);}
  else if(k===2){const f=3400+Math.random()*700;for(let i=0;i<8;i++)osc(B,"sine",f,.035,.013*v,i*.045,f*1.08,pan,.004);}
  else if(k===3){const f=560+Math.random()*60;[0,.42,.62].forEach((t,i)=>osc(B,"sine",i===1?f*1.12:f,.32,.016*v,t,f*.94,pan,.08));}
  else{const f=2600+Math.random()*400;osc(B,"sine",f,.12,.016*v,0,f*1.45,pan,.01);osc(B,"sine",f*1.45,.16,.014*v,.14,f,pan,.01);}}
function gull(){const pan=(Math.random()*2-1)*.8;for(let i=0;i<2+Math.floor(Math.random()*2);i++){const C=AU.C,t0=C.currentTime+i*.34;const o=C.createOscillator(),b=bq("bandpass",1300,3),g=C.createGain();o.type="sawtooth";
  o.frequency.setValueAtTime(1350,t0);o.frequency.exponentialRampToValueAtTime(820,t0+.28);g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.012,t0+.04);g.gain.exponentialRampToValueAtTime(.0001,t0+.3);o.connect(b);b.connect(g);auPan(g,pan,AU.amb);o.start(t0);o.stop(t0+.35);}}
function cricket(){const pan=(Math.random()*2-1)*.9,f=4300+Math.random()*500,v=.006+Math.random()*.006;for(let i=0;i<3;i++)osc(AU.amb,"sine",f,.025,v,i*.05,0,pan,.003);}
function frog(){const pan=(Math.random()*2-1)*.8,C=AU.C,t0=C.currentTime;for(let i=0;i<2;i++){const o=C.createOscillator(),b=bq("bandpass",420,4),g=C.createGain();o.type="square";o.frequency.value=150+Math.random()*30;
  g.gain.setValueAtTime(.0001,t0+i*.16);g.gain.linearRampToValueAtTime(.02,t0+i*.16+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+i*.16+.12);o.connect(b);b.connect(g);auPan(g,pan,AU.amb);o.start(t0+i*.16);o.stop(t0+i*.16+.15);}}
function owl(){const pan=(Math.random()*2-1)*.7;osc(AU.amb,"sine",410,.38,.016,0,380,pan,.08);osc(AU.amb,"sine",420,.7,.016,.55,370,pan,.1);}
function drip(){const pan=(Math.random()*2-1)*.7,f=1100+Math.random()*1000;osc(AU.sfx,"sine",f,.09,.035,0,f*.55,pan,.002);}
function pageRustle(){const pan=(Math.random()*2-1)*.6;nb(AU.amb,"bandpass",3200,1.2,.18,.012,0,1900,pan);nb(AU.amb,"bandpass",2600,1.2,.12,.009,.2,1700,pan);}
function tinkle(){const pan=(Math.random()*2-1)*.8,b=2400+Math.random()*900;[0,4,7,12].slice(0,2+Math.floor(Math.random()*3)).forEach((s,i)=>osc(AU.amb,"sine",b*Math.pow(2,s/12),.9,.008,i*.13,0,pan,.004));}
function creak(){const C=AU.C,t0=C.currentTime,o=C.createOscillator(),b=bq("bandpass",260,6),g=C.createGain();o.type="sawtooth";o.frequency.setValueAtTime(70,t0);o.frequency.linearRampToValueAtTime(52,t0+.9);
  g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(.012,t0+.25);g.gain.exponentialRampToValueAtTime(.0001,t0+1);o.connect(b);b.connect(g);g.connect(AU.amb);o.start(t0);o.stop(t0+1.05);}

/* ---------- gentle music: short phrases with long rests ---------- */
const MOODS={
  dan:{root:60,sc:[0,2,4,7,9],ch:[[0,4,7],[-3,0,4],[-7,-3,0],[-5,-1,2]],bpm:74,p:.5,inst:"box"},
  noc:{root:57,sc:[0,3,5,7,10],ch:[[0,3,7],[-4,0,3],[3,7,10],[-2,2,5]],bpm:56,p:.34,inst:"box"},
  led:{root:62,sc:[0,2,4,6,9],ch:[[0,7,16],[5,9,16],[-3,4,9],[2,9,14]],bpm:62,p:.42,inst:"glass"},
  oblaci:{root:65,sc:[0,2,4,7,9],ch:[[0,4,7,11],[2,5,9,12],[5,9,12,16],[7,11,14,17]],bpm:66,p:.44,inst:"harp"}};
const mf=m=>440*Math.pow(2,(m-69)/12);
function mood(){if(WORLD&&MOODS[WORLD])return MOODS[WORLD];return ((typeof cur!=="undefined"&&cur.night)||0)>.5?MOODS.noc:MOODS.dan;}
function mVoice(m,t,d,vol,inst){const C=AU.C,f=mf(m);const parts=inst==="glass"?[[1,1],[3,.18],[5.2,.06]]:inst==="harp"?[[1,1],[2,.35],[3,.1]]:[[1,1],[2,.25],[4.01,.05]];
  for(const [mul,a] of parts){const o=C.createOscillator(),g=C.createGain();o.type="sine";o.frequency.value=f*mul;const dd=d/(mul>1?mul*.6:1);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol*a,t+(inst==="harp"?.006:.012));g.gain.exponentialRampToValueAtTime(.0001,t+dd);o.connect(g);g.connect(AU.mIn);o.start(t);o.stop(t+dd+.05);}}
function mPad(ns,t,d,vol){const C=AU.C,lp=C.createBiquadFilter();lp.type="lowpass";lp.frequency.value=900;lp.connect(AU.mIn);
  for(const m of ns){for(const det of [-4,4]){const o=C.createOscillator(),g=C.createGain();o.type="triangle";o.frequency.value=mf(m);o.detune.value=det;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+d*.35);g.gain.linearRampToValueAtTime(vol*.8,t+d*.7);g.gain.linearRampToValueAtTime(.0001,t+d*1.05);o.connect(g);g.connect(lp);o.start(t);o.stop(t+d*1.1);}}}
function musicTick(){const M=AU.m,C=AU.C;if(C.currentTime+.7<M.next)return;
  if(!M.ph){M.ph=mood();M.bar=0;M.beat=0;M.deg=2+Math.floor(Math.random()*2);M.len=8;}
  const P=M.ph,bt=60/P.bpm,t=Math.max(M.next,C.currentTime+.05);const ch=P.ch[M.bar%P.ch.length];
  if(M.beat===0){mPad(ch.map(s=>P.root-12+s),t,bt*4,.0065);mVoice(P.root-24+ch[0],t,bt*3.5,.022,"harp");}
  const last=M.bar===M.len-1;
  if(last&&M.beat===2){mVoice(P.root+ch[0],t,bt*4,.03,P.inst);}
  else if(!(last&&M.beat>2)&&Math.random()<P.p){M.deg=Math.max(0,Math.min(P.sc.length*2-1,M.deg+[-2,-1,-1,1,1,2,0][Math.floor(Math.random()*7)]));
    const m=P.root+P.sc[M.deg%P.sc.length]+12*Math.floor(M.deg/P.sc.length);mVoice(m,t,bt*2.6,.026,P.inst);
    if(Math.random()<.22)mVoice(P.root+P.sc[(M.deg+1)%P.sc.length]+12*Math.floor((M.deg+1)/P.sc.length),t+bt/2,bt*2,.018,P.inst);}
  M.beat++;M.next=t+bt;if(M.beat>=4){M.beat=0;M.bar++;if(M.bar>=M.len){M.ph=null;M.next=t+bt*2+14+Math.random()*22;}}}

/* ---------- the mixer tick ---------- */
let auT0=performance.now();
function auTick(){if(!AU||muted||AU.C.state!=="running")return;const now=performance.now(),dt=Math.min(.5,(now-auT0)/1000);auT0=now;const C=AU.C,tt=C.currentTime,E=AU.env,L=AU.L;
  AU.scanT-=dt;if(AU.scanT<=0){AU.scanT=.45;try{auScan();}catch(e){}}
  const night=(typeof cur!=="undefined"&&cur.night)||0,day=1-night,inn=E.inside,out=1-inn*.85,under=FP.on&&FP.under,film=typeof CINE!=="undefined"&&!!CINE,sheet=!$("veil").hidden;
  const calm=sheet?.55:1,ice=WORLD==="led",sky=WORLD==="oblaci";
  /* sea: slow uneven swell */
  const sw=.5+.5*Math.sin(tt*.55+Math.sin(tt*.21)*1.6);const sea=Math.pow(E.sea,.8)*(FP.on?.5:.32)*out*calm*(under?0:1);
  auSet(L.sea.g.gain,sea*(.55+.45*sw),.25);auSet(L.sea.f[0].frequency,380+sw*520,.3);auSet(L.surf.g.gain,sea*.35*Math.pow(sw,3),.2);
  /* wind with gusts, stronger high up and in the ice and cloud worlds */
  const gust=.5+.5*Math.sin(tt*.31+Math.sin(tt*.13)*2.2);const wind=(.05+E.h*.22+(ice?.12:0)+(sky?.1:0))*(.45+.55*gust)*out*calm*(under?0:1);
  auSet(L.wind.g.gain,wind,.5);auSet(L.wind.f[0].frequency,380+gust*700+E.h*300,.6);
  auSet(L.leaf.g.gain,Math.min(.5,E.leaf*1.6)*.05*(.3+.7*gust)*out*calm*(under?0:1),.4);
  /* waterfall */
  const fa=cl01(1-E.falls/26);auSet(L.fall.g.gain,fa*fa*.07*(1-inn*.5)*calm*(under?.3:1),.3);auSet(L.rumble.g.gain,fa*fa*fa*.08*calm,.3);
  auSet(L.under.g.gain,under?.18:0,.15);auSet(AU.muff.frequency,under?650:18000,.08);
  auSet(L.room.g.gain,inn*(E.kind==="cave"?.05:.02),.6);
  /* room reverb */
  auSet(AU.wet.gain,E.kind==="cave"?.2+.25*inn:E.kind==="lib"?.12:E.kind==="room"?.08+inn*.06:under?.1:.03,.5);
  /* critters and room events */
  const near=FP.on?1:.45;
  if((AU.bird-=dt)<=0){AU.bird=1.6+Math.random()*4.5;const rate=(E.leaf*3+E.grass*.6)*day*(1-inn)*(ice||sky||under?0:1);if(Math.random()<Math.min(.9,rate))birdCall(near);else if(!ice&&!sky&&day>.5&&E.sea>.4&&Math.random()<.12)gull();}
  if((AU.cri-=dt)<=0){AU.cri=.3+Math.random()*.5;if(night>.55&&!ice&&!sky&&!under&&inn<.4){if(Math.random()<E.grass*2.4+E.leaf)cricket();if(E.sea>.2&&Math.random()<.04)frog();if(E.leaf>.08&&Math.random()<.008)owl();}}
  if((AU.drip-=dt)<=0){AU.drip=.7+Math.random()*2.6;if(E.kind==="cave"&&!under)drip();}
  if((AU.ev-=dt)<=0){AU.ev=6+Math.random()*9;if(E.kind==="lib")pageRustle();else if(ice&&Math.random()<.6)(Math.random()<.5?tinkle:creak)();else if(sky&&Math.random()<.5)tinkle();}
  if(under&&(AU.bub-=dt)<=0){AU.bub=.8+Math.random()*2.8;const f=260+Math.random()*240;osc(AU.amb,"sine",f,.09,.012,0,f*2.6,(Math.random()-.5)*.8,.004);if(Math.random()<.4)osc(AU.amb,"sine",f*1.3,.07,.008,.08,f*3.2,(Math.random()-.5)*.8,.004);}
  /* swim strokes */
  if(FP.on&&FP.swim&&!FP.boat&&Math.hypot(FP.v.x,FP.v.z)>.8){if((AU.swimT-=dt)<=0){AU.swimT=.85;nb(AU.sfx,"bandpass",700+Math.random()*300,1,.28,under?.02:.035,0,420,(Math.random()-.5)*.6);}}
  /* music: quiet, gives way to films, sheets and caves */
  const mv=AUS.m*.85*(film||(typeof MINIMUTE!=="undefined"&&MINIMUTE)?0:sheet?.55:1)*(E.kind==="cave"?.5:1);auSet(AU.mus.gain,mv,film?.15:.8);if(mv>.001||AU.m.ph)musicTick();}
setInterval(auTick,110);

/* ---------- settings sheet ---------- */
function sheetSound(){const sl=(id,lab,v,sub)=>'<div class="field au"><label for="'+id+'">'+lab+' <b id="'+id+'v">'+Math.round(v*100)+'%</b></label><input type="range" id="'+id+'" min="0" max="100" step="5" value="'+Math.round(v*100)+'">'+(sub?'<small class="muted">'+sub+'</small>':'')+'</div>';
  openSheet('<h2>Zvuk</h2><div class="row"><button class="btn '+(muted?'green':'soft')+'" id="auMute">'+(muted?'Uključi zvuk':'Utišaj sve')+'</button></div>'+
    sl("auM","Glazba",AUS.m,"Tiha melodija koja se mijenja s dobom dana i svijetom.")+sl("auA","Priroda",AUS.a,"More, vjetar, ptice, slap, cvrčci noću, kapi u špilji.")+sl("auS","Efekti i koraci",AUS.s,"Koraci po travi, pijesku, snijegu, drvu i kamenu.")+
    '<p class="muted">Najljepše zvuči sa slušalicama.</p>');
  const bind=(id,k)=>{const el=$(id);el.oninput=()=>{AUS[k]=el.value/100;$(id+"v").textContent=el.value+"%";auApplyVol();auSaveS();};el.onchange=()=>{if(k==="s")sfx.pop();};};
  bind("auM","m");bind("auA","a");bind("auS","s");
  $("auMute").onclick=()=>{muted=!muted;try{localStorage.setItem("otok-mute",muted?"1":"0");}catch(e){}renderSound();if(!muted){auKick();sfx.click();}auApplyVol();sheetSound();};}
$("soundBtn").onclick=()=>{auKick();sfx.click();sheetSound();};
$("soundBtn").title="Zvuk i glazba";
