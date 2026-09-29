/**
 * PortfoliX Studio - Data Store & State Management
 * Handles local persistence, default profiles, validation, and JSON export/import.
 */

const STORAGE_KEY = 'portfolix_user_data_v1';

const DEFAULT_PORTFOLIO = {
  profile: {
    name: "Karthik Subramanian",
    title: "Senior Full-Stack & Cloud Engineer",
    tagline: "Building high-performance distributed systems, modern web apps & scalable cloud platforms.",
    statusBadge: "🟢 Available for high-impact roles & consulting",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    location: "Chennai, India (Open to Remote Worldwide)",
    yearsExperience: "6+",
    projectsCompleted: "45+",
    happyClients: "99%",
    codeContributions: "1.5k+",
    heroSummary: "I specialize in turning complex software architecture into fluid, intuitive user experiences. From scalable microservices to interactive web frontends, I ship production-grade code that scales.",
    aboutStory: "I am a full-stack engineer and open-source enthusiast with over 6 years of hands-on experience building web applications that handle millions of events daily.\n\nMy philosophy centers on clean architecture, relentless performance optimization, and delighting users through thoughtful UI design. I enjoy collaborating in cross-functional pods, writing well-tested code, and mentoring fellow developers."
  },
  socials: {
    email: "karthik.dev@example.com",
    linkedin: "https://linkedin.com/in/karthik-subramanian",
    github: "https://github.com/karthik-builds",
    twitter: "https://x.com/karthik_tech",
    website: "https://karthik.dev",
    phone: "+91 98765 43210",
    resumeUrl: "#resume-modal"
  },
  skills: [
    { category: "Frontend", items: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "WebSockets"] },
    { category: "Backend & Systems", items: ["Node.js", "Python / FastAPI", "Go", "PostgreSQL", "Redis", "Kafka", "GraphQL"] },
    { category: "Cloud & DevOps", items: ["AWS (ECS, Lambda, S3)", "Docker", "Kubernetes", "Terraform", "CI/CD Pipelines", "Linux"] },
    { category: "Core Strengths", items: ["System Architecture", "REST & gRPC APIs", "Performance Tuning", "UI/UX Systems"] }
  ],
  projects: [
    {
      id: "proj-1",
      title: "NexusCloud Observability",
      category: "Cloud & DevOps",
      tagline: "Real-time distributed metrics & telemetry dashboard",
      description: "Architected a high-throughput telemetry aggregator handling 250,000 metrics per second with sub-50ms query latency, customizable widgets, and automated anomaly alerting.",
      tags: ["Go", "React", "TimescaleDB", "Docker", "Kafka", "Tailwind"],
      demoUrl: "https://example.com/demo/nexuscloud",
      githubUrl: "https://github.com/example/nexuscloud",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-2",
      title: "PulseAI Code Sentinel",
      category: "AI & Developer Tooling",
      tagline: "Autonomous pull request analyzer & security auditor",
      description: "An AI-powered GitHub bot that examines PRs for security regressions, memory leaks, and architecture bottlenecks, generating annotated summaries and automated fix patches.",
      tags: ["Python", "FastAPI", "Next.js", "OpenAI", "PostgreSQL"],
      demoUrl: "https://example.com/demo/pulseai",
      githubUrl: "https://github.com/example/pulse-ai",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-3",
      title: "Aura Commerce Platform",
      category: "Web Application",
      tagline: "Headless e-commerce engine with sub-second page loads",
      description: "High-performance modular storefront featuring edge SSR, multi-currency localization, real-time inventory synchronization, and custom Stripe checkout flows.",
      tags: ["Next.js 15", "TypeScript", "Stripe", "Redis", "Tailwind CSS"],
      demoUrl: "https://example.com/demo/aurastore",
      githubUrl: "https://github.com/example/aura-commerce",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: "proj-4",
      title: "HyperFlow Automation Canvas",
      category: "SaaS & Productivity",
      tagline: "Visual drag-and-drop webhook & API pipeline builder",
      description: "Infinite canvas node-based workflow builder enabling users to link 50+ third-party APIs with conditional branching, execution step-debugging, and log replays.",
      tags: ["React Flow", "Zustand", "Node.js", "WebSockets"],
      demoUrl: "https://example.com/demo/hyperflow",
      githubUrl: "https://github.com/example/hyperflow",
      imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Lead Full-Stack Engineer",
      company: "Starlight Technologies",
      period: "2023 - Present",
      location: "Chennai, India / Remote",
      highlights: [
        "Architected enterprise customer analytics portal handling 15M+ monthly pageviews with 99.99% uptime.",
        "Spearheaded migration from monolithic Node.js backend to modular microservices, slashing cloud costs by 35%."
      ]
    },
    {
      id: "exp-2",
      role: "Senior Software Engineer",
      company: "Vortex Labs Inc.",
      period: "2021 - 2023",
      location: "Bengaluru, India",
      highlights: [
        "Designed and published high-throughput GraphQL APIs supporting 3M active mobile & web clients.",
        "Implemented Redis distributed caching layer and query indexing, reducing p99 API response times by 62%."
      ]
    },
    {
      id: "exp-3",
      role: "Software Developer",
      company: "Apex Digital Solutions",
      period: "2019 - 2021",
      location: "Chennai, India",
      highlights: [
        "Built responsive client portals with React, TypeScript, and Express for international banking partners.",
        "Authored CI/CD pipelines reducing deployment friction and cut release cycle time from bi-weekly to daily."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Anna University, Chennai",
      period: "2015 - 2019",
      notes: "First Class with Distinction (8.9 CGPA). President of Association of Computer Engineers."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      quote: "Karthik is an extraordinary engineer who seamlessly combines deep backend systems knowledge with pixel-perfect frontend finesse. A huge asset to any product team.",
      author: "Priya Ramanathan",
      title: "VP of Engineering at Starlight Tech"
    },
    {
      id: "test-2",
      quote: "His attention to scalability and developer experience set a standard in our engineering org that we still follow today. He executes with exceptional clarity.",
      author: "David Vance",
      title: "Co-Founder & CTO at Vortex Labs"
    }
  ],
  settings: {
    theme: "cyber-violet", // "cyber-violet" | "midnight-luxe" | "aurora-emerald" | "solar-amber" | "nordic-clean"
    fontFamily: "Outfit",
    accentColor: "#8b5cf6",
    accentSecondary: "#06b6d4",
    ctaText: "Get in Touch",
    ctaAction: "#contact",
    showTestimonials: true,
    showExperience: true,
    showEducation: true,
    showStats: true
  }
};

