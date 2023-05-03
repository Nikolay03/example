import { Fragment, ReactElement } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

export default function TableDropdown (): ReactElement {
  return (
    <Menu placement={'bottom-end'}>
      {({ isOpen }) => (
        <Fragment>
          <MenuButton
            as={Button}
            size={'lg'}
            bg={'white'}
            border={'1px solid transparent'}
            color={'gray.500'}
            colorScheme={'primary'}
            fontSize={'md'}
            fontWeight={'medium'}
            rightIcon={isOpen ? <ChevronUp /> : <ChevronDown />}
            _hover={{ bg: 'gray.50' }}
            _active={{ bg: 'gray.100' }}
            _expanded={{ bg: 'white', borderColor: 'primary.500' }}>
            На продажу
          </MenuButton>
          <MenuList zIndex={'dropdown'} color={'palette.text.default'}>
            <MenuItem>Action 1</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
          </MenuList>
        </Fragment>
      )}
    </Menu>
  )
}
