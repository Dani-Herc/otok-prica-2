# Otok priča 2

Ista igra kao Otok priča (stanje v47 plus ljepši mostovi, krošnje, likovi i kostimi), prenesena na najnoviji three.js (0.186).
Stara igra ostaje netaknuta u mapi `otok-prica-paket`.

- `POKRENI-IGRU.html`: igra u jednoj datoteci, radi i bez interneta.
- `verzije/`: sve objavljene verzije.
- `izvorni-kod/`: izvorni kod. Slaganje: `python3 build.py izlaz.html`. Three.js paket se slaže u `tools/three-bundle`.

Prijenos napretka iz stare igre: u staroj igri Kutak za roditelje, Izvezi napredak; u novoj Kutak za roditelje, Uvezi.

## v1 (2026-11-12)
Prijelaz na three.js 0.186, oštrija slika (pravo višestruko uzorkovanje), ljepši mostovi, krošnje bez sive sjene, šeširi i ogrlice koji pristaju, nove animacije i aure za posebne kostime.

## v2 (2026-11-12)
Popravci nakon prve provjere: uklonjeno višestruko uzorkovanje (brzina), tiši vodopad, životinje i stranice enciklopedije otkrivaju se tek izbliza i pješice, novi raspored za mobitel (tanka traka uz donji rub, vodoravni položaj).

## v3 (2026-11-12)
Kompas na vrhu istraživanja (strane svijeta, oznake blaga, zadataka i knjižnice) umjesto natpisa zadatka; gumbi u kutu.

## v4 (2026-11-12)
Trg portala u svakoj četvrti (Lučki grad, Cvjetna dolina, Gorski kraj): četiri portala, svaki vodi u svoj svijet. Prvi otvoreni svijet je Gusarska uvala (iz Lučkog grada, razina 5): pristanište, most, gusarsko selo s krčmom, brod Crni galeb s košem na jarbolu, stara utvrda sa zvonima i riznicom, Otok lubanje sa špiljom, olupina, atol s lagunom i zakopanim blagom, visoka hrid i topovi koji ispaljuju preko mora. Novi prijatelji: Majmunčić Koko i Tukan Kljunko. Nagrade: Gusarska lisica i trag Zlatni dukati. Ostali portali pokazuju "Uskoro".

## v5 (2026-11-12): Otok svjetionika
Drugi portalni svijet Lučkog grada (razina 6). Stjenoviti otok u sumrak: svjetionik se ugasio i deset bisera svjetla raznijelo se po otoku i moru.
- Svjetionik s zavojitim stubama, balkonom i sobom s lampom (kristalni poklopac se otvara kad skupiš svih 10 bisera, lampa se upali i zraka se vrti).
- Ribarsko selo, luka s molom, signalna svjetla (redoslijed kao zastavice na jarbolu), regata kroz obruče na moru.
- Plimne lokve, morska špilja s puhalicom koja te izbaci na vrh stijene, tuljanove stijene, Otočić galebova sa skočnim kamenčićima, plutača sa zvonom.
- Vodič Djed Lovro (morž), ribarica Nela (zadatak s plovcima), novi ljubimci: Tuljanka Pega (pliva i roni) i Pufin Klempo (leti).
- Nagrade: kostim Lisica u kabanici i trag Zrake svjetionika.
- Kod: izvorni-kod/js/24zx_svjetionik.js.

## v6 (2026-11-12): Grad na kanalima
Treći portalni svijet Lučkog grada (razina 7). Šareni grad na laguni u vrijeme karnevala, deset zlatnih maski otvara riznicu palače.
- Kanali s 28 mostića i gondolama koje plove gradom, trg golubova sa zastavicama, zvonik sa stubama oko tornja.
- Bunar na trgu vodi u tajnu podzemnu cisternu (roni se), staklarska radionica (peć se pali redom boja s vitraja), labirint od živice u palačinom vrtu.
- Karnevalska pozornica s konfeti-topom koji te baci na vrh gradskog sata, četvrt krovova (trčanje od krova do krova), most uzdaha, sprud u laguni s blagom.
- Utrka gondola kroz kanale, Maskarka Ines (zadatak s perima), vodič Gondolijer Toni, ljubimci Golub Gugi (leti) i Paun Šarko (dvostruki skok).
- Nagrade: kostim Karnevalska lisica i trag Konfeti.
- Kod: izvorni-kod/js/24zy_kanali.js. Popravak u alatu: topovi sami nađu visinu cilja.

