# DESIGN README — kis section ka design kahan hai

## 0) RESPONSIVE SYSTEM (Desktop / Tablet / Mobile alag alag sizes)

Site 3 devices ke liye alag alag sizes use karti hai. **Saare sizes ek file mein hain: `src/responsive.css`.**

| Device | Screen width | Kaise pehchane |
|---|---|---|
| Desktop | 1024px aur bari | `responsive.css` ka pehla `:root { … }` block |
| Tablet | 768 – 1023px | `@media (max-width: 1023px)` block |
| Mobile | ≤ 767px | `@media (max-width: 767px)` block |
| Small mobile | ≤ 480px | `@media (max-width: 480px)` block |

**Size badalna ho (jaise "mobile par heading chhoti karo"):**
1. `src/responsive.css` kholo, **TOKENS — MOBILE** block mein jao.
2. Variable badlo, jaise `--fs-h2: 28px;` → `--fs-h2: 26px;` (sirf mobile badlega; desktop/tablet alag hain).
Har variable ka naam batata hai kaam: `--fs-*` = text size, `--section-py/px` = section ka upar-neeche/left-right, `--gap-*` = cards ke beech, `--hero-h` = hero ki height, wagaira.

**Layout badalna ho (kitne columns):** `responsive.css` ke **LAYOUT** section mein class dhoondo, jaise
`.rooms-grid` (desktop 3 | tablet 2 | mobile 1), `.gallery-grid` (auto | 3 | 2), `.footer-grid` (4 | 2 | 1),
`.two-col` (2 | 2 | 1), `.quick-book-grid` (4 | 2 | 1), `.featured-grid` (3 | swipe | swipe), `.amenity-grid` (3 | 3 | 2),
`.review-card` (3 cards | 2 | swipe), `.detail-split` (2 | 1 | 1), `.info-grid` (2 | 2 | 1), `.stats-grid` (3 | 3 | 1).

**Naya section/page banate waqt:** hardcoded px mat likho. Padding ke liye class `section-pad`, text ke liye `var(--fs-h2)` / `var(--fs-body)`, 2 columns ke liye `two-col` use karo — phir wo khud teeno devices par sahi dikhega.

**Mobile par khaas cheezein (already laga di hain):** inputs 16px (iPhone zoom nahi karta), buttons kam az kam 44px ooncha, navbar tablet par bhi hamburger menu, modal ke buttons bade, galleries swipe hoti hain.

Agar hotel kahe "ye section ka design badlo", yahan se file dhoondo.
**Colours** hamesha `src/theme.css` se badlte hain. **Layout/size/spacing** neeche wali file mein.

## 1) Design kahan store hai (5 jagah)
| Jagah | Kya |
|---|---|
| `src/theme.css` | colours + fonts (variables) |
| `src/responsive.css` | ⭐ **sab sizes device-wise** (desktop/tablet/mobile) + saare grids/columns + padding classes |
| `src/styles.css` | global base, buttons (`.btn-gold`, `.btn-outline`, `.btn-whatsapp`), animations |
| Har component/page ke andar `style={{…}}` | us tukray ka look (border-radius, shadow, font-weight). Sizes `var(--…)` se aate hain |
| Kuch files ke andar `<style>` / `PAGE_CSS` | us page ka khaas CSS (neeche table) |

## 2) Section → File → Design kahan
| Section | File | Design |
|---|---|---|
| Navbar (desktop + mobile menu) | `components/Navbar.jsx` | inline style + `<style>` (`.navbar-logo-text`, `.hamburger-btn`); "BOOK NOW" = `.btn-gold` |
| Hero (home) | `pages/HomePage.jsx` → `HeroSection` | text size/height: `responsive.css` (`--fs-hero`, `--hero-h`, `.hero-container`) |
| Quick-book bar | `pages/HomePage.jsx` → `QuickBookBar` | `.quick-book-grid` / `.quick-book-box` (responsive.css) |
| Welcome section | `pages/HomePage.jsx` → `WelcomeSection` | inline |
| Featured rooms (cards) | `HomePage.jsx` → `FeaturedRooms` + `components/RoomCard.jsx` | card design `RoomCard.jsx`; grid `.featured-grid` (responsive.css) |
| Dining section | `HomePage.jsx` → `DiningHighlight` | inline + `.two-col` (responsive.css) |
| Amenities strip (home) | `HomePage.jsx` → `AmenitiesStrip` | inline + `.amenity-grid` / `.amenity-card` (responsive.css) |
| Reviews carousel | `HomePage.jsx` → `BookingReviews` | look: `PAGE_CSS` (`.review-card`, `.rev-arrow`); columns: `responsive.css` (`.review-carousel`) |
| Location + map | `HomePage.jsx` → `LocationSection` | inline |
| CTA banner | `HomePage.jsx` → `CTABanner` | inline + `.btn-whatsapp` |
| Section dividers | `HomePage.jsx` → `GoldenDivider` | gradient: `--gold-line-a/b` |
| Footer | `components/Footer.jsx` | inline |
| Rooms page | `pages/RoomsPage.jsx` | inline (header, filter buttons, grid) |
| Room detail page | `pages/RoomDetailPage.jsx` | inline; layout `.detail-split`, `.room-gallery-*` (responsive.css); info boxes = `InfoBox` |
| Gallery page | `pages/GalleryPage.jsx` | inline |
| Photo viewer | `components/Lightbox.jsx` | inline |
| About page | `pages/AboutPage.jsx` | inline |
| Amenities page | `pages/AmenitiesPage.jsx` | inline |
| Contact page | `pages/ContactPage.jsx` | inline (`inputStyle`, `labelStyle` upar) |
| Booking popup | `components/MultiRoomBookingModal.jsx` | `<style>` ke andar, class names `mrb-…` (mobile ≤767 aur ≤480 wahin hain) |
| Thank-you popup | `components/ThankYouModal.jsx` | inline |
| Floating WhatsApp button | `components/WhatsAppFAB.jsx` + `styles.css` (`.whatsapp-fab`) | ⚠ README.md "Known issues" #5 |
| Date widget (unused) | `components/BookingWidget.jsx` | inline |

