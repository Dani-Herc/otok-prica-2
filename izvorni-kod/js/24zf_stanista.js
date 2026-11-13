/* =================== v34: STANISTA: animals live where they would in nature ===================
   Every land has residents placed by habitat (shore, shallows, meadow, forest, tree tops, pond, square, hill) and
   kept near it with a soft tether (e.hab). Meeting one in its habitat fills the habitat guide, a daily friend
   hands out a gift, finished districts give a fox skin, and one sheet shows the whole ladder of progress.
   Save: optional S.dst.zoo[land][kind], S.dst.zooDone[land], S.dst.gift[land]. */
const STN={
  zec:["livada","na livadi","Zec","Zečevi žive na livadama i rubovima šuma. Pasu travu, a kad osjete opasnost, pobjegnu dugim skokovima."],
  ovca:["livada","na pašnjaku","Ovca","Ovce su životinje pašnjaka. Veći dio dana pasu travu i uvijek se drže stada."],
  jez:["suma","pod drvećem","Jež","Jež danju spava pod lišćem i granjem, a u sumrak izlazi tražiti kukce i puževe."],
  papiga:["suma","u krošnjama","Papiga","Papige žive među krošnjama. Gnijezde se u dupljama drveća, a jedu plodove i sjemenke."],
  sova:["krosnja","na drvetu","Sova","Sova danju miruje na grani uz deblo. Perje joj je boje kore, pa je gotovo nevidljiva."],
  patka:["voda","u plićaku","Patka","Patke žive uz mirnu, plitku vodu. Hranu traže tako da urone glavu, a rep im viri van."],
  kornjaca:["obala","na plaži","Kornjača","Morske kornjače izlaze na pješčane plaže da u toplom pijesku polože jaja."],
  macka:["trg","među kućama","Mačka","Mačke rado žive uz ljude. U lukama su stoljećima čuvale brodove i skladišta od miševa."],
  zaba:["jezero","uz vodu","Žaba","Žabe žive uz slatku vodu. Koža im mora ostati vlažna, a jaja polažu u vodu."],
  pingvin:[null,"na snježnom otočiću","Pingvin","Pingvini žive uz hladna mora. Na kopnu se gegaju, a pod vodom plivaju kao da lete."],
  deva:[null,"u pustinji","Deva","Deve žive u pustinjama. U grbi čuvaju mast, a ne vodu, i mogu danima hodati bez pića."]};
const STLAND={main:["zec","patka","jez","ovca","kornjaca","macka","papiga","sova","zaba","pingvin","deva"],
  luka:[["patka",2],["kornjaca",2],["macka",2],["papiga",2]],dolina:[["ovca",3],["zec",3],["zaba",2],["jez",1],["patka",1]],gora:[["sova",2],["jez",2],["zec",2],["ovca",1]]};
