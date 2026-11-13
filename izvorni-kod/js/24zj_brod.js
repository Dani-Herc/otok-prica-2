/* =================== v39: BROD: a ferry dock on every land and the map of the archipelago ===================
   Each land has a small pier with a sailing boat (Lučki grad uses its long pier). At the boat the ride is free;
   the same map opened from the explore menu is a "brza karta" that costs 10 coins. You can sail only to places
   you have already discovered. Save: S.brodTo (transient), nothing else. */
const BR={dock:null,boat:null,near:false,cost:10};
const BRA={main:120*DRAD};
function brPier(a,Y,th){const c=Math.cos(a),s=Math.sin(a);let r0=60;for(let r=30;r<112;r++){const x=Math.floor(128.5+c*r),z=Math.floor(128.5+s*r);if(hmap[x+z*W]<=th){r0=r;break;}}
  for(let r=r0-1;r<=r0+15;r+=.5)for(let w=-1;w<=1;w++){const x=Math.floor(128.5+c*r-s*w),z=Math.floor(128.5+s*r+c*w);for(let y=Y+1;y<Y+5;y++)if(vox[I(x,y,z)]&&!prot[I(x,y,z)])vox[I(x,y,z)]=0;wput(x,Y,z,T.sdaske,1);if(hmap[x+z*W]<=Y)hmap[x+z*W]=Y+1;if(w&&Math.floor(r)%5===0)for(let y=Y-1;y>=1&&!vox[I(x,y,z)];y--)wput(x,y,z,T.tdaske,1);}
  const ex=Math.floor(128.5+c*(r0+15)),ez=Math.floor(128.5+s*(r0+15));for(const w of [-1,1]){const x=Math.floor(128.5+c*(r0+15)-s*w),z=Math.floor(128.5+s*(r0+15)+c*w);wput(x,Y+1,z,T.tdaske,1);wput(x,Y+2,z,T.lampion,1);}
  return {x:128.5+c*(r0+12),z:128.5+s*(r0+12),y:Y+1,a,bx:128.5+c*(r0+11)-s*3.4,bz:128.5+s*(r0+11)+c*3.4};}
{const _bs=buildShore;buildShore=function(){const r=_bs.apply(this,arguments);if(!WORLD&&!BR.dock){try{BRA.main=brClear([105,150,90,75,165,120,270,285,315,15])*DRAD;BR.dock=brPier(BRA.main,SL+3,SL+3);POI.push({k:"pristan",n:"Pristanište",x:BR.dock.x,z:BR.dock.z,r:7});}catch(e){console.warn("pristan",e);}}return r;};}
{const _dg=dGen;dGen=function(k){const r=_dg.apply(this,arguments);try{const D=DST[k];if(k==="luka"){const q=POI.find(p=>p.k==="d_mol"),a=D.b+Math.PI/2,c=Math.cos(a),s=Math.sin(a);if(q)BR.dock={x:q.x-c*5,z:q.z-s*5,y:DBY+1,a,bx:q.x-c*6-s*3.6,bz:q.z-s*6+c*3.6};}
    else{BR.dock=brPier(D.b+(k==="dolina"?-1:1)*Math.PI/2,DBY,DBY);POI.push({k:"d_"+k+"_pristan",n:"Pristanište",x:BR.dock.x,z:BR.dock.z,r:7});}}catch(e){console.warn("pristan",e);}return r;};}
/* first angle whose pier would run over open water only */
function brClear(list){for(const deg of list){const a=deg*DRAD,c=Math.cos(a),s=Math.sin(a);let r0=0;for(let r=30;r<112;r++){const x=Math.floor(128.5+c*r),z=Math.floor(128.5+s*r);if(hmap[x+z*W]<=SL+3){r0=r;break;}}if(!r0||r0>95)continue;let ok=true;
    for(let r=r0+3;r<=r0+30&&ok;r++)for(let w=-7;w<=7;w+=1){const x=Math.floor(128.5+c*r-s*w),z=Math.floor(128.5+s*r+c*w);if(x<1||z<1||x>=W-1||z>=W-1||hmap[x+z*W]>SL+2){ok=false;break;}}if(ok)return deg;}return list[0];}
function brBoat(){if(BR.boat||!BR.dock)return;const g=new THREE.Group(),m=(c)=>new THREE.MeshLambertMaterial({color:new THREE.Color(c).multiplyScalar(.36)}),B=(w,h,d,c,x,y,z)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m(c));o.position.set(x,y,z);g.add(o);return o;};
  B(3.4,.7,1.5,0x8a5a34,0,.2,0);B(1,.6,1.1,0x8a5a34,2,.3,0).rotation.y=Math.PI/4;B(3.6,.14,1.7,0xd9b27a,0,.6,0);B(1.2,.5,1.1,0xe04a3a,-1,.9,0);B(.14,3.4,.14,0x6a4526,.4,2.3,0);const sail=B(.06,2.2,1.9,0xfff8e6,.52,2.5,0);sail.rotation.y=.25;B(.5,.3,.04,0xe04a3a,.7,3.9,0);
  g.position.set(BR.dock.bx,WATER-.25,BR.dock.bz);g.rotation.y=-BR.dock.a;g.scale.setScalar(1.25);scene.add(g);BR.boat=g;}
