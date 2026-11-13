# Otok priča 2: uputa za predaju (za drugog programera ili AI alat)

## Što je ovo
Igra za čitanje i istraživanje za desetogodišnju djevojčicu (Dorotea). Kockasti 3D otok (three.js 0.186, uključen u kod, bez CDN-a), lisica Rida, knjige koje dijete čita grade otok, četvrti, 12 portalnih svjetova, album otkrića, mini-igre, joystick, hrvatski i njemački.

## Gdje je što
- `POKRENI-IGRU.html` – gotova igra, otvara se u pregledniku.
- `verzije/` – sve objavljene verzije (v1 do v21).
- `izvorni-kod/js/*.js` – kod; redoslijed učitavanja je u `izvorni-kod/order.json`.
- `izvorni-kod/body.html`, `head.html`, `libs.html`, `style.css`, `assets/` (teksture), `lib/three-otok.min.js`.
- `izvorni-kod/album-tekstovi/` – tekstovi albuma (hr+de).
- `PROCITAJ-ME.md` – što donosi svaka verzija.
- `napredak-kopije/` – kopije spremljenih igara iz oblaka (JSON).

## Gradnja
`cd izvorni-kod && python3 build.py ../nova.html` spaja sve u jednu HTML datoteku.
Nove datoteke se dodaju kao zasebni `js` moduli i upisuju u `order.json` prije `25i_de` (njemački prijevod mora biti zadnji uz `25i_jezik` i `25_start`).
Stil koda: kasniji moduli omataju ranije funkcije (`{const _x=f;f=function(){...}}`), ne mijenjaju ih izravno.

## Pravila koja se ne smiju prekršiti
1. **Spremanje**: localStorage ključ `otok-prica-v3` se nikad ne mijenja; smiju se dodavati samo nova, neobavezna polja. Dnevna kopija `-bak`, kopija prije vraćanja `-prije`. Sinkronizacija s oblakom (claude.ai `window.claude` db) bira spremanje s više pročitanih stranica, pa više knjiga, pa višom razinom. Napredak čitanja je nezamjenjiv: svaku promjenu spremanja testirati prije objave.
2. Životinje i likovi ostaju **kockasti** (blok stil). Okrugli/glatki modeli su odbijeni.
3. Svaki novi tekst na hrvatskom treba njemački par (prijevodi u `25i_de.js`, generirano iz parova "hr|de").
4. Ne koristiti tuđe nazive/likove/izgled postojećih igara.
5. Igra mora raditi na mobitelu (vodoravno), tabletu, računalu i s joystickom (A skok, X radnja, ☰ Back = Kamo idemo?).

## Testiranje
Headless Chromium + Playwright (`izvorni-kod/tools/test-run.js`): učita igru sa zadanim spremanjem, pokreće JS provjere i radi snimke zaslona. Prije objave: nula grešaka na stranici, snimke ključnih mjesta.
