import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { QuizPage } from '@/pages/QuizPage'
import { ResultsPage } from '@/pages/ResultsPage'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { routes } from '@/utils/routes'

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path={routes.home} element={<HomePage />} />
            <Route path={routes.quiz} element={<QuizPage />} />
            <Route path={routes.results} element={<ResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
