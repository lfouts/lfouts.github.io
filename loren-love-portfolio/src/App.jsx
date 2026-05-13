import { useState, useEffect, useRef } from "react";

const NAV = ["About", "Projects", "Experience", "Contact"];

const SKILLS = ["Angular", "TypeScript", "n8n", "Elasticsearch", "RxJS", "NgRx", "React", "Node.js", "Jest", "Cypress", "Grafana", "REST APIs", "Auth0", "CI/CD"];

const PROJECTS = [
  {
    title: "Modular UI Architecture",
    company: "NetFoundry — Cloud-native Networking",
    desc: "Helped lead front-end development for core product surfaces, architecting modular Angular systems that support enterprise-scale zero-trust networking configurations for technical users.",
    tags: ["Angular", "TypeScript", "NgRx", "RxJS"],
    stat: "Enterprise-scale",
  },
  {
    title: "State Management Overhaul",
    company: "NetFoundry — Cloud-native Networking",
    desc: "Architected NgRx and RxJS state management strategies that enhanced application scalability and standardised component patterns, enabling the team to ship features significantly faster.",
    tags: ["NgRx", "RxJS", "Angular"],
    stat: "20% faster delivery",
  },
  {
    title: "Testing & Reliability Standards",
    company: "NetFoundry — Cloud-native Networking",
    desc: "Established organisation-wide testing standards using Jest and Cypress, and leveraged Grafana and ELK Stack for proactive monitoring — measurably reducing production regressions.",
    tags: ["Jest", "Cypress", "Grafana", "ELK Stack"],
    stat: "Fewer production regressions",
  },
  {
    title: "Auth & Observability Rollout",
    company: "Red Ventures — Digital Consumer Platforms",
    desc: "Built internal Auth0 authentication tooling in Node.js and React, and supported a monitoring infrastructure rollout across nearly all applications in the enterprise portfolio.",
    tags: ["Auth0", "Node.js", "React", "New Relic"],
    stat: "~90% app coverage",
  },
  {
    title: "Live Website Analytics Pipeline",
    company: "Personal Project",
    desc: "Automated data pipeline that pulls website analytics from Google Analytics daily via n8n, stores time-series data in InfluxDB, and visualises sessions, pageviews, visitor locations and top cities in a live Grafana dashboard.",
    tags: ["Google Analytics", "n8n", "InfluxDB", "Grafana"],
    stat: "Live",
    flow: ["Google Analytics", "n8n", "InfluxDB", "Grafana"],
    link: "https://lorenlove.grafana.net/public-dashboards/ea33555320884f6f8679b42354551839",
  },
  {
    title: "n8n Analytics Workflow",
    company: "Personal Project",
    desc: "Automated n8n workflow that fetches daily website analytics from the Google Analytics Data API and writes time-series session and pageview data into InfluxDB — the data backbone behind the live Grafana dashboard.",
    tags: ["n8n", "Google Analytics API", "InfluxDB", "REST APIs"],
    stat: "Open source",
    flow: ["Google Analytics API", "n8n", "InfluxDB"],
    github: "https://github.com/lfouts/analytics-pipeline",
  },
];

const EXPERIENCE = [
  { role: "Software Engineer", company: "NetFoundry", period: "2019 – Present", desc: <>Worked with our lead front-end engineer on a cloud-native zero-trust networking platform. Architecting modular Angular systems, optimising REST API integrations, and maintaining high system reliability through observability tooling.  Contributed to our Open Source project: <a target="_blank" style={{color: "#4a7a50"}} href="https://github.com/openziti/ziti-console" >ziti-console</a></>  },
  { role: "Associate Software Engineer", company: "Red Ventures", period: "2018 – 2019", desc: "Built internal Auth0 authentication tooling and led observability rollout across ~90% of applications, partnering with cross-functional teams to standardise monitoring practices." },
  { role: "Network Operations Center Engineer", company: "Red Ventures", period: "2016 – 2018", desc: "Maintained performance for large-scale systems through 24/7 monitoring and rapid incident response — building the reliability-first mindset that underpins my engineering approach today." },
];

