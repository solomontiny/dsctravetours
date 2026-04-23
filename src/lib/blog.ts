import santorini from "@/assets/dest-santorini.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import paris from "@/assets/dest-paris.jpg";
import capetown from "@/assets/dest-capetown.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: "Guides" | "Tips" | "Destinations" | "Visa";
  readTime: string;
  date: string; // ISO
  author: string;
  content: string[]; // paragraphs
};

export const posts: BlogPost[] = [
  {
    slug: "nigerian-passport-visa-free-2026",
    title: "Visa-free destinations for Nigerian passport holders in 2026",
    excerpt:
      "From Barbados to Vanuatu — a practical, up-to-date list of countries you can visit without a prior visa, and what to prepare before you fly.",
    image: capetown,
    category: "Visa",
    readTime: "6 min read",
    date: "2026-03-12",
    author: "DSC Editorial",
    content: [
      "If you're traveling on a Nigerian passport, knowing which countries grant visa-free or visa-on-arrival entry can transform how you plan a trip — fewer appointments, less paperwork, and more flexibility on dates.",
      "Visa-free favorites currently include Barbados, Dominica, Haiti, Fiji, Vanuatu and Micronesia. Visa-on-arrival options include Kenya, Rwanda, Mozambique, Madagascar, the Maldives, Seychelles, Cape Verde and Timor-Leste.",
      "Even with visa-free entry, immigration officers often ask for a return ticket, proof of accommodation and sufficient funds. We always advise travelers to print these documents and carry them in a small folder for fast clearance.",
      "Need help mapping your route, or combining a visa-free trip with a country that needs paperwork? Our visa team handles end-to-end processing with a high success rate.",
    ],
  },
  {
    slug: "first-time-dubai-guide",
    title: "A first-timer's guide to Dubai: where to stay, eat and explore",
    excerpt:
      "Marina, Downtown or Palm? Boat brunch or desert dinner? Here's how to spend a perfect five days in the city of superlatives.",
    image: dubai,
    category: "Guides",
    readTime: "8 min read",
    date: "2026-02-20",
    author: "Tunde Ade",
    content: [
      "Dubai rewards travelers who plan a little. The city is large, the heat is real, and the best experiences sit on opposite sides of town. With five days, you can comfortably split your stay between Downtown (for the Burj Khalifa, Dubai Mall and Opera) and the Marina (for the beach, JBR and yacht brunches).",
      "Don't skip Old Dubai. The spice and gold souks in Deira, an abra ride across the Creek and an evening at Al Fahidi Historic District feel like a different city entirely — and a welcome contrast to the skyscrapers.",
      "For dining, book At.mosphere on the 122nd floor of the Burj for the view, then balance it with a quiet dinner at Arabian Tea House in Al Fahidi. Save one evening for a private desert safari with a sit-down dinner under the stars.",
      "Our Dubai Skyline & Desert package includes flights, a 5★ hotel, all transfers and visa assistance — built for first-timers who want the polish without the planning.",
    ],
  },
  {
    slug: "honeymoon-maldives-vs-zanzibar",
    title: "Honeymoon showdown: Maldives or Zanzibar?",
    excerpt:
      "Both are postcard-beautiful. One is barefoot luxury on a private atoll, the other is culture, spice and sea. Here's how to choose.",
    image: maldives,
    category: "Destinations",
    readTime: "5 min read",
    date: "2026-01-30",
    author: "DSC Editorial",
    content: [
      "Choose the Maldives for total seclusion — overwater villas, glass-floor decks, house reefs you can swim from your room. It's quiet, intimate and almost entirely about the two of you.",
      "Choose Zanzibar for variety — Stone Town heritage, spice farms, dhow sails at sunset and long stretches of white-sand beach with Swahili flavor. It also costs noticeably less.",
      "Our travelers often combine both: 4 nights in Zanzibar for the experience, 4 nights in the Maldives for the wow. We can build the routing, transfers and resort selection so you don't have to think about logistics.",
    ],
  },
  {
    slug: "smart-packing-long-haul",
    title: "Smart packing for a 12-hour flight (without checking a bag)",
    excerpt:
      "What to wear, what to bring, and the small kit that makes long-haul economy feel almost premium.",
    image: paris,
    category: "Tips",
    readTime: "4 min read",
    date: "2026-01-12",
    author: "DSC Editorial",
    content: [
      "Long-haul comfort starts on the ground. Layer a soft tee, a midweight cardigan and easy slip-on shoes. Skip jeans — joggers or technical trousers travel far better.",
      "Build a small in-flight kit: noise-cancelling earbuds, a refillable water bottle, lip balm, hand cream, a sleep mask and a thin pair of socks. A foldable shopping bag doubles as a tidy seat organizer.",
      "Compression cubes will get a 7-day wardrobe into carry-on. Pick one neutral color story (navy, white, sand) and one accent — every piece works with every other.",
    ],
  },
  {
    slug: "santorini-best-time-to-visit",
    title: "When to visit Santorini for sunsets, calm and good prices",
    excerpt:
      "Peak summer is dazzling but crowded. May, early June and September give you the same views with half the people.",
    image: santorini,
    category: "Destinations",
    readTime: "4 min read",
    date: "2025-12-04",
    author: "DSC Editorial",
    content: [
      "Santorini's high season runs July through August — beautiful, but Oia at sunset becomes shoulder-to-shoulder. For the same caldera light with breathing room, target mid-May to mid-June, or the second half of September.",
      "Sea temperatures are warm enough to swim from June through October. Restaurants and boat tours operate at full schedule, but availability is much better and prices on boutique cave suites can drop 25-35%.",
      "Plan three nights minimum — one to arrive, one full day for Oia and Ammoudi Bay, one for a private catamaran sunset cruise. Add a fourth for wineries in Pyrgos.",
    ],
  },
];
