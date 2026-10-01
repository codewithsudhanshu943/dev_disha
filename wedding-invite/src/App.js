import React, { useCallback, useEffect, useRef, useState } from "react";
import HeroCurtain from "./HeroCurtain";
import emailjs from "@emailjs/browser";

/* ============================================================
   CONFIG — edit your wedding details here
   ============================================================ */
const CFG = {
  bride: "Disha",
  groom: "Devanshu",
  date: "2026-11-20T18:00:00+05:30",
  dateText: "20 · 11 · 2026",
  quote: "Two souls, one journey — bound by love, blessed by tradition.",
  brideInfo: "Daughter of Late Mr. Hanuman & Mrs. Usha Devi. A dreamer with a heart full of poetry.",
  groomInfo: "Son of Mr. Arvind Kumar & Mrs. Pusplata. A gentle soul with a love for music.",
  bridePhoto: "/disha.jpeg",
  groomPhoto: "/dev.jpeg",
  venue: "Sharda Lawn",
  address: "Basaratpur Near Shahpur Thana , Gorakhpur, 273004",
  venueEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3586.2324066431643!2d83.38037152242676!3d26.790852877474805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399145322aa631a3%3A0x82be5de0a0fa7c6f!2sSHARDA%20LAWN!5e0!3m2!1sen!2sin!4v1790833140528!5m2!1sen!2sin",
  venueMapLink: "https://www.google.com/maps/search/?api=1&query=SHARDA+LAWN+Basaratpur+Near+Shahpur+Thana+Gorakhpur+273004",
  venueImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrN1D-P2W1BxwHWkvUACqGVZ6nfahoImBWQcy-O0Dtkod6Vf2-qzahRtYV&s=10",
  events: [
    { n: "Haldi",   i: "🌼", d: "19 Nov 2026", t: "10:00 AM", v: "From Home",          x: "Turmeric, laughter and golden blessings." },
    { n: "Mehendi", i: "🌿", d: "19 Nov 2026", t: "06:00 PM", v: "From Home",          x: "Mehandi, Intricate henna, folk songs and sweet stories." },
    { n: "Baraat",  i: "🐎", d: "20 Nov 2026", t: "6:00 PM",  v: "Sharda Lawn Mandap", x: "Pheras around the sacred fire, under the stars." },
    { n: "Wedding", i: "💍", d: "20 Nov 2026", t: "10:00 PM", v: "Sharda Lawn Mandap", x: "Pheras around the mandap, with blessings." },
  ],
  story: [
    ["First Meeting",      "14 Feb 2026",   "A rainy café, a shared umbrella, a smile that stayed."],
    ["First Conversation", "14 Feb 2026",   "Same day, back home — hours felt like minutes; we never ran out of words."],
    ["The Proposal",       "14 Feb 2026",   "Under a sky of lanterns, the same evening, she said yes."],
    ["Engagement",         "20 April 2026", "Two families, one sacred promise — rings exchanged, hearts sealed."],
    ["Our Journey",        "2026",          "Laughter, distance, growth — and a love that deepened every day."],
    ["Forever Begins",     "20 Nov 2026",   "Seven pheras, seven promises, one lifetime."],
  ],
  brideFam: [
    "Late Mr. Hanuman",
    "Mrs. Usha Devi",
    "Grandparents: Late Sh. Mohan Lal Sharma & Smt. Kamla Devi",
  ],
  groomFam: [
    "Mr. Arvind Kumar",
    "Mrs. Pusplata",
    "Grandparents: Late Dudhnath Ram & Late Smt. Shyam Dulari",
  ],
  gallery: [
    { src: "", r: 1.3 }, { src: "", r: 0.8 }, { src: "", r: 1 },
    { src: "", r: 1.5 }, { src: "", r: 0.9 }, { src: "", r: 1.2 },
  ],
  wishes: [
    ["Nani", "May your life be filled with endless love and joy."],
    ["Nana", "Two beautiful souls, one beautiful journey. Congratulations!"],
  ],
  contacts: [
    { name: "Sudhanshu", role: "Coordinator", phone: "+91 92660 64405", tel: "+919266064405" },
    { name: "Pintu",     role: "Coordinator", phone: "+91 82871 68095", tel: "+918287168095" },
    { name: "Bindu",     role: "Coordinator", phone: "+91 94158 23829", tel: "+919415823829" },
  ],
};

