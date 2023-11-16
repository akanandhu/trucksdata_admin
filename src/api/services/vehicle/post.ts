import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"
import { VehicleTypes } from "src/types/Vehicle"

export const useAddVehicle = () => {
    return useMutation({
        mutationFn : (values: VehicleTypes) => {
            return axiosInstance.post('vehicles', values)
        }
    })
}