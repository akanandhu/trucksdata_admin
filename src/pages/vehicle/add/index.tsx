import { Grid } from "@mui/material"
import StepperCustomVertical from "src/components/form-wizard/CustomVerticalStepper"

const steps = [
    {
      icon: 'tabler:tir',
      title: 'Variant Details',
      subtitle: 'Enter Variant Details'
    },
    {
      icon: 'tabler:ruler',
      title: 'Vehicle Dimensions',
      subtitle: 'Enter Vehicle Dimensions'
    },
    {
      icon: 'tabler:assembly',
      title: 'Engine Specification',
      subtitle: 'Enter Engine Specifications'
    },
    {
        icon: 'tabler:manual-gearbox',
        title: 'Transmission',
        subtitle: 'Enter Transmission Details'
      },
      {
        icon: 'tabler:truck',
        title: 'Chasis & Suspension',
        subtitle: 'Enter Chasis Frame & Suspension Details'
      },
      {
        icon: 'tabler:steering-wheel',
        title: 'Steering & Braking',
        subtitle: 'Enter Steering & Braking Details'
      },
      {
        icon: 'tabler:aspect-ratio',
        title: 'Tyre Size',
        subtitle: 'Enter Tyre Size Details'
      },
      {
        icon: 'tabler:plug',
        title: 'Cabin & Electrical',
        subtitle: 'Enter Cabin & Electrical Details'
      },
      {
        icon: 'tabler:circle-letter-o',
        title: 'Other Details',
        subtitle: 'Enter Other Details'
      }
  ]


const VehiclePage = () => {
  return (
    <Grid>
        <StepperCustomVertical steps={steps} />
    </Grid>
  )
}

export default VehiclePage
