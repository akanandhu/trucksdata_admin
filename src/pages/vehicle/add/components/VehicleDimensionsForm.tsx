import { getSpecs } from 'src/functions/get-specifications'
import renderFormFields from 'src/functions/renderFormFields'

const VehicleDimensionsForm = ({ step, control, specs }: { step: number; control: any; specs: any }) => {
  const specifications = getSpecs(step, specs)

  return renderFormFields({ specifications, control })
}

export default VehicleDimensionsForm
