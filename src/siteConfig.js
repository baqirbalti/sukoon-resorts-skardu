// ============================================================================
//  src/siteConfig.js  —  ⭐ NAYA HOTEL BANANE KE LIYE SABSE PEHLE YEHI FILE EDIT KARO ⭐
//  Hotel ka naam, contact, links, saara text, reviews, hero images yahin hain.
//  (Colours/fonts ke liye: src/theme.css   |   Room data ke liye: src/data/rooms.js
//   Images ki list ke liye: src/assets/images.js)
// ============================================================================
import { IMGS } from "./assets/images.js";

/* ───────────── 1. HOTEL IDENTITY ───────────── */
export const HOTEL_NAME        = "Sukoon Resorts \n Skardu";   // Navbar + Footer (lamba naam)
export const HOTEL_SHORT_NAME  = "Sukoon Resorts";             // text ke andar jahan naam aata hai
export const HOTEL_BRAND_WORD  = "Sukoon";                     // sirf ek lafz (hero highlight, headings)
export const HOTEL_CITY        = "Skardu";
export const HOTEL_TAGLINE     = "Where the Mountains Meet Timeless Luxury";
export const HOTEL_LOCATION    = "Near Skardu International Airport, Sukoon Rd, Gayool, Skardu";
export const HOTEL_EMAIL       = "info@sukoonresorts.com";
export const HOTEL_PHONE       = "+92 332 2785666";
export const WHATSAPP_NUMBER   = "923322785666";               // + ke baghair
// Room detail page ke "CALL US AT" box mein ye alag number dikhta hai (pehle se aisa hi tha).
// Agar dono same karne hon to yahan HOTEL_PHONE likh do.
export const HOTEL_ROOM_PAGE_PHONE = "+92 355 4222280";

export const LOCALE         = "en-PK";   // date / number format
export const CURRENCY_LABEL = "PKR";

/* ───────────── 2. LINKS ───────────── */
export const SOCIAL = {
  instagram: "https://www.instagram.com/sukoon.resorts?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  facebook:  "https://www.facebook.com/sukoonresortsskardu/",
};
export const BOOKING_COM_URL = "https://www.booking.com/hotel/pk/sukoon-resorts-skardu1.en-gb.html";
export const MAP_EMBED_URL   = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1314.9360563402633!2d75.5703594!3d35.2880625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDE3JzE3LjAiTiA3NcKwMzQndzEzLjMnRQ!5e0!3m2!1sen!2spk!4v1716900000000!5m2!1sen!2spk";
export const MAP_OPEN_URL    = "https://maps.google.com/?q=35.2880625,75.5703594";
export const PLUS_CODE       = "7HQC+64H Skardu, Gilgit-Baltistan";

// Google Apps Script (booking form -> Sheet + email). Setup steps: README.md
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzB679vijSyhfyd4gv0JU2KfmH7AxJ2-8FkaqGbN1sxhKjYZgRpJgph2V2rxmonled6uQ/exec";

/* ───────────── 3. BOOKING POLICY (modal ke rules) ───────────── */
export const BOOKING_POLICY = {
  freeChildrenPerRoom: 1,   // har room mein itne bachay free
  childMaxAge: 10,          // is umar se kam = bacha
};

/* ───────────── 4. WHATSAPP / EMAIL MESSAGES ───────────── */
export const MESSAGES = {
  greeting: "Assalamu Alaikum! 🌿",
  closing:  "Thank you! 🙏",
  bookingIntro: `I would like to make a reservation at ${HOTEL_SHORT_NAME}.`,
  askConfirm:   "Could you please confirm availability and share the booking details?",
  roomInterest: (room) => `I am interested in booking the *${room}* at ${HOTEL_SHORT_NAME}, ${HOTEL_CITY}.`,
  roomAsk:      "Could you please share availability and pricing details?",
  generalIntro: `I would like to make a reservation at ${HOTEL_SHORT_NAME}, ${HOTEL_CITY}.`,
  generalAsk:   "Could you please help me with availability and room options?",
  enquiryFallback: `I have an enquiry about ${HOTEL_SHORT_NAME}.`,
  guestFallback: "Guest",
  labels: { room: "🏨 *Room:*", checkIn: "📅 *Check-in:*", checkOut: "📅 *Check-out:*", nights: "🌙 *Nights:*", guests: "👥 *Guests:*", name: "*Name:*" },
};
export const EMAIL_TEMPLATE = {
  subjectPrefix: "General Enquiry",
  greeting: `Hi ${HOTEL_SHORT_NAME},`,
  signoff: "Best regards,",
};

