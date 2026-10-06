// pages/GalleryPage.jsx — Gallery with category filters + lightbox
// Text: siteConfig.js → GALLERY_PAGE | Photos & categories: data/rooms.js | Colours: theme.css
import { useState } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "../data/rooms.js";
import { GALLERY_PAGE as T } from "../siteConfig.js";

export default function GalleryPage({ setPage }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = activeCategory === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--page-top)" }}>

      {/* Page header */}
      <div className="page-header" style={{ background: "var(--bg-dark)" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center" }}>{T.label}</p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h1)", color: "var(--text-on-dark)", fontWeight: 300, letterSpacing: "var(--ls-title)" }}>
            {T.title}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-soft)", maxWidth: 500, margin: "16px auto 0", lineHeight: 1.8 }}>
            {T.text}
          </p>
        </AnimBlock>
      </div>

      {/* Category filter */}
      <div className="filter-bar">
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {GALLERY_CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              className="chip"
              onClick={() => setActiveCategory(id)}
              style={{
                borderRadius: 2, cursor: "pointer",
                border: "1px solid var(--gold)",
                background: activeCategory === id ? "var(--gold)" : "transparent",
                color: activeCategory === id ? "var(--text-on-dark)" : "var(--gold)",
                fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 2,
                fontWeight: 700, transition: "all 0.3s",
              }}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-style grid */}
      <div className="list-pad" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="gallery-grid">
          {filtered.map((img, i) => (
            <AnimBlock key={img.id} delay={i * 0.04}>
              <div
                onClick={() => setLightboxIdx(i)}
                style={{
                  cursor: "zoom-in", overflow: "hidden", borderRadius: 2,
                  background: "var(--bg-secondary)", position: "relative",
                  border: "1px solid var(--border-tan)",
                  aspectRatio: "4/3",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.55s ease" }}
                  onMouseOver={e => e.target.style.transform = "scale(1.07)"}
                  onMouseOut={e => e.target.style.transform = "scale(1)"}
                />
                {/* Hover caption overlay */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent, var(--overlay-caption))",
                  padding: "24px 14px 14px",
                  opacity: 0, transition: "opacity 0.3s",
                }}
                  onMouseOver={e => e.currentTarget.style.opacity = 1}
                  onMouseOut={e => e.currentTarget.style.opacity = 0}
                >
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 14, color: "var(--text-on-dark)", margin: 0, fontStyle: "italic" }}>{img.caption}</p>
                </div>
              </div>
            </AnimBlock>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: "center", fontFamily: "var(--font-body)", color: "var(--text-soft)", padding: "60px 0" }}>
            {T.empty}
          </p>
        )}

        {/* Count */}
        <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-soft)", marginTop: 32, letterSpacing: 1 }}>
          {T.showing(filtered.length)}
        </p>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          images={filtered}
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}

      <Footer setPage={setPage} />
    </div>
  );
}
