import * as yup from 'yup'

export const useGetSeriesSchema =  () => {
    const schema = yup.object().shape({
        title: yup.string().required('Series Title is required'),
        vehicle_type_id: yup.string().required('Vehicle class is required')
    })

    return schema
}