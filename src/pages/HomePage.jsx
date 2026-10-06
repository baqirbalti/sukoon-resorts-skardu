// pages/HomePage.jsx — Home page (sections: Hero, Welcome+QuickBook, Featured Rooms, Dining, Amenities, Reviews, Location, CTA)
// Text/images/reviews: siteConfig.js (HOME, REVIEWS) | Colours: theme.css | Page CSS: neeche PAGE_CSS
import { useState, useEffect, useRef } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppIcon from "../components/WhatsAppIcon.jsx";
import { ROOMS } from "../data/rooms.js";
import { buildBookingMessage, todayStr } from "../config.js";
import { HOME, REVIEWS, WHATSAPP_NUMBER, BOOKING_COM_URL, MAP_EMBED_URL, MAP_OPEN_URL, PLUS_CODE } from "../siteConfig.js";

const GoldenDivider = () => (
  <div style={{ height: 1, background: "linear-gradient(to right, transparent 0%, var(--gold-line-a) 30%, var(--gold-line-b) 50%, var(--gold-line-a) 70%, transparent 100%)", opacity: 0.35, margin: 0 }} />
);

function HeroSection() {
  const [slide, setSlide] = useState(0);
  const { slides, intervalMs, titleLine1, highlight, subtitle } = HOME.hero;

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), intervalMs);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-container">
      {slides.map((src, i) => (
        <div
          key={i}
          className="hero-slide"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: i === slide ? 1 : 0,
            transform: i === slide ? "scale(1.04)" : "scale(1)",
            transition: "opacity 1.3s ease, transform 7s ease",
          }}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 var(--section-px)" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-hero)", color: "var(--text-white)", fontWeight: 600, letterSpacing: 1, lineHeight: 1.2, margin: "0 0 16px", animation: "fadeUp 1.2s ease 0.3s both", textShadow: "0 4px 15px rgba(0,0,0,0.4)" }}>
          {titleLine1} <br />
          <span style={{ color: "var(--gold-bright)", fontStyle: "italic", fontWeight: 600 }}>{highlight}</span>
        </h1>
        <div style={{ width: 60, height: 2, background: "var(--gold-bright)", margin: "16px auto 24px", animation: "expandW 1s ease 0.8s both" }} />
        <p style={{ fontFamily: "var(--font-body)",fontWeight: 700, fontSize: "var(--fs-hero-sub)", color: "var(--text-hero-sub)", letterSpacing: "var(--ls-hero-sub)", textTransform: "uppercase", animation: "fadeUp 1s ease 1s both", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}

function QuickBookBar() {
  const T = HOME.quickBook;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(T.defaultGuests);

  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
    : todayStr();

  const handleCheck = () => {
    const msg = buildBookingMessage(null, checkIn, checkOut, guests);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputStyle = { padding: "12px 16px", border: "1px solid var(--border-grey)", borderRadius: 8, color: "var(--text-dark)", fontSize: 15, fontFamily: "var(--font-body)", outline: "none", width: "100%", boxSizing: "border-box" };
  const labelStyle = { fontSize: 13, color: "var(--text-body)", marginBottom: 8, fontWeight: 700, fontFamily: "var(--font-body)" };

  return (
    <div style={{ maxWidth: 1050, margin: "40px auto", position: "relative", zIndex: 10 }}>
      <AnimBlock>
        <div className="quick-book-grid quick-book-box" style={{ background: "var(--bg-white)", borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>{T.checkIn}</label>
            <input type="date" min={todayStr()} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); setCheckOut(""); }} style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>{T.checkOut}</label>
            <input type="date" min={minCheckOut} value={checkOut} disabled={!checkIn} onChange={(e) => setCheckOut(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>{T.guests}</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)} style={{ ...inputStyle, background: "var(--bg-white)", cursor: "pointer" }}>
              {T.guestOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <button
              onClick={handleCheck}
              style={{ width: "100%", padding: "13px 24px", background: "var(--accent)", color: "var(--text-white)", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, fontFamily: "var(--font-body)", cursor: "pointer", transition: "background 0.3s", height: 47 }}
            >
              {T.button}
            </button>
          </div>
        </div>
      </AnimBlock>
    </div>
  );
}

function WelcomeSection() {
  const T = HOME.welcome;
  return (
    <>
      <section style={{ background: "var(--bg-white)" }} className="section-pad">
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <AnimBlock>
            <div style={{ textAlign: "center", maxWidth: 850, margin: "0 auto" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2-xl)", color: "var(--text-main)", margin: "0 0 10px", fontWeight: "bold" }}>{T.heading}</h2>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-lead)", color: "var(--accent)", margin: "0 0 24px", fontWeight: "bold" }}>{T.subheading}</h3>
              <div className="gold-divider gold-divider--center" />
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", color: "var(--text-body)", lineHeight: 1.8, marginBottom: 20 }}>{T.text}</p>
            </div>
          </AnimBlock>
          <QuickBookBar />
          <AnimBlock delay={0.2}>
            <div style={{ overflow: "hidden", borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.15)", marginTop: 20 }}>
              <img src={T.image} alt={T.imageAlt} loading="lazy" className="responsive-img welcome-img" />
            </div>
          </AnimBlock>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

function FeaturedRooms({ setPage, setRoomId }) {
  const T = HOME.featured;
  const animationDirs = ["slideInLeft", "fadeUp", "slideInRight"];
  return (
    <>
      <section style={{ background: "var(--bg-section)" }} className="section-pad">
        <AnimBlock>
          <div className="section-head">
            <p className="section-label">{T.label}</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2-xl)", color: "var(--text-main)", fontWeight: 400 }}>{T.heading}</h2>
          </div>
        </AnimBlock>

        <div className="featured-grid">
          {ROOMS.slice(0, T.count).map((room, i) => (
            <div key={room.id} style={{ animation: `${animationDirs[i]} 0.8s ease ${i * 0.2}s both` }}>
              <RoomCard room={room} setPage={setPage} setRoomId={setRoomId} delay={0} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button onClick={() => { setPage("rooms"); window.scrollTo(0, 0); }} className="btn-outline">{T.button}</button>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

function DiningHighlight() {
  const T = HOME.dining;
  return (
    <>
      <section style={{ background: "var(--bg-white)" }} className="section-pad">
        <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimBlock from="left">
            <p className="section-label" style={{ marginBottom: 10 }}>{T.label}</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2)", color: "var(--text-main)", margin: "0 0 24px", lineHeight: 1.2 }}>{T.heading}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {T.points.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ color: "var(--accent)", fontSize: 18, flexShrink: 0 }}>✦</span>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-body)", margin: 0, lineHeight: 1.6 }}>{p}</p>
                </div>
              ))}
            </div>
          </AnimBlock>
          <AnimBlock from="right">
            <img src={T.image} alt={T.imageAlt} loading="lazy" className="responsive-img dining-img" style={{ borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }} />
          </AnimBlock>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

function AmenitiesStrip() {
  const T = HOME.amenities;
  return (
    <>
      <section style={{ background: "var(--bg-section)" }} className="section-pad">
        <AnimBlock>
          <div className="section-head">
            <p className="section-label">{T.label}</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2)", color: "var(--text-main)", fontWeight: 400, margin: 0 }}>{T.heading}</h2>
          </div>
        </AnimBlock>

        <div className="amenity-grid">
          {T.items.map(([icon, title], i) => (
            <AnimBlock key={title} delay={i * 0.05}>
              <div className="amenity-card" style={{ background: "var(--bg-white)", border: "1px solid var(--border-soft)", borderRadius: 6, textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", height: "100%" }}>
                <div style={{ fontSize: 32, marginBottom: 12, color: "var(--accent)" }}>{icon}</div>
                <h4 style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: 1, color: "var(--text-main)", margin: 0, fontWeight: 700 }}>{title}</h4>
              </div>
            </AnimBlock>
          ))}
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

function BookingReviews() {
  const T = HOME.reviews;
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  const getStep = () => {
    const el = scrollRef.current;
    if (!el || !el.children.length) return 350;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 24;
    return el.children[0].offsetWidth + gap;
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -getStep() : getStep(), behavior: "smooth" });
  };

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      const el = scrollRef.current;
      if (!el || pausedRef.current || !el.children.length) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: getStep(), behavior: "smooth" });
    }, T.autoScrollMs);
    return () => clearInterval(timer);
  }, []);

  const stars = (
    <div style={{ display: "flex", gap: 2, color: "var(--booking-blue)", fontSize: 13 }}>
      {[1, 2, 3, 4, 5].map((s) => <span key={s}>★</span>)}
    </div>
  );

  return (
    <>
      <section style={{ background: "var(--bg-section)", overflow: "hidden" }} className="section-pad">
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "30px", width: "100%" }}>

          {/* Header */}
          <div className="reviews-head">
            <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
              <img src={T.thumbImage} alt={T.thumbAlt} loading="lazy" className="reviews-thumb" />
              <div style={{ minWidth: 0 }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h3)", fontWeight: 600, color: "var(--text-main)", margin: "0 0 4px" }}>{T.heading}</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {stars}
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--review-sub)", margin: 0 }}>{T.subtitle}</p>
                </div>
              </div>
            </div>
            <button onClick={() => window.open(BOOKING_COM_URL, "_blank")} className="reviews-write-btn">{T.writeButton}</button>
          </div>

          {/* Carousel */}
          <div style={{ position: "relative", width: "100%" }}>
            <button onClick={() => scroll("left")} className="desktop-arrows rev-arrow" style={{ left: -14 }} aria-label="Previous">‹</button>

            <div
              ref={scrollRef}
              className="review-carousel hide-scrollbar"
              onTouchStart={() => (pausedRef.current = true)}
              onTouchEnd={() => setTimeout(() => (pausedRef.current = false), 3000)}
              onMouseEnter={() => (pausedRef.current = true)}
              onMouseLeave={() => (pausedRef.current = false)}
            >
              {REVIEWS.map((rev, idx) => (
                <div key={idx} className="review-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center", minWidth: 0 }}>
                      {rev.avatarImg ? (
                        <img src={rev.avatarImg} alt={rev.name} loading="lazy" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: rev.avatarColor, color: "var(--text-white)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: 22, flexShrink: 0 }}>{rev.initial}</div>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <h4 style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rev.name}</h4>
                        <p style={{ margin: "3px 0 0", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--review-meta)" }}>
                          {rev.flag} {rev.country} <span style={{ margin: "0 2px" }}>•</span> <span style={{ color: "var(--review-date)" }}>{rev.date}</span>
                        </p>
                      </div>
                    </div>
                    <div style={{ background: "var(--booking-blue)", color: "var(--text-white)", fontWeight: "bold", padding: "4px 8px", borderRadius: 4, fontSize: 12, flexShrink: 0 }}>B.</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16 }}>
                    {stars}
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--booking-verified)", fontWeight: 600 }}>{T.verified}</span>
                  </div>

                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, color: "var(--text-dark)", lineHeight: 1.6, margin: "14px 0 0", flexGrow: 1, overflowWrap: "break-word" }}>
                    "{rev.positive}"
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--review-divider)", marginTop: 20, paddingTop: 16 }}>
                    <a href={BOOKING_COM_URL} target="_blank" rel="noreferrer" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--accent)", textDecoration: "none" }}>{T.readOriginal}</a>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: 34, lineHeight: "20px", color: "var(--review-quote-mark)", height: 20 }}>”</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => scroll("right")} className="desktop-arrows rev-arrow" style={{ right: -14 }} aria-label="Next">›</button>
          </div>
        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

