/* =================== v37: ZADACI STANOVNIKA: small delivery jobs that tie the lands together ===================
   Every day three residents need something carried: a letter from the post office to the harbour captain, bread
   to the pier, a book to the lookout. A golden sign marks where to pick the thing up, a green one where it goes;
   a job that ends on another land shows a beam over that land and the chip says which bridge to take.
   If Dorotea owns the matching town building (pošta, pekara ...) the job starts or ends there and pays more.
   Save: S.job={day,list,done,cur:{id,st},n,told} (optional). */
const JB={mk:[],car:null,acc:0,sig:"",ic:{},tex:{}};
const JBI={pismo:["pismo","Pismo"],kruh:["kruh","Topli kruh"],cvijet:["buket","Buket cvijeća"],bilje:["ljekovito bilje","Ljekovito bilje"],knjiga:["knjigu","Knjiga"],riba:["svježu ribu","Svježa riba"],sisarka:["šišarke","Košara šišarki"],med:["med","Staklenka meda"],lampa:["svjetiljku","Svjetiljka"],karta:["kartu","Stara karta"]};
/* fixed places; `at` is called only while that land is loaded */
const JBP={
  knj:{l:"main",n:"knjižnica",g:"u knjižnicu",at:()=>[LIB.x+.5,LIB.z+15.5]},
  m_luka:{l:"main",n:"most za Lučki grad",g:"na most za Lučki grad",at:()=>jbHead("luka")},
  m_dolina:{l:"main",n:"most za Cvjetnu dolinu",g:"na most za Cvjetnu dolinu",at:()=>jbHead("dolina")},
  m_gora:{l:"main",n:"most za Gorski kraj",g:"na most za Gorski kraj",at:()=>jbHead("gora")},
  luka_trg:{l:"luka",n:"tržnica u Lučkom gradu",g:"Kapetanici Riti na tržnicu",at:()=>[128.5,135.5]},
  luka_mol:{l:"luka",n:"Dugi mol",g:"ribarima na Dugi mol",at:()=>{const q=POI.find(p=>p.k==="d_mol");if(!q)return [128.5,135.5];const d=Math.hypot(q.x-128.5,q.z-128.5);return [Math.floor(q.x-(q.x-128.5)/d*5)+.5,Math.floor(q.z-(q.z-128.5)/d*5)+.5];}},
  dolina_trg:{l:"dolina",n:"trg u Cvjetnoj dolini",g:"Pastirici Runi na trg",at:()=>[128.5,135.5]},
  dolina_jez:{l:"dolina",n:"jezerce s lopočima",g:"žabama na jezerce",at:()=>{const P=DST.dolina.pond;return [Math.floor(P.x)+.5,Math.floor(P.z+P.r+3)+.5];}},
  gora_trg:{l:"gora",n:"trg u Gorskom kraju",g:"Čuvarici Hukalici na trg",at:()=>[128.5,135.5]},
  gora_vid:{l:"gora",n:"vidikovac",g:"stražaru na vidikovac",at:()=>{const h=DST.gora.hill;return [Math.floor(h.x)+.5,Math.floor(h.z)+6.5];}}};
