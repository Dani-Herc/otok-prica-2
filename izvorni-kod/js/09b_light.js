/* =================== BLOCK LIGHT =================== */
/* two light levels per cell, like a lantern-lit cave: sky light (falls straight down, spreads into overhangs and tunnels)
   and block light (from lanterns, crystals, amethyst). Both fade by one per step. */
const LSKY=new Uint8Array(W*H*W),LBLK=new Uint8Array(W*H*W);
const passL=t=>!t||!!(TYPES[t].glass||TYPES[t].leaf||TYPES[t].water);
const costL=t=>!t?1:TYPES[t].leaf||TYPES[t].water?2:1;
const LQ=new Int32Array(W*H*W>>1);
function lightBFS(L,qn,x0,x1,z0,z1){let h=0;const ring=LQ.length;let tail=qn;
  while(h!==tail){const i=LQ[h];h=(h+1)%ring;const v=L[i];if(v<=1)continue;const x=i%W,z=((i/W)|0)%W,y=(i/(W*W))|0;
    for(let k=0;k<6;k++){let X=x,Y=y,Z=z;if(k===0)X--;else if(k===1)X++;else if(k===2)Y--;else if(k===3)Y++;else if(k===4)Z--;else Z++;
      if(X<x0||X>x1||Z<z0||Z>z1||Y<0||Y>=H)continue;const j=X+W*(Z+W*Y);const t=vox[j];if(!passL(t))continue;const nv=v-costL(t);if(nv>L[j]){L[j]=nv;LQ[tail]=j;tail=(tail+1)%ring;}}}}
/* recompute light inside a box; cells just outside the box act as fixed sources */
function lightBox(x0,x1,z0,z1){x0=Math.max(0,x0);z0=Math.max(0,z0);x1=Math.min(W-1,x1);z1=Math.min(W-1,z1);
  for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){let v=15;for(let y=H-1;y>=0;y--){const i=x+W*(z+W*y);const t=vox[i];LBLK[i]=0;
      if(t&&TYPES[t].light)LBLK[i]=TYPES[t].light;if(!passL(t)){v=0;LSKY[i]=0;continue;}if(t&&v>0)v=Math.max(0,v-1);LSKY[i]=v;}}
  for(const L of [LSKY,LBLK]){let n=0;const isSky=L===LSKY;
    for(let z=z0-1;z<=z1+1;z++)for(let x=x0-1;x<=x1+1;x++){if(x<0||z<0||x>=W||z>=W)continue;const edge=x<x0||x>x1||z<z0||z>z1;
      for(let y=0;y<H;y++){const i=x+W*(z+W*y);const v=L[i];if(v<2)continue;
        if(edge){LQ[n++]=i;continue;}
        if(isSky&&v===15){/* only cells next to darker open cells need to spread */
          if((x>0&&passL(vox[i-1])&&L[i-1]<14)||(x<W-1&&passL(vox[i+1])&&L[i+1]<14)||(z>0&&passL(vox[i-W])&&L[i-W]<14)||(z<W-1&&passL(vox[i+W])&&L[i+W]<14))LQ[n++]=i;}
        else LQ[n++]=i;
        if(n>=LQ.length-8)break;}}
    lightBFS(L,n,x0,x1,z0,z1);}}
function lightAll(){lightBox(0,W-1,0,W-1);}
/* after an edit: relight around it and rebuild only chunks whose light actually changed */
function relightAt(x,y,z){const R=16;const x0=Math.max(0,x-R),x1=Math.min(W-1,x+R),z0=Math.max(0,z-R),z1=Math.min(W-1,z+R);
  const n=(x1-x0+1)*(z1-z0+1)*H;const oldS=new Uint8Array(n),oldB=new Uint8Array(n);let k=0;
  for(let yy=0;yy<H;yy++)for(let zz=z0;zz<=z1;zz++)for(let xx=x0;xx<=x1;xx++){const i=xx+W*(zz+W*yy);oldS[k]=LSKY[i];oldB[k]=LBLK[i];k++;}
  lightBox(x0,x1,z0,z1);k=0;const ch=new Set();
  for(let yy=0;yy<H;yy++)for(let zz=z0;zz<=z1;zz++)for(let xx=x0;xx<=x1;xx++){const i=xx+W*(zz+W*yy);if(oldS[k]!==LSKY[i]||oldB[k]!==LBLK[i]){
      for(const d of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const cx=Math.floor((xx+d[0])/CS),cz=Math.floor((zz+d[1])/CS);if(cx>=0&&cz>=0&&cx<NC&&cz<NC)ch.add(cx+","+cz);}}k++;}
  ch.forEach(c=>dirtyChunks.add(c));}
/* light at a point (for creatures, the fox's lantern and the sound of caves) */
function lightAt(x,y,z){x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);if(!inb(x,y,z))return [15,0];const i=I(x,y,z);return [LSKY[i],LBLK[i]];}
