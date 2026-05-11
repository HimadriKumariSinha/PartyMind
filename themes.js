// ============================================================
// PartyMind AI — Theme Data
// ============================================================

const THEMES = {
  'Masquerade Ball': {
    icon: '🎭', sub: 'Venetian Glamour & Mystery',
    colors: ['#1a0030', '#6B0080', '#FFD700', '#C090FF', '#FF2D78'],
    desc: 'An opulent Venetian masquerade with golden candlelight, velvet drapes, and elegant mystery.',
    tags: ['Formal', 'Indoor', 'Romantic'],
    gradient: 'linear-gradient(135deg,#6B0080,#FFD700)',
    decorations: [
      'Venetian feathered masks as centrepieces',
      'Gold candelabras with taper candles',
      'Deep purple & crimson velvet drapes',
      'Rose petal pathways',
      'String quartet corner with baroque décor',
      'Mirror ball & chandelier lighting'
    ],
    food: [
      'Italian antipasto & bruschetta platter',
      'Prosciutto & fig crostini',
      'Champagne & prosecco tower',
      'Tiramisu & panna cotta dessert bar',
      'Artisan cheese & charcuterie board',
      'Sparkling mocktail station'
    ],
    music: [
      'Vivaldi — Four Seasons',
      'Debussy — Clair de Lune',
      'Classical waltz medley',
      'Opera arias playlist',
      'String quartet live performance',
      'Baroque dinner music set'
    ],
    dress: [
      'Ball gowns in jewel tones',
      'Tuxedos with bow ties',
      'Venetian mask (mandatory!)',
      'Long satin gloves',
      'Top hats & capes',
      'Feathered fascinators'
    ],
    activities: [
      'Grand mask reveal contest',
      'Venetian waltz dance floor',
      'Mystery envelope dinner game',
      'Photo booth with baroque frame',
      'Masquerade trivia night',
      'DIY mask painting corner'
    ],
    lighting: [
      'Warm golden candlelight',
      'Crystal chandeliers',
      'Soft amber uplighting',
      'Deep purple spotlights',
      'Fairy lights in velvet drapes',
      'Candelabra table centrepieces'
    ],
    tips: 'Encourage all guests to arrive masked. Plan a grand "unmasking ceremony" at midnight for a dramatic reveal!'
  },

  'Tropical': {
    icon: '🌴', sub: 'Beach Vibes & Sunshine',
    colors: ['#0a4f2a', '#00C864', '#FFB400', '#FF6B35', '#00CFFF'],
    desc: 'A vibrant luau paradise bursting with palm trees, tiki torches, and tropical energy.',
    tags: ['Casual', 'Outdoor', 'Fun'],
    gradient: 'linear-gradient(135deg,#00C864,#FFB400)',
    decorations: [
      'Palm tree cutouts & real potted palms',
      'Tiki torches lining the entrance',
      'Flamingo & pineapple inflatables',
      'Tropical flower garlands (leis)',
      'Bamboo furniture & rattan accents',
      'Seashell & sand centrepieces'
    ],
    food: [
      'BBQ skewers & grilled seafood',
      'Mango & pineapple salsa bar',
      'Coconut shrimp & fish tacos',
      'Tropical fruit platter station',
      'Mocktail bar: Blue Lagoon, Mango Lassi',
      'Piña colada & virgin cocktail corner'
    ],
    music: [
      'Hawaiian slack-key guitar playlist',
      'Steel drum band live set',
      'Bob Marley reggae classics',
      'Tropical house & beach beats',
      'Moana & Disney tropical soundtrack',
      'Calypso & Caribbean mix'
    ],
    dress: [
      'Aloha shirts & sundresses',
      'Grass skirts & floral leis',
      'Flower crowns',
      'Beach shorts & flip flops',
      'Sarongs & wraps',
      'Snorkel & swim gear (pool parties)'
    ],
    activities: [
      'Limbo contest with tiki torch',
      'Hula dancing lesson',
      'Tropical cocktail mixing class',
      'Sandcastle building competition',
      'Hawaiian trivia game',
      'Luau treasure hunt'
    ],
    lighting: [
      'Tiki torch warm flame glow',
      'String lights in palm trees',
      'Neon pink & cyan uplighting',
      'Lanterns hung across venue',
      'Sunset gradient ambient lights',
      'Underwater blue pool lighting'
    ],
    tips: 'Set up a DIY lei-making station at the entrance so guests can create their own flower garlands!'
  },

  '80s Retro': {
    icon: '🕹️', sub: 'Neon Lights & Synthwave',
    colors: ['#FF00C8', '#00E5FF', '#FFE000', '#FF6600', '#7700FF'],
    desc: 'Electric 1980s throwback with neon signs, arcade games, cassette tapes, and massive hair!',
    tags: ['Retro', 'Indoor', 'Energetic'],
    gradient: 'linear-gradient(135deg,#FF00C8,#00E5FF)',
    decorations: [
      'Neon signs (PARTY, WOW, etc.)',
      'Retro arcade game corner (Pac-Man, Space Invaders)',
      'Cassette tape & vinyl record wall art',
      'VHS tape centrepieces',
      'Black light reactive decorations',
      'Boom box photo props'
    ],
    food: [
      'Retro diner burgers & fries station',
      'Pizza sliders & hot dogs',
      'Jello shots & soda floats',
      'Pop Rocks candy bar',
      'Fruity cocktails: Electric Sunset, Woo Woo',
      'Cereal bar with 80s classics'
    ],
    music: [
      'Michael Jackson — Thriller',
      'Madonna — Like a Virgin',
      'Prince — Purple Rain',
      "Cyndi Lauper — Girls Just Wanna Have Fun",
      "Depeche Mode — Just Can't Get Enough",
      'A-Ha — Take On Me (80s megamix)'
    ],
    dress: [
      'Shoulder pads & power suits',
      'Leg warmers & leotards',
      'Acid-wash jeans & denim jackets',
      'Scrunchies & teased big hair',
      'Neon colours head to toe',
      'Fingerless gloves & bandanas'
    ],
    activities: [
      '80s music trivia night',
      'Best dressed / biggest hair contest',
      'Dance battle — 80s moves only!',
      'Arcade gaming tournament',
      'DIY cassette tape craft station',
      '80s movie screening (The Breakfast Club)'
    ],
    lighting: [
      'UV black light strips',
      'Neon tube lights in pinks & blues',
      'Disco ball rotating spotlight',
      'Strobe light dance floor',
      'Electric blue & magenta uplights',
      'LED colour-changing panels'
    ],
    tips: 'Set up a "Totally Rad" photo wall with neon letter props and a Polaroid camera for instant retro memories!'
  },

  'Enchanted Forest': {
    icon: '🌿', sub: 'Fairytale & Forest Magic',
    colors: ['#0d2e14', '#2d7a3e', '#8B5CF6', '#C4A35A', '#E8F5E9'],
    desc: 'A mystical woodland fairy tale with hanging lanterns, fairy lights, and enchanting magic.',
    tags: ['Whimsical', 'Evening', 'Magical'],
    gradient: 'linear-gradient(135deg,#2d7a3e,#8B5CF6)',
    decorations: [
      'Fairy lights draped from ceiling like stars',
      'Hanging glass lanterns & mason jars',
      'Live moss & fern centrepieces',
      'Giant mushroom props',
      'Flower petal pathways',
      'Twisted branch archways'
    ],
    food: [
      'Elf cookies & fairy-dust cupcakes',
      'Wild mushroom bruschetta',
      'Forest berry mocktails & infused waters',
      'Honey lavender lemonade',
      'Woodland charcuterie board with herbs',
      'Enchanted candy forest dessert table'
    ],
    music: [
      'Enya — Orinoco Flow',
      'Celtic harp & folk instrumentals',
      'Lord of the Rings soundtrack',
      "Loreena McKennitt — The Mummers Dance",
      'Ambient forest soundscapes',
      'Fairy tale piano medley'
    ],
    dress: [
      'Flower crown with wildflowers',
      'Flowy earth-tone dresses in green & brown',
      'Fairy wings & elf ear accessories',
      'Woodland creature costumes',
      "Midsummer Night's Dream robes",
      'Ivy & leaf hair accessories'
    ],
    activities: [
      'Lantern-making craft workshop',
      'Enchanted forest scavenger hunt',
      'Fairy tale storytelling circle',
      'Crown flower pressing activity',
      'Constellation stargazing (outdoor)',
      'Live acoustic folk music'
    ],
    lighting: [
      'Thousands of warm fairy lights',
      'Firefly LED scattered on tables',
      'Bioluminescent blue accent lights',
      'Soft green forest uplighting',
      'Hanging paper lanterns in amber',
      'Candle-in-jar centrepieces'
    ],
    tips: 'Hang hundreds of glass jars with fairy lights from tree branches or a ceiling frame to create a "starfield" effect!'
  },

  'Great Gatsby': {
    icon: '🥂', sub: 'Roaring 20s Luxury',
    colors: ['#1a1200', '#B8860B', '#FFD700', '#F5F5DC', '#2C2C54'],
    desc: 'Gilded Jazz Age glamour — art deco patterns, jazz bands, pearls, and prohibition-era cocktails.',
    tags: ['Black-tie', '1920s', 'Luxurious'],
    gradient: 'linear-gradient(135deg,#B8860B,#FFD700)',
    decorations: [
      'Gold & black art deco geometric patterns',
      'Feather centrepieces in gold vases',
      'Pearl & diamond string table runners',
      'Great Gatsby marquee letter lights',
      'Gold sequin & satin tablecloths',
      'Vintage champagne tower display'
    ],
    food: [
      'Prohibition-era cocktails: Old Fashioned, Mint Julep',
      'Finger sandwiches & devilled eggs',
      'Oysters & smoked salmon canapés',
      'Caviar & blinis station',
      'Gold-leaf chocolate truffles',
      'Art deco cake with fondant patterns'
    ],
    music: [
      'Ella Fitzgerald — Summertime',
      'Louis Armstrong — What a Wonderful World',
      "Duke Ellington — It Don't Mean a Thing",
      'Big band swing live ensemble',
      '1920s jazz & ragtime playlist',
      'Charleston dance music set'
    ],
    dress: [
      'Flapper dresses with fringe & beading',
      'Pearl necklaces layered 3 strands',
      'Fedora hats & waistcoats for men',
      'Feather boas in black or gold',
      'Mary Jane heels & T-bar pumps',
      'Suspenders & bow ties with braces'
    ],
    activities: [
      'Swing dance & Charleston lesson',
      'Prohibition cocktail mixing class',
      '1920s trivia & quiz night',
      'Best dressed Gatsby award',
      'Silent auction of vintage items',
      'Photo booth with 20s props & frames'
    ],
    lighting: [
      'Art deco gold geometric lamp shades',
      'Warm amber Edison bulb strings',
      'Gold spotlight on centrepieces',
      'Deep navy & gold colour scheme lighting',
      'Roaring 20s marquee sign lighting',
      'Candelabra in gold candle holders'
    ],
    tips: 'Hire a jazz quartet to play as guests arrive — the live sound of a saxophone immediately sets the Gatsby mood!'
  }
};

const THEME_KEYS = Object.keys(THEMES);
