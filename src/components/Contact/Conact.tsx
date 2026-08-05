import { useEffect, useRef, useState } from "react";
import SlotText from "../common/SlotText";
import "./Contact.css";

export default function Contact() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [runId, setRunId] = useState(0);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > 0.5 &&
          !hasTriggeredRef.current
        ) {
          hasTriggeredRef.current = true;
          setRunId((n) => n + 1);
          io.unobserve(el);
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-wrap">
        <h2 className="contact-title" id="contact-title">
          <SlotText
            key={`title-${runId}`}
            text="Get in Touch"
            startDelay={0.1}
            perCharStagger={0.06}
            baseDuration={0.6}
            randomDuration={0.4}
          />
        </h2>

        <div className="contact-info">
          <p>
            <a
              className="contact-link"
              href="tel:+381693889340"
              aria-label="Call +381 69 388 9340"
            >
              <SlotText
                key={`phone-${runId}`}
                text="📞 Phone: +381 69 388 9340"
                startDelay={0.2}
                perCharStagger={0.02}
                baseDuration={0.5}
              />
            </a>
          </p>
          <p>
            <a
              className="contact-link"
              href="mailto:radoslavpavkovg@gmail.com"
              aria-label="Email radoslavpavkovg@gmail.com"
            >
              <SlotText
                key={`email-${runId}`}
                text="📧 Email: radoslavpavkovg@gmail.com"
                startDelay={0.3}
                perCharStagger={0.02}
                baseDuration={0.5}
              />
            </a>
          </p>
          <p>
            <SlotText
              key={`address-${runId}`}
              text="📍 Address: Novi Sad, Serbia"
              startDelay={0.4}
              perCharStagger={0.02}
              baseDuration={0.5}
            />
          </p>
        </div>

        <a
          className="cv-button"
          href="/CV Radoslav Pavkov.pdf"
          download="CV Radoslav Pavkov.pdf"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
