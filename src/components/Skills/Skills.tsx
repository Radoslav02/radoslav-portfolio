import { useEffect, useRef, useState } from "react";
import SlotText from "../common/SlotText";
import "./Skills.css";

type SkillGroup = {
  name: string;
  skills: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Frontend",
    skills: ["React", "TypeScript", "JavaScript", "HTML", "CSS / SCSS", "Tailwind", "MUI"],
  },
  {
    name: "Mobile",
    skills: ["React Native", "Expo", "EAS", "Push notifications", "Deep linking"],
  },
  {
    name: "State & data",
    skills: ["Zustand", "Redux", "TanStack Query", "React Hook Form", "Zod", "SSE"],
  },
  {
    name: "Motion & 3D",
    skills: ["GSAP", "Motion", "Three.js", "React Three Fiber", "Lenis"],
  },
  {
    name: "Backend & cloud",
    skills: ["Java", "Spring Boot", "C# / .NET", "Firebase", "MySQL", "Docker", "Vercel"],
  },
  {
    name: "Tooling",
    skills: ["Nx", "Vite", "Storybook", "Jest", "i18next", "Git"],
  },
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
                text="I started with a React internship at ComData, kept building my own projects, then joined PaySpot as a frontend developer working with React, React Native and C#. Today I build web and mobile apps at Ferili, shipping everything from design systems and payment flows to AI-assisted KYC. Outside of work I build animated sites, online shops and custom tools for clients."
                startDelay={0.2}
                perCharStagger={0.015}
                baseDuration={0.45}
                randomDuration={0.35}
              />
            </p>
          </div>

          <div className="skills-list">
            {SKILL_GROUPS.map((g, i) => (
              <div
                className="skill-group"
                key={g.name}
                style={{ animationDelay: `${80 * i}ms` }}
              >
                <h3>{g.name}</h3>
                <div className="skill-chips">
                  {g.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
