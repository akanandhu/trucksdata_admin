import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

export const useAddSpecOption = () => {
    return useMutation({
        mutationFn : (values: any) => {
            return axiosInstance.post('specification-options', values)
        }
    })
}