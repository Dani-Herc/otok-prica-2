/* =================== v18: the book moment =================== */
/* When a book is finished the island reacts as a short film: the bars close in, the camera circles the new building,
   a little theme plays, a pillar of light rises, the title appears, and a Story Star flies off and lands somewhere on the
   island, so the child has a new place to go and find. A tap skips it. */

/* ---------- a soft synth for the theme: attack, release, two voices ---------- */
function mNote(f,t,d,vol,type,det){if(muted)return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();const t0=actx.currentTime+t;
  for(const [mul,v,ty] of [[1,1,type||"triangle"],[2,.22,"sine"]]){const o=actx.createOscillator(),g=actx.createGain();o.type=ty;o.frequency.setValueAtTime(f*mul,t0);if(det)o.detune.setValueAtTime(det,t0);
    g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(vol*v,t0+.025);g.gain.setValueAtTime(vol*v,t0+Math.max(.03,d*.55));g.gain.exponentialRampToValueAtTime(.0001,t0+d);
    o.connect(g);g.connect(auOut());o.start(t0);o.stop(t0+d+.05);}}catch(e){}}
const NF=n=>440*Math.pow(2,(n-69)/12);
/* the book theme: a rising arpeggio, a little turn, and a warm landing chord */
function playBookTheme(){const b=.2;const mel=[[74,0,1],[78,1,1],[81,2,1],[86,3,2],[85,5,1],[81,6,1],[83,7,1],[79,8,1],[81,9,1],[78,10,1],[74,11,1],[76,12,1],[78,13,1],[81,14,2],[86,16,6]];
  for(const [n,s,l] of mel)mNote(NF(n),s*b,l*b+.35,.05,"triangle");
  const bass=[[50,0,4],[45,4,4],[47,8,2],[43,10,2],[45,12,4],[50,16,6]];for(const [n,s,l] of bass)mNote(NF(n),s*b,l*b+.3,.045,"sine");
  for(const n of [62,66,69,74])mNote(NF(n),16*b,1.9,.022,"sine",n%2?4:-4);
  [2093,2637,3136].forEach((f,i)=>tone(f,.5,"sine",.012,16*b+.05+i*.06));}

/* ---------- the overlay: letterbox bars and a title card ---------- */
function cineDom(){let el=$("cine");if(el)return el;el=document.createElement("div");el.id="cine";el.innerHTML='<i class="cbar t"></i><i class="cbar b"></i><div class="cine-card"><small id="cineK"></small><b id="cineT"></b><span id="cineS"></span></div><div class="cine-skip">Dodirni za preskakanje</div>';document.body.appendChild(el);return el;}

