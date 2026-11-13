/* =================== AMBIENT LIFE =================== */
const life={};
function std(c,o){return new THREE.MeshStandardMaterial(Object.assign({color:LC(c),roughness:.75,flatShading:true},o||{}));}
function buildLife(){
  // clouds
  life.clouds=[];const cm=new THREE.MeshStandardMaterial({color:0xffffff,emissive:LC(0xc8d6e8),emissiveIntensity:.55,roughness:1,flatShading:true});life.cloudMat=cm;for(let i=0;i<12;i++){const g=new THREE.Group();const n=5+Math.floor(Math.random()*5);
    for(let j=0;j<n;j++){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),cm);const s=2.2+Math.random()*2.6;m.scale.set(s*1.3,s*.75,s);m.position.set((j-n/2)*2.6+Math.random(),Math.random()*1.4,(Math.random()-.5)*4);m.castShadow=true;g.add(m);}
    g.position.set(CX-220+Math.random()*440,SL+60+Math.random()*14,CZ-200+Math.random()*400);g.userData.v=1+Math.random()*1.2;scene.add(g);life.clouds.push(g);}
  // balloon
  const b=new THREE.Group();const bg=new THREE.SphereGeometry(3,16,12);const cols=[];const pos=bg.attributes.position;const BC=[0xe8503c,0xffd24a,0x3f8fe0,0xffffff].map(LC);
  for(let i=0;i<pos.count;i++){const a=Math.atan2(pos.getZ(i),pos.getX(i));const k=Math.floor((a+Math.PI)/(Math.PI*2)*8)%4;cols.push(BC[k].r,BC[k].g,BC[k].b);}
  bg.setAttribute("color",new THREE.Float32BufferAttribute(cols,3));bg.scale(1,1.15,1);const env=new THREE.Mesh(bg,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.6,flatShading:true}));env.castShadow=true;b.add(env);
  const bk=new THREE.Mesh(new THREE.BoxGeometry(1.1,.8,1.1),std(0x8a5a32));bk.position.y=-4.6;bk.castShadow=true;b.add(bk);
  const ropeM=new THREE.LineBasicMaterial({color:0x5a4030});[[1,1],[-1,1],[1,-1],[-1,-1]].forEach(c=>{const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(c[0]*.5,-4.2,c[1]*.5),new THREE.Vector3(c[0]*1.4,-2.6,c[1]*1.4)]);b.add(new THREE.Line(g,ropeM));});
  const flame=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xffa040,blending:THREE.AdditiveBlending,depthWrite:false}));flame.position.y=-3.6;flame.scale.set(1.6,1.6,1);b.add(flame);life.flame=flame;
  scene.add(b);life.balloon=b;
  // sailboat
  const s=new THREE.Group();const hull=new THREE.Mesh(new THREE.BoxGeometry(1.6,.7,4),std(0xa8643a));hull.position.y=.2;hull.castShadow=true;s.add(hull);
  const bow=new THREE.Mesh(new THREE.ConeGeometry(.8,1.4,4),std(0xa8643a));bow.rotation.x=Math.PI/2;bow.rotation.y=Math.PI/4;bow.scale.set(1,1,.45);bow.position.set(0,.2,2.6);s.add(bow);
  const deck=new THREE.Mesh(new THREE.BoxGeometry(1.4,.1,3.8),std(0xe7c089));deck.position.y=.58;s.add(deck);
  const mast=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,5,6),std(0x6b4a2a));mast.position.set(0,3,.3);s.add(mast);
  const sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.Float32BufferAttribute([0,.9,.4, 0,5.2,.4, 0,.9,-1.9],3));sg.computeVertexNormals();
  const sail=new THREE.Mesh(sg,std(0xfdf8ec,{side:THREE.DoubleSide}));sail.castShadow=true;s.add(sail);
  const jg=new THREE.BufferGeometry();jg.setAttribute("position",new THREE.Float32BufferAttribute([0,1,.6, 0,4.8,.4, 0,1,2.4],3));jg.computeVertexNormals();s.add(new THREE.Mesh(jg,std(0xd94d63,{side:THREE.DoubleSide})));
  scene.add(s);life.boat=s;
  // birds
  life.birds=[];const bm=std(0x2b2f3a,{side:THREE.DoubleSide});for(let i=0;i<9;i++){const g=new THREE.Group();const wg=new THREE.BufferGeometry();wg.setAttribute("position",new THREE.Float32BufferAttribute([0,0,.14, 0,0,-.14, .6,0,.05],3));wg.computeVertexNormals();
    const l=new THREE.Mesh(wg,bm),r=new THREE.Mesh(wg,bm);r.scale.x=-1;g.add(l,r);g.userData={l,r,o:i};scene.add(g);life.birds.push(g);}
  // dolphins
  life.dol=[];for(let i=0;i<2;i++){const d=new THREE.Group();const body=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),std(0x5d7f9e));body.scale.set(.75,.7,2.2);d.add(body);
    const belly=new THREE.Mesh(new THREE.SphereGeometry(.45,10,8),std(0xdfe8ef));belly.scale.set(.6,.5,1.8);belly.position.y=-.14;d.add(belly);
    const fin=new THREE.Mesh(new THREE.ConeGeometry(.22,.6,4),std(0x4d6f8e));fin.position.set(0,.45,-.1);fin.rotation.x=-.5;d.add(fin);
    const tail=new THREE.Mesh(new THREE.BoxGeometry(1,.08,.35),std(0x4d6f8e));tail.position.z=-1.15;d.add(tail);const snout=new THREE.Mesh(new THREE.ConeGeometry(.16,.5,6),std(0x5d7f9e));snout.rotation.x=Math.PI/2;snout.position.z=1.25;d.add(snout);
    d.visible=false;scene.add(d);life.dol.push(d);}
  life.jump=null;life.nextJump=4;
  // butterflies
  life.bf=[];const bcol=[0xffb02e,0xf05a7e,0x6ec6ff,0xffffff,0xb98cf0];for(let i=0;i<14;i++){const g=new THREE.Group();const m=std(bcol[i%5],{side:THREE.DoubleSide});
    const wg=new THREE.PlaneGeometry(.32,.24);wg.translate(.16,0,0);const l=new THREE.Mesh(wg,m),r=new THREE.Mesh(wg,m);r.scale.x=-1;g.add(l,r);
    let x,z,y,tries=0;do{x=CX+(Math.random()-.5)*84;z=CZ+(Math.random()-.5)*84;y=topY(x,z);tries++;}while((y<SL+4||y>SL+12)&&tries<80);
    g.userData={l,r,hx:x,hz:z,hy:y+1.4,ph:Math.random()*9};scene.add(g);life.bf.push(g);}
  // windmill on the side opposite the mountain
  const wa=MA+Math.PI+.35;let wx=Math.round(CX+Math.cos(wa)*38),wz=Math.round(CZ+Math.sin(wa)*38);
  for(let r=40;r>16;r--){wx=Math.round(CX+Math.cos(wa)*r);wz=Math.round(CZ+Math.sin(wa)*r);let ok=true;for(let dz=-2;dz<=2&&ok;dz++)for(let dx=-2;dx<=2;dx++){const k=(wx+dx)+(wz+dz)*W;if(mask[k]||hmap[k]<SL+5){ok=false;break;}}if(ok)break;}
  const wy=topY(wx,wz)+1;const wm=new THREE.Group();const tower=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.8,7,10),std(0xf3eee2));tower.position.y=3.5;tower.castShadow=true;tower.receiveShadow=true;wm.add(tower);
  const cap=new THREE.Mesh(new THREE.ConeGeometry(1.5,1.8,10),std(0xc0503e));cap.position.y=7.9;cap.castShadow=true;wm.add(cap);
  const door=new THREE.Mesh(new THREE.BoxGeometry(.7,1.2,.2),std(0x7a5233));door.position.set(0,.6,1.72);wm.add(door);
  const hub=new THREE.Group();hub.position.set(0,6.8,1.35);for(let k=0;k<4;k++){const arm=new THREE.Group();arm.rotation.z=k*Math.PI/2;const sp=new THREE.Mesh(new THREE.BoxGeometry(.14,4.2,.1),std(0x7a5233));sp.position.y=2.1;arm.add(sp);
    const sl=new THREE.Mesh(new THREE.BoxGeometry(.9,3.4,.04),std(0xfdf8ec));sl.position.set(.5,2.4,0);sl.castShadow=true;arm.add(sl);hub.add(arm);}
  wm.add(hub);wm.position.set(wx+.5,wy,wz+.5);wm.rotation.y=Math.atan2(CX-wx,CZ-wz);scene.add(wm);life.mill=hub;
  for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)mask[(wx+dx)+(wz+dz)*W]=mask[(wx+dx)+(wz+dz)*W]||5;
  // fountain water
  const fw=new THREE.Mesh(new THREE.CircleGeometry(1.9,20).rotateX(-Math.PI/2),flowMat);fw.position.set(LIB.x+.5,LIB.h+.75,LIB.z+9.5);scene.add(fw);life.fountain=new THREE.Vector3(LIB.x+.5,LIB.h+3,LIB.z+9.5);
}
const lanterns=[];const tmpBal=new THREE.Vector3();
const postGeo=new THREE.CylinderGeometry(.07,.09,1.8,6),lampGeo=new THREE.BoxGeometry(.34,.4,.34);const postMat=std(0x2c2a30),lampMat=new THREE.MeshStandardMaterial({color:LC(0xffe2a0),emissive:LC(0xffc35a),emissiveIntensity:.4});
function addLantern(x,z){const y=topY(x,z)+1;const g=new THREE.Group();const p=new THREE.Mesh(postGeo,postMat);p.position.y=.9;p.castShadow=true;g.add(p);const l=new THREE.Mesh(lampGeo,lampMat);l.position.y=1.95;g.add(l);
  const s=new THREE.Sprite(glowMatW);s.position.y=1.95;s.scale.set(4.4,4.4,1);g.add(s);g.position.set(x,y,z);scene.add(g);lanterns.push(g);}
