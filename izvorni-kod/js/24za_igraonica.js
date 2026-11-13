/* ===== v29: Igraonica with depth. Countdown before every game, three ways to play (easy, normal, fast), mastery levels
   for each game, a challenge of the day, and the Island Cup: three games in a row for a trophy.
   Save: S.mini[k].xp and .lv (mastery), S.igDay (day the challenge was won), S.cups (trophies). ===== */
const IG={hold:0,spd:1,mode:"n",cup:null,last:-1};
const IGMODE={l:{n:"Lagano",d:"Sve je sporije. Za vježbu: najviše brončana medalja.",spd:.78,coin:.5},n:{n:"Normalno",d:"Prava igra za medalje i rekorde.",spd:1,coin:1},b:{n:"Brzo",d:"Sve je brže! Zlatnici vrijede 50% više.",spd:1.25,coin:1.5}};
const IGLV=[0,40,100,190,320],IGLN=["Početnica","Učenica","Znalica","Majstorica","Legenda"];
function igLv(R){const x=R.xp||0;let l=0;for(let i=0;i<IGLV.length;i++)if(x>=IGLV[i])l=i;return l;}
function igBar(R){const l=igLv(R),x=R.xp||0;const a=IGLV[l],b=IGLV[l+1];const pct=b?Math.round(100*(x-a)/(b-a)):100;
  return '<div class="iglv"><b>'+IGLN[l]+'</b><span class="prog sm"><i style="width:'+pct+'%;background:linear-gradient(90deg,#7a52c7,#c08cff)"></i></span><small>'+(b?(b-x)+' do: '+IGLN[l+1]:'Najviša razina!')+'</small></div>';}
