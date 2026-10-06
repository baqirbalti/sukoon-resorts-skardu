// pages/RoomsPage.jsx — All rooms list with category filter. Text/categories: siteConfig.js → ROOMS_PAGE | Colours: theme.css
import { useState, useEffect } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import RoomCard from "../components/RoomCard.jsx";
import Footer from "../components/Footer.jsx";
import { ROOMS } from "../data/rooms.js";
import { ROOMS_PAGE as T } from "../siteConfig.js";

export default function RoomsPage({ setPage, setRoomId }) {
  const [filter, setFilter] = useState("All");
  const categories = T.categories;
  const filtered = filter === "All" ? ROOMS : ROOMS.filter(r => r.category === filter);

  // Always scroll to top when page opens
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--page-top)" }}>

      {/* Hero banner */}
      <div className="page-header" style={{ background: "var(--bg-dark)" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center", color: "var(--gold)", fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>
            {T.label}
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h1)", color: "var(--text-on-dark)", fontWeight: 300, letterSpacing: "var(--ls-title)", margin: 0 }}>
            {T.title}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-soft)", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.8 }}>
            {T.text}
          </p>
        </AnimBlock>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {categories.map(c => (
            <button
              key={c}
              className="chip"
              onClick={() => setFilter(c)}
              style={{
                borderRadius: 8, cursor: "pointer",
                border: filter === c ? "1px solid var(--accent)" : "1px solid var(--border-grey)",
                background: filter === c ? "var(--accent)" : "var(--bg-white)",
                color: filter === c ? "var(--text-white)" : "var(--text-body)",
                fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: 1,
                fontWeight: 700, transition: "all 0.3s",
                boxShadow: filter === c ? "0 4px 12px var(--accent-shadow)" : "0 2px 5px rgba(0,0,0,0.02)"
              }}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Room grid */}
      <div className="list-pad rooms-grid">
        {filtered.length > 0
          ? filtered.map((room, i) => (
              <RoomCard key={room.id} room={room} setPage={setPage} setRoomId={setRoomId} delay={i * 0.08} />
            ))
          : <p style={{ fontFamily: "var(--font-body)", color: "var(--text-soft)", gridColumn: "1/-1", textAlign: "center", padding: "60px 0" }}>{T.empty}</p>
        }
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}
