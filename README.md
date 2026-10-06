# Hotel Website Template — README (kaunsi file mein kya hai)

Ye React/Vite template hai. Naye hotel ke liye ab **sirf 4 jagah** kaam hota hai:

| # | File | Kya badalna hai |
|---|------|-----------------|
| 1 | `src/siteConfig.js` | Hotel ka naam, phone, email, WhatsApp, links, **saara text**, reviews, hero images |
| 2 | `src/theme.css` | **Saare colours** aur fonts |
| 2b | `src/responsive.css` | Desktop / Tablet / Mobile ke **sizes aur columns** (design change ke liye) |
| 3 | `src/data/rooms.js` + `src/assets/images.js` | Rooms (price, inventory, text) aur images ki list |
| 4 | `Code.gs` (Google Apps Script) | Hotel ka naam + booking email (Gmail) |

Design (layout, size, spacing) badalna ho to: **`DESIGN-README.md`** dekho.

---

## 1) Naya hotel banane ka checklist

1. `src/assets/` mein naye hotel ki images daalo, aur `src/assets/images.js` mein unke naam update karo (key names same rakho: `hero01`, `logo`, `pool` wagaira, ya jahan use hon wahan naam badlo).
2. `src/siteConfig.js` kholo, upar se neeche tak:
   - **Section 1** — naam, shehar, location, email, phone, WhatsApp number (`+` ke baghair).
   - **Section 2** — Instagram/Facebook, Booking.com link, Google Maps links, Plus Code, `GOOGLE_SCRIPT_URL`.
   - **Section 3** — `BOOKING_POLICY` (bachay free kitne, umar kitni).
   - **Section 4** — WhatsApp/email message ke alfaaz.
   - **Section 6 onwards** — har page ka text (Home, About, Amenities, Contact, Gallery, Rooms...). `REVIEWS` mein guest reviews.
3. `src/theme.css` mein colours badlo (har variable ke saath comment hai ke kahan use hota hai).
4. `src/data/rooms.js` mein rooms ka data: naam, price, inventory, capacity, gallery images, description.
5. `Code.gs` Google Sheet ke Apps Script mein paste karo, `HOTEL_NAME` + `NOTIFY_EMAIL` badlo, Deploy → Web app (Execute as: Me, Access: Anyone) → URL `siteConfig.js` ke `GOOGLE_SCRIPT_URL` mein daalo.

---

## 2) Folder structure

```
src/
├── main.jsx            (React start — kabhi nahi chhoona)
├── App.jsx             (pages ka router + back button)
├── siteConfig.js       ⭐ hotel info + saara text + reviews + hero images
├── theme.css           ⭐ colours + fonts
├── responsive.css      ⭐ desktop/tablet/mobile ke alag sizes + columns
├── config.js           (logic helpers — normally edit nahi karna)
├── styles.css          (global base, buttons, animations)
├── assets/
│   └── images.js       ⭐ saari images ki list (IMGS)
├── data/
│   └── rooms.js        ⭐ rooms data + gallery photos list
├── components/         (chhote reusable tukray)
└── pages/              (poore pages)
Code.gs                 (Google Apps Script — Sheet + email)
```

---

## 3) Har file mein kya hai

