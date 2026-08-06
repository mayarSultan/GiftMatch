const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'src', 'data', 'gifts.json')
const gifts = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const keywords = {
  'photo-book': 'photobook',
  'wireless-earbuds': 'earbuds',
  'candle-set': 'candle',
  'board-game-bundle': 'boardgame',
  'espresso-machine': 'espresso',
  'stationery-kit': 'stationery',
  'leather-wallet': 'wallet',
  'lego-architecture': 'lego',
  'spa-basket': 'spa',
  'funny-socks': 'socks',
  'jewelry-necklace': 'necklace',
  'succulent-trio': 'succulent',
  'bluetooth-speaker': 'speaker',
  'cookbook-apron': 'cookbook',
  'jigsaw-puzzle': 'jigsawpuzzle',
  'designer-watch': 'wristwatch',
  'tasting-kit': 'winetasting',
  'kids-art-set': 'crayons',
  'knit-blanket': 'blanket',
  'skincare-set': 'skincare',
  'yoga-set': 'yogamat',
  'camping-hammock': 'hammock',
  'chocolate-box': 'chocolate',
  'wine-subscription': 'winebottle',
  'building-blocks': 'buildingblocks',
  'rc-car': 'toycar',
  'fountain-pen': 'fountainpen',
  'desk-terrarium': 'terrarium',
  'vr-headset': 'vrheadset',
  smartwatch: 'smartwatch',
  'star-map': 'constellation',
  'cooking-class': 'cookingclass',
  'spa-retreat': 'resort',
}

let updated = 0
let lock = 1
for (const gift of gifts) {
  const keyword = keywords[gift.id]
  if (!keyword) {
    console.warn('No keyword mapped for id:', gift.id)
    continue
  }
  gift.image = `https://loremflickr.com/480/480/${keyword}?lock=${lock}`
  lock++
  updated++
}

fs.writeFileSync(filePath, JSON.stringify(gifts, null, 2) + '\n')
console.log(`Updated ${updated} of ${gifts.length} gift images.`)
