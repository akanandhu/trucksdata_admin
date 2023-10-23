import axios from 'axios'

// Set config defaults when creating the instance
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const axiosInstance = axios.create({
  baseURL
})

// Change request data/error here
axiosInstance.interceptors.request.use(
  (config: any) => {
    let token

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken')
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ''}`
    }

    return config
  },
  error => {
    console.log(error, 'the error')

    return Promise.reject(error)
  }
)

const kickout = () => {
  localStorage.clear()

  if (window.location.pathname !== '/' && window.location.pathname !== '/login/') {
    window.location.href = '/login/'
  }
}

axiosInstance.interceptors.response.use(undefined, async error => {
  if (error?.response?.status === 401) {
    if (error.response.data?.token) {
      const config = error.config
      localStorage.setItem('accessToken', error.response.data?.token)

      return axiosInstance(config)
    } else {
      kickout()
    }
  }

  return Promise.reject(error)
})
