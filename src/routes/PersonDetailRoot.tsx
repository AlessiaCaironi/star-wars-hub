import { Box, Grid, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  type IFilm,
  type IPlanet,
  type ISpecie,
  type IStarship,
  type IVehicle,
  People,
  ResourcesType,
} from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import UnorderedList from '../components/UnorderedList'

/**
 * PersonDetailRoot component displays detailed information about a specific Star Wars character.
 *
 * It fetches the character data based on the `id` route parameter, including related resources
 * such as homeworld, species, films, vehicles, and starships. The component shows a loading
 * indicator while data is being fetched, and renders collapsible sections for general info
 * and each related resource.
 *
 * @component
 * @returns {JSX.Element} The rendered person detail view.
 */
const PersonDetailRoot = () => {
  const { id } = useParams<{ id: string }>()

  const query = useQuery({
    queryKey: ['person', id],
    queryFn: async () => {
      const res = await People.find((p) => p.url.endsWith(`/${id}/`))
      await res.populateAll('films')
      await res.populateAll('vehicles')
      await res.populateAll('starships')
      await res.populateAll('homeworld')
      await res.populateAll('species')
      return res.resources[0].value
    },
  })
  const { data: person, isLoading } = query

  if (isLoading || !person) return <Loading />

  return (
    <Box sx={{ position: 'relative', p: 2 }}>
      <PageHeader title={person.name} resourceType={ResourcesType.People} />

      <Collapse
        title="General Info"
        content={
          <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack spacing={1}>
                <InfoRow label="Gender" value={person.gender} />
                <InfoRow label="Birth Year" value={person.birth_year} />
                <InfoRow label="Height" value={`${person.height} cm`} />
                <InfoRow label="Mass" value={`${person.mass} kg`} />
                <InfoRow label="Hair Color" value={person.hair_color} />
                <InfoRow label="Eye Color" value={person.eye_color} />
                <InfoRow label="Skin Color" value={person.skin_color} />
              </Stack>
            </Grid>
          </Grid>
        }
      />

      <Collapse
        title="Homeworld"
        content={
          person.homeworld && typeof person.homeworld !== 'string' ? (
            <UnorderedList
              items={[person.homeworld as IPlanet]}
              resourceType={ResourcesType.Planets}
            />
          ) : null
        }
      />

      <Collapse
        title="Species"
        content={
          <UnorderedList
            items={person.species as ISpecie[]}
            resourceType={ResourcesType.Species}
          />
        }
      />

      <Collapse
        title="Films"
        content={
          <UnorderedList
            items={person.films as IFilm[]}
            resourceType={ResourcesType.Films}
          />
        }
      />

      <Collapse
        title="Piloted Vehicles"
        content={
          <UnorderedList
            items={person.vehicles as IVehicle[]}
            resourceType={ResourcesType.Vehicles}
          />
        }
      />

      <Collapse
        title="Piloted Starships"
        content={
          <UnorderedList
            items={person.starships as IStarship[]}
            resourceType={ResourcesType.Starships}
          />
        }
      />
    </Box>
  )
}

export default PersonDetailRoot
