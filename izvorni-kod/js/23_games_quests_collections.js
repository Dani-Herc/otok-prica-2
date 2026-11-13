/* =================== GAMES, QUESTS, COLLECTIONS =================== */
const G2={mode:null,hold:false,cam:false};
const RAR=[{n:"Obično",c:"#7d8796"},{n:"Neobično",c:"#3a9c4a"},{n:"Rijetko",c:"#2d78c8"},{n:"Epsko",c:"#7a52c7"},{n:"Legendarno",c:"#d99a00"}];
const COIN_SVG='<svg class="ico" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M3 0h4v1h2v2h1v4H9v2H7v1H3V9H1V7H0V3h1V1h2z"/><path fill="#ffc53d" d="M3 1h4v1h1v1h1v4H8v1H7v1H3V8H2V7H1V3h1V2h1z"/><path fill="#fff1a8" d="M3 2h2v1H4v2H3z"/><path fill="#c98a00" d="M6 3h1v4H6z"/></svg>';
const TIX_SVG='<svg class="ico" viewBox="0 0 12 9" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M0 1h12v3h-1v1h1v3H0V5h1V4H0z"/><path fill="#ff7fa8" d="M1 2h10v1h-1v3h1v1H1V6h1V3H1z"/><path fill="#fff" d="M4 3h1v3H4zM6 3h3v1H6zM6 5h2v1H6z"/></svg>';
const BOOK_SVG='<svg class="ico" viewBox="0 0 12 10" shape-rendering="crispEdges" aria-hidden="true"><path fill="#16243a" d="M0 1h5v1h1V1h1V0h5v9H7v1H5V9H0z"/><path fill="#fff" d="M1 2h4v1h1v5H5V8H1zM7 1h4v7H7v1H6V3h1z"/></svg>';
const CHEST_SVG='<svg class="chest" viewBox="0 0 13 12" shape-rendering="crispEdges" aria-hidden="true"><g><path fill="#16243a" d="M0 5h13v7H0z"/><path fill="#a8642e" d="M1 6h11v5H1z"/><path fill="#8a4f22" d="M1 8h11v1H1z"/><path fill="#ffc53d" d="M5 5h3v3H5z"/><path fill="#16243a" d="M6 6h1v1H6z"/></g><g class="lid"><path fill="#16243a" d="M1 0h11v1h1v4H0V1h1z"/><path fill="#c47a3a" d="M1 1h11v3H1z"/><path fill="#ffc53d" d="M5 1h3v4H5z"/></g></svg>';
const ARR={l:'<svg viewBox="0 0 10 10" aria-hidden="true"><path fill="#16243a" d="M7.5 1L1.5 5l6 4z"/></svg>',r:'<svg viewBox="0 0 10 10" aria-hidden="true"><path fill="#16243a" d="M2.5 1l6 4-6 4z"/></svg>',u:'<svg viewBox="0 0 10 10" aria-hidden="true"><path fill="#16243a" d="M1 7.5L5 1.5l4 6z"/></svg>'};
function kart(n){return n%10===1&&n%100!==11?"karta":(n%10>=2&&n%10<=4&&(n%100<12||n%100>14))?"karte":"karata";}
function seeded(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return ()=>{h=(Math.imul(h,1664525)+1013904223)>>>0;return h/4294967296;};}
function T0(){const d=today();if(!S.today||S.today.d!==d)S.today={d,pages:0,ans:0,treasure:0,fish:0,stars:0,greet:0,blocks:0};return S.today;}
function texFrom(cv){const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;return t;}

/* ---- icon painter (clean outlined vector style, matches the HUD) ---- */
const icvC={},icC={};
function icv(sh,c){const key=sh+"|"+c.join(",");if(icvC[key])return icvC[key];const cv=document.createElement("canvas");cv.width=cv.height=96;const x=cv.getContext("2d");
  x.lineWidth=5;x.lineJoin="round";x.lineCap="round";x.strokeStyle="#16243a";
  const F=col=>{x.fillStyle=col;x.fill();x.stroke();};
  const E=(cx,cy,rx,ry,rot)=>{x.beginPath();x.ellipse(cx,cy,rx,ry,rot||0,0,Math.PI*2);};
  const P=pts=>{x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();};
  const L=(pts,w,col)=>{x.save();x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.lineWidth=w||5;if(col)x.strokeStyle=col;x.stroke();x.restore();};
  const hi=(cx,cy,r)=>{x.save();x.globalAlpha=.75;x.fillStyle="#fff";E(cx,cy,r,r*.6,-.5);x.fill();x.restore();};
  const starPts=(cx,cy,R,r)=>{const a=[];for(let k=0;k<10;k++){const t=-Math.PI/2+k*Math.PI/5,rr=k%2?r:R;a.push([cx+Math.cos(t)*rr,cy+Math.sin(t)*rr]);}return a;};
  switch(sh){
  case"shell":x.beginPath();x.moveTo(48,84);x.lineTo(15,46);x.arc(48,46,33,Math.PI,0);x.closePath();F(c[0]);for(let k=1;k<5;k++){const a=Math.PI+k*Math.PI/5;L([[48,80],[48+Math.cos(a)*30,46+Math.sin(a)*30]],3.5);}x.beginPath();x.rect(38,78,20,10);F(c[1]);hi(34,30,6);break;
  case"star":P(starPts(48,52,40,18));F(c[0]);x.fillStyle=c[1];for(let k=0;k<5;k++){const a=-Math.PI/2+k*Math.PI*2/5;E(48+Math.cos(a)*19,52+Math.sin(a)*19,4,4);x.fill();}E(48,52,5,5);x.fill();break;
  case"gstar":P(starPts(48,50,42,19));F(c[0]);x.save();P(starPts(48,50,42,19));x.clip();x.fillStyle=c[1];E(36,34,14,10,-.6);x.fill();x.restore();P(starPts(48,50,42,19));x.stroke();break;
  case"snail":x.beginPath();x.moveTo(12,76);x.quadraticCurveTo(10,60,30,62);x.lineTo(84,66);x.quadraticCurveTo(90,80,76,82);x.lineTo(14,82);x.closePath();F(c[1]);L([[22,62],[16,44]],4);L([[28,62],[28,42]],4);E(56,46,26,26);F(c[0]);x.save();x.beginPath();for(let a=0;a<Math.PI*4.6;a+=.2){const r=23-a*1.5;x.lineTo(56+Math.cos(a)*r,46+Math.sin(a)*r);}x.lineWidth=3.5;x.stroke();x.restore();break;
  case"pearl":x.beginPath();x.moveTo(8,56);x.quadraticCurveTo(48,98,88,56);x.closePath();F(c[1]);E(48,48,19,19);F(c[0]);hi(41,41,7);break;
  case"acorn":E(48,60,20,24);F(c[0]);x.beginPath();x.moveTo(22,46);x.quadraticCurveTo(48,12,74,46);x.closePath();F(c[1]);L([[48,24],[56,10]],5);hi(40,62,5);break;
  case"mushroom":x.beginPath();x.rect(38,50,20,32);F(c[1]);x.beginPath();x.moveTo(10,56);x.quadraticCurveTo(12,12,48,12);x.quadraticCurveTo(84,12,86,56);x.closePath();F(c[0]);x.fillStyle="#fff";[[30,34,6],[54,24,5],[66,44,6],[44,46,4]].forEach(d=>{E(d[0],d[1],d[2],d[2]);x.fill();});break;
  case"feather":E(50,46,16,40,.62);F(c[0]);x.save();E(50,46,16,40,.62);x.clip();x.fillStyle=c[1];E(62,32,10,26,.62);x.fill();x.restore();E(50,46,16,40,.62);x.stroke();L([[20,88],[76,12]],4);break;
  case"leaf":x.beginPath();x.moveTo(16,82);x.quadraticCurveTo(14,22,82,12);x.quadraticCurveTo(78,76,16,82);x.closePath();F(c[0]);L([[16,82],[66,30]],3.5,c[1]);L([[34,62],[30,42]],3,c[1]);L([[46,50],[62,52]],3,c[1]);x.beginPath();x.moveTo(16,82);x.quadraticCurveTo(14,22,82,12);x.quadraticCurveTo(78,76,16,82);x.stroke();break;
  case"clover":L([[48,50],[58,90]],7);L([[48,50],[58,90]],3,"#3fae52");[[48,27],[70,46],[48,65],[26,46]].forEach(p=>{E(p[0],p[1],15,15);F(c[0]);});E(48,46,6,6);F(c[1]);break;
  case"flint":P([[18,70],[32,22],[62,12],[82,42],[68,82],[34,86]]);F(c[0]);L([[33,24],[46,56],[68,80]],4,c[1]);L([[46,56],[80,44]],4,c[1]);P([[18,70],[32,22],[62,12],[82,42],[68,82],[34,86]]);x.stroke();break;
  case"snow":E(48,48,38,38);F(c[1]);for(let k=0;k<3;k++){const a=k*Math.PI/3+Math.PI/6;const ex=Math.cos(a)*28,ey=Math.sin(a)*28;L([[48+ex,48+ey],[48-ex,48-ey]],6,c[0]);[1,-1].forEach(s=>{const bx=48+ex*.6*s,by=48+ey*.6*s;L([[bx,by],[bx+Math.cos(a+.8*s)*-8*s,by+Math.sin(a+.8*s)*-8*s]],4,c[0]);});}break;
  case"amethyst":[[30,86,22,44,-.28,1],[66,86,20,38,.3,1],[48,86,26,66,0,0]].forEach(s=>{const [bx,by,w,h,r,k]=s;x.save();x.translate(bx,by);x.rotate(r);P([[-w/2,0],[-w/2,-h*.72],[0,-h],[w/2,-h*.72],[w/2,0]]);F(c[k]);L([[0,-h],[0,0]],2.5,"rgba(255,255,255,.6)");x.restore();});break;
  case"fossil":E(48,50,38,32);F(c[1]);x.save();x.beginPath();for(let a=0;a<Math.PI*4.2;a+=.15){const r=26-a*1.8;x.lineTo(48+Math.cos(a)*r,50+Math.sin(a)*r*.85);}x.lineWidth=5;x.strokeStyle=c[0];x.stroke();x.restore();break;
  case"nugget":P([[16,62],[24,34],[50,20],[76,30],[84,58],[62,80],[30,80]]);F(c[0]);hi(40,40,10);x.fillStyle=c[1];E(64,58,6,4);x.fill();break;
  case"egg":E(48,52,27,36);F(c[0]);x.fillStyle=c[1];[[38,34,6],[60,46,7],[40,64,6],[60,72,4]].forEach(d=>{E(d[0],d[1],d[2],d[2]);x.fill();});E(48,52,27,36);x.stroke();hi(36,32,6);break;
  case"long":P([[6,28],[26,48],[6,68]]);F(c[0]);E(52,48,34,16);F(c[0]);x.save();E(52,48,34,16);x.clip();x.fillStyle=c[1];x.fillRect(14,51,84,20);x.restore();E(52,48,34,16);x.stroke();P([[42,33],[54,20],[62,34]]);F(c[0]);E(72,44,4.5,4.5);x.fillStyle="#16243a";x.fill();L([[82,52],[76,54]],3);break;
  case"round":P([[4,28],[24,48],[4,68]]);F(c[0]);E(50,48,31,28);F(c[0]);x.save();E(50,48,31,28);x.clip();x.fillStyle=c[1];x.fillRect(34,16,10,66);x.fillRect(54,16,8,66);x.restore();E(50,48,31,28);x.stroke();E(67,40,6,6);x.fillStyle="#fff";x.fill();x.stroke();E(68,40,2.4,2.4);x.fillStyle="#16243a";x.fill();break;
  case"crab":for(let k=0;k<3;k++){L([[32,64+k*4],[12-k*2,74+k*6]],5);L([[64,64+k*4],[84+k*2,74+k*6]],5);}L([[30,58],[20,40]],6);L([[66,58],[76,40]],6);E(48,62,28,18);F(c[0]);[[18,34],[78,34]].forEach(p=>{E(p[0],p[1],12,10);F(c[0]);});x.fillStyle=c[1];E(48,58,14,6);x.fill();L([[40,46],[38,32]],4);L([[56,46],[58,32]],4);[[38,30],[58,30]].forEach(p=>{E(p[0],p[1],5,5);x.fillStyle="#fff";x.fill();x.stroke();});break;
  case"octo":for(let k=0;k<5;k++){const bx=22+k*13;x.save();x.beginPath();x.moveTo(bx,50);x.quadraticCurveTo(bx+(k%2?10:-10),72,bx+(k%2?-4:4),88);x.lineWidth=12;x.stroke();x.lineWidth=6;x.strokeStyle=c[0];x.stroke();x.restore();}E(48,38,27,27);F(c[0]);[[38,40],[58,40]].forEach(p=>{E(p[0],p[1],6,6);x.fillStyle="#fff";x.fill();x.stroke();E(p[0]+1,p[1]+1,2.4,2.4);x.fillStyle="#16243a";x.fill();});x.fillStyle=c[1];E(38,22,7,4,-.4);x.fill();break;
  case"balloon":L([[34,64],[40,80]],3);L([[62,64],[56,80]],3);E(48,40,30,33);F(c[0]);x.save();E(48,40,30,33);x.clip();x.fillStyle=c[1];x.fillRect(30,0,11,80);x.fillRect(56,0,11,80);x.restore();E(48,40,30,33);x.stroke();x.beginPath();x.rect(37,78,22,13);F("#a86b3a");break;
  case"wizard":x.beginPath();x.moveTo(16,76);x.lineTo(80,76);x.lineTo(58,10);x.closePath();F(c[0]);E(48,78,40,9);F(c[0]);x.fillStyle=c[1];[[50,46],[62,62],[38,62]].forEach(p=>{P(starPts(p[0],p[1],7,3));x.fill();});break;
  }
  return icvC[key]=cv;}