/* id, item, from (first that exists wins), to, title */
const JOBS=[
  ["p1","pismo",["posta","knj"],["luka_trg"],"Pismo za Kapetanicu Ritu"],["p2","pismo",["posta","knj"],["gora_trg"],"Pismo za Čuvaricu Hukalicu"],["p3","pismo",["posta","knj"],["dolina_trg"],"Pismo za Pastiricu Runu"],
  ["k1","kruh",["pekara","luka_trg"],["luka_mol"],"Doručak za ribare"],["k2","kruh",["pekara","luka_trg"],["gora_vid"],"Kruh za stražara na vidikovcu"],["k3","kruh",["pekara","luka_trg"],["m_dolina"],"Užina za čuvara mosta"],
  ["c1","cvijet",["cvjecarna","dolina_jez"],["knj"],"Buket za knjižnicu"],["c2","cvijet",["cvjecarna","dolina_jez"],["luka_trg"],"Cvijeće za tržnicu"],
  ["b1","bilje",["gora_trg"],["ambulanta","knj"],"Bilje za čaj protiv kašlja"],["b2","bilje",["gora_trg"],["dolina_trg"],"Bilje za ovčice"],
  ["n1","knjiga",["knj"],["skola","dolina_trg"],"Lektira za male čitače"],["n2","knjiga",["knj"],["gora_vid"],"Knjiga za duge straže"],["n3","knjiga",["knj"],["luka_mol"],"Priče za mornare"],
  ["r1","riba",["luka_mol"],["dolina_trg"],"Riba za ručak u dolini"],["r2","riba",["luka_mol"],["vatrogasci","gora_trg"],"Riba za gladne u gori"],
  ["s1","sisarka",["gora_vid"],["muzej","knj"],"Šišarke za zbirku"],["m1","med",["dolina_trg"],["pekara","luka_trg"],"Med za medenjake"],["m2","med",["dolina_jez"],["knj"],"Med za čaj u knjižnici"],
  ["l1","lampa",["knj"],["m_luka"],"Svjetiljka za most"],["l2","lampa",["knj"],["m_gora"],"Svjetiljka za gorski most"],["t1","karta",["m_dolina"],["knj"],"Stara karta za knjižnicu"],["t2","karta",["m_luka"],["muzej","knj"],"Karta nađena kod mosta"]];
function jbHead(k){const D=DST[k],c=Math.cos(D.a),s=Math.sin(D.a);let r=(D.r0||60)-4;for(let i=0;i<14;i++){const x=Math.floor(128.5+c*r),z=Math.floor(128.5+s*r);if(hmap[x+z*W]>SL+2&&topY(x,z)<DBY+3)break;r--;}return [Math.floor(128.5+c*r)+.5,Math.floor(128.5+s*r)+.5];}
const jbHere=()=>WORLD?(DST[WORLD]?WORLD:null):"main";
const jbLandOpen=l=>l==="main"||dOpen(l);
/* place key -> {l,n,g,at,own} or null when it does not exist or its land is still closed */
function jbPlace(k){if(JBP[k])return jbLandOpen(JBP[k].l)?JBP[k]:null;if(!GRD[k])return null;const b=S.books.find(x=>x.bld===k&&PLOTS[x.plot]);if(!b)return null;const l=dLoc(b.plot);if(!jbLandOpen(l))return null;
  const low=GRD[k].n.toLowerCase();return {l,own:1,n:"tvoja "+low,g:{skola:"u tvoju školu",pekara:"u tvoju pekaru",posta:"u tvoju poštu",vatrogasci:"u tvoj vatrogasni dom",ambulanta:"u tvoju ambulantu",cvjecarna:"u tvoju cvjećarnu",muzej:"u tvoj muzej"}[k],at:()=>{const p=PLOTS[b.plot];return [p.x+.5,p.z+8.5];}};}
function jbRes(id){const J=JOBS.find(j=>j[0]===id);if(!J)return null;let f=null,t=null;for(const k of J[2]){f=jbPlace(k);if(f)break;}for(const k of J[3]){t=jbPlace(k);if(t)break;}if(!f||!t||f===t)return null;
  const far=f.l!==t.l;return {id,it:J[1],f,t,title:J[4],far,pay:(far?70:40)+((f.own||t.own)?20:0)};}
function jbS(){S.job=S.job||{};const J=S.job,t=today();if(J.day!==t||!Array.isArray(J.list)){const keep=J.cur&&J.cur.st===1&&jbRes(J.cur.id)?J.cur:null;J.day=t;J.done=[];J.cur=keep;
    const all=JOBS.map(j=>jbRes(j[0])).filter(Boolean),seed=t.split("-").reduce((a,b)=>a*37+ +b,7);all.sort((a,b)=>hash2(JOBS.findIndex(j=>j[0]===a.id),seed%977,5)-hash2(JOBS.findIndex(j=>j[0]===b.id),seed%977,5));
    const pick=[];if(keep)pick.push(keep.id);const far=all.find(a=>a.far&&!pick.includes(a.id));if(far)pick.push(far.id);for(const a of all){if(pick.length>=3)break;if(pick.includes(a.id))continue;if(pick.some(p=>{const q=jbRes(p);return q.it===a.it||q.f===a.f;}))continue;pick.push(a.id);}
    for(const a of all){if(pick.length>=3)break;if(!pick.includes(a.id))pick.push(a.id);}J.list=pick;}
  J.done=J.done||[];J.n=J.n||0;return J;}
