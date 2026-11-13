/* =================== CAMERA FLIGHT =================== */
function flyTo(x,y,z,dist){const from={t:controls.target.clone(),p:camera.position.clone()};const to=new THREE.Vector3(x,y,z);
  let dir=camera.position.clone().sub(controls.target).setY(0);if(dir.lengthSq()<1)dir.set(1,0,1);dir.normalize();const p=to.clone().add(dir.multiplyScalar(dist*.78)).setY(y+dist*.6);
  flight={from,t:to,p,k:0,d:1.4};controls.autoRotate=false;idleT=0;}
function tickFlight(dt){if(!flight)return;flight.k=Math.min(1,flight.k+dt/flight.d);const e=flight.k<.5?4*flight.k*flight.k*flight.k:1-Math.pow(-2*flight.k+2,3)/2;
  controls.target.lerpVectors(flight.from.t,flight.t,e);camera.position.lerpVectors(flight.from.p,flight.p,e);if(flight.k>=1)flight=null;}

