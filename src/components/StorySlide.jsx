import { useEffect, useRef } from 'react'

export default function StorySlide({
  heading = 'Our Story',
  subtitle = 'Rooted in Heritage. Driven by Excellence.',
  video = '/assets/promo1.mp4',
  playbackRate = 1,
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate
  }, [playbackRate])

  return (
    <section className="slide slide--story" data-slide="2">
      <video className="story-bg" ref={videoRef} src={video} autoPlay muted loop playsInline />

      <div className="story-content">
        <h2>{heading}</h2>
        <p className="story-subtitle">{subtitle}</p>
        <p>
          For more than five decades, our journey has been guided by a simple principle: delivering
          trusted, high-quality food products while building lasting relationships founded on
          integrity, reliability, and excellence.
        </p>
        <p>
          The story of <strong>Alloyouth Joint Stock Company for Food Import</strong> began in the
          1970s, rooted in our family's longstanding tradition in the food trade. Our heritage traces
          back to Bani Laith in Msallata, a region celebrated for its rich cultural legacy and the
          production of some of Libya's finest olive oil.
        </p>
        <p>
          In <strong>1992</strong>, we established our wholesale food distribution center in Tripoli,
          laying the foundation for decades of trusted partnerships across the Libyan market.
          Building on this success, <strong>Alloyouth Joint Stock Company for Food Import</strong> was
          formally incorporated in <strong>2004</strong> as a family-owned joint-stock company
          specializing in the importation and nationwide distribution of premium international food
          brands.
        </p>
        <p>
          Today, we are a trusted importer and distributor, connecting leading global food
          manufacturers with customers throughout Libya. Every product we supply reflects our
          commitment to international standards of quality, safety, and reliability.
        </p>
        <p>
          In <strong>2026</strong>, we will embark on an exciting new chapter as we begin our digital
          transformation. By extending our decades of distribution expertise into the online
          marketplace, we will make premium international food brands more accessible while
          continuing to uphold the values of excellence, trust, and long-term partnership that have
          defined our company for generations.
        </p>
      </div>

      <footer className="story-footer">
        <div className="footer-col footer-col--social">
          <h4>Follow Us</h4>
          <a
            className="btn-link"
            href="https://www.facebook.com/alloyouthfoodcompany/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>

        <div className="footer-col footer-col--contact">
          <h4>Contact Information</h4>
          <ul>
            <li>Address: Msallata City - towards Tarhuna City, 1 km</li>
            <li>Email: info@allouyouth.ly</li>
            <li>Phone: +218 92-3055396</li>
          </ul>
        </div>

        <div className="footer-col footer-col--links">
          <h4>Partners</h4>
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