const STWILD=[["zec",2],["ovca",2],["jez",1],["papiga",1],["kornjaca",1],["patka",2],["macka",1]];
const STNAMES={zec:["Hopko","Repić","Mrkvica"],ovca:["Runa","Pahulja","Bjelka"],jez:["Iglica","Šuško"],papiga:["Kiki","Zeleni"],sova:["Huhu","Pjegava"],patka:["Gaga","Pljusko"],kornjaca:["Oklopko","Pješčanka"],macka:["Šapica","Mornar"],zaba:["Skočka","Kreko"]};
const stHere=()=>HERE||(WORLD?null:"main");
const stKinds=l=>l==="main"?STLAND.main:STLAND[l].map(a=>a[0]);
function stS(){S.dst=S.dst||{};S.dst.zoo=S.dst.zoo||{};S.dst.zooDone=S.dst.zooDone||{};S.dst.gift=S.dst.gift||{};return S.dst;}
const stSeen=l=>Object.keys(stS().zoo[l]||{}).filter(k=>stKinds(l).includes(k)).length;
let STSP=null;
function stSpots(){if(STSP)return STSP;const L={obala:[],voda:[],suma:[],livada:[],brdo:[],trg:[],jezero:[]};const lim=HERE?100:66;
  for(let z=10;z<W-10;z+=3)for(let x=10;x<W-10;x+=3){const d=Math.hypot(x-128,z-128);if(d>lim)continue;const h=hmap[x+z*W],mk=mask[x+z*W];
    if(h<=SL+1){if(h>=SL-1&&[[5,0],[-5,0],[0,5],[0,-5]].some(o=>hmap[(x+o[0])+(z+o[1])*W]>SL+2))L.voda.push({x,z});continue;}
    const top=vox[I(x,h-1,z)];if(top===T.pijesak&&h<=SL+4){L.obala.push({x,z});continue;}if(get(x,h,z)||get(x,h+1,z))continue;
    if(mk===2&&d<15){L.trg.push({x,z});continue;}if(mk||top!==T.trava)continue;if(h>=SL+13){L.brdo.push({x,z});continue;}
    const tree=[[2,0],[-2,0],[0,2],[0,-2],[3,3],[-3,-3]].some(o=>topY(x+o[0],z+o[1])>hmap[(x+o[0])+(z+o[1])*W]+2);(tree?L.suma:L.livada).push({x,z});}
  const P=HERE&&DST[HERE].pond;if(P)for(let a=0;a<6.28;a+=.5){const x=Math.floor(P.x+Math.cos(a)*(P.r+2.6)),z=Math.floor(P.z+Math.sin(a)*(P.r+2.6));if(!get(x,hmap[x+z*W],z))L.jezero.push({x,z});}
  if(!L.jezero.length)L.jezero=L.obala;if(!L.trg.length)L.trg=[{x:LIB.x+4,z:LIB.z+12},{x:LIB.x-6,z:LIB.z+11},{x:SITES.trznica.x+3,z:SITES.trznica.z+3}];L.krosnja=L.suma;if(!L.suma.length)L.suma=L.livada;return STSP=L;}
const stUsed=[];
function stPick(hab,seed){const L=stSpots()[hab]||[];if(!L.length)return null;let best=null,bs=-1;for(let i=0;i<14;i++){const s=L[Math.floor(hash2(seed*7+i,i*3+1,41)*L.length)];let md=60;for(const u of stUsed)md=Math.min(md,Math.hypot(u.x-s.x,u.z-s.z));if(md>bs){bs=md;best=s;}}
  if(best)stUsed.push(best);return best;}
function stPlace(e,hab,seed){let s=stPick(hab,seed);if(!s)return false;if(hab==="krosnja"){for(const o of [[2,0],[-2,0],[0,2],[0,-2],[3,3],[-3,-3]])if(topY(s.x+o[0],s.z+o[1])>hmap[(s.x+o[0])+(s.z+o[1])*W]+2){s={x:s.x+o[0],z:s.z+o[1]};break;}}e.x=s.x+.5;e.z=s.z+.5;const y=walkable(e.x,e.z,e.swim);e.y=y!=null?y:hmap[s.x+s.z*W];e.tx=null;e.goto=null;e.hab={x:e.x,z:e.z,r:hab==="voda"?7:hab==="trg"?8:10};return true;}
/* residents of a district */
function stSpawn(){const l=stHere();if(!l)return;let n=0;for(const [kind,cnt] of (l==="main"?STWILD.filter(a=>!S.visitors.includes(a[0])):STLAND[l]))for(let i=0;i<cnt;i++){if(!MODELS[kind])continue;const hab=STN[kind][0];
    const e=spawn(kind,STNAMES[kind][(i+n)%STNAMES[kind].length],{speed:kind==="kornjaca"?.4:kind==="patka"?.8:1,swim:hab==="voda",roof:hab==="krosnja"});n++;if(!stPlace(e,hab,n*13+i))stPlace(e,"livada",n*17+i);e.wild=1;}}
