import { Fragment, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import "./SlotText.css";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const randomGlyph = () => CHARSET[Math.floor(Math.random() * CHARSET.length)];

export interface SlotTextProps {
  text: string;
  className?: string;
  onClick?: () => void;
  startDelay?: number;
  perCharStagger?: number;
  baseDuration?: number;
  randomDuration?: number;
  onAllComplete?: () => void;
}

/**
 * Rolls one letter like a slot-machine reel: the shown glyph walks the
 * charset with an eased (decelerating) step so the reel visibly slows down
 * and the last step IS the final character — no random-then-snap.
 * The ghost span (final char) stays hidden until the reel lands, so the
 * cell always has its final width and nothing shifts.
 */
function rollLetter(
  ghost: HTMLElement,
  roll: HTMLElement,
  finalChar: string,
  duration: number,
  delay: number
) {
  const upper = finalChar.toUpperCase();
  const finalIdx = CHARSET.indexOf(upper);
  const isLower = finalChar !== upper;
  const steps = 8 + Math.floor(Math.random() * 6);
  const proxy = { t: 0 };
  let lastStep = -1;

  const land = () => {
    ghost.style.visibility = "visible";
    roll.textContent = "";
  };

  return gsap.to(proxy, {
    t: 1,
    duration,
    delay,
    ease: "power2.out",
    onUpdate: () => {
      const step = Math.min(steps, Math.floor(proxy.t * (steps + 1)));
      if (step === lastStep) return;
      lastStep = step;

      if (step >= steps) {
        land();
        return;
      }

      let glyph: string;
      if (finalIdx >= 0) {
        const reelIdx =
          (((finalIdx - (steps - step)) % CHARSET.length) + CHARSET.length) %
          CHARSET.length;
        glyph = CHARSET[reelIdx];
        if (isLower) glyph = glyph.toLowerCase();
      } else {
        // char not in the charset (punctuation, emoji): free-spin, then land
        glyph = randomGlyph();
      }
      roll.textContent = glyph;
    },
    onComplete: land,
  });
}

export default function SlotText({
  text,
  className,
  onClick,
  startDelay = 0,
  perCharStagger = 0.06,
  baseDuration = 0.7,
  randomDuration = 0.6,
  onAllComplete,
}: SlotTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  // Words become atomic inline-blocks so line wrapping only happens at
  // spaces — the same places plain text would wrap. Array.from keeps
  // emoji / surrogate pairs intact.
  const words = useMemo(
    () => text.split(" ").map((w) => Array.from(w)),
    [text]
  );

  const onAllCompleteRef = useRef(onAllComplete);
  useEffect(() => {
    onAllCompleteRef.current = onAllComplete;
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const letterEls = Array.from(
      el.querySelectorAll<HTMLSpanElement>(".slot-letter")
    );

    if (prefersReduced) {
      letterEls.forEach((letterEl) => {
        const ghost = letterEl.querySelector<HTMLElement>(".slot-ghost");
        if (ghost) ghost.style.visibility = "visible";
      });
      onAllCompleteRef.current?.();
      return;
    }

    el.style.pointerEvents = "none";

    const tweens: gsap.core.Tween[] = [];
    letterEls.forEach((letterEl, idx) => {
      const ghost = letterEl.querySelector<HTMLElement>(".slot-ghost");
      const roll = letterEl.querySelector<HTMLElement>(".slot-roll");
      if (!ghost || !roll) return;

      const finalChar = letterEl.dataset.letter ?? "";
      const duration = baseDuration + Math.random() * randomDuration;
      const delay = startDelay + idx * perCharStagger + Math.random() * 0.08;
      tweens.push(rollLetter(ghost, roll, finalChar, duration, delay));
    });

    const totalFinish =
      startDelay +
      letterEls.length * perCharStagger +
      baseDuration +
      randomDuration +
      0.3;

    const fin = gsap.delayedCall(totalFinish, () => {
      el.style.pointerEvents = "";
      onAllCompleteRef.current?.();
    });

    return () => {
      tweens.forEach((t) => t.kill());
      fin.kill();
      el.style.pointerEvents = "";
      letterEls.forEach((letterEl) => {
        const ghost = letterEl.querySelector<HTMLElement>(".slot-ghost");
        const roll = letterEl.querySelector<HTMLElement>(".slot-roll");
        if (ghost) ghost.style.visibility = "";
        if (roll) roll.textContent = "";
      });
    };
  }, [
    text,
    startDelay,
    perCharStagger,
    baseDuration,
    randomDuration,
    prefersReduced,
  ]);

  const interactiveProps = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};

  return (
    <span
      ref={ref}
      className={className}
      aria-label={text}
      {...interactiveProps}
    >
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && " "}
            <span className="slot-word">
              {word.map((ch, ci) => (
                <span key={ci} className="slot-letter" data-letter={ch}>
                  <span className="slot-ghost">{ch}</span>
                  <span className="slot-roll" />
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
