export type Testimonial = {
  /** Person quoting Lui */
  name: string;
  /** Role/affiliation when the quote was made */
  context: string;
  /** Short relationship descriptor used in section heading (e.g. "Mentee", "Peer") */
  relationship: string;
  /** Pull-quote text. Keep verbatim from the source where possible. */
  quote: string;
  /** Path under /public/press to a screenshot of the original (optional but recommended). */
  screenshot?: string;
  /** Link back to the original source. */
  sourceUrl?: string;
  /** Label for the source link (e.g. "View on LinkedIn"). */
  sourceLabel?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chris McGinley",
    context: "Logistics Co-op, United States Cold Storage",
    relationship: "Mentee",
    quote:
      "I am grateful for the opportunity to have been mentored by Luis Sanchez. His guidance and the way he invested in my development shaped how I approach problems and grow on the job.",
    screenshot: "/press/coop-thanks.png",
    sourceUrl:
      "https://www.linkedin.com/posts/chrismcginly_i-am-grateful-for-the-opportunity-to-have-ugcPost-7211080013817724929-LN_x",
    sourceLabel: "View on LinkedIn",
  },
  {
    // TODO: Lui — fill in the actual student's name + quote text from the screenshot
    name: "[TODO: student's name]",
    context: "Student at Bergen Community College, posted on LinkedIn",
    relationship: "Student",
    quote:
      "[TODO: paste the actual recommendation text from public/press/linkedin-review-from-college.png. Keeping the screenshot live until then.]",
    screenshot: "/press/linkedin-review-from-college.png",
  },
];
