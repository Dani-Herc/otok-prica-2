/* =================== NOISE =================== */
function hash2(x,z,s){let h=Math.imul(x|0,374761393)^Math.imul(z|0,668265263)^Math.imul((s|0)+7,1442695041);h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return (h>>>0)/4294967296;}
function hash3(x,y,z){return hash2(x*31+y*7,z*17-y*13,y);}
function vnoise(x,z,s){const xi=Math.floor(x),zi=Math.floor(z),xf=x-xi,zf=z-zi,u=xf*xf*(3-2*xf),v=zf*zf*(3-2*zf);
  const a=hash2(xi,zi,s),b=hash2(xi+1,zi,s),c=hash2(xi,zi+1,s),d=hash2(xi+1,zi+1,s);return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v;}
function fbm(x,z){return vnoise(x,z,1)*.55+vnoise(x*2.03,z*2.03,2)*.27+vnoise(x*4.1,z*4.1,3)*.12+vnoise(x*8.2,z*8.2,4)*.06;}
function sstep(e0,e1,x){let t=(x-e0)/(e1-e0);t=t<0?0:t>1?1:t;return t*t*(3-2*t);}
const rng=(()=>{let s=12345;return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};})();

