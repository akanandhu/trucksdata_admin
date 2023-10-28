import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { Options } from 'src/types/SpecFields'

export const useEditSpecOption = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: Options }) => {
      return axiosInstance.patch(`specification-options/${values?.id}`, values?.data)
    }
  })
}
