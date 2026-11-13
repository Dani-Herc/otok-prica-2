/* =================== THREE BASICS =================== */
const LC=h=>new THREE.Color(h).convertSRGBToLinear();
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:$("gl"),antialias:false,powerPreference:"high-performance"});}catch(e){$("loading").textContent="Ovaj preglednik ne može prikazati 3D grafiku.";return;}
const small=Math.min(innerWidth,innerHeight)<700;
renderer.setPixelRatio(Math.min(devicePixelRatio||1,small?1.6:2));
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(40,1,.5,1400);
const HOME={t:new THREE.Vector3(CX,SL+6,CZ),p:new THREE.Vector3(CX+72,SL+62,CZ+88)};
camera.position.set(CX+250,190,CZ+300);
function homeP(){const k=camera.aspect<1?1.3:1;return new THREE.Vector3(CX+60*k,SL+52*k,CZ+72*k);}
/* =================== CAMERA CONTROLLER ===================
   City-builder style: drag grabs the ground and slides it, right-drag / two-finger twist rotates,
   wheel and pinch zoom toward the point under the cursor, double-tap flies in. Everything is
   smoothed with frame-rate independent easing, and panning keeps a little inertia. */
const controls=(function(){
  const el=renderer.domElement,target=HOME.t.clone(),want=target.clone(),vel=new THREE.Vector3(),listeners=[];
  const st={yaw:.7,pitch:.6,dist:90,tyaw:.7,tpitch:.6,tdist:90};
  const api={target,want,st,enabled:true,autoRotate:false,minDistance:7,maxDistance:240,multi:false,hold:{},
    addEventListener(n,f){if(n==="start")listeners.push(f);},update,sync,zoomBy,rotateBy};
  const fire=()=>listeners.forEach(f=>f());
  function sync(){const o=camera.position.clone().sub(target);const d=o.length()||1;st.dist=st.tdist=d;st.pitch=st.tpitch=Math.asin(Math.max(-1,Math.min(1,o.y/d)));st.yaw=st.tyaw=Math.atan2(o.x,o.z);want.copy(target);vel.set(0,0,0);}
  const ray=new THREE.Raycaster(),v2=new THREE.Vector2(),plane=new THREE.Plane(new THREE.Vector3(0,1,0),0);
  function rayAt(x,y){const r=el.getBoundingClientRect();v2.set(((x-r.left)/r.width)*2-1,-((y-r.top)/r.height)*2+1);ray.setFromCamera(v2,camera);return ray.ray;}
  function planeHit(x,y,h){const rr=rayAt(x,y);plane.constant=-h;return rr.intersectPlane(plane,new THREE.Vector3());}
  function groundHit(x,y){rayAt(x,y);const h=ray.intersectObjects(chunkMeshes,false)[0];if(h&&h.distance<600)return h.point.clone();return planeHit(x,y,WATER);}
  function groundY(x,z){let s=0,n=0;for(const o of [[0,0],[2,0],[-2,0],[0,2],[0,-2]]){const X=Math.floor(x+o[0]),Z=Math.floor(z+o[1]);if(X<0||Z<0||X>=W||Z>=W){s+=WATER;n++;continue;}s+=Math.max(WATER,hmap[X+Z*W]);n++;}return s/n;}
  const pitchFor=d=>.42+.62*Math.min(1,Math.max(0,(d-7)/95));
  function zoomBy(f,x,y){const nd=Math.max(api.minDistance,Math.min(api.maxDistance,st.tdist*f));const eff=nd/st.tdist;
    if(x!=null){const h=groundHit(x,y);if(h){const k=1-eff;want.x+=(h.x-want.x)*k;want.z+=(h.z-want.z)*k;}}
    st.tdist=nd;st.tpitch+=(pitchFor(nd)-st.tpitch)*.18;}
  function rotateBy(a){st.tyaw+=a;}
  function translate(d){target.add(d);want.add(d);camera.position.add(d);}
  let anchor=null,lastMove=0,lastTap={t:0,x:0,y:0},modeP=null,pinch=null;const P=new Map();
  function startPan(x,y){const g=groundHit(x,y);anchor=g?g:null;lastMove=performance.now();}
  function panTo(x,y){if(!anchor)return;const h=planeHit(x,y,anchor.y);if(!h)return;const d=anchor.clone().sub(h);d.y=0;if(d.length()>30)return;translate(d);
    const now=performance.now(),dt=Math.max(.008,(now-lastMove)/1000);lastMove=now;vel.lerp(d.multiplyScalar(1/dt).clampLength(0,140),.5);}
  function pinchState(){const a=[...P.values()];const dx=a[1].x-a[0].x,dy=a[1].y-a[0].y;return {d:Math.max(10,Math.hypot(dx,dy)),a:Math.atan2(dy,dx),m:{x:(a[0].x+a[1].x)/2,y:(a[0].y+a[1].y)/2}};}
  el.addEventListener("pointerdown",e=>{if(!api.enabled)return;if(e.isPrimary)P.clear();if(P.size===0)api.multi=false;try{el.setPointerCapture(e.pointerId);}catch(_){}
    P.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:performance.now()});fire();vel.set(0,0,0);
    if(P.size===1){modeP=(e.button===2||e.button===1||e.ctrlKey||e.altKey||e.shiftKey)?"rot":"pan";if(modeP==="pan")startPan(e.clientX,e.clientY);}
    else if(P.size===2){api.multi=true;modeP="pinch";pinch=pinchState();startPan(pinch.m.x,pinch.m.y);}});
  el.addEventListener("pointermove",e=>{const p=P.get(e.pointerId);if(!p||!api.enabled)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
    if(modeP==="rot"){st.tyaw-=dx*.0068;st.tpitch+=dy*.0048;}
    else if(modeP==="pan")panTo(e.clientX,e.clientY);
    else if(modeP==="pinch"&&P.size>=2){const s=pinchState();zoomBy(pinch.d/s.d,s.m.x,s.m.y);let da=s.a-pinch.a;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;st.tyaw+=da;st.yaw+=da;panTo(s.m.x,s.m.y);pinch=s;}});
  const end=e=>{const p=P.get(e.pointerId);if(!p)return;P.delete(e.pointerId);const now=performance.now();
    if(P.size===1){const q=[...P.values()][0];modeP="pan";startPan(q.x,q.y);vel.set(0,0,0);}
    else if(P.size===0){modeP=null;anchor=null;if(now-lastMove>80)vel.set(0,0,0);
      const tapLike=Math.hypot(e.clientX-p.sx,e.clientY-p.sy)<10&&now-p.t<350&&!api.multi&&e.button===0;
      if(tapLike&&mode==="look"){if(p.t-lastTap.t<350&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<36){const h=groundHit(e.clientX,e.clientY);if(h){fire();want.copy(h);st.tdist=Math.max(12,Math.min(st.tdist*.45,38));st.tpitch+=(pitchFor(st.tdist)-st.tpitch)*.6;}lastTap.t=0;}
        else lastTap={t:now,x:e.clientX,y:e.clientY};}}};
  el.addEventListener("pointerup",end);el.addEventListener("pointercancel",end);el.addEventListener("lostpointercapture",end);el.addEventListener("contextmenu",e=>e.preventDefault());
  el.addEventListener("wheel",e=>{if(!api.enabled)return;e.preventDefault();fire();let dy=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?400:1);if(e.ctrlKey)dy*=3;dy=Math.max(-240,Math.min(240,dy));zoomBy(Math.exp(dy*.0017),e.clientX,e.clientY);},{passive:false});
  const K={};addEventListener("keydown",e=>{if(e.target&&e.target.closest&&e.target.closest("input,textarea"))return;K[e.key.toLowerCase()]=true;});
  addEventListener("keyup",e=>{K[e.key.toLowerCase()]=false;});addEventListener("blur",()=>{for(const k in K)K[k]=false;api.hold={};});
  function update(dt){dt=Math.min(.1,dt||.016);
    if(flight||!api.enabled){camera.lookAt(target);sync();return;}
    const H=api.hold;
    if($("veil").hidden){let fx=0,fz=0;if(K.w||K.arrowup)fz-=1;if(K.s||K.arrowdown)fz+=1;if(K.a||K.arrowleft)fx-=1;if(K.d||K.arrowright)fx+=1;
      if(fx||fz){fire();const sp=Math.max(10,st.dist)*.95*dt,s=Math.sin(st.yaw),c=Math.cos(st.yaw);want.x+=(fx*c+fz*s)*sp;want.z+=(-fx*s+fz*c)*sp;}
      if(K.q||H.l){st.tyaw-=1.7*dt;}if(K.e||H.r){st.tyaw+=1.7*dt;}if(K["+"]||K["="]||H.i)zoomBy(Math.exp(-1.7*dt));if(K["-"]||K._||H.o)zoomBy(Math.exp(1.7*dt));
      if(K.q||K.e||H.l||H.r||H.i||H.o||K["+"]||K["-"]||K["="])fire();}
    if(!P.size&&vel.lengthSq()>.04){const d=vel.clone().multiplyScalar(dt);target.add(d);want.add(d);vel.multiplyScalar(Math.exp(-dt*4.5));}
    if(api.autoRotate)st.tyaw+=dt*.045;
    st.tdist=Math.max(api.minDistance,Math.min(api.maxDistance,st.tdist));st.tpitch=Math.max(.2,Math.min(1.38,st.tpitch));
    const R=102;for(const v of [want,target]){const dx=v.x-CX,dz=v.z-CZ,dd=Math.hypot(dx,dz);if(dd>R){v.x=CX+dx/dd*R;v.z=CZ+dz/dd*R;if(v===target)vel.set(0,0,0);}}
    want.y+=(groundY(want.x,want.z)-want.y)*Math.min(1,dt*2.5);
    const a=1-Math.exp(-dt*10);st.yaw+=(st.tyaw-st.yaw)*a;st.pitch+=(st.tpitch-st.pitch)*a;st.dist=Math.exp(Math.log(st.dist)+(Math.log(st.tdist)-Math.log(st.dist))*a);target.lerp(want,a);
    const cp=Math.cos(st.pitch);camera.position.set(target.x+Math.sin(st.yaw)*cp*st.dist,target.y+Math.sin(st.pitch)*st.dist,target.z+Math.cos(st.yaw)*cp*st.dist);
    const cx=Math.floor(camera.position.x),cz=Math.floor(camera.position.z);if(cx>=0&&cz>=0&&cx<W&&cz<W){const gy=topY(cx,cz)+2.2;if(camera.position.y<gy)camera.position.y=gy;}
    camera.lookAt(target);}
  return api;})();
let idleT=0,flight=null;controls.addEventListener("start",()=>{controls.autoRotate=false;idleT=0;flight=null;});
const uTime={value:0};