const brHere=()=>WORLD?(DST[WORLD]?WORLD:null):"main";
const brSeen=l=>l==="main"||!!(S.dst&&S.dst[l])||brHere()===l;
/* destinations; `at` is valid only while that land is loaded */
function brPlaces(){const P=[{l:"main",k:"dock",n:"Pristanište",mx:BR.dock&&brHere()==="main"?BR.dock.x-128:Math.cos(BRA.main)*70,mz:BR.dock&&brHere()==="main"?BR.dock.z-128:Math.sin(BRA.main)*70,at:()=>[BR.dock.x,BR.dock.z],seen:()=>true},{l:"main",k:"knj",n:"Knjižnica",mx:0,mz:0,at:()=>[LIB.x+.5,LIB.z+13.5],seen:()=>true}];
  for(const k of DSK){const D=DST[k],da=D.b+(k==="dolina"?-1:1)*Math.PI/2;P.push({l:k,k:"dock",n:k==="luka"?"Dugi mol":"Pristanište",mx:Math.cos(da)*72,mz:Math.sin(da)*72,at:()=>[BR.dock.x,BR.dock.z],seen:()=>brSeen(k)});
    P.push({l:k,k:"trg",n:"Trg",mx:0,mz:0,at:()=>[128.5,136.5],seen:()=>brSeen(k)});
    if(D.pond)P.push({l:k,k:"jez",n:"Jezerce",mx:D.pond.x-128,mz:D.pond.z-128,at:()=>[Math.floor(D.pond.x)+.5,Math.floor(D.pond.z+D.pond.r+3)+.5],seen:()=>!!(S.poi&&S.poi.d_jezero)});
    if(D.hill)P.push({l:k,k:"vid",n:"Vidikovac",mx:D.hill.x-128,mz:D.hill.z-128,at:()=>[Math.floor(D.hill.x)+.5,Math.floor(D.hill.z)+6.5],seen:()=>!!(S.poi&&S.poi.d_vidik)});}
  return P;}
function brPut(p){const q=jbSpot.apply(null,p.at()),y=Math.max(topY(q[0],q[1]),WATER-1)+1.1;if(!FP.on)startSquirrel();FP.p.set(q[0],y,q[1]);FP.v.set(0,0,0);FP.safe.copy(FP.p);FP.camT.set(q[0],y+1.05,q[1]);FP.cam.cur=FP.cam.tdist;if(rida){rida.x=q[0];rida.z=q[1];rida.y=y;}}
function brSail(p,free){const here=brHere();if(!here)return;if(typeof IN!=="undefined"&&IN.on)inLeave(true);if(!free){if(S.coins<BR.cost){toast("Brza karta stoji "+BR.cost+" zlatnika. S pristaništa je vožnja besplatna.",3800);return;}S.coins-=BR.cost;renderEco();}
  closeSheet();sfx.chime();if(p.l===here){save();inVeil(()=>{brPut(p);toast((free?"Brod te dovezao: ":"Stigla si: ")+p.n+".",2800);});return;}
  S.brodTo={l:p.l,k:p.k};dGo(p.l==="main"?null:p.l,null);}
