import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './locales/en.js'
import de from './locales/de.js'
import ar from './locales/ar.js'

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr', messages: en },
  { code: 'de', label: 'DE', name: 'Deutsch', dir: 'ltr', messages: de },
  { code: 'ar', label: 'عربي', name: 'العربية', dir: 'rtl', messages: ar },
]

const STORAGE_KEY = 'alloyouth-lang'
const byCode = Object.fromEntries(LANGUAGES.map((l) => [l.code, l]))

// Saved choice first, then the browser's preferred languages, then English.
function detectInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && byCode[saved]) return saved
  } catch {
    // Storage can be blocked (private mode); fall through to detection.
  }
  const prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  for (const pref of prefs) {
    const code = (pref || '').slice(0, 2).toLowerCase()
    if (byCode[code]) return code
  }
  return 'en'
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)
  const language = byCode[lang]

  useEffect(() => {
    const root = document.documentElement
    root.lang = language.code
    root.dir = language.dir
    document.title = language.messages.meta.title
  }, [language])

  const value = useMemo(
    () => ({
      lang,
      dir: language.dir,
      t: language.messages,
      setLang: (code) => {
        if (!byCode[code]) return
        setLangState(code)
        try {
          localStorage.setItem(STORAGE_KEY, code)
        } catch {
          // Ignore: the choice just won't persist across visits.
        }
      },
    }),
    [lang, language]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

// Renders a translated string, turning **segments** into <strong>.
export function rich(text) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))
}
