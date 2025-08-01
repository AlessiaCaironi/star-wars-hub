import { ResourcesType } from 'swapi-ts'

import { locations } from '../router/locations'

export const buildPath = (
  path: string,
  params: Record<string, string | number>,
): string => {
  return Object.entries(params).reduce(
    (acc, [key, value]) =>
      acc.replace(`:${key}`, encodeURIComponent(String(value))),
    path,
  )
}

export const getLocation = (
  resourceType: ResourcesType,
  details: boolean,
): string => {
  let location
  switch (resourceType) {
    case ResourcesType.Films:
      location = details ? locations.filmDetail : locations.films
      break
    case ResourcesType.People:
      location = details ? locations.personDetail : locations.people
      break
    case ResourcesType.Planets:
      location = details ? locations.planetDetail : locations.planets
      break
    case ResourcesType.Species:
      location = details ? locations.speciesDetail : locations.species
      break
    case ResourcesType.Starships:
      location = details ? locations.starshipDetail : locations.starships
      break
    case ResourcesType.Vehicles:
      location = details ? locations.vehicleDetail : locations.vehicles
      break
    default:
      location = locations.notFound
      break
  }
  return location
}

export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}
