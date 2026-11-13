/* =================== NATURE =================== */
/* trees are real blocks (logs + see-through leaves); grass, flowers, kelp and corals are crossed sprites that sway.
   every sprite remembers the cell it grows in, so digging or building there makes it disappear */
const plantU={uCamP:{value:new THREE.Vector3()},uFPk:{value:0}};
function windify(mat,amt,spd){spd=spd||1;mat.onBeforeCompile=sh=>{sh.uniforms.uTime=uTime;sh.uniforms.uCamP=plantU.uCamP;sh.uniforms.uFPk=plantU.uFPk;sh.vertexShader="uniform float uTime;uniform vec3 uCamP;uniform float uFPk;\n"+sh.vertexShader.replace("#include <begin_vertex>",
  "#include <begin_vertex>\n#ifdef USE_INSTANCING\nfloat ph=instanceMatrix[3].x*.21+instanceMatrix[3].z*.17+instanceMatrix[3].y*.5;transformed.y*=mix(1.,mix(.15,1.,smoothstep(.7,2.2,length(instanceMatrix[3].xz-uCamP.xz)+step(1.5,abs(instanceMatrix[3].y-uCamP.y))*9.)),uFPk);\n#else\nfloat ph=0.;\n#endif\nfloat hh=max(position.y,0.);transformed.x+=sin(uTime*"+(1.6*spd).toFixed(2)+"+ph)*"+amt+"*hh;transformed.z+=cos(uTime*"+(1.3*spd).toFixed(2)+"+ph*1.3)*"+amt+"*.6*hh;");};
  mat.customProgramCacheKey=()=>"wind"+amt+"_"+spd;return mat;}
