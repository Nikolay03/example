import { Fragment, ReactElement } from 'react'
import { Box, Flex, SimpleGrid, Stack, useDisclosure } from '@chakra-ui/react'
import { prop } from 'ramda'
import { useRouter } from 'next/router'

import TradesCreateButtons from './TradesCreateButtons'

import * as API from '~/constants/api'
import * as ROUTES from '~/constants/routes'
import { UploadFileTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { useSubmitTrade, useUpdateTrade } from '~/hooks/form'
import { useWizard } from '~/components/Utils/Contexts'
import {
  CountrySelectField,
  HookForm,
  NumberInput,
  ProductAttributesSelect,
  SelectField,
  Textarea,
  FileUpload
} from '~/components/HookForm'
import { ProductsGroupModal } from '~/components/ProductsGroup'
import QualityStandardSelectField from '~/components/HookForm/Custom/QualityStandardSelectField'

export default function StepProductInfo (): ReactElement {
  const { t } = useTranslate()

  const router = useRouter()

  const { state, isUpdate } = useWizard()

  const {
    isOpen: isOpenProduct,
    onOpen: onOpenProduct,
    onClose: onCloseProduct
  } = useDisclosure()

  function onSubmitSuccess () {
    router.push(ROUTES.ACCOUNT_TRADES_URL)
  }

  const { onSubmit: onSubmitTrade, isLoading: isLoadingCreate } = useSubmitTrade(onSubmitSuccess)

  const { onSubmit: onUpdateTrade, isLoading: isLoadingUpdate } = useUpdateTrade(state.id, onSubmitSuccess)

  function onSubmit (values) {
    if (isUpdate) return onUpdateTrade(values)
    return onSubmitTrade({ ...state, ...values })
  }

  const isLoading = isUpdate ? isLoadingUpdate : isLoadingCreate

  return (
    <HookForm
      onSubmit={onSubmit}
      defaultValues={state}
      render={({ onSubmitForm, setValue, watch }) => {
        const commodityGroupClassifier = watch('commodityGroupClassifier')
        const commodityGroupClassifierId = prop('id', commodityGroupClassifier)

        function onConfirmProductGroup (productGroup) {
          setValue('commodityGroupClassifier', {
            id: productGroup
          })
          onCloseProduct()
        }
        return (
          <Fragment>
            <Box as={'form'} onSubmit={onSubmitForm}>
              <Stack spacing={6}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box cursor={'pointer'} onClick={onOpenProduct}>
                    <Box pointerEvents={'none'}>
                      <SelectField
                        name={'commodityGroupClassifier'}
                        api={API.PRODUCT_GROUP_CLASS_LIST}
                        label={t('input_trades_product_group_label')}
                        isMultiLang={true}
                        isRequired={true}
                        rules={{ required: true }}
                        size={'xl'}
                      />
                    </Box>
                  </Box>
                  <CountrySelectField
                    name={'manufacturerCountry'}
                    label={t('input_trades_producing_country_label')}
                    isMultiLang={true}
                    isRequired={true}
                    rules={{ required: true }}
                    size={'xl'}
                  />
                  <ProductAttributesSelect
                    name={'attributes'}
                    productId={commodityGroupClassifierId}
                    label={t('input_trades_product_attributes_label')}
                    size={'xl'}
                  />
                  <Flex
                    gridRowGap={4}
                    wrap={{ base: 'wrap', md: 'unset' }}>
                    <NumberInput
                      name={'volume'}
                      label={t('input_trades_product_volume_label')}
                      isRequired={true}
                      rules={{ required: true }}
                      min={0}
                      size={'xl'}
                    />
                    <Box
                      ml={{ base: 'unset', md: 1 }}
                      mt={{ base: 'unset', md: 6 }}
                      minW={{ base: 'unset', md: 40 }}
                      w={{ base: 'full', md: 'unset' }}>
                      <SelectField
                        name={'measurement'}
                        params={{ isActive: true }}
                        api={API.MEASUREMENT_LIST}
                        isMultiLang={true}
                        size={'xl'}
                      />
                    </Box>
                  </Flex>
                  <QualityStandardSelectField
                    name={'qualityStandard'}
                    label={t('input_trades_quality_standard')}
                    isRequired={false}
                    rules={{ required: false }}
                    size={'xl'}
                  />
                </SimpleGrid>

                <Textarea
                  name={'description'}
                  label={t('input_trades_product_description_label')}
                  size={'lg'}
                  isRequired={true}
                  rules={{ required: true }}
                />

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <NumberInput
                    name={'price'}
                    label={t('input_trades_product_price_label')}
                    isRequired={true}
                    rules={{ required: true }}
                    min={0}
                    size={'xl'}
                  />
                  <SelectField
                    name={'currency'}
                    api={API.CURRENCY_LIST}
                    label={t('input_trades_currency_label')}
                    isMultiLang={true}
                    isRequired={true}
                    multiLangKey={'designation'}
                    rules={{ required: true }}
                    size={'xl'}
                  />

                  <FileUpload
                    name={'documents'}
                    label={t('input_trades_product_documents_label')}
                    accept={[
                      UploadFileTypes.WORD,
                      UploadFileTypes.EXCEL,
                      UploadFileTypes.PDF,
                      UploadFileTypes.IMAGES
                    ]}
                    isMulti={true}
                    maxFiles={4}
                    borderRadius={'xl'}
                    size={'lg'}
                  />
                  <FileUpload
                    name={'images'}
                    label={t('input_trades_product_images_label')}
                    accept={UploadFileTypes.IMAGES}
                    isMulti={true}
                    maxFiles={4}
                    borderRadius={'xl'}
                    size={'lg'}
                  />
                </SimpleGrid>
              </Stack>

              <TradesCreateButtons isLoading={isLoading} />
            </Box>

            <ProductsGroupModal
              name={'productGroup'}
              type={'radio'}
              isOpen={isOpenProduct}
              onClose={onCloseProduct}
              // isDisabled={!productGroup}
              onConfirm={onConfirmProductGroup}
            />
          </Fragment>
        )
      }}
    />
  )
}
