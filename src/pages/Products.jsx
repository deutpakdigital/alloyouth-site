import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { Link } from '../router.jsx'
import { BRANDS, CONTACTS, FILTERS } from '../data/site.js'
import CtaBand from '../components/CtaBand.jsx'

const generalManager = CONTACTS.find((c) => c.role === 'generalManager')

export default function Products() {
  const { t } = useI18n()
  const [filter, setFilter] = useState('all')
  const list = filter === 'all' ? BRANDS : BRANDS.filter((b) => b.filter === filter)

  return (
    <>
      <section className="page-head">
        <div className="container page-head-inner">
          <div className="page-head-grid">
            <div className="section-title">
              <span className="eyebrow">{t.products.eyebrow}</span>
              <h1 className="h1">{t.products.title}</h1>
            </div>
            <p className="page-head-intro">{t.products.intro}</p>
          </div>
          <div role="group" aria-label={t.products.filterLabel} className="chip-row">
            {FILTERS.map((f) => (
              <button key={f} type="button" aria-pressed={f === filter} className="chip chip--light" onClick={() => setFilter(f)}>
                {t.products.filters[f]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container product-list">
        {list.map((b) => {
          const copy = t.brands[b.id]
          return (
            <article key={b.id} className="product-row">
              <img className="product-row-image" src={b.image} alt={b.name} loading="lazy" />
              <div className="product-row-copy">
                <div className="product-row-meta">
                  <img className={`brand-logo brand-logo--row ${b.lightLogo ? 'logo-on-light' : ''}`} src={b.logo} alt="" />
                  <span className="label">{t.products.filters[b.filter]}</span>
                </div>
                <h2 className="product-row-name">{b.name}</h2>
                <p className="product-row-text">{copy.summary}</p>
                <ul aria-label={t.products.highlights} className="tag-list">
                  {copy.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="btn-row btn-row--spaced">
                  <Link href={`#/products/${b.id}`} className="btn btn--dark btn--md">
                    {t.common.viewBrand}
                  </Link>
                  <a href={b.site} target="_blank" rel="noopener noreferrer" className="btn btn--outline-dark btn--md">
                    {t.common.officialSite}
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <CtaBand title={t.products.ctaTitle} text={t.products.ctaText}>
        <a href={`tel:${generalManager.tel}`} className="btn btn--dark">
          {t.common.call}&nbsp;<bdi dir="ltr">{generalManager.phone}</bdi>
        </a>
        <Link href="#/contact" className="btn btn--outline-dark">
          {t.common.sendEnquiry}
        </Link>
      </CtaBand>
    </>
  )
}