function tickLife(dt,t,night){
  for(const c of life.clouds){c.position.x+=c.userData.v*dt;if(c.position.x>CX+230)c.position.x=CX-230;}
  const ba=t*.022;if(G2.mode!=="balloon"){tmpBal.set(CX+Math.cos(ba)*64,SL+40+Math.sin(t*.4)*1.2,CZ+Math.sin(ba)*64);if(!life.bInit){life.balloon.position.copy(tmpBal);life.bInit=1;}life.balloon.position.lerp(tmpBal,Math.min(1,dt*.8));life.balloon.rotation.set(0,-ba,0);life.balloon.children[0].rotation.z=0;life.flame.material.opacity=.5+Math.sin(t*9)*.2+night*.4;life.flame.scale.set(1.6,1.6,1);}
  const sa=-t*.02;life.boat.position.set(CX+Math.cos(sa)*104,WATER-.15+Math.sin(t*1.6)*.12,CZ+Math.sin(sa)*104);life.boat.rotation.set(Math.sin(t*1.3)*.05,-sa+Math.PI,Math.sin(t*1.1)*.06);
  if(Math.random()<dt*6)burst(life.boat.position.x-Math.sin(-sa+Math.PI)*-2,WATER+.1,life.boat.position.z-Math.cos(-sa+Math.PI)*-2,1,[[1,1,1]],.4,.4,.8,0);
  life.birds.forEach(g=>{const o=g.userData.o;const a=t*.18+o*.09;const r=40+(o%3)*1.5;g.position.set(CX+Math.cos(a)*r+(o%2)*1.2,SL+37+Math.sin(t*.5+o)*1.5+(o%3)*.8,CZ+Math.sin(a)*r);g.rotation.y=-a;const f=Math.sin(t*9+o)*.6;g.userData.l.rotation.z=f;g.userData.r.rotation.z=-f;g.visible=night<.5;});
  life.bf.forEach(g=>{const u=g.userData;const k=t*.6+u.ph;g.position.set(u.hx+Math.sin(k)*2.2+Math.sin(k*2.3)*.6,u.hy+Math.sin(k*3.1)*.4,u.hz+Math.cos(k*.8)*2.2);g.rotation.y=k;const f=Math.sin(t*22+u.ph)*1.1;u.l.rotation.y=f;u.r.rotation.y=-f;g.visible=night<.5;});
  life.mill.rotation.z-=dt*.7;
  // dolphins
  if(!life.jump){life.nextJump-=dt;if(life.nextJump<=0){for(let n=0;n<20;n++){const a=Math.random()*Math.PI*2,r=76+Math.random()*28;const dir=a+Math.PI/2+(Math.random()-.5);const x=CX+Math.cos(a)*r,z=CZ+Math.sin(a)*r;let deep=true;for(let k=-5;k<=5;k+=2.5){const X=Math.floor(x+Math.cos(dir)*k),Z=Math.floor(z+Math.sin(dir)*k);if(X<0||Z<0||X>=W||Z>=W)continue;if(hmap[X+Z*W]>SL-1)deep=false;}
    if(deep){life.jump={t:0,x,z,dx:Math.cos(dir),dz:Math.sin(dir),k:0};break;}}if(!life.jump)life.nextJump=3;}}
  else{const j=life.jump;j.t+=dt;const D=1.5;life.dol.forEach((d,i)=>{const tt=j.t-i*.45;if(tt<0||tt>D){d.visible=false;return;}d.visible=true;const u=tt/D;const L=9;const px=j.x+j.dx*(u-.5)*L+(i?-j.dz*1.6:0),pz=j.z+j.dz*(u-.5)*L+(i?j.dx*1.6:0);
      const y=WATER-1+Math.sin(u*Math.PI)*3.6;d.position.set(px,y,pz);d.rotation.order="YXZ";d.rotation.y=Math.atan2(j.dx,j.dz);d.rotation.x=-Math.cos(u*Math.PI)*.9;
      if((u<.08||u>.9)&&Math.random()<.6)burst(px,WATER+.1,pz,6,[[1,1,1],[.8,.93,1]],1.6,3,.8);});
    if(j.t>2.4){life.jump=null;life.nextJump=10+Math.random()*16;}}
  // water features
  if(mistAt&&Math.random()<dt*30)burst(mistAt.x+(Math.random()-.5)*2,mistAt.y,mistAt.z+(Math.random()-.5)*2,1,[[.92,.97,1],[1,1,1]],1,2.2,1.4,1.2);
  if(Math.random()<dt*28)burst(life.fountain.x,life.fountain.y-1.2,life.fountain.z,1,[[.75,.9,1],[1,1,1]],.55,3.2,.9,6);
  // autumn leaves
  if(night<.5&&autumnTrees.length&&Math.random()<dt*3){const a=autumnTrees[Math.floor(Math.random()*autumnTrees.length)];const p={x:a[0]+(Math.random()-.5),y:a[1],z:a[2]+(Math.random()-.5),vx:.4+Math.random()*.4,vy:-.2,vz:.2,l:5,g:.06,sway:1,c:[[.92,.52,.2],[.86,.33,.18],[.95,.75,.25]][Math.floor(Math.random()*3)]};parts.push(p);}
  // fireflies
  if(night>.4&&Math.random()<dt*20){const fx=CX+(Math.random()-.5)*90,fz=CZ+(Math.random()-.5)*90,fy=topY(fx,fz);if(fy>SL+3)burst(fx,fy+1.2+Math.random()*2,fz,1,[[1,.95,.45],[.85,1,.5]],.25,.15,3.5,-.02);}
}

