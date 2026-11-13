import json,glob,re
src=json.load(open('src2.json'))
pairs={}
for f in sorted(glob.glob('de/*.txt')):
    for line in open(f,encoding='utf-8'):
        line=line.rstrip('\n')
        if '|' not in line: continue
        i,v=line.split('|',1)
        try:i=int(i)
        except:continue
        k=src[i][0];v=v.strip()
        if not v: continue
        k=re.sub(r'^[^\w]+','',k);v=re.sub(r'^[^\w„"]+','',v)
        if re.fullmatch(r'[A-ZČĆŽŠĐ]+',k) and k!='OBRIŠI': continue
        if k and k!=v: pairs[k]=v
# extra manual pairs
for l in open('extra.txt',encoding='utf-8') if __import__('os').path.exists('extra.txt') else []:
    if '|' in l:
        k,v=l.rstrip('\n').split('|',1);pairs[k]=v
for l in open('album_pairs.txt',encoding='utf-8'):
    if '|' in l:
        k,v=l.rstrip('\n').split('|',1);pairs[k]=v
out='/* German translation for 25i_jezik.js, generated from the Croatian source strings */\nconst JZ_DE='+json.dumps(list(pairs.items()),ensure_ascii=False,separators=(',',':'))+';\n'
open('../n/src/js/25i_de.js','w',encoding='utf-8').write(out);print(len(pairs),len(out))
