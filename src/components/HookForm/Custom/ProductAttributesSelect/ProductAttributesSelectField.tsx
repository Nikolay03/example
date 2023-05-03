import { ReactElement, useRef, memo } from 'react'
import { sprintf } from 'sprintf-js'
import { Props as RSProps } from 'react-select'
import { Box, useBoolean, useDisclosure, useOutsideClick } from '@chakra-ui/react'

import { TAttributeSelect } from './types'
import ProductAttributesMenu from './ProductAttributesMenu'
import ProductAttributesMenuList from './ProductAttributesMenuList'
import ProductAttributeMultiValue from './ProductAttributeMultiValue'
import ProductAttributesOption from './ProductAttributesOption'

import * as API from '~/constants/api'
import { SelectField } from '~/components/HookForm'

const components = {
  Menu: ProductAttributesMenu,
  MenuList: ProductAttributesMenuList,
  MultiValue: ProductAttributeMultiValue,
  Option: ProductAttributesOption
}

interface Props extends RSProps {
  name: string
  productId: string | number
}

export default memo(function ProductAttributesSelectField (props: Props): ReactElement {
  const { name, productId, ...restProps } = props

  const ref = useRef()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isShown, setShown] = useBoolean()

  useOutsideClick({ ref: ref, handler: onClose })

  const onFetchSuccess = (list: TAttributeSelect[]) => {
    if (list.length) {
      setShown.on()
      return
    }
    setShown.off()
  }

  const isDisabled = !productId

  return (
    <Box
      ref={ref}
      d={isShown ? 'block' : 'none'}
      onClick={isDisabled ? null : onOpen}>
      <SelectField
        name={name}
        api={sprintf(API.PRODUCT_GROUP_ATTRIBUTES_LIST, productId)}
        isMulti={true}
        isMultiLang={true}
        parent={productId}
        isDisabled={isDisabled}
        components={components}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        menuIsOpen={isOpen}
        menuPortalTarget={null}
        onSuccess={onFetchSuccess}
        {...restProps}
      />
    </Box>
  )
})
