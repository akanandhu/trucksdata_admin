import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

export const useDeleteSpecOpts = () => {
    return useMutation({
        mutationFn: ({id}:{id: string}) => {
            return axiosInstance.delete(`/specification-options/${id}`)
        }
    })
}