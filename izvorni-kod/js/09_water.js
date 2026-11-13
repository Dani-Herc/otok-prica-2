/* =================== WATER =================== */
const shoreData=new Uint8Array(W*W*4);
function buildShore(){const D=new Float32Array(W*W).fill(99);const q=[];
  for(let i=0;i<W*W;i++)if(hmap[i]>=SL+3){D[i]=0;q.push(i);}
  for(let h=0;h<q.length;h++){const i=q[h],x=i%W,z=(i/W)|0;for(const d of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const X=x+d[0],Z=z+d[1];if(X<0||Z<0||X>=W||Z>=W)continue;const j=X+Z*W;const nd=D[i]+(d[0]&&d[1]?1.414:1);if(nd<D[j]){D[j]=nd;q.push(j);}}}
  for(let i=0;i<W*W;i++){const v=Math.min(255,Math.round(D[i]/16*255));shoreData[i*4]=v;shoreData[i*4+1]=v;shoreData[i*4+2]=v;shoreData[i*4+3]=255;}}
const shoreTex=new THREE.DataTexture(shoreData,W,W,THREE.RGBAFormat);shoreTex.magFilter=THREE.LinearFilter;shoreTex.minFilter=THREE.LinearFilter;shoreTex.wrapS=shoreTex.wrapT=THREE.ClampToEdgeWrapping;
const waterU={uTime,uShore:{value:shoreTex},uShallow:{value:new THREE.Color()},uDeep:{value:new THREE.Color()},uSky:{value:new THREE.Color()},uSunC:{value:new THREE.Color()},
  uSunDir:{value:new THREE.Vector3()},uFogC:{value:new THREE.Color()},uFogD:{value:.0034},uWorld:{value:W},uNight:{value:0},uUnder:{value:0},uClear:{value:0}};
const waterMat=new THREE.ShaderMaterial({uniforms:waterU,transparent:true,depthWrite:false,side:THREE.DoubleSide,
  vertexShader:"uniform float uTime;varying vec3 vW;varying float vD;void main(){vec4 w=modelMatrix*vec4(position,1.);float h=sin(w.x*.28+uTime*1.1)*.07+cos(w.z*.23+uTime*.85)*.07+sin((w.x+w.z)*.6+uTime*1.9)*.025;w.y+=h;vW=w.xyz;vec4 mv=viewMatrix*w;vD=-mv.z;gl_Position=projectionMatrix*mv;}",
  fragmentShader:"uniform sampler2D uShore;uniform vec3 uShallow,uDeep,uSky,uSunC,uFogC,uSunDir;uniform float uTime,uFogD,uWorld,uNight,uUnder,uClear;varying vec3 vW;varying float vD;"+
  "void main(){if(!gl_FrontFacing){if(uUnder<.5)discard;vec2 q2=vW.xz*.7;float rp=sin(q2.x*1.3+uTime*1.4+sin(q2.y*1.1+uTime))*sin(q2.y*1.5-uTime*1.1+sin(q2.x*.9));"+
  "vec3 V2=normalize(cameraPosition-vW);float up=pow(max(-V2.y,0.),1.5);vec3 c2=mix(uShallow*1.25,vec3(.85,.97,1.),smoothstep(.2,.9,rp)*.5+up*.35);c2+=uSunC*pow(up,8.)*.6*(1.-uNight*.7);"+
  "float f2=1.-exp(-uFogD*uFogD*vD*vD);gl_FragColor=vec4(mix(c2,uFogC,f2),.92);return;}vec2 uv=vW.xz/uWorld;float d=texture2D(uShore,uv).r;if(uv.x<0.||uv.y<0.||uv.x>1.||uv.y>1.)d=1.;"+
  "vec3 col=mix(uShallow,uDeep,smoothstep(.0,.5,d));vec2 q=vW.xz;"+
  "vec3 N=normalize(vec3(sin(q.x*1.1+uTime*1.6+sin(q.y*.6))*.09+sin(q.x*3.1-uTime*2.3)*.03,1.,cos(q.y*1.3-uTime*1.2+sin(q.x*.5))*.09+cos(q.y*2.9+uTime*2.)*.03));"+
  "vec3 V=normalize(cameraPosition-vW);vec3 R=reflect(-uSunDir,N);float spec=pow(max(dot(R,V),0.),160.)*2.2+pow(max(dot(R,V),0.),18.)*.12;"+
  "float fr=pow(1.-max(dot(N,V),0.),4.);col=mix(col,uSky,fr*.6);"+
  "float foam=smoothstep(.055,.0,d);float wob=sin(q.x*.8+uTime)*.5+sin(q.y*.7-uTime*.8)*.5;float bands=smoothstep(.72,1.,sin(d*70.-uTime*1.8+wob*1.5))*smoothstep(.22,.03,d);"+
  "col=mix(col,vec3(1.),clamp(foam*.9+bands*.75,0.,1.));col+=uSunC*spec*(1.-uNight*.6);"+
  "float a=mix(.5,.94,smoothstep(0.,.32,d));a=max(a,foam);float f=1.-exp(-uFogD*uFogD*vD*vD);col=mix(col,uFogC,f);gl_FragColor=vec4(col,a*(1.-uClear*(1.-foam)));}"});
const water=new THREE.Mesh(new THREE.PlaneGeometry(1800,1800,240,240).rotateX(-Math.PI/2),waterMat);water.position.set(CX,WATER,CZ);water.renderOrder=2;scene.add(water);
const flowMat=new THREE.ShaderMaterial({uniforms:{uTime},transparent:true,depthWrite:false,side:THREE.DoubleSide,
  vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
  fragmentShader:"uniform float uTime;varying vec2 vUv;void main(){float s=sin(vUv.x*31.+sin(vUv.x*9.)*2.)*.5+.5;float t=fract(vUv.y*.45-uTime*1.4+s*.35);float st=smoothstep(0.,.18,t)*smoothstep(.75,.35,t);"+
  "vec3 c=mix(vec3(.38,.72,.92),vec3(.93,.98,1.),st*.75+.15*s);float e=smoothstep(.0,.12,vUv.x)*smoothstep(1.,.88,vUv.x);gl_FragColor=vec4(c,.9*e+.05);}"});

