// components/RoomCard.jsx — ek room ka card (Rooms page + Home "Featured Rooms")
// Text: siteConfig.js → ROOM_CARD | Room data: data/rooms.js | Colours: theme.css
import AnimBlock from "./AnimBlock.jsx";
import { ROOM_CARD } from "../siteConfig.js";

export default function RoomCard({ room, setPage, setRoomId, delay = 0 }) {
  const handleClick = () => {
    setRoomId(room.id);
    setPage("room-detail"); 
    window.scrollTo(0, 0);
  };

  return (
    <AnimBlock delay={delay}>
      <div 
        onClick={handleClick} 
        style={{
          background: "var(--bg-white)",
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.06)";
        }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={room.heroImg}
            alt={room.name}
            loading="lazy"
            className="responsive-img"
            style={{ aspectRatio: "4/3", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", top: 16, right: 16,
            background: "var(--accent)", color: "var(--text-white)",
            fontSize: 11, fontFamily: "var(--font-body)",
            letterSpacing: 2, padding: "6px 14px", borderRadius: "4px",
            fontWeight: 700, boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }}>
            {room.category ? room.category.toUpperCase() : ROOM_CARD.badgeFallback}
          </div>
        </div>

        <div className="card-pad" style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-card-title)", color: "var(--text-main)", margin: "0 0 12px", fontWeight: 600, lineHeight: 1.1 }}>
            {room.name}
          </h3>

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginBottom: "24px", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>🛏 {room.beds || ROOM_CARD.bedsFallback}</span>
            <span style={{ color: "var(--border-input)" }}>|</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>📐 {room.size || ROOM_CARD.sizeFallback}</span>
          </div>

          <div style={{ flexGrow: 1 }}></div>
          <div style={{ height: 1, background: "var(--divider-soft)", marginBottom: 20 }}></div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 11, color: "var(--text-soft)", fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: 1 }}>{ROOM_CARD.startingFrom}</p>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "var(--accent)", fontWeight: 700 }}>{room.price}</span>
            </div>

            <button style={{
              background: "var(--accent)", color: "var(--text-white)", border: "none", padding: "10px 20px", borderRadius: "6px", fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: 1, fontWeight: "bold", cursor: "pointer", transition: "background 0.3s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "var(--accent-hover)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--accent)"}>
              {ROOM_CARD.viewButton}
            </button>
          </div>
        </div>
      </div>
    </AnimBlock>
  );
}
