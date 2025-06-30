'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for hydration so we know the real theme
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const toggleTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <motion.div
      // subtle hover lift
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="absolute top-4 right-4"
    >
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        onClick={toggleTheme}
        className="w-10 h-10 p-0"
      >
        {/* AnimatePresence swaps icons with fade+spin */}
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === 'dark' ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.35 }}
            > 
              <Sun className="w-5 h-5" />
              
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Moon className="w-5 h-5" />
            
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}
