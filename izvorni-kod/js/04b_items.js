/* =================== ITEMS, TOOLS, RECIPES =================== */
const BK=n=>()=>finished().length>=n;
const BKT=n=>n===1?"Pročitaj prvu knjigu do kraja":"Pročitaj "+n+(n<5?" knjige":" knjiga")+" do kraja";
/* every block that can sit in the bag, in display order. A gate (finished books) unlocks its recipe and its share of reading packs;
   blocks found in the world can always be placed */
const PALETTE=[
  ["trava"],["zemlja"],["staza"],["pijesak"],["sljunak"],["glina"],["kamen"],["kaldrma"],["mahovina"],["duboki"],
  ["drvo"],["smreka_d"],["breza_d"],["daske"],["sdaske"],["bdaske"],["tdaske"],["lisce"],["lisce_b"],["stol"],
  ["kaldrma",0],["cigla",BK(1),BKT(1)],["staklo",BK(1),BKT(1)],["lampion",BK(1),BKT(1)],["kcigla",BK(1),BKT(1)],
  ["bijela",BK(2),BKT(2)],["crvena",BK(2),BKT(2)],["krov",BK(2),BKT(2)],["polica",BK(2),BKT(2)],["bacva",BK(2),BKT(2)],
  ["jesen",BK(3),BKT(3)],["smreka",BK(3),BKT(3)],["tresnja",BK(3),BKT(3)],["sijeno",BK(3),BKT(3)],["snijeg",BK(3),BKT(3)],["prizcigla",BK(3),BKT(3)],
  ["carlisce",BK(4),BKT(4)],["gljiva",BK(4),BKT(4)],["zlato",BK(4),BKT(4)],["kvarc",BK(4),BKT(4)],
  ["kristal",BK(5),BKT(5)],["svjetlo",BK(5),BKT(5)],
  ["pjescenjak"],["upjescenjak"],["kaktus"],["led"],["micelij"],["stapka"],["ametist"],["prizmarin"],["koralj_p"],["koralj_r"],["koralj_z"],["koralj_c"],["koralj_l"],
  ["tuf"],["zcigla"],["bundeva"],["lubenica"],["oranica"],
  ["vuna_b"],["vuna_c"],["vuna_n"],["vuna_z"],["vuna_l"],["vuna_zl"],["vuna_ts"],["vuna_p"],["vuna_t"],["vuna_lj"],["vuna_r"],["vuna_s"],["stalak"],["polica2"]
].filter((p,i,a)=>a.findIndex(q=>q[0]===p[0])===i);
/* materials that are not blocks */
const MATS={stap:{n:"Štapić",c:"#a0703c"},ugljen:{n:"Ugljen",c:"#3a3a40"},bakar:{n:"Bakar",c:"#d0804a"},zeljezo:{n:"Željezo",c:"#d8d0c4"},grumen:{n:"Zlatni grumen",c:"#ffc53d"},
  dijamant:{n:"Dijamant",c:"#62e6e0"},smaragd:{n:"Smaragd",c:"#3ccf6a"},biser:{n:"Biser",c:"#f4eefc"},
  /* v10: seeds, harvest and fish */
  s_mrkva:{n:"Sjeme mrkve",c:"#f08a24",seed:1},s_krumpir:{n:"Sjeme krumpira",c:"#c8a060",seed:1},s_cikla:{n:"Sjeme cikle",c:"#a8304e",seed:1},s_bobice:{n:"Sadnica bobica",c:"#d02840",seed:1},
  s_bundeva:{n:"Sjeme bundeve",c:"#e08a20",seed:1},s_lubenica:{n:"Sjeme lubenice",c:"#5a9a30",seed:1},s_svjetlo:{n:"Čarobno sjeme",c:"#ffb43a",seed:1},
  mrkva:{n:"Mrkva",c:"#f08a24",farm:1},krumpir:{n:"Krumpir",c:"#c8a060",farm:1},cikla:{n:"Cikla",c:"#a8304e",farm:1},bobice:{n:"Bobice",c:"#d02840",farm:1},svjetlocvijet:{n:"Svjetlocvijet",c:"#ffb43a",farm:1},
  riba:{n:"Riba",c:"#7ab0d8",farm:1}};
