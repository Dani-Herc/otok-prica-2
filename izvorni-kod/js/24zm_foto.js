/* =================== v42: FOTO: photo mode and postcards in the diary ===================
   The camera hides the whole interface, shows a viewfinder and takes a framed postcard with the name of the land
   and the date. Postcards live in the diary tab "Razglednice" (at most 12), can be saved as a picture or deleted.
   Pictures are kept in their OWN localStorage key (otok-prica-foto) so the game save and cloud sync stay small;
   the save only gets S.foto={n,lands}. */
const FO={on:false,f:0,key:"otok-prica-foto",max:12};
const FOF=[["Običan","none"],["Topli","saturate(1.25) sepia(.22) brightness(1.04)"],["Stari film","sepia(.75) contrast(1.05)"],["Crno-bijeli","grayscale(1) contrast(1.1)"]];
function foList(){try{const a=JSON.parse(localStorage.getItem(FO.key)||"[]");return Array.isArray(a)?a:[];}catch(e){return [];}}
function foSave(a){try{localStorage.setItem(FO.key,JSON.stringify(a));return true;}catch(e){return false;}}
const foLand=()=>WORLD?(DST[WORLD]?DST[WORLD].n:(WDEF[WORLD]&&WDEF[WORLD].n)||"Čarobni svijet"):"Glavni otok";
function foUI(){if($("fotoUI"))return;document.body.insertAdjacentHTML("beforeend",'<div id="fotoUI" hidden><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i><div id="fotoFlash"></div><div class="fotoBar"><button class="btn soft" id="foX">Zatvori</button><button id="foGo" aria-label="Fotografiraj"><span></span></button><button class="btn soft" id="foF">Običan</button></div><p id="foTip">Povuci prstom ili mišem da okreneš pogled, pa pritisni okrugli gumb.</p></div>');
  $("foX").onclick=()=>{sfx.click();foOff();};$("foF").onclick=()=>{sfx.click();FO.f=(FO.f+1)%FOF.length;$("foF").textContent=FOF[FO.f][0];$("gl").style.filter=FOF[FO.f][1]==="none"?"":FOF[FO.f][1];};$("foGo").onclick=foSnap;}
function foOn(){foUI();closeSheet();FO.on=true;FO.f=0;$("foF").textContent=FOF[0][0];document.body.classList.add("foto");$("fotoUI").hidden=false;}
function foOff(){FO.on=false;document.body.classList.remove("foto");if($("fotoUI"))$("fotoUI").hidden=true;$("gl").style.filter="";}
function foSnap(){const L=foList();if(L.length>=FO.max){toast("Album je pun ("+FO.max+" razglednica). Obriši jednu u dnevniku pa fotografiraj dalje.",4200);return;}
  try{composer.render(0);const src=renderer.domElement,W2=480,H2=300,c=document.createElement("canvas");c.width=W2+20;c.height=H2+54;const x=c.getContext("2d");x.fillStyle="#fffdf7";x.fillRect(0,0,c.width,c.height);
    const sr=src.width/src.height,dr=W2/H2;let sw=src.width,sh=src.height,sx=0,sy=0;if(sr>dr){sw=src.height*dr;sx=(src.width-sw)/2;}else{sh=src.width/dr;sy=(src.height-sh)/2;}
    try{x.filter=FOF[FO.f][1];}catch(e){}x.drawImage(src,sx,sy,sw,sh,10,10,W2,H2);try{x.filter="none";}catch(e){}
    const d=new Date(),land=foLand();x.fillStyle="#16243a";x.font="bold 17px sans-serif";x.textBaseline="middle";x.fillText("Otok priča · "+land,14,H2+31);x.font="14px sans-serif";x.textAlign="right";x.fillText(d.getDate()+". "+(d.getMonth()+1)+". "+d.getFullYear()+".",W2+6,H2+31);
    const u=c.toDataURL("image/jpeg",.8);L.push({d:today(),l:land,u});if(!foSave(L)){toast("Nema više mjesta za slike na ovom uređaju. Obriši koju staru razglednicu.",4200);return;}
    S.foto=S.foto||{n:0,lands:{}};S.foto.lands=S.foto.lands||{};S.foto.n=(S.foto.n||0)+1;let bonus=0;if(!S.foto.lands[land]){S.foto.lands[land]=today();bonus=15;S.coins+=15;}save();renderEco();
    tone(1800,.04,"square",.03);tone(900,.06,"square",.03,.05);const fl=$("fotoFlash");fl.classList.remove("go");void fl.offsetWidth;fl.classList.add("go");
    setTimeout(()=>toast("Razglednica je u dnevniku ("+L.length+" od "+FO.max+")."+(bonus?" Prva s ovog mjesta: +15 zlatnika!":""),3200),350);}catch(e){console.warn("foto",e);toast("Fotoaparat se zaglavio. Pokušaj još jednom.",3000);}}
