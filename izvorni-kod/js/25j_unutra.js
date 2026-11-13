/* =================== v17: UNUTRA: every book building has its own interior ===================
   Until v16 all 18 book designs (6 genres x 3 looks) shared one reading room in a different colour. Now each design
   gets a small world of its own that follows the outside: the lighthouse has stairs up to the lamp, the ship a hold
   with hammocks, the rocket three decks, the mill a turning millstone, and so on. Every room has a resident to talk
   to, the building's daily activity at a fitting spot, the book stand, things that move, and one hidden treasure a
   day (S.unut[bookId]=day, optional). Rooms are built from real blocks in the sky like the town rooms (24zi_sobe.js),
   only while you are inside, and never saved. Builders live in UNB["genre/n"] (25k_sobe_a.js, 25l_sobe_b.js). */
const UN={anim:[],gem:null,tt:0};
const UNB={};
const UNR=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
function unKey(b){return b.genre+"/"+(b.bld||0);}
function unKit(b){
  const X0=IN.X0,Y0=IN.Y0,Z0=IN.Z0,grp=IN.grp,K={b,X0,Y0,Z0,grp};
  const tv=(t,i,j,k)=>typeof t==="function"?t(i,j,k):t;
  K.V=(i,j,k,t)=>{if(i<-8||k<-8||j<-3||Y0+j>=H)return;const id=I(X0+i,Y0+j,Z0+k);vox[id]=t||0;prot[id]=t?1:0;IN.cells.push(id);};
  K.G=(i,j,k)=>vox[I(X0+i,Y0+j,Z0+k)];
  K.fill=(i0,i1,j0,j1,k0,k1,t)=>{for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++)for(let k=k0;k<=k1;k++)K.V(i,j,k,tv(t,i,j,k));};
  /* rectangular hall: floor at j=0, ceiling at j=h, walls between (trim on the first row) */
  K.box=(w,d,h,fl,wa,ce,tr)=>{for(let i=0;i<w;i++)for(let k=0;k<d;k++){K.V(i,0,k,tv(fl,i,0,k));K.V(i,h,k,tv(ce,i,h,k));
      const edge=i===0||i===w-1||k===0||k===d-1;for(let j=1;j<h;j++)K.V(i,j,k,edge?tv(j===1&&tr?tr:wa,i,j,k):0);}};
  /* round hall around cell (cx,cz) */
  K.round=(cx,cz,r,h,fl,wa,ce,tr)=>{const R=Math.ceil(r)+1;for(let i=cx-R;i<=cx+R;i++)for(let k=cz-R;k<=cz+R;k++){const d=Math.hypot(i-cx,k-cz);if(d>=r+.5)continue;
      K.V(i,0,k,tv(fl,i,0,k));K.V(i,h,k,tv(ce,i,h,k));const wall=d>=r-.5;for(let j=1;j<h;j++)K.V(i,j,k,wall?tv(j===1&&tr?tr:wa,i,j,k):0);}};
  K.dist=(i,k,cx,cz)=>Math.hypot(i-cx,k-cz);
  /* spiral stairs round a post; the two cells over every step are cleared so the head never bumps */
  K.spiral=(cx,cz,j0,j1,t,post,o)=>{o=o||0;for(let j=j0;j<=j1;j++)K.V(cx,j,cz,post);for(let s=1;j0+s-1<=j1;s++){const [a,c]=UNR[(s+o)%8],j=j0+s-1;K.V(cx+a,j,cz+c,t);K.V(cx+a,j+1,cz+c,0);K.V(cx+a,j+2,cz+c,0);}};
  /* straight stairs: n steps from (i,k) going (di,dk), w wide across */
  K.stairs=(i,k,di,dk,j0,n,t,w)=>{w=w||1;for(let s=0;s<n;s++)for(let q=0;q<w;q++){const x=i+di*s+(dk?q:0),z=k+dk*s+(di?q:0),j=j0+s;K.V(x,j,z,t);K.V(x,j+1,z,0);K.V(x,j+2,z,0);}};
  /* stairs along a circle of radius rad, from angle a0 in steps of da */
  K.arc=(cx,cz,rad,a0,da,j0,n,t)=>{let last="";for(let s=0;s<n;s++){const a=a0+da*s,x=Math.round(cx+Math.cos(a)*rad),z=Math.round(cz+Math.sin(a)*rad),j=j0+s;K.V(x,j,z,t);K.V(x,j+1,z,0);K.V(x,j+2,z,0);last=x+","+z;}return last;};
  const mat=(col,o)=>new THREE.MeshLambertMaterial(Object.assign({color:new THREE.Color(col).multiplyScalar(.32),emissive:new THREE.Color(col).multiplyScalar(.05)},o||{}));
  const glow=(col,op)=>new THREE.MeshBasicMaterial(Object.assign({color:new THREE.Color(col).multiplyScalar(.9)},op!=null?{transparent:true,opacity:op,depthWrite:false}:{}));
  const mOf=(col,o)=>o&&o.map?new THREE.MeshBasicMaterial({map:o.map,transparent:!!o.tr,side:o.ds?THREE.DoubleSide:THREE.FrontSide}):o&&o.glow?glow(col,o.op):mat(col,o&&o.m);
  K.mat=mat;K.glowM=glow;
  K.add=(geo,m,x,y,z,o,par)=>{const ms=new THREE.Mesh(geo,m);if(par)ms.position.set(x,y,z);else ms.position.set(X0+x,Y0+1+y,Z0+z);
    if(o){if(o.ry)ms.rotation.y=o.ry;if(o.rx)ms.rotation.x=o.rx;if(o.rz)ms.rotation.z=o.rz;}(par||grp).add(ms);return ms;};
  /* y is the height above the floor surface of the ground floor (an upper floor block at j=f has its surface at y=f) */
  K.P=(w,h,d,col,x,y,z,o)=>K.add(new THREE.BoxGeometry(w,h,d),mOf(col,o),x,y+h/2,z,o,o&&o.par);
  K.C=(r,h,col,x,y,z,o)=>K.add(new THREE.CylinderGeometry(o&&o.rt!=null?o.rt:r,r,h,o&&o.seg||16),mOf(col,o),x,y+(o&&o.mid?0:h/2),z,o,o&&o.par);
  K.S=(r,col,x,y,z,o)=>K.add(new THREE.SphereGeometry(r,14,10),mOf(col,o),x,y,z,o,o&&o.par);
  K.cone=(r,h,col,x,y,z,o)=>K.add(new THREE.ConeGeometry(r,h,o&&o.seg||16),mOf(col,o),x,y+h/2,z,o,o&&o.par);
  K.tor=(r,t,col,x,y,z,o)=>K.add(new THREE.TorusGeometry(r,t,8,24),mOf(col,o),x,y,z,o,o&&o.par);
  K.grp=(x,y,z)=>{const g=new THREE.Group();g.position.set(X0+x,Y0+1+y,Z0+z);grp.add(g);return g;};
  K.tex=inTx;
  K.pt=(col,int,dist,x,y,z)=>{const l=new THREE.PointLight(col,int,dist);l.position.set(X0+x,Y0+1+y,Z0+z);grp.add(l);return l;};
  K.anim=f=>UN.anim.push(f);
  K.hot=(x,z,r,n,act,y)=>{const h={x:X0+x,z:Z0+z,r,n,act,y:y==null?null:Y0+1+y};IN.hot.push(h);return h;};
  K.at=(x,y,z)=>new THREE.Vector3(X0+x,Y0+1+y,Z0+z);
  K.remesh=()=>{lightBox(X0-8,X0+26,Z0-8,Z0+24);for(let cx=Math.floor((X0-8)/CS);cx<=Math.floor((X0+26)/CS);cx++)for(let cz=Math.floor((Z0-8)/CS);cz<=Math.floor((Z0+26)/CS);cz++)if(cx>=0&&cz>=0)dirtyChunks.add(cx+","+cz);};
  /* small furniture */
  K.table=(x,z,y,w,d,col,leg)=>{K.P(w,.1,d,col||0x9a6a3c,x,y+.68,z);for(const [a,c] of [[-1,-1],[1,-1],[-1,1],[1,1]])K.P(.09,.68,.09,leg||0x7a5230,x+a*(w/2-.1),y,z+c*(d/2-.1));};
  K.chair=(x,z,y,ry,col)=>{const g=K.grp(x,y,z);g.rotation.y=ry||0;K.P(.46,.08,.46,col||0x9a6a3c,0,.42,0,{par:g});K.P(.46,.5,.07,col||0x9a6a3c,0,.5,-.2,{par:g});for(const [a,c] of [[-.19,-.19],[.19,-.19],[-.19,.19],[.19,.19]])K.P(.06,.42,.06,0x7a5230,a,0,c,{par:g});return g;};
  K.bed=(x,z,y,ry,col)=>{const g=K.grp(x,y,z);g.rotation.y=ry||0;K.P(1,.36,1.9,0x9a6a3c,0,0,0,{par:g});K.P(.94,.16,1.84,0xfff8e6,0,.36,0,{par:g});K.P(.96,.12,1.2,col||0x4a7fd6,0,.5,.32,{par:g});K.P(.6,.14,.36,0xffffff,0,.52,-.68,{par:g});K.P(1,.7,.1,0x7a5230,0,0,-.95,{par:g});return g;};
  K.sofa=(x,z,y,ry,col,w)=>{w=w||2;const g=K.grp(x,y,z);g.rotation.y=ry||0;K.P(w,.42,.86,col,0,0,0,{par:g});K.P(w,.6,.22,col,0,.3,-.34,{par:g});for(const s of [-1,1])K.P(.2,.56,.86,col,s*(w/2-.1),.1,0,{par:g});for(let n=0;n<Math.round(w);n++)K.P(w/Math.round(w)-.08,.12,.6,new THREE.Color(col).offsetHSL(0,0,.08).getHex(),-w/2+(n+.5)*w/Math.round(w),.42,.06,{par:g});return g;};
  K.barrel=(x,z,y,s)=>{s=s||1;K.C(.36*s,.86*s,0x8a5a30,x,y,z,{rt:.32*s});for(const h of [.14,.7])K.C(.375*s,.06*s,0x4a3a2e,x,y+h*s,z);};
  K.crate=(x,z,y,s,ry)=>{s=s||.8;K.P(s,s,s,0xb8864a,x,y,z,{ry});K.P(s+.02,.08,s+.02,0x7a5230,x,y+s*.46,z,{ry});};
  K.pot=(x,z,y,col,s)=>{s=s||1;K.C(.2*s,.3*s,0xb5653a,x,y,z,{rt:.26*s});K.S(.26*s,col,x,y+.52*s,z);K.C(.04*s,.22*s,0x4f9a4a,x,y+.28*s,z);};
  K.books=(x,y,z,n,ry,cols)=>{cols=cols||[0xe04a3a,0x4a7fd6,0x3fa86a,0xf2b22e,0xc08bff];for(let q=0;q<n;q++){const h=.34+((q*37)%10)/40;K.P(.09,h,.26,cols[q%cols.length],x+(ry?0:(q-n/2)*.11),y,z+(ry?(q-n/2)*.11:0),{ry:ry||0});}};
  K.candle=(x,y,z)=>{K.C(.05,.22,0xfff3d6,x,y,z);K.flame(x,y+.22,z,.5);};
  K.flame=(x,y,z,s)=>{s=s||1;const f=K.cone(.09*s,.26*s,0xffb03a,x,y,z,{glow:1,op:.9}),f2=K.cone(.05*s,.16*s,0xfff3b0,x,y,z,{glow:1});const p=Math.random()*9;K.anim((dt,t)=>{const q=1+Math.sin(t*13+p)*.12+Math.sin(t*7.3+p)*.08;f.scale.set(1,q,1);f2.scale.set(1,q*1.1,1);});return f;};
  K.fire=(x,y,z,s)=>{s=s||1;for(const [a,c,q] of [[0,0,1.4],[-.18,.08,1],[.2,-.05,1.1],[.05,.16,.8]])K.flame(x+a*s,y,z+c*s,q*s*2.2);for(let n=0;n<3;n++)K.P(.6*s,.1*s,.12*s,0x5a3a22,x,y,z,{ry:n*1.05});
    const l=K.pt(0xffa040,.55,9,x,y+.6,z);K.anim((dt,t)=>{l.intensity=.45+Math.sin(t*9)*.06+Math.sin(t*23)*.05;});return l;};
  K.lantern=(x,y,z,swing)=>{const g=K.grp(x,y,z);K.P(.03,.5,.03,0x2c2c2c,0,-.5,0,{par:g});K.P(.26,.32,.26,0x2c2c2c,0,-.86,0,{par:g});K.P(.2,.24,.2,0xffc860,0,-.82,0,{par:g,glow:1});
    if(swing){const p=Math.random()*9;K.anim((dt,t)=>{g.rotation.z=Math.sin(t*1.3+p)*swing;g.rotation.x=Math.sin(t*.9+p)*swing*.6;});}return g;};
  K.gear=(x,y,z,r,axis,speed,col)=>{const g=K.grp(x,y,z);const th=.16,teeth=Math.max(8,Math.round(r*10));const disc=K.C(r,th,col||0xc9a23a,0,-th/2,0,{par:g,seg:24});K.C(r*.3,th+.04,0x5a4a3a,0,-th/2-.02,0,{par:g});
    for(let n=0;n<teeth;n++){const a=n/teeth*Math.PI*2;K.P(.12,th,.14,col||0xc9a23a,Math.cos(a)*(r+.05),-th/2,Math.sin(a)*(r+.05),{par:g,ry:-a});}
    for(let n=0;n<4;n++){const a=n/4*Math.PI*2;K.P(r*1.5,th*.6,.08,0x8a6a2a,0,-th*.3,0,{par:g,ry:a});}
    if(axis==="x")g.rotation.z=Math.PI/2;else if(axis==="z")g.rotation.x=Math.PI/2;const inner=new THREE.Group();while(g.children.length)inner.add(g.children[0]);g.add(inner);
    K.anim((dt)=>{inner.rotation.y+=dt*speed;});return g;};
  K.flies=(n,cx,cz,r,y0,y1,col)=>{const L=[];for(let q=0;q<n;q++){const m=K.S(.045,col||0xd8ff7a,cx,y0,cz,{glow:1});L.push({m,a:Math.random()*7,b:Math.random()*7,r:.4+Math.random()*r,s:.2+Math.random()*.4});}
    K.anim((dt,t)=>{for(const f of L){f.m.position.set(X0+cx+Math.cos(t*f.s+f.a)*f.r,Y0+1+y0+(y1-y0)*(.5+.5*Math.sin(t*f.s*1.7+f.b)),Z0+cz+Math.sin(t*f.s*1.3+f.a)*f.r);f.m.material.opacity=.5+.5*Math.sin(t*3+f.b);f.m.material.transparent=true;}});};
  K.sign=(w,h,x,y,z,ry,draw,o)=>K.P(w,h,.06,0xffffff,x,y,z,Object.assign({ry,map:K.tex(Math.round(w*64),Math.round(h*64),draw)},o||{}));
  /* resident: an animal you can talk to; lines cycle, the first visit of the day is a greeting */
  K.res=(kind,name,x,z,y,lines,ry)=>{if(!MODELS[kind])kind="rida";const g=MODELS[kind]();g.position.set(X0+x,Y0+1+(y||0),Z0+z);g.rotation.y=ry||0;grp.add(g);
    const e={name,g,x:X0+x,y:Y0+1+(y||0),z:Z0+z,kind,hop:0,i:0,face:true};IN.host=e;
    K.hot(x,z,1.7,"Razgovaraj: "+name,()=>{e.hop=1;sfx.pop();say(e,lines[e.i%lines.length],6500);e.i++;},y||0);return e;};
  /* extra animals that only say a short sound and hop */
  K.pet=(kind,name,x,z,y,line,ry)=>{if(!MODELS[kind])return null;const g=MODELS[kind]();g.position.set(X0+x,Y0+1+(y||0),Z0+z);g.rotation.y=ry||0;grp.add(g);
    const e={name,g,x:X0+x,y:Y0+1+(y||0),z:Z0+z,hop:0,base:Y0+1+(y||0)};const p=Math.random()*9;
    K.anim((dt,t)=>{e.hop=Math.max(0,e.hop-dt*2.2);g.position.y=e.base+Math.sin(Math.min(1,e.hop)*Math.PI)*.35;g.rotation.y=(ry||0)+Math.sin(t*.5+p)*.35;});
    K.hot(x,z,1.3,"Pomiluj: "+name,()=>{e.hop=1;sfx.pop();say(e,line,3500);},y||0);return e;};
  K.read=(x,z,y,ry)=>{const g=K.grp(x,y||0,z);g.rotation.y=ry||0;K.P(.42,.86,.42,0x7a5230,0,0,0,{par:g});K.P(.74,.1,.56,0x9a6a3c,0,.86,0,{par:g,rx:-.25});K.P(.6,.05,.42,0xfff8e6,0,.95,0,{par:g,rx:-.25});
    K.hot(x,z,1.35,"Knjiga zgrade",()=>sheetBuilding(b),y||0);};
  /* the genre's daily activity at its fitting place */
  K.act=(x,z,y,label,r)=>{const A=BACT[b.genre];K.hot(x,z,r||1.5,(label||A[0])+(b.done?(bldUsed(b)?" · sutra opet":""):" · nakon knjige"),()=>{if(b.done&&!bldUsed(b))BGAME[b.genre](b);else sheetBuilding(b);},y||0);};
  /* the way out: a door on the wall cell (i,k), the room opening toward -z */
  K.door=(i,k,col)=>{K.P(.92,1.96,.1,col||0x7a5230,i+.5,0,k-.04);K.P(1.12,.12,.14,0x5a3a22,i+.5,1.96,k-.04);K.S(.06,0xf2b22e,i+.82,.95,k-.12);
    for(let q=0;q<3;q++)K.P(.84,.05,.11,0x5a3a22,i+.5,.35+q*.6,k-.05);IN.sp=[i+.5,1.05,k-1.7];K.hot(i+.5,k-.75,1.05,"Izađi van",()=>inLeave(),0);};
  /* one hidden treasure a day; spots: [[x,y,z],...]; opt.when()=false hides it until a puzzle is solved */
  K.gems=(spots,opt)=>{S.unut=S.unut||{};if(S.unut[b.id]===today())return;opt=opt||{};let hsh=0;for(const ch of today()+b.id)hsh=(hsh*31+ch.charCodeAt(0))>>>0;const s=opt.fix||spots[hsh%spots.length];
    const m=K.add(new THREE.OctahedronGeometry(.2),glow(0xffd24a),s[0],s[1]+.45,s[2]);const halo=K.S(.34,0xfff0a0,s[0],s[1]+.45,s[2],{glow:1,op:.25});UN.gem={m,halo,p:K.at(s[0],s[1]+.45,s[2]),when:opt.when||null};m.visible=halo.visible=!opt.when;};
  K.say=(e,t,ms)=>{if(e){e.hop=1;say(e,t,ms||5000);}};
  return K;}
