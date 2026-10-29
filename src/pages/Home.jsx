import { useI18n } from '../i18n/I18nProvider.jsx'
import { Link } from '../router.jsx'
import { BRAND_VIDEO, BRANDS, CONTACTS, EMAIL, GALLERY_VIDEOS, YOUTUBE } from '../data/site.js'
import { ArrowIcon } from '../components/Icons.jsx'
import VideoCard from '../components/VideoCard.jsx'
import BrandSlides from '../components/BrandSlides.jsx'
import CtaBand from '../components/CtaBand.jsx'

const businessDevelopment = CONTACTS.find((c) => c.role === 'businessDevelopment')

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      <section className="hero hero--full">
        <video className="hero-video" src={BRAND_VIDEO.src} autoPlay muted loop playsInline aria-hidden="true" />
        <div className="container hero-inner hero-inner--center">
          <h1 className="hero-brand">{t.home.brandTitle}</h1>
          <p className="hero-tagline">{t.home.title}</p>
          <p className="hero-intro hero-intro--glass">{t.home.intro}</p>
          <div className="btn-row hero-actions">
            <Link href="#/products" className="btn btn--accent">
              {t.home.explore}
              <ArrowIcon />
            </Link>
            <Link href="#/story" className="btn btn--outline-light">
              {t.home.ourStory}
            </Link>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-grid">
          {t.home.stats.map((s) => (
            <div key={s.value} className="stat">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="section section--soft">
        <div className="container section-stack">
          <div className="section-head">
            <div className="section-title">
              <span className="eyebrow">{t.home.brandsEyebrow}</span>
              <h2 className="h2">{t.home.brandsTitle}</h2>
            </div>
            <p className="section-intro">{t.home.brandsIntro}</p>
          </div>
          <div className="brand-cards">
            {BRANDS.map((b) => (
              <article key={b.id} className="brand-card">
                <img className="brand-card-image" src={b.image} alt={b.name} loading="lazy" />
                <div className="brand-card-body">
                  <div className="brand-card-meta">
                    <img className={`brand-logo brand-logo--card ${b.lightLogo ? 'logo-on-light' : ''}`} src={b.logo} alt="" />
                    <span className="label">{t.brands[b.id].category}</span>
                  </div>
                  <h3 className="brand-card-name">{b.name}</h3>
                  <p className="brand-card-blurb">{t.brands[b.id].blurb}</p>
                  <Link href={`#/products/${b.id}`} className="text-link">
                    {t.home.discover(b.name)}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BrandSlides />

      <section className="section">
        <div className="container section-stack section-stack--wide">
          <div className="split">
            <VideoCard
              className="video-card--story"
              src={BRAND_VIDEO.src}
              label={`${t.videos.brand} · ${BRAND_VIDEO.length}`}
              playLabel={t.home.playStory}
            />
            <div className="story-teaser">
              <span className="eyebrow">{t.home.storyEyebrow}</span>
              <h2 className="h2">{t.story.title}</h2>
              <p className="story-teaser-text">{t.story.lead}</p>
              <Link href="#/story" className="text-link">
                {t.home.readStory}
              </Link>
            </div>
          </div>
          <ol className="timeline">
            {t.timeline.map((m) => (
              <li key={m.year}>
                <span className="timeline-year">{m.year}</span>
                <span className="timeline-text">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="gallery" className="section section--soft">
        <div className="container section-stack section-stack--tight">
          <div className="section-head section-head--simple">
            <h2 className="h2">{t.home.galleryTitle}</h2>
            <a href={YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-link">
              {t.home.moreOnYoutube}
            </a>
          </div>
          <div className="video-grid">
            {GALLERY_VIDEOS.map((v) => (
              <VideoCard
                key={v.key}
                variant="light"
                src={v.src}
                label={`${t.videos[v.key]} · ${v.length}`}
                playLabel={t.videos.play(t.videos[v.key])}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={t.home.ctaTitle} text={t.home.ctaText}>
        <a href={`tel:${businessDevelopment.tel}`} className="btn btn--dark">
          {t.home.ctaCall}
        </a>
        <a href={`mailto:${EMAIL}`} className="btn btn--outline-dark" dir="ltr">
          {EMAIL}
        </a>
      </CtaBand>
    </>
  )
}