const autumnTrees=[];
const treeSpots=[];
const BIRCH=[];
function plantTrees(){
  const ok=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z=z+dz;if(X<2||Z<2||X>=W-2||Z>=W-2)return false;if(mask[X+Z*W])return false;}return true;};
  const far=(x,z,d)=>{for(const s of treeSpots)if(Math.abs(s[0]-x)<d&&Math.abs(s[1]-z)<d)return false;return true;};
  const leaf=(x,y,z,t)=>{if(inb(x,y,z)&&!vox[I(x,y,z)])vox[I(x,y,z)]=t;};
  const conifer=(x,h,z,th,trunk)=>{for(let y=0;y<th;y++)vox[I(x,h+y,z)]=trunk;
    for(let k=0;k<th-1;k++){const y=h+th-k;const rad=k===0?0:k<2?1:(k%2?2:1);for(let dz=-rad;dz<=rad;dz++)for(let dx=-rad;dx<=rad;dx++){if(rad===2&&Math.abs(dx)===2&&Math.abs(dz)===2)continue;leaf(x+dx,y,z+dz,T.smreka);}}leaf(x,h+th+1,z,T.smreka);};
  const broad=(x,h,z,th,trunk,lt)=>{for(let y=0;y<th;y++)vox[I(x,h+y,z)]=trunk;
    for(let ly=th-2;ly<=th+1;ly++){const rad=ly<th?2:1;for(let dz=-rad;dz<=rad;dz++)for(let dx=-rad;dx<=rad;dx++){
      const corner=Math.abs(dx)===rad&&Math.abs(dz)===rad;if(corner&&(ly>=th||hash3(x+dx,ly,z+dz)<.5))continue;if(ly===th+1&&corner)continue;if(!dx&&!dz&&ly<th)continue;leaf(x+dx,h+ly,z+dz,lt);}}};
  for(let z=3;z<W-3;z++)for(let x=3;x<W-3;x++){const h=hmap[x+z*W],b=biome[x+z*W];const top=vox[I(x,h-1,z)];if(get(x,h,z)||get(x,h+1,z))continue;const r=hash2(x,z,41);
    if(b===1){/* desert: cacti */if(top===T.pijesak&&h>=SL+4&&r<.018&&ok(x,z,1)&&far(x,z,3)){treeSpots.push([x,z]);const th=1+Math.floor(hash2(x,z,44)*3);for(let y=0;y<th;y++)vox[I(x,h+y,z)]=T.kaktus;}continue;}
    if(top!==T.trava&&top!==T.snijeg)continue;
    if(b===3){if(r<.07&&ok(x,z,2)&&far(x,z,3)){treeSpots.push([x,z]);conifer(x,h,z,5+Math.floor(hash2(x,z,44)*4),T.smreka_d);}continue;}
    if(b===2){if(r<.06&&ok(x,z,2)&&far(x,z,4)){treeSpots.push([x,z]);broad(x,h,z,4+Math.floor(hash2(x,z,44)*2),T.drvo,T.tresnja);}continue;}
    if(b===10){if(top!==T.trava)continue;if(r<.045&&ok(x,z,2)&&far(x,z,3)){treeSpots.push([x,z]);const q=hash2(x,z,47);if(q<.25){conifer(x,h,z,7+Math.floor(hash2(x,z,44)*3),T.smreka_d);}else{const lt=q<.4?T.jesen:T.lisce;const th=5+Math.floor(hash2(x,z,44)*2.5);broad(x,h,z,th,T.drvo,lt);if(lt===T.jesen)autumnTrees.push([x+.5,h+th+1,z+.5]);}}continue;}
    if(b===4||b===5||b===7)continue;
    if(top!==T.trava)continue;
    const forest=fbm(x*.07+20,z*.07+3);const high=h>=SL+11;const dens=b===8?.03:b===6?.035:high?.07:forest>.56?.07:.006;if(r>=dens)continue;if(!ok(x,z,2)||!far(x,z,high?3:4))continue;
    treeSpots.push([x,z]);
    if(high||hash2(x,z,46)<.12){conifer(x,h,z,6+Math.floor(hash2(x,z,44)*3),T.smreka_d);continue;}
    const grove=vnoise(x*.05+40,z*.05+11,17);
    if(grove>.62&&b===0){broad(x,h,z,5+Math.floor(hash2(x,z,44)*2.5),T.breza_d,T.lisce_b);BIRCH.push([x,z]);continue;}
    const q=hash2(x,z,47);const lt=q<.22?T.jesen:q<.3?T.tresnja:T.lisce;const th=4+Math.floor(hash2(x,z,44)*2.5);
    broad(x,h,z,th,T.drvo,lt);if(lt===T.jesen)autumnTrees.push([x+.5,h+th+1,z+.5]);}
  /* boulders: a few mossy stones on grass, cobbles on the beach */
  for(let z=3;z<W-3;z++)for(let x=3;x<W-3;x++){const h=hmap[x+z*W];if(mask[x+z*W]||get(x,h,z))continue;const top=vox[I(x,h-1,z)];const r=hash2(x,z,52);
    if((top===T.trava&&r<.006)||(top===T.kamen&&h>SL+3&&r<.03)||(top===T.pijesak&&h===SL+3&&r<.012)){vox[I(x,h,z)]=r<.004?T.kamen:T.mahovina;if(hash2(x,z,53)<.4&&!get(x+1,h,z)&&hmap[x+1+z*W]===h)vox[I(x+1,h,z)]=T.kamen;}}}
const nature=[];
function plantGeo(name,sc){const r=REG["p_"+name][0];const u0=r[0],u1=r[0]+r[2],v0=1-r[1]-r[3],v1=1-r[1];const P=[],U=[],N=[],X=[];
  for(let k=0;k<2;k++){const a=k*Math.PI/2+Math.PI/4,cx=Math.cos(a)*.5,cz=Math.sin(a)*.5,vi=P.length/3;
    P.push(-cx,0,-cz,cx,0,cz,-cx,1,-cz,cx,1,cz);U.push(u0,v0,u1,v0,u0,v1,u1,v1);N.push(0,1,0,0,1,0,0,1,0,0,1,0);X.push(vi,vi+1,vi+2,vi+2,vi+1,vi+3);}
  const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(P,3));g.setAttribute("uv",new THREE.Float32BufferAttribute(U,2));g.setAttribute("normal",new THREE.Float32BufferAttribute(N,3));g.setIndex(X);g.scale(sc,sc,sc);return g;}
