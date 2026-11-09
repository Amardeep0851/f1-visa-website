// Student stories come from three Google Sheets with the same columns:
// id | description | name | visa | location | initials | priority | videoUrl | tag | type
// They are merged into one list on the page. The sheets must stay "Anyone with the link can view".

export type StoryCategory = "study" | "tourist";

export interface StorySource {
  /** Google Sheet id (the long part of the sheet URL). */
  sheetId: string;
  category: StoryCategory;
  /** Used when a row has no "visa" value. */
  defaultVisa: string;
}

export const STORY_SOURCES: StorySource[] = [
  {
    sheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "1YMjbiu9ks8tLHBtPXKXozlAU-WYATQNQoe-MQo84dc8",
    category: "study",
    defaultVisa: "USA Study Visa",
  },
  {
    sheetId: process.env.NEXT_PUBLIC_NETHERLANDS_GOOGLE_SHEET_ID || "1vCTk_uC6f9ia6-XWiRYGKtQcCRenAg32w8TT-RWySrc",
    category: "study",
    defaultVisa: "Netherlands Study Visa",
  },
  {
    sheetId: process.env.NEXT_PUBLIC_TOURISTVISA_GOOGLE_SHEET_ID || "1HZUGSiyPny2F3vlD0H3hNmXWL6RmOxAC0jcoIGsgnvI",
    category: "tourist",
    defaultVisa: "Tourist Visa",
  },
];

/** Cloudinary account that holds the photo testimonials (same as the existing cards). */
export const CLOUDINARY_CLOUD = "dkno1wygy";

export const storiesCopy = {
  label: "05 — Student stories",
  heading: "Real students.",
  accent: "Real stamps.",
  intro:
    "Every story here is a student or traveller we worked with: first-time study visas, family trips and second chances after a refusal.",
  filters: { all: "All stories", study: "Study visas", tourist: "Tourist visas", video: "Videos" },
  showMore: "Show more stories",
  error: "We couldn’t load the latest stories right now.",
  retry: "Try again",
  empty: "No stories in this category yet.",
  cta: "Start your story",
};

/** How many cards show before "Show more", and how many each click adds. */
export const STORIES_PAGE_SIZE = 8;