// Run with: UNSPLASH_ACCESS_KEY=your_key node scripts/generate-unsplash-images.cjs
//
// One-time script — fetches a real, curated photo per gift from Unsplash's
// free API and bakes the URL into gifts.json. This only runs locally on
// your machine; the resulting image URLs are static and ship to
// production as-is. No API key is ever committed or exposed to the browser.

const fs = require('fs')
const path = require('path')
const https = require('https')

const accessKey = process.env.UNSPLASH_ACCESS_KEY
if (!accessKey) {
  console.error('Set UNSPLASH_ACCESS_KEY before running this script.')
  process.exit(1)
}

const filePath = path.join(__dirname, '..', 'src', 'data', 'gifts.json')
const gifts = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const searchTerms = {
  'photo-book': 'photo album',
  'wireless-earbuds': 'wireless earbuds',
  'candle-set': 'candles',
  'board-game-bundle': 'board game',
  'espresso-machine': 'espresso machine',
  'stationery-kit': 'stationery set',
  'leather-wallet': 'leather wallet',
  'lego-architecture': 'lego building',
  'spa-basket': 'spa gift basket',
  'funny-socks': 'colorful socks',
  'jewelry-necklace': 'gold necklace',
  'succulent-trio': 'succulent plant pot',
  'bluetooth-speaker': 'bluetooth speaker',
  'cookbook-apron': 'cookbook kitchen',
  'jigsaw-puzzle': 'jigsaw puzzle',
  'designer-watch': 'wristwatch',
  'tasting-kit': 'wine tasting',
  'kids-art-set': 'kids art supplies',
  'knit-blanket': 'knit blanket',
  'skincare-set': 'skincare products',
  'yoga-set': 'yoga mat',
  'camping-hammock': 'camping hammock',
  'chocolate-box': 'chocolate box',
  'wine-subscription': 'wine bottles',
  'building-blocks': 'building blocks toy',
  'rc-car': 'remote control car',
  'fountain-pen': 'fountain pen',
  'desk-terrarium': 'terrarium plant glass',
  'vr-headset': 'vr headset',
  smartwatch: 'smartwatch',
  'star-map': 'night sky stars',
  'cooking-class': 'cooking class kitchen',
  'spa-retreat': 'spa resort',
}

function searchUnsplash(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=squarish`
    https
      .get(url, { headers: { Authorization: `Client-ID ${accessKey}` } }, (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (error) {
            reject(error)
          }
        })
      })
      .on('error', reject)
  })
}

async function run() {
  let updated = 0

  for (const gift of gifts) {
    const query = searchTerms[gift.id]
    if (!query) {
      console.warn('No search term mapped for id:', gift.id)
      continue
    }

    const result = await searchUnsplash(query)
    const photo = result?.results?.[0]

    if (!photo) {
      console.warn(
        `No Unsplash result for "${query}" (${gift.id}) — leaving image unchanged.`,
      )
      continue
    }

    gift.image = `${photo.urls.raw}&w=480&h=480&fit=crop`
    updated++
    console.log(`${gift.id} -> ${query} (photo by ${photo.user.name})`)

    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  fs.writeFileSync(filePath, JSON.stringify(gifts, null, 2) + '\n')
  console.log(`\nUpdated ${updated} of ${gifts.length} gift images.`)
}

run()
