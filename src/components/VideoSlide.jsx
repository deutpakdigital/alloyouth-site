import { useRef } from 'react'

export default function VideoSlide({ video, image }) {
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
          <h1 className="video-title">Alloyouth</h1>
          <p className="video-subtitle">
            Bringing the world's finest chocolates, premium teas, and quality foods closer to you.
            With decades of experience and a commitment to international standards, we deliver
            authentic taste, exceptional quality, and trusted products to every home.
          </p>
        </div>
      ) : null}
    </section>
  )
}
