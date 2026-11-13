/* ===== v24: Moja enciklopedija: the pages (animals, places and wonders of every world) =====
   each fact: [text, question, right answer, wrong, wrong] */
const ENCH=[
  {k:"otok",n:"Otok priča",em:"🏝️",c:"#3fa86a"},
  {k:"oblaci",n:"Svijet oblaka",em:"☁️",c:"#7a8ae0"},
  {k:"led",n:"Ledeno kraljevstvo",em:"❄️",c:"#4aa8d8"},
  {k:"more",n:"Podvodni grad",em:"🐚",c:"#2a7ab8"},
  {k:"dzungla",n:"Džungla dinosaura",em:"🦕",c:"#c8782a"}];
const ENCT={z:"Prava životinja",d:"Davno izumrla",c:"Čarobno biće",m:"Mjesto",p:"Čudo prirode"};
const ENC=[];const ENCK={};
function E(k,ch,t,n,o,facts){const e=Object.assign({k,ch,t,n,facts},o);ENC.push(e);ENCK[k]=e;}
/* ---------------- OTOK PRIČA ---------------- */
E("zec","otok","z","Zec",{ent:["zec"],info:[["Dom","livade i šume"],["Hrana","trava, djetelina, mrkva"],["Veličina","oko 40 cm"]],h:"Jedan od prvih gostiju na otoku."},[
 ["Zečji zubi rastu cijeli život. Zato zec stalno gricka travu i grančice da ih istroši.","Zašto zec stalno nešto gricka?","Zubi mu stalno rastu","Uvijek je jako gladan","Tako čisti uši"],
 ["Oči su mu sa strane glave, pa zec vidi gotovo sve oko sebe, čak i iza leđa.","Što zec vidi zahvaljujući očima sa strane glave?","Gotovo sve oko sebe","Samo ravno naprijed","Samo u mraku"],
 ["Kad osjeti opasnost, zec snažno lupne stražnjim nogama o tlo i tako upozori druge zečeve.","Kako zec upozorava druge zečeve na opasnost?","Lupa nogama o tlo","Glasno zavija","Maše ušima"]]);
E("patka","otok","z","Patka",{ent:["patka"],info:[["Dom","jezera i rijeke"],["Hrana","bilje, sjemenke, kukci"],["Veličina","oko 55 cm"]],h:"Pliva oko otoka i pjeva malo krivo."},[
 ["Patka maže perje uljem iz male žlijezde kod repa, pa voda klizi s nje i ona se ne smoči do kože.","Zašto se patka ne smoči do kože?","Perje maže uljem","Stalno se suši na suncu","Ispod perja ima krzno"],
 ["Kožice između prstiju rade kao vesla, pa patka lako i brzo pliva.","Čemu patki služe kožice između prstiju?","Za plivanje, kao vesla","Za penjanje po drveću","Za kopanje rupa"],
 ["Pačići odmah nakon izlijeganja prate prvo biće koje vide, a to je obično njihova mama.","Koga pačići prate čim se izlegu?","Prvo biće koje vide","Najveću pticu u blizini","Nikoga, odmah lete sami"]]);
E("jez","otok","z","Jež",{ent:["jez"],info:[["Dom","vrtovi, živice, šume"],["Hrana","kukci, gliste, puževi"],["Veličina","oko 25 cm"]],h:"Bodljikav izvana, mekan iznutra."},[
 ["Jež na leđima ima oko 6000 bodlji. Kad se uplaši, smota se u bodljikavu loptu.","Otprilike koliko bodlji ima jež?","Oko 6000","Oko 60","Oko milijun"],
 ["Zimi jež spava zimski san. Srce mu tada kuca puno sporije, a tijelo se ohladi.","Što jež radi zimi?","Spava zimski san","Seli se na jug","Gradi kućicu od snijega"],
 ["Jež je noćna životinja. Danju spava, a noću traži kukce, gliste i puževe.","Kada je jež najaktivniji?","Noću","U podne","Samo zimi"]]);
E("ovca","otok","z","Ovca",{ent:["ovca"],info:[["Dom","pašnjaci i brda"],["Hrana","trava i sijeno"],["Veličina","oko 1 m"]],h:"Daje mekanu bijelu vunu."},[
 ["Ovčja vuna stalno raste, zato se domaće ovce šišaju otprilike jednom godišnje.","Koliko se često domaće ovce obično šišaju?","Otprilike jednom godišnje","Svaki dan","Nikad"],
 ["Ovce imaju odlično pamćenje. Mogu zapamtiti pedesetak lica drugih ovaca i ljudi, čak i godinama.","Što ovce mogu dugo pamtiti?","Lica ovaca i ljudi","Pjesme ptica","Brojeve do sto"],
 ["Ovca ima zjenice u obliku vodoravnog pravokutnika, pa vidi gotovo sve oko sebe dok pase.","Kakve oblike zjenica ima ovca?","Vodoravni pravokutnik","Okrugle kao lopta","Oblik zvijezde"]]);
E("kornjaca","otok","z","Morska kornjača",{ent:["kornjaca","mkornjaca","starakornjaca"],info:[["Dom","topla mora"],["Hrana","morska trava, meduze"],["Veličina","do 1 m i više"]],h:"Donosi blago s grebena."},[
 ["Morska kornjača liježe jaja u pijesak na plaži, a mali kornjačići sami otpužu do mora.","Gdje morska kornjača liježe jaja?","U pijesak na plaži","Na dnu mora","U gnijezdo na drvetu"],
 ["Za razliku od kopnenih kornjača, morske kornjače ne mogu uvući glavu u oklop.","Što morska kornjača ne može?","Uvući glavu u oklop","Plivati","Disati zrak"],
 ["Neke morske kornjače preplivaju tisuće kilometara i vrate se baš na plažu na kojoj su se izlegle.","Kamo se mnoge morske kornjače vraćaju nesti jaja?","Na plažu gdje su se izlegle","Na Sjeverni pol","U najbližu rijeku"]]);
