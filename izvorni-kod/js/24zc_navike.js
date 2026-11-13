/* =================== v31: NAVIKE ZIVOTINJA + ZAGONETKE + NALJEPNICE ===================
   Animals follow a daily rhythm (morning, day, night, rain). Watching a habit from close by writes an
   observation onto that animal's encyclopedia page. Animal questions now come in five kinds, and each kind
   leaves its own sticker on the page it was about. Save: S.zv.obs, S.zv.stk, S.zv.qn (all optional). */

/* slot: [activity, place, what the animal says, the observation written into the book] */
const HAB={
 zec:{j:["eat","livada","Mmm, jutarnja djetelina je najslađa!","U zoru zec izlazi na pašu. Zečevi su najaktivniji u zoru i u sumrak."],
  d:["rest","drvo","Po danu drijemam u hladu.","Usred dana zec se odmara skriven u zaklonu."],
  n:["sleep","drvo","Zzz... još malo...","Zec spava lagano, ponekad i otvorenih očiju, da na vrijeme primijeti opasnost."],
  k:["rest","drvo","Čekam pod krošnjom da kiša stane!","Kad pada kiša, zec se skloni pod grmlje ili u jazbinu."]},
 patka:{j:["eat","stay","Jutarnji doručak u plićaku!","Patka ujutro traži hranu u plićaku, glavom pod vodom."],
  d:["preen","stay","Uređujem perje, pero po pero.","Patka svaki dan dugo uređuje perje i maže ga uljem."],
  n:["sleep","stay","Zzz... jedno oko pazi...","Patke često spavaju s jednim okom otvorenim i tako paze na opasnost."],
  k:["play","stay","Kiša! Najljepše vrijeme!","Patke vole kišu: perje im ne propušta vodu, a iz zemlje izlaze gliste."]},
 jez:{j:["sleep","drvo","Zzz... danju spavam...","Jež je noćna životinja: danju spava u gnijezdu od lišća."],
  d:["sleep","drvo","Hrrr... probudi me navečer.","Jež se u snu sklupča u bodljikavu loptu da bude siguran."],
  n:["eat","livada","Noć je! Idem u lov na puževe.","Noću jež prijeđe i više od kilometra tražeći kukce i puževe."],
  k:["eat","livada","Poslije kiše ima najviše puževa!","Nakon kiše jež lako nalazi puževe i gliste."]},
 ovca:{j:["eat","livada","Trava s rosom je najbolja!","Ovce pasu veći dio dana, najradije rano ujutro."],
  d:["rest","livada","Ležim i preživam...","Nakon paše ovca leži i preživa: hranu vraća u usta i žvače je ponovno."],
  n:["sleep","livada","Zzz...","Ovce spavaju u stadu, jedna uz drugu, jer se tako osjećaju sigurno."],
  k:["rest","drvo","Moja vuna ne propušta kišu.","Vuna ovcu štiti od kiše jer je masna i odbija vodu."]},
 kornjaca:{j:["bask","livada","Grijem se na suncu.","Kornjače su hladnokrvne: ujutro se griju na suncu da skupe snagu."],
  d:["eat","voda","Tražim morsku travu.","Odrasle zelene morske kornjače jedu morsku travu i alge."],
  n:["sleep","voda","Zzz...","Morske kornjače mogu spavati pod vodom i satima ne udahnuti."],
  k:["wander","livada","Meni kiša ne smeta, imam oklop!","Oklop je dio kornjačina kostura i štiti je cijeli život."]},
 macka:{j:["play","livada","Jutarnji lov!","Mačke su najaktivnije u zoru i u sumrak."],
  d:["sleep","livada","Mrrr... sunce grije...","Mačka prespava i do 16 sati na dan."],
  n:["wander","livada","U mraku vidim odlično.","Mačke u polumraku vide oko šest puta bolje od ljudi."],
  k:["rest","drvo","Mokro krzno? Ne, hvala!","Većina mačaka ne voli kišu jer im se krzno sporo suši."]},
 papiga:{j:["play","drvo","Dobro jutro! Dobro jutro!","Papige su najglasnije u zoru, kad se jato dogovara kamo će."],
  d:["eat","drvo","Orašasti plodovi, njam!","Papiga hranu drži nogom kao rukom."],
  n:["sleep","drvo","Zzz...","Papige spavaju na grani stojeći, čvrsto stisnutih prstiju."],
  k:["play","livada","Tuširanje!","Papige vole kišu: rašire krila i tuširaju se."]},
 sova:{j:["sleep","stay","Zzz... dan je za spavanje.","Sova danju spava, a u lov ide noću."],
  d:["sleep","stay","Hrrr...","Danju sova miruje uz deblo ili na tornju, gdje je teško opaziti."],
  n:["watch","stay","Hu-huu! Noć je moje doba.","Noću sova čuje miša i ispod lišća."],
  k:["rest","stay","Po kiši ne letim rado.","Sovino mekano perje lako se smoči, pa po jakoj kiši sova rijetko lovi."]},
 zaba:{j:["eat","stay","Mušica! Hop!","Žaba lovi kukce ljepljivim jezikom brže nego što trepneš."],
  d:["rest","stay","Skrivam se u hladu.","Danju se žaba skriva u hladu da joj se koža ne osuši."],
  n:["play","stay","Kre-kre! Večernji koncert!","Žabe najglasnije pjevaju navečer i poslije kiše."],
  k:["play","stay","Kiša, kiša, kre-kre!","Žabe vole kišu jer dišu i kroz vlažnu kožu."]},
 pingvin:{j:["play","stay","Gegam se u jutarnju šetnju!","Pingvini hodaju gegajući se, a po snijegu se kližu na trbuhu."],
  d:["eat","stay","Idem po ribu!","Pingvin ne leti zrakom, ali pod vodom krilima 'leti' kroz more."],
  n:["sleep","stay","Zzz...","Pingvini se u hladnoći stisnu jedan uz drugoga i tako se griju."],
  k:["wander","stay","Kiša mi klizi niz perje.","Gusto, masno perje pingvina ne propušta vodu."]},
 deva:{j:["eat","stay","Trnje? Meni je to doručak.","Deva jede i trnovito bilje jer ima čvrste usne."],
  d:["bask","stay","Vrućina mi ne smeta.","Deva može danima bez vode, a u grbi čuva mast, ne vodu."],
  n:["sleep","stay","Zzz...","Deve spavaju ležeći, s nogama podvijenim pod tijelo."],
  k:["wander","stay","Trepavice me štite i od kiše.","Duge trepavice i nosnice koje se zatvaraju devu štite od pijeska i vjetra."]},
 panda:{j:["eat","livada","Doručak! Gdje je bambus?","Crvena panda najviše jede u zoru i u sumrak."],
  d:["sleep","drvo","Zzz... pokrila sam se repom.","Crvena panda danju spava na grani, pokrivena svojim čupavim repom."],
  n:["play","drvo","Noću se penjem!","Crvena panda vješto se penje i s drveta silazi glavom prema dolje."],
  k:["rest","drvo","Krzno me grije i kad kiši.","Gusto krzno crvenu pandu grije i na kiši i na snijegu."]},
 konjic:{j:["eat","livada","Jutarnja paša!","Konj pase i do 16 sati na dan."],
  d:["play","livada","Trkajmo se!","Konji se u igri trkaju i ritaju, a prijatelje češkaju zubima."],
  n:["sleep","livada","Zzz... spavam stojeći.","Konj može drijemati stojeći jer mu se zglobovi nogu 'zaključaju'."],
  k:["wander","livada","Kiša me ne smeta.","Konju kiša ne smeta, ali se od jakog vjetra voli skloniti."]},
 kapibara:{j:["eat","livada","Mljac, svježa trava.","Kapibara je najveći glodavac na svijetu i pase travu poput ovce."],
  d:["bask","voda","Hladim se uz vodu.","Kapibara se za vrućine hladi u vodi i može zaroniti na nekoliko minuta."],
  n:["sleep","livada","Zzz...","Kapibare žive u skupinama i spavaju jedna uz drugu."],
  k:["play","voda","Kiša? Još bolje za plivanje!","Kapibara ima kožice među prstima i odlična je plivačica."]}};
