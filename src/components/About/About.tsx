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
    "I am a 4th-year Computer Science student at the Faculty of Mathematics, University of Novi Sad, with a solid foundation in computer operations and software engineering principles. My academic journey has equipped me with practical experience, particularly in Java and JavaScript (React). I thrive in team-oriented environments and am committed to learning and adhering to industry standards. I am eager to further develop my skills through industry placements and internships.";

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
