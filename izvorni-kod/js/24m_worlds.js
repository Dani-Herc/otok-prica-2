/* =================== v16: separate worlds through the magic portal. First world: Svijet oblaka =================== */
var WORLD=null;
const WORLDS={
  oblaci:{n:"Svijet oblaka",d:"Lebdeći otoci iznad mora oblaka, dugini mostovi, vjetrovi koji nose i Dvorac duge. Vjetar je raznio deset zvjezdanih kamenčića!",lv:3},
  led:{n:"Ledeno kraljevstvo",d:"Dolina pod polarnom svjetlošću: zaleđeno jezero za klizanje, ledena špilja, vrela gejziri, tobogan s planine i Ledena palača. Ovdje žive mamutić, irvas koji lebdi i bijeli medvjedić!",lv:6},
  more:{n:"Podvodni grad",d:"Potonuli grad, koraljni grebeni i svijetleće meduze.",lv:9,soon:1},
  dzungla:{n:"Džungla dinosaura",d:"Gusta džungla, vulkan i dobroćudni dinosauri.",lv:12,soon:1}};
/* per-world wiring: generator, sky, life, collectible names, the finale; later worlds add their own entry */
const WDEF={};
const WSTAR_N=10;
const wStars=id=>Object.keys((S.wst&&S.wst[id])||{}).length;
{const _ex=exXP;exXP=function(){let n=_ex();for(const id in (S.wst||{}))n+=15*wStars(id);return n;};}
PRESETS.oblaci={top:0x4a8ef0,hz:0xffd4ea,sun:0xfff0dc,si:2.25,hemi:.72,el:.58,az:.9,fog:0xdccff8,glow:.45,stars:0,sh:0x8ad8f0,dp:0x3a8ad8,exp:.94,night:0};
{const _st=setTime;setTime=function(p,inst){return _st(WORLD?(WDEF[WORLD]&&WDEF[WORLD].preset||"oblaci"):p,inst);};}
{const _wa=waterAt;waterAt=function(x,y,z){if(WORLD){const t=get(Math.floor(x),Math.floor(y),Math.floor(z));if(!t||!TYPES[t].water)return false;}return _wa(x,y,z);};}

/* ---------- world-only rewards in the shop ---------- */
MSKIN.nebeska={n:"Nebeska lisica",d:"Plava kao nebo iznad oblaka, a za njom svjetlucaju kristalići.",p:0,rar:"l",O:0x8cc8ff,W:0xffffff,B:0x26346e,D:0x4a7ad8,fx:"kristal",wr:"Svijet oblaka"};
MTRAIL.oblacici={n:"Oblačići",d:"Iza Ride ostaju mali mekani oblačići.",p:0,rar:"l",wr:"Svijet oblaka"};
TR.oblacici=p=>mgSpawn({t:"puff",x:p.x,y:p.y+.25,z:p.z,vy:.35,life:1.5,size:.3,size2:.62,col:[0xffffff,0xfff0fa,0xeef6ff],drag:.6,op:.95});TRATE.oblacici=6;
{const ins=(cat,k,o)=>{const it=mgAdd(cat,k,o);MCAT.pop();let at=-1;MCAT.forEach((x,i)=>{if(x.cat===cat)at=i;});MCAT.splice(at+1,0,it);};ins("skin","nebeska",MSKIN.nebeska);ins("trail","oblacici",MTRAIL.oblacici);}
{const _ms=mgShape;mgShape=function(x,k,fill,ol){if(k==="puff"){x.save();x.fillStyle=fill;[[24,36,13],[38,32,15],[30,24,11],[46,40,9]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fill();});x.restore();return;}return _ms.apply(this,arguments);};}

/* ---------- the voxel generator for Svijet oblaka ---------- */
const WG={stars:[],wind:[],isl:{},gate:[],portal:null,spawn:null,npcs:[],floor:10.5,gateOpen:false};
function wput(x,y,z,t,pr){if(!inb(x,y,z))return;const i=I(x,y,z);vox[i]=t;if(pr)prot[i]=1;}
const RBOW=()=>[T.vuna_c,T.vuna_n,T.vuna_z,T.vuna_l,T.vuna_p,T.vuna_t,T.vuna_lj];
function wIsland(k,cx,cz,ty,r,o){o=o||{};const R=Math.ceil(r*1.3),sd=(cx*7+cz*3)%97;
  for(let x=cx-R;x<=cx+R;x++)for(let z=cz-R;z<=cz+R;z++){if(x<1||z<1||x>=W-1||z>=W-1)continue;const dx=x-cx,dz=z-cz,a=Math.atan2(dz,dx);
    const rr=r*(.84+.32*fbm(Math.cos(a)*1.3+sd,Math.sin(a)*1.3-sd));const d=Math.hypot(dx,dz)/rr;if(d>=1)continue;
    const top=ty+(o.flat?0:Math.round((fbm(x*.11+sd,z*.11)-.5)*(o.bump||2.4)*(1-d*d)));
    const depth=Math.max(2,Math.round((1-d*d)*r*(o.deep||.85)*(.65+.7*fbm(x*.21,z*.21+sd))));
    for(let y=top-depth;y<=top;y++){let t=y===top?(o.top||T.trava):y>top-3?(o.sub||T.zemlja):T.kamen;if(t===T.kamen){const h=hash3(x,y,z);if(h<.025)t=T.r_bakar;else if(h<.04)t=T.r_zeljezo;else if(h<.046)t=T.r_zlato;else if(h<.05)t=T.ametist;}wput(x,y,z,t);}
    if(d>.78&&hash2(x,z,11)<.5){const cy=top-depth+Math.floor(hash2(x,z,12)*3);wput(x,cy-1,z,T.oblak);if(hash2(x,z,13)<.5)wput(x,cy-2,z,T.oblak);}}
  WG.isl[k]={x:cx,z:cz,y:ty,r};}
const wTopAt=(x,z,y)=>floorY(x+.5,y==null?H-1:y,z+.5);
function wTree(x,z,leaf,trunk,hmin){const y=wTopAt(x,z);if(y<0)return -1;const h=(hmin||4)+Math.floor(hash2(x,z,3)*3);for(let i=1;i<=h;i++)wput(x,y+i,z,trunk||T.drvo);const cy=y+h;
  for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++)for(let dy=-1;dy<=2;dy++){const d=dx*dx+dz*dz+dy*dy*1.6;if(d<=7.5&&!(dx===0&&dz===0&&dy<1)&&hash3(x+dx,cy+dy,z+dz)<.9&&!get(x+dx,cy+dy,z+dz))wput(x+dx,cy+dy,z+dz,leaf||T.lisce);}
  return cy;}
function wPad(x,y,z,r,t){const c=Math.ceil(r);for(let dx=-c;dx<=c;dx++)for(let dz=-c;dz<=c;dz++){const d=Math.hypot(dx,dz);if(d>r)continue;wput(x+dx,y,z+dz,T.oblak);if(d<r-.7&&hash2(x+dx,z+dz,9)<.65)wput(x+dx,y-1,z+dz,T.oblak);}if(t)wput(x,y,z,t);}
function edgeP(a,b,f){const dx=b.x-a.x,dz=b.z-a.z,L=Math.hypot(dx,dz);const x=Math.round(a.x+dx/L*a.r*f),z=Math.round(a.z+dz/L*a.r*f);return {x,z,y:wTopAt(x,z,a.y+4)};}
function wSteps(A,B,o){o=o||{};const a=edgeP(A,B,.78),b=edgeP(B,A,.78);const D=Math.hypot(b.x-a.x,b.z-a.z);let n=Math.max(2,Math.round(D/(o.gap||4.4)));const rise=b.y-a.y;
  const bounce=rise/n>1;const pads=[];for(let i=1;i<n;i++){const t=i/n;const sx=Math.sin(t*Math.PI)*(o.wig||2);const L=D||1,px=-(b.z-a.z)/L,pz=(b.x-a.x)/L;
    const x=Math.round(a.x+(b.x-a.x)*t+px*sx),z=Math.round(a.z+(b.z-a.z)*t+pz*sx),y=Math.round(a.y+rise*t);pads.push({x,y,z});wPad(x,y,z,1.6,bounce?T.skocni:0);}
  if(bounce)wput(a.x,a.y,a.z,T.skocni);return pads;}
