import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom'

import type { Route as AppRoute } from './config'

interface RouterProps {
  routes: AppRoute[]
}

import { BrowserRouter } from 'react-router-dom'

const Router = ({ routes }: RouterProps) => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        {routes.map((route) => {
          const { path, component: Component, redirect } = route

          if (redirect) {
            return (
              <Route
                key={path}
                path={path}
                element={<Navigate to={redirect} replace />}
              />
            )
          }

          return <Route key={path} path={path} element={<Component />} />
        })}
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default Router
