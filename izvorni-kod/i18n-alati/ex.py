import re,glob,json,html
SRC='../n/src/'
files=[SRC+'js/'+f+'.js' for f in json.load(open(SRC+'order.json'))]
lit=re.compile(r'"((?:[^"\\\n]|\\.)*)"|\'((?:[^\'\\\n]|\\.)*)\'')
CODE=re.compile(r'^[a-z_$][A-Za-z0-9_$]*$|^[#.]?[a-z][\w-]*$|^\d|^#[0-9a-f]{3,8}$')
seen={};order=[]
def add(seg,f,raw=''):
    seg=html.unescape(seg)
    if re.search(r'_|[A-Za-z]\d|\d[a-z]|\w/\w|\(\-|\(\d|%',seg): return
    seg=re.sub(r'\s+',' ',seg).strip(' ,.:;!?()·-–|/+')
    if len(seg)<2: return
    if not re.search(r'[A-Za-zČĆŽŠĐčćžšđ]{2,}',seg): return
    if CODE.match(seg) and not re.search('[čćžšđ]',seg) and not (raw[:1]==' ' or raw[-1:]==' '):
        return
    if re.search(r'[{};=]|=>|\bfunction\b|px\b|rgba?\(|\bvar\(|^\w+:\w',seg): return
    if seg not in seen: seen[seg]=f; order.append(seg)
def proc(s,f):
    for m in lit.finditer(s):
        t=m.group(1) if m.group(1) is not None else m.group(2)
        t=t.replace('\\"','"').replace("\\'","'").replace('\\n',' ')
        if '<' in t or '>' in t:
            t=re.sub(r'<[^>]*>?','\n',t); t=re.sub(r'^[^<]*>','\n',t)
        for seg in t.split('\n'): add(seg,f,seg)
for f in files: proc(open(f).read(),f.split('/')[-1])
b=open(SRC+'body.html').read()
for seg in re.sub(r'<script.*?</script>|<style.*?</style>','',b,flags=re.S).split('<'):
    seg=seg.split('>',1)[-1]; add(seg,'body')
for m in re.finditer(r'(?:title|aria-label|placeholder)="([^"]*)"',b): add(m.group(1),'body')
json.dump([[s,seen[s]] for s in order],open('src.json','w'),ensure_ascii=False,indent=0)
print(len(order),sum(len(s) for s in order))
import collections
c=collections.Counter(seen[s] for s in order);print(c.most_common(8))
