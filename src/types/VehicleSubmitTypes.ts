export interface VehicleSubmitTypes {
  title: string
  manufacturer_id: number | string
  energy_source_id: number | string
  vehicle_type_id: number | string
  series_id?: any
  min_price: number
  max_price?: any
  price_unit: string
  images: string[]
  is_popular?: boolean
  is_latest?: boolean
  is_upcoming?: boolean
  description: string
  video_links: Videolink[]
  brochure: Brochure | []
  vehicle_specs?: Vehiclespec[]
  visibility: boolean
  faq: []
  category_name: string
  compare_vehicle_id: string

}

export interface Vehiclespec {
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
