// Copy for the passport journey page. Edit text here, not in the components.

export const SITE = {
  usa: "https://usa.yourf1visaguide.com",
  europe: "https://netherlands.yourf1visaguide.com",
  tourist: "https://touristvisas.yourf1visaguide.com",
  dubai: "https://dubai.yourf1visaguide.com",
} as const;

/** Scroll positions (0 to 1) of the pinned story that each nav link jumps to. */
export const STORY_STOPS = {
  hero: 0,
  destinations: 0.3,
  process: 0.52,
  contact: 0.95,
} as const;

export const journeyNav = [
  { label: "Services", stop: STORY_STOPS.hero },
  { label: "Destinations", stop: STORY_STOPS.destinations },
  { label: "Process", stop: STORY_STOPS.process },
  { label: "Contact", stop: STORY_STOPS.contact },
] as const;

export const heroCopy = {
  vertical: "Immigration & Visa Guidance",
  lede: "With our expert team by your side, navigate the visa process with clarity, confidence and personalized guidance.",
  badge: "Explore our process",
  stats: [
    { value: "10+", label: "Destinations" },
    { value: "5,000+", label: "Students & Travelers" },
  ],
  services: [
    { label: "Study Visas", icon: "study", href: SITE.usa },
    { label: "Tourist Visas", icon: "tourist", href: SITE.tourist },
    { label: "Other Visa Services", icon: "other", href: "whatsapp" },
  ],
} as const;

export interface Destination {
  key: "us" | "ca" | "nl" | "ae";
  name: string;
  visa: string;
  description: string;
  cta: { label: string; href: string };
}

/** Order matches the order in which the stamps land. */
export const destinations: Destination[] = [
  {
    key: "us",
    name: "United States",
    visa: "F-1 student visa",
    description:
      "Your I-20 from the university, the DS-160 form, the SEVIS fee and a visa interview you have practised with us.",
    cta: { label: "Explore USA study visa", href: SITE.usa },
  },
  {
    key: "ca",
    name: "Canada",
    visa: "Study permit",
    description:
      "An offer from a designated learning institution, proof of funds and a complete study permit application.",
    cta: { label: "Ask about Canada", href: "whatsapp" },
  },
  {
    key: "nl",
    name: "Netherlands & Europe",
    visa: "Long-stay (MVV) student visa",
    description:
      "University admission, your long-stay study visa and the paperwork that follows once you arrive.",
    cta: { label: "Explore Europe study visa", href: SITE.europe },
  },
  {
    key: "ae",
    name: "Dubai",
    visa: "UAE student visa",
    description:
      "Admission or transfer to a university in Dubai, with help through your student visa and residence steps.",
    cta: { label: "Explore Dubai study visa", href: SITE.dubai },
  },
];

export const routeCopy = {
  eyebrow: "Destinations",
  heading: "Where will your",
  accent: "first stamp land?",
  hint: "Scroll or pick a country",
};

export const closingCopy = {
  eyebrow: "Your turn",
  heading: "Ready for your",
  accent: "first stamp?",
  cta: "Get Consultation",
  note: "Visa rules change often. We confirm the latest requirements with you before you apply.",
};
