import { useEffect } from 'react'

const usePrefillDefault = ({ vehicleClass, setValue }: { vehicleClass: any; setValue: any }) => {
  const trucks = vehicleClass?.find((vehicle: { name: string }) => vehicle.name === 'Trucks')
  const enerySources = trucks?.energy_sources?.find((energy: { name: string }) => energy.name === 'Petrol')
  useEffect(() => {
    setValue('vehicle_type_id', trucks?.id)
    setValue('energy_source_id', enerySources?.id)
  }, [enerySources?.id, setValue, trucks?.id])
}

export default usePrefillDefault
