import { ResourcesType } from 'swapi-ts'

import ResourceTypeChip from './ResourceTypeChip'
import Title from './Title'

interface PageHeaderProps {
  title: string
  resourceType: ResourcesType
}

/**
 * Renders the page header with a title and a resource type chip.
 *
 * @param title - The title to display in the header.
 * @param resourceType - The type of resource to display in the chip.
 *
 * @component
 * @returns The rendered page header component
 */
const PageHeader = ({ title, resourceType }: PageHeaderProps) => (
  <>
    <Title text={title} />
    <ResourceTypeChip type={resourceType} />
  </>
)

export default PageHeader
