import { Closing } from "@/components/home/Closing";
import { CrowdBoard } from "@/components/home/crowd/CrowdBoard";
import { ForTwo } from "@/components/home/fortwo/ForTwo";
import { Hero } from "@/components/home/Hero";
import { MeetPip } from "@/components/home/meet/MeetPip";
import { MenuBoard } from "@/components/home/menu/MenuBoard";
import { ShopPreview } from "@/components/home/ShopPreview";
import { StoryScroll } from "@/components/home/story/StoryScroll";
import { TableNotes } from "@/components/home/TableNotes";
import { Values } from "@/components/home/Values";
import { Section, SectionHead } from "@/components/ui/Section";
import { buildBoards } from "@/lib/crowd";
import { site } from "@/lib/site";

/** Narrative order: intrigue → interact → play → understand → trust → believe → shop → act. */
export default function Home() {
  return (
    <>
      <Hero />
      <StoryScroll />

      <Section tone="cream" aria-labelledby="menu-title">
        <SectionHead
          id="menu-title"
          hand="pick a mood, any mood"
          title={
            <>
              Tonight&apos;s menu, <em>by mood</em>
            </>
          }
        />
        <MenuBoard />
      </Section>

      <Section tone="light" aria-labelledby="crowd-title">
        <SectionHead
          id="crowd-title"
          hand="fresh this week"
          title={
            <>
              What couples are <em>actually</em> eating
            </>
          }
          note={
            <>
              <p>Forest gets more useful with every meal couples log. These are the signals worth knowing right now.</p>
              {site.previewData && <p>Figures shown are from Forest&apos;s preview dataset while we&apos;re in beta.</p>}
            </>
          }
        />
        <CrowdBoard boards={buildBoards()} />
        <TableNotes />
      </Section>

      <Section tone="paper" aria-labelledby="two-title">
        <SectionHead
          id="two-title"
          wide
          hand="the whole point"
          title={
            <>
              Most food apps help one person find a restaurant. Forest helps <em>two people</em> agree on an evening.
            </>
          }
        />
        <ForTwo />
      </Section>

      <Section aria-label="Meet Pip">
        <MeetPip />
      </Section>

      <Section tone="cream" aria-labelledby="values-title">
        <Values />
      </Section>

      <ShopPreview />
      <Closing />
    </>
  );
}
