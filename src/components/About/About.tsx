import { useEffect, useRef, useState } from "react";
import SlotText from "../common/SlotText";
import "./About.css";

export default function About() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [runId, setRunId] = useState(0);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (
          e.isIntersecting &&
          e.intersectionRatio >= 0.6 &&
          !hasTriggeredRef.current
        ) {
          hasTriggeredRef.current = true;
          setRunId((n) => n + 1);
          io.unobserve(el);
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paragraph =
    "I am a software engineer from Novi Sad, Serbia, building web and mobile products with React, React Native and TypeScript. At Ferili I work across a seven-app fintech platform used in four West African markets, and I also take on freelance work: animated marketing sites, online shops and custom tools. I studied Information Technology at the University of Novi Sad, and I care about clean code, reliable delivery and interfaces that feel good to use.";

  return (
    <section
      ref={rootRef}
      className="about-container"
      aria-labelledby="about-title"
    >
      <div className="about-inner">
        <SlotText
          key={`title-${runId}`}
          text="About Me"
          className="about-title"
          startDelay={0.1}
          perCharStagger={0.07}
          baseDuration={0.65}
          randomDuration={0.5}
        />

        <p className="about-text">
          <SlotText
            key={`para-${runId}`}
            text={paragraph}
            className="about-paragraph"
            startDelay={0.2}
            perCharStagger={0.02}
            baseDuration={0.5}
            randomDuration={0.4}
          />
        </p>
      </div>
    </section>
  );
}
