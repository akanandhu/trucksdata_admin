export interface RootObject {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface Datum {
  id: number;
  name: string;
  country_of_origin?: any;
  founded_year?: any;
  website?: any;
  contact_info?: any;
  description: string;
  logo?: any;
  vehicle_types: Vehicletype[];
}

export interface Vehicletype {
  id: number;
  name: string;
  status: string;
  icon?: any;
  deleted_at?: any;
  pivot: Pivot;
}

export interface Pivot {
  manufacturer_id: number;
  vehicle_type_id: number;
}