E("macka","otok","z","Mačka",{ent:["macka"],info:[["Dom","kuće, vrtovi, sela"],["Hrana","meso i riba"],["Veličina","oko 45 cm i rep"]],h:"Zna gdje je vjetar raznio zlatnike."},[
 ["Mačka može okretati svako uho posebno, pa čuje odakle dolazi i najtiši zvuk.","Kako mačka otkriva odakle dolazi zvuk?","Okreće svako uho posebno","Zatvori oči","Lupa repom"],
 ["Mačji brkovi su osjetljivi kao prsti. Pomažu mački osjetiti hoće li proći kroz uski prolaz.","Čemu mački služe brkovi?","Osjećaju uske prolaze","Za češljanje krzna","Pomažu joj plivati"],
 ["Mačke puno spavaju, često između 12 i 16 sati na dan.","Koliko sati na dan mačka često spava?","12 do 16 sati","1 sat","Nikad ne spava"]]);
E("papiga","otok","z","Papiga",{ent:["papiga"],info:[["Dom","tropske šume"],["Hrana","voće, orašasti plodovi"],["Veličina","od 10 cm do 1 m"]],h:"Pamti rečenice iz tvojih knjiga."},[
 ["Neke papige mogu naučiti stotine riječi i oponašati zvukove poput zvona ili zvižduka.","Što neke papige mogu naučiti?","Stotine riječi","Čitati knjige","Pisati slova"],
 ["Papiga ima dva prsta naprijed i dva straga, pa hranu drži nogom kao rukom.","Kako papiga drži hranu?","Nogom, kao rukom","Samo krilima","Repom"],
 ["Velike papige žive jako dugo, neke i više od 50 godina.","Koliko dugo mogu živjeti velike papige?","Više od 50 godina","Samo godinu dana","Tjedan dana"]]);
E("sova","otok","z","Sova",{ent:["sova"],info:[["Dom","šume i stari tornjevi"],["Hrana","miševi i kukci"],["Veličina","od 15 do 70 cm"]],h:"Čuva knjižnicu i zna mnogo tajni."},[
 ["Sova može okrenuti glavu za oko tri četvrtine kruga, pa vidi iza sebe bez okretanja tijela.","Koliko sova može okrenuti glavu?","Oko tri četvrtine kruga","Samo malo lijevo","Ne može je okrenuti"],
 ["Sovine oči se ne mogu micati u očnim dupljama. Zato sova okreće cijelu glavu.","Zašto sova okreće cijelu glavu?","Oči joj se ne miču","Da bolje čuje","Jer je znatiželjna"],
 ["Rubovi sovinog perja su mekani kao češalj, pa sova leti gotovo bešumno.","Zašto sova leti gotovo bešumno?","Ima mekane rubove perja","Ne maše krilima","Leti samo po danu"]]);
E("pingvin","otok","z","Pingvin",{ent:["pingvin","pingvinko"],info:[["Dom","hladna južna mora"],["Hrana","ribe i rakovi"],["Veličina","od 30 cm do 1,2 m"]],h:"Živi na snježnom otočiću."},[
 ["Pingvini ne mogu letjeti, ali u vodi krilima veslaju toliko brzo da izgleda kao da lete.","Kako pingvin koristi krila?","Za plivanje pod vodom","Za letenje","Za kopanje snijega"],
 ["Pingvini žive na južnoj polovici Zemlje. Na Sjevernom polu nema pingvina.","Gdje žive pingvini?","Na južnoj polovici Zemlje","Na Sjevernom polu","U pustinji"],
 ["Crna leđa i bijeli trbuh skrivaju pingvina u moru: odozgo izgleda kao tamna dubina, a odozdo kao svijetlo nebo.","Čemu pingvinu služi crno-bijelo perje?","Skriva ga u moru","Da bude lijep na zabavi","Da ga sunce ne vidi"]]);
E("zaba","otok","z","Žaba",{ent:["zaba"],info:[["Dom","ribnjaci i bare"],["Hrana","kukci"],["Veličina","od 1 do 30 cm"]],h:"Pjeva uz ribnjak kad padne mrak."},[
 ["Žaba počinje život kao punoglavac koji ima rep i diše škrgama, kao riba.","Kako se zove mlada žaba koja živi u vodi?","Punoglavac","Žabić","Ribica"],
 ["Mnoge žabe ne piju vodu ustima, nego je upijaju kroz kožu.","Kako mnoge žabe piju vodu?","Kroz kožu","Kroz nos","Uopće ne piju"],
 ["Neke žabe mogu skočiti i dvadeset puta dalje od duljine svog tijela.","Koliko daleko mogu skočiti neke žabe?","Dvadeset puta dalje od svog tijela","Samo pola svog tijela","Ne mogu skakati"]]);
E("deva","otok","z","Deva",{ent:["deva"],info:[["Dom","pustinje"],["Hrana","trnovito bilje, trava"],["Veličina","oko 2 m visoka"]],h:"Živi na pješčanom otočiću."},[
 ["U devinoj grbi nije voda, nego mast. Deva od nje dobiva snagu kad dugo nema hrane.","Što je u devinoj grbi?","Mast","Voda","Pijesak"],
 ["Žedna deva može popiti više od 100 litara vode za desetak minuta.","Koliko vode žedna deva može brzo popiti?","Više od 100 litara","Jednu čašu","Jednu kap"],
 ["Deva ima dva reda dugih trepavica koje joj čuvaju oči od pijeska.","Što devi čuva oči od pijeska?","Dva reda trepavica","Sunčane naočale","Velike uši"]]);
E("dupin","otok","z","Dupin",{ent:["dupin"],info:[["Dom","mora i oceani"],["Hrana","ribe i lignje"],["Veličina","oko 2,5 m"]],h:"Dozovi ga u moru kad postanete prijatelji."},[
 ["Dupin je sisavac, a ne riba. Zrak udiše kroz otvor na vrhu glave.","Kroz što dupin udiše zrak?","Kroz otvor na vrhu glave","Kroz škrge","Kroz rep"],
 ["Dupini spavaju tako da odmara jedna polovica mozga, a druga pazi da dupin diše i ne zaspi pod vodom.","Kako dupini spavaju?","Odmara pola mozga","Na plaži","Uopće ne spavaju"],
 ["Svaki dupin ima svoj poseban zvižduk, kao ime, i njime ga zovu prijatelji.","Kako se dupini međusobno dozivaju?","Svaki ima svoj zvižduk","Mašu perajama","Pišu po pijesku"]]);
