import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'
import { Link } from '../router.jsx'
import { BRANDS } from '../data/site.js'
import { ArrowIcon } from './Icons.jsx'

const SWIPE_THRESHOLD = 45
// Below this width a slide is taller than the screen, so it can't be pinned.
const PIN_QUERY = '(min-width: 901px)'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// Full-screen brand slides: photo on one half, details on the other. Slides
// before the active one sit "above" and slides after it "below", so CSS can
// animate in the direction of travel.
//
// On wide screens the section is one screen tall per brand and its stage is
// pinned while you scroll through it: scrolling steps through the brands, then
// the page carries on. On narrow screens it's a normal tap/swipe carousel.
export default function BrandSlides() {
  const { t, dir } = useI18n()
  const [index, setIndex] = useState(0)
  const sectionRef = useRef(null)
  const touchStart = useRef(null)
  const pinned = useMediaQuery(PIN_QUERY)

  useEffect(() => {
    if (!pinned) return
    const onScroll = () => {
      const section = sectionRef.current
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = -section.getBoundingClientRect().top / scrollable
      const i = Math.floor(Math.min(Math.max(progress, 0), 0.9999) * BRANDS.length)
      setIndex(i)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pinned])

  // Pinned: move the page to the middle of that brand's stretch of scroll (or
  // just past the section after the last brand). Unpinned: switch directly.
  const go = (i) => {
    if (!pinned) {
      setIndex((i + BRANDS.length) % BRANDS.length)
      return
    }
    if (i < 0) return
    const section = sectionRef.current
    const top = section.getBoundingClientRect().top + window.scrollY
    const scrollable = section.offsetHeight - window.innerHeight
    const target = i >= BRANDS.length ? top + section.offsetHeight : top + (scrollable * (i + 0.5)) / BRANDS.length
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
  // In RTL the "next" arrow and swipe point the other way.
  const forward = dir === 'rtl' ? -1 : 1

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(index + forward)
    if (e.key === 'ArrowLeft') go(index - forward)
  }
  const onTouchStart = (e) => {
    const p = e.touches[0]
    touchStart.current = { x: p.clientX, y: p.clientY }
  }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const p = e.changedTouches[0]
    const dx = touchStart.current.x - p.clientX
    const dy = touchStart.current.y - p.clientY
    touchStart.current = null
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= SWIPE_THRESHOLD) go(index + (dx > 0 ? forward : -forward))
  }

  return (
    <section
      ref={sectionRef}
      className={`brand-slides ${pinned ? 'is-pinned' : ''}`}
      style={{ '--count': BRANDS.length }}
      aria-roledescription="carousel"
      aria-label={t.home.spotlightTitle}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="brand-slides-stage">
        {BRANDS.map((b, i) => {
          const copy = t.brands[b.id]
          const state = i === index ? 'is-active' : i < index ? 'is-before' : 'is-after'
          return (
            <div
              key={b.id}
              className={`brand-slide ${state}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${BRANDS.length}: ${b.name}`}
              aria-hidden={i !== index}
              inert={i !== index ? '' : undefined}
            >
              <div className="brand-slide-media">
                <img src={b.image} alt={b.name} />
              </div>
              <div className="brand-slide-info">
                <span className="eyebrow eyebrow--accent">{t.home.spotlightTitle}</span>
                <img className="brand-logo brand-logo--spotlight" src={b.logo} alt="" />
                <div className="section-title section-title--tight">
                  <span className="label label--on-dark">{copy.category}</span>
                  <h2 className="brand-slide-name">{b.name}</h2>
                </div>
                <p className="spotlight-text">{copy.spotlight}</p>
                <dl className="spotlight-facts">
                  {copy.facts.map((f) => (
                    <div key={f.k}>
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="btn-row">
                  <Link href={`#/products/${b.id}`} className="btn btn--accent">
                    {t.common.viewBrand}
                  </Link>
                  <a href={b.site} target="_blank" rel="noopener noreferrer" className="btn btn--outline-muted">
                    {t.common.officialSite}
                  </a>
                </div>
              </div>
            </div>
          )
        })}

        <div className="brand-slides-controls">
          <div role="tablist" aria-label={t.home.chooseBrand} className="chip-row">
            {BRANDS.map((b, i) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                className="chip chip--dark"
                onClick={() => go(i)}
              >
                {b.name}
              </button>
            ))}
          </div>
          <div className="brand-slides-arrows">
            <button type="button" className="slide-arrow slide-arrow--prev" aria-label={t.home.previousBrand} onClick={() => go(index - 1)}>
              <ArrowIcon size={20} />
            </button>
            <span className="brand-slides-count" aria-hidden="true" dir="ltr">
              {index + 1} / {BRANDS.length}
            </span>
            <button type="button" className="slide-arrow" aria-label={t.home.nextBrand} onClick={() => go(index + 1)}>
              <ArrowIcon size={20} />
            </button>
          </div>
        </div>

        {pinned && (
          <div className="brand-slides-progress" aria-hidden="true">
            {BRANDS.map((b, i) => (
              <span key={b.id} className={i === index ? 'is-active' : undefined} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
