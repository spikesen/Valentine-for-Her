'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  message?: string
  visible: boolean
  onClose?: () => void
}

export default function SaveToast({ message = 'Saved', visible, onClose }: Props) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => onClose && onClose(), 3000)
    return () => clearTimeout(t)
  }, [visible, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed right-6 bottom-6 z-50 bg-rose-600 text-white px-4 py-2 rounded-full shadow-lg"
        >
          <div className="text-sm font-medium">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
