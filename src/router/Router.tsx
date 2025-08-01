import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom'

import type { Route as AppRoute } from './config'

interface RouterProps {
  routes: AppRoute[]
}

const Router = ({ routes }: RouterProps) => (
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
)

export default Router
