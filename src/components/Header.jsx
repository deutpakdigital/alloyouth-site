import { useI18n } from '../i18n/I18nProvider.jsx'
import { Link } from '../router.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const LINKS = [
  { key: 'home', href: '#/', isActive: (r) => r.page === 'home' && !r.section },
  { key: 'story', href: '#/story', isActive: (r) => r.page === 'story' && !r.section },
  { key: 'products', href: '#/products', isActive: (r) => r.page === 'products' || r.page === 'brand' },
  { key: 'gallery', href: '#/gallery', isActive: (r) => r.section === 'gallery' },
  { key: 'contact', href: '#/contact', isActive: (r) => r.section === 'contact' },
]

export default function Header({ route }) {
  const { t } = useI18n()

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="#/" className="site-logo" aria-label={t.meta.homeLabel}>
          <img src="/assets/logo_en.png" alt={t.meta.logoAlt} />
        </Link>
        <nav className="site-nav" aria-label={t.nav.main}>
          {LINKS.map((l) => {
            const active = l.isActive(route)
            return (
              <Link key={l.key} href={l.href} className={active ? 'is-active' : undefined} aria-current={active ? 'page' : undefined}>
                {t.nav[l.key]}
              </Link>
            )
          })}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