const HABSLOT={j:"ujutro",d:"po danu",n:"navečer ili noću",k:"kad pada kiša"};
const NV={t:0,spots:null,zs:[],zi:0,zt:0,err:0};
function nvSlot(){if(typeof ZV!=="undefined"&&ZV.w==="kisa")return "k";const n=tgt.name;return n==="jutro"?"j":n==="dan"?"d":"n";}
function nvSpots(){if(NV.spots)return NV.spots;const tr=[],sh=[];for(let x=CX-60;x<=CX+60;x+=3)for(let z=CZ-60;z<=CZ+60;z+=3){const y=topY(x,z);if(y<0)continue;const T=TYPES[vox[I(x,y,z)]];
    if(T&&T.leaf){for(const [a,b] of [[2,0],[-2,0],[0,2],[0,-2]]){const w=walkable(x+a+.5,z+b+.5);if(w!=null&&tr.length<220){tr.push({x:x+a+.5,z:z+b+.5});break;}}}
    else if(walkable(x+.5,z+.5)!=null){for(const [a,b] of [[3,0],[-3,0],[0,3],[0,-3]]){const y2=topY(x+a,z+b);if(y2>=0&&y2+1<WATER+.3&&sh.length<220){sh.push({x:x+.5,z:z+.5});break;}}}}
  return NV.spots={drvo:tr,voda:sh};}
