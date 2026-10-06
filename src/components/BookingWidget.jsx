// BookingWidget.jsx — Date picker + guest selector → WhatsApp booking
// (Abhi kisi page mein use nahi ho raha.) Text: siteConfig.js → BOOKING_WIDGET | Colours: theme.css
import { useState } from "react";
import { WHATSAPP_NUMBER, BOOKING_WIDGET as T } from "../siteConfig.js";
import { buildBookingMessage, todayStr, formatDate } from "../config.js";

export default function BookingWidget({ roomName = null, compact = false }) {
  const [checkIn,  setCheckIn]  = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests,   setGuests]   = useState(2);
  const [error,    setError]    = useState("");

  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split("T")[0]
    : todayStr();

  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)
    : 0;

  const handleBook = () => {
    if (!checkIn)  { setError(T.errCheckIn); return; }
    if (!checkOut) { setError(T.errCheckOut); return; }
    setError("");
    const msg = buildBookingMessage(roomName, checkIn, checkOut, guests);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputStyle = {
    width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border-tan)",
    padding: "11px 14px", fontFamily: "var(--font-body)", fontSize: 14,
    color: "var(--text-main)", outline: "none", borderRadius: 2,
    boxSizing: "border-box",
  };
  const labelStyle = {
    fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: 2,
    color: "var(--text-soft)", display: "block", marginBottom: 6, textTransform: "uppercase",
  };
  const stepBtn = { width: 34, height: 34, background: "transparent", border: "1px solid var(--border-tan)", color: "var(--text-on-dark)", fontSize: 18, borderRadius: 2 };

  return (
    <div style={{
      background: "var(--bg-dark)", padding: compact ? "24px 20px" : "36px 28px",
      border: "2px solid var(--gold)", borderRadius: 2,
    }}>
      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: compact ? 20 : 24, color: "var(--text-on-dark)", margin: "0 0 6px" }}>
        {roomName ? T.titleRoom : T.titleGeneral}
      </h3>
      <div style={{ width: 36, height: 1, background: "var(--gold)", marginBottom: 20 }} />

      {roomName && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ ...labelStyle }}>{T.selectedRoom}</p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 17, color: "var(--gold)", margin: 0 }}>{roomName}</p>
        </div>
      )}

      {/* Check-in */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>{T.checkIn}</label>
        <input
          type="date"
          min={todayStr()}
          value={checkIn}
          onChange={e => { setCheckIn(e.target.value); setCheckOut(""); setError(""); }}
          style={{ ...inputStyle, colorScheme: "light" }}
        />
      </div>

      {/* Check-out */}
      <div style={{ marginBottom: 14 }}>
        <label style={labelStyle}>{T.checkOut}</label>
        <input
          type="date"
          min={minCheckOut}
          value={checkOut}
          disabled={!checkIn}
          onChange={e => { setCheckOut(e.target.value); setError(""); }}
          style={{ ...inputStyle, opacity: checkIn ? 1 : 0.5, colorScheme: "light" }}
        />
      </div>

      {/* Guests */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>{T.guests}</label>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => setGuests(g => Math.max(1, g - 1))} style={stepBtn}>−</button>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "var(--text-on-dark)", minWidth: 24, textAlign: "center" }}>{guests}</span>
          <button onClick={() => setGuests(g => Math.min(10, g + 1))} style={stepBtn}>+</button>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-soft)" }}>guest{guests > 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Nights summary */}
      {nights > 0 && (
        <div style={{
          background: "var(--gold-tint-bg)", border: "1px solid var(--gold-tint-border)",
          padding: "10px 14px", marginBottom: 16, borderRadius: 2,
        }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--gold)", margin: 0 }}>
            📅 {formatDate(checkIn)} → {formatDate(checkOut)}
          </p>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: 16, color: "var(--text-on-dark)", margin: "4px 0 0" }}>
            {nights} night{nights > 1 ? "s" : ""} · {guests} guest{guests > 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--error-soft)", marginBottom: 12 }}>⚠ {error}</p>
      )}

      {/* Book button */}
      <button
        onClick={handleBook}
        style={{
          width: "100%", background: "var(--whatsapp)", color: "var(--text-white)",
          border: "2px solid var(--gold)", padding: "14px",
          fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: 2,
          fontWeight: 700, borderRadius: 2, display: "flex",
          alignItems: "center", justifyContent: "center", gap: 10,
          animation: "pulse 2s infinite",
        }}
      >
        {roomName ? T.buttonRoom : T.buttonGeneral}
      </button>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-soft)", textAlign: "center", margin: "10px 0 0", letterSpacing: 0.5 }}>
        {T.footnote}
      </p>
    </div>
  );
}