function ic(sh,c){const key=sh+"|"+c.join(",");return icC[key]||(icC[key]=icv(sh,c).toDataURL());}

/* ---- content ---- */
const SETS=[
 {k:"more",n:"Blago s plaže",where:"sand",items:[
  {k:"skoljka",n:"Bijela školjka",r:0,sh:"shell",c:["#f6efe2","#e0c9a8"]},{k:"rozaskoljka",n:"Ružičasta školjka",r:0,sh:"shell",c:["#f7a9ba","#fbd5dc"]},
  {k:"zvjezdaca",n:"Morska zvijezda",r:1,sh:"star",c:["#f28a3c","#ffd08a"]},{k:"puz",n:"Puževa kućica",r:1,sh:"snail",c:["#d9a05a","#f2e0c0"]},
  {k:"biser",n:"Biser",r:2,sh:"pearl",c:["#ffffff","#b9a3d9"]},{k:"zlatnaskoljka",n:"Zlatna školjka",r:3,sh:"shell",c:["#ffc53d","#fff0a8"]}]},
 {k:"suma",n:"Šumsko blago",where:"grass",items:[
  {k:"zir",n:"Žir",r:0,sh:"acorn",c:["#c27c3c","#7a4a24"]},{k:"list",n:"Jesenski list",r:0,sh:"leaf",c:["#ec8a2e","#a8401e"]},
  {k:"crvgljiva",n:"Crvena gljiva",r:1,sh:"mushroom",c:["#d94d43","#f4ead8"]},{k:"pero",n:"Plavo pero",r:1,sh:"feather",c:["#3f8fe0","#a8d4ff"]},
  {k:"djetelina",n:"Djetelina s četiri lista",r:2,sh:"clover",c:["#3fae52","#ffd23a"]},{k:"vila",n:"Krilce vile",r:3,sh:"feather",c:["#c7a0ff","#ffe6ff"]}]},
 {k:"planina",n:"Blago s planine",where:"stone",items:[
  {k:"kremen",n:"Kremen",r:0,sh:"flint",c:["#8a8f98","#c8ccd2"]},{k:"snjezni",n:"Snježni kristal",r:0,sh:"snow",c:["#2d78c8","#e3f3ff"]},
  {k:"ametist",n:"Ametist",r:1,sh:"amethyst",c:["#9a5ad0","#d2a8ff"]},{k:"fosil",n:"Fosil puža",r:1,sh:"fossil",c:["#7a5a3a","#d8c4a0"]},
  {k:"grumen",n:"Zlatni grumen",r:2,sh:"nugget",c:["#ffc53d","#fff3b0"]},{k:"jaje",n:"Zmajevo jaje",r:3,sh:"egg",c:["#3fae8a","#ffd23a"]}]}];
const ALLIT={};SETS.forEach(s=>s.items.forEach(it=>{it.set=s.k;ALLIT[it.k]=it;}));
const FISH=[
 {k:"srdela",n:"Srdela",r:0,s:[12,20],c:["#8fb6d6","#e3eef6"],sh:"long"},{k:"usata",n:"Ušata",r:0,s:[15,26],c:["#b9c2c9","#5a6470"],sh:"round"},
 {k:"bukva",n:"Bukva",r:0,s:[15,30],c:["#a9c47f","#f0dc84"],sh:"long"},{k:"cipal",n:"Cipal",r:0,s:[25,50],c:["#7f93a6","#d3dce4"],sh:"long"},
 {k:"orada",n:"Orada",r:1,s:[25,45],c:["#c9d3dc","#f0c040"],sh:"round"},{k:"lubin",n:"Lubin",r:1,s:[30,70],c:["#8ea5b8","#eef3f7"],sh:"long"},
 {k:"rak",n:"Rak",r:1,s:[8,18],c:["#d9573f","#f5a06a"],sh:"crab"},{k:"hobotnica",n:"Hobotnica",r:2,s:[40,90],c:["#c76b8a","#f4c0d0"],sh:"octo"},
 {k:"zubatac",n:"Zubatac",r:2,s:[40,90],c:["#c58aa4","#6aa8de"],sh:"long"},{k:"jastog",n:"Jastog",r:2,s:[25,50],c:["#3d5f9e","#e0b040"],sh:"crab"},
 {k:"mjesecarka",n:"Mjesečeva riba",r:3,s:[80,180],c:["#b8c4d6","#f2f5fa"],sh:"round"},{k:"lignja",n:"Svjetleća lignja",r:3,s:[20,40],c:["#7fe9e0","#e0fffb"],sh:"octo",night:1},
 {k:"zlatna",n:"Zlatna ribica",r:4,s:[10,15],c:["#ffc53d","#ff8a1f"],sh:"round"}];
const HATS=[{k:"vijenac",n:"Cvjetni vijenac",p:60},{k:"carobnjak",n:"Čarobnjačka kapa",p:120},{k:"detektiv",n:"Detektivski šešir",p:150},{k:"pirat",n:"Piratski šešir",p:150},
 {k:"propeler",n:"Kapa s propelerom",p:220},{k:"kruna",n:"Zlatna kruna",p:350},{k:"astronaut",n:"Svemirska kaciga",p:500}];
const QPOOL=[
 {k:"pages10",t:"Pročitaj 10 stranica",n:10,c:"pages",r:20,read:1},{k:"pages25",t:"Pročitaj 25 stranica",n:25,c:"pages",r:45,tk:1,read:1},
 {k:"ans",t:"Odgovori Ridi na pitanje o knjizi",n:1,c:"ans",r:15},{k:"tr3",t:"Pronađi 3 blaga na otoku",n:3,c:"treasure",r:20},
 {k:"fish2",t:"Ulovi 2 ribe na molu",n:2,c:"fish",r:20},{k:"stars15",t:"Skupi 15 zvjezdica u letu balonom",n:15,c:"stars",r:25},
 {k:"greet3",t:"Pozdravi 3 životinje (dodirni ih)",n:3,c:"greet",r:10},{k:"blocks8",t:"Postavi 8 kockica u gradnji",n:8,c:"blocks",r:15},
 {k:"mine12",t:"Iskopaj 12 kockica s Ridom",n:12,c:"mine",r:15},{k:"craft1",t:"Napravi nešto u radionici",n:1,c:"craft",r:15},
 {k:"plant3",t:"Posadi 3 sjemenke s Ridom",n:3,c:"plant",r:15},{k:"harv4",t:"Uberi 4 ploda u vrtu",n:4,c:"harvest",r:15},{k:"feed2",t:"Nahrani 2 životinje",n:2,c:"feed",r:15},{k:"sell5",t:"Prodaj svraki Sjajki 5 stvari",n:5,c:"sell",r:15}];