### `src/siteConfig.js` — sab kuch yahin se aata hai
| Section (file ke andar) | Kya store hai | Kahan dikhta hai |
|---|---|---|
| 1. IDENTITY | `HOTEL_NAME`, `HOTEL_SHORT_NAME`, `HOTEL_BRAND_WORD`, `HOTEL_CITY`, `HOTEL_LOCATION`, `HOTEL_EMAIL`, `HOTEL_PHONE`, `WHATSAPP_NUMBER`, `HOTEL_ROOM_PAGE_PHONE`, `LOCALE`, `CURRENCY_LABEL` | Navbar, Footer, Contact, har text |
| 2. LINKS | `SOCIAL`, `BOOKING_COM_URL`, `MAP_EMBED_URL`, `MAP_OPEN_URL`, `PLUS_CODE`, `GOOGLE_SCRIPT_URL` | Footer, Home reviews/location, booking |
| 3. BOOKING_POLICY | free bachay per room, bachay ki umar | Booking popup ke rules |
| 4. MESSAGES / EMAIL_TEMPLATE | WhatsApp aur email ke message ke alfaaz | WhatsApp buttons, Contact page |
| 5. NAV_LINKS, NAVBAR, FOOTER, THANK_YOU, WHATSAPP_FAB | menu labels, footer text, thank-you message | Navbar, Footer, popup |
| 6. HOME + REVIEWS | hero slides/text, welcome, quick-book, featured rooms, dining, amenities strip, reviews, location, CTA | Home page |
| 7. ROOMS_PAGE, ROOM_CARD, ROOM_DETAIL | rooms page text, card labels, detail page labels | Rooms pages |
| 8. GALLERY_PAGE | gallery page text | Gallery page |
| 9. ABOUT | about page poora text + 2 images + stats | About page |
| 10. AMENITIES_PAGE | amenities list (icon, title, text, image) + CTA | Amenities page |
| 11. CONTACT_PAGE | contact text, info cards, form labels | Contact page |
| 12. BOOKING_WIDGET | widget text (abhi use nahi ho raha) | — |
| 13. MODAL | booking popup ka poora text + error messages | Book Now popup |

### `src/config.js` — logic (edit nahi)
| Function | Kaam |
|---|---|
| `submitBookingToSheet(payload)` | Booking Google Sheet + email backend ko bhejta hai |
| `buildBookingMessage(room, in, out, guests)` | WhatsApp booking message banata hai |
| `buildGeneralEnquiryMessage(name, msg)` | Contact page ka WhatsApp message |
| `buildEnquiryEmail(name, msg)` | Contact page ka email subject + body |
| `formatDate(str)` / `todayStr()` | Date format / aaj ki date |
Neeche `export {…} from "./siteConfig.js"` purane imports ko chalti rakhta hai.

### `src/data/rooms.js` — rooms data
| Cheez | Kaam |
|---|---|
| `ROOMS` | Har room: id, name, category, price, `priceAC` (optional), inventory, capacity, mattress, images, text |
| `getRoomVariants()` | Booking popup ke liye AC / Non-AC variants banata hai |
| `defaultVariantKey(room)` | Room page se "Book" dabane par default variant |
| `GALLERY_CATEGORIES`, `GALLERY_IMAGES` | Gallery page ke filters aur photos |
Note: room ki `category` (Villa/Deluxe/Suite/Chalet) `ROOMS_PAGE.categories` (siteConfig) se match honi chahiye. Room descriptions mein hotel ka naam likha ho to wahan haath se badalna hoga.

### `src/assets/images.js`
Har image import hoti hai aur `IMGS` object mein aati hai. Naya hotel = nayi files + naam update.

### `src/components/`
| File | Kya hai | Text kahan se | Design kahan |
|---|---|---|---|
| `Navbar.jsx` | top bar, mobile menu, Book Now popup kholta hai | `HOTEL_NAME`, `NAV_LINKS`, `NAVBAR` | us file ke andar |
| `Footer.jsx` | footer | `FOOTER`, `SOCIAL`, `HOTEL_*` | us file |
| `MultiRoomBookingModal.jsx` | Book Now popup (rooms chuno + guest form + validation) | `MODAL`, `BOOKING_POLICY` | file ke andar `<style>` (class `mrb-…`) |
| `ThankYouModal.jsx` | booking ke baad thank-you | `THANK_YOU` | us file |
| `RoomCard.jsx` | room ka card | `ROOM_CARD` | us file |
| `Lightbox.jsx` | photo fullscreen viewer | — | us file |
| `WhatsAppFAB.jsx` | floating WhatsApp button | `WHATSAPP_FAB` | `styles.css` (`.whatsapp-fab`) ⚠ neeche "Known issues" dekho |
| `WhatsAppIcon.jsx` | WhatsApp logo (naya shared tukra) | — | colours theme.css |
| `AnimBlock.jsx` | scroll animation wrapper (**unchanged**) | — | — |
| `BookingWidget.jsx` | date picker widget — **abhi kisi page mein use nahi** | `BOOKING_WIDGET` | us file |

