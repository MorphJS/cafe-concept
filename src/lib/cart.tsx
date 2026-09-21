import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { whatsappLink } from '../data/negocio'

export type Tam = 'unico' | 'chico' | 'grande'

export interface Linea {
  key: string
  nombre: string
  tam: Tam
  precio: number
  qty: number
}

interface CartCtx {
  lineas: Linea[]
  count: number
  total: number
  abierto: boolean
  setAbierto: (v: boolean) => void
  add: (l: Omit<Linea, 'qty'>) => void
  dec: (key: string) => void
  clear: () => void
  mensaje: (modo: 'domicilio' | 'recoger', nombre: string, direccion: string) => string
  enviar: (modo: 'domicilio' | 'recoger', nombre: string, direccion: string) => void
}

const Ctx = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lineas, setLineas] = useState<Linea[]>([])
  const [abierto, setAbierto] = useState(false)

  const add = useCallback((l: Omit<Linea, 'qty'>) => {
    setLineas((prev) => {
      const found = prev.find((x) => x.key === l.key)
      return found
        ? prev.map((x) => (x.key === l.key ? { ...x, qty: x.qty + 1 } : x))
        : [...prev, { ...l, qty: 1 }]
    })
  }, [])

  const dec = useCallback((key: string) => {
    setLineas((prev) =>
      prev.flatMap((x) => (x.key !== key ? [x] : x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : [])),
    )
  }, [])

  const clear = useCallback(() => setLineas([]), [])

  const value = useMemo<CartCtx>(() => {
    const count = lineas.reduce((n, l) => n + l.qty, 0)
    const total = lineas.reduce((n, l) => n + l.qty * l.precio, 0)
    const mensaje: CartCtx['mensaje'] = (modo, nombre, direccion) => {
      const detalle = lineas
        .map((l) => `• ${l.qty}× ${l.nombre}${l.tam === 'unico' ? '' : ` (${l.tam})`} — $${l.qty * l.precio}`)
        .join('\n')
      return [
        'Hola Entre Puertas, quiero hacer un pedido:',
        detalle,
        `Total aprox.: $${total}`,
        modo === 'domicilio' ? `A domicilio: ${direccion || '(te paso mi ubicación)'}` : 'Paso a recogerlo',
        nombre ? `A nombre de: ${nombre}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    }
    return {
      lineas,
      count,
      total,
      abierto,
      setAbierto,
      add,
      dec,
      clear,
      mensaje,
      enviar: (modo, nombre, direccion) =>
        window.open(whatsappLink(mensaje(modo, nombre, direccion)), '_blank', 'noopener'),
    }
  }, [lineas, abierto, add, dec, clear])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart fuera de CartProvider')
  return c
}
