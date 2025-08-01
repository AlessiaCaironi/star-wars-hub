import {
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IFilm } from 'swapi-ts'
import { Films } from 'swapi-ts'

import { locations } from '../router/locations'
import { buildPath } from '../utils/navigation'

const FilmListRoot = () => {
  const [films, setFilms] = useState<IFilm[]>()
  const navigate = useNavigate()

  useEffect(() => {
    Films.getPage().then((page) => {
      const sortedFilms = page.results.sort(
        (a: IFilm, b: IFilm) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      )
      setFilms(sortedFilms)
    })
  }, [])

  if (!films) return <CircularProgress />

  return (
    <Grid container spacing={3}>
      {films.map((film) => (
        <Grid key={film.episode_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card
            onClick={() => {
              const path = buildPath(locations.filmDetail, {
                filmId: film.episode_id.toString(),
              })
              navigate(path)
            }}
            sx={{ cursor: 'pointer' }}
          >
            <CardMedia
              image={`/covers/${film.episode_id}.webp`}
              component="img"
              alt={film.title}
            />
            <CardHeader title={film.title} />
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default FilmListRoot
