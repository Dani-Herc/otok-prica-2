
(function(){
"use strict";
const $=id=>document.getElementById(id);
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
if(!window.THREE||!THREE.EffectComposer||!THREE.SSAOPass||!THREE.UnrealBloomPass||!THREE.FXAAShader){$("loading").textContent="3D grafika se nije učitala. Provjeri internet i otvori ponovno.";return;}

