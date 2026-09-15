import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Magnetic } from "../Magnetic";
import { useGsapContext } from "@/hooks/useGsapContext";
import { site } from "@/lib/site";

const LINES = ["WE MAKE", "BRANDS", "IMPOSSIBLE", "TO IGNORE."];

export function Hero() {
  const bg = useRef<HTMLDivElement>(null);

  const ref = useGsapContext<HTMLElement>(({ gsap, root }) => {
    const tl = gsap.timeline({ delay: 1.15 });
    tl.from(root.querySelectorAll("[data-hero-line]"), {
      yPercent: 120,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
    })
      .from(
        root.querySelectorAll("[data-hero-meta]"),
        { opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: "power2.out" },
        "-=0.7",
      )
      .from(root.querySelector("[data-hero-media]"), { scale: 1.18, duration: 2, ease: "power3.out" }, 0);

    gsap.to(root.querySelector("[data-hero-media]"), {
      yPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(root.querySelector("[data-hero-copy]"), {
      yPercent: -14,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });
  }, []);

  // mouse-responsive drift on the background
  useEffect(() => {
    const el = bg.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.06)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10">
      <div data-hero-media className="absolute inset-0 -z-10">
        <div ref={bg} className="absolute inset-0 transition-transform duration-[900ms] ease-out">
          <img
            src={heroImg}
            alt=""
            width={1920}
            height={1200}
            fetchPriority="high"
            className="size-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
      </div>

      <div className="edge">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
          <p data-hero-meta className="eyebrow text-acid">
            PERFORMANCE / CREATIVE / DIGITAL
          </p>
          <p data-hero-meta className="eyebrow text-foreground/60">
            {site.locations.join(" / ")}
          </p>
        </div>

        <h1 data-hero-copy className="display fluid-xl">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span data-hero-line className={`block ${i === 2 ? "text-acid" : ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-wrap items-center gap-4 md:gap-8">
          <Magnetic strength={0.4}>
            <Link
              to="/contact"
              data-cursor="cta"
              className="eyebrow inline-flex items-center gap-2 bg-acid px-8 py-4 text-acid-foreground transition-colors hover:bg-foreground"
            >
              START A PROJECT <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </Magnetic>
          <Link
            to="/work"
            data-cursor="cta"
            className="eyebrow link-underline inline-flex items-center gap-2 text-foreground/80"
          >
            EXPLORE OUR WORK <ArrowDown className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div data-hero-meta className="mt-14 flex items-center gap-3 text-muted-foreground">
          <span className="eyebrow">SCROLL</span>
          <span className="h-px w-16 bg-border" />
          <ArrowDown className="size-3 animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
