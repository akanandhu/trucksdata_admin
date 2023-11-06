export type FieldDataTypes = 'drop_down' | 'text' | 'nested_drop_down'

export interface Options {
    options: 'string'
}

export interface ChildOptions {
  option: string
}

export interface NestedOptions {
  option: string
  child_options: any
}


export interface SpecFields {
    id?: string
    name: string
    specification_category_id: number | string
    data_type: FieldDataTypes
    options: Options[] | null
}

export interface SpecObject {
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

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface Datum {
  id: number;
  name: string;
  specification_category_id: number;
  data_type: string;
  category?: any;
  options: any[];
}