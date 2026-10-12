/*
  NTV Socials — portfolio content
  ---------------------------------
  This is the only file you need to edit to add work to the portfolio.
  Both the homepage ("Featured work") and portfolio.html read from it.

  To add an event:
    1. Make a folder: images/events/<event-slug>/ and drop the photos in it.
    2. Copy the TEMPLATE block at the bottom of this file into NTV_EVENTS.
    3. Fill in the fields. Newest events can go anywhere; the page sorts by date.

  Fields
    slug       Unique id, lowercase-with-dashes. Used in the link: portfolio.html#<slug>
    title      Event name
    client     Who it was for (optional)
    category   "bts" | "corporate" | "guest"  (see NTV_CATEGORIES)
    date       "YYYY-MM-DD"  (optional; used for sorting and display)
    location   City / venue (optional)
    featured   true to show it on the homepage (up to 3 are shown)
    cover      Path to the card image
    coverPosition  Optional focal point for the crop, e.g. "62% center" (default "center")
    summary    1–3 sentences about the event and what was created
    deliverables  List of what was produced, e.g. ["Reels", "Live stories", "Recap carousel"]
    media      Photos and videos in the gallery:
                 { type: "image", src: "...", alt: "..." }
                 { type: "video", src: "....mp4", poster: "....jpg", alt: "..." }
    links      Posts on social, shown as buttons:
                 { label: "Watch the recap reel", url: "https://www.instagram.com/reel/..." }
*/

window.NTV_CATEGORIES = [
  {
    key: "bts",
    label: "Behind the Scenes",
    title: "Behind the Scenes Content",
    kinds: "",
    desc: "We capture behind-the-scenes moments through short-form photo and video content, focusing on the process, people, and details behind events and productions. From setup through final moments, this content provides a genuine look that adds depth, personality, and shareable value to your brand."
  },
  {
    key: "corporate",
    label: "Corporate Events",
    title: "Corporate Event Content",
    kinds: "Summits · Symposiums · Conferences",
    desc: "Social media content creation highlighting the before, during, and after of your corporate events to build anticipation and extend audience reach. From pre-event teasers and key highlights to live coverage and post-event recaps, we help showcase your brand and keep your audience engaged at every stage."
  },
  {
    key: "guest",
    label: "Guest Experiences",
    title: "Guest Experience Content",
    kinds: "Pop-Ups · Sporting Events · City Gatherings",
    desc: "Capturing the energy and atmosphere of guest experiences including pop ups, sporting events, and city gatherings. We highlight authentic moments, audience interaction, and the overall experience through intentional content."
  }
];

window.NTV_EVENTS = [
  {
    slug: "event-coverage-2026",
    title: "Event Coverage",
    category: "guest",
    date: "2026-02-04",
    featured: false,
    cover: "images/events/event-coverage-2026/event-coverage-2-poster.jpg",
    summary: "On-the-ground video coverage capturing the energy and atmosphere of live guest experiences.",
    deliverables: ["Short-form video", "Event coverage"],
    media: [
      { type: "video", src: "images/events/event-coverage-2026/event-coverage-2.mp4", poster: "images/events/event-coverage-2026/event-coverage-2-poster.jpg", alt: "Event coverage clip 1" },
      { type: "video", src: "images/events/event-coverage-2026/event-coverage-3.mp4", poster: "images/events/event-coverage-2026/event-coverage-3-poster.jpg", alt: "Event coverage clip 2" }
    ],
    links: []
  },
  {
    slug: "bts-content-2026",
    title: "Behind the Scenes",
    category: "bts",
    date: "2026-02-04",
    featured: false,
    cover: "images/events/bts-content-2026/bts-clip-1-poster.jpg",
    summary: "Behind-the-scenes footage capturing the candid moments and creative process behind the content.",
    deliverables: ["Behind-the-scenes content", "Short-form video"],
    media: [
      { type: "video", src: "images/events/bts-content-2026/bts-clip-1.mp4", poster: "images/events/bts-content-2026/bts-clip-1-poster.jpg", alt: "Behind the scenes clip 1" },
      { type: "video", src: "images/events/bts-content-2026/bts-clip-2.mp4", poster: "images/events/bts-content-2026/bts-clip-2-poster.jpg", alt: "Behind the scenes clip 2" }
    ],
    links: []
  },
  {
    slug: "thanksgiving-campaign",
    title: "Thanksgiving Campaign",
    category: "bts",
    date: "2026-02-04",
    featured: false,
    cover: "images/events/thanksgiving-campaign/thanksgiving-campaign-poster.jpg",
    summary: "Behind-the-scenes content captured during the Thanksgiving campaign, showing the process and energy behind the production.",
    deliverables: ["Short-form video", "Behind-the-scenes content"],
    media: [
      { type: "video", src: "images/events/thanksgiving-campaign/thanksgiving-campaign.mp4", poster: "images/events/thanksgiving-campaign/thanksgiving-campaign-poster.jpg", alt: "Thanksgiving campaign video" },
      { type: "video", src: "images/events/thanksgiving-campaign/campaign-bts.mp4", poster: "images/events/thanksgiving-campaign/campaign-bts-poster.jpg", alt: "Campaign behind the scenes" }
    ],
    links: []
  },
  {
    slug: "invest-in-you-2026",
    title: "Invest in You 2026",
    client: "D Magazine Partners",
    category: "corporate",
    date: "2026-05-07",          // TODO: confirm with Nikhael (taken from the photo file names)
    location: "Dallas, TX",      // TODO: confirm
    featured: true,
    cover: "images/events/invest-in-you-2026/event-coverage-1-poster.jpg",
    summary: "Live social coverage of the Invest in You panel series, capturing the conversation on stage and the audience experience in the room.", // TODO: replace with Nikhael's own description
    deliverables: ["Live coverage", "Behind-the-scenes content", "Short-form video"], // TODO: confirm
    media: [
      { type: "video", src: "images/events/invest-in-you-2026/event-coverage-1.mp4", poster: "images/events/invest-in-you-2026/event-coverage-1-poster.jpg", alt: "Event coverage clip 1" },
      { type: "video", src: "images/events/invest-in-you-2026/event-coverage-4.mp4", poster: "images/events/invest-in-you-2026/event-coverage-4-poster.jpg", alt: "Event coverage clip 2" }
    ],
    links: []
  }

  /* ---- TEMPLATE: copy everything between the braces, paste above, and add a comma after the previous event ----
  ,{
    slug: "event-name-2026",
    title: "Event Name",
    client: "Client Name",
    category: "guest",
    date: "2026-01-31",
    location: "City, ST",
    featured: false,
    cover: "images/events/event-name-2026/01.jpg",
    summary: "What the event was and what NTV Socials created for it.",
    deliverables: ["Reels", "Stories", "Recap carousel"],
    media: [
      { type: "image", src: "images/events/event-name-2026/01.jpg", alt: "Describe the photo" },
      { type: "video", src: "images/events/event-name-2026/recap.mp4", poster: "images/events/event-name-2026/01.jpg", alt: "Recap reel" }
    ],
    links: [
      { label: "Watch on Instagram", url: "https://www.instagram.com/ntv.socials" }
    ]
  }
  ---------------------------------------------------------------------------------------------------- */
];
