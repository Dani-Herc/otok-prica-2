/* =================== NEW REGIONS (v13) =================== */
/* the bigger island gets whole new places: a forest of giant trees with a treehouse, a hidden lagoon under a waterfall,
   a lighthouse on its own rock, and floating sky islands reached by a rainbow bridge from the mountain top */
const FOR={a:2.45,d:44,r:15};FOR.x=CX+Math.cos(FOR.a)*FOR.d;FOR.z=CZ+Math.sin(FOR.a)*FOR.d;
const LAG={a:4.2,r:9};{const R0=islandR(LAG.a);LAG.d=R0-3;LAG.x=CX+Math.cos(LAG.a)*LAG.d;LAG.z=CZ+Math.sin(LAG.a)*LAG.d;LAG.ix=-Math.cos(LAG.a);LAG.iz=-Math.sin(LAG.a);}
const SKY={a:-0.3,d:84};SKY.x=CX+Math.cos(SKY.a)*SKY.d;SKY.z=CZ+Math.sin(SKY.a)*SKY.d;
const LIGHT={a:5.3,d:88};LIGHT.x=CX+Math.cos(LIGHT.a)*LIGHT.d;LIGHT.z=CZ+Math.sin(LIGHT.a)*LIGHT.d;
ISLETS.push({x:LIGHT.x,z:LIGHT.z,r:6,h:5,k:"svjetionik"});
const RGN={};const FALLS=new Set();/* filled by buildRegions: tree house, waterfall, lamp, sky temple positions */
/* terrain shaping for the lagoon: a round bay with a high cliff on the land side */
function regionRaw(x,z,h){const dx=x-LAG.x,dz=z-LAG.z,dl=Math.hypot(dx,dz);if(dl>LAG.r+12)return h;
  const inl=(dx*LAG.ix+dz*LAG.iz)/(dl||1);/* 1 = toward the island centre */
  if(dl<LAG.r-.5){const k=sstep(LAG.r-.5,LAG.r-4,dl);const hb=inl>-.25?Math.max(h,SL+3):h;return hb*(1-k)+(SL-1.2+(fbm(x*.2,z*.2)-.5))*k;}
  if(inl>-.25){const rise=sstep(LAG.r+11,LAG.r+.2,dl)*sstep(-.25,.35,inl);return Math.max(h,h*(1-rise)+(SL+17+(fbm(x*.15+3,z*.15)-.5)*2)*rise);}
  return h;}
