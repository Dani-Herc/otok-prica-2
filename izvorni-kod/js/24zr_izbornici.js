/* =================== v47: IZBORNICI: every window gets a coloured heading, quick tiles get pictures ===================
   openSheet() is wrapped: when a window starts with a plain <h2>, the heading (and its first short line of text)
   moves into a banner whose colour and little picture follow the subject of the window. The explore menu turns its
   row of text buttons into picture tiles. Only looks change; no handler is touched, nothing is saved. */
const IZI={
  star:'<path d="M12 2.5l2.8 6 6.5.8-4.8 4.5 1.3 6.5L12 17l-5.8 3.3 1.3-6.5L2.7 9.3l6.5-.8z"/>',
  book:'<path d="M3 5.5C5.5 4 9 4 12 6c3-2 6.5-2 9-.5V19c-2.5-1.5-6-1.5-9 .5-3-2-6.5-2-9-.5z"/><path d="M12 6v13.5" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>',
  bag:'<path d="M5 9h14l1.5 11h-17z"/><path d="M8.5 9V7a3.5 3.5 0 017 0v2" fill="none" stroke="#fff" stroke-width="2"/>',
  map:'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>',
  gear:'<path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 5.2v-2.4l-2.3-.5a7 7 0 00-.7-1.7l1.3-2-1.7-1.7-2 1.3a7 7 0 00-1.7-.7L13.2 3h-2.4l-.5 2.3a7 7 0 00-1.7.7l-2-1.3-1.7 1.7 1.3 2a7 7 0 00-.7 1.7L3 10.8v2.4l2.3.5a7 7 0 00.7 1.7l-1.3 2 1.7 1.7 2-1.3a7 7 0 001.7.7l.5 2.3h2.4l.5-2.3a7 7 0 001.7-.7l2 1.3 1.7-1.7-1.3-2a7 7 0 00.7-1.7z" fill-rule="evenodd"/>',
  heart:'<path d="M12 20.5S3 15 3 9a4.5 4.5 0 019-1.5A4.5 4.5 0 0121 9c0 6-9 11.5-9 11.5z"/>',
  paw:'<circle cx="6" cy="10" r="2.2"/><circle cx="10" cy="6.5" r="2.2"/><circle cx="14.5" cy="6.5" r="2.2"/><circle cx="18.5" cy="10" r="2.2"/><path d="M12.2 11c-3.2 0-5.7 3-5.7 5.5 0 2 1.7 2.8 3.2 2.3 1.6-.6 3.4-.6 5 0 1.5.5 3.2-.3 3.2-2.3 0-2.5-2.5-5.5-5.7-5.5z"/>',
  q:'<path d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm0 14.7a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zM12 6c2.3 0 4 1.5 4 3.5 0 1.7-1 2.5-1.9 3.2-.7.5-1.1.9-1.1 1.8h-2c0-1.7.9-2.5 1.8-3.2.7-.5 1.2-.9 1.2-1.7 0-.9-.8-1.6-2-1.6s-2 .7-2.2 1.8l-2-.3C8.2 7.4 9.8 6 12 6z" fill-rule="evenodd"/>',
  ticket:'<path d="M3 7h18v3.5a1.5 1.5 0 000 3V17H3v-3.5a1.5 1.5 0 000-3z"/><path d="M9 7v10" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="1.3" stroke-dasharray="2 2"/>',
  wand:'<path d="M3.5 18.5l10-10 2 2-10 10z"/><path d="M17 2l1 2.5L20.5 5.5 18 6.5 17 9l-1-2.5L13.5 5.5 16 4.5zM20.5 11l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z"/>',
  cam:'<path d="M3 7.5h4l1.5-2.5h7L17 7.5h4v11H3z"/><circle cx="12" cy="13" r="3.4" fill="rgba(0,0,0,.28)"/><circle cx="12" cy="13" r="2" />',
  mail:'<path d="M3 6h18v12H3z"/><path d="M3.5 6.5L12 13l8.5-6.5" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.4"/>',
  note:'<path d="M9 4.5l10-2v12.3a2.7 2.7 0 11-2-2.6V6.8L11 8v8.8a2.7 2.7 0 11-2-2.6z"/>',
  home:'<path d="M12 3l9 8h-2.5v9h-5v-6h-3v6h-5v-9H3z"/>',
  ladder:'<path d="M6 2.5h2V21H6zM16 2.5h2V21h-2z"/><path d="M7 6h10v2H7zM7 11h10v2H7zM7 16h10v2H7z"/>'};
