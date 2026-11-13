/* =================== v21: NOVI ZVUK ===================
   Dani (2026-11-13): "the sound is very bad, it needs a drastic fix".
   What was wrong: every effect in the game went through tone(), a bare square or sawtooth beep that started with a
   click; the music was random notes; the leaves and the surf were bright white noise (a constant hiss); steps were
   loud clicks; nothing removed the harsh top end.
   Now:
   1. Effects: one soft instrument for all 240 game sounds (rounded sine with a little warmth, gentle attack, a filter
      that follows the pitch). Buzzy square/saw sounds become warm and muted, very high beeps drop an octave, and if a
      game fires too many sounds at once the extra ones are skipped instead of piling up.
   2. Music: real little songs instead of random notes. Six original tunes with a melody, bass and soft chords:
      morning on the island, a night lullaby, a sea song for the harbour worlds, a flower waltz for the valley,
      a mountain song and a music box for the ice and moon worlds. After a song there is a quiet pause with nature.
   3. Nature: the hiss is gone (leaves and surf are soft and low), the wind is darker, steps are quieter and softer,
      and a last filter on everything takes away the sharp top end. */
const ZVK={recent:[],steps:null,top:null};
function zvFix(){const A=AU;if(!A||A._zv)return;A._zv=1;const C=A.C;
  try{/* a last soft filter on everything */const lp=C.createBiquadFilter();lp.type="lowpass";lp.frequency.value=7500;lp.Q.value=.5;
    const lp2=C.createBiquadFilter();lp2.type="highshelf";lp2.frequency.value=3500;lp2.gain.value=-4;
    A.master.disconnect();A.master.connect(A.muff);/* keep the underwater muffle */A.muff.disconnect();A.muff.connect(lp);lp.connect(lp2);
    const comp=C.createDynamicsCompressor();comp.threshold.value=-18;comp.knee.value=16;comp.ratio.value=2.5;comp.attack.value=.01;comp.release.value=.35;lp2.connect(comp);comp.connect(C.destination);ZVK.top=lp;}catch(e){}
  try{/* nature without hiss */const L=A.L;
    if(L.leaf){L.leaf.f[0].type="bandpass";L.leaf.f[0].frequency.value=1300;L.leaf.f[0].Q.value=.7;L.leaf.f[1].frequency.value=2400;}
    if(L.surf){L.surf.f[0].frequency.value=850;L.surf.f[0].Q.value=.6;L.surf.f[1].frequency.value=1500;}
    if(L.wind){L.wind.f[1].frequency.value=1000;}if(L.fall){L.fall.f[1].frequency.value=1700;}}catch(e){}
  try{/* steps go through their own quiet, soft bus */const g=C.createGain();g.gain.value=.5;const f=C.createBiquadFilter();f.type="lowpass";f.frequency.value=2600;g.connect(f);f.connect(A.sfx);ZVK.steps=g;}catch(e){}
  auApplyVol();}
{const _ab=auBuild;auBuild=function(){const r=_ab.apply(this,arguments);try{if(AU)zvFix();}catch(e){}return r;};}
{const _av=auApplyVol;auApplyVol=function(){_av.apply(this,arguments);if(!AU)return;const t=AU.C.currentTime;AU.master.gain.setTargetAtTime(muted?0:1.15,t,.05);AU.amb.gain.setTargetAtTime(AUS.a*.75,t,.1);};}
/* ---------- one soft instrument for every effect ---------- */
tone=function(f,d,type,vol,delay){if(muted||!f||!(d>0))return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const out=auOut();const C=actx;const t0=C.currentTime+(delay||0);
  const now=performance.now();ZVK.recent=ZVK.recent.filter(x=>now-x<90);if(ZVK.recent.length>=10)return;ZVK.recent.push(now);
  while(f>2600)f/=2;const buzzy=type==="square"||type==="sawtooth";let v=Math.min(.05,(vol||.04)*(buzzy?.55:.8));
  const o=C.createOscillator(),g=C.createGain(),lp=C.createBiquadFilter();o.type=buzzy?"triangle":(type==="triangle"?"triangle":"sine");o.frequency.setValueAtTime(f,t0);
  lp.type="lowpass";lp.frequency.value=Math.min(5200,Math.max(900,f*(buzzy?2.2:3.2)));lp.Q.value=.4;
  const a=Math.min(.012,d*.25),dd=Math.max(d,.06)*1.15;g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(v,t0+a);g.gain.exponentialRampToValueAtTime(.0001,t0+dd);
  o.connect(lp);lp.connect(g);
  if(!buzzy&&f<1400){const o2=C.createOscillator(),g2=C.createGain();o2.type="sine";o2.frequency.setValueAtTime(f*2,t0);g2.gain.setValueAtTime(.0001,t0);g2.gain.linearRampToValueAtTime(v*.18,t0+a);g2.gain.exponentialRampToValueAtTime(.0001,t0+dd*.6);o2.connect(g2);g2.connect(out);o2.start(t0);o2.stop(t0+dd+.05);}
  g.connect(out);o.start(t0);o.stop(t0+dd+.05);}catch(e){}};
