import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface MarqueeProps {
  items: ReactNode[]
  speed?: number
  className?: string
}

/**
 * Carrusel infinito (marquee) para prueba social / logos de clientes.
 * Duplicamos el contenido una vez y animamos -50%, lo que produce un loop
 * perfecto sin saltos si el contenido duplicado es identico.
 */
export function Marquee({ items, speed = 30, className }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="flex w-max gap-16"
        animate={{ x: '-50%' }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
