import { ReactElement } from 'react'
import { isEmpty } from 'ramda'
import { MenuListComponentProps } from 'react-select'
import { Box } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { useMediaBreakpoint } from '~/hooks/index'
import { Row, Col } from '~/components/Grid'
import { TUserReputation } from '~/types/reputations'

type Props = MenuListComponentProps<TUserReputation, true>

export default function UsersSelectMenuList (props: Props): ReactElement {
  const { children, getStyles, theme, ...restProps } = props
  const { options } = restProps

  const { t } = useTranslate()

  const isLargerThanMD = useMediaBreakpoint({ breakpoint: 'md' })

  const rootStyle = getStyles('menuList', { theme })

  if (isEmpty(options)) {
    return (
      <Box sx={rootStyle}>
        {children}
      </Box>
    )
  }

  if (isLargerThanMD) {
    return (
      <Box sx={rootStyle} maxH={'300px'}>
        <Box color={'gray.500'} px={4} py={4}>
          <Row>
            <Col span={6}>
              {t('input_full_name_label')}
            </Col>
            <Col span={6}>
              {t('rating_table_th_volume')}
            </Col>
            <Col span={5}>
              {t('rating_table_th_reputation')}
            </Col>
            <Col span={5}>
              {t('rating_table_th_rating')}
            </Col>
            <Col span={2} />
          </Row>
        </Box>
        <Box>{children}</Box>
      </Box>
    )
  }

  return (
    <Box sx={rootStyle}>
      <Box color={'gray.500'} px={4} py={4}>
        <Row>
          <Col span={22}>
            {t('input_full_name_label')}
          </Col>
          <Col span={2} />
        </Row>
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}
