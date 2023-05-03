import { ReactElement } from 'react'
import { defaultTo, find, path, pipe, prop, propEq } from 'ramda'
import { OptionProps } from 'react-select'
import { Box, Flex, Select } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { TProductAttributeValue } from '~/types/products'

interface Props extends OptionProps<any, false> {
  value: number
}

export default function ProductAttributesOption (props: Props): ReactElement {
  const {
    data,
    label,
    value,
    getValue,
    selectOption
  } = props

  const { translateData } = useTranslate()

  const attributes: TProductAttributeValue[] = prop('attributes', data) || []
  const selectedValue = getValue()
  const selectedAttribute = pipe(
    find(propEq('id', value)),
    path(['attribute', 'id']),
    defaultTo(''),
    String
  )(selectedValue)

  function onChangeSelect (event) {
    const attrValue = event.target.value

    if (attrValue) {
      const attrObject = attributes.find(propEq('id', Number(attrValue)))

      selectOption({
        id: value,
        name: label,
        attribute: attrObject
      })
    }
  }

  return (
    <Box px={4} py={2}>
      <Flex align={'center'} justify={'space-between'}>
        <Box fontSize={'sm'}>{label}</Box>
        <Box w={40}>
          <Select
            id={`attributes_${value}`}
            borderRadius={'lg'}
            bg={'white'}
            colorScheme={'primary'}
            focusBorderColor={'primary.500'}
            fontWeight={'medium'}
            onChange={onChangeSelect}
            size={'sm'}
            value={selectedAttribute}>
            <option value={''} />
            {attributes.map(attr => (
              <option key={attr.id} value={attr.id}>
                {translateData(attr, 'value')}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Box>
  )
}