const EMAILJS = {
  serviceId:  "service_pv9w5qa",
  templateId: "template_6mf4qsq",
  publicKey:  "_s3fyHRoH0jE0WsTo",
  toName:     "Devanshu & Disha",
};

/* ============================================================
   HELPERS
   ============================================================ */
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
};

/* ============================================================
   MANDALA SVG
   ============================================================ */
function Mandala({ className = "", style }) {
  const shapes = [];
  for (let i = 0; i < 16; i++) {
    shapes.push(
      <path key={`p${i}`}
        d="M100 100C90 70 90 40 100 8C110 40 110 70 100 100Z"
        transform={`rotate(${i * 22.5} 100 100)`} />
    );
  }
  for (let i = 0; i < 24; i++) {
    shapes.push(
      <circle key={`c${i}`} cx="100" cy={i % 2 ? 22 : 14} r="2.2"
        transform={`rotate(${i * 15} 100 100)`} />
    );
  }
  return (
    <div className={`mandala ${className}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth=".7">
        {shapes}
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="30" />
        <circle cx="100" cy="100" r="8" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ============================================================
   INDIAN WEDDING DECORATIONS
   ============================================================ */
function Garland({ position = "top" }) {
  return <div className={`garland garland-${position}`} aria-hidden="true" />;
}

function DiyaRow() {
  return (
    <div className="diya-row" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => <div key={i} className="diya" />)}
    </div>
  );
}

function Rangoli() {
  return (
    <div className="rangoli" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="200" r="190" stroke="#e3c883" strokeOpacity="0.5" />
        <circle cx="200" cy="200" r="150" stroke="#e3c883" strokeOpacity="0.4" />
        <circle cx="200" cy="200" r="110" stroke="#e3c883" strokeOpacity="0.5" />
        <circle cx="200" cy="200" r="70"  stroke="#e3c883" strokeOpacity="0.6" />
        <circle cx="200" cy="200" r="30"  stroke="#e3c883" strokeOpacity="0.8" />
        {[...Array(24)].map((_, i) => (
          <path
            key={i}
            d="M200 200 Q200 120 200 60 Q220 110 200 200Z"
            fill="#e3c883" fillOpacity="0.35"
            transform={`rotate(${i * 15} 200 200)`}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <circle
            key={`d${i}`}
            cx="200" cy="40" r="4"
            fill="#e3c883" fillOpacity="0.8"
            transform={`rotate(${i * 30} 200 200)`}
          />
        ))}
      </svg>
    </div>
  );
}

function PaisleyBg() {
  return (
    <div className="paisley-bg" aria-hidden="true">
      <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
        {[...Array(8)].map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 100 100)`}>
            <path d="M100 100 Q85 60 100 20 Q115 60 100 100Z" fill="currentColor" fillOpacity="0.25" />
            <circle cx="100" cy="30" r="4" fill="currentColor" fillOpacity="0.6" />
          </g>
        ))}
        <circle cx="100" cy="100" r="15" fill="currentColor" fillOpacity="0.4" />
        <circle cx="100" cy="100" r="90" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

/* ============================================================
   HOOKS
   ============================================================ */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            e.target.querySelectorAll(".arch").forEach((a) => a.classList.add("in"));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".rv:not(.w), .gi").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountdown(targetISO) {
  const target = new Date(targetISO).getTime();
  const calc = () => {
    const d = target - Date.now();
    if (d <= 0) return { done: true, parts: ["00", "00", "00", "00"] };
    const parts = [d / 864e5, (d / 36e5) % 24, (d / 6e4) % 60, (d / 1e3) % 60]
      .map((x) => String(Math.floor(x)).padStart(2, "0"));
    return { done: false, parts };
  };
  const [state, setState] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setState(calc()), 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return state;
}

/* ============================================================
   LOCAL MUSIC HOOK
   ============================================================ */