## v7 (2026-11-12): Svjetleći zaljev
Četvrti portalni svijet Lučkog grada (razina 8). Noćni zaljev u obliku polumjeseca, deset mjesečevih kamenova otvara Mjesečev hram na brdu.
- More svijetli plavo gdje Rida pliva ili vesla, plavi sjaj uz obalu, krijesnice nad dinama, div-meduze oko Hridi meduza.
- Kornjačja gnijezda i baka Mirta (zadatak: vrati 5 kornjačica, pa ih gledaš kako jure u more), ples krijesnica (utrka kroz krijesnice po dinama).
- Div-školjka katapult na plaži do Mjesečevih vrata (kameni luk), zvjezdarnica sa zvjezdanom kartom (ploče redom), špilja svjetlećih crvića, Velika dina, svjetleća uvala za ronjenje, Kokosov otočić s blagom, splav s lampionima.
- Novi ljubimci: Raža Svjetlica (pliva i roni) i Rakun Maskić (brzi trk i dvostruki skok). Sova Zvjezdana, rakovi, dupini.
- Nagrade: kostim Svjetleća lisica i trag Svjetleći plankton.
- Kod: izvorni-kod/js/24zz_zaljev.js.

## v8 (2026-11-12): Divovski vrt
Prvi portalni svijet Cvjetne doline (razina 8). Rida je malena kao bubamara, a deset sunčanih kapi otvara ružin pupoljak.
- Vlati trave visoke kao stabla, ograda vrta kao zid, divovski suncokret (žličica-katapult te baca na vrh), divovski cvjetovi s listićima za penjanje.
- Košnica s tri kata i stubama od saća, stara puževa kućica, mravinjak s tunelom do smočnice, velika lokva s lopočima, kanta za zalijevanje puna vode (prskalica te digne do ruba), zvončići koji sviraju, povrtnjak s blagom, kap rose na velikom listu.
- Utrka bubamara, Bubamara Točkica (vodič), Mrav Mravko (zadatak sa sjemenkama), Puž Polagani, Gusjenica Gricko, leptiri, pčele.
- Novi ljubimci: Pčelica Medica (leti) i Skakavac Skokić (golemi dvostruki skok).
- Nagrade: kostim Lisica bubamara i trag Latice.
- Kod: izvorni-kod/js/25a_vrt.js.

## v9 (2026-11-13): Vilinska šuma (Cvjetna dolina, razina 9)
Šuma u vječnom sumraku (js/25b_vila.js). Stablo svih stabala s vrtlogom latica kroz deblo do vilinske palače u krošnji (završna škrinja iza kristalnih vrata), vilinsko selo od kućica-gljiva, kućica na starom hrastu sa zavojitim stubama u deblu, skočne gljive do kamenog stupa, dva vilinska kruga koja te prenose na visoku stijenu, slap sa špiljom, Mjesečevo jezerce s ametistom, trolov most (Trol Brundo spava), pjevajuće gljive (redoslijed s ploče), blago pod starom vrbom, staza vilinske prašine (prstenovi). Ljubimci: Jednorog Zvjezdan (dvostruki skok) i Leptir Duga (let). Vila Iskrica traži 5 bočica prašine. Nagrade: krzno Vilinska lisica i trag Vilinska prašina.

## v10 (2026-11-13): Slatkišna zemlja (Cvjetna dolina, razina 10)
Zemlja od slatkiša (js/25c_slatko.js). Čokoladna rijeka (voda se u ovom svijetu boji smeđe) sa slapom i špiljom iza njega, mostovi od lizalica, bombonski dvorac (završna škrinja iza kristalnih vrata), golema torta na tri kata do koje te baca stroj za kokice, Sladoledna planina s vafl-stazom do trešnje, oblačići od šećerne vune po kojima se skače (skočni blokovi), gazirani gejzir koji te diže do leteće krafne, medenjak-selo (baka Medenka traži 5 bombona), žele-bubnjevi, špilja kamenih bombona, šećerna plaža s blagom i lizalica-staza. Ljubimci: Gumeni medo Gumko (dvostruki skok) i Ovčica Vunica (let). Nagrade: krzno Bombon lisica i trag Šarene mrvice.

## v11 (2026-11-13): Jesenska žetva (Cvjetna dolina, razina 11)
Zlatna dolina u jesen (js/25d_zetva.js). Vjetrenjača s krilima koja se okreću i zavojitim stubama do sobice na vrhu, kukuruzni labirint (zlatna jabučica u središtu), bundeva-kuća sa svjetlećim licem (strašilo Slamko traži 5 klipova kukuruza), voćnjak s golemom jabukom i stubama od bala sijena, crvena štala i klackalica koja te baca na krov, balon na vrući zrak do kojeg vodi vrtlog lišća, vodenica na potoku, košare voća (redoslijed), polje krumpira s blagom i staza jesenskog lišća. Ljubimci: Ponij Zlatko (brzi galop) i Divlja guska Siva (let). Nagrade: krzno Jesenska lisica i trag Jesenski listići. Popravak u v9: stube u starom hrastu (Vilinska šuma) više ne udaraju glavom u pod kućice.

