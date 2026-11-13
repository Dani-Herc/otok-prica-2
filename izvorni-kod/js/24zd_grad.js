/* =================== v32: GRD: real-life buildings with their own game ===================
   Seven buildings from real life can grow from any book (b.bld is then a word, e.g. "skola"). Each has a solo
   game inside; gold needs the animal whose ability fits the job. Decorations around a building and an island
   development level round it off. Save: S.grad={rec:{},dec:{},day:""} (optional). */
const GRD={
  skola:{n:"Škola",d:"Škola od cigle sa zvonikom i zastavom",g:"Školsko zvono",gd:"Riješi što više zadataka prije zvona.",an:"sova",ab:"Mudrost: sova dobiva 8 sekundi više.",m:[8,14,20],u:"zadataka"},
  pekara:{n:"Pekara",d:"Bijela pekara s tendom i dimnjakom",g:"Vruće pecivo",gd:"Izvadi pecivo iz peći točno kad je zlatno.",an:"panda",ab:"Spretne šape: pandi je zlatno polje šire.",m:[10,15,20],u:"bodova"},
  posta:{n:"Pošta",d:"Žuta pošta s crvenim sandučićem",g:"Brza pošta",gd:"Ubaci svako pismo u pravi sandučić.",an:"zec",ab:"Brze noge: zec ima 9 sekundi više.",m:[8,13,18],u:"pisama"},
  vatrogasci:{n:"Vatrogasni dom",d:"Crveni dom s garažom i tornjem",g:"Gasi vatru",gd:"Ugasi svaki plamen prije nego što se razbukta.",an:"pingvin",ab:"Majstor vode: pingvinu plamen sporije raste.",m:[15,24,32],u:"plamenova"},
  ambulanta:{n:"Veterinarska ambulanta",d:"Bijela ambulanta s crvenim križem",g:"Mali veterinar",gd:"Pronađi parove pacijenata u što manje poteza.",an:"macka",ab:"Tihe šape: mačka na početku nakratko vidi sve kartice.",m:[14,20,25],u:"bodova"},
  cvjecarna:{n:"Cvjećarna",d:"Staklena cvjećarna s ružičastim krovom",g:"Buket po narudžbi",gd:"Zapamti redoslijed cvijeća i složi buket.",an:"jez",ab:"Vrtlar: ježu se narudžba pokazuje sporije i ima jedan pokušaj više.",m:[2,4,6],u:"buketa"},
  muzej:{n:"Muzej",d:"Bijeli muzej sa stupovima",g:"Što nedostaje?",gd:"Zapamti izloške i otkrij koji je nestao.",an:"lisica",ab:"Oštro oko: lisica izloške gleda dulje.",m:[4,6,8],u:"izložaka"}};
const GRADK=Object.keys(GRD);
const GAN={sova:"Sovica Lepršica",panda:"Crvena panda Akrobatka",zec:"Zečica Skokica",pingvin:"Pingvin Plivko",macka:"Mačka Brzica",jez:"Ježić Kotrljko",lisica:"Lisica Rida"};
function gradS(){S.grad=S.grad||{};S.grad.rec=S.grad.rec||{};S.grad.dec=S.grad.dec||{};return S.grad;}
function gradChar(){return S.mg&&MCHAR[S.mg.char]?S.mg.char:"lisica";}
function gradPerk(k){return gradChar()===GRD[k].an;}
function gradPic(an){try{return portrait(an==="lisica"?"rida":an);}catch(e){return "";}}

