/**
 * Datos tomados de entrepuertascafe.com (revisar antes de publicar).
 * El numero de WhatsApp se asume igual al telefono publicado.
 */
export const NEGOCIO = {
  nombre: 'Entre Puertas',
  telefono: '222 889 0653',
  telefonoHref: 'tel:+522228890653',
  whatsapp: '522228890653',
  horario: 'Lunes a sábado · 8:00 – 21:30',
  apertura: 8,
  cierre: 21.5,
  diasAbierto: [1, 2, 3, 4, 5, 6] as number[], // lun-sab
  rating: { valor: 4.7, resenas: 222 },
  sucursales: [
    {
      nombre: 'Matriz · Barrio de Santiago',
      direccion: '19 Sur #1306-A, Col. Barrio de Santiago, Puebla, Pue. 72410',
      mapa: 'https://maps.app.goo.gl/Ae1J7pdXL4cAW3ou9',
      embed: 'https://www.google.com/maps?q=19+Sur+1306-A,+Barrio+de+Santiago,+Puebla&output=embed',
    },
    {
      nombre: 'Juárez · Zona Esmeralda',
      direccion: 'Av. Juárez #1916, Col. La Paz - Zona Esmeralda, Puebla, Pue. 72090',
      mapa: 'https://maps.app.goo.gl/6Vni2mqAt6sYwmzz8',
      embed: 'https://www.google.com/maps?q=Av+Juarez+1916,+La+Paz,+Puebla&output=embed',
    },
  ],
  redes: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    rappi: 'https://www.rappi.com.mx/',
    didi: 'https://www.didi-food.com/es-MX/',
  },
}

export function whatsappLink(texto: string) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(texto)}`
}

export function estaAbierto(d = new Date()) {
  if (!NEGOCIO.diasAbierto.includes(d.getDay())) return false
  const h = d.getHours() + d.getMinutes() / 60
  return h >= NEGOCIO.apertura && h < NEGOCIO.cierre
}