/* ---- economy & quests ---- */
function earnPages(delta,oldLv){T0().pages+=delta;S.coins+=delta;S.ticketPages=(S.ticketPages||0)+delta;let got=0;
  let bg=null;while(S.ticketPages>=10){S.ticketPages-=10;if(S.tickets<12){S.tickets++;got++;}bg=bg||{};const B=bag();B.daske=(B.daske||0)+6;bg.daske=(bg.daske||0)+6;
    const NICE=["kamen","kaldrma","pijesak","trava","zemlja","staza","drvo","lisce","mahovina","sljunak","glina"];const pool=unlockList().filter(k=>k!=="daske"&&(NICE.includes(k)||(PALETTE.find(p=>p[0]===k)||[])[1]));for(let i=0;i<2&&pool.length;i++){const k=pool.splice(Math.floor(Math.random()*pool.length),1)[0];B[k]=(B[k]||0)+3;bg[k]=(bg[k]||0)+3;}
    const m=Math.random(),mk=m<.5?"ugljen":m<.72?"stap":m<.9?"bakar":"zeljezo",mn=mk==="stap"?4:1;giveN(mk,mn);bg[mk]=(bg[mk]||0)+mn;}
  const lv=level()-oldLv;if(lv>0){S.tickets=Math.min(12,S.tickets+lv);S.coins+=20*lv;}
  const ripe=typeof farmRead==="function"?farmRead(delta):0;
  G2.earn={c:delta+Math.max(0,lv)*20,t:got+Math.max(0,lv),b:bg,farm:S.farm&&S.farm.length?{n:S.farm.length,ripe}:null};questCheck();}
function earnLine(){const e=G2.earn;G2.earn=null;if(!e)return "";const bt=G2.bonusT;G2.bonusT=false;
  return '<div class="earn">'+COIN_SVG+'<b>+'+e.c+'</b>'+(e.t?TIX_SVG+'<b>+'+e.t+'</b><span>'+kart(e.t)+' za igre!</span>':'<span>Još '+(10-(S.ticketPages||0))+' '+plural(10-(S.ticketPages||0))+' do nove karte i kockica</span>')+'</div>'+
    (e.b?'<div class="bagline"><span>U torbu za gradnju:</span>'+Object.keys(e.b).map(k=>'<i><img alt="" src="'+thingIcon(k)+'">+'+e.b[k]+' '+esc(thingName(k))+'</i>').join("")+'</div>':'')+
    (e.farm?'<div class="bagline farmline"><img alt="" src="'+itemIcon("mrkva")+'"><span>'+(e.farm.ripe?'<b>Vrt je dozrio!</b> '+e.farm.ripe+' '+(e.farm.ripe===1?"biljka je spremna":"biljke su spremne")+' za berbu.':'Tvoj vrt je narastao za '+e.c+' '+(e.c%10===1&&e.c%100!==11?"korak":"koraka")+'.')+'</span></div>':'')+
    (bt?'<p class="muted"><b>Čitanje je otkrilo nova blaga na otoku!</b> Pritisni Istraži i potraži ih s Ridom.</p>':'');}
function quests(){const d=today();if(!S.quests||S.quests.d!==d){const r=seeded(d+"|"+(S.created||""));const first=r()<.55?"pages10":"pages25";
  const rest=QPOOL.filter(q=>!q.read&&(q.k!=="greet3"||S.visitors.length>=2));for(let i=rest.length-1;i>0;i--){const j=Math.floor(r()*(i+1));const t=rest[i];rest[i]=rest[j];rest[j]=t;}
  S.quests={d,list:[first,rest[0].k,rest[1].k].map(k=>({k,claimed:false,note:false}))};}return S.quests;}
const qdef=k=>QPOOL.find(q=>q.k===k);
function qprog(q){const D=qdef(q.k);return Math.min(D.n,T0()[D.c]||0);}
function claimable(){return quests().list.filter(q=>!q.claimed&&qprog(q)>=qdef(q.k).n).length;}
function bump(c,n){T0()[c]=(T0()[c]||0)+(n||1);questCheck();save();}
function questCheck(){for(const q of quests().list){const D=qdef(q.k);if(!q.note&&qprog(q)>=D.n){q.note=true;setTimeout(()=>{toast("Zadatak izvršen: "+D.t+"! Otvori škrinju u Zadacima.");sfx.chime();},700);}}renderEco();}
function renderEco(){if(!$("coinN"))return;$("coinN").textContent=S.coins;$("tixN").textContent=S.tickets;const c=claimable();$("qBadge").textContent=c;$("qBadge").hidden=!c;
  $("gBadge").textContent=S.tickets;$("gBadge").hidden=!S.tickets;}
function scr(v){const p=v.clone().project(camera);return {x:(p.x+1)/2*innerWidth,y:(1-p.y)/2*innerHeight};}
function flyCoins(n,from){const r=$("coinChip").getBoundingClientRect();const k=Math.min(10,Math.max(3,Math.ceil(n/5)));
  for(let i=0;i<k;i++){const d=document.createElement("div");d.className="flycoin";d.innerHTML=COIN_SVG;document.body.appendChild(d);const ox=(Math.random()-.5)*110,oy=-30-Math.random()*60;
    if(!d.animate){d.remove();continue;}
    const a=d.animate([{transform:"translate("+from.x+"px,"+from.y+"px) scale(.5)"},{transform:"translate("+(from.x+ox)+"px,"+(from.y+oy)+"px) scale(1.25)",offset:.35},{transform:"translate("+(r.left+12)+"px,"+(r.top+8)+"px) scale(.8)"}],{duration:750+i*70,easing:"cubic-bezier(.5,0,.6,1)",fill:"forwards"});
    a.onfinish=()=>{d.remove();tone(1300+i*50,.05,"triangle",.022);if(i===k-1){const ch=$("coinChip");ch.classList.remove("bump");void ch.offsetWidth;ch.classList.add("bump");}};}}
function noTickets(){toast("Nemaš karata za igre. Pročitaj 10 stranica i dobit ćeš novu!");sfx.click();}

/* ---- treasures hidden on the island ---- */
const treasures=[],tMats={};
const glowMatT=new THREE.SpriteMaterial({map:GLOW,color:0xfff0b0,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.6});
function tMat(k){if(tMats[k])return tMats[k];const it=ALLIT[k];return tMats[k]=new THREE.SpriteMaterial({map:texFrom(icv(it.sh,it.c)),transparent:true,depthWrite:false});}
function pickItem(set){const ws=[50,30,15,5];let tot=0;set.items.forEach(i=>tot+=ws[i.r]);let v=Math.random()*tot;for(const i of set.items){v-=ws[i.r];if(v<=0)return i;}return set.items[0];}
function findSpot(where){for(let n=0;n<600;n++){const x=2+Math.floor(Math.random()*(W-4)),z=2+Math.floor(Math.random()*(W-4));if(mask[x+z*W])continue;if(biome[x+z*W])continue;if(Math.hypot(x-CX,z-CZ)>islandR(Math.atan2(z-CZ,x-CX))+1)continue;const h=hmap[x+z*W];const top=vox[I(x,h-1,z)];if(get(x,h,z))continue;
  if(where==="sand"&&!(top===T.pijesak&&h<=SL+4))continue;if(where==="grass"&&top!==T.trava)continue;if(where==="stone"&&!((top===T.kamen||top===T.snijeg)&&h>=SL+9))continue;
  if(S.spawns.some(s=>Math.hypot(s.x-x,s.z-z)<8))continue;return [x+.5,h,z+.5];}return null;}
function spawnTreasures(n){const off=Math.floor(Math.random()*3);for(let i=0;i<n;i++){const set=SETS[(i+off)%3];const it=pickItem(set);const p=findSpot(set.where)||findSpot("grass");if(!p)continue;
  S.spawns.push({id:"t"+Date.now().toString(36)+i+Math.floor(Math.random()*999),k:it.k,x:p[0],y:p[1],z:p[2]});}save();syncTreasures();}
function dailyTreasures(){const d=today();if(S.spawnDay!==d){S.spawnDay=d;S.spawns=S.spawns.filter(x=>!x.islet).slice(-4).concat(S.spawns.filter(x=>x.islet));spawnTreasures(4);}else syncTreasures();isletTreasures();}
function isletSpot(q){for(let n=0;n<300;n++){const a=Math.random()*6.283,r=Math.random()*q.r*.6;const x=Math.floor(q.x+Math.cos(a)*r),z=Math.floor(q.z+Math.sin(a)*r);const h=hmap[x+z*W];if(h<SL+3)continue;if(get(x,h,z)||get(x,h+1,z))continue;const top=vox[I(x,h-1,z)];if(!top||TYPES[top].leaf)continue;return [x+.5,h,z+.5];}return null;}
function isletTreasures(){const d=today();S.isletDay=S.isletDay||{};let add=false;ISLETS.forEach((q,i)=>{if(S.isletDay[i]===d||S.spawns.some(x=>x.islet===i+1))return;const p=isletSpot(q);if(!p)return;
  const pool=Object.values(ALLIT).filter(it=>it.r>=1);const it=pool[Math.floor(Math.random()*pool.length)];S.spawns.push({id:"i"+Date.now().toString(36)+i,k:it.k,x:p[0],y:p[1],z:p[2],islet:i+1});S.isletDay[i]=d;add=true;});
  if(add){save();syncTreasures();}}
