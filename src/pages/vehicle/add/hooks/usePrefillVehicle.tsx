import { useEffect } from 'react'
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
  isFetched,
  vehicleFetched,
  reset
}: {
  vehicle: Vehicle
  isFetched: boolean
  vehicleFetched: boolean
  reset: UseFormReset<VehicleSubmitTypes>
}) => {
  useEffect(() => {
    if (vehicleFetched) {
      const { vehicle_specs, ...rest } = vehicle || {}
      const vehicleSpecs = transformData(vehicle_specs ?? [])

      reset({
        ...rest,
        ...vehicleSpecs
      })
    }
  }, [isFetched, reset, vehicle, vehicleFetched])
}

export default usePrefillVehicle
