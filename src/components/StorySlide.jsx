import { useEffect, useRef } from 'react'
import { rich, useI18n } from '../i18n/I18nProvider.jsx'

const EMAIL = 'info@allouyouth.ly'
const CONTACTS = [
  { name: 'Kamal Alhajeen', role: 'generalManager', phone: '+218 91-2141648', tel: '+218912141648' },
  { name: 'Ezedin Alhajeen', role: 'businessDevelopment', phone: '+218 93-4500019', tel: '+218934500019' },
]

export default function StorySlide({ video = '/assets/promo1.mp4', playbackRate = 1 }) {
  const { t } = useI18n()
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate
  }, [playbackRate])

  return (
    <section className="slide slide--story" data-slide="2">
      <video className="story-bg" ref={videoRef} src={video} autoPlay muted loop playsInline />

      <div className="story-content">
        <h2>{t.story.heading}</h2>
        <p className="story-subtitle">{t.story.subtitle}</p>
        {t.story.paragraphs.map((paragraph, i) => (
          <p key={i}>{rich(paragraph)}</p>
        ))}
      </div>

      <footer className="story-footer">
        <div className="footer-col footer-col--social">
          <h4>{t.footer.followUs}</h4>
          <a
            className="btn-link"
            href="https://www.facebook.com/alloyouthfoodcompany/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.footer.facebook}
          </a>
        </div>

        <div className="footer-col footer-col--contact">
          <h4>{t.footer.contactHeading}</h4>
          <ul>
            <li>
              {t.footer.addressLabel}: {t.footer.address}
            </li>
            <li>
              {t.footer.emailLabel}: <span dir="ltr">{EMAIL}</span>
            </li>
            {CONTACTS.map((c) => (
              <li key={c.tel}>
                {t.footer.contactLabel(c.name, t.footer.roles[c.role])}:{' '}
                <a href={`tel:${c.tel}`} dir="ltr">
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col--links">
          <h4>{t.footer.partners}</h4>
          <div className="footer-logos">
            <a className="footer-logo-link" href="https://roshen.com/en" target="_blank" rel="noopener noreferrer">
              <img src="/assets/roshen-logo.png" alt="Roshen" />
            </a>
            <a className="footer-logo-link" href="https://tcboy.com/en" target="_blank" rel="noopener noreferrer">
              <img src="/assets/tcboy-logo.png" alt="TC Boy" />
            </a>
            <a className="footer-logo-link" href="https://mabrocteas.com/" target="_blank" rel="noopener noreferrer">
              <img src="/assets/mabroc_logo.png" alt="Mabroc" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
