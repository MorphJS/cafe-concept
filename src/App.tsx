import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Delivery } from './components/Delivery'
import { Location } from './components/Location'
import { Footer } from './components/Footer'
import { DoorIntro, debeMostrarIntro } from './components/DoorIntro'
import { OrderDrawer } from './components/OrderDrawer'
import { MobileBar } from './components/MobileBar'
import { CartProvider } from './lib/cart'

function App() {
  const [intro, setIntro] = useState(debeMostrarIntro)

  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          {/* el hero se renderiza debajo de las puertas; su texto entra cuando se abren */}
          <Hero delay={intro ? 1.9 : 0.1} />
          <Menu />
          <Delivery />
          <Location />
        </main>
        <Footer />
      </div>
      <OrderDrawer />
      <MobileBar />
      {intro && <DoorIntro onDone={() => setIntro(false)} />}
    </CartProvider>
  )
}

export default App
