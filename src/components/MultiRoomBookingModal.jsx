// components/MultiRoomBookingModal.jsx — "Book Now" popup (multi-room selection + guest form)
// Text/errors: siteConfig.js → MODAL, BOOKING_POLICY | Room data: data/rooms.js | Colours: theme.css
// Is file ka CSS neeche <style> ke andar hai (class names "mrb-...").
import { useState, useMemo } from "react";
import { getRoomVariants } from "../data/rooms.js";
import { submitBookingToSheet, todayStr } from "../config.js";
import { MODAL, BOOKING_POLICY, CURRENCY_LABEL, LOCALE } from "../siteConfig.js";

const formatPKR = (n) => `${CURRENCY_LABEL} ${Math.round(n).toLocaleString(LOCALE)}`;

export default function MultiRoomBookingModal({ onClose, onSuccess, initialQuantities = {}, primaryRoomId = null }) {
  const variants = useMemo(() => getRoomVariants(), []);
  const [quantities, setQuantities] = useState(initialQuantities);
  const [mattresses, setMattresses] = useState({});
  const [showAllRooms, setShowAllRooms] = useState(!primaryRoomId);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", whatsapp: "", checkIn: "", checkOut: "", adults: "1", children: "0",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Respect max inventory and auto-adjust mattresses if room qty decreases
  const changeQty = (key, delta, maxInventory, roomMaxMattress) => {
    setQuantities(q => {
      const current = q[key] || 0;
      const next = Math.max(0, Math.min(maxInventory, current + delta));
      
      // If we reduce rooms, ensure mattresses don't exceed the new capacity limit
      setMattresses(m => {
        const currentM = m[key] || 0;
        const maxMForNewQty = next * roomMaxMattress;
        if (currentM > maxMForNewQty) {
          return { ...m, [key]: maxMForNewQty };
        }
        return m;
      });

      return { ...q, [key]: next };
    });
    setError("");
  };

  // Mattress limit: Max Mattress Per Room * Quantity of that Room
  const changeMattress = (key, delta, maxPerRow, currentQty) => {
    const absoluteMax = maxPerRow * currentQty;
    setMattresses(m => {
      const next = Math.min(absoluteMax, Math.max(0, (m[key] || 0) + delta));
      return { ...m, [key]: next };
    });
    setError("");
  };

  const label = (v) => v.variantLabel ? `${v.room.name} (${v.variantLabel})` : v.room.name;

  const primaryRoomName = primaryRoomId
    ? (variants.find(v => v.roomId === primaryRoomId)?.room.name || MODAL.fallbackRoomName)
    : null;

  const visibleVariants = showAllRooms
    ? variants
    : variants.filter(v => v.roomId === primaryRoomId);

  const selectedVariants = useMemo(
    () => variants.filter(v => (quantities[v.key] || 0) > 0),
    [variants, quantities]
  );
  const totalRooms = selectedVariants.reduce((sum, v) => sum + (quantities[v.key] || 0), 0);

  const nightlyTotal = selectedVariants.reduce((sum, v) => {
    const roomCost = (v.price || 0) * (quantities[v.key] || 0);
    const mattressCost = (v.room.mattressPrice || 0) * (mattresses[v.key] || 0);
    return sum + roomCost + mattressCost;
  }, 0);

  const nights = formData.checkIn && formData.checkOut
    ? Math.max(0, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / 86400000))
    : 0;

  const estimatedTotal = nights > 0 ? nightlyTotal * nights : nightlyTotal;

  const minCheckOut = formData.checkIn
    ? new Date(new Date(formData.checkIn).getTime() + 86400000).toISOString().split("T")[0]
    : todayStr();
  const totalMattresses = selectedVariants.reduce((sum, v) => sum + (mattresses[v.key] || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;

    if (selectedVariants.length === 0) {
      setError(MODAL.errors.noRoom);
      return;
    }

    // --- SMART VALIDATION FOR ADULTS AND MATTRESSES ---
    const adults = parseInt(formData.adults) || 1;
    const children = parseInt(formData.children) || 0;

    let totalBaseCapacity = 0;
    let totalMattressesAdded = 0;
    let maxMattressesAllowed = 0;

    selectedVariants.forEach(v => {
      const qty = quantities[v.key];
      totalBaseCapacity += (v.room.capacity * qty);
      maxMattressesAllowed += (v.room.maxMattress * qty);
      totalMattressesAdded += (mattresses[v.key] || 0);
    });

    const totalCapacityWithAddedMattresses = totalBaseCapacity + totalMattressesAdded;
    const absoluteMaxCapacity = totalBaseCapacity + maxMattressesAllowed;

    // 1. Guests completely exceed the physical capacity of chosen rooms
    if (adults > absoluteMaxCapacity) {
      setError(MODAL.errors.overCapacity(absoluteMaxCapacity, adults));
      return;
    }

    // 2. They need to manually add the mattress they are trying to fit
    if (adults > totalCapacityWithAddedMattresses) {
      const needed = adults - totalCapacityWithAddedMattresses;
      setError(MODAL.errors.needMattress(totalBaseCapacity, adults, needed));
      return;
    }

    // 3. Children policy (free children per room: BOOKING_POLICY)
    if (children > totalRooms * BOOKING_POLICY.freeChildrenPerRoom) {
      setError(MODAL.errors.tooManyChildren(children, totalRooms));
      return;
    }
    // ----------------------------------------------------

    setError("");
    setSubmitting(true);

    const roomSummary = selectedVariants
      .map(v => {
        const mCount = mattresses[v.key] || 0;
        const mNote = mCount > 0 ? ` +${mCount} ${MODAL.extraMattress(mCount)}` : "";
        return `${label(v)} x${quantities[v.key]}${mNote}`;
      })
      .join(", ");

    submitBookingToSheet({
      room: roomSummary,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone.replace(/[^\d]/g, ""),
      whatsapp: formData.whatsapp.replace(/[^\d]/g, ""),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      adults: formData.adults,
      children: formData.children,
      nights: nights || "",
      roomsCount: totalRooms,
      mattressCount: totalMattresses,
      estimatedTotal: estimatedTotal || "",
      submittedAt: new Date().toISOString(),
    });

    setSubmitting(false);
    onSuccess();
  };

  return (
    <div className="mrb-overlay">
      <div className="mrb-container">
        <button onClick={onClose} className="mrb-close-btn">✕</button>

        <div className="mrb-content">
          <h2 className="mrb-title">{MODAL.title}</h2>
          <p className="mrb-subtitle">
            {showAllRooms ? MODAL.subtitleAll : MODAL.subtitleSingle(primaryRoomName)}
          </p>

          {/* ── Step 1: Room selection ────────────────────────── */}
          <p className="mrb-step-title">{MODAL.step1}</p>
          <div className="mrb-rooms-box">
            {visibleVariants.map(v => {
              const qty = quantities[v.key] || 0;
              const mCount = mattresses[v.key] || 0;
              const atMaxLimit = qty >= v.inventory;

              return (
                <div key={v.key} className="mrb-room-row">
                  <div className="mrb-room-main">
                    <img src={v.room.heroImg} alt={v.room.name} loading="lazy" className="mrb-room-img" />
                    <div className="mrb-room-info">
                      <p className="mrb-room-name">
                        {v.room.name}
                        {v.variantLabel && (
                          <span className="mrb-variant-badge">{v.variantLabel.toUpperCase()}</span>
                        )}
                      </p>
                      <p className="mrb-room-meta">
                        {MODAL.sleeps} {v.room.capacity} · {formatPKR(v.price)}{MODAL.perNight}
                      </p>
                      {atMaxLimit && (
                        <p className="mrb-inventory-alert">{MODAL.maxAvailable} {v.inventory}</p>
                      )}
                    </div>
                    <div className="mrb-qty-controls">
                      <button type="button" onClick={() => changeQty(v.key, -1, v.inventory, v.room.maxMattress)} className="mrb-qty-btn">−</button>
                      <span className="mrb-qty-text">{qty}</span>
                      <button type="button" disabled={atMaxLimit} onClick={() => changeQty(v.key, 1, v.inventory, v.room.maxMattress)} className="mrb-qty-btn" style={{ opacity: atMaxLimit ? 0.3 : 1, cursor: atMaxLimit ? "not-allowed" : "pointer" }}>+</button>
                    </div>
                  </div>

                  {/* Extra mattress */}
                  {qty > 0 && v.room.maxMattress > 0 && (
                    <div className="mrb-mattress-row">
                      <span className="mrb-mattress-label">
                        {MODAL.mattressLabel(formatPKR(v.room.mattressPrice))}
                      </span>
                      <div className="mrb-qty-controls">
                        <button type="button" onClick={() => changeMattress(v.key, -1, v.room.maxMattress, qty)} className="mrb-qty-btn mrb-mattress-btn">−</button>
                        <span className="mrb-qty-text mrb-mattress-text">{mCount}</span>
                        <button type="button" onClick={() => changeMattress(v.key, 1, v.room.maxMattress, qty)} className="mrb-qty-btn mrb-mattress-btn">+</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expand/collapse rooms */}
          {primaryRoomId && (
            <button type="button" onClick={() => setShowAllRooms(s => !s)} className="mrb-expand-btn">
              {showAllRooms ? MODAL.showOnly(primaryRoomName) : MODAL.addOthers}
            </button>
          )}

          {/* Selection summary */}
          {totalRooms > 0 && (
            <div className="mrb-summary-box">
              <p className="mrb-step-title mrb-summary-title">{MODAL.selection(totalRooms)}</p>
              {selectedVariants.map(v => {
                const mCount = mattresses[v.key] || 0;
                return (
                  <div key={v.key} style={{ marginBottom: 6 }}>
                    <div className="mrb-summary-row">
                      <p className="mrb-summary-text">{label(v)} <span style={{ color: "var(--text-soft)" }}>× {quantities[v.key]}</span></p>
                      <p className="mrb-summary-price">{formatPKR(v.price * quantities[v.key])}{nights > 0 ? ` ${MODAL.perNight}` : ""}</p>
                    </div>
                    {mCount > 0 && (
                      <div className="mrb-summary-row">
                        <p className="mrb-summary-subtext">+ {mCount} {MODAL.extraMattress(mCount)}</p>
                        <p className="mrb-summary-subtext">{formatPKR(v.room.mattressPrice * mCount)}{nights > 0 ? ` ${MODAL.perNight}` : ""}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="mrb-total-row">
                <p className="mrb-total-label">{MODAL.estimatedTotal}{nights > 0 ? MODAL.nightsSuffix(nights) : ""}</p>
                <p className="mrb-total-price">{formatPKR(estimatedTotal)}</p>
              </div>
              {nights === 0 && (
                <p className="mrb-total-note">{MODAL.totalNote}</p>
              )}
            </div>
          )}

          {/* ── Step 2: Guest details ────────────────────────── */}
          <p className="mrb-step-title">{MODAL.step2}</p>

          <form onSubmit={handleSubmit} className="mrb-form">
            <div className="mrb-two-col">
              <div><label className="mrb-input-label">{MODAL.labels.firstName}</label><input required className="mrb-input" name="firstName" value={formData.firstName} onChange={handleChange} /></div>
              <div><label className="mrb-input-label">{MODAL.labels.lastName}</label><input required className="mrb-input" name="lastName" value={formData.lastName} onChange={handleChange} /></div>
            </div>
            <div className="mrb-two-col">
              <div><label className="mrb-input-label">{MODAL.labels.email}</label><input required type="email" className="mrb-input" name="email" value={formData.email} onChange={handleChange} /></div>
              <div><label className="mrb-input-label">{MODAL.labels.phone}</label><input required className="mrb-input" name="phone" value={formData.phone} onChange={handleChange} /></div>
            </div>
            <div>
              <label className="mrb-input-label">{MODAL.labels.whatsapp}</label>
              <input required className="mrb-input" name="whatsapp" placeholder={MODAL.whatsappPlaceholder} value={formData.whatsapp} onChange={handleChange} />
            </div>
            <div className="mrb-two-col">
              <div>
                <label className="mrb-input-label">{MODAL.labels.checkIn}</label>
                <input required type="date" min={todayStr()} className="mrb-input" name="checkIn" value={formData.checkIn} onChange={e => setFormData({ ...formData, checkIn: e.target.value, checkOut: "" })} />
              </div>
              <div>
                <label className="mrb-input-label">{MODAL.labels.checkOut}</label>
                <input required type="date" min={minCheckOut} className="mrb-input" name="checkOut" value={formData.checkOut} onChange={handleChange} disabled={!formData.checkIn} />
              </div>
            </div>
            <div className="mrb-two-col">
              <div><label className="mrb-input-label">{MODAL.labels.adults}</label><input required type="number" min="1" className="mrb-input" name="adults" value={formData.adults} onChange={handleChange} /></div>
              <div><label className="mrb-input-label">{MODAL.labels.children} <span style={{fontSize: 10, fontWeight: "normal"}}>{MODAL.childrenHint}</span></label><input required type="number" min="0" className="mrb-input" name="children" value={formData.children} onChange={handleChange} /></div>
            </div>

            {error && (
              <div className="mrb-error-box">⚠ {error}</div>
            )}

            <button type="submit" disabled={submitting} className="mrb-submit-btn" style={{ background: submitting ? "var(--submit-disabled)" : "var(--submit)", cursor: submitting ? "not-allowed" : "pointer" }}>
              {submitting ? MODAL.submitting : totalRooms > 0 ? `${MODAL.submit} — ${formatPKR(estimatedTotal)}` : MODAL.submit}
            </button>
          </form>
        </div>
      </div>

      {/* MODAL CSS (design yahan badlo; colours theme.css se aate hain) */}
      <style>{`
        .mrb-overlay { position: fixed; inset: 0; z-index: 1000; background: var(--overlay); display: flex; align-items: center; justify-content: center; padding: 15px; }
        .mrb-container { background: var(--bg-section); width: 100%; max-width: 620px; max-height: 95vh; max-height: 95dvh; border-radius: 12px; overflow-y: auto; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .mrb-close-btn { position: absolute; top: 12px; right: 12px; background: var(--bg-white); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-weight: bold; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        .mrb-content { padding: 30px 24px; }
        .mrb-title { font-family: var(--font-heading); font-size: 28px; color: var(--text-main); margin: 0 0 6px; }
        .mrb-subtitle { font-family: var(--font-body); font-size: 13px; color: var(--text-soft); margin: 0 0 20px; line-height: 1.4; }
        
        .mrb-step-title { font-family: var(--font-body); font-size: 11px; letter-spacing: 2px; color: var(--accent); font-weight: 700; text-transform: uppercase; margin: 0 0 10px; }
        .mrb-rooms-box { border: 1px solid var(--modal-border); border-radius: 8px; padding: 4px 14px; margin-bottom: 12px; background: var(--bg-white); }
        .mrb-room-row { padding: 14px 0; border-bottom: 1px solid var(--modal-row-border); }
        .mrb-room-row:last-child { border-bottom: none; }
        .mrb-room-main { display: flex; align-items: center; gap: 12px; }
        .mrb-room-img { width: 64px; aspect-ratio: 4/3; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
        .mrb-room-info { flex: 1; min-width: 0; }
        .mrb-room-name { margin: 0 0 2px; font-family: var(--font-heading); font-size: 17px; color: var(--text-main); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mrb-variant-badge { font-family: var(--font-body); font-size: 10px; font-weight: 700; color: var(--accent); margin-left: 6px; letter-spacing: 0.5px; background: var(--accent-tint); padding: 2px 5px; border-radius: 4px; vertical-align: middle;}
        .mrb-room-meta { margin: 0; font-family: var(--font-body); font-size: 12px; color: var(--text-soft); }
        .mrb-inventory-alert { margin: 2px 0 0; font-family: var(--font-body); font-size: 10px; color: var(--stock-alert); font-weight: bold; }
        
        .mrb-qty-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .mrb-qty-btn { width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--border-tan); background: var(--bg-white); color: var(--accent); font-size: 16px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1; padding: 0;}
        .mrb-qty-text { min-width: 16px; text-align: center; font-family: var(--font-body); font-weight: 700; color: var(--text-main); }
        
        .mrb-mattress-row { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--modal-border); margin-left: 76px; }
        .mrb-mattress-label { font-family: var(--font-body); font-size: 12px; color: var(--text-soft); }
        .mrb-mattress-btn { width: 22px; height: 22px; font-size: 12px; }
        .mrb-mattress-text { font-size: 12px; min-width: 14px; }
        
        .mrb-expand-btn { background: none; border: none; padding: 0; margin-bottom: 20px; color: var(--accent); font-family: var(--font-body); font-size: 12.5px; font-weight: 700; letter-spacing: 0.3px; cursor: pointer; text-decoration: underline; }
        
        .mrb-summary-box { background: var(--accent-tint); border: 1px solid var(--accent-tint-border); border-radius: 8px; padding: 14px 16px; margin-bottom: 24px; }
        .mrb-summary-title { margin: 0 0 8px; }
        .mrb-summary-row { display: flex; justify-content: space-between; }
        .mrb-summary-text { margin: 0; font-family: var(--font-body); font-size: 14px; color: var(--text-dark); }
        .mrb-summary-price { margin: 0; font-family: var(--font-body); font-size: 14px; color: var(--text-body); }
        .mrb-summary-subtext { margin: 0; font-family: var(--font-body); font-size: 12px; color: var(--text-soft); }
        .mrb-total-row { border-top: 1px solid var(--accent-tint-border); margin-top: 10px; padding-top: 10px; display: flex; justify-content: space-between; align-items: baseline; }
        .mrb-total-label { margin: 0; font-family: var(--font-body); font-size: 13px; color: var(--text-main); font-weight: 700; }
        .mrb-total-price { margin: 0; font-family: var(--font-heading); font-size: 22px; color: var(--accent); font-weight: 700; }
        .mrb-total-note { margin: 6px 0 0; font-family: var(--font-body); font-size: 11px; color: var(--text-soft); font-style: italic; }
        
        .mrb-form { display: grid; gap: 14px; }
        .mrb-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .mrb-input-label { display: block; font-size: 12px; font-weight: 700; color: var(--text-body); margin-bottom: 4px; font-family: var(--font-body); }
        .mrb-input { width: 100%; padding: 10px 12px; border: 1px solid var(--border-input); border-radius: 6px; font-size: 14px; font-family: var(--font-body); outline: none; box-sizing: border-box; background: var(--bg-white); transition: border 0.2s; }
        .mrb-input:focus { border-color: var(--submit); }
        .mrb-error-box { font-family: var(--font-body); font-size: 13px; color: var(--error-text); background: var(--error-bg); border: 1px solid var(--error-border); padding: 10px; border-radius: 6px; margin: 0; line-height: 1.4; }
        .mrb-submit-btn { width: 100%; padding: 14px; color: var(--text-white); border: none; border-radius: 6px; font-weight: bold; font-size: 16px; margin-top: 4px; transition: background 0.3s; }
        
        /* Mobile (≤767px): bade touch targets, 16px inputs (iPhone zoom nahi karta) */
        @media (max-width: 767px) {
          .mrb-content { padding: 24px 18px; }
          .mrb-title { font-size: 24px; }
          .mrb-qty-btn { width: 34px; height: 34px; font-size: 18px; }
          .mrb-mattress-btn { width: 30px; height: 30px; font-size: 16px; }
          .mrb-input { font-size: 16px; padding: 12px; }
          .mrb-submit-btn { padding: 16px; }
          .mrb-close-btn { width: 38px; height: 38px; }
        }

        /* Small mobile (≤480px) */
        @media (max-width: 480px) {
          .mrb-overlay { padding: 10px; }
          .mrb-content { padding: 24px 16px; }
          .mrb-two-col { grid-template-columns: 1fr; gap: 12px; }

          /* Room image mobile par hide */
          .mrb-room-img { display: none; }

          /* Naam poora dikhe, wrap ho */
          .mrb-room-name { white-space: normal; overflow: visible; text-overflow: clip; font-size: 16px; line-height: 1.2; margin-bottom: 4px; }

          /* AC / Non-AC badge naam ke neeche alag line mein */
          .mrb-variant-badge { display: inline-block; margin-left: 0; margin-top: 4px; font-size: 10px; padding: 3px 7px; }

          .mrb-room-main { align-items: flex-start; gap: 10px; }
          .mrb-room-meta { font-size: 12px; line-height: 1.4; margin-top: 4px; }
          .mrb-qty-controls { margin-top: 2px; }

          /* Mattress row full width */
          .mrb-mattress-row { margin-left: 0; flex-direction: column; align-items: flex-start; gap: 8px; }
          .mrb-mattress-label { font-size: 11px; }
        }
      `}</style>
    </div>
  );
}
