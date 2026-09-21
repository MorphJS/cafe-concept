import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/**
 * Patron de "reveal" al hacer scroll: fade + desplazamiento sutil,
 * disparado una sola vez cuando el elemento entra al viewport.
 * `margin` adelanta el disparo antes de que el elemento sea 100% visible,
 * para que se sienta fluido y no como una animacion tardia.
 */
export function RevealOnScroll({ children, delay = 0, y = 24, className }: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Igual que RevealOnScroll pero anima a los hijos directos en cascada
 * (stagger). Util para listas de beneficios, tarjetas, etc.
 */
export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