function nvNear(list,e){let b=null,bd=1e9;for(const s of list){const d=Math.hypot(s.x-e.x,s.z-e.z)+((s.x*7+s.z*13+e.ph*5)%9);if(d<bd){bd=d;b=s;}}return b;}
function nvObsKey(e){return typeof ENCKIND!=="undefined"?ENCKIND[e.kind]:null;}
function nvObs(e,slot){const pk=nvObsKey(e);if(!pk)return false;const z=zv();z.obs=z.obs||{};const key=e.kind+":"+slot;if(z.obs[key])return false;z.obs[key]=today();S.coins+=8;renderEco();
  const all=["j","d","n","k"].every(s=>z.obs[e.kind+":"+s]);if(all){S.coins+=50;const E2=encS();E2.lupe++;}
  if(typeof encS==="function"){const E2=encS();E2.nw[pk]=1;encBadge();}save();sfx.chime();
  toast(all?"Sva 4 opažanja: "+ENCK[pk].n+"! +50 zlatnika i 1 lupa. Pogledaj stranicu u enciklopediji.":"Novo opažanje u enciklopediji: "+ENCK[pk].n+" ("+HABSLOT[slot]+") +8 zlatnika",all?5200:3800);
  if(all&&typeof fireworks==="function")setTimeout(fireworks,300);return true;}
function nvZ(x,y,z){if(!NV.ztex){const c=document.createElement("canvas");c.width=c.height=64;const g=c.getContext("2d");g.font="900 46px Arial";g.textAlign="center";g.textBaseline="middle";g.lineWidth=7;g.strokeStyle="#16243a";g.strokeText("z",32,34);g.fillStyle="#fff";g.fillText("z",32,34);NV.ztex=new THREE.CanvasTexture(c);NV.ztex.keep=1;}
  let s=NV.zs[NV.zi%8];if(!s){s=new THREE.Sprite(new THREE.SpriteMaterial({map:NV.ztex,transparent:true,depthWrite:false,fog:false}));s.renderOrder=7;scene.add(s);NV.zs[NV.zi%8]=s;}NV.zi++;s.position.set(x,y,z);s.userData.t=0;s.visible=true;}
