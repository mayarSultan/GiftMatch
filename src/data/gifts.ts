import rawGifts from './gifts.json' with { type: 'json' }
import type { Gift } from '../types/gift.js'

export const giftCatalog: Gift[] = rawGifts as Gift[]
