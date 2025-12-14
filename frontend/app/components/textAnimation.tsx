'use client'

import { motion } from 'motion/react'

export default function TextAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div animate={{ opacity: 1, y: 0}} initial={{ opacity: 0, y: 10 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  )
}