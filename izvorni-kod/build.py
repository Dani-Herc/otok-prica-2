#!/usr/bin/env python3
"""Assemble Otok priča into one HTML file: python3 build.py <out.html> [--offline]"""
import json,base64,sys,os
SRC=os.path.dirname(os.path.abspath(__file__))+'/'
R=lambda f:open(SRC+f,encoding='utf-8').read()
order=json.load(open(SRC+'order.json'))
js=''.join(R('js/'+n+'.js') for n in order)
b64=lambda f:'data:image/webp;base64,'+open(SRC+'assets/'+f.replace('.webp','.b64')).read().strip()
reg=json.dumps(json.load(open(SRC+'assets/regions.json')),separators=(',',':'))
js=js.replace('__REGIONS__',reg,1).replace('__ATLAS_C__',b64('atlas_c.webp'),1).replace('__ATLAS_N__',b64('atlas_n.webp'),1)
# three.js (latest, bundled with the post-processing add-ons by tools/three-bundle) is always inlined: one file, works offline
libs='<script>'+R('lib/three-otok.min.js').replace('</script>','<\\/script>')+'</script>'
html=R('head.html')+'<style>'+R('style.css')+'</style>'+R('body.html')+libs+'<script>'+js+'</script>'+R('tail.html')
args=[x for x in sys.argv[1:] if not x.startswith('--')]
out=args[0] if args else SRC+'../otok-prica-dev.html'
open(out,'w',encoding='utf-8').write(html);print(out,len(html))