function bonusTreasures(){const d=today();if(S.spawnBonus===d)return false;S.spawnBonus=d;spawnTreasures(4);return true;}
function syncTreasures(){for(let i=treasures.length-1;i>=0;i--){const t=treasures[i];if(!t.leaving&&!S.spawns.find(s=>s.id===t.id)){scene.remove(t.g);treasures.splice(i,1);}}
  for(const s of S.spawns){if(treasures.find(t=>t.id===s.id))continue;const g=new THREE.Group();const gl=new THREE.Sprite(glowMatT);gl.scale.set(3.4,3.4,1);g.add(gl);const sp=new THREE.Sprite(tMat(s.k));sp.scale.set(1.5,1.5,1);g.add(sp);
    if(s.islet){const bm=new THREE.Mesh(new THREE.CylinderGeometry(.16,.34,18,12,1,true),new THREE.MeshBasicMaterial({color:0xffd36b,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));bm.position.y=8;bm.userData.noAO=1;bm.renderOrder=4;g.add(bm);}
    g.position.set(s.x,s.y+1.15,s.z);scene.add(g);treasures.push({id:s.id,k:s.k,g,sp,by:s.y+1.15,ph:Math.random()*9,islet:s.islet});}}
function tickTreasures(dt,t){for(let i=treasures.length-1;i>=0;i--){const tr=treasures[i];
  if(tr.leaving){tr.lt+=dt;const k=tr.lt/.55;tr.g.position.y+=dt*7;const s=1.5*(1+k);tr.sp.scale.set(s,s,1);tr.g.children[0].scale.set(3.4*(1-k)+.01,3.4*(1-k)+.01,1);if(k>=1){scene.remove(tr.g);treasures.splice(i,1);}continue;}
  tr.g.position.y=tr.by+Math.sin(t*2.2+tr.ph)*.2;const s=1.5+Math.sin(t*3+tr.ph)*.08;tr.sp.scale.set(s,s,1);
  if(Math.random()<dt*3)burst(tr.g.position.x+(Math.random()-.5)*1.4,tr.g.position.y+(Math.random()-.5),tr.g.position.z+(Math.random()-.5)*1.4,1,[[1,.95,.6],[1,1,1]],.15,.7,1,-.3);}}
function tapTreasure(e){let best=null,bd=small?52:42;for(const tr of treasures){if(tr.leaving)continue;const p=tr.g.position.clone().project(camera);if(p.z>1||Math.abs(p.x)>1.1||Math.abs(p.y)>1.1)continue;
    const sx=(p.x+1)/2*innerWidth,sy=(1-p.y)/2*innerHeight,d=Math.hypot(sx-e.clientX,sy-e.clientY);if(d<bd){bd=d;best={tr,sx,sy};}}
  if(!best)return false;sfx.click();toast(best.tr.islet?"To blago je na otočiću! Pritisni Istraži i otplivaj do njega s Ridom.":"Blago skuplja Rida! Pritisni Istraži i dotrči do onoga što svjetluca.",4500);return true;}
function collectTreasure(tr,pos){S.spawns=S.spawns.filter(x=>x.id!==tr.id);tr.leaving=true;tr.lt=0;
  const it=ALLIT[tr.k];const isNew=!S.found[it.k];S.found[it.k]=(S.found[it.k]||0)+1;let coins=[4,8,15,30][it.r],extra="";if(tr.islet){coins*=2;const B=bag();B.daske=(B.daske||0)+8;extra=" i 8 dasaka";}S.coins+=coins;T0().treasure++;save();
  burst(tr.g.position.x,tr.g.position.y,tr.g.position.z,36,[[1,.9,.4],[1,1,1],[.7,.9,1]],2.4,2.6,.9);[880,1175,1568,2093].forEach((f,i)=>tone(f,.2,"triangle",.045,i*.07));
  flyCoins(coins,pos);showFind(ic(it.sh,it.c),(isNew?"Novo u zbirci! ":"")+it.n,RAR[it.r],"+"+coins+" zlatnika"+extra);if(tr.islet)fpTools();
  const set=SETS.find(s=>s.k===it.set);if(isNew&&set.items.every(i=>S.found[i.k]))setTimeout(()=>{toast("Zbirka „"+set.n+"“ je potpuna! Nagrada te čeka u Igre → Zbirka.");sfx.fanfare();},1800);
  questCheck();}
let findT=0;
function showFind(img,title,rar,sub){const el=$("findPop");el.innerHTML='<img alt="" src="'+img+'"><div><span class="rar" style="background:'+rar.c+'">'+rar.n+'</span><b>'+esc(title)+'</b><small>'+esc(sub)+'</small></div>';
  el.hidden=false;el.style.animation="none";void el.offsetWidth;el.style.animation="";clearTimeout(findT);findT=setTimeout(()=>el.hidden=true,3200);}

/* ---- shared game mode ---- */
function enterGame(kind){renderEco();G2.mode=kind;mode="game";controls.enabled=false;controls.autoRotate=false;$("mainBar").hidden=true;$("sideBtns").hidden=true;$("camCtl").hidden=true;$("bubble").hidden=true;bubbleE=null;ghost.visible=false;
  if(kind!=="shop")$("gameUI").hidden=false;["fishPanel","balloonPanel","gPop"].forEach(id=>$(id).hidden=true);}
function exitGame(){G2.mode=null;G2.cam=false;G2.hold=false;mode="look";controls.enabled=true;idleT=0;$("mainBar").hidden=false;$("sideBtns").hidden=false;$("camCtl").hidden=false;$("gameUI").hidden=true;$("shopUI").hidden=true;renderHUD();}
function goHome(){flight={from:{t:controls.target.clone(),p:camera.position.clone()},t:HOME.t.clone(),p:homeP(),k:0,d:1.8};}
$("gExit").onclick=()=>{sfx.click();if(G2.mode==="fish")endFishing();else if(G2.mode==="balloon"){if(B.over){exitGame();goHome();}else endBalloon();}};

/* ---- fishing on the pier ---- */
let pier=null,rod=null,bob=null,fline=null;const F={phase:"idle"};const tmpTip=new THREE.Vector3();
function buildPier(){let best=null;for(const da of [-.55,-.42,-.7,-.3,-.85,-1,-.15,.2]){const a=HOMEA+da,dx=Math.cos(a),dz=Math.sin(a);let r0=null;
    for(let r=24;r<76;r+=.5){const x=Math.floor(CX+dx*r),z=Math.floor(CZ+dz*r);if(hmap[x+z*W]<=SL+2){r0=r;break;}}if(r0==null)continue;
    const sx=Math.floor(CX+dx*(r0-2)),sz=Math.floor(CZ+dz*(r0-2));if(hmap[sx+sz*W]>SL+4)continue;let deep=true;for(let k=1;k<11;k++){const x=Math.floor(CX+dx*(r0+k)),z=Math.floor(CZ+dz*(r0+k));if(x<0||z<0||x>=W||z>=W)break;if(hmap[x+z*W]>SL+2)deep=false;}if(!deep)continue;best={dx,dz,r0};break;}
  if(!best)return;const {dx,dz,r0}=best;const deckY=WATER+.62,L=11;const sx=CX+dx*(r0-2.5),sz=CZ+dz*(r0-2.5);const g=new THREE.Group();g.position.set(sx,0,sz);g.rotation.y=Math.atan2(dx,dz);
  const wood=[0xb98a55,0xa87a48,0xc49660].map(c=>std(c));for(let i=0;i<L;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(2.4,.16,.9),wood[i%3]);p.position.set((hash2(i,3,9)-.5)*.1,deckY,i+.5);p.rotation.y=(hash2(i,4,9)-.5)*.04;p.castShadow=p.receiveShadow=true;g.add(p);}
  const postM=std(0x6b4a2a);for(let i=.3;i<L;i+=2.6)[-1.1,1.1].forEach(xx=>{const ps=new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,3.6,6),postM);ps.position.set(xx,deckY-1.5,i);ps.castShadow=true;g.add(ps);});
  const lp=new THREE.Mesh(postGeo,postMat);lp.position.set(1.05,deckY+.9,L-.4);g.add(lp);const lb=new THREE.Mesh(lampGeo,lampMat);lb.position.set(1.05,deckY+1.95,L-.4);g.add(lb);const ls=new THREE.Sprite(glowMatW);ls.position.copy(lb.position);ls.scale.set(4.4,4.4,1);g.add(ls);
  const br=new THREE.Mesh(new THREE.CylinderGeometry(.36,.32,.8,10),std(0x8a5a32));br.position.set(-.8,deckY+.48,1.4);br.castShadow=true;g.add(br);const bk=new THREE.Mesh(new THREE.BoxGeometry(.7,.35,.5),std(0x6fa8d8));bk.position.set(-.75,deckY+.25,3);bk.castShadow=true;g.add(bk);
  scene.add(g);for(let i=-1;i<4;i++)for(let w=-3;w<=3;w++){const x=Math.floor(sx+dx*i-dz*w*.6),z=Math.floor(sz+dz*i+dx*w*.6);if(x>=0&&z>=0&&x<W&&z<W&&!mask[x+z*W])mask[x+z*W]=6;}
  pier={g,dx,dz,sx,sz,deckY,end:new THREE.Vector3(sx+dx*(L-1.3),deckY+.08,sz+dz*(L-1.3))};}
