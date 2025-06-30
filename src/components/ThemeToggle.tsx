'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      className="absolute top-4 right-4"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </Button>
  )
}