function zvBell(f,t,d,v,bus){const C=AU.C;for(const [m,a,dk] of [[1,1,1],[2,.28,.55],[3,.08,.35],[4.2,.03,.25]]){const o=C.createOscillator(),g=C.createGain();o.type="sine";o.frequency.value=f*m;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*a,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d*dk);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*dk+.05);}}
function zvNoise(t,d,f0,f1,v,bus){const C=AU.C,s=C.createBufferSource();s.buffer=AU.brown;const b=C.createBiquadFilter();b.type="bandpass";b.Q.value=.9;b.frequency.setValueAtTime(f0,t);b.frequency.exponentialRampToValueAtTime(f1,t+d);
  const g=C.createGain();g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.2);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(b);b.connect(g);g.connect(bus);s.start(t,Math.random()*3,d+.05);}
const zvSfx=fn=>function(){if(muted||!auBuild())return;try{fn(AU.C.currentTime,AU.sfx);}catch(e){}};
sfx.pop=zvSfx((t,B)=>{const f=330+Math.random()*120;zvBell(f,t,.25,.028,B);});
sfx.click=zvSfx((t,B)=>{zvBell(880,t,.09,.012,B);});
sfx.chime=zvSfx((t,B)=>{[0,4,7,12].forEach((s,i)=>zvBell(523.25*Math.pow(2,s/12),t+i*.085,1.1,.03,B));});
sfx.fanfare=zvSfx((t,B)=>{[[0,0],[4,.1],[7,.2],[12,.32],[7,.5],[12,.6],[16,.72]].forEach(([s,dt],i)=>zvBell(392*Math.pow(2,s/12),t+dt,i===6?1.8:.9,i===6?.04:.03,B));
  [0,4,7].forEach(s=>zvBell(196*Math.pow(2,s/12),t+.72,2,.012,B));});
