/** Menu real de entrepuertascafe.com. `grande` = precio del tamaño grande. */
export interface Item {
  id: string
  nombre: string
  descripcion?: string
  precio: number
  grande?: number
  fav?: boolean
}
export interface Grupo {
  titulo: string
  nota?: string
  items: Item[]
}
export interface Categoria {
  id: string
  nombre: string
  /** Foto ambientada de la categoria (banner arriba de la lista). */
  imagen: string
  grupos: Grupo[]
}

const it = (id: string, nombre: string, precio: number, extra: Partial<Item> = {}): Item => ({
  id,
  nombre,
  precio,
  ...extra,
})

const dosTam = (pref: string, nombres: string[], p: number, g: number): Item[] =>
  nombres.map((n, i) => it(`${pref}${i}`, n, p, { grande: g }))

export const categorias: Categoria[] = [
  {
    id: 'desayunos',
    nombre: 'Desayunos',
    imagen: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
    grupos: [
      {
        titulo: 'Omelettes',
        nota: 'Con frijoles refritos · clara de huevo +$20',
        items: [
          it('om1', 'Jamón y queso', 59),
          it('om2', 'Champiñones y queso', 59),
          it('om3', 'A la mexicana con queso', 59),
          it('om4', 'Espinaca con queso de cabra', 72, { fav: true }),
          it('om5', 'Jamón serrano y gouda', 72),
          it('om6', 'Salmón ahumado y queso de cabra', 87),
        ],
      },
      {
        titulo: 'Huevos al gusto',
        nota: 'Con frijoles refritos',
        items: [
          it('hu1', 'Revueltos con jamón o tocino', 55),
          it('hu2', 'A la mexicana', 55),
          it('hu3', 'Al albañil', 55, { fav: true }),
          it('hu4', 'Rancheros', 65, { fav: true }),
          it('hu5', 'Divorciados', 65, { fav: true }),
        ],
      },
      {
        titulo: 'Mexicanos',
        nota: 'Agrega huevo +$15',
        items: [
          it('mx1', 'Chilaquiles (rojos, verdes o mole)', 72, { fav: true }),
          it('mx2', 'Chilaquiles Patrones', 79),
          it('mx3', 'Enchiladas (rojas o verdes)', 72),
          it('mx4', 'Enchiladas suizas', 79),
          it('mx5', 'Enfrijoladas o enmoladas', 72),
          it('mx6', 'Tamalito azteca', 68, { grande: 97, descripcion: '1 pieza / 2 piezas' }),
        ],
      },
      {
        titulo: 'Más para el desayuno',
        items: [
          it('ot1', 'Croque madame', 65),
          it('ot2', 'Croissant con huevo y tocino', 65, { fav: true }),
          it('ot3', 'Hot cakes', 69),
          it('ot4', 'Fruta con yogurt y granola', 44),
        ],
      },
    ],
  },
  {
    id: 'calientes',
    nombre: 'Bebidas calientes',
    imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    grupos: [
      {
        titulo: 'Café',
        nota: 'Shot extra de espresso +$10 · Chico / Grande',
        items: [
          it('ca1', 'Espresso (sencillo / doble)', 32, { grande: 41 }),
          it('ca2', 'Café americano', 32, { grande: 41 }),
          it('ca3', 'Capuchino', 43, { grande: 52 }),
          it('ca4', 'Latte', 43, { grande: 52 }),
          it('ca5', 'Capuchino o latte con sabor', 54, {
            grande: 63,
            descripcion: 'Vainilla, caramelo, irish cream, avellana, amaretto o menta',
          }),
          it('ca6', 'Moka', 54, { grande: 63, descripcion: 'Café con chocolate caliente' }),
          it('ca7', 'Affogato', 49, { descripcion: 'Espresso con bola de helado de vainilla' }),
        ],
      },
      {
        titulo: 'Chocolate y especiales',
        nota: 'Chico / Grande',
        items: dosTam(
          'ch',
          ['Chocolate tradicional', 'Chocolate blanco', 'Chai latte', 'Matcha latte', 'Taro latte'],
          49,
          58,
        ),
      },
      {
        titulo: 'Tés e infusiones',
        nota: 'Chico / Grande',
        items: dosTam(
          'te',
          ['Manzanilla-lavanda', 'Menta-toronjil', 'Fresa-kiwi', 'Moras silvestres', 'Frutas tropicales'],
          41,
          52,
        ),
      },
    ],
  },
  {
    id: 'frias',
    nombre: 'Bebidas frías',
    imagen: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5',
    grupos: [
      {
        titulo: 'Smoothies, granizados y chamoyadas',
        nota: 'Chico / Grande',
        items: [
          ...dosTam(
            'sm',
            ['Smoothie mixed berries', 'Smoothie taro', 'Smoothie mango', 'Smoothie fresa', 'Smoothie piña colada'],
            49,
            58,
          ),
          ...dosTam(
            'gr',
            ['Granizado limón', 'Granizado fresa', 'Granizado moras', 'Granizado maracuyá', 'Granizado mango'],
            49,
            58,
          ),
          ...dosTam('cm', ['Chamoyada limón', 'Chamoyada mango'], 49, 58),
        ],
      },
      {
        titulo: 'Frappés',
        nota: 'Chico / Grande',
        items: dosTam(
          'fr',
          [
            'Cappuccino',
            'Moka',
            'Caramel latte',
            'Vainilla cream latte',
            'Avellana cream',
            'Cookies & cream',
            'Chocolate lover',
            'White chocolate',
            'Choco-menta',
            'Chai latte',
            'Matcha latte',
          ],
          53,
          62,
        ),
      },
      {
        titulo: 'Jugos y refrescos',
        items: [
          it('ju1', 'Jugo de naranja', 25, { grande: 39 }),
          it('ju2', 'Agua de fruta de temporada', 24),
          it('ju3', 'Limonada', 32),
          it('ju4', 'Naranjada', 32),
          it('ju5', 'Refresco', 28),
          it('ju6', 'Agua mineral', 28),
          it('ju7', 'Agua Ciel', 24),
        ],
      },
    ],
  },
  {
    id: 'salados',
    nombre: 'Chapatas y bagels',
    imagen: 'https://images.unsplash.com/photo-1481070555726-e2fe8357725c',
    grupos: [
      {
        titulo: 'Bagels',
        items: [
          it('bg1', 'Bagel de salmón', 94, { fav: true }),
          it('bg2', 'Bagel de roast beef', 83, { fav: true }),
          it('bg3', 'Cheessy bagel', 83, { fav: true }),
        ],
      },
      {
        titulo: 'Chapatas',
        items: [
          it('cp1', 'La Porta', 79, { fav: true }),
          it('cp2', 'Puerta de Alcalá', 85, { fav: true }),
          it('cp3', 'Puerta del Cielo', 83, { fav: true }),
          it('cp4', 'Dijon', 83, { fav: true }),
        ],
      },
      {
        titulo: 'Sándwiches y más',
        items: [
          it('sw1', 'Sándwich light', 58),
          it('sw2', 'Croissant de jamón y queso', 54),
          it('sw3', 'Molletes sencillos', 56),
          it('sw4', 'Molletes con jamón o tocino', 65),
        ],
      },
    ],
  },
  {
    id: 'ensaladas',
    nombre: 'Ensaladas',
    imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    grupos: [
      {
        titulo: 'Base de lechuga y espinaca · aderezos de la casa',
        items: [
          it('en1', 'Pechugona', 76, {
            descripcion: 'Pechuga de pollo, queso panela, jitomate, zanahoria, aceitunas, chips de camote y vinagreta de ajo',
          }),
          it('en2', 'Celestial', 76, {
            descripcion: 'Manzana, queso de cabra, nuez, arándanos y vinagreta de miel y mostaza',
          }),
          it('en3', 'Entre Puertas', 81, {
            descripcion: 'Jamón serrano, pera, parmesano, arúgula y aderezo de vino tinto',
          }),
        ],
      },
    ],
  },
  {
    id: 'dulces',
    nombre: 'Antojos dulces',
    imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
    grupos: [
      {
        titulo: 'Antojos',
        items: [
          it('ad1', 'Muffin de elote', 26, { fav: true, descripcion: 'La especialidad de la casa' }),
          it('ad2', 'Bagel con Nutella y plátano', 52),
          it('ad3', 'Bagel con queso crema y mermelada', 52),
          it('ad4', 'Croissant con mantequilla y mermelada', 39),
          it('ad5', 'Croissant o bisquet con Nutella', 39),
          it('ad6', 'Uchepo', 44, { descripcion: 'Tamal de elote dulce con leche condensada o crema' }),
        ],
      },
      {
        titulo: 'Postres',
        items: [
          it('po1', 'Brownie triple chocolate', 45),
          it('po2', 'Brownie triple chocolate con helado', 65),
          it('po3', 'Cheesecake de guayaba', 45),
          it('po4', 'Pay de queso con zarzamora', 45),
          it('po5', 'Pastel de zanahoria', 45),
        ],
      },
    ],
  },
]