E("panda","otok","z","Crvena panda",{ent:["panda"],info:[["Dom","planinske šume Azije"],["Hrana","najviše bambus"],["Veličina","oko 60 cm i rep"]],h:"Najspretnija penjačica na otoku."},[
 ["Crvena panda najviše jede bambus, ali voli i voće, žirove i jaja.","Što crvena panda najviše jede?","Bambus","Ribu","Mrkvu"],
 ["Kad je hladno, crvena panda se omota svojim dugim čupavim repom kao dekicom.","Čime se crvena panda grije kad je hladno?","Svojim čupavim repom","Lišćem","Snijegom"],
 ["Crvenu pandu znanstvenici su opisali i nazvali pandom prije velike crno-bijele pande.","Koja je panda prva dobila ime panda?","Crvena panda","Velika panda","Obje istog dana"]]);
E("konjic","otok","z","Konj",{ent:["konjic"],info:[["Dom","livade i farme"],["Hrana","trava, sijeno, zob"],["Veličina","oko 1,6 m do leđa"]],h:"Galopira brže od vjetra."},[
 ["Konj može drijemati stojeći jer mu posebni zglobovi u nogama drže tijelo bez napora.","Kako konj može drijemati?","Stojeći","Na glavi","Samo u vodi"],
 ["Konj ima najveće oči od svih sisavaca koji žive na kopnu.","Po čemu su posebne konjske oči?","Najveće su među kopnenim sisavcima","Svijetle u mraku","Imaju tri boje"],
 ["Mladi konj, ždrijebe, može stajati i hodati već nekoliko sati nakon rođenja.","Kada ždrijebe prohoda?","Nekoliko sati nakon rođenja","Nakon godinu dana","Nakon pet godina"]]);
E("zmaj","otok","c","Zmaj",{ent:["zmaj"],h:"Izleže se iz jajeta kad pročitaš dovoljno stranica."},[
 ["Priče o zmajevima postoje u gotovo svim dijelovima svijeta, od Europe do Kine.","Gdje sve postoje priče o zmajevima?","U gotovo cijelom svijetu","Samo u Hrvatskoj","Nigdje"],
 ["U kineskim pričama zmajevi su dobri. Donose sreću, kišu i plodnu godinu.","Što zmajevi donose u kineskim pričama?","Sreću i kišu","Snijeg i led","Samo strah"],
 ["Zmaj Iskra izlegao se iz jajeta tek kad je Rida skupila dovoljno pročitanih stranica.","Što je trebalo da se Iskra izleže iz jajeta?","Pročitane stranice","Sto zlatnika","Jedna mrkva"]]);
E("kapibara","otok","z","Kapibara",{ent:["kapibara"],info:[["Dom","rijeke Južne Amerike"],["Hrana","trava i vodeno bilje"],["Veličina","oko 1,2 m"]],h:"Čeka te u Čarobnoj trgovini."},[
 ["Kapibara je najveći glodavac na svijetu, rođak zamorčića.","Po čemu je kapibara posebna?","Najveći je glodavac","Najbrži je trkač","Najmanji je sisavac"],
 ["Kapibara odlično pliva i ima male kožice između prstiju.","Što kapibari pomaže plivati?","Kožice između prstiju","Krila","Dugi rep"],
 ["Kad se uplaši, kapibara može ostati pod vodom oko pet minuta.","Koliko kapibara može ostati pod vodom?","Oko pet minuta","Cijeli dan","Ni sekunde"]]);
E("robopas","otok","c","Robo-pas",{ent:["robopas"],h:"Čeka te u Čarobnoj trgovini."},[
 ["Riječ robot prvi put je upotrijebljena 1920. godine u drami češkog pisca Karela Čapeka.","Odakle dolazi riječ robot?","Iz drame Karela Čapeka","Iz jedne pjesme","Iz kuharice"],
 ["Pravi roboti-psi danas postoje i mogu hodati po stepenicama i neravnom tlu.","Što mogu pravi roboti-psi?","Hodati po stepenicama","Letjeti do Mjeseca","Kuhati juhu"],
 ["Bip kaže da mu krumpir puni baterije, iako svi znamo da roboti trebaju struju.","Što Bip tvrdi da mu puni baterije?","Krumpir","Mrkva","Mjesečina"]]);
E("feniks","otok","c","Feniks",{ent:["feniks"],h:"Najrjeđa ptica Čarobne trgovine."},[
 ["U starim grčkim pričama feniks na kraju života izgori i ponovno se rodi iz pepela.","Iz čega se feniks ponovno rađa?","Iz pepela","Iz jajeta u gnijezdu","Iz oblaka"],
 ["Zbog te priče feniks je znak nade i novog početka.","Čega je feniks znak?","Nade i novog početka","Zime","Tuge"],
 ["Feniks Plamko nikad ne peče, nego samo grije.","Što radi Plamkova vatra?","Samo grije","Sve zapali","Ledi vodu"]]);
E("knjiznica","otok","m","Knjižnica",{auto:1,em:"📚",bg:"#c8783a"},[
 ["Jedna od najstarijih poznatih knjižnica, kralja Asurbanipala, imala je knjige od glinenih pločica.","Od čega su bile knjige u jednoj od najstarijih knjižnica?","Od glinenih pločica","Od lišća","Od stakla"],
 ["U knjižnici su knjige složene po temama i slovima, pa se svaka brzo nađe.","Zašto su knjige u knjižnici složene po redu?","Da se brzo nađu","Da lijepo izgledaju","Da ih nitko ne dira"],
 ["Svaka pročitana stranica u Otoku priča daje Ridi zlatnike i puni tvoju zbirku.","Što Ridi donosi svaka pročitana stranica?","Zlatnike","Kišu","Snijeg"]]);
E("suma","otok","m","Šuma divova",{poi:"suma",em:"🌳",bg:"#3a8a4a"},[
 ["Najviše stablo na svijetu je sekvoja nazvana Hyperion. Visoka je oko 116 metara, više od zgrade od 30 katova.","Koliko je visoko najviše stablo na svijetu?","Oko 116 metara","Oko 10 metara","Oko 2 kilometra"],
 ["Stabla kroz lišće ispuštaju kisik koji mi udišemo.","Što stabla ispuštaju kroz lišće?","Kisik","Dim","Med"],
 ["Po krugovima, godovima, na prerezanom deblu možeš izbrojiti koliko je stablo bilo staro.","Kako možeš saznati koliko je stablo staro?","Izbrojiš godove","Izmjeriš lišće","Pitaš pticu"]]);
