import { getSpecs } from 'src/functions/get-specifications'
import renderFormFields from 'src/functions/renderFormFields'

const FormFields = ({ step, specs, control }: { step: number; specs: any; control: any }) => {
  const specifications = getSpecs(step, specs)

  return renderFormFields({ specifications, control })
}

export default FormFields