function nvTick(dt,tt){NV.t+=dt;for(const s of NV.zs){if(!s||!s.visible)continue;s.userData.t+=dt;const k=s.userData.t/1.7;if(k>=1){s.visible=false;continue;}s.position.y+=dt*.55;s.position.x+=Math.sin(tt*3+s.position.z)*dt*.15;const sc=.25+k*.35;s.scale.set(sc,sc,1);s.material.opacity=1-k*k;}
  if((WORLD&&!DST[WORLD])||G2.mode==="mini")return;const slot=nvSlot();const P=FP.on?FP.p:null;NV.zt-=dt;const zz=NV.zt<=0;if(zz)NV.zt=1.1;
  const busyAll=(typeof ACT!=="undefined"&&ACT)||(typeof CINE!=="undefined"&&CINE);
  for(const e of ents){const H=HAB[e.kind];if(!H||!e.g||e.g.visible===false)continue;if(e===FP.mount||S.pet===e.kind||e.frozen||busyAll){e.hb=null;continue;}
    const h=H[slot];let b=e.hb;
    if(!b||b.slot!==slot){b=e.hb={slot,act:h[0],ph:"go",t:0,said:0};const pl=h[1];if(!e.roof&&!e.swim&&(pl==="drvo"||pl==="voda")&&!e.goto){const s=nvNear(nvSpots()[pl],e);if(s&&Math.hypot(s.x-e.x,s.z-e.z)<70){e.goto={x:s.x,z:s.z};e.arrive=()=>{if(e.hb===b)b.ph="do";};}else b.ph="do";}else b.ph="do";}
    b.t+=dt;if(b.ph==="go"&&(b.t>30||!e.goto))b.ph="do";if(b.ph!=="do"||e.goto)continue;
    const p=e.g.userData.parts||{},act=b.act,still=act==="sleep"||act==="rest"||act==="bask"||act==="eat"||act==="preen"||act==="watch";
    if(still&&!e.roof){e.tx=null;e.wait=2;}
    if(act==="sleep"){if(p.head){p.head.rotation.x=.6;p.head.rotation.y=.25;}e.g.position.y-=.07;if(p.tail)p.tail.rotation.y=.2;if(zz&&(!P||Math.hypot(e.x-P.x,e.z-P.z)<34)){const hh=e.g.position.y+(e.kind==="deva"||e.kind==="konjic"?1.9:1.05);nvZ(e.x+.2,hh,e.z);}}
    else if(act==="eat"){if(p.head)p.head.rotation.x=.45+Math.sin(tt*7+e.ph)*.18;if(!e.roof&&!e.swim&&Math.random()<dt*.12){e.wait=0;}}
    else if(act==="rest"){if(p.head){p.head.rotation.x=.18;p.head.rotation.y=Math.sin(tt*.5+e.ph)*.25;}e.g.position.y-=.04;}
    else if(act==="bask"){if(p.head)p.head.rotation.x=-.28;}
    else if(act==="preen"){if(p.head){p.head.rotation.y=1.1+Math.sin(tt*9)*.15;p.head.rotation.x=.3;}}
    else if(act==="watch"){if(p.head)p.head.rotation.y=Math.sin(tt*.6+e.ph)*1.3;}
    else if(act==="play"){if(Math.random()<dt*.9)e.hop=1;if(Math.random()<dt*.15)e.celebrate=.5;}
    if(P){const d=Math.hypot(e.x-P.x,e.z-P.z),near=e.roof?d<7:d<4.2&&Math.abs(e.y-P.y)<4;
      if(near&&$("veil").hidden&&!window.RWON){const fresh=nvObs(e,slot);if(fresh||NV.t-b.said>50||!b.said){b.said=NV.t;if(typeof say==="function"&&!(typeof EQB!=="undefined"&&EQB.en===e))say(e,h[2],2800);}}}}}
{const _te=tickEnv;tickEnv=function(dt){_te(dt);if(NV.err>3)return;try{nvTick(dt,performance.now()/1000);}catch(e){NV.err++;console.warn("navike",e);}};}

/* ---------- stickers ---------- */
const STK={k:{n:"Znalica",em:"★",c:"#ffb020",d:"točan odgovor na pitanje"},i:{n:"Istina",em:"✔",c:"#3fa86a",d:"prepoznaj istinu od laži"},d:{n:"Detektivka",em:"🔍",c:"#7a5ad8",d:"pogodi tko sam po tragovima"},s:{n:"Oštro oko",em:"👁",c:"#2a9ac8",d:"prepoznaj me na uvećanoj slici"},p:{n:"Veza",em:"🔗",c:"#e8542f",d:"spoji parove bez greške"}};
function stkOf(k){const z=zv();z.stk=z.stk||{};return z.stk[k]||{};}
function stkCount(k){return Object.keys(stkOf(k)).length;}
function stkAll(){const z=zv();z.stk=z.stk||{};let n=0;for(const k in z.stk)n+=Object.keys(z.stk[k]).length;return n;}
function stkGive(k,t){const z=zv();z.stk=z.stk||{};const o=z.stk[k]||(z.stk[k]={});if(o[t])return "";o[t]=today();const n=Object.keys(o).length;let msg=' · <span class="stT">Nova naljepnica: '+STK[t].em+' '+STK[t].n+' ('+esc(ENCK[k].n)+')</span>';
  const E2=encS();E2.nw[k]=1;encBadge();
  if(n===3){E2.lupe++;msg+='<br><b>Srebrna stranica!</b> Dobivaš 1 lupu.';}if(n===5){S.coins+=60;renderEco();msg+='<br><b>Zlatna stranica!</b> +60 zlatnika.';setTimeout(()=>{sfx.fanfare();if(typeof fireworks==="function")fireworks();},400);}
  save();return msg;}
