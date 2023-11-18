import { SetStateAction, useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'
import { Vehicle } from 'src/types/Vehicle'
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes'

function transformData(inputData: any) {
  const output: any = {}

  inputData.forEach((item: { specification: { name: string }; values: string | any[] }) => {
    const specName = item?.specification?.name
    const value = item?.values?.length > 0 ? item?.values[0]?.value : null

    output[specName] = value
  })

  return output
}

const usePrefillVehicle = ({
  vehicle,
  vehicleFetched,
  reset,
  setRefresh
}: {
  vehicle: Vehicle
  vehicleFetched: boolean
  reset: UseFormReset<VehicleSubmitTypes>
  setRefresh: React.Dispatch<SetStateAction<number>>
}) => {
  useEffect(() => {
    if (vehicleFetched) {
      const { vehicle_specs, is_popular, ...rest } = vehicle || {}
      const vehicleSpecs = transformData(vehicle_specs ?? [])

      reset({
        ...rest,
        ...vehicleSpecs,
        is_popular: Boolean(is_popular) 
      })
      setRefresh((refresh) => refresh + 1)
    }
  }, [reset, setRefresh, vehicle, vehicleFetched])
}

export default usePrefillVehicle