## v12 (2026-11-13): Kristalne dubine (Gorski kraj, razina 11)
Svijet ispod planine sa stropom: Velika kristalna dvorana (kristalni toranj sa stubama, svjetlarnik, topli zrak iz užarenog procjepa), Podzemno jezero pod svjetlećim crvićima i čovječjim ribicama, Stari rudnik s vožnjom rudničkim kolicima i kolibom patuljka Grumenka, Gljivarska špilja (klobuci gljiva preko provalije), Dvorana fosila (penjanje po kralježnici), Golema geoda s kristalnim zvončićima, prstenovi oko tornja, Srce planine s blagom. Ljubimci: Krtica Kopka, Šišmiš Noćko. Nagrade: skin Kristalna lisica, trag Kristalne krhotine. Kod: izvorni-kod/js/25e_kristal.js.

## v13 (2026-11-13): Zmajevi vrhovi (Gorski kraj, razina 12)
Vrhovi iznad mora oblaka u zalasku sunca, spojeni visećim mostovima. Zmajevo gnijezdo sa zmajicom Ružom koja spava i zmajićima, Zmajev rog (skakanje po kamenčićima), zmajeva hrpa zlata (kopanje), pagoda zmajara Plamenka (vraćanje 5 jaja), slap kroz koji se prolazi do špilje, pagoda sa zvonima (redoslijed), zmajev katapult do lebdećeg otočića, Ledeni vrh sa snježnom stazom, vulkan s toplim zrakom, žičara do Orlove igle, prstenovi na mostu, zmajeva riznica. Pad u oblake: mali zmaj te vrati na stijenu. Ljubimci: Zmajić Iskrica (leti), Kozorog Rogo (dvostruki skok). Nagrade: skin Zmajska lisica, trag Zmajeve iskre. Kod: izvorni-kod/js/25f_zmajevi.js.

## v14 (2026-11-13): Pustinjski kanjon (Gorski kraj, razina 13)
Crveni kanjon s potokom (pješčenjak se u ovom svijetu boji u crvene, narančaste i krem slojeve). Vidikovac sa stubama do ruba kanjona, Kameni luk iznad kanjona, uska Svjetlosna pukotina sa zrakama sunca, kuće u stijeni do kojih te diže vrući zrak, Hram u stijeni s hijeroglifima na podu i riznicom, oaza s palmama, jezercem, šatorom karavanke Zare i bunarom koji vodi u podzemnu cisternu, zlatne dine s pješčanim toboganom, Velika dina, Pješčani stup do kojeg te baci vrući izvor, zakopano blago, prstenovi u kanjonu. Ljubimci: Fenek Uško, Kamila Grbica. Nagrade: skin Pustinjska lisica, trag Pješčani vrtlog. Kod: izvorni-kod/js/25g_kanjon.js.

## v15 (2026-11-13): Mjesečeva postaja (Gorski kraj, razina 14)
Mjesec sa slabom gravitacijom (svaki skok ide oko četiri kockice visoko, pada se polako), crno nebo sa zvijezdama i Zemljom. Mjesečeva postaja sa staklenikom i solarnim pločama (astronautkinja Vega i 5 solarnih ćelija), raketa s lansirnim tornjem (skakanje po policama), monorail do opservatorija na stijeni, Veliki krater sa središnjim vrhom, lebdeći asteroidi za skakanje, elektromagnetski top do Zlatnog asteroida, Ledeni krater (kopanje kroz led), radio-antena (signal redoslijedom), lavina cijev ispod okrugle rupe, orbitalni prstenovi, Zlatna kupola s blagom. Ljubimci: Mjesečev zec Skok, Robot Bip (leti). Nagrade: skin Lisica astronautkinja, trag Mjesečeva prašina. Kod: izvorni-kod/js/25h_mjesec.js.
Gorski kraj je time gotov: sva tri otoka imaju po četiri portalna svijeta (12 svjetova).

## v16 (2026-11-13): izbor jezika, njemački prijevod
- Zvuk i grafika (gumb s notom): Jezik · Language, Hrvatski ili Deutsch. Promjena ponovno učita stranicu.
- Izbor jezika pamti se u zasebnom ključu `otok-prica-jezik`, nije dio spremljenog napretka (spremanje i oblak ostaju isti).
- Prijevod: oko 5450 rečenica i riječi (izbornici, dijalozi, svi portalni svjetovi, enciklopedija, kvizovi, natpisi na kartama i kompasu).
- Imena likova i nazivi knjiga koje je Dorotea upisala ostaju kako jesu. Igra slova na njemačkom koristi njemačke riječi (s Ä, Ö, Ü).
- Datoteke: izvorni-kod/js/25i_de.js (rječnik), 25i_jezik.js (sustav jezika).

