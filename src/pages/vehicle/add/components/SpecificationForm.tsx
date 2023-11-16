import { Control } from 'react-hook-form';
import FormFields from 'src/components/FormFields';
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes';


const SpecificationForm = ({ step, control, specs }: { step: number; control: Control<VehicleSubmitTypes>; specs: any }) => {

  return <FormFields control={control} specs={specs} step={step} /> 
}

export default SpecificationForm
