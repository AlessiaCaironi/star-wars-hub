import { Box, Grid, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { type IFilm, type IPeople, ResourcesType, Vehicles } from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import Loading from '../components/Loading'
import PageHeader from '../components/PageHeader'
import UnorderedList from '../components/UnorderedList'

/**
 * VehicleDetailRoot component displays detailed information about a specific Star Wars vehicle.
 * It fetches the vehicle data based on the `id` parameter from the route, including related
 * pilots and films. The component shows a loading indicator while data is being fetched,
 * and renders collapsible sections for general info and related resources.
 *
 * @returns {JSX.Element} The rendered vehicle detail view.
 */
const VehicleDetailRoot = () => {
  const { id } = useParams<{ id: string }>()

  const query = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const res = await Vehicles.find((v) => v.url.endsWith(`/${id}/`))
      await res.populateAll('pilots')
      await res.populateAll('films')
      return res.resources[0].value
    },
  })
  const { data: vehicle, isLoading } = query

  if (isLoading || !vehicle) return <Loading />

  return (
    <Box sx={{ position: 'relative', p: 2 }}>
      <PageHeader title={vehicle.name} resourceType={ResourcesType.Vehicles} />

      <Collapse
        title="General Info"
        content={
          <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack spacing={1}>
                <InfoRow label="Model" value={vehicle.model} />
                <InfoRow label="Manufacturer" value={vehicle.manufacturer} />
                <InfoRow
                  label="Cost"
                  value={`${vehicle.cost_in_credits} credits`}
                />
                <InfoRow label="Length" value={`${vehicle.length} m`} />
                <InfoRow label="Crew" value={vehicle.crew} />
                <InfoRow label="Passengers" value={vehicle.passengers} />
                <InfoRow label="Vehicle Class" value={vehicle.vehicle_class} />
              </Stack>
            </Grid>
          </Grid>
        }
      />

      <Collapse
        title="Pilots"
        content={
          <UnorderedList
            items={vehicle.pilots as IPeople[]}
            resourceType={ResourcesType.People}
          />
        }
      />

      <Collapse
        title="Films"
        content={
          <UnorderedList
            items={vehicle.films as IFilm[]}
            resourceType={ResourcesType.Films}
          />
        }
      />
    </Box>
  )
}

export default VehicleDetailRoot
