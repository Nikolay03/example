import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Props as RSProps } from 'react-select'

import UsersSelectMenuList from './UsersSelectMenuList'
import UsersSelectOption from './UsersSelectOption'

import * as API from '~/constants/api'
import { useAuth } from '~/components/AuthProvider'
import { SelectField } from '~/components/HookForm'
import { ClientRender } from '~/components/Utils'

const components = {
  MenuList: UsersSelectMenuList,
  Option: UsersSelectOption
}

interface Props extends RSProps {
  name: string
}

export default function UsersMultiSelectField (props: Props): ReactElement {
  const { name, ...restProps } = props

  const { user } = useAuth()

  const userId = prop('id', user)

  return (
    <ClientRender>
      <SelectField
        name={name}
        api={API.USERS_REPUTATION_LIST}
        params={{ excludeId: userId }}
        components={components}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isMulti={true}
        menuPortalTarget={null}
        {...restProps}
      />
    </ClientRender>
  )
}
