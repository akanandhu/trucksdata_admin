import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"
import { VehicleClassFields } from "src/types/Manufacturers"

export const useAddVehicleClass = () => {
    return useMutation({
        mutationFn : (values: VehicleClassFields) => {
            return axiosInstance.post('vehicle-types', values)
        }
    })
}