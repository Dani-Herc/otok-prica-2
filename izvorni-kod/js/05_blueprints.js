/* =================== BLUEPRINTS =================== */
function BP(){const m=new Map();const o={
  set(x,y,z,t){m.set(x+","+y+","+z,[x,y,z,t]);},
  box(x0,y0,z0,x1,y1,z1,t,hollow){for(let y=y0;y<=y1;y++)for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){if(hollow&&x>x0&&x<x1&&z>z0&&z<z1)continue;o.set(x,y,z,t);}},
  cyl(y0,y1,r,t,hollow,cx,cz){cx=cx||0;cz=cz||0;for(let y=y0;y<=y1;y++)for(let z=-5;z<=5;z++)for(let x=-5;x<=5;x++){const d=Math.hypot(x,z);if(d>r+.35)continue;if(hollow&&d<r-.75)continue;o.set(x+cx,y,z+cz,typeof t==="function"?t(x,y,z):t);}},
  ball(cx,cy,cz,r,t,skip){for(let y=-3;y<=3;y++)for(let z=-3;z<=3;z++)for(let x=-3;x<=3;x++){if(Math.hypot(x,y*1.15,z)>r+.25)continue;const k=(x+cx)+","+(y+cy)+","+(z+cz);if(skip&&m.has(k))continue;o.set(x+cx,y+cy,z+cz,t);}},
  list(){const a=[...m.values()].filter(v=>v[1]>=0);a.sort((p,q)=>p[1]-q[1]||(Math.atan2(p[2],p[0])-Math.atan2(q[2],q[0])));return a;}};return o;}
function libraryBP(){const b=BP();
  b.box(-5,0,-5,5,0,5,T.kamen);
  b.box(-4,1,-4,4,4,4,T.polica,true);
  [[-4,-4],[4,-4],[-4,4],[4,4]].forEach(c=>{for(let y=1;y<=4;y++)b.set(c[0],y,c[1],T.drvo);});
  [-2,2].forEach(i=>{[[i,-4],[i,4],[-4,i],[4,i]].forEach(c=>{b.set(c[0],2,c[1],T.staklo);b.set(c[0],3,c[1],T.staklo);});});
  for(let y=1;y<=3;y++)b.set(0,y,4,0);b.set(-1,1,4,T.drvo);b.set(1,1,4,T.drvo);b.set(-1,2,4,T.drvo);b.set(1,2,4,T.drvo);b.set(-1,3,4,T.drvo);b.set(1,3,4,T.drvo);
  b.set(-2,1,5,T.lampion);b.set(2,1,5,T.lampion);
  /* inside: a red carpet to the lectern of the Great Book, reading poufs, lanterns and a staircase up to a hidden room */
  for(let z=1;z<=3;z++)b.set(0,0,z,T.vuna_c);b.set(0,0,0,T.vuna_zl);[[-1,0],[1,0],[0,-1],[-1,-1],[1,-1],[-1,1],[1,1]].forEach(c=>b.set(c[0],0,c[1],T.vuna_c));
  b.set(0,1,0,T.stalak);
  b.set(-3,1,3,T.vuna_l);b.set(-3,1,2,T.vuna_ts);b.set(-2,1,3,T.vuna_p);b.set(-3,1,-3,T.lampion);b.set(3,1,3,T.lampion);
  b.set(3,1,1,T.bacva);b.set(3,1,0,T.polica2);b.set(-3,1,0,T.polica2);b.set(-3,1,-1,T.polica2);
  b.set(2,1,-2,T.sdaske);for(let y=1;y<=2;y++)b.set(1,y,-2,T.sdaske);for(let y=1;y<=3;y++)b.set(0,y,-2,T.sdaske);for(let y=1;y<=4;y++)b.set(-1,y,-2,T.sdaske);
  b.box(-5,5,-5,5,5,5,T.daske);
  /* the hatch to the secret room stays shut until the Great Book is whole again */
  for(let x=-1;x<=1;x++)b.set(x,5,-2,(typeof S!=="undefined"&&S.quest&&S.quest.done)?0:T.sdaske);
  /* the secret room itself */
  b.set(-2,6,2,T.polica2);b.set(2,6,2,T.polica2);b.set(-2,6,1,T.polica2);b.set(2,6,1,T.lampion);b.set(-2,6,-1,T.zlato);b.set(-2,7,-1,T.kristal);b.set(2,6,-2,T.polica2);b.set(2,7,-2,T.polica2);
  b.box(-3,6,-3,3,7,3,T.polica,true);b.box(-3,8,-3,3,8,3,T.daske,true);[[-3,-3],[3,-3],[-3,3],[3,3]].forEach(c=>{for(let y=6;y<=8;y++)b.set(c[0],y,c[1],T.drvo);});
  b.set(2,6,-1,T.zlato);b.set(2,7,-1,T.kristal);b.set(-2,6,-2,T.lampion);
  [[0,-3],[0,3],[-3,0],[3,0]].forEach(c=>b.set(c[0],7,c[1],T.staklo));
  b.box(-4,9,-4,4,9,4,T.krov);b.set(0,9,0,T.svjetlo);b.box(-3,10,-3,3,10,3,T.krov);b.box(-2,11,-2,2,11,2,T.krov);
  b.box(-1,11,-1,1,14,1,T.bijela);[[0,-1],[0,1],[-1,0],[1,0]].forEach(c=>b.set(c[0],13,c[1],T.staklo));
  b.box(-1,15,-1,1,15,1,T.drvo);[[0,-1],[0,1],[-1,0],[1,0]].forEach(c=>b.set(c[0],15,c[1],T.staklo));b.set(0,15,0,T.svjetlo);
  b.box(-1,16,-1,1,16,1,T.krov);b.set(0,17,0,T.krov);b.set(0,18,0,T.zlato);
  // fountain on the plaza
  for(let z=-3;z<=3;z++)for(let x=-3;x<=3;x++){const d=Math.hypot(x,z);if(d>1.6&&d<2.9)b.set(x,0,z+9,T.kamen);}
  b.set(0,0,9,T.kamen);b.set(0,1,9,T.kamen);b.set(0,2,9,T.kristal);
  return b.list();}
