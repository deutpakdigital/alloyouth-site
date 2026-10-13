import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { loadGallery } from '../utils/galleryLoader.js'

export default function Gallery({ onNavigateToSlide }) {
  const [activeBrand, setActiveBrand] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const stageRef = useRef(null)
  const bgVideoRef = useRef(null)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const dragDelta = useRef(0)

  const gallery = useMemo(() => loadGallery(), [])
  const brands = useMemo(() => gallery.brands.filter((b) => b.items && b.items.length > 0), [gallery])

  const items = useMemo(() => {
    let list = []
    if (activeBrand === 'all') list = gallery.allItems
    else {
      const brand = brands.find((b) => b.key === activeBrand)
      list = brand ? brand.items : []
    }
    if (typeFilter !== 'all') list = list.filter((item) => item.type === typeFilter)
    return list
  }, [gallery, brands, activeBrand, typeFilter])

  useEffect(() => {
    setActiveIndex(0)
  }, [activeBrand, typeFilter])

  const count = items.length
  const prev = useCallback(() => {
    if (count <= 1) return
    setActiveIndex((i) => (i > 0 ? i - 1 : count - 1))
  }, [count])
  const next = useCallback(() => {
    if (count <= 1) return
    setActiveIndex((i) => (i < count - 1 ? i + 1 : 0))
  }, [count])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxItem(null)
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const onWheel = (e) => {
    if (count <= 1) return
    if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
      e.deltaY > 0 || e.deltaX > 0 ? next() : prev()
    }
  }

  const onMouseDown = (e) => {
    dragging.current = true
    dragStartX.current = e.pageX
    dragDelta.current = 0
  }
  const onMouseMove = (e) => {
    if (!dragging.current) return
    dragDelta.current = e.pageX - dragStartX.current
  }
  const onMouseUp = () => {
    if (!dragging.current) return
    dragging.current = false
    if (dragDelta.current < -40) next()
    else if (dragDelta.current > 40) prev()
  }

  const onTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return
    dragStartX.current = e.touches[0].clientX
    dragDelta.current = 0
  }
  const onTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return
    dragDelta.current = e.touches[0].clientX - dragStartX.current
  }
  const onTouchEnd = () => {
    if (dragDelta.current < -35) next()
    else if (dragDelta.current > 35) prev()
  }

  const hasImages = useMemo(() => gallery.allItems.some((i) => i.type === 'image'), [gallery])
  const hasVideos = useMemo(() => gallery.allItems.some((i) => i.type === 'video'), [gallery])

  return (
    <div className="gallery-page">
      <video
        className="gallery-page-bg"
        ref={bgVideoRef}
        src="/assets/promo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="gallery-page-overlay" />

      <header className={`site-header gallery-header-fixed ${menuOpen ? 'nav-menu-is-open' : ''}`}>
        <div className="logo" onClick={() => onNavigateToSlide(0)} style={{ cursor: 'pointer' }}>
          <img src="/assets/logo_en.png" alt="Alloyouth Grocery Store" />
        </div>

        <nav className="site-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToSlide(0) }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToSlide(2) }}>Our Story</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToSlide(1) }}>Products</a>
          <a href="#gallery" className="is-nav-active">Gallery</a>
        </nav>

        <button
          className={`navball-btn ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="navball-dot" />
          <span className="navball-dot" />
          <span className="navball-dot" />
        </button>

        {menuOpen && (
          <div className="navball-menu">
            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigateToSlide(0) }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigateToSlide(1) }}>Products</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNavigateToSlide(2) }}>Our Story</a>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); setMenuOpen(false) }}>Gallery</a>
          </div>
        )}
      </header>

      <main className="gallery-flow-layout">
        <div className="gallery-flow-header">
          <h1>Product Gallery</h1>
          <p>Cinematic 3D showcase — drag, swipe or use arrows to explore</p>
        </div>

        <div className="gallery-flow-controls">
          <div className="gallery-tabs">
            {brands.length > 1 && (
              <button
                className={`gallery-tab ${activeBrand === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveBrand('all')}
              >
                All Brands ({gallery.totalCount})
              </button>
            )}
            {brands.map((brand) => (
              <button
                key={brand.key}
                className={`gallery-tab ${activeBrand === brand.key ? 'is-active' : ''}`}
                onClick={() => setActiveBrand(brand.key)}
              >
                {brand.displayName} ({brand.items.length})
              </button>
            ))}
          </div>

          {hasImages && hasVideos && (
            <div className="gallery-type-filter">
              <button
                className={`gallery-type-btn ${typeFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setTypeFilter('all')}
              >
                All
              </button>
              <button
                className={`gallery-type-btn ${typeFilter === 'image' ? 'is-active' : ''}`}
                onClick={() => setTypeFilter('image')}
              >
                📷 Images
              </button>
              <button
                className={`gallery-type-btn ${typeFilter === 'video' ? 'is-active' : ''}`}
                onClick={() => setTypeFilter('video')}
              >
                🎥 Videos
              </button>
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <div
            className="flow-stage-container"
            ref={stageRef}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button className="flow-arrow flow-arrow--prev" onClick={prev} aria-label="Previous image">
              ‹
            </button>
            <button className="flow-arrow flow-arrow--next" onClick={next} aria-label="Next image">
              ›
            </button>

            <div className="flow-carousel-track">
              {items.map((item, i) => {
                // Offset from the active card, wrapped so the carousel loops.
                let offset = i - activeIndex
                if (offset < -Math.floor(count / 2)) offset += count
                if (offset > Math.floor(count / 2)) offset -= count
                if (!(Math.abs(offset) <= 3)) return null

                const isActive = offset === 0
                // Horizontal spacing is a fraction of the card width (set in CSS) so it scales with the viewport.
                const xFactor = isActive ? 0 : Math.sign(offset) * (0.58 + (Math.abs(offset) - 1) * 0.26)
                const z = isActive ? 80 : -Math.abs(offset) * 160
                const rotate = offset === 0 ? 0 : offset > 0 ? -35 : 35
                const opacity = isActive ? 1 : Math.max(0.25, 1 - Math.abs(offset) * 0.28)
                const zIndex = 20 - Math.abs(offset)

                return (
                  <div
                    key={item.id}
                    className={`flow-card ${isActive ? 'is-active' : ''}`}
                    style={{
                      transform: `translateX(calc(${xFactor} * var(--card-w))) translateZ(${z}px) rotateY(${rotate}deg)`,
                      opacity,
                      zIndex,
                    }}
                    onClick={() => (isActive ? setLightboxItem(item) : setActiveIndex(i))}
                  >
                    <div className="flow-card-inner">
                      {item.type === 'image' ? (
                        <img src={item.url} alt={item.title} draggable={false} />
                      ) : (
                        <div className="flow-video-wrap">
                          <video src={item.url} muted playsInline preload="metadata" />
                          <div className="gallery-play-badge">▶</div>
                        </div>
                      )}
                      <div className="flow-card-glow" />
                      <div className="flow-reflection">
                        {item.type === 'image' ? (
                          <img src={item.url} alt="" aria-hidden="true" draggable={false} />
                        ) : (
                          <video src={item.url} muted playsInline aria-hidden="true" draggable={false} />
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <div className="flow-caption">
                        <span className="flow-caption-brand">{item.brandName}</span>
                        {item.subcategory && <span className="flow-caption-sub">{item.subcategory}</span>}
                        <span className="flow-caption-title">{item.title}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flow-counter">
              <span>{activeIndex + 1}</span> / <span>{count}</span>
            </div>
          </div>
        ) : null}
      </main>

      {lightboxItem && (
        <div className="lightbox-overlay" onClick={() => setLightboxItem(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxItem(null)}>
              ✕
            </button>
            {lightboxItem.type === 'image' ? (
              <img src={lightboxItem.url} alt={lightboxItem.title} className="lightbox-media" />
            ) : (
              <video src={lightboxItem.url} controls autoPlay className="lightbox-media" />
            )}
            <div className="lightbox-caption">
              <h3>{lightboxItem.brandName}</h3>
              {lightboxItem.subcategory && <p className="lightbox-sub">{lightboxItem.subcategory}</p>}
              <p>{lightboxItem.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
