import santorini from "@/assets/dest-santorini.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import paris from "@/assets/dest-paris.jpg";
import capetown from "@/assets/dest-capetown.jpg";
import zanzibar from "@/assets/dest-zanzibar.jpg";
import royalCaribbean from "@/assets/pkg-royal-caribbean.jpg";
import mscEurope from "@/assets/pkg-msc-europe.jpg";
import disneySingapore from "@/assets/pkg-disney-singapore.jpg";
import sunSeaCapeTown from "@/assets/pkg-cape-town.jpg";

export type TourCategory = "Beach" | "City" | "Adventure" | "Honeymoon" | "Cultural" | "Cruise";

export type TourPackage = {
  slug: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  price: number;          // NGN per person, indicative (base currency)
  duration: string;       // "5 days / 4 nights"
  category: TourCategory;
  rating: number;
  summary: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  includes: string[];
};

export const packages: TourPackage[] = [
  {
    slug: "royal-caribbean-allure",
    title: "Royal Caribbean — Allure of the Seas",
    destination: "Eastern Caribbean",
    country: "Florida → St. Kitts → St. Maarten → Puerto Rico → Bahamas",
    image: royalCaribbean,
    price: 4096000,
    duration: "20th Aug → 1st Sept (12 nights)",
    category: "Cruise",
    rating: 4.9,
    summary:
      "12 nights of full-board cruising across the Eastern Caribbean — pre-cruise stay, sailing, and post-cruise nights all included.",
    highlights: [
      "1 night pre-cruise stay with breakfast",
      "8 nights Eastern Caribbean — full-board meals",
      "2 nights post-cruise stay with breakfast",
      "All onboard activities included",
    ],
    itinerary: [
      { day: 1, title: "Pre-cruise (21st – 22nd Aug)", description: "Hotel stay with breakfast, transfer to port." },
      { day: 2, title: "Cruise (22nd – 30th Aug)", description: "Florida → St. Kitts → St. Maarten → Puerto Rico → Bahamas → Florida — full-board." },
      { day: 3, title: "Post-cruise (30th Aug – 1st Sept)", description: "2 nights accommodation with breakfast before departure." },
    ],
    includes: ["Pre & post-cruise hotels", "8-night cruise (full-board)", "Onboard activities", "Port transfers"],
  },
  {
    slug: "msc-europe-mediterranean",
    title: "MSC Europe — Mediterranean Cruise",
    destination: "Mediterranean",
    country: "France → Spain → Italy → France",
    image: mscEurope,
    price: 3360000,
    duration: "24th Aug → 5th Sept (12 nights)",
    category: "Cruise",
    rating: 4.8,
    summary:
      "Sail the French and Italian Riviera with MSC — full-board cruising plus pre and post-cruise stays. Valid till 1st June 2026.",
    highlights: [
      "1 night pre-cruise stay with breakfast",
      "7 nights Mediterranean — full-board meals",
      "2 nights post-cruise stay with breakfast",
      "Onboard entertainment & activities",
    ],
    itinerary: [
      { day: 1, title: "Pre-cruise (25th – 26th Aug)", description: "Hotel stay with breakfast." },
      { day: 2, title: "Cruise (26th Aug – 2nd Sept)", description: "France → Spain → Italy → France — full-board." },
      { day: 3, title: "Post-cruise (2nd – 5th Sept)", description: "3 nights to explore before flying home." },
    ],
    includes: ["Pre & post-cruise hotels", "7-night cruise (full-board)", "Onboard activities", "Port transfers"],
  },
  {
    slug: "disney-cruise-singapore",
    title: "Disney Cruise — Singapore",
    destination: "Singapore",
    country: "Singapore",
    image: disneySingapore,
    price: 4000000,
    duration: "24th Aug → 2nd Sept (9 nights)",
    category: "Cruise",
    rating: 5.0,
    summary:
      "A magical family cruise from Singapore — family of 4 from USD 6,590 (per person sharing from USD 2,500). Valid till 1st June 2026.",
    highlights: [
      "1 night pre-cruise stay with breakfast",
      "8 nights cruise — full-board meals",
      "2 nights post-cruise stay with breakfast",
      "Family rates available — 2 adults + 2 children (under 12) USD 6,590",
    ],
    itinerary: [
      { day: 1, title: "Pre-cruise (24th – 27th Aug)", description: "Singapore hotel stay with breakfast." },
      { day: 2, title: "Cruise (27th – 31st Aug)", description: "Disney Cruise — full-board with on-ship activities." },
      { day: 3, title: "Post-cruise (31st Aug – 2nd Sept)", description: "2 nights to relax before departure." },
    ],
    includes: ["Pre & post-cruise hotels", "Cruise (full-board)", "Onboard activities", "Family pricing on request"],
  },
  {
    slug: "sun-sea-cape-town",
    title: "Sun, Sea & Cape Town",
    destination: "Cape Town",
    country: "South Africa",
    image: sunSeaCapeTown,
    price: 3440000, // per person sharing
    duration: "4th – 10th August (6 nights)",
    category: "Adventure",
    rating: 4.9,
    summary:
      "From Lagos — 6 nights in a 5-star Cape Town hotel with city, winelands & Robben Island tours. ₦2,000,000 down payment to secure (last payment 1st June 2026).",
    highlights: [
      "Return economy ticket from Lagos",
      "6 nights 5-star hotel + daily breakfast",
      "Cape Town city tour & Robben Island tour",
      "Half-day Winelands tour (Stellenbosch)",
      "Aquila Day Safari with breakfast & lunch",
      "Electronic SA visa available on request",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Cape Town", description: "Airport transfer, check-in to 5★ hotel." },
      { day: 2, title: "City Tour", description: "Cape Town highlights and orientation." },
      { day: 3, title: "Robben Island", description: "Guided historic tour." },
      { day: 4, title: "Winelands", description: "Half-day Stellenbosch tasting." },
      { day: 5, title: "Aquila Safari", description: "Big-five game drive with breakfast & lunch." },
      { day: 6, title: "At leisure", description: "Free day to explore." },
      { day: 7, title: "Departure", description: "Airport transfer for return flight." },
    ],
    includes: ["Return flight (Lagos)", "5★ hotel", "Daily breakfast", "All transfers", "City + Winelands + Robben Island + Safari"],
  },
  {
    slug: "santorini-escape",
    title: "Santorini Sunset Escape",
    destination: "Santorini",
    country: "Greece",
    image: santorini,
    price: 3920000,
    duration: "6 days / 5 nights",
    category: "Honeymoon",
    rating: 4.9,
    summary:
      "Cliffside caldera views, white-washed villages and slow afternoons by the Aegean — a quiet, romantic escape.",
    highlights: [
      "Boutique cave-suite stay in Oia",
      "Private catamaran sunset cruise",
      "Wine tasting at Santo Wines",
      "Guided Akrotiri archaeology walk",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Santorini", description: "Private transfer to Oia, welcome dinner overlooking the caldera." },
      { day: 2, title: "Oia & Ammoudi Bay", description: "Morning village walk, leisurely seafood lunch by the water." },
      { day: 3, title: "Catamaran Cruise", description: "Half-day private sail with snorkeling at Red Beach and dinner onboard." },
      { day: 4, title: "Wine & Vineyards", description: "Tasting tour of Assyrtiko vineyards and an evening in Pyrgos." },
      { day: 5, title: "Akrotiri & Spa", description: "Archaeological tour, afternoon spa, farewell dinner." },
      { day: 6, title: "Departure", description: "Transfer to airport." },
    ],
    includes: ["Flights", "Boutique hotel", "Private transfers", "Guided tours", "Daily breakfast"],
  },
  {
    slug: "dubai-skyline",
    title: "Dubai Skyline & Desert",
    destination: "Dubai",
    country: "UAE",
    image: dubai,
    price: 3024000,
    duration: "5 days / 4 nights",
    category: "City",
    rating: 4.8,
    summary:
      "From Burj Khalifa heights to golden desert dunes — a polished introduction to the world's most ambitious city.",
    highlights: [
      "At The Top — Burj Khalifa 124th floor",
      "Private desert safari with dinner",
      "Marina yacht brunch",
      "Old Dubai souk walking tour",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "Meet & greet, transfer to hotel, evening at Dubai Mall fountains." },
      { day: 2, title: "Modern Dubai", description: "Burj Khalifa, Dubai Frame and Marina yacht experience." },
      { day: 3, title: "Desert Safari", description: "Dune drive, camel ride, traditional Bedouin dinner." },
      { day: 4, title: "Old Dubai", description: "Spice & gold souks, Al Fahidi historic district, abra ride." },
      { day: 5, title: "Departure", description: "Free morning, transfer to airport." },
    ],
    includes: ["Flights", "5★ hotel", "All transfers", "Visa assistance", "Daily breakfast"],
  },
  {
    slug: "maldives-overwater",
    title: "Maldives Overwater Retreat",
    destination: "Malé Atoll",
    country: "Maldives",
    image: maldives,
    price: 6320000,
    duration: "7 days / 6 nights",
    category: "Beach",
    rating: 5.0,
    summary:
      "Glass-floor villas, house-reef snorkeling and barefoot luxury — your most photographed week of the year.",
    highlights: [
      "Overwater villa with private deck",
      "House-reef snorkeling daily",
      "Sunset dolphin cruise",
      "Couples spa ritual",
    ],
    itinerary: [
      { day: 1, title: "Seaplane to Resort", description: "Scenic seaplane transfer, villa welcome and dinner." },
      { day: 2, title: "Reef Day", description: "Guided snorkel and lagoon kayaking." },
      { day: 3, title: "Island Hopping", description: "Visit a local island and sandbank picnic." },
      { day: 4, title: "Spa & Stillness", description: "Couples spa, beach yoga, candlelight dinner." },
      { day: 5, title: "Dolphin Cruise", description: "Sunset cruise with sparkling reception." },
      { day: 6, title: "Free Day", description: "At leisure on your villa deck." },
      { day: 7, title: "Departure", description: "Seaplane back to Malé." },
    ],
    includes: ["Flights", "Overwater villa", "Seaplane transfers", "Half-board", "Snorkel gear"],
  },
  {
    slug: "paris-romantique",
    title: "Paris Romantique",
    destination: "Paris",
    country: "France",
    image: paris,
    price: 2190,
    duration: "5 days / 4 nights",
    category: "Cultural",
    rating: 4.8,
    summary:
      "Quiet mornings in Le Marais, golden hour at the Eiffel Tower, and an afternoon at the Louvre — Paris, distilled.",
    highlights: [
      "Skip-the-line Louvre tour",
      "Seine river dinner cruise",
      "Versailles half-day",
      "Le Marais walking tour",
    ],
    itinerary: [
      { day: 1, title: "Bonjour Paris", description: "Arrival, evening stroll along the Seine." },
      { day: 2, title: "Iconic Paris", description: "Eiffel Tower, Trocadéro, Champs-Élysées." },
      { day: 3, title: "Louvre & Le Marais", description: "Guided museum tour, afternoon café-hopping." },
      { day: 4, title: "Versailles", description: "Half-day at the palace and gardens, dinner cruise." },
      { day: 5, title: "Au Revoir", description: "Free morning, airport transfer." },
    ],
    includes: ["Flights", "Boutique hotel", "Private guide", "Museum passes", "Daily breakfast"],
  },
  {
    slug: "cape-town-discovery",
    title: "Cape Town Discovery",
    destination: "Cape Town",
    country: "South Africa",
    image: capetown,
    price: 2650,
    duration: "7 days / 6 nights",
    category: "Adventure",
    rating: 4.9,
    summary:
      "Table Mountain mornings, Cape Winelands afternoons and a Garden Route drive — South Africa, unhurried.",
    highlights: [
      "Cable car up Table Mountain",
      "Stellenbosch winelands tour",
      "Cape Point & penguin colony",
      "Robben Island history tour",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "V&A Waterfront welcome dinner." },
      { day: 2, title: "Table Mountain", description: "Cableway and city orientation tour." },
      { day: 3, title: "Cape Peninsula", description: "Boulders Beach penguins, Cape of Good Hope." },
      { day: 4, title: "Winelands", description: "Stellenbosch and Franschhoek tastings." },
      { day: 5, title: "Robben Island", description: "Guided history tour, afternoon at leisure." },
      { day: 6, title: "Garden Route Day", description: "Drive along scenic coast, return for dinner." },
      { day: 7, title: "Departure", description: "Transfer to airport." },
    ],
    includes: ["Flights", "Boutique lodge", "Private driver", "All entries", "Daily breakfast"],
  },
  {
    slug: "zanzibar-spice",
    title: "Zanzibar Spice & Sea",
    destination: "Zanzibar",
    country: "Tanzania",
    image: zanzibar,
    price: 1750,
    duration: "6 days / 5 nights",
    category: "Beach",
    rating: 4.7,
    summary:
      "Stone Town heritage by morning, dhow sails by afternoon and a barefoot dinner under the stars.",
    highlights: [
      "Stone Town heritage walk",
      "Spice farm experience",
      "Sunset dhow cruise",
      "Mnemba reef snorkeling",
    ],
    itinerary: [
      { day: 1, title: "Arrival", description: "Beach resort check-in, welcome dinner." },
      { day: 2, title: "Stone Town", description: "Walking tour, House of Wonders, Forodhani night market." },
      { day: 3, title: "Spice Farm", description: "Guided plantation tour and traditional lunch." },
      { day: 4, title: "Mnemba Snorkel", description: "Boat trip to reef, dolphin spotting." },
      { day: 5, title: "Sunset Dhow", description: "Traditional sail with sundowners." },
      { day: 6, title: "Departure", description: "Free morning, airport transfer." },
    ],
    includes: ["Flights", "Beach resort", "All transfers", "Guided tours", "Half-board"],
  },
];

export const categories: TourCategory[] = ["Cruise", "Beach", "City", "Adventure", "Honeymoon", "Cultural"];

export const featuredSlugs = [
  "royal-caribbean-allure",
  "msc-europe-mediterranean",
  "disney-cruise-singapore",
  "sun-sea-cape-town",
];
