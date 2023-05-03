import { ReactElement } from 'react'
import { Search } from 'react-feather'
import {
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  InputProps
} from '@chakra-ui/react'

import useSearch from './useSearch'
import ClearButton from './ClearButton'

interface Props extends InputProps {
  isLoading?: boolean
  onSearch?: (search: string) => void
  searchValue?: string
}

export default function SearchField (props: Props): ReactElement {
  const { isLoading, onSearch, searchValue, ...restProps } = props

  const { ref, onKeyPress, onClear } = useSearch(onSearch)

  return (
    <InputGroup size={'xl'}>
      <Input {...restProps} ref={ref} onKeyPress={onKeyPress} />
      <InputRightElement right={5} w={'auto'}>
        <Stack align={'center'} direction={'row'}>
          {searchValue && (
            <ClearButton onClick={onClear} />
          )}
          {isLoading && (
            <Spinner color={'primary.500'} size={'sm'} />
          )}
          {!isLoading && (
            <Icon
              as={Search}
              boxSize={5}
              color={'primary.500'}
              strokeWidth={2.5}
            />
          )}
        </Stack>
      </InputRightElement>
    </InputGroup>
  )
}
