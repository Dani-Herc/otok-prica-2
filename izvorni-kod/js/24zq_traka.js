/* =================== v47: TRAKA: one bar at the bottom for blocks, tools and spells ===================
   The bottom bar now has two pages. Page "Kockice" is the old hotbar (paw, blocks, bag). Page "Oruđa i čarolije"
   holds what used to sit in the belt on the left: tools, boat, lamp and the gadgets. Q or the two small tabs flip
   the page, keys 1 to 9 pick a slot, the name of what you picked shows above the bar. The belt on the left is gone.
   Save: nothing new. */
const TRK={page:0,hand:null,labT:0};
const TR_IC=['<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#8fd16a" d="M8 1l6 3-6 3-6-3z"/><path fill="#a9743f" d="M2 4l6 3v8l-6-3z"/><path fill="#7d5229" d="M14 4l-6 3v8l6-3z"/></svg>',
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="#c9a0ff" d="M2.2 12.4l7-7 1.4 1.4-7 7z"/><path fill="#ffd35a" d="M11.5 0l.9 2.2L14.6 3l-2.2.9-.9 2.2-.9-2.2L8.4 3l2.2-.8zM14.3 6.6l.5 1.2 1.2.5-1.2.5-.5 1.2-.5-1.2-1.2-.5 1.2-.5z"/></svg>'];
function trLabel(t){let el=$("trLab");if(!el){$("fpUI").insertAdjacentHTML("beforeend",'<div id="trLab" class="trLab" hidden></div>');el=$("trLab");}const hb=$("hotbar");if(!hb||!t)return;
  const r=hb.getBoundingClientRect();el.textContent=t;el.hidden=false;el.style.left=Math.max(90,Math.min(innerWidth-90,r.left+r.width/2))+"px";el.style.top=(r.top-12)+"px";el.style.animation="none";void el.offsetWidth;el.style.animation="";clearTimeout(TRK.labT);TRK.labT=setTimeout(()=>{el.hidden=true;},1900);}
function trPage(n){if(TRK.page===n)return;TRK.page=n;tone(n?740:520,.04,"triangle",.02);hotbarRender();trLabel(n?"Oruđa i čarolije":"Kockice");}
function trTabs(){return '<div class="trTabs">'+[0,1].map(i=>'<button class="trTab'+(TRK.page===i?" on":"")+'" data-tp="'+i+'" aria-label="'+(i?"Oruđa i čarolije":"Kockice")+'" title="'+(i?"Oruđa i čarolije":"Kockice")+' (Q)">'+TR_IC[i]+'</button>').join("")+'</div>';}
function trDraw(){const el=$("hotbar");if(!el)return;el.classList.add("traka");el.setAttribute("aria-label",TRK.page?"Oruđa i čarolije":"Kockice u ruci");
  if(TRK.page===1){const L=beltL=beltItems();if(beltI>=L.length)beltI=0;
    el.innerHTML=trTabs()+(L.length?L.slice(0,9).map((it,i)=>'<button class="slot sp'+(i===beltI?" on":"")+(it.on===true?" tgOn":it.on===false?" tgOff":"")+'" data-bi="'+i+'" title="'+esc(it.n)+'" aria-label="'+esc(it.n)+'"><img alt="" src="'+it.ic+'"><i class="trN">'+(i+1)+'</i>'+(it.key&&!fpTouch()?'<kbd>'+it.key+'</kbd>':'')+'</button>').join(""):'<span class="trEmpty">Čarolije i oruđa dobivaš u Radionici i Čarobnoj trgovini.</span>');
    el.querySelectorAll("[data-bi]").forEach(b=>{b.onpointerdown=e=>e.stopPropagation();b.onclick=e=>{e.stopPropagation();beltI=+b.dataset.bi;const nm=beltL[beltI]&&beltL[beltI].n;TRK.tipped=false;beltUse();const s=el.querySelector('[data-bi="'+beltI+'"]');if(s){s.classList.add("pop");}if(nm&&!TRK.tipped)trLabel(nm);};});}
  else{el.insertAdjacentHTML("afterbegin",trTabs());el.querySelectorAll(".slot").forEach((s,i)=>{if(i<9)s.insertAdjacentHTML("beforeend",'<i class="trN">'+(i+1)+'</i>');});
    if(TRK.hand!==null&&TRK.hand!==FP.hand)trLabel(FP.hand?thingName(FP.hand):"Šapa");TRK.hand=FP.hand;}
  el.querySelectorAll("[data-tp]").forEach(b=>{b.onpointerdown=e=>e.stopPropagation();b.onclick=e=>{e.stopPropagation();sfx.click();trPage(+b.dataset.tp);};});}
{const _hr=hotbarRender;hotbarRender=function(){_hr.apply(this,arguments);try{trDraw();}catch(e){console.warn("traka",e);}};}
/* the belt on the left is replaced by page two of the bar */
beltRender=function(force){if(!FP.on)return;const b=$("belt");if(b){b.hidden=true;if(b.firstChild)b.innerHTML="";}const L=beltItems();if(beltI>=L.length)beltI=0;const sig=L.map(i=>i.id+(i.on==null?"":i.on?1:0)).join("|")+"#"+beltI;
  if(!force&&sig===beltSig)return;beltSig=sig;beltL=L;if(TRK.page===1)trDraw();};
beltTip=function(i,t){TRK.tipped=true;trLabel(t);};
{const _bs=beltSel;beltSel=function(d){if(TRK.page!==1){TRK.page=1;hotbarRender();}_bs.apply(this,arguments);};}
addEventListener("keydown",e=>{if(!FP.on||e.repeat||!$("veil").hidden)return;if(e.target&&e.target.closest&&e.target.closest("input,textarea"))return;if(e.key.toLowerCase()==="q"){e.preventDefault();sfx.click();trPage(1-TRK.page);}});
{const _ss=startSquirrel;startSquirrel=function(){_ss.apply(this,arguments);if(!FP.on)return;TRK.hand=FP.hand;
  setTimeout(()=>{if(FP.on)tipOnce("traka",fpTouch()?"Dolje je tvoja traka. Dodirni mali čarobni štapić na njoj i otvorit će se oruđa i čarolije.":"Dolje je tvoja traka. Tipke 1 do 9 biraju mjesto, a tipka Q mijenja kockice i čarolije.",6500);},4000);};}
