import { FormEvent, ReactElement, ReactNode, useCallback, useState } from 'react'
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

interface Props {
  action: string
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>, token: string) => void
}

export default function ReCaptcha (props: Props): ReactElement {
  const { children, onSubmit, action } = props

  const { executeRecaptcha } = useGoogleReCaptcha()
  const [token, setToken] = useState('')

  const verifyHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!executeRecaptcha) {
      return
    }

    executeRecaptcha('dynamicAction')
      .then((token: string) => {
        setToken(token)
      })
      .then(() => {
        onSubmit(event, token)
      })
  }, [executeRecaptcha])

  const handleReCaptchaVerify = useCallback(token => {
    setToken(token)
  }, [setToken])

  return (
    <form onSubmit={verifyHandler}>
      {children}
      <GoogleReCaptcha
        action={action}
        onVerify={handleReCaptchaVerify}
      />
    </form>
  )
}