const ZRANK=[[0,"Znatiželjka"],[5,"Mlada istraživačica"],[15,"Vrijedna prirodoslovka"],[30,"Čuvarica znanja"],[60,"Velika enciklopedistica"]];
function zRank(){const n=stkAll()+Object.keys(zv().obs||{}).length;let r=ZRANK[0][1],nx=null;for(const [need,t] of ZRANK){if(n>=need)r=t;else if(nx==null)nx=need;}return {n,r,nx};}

/* ---------- five kinds of animal questions ---------- */
function zqPages(){return ENC.filter(e=>encGot(e.k)&&e.info&&e.info.length>=2);}
function zqWin(st,coins,first,extra){const E2=encS();E2.st++;E2.best=Math.max(E2.best,E2.st);E2.ok++;S.coins+=coins;save();renderEco();sfx.chime();[880,1175,1568].forEach((fq,i)=>tone(fq,.16,"triangle",.04,i*.07));if(rida)rida.celebrate=.8;
  $("zqMsg").innerHTML='<b class="okT">Točno!</b> +'+coins+' zlatnika'+(first?' · <span class="stT">★ Nova zvjezdica znanja!</span>':'')+(E2.st>=3?' · 🔥 Niz: '+E2.st:'')+(extra||"");
  if(E2.st===5||E2.st===10||E2.st===20){const bon=E2.st*5;S.coins+=bon;save();renderEco();setTimeout(()=>{toast("🔥 "+E2.st+" točnih zaredom! Bonus +"+bon+" zlatnika",3600);sfx.fanfare();},500);}
  encMilestones();zqDone(st);}
function zqLose(st,html){const E2=encS();E2.st=0;save();tone(240,.18,"sawtooth",.025);tone(190,.24,"sawtooth",.025,.12);$("zqMsg").innerHTML='<b class="noT">Nije baš.</b> '+html;encMilestones();zqDone(st);}
function zqDone(st){$("zqNext").innerHTML='<button class="btn purple" id="zqGo">Super!</button>';$("zqGo").onclick=()=>{sfx.click();closeSheet();if(st.o.done)st.o.done();};}
function zqHead(o,kind,sub){return '<div class="anh"><img alt="" src="'+o.who.img+'"><div><span class="zqKind" style="--c:'+STK[kind].c+'">'+STK[kind].em+' '+esc(sub)+'</span><h2>'+esc(o.who.n)+'</h2></div></div>';}
function zqFoot(){return '<p class="pzmsg encMsg" id="zqMsg"></p><div id="zqNext"></div>';}
function zqStar(q){const E2=encS();const key=q.k+":"+q.i;if(E2.m[key])return false;E2.m[key]=today();return true;}
/* 1. classic */
function zqKlasik(o,q){const e=ENCK[q.k],f=e.facts[q.i],st={o};const opts=shuffleR([f[2],f[3],f[4]]);
  openSheet(zqHead(o,"k","Pitanje")+'<div class="pzq">'+esc(f[1])+'</div><div class="pzopts">'+opts.map(x=>'<button class="btn soft" data-o="'+esc(x)+'">'+esc(x)+'</button>').join("")+'</div>'+zqFoot());
  const B=$("sheetBody");B.querySelectorAll("[data-o]").forEach(b=>b.onclick=()=>{if(st.ans)return;st.ans=1;const ok=b.dataset.o===f[2];B.querySelectorAll("[data-o]").forEach(x=>{x.disabled=true;if(x.dataset.o===f[2])x.classList.add("ok");});
    if(ok){const first=zqStar(q);zqWin(st,first?15:8,first,stkGive(q.k,"k"));}else{b.classList.add("shake");zqLose(st,'Točan odgovor: <b>'+esc(f[2])+'</b>.<br><span class="muted">'+esc(f[0])+'</span>');}});}
