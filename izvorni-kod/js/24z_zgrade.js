/* ===== v28: book buildings with depth. Three designs per kind of book, you choose the design and the place on a map
   (Rida suggests one), finished buildings have their own daily activity, and any building can be rebuilt in another design.
   Save: a book may carry b.bld (1 or 2; absent = the classic design) and S.bldDay remembers today's visits. ===== */
const ZB={
  hip(b,x0,z0,x1,z1,y,t){let k=0;while(x0+k<=x1-k&&z0+k<=z1-k){const last=x0+k+1>=x1-k-1||z0+k+1>=z1-k-1;b.box(x0+k,y+k,z0+k,x1-k,y+k,z1-k,t,!last);if(last)break;k++;}return y+k;},
  gable(b,x0,z0,x1,z1,y,t,wall){let k=0;while(z0+k<=z1-k){b.box(x0-1,y+k,z0+k-1,x1+1,y+k,z0+k-1,t);b.box(x0-1,y+k,z1-k+1,x1+1,y+k,z1-k+1,t);
      if(z0+k<=z1-k){b.box(x0,y+k,z0+k,x0,y+k,z1-k,wall);b.box(x1,y+k,z0+k,x1,y+k,z1-k,wall);}k++;}
    if((z1-z0)%2===0)b.box(x0-1,y+k-1,(z0+z1)/2,x1+1,y+k-1,(z0+z1)/2,t);return y+k;},
  house(b,x0,z0,x1,z1,y0,y1,wall,post){b.box(x0,y0,z0,x1,y1,z1,wall,true);[[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(c=>{for(let y=y0;y<=y1;y++)b.set(c[0],y,c[1],post);});},
  floor(b,x0,z0,x1,z1,t){b.fl=b.fl||[];for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++)b.fl.push([x,-1,z,t]);},
  disc(b,r,t){b.fl=b.fl||[];for(let z=-5;z<=5;z++)for(let x=-5;x<=5;x++)if(Math.hypot(x,z)<=r+.35)b.fl.push([x,-1,z,t]);},
  out(b){return (b.fl||[]).concat(b.list());},
  door(b,x,z,y){y=y||0;b.set(x,y,z,0);b.set(x,y+1,z,0);},
  tree(b,x,z,h,leaf,log){for(let y=0;y<h;y++)b.set(x,y,z,log||T.drvo);b.ball(x,h,z,1.6,leaf,true);}
};
const BLD={
  fantazija:[["Začarana šuma","Gljive, kristali i čarobna stabla"],["Vilinski toranj","Visoki bijeli toranj s ljubičastim krovom"],["Kuća u stablu","Dom u deblu divovskog čarobnog stabla"]],
  misterij:[["Svjetionik u magli","Prugasti svjetionik s kućicom čuvara"],["Detektivska vila","Tamna vila s tornjem i tajnim prozorom"],["Toranj sa satom","Kameni toranj sa zlatnim zvonom"]],
  avantura:[["Piratska utvrda","Drvena utvrda s kulom i zastavom"],["Piratski brod","Pravi brod s jedrima i škrinjom na palubi"],["Hram u džungli","Stari hram sa zlatom na vrhu"]],
  zivotinje:[["Sunčana farma","Crvena staja i ograda"],["Vjetrenjača","Bijeli mlin s velikim krilima"],["Staklenik","Stakleni vrt pun biljaka"]],
  znanost:[["Zvjezdarnica","Kupola s teleskopom"],["Raketa","Raketa na rampi, spremna za let"],["Laboratorij","Moderni laboratorij sa staklenom kupolom"]],
  zivot:[["Kućica s vrtom","Kućica od cigle s dimnjakom"],["Slastičarnica","Slatka trgovina s divovskim kolačem na krovu"],["Kuća na kat","Velika kuća s balkonom i vrtom"]]
};
const BACT={fantazija:["Zdenac želja","Odaberi jednu od tri čarobne želje."],misterij:["Tajni signal","Zapamti i ponovi svjetlosni signal."],avantura:["Karta blaga","Kopaj i prati tragove do blaga."],
  zivotinje:["Gladni prijatelji","Pročitaj što tko voli i nahrani ih."],znanost:["Teleskop","Spoji zvijezde u zviježđe."],zivot:["Kutak uspomena","Zapiši ili pročitaj uspomenu iz knjige."]};
Object.assign(BUILDERS,{
  "fantazija/1"(){const b=BP();ZB.disc(b,3.3,T.kaldrma);b.cyl(0,7,2,T.kvarc,true);ZB.door(b,0,2);b.set(0,2,2,T.ametist);
    [[2,3,0],[-2,5,0],[0,4,-2],[0,6,2],[2,6,0]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.cyl(8,8,3.1,T.sdaske);b.cyl(9,9,3.1,T.sdaske,true);b.cyl(9,9,2.2,0);
    b.cyl(9,11,2,T.kvarc,true);[[2,10,0],[-2,10,0],[0,10,2],[0,10,-2]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.set(0,9,0,T.svjetlo);
    b.cyl(12,12,3,T.vuna_lj);b.cyl(13,13,2.2,T.vuna_lj);b.cyl(14,14,1.4,T.vuna_lj);b.set(0,15,0,T.vuna_lj);b.set(0,16,0,T.vuna_lj);b.set(0,17,0,T.kristal);
    [[-4,0,3],[-4,1,3],[4,0,-2],[3,0,4],[-3,0,-4],[-3,1,-4],[-3,2,-4]].forEach(p=>b.set(p[0],p[1],p[2],T.ametist));b.set(4,0,3,T.lampion);b.set(-4,0,-1,T.lampion);
    ZB.tree(b,4,-4,3,T.carlisce);return ZB.out(b);},
  "fantazija/2"(){const b=BP();ZB.disc(b,3,T.mahovina);b.cyl(0,9,2,T.drvo,true);b.cyl(0,0,2.9,T.drvo,true);ZB.door(b,0,2);b.set(0,2,2,T.lampion);
    [[2,3,0],[-2,3,0],[0,5,-2],[2,6,0],[0,7,2]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.set(0,4,0,T.svjetlo);
    [[3,0,1],[-3,0,-1],[1,0,-3],[-1,1,3],[4,0,2]].forEach(p=>b.set(p[0],p[1],p[2],T.drvo));
    b.cyl(5,5,3,T.sdaske,false,0,3);b.cyl(5,5,2,0,false,0,0);b.cyl(5,5,2,T.drvo,true);b.set(-2,6,4,T.lampion);b.set(2,6,4,T.lampion);
    [[0,12,0],[3,10,2],[-3,10,-2],[2,10,-3],[-2,11,3],[0,14,0],[3,12,-1],[-3,12,1]].forEach((p,i)=>b.ball(p[0],p[1],p[2],3,i%3===2?T.tresnja:T.carlisce,true));
    [[5,7,2],[-5,8,-2],[2,7,-5]].forEach(p=>{b.set(p[0],p[1],p[2],T.lampion);b.set(p[0],p[1]+1,p[2],T.carlisce);});
    [[-4,3],[4,-3],[-3,-4]].forEach(c=>{b.set(c[0],0,c[1],T.stapka);b.set(c[0],1,c[1],T.gljiva);});b.set(3,0,4,T.kristal);return ZB.out(b);},
  "misterij/1"(){const b=BP();ZB.floor(b,-5,-4,5,4,T.kaldrma);ZB.house(b,-4,-3,1,2,0,3,T.tdaske,T.smreka_d);b.box(-4,0,-3,1,0,2,T.kcigla,true);ZB.door(b,-2,2);
    [[-4,2,0],[1,2,-1],[-1,2,-3],[0,2,2],[-3,2,2]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.set(-2,2,2,T.lampion);b.set(-1,1,-1,T.polica2);b.set(-3,1,-2,T.stol);b.set(0,1,-2,T.lampion);
    ZB.gable(b,-4,-3,1,2,4,T.tuf,T.tdaske);b.set(-2,5,2,T.staklo);
    ZB.house(b,2,-3,4,-1,0,8,T.kcigla,T.duboki);[[3,3,-1],[3,6,-1],[4,5,-2],[2,7,-2]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.set(3,7,-2,T.svjetlo);
    b.box(1,9,-4,5,9,0,T.tuf,true);b.box(2,10,-3,4,10,-1,T.tuf);b.set(3,11,-2,T.tuf);b.set(3,12,-2,T.ametist);
    b.set(3,0,3,T.lampion);b.set(-5,0,4,T.lampion);[[4,1],[4,2],[5,2]].forEach(c=>b.set(c[0],0,c[1],T.lisce));ZB.tree(b,-5,-4,4,T.smreka,T.smreka_d);return ZB.out(b);},
  "misterij/2"(){const b=BP();ZB.floor(b,-3,-3,3,3,T.kaldrma);ZB.house(b,-2,-2,2,2,0,10,T.kcigla,T.kamen);ZB.door(b,0,2);b.set(0,2,2,T.lampion);
    [3,6].forEach(y=>[[2,0],[-2,0],[0,-2]].forEach(c=>b.set(c[0],y,c[1],T.staklo)));b.box(-3,7,-3,3,7,3,T.kamen,true);
    [[0,2,1,0],[0,-2,1,0],[2,0,0,1],[-2,0,0,1]].forEach(f=>{for(let i=-1;i<=1;i++)for(let y=8;y<=10;y++)b.set(f[0]+f[2]*i,y,f[1]+f[3]*i,T.kvarc);b.set(f[0],9,f[1],T.zlato);});
    b.box(-2,11,-2,2,11,2,T.kamen);[[-2,-2],[2,-2],[-2,2],[2,2]].forEach(c=>{b.set(c[0],12,c[1],T.kamen);b.set(c[0],13,c[1],T.kamen);});b.set(0,13,0,T.zlato);b.set(0,12,0,T.svjetlo);
    const top=ZB.hip(b,-3,-3,3,3,14,T.krov);b.set(0,top+1,0,T.zlato);
    ZB.house(b,-5,-1,-3,1,0,2,T.cigla,T.kamen);b.box(-5,3,-2,-3,3,2,T.krov);b.set(-5,1,0,T.staklo);b.set(4,0,3,T.lampion);b.set(4,0,-3,T.bacva);return ZB.out(b);},
  "avantura/1"(){const b=BP();ZB.floor(b,-5,-3,5,3,T.pijesak);b.box(-4,0,-1,4,0,1,T.tdaske);b.box(-5,1,-2,5,2,2,T.tdaske,true);b.box(-4,1,-1,4,1,1,T.daske);
    b.box(-5,1,-2,-5,2,-2,0);b.box(-5,1,2,-5,2,2,0);b.box(5,1,-2,5,2,-2,0);b.box(5,1,2,5,2,2,0);b.set(5,3,0,T.tdaske);b.set(5,3,-1,T.tdaske);b.set(5,3,1,T.tdaske);b.set(5,4,0,T.zlato);
    b.box(-5,3,-2,-3,4,2,T.sdaske,true);b.box(-5,5,-2,-3,5,2,T.daske);b.set(-3,3,0,0);b.set(-3,4,-1,T.staklo);b.set(-3,4,1,T.staklo);b.set(-5,4,0,T.staklo);b.set(-5,6,0,T.lampion);
    [[-1,11],[2,9]].forEach(m=>{for(let y=2;y<=m[1];y++)b.set(m[0],y,0,T.drvo);for(let y=4;y<=m[1]-2;y++)for(let z=-2;z<=2;z++)if(z)b.set(m[0],y,z,T.vuna_b);b.set(m[0],m[1]-1,-3,T.drvo);b.set(m[0],m[1]-1,3,T.drvo);});
    b.set(0,11,0,T.vuna_c);b.set(1,11,0,T.vuna_c);b.set(0,10,0,T.vuna_c);
    b.set(1,2,1,T.zlato);b.set(0,2,-1,T.bacva);b.set(3,2,1,T.bacva);b.set(-2,2,1,T.lampion);b.set(4,0,3,T.bacva);b.set(-3,0,3,T.sijeno);return ZB.out(b);},
  "avantura/2"(){const b=BP();ZB.floor(b,-5,-5,5,5,T.mahovina);
    for(let k=0;k<4;k++)for(let y=k*2;y<=k*2+1;y++)for(let z=-5+k;z<=5-k;z++)for(let x=-5+k;x<=5-k;x++){if(x>-5+k&&x<5-k&&z>-5+k&&z<5-k&&!(y===k*2+1&&(x===-4+k||x===4-k||z===-4+k||z===4-k)))continue;
      const r=hash3(x*3+1,y*7,z*5);b.set(x,y,z,r<.16?T.mahovina:y%2?T.pjescenjak:T.upjescenjak);}
    b.box(-1,7,-1,1,7,1,T.pjescenjak);for(let k=0;k<4;k++){b.set(0,k*2,5-k,T.kamen);b.set(0,k*2+1,5-k,T.kamen);b.set(0,k*2+1,4-k,T.kamen);if(k)b.set(0,k*2,6-k,T.kamen);}
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(c=>{b.set(c[0],8,c[1],T.upjescenjak);b.set(c[0],9,c[1],T.upjescenjak);});b.box(-1,10,-1,1,10,1,T.pjescenjak);b.set(0,11,0,T.zlato);b.set(0,8,0,T.zlato);b.set(0,9,0,T.kristal);
    [[-5,-5],[5,-5],[-5,5],[5,5]].forEach(c=>b.set(c[0],2,c[1],T.lampion));[[-4,3,-4],[4,5,3],[-3,5,2],[3,3,-4],[2,7,-2]].forEach(p=>b.set(p[0],p[1],p[2],T.lisce));return ZB.out(b);},
  "zivotinje/1"(){const b=BP();ZB.disc(b,3.4,T.kaldrma);b.cyl(0,3,2.6,T.bijela,true);b.cyl(4,7,2,T.bijela,true);b.cyl(4,4,2.6,T.daske,true);ZB.door(b,0,3);b.set(0,2,3,T.daske);
    [[3,2,0],[-3,2,0],[0,5,-2],[2,6,0],[-2,6,0]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));b.cyl(8,8,2.6,T.krov);b.cyl(9,9,1.6,T.krov);b.set(0,10,0,T.krov);
    b.set(0,7,3,T.drvo);b.set(0,7,4,T.zlato);for(let i=1;i<=4;i++){b.set(i,7,4,T.daske);b.set(-i,7,4,T.daske);b.set(0,7+i,4,T.daske);if(7-i>2)b.set(0,7-i,4,T.daske);
      if(i>1){b.set(i,8,4,T.vuna_b);b.set(-i,6,4,T.vuna_b);b.set(-1,7+i,4,T.vuna_b);if(7-i>2)b.set(1,7-i,4,T.vuna_b);}}
    for(let x=-5;x<=5;x++)if(Math.abs(x)>3)b.set(x,0,-4,T.daske);for(let z=-4;z<=-1;z++){b.set(-5,0,z,T.daske);b.set(5,0,z,T.daske);}
    b.set(4,0,-2,T.sijeno);b.set(4,1,-2,T.sijeno);b.set(-4,0,-2,T.bundeva);b.set(-4,0,-3,T.lubenica);b.set(4,0,2,T.bacva);b.set(-4,0,2,T.lampion);return ZB.out(b);},
  "zivotinje/2"(){const b=BP();ZB.floor(b,-4,-3,4,3,T.mahovina);b.box(-4,0,-3,4,3,3,T.staklo,true);
    for(let x=-4;x<=4;x+=2)for(let y=0;y<=3;y++){b.set(x,y,-3,T.bijela);b.set(x,y,3,T.bijela);}for(let y=0;y<=3;y++){b.set(-4,y,0,T.bijela);b.set(4,y,0,T.bijela);}
    b.box(-4,0,-3,4,0,3,T.bijela,true);ZB.door(b,1,3);b.box(-4,4,-3,4,4,3,T.bijela,true);
    for(let k=1;k<=3;k++){b.box(-4,4+k,-3+k,4,4+k,-3+k,T.staklo);b.box(-4,4+k,3-k,4,4+k,3-k,T.staklo);b.set(-4,4+k,-3+k,T.bijela);b.set(4,4+k,-3+k,T.bijela);b.set(-4,4+k,3-k,T.bijela);b.set(4,4+k,3-k,T.bijela);}
    b.box(-4,7,0,4,7,0,T.bijela);b.set(-4,5,0,T.staklo);b.set(4,5,0,T.staklo);b.set(-4,6,0,T.staklo);b.set(4,6,0,T.staklo);b.set(-4,5,-1,T.staklo);b.set(4,5,-1,T.staklo);b.set(-4,5,1,T.staklo);b.set(4,5,1,T.staklo);
    b.set(-2,0,-1,T.breza_d);b.set(-2,1,-1,T.breza_d);b.set(-2,2,-1,T.breza_d);b.ball(-2,3,-1,1.3,T.tresnja,true);b.set(2,0,-2,T.lisce);b.set(3,0,-2,T.lisce);b.set(3,1,-2,T.jesen);b.set(2,0,1,T.bundeva);b.set(-3,0,2,T.lubenica);
    b.set(0,0,-2,T.oranica);b.set(1,0,-2,T.oranica);b.set(-3,0,-2,T.lampion);b.set(3,0,1,T.bacva);b.set(0,4,0,T.svjetlo);b.set(-5,0,4,T.lisce);b.set(5,0,4,T.lisce);b.set(3,0,4,T.lampion);return ZB.out(b);},
  "znanost/1"(){const b=BP();ZB.disc(b,4.3,T.kaldrma);b.cyl(0,0,3.4,T.kamen);b.set(0,0,0,T.zar);b.cyl(1,9,1.5,T.bijela);b.cyl(5,5,1.5,T.vuna_c);b.cyl(1,1,1.5,T.kamen);
    b.set(0,7,1,T.staklo);b.set(0,8,1,T.staklo);b.set(1,7,0,T.staklo);b.set(-1,7,0,T.staklo);b.set(0,3,1,T.vuna_t);b.set(0,4,1,T.vuna_t);
    b.cyl(10,11,.9,T.vuna_c);b.set(0,12,0,T.vuna_c);b.set(0,13,0,T.vuna_c);b.set(0,14,0,T.zlato);
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(d=>{b.set(d[0]*2,1,d[1]*2,T.vuna_c);b.set(d[0]*2,2,d[1]*2,T.vuna_c);b.set(d[0]*2,3,d[1]*2,T.vuna_c);b.set(d[0]*3,1,d[1]*3,T.vuna_c);});
    for(let y=0;y<=10;y++){b.set(-4,y,-2,T.tuf);if(y%2===0)b.set(-4,y,-1,T.tuf);}b.set(-3,8,-2,T.daske);b.set(-2,8,-2,T.daske);b.set(-3,8,-1,T.daske);b.set(-2,8,-1,T.daske);b.set(-4,11,-2,T.svjetlo);b.set(-3,4,-2,T.daske);b.set(-2,4,-1,T.daske);
    ZB.house(b,2,2,4,4,0,1,T.kvarc,T.kvarc);b.box(2,2,2,4,2,4,T.kvarc);b.set(3,1,2,T.staklo);b.set(2,1,3,T.staklo);b.set(3,3,3,T.kamen);b.set(3,4,3,T.kamen);b.set(3,5,3,T.kristal);b.set(-3,0,3,T.lampion);b.set(3,0,-3,T.lampion);return ZB.out(b);},
  "znanost/2"(){const b=BP();ZB.floor(b,-5,-4,4,4,T.kaldrma);ZB.house(b,-4,-3,3,3,0,3,T.kvarc,T.kvarc);ZB.door(b,0,3);
    for(let x=-3;x<=2;x++){if(x!==0){b.set(x,1,3,T.staklo);b.set(x,2,3,T.staklo);}b.set(x,2,-3,T.staklo);}for(let z=-2;z<=2;z++){b.set(-4,2,z,T.staklo);b.set(3,1,z,T.staklo);b.set(3,2,z,T.staklo);}
    b.box(-4,4,-3,3,4,3,T.kvarc);b.box(-5,4,-4,4,4,4,T.prizcigla,true);b.set(-2,1,-2,T.led);b.set(-2,2,-2,T.kristal);b.set(1,1,-2,T.stol);b.set(2,1,-2,T.polica2);b.set(-3,1,1,T.kristal);b.set(0,3,0,T.svjetlo);
    b.cyl(5,5,2.6,T.staklo,true,-1,0);b.cyl(6,6,2.1,T.staklo,true,-1,0);b.cyl(7,7,1.3,T.staklo,false,-1,0);b.set(-1,5,0,T.kristal);b.set(-1,6,0,T.ametist);
    b.set(3,5,-3,T.kamen);b.set(3,6,-3,T.kamen);b.set(3,7,-3,T.bijela);b.set(2,7,-3,T.bijela);b.set(3,7,-2,T.bijela);b.set(2,8,-2,T.bijela);b.set(3,8,-3,T.zlato);
    for(let y=5;y<=8;y++)b.set(3,y,3,T.tuf);b.set(3,9,3,T.svjetlo);b.set(-5,0,4,T.lampion);b.set(4,0,4,T.lampion);b.set(-5,0,-1,T.prizmarin);b.set(-5,1,-1,T.kristal);return ZB.out(b);},
  "zivot/1"(){const b=BP();ZB.floor(b,-5,-3,5,5,T.kaldrma);ZB.house(b,-4,-3,4,2,0,3,T.bdaske,T.vuna_r);b.box(-4,0,-3,4,0,2,T.vuna_r,true);ZB.door(b,0,2);
    for(let x=-3;x<=3;x++)if(x&&Math.abs(x)!==4){b.set(x,1,2,T.staklo);b.set(x,2,2,T.staklo);}b.set(-4,2,0,T.staklo);b.set(4,2,0,T.staklo);b.set(-2,2,-3,T.staklo);b.set(2,2,-3,T.staklo);
    for(let x=-4;x<=4;x++){b.set(x,3,3,(x+4)%2?T.vuna_b:T.vuna_r);b.set(x,3,4,(x+4)%2?T.vuna_b:T.vuna_r);}b.set(-4,0,4,T.bijela);b.set(-4,1,4,T.bijela);b.set(-4,2,4,T.bijela);b.set(4,0,4,T.bijela);b.set(4,1,4,T.bijela);b.set(4,2,4,T.bijela);
    b.box(-4,4,-3,4,4,2,T.bdaske);b.box(-5,4,-4,5,4,3,T.vuna_r,true);b.set(-2,1,-1,T.stol);b.set(2,1,-1,T.bacva);b.set(0,3,0,T.svjetlo);b.set(-3,1,-2,T.bundeva);b.set(3,1,-2,T.lubenica);
    b.cyl(5,5,1.2,T.pjescenjak,false,0,-1);b.cyl(6,6,1.7,T.pjescenjak,false,0,-1);b.cyl(7,8,1.7,T.vuna_r,false,0,-1);b.cyl(9,9,1.2,T.vuna_b,false,0,-1);b.set(0,10,-1,T.vuna_b);b.set(0,11,-1,T.crvena);
    b.set(1,8,0,T.vuna_z);b.set(-1,9,-1,T.vuna_p);b.set(0,8,-3,T.vuna_l);b.set(-2,7,-1,T.vuna_n);
    b.set(-2,0,4,T.daske);b.set(2,0,4,T.daske);b.set(-5,0,5,T.lampion);b.set(5,0,5,T.lampion);return ZB.out(b);},
  "zivot/2"(){const b=BP();ZB.floor(b,-3,-3,3,3,T.daske);ZB.house(b,-3,-3,3,3,0,3,T.cigla,T.kcigla);ZB.door(b,0,3);b.set(0,2,3,T.lampion);
    [[-2,1,3],[2,1,3],[-3,1,0],[3,1,0],[0,1,-3]].forEach(p=>{b.set(p[0],p[1],p[2],T.staklo);b.set(p[0],p[1]+1,p[2],T.staklo);});
    b.box(-3,4,-3,3,4,3,T.daske);b.box(-3,4,4,3,4,4,T.daske);b.box(-3,5,5,3,5,5,0);[-3,-1,1,3].forEach(x=>b.set(x,5,4,T.tdaske));b.set(-3,0,4,T.tdaske);b.set(-3,1,4,T.tdaske);b.set(-3,2,4,T.tdaske);b.set(-3,3,4,T.tdaske);b.set(3,0,4,T.tdaske);b.set(3,1,4,T.tdaske);b.set(3,2,4,T.tdaske);b.set(3,3,4,T.tdaske);
    ZB.house(b,-3,-3,3,3,5,7,T.bijela,T.tdaske);b.box(-3,5,-3,3,5,-3,T.bijela);b.set(0,5,3,0);b.set(0,6,3,0);[[-2,6,3],[2,6,3],[-3,6,0],[3,6,0],[0,6,-3]].forEach(p=>b.set(p[0],p[1],p[2],T.staklo));
    for(let x=-3;x<=3;x+=3){b.set(x,5,3,T.tdaske);b.set(x,6,3,T.tdaske);b.set(x,7,3,T.tdaske);}b.set(0,5,3,0);b.set(0,6,3,0);b.set(0,7,0,T.svjetlo);b.set(0,3,0,T.svjetlo);
    ZB.gable(b,-3,-3,3,3,8,T.krov,T.bijela);for(let y=8;y<=12;y++)b.set(2,y,-2,T.cigla);b.set(2,13,-2,T.kamen);
    for(let x=-5;x<=5;x++)if(Math.abs(x)>1&&Math.abs(x)!==3)b.set(x,0,5,T.bdaske);for(let z=-3;z<=5;z++){b.set(-5,0,z,T.bdaske);b.set(5,0,z,T.bdaske);}
    ZB.tree(b,-5,-4,4,T.lisce_b,T.breza_d);b.set(4,0,1,T.lisce);b.set(4,0,-1,T.tresnja);b.set(-4,0,2,T.lisce);b.set(4,0,4,T.lampion);b.set(-4,0,-1,T.bundeva);return ZB.out(b);}
});
function bldName(b){const a=BLD[b.genre];return (a&&a[b.bld||0]||a[0])[0];}
/* little isometric picture of a design, painted from its blocks */
const bldThumbC={};
function bldThumb(key){if(bldThumbC[key])return bldThumbC[key];const L=blueprint(key).filter(p=>p[3]).slice().sort((p,q)=>(p[0]+p[2]+p[1]*.01)-(q[0]+q[2]+q[1]*.01)||p[1]-q[1]);
  let maxY=1;for(const p of L)maxY=Math.max(maxY,p[1]);const c=document.createElement("canvas");c.width=c.height=220;const x=c.getContext("2d");const s=Math.min(9.5,150/(maxY+9));const ox=110,oy=205-5.5*s;
  const sh=(col,k)=>"rgb("+Math.round(Math.min(255,col.r*255*k))+","+Math.round(Math.min(255,col.g*255*k))+","+Math.round(Math.min(255,col.b*255*k))+")";const col=new THREE.Color();
  L.sort((p,q)=>(p[0]+p[2]+p[1])-(q[0]+q[2]+q[1]));
  for(const p of L){const ty=TYPES[p[3]];if(!ty)continue;col.set(ty.c);const px=ox+(p[0]-p[2])*s,py=oy+(p[0]+p[2])*s*.5-p[1]*s;const gl=ty.glass?.75:1;x.globalAlpha=gl;
    x.fillStyle=sh(col,1.12);x.beginPath();x.moveTo(px,py-s);x.lineTo(px+s,py-s*.5);x.lineTo(px,py);x.lineTo(px-s,py-s*.5);x.fill();
    x.fillStyle=sh(col,.78);x.beginPath();x.moveTo(px-s,py-s*.5);x.lineTo(px,py);x.lineTo(px,py+s);x.lineTo(px-s,py+s*.5);x.fill();
    x.fillStyle=sh(col,.6);x.beginPath();x.moveTo(px+s,py-s*.5);x.lineTo(px,py);x.lineTo(px,py+s);x.lineTo(px+s,py+s*.5);x.fill();}
  x.globalAlpha=1;return bldThumbC[key]=c.toDataURL();}
/* where a building fits best: every plot gets a short description, and each kind of book has a favourite */
function plotInfo(i){const p=PLOTS[i];const shore=islandR(p.a)-24,mt=Math.hypot(p.x-MX,p.z-MZ),gv=Math.hypot(p.x-SITES.vrt.x,p.z-SITES.vrt.z),tr=Math.hypot(p.x-SITES.trznica.x,p.z-SITES.trznica.z);
  const sh3=PLOTS.map(q=>islandR(q.a)-24).sort((u,v)=>u-v)[2];const tags=[];if(shore<=sh3)tags.push("bliže moru");if(mt<44)tags.push("pod planinom");if(gv<22)tags.push("kraj vrta");if(tr<22)tags.push("kraj tržnice");if(!tags.length)tags.push("na mirnoj čistini");
  return {shore,mt,gv,tr,h:p.h,t:tags.join(", ")};}
function plotScore(g,i){const f=plotInfo(i);return g==="misterij"||g==="avantura"?-f.shore:g==="znanost"?-f.mt:g==="zivotinje"?-f.gv:g==="zivot"?-f.tr:Math.min(f.gv,f.tr)+f.shore*.3;}
const PLOT_WHY={misterij:"Svjetlo i tajne najbolje čuvaju obalu.",avantura:"Pustolovi vole biti blizu mora.",znanost:"Pod planinom je nebo najčišće.",zivotinje:"Životinje vole biti blizu vrta.",zivot:"Blizu tržnice je uvijek veselo.",fantazija:"Čarolija voli mirna, skrivena mjesta."};
function plotMap(cv,sel,best,onPick){const full=document.createElement("canvas");drawMap(full);const R=44,S2=full.width/W;cv.width=cv.height=440;const x=cv.getContext("2d");x.imageSmoothingEnabled=false;
  x.drawImage(full,(CX-R)*S2,(CZ-R)*S2,R*2*S2,R*2*S2,0,0,440,440);const k=440/(R*2);
  PLOTS.forEach((p,i)=>{const px=(p.x-CX+R)*k,pz=(p.z-CZ+R)*k;const bk=S.books.find(b=>b.plot===i);x.beginPath();x.arc(px,pz,i===sel?19:14,0,7);
    x.fillStyle=bk?"rgba(40,50,70,.55)":i===sel?"#ffc53d":"#ffffff";x.fill();x.lineWidth=i===sel?5:3;x.strokeStyle=bk?"rgba(255,255,255,.5)":i===best?"#2f9a48":"#16243a";x.stroke();
    x.fillStyle=bk?"#fff":"#16243a";x.font="700 15px sans-serif";x.textAlign="center";x.textBaseline="middle";x.fillText(bk?"×":i===best?"★":"",px,pz+1);});
  cv.onclick=e=>{const r=cv.getBoundingClientRect();const mx=(e.clientX-r.left)/r.width*440,mz=(e.clientY-r.top)/r.height*440;let bi=-1,bd=40;
    PLOTS.forEach((p,i)=>{if(S.books.some(b=>b.plot===i))return;const d=Math.hypot((p.x-CX+R)*k-mx,(p.z-CZ+R)*k-mz);if(d<bd){bd=d;bi=i;}});if(bi>=0)onPick(bi);};}
function bldCards(g,sel){return '<div class="bldpick">'+BLD[g].map((d,i)=>'<button class="bldc" data-b="'+i+'" aria-pressed="'+(i===sel)+'"><img alt="" src="'+bldThumb(i?g+"/"+i:g)+'"><b>'+d[0]+'</b><span>'+d[1]+'</span></button>').join("")+'</div>';}
/* new book: details, then the design, then the place */
sheetNewBook=function(pre){const st=pre||{t:"",a:"",p:"",genre:null,bld:0,plot:-1};const used=S.books.map(b=>b.genre);
  openSheet('<h2>Nova knjiga</h2><p class="muted">Korak 1 od 3</p><div class="field"><label for="nbT">Naslov</label><input type="text" id="nbT" maxlength="70" autocomplete="off" placeholder="npr. Čudnovate zgode šegrta Hlapića" value="'+esc(st.t)+'"></div>'+
   '<div class="field"><label for="nbA">Autor (ako znaš)</label><input type="text" id="nbA" maxlength="50" autocomplete="off" value="'+esc(st.a)+'"></div>'+
   '<div class="field"><label for="nbP">Koliko knjiga ima stranica?</label><input type="number" id="nbP" min="5" max="3000" inputmode="numeric" placeholder="npr. 180" value="'+esc(st.p)+'"></div>'+
   '<div class="field"><span class="lbl">Kakva je to knjiga? Za svaku vrstu biraš jednu od tri građevine.</span><div class="genres">'+
   Object.keys(GENRES).map(k=>{const G=GENRES[k];return '<button class="genre" data-g="'+k+'" aria-pressed="'+(st.genre===k)+'"><i style="background:'+G.col+'"></i><b>'+G.n+'</b><span>'+BLD[k].map(d=>d[0]).join(", ")+(used.includes(k)?" (još jedna!)":"")+'</span><span>'+G.d+'</span></button>';}).join("")+'</div></div>'+
   '<p class="err" id="nbErr" hidden></p><button class="btn big" id="nbGo">Dalje: odaberi građevinu</button>');
  $("sheetBody").querySelectorAll(".genre").forEach(g=>g.onclick=()=>{sfx.click();if(st.genre!==g.dataset.g){st.bld=0;st.plot=-1;}st.genre=g.dataset.g;$("sheetBody").querySelectorAll(".genre").forEach(x=>x.setAttribute("aria-pressed",String(x===g)));});
  $("nbGo").onclick=()=>{const t=$("nbT").value.trim(),p=parseInt($("nbP").value,10);const err=m=>{$("nbErr").textContent=m;$("nbErr").hidden=false;};
    if(!t)return err("Upiši naslov knjige.");if(!(p>=5&&p<=3000))return err("Upiši broj stranica (barem 5).");if(!st.genre)return err("Odaberi kakva je knjiga.");
    if(!PLOTS.some((_,i)=>!S.books.some(b=>b.plot===i)))return err("Na otoku više nema mjesta.");st.t=t;st.a=$("nbA").value.trim();st.p=p;sfx.click();nbStep2(st);};};
function nbStep2(st){openSheet('<h2>Što će izrasti?</h2><p class="muted">Korak 2 od 3 · '+esc(st.t)+'</p>'+bldCards(st.genre,st.bld)+
    '<p class="muted">Kad završiš knjigu, u građevini te čeka: <b>'+BACT[st.genre][0]+'</b>. '+BACT[st.genre][1]+'</p><div class="row"><button class="btn soft" id="nbBack">Natrag</button><button class="btn big" id="nbGo">Dalje: odaberi mjesto</button></div>');
  $("sheetBody").querySelectorAll(".bldc").forEach(c=>c.onclick=()=>{sfx.click();st.bld=+c.dataset.b;$("sheetBody").querySelectorAll(".bldc").forEach(x=>x.setAttribute("aria-pressed",String(x===c)));});
  $("nbBack").onclick=()=>{sfx.click();sheetNewBook(st);};$("nbGo").onclick=()=>{sfx.click();nbStep3(st);};}
function nbStep3(st){const free=PLOTS.map((_,i)=>i).filter(i=>!S.books.some(b=>b.plot===i));const best=free.slice().sort((a,b)=>plotScore(st.genre,b)-plotScore(st.genre,a))[0];if(st.plot<0||!free.includes(st.plot))st.plot=best;
  openSheet('<h2>Gdje gradimo?</h2><p class="muted">Korak 3 od 3 · '+BLD[st.genre][st.bld][0]+'</p><div class="rida">'+RIDA_SVG+'<div class="say">Ja bih gradila na mjestu sa zvjezdicom. '+PLOT_WHY[st.genre]+' Ali ti biraš: dotakni bilo koji bijeli krug!</div></div>'+
    '<canvas id="nbMap" class="mapcv" aria-label="Karta slobodnih mjesta"></canvas><p id="nbWhere" style="font-weight:600;text-align:center"></p><div class="row"><button class="btn soft" id="nbBack">Natrag</button><button class="btn big" id="nbGo">Posadi knjigu</button></div>');
  const draw=()=>{plotMap($("nbMap"),st.plot,best,i=>{sfx.click();st.plot=i;draw();});$("nbWhere").textContent="Odabrano mjesto: "+plotInfo(st.plot).t+(st.plot===best?" (Ridin prijedlog)":"");};draw();
  $("nbBack").onclick=()=>{sfx.click();nbStep2(st);};
  $("nbGo").onclick=()=>{if(S.books.some(b=>b.plot===st.plot))return;const b={id:"b"+Date.now().toString(36),title:st.t,author:st.a,pages:st.p,page:0,genre:st.genre,plot:st.plot,started:today(),done:false,stars:0};if(st.bld)b.bld=st.bld;
    S.books.push(b);save();closeSheet();shown[b.id]=0;sfx.chime();paveFor(b);const plot=PLOTS[b.plot];flyTo(plot.x+.5,plot.h+3,plot.z+.5,38);
    ridaGo(plot,()=>say(rida,"Ovdje će niknuti "+bldName(b)+"! Što više čitaš, to više raste.",6000));setTimeout(()=>growBook(b,()=>{syncSigns();renderHUD();}),1500);syncSigns();};}
/* rebuild a book's building in another design */
function bldRebuild(b,n){const plot=PLOTS[b.plot];if(!plot||falling.some(f=>f.b===b))return;const L=blueprint(bkey(b));
  for(const p of L){const x=plot.x+p[0],y=plot.h+p[1],z=plot.z+p[2];setV(x,y,z,p[1]<0?T.trava:0,true);delete S.edits[x+","+y+","+z];}
  if(n)b.bld=n;else delete b.bld;shown[b.id]=0;save();lightBox(plot.x-8,plot.x+8,plot.z-8,plot.z+8);for(let dz=-8;dz<=8;dz+=4)for(let dx=-8;dx<=8;dx+=4)markDirty(plot.x+dx,plot.z+dz);
  sfx.chime();if(!FP.on)flyTo(plot.x+.5,plot.h+4,plot.z+.5,36);burst(plot.x+.5,plot.h+3,plot.z+.5,90,[[1,.9,.5],[1,1,1],[.7,.9,1]],4,3,1.2);
  setTimeout(()=>growBook(b,()=>{syncSigns();toast(bldName(b)+" je gotova!");}),500);}
function sheetRebuild(b){let sel=b.bld||0;const price=b.reno?80:0;
  openSheet('<h2>Preuredi građevinu</h2><p class="muted">'+esc(b.title)+' · '+(price?'Preuređenje stoji '+price+' zlatnika.':'Prvo preuređenje je besplatno.')+'</p>'+bldCards(b.genre,sel)+'<p class="err" id="rbErr" hidden></p><div class="row"><button class="btn soft" id="rbNo">Odustani</button><button class="btn big" id="rbGo">Preuredi</button></div>');
  $("sheetBody").querySelectorAll(".bldc").forEach(c=>c.onclick=()=>{sfx.click();sel=+c.dataset.b;$("sheetBody").querySelectorAll(".bldc").forEach(x=>x.setAttribute("aria-pressed",String(x===c)));});
  $("rbNo").onclick=()=>sheetBuilding(b);$("rbGo").onclick=()=>{if(sel===(b.bld||0)){$("rbErr").textContent="To je građevina koju već imaš. Odaberi drugu.";$("rbErr").hidden=false;return;}
    if(S.coins<price){$("rbErr").textContent="Treba ti "+price+" zlatnika.";$("rbErr").hidden=false;return;}S.coins-=price;b.reno=(b.reno||0)+1;renderEco();closeSheet();bldRebuild(b,sel);};}
/* the building's own page */
function bldUsed(b){return S.bldDay&&S.bldDay[b.id]===today();}
function sheetBuilding(b){const G=GENRES[b.genre],A=BACT[b.genre],pct=Math.round(100*b.page/b.pages);
  openSheet('<div class="bhead"><img alt="" class="bldbig" src="'+bldThumb(bkey(b))+'"><div><h2>'+esc(bldName(b))+'</h2><p class="muted">'+esc(b.title)+(b.author?' · '+esc(b.author):'')+'</p><div class="prog"><i style="width:'+pct+'%;background:'+G.col+'"></i></div><small class="muted">'+(b.done?'Knjiga je pročitana. Građevina je gotova!':'Pročitano '+b.page+' od '+b.pages+' stranica. Građevina raste dok čitaš.')+'</small></div></div>'+
    '<div class="earn"><b>'+A[0]+'</b><span>'+(b.done?(bldUsed(b)?'Danas si već bila ovdje. Dođi opet sutra!':A[1]+' Jednom dnevno, uz nagradu.'):'Otključava se kad pročitaš knjigu do kraja.')+'</span></div>'+
    '<div class="row">'+(b.done?'<button class="btn big" id="bdAct"'+(bldUsed(b)?' disabled':'')+'>'+A[0]+'</button>':'<button class="btn big" id="bdRead">Upiši stranice</button>')+'<button class="btn soft" id="bdRe">Preuredi</button></div>');
  if($("bdRead"))$("bdRead").onclick=()=>{sfx.click();sheetProgress(b);};if($("bdAct"))$("bdAct").onclick=()=>{sfx.click();BGAME[b.genre](b);};$("bdRe").onclick=()=>{sfx.click();sheetRebuild(b);};}
function bldPay(b,tier,line){S.bldDay=S.bldDay||{};for(const k in S.bldDay)if(S.bldDay[k]!==today())delete S.bldDay[k];S.bldDay[b.id]=today();const c=[15,28,45][tier]+Math.floor(Math.random()*8);S.coins+=c;const items=[rwItem("coins",c)];
  const gift={fantazija:"kristal",misterij:"lampion",avantura:"zlato",zivotinje:"sijeno",znanost:"kristal",zivot:"cigla"}[b.genre];if(tier>=1&&T[gift]){const n=tier===2?3:1;giveN(gift,n);items.push(rwItem(gift,n));}
  if(tier===2&&S.tickets<12){S.tickets++;items.push({ic:itemIcon("ticket"),n:"Karta za igre",cnt:1,rar:"r"});}save();renderEco();closeSheet();
  rewardReveal({kicker:BACT[b.genre][0],title:bldName(b),items,sub:line||["Dobro!","Odlično!","Savršeno!"][tier]});}
const BGAME={
  fantazija(b){const pr=["Želim zlatnu kišu","Želim nešto sjajno","Želim iznenađenje"];openSheet('<h2>Zdenac želja</h2><p class="muted">Šapni jednu želju u zdenac. Svaka donosi nešto drugo, a što točno, zna samo zdenac.</p><div class="pzopts">'+pr.map((t,i)=>'<button class="btn" data-w="'+i+'">'+t+'</button>').join("")+'</div>');
    $("sheetBody").querySelectorAll("[data-w]").forEach(x=>x.onclick=()=>{const r=Math.random();bldPay(b,r<.25?2:r<.7?1:0,"Zdenac je čuo tvoju želju.");});},
  misterij(b){const cols=["#ffd34d","#5fb8ff","#ff7a8a","#7fe08a"],seq=[];for(let i=0;i<6;i++)seq.push(Math.floor(Math.random()*4));let len=3,pos=0,busy=true,miss=0;
    openSheet('<h2>Tajni signal</h2><p class="muted">Svjetla šalju tajnu poruku. Gledaj redoslijed, pa ga ponovi. Tri kruga, svaki je duži.</p><div class="mel">'+cols.map((c,i)=>'<button class="cr" style="--c:'+c+'" data-i="'+i+'" aria-label="Svjetlo '+(i+1)+'"></button>').join("")+'</div><p class="pzmsg" id="sgMsg">Gledaj...</p>');
    const el=i=>$("sheetBody").querySelector('[data-i="'+i+'"]');const flash=i=>{const e=el(i);if(!e)return;e.classList.add("lit");tone(330+i*110,.25,"sine",.05);setTimeout(()=>e.classList.remove("lit"),320);};
    const play=()=>{busy=true;pos=0;$("sgMsg").textContent="Gledaj...";for(let i=0;i<len;i++)setTimeout(()=>flash(seq[i]),600+i*520);setTimeout(()=>{busy=false;if($("sgMsg"))$("sgMsg").textContent="Sad ti!";},600+len*520);};
    $("sheetBody").querySelectorAll(".cr").forEach(x=>x.onclick=()=>{if(busy)return;const i=+x.dataset.i;flash(i);if(i!==seq[pos]){miss++;busy=true;$("sgMsg").textContent="Ups! Pogledaj još jednom.";if(miss>=3)return setTimeout(()=>bldPay(b,0,"Signal je bio težak. Sutra opet!"),700);return setTimeout(play,900);}
      pos++;if(pos>=len){if(len>=5)return setTimeout(()=>bldPay(b,miss?1:2,"Poruka glasi: ČITAJ DALJE!"),500);len++;busy=true;$("sgMsg").textContent="Točno! Sad duži signal.";setTimeout(play,800);}});play();},
  avantura(b){const N=5,tx=Math.floor(Math.random()*N),tz=Math.floor(Math.random()*N);let digs=7;
    openSheet('<h2>Karta blaga</h2><p class="muted">Blago je zakopano na jednom polju. Broj na iskopanom polju kaže koliko je koraka do blaga. Imaš <b id="dgN">7</b> kopanja.</p><div class="dig">'+Array.from({length:N*N},(_,i)=>'<button data-i="'+i+'" aria-label="Polje"></button>').join("")+'</div><p class="pzmsg" id="dgMsg">Gdje ćeš prvo kopati?</p>');
    $("sheetBody").querySelectorAll(".dig button").forEach(x=>x.onclick=()=>{if(x.disabled||digs<=0)return;const i=+x.dataset.i,cx=i%N,cz=Math.floor(i/N),d=Math.abs(cx-tx)+Math.abs(cz-tz);digs--;$("dgN").textContent=digs;x.disabled=true;sfx.pop();
      if(d===0){x.classList.add("win");x.textContent="★";return setTimeout(()=>bldPay(b,digs>=4?2:digs>=2?1:0,"Pronašla si blago!"),600);}x.textContent=d;x.style.background=["","#ffd9a0","#ffe9c4","#f3ecd8","#e4e8ee","#d5dde8","#c9d3e0","#c0cbd9","#b9c4d2"][d];
      $("dgMsg").textContent=d===1?"Vruće! Samo jedan korak.":d<=2?"Toplo...":"Hladno. Traži dalje.";if(digs<=0)setTimeout(()=>bldPay(b,0,"Blago je ostalo skriveno. Sutra nova karta!"),700);});},
  zivotinje(b){const Q=[["Zec","Hrskavo je, narančasto i raste u zemlji.","mrkva"],["Vjeverica","Tvrdo je izvana, a ukusno iznutra. Skupljam ih za zimu.","orah"],["Mačka","Bijelo je i pije se iz zdjelice.","mlijeko"],["Medo","Slatko je, zlatno i prave ga pčele.","med"],["Koka","Sitna su, žuta i rastu na klipu.","kukuruz"],["Majmun","Žuta je, savijena i guli se.","banana"],["Miš","Žut je, ima rupe i lijepo miriše.","sir"],["Konj","Crvena je ili zelena, okrugla i raste na stablu.","jabuka"]];
    const food=["mrkva","orah","mlijeko","med","kukuruz","banana","sir","jabuka"];const pick=Q.slice().sort(()=>Math.random()-.5).slice(0,3);let k=0,ok=0;
    const show=()=>{const q=pick[k];const opts=[q[2]].concat(food.filter(f=>f!==q[2]).sort(()=>Math.random()-.5).slice(0,3)).sort(()=>Math.random()-.5);
      openSheet('<h2>Gladni prijatelji</h2><p class="muted">'+(k+1)+' od 3</p><div class="pzq"><b>'+q[0]+' kaže:</b> „'+q[1]+'“</div><div class="pzopts">'+opts.map(o=>'<button class="btn" data-o="'+o+'">'+o+'</button>').join("")+'</div><p class="pzmsg" id="fdMsg"></p>');
      $("sheetBody").querySelectorAll("[data-o]").forEach(x=>x.onclick=()=>{if(x.dataset.o===q[2]){ok++;x.classList.add("ok");sfx.chime();$("fdMsg").textContent="Njam! Hvala!";}else{x.classList.add("shake");$("fdMsg").textContent="Hm, to nije to. Htio je: "+q[2]+".";}
        $("sheetBody").querySelectorAll("[data-o]").forEach(y=>y.disabled=true);k++;setTimeout(()=>{if(k>=3)bldPay(b,ok===3?2:ok===2?1:0,"Nahranila si "+ok+" od 3 prijatelja.");else show();},1100);});};show();},
  znanost(b){const C=[["Veliki medvjed","Sedam sjajnih zvijezda čini Velika kola. Dvije zadnje pokazuju prema zvijezdi Sjevernjači.",[[.08,.3],[.24,.24],[.38,.3],[.52,.4],[.56,.6],[.78,.66],[.84,.44]]],
      ["Kasiopeja","Izgleda kao slovo W. Vidi se cijele godine jer nikad ne zalazi.",[[.1,.3],[.3,.62],[.5,.4],[.7,.68],[.9,.34]]],["Labud","Leti duž Mliječne staze. Najsjajnija zvijezda mu je Deneb, u repu.",[[.5,.1],[.5,.38],[.5,.62],[.5,.9],[.14,.3],[.86,.46]]],
      ["Orion","Lovac s tri zvijezde u pojasu. Crvenkasta Betelgeza mu je na ramenu.",[[.28,.12],[.72,.16],[.42,.48],[.5,.5],[.58,.52],[.3,.88],[.74,.84]]],["Lav","Proljetno zviježđe. Glava mu izgleda kao obrnuti upitnik.",[[.18,.3],[.26,.16],[.4,.2],[.44,.4],[.3,.56],[.78,.5],[.9,.66]]]];
    const c=C[Math.floor(Math.random()*C.length)],P=c[2];let k=0,miss=0;
    openSheet('<h2>Teleskop</h2><p class="muted">Dotakni zvijezde redom, od 1 do '+P.length+', i spoji ih u zviježđe.</p><div class="sky" id="skyB"><svg viewBox="0 0 100 70" preserveAspectRatio="none" id="skyL"></svg>'+
      P.map((p,i)=>'<button style="left:'+p[0]*100+'%;top:'+p[1]*100+'%" data-i="'+i+'">'+(i+1)+'</button>').join("")+'</div><p class="pzmsg" id="skMsg"></p>');
    $("skyB").querySelectorAll("button").forEach(x=>x.onclick=()=>{const i=+x.dataset.i;if(i!==k){miss++;x.classList.add("shake");setTimeout(()=>x.classList.remove("shake"),400);return;}x.classList.add("on");tone(520+k*70,.2,"sine",.05);
      if(k>0)$("skyL").innerHTML+='<line x1="'+P[k-1][0]*100+'" y1="'+P[k-1][1]*70+'" x2="'+P[k][0]*100+'" y2="'+P[k][1]*70+'" stroke="#cfe4ff" stroke-width=".7" stroke-linecap="round"/>';k++;
      if(k>=P.length){$("skMsg").innerHTML="<b>"+c[0]+"!</b> "+c[1];sfx.chime();setTimeout(()=>bldPay(b,miss===0?2:miss<3?1:0,c[0]+": "+c[1]),3200);}});},
  zivot(b){const mine=S.answers.filter(a=>a.book===b.id);const old=mine.length?mine[Math.floor(Math.random()*mine.length)]:null;const qs=["Koji ti je trenutak iz ove knjige ostao u srcu?","Kome bi preporučila ovu knjigu i zašto?","Što bi pitala glavnog lika da ga sretneš?","Koji dio te najviše nasmijao ili iznenadio?"];const q=qs[Math.floor(Math.random()*qs.length)];
    openSheet('<h2>Kutak uspomena</h2><p class="muted">'+esc(b.title)+'</p>'+(old?'<div class="ans"><small>'+esc(old.q)+'</small>'+esc(old.a)+'</div>':'')+'<div class="rida">'+RIDA_SVG+'<div class="say">'+q+'</div></div><div class="field"><label for="meIn">Tvoja uspomena</label><textarea id="meIn" maxlength="600"></textarea></div><div class="row"><button class="btn green" id="meGo">Spremi uspomenu</button><button class="btn soft" id="meNo">Samo sam svratila</button></div>');
    $("meGo").onclick=()=>{const v=$("meIn").value.trim();if(!v){$("meIn").focus();return;}S.answers.push({book:b.id,q,a:v,d:today()});bldPay(b,2,"Uspomena je spremljena u dnevnik.");};$("meNo").onclick=()=>bldPay(b,0,"Lijepo je sjesti uz knjigu.");}
};
/* the name sign above each building opens its page, on the island view and while exploring */
{const _ss=syncSigns;syncSigns=function(){_ss.apply(this,arguments);for(const id in signs){const s=signs[id];if(!s.userData.onTap){s.userData.onTap=()=>{const b=S.books.find(x=>x.id===id);if(b){sfx.click();sheetBuilding(b);}};tapObjs.push(s);}}
  for(let i=tapObjs.length-1;i>=0;i--){const o=tapObjs[i];if(o.userData.book&&!signs[o.userData.book])tapObjs.splice(i,1);}};}
