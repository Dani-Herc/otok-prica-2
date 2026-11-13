/* =================== v36: UPIS: log reading for a day you forgot ===================
   The page sheet asks "Kada si čitala?" (today or any of the six days before). A session logged for an earlier
   day lands on that day in the diary and repairs the reading streak; today is only marked when today is chosen.
   The "Što si čitala?" sheet shows the last week so a gap is easy to spot. Save: nothing new (S.days, S.log). */
const RD={day:null,pre:null};
const RDW=["ned","pon","uto","sri","čet","pet","sub"];
function rdLabel(d,i){if(i===0)return "Danas";if(i===1)return "Jučer";const p=d.split("-").map(Number);return RDW[new Date(p[0],p[1]-1,p[2]).getDay()]+" "+p[2]+". "+p[1]+".";}
{const _sp=sheetProgress;sheetProgress=function(b,day){_sp(b);const go=$("pgGo");if(!go)return;const t=today();RD.day=day||RD.pre||t;RD.pre=null;
  const days=[];for(let i=0;i<7;i++)days.push(addDays(t,-i));if(!days.includes(RD.day))RD.day=t;
  go.insertAdjacentHTML("beforebegin",'<div class="field rdF"><label>Kada si čitala?</label><div class="rdDays" id="rdDays">'+days.map((d,i)=>'<button type="button" data-d="'+d+'" aria-pressed="'+(d===RD.day)+'">'+rdLabel(d,i)+(S.days[d]?' <i>✓</i>':'')+'</button>').join("")+'</div><small class="muted" id="rdNote"></small></div>');
  const note=()=>{$("rdNote").textContent=RD.day===t?"":"Stranice će se upisati za "+rdLabel(RD.day,days.indexOf(RD.day)).toLowerCase()+", pa ti niz čitanja ostaje cijeli.";};note();
  $("rdDays").querySelectorAll("button").forEach(x=>x.onclick=()=>{sfx.click();RD.day=x.dataset.d;$("rdDays").querySelectorAll("button").forEach(y=>y.setAttribute("aria-pressed",String(y===x)));note();});
  const f=go.onclick;go.onclick=()=>{const before=b.page,had=!!S.days[t],prevLast=b.lastRead||"",wasDone=!!b.done,n0=S.log?S.log.length:0,day=RD.day,st0=streak();f();
    if(!(b.page>before)||day===t)return;try{if(S.log&&S.log.length>n0)S.log[S.log.length-1].d=day;S.days[day]=true;if(!had)delete S.days[t];b.lastRead=prevLast>day?prevLast:day;if(b.done&&!wasDone)b.doneD=day;save();renderHUD();
      const st=streak();setTimeout(()=>toast("Upisano za "+rdLabel(day,days.indexOf(day)).toLowerCase()+"."+(st>st0?" Niz čitanja je sada "+st+" "+(st===1?"dan":"dana")+"!":""),4200),2200);}catch(e){console.warn("upis",e);}};};}
{const _sr=sheetRead;sheetRead=function(){_sr.apply(this,arguments);const t=today(),cur=S.books.filter(b=>!b.done);if(!cur.length)return;const days=[];for(let i=6;i>=0;i--)days.push(addDays(t,-i));const miss=days.filter(d=>!S.days[d]&&d!==t).length;
  $("sheetBody").insertAdjacentHTML("beforeend",'<div class="card rdWeek"><b>Tvoj tjedan čitanja</b><div class="rdDots">'+days.map((d,i)=>'<button type="button" data-d="'+d+'" class="'+(S.days[d]?"on":"")+'"'+(S.days[d]?' disabled':'')+'><i>'+(S.days[d]?"✓":"")+'</i><span>'+rdLabel(d,6-i)+'</span></button>').join("")+'</div><small class="muted" id="rdHint">'+(miss?"Zaboravila si upisati neki dan? Dodirni ga pa odaberi knjigu.":"Svaki dan je upisan. Bravo!")+'</small></div>');
  $("sheetBody").querySelectorAll(".rdDots button").forEach(x=>x.onclick=()=>{sfx.click();if(cur.length===1){sheetProgress(cur[0],x.dataset.d);return;}RD.pre=x.dataset.d;$("sheetBody").querySelectorAll(".rdDots button").forEach(y=>y.classList.toggle("sel",y===x));$("rdHint").textContent="Sad odaberi knjigu koju si tada čitala.";$("sheet").scrollTop=0;});};}
{const _cs=closeSheet;closeSheet=function(){RD.pre=null;return _cs.apply(this,arguments);};}
