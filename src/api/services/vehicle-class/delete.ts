import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

export const useDeleteVehicleClass = () => {
    return useMutation({
        mutationFn: ({id}:{id: string}) => {
            return axiosInstance.delete(`/vehicle-types/${id}`)
        }
    })
}