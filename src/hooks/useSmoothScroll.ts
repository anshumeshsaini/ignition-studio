import { useEffect } from "react";
import Lenis from "lenis";
import { initGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling wired into the GSAP ticker + ScrollTrigger.
 * Also publishes scroll velocity + direction so sections can react to it:
 *   --scroll-velocity  (clamped -1..1)
 *   --scroll-skew      (deg, for velocity-skew elements)
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = initGsap();

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: false,
    });

    const root = document.documentElement;
    let current = 0;

    lenis.on("scroll", ({ velocity, direction }: { velocity: number; direction: number }) => {
      ScrollTrigger.update();
      const clamped = Math.max(-1, Math.min(1, velocity / 45));
      current += (clamped - current) * 0.2;
      root.style.setProperty("--scroll-velocity", current.toFixed(4));
      root.style.setProperty("--scroll-skew", `${(current * 3.2).toFixed(3)}deg`);
      root.dataset.scrollDir = direction > 0 ? "down" : "up";
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // let hash links + programmatic scrolls go through Lenis
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
      root.style.removeProperty("--scroll-velocity");
      root.style.removeProperty("--scroll-skew");
    };
  }, []);
}
