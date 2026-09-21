import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu as MenuIcon, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../lib/cart'
import { NEGOCIO } from '../data/negocio'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'menu', label: 'Menú' },
  { id: 'pedir', label: 'A domicilio' },
  { id: 'ubicacion', label: 'Visítanos' },
]

function useSeccionActiva() {
  const [activa, setActiva] = useState('inicio')
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiva(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return activa
}

/**
 * Nav: se oculta al bajar y reaparece al subir, indicador "pill" que se
 * desliza a la seccion activa, barra de progreso de lectura, boton de
 * pedido con contador y menu a pantalla completa en movil.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [oculta, setOculta] = useState(false)
  const [movil, setMovil] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const activa = useSeccionActiva()
  const { count, setAbierto } = useCart()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setOculta(y > 400 && y > prev && !movil)
  })

  const pedir = () => {
    setMovil(false)
    setAbierto(true)
  }

  return (
    <>
      <motion.header
        animate={{ y: oculta ? '-100%' : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          animate={{
            paddingBlock: scrolled ? 10 : 20,
            backgroundColor: scrolled ? 'color-mix(in srgb, var(--color-bg) 82%, transparent)' : 'transparent',
          }}
          transition={{ duration: 0.3 }}
          className={`backdrop-blur-md ${scrolled ? 'border-b border-[var(--color-line)]' : ''}`}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <a href="#inicio" className="font-script text-3xl leading-none">
              {NEGOCIO.nombre}
            </a>

            <nav className="relative hidden gap-1 md:flex" aria-label="Principal">
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={`font-mono-label relative rounded-full px-4 py-2 text-xs transition-colors ${
                    activa === l.id ? 'text-[var(--color-bg)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {activa === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[var(--color-ink)]"
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={pedir}
                className="font-mono-label relative inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-xs text-white"
              >
                <ShoppingBag size={14} />
                <span className="hidden sm:inline">Mi pedido</span>
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="rounded-full bg-white px-1.5 text-[10px] text-[var(--color-accent)]"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={() => setMovil(true)}
                aria-label="Abrir menú"
                className="rounded-full border border-[var(--color-line)] p-2.5 md:hidden"
              >
                <MenuIcon size={16} />
              </button>
            </div>
          </div>
        </motion.div>
        <motion.div style={{ scaleX: progreso }} className="h-0.5 origin-left bg-[var(--color-accent)]" />
      </motion.header>

      <AnimatePresence>
        {movil && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#2b211a] px-6 py-6 text-[#f5ede3]"
          >
            <button onClick={() => setMovil(false)} aria-label="Cerrar" className="self-end rounded-full border border-white/20 p-2.5">
              <X size={16} />
            </button>
            <nav className="mt-10 flex flex-1 flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setMovil(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="font-display text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <button onClick={pedir} className="font-mono-label rounded-full bg-[var(--color-accent)] py-4 text-sm text-white">
              Hacer mi pedido
            </button>
            <p className="mt-4 text-center text-xs text-[#a5937f]">
              {NEGOCIO.horario} · {NEGOCIO.telefono}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
