import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { FocusedLayout } from '@/layouts/FocusedLayout'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { RouteLoader } from '@/components/shared/RouteLoader'
import { useSyncThemeClass } from '@/hooks/useSyncThemeClass'
import { routes } from '@/utils/routes'

// Route-level code splitting: each page ships as its own chunk and is
// only fetched when the person actually navigates there.
const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const QuizPage = lazy(() =>
  import('@/pages/QuizPage').then((m) => ({ default: m.QuizPage })),
)
const ResultsPage = lazy(() =>
  import('@/pages/ResultsPage').then((m) => ({ default: m.ResultsPage })),
)
const FavoritesPage = lazy(() =>
  import('@/pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

export function App() {
  useSyncThemeClass()

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route element={<MarketingLayout />}>
              <Route path={routes.home} element={<HomePage />} />
              <Route path={routes.favorites} element={<FavoritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route element={<FocusedLayout />}>
              <Route path={routes.quiz} element={<QuizPage />} />
              <Route path={routes.results} element={<ResultsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