/* 2. true or false */
function zqIstina(o,q){const e=ENCK[q.k],f=e.facts[q.i],st={o};const tr=Math.random()<.5,ans=tr?f[2]:f[3+Math.floor(Math.random()*2)];
  openSheet(zqHead(o,"i","Istina ili laž?")+'<div class="zqCard"><small>'+esc(e.n)+'</small><p>'+esc(f[1])+'</p><b>„'+esc(ans)+'.“</b></div><div class="zqTF"><button class="btn green" data-v="1">✔ Istina</button><button class="btn red" data-v="0">✘ Laž</button></div>'+zqFoot());
  const B=$("sheetBody");B.querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{if(st.ans)return;st.ans=1;B.querySelectorAll("[data-v]").forEach(x=>x.disabled=true);const ok=(b.dataset.v==="1")===tr;
    if(ok){const first=zqStar(q);zqWin(st,first?15:8,first,stkGive(q.k,"i")+'<br><span class="muted">'+esc(f[0])+'</span>');}else{b.classList.add("shake");zqLose(st,(tr?'To je bila istina.':'To je bila laž. Točno je: <b>'+esc(f[2])+'</b>.')+'<br><span class="muted">'+esc(f[0])+'</span>');}});}
/* 3. who am I: clues one by one */
function zqDetektiv(o,target,pages){const st={o,n:1};const others=shuffleR(pages.filter(e=>e.k!==target.k)).slice(0,3);const opts=shuffleR([target].concat(others));
  const clues=target.info.map(([a,b])=>a+": "+b);const f0=target.facts[0][0];clues.push("Zanimljivost: "+f0.replace(new RegExp(target.n,"gi"),"ova životinja"));
  const draw=()=>{openSheet(zqHead(o,"d","Tko sam ja?")+'<p class="muted">Pogodi sa što manje tragova. Manje tragova, veća nagrada!</p><ol class="zqClues">'+clues.slice(0,st.n).map(c=>'<li>'+esc(c)+'</li>').join("")+'</ol>'+
      (st.n<clues.length?'<button class="btn soft" id="zqMore">Još jedan trag</button>':'')+'<div class="zqPics">'+opts.map(e=>'<button data-k="'+e.k+'"><img alt="" src="'+encImg(e)+'"><b>'+esc(e.n)+'</b></button>').join("")+'</div>'+zqFoot());
    const B=$("sheetBody");const m=$("zqMore");if(m)m.onclick=()=>{sfx.click();st.n++;draw();};
    B.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{if(st.ans)return;st.ans=1;B.querySelectorAll("[data-k]").forEach(x=>{x.disabled=true;if(x.dataset.k===target.k)x.classList.add("ok");});if(m)m.disabled=true;
      if(b.dataset.k===target.k)zqWin(st,[18,14,10,7][Math.min(3,st.n-1)],false,stkGive(target.k,"d"));else{b.classList.add("shake");zqLose(st,'To je bila: <b>'+esc(target.n)+'</b>.');}});};draw();}
