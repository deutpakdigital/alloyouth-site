// The yellow call-to-action band used at the bottom of Home and Products.
export default function CtaBand({ title, text, children }) {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div className="cta-band-copy">
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">{children}</div>
      </div>
    </section>
  )
}
