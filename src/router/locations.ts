/**
 * App route definitions.
 */
export const locations = {
  home: '/',
  films: '/films',
  filmDetail: '/films/:id',
  people: '/people',
  personDetail: '/people/:id',
  planets: '/planets',
  planetDetail: '/planets/:id',
  species: '/species',
  speciesDetail: '/species/:id',
  starships: '/starships',
  starshipDetail: '/starships/:id',
  vehicles: '/vehicles',
  vehicleDetail: '/vehicles/:id',
  notFound: '*',
} as const
