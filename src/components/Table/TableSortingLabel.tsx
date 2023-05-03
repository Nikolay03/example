import { ReactElement } from 'react'
import { find, includes, prop, split, startsWith } from 'ramda'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import ArrowUp from '~/icons/ArrowUp'
import ArrowDown from '~/icons/ArrowDown'

interface Props {
  name: string
  label: string
}

enum OrderingStates {
  ASC = 'asc',
  DESC = 'desc'
}

function getOrderingState (currentState: string) {
  if (!currentState) return null
  if (startsWith('-', currentState)) return OrderingStates.DESC
  return OrderingStates.ASC
}

function getArrowColor (condition: boolean) {
  return condition ? 'primary.500' : 'gray.500'
}

export default function TableSortingLabel (props: Props): ReactElement {
  const { name, label } = props

  const { pathname, query, ...router } = useRouter()

  const queryOrdering = prop('ordering', query) as string
  const queryOrderingKeys = queryOrdering ? split(',', queryOrdering) : []

  const currentState = find(includes(name), queryOrderingKeys) as string
  const orderingState = getOrderingState(currentState)
  const isAsc = orderingState === OrderingStates.ASC
  const isDesc = orderingState === OrderingStates.DESC

  function onSort () {
    const nextStates = {
      null: name,
      [`${OrderingStates.ASC}`]: `-${name}`,
      [`${OrderingStates.DESC}`]: ''
    }

    return router.replace({
      pathname,
      query: { ...query, ordering: nextStates[orderingState] }
    }, null, { shallow: true })
  }

  return (
    <Flex align={'center'} cursor={'pointer'} onClick={onSort}>
      <Box mr={1}>{label}</Box>

      <ArrowUp height={3} width={2} color={getArrowColor(isAsc)} />
      <ArrowDown height={3} width={2} color={getArrowColor(isDesc)} />
    </Flex>
  )
}
