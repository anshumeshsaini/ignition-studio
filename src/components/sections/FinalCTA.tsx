import { Link } from "@tanstack/react-router";
import { Magnetic } from "../Magnetic";
import { SplitLines } from "../Reveal";
import { useGsapContext } from "@/hooks/useGsapContext";
import { site, whatsappLink } from "@/lib/site";

export function FinalCTA() {
  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    gsap.to(root.querySelector("[data-glow]"), {
      yPercent: -20,
      scale: 1.2,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, []);

  const contacts = [
    { label: "WHATSAPP", href: whatsappLink() },
    { label: "EMAIL", href: `mailto:${site.email}` },
    ...site.socials.map((s) => ({ label: s.label, href: s.href })),
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border py-[16vh]">
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-acid/10 blur-[120px]"
      />
      <div className="edge">
        <SplitLines
          text={"LET'S MAKE\nSOMETHING\nUNIGNORABLE."}
          className="display fluid-xl leading-[0.82] tracking-[-0.05em]"
        />

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Magnetic>
            <Link
              to="/contact"
              data-cursor="cta"
              className="eyebrow inline-flex items-center gap-2 bg-acid px-8 py-4 text-acid-foreground transition-colors hover:bg-foreground"
            >
              START A PROJECT ↗
            </Link>
          </Magnetic>
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="cta"
              className="eyebrow link-underline text-foreground/70 hover:text-acid"
            >
              {c.label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
