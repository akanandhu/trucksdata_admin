import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { HomePageSettings } from 'src/types/HomePageSettings'

export const useUpdateGeneralSettings = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: HomePageSettings }) => {
      return axiosInstance.patch(`home-page-settings/${values?.id}`, values?.data)
    }
  })
}
