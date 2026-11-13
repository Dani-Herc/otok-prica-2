/* =================== TIME OF DAY =================== */
const PRESETS={
  jutro:{top:0x6fb0ea,hz:0xffd0a6,sun:0xffcf9a,si:2.1,hemi:.6,el:.3,az:1.2,fog:0xf3d6be,glow:.5,stars:0,sh:0x86dcd2,dp:0x2b70b4,exp:1.05,night:0},
  dan:{top:0x3d8fe8,hz:0xcbe8fb,sun:0xfff1dc,si:2.7,hemi:.62,el:.72,az:.75,fog:0xcbe8fb,glow:.3,stars:0,sh:0x62d8cf,dp:0x1d6db8,exp:1.0,night:0},
  vecer:{top:0x4a4fa8,hz:0xff9a6a,sun:0xffa070,si:1.8,hemi:.48,el:.17,az:-1.2,fog:0xeaa48c,glow:.9,stars:.25,sh:0x6fb2bf,dp:0x2a4d94,exp:1.05,night:.5},
  noc:{top:0x050c22,hz:0x1c2a5c,sun:0x8aa4ff,si:.34,hemi:.46,el:.8,az:-.4,fog:0x121c40,glow:1.5,stars:1,sh:0x24506e,dp:0x081838,exp:.95,night:1}
};
const TIME_ORDER=["auto","jutro","dan","vecer","noc"];let timeMode="auto";
function autoPreset(){const h=new Date().getHours();return h>=6&&h<9?"jutro":h>=9&&h<17?"dan":h>=17&&h<20?"vecer":"noc";}
const cur={},tgt={};const COLK=["top","hz","sun","fog","sh","dp"],NUMK=["si","hemi","el","az","glow","stars","exp","night"];
function setTime(p,instant){const P=PRESETS[p];tgt.name=p;COLK.forEach(k=>{tgt[k]=new THREE.Color(P[k]);if(!cur[k]||instant)cur[k]=tgt[k].clone();});NUMK.forEach(k=>{tgt[k]=P[k];if(cur[k]==null||instant)cur[k]=P[k];});renderTimeBtn();}
const tmpV=new THREE.Vector3(),WHITE_L=new THREE.Color(1,1,1);
function tickTime(dt){const a=Math.min(1,dt*2);COLK.forEach(k=>cur[k].lerp(tgt[k],a));NUMK.forEach(k=>cur[k]+=(tgt[k]-cur[k])*a);
  skyU.top.value.copy(cur.top);skyU.hz.value.copy(cur.hz);skyU.sunC.value.copy(cur.sun);skyU.night.value=cur.night;
  scene.fog.color.copy(cur.fog).convertSRGBToLinear();sun.color.copy(cur.sun).convertSRGBToLinear();sun.intensity=cur.si;hemi.intensity=cur.hemi;hemi.color.copy(cur.hz).convertSRGBToLinear().lerp(WHITE_L,.35*(1-cur.night));
  const sc=1-cur.night*.45;for(const id in signs)signs[id].material.color.setRGB(sc,sc,sc*1.05);renderer.toneMappingExposure=cur.exp;
  const sx=Math.cos(cur.az)*Math.cos(cur.el),sy=Math.sin(cur.el),sz=Math.sin(cur.az)*Math.cos(cur.el);tmpV.set(sx,sy,sz);sun.position.set(CX+sx*150,sy*150,CZ+sz*150);skyU.sunDir.value.copy(tmpV);
  const dir=tmpV.clone();sunSpr.position.set(CX+dir.x*560,dir.y*560,CZ+dir.z*560);moonSpr.position.copy(sunSpr.position);sunSpr.material.opacity=1-cur.night;moonSpr.material.opacity=cur.night;
  waterU.uShallow.value.copy(cur.sh);waterU.uDeep.value.copy(cur.dp);waterU.uSky.value.copy(cur.hz);waterU.uSunC.value.copy(cur.sun);waterU.uSunDir.value.copy(tmpV);waterU.uFogC.value.copy(cur.fog);waterU.uNight.value=cur.night;
  starM.opacity=cur.stars;matGlow.emissiveIntensity=cur.glow;lampMat.emissiveIntensity=cur.glow;
  const go=Math.max(.06,(cur.glow-.25)*.8);glowMatW.opacity=go;glowMatC.opacity=go*.8;
  const s=streak();beam.material.opacity=(s>0?Math.min(.45,.1+s*.03):.03)*Math.min(1,Math.max(.18,(cur.glow-.3)*1.1));libLight.intensity=s>0?cur.glow*2:0;
  beams.forEach(g=>{if(g.isObject3D){g.rotation.y+=dt*.8;g.children[0].material.opacity=cur.night*.3;g.visible=cur.night>.05;}});}
const ICONS={auto:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#ffc53d" d="M3 2h4v1h1v4H7v1H3V7H2V3h1z"/><path fill="#16243a" d="M4 0h2v1H4zM4 9h2v1H4zM0 4h1v2H0zM9 4h1v2H9z"/><path fill="#16243a" d="M5 3h1v2h1v1H5z"/></svg>',
  jutro:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#ff9a4a" d="M2 5h6v1H2zM3 4h4v1H3z"/><path fill="#16243a" d="M0 7h10v1H0zM4 1h2v2H4z"/></svg>',
  dan:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#ffc53d" d="M3 3h4v4H3z"/><path fill="#16243a" d="M4 0h2v2H4zM4 8h2v2H4zM0 4h2v2H0zM8 4h2v2H8z"/></svg>',
  vecer:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#ff7a5a" d="M2 4h6v2H2zM3 3h4v1H3z"/><path fill="#7a52c7" d="M0 7h10v2H0z"/></svg>',
  noc:'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#f4e9b0" d="M3 1h3v1H5v1H4v4h1v1h2v1H3V8H2V2h1z"/><path fill="#16243a" d="M8 1h1v1H8zM7 4h1v1H7z"/></svg>'};
const TNAME={jutro:"jutro",dan:"dan",vecer:"večer",noc:"noć"};
function renderTimeBtn(){$("timeBtn").innerHTML=ICONS[timeMode];$("timeBtn").title=timeMode==="auto"?"Doba dana: pravo vrijeme":"Doba dana: "+TNAME[timeMode];}
$("timeBtn").onclick=()=>{sfx.click();timeMode=TIME_ORDER[(TIME_ORDER.indexOf(timeMode)+1)%TIME_ORDER.length];setTime(timeMode==="auto"?autoPreset():timeMode);toast(timeMode==="auto"?"Nebo prati pravo vrijeme":"Doba dana: "+TNAME[timeMode]);};
function renderSound(){$("soundBtn").innerHTML=muted?'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#16243a" d="M1 3h2l2-2h1v8H5L3 7H1zM7 3h1v1H7zM9 3h1v1H9zM8 4h1v2H8zM7 6h1v1H7zM9 6h1v1H9z"/></svg>':'<svg viewBox="0 0 10 10" shape-rendering="crispEdges"><path fill="#16243a" d="M1 3h2l2-2h1v8H5L3 7H1zM7 3h1v4H7zM9 2h1v6H9z"/></svg>';}
$("soundBtn").onclick=()=>{muted=!muted;try{localStorage.setItem("otok-mute",muted?"1":"0");}catch(e){}renderSound();sfx.click();};
$("homeBtn").onclick=()=>{sfx.click();flight={from:{t:controls.target.clone(),p:camera.position.clone()},t:HOME.t.clone(),p:homeP(),k:0,d:1.6};};

