import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  type IFilm,
  type IPeople,
  type ISpecie,
  ResourcesType,
  Species,
} from 'swapi-ts'

import Collapse from '../components/Collapse'
import InfoRow from '../components/InfoRow'
import Loading from '../components/Loading'
import UnorderedList from '../components/UnorderedList'

/**
 * SpeciesDetailRoot component displays detailed information about a specific Star Wars species.
 *
 * It fetches the species data based on the `id` route parameter, including related resources
 * such as people and films. The component shows a loading indicator while data is being fetched,
 * and renders collapsible sections for general info and related resources.
 *
 * @component
 * @returns {JSX.Element} The rendered species detail view, including general info, related people, and films.
 */
const SpeciesDetailRoot = () => {
  const { id } = useParams<{ id: string }>()
  const [species, setSpecies] = useState<ISpecie>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    Species.find((s) => s.url.endsWith(`/${id}/`))
      .then(async (res) => {
        const speciesResource = res.resources[0]
        if (!speciesResource) return

        await speciesResource.populate('people')
        await speciesResource.populate('films')

        setSpecies(speciesResource.value)
      })
      .catch((err) => {
        console.error('Error loading species:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading || !species) return <Loading />

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {species.name}
      </Typography>

      <Collapse
        title="General Info"
        content={
          <Grid container spacing={2} alignItems="flex-start" sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack spacing={1}>
                <InfoRow
                  label="Classification"
                  value={species.classification}
                />
                <InfoRow label="Designation" value={species.designation} />
                <InfoRow
                  label="Average Height"
                  value={`${species.average_height} cm`}
                />
                <InfoRow label="Skin Colors" value={species.skin_colors} />
                <InfoRow label="Hair Colors" value={species.hair_colors} />
                <InfoRow label="Eye Colors" value={species.eye_colors} />
                <InfoRow
                  label="Average Lifespan"
                  value={`${species.average_lifespan} years`}
                />
                <InfoRow label="Language" value={species.language} />
              </Stack>
            </Grid>
          </Grid>
        }
      />

      <Collapse
        title="Characters"
        content={
          <UnorderedList
            items={species.people as IPeople[]}
            resourceType={ResourcesType.People}
          />
        }
      />

      <Collapse
        title="Films"
        content={
          <UnorderedList
            items={species.films as IFilm[]}
            resourceType={ResourcesType.Films}
          />
        }
      />
    </>
  )
}

export default SpeciesDetailRoot
