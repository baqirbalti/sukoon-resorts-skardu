// pages/RoomDetailPage.jsx — Single room page. Room data: data/rooms.js | Text: siteConfig.js → ROOM_DETAIL | Colours: theme.css
import { useState, useEffect } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";
import ThankYouModal from "../components/ThankYouModal.jsx";
import MultiRoomBookingModal from "../components/MultiRoomBookingModal.jsx";
import { ROOMS, defaultVariantKey } from "../data/rooms.js";
import { ROOM_DETAIL as T, HOTEL_EMAIL, HOTEL_ROOM_PAGE_PHONE } from "../siteConfig.js";

// ── Reusable Info Box Component ───────────────────────────────
function InfoBox({ title, items, children, center = false }) {
  return (
    <div className="infobox" style={{ border: "1px solid var(--border-strong)", borderRadius: 4, marginBottom: "20px", background: "var(--bg-white)" }}>
      <h3 style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-infobox-title)", color: "var(--text-main)", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 16px", fontWeight: 400, borderBottom: "1px solid var(--border-grey)", paddingBottom: 12, textAlign: center ? "center" : "left" }}>
        {title}
      </h3>
      {items && items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
          <span style={{ color: "var(--gold)", fontSize: 14 }}>➔</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-dark)", lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
      {children}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function RoomDetailPage({ roomId, setPage }) {
  const room = ROOMS.find(r => r.id === roomId) || ROOMS[0];
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [galleryLightboxIdx, setGalleryLightboxIdx] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [roomId]);

  // Build lightbox-friendly image objects from the room's gallery array
  const galleryImages = room.gallery.map((src, i) => ({
    src,
    alt: T.photoAlt(room, i),
    caption: T.photoCaption(room, i, room.gallery.length),
  }));

  const priceLine = { fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-dark)", fontWeight: 700 };
  const centeredLine = { fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-dark)", margin: 0, textAlign: "center" };

  return (
    <div style={{ background: "var(--bg-section)", minHeight: "100vh", paddingTop: "var(--page-top)" }}>
      
      {/* Hero image */}
      <div className="room-hero">
        <img src={room.heroImg} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "var(--overlay-room-hero)" }} />
        <div className="room-hero-title" style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h1-detail)", color: "var(--text-white)", margin: 0, fontWeight: 300 }}>
            {room.name}
          </h1>
        </div>
      </div>

      {/* Main Content Split Layout */}
      <div className="detail-split pad-detail">

        {/* Left Column */}
        <div>
          <AnimBlock>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-body-sm)", color: "var(--text-dark)", lineHeight: 1.8, marginBottom: 40 }}>
              {room.longDesc}
            </p>
          </AnimBlock>

          <AnimBlock delay={0.1}>
            <InfoBox title={T.measurements} items={room.measurements} />
            <InfoBox title={T.facilities} items={room.facilities} />
            <InfoBox title={T.extra} items={room.extra} />
          </AnimBlock>
        </div>

        {/* Right Column */}
        <div className="detail-aside">
          <AnimBlock delay={0.2}>
            
            <InfoBox title={T.price} center>
              <div style={{ textAlign: "center" }}>
                
                {/* 1st Line: Non-AC Price */}
                <p style={{ ...priceLine, margin: room.priceAC ? "0 0 8px" : "0 0 16px" }}>
                  <span style={{ color: "var(--gold)", marginRight: 8 }}>➔</span> {room.price} {T.perNightNonAC}
                </p>

                {/* 2nd Line: With AC Price (sirf jab rooms.js mein priceAC ho) */}
                {room.priceAC && (
                  <p style={{ ...priceLine, margin: "0 0 16px" }}>
                    <span style={{ color: "var(--gold)", marginRight: 8 }}>➔</span> {room.priceAC} {T.perNightAC}
                  </p>
                )}

                <button
                  onClick={() => setIsBookingOpen(true)}
                  style={{
                    width: "100%", padding: "12px", background: "var(--accent)", color: "var(--text-white)", border: "none", borderRadius: 4, 
                    fontWeight: 600, fontSize: 14, fontFamily: "var(--font-body)", cursor: "pointer"
                  }}
                >
                  {T.bookButtonPrefix} {room.category}
                </button>
              </div>
            </InfoBox>

            <InfoBox title={T.amenities} items={room.amenities} center />

            <InfoBox title={T.callUs} center>
              <p style={centeredLine}>
                <span style={{ color: "var(--gold)", marginRight: 8 }}>📞</span> {HOTEL_ROOM_PAGE_PHONE}
              </p>
            </InfoBox>

            <InfoBox title={T.emailUs} center>
              <p style={centeredLine}>
                <span style={{ color: "var(--gold)", marginRight: 8 }}>✉️</span> {HOTEL_EMAIL}
              </p>
            </InfoBox>

          </AnimBlock>
        </div>
      </div>

      {/* Photo Gallery — grid on desktop, swipeable carousel on mobile, opens Lightbox on click */}
      <div className="pad-x" style={{ maxWidth: 1100, margin: "0 auto 80px" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h3)", color: "var(--text-main)", margin: "0 0 20px" }}>{T.galleryTitle}</h3>
        <div className="room-gallery-grid">
          {room.gallery.map((src, i) => (
            <div key={i} className="room-gallery-item" onClick={() => setGalleryLightboxIdx(i)}>
              <img src={src} alt={T.gridAlt(room, i)} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Modals — same booking popup as Navbar "BOOK NOW", is room ka Non-AC rate pehle se selected */}
      {isBookingOpen && (
        <MultiRoomBookingModal
          initialQuantities={{ [defaultVariantKey(room)]: 1 }}
          primaryRoomId={room.id}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={() => { setIsBookingOpen(false); setIsThankYouOpen(true); }}
        />
      )}
      {isThankYouOpen && <ThankYouModal onClose={() => setIsThankYouOpen(false)} />}
      {galleryLightboxIdx !== null && (
        <Lightbox
          images={galleryImages}
          startIndex={galleryLightboxIdx}
          onClose={() => setGalleryLightboxIdx(null)}
        />
      )}

      <Footer setPage={setPage} />

    </div>
  );
}
