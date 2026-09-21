import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Gallery } from './components/Gallery'
import { Location } from './components/Location'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </div>
  )
}

export default App