function wRainbow(A,B,h){const a=edgeP(A,B,.7),b=edgeP(B,A,.7),C=RBOW();const dx=b.x-a.x,dz=b.z-a.z,L=Math.hypot(dx,dz),px=-dz/L,pz=dx/L,n=Math.ceil(L*4);
  h=Math.max(0,Math.min(h,(.55*L-Math.abs(b.y-a.y))/Math.PI));const cells=new Map();let mid=null;
  for(let i=0;i<=n;i++){const t=i/n;const cx=a.x+.5+dx*t,cz=a.z+.5+dz*t,cy=a.y+(b.y-a.y)*t+Math.sin(Math.PI*t)*h;
    for(let j=-3.4;j<=3.4;j+=.5){const X=Math.floor(cx+px*j),Z=Math.floor(cz+pz*j),k=X+","+Z;const c=cells.get(k);const Y=Math.round(cy),col=C[Math.max(0,Math.min(6,Math.round(j+3)))];
      if(!c||Y>c.y||(Y===c.y&&Math.abs(j)<c.j))cells.set(k,{X,Z,y:Y,col,j:Math.abs(j)});}
    if(i===Math.round(n/2))mid={x:Math.floor(cx)+.5,y:Math.round(cy)+1,z:Math.floor(cz)+.5};}
  for(const c of cells.values()){for(let k=1;k<=4;k++){const u=get(c.X,c.y+k,c.Z);if(u&&(u===T.trava||u===T.zemlja||TYPES[u].leaf||u===T.kamen))vox[I(c.X,c.y+k,c.Z)]=0;}
    wput(c.X,c.y,c.Z,c.col);if(!get(c.X,c.y-1,c.Z))wput(c.X,c.y-1,c.Z,c.col);}
  return mid;}
function wStar(k,x,y,z,hint){WG.stars.push({k,x,y,z,hint});}
function wPortalArch(x,y,z){/* frame along x, opening 3 wide, 4 tall, faces +z */for(let h=1;h<=5;h++){wput(x-2,y+h,z,T.kvarc,1);wput(x+2,y+h,z,T.kvarc,1);}for(let dx=-2;dx<=2;dx++)wput(x+dx,y+6,z,dx===0?T.ametist:T.kvarc,1);wput(x-2,y+6,z,T.kristal,1);wput(x+2,y+6,z,T.kristal,1);
  for(let dx=-1;dx<=1;dx++)for(let h=1;h<=5;h++)vox[I(x+dx,y+h,z)]=0;}
function wCastle(cx,cz,y){const s=8;
  for(let dx=-s-1;dx<=s+1;dx++)for(let dz=-s-1;dz<=s+1;dz++){const X=cx+dx,Z=cz+dz;let t=wTopAt(X,Z,y+6);if(t<y-3)continue;for(let Y=y+1;Y<=y+16;Y++)vox[I(X,Y,Z)]=0;for(let Y=t+1;Y<=y;Y++)wput(X,Y,Z,T.kamen);wput(X,y,Z,(Math.abs(dx)<s&&Math.abs(dz)<s)?((dx+dz)&1?T.kvarc:T.bijela):T.trava);}
  for(let dx=-s;dx<=s;dx++)for(let dz=-s;dz<=s;dz++){if(Math.abs(dx)!==s&&Math.abs(dz)!==s)continue;for(let h=1;h<=8;h++){const gate=dz===s&&Math.abs(dx)<=1&&h<=4;wput(cx+dx,y+h,cz+dz,gate?T.kristal:(h===4&&(dx+dz)%3===0?T.zlato:T.kvarc),1);if(gate)WG.gate.push([cx+dx,y+h,cz+dz]);}
    if((dx+dz)%2===0)wput(cx+dx,y+9,cz+dz,T.kvarc,1);}
  for(const [sx,sz] of [[-1,-1],[1,-1],[-1,1],[1,1]]){const tx=cx+sx*s,tz=cz+sz*s;for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const d=Math.hypot(dx,dz);if(d>2.4)continue;for(let h=1;h<=12;h++)wput(tx+dx,y+h,tz+dz,d>1.4?(h%4===0?T.zlato:T.kvarc):(h===12?T.kvarc:0),1);}
    for(let k=0;k<4;k++){const rr=3-k*.8;for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++)if(Math.hypot(dx,dz)<=rr)wput(tx+dx,y+13+k,tz+dz,T.krov,1);}wput(tx,y+17,tz,T.vuna_lj,1);wput(tx,y+18,tz,T.vuna_lj,1);wput(tx+1,y+18,tz,T.vuna_r,1);}
  /* the keep at the back, with a golden throne pedestal and the treasure */
  for(let dx=-4;dx<=4;dx++)for(let dz=-s+1;dz<=-s+5;dz++)for(let h=1;h<=7;h++){const wall=Math.abs(dx)===4||dz===-s+1||dz===-s+5;const door=dz===-s+5&&Math.abs(dx)<=1&&h<=3;const win=h===4&&(dx===0||Math.abs(dx)===2)&&wall&&!door;
    wput(cx+dx,y+h,cz+dz,wall&&!door?(win?T.staklo:T.kvarc):0,1);}
  for(let dx=-5;dx<=5;dx++)for(let dz=-s;dz<=-s+6;dz++){const k=Math.max(Math.abs(dx)-1,0);if(k<=5)wput(cx+dx,y+8+Math.max(0,3-k),cz+dz,T.krov,1);}
  for(let dx=-1;dx<=1;dx++)for(let dz=-s+2;dz<=-s+3;dz++)wput(cx+dx,y+1,cz+dz,T.zlato,1);wput(cx-3,y+2,cz-s+2,T.svjetlo,1);wput(cx+3,y+2,cz-s+2,T.svjetlo,1);
  addChest("o_dvorac",cx,y+3,cz-s+3,"Blago Dvorca duge");
  /* a fountain in the courtyard */
  for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const e=Math.abs(dx)===2||Math.abs(dz)===2;wput(cx+dx,y+1,cz+2+dz,e?T.kvarc:T.voda,1);}wput(cx,y+2,cz+2,T.kristal,1);
  for(const dx of [-6,6])for(const dz of [-2,2,5])wput(cx+dx,y+1,cz+dz,T.lampion,1);}
function wTower(cx,cz,y0,y1){for(let y=y0+1;y<=y1;y++)for(let dx=-3;dx<=3;dx++)for(let dz=-3;dz<=3;dz++){const d=Math.hypot(dx,dz);if(d>3.3)continue;const wall=d>2.3;
    const door=dz===3&&dx===0&&y<=y0+3||dz===3&&Math.abs(dx)<=1&&y<=y0+2&&d<3.3&&dx===0;const win=y%6===3&&(dx===0||dz===0)&&wall;
    vox[I(cx+dx,y,cz+dz)]=wall&&!door&&!win?(y%7===0?T.kvarc:T.kcigla):0;if(wall&&!door&&!win)prot[I(cx+dx,y,cz+dz)]=1;}
  for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){const d=Math.hypot(dx,dz);if(d<=4.2&&d>1.7)wput(cx+dx,y1+1,cz+dz,T.kvarc,1);if(d<=4.2&&d>3.2&&(dx+dz)%2===0)wput(cx+dx,y1+2,cz+dz,T.kcigla,1);}
  WG.wind.push({x:cx+.5,z:cz+.5,r:1.7,y0:y0+.5,y1:y1+3.2,k:"kula"});}
