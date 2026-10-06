// pages/AmenitiesPage.jsx — Amenities page. Text/images: siteConfig.js → AMENITIES_PAGE | Colours: theme.css
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import { WHATSAPP_NUMBER, AMENITIES_PAGE as T } from "../siteConfig.js";
import { buildBookingMessage } from "../config.js";

export default function AmenitiesPage({ setPage }) {
  const AMENITIES = T.items;
  const headingStyle = { fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2-sm)", color: "var(--text-main)", margin: "0 0 18px", fontWeight: 400 };
  const textStyle = { fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: 1.9 };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--page-top)" }}>

      {/* Header */}
      <div className="page-header" style={{ background: "var(--bg-dark)" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center" }}>{T.label}</p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h1)", color: "var(--text-on-dark)", fontWeight: 300, letterSpacing: "var(--ls-title)" }}>
            {T.title}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-soft)", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.8 }}>
            {T.text}
          </p>
        </AnimBlock>
      </div>

      {/* Quick icons strip */}
      <div className="strip-pad" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-tan)" }}>
        <div className="icon-strip" style={{ maxWidth: 900, margin: "0 auto" }}>
          {AMENITIES.map(({ icon, title }) => (
            <div key={title} style={{ textAlign: "center", minWidth: 90 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 1, color: "var(--text-muted)", margin: 0 }}>{title.toUpperCase().split(" ")[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alternating content blocks */}
      <div className="section-pad" style={{ maxWidth: 1100, margin: "0 auto" }}>
        {AMENITIES.map(({ icon, title, desc, img, from }, i) => (
          <div
            key={title}
            className="two-col"
            style={{ marginBottom: i < AMENITIES.length - 1 ? "var(--row-gap)" : 0 }}
          >
            {from === "left" ? (
              <>
                <AnimBlock from="left">
                  <div>
                    <div style={{ fontSize: 38, marginBottom: 14 }}>{icon}</div>
                    <div className="gold-divider" />
                    <h2 style={headingStyle}>{title}</h2>
                    <p style={textStyle}>{desc}</p>
                  </div>
                </AnimBlock>
                <AnimBlock from="right">
                  <img src={img} alt={title} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "center", boxShadow: "var(--img-shadow-x) var(--img-shadow-x) 0 var(--gold)", background: "var(--bg-secondary)" }} />
                </AnimBlock>
              </>
            ) : (
              <>
                <AnimBlock from="left">
                  <img src={img} alt={title} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "center", boxShadow: "calc(var(--img-shadow-x) * -1) var(--img-shadow-x) 0 var(--gold)", background: "var(--bg-secondary)" }} />
                </AnimBlock>
                <AnimBlock from="right">
                  <div>
                    <div style={{ fontSize: 38, marginBottom: 14 }}>{icon}</div>
                    <div className="gold-divider" />
                    <h2 style={headingStyle}>{title}</h2>
                    <p style={textStyle}>{desc}</p>
                  </div>
                </AnimBlock>
              </>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="page-header" style={{ background: "var(--bg-dark)" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center" }}>{T.cta.label}</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2)", color: "var(--text-on-dark)", margin: "0 0 14px", fontWeight: 400 }}>
            {T.cta.heading}
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-soft)", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.8 }}>
            {T.cta.text}
          </p>
          <button
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBookingMessage())}`, "_blank")}
            className="btn-whatsapp"
            style={{ margin: "0 auto" }}
          >
            {T.cta.button}
          </button>
        </AnimBlock>
      </div>

      <Footer setPage={setPage} />

    </div>
  );
}
