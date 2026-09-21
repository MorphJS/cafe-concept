import { AnimatePresence, motion } from 'motion/react'
import { Minus, MessageCircle, Phone, Plus, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../lib/cart'
import { NEGOCIO, whatsappLink } from '../data/negocio'

/** Panel lateral con el pedido; termina en un mensaje de WhatsApp ya redactado. */
export function OrderDrawer() {
  const { lineas, total, count, abierto, setAbierto, add, dec, clear, enviar } = useCart()
  const [modo, setModo] = useState<'domicilio' | 'recoger'>('domicilio')
  const [nombre, setNombre] = useState('')
  const [dir, setDir] = useState('')

  useEffect(() => {
    if (!abierto) return
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [abierto, setAbierto])

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAbierto(false)}
            className="fixed inset-0 z-[70] bg-black/50"
          />
          <motion.aside
            role="dialog"
            aria-label="Mi pedido"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-[var(--color-bg)] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-5">
              <h2 className="font-display text-2xl">Mi pedido</h2>
              <button onClick={() => setAbierto(false)} aria-label="Cerrar" className="rounded-full border border-[var(--color-line)] p-2">
                <X size={16} />
              </button>
            </header>

            {count === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <ShoppingBag size={32} className="text-[var(--color-muted)]" />
                <p className="text-[var(--color-muted)]">Aún no agregas nada. Explora el menú y toca un precio para sumarlo.</p>
                <a
                  href="#menu"
                  onClick={() => setAbierto(false)}
                  className="font-mono-label rounded-full bg-[var(--color-ink)] px-6 py-3 text-xs text-[var(--color-bg)]"
                >
                  Ver menú
                </a>
                <div className="mt-4 flex gap-4 text-sm">
                  <a href={NEGOCIO.telefonoHref} className="inline-flex items-center gap-1.5 underline underline-offset-4">
                    <Phone size={14} /> {NEGOCIO.telefono}
                  </a>
                  <a href={whatsappLink('Hola Entre Puertas')} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 underline underline-offset-4">
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-[var(--color-line)] overflow-y-auto px-6">
                  {lineas.map((l) => (
                    <li key={l.key} className="flex items-center justify-between gap-3 py-4">
                      <div className="min-w-0">
                        <p className="font-medium">{l.nombre}</p>
                        <p className="text-xs text-[var(--color-muted)]">
                          {l.tam !== 'unico' && `${l.tam} · `}${l.precio} c/u
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => dec(l.key)} aria-label="Quitar uno" className="rounded-full border border-[var(--color-line)] p-1.5">
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm">{l.qty}</span>
                        <button
                          onClick={() => add({ key: l.key, nombre: l.nombre, tam: l.tam, precio: l.precio })}
                          aria-label="Agregar uno"
                          className="rounded-full border border-[var(--color-line)] p-1.5"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-4 border-t border-[var(--color-line)] px-6 py-5">
                  <div className="grid grid-cols-2 gap-2 rounded-full border border-[var(--color-line)] p-1">
                    {(['domicilio', 'recoger'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setModo(m)}
                        className={`font-mono-label rounded-full py-2 text-xs ${
                          modo === m ? 'bg-[var(--color-ink)] text-[var(--color-bg)]' : 'text-[var(--color-muted)]'
                        }`}
                      >
                        {m === 'domicilio' ? 'A domicilio' : 'Recoger'}
                      </button>
                    ))}
                  </div>
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"
                  />
                  {modo === 'domicilio' && (
                    <input
                      value={dir}
                      onChange={(e) => setDir(e.target.value)}
                      placeholder="Dirección de entrega"
                      className="w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none focus:border-[var(--color-accent)]"
                    />
                  )}
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-[var(--color-muted)]">Total aprox. (sin envío)</span>
                    <span className="font-display text-2xl">${total}</span>
                  </div>
                  <button
                    onClick={() => enviar(modo, nombre, dir)}
                    className="font-mono-label flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] py-4 text-xs text-white"
                  >
                    <MessageCircle size={16} /> Enviar pedido por WhatsApp
                  </button>
                  <button onClick={clear} className="w-full text-center text-xs text-[var(--color-muted)] underline underline-offset-4">
                    Vaciar pedido
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
