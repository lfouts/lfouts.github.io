import { useState, useEffect, useRef } from "react";

const NAV = ["About", "Projects", "Experience", "Contact"];

const SKILLS = ["React", "React Native", "Angular", "TypeScript", "n8n", "Elasticsearch", "RxJS", "NgRx", "Node.js", "Expo", "Supabase", "Jest", "Cypress", "Grafana", "REST APIs", "Auth0", "CI/CD", "Python", "Rust"];

const PROFESSIONAL_PROJECTS = [
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
];

const PERSONAL_PROJECTS = [
  {
    title: "Pour'd",
    company: "React Native Mobile App",
    desc: "Cross-platform mobile app built with React Native and Expo, backed by Supabase for database and auth — TypeScript throughout, with NativeWind bringing Tailwind-style native styling to the component layer.",
    tags: ["React Native", "TypeScript", "Expo", "Supabase", "NativeWind"],
    stat: "Open source",
    github: "https://github.com/lfouts/pourd",
  },
  {
    title: "This Portfolio",
    company: "React Web App",
    desc: "Designed and built from scratch in React — custom scroll-animation system using IntersectionObserver, a terminal-style loading screen, fluid typography with clamp(), and zero third-party component libraries.",
    tags: ["React", "JavaScript", "Tailwind CSS", "GitHub Pages"],
    stat: "React app",
    github: "https://github.com/lfouts/lfouts.github.io",
  },
  {
    title: "MCP Agent",
    company: "Python · AI Tooling",
    desc: "Built a custom Model Context Protocol agent in Python — exploring how to extend AI assistants with purpose-built tools and structured context, hands-on with the emerging MCP standard.",
    tags: ["Python", "MCP", "AI Tooling"],
    stat: "Open source",
    github: "https://github.com/lfouts/mcp-learning",
  },
  {
    title: "Learning Rust",
    company: "Systems Programming",
    desc: "An ongoing project working through Rust concepts — ownership, borrowing, lifetimes, and systems-level thinking. A deliberate investment in a language that's reshaping how performance-critical software gets written.",
    tags: ["Rust"],
    stat: "In progress",
    github: "https://github.com/lfouts/Project_Rust",
  },
];