function genOblaci(){vox.fill(0);prot.fill(0);hmap.fill(0);mask.fill(0);biome.fill(0);POI.length=0;CHESTS.length=0;FALLS.clear();WG.stars.length=0;WG.wind.length=0;WG.gate.length=0;
  /* islands */
  wIsland("prag",128,136,26,13,{bump:1.6});wIsland("cvijet",172,122,30,11);wIsland("kristal",98,168,22,10,{top:T.trava});wIsland("slap",94,96,32,12);
  wIsland("kula",154,170,24,7,{flat:1});wIsland("zlato",126,66,40,8,{flat:1});wIsland("dvorac",190,74,36,14,{flat:1,deep:1});wIsland("pasnjak",206,156,27,12,{bump:1.2});wIsland("tajni",70,142,44,5,{flat:1});
  wIsland("mali",60,104,28,4);wIsland("cvjetic",216,108,33,4);wIsland("stijena",160,40,30,5,{top:T.kamen,sub:T.kamen});
  const I2=WG.isl;
  /* start island: portal home, a stepping tower of clouds with the first star, a bounce cloud up to a high cloud */
  const P0=I2.prag;const py=wTopAt(128,128);wPortalArch(128,py,127);WG.portal={x:128.5,y:py+1,z:127.5,ry:0};
  for(let dx=-3;dx<=3;dx++)for(let dz=-2;dz<=2;dz++){const t=wTopAt(128+dx,127+dz);if(t>=0&&t<py)for(let Y=t+1;Y<=py;Y++)wput(128+dx,Y,127+dz,T.trava);}
  WG.spawn={x:128.5,y:wTopAt(128,134)+1,z:134.5,yaw:0};
  {const bx=136,bz=140,by=wTopAt(bx,bz);for(let i=0;i<4;i++)wPad(bx+i,by+1+i,bz-i*2,.9);wStar("prag",bx+3.5,by+5,bz-6+.5,"Na oblačnim stepenicama kod portala");}
  {const bx=121,bz=141,by=wTopAt(bx,bz);wput(bx,by,bz,T.skocni);wput(bx+1,by,bz,T.skocni);wPad(bx-3,by+4,bz+4,1.8);wStar("skok",bx-2.5,by+5.2,bz+4.5,"Skočni oblak lansira te do visokog oblaka");}
  for(const [x,z] of [[121,131],[137,131],[134,146],[116,136]])wTree(x,z,T.tresnja,T.breza_d,4);
  /* the flower island with a spiral stair around the big cherry tree */
  {const C=I2.cvijet;const tx=C.x,tz=C.z,ty=wTopAt(tx,tz);const h=9;for(let i=1;i<=h;i++)wput(tx,ty+i,tz,T.drvo);
    for(let i=1;i<=h;i++){const a=i*Math.PI/3;const sx=tx+Math.round(Math.cos(a)*1.6),sz=tz+Math.round(Math.sin(a)*1.6);wput(sx,ty+i,sz,T.daske);}
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)wput(tx+dx,ty+h+1,tz+dz,T.daske);
    for(let dx=-5;dx<=5;dx++)for(let dz=-5;dz<=5;dz++)for(let Y=ty+h+1;Y<=ty+h+6;Y++){const r=Math.hypot(dx,dz),dyc=Y-(ty+h+3.5);if(r*r+dyc*dyc*2.2>22)continue;if(r<2.7&&Y<=ty+h+3)continue;if(hash3(tx+dx,Y,tz+dz)<.93&&!get(tx+dx,Y,tz+dz))wput(tx+dx,Y,tz+dz,T.tresnja);}wStar("cvijet",tx+.5,ty+h+2,tz+.5,"Na vrhu velike trešnje na Cvjetnom otoku");
    for(const [x,z] of [[C.x-6,C.z+3],[C.x-2,C.z+7],[C.x+6,C.z+4],[C.x-4,C.z-6]])wTree(x,z,T.tresnja,T.breza_d,3);addChest("o_cvijet",C.x-7,wTopAt(C.x-7,C.z-1)+1,C.z-1,"Škrinja u cvijeću");}
  /* crystal island: a ring of crystals guards a star */
  {const C=I2.kristal,ty=wTopAt(C.x,C.z);for(let a=0;a<6.28;a+=.45){if(a>4.3&&a<4.9)continue;const x=C.x+Math.round(Math.cos(a)*3),z=C.z+Math.round(Math.sin(a)*3);const t=wTopAt(x,z);const hh=2+Math.floor(hash2(x,z,5)*3);for(let i=1;i<=hh;i++)wput(x,t+i,z,i===hh?T.kristal:T.ametist);}
    wStar("kristal",C.x+.5,ty+1.2,C.z+.5,"U krugu kristala na Kristalnom otoku");
    for(let i=0;i<14;i++){const a=hash2(i,3,7)*6.28,r=5+hash2(i,4,7)*4;const x=C.x+Math.round(Math.cos(a)*r),z=C.z+Math.round(Math.sin(a)*r);const t=wTopAt(x,z);if(t<0)continue;const hh=1+Math.floor(hash2(i,5,7)*4);for(let k=1;k<=hh;k++)wput(x,t+k,z,k===hh?T.kristal:T.ametist);}
    addChest("o_kristal",C.x+6,wTopAt(C.x+6,C.z+2)+1,C.z+2,"Kristalna škrinja");}
  /* waterfall island: a pond with a star on the bottom, a waterfall into the clouds */
  {const C=I2.slap,ty=wTopAt(C.x,C.z);const pr=3.6;for(let dx=-4;dx<=4;dx++)for(let dz=-4;dz<=4;dz++){if(Math.hypot(dx,dz)>pr)continue;for(let Y=ty-4;Y<=ty+3;Y++)vox[I(C.x+dx,Y,C.z+dz)]=Y<=ty?T.voda:0;wput(C.x+dx,ty-5,C.z+dz,T.pijesak);}
    for(let dx=-5;dx<=5;dx++)for(let dz=-5;dz<=5;dz++){const d=Math.hypot(dx,dz);if(d>pr&&d<=pr+1.2){for(let Y=ty-5;Y<=ty;Y++)if(!get(C.x+dx,Y,C.z+dz))wput(C.x+dx,Y,C.z+dz,T.kamen);if(!get(C.x+dx,ty,C.z+dz)||get(C.x+dx,ty,C.z+dz)===T.voda)wput(C.x+dx,ty,C.z+dz,T.kamen);}}
    wStar("slap",C.x+.5,ty-3.6,C.z+.5,"Na dnu jezerca na Otoku slapova. Zaroni!");
    for(let x=C.x-4;x>=C.x-C.r-3;x--){const t=wTopAt(x,C.z,ty+2);if(t>=ty-1){vox[I(x,ty,C.z)]=T.voda;vox[I(x,ty+1,C.z)]=0;vox[I(x,ty,C.z+1)]=vox[I(x,ty,C.z+1)]||T.kamen;}else{for(let Y=ty;Y>=ty-14;Y--){if(get(x,Y,C.z)&&!TYPES[get(x,Y,C.z)].water)break;vox[I(x,Y,C.z)]=T.voda;if(Y<ty)FALLS.add(x+","+Y+","+C.z);}WG.fall={x:x+.5,y:ty-14,z:C.z+.5};break;}}
    for(const [x,z] of [[C.x+6,C.z+4],[C.x+4,C.z-7],[C.x+7,C.z-2]])wTree(x,z,T.lisce,T.drvo,4);addChest("o_slap",C.x+3,wTopAt(C.x+3,C.z+7)+1,C.z+7,"Škrinja uz slap");}
  /* the windy tower: an updraft inside lifts you to the top */
  {const C=I2.kula,ty=wTopAt(C.x,C.z);wTower(C.x,C.z,ty,ty+24);wStar("kula",C.x+3.5,ty+26,C.z+.5,"Na vrhu Vjetrovite kule. Uđi unutra i pusti vjetar da te nosi!");}
  /* golden garden, reached by bouncing clouds */
  {const C=I2.zlato;for(let i=0;i<10;i++){const a=hash2(i,8,1)*6.28,r=2+hash2(i,9,1)*5;const x=C.x+Math.round(Math.cos(a)*r),z=C.z+Math.round(Math.sin(a)*r);const t=wTopAt(x,z);if(t>=0)wput(x,t+1,z,i%3?T.zlato:T.svjetlo);}
    wTree(C.x-4,C.z-3,T.jesen,T.breza_d,4);wTree(C.x+4,C.z+2,T.jesen,T.breza_d,4);wStar("zlato",C.x+.5,wTopAt(C.x,C.z)+1.2,C.z+.5,"U Zlatnom vrtu, na kraju skočnih oblaka");addChest("o_zlato",C.x,wTopAt(C.x,C.z+4)+1,C.z+4,"Zlatna škrinja");}
  /* sheep meadow with a hay stack */
  {const C=I2.pasnjak;const hx=C.x+3,hz=C.z-2,ht=wTopAt(hx,hz);for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++)for(let h=1;h<=3;h++)if(h<3||(dx===0||dz===0))wput(hx+dx,ht+h,hz+dz,T.sijeno);wput(hx-2,ht+1,hz,T.sijeno);wput(hx-2,ht+2,hz,T.sijeno);wput(hx-3,ht+1,hz,T.sijeno);
    wStar("pasnjak",hx+.5,ht+4.2,hz+.5,"Na plastu sijena na Ovčjem pašnjaku");
    for(let a=0;a<6.28;a+=.12){const x=C.x+Math.round(Math.cos(a)*(C.r-2.2)),z=C.z+Math.round(Math.sin(a)*(C.r-2.2));if(a>2.6&&a<3.1)continue;const t=wTopAt(x,z,C.y+4);if(t>=0&&!get(x,t+1,z))wput(x,t+1,z,T.daske);}
    addChest("o_pasnjak",C.x-3,wTopAt(C.x-3,C.z+3)+1,C.z+3,"Pastirska škrinja");}
  /* secret cloud above, reached with the updraft from the crystal island */
  {const C=I2.tajni;const px=75,pz=148,pyy=I2.kristal.y;wPad(px,pyy,pz,2.2);WG.wind.push({x:px+.5,z:pz+.5,r:1.9,y0:pyy+.5,y1:C.y+5,k:"tajni"});wPad(73,C.y,146,1.3);wSteps(I2.kristal,{x:px,z:pz,y:pyy,r:2},{gap:4.2,wig:1});
    wStar("tajni",C.x+.5,C.y+1.2,C.z+.5,"Na Tajnom oblaku visoko gore. Vjetar kraj Kristalnog otoka nosi te gore!");for(let dx=-1;dx<=1;dx++)wput(C.x+dx,C.y+1,C.z-3,T.vuna_r);}
  /* castle on the highest island */
  {const C=I2.dvorac;wCastle(C.x,C.z,wTopAt(C.x,C.z));}
  /* bridges and steps between islands */
  const mid=wRainbow(P0,I2.cvijet,6);if(mid)wStar("duga",mid.x,mid.y+1.4,mid.z,"Na vrhu duginog mosta");
  {const C=I2.dvorac;wRainbow(I2.cvijet,{x:C.x,z:C.z+11,y:wTopAt(C.x,C.z+10,C.y+6),r:1.4},5);}
  wSteps(P0,I2.kristal);wSteps(P0,I2.slap);wSteps(P0,I2.kula);wSteps(P0,I2.zlato,{gap:4.6});wSteps(I2.cvijet,I2.pasnjak);wSteps(I2.slap,I2.mali);wSteps(I2.cvijet,I2.cvjetic);wSteps(I2.zlato,I2.stijena);
  /* places to discover */
  [["o_prag","Oblačni prag",P0],["o_cvijet","Cvjetni otok",I2.cvijet],["o_kristal","Kristalni otok",I2.kristal],["o_slap","Otok slapova",I2.slap],["o_kula","Vjetrovita kula",I2.kula],
   ["o_zlato","Zlatni vrt",I2.zlato],["o_pasnjak","Ovčji pašnjak",I2.pasnjak],["o_tajni","Tajni oblak",I2.tajni],["o_dvorac","Dvorac duge",I2.dvorac]].forEach(([k,n,c])=>POI.push({k,n,x:c.x,z:c.z,r:Math.max(8,c.r+2),y:c.y-6}));}
