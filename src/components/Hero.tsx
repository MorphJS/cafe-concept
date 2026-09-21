import { motion } from 'motion/react'
import { Button } from './Button'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

/**
 * Hero de dos columnas: texto a la izquierda (asimetrico, no centrado),
 * foto real del espacio a la derecha con un ligero "ken burns" (zoom
 * lentisimo). La foto es de stock (Unsplash) -- reemplazar por fotos
 * propias del local en cuanto se tengan.
 */
export function Hero() {
  return (
    <section className="px-6 pb-24 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="font-mono-label mb-6 inline-block border border-[var(--color-line)] px-3 py-1 text-xs text-[var(--color-muted)]"
          >
            Abre todos los dias, 8am - 9pm
          </motion.span>

          <motion.h1
            variants={item}
            className="max-w-lg text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl"
          >
            Cafe de
            <br />
            especialidad,
            <br />
            hecho a mano.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-sm text-lg text-[var(--color-muted)]">
            Desayunos, reposteria artesanal y el mejor espacio para trabajar
            o platicar con calma.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Button>Ver menu</Button>
            <Button variant="ghost">Pedir a domicilio</Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-sm"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80"
            alt="Interior calido de una cafeteria con mesas de madera"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
