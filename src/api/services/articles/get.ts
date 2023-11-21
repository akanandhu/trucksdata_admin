import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

async function getArticles() {
  const response = await axiosInstance.get(`blog`)

  return response?.data
}

export const useGetArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles()
  })
}

async function getArticle(id: string) {
  const response = await axiosInstance.get(`/blog/${id}`)

  return response
}

export const useGetArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getArticle(id),
    enabled: !!id
  })
}