/* ───────────── 5. NAVBAR / FOOTER / SHARED ───────────── */
export const NAV_LINKS = [
  { label: "Home", key: "home" }, { label: "Rooms", key: "rooms" }, { label: "Gallery", key: "gallery" },
  { label: "Amenities", key: "amenities" }, { label: "About", key: "about" }, { label: "Contact", key: "contact" },
];
export const NAVBAR = { bookNow: "BOOK NOW", bookNowMobile: "📅 BOOK NOW" };

export const FOOTER = {
  logoAlt: "logo",
  tagline: "Where the mountains meet timeless luxury.",
  navigateTitle: "NAVIGATE", contactTitle: "CONTACT", socialTitle: "SOCIAL",
  whatsappLink: "💬 WhatsApp Us", instagramLabel: "📸 Instagram", facebookLabel: "📘 Facebook",
  copyrightSuffix: "All Rights Reserved",
};

export const THANK_YOU = {
  title: "Thank You!",
  message: `Thank you for booking with ${HOTEL_SHORT_NAME}. Your booking has been placed successfully. For confirmation, our team will call you shortly on the number you provided.`,
  button: "DONE",
};
export const WHATSAPP_FAB = { title: "Chat with us on WhatsApp", ariaLabel: "Book on WhatsApp" };

/* ───────────── 6. HOME PAGE ───────────── */
export const HOME = {
  hero: {
    slides: [IMGS.hero01, IMGS.hero03, IMGS.hero02],
    intervalMs: 5500,
    titleLine1: "Discover the True Meaning of",
    highlight: HOTEL_BRAND_WORD,
    subtitle: "A Heritage Retreat in Skardu Valley",
  },
  welcome: {
    heading: `Welcome to ${HOTEL_BRAND_WORD} Resort`,
    subheading: "Experience the Serenity of the North",
    text: `Welcome our guests to ${HOTEL_BRAND_WORD} Resort located in the heart of Skardu. Nestled amidst the majestic Karakoram peaks, our retreat offers a perfect blend of traditional Baltistani heritage and modern comfort. Let nature be your sanctuary.`,
    image: IMGS.ext02,
    imageAlt: `Welcome to ${HOTEL_SHORT_NAME}`,
  },
  quickBook: {
    checkIn: "Check-in", checkOut: "Check-out", guests: "Guests",
    guestOptions: ["1 Guest", "2 Guests", "3 Guests", "4+ Guests"],
    defaultGuests: "2 Guests",
    button: "Check Availability",
  },
  featured: { label: "ACCOMMODATIONS", heading: "Featured Rooms & Villas", count: 3, button: "VIEW ALL ROOMS" },
  dining: {
    label: "What Awaits You",
    heading: `Heritage Culinary Experience at ${HOTEL_BRAND_WORD}`,
    points: [
      "A beautifully crafted dining space with panoramic views of the Karakoram peaks.",
      "Floor-to-ceiling windows enhancing your dining experience with natural mountain light.",
      "Perfect for intimate meals and larger gatherings, offering traditional Balti cuisine.",
    ],
    image: IMGS.gallery02,
    imageAlt: "Heritage Restaurant",
  },
  amenities: {
    label: "Resort Facilities",
    heading: `All-Inclusive Amenities at ${HOTEL_SHORT_NAME}`,
    items: [
      ["📡", "COMPLIMENTARY WI-FI"], ["🚗", "FREE PARKING"], ["🍽️", "ON-SITE RESTAURANT"],
      ["🛎️", "ROOM SERVICE"], ["🏔️", "GUIDED TOURS"], ["🔥", "BONFIRE NIGHTS"],
    ],
  },
  reviews: {
    heading: HOTEL_SHORT_NAME,
    thumbImage: IMGS.hero02, thumbAlt: "Resort Thumbnail",
    subtitle: "Real Booking guest reviews",
    writeButton: "Write a review",
    readOriginal: "Read original",
    verified: "✓ Verified",
    autoScrollMs: 4000,
  },
  location: {
    label: "Explore Skardu", heading: "Our Location",
    plusCodeLabel: "Plus Code:",
    button: "🗺️ Open in Google Maps",
    mapTitle: `${HOTEL_SHORT_NAME} Skardu Accurate Location`,
  },
  cta: {
    heading: "Ready to Reserve Your Stay?",
    text: "Let the Karakoram welcome you. Reach us directly on WhatsApp for instant booking.",
    button: "Book via WhatsApp",
  },
};