/* things that can be tapped in the world besides creatures (crops, the market keeper) */
const tapObjs=[];
const hasLamp=()=>!S.lampOff&&!!((S.gear&&S.gear.lampa)||S.hat==="rudar");
/* extra canvas pictures registered by later modules */
const ITEM_DRAW={};
/* tools: higher tier digs faster and reaches harder ores */
const TOOLS={kramp:{n:"Kramp",d:"Kopa kamen i rude"},lopata:{n:"Lopata",d:"Kopa zemlju, pijesak i snijeg"},sjekira:{n:"Sjekira",d:"Siječe drvo"}};
const TIERS=["Šapa","Drveni","Kameni","Željezni","Dijamantni"];
const TIERC=["#e8772e","#b8875a","#9aa0a6","#e8e2d8","#62e6e0"];
const GEAR={maska:{n:"Ronilačka maska",d:"Rida može dugo roniti i vidi jasno pod morem."},camac:{n:"Čamac",d:"Plovi do dalekih otoka bez umaranja."},lampa:{n:"Ručna lampa",d:"Rida nosi svjetlo u mračnim špiljama."}};
/* how a block breaks: tool, base seconds with paws (0 = cannot without tool), needed tier */
const HARD={};
(function(){const set=(ks,tool,s,tier)=>ks.split(" ").forEach(k=>HARD[k]={tool,s,tier:tier||0});
  set("trava zemlja pijesak sljunak snijeg glina staza micelij oranica mahovina","lopata",.75);
  set("lisce lisce_b carlisce jesen tresnja smreka","",.3);
  set("drvo smreka_d breza_d daske sdaske bdaske tdaske polica stol bacva bundeva lubenica kaktus stapka gljiva sijeno","sjekira",2.2);
  set("staklo lampion svjetlo","",.45);
  set("kamen kaldrma cigla kcigla pjescenjak upjescenjak bijela krov crvena prizmarin prizcigla led kvarc tuf zcigla koralj_p koralj_r koralj_z koralj_c koralj_l ametist kristal","kramp",0,1);
  set("vuna_c vuna_b vuna_z vuna_p vuna_l vuna_n vuna_r vuna_lj vuna_t vuna_zl vuna_ts vuna_s","",.45);set("stalak polica2","sjekira",2.2);set("oblak skocni","",.3);set("pled tobogan","kramp",0,1);
  set("duboki r_ugljen r_bakar","kramp",0,1);set("r_zeljezo","kramp",0,2);set("r_zlato r_dijamant r_smaragd zlato","kramp",0,3);})();
const TOOLSPD=[1,.5,.36,.26,.18];
function breakInfo(t){const ty=TYPES[t];const h=HARD[ty.k]||{tool:"kramp",s:0,tier:1};const tl=h.tool?(S.tools&&S.tools[h.tool])||0:0;
  if(h.tool==="kramp"){if(tl<h.tier)return {ok:false,need:h.tier,tool:"kramp"};let s=(ty.k==="duboki"?1.9:ty.ore?1.7:1.3)*TOOLSPD[tl]/TOOLSPD[1];return {ok:true,s,tool:"kramp",tier:tl};}
  if(!h.tool)return {ok:true,s:h.s,tool:"",tier:0};return {ok:true,s:h.s*TOOLSPD[tl],tool:h.tool,tier:tl};}
/* recipes: what you get, what it costs (blocks by key, materials by key), where (anywhere or at a workbench) and which book gate */
const RECIPES=[
  {id:"daske",out:["daske",4],cost:{drvo:1},n:"Daske"},
  {id:"sdaske",out:["sdaske",4],cost:{smreka_d:1},n:"Smrekove daske"},
  {id:"bdaske",out:["bdaske",4],cost:{breza_d:1},n:"Brezove daske"},
  {id:"stap",out:["stap",4],cost:{daske:2},n:"Štapići"},
  {id:"stol",out:["stol",1],cost:{daske:4},n:"Radni stol",d:"Postavi ga bilo gdje. Uz njega se mogu napraviti alati i posebne stvari."},
  {id:"kramp1",tool:["kramp",1],cost:{daske:3,stap:2},n:"Drveni kramp"},
  {id:"lopata1",tool:["lopata",1],cost:{daske:1,stap:2},n:"Drvena lopata"},
  {id:"sjekira1",tool:["sjekira",1],cost:{daske:3,stap:2},n:"Drvena sjekira"},
  {id:"kramp2",tool:["kramp",2],cost:{kamen:3,stap:2},n:"Kameni kramp",bench:1},
  {id:"lopata2",tool:["lopata",2],cost:{kamen:1,stap:2},n:"Kamena lopata",bench:1},
  {id:"sjekira2",tool:["sjekira",2],cost:{kamen:3,stap:2},n:"Kamena sjekira",bench:1},
  {id:"kramp3",tool:["kramp",3],cost:{zeljezo:3,ugljen:1,stap:2},n:"Željezni kramp",bench:1},
  {id:"lopata3",tool:["lopata",3],cost:{zeljezo:1,ugljen:1,stap:2},n:"Željezna lopata",bench:1},
  {id:"sjekira3",tool:["sjekira",3],cost:{zeljezo:3,ugljen:1,stap:2},n:"Željezna sjekira",bench:1},
  {id:"kramp4",tool:["kramp",4],cost:{dijamant:3,stap:2},n:"Dijamantni kramp",bench:1},
  {id:"lopata4",tool:["lopata",4],cost:{dijamant:1,stap:2},n:"Dijamantna lopata",bench:1},
  {id:"sjekira4",tool:["sjekira",4],cost:{dijamant:3,stap:2},n:"Dijamantna sjekira",bench:1},
  {id:"maska",gear:"maska",cost:{staklo:2,bakar:3,daske:1},n:"Ronilačka maska",bench:1},
  {id:"camac",gear:"camac",cost:{daske:12,stap:4},n:"Čamac",bench:1},
  {id:"lampa",gear:"lampa",cost:{zeljezo:1,ugljen:2,staklo:1},n:"Ručna lampa",bench:1},
  {id:"kaldrma",out:["kaldrma",2],cost:{kamen:2},n:"Kaldrma"},
  {id:"staza",out:["staza",2],cost:{zemlja:2},n:"Zemljana staza"},
  {id:"staklo",out:["staklo",2],cost:{pijesak:2,ugljen:1},n:"Staklo",bench:1,gate:1},
  {id:"lampion",out:["lampion",2],cost:{staklo:1,ugljen:1},n:"Lampion",bench:1,gate:1},
  {id:"cigla",out:["cigla",4],cost:{glina:2,ugljen:1},n:"Cigla",bench:1,gate:1},
  {id:"kcigla",out:["kcigla",4],cost:{kamen:4},n:"Kamene cigle",bench:1,gate:1},
  {id:"bijela",out:["bijela",4],cost:{kamen:2,pijesak:2},n:"Bijela žbuka",bench:1,gate:2},
  {id:"krov",out:["krov",4],cost:{glina:2,ugljen:1},n:"Crijep",bench:1,gate:2},
  {id:"crvena",out:["crvena",2],cost:{cigla:2},n:"Crvena boja",bench:1,gate:2},
  {id:"polica",out:["polica",1],cost:{daske:4},n:"Knjižna polica",bench:1,gate:2},
  {id:"bacva",out:["bacva",1],cost:{daske:5},n:"Bačva",bench:1,gate:2},
  {id:"prizcigla",out:["prizcigla",4],cost:{prizmarin:4},n:"Prizmarinske cigle",bench:1,gate:3},
  {id:"upjescenjak",out:["upjescenjak",2],cost:{pjescenjak:2},n:"Ukrasni pješčenjak",bench:1},
  {id:"zlato",out:["zlato",1],cost:{grumen:6},n:"Zlatni blok",bench:1,gate:4},
  {id:"kvarc",out:["kvarc",2],cost:{bijela:2,dijamant:1},n:"Kvarc",bench:1,gate:4},
  {id:"kristal",out:["kristal",1],cost:{ametist:3,dijamant:1},n:"Kristal mašte",bench:1,gate:5},
  {id:"svjetlo",out:["svjetlo",1],cost:{kristal:1,lampion:1},n:"Svjetlo",bench:1,gate:5}];
