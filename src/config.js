// ============================================================================
//  src/config.js — LOGIC HELPERS (WhatsApp message banana, sheet mein booking bhejna, date format)
//  ⚠ Normally is file ko edit karne ki zaroorat nahi. Hotel ka data/text: src/siteConfig.js
//  Neeche wali re-export line purane imports (from "../config.js") ko chalti rakhti hai.
// ============================================================================
import { WHATSAPP_NUMBER, GOOGLE_SCRIPT_URL, LOCALE, MESSAGES, EMAIL_TEMPLATE } from "./siteConfig.js";

export { HOTEL_NAME, HOTEL_SHORT_NAME, HOTEL_TAGLINE, HOTEL_LOCATION, HOTEL_EMAIL, HOTEL_PHONE, WHATSAPP_NUMBER, GOOGLE_SCRIPT_URL } from "./siteConfig.js";

// Booking Google Sheet + email backend ko bhejta hai. Fire-and-forget (await nahi) —
// no-cors mode mein response parha nahi ja sakta, isliye guest ko spinner par nahi rokte.
export function submitBookingToSheet(payload) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
    console.warn("GOOGLE_SCRIPT_URL is not configured yet in siteConfig.js — booking was not saved to the sheet/email.");
    return;
  }
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).catch(err => console.error("Booking submission failed:", err));
}

// WhatsApp booking message builder (text MESSAGES mein, siteConfig.js)
export const buildBookingMessage = (roomName, checkIn, checkOut, guests) => {
  const M = MESSAGES;
  const hasDates = checkIn && checkOut;
  const nights = hasDates
    ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : null;

  if (hasDates) {
    const lines = [M.greeting, "", M.bookingIntro, ""];
    if (roomName) lines.push(`${M.labels.room} ${roomName}`);
    lines.push(`${M.labels.checkIn} ${formatDate(checkIn)}`);
    lines.push(`${M.labels.checkOut} ${formatDate(checkOut)}`);
    lines.push(`${M.labels.nights} ${nights}`);
    if (guests) lines.push(`${M.labels.guests} ${guests}`);
    lines.push("", M.askConfirm, "", M.closing);
    return lines.join("\n");
  }
  if (roomName) return `${M.greeting}\n\n${M.roomInterest(roomName)}\n\n${M.roomAsk}\n\n${M.closing}`;
  return `${M.greeting}\n\n${M.generalIntro}\n\n${M.generalAsk}\n\n${M.closing}`;
};

export const buildGeneralEnquiryMessage = (name, message) =>
  `${MESSAGES.greeting}\n\n${MESSAGES.labels.name} ${name || MESSAGES.guestFallback}\n\n${message || MESSAGES.enquiryFallback}\n\n${MESSAGES.closing}`;

// Contact page: email ka subject + body
export const buildEnquiryEmail = (name, message) => ({
  subject: `${EMAIL_TEMPLATE.subjectPrefix} - ${name || MESSAGES.guestFallback}`,
  body: `${EMAIL_TEMPLATE.greeting}\n\n${message}\n\n${EMAIL_TEMPLATE.signoff}\n${name}`,
});

// Date nicely format
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(LOCALE, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

// Aaj ki date (date input ke min ke liye)
export function todayStr() {
  return new Date().toISOString().split("T")[0];
}
