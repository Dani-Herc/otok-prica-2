/* =================== PARTICLES =================== */
const PMAX=1600,pPos=new Float32Array(PMAX*3),pCol=new Float32Array(PMAX*3),parts=[];
const pGeo=new THREE.BufferGeometry();pGeo.setAttribute("position",new THREE.BufferAttribute(pPos,3));pGeo.setAttribute("color",new THREE.BufferAttribute(pCol,3));
const dotTex=glowTex("rgba(255,255,255,1)","rgba(255,255,255,.6)");
const pts=new THREE.Points(pGeo,new THREE.PointsMaterial({size:.45,map:dotTex,vertexColors:true,transparent:true,depthWrite:false,alphaTest:.02}));pts.frustumCulled=false;pts.renderOrder=5;scene.add(pts);
function burst(x,y,z,n,cols,spd,up,life,grav){for(let i=0;i<n;i++){if(parts.length>=PMAX)parts.shift();const a=Math.random()*Math.PI*2,s=(.3+Math.random())*spd;
  parts.push({x,y,z,vx:Math.cos(a)*s,vy:up*(.5+Math.random()),vz:Math.sin(a)*s,l:life*(.6+Math.random()*.6),g:grav==null?6:grav,c:cols[Math.floor(Math.random()*cols.length)]});}}
function tickParts(dt){let i=0;for(let k=parts.length-1;k>=0;k--){const p=parts[k];p.l-=dt;if(p.l<=0){parts.splice(k,1);continue;}p.vy-=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;if(p.sway){p.x+=Math.sin(p.l*3)*dt*.6;}}
  for(const p of parts){if(i>=PMAX)break;pPos[i*3]=p.x;pPos[i*3+1]=p.y;pPos[i*3+2]=p.z;pCol[i*3]=p.c[0];pCol[i*3+1]=p.c[1];pCol[i*3+2]=p.c[2];i++;}
  for(;i<PMAX;i++)pPos[i*3+1]=-999;pGeo.attributes.position.needsUpdate=true;pGeo.attributes.color.needsUpdate=true;}
const avgCache={};function avgColor(t){return avgCache[t]||(avgCache[t]=(()=>{const c=new THREE.Color(TYPES[t].c);return [c.r,c.g,c.b];})());}

