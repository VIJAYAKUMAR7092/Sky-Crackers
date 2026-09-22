import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new pg.Pool({ connectionString: "postgresql://admin:skycrackers123@localhost:5432/skycrackers?schema=public" });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const rawData = `Combo Package
3000 SPECIAL CAMBO 
3000 SPECIAL CAMBO
₹15000
₹3000
Total: ₹0.00
3000 night cambo(31 items)
3000 night cambo(31 items)
₹15000
₹3000
Total: ₹0.00
3000 cambo (44 items)
3000 cambo (44 items)
₹15000
₹3000
Total: ₹0.00
4000 kids cambo(40 items)
4000 kids cambo(40 items)
₹20000
₹4000
Total: ₹0.00
5000 cambo (50 items)
5000 cambo (50 items)
₹25000
₹5000
Total: ₹0.00
5000 night cambo (41 items)
5000 night cambo (41 items)
₹25000
₹5000
Total: ₹0.00

SPARKLERS
10cm Electric
10cm Electric
10 செ.மீ சாதா கம்பி
₹75
₹15
Total: ₹0.00
10cm Colour
10cm Colour
10 செ.மீ கலர் கம்பி
₹80
₹16
Total: ₹0.00
15cm Electric
15cm Electric
15 செ.மீ சாதா கம்பி
₹175
₹35
Total: ₹0.00
30cm Electric
30cm Electric
30 செ.மீ சாதா கம்பி
₹175
₹35
Total: ₹0.00
15cm Colour
15cm Colour
15 செ.மீ கலர் கம்பி
₹185
₹37
Total: ₹0.00
30cm Colour
30cm Colour
30 செ.மீ கலர் கம்பி
₹185
₹37
Total: ₹0.00
15cm Green
15cm Green
15 செ.மீ பச்சை கம்பி
₹225
₹45
Total: ₹0.00
15cm Red
15cm Red
15 செ.மீ சிகப்பு கம்பி
₹225
₹45
184
Total: ₹8280.00
30cm Red
30cm Red
30 செ.மீ சிகப்பு கம்பி
₹225
₹45
Total: ₹0.00
30cm Green
30cm Green
30 செ.மீ பச்சை கம்பி
₹225
₹45
Total: ₹0.00
50cm electric sparklers
50cm electric sparklers
50 செ.மீ சாதா கம்பி
₹750
₹150
Total: ₹0.00
50cm Colour
50cm Colour
50 செ.மீ கலர் கம்பி
₹800
₹160
Total: ₹0.00

special colour sparklers
Orange color sparklers
Orange color sparklers
₹225
₹45
Total: ₹0.00
Pink color sparklers
Pink color sparklers
₹250
₹50
Total: ₹0.00
Blue color sparklers
Blue color sparklers
₹250
₹50
Total: ₹0.00
Lovely heart
Lovely heart
லவ்லி ஹாட்
₹700
₹140
Total: ₹0.00
Rotating sparklers
Rotating sparklers
₹1000
₹200
Total: ₹0.00

GROUND CHAKKAR
Ground chakkar big
Ground chakkar big
தரை சக்கரம் பெரியது
₹150
₹30
Total: ₹0.00
Ground chakkar ashoka
Ground chakkar ashoka
தரை சக்கரம் அசோகா
₹225
₹45
Total: ₹0.00
Ground chakkar SPL
Ground chakkar SPL
தரை சக்கரம் ஸ்பெஷல்
₹350
₹70
Total: ₹0.00
Ground chakkar deluxe
Ground chakkar deluxe
தரை சக்கரம் டீலக்ஸ்
₹550
₹110
Total: ₹0.00

spcial color chakkar
whiztling wheel
whiztling wheel
₹600
₹120
Total: ₹0.00
Wire chakker(10pcs)
Wire chakker(10pcs)
₹750
₹150
Total: ₹0.00
LOTUS WHEEL 
LOTUS WHEEL
₹800
₹160
Total: ₹0.00
Racing 4*4wheel 
Racing 4*4wheel
₹850
₹170
Total: ₹0.00
Zodiac spinner(5pcs)
Zodiac spinner(5pcs)
₹1000
₹200
Total: ₹0.00
tinto wheel(Red &green) 5pcs
tinto wheel(Red &green) 5pcs
₹1000
₹200
Total: ₹0.00

FLOWER POTS
Flower pots big 
Flower pots big
பூச்சட்டி பெரியது
₹300
₹60
Total: ₹0.00
Flower Pots Special  
Flower Pots Special
பூச்சட்டி ஸ்பெஷல்
₹400
₹80
Total: ₹0.00
Flower pot Ashoka
Flower pot Ashoka
பூச்சட்டி அசோகா
₹500
₹100
Total: ₹0.00
Pachranga (red & green)
Pachranga (red & green)
₹650
₹130
Total: ₹0.00
Color koti
Color koti
₹800
₹160
Total: ₹0.00
Mini tri color(5pcs)
Mini tri color(5pcs)
₹950
₹190
Total: ₹0.00
Color koti deluxe
Color koti deluxe
கலர் கோட்டி டீலக்ஸ்
₹1350
₹270
Total: ₹0.00
Tri colour dlx
Tri colour dlx
₹1300
₹300
Total: ₹0.00
mega jumbo pots 
mega jumbo pots
₹2250
₹450
Total: ₹0.00

one sound crackers
2 3/4 ' Kuruvi
2 3/4 ' Kuruvi
2 3/4 'குருவி
₹40
₹8
Total: ₹0.00
3 1/2 ' Lakshmi
3 1/2 ' Lakshmi
3 1/2 ' லட்சுமி
₹60
₹12
Total: ₹0.00
4 ' Lakshmi
4 ' Lakshmi
4 'லட்சுமி
₹80
₹16
Total: ₹0.00
Deluxe gold lakshmi
Deluxe gold lakshmi
₹150
₹30
Total: ₹0.00
5 " jallikattu
5 " jallikattu
5 "ஜல்லிக்கட்டு
₹225
₹45
Total: ₹0.00
6 " kumki
6 " kumki
6 "கும்ப்கி
₹325
₹65
Total: ₹0.00
 Best rider mega dlx
Best rider mega dlx
₹400
₹80
Total: ₹0.00

Bombs
Bullet Bomb
Bullet Bomb
புல்லட் பாம்
₹175
₹35
Total: ₹0.00
Hydro Bomb
Hydro Bomb
ஹைட்ரோ பாம்
₹350
₹70
Total: ₹0.00
King Of king Bombs
King Of king Bombs
கிங் ஆஃப் பாம்
₹550
₹110
Total: ₹0.00
Classic Bomb
Classic Bomb
₹650
₹130
Total: ₹0.00
Digital Bomb
Digital Bomb
டிஜிட்டல் பாம்
₹1150
₹230
Total: ₹0.00

PAPER BOMB
250G paper bomb
250G paper bomb
250 கிராம் bomb
₹250
₹50
Total: ₹0.00
500 Gm Paper Bomb
500 Gm Paper Bomb
500 கிராம் பாம்
₹500
₹100
Total: ₹0.00
1 Kg Paper Bomb
1 Kg Paper Bomb
1Kg கிராம் பாம்
₹950
₹190
Total: ₹0.00

TWINKLE STAR
1 1/2 Twinkling Star
1 1/2 Twinkling Star
1 1/2" சாட்டை
₹125
₹25
Total: ₹0.00
4 ' Twinkling Star
4 ' Twinkling Star
4" சாட்டை
₹250
₹50
Total: ₹0.00

SPECIAL NOVELTIES
Kit kat 
Kit kat
₹125
₹25
Total: ₹0.00
photo flash
photo flash
₹300
₹60
Total: ₹0.00
Butterfly
Butterfly
பட்டாம்பூச்சி
₹400
₹80
Total: ₹0.00
Helicopter
Helicopter
₹450
₹90
Total: ₹0.00
Bambaram
Bambaram
பம்பரம்
₹500
₹100
Total: ₹0.00
5' tin water queen 
5' tin water queen
₹600
₹120
Total: ₹0.00
mini siren (5 pce)
mini siren (5 pce)
₹725
₹145
Total: ₹0.00
Mega Siren
Mega Siren
மெகா சைரன்
₹800
₹160
Total: ₹0.00

Kids Novelties
snake serphant
snake serphant
₹125
₹25
Total: ₹0.00
Asrafi (5pcs)
Asrafi (5pcs)
₹225
₹45
Total: ₹0.00
Angry bird(5 varieties)
Angry bird(5 varieties)
₹225
₹45
Total: ₹0.00
Electric stone(10box)
Electric stone(10box)
₹400
₹80
Total: ₹0.00
sward
sward
₹600
₹120
Total: ₹0.00
pogo (5pcs)
pogo (5pcs)
₹750
₹150
Total: ₹0.00
sonny's red fountain
sonny's red fountain
₹800
₹160
Total: ₹0.00
Sonny's green fountain
Sonny's green fountain
₹800
₹160
Total: ₹0.00
Lucky money
Lucky money
பணம்
₹800
₹160
Total: ₹0.00
Lolli pop
Lolli pop
₹900
₹180
Total: ₹0.00
Lion king or elephant
Lion king or elephant
₹900
₹180
Total: ₹0.00
MONEY BANK (2PIS)
MONEY BANK (2PIS)
உண்டியல் பாம்
₹900
₹180
Total: ₹0.00
Free fire gun(2pcs)
Free fire gun(2pcs)
₹900
₹180
Total: ₹0.00
Ak47
Ak47
₹1150
₹230
Total: ₹0.00

Colour fountain
ayyan's little dove 
ayyan's little dove
₹380
₹80
Total: ₹0.00
Tin fountain(crackling)
Tin fountain(crackling)
₹400
₹80
Total: ₹0.00
Ayyan's pogo mix(5 colors)
Ayyan's pogo mix(5 colors)
₹450
₹90
Total: ₹0.00
peacock feather(5pcs)
peacock feather(5pcs)
₹450
₹90
Total: ₹0.00
Disco Shower(5pcs)
Disco Shower(5pcs)
₹450
₹90
Total: ₹0.00
Volcano (3 varaties)
Volcano (3 varaties)
₹600
₹120
Total: ₹0.00
star drum crackling
star drum crackling
₹600
₹120
Total: ₹0.00
Lemon tree
Lemon tree
₹600
₹120
Total: ₹0.00
pop corn fountain
pop corn fountain
₹600
₹120
Total: ₹0.00
Power puff girls(3 varities)
Power puff girls(3 varities)
₹800
₹160
Total: ₹0.00
Power pot (5 colors)
Power pot (5 colors)
₹800
₹160
Total: ₹0.00
I CONE
I CONE
₹900
₹180
Total: ₹0.00
Mojito(2pcs) 
Mojito(2pcs)
₹925
₹185
Total: ₹0.00
Crackling fountain(3pcs)
Crackling fountain(3pcs)
₹1300
₹260
Total: ₹0.00

peacock fountain
peacock 3 phase
peacock 3 phase
₹700
₹140
Total: ₹0.00
Colour smoke peacock
Colour smoke peacock
₹900
₹180
Total: ₹0.00
Bada Peacock 
Bada Peacock
மயில் பவுண்டன்
₹1700
₹340
Total: ₹0.00

colour sticks
selfie stick 
selfie stick
₹250
₹50
Total: ₹0.00
HI FI pencil
HI FI pencil
₹750
₹150
Total: ₹0.00
Red flare(5pcs)
Red flare(5pcs)
₹800
₹160
Total: ₹0.00
smoke(triple color)
smoke(triple color)
₹800
₹160
Total: ₹0.00

Rockets
rocket bomb
rocket bomb
₹350
₹70
Total: ₹0.00
Lunik rocket
Lunik rocket
₹550
₹110
Total: ₹0.00
Whistling rocket
Whistling rocket
₹800
₹160
Total: ₹0.00

New Arrivals 2026
6" Crackling fountain
6" Crackling fountain
₹750
₹150
Total: ₹0.00
Cylinder bomb(smoke with color paper)
Cylinder bomb(smoke with color paper)
₹750
₹150
Total: ₹0.00
Tom&jerry (6 varaties)
Tom&jerry (6 varaties)
₹750
₹150
Total: ₹0.00
Double duckker
Double duckker
₹800
₹160
Total: ₹0.00
Hybrid(double color)
Hybrid(double color)
₹850
₹170
Total: ₹0.00
Jolly bobby
Jolly bobby
₹1050
₹210
Total: ₹0.00
kulfi candle
kulfi candle
₹1300
₹260
Total: ₹0.00
Pizza(6pcs)
Pizza(6pcs)
₹2100
₹420
Total: ₹0.00
Jolly bobby (3pcs)
Jolly bobby (3pcs)
₹3000
₹600
Total: ₹0.00
HAND SHOT 888 BRAND
HAND SHOT 888 BRAND
₹8500
₹1700
Total: ₹0.00

Loose Crackers
Red bijli(100 pic)
Red bijli(100 pic)
₹190
₹38
Total: ₹0.00
Stripped bijli(100 pic)
Stripped bijli(100 pic)
₹200
₹40
Total: ₹0.00

single outs
Sky shot(5pcs)
Sky shot(5pcs)
₹300
₹60
Total: ₹0.00
7 shot (5 pcs)
7 shot (5 pcs)
₹450
₹90
Total: ₹0.00
Raider shot(10pic)
Raider shot(10pic)
₹700
₹150
Total: ₹0.00
Penta force(5pcs)
Penta force(5pcs)
₹900
₹180
Total: ₹0.00
White house(5pcs)
White house(5pcs)
₹1100
₹220
Total: ₹0.00

single ariel outs
Chotta fancy
Chotta fancy
₹140
₹28
Total: ₹0.00
2inch Fancy 
2inch Fancy
₹400
₹80
Total: ₹0.00
2 inch fancy (blue star brand)
2 inch fancy (blue star brand)
₹600
₹120
Total: ₹0.00
3 inch Fancy 
3 inch Fancy
₹1150
₹230
Total: ₹0.00
3 ½ inch  Fancy 
3 1/2 inch Fancy
₹1350
₹270
Total: ₹0.00
3 1/2  inch fancy( blue star brand) 
3 1/2 inch fancy( blue star brand)
₹1500
₹300
Total: ₹0.00
4 inch fancy pipe
4 inch fancy pipe
₹1750
₹350
Total: ₹0.00
4" Tin fancy 
4" Tin fancy
₹2000
₹400
Total: ₹0.00

special colour single aireal outs
3 1/2 fancy sizziling
3 1/2 fancy sizziling
₹1500
₹300
Total: ₹0.00
king fisher (crackling)
king fisher (crackling)
₹1500
₹300
Total: ₹0.00
3 1/2 inch nayagara falls
3 1/2 inch nayagara falls
₹1500
₹300
Total: ₹0.00
12 Step
12 Step
₹2000
₹400
Total: ₹0.00
4" tin pipe (5 colors)
4" tin pipe (5 colors)
₹800
₹400
Total: ₹0.00
4inch wow pink
4inch wow pink
₹2250
₹450
Total: ₹0.00
7 Step(4 inch)
7 Step(4 inch)
₹2250
₹450
Total: ₹0.00
 4inch Double ball fancy
4inch Double ball fancy
₹2250
₹450
Total: ₹0.00

combo ariel out
2 inch Fancy ( 3 pic) 
2 inch Fancy ( 3 pic)
₹1150
₹230
Total: ₹0.00
2 3/4  inch fancy (3pic)
2 3/4  inch fancy (3pic)
₹2250
₹450
Total: ₹0.00
4inch fancy (2pic)
4inch fancy (2pic)
₹4000
₹800
Total: ₹0.00
5 inch Fany ( 2Pic) 
5 inch Fany ( 2Pic)
₹4500
₹900
Total: ₹0.00

Repeating multi colour shots
12 shot rider
12 shot rider
₹650
₹130
Total: ₹0.00
25 Shot Rider
25 Shot Rider
₹1200
₹240
Total: ₹0.00
30 Shots Multicolour
30 Shots Multicolour
30 ஷாட் மல்டி கலர்
₹1900
₹380
Total: ₹0.00
30 Shot multi color prime
30 Shot multi color prime
₹2400
₹480
Total: ₹0.00
60 Shots Multicolour
60 Shots Multicolour
60 ஷாட் மல்டி கலர்
₹3800
₹760
Total: ₹0.00
60 Shot multi color prime
60 Shot multi color prime
₹4800
₹960
Total: ₹0.00
120 Shots Multicolour
120 Shots Multicolour
120 ஷாட் மல்டி கலர்
₹7800
₹1560
Total: ₹0.00
120 shot multi color prime
120 shot multi color prime
₹9500
₹1900
Total: ₹0.00
240 Shots Multicolour prime
240 Shots Multicolour prime
240 ஷாட் மல்டி கலர்
₹19000
₹3800
Total: ₹0.00
510 Shots Multicolour prime
510 Shots Multicolour prime
510 ஷாட் மல்டி கலர்
₹40000
₹8000
Total: ₹0.00

special multi colour shot 2026
peacock dance(ipl function)
peacock dance(ipl function)
₹2250
₹450
Total: ₹0.00
25 shot whistling
25 shot whistling
₹4000
₹800
Total: ₹0.00

festival display
1  1/2 inch setout (48shot's)
1 1/2 inch setout (48shot's)
₹15000
₹3000
Total: ₹0.00
10 X 10 multi colour shots
10 X 10 multi colour shots
₹17500
₹3500
Total: ₹0.00

digital lar
1k prime 
1k prime
₹1500
₹300
Total: ₹0.00
2k Prime
2k Prime
₹3000
₹600
Total: ₹0.00
5k prime
5k prime
₹7500
₹1500
Total: ₹0.00
10k prime
10k prime
₹15000
₹3000
Total: ₹0.00

colour matches
kings matchs
kings matchs
₹350
₹70
Total: ₹0.00
7up 5 in 1 color
7up 5 in 1 color
₹900
₹180
Total: ₹0.00

Guns
Ring caps
Ring caps
₹50
₹10
Total: ₹0.00
Roll cap
Roll cap
₹300
₹60
Total: ₹0.00
Sony gun
Sony gun
₹750
₹150
Total: ₹0.00

Gift box
20 item box
20 item box
₹1350
₹270
Total: ₹0.00
25 item box
25 item box
₹1650
₹330
Total: ₹0.00
30 item uv box
30 item uv box
₹2250
₹450
Total: ₹0.00
40 item uv box
40 item uv box
₹3250
₹650
Total: ₹0.00
50 item uv box
50 item uv box
₹4250
₹850
Total: ₹0.00

vanitha fireworks special fancy outs
4 1/2" pink out (2pcs)
4 1/2" pink out (2pcs)
₹9000
₹1800
Total: ₹0.00
5" purple rain
5" purple rain
₹10000
₹2000
Total: ₹0.00
6" ocean blue jambo pipe
6" ocean blue jambo pipe
₹12500
₹2500
Total: ₹0.00

sonny fancy
Orange (2pcs)
Orange (2pcs)
₹2750
₹550
Total: ₹0.00
Blue pearls(2pcs)
Blue pearls(2pcs)
₹2750
₹550
Total: ₹0.00
5 inch oscar series (2pcs)
5 inch oscar series (2pcs)
₹7500
₹1500
Total: ₹0.00`;

