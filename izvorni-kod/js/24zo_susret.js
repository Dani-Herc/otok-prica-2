/* =================== v44: SUSRET: animals are discovered only by meeting them while exploring ===================
   Looking at the island from above and tapping an animal no longer makes a new friend or fills the habitat guide.
   An animal she has not met yet answers with a riddle-like hint, and the meeting itself happens on foot, close by.
   Nothing is saved. */
function suUnknown(en){try{const k=en.kind,P=PETS[k];if(P&&(P.isle||P.src==="sea")&&!S.met[k])return true;
  if(typeof STN!=="undefined"&&STN[k]){const l=stHere();if(l&&stKinds(l).includes(k)){const D=stS();if(!(D.zoo[l]&&D.zoo[l][k])&&!S.visitors.includes(k)&&!S.met[k])return true;}}}catch(e){}return false;}
const suSay=(en,t,ms)=>{const n=en.name;en.name="???";try{say(en,t,ms);}finally{en.name=n;}};
const SU_HINT=["Tko sam ja? Dođi pješice pa ćeš saznati!","Odozgo me ne možeš upoznati. Pritisni Istraži i priđi mi!","Psst! Upoznat ćemo se kad dođeš do mene s Ridom."];
{const _at=animalTap;animalTap=function(en,explore){
  if(suUnknown(en)){
    if(!explore||!FP.on){suSay(en,SU_HINT[Math.floor(Math.random()*SU_HINT.length)],4200);en.celebrate=.4;toast("Ovu životinju još nisi upoznala. Pritisni Istraži i priđi joj.",3600);return true;}
    const d=Math.hypot(en.x-FP.p.x,en.z-FP.p.z);if(d>3.6){suSay(en,"Priđi bliže da se upoznamo!",3200);return true;}}
  return _at.apply(this,arguments);};}