/* ---- icons ---- */
function jbIcon(k){if(JB.ic[k])return JB.ic[k];const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d"),ol="#16243a";x.lineJoin=x.lineCap="round";x.lineWidth=4;x.strokeStyle=ol;
  const P=(pts,fill,open)=>{x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));if(!open)x.closePath();if(fill){x.fillStyle=fill;x.fill();}x.stroke();};const C=(px,py,r,fill)=>{x.beginPath();x.arc(px,py,r,0,7);x.fillStyle=fill;x.fill();x.stroke();};
  if(k==="pismo"){P([[8,18],[56,18],[56,48],[8,48]],"#fff8e6");P([[8,18],[32,36],[56,18]],null,true);C(32,38,6,"#e04a3a");}
  else if(k==="kruh"){x.beginPath();x.ellipse(32,36,24,15,0,0,7);x.fillStyle="#d99a4e";x.fill();x.stroke();x.lineWidth=3;for(const dx of [-10,0,10])P([[32+dx-4,30],[32+dx+4,40]],null,true);}
  else if(k==="cvijet"){P([[30,34],[26,58],[38,58],[34,34]],"#5aa85a");for(const [a,b,col] of [[22,22,"#ff8fb0"],[42,22,"#ffd24a"],[32,14,"#c08bff"],[32,30,"#ff6b6b"]]){C(a,b,8,col);x.fillStyle="#fff3c4";x.beginPath();x.arc(a,b,3,0,7);x.fill();}}
  else if(k==="bilje"){P([[32,58],[32,22]],null,true);for(const [y,s] of [[26,1],[36,-1],[44,1],[50,-1]]){x.beginPath();x.ellipse(32+s*10,y,10,5,s*-.5,0,7);x.fillStyle="#6fbf5a";x.fill();x.stroke();}C(32,16,6,"#e8f0a8");}
  else if(k==="knjiga"){P([[12,12],[48,12],[52,16],[52,54],[16,54],[12,50]],"#4a7fd6");P([[18,20],[44,20],[44,30],[18,30]],"#fff8e6");P([[16,54],[16,16]],null,true);}
  else if(k==="riba"){x.beginPath();x.ellipse(28,32,20,12,0,0,7);x.fillStyle="#6cc4e0";x.fill();x.stroke();P([[46,32],[58,20],[58,44]],"#4aa3c4");x.fillStyle=ol;x.beginPath();x.arc(18,29,3,0,7);x.fill();}
  else if(k==="sisarka"){P([[14,34],[50,34],[44,54],[20,54]],"#c79a5a");for(const [a,b] of [[24,26],[38,26],[31,16]]){x.beginPath();x.ellipse(a,b,7,10,0,0,7);x.fillStyle="#8a5a34";x.fill();x.stroke();}P([[14,34],[50,34]],null,true);}
  else if(k==="med"){P([[16,22],[48,22],[48,50],[42,56],[22,56],[16,50]],"#f2b22e");P([[14,12],[50,12],[50,22],[14,22]],"#fff8e6");P([[22,34],[42,34],[42,44],[22,44]],"#fff3c4");}
  else if(k==="lampa"){P([[22,22],[42,22],[46,50],[18,50]],"#ffe27a");P([[18,50],[46,50],[46,56],[18,56]],"#6b7a8c");P([[24,22],[40,22],[36,14],[28,14]],"#6b7a8c");x.beginPath();x.arc(32,10,5,Math.PI,0);x.stroke();}
  else{P([[10,14],[26,20],[40,14],[54,20],[54,52],[40,46],[26,52],[10,46]],"#f3e2b0");P([[26,20],[26,52]],null,true);P([[40,14],[40,46]],null,true);x.strokeStyle="#e04a3a";P([[16,36],[22,30]],null,true);P([[16,30],[22,36]],null,true);}
  return JB.ic[k]=c.toDataURL();}