### `src/pages/`
| File | Page | Text kahan se |
|---|---|---|
| `HomePage.jsx` | Home (Hero, Welcome+QuickBook, Featured Rooms, Dining, Amenities, Reviews, Location, CTA) | `HOME`, `REVIEWS` |
| `RoomsPage.jsx` | Rooms list + filter | `ROOMS_PAGE` |
| `RoomDetailPage.jsx` | ek room ki detail | `ROOM_DETAIL`, room data |
| `GalleryPage.jsx` | Gallery | `GALLERY_PAGE`, `GALLERY_*` |
| `AmenitiesPage.jsx` | Amenities | `AMENITIES_PAGE` |
| `AboutPage.jsx` | About | `ABOUT` |
| `ContactPage.jsx` | Contact | `CONTACT_PAGE` |

### `Code.gs` (Google Apps Script)
React se bahar, Google ke server par chalta hai. `doPost` booking ko Sheet mein row banata hai aur email bhejta hai. Naye hotel ke liye `HOTEL_NAME` aur `NOTIFY_EMAIL` badlo.

---

## 4) "Mujhe X badalna hai — kahan jaun?" (jaldi jawab)
| Badalna hai | Jao |
|---|---|
| Hotel ka naam (Navbar/Footer) | `siteConfig.js` → `HOTEL_NAME` |
| Naam jo text ke andar aata hai | `HOTEL_SHORT_NAME`, `HOTEL_BRAND_WORD` |
| Phone / email / WhatsApp / location | `siteConfig.js` section 1 |
| Hero ki images + hero text | `HOME.hero` |
| Reviews | `REVIEWS` (+ `HOME.reviews` header) |
| Google Maps | `MAP_EMBED_URL`, `MAP_OPEN_URL`, `PLUS_CODE` |
| Bachay ka rule | `BOOKING_POLICY` |
| Booking popup ke alfaaz/errors | `MODAL` |
| Room price / inventory / AC price | `data/rooms.js` |
| Koi bhi colour | `theme.css` |
| Mobile/Tablet/Desktop par size (heading, padding, hero height) | `responsive.css` (device ka block) |
| Rooms ki categories filter | `ROOMS_PAGE.categories` |

---

## 5) Known issues (maine jaan-boojh kar nahi chheray — functionality same rakhni thi)
1. `App.jsx`: default `roomId` `"standard-hut"` hai jo ab `rooms.js` mein nahi hai (RoomDetailPage `ROOMS[0]` par fallback karta hai, is liye chalta hai).
2. `data/rooms.js`: gallery mein `id: 26` do dafa aaya hai (React key warning).
3. `ContactPage.jsx`: "SEND VIA EMAIL" button hover ke baad `onMouseOut` par safed (`--bg-white`) reh jata hai, asal colour (`--border-tan`) wapas nahi aata.
4. `HomePage.jsx`: Featured rooms `slideInLeft` / `slideInRight` animations use karta hai, lekin `styles.css` mein sirf `fadeUp`, `expandW`, `pulse` thay (in ka keyframe nahi mila).
5. `styles.css`: jo file mujhe mili usmein `.whatsapp-fab` ke rules nahi thay. Agar aapki asal file mein hain to unhein file ke end mein wapas paste karo (colours `var(--…)` se).
6. `HOTEL_ROOM_PAGE_PHONE` (+92 355…) aur `HOTEL_PHONE` (+92 332…) alag hain — pehle bhi aise hi tha. Same karna ho to `siteConfig.js` mein barabar kar do.
7. Reviews ke avatar ke rang (`avatarColor`) `siteConfig.js` ke `REVIEWS` mein hain, theme.css mein nahi.
8. `styles.css` ki `pulse` animation ka green glow `rgba(37,211,102,…)` literal hai (WhatsApp green).
9. `BookingWidget.jsx` kisi page mein import nahi hota (isliye usmein responsive tweaks nahi kiye).
10. Responsive update par desktop sizes thori unify hui hain (jaise page titles ab 64px, section headings 42px/52px).
