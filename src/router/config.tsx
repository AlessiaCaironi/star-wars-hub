import type { ComponentType } from 'react'

import FilmDetailRoot from '../routes/FilmDetailRoot'
import FilmListRoot from '../routes/FilmListRoot'
import NotFound404Root from '../routes/NotFound404Root'
import PersonDetailRoot from '../routes/PersonDetailRoot'
import PersonListRoot from '../routes/PersonListRoot'
import PlanetDetailRoot from '../routes/PlanetDetailRoot'
import PlanetListRoot from '../routes/PlanetListRoot'
import SpeciesDetailRoot from '../routes/SpeciesDetailRoot'
import SpeciesListRoot from '../routes/SpeciesListRoot'
import StarshipDetailRoot from '../routes/StarshipDetailRoot'
import StarshipListRoot from '../routes/StarshipListRoot'
import VehicleDetailRoot from '../routes/VehicleDetailRoot'
import VehiclesListRoot from '../routes/VehicleListRoot'
import { locations } from './locations'

export interface Route {
  path: string
  component: ComponentType<any>
  redirect?: string
}

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
    path: locations.people,
    component: PersonListRoot,
  },
  {
    path: locations.personDetail,
    component: PersonDetailRoot,
  },
  {
    path: locations.planets,
    component: PlanetListRoot,
  },
  {
    path: locations.planetDetail,
    component: PlanetDetailRoot,
  },
  {
    path: locations.species,
    component: SpeciesListRoot,
  },
  {
    path: locations.speciesDetail,
    component: SpeciesDetailRoot,
  },
  {
    path: locations.starships,
    component: StarshipListRoot,
  },
  {
    path: locations.starshipDetail,
    component: StarshipDetailRoot,
  },
  {
    path: locations.vehicles,
    component: VehiclesListRoot,
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
