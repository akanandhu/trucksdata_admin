import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"
import { ManufacturersFields } from "src/types/Manufacturers"

export const useAddManufacturer = () => {
    return useMutation({
        mutationFn : (values: ManufacturersFields) => {
            return axiosInstance.post('manufacturers', values)
        }
    })
}