function sheetKarta(free){if(!brHere()){toast("Karta otočja radi na Otoku priča i u četvrtima.",2600);return;}const here=brHere(),P=brPlaces(),sc=.52,ps=.3,cx=178,cy=146,off=l=>l==="main"?{x:0,z:0}:DST[l].off;
  const land=(l)=>{const o=off(l),open=l==="main"||dOpen(l),seen=brSeen(l),col=l==="main"?"#6fbf5a":"rgb("+DST[l].grass.map(v=>Math.round(v*255)).join(",")+")";
    return '<g opacity="'+(open?1:.45)+'"><ellipse cx="'+(cx+o.x*sc)+'" cy="'+(cy+o.z*sc)+'" rx="'+(l==="main"?30:38)+'" ry="'+(l==="main"?28:35)+'" fill="#f3e2b0" stroke="#16243a" stroke-width="2.5"/><ellipse cx="'+(cx+o.x*sc)+'" cy="'+(cy+o.z*sc)+'" rx="'+(l==="main"?25:33)+'" ry="'+(l==="main"?23:30)+'" fill="'+(seen?col:"#b8c2cf")+'"/><text x="'+(cx+o.x*sc)+'" y="'+(cy+o.z*sc+(l==="main"?41:48))+'" text-anchor="middle" font-size="10.5" font-weight="700" fill="#16243a">'+esc(dLocName(l))+(open?"":" · razina "+DST[l].lv)+'</text></g>';};
  const br=DSK.map(k=>{const o=DST[k].off;return '<line x1="'+(cx+o.x*sc*.22)+'" y1="'+(cy+o.z*sc*.22)+'" x2="'+(cx+o.x*sc*.7)+'" y2="'+(cy+o.z*sc*.7)+'" stroke="#9a6a3c" stroke-width="4" stroke-dasharray="5 3"/>';}).join("");
  const ok=P.filter(p=>(p.l==="main"||dOpen(p.l))&&p.seen());
  const pins=ok.map((p,i)=>{const o=off(p.l),x=cx+o.x*sc+p.mx*ps,y=cy+o.z*sc+p.mz*ps;return '<g class="brpin" data-i="'+i+'"><circle cx="'+x+'" cy="'+y+'" r="7.5" fill="'+(p.k==="dock"?"#4a7fd6":"#f2b22e")+'" stroke="#16243a" stroke-width="2.5"/>'+(p.k==="dock"?'<path d="M'+(x-3.5)+' '+(y+1)+'h7l-1.5 3h-4zM'+x+' '+(y-4)+'v4.5h3.5z" fill="#fff"/>':'<circle cx="'+x+'" cy="'+y+'" r="2.5" fill="#16243a"/>')+'</g>';}).join("");
  const me=(()=>{const o=off(here),x=cx+o.x*sc+(FP.on?FP.p.x-128:0)*ps,y=cy+o.z*sc+(FP.on?FP.p.z-128:0)*ps;return '<path d="M'+x+' '+(y-9)+'l5 9h-10z" fill="#e04a3a" stroke="#16243a" stroke-width="2"/>';})();
  const lands=["main"].concat(DSK);
  openSheet('<h2>Karta otočja</h2><p class="muted">'+(free?"Brod te besplatno vozi do svakog mjesta koje si već otkrila.":"Brza karta stoji "+BR.cost+" zlatnika. S pristaništa je vožnja brodom besplatna.")+'</p>'+
    '<div class="brmap"><svg viewBox="0 0 320 300" role="img" aria-label="Karta otočja"><rect width="320" height="300" rx="14" fill="#8fd0f0"/><g opacity=".5" stroke="#fff" stroke-width="2" fill="none"><path d="M20 40q8-6 16 0t16 0M250 262q8-6 16 0t16 0M30 250q8-6 16 0t16 0M236 34q8-6 16 0t16 0"/></g>'+br+lands.map(land).join("")+pins+me+'</svg></div>'+
    lands.map(l=>{const L=ok.filter(p=>p.l===l);if(l!=="main"&&!dOpen(l))return '<div class="brrow off"><b>'+esc(dLocName(l))+'</b><span>Otvara se na razini '+DST[l].lv+'.</span></div>';if(!L.length)return '<div class="brrow off"><b>'+esc(dLocName(l))+'</b><span>Prvo prijeđi most pa ćeš moći i brodom.</span></div>';
      return '<div class="brrow"><b>'+esc(dLocName(l))+'</b><div>'+L.map(p=>'<button class="btn soft" data-go="'+ok.indexOf(p)+'">'+esc(p.n)+'</button>').join("")+'</div></div>';}).join("")+
    '<p class="muted">Crveni trokut pokazuje gdje si sada. Plavi krugovi su pristaništa, žuti ostala mjesta.</p>');
  const go=i=>{const p=ok[i];if(p)brSail(p,free);};$("sheetBody").querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(+b.dataset.go));$("sheetBody").querySelectorAll(".brpin").forEach(g=>g.onclick=()=>go(+g.dataset.i));}
function brTick(tt){if(!BR.dock)return;brBoat();if(BR.boat){BR.boat.position.y=WATER-.25+Math.sin(tt*1.3)*.07;BR.boat.rotation.z=Math.sin(tt*1.1)*.03;}
  const inRoom=typeof IN!=="undefined"&&(IN.on||IN.busy),near=FP.on&&!inRoom&&!DQ.near&&$("veil").hidden&&Math.hypot(FP.p.x-BR.dock.x,FP.p.z-BR.dock.z)<4.2&&Math.abs(FP.p.y-BR.dock.y)<4;
  if(near!==BR.near){BR.near=near;const el=$("bldGo");if(near){el.textContent="Brod: kamo ploviš?";el.hidden=false;}else if(!DQ.near&&!inRoom)el.hidden=true;}}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);try{brTick(tt);}catch(e){if(!BR.err){BR.err=1;console.warn("brod",e);}}};}
{const prev=$("bldGo").onclick;$("bldGo").onclick=function(){if(BR.near&&!(typeof IN!=="undefined"&&IN.on)&&!DQ.near){sfx.click();sheetKarta(true);return;}return prev&&prev.apply(this,arguments);};}
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);const r=$("mmJob")||$("mmStan")||$("mmHow");if(r&&!$("mmKarta")&&brHere()){r.insertAdjacentHTML("beforebegin",'<button class="btn" id="mmKarta">Karta otočja</button>');$("mmKarta").onclick=()=>{sfx.click();sheetKarta(BR.near);};}};}
/* arrival by boat */
{const _boot=boot;boot=function(){const r=_boot.apply(this,arguments);try{const B=S.brodTo;if(B){S.brodTo=null;save();if(B.l===brHere())setTimeout(()=>{try{const p=brPlaces().find(q=>q.l===B.l&&q.k===B.k);if(p&&BR.dock){brPut(p);toast("Brod je pristao: "+p.n+", "+dLocName(B.l)+".",3600);}}catch(e){console.warn("brod",e);}},1500);}}catch(e){}return r;};}