function regionBiome(x,z){if(Math.hypot(x-FOR.x,z-FOR.z)<FOR.r)return 10;return 0;}
function buildRegions(){const put=(x,y,z,t)=>{x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);if(inb(x,y,z))vox[I(x,y,z)]=t;};
  const soft=(x,y,z,t)=>{x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);if(inb(x,y,z)&&!vox[I(x,y,z)])vox[I(x,y,z)]=t;};
  const clear=(x,y,z)=>{x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);if(inb(x,y,z)&&vox[I(x,y,z)]&&!TYPES[vox[I(x,y,z)]].water)vox[I(x,y,z)]=0;};
  const reserve=(x,z,r,m)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(dx*dx+dz*dz>r*r)continue;const X=Math.floor(x+dx),Z=Math.floor(z+dz);if(X<0||Z<0||X>=W||Z>=W)continue;if(!mask[X+Z*W])mask[X+Z*W]=m||9;}};
  const water=(x,y,z)=>{x=Math.floor(x);y=Math.floor(y);z=Math.floor(z);if(!inb(x,y,z))return;vox[I(x,y,z)]=T.voda;baseWater.add(x+","+y+","+z);};
  const R=(()=>{let s=1313;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};})();

  /* ---------- the forest of giants ---------- */
  const giants=[];for(let i=0;i<40&&giants.length<5;i++){const a=R()*6.283,r=i?3+R()*(FOR.r-5):0;const x=Math.floor(FOR.x+Math.cos(a)*r),z=Math.floor(FOR.z+Math.sin(a)*r);
    const h=hmap[x+z*W];if(h<SL+4||mask[x+z*W])continue;if(giants.some(g=>Math.hypot(g.x-x,g.z-z)<9))continue;giants.push({x,z,h,th:giants.length?14+Math.floor(R()*5):19});}
  const canopy=(cx,cy,cz,rx,ry,lt)=>{for(let y=-ry;y<=ry;y++)for(let z=-rx;z<=rx;z++)for(let x=-rx;x<=rx;x++){const d=Math.hypot(x/rx,y/ry,z/rx);if(d>1)continue;if(d>.75&&hash3(cx+x,cy+y,cz+z)<.3)continue;
      soft(cx+x,cy+y,cz+z,(hash3(cx+x,cy+y,cz+z+7)<.12)?T.jesen:lt);}};
  giants.forEach((g,gi)=>{const {x,z,h,th}=g;const big=gi===0;const tw=big?3:2;const o0=big?-1:0;
    for(let y=-1;y<th;y++)for(let dz=0;dz<tw;dz++)for(let dx=0;dx<tw;dx++)put(x+o0+dx,h+y,z+o0+dz,T.drvo);
    /* roots that reach out over the ground */
    for(const [rx,rz] of [[1,0],[-1,0],[0,1],[0,-1]]){for(let k=1;k<=3;k++){const X=x+rx*(k+(big?1:0))+(rx?0:0),Z=z+rz*(k+(big?1:0));const y=Math.max(h-1,colTop(Math.floor(X),Math.floor(Z)));if(k<3)put(X,y+1-Math.floor(k/2),Z,T.drvo);}}
    /* branches with leafy clouds, then the crown */
    const nb=big?6:4;for(let b=0;b<nb;b++){const a=b/nb*6.283+R()*.6,len=4+Math.floor(R()*3),by=h+th-6+Math.floor(R()*4);let bx=x+.5,bz=z+.5;
      for(let k=0;k<len;k++){bx+=Math.cos(a);bz+=Math.sin(a);put(bx,by+Math.floor(k/3),bz,T.drvo);}canopy(Math.floor(bx),by+Math.floor(len/3)+1,Math.floor(bz),3,2,T.lisce);}
    canopy(x,h+th+1,z,big?7:5,big?4:3,T.lisce);reserve(x,z,big?6:4);});
  /* the tree house on the biggest giant: a round platform, a little cabin and stairs winding up the trunk */
  if(giants.length){const g=giants[0];const py=g.h+9;RGN.house={x:g.x+.5,y:py+1,z:g.z+.5};
    for(let y=py-1;y<=py+6;y++)for(let dz=-5;dz<=5;dz++)for(let dx=-5;dx<=5;dx++){const d=Math.hypot(dx,dz);if(d>5.2||(Math.abs(dx)<=1&&Math.abs(dz)<=1))continue;const t=get(g.x+dx,y,g.z+dz);if(t&&TYPES[t].leaf)vox[I(g.x+dx,y,g.z+dz)]=0;else if(t===T.drvo&&d>2)vox[I(g.x+dx,y,g.z+dz)]=0;}
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const d=Math.hypot(dx,dz);if(d>4.6||(Math.abs(dx)<=1&&Math.abs(dz)<=1))continue;put(g.x+dx,py,g.z+dz,d>3.7?T.tdaske:T.daske);
      if(d>3.7&&(dx+dz)%2===0)put(g.x+dx,py+1,g.z+dz,T.sdaske);}
    /* cabin on the side away from the stairs */
    const cx0=g.x+2,cz0=g.z-4;for(let y=1;y<=3;y++)for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const edge=Math.abs(dx)===2||Math.abs(dz)===2;const X=cx0+dx,Z=cz0+dz;
      if(edge){const win=y===2&&(dx===0||dz===0);put(X,py+y,Z,win?T.staklo:(Math.abs(dx)===2&&Math.abs(dz)===2)?T.drvo:T.sdaske);}else put(X,py+y,Z,0);}
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){put(cx0+dx,py,cz0+dz,T.daske);}
    for(let l=0;l<3;l++){const r=3-l;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)put(cx0+dx,py+4+l,cz0+dz,T.krov);}
    put(cx0,py+1,cz0+2,0);put(cx0,py+2,cz0+2,0);/* door toward the trunk */
    put(cx0-1,py+1,cz0-1,T.polica);put(cx0+1,py+1,cz0-1,T.polica2);put(cx0+1,py+3,cz0,T.lampion);
    addChest("kucica",cx0-1,py+1,cz0,"Škrinja iz kućice na drvetu");
    /* stairs: two blocks wide, spiralling round the trunk from the ground to the platform */
    const steps=py-g.h;let ang=-1.06;for(let i=0;i<steps;i++){for(let w=5;w<=6;w++){for(let s=0;s<3;s++){const a=ang+s*.11;const X=g.x+.5+Math.cos(a)*w,Z=g.z+.5+Math.sin(a)*w;
          const Y=g.h+i;put(X,Y,Z,T.daske);for(let k=1;k<=3;k++)clear(X,Y+k,Z);let yy=Y-1;while(yy>0&&!get(Math.floor(X),yy,Math.floor(Z))&&yy>Y-3){put(X,yy,Z,T.drvo);yy--;}}}ang+=.34;}
    for(let k=0;k<5;k++){const a=ang+k*.12;for(let w=4;w<=6;w++){put(g.x+.5+Math.cos(a)*w,py,g.z+.5+Math.sin(a)*w,T.daske);}}
    for(const a of [0,2.1,4.2])put(g.x+.5+Math.cos(a)*3.2,py+1,g.z+.5+Math.sin(a)*3.2,T.lampion);}
  POI.push({k:"suma",n:"Šuma divova",x:FOR.x,z:FOR.z,r:13});

  /* ---------- the lagoon: palm beach, a waterfall off the cliff and a secret cave behind it ---------- */
  {let fr=LAG.r-3;while(fr<LAG.r+6&&colTop(Math.floor(LAG.x+LAG.ix*fr),Math.floor(LAG.z+LAG.iz*fr))<SL+12)fr+=.5;const fx=LAG.x+LAG.ix*fr,fz=LAG.z+LAG.iz*fr;const top=colTop(Math.floor(fx),Math.floor(fz));const px=-LAG.iz,pz=LAG.ix;
    /* a little spring pool on top and water spilling down the cliff face, three columns wide */
    for(let w=-1;w<=1;w++){const X=fx+px*w,Z=fz+pz*w;for(let k=0;k<2;k++){const XX=X+LAG.ix*(k+1),ZZ=Z+LAG.iz*(k+1);const t2=colTop(Math.floor(XX),Math.floor(ZZ));water(XX,t2,ZZ);put(XX,t2-1,ZZ,T.glina);}
      for(let y=top;y>=SL+1;y--){const t=get(Math.floor(X),y,Math.floor(Z));if(y<SL+2&&t)break;water(X,y,Z);if(y>=Math.floor(WATER)+1&&y<top)FALLS.add(Math.floor(X)+","+y+","+Math.floor(Z));}}
    RGN.fall={x:fx,y:top,z:fz};
    /* the cave behind the falling water */
    const cy=SL+3;for(let k=1;k<=5;k++)for(let w=-1;w<=1;w++)for(let y=0;y<3;y++){const X=fx+LAG.ix*k+px*w,Z=fz+LAG.iz*k+pz*w;clear(X,cy+y,Z);if(y===0)put(X,cy-1,Z,k>3?T.kcigla:T.kamen);}
    for(let w=-2;w<=2;w++)for(let y=0;y<4;y++){const X=fx+LAG.ix*6+px*w,Z=fz+LAG.iz*6+pz*w;if(Math.abs(w)<2&&y<3)clear(X,cy+y,Z);}
    put(fx+LAG.ix*5+px*1.4,cy+2,fz+LAG.iz*5+pz*1.4,T.lampion);put(fx+LAG.ix*5-px*1.4,cy,fz+LAG.iz*5-pz*1.4,T.ametist);
    addChest("slap",fx+LAG.ix*5,cy,fz+LAG.iz*5,"Škrinja iza slapa");
    /* a path of stepping stones from the beach to the cave */
    for(let k=-3;k<=0;k++){const X=fx+LAG.ix*k+px*2.2,Z=fz+LAG.iz*k+pz*2.2;put(X,SL+2,Z,T.kamen);}
    reserve(fx,fz,4);
    /* palm trees round the sandy rim */
    let pn=0;for(let i=0;i<60&&pn<6;i++){const a=R()*6.283,r=LAG.r+1+R()*3.5;const x=Math.floor(LAG.x+Math.cos(a)*r),z=Math.floor(LAG.z+Math.sin(a)*r);const h=hmap[x+z*W];
      if(h<SL+3||h>SL+5||get(x,h,z)||mask[x+z*W])continue;const lean=R()*6.283,th=5+Math.floor(R()*3);let px2=x+.5,pz2=z+.5;
      for(let y=0;y<th;y++){if(y>1){px2+=Math.cos(lean)*.28;pz2+=Math.sin(lean)*.28;}put(px2,h+y,pz2,T.breza_d);}
      const tx=Math.floor(px2),tz=Math.floor(pz2),ty=h+th;put(tx,ty,tz,T.lisce);
      for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]){for(let k=1;k<=3;k++){const yy=ty-(k===3?1:0);soft(tx+dx*k,yy,tz+dz*k,T.lisce);}}
      if(R()<.6)put(tx+1,ty-1,tz,T.bundeva);/* coconut-ish */reserve(x,z,2);pn++;}
    POI.push({k:"laguna",n:"Skrivena laguna",x:LAG.x,z:LAG.z,r:12});}

  /* ---------- the lighthouse ---------- */
  {const cx=Math.floor(LIGHT.x),cz=Math.floor(LIGHT.z);const by=colTop(cx,cz)+1;const TH=15;
    for(let y=0;y<TH;y++)for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++){const d=Math.hypot(dx,dz);if(d>2.9)continue;const X=cx+dx,Z=cz+dz;
      if(d>1.9)put(X,by+y,Z,(Math.floor(y/3)%2)?T.crvena:T.bijela);else put(X,by+y,Z,0);}
    for(let y=-1;y<0;y++)for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)if(Math.hypot(dx,dz)<=3.2)put(cx+dx,by+y,cz+dz,T.kcigla);
    /* a spiral stair round a centre post */
    const ring=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];for(let y=0;y<TH;y++){put(cx,by+y,cz,T.kcigla);const r=ring[y%8];put(cx+r[0],by+y,cz+r[1],T.sdaske);}
    for(let y=0;y<2;y++){put(cx,by+y,cz+2,0);put(cx,by+y,cz+3,0);}/* the door */
    put(cx,by+1,cz+3,0);
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const d=Math.hypot(dx,dz);if(d>4.3)continue;if(d<=1.5&&!(dx===0&&dz===0))continue;put(cx+dx,by+TH,cz+dz,T.kcigla);}
    const lastR=ring[(TH-1)%8];put(cx+lastR[0],by+TH,cz+lastR[1],0);
    for(let dz=-4;dz<=4;dz++)for(let dx=-4;dx<=4;dx++){const d=Math.hypot(dx,dz);if(d>4.3||d<3.6)continue;if((dx+dz)%2===0)put(cx+dx,by+TH+1,cz+dz,T.tuf);}
    for(let y=1;y<=3;y++)for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++){const d=Math.hypot(dx,dz);if(d>2.3)continue;put(cx+dx,by+TH+y,cz+dz,d>1.5?((Math.abs(dx)===2&&Math.abs(dz)===2)?T.kcigla:T.staklo):0);}
    put(cx,by+TH+2,cz,T.svjetlo);put(cx+1,by+TH+1,cz,0);put(cx,by+TH+1,cz+2,0);put(cx,by+TH+2,cz+2,0);
    for(let l=0;l<2;l++){const r=2-l;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)put(cx+dx,by+TH+4+l,cz+dz,T.crvena);}put(cx,by+TH+6,cz,T.zlato);
    addChest("svjetionik",cx+3,by+TH+1,cz,"Škrinja svjetioničara");reserve(cx,cz,6);RGN.lamp={x:cx+.5,y:by+TH+2.5,z:cz+.5};
    POI.push({k:"svjetionik",n:"Svjetionik",x:cx,z:cz,r:12});}

  /* ---------- sky islands and the rainbow bridge ---------- */
  {let py=0,pkx=MX,pkz=MZ;for(let z=-6;z<=6;z++)for(let x=-6;x<=6;x++){const X=Math.floor(MX+x),Z=Math.floor(MZ+z);const h=colTop(X,Z);if(h>py){py=h;pkx=X;pkz=Z;}}
    const TY=Math.min(H-12,py+1);RGN.sky={y:TY};
    const isle=(cx,cz,r,ty,seed)=>{for(let dz=-r-2;dz<=r+2;dz++)for(let dx=-r-2;dx<=r+2;dx++){const a=Math.atan2(dz,dx);const rr=r*(.85+.3*fbm(Math.cos(a)*1.3+seed,Math.sin(a)*1.3));const d=Math.hypot(dx,dz);if(d>rr)continue;
        const X=Math.floor(cx+dx),Z=Math.floor(cz+dz);const depth=Math.max(1,Math.round((rr-d)*1.25+fbm(X*.3,Z*.3)*3));
        for(let k=0;k<=depth;k++){const y=ty-k;put(X,y,Z,k===0?T.trava:k<3?T.zemlja:(hash3(X,y,Z)<.06?T.ametist:T.kamen));}
        if(depth>3&&hash2(X,Z,77)<.05){for(let k=1;k<=2;k++)put(X,ty-depth-k,Z,T.kristal);}}};
    const c0={x:SKY.x,z:SKY.z};isle(c0.x,c0.z,10,TY,1);
    const c1={x:CX+Math.cos(SKY.a+.33)*80,z:CZ+Math.sin(SKY.a+.33)*80},c2={x:CX+Math.cos(SKY.a-.3)*92,z:CZ+Math.sin(SKY.a-.3)*92};
    isle(c1.x,c1.z,5,TY+3,5);isle(c2.x,c2.z,6,TY-2,9);
    /* cloud stepping stones between them */
    const hop=(a,b,ya,yb)=>{const L=Math.hypot(b.x-a.x,b.z-a.z);const n=Math.floor(L/2.6);for(let i=1;i<n;i++){const t=i/n;const x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,y=Math.round(ya+(yb-ya)*t);
      for(const [dx,dz] of [[0,0],[1,0],[0,1],[1,1]])put(x+dx,y,z+dz,T.vuna_b);}};
    const edge=(c,r,toward)=>{const dx=toward.x-c.x,dz=toward.z-c.z,l=Math.hypot(dx,dz);return {x:c.x+dx/l*(r-1),z:c.z+dz/l*(r-1)};};
    hop(edge(c0,10,c1),edge(c1,5,c0),TY,TY+3);hop(edge(c0,10,c2),edge(c2,6,c0),TY,TY-2);
    /* the rainbow bridge from the peak to the big sky island, seven colours wide */
    const cols=[T.vuna_c,T.vuna_n,T.vuna_z,T.vuna_l,T.vuna_p,T.vuna_t,T.vuna_lj];const s={x:pkx+.5,z:pkz+.5},e=edge(c0,10,s);const L=Math.hypot(e.x-s.x,e.z-s.z),ux=(e.x-s.x)/L,uz=(e.z-s.z)/L,vx=-uz,vz=ux;
    for(let t=0;t<=L;t+=.35){const k=t/L;const y=Math.round(py+(TY-py)*k+Math.sin(k*Math.PI)*3);for(let w=-3;w<=3;w++){const X=s.x+ux*t+vx*w,Z=s.z+uz*t+vz*w;put(X,y,Z,cols[w+3]);for(let q=1;q<=3;q++)clear(X,y+q,Z);}}
    RGN.bridge={x:s.x,z:s.z,y:py};
    /* the sky temple: white pillars, a golden roof and a sky chest */
    const tx=Math.floor(c0.x),tz=Math.floor(c0.z);for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)put(tx+dx,TY,tz+dz,(Math.abs(dx)===3||Math.abs(dz)===3)?T.kvarc:T.upjescenjak);
    for(const [dx,dz] of [[-3,-3],[3,-3],[-3,3],[3,3]])for(let y=1;y<=4;y++)put(tx+dx,TY+y,tz+dz,T.kvarc);
    for(let dz=-3;dz<=3;dz++)for(let dx=-3;dx<=3;dx++)put(tx+dx,TY+5,tz+dz,(Math.abs(dx)===3||Math.abs(dz)===3)?T.zlato:T.bijela);
    for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)put(tx+dx,TY+6,tz+dz,T.bijela);put(tx,TY+7,tz,T.kristal);put(tx,TY+4,tz,T.svjetlo);
    addChest("nebo",tx,TY+1,tz,"Nebeska škrinja");
    /* magic trees on the sky islands */
    const mtree=(x,z,ty)=>{x=Math.floor(x);z=Math.floor(z);for(let y=1;y<=4;y++)put(x,ty+y,z,T.breza_d);canopy(x,ty+5,z,2,2,T.carlisce);};
    mtree(c0.x+6,c0.z-3,TY);mtree(c0.x-5,c0.z+5,TY);mtree(c1.x,c1.z,TY+3);
    put(c2.x,TY-1,c2.z,T.kristal);put(c2.x+1,TY-2+1,c2.z,T.lampion);
    /* a waterfall pouring off the big sky island into the sea */
    {const a=SKY.a+.9;const wx=c0.x+Math.cos(a)*8.6,wz=c0.z+Math.sin(a)*8.6;for(let w=0;w<2;w++){const X=wx+Math.cos(a+1.57)*w,Z=wz+Math.sin(a+1.57)*w;
        const t0=colTop(Math.floor(X),Math.floor(Z));water(X,TY,Z);for(let y=TY-1;y>SL+1;y--){if(get(Math.floor(X),y,Math.floor(Z))&&y<TY-12)break;water(X,y,Z);if(y>=Math.floor(WATER)+1)FALLS.add(Math.floor(X)+","+y+","+Math.floor(Z));}}RGN.skyFall={x:wx,y:TY,z:wz};}
    POI.push({k:"nebo",n:"Nebeski otoci",x:c0.x,z:c0.z,r:12,y:TY-2});}
}
/* the lighthouse beam turns all night; the sky islands sparkle */
let lhBeam=null;
function regionsInit(){if(!RGN.lamp)return;const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xfff2c0,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
  for(const s of [1,-1]){const c=new THREE.Mesh(new THREE.ConeGeometry(4.5,46,20,1,true),m);c.rotation.z=s*Math.PI/2;c.position.x=s*23;g.add(c);}
  const gl=new THREE.Sprite(new THREE.SpriteMaterial({map:typeof GLOW!=="undefined"?GLOW:null,color:0xfff0b0,transparent:true,opacity:.0,blending:THREE.AdditiveBlending,depthWrite:false}));gl.scale.set(9,9,1);g.add(gl);g.userData.glow=gl;
  g.position.set(RGN.lamp.x,RGN.lamp.y,RGN.lamp.z);scene.add(g);lhBeam=g;}
