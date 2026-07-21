import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SkipLink } from '@/components/shared/SkipLink'
import { PageTransition } from '@/components/shared/PageTransition'

export function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
    </div>
  )
}