/* ---------- the Story Star: a special treasure that lands on the island ---------- */
const STAR_IT={k:"zvpr",n:"Zvijezda priče",r:3,sh:"star",c:["#ffd23d","#fff6c0"]};
{const _tm=tMat;tMat=function(k){if(k==="zvpr"){if(tMats.zvpr)return tMats.zvpr;return tMats.zvpr=new THREE.SpriteMaterial({map:texFrom(icv(STAR_IT.sh,STAR_IT.c)),transparent:true,depthWrite:false});}return _tm.apply(this,arguments);};}
/* daily treasure refresh keeps only the last few ordinary finds: Story Stars always stay until found */
{const _dt=dailyTreasures;dailyTreasures=function(){const keep=(S.spawns||[]).filter(x=>x.story);S.spawns=(S.spawns||[]).filter(x=>!x.story);_dt.apply(this,arguments);for(const k of keep)if(!S.spawns.some(s=>s.id===k.id))S.spawns.push(k);syncTreasures();};}
{const _sy=syncTreasures;syncTreasures=function(){_sy.apply(this,arguments);for(const tr of treasures){if(tr.k!=="zvpr"||tr.beam)continue;
    const bm=new THREE.Mesh(new THREE.CylinderGeometry(.18,.4,22,12,1,true),new THREE.MeshBasicMaterial({color:0xffd36b,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));
    bm.position.y=10;bm.userData.noAO=1;bm.renderOrder=4;tr.g.add(bm);tr.beam=bm;tr.g.children[0].scale.set(4.6,4.6,1);}};}
{const _ct=collectTreasure;collectTreasure=function(tr,pos){if(tr.k!=="zvpr")return _ct.apply(this,arguments);
  const sp=S.spawns.find(x=>x.id===tr.id);S.spawns=S.spawns.filter(x=>x.id!==tr.id);tr.leaving=true;tr.lt=0;
  const coins=40;S.coins+=coins;S.tickets=Math.min(12,(S.tickets||0)+1);S.storyStars=(S.storyStars||0)+1;save();
  burst(tr.g.position.x,tr.g.position.y,tr.g.position.z,60,[[1,.9,.35],[1,1,.8],[1,.7,.3]],3,3,1);mgRing(tr.g.position.x,tr.g.position.y,tr.g.position.z,0xffd23d);
  [784,988,1175,1568,1976].forEach((f,i)=>tone(f,.25,"triangle",.045,i*.07));flyCoins(coins,pos);
  showFind(icv(STAR_IT.sh,STAR_IT.c),"Zvijezda priče",RAR[4],"+"+coins+" zlatnika · +1 karta");if(typeof renderEco==="function")renderEco();renderHUD();
  const bk=sp&&S.books.find(b=>b.id===sp.story);setTimeout(()=>say(rida,bk?"Ova zvijezda čuva sjećanje na knjigu „"+bk.title+"“. Svaka pročitana knjiga ostavi jednu na otoku!":"Zvijezda priče! Svaka pročitana knjiga ostavi jednu na otoku.",6000),900);questCheck();};}

/* a spot for the star: open grass, far enough from the new building to make a small trip */
function storySpot(plot){let best=null;for(let n=0;n<40;n++){const p=findSpot(n<30?"grass":"sand");if(!p)continue;const d=Math.hypot(p[0]-plot.x,p[2]-plot.z);if(d>=22&&d<=70)return p;if(!best||Math.abs(d-40)<Math.abs(Math.hypot(best[0]-plot.x,best[2]-plot.z)-40))best=p;}return best;}

/* ---------- the film ---------- */
let CINE=null;
function bookMoment(b,done){const plot=PLOTS[b.plot];const C=new THREE.Vector3(plot.x+.5,plot.h+5,plot.z+.5);
  const el=cineDom();$("cineK").textContent="Knjiga pročitana";$("cineT").textContent=b.title;$("cineS").textContent="postala je "+bldName(b).toLowerCase()+" na tvom otoku";
  el.className="";void el.offsetWidth;el.className="on";const cc=el.querySelector(".cine-card");cc.style.opacity="0";document.body.classList.add("cine");
  flight=null;controls.autoRotate=false;G2.cam=true;const off=camera.position.clone().sub(C);const a0=Math.atan2(off.z,off.x);
  /* the light pillar and the ring that sweeps across the ground */
  const pil=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.7,60,24,1,true),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
    uniforms:{uA:{value:0},uTime},vertexShader:"varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"uniform float uA,uTime;varying vec2 vU;void main(){float s=.6+.4*sin(vU.x*37.+uTime*3.)*sin(vU.x*11.-uTime*2.);float f=pow(1.-vU.y,1.6)*smoothstep(0.,.08,vU.y);gl_FragColor=vec4(vec3(1.,.86,.48)*f*s*uA,1.);}"}));
  pil.position.set(C.x,plot.h+30,C.z);pil.userData.noAO=1;pil.renderOrder=5;scene.add(pil);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.9,1,64).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:0xffe08a,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));
  ring.position.set(C.x,plot.h+.25,C.z);ring.userData.noAO=1;scene.add(ring);
  const starG=new THREE.Group();{const gl=new THREE.Sprite(glowMatT);gl.scale.set(4,4,1);starG.add(gl);const sp=new THREE.Sprite(tMat("zvpr"));sp.scale.set(1.8,1.8,1);starG.add(sp);}starG.visible=false;scene.add(starG);
  const spot=storySpot(plot);const from=new THREE.Vector3(C.x,plot.h+15,C.z);const to=spot?new THREE.Vector3(spot[0],spot[1]+1.15,spot[2]):null;
  CINE={t:0,T:8.2,C,a0,r0:Math.max(18,Math.min(30,Math.hypot(off.x,off.z))),plot,b,pil,ring,starG,from,to,landed:false,said:false,done,look:C.clone()};
  playBookTheme();if(rida){ridaGo(plot);}
  el.onclick=()=>{if(CINE&&CINE.t>.6)CINE.t=Math.max(CINE.t,CINE.T);};}
function cineLand(){const c=CINE;if(c.landed)return;c.landed=true;c.starG.visible=false;if(!c.to)return;
  burst(c.to.x,c.to.y,c.to.z,50,[[1,.9,.35],[1,1,.8]],2.6,2.6,.9);tone(1568,.3,"triangle",.03);tone(2093,.4,"sine",.02,.08);
  S.spawns=S.spawns||[];S.spawns.push({id:"s"+Date.now().toString(36),k:"zvpr",x:c.to.x,y:c.to.y-1.15,z:c.to.z,story:c.b.id});save();syncTreasures();S.storyHint=1;}
