import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { Button } from './Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  return (
    <motion.header
      animate={{
        paddingBlock: scrolled ? 12 : 24,
        backgroundColor: scrolled ? 'var(--color-surface)' : 'transparent',
        borderColor: scrolled ? 'var(--color-line)' : 'transparent',
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 z-50 w-full border-b backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <span className="font-mono-label text-sm">Entre Puertas</span>
        <nav className="hidden gap-8 font-mono-label text-xs text-[var(--color-muted)] md:flex">
          <a href="#menu" className="transition-colors hover:text-[var(--color-ink)]">
            Menu
          </a>
          <a href="#galeria" className="transition-colors hover:text-[var(--color-ink)]">
            Galeria
          </a>
          <a href="#ubicacion" className="transition-colors hover:text-[var(--color-ink)]">
            Ubicacion
          </a>
        </nav>
        <Button variant="ghost" className="hidden md:inline-flex">
          Pedir ahora
        </Button>
      </div>
    </motion.header>
  )
}
