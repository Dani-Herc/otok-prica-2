/* =================== JEZIK (language) ===================
   The game is written in Croatian. German is laid over it at display time: every text node, tooltip and
   canvas label is looked up in JZ_DE (25i_de.js). Whole sentences match first, then the longest known
   pieces, so text glued together from parts ("Imaš "+n+" zlatnika") still comes out German.
   The choice lives in its own localStorage key, never in the save, and a change reloads the page so
   3D signs and painted textures are drawn again in the new language. */
const JZ={lang:"hr",map:null,first:null,cache:new Map(),seen:new WeakMap(),obs:null};
try{const l=localStorage.getItem("otok-prica-jezik");if(l==="de")JZ.lang="de";}catch(e){}
const JZ_LANGS=[["hr","Hrvatski","🇭🇷"],["de","Deutsch","🇩🇪"]];
const jzIsL=c=>/[\p{L}\p{N}]/u.test(c);
function jzBuild(){if(JZ.map)return;JZ.map=new Map();JZ.first=new Map();
  for(const [k,v] of JZ_DE){if(!k||!v||k===v)continue;JZ.map.set(k,v);const m=k.match(/^[\p{L}\p{N}]+/u);if(!m)continue;const w=m[0];let a=JZ.first.get(w);if(!a)JZ.first.set(w,a=[]);a.push(k);}
  for(const a of JZ.first.values())a.sort((x,y)=>y.length-x.length);}
/* piecewise replace: at every word start try the longest known key that begins with that word */
function jzPieces(s){let out="",i=0;const n=s.length;
  while(i<n){const c=s[i];
    if(!jzIsL(c)||(i>0&&jzIsL(s[i-1]))){out+=c;i++;continue;}
    let j=i;while(j<n&&jzIsL(s[j]))j++;const w=s.slice(i,j),cand=JZ.first.get(w);let hit=null;
    if(cand)for(const k of cand){if(s.startsWith(k,i)&&(i+k.length>=n||!jzIsL(s[i+k.length])||!jzIsL(k[k.length-1]))){hit=k;break;}}
    if(hit){out+=JZ.map.get(hit);i+=hit.length;}else{out+=w;i=j;}}
  return out;}
/* what the player typed (book titles, authors, names) is never translated */
function jzUser(){const a=[];try{if(S.name)a.push(S.name);for(const b of S.books||[]){if(b.title)a.push(b.title);if(b.author)a.push(b.author);}}catch(e){}
  return a.filter(x=>typeof x==="string"&&x.length>=2).sort((x,y)=>y.length-x.length);}
let JZ_IRE=null;
function jzIme(s){if(typeof JZ_IME==="undefined")return s;if(!JZ_IRE){const k=Object.keys(JZ_IME).sort((a,b)=>b.length-a.length);JZ_IRE=new RegExp("(?<![\\p{L}])("+k.join("|")+")(?![\\p{L}])","gu");}
  try{return s.replace(JZ_IRE,w=>JZ_IME[w]);}catch(e){return s;}}
function jzT(s){if(JZ.lang==="hr"||typeof s!=="string"||s.length<2)return s;jzBuild();
  let r=JZ.cache.get(s);if(r!==undefined)return r;
  for(const u of jzUser()){const i=s.indexOf(u);if(i>=0){r=jzT(s.slice(0,i))+u+jzT(s.slice(i+u.length));JZ.cache.set(s,r);return r;}}
  const m=s.match(/^([\s\S]*?)([\p{L}\p{N}][\s\S]*?)([\s.,:;!?…)"'»]*)$/u);
  if(!m)r=s;else{const ex=JZ.map.get(m[2]);r=ex!==undefined?m[1]+ex+m[3]:jzPieces(s);}
  r=jzIme(r);
  if(JZ.cache.size>6000)JZ.cache.clear();JZ.cache.set(s,r);return r;}
/* DOM: translate text nodes and a few attributes as they appear */
const JZ_SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,CANVAS:1};
function jzNode(t){const p=t.parentNode;if(!p||JZ_SKIP[p.nodeName]||(p.closest&&p.closest("[data-notr]")))return;
  const v=t.nodeValue;if(!v||JZ.seen.get(t)===v)return;const r=jzT(v);JZ.seen.set(t,r);if(r!==v)t.nodeValue=r;}
function jzAttr(el){for(const a of ["title","placeholder","aria-label"]){const v=el.getAttribute&&el.getAttribute(a);if(v){const r=jzT(v);if(r!==v)el.setAttribute(a,r);}}}
function jzWalk(root){if(root.nodeType===3){jzNode(root);return;}if(root.nodeType!==1||JZ_SKIP[root.nodeName])return;jzAttr(root);
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);let n;
  while((n=tw.nextNode())){if(n.nodeType===3)jzNode(n);else jzAttr(n);}}
