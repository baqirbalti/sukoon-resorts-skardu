// components/ThankYouModal.jsx — Shared post-booking confirmation dialog (text: siteConfig.js → THANK_YOU)
import { THANK_YOU } from "../siteConfig.js";

export default function ThankYouModal({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "var(--overlay)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "var(--bg-section)", maxWidth: 440, width: "100%", borderRadius: 12, padding: "var(--modal-pad-y) var(--modal-pad-x)", textAlign: "center", position: "relative", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
      >
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--text-soft)" }}>✕</button>
        <div style={{ fontSize: 46, marginBottom: 14 }}>✅</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h3)", color: "var(--text-main)", margin: "0 0 14px" }}>{THANK_YOU.title}</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.8, margin: "0 0 28px" }}>
          {THANK_YOU.message}
        </p>
        <button
          onClick={onClose}
          style={{ background: "var(--accent)", color: "var(--text-white)", border: "none", padding: "12px 34px", borderRadius: 6, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 14, letterSpacing: 1, cursor: "pointer" }}
        >
          {THANK_YOU.button}
        </button>
      </div>
    </div>
  );
}
