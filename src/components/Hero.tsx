import { motion } from 'motion/react'
import { MessageCircle, Phone, Star } from 'lucide-react'
import { ButtonLink } from './Button'
import { NEGOCIO, estaAbierto, whatsappLink } from '../data/negocio'

const ease = [0.16, 1, 0.3, 1] as const

const FOTO = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'

/**
 * Hero: jerarquia clara (etiqueta -> titular -> apoyo -> CTA -> prueba social).
 * La cursiva se limita a UNA palabra del titular; el resto va en serif recto
 * para que el titular se lea de un vistazo. La foto se pide en 3 anchos
 * (srcSet) y NO se escala con transform, asi no se ve suave/borrosa.
 */
export function Hero({ delay }: { delay: number }) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: delay } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  }
  const abierto = estaAbierto()

  return (
    <section id="inicio" className="px-6 pb-20 pt-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="font-mono-label mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-[11px] text-[var(--color-muted)]"
          >
            <span
              className={`h-2 w-2 rounded-full ${abierto ? 'bg-emerald-500' : 'bg-[var(--color-muted)]'}`}
            />
            {abierto ? 'Abierto ahora' : 'Cerrado ahora'} · {NEGOCIO.horario}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl"
          >
            Café de <em className="font-medium text-[var(--color-accent)]">especialidad</em>, desayunos y antojos en Puebla.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-md text-lg text-[var(--color-muted)]">
            Pide a domicilio o pasa por tu muffin de elote. Dos sucursales, menú completo y pedido directo
            por WhatsApp.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={whatsappLink('Hola Entre Puertas, quiero hacer un pedido a domicilio.')} target="_blank" rel="noopener">
              <MessageCircle size={15} /> Pedir por WhatsApp
            </ButtonLink>
            <ButtonLink href="#menu" variant="ghost">
              Ver menú
            </ButtonLink>
            <ButtonLink href={NEGOCIO.telefonoHref} variant="ghost" className="md:hidden">
              <Phone size={14} /> Llamar
            </ButtonLink>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--color-line)] pt-6"
          >
            <div>
              <dt className="font-mono-label text-[10px] text-[var(--color-muted)]">Google</dt>
              <dd className="mt-1 flex items-center gap-1 font-display text-2xl">
                {NEGOCIO.rating.valor}
                <Star size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
              </dd>
              <dd className="text-xs text-[var(--color-muted)]">{NEGOCIO.rating.resenas} reseñas</dd>
            </div>
            <div>
              <dt className="font-mono-label text-[10px] text-[var(--color-muted)]">Sucursales</dt>
              <dd className="mt-1 font-display text-2xl">2</dd>
              <dd className="text-xs text-[var(--color-muted)]">Santiago y Juárez</dd>
            </div>
            <div>
              <dt className="font-mono-label text-[10px] text-[var(--color-muted)]">Especialidad</dt>
              <dd className="mt-1 font-display text-2xl">$26</dd>
              <dd className="text-xs text-[var(--color-muted)]">Muffin de elote</dd>
            </div>
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: delay * 0.6 }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-line)]"
        >
          <img
            src={`${FOTO}?auto=format&fit=crop&w=1200&q=90`}
            srcSet={`${FOTO}?auto=format&fit=crop&w=800&q=90 800w, ${FOTO}?auto=format&fit=crop&w=1200&q=90 1200w, ${FOTO}?auto=format&fit=crop&w=1800&q=90 1800w`}
            sizes="(min-width: 768px) 46vw, 92vw"
            alt="Interior cálido de una cafetería con mesas de madera"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
