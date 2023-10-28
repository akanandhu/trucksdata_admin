import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"
import { SpecFields } from "src/types/SpecFields"

export const useAddSpecification = () => {
    return useMutation({
        mutationFn : (values: SpecFields) => {
            return axiosInstance.post('specifications', values)
        }
    })
}