const BUILDERS={
  fantazija(){const b=BP();const tree=(x,z,h)=>{for(let y=0;y<h;y++)b.set(x,y,z,T.drvo);b.ball(x,h,z,2,T.carlisce,true);};
    tree(-2,-2,5);tree(2,-2,4);b.cyl(0,2,1.1,T.bijela,false,1,2);b.cyl(3,3,2.6,T.gljiva,false,1,2);b.cyl(4,4,1.8,T.gljiva,false,1,2);b.set(1,5,2,T.gljiva);b.set(1,1,3,T.staklo);
    [[-3,0,2],[-3,1,2],[3,0,0],[0,0,-3],[0,1,-3],[-1,0,1]].forEach(p=>b.set(p[0],p[1],p[2],T.kristal));b.set(-2,0,3,T.lampion);return b.list();},
  misterij(){const b=BP();b.box(-3,0,-3,-1,0,-1,T.kamen);b.set(-3,1,-3,T.kamen);
    b.cyl(0,8,1.7,(x,y)=>((y>>1)%2?T.bijela:T.crvena),false,1,0);b.cyl(9,9,1.7,T.staklo,true,1,0);b.set(1,9,0,T.svjetlo);
    b.cyl(10,10,1.7,T.krov,false,1,0);b.cyl(11,11,.8,T.krov,false,1,0);b.set(1,12,0,T.zlato);
    b.box(-3,0,1,-1,1,3,T.daske,true);b.box(-3,2,1,-1,2,3,T.krov);b.set(-2,1,3,T.staklo);b.set(-1,0,2,T.lampion);return b.list();},
  avantura(){const b=BP();for(let x=-3;x<=3;x++)for(let z=-3;z<=3;z++){if(!(Math.abs(x)===3||Math.abs(z)===3))continue;if(z===3&&Math.abs(x)<=1)continue;b.set(x,0,z,T.drvo);b.set(x,1,z,T.drvo);if((x+z)%2===0)b.set(x,2,z,T.drvo);}
    b.box(-2,0,-2,0,4,0,T.daske,true);b.box(-3,5,-3,1,5,1,T.daske);for(let x=-3;x<=1;x++)for(let z=-3;z<=1;z++)if(x===-3||x===1||z===-3||z===1)if((x+z)%2===0)b.set(x,6,z,T.daske);
    for(let y=6;y<=9;y++)b.set(-1,y,-1,T.drvo);b.set(0,9,-1,T.crvena);b.set(1,9,-1,T.crvena);b.set(0,8,-1,T.crvena);b.set(1,8,-1,T.bijela);
    b.set(2,0,1,T.zlato);b.set(2,0,-1,T.daske);b.set(2,1,-1,T.lampion);b.set(1,0,2,T.sijeno);return b.list();},
  zivotinje(){const b=BP();b.box(-3,0,-3,1,2,0,T.crvena,true);[[-3,-3],[1,-3],[-3,0],[1,0]].forEach(c=>{for(let y=0;y<=2;y++)b.set(c[0],y,c[1],T.bijela);});
    b.set(-1,0,0,0);b.set(-1,1,0,0);b.set(-1,2,0,T.bijela);b.box(-3,3,-3,1,3,0,T.krov);b.box(-3,4,-2,1,4,-1,T.krov);
    b.set(2,0,-2,T.sijeno);b.set(2,0,-3,T.sijeno);b.set(2,1,-3,T.sijeno);b.set(3,0,-3,T.sijeno);
    for(let x=-3;x<=3;x++)b.set(x,0,3,T.daske);for(let z=1;z<=3;z++){b.set(-3,0,z,T.daske);b.set(3,0,z,T.daske);}b.set(0,0,2,T.lisce);b.set(2,0,1,T.lisce);return b.list();},
  znanost(){const b=BP();b.cyl(0,2,2.6,T.bijela,true);[[0,-3],[0,3],[-3,0],[3,0]].forEach(c=>b.set(c[0],1,c[1],T.staklo));b.set(0,0,3,0);b.set(0,1,3,0);
    for(let y=3;y<=5;y++){const r=Math.sqrt(Math.max(0,2.9*2.9-(y-2.6)*(y-2.6)));b.cyl(y,y,r,(x,yy,z)=>(x===0&&z<=0)?T.staklo:T.bijela,false);}
    b.set(0,6,0,T.bijela);b.set(0,5,-1,T.kamen);b.set(0,6,-2,T.kamen);b.set(0,7,-2,T.kristal);b.set(3,0,-3,T.kristal);b.set(-3,0,-2,T.lampion);return b.list();},
  zivot(){const b=BP();b.box(-2,0,-2,2,2,2,T.cigla,true);b.set(-2,1,0,T.staklo);b.set(2,1,0,T.staklo);b.set(0,1,-2,T.staklo);b.set(1,1,2,T.staklo);
    b.set(-1,0,2,T.daske);b.set(-1,1,2,T.daske);b.box(-3,3,-3,3,3,3,T.krov);b.box(-2,4,-2,2,4,2,T.krov);b.box(-1,5,-1,1,5,1,T.krov);b.set(0,6,0,T.krov);
    for(let y=4;y<=6;y++)b.set(2,y,-1,T.cigla);for(let x=-3;x<=3;x+=2)b.set(x,0,3,T.lisce);b.set(3,0,1,T.lisce);b.set(3,0,-1,T.lisce);b.set(2,0,3,T.lampion);return b.list();}
};
function bkey(b){return b.bld&&BUILDERS[b.genre+"/"+b.bld]?b.genre+"/"+b.bld:b.genre;}
const bpCache={};function blueprint(g){return bpCache[g]||(bpCache[g]=BUILDERS[g]());}
const shown={};
function targetCount(b){const L=blueprint(bkey(b)).length;if(b.done)return L;return Math.max(3,Math.floor(L*Math.min(1,b.page/b.pages)));}
function topY(x,z){x=Math.floor(x);z=Math.floor(z);if(x<0||z<0||x>=W||z>=W)return -1;for(let y=H-1;y>=0;y--){const t=vox[I(x,y,z)];if(t&&!TYPES[t].glass&&!TYPES[t].water)return y;}return -1;}