/* the home island: visitors move to where they belong */
function stHome(){for(const e of ents){if(e.hab||e===rida||e.frozen||!STN[e.kind]||!S.visitors.includes(e.kind)||S.pet===e.kind)continue;const hab=STN[e.kind][0];if(!hab||e.roof)continue;if(e.swim&&hab!=="voda")continue;stPlace(e,hab,e.kind.length*5+e.kind.charCodeAt(0));}}
function stTick(tt){const l=stHere();if(!l)return;const D=stS(),P=FP.on?FP.p:null;const gk=stGiftKind(l);
  for(const e of ents){if(!e.g||e.g.visible===false||!STN[e.kind])continue;
    if(e.hab&&!e.goto&&!e.frozen&&e!==FP.mount&&S.pet!==e.kind&&!e.roof&&Math.hypot(e.x-e.hab.x,e.z-e.hab.z)>e.hab.r){const a=Math.random()*6.28;e.goto={x:e.hab.x+Math.cos(a)*2.5,z:e.hab.z+Math.sin(a)*2.5};}
    if(!P||!stKinds(l).includes(e.kind))continue;const d=Math.hypot(e.x-P.x,e.z-P.z);
    if(e.kind===gk&&D.gift[l]!==today()){if(Math.random()<.5)mgSpawn({t:"star",x:e.x+(Math.random()-.5),y:e.y+1.6+Math.random()*.6,z:e.z+(Math.random()-.5),vy:.5,life:.9,size:.2,size2:.02,col:[0xffd23d,0xffffff],add:1});if(d<3.2&&$("veil").hidden)stGift(l,e);}
    if(d<3.2&&!(D.zoo[l]&&D.zoo[l][e.kind])&&$("veil").hidden){(D.zoo[l]=D.zoo[l]||{})[e.kind]=today();S.coins+=10;save();renderEco();sfx.chime();const X=STN[e.kind];toast(X[2]+" "+X[1]+"! "+X[3]+" (+10 zlatnika)",6500);
      if(stSeen(l)>=stKinds(l).length&&!D.zooDone[l]){D.zooDone[l]=today();S.coins+=100;const E2=encS();E2.lupe=(E2.lupe||0)+2;if(S.tickets<12)S.tickets++;save();renderEco();if(typeof encBadge==="function")encBadge();
        setTimeout(()=>{sfx.fanfare();if(typeof fireworks==="function")fireworks();toast("Upoznala si sve stanovnike: "+dLocName(l)+"! Dobivaš 100 zlatnika, 2 lupe i kartu za igre.",6000);},3200);}}}}
function stGiftKind(l){const ks=stKinds(l).filter(k=>STN[k][0]&&ents.some(e=>e.kind===k&&e.hab));if(!ks.length)return null;const t=today();let h=0;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))|0;return ks[Math.abs(h+l.length*7)%ks.length];}
function stGift(l,e){const D=stS();D.gift[l]=today();const G={zec:["s_mrkva",2,"sjemenke mrkve"],ovca:["vuna_b",4,"meku vunu"],jez:["bobice",3,"šumske bobice"],papiga:["grumen",1,"zlatni grumen"],sova:["svjetlo",2,"dva svjetla"],patka:["biser",1,"biser iz plićaka"],kornjaca:["prizmarin",3,"morski kamen"],macka:["coins",15,"izgubljene zlatnike"],zaba:["lopoc",3,"lopoče"]}[e.kind]||["coins",15,"zlatnike"];
  let c=20;try{if(G[0]==="coins")c+=G[1];else if(typeof giveN==="function")giveN(G[0],G[1]);}catch(err){}S.coins+=c;save();renderEco();sfx.chime();e.celebrate=1;burst(e.x,e.y+1,e.z,30,[[1,.85,.3],[1,1,1]],2.4,2.4,.8);
  say(e,"Baš tebe čekam! Evo ti "+G[2]+" i "+c+" zlatnika. Sutra dar čuva netko drugi!",6000);}
