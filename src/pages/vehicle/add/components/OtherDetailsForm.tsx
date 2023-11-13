import React from 'react'
import FormFields from 'src/components/FormFields';

const OtherDetailsForm = ({ step, control, specs }: { step: number; control: any; specs: any }) => {
  return <FormFields step={step} control={control} specs={specs} />
}

export default OtherDetailsForm