function jbTex(k,bg){bg=bg||"#f2b22e";const key=k+bg;if(JB.tex[key])return JB.tex[key];const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");x.fillStyle=bg;x.strokeStyle="#16243a";x.lineWidth=8;x.beginPath();x.arc(64,64,56,0,7);x.fill();x.stroke();
  const t=new THREE.CanvasTexture(c);const im=new Image();im.onload=()=>{x.drawImage(im,22,22,84,84);t.needsUpdate=true;};im.src=jbIcon(k);return JB.tex[key]=t;}
/* a free bit of ground near (x,z): nothing built above the terrain, not water */
function jbSpot(x,z){const ok=(X,Z)=>{X=Math.floor(X);Z=Math.floor(Z);if(X<2||Z<2||X>=W-2||Z>=W-2)return false;const t=topY(X,Z);if(t<WATER-1)return false;for(const [a,b] of [[0,0],[1,0],[-1,0],[0,1],[0,-1]])if(Math.abs(topY(X+a,Z+b)-t)>1)return false;return true;};
  if(ok(x,z))return [x,z];for(let r=1;r<=7;r++)for(let i=0;i<12;i++){const a=i*Math.PI/6+r,X=x+Math.cos(a)*r,Z=z+Math.sin(a)*r;if(ok(X,Z))return [Math.floor(X)+.5,Math.floor(Z)+.5];}return [x,z];}
/* ---- markers ---- */
function jbMark(x,z,k,col,far){const g=new THREE.Group(),y=far?WATER:Math.max(topY(x,z),WATER-1)+1;g.position.set(x,y,z);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(far?5:.55,far?5:.55,far?150:26,12,1,true),new THREE.MeshBasicMaterial(far?{color:0x2fbf5f,transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide,fog:false}:{color:col,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));beam.position.y=far?75:13;g.add(beam);if(!far)g.userData.beam=beam;
  if(!far){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.5,.12,6,28),new THREE.MeshBasicMaterial({color:col,transparent:true}));ring.rotation.x=Math.PI/2;ring.position.y=.12;g.add(ring);g.userData.ring=ring;
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:jbTex(k,col===0x4fd67a?"#3fa86a":"#f2b22e"),color:0xb8b8b8,transparent:true,depthWrite:false}));sp.scale.set(1.9,1.9,1);sp.position.y=3;g.add(sp);g.userData.sp=sp;}
  scene.add(g);return g;}
function jbClear(){for(const m of JB.mk){scene.remove(m.g);m.g.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material&&!o.material.map)o.material.dispose();});}JB.mk=[];}
function jbSync(){const J=jbS(),here=jbHere(),sig=[J.day,J.list.join(),J.done.join(),J.cur?J.cur.id+J.cur.st:"",here].join("|");if(sig===JB.sig)return;JB.sig=sig;jbClear();if(!here||G2.mode==="mini")return;
  const farAt=l=>{const d=dDelta(l==="main"?null:l);return [128.5+d.x,128.5+d.z];};
  if(J.cur&&J.cur.st===1){const R=jbRes(J.cur.id);if(!R)return;if(R.t.l===here){const p=jbSpot.apply(null,R.t.at());JB.mk.push({g:jbMark(p[0],p[1],R.it,0x4fd67a),x:p[0],z:p[1],k:"to",id:R.id});}else{const p=farAt(R.t.l);JB.mk.push({g:jbMark(p[0],p[1],R.it,0x4fd67a,true),k:"far"});}return;}
  for(const id of J.list){if(J.done.includes(id))continue;const R=jbRes(id);if(!R||R.f.l!==here)continue;let p=jbSpot.apply(null,R.f.at());if(JB.mk.some(m=>Math.hypot(m.x-p[0],m.z-p[1])<1))p=jbSpot(p[0]+3,p[1]+1);JB.mk.push({g:jbMark(p[0],p[1],R.it,0xffc53d),x:p[0],z:p[1],k:"from",id});}}
function jbCarry(){const J=jbS(),on=FP.on&&J.cur&&J.cur.st===1&&G2.mode!=="mini";if(!on){if(JB.car){scene.remove(JB.car);JB.car=null;}return;}const R=jbRes(J.cur.id);if(!R)return;
  if(!JB.car||JB.car.userData.k!==R.it){if(JB.car)scene.remove(JB.car);JB.car=new THREE.Sprite(new THREE.SpriteMaterial({map:jbTex(R.it,"#fff3c4"),color:0xb0b0b0,transparent:true,depthWrite:false}));JB.car.scale.set(.62,.62,1);JB.car.userData.k=R.it;scene.add(JB.car);}
  JB.car.position.set(FP.p.x,FP.p.y+1.5+Math.sin(performance.now()/300)*.05,FP.p.z);}
