import { useEffect, useRef, useState } from "react";
import SlotText from "../common/SlotText";
import "./Skills.css";

type Skill = {
  name: string;
};

const SKILLS: Skill[] = [
  { name: "Java" },
  { name: "JavaScript" },
  { name: "CSS" },
  { name: "HTML" },
];

export default function Skills() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [runId, setRunId] = useState(0);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setRunId((n) => n + 1);
          io.unobserve(el);
        }
      },
      {
        threshold: 0.6,
        root: null,
        rootMargin: "0px 0px -15% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="skills-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="skills-wrap">
        <h2 className="skills-title" id="skills-title">
          <SlotText
            key={`title-${runId}`}
            text="My Skills"
            startDelay={0.1}
            perCharStagger={0.07}
            baseDuration={0.6}
            randomDuration={0.5}
          />
        </h2>

        <div className="skills-grid">
          {/* Levo: intro tekst */}
          <div className="skills-intro">
            <p>
              <SlotText
                key={`intro-${runId}`}
                text="I started my journey with a two-week internship where I learned the fundamentals of React and gained an understanding of core frontend concepts. After the internship, I continued learning on my own, working on several mini projects to improve my practical skills and deepen my knowledge. Currently, I’m working at Payspot as a Junior Frontend Developer, where I focus on building applications using React, React Native and C#. I’m constantly improving my skills and expanding my expertise in modern frontend development."
                startDelay={0.2}
                perCharStagger={0.015}
                baseDuration={0.45}
                randomDuration={0.35}
              />
            </p>
          </div>

          <div className="skills-list">
            {SKILLS.map((s, i) => (
              <div
                className="skill-label-big"
                key={s.name}
                style={{ transitionDelay: `${80 * i}ms` }}
              >
                <SlotText
                  key={`skill-${runId}-${s.name}`}
                  text={s.name}
                  startDelay={0.15 + i * 0.05}
                  perCharStagger={0.035}
                  baseDuration={0.45}
                  randomDuration={0.3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