/* the guide */
function sheetStan(l){l=l||stHere()||"main";const lands=["main"].concat(DSK.filter(k=>dOpen(k)||k===HERE));if(!lands.includes(l))l="main";const XP=typeof lvXP==="function"?lvXP():S.xp;const D=stS(),ks=stKinds(l),lv=level(),pg=dPages(),st=streak(),GL=gradLevel();
  const nw=Object.keys(WORLDS).filter(id=>!WORLDS[id].soon&&WORLDS[id].lv>lv).sort((a,b)=>WORLDS[a].lv-WORLDS[b].lv)[0],nd=DSK.find(k=>!dOpen(k)),nv=VISITORS.find(v=>!S.visitors.includes(v.k));
  const row=(t,now,goal,what)=>'<div class="stRow"><b>'+t+'</b><div class="prog"><i style="width:'+Math.min(100,Math.round(100*now/Math.max(1,goal)))+'%;background:#3fa86a"></i></div><small>'+what+'</small></div>';
  openSheet('<h2>Vodič kroz staništa</h2><div class="dtabs">'+lands.map(w=>'<button class="btn soft" data-w="'+w+'" aria-pressed="'+(w===l)+'">'+dLocName(w)+' <small>'+stSeen(w)+'/'+stKinds(w).length+'</small></button>').join("")+'</div>'+
    '<p class="muted">Svaka životinja živi tamo gdje bi živjela i u prirodi. Priđi joj u istraživanju da je upišeš u vodič.'+(D.zooDone[l]?' <b class="okT">Ovdje si upoznala sve!</b>':' Za sve stanovnike: 100 zlatnika, 2 lupe i karta za igre.')+'</p>'+
    '<div class="stGrid">'+ks.map(k=>{const X=STN[k],seen=D.zoo[l]&&D.zoo[l][k],away=false;return '<div class="card stC'+(seen?" on":"")+'"><img alt="" src="'+portrait(k)+'"'+(seen?'':' style="filter:brightness(0) opacity(.35)"')+'><b>'+(seen?X[2]:"???")+'</b><span>'+(away?"još nije stigla na otok":X[1])+'</span>'+(seen?'<small>'+X[3]+'</small>':'')+'</div>';}).join("")+'</div>'+
    (D.gift[l]===today()?'<p class="muted">Današnji dar na ovom mjestu već imaš.</p>':'<p class="muted">Jedna životinja ovdje danas svjetluca: ima dar za tebe!</p>')+
    '<h3 class="gradH">Put napretka</h3>'+
    row("Razina "+lv,XP-20*(lv-1)*(lv-1),20*lv*lv-20*(lv-1)*(lv-1),(nd?"Razina "+DST[nd].lv+" otvara most za četvrt "+DST[nd].n+". ":"Sve tri četvrti su otvorene. ")+(nw?"Razina "+WORLDS[nw].lv+" otvara svijet "+WORLDS[nw].n+" kroz čarobni portal.":"Svi svjetovi iza portala su otvoreni!"))+
    row("Niz čitanja: "+st+" dana",st,nv?Math.max(1,nv.min):st,nv?(nv.min>st?"S nizom od "+nv.min+" dana dolazi "+nv.n+".":nv.n+" stiže idući dan kad čitaš."):"Sve životinje s otoka su stigle!")+
    row("Razvoj otoka: "+GL.n,GL.pts-GLV[GL.i][0],GL.nx?GL.nx[0]-GLV[GL.i][0]:1,GL.nx?"Još "+(GL.nx[0]-GL.pts)+" bodova do razine "+GL.nx[1]+". Bodove donose knjige, zgrade iz grada, ukrasi, medalje, ključići i vodič.":"Otok je pravi grad!")+
    '<p class="muted">Razinu dižu čitanje i istraživanje, a ona otvara mostove i svjetove. Čitanje iz dana u dan dovodi životinje, a pročitane knjige grade zgrade s igrama.</p>');
  $("sheetBody").querySelectorAll("[data-w]").forEach(x=>x.onclick=()=>{sfx.click();sheetStan(x.dataset.w);});}
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);const r=$("mmHow");if(r&&!$("mmStan")){r.insertAdjacentHTML("beforebegin",'<button class="btn" id="mmStan">Vodič kroz staništa</button>');$("mmStan").onclick=()=>{sfx.click();sheetStan();};}};}
if(typeof sheetZivot==="function"){const _sz=sheetZivot;sheetZivot=function(){_sz.apply(this,arguments);try{$("sheetBody").insertAdjacentHTML("beforeend",'<button class="btn big" id="zvStan">Vodič kroz staništa i put napretka</button>');$("zvStan").onclick=()=>{sfx.click();sheetStan();};}catch(e){}};}
function stHint(){const l=HERE;if(stSeen(l)<stKinds(l).length)setTimeout(()=>{if(dGuide)say(dGuide,"Kod nas živi "+stKinds(l).length+" vrsta životinja, svaka na svom mjestu: "+stKinds(l).map(k=>STN[k][2].toLowerCase()+" "+STN[k][1]).join(", ")+". Pronađi ih sve!",9000);},8500);}
/* hooks */
for(const k of DSK){const _l=WDEF[k].life,_t=WDEF[k].talk;WDEF[k].life=function(){_l.apply(this,arguments);try{stSpawn();}catch(e){console.warn("stan",e);}};WDEF[k].talk=function(){_t.apply(this,arguments);stHint();};}
{const _ta=tickAnimals2;let acc=0,homed=0;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);acc+=dt;if(acc<.5)return;acc=0;try{if(!WORLD&&homed<3&&tt>2){if(!homed)stSpawn();homed++;stHome();}stTick(tt);}catch(e){if(!stTick.err){stTick.err=1;console.warn("stan",e);}}};}
const stHide=f=>function(){const w=[];for(let i=ents.length-1;i>=0;i--)if(ents[i].wild)w.push(ents.splice(i,1)[0]);try{return f.apply(this,arguments);}finally{for(const e of w)ents.push(e);}};
syncVisitors=stHide(syncVisitors);
{const _ar=stHide(arrive);arrive=function(V){const r=_ar.apply(this,arguments);try{if(new Set(S.visitors).size!==S.visitors.length){S.visitors=[...new Set(S.visitors)];save();}if(V&&V.k)for(const e of ents)if(e.wild&&e.kind===V.k&&!HERE){e.g.visible=false;e.wild=2;e.hab=null;e.frozen=true;e.x=-99;}}catch(e){}setTimeout(()=>{try{stHome();}catch(e){}},9000);return r;};}
/* a fox skin for finishing each district */
Object.assign(MSKIN,{lucka:{n:"Mornarska lisica",d:"Plavo-bijela kao jedra u luci. Dar Lučkog grada.",p:0,rar:"l",O:0x2f5fa8,W:0xffffff,B:0xd8392f,D:0x1c3a6e,wr:"Lučki grad"},
  cvjetna:{n:"Trešnjina lisica",d:"Ružičasta kao latice u Cvjetnoj dolini.",p:0,rar:"l",O:0xf5a3c7,W:0xfff5fa,B:0x5a8a3a,D:0xd870a0,wr:"Cvjetna dolina"},
  gorska:{n:"Gorska lisica",d:"Siva kao stijena pod snijegom Gorskog kraja.",p:0,rar:"l",O:0x7d8f86,W:0xf4f8f6,B:0x2e3a36,D:0x4f6058,wr:"Gorski kraj"}});
[["luka","lucka"],["dolina","cvjetna"],["gora","gorska"]].forEach(([k,s])=>{mgAdd("skin",s,MSKIN[s]);WDEF[k].finale.rewards=["skin:"+s];WDEF[k].finale.sub="Skupila si sve ključiće! "+MSKIN[s].n+" je sad tvoja i čeka te u Čarobnoj trgovini. Stanovnici su ti napunili i torbu blagom.";});
