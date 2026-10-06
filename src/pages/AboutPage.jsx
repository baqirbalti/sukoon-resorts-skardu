// pages/AboutPage.jsx — About page. Text/images: siteConfig.js → ABOUT | Colours: theme.css
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import { ABOUT } from "../siteConfig.js";

export default function AboutPage({ setPage }) {
  const D = ABOUT.design;
  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--page-top)" }}>

      {/* Hero */}
      <div className="about-hero">
        <img src={ABOUT.heroImage} alt={ABOUT.heroAlt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", background: "var(--bg-secondary)" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--overlay-about-hero)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 var(--section-px)" }}>
          <div>
            <p className="section-label" style={{ textAlign: "center" }}>{ABOUT.label}</p>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h1)", color: "var(--text-on-dark)", fontWeight: 300, letterSpacing: "var(--ls-title)", margin: 0 }}>
              {ABOUT.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="section-pad" style={{ maxWidth: 860, margin: "0 auto" }}>
        <AnimBlock>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2)", color: "var(--text-main)", textAlign: "center", fontWeight: 400, margin: "0 0 0" }}>
            {ABOUT.storyHeading}
          </h2>
          <div className="gold-divider--center gold-divider" style={{ display: "block" }} />
          {ABOUT.paragraphs.map((para, i) => (
            <AnimBlock key={i} delay={i * 0.1}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 22, textAlign: "center" }}>{para}</p>
            </AnimBlock>
          ))}
        </AnimBlock>

        {/* Stats */}
        <div className="stats-grid" style={{ marginTop: 60 }}>
          {ABOUT.stats.map(([num, label]) => (
            <AnimBlock key={label}>
              <div style={{ textAlign: "center", padding: "32px 16px", border: "1px solid var(--border-tan)", background: "var(--bg-card)" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-stat)", color: "var(--gold)", margin: "0 0 8px", fontWeight: 700 }}>{num}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 2, color: "var(--text-muted)", margin: 0, textTransform: "uppercase" }}>{label}</p>
              </div>
            </AnimBlock>
          ))}
        </div>
      </div>

      {/* Two-column story + image */}
      <section className="section-pad" style={{ background: "var(--bg-secondary)" }}>
        <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimBlock from="left">
            <img src={D.image} alt={D.imageAlt} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", boxShadow: "var(--img-shadow-x) var(--img-shadow-x) 0 var(--gold)", background: "var(--bg-secondary)" }} />
          </AnimBlock>
          <AnimBlock from="right">
            <p className="section-label">{D.label}</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2-sm)", color: "var(--text-main)", margin: "0 0 0", fontWeight: 400 }}>
              {D.heading}
            </h2>
            <div className="gold-divider" />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 18 }}>{D.paragraphs[0]}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-muted)", lineHeight: 1.9 }}>{D.paragraphs[1]}</p>
          </AnimBlock>
        </div>
      </section>

      <Footer setPage={setPage} />

    </div>
  );
}