Object.assign(LOOT,{
  o_cvijet:{coins:40,mats:{biser:1},blocks:{oblak:12,tresnja:8},msg:"Među cvijećem netko je sakrio meke oblake. Možeš ih staviti i na svoj otok!"},
  o_kristal:{coins:45,mats:{dijamant:1},blocks:{kristal:4,ametist:6},msg:"Kristali iz Svijeta oblaka svijetle kao mjesec."},
  o_slap:{coins:40,mats:{biser:2,bakar:3},blocks:{skocni:4},msg:"Skočni oblaci! Stavi ih bilo gdje i skači do neba."},
  o_zlato:{coins:80,mats:{grumen:5},blocks:{zlato:6,svjetlo:4},msg:"Zlatni vrt čuva najsjajnije blago neba."},
  o_pasnjak:{coins:35,mats:{},blocks:{sijeno:8,vuna_b:8,oblak:10},msg:"Ovčice iz oblaka daju najmekšu vunu na svijetu."},
  o_dvorac:{coins:300,mats:{dijamant:3,biser:3,smaragd:2},blocks:{skocni:12,oblak:24},msg:"Deset zvjezdanih kamenčića vratilo je sjaj Dvorcu duge. Svijet oblaka ti zauvijek zahvaljuje!"}});

/* ---------- the sea of clouds below ---------- */
let cloudSea=null,cloudPuffs=null;
function buildCloudSea(){const U={uTime,uFog:{value:new THREE.Color(0xdccff8)},uA:{value:new THREE.Color(0xfffaff)},uB:{value:new THREE.Color(0xb4a2e6)}};
  const m=new THREE.ShaderMaterial({uniforms:U,fog:false,
    vertexShader:"varying vec3 vW;varying float vD;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vec4 mv=viewMatrix*w;vD=-mv.z;gl_Position=projectionMatrix*mv;}",
    fragmentShader:"uniform float uTime;uniform vec3 uFog,uA,uB;varying vec3 vW;varying float vD;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}"+
      "float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}"+
      "float fb(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*n(p);p*=2.03;a*=.5;}return s;}"+
      "void main(){vec2 p=vW.xz*.035+vec2(uTime*.012,uTime*.007);float c=fb(p)+.35*fb(p*2.7-uTime*.02);vec3 col=mix(uB,uA,smoothstep(.45,1.05,c));col+=vec3(1.,.9,.95)*smoothstep(.95,1.25,c)*.25;"+
      "float f=1.-exp(-pow(vD*.0026,2.));gl_FragColor=vec4(mix(col,uFog,clamp(f,0.,1.)),1.);}"});
  cloudSea=new THREE.Mesh(new THREE.PlaneGeometry(2400,2400).rotateX(-Math.PI/2),m);cloudSea.position.set(CX,9.4,CZ);scene.add(cloudSea);cloudSea.userData.U=U;
  const g=new THREE.IcosahedronGeometry(1,1),mm=new THREE.MeshStandardMaterial({color:0xffffff,emissive:LC(0xd8cdf2),emissiveIntensity:.55,roughness:1,flatShading:true});
  const N=340;cloudPuffs=new THREE.InstancedMesh(g,mm,N);const o=new THREE.Object3D();let k=0;
  for(let c=0;c<70&&k<N;c++){const a=hash2(c,1,4)*6.28,r=20+hash2(c,2,4)*150;const x=CX+Math.cos(a)*r,z=CZ+Math.sin(a)*r,y=8.2+hash2(c,3,4)*3;const n=3+Math.floor(hash2(c,5,4)*4);
    for(let j=0;j<n&&k<N;j++){const s=2+hash2(c,j,6)*3.5;o.position.set(x+(j-n/2)*s*1.1,y+hash2(c,j,7)*1.2,z+(hash2(c,j,8)-.5)*s*1.6);o.scale.set(s*1.4,s*.7,s);o.updateMatrix();cloudPuffs.setMatrixAt(k++,o.matrix);}}
  cloudPuffs.count=k;scene.add(cloudPuffs);}