class DataStore {
  constructor() {
    this.data = this.load();
    this.listeners = [];
  }

  load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to guard against missing fields
        return {
          profile: { ...DEFAULT_PORTFOLIO.profile, ...(parsed.profile || {}) },
          socials: { ...DEFAULT_PORTFOLIO.socials, ...(parsed.socials || {}) },
          skills: parsed.skills || DEFAULT_PORTFOLIO.skills,
          projects: parsed.projects || DEFAULT_PORTFOLIO.projects,
          experience: parsed.experience || DEFAULT_PORTFOLIO.experience,
          education: parsed.education || DEFAULT_PORTFOLIO.education,
          testimonials: parsed.testimonials || DEFAULT_PORTFOLIO.testimonials,
          settings: { ...DEFAULT_PORTFOLIO.settings, ...(parsed.settings || {}) }
        };
      }
    } catch (e) {
      console.warn("Could not load from localStorage, using default", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      this.notify();
    } catch (e) {
      console.error("Error saving data to localStorage", e);
    }
  }

  getData() {
    return this.data;
  }

  updateProfile(field, value) {
    this.data.profile[field] = value;
    this.save();
  }

  updateSocial(field, value) {
    this.data.socials[field] = value;
    this.save();
  }

  updateSettings(field, value) {
    this.data.settings[field] = value;
    this.save();
  }

  setFullData(newData) {
    this.data = JSON.parse(JSON.stringify(newData));
    this.save();
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO));
    this.save();
  }

  clearAll() {
    this.data = {
      profile: {
        name: "",
        title: "",
        tagline: "",
        statusBadge: "",
        avatar: "",
        location: "",
        yearsExperience: "0",
        projectsCompleted: "0",
        happyClients: "100%",
        codeContributions: "0",
        heroSummary: "",
        aboutStory: ""
      },
      socials: {
        email: "",
        linkedin: "",
        github: "",
        twitter: "",
        website: "",
        phone: "",
        resumeUrl: ""
      },
      skills: [
        { category: "Frontend", items: [] },
        { category: "Backend", items: [] }
      ],
      projects: [],
      experience: [],
      education: [],
      testimonials: [],
      settings: { ...DEFAULT_PORTFOLIO.settings }
    };
    this.save();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    for (const cb of this.listeners) {
      cb(this.data);
    }
  }
}

// Export singleton instance (browser and Node safe)
if (typeof window !== 'undefined') {
  window.dataStore = new DataStore();
} else if (typeof global !== 'undefined') {
  global.dataStore = new DataStore();
}