const catMap = {
  "combo package": "combo-pack",
  "sparklers": "sparkles",
  "special colour sparklers": "special-colour-sparkleres",
  "ground chakkar": "ground-checker",
  "spcial color chakkar": "fancy-wheels",
  "flower pots": "flower-pot",
  "one sound crackers": "one-sound-crackers",
  "bombs": "bombs",
  "paper bomb": "paper-bombs",
  "twinkle star": "twinkling-star",
  "special novelties": "fancy-novelties",
  "kids novelties": "kids-novelties",
  "colour fountain": "fancy-fountain-multicolor",
  "peacock fountain": "peacock-fountain",
  "colour sticks": "torches-and-pencil",
  "rockets": "rocket",
  "new arrivals 2026": "new-arrivals-2026",
  "loose crackers": "loose-crackers",
  "single outs": "single-ariel-fancy-5pcs",
  "single ariel outs": "single-arial-fancy",
  "special colour single aireal outs": "special-colour-ariel-fancy",
  "combo ariel out": "combo-ariel-fancy",
  "repeating multi colour shots": "repeating-multicolor-shots",
  "special multi colour shot 2026": "special-multi-colour-shirts-2026",
  "festival display": "festival-display-set-out",
  "digital lar": "digital-lar",
  "colour matches": "colour-matches",
  "guns": "guns",
  "gift box": "gift-box",
  "vanitha fireworks special fancy outs": "vanitha-fire-work-special-fancy-outs",
  "sonny fancy": "sony-fancy"
};

