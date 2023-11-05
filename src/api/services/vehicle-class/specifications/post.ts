import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"
import { VehicleClassSpecTypes } from "src/types/VehicleClass"

export const useAddSpecsToClass = () => {
    return useMutation({
        mutationFn : (values: VehicleClassSpecTypes) => {
            return axiosInstance.post('vehicle-type/specifications', values)
        }
    })
}