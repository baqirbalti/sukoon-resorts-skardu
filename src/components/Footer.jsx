// Footer.jsx — text/links: siteConfig.js (FOOTER, NAV_LINKS, SOCIAL, HOTEL_*) | colours: theme.css
import { IMGS } from "../assets/images.js";
import { HOTEL_NAME, HOTEL_LOCATION, HOTEL_EMAIL, HOTEL_PHONE, WHATSAPP_NUMBER, FOOTER, NAV_LINKS, SOCIAL } from "../siteConfig.js";

export default function Footer({ setPage }) {
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };

  const headingStyle = { fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 3, color: "var(--gold)", marginBottom: 20 };
  const textStyle = { fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-soft)", margin: "0 0 10px" };
  const socialStyle = { display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-soft)", margin: "0 0 10px", textDecoration: "none", transition: "color 0.3s" };
  const hoverIn  = e => e.target.style.color = "var(--gold)";
  const hoverOut = e => e.target.style.color = "var(--text-soft)";

  return (
    <footer className="footer-pad" style={{ background: "var(--bg-darker)", borderTop: "1px solid var(--gold)" }}>
      <div className="footer-grid">

        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src={IMGS.logo} alt={FOOTER.logoAlt} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--gold)" }} />
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 18, color: "var(--text-on-dark)", letterSpacing: 2 }}>
              {HOTEL_NAME.toUpperCase()}
            </span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-soft)", lineHeight: 1.8 }}>
            {FOOTER.tagline}<br />{HOTEL_LOCATION}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={headingStyle}>{FOOTER.navigateTitle}</h4>
          {NAV_LINKS.map(({ label, key }) => (
            <p key={key} onClick={() => navigate(key)} style={{ ...textStyle, cursor: "pointer", transition: "color 0.3s" }}
              onMouseOver={hoverIn} onMouseOut={hoverOut}
            >{label}</p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={headingStyle}>{FOOTER.contactTitle}</h4>
          <p style={textStyle}>📍 {HOTEL_LOCATION}</p>
          <p style={textStyle}>📞 {HOTEL_PHONE}</p>
          <p style={textStyle}>📧 {HOTEL_EMAIL}</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, color: "var(--whatsapp)", fontFamily: "var(--font-body)", fontSize: 13, textDecoration: "none" }}>
            {FOOTER.whatsappLink}
          </a>
        </div>

        {/* Social */}
        <div>
          <h4 style={headingStyle}>{FOOTER.socialTitle}</h4>
          <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" style={socialStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>
            {FOOTER.instagramLabel}
          </a>
          <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" style={socialStyle} onMouseOver={hoverIn} onMouseOut={hoverOut}>
            {FOOTER.facebookLabel}
          </a>
        </div>

      </div>

      <div style={{ borderTop: "1px solid var(--footer-divider)", paddingTop: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-soft)", margin: 0 }}>
          © {new Date().getFullYear()} {HOTEL_NAME} · {HOTEL_LOCATION} · {FOOTER.copyrightSuffix}
        </p>
      </div>
    </footer>
  );
}
