// Scroll timeline in "units". One unit is one step of scrolling (UNIT_SVH of the screen height).
// Everything is derived from the number of countries, so adding a country just adds one unit.

export const UNIT_SVH = 85;

export const PHASE = {
  zoom: 1, // hero text fades out, circle + passport grow 1.5x into the centre
  open: 1, // passport moves left and opens, countries text comes in
  perCountry: 1, // one stamp per unit
  close: 1.2, // passport closes, shrinks onto the first step
  steps: 1.4, // route draws through the four steps
  hold: 0.3, // short rest at the end before the page continues
} as const;

export function timelineFor(countryCount: number) {
  const zoomAt = 0;
  const openAt = zoomAt + PHASE.zoom;
  const countriesAt = openAt + PHASE.open;
  const closeAt = countriesAt + countryCount * PHASE.perCountry;
  const stepsAt = closeAt + PHASE.close;
  const total = stepsAt + PHASE.steps + PHASE.hold;
  return { zoomAt, openAt, countriesAt, closeAt, stepsAt, total };
}

/** Height of the scroll container, in svh. */
export function storyHeightSvh(countryCount: number) {
  return Math.round(timelineFor(countryCount).total * UNIT_SVH + 100);
}