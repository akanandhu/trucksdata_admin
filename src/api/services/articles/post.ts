import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { ArticleFields } from 'src/types/Articles'

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: (values: ArticleFields) => {
      return axiosInstance.post('blog', values)
    }
  })
}
