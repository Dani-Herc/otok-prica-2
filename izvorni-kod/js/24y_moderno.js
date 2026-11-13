/* ===== v27: modern look. Drifting clouds and their shadows, softer light, sun rays, film colours, miniature blur in the
   island view, grass blades in the wind, pollen in the air, better water, dust under running paws.
   Nothing here touches the save (S): the only stored thing is the graphics choice in its own localStorage key. ===== */
const MD={gfx:"auto",t:0,grassOn:true};
try{const g=localStorage.getItem("otok-gfx");if(g==="auto"||g==="med"||g==="low")MD.gfx=g;}catch(e){}
const mdMax=()=>MD.gfx==="low"?0:MD.gfx==="med"?1:2;
const MD_NOISE="float mdH(vec2 p){p=fract(p*vec2(.1031,.1030));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}"+
  "float mdN(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mdH(i),mdH(i+vec2(1.,0.)),f.x),mix(mdH(i+vec2(0.,1.)),mdH(i+vec2(1.,1.)),f.x),f.y);}"+
  "float mdF(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*mdN(p);p=p*2.03+vec2(17.3,9.1);a*=.5;}return s;}\n";

/* ---------- sky: soft clouds that drift and catch the sun ---------- */
skyU.uT=uTime;skyU.uCloud={value:1};
sky.material.fragmentShader="uniform vec3 top;uniform vec3 hz;uniform vec3 sunDir;uniform vec3 sunC;uniform float night,uT,uCloud;varying vec3 vp;\n"+MD_NOISE+
  "void main(){float h=clamp(vp.y,0.,1.);vec3 c=mix(hz,top,pow(h,.5));c=mix(c,hz*1.04,exp(-h*9.)*.5);if(vp.y<0.)c=hz;float s=max(dot(vp,sunDir),0.);"+
  "c+=sunC*(pow(s,700.)*3.+pow(s,40.)*.4+pow(s,6.)*.16)*(1.-night*.7);"+
  "if(vp.y>.015&&uCloud>0.){vec2 p=vp.xz/(vp.y+.16)*1.25+vec2(uT*.006,uT*.0025);float d=mdF(p)+mdN(p*5.+uT*.01)*.07;float m=smoothstep(.5,.74,d);"+
  "float d2=mdF(p+sunDir.xz*.22);float lit=clamp(.62+(d-d2)*2.6,0.,1.);vec3 dark=mix(mix(hz,top,.55)*.82,vec3(.1,.13,.24),night*.75);"+
  "vec3 bright=mix(vec3(1.),sunC,.4)*(1.-night*.72)+sunC*pow(s,10.)*.5*(1.-night);vec3 cc=mix(dark,bright,lit*(.55+.45*smoothstep(.5,.9,d)));"+
  "m*=smoothstep(.015,.2,vp.y)*uCloud;c=mix(c,cc,m*.94);}gl_FragColor=vec4(c,1.);}";
sky.material.needsUpdate=true;

/* ---------- cloud shadows slide over the land ---------- */
const mdCS={value:new THREE.Vector4(0,0,0,.021)};/* xy: drift, z: strength, w: scale */
[matOpaque,matLeaf,matGlass,matGlow].forEach(m=>{const ob=m.onBeforeCompile,ck=m.customProgramCacheKey;
  m.onBeforeCompile=sh=>{ob(sh);sh.uniforms.uCS=mdCS;
    sh.fragmentShader="uniform vec4 uCS;\n"+MD_NOISE+sh.fragmentShader.replace("if(vWP.y<uWaterY){",
      "{float cs=1.-uCS.z*smoothstep(.5,.72,mdF(vWP.xz*uCS.w+uCS.xy));reflectedLight.directDiffuse*=cs;reflectedLight.directSpecular*=cs;}if(vWP.y<uWaterY){");};
  m.customProgramCacheKey=()=>ck()+"md27";m.needsUpdate=true;});