function LocationSection() {
  const T = HOME.location;
  return (
    <>
      <section style={{ background: "var(--bg-white)" }} className="section-pad">
        <div className="two-col" style={{ maxWidth: 1140, margin: "0 auto" }}>

          <div style={{ textAlign: "center" }}>
            <p className="section-label">{T.label}</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2)", color: "var(--text-main)", fontWeight: 400, margin: 0 }}>{T.heading}</h2>
            <div className="gold-divider gold-divider--center" />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--text-body)", marginTop: "16px", marginBottom: "20px" }}>
              📍 {T.plusCodeLabel} <strong>{PLUS_CODE}</strong>
            </p>
            <button onClick={() => window.open(MAP_OPEN_URL, "_blank")} className="btn-gold">{T.button}</button>
          </div>

          <AnimBlock>
            <div className="map-box" style={{ overflow: "hidden", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.06)", border: "1px solid var(--border-soft)", width: "100%" }}>
              <iframe title={T.mapTitle} src={MAP_EMBED_URL} style={{ width: "100%", height: "100%", border: 0 }} loading="lazy" />
            </div>
          </AnimBlock>

        </div>
      </section>
      <GoldenDivider />
    </>
  );
}

function CTABanner() {
  const T = HOME.cta;
  return (
    <section style={{ background: "var(--bg-section)", textAlign: "center" }} className="section-pad">
      <AnimBlock>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2)", color: "var(--text-main)", fontWeight: 400, margin: "0 0 16px" }}>{T.heading}</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-body)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8 }}>{T.text}</p>
        <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBookingMessage())}`, "_blank")} className="btn-whatsapp">
          <WhatsAppIcon size={20} />
          {T.button}
        </button>
      </AnimBlock>
    </section>
  );
}

const PAGE_CSS = `
  /* Reviews — DESIGN (sizes/columns: responsive.css) */
  .reviews-thumb { width:108px; height:72px; object-fit:cover; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.08); flex-shrink:0; }
  .reviews-write-btn {
    padding:13px 34px; background:var(--bg-white); color:var(--text-main); border:1px solid var(--text-main);
    border-radius:999px; font-family:var(--font-body); font-weight:600; font-size:15px; cursor:pointer; transition:all .25s;
  }
  .reviews-write-btn:hover { background:var(--text-main); color:var(--text-white); }
  .review-card {
    background:var(--bg-white); border:1px solid var(--border-soft); border-radius:var(--review-radius);
    padding:var(--review-pad); display:flex; flex-direction:column;
    box-shadow:0 6px 20px rgba(28,18,9,0.04);
  }
  .rev-arrow {
    position:absolute; top:50%; transform:translateY(-50%); z-index:12;
    width:46px; height:46px; border-radius:50%; background:var(--bg-white); border:1px solid var(--border-soft);
    cursor:pointer; font-size:24px; line-height:1; box-shadow:0 4px 14px rgba(0,0,0,0.1);
  }
  @media (max-width: 767px) {
    .reviews-head { flex-direction:column; align-items:flex-start; }
    .reviews-thumb { width:84px; height:60px; }
    .reviews-write-btn { width:100%; }
  }
`;

export default function HomePage({ setPage, setRoomId }) {
  return (
    <div>
      <style>{PAGE_CSS}</style>
      <HeroSection />
      <WelcomeSection />
      <FeaturedRooms setPage={setPage} setRoomId={setRoomId} />
      <DiningHighlight />
      <AmenitiesStrip />
      <BookingReviews />
      <LocationSection />
      <CTABanner />
      <Footer setPage={setPage} />
    </div>
  );
}
