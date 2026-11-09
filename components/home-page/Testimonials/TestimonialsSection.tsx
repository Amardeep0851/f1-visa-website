import { loadStories, type Story } from "@/lib/home-page/testimonials";
import StoriesClient from "./StoriesClient";

/**
 * Reads the three sheets once at build time, so the stories are already in the HTML
 * (fast, and visible to search engines). The browser refreshes them later, only when
 * the visitor scrolls near this section. If the sheets can't be reached during the
 * build, the section starts empty and loads them in the browser instead.
 */
export default async function TestimonialsSection() {
  let initial: Story[] = [];
  try {
    initial = await loadStories({ cache: "force-cache", signal: AbortSignal.timeout(8000) });
  } catch {
    initial = [];
  }
  return <StoriesClient initial={initial} />;
}