/* ---------- water: reflects the sky, glitters toward the sun ---------- */
waterU.uTop={value:new THREE.Color()};
waterMat.fragmentShader="uniform sampler2D uShore;uniform vec3 uShallow,uDeep,uSky,uTop,uSunC,uFogC,uSunDir;uniform float uTime,uFogD,uWorld,uNight,uUnder,uClear;varying vec3 vW;varying float vD;\n"+MD_NOISE+
  "void main(){if(!gl_FrontFacing){if(uUnder<.5)discard;vec2 q2=vW.xz*.7;float rp=sin(q2.x*1.3+uTime*1.4+sin(q2.y*1.1+uTime))*sin(q2.y*1.5-uTime*1.1+sin(q2.x*.9));"+
  "vec3 V2=normalize(cameraPosition-vW);float up=pow(max(-V2.y,0.),1.5);vec3 c2=mix(uShallow*1.25,vec3(.85,.97,1.),smoothstep(.2,.9,rp)*.5+up*.35);c2+=uSunC*pow(up,8.)*.6*(1.-uNight*.7);"+
  "float f2=1.-exp(-uFogD*uFogD*vD*vD);gl_FragColor=vec4(mix(c2,uFogC,f2),.92);return;}vec2 uv=vW.xz/uWorld;float d=texture2D(uShore,uv).r;if(uv.x<0.||uv.y<0.||uv.x>1.||uv.y>1.)d=1.;"+
  "vec2 q=vW.xz;float nf=1./(1.+vD*.012);"+
  "float n1=mdN(q*.55+vec2(uTime*.35,uTime*.2)),n2=mdN(q*1.3-vec2(uTime*.3,uTime*.42)),n3=mdN(q*3.1+vec2(-uTime*.6,uTime*.5));"+
  "vec3 N=normalize(vec3((n1-.5)*.34+(n2-.5)*.2+(n3-.5)*.1*nf+sin(q.x*1.1+uTime*1.6+sin(q.y*.6))*.05,1.,(n2-.5)*.34+(n1-.5)*.18+(n3-.5)*.1*nf+cos(q.y*1.3-uTime*1.2+sin(q.x*.5))*.05));"+
  "vec3 V=normalize(cameraPosition-vW);vec3 col=mix(uShallow,uDeep,smoothstep(.0,.5,d));col=mix(col,uShallow*1.12,(n1*n2)*.35*smoothstep(.5,.05,d));"+
  "vec3 Rv=reflect(-V,N);vec3 skyR=mix(uSky,uTop,pow(clamp(Rv.y,0.,1.),.45));float fr=.03+.97*pow(1.-max(dot(N,V),0.),5.);col=mix(col,skyR,clamp(fr,0.,1.)*.82);"+
  "vec3 R=reflect(-uSunDir,N);float rv=max(dot(R,V),0.);float spec=pow(rv,220.)*3.+pow(rv,26.)*.16;float gl=step(.985,mdH(floor(q*7.)+floor(uTime*3.)))*pow(rv,10.)*2.5;"+
  "float foam=smoothstep(.055,.0,d);float wob=sin(q.x*.8+uTime)*.5+sin(q.y*.7-uTime*.8)*.5;float bands=smoothstep(.72,1.,sin(d*70.-uTime*1.8+wob*1.5))*smoothstep(.22,.03,d);"+
  "col=mix(col,vec3(1.),clamp(foam*.9+bands*.75,0.,1.));col+=uSunC*(spec+gl)*(1.-uNight*.6);"+
  "float a=mix(.5,.94,smoothstep(0.,.32,d));a=max(a,foam);a=max(a,fr*.9);float f=1.-exp(-uFogD*uFogD*vD*vD);col=mix(col,uFogC,f);gl_FragColor=vec4(col,a*(1.-uClear*(1.-foam)));}";
waterMat.needsUpdate=true;

