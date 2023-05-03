import { ReactElement, Fragment, useState } from 'react'
import { find, isEmpty, path, pathEq, pipe, prop } from 'ramda'
import { ExternalLink } from 'react-feather'
import {
  Button,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import { sprintf } from 'sprintf-js'

import { TRADE_CHOOSE_WINNER } from '~/constants/api'
import { USER_DETAIL_URL } from '~/constants/routes'
import { TTradesParticipantWinner } from '~/types/trades'
import { TRefetchList } from '~/types/hooks'
import { getUserReputation } from '~/utils/get'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { TableContainer, TableOverflow, TableEmptyData } from '~/components/Table'
import { TableSkeleton } from '~/components/Skeletons'
import { PopModal, ModalDescription } from '~/components/Modal'

function TableHead () {
  const { t } = useTranslate()

  return (
    <Thead>
      <Tr>
        <Th>{t('trades_participants_th_name')}</Th>
        <Th>{t('trades_participants_th_total')}</Th>
        <Th>{t('trades_participants_th_rating')}</Th>
        <Th minW={'sm'}>{t('trades_participants_th_description')}</Th>
        <Th isNumeric={true}>{t('trades_table_th_action')}</Th>
      </Tr>
    </Thead>
  )
}

interface Props {
  results: TTradesParticipantWinner[]
  isLoading: boolean
  bargain: string | string[]
  refetch: TRefetchList
}

export default function TradeWinnerTable (props: Props): ReactElement {
  const { results, isLoading, bargain, refetch } = props

  const { t, translateData } = useTranslate()

  const toast = useToast()

  const [winner, setWinner] = useState<number>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const chooseWinner = useCreate(TRADE_CHOOSE_WINNER)

  const firstParticipant = results?.[0]
  const hasWinner: boolean = firstParticipant?.isWinner ?? false

  function onSelectWinner (id: number) {
    setWinner(id)
    onOpen()
  }

  function onChooseWinner () {
    return chooseWinner.create({ bargain, user: winner })
      .then(() => {
        const winnerName = pipe(
          find(pathEq(['user', 'id'], winner)),
          path(['user', 'name'])
        )(results)

        toast({
          title: t('trades_choose_winner_success_title'),
          description: t('trades_choose_winner_success_message', {
            tradeId: bargain,
            winner: winnerName
          }),
          status: 'success'
        })
      })
      .then(onClose)
      .then(() => {
        refetch({ bargain, page: 1 })
        setWinner(null)
      })
      .catch(({ detail }) => {
        toast({
          title: t('error_default_label'),
          description: detail,
          status: 'error'
        })
      })
  }

  const modalButtonProps = {
    borderRadius: 'xl',
    size: 'lg'
  }

  if (isLoading) {
    return (
      <TableContainer>
        <TableSkeleton
          columnCount={5}
          rowCount={4}
        />
      </TableContainer>
    )
  }

  return (
    <Fragment>
      <TableContainer>
        <TableOverflow>
          <Table>
            <TableHead />
            <Tbody>
              {results.map(item => {
                const id = prop('id', item)
                const bargain = prop('bargain', item)
                const user = prop('user', item)
                const userId = prop('id', user)
                const userName = prop('name', user)
                const userRating = getUserReputation(user)
                const proposedAmount = prop('proposedAmount', item)
                const currency = prop('currency', bargain)
                const currencyName = translateData(currency, 'designation')
                const totalAmount = numberFormat(proposedAmount, currencyName)
                const description = prop('description', item)
                const document = prop('document', item)
                const isWinner = prop('isWinner', item)

                const userProfileUrl = sprintf(USER_DETAIL_URL, userId)
                const formedUserName = isWinner
                  ? `${userName} (${t('trades_detail_winner_label')})`
                  : userName

                return (
                  <Tr key={id}>
                    <Td>{formedUserName}</Td>
                    <Td>{totalAmount}</Td>
                    <Td>{userRating}</Td>
                    <Td>{description}</Td>
                    <Td>
                      <Stack
                        align={'center'}
                        direction={'row'}
                        justify={'flex-end'}
                        spacing={4}>
                        {document && (
                          <Button
                            as={Link}
                            isExternal={true}
                            href={document.file}
                            size={'xs'}
                            variant={'outline'}>
                            {t('trades_participants_download_doc_button')}
                          </Button>
                        )}

                        {isWinner && (
                          <Button
                            as={Link}
                            isExternal={true}
                            href={userProfileUrl}
                            size={'xs'}
                            variant={'outline'}>
                            <Icon as={ExternalLink} boxSize={5} />
                          </Button>
                        )}

                        {!hasWinner && (
                          <Button size={'xs'} onClick={onSelectWinner.bind(null, userId)}>
                            {t('trades_choose_winner_button')}
                          </Button>
                        )}
                      </Stack>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>

          {isEmpty(results) && (
            <TableEmptyData>
              {t('trades_choose_winner_no_data')}
            </TableEmptyData>
          )}
        </TableOverflow>
      </TableContainer>

      <PopModal
        title={t('trades_choose_winner_modal_title')}
        isOpen={isOpen}
        onClose={onClose}>
        <Stack align={'center'} spacing={8}>
          <ModalDescription>
            {t('trades_choose_winner_modal_description')}
          </ModalDescription>

          <SimpleGrid columns={2} spacing={4} w={'xs'}>
            <Button {...modalButtonProps} variant={'secondary'} onClick={onClose}>
              {t('button_cancel')}
            </Button>
            <Button {...modalButtonProps} isLoading={chooseWinner.isLoading} onClick={onChooseWinner}>
              {t('button_confirm')}
            </Button>
          </SimpleGrid>
        </Stack>
      </PopModal>
    </Fragment>
  )
}
