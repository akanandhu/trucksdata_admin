export type FieldDataTypes = 'drop_down' | 'text'

export interface Options {
    options: 'string'
}


export interface SpecFields {
    id?: string
    name: string
    specification_category_id: number | string
    data_type: FieldDataTypes
    options: Options[] | null
}