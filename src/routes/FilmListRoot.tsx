import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IFilm } from 'swapi-ts'
import { Films } from 'swapi-ts'

import Loading from '../components/Loading'
import SelectSort, { type SortOption } from '../components/SelectSort'
import { locations } from '../router/locations'
import { buildPath, extractIdFromUrl } from '../utils/navigation'

/**
 * FilmListRoot component displays a list of Star Wars films with sorting options.
 *
 * - Fetches film data from the API on mount.
 * - Allows sorting by episode, release date, or title.
 * - Shows a loading indicator while data is being fetched.
 * - Renders each film as a clickable card, navigating to the film's detail page.
 *
 * @component
 * @returns {JSX.Element} The rendered film list UI.
 */
const FilmListRoot = () => {
  const [films, setFilms] = useState<IFilm[]>()
  const [sortBy, setSortBy] = useState<SortOption>('episode')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Films.getPage()
      .then((page) => setFilms(page.results))
      .catch((err) => {
        console.error('Error loading films:', err)
      })
      .finally(() => setLoading(false))
  }, [])

  const sortedFilms =
    films && films.length > 0
      ? [...films].sort((a, b) => {
          switch (sortBy) {
            case 'release':
              return (
                new Date(a.release_date).getTime() -
                new Date(b.release_date).getTime()
              )
            case 'episode':
              return parseInt(a.episode_id) - parseInt(b.episode_id)
            case 'title':
              return a.title.localeCompare(b.title)
            default:
              return 0
          }
        })
      : []

  if (loading) return <Loading />

  return (
    <Box sx={{ position: 'relative', p: 2 }}>
      <SelectSort value={sortBy} onChange={setSortBy} />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {sortedFilms.map((film) => (
          <Grid key={film.episode_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              onClick={() => {
                const path = buildPath(locations.filmDetail, {
                  id: extractIdFromUrl(film.url),
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
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Directed by {film.director}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Released on{' '}
                  {new Date(film.release_date).toLocaleDateString('en-GB')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FilmListRoot
