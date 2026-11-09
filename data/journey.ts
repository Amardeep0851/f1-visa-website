// All copy for the passport journey. Add a country to `countries` and the loader,
// stamps, counter, progress dots and scroll length all update automatically.

export const SITE = {
  usa: "https://usa.yourf1visaguide.com",
  europe: "https://netherlands.yourf1visaguide.com",
  tourist: "https://touristvisas.yourf1visaguide.com",
  dubai: "https://dubai.yourf1visaguide.com",
} as const;

/** Background artwork. Upload the files to /public at these paths. */
export const JOURNEY_IMAGES = {
  worldMap: "/images/journey/world-map.svg",
} as const;

export const navItems = [
  { label: "Services", target: "hero" },
  { label: "Destinations", target: "countries" },
  { label: "Process", target: "steps" },
  { label: "About", target: "about" },
  { label: "Contact", target: "contact" },
] as const;

export type NavTarget = (typeof navItems)[number]["target"];

export const heroCopy = {
  vertical: "Immigration & Visa Guidance",
  titleLeft: "Your Immigration",
  titleRight: "Journey,",
  accentA: "Starts",
  accentB: "Here.",
  lede: "With our expert team by your side, navigate the visa process with clarity, confidence and personalized guidance.",
  badge: "Explore our process",
  stats: [
    { value: "15+", label: "Destinations" },
    { value: "5,000+", label: "Students & Travelers" },
  ],
  services: [
    { label: "Study", secondLine: "Visas", icon: "study", href: SITE.usa },
    { label: "Tourist", secondLine: "Visas", icon: "tourist", href: SITE.tourist },
    { label: "Other", secondLine: "Visa Services", icon: "other", href: "whatsapp" },
  ],
} as const;

export const loaderCopy = {
  label: "Preparing your journey",
  /** Whole loader, in seconds, however many countries there are. */
  totalSeconds: 4,
};

export interface Country {
  /** Unique, URL-safe id. */
  id: string;
  /** Name shown in the loader and as the big heading. */
  name: string;
  /** Text printed around / inside the stamp. Keep it short. */
  stampName: string;
  /** Second line on the stamp. */
  stampVisa: string;
  /** Italic line under the country name. */
  tagline: string;
  description: string;
  cta: { label: string; href: string };
  /** Optional landmark line-art shown faintly behind the text. Upload to /public. */
  image?: string;
}

export const countriesCopy = {
  label: "02 / Destinations",
  heading: "Countries we cover",
  lead: "Choose your dream destination to see intake dates, estimated costs, and requirements.",
  hint: "Scroll to explore all destinations",
};

export const countries: Country[] = [
  {
    id: "usa",
    name: "United States",
    stampName: "UNITED STATES",
    stampVisa: "F-1 STUDENT VISA",
    tagline: "Study in the U.S.",
    description:
      "University admission and your I-20, the DS-160 form, the SEVIS fee and interview preparation, step by step.",
    cta: { label: "See intake dates, costs and requirements", href: SITE.usa },
    image: "/images/journey/countries/usa.png",
  },
  {
    id: "uk",
    name: "United Kingdom",
    stampName: "UNITED KINGDOM",
    stampVisa: "STUDENT VISA",
    tagline: "Study in the U.K.",
    description:
      "An offer from a licensed university, your CAS letter, proof of funds and a complete online application.",
    cta: { label: "Ask us about the UK", href: "whatsapp" },
    image: "/images/journey/countries/uk.png",
  },
  {
    id: "canada",
    name: "Canada",
    stampName: "CANADA",
    stampVisa: "STUDY PERMIT",
    tagline: "Study in Canada",
    description:
      "An offer from a designated learning institution, proof of funds and a complete study permit application.",
    cta: { label: "Ask us about Canada", href: "whatsapp" },
    image: "/images/journey/countries/canada.png",
  },
  {
    id: "australia",
    name: "Australia",
    stampName: "AUSTRALIA",
    stampVisa: "STUDENT · SUBCLASS 500",
    tagline: "Study in Australia",
    description:
      "Your Confirmation of Enrolment, overseas student health cover and a well-prepared online application.",
    cta: { label: "Ask us about Australia", href: "whatsapp" },
    image: "/images/journey/countries/australia.png",
  },
  {
    id: "germany",
    name: "Germany",
    stampName: "GERMANY",
    stampVisa: "NATIONAL VISA · STUDY",
    tagline: "Study in Germany",
    description:
      "University admission, proof of finances and your embassy appointment for a national study visa.",
    cta: { label: "Ask us about Germany", href: "whatsapp" },
    image: "/images/journey/countries/germany.png",
  },
  {
    id: "dubai",
    name: "Dubai (UAE)",
    stampName: "UNITED ARAB EMIRATES",
    stampVisa: "DUBAI · STUDENT VISA",
    tagline: "Study in Dubai",
    description:
      "Admission or transfer to a university in Dubai, followed by your student visa and residence steps.",
    cta: { label: "See intake dates, costs and requirements", href: SITE.dubai },
    image: "/images/journey/countries/dubai.png",
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    stampName: "NEW ZEALAND",
    stampVisa: "STUDENT VISA",
    tagline: "Study in New Zealand",
    description:
      "An offer of place, proof of funds and your online student visa application, checked before you submit.",
    cta: { label: "Ask us about New Zealand", href: "whatsapp" },
    image: "/images/journey/countries/new-zealand.png",
  },
];

export const stepsCopy = {
  label: "03 — The next chapter",
  heading: "Your next chapter",
  accent: "starts with a plan.",
  body: "Every journey is different. We’ll help you understand your options, prepare your application and take the next step with clarity.",
  primaryCta: "Plan Your Next Step",
  secondaryCta: "Our Services",
  footnote: "Guidance at every stage",
};

export const steps = [
  { id: "apply", icon: "apply", label: "You apply", text: "Share your profile and documents with us." },
  { id: "file", icon: "file", label: "We check & file", text: "Our team checks every document and applies on your behalf." },
  { id: "decision", icon: "decision", label: "Visa decision", text: "You receive the embassy’s decision, and we guide what comes next." },
  { id: "fly", icon: "fly", label: "You fly", text: "Pre-departure guidance, then you’re on your way." },
] as const;