/* what is waiting in each chest */
const LOOT={
  spilja:{coins:30,mats:{dijamant:2,grumen:4,zeljezo:4,ugljen:4},blocks:{kristal:3,ametist:6},msg:"Duboko u planini netko je sakrio blago rudara!"},
  geoda:{coins:15,mats:{dijamant:1,bakar:3},blocks:{ametist:8,kristal:2},msg:"Kristali u ovoj dvorani rastu tisućama godina."},
  brod:{coins:45,mats:{smaragd:3,grumen:6,biser:2},blocks:{tdaske:16},msg:"Kapetanova škrinja! Bila je na dnu mora ne znam koliko godina."},
  hram:{coins:35,mats:{grumen:8,smaragd:1},blocks:{upjescenjak:12,pjescenjak:16},msg:"U srcu pustinjskog hrama čeka zlato sunca."},
  iglu:{coins:20,mats:{zeljezo:3,biser:1},blocks:{led:10,snijeg:16},msg:"Netko je ovdje prezimio i ostavio darove."},
  gljiva:{coins:20,mats:{bakar:4},blocks:{gljiva:10,stapka:8,micelij:8},msg:"Gljive su čuvale ovu škrinju kao kišobrani."},
  paviljon:{coins:20,mats:{biser:1,grumen:2},blocks:{tresnja:12,krov:8},msg:"Uz ribnjak je ostavljena škrinja puna proljeća."},
  geoda2:{coins:25,mats:{dijamant:2},blocks:{kristal:6,ametist:8},msg:"Šuplji kamen pun kristala!"},
  kula:{coins:35,mats:{smaragd:2,zeljezo:4},blocks:{kcigla:16,staklo:6},msg:"S vrha stare kule vidi se cijelo more."},
  kucica:{coins:40,mats:{grumen:4,smaragd:2,biser:1},blocks:{lampion:6,sdaske:16,polica2:2},msg:"Netko je u krošnji diva imao svoju malu knjižnicu. Sad je tvoja!"},
  slap:{coins:50,mats:{biser:4,dijamant:2,smaragd:2},blocks:{prizmarin:8,kristal:3},msg:"Iza zavjese od vode krila se škrinja. Malo tko zna za ovo mjesto!"},
  svjetionik:{coins:45,mats:{zeljezo:6,grumen:4,biser:2},blocks:{svjetlo:3,crvena:12,bijela:12},msg:"Svjetioničar je čuvao brodove, a ostavio je i blago za hrabre penjače."},
  nebo:{coins:90,mats:{dijamant:4,smaragd:3,biser:3,grumen:6},blocks:{kristal:6,zlato:4,vuna_c:8,vuna_z:8,vuna_p:8,vuna_lj:8},msg:"Iznad oblaka, na kraju duge, čekalo je najveće blago otoka!"}};
