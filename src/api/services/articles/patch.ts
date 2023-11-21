import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { ArticleFields } from 'src/types/Articles'

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: ArticleFields }) => {
      return axiosInstance.patch(`/blog/${values?.id}`, values?.data)
    }
  })
}
