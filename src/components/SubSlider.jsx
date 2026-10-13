import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SubSlider({ items = [], index = 0, onChange }) {
  const stackRef = useRef(null)
  const prevIndex = useRef(index)
  const isFirstRun = useRef(true)

  useEffect(() => {
    const slides = stackRef.current.children

    if (isFirstRun.current) {
      isFirstRun.current = false
      Array.from(slides).forEach((slide, i) => {
        gsap.set(slide, { autoAlpha: i === index ? 1 : 0 })
        gsap.set(slide.querySelectorAll('.sub-media, .sub-info'), {
          xPercent: 0,
          yPercent: 0,
          autoAlpha: 1,
        })
      })
      return
    }

    const outgoing = slides[prevIndex.current]
    const incoming = slides[index]
    const direction = index > prevIndex.current ? 1 : -1
    prevIndex.current = index
    if (outgoing === incoming) return

    gsap.set(outgoing, { zIndex: 2 })
    gsap.set(incoming, { zIndex: 1, autoAlpha: 1 })

    const isMobile = window.innerWidth <= 900
    const tl = gsap.timeline()

    if (isMobile) {
      tl.to(outgoing, { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' }, 0)
        .fromTo(incoming, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0.05)
        .fromTo(
          incoming.querySelector('.sub-media img, .sub-media'),
          { scale: 0.96, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          0.05
        )
        .fromTo(
          incoming.querySelector('.sub-info'),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          0.08
        )
    } else {
      tl.to(
        outgoing.querySelector('.sub-media'),
        { yPercent: direction * 60, autoAlpha: 0, duration: 0.65, ease: 'power3.inOut' },
        0
      )
        .to(
          outgoing.querySelector('.sub-info'),
          { yPercent: direction * -60, autoAlpha: 0, duration: 0.65, ease: 'power3.inOut' },
          0
        )
        .set(outgoing, { autoAlpha: 0, zIndex: 1 })

      tl.fromTo(
        incoming.querySelector('.sub-media'),
        { yPercent: direction * -60, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out' },
        0.1
      ).fromTo(
        incoming.querySelector('.sub-info'),
        { yPercent: direction * 60, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.75, ease: 'power3.out' },
        0.1
      )
    }
  }, [index])

  return (
    <section className="slide slide--sub" data-slide="1">
      <div className="sub-slider" id="subSlider">
        <div className="sub-stack" ref={stackRef}>
          {items.map((item, i) => (
            <div key={i} className={`sub-slide sub-slide--${i + 1}`} data-sub={i}>
              <div className="sub-media">
                {item.image ? (
                  <img className="sub-media-img" src={item.image} alt={item.title} />
                ) : (
                  <div className="sub-media-placeholder">
                    <span>Image {i + 1}</span>
                  </div>
                )}
              </div>
              <div className="sub-info">
                <h3 className="sub-title">{item.title}</h3>
                {item.text.split('\n\n').map((paragraph, j) => (
                  <p key={j} className="sub-text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sub-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`sub-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => onChange(i)}
              aria-label={`Go to sub-slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
