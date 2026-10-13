import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import VideoSlide from './VideoSlide.jsx'
import SubSlider from './SubSlider.jsx'
import StorySlide from './StorySlide.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { brands } from '../data/brands.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

const HERO_VIDEO = '/assets/promo.mp4'
const HERO_IMAGE = ''

const TOTAL_SLIDES = 3
const SUB_SLIDE_INDEX = 1
const WHEEL_THRESHOLD = 60
const SLIDE_DURATION = 1.1
const SUB_LOCK_MS = 900

export default function HeroSlider({ onOpenGallery, initialSlide = 0 }) {
  const { t } = useI18n()
  const [current, setCurrent] = useState(initialSlide)
  const [subIndex, setSubIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const stackRef = useRef(null)
  const currentRef = useRef(0)
  const subIndexRef = useRef(0)
  const lockedRef = useRef(false)
  const lockTimer = useRef(null)
  const wheelAccum = useRef(0)

  useEffect(() => {
    if (initialSlide !== undefined && initialSlide !== currentRef.current) goTo(initialSlide)
  }, [initialSlide])

  useEffect(() => {
    setMenuOpen(false)
  }, [current])

  const lock = useCallback((ms) => {
    lockedRef.current = true
    clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => {
      lockedRef.current = false
    }, ms)
  }, [])

  const goTo = useCallback(
    (target) => {
      const next = Math.max(0, Math.min(TOTAL_SLIDES - 1, target))
      if (next === currentRef.current) {
        wheelAccum.current = 0
        return
      }
      currentRef.current = next
      setCurrent(next)
      wheelAccum.current = 0
      lock(SLIDE_DURATION * 1000)
      if (stackRef.current) {
        gsap.to(stackRef.current, {
          yPercent: -next * 100,
          duration: SLIDE_DURATION,
          ease: 'power3.inOut',
        })
      }
    },
    [lock]
  )

  // Steps through the brand sub-slides before leaving the Products slide.
  const step = useCallback(
    (dir) => {
      if (lockedRef.current) {
        wheelAccum.current = 0
        return
      }
      if (currentRef.current === SUB_SLIDE_INDEX) {
        const nextSub = subIndexRef.current + dir
        if (nextSub >= 0 && nextSub < brands.length) {
          subIndexRef.current = nextSub
          setSubIndex(nextSub)
          wheelAccum.current = 0
          lock(SUB_LOCK_MS)
        } else {
          goTo(currentRef.current + dir)
        }
      } else {
        goTo(currentRef.current + dir)
      }
    },
    [goTo, lock]
  )

  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault()
      if (lockedRef.current) {
        wheelAccum.current = 0
        return
      }
      wheelAccum.current += e.deltaY
      if (Math.abs(wheelAccum.current) >= WHEEL_THRESHOLD) {
        step(wheelAccum.current > 0 ? 1 : -1)
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [step])

  useEffect(() => {
    const onKey = (e) => {
      if (lockedRef.current) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') step(1)
      if (e.key === 'ArrowUp' || e.key === 'PageUp') step(-1)
      if (e.key === 'Home') goTo(0)
      if (e.key === 'End') goTo(TOTAL_SLIDES - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, goTo])

  useEffect(() => {
    let startY = 0
    let startX = 0
    const SWIPE_THRESHOLD = 45

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length === 0) return
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
    }

    const onTouchEnd = (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return
      const endY = e.changedTouches[0].clientY
      const endX = e.changedTouches[0].clientX
      const dy = startY - endY
      const dx = startX - endX

      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) >= SWIPE_THRESHOLD) {
        // Let scrollable brand text scroll before changing slides.
        if (currentRef.current === SUB_SLIDE_INDEX) {
          const activeSlide = document.querySelector(
            ".sub-slide[style*='opacity: 1'], .sub-slide[style*='visibility: inherit']"
          )
          const info = activeSlide
            ? activeSlide.querySelector('.sub-info')
            : document.querySelector('.sub-info')
          if (info && info.scrollHeight > info.clientHeight + 10) {
            const atTop = info.scrollTop <= 5
            const atBottom = info.scrollTop + info.clientHeight >= info.scrollHeight - 10
            if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) return
          }
        }

        // The story slide scrolls internally; only leave it from the top.
        if (currentRef.current === TOTAL_SLIDES - 1) {
          const story = document.querySelector('.slide--story')
          if (story) {
            const atTop = story.scrollTop <= 5
            if (dy < 0 && atTop) step(-1)
            return
          }
        }

        step(dy > 0 ? 1 : -1)
      }
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [step])

  const navClick = (slide) => (e) => {
    e.preventDefault()
    goTo(slide)
  }

  const menuClick = (slide) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    goTo(slide)
  }

  return (
    <div className={`hero ${current === SUB_SLIDE_INDEX ? 'hero--on-sub' : ''}`}>
      <header className={`site-header ${menuOpen ? 'nav-menu-is-open' : ''}`}>
        <div className="logo">
          <img src="/assets/logo_en.png" alt={t.meta.logoAlt} />
        </div>

        <nav className="site-nav">
          <a href="#" onClick={navClick(0)}>{t.nav.home}</a>
          <a href="#" onClick={navClick(2)}>{t.nav.story}</a>
          <a href="#" onClick={navClick(1)}>{t.nav.products}</a>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault()
              onOpenGallery && onOpenGallery()
            }}
          >
            {t.nav.gallery}
          </a>
        </nav>

        <LanguageSwitcher className="lang-switch--header" />

        <button
          className={`navball-btn ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.nav.toggleMenu}
        >
          <span className="navball-dot" />
          <span className="navball-dot" />
          <span className="navball-dot" />
        </button>

        {menuOpen && (
          <div className="navball-menu">
            <a href="#" onClick={menuClick(0)}>{t.nav.home}</a>
            <a href="#" onClick={menuClick(1)}>{t.nav.products}</a>
            <a href="#" onClick={menuClick(2)}>{t.nav.story}</a>
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                onOpenGallery && onOpenGallery()
              }}
            >
              {t.nav.gallery}
            </a>
            <LanguageSwitcher className="lang-switch--menu" onSelect={() => setMenuOpen(false)} />
          </div>
        )}
      </header>

      <div className="hero-stack" ref={stackRef}>
        <VideoSlide video={HERO_VIDEO} image={HERO_IMAGE} />
        <SubSlider items={brands} index={subIndex} onChange={setSubIndex} />
        <StorySlide />
      </div>
    </div>
  )
}
