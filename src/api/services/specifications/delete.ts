import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

export const useDeleteSpec = () => {
    return useMutation({
        mutationFn: ({id}:{id: string}) => {
            return axiosInstance.delete(`/specifications/${id}`)
        }
    })
}