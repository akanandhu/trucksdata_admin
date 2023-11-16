import React from 'react'
import { Control } from 'react-hook-form';
import FormFields from 'src/components/FormFields';
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes';

const OtherDetailsForm = ({ step, control, specs }: { step: number; control: Control<VehicleSubmitTypes>; specs: any }) => {
  return <FormFields step={step} control={control} specs={specs} />
}

export default OtherDetailsForm