/* 4. zoomed picture that slowly zooms out */
function zqSlika(o,target,pages){const st={o,t:0};const others=shuffleR(pages.filter(e=>e.k!==target.k)).slice(0,3);const opts=shuffleR([target].concat(others));
  openSheet(zqHead(o,"s","Što je na slici?")+'<p class="muted">Slika se polako udaljava. Što prije pogodiš, to veća nagrada!</p><div class="zqZoom"><canvas id="zqCv" width="240" height="240"></canvas><i id="zqBar"></i></div><div class="pzopts">'+opts.map(e=>'<button class="btn soft" data-k="'+e.k+'">'+esc(e.n)+'</button>').join("")+'</div>'+zqFoot(),()=>{st.stop=1;});
  const cv=$("zqCv"),x=cv.getContext("2d"),img=new Image();const cx=.35+Math.random()*.3,cy=.3+Math.random()*.3;let last=performance.now();
  const loop=()=>{if(st.stop||!document.body.contains(cv))return;const now=performance.now();if(!st.ans)st.t+=(now-last)/1000;last=now;const k=st.ans?1:Math.min(1,st.t/12);const zoom=6-5*k*k*(3-2*k);const sw=img.width/zoom,sh=img.height/zoom;const sx=Math.max(0,Math.min(img.width-sw,img.width*(cx*(1-k)+.5*k)-sw/2)),sy=Math.max(0,Math.min(img.height-sh,img.height*(cy*(1-k)+.5*k)-sh/2));
    x.imageSmoothingEnabled=false;x.fillStyle="#dcecff";x.fillRect(0,0,240,240);if(img.width)x.drawImage(img,sx,sy,sw,sh,0,0,240,240);const bar=$("zqBar");if(bar)bar.style.width=(100-k*100)+"%";requestAnimationFrame(loop);};
  img.onload=loop;img.src=encImg(target);
  const B=$("sheetBody");B.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{if(st.ans)return;st.ans=1;B.querySelectorAll("[data-k]").forEach(q=>{q.disabled=true;if(q.dataset.k===target.k)q.classList.add("ok");});
    if(b.dataset.k===target.k)zqWin(st,st.t<4?18:st.t<8?13:8,false,stkGive(target.k,"s"));else{b.classList.add("shake");zqLose(st,'Na slici je: <b>'+esc(target.n)+'</b>.');}});}
