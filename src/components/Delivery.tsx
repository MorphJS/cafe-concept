import { ArrowUpRight, Bike, MessageCircle, Store } from 'lucide-react'
import { NEGOCIO, whatsappLink } from '../data/negocio'
import { useCart } from '../lib/cart'
import { RevealOnScroll, StaggerItem, StaggerReveal } from './RevealOnScroll'

const PASOS = [
  ['1', 'Arma tu pedido', 'Suma productos desde el menú.'],
  ['2', 'Envíalo por WhatsApp', 'Llega ya redactado, solo confirmas.'],
  ['3', 'Recíbelo o recógelo', 'A domicilio o pasa por él a la sucursal.'],
]

/** Seccion dedicada a ventas a domicilio: canal directo primero, apps despues. */
export function Delivery() {
  const { setAbierto } = useCart()

  return (
    <section id="pedir" className="border-t border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <RevealOnScroll className="max-w-xl">
          <span className="font-mono-label text-xs text-[var(--color-accent)]">A domicilio</span>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight md:text-5xl">
            Tu café favorito, en tu puerta.
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">Elige cómo prefieres pedir. Directo con nosotros es lo más rápido.</p>
        </RevealOnScroll>

        <StaggerReveal className="mt-12 grid gap-4 md:grid-cols-3">
          <StaggerItem>
            <div className="flex h-full flex-col rounded-2xl bg-[var(--color-accent)] p-7 text-white">
              <span className="font-mono-label mb-6 self-start rounded-full bg-white/20 px-3 py-1 text-[10px]">
                Recomendado
              </span>
              <MessageCircle size={28} />
              <h3 className="font-display mt-4 text-2xl">Pedido directo</h3>
              <p className="mt-2 flex-1 text-sm">Por WhatsApp, a domicilio o para recoger. Arma tu pedido en la página.</p>
              <button
                onClick={() => setAbierto(true)}
                className="font-mono-label mt-6 inline-flex items-center justify-between rounded-full bg-[var(--color-ink)] px-5 py-3 text-xs text-white"
              >
                Armar pedido <ArrowUpRight size={14} />
              </button>
              <a
                href={whatsappLink('Hola Entre Puertas, tengo una pregunta.')}
                target="_blank"
                rel="noopener"
                className="mt-3 text-center text-xs underline underline-offset-4"
              >
                O escríbenos directo
              </a>
            </div>
          </StaggerItem>

          {[
            { n: 'Rappi', href: NEGOCIO.redes.rappi },
            { n: 'Didi Food', href: NEGOCIO.redes.didi },
          ].map((p) => (
            <StaggerItem key={p.n}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--color-line)] p-7">
                <span className="font-mono-label mb-6 self-start text-[10px] text-[var(--color-muted)]">App de reparto</span>
                <Bike size={28} className="text-[var(--color-ink)]" />
                <h3 className="font-display mt-4 text-2xl">{p.n}</h3>
                <p className="mt-2 flex-1 text-sm text-[var(--color-muted)]">Si ya tienes la app, pídenos ahí y sigue tu pedido en tiempo real.</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  className="font-mono-label mt-6 inline-flex items-center justify-between rounded-full border border-[var(--color-line)] px-5 py-3 text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  Abrir {p.n} <ArrowUpRight size={14} />
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <ol className="mt-14 grid gap-6 border-t border-[var(--color-line)] pt-10 md:grid-cols-3">
          {PASOS.map(([n, t, d]) => (
            <li key={n} className="flex gap-4">
              <span className="font-script text-5xl leading-none text-[var(--color-accent)]">{n}</span>
              <div>
                <p className="font-medium">{t}</p>
                <p className="text-sm text-[var(--color-muted)]">{d}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <Store size={16} /> ¿Prefieres recoger? Pide y pasa a la sucursal que te quede mejor.
        </p>
      </div>
    </section>
  )
}
