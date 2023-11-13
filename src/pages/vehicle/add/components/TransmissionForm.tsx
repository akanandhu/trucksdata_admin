import FormFields from 'src/components/FormFields'

const TransmissionForm = ({ step, control, specs }: { step: number; control: any; specs: any }) => {
  return <FormFields control={control} specs={specs} step={step} />
}

export default TransmissionForm
