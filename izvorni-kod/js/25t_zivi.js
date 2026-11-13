/* =================== v21: LIKOVI KOJI STOJE NA SVOM MJESTU ===================
   Dani (2026-11-13): "the characters do not exist at all (e.g. the fishermen), and the quests ask us to talk to them".
   People and animals that stand still in a world (frozen: Ribarica Nela, Ribar Jakov, Djed Lovro, the queens, the
   bakers...) were never ticked, so their model stayed at the centre of the map while their name and quest stood
   at the right spot. Now every standing character is placed where it belongs each frame, breathes a little, looks
   around, and turns towards Rida when she comes close. */
const ZIVI={t:0};
function ziviTick(dt){ZIVI.t+=dt;const t=ZIVI.t;const P=FP.on?FP.p:null;
  for(const e of ents){if(!e.frozen||e===rida||!e.g||!e.home)continue;if(FP.mount&&FP.mount.en===e)continue;if(typeof ACT!=="undefined"&&ACT&&ACT.en===e)continue;
    if(e.x==null||e.y==null)continue;if(e._ry0==null)e._ry0=e.g.rotation.y;
    const br=Math.sin(t*1.6+(e.ph||0))*.025;let cel=0;if(e.celebrate>0){e.celebrate-=dt;cel=Math.abs(Math.sin(t*9))*.5;}
    e.g.position.set(e.x,e.y+br+cel,e.z);
    let goal=e._ry0;if(P){const dx=P.x-e.x,dz=P.z-e.z,d=Math.hypot(dx,dz);if(d<6&&d>.3&&Math.abs(P.y-e.y)<4)goal=Math.atan2(dx,dz);}
    let da=goal-e.g.rotation.y;while(da>Math.PI)da-=Math.PI*2;while(da<-Math.PI)da+=Math.PI*2;e.g.rotation.y+=da*Math.min(1,dt*3);
    const p=e.g.userData.parts||{};if(p.head){p.head.rotation.y=Math.sin(t*.6+(e.ph||0))*.3;p.head.rotation.x=Math.sin(t*.45+(e.ph||0))*.08;}
    if(p.tail){p.tail.rotation.y=Math.sin(t*2.5+(e.ph||0))*.4;}}}
{let last=performance.now();const loop=()=>{const n=performance.now();const dt=Math.min(.1,(n-last)/1000);last=n;try{ziviTick(dt);}catch(e){}requestAnimationFrame(loop);};requestAnimationFrame(loop);}
/* placing right away too, so nothing waits for the first frame. A character that the map put on top of its own
   roof (Nela on her hut, the glassmaker on his workshop) steps down in front of the house; one that found no
   ground under it (an eagle over a gorge) moves to the nearest ground. */
function ziviOpen(x,z,y){for(let yy=y;yy<y+16;yy++)if(get(x,yy,z))return false;return true;}
function ziviFix(e){if(!e.frozen)return;const x=Math.floor(e.x),z=Math.floor(e.z);let y=Math.floor(e.y);
  const roofs=[T.vuna_c,T.vuna_l,T.vuna_r,T.crvena,T.bijela,T.kcigla].filter(v=>v);
  if(y<2){for(let r=1;r<9;r++)for(let a=0;a<16;a++){const xx=Math.floor(e.x+Math.cos(a/16*6.283)*r),zz=Math.floor(e.z+Math.sin(a/16*6.283)*r);const t=wTopAt(xx,zz,H-1);if(t>2){e.x=xx+.5;e.z=zz+.5;e.y=t+1;e.home={x:e.x,z:e.z};return;}}return;}
  if(!roofs.includes(get(x,y-1,z)))return;let low=null;for(let yy=y-2;yy>y-12;yy--){if(get(x,yy-1,z)&&!get(x,yy,z)&&!get(x,yy+1,z)){low=yy;break;}}
  if(low==null)return;let best=null;const y0=Math.max(low-1,Math.ceil(WATER)),y1=y-2;
  for(let r=1;r<7&&!best;r++)for(let dx=-r;dx<=r;dx++)for(let dz=-r;dz<=r;dz++){if(Math.max(Math.abs(dx),Math.abs(dz))!==r)continue;const xx=x+dx,zz=z+dz;
    for(let yy=y0;yy<=y1;yy++){if(get(xx,yy-1,zz)&&!roofs.includes(get(xx,yy-1,zz))&&!get(xx,yy,zz)&&!get(xx,yy+1,zz)&&ziviOpen(xx,zz,yy)&&!waterAt(xx+.5,yy+.2,zz+.5)){const d=dx*dx+dz*dz+Math.abs(yy-low)*.5;if(!best||d<best.d)best={x:xx+.5,z:zz+.5,y:yy,d};}}}
  if(best){e.x=best.x;e.z=best.z;e.y=best.y;e.home={x:e.x,z:e.z};}}
{const _pp=pwPut;pwPut=function(){const e=_pp.apply(this,arguments);try{ziviFix(e);e.g.position.set(e.x,e.y,e.z);}catch(x){}return e;};}