// Guest reviews (home page carousel). avatarImg ya avatarColor + initial.
export const REVIEWS = [
  { name: "Hamid", country: "Pakistan", flag: "🇵🇰", date: "11 months ago", title: "Exceptional", positive: "The place, ambience, food, staff and their services everything was outstanding.", avatarImg: IMGS.revHamid, avatarColor: null },
  { name: "Khan", country: "Pakistan", flag: "🇵🇰", date: "11 months ago", title: "Superb", positive: "Superb hospitality! Clean rooms, beautiful mountain view, and exceptionally cooperative staff.", avatarImg: null, avatarColor: "#E28743", initial: "K" },
  { name: "Asfand", country: "Pakistan", flag: "🇵🇰", date: "11 months ago", title: "Exceptional", positive: "Best location with beautiful views, staff behaviour very good 👍. Highly recommended for family stays!", avatarImg: null, avatarColor: "#33b5e5", initial: "A" },
  { name: "Marziajasni", country: "Malaysia", flag: "🇲🇾", date: "11 months ago", title: "A stay in heaven 🤍", positive: "The owner & staff at Sukoon Resort were fantastic! They made check-in easy, and my room had a beautiful snow-peaked mountain view.", avatarImg: IMGS.revMarzia, avatarColor: null },
  { name: "Ahmad", country: "Pakistan", flag: "🇵🇰", date: "11 months ago", title: "Exceptional", positive: "Our overall experience at the resort was amazing. View from our room was spectacular, staff was cooperative.", avatarImg: IMGS.revAhmad, avatarColor: null },
];

/* ───────────── 7. ROOMS PAGES ───────────── */
export const ROOMS_PAGE = {
  label: "ACCOMMODATIONS",
  title: "Rooms & Villas",
  text: `Each accommodation at ${HOTEL_SHORT_NAME} is a handcrafted retreat — designed to blend heritage architecture with modern comfort against the backdrop of the Karakoram.`,
  categories: ["All", "Chalet", "Deluxe", "Villa", "Suite"],   // room ki "category" (rooms.js) se match hona chahiye
  empty: "No rooms in this category.",
};
export const ROOM_CARD = { badgeFallback: "ROOM", bedsFallback: "Beds N/A", sizeFallback: "Size N/A", startingFrom: "Starting from", viewButton: "VIEW" };
export const ROOM_DETAIL = {
  measurements: "MEASUREMENTS:", facilities: "FACILITIES:", extra: "EXTRA:",
  price: "PRICE", amenities: "AMENITIES", callUs: "CALL US AT", emailUs: "EMAIL US AT",
  perNightNonAC: "/ Per Night (Non AC)", perNightAC: "/ Per Night (with AC)",
  bookButtonPrefix: "Book This", galleryTitle: "Room Gallery",
  photoAlt:     (room, i) => `${room.name} — photo ${i + 1}`,
  photoCaption: (room, i, total) => `${room.name} — Photo ${i + 1} of ${total}`,
  gridAlt:      (room, i) => `${room.name} ${i + 1}`,
};

/* ───────────── 8. GALLERY PAGE ───────────── */
export const GALLERY_PAGE = {
  label: "VISUAL STORIES", title: "Gallery",
  text: `A glimpse into the beauty of ${HOTEL_SHORT_NAME} — from our heritage architecture and rooms to the majestic Karakoram that surrounds us.`,
  empty: "No photos in this category yet.",
  showing: (n) => `Showing ${n} photo${n !== 1 ? "s" : ""}`,
};

