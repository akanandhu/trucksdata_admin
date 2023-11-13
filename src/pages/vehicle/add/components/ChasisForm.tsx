import React from 'react'
import FormFields from 'src/components/FormFields'

const ChasisForm = ({ step, control, specs }: { step: number; control: any; specs: any }) => {
  return <FormFields control={control} specs={specs} step={step} />
}

export default ChasisForm