function jzStart(){if(JZ.lang==="hr")return;jzBuild();document.documentElement.lang="de";document.title=jzT(document.title);
  jzWalk(document.body);
  JZ.obs=new MutationObserver(ms=>{for(const m of ms){
    if(m.type==="characterData")jzNode(m.target);
    else if(m.type==="attributes"){const v=m.target.getAttribute(m.attributeName);if(v){const r=jzT(v);if(r!==v)m.target.setAttribute(m.attributeName,r);}}
    else for(const a of m.addedNodes)jzWalk(a);}});
  JZ.obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["title","placeholder","aria-label"]});
  /* painted labels: 3D signs, map names, postcards, compass */
  const P=CanvasRenderingContext2D.prototype;for(const f of ["fillText","strokeText","measureText"]){const o=P[f];P[f]=function(t,...a){return o.call(this,typeof t==="string"?jzT(t):t,...a);};}
  for(const f of ["alert","confirm","prompt"]){const o=window[f];if(o)window[f]=function(t,...a){return o.call(window,jzT(t),...a);};}}
function jzSet(l){if(l===JZ.lang)return;try{localStorage.setItem("otok-prica-jezik",l);}catch(e){}try{save();}catch(e){}
  toast(l==="de"?"Sprache: Deutsch …":"Jezik: hrvatski …",1500);setTimeout(()=>location.reload(),350);}
/* picker row in the sound and picture sheet (Zvuk i grafika) */
{const _ss=sheetSound;sheetSound=function(){_ss.apply(this,arguments);const b=$("sheetBody");if(!b||$("jzRow"))return;const d=document.createElement("div");d.className="field";d.id="jzRow";d.setAttribute("data-notr","1");
  d.innerHTML='<label>'+(JZ.lang==="de"?"Sprache":"Jezik")+' · Language</label><div class="row">'+JZ_LANGS.map(o=>'<button class="btn '+(JZ.lang===o[0]?'green':'soft')+'" data-jz="'+o[0]+'">'+o[2]+' '+o[1]+'</button>').join("")+'</div>';
  const g=$("gfxRow");if(g&&g.parentNode===b)b.insertBefore(d,g);else b.appendChild(d);
  d.querySelectorAll("button").forEach(x=>x.onclick=()=>{sfx.click();jzSet(x.dataset.jz);});};}
/* spelling game: German words, alphabet and look-alike letters; read aloud with a German voice */
if(JZ.lang==="de"&&typeof SLW!=="undefined"){
  const W=[["ZUG","🚂"],["EIS","🍦"],["HUND","🐶"],["MAUS","🐭"],["BALL","⚽"],["BOOT","⛵"],["MOND","🌙"],["BAUM","🌳"],["FISCH","🐟"],["KATZE","🐱"],["IGEL","🦔"],["FROSCH","🐸"],["EULE","🦉"],["MEER","🌊"],["INSEL","🏝️"],
    ["SONNE","☀️"],["BIENE","🐝"],["WOLKE","☁️"],["TORTE","🎂"],["FUCHS","🦊"],["BUCH","📖"],["BLUME","🌸"],["APFEL","🍎"],["DRACHE","🐉"],["BROT","🍞"],["REGEN","🌧️"],["PANDA","🐼"],["BALLON","🎈"],["BURG","🏰"],
    ["KORB","🧺"],["GITARRE","🎸"],["MUSCHEL","🐚"],["PINGUIN","🐧"],["STERN","⭐"],["ZAUBER","✨"],["SCHILDKRÖTE","🐢"],["SCHMETTERLING","🦋"],["ELEFANT","🐘"],["DINOSAURIER","🦕"],["REGENBOGEN","🌈"],["WALD","🌲"],["WAL","🐋"],["HASE","🐰"]];
  SLW.length=0;W.forEach(w=>SLW.push(w));
  SLABC.length=0;"ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split("").forEach(c=>SLABC.push(c));
  Object.assign(SLSIM,{A:"Ä",Ä:"A",O:"Ö",Ö:"O",U:"Ü",Ü:"U",C:"G",G:"C",S:"Z",Z:"S",V:"W",W:"V"});
  slSay=function(w){try{const ss=window.speechSynthesis;if(!ss||muted)return;const v=ss.getVoices().find(v=>/^de/i.test(v.lang));if(!v)return;const u=new SpeechSynthesisUtterance(w.toLowerCase());u.voice=v;u.lang=v.lang;u.rate=.85;ss.cancel();ss.speak(u);}catch(e){}};}
/* German plural for pages and compass letters (single letters are never looked up) */
if(JZ.lang==="de"){plural=n=>n===1?"Seite":"Seiten";
  if(typeof KPDIR!=="undefined"){const k=["N","NO","O","SO","S","SW","W","NW"];k.forEach((v,i)=>KPDIR[i]=v);}}
jzStart();
