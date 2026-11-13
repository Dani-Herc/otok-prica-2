# three.js bundle for Otok priča 2

    npm i three@0.186.1 esbuild
    node b.mjs          # writes three-otok.min.js; copy it to src/lib/

entry.js collects three.js and the post-processing add-ons into one global `THREE`.
It keeps the game's own colour and light conventions (ColorManagement off, classic light scale)
and b.mjs lets a render target marked `otokDisplay` receive tone-mapped sRGB output.
