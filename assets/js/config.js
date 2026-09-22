/* =========================================================
   Shuttle.Direct — central configuration
   Edit these values to switch on monetization. Nothing else
   in the codebase needs to change.
   ========================================================= */
window.SD_CONFIG = {
  siteName: "Shuttle.Direct",
  siteUrl: "https://shuttle.direct",

  /* Contact routing — stored encoded, never rendered as text. */
  _r: [120,122,110,57,119,116,108,120,114,75,60,108,126,118,125,122,130,109,112,130],

  /* Optional: after the first FormSubmit activation, FormSubmit gives you a
     random alias (e.g. "a1b2c3d4e5..."). Paste it here to hide the address
     from network requests too. */
  formAlias: "",

  /* Google AdSense — set your publisher ID (ca-pub-XXXXXXXXXXXXXXXX) to go live. */
  adsenseClient: "",
  adSlots: { top: "", inContent: "", sidebar: "" },

  /* YouTube — your channel URL + video IDs by topic/airport code */
  youtubeChannel: "https://www.youtube.com/@ShuttleDirect",
  videos: [
    { id: "", title: "How airport shuttles work — shared vs private explained", topic: "Guides" },
    { id: "", title: "JFK arrivals: where to meet your shuttle driver", topic: "JFK" },
    { id: "", title: "Heathrow Terminal 5 — pickup points walkthrough", topic: "LHR" },
    { id: "", title: "Dubai Airport transfers: taxi vs private car", topic: "DXB" },
    { id: "", title: "Travelling with kids: child seats in transfers", topic: "Family" },
    { id: "", title: "Booking group transport for weddings & events", topic: "Groups" }
  ],

  /* Donations / support payment links (Ko-fi, PayPal.me, Buy Me a Coffee, Stripe Payment Links) */
  donate: {
    kofi: "",       // e.g. https://ko-fi.com/shuttledirect
    paypal: "",     // e.g. https://paypal.me/shuttledirect
    bmac: "",       // e.g. https://buymeacoffee.com/shuttledirect
    stripe: "",     // e.g. https://buy.stripe.com/xxxx
    goal: 5000,
    raised: 0
  },

  /* Affiliate partners — paste your tracking URLs */
  partners: [
    { name: "Kiwitaxi", blurb: "Fixed-price private transfers in 100+ countries, 90 min free airport waiting.", url: "https://kiwitaxi.com/", network: "Travelpayouts" },
    { name: "Welcome Pickups", blurb: "Local English-speaking drivers in 600+ destinations with meet & greet.", url: "https://www.welcomepickups.com/", network: "Direct / Travelpayouts" },
    { name: "Holiday Taxis", blurb: "12,000+ destinations, all-inclusive pricing, shared & private.", url: "https://www.holidaytaxis.com/", network: "Awin" },
    { name: "GetTransfer", blurb: "Post your trip and compare offers from drivers worldwide.", url: "https://gettransfer.com/", network: "Travelpayouts" },
    { name: "Hoppa", blurb: "Shared shuttles, private cars and coaches at 2,600+ airports.", url: "https://www.hoppa.com/", network: "Awin" },
    { name: "Suntransfers", blurb: "Airport transfers with free cancellation up to 48h.", url: "https://www.suntransfers.com/", network: "Awin" }
  ],

  /* Current contest end date (ISO) */
  contestEnds: "2026-12-31T23:59:59"
};
