import { CircularProgress, Stack, Typography } from '@mui/material'
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

  const toUnorderedList = (
    items: IPeople[] | IPlanet[] | ISpecie[] | IStarship[] | IVehicle[],
  ) => (
    <ul>
      {items.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  )

  if (loading || !film) return <CircularProgress />

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {film.title}
      </Typography>

      <Collapse
        title="General Info"
        content={
          <Stack spacing={1} sx={{ mb: 4 }}>
            <InfoRow
              label="Episode"
              value={toRoman(parseInt(film.episode_id))}
            />
            <InfoRow label="Director" value={film.director} />
            <InfoRow label="Producer" value={film.producer} />
            <InfoRow
              label="Release date"
              value={new Date(film.release_date).toLocaleDateString('en-GB')}
            />
            <InfoRow label="Opening Crawl" value={film.opening_crawl} />
          </Stack>
        }
      />

      <Collapse
        title="People"
        content={toUnorderedList(film.characters as IPeople[])}
      />

      <Collapse
        title="Planets"
        content={toUnorderedList(film.planets as IPlanet[])}
      />

      <Collapse
        title="Species"
        content={toUnorderedList(film.species as ISpecie[])}
      />

      <Collapse
        title="Starships"
        content={toUnorderedList(film.starships as IStarship[])}
      />

      <Collapse
        title="Vehicles"
        content={toUnorderedList(film.vehicles as IVehicle[])}
      />
    </>
  )
}

export default FilmDetailRoot