/* ───────────── 9. ABOUT PAGE ───────────── */
export const ABOUT = {
  heroImage: IMGS.hero01, heroAlt: `${HOTEL_SHORT_NAME} aerial`,
  label: "OUR STORY", title: `About ${HOTEL_SHORT_NAME}`,
  storyHeading: "Born From the Mountains",
  paragraphs: [
    `${HOTEL_SHORT_NAME} was built with one vision: to create a place where travellers can find true sukoon — peace — in the cradle of the world's mightiest mountain range.`,
    "Located in Skardu, Gilgit-Baltistan, our property spans several acres of sculpted landscape featuring circular heritage huts, a central swimming pool, manicured lawns, and a domed restaurant that celebrates local culture through food and architecture.",
    `We believe that luxury and authenticity are not opposites. Every structure at ${HOTEL_BRAND_WORD} is built using traditional Baltistani techniques — mud-plaster walls, hand-carved wooden ceilings, stone pathways, and locally forged iron fixtures. Our guests often say it feels like stepping into a living museum, except with every modern comfort.`,
    "We are committed to sustainable, community-rooted hospitality — employing local craftsmen, sourcing ingredients from nearby farms, and preserving the integrity of this sacred landscape for generations to come.",
  ],
  stats: [["4", "Room Types"], ["2.5 Acres", "Resort Grounds"], ["Skardu", "GB, Pakistan"]],
  design: {
    image: IMGS.ext02, imageAlt: "Heritage fort exterior",
    label: "OUR DESIGN PHILOSOPHY", heading: "Heritage Meets Hospitality",
    paragraphs: [
      "Inspired by the ancient forts and circular dwelling traditions of Baltistan, our architects worked closely with local artisans to design each structure from the ground up.",
      "The result is a resort that does not sit on the landscape — it grows from it. Stone walls, earthen plaster, dark timber, and warm amber lighting create a harmony between shelter and sky that you have to experience to fully understand.",
    ],
  },
};

/* ───────────── 10. AMENITIES PAGE ───────────── */
export const AMENITIES_PAGE = {
  label: "RESORT EXPERIENCES", title: "Amenities & Facilities",
  text: `Beyond exceptional rooms, ${HOTEL_SHORT_NAME} offers a curated collection of experiences rooted in the landscape and culture of Gilgit-Baltistan.`,
  items: [
    { icon: "🏊", title: "Outdoor Pool", from: "left", img: IMGS.pool,
      desc: "Our signature pool, sculpted to follow the natural landscape, sits at the heart of the resort with breathtaking views of the snow-capped Karakoram. Heated during cooler months, it's open year-round for guests to enjoy the crisp mountain air." },
    { icon: "🍽️", title: "Heritage Restaurant", from: "right", img: IMGS.gallery02,
      desc: "Housed beneath a dramatic circular domed ceiling with amber wall sconces, our restaurant serves authentic Baltistani cuisine alongside continental dishes. Tables are set with handcrafted wooden accents and draped in local linen." },
    { icon: "🚗", title: "Airport Transfer", from: "left", img: IMGS.airportimage,
      desc: "Arrive in comfort. We arrange seamless pickup and drop-off service from Skardu Airport. Share your flight details at booking, and our team will be waiting for you." },
    { icon: "🔥", title: "Bonfire & Stargazing Nights", from: "right", img: IMGS.hero02,
      desc: "As the sun falls behind the Karakoram, we light the bonfire. With near-zero light pollution, the Milky Way stretches across the entire sky. Our team sets up seating, local snacks, and hot chai for a truly unforgettable night." },
    { icon: "🏔️", title: "Guided Mountain Treks", from: "left", img: IMGS.trackingimage,
      desc: "Explore the ancient valleys and towering peaks with our expert local guides. From gentle morning hikes to multi-day K2 base camp treks, we connect you to this extraordinary landscape at your own pace." },
    { icon: "🧘", title: "Wellness & Meditation", from: "right", img: IMGS.gallery16,
      desc: "Begin your mornings with guided yoga on our open terraces as the mountain mist rises. Our wellness programme draws from local Baltistani tradition — breathing, stillness, and the healing power of altitude and silence." },
  ],
  cta: {
    label: "PLAN YOUR STAY",
    heading: `Experience It All at ${HOTEL_BRAND_WORD}`,
    text: "Reach out to our team on WhatsApp to arrange a bespoke package that includes all the experiences you desire.",
    button: "📱 PLAN MY STAY",
  },
};

