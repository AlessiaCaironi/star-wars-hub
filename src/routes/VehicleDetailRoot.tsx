import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  type IFilm,
  type IPeople,
  type IVehicle,
  ResourcesType,
  Vehicles,
} from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import Loading from '../components/Loading'
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
  const [vehicle, setVehicle] = useState<IVehicle>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    Vehicles.find((v) => v.url.endsWith(`/${id}/`))
      .then(async (res) => {
        const vehicleResource = res.resources[0]
        if (!vehicleResource) return

        await vehicleResource.populate('pilots')
        await vehicleResource.populate('films')

        setVehicle(vehicleResource.value)
      })
      .catch((err) => {
        console.error('Error loading vehicle:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading || !vehicle) return <Loading />

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {vehicle.name}
      </Typography>

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
    </>
  )
}

export default VehicleDetailRoot
