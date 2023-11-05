import { InfiniteData } from "@tanstack/react-query"

const getFlatData = (apiData: InfiniteData<any> | undefined) => {
  if (apiData && apiData.pages) {
    const data = apiData.pages?.flatMap(page => (page.data ? page.data : page))

    return data
  } else {
    return []
  }
}

export default getFlatData
