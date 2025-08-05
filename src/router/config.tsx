import type { ComponentType } from 'react'

import FilmDetailRoot from '../routes/FilmDetailRoot'
import FilmListRoot from '../routes/FilmListRoot'
import NotFound404Root from '../routes/NotFound404Root'
import PersonDetailRoot from '../routes/PersonDetailRoot'
import PlanetDetailRoot from '../routes/PlanetDetailRoot'
import SpeciesDetailRoot from '../routes/SpeciesDetailRoot'
import StarshipDetailRoot from '../routes/StarshipDetailRoot'
import VehicleDetailRoot from '../routes/VehicleDetailRoot'
import { locations } from './locations'

/**
 * Describes a route in the app.
 */
export interface Route {
  /** The URL path for the route */
  path: string
  /** The component to render for the route */
  component: ComponentType<any>
  /** Optional redirect path */
  redirect?: string
}

/**
 * All application routes.
 */
export const routes: Route[] = [
  {
    path: locations.home,
    redirect: locations.films,
    component: FilmListRoot,
  },
  {
    path: locations.films,
    component: FilmListRoot,
  },
  {
    path: locations.filmDetail,
    component: FilmDetailRoot,
  },
  {
    path: locations.personDetail,
    component: PersonDetailRoot,
  },
  {
    path: locations.planetDetail,
    component: PlanetDetailRoot,
  },
  {
    path: locations.speciesDetail,
    component: SpeciesDetailRoot,
  },
  {
    path: locations.starshipDetail,
    component: StarshipDetailRoot,
  },
  {
    path: locations.vehicleDetail,
    component: VehicleDetailRoot,
  },
  {
    path: locations.notFound,
    component: NotFound404Root,
  },
]