function useMusic(src = "/kudmayi.mp3") {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = new Audio(src);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0.55;
    a.crossOrigin = "anonymous";
    a.load();
    audioRef.current = a;

    const onError = (e) => console.error("[music] load error:", e, "src =", a.src);
    a.addEventListener("error", onError);

    return () => {
      a.removeEventListener("error", onError);
      a.pause();
      audioRef.current = null;
    };
  }, [src]);

  const start = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    const doPlay = () => {
      a.volume = 0;
      const p = a.play();
      if (p && p.then) {
        p.then(() => setOn(true)).catch((err) => {
          console.error("[music] play blocked ❌", err.name);
        });
      } else setOn(true);
      const target = 0.55, steps = 30;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        if (!audioRef.current) return clearInterval(iv);
        audioRef.current.volume = Math.min(target, (target * i) / steps);
        if (i >= steps) clearInterval(iv);
      }, 50);
    };
    if (a.readyState >= 3) doPlay();
    else {
      const onReady = () => { a.removeEventListener("canplay", onReady); doPlay(); };
      a.addEventListener("canplay", onReady);
      a.load();
    }
  }, []);

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setOn(true)).catch(() => {});
    else { a.pause(); setOn(false); }
  }, []);

  const vis = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (document.hidden) a.pause();
    else if (on) a.play().catch(() => {});
  }, [on]);

  return { on, start, toggle, vis };
}

/* ============================================================
   SCRATCH CARD
   ============================================================ */
function ScratchCard({ address, mapUrl, venue, venueEmbed, onBurst }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const stateRef = useRef({ down: false, n: 0, done: false, w: 0 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const cv = canvasRef.current;
    const bx = wrapperRef.current;
    if (!cv || !bx) return;
    const x = cv.getContext("2d");
    const dp = Math.min(window.devicePixelRatio || 1, 2);
    const s = stateRef.current;

    const foil = () => {
      const w = bx.offsetWidth;
      const h = bx.offsetHeight;
      s.w = w;
      cv.width = w * dp;
      cv.height = h * dp;
      x.setTransform(dp, 0, 0, dp, 0, 0);
      x.globalCompositeOperation = "source-over";
      const g = x.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#c99a45");
      g.addColorStop(0.35, "#f3dca2");
      g.addColorStop(0.6, "#b98d3c");
      g.addColorStop(1, "#e3c883");
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
      for (let i = 0; i < 140; i++) {
        x.fillStyle = `rgba(255,255,255,${Math.random() * 0.35})`;
        x.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 2, 1 + Math.random() * 2);
      }
      x.strokeStyle = "rgba(107,21,37,.45)";
      x.strokeRect(10, 10, w - 20, h - 20);
      x.fillStyle = "#5a1421";
      x.textAlign = "center";
      x.font = `italic 600 ${Math.min(26, w / 14)}px Cormorant Garamond,Georgia,serif`;
      x.fillText("✦ Scratch here ✦", w / 2, h / 2 - 8);
      x.font = `400 ${Math.min(16, w / 24)}px Cormorant Garamond,Georgia,serif`;
      x.fillText("to reveal your location", w / 2, h / 2 + 20);
    };

    const pct = () => {
      const d = x.getImageData(0, 0, cv.width, cv.height).data;
      let t = 0, c = 0;
      for (let i = 3; i < d.length; i += 64) { c++; if (!d[i]) t++; }
      return t / c;
    };

    const reveal = () => {
      if (s.done) return;
      s.done = true;
      setRevealed(true);
      onBurst && onBurst(14);
    };

    const scratch = (e) => {
      const r = cv.getBoundingClientRect();
      x.globalCompositeOperation = "destination-out";
      x.beginPath();
      x.arc(e.clientX - r.left, e.clientY - r.top, Math.max(22, s.w / 14), 0, 6.3);
      x.fill();
      if (++s.n % 8 === 0 && pct() > 0.4) reveal();
    };

    const onDown = (e) => { s.down = true; cv.setPointerCapture(e.pointerId); scratch(e); };
    const onMove = (e) => { if (s.down) scratch(e); };
    const onUp = () => { s.down = false; if (pct() > 0.4) reveal(); };
    const onCancel = () => { s.down = false; };

    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onCancel);

    foil();

    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (!s.done && !s.n) foil(); }, 200);
    };
    window.addEventListener("resize", onResize);

    if (document.fonts) document.fonts.ready.then(() => { if (!s.done && !s.n) foil(); });

    return () => {
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onCancel);
      window.removeEventListener("resize", onResize);
    };
  }, [onBurst]);

  return (
    <div className="bd sc" ref={wrapperRef}>
      <div id="lk" inert={revealed ? "" : undefined}>
        <h3>{venue}</h3>
        <a className="ad" href={mapUrl} target="_blank" rel="noopener">{address}</a>

        {venueEmbed && (
          <div className="map-embed" style={{ margin: "18px auto 22px", maxWidth: 520 }}>
            <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
              <iframe
                title={`Map to ${venue}`}
                src={venueEmbed}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  borderRadius: 12,
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        )}

        <a className="btn" href={mapUrl} target="_blank" rel="noopener">📍 View Location</a>
      </div>

      <canvas
        id="scv"
        ref={canvasRef}
        className={revealed ? "gone" : ""}
        aria-hidden="true"
        style={revealed ? { opacity: 0, pointerEvents: "none" } : undefined}
      />

      {!revealed && (
        <button id="skip" type="button" onClick={() => setRevealed(true)}>
          or tap to reveal
        </button>
      )}
    </div>
  );
}