/* ---------- stars, wind, bounce clouds, NPCs ---------- */
const STARM=[];let sova=null;
function buildStars(){const geo=new THREE.OctahedronGeometry(.32,0);const mat=new THREE.MeshStandardMaterial({color:0xffd23d,emissive:LC(0xffb000),emissiveIntensity:1.1,roughness:.3,metalness:.3,flatShading:true});const WD=WDEF[WORLD]||{};
  const got=(S.wst&&S.wst[WORLD])||{};for(const s of WG.stars){let g;if(WD.itemMesh)g=WD.itemMesh();else{g=new THREE.Group();const m=new THREE.Mesh(geo,mat);m.scale.set(1,1.4,1);g.add(m);const m2=new THREE.Mesh(geo,mat);m2.scale.set(.6,.6,.6);m2.rotation.y=.8;m2.position.y=.0;g.add(m2);
    const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffe080,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.9}));sp.scale.set(2.2,2.2,1);g.add(sp);}
    g.position.set(s.x,s.y,s.z);scene.add(g);s.g=g;s.got=!!got[s.k];g.visible=!s.got;STARM.push(s);}}
function starGet(s){s.got=true;s.g.visible=false;S.wst=S.wst||{};S.wst[WORLD]=S.wst[WORLD]||{};S.wst[WORLD][s.k]=today();S.coins+=25;save();renderEco();fpUI();
  const n=wStars(WORLD);const WD=WDEF[WORLD]||{},IC=WD.itemCol||[0xffd23d,0xffffff,0xff9ad0];burst(s.x,s.y,s.z,40,WD.itemBurst||[[1,.85,.3],[1,1,.7],[1,.7,.9]],2.6,2.4,.9);mgRing(s.x,s.y,s.z,IC[0]);for(let i=0;i<20;i++){const a=Math.random()*6.28;mgSpawn({t:WD.itemFx||"star",x:s.x,y:s.y,z:s.z,vx:Math.cos(a)*3,vy:2+Math.random()*3,vz:Math.sin(a)*3,life:1,size:.4,size2:.02,col:IC,add:1,drag:2});}
  [784,988,1175,1568].forEach((f,i)=>tone(f,.16,"triangle",.03,i*.08));if(rida)rida.celebrate=1;if(typeof padRumble==="function"&&PAD.on)padRumble(160,.5,.4);
  const IT=WD.item||WDEF.oblaci.item;
  if(n>=WSTAR_N){toast(IT.all,5200);setTimeout(openGate,1200);}
  else toast(IT.one+" "+n+" od "+WSTAR_N+"! (+25 zlatnika)",3200);
  const gd=WD.guide&&WD.guide();if(n===1)setTimeout(()=>{if(gd)say(gd,IT.first,5000);},3400);}
function openGate(){if(WG.gateOpen)return;WG.gateOpen=true;for(const [x,y,z] of WG.gate){prot[I(x,y,z)]=0;setV(x,y,z,0);burst(x+.5,y+.5,z+.5,10,[[.6,1,.95],[1,1,1]],1.6,1.6,.7);}
  sfx.fanfare();const C=WG.isl[(WDEF[WORLD]||WDEF.oblaci).finale.isl];if(C&&FP.on&&Math.hypot(FP.p.x-C.x,FP.p.z-C.z)<40)fireworks();}
function windTick(dt){const P=FP.p,V=FP.v;let inW=null;for(const w of WG.wind){const d=Math.hypot(P.x-w.x,P.z-w.z);
    if(Math.hypot(w.x-P.x,w.z-P.z)<60&&Math.random()<dt*22){const a=Math.random()*6.28,r=Math.random()*w.r;mgSpawn({t:"spark",x:w.x+Math.cos(a)*r,y:w.y0+Math.random()*(w.y1-w.y0),z:w.z+Math.sin(a)*r,vy:7,life:.7,size:.22,size2:.5,col:[0xffffff,0xe8f4ff],op:.7});}
    if(d<w.r&&P.y>w.y0-.6&&P.y<w.y1+.5&&!FP.swim){inW=w;if(P.y<w.y1)V.y+=(9-V.y)*Math.min(1,dt*5);else V.y=Math.max(V.y,-1.2);FP.ground=false;FP.dblUsed=0;}}
  if(inW&&!windTick.on){windTick.on=1;for(let i=0;i<6;i++)tone(300+i*40,.2,"sine",.012,i*.05);tipOnce("wind","Vjetar te nosi gore! Kad budeš na vrhu, kreni naprijed i sleti.");}if(!inW)windTick.on=0;}
function bounceCheck(){if(!FP.ground||FP.swim||FP.boat||FP.hook)return;const P=FP.p;const t=get(Math.floor(P.x),Math.floor(P.y-.08),Math.floor(P.z));if(t!==T.skocni)return;
  const V=FP.v;V.y=(FP.keys[" "]||FP.jump)?18:15.5;FP.ground=false;FP.flipT=.5;FP.dblUsed=0;burst(P.x,P.y+.1,P.z,22,[[1,.7,.9],[1,1,1],[1,.85,.95]],2.2,2.6,.6);
  tone(200,.08,"sine",.04);tone(600,.12,"triangle",.03,.05);tone(990,.1,"sine",.02,.11);tipOnce("bounce","Skočni oblak! Drži Skok dok sletiš i odskočit ćeš još više.");}
function worldTick(dt,tt){if(!WORLD)return;if(cloudSea)cloudSea.position.x=CX;
  for(const s of STARM){if(s.got)continue;s.g.rotation.y+=dt*1.8;s.g.position.y=s.y+Math.sin(tt*2+s.x)*.15;if(FP.on&&Math.abs(FP.p.x-s.x)<1.2&&Math.abs(FP.p.z-s.z)<1.2&&FP.p.y+.6>s.y-1.2&&FP.p.y<s.y+.6)starGet(s);
    else if(Math.random()<dt*3)mgSpawn({t:"star",x:s.x+(Math.random()-.5)*.8,y:s.y+(Math.random()-.5)*.8,z:s.z+(Math.random()-.5)*.8,vy:.4,life:.8,size:.18,size2:.02,col:0xffe080,add:1});}
  if(WG.fall&&Math.random()<dt*12)burst(WG.fall.x+(Math.random()-.5)*1.5,WG.fall.y+.5,WG.fall.z+(Math.random()-.5)*1.5,1,[[1,1,1],[.9,.95,1]],1,2,1,.5);
  if(!FP.on)return;windTick(dt);portalCheck(WG.portal,()=>sheetHome());const WD=WDEF[WORLD]||{};if(WD.tick)WD.tick(dt,tt);
  if(WD.floor!=null&&FP.p.y<WD.floor&&!FP.hook){const P=FP.p;burst(P.x,WG.floor,P.z,30,[[1,1,1],[.95,.9,1]],2,2,.8);P.copy(FP.safe);P.y+=.05;FP.v.set(0,0,0);FP.cam.cur=FP.cam.tdist;sfx.pop();
    mgRing(P.x,P.y+.5,P.z,0xffffff);toast(S.tips&&S.tips.fall?"Puf! Natrag na sigurno.":"Puf! Oblaci su mekani, pa te vjetar vratio na sigurno mjesto.",2600);S.tips=S.tips||{};S.tips.fall=1;}
  const gd=WD.guide&&WD.guide();if(gd&&!worldTick.met&&Math.hypot(FP.p.x-gd.x,FP.p.z-gd.z)<4.5){worldTick.met=1;WD.talk();}}
