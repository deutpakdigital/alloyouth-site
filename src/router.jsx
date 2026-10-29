import { useEffect, useState } from 'react'

// Hash routes, so deep links work on any static host:
//   #/            home            #/gallery    home, scrolled to the gallery
//   #/products    all brands      #/products/<brand id>
//   #/story       our story       #/contact    our story, scrolled to contact
export function parseHash(hash) {
  const [first = '', second] = hash.replace(/^#\/?/, '').split('/')
  switch (first) {
    case 'gallery':
      return { page: 'home', section: 'gallery' }
    case 'products':
      return second ? { page: 'brand', brandId: second } : { page: 'products' }
    case 'story':
      return { page: 'story' }
    case 'contact':
      return { page: 'story', section: 'contact' }
    default:
      return { page: 'home' }
  }
}

export function scrollToRoute(route) {
  const target = route.section && document.getElementById(route.section)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else window.scrollTo(0, 0)
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return route
}

// Clicking a link to the hash you're already on fires no hashchange, so
// re-run the scroll by hand (e.g. "Gallery" twice in a row).
export function Link({ href, onClick, ...props }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick && onClick(e)
        if (href === window.location.hash || (href === '#/' && !window.location.hash)) {
          e.preventDefault()
          scrollToRoute(parseHash(href))
        }
      }}
      {...props}
    />
  )
}
