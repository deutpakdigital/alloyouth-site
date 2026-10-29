// Fixed, language-independent site data. Translated copy for each brand lives in
// src/i18n/locales/<lang>.js under `brands.<id>`.

export const EMAIL = 'hello@alloyouth.com'

export const CONTACTS = [
  { role: 'generalManager', phone: '+218 91-2141648', tel: '+218912141648' },
  { role: 'businessDevelopment', phone: '+218 93-4500019', tel: '+218934500019' },
]

export const SOCIALS = [
  { key: 'facebook', href: 'https://www.facebook.com/profile.php?id=61593878300369' },
  { key: 'instagram', href: 'https://www.instagram.com/alloyouthco/' },
  { key: 'youtube', href: 'https://www.youtube.com/@alloyouthco' },
  { key: 'pinterest', href: 'https://www.pinterest.com/alloyouthco/' },
  { key: 'x', href: 'https://x.com/alloyouthco' },
]

// `filter` is the Products page category; `lightLogo` marks a white logo that
// has to be darkened when it sits on a light background.
export const BRANDS = [
  {
    id: 'roshen',
    name: 'ROSHEN',
    filter: 'confectionery',
    image: '/assets/roshen.png',
    logo: '/assets/roshen-logo.png',
    lightLogo: true,
    site: 'https://roshen.com/en',
    domain: 'roshen.com',
  },
  {
    id: 'tcboy',
    name: 'TC BOY',
    filter: 'seafood',
    image: '/assets/tcboy.png',
    logo: '/assets/tcboy-logo.png',
    site: 'https://tcboy.com/en',
    domain: 'tcboy.com',
  },
  {
    id: 'mabroc',
    name: 'MABROC',
    filter: 'tea',
    image: '/assets/mabroc.png',
    logo: '/assets/mabroc_logo.png',
    site: 'https://mabrocteas.com/',
    domain: 'mabrocteas.com',
  },
]

export const FILTERS = ['all', 'confectionery', 'seafood', 'tea']

export const VIDEOS = {
  hero: '/assets/promo.mp4',
  story: '/assets/promo1.mp4',
}

export const GALLERY_VIDEOS = [{ key: 'brand', src: VIDEOS.hero, length: '1:07' }]

export const YOUTUBE = 'https://www.youtube.com/@alloyouthco'

export const mapUrl = (lang) => `https://maps.google.com/maps?q=Msallata%2C%20Libya&z=12&hl=${lang}&output=embed`
