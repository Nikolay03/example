import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { Eye, EyeOff } from 'react-feather'
import { Icon, IconButton, InputProps, useBoolean } from '@chakra-ui/react'

import useFieldRules from '../useFieldRules'
import Input from '../Basic/Input'

import { useTranslate } from '~/utils/translate'
import { FormFieldProps } from '~/types/components'

interface Props extends FormFieldProps<InputProps> {
  isConfirm?: boolean
  passwordFieldName?: string
}

export default function PasswordField (props: Props): ReactElement {
  const { name, isConfirm, passwordFieldName, ...restProps } = props

  const { t } = useTranslate()

  const [isHidden, setHidden] = useBoolean(true)

  const { passwordRules } = useFieldRules()

  const { watch } = useFormContext()

  const rightElement = (
    <IconButton
      aria-label={'Show/Hide password'}
      color={'gray.500'}
      colorScheme={'gray'}
      h={8}
      w={8}
      minW={'unset'}
      onClick={setHidden.toggle}
      tabIndex={-1}
      icon={<Icon as={isHidden ? EyeOff : Eye} boxSize={5} />}
    />
  )

  const commonProps = {
    name,
    elementProps: { right: 2 },
    rightElement,
    type: isHidden ? 'password' : 'text'
  }

  if (isConfirm) {
    const passwordValue = watch(passwordFieldName)

    const confirmRules = {
      required: true,
      validate: passwordConfirm => {
        const passwordsMatching = passwordValue === passwordConfirm
        return passwordsMatching ? undefined : t('field_error_password_confirm')
      }
    }

    return (
      <Input
        rules={confirmRules}
        {...commonProps}
        {...restProps}
      />
    )
  }

  return (
    <Input
      rules={passwordRules}
      {...commonProps}
      {...restProps}
    />
  )
}
