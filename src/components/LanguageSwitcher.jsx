import { LANGUAGES, useI18n } from '../i18n/I18nProvider.jsx'

export default function LanguageSwitcher({ className = '', onSelect }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.nav.language}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          title={l.name}
          aria-pressed={l.code === lang}
          className={`lang-switch-btn ${l.code === lang ? 'is-active' : ''}`}
          onClick={() => {
            setLang(l.code)
            onSelect && onSelect()
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
