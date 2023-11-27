import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

async function getArticles(params: { page: number; pageSize: number }) {
  const filterParams = {
    ...params,
    page: params?.page + 1
  }

  const response = await axiosInstance.get(`blog`, {
    params: filterParams
  })

  return response
}

export const useGetArticles = (params: { page: number; pageSize: number }) => {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params)
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
