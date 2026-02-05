import React, { useEffect, useRef, useState } from "react";

type Card = { src: string; alt: string; href: string; label?: string };

const cards: Card[] = [
  { src: "/collage/1.png", alt: "Portfolio preview", href: "https://portfolio.pierinalopez.com", label: "Studio" },
  { src: "/collage/2.png", alt: "Travel photo", href: "/atlas", label: "Atlas" },
  { src: "/collage/3.png", alt: "Architecture reference", href: "/sketchbook", label: "Sketchbook" },
  { src: "/collage/4.png", alt: "Project UI", href: "/lab", label: "Lab" },
  { src: "/collage/5.png", alt: "Studio", href: "https://portfolio.pierinalopez.com", label: "Studio" },
  { src: "/collage/6.png", alt: "Atlas", href: "/atlas", label: "Atlas" },
  { src: "/collage/7.png", alt: "Lab", href: "/lab", label: "Lab" },
  { src: "/collage/8.png", alt: "Sketchbook", href: "/sketchbook", label: "Sketchbook" },
  { src: "/collage/9.png", alt: "Travel route", href: "/atlas", label: "Atlas" },
  { src: "/collage/10.png", alt: "Moodboard", href: "/sketchbook", label: "Sketchbook" },
  { src: "/collage/11.png", alt: "Hardware project", href: "/lab", label: "Lab" },
  { src: "/collage/12.png", alt: "City photo", href: "/atlas", label: "Atlas" },
];

function useAutoScroll(ref: React.RefObject<HTMLDivElement | null>, speed = 0.42) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      const dt = t - last;
      last = t;

      el.scrollTop += (dt * speed) / 16.67;

      // loop: duplicated content, so half the height is one set
      const half = el.scrollHeight / 2;
      if (half > 0 && el.scrollTop >= half) el.scrollTop -= half;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref, speed]);
}

function useCloseOnOutsideClick(
  open: boolean,
  setOpen: (v: boolean) => void,
  containerRef: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen, containerRef]);
}

export function FullGalleryHub() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useAutoScroll(scrollerRef, 0.42);

  useCloseOnOutsideClick(navOpen, setNavOpen, navRef);
  useCloseOnOutsideClick(contactOpen, setContactOpen, contactRef);

  const loop = [...cards, ...cards];

  const toggleNav = () => {
    setNavOpen((v) => !v);
    setContactOpen(false);
  };

  const toggleContact = () => {
    setContactOpen((v) => !v);
    setNavOpen(false);
  };

  return (
    <>
      <div className="hub">
        <div className="hubGallery" ref={scrollerRef} aria-hidden="true">
          <div className="hubGrid">
            {loop.map((c, i) => (
              <div className="hubTile" key={`${c.src}-${i}`}>
                <img src={c.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="hubVignette" aria-hidden="true" />

        <div className="hubCenter">
          <div className="hubCenterInner">
            <div className="hubKicker">PIERINA’S STUDIO</div>
            <h1 className="hubTitle">Design, code & travel</h1>
            <p className="hubSub">The Hub</p>
          </div>
        </div>
      </div>

      {/* Docks OUTSIDE hub so fixed positioning is true viewport-fixed */}
      <div ref={contactRef} className={`dock dockTR ${contactOpen ? "open" : ""}`}>
        <button className="dockCircle" onClick={toggleContact} aria-label="Contact" aria-expanded={contactOpen}>
          ✦
        </button>
        <div className="dockPanel">
          <a className="dockItem" href="mailto:plopez.be.94@gmail.com">Email</a>
          <a className="dockItem" href="https://github.com/YOURUSER" target="_blank" rel="noreferrer">GitHub</a>
          <a className="dockItem" href="https://www.linkedin.com/in/pierina-lopez-60b68524b/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <div ref={navRef} className={`dock dockBL ${navOpen ? "open" : ""}`}>
        <button className="dockCircle" onClick={toggleNav} aria-label="Pages" aria-expanded={navOpen}>
          ☰
        </button>
        <div className="dockPanel">
          <a className="dockItem" href="https://portfolio.pierinalopez.com" target="_blank" rel="noreferrer">Portfolio</a>
          <a className="dockItem" href="/atlas">Atlas</a>
          <a className="dockItem" href="/lab">Lab</a>
          <a className="dockItem" href="/sketchbook">Sketchbook</a>
        </div>
      </div>
    </>
  );
}