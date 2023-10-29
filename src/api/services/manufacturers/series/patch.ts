import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { SeriesFields } from 'src/types/SeriesFields'

export const useEditSeries = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: SeriesFields }) => {
      return axiosInstance.patch(`series/${values?.id}`, values?.data)
    }
  })
}
