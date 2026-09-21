import { useEffect, useState } from 'react'
import { Clock, MapPin } from 'lucide-react'
import { RevealOnScroll } from './RevealOnScroll'

const HORARIO = { apertura: 8, cierre: 21 } // 8am - 9pm, ajustar con datos reales

function useEstaAbierto() {
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    const revisar = () => {
      const hora = new Date().getHours()
      setAbierto(hora >= HORARIO.apertura && hora < HORARIO.cierre)
    }
    revisar()
    const id = setInterval(revisar, 60_000)
    return () => clearInterval(id)
  }, [])

  return abierto
}

export function Location() {
  const abierto = useEstaAbierto()

  return (
    <section id="ubicacion" className="border-t border-[var(--color-line)] px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <RevealOnScroll>
          <span className="font-mono-label text-xs text-[var(--color-accent)]">Visitanos</span>
          <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
            Te esperamos
          </h2>

          <div className="mt-8 space-y-4 text-[var(--color-muted)]">
            <p className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              Direccion del local, Puebla de Zaragoza, Mexico
            </p>
            <p className="flex items-center gap-3">
              <Clock size={18} className="shrink-0" />
              8:00 am - 9:00 pm, todos los dias
              <span
                className={`font-mono-label rounded-full px-2 py-0.5 text-xs ${
                  abierto
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-line)] text-[var(--color-muted)]'
                }`}
              >
                {abierto ? 'Abierto ahora' : 'Cerrado ahora'}
              </span>
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="overflow-hidden rounded-sm border border-[var(--color-line)]">
          <iframe
            title="Mapa de ubicacion"
            className="h-72 w-full md:h-full"
            loading="lazy"
            src="https://www.google.com/maps?q=Puebla+de+Zaragoza,+Mexico&output=embed"
          />
        </RevealOnScroll>
      </div>
    </section>
  )
}