E("svjetionik","otok","m","Svjetionik",{poi:"svjetionik",em:"🗼",bg:"#d84a3a"},[
 ["Svjetionik noću pokazuje brodovima gdje su obala i stijene, da se ne nasuču.","Čemu služi svjetionik?","Čuva brodove od stijena","Grije more","Lovi ribu"],
 ["Svaki svjetionik bljeska svojim ritmom, pa ga mornari prepoznaju i u mraku.","Kako mornari prepoznaju svjetionik u mraku?","Po ritmu bljeskanja","Po zvuku zvona","Po mirisu"],
 ["Herkulov toranj u Španjolskoj star je gotovo 2000 godina i najstariji je svjetionik koji još radi.","Koliko je star najstariji svjetionik koji još radi?","Gotovo 2000 godina","10 godina","Milijun godina"]]);
E("laguna","otok","m","Skrivena laguna",{poi:"laguna",em:"💧",bg:"#2a9ac8"},[
 ["Laguna je plitko more koje je od otvorenog mora odvojeno pijeskom, stijenama ili koraljima.","Što je laguna?","Plitko more odvojeno od otvorenog mora","Planinski vrh","Duboka špilja"],
 ["Slap nastaje kad rijeka teče preko ruba stijene i pada dolje.","Kako nastaje slap?","Rijeka pada preko ruba stijene","Kiša pada s oblaka","More se zaledi"],
 ["Najviši slap na svijetu je Anđeoski slap u Venezueli, visok gotovo 1000 metara.","Kako se zove najviši slap na svijetu?","Anđeoski slap","Plitvički slap","Ledeni slap"]]);
/* ---------------- SVIJET OBLAKA ---------------- */
E("oblak","oblaci","p","Oblaci",{enter:"oblaci",em:"☁️",bg:"#7a9ae0"},[
 ["Oblaci su napravljeni od sićušnih kapljica vode ili kristalića leda koji lebde u zraku.","Od čega su napravljeni oblaci?","Od sićušnih kapljica vode","Od vate","Od dima"],
 ["Jedan veliki bijeli oblak može biti težak kao stotinu slonova, ali lebdi jer su kapljice jako sitne i raširene.","Koliko može biti težak veliki oblak?","Kao stotinu slonova","Kao jedno pero","Kao jedna jabuka"],
 ["Kad se kapljice u oblaku spoje i postanu preteške, padaju na zemlju kao kiša.","Kada iz oblaka pada kiša?","Kad kapljice postanu preteške","Kad oblak zijevne","Kad zapuše sjever"]]);
E("duga","oblaci","p","Duga",{star:"duga",w:"oblaci",em:"🌈",bg:"#a87ae0"},[
 ["Duga nastaje kad sunčeva svjetlost prolazi kroz kapljice kiše i rastavi se na boje.","Kako nastaje duga?","Svjetlost se u kapljicama rastavi na boje","Netko je oboji","Iz cvijeća"],
 ["Dugu vidiš samo kad ti je sunce iza leđa, a kiša ispred tebe.","Gdje mora biti sunce da vidiš dugu?","Iza tvojih leđa","Točno ispred tebe","Ispod zemlje"],
 ["Boje duge uvijek idu istim redom: crvena, narančasta, žuta, zelena, plava, modra i ljubičasta.","Koja je boja uvijek na vanjskom rubu duge?","Crvena","Zelena","Ljubičasta"]]);
E("vjetar","oblaci","p","Vjetar",{star:"kula",w:"oblaci",em:"🌬️",bg:"#6ac0c8"},[
 ["Vjetar je zrak koji se kreće. Topao zrak se diže, a hladan dolazi na njegovo mjesto.","Što je vjetar?","Zrak koji se kreće","Dah oblaka","Para iz mora"],
 ["Ptice poput orlova jedre na toplim strujama zraka koje se dižu, a da gotovo ne mašu krilima.","Kako se orlovi dižu visoko bez mahanja?","Jedre na toplim strujama","Skaču s drveta","Puše im vjetar u leđa"],
 ["Na Jadranu puše bura, jak i hladan vjetar koji dolazi s planina prema moru.","Kako se zove jak hladan vjetar na Jadranu?","Bura","Monsun","Tajfun"]]);
E("dvorac","oblaci","m","Dvorac duge",{isl:"dvorac",w:"oblaci",em:"🏰",bg:"#e07ab8"},[
 ["Dvorac duge čuva škrinju koja se otvara tek kad skupiš svih 10 zvjezdanih kamenčića.","Koliko kamenčića treba za vrata Dvorca duge?","Deset","Tri","Sto"],
 ["U Svijetu oblaka zračne struje nose Ridu gore do najviših otoka.","Što Ridu nosi do najviših otoka u oblacima?","Zračne struje","Balon","Ljestve"],
 ["Pravi dvorci gradili su se na brdima i stijenama, da se izdaleka vidi tko dolazi.","Zašto su se pravi dvorci gradili na brdima?","Da se vidi tko dolazi","Da budu bliže suncu","Jer je ondje toplije"]]);
/* ---------------- LEDENO KRALJEVSTVO ---------------- */
E("carpingvin","led","z","Carski pingvin",{ent:["carpingvin"],info:[["Dom","Antarktika"],["Hrana","ribe i lignje"],["Veličina","oko 1,2 m"]],h:"Vladar Ledenog kraljevstva."},[
 ["Carski pingvin je najveći pingvin na svijetu, visok otprilike kao dijete od šest godina.","Koji je pingvin najveći na svijetu?","Carski pingvin","Mali plavi pingvin","Pingvin s Plitvica"],
 ["Tata carski pingvin cijelu zimu drži jaje na nogama, pod toplim naborom trbuha.","Tko kod carskih pingvina grije jaje?","Tata, na nogama","Nitko, jaje je u snijegu","Galeb"],
 ["Kad zapuše ledeni vjetar, carski pingvini se zbiju u veliku skupinu i redom se mijenjaju u sredini.","Kako se carski pingvini griju za hladnog vjetra?","Zbiju se u skupinu","Ulaze u iglu","Lete na jug"]]);
