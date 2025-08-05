import { Box, Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  type IFilm,
  type IPeople,
  type IPlanet,
  type ISpecie,
  type IStarship,
  type IVehicle,
  ResourcesType,
} from 'swapi-ts'
import { Films } from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import UnorderedList from '../components/UnorderedList'
import { toRoman } from '../utils/toRoman'

/**
 * FilmDetailRoot component displays detailed information about a specific Star Wars film.
 *
 * It fetches the film data based on the `id` route parameter, including related resources
 * such as characters, planets, starships, vehicles, and species. The component shows a loading
 * indicator while data is being fetched, and renders collapsible sections for general info and
 * each related resource.
 *
 * @component
 * @returns {JSX.Element} The rendered film detail view.
 */
const FilmDetailRoot = () => {
  const { id } = useParams<{ id: string }>()
  const [film, setFilm] = useState<IFilm>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    Films.find((f) => f.url.endsWith(`/${id}/`))
      .then(async (res) => {
        const filmResource = res.resources[0]
        if (!filmResource) return

        await filmResource.populate('characters')
        await filmResource.populate('planets')
        await filmResource.populate('starships')
        await filmResource.populate('vehicles')
        await filmResource.populate('species')

        setFilm(filmResource.value)
      })
      .catch((err) => {
        console.error('Error loading film:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading || !film) return <Loading />

  return (
    <Box sx={{ position: 'relative', p: 2 }}>
      <PageHeader title={film.title} resourceType={ResourcesType.Films} />

      <Collapse
        title="General Info"
        content={
          <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack spacing={1}>
                <InfoRow
                  label="Episode"
                  value={toRoman(parseInt(film.episode_id))}
                />
                <InfoRow label="Director" value={film.director} />
                <InfoRow label="Producer" value={film.producer} />
                <InfoRow
                  label="Release date"
                  value={new Date(film.release_date).toLocaleDateString(
                    'en-GB',
                  )}
                />
                <InfoRow label="Opening Crawl" value={film.opening_crawl} />
              </Stack>
            </Grid>

            <Grid
              size={{ sm: 4 }}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'block',
                },
              }}
            >
              <img
                src={`/covers/${film.episode_id}.webp`}
                alt={film.title}
                style={{
                  width: '100%',
                  borderRadius: 8,
                  objectFit: 'cover',
                }}
              />
            </Grid>
          </Grid>
        }
      />

      <Collapse
        title="Characters"
        content={
          <UnorderedList
            items={film.characters as IPeople[]}
            resourceType={ResourcesType.People}
          />
        }
      />

      <Collapse
        title="Planets"
        content={
          <UnorderedList
            items={film.planets as IPlanet[]}
            resourceType={ResourcesType.Planets}
          />
        }
      />

      <Collapse
        title="Species"
        content={
          <UnorderedList
            items={film.species as ISpecie[]}
            resourceType={ResourcesType.Species}
          />
        }
      />

      <Collapse
        title="Starships"
        content={
          <UnorderedList
            items={film.starships as IStarship[]}
            resourceType={ResourcesType.Starships}
          />
        }
      />

      <Collapse
        title="Vehicles"
        content={
          <UnorderedList
            items={film.vehicles as IVehicle[]}
            resourceType={ResourcesType.Vehicles}
          />
        }
      />
    </Box>
  )
}

export default FilmDetailRoot
