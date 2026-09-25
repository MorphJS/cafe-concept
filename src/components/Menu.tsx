import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Eye, Plus, ShoppingBag, Star } from 'lucide-react'
import { categorias } from '../data/menu'
import type { Item } from '../data/menu'
import { useCart } from '../lib/cart'
import { RevealOnScroll } from './RevealOnScroll'

function AddBtn({ item, tam, precio }: { item: Item; tam: 'unico' | 'chico' | 'grande'; precio: number }) {
  const { add } = useCart()
  const [ok, setOk] = useState(false)
  const label = tam === 'unico' ? '' : tam === 'chico' ? 'Ch ' : 'Gde '
  return (
    <button
      onClick={() => {
        add({ key: `${item.id}|${tam}`, nombre: item.nombre, tam, precio })
        setOk(true)
        setTimeout(() => setOk(false), 700)
      }}
      aria-label={`Agregar ${item.nombre} ${tam === 'unico' ? '' : tam}`}
      className={`font-mono-label group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
        ok
          ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
          : 'border-[var(--color-line)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
      }`}
    >
      {label}${precio}
      <Plus size={12} className={`transition-transform ${ok ? 'rotate-90' : ''}`} />
    </button>
  )
}

/** Precio en modo solo-visual: sin boton, solo el numero. */
function PrecioTexto({ tam, precio }: { tam: 'unico' | 'chico' | 'grande'; precio: number }) {
  const label = tam === 'unico' ? '' : tam === 'chico' ? 'Ch ' : 'Gde '
  return (
    <span className="font-mono-label text-xs text-[var(--color-muted)]">
      {label}${precio}
    </span>
  )
}

/**
 * Menu completo (datos reales del sitio actual) con:
 * - tabs pegajosos y scrolleables (antes: una lista plana sin fotos)
 * - separacion por grupos, favoritos marcados
 * - boton "+" por producto/tamaño que alimenta el pedido por WhatsApp
 */
export function Menu() {
  const [activa, setActiva] = useState(categorias[0].id)
  const [pedidoActivo, setPedidoActivo] = useState(false)
  const cat = categorias.find((c) => c.id === activa)!

  return (
    <section id="menu" className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll className="text-center">
          <span className="font-mono-label text-xs text-[var(--color-accent)]">Nuestro menú</span>
          <h2 className="font-display mt-4 text-4xl font-medium tracking-tight md:text-5xl">
            Un menú para antojarte
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--color-muted)]">
            {pedidoActivo
              ? 'Toca el precio para sumarlo a tu pedido. Al final lo enviamos por WhatsApp.'
              : 'Échale un ojo. Si te dan ganas de pedir, activa el modo pedido.'}
          </p>

          <button
            onClick={() => setPedidoActivo((v) => !v)}
            className={`font-mono-label mx-auto mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-colors ${
              pedidoActivo
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white'
                : 'border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
            }`}
          >
            {pedidoActivo ? <ShoppingBag size={13} /> : <Eye size={13} />}
            {pedidoActivo ? 'Modo pedido activado' : 'Solo estoy viendo · activar pedido'}
          </button>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={0.1} className="mx-auto mt-12 max-w-4xl px-6">
        <div className="overflow-hidden rounded-3xl border-2 border-[var(--color-ink)] bg-[var(--color-bg)] shadow-[6px_6px_0_0_var(--color-accent)]">
          <div className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur-md">
            <div role="tablist" className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none]">
              {categorias.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={activa === c.id}
                  onClick={() => setActiva(c.id)}
                  className="font-mono-label relative shrink-0 rounded-full px-4 py-2 text-xs"
                >
                  {activa === c.id && (
                    <motion.span
                      layoutId="menu-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[var(--color-ink)]"
                    />
                  )}
                  <span className={`relative ${activa === c.id ? 'text-[var(--color-bg)]' : 'text-[var(--color-muted)]'}`}>
                    {c.nombre}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 pb-8 md:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <div className="relative aspect-[16/6] w-full overflow-hidden rounded-2xl bg-[var(--color-line)]">
                  <img
                    src={`${cat.imagen}?auto=format&fit=crop&w=1200&q=80`}
                    alt={cat.nombre}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                  <h3 className="font-display absolute bottom-4 left-5 text-2xl text-white md:text-3xl">{cat.nombre}</h3>
                </div>

                <div className="space-y-12 pt-10">
                {cat.grupos.map((g) => (
                  <div key={g.titulo}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-[var(--color-ink)] pb-2">
                      <h3 className="font-display text-2xl">{g.titulo}</h3>
                      {g.nota && <span className="text-xs text-[var(--color-muted)]">{g.nota}</span>}
                    </div>
                    <ul className="divide-y divide-[var(--color-line)]">
                      {g.items.map((p) => (
                        <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                          <div className="min-w-0 flex-1">
                            <h4 className="flex items-center gap-2 font-medium">
                              {p.nombre}
                              {p.fav && (
                                <span title="Favorito de la casa" className="text-[var(--color-accent)]">
                                  <Star size={13} className="fill-current" />
                                </span>
                              )}
                            </h4>
                            {p.descripcion && <p className="mt-0.5 text-sm text-[var(--color-muted)]">{p.descripcion}</p>}
                          </div>
                          <div className="flex gap-2">
                            {pedidoActivo ? (
                              p.grande ? (
                                <>
                                  <AddBtn item={p} tam="chico" precio={p.precio} />
                                  <AddBtn item={p} tam="grande" precio={p.grande} />
                                </>
                              ) : (
                                <AddBtn item={p} tam="unico" precio={p.precio} />
                              )
                            ) : p.grande ? (
                              <>
                                <PrecioTexto tam="chico" precio={p.precio} />
                                <PrecioTexto tam="grande" precio={p.grande} />
                              </>
                            ) : (
                              <PrecioTexto tam="unico" precio={p.precio} />
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-[var(--color-muted)]">
          <Star size={11} className="mr-1 inline fill-current text-[var(--color-accent)]" />
          Favoritos de la casa · Precios en MXN, pueden variar en plataformas de reparto.
        </p>
      </RevealOnScroll>
    </section>
  )
}
