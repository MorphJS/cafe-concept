import { Instagram, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <span className="font-mono-label text-sm">Entre Puertas</span>
        <div className="flex gap-4 text-[var(--color-muted)]">
          <a href="#" aria-label="Instagram" className="hover:text-[var(--color-ink)]">
            <Instagram size={18} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-[var(--color-ink)]">
            <Facebook size={18} />
          </a>
        </div>
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} Entre Puertas. Concepto de rediseno, no oficial.
        </p>
      </div>
    </footer>
  )
}
