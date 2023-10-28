import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { SpecFields } from 'src/types/SpecFields'

export const useEditSpecification = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: SpecFields }) => {
      return axiosInstance.patch(`specifications/${values?.id}`, values?.data)
    }
  })
}