E("snjezec","led","z","Polarni zec",{ent:["snjezec"],info:[["Dom","daleki sjever"],["Hrana","mahovina, lišajevi, grančice"],["Veličina","oko 60 cm"]],h:"Skakuće po snježnim livadama."},[
 ["Polarni zec zimi je bijel kao snijeg, a ljeti mu krzno posmeđi, pa se uvijek dobro skriva.","Zašto polarni zec mijenja boju krzna?","Da se skriva","Jer mu je dosadno","Zbog kiše"],
 ["Polarni zec ima kraće uši od drugih zečeva, pa kroz njih gubi manje topline.","Zašto polarni zec ima kratke uši?","Da gubi manje topline","Da bolje čuje","Da stane u rupu"],
 ["Široke dlakave stražnje noge rade kao krplje i ne propadaju u snijeg.","Što polarnom zecu pomaže hodati po snijegu?","Široke dlakave noge","Skije","Dugi rep"]]);
E("mamut","led","d","Vunasti mamut",{ent:["mamut"],info:[["Doba","ledeno doba"],["Hrana","trava i grmlje"],["Veličina","oko 3 m visok"]],sci:"Mammuthus primigenius",h:"Mali mamut traži prijatelja u snijegu."},[
 ["Vunasti mamuti živjeli su u ledeno doba i imali gusto krzno koje ih je grijalo.","Što je grijalo vunaste mamute?","Gusto krzno","Vatra","Topli kaput"],
 ["Mamutove kljove bile su dugačke i do četiri metra, a služile su za čišćenje snijega i borbu.","Koliko su mogle biti duge mamutove kljove?","Do četiri metra","Deset centimetara","Kao olovka"],
 ["Posljednji mamuti živjeli su na jednom hladnom otoku sve do vremena kad su se u Egiptu već gradile piramide.","Kada su živjeli posljednji mamuti?","Dok su se gradile piramide","Prošle godine","Prije dinosaura"]]);
E("irvas","led","z","Irvas",{ent:["irvas"],info:[["Dom","hladni sjever"],["Hrana","lišajevi i mahovina"],["Veličina","oko 1,2 m do leđa"]],h:"Lebdi iznad snijega pod zvijezdama."},[
 ["Kod irvasa rogove imaju i mužjaci i ženke, a svake godine im narastu novi.","Tko kod irvasa ima rogove?","I mužjaci i ženke","Samo mladunci","Nitko"],
 ["Irvasi zimi kopitima razgrću snijeg i ispod njega nalaze lišajeve.","Kako irvasi zimi nalaze hranu?","Razgrću snijeg kopitima","Love ribu","Jedu snijeg"],
 ["Neki irvasi svake godine prijeđu tisuće kilometara u velikim krdima.","Kako neki irvasi putuju?","U velikim krdima, tisuće kilometara","Sami, po deset metara","Uopće ne putuju"]]);
E("medvjedic","led","z","Polarni medvjed",{ent:["medvjedic"],info:[["Dom","Arktik, oko Sjevernog pola"],["Hrana","tuljani"],["Veličina","do 2,5 m"]],h:"Medvjedić koji obožava klizati."},[
 ["Ispod bijelog krzna polarni medvjed ima crnu kožu koja upija toplinu sunca.","Koje je boje koža polarnog medvjeda?","Crne","Bijele","Ružičaste"],
 ["Polarni medvjed odlično pliva i može plivati satima u ledenom moru.","Što polarni medvjed odlično radi?","Pliva","Penje se po palmama","Leti"],
 ["Polarni medvjedi žive na Arktiku, oko Sjevernog pola, gdje nema pingvina.","Gdje žive polarni medvjedi?","Oko Sjevernog pola","Oko Južnog pola","U pustinji"]]);
E("polarna","led","p","Polarna svjetlost",{enter:"led",em:"🌌",bg:"#2a6a5a"},[
 ["Polarna svjetlost nastaje kad čestice sa Sunca udaraju u zrak visoko iznad Zemlje i on zasvijetli.","Kako nastaje polarna svjetlost?","Čestice sa Sunca udaraju u zrak","Netko upali lampe","Mjesec se odražava u snijegu"],
 ["Najčešće je vidiš blizu Sjevernog i Južnog pola, za vedrih zimskih noći.","Gdje se polarna svjetlost najčešće vidi?","Blizu polova","Na ekvatoru","U pustinji"],
 ["Najčešća boja polarne svjetlosti je zelena, a ponekad zasvijetli i ljubičasto i crveno.","Koja je najčešća boja polarne svjetlosti?","Zelena","Smeđa","Crna"]]);
E("kristal","led","p","Snježna pahulja",{wcount:"led",em:"❄️",bg:"#8ac8f0"},[
 ["Svaka snježna pahulja ima šest krakova jer se tako slažu sitne čestice leda.","Koliko krakova ima snježna pahulja?","Šest","Tri","Deset"],
 ["Pahulje nastaju u oblacima kad se vodena para zaledi oko sićušne čestice prašine.","Gdje nastaju snježne pahulje?","U oblacima","U zemlji","U moru"],
 ["Snijeg izgleda bijel jer mnogo sitnih kristalića leda odbija svjetlost na sve strane.","Zašto snijeg izgleda bijel?","Kristalići odbijaju svjetlost","Obojen je kredom","Zbog Mjeseca"]]);
E("gejzir","led","p","Gejzir",{isl:"vrela",w:"led",em:"♨️",bg:"#5aa8b8"},[
 ["Gejzir je izvor koji povremeno izbaci vruću vodu i paru visoko u zrak.","Što izbacuje gejzir?","Vruću vodu i paru","Snijeg","Kamenje"],
 ["Voda u gejziru je vruća jer je duboko pod zemljom zagrije užareno kamenje.","Zašto je voda u gejziru vruća?","Zagrije je kamenje pod zemljom","Netko je kuha","Zbog sunca"],
 ["Riječ gejzir dolazi od Geysira, poznatog izvora na Islandu.","Odakle dolazi riječ gejzir?","S Islanda","Iz Afrike","S Mjeseca"]]);