/* 5. pairs: who eats what, who lives where */
function zqParovi(o,pages){const lab=Math.random()<.5?"Hrana":"Dom";const pool=shuffleR(pages.filter(e=>e.info.some(i=>i[0]===lab)));const pick=[];for(const e of pool){const v=e.info.find(i=>i[0]===lab)[1];if(!pick.some(p=>p.v===v))pick.push({e,v});if(pick.length===3)break;}
  if(pick.length<3)return false;const st={o,err:0,done:0,sel:null};const right=shuffleR(pick.map(p=>p.v));
  openSheet(zqHead(o,"p","Spoji parove")+'<p class="muted">'+(lab==="Hrana"?"Tko što jede?":"Tko gdje živi?")+' Dodirni životinju, zatim njezin par.</p><div class="zqPairs"><div>'+pick.map(p=>'<button class="zqL" data-k="'+p.e.k+'"><img alt="" src="'+encImg(p.e)+'"><b>'+esc(p.e.n)+'</b></button>').join("")+'</div><div>'+right.map(v=>'<button class="zqR" data-v="'+esc(v)+'">'+esc(v)+'</button>').join("")+'</div></div>'+zqFoot());
  const B=$("sheetBody");B.querySelectorAll(".zqL").forEach(b=>b.onclick=()=>{if(b.disabled||st.fin)return;sfx.click();B.querySelectorAll(".zqL").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");st.sel=b;});
  B.querySelectorAll(".zqR").forEach(b=>b.onclick=()=>{if(b.disabled||st.fin||!st.sel)return;const p=pick.find(q=>q.e.k===st.sel.dataset.k);
    if(p.v===b.dataset.v){b.disabled=true;st.sel.disabled=true;b.classList.add("ok");st.sel.classList.add("ok");st.sel.classList.remove("sel");st.sel=null;st.done++;tone(660+st.done*120,.12,"triangle",.04);
      if(st.done===3){st.fin=1;if(st.err===0){let ex="";for(const q of pick)ex+=stkGive(q.e.k,"p");zqWin(st,16,false,ex);}else zqWin(st,7,false,' <span class="muted">Za naljepnicu spoji sve bez greške.</span>');}}
    else{st.err++;b.classList.remove("shake");void b.offsetWidth;b.classList.add("shake");tone(220,.14,"sawtooth",.025);}});return true;}
/* animals choose a kind in turn; the page button in the book keeps the plain question */
{const _eq=encQuiz;encQuiz=function(o){try{if(o&&o.qs&&o.qs.length===1&&!o.ch&&!o.back&&o.who){const z=zv();z.qn=(z.qn||0)+1;const q=o.qs[0],pages=zqPages();const askK=Object.keys(ENCK).find(k=>ENCK[k].n===o.who.n)||null;
      const mine=pages.find(e=>e.k===q.k)||pages.find(e=>e.k===askK);const order=["i","d","k","s","p"];let kind=order[z.qn%5];
      if((kind==="d"||kind==="s")&&pages.length<4)kind="k";if(kind==="p"&&pages.length<3)kind="i";
      const tgtP=()=>{const need=kind;const cand=pages.filter(e=>!stkOf(e.k)[need]);return mine&&!stkOf(mine.k)[need]?mine:cand.length?cand[Math.floor(Math.random()*cand.length)]:pages[Math.floor(Math.random()*pages.length)];};
      if(kind==="i")return zqIstina(o,q);if(kind==="d")return zqDetektiv(o,tgtP(),pages);if(kind==="s")return zqSlika(o,tgtP(),pages);if(kind==="p"&&zqParovi(o,pages))return;return zqKlasik(o,q);}}catch(e){console.warn("zq",e);}
  return _eq.apply(this,arguments);};}

/* ---------- the book shows it all ---------- */
{const _ep=encPage;encPage=function(k){_ep.apply(this,arguments);try{const e=ENCK[k];if(!encGot(k))return;const z=zv(),o=stkOf(k),n=Object.keys(o).length;let h='<h3 class="encFH">Naljepnice <small>'+n+' / 5'+(n>=5?' · Zlatna stranica':n>=3?' · Srebrna stranica':'')+'</small></h3><div class="stkRow">'+Object.keys(STK).map(t=>'<div class="stk'+(o[t]?" on":"")+'" style="--c:'+STK[t].c+'"><i>'+STK[t].em+'</i><b>'+STK[t].n+'</b><small>'+(o[t]?"osvojeno":STK[t].d)+'</small></div>').join("")+'</div><p class="muted">Naljepnice dijele životinje s upitnikom iznad glave. 3 naljepnice: srebrna stranica i lupa. Svih 5: zlatna stranica.</p>';
    const kinds=(e.ent||[]).filter(x=>HAB[x]);if(kinds.length){const kd=kinds[0],H=HAB[kd];z.obs=z.obs||{};const got=["j","d","n","k"].filter(s=>z.obs[kd+":"+s]).length;
      h+='<h3 class="encFH">Moja opažanja <small>'+got+' / 4</small></h3><ul class="obsL">'+["j","d","n","k"].map(s=>z.obs[kd+":"+s]?'<li class="on"><b>'+HABSLOT[s][0].toUpperCase()+HABSLOT[s].slice(1)+'</b><span>'+esc(H[s][3])+'</span></li>':'<li><b>?</b><span>Promatraj je izbliza '+HABSLOT[s]+'.</span></li>').join("")+'</ul><p class="muted">Doba dana mijenjaš gumbom sa suncem. Sva 4 opažanja donose 50 zlatnika i lupu.</p>';}
    const pg=$("sheetBody").querySelector(".encPg");if(pg){if(n>=5)pg.classList.add("gold");else if(n>=3)pg.classList.add("silver");}$("sheetBody").insertAdjacentHTML("beforeend",h);}catch(err){console.warn("encPage+",err);}};}
{const _se=sheetEnc;sheetEnc=function(ch,k){_se.apply(this,arguments);try{if(ENCV.k)return;const B=$("sheetBody");B.querySelectorAll(".encCard[data-k]").forEach(c=>{const n=stkCount(c.dataset.k);if(!n||c.classList.contains("lock"))return;c.classList.add(n>=5?"gold":n>=3?"silver":"stk1");c.insertAdjacentHTML("beforeend",'<em class="stkN">🏷 '+n+'</em>');});
    const r=zRank(),hd=B.querySelector(".encHead p");if(hd)hd.insertAdjacentHTML("afterend",'<p class="encRank">Tvoj naslov: <b>'+r.r+'</b> · naljepnice i opažanja: '+r.n+(r.nx?' (sljedeći naslov na '+r.nx+')':'')+'</p>');}catch(err){}};}