/* ---------- picture: sun rays, miniature blur in the island view, film colours ---------- */
Object.assign(grade.uniforms,{uSun:{value:new THREE.Vector3(.5,.5,0)},uSunC:{value:new THREE.Color(1,1,1)},uTilt:{value:0},uPx:{value:new THREE.Vector2(1/1280,1/800)},uT:uTime});
grade.material.fragmentShader="uniform sampler2D tDiffuse;uniform float uNight,uTilt,uT;uniform vec3 uSun,uSunC;uniform vec2 uPx;varying vec2 vUv;\n"+
  "float hh(vec2 p){p=fract(p*vec2(.1031,.1030));p+=dot(p,p.yx+33.33);return fract((p.x+p.y)*p.x);}\n"+
  "void main(){vec3 c=max(texture2D(tDiffuse,vUv).rgb,0.);"+
  "if(uTilt>0.){float b=uTilt*smoothstep(.2,.52,abs(vUv.y-.54));if(b>.02){vec3 s=c;float a0=hh(vUv*917.)*6.283;for(int i=0;i<10;i++){float fi=float(i);float an=a0+fi*2.39996;float r=sqrt((fi+.5)/10.)*b*7.;s+=texture2D(tDiffuse,vUv+vec2(cos(an),sin(an))*r*uPx).rgb;}c=s/11.;}}"+
  "if(uSun.z>0.){vec2 dv=(uSun.xy-vUv);float dl=length(dv*vec2(uPx.y/uPx.x,1.));float near=smoothstep(1.15,.0,dl);vec3 acc=vec3(0.);float w=1.;vec2 st=dv/22.;vec2 p=vUv+st*hh(vUv*613.+uT);"+
  "for(int i=0;i<20;i++){vec3 s=texture2D(tDiffuse,p).rgb;float l=dot(s,vec3(.299,.587,.114));acc+=s*smoothstep(.8,1.,l)*w;w*=.94;p+=st;}"+
  "c+=acc*uSunC*(uSun.z*near*.04);c+=uSunC*pow(near,3.5)*uSun.z*.03;}"+
  "float l=dot(c,vec3(.299,.587,.114));c=mix(vec3(l),c,1.14);float day=1.-uNight;"+
  "c*=mix(vec3(.94,.99,1.09),vec3(1.06,1.01,.93),smoothstep(.08,.75,l));c=mix(c,c*vec3(.92,.97,1.1),uNight*.35);"+
  "c=mix(c,c*c*(3.-2.*c),.2);vec2 d=vUv-.5;c*=1.-dot(d,d)*(.42+uNight*.3);c+=(hh(vUv*1531.+uT)-.5)/255.;gl_FragColor=vec4(c,1.);}";
grade.material.needsUpdate=true;
bloom.strength=.15;bloom.radius=.58;bloom.threshold=.87;/* the new bloom adds its blur levels in float, so it needs less strength for the same glow */

/* ---------- grass blades: tiles of little tufts around where you are ---------- */
const mdGU={uFocus:{value:new THREE.Vector3()},uR:{value:26},uPush:{value:new THREE.Vector4(0,-99,0,0)}};
const mdGrassGeo=(()=>{const P=[],C=[],N=[],blade=(ox,oz,a,h,w,lean)=>{const c=Math.cos(a),s=Math.sin(a);const lx=Math.cos(a+1.57)*lean,lz=Math.sin(a+1.57)*lean;
    const v=[[ox-c*w,0,oz-s*w,0],[ox+c*w,0,oz+s*w,0],[ox+lx*.45-c*w*.6,h*.55,oz+lz*.45-s*w*.6,.55],[ox+c*w,0,oz+s*w,0],[ox+lx*.45+c*w*.6,h*.55,oz+lz*.45+s*w*.6,.55],[ox+lx*.45-c*w*.6,h*.55,oz+lz*.45-s*w*.6,.55],
      [ox+lx*.45-c*w*.6,h*.55,oz+lz*.45-s*w*.6,.55],[ox+lx*.45+c*w*.6,h*.55,oz+lz*.45+s*w*.6,.55],[ox+lx,h,oz+lz,1]];
    for(const p of v){P.push(p[0],p[1],p[2]);N.push(0,1,0);const k=p[3];C.push(.5+.5*k,.5+.52*k,.5+.3*k);}};
  blade(0,0,.3,.24,.026,.08);blade(.09,.04,1.9,.18,.022,-.07);blade(-.07,.08,3.4,.21,.022,.07);blade(.03,-.1,4.6,.15,.02,-.06);blade(-.11,-.05,5.5,.17,.02,.06);blade(.12,-.08,2.6,.13,.02,-.05);
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(P,3));g.setAttribute("normal",new THREE.Float32BufferAttribute(N,3));g.setAttribute("color",new THREE.Float32BufferAttribute(C,3));return g;})();
const mdGrassMat=new THREE.MeshLambertMaterial({vertexColors:true,side:THREE.DoubleSide});
mdGrassMat.onBeforeCompile=sh=>{sh.uniforms.uTime=uTime;sh.uniforms.uFocus=mdGU.uFocus;sh.uniforms.uR=mdGU.uR;sh.uniforms.uPush=mdGU.uPush;
  sh.vertexShader="uniform float uTime,uR;uniform vec3 uFocus;uniform vec4 uPush;\n"+sh.vertexShader.replace("#include <begin_vertex>",
    "#include <begin_vertex>\nvec4 gw=modelMatrix*instanceMatrix*vec4(0.,0.,0.,1.);float gk=position.y*4.2;float gd=distance(gw.xz,uFocus.xz);float gs=1.-smoothstep(uR*.72,uR,gd);transformed*=gs;"+
    "float ph=gw.x*.35+gw.z*.27;transformed.x+=(sin(uTime*1.6+ph)+sin(uTime*2.9+ph*2.3)*.4)*.07*gk*gk;transformed.z+=cos(uTime*1.3+ph*1.4)*.05*gk*gk;"+
    "vec2 pv=gw.xz-uPush.xz;float pd=length(pv);float pk=uPush.w*(1.-smoothstep(.2,1.3,pd))*step(abs(gw.y-uPush.y),1.2);transformed.xz+=normalize(pv+vec2(.001))*pk*.22*gk;transformed.y*=1.-pk*.45;\n");};
