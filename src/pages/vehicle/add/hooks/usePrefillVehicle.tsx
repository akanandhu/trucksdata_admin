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
  vehicleFetched,
  reset
}: {
  vehicle: Vehicle
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
  }, [ reset, vehicle, vehicleFetched])
}

export default usePrefillVehicle