/* ───────────── 11. CONTACT PAGE ───────────── */
export const CONTACT_PAGE = {
  label: "GET IN TOUCH", title: "Contact Us",
  text: "Our team is here to help you plan the perfect mountain escape. Select your preferences or send an enquiry directly via WhatsApp or Email.",
  infoHeading: "We'd Love to Hear From You",
  infoCards: [
    ["📍", "Location", HOTEL_LOCATION],
    ["📞", "Phone / WhatsApp", HOTEL_PHONE],
    ["📧", "Email", HOTEL_EMAIL],
    ["🕐", "Booking Hours", "Open Daily · 8AM – 10PM PKT"],
  ],
  formTitle: "Send an Enquiry",
  formText: "Fill out the details below and reach us instantly through your preferred channel.",
  nameLabel: "Your Name", namePlaceholder: "e.g. Ahmed Khan",
  messageLabel: "Your Message", messagePlaceholder: "Tell us about your visit — tentative dates, suite preference, group size…",
  whatsappButton: "📱 SEND VIA WHATSAPP", emailButton: "✉️ SEND VIA EMAIL",
};

/* ───────────── 12. BOOKING WIDGET (abhi kisi page mein use nahi ho raha) ───────────── */
export const BOOKING_WIDGET = {
  titleRoom: "Reserve This Room", titleGeneral: "Check Availability",
  selectedRoom: "Selected Room", checkIn: "Check-in Date", checkOut: "Check-out Date", guests: "Number of Guests",
  errCheckIn: "Please select a check-in date.", errCheckOut: "Please select a check-out date.",
  buttonRoom: "📱 BOOK ON WHATSAPP", buttonGeneral: "📱 CHECK AVAILABILITY",
  footnote: "Instant confirmation · No hidden fees · Reply within hour",
};

/* ───────────── 13. BOOKING MODAL (Book Now popup) ───────────── */
const plural = (n, one, many) => (n === 1 ? one : many);
export const MODAL = {
  title: "Book Your Stay",
  subtitleAll: "Choose any mix of rooms — different types, different quantities — then fill your details once.",
  subtitleSingle: (name) => `Booking the ${name}. Add an extra mattress below if needed, or add other rooms to this same request.`,
  fallbackRoomName: "this room",
  step1: "1. Select Rooms", step2: "2. Your Details",
  sleeps: "Sleeps", perNight: "/night", maxAvailable: "Max Available:",
  mattressLabel: (priceText) => `Breakfast + Extra mattress (${priceText}/night)`,
  showOnly: (name) => `− Show only ${name}`, addOthers: "+ Add other rooms to this booking",
  selection: (n) => `Your Selection (${n} room${n > 1 ? "s" : ""})`,
  extraMattress: (n) => `extra mattress${n > 1 ? "es" : ""}`,
  estimatedTotal: "Estimated Total",
  nightsSuffix: (n) => ` (${n} night${n > 1 ? "s" : ""})`,
  totalNote: "Per-night rate shown — select dates below for full-stay total.",
  labels: { firstName: "First Name *", lastName: "Last Name *", email: "Email *", phone: "Contact Number *", whatsapp: "WhatsApp Number *", checkIn: "Check in Date *", checkOut: "Check out Date *", adults: "Adults *", children: "Children *" },
  childrenHint: `(Under ${BOOKING_POLICY.childMaxAge})`,
  whatsappPlaceholder: "03466990348",
  submit: "Request Booking", submitting: "Submitting...",
  errors: {
    noRoom: "Please select at least one room before submitting.",
    overCapacity: (max, adults) => `Your selected rooms can only accommodate up to ${max} adults (including extra mattresses). You have entered ${adults} adults. Please add more rooms.`,
    needMattress: (base, adults, needed) => `Room base capacity is ${base}. For ${adults} adults, please add ${needed} extra mattress(es) using the '+' button above.`,
    tooManyChildren: (children, rooms) => {
      const n = BOOKING_POLICY.freeChildrenPerRoom;
      return `Only ${n} ${plural(n, "child", "children")} (under ${BOOKING_POLICY.childMaxAge} yrs) is free per room. You have ${children} children and ${rooms} room(s). Please count extra children as adults or add extra mattresses/rooms.`;
    },
  },
};
