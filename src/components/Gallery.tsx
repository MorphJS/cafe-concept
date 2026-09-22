import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { RevealOnScroll, StaggerItem, StaggerReveal } from './RevealOnScroll'

/**
 * Fotos de stock (Unsplash) como placeholder -- reemplazar por fotos
 * reales del local y los platillos en cuanto se tengan.
 */
const fotos = [
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80', alt: 'Taza de cafe con arte latte' },
  { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80', alt: 'Repostería recién horneada' },
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80', alt: 'Mesa de desayuno servida' },
  { src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80', alt: 'Grano de café tostado' },
  { src: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=80', alt: 'Interior de una cafetería' },
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&q=80', alt: 'Café servido en mesa de madera' },
]

export function Gallery() {
  const [abierta, setAbierta] = useState<number | null>(null)

  return (
    <section id="galeria" className="border-t border-[var(--color-line)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll>
          <span className="font-mono-label text-xs text-[var(--color-accent)]">Galeria</span>
          <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">El lugar</h2>
        </RevealOnScroll>

        <StaggerReveal className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {fotos.map((foto, i) => (
            <StaggerItem key={foto.src}>
              <button
                onClick={() => setAbierta(i)}
                className="block aspect-square w-full overflow-hidden rounded-sm"
              >
                <img
                  src={foto.src}
                  alt={foto.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </button>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>

      <AnimatePresence>
        {abierta !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAbierta(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          >
            <button
              onClick={() => setAbierta(null)}
              className="absolute right-6 top-6 text-white/70 hover:text-white"
              aria-label="Cerrar"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              src={fotos[abierta].src}
              alt={fotos[abierta].alt}
              className="max-h-[85vh] max-w-full rounded-sm object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
