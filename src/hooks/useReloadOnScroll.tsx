import { useEffect } from 'react'

export const useReloadOnPageScroll = ({
  inView,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage
}: {
  inView: any
  isFetchingNextPage: boolean
  hasNextPage?: boolean
  fetchNextPage: () => void
}) => {
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])
}
