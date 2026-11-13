exec(open('atlas.py').read())
GR=(141,182,80);FO=(96,158,55)
def P(rel):return tilelist(CT+rel)
def rep(rel,tint=None,ow=None,oh=None):
  d,t=P(rel);w=int(d.get('width',1));h=int(d.get('height',1))
  C,N,S=compose(t,w,h)
  if tint:C=tintimg(C,tint)
  return ('rep',C,N,S,w,h)
def rnd(rel,tint=None,n=None):
  d,t=P(rel);items=[]
  for p in t[:n or 99]:
    C,N,S=compose([p],1,1)
    if tint:C=tintimg(C,tint)
    items.append((C,N,S))
  return ('rnd',items)
def van(name,tint=None):
  C,N,S=compose([BL+name+'.png'],1,1)
  if tint:C=tintimg(C,tint)
  return ('rnd',[(C,N,S)])
SETS={}
SETS['grass_top']=rep('grass/block/top/grass_block_top2.properties',GR)
gs=rep('grass/block/side_default/grass_block_side.properties');go=rep('grass/block/side_overlay/grass_block_side_overlay.properties',GR)
SETS['grass_side']=('rep',over(gs[1],go[1]),over(gs[2],go[2]) ,gs[3],gs[4],gs[5])
SETS['dirt']=rep('dirt/default/dirt.properties')
SETS['path']=rep('dirt/path/top/dirt_path_top.properties')
SETS['sand']=rep('sand/yellow/sand.properties')
SETS['stone']=rep('stone/stone1.properties')
SETS['cobble']=rep('cobblestone/default/cobblestone.properties')
SETS['log_side']=rep('log/oak/oak_log7.properties')
SETS['log_top']=rnd('log/oak/top/oak_log_top.properties',n=4)
SETS['planks']=rep('planks/oak/planks.properties')
SETS['leaves']=rnd('leaves/oak/oak_leaves.properties',FO)
SETS['leaves_m']=rnd('leaves/oak/oak_leaves.properties',(196,128,236))
SETS['leaves_a']=rnd('leaves/oak/oak_leaves.properties',(236,150,60))
SETS['leaves_s']=rnd('leaves/oak/oak_leaves.properties',(70,120,62))
SETS['cherry']=rnd('leaves/cherry/cherry_leaves.properties')
SETS['bricks']=rep('bricks/bricks.properties')
SETS['glass']=rnd('glass/glass.properties',n=4)
SETS['snow']=rep('snow/snow.properties')
SETS['gold']=rnd('ore_block/gold/gold_block.properties',n=4)
SETS['sealantern']=rnd('sea_lantern/sea_lantern.properties')
SETS['red']=rep('concrete/normal/red/red_concrete.properties')
SETS['calcite']=rep('calcite/calcite.properties')
SETS['mush']=rep('mushroom/red/block/'+[f for f in os.listdir(CT+'mushroom/red/block') if f.endswith('.properties')][0])
SETS['hay_side']=rnd('hay/side/hay_block_side.properties',n=4)
SETS['hay_top']=rnd('hay/top/hay_block_top.properties',n=4)
SETS['roof']=rep('deepslate/tile/deepslate_tiles.properties',(175,205,255))
SETS['shelf']=rnd('bookshelf/bookshelf.properties',n=1) if False else van('bookshelf')
SETS['shroom']=rep('shroomlight/shroomlight.properties')
SETS['glowstone']=rep('glowstone/glowstone.properties')
SETS['froglight']=rnd('froglight/pearlescent/pearlescent_froglight_side.properties',n=3)
SETS['moss']=rep('moss/moss_block.properties')
SETS['gravel']=rep('gravel/gravel1.properties')
# plants (cutout sprites)
for n in ['short_grass','fern','poppy','dandelion','cornflower','oxeye_daisy','allium','azure_bluet','orange_tulip','pink_tulip','red_tulip','lily_of_the_valley','blue_orchid']:
  t=(165,210,95) if n in('short_grass','fern') else None
  SETS['p_'+n]=van(n,t)

# ---- v9 additions: islands, cave, reef, farm, interiors ----
for n in ['sandstone_top','sandstone','sandstone_bottom','cut_sandstone','chiseled_sandstone','cactus_top','cactus_side','ice','packed_ice','mycelium_top','mycelium_side','mushroom_stem',
  'coal_ore','iron_ore','gold_ore','diamond_ore','copper_ore','emerald_ore','clay','tube_coral_block','brain_coral_block','horn_coral_block','fire_coral_block','bubble_coral_block',
  'prismarine','prismarine_bricks','dark_prismarine','deepslate_top','crafting_table_top','crafting_table_side','crafting_table_front','barrel_top','barrel_side','pumpkin_top','pumpkin_side','melon_top','melon_side',
  'farmland','farmland_moist','oak_door_top','oak_door_bottom','packed_mud','mud_bricks','tuff_bricks','polished_tuff','chiseled_tuff','spruce_planks','dark_oak_planks','birch_planks','quartz_block_side']:
  SETS['b_'+n]=van(n)
