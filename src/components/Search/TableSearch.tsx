import { ReactElement } from 'react'
import { Search } from 'react-feather'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputProps
} from '@chakra-ui/react'

import useSearch from './useSearch'
import useQuerySearch from './useQuerySearch'
import ClearButton from './ClearButton'

interface Props extends InputProps {
  placeholder?: string
  onSearch?: (search: string) => void
  width?: string | number
}

function TableSearch (props: Props): ReactElement {
  const { placeholder, onSearch, width, ...restProps } = props

  const { search } = useQuerySearch()

  const { ref, onKeyPress, onClear } = useSearch(onSearch)

  return (
    <InputGroup
      size={'lg'}
      w={{ base: '100%', md: width }}
      minW={{ base: 'unset', md: '250px' }}>
      <InputLeftElement color={'gray.500'}>
        <Search />
      </InputLeftElement>

      <Input
        ref={ref}
        defaultValue={search}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        variant={'outline'}
        {...restProps}
      />

      {search && (
        <InputRightElement color={'gray.500'} right={1}>
          <ClearButton onClick={onClear} />
        </InputRightElement>
      )}
    </InputGroup>
  )
}

TableSearch.defaultProps = {
  width: '50%'
}

export default TableSearch
