import { ResourcesType } from 'swapi-ts'

import { locations } from '../router/locations'

/**
 * Builds a URL path by replacing parameter placeholders with actual values.
 *
 * @param path - The URL path template containing placeholders (e.g., "/films/:id").
 * @param params - An object mapping parameter names to their values.
 * @returns The URL path with placeholders replaced by encoded parameter values.
 *
 */
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

/**
 * Returns the navigation location string based on the provided resource type and detail flag.
 *
 * @param resourceType - The type of resource to determine the location for.
 * @param details - If true, returns the detail location for the resource; otherwise, returns the list location.
 * @returns The corresponding location string for the given resource type and detail flag.
 */
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

/**
 * Extracts the last segment (ID) from a given URL string.
 *
 * @param url - The URL string to extract the ID from.
 * @returns The extracted ID as a string.
 */
export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}