E("palaca","led","m","Ledena palača",{isl:"palaca",w:"led",em:"🏯",bg:"#6ab0e8"},[
 ["Vrata Ledene palače otvore se kad skupiš svih 10 snježnih kristala.","Što otvara vrata Ledene palače?","10 snježnih kristala","Ključ od zlata","Pjesma pingvina"],
 ["U nekim hladnim zemljama svake zime grade pravi hotel od leda i snijega u kojem se može prespavati.","Od čega je napravljen pravi ledeni hotel?","Od leda i snijega","Od stakla","Od šećera"],
 ["Iglu se gradi od snježnih blokova, a unutra je puno toplije nego vani na vjetru.","Kako je u igluu?","Toplije nego vani","Hladnije nego vani","Mokro kao u moru"]]);
/* ---------------- PODVODNI GRAD ---------------- */
E("rak","more","z","Rak",{ent:["rak"],info:[["Dom","obale i morsko dno"],["Hrana","alge, sitne životinjice"],["Veličina","od 1 cm do 4 m raspona nogu"]],h:"Hoda bočno po pijesku."},[
 ["Mnogi rakovi hodaju bočno jer im se noge tako najlakše savijaju.","Kako hoda mnogo rakova?","Bočno","Unatrag na glavi","Skačući"],
 ["Rak raste tako da odbaci stari oklop, a novi mekani oklop se zatim stvrdne.","Što rak radi kad naraste?","Odbaci stari oklop","Skupi se","Prestane jesti"],
 ["Japanski rak pauk ima noge raširene skoro četiri metra, više od automobila.","Koliko su raširene noge japanskog raka pauka?","Skoro četiri metra","Deset centimetara","Kao zrno graška"]]);
E("mkonjic","more","z","Morski konjic",{ent:["mkonjic"],info:[["Dom","morske livade i koralji"],["Hrana","sitni račići"],["Veličina","od 2 do 35 cm"]],h:"Mjehurko se skriva u morskoj travi."},[
 ["Kod morskih konjica mladunce u trbušnoj vrećici nosi tata, a ne mama.","Tko kod morskih konjica nosi mladunce?","Tata","Mama","Morska zvijezda"],
 ["Morski konjic repom se uhvati za morsku travu da ga struja ne odnese.","Čemu morskom konjicu služi rep?","Hvata se za travu","Za plivanje brzo kao strijela","Za kopanje"],
 ["Morski konjic je riba, iako izgleda kao mali konj.","Što je morski konjic?","Riba","Konj","Puž"]]);
E("manta","more","z","Manta",{ent:["manta"],info:[["Dom","topla mora"],["Hrana","plankton"],["Veličina","do 7 m raspona"]],h:"Zvjezdica pleše pod morem."},[
 ["Manta je najveća raža. Peraje joj mogu biti raširene i sedam metara.","Koliko mogu biti raširene peraje mante?","Do sedam metara","Pola metra","Dva centimetra"],
 ["Iako je ogromna, manta jede sićušni plankton koji procjeđuje iz vode.","Što jede ogromna manta?","Sićušni plankton","Velike kitove","Kamenje"],
 ["Mante ponekad iskaču iz mora i pljusnu natrag u vodu.","Što mante ponekad rade?","Iskaču iz mora","Penju se na stijene","Grade gnijezda"]]);
E("hobotnica","more","z","Hobotnica",{ent:["hobotnica"],info:[["Dom","stijene na morskom dnu"],["Hrana","rakovi i školjke"],["Veličina","od 2 cm do 4 m"]],h:"Osmica se krije u pećinici."},[
 ["Hobotnica ima tri srca i plavu krv.","Koliko srca ima hobotnica?","Tri","Jedno","Osam"],
 ["Hobotnica može u trenu promijeniti boju kože i stopiti se s kamenjem.","Kako se hobotnica skriva?","Mijenja boju kože","Zakopa se u led","Leti iz mora"],
 ["Hobotnica je jako pametna. Može otvoriti staklenku i pamtiti put kroz labirint.","Što pametna hobotnica može naučiti?","Otvoriti staklenku","Čitati novine","Pjevati"]]);
E("kit","more","z","Grbavi kit",{star:"kit",w:"more",info:[["Dom","svi oceani"],["Hrana","kril i sitne ribe"],["Veličina","oko 15 m"]],h:"Pjeva u dubini Podvodnog grada."},[
 ["Mužjaci grbavog kita pjevaju dugačke pjesme koje se pod vodom čuju kilometrima daleko.","Što grbavi kitovi rade pod vodom?","Pjevaju duge pjesme","Grade kuće","Spavaju na dnu"],
 ["Kit je sisavac, pa mora izroniti da udahne zrak kroz nosnice na vrhu glave.","Zašto kit izranja?","Da udahne zrak","Da se ugrije","Da vidi oblake"],
 ["Plavi kit je najveća životinja koja je ikad živjela, veća i od najvećih dinosaura.","Koja je najveća životinja koja je ikad živjela?","Plavi kit","Tiranosaur","Slon"]]);
E("biser","more","p","Biser",{star:"skoljka",w:"more",em:"🦪",bg:"#c8b8e0"},[
 ["Biser nastaje kad u školjku uđe zrnce, a ona ga sloj po sloj obloži sjajnom tvari.","Kako nastaje biser?","Školjka obloži zrnce slojevima","Pada s neba","Iskopa se u rudniku"],
 ["Za lijepi biser školjci treba nekoliko godina.","Koliko školjci treba za lijepi biser?","Nekoliko godina","Jedan dan","Jedna minuta"],
 ["Sjaj bisera zove se sedef. Od sedefa su nekad bila i dugmad na odjeći.","Kako se zove sjajna tvar od koje je biser?","Sedef","Staklo","Vosak"]]);
