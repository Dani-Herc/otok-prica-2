/* =================== DATA =================== */
const GENRES={
  fantazija:{n:"Fantastika",place:"Začarana šuma",col:"#7a52c7",d:"Zmajevi, čarolije i tajni svjetovi"},
  misterij:{n:"Misterij",place:"Svjetionik u magli",col:"#2d6fb0",d:"Zagonetke, detektivi i tajne"},
  avantura:{n:"Avantura",place:"Piratska utvrda",col:"#d0782a",d:"Putovanja, blago i hrabri junaci"},
  zivotinje:{n:"Životinje i priroda",place:"Sunčana farma",col:"#3f9a3f",d:"Ljubimci, šume i divlje životinje"},
  znanost:{n:"Znanost i svemir",place:"Zvjezdarnica",col:"#1f8f8a",d:"Planeti, izumi i zanimljivosti"},
  zivot:{n:"Priče iz života",place:"Kućica s vrtom",col:"#d94d63",d:"Prijatelji, škola i obitelj"}
};
const VISITORS=[
  {k:"zec",n:"Zec Skok",d:"Voli mrkve i kratke priče.",min:0},
  {k:"patka",n:"Patka Kvaki",d:"Pliva oko otoka i pjeva malo krivo.",min:0},
  {k:"jez",n:"Jež Bodlja",d:"Bodljikav izvana, mekan iznutra.",min:1},
  {k:"ovca",n:"Ovca Vunica",d:"Spava na sijenu i sanja oblake.",min:2},
  {k:"kornjaca",n:"Kornjača Polka",d:"Polako, ali uvijek dođe do kraja knjige.",min:3},
  {k:"macka",n:"Mačka Mrvica",d:"Lovi stranice koje nosi vjetar.",min:4},
  {k:"papiga",n:"Papiga Rio",d:"Ponavlja najljepše rečenice iz knjiga.",min:5},
  {k:"sova",n:"Sova Mudrica",d:"Čuvarica knjižnice. Dolazi samo najupornijim čitačima.",min:7}
];
const QUESTIONS=[
  "Tko ti je zasad najdraži lik i zašto?","Što se dogodilo u dijelu koji si danas pročitala?",
  "Da možeš ući u ovu knjigu, gdje bi se htjela naći?","Što misliš, što će se dogoditi dalje?",
  "Je li te danas nešto iznenadilo u priči?","Koju bi rečenicu iz današnjeg čitanja voljela zapamtiti?",
  "Da si ti glavni lik, bi li postupila isto? Zašto?","Koji bi lik iz knjige bio dobar prijatelj meni, Ridi?",
  "Kako bi nacrtala mjesto u kojem se priča sada odvija?","Koji lik ti se ne sviđa i zašto?"
];
const RIDA_IDLE=[
  "Svaka knjiga koju pročitaš ovdje sagradi nešto novo.","Volim kad mi pričaš o knjigama!",
  "Pogledaj more. Ponekad dopluta boca s porukom.","Jesi li vidjela dupine? Ponekad skaču kod obale!",
  "Na planini je izvor. Potok teče sve do slapa na litici.","Noću lampioni najljepše svijetle. Probaj gumb s mjesecom.",
  "Ako čitaš svaki dan, na otok dolaze novi posjetitelji.","Kockice za gradnju čuvaš u torbi. Svakih 10 pročitanih stranica donosi nove, a svaka pročitana knjiga otkriva nove vrste!",
  "Vidiš li balon? Kažu da u njemu leti netko tko voli bajke.","Po otoku je skriveno blago. Pritisni Istraži i potraži ga sa mnom!","Na otočićima u moru svjetluca posebno blago. Do njih mogu otplivati!","U planini je špilja puna kristala. Ulaz je zatrpan šljunkom, ali to se lako iskopa.","Pod morem je koraljni greben i potonuli brod. S ronilačkom maskom mogu dugo roniti!","Daleko u moru je šest otoka. Za njih treba čamac iz radionice.","Kramp kopa kamen, lopata zemlju, a sjekira drvo. Bolji alat, brže kopanje!","Na molu se može loviti riba. Noću grizu i neke posebne!","Svakih 10 pročitanih stranica donosi kartu za igre i nove kockice."
];
const LEVELS=["Mala čitateljica","Mala čitateljica","Istraživačica","Istraživačica","Graditeljica priča","Graditeljica priča","Lovkinja na stranice","Lovkinja na stranice","Čuvarica knjiga","Čuvarica knjiga","Majstorica otoka"];

