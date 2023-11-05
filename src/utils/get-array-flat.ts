
const getArrayFlat = (arr: any[]) => {
    if (arr.length) {
        const data = arr?.flatMap((page: { data: any }) => (page.data ? page.data : page))
    
        return data
      } else {
        return []
      }
}

export default getArrayFlat