/* the treasure: a slow spinning star; walking into it pays */
function unGem(dt,t){const G=UN.gem;if(!G||!IN.b)return;const on=!G.when||G.when();G.m.visible=G.halo.visible=on;if(!on)return;
  G.m.rotation.y+=dt*2;G.m.position.y=G.p.y+Math.sin(t*2.4)*.08;G.halo.scale.setScalar(1+Math.sin(t*3)*.12);
  if(Math.hypot(FP.p.x-G.p.x,FP.p.z-G.p.z)<.9&&Math.abs(FP.p.y+.5-G.p.y)<1.1){const b=IN.b;S.unut=S.unut||{};S.unut[b.id]=today();const c=12+Math.floor(Math.random()*7);S.coins+=c;save();renderEco();sfx.chime();
    burst(G.p.x,G.p.y,G.p.z,40,[[1,.85,.3],[1,1,1]],3,2.5,1);toast("Skriveno blago sobe! +"+c+" zlatnika. Sutra je skriveno na drugom mjestu.",3600);G.m.visible=G.halo.visible=false;UN.gem=null;}}
/* ---------- engine: themed rooms, spawn and bigger bounds ---------- */
{const _ib=inBuild;inBuild=function(b){UN.anim=[];UN.gem=null;IN.sp=null;IN.intro=null;IN.secret=0;const gk=GRD[b.bld]?b.bld:null,fn=!gk&&UNB[unKey(b)];
  if(!fn){_ib.apply(this,arguments);return;}
  IN.cells=[];IN.hot=[];IN.host=null;const grp=new THREE.Group();IN.grp=grp;scene.add(grp);const K=unKit(b);
  try{const r=fn(K,b)||{};IN.intro=r.intro||null;}catch(e){console.error("unutra",e);}
  K.remesh();};}
