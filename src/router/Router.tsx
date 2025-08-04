import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom'

import type { Route as AppRoute } from './config'

interface RouterProps {
  routes: AppRoute[]
}

/**
 * Custom Router component that maps app routes to React Router <Route> elements.
 * Handles both direct component rendering and route redirects.
 *
 * @param routes - Array of application routes to be mapped.
 *
 * @component
 * @returns A custom Router component that maps app routes to React Router <Route> elements.
 */
const Router = ({ routes }: RouterProps) => (
  <RouterRoutes>
    {routes.map((route) => {
      const { path, component: Component, redirect } = route

      // If the route has a redirect, render a <Navigate /> instead
      if (redirect) {
        return (
          <Route
            key={path}
            path={path}
            element={<Navigate to={redirect} replace />}
          />
        )
      }

      // Otherwise render the associated component
      return <Route key={path} path={path} element={<Component />} />
    })}
  </RouterRoutes>
)

export default Router
