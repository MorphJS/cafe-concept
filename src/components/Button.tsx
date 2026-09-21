import { motion } from 'motion/react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'ghost' | 'light'

const base =
  'relative inline-flex items-center justify-center gap-2 px-6 py-3 font-mono-label text-xs font-medium overflow-hidden rounded-full'

const styles: Record<Variant, string> = {
  primary: 'bg-[var(--color-ink)] text-[var(--color-bg)]',
  ghost: 'border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-ink)] transition-colors',
  light: 'bg-[var(--color-accent)] text-white',
}

function Inner({ variant, children }: { variant: Variant; children: ReactNode }) {
  return (
    <>
      <motion.span
        variants={{ hover: { y: -1 } }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 inline-flex items-center gap-2"
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
    </>
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={cn(base, styles[variant], className)}
      {...(props as Record<string, unknown>)}
    >
      <Inner variant={variant}>{children}</Inner>
    </motion.button>
  )
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  children: ReactNode
}

export function ButtonLink({ variant = 'primary', className, children, ...props }: LinkProps) {
  return (
    <motion.a
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={cn(base, styles[variant], className)}
      {...(props as Record<string, unknown>)}
    >
      <Inner variant={variant}>{children}</Inner>
    </motion.a>
  )
}
