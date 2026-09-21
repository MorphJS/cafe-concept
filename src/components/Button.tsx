import { motion } from 'motion/react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  children: ReactNode
}

/**
 * Boton con micro-interaccion de hover (subrayado que crece + leve
 * levantamiento). El "magnetismo" real (seguir al cursor) se deja fuera
 * a proposito: es un efecto que se ve muy sobreusado; este es mas sutil
 * y funciona igual de bien como CTA.
 */
export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const base =
    'relative inline-flex items-center gap-2 px-6 py-3 font-mono-label text-xs font-medium overflow-hidden'

  const styles =
    variant === 'primary'
      ? 'bg-[var(--color-ink)] text-[var(--color-bg)]'
      : 'border border-[var(--color-line)] text-[var(--color-ink)]'

  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={cn(base, styles, className)}
      {...(props as never)}
    >
      <motion.span
        variants={{ hover: { y: -1 } }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.span>
      {variant === 'primary' && (
        <motion.span
          variants={{ hover: { scaleX: 1 } }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="absolute inset-0 bg-[var(--color-accent)]"
        />
      )}
    </motion.button>
  )
}
