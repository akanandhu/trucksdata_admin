const getSpecValues = (rest: any, specs: any) => {
  return Object.keys(rest).map(item => {
    const current = specs?.find(
      (spec: { specification: { name: string } }) =>
        spec?.specification?.name === item || spec?.specification?.name?.includes(item)
    )
    const value = typeof rest[item] === 'string' ? rest[item as string] : null
    const isValue = typeof rest[item] === 'string' ? true : false

    if (current.specification.name === 'Applications') {
      const appValue = findOption(current.specification.options, rest[item])

      return {
        specification_id: current?.specification_id,
        spec_type: current?.specification.data_type,
        is_key_feature: Boolean(current?.specification?.is_key_feature),
        ...(appValue && {
          values: [appValue]
        })
      }
    }

    return {
      specification_id: current?.specification_id,
      spec_type: current?.specification.data_type,
      is_key_feature: Boolean(current?.specification?.is_key_feature),
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

function findOption(array: any, target: any) {
  for (const obj of array) {
    if (obj.option === target) {
      return {
        value: obj.option,
        child_values: obj.child_options.map((child: { option: any }) => ({ value: child.option }))
      }
    } else if (obj.child_options) {
      for (const childObj of obj.child_options) {
        if (childObj.option === target) {
          return {
            value: obj.option,
            child_values: obj.child_options
              .filter((child: { option: any }) => child.option === target)
              .map((child: { option: any }) => {
                if (child.option === target) {
                  return { value: child.option }
                }
              })
          }
        }
      }
    }
  }

  // Return null if the target is not found in the array
  return null
}