SETS['b_amethyst']=rep('amethyst/block/amethyst_block.properties')
SETS['b_deepslate']=rep('deepslate/stone/deepslate.properties')
_sb=[f for f in os.listdir(CT+'stone_bricks/default') if f.endswith('.properties')]
SETS['b_stonebricks']=rep('stone_bricks/default/'+_sb[0]) if _sb else van('stone_bricks')
SETS['b_spruce_log']=van('spruce_log');SETS['b_spruce_log_top']=van('spruce_log_top')
SETS['b_birch_log']=van('birch_log');SETS['b_birch_log_top']=van('birch_log_top')
SETS['leaves_b']=rnd('leaves/oak/oak_leaves.properties',(128,167,85))
for n in ['kelp','kelp_plant','seagrass','tall_seagrass_bottom','tall_seagrass_top','tube_coral','brain_coral','horn_coral','fire_coral','bubble_coral','tube_coral_fan','fire_coral_fan','horn_coral_fan','sea_pickle',
  'amethyst_cluster','large_amethyst_bud','dead_bush','red_mushroom','brown_mushroom','sweet_berry_bush_stage3','cactus_flower','torch',
  'carrots_stage0','carrots_stage1','carrots_stage2','carrots_stage3','potatoes_stage0','potatoes_stage1','potatoes_stage2','potatoes_stage3','beetroots_stage0','beetroots_stage1','beetroots_stage2','beetroots_stage3',
  'pink_petals','firefly_bush','peony_top','lilac_top','short_dry_grass']:
  SETS['p_'+n]=van(n)
SETS['p_sugar_cane']=van('sugar_cane',(145,189,89));SETS['p_lily_pad']=van('lily_pad',(60,150,60));SETS['p_bush']=van('bush',(120,170,80));SETS['p_glow_lichen']=van('glow_lichen')
PAD=8
# pack: simple shelf packer into 1024 wide
items=[]
for k,v in SETS.items():
  if v[0]=='rep':items.append((k,0,v[1],v[2],v[3],v[4],v[5]))
  else:
    for i,(C,N,S) in enumerate(v[1]):items.append((k,i,C,N,S,1,1))
items.sort(key=lambda it:-it[2].size[1])
AW=1024;x=0;y=0;rowh=0;pos=[]
for it in items:
  w,h=it[2].size;W2,H2=w+2*PAD,h+2*PAD
  if x+W2>AW:x=0;y+=rowh;rowh=0
  pos.append((x+PAD,y+PAD));x+=W2;rowh=max(rowh,H2)
AH=y+rowh;AH=1<<(AH-1).bit_length()
print('atlas',AW,AH,len(items))
CA=Image.new('RGBA',(AW,AH),(0,0,0,0));NA=Image.new('RGBA',(AW,AH),(128,128,255,255))
def wrap_paste(dst,src,px,py,cut):
  w,h=src.size
  for dy in range(-PAD,h+PAD):
    pass
  # tile 3x3 then crop
  big=Image.new('RGBA',(w*3,h*3))
  for i in range(3):
    for j in range(3):big.paste(src,(i*w,j*h))
  dst.paste(big.crop((w-PAD,h-PAD,2*w+PAD,2*h+PAD)),(px-PAD,py-PAD))
REG={}
for it,(px,py) in zip(items,pos):
  k,i,C,N,S,w,h=it
  # normal atlas: R,G normal; B = ao (from N.b) ; A = smoothness (S.r)
  n=N.split();s=S.split()
  NN=Image.merge('RGBA',(n[0],n[1],s[0],Image.new('L',C.size,255)))
  from PIL import ImageChops
  ao=n[2];c=C.split();C=Image.merge('RGBA',(ImageChops.multiply(c[0],ao),ImageChops.multiply(c[1],ao),ImageChops.multiply(c[2],ao),c[3]))
  cut=k.startswith('p_') or k.startswith('leaves') or k=='cherry' or k=='glass'
  wrap_paste(CA,C,px,py,cut);wrap_paste(NA,NN,px,py,cut)
  REG.setdefault(k,[]).append([px/AW,py/AH,C.size[0]/AW,C.size[1]/AH,w,h])
CA.save('atlas9_c.png');NA.convert('RGB').save('atlas9_n.png');CA.save('atlas9_c.webp',quality=90,method=6);NA.convert('RGB').save('atlas9_n.webp',quality=92,method=6)
json.dump(REG,open('regions9.json','w'))
print(json.dumps({k:len(v) for k,v in REG.items()}))
