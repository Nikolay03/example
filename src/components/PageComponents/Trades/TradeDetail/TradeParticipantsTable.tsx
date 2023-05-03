import { ReactElement } from 'react'
import { isEmpty, prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import {
  Button,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

import { USER_DETAIL_URL } from '~/constants/routes'
import { TTradesParticipant } from '~/types/trades'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { TableOverflow, TableEmptyData } from '~/components/Table'
import { TableSkeleton } from '~/components/Skeletons'
import { PrimaryLink } from '~/components/Link'
import RatingStar from '~/components/RatingStar'

interface TableHeadProps {
  isCompetition: boolean
}

function TableHead ({ isCompetition }: TableHeadProps) {
  const { t } = useTranslate()

  return (
    <Thead>
      <Tr>
        <Th>
          {t('trades_participants_th_name')}
        </Th>
        <Th>
          {t('trades_participants_th_rating')}
        </Th>
        <Th>
          {t('trades_participants_th_bet')}
        </Th>
        <Th>
          {t('trades_participants_th_total')}
        </Th>
        {isCompetition && (
          <Th isNumeric={true}>
            {t('trades_participants_th_proposal')}
          </Th>
        )}
      </Tr>
    </Thead>
  )
}

interface Props {
  participants: TTradesParticipant[]
  isLoading: boolean
  currencyName: string
  isCompetition?: boolean
}

export default function TradeParticipantsTable (props: Props): ReactElement {
  const { participants, isLoading, currencyName, isCompetition } = props

  const { t } = useTranslate()

  if (isLoading) {
    return (
      <TableSkeleton
        columnCount={4}
        rowCount={4}
      />
    )
  }

  if (isEmpty(participants)) {
    return (
      <TableOverflow>
        <Table>
          <TableHead isCompetition={isCompetition} />
        </Table>
        <TableEmptyData />
      </TableOverflow>
    )
  }

  return (
    <TableOverflow>
      <Table>
        <TableHead isCompetition={isCompetition} />
        <Tbody>
          {participants.map(item => {
            const id = prop('id', item)
            const fullName = prop('fullName', item)
            const rating = prop('rating', item)
            const proposedAmount = numberFormat(prop('proposedAmount', item), currencyName)
            const totalPrice = numberFormat(prop('totalPrice', item), currencyName)
            const description = prop('description', item) || t('table_no_data')
            const document = prop('document', item)
            const userDetailUrl = sprintf(USER_DETAIL_URL, id)
            const hasExtraInfo = !!document || !!description

            return (
              <Tr key={id}>
                <Td>
                  <PrimaryLink href={userDetailUrl}>
                    {fullName}
                  </PrimaryLink>
                </Td>
                <Td>
                  <RatingStar value={rating} isReadOnly={true} />
                </Td>
                <Td>{proposedAmount}</Td>
                <Td>{totalPrice}</Td>
                {(isCompetition && hasExtraInfo) && (
                  <Td isNumeric={true}>
                    <Popover isLazy={true} placement={'bottom-end'}>
                      <PopoverTrigger>
                        <Button size={'xs'}>
                          {t('trades_participants_extra_info')}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        bgColor={'gray.100'}
                        borderColor={'gray.200'}
                        boxShadow={'base'}
                        fontSize={'md'}
                        textAlign={'initial'}
                        outline={'none'}
                        _focus={{ boxShadow: null }}>
                        <PopoverHeader pt={4} px={6} fontWeight={'bold'} border={'unset'}>
                          {t('input_trades_participate_description_label')}
                        </PopoverHeader>

                        <PopoverBody px={6}>{description}</PopoverBody>

                        {document && (
                          <PopoverFooter border={'unset'} px={6} pb={6}>
                            <Link colorScheme={'primary'} fontWeight={'bold'} isExternal={true} href={document?.file}>
                              {t('input_trades_participate_document_label')}
                            </Link>
                          </PopoverFooter>
                        )}
                      </PopoverContent>
                    </Popover>
                  </Td>
                )}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableOverflow>
  )
}
