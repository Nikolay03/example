import { ReactNode, ReactElement } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
}

export default function LayoutContent ({ children }: Props): ReactElement {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}>
      {children}
    </motion.div>
  )
}
