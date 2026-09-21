# Premium Template

Boilerplate reutilizable para sitios de conversion con animaciones fluidas
y un sistema de diseno tecnico/minimal (tipografia mono para labels, grilla
sutil de fondo, un solo color de acento, mucho blanco). Pensado para
clonarlo con `degit` cada vez que empieces un proyecto nuevo.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, sin `postcss.config.js`)
- **motion** (antes "Framer Motion") para animaciones y scroll reveals
- **lucide-react** para iconos
- **ESLint (flat config) + Prettier** para calidad de codigo

## Por que este stack y no otro

- **Vite en vez de Next.js**: si tu sitio no necesita SSR real, rutas API
  propias ni contenido que cambie por usuario, Vite compila mas rapido en
  desarrollo y el mental model es mas simple. Cambia a Next.js si necesitas
  SEO dinamico multi-pagina o backend propio.
- **Tailwind v4**: la config vive en CSS (`@theme` dentro de `index.css`),
  ya no en un `tailwind.config.js` separado — menos archivos, mismos tokens.
- **`motion` en vez de GSAP**: la API declarativa (`whileInView`,
  `useScroll`) encaja mejor con componentes de React. Si necesitas
  timelines muy complejas o animar SVG path-by-path, GSAP sigue siendo
  superior — se puede anadir sin remover motion.

## Como usarlo

```bash
# clonar sin el historial de git
npx degit tu-usuario/premium-template mi-sitio
cd mi-sitio
npm install
npm run dev
```

Scripts disponibles:

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de produccion (corre tsc primero)
npm run lint      # revisa calidad de codigo con ESLint
npm run format    # formatea todo con Prettier
```

## Patrones de animacion incluidos

Todos estan en `src/components/`:

- **`RevealOnScroll`** — fade + desplazamiento al entrar al viewport,
  dispara una sola vez (`viewport={{ once: true }}`). Es el patron base
  para el 90% de las secciones.
- **`StaggerReveal` / `StaggerItem`** — igual que RevealOnScroll pero anima
  a los hijos en cascada (util para listas de tarjetas o beneficios).
- **`Marquee`** — carrusel infinito para logos de clientes / prueba social,
  con loop perfecto sin saltos.
- **`Navbar`** — se contrae y gana fondo/blur al hacer scroll, usando
  `useMotionValueEvent` en vez de `useState` + listener de scroll (evita
  re-renders de React en cada frame).
- **`Button`** — micro-interaccion de hover con `variants` de motion
  (subrayado/fondo que crece), sin efecto "magnetico" que sigue al cursor
  (esta muy sobreusado y se ve generico).

## Reglas anti-generico (lo que este template evita a proposito)

- Nada de fondos negros con degradado morado/neon.
- Nada de todo centrado: el hero usa alineacion a la izquierda con
  asimetria real.
- Un solo color de acento (`--color-accent`), no un arcoiris de gradientes.
- Radios de borde discretos o nulos, no `rounded-2xl` en cada tarjeta.
- Tipografia con jerarquia marcada: display grande + mono para labels
  tecnicos (`font-mono-label`), en vez de un solo peso de fuente en todo.

Cambia estas reglas en `src/index.css` (bloque `@theme`) segun la marca de
cada proyecto — son el unico lugar que deberias tocar para "rebrandear"
el template completo.

## Revision de codigo

Antes de dar por terminada una feature:

1. `npm run lint` — atrapa hooks mal usados, variables sin usar, `any`
   implicitos.
2. `npm run build` — TypeScript en modo `strict`, el chequeo mas efectivo
   contra bugs reales antes de correr el codigo.
3. Pide una revision de codigo a Claude (skill `engineering:code-review`
   si estas en un entorno que lo tenga, o simplemente pega el diff y pide
   que revise seguridad, performance y edge cases).

## Estructura

```
src/
  components/
    Button.tsx          # CTA con micro-interaccion
    Navbar.tsx           # nav que reacciona al scroll
    Hero.tsx             # seccion hero con propuesta de valor + marquee
    Benefits.tsx         # beneficios en grid con stagger reveal
    Pricing.tsx          # tabla de precios, low-friction
    Footer.tsx
    Marquee.tsx          # logica del carrusel infinito
    RevealOnScroll.tsx   # los 3 patrones de scroll animation reutilizables
  lib/
    utils.ts             # helper cn() para clases condicionales
  index.css              # design tokens (light/dark) + reset minimo
  App.tsx
  main.tsx
```
