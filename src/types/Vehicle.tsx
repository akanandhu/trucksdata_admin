export interface VehicleTypes {
  title: string
  manufacturer_id: number
  energy_source_id: number
  vehicle_type_id: number
  series_id: any
  min_price: number
  max_price: any
  price_unit: string
  images: string[]
  is_popular: boolean
  description: string
  video_links: Videolink[]
  brochure: Brochure
  vehicle_specs: Vehiclespec[]
}

interface Vehiclespec {
  specification_id: number
  spec_type: string
  is_key_feature: boolean
  values: Value[]
}

interface Value {
  value: string
  child_values?: Childvalue[]
}

interface Childvalue {
  value: string
}

interface Brochure {
  original: string
  thumbnail: string
}

interface Videolink {
  url: string
  language: string
}

export interface VehicleParamsTypes {
  title?: string | null
  doesnt_have_compare?: boolean
  page?: any
  pageSize?: any
}

export interface VehicleParamsTypesPaginate {
  page?: any
  pageSize?: any
}

export interface Vehicle {
  id: number
  title: string
  manufacturer_id: number
  energy_source_id: number
  vehicle_type_id: number
  series_id?: any
  min_price: string
  max_price: string
  price_unit?: any
  images: Image[]
  video_links?: any
  brochure: any[]
  is_popular: number
  description?: any
  created_at: string
  updated_at: string
  vehicle_specs: Vehiclespec[]
  is_visible?: boolean
}

interface Vehiclespec {
  id: number
  vehicle_id: number
  specification_id: number
  spec_type: string
  is_key_feature: boolean
  created_at: string
  updated_at: string
  specification: Specification
  values: Value[]
}

interface Value {
  id: number
  vehicle_spec_id: number
  specification_id?: any
  value: string
  parent_value_id?: any
  created_at: string
  updated_at: string
  child_values?: Childvalue[]
}

interface Specification {
  id: number
  name: string
  specification_category_id: number
  data_type: string
}

interface Image {
  thumbnail: string
  original: string
  id: number
}
