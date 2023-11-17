import * as yup from 'yup'

const useGetVehicleSchema = () => {
  const schema = yup.object().shape({
    title: yup.string().required('Vehicle Name is required'),
    vehicle_type_id: yup.number().required('Vehicle Class is required').typeError('Vehicle Class is required'),
    manufacturer_id: yup.number().required('Manufacturer is required ').typeError('Manufacturer is required'),
    energy_source_id: yup.number().required('Fuel Type is required').typeError('Fuel Type is required')
  })

  return schema
}

export default useGetVehicleSchema
