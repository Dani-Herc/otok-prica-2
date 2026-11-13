/* =================== Otok priča 2 v3: KOMPAS ===================
   The task text at the top of explore mode is gone. A compass strip shows where she is facing and where things are:
   nearest treasure (or the world's collectable), delivery jobs, and the way home. Looking straight at a mark names it.
   North is the top of the map (-z). Nothing is saved. */
const KP={el:null,cv:null,cx:null,lab:null,w:0,dpr:1,img:{},sm:null};
const KPDIR=["S","SI","I","JI","J","JZ","Z","SZ"];
function kpInit(){if(KP.el)return;$("fpUI").insertAdjacentHTML("beforeend",'<div id="kompas" aria-hidden="true"><canvas id="kpCv"></canvas><div id="kpLab"></div></div>');KP.el=$("kompas");KP.cv=$("kpCv");KP.cx=KP.cv.getContext("2d");KP.lab=$("kpLab");}
function kpSize(){const w=KP.cv.clientWidth,d=Math.min(2,window.devicePixelRatio||1);if(w===KP.w&&d===KP.dpr)return;KP.w=w;KP.dpr=d;KP.cv.width=Math.round(w*d);KP.cv.height=Math.round(40*d);}
function kpImg(src){let i=KP.img[src];if(!i){i=KP.img[src]=new Image();i.src=src;}return i.complete&&i.naturalWidth?i:null;}
function kpMarks(){const P=FP.p,out=[];
  try{const nt=nearestTreasure();if(nt){const q=nt.tr.g.position;out.push({x:q.x,z:q.z,k:"blago",n:WORLD&&WDEF[WORLD]&&WDEF[WORLD].item?WDEF[WORLD].item.hud:"Blago",d:nt.d});}}catch(e){}
  try{if(typeof JB!=="undefined")for(const m of JB.mk){const q=m.k==="far"?m.g.position:m;const J=jbS(),R=m.k!=="from"&&J.cur?jbRes(J.cur.id):m.id?jbRes(m.id):null;
      out.push({x:q.x,z:q.z,k:m.k==="from"?"posao":"dostava",ic:R?jbIcon(R.it):null,n:m.k==="from"?"Zadatak stanovnika":(($("jcT")&&$("jcT").textContent)||"Dostava"),d:m.k==="far"?null:Math.hypot(q.x-P.x,q.z-P.z)});}}catch(e){}
  try{if(!WORLD)out.push({x:LIB.x+.5,z:LIB.z+.5,k:"dom",n:"Knjižnica",d:Math.hypot(LIB.x+.5-P.x,LIB.z+.5-P.z)});else if(WG&&WG.spawn)out.push({x:WG.spawn.x,z:WG.spawn.z,k:"dom",n:"Put kući",d:Math.hypot(WG.spawn.x-P.x,WG.spawn.z-P.z)});}catch(e){}
  return out;}
function kpIcon(x,k,px,py,s){/* small pixel signs, drawn on a 7x7 grid */
  const G={blago:["..ggg..",".gyyyg.","gyyyyyg","gddkddg","gyykyyg","gyyyyyg",".ggggg."],posao:["..ooo..",".oyyyo.",".oykyo.",".oykyo.",".oyyyo.",".oykyo.","..ooo.."],dostava:["..ooo..",".onnno.","onnnnno","onnnnno","onnnnno",".onnno.","..ooo.."],dom:["...b...","..bwb..",".bwwwb.","bwwwwwb",".bwkwb.",".bwkwb.",".bbbbb."]}[k];
  const C={g:"#7a4a10",y:"#ffc53d",d:"#c98a00",k:"#16243a",o:"#16243a",n:"#4fd67a",b:"#16243a",w:"#8fd0ff"};const u=s/7;
  for(let j=0;j<7;j++)for(let i=0;i<7;i++){const ch=G[j][i];if(ch===".")continue;x.fillStyle=C[ch];x.fillRect(Math.round(px-s/2+i*u),Math.round(py-s/2+j*u),Math.ceil(u),Math.ceil(u));}}