function fishProps(){if(rod)return;rod=new THREE.Group();const st=new THREE.Mesh(new THREE.CylinderGeometry(.022,.04,2,5),std(0x7a5233));st.position.y=1;rod.add(st);const reel=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.06,10),std(0x9aa0a8));reel.rotation.z=Math.PI/2;reel.position.y=.3;rod.add(reel);
  const tip=new THREE.Object3D();tip.position.y=2;rod.add(tip);rod.userData.tip=tip;rod.position.set(.16,.55,.5);rod.rotation.x=.85;
  bob=new THREE.Group();bob.add(new THREE.Mesh(new THREE.SphereGeometry(.17,12,6,0,Math.PI*2,0,Math.PI/2),std(0xe8443a)),new THREE.Mesh(new THREE.SphereGeometry(.17,12,6,0,Math.PI*2,Math.PI/2,Math.PI/2),std(0xffffff)));bob.visible=false;scene.add(bob);
  const lg=new THREE.BufferGeometry();lg.setAttribute("position",new THREE.Float32BufferAttribute([0,0,0,0,0,0],3));fline=new THREE.Line(lg,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.85}));fline.frustumCulled=false;fline.visible=false;scene.add(fline);}
function startFishing(){if(!pier){toast("Mol se još gradi.");return;}if(!(S.fishCasts>0)){if(S.tickets<1)return noTickets();S.tickets--;S.fishCasts=3;}save();closeSheet();
  enterGame("fish");fishProps();rida.g.add(rod);rida.frozen=true;rida.goto=null;rida.tx=null;rida.x=pier.end.x;rida.z=pier.end.z;rida.y=pier.end.y;rida.g.position.copy(pier.end);rida.g.rotation.set(0,Math.atan2(pier.dx,pier.dz),0);
  const e=pier.end,sx=-pier.dz,sz=pier.dx;flight={from:{t:controls.target.clone(),p:camera.position.clone()},t:new THREE.Vector3(e.x+pier.dx*4.5,WATER+.4,e.z+pier.dz*4.5),p:new THREE.Vector3(e.x-pier.dx*5.5+sx*4.2,e.y+4.2,e.z-pier.dz*5.5+sz*4.2),k:0,d:1.8};
  F.phase="idle";$("fishPanel").hidden=false;fishUI("Dodirni gumb i baci udicu!");}
function fishUI(msg){$("gTitle").textContent="Ribolov";$("gInfo").innerHTML="Bacanja: <b>"+(S.fishCasts||0)+"</b> · "+TIX_SVG+" "+S.tickets;if(msg!=null)$("fishMsg").textContent=msg;
  const b=$("fishBtn");b.classList.remove("bite");b.style.visibility=(F.phase==="jump"||F.phase==="caught")?"hidden":"";$("reelBox").hidden=F.phase!=="reel";
  if(F.phase==="idle"){if(S.fishCasts>0)b.textContent="Baci udicu";else b.textContent=S.tickets>0?"Još 3 bacanja (1 karta)":"Završi ribolov";}
  else if(F.phase==="cast"||F.phase==="wait")b.textContent="Čekaj…";else if(F.phase==="bite"){b.textContent="Povuci!";b.classList.add("bite");}else if(F.phase==="reel")b.textContent="Drži za namatanje";else b.textContent="…";}
function fishAction(){if(F.phase==="idle"){if(!(S.fishCasts>0)){if(S.tickets>0){S.tickets--;S.fishCasts=3;save();renderEco();fishUI("Nova bacanja! Baci udicu.");}else endFishing();return;}
    S.fishCasts--;save();F.phase="cast";F.t=0;rod.userData.tip.getWorldPosition(tmpTip);F.from=tmpTip.clone();const sx=-pier.dz,sz=pier.dx,d=5+Math.random()*3.5,s=(Math.random()-.5)*4;
    F.to=new THREE.Vector3(pier.end.x+pier.dx*d+sx*s,WATER+.04,pier.end.z+pier.dz*d+sz*s);bob.visible=true;fline.visible=true;[500,380].forEach((f,i)=>tone(f,.12,"sine",.03,i*.08));fishUI("");}
  else if(F.phase==="bite"){F.fish=pickFish();const r=F.fish.r;Object.assign(F,{phase:"reel",z:.5,zt:.5,zw:[.34,.3,.25,.21,.18][r],spd:[.3,.42,.55,.7,.85][r],drain:[.2,.22,.25,.28,.31][r],m:.3,mv:0,p:.3,rt2:0,tick:0});
    G2.hold=true;fishUI(["Nešto malo!","Dobro se bori!","Ovo je jaka riba!","Ogromna je!","Svjetluca… nevjerojatno!"][r]);sfx.click();}}
function pickFish(){const night=(cur.night||0)>.5;const ws=[55,27,13,4.5,.8];const pool=FISH.filter(f=>!f.night||night);const wf=f=>ws[f.r]*(night&&f.r>=2?1.7:1);let tot=0;pool.forEach(f=>tot+=wf(f));let v=Math.random()*tot;for(const f of pool){v-=wf(f);if(v<=0)return f;}return pool[0];}
function tickFish(dt,t){if(!rod)return;rod.userData.tip.getWorldPosition(tmpTip);
  switch(F.phase){
  case"cast":{F.t+=dt;const k=Math.min(1,F.t/.75);bob.position.lerpVectors(F.from,F.to,k);bob.position.y+=Math.sin(k*Math.PI)*2.6;if(k>=1){F.phase="wait";F.wait=1.8+Math.random()*4.2;F.nib=.7+Math.random();burst(F.to.x,WATER+.1,F.to.z,14,[[1,1,1],[.8,.93,1]],1.3,2,.7);sfx.splash();fishUI("Strpljivo… čekaj da zagrize.");}break;}
  case"wait":{F.wait-=dt;F.nib-=dt;let y=WATER+.04+Math.sin(t*2)*.04;if(F.nib<=0){F.nib=.6+Math.random()*1.3;F.jig=.3;tone(260,.05,"sine",.03);}if(F.jig>0){F.jig-=dt;y-=Math.abs(Math.sin(F.jig*30))*.1;}bob.position.set(F.to.x,y,F.to.z);
    if(F.wait<=0){F.phase="bite";F.bt=1.15;[740,990].forEach((f,i)=>tone(f,.1,"square",.035,i*.06));burst(F.to.x,WATER+.1,F.to.z,18,[[1,1,1]],1.6,2.4,.6);fishUI("Grize! Dodirni brzo!");}break;}
  case"bite":{F.bt-=dt;bob.position.set(F.to.x+Math.sin(t*40)*.05,WATER-.22,F.to.z);if(F.bt<=0){F.phase="result";F.rt=1.8;bob.position.y=WATER+.04;fishUI("Pobjegla je… Sljedeći put brže!");}break;}
  case"reel":{F.rt2-=dt;if(F.rt2<=0){F.rt2=.35+Math.random()*(1.2-F.fish.r*.16);F.zt=F.zw/2+Math.random()*(1-F.zw);}const dz=F.zt-F.z;F.z+=Math.sign(dz)*Math.min(Math.abs(dz),F.spd*dt);
    F.mv+=(G2.hold?2.9:-2.5)*dt;F.mv=Math.max(-1.3,Math.min(1.3,F.mv));F.m+=F.mv*dt;if(F.m<0){F.m=0;if(F.mv<0)F.mv=0;}if(F.m>1){F.m=1;if(F.mv>0)F.mv=0;}
    const inZ=Math.abs(F.m-F.z)<F.zw/2;F.p+=(inZ?.3:-F.drain)*dt;F.tick-=dt;if(inZ&&F.tick<=0){F.tick=.11;tone(950+F.p*500,.03,"triangle",.02);}
    $("zone").style.left=((F.z-F.zw/2)*100)+"%";$("zone").style.width=(F.zw*100)+"%";$("mark").style.left=(F.m*100)+"%";$("reelBox").classList.toggle("in",inZ);$("reelProg").style.width=Math.max(0,Math.min(100,F.p*100))+"%";
    const pull=1-F.p;bob.position.set(F.to.x+Math.sin(t*6)*.7*pull,WATER-.05+Math.sin(t*17)*.06,F.to.z+Math.cos(t*4.6)*.6*pull);if(Math.random()<dt*10)burst(bob.position.x,WATER+.1,bob.position.z,3,[[1,1,1],[.8,.93,1]],1,1.6,.5);
    rod.rotation.x=.85+(G2.hold?-.22:0)+Math.sin(t*28)*.03;F.to.lerp(new THREE.Vector3(pier.end.x+pier.dx*2,WATER,pier.end.z+pier.dz*2),dt*F.p*.25);
    if(F.p>=1)catchFish();else if(F.p<=0){F.phase="result";F.rt=1.8;rod.rotation.x=.85;fishUI("Riba se otrgnula! Drži zelenu zonu ispod žute crte.");}break;}
  case"result":{F.rt-=dt;if(F.rt<=0){F.phase="idle";bob.visible=false;fline.visible=false;fishUI(S.fishCasts>0?"Baci ponovno!":"Bacanja su potrošena.");}break;}
  case"jump":{F.jt+=dt;const k=Math.min(1,F.jt/.9);F.js.position.lerpVectors(F.jf,F.jto,k);F.js.position.y+=Math.sin(k*Math.PI)*3;F.js.material.rotation=k*Math.PI*2;if(k>=1){scene.remove(F.js);F.phase="caught";showCatch();}break;}
  }
  if(fline.visible){const a=fline.geometry.attributes.position;a.setXYZ(0,tmpTip.x,tmpTip.y,tmpTip.z);const bp=F.phase==="jump"?F.js.position:bob.position;a.setXYZ(1,bp.x,bp.y+.12,bp.z);a.needsUpdate=true;}}