/* ============================================================
   PARTICLES CANVAS
   ============================================================ */
function useParticles(burstRef) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const c = cv.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const small = window.innerWidth < 700;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let Wd, Ht, P = [];
    let px = -999, py = -999, run = false, raf;

    const rs = () => {
      Wd = window.innerWidth; Ht = window.innerHeight;
      cv.width = Wd * dpr; cv.height = Ht * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    rs();

    const mk = (t, init) => ({
      t,
      x: Math.random() * Wd,
      y: init ? Math.random() * Ht : Ht + 40,
      s: t === "h" ? 8 + Math.random() * (small ? 16 : 26)
        : t === "p" ? 5 + Math.random() * 5 : 1 + Math.random() * 2,
      v: (t === "d" ? 0.15 : 0.25) + Math.random() * 0.5,
      ph: Math.random() * 6.28,
      a: 0.25 + Math.random() * 0.4,
      g: Math.random() < 0.5,
      rot: Math.random() * 6,
      life: 0,
    });

    const N = small ? { h: 9, p: 5, d: 16 } : { h: 18, p: 9, d: 30 };
    Object.entries(N).forEach(([t, n]) => {
      for (let i = 0; i < n; i++) P.push(mk(t, true));
    });

    const heart = (x, y, s) => {
      c.beginPath();
      c.moveTo(x, y + s * 0.4);
      c.bezierCurveTo(x - s * 1.1, y - s * 0.2, x - s * 0.6, y - s, x, y - s * 0.4);
      c.bezierCurveTo(x + s * 0.6, y - s, x + s * 1.1, y - s * 0.2, x, y + s * 0.4);
      c.closePath();
    };

    const draw = (p) => {
      const al = p.a * Math.min(1, p.life / 60) * Math.min(1, p.y / (Ht * 0.25));
      c.globalAlpha = Math.max(0, al);
      if (p.t === "h") {
        heart(p.x, p.y, p.s);
        const g = c.createRadialGradient(p.x - p.s * 0.3, p.y - p.s * 0.4, 1, p.x, p.y, p.s * 1.2);
        if (p.g) {
          g.addColorStop(0, "rgba(255,255,255,.7)");
          g.addColorStop(1, "rgba(201,112,127,.12)");
          c.fillStyle = g; c.fill();
          c.strokeStyle = "rgba(255,255,255,.65)"; c.lineWidth = 1; c.stroke();
        } else {
          g.addColorStop(0, "rgba(255,214,150,.95)");
          g.addColorStop(1, "rgba(201,112,127,0)");
          c.fillStyle = g;
          heart(p.x, p.y, p.s * 1.5);
          c.fill();
        }
      } else if (p.t === "p") {
        c.save(); c.translate(p.x, p.y); c.rotate(p.rot);
        c.fillStyle = "#e8a3ae";
        c.beginPath(); c.ellipse(0, 0, p.s, p.s * 0.5, 0, 0, 6.28); c.fill();
        c.restore();
      } else {
        c.fillStyle = "#e3c883";
        c.beginPath(); c.arc(p.x, p.y, p.s, 0, 6.28); c.fill();
      }
    };

    const loop = () => {
      if (!run) return;
      c.clearRect(0, 0, Wd, Ht);
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        p.y -= p.v * (p.t === "p" ? -0.6 : 1);
        p.ph += 0.01;
        p.x += Math.sin(p.ph) * (p.t === "h" ? 0.5 : 0.6);
        p.rot += 0.01; p.life++;
        const dx = p.x - px, dy = p.y - py, d = dx * dx + dy * dy;
        if (d < 9000) { p.x += dx * 0.01; p.y += dy * 0.01; }
        if ((p.t === "p" && p.y > Ht + 30) || p.y < -40 || p.y > Ht + 60) {
          P[i] = mk(p.t, false);
          if (p.t === "p") P[i].y = -20;
        }
        draw(p);
      }
      c.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };

    const burst = (n) => {
      if (reduce) return;
      for (let i = 0; i < n; i++) {
        const p = mk("h", false);
        p.x = Wd / 2 + (Math.random() - 0.5) * Wd * 0.6;
        p.y = Ht * (0.6 + Math.random() * 0.4);
        p.v = 1 + Math.random() * 1.4; p.a = 0.6;
        P.push(p);
      }
      setTimeout(() => P.length > 80 && P.splice(N.h + N.p + N.d, P.length), 9000);
    };

    if (burstRef) burstRef.current = burst;

    if (!reduce) { run = true; raf = requestAnimationFrame(loop); }

    const onMove = (e) => {
      px = e.clientX; py = e.clientY;
      document.documentElement.style.setProperty("--mx", e.clientX / window.innerWidth - 0.5);
      document.documentElement.style.setProperty("--my", e.clientY / window.innerHeight - 0.5);
    };
    const onVis = () => {
      const v = !document.hidden && !reduce;
      if (v && !run) { run = true; raf = requestAnimationFrame(loop); }
      else if (!v) run = false;
    };
    const onResize = () => rs();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      run = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [burstRef]);

  return canvasRef;
}

