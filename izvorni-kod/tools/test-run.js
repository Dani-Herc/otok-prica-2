// usage: node v9/run.js <html> <steps.js> [d|m]
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const FILE=process.argv[2],STEPS=process.argv[3],name=process.argv[4]||'d';
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const vw=name==='m'?{width:400,height:820}:{width:1280,height:800};
const ctx=await b.newContext(name==='m'?{viewport:vw,hasTouch:true,isMobile:true,deviceScaleFactor:1}:{viewport:vw});const p=await ctx.newPage();const errs=[];
p.on('pageerror',e=>{console.log('PAGEERR',e.message,(e.stack||'').slice(0,600));errs.push('PE '+e.message);});
p.on('console',m=>{const t=m.text();if(m.type()==='error'||m.type()==='warning'||t.startsWith('[T]'))console.log('CONSOLE',m.type(),t.slice(0,600));});
await p.route('https://cdn.jsdelivr.net/npm/three@0.128.0/**',r=>{const u=new URL(r.request().url());r.fulfill({body:fs.readFileSync(path.join(__dirname,'../lib/three@0.128.0',u.pathname.replace('/npm/three@0.128.0/',''))),contentType:'text/javascript'});});
await p.route('**/fonts.googleapis.com/**',r=>r.fulfill({body:'',contentType:'text/css'}));
await p.route('**/fonts.gstatic.com/**',r=>r.fulfill({body:'',contentType:'font/woff2'}));
let src=fs.readFileSync(FILE,'utf8');if(name==='m'&&!/name="viewport"/.test(src))src='<meta name="viewport" content="width=device-width,initial-scale=1">'+src;if(!src.includes('\nboot();\n'))throw new Error('no boot');
src=src.replace('\nboot();\n','\nwindow.__otok={ev:s=>eval(s)};boot();\n');
const steps=require(path.resolve(STEPS));
const st=steps.state||{v:3,name:"Lana",created:"2026-11-01",lastVisit:"2026-11-06",books:[
 {id:"a",title:"Harry Potter i kamen mudraca",pages:220,page:220,genre:"fantazija",plot:0,done:true,stars:5},
 {id:"c",title:"Pipi Duga Čarapa",pages:160,page:90,genre:"avantura",plot:2,done:false}],edits:{},days:{"2026-11-04":true,"2026-11-05":true,"2026-11-06":true},visitors:["zec","patka","jez"],letters:[],answers:[],bloom:3,xp:310,coins:400,found:{skoljka:2},fish:{},updatedAt:5};
await p.addInitScript(s=>{localStorage.setItem('otok-prica-v3',s);},JSON.stringify(st));
await p.route('https://otok.test/',r=>r.fulfill({body:src,contentType:'text/html; charset=utf-8'}));
const t0=Date.now();
await p.goto('https://otok.test/');await p.addStyleTag({content:'#loading{display:none!important}'});
await p.waitForFunction(()=>window.__otok&&window.__otok.ev("typeof lightReady!=='undefined'&&lightReady"),null,{timeout:120000});
console.log('booted in',(Date.now()-t0)/1000,'s');
const ev=(s)=>p.evaluate(s=>{try{const r=window.__otok.ev(s);return r===undefined?null:JSON.parse(JSON.stringify(r));}catch(e){return 'ERR '+e.message;}},s);
const pre=path.join(__dirname,'shots',name+'_');fs.mkdirSync(path.join(__dirname,'shots'),{recursive:true});
const sh=async(n,w)=>{await p.waitForTimeout(w||900);await p.screenshot({path:pre+n+'.png',timeout:120000});console.log('shot',n);};
const frames=async(n)=>{await p.evaluate(n=>new Promise(r=>{let k=0;const f=()=>{if(++k>=n)r();else requestAnimationFrame(f);};requestAnimationFrame(f);}),n||3);};
try{await steps.run({p,ev,sh,frames,name});}catch(e){console.log('STEPERR',e.message);}
console.log('errors',errs.length);await b.close();})();