function catchFish(){const f=F.fish;const size=Math.round(f.s[0]+Math.pow(Math.random(),1.7)*(f.s[1]-f.s[0]));const prev=S.fish[f.k];const isNew=!prev,rec=!!prev&&size>prev.best;
  S.fish[f.k]={n:(prev?prev.n:0)+1,best:Math.max(size,prev?prev.best:0)};let coins=[3,6,12,25,40][f.r]+(isNew?10:0);if(f.k==="zlatna")coins+=100;S.coins+=coins;T0().fish++;if(typeof giveN==="function")giveN("riba",1);save();
  F.catch={f,size,isNew,rec,coins};rod.rotation.x=.85;bob.visible=false;F.phase="jump";F.jt=0;F.jf=bob.position.clone();F.jto=new THREE.Vector3(pier.end.x,pier.end.y+1.6,pier.end.z);
  F.js=new THREE.Sprite(new THREE.SpriteMaterial({map:texFrom(icv(f.sh,f.c)),transparent:true,depthWrite:false}));F.js.scale.set(1.4,1.4,1);scene.add(F.js);
  burst(F.jf.x,WATER+.1,F.jf.z,30,[[1,1,1],[.8,.93,1]],2.2,3.2,.9);sfx.splash();$("reelBox").hidden=true;fishUI("");questCheck();}
function showCatch(){const c=F.catch,f=c.f,R=RAR[f.r];fline.visible=false;sfx.fanfare();rida.g.position.y=pier.end.y;burst(pier.end.x,pier.end.y+1.6,pier.end.z,50,[[1,.9,.4],[1,1,1],[.6,.9,1]],2.5,2.5,1);
  const p=scr(new THREE.Vector3(pier.end.x,pier.end.y+1.6,pier.end.z));flyCoins(c.coins,p);
  const el=$("gPop");el.innerHTML='<div class="rar big" style="background:'+R.c+'">'+R.n+'</div><img alt="" src="'+ic(f.sh,f.c)+'"><h3>'+esc(f.n)+'</h3><p class="muted">'+c.size+' cm'+(f.k==="zlatna"?' · Ispunila ti je želju!':'')+'</p>'+
   '<div class="row" style="justify-content:center">'+(c.isNew?'<span class="newb">Nova vrsta!</span>':'')+(c.rec?'<span class="newb gold">Novi rekord!</span>':'')+'</div><div class="earn">'+COIN_SVG+'<b>+'+c.coins+'</b><span>zlatnika</span></div><button class="btn big" id="gNext">Dalje</button>';
  el.className="gpop card r"+f.r;el.hidden=false;$("gNext").onclick=()=>{sfx.click();el.hidden=true;F.phase="idle";fishUI(S.fishCasts>0?"Baci ponovno!":"Bacanja su potrošena.");};}
function endFishing(){exitGame();if(rod&&rod.parent)rod.parent.remove(rod);if(bob)bob.visible=false;if(fline)fline.visible=false;if(F.js)scene.remove(F.js);F.phase="idle";rida.frozen=false;placeRandom(rida,{x:pier.sx,z:pier.sz});goHome();
  const n=T0().fish;if(n)setTimeout(()=>say(rida,"Danas si ulovila "+n+" "+(n===1?"ribu":n<5?"ribe":"riba")+"! Sve su u tvojoj zbirci.",4500),1900);}

/* ---- balloon flight ---- */
const B={over:true,keys:{}};let starTex=null,starTexR=null;
const glowMatS=new THREE.SpriteMaterial({map:GLOW,color:0xffe27a,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.7,fog:false});
function startBalloon(){if(S.tickets<1)return noTickets();S.tickets--;save();closeSheet();enterGame("balloon");G2.cam=true;const b=life.balloon;
  Object.assign(B,{h:Math.atan2(CZ-b.position.z,CX-b.position.x),vy:0,time:60,score:0,combo:0,ct:0,over:false,keys:{},stars:[]});
  if(!starTex){starTex=texFrom(icv("gstar",["#ffd23a","#fff6c4"]));starTexR=texFrom(icv("gstar",["#ff6fb0","#b8fbff"]));}
  for(let i=0;i<36;i++)addStar(i<4);$("balloonPanel").hidden=false;$("fishMsg").textContent="";balMsg("Skupljaj zvijezde! Ružičaste vrijede 5.");balUI();}
function addStar(rare){for(let n=0;n<80;n++){const a=Math.random()*Math.PI*2,r=6+Math.random()*78;const x=CX+Math.cos(a)*r,z=CZ+Math.sin(a)*r;const g=Math.max(WATER,topY(x,z)+1);const y=g+6+Math.random()*16;if(y>H-8)continue;
  if(B.stars.some(s=>Math.hypot(s.g.position.x-x,s.g.position.y-y,s.g.position.z-z)<7))continue;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:rare?starTexR:starTex,transparent:true,depthWrite:false,fog:false}));const sc=rare?2.7:2.1;sp.scale.set(sc,sc,1);const grp=new THREE.Group();const gl=new THREE.Sprite(glowMatS);gl.scale.set(rare?7:5,rare?7:5,1);grp.add(gl,sp);grp.position.set(x,y,z);scene.add(grp);B.stars.push({g:grp,sp,rare,ph:Math.random()*9,by:y});return;}}