sfx.splash=zvSfx((t,B)=>{zvNoise(t,.45,1400,300,.08,B);zvNoise(t+.05,.3,2200,700,.03,B);});
/* steps: same surfaces, softer and into their own quiet bus */
{const _ss=stepSound;stepSound=function(h){if(muted||!auBuild()||!ZVK.steps)return _ss.apply(this,arguments);const keep=AU.sfx;AU.sfx=ZVK.steps;try{_ss.apply(this,arguments);}finally{AU.sfx=keep;}};}
/* ---------- music: little songs ---------- */
const ZNOTE={C:0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11};
const znm=s=>{const m=/^([A-G][#b]?)(\d)$/.exec(s);return m?12*(+m[2]+1)+ZNOTE[m[1]]:null;};
const zmel=s=>s.trim().split(/\s+/).map(x=>{const [n,b]=x.split(":");return [n==="-"?null:znm(n),+b];});
/* chords as note-name roots with quality; bars as melody strings. All tunes written for this game. */
const ZSONGS={
  jutro:{bpm:92,bb:4,inst:"box",ch:"C G Am F C F G C Am Em F C Dm G G C",m:[
    "E4:1 G4:1 C5:1.5 B4:.5","A4:1 G4:1 D4:2","E4:1 A4:1 C5:1 B4:1","A4:1.5 G4:.5 F4:2","E4:1 G4:1 C5:1 E5:1","D5:1 C5:1 A4:2","G4:1 A4:.5 B4:.5 D5:1 B4:1","C5:3 -:1",
    "A4:1 C5:1 E5:2","D5:1 B4:1 G4:2","A4:1 C5:1 F5:1.5 E5:.5","D5:1 C5:1 G4:2","F4:1 A4:1 D5:1 C5:1","B4:1 D5:1 G4:2","A4:1 B4:1 C5:.5 D5:.5 B4:1","C5:4"]},
  livada:{bpm:84,bb:4,inst:"harp",ch:"G Em C D G Em Am D C D Bm Em C Am D G",m:[
    "D4:1 G4:1 B4:2","B4:1 A4:.5 G4:.5 E4:2","E4:1 G4:1 C5:1.5 B4:.5","A4:3 -:1","B4:1 D5:1 G5:2","G5:1 F#5:.5 E5:.5 B4:2","C5:1 E5:1 A4:1 C5:1","D5:3 -:1",
    "E5:1.5 D5:.5 C5:1 G4:1","A4:1 B4:1 C5:1 D5:1","D5:1 B4:1 F#4:2","G4:1 B4:1 E5:2","E5:1 D5:1 C5:1 G4:1","A4:1 C5:1 E5:1 D5:1","C5:1 B4:1 A4:1 F#4:1","G4:4"]},
  noc:{bpm:64,bb:3,inst:"flute",ch:"Am F C G Am F G Am Dm Am G C F C G Am",m:[
    "E5:2 A4:1","C5:1.5 B4:.5 A4:1","G4:2 E4:1","D4:1 G4:1 B4:1","C5:2 B4:1","A4:2 F4:1","G4:1 A4:1 B4:1","A4:3",
    "F4:1 A4:1 D5:1","C5:2 A4:1","B4:1 D5:1 G5:1","E5:2 C5:1","A4:1 C5:1 F5:1","E5:1.5 D5:.5 C5:1","D5:1 B4:1 G4:1","A4:3"]},
  more:{bpm:180,bb:6,inst:"box",ch:"D A Bm G D A A D G D Em A D G A D",m:[
    "A4:2 F#4:1 A4:2 D5:1","C#5:2 B4:1 A4:3","B4:2 D5:1 F#5:2 E5:1","D5:2 B4:1 G4:3","F#4:2 A4:1 D5:2 F#5:1","E5:2 C#5:1 A4:2 B4:1","C#5:2 E5:1 A4:2 C#5:1","D5:6",
    "B4:2 D5:1 G5:2 F#5:1","F#5:2 E5:1 D5:3","E5:2 G5:1 B4:2 G4:1","A4:2 C#5:1 E5:3","F#5:2 E5:1 D5:2 A4:1","B4:2 D5:1 G4:3","A4:2 B4:1 C#5:2 E5:1","D5:6"]},
  valcer:{bpm:132,bb:3,inst:"harp",ch:"G C D G Em C D G C G Am D G C D G",m:[
    "D5:2 B4:1","C5:1 E5:1 G5:1","F#5:2 A4:1","B4:3","G4:1 B4:1 E5:1","E5:2 C5:1","D5:1 F#5:1 A5:1","G5:3",
    "E5:2 G5:1","D5:2 B4:1","C5:1 E5:1 A4:1","F#4:3","G4:1 B4:1 D5:1","E5:2 C5:1","A4:1 B4:1 C5:1","B4:2 G4:1"]},
  gora:{bpm:72,bb:4,inst:"flute",ch:"Em D C D Em D C Em Am Em C D Em D C Em",m:[
    "E4:1 G4:1 B4:2","A4:1 F#4:1 D4:2","E4:1 G4:1 C5:1.5 B4:.5","A4:4","B4:1 D5:1 E5:2","F#5:1 E5:1 D5:2","E5:1 D5:1 C5:1 B4:1","E5:4",
    "A4:1 C5:1 E5:2","G5:1 F#5:1 E5:2","E5:1 D5:1 C5:1 G4:1","A4:1 B4:1 D5:2","B4:1 G4:1 E4:2","F#4:1 A4:1 D5:2","C5:1 B4:1 A4:1 G4:1","E4:4"]},
  zvono:{bpm:76,bb:3,inst:"glass",ch:"D G D A Bm G A D G D Em A D G A D",m:[
    "A5:2 F#5:1","G5:1 B5:1 D6:1","F#5:2 D5:1","E5:3","F#5:1 A5:1 D6:1","D6:1 B5:1 G5:1","E5:1 F#5:1 G5:1","F#5:3",
    "D6:2 B5:1","A5:2 F#5:1","G5:1 E5:1 B4:1","C#5:3","D5:1 F#5:1 A5:1","B5:1 G5:1 D5:1","E5:1 G5:1 C#6:1","D6:3"]}};
const ZCHQ={"":[0,4,7],m:[0,3,7]};
function chordOf(s){const m=/^([A-G][#b]?)(m?)$/.exec(s);const r=ZNOTE[m[1]];return ZCHQ[m[2]].map(x=>r+x);}
function songFor(){const w=WORLD||"",d=(typeof DST!=="undefined"&&DST[w])?w:(WORLDS[w]&&WORLDS[w].dist)||"";
  const night=((typeof cur!=="undefined"&&cur.night)||0)>.5;
  if(w==="led"||/kristal|mjesec/.test(w))return "zvono";if(w==="oblaci")return "valcer";
  if(d==="luka")return night?"noc":"more";if(d==="dolina")return night?"noc":"valcer";if(d==="gora")return night?"zvono":"gora";
  if(night)return "noc";ZVK.alt=!ZVK.alt;return ZVK.alt?"jutro":"livada";}
function zvVoice(m,t,d,v,inst){const C=AU.C,f=mf(m),bus=AU.mIn;
  if(inst==="flute"){const o=C.createOscillator(),o2=C.createOscillator(),g=C.createGain(),lf=C.createOscillator(),lg=C.createGain(),lp=C.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2400;
    o.type="sine";o.frequency.value=f;o2.type="triangle";o2.frequency.value=f;lf.frequency.value=5.2;lg.gain.value=f*.006;lf.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);
    const g2=C.createGain();g2.gain.value=.25;o2.connect(g2);g2.connect(lp);o.connect(lp);lp.connect(g);
    const dd=Math.max(.25,d*.95);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*.9,t+.07);g.gain.setValueAtTime(v*.8,t+Math.max(.08,dd-.12));g.gain.exponentialRampToValueAtTime(.0001,t+dd+.25);g.connect(bus);
    for(const n of [o,o2,lf]){n.start(t);n.stop(t+dd+.3);}return;}
  const P=inst==="glass"?[[1,1,1],[2.76,.22,.4],[5.4,.06,.25]]:inst==="harp"?[[1,1,1],[2,.32,.5],[3,.1,.3]]:[[1,1,1],[2,.2,.45],[3,.07,.3],[4.01,.04,.2]];
  const dec=inst==="glass"?2.6:inst==="harp"?1.6:1.3;const dd=Math.max(d,.35)*dec;
  for(const [mul,a,dk] of P){const o=C.createOscillator(),g=C.createGain();o.type="sine";o.frequency.value=f*mul;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*a,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+dd*dk+.05);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd*dk+.1);}}
function zvBass(m,t,d,v){const C=AU.C,o=C.createOscillator(),g=C.createGain(),lp=C.createBiquadFilter();lp.type="lowpass";lp.frequency.value=500;o.type="triangle";o.frequency.value=mf(m);
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(lp);lp.connect(g);g.connect(AU.mIn);o.start(t);o.stop(t+d+.05);}
function zvPad(ns,t,d,v){const C=AU.C,lp=C.createBiquadFilter();lp.type="lowpass";lp.frequency.value=800;lp.connect(AU.mIn);
  for(const m of ns)for(const det of [-5,5]){const o=C.createOscillator(),g=C.createGain();o.type="triangle";o.frequency.value=mf(m);o.detune.value=det;
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.3);g.gain.linearRampToValueAtTime(v*.7,t+d*.8);g.gain.linearRampToValueAtTime(.0001,t+d*1.05);o.connect(g);g.connect(lp);o.start(t);o.stop(t+d*1.1);}}
/* schedules one bar at a time, a little ahead */
musicTick=function(){const M=AU.m,C=AU.C;if(C.currentTime+.9<M.next)return;
  if(!M.song){M.song=songFor();M.bar=0;const S0=ZSONGS[M.song];M.trans=0;}
  const S0=ZSONGS[M.song],bt=60/S0.bpm,t=Math.max(M.next,C.currentTime+.08),bars=S0.m.length;const chs=S0.ch.split(" ");
  const ch=chordOf(chs[M.bar%chs.length]),bb=S0.bb,barLen=bt*bb;
  /* chords and bass */
  const pc=ch[0]%12,bp=pc+(pc<5?48:36);zvBass(bp,t,barLen*.95,.03);
  if(bb===6){zvBass(bp+7,t+bt*3,barLen*.45,.016);}else if(bb===4)zvBass(bp+7,t+bt*2,bt*1.8,.016);
  zvPad(ch.map(x=>x+60),t,barLen,.0045);
  /* soft offbeat plucks */
  const pl=bb===3?[1,2]:bb===6?[2,5]:[1,3];for(const b of pl)zvVoice(ch[(b+M.bar)%3]+60,t+b*bt,bt*.9,.006,S0.inst==="flute"?"harp":S0.inst);
  /* melody */
  let off=0;for(const [n,b] of zmel(S0.m[M.bar])){if(n!=null)zvVoice(n,t+off*bt,b*bt,S0.inst==="flute"?.026:.03,S0.inst);off+=b;}
  M.bar++;M.next=t+barLen;
  if(M.bar>=bars){M.song=null;M.ph=null;M.next=t+barLen+18+Math.random()*24;}else M.ph=1;};
if(typeof AU!=="undefined"&&AU)try{zvFix();AU.m.next=AU.C.currentTime+2;}catch(e){}