function cineTick(){const c=CINE;if(!c)return;const now=performance.now();const dt=Math.min(.25,(now-(c.last||now))/1000);c.last=now;c.t+=dt;const t=c.t,k=Math.min(1,t/c.T),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
  /* camera: a slow rising circle that settles close */
  const a=c.a0+e*1.55,r=c.r0*(1-e*.32)+4,h=c.C.y+13-e*6;let cx=c.C.x+Math.cos(a)*r,cz=c.C.z+Math.sin(a)*r;let cy=h;
  const gx=Math.floor(cx),gz=Math.floor(cz);if(gx>=0&&gz>=0&&gx<W&&gz<W){const gy=Math.max(WATER,floorY(cx,H-1,cz))+3;if(cy<gy)cy=gy;}
  camera.position.set(cx,cy,cz);
  /* while the star flies, the camera glances after it */
  const fl=c.to?Math.max(0,Math.min(1,(t-4.4)/2.3)):0;const tgt=c.C.clone().setY(c.C.y+1.5+e*1.5);
  if(c.to&&t>4.4&&!c.landed){const p=new THREE.Vector3().lerpVectors(c.from,c.to,fl);p.y+=Math.sin(fl*Math.PI)*22;c.starG.visible=true;c.starG.position.copy(p);c.starG.children[1].material.rotation+=dt*5;
    if(Math.random()<dt*60)burst(p.x,p.y,p.z,2,[[1,.9,.4],[1,1,.8]],.5,.5,.8,0);tgt.lerp(p,.38*Math.sin(fl*Math.PI));if(fl>=1)cineLand();}
  c.look.lerp(tgt,Math.min(1,dt*3));camera.lookAt(c.look);
  /* the pillar swells then fades; the ring sweeps out */
  const pa=t<1.2?t/1.2:t<5?1:Math.max(0,1-(t-5)/2);c.pil.material.uniforms.uA.value=pa*.5;c.pil.scale.set(.6+pa*.5,1,.6+pa*.5);
  const rk=Math.max(0,Math.min(1,(t-1)/2.6));c.ring.scale.setScalar(1+rk*34);c.ring.material.opacity=rk>0?(1-rk)*.8:0;
  if(t>1&&t<5&&Math.random()<dt*30)burst(c.C.x+(Math.random()-.5)*5,c.plot.h+1+Math.random()*3,c.C.z+(Math.random()-.5)*5,1,[[1,.9,.5],[1,1,1]],.4,2.4,1.4,-.4);
  if(t>2.2&&!c.said){c.said=true;if(rida){rida.celebrate=3;say(rida,["Gotovo! Pogledaj što je izraslo!","Bravo! Cijela knjiga!","Jupiii! Otok je opet veći!"][Math.floor(Math.random()*3)],4000);}}
  /* the title card follows the film clock, so it stays in step on slow devices too */
  const ca=t<1.1?0:t<1.8?(t-1.1)/.7:t<6.6?1:Math.max(0,1-(t-6.6)/.8);if(!c.card)c.card=document.querySelector("#cine .cine-card");c.card.style.opacity=ca.toFixed(3);c.card.style.transform="translate(-50%,"+((1-Math.min(1,ca*1.4))*14).toFixed(1)+"px)";
  if(t>=c.T)cineEnd();}
function cineEnd(){const c=CINE;if(!c)return;if(c.to&&!c.landed)cineLand();CINE=null;scene.remove(c.pil);scene.remove(c.ring);scene.remove(c.starG);c.pil.geometry.dispose();c.ring.geometry.dispose();
  const el=$("cine");el.className="off";document.body.classList.remove("cine");setTimeout(()=>{if(!CINE)el.className="";},700);
  controls.target.copy(c.look);G2.cam=false;idleT=0;if(c.done)c.done();}
{const _fb=finishBook;finishBook=function(b){if(FP.on||WORLD||!PLOTS[b.plot]||CINE)return _fb.apply(this,arguments);
  bookMoment(b,()=>{const f=sfx.fanfare;sfx.fanfare=()=>{};try{_fb(b);}finally{sfx.fanfare=f;}});};}
/* once the book sheet is closed, point the child to the star */
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){if(CINE)cineTick();_ta.apply(this,arguments);
  if(S.storyHint&&!CINE&&$("veil").hidden&&(!window.MGQ||!MGQ.length||FP.on)){S.storyHint=0;save();setTimeout(()=>{toast("Zvijezda priče je pala negdje na otok! Pritisni Istraži i pronađi je.",6000);if(rida)say(rida,"Vidiš li zlatnu zraku? Tamo je pala Zvijezda priče. Idemo je pronaći!",6000);},500);}};}