let balMsgT=0;function balMsg(t){const el=$("balMsg");el.textContent=t;el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop");clearTimeout(balMsgT);balMsgT=setTimeout(()=>el.textContent="",1800);}
function balUI(){$("gTitle").innerHTML='<span class="tm">'+Math.max(0,Math.ceil(B.time))+' s</span>';$("gInfo").innerHTML='<span class="sc">★ '+B.score+'</span>';}
const tmpB2=new THREE.Vector3(),tmpB3=new THREE.Vector3();
function tickBalloon(dt,t){if(B.over)return;const b=life.balloon,k=B.keys;B.time-=dt;const turn=(k.r?1:0)-(k.l?1:0);B.h+=turn*1.55*dt;
  const dist=Math.hypot(b.position.x-CX,b.position.z-CZ);if(dist>104){const want=Math.atan2(CZ-b.position.z,CX-b.position.x);let d=want-B.h;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;B.h+=d*dt*1.6;}
  b.position.x+=Math.cos(B.h)*10*dt;b.position.z+=Math.sin(B.h)*10*dt;B.vy+=(k.u?9:-3.2)*dt;B.vy=Math.max(-3,Math.min(5.5,B.vy));b.position.y+=B.vy*dt;
  let g=WATER;for(const o of [[0,0],[2,0],[-2,0],[0,2],[0,-2]])g=Math.max(g,topY(b.position.x+o[0],b.position.z+o[1])+1);g+=5.3;if(b.position.y<g){b.position.y+=(g-b.position.y)*Math.min(1,dt*7);if(B.vy<0)B.vy=0;}
  if(b.position.y>H-6){b.position.y=H-6;if(B.vy>0)B.vy=0;}
  b.rotation.set(0,-B.h,0);b.rotation.x=0;b.children[0].rotation.z=-turn*.1;life.flame.material.opacity=k.u?1:.5;const fs=k.u?2.6:1.5;life.flame.scale.set(fs,fs,1);if(k.u&&Math.random()<dt*14)tone(70+Math.random()*50,.09,"sawtooth",.01);
  tmpB2.copy(b.position);tmpB2.y-=1.6;B.ct-=dt;if(B.ct<=0)B.combo=0;
  for(let i=B.stars.length-1;i>=0;i--){const s=B.stars[i];s.g.position.y=s.by+Math.sin(t*2+s.ph)*.35;s.sp.material.rotation=Math.sin(t*2.4+s.ph)*.35;
    if(s.g.position.distanceTo(tmpB2)<3.9){B.combo++;B.ct=2.6;const pts=s.rare?5:1;B.score+=pts;burst(s.g.position.x,s.g.position.y,s.g.position.z,s.rare?40:20,s.rare?[[1,.45,.75],[.7,1,1],[1,1,1]]:[[1,.9,.35],[1,1,.8]],2.4,2,.8,1);
      tone(620*Math.pow(1.06,Math.min(B.combo,14)),.16,"triangle",.05);if(s.rare){sfx.chime();balMsg("+5 Ružičasta zvijezda!");}else if(B.combo>=3&&B.combo%3===0)balMsg("Niz ×"+B.combo+"!");
      scene.remove(s.g);s.sp.material.dispose();B.stars.splice(i,1);addStar(Math.random()<.12);}}
  const d=tmpB3.set(Math.cos(B.h),0,Math.sin(B.h));const cp=b.position.clone().addScaledVector(d,-20);cp.y+=7.5;camera.position.lerp(cp,Math.min(1,dt*2.6));if(camera.position.y<WATER+1.5)camera.position.y=WATER+1.5;
  const la=b.position.clone().addScaledVector(d,9);la.y-=4.5;camera.lookAt(la);balUI();if(B.time<=0)endBalloon();}
function endBalloon(){B.over=true;G2.cam=false;for(const s of B.stars){scene.remove(s.g);s.sp.material.dispose();}B.stars=[];B.keys={};document.querySelectorAll(".gbtn").forEach(x=>x.classList.remove("on"));
  const b=life.balloon;controls.target.copy(b.position);controls.target.y=Math.min(20,b.position.y);const rec=B.score>(S.best.balloon||0);if(rec)S.best.balloon=B.score;const coins=B.score;S.coins+=coins;T0().stars+=B.score;save();questCheck();
  $("balloonPanel").hidden=true;sfx.fanfare();flyCoins(coins,{x:innerWidth/2,y:innerHeight/2});
  const el=$("gPop");el.className="gpop card";el.innerHTML='<img alt="" src="'+ic("balloon",["#e8503c","#ffd24a"])+'"><h3>Let je gotov!</h3><p style="font-family:var(--display);font-size:2.4rem;line-height:1">★ '+B.score+'</p>'+
   (rec?'<span class="newb gold">Novi rekord!</span>':'<p class="muted">Rekord: '+S.best.balloon+'</p>')+'<div class="earn">'+COIN_SVG+'<b>+'+coins+'</b><span>zlatnika</span></div>'+
   '<div class="row" style="justify-content:center">'+(S.tickets>0?'<button class="btn green" id="gAgain">Još jedan let ('+TIX_SVG+' 1)</button>':'')+'<button class="btn" id="gBack">Natrag na otok</button></div>';el.hidden=false;
  $("gBack").onclick=()=>{sfx.click();exitGame();goHome();};const ag=$("gAgain");if(ag)ag.onclick=()=>{sfx.click();exitGame();startBalloon();};}
[["bL","l"],["bU","u"],["bR","r"]].forEach(([id,k])=>{const el=$(id);el.innerHTML=ARR[k];const on=e=>{e.preventDefault();B.keys[k]=true;el.classList.add("on");},off=()=>{B.keys[k]=false;el.classList.remove("on");};
  el.addEventListener("pointerdown",on);el.addEventListener("pointerup",off);el.addEventListener("pointercancel",off);el.addEventListener("pointerleave",off);el.addEventListener("contextmenu",e=>e.preventDefault());});
const KEYMAP={ArrowLeft:"l",a:"l",A:"l",ArrowRight:"r",d:"r",D:"r",ArrowUp:"u",w:"u",W:"u"," ":"u"};
addEventListener("keydown",e=>{if(G2.mode==="balloon"&&KEYMAP[e.key]){B.keys[KEYMAP[e.key]]=true;e.preventDefault();}else if(G2.mode==="fish"&&e.key===" "&&!e.repeat){e.preventDefault();if(F.phase==="reel")G2.hold=true;else fishAction();}});
addEventListener("keyup",e=>{if(G2.mode==="balloon"&&KEYMAP[e.key])B.keys[KEYMAP[e.key]]=false;else if(G2.mode==="fish"&&e.key===" ")G2.hold=false;});
$("fishBtn").addEventListener("pointerdown",e=>{e.preventDefault();if(F.phase==="reel")G2.hold=true;else fishAction();});
document.addEventListener("pointerdown",e=>{if(G2.mode==="fish"&&F.phase==="reel"&&!e.target.closest("#gExit"))G2.hold=true;});
["pointerup","pointercancel"].forEach(ev=>document.addEventListener(ev,()=>{if(G2.mode==="fish")G2.hold=false;}));
renderer.domElement.addEventListener("pointerdown",()=>{if(G2.mode==="fish"&&F.phase==="bite")fishAction();});

/* ---- Rida's wardrobe ---- */
let hatObj=null,shopSel=null;
function hatMesh(k){const g=new THREE.Group(),M=(c,o)=>std(c,o);
  switch(k){
  case"vijenac":{const r=new THREE.Mesh(new THREE.TorusGeometry(.25,.05,6,18),M(0x3f9a3f));r.rotation.x=Math.PI/2;g.add(r);[0xf25c6c,0xffd44a,0xffffff,0xb58cf0,0xff9a3c,0x6ec6ff,0xf25c6c].forEach((c,i)=>{const f=new THREE.Mesh(new THREE.IcosahedronGeometry(.08,0),M(c));const a=i/7*Math.PI*2;f.position.set(Math.cos(a)*.25,.05,Math.sin(a)*.25);g.add(f);});break;}
  case"carobnjak":{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.4,.4,.04,22),M(0x4f3290)));const c=new THREE.Mesh(new THREE.ConeGeometry(.25,.66,18),M(0x7a52c7));c.position.y=.34;c.rotation.z=-.14;g.add(c);
    [[.12,.2,.17],[-.13,.3,.14],[.03,.48,.09]].forEach(p=>{const s=new THREE.Mesh(new THREE.OctahedronGeometry(.05),M(0xffd23a,{emissive:LC(0xffb000),emissiveIntensity:.6}));s.position.set(p[0],p[1],p[2]);g.add(s);});break;}
  case"pirat":{g.add(new THREE.Mesh(new THREE.BoxGeometry(.74,.06,.38),M(0x22201e)));const cr=new THREE.Mesh(new THREE.BoxGeometry(.46,.22,.3),M(0x22201e));cr.position.y=.13;g.add(cr);const f=new THREE.Mesh(new THREE.BoxGeometry(.62,.12,.05),M(0x22201e));f.position.set(0,.12,.18);g.add(f);
    const sk=new THREE.Mesh(new THREE.BoxGeometry(.11,.1,.02),M(0xffffff));sk.position.set(0,.14,.21);g.add(sk);const fe=new THREE.Mesh(new THREE.BoxGeometry(.05,.34,.05),M(0xd94d63));fe.position.set(-.2,.32,-.04);fe.rotation.z=.45;g.add(fe);break;}
  case"detektiv":{g.add(new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,.04,22),M(0x8a6a48)));const cr=new THREE.Mesh(new THREE.CylinderGeometry(.22,.24,.24,18),M(0x8a6a48));cr.position.y=.14;g.add(cr);const bd=new THREE.Mesh(new THREE.CylinderGeometry(.247,.247,.06,18),M(0x3b2a1c));bd.position.y=.06;g.add(bd);break;}
  case"propeler":{g.add(new THREE.Mesh(new THREE.SphereGeometry(.26,16,8,0,Math.PI*2,0,Math.PI/2),M(0x3f8fe0)));const v=new THREE.Mesh(new THREE.BoxGeometry(.32,.03,.2),M(0xe8443a));v.position.set(0,.01,.26);g.add(v);
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.16,6),M(0xffd23a));st.position.y=.32;g.add(st);const pr=new THREE.Group();pr.position.y=.4;[0xe8443a,0xffd23a,0x3fae52].forEach((c,i)=>{const a=new THREE.Group();a.rotation.y=i/3*Math.PI*2;const bl=new THREE.Mesh(new THREE.BoxGeometry(.36,.02,.08),M(c));bl.position.x=.18;a.add(bl);pr.add(a);});g.add(pr);g.userData.spin=pr;break;}
  case"kruna":{const gold=M(0xf5c33b,{metalness:.55,roughness:.3,side:THREE.DoubleSide});const r=new THREE.Mesh(new THREE.CylinderGeometry(.23,.23,.15,18,1,true),gold);r.position.y=.07;g.add(r);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;const sp=new THREE.Mesh(new THREE.ConeGeometry(.055,.15,5),gold);sp.position.set(Math.cos(a)*.22,.21,Math.sin(a)*.22);g.add(sp);}
    const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.055),M(0xd94d63,{emissive:LC(0x801020),emissiveIntensity:.5}));gem.position.set(0,.08,.24);g.add(gem);break;}
  case"astronaut":{const gl=new THREE.Mesh(new THREE.SphereGeometry(.46,22,16),new THREE.MeshStandardMaterial({color:0xd8f2ff,transparent:true,opacity:.26,roughness:.05,metalness:.2,depthWrite:false}));gl.position.set(0,-.18,0);g.add(gl);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.37,.065,8,22),M(0xf0f0f0));ring.rotation.x=Math.PI/2;ring.position.set(0,-.58,0);g.add(ring);const an=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),M(0xe8443a,{emissive:LC(0xff2020),emissiveIntensity:.7}));an.position.set(.2,.34,0);g.add(an);
    const st=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.12,4),M(0xcccccc));st.position.set(.2,.27,0);g.add(st);break;}
  }
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});return g;}
function setHat(k){const head=rida&&rida.g.userData.parts.head;if(!head)return;if(hatObj){head.remove(hatObj);hatObj=null;}if(!k)return;hatObj=hatMesh(k);hatObj.position.set(0,.22,.1);head.add(hatObj);}
function openShop(){closeSheet();enterGame("shop");$("shopUI").hidden=false;rida.frozen=true;rida.goto=null;rida.tx=null;let dv=camera.position.clone().sub(new THREE.Vector3(rida.x,rida.y,rida.z)).setY(0);if(dv.lengthSq()<.01)dv.set(1,0,1);dv.normalize();const fp=new THREE.Vector3(rida.x+dv.x*4.6,rida.y+1.9,rida.z+dv.z*4.6);
  flight={from:{t:controls.target.clone(),p:camera.position.clone()},t:new THREE.Vector3(rida.x,rida.y+.05,rida.z),p:fp,k:0,d:1.5};rida.g.rotation.set(0,Math.atan2(fp.x-rida.x,fp.z-rida.z),0);
  shopSel=S.hat||HATS[0].k;setHat(shopSel);renderShop();say(rida,"Što ćemo danas obući?",3000);}
function renderShop(){const h=HATS.find(x=>x.k===shopSel),own=S.hats.includes(h.k),wear=S.hat===h.k;$("shopCoins").innerHTML=COIN_SVG+"<b>"+S.coins+"</b>";
  $("shopList").innerHTML=HATS.map(x=>'<button class="hat" data-k="'+x.k+'" aria-pressed="'+(x.k===shopSel)+'"><b>'+esc(x.n)+'</b><small>'+(S.hats.includes(x.k)?(S.hat===x.k?"Nosi ga":"Tvoj je"):COIN_SVG+x.p)+'</small></button>').join("");
  const selB=$("shopList").querySelector("[aria-pressed=true]");if(selB&&selB.scrollIntoView)selB.scrollIntoView({inline:"center",block:"nearest"});
  $("shopList").querySelectorAll(".hat").forEach(b=>b.onclick=()=>{sfx.click();shopSel=b.dataset.k;setHat(shopSel);renderShop();if(rida)rida.celebrate=.4;});
  const a=$("shopAct");a.disabled=false;if(own)a.textContent=wear?"Skini":"Stavi";else if(S.coins>=h.p)a.innerHTML="Kupi za "+COIN_SVG+h.p;else{a.textContent="Treba još "+(h.p-S.coins)+" zlatnika";a.disabled=true;}}
$("shopAct").onclick=()=>{const h=HATS.find(x=>x.k===shopSel);if(S.hats.includes(h.k)){S.hat=S.hat===h.k?"":h.k;setHat(S.hat||null);sfx.click();if(!S.hat)setHat(null);}
  else if(S.coins>=h.p){S.coins-=h.p;S.hats.push(h.k);S.hat=h.k;sfx.fanfare();rida.celebrate=1.4;burst(rida.x,rida.y+1.4,rida.z,50,[[1,.85,.3],[1,1,1],[.9,.5,1]],2.5,2.5,1);say(rida,"Obožavam ga! Hvala ti!",3500);}save();renderShop();renderEco();};
