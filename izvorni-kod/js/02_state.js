/* =================== STATE =================== */
const KEY="otok-prica-v3";
function dstr(dt){return dt.getFullYear()+"-"+String(dt.getMonth()+1).padStart(2,"0")+"-"+String(dt.getDate()).padStart(2,"0");}
function today(){return dstr(new Date());}
function addDays(s,n){const p=s.split("-").map(Number);return dstr(new Date(p[0],p[1]-1,p[2]+n));}
function fresh(){return {coins:0,tickets:2,ticketPages:0,found:{},fish:{},fishCasts:0,quests:null,today:null,hats:[],hat:"",spawns:[],spawnDay:"",spawnBonus:"",setsDone:[],best:{balloon:0},v:3,name:"",created:today(),lastVisit:"",books:[],edits:{},days:{},visitors:[],letters:[],answers:[],bloom:0,xp:0,sig:"",updatedAt:0};}
function migrate(s){const f=fresh();if(!s||typeof s!=="object")return f;for(const k in f) if(s[k]==null) s[k]=f[k];return s;}
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY));}catch(e){S=null;}
/* the main save is missing or broken: fall back to yesterday's backup copy */
let fromBak=false;if(!S||typeof S!=="object"){try{const b=JSON.parse(localStorage.getItem(KEY+"-bak"));if(b&&typeof b==="object"){S=b;fromBak=true;}}catch(e){}}
if(!S){try{const old=JSON.parse(localStorage.getItem("otok-prica-3d-v1"));if(old){old.edits={};S=old;}}catch(e){}}
S=migrate(S);S.pets=S.pets||{};S.met=S.met||{};
if(fromBak)setTimeout(()=>{if(typeof toast==="function")toast("Glavno spremanje nije bilo ispravno, pa je napredak vraćen iz zadnje dnevne sigurnosne kopije.",7000);},6500);
let remote=null,pushT=0;
/* save to the browser; once a day the previous save is kept as a backup copy; a failed save is never silent */
let saveFailT=0,saveOk=true;
function saveWarn(){saveOk=false;const now=Date.now();if(now-saveFailT<60000)return;saveFailT=now;
  if(typeof toast==="function")toast("Pažnja: napredak se trenutno ne može spremiti u preglednik! U Kutku za roditelje spremi napredak u datoteku.",7000);}
let saveBlock=false;/* set while the page reloads into another save */
function save(){if(saveBlock)return;S.updatedAt=Date.now();const js=JSON.stringify(S);
  try{if(localStorage.getItem(KEY+"-bakd")!==today()){const prev=localStorage.getItem(KEY);if(prev){localStorage.setItem(KEY+"-bak",prev);localStorage.setItem(KEY+"-bakd",today());}}}catch(e){}
  try{localStorage.setItem(KEY,js);saveOk=true;}
  catch(e){/* out of space: drop the backup copy and try once more */try{localStorage.removeItem(KEY+"-bak");localStorage.removeItem(KEY+"-bakd");localStorage.setItem(KEY,js);saveOk=true;}catch(e2){saveWarn();}}
  if(remote){clearTimeout(pushT);pushT=setTimeout(()=>{remote.set({json:JSON.stringify(S),updatedAt:S.updatedAt}).catch(()=>{});},900);}}
function streak(){let d=today();if(!S.days[d])d=addDays(d,-1);let n=0;while(S.days[d]){n++;d=addDays(d,-1);}return n;}
function level(){return 1+Math.floor(Math.sqrt(S.xp/20));}
function finished(){return S.books.filter(b=>b.done);}

