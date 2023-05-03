import { defaultTo, pipe } from 'ramda'
import { useRouter } from 'next/router'

import { useRouterQuery } from '~/hooks/url'

interface UsePagination {
  currentPage: number
  handleMoveLeft: () => void
  handleMoveRight: () => void
  handleClick: (page: number) => void
}

export default function usePagination (): UsePagination {
  const router = useRouter()

  const { urlQuery: { page } } = useRouterQuery()

  const currentPage = pipe(defaultTo(1), Number)(page)

  function goToPage (page: number): Promise<void> {
    const newUrl = {
      pathname: router.pathname,
      query: { ...router.query, page }
    }
    const params = { shallow: true }
    return router.replace(newUrl, undefined, params)
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
      })
  }

  function handleMoveLeft () {
    return goToPage(currentPage - 1)
  }

  function handleMoveRight () {
    return goToPage(currentPage + 1)
  }

  function handleClick (page) {
    return goToPage(page)
  }

  return {
    currentPage,
    handleMoveLeft,
    handleMoveRight,
    handleClick
  }
}