function sovaTalk(){const n=wStars(WORLD);const L=n>=WSTAR_N?(WG.gateOpen?"Vrata Dvorca duge su otvorena! Dvorac je na najvišem otoku, iza duginog mosta.":"Uh, skoro..."):
    n===0?"Dobro došla u Svijet oblaka! Ja sam sova Mudrica. Vjetar je raznio deset zvjezdanih kamenčića po otocima. Skupi ih i otvorit ćeš vrata Dvorca duge!":
    "Imaš "+n+" od "+WSTAR_N+" kamenčića. Strelica gore pokazuje najbliži. Pazi na skočne oblake i vjetrove!";say(sova,L,7500);}
function spawnWorldLife(){const I2=WG.isl;const at=(k,dx,dz)=>{const c=I2[k];return {x:c.x+dx+.5,z:c.z+dz+.5};};
  const put=(kind,name,p,o)=>{const e=spawn(kind,name,o||{speed:1});e.x=p.x;e.z=p.z;e.y=walkable(e.x,e.z,false)||wTopAt(Math.floor(p.x),Math.floor(p.z))+1;e.home={x:p.x,z:p.z};return e;};
  sova=put("sova","Mudrica",{x:WG.spawn.x+3,z:WG.spawn.z-2});sova.frozen=true;sova.g.rotation.y=Math.PI*1.2;
  [[2,4],[-4,3],[0,-5],[5,-1],[-3,-3]].forEach((d,i)=>put("ovca",["Oblačko","Pahuljica","Vunko","Mekica","Kuglica"][i],at("pasnjak",d[0],d[1]),{speed:.8}));
  put("papiga","Duga",at("cvijet",3,3));put("papiga","Sunčica",at("zlato",-2,2));put("zec","Skokić",at("cvijet",-3,-2));put("zec","Hopko",at("kristal",4,-3));put("patka","Plavka",at("slap",5,3));}

/* ---------- portals ---------- */
const PORTALS=[];
function portalMesh(x,y,z,ry,home){const U={uTime,uA:{value:new THREE.Color(home?0xffd27a:0xb46cff)},uB:{value:new THREE.Color(home?0x8ad0ff:0x5a3ad8)}};
  const m=new THREE.ShaderMaterial({uniforms:U,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,
    vertexShader:"varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"uniform float uTime;uniform vec3 uA,uB;varying vec2 vU;void main(){vec2 p=(vU-.5)*vec2(1.,1.35);float r=length(p);float a=atan(p.y,p.x);float s=sin(a*3.+r*14.-uTime*3.)*.5+.5;"+
      "vec3 c=mix(uB,uA,s);c+=vec3(1.)*smoothstep(.25,.0,r)*.8;float e=smoothstep(.62,.45,r);gl_FragColor=vec4(c,e*(.75+.25*s));}"});
  const g=new THREE.Group();const disc=new THREE.Mesh(new THREE.PlaneGeometry(3,4.6),m);disc.position.y=2.75;disc.renderOrder=5;g.add(disc);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:home?0xffe0a0:0xc8a0ff,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.65}));sp.scale.set(7,7,1);sp.position.y=2.8;g.add(sp);
  g.position.set(x,y,z);g.rotation.y=ry;scene.add(g);const P={x,y,z,ry,g,home,cool:0};PORTALS.push(P);return P;}
function portalCheck(p,fn){if(!p||!FP.on)return;const P=FP.p;const dx=P.x-p.x,dz=P.z-p.z,c=Math.cos(p.ry),s=Math.sin(p.ry);const lx=dx*c-dz*s,lz=dx*s+dz*c;const inside=Math.abs(lx)<1.5&&Math.abs(lz)<.75&&P.y>p.y-1&&P.y<p.y+3;
  if(inside&&!p.armed&&$("veil").hidden&&!window.RWON){p.armed=1;FP.v.set(0,0,0);fn();}if(!inside&&Math.hypot(dx,dz)>2.6)p.armed=0;}
function portalTick(dt,tt){for(const p of PORTALS){if(Math.random()<dt*10){const a=Math.random()*6.28;mgSpawn({t:"star",x:p.x+Math.cos(p.ry)*(Math.random()-.5)*3,y:p.y+.5+Math.random()*4.5,z:p.z-Math.sin(p.ry)*(Math.random()-.5)*3,vy:.6,life:1.2,size:.22,size2:.02,col:p.home?[0xffd27a,0xffffff]:[0xc8a0ff,0x8ad0ff,0xffffff],add:1});}}}
function warpGo(home,fn){if(!$("warp"))document.body.insertAdjacentHTML("beforeend",'<div id="warp"'+(home?' class="home"':'')+'></div>');[392,523,659,784,1046,1318,1568].forEach((f,i)=>tone(f,.2,"sine",.025,i*.09));
  if(FP.on&&rida)rida.celebrate=1;setTimeout(fn,1150);}
function enterWorld(id){if(!WORLDS[id]||WORLDS[id].soon)return;closeSheet();S.wed=S.wed||{};if(!WORLD){S.wed.__isle=S.edits;S.edits=S.wed[id]||{};S.wed[id]=S.edits;}S.world=id;S.worldBack=null;save();warpGo(false,()=>location.reload());}
function leaveWorld(){if(!WORLD)return;closeSheet();S.wed[WORLD]=S.edits;S.edits=S.wed.__isle||{};delete S.wed.__isle;S.worldBack=WORLD;S.world=null;save();warpGo(true,()=>location.reload());}
function wIcon(id){return itemIcon("w_"+id);}
function sheetPortal(){const lv=level();const lab=id=>((WDEF[id]||WDEF.oblaci).item.hud);
  openSheet('<div class="anh"><img alt="" src="'+wIcon("portal")+'"><div><h2>Čarobni portal</h2><p class="muted">Portal vodi u sasvim druge svjetove. Svaki ima svoje tajne, stanovnike i blago kojeg nema nigdje drugdje. Nove svjetove otključavaju razine!</p></div></div><div class="wcards">'+
    Object.keys(WORLDS).map(id=>{const w=WORLDS[id];const open=!w.soon&&lv>=w.lv;const n=wStars(id);
      return '<div class="wcard'+(open?'':' lock')+'"><img alt="" src="'+wIcon(id)+'"><b>'+esc(w.n)+'</b><p>'+esc(w.d)+'</p>'+(w.soon?'<span class="wst">Uskoro!</span>':open?'<span class="wst">'+lab(id)+': '+n+' / '+WSTAR_N+(n>=WSTAR_N?' ✓':'')+'</span>':'<span class="wst">Otključava se na razini '+w.lv+'</span>')+
        (open?'<button class="btn big purple" data-w="'+id+'">Putuj!</button>':'')+'</div>';}).join("")+'</div>');
  $("sheetBody").querySelectorAll("[data-w]").forEach(b=>b.onclick=()=>{if(!FP.on){toast("Uđi u istraživanje i prođi kroz portal kod knjižnice!",3000);return;}enterWorld(b.dataset.w);});}
