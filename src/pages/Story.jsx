import { rich, useI18n } from '../i18n/I18nProvider.jsx'
import { CONTACTS, EMAIL, VIDEOS, mapUrl } from '../data/site.js'

export default function Story() {
  const { t, lang } = useI18n()
  const f = t.contact.form

  // No backend: hand the enquiry to the visitor's email app.
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const field = (name) => String(data.get(name) || '').trim()
    const body = [
      `${f.name}: ${field('name')}`,
      `${f.company}: ${field('company')}`,
      `${f.phone}: ${field('phone')}`,
      `${f.email}: ${field('email')}`,
      '',
      field('message'),
    ].join('\n')
    const subject = [field('topic'), field('name')].filter(Boolean).join(' — ')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      {/* The original site's story slide: the full story on glass over the video. */}
      <section className="story-hero">
        <video className="hero-video" src={VIDEOS.story} autoPlay muted loop playsInline aria-hidden="true" />
        <div className="container story-hero-inner">
          <article className="story-panel">
            <h1>{t.story.eyebrow}</h1>
            <p className="story-panel-subtitle">{t.story.title}</p>
            <p>{t.story.lead}</p>
            {t.story.paragraphs.map((p) => (
              <p key={p}>{rich(p)}</p>
            ))}
          </article>
        </div>
      </section>

      <section className="section section--dark section--80">
        <div className="container section-stack section-stack--tight-40">
          <h2 className="h2 h2--sm">{t.story.milestones}</h2>
          <ol className="timeline timeline--dark">
            {t.timeline.map((m) => (
              <li key={m.year}>
                <span className="timeline-year">{m.year}</span>
                <span className="timeline-text">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contact" className="container contact">
        <div className="contact-info">
          <div className="section-title section-title--contact">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="h2">{t.contact.title}</h2>
            <p className="contact-intro">{t.contact.intro}</p>
          </div>
          <div className="people">
            {CONTACTS.map((c) => (
              <div key={c.tel} className="person">
                <span className="person-name">{t.footer.names[c.role]}</span>
                <span className="person-role">{t.footer.roles[c.role]}</span>
                <a href={`tel:${c.tel}`} className="person-phone" dir="ltr">
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
          <dl className="contact-details">
            <div>
              <dt>{t.footer.addressLabel}</dt>
              <dd>{t.footer.address}</dd>
            </div>
            <div>
              <dt>{t.footer.emailLabel}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} dir="ltr">
                  {EMAIL}
                </a>
              </dd>
            </div>
          </dl>
          <iframe className="contact-map" title={t.contact.mapTitle} src={mapUrl(lang)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <form className="enquiry" onSubmit={onSubmit}>
          <h3>{f.title}</h3>
          <div className="enquiry-grid">
            <label>
              {f.name}
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              {f.company}
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label>
              {f.phone}
              <input name="phone" type="tel" autoComplete="tel" dir="ltr" />
            </label>
            <label>
              {f.email}
              <input name="email" type="email" autoComplete="email" dir="ltr" />
            </label>
          </div>
          <label>
            {f.topic}
            <select name="topic">
              {f.topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>
          <label>
            {f.message}
            <textarea name="message" rows="5" required />
          </label>
          <button type="submit" className="btn btn--dark">
            {f.submit}
          </button>
        </form>
      </section>
    </>
  )
}