## v17 (2026-11-13): sobe, bez tema, svjetlina, njemačka imena
- Svaka od 18 zgrada ima svoju sobu (mali svijet): stanovnik za razgovor, ljubimac, posebne radnje, dnevno skriveno blago (25j_unutra.js, 25k_sobe_a.js, 25l_sobe_b.js).
- Nova knjiga više ne traži temu: naslov, autor, stranice, pa izbor bilo koje od 25 zgrada; isto kod preuređenja (25m_bez_tema.js).
- Slika malo tamnija, led i snijeg manje bliještavi, klizač Svjetlina u Zvuk i grafika (25n_svjetlo.js).
- Na njemačkom i imena likova dobivaju njemačka imena, igra se zove Geschichteninsel (25i_imena.js).

## v18 (2026-11-13): joystick bez miša, zatvorena vrata
- Kod najbliže stvari (vrata, stanovnik, životinja, škrinja, pismo) pojavi se gumb sa zelenim A, i A radi baš to; inače A skače (25o_joystick.js).
- Gumbi na ekranu pokazuju svoj gumb joysticka, prozori se otvaraju s okvirom na glavnom gumbu, dolje piše što koji gumb radi, klizači se mijenjaju s ◀ ▶.
- Portalni svjetovi: kod zatvorenih vrata piše tko ima ključ i koliko je zadatka gotovo; završen zadatak uvijek otvori vrata (25p_vrata.js). Primjer: kućica bake Medenke u Svijetu slatkiša.

## v19 (2026-11-13): ulazak na X, izlazak iz vode
- Joystick: A je uvijek samo skok; ulazak, razgovor i otvaranje su na X (gumbi na ekranu pokazuju plavi X). Na tipkovnici ulazak je Enter, a gumb za ulazak više ne može slučajno pritisnuti razmaknica (25r_popravci.js).
- Voda: kad Rida pliva uz visoku obalu ili u rupi iskopanoj uz more, skok je izbaci van; u plitkoj vodi skok je jači.

## v20 (2026-11-13): Album otkrića
- Enciklopedija je sada "Album otkrića": 125 stranica u 18 poglavlja (stari otok, 4 stara svijeta, gradske četvrti i svih 12 portalnih svjetova).
- 69 novih stranica (25q_album_data.js): 35 pravih životinja, 12 čarobnih bića, 10 likova (gusari, ribari, gondolijeri, astronauti...), 12 stranica o svjetovima. Svaka ima 3 zanimljivosti s pitanjem, na hrvatskom i njemačkom (izvor: izvorni-kod/album-tekstovi/a1-a4.txt).
- Neotkrivene slike su zamagljene s upitnikom; stranica se otkrije kad Rida priđe životinji ili uđe u svijet. Na vrhu albuma brojač po vrstama (25q_album.js).

## v21 (13. 11. 2026.): spremanje, likovi, navigacija, zvuk
- **Automatsko spremanje**: igra se sprema svakih 15 sekundi i odmah (u preglednik i u oblak) kad se kartica sakrije, preglednik zatvori ili uređaj zaspe.
- **Pronađi najbolji napredak** (Kutak za roditelje): popis svih kopija u pregledniku i u oblaku s razinom, stranicama i zlatnicima; jednim dodirom (pa potvrdom) vraća se odabrana. Prije vraćanja iz datoteke stara se igra čuva u posebnoj kopiji. Kod jednakog broja stranica sada pobjeđuje kopija s višom razinom, ne novija.
- **Likovi**: likovi koji stoje na mjestu (Ribarica Nela, Ribar Jakov, Djed Lovro, vile, pekari, patuljci...) bili su nevidljivi u kutu karte. Sada stoje na svom mjestu u svih 12 svjetova, dišu, gledaju okolo i okreću se prema Ridi. Nela i Staklar Marko više ne stoje na krovu, Orlić Brzić više ne lebdi ispod svijeta.
- **Kamo idemo?** (gumb s kompasom gore, tipka M, na joysticku ☰ Back): jednim dodirom putuješ na Otok priča, u bilo koju četvrt ili bilo koji svijet. Popis likova sa zadacima na ovom mjestu i gumb „Pokaži put”: crveni stup svjetla, crvena oznaka na kompasu i natpis s udaljenošću.
- **Zvuk**: svi efekti idu kroz jedan mek instrument (bez oštrih piskutavih tonova), sedam pravih pjesmica (jutro na otoku, livada, noćna uspavanka, morska, cvjetni valcer, planinska, glazbena kutija za led i mjesec), priroda bez šuštanja, tiši i mekši koraci, filtar koji uklanja oštre visoke tonove.
