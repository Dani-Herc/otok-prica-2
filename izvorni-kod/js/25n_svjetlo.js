/* =================== v17: SVJETLINA: a little darker picture, calmer ice ===================
   Dani (2026-11-13): "mrvicu smanji svjetlinu, led je bljeskavo bijel". Every exposure the game sets (time of day,
   worlds, presets) is multiplied by SVJ.k, 0.92 by default, and the player can move it in Zvuk i grafika. The value
   lives in its own localStorage key, never in the save. Packed ice gets a cool blue tint with soft bands and snow a
   slightly cooler, softer white, so surfaces read instead of glaring. */
const SVJ={k:.92};
try{const v=parseFloat(localStorage.getItem("otok-prica-svjetlina"));if(v>=.6&&v<=1.2)SVJ.k=v;}catch(e){}
{let raw=renderer.toneMappingExposure;Object.defineProperty(renderer,"toneMappingExposure",{configurable:true,get(){return raw*SVJ.k;},set(v){raw=v;}});}
{const ob=matOpaque.onBeforeCompile;matOpaque.onBeforeCompile=sh=>{ob(sh);
  sh.fragmentShader=sh.fragmentShader.replace("diffuseColor*=texelColor;\n","diffuseColor*=texelColor;\n"+
    "if(abs(vReg.x-.4296875)<.002&&abs(vReg.y-.41796875)<.002){float bnd=.9+.1*sin(vWP.x*1.3+vWP.y*2.1+vWP.z*.9);diffuseColor.rgb*=vec3(.62,.76,.93)*bnd;}\n"+
    "if(abs(vReg.x-.4296875)<.002&&abs(vReg.y-.37109375)<.002){float sn=.93+.07*sin(vWP.x*.37+vWP.z*.29);diffuseColor.rgb*=vec3(.82,.87,.95)*sn;}\n");};}
{const _ss=sheetSound;sheetSound=function(){_ss.apply(this,arguments);const b=$("sheetBody");if(!b||$("svjRow"))return;const d=document.createElement("div");d.className="field";d.id="svjRow";
  const pct=()=>Math.round(SVJ.k*100)+"%";
  d.innerHTML='<label for="svjR" style="display:flex;justify-content:space-between"><span>Svjetlina</span><b id="svjV">'+pct()+'</b></label><input type="range" id="svjR" min="70" max="115" step="1" value="'+Math.round(SVJ.k*100)+'"><small class="muted">Ako je slika previše bijela ili bliještava, pomakni ulijevo.</small>';
  const g=$("gfxRow");if(g&&g.parentNode===b)b.insertBefore(d,g);else b.appendChild(d);
  $("svjR").oninput=e=>{SVJ.k=(+e.target.value)/100;$("svjV").textContent=pct();try{localStorage.setItem("otok-prica-svjetlina",String(SVJ.k));}catch(_){}};};}
