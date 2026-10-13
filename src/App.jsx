import { useEffect, useState } from 'react'
import HeroSlider from './components/HeroSlider.jsx'
import Gallery from './components/Gallery.jsx'

export default function App() {
  const [page, setPage] = useState('home')
  const [initialSlide, setInitialSlide] = useState(0)

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '')
      setPage(hash === 'gallery' ? 'gallery' : 'home')
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  const openGallery = () => {
    window.location.hash = 'gallery'
    setPage('gallery')
  }

  const navigateToSlide = (slide = 0) => {
    setInitialSlide(slide)
    window.location.hash = ''
    setPage('home')
  }

  return (
    <main className="app">
      {page === 'gallery' ? (
        <Gallery onNavigateToSlide={navigateToSlide} />
      ) : (
        <HeroSlider onOpenGallery={openGallery} initialSlide={initialSlide} />
      )}
    </main>
  )
}
