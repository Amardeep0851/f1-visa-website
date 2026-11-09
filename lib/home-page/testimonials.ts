// Shared by the build-time (server) load and the in-browser refresh.
import { CLOUDINARY_CLOUD, STORY_SOURCES, type StoryCategory, type StorySource } from "@/data/home-page/testimonials";

export interface Story {
  /** Stable key: the media id, so the same video in two sheets appears once. */
  key: string;
  name: string;
  description: string;
  visa: string;
  location: string;
  initials: string;
  priority: boolean;
  tag: string;
  category: StoryCategory;
  media: { kind: "video" | "image"; id: string };
  /** Order inside its sheet, used for sorting. */
  order: number;
}

/* ---------- parsing ---------- */

interface GvizCell {
  v?: unknown;
}
interface GvizResponse {
  table?: { cols?: { label?: string }[]; rows?: { c?: (GvizCell | null)[] }[] };
}

/** Empty cells and "-" placeholders both count as "no value". */
const clean = (v: unknown) => {
  const s = typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim();
  return s === "-" ? "" : s;
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/** Reads columns by header name, so a moved or extra column does not break anything. */
export function parseSheet(text: string, source: StorySource): Story[] {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < 0) return [];
  const json = JSON.parse(text.slice(start, end + 1)) as GvizResponse;
  const cols = (json.table?.cols ?? []).map((c) => (c.label ?? "").trim().toLowerCase());
  const at = (name: string) => cols.indexOf(name);
  const idx = {
    id: at("id"),
    description: at("description"),
    name: at("name"),
    visa: at("visa"),
    location: at("location"),
    initials: at("initials"),
    priority: at("priority"),
    media: at("videourl"),
    tag: at("tag"),
    type: at("type"),
  };

  const stories: Story[] = [];
  (json.table?.rows ?? []).forEach((row, rowIndex) => {
    const cell = (i: number) => (i >= 0 ? clean(row.c?.[i]?.v) : "");
    const mediaId = cell(idx.media);
    if (!mediaId) return;
    const name = cell(idx.name);
    const type = cell(idx.type).toLowerCase();
    // A YouTube id is exactly 11 characters; anything else is a Cloudinary image id.
    const isVideo = type === "video" || (type !== "image" && /^[\w-]{11}$/.test(mediaId));
    const id = Number(cell(idx.id));
    stories.push({
      key: mediaId,
      name,
      description: cell(idx.description),
      visa: cell(idx.visa) || source.defaultVisa,
      location: cell(idx.location),
      initials: cell(idx.initials) || initialsOf(name),
      priority: /^true$/i.test(cell(idx.priority)),
      tag: cell(idx.tag),
      category: source.category,
      media: { kind: isVideo ? "video" : "image", id: mediaId },
      order: Number.isFinite(id) && id > 0 ? id : rowIndex + 1,
    });
  });
  return stories;
}

/** One list: duplicates removed (same media), featured first, then sheets interleaved. */
export function mergeStories(lists: Story[][]): Story[] {
  const seen = new Set<string>();
  const merged: Story[] = [];
  const longest = Math.max(0, ...lists.map((l) => l.length));
  // Interleave the sheets so the first screen mixes study and tourist stories.
  for (let i = 0; i < longest; i++) {
    for (const list of lists) {
      const s = list[i];
      if (s && !seen.has(s.key)) {
        seen.add(s.key);
        merged.push(s);
      }
    }
  }
  return merged.sort((a, b) => Number(b.priority) - Number(a.priority));
}

export const sheetUrl = (sheetId: string) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

/** Fetches all sheets in parallel. A sheet that fails is skipped; all failing throws. */
export async function loadStories(init?: RequestInit): Promise<Story[]> {
  const results = await Promise.allSettled(
    STORY_SOURCES.map(async (source) => {
      const res = await fetch(sheetUrl(source.sheetId), init);
      if (!res.ok) throw new Error(`Sheet ${source.sheetId} responded ${res.status}`);
      return parseSheet(await res.text(), source);
    }),
  );
  const ok = results.filter((r): r is PromiseFulfilledResult<Story[]> => r.status === "fulfilled");
  if (!ok.length) throw new Error("No story sheet could be loaded");
  return mergeStories(ok.map((r) => r.value));
}

/* ---------- media URLs (sized, so phones never download big files) ---------- */

export function imageSrc(id: string, width: number, ratio = "4:5") {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto,c_fill,g_north,ar_${ratio},w_${width}/${id}`;
}
export function imageSrcSet(id: string, ratio = "4:5") {
  return [360, 540, 720, 960].map((w) => `${imageSrc(id, w, ratio)} ${w}w`).join(", ");
}
export function fullImageSrc(id: string) {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/f_auto,q_auto,w_1200/${id}`;
}
export const videoThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const videoEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;