/* =================== ENVIRONMENT FOLLOWS THE VIEW =================== */
/* shadows follow what you look at (sharper when exploring), and below the sea surface the world turns blue and hazy */
const envFocus=new THREE.Vector3(),UNDER_C=new THREE.Color(0x1d6a96),UNDER_N=new THREE.Color(0x06203a),envTmp=new THREE.Color();let envUnder=false,envExt=0;
function tickEnv(dt){
  if(FP.on)envFocus.copy(FP.p);else envFocus.copy(controls.target);
  const ext=FP.on?36:Math.max(44,Math.min(96,camera.position.distanceTo(controls.target)*.7));
  if(Math.abs(ext-envExt)>2){envExt=ext;const c=sun.shadow.camera;c.left=-ext;c.right=ext;c.top=ext;c.bottom=-ext;c.updateProjectionMatrix();}
  const step=envExt*2/sun.shadow.mapSize.x;const fx=Math.round(envFocus.x/step)*step,fz=Math.round(envFocus.z/step)*step,fy=Math.round(envFocus.y);
  sun.target.position.set(fx,fy,fz);sun.target.updateMatrixWorld();sun.position.set(fx+tmpV.x*150,fy+tmpV.y*150,fz+tmpV.z*150);
  const cp=camera.position;const under=cp.y<WATER-.02&&waterAt(cp.x,cp.y,cp.z);
  if(under){envTmp.copy(UNDER_C).lerp(UNDER_N,cur.night||0);const lt=lightAt(cp.x,cp.y,cp.z);
    scene.fog.color.copy(envTmp).convertSRGBToLinear();scene.fog.density=S.gear&&S.gear.maska?.032:.05;waterU.uFogC.value.copy(envTmp);waterU.uFogD.value=scene.fog.density;
    if(!envUnder){envUnder=true;sky.visible=false;starM.visible=false;scene.background=new THREE.Color();waterU.uUnder.value=1;}scene.background.copy(scene.fog.color);}
  else if(envUnder){envUnder=false;sky.visible=true;starM.visible=true;scene.background=null;scene.fog.density=.0034;waterU.uFogD.value=.0034;waterU.uUnder.value=0;}
  if(!FP.on)voxU.uLamp.value.w=0;}
