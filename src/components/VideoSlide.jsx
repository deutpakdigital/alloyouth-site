import { useRef } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function VideoSlide({ video, image }) {
  const { t } = useI18n()
  const videoRef = useRef(null)
  const hasVideo = !!video
  const hasImage = !!image

  return (
    <section className="slide slide--video" data-slide="0">
      {hasImage && !hasVideo ? <img className="video-bg" src={image} alt="" /> : null}

      {hasVideo ? (
        <video className="video-bg" ref={videoRef} src={video} autoPlay muted loop playsInline />
      ) : (
        <div className="video-placeholder">
          <button
            className="video-play"
            aria-label="Play video"
            onClick={() => alert('No video configured yet.')}
          >
            <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <p>Video Slide</p>
          <span className="video-hint">
            Placeholder — set `video` in HeroSlider config to embed your video
          </span>
        </div>
      )}

      {hasVideo ? (
        <div className="video-overlay">
          <h1 className="video-title">{t.hero.title}</h1>
          <p className="video-subtitle">{t.hero.subtitle}</p>
        </div>
      ) : null}
    </section>
  )
}