E("koralji","more","p","Koraljni greben",{isl:"greben",w:"more",em:"🪸",bg:"#e87a6a"},[
 ["Koralji izgledaju kao biljke ili kamenje, ali su zapravo sitne životinje.","Što su zapravo koralji?","Sitne životinje","Biljke","Kamenje"],
 ["Veliki koraljni greben u Australiji toliko je velik da se vidi iz svemira.","Što se vidi iz svemira?","Veliki koraljni greben","Jedna školjka","Morski konjic"],
 ["Na koraljnim grebenima živi oko četvrtina svih vrsta morskih životinja.","Koliko vrsta morskih životinja živi na grebenima?","Oko četvrtina","Samo jedna","Nijedna"]]);
E("meduza","more","z","Meduza",{isl:"jarak",w:"more",info:[["Dom","svi oceani"],["Hrana","plankton i sitne ribe"],["Veličina","od 1 mm do 2 m"]],h:"Svijetli u dubokom jarku."},[
 ["Meduza nema mozak, srce ni kosti, a tijelo joj je uglavnom od vode.","Što meduza nema?","Mozak, srce ni kosti","Tijelo","Boju"],
 ["Neke meduze u mraku dubokog mora same svijetle.","Što rade neke meduze u dubini?","Svijetle","Pjevaju","Kopaju tunele"],
 ["Meduze žive na Zemlji već stotinama milijuna godina, dulje od dinosaura.","Koliko dugo meduze žive na Zemlji?","Dulje od dinosaura","Deset godina","Od prošlog ljeta"]]);
E("grad","more","m","Podvodni grad",{isl:"grad",w:"more",em:"🏛️",bg:"#3a8ac8"},[
 ["Vrata Bisernog hrama otvore se kad skupiš svih 10 svjetlećih bisera.","Što otvara Biserni hram?","10 svjetlećih bisera","Sidro","Pjesma kita"],
 ["Ljudi istražuju duboko more u malim podmornicama koje izdrže strašan pritisak vode.","Čime ljudi istražuju duboko more?","Malim podmornicama","Balonima","Biciklima"],
 ["Što je more dublje, to je tamnije, jer sunčeva svjetlost ne dopire duboko.","Zašto je duboko more tamno?","Svjetlost ne dopire duboko","Voda je crna","Ribe gase svjetlo"]]);
/* ---------------- DŽUNGLA DINOSAURA ---------------- */
E("trorog","dzungla","d","Triceratops",{ent:["trorog"],sci:"Triceratops",info:[["Doba","prije 68 do 66 milijuna godina"],["Hrana","biljke"],["Veličina","oko 9 m"]],h:"Stari mudrac kraj kampa."},[
 ["Triceratops znači lice s tri roga. Imao je dva duga roga iznad očiju i jedan kratki na nosu.","Što znači ime triceratops?","Lice s tri roga","Brzi gušter","Leteća glava"],
 ["Veliki koštani ovratnik oko glave štitio mu je vrat, a možda je služio i da se pokaže drugima.","Čemu je triceratopsu služio koštani ovratnik?","Štitio mu je vrat","Za letenje","Za kopanje"],
 ["Triceratops je bio biljožder i kljunom kao u papige trgao je tvrde biljke.","Što je jeo triceratops?","Biljke","Ribe","Druge dinosaure"]]);
E("dugovrat","dzungla","d","Brahiosaur",{ent:["dugovrat","dugovrat_v"],sci:"Brachiosaurus",info:[["Doba","prije oko 150 milijuna godina"],["Hrana","lišće s krošnji"],["Veličina","oko 25 m"]],h:"Pase lišće s najviših krošnji."},[
 ["Brahiosaur je dugim vratom dosezao lišće visoko kao kuća s četiri kata.","Čemu je brahiosauru služio dugi vrat?","Dosezao je visoko lišće","Plivao je njime","Kopao je rupe"],
 ["Prednje noge bile su mu duže od stražnjih, pa su mu leđa bila nagnuta kao tobogan.","Po čemu su posebne brahiosaurove noge?","Prednje su duže od stražnjih","Imao je šest nogu","Nije imao noge"],
 ["Odrasli brahiosaur bio je težak kao desetak slonova.","Koliko je bio težak odrasli brahiosaur?","Kao desetak slonova","Kao jedna mačka","Kao bicikl"]]);
E("trex","dzungla","d","Tiranosaur",{ent:["trex"],sci:"Tyrannosaurus rex",info:[["Doba","prije 68 do 66 milijuna godina"],["Hrana","meso"],["Veličina","oko 12 m"]],h:"Ričko voli zvjezdasto voće."},[
 ["Tiranosaur je imao najjači ugriz od svih kopnenih životinja koje su ikad živjele.","Po čemu je tiranosaur poznat?","Najjači ugriz na kopnu","Najduži vrat","Šarena krila"],
 ["Njegove prednje ruke bile su kratke, ali jako snažne, a imale su samo dva prsta.","Koliko prstiju je imao tiranosaur na rukama?","Dva","Deset","Nijedan"],
 ["Zubi tiranosaura bili su veliki kao banane.","Koliko su bili veliki zubi tiranosaura?","Kao banane","Kao zrno riže","Kao lubenice"]]);
E("ptero","dzungla","d","Pteranodon",{ent:["ptero"],sci:"Pteranodon",info:[["Doba","prije oko 85 milijuna godina"],["Hrana","ribe"],["Veličina","krila oko 6 m"]],h:"Krilko se boji visine."},[
 ["Pteranodon nije bio dinosaur, nego leteći gmaz pterosaur, njihov rođak.","Je li pteranodon bio dinosaur?","Ne, bio je leteći gmaz","Da, najveći","Bio je ptica"],
 ["Krila su mu bila od kože razapete između tijela i jako dugog četvrtog prsta.","Od čega su bila krila pteranodona?","Od kože","Od perja","Od lišća"],
 ["Pteranodon je letio nad morem i lovio ribu, a zubi mu nisu trebali jer ju je gutao cijelu.","Što je pteranodon lovio?","Ribu","Mrkve","Slonove"]]);
E("stego","dzungla","d","Stegosaur",{ent:["stego"],sci:"Stegosaurus",info:[["Doba","prije oko 150 milijuna godina"],["Hrana","niske biljke"],["Veličina","oko 9 m"]],h:"Ima ploče na leđima."},[
 ["Stegosaur je na leđima imao velike koštane ploče, a na repu četiri oštra šiljka.","Što je stegosaur imao na repu?","Četiri šiljka","Pero","Zvono"],
 ["Mozak stegosaura bio je malen, otprilike kao šljiva.","Koliko je bio velik mozak stegosaura?","Kao šljiva","Kao lubenica","Kao kuća"],
 ["Stegosaur je živio puno prije tiranosaura. Između njih je prošlo više od 80 milijuna godina.","Je li stegosaur sreo tiranosaura?","Ne, živjeli su u različito doba","Da, bili su prijatelji","Da, svaki dan"]]);
