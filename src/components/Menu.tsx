import { useState } from 'react'
import { RevealOnScroll, StaggerItem, StaggerReveal } from './RevealOnScroll'

type Categoria = 'Desayunos' | 'Bebidas' | 'Postres'

interface Platillo {
  nombre: string
  descripcion: string
  precio: string
  categoria: Categoria
}

const platillos: Platillo[] = [
  {
    nombre: 'Huevos al gusto',
    descripcion: 'Con frijoles, pan artesanal y fruta de temporada.',
    precio: '$95',
    categoria: 'Desayunos',
  },
  {
    nombre: 'Hot cakes de temporada',
    descripcion: 'Con fruta fresca y miel de la casa.',
    precio: '$85',
    categoria: 'Desayunos',
  },
  {
    nombre: 'Chilaquiles verdes',
    descripcion: 'Con pollo deshebrado y crema.',
    precio: '$105',
    categoria: 'Desayunos',
  },
  {
    nombre: 'Cafe de olla',
    descripcion: 'Grano de la region, tueste medio.',
    precio: '$45',
    categoria: 'Bebidas',
  },
  {
    nombre: 'Latte de especialidad',
    descripcion: 'Espresso doble con leche vaporizada.',
    precio: '$55',
    categoria: 'Bebidas',
  },
  {
    nombre: 'Te de hierbas',
    descripcion: 'Mezcla de la casa, servido caliente o frio.',
    precio: '$40',
    categoria: 'Bebidas',
  },
  {
    nombre: 'Pastel de queso',
    descripcion: 'Receta clasica, hecho en casa cada manana.',
    precio: '$65',
    categoria: 'Postres',
  },
  {
    nombre: 'Croissant relleno',
    descripcion: 'Rotacion semanal de sabores.',
    precio: '$50',
    categoria: 'Postres',
  },
]

const categorias: Categoria[] = ['Desayunos', 'Bebidas', 'Postres']

export function Menu() {
  const [activa, setActiva] = useState<Categoria>('Desayunos')

  return (
    <section id="menu" className="border-t border-[var(--color-line)] px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <RevealOnScroll className="text-center">
          <span className="font-mono-label text-xs text-[var(--color-accent)]">Nuestro menu</span>
          <h2 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
            Hecho fresco cada dia
          </h2>
        </RevealOnScroll>

        <div className="mt-10 flex justify-center gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiva(cat)}
              className={`font-mono-label rounded-full border px-4 py-2 text-xs transition-colors ${
                activa === cat
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-bg)]'
                  : 'border-[var(--color-line)] text-[var(--color-muted)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <StaggerReveal key={activa} className="mt-10 divide-y divide-[var(--color-line)]">
          {platillos
            .filter((p) => p.categoria === activa)
            .map((p) => (
              <StaggerItem key={p.nombre} className="flex items-baseline justify-between gap-4 py-4">
                <div>
                  <h3 className="font-medium">{p.nombre}</h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{p.descripcion}</p>
                </div>
                <span className="font-mono-label shrink-0 text-[var(--color-accent)]">
                  {p.precio}
                </span>
              </StaggerItem>
            ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
