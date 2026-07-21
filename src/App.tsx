import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { FocusedLayout } from '@/layouts/FocusedLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { QuizPage } from '@/pages/QuizPage'
import { ResultsPage } from '@/pages/ResultsPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { useSyncThemeClass } from '@/hooks/useSyncThemeClass'
import { routes } from '@/utils/routes'

export function App() {
  useSyncThemeClass()

  return (
    <ErrorBoundary>
      <BrowserRouter>
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
      </BrowserRouter>
    </ErrorBoundary>
  )
}
