import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

export const useDeleteSeries = () => {
    return useMutation({
        mutationFn: ({id}:{id: string}) => {
            return axiosInstance.delete(`/series/${id}`)
        }
    })
}