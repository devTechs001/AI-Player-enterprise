// src/App.jsx
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useTheme } from '@hooks/useTheme'
import { useAuth } from '@hooks/useAuth'
import { routes } from './routes'
import Splash from '@pages/Splash'

const App = () => {
  const { theme } = useTheme()
  const { initAuth, isLoading, isInitialized } = useAuth()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  useEffect(() => {
    // Update document class for theme
    if (theme) {
      document.documentElement.className = theme
    }
  }, [theme])

  // Show splash during initialization
  if (!isInitialized || isLoading) {
    return <Splash />
  }

  return (
    <div className={`app ${theme} min-h-screen bg-dark-950 text-white`}>
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
    </div>
  )
}

export default App