const mdTiles=new Map(),MDT=8;let mdQueue=[],mdGrassCol=null;
function mdTileBuild(tx,tz){const key=tx+","+tz,list=[];const dens=qual>=2?6:qual>=1?3:0;
  if(dens&&typeof T!=="undefined"&&T.trava)for(let z=tz*MDT;z<tz*MDT+MDT;z++)for(let x=tx*MDT;x<tx*MDT+MDT;x++){if(x<1||z<1||x>=W-1||z>=W-1)continue;const y=topY(x,z);if(y<WATER||y>=H-2)continue;
    if(vox[I(x,y,z)]!==T.trava||vox[I(x,y+1,z)])continue;if(typeof LSKY!=="undefined"&&LSKY[I(x,y+1,z)]<12)continue;
    for(let k=0;k<dens;k++){const r1=hash3(x*7+k,y,z*3),r2=hash3(x,y+k*5+1,z*11),r3=hash3(x*5,y+9,z+k*13);list.push(x+r1,y+1,z+r2,r3);}}
  let m=null;if(list.length){const n=list.length/4;m=new THREE.InstancedMesh(mdGrassGeo,mdGrassMat,n);const o=new THREE.Object3D(),c=new THREE.Color();
    if(!mdGrassCol){const a=avgColor(T.trava);mdGrassCol=new THREE.Color(a[0],a[1],a[2]);}
    for(let i=0;i<n;i++){const r=list[i*4+3];o.position.set(list[i*4],list[i*4+1],list[i*4+2]);o.rotation.set(0,r*6.283,0);const s=.75+r*.8;o.scale.set(s,.7+((r*7.3)%1)*.9,s);o.updateMatrix();m.setMatrixAt(i,o.matrix);
      const t=(r*3.7)%1;c.copy(mdGrassCol).multiplyScalar(.82+t*.42);c.g*=1.04+t*.08;c.r*=.92+((r*5.1)%1)*.22;m.setColorAt(i,c);}
    m.receiveShadow=true;m.frustumCulled=false;m.userData.noAO=true;m.matrixAutoUpdate=false;scene.add(m);}
  mdTiles.set(key,{m,q:qual});}
