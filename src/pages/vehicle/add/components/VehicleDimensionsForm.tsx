import { Control } from 'react-hook-form';
import { getSpecs } from 'src/functions/get-specifications'
import renderFormFields from 'src/functions/renderFormFields'
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes';

const VehicleDimensionsForm = ({ step, control, specs }: { step: number; control: Control<VehicleSubmitTypes>; specs: any }) => {
  const specifications = getSpecs(step, specs)

  return renderFormFields({ specifications, control })
}

export default VehicleDimensionsForm
