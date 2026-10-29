import { useI18n } from '../i18n/I18nProvider.jsx'
import { Link } from '../router.jsx'
import { BRANDS } from '../data/site.js'

export default function Brand({ brand }) {
  const { t } = useI18n()
  const copy = t.brands[brand.id]
  const [first, ...rest] = copy.description
  // ROSHEN has a full product range; the other brands show their highlights.
  const chips = copy.range || copy.tags
  const others = BRANDS.filter((b) => b.id !== brand.id)

  return (
    <>
      <nav aria-label={t.brand.breadcrumb} className="container breadcrumb">
        <Link href="#/products">{t.nav.products}</Link>
        <span aria-hidden="true">/</span>
        <span className="breadcrumb-current">{brand.name}</span>
      </nav>

      <section className="container brand-detail">
        <img className="brand-detail-image" src={brand.image} alt={brand.name} />
        <div className="brand-detail-copy">
          <img className={`brand-logo brand-logo--detail ${brand.lightLogo ? 'logo-on-light' : ''}`} src={brand.logo} alt="" />
          <div className="section-title section-title--tight">
            <span className="eyebrow">{copy.category}</span>
            <h1 className="brand-detail-name">{brand.name}</h1>
          </div>
          <div className="brand-detail-text">
            <p className="brand-detail-lead">{first}</p>
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="brand-detail-range">
            <span className="label label--wide">{copy.range ? t.brand.productRange : t.brand.highlights}</span>
            <ul className="tag-list">
              {chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="btn-row">
            <Link href="#/contact" className="btn btn--dark btn--lg">
              {t.brand.wholesale}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--soft section--88">
        <div className="container section-stack section-stack--tight">
          <div className="section-head section-head--simple">
            <h2 className="h2 h2--md">{t.brand.more}</h2>
            <Link href="#/products" className="text-link">
              {t.brand.allBrands}
            </Link>
          </div>
          <div className="more-grid">
            {others.map((b) => (
              <Link key={b.id} href={`#/products/${b.id}`} className="more-card">
                <img className="more-card-image" src={b.image} alt="" loading="lazy" />
                <div className="more-card-body">
                  <span className="label">{t.brands[b.id].category}</span>
                  <span className="more-card-name">{b.name}</span>
                  <span className="more-card-text">{t.brands[b.id].more}</span>
                  <span className="more-card-link">{t.brand.viewBrand}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
