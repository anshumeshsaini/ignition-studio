import { Reveal, SplitLines } from "../Reveal";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";

export function AboutBlock() {
  return (
    <section className="edge py-[14vh]">
      <p className="eyebrow text-muted-foreground">(WHO WE ARE)</p>
      <SplitLines
        text={"WE ARE STRATEGISTS,\nDESIGNERS, DEVELOPERS,\nMEDIA BUYERS AND\nSTORYTELLERS."}
        className="display mt-6 fluid-lg leading-[0.85] tracking-[-0.045em]"
      />

      <div className="mt-[8vh] grid items-start gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5 md:pt-[12vh]">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={studio1}
              alt="Studio team working through a campaign"
              loading="lazy"
              className="size-full object-cover grayscale"
            />
          </div>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.1}>
          <p className="text-lg leading-relaxed text-foreground/80">
            One team, no handoffs. Strategy sits next to the edit bay, and the media buyer sees
            the cut before it ships. That is the whole advantage.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            We turn attention into business — not impressions, not applause. If a thing cannot be
            measured or remembered, we do not make it.
          </p>
          <ul className="mt-8 space-y-2 border-t border-border pt-6">
            {["Independent", "Senior-only team", "Built for compounding", "Opinionated on purpose"].map(
              (t) => (
                <li key={t} className="eyebrow text-foreground/70">
                  — {t}
                </li>
              ),
            )}
          </ul>
        </Reveal>

        <Reveal className="md:col-span-3 md:pt-[26vh]" delay={0.15}>
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={studio2}
              alt="Cinema lens close-up"
              loading="lazy"
              className="size-full object-cover grayscale"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
