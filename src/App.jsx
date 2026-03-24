// src/App.jsx
import { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { useTheme } from '@hooks/useTheme'
import { useAuth } from '@hooks/useAuth'
import { routes } from './routes'
import Loader from '@components/common/Loader'
import Splash from '@pages/Splash'

const App = () => {
  const location = useLocation()
  const { theme } = useTheme()
  const { initAuth, isLoading } = useAuth()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    // Update document class for theme
    if (theme) {
      document.documentElement.className = theme
    }
  }, [theme])

  if (isLoading) {
    return <Splash />
  }

  return (
    <div className={`app ${theme} min-h-screen bg-dark-950 text-white`}>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <Loader size="lg" />
            </div>
          }
        >
          <Routes location={location} key={location.pathname}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              >
                {route.children?.map((child, childIndex) => (
                  <Route
                    key={childIndex}
                    path={child.path}
                    element={child.element}
                    index={child.index}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  )
}

export default App