import { Grid } from '@mui/material'
import { useGetSpecCategories } from 'src/api/services/specifications/category/get'
import StepperCustomVertical from 'src/components/form-wizard/CustomVerticalStepper'

function getIcon(title: string) {
  const icons: any = {
    'Variant Details': 'tabler:tir',
    'Vehicle Dimensions': 'tabler:ruler',
    'Engine Specification': 'tabler:assembly',
    'Transmission': 'tabler:manual-gearbox',
    'Chassis & Suspension': 'tabler:truck',
    'Steering & Braking': 'tabler:steering-wheel',
    'Tyre Size': 'tabler:aspect-ratio',
    'Cabin & Electrical': 'tabler:plug',
    'Applications & Other Details': 'tabler:circle-letter-o',
    'Endurance': 'tabler:brand-etsy'
  }

  return icons[title]
}

const VehiclePage = () => {
  const vehicleCategoriesData = useGetSpecCategories()
  const vehicleCategories = vehicleCategoriesData?.data?.data?.data

  const steps = vehicleCategories?.map((category: { name: string }) => {
    return {
      icon: getIcon(category?.name ?? ''),
      title: category?.name,
      subtitle: `Enter ${category?.name} Details`
    }
  })

  steps?.splice(0, 0, {
    icon: 'tabler:tir',
    title: 'Vehicle Details',
    subtitle: 'Enter Vehicle Details'
  })

  return (
    <Grid>
      <StepperCustomVertical steps={steps ?? []} />
    </Grid>
  )
}

export default VehiclePage