function sheetHome(){const n=wStars(WORLD);
  openSheet('<div class="anh"><img alt="" src="'+wIcon("portal_home")+'"><div><h2>Natrag na Otok priča?</h2><p class="muted">'+(WDEF[WORLD]||WDEF.oblaci).item.hud+': <b>'+n+' / '+WSTAR_N+'</b>. Sve što si skupila ostaje tvoje, a ovdje se možeš vratiti kad god želiš kroz portal kod knjižnice.</p></div></div>'+
    '<button class="btn big" id="whGo">Vrati me na otok</button><button class="btn soft" id="whStay">Ostajem još malo</button>');
  $("whGo").onclick=()=>leaveWorld();$("whStay").onclick=()=>{sfx.click();closeSheet();};}

/* ---------- the island side: portal near the library ---------- */
let islePortal=null;
function islePortalInit(){let sp=S.portalSpot;const ok=s=>{if(!s)return false;for(let dx=-2;dx<=2;dx++){const c=Math.cos(s.ry),sn=Math.sin(s.ry);const x=Math.floor(s.x+dx*c),z=Math.floor(s.z-dx*sn);const t=wTopAt(x,z,s.y+3);if(Math.abs(t+1-s.y)>1)return false;for(let h=0;h<6;h++){const v=get(x,s.y+h,z);if(v&&!TYPES[v].leaf&&!prot[I(x,s.y+h,z)])return false;}}return true;};
  if(!sp||!ok(sp)){sp=null;for(let r=9;r<=20&&!sp;r+=1)for(let a=0;a<6.28&&!sp;a+=.2){const x=Math.floor(LIB.x+Math.cos(a)*r),z=Math.floor(LIB.z+Math.sin(a)*r);const t=wTopAt(x,z);if(t<WATER)continue;if(mask[x+z*W])continue;
      if(PLOTS.some(p=>Math.hypot(p.x-x,p.z-z)<8))continue;const ry=Math.atan2(LIB.x-x,LIB.z-z);const s={x:x+.5,y:t+1,z:z+.5,ry};if(ok(s)&&[-2,2].every(dx=>{const xx=Math.floor(s.x+dx*Math.cos(ry)),zz=Math.floor(s.z-dx*Math.sin(ry));return Math.abs(wTopAt(xx,zz,t+3)-t)<=1;}))sp=s;}
    if(!sp)return;S.portalSpot=sp;save();}
  const c=Math.cos(sp.ry),sn=Math.sin(sp.ry);const X=dx=>Math.floor(sp.x+dx*c),Z=dx=>Math.floor(sp.z-dx*sn);
  for(const dx of [-2,2]){for(let h=0;h<=5;h++){const x=X(dx),z=Z(dx);setV(x,sp.y+h,z,h===0?T.kcigla:T.kvarc);prot[I(x,sp.y+h,z)]=1;}}
  for(let dx=-2;dx<=2;dx++){const x=X(dx),z=Z(dx);setV(x,sp.y+6,z,dx===0?T.ametist:Math.abs(dx)===2?T.kristal:T.kvarc);prot[I(x,sp.y+6,z)]=1;}
  islePortal=portalMesh(sp.x,sp.y-.3,sp.z,sp.ry,false);POI.push({k:"portal",n:"Čarobni portal",x:sp.x,z:sp.z,r:6});}

/* ---------- boot: the island or a world ---------- */
{const _boot=boot;boot=function(){if(S.wed&&S.wed.__isle&&!S.world){S.edits=S.wed.__isle;delete S.wed.__isle;}
  if(S.world&&WORLDS[S.world]&&!WORLDS[S.world].soon){try{return worldBoot(S.world);}catch(e){console.error(e);}}
  _boot();islePortalInit();
  if(S.worldBack){const back=S.worldBack;S.worldBack=null;save();setTimeout(()=>{if(!islePortal)return;rida.x=islePortal.x+Math.sin(islePortal.ry)*3;rida.z=islePortal.z+Math.cos(islePortal.ry)*3;rida.y=walkable(rida.x,rida.z)||islePortal.y;
      startSquirrel();FP.p.set(rida.x,rida.y,rida.z);FP.safe.copy(FP.p);FP.cam.yaw=islePortal.ry;FP.yaw=islePortal.ry+Math.PI;
      toast("Dobro došla natrag na Otok priča! "+(WDEF[back]||WDEF.oblaci).item.hud+": "+wStars(back)+" / "+WSTAR_N+".",4200);},600);}};}
function worldBoot(id){WORLD=id;S.pets=S.pets||{};S.met=S.met||{};S.wear=S.wear||{vrat:"",ledja:""};if(S.hint==null)S.hint="";if(!Array.isArray(S.farm))S.farm=[];S.isletDay=S.isletDay||{};S.wed=S.wed||{};if(!S.wed.__isle){S.wed.__isle=S.edits;S.edits=S.wed[id]||{};S.wed[id]=S.edits;}S.wst=S.wst||{};
  const WD=WDEF[id];WD.gen();
  for(const k in S.edits){const p=k.split(",").map(Number);setV(p[0],p[1],p[2],S.edits[k],true);}
  if(wStars(id)>=WSTAR_N){WG.gateOpen=true;for(const [x,y,z] of WG.gate){vox[I(x,y,z)]=0;prot[I(x,y,z)]=0;}}
  buildShore();shoreTex.needsUpdate=true;
  lightAll();lightReady=true;advInit();
  for(let cz=0;cz<NC;cz++)for(let cx=0;cx<NC;cx++)buildChunk(cx,cz);
  buildLife();grow();buildChests();
  rida=spawn("rida","Rida",{speed:1.7});rida.x=WG.spawn.x;rida.z=WG.spawn.z;rida.y=WG.spawn.y;setHat(S.hat||null);
  if(typeof diaryInit==="function")diaryInit();if(typeof animalsInit==="function")animalsInit();
  water.visible=false;beam.visible=false;if(life.balloon)life.balloon.visible=false;WD.env();buildStars();WD.life();portalMesh(WG.portal.x,WG.portal.y-.3,WG.portal.z,WG.portal.ry||0,true);
  for(const c of life.clouds){c.position.y=SL+44+Math.random()*16;if(WD.noClouds)c.visible=false;}
  S.foxSeen=1;scene.fog.density=WD.fog;waterU.uFogD.value=WD.fog;setTime(WD.preset,true);renderSound();resize();renderHUD();quests();renderEco();
  requestAnimationFrame(frame);setTimeout(()=>$("loading").classList.add("out"),150);
  setTimeout(()=>{startSquirrel();FP.p.set(WG.spawn.x,WG.spawn.y,WG.spawn.z);FP.safe.copy(FP.p);const cy=WG.spawn.cam!=null?WG.spawn.cam:Math.PI;FP.cam.yaw=cy;FP.yaw=cy+Math.PI;FP.camT.set(FP.p.x,FP.p.y+1.05,FP.p.z);FP.cam.cur=FP.cam.tdist;fpUI();
    toast(WD.intro(),5000);if(WD.after)WD.after();},300);}