function mdTileDrop(key){const t=mdTiles.get(key);if(!t)return;if(t.m){scene.remove(t.m);t.m.dispose&&t.m.dispose();}mdTiles.delete(key);}
{const _md=markDirty;markDirty=function(x,z){_md(x,z);if(mdTiles.size){const tx=Math.floor(x/MDT),tz=Math.floor(z/MDT);mdTileDrop(tx+","+tz);if(x%MDT===0)mdTileDrop((tx-1)+","+tz);if(z%MDT===0)mdTileDrop(tx+","+(tz-1));}};}
let mdGT=0;
function mdGrassTick(dt,f){const on=qual>=1&&lightReady&&(FP.on||camera.position.distanceTo(f)<70);
  if(!on){if(mdTiles.size)for(const k of [...mdTiles.keys()])mdTileDrop(k);return;}
  const R=FP.on?26:Math.min(40,Math.max(26,camera.position.distanceTo(f)*.75));mdGU.uR.value=R;mdGU.uFocus.value.copy(f);
  mdGT-=dt;if(mdGT<=0){mdGT=.25;const cx=Math.floor(f.x/MDT),cz=Math.floor(f.z/MDT),n=Math.ceil(R/MDT)+1;mdQueue=[];
    for(const [k,t] of mdTiles){const p=k.split(",");if(Math.abs(p[0]-cx)>n+1||Math.abs(p[1]-cz)>n+1||t.q!==qual)mdTileDrop(k);}
    for(let dz=-n;dz<=n;dz++)for(let dx=-n;dx<=n;dx++){const k=(cx+dx)+","+(cz+dz);if(!mdTiles.has(k))mdQueue.push([dx*dx+dz*dz,cx+dx,cz+dz]);}
    mdQueue.sort((a,b)=>a[0]-b[0]);}
  for(let i=0;i<3&&mdQueue.length;i++){const q=mdQueue.shift();if(!mdTiles.has(q[1]+","+q[2]))mdTileBuild(q[1],q[2]);}}

/* ---------- pollen and tiny lights floating in the air ---------- */
const mdMoteU={uTime,uFocus:{value:new THREE.Vector3()},uCol:{value:new THREE.Color(1,1,1)},uA:{value:.5},uPR:{value:1}};
const mdMotes=(()=>{const n=420,P=new Float32Array(n*3),Sd=new Float32Array(n);for(let i=0;i<n;i++){P[i*3]=Math.random()*44;P[i*3+1]=Math.random()*16;P[i*3+2]=Math.random()*44;Sd[i]=Math.random();}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.BufferAttribute(P,3));g.setAttribute("sd",new THREE.BufferAttribute(Sd,1));
  const m=new THREE.Points(g,new THREE.ShaderMaterial({uniforms:mdMoteU,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:"uniform float uTime,uPR;uniform vec3 uFocus;attribute float sd;varying float vA;void main(){vec3 p=position+vec3(sin(uTime*.23+sd*40.)*1.2+uTime*.35,sin(uTime*.31+sd*17.)*.9,cos(uTime*.19+sd*29.)*1.2+uTime*.12);"+
      "vec3 b=vec3(44.,16.,44.);p=mod(p-uFocus+b*.5,b)-b*.5;float ed=1.-smoothstep(15.,22.,length(p.xz));p+=uFocus+vec3(0.,5.,0.);vec4 mv=viewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;"+
      "float tw=.55+.45*sin(uTime*(1.5+sd*2.)+sd*50.);vA=ed*tw*smoothstep(.6,2.5,-mv.z);gl_PointSize=uPR*(2.+sd*3.5)*min(1.,26./max(1.,-mv.z))*2.2;}",
    fragmentShader:"uniform vec3 uCol;uniform float uA;varying float vA;void main(){vec2 d=gl_PointCoord-.5;float a=smoothstep(.5,.0,length(d));gl_FragColor=vec4(uCol,a*a*vA*uA);}"}));
  m.frustumCulled=false;m.renderOrder=6;scene.add(m);return m;})();

