import React, { useEffect, useRef } from "react";

export default function HeroCurtain({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (reduce) return el.style.setProperty("--hp", 1);
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      const q = Math.min(1, p / 0.72);
      el.style.setProperty("--hp", q * q * (3 - 2 * q));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="hero" ref={ref}>
      <div className="stk">
        <div className="hc w">{children}</div>
        <div className="cur cl" />
        <div className="cur cr" />
        <div className="val" aria-hidden="true">❀ ✦ ❀ ✦ ❀</div>
        <div className="hint" aria-hidden="true">
          <div className="dev">॥ श्री गणेशाय नमः ॥</div>
          <span>Scroll to open the curtains</span>
          <i>⌄</i>
        </div>
      </div>
    </section>
  );
}