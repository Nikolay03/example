import { ReactElement } from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'

interface Props extends IconButtonProps {
  children: ReactElement
  isActive?: boolean
}

function PageButton (props: Props): ReactElement {
  const { children, isActive, ...restProps } = props

  return (
    <IconButton
      borderRadius={'10px'}
      fontSize={'md'}
      icon={children}
      isActive={isActive}
      size={'sm'}
      variant={'pagination'}
      {...restProps}
    />
  )
}

PageButton.defaultProps = {
  isActive: false
}

export default PageButton