/* a flat quad lying on the ground or on a pond */
function flatGeo(name,sc){const r=REG["p_"+name][0];const u0=r[0],u1=r[0]+r[2],v0=1-r[1]-r[3],v1=1-r[1];const g=new THREE.BufferGeometry();
  g.setAttribute("position",new THREE.Float32BufferAttribute([-.5,0,.5,.5,0,.5,-.5,0,-.5,.5,0,-.5],3));g.setAttribute("uv",new THREE.Float32BufferAttribute([u0,v0,u1,v0,u0,v1,u1,v1],2));
  g.setAttribute("normal",new THREE.Float32BufferAttribute([0,1,0,0,1,0,0,1,0,0,1,0],3));g.setIndex([0,1,2,2,1,3]);g.scale(sc,1,sc);return g;}
const plantMat=windify(new THREE.MeshStandardMaterial({map:plantTex,alphaTest:.5,side:THREE.DoubleSide,roughness:.9}),.09);
const seaPlantMat=windify(new THREE.MeshStandardMaterial({map:plantTex,alphaTest:.5,side:THREE.DoubleSide,roughness:.8}),.16,.45);
const flatMat=new THREE.MeshStandardMaterial({map:plantTex,alphaTest:.5,side:THREE.DoubleSide,roughness:.9,polygonOffset:true,polygonOffsetFactor:-2});
const plantCells=new Map();
const plantCol=new THREE.Color();
/* plants pick up the light where they grow: dark in caves, warm by lanterns, bluish deep under the sea */
function plantLight(it){if(typeof LSKY==="undefined")return plantCol.setRGB(1,1,1);const X=Math.floor(it.x),Y=Math.floor(it.y+.3),Z=Math.floor(it.z);if(!inb(X,Y,Z))return plantCol.setRGB(1,1,1);const j=I(X,Y,Z);
  const s=Math.max(.035,Math.pow(.8,15-LSKY[j])),b=LBLK[j]?Math.pow(.79,15-LBLK[j]):0;let r=Math.min(1,s+b*1.08),g=Math.min(1,s+b*.96),bl=Math.min(1,s+b*.8);if(it.glow){r=Math.max(r,.86);g=Math.max(g,.8);bl=Math.max(bl,.96);}
  if(it.y<WATER){const d=Math.min(1,(WATER-it.y)/8);r*=1-.55*d;g*=1-.25*d;bl*=1-.05*d;}return plantCol.setRGB(r,g,bl);}
function instanced(geo,mat,list,cast){if(!list.length)return;const m=new THREE.InstancedMesh(geo,mat,list.length);const o=new THREE.Object3D();
  list.forEach((it,i)=>{o.position.set(it.x,it.y,it.z);o.rotation.set(0,it.ry||0,0);o.scale.set(it.s||1,it.sy||it.s||1,it.s||1);o.updateMatrix();m.setMatrixAt(i,o.matrix);m.setColorAt(i,plantLight(it));
    if(it.c){for(const c of it.c){let a=plantCells.get(c);if(!a)plantCells.set(c,a=[]);a.push([m,i]);}}});
  m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true;m.castShadow=!!cast;m.receiveShadow=true;scene.add(m);nature.push(m);return m;}
const ZERO_M=new THREE.Matrix4().makeScale(0,0,0);
/* a block changed: plants growing in that cell, or standing on it, go away */
function plantCheck(x,y,z,t){const kill=k=>{const a=plantCells.get(k);if(!a)return;for(const [m,i] of a){m.setMatrixAt(i,ZERO_M);m.instanceMatrix.needsUpdate=true;}plantCells.delete(k);};
  if(t)kill(x+","+y+","+z);else kill(x+","+(y+1)+","+z);}
const FLOWERS=["poppy","dandelion","cornflower","oxeye_daisy","allium","azure_bluet","orange_tulip","pink_tulip","red_tulip","lily_of_the_valley","blue_orchid"];
function grow(){const L={};const add=(k,it)=>{(L[k]||(L[k]=[])).push(it);};const ck=(x,y,z)=>x+","+y+","+z;
  for(let z=1;z<W-1;z++)for(let x=1;x<W-1;x++){if(mask[x+z*W]&&mask[x+z*W]!==5)continue;const h=hmap[x+z*W],b=biome[x+z*W];const top=vox[I(x,h-1,z)];if(!top||get(x,h,z))continue;const r=hash2(x,z,61);
    const jx=(hash2(x,z,63)-.5)*.3,jz=(hash2(x,z,64)-.5)*.3;const base={x:x+.5+jx,y:h,z:z+.5+jz,c:[ck(x,h,z)]};
    /* under the sea */
    if(h<=SL+2&&!TYPES[top].water){const depth=WATER-h;if(depth<.8)continue;
      if(b===7){if(r<.22){const cs=["tube_coral","brain_coral","horn_coral","fire_coral","bubble_coral","tube_coral_fan","fire_coral_fan","horn_coral_fan"];add(cs[Math.floor(hash2(x,z,71)*cs.length)],Object.assign(base,{s:.95,ry:r*30}));continue;}
        if(r<.25){add("sea_pickle",Object.assign(base,{s:.8,ry:r*30}));continue;}}
      if(depth>4&&r<.05&&b!==7){const n=Math.max(2,Math.floor(depth-1-hash2(x,z,72)*2));const c=[ck(x,h,z)];for(let k=0;k<n;k++){c.push(ck(x,h+k,z));}
        for(let k=0;k<n;k++)add(k===n-1?"kelp":"kelp_plant",{x:x+.5,y:h+k,z:z+.5,s:1,ry:r*40+k,c});continue;}
      if(r<.3){if(depth>2.2&&hash2(x,z,73)<.35){const c=[ck(x,h,z),ck(x,h+1,z)];add("tall_seagrass_bottom",{x:x+.5,y:h,z:z+.5,s:1,ry:r*30,c});add("tall_seagrass_top",{x:x+.5,y:h+1,z:z+.5,s:1,ry:r*30,c});}
        else add("seagrass",Object.assign(base,{s:.9+hash2(x,z,65)*.2,ry:r*30}));}
      continue;}
    if(b===1){if(top===T.pijesak&&h>=SL+4){if(r<.03)add("dead_bush",Object.assign(base,{s:.9,ry:r*20}));else if(r<.12)add("short_dry_grass",Object.assign(base,{s:.9,ry:r*20}));}
      else if(top===T.kaktus&&r<.5)add("cactus_flower",Object.assign(base,{s:.8,ry:r*20}));continue;}
    if(b===4){if(top===T.micelij&&r<.12)add(hash2(x,z,74)<.5?"red_mushroom":"brown_mushroom",Object.assign(base,{s:.85,ry:r*20}));continue;}
    if(b===5){if((top===T.kamen||top===T.bijela)&&r<.08)add(hash2(x,z,74)<.6?"amethyst_cluster":"large_amethyst_bud",Object.assign(base,{s:.9,ry:r*20,glow:1}));continue;}
    if(b===3)continue;
    /* sugar cane by fresh or salty water on sand and grass */
    if((top===T.pijesak||top===T.trava)&&h<=SL+4&&r<.06){let wet=false;for(const d of [[1,0],[-1,0],[0,1],[0,-1]]){const X=x+d[0],Z=z+d[1];const hh=hmap[X+Z*W];if(hh<=SL+2||TYPES[get(X,h-1,Z)]&&TYPES[get(X,h-1,Z)].water)wet=true;}
      if(wet){const n=1+Math.floor(hash2(x,z,75)*3);const c=[ck(x,h,z)];for(let k=0;k<n;k++)c.push(ck(x,h+k,z));for(let k=0;k<n;k++)add("sugar_cane",{x:x+.5,y:h+k,z:z+.5,s:1,ry:r*30,c});continue;}}
    if(top!==T.trava&&top!==T.mahovina)continue;
    const meadow=vnoise(x*.12,z*.12,9);
    if(b===2){if(r<.16){add("pink_petals",{flat:1,x:x+.5,y:h+.02,z:z+.5,s:1,ry:Math.floor(r*40)*Math.PI/2,c:[ck(x,h,z)]});continue;}}
    if(meadow>.55&&r<.12+S.bloom*.008){const f=FLOWERS[Math.floor(vnoise(x*.3,z*.3,13)*FLOWERS.length*1.4)%FLOWERS.length];add(f,Object.assign(base,{x:x+.5,z:z+.5,s:.9,ry:r*9}));continue;}
    if(r>.985&&b===0){const q=hash2(x,z,76);add(q<.4?"bush":q<.6?"sweet_berry_bush_stage3":q<.8?"peony_top":"lilac_top",Object.assign(base,{s:1,ry:r*20}));continue;}
    if(r>.975&&b===0&&hash2(x,z,77)<.3){add("firefly_bush",Object.assign(base,{s:1,ry:r*20}));continue;}
    if(r<(small?.22:.36)){const fern=hash2(x,z,62)<(b===6?.4:.1);add(fern?"fern":"short_grass",Object.assign(base,{s:.85+hash2(x,z,65)*.3,sy:.8+hash2(x,z,66)*.45,ry:r*20}));}}
  /* the cave: mushrooms on the tunnel floor, amethyst buds in the crystal hall */
  const caveFloor=(x,z,y0,y1)=>{for(let y=y1;y>=y0;y--){const t=get(x,y-1,z);if(t&&!TYPES[t].water&&!get(x,y,z)&&!get(x,y+1,z))return y;}return -1;};
  if(CAVE.path){const used=new Set();for(const p of CAVE.path.concat(CAVE.ends||[]))for(let k=0;k<3;k++){const x=Math.floor(p[0]+(hash2(k,p[0]|0,81)-.5)*3),z=Math.floor(p[2]+(hash2(k,p[2]|0,82)-.5)*3);const y=caveFloor(x,z,Math.floor(p[1])-2,Math.floor(p[1])+3);
      if(y<0||y>=hmap[x+z*W]||hash2(x,z,83)>.35)continue;if(used.has(ck(x,y,z)))continue;used.add(ck(x,y,z));add(hash2(x,z,84)<.6?"brown_mushroom":"red_mushroom",{x:x+.5,y,z:z+.5,s:.8,ry:hash2(x,z,85)*9,c:[ck(x,y,z)]});}
    const cv=CAVE.cavern;for(let z=Math.floor(cv.z-9);z<=cv.z+9;z++)for(let x=Math.floor(cv.x-9);x<=cv.x+9;x++){const y=caveFloor(x,z,Math.floor(cv.y-4),Math.floor(cv.y+6));if(y<0)continue;const t=get(x,y-1,z);
      if((t===T.ametist||t===T.kristal)&&hash2(x,z,86)<.5)add(hash2(x,z,87)<.5?"amethyst_cluster":"large_amethyst_bud",{x:x+.5,y,z:z+.5,s:.9,ry:hash2(x,z,88)*9,glow:1,c:[ck(x,y,z)]});}}
  /* lily pads on still fresh water */
  for(const k of baseWater){const p=k.split(",").map(Number);if(mask[p[0]+p[2]*W]===3)continue;if(get(p[0],p[1]+1,p[2]))continue;if(hash2(p[0],p[2],89)<.3)add("lily_pad",{flat:1,x:p[0]+.5,y:p[1]+.9,z:p[2]+.5,s:.9,ry:hash2(p[0],p[2],90)*6,c:[k,ck(p[0],p[1]+1,p[2])]});}
  const SEA={kelp:1,kelp_plant:1,seagrass:1,tall_seagrass_bottom:1,tall_seagrass_top:1,tube_coral:1,brain_coral:1,horn_coral:1,fire_coral:1,bubble_coral:1,tube_coral_fan:1,fire_coral_fan:1,horn_coral_fan:1,sea_pickle:1};
  for(const k in L){const flat=L[k][0].flat;instanced(flat?flatGeo(k,1):plantGeo(k,1),flat?flatMat:SEA[k]?seaPlantMat:plantMat,L[k],false);}}
