// WhatsAppFAB.jsx — Fixed floating WhatsApp button on all pages
import { WHATSAPP_NUMBER, WHATSAPP_FAB } from "../siteConfig.js";
import { buildBookingMessage } from "../config.js";
import WhatsAppIcon from "./WhatsAppIcon.jsx";

export default function WhatsAppFAB() {
  const handleClick = () => {
    const msg = buildBookingMessage(null, null, null, null);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <button onClick={handleClick} className="whatsapp-fab" title={WHATSAPP_FAB.title} aria-label={WHATSAPP_FAB.ariaLabel}>
      <WhatsAppIcon size={28} />
    </button>
  );
}
