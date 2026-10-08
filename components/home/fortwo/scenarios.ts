import type { MoodId } from "@/lib/data/moods";

/** Everyday standoffs. Each plays out, then Pip answers with a live match. */
export type Scenario = {
  readonly id: string;
  readonly title: string;
  readonly a: MoodId;
  readonly b: MoodId;
  readonly sayA: string;
  readonly sayB: string;
};

export const SCENARIOS: readonly Scenario[] = [
  {
    id: "brave",
    title: "One of you wants something new. One of you wants something safe.",
    a: "curious",
    b: "cozy",
    sayA: "Can we try somewhere different?",
    sayB: "Fine, but I want something warm.",
  },
  {
    id: "late",
    title: "It's 9pm on a Tuesday and you're both starving.",
    a: "quick",
    b: "cozy",
    sayA: "I need food in the next twenty minutes.",
    sayB: "Something comforting. Nothing complicated.",
  },
  {
    id: "heat",
    title: "One of you likes it hot. One of you really doesn't.",
    a: "fiery",
    b: "light",
    sayA: "I want proper heat tonight.",
    sayB: "I want to feel good after, not on fire.",
  },
  {
    id: "occasion",
    title: "It's your anniversary and you've already done the usual place.",
    a: "indulgent",
    b: "curious",
    sayA: "Let's go all out.",
    sayB: "Somewhere we've never been.",
  },
];
