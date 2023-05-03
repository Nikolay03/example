import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

export type TStep = {
  id: number
  key: string
  title: string
}

type TStepperContext = {
  step: number
  steps: TStep[]
  toPrevStep: () => void
  toNextStep: () => void
  onResetStep: () => void
}

const StepperContext = createContext<TStepperContext>({
  step: null,
  steps: [],
  toPrevStep: null,
  toNextStep: null,
  onResetStep: null
})

export function useStepper (): TStepperContext {
  return useContext(StepperContext)
}

interface Props {
  children: ReactNode
  steps?: TStep[]
  initialStep?: number
}

export function StepperProvider (props: Props): ReactElement {
  const { children, initialStep, steps } = props

  const [step, setStep] = useState(initialStep)

  const toPrevStep = useCallback(() => {
    setStep(prevStep => prevStep - 1)
  }, [])

  const toNextStep = useCallback(() => {
    setStep(prevStep => prevStep + 1)
  }, [])

  const onResetStep = useCallback(() => {
    setStep(initialStep)
  }, [])

  const stepperProps = {
    step,
    steps,
    toPrevStep,
    toNextStep,
    onResetStep
  }

  return (
    <StepperContext.Provider value={stepperProps}>
      {children}
    </StepperContext.Provider>
  )
}

StepperProvider.defaultProps = {
  initialStep: 1,
  steps: []
}