/* bottle */
let bottle=null;
function bottleSpot(){const c=[];for(let z=1;z<W-1;z++)for(let x=1;x<W-1;x++){if(hmap[x+z*W]>SL+2)continue;let shore=false;[[2,0],[-2,0],[0,2],[0,-2]].forEach(d=>{const X=x+d[0],Z=z+d[1];if(X>=0&&Z>=0&&X<W&&Z<W&&hmap[X+Z*W]===SL+3)shore=true;});if(shore&&Math.hypot(x-CX,z-CZ)<62)c.push([x,z]);}
  return c[Math.floor(hash2(S.letters.length,3,77)*c.length)]||[CX+56,CZ];}
function syncBottle(){const unread=S.letters.find(l=>!l.read);
  if(unread&&!bottle){const g=new THREE.Group();const glass=new THREE.MeshStandardMaterial({color:LC(0x6fd3a8),transparent:true,opacity:.75,roughness:.1});
    const b1=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.8,12),glass);const b2=new THREE.Mesh(new THREE.CylinderGeometry(.12,.18,.3,10),glass);b2.position.y=.55;
    const cork=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.16,8),std(0x9a6b3c));cork.position.y=.75;const paper=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.58,8),std(0xfff6dc));
    const inner=new THREE.Group();inner.add(b1,b2,cork,paper);inner.rotation.z=1.25;g.add(inner);const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:GLOW,color:0xfff2b0,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.6}));sp.scale.set(2.6,2.6,1);g.add(sp);
    const p=bottleSpot();g.position.set(p[0]+.5,WATER,p[1]+.5);g.userData.bottle=true;scene.add(g);bottle=g;}
  else if(!unread&&bottle){scene.remove(bottle);bottle=null;}}

