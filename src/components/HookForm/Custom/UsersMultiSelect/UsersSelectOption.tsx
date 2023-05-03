import { ReactElement } from 'react'
import { prop } from 'ramda'
import { OptionProps } from 'react-select'
import { Box, Checkbox } from '@chakra-ui/react'

import { TUserReputation } from '~/types/reputations'
import { numberFormat, useBigNumberFormat } from '~/utils/number'
import { getUserReputation } from '~/utils/get'
import { useMediaBreakpoint } from '~/hooks/index'
import { Row, Col } from '~/components/Grid'
import RatingStar from '~/components/RatingStar'

type Props = OptionProps<TUserReputation, true>

export default function UsersSelectOption (props: Props): ReactElement {
  const {
    data,
    innerRef,
    innerProps,
    isSelected
  } = props

  const isLargerThanMD = useMediaBreakpoint({ breakpoint: 'md' })

  const { bigNumberFormat } = useBigNumberFormat()

  const name = prop('name', data)
  const volumePrice = prop('volumePrice', data)
  const volumePriceFormatted = bigNumberFormat(volumePrice)
  const volumeQuantity = prop('volumeQuantity', data)
  const volume = `${volumePriceFormatted} / ${numberFormat(volumeQuantity)}`
  const rating = getUserReputation(data)
  const reviewRating = prop('reviewRating', data)

  const rootProps = {
    ref: innerRef,
    cursor: 'pointer',
    fontSize: 'sm',
    px: 4,
    py: 3,
    transition: 'all 200ms',
    _hover: { bgColor: 'gray.100' },
    ...innerProps
  }

  if (isLargerThanMD) {
    return (
      <Box {...rootProps}>
        <Row>
          <Col span={6}>{name}</Col>
          <Col span={6}>{volume}</Col>
          <Col span={5}>{rating}</Col>
          <Col span={5}>
            <RatingStar isSimple={true} value={reviewRating} />
          </Col>
          <Col span={2} textAlign={'right'}>
            <Checkbox isChecked={isSelected} size={'lg'} />
          </Col>
        </Row>
      </Box>
    )
  }

  return (
    <Box {...rootProps}>
      <Row>
        <Col span={22}>{name}</Col>
        <Col span={2} textAlign={'right'}>
          <Checkbox isChecked={isSelected} size={'lg'} />
        </Col>
      </Row>
    </Box>
  )
}
