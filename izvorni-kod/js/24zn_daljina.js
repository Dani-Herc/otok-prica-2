/* =================== v43: DALJINA: the lands you see across the water get trees and landmarks ===================
   The far-land meshes were bare hills. Each one now carries instanced trees (two draw calls per land), its pier,
   and what makes it recognisable: market awnings in Lučki grad, the pond and cherry trees in Cvjetna dolina, the
   lookout tower in Gorski kraj, lamps along every bridge. Nothing is saved. */
{const _di=dImp;dImp=function(k){const grp=_di.apply(this,arguments);try{const D=k?DST[k]:null,sd=D?D.sd:11,dens=k?Math.min(.5,D.tree*13):.2,spots=[];
    for(let z=8;z<W-8;z+=4)for(let x=8;x<W-8;x+=4){const jx=x+(hash2(x,z,sd+1)-.5)*3,jz=z+(hash2(x,z,sd+2)-.5)*3,h=k?dH(k,jx,jz):raw(jx,jz);if(h<SL+4.6||h>SL+(k==="gora"?24:19))continue;const d=Math.hypot(jx-128,jz-128);if(d<15)continue;if(hash2(x,z,sd)>dens)continue;
      if(k&&D.plots.some(p=>Math.hypot(p.x-jx,p.z-jz)<10))continue;if(!k&&PLOTS.slice(0,DPN).some(p=>Math.hypot(p.x-jx,p.z-jz)<9))continue;spots.push([jx,h,jz,hash2(x,z,sd+3)]);}
    if(spots.length){const n=spots.length,cone=k==="gora",mt=new THREE.MeshStandardMaterial({roughness:1,flatShading:true}),tr=new THREE.InstancedMesh(new THREE.BoxGeometry(.9,3.2,.9),new THREE.MeshStandardMaterial({color:LC(cone?0x4a3424:0x6a4a2c),roughness:1}),n),
        cr=new THREE.InstancedMesh(cone?new THREE.ConeGeometry(2.5,7,6):new THREE.IcosahedronGeometry(2.7,0),mt,n),m=new THREE.Matrix4(),q=new THREE.Quaternion(),c=new THREE.Color(),s=new THREE.Vector3(),p=new THREE.Vector3();
      spots.forEach((t,i)=>{const sc=.8+t[3]*.55;q.setFromAxisAngle(new THREE.Vector3(0,1,0),t[3]*6.28);m.compose(p.set(t[0],t[1]+1.4*sc,t[2]),q,s.set(sc,sc,sc));tr.setMatrixAt(i,m);m.compose(p.set(t[0],t[1]+(cone?5.6:4.6)*sc,t[2]),q,s.set(sc,sc*(cone?1:.86),sc));cr.setMatrixAt(i,m);
        if(cone)c.setRGB(.13+t[3]*.05,.3+t[3]*.08,.2);else if(k==="dolina"&&t[3]>.62)c.setRGB(.86,.56,.68);else if(!k&&t[3]>.8)c.setRGB(.8,.45,.16);else c.setRGB(.2+t[3]*.1,.46+t[3]*.14,.18);cr.setColorAt(i,c);});
      cr.instanceColor.needsUpdate=true;tr.castShadow=cr.castShadow=false;grp.add(tr);grp.add(cr);}
    const box=(x,y,z,w,h,dp,col,ry,basic)=>{const mm=new THREE.Mesh(new THREE.BoxGeometry(w,h,dp),basic?new THREE.MeshBasicMaterial({color:col}):new THREE.MeshStandardMaterial({color:LC(col),roughness:1}));mm.position.set(x,y,z);if(ry)mm.rotation.y=ry;mm.castShadow=false;grp.add(mm);return mm;};
    const A=k?D.b:(HERE?DST[HERE].a:null);if(A!=null)for(let r=60;r<=108;r+=8)for(const w of [-2.6,2.6]){const x=128.5+Math.cos(A)*r-Math.sin(A)*w,z=128.5+Math.sin(A)*r+Math.cos(A)*w;box(x,DBY+2,z,.8,2.6,.8,0x6a4a2c);box(x,DBY+3.7,z,1,1,1,0xffd27a,0,true);}
    if(k){const pa=D.b+(k==="dolina"?-1:1)*Math.PI/2,pc=Math.cos(pa),ps=Math.sin(pa);let r0=62;for(let r=40;r<100;r++)if(dH(k,128.5+pc*r,128.5+ps*r)<DBY){r0=r;break;}const len=k==="luka"?24:16;box(128.5+pc*(r0+len/2-1),DBY+.5,128.5+ps*(r0+len/2-1),len,1,3.2,0x9a7a4c,-pa);
      if(k==="luka"){box(128.5+pc*(r0+len-2),DBY+5,128.5+ps*(r0+len-2),5.4,1,5.4,0xd8392f,-pa);[[-6,0,0xd8392f],[0,-7,0x4a7fd6],[6,-1,0xf2b22e]].forEach(a=>{box(128.5+a[0],SL+7.2,128.5+a[1],3.4,2,1.6,0x8a6038);box(128.5+a[0],SL+8.8,128.5+a[1],3.8,.6,2,a[2]);});}
      if(D.pond){const P=D.pond,cy=new THREE.Mesh(new THREE.CylinderGeometry(P.r,P.r,.5,18),new THREE.MeshStandardMaterial({color:LC(0x3f8fd0),roughness:.4}));cy.position.set(P.x,dH(k,P.x+P.r+2,P.z)-.2,P.z);grp.add(cy);}
      if(D.hill){const Hh=D.hill,y=dH(k,Hh.x,Hh.z);box(Hh.x,y+5,Hh.z,7,10,7,0xb9b2a4);box(Hh.x,y+10.5,Hh.z,9,1,9,0x7a5230);box(Hh.x+2,y+11.6,Hh.z+2,1,1,1,0xffd27a,0,true);}}
  grp.traverse(o=>{if(o.material)o.material.fog=false;});}catch(e){console.warn("daljina",e);}return grp;};}
