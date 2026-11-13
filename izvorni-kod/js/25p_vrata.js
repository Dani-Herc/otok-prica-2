/* =================== v18: ZATVORENA VRATA: say clearly how a closed door opens ===================
   Dani (2026-11-13): in the sweets world a treat sits in a house that cannot be entered. The house belongs to baka
   Medenka and opens after her five-sweets quest, but nothing on the spot said so. Now, in every portal world:
   - standing at a closed door or cage shows who holds the key and how far the task is (0 / 5), and A / the button
     walks Rida's attention to it (talking to the helper starts the quest, sweets start to glow);
   - a quest that is finished always opens its door, also after leaving the world before the door had opened. */
const VR8={t:0,near:null,shown:{}};
function vrCages(){const out=[];for(const k in PW.cages){const c=PW.cages[k];if(!c||!c.length||pwDone(k))continue;let x=0,y=0,z=0;for(const p of c){x+=p[0];y+=p[1];z+=p[2];}
  out.push({k,x:x/c.length+.5,y:y/c.length,z:z/c.length+.5});}return out;}
function vrQuestFor(cage){for(const k in PW.q){const o=PW.q[k];if(o.cage===cage)return [k,o];}return null;}
function vrText(cg){const Q=vrQuestFor(cg.k);if(!Q)return "Zatvoreno. Riješi zadatak u blizini i ovo će se otvoriti.";
  const [k,o]=Q,q=pwQS(k)||{},who=o.en&&o.en.name?o.en.name:"Netko u blizini";
  if(!q.on&&!q.done)return "Zaključano. "+who+" ima ključ. Porazgovaraj i pomozi!";
  return "Zaključano. Skupi za "+who+": "+(o.gotN||o.got)+" "+(q.n||0)+" / "+o.need+". Svjetlucaju!";}
function vrTick(dt){if(typeof WORLD==="undefined"||!WORLD||!FP.on)return;VR8.t-=dt;if(VR8.t>0)return;VR8.t=.3;
  /* finished quests always open their door */
  for(const k in PW.q){const o=PW.q[k];if(o.cage&&!o.pet&&pwQDone(k)&&!pwDone(o.cage))pwOpen(o.cage,true);}
  let best=null,bd=3.2;for(const c of vrCages()){if(Math.abs(c.y-FP.p.y)>3)continue;const d=Math.hypot(c.x-FP.p.x,c.z-FP.p.z);if(d<bd){bd=d;best=c;}}
  if(best&&best.k!==VR8.near){const now=performance.now();if(!VR8.shown[best.k]||now-VR8.shown[best.k]>15000){VR8.shown[best.k]=now;toast(vrText(best),5200);sfx.click();}}
  VR8.near=best?best.k:null;}
{const _tp=tickPad;tickPad=function(dt){_tp.apply(this,arguments);try{vrTick(dt);}catch(e){}};}
