import { useEffect, useState } from 'react'
import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { NEGOCIO, estaAbierto } from '../data/negocio'
import { RevealOnScroll } from './RevealOnScroll'

function useAbierto() {
  const [abierto, setAbierto] = useState(estaAbierto)
  useEffect(() => {
    const id = setInterval(() => setAbierto(estaAbierto()), 60_000)
    return () => clearInterval(id)
  }, [])
  return abierto
}

/** Dos sucursales con direccion real, mapa alternable y accion "como llegar". */
export function Location() {
  const abierto = useAbierto()
  const [sel, setSel] = useState(0)
  const suc = NEGOCIO.sucursales[sel]

  return (
    <section id="ubicacion" className="border-t border-[var(--color-line)] px-6 py-24 pb-32 md:pb-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <RevealOnScroll>
          <span className="font-mono-label text-xs text-[var(--color-accent)]">Visítanos</span>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight md:text-5xl">Dos puertas en Puebla</h2>

          <div className="mt-8 space-y-3">
            {NEGOCIO.sucursales.map((s, i) => (
              <button
                key={s.nombre}
                onClick={() => setSel(i)}
                className={`block w-full rounded-xl border p-5 text-left transition-colors ${
                  sel === i ? 'border-[var(--color-ink)] bg-[var(--color-surface)]' : 'border-[var(--color-line)] hover:border-[var(--color-muted)]'
                }`}
              >
                <p className="font-display text-xl">{s.nombre}</p>
                <p className="mt-1 flex items-start gap-2 text-sm text-[var(--color-muted)]">
                  <MapPin size={16} className="mt-0.5 shrink-0" /> {s.direccion}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3 text-[var(--color-muted)]">
            <p className="flex flex-wrap items-center gap-3">
              <Clock size={18} className="shrink-0" /> {NEGOCIO.horario}
              <span
                className={`font-mono-label rounded-full px-2 py-0.5 text-[10px] ${
                  abierto ? 'bg-emerald-600 text-white' : 'bg-[var(--color-line)]'
                }`}
              >
                {abierto ? 'Abierto ahora' : 'Cerrado ahora'}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={18} className="shrink-0" />
              <a href={NEGOCIO.telefonoHref} className="underline underline-offset-4">{NEGOCIO.telefono}</a>
            </p>
          </div>

          <a
            href={suc.mapa}
            target="_blank"
            rel="noopener"
            className="font-mono-label mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-xs text-[var(--color-bg)]"
          >
            <Navigation size={14} /> Cómo llegar
          </a>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="overflow-hidden rounded-2xl border border-[var(--color-line)]">
          <iframe key={suc.embed} title={`Mapa ${suc.nombre}`} className="h-80 w-full md:h-full md:min-h-[26rem]" loading="lazy" src={suc.embed} />
        </RevealOnScroll>
      </div>
    </section>
  )
}
