import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { HomePageSettings } from 'src/types/HomePageSettings'

export const useAddGeneralSettings = () => {
  return useMutation({
    mutationFn: (values: HomePageSettings) => {
      return axiosInstance.post('home-page-settings', values)
    }
  })
}
