import { useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useTheme } from '@hooks/useTheme'
import { useAuth } from '@hooks/useAuth'
import { RefreshProvider } from '@context/RefreshContext'
import { routes } from './routes'
import Splash from '@pages/Splash'
import Loader from '@components/common/Loader'

const App = () => {
  const { theme } = useTheme()
  const { initAuth, isLoading, isInitialized } = useAuth()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    if (theme) {
      document.documentElement.className = theme
    }
  }, [theme])

  if (!isInitialized || isLoading) {
    return <Splash />
  }

  return (
    <div className={`app ${theme} min-h-screen bg-dark-950 text-white`}>
      <RefreshProvider>
      <Suspense fallback={<Loader fullPage />}>
        <Routes>
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
      </RefreshProvider>
    </div>
  )
}

export default App