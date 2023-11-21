import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

export const useRemoveArticle = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axiosInstance.delete(`/blog/${id}`)
    }
  })
}
