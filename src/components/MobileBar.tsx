import { motion } from 'motion/react'
import { MapPin, MessageCircle, Phone, ShoppingBag } from 'lucide-react'
import { useCart } from '../lib/cart'
import { NEGOCIO, whatsappLink } from '../data/negocio'

/** Barra fija en movil: acciones de conversion siempre a un toque. */
export function MobileBar() {
  const { count, total, setAbierto } = useCart()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      {count > 0 ? (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => setAbierto(true)}
          className="font-mono-label flex w-full items-center justify-between rounded-full bg-[var(--color-accent)] px-6 py-4 text-xs text-white shadow-lg"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag size={15} /> Ver pedido · {count}
          </span>
          <span>${total}</span>
        </motion.button>
      ) : (
        <div className="grid grid-cols-3 overflow-hidden rounded-full border border-[var(--color-line)] bg-[color-mix(in_srgb,var(--color-surface)_92%,transparent)] shadow-lg backdrop-blur-md">
          <a href={NEGOCIO.telefonoHref} className="font-mono-label flex items-center justify-center gap-1.5 py-3.5 text-[11px]">
            <Phone size={14} /> Llamar
          </a>
          <a href={whatsappLink('Hola Entre Puertas')} target="_blank" rel="noopener" className="font-mono-label flex items-center justify-center gap-1.5 bg-[var(--color-accent)] py-3.5 text-[11px] text-white">
            <MessageCircle size={14} /> Pedir
          </a>
          <a href="#ubicacion" className="font-mono-label flex items-center justify-center gap-1.5 py-3.5 text-[11px]">
            <MapPin size={14} /> Cómo llegar
          </a>
        </div>
      )}
    </div>
  )
}