/* ============================================================
   SECTION WRAPPER
   ============================================================ */
function Section({ id, className = "", children }) {
  return (
    <section id={id} className={className}>
      <div className="w">{children}</div>
    </section>
  );
}

/* ============================================================
   GANESH JI IMAGE
   ============================================================ */
function GaneshSymbol({ className = "", style }) {
  return (
    <div className={`ganesh-symbol ${className}`} style={style} aria-hidden="true">
      <img src="/ganesh.png" alt="" />
    </div>
  );
}

/* ============================================================
   GALLERY TILE
   ============================================================ */
function GalleryTile({ i, h }) {
  const palette = [
    ["#e7b9bd", "#8a1f33"],
    ["#f3dca2", "#b98d3c"],
    ["#c9707f", "#4c0d1a"],
    ["#f6d8a8", "#6b1525"],
  ];
  const [c1, c2] = palette[i % palette.length];
  return (
    <svg
      viewBox={`0 0 300 ${h}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      <defs>
        <linearGradient id={`g${i}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`r${i}`} cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#fff8e7" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff8e7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height={h} fill={`url(#g${i})`} />
      <rect width="300" height={h} fill={`url(#r${i})`} />
      <g fill="none" stroke="#f6e9d2" strokeOpacity="0.55" strokeWidth="1">
        <circle cx="150" cy={h / 2} r="30" />
        <circle cx="150" cy={h / 2} r="55" />
        <circle cx="150" cy={h / 2} r="80" />
        {[...Array(16)].map((_, k) => (
          <line
            key={k}
            x1="150" y1={h / 2 - 90}
            x2="150" y2={h / 2 - 70}
            transform={`rotate(${k * 22.5} 150 ${h / 2})`}
            stroke="#f6e9d2" strokeOpacity="0.35"
          />
        ))}
      </g>
      <text
        x="150" y={h / 2 + 18}
        textAnchor="middle"
        fontSize="52" fill="#fff8e7"
        fontFamily="Cormorant Garamond, Georgia, serif"
      >
        ♥
      </text>
    </svg>
  );
}

/* ============================================================
   COUPLE PORTRAIT
   ============================================================ */
function Portrait({ name, src }) {
  return src ? (
    <img src={src} alt={name} loading="lazy" />
  ) : (
    <div role="img" aria-label={`${name} portrait placeholder`}>
      {name[0]}
    </div>
  );
}

