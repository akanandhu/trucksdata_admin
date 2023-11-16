
const getSpecValues = (rest: any, specs: any, ) => {
   return  Object.keys(rest).map(item => {
        const current = specs?.find((spec: { specification: { name: string } }) => spec?.specification?.name === item)

        return {
          specification_id: current?.specification_id,
          spec_type: current?.specification.data_type,
          is_key_feature: false,
          values: [
            {
              value: rest[item as string]
            }
          ]
        }
      })
}

export default getSpecValues
