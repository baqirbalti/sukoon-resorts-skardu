// Navbar.jsx — top bar + mobile menu + "BOOK NOW" popup
// Text/links: siteConfig.js (HOTEL_NAME, NAV_LINKS, NAVBAR) | Colours: theme.css
import { useState, useEffect } from "react";
import { IMGS } from "../assets/images.js";
import { HOTEL_NAME, HOTEL_SHORT_NAME, NAV_LINKS, NAVBAR } from "../siteConfig.js";
import MultiRoomBookingModal from "./MultiRoomBookingModal.jsx";
import ThankYouModal from "./ThankYouModal.jsx";

// Mobile screen detect karne ke liye (768px se chhoti screen)
function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (p) => { setPage(p); setMenuOpen(false); window.scrollTo(0, 0); };

  const openBooking = () => { setIsBookingOpen(true); setMenuOpen(false); };

  // Mobile pe hamesha solid, desktop pe purana behaviour
  const isSolid = isMobile || scrolled || page !== "home";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: isSolid ? "var(--navbar-solid-bg)" : "transparent",
        backdropFilter: isSolid ? "blur(14px)" : "none",
        borderBottom: isSolid ? "1px solid var(--border-grey)" : "none",
        padding: isSolid ? "var(--nav-pad-y) var(--nav-pad-x)" : "var(--nav-pad-y-top) var(--nav-pad-x)",
        boxShadow: isSolid ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease",
      }} className="navbar-container">

        {/* Logo Section */}
        <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <img
            src={IMGS.logo}
            alt={HOTEL_SHORT_NAME}
            style={{ width: "var(--logo-size)", height: "var(--logo-size)", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)", flexShrink: 0 }}
          />
          <span className="navbar-logo-text" style={{
            fontFamily: "var(--font-heading)", fontWeight: 700,
            color: isSolid ? "var(--text-main)" : "var(--text-on-dark)",
            transition: "color 0.4s",
            whiteSpace: "normal",
            lineHeight: 1.1
          }}>
            {HOTEL_NAME.toUpperCase()}
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "var(--nav-gap)", alignItems: "center" }} className="desktop-nav-links">
          {NAV_LINKS.map(({ label, key }) => (
            <span
              key={key}
              onClick={() => navigate(key)}
              style={{
                cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 16, letterSpacing: 1,
                color: page === key ? "var(--gold)" : (isSolid ? "var(--text-main)" : "var(--text-on-dark)"),
                borderBottom: page === key ? "1px solid var(--gold)" : "1px solid transparent",
                paddingBottom: 2, fontWeight: page === key ? 700 : 600,
                transition: "color 0.3s, border-color 0.3s",
              }}
            >
              {label}
            </span>
          ))}
          <button onClick={openBooking} className="btn-gold" style={{ padding: "8px 20px", fontSize: 12 }}>
            {NAVBAR.bookNow}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            display: "none", background: "none", border: "none",
            color: isSolid ? "var(--text-main)" : "var(--text-on-dark)", fontSize: 28, lineHeight: 1,
            padding: 0, marginLeft: "10px"
          }}
          className="hamburger-btn"
        >
          ☰
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "var(--navbar-solid-bg)",
          zIndex: 200, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 28, overflowY: "auto", padding: "20px 0",
        }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: "absolute", top: 22, right: 26, background: "none", border: "none", fontSize: 32, color: "var(--text-main)" }}
          >
            ✕
          </button>
          <img src={IMGS.logo} alt="logo" style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)", marginBottom: 8 }} />
          {NAV_LINKS.map(({ label, key }) => (
            <span
              key={key}
              onClick={() => navigate(key)}
              style={{
                fontFamily: "var(--font-heading)", fontSize: "var(--fs-menu)", cursor: "pointer",
                color: page === key ? "var(--gold)" : "var(--text-main)", fontWeight: 600,
              }}
            >
              {label}
            </span>
          ))}
          <button
            onClick={openBooking}
            className="btn-whatsapp"
            style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}
          >
            {NAVBAR.bookNowMobile}
          </button>
        </div>
      )}

      {/* Multi-room booking flow */}
      {isBookingOpen && (
        <MultiRoomBookingModal
          onClose={() => setIsBookingOpen(false)}
          onSuccess={() => { setIsBookingOpen(false); setIsThankYouOpen(true); }}
        />
      )}
      {isThankYouOpen && <ThankYouModal onClose={() => setIsThankYouOpen(false)} />}

      <style>{`
        .navbar-logo-text { font-size: var(--fs-nav-logo); letter-spacing: var(--ls-nav-logo); }

        /* Tablet + Mobile: menu hamburger mein (1023px aur us se choti screen) */
        @media (max-width: 1023px) {
          .desktop-nav-links { display: none !important; }
          .hamburger-btn { display: block !important; min-width: 44px; min-height: 44px; }
        }
      `}</style>
    </>
  );
}
