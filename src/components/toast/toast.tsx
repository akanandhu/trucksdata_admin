import { ToastOptions, toast } from 'react-hot-toast'

const useCustomToast = () => {
  const success = (message: string, opts?: ToastOptions) => {
    return toast.success(message, {
      ...(opts && { ...opts })
    })
  }
  const error = (message: string, opts?: ToastOptions) => {
    return toast.error(message, {
      ...(opts && { ...opts })
    })
  }

  return {
    success,
    error
  }
}
export default useCustomToast
