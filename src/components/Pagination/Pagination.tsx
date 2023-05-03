import { ReactElement } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Stack, Box } from '@chakra-ui/react'

import { PageArrowPositions } from './constants'
import { getPages } from './utils'
import usePagination from './usePagination'
import PageButton from './PageButton'

const NumberElement = props => (
  <Box as={'span'} {...props} />
)

interface Props {
  totalRecords: number
  pageLimit?: number
  pageNeighbours?: number
}

function Pagination (props: Props): ReactElement {
  const { totalRecords, pageLimit, pageNeighbours } = props

  const formedPageNeighbours = Math.max(0, Math.min(pageNeighbours, 2))
  const totalPages = Math.ceil(totalRecords / pageLimit)

  if (!totalRecords || totalPages === 1) {
    return null
  }

  const {
    currentPage,
    handleMoveLeft,
    handleMoveRight,
    handleClick
  } = usePagination()

  const pages = getPages({
    totalPages,
    currentPage,
    pageNeighbours: formedPageNeighbours
  })

  return (
    <Stack
      align={'center'}
      direction={'row'}
      justify={'center'}
      spacing={{ base: 2, sm: 4 }}
      mt={{ base: 12, sm: 16 }}>

      {pages.map(page => {
        if (page === PageArrowPositions.LEFT_PAGE) {
          return (
            <PageButton
              key={page}
              aria-label={'Prev page'}
              color={'gray.500'}
              onClick={handleMoveLeft}>
              <ChevronLeft size={18} />
            </PageButton>
          )
        }

        if (page === PageArrowPositions.RIGHT_PAGE) {
          return (
            <PageButton
              key={page}
              aria-label={'Next page'}
              color={'gray.500'}
              onClick={handleMoveRight}>
              <ChevronRight size={18} />
            </PageButton>
          )
        }

        const isActivePage = currentPage === page

        return (
          <PageButton
            key={page}
            aria-label={`Page ${page}`}
            isActive={isActivePage}
            onClick={handleClick.bind(null, page)}>
            <NumberElement>
              {page}
            </NumberElement>
          </PageButton>
        )
      })}
    </Stack>
  )
}

Pagination.defaultProps = {
  pageLimit: Number(process.env.NEXT_PUBLIC_PAGE_SIZE),
  pageNeighbours: 1
}

export default Pagination
