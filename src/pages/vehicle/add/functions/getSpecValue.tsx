const getSpecValues = (rest: any, specs: any) => {
  return Object.keys(rest).map(item => {
    const current = specs?.find(
      (spec: { specification: { name: string } }) =>
        spec?.specification?.name === item || spec?.specification?.name?.includes(item)
    )

    const value = typeof rest[item] === 'string' ? rest[item as string] : null
    const isValue = typeof rest[item] === 'string' ? true : false

    return {
      specification_id: current?.specification_id,
      spec_type: current?.specification.data_type,
      is_key_feature: false,
      ...(isValue && {
        values: [
          {
            value
          }
        ]
      })
    }
  })
}

export default getSpecValues