$("shopClose").onclick=()=>{sfx.click();setHat(S.hat||null);rida.frozen=false;exitGame();};

/* ---- the games sheet (Igre · Zbirka · Zadaci) ---- */
$("gamesBtn").onclick=()=>{sfx.click();sheetGames("igre");};
$("questBtn").onclick=()=>{sfx.click();sheetGames("zadaci");};
function sheetGames(tab){const tabs='<div class="tabs" role="tablist">'+[["igre","Igre"],["zbirka","Zbirka"],["zadaci","Zadaci"+(claimable()?" ("+claimable()+")":"")]].map(t=>'<button role="tab" data-t="'+t[0]+'" aria-selected="'+(t[0]===tab)+'">'+t[1]+'</button>').join("")+'</div>';let body="";
  if(tab==="igre"){const fishN=FISH.filter(f=>S.fish[f.k]).length;
    body='<div class="earn">'+TIX_SVG+'<b>'+S.tickets+'</b><span>'+kart(S.tickets)+' za igre. Svakih 10 pročitanih stranica donosi novu, a jednu dobiješ svaki dan.</span></div><div class="games">'+
     '<div class="gcard"><img alt="" src="'+ic("long",["#ffc53d","#ff8a1f"])+'"><div><b>Ribolov</b><span class="muted">Na molu uz plažu. 1 karta = 3 bacanja. Neke ribe grizu samo noću!</span><small>Vrsta u zbirci: '+fishN+' od '+FISH.length+'</small></div><button class="btn green" id="playFish">'+(S.fishCasts>0?"Nastavi ("+S.fishCasts+")":"Igraj")+'</button></div>'+
     '<div class="gcard"><img alt="" src="'+ic("balloon",["#e8503c","#ffd24a"])+'"><div><b>Let balonom</b><span class="muted">Upravljaj balonom iznad otoka i skupljaj zvijezde. 1 karta = 60 sekundi.</span><small>Rekord: '+(S.best.balloon||0)+' zvjezdica</small></div><button class="btn green" id="playBal">Igraj</button></div>'+
     '<div class="gcard"><img alt="" src="'+ic("wizard",["#7a52c7","#ffd23a"])+'"><div><b>Tržnica i ormar</b><span class="muted">Svraka Sjajka kupuje plodove iz vrta i blago, a prodaje sjeme, vunu, kostime i kartu blaga. Tu su i tvoji prijatelji životinje.</span><small>Kostima: '+(typeof COSTUMES!=="undefined"?S.hats.length+' od '+COSTUMES.length:S.hats.length)+'</small></div><button class="btn" id="playShop">Otvori</button></div></div>';}
  if(tab==="zbirka"){const left=S.spawns.length;body='<p class="muted">'+(left?'Na otoku je sada skriveno <b>'+left+'</b> '+(left===1?"blago":left<5?"blaga":"blaga")+'. Pritisni Istraži i dotrči s Ridom do onoga što svjetluca!':'Danas si pronašla sva blaga. Novo stiže sutra i kad čitaš.')+'</p>';
    for(const set of SETS){const have=set.items.filter(i=>S.found[i.k]).length,done=have===set.items.length,cl=S.setsDone.includes(set.k);
      body+='<div class="setbar"><h3>'+esc(set.n)+'</h3><span class="muted">'+have+' / '+set.items.length+'</span>'+(done&&!cl?'<button class="btn green" data-set="'+set.k+'">Preuzmi nagradu</button>':cl?'<span class="newb gold">Potpuna!</span>':'<span class="muted">Nagrada: 150 zlatnika i 2 karte</span>')+'</div><div class="alb">'+
        set.items.map(i=>{const n=S.found[i.k]||0;return '<div class="it'+(n?'':' no')+'" style="border-color:'+(n?RAR[i.r].c:'')+'"><img alt="" src="'+ic(i.sh,i.c)+'"><span>'+(n?esc(i.n):"???")+'</span>'+(n>1?'<span class="cnt">×'+n+'</span>':'')+'</div>';}).join("")+'</div>';}
    body+='<div class="setbar"><h3>Ribe</h3><span class="muted">'+FISH.filter(f=>S.fish[f.k]).length+' / '+FISH.length+'</span></div><div class="alb">'+FISH.map(f=>{const s=S.fish[f.k];return '<div class="it'+(s?'':' no')+'" style="border-color:'+(s?RAR[f.r].c:'')+'"><img alt="" src="'+ic(f.sh,f.c)+'"><span>'+(s?esc(f.n):"???")+'</span><small>'+(s?"Rekord "+s.best+" cm":(f.night?"Samo noću":RAR[f.r].n))+'</small></div>';}).join("")+'</div>';}
  if(tab==="zadaci"){const Q=quests();body='<p class="muted">Tri nova zadatka svaki dan. Za svaki izvršeni otvori škrinju!</p><div class="books">'+Q.list.map((q,i)=>{const D=qdef(q.k),p=qprog(q),ok=p>=D.n;
      return '<div class="quest'+(q.claimed?' claimed':ok?' ok':'')+'">'+CHEST_SVG+'<div><b>'+esc(D.t)+'</b><div class="prog"><i style="width:'+Math.round(100*p/D.n)+'%;background:'+(ok?'var(--leaf)':'var(--gold)')+'"></i></div><small class="muted">'+p+' / '+D.n+' · nagrada '+D.r+' zlatnika'+(D.tk?' i 1 karta':'')+'</small></div>'+
        (q.claimed?'<span class="newb gold">Gotovo</span>':ok?'<button class="btn green" data-q="'+i+'">Otvori</button>':'<span></span>')+'</div>';}).join("")+'</div>';}
  openSheet('<h2>'+(tab==="zadaci"?"Zadaci dana":tab==="zbirka"?"Moja zbirka":"Igraonica")+'</h2>'+tabs+body);
  const B_=$("sheetBody");B_.querySelectorAll("[role=tab]").forEach(t=>t.onclick=()=>{sfx.click();sheetGames(t.dataset.t);});
  const pf=$("playFish");if(pf)pf.onclick=()=>{sfx.click();startFishing();};const pb=$("playBal");if(pb)pb.onclick=()=>{sfx.click();startBalloon();};const ps=$("playShop");if(ps)ps.onclick=()=>{sfx.click();if(typeof openMarket==="function"){closeSheet();openMarket();return;}openShop();};
  B_.querySelectorAll("[data-set]").forEach(b=>b.onclick=()=>{const k=b.dataset.set;if(S.setsDone.includes(k))return;S.setsDone.push(k);S.coins+=150;S.tickets=Math.min(12,S.tickets+2);save();sfx.fanfare();const r=b.getBoundingClientRect();flyCoins(150,{x:r.left+r.width/2,y:r.top});setTimeout(()=>sheetGames("zbirka"),900);});
  B_.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{const q=quests().list[+b.dataset.q];if(q.claimed)return;const D=qdef(q.k);q.claimed=true;S.coins+=D.r;if(D.tk)S.tickets=Math.min(12,S.tickets+1);save();b.disabled=true;
    const row=b.closest(".quest"),ch=row.querySelector(".chest");ch.classList.add("shake");tone(300,.1,"square",.03);setTimeout(()=>{ch.classList.add("open");sfx.fanfare();const r=ch.getBoundingClientRect();flyCoins(D.r,{x:r.left+r.width/2,y:r.top+r.height/2});
      for(let i=0;i<14;i++){const sp=document.createElement("i");sp.className="spark";sp.style.left=(r.left+r.width/2)+"px";sp.style.top=(r.top+8)+"px";sp.style.setProperty("--dx",((Math.random()-.5)*140)+"px");sp.style.setProperty("--dy",(-40-Math.random()*90)+"px");document.body.appendChild(sp);setTimeout(()=>sp.remove(),900);}},480);
    setTimeout(()=>{renderEco();if(!$("veil").hidden)sheetGames("zadaci");},1500);});}
function tickGames(dt,t){tickTreasures(dt,t);if(G2.mode==="fish")tickFish(dt,t);if(G2.mode==="balloon")tickBalloon(dt,t);
  if(hatObj&&hatObj.userData.spin)hatObj.userData.spin.rotation.y+=dt*(rida&&rida.tx!=null?16:6);
  if(rida&&rida.frozen&&G2.mode==="shop"){const h=rida.g.userData.parts.head;if(h){h.rotation.y=Math.sin(t*.9)*.35;h.rotation.x=Math.sin(t*.7)*.08;}const ec=rida.celebrate>0;if(ec){rida.celebrate-=dt;rida.g.position.y=rida.y+Math.abs(Math.sin(t*9))*.4;}else rida.g.position.y=rida.y;}}

document.querySelectorAll("#camCtl [data-h]").forEach(b=>{const k=b.dataset.h;const on=e=>{e.preventDefault();controls.hold[k]=true;b.classList.add("on");if(k==="l")controls.rotateBy(-.12);if(k==="r")controls.rotateBy(.12);if(k==="i")controls.zoomBy(.85);if(k==="o")controls.zoomBy(1.18);flight=null;controls.autoRotate=false;idleT=0;},off=()=>{controls.hold[k]=false;b.classList.remove("on");};
  b.addEventListener("pointerdown",on);b.addEventListener("pointerup",off);b.addEventListener("pointercancel",off);b.addEventListener("pointerleave",off);b.addEventListener("contextmenu",e=>e.preventDefault());});
function camHint(){let seen=false;try{seen=localStorage.getItem("otok-cam-hint")==="2";}catch(e){}if(seen)return;try{localStorage.setItem("otok-cam-hint","2");}catch(e){}
  const touch=matchMedia("(pointer:coarse)").matches;setTimeout(()=>toast(touch?"Povuci prstom za pomicanje. Dva prsta: zum i okretanje. Dvaput dodirni mjesto da mu se približiš.":"Lijeva tipka: pomicanje. Desna tipka: okretanje. Kotačić: zum prema pokazivaču. Dvoklik: približi se.",7500),5200);}
