import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from 'swapi-ts'
import { Films } from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import UnorderedList from '../components/UnorderedList'
import { toRoman } from '../utils/toRoman'

const FilmDetailRoot = () => {
  const { filmId } = useParams<{ filmId: string }>()
  const [film, setFilm] = useState<IFilm>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!filmId) return

    setLoading(true)

    Films.find((f) => f.episode_id.toString() === filmId)
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
  }, [filmId])

  if (loading || !film) return <CircularProgress />

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {film.title}
      </Typography>

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
        title="People"
        content={<UnorderedList items={film.characters as IPeople[]} />}
      />

      <Collapse
        title="Planets"
        content={<UnorderedList items={film.planets as IPlanet[]} />}
      />

      <Collapse
        title="Species"
        content={<UnorderedList items={film.species as ISpecie[]} />}
      />

      <Collapse
        title="Starships"
        content={<UnorderedList items={film.starships as IStarship[]} />}
      />

      <Collapse
        title="Vehicles"
        content={<UnorderedList items={film.vehicles as IVehicle[]} />}
      />
    </>
  )
}

export default FilmDetailRoot