E("kompy","dzungla","d","Kompsognat",{ent:["kompy"],sci:"Compsognathus",info:[["Doba","prije oko 150 milijuna godina"],["Hrana","gušteri i kukci"],["Veličina","oko 1 m s repom"]],h:"Male brze dinosauriće ima posvuda kraj kampa."},[
 ["Kompsognat je bio jedan od najmanjih dinosaura, otprilike velik kao kokoš.","Koliko je bio velik kompsognat?","Kao kokoš","Kao autobus","Kao kit"],
 ["Bio je brz trkač i lovio je guštere i kukce.","Što je lovio kompsognat?","Guštere i kukce","Velike dinosaure","Ribe u oceanu"],
 ["Ptice su potomci malih dinosaura, pa je svaka ptica zapravo rođak dinosaura.","Koje su životinje danas rođaci dinosaura?","Ptice","Ribe","Puževi"]]);
E("trubac","dzungla","d","Parasaurolof",{ent:["trubac_p","trubac_z","trubac_c"],sci:"Parasaurolophus",info:[["Doba","prije oko 75 milijuna godina"],["Hrana","biljke"],["Veličina","oko 9 m"]],h:"Pjevaju na livadi."},[
 ["Parasaurolof je imao dugu šuplju krijestu na glavi kroz koju je mogao trubiti.","Čemu je služila krijesta parasaurolofa?","Za trubljenje","Za letenje","Za kopanje"],
 ["Znanstvenici su napravili model njegove krijeste i on je zvučao duboko, kao truba.","Kako je zvučala krijesta?","Duboko, kao truba","Kao zvono","Nikako"],
 ["Parasaurolofi su živjeli u krdima i trubom su se možda dozivali.","Kako su se parasaurolofi možda dozivali?","Trubeći krijestom","Pismima","Mašući repom"]]);
E("majka","dzungla","d","Majasaura",{ent:["majka"],sci:"Maiasaura",info:[["Doba","prije oko 76 milijuna godina"],["Hrana","biljke"],["Veličina","oko 9 m"]],h:"Čuva gnijezdo s jajima."},[
 ["Ime majasaura znači gušterica dobra majka, jer su pronađena njena gnijezda s mladuncima.","Što znači ime majasaura?","Gušterica dobra majka","Brza noga","Veliki zub"],
 ["Majasaure su gradile gnijezda od zemlje i lišća, jedna blizu druge, kao selo.","Kako su majasaure gradile gnijezda?","Jedna blizu druge, kao selo","Na vrhu planine","U moru"],
 ["Mama majasaura donosila je hranu mladuncima dok nisu dovoljno narasli.","Što je mama majasaura radila za mladunce?","Donosila im hranu","Pjevala im","Ništa"]]);
E("krokodil","dzungla","z","Krokodil",{isl:"laguna",w:"dzungla",info:[["Dom","tople rijeke i močvare"],["Hrana","ribe i životinje"],["Veličina","do 6 m"]],h:"Zubko čuva lagunu."},[
 ["Krokodili su živjeli već u doba dinosaura i preživjeli su do danas.","Kada su se pojavili krokodili?","Već u doba dinosaura","Prošle godine","Poslije ljudi"],
 ["Oči i nosnice su mu na vrhu glave, pa može vrebati skriven u vodi.","Zašto krokodil ima oči na vrhu glave?","Da vreba skriven u vodi","Da gleda zvijezde","Da ne vidi ništa"],
 ["Krokodilu cijeli život rastu novi zubi kad mu stari ispadnu.","Što se događa kad krokodilu ispadne zub?","Naraste novi","Ostane bez zuba","Ide zubaru"]]);
E("vulkan","dzungla","p","Vulkan",{isl:"vulkan",w:"dzungla",em:"🌋",bg:"#d84a2a"},[
 ["Vulkan je planina kroz koju iz unutrašnjosti Zemlje izlazi užarena lava.","Što izlazi iz vulkana?","Užarena lava","Voda za piće","Snijeg"],
 ["Kad se lava ohladi, pretvori se u tamnu stijenu koja se zove bazalt.","U što se pretvori ohlađena lava?","U bazalt","U zlato","U pijesak za plažu"],
 ["Lava može biti vruća više od 1000 stupnjeva, deset puta više od kipuće vode.","Koliko vruća može biti lava?","Više od 1000 stupnjeva","50 stupnjeva","Hladna je"]]);
E("jantar","dzungla","p","Jantar",{wcount:"dzungla",em:"🟠",bg:"#e8a030"},[
 ["Jantar je smola drveća koja se stvrdnula tijekom milijuna godina.","Što je jantar?","Stvrdnuta smola drveća","Žuto staklo","Zaleđeni med"],
 ["U jantaru se ponekad nađu kukci stari milijune godina, savršeno sačuvani.","Što se ponekad nađe u jantaru?","Drevni kukci","Dinosauri","Kovanice"],
 ["Jantar je lagan, pa u slanom moru može plutati.","Što jantar može u slanom moru?","Plutati","Rasti","Svijetliti"]]);
E("fosili","dzungla","p","Fosili",{isl:"iskopine",w:"dzungla",em:"🦴",bg:"#b89a6a"},[
 ["Fosili su ostaci ili otisci biljaka i životinja koji su se tijekom milijuna godina pretvorili u kamen.","Što su fosili?","Ostaci pretvoreni u kamen","Igračke od plastike","Svježe kosti"],
 ["Znanstvenici koji istražuju fosile zovu se paleontolozi.","Kako se zovu znanstvenici koji istražuju fosile?","Paleontolozi","Astronauti","Kuhari"],
 ["Stijene su složene u slojeve, a što je sloj dublje, to je obično stariji.","Koji su slojevi stijena obično stariji?","Oni dublje","Oni na vrhu","Svi su isti"]]);
