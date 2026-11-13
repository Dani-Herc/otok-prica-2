import os,re,json,sys
from PIL import Image
R='/tmp/claude-0/-home-claude/c048ecff-3500-5218-ab44-a2cc1f547c5e/scratchpad/patrix/'
CT=R+'ctm/';BL=R+'block/'
def props(p):
  d={}
  for l in open(p):
    if '=' in l:k,v=l.strip().split('=',1);d[k]=v
  return d
def tilelist(p):
  d=props(p);base=os.path.dirname(p);out=[]
  for t in d['tiles'].split():
    if t=='<default>':out.append(BL+d['matchTiles'].split()[0]+'.png')
    elif '-' in t:
      a,b=map(int,t.split('-'));out+= [f'{base}/{i}.png' for i in range(a,b+1)]
    else:out.append(f'{base}/{t}.png')
  return d,out
def load(path,suf):
  q=path[:-4]+suf+'.png'
  if not os.path.exists(q):return None
  return Image.open(q).convert('RGBA')
def flat_n():return Image.new('RGBA',(32,32),(128,128,255,255))
def flat_s():return Image.new('RGBA',(32,32),(40,0,0,0))
def compose(paths,w,h):
  C=Image.new('RGBA',(32*w,32*h));N=Image.new('RGBA',(32*w,32*h));S=Image.new('RGBA',(32*w,32*h))
  for i,p in enumerate(paths[:w*h]):
    x=(i%w)*32;y=(i//w)*32
    c=load(p,'');n=load(p,'_n') or flat_n();s=load(p,'_s') or flat_s()
    if c.size!=(32,32):c=c.crop((0,0,32,32))
    if n.size!=(32,32):n=n.resize((32,32))
    if s.size!=(32,32):s=s.resize((32,32))
    C.paste(c,(x,y));N.paste(n,(x,y));S.paste(s,(x,y))
  return C,N,S
def tintimg(im,rgb):
  px=im.load();W,H=im.size
  for y in range(H):
    for x in range(W):
      r,g,b,a=px[x,y];px[x,y]=(r*rgb[0]//255,g*rgb[1]//255,b*rgb[2]//255,a)
  return im
def over(base,top):
  out=base.copy();out.alpha_composite(top);return out