function jbChip(){let el=$("jobChip");const J=jbS(),R=J.cur&&J.cur.st===1?jbRes(J.cur.id):null;if(!FP.on||!R||G2.mode==="mini"){if(el)el.hidden=true;return;}
  if(!el){$("fpUI").insertAdjacentHTML("beforeend",'<div class="card jobchip pe" id="jobChip"><img alt="" id="jcI"><span id="jcT"></span><i id="jcA"><svg viewBox="0 0 10 10" aria-hidden="true"><path fill="#16243a" d="M5 0l5 6H7v4H3V6H0z"/><path fill="#4fd67a" d="M5 1.5L8 5.2H6.2V9H3.8V5.2H2z"/></svg></i><b id="jcD"></b></div>');el=$("jobChip");el.onclick=()=>{sfx.click();sheetJobs();};}
  el.hidden=false;$("jcI").src=jbIcon(R.it);const here=jbHere(),m=JB.mk.find(q=>q.k==="to");
  if(R.t.l===here&&m){const dx=m.x-FP.p.x,dz=m.z-FP.p.z,d=Math.hypot(dx,dz),f=new THREE.Vector3();camera.getWorldDirection(f);const rel=Math.atan2(f.x*dz-f.z*dx,f.x*dx+f.z*dz);$("jcT").textContent="Odnesi "+JBI[R.it][0]+" "+R.t.g;$("jcA").hidden=false;$("jcA").style.transform="rotate("+rel+"rad)";$("jcD").textContent=Math.round(d)+" m";}
  else{$("jcT").textContent="Odnesi "+JBI[R.it][0]+" "+R.t.g+". "+(R.t.l==="main"?"Prijeđi most za Glavni otok":(here==="main"?"Prijeđi "+JBP["m_"+R.t.l].n:"Idi preko Glavnog otoka: "+dLocName(R.t.l)))+".";$("jcA").hidden=true;$("jcD").textContent="";}}
function jbTick(){const J=jbS();jbSync();jbChip();if(!FP.on||G2.mode==="mini"||!$("veil").hidden)return;const P=FP.p;
  if(JB.hold&&!JB.mk.some(m=>m.k==="from"&&Math.hypot(m.x-P.x,m.z-P.z)<5))JB.hold=0;
  for(const m of JB.mk){if(m.k==="far"||Math.hypot(m.x-P.x,m.z-P.z)>3.2||Math.abs(m.g.position.y-P.y)>7)continue;
    if(m.k==="from"&&!J.cur&&!JB.hold){const R=jbRes(m.id);if(!R)continue;J.cur={id:m.id,st:1};save();sfx.chime();burst(m.x,m.g.position.y+1,m.z,14,[[1,.85,.3],[1,1,1]],1.8,1.8,.7);toast(JBI[R.it][1]+" je kod tebe! Odnesi "+JBI[R.it][0]+" "+R.t.g+(R.far?" ("+dLocName(R.t.l)+")":"")+".",5200);jbSync();return;}
    if(m.k==="to"&&J.cur&&J.cur.id===m.id){const R=jbRes(m.id);J.cur=null;J.done.push(m.id);J.n++;JB.hold=1;let c=R?R.pay:40,all=J.list.every(i=>J.done.includes(i)),ex="";if(all){c+=60;const E2=encS();E2.lupe=(E2.lupe||0)+1;ex=" Sva tri zadatka su gotova: još 60 zlatnika i lupa!";}
      S.coins+=c;save();renderEco();sfx.fanfare();burst(m.x,m.g.position.y+1.2,m.z,26,[[.3,.85,.5],[1,.9,.4],[1,1,1]],2.4,2.4,.9);if(all&&typeof fireworks==="function")fireworks();toast("Hvala ti! "+(R?R.title:"Zadatak")+": +"+(R?R.pay:40)+" zlatnika."+ex,all?6500:4500);jbSync();return;}}}
