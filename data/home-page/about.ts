import { countries } from "../journey";

// Facts below come from the existing site (footer and hero stats). Keep them in sync.
export const OFFICE = {
  lines: ["Taj Food Market, SCO 18-19, 2nd Floor", "Crystal Plaza 1, above PUMA, Choti Baradari", "Jalandhar, Punjab 144001"],
  city: "Jalandhar, Punjab",
  phoneDisplay: "+91 70877 75007",
  phoneHref: "tel:+917087775007",
  email: "info@yourf1visaguide.com",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Your F1 Visa Guide, Crystal Plaza 1, Choti Baradari, Jalandhar, Punjab 144001"),
} as const;

export const aboutCopy = {
  label: "04 — About us",
  heading: "The team behind",
  accent: "your first stamp.",
  intro:
    "Your F1 Visa Guide is a study and tourist visa team in Jalandhar, Punjab. We sit with every student, check every document and stay with you until the visa decision arrives.",
  promisesTitle: "What we promise every family",
};

export const promises = [
  { title: "Honest advice first", text: "If your profile isn’t ready yet, we tell you and show you how to fix it." },
  { title: "Every document checked twice", text: "Nothing goes to an embassy until two of us have reviewed it." },
  { title: "One counsellor, start to finish", text: "You never have to explain your case again to someone new." },
  { title: "Clear fees, in writing", text: "You know exactly what you pay for before we begin." },
] as const;

/** Numbers count up when they scroll into view. `value` is the final number. */
export const aboutStats = [
  { value: 94, suffix: "%", label: "Approval rate" },
  { value: 50000, suffix: "+", label: "Happy clients" },
  { value: 15, suffix: "+", label: "Countries served" },
  { value: countries.length, suffix: "", label: "Study destinations" },
] as const;

/** The "passport data page" card. Labels are printed small, values large. */
export const identityFields = [
  { label: "Name / नाम", value: "Your F1 Visa Guide" },
  { label: "Speciality", value: "Study & tourist visas" },
  { label: "Office", value: OFFICE.city },
  { label: "Countries served", value: "15+" },
  { label: "Approval rate", value: "94%" },
  { label: "Contact", value: OFFICE.phoneDisplay },
] as const;

/** Machine-readable lines at the bottom of the card (44 characters each, like a real passport). */
export const MRZ = [
  "P<INDYOUR<F1<VISA<GUIDE<<STUDY<AND<TOURIST<<",
  "JALANDHAR<<PUNJAB<<IND<<APPROVAL<94<<<<<<<<<",
] as const;