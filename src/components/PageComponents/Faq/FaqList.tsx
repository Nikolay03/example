import { Fragment, ReactElement } from 'react'
import { defaultTo, filter, isEmpty, not, pipe, prop, propEq } from 'ramda'
import { Minus, Plus } from 'react-feather'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Center,
  Circle,
  Stack,
  Text
} from '@chakra-ui/react'

import FaqSkeleton from './FaqSkeleton'

import { TFaqGrouped } from '~/types/faq'
import { useTranslate } from '~/utils/translate'
import { SubTitle } from '~/components/Titles'
import Pagination from '~/components/Pagination'

interface AccordionIconProps {
  isExpanded: boolean
}

function AccordionIcon (props: AccordionIconProps) {
  const { isExpanded } = props

  return (
    <Circle
      bgColor={'primary.500'}
      color={'white'}
      my={'1px'}
      size={5}>
      {isExpanded
        ? <Minus size={14} />
        : <Plus size={14} />
      }
    </Circle>
  )
}

interface FaqListProps {
  list: TFaqGrouped[]
  count: number
  isLoading: boolean
}

export default function FaqList (props: FaqListProps): ReactElement {
  const { list, count, isLoading } = props

  const { t } = useTranslate()

  const filteredList = pipe<TFaqGrouped[], TFaqGrouped[], TFaqGrouped[]>(
    defaultTo([]),
    filter(pipe(propEq('count', 0), not))
  )(list)

  if (isLoading) {
    return (
      <FaqSkeleton />
    )
  }

  if (isEmpty(filteredList)) {
    return (
      <Center>
        {t('table_no_data')}
      </Center>
    )
  }

  return (
    <Fragment>
      <Stack spacing={6}>
        {filteredList.map(item => {
          const id = prop('id', item)
          const title = prop('title', item)
          const faqs = prop('faqs', item)

          return (
            <Box
              key={id}
              bgColor={'gray.100'}
              p={{ base: 4, md: 6 }}
              borderRadius={{ base: 'lg', md: '2xl' }}>
              <SubTitle>{title}</SubTitle>
              <Accordion allowMultiple={true}>
                <Stack spacing={{ base: 4, md: 6 }}>
                  {faqs.map(faq => {
                    const id = prop('id', faq)
                    const question = prop('question', faq)
                    const answer = prop('answer', faq)

                    return (
                      <AccordionItem key={id}>
                        {({ isExpanded }) => (
                          <Fragment>
                            <AccordionButton>
                              <Stack align={'baseline'} direction={'row'} spacing={6}>
                                <AccordionIcon isExpanded={isExpanded} />
                                <Box>{question}</Box>
                              </Stack>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                              <Text>{answer}</Text>
                            </AccordionPanel>
                          </Fragment>
                        )}
                      </AccordionItem>
                    )
                  })}
                </Stack>
              </Accordion>
            </Box>
          )
        })}
      </Stack>

      <Pagination totalRecords={count} />
    </Fragment>
  )
}
