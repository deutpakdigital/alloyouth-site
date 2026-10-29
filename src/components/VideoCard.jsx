import { useRef, useState } from 'react'
import { PlayIcon } from './Icons.jsx'

// A video that shows a still frame with a play button until it's clicked.
export default function VideoCard({ src, label, playLabel, variant = 'accent', className = '' }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const play = () => {
    setPlaying(true)
    const video = videoRef.current
    if (video) {
      video.currentTime = 0
      video.play().catch(() => {})
    }
  }

  return (
    <div className={`video-card ${className}`}>
      <video ref={videoRef} src={`${src}#t=0.5`} preload="metadata" playsInline controls={playing} />
      {!playing && (
        <>
          <button type="button" className={`play-btn play-btn--${variant}`} aria-label={playLabel} onClick={play}>
            <PlayIcon size={variant === 'accent' ? 26 : 22} />
          </button>
          <span className="video-card-label">{label}</span>
        </>
      )}
    </div>
  )
}
