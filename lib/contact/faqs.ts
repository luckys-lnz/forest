import type { TopicId } from "./topics";

export const faqs: { q: string; a: string; topic: TopicId }[] = [
  {
    q: "When will my Tasting Box arrive?",
    a: "Boxes ship on the first Tuesday of each month and arrive within two working days. You'll get a tracking link by email the morning it leaves us.",
    topic: "order",
  },
  {
    q: "How do I pause or cancel a monthly box?",
    a: "Reply to any order email with 'pause' or 'cancel' and we'll do it the same day. No forms, no questions. Account settings for this are coming soon.",
    topic: "order",
  },
  {
    q: "Something arrived damaged or warm.",
    a: "Send us a photo with your order number using the form below. We'll replace it or refund it, whichever you prefer.",
    topic: "order",
  },
  {
    q: "Where do Forest's recommendations come from?",
    a: "From couples logging what they ate together, whether they'd have it again, and whether they both liked it. Forest is in beta, so some figures on the site come from a preview dataset.",
    topic: "general",
  },
];
