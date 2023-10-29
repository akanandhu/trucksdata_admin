import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"
import { SeriesFields } from "src/types/SeriesFields"

export const useAddSeries = () => {
    return useMutation({
        mutationFn : (values: SeriesFields) => {
            return axiosInstance.post('series', values)
        }
    })
}