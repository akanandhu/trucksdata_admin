import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

export const useAddFiles = () => {
    return useMutation({
        mutationFn : (values: any) => {
            return axiosInstance.post('file-upload', values)
        }
    })
}