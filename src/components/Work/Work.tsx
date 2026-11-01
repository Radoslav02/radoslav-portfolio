import { useEffect, useRef, useState } from "react";
import "./Work.css";
import critic from "../../assets/images/critic.png";
import plant from "../../assets/images/plant.png";
import valkyra from "../../assets/images/valkyra.png";
import yplanner from "../../assets/images/yplanner.png";
import portfolio from "../../assets/images/portfolio.png";
import jarvis from "../../assets/images/jarvis.png";
import aura from "../../assets/images/aura.webp";
import dapcevic from "../../assets/images/dapcevic.webp";
import izradi from "../../assets/images/izradi.webp";
import revive from "../../assets/images/revive.webp";
import winery from "../../assets/images/winery.webp";

type Project = {
  title: string;
  kind: "Client" | "Concept" | "Product" | "Personal";
  note: string;
  stack: string;
  href: string;
  img?: string;
};

const PROJECTS: Project[] = [
  {
    title: "AURA One",
    kind: "Concept",
    note: "Immersive product site with a real-time 3D product scene. Lighthouse desktop: 93–97 performance, 100 accessibility.",
    stack: "React · Three.js · GSAP",
    href: "https://aura-one-eta-ebon.vercel.app",
    img: aura,
  },
  {
    title: "Pčelinjak Dapčević",
    kind: "Client",
    note: "Bilingual site and ordering flow for a family apiary selling homemade honey.",
    stack: "React · TypeScript · Firebase",
    href: "https://dapcevic-med-bay.vercel.app",
    img: dapcevic,
  },
  {
    title: "Izradi Sajt",
    kind: "Product",
    note: "Branching survey that turns answers into an instant, itemised website quote and a lead.",
    stack: "React · TypeScript · Zod",
    href: "https://izradi-sajt-pricing.vercel.app",
    img: izradi,
  },
  {
    title: "Valkyra Shop",
    kind: "Client",
    note: "Web shop for Valkyra Studio Design.",
    stack: "React · Redux · Firebase",
    href: "https://valkyra-shop.vercel.app",
    img: valkyra,
  },
  {
    title: "Plant Centar",
    kind: "Client",
    note: "Team-built site for an agricultural pharmacy.",
    stack: "React · Redux · Firebase",
    href: "https://plantcentar.com/pocetna",
    img: plant,
  },
  {
    title: "Vineyard Scroll",
    kind: "Concept",
    note: "Scroll-driven vineyard flythrough that hands off to an interactive WebGL cellar.",
    stack: "Three.js · GSAP · Lenis",
    href: "https://winery-demo-pink.vercel.app",
    img: winery,
  },
  {
    title: "Revive Interiors",
    kind: "Concept",
    note: "Bilingual marketing site for a fictional deep-cleaning service.",
    stack: "React · Tailwind · Motion",
    href: "https://cleaning-services-website-demo.vercel.app",
    img: revive,
  },
  {
    title: "Critic Cafe",
    kind: "Personal",
    note: "Social network for movie lovers, with posts, ratings, messaging and admin tools.",
    stack: "React · Spring Boot · MySQL",
    href: "https://my-im-db.vercel.app",
    img: critic,
  },
  {
    title: "YPlanner",
    kind: "Personal",
    note: "Mobile-first daily task planner.",
    stack: "React · TypeScript · Firestore",
    href: "https://yplanner.vercel.app",
    img: yplanner,
  },
  {
    title: "Library System",
    kind: "Personal",
    note: "Microservices for book management and rentals, with JWT auth and service discovery.",
    stack: "Java · Spring Cloud · Docker",
    href: "https://github.com/Radoslav02/library-system",
  },
  {
    title: "Voice Assistant",
    kind: "Personal",
    note: "Python voice assistant with GPT conversation and everyday task automation.",
    stack: "Python · OpenAI API",
    href: "https://github.com/Radoslav02/voice-assistant",
    img: jarvis,
  },
  {
    title: "Portfolio",
    kind: "Personal",
    note: "This site, with GSAP scrolling and text effects.",
    stack: "React · TypeScript · GSAP",
    href: "https://github.com/Radoslav02/radoslav-portfolio",
    img: portfolio,
  },
];

export default function Work() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.35),
      { threshold: [0, 0.35, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="work-section" id="work">
      <div className="work-wrap">
        <h2 className="work-title">
          <span>Selected Work</span>
        </h2>

        <div className={`work-grid ${inView ? "is-on" : ""}`}>
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              className="work-card"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              title={p.title}
            >
              <div className="work-media">
                {p.img ? (
                  <img src={p.img} alt={p.title} loading="lazy" />
                ) : (
                  <span className="work-fallback">{p.title}</span>
                )}
              </div>
              <div className="work-body">
                <div className="work-heading">
                  <h3>{p.title}</h3>
                  <span className="work-kind">{p.kind}</span>
                </div>
                <p>{p.note}</p>
                <p className="work-stack">{p.stack}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