async function main() {
  console.log("Starting to parse and insert 100+ products...");
  const dbCategories = await prisma.category.findMany();
  
  const lines = rawData.split('\n').map(l => l.trim()).filter(l => l !== '');
  let currentCategoryId = null;
  let nameBuffer = [];
  let addedCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    const matchedKey = Object.keys(catMap).find(k => k === line.toLowerCase());
    if (matchedKey) {
      const targetSlug = catMap[matchedKey];
      const dbCat = dbCategories.find(c => c.slug === targetSlug);
      if (dbCat) {
        currentCategoryId = dbCat.id;
      }
      nameBuffer = [];
      continue;
    }

    if (line.toLowerCase().startsWith('total:')) {
      if (!currentCategoryId) {
        nameBuffer = [];
        continue;
      }
      
      let mrp = 0;
      let price = 0;
      const priceLines = nameBuffer.filter(l => l.includes('₹'));
      
      if (priceLines.length >= 2) {
         mrp = parseInt(priceLines[0].replace(/[^0-9]/g, ''));
         price = parseInt(priceLines[1].replace(/[^0-9]/g, ''));
      } else if (priceLines.length === 1) {
         price = parseInt(priceLines[0].replace(/[^0-9]/g, ''));
         mrp = price; 
      }
      
      const name = nameBuffer[0];
      if (name && price > 0) {
         const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random()*10000);
         
         try {
           await prisma.product.create({
             data: {
               name: name,
               slug: slug,
               mrp: mrp,
               sellingPrice: price,
               categoryId: currentCategoryId,
               active: true
             }
           });
           console.log(`✅ Added Product: ${name} (MRP: ₹${mrp} | Price: ₹${price})`);
           addedCount++;
         } catch (e) {
           console.log(`❌ Failed to add ${name}`);
         }
      }
      nameBuffer = [];
    } else {
      nameBuffer.push(line);
    }
  }
  const log = `\n🎉 All ${addedCount} Products added successfully!`;
  console.log(log);
}

main().finally(() => prisma.$disconnect());