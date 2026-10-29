import { useEffect } from 'react'
import { BRANDS } from './data/site.js'
import { scrollToRoute, useRoute } from './router.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import Brand from './pages/Brand.jsx'
import Story from './pages/Story.jsx'

export default function App() {
  const route = useRoute()
  const brand = route.page === 'brand' && BRANDS.find((b) => b.id === route.brandId)
  // An unknown brand id falls back to the full brand list.
  const page = route.page === 'brand' && !brand ? 'products' : route.page

  // Wait for the web font so a late font swap doesn't shift the scroll target.
  useEffect(() => {
    document.fonts.ready.then(() => scrollToRoute(route))
  }, [route])

  return (
    <div className="site">
      <Header route={route} />
      <main>
        {page === 'home' && <Home />}
        {page === 'products' && <Products />}
        {page === 'brand' && <Brand key={brand.id} brand={brand} />}
        {page === 'story' && <Story />}
      </main>
      <Footer />
    </div>
  )
}