## 3) Breakpoints
Sirf 4 hain, sab `responsive.css` mein (section 0 upar). Navbar: tablet aur mobile dono par hamburger menu (≤1023px). Navbar ka "mobile par hamesha solid" wala JS rule 767px par hai (`Navbar.jsx` → `useIsMobile`).

## 4) Colour variables (theme.css) — kahan kya dikhta hai
| Variable | Default | Kahan |
|---|---|---|
| `--gold` | #C4922A | section labels, gold lines, active nav, Book Now (navbar), gallery filter, footer top line |
| `--gold-bright` | #D9933D | hero highlight word + line, contact label |
| `--gold-line-a/b` | #C9922A / #D9A84E | home section divider |
| `--accent` | #984A1C | main buttons (VIEW, Book, Check Availability), prices, room badge, ✦, "Read original" |
| `--accent-hover` | #7A3B16 | VIEW button hover |
| `--accent-tint` / `--accent-tint-border` | #FBF3E6 / #E7D9BE | booking popup summary + AC badge |
| `--submit` / `--submit-disabled` | #C49B66 / #C9B79A | booking popup submit button |
| `--whatsapp` | #25D366 | WhatsApp buttons/icon |
| `--bg-primary` | #F5EFE6 | About/Amenities/Contact/Gallery/Rooms page background |
| `--bg-secondary` | #EDE0CE | beige bands, image placeholders |
| `--bg-card` | #EEE5D6 | About stat boxes |
| `--bg-section` | #F9F6F0 | home alternate sections, room detail, popups |
| `--bg-white` | #FFFFFF | cards, white sections |
| `--bg-dark` | #2C1F14 | dark headers/banners, contact form card |
| `--bg-darker` | #1C1209 | footer |
| `--navbar-solid-bg` | white 98% | navbar after scroll + mobile menu |
| `--text-main` | #1C1209 | headings |
| `--text-dark` / `--text-body` | #333 / #555 | paragraphs |
| `--text-muted` / `--text-soft` | #7A6652 / #8C7B6B | brown paragraphs / small hints, footer text |
| `--text-on-dark` / `--text-on-dark-soft` | #F5EFE6 / #A89582 | text on dark backgrounds |
| `--border-tan/soft/grey/input/strong` | various | borders on cards, inputs, boxes |
| `--overlay*`, `--lightbox-*` | black tints | image darkening, popup background, photo viewer |
| `--error-*`, `--stock-alert` | reds | booking popup errors, "Max Available" |
| `--booking-blue`, `--booking-verified`, `--review-*` | blues/greys | reviews (stars, B. badge, text) |
Poori list comments ke saath: `src/theme.css`.

## 5) Typical design requests
| Hotel kahe | Karo |
|---|---|
| "Colour scheme badlo" | `theme.css` — pehle `--gold`, `--accent`, `--bg-dark`, `--bg-primary` |
| "Font badlo" | `theme.css` — `@import` link + `--font-heading` / `--font-body` |
| "Buttons gol/chorus karo" | `styles.css` `.btn-gold/.btn-outline/.btn-whatsapp` + inline buttons ka `borderRadius` (padding: `--btn-pad` responsive.css) |
| "Hero chhota/bara" | `responsive.css` → `--hero-h`, `--hero-min-h` (device ke block mein) |
| "Room card ka look" | `components/RoomCard.jsx` |
| "Reviews 2 cards dikhao" | `responsive.css` → `.review-card { flex: … }` |
| "Popup ka look" | `MultiRoomBookingModal.jsx` `<style>` |
| "Section ka order badlo" | `HomePage.jsx` neeche `HomePage()` mein components ka order |
| "Koi section hatao" | `HomePage()` mein us component ki line hata do |
