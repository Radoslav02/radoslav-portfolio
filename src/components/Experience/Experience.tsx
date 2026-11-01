import "./Experience.css";

type Job = {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights?: string[];
  stack?: string[];
};

const JOBS: Job[] = [
  {
    role: "Software Engineer",
    company: "Ferili",
    period: "Apr 2026 – Present",
    summary:
      "Fintech platform for customers, partners, experts, cashiers and back-office operators in four West African markets. 650+ commits across a 7-app Nx monorepo.",
    highlights: [
      "Built the back-office mobile app from scratch: role-based navigation, approval workflows, QR scanning, push notifications, deep linking and PDF invoices.",
      "Created the design tokens and component library for the customer app redesign, then rebuilt 30+ screens on top of them.",
      "Engineered the web cashier module: configuration-driven pay-in and payout flows, partial and split payouts, retries and invoices.",
      "Shipped a pricing and operator configuration module with request approvals and a current-vs-proposed comparison view.",
      "Integrated AI-assisted KYC and an AI validation approval gate on web and mobile, with real-time SSE notifications.",
    ],
    stack: [
      "React",
      "React Native",
      "Expo",
      "TypeScript",
      "Nx",
      "Zustand",
      "TanStack Query",
      "Zod",
      "Storybook",
    ],
  },
  {
    role: "Frontend Developer",
    company: "PaySpot",
    period: "May 2025 – Apr 2026",
    summary: "Built and maintained applications with React, React Native and C#.",
    stack: ["React", "React Native", "C#"],
  },
  {
    role: "Front-end Intern",
    company: "ComData",
    period: "Jun 2024",
    summary: "Learning internship covering React and core frontend concepts.",
  },
];

export default function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-wrap">
        <h2 className="experience-title">Experience</h2>

        <div className="experience-list">
          {JOBS.map((job) => (
            <article className="experience-item" key={job.company}>
              <header className="experience-head">
                <h3>
                  {job.role} <span>· {job.company}</span>
                </h3>
                <p className="experience-period">{job.period}</p>
              </header>
              <p className="experience-summary">{job.summary}</p>
              {job.highlights && (
                <ul>
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {job.stack && (
                <div className="experience-stack">
                  {job.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