const izSvg=k=>'<svg viewBox="0 0 24 24" aria-hidden="true" fill="#fff">'+IZI[k]+'</svg>';
/* title -> [theme, picture] */
const IZT=[[/plesovi|čarolij|čarobn|portal|zdenac|štapić/i,"magic","wand"],[/igraonic|kviz|igranje/i,"play","ticket"],[/dnevnik|knjig|čitala|naslovnic|stranic|enciklopedij|album|priča|uspomen|bilješ/i,"book","book"],
  [/torba|radionic|kockic|tržnic|trgovin/i,"craft","bag"],[/zadaci|poruka|signal|zove/i,"job","mail"],[/karta|kompas|otok|gdje|putovanj|teleskop/i,"sea","map"],
  [/kako se igra|\?\?\?/i,"help","q"],[/razin|napred|nagrad|bravo|pročitana/i,"gold","star"],[/zvuk/i,"sea","note"],[/roditelj/i,"calm","gear"],
  [/staništ|prijatelj|životinj|jaje|gladni/i,"leaf","paw"],[/građevin|preuredi|gradimo|izrasti/i,"craft","home"],[/razglednic|foto/i,"play","cam"],[/glas otoka|dobro došla/i,"leaf","heart"]];
function izHero(){const B=$("sheetBody"),sh=$("sheet");if(!B||!sh)return;sh.classList.remove("hasHero");const h=B.firstElementChild;if(!h||h.tagName!=="H2")return;
  const t=h.textContent||"";let th="calm",ic="star";for(const r of IZT)if(r[0].test(t)){th=r[1];ic=r[2];break;}
  const hero=document.createElement("div");hero.className="shHero th-"+th;hero.innerHTML='<span class="shIco">'+izSvg(ic)+'</span><div class="shTx"></div><i class="shSp s1"></i><i class="shSp s2"></i><i class="shSp s3"></i>';
  const nx=h.nextElementSibling;B.insertBefore(hero,h);const tx=hero.querySelector(".shTx");tx.appendChild(h);
  if(nx&&nx.tagName==="P"&&!nx.id&&!nx.querySelector("button,input,a,img")&&(nx.textContent||"").length<150)tx.appendChild(nx);
  sh.classList.add("hasHero");}
{const _os=openSheet;openSheet=function(){_os.apply(this,arguments);try{izHero();}catch(e){console.warn("izbornici",e);}};}
{const _cs=closeSheet;closeSheet=function(){_cs.apply(this,arguments);};}
/* the explore menu: the loose text buttons become picture tiles */
const IZQ={mmFoto:["cam","play"],mmKarta:["map","sea"],mmJob:["mail","job"],mmStan:["paw","leaf"],mmHow:["q","help"],mmLv:["ladder","gold"]};
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);try{const B=$("sheetBody");const bs=[...B.querySelectorAll("button")].filter(b=>IZQ[b.id]);if(bs.length<2)return;
    const grid=document.createElement("div");grid.className="mmQuick";const rows=new Set();bs.forEach(b=>{rows.add(b.parentElement);const q=IZQ[b.id]||["star","calm"];b.className="mmQ th-"+q[1];b.innerHTML='<span class="shIco">'+izSvg(q[0])+'</span><b>'+esc(b.textContent)+'</b>';grid.appendChild(b);});
    const first=[...rows][0];first.parentElement.insertBefore(grid,first);rows.forEach(r=>{if(r!==B&&!r.children.length)r.remove();});
    const lab=document.createElement("h3");lab.className="mmLab";lab.textContent="Još toga";grid.parentElement.insertBefore(lab,grid);}catch(e){console.warn("izbornici",e);}};}