/* ---------- every frame ---------- */
const mdV=new THREE.Vector3(),mdF=new THREE.Vector3(),mdLast=new THREE.Vector3();let mdDust=0,mdTiltK=0;
function mdTick(dt){MD.t+=dt;const night=cur.night||0,day=1-night;
  if(qual>mdMax())setQual(mdMax());
  if(FP.on)mdF.copy(FP.p);else mdF.copy(controls.target);
  /* softer, warmer fill so shadows are not heavy */
  hemi.intensity=cur.hemi*1.16;hemi.groundColor.setRGB(.42,.46,.3);
  mdCS.value.x=tt*.011;mdCS.value.y=tt*.0046;mdCS.value.z=(envUnder?0:.42)*day+.12*night*(envUnder?0:1);
  waterU.uTop.value.copy(cur.top);
  /* sun on screen for the rays */
  const u=grade.uniforms;mdV.copy(camera.position).addScaledVector(tmpV,600).project(camera);
  const front=mdV.z<1&&Math.abs(mdV.x)<1.5&&Math.abs(mdV.y)<1.5;const edge=front?Math.max(0,1-Math.max(0,Math.max(Math.abs(mdV.x),Math.abs(mdV.y))-1)*2):0;
  u.uSun.value.set(mdV.x*.5+.5,mdV.y*.5+.5,qual>=1&&!envUnder?edge*(day*1+night*.35):0);u.uSunC.value.copy(cur.sun);
  const pr=renderer.getPixelRatio();u.uPx.value.set(1/(innerWidth*pr),1/(innerHeight*pr));
  const wantTilt=(qual>=1&&!FP.on&&mode==="look"&&!G2.cam&&!envUnder)?Math.min(1,Math.max(0,(camera.position.distanceTo(controls.target)-30)/50))*.9*Math.min(2,pr):0;
  mdTiltK+=(wantTilt-mdTiltK)*Math.min(1,dt*3);u.uTilt.value=mdTiltK<.03?0:mdTiltK;
  mdGrassTick(dt,mdF);
  /* grass bends away from the fox */
  {const gb=.6*day+.42*night;mdGrassMat.color.setRGB(gb,gb,gb);}
  if(FP.on)mdGU.uPush.value.set(FP.p.x,FP.p.y,FP.p.z,1);else mdGU.uPush.value.w=0;
  mdMotes.visible=qual>=1&&!envUnder;mdMoteU.uFocus.value.copy(mdF);mdMoteU.uPR.value=pr*(innerHeight/800);mdMoteU.uCol.value.copy(cur.sun).lerp(WHITE_L,.3);mdMoteU.uA.value=.42*day+.2*night;
  /* dust under running paws */
  if(FP.on){const dx=FP.p.x-mdLast.x,dz=FP.p.z-mdLast.z;const sp=dt>0?Math.hypot(dx,dz)/dt:0;mdDust-=dt;
    if(FP.ground&&sp>5.4&&sp<40&&mdDust<=0&&!FP.boat&&!FP.under){mdDust=.11;const t=vox[I(Math.floor(FP.p.x),Math.max(0,Math.floor(FP.p.y-.5)),Math.floor(FP.p.z))];
      if(t&&!TYPES[t].water){const c=avgColor(t);burst(FP.p.x-dx*2,FP.p.y+.06,FP.p.z-dz*2,2,[[c[0]*.6+.4,c[1]*.6+.4,c[2]*.6+.38]],.5,.5,.42,.4);}}
    mdLast.copy(FP.p);}}
{const _te=tickEnv;tickEnv=function(dt){_te(dt);try{mdTick(dt);}catch(e){if(!MD.err){MD.err=1;console.warn("moderno",e);}}};}

/* ---------- graphics choice lives in the sound and picture sheet ---------- */
{const _ss=sheetSound;sheetSound=function(){_ss.apply(this,arguments);const b=$("sheetBody");if(!b||$("gfxRow"))return;const h=b.querySelector("h2");if(h)h.textContent="Zvuk i grafika";const d=document.createElement("div");d.className="field";d.id="gfxRow";
  const opt=[["auto","Najljepša"],["med","Srednja"],["low","Brza"]];
  d.innerHTML='<label>Grafika</label><div class="row">'+opt.map(o=>'<button class="btn '+(MD.gfx===o[0]?'green':'soft')+'" data-gfx="'+o[0]+'">'+o[1]+'</button>').join("")+'</div><small class="muted">Ako igra zapinje, odaberi Srednja ili Brza. Najljepša sama pazi da igra ostane glatka.</small>';
  b.appendChild(d);d.querySelectorAll("button").forEach(x=>x.onclick=()=>{MD.gfx=x.dataset.gfx;try{localStorage.setItem("otok-gfx",MD.gfx);}catch(e){}sfx.click();
    if(MD.gfx==="auto"){setQual(small?1:2);}else setQual(mdMax());sheetSound();});};
  $("soundBtn").title="Zvuk i grafika";}
