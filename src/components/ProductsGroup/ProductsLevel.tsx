import { memo, ReactElement } from 'react'
import { isEmpty, not, prop } from 'ramda'
import { Minus, Plus } from 'react-feather'
import { Box, Checkbox, Flex, Icon, Radio, Square, Text, useDisclosure } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { TProductGroup } from '~/types/products'
import { DashedDivider } from '~/components/Misc'

const checkComponents = {
  checkbox: Checkbox,
  radio: Radio
}

interface Props {
  product: TProductGroup
  level: number
  type: 'checkbox' | 'radio'
  isSelected?: boolean
}

function ProductsLevel (props: Props): ReactElement {
  const { product, level, type, isSelected } = props

  const { translateData } = useTranslate()

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: isSelected })

  const id = String(prop('id', product))
  const name = translateData(product, 'name')
  const children = prop('children', product) || []
  const hasChildren = not(isEmpty(children))

  const isCheckbox = type === 'checkbox'
  const isRadio = type === 'radio'

  const CheckComponent = checkComponents[type]

  return (
    <>
      <Flex
        align={'center'}
        pt={3}
        pl={`${level * 1.5}rem`}>
        {hasChildren && (
          <>
            <Box flexGrow={1}>
              {isCheckbox && (
                <CheckComponent
                  id={id}
                  display={'flex'}
                  py={1}
                  value={id}
                  size={'sm'}
                  w={'full'}>
                  {name}
                </CheckComponent>
              )}
              {isRadio && (
                <Text
                  cursor={'pointer'}
                  fontSize={'sm'}
                  lineHeight={'none'}
                  py={1}
                  onClick={onToggle}>
                  {name}
                </Text>
              )}
            </Box>
            <Box flexGrow={100} overflow={'hidden'}>
              <DashedDivider />
            </Box>
          </>
        )}

        {hasChildren
          ? (
            <Square
              borderRadius={'3px'}
              bgColor={isOpen ? 'primary.500' : 'gray.500'}
              cursor={'pointer'}
              ml={{ base: 2, md: 3 }}
              size={'14px'}
              onClick={onToggle}>
              <Icon
                as={isOpen ? Minus : Plus}
                boxSize={3}
                color={'white'}
              />
            </Square>
          )
          : (
            <CheckComponent
              id={id}
              display={'flex'}
              py={1}
              value={id}
              size={'sm'}
              w={'full'}>
              {name}
            </CheckComponent>
          )
        }
      </Flex>
      {isOpen && (
        <>
          {children.map(childProduct => (
            <ProductsLevel
              key={childProduct.id}
              product={childProduct}
              level={level + 1}
              type={type}
              isSelected={isSelected}
            />
          ))}
        </>
      )}
    </>
  )
}

ProductsLevel.defaultProps = {
  level: 0
}

export default memo(ProductsLevel)