function tickRegions(dt,tt){if(lhBeam){lhBeam.rotation.y+=dt*.7;const n=Math.max(.15,(typeof cur!=="undefined"&&cur.night)||0);lhBeam.children.forEach(c=>{if(c.isSprite)c.material.opacity=c.material.map?n*.9:0;else c.material.opacity=.05+.3*n;});}
  if(RGN.sky&&Math.random()<dt*4){const a=Math.random()*6.283,r=Math.random()*11;burst(SKY.x+Math.cos(a)*r,RGN.sky.y+1+Math.random()*3,SKY.z+Math.sin(a)*r,1,[[1,.95,.7],[.8,.9,1],[1,.8,1]],.4,.6,1.6,.2);}
  if(RGN.skyFall&&Math.random()<dt*14){burst(RGN.skyFall.x+(Math.random()-.5)*2,WATER+.2,RGN.skyFall.z+(Math.random()-.5)*2,1,[[.92,.97,1],[1,1,1]],1,2.2,1.2,1);}
  if(RGN.fall&&Math.random()<dt*10){burst(RGN.fall.x+LAG.ix*-1+(Math.random()-.5)*2,WATER+.2,RGN.fall.z+LAG.iz*-1+(Math.random()-.5)*2,1,[[.92,.97,1],[1,1,1]],1,2,1.2,1);}}