const EXPERIENCE = [
  { role: "Software Engineer", company: "NetFoundry", period: "2019 – Present", desc: <>Worked with our lead front-end engineer on a cloud-native zero-trust networking platform. Architecting modular Angular systems, optimising REST API integrations, and maintaining high system reliability through observability tooling. Contributed to our Open Source project: <a target="_blank" className="text-sage-dark hover:opacity-75" href="https://github.com/openziti/ziti-console">ziti-console</a></> },
  { role: "Associate Software Engineer", company: "Red Ventures", period: "2018 – 2019", desc: "Built internal Auth0 authentication tooling and led observability rollout across ~90% of applications, partnering with cross-functional teams to standardise monitoring practices." },
  { role: "Network Operations Center Engineer", company: "Red Ventures", period: "2016 – 2018", desc: "Maintained performance for large-scale systems through 24/7 monitoring and rapid incident response — building the reliability-first mindset that underpins my engineering approach today." },
];

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

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SkillTags({ skills }) {
  const [ref, visible] = useInView(0.2);
  return (
    <div ref={ref} className="flex flex-wrap gap-2 mt-8">
      {skills.map((s, i) => (
        <span key={s} className="bg-sage-light text-sage-dark rounded-full px-4 py-1.5 text-sm font-medium tracking-wide" style={{
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

function ProjectCard({ p, i }) {
  return (
    <FadeIn delay={i * 0.1}>
      <div className="group bg-[#f5f3f0] hover:bg-white border border-transparent hover:border-sage rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-[0_8px_32px_rgba(122,158,126,0.12)] hover:-translate-y-1 h-full flex flex-col">
        <div className="mb-3">
          <span className="text-[0.78rem] font-semibold text-sage bg-sage-light rounded-full px-3 py-0.5 inline-block">
            <StatDisplay stat={p.stat} />
          </span>
        </div>
        <div className="font-serif text-[1.35rem] font-normal mb-2">{p.title}</div>
        <div className="text-[0.75rem] text-[#aaa] mb-2 tracking-[0.04em]">{p.company}</div>
        <div className="text-[0.88rem] text-[#666] leading-relaxed mb-5 flex-1">{p.desc}</div>
        {p.flow && (
          <div className="flex items-center flex-wrap gap-1.5 mb-5">
            {p.flow.map((step, si) => (
              <span key={step} className="flex items-center gap-1.5">
                <span className="bg-sage-light text-sage-dark rounded-full px-3 py-0.5 text-[0.75rem] font-medium whitespace-nowrap">{step}</span>
                {si < p.flow.length - 1 && <span className="text-sage text-[0.75rem]">→</span>}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map(t => (
            <span key={t} className="bg-[#eee] text-[#666] rounded-full px-3 py-0.5 text-[0.75rem]">{t}</span>
          ))}
        </div>
        {p.link && (
          <a href={p.link} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-5 bg-sage text-white rounded-full px-5 py-2 text-[0.82rem] no-underline tracking-wide hover:opacity-85 transition-opacity">
            View Live Dashboard →
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-5 bg-transparent text-sage border border-sage rounded-full px-5 py-2 text-[0.82rem] no-underline tracking-wide hover:opacity-75 transition-opacity">
            View on GitHub →
          </a>
        )}
      </div>
    </FadeIn>
  );
}

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
    <div className={`fixed inset-0 z-[999] bg-terminal flex items-center justify-center transition-opacity duration-500 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="font-mono text-base leading-relaxed">
        <div className="text-neutral-600 mb-2">~/lorenlove</div>
        <div>
          <span className="text-sage">❯ </span>
          <span className="text-cream">{command.slice(0, typed)}</span>
          <span className="blink border-r-2 border-sage ml-px" />
        </div>
        {showOutput && (
          <div className="mt-4">
            <div className="text-neutral-600">  Compiling portfolio<span className="text-sage">...</span></div>
            <div className="mt-1.5 text-neutral-600"><span className="text-sage">✓ </span>Ready in 0.42s</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    const onResize = () => {};
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans bg-cream text-[#1a1a1a] min-h-screen">
      {loading && <TerminalLoader onDone={() => setLoading(false)} />}

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 z-[101] h-0.5 bg-sage pointer-events-none transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }} />

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-16 px-[clamp(1.5rem,5vw,4rem)] transition-all duration-300 ${scrolled ? "bg-cream/90 backdrop-blur-md border-b border-[#ebe8e8]" : "bg-transparent"}`}>
        <div className="font-serif text-[1.15rem] tracking-wide text-[#1a1a1a] cursor-pointer whitespace-nowrap"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Loren Love.
        </div>
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {NAV.map(n => (
            <li key={n} className="text-[0.85rem] tracking-[0.08em] uppercase cursor-pointer text-[#555] hover:text-sage transition-colors duration-200"
              onClick={() => scrollTo(n)}>
              {n}
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-[clamp(1.5rem,8vw,10rem)] relative overflow-hidden">
        {/* Blob */}
        <div className="hidden md:block absolute right-[clamp(0rem,7vw,8rem)] top-1/2 w-[clamp(320px,44vw,580px)] h-[clamp(320px,44vw,580px)] pointer-events-none z-0"
          style={{ transform: `translateY(calc(-50% + ${scrollY * 0.08}px))` }}>
          <div className="hero-blob w-full h-full bg-sage-blob" style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
        </div>
        {/* Avatar */}
        <img src={`${process.env.PUBLIC_URL}/avatar.png`} alt="" aria-hidden="true"
          className="hidden md:block absolute pointer-events-none select-none z-[1] object-contain"
          style={{
            right: "clamp(2rem,10vw,12rem)",
            top: "50%",
            width: "clamp(300px,42vw,560px)",
            height: "clamp(300px,42vw,560px)",
            transform: `translateY(calc(-50% + ${scrollY * 0.15}px))`,
            mixBlendMode: "multiply",
          }} />

        <div className="relative z-[2]">
          <div className="text-[0.8rem] tracking-[0.18em] uppercase text-sage mb-5 flex items-center gap-3">
            <span className="w-6 h-px bg-sage inline-block" />
            Available for work
          </div>
          <h1 className="font-serif text-hero font-normal leading-[1.05] tracking-tight mb-6">
            Hello, I'm<br />
            <span className="text-sage">Loren Love.</span>
          </h1>
          <p className="text-[clamp(1rem,2vw,1.2rem)] text-[#666] max-w-[520px] leading-relaxed mb-10">
            A product-oriented software engineer who loves building thoughtful digital experiences — where clean code meets considered design.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-sage text-white border-none rounded-full px-8 py-3 text-[0.9rem] cursor-pointer tracking-wide hover:opacity-85 transition-opacity"
              onClick={() => scrollTo("Projects")}>
              View my work
            </button>
            <button className="bg-transparent text-[#1a1a1a] border border-[#ccc] rounded-full px-8 py-3 text-[0.9rem] cursor-pointer tracking-wide hover:border-sage hover:text-sage transition-colors"
              onClick={() => scrollTo("Contact")}>
              Get in touch
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white px-[clamp(1.5rem,8vw,10rem)] py-24">
        <FadeIn>
          <div className="text-[0.75rem] tracking-[0.2em] uppercase text-sage mb-3">About me</div>
          <h2 className="font-serif text-section font-normal mb-4">Engineer by craft,<br />curious by nature.</h2>
          <div className="w-10 h-px bg-sage mb-12" />
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <FadeIn delay={0.1}>
            <p className="text-[#555] leading-[1.9] text-[0.95rem]">
              I'm a product-oriented software engineer with 7+ years of experience building and scaling user-facing applications in enterprise SaaS environments. I specialise in Angular and TypeScript, with a deep appreciation for clean architecture and reliable systems.
            </p>
            <p className="text-[#555] leading-[1.9] text-[0.95rem] mt-4">
              My background spans front-end engineering, observability, and developer tooling — shaped by an early career in network operations that gave me a reliability-first perspective I bring to every product I touch.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-[0.8rem] tracking-[0.1em] uppercase text-[#aaa] mb-4">Technologies I work with</div>
            <SkillTags skills={SKILLS} />
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-[clamp(1.5rem,8vw,10rem)] py-24 bg-cream">
        <FadeIn>
          <div className="text-[0.75rem] tracking-[0.2em] uppercase text-sage mb-3">Selected work</div>
          <h2 className="font-serif text-section font-normal mb-4">Work I'm proud of.</h2>
          <div className="w-10 h-px bg-sage mb-12" />
        </FadeIn>

        {/* Professional */}
        <FadeIn>
          <div className="text-[0.75rem] tracking-[0.15em] uppercase text-[#aaa] mb-6">Professional</div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROFESSIONAL_PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>

        {/* Personal */}
        <FadeIn>
          <div className="text-[0.75rem] tracking-[0.15em] uppercase text-[#aaa] mb-6">Personal</div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PERSONAL_PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="bg-white px-[clamp(1.5rem,8vw,10rem)] py-24">
        <FadeIn>
          <div className="text-[0.75rem] tracking-[0.2em] uppercase text-sage mb-3">Experience</div>
          <h2 className="font-serif text-section font-normal mb-4">Where I've worked.</h2>
          <div className="w-10 h-px bg-sage mb-12" />
        </FadeIn>
        <div>
          {EXPERIENCE.map((e, i) => (
            <FadeIn key={e.company + e.role} delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-8 py-8 border-t border-[#ebe8e8]">
                <div className="text-[0.8rem] text-[#aaa] tracking-[0.05em] pt-0.5">{e.period}</div>
                <div>
                  <div className="font-serif text-[1.15rem] font-normal mb-0.5">{e.role}</div>
                  <div className="text-[0.85rem] text-sage mb-2 font-medium">{e.company}</div>
                  <div className="text-[0.88rem] text-[#666] leading-relaxed">{e.desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[#1a1a1a] text-cream px-[clamp(1.5rem,8vw,10rem)] py-24 text-center">
        <FadeIn>
          <div className="text-[0.75rem] tracking-[0.2em] uppercase text-sage mb-4">Contact</div>
          <h2 className="font-serif text-contact font-normal mb-4">Let's build something<br />beautiful together.</h2>
          <p className="text-[#aaa] text-base mb-10 leading-relaxed">Whether it's a new project, a role, or just a hello —<br />my inbox is always open.</p>
          <a href="mailto:lorenfouts92@gmail.com"
            className="inline-block bg-sage text-white rounded-full px-8 py-3 text-[0.9rem] no-underline tracking-wide hover:opacity-85 transition-opacity mb-10">
            Say hello →
          </a>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="https://github.com/lfouts" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-cream hover:text-sage transition-colors duration-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://pt.linkedin.com/in/lorenfouts" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-cream hover:text-sage transition-colors duration-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </section>

      <footer className="text-center py-6 text-[0.75rem] text-[#888] bg-[#111] border-t border-[#222]">
        <span className="text-[#444]">© 2026 Loren Love — crafted with care.</span>
      </footer>
    </div>
  );
}
