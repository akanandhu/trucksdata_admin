import { useMutation } from '@tanstack/react-query'
import { loginRoute } from 'src/api/routes/auth'
import { axiosInstance } from 'src/axios/axiosInstance'
import { LoginParams } from 'src/context/types'

export const useLogin = () => {
  return useMutation({
    mutationFn: (values: LoginParams) => {
      return axiosInstance.post(loginRoute, values)
    }
  })
}
