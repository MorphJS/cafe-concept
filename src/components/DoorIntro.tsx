import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const KEY = 'ep-intro-visto'

/** La intro se salta con prefers-reduced-motion o si ya se vio en esta sesion. */
export function debeMostrarIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

const EASE = [0.76, 0, 0.24, 1] as const

function Puerta({ lado, onEnd }: { lado: 'izq' | 'der'; onEnd?: () => void }) {
  const izq = lado === 'izq'
  return (
    <motion.div
      variants={{ abierta: { x: izq ? '-101%' : '101%' } }}
      transition={{ duration: 1.25, ease: EASE }}
      onAnimationComplete={(def) => def === 'abierta' && onEnd?.()}
      className={`absolute inset-y-0 w-1/2 bg-[#2b211a] ${izq ? 'left-0' : 'right-0'}`}
    >
      {/* paneles de la puerta */}
      <div className="absolute inset-[7%] border border-[#4a3a2e]" />
      <div className="absolute inset-[13%] border border-[#3a2d23]" />
      {/* manija */}
      <div
        className={`absolute top-1/2 h-24 w-2 -translate-y-1/2 rounded-full bg-[#d9853f] ${
          izq ? 'right-6' : 'left-6'
        }`}
      />
      {/* sombra hacia la rendija central */}
      <div
        className={`absolute inset-y-0 w-16 ${
          izq ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
        } from-black/40 to-transparent`}
      />
    </motion.div>
  )
}

/**
 * Intro: dos puertas cerradas con una cerradura al centro. La llave "gira"
 * (la cerradura brilla), las puertas se abren hacia los lados y dejan ver el
 * hero, que ya esta renderizado debajo (sin saltos de layout ni recarga de
 * imagen). Se puede saltar con click / Escape.
 */
export function DoorIntro({ onDone }: { onDone: () => void }) {
  const [fase, setFase] = useState<'cerrada' | 'abierta'>('cerrada')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setFase('abierta'), 1300)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setFase('abierta')
    window.addEventListener('keydown', esc)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [])

  const terminar = () => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* sin storage: la intro simplemente se repetira */
    }
    onDone()
  }

  return (
    <motion.div
      role="presentation"
      initial="cerrada"
      animate={fase}
      onClick={() => setFase('abierta')}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      aria-hidden
    >
      <Puerta lado="izq" />
      <Puerta lado="der" onEnd={terminar} />

      {/* cerradura central */}
      <motion.div
        variants={{
          cerrada: { opacity: 1, scale: 1 },
          abierta: { opacity: 0, scale: 1.6, transition: { duration: 0.5 } },
        }}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-center"
      >
        <motion.svg
          width="64"
          height="88"
          viewBox="0 0 64 88"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.circle
            cx="32"
            cy="30"
            r="22"
            fill="#d9853f"
            animate={{ filter: ['drop-shadow(0 0 0px #d9853f)', 'drop-shadow(0 0 18px #d9853f)'] }}
            transition={{ duration: 0.9, delay: 0.5 }}
          />
          <path d="M26 44 L38 44 L42 80 L22 80 Z" fill="#d9853f" />
          <circle cx="32" cy="28" r="7" fill="#2b211a" />
          <path d="M29.5 32 L34.5 32 L36 52 L28 52 Z" fill="#2b211a" />
        </motion.svg>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-script text-4xl text-[#f5ede3]"
        >
          Entre Puertas
        </motion.p>
      </motion.div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          setFase('abierta')
        }}
        className="font-mono-label absolute bottom-6 right-6 z-10 text-[10px] text-[#a5937f] hover:text-[#f5ede3]"
      >
        Saltar
      </button>
    </motion.div>
  )
}