function jbAnim(tt){for(const m of JB.mk){const u=m.g.userData;if(u.beam){const gp=m.g.position,c=camera.position,d=Math.hypot(c.x-gp.x,c.z-gp.z),f=Math.max(0,Math.min(1,(d-3)/5));u.beam.material.opacity=.22*f;if(u.sp)u.sp.material.opacity=f;if(u.ring)u.ring.material.opacity=.45+.55*f;}if(u.sp)u.sp.position.y=3+Math.sin(tt*2.4)*.22;if(u.ring){const s=1+Math.sin(tt*3)*.08;u.ring.scale.set(s,s,1);}}}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);try{jbCarry();jbAnim(tt);JB.acc+=dt;if(JB.acc<.2)return;JB.acc=0;jbTick();
    const J=S.job;if(FP.on&&J&&J.told!==J.day&&jbHere()&&G2.mode!=="mini"){J.told=J.day;save();const n=J.list.filter(i=>!J.done.includes(i)).length;if(n)setTimeout(()=>toast("Stanovnici danas imaju "+n+" "+(n===1?"zadatak":"zadatka")+" za tebe. Traži zlatne znakove!",4600),3500);}}catch(e){if(!JB.err){JB.err=1;console.warn("zadaci",e);}}};}
/* ---- sheet ---- */
function sheetJobs(){const J=jbS(),here=jbHere();const rows=J.list.map(id=>{const R=jbRes(id);if(!R)return "";const done=J.done.includes(id),car=J.cur&&J.cur.id===id;
    return '<div class="card jobc'+(done?" done":"")+'"><img alt="" src="'+jbIcon(R.it)+'"><div><b>'+esc(R.title)+'</b><small>Uzmi: '+esc(R.f.n)+' ('+esc(dLocName(R.f.l))+')</small><small>Odnesi: '+esc(R.t.n)+' ('+esc(dLocName(R.t.l))+')</small></div><em>'+(done?"Gotovo":car?"Nosiš":"+"+R.pay)+'</em></div>';}).join("");
  const left=J.list.filter(i=>!J.done.includes(i)).length;
  openSheet('<h2>Zadaci stanovnika</h2><p class="muted">Stanovnici svaki dan trebaju pomoć. U istraživanju priđi zlatnom znaku da uzmeš stvar, pa je odnesi do zelenog znaka. Zadatak na drugom otoku pokazuje zelena zraka iznad njega.</p>'+rows+
    '<div class="card jobsum"><b>'+(left?"Još "+left+" od "+J.list.length+" za današnju nagradu":"Sve je obavljeno. Sutra stižu novi zadaci!")+'</b><small class="muted">Sva tri zadatka u danu donose još 60 zlatnika i lupu za enciklopediju. Ukupno obavljeno: '+J.n+'.</small></div>'+
    (J.cur?'<button class="btn soft" id="jbDrop">Vrati stvar i odaberi drugi zadatak</button>':''));
  if($("jbDrop"))$("jbDrop").onclick=()=>{sfx.click();J.cur=null;save();jbSync();sheetJobs();};}
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);const r=$("mmStan")||$("mmHow");if(r&&!$("mmJob")){r.insertAdjacentHTML("beforebegin",'<button class="btn" id="mmJob">Zadaci stanovnika</button>');$("mmJob").onclick=()=>{sfx.click();sheetJobs();};}};}
if(typeof sheetZivot==="function"){const _sz=sheetZivot;sheetZivot=function(){_sz.apply(this,arguments);try{const J=jbS(),left=J.list.filter(i=>!J.done.includes(i)).length;$("sheetBody").insertAdjacentHTML("beforeend",'<button class="btn big" id="zvJob">Zadaci stanovnika'+(left?" ("+left+")":"")+'</button>');$("zvJob").onclick=()=>{sfx.click();sheetJobs();};}catch(e){}};}
/* jobs count toward the island's development (one point per three jobs, at most 8) */
{const _gl=gradLevel;gradLevel=function(){const L=_gl.apply(this,arguments);try{const add=Math.min(8,Math.floor(((S.job&&S.job.n)||0)/3));if(add){L.pts+=add;let i=0;GLV.forEach((l,j)=>{if(L.pts>=l[0])i=j;});L.i=i;L.n=GLV[i][1];L.nx=GLV[i+1]||null;}}catch(e){}return L;};}
