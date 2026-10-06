// pages/ContactPage.jsx — Contact page. Text: siteConfig.js → CONTACT_PAGE | Colours: theme.css
import { useState } from "react";
import AnimBlock from "../components/AnimBlock.jsx";
import Footer from "../components/Footer.jsx";
import { HOTEL_EMAIL, WHATSAPP_NUMBER, CONTACT_PAGE as T } from "../siteConfig.js";
import { buildGeneralEnquiryMessage, buildEnquiryEmail } from "../config.js";

export default function ContactPage({ setPage }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendEnquiry = () => {
    const msg = buildGeneralEnquiryMessage(name, message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const sendEmail = () => {
    const mail = buildEnquiryEmail(name, message);
    window.open(`mailto:${HOTEL_EMAIL}?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`, "_self");
  };

  const inputStyle = {
    width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-tan)",
    padding: "14px", fontFamily: "var(--font-body)", fontSize: 14,
    color: "var(--text-on-dark)", outline: "none", borderRadius: 8, boxSizing: "border-box",
    transition: "border-color 0.2s"
  };
  
  const labelStyle = {
    fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 2,
    color: "var(--text-on-dark-soft)", display: "block", marginBottom: 8, textTransform: "uppercase",
    fontWeight: "bold"
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "var(--page-top)" }}>

      {/* Header Banner */}
      <div className="page-header" style={{ background: "var(--bg-dark)" }}>
        <AnimBlock>
          <p className="section-label" style={{ textAlign: "center", color: "var(--gold-bright)" }}>{T.label}</p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h1)", color: "var(--text-on-dark)", fontWeight: 300, letterSpacing: "var(--ls-title)", margin: "10px 0" }}>
            {T.title}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-on-dark-soft)", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.8 }}>
            {T.text}
          </p>
        </AnimBlock>
      </div>

      {/* Main Content Layout Container */}
      <div className="pad-md" style={{ maxWidth: 800, margin: "0 auto" }}>
        
        {/* Top Section: Hotel Information Grid */}
        <AnimBlock>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h2-sm)", color: "var(--text-main)", margin: "0 0 12px", fontWeight: 400 }}>{T.infoHeading}</h2>
            <div className="gold-divider" style={{ margin: "0 auto 32px" }} />
            
            <div className="info-grid" style={{ textAlign: "left" }}>
              {T.infoCards.map(([icon, label, val]) => (
                <div key={label} style={{ background: "var(--bg-white)", border: "1px solid var(--border-soft)", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: 1.5, color: "var(--accent)", margin: "0 0 4px", fontWeight: 700, textTransform: "uppercase" }}>{label}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-dark)", margin: 0, lineHeight: 1.4 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimBlock>

        {/* Bottom Section: Enquiry Card Form */}
        <AnimBlock delay={0.1}>
          <div className="form-card" style={{ background: "var(--bg-dark)", border: "1px solid var(--border-dark-card)", borderRadius: "16px", boxShadow: "0 10px 35px rgba(0,0,0,0.15)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--fs-h3)", color: "var(--text-on-dark)", margin: "0 0 8px", textAlign: "center" }}>{T.formTitle}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-on-dark-soft)", textAlign: "center", marginBottom: "32px" }}>
              {T.formText}
            </p>
            
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{T.nameLabel}</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={T.namePlaceholder} style={{ ...inputStyle, color: "var(--text-main)" }} />
            </div>
            
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>{T.messageLabel}</label>
              <textarea rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder={T.messagePlaceholder} style={{ ...inputStyle, color: "var(--text-main)", resize: "vertical" }} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Button 1: WhatsApp */}
              <button 
                onClick={sendEnquiry} 
                className="btn-whatsapp" 
                style={{ width: "100%", justifyContent: "center", padding: "14px", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", boxShadow: "0 4px 14px rgba(37,211,102,0.15)" }}
              >
                {T.whatsappButton}
              </button>

              {/* Button 2: Email */}
              <button 
                onClick={sendEmail} 
                style={{ 
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "14px", borderRadius: "8px",
                  background: "var(--border-tan)", border: "1px solid var(--border-tan)",
                  color: "var(--text-main)", fontFamily: "var(--font-body)", fontWeight: "bold", fontSize: "15px",
                  cursor: "pointer", transition: "background 0.2s", boxShadow: "0 4px 14px rgba(0,0,0,0.05)" 
                }}
                onMouseOver={e => e.currentTarget.style.background = "var(--bg-primary)"}
                onMouseOut={e => e.currentTarget.style.background = "var(--bg-white)"}
              >
                {T.emailButton}
              </button>
            </div>
          </div>
        </AnimBlock>

      </div>

      <Footer setPage={setPage} />
    </div>
  );
}
