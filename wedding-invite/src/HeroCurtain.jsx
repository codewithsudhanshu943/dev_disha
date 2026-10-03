import React, { useEffect, useRef, useState } from "react";

export default function HeroCurtain({ children, autoOpen = false, delay = 900 }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  /* ✅ Auto-open after delay when autoOpen becomes true */
  useEffect(() => {
    if (!autoOpen) return;
    const t = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(t);
  }, [autoOpen, delay]);

  /* ✅ Animate --hp smoothly from 0 → 1 when open flips */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) {
      el.style.setProperty("--hp", open ? 1 : 0);
      return;
    }

    const duration = 1600;
    const startVal = open ? 0 : 1;
    const endVal = open ? 1 : 0;
    const startTime = performance.now();
    let raf;

    const ease = (t) => t * t * (3 - 2 * t);

    const step = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const val = startVal + (endVal - startVal) * ease(p);
      el.style.setProperty("--hp", val);
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  return (
    <section id="hero" ref={ref} data-open={open ? "1" : "0"} style={{ "--hp": 0 }}>
      <div className="stk">
        <div className="hc w">{children}</div>
        <div className="cur cl" />
        <div className="cur cr" />
        <div className="val" aria-hidden="true">❀ ✦ ॥ श्री गणेशाय नमः ॥ ✦ ❀</div>
        <div className="hint" aria-hidden="true">
          <div className="dev">Your presence will make our day truly special ❤️</div>
          <span>Welcome</span>
          <i>⌄</i>
        </div>
      </div>
    </section>
  );
}