/* ---------- guards so island-only systems stay quiet inside a world ---------- */
{const _tf=tickFarm;tickFarm=function(){if(WORLD)return;return _tf.apply(this,arguments);};}
{const _tr=tickRegions;tickRegions=function(){if(WORLD)return;return _tr.apply(this,arguments);};}
{const _fu=fpUI;fpUI=function(){if(WORLD){const n=wStars(WORLD),IT=(WDEF[WORLD]||WDEF.oblaci).item;$("fpInfo").innerHTML=n>=WSTAR_N?IT.done+" <b>✓</b>":IT.hud+": <b>"+n+" / "+WSTAR_N+"</b>";return;}return _fu.apply(this,arguments);};}
{const _nt=nearestTreasure;nearestTreasure=function(){if(WORLD){let best=null,bd=1e9;const P=FP.p;for(const s of STARM){if(s.got)continue;const d=Math.hypot(s.x-P.x,s.z-P.z);if(d<bd){bd=d;best=s;}}
    if(!best&&!WG.gateOpen)return null;if(!best){const F=(WDEF[WORLD]||WDEF.oblaci).finale;const C=F.at||WG.isl[F.isl];if(!C||S.chests[F.chest])return null;const cz=C.z+(F.at?0:-5);return {tr:{g:{position:{x:C.x,z:cz}}},d:Math.hypot(C.x-P.x,cz-P.z)};}return {tr:{g:{position:{x:best.x,z:best.z}}},d:bd};}return _nt.apply(this,arguments);};}
{const _es=endSquirrel;endSquirrel=function(){if(WORLD){if($("veil").hidden)sheetHome();return;}return _es.apply(this,arguments);};}
{const _oc=openChest;openChest=function(ch){const wid=Object.keys(WDEF).find(id=>WDEF[id].finale.chest===ch.id);const F=wid&&WDEF[wid].finale;
  if(F&&!ch.open&&wStars(wid)<WSTAR_N){if(!openChest.t||performance.now()-openChest.t>4000){openChest.t=performance.now();toast(F.locked,3600);}return;}
  const first=!ch.open;const r=_oc.apply(this,arguments);
  if(first&&F){const items=[];for(const id of F.rewards){const it=mgIt(id);if(it&&!mgOwn(it)){mgGive(it);items.push({ic:mgIcon(it),n:it.n,cnt:0,rar:"l"});}}save();
    MGQ.push({run:()=>rewardReveal({kicker:F.kicker,title:F.title,chest:"gold",items,sub:F.sub,ok:"Jupi!",onDone:()=>{if(typeof fireworks==="function")fireworks();}})});}
  return r;};}
{const _ta=tickAnimals2;tickAnimals2=function(dt,tt){_ta.apply(this,arguments);if(!S.mg)return;portalTick(dt,tt);if(WORLD)worldTick(dt,tt);else{if(islePortal)portalCheck(islePortal,()=>sheetPortal());}};}
{const _ts=tickSquirrel;tickSquirrel=function(dt){_ts.apply(this,arguments);if(FP.on)bounceCheck();};}
{const _mm=mgMenu;mgMenu=function(){_mm.apply(this,arguments);const r=$("mmHow");if(r&&!$("mmPortal")){r.parentNode.insertAdjacentHTML("beforebegin",'<button class="btn big" id="mmPortal" style="background:linear-gradient(#c8a0ff,#8a5ae8);color:#fff">'+(WORLD?"Natrag na Otok priča":"Čarobni portal")+'</button>');$("mmPortal").onclick=()=>{sfx.click();WORLD?sheetHome():sheetPortal();};}};}

/* ---------- icons ---------- */
(function(){const D=ITEM_DRAW;const cloud=(x,cx,cy,s,f)=>{x.fillStyle=f||"#fff";x.strokeStyle="#16243a";x.lineWidth=3;x.beginPath();[[-10,2,9],[2,-4,12],[13,3,8],[0,6,9]].forEach(a=>{x.moveTo(cx+a[0]*s+a[2]*s,cy+a[1]*s);x.arc(cx+a[0]*s,cy+a[1]*s,a[2]*s,0,7);});x.fill();x.stroke();x.beginPath();[[-10,2,9],[2,-4,12],[13,3,8],[0,6,9]].forEach(a=>{x.moveTo(cx+a[0]*s+a[2]*s-3,cy+a[1]*s);x.arc(cx+a[0]*s,cy+a[1]*s,a[2]*s-3,0,7);});x.fill();};
  D.w_oblaci=(x,P,hi,ol)=>{x.fillStyle="#bfe0ff";x.fillRect(0,0,64,64);cloud(x,22,50,.9);cloud(x,48,54,.7);P([[18,30],[46,30],[42,40],[22,40]],"#62b23f");P([[22,40],[42,40],[32,52]],"#8a7a6a");P([[28,14],[36,14],[36,30],[28,30]],"#f4f0e6");P([[26,8],[38,8],[32,2]],"#5f8bbd");
    x.save();x.translate(38,-2);x.scale(.32,.32);mgShape(x,"star","#ffd23d","#16243a");x.restore();};
  D.w_led=(x,P,hi,ol)=>{x.fillStyle="#d8ecff";x.fillRect(0,0,64,64);P([[4,58],[24,18],[40,44],[50,28],[62,58]],"#f7fafd");P([[24,18],[30,30],[18,30]],"#a9c8f5");P([[20,58],[26,44],[32,58]],"#86ece2");};
  D.w_more=(x,P,hi,ol)=>{x.fillStyle="#2a70b4";x.fillRect(0,0,64,64);P([[10,58],[10,34],[20,26],[30,34],[30,58]],"#5aa898");P([[36,58],[36,40],[46,32],[56,40],[56,58]],"#6ab8a8");[[14,16,4],[48,14,5],[30,10,3]].forEach(a=>{x.beginPath();x.arc(a[0],a[1],a[2],0,7);x.fillStyle="#cfefff";x.fill();});};
  D.w_dzungla=(x,P,hi,ol)=>{x.fillStyle="#ffcf9a";x.fillRect(0,0,64,64);P([[22,58],[38,10],[54,58]],"#6a5a52");P([[32,22],[38,10],[44,22]],"#ff6a1e");P([[2,58],[2,36],[14,30],[18,58]],"#3f9a2e");P([[46,58],[52,38],[62,34],[62,58]],"#3f9a2e");};
  D.w_portal=(x,P,hi,ol)=>{P([[10,60],[10,14],[18,6],[46,6],[54,14],[54,60],[44,60],[44,18],[20,18],[20,60]],"#eee8e0");const g=x.createRadialGradient(32,40,2,32,40,20);g.addColorStop(0,"#fff");g.addColorStop(.4,"#c8a0ff");g.addColorStop(1,"#5a3ad8");x.fillStyle=g;x.fillRect(20,18,24,42);
    x.save();x.translate(22,-14);x.scale(.32,.32);mgShape(x,"star","#b46cff","#16243a");x.restore();};
  D.w_portal_home=(x,P,hi,ol)=>{P([[10,60],[10,14],[18,6],[46,6],[54,14],[54,60],[44,60],[44,18],[20,18],[20,60]],"#eee8e0");const g=x.createRadialGradient(32,40,2,32,40,20);g.addColorStop(0,"#fff");g.addColorStop(.4,"#ffd27a");g.addColorStop(1,"#4aa8ff");x.fillStyle=g;x.fillRect(20,18,24,42);};
  D.mg_trail_oblacici=(x,P,hi,ol)=>{cloud(x,22,44,.75);cloud(x,44,26,.62);cloud(x,30,14,.4);};})();

WDEF.oblaci={gen:genOblaci,env:buildCloudSea,life:spawnWorldLife,preset:"oblaci",fog:.0019,floor:10.5,guide:()=>sova,talk:()=>sovaTalk(),
  item:{one:"Zvjezdani kamenčić",hud:"Kamenčići",done:"Svi kamenčići!",all:"Svih 10 zvjezdanih kamenčića! Vrata Dvorca duge se otvaraju!",first:"Bravo! Strelica gore pokazuje put do najbližeg kamenčića."},
  intro:()=>"Svijet oblaka! Kamenčići: "+wStars("oblaci")+" / "+WSTAR_N+". Portal iza tebe vodi natrag na otok.",
  finale:{chest:"o_dvorac",isl:"dvorac",rewards:["skin:nebeska","trail:oblacici"],locked:"Čarolija drži škrinju zatvorenom. Skupi svih 10 zvjezdanih kamenčića!",
    kicker:"Svijet oblaka je spašen!",title:"Nagrada Dvorca duge",sub:"Nebeska lisica i Oblačići su sad tvoji. Nađeš ih u Čarobnoj trgovini. Nijedna druga lisica ih nema!"}};
