import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SlotText from "../common/SlotText";
import "./Header.css";

/* Declared at module level so its identity is stable — defining it inside
   Header made React remount every link (and replay the intro roll) on each
   re-render, which is why the nav vanished after every navigation. */
function MenuLink({
  label,
  to,
  delay = 0,
  onNavigate,
}: {
  label: string;
  to: string;
  delay?: number;
  onNavigate: (to: string) => void;
}) {
  return (
    <SlotText
      text={label}
      className="menu-item"
      startDelay={delay}
      onClick={() => onNavigate(to)}
    />
  );
}

export default function Header() {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const closeMobile = useCallback(() => setOpen(false), []);
  const openMobile = useCallback(() => setOpen(true), []);

  const handleNavigate = useCallback(
    (to: string) => {
      navigate(to);
      setOpen(false);
    },
    [navigate]
  );

  const titleGlow = useCallback(() => {
    gsap.fromTo(
      ".header-title",
      { textShadow: "0 0 0px rgba(0,255,138,0.0)" },
      {
        textShadow: "0 0 12px rgba(0,255,138,0.8)",
        duration: 0.25,
        yoyo: true,
        repeat: 1,
      }
    );
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      const t = gsap.from(headerRef.current!, {
        y: -12,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete() {
          gsap.set(headerRef.current!, {
            clearProps: "opacity,visibility,transform",
          });
        },
      });
      return () => t.kill();
    }, headerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const body = document.body;

    if (open) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      body.style.overflow = "hidden";
      tl.set(overlayRef.current, { pointerEvents: "auto" })
        .fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.2 }
        )
        .fromTo(
          panelRef.current,
          { yPercent: -5, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.22 },
          "<"
        );
      return () => {
        body.style.overflow = "";
        tl.kill();
      };
    } else {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete() {
          gsap.set(headerRef.current!, {
            clearProps: "opacity,visibility,transform",
          });
        },
      });
      tl.to(panelRef.current, {
        yPercent: -4,
        autoAlpha: 0,
        duration: 0.18,
      }).to(overlayRef.current, { autoAlpha: 0, duration: 0.18 }, "<");
      return () => tl.kill();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div ref={headerRef} className="header-container">
        <div className="header-left">
          <SlotText
            text="Radoslav"
            className="header-title slot-title"
            startDelay={0.2}
            perCharStagger={0.07}
            baseDuration={0.65}
            randomDuration={0.5}
            onAllComplete={titleGlow}
          />
        </div>
        <div className="header-right desktop-only">
          <MenuLink label="Home" to="/home" delay={3.0} onNavigate={handleNavigate} />
          <MenuLink label="About" to="/about" delay={3.1} onNavigate={handleNavigate} />
          <MenuLink label="Experience" to="/experience" delay={3.2} onNavigate={handleNavigate} />
          <MenuLink label="Skills" to="/skills" delay={3.3} onNavigate={handleNavigate} />
          <MenuLink label="Work" to="/work" delay={3.4} onNavigate={handleNavigate} />
          <MenuLink label="Contact" to="/contact" delay={3.5} onNavigate={handleNavigate} />
        </div>

        <button
          className="burger-btn mobile-only"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => (open ? closeMobile() : openMobile())}
        >
          {open ? (
            <CloseIcon fontSize="inherit" />
          ) : (
            <MenuIcon fontSize="inherit" />
          )}
        </button>
      </div>

      <div
        ref={overlayRef}
        className="mobile-overlay"
        onClick={closeMobile}
        aria-hidden={!open}
      >
        <div
          id="mobile-menu"
          className="mobile-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="mobile-nav">
            <MenuLink label="Home" to="/home" onNavigate={handleNavigate} />
            <MenuLink label="About" to="/about" onNavigate={handleNavigate} />
            <MenuLink label="Experience" to="/experience" onNavigate={handleNavigate} />
            <MenuLink label="Skills" to="/skills" onNavigate={handleNavigate} />
            <MenuLink label="Work" to="/work" onNavigate={handleNavigate} />
            <MenuLink label="Contact" to="/contact" onNavigate={handleNavigate} />
          </nav>
        </div>
      </div>
    </>
  );
}