function igDaily(){const d=today();let h=0;for(let i=0;i<d.length;i++)h=(h*31+d.charCodeAt(i))>>>0;return MINIL[h%MINIL.length];}
function igDailyDone(){return S.igDay===today();}
document.body.insertAdjacentHTML("beforeend",'<div id="igCount" hidden></div>');
/* each game waits for the countdown, then runs at the chosen speed */
MINIL.forEach(g=>{const _t=g.tick;g.tick=function(dt,t,M){if(IG.hold>0){IG.hold-=dt;M.t-=dt;const n=Math.ceil(IG.hold);if(n!==IG.last){IG.last=n;const el=$("igCount");
      if(n>0){el.hidden=false;el.textContent=n;el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop");tone(440,.12,"triangle",.05);}else{el.textContent="Kreni!";el.classList.remove("pop");void el.offsetWidth;el.classList.add("pop");tone(880,.3,"triangle",.06);setTimeout(()=>{el.hidden=true;},600);}}
      return _t.call(this,1e-4,t,M);}
    return _t.call(this,dt*(g.sync?1:IG.spd),t,M);};});
if(MINI.ples)MINI.ples.sync=1;
MINIL.forEach(g=>{["key","onDown","onMove","onUp"].forEach(fn=>{const _f=g[fn];if(_f)g[fn]=function(){if(IG.hold>0)return;return _f.apply(this,arguments);};});});
{const _ms=miniStart;miniStart=function(k){_ms.apply(this,arguments);if(MG.cur&&MG.cur.k===k&&!MG.over){document.body.classList.add("minig");IG.last=-1;IG.hold=MINI[k].sync?0:3;
    if(IG.mode!=="n"&&!MINI[k].sync)setTimeout(()=>miniMsg(IGMODE[IG.mode].n+"!",1400),3300);}};}
{const _mc=miniClose;miniClose=function(){_mc.apply(this,arguments);document.body.classList.remove("minig");$("igCount").hidden=true;IG.hold=0;};}
{const _mf=miniFinish;miniFinish=function(res){if(MG.over)return;$("igCount").hidden=true;IG.hold=0;const g=MG.cur,R=miniRec(g.k),mode=g.sync?"n":IG.mode,MO=IGMODE[mode];const c0=S.coins,best0=R.best,lv0=igLv(R);
    const med=g.medals;if(mode==="l")g.medals=g.low?[med[0],-1e9,-1e9]:[med[0],1e9,1e9];
    try{_mf.apply(this,arguments);}finally{g.medals=med;}
    if(mode==="l")R.best=best0;const medal=mode==="l"?Math.min(1,miniMedal(g,res.score)):miniMedal(g,res.score);const base=S.coins-c0;const extra=Math.round(base*(MO.coin-1));S.coins+=extra;
    R.xp=(R.xp||0)+10+medal*8+(mode==="b"?6:0);const lv=igLv(R);const lines=[];
    if(extra>0)lines.push('<div class="earn">'+COIN_SVG+'<b>+'+extra+'</b><span>bonus za Brzo</span></div>');if(extra<0)lines.push('<p class="muted">Lagano donosi pola zlatnika.</p>');
    if(lv>lv0){const c=30*lv;S.coins+=c;if(S.tickets<12)S.tickets++;lines.push('<div class="earn igup"><b>Nova razina: '+IGLN[lv]+'!</b><span>+'+c+' zlatnika i karta za igre</span></div>');sfx.chime();}
    if(!IG.cup&&mode!=="l"&&medal>=2&&igDaily()===g&&!igDailyDone()){S.igDay=today();S.coins+=40;if(S.tickets<12)S.tickets++;lines.push('<div class="earn igup"><b>Izazov dana riješen!</b><span>+40 zlatnika i karta za igre</span></div>');}
    save();renderEco();const el=$("gPop");const row=el.querySelector(".row");if(row){row.insertAdjacentHTML("beforebegin",lines.join("")+igBar(R));}
    if(IG.cup&&row){const C=IG.cup;C.pts+=medal;C.i++;const ag=$("gAgain");if(ag)ag.remove();const bk=$("gBack");
      row.insertAdjacentHTML("beforebegin",'<p class="igcup">Kup otoka: igra '+C.i+' od 3 · bodovi: <b>'+C.pts+'</b></p>');
      if(C.i<3){bk.textContent="Sljedeća igra";bk.className="btn green";bk.onclick=()=>{sfx.click();miniClose();exitGame();cupNext();};}
      else{bk.textContent="Dodjela pehara";bk.className="btn big";bk.onclick=()=>{sfx.click();miniClose();exitGame();goHome();cupEnd();};}}};}
function cupStart(){if(S.tickets<2)return noTickets();S.tickets-=2;save();const L=MINIL.map(g=>g.k).sort(()=>Math.random()-.5).slice(0,3);IG.cup={list:L,i:0,pts:0};IG.mode="n";cupNext();}
function cupNext(){const C=IG.cup;if(!C)return;S.tickets++;IG.spd=1;IG.mode="n";miniStart(C.list[C.i]);}
function cupEnd(){const C=IG.cup;IG.cup=null;if(!C)return;const t=C.pts>=8?3:C.pts>=5?2:C.pts>=3?1:0;S.cups=S.cups||[0,0,0];const coins=[20,60,120,200][t];S.coins+=coins;if(t)S.cups[t-1]++;const items=[rwItem("coins",coins)];
  if(t===3){giveN("zlato",3);items.push(rwItem("zlato",3));}if(t>=2&&S.tickets<12){S.tickets++;items.push({ic:thingIcon("zlato"),n:"Karta za igre",cnt:1,rar:"r"});}save();renderEco();
  setTimeout(()=>{if(t>=2&&typeof fireworks==="function")fireworks();rewardReveal({kicker:"Kup otoka · "+C.pts+" od 9 bodova",title:t?["","Brončani pehar","Srebrni pehar","Zlatni pehar"][t]:"Dobra borba!",chest:t===3?"gold":"wood",items,sub:t?"Pehar ide na tvoju policu u Igraonici.":"Za brončani pehar trebaju 3 boda. Svaka medalja nosi bodove!"});},900);}
function sheetMiniSetup(k){const g=MINI[k],R=miniRec(k);if(g.sync){IG.mode="n";IG.spd=1;return miniStart(k);}
  openSheet('<div class="bhead"><img alt="" class="bldbig" src="'+miniIcon(g)+'"><div><h2>'+esc(g.n)+'</h2><p class="muted">'+esc(g.d)+'</p>'+igBar(R)+'</div></div><h3>Kako želiš igrati?</h3><div class="pzopts igmodes">'+
    ["l","n","b"].map(m=>'<button class="btn '+(m==="n"?"green":"soft")+'" data-m="'+m+'"><b>'+IGMODE[m].n+'</b><small>'+IGMODE[m].d+'</small></button>').join("")+'</div><p class="muted">Svaka igra stoji 1 kartu. Imaš ih '+S.tickets+'.</p>');
  $("sheetBody").querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{sfx.click();IG.mode=b.dataset.m;IG.spd=IGMODE[IG.mode].spd;IG.cup=null;miniStart(k);});}
{const _sg=sheetGames;sheetGames=function(tab){_sg.apply(this,arguments);const body=$("sheetBody"),h=body&&body.querySelector(".miniH");if(!h)return;const dg=igDaily(),cups=S.cups||[0,0,0];
  h.insertAdjacentHTML("beforebegin",'<div class="igday'+(igDailyDone()?" done":"")+'"><img alt="" src="'+miniIcon(dg)+'"><div><b>Izazov dana: '+esc(dg.n)+'</b><span>'+(igDailyDone()?"Riješeno! Sutra stiže novi izazov.":"Osvoji barem srebrnu medalju (Normalno ili Brzo) za +40 zlatnika i kartu.")+'</span></div></div>'+
    '<div class="gcard igcupc"><img alt="" src="'+thingIcon("zlato")+'"><div><b>Kup otoka</b><span class="muted">Tri igre zaredom. Svaka medalja nosi bodove, a na kraju te čeka pehar!</span><small>Tvoji pehari: 🥉 '+cups[0]+' · 🥈 '+cups[1]+' · 🥇 '+cups[2]+'</small></div><button class="btn purple" id="igCup">Igraj (2 karte)</button></div>');
  $("igCup").onclick=()=>{sfx.click();cupStart();};
  body.querySelectorAll("[data-mini]").forEach(b=>{const k=b.dataset.mini,R=miniRec(k);const sm=b.parentNode.querySelector("small");if(sm&&!b.parentNode.querySelector(".iglv"))sm.insertAdjacentHTML("afterend",igBar(R));b.onclick=()=>{sfx.click();sheetMiniSetup(k);};});};}