/* ============================================================
   MAIN APP
   ============================================================ */
export default function App() {
  const [coverOpen, setCoverOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [wishes, setWishes] = useState(() => [...store.get("wishes", []), ...CFG.wishes]);
  const [formName, setFormName] = useState("");
  const [formWish, setFormWish] = useState("");
  const [formError, setFormError] = useState("");

  // ✅ NEW states for EmailJS
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const burstRef = useRef(null);
  const particlesRef = useParticles(burstRef);
  const shehnai = useMusic("/kudmayi.mp3");
  const countdown = useCountdown(CFG.date);

  useReveal();

  /* ------- open invitation ------- */
  const openInvite = () => {
    setCoverOpen(true);
    document.body.classList.remove("lock");
    window.scrollTo(0, 0);
    try { shehnai.start(); } catch (e) { console.warn("[music] start err:", e); }
  };

  /* ------- lock body initially ------- */
  useEffect(() => {
    document.body.classList.add("lock");
  }, []);

  /* ------- visibility API for music ------- */
  useEffect(() => {
    const onVis = () => shehnai.vis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [shehnai]);

  /* ------- gallery ------- */
  const galleryTiles = CFG.gallery;

  const openLightbox = (i) => {
    setGalleryIndex(((i % galleryTiles.length) + galleryTiles.length) % galleryTiles.length);
    setGalleryOpen(true);
  };
  const closeLightbox = () => setGalleryOpen(false);
  const navLightbox = (delta) =>
    setGalleryIndex((idx) => ((idx + delta + galleryTiles.length) % galleryTiles.length));

  useEffect(() => {
    if (!galleryOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navLightbox(-1);
      if (e.key === "ArrowRight") navLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen]);

  /* ------- wishes submit — EmailJS wired ✅ ------- */
  const submitWish = async (e) => {
    e.preventDefault();
    const n = formName.trim();
    const w = formWish.trim();

    if (!n || !w) {
      setFormError("Please add your name and a wish.");
      return;
    }

    setFormError("");
    setSending(true);

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: n,
          message: w,
          to_name: EMAILJS.toName,
          reply_to: "no-reply@wedding.com",
        },
        { publicKey: EMAILJS.publicKey }
      );

      // Save locally too (for the wishes wall)
      const cur = store.get("wishes", []);
      cur.unshift([n, w]);
      store.set("wishes", cur);
      setWishes([[n, w], ...wishes]);

      setFormName("");
      setFormWish("");
      setSent(true);
      burstRef.current && burstRef.current(10);

      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("[emailjs] error:", err);
      setFormError("Could not send your wish. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const mapUrl = CFG.venueMapLink;

  const cdLabels = ["Days", "Hours", "Minutes", "Seconds"];

  return (
    <>
      <canvas id="fx" ref={particlesRef} aria-hidden="true" />

      {/* cover overlay */}
      {!coverOpen && (
        <div id="cover" role="dialog" aria-label="Wedding invitation cover">
          <div className="h l" />
          <div className="h r" />
          <div className="fr" />
          <div className="sweep" />
          <Rangoli />
          <Mandala className="m" />
          <Garland position="top" />
          <Garland position="bottom" />
          <GaneshSymbol />
          <div className="shubh-laabh left" aria-hidden="true">॥ शुभ ॥</div>
          <div className="shubh-laabh right" aria-hidden="true">॥ लाभ ॥</div>
          <div className="cc">
            <div className="dev c1 ci" style={{ "--d": ".4s", color: "#fff0c8", textShadow: "0 2px 8px rgba(0,0,0,.55)" }}>
              ॥ श्री गणेशाय नमः ॥
            </div>
            <div className="nm ci" style={{ "--d": "1s", color: "#fff3cf", textShadow: "0 3px 14px rgba(0,0,0,.65), 0 0 30px rgba(255,220,140,.35)" }}>
              {CFG.groom}
            </div>
            <div className="amp ci" style={{ "--d": "1.5s", color: "#fff0c8", textShadow: "0 2px 10px rgba(0,0,0,.6)" }}>
              &amp;
            </div>
            <div className="nm ci" style={{ "--d": "2s", color: "#fff3cf", textShadow: "0 3px 14px rgba(0,0,0,.65), 0 0 30px rgba(255,220,140,.35)" }}>
              {CFG.bride}
            </div>
            <p className="ci" style={{
              "--d": "2.6s",
              letterSpacing: ".35em",
              fontSize: 15,
              color: "#fff0c8",
              textShadow: "0 2px 10px rgba(0,0,0,.6)",
              margin: "16px 0 34px",
              fontWeight: 500
            }}>
              {CFG.dateText}
            </p>
            <button
              className="btn pulse ci"
              style={{
                "--d": "3.1s",
                background: "linear-gradient(135deg, #ffe9a8, #e3c883 45%, #b98d3c)",
                color: "#3a0f18",
                fontWeight: 600,
                boxShadow: "0 6px 22px rgba(0,0,0,.35), 0 0 24px rgba(255,220,140,.4)"
              }}
              onClick={openInvite}
            >
              Open Invitation
            </button>
          </div>
        </div>
      )}

      <main id="app">
        <HeroCurtain>
          <Garland position="top" />
          <Garland position="bottom" />
          <PaisleyBg />
          <Mandala style={{ left: "50%", top: "50%", margin: "-260px 0 0 -260px" }} />
          <p className="dev rv" style={{ fontSize: 20 }}>॥ श्री गणेशाय नमः ॥</p>
          <p className="eyebrow rv" style={{ "--d": ".15s" }}>Together with the blessings of our families</p>
          <div className="hero-n rv" style={{ "--d": ".3s" }}>{CFG.groom}</div>
          <div className="amp rv" style={{ "--d": ".6s" }}>&amp;</div>
          <div className="hero-n rv" style={{ "--d": ".6s" }}>{CFG.bride}</div>
          <div className="date rv" style={{ "--d": ".75s" }}>{CFG.dateText}</div>
          <p className="q rv" style={{ "--d": ".9s" }}>“{CFG.quote}”</p>
          <DiyaRow />
        </HeroCurtain>

        {/* ================= COUPLE ================= */}
        <Section id="couple">
          <p className="eyebrow rv">The Couple</p>
          <h2 className="rv">Groom &amp; Bride</h2>
          <div className="div" />
          <div className="cp">
            <div className="rv">
              <div className="arch">
                <Portrait name={CFG.groom} src={CFG.groomPhoto} />
              </div>
              <h3 className="script">{CFG.groom}</h3>
              <p>{CFG.groomInfo}</p>
            </div>
            <div className="rv" style={{ "--d": ".3s" }}>
              <div className="arch">
                <Portrait name={CFG.bride} src={CFG.bridePhoto} />
              </div>
              <h3 className="script">{CFG.bride}</h3>
              <p>{CFG.brideInfo}</p>
            </div>
          </div>
        </Section>

        <Section id="count">
          <p className="eyebrow rv">Counting the moments</p>
          <h2 className="rv">Until We Say “I Do”</h2>
          {countdown.done ? (
            <p id="done">The Celebration Has Begun ❤️</p>
          ) : (
            <div className="cd rv" role="timer" aria-live="off">
              {countdown.parts.map((v, i) => (
                <div key={i}><b>{v}</b><span>{cdLabels[i]}</span></div>
              ))}
            </div>
          )}
        </Section>

        <Section id="events">
          <p className="eyebrow rv">The Celebrations</p>
          <h2 className="rv">Wedding Events</h2>
          <div className="div" />
          <div className="ev">
            {CFG.events.map((e, i) => (
              <article key={i} className="x rv" style={{ "--d": `${(i % 2) * 0.2}s` }}>
                <div className="ic" aria-hidden="true">{e.i}</div>
                <h3>{e.n}</h3>
                <div className="dt">{e.d} · {e.t}</div>
                <p><strong>{e.v}</strong></p>
                <p>{e.x}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="story">
          <p className="eyebrow rv">Our Story</p>
          <h2 className="rv">How Love Found Us</h2>
          <div className="tl">
            <div className="ln" />
            {CFG.story.map((s, i) => (
              <div key={i} className="st rv" style={{ "--d": ".1s" }}>
                <small>{s[1]}</small>
                <h3>{s[0]}</h3>
                <p>{s[2]}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="family">
          <h2 className="rv" style={{ maxWidth: 640, margin: "auto" }}>
            With the Love &amp; Blessings of Our Families
          </h2>
          <div className="div" />
          <div className="fm">
            <div className="fb rv">
              <h3>Groom's Family</h3>
              {CFG.groomFam.map((x, i) => <p key={i}>{x}</p>)}
            </div>
            <div className="fb rv" style={{ "--d": ".25s" }}>
              <h3>Bride's Family</h3>
              {CFG.brideFam.map((x, i) => <p key={i}>{x}</p>)}
            </div>
          </div>
        </Section>

        <Section id="venue">
          <p className="eyebrow rv">The Wedding Venue</p>
          <h2 className="rv">{CFG.venue}</h2>
          <div className="vn rv">
            <ScratchCard
              venue={CFG.venue}
              address={CFG.address}
              venueEmbed={CFG.venueEmbed}
              mapUrl={mapUrl}
              onBurst={(n) => burstRef.current && burstRef.current(n)}
            />
          </div>
        </Section>

        {/* ================= WISHES — EmailJS Wired ================= */}
        <Section id="wishes">
          <p className="eyebrow rv">Blessings</p>
          <h2 className="rv">Wishes for the Couple</h2>
          <form id="wf" className="rv" onSubmit={submitWish} noValidate style={{ padding: "30px 24px" }}>
            <label htmlFor="wn">Your Name</label>
            <input
              id="wn"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              disabled={sending}
            />

            <label htmlFor="ww">Your Wedding Wish</label>
            <textarea
              id="ww"
              rows="2"
              value={formWish}
              onChange={(e) => setFormWish(e.target.value)}
              required
              disabled={sending}
            />

            <div className="er" role="alert">{formError}</div>

            {sent && (
              <div className="ok-msg" role="status">
                ✅ Thank you! Your blessings have been sent.
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send Blessings"}
              </button>
            </div>
          </form>

          <div className="wl">
            {wishes.map((w, i) => (
              <div key={i} className="wc rv in">
                <p>“{w[1]}”</p>
                <b>{w[0]}</b>
              </div>
            ))}
          </div>
        </Section>

        {/* ================= END ================= */}
        <section id="end">
          <div className="fr" />
          <Mandala style={{ left: "50%", top: "50%", margin: "-260px 0 0 -260px" }} />
          <div className="w">
            <div className="dev rv" style={{ fontSize: 20 }}>॥ शुभ विवाह ॥</div>
            <div className="hero-n rv" style={{ "--d": ".2s", fontSize: "clamp(44px,12vw,96px)" }}>
              {CFG.groom} &amp; {CFG.bride}
            </div>
            <div className="div" />
            <p className="q rv" style={{ "--d": ".5s" }}>Forever Begins Here ❤️</p>
            <div className="date rv" style={{ "--d": ".7s" }}>{CFG.dateText}</div>

            <div className="contacts rv" style={{ "--d": ".9s" }}>
              <p className="contacts-title">For any queries</p>
              <div className="contacts-list">
                {CFG.contacts.map((c, i) => (
                  <a
                    key={i}
                    className="contact-card"
                    href={`tel:${c.tel}`}
                    aria-label={`Call ${c.name}`}
                  >
                    <span className="contact-role">{c.role}</span>
                    <span className="contact-name">{c.name}</span>
                    <span className="contact-phone">📞 {c.phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {galleryOpen && (
        <div id="lb" className="on" role="dialog" aria-label="Photo viewer" aria-modal="true">
          {galleryTiles[galleryIndex].src ? (
            <img src={galleryTiles[galleryIndex].src} alt={`Wedding photo ${galleryIndex + 1}`} />
          ) : (
            <div style={{ width: "80vw", maxWidth: 600 }}>
              <GalleryTile i={galleryIndex} h={400} />
            </div>
          )}
          <button onClick={closeLightbox} aria-label="Close" style={{ top: 14, right: 14 }}>✕</button>
          <button onClick={() => navLightbox(-1)} aria-label="Previous" style={{ left: 6 }}>‹</button>
          <button onClick={() => navLightbox(1)} aria-label="Next" style={{ right: 6 }}>›</button>
        </div>
      )}
    </>
  );
}