inClear=function(){for(const id of IN.cells){vox[id]=0;prot[id]=0;}IN.cells=[];if(IN.grp){scene.remove(IN.grp);IN.grp.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose();}});IN.grp=null;}
  const X0=IN.X0,Z0=IN.Z0;lightBox(X0-8,X0+26,Z0-8,Z0+24);for(let cx=Math.floor((X0-8)/CS);cx<=Math.floor((X0+26)/CS);cx++)for(let cz=Math.floor((Z0-8)/CS);cz<=Math.floor((Z0+26)/CS);cz++)if(cx>=0&&cz>=0)dirtyChunks.add(cx+","+cz);
  IN.hot=[];IN.host=null;UN.anim=[];UN.gem=null;};
inEnter=function(b){if(IN.on||IN.busy||!FP.on)return;if(FP.mount){toast("Prvo siđi, pa uđi na vrata.");return;}IN.busy=true;sfx.click();
  inVeil(()=>{IN.back={x:FP.p.x,y:FP.p.y,z:FP.p.z,yaw:FP.cam.yaw};IN.b=b;inBuild(b);IN.on=true;IN.busy=false;const sp=IN.sp||[6.5,1.05,8.4];
    FP.p.set(IN.X0+sp[0],IN.Y0+sp[1],IN.Z0+sp[2]);FP.v.set(0,0,0);FP.safe.copy(FP.p);FP.cam.yaw=0;FP.yaw=Math.PI;FP.cam.cur=2.5;FP.camT.set(FP.p.x,FP.p.y+1.05,FP.p.z);
    $("bldGo").hidden=true;IN.near=null;const gk=GRD[b.bld]?b.bld:null;
    setTimeout(()=>toast(gk?GRD[gk].n+". "+INH[gk][1]+" te čeka!":IN.intro?bldName(b)+". "+IN.intro:bldName(b)+": čitaonica knjige „"+b.title+"”.",4200),500);});};
inTick=function(dt,tt){if(!IN.on)return;UN.tt=tt;
  if(IN.host){const e=IN.host,g=e.g;e.hop=Math.max(0,(e.hop||0)-dt*2.2);g.position.y=e.y+Math.abs(Math.sin(tt*2))*.03+Math.sin(Math.min(1,e.hop)*Math.PI)*.35;
    const a=Math.atan2(FP.p.x-e.x,FP.p.z-e.z);let d=a-g.rotation.y;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;g.rotation.y+=d*Math.min(1,dt*4);}
  for(const f of UN.anim){try{f(dt,tt);}catch(e){}}unGem(dt,tt);
  if(FP.p.y<IN.Y0-3){const sp=IN.sp||[6.5,1.05,8.4];FP.p.set(IN.X0+sp[0],IN.Y0+sp[1],IN.Z0+sp[2]);FP.v.set(0,0,0);}
  let best=null,bd=9;for(const h of IN.hot){if(h.y!=null&&Math.abs(FP.p.y-h.y)>1.5)continue;const d=Math.hypot(FP.p.x-h.x,FP.p.z-h.z);if(d<h.r&&d<bd){bd=d;best=h;}}const el=$("bldGo"),open=$("veil").hidden;
  if(best!==IN.near||el.hidden!==!(best&&open)||(best&&el.textContent!==jzT(best.n))){IN.near=best;el.hidden=!(best&&open);if(best)el.textContent=best.n;}};
