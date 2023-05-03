/* eslint-disable max-len */
import { Fragment, ReactElement } from 'react'
import { prop } from 'ramda'
import { Box, BoxProps, Button, Flex, Heading, ListItem, Stack, UnorderedList, useBoolean } from '@chakra-ui/react'

import { RatingDesignations } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { Col, Row, RowProps } from '~/components/Grid'

const CustomRow = (props: RowProps) => (
  <Row
    borderTop={'1px solid'}
    borderColor={'gray.200'}
    py={4}
    spacing={6}
    _first={{ borderTop: 'none', pt: 'unset' }}
    _last={{ pb: 'unset' }}
    {...props}
  />
)

const Sign = (props: BoxProps) => (
  <Box fontWeight={'bold'} {...props} />
)

interface LegendListItem {
  sign: RatingDesignations
  title: string
  description: string | ReactElement
  signProps?: BoxProps
}

export default function ReputationLegend (): ReactElement {
  const { t } = useTranslate()

  const [flag, setFlag] = useBoolean()

  const list: LegendListItem[] = [
    {
      sign: RatingDesignations.A,
      title: t('rating_table_legend_sign_A_title'),
      description: t('rating_table_legend_sign_A_description')
    },
    {
      sign: RatingDesignations.AA,
      title: t('rating_table_legend_sign_AA_title'),
      description: t('rating_table_legend_sign_AA_description')
    },
    {
      sign: RatingDesignations.AAA,
      title: t('rating_table_legend_sign_AAA_title'),
      description: t('rating_table_legend_sign_AAA_description')
    },
    {
      sign: RatingDesignations.B,
      title: t('rating_table_legend_sign_B_title'),
      description: t('rating_table_legend_sign_B_description')
    },
    {
      sign: RatingDesignations.B_,
      signProps: { textDecor: 'line-through' },
      title: t('rating_table_legend_sign_BMinus_title'),
      description: (
        <Fragment>
          <Box>{t('rating_table_legend_sign_BMinus_description')}</Box>
          <UnorderedList pl={2}>
            <ListItem>{t('rating_table_legend_sign_BMinus_description_option_1')}</ListItem>
            <ListItem>{t('rating_table_legend_sign_BMinus_description_option_2')}</ListItem>
            <ListItem>{t('rating_table_legend_sign_BMinus_description_option_3')}</ListItem>
            <ListItem>{t('rating_table_legend_sign_BMinus_description_option_4')}</ListItem>
          </UnorderedList>
        </Fragment>
      )
    },
    {
      sign: RatingDesignations.DEL,
      title: t('rating_table_legend_sign_DEL_title'),
      description: t('rating_table_legend_sign_DEL_description')
    }
  ]

  return (
    <Stack display={{ base: 'none', md: 'flex' }} spacing={8}>
      <Flex align={'center'} justify={'space-between'}>
        <Heading as={'h3'} fontSize={'2xl'} fontWeight={'semibold'} mr={4}>
          {t('rating_table_legend_title')}
        </Heading>

        <Button onClick={setFlag.toggle}>
          {flag
            ? t('rating_table_legend_hide')
            : t('rating_table_legend_show')
          }
        </Button>
      </Flex>

      <Box
        bgColor={'gray.100'}
        borderRadius={'2xl'}
        display={flag ? 'block' : 'none'}
        fontSize={'sm'}
        lineHeight={'base'}
        p={8}>
        <CustomRow
          align={'center'}
          color={'primary.500'}
          fontWeight={'bold'}>
          <Col span={4}>
            {t('rating_table_legend_th_sign')}
          </Col>
          <Col span={8}>
            {t('rating_table_legend_th_display')}
          </Col>
          <Col span={12}>
            {t('rating_table_legend_th_description')}
          </Col>
        </CustomRow>

        {list.map(item => {
          const sign = prop('sign', item)
          const signProps = prop('signProps', item)
          const title = prop('title', item)
          const description = prop('description', item)

          return (
            <CustomRow key={sign}>
              <Col span={4}>
                <Sign {...signProps}>{sign}</Sign>
              </Col>
              <Col span={8}>{title}</Col>
              <Col span={12}>{description}</Col>
            </CustomRow>
          )
        })}
      </Box>
    </Stack>
  )
}
