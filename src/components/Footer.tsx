import { Facebook, Instagram } from 'lucide-react'
import { NEGOCIO } from '../data/negocio'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] px-6 py-12 pb-28 md:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <span className="font-script text-3xl">{NEGOCIO.nombre}</span>
        <div className="flex gap-4 text-[var(--color-muted)]">
          <a href={NEGOCIO.redes.instagram} aria-label="Instagram" className="hover:text-[var(--color-ink)]">
            <Instagram size={18} />
          </a>
          <a href={NEGOCIO.redes.facebook} aria-label="Facebook" className="hover:text-[var(--color-ink)]">
            <Facebook size={18} />
          </a>
        </div>
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} Entre Puertas. Concepto de rediseño, no oficial.
        </p>
      </div>
    </footer>
  )
}
