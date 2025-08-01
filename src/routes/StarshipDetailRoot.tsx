import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  type IFilm,
  type IPeople,
  type IStarship,
  ResourcesType,
  Starships,
} from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import UnorderedList from '../components/UnorderedList'

const StarshipDetailRoot = () => {
  const { id } = useParams<{ id: string }>()
  const [starship, setStarship] = useState<IStarship>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    setLoading(true)

    Starships.find((s) => s.url.endsWith(`/${id}/`))
      .then(async (res) => {
        const starshipResource = res.resources[0]
        if (!starshipResource) return

        await starshipResource.populate('pilots')
        await starshipResource.populate('films')

        setStarship(starshipResource.value)
      })
      .catch((err) => {
        console.error('Error loading starship:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading || !starship) return <CircularProgress />

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {starship.name}
      </Typography>

      <Collapse
        title="General Info"
        content={
          <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack spacing={1}>
                <InfoRow label="Model" value={starship.model} />
                <InfoRow label="Manufacturer" value={starship.manufacturer} />
                <InfoRow
                  label="Cost"
                  value={`${starship.cost_in_credits} credits`}
                />
                <InfoRow label="Length" value={`${starship.length} m`} />
                <InfoRow label="Crew" value={starship.crew} />
                <InfoRow label="Passengers" value={starship.passengers} />
                <InfoRow
                  label="Starship Class"
                  value={starship.starship_class}
                />
                <InfoRow
                  label="Hyperdrive Rating"
                  value={starship.hyperdrive_rating}
                />
              </Stack>
            </Grid>
          </Grid>
        }
      />

      <Collapse
        title="Pilots"
        content={
          <UnorderedList
            items={starship.pilots as IPeople[]}
            resourceType={ResourcesType.People}
          />
        }
      />

      <Collapse
        title="Films"
        content={
          <UnorderedList
            items={starship.films as IFilm[]}
            resourceType={ResourcesType.Films}
          />
        }
      />
    </>
  )
}

export default StarshipDetailRoot
