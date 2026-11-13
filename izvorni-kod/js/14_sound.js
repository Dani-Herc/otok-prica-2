/* =================== SOUND =================== */
let actx=null,muted=false;var AU=null;function auOut(){if(!AU&&typeof auBuild==="function")auBuild();return AU?AU.sfx:actx.destination;}try{muted=localStorage.getItem("otok-mute")==="1";}catch(e){}
function tone(f,d,type,vol,delay){if(muted)return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const t0=actx.currentTime+(delay||0);const o=actx.createOscillator(),g=actx.createGain();o.type=type||"square";o.frequency.setValueAtTime(f,t0);g.gain.setValueAtTime(vol||.04,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g);g.connect(auOut());o.start(t0);o.stop(t0+d+.02);}catch(e){}}
const sfx={pop(){tone(220+Math.random()*160,.09,"triangle",.03);},chime(){[523,659,784,1046].forEach((f,i)=>tone(f,.35,"triangle",.05,i*.09));},
  fanfare(){[392,523,659,784,659,784,1046].forEach((f,i)=>tone(f,.3,"triangle",.06,i*.11));},click(){tone(660,.05,"triangle",.025);},splash(){[300,240,180].forEach((f,i)=>tone(f,.12,"sine",.04,i*.05));}};

