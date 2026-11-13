/* =================== v17: BEZ TEMA: a new book just picks a building ===================
   Dani (2026-11-13): book themes only confuse, and reading one theme all the time gets boring. A new book now asks
   for title, author and pages, then shows all 25 buildings in one list (18 designs + 7 town buildings). b.genre is
   still stored, but only as the family of the chosen design (it keeps blueprints, colours and the daily activity
   working); the player never chooses it. Town buildings keep the book's family, or "zivot" for a new book. */
const ALLB=[];
for(const g of Object.keys(BLD))BLD[g].forEach((d,i)=>ALLB.push({g,b:i,key:i?g+"/"+i:g,n:d[0],d:d[1]}));
for(const k of GRADK)ALLB.push({g:null,b:k,key:"zivot/"+k,n:GRD[k].n,d:GRD[k].d,town:1});
function allbIdx(genre,bld){const b=bld||0;const i=ALLB.findIndex(a=>a.town?a.b===b:(a.g===genre&&a.b===b));return i<0?0:i;}
function allbCards(sel){const card=(a,i)=>'<button class="bldc'+(a.town?" grad":"")+'" data-a="'+i+'" aria-pressed="'+(i===sel)+'"><img alt="" src="'+bldThumb(a.key)+'"><b>'+a.n+'</b><span>'+a.d+'</span>'+(a.town?'<em>Igra: '+GRD[a.b].g+'</em>':'')+'</button>';
  return '<div class="bldpick">'+ALLB.map((a,i)=>a.town?"":card(a,i)).join("")+'</div><h3 class="gradH">Zgrade iz grada <small>svaka ima svoju igru</small></h3><div class="bldpick">'+ALLB.map((a,i)=>a.town?card(a,i):"").join("")+'</div>';}
function allbApply(st,i){const a=ALLB[i];st.bld=a.b;st.genre=a.g||st.genre||"zivot";}
sheetNewBook=function(pre){const st=pre||{t:"",a:"",p:"",genre:null,bld:0,plot:-1};
  openSheet('<h2>Nova knjiga</h2><p class="muted">Korak 1 od 3</p><div class="field"><label for="nbT">Naslov</label><input type="text" id="nbT" maxlength="70" autocomplete="off" placeholder="npr. Čudnovate zgode šegrta Hlapića" value="'+esc(st.t)+'"></div>'+
   '<div class="field"><label for="nbA">Autor (ako znaš)</label><input type="text" id="nbA" maxlength="50" autocomplete="off" value="'+esc(st.a)+'"></div>'+
   '<div class="field"><label for="nbP">Koliko knjiga ima stranica?</label><input type="number" id="nbP" min="5" max="3000" inputmode="numeric" placeholder="npr. 180" value="'+esc(st.p)+'"></div>'+
   '<p class="err" id="nbErr" hidden></p><button class="btn big" id="nbGo">Dalje: odaberi zgradu</button>');
  $("nbGo").onclick=()=>{const t=$("nbT").value.trim(),p=parseInt($("nbP").value,10);const err=m=>{$("nbErr").textContent=m;$("nbErr").hidden=false;};
    if(!t)return err("Upiši naslov knjige.");if(!(p>=5&&p<=3000))return err("Upiši broj stranica (barem 5).");
    if(!PLOTS.some((_,i)=>!S.books.some(b=>b.plot===i)))return err("Na otoku više nema mjesta.");st.t=t;st.a=$("nbA").value.trim();st.p=p;sfx.click();
    if(!st.genre)allbApply(st,0);nbStep2(st);};};
nbStep2=function(st){let sel=allbIdx(st.genre,st.bld);const info=()=>{const A=gradAct(st.genre,st.bld);return 'Kad završiš knjigu, u zgradi te čeka: <b>'+A[0]+'</b>. '+A[1]+' Unutra je i soba koju možeš istraživati.';};
  openSheet('<h2>Koju zgradu želiš?</h2><p class="muted">Korak 2 od 3 · '+esc(st.t)+'</p>'+allbCards(sel)+'<p class="muted" id="nbInfo">'+info()+'</p><div class="row"><button class="btn soft" id="nbBack">Natrag</button><button class="btn big" id="nbGo">Dalje: odaberi mjesto</button></div>');
  $("sheetBody").querySelectorAll(".bldc").forEach(c=>c.onclick=()=>{sfx.click();sel=+c.dataset.a;const g0=st.genre;allbApply(st,sel);if(g0!==st.genre)st.plot=-1;$("sheetBody").querySelectorAll(".bldc").forEach(x=>x.setAttribute("aria-pressed",String(x===c)));$("nbInfo").innerHTML=info();});
  $("nbBack").onclick=()=>{sfx.click();sheetNewBook(st);};$("nbGo").onclick=()=>{sfx.click();nbStep3(st);};};
/* rebuilding may switch to a design of another family: the old blueprint is cleared with the old key */
{const _bk=bkey;bkey=function(b){if(b&&b.__oldKey){const k=b.__oldKey;delete b.__oldKey;return k;}return _bk.apply(this,arguments);};}
sheetRebuild=function(b){let sel=allbIdx(b.genre,b.bld);const cur=sel;const price=b.reno?80:0;
  openSheet('<h2>Preuredi zgradu</h2><p class="muted">'+esc(b.title)+' · '+(price?'Preuređenje stoji '+price+' zlatnika.':'Prvo preuređenje je besplatno.')+'</p>'+allbCards(sel)+'<p class="err" id="rbErr" hidden></p><div class="row"><button class="btn soft" id="rbNo">Odustani</button><button class="btn big" id="rbGo">Preuredi</button></div>');
  $("sheetBody").querySelectorAll(".bldc").forEach(c=>c.onclick=()=>{sfx.click();sel=+c.dataset.a;$("sheetBody").querySelectorAll(".bldc").forEach(x=>x.setAttribute("aria-pressed",String(x===c)));});
  $("rbNo").onclick=()=>sheetBuilding(b);$("rbGo").onclick=()=>{if(sel===cur){$("rbErr").textContent="To je zgrada koju već imaš. Odaberi drugu.";$("rbErr").hidden=false;return;}
    if(S.coins<price){$("rbErr").textContent="Treba ti "+price+" zlatnika.";$("rbErr").hidden=false;return;}S.coins-=price;b.reno=(b.reno||0)+1;renderEco();closeSheet();gradDecorClear(b);
    const a=ALLB[sel];if(a.g&&a.g!==b.genre){b.__oldKey=bkey(b);b.genre=a.g;}try{bldRebuild(b,a.b);}finally{delete b.__oldKey;save();}setTimeout(()=>gradDecor(b,false),900);};};
