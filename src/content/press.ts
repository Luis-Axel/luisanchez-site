export type PressItem = {
  outlet: string;
  /** Headline / title of the piece */
  title: string;
  /** ISO-ish date string for display (e.g. "May 2023") */
  date: string;
  /** Short blurb in Lui's voice describing what the piece is about. */
  blurb: string;
  /** Direct link to the source. */
  url: string;
  /** Optional screenshot/photo from /public/press to display alongside. */
  image?: string;
  /** Optional accent tag (e.g. "Recognition", "Press", "Talk"). */
  tag?: "Recognition" | "Press" | "Talk";
};

export const PRESS: PressItem[] = [
  {
    outlet: "Bergen Community College",
    title: "Spotlight: Luis Sanchez",
    date: "May 2023",
    blurb:
      "Profile piece on my path from Bergen → Rutgers, leading PTK at Bergen (Distinguished Leadership Award + Distinguished Chapter Officer, one of 30 in the world), publishing the largest statistical analysis on ASMR's effects on the brain, and entering USCS's Leadership Development Program.",
    url: "https://bergen.edu/posts/spotlight/luis-sanchez/",
    tag: "Recognition",
  },
  {
    outlet: "United States Cold Storage — The Shield, Q2 2024",
    title: "SmartMove platform a “game changer” for LTL load planning",
    date: "Sep 2024",
    blurb:
      "USCS's company newsletter wrote up SmartMove — the route-optimization platform I helped build — and credited the breakthrough to soliciting direct input from load planners.",
    url: "https://www.linkedin.com/posts/united-states-cold-storage-inc-_bestincold-bestinpeople-bestinlogistics-activity-7241601204802179072-6dev/",
    image: "/press/smartmove.png",
    tag: "Press",
  },
  {
    outlet: "USCS — National Carrier Conference",
    title: "Educating carriers on SmartMove",
    date: "Oct 2024",
    blurb:
      "Presented SmartMove — our route optimization platform combining traditional methods with ML to plan ColdShare Consolidation trucks — to USCS's national carrier partners.",
    url: "https://www.instagram.com/p/DA9d9RTRA3c/",
    image: "/press/speech.png",
    tag: "Talk",
  },
];