/* signs */
const signs={};
function signTex(b){const c=document.createElement("canvas");c.width=512;c.height=150;const x=c.getContext("2d");const G=GENRES[b.genre];
  const rr=(X,Y,w,h,r)=>{x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+w,Y,X+w,Y+h,r);x.arcTo(X+w,Y+h,X,Y+h,r);x.arcTo(X,Y+h,X,Y,r);x.arcTo(X,Y,X+w,Y,r);x.closePath();};
  rr(6,6,500,120,26);x.fillStyle="#fffdf7";x.fill();x.lineWidth=8;x.strokeStyle="#16243a";x.stroke();x.fillStyle=G.col;rr(6,6,40,120,20);x.fill();
  x.fillStyle="#16243a";x.font="700 44px 'Pixelify Sans', monospace";let t=b.title;while(x.measureText(t).width>420&&t.length>3)t=t.slice(0,-2);if(t!==b.title)t=t.trim()+"…";x.fillText(t,64,62);
  const pct=b.done?100:Math.round(100*b.page/b.pages);x.font="600 26px Lexend, sans-serif";x.fillStyle="#52637a";x.fillText(b.done?"Pročitano!":bldName(b),64,100);
  if(!b.done){rr(300,80,140,22,10);x.fillStyle="#f1ede2";x.fill();x.lineWidth=4;x.stroke();rr(300,80,Math.max(16,140*pct/100),22,10);x.fillStyle=G.col;x.fill();x.fillStyle="#16243a";x.font="700 28px 'Pixelify Sans',monospace";x.fillText(pct+"%",450,101);}
  else{x.fillStyle="#c98a00";x.font="700 30px 'Pixelify Sans',monospace";x.fillText("★".repeat(b.stars||0),330,102);}
  x.beginPath();x.moveTo(236,126);x.lineTo(256,146);x.lineTo(276,126);x.fillStyle="#16243a";x.fill();const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;return tex;}
