import { useI18n } from '../i18n/I18nProvider.jsx'
import { BRANDS, CONTACTS, EMAIL, SOCIALS } from '../data/site.js'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <img className="footer-logo" src="/assets/logo_en.png" alt={t.meta.logoAlt} />
            <p>{t.footer.tagline}</p>
          </div>

          <nav className="footer-col" aria-label={t.footer.followUs}>
            <span className="footer-heading">{t.footer.followUs}</span>
            {SOCIALS.map((s) => (
              <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer">
                {t.footer.socials[s.key]}
              </a>
            ))}
          </nav>

          <div className="footer-col footer-col--contact">
            <span className="footer-heading">{t.footer.contactHeading}</span>
            <span>{t.footer.address}</span>
            <a href={`mailto:${EMAIL}`} dir="ltr">
              {EMAIL}
            </a>
            {CONTACTS.map((c) => (
              <span key={c.tel}>
                {t.footer.contactLabel(t.footer.names[c.role], t.footer.roles[c.role])}
                <br />
                <a href={`tel:${c.tel}`} dir="ltr">
                  {c.phone}
                </a>
              </span>
            ))}
          </div>

          <div className="footer-col">
            <span className="footer-heading">{t.footer.partners}</span>
            {BRANDS.map((b) => (
              <a key={b.id} className="footer-partner" href={b.site} target="_blank" rel="noopener noreferrer">
                <img className={b.lightLogo ? 'logo-on-light' : undefined} src={b.logo} alt={b.name} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">{t.footer.copyright}</div>
      </div>
    </footer>
  )
}
