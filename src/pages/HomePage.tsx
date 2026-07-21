import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { RecentSearches } from '@/components/RecentSearches'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

export function HomePage() {
  useDocumentMeta(
    'GiftMatch',
    'Answer five quick questions and GiftMatch matches you with gift ideas worth giving.',
  )

  return (
    <>
      <Hero />
      <Features />
      <RecentSearches />
    </>
  )
}
