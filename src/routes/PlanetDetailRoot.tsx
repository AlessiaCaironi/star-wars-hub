import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  type IFilm,
  type IPeople,
  type IPlanet,
  Planets,
  ResourcesType,
} from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import Loading from '../components/Loading'
import UnorderedList from '../components/UnorderedList'

/**
 * PlanetDetailRoot component displays detailed information about a specific planet.
 *
 * It fetches planet data based on the `id` parameter from the route, including related resources
 * such as its residents and films. The component shows a loading indicator while data is being fetched
 * and renders collapsible sections for general info and each related resource.
 *
 * @component
 * @returns {JSX.Element} The rendered planet detail view.
 */
const PlanetDetailRoot = () => {
  const { id } = useParams<{ id: string }>()
  const [planet, setPlanet] = useState<IPlanet>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    Planets.find((p) => p.url.endsWith(`/${id}/`))
      .then(async (res) => {
        const planetResource = res.resources[0]
        if (!planetResource) return

        await planetResource.populate('residents')
        await planetResource.populate('films')

        setPlanet(planetResource.value)
      })
      .catch((err) => {
        console.error('Error loading planet:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading || !planet) return <Loading />

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {planet.name}
      </Typography>

      <Collapse
        title="General Info"
        content={
          <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack spacing={1}>
                <InfoRow label="Climate" value={planet.climate} />
                <InfoRow label="Terrain" value={planet.terrain} />
                <InfoRow label="Population" value={planet.population} />
                <InfoRow label="Diameter" value={`${planet.diameter} km`} />
                <InfoRow label="Gravity" value={planet.gravity} />
                <InfoRow
                  label="Rotation Period"
                  value={`${planet.rotation_period} h`}
                />
                <InfoRow
                  label="Orbital Period"
                  value={`${planet.orbital_period} days`}
                />
                <InfoRow
                  label="Surface Water"
                  value={`${planet.surface_water}%`}
                />
              </Stack>
            </Grid>
          </Grid>
        }
      />

      <Collapse
        title="Residents"
        content={
          <UnorderedList
            items={planet.residents as IPeople[]}
            resourceType={ResourcesType.People}
          />
        }
      />

      <Collapse
        title="Films"
        content={
          <UnorderedList
            items={planet.films as IFilm[]}
            resourceType={ResourcesType.Films}
          />
        }
      />
    </>
  )
}

export default PlanetDetailRoot