function TerminalLoader({ onDone }) {
  const command = "npm run portfolio";
  const [typed, setTyped] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typed < command.length) {
      const t = setTimeout(() => setTyped(typed + 1), 65);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setShowOutput(true), 300);
    const t2 = setTimeout(() => setFading(true), 1300);
    const t3 = setTimeout(() => onDone(), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [typed, onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "#0d0d0d",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.5s ease",
      pointerEvents: fading ? "none" : "all",
    }}>
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(0.85rem, 2vw, 1rem)", lineHeight: 1.6 }}>
        <div style={{ color: "#555", marginBottom: "0.5rem" }}>~/lorenlove</div>
        <div>
          <span style={{ color: "#7a9e7e" }}>❯ </span>
          <span style={{ color: "#fafaf8" }}>{command.slice(0, typed)}</span>
          <span style={{ borderRight: "2px solid #7a9e7e", animation: "blink 1s step-end infinite", marginLeft: 1 }} />
        </div>
        {showOutput && (
          <div style={{ marginTop: "1rem" }}>
            <div style={{ color: "#555" }}>  Compiling portfolio<span style={{ color: "#7a9e7e" }}>...</span></div>
            <div style={{ marginTop: "0.35rem", color: "#555" }}>
              <span style={{ color: "#7a9e7e" }}>✓ </span>Ready in 0.42s
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillTags({ skills, tagStyle, gridStyle }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} style={gridStyle}>
      {skills.map((s, i) => (
        <span key={s} style={{
          ...tagStyle,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`,
        }}>{s}</span>
      ))}
    </div>
  );
}

function StatDisplay({ stat }) {
  const match = stat.match(/(\D*)(\d+)(.*)/);
  const [ref, visible] = useInView(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible || !match) return;
    const target = parseInt(match[2]);
    let current = 0;
    const timer = setInterval(() => {
      current += target / 40;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 25);
    return () => clearInterval(timer);
  }, [visible]);

  if (!match) return <span ref={ref}>{stat}</span>;
  return <span ref={ref}>{match[1]}{visible ? count : 0}{match[3]}</span>;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const accent = "#7a9e7e";
  const accentLight = "#eaf2eb";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const el = document.documentElement;
      setScrolled(y > 40);
      setScrollY(y);
      setScrollProgress((y / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    root: { fontFamily: "'Inter', 'Helvetica Neue', sans-serif", background: "#fafaf8", color: "#1a1a1a", minHeight: "100vh" },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #ebe8e8" : "none",
      transition: "all 0.3s ease",
      padding: "0 clamp(1.5rem, 5vw, 4rem)",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
    },
    a: {
      color: "#4a7a50;"
    },
    logo: { fontFamily: "Georgia, serif", fontSize: "1.15rem", fontWeight: 400, letterSpacing: "0.02em", color: "#1a1a1a", cursor: "pointer", whiteSpace: "nowrap" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: { fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", color: "#555", transition: "color 0.2s" },
    hero: {
      minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "0 clamp(1.5rem, 8vw, 10rem)", position: "relative", overflow: "hidden",
    },
    heroEyebrow: { fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: accent, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" },
    heroName: { fontFamily: "Georgia, serif", fontSize: "clamp(2.8rem, 8vw, 7rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" },
    heroSub: { fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#666", maxWidth: 520, lineHeight: 1.7, marginBottom: "2.5rem" },
    heroBtns: { display: "flex", gap: "1rem", flexWrap: "wrap" },
    btnPrimary: { background: accent, color: "#fff", border: "none", borderRadius: "100px", padding: "0.75rem 2rem", fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em" },
    btnSecondary: { background: "transparent", color: "#1a1a1a", border: "1.5px solid #ccc", borderRadius: "100px", padding: "0.75rem 2rem", fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em" },
    section: { padding: "6rem clamp(1.5rem, 8vw, 10rem)" },
    sectionLabel: { fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: "0.75rem" },
    sectionTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400, marginBottom: "1rem" },
    divider: { width: 40, height: 1.5, background: accent, marginBottom: "3rem" },
    skillsGrid: { display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "2rem" },
    skillTag: { background: accentLight, color: "#4a7a50", borderRadius: "100px", padding: "0.4rem 1.1rem", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.02em" },
    projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" },
    projectCard: (i) => ({
      background: hoveredProject === i ? "#fff" : "#f5f3f0",
      border: `1.5px solid ${hoveredProject === i ? accent : "transparent"}`,
      borderRadius: "1.25rem",
      padding: "2rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: hoveredProject === i ? "0 8px 32px rgba(122,158,126,0.12)" : "none",
      transform: hoveredProject === i ? "translateY(-4px)" : "none",
    }),
    projectTitle: { fontFamily: "Georgia, serif", fontSize: "1.35rem", fontWeight: 400, marginBottom: "0.6rem" },
    projectDesc: { fontSize: "0.88rem", color: "#666", lineHeight: 1.7, marginBottom: "1.25rem" },
    projectTags: { display: "flex", flexWrap: "wrap", gap: "0.4rem" },
    projectTag: { background: "#eee", color: "#666", borderRadius: "100px", padding: "0.25rem 0.75rem", fontSize: "0.75rem" },
    expItem: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "180px 1fr", gap: isMobile ? "0.25rem" : "2rem", padding: "2rem 0", borderTop: "1px solid #ebe8e8" },
    expPeriod: { fontSize: "0.8rem", color: "#aaa", letterSpacing: "0.05em", paddingTop: "0.2rem" },
    expRole: { fontFamily: "Georgia, serif", fontSize: "1.15rem", fontWeight: 400, marginBottom: "0.15rem" },
    expCompany: { fontSize: "0.85rem", color: accent, marginBottom: "0.5rem", fontWeight: 500 },
    expDesc: { fontSize: "0.88rem", color: "#666", lineHeight: 1.7 },
    contactSection: { background: "#1a1a1a", color: "#fafaf8", padding: "6rem clamp(1.5rem, 8vw, 10rem)", textAlign: "center" },
    contactTitle: { fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 400, marginBottom: "1rem" },
    contactSub: { color: "#aaa", fontSize: "1rem", marginBottom: "2.5rem", lineHeight: 1.7 },
    contactLinks: { display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" },
    contactLink: { color: "#fafaf8", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderBottom: `1px solid ${accent}`, paddingBottom: "2px", transition: "opacity 0.2s" },
    deco: {
      position: "absolute", right: "clamp(2rem, 10vw, 12rem)", top: "50%", transform: `translateY(calc(-50% + ${scrollY * 0.15}px))`,
      width: "clamp(300px, 42vw, 560px)", height: "clamp(300px, 42vw, 560px)",
      objectFit: "contain",
      mixBlendMode: "multiply",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: 1,
    },
    decoRing: {
      position: "absolute", right: "clamp(0rem, 7vw, 8rem)", top: "50%", transform: `translateY(calc(-50% + ${scrollY * 0.08}px))`,
      width: "clamp(320px, 44vw, 580px)", height: "clamp(320px, 44vw, 580px)",
      pointerEvents: "none",
      zIndex: 0,
    },
    footer: { textAlign: "center", padding: "1.5rem", fontSize: "0.75rem", color: "#888", background: "#111", borderTop: "1px solid #222" },
  };

  return (
    <div style={styles.root}>
      {loading && <TerminalLoader onDone={() => setLoading(false)} />}
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 101, height: 2, background: accent, width: `${scrollProgress}%`, transition: "width 0.1s linear", pointerEvents: "none" }} />
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Loren Love.</div>
        {!isMobile && (
          <ul style={styles.navLinks}>
            {NAV.map(n => (
              <li key={n} style={styles.navLink} onClick={() => scrollTo(n)}
                onMouseEnter={e => e.target.style.color = accent}
                onMouseLeave={e => e.target.style.color = "#555"}>
                {n}
              </li>
            ))}
          </ul>
        )}
      </nav>

      <section style={styles.hero}>
        {!isMobile && (
          <>
            <div style={styles.decoRing}>
              <div className="hero-blob" style={{ width: "100%", height: "100%", background: "#e4ece4", borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
            </div>
            <img src={`${process.env.PUBLIC_URL}/avatar.png`} alt="" aria-hidden="true" style={styles.deco} />
          </>
        )}
        <div style={{ position: "relative" }}>
          <div style={styles.heroEyebrow}>
            <span style={{ width: 24, height: 1.5, background: accent, display: "inline-block" }} />
            Available for work
          </div>
          <h1 style={styles.heroName}>
            Hello, I'm<br />
            <span style={{ color: accent }}>Loren Love.</span>
          </h1>
          <p style={styles.heroSub}>
            A product-oriented software engineer who loves building thoughtful digital experiences — where clean code meets considered design.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}
              onClick={() => scrollTo("Projects")}>
              View my work
            </button>
            <button style={styles.btnSecondary}
              onMouseEnter={e => { e.target.style.borderColor = accent; e.target.style.color = accent; }}
              onMouseLeave={e => { e.target.style.borderColor = "#ccc"; e.target.style.color = "#1a1a1a"; }}
              onClick={() => scrollTo("Contact")}>
              Get in touch
            </button>
          </div>
        </div>
      </section>

      <section id="about" style={{ ...styles.section, background: "#fff" }}>
        <FadeIn>
          <div style={styles.sectionLabel}>About me</div>
          <h2 style={styles.sectionTitle}>Engineer by craft,<br />curious by nature.</h2>
          <div style={styles.divider} />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          <FadeIn delay={0.1}>
            <p style={{ color: "#555", lineHeight: 1.9, fontSize: "0.95rem" }}>
              I'm a product-oriented software engineer with 7+ years of experience building and scaling user-facing applications in enterprise SaaS environments. I specialise in Angular and TypeScript, with a deep appreciation for clean architecture and reliable systems.
            </p>
            <p style={{ color: "#555", lineHeight: 1.9, fontSize: "0.95rem", marginTop: "1rem" }}>
              My background spans front-end engineering, observability, and developer tooling — shaped by an early career in network operations that gave me a reliability-first perspective I bring to every product I touch.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: "1rem" }}>Technologies I work with</div>
            <SkillTags skills={SKILLS} tagStyle={styles.skillTag} gridStyle={styles.skillsGrid} />
          </FadeIn>
        </div>
      </section>

      <section id="projects" style={styles.section}>
        <FadeIn>
          <div style={styles.sectionLabel}>Selected work</div>
          <h2 style={styles.sectionTitle}>Work I'm proud of.</h2>
          <div style={styles.divider} />
        </FadeIn>
        <div style={styles.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div style={styles.projectCard(i)}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}>
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: accent, background: accentLight, borderRadius: "100px", padding: "0.2rem 0.75rem", display: "inline-block" }}><StatDisplay stat={p.stat} /></div>
                </div>
                <div style={styles.projectTitle}>{p.title}</div>
                <div style={{ fontSize: "0.75rem", color: "#aaa", marginBottom: "0.6rem", letterSpacing: "0.04em" }}>{p.company}</div>
                <div style={styles.projectDesc}>{p.desc}</div>
                {p.flow && (
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {p.flow.map((step, si) => (
                      <span key={step} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ background: accentLight, color: "#4a7a50", borderRadius: "100px", padding: "0.25rem 0.75rem", fontSize: "0.75rem", fontWeight: 500, whiteSpace: "nowrap" }}>{step}</span>
                        {si < p.flow.length - 1 && <span style={{ color: accent, fontSize: "0.75rem" }}>→</span>}
                      </span>
                    ))}
                  </div>
                )}
                <div style={styles.projectTags}>
                  {p.tags.map(t => <span key={t} style={styles.projectTag}>{t}</span>)}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "1.25rem", background: accent, color: "#fff", borderRadius: "100px", padding: "0.5rem 1.25rem", fontSize: "0.82rem", textDecoration: "none", letterSpacing: "0.02em", transition: "opacity 0.2s" }}
                    onMouseEnter={e => e.target.style.opacity = "0.85"}
                    onMouseLeave={e => e.target.style.opacity = "1"}>
                    View Live Dashboard →
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "1.25rem", background: "transparent", color: accent, border: `1.5px solid ${accent}`, borderRadius: "100px", padding: "0.5rem 1.25rem", fontSize: "0.82rem", textDecoration: "none", letterSpacing: "0.02em", transition: "opacity 0.2s" }}
                    onMouseEnter={e => e.target.style.opacity = "0.75"}
                    onMouseLeave={e => e.target.style.opacity = "1"}>
                    View on GitHub →
                  </a>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="experience" style={{ ...styles.section, background: "#fff" }}>
        <FadeIn>
          <div style={styles.sectionLabel}>Experience</div>
          <h2 style={styles.sectionTitle}>Where I've worked.</h2>
          <div style={styles.divider} />
        </FadeIn>
        <div>
          {EXPERIENCE.map((e, i) => (
            <FadeIn key={e.company + e.role} delay={i * 0.1}>
              <div className="exp-item" style={styles.expItem}>
                <div style={styles.expPeriod}>{e.period}</div>
                <div>
                  <div style={styles.expRole}>{e.role}</div>
                  <div style={styles.expCompany}>{e.company}</div>
                  <div style={styles.expDesc}>{e.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="contact" style={styles.contactSection}>
        <FadeIn>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: "1rem" }}>Contact</div>
          <h2 style={styles.contactTitle}>Let's build something<br />beautiful together.</h2>
          <p style={styles.contactSub}>Whether it's a new project, a role, or just a hello —<br />my inbox is always open.</p>
          <a href="mailto:lorenfouts92@gmail.com" style={{ ...styles.btnPrimary, display: "inline-block", textDecoration: "none", marginBottom: "2.5rem" }}>
            Say hello →
          </a>
          <div style={styles.contactLinks}>
            <a href="https://github.com/lfouts" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              style={{ color: "#fafaf8", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = accent}
              onMouseLeave={e => e.currentTarget.style.color = "#fafaf8"}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://pt.linkedin.com/in/lorenfouts" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              style={{ color: "#fafaf8", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = accent}
              onMouseLeave={e => e.currentTarget.style.color = "#fafaf8"}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </section>

      <footer style={styles.footer}>
        <span style={{ color: "#444" }}>© 2026 Loren Love — crafted with care.</span>
      </footer>
    </div>
  );
}