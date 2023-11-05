export type VehicleClassFields = {
  id?: string
  title?: string
  status: 'active' | 'in-active'
  name: string
}

export type VehicleClassSpecParams = {
  vehicle_type_id: string
  energy_source_id: string
}


export interface VehicleClassSpecTypes {
  vehicle_type_id: number;
  energy_source_id?: string | number
  specifications: VehicleClassSpecification[];
}

export interface VehicleClassSpecification {
  energy_source_id: number;
  specification_id: number;
}