/* ---------- the seven designs ---------- */
const GRADB={
  skola(){const b=BP();ZB.floor(b,-5,-5,5,5,T.kaldrma);ZB.house(b,-4,-3,4,2,0,4,T.cigla,T.kamen);ZB.door(b,0,2);b.set(0,2,2,T.kvarc);
    [-3,-2,2,3].forEach(x=>{b.set(x,1,2,T.staklo);b.set(x,3,2,T.staklo);b.set(x,2,-3,T.staklo);});[-1,1].forEach(z=>{b.set(-4,2,z,T.staklo);b.set(4,2,z,T.staklo);});
    const top=ZB.gable(b,-4,-3,4,2,5,T.krov,T.cigla);b.box(-1,5,-1,1,top+1,0,T.kvarc,true);b.set(0,top,0,T.zlato);b.set(0,top+1,2,0);b.box(-2,top+2,-2,2,top+2,1,T.krov);b.box(-1,top+3,-1,1,top+3,0,T.krov);
    for(let y=0;y<=5;y++)b.set(4,y,4,T.tdaske);b.set(3,5,4,T.vuna_c);b.set(3,4,4,T.vuna_b);b.set(2,5,4,T.vuna_c);b.set(2,4,4,T.vuna_b);
    b.set(-4,0,4,T.lisce);b.set(-3,0,4,T.lisce);b.set(-5,0,3,T.lampion);b.set(1,1,-1,T.stol);b.set(-2,1,-1,T.stol);b.set(-3,1,-2,T.polica);return ZB.out(b);},
  pekara(){const b=BP();ZB.floor(b,-4,-4,4,5,T.kaldrma);ZB.house(b,-3,-3,3,2,0,3,T.bdaske,T.tdaske);b.box(-3,0,-3,3,0,2,T.cigla,true);ZB.door(b,-1,2);
    b.set(1,1,2,T.staklo);b.set(2,1,2,T.staklo);b.set(1,2,2,T.staklo);b.set(2,2,2,T.staklo);b.set(-3,2,0,T.staklo);b.set(3,2,-1,T.staklo);
    for(let x=-3;x<=3;x++)b.set(x,3,3,x%2?T.vuna_c:T.vuna_b);const top=ZB.hip(b,-4,-4,4,3,4,T.krov);
    for(let y=1;y<=8;y++)b.set(2,y,-2,T.cigla);b.set(2,9,-2,T.kamen);b.box(-1,top+1,0,1,top+1,0,T.sijeno);b.set(0,top+2,0,T.sijeno);
    b.set(0,1,-2,T.zar);b.set(-2,1,-2,T.bacva);b.set(-3,0,4,T.bacva);b.set(3,0,4,T.sijeno);b.set(4,0,3,T.lampion);return ZB.out(b);},
  posta(){const b=BP();ZB.floor(b,-4,-4,4,5,T.kaldrma);ZB.house(b,-3,-3,3,2,0,4,T.vuna_zl,T.kvarc);ZB.door(b,0,2);b.set(0,2,2,T.zlato);
    [[-2,1,2],[2,1,2],[-2,3,2],[2,3,2],[0,3,2],[-3,2,0],[3,2,0],[0,2,-3]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));
    b.box(-4,5,-4,4,5,3,T.kvarc);b.box(-3,6,-3,3,6,2,T.tuf);b.box(-2,7,-2,2,7,1,T.tuf);
    b.set(3,0,4,T.tdaske);b.set(3,1,4,T.vuna_c);b.set(-3,0,4,T.tdaske);b.set(-3,1,4,T.vuna_c);b.set(-2,1,-2,T.polica2);b.set(2,1,-2,T.stol);b.set(4,0,-4,T.lampion);
    for(let y=6;y<=9;y++)b.set(-3,y,-3,T.tdaske);b.set(-2,9,-3,T.vuna_zl);b.set(-2,8,-3,T.vuna_zl);return ZB.out(b);},
  vatrogasci(){const b=BP();ZB.floor(b,-5,-4,5,5,T.kaldrma);ZB.house(b,-4,-3,2,2,0,4,T.vuna_c,T.kamen);
    [[-3,-2],[0,1]].forEach(d=>{for(let x=d[0];x<=d[1];x++)for(let y=0;y<=2;y++)b.set(x,y,2,0);for(let x=d[0];x<=d[1];x++)b.set(x,3,2,T.kvarc);});
    b.box(-5,5,-4,3,5,3,T.kamen);b.box(-4,5,-3,2,5,2,T.tuf);[-4,2].forEach(x=>b.set(x,3,0,T.staklo));
    ZB.house(b,3,-3,5,-1,0,9,T.kcigla,T.kamen);[[4,3,-1],[4,6,-1],[5,5,-2]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.box(2,10,-4,6,10,0,T.kamen,true);b.box(3,10,-3,5,10,-1,T.kamen);
    b.set(4,11,-2,T.svjetlo);b.set(4,12,-2,T.vuna_c);b.set(-3,0,0,T.vuna_c);b.set(-2,0,0,T.vuna_c);b.set(-3,1,0,T.kvarc);b.set(4,0,3,T.bacva);b.set(5,0,3,T.bacva);b.set(-5,0,4,T.lampion);return ZB.out(b);},
  ambulanta(){const b=BP();ZB.floor(b,-5,-4,5,5,T.kaldrma);ZB.house(b,-4,-3,4,2,0,3,T.kvarc,T.kvarc);ZB.door(b,0,2);
    for(let x=-3;x<=3;x++)if(x&&Math.abs(x)!==1){b.set(x,2,2,T.staklo);b.set(x,2,-3,T.staklo);}[-1,1].forEach(z=>{b.set(-4,2,z,T.staklo);b.set(4,2,z,T.staklo);});
    b.box(-5,4,-4,5,4,3,T.tuf);b.box(-4,4,-3,4,4,2,T.kvarc);b.box(-2,5,2,2,9,2,T.kvarc);[[0,6],[0,7],[0,8],[-1,7],[1,7]].forEach(c=>b.set(c[0],c[1],2,T.vuna_c));
    b.set(-2,1,-1,T.stol);b.set(2,1,-1,T.polica2);b.set(-4,0,4,T.lisce);b.set(-3,0,4,T.tresnja);b.set(3,0,4,T.lisce);b.set(4,0,4,T.tresnja);b.set(5,0,3,T.lampion);return ZB.out(b);},
  cvjecarna(){const b=BP();ZB.floor(b,-4,-4,4,5,T.mahovina);b.box(-3,0,-3,3,0,2,T.daske,true);b.box(-3,1,-3,3,2,2,T.staklo,true);[[-3,-3],[3,-3],[-3,2],[3,2]].forEach(c=>{for(let y=0;y<=2;y++)b.set(c[0],y,c[1],T.bdaske);});ZB.door(b,0,2);
    b.box(-4,3,-4,4,3,3,T.vuna_p);b.box(-3,4,-3,3,4,2,T.vuna_p);b.box(-2,5,-2,2,5,1,T.vuna_p,true);b.box(-1,5,-1,1,5,0,T.staklo);b.set(0,6,0,T.tresnja);
    [[-2,-2,T.tresnja],[2,-2,T.carlisce],[-2,0,T.lisce_b],[2,0,T.tresnja]].forEach(p=>{b.set(p[0],0,p[1],T.oranica);b.set(p[0],1,p[1],p[2]);});
    [[-4,4,T.tresnja],[-2,4,T.carlisce],[2,4,T.tresnja],[4,4,T.lisce_b],[4,1,T.carlisce],[-4,0,T.tresnja]].forEach(p=>{b.set(p[0],0,p[1],T.lisce);b.set(p[0],1,p[1],p[2]);});
    b.set(3,0,4,T.bundeva);b.set(-3,0,4,T.lampion);b.set(1,0,4,T.stalak);return ZB.out(b);},
  muzej(){const b=BP();ZB.floor(b,-5,-5,5,5,T.kamen);b.box(-5,0,-4,5,0,3,T.kvarc);b.box(-4,0,4,4,0,4,T.kvarc);ZB.house(b,-4,-3,4,1,1,5,T.pjescenjak,T.kvarc);b.set(0,1,1,0);b.set(0,2,1,0);b.set(0,3,1,T.zlato);
    [-4,-2,2,4].forEach(x=>{for(let y=1;y<=5;y++)b.set(x,y,3,T.kvarc);});b.box(-5,6,-4,5,6,4,T.kvarc);
    for(let k=0;k<4;k++)b.box(-4+k,7+k,-3,4-k,7+k,3,k%2?T.kvarc:T.pjescenjak);b.set(0,11,0,T.zlato);
    [[-3,3,-3],[3,3,-3],[-4,3,-1],[4,3,-1]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.set(-2,1,-1,T.ametist);b.set(2,1,-1,T.kristal);b.set(0,1,-2,T.zlato);b.set(-5,0,5,T.lampion);b.set(5,0,5,T.lampion);return ZB.out(b);}};
for(const g in GENRES)for(const k of GRADK){BUILDERS[g+"/"+k]=GRADB[k];BLD[g][k]=[GRD[k].n,GRD[k].d];}

/* ---------- choosing: genre designs first, then the town buildings ---------- */
bldCards=function(g,sel){const card=(key,i,d,extra)=>'<button class="bldc'+(extra?" grad":"")+'" data-b="'+i+'" aria-pressed="'+(i===sel)+'"><img alt="" src="'+bldThumb(key)+'"><b>'+d[0]+'</b><span>'+d[1]+'</span>'+(extra||"")+'</button>';
  return '<div class="bldpick">'+BLD[g].map((d,i)=>card(i?g+"/"+i:g,i,d)).join("")+'</div><h3 class="gradH">Zgrade iz grada <small>svaka ima svoju igru</small></h3><div class="bldpick">'+GRADK.map(k=>card(g+"/"+k,k,[GRD[k].n,GRD[k].d],'<em>Igra: '+GRD[k].g+'</em>')).join("")+'</div>';};
const gradSelVal=v=>isNaN(+v)?v:+v;
function gradAct(g,bld){return GRD[bld]?[GRD[bld].g,GRD[bld].gd+" Za zlato treba: "+GAN[GRD[bld].an]+"."]:BACT[g];}
nbStep2=function(st){const info=()=>{const A=gradAct(st.genre,st.bld);return 'Kad završiš knjigu, u građevini te čeka: <b>'+A[0]+'</b>. '+A[1];};
  openSheet('<h2>Što će izrasti?</h2><p class="muted">Korak 2 od 3 · '+esc(st.t)+'</p>'+bldCards(st.genre,st.bld)+'<p class="muted" id="nbInfo">'+info()+'</p><div class="row"><button class="btn soft" id="nbBack">Natrag</button><button class="btn big" id="nbGo">Dalje: odaberi mjesto</button></div>');
  $("sheetBody").querySelectorAll(".bldc").forEach(c=>c.onclick=()=>{sfx.click();st.bld=gradSelVal(c.dataset.b);$("sheetBody").querySelectorAll(".bldc").forEach(x=>x.setAttribute("aria-pressed",String(x===c)));$("nbInfo").innerHTML=info();});
  $("nbBack").onclick=()=>{sfx.click();sheetNewBook(st);};$("nbGo").onclick=()=>{sfx.click();nbStep3(st);};};
sheetRebuild=function(b){let sel=b.bld||0;const price=b.reno?80:0;
  openSheet('<h2>Preuredi građevinu</h2><p class="muted">'+esc(b.title)+' · '+(price?'Preuređenje stoji '+price+' zlatnika.':'Prvo preuređenje je besplatno.')+'</p>'+bldCards(b.genre,sel)+'<p class="err" id="rbErr" hidden></p><div class="row"><button class="btn soft" id="rbNo">Odustani</button><button class="btn big" id="rbGo">Preuredi</button></div>');
  $("sheetBody").querySelectorAll(".bldc").forEach(c=>c.onclick=()=>{sfx.click();sel=gradSelVal(c.dataset.b);$("sheetBody").querySelectorAll(".bldc").forEach(x=>x.setAttribute("aria-pressed",String(x===c)));});
  $("rbNo").onclick=()=>sheetBuilding(b);$("rbGo").onclick=()=>{if(sel===(b.bld||0)){$("rbErr").textContent="To je građevina koju već imaš. Odaberi drugu.";$("rbErr").hidden=false;return;}
    if(S.coins<price){$("rbErr").textContent="Treba ti "+price+" zlatnika.";$("rbErr").hidden=false;return;}S.coins-=price;b.reno=(b.reno||0)+1;renderEco();closeSheet();gradDecorClear(b);bldRebuild(b,sel);setTimeout(()=>gradDecor(b,false),900);};};

/* ---------- decorations around a building ---------- */
const GDEC={staza:{n:"Popločana staza",d:"Kamena staza od knjižnice do zgrade.",p:50},svj:{n:"Ulične svjetiljke",d:"Dvije svjetiljke pred ulazom, svijetle noću.",p:80},klupa:{n:"Klupa i cvijeće",d:"Klupa za odmor i rascvjetani grmovi.",p:60}};
function gradDecList(b){const p=PLOTS[b.plot],out=[];if(!p||p.away)return out;const D=gradS().dec[b.id]||{};const dx=LIB.x-p.x,dz=LIB.z-p.z,len=Math.hypot(dx,dz)||1,ux=dx/len,uz=dz/len,tx=-uz,tz=ux;
  const put=(fx,fz,col)=>{const x=Math.round(p.x+fx),z=Math.round(p.z+fz);const y=topY(x,z);if(y<0||y<WATER)return;const t0=vox[I(x,y,z)];if(TYPES[t0].leaf||Math.abs(y+1-p.h)>3)return;col.forEach((t,i)=>out.push([x,y+1+i,z,t]));};
  if(D.svj)for(const s of [-2.2,2.2])put(ux*6.6+tx*s,uz*6.6+tz*s,[T.tdaske,T.tdaske,T.lampion]);
  if(D.klupa){put(tx*6.6+ux*.5,tz*6.6+uz*.5,[T.daske]);put(tx*6.6-ux*.5,tz*6.6-uz*.5,[T.daske]);put(tx*6.6+ux*2,tz*6.6+uz*2,[T.lisce,T.tresnja]);put(tx*6.6-ux*2,tz*6.6-uz*2,[T.lisce,T.carlisce]);}
  return out;}
function gradPave(b,silent){const p=PLOTS[b.plot];if(!p||p.away)return;const dx=p.x-LIB.x,dz=p.z-LIB.z,len=Math.hypot(dx,dz),px=-dz/len,pz=dx/len;
  for(let t=0;t<=len;t+=.4)for(let w=-2;w<=2;w++){const x=Math.round(LIB.x+dx*t/len+px*w*.6),z=Math.round(LIB.z+dz*t/len+pz*w*.6);if(Math.hypot(x-LIB.x,z-LIB.z)<9.6||Math.hypot(x-p.x,z-p.z)<5.6)continue;const y=topY(x,z);if(y<0)continue;const t0=get(x,y,z);
      if(t0===T.trava||t0===T.pijesak||t0===T.zemlja||t0===T.staza)setV(x,y,z,Math.abs(w)===2?T.kamen:T.kaldrma,silent);}}
function gradDecor(b,silent){try{const D=gradS().dec[b.id];if(!D||(WORLD&&!DST[WORLD])||!PLOTS[b.plot]||PLOTS[b.plot].away)return;if(D.staza)gradPave(b,silent);for(const q of gradDecList(b))if(!get(q[0],q[1],q[2]))setV(q[0],q[1],q[2],q[3],silent);
    if(!silent){const p=PLOTS[b.plot];lightBox(p.x-9,p.x+9,p.z-9,p.z+9);for(let dz=-12;dz<=12;dz+=4)for(let dx=-12;dx<=12;dx+=4)markDirty(p.x+dx,p.z+dz);}}catch(e){console.warn("decor",e);}}
function gradDecorClear(b){try{for(const q of gradDecList(b)){const t=get(q[0],q[1],q[2]);if(t===q[3])setV(q[0],q[1],q[2],0);}}catch(e){}}
{const _pf=paveFor;paveFor=function(b){_pf.apply(this,arguments);gradDecor(b,true);};}

/* ---------- island development ---------- */
const GLV=[[0,"Zaselak"],[6,"Selo"],[15,"Mjestašce"],[28,"Gradić"],[45,"Grad"]];
function gradLevel(){const G=gradS();let pts=0;for(const b of S.books){if(b.done)pts+=3;else pts+=1;if(GRD[b.bld])pts+=2;const D=G.dec[b.id];if(D)pts+=Object.keys(D).length;}for(const k in G.rec)pts+=G.rec[k].medal||0;try{for(const k of DSK)pts+=Math.floor(wStars(k)/5);for(const l in ((S.dst&&S.dst.zooDone)||{}))pts+=2;}catch(e){}
  let i=0;GLV.forEach((l,j)=>{if(pts>=l[0])i=j;});return {pts,i,n:GLV[i][1],nx:GLV[i+1]?GLV[i+1]:null};}
function gradDaily(){const G=gradS();if(G.day===today()||WORLD)return;G.day=today();const L=gradLevel();if(L.i<1){save();return;}const c=L.i*6;S.coins+=c;save();renderEco();setTimeout(()=>toast("Dobro jutro iz mjesta "+L.n+"! Stanovnici su ti ostavili "+c+" zlatnika.",4200),2500);}
function gradLevelHTML(){const L=gradLevel();return '<div class="card gradlv"><b>Razvoj otoka: '+L.n+'</b><div class="prog"><i style="width:'+(L.nx?Math.round(100*(L.pts-GLV[L.i][0])/(L.nx[0]-GLV[L.i][0])):100)+'%;background:#3fa86a"></i></div><small class="muted">'+L.pts+' bodova'+(L.nx?' · sljedeće: '+L.nx[1]+' na '+L.nx[0]:'')+'. Bodove donose pročitane knjige, zgrade iz grada, ukrasi i medalje iz igara u zgradama. Viša razina svaki dan donosi više zlatnika.</small></div>';}

/* ---------- the building's page ---------- */
sheetBuilding=function(b){const G=GENRES[b.genre],gk=GRD[b.bld]?b.bld:null,A=gk?[GRD[gk].g,GRD[gk].gd]:BACT[b.genre],pct=Math.round(100*b.page/b.pages);const R=gk?gradS().rec[gk]:null,D=gradS().dec[b.id]||{};
  let mid;if(gk){const X=GRD[gk],perk=gradPerk(gk);mid='<div class="card gradg"><img alt="" src="'+gradPic(X.an)+'"><div><b>'+X.g+'</b><p class="muted">'+X.gd+'</p><p class="gradab'+(perk?" on":"")+'">'+(perk?"Igraš kao "+GAN[X.an]+". ":"Za zlato dođi kao "+GAN[X.an]+". ")+X.ab+'</p>'+
      '<small>'+(R?'Rekord: <b>'+R.best+' '+X.u+'</b> · '+(R.medal?MEDALN[R.medal]+' medalja':'još bez medalje'):'Još nisi igrala.')+' · Medalje: '+X.m.join(" / ")+'</small></div></div>';}
  else mid='<div class="earn"><b>'+A[0]+'</b><span>'+(b.done?(bldUsed(b)?'Danas si već bila ovdje. Dođi opet sutra!':A[1]+' Jednom dnevno, uz nagradu.'):'Otključava se kad pročitaš knjigu do kraja.')+'</span></div>';
  openSheet('<div class="bhead"><img alt="" class="bldbig" src="'+bldThumb(bkey(b))+'"><div><h2>'+esc(bldName(b))+'</h2><p class="muted">'+esc(b.title)+(b.author?' · '+esc(b.author):'')+'</p><div class="prog"><i style="width:'+pct+'%;background:'+G.col+'"></i></div><small class="muted">'+(b.done?'Knjiga je pročitana. Građevina je gotova!':'Pročitano '+b.page+' od '+b.pages+' stranica. Građevina raste dok čitaš.')+'</small></div></div>'+mid+
    '<div class="row">'+(b.done?(gk?'<button class="btn big" id="bdPlay">Igraj: '+A[0]+'</button>':'<button class="btn big" id="bdAct"'+(bldUsed(b)?' disabled':'')+'>'+A[0]+'</button>'):'<button class="btn big" id="bdRead">Upiši stranice</button>')+'<button class="btn soft" id="bdRe">Preuredi</button></div>'+
    (gk&&!b.done?'<p class="muted">Igra se otključava kad pročitaš knjigu do kraja.</p>':'')+(gk&&b.done?'<p class="muted">'+(bldUsed(b)?'Današnju nagradu već imaš. Igraj dalje za rekord!':'Prva igra dana donosi zlatnike.')+'</p>':'')+
    '<h3 class="gradH">Uredi okoliš</h3><div class="graddec">'+Object.keys(GDEC).map(k=>'<div class="card'+(D[k]?" on":"")+'"><b>'+GDEC[k].n+'</b><span>'+GDEC[k].d+'</span>'+(D[k]?'<small>Postavljeno</small>':'<button class="btn soft" data-dec="'+k+'">'+GDEC[k].p+' zlatnika</button>')+'</div>').join("")+'</div>'+gradLevelHTML());
  if($("bdRead"))$("bdRead").onclick=()=>{sfx.click();sheetProgress(b);};if($("bdAct"))$("bdAct").onclick=()=>{sfx.click();BGAME[b.genre](b);};if($("bdPlay"))$("bdPlay").onclick=()=>{sfx.click();GGAME[gk](b);};$("bdRe").onclick=()=>{sfx.click();sheetRebuild(b);};
  $("sheetBody").querySelectorAll("[data-dec]").forEach(x=>x.onclick=()=>{const k=x.dataset.dec;if(S.coins<GDEC[k].p){toast("Treba ti "+GDEC[k].p+" zlatnika.");return;}S.coins-=GDEC[k].p;const G2s=gradS();(G2s.dec[b.id]=G2s.dec[b.id]||{})[k]=1;save();renderEco();sfx.chime();gradDecor(b,false);
    const p=PLOTS[b.plot];burst(p.x+.5,p.h+2,p.z+.5,50,[[1,.9,.5],[1,1,1]],4,3,1);toast(GDEC[k].n+" je postavljena!");sheetBuilding(b);});};

/* ---------- the games ---------- */
function gradFrame(b,k,body,note){const X=GRD[k],perk=gradPerk(k);openSheet('<div class="gg" id="gg"><div class="gghead"><img alt="" src="'+gradPic(gradChar())+'"><div><h2>'+X.g+'</h2><p class="muted">'+(perk?'<b class="okT">'+X.ab+'</b>':X.gd)+'</p></div><div class="ggsc"><b id="ggS">0</b><small id="ggT"></small></div></div><div class="ggbody" id="ggB">'+body+'</div><p class="pzmsg" id="ggM">'+(note||"")+'</p></div>',()=>{GG.stop=1;});GG.stop=0;return perk;}
const GG={stop:0};
function gradTimer(sec,onEnd,onTick){let left=sec,last=performance.now();const el=$("ggT");const f=()=>{if(GG.stop||!document.body.contains(el))return;const now=performance.now();left-=Math.min(.25,(now-last)/1000)*(GG.fast||1);last=now;if(onTick)onTick(left);el.textContent="⏱ "+Math.max(0,Math.ceil(left))+" s";el.classList.toggle("low",left<=6);if(left<=0){onEnd();return;}requestAnimationFrame(f);};requestAnimationFrame(f);return {add(s){left+=s;},get left(){return left;}};}
function gradEnd(b,k,score){GG.stop=1;const X=GRD[k],G=gradS(),R=G.rec[k]||(G.rec[k]={best:0,medal:0,plays:0}),perk=gradPerk(k);let medal=0;for(let i=0;i<3;i++)if(score>=X.m[i])medal=i+1;const locked=medal===3&&!perk;if(locked)medal=2;
  const rec=score>R.best;if(rec)R.best=score;R.plays++;const firstGold=medal===3&&R.medal<3;if(medal>R.medal)R.medal=medal;let coins=0;const daily=!bldUsed(b);
  if(daily){S.bldDay=S.bldDay||{};for(const q in S.bldDay)if(S.bldDay[q]!==today())delete S.bldDay[q];S.bldDay[b.id]=today();coins=[10,20,35,55][medal];}if(firstGold){coins+=100;if(S.tickets<12)S.tickets++;}
  S.coins+=coins;save();renderEco();if(medal>=2)sfx.fanfare();else sfx.chime();if(firstGold&&typeof fireworks==="function")fireworks();
  openSheet('<div class="ggend"><h2>'+X.g+'</h2><p class="miniSc">'+score+' '+X.u+'</p>'+(medal?'<div class="medal m'+medal+'"><i></i><b>'+MEDALN[medal]+' medalja</b></div>':'<p class="muted">Za brončanu medalju: '+X.m[0]+' '+X.u+'</p>')+
    (rec&&R.plays>1?'<span class="newb gold">Novi rekord!</span>':'<p class="muted">Rekord: '+R.best+' '+X.u+'</p>')+
    (locked?'<p class="gradab">Rezultat je za zlato! Zlatnu medalju ovdje može osvojiti samo <b>'+GAN[X.an]+'</b>. '+X.ab+(X.an!=="lisica"&&!(S.mg&&S.mg.own&&mgOwnChar(X.an))?' Potraži je u Čarobnoj trgovini.':' Preobuci se u Ormaru.')+'</p>':medal<3?'<p class="muted">Sljedeća medalja: '+X.m[medal]+' '+X.u+'</p>':'')+
    (coins?'<div class="earn">'+COIN_SVG+'<b>+'+coins+'</b><span>zlatnika'+(firstGold?' · prva zlatna medalja!':'')+'</span></div>':'<p class="muted">Današnja nagrada je već podijeljena. Rekord se i dalje pamti.</p>')+
    '<div class="row" style="justify-content:center"><button class="btn green" id="ggAgain">Igraj opet</button><button class="btn" id="ggBack">Natrag</button></div></div>');
  $("ggAgain").onclick=()=>{sfx.click();GGAME[k](b);};$("ggBack").onclick=()=>{sfx.click();sheetBuilding(b);};}
function mgOwnChar(an){try{const it=MCAT.find(i=>i.cat==="char"&&i.k===an);return it?mgOwn(it):false;}catch(e){return false;}}
const gRnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const GGAME={
  /* school: sums against the bell */
  skola(b){const perk=gradFrame(b,"skola",'<div class="ggq" id="ggQ"></div><div class="ggopts" id="ggO"></div>');let sc=0,lock=0;const tm=gradTimer(perk?48:40,()=>gradEnd(b,"skola",sc));
    const next=()=>{const lv=Math.min(3,Math.floor(sc/5));let a,c,ans,txt;const ty=gRnd(0,lv>=1?2:1);if(ty===0){a=gRnd(6,20+lv*20);c=gRnd(4,15+lv*15);ans=a+c;txt=a+" + "+c;}else if(ty===1){a=gRnd(12,30+lv*20);c=gRnd(3,Math.min(a-1,9+lv*8));ans=a-c;txt=a+" − "+c;}else{a=gRnd(2,5+lv*2);c=gRnd(2,9);ans=a*c;txt=a+" × "+c;}
      const o=new Set([ans]);while(o.size<3){const d=ans+[-10,-2,-1,1,2,10][gRnd(0,5)];if(d>=0)o.add(d);}$("ggQ").textContent=txt+" = ?";$("ggQ").dataset.a=ans;
      $("ggO").innerHTML=shuffleR([...o]).map(v=>'<button class="btn soft" data-v="'+v+'">'+v+'</button>').join("");$("ggO").querySelectorAll("button").forEach(x=>x.onclick=()=>{if(lock||GG.stop)return;if(+x.dataset.v===ans){sc++;$("ggS").textContent=sc;tone(660+sc*20,.1,"triangle",.04);next();}
        else{lock=1;x.classList.add("shake");tm.add(-2);tone(200,.15,"sawtooth",.03);$("ggM").textContent="Ups! −2 s";setTimeout(()=>{lock=0;$("ggM").textContent="";if(!GG.stop)next();},500);}});};next();},
  /* bakery: stop the marker in the golden zone */
  pekara(b){const perk=gradFrame(b,"pekara",'<div class="ggoven"><div class="ggbar" id="ggBar"><i class="z2" id="ggZ2"></i><i class="z1" id="ggZ1"></i><u id="ggMk"></u></div><div class="ggbread" id="ggBr">🥖</div></div><button class="btn big green" id="ggGo">Izvadi!</button>',"Pritisni kad je kazaljka u zlatnom polju.");
    let sc=0,n=0,pos=0,dir=1,sp=.7,zc=.5,zw=perk?.16:.115,wait=0,last=performance.now();const N=8,BR=["🥖","🥐","🥨","🍞","🥯","🧁","🥧","🍪"];$("ggT").textContent="1 / "+N;
    const setZ=()=>{zc=.2+Math.random()*.6;$("ggZ1").style.left=((zc-zw/2)*100)+"%";$("ggZ1").style.width=(zw*100)+"%";$("ggZ2").style.left=((zc-zw*1.25)*100)+"%";$("ggZ2").style.width=(zw*2.5*100)+"%";$("ggBr").textContent=BR[n%8];};setZ();
    const loop=()=>{if(GG.stop||!document.body.contains($("ggMk")))return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000)*(GG.fast||1);last=now;if(wait>0){wait-=dt;if(wait<=0){if(n>=N){gradEnd(b,"pekara",sc);return;}setZ();$("ggM").textContent="";}}else{pos+=dir*sp*dt;if(pos>1){pos=1;dir=-1;}if(pos<0){pos=0;dir=1;}}$("ggMk").style.left=(pos*100)+"%";requestAnimationFrame(loop);};requestAnimationFrame(loop);
    const hit=()=>{if(wait>0||GG.stop)return;const d=Math.abs(pos-zc);const p=d<zw*.28?3:d<zw/2?2:d<zw*1.25?1:0;sc+=p;n++;sp=.7+n*.11;$("ggS").textContent=sc;$("ggT").textContent=Math.min(N,n+1)+" / "+N;$("ggM").textContent=["Zagorjelo! 0","Može proći. +1","Lijepo pečeno! +2","Savršeno zlatno! +3"][p];tone(p?520+p*140:180,.14,p?"triangle":"sawtooth",.04);wait=.75;};
    $("ggGo").onclick=hit;GG.act=hit;},
  /* post office: the right letterbox */
  posta(b){const perk=gradFrame(b,"posta",'<div class="ggletter" id="ggQ"></div><div class="ggboxes" id="ggO"></div>');let sc=0,lock=0;const tm=gradTimer(perk?44:35,()=>gradEnd(b,"posta",sc));
    const AN=[["Zec","🐰"],["Jež","🦔"],["Sova","🦉"],["Patka","🦆"],["Mačka","🐱"],["Žaba","🐸"],["Ovca","🐑"]],CO=[["crvena","#e8542f"],["plava","#3a8ae8"],["žuta","#f2c12e"],["zelena","#3fa86a"]];
    const next=()=>{const a=gRnd(0,AN.length-1),c=gRnd(0,3);const opts=[[a,c]];while(opts.length<3){const o=sc>=4&&Math.random()<.6?[Math.random()<.5?a:gRnd(0,AN.length-1),Math.random()<.5?c:gRnd(0,3)]:[gRnd(0,AN.length-1),gRnd(0,3)];if(!opts.some(q=>q[0]===o[0]&&q[1]===o[1]))opts.push(o);}
      $("ggQ").innerHTML='<small>Pismo za:</small><b>'+AN[a][0]+', '+CO[c][0]+' kuća</b>';$("ggO").innerHTML=shuffleR(opts).map(o=>'<button class="ggbox" data-ok="'+(o[0]===a&&o[1]===c?1:0)+'" style="--c:'+CO[o[1]][1]+'"><i>'+AN[o[0]][1]+'</i></button>').join("");
      $("ggO").querySelectorAll("button").forEach(x=>x.onclick=()=>{if(lock||GG.stop)return;if(x.dataset.ok==="1"){sc++;$("ggS").textContent=sc;tone(700+sc*15,.09,"triangle",.04);next();}else{lock=1;x.classList.add("shake");tm.add(-3);tone(200,.15,"sawtooth",.03);$("ggM").textContent="Krivi sandučić! −3 s";setTimeout(()=>{lock=0;$("ggM").textContent="";if(!GG.stop)next();},500);}});};next();},
  /* fire station: put the flames out */
  vatrogasci(b){const perk=gradFrame(b,"vatrogasci",'<div class="ggfire" id="ggO">'+Array.from({length:9},(_,i)=>'<button data-i="'+i+'"><i></i></button>').join("")+'</div>',"Dodirni plamen prije nego što se razbukta. Tri promašaja i gotovo je.");
    let sc=0,lives=3,spawn=.6,t=0;const F=[];const cells=[...$("ggO").querySelectorAll("button")];const life=()=>(perk?1.3:1)*Math.max(.85,1.9-t*.03);const hud=()=>{$("ggS").textContent=sc;$("ggM").textContent="❤️".repeat(lives)+"🤍".repeat(3-lives);};hud();
    const tm=gradTimer(32,()=>gradEnd(b,"vatrogasci",sc),()=>{});let last=performance.now();
    const loop=()=>{if(GG.stop||!document.body.contains(cells[0]))return;const now=performance.now(),dt=Math.min(.05,(now-last)/1000)*(GG.fast||1);last=now;t+=dt;spawn-=dt;
      if(spawn<=0){spawn=Math.max(.42,1.05-t*.02);const free=cells.map((c,i)=>i).filter(i=>!F.some(f=>f.i===i));if(free.length){const i=free[gRnd(0,free.length-1)];F.push({i,t:0,L:life()});cells[i].classList.add("on");}}
      for(let j=F.length-1;j>=0;j--){const f=F[j];f.t+=dt;cells[f.i].style.setProperty("--k",Math.min(1,f.t/f.L));if(f.t>=f.L){cells[f.i].classList.remove("on");cells[f.i].classList.add("burn");const c=cells[f.i];setTimeout(()=>c.classList.remove("burn"),400);F.splice(j,1);lives--;tone(140,.25,"sawtooth",.04);hud();if(lives<=0){gradEnd(b,"vatrogasci",sc);return;}}}
      requestAnimationFrame(loop);};requestAnimationFrame(loop);
    cells.forEach((c,i)=>c.onpointerdown=()=>{if(GG.stop)return;const j=F.findIndex(f=>f.i===i);if(j<0)return;F.splice(j,1);c.classList.remove("on");c.classList.add("wet");setTimeout(()=>c.classList.remove("wet"),300);sc++;tone(500+Math.random()*200,.08,"sine",.04);hud();});GG.fire=F;GG.cells=cells;},
  /* vet: memory pairs */
  ambulanta(b){const EM=["🐶","🐱","🐰","🦔","🐢","🦜"];const deck=shuffleR(EM.concat(EM).map((e,i)=>({e,i})));const perk=gradFrame(b,"ambulanta",'<div class="ggmem" id="ggO">'+deck.map((c,i)=>'<button data-i="'+i+'"><i>'+c.e+'</i></button>').join("")+'</div>',"Pronađi par za svakog pacijenta. Manje poteza, više bodova.");
    let moves=0,found=0,open=[],lock=0;const cells=[...$("ggO").querySelectorAll("button")];const hud=()=>{$("ggS").textContent=Math.max(0,40-moves);$("ggT").textContent="Potezi: "+moves;};hud();
    if(perk){lock=1;cells.forEach(c=>c.classList.add("op"));setTimeout(()=>{cells.forEach(c=>c.classList.remove("op"));lock=0;},1800);}
    cells.forEach((c,i)=>c.onclick=()=>{if(lock||GG.stop||c.classList.contains("op")||c.classList.contains("ok"))return;c.classList.add("op");open.push(i);tone(520,.06,"triangle",.03);if(open.length<2)return;moves++;hud();const [p,q]=open;open=[];
      if(deck[p].e===deck[q].e){cells[p].classList.add("ok");cells[q].classList.add("ok");found++;tone(880,.12,"triangle",.04);if(found===6)setTimeout(()=>gradEnd(b,"ambulanta",Math.max(0,40-moves)),500);}
      else{lock=1;setTimeout(()=>{cells[p].classList.remove("op");cells[q].classList.remove("op");lock=0;},650/(GG.fast||1));}});GG.deck=deck;GG.cells=cells;},
  /* florist: remember the order */
  cvjecarna(b){const FL=["🌹","🌻","🌷","🌼","🪻"];const perk=gradFrame(b,"cvjecarna",'<div class="ggseq" id="ggQ"></div><div class="ggpal" id="ggO">'+FL.map((f,i)=>'<button data-i="'+i+'">'+f+'</button>').join("")+'</div>',"Gledaj narudžbu...");
    let sc=0,lives=perk?3:2,seq=[],pos=0,show=1;const hud=()=>{$("ggS").textContent=sc;$("ggT").textContent="❤️".repeat(lives);};
    const round=()=>{if(GG.stop)return;seq=[];const n=3+sc;for(let i=0;i<n;i++)seq.push(gRnd(0,4));pos=0;show=1;hud();$("ggM").textContent="Gledaj narudžbu...";GG.seq=seq;const q=$("ggQ");q.innerHTML="";let i=0;const step=()=>{if(GG.stop||!document.body.contains(q))return;if(i>=seq.length){setTimeout(()=>{if(GG.stop||!document.body.contains(q))return;q.innerHTML=seq.map(()=>'<span class="hid">?</span>').join("");show=0;$("ggM").textContent="Sad ti! Složi buket istim redom.";},(perk?900:600)/(GG.fast||1));return;}
        q.insertAdjacentHTML("beforeend",'<span class="pop">'+FL[seq[i]]+'</span>');tone(440+seq[i]*90,.12,"triangle",.04);i++;setTimeout(step,(perk?850:600)/(GG.fast||1));};step();};
    $("ggO").querySelectorAll("button").forEach(x=>x.onclick=()=>{if(show||GG.stop)return;const v=+x.dataset.i;const sp=$("ggQ").children[pos];if(v===seq[pos]){sp.textContent=FL[v];sp.className="pop";tone(440+v*90,.1,"triangle",.04);pos++;if(pos>=seq.length){sc++;show=1;hud();$("ggM").textContent="Buket je gotov!";sfx.chime();if(sc>=9){gradEnd(b,"cvjecarna",sc);return;}setTimeout(round,900/(GG.fast||1));}}
      else{lives--;show=1;hud();tone(200,.2,"sawtooth",.03);$("ggQ").innerHTML=seq.map(s=>'<span>'+FL[s]+'</span>').join("");if(lives<=0){$("ggM").textContent="Kupac je otišao...";setTimeout(()=>gradEnd(b,"cvjecarna",sc),900/(GG.fast||1));}else{$("ggM").textContent="Krivi cvijet! Nova narudžba.";setTimeout(round,1100/(GG.fast||1));}}});hud();setTimeout(round,500);},
  /* museum: which exhibit is gone */
  muzej(b){const EX=["🏺","🗿","👑","⚱️","🦴","💎","🗡️","🎭","📜","🧭","🪙","🐚","🔔","🗝️"];const perk=gradFrame(b,"muzej",'<div class="ggshelf" id="ggQ"></div><div class="ggopts" id="ggO"></div>',"Zapamti izloške!");
    let sc=0,r=0;const N=8;const round=()=>{if(GG.stop)return;if(r>=N){gradEnd(b,"muzej",sc);return;}const n=4+Math.floor(r/2)+(r>=6?1:0);const set=shuffleR(EX.slice()).slice(0,n);const gone=gRnd(0,n-1);const others=shuffleR(EX.filter(e=>!set.includes(e))).slice(0,1);GG.gone=set[gone];
      $("ggT").textContent=(r+1)+" / "+N;$("ggQ").innerHTML=set.map(e=>'<span>'+e+'</span>').join("");$("ggO").innerHTML="";$("ggM").textContent="Zapamti izloške!";
      setTimeout(()=>{if(GG.stop||!document.body.contains($("ggQ")))return;$("ggQ").innerHTML='<span class="hid">🌙</span>';setTimeout(()=>{if(GG.stop||!document.body.contains($("ggQ")))return;const rest=shuffleR(set.filter((e,i)=>i!==gone));$("ggQ").innerHTML=rest.map(e=>'<span>'+e+'</span>').join("");$("ggM").textContent="Što je nestalo?";
          const opts=shuffleR([set[gone],others[0]].concat(shuffleR(rest.slice()).slice(0,2)));$("ggO").innerHTML=opts.map(e=>'<button class="btn soft ggex" data-e="'+e+'">'+e+'</button>').join("");
          $("ggO").querySelectorAll("button").forEach(x=>x.onclick=()=>{if(GG.stop||x.disabled)return;$("ggO").querySelectorAll("button").forEach(y=>{y.disabled=true;if(y.dataset.e===set[gone])y.classList.add("ok");});if(x.dataset.e===set[gone]){sc++;$("ggS").textContent=sc;tone(760,.12,"triangle",.04);$("ggM").textContent="Točno!";}else{x.classList.add("shake");tone(200,.18,"sawtooth",.03);$("ggM").textContent="Nestalo je: "+set[gone];}r++;setTimeout(round,900/(GG.fast||1));});},500/(GG.fast||1));},((perk?4.2:2.7)+n*.25)*1000/(GG.fast||1));};round();}};
{const _ss=startSquirrel;startSquirrel=function(){_ss.apply(this,arguments);try{gradDaily();}catch(e){}};}
if(typeof sheetZivot==="function"){const _sz=sheetZivot;sheetZivot=function(){_sz.apply(this,arguments);try{$("sheetBody").insertAdjacentHTML("beforeend",'<h3>Razvoj otoka</h3>'+gradLevelHTML());}catch(e){}};$("zvChip").onclick=()=>{sfx.click();sheetZivot();};}
