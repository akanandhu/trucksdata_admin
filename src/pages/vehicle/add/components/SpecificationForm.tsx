import FormFields from 'src/components/FormFields';


const SpecificationForm = ({ step, control, specs }: { step: number; control: any; specs: any }) => {

  return <FormFields control={control} specs={specs} step={step} /> 
}

export default SpecificationForm