function kpDraw(){if(!FP.on||(typeof G2!=="undefined"&&G2.mode==="mini")){if(KP.el)KP.el.hidden=true;return;}kpInit();KP.el.hidden=false;kpSize();
  const x=KP.cx,d=KP.dpr,W=KP.w,H=40;if(!W)return;x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,W,H);
  const b=Math.PI-(FP.cam.yaw+Math.PI);/* bearing clockwise from north */const span=Math.PI*1.05,ppr=W/span,mid=W/2;
  const wrap=a=>{while(a>Math.PI)a-=Math.PI*2;while(a<-Math.PI)a+=Math.PI*2;return a;};const fade=px=>Math.max(0,Math.min(1,(mid-Math.abs(px-mid))/(W*.12)));
  /* strip */
  const g=x.createLinearGradient(0,0,W,0);g.addColorStop(0,"rgba(14,22,38,0)");g.addColorStop(.14,"rgba(14,22,38,.78)");g.addColorStop(.86,"rgba(14,22,38,.78)");g.addColorStop(1,"rgba(14,22,38,0)");x.fillStyle=g;x.fillRect(0,4,W,26);
  const g2=x.createLinearGradient(0,0,W,0);g2.addColorStop(0,"rgba(255,255,255,0)");g2.addColorStop(.2,"rgba(255,255,255,.35)");g2.addColorStop(.8,"rgba(255,255,255,.35)");g2.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g2;x.fillRect(0,4,W,1.5);x.fillRect(0,28.5,W,1.5);
  /* ticks and letters */
  x.textAlign="center";x.textBaseline="middle";
  for(let i=0;i<24;i++){const a=i*Math.PI/12,px=mid+wrap(a-b)*ppr;if(px<-10||px>W+10)continue;const f=fade(px);if(f<=0)continue;x.globalAlpha=f;
    if(i%3===0){const t=KPDIR[i/3],big=i%6===0;x.font=(big?"800 18px":"700 12px")+' "Baloo 2", system-ui, sans-serif';x.fillStyle=i===0?"#ffc53d":big?"#fff":"rgba(255,255,255,.9)";x.fillText(t,px,17.5);}
    else{x.fillStyle="rgba(255,255,255,.7)";x.fillRect(px-.75,12,1.5,11);}}
  x.globalAlpha=1;
  /* marks */
  let best=null,ba=.13;const M=kpMarks();for(const m of M){const a=Math.atan2(m.x-FP.p.x,-(m.z-FP.p.z)),r=wrap(a-b);let px=mid+r*ppr,edge=false;const lim=W*.44;if(px<mid-lim){px=mid-lim;edge=true;}if(px>mid+lim){px=mid+lim;edge=true;}
    x.globalAlpha=edge?.6:1;const s=edge?15:21;x.fillStyle="rgba(255,253,247,.95)";x.beginPath();x.arc(px,17,s/2+3.5,0,7);x.fill();x.lineWidth=1.5;x.strokeStyle=m.k==="dostava"?"#2fa85a":m.k==="dom"?"#3f8fe0":"#e0a010";x.stroke();
    const im=m.ic?kpImg(m.ic):null;if(im)x.drawImage(im,px-s/2-1,17-s/2-1,s+2,s+2);else kpIcon(x,m.k,px,17,s-3);
    if(edge){x.fillStyle="#ffc53d";x.beginPath();const dir=px<mid?-1:1;x.moveTo(px+dir*(s/2+9),17);x.lineTo(px+dir*(s/2+4),13);x.lineTo(px+dir*(s/2+4),21);x.fill();}
    if(Math.abs(r)<ba){ba=Math.abs(r);best=m;}}
  x.globalAlpha=1;
  /* centre notch */
  x.fillStyle="#ffc53d";x.beginPath();x.moveTo(mid-6,0);x.lineTo(mid+6,0);x.lineTo(mid,8);x.fill();x.beginPath();x.moveTo(mid-5,40);x.lineTo(mid+5,40);x.lineTo(mid,33);x.fill();
  const t=best?best.n+(best.d!=null?" · "+Math.round(best.d)+" m":""):"";if(t!==KP.sm){KP.sm=t;KP.lab.textContent=t;KP.lab.style.opacity=t?1:0;}}
{const _tb=tickBubble;tickBubble=function(dt){_tb.apply(this,arguments);try{kpDraw();}catch(e){if(!KP.err){KP.err=1;console.warn("kompas",e);}}};}
