import { Fragment, ReactElement, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const springTransition = {
  type: 'spring',
  damping: 20,
  duration: 0.5,
  stiffness: 100,
  when: 'afterChildren'
}

const animationVariants = {
  slide: {
    initial: {
      x: 0,
      y: -30,
      opacity: 0
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1
    },
    exit: {
      x: 0,
      y: -30,
      opacity: 0
    }
  }
}

interface Props {
  id: any
  children: ReactNode
  disableAnimation?: boolean
}

export default function PageTransition (props: Props): ReactElement {
  const { id, children, disableAnimation } = props

  if (disableAnimation) {
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }

  return (
    <AnimatePresence exitBeforeEnter={true}>
      <motion.div
        key={id}
        variants={animationVariants.slide}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        transition={springTransition}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
