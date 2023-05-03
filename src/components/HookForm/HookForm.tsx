import { FormEvent, ReactElement, ReactNode, useEffect } from 'react'
import { always, defaultTo, isEmpty, mapObjIndexed, not } from 'ramda'
import { FormProvider, useForm, FieldValues, UseFormProps, UseFormReturn } from 'react-hook-form'

import { replaceNilValues } from '~/utils/object'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useSubmitForm } from '~/hooks/form'

interface RenderProps extends UseFormReturn {
  onSubmitForm: (event) => void
}

interface Props extends UseFormProps {
  children?: ReactNode
  isPromise?: boolean
  onSubmit: (values?: FieldValues) => Promise<void> | void
  render?: (props: RenderProps) => ReactElement
  resetOnSuccess?: boolean
}

function HookForm (props: Props): ReactElement {
  const {
    defaultValues,
    children,
    isPromise,
    onSubmit,
    mode,
    render,
    resetOnSuccess
  } = props

  const formedDefaultValues = replaceNilValues(defaultValues)

  const { t } = useTranslate()

  const toast = useToast()

  const methods = useForm({
    mode,
    reValidateMode: 'onBlur',
    defaultValues: formedDefaultValues
  })

  useEffect(() => {
    if (defaultValues) {
      methods.reset(formedDefaultValues)
    }
  }, [JSON.stringify(defaultValues)])

  const { getSubmitErrors } = useSubmitForm()

  async function handleSubmitForm (values) {
    try {
      await onSubmit(values)
      if (resetOnSuccess) {
        const touchedFields = methods.formState.touchedFields
        methods.reset(mapObjIndexed(always(''), touchedFields))
      }
    }
    catch (error) {
      const { nonFieldError, errors } = getSubmitErrors(error)

      if (not(isEmpty(errors))) {
        mapObjIndexed((value, key) => {
          methods.setError(key, {
            type: 'manual',
            message: value
          })
        }, errors)
      }

      if (nonFieldError) {
        const nonFieldErrorMessage = defaultTo('Unable to connect to server', nonFieldError)

        toast({
          title: t('error_default_label'),
          description: nonFieldErrorMessage,
          status: 'error'
        })
      }
      return error
    }
  }

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation()
    if (isPromise) return methods.handleSubmit(handleSubmitForm)(event)
    return methods.handleSubmit(onSubmit)(event)
  }

  if (typeof render === 'function') {
    return (
      <FormProvider {...methods}>
        {render({ ...methods, onSubmitForm })}
      </FormProvider>
    )
  }

  return (
    <FormProvider {...methods}>
      <form style={{ height: '100%' }} onSubmit={onSubmitForm}>
        {children}
      </form>
    </FormProvider>
  )
}

HookForm.defaultProps = {
  isPromise: true,
  mode: 'onBlur'
}

export default HookForm