/* moving to the bigger world: things built near the library, the plots and the garden move with them; anything else goes back into the bag */
function migrateWorld13(){if((S.worldV||0)>=13)return;const OFF=CX-96;const B=S.bag;const ne={};
  const zones=[{p:LIB,r:11}].concat(PLOTS.map(p=>({p,r:7.5}))).concat([{p:SITES.vrt,r:6},{p:SITES.trznica,r:6}]);
  for(const k in S.edits||{}){const p=k.split(",").map(Number);const x=p[0]+OFF,z=p[2]+OFF;const t=S.edits[k];
    if(zones.some(q=>Math.hypot(x-q.p.x,z-q.p.z)<q.r)){ne[x+","+p[1]+","+z]=t;continue;}
    if(B&&t&&TYPES[t]&&!TYPES[t].water)B[TYPES[t].k]=(B[TYPES[t].k]||0)+1;}
  S.edits=ne;(S.farm||[]).forEach(c=>{c.x+=OFF;c.z+=OFF;});S.spawns=[];S.spawnDay="";S.isletDay={};S.worldV=13;save();}
/* Rida talks about the new places */
if(typeof RIDA_IDLE!=="undefined")RIDA_IDLE.push(
  "Jesi li vidjela dugu na vrhu planine? Kažu da se po njoj može hodati sve do oblaka!",
  "U Šumi divova netko je sagradio kućicu na drvetu. Stepenice se vrte oko debla!",
  "Čula sam da se iza slapa u lagunu skriva nešto sjajno. Treba samo biti hrabar i proći kroz vodu.",
  "Noću svjetionik obasjava more. Svjetioničar je na vrhu ostavio škrinju.",
  "Na nebeskim otocima rastu ljubičasta stabla, a voda pada ravno u more!");
