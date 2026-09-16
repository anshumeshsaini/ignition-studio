import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SplitLines } from "../Reveal";
import { projects } from "@/lib/data/work";
import studio1 from "@/assets/studio-1.jpg";
import studio2 from "@/assets/studio-2.jpg";
import hero from "@/assets/hero.jpg";

const imgs = [hero, studio1, studio2, studio1];

export function WorkPreview() {
  return (
    <section className="edge py-[14vh]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitLines
          text={"WORK THAT MOVED\nTHE NEEDLE."}
          className="display fluid-lg leading-[0.86] tracking-[-0.045em]"
        />
        <Link to="/work" data-cursor="cta" className="eyebrow link-underline text-acid">
          ALL WORK ↗
        </Link>
      </div>

      <ul className="mt-[8vh] space-y-[10vh]">
        {projects.map((p, i) => (
          <li key={p.slug} className={i % 2 ? "md:pl-[22%]" : "md:pr-[22%]"}>
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              data-cursor="view"
              className="group block"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={imgs[i % imgs.length]}
                  alt={`${p.name} — ${p.industry} case study preview`}
                  loading="lazy"
                  className="size-full object-cover grayscale transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="display text-4xl leading-none tracking-[-0.04em] md:text-6xl">
                    {p.name}
                    <span className="text-acid">.</span>
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">{p.summary}</p>
                </div>
                <div className="text-right">
                  <p className="eyebrow text-muted-foreground">
                    {p.industry} — {p.year}
                  </p>
                  <p className="eyebrow mt-2 text-foreground/60">{p.services.join(" / ")}</p>
                  <ArrowUpRight className="ml-auto mt-3 size-5 text-acid" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
