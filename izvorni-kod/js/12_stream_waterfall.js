/* =================== STREAM & WATERFALL =================== */
let mistAt=null;
function buildStream(){if(STREAM.length<3)return;const l=STREAM[STREAM.length-1];mistAt=new THREE.Vector3(l[0],WATER+.2,l[1]);}

