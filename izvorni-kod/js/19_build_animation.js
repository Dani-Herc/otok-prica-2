/* =================== BUILD ANIMATION =================== */
const falling=[];
function growBook(b,onDone){const L=blueprint(bkey(b)),plot=PLOTS[b.plot];const tc=targetCount(b);let from=shown[b.id]==null?0:shown[b.id];
  if(tc-from>160){for(let i=from;i<tc-160;i++){const p=L[i];setV(plot.x+p[0],plot.h+p[1],plot.z+p[2],p[3]);}from=tc-160;}shown[b.id]=from;
  const total=tc-from;if(total<=0){onDone&&onDone();return;}const step=Math.max(.02,Math.min(.07,2.4/total));let k=0;
  for(let i=from;i<tc;i++,k++){const p=L[i];if(!p[3]){setV(plot.x+p[0],plot.h+p[1],plot.z+p[2],0);continue;}const m=new THREE.Mesh(blockGeo(p[3]),matFor(p[3]));m.castShadow=true;m.visible=false;scene.add(m);
    falling.push({m,i,b,p,plot,x:plot.x+p[0]+.5,y:plot.h+p[1]+.5,z:plot.z+p[2]+.5,t:-k*step,t0:.55,last:i===tc-1,onDone,ty:p[3]});}
  if(!falling.some(f=>f.b===b)){shown[b.id]=tc;onDone&&onDone();}}
function easeBounce(x){const n=7.5625,d=2.75;if(x<1/d)return n*x*x;if(x<2/d)return n*(x-=1.5/d)*x+.75;if(x<2.5/d)return n*(x-=2.25/d)*x+.9375;return n*(x-=2.625/d)*x+.984375;}
function tickFalling(dt){for(let j=falling.length-1;j>=0;j--){const f=falling[j];f.t+=dt;if(f.t<0)continue;f.m.visible=true;const k=Math.min(1,f.t/f.t0);const e=easeBounce(k);
  f.m.position.set(f.x,f.y+(1-e)*7,f.z);f.m.rotation.y=(1-e)*1.5;const s=.6+.4*Math.min(1,k*2);f.m.scale.set(s,s,s);
  if(k>=1){scene.remove(f.m);falling.splice(j,1);setV(f.x-.5,f.y-.5,f.z-.5,f.ty);shown[f.b.id]=Math.max(shown[f.b.id]||0,f.i+1);if(Math.random()<.5)sfx.pop();burst(f.x,f.y-.4,f.z,5,[avgColor(f.ty)],1.2,1.5,.5);
    if(f.last){shown[f.b.id]=targetCount(f.b);f.onDone&&f.onDone();}}}}