function syncSigns(){for(const b of S.books){const plot=PLOTS[b.plot];if(!plot)continue;let s=signs[b.id];const key=b.title+b.page+b.done+b.stars;
  if(!s){s=new THREE.Sprite(new THREE.SpriteMaterial({depthTest:true,depthWrite:false,alphaTest:.03,fog:false,toneMapped:false}));s.renderOrder=6;s.scale.set(5,1.47,1);scene.add(s);signs[b.id]=s;s.userData.book=b.id;}
  if(s.userData.key!==key){if(s.material.map)s.material.map.dispose();s.material.map=signTex(b);s.material.needsUpdate=true;s.userData.key=key;}
  const L=blueprint(bkey(b));let maxY=0;for(const p of L)maxY=Math.max(maxY,p[1]);s.position.set(plot.x+.5,plot.h+maxY+3.4,plot.z+.5);}
  for(const id in signs)if(!S.books.find(b=>b.id===id)){scene.remove(signs[id]);delete signs[id];}}
/* special effects per finished landmark */
const beams=[];
function syncSpecials(){for(const b of S.books){if(!b.done||b._fx)continue;b._fx=1;const p=PLOTS[b.plot];
  if(b.genre==="misterij"){const g=new THREE.Group();const cone=new THREE.Mesh(new THREE.ConeGeometry(2.6,26,16,1,true),new THREE.MeshBasicMaterial({map:BEAMTEX,color:0xfff0b0,transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));
    cone.rotation.z=Math.PI/2;cone.position.x=13;g.add(cone);g.position.set(p.x+1.5,p.h+9.5,p.z+.5);scene.add(g);beams.push(g);}
  if(b.genre==="fantazija")beams.push({sparkle:[p.x+.5,p.h+3,p.z+.5]});}}

const beam=new THREE.Mesh(new THREE.CylinderGeometry(.6,1.6,90,16,1,true),new THREE.MeshBasicMaterial({color:0xfff0a0,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));
beam.position.set(LIB.x+.5,LIB.h+19+45,LIB.z+.5);scene.add(beam);
const libLight=new THREE.PointLight(0xffd27a,0,40,2);libLight.position.set(LIB.x+.5,LIB.h+15.5,LIB.z+.5);scene.add(libLight);