function foHTML(){const L=foList();return '<p class="muted">Ovdje su razglednice koje si sama snimila. Fotoaparat radi na otoku i u istraživanju.</p><button class="btn big" id="foStart">Uključi fotoaparat</button>'+
  (L.length?'<div class="foGrid">'+L.map((p,i)=>'<button class="foCard" data-i="'+i+'"><img alt="Razglednica: '+esc(p.l)+'" src="'+p.u+'"></button>').join("")+'</div><small class="muted">'+L.length+' od '+FO.max+'. Dodirni razglednicu da je povećaš, spremiš ili obrišeš.</small>':'<p class="muted">Još nema razglednica. Nađi lijep pogled i snimi prvu!</p>');}
function foWire(){if($("foStart"))$("foStart").onclick=()=>{sfx.click();foOn();};$("sheetBody").querySelectorAll(".foCard").forEach(b=>b.onclick=()=>{sfx.click();foView(+b.dataset.i);});}
function foView(i){const L=foList(),p=L[i];if(!p){sheetDiary("razglednice");return;}openSheet('<h2>Razglednica</h2><img class="foBig" alt="Razglednica: '+esc(p.l)+'" src="'+p.u+'"><div class="row"><a class="btn big" id="foDl" download="otok-prica-'+p.d+'-'+(i+1)+'.jpg" href="'+p.u+'">Spremi sliku</a><button class="btn soft" id="foDel">Obriši</button></div><button class="btn soft" id="foBack">Natrag u dnevnik</button><p class="muted">Ako se slika ne spremi gumbom, zadrži prst na njoj ili je klikni desnom tipkom.</p>');
  $("foBack").onclick=()=>{sfx.click();sheetDiary("razglednice");};$("foDel").onclick=()=>{sfx.click();if($("foDel").dataset.sure){const A=foList();A.splice(i,1);foSave(A);sheetDiary("razglednice");}else{$("foDel").dataset.sure=1;$("foDel").textContent="Stvarno obriši?";}};}
DTABS.push(["razglednice","Razglednice"]);
{const _sd=sheetDiary;sheetDiary=function(tab){const r=_sd.apply(this,arguments);if(tab==="razglednice"){try{$("sheetBody").insertAdjacentHTML("beforeend",foHTML());foWire();}catch(e){console.warn("foto",e);}}return r;};}
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);const r=$("mmKarta")||$("mmJob")||$("mmStan")||$("mmHow");if(r&&!$("mmFoto")){r.insertAdjacentHTML("beforebegin",'<button class="btn" id="mmFoto">Fotoaparat</button>');$("mmFoto").onclick=()=>{sfx.click();foOn();};}};}
{const _es=endSquirrel;endSquirrel=function(){if(FO.on)foOff();return _es.apply(this,arguments);};}
addEventListener("keydown",e=>{if(FO.on&&e.key==="Escape")foOff();});
