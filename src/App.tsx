import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Sparkles,
  Flame,
  GraduationCap,
  Briefcase,
  Clock,
  ExternalLink,
  FileText,
  Send,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Info,
  Menu,
  MessageSquare,
  Copy,
  Check,
  HelpCircle,
  Sun,
  Moon
} from "lucide-react";

import { DATA } from "./data";
import SkillCluster from "./components/SkillCluster";
import ProjectCard from "./components/ProjectCard";
import ResumePDFView from "./components/ResumePDFView";
import AIAssistant from "./components/AIAssistant";

export default function App() {
  const [projectFilter, setProjectFilter] = useState<"all" | "ai" | "fullstack" | "client">("all");
  const [showPDF, setShowPDF] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark"; // Light theme is default, so if not set, it is false (light)
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct pre-filled email details
    const subject = encodeURIComponent(`Portfolio Inquiry from ${contactForm.name}`);
    const body = encodeURIComponent(
      `Hi Renga,\n\n${contactForm.message}\n\nBest regards,\n${contactForm.name}\nReply Email: ${contactForm.email}`
    );
    
    // Trigger local email client
    const mailtoUrl = `mailto:${DATA.contact.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: "", email: "", message: "" });
    }, 4500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DATA.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Filter projects based on type
  const filteredProjects = DATA.projects.filter((p) => {
    if (projectFilter === "all") return true;
    if (projectFilter === "ai") {
      return p.technologies.some((t) =>
        t.toLowerCase().includes("openai") ||
        t.toLowerCase().includes("gemini") ||
        t.toLowerCase().includes("dialogflow") ||
        t.toLowerCase().includes("bert") ||
        t.toLowerCase().includes("ocr")
      );
    }
    if (projectFilter === "fullstack") {
      return p.technologies.some((t) =>
        t.toLowerCase().includes("node") ||
        t.toLowerCase().includes("express") ||
        t.toLowerCase().includes("supabase") ||
        t.toLowerCase().includes("mongodb") ||
        t.toLowerCase().includes("socket") ||
        t.toLowerCase().includes("php")
      );
    }
    if (projectFilter === "client") {
      return !p.technologies.some((t) =>
        t.toLowerCase().includes("node") ||
        t.toLowerCase().includes("express") ||
        t.toLowerCase().includes("openai") ||
        t.toLowerCase().includes("gemini")
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text flex flex-col relative selection:bg-blue-600/30 selection:text-white overflow-x-clip">
      {/* Header Backdrop Accent Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-theme-bg/90 backdrop-blur-md border-b border-theme-border shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20 font-display shrink-0">
              {DATA.initials}
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs sm:text-sm tracking-wide text-theme-heading block font-display whitespace-nowrap overflow-hidden text-ellipsis">
                {DATA.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-theme-text-muted font-mono block whitespace-nowrap overflow-hidden text-ellipsis">
                Full Stack Developer
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-theme-text-muted">
            <a href="#about" className="hover:text-theme-heading transition-colors">About</a>
            <a href="#experience" className="hover:text-theme-heading transition-colors">Experience</a>
            <a href="#skills" className="hover:text-theme-heading transition-colors">Skills</a>
            <a href="#projects" className="hover:text-theme-heading transition-colors">Projects</a>
            <a href="#education" className="hover:text-theme-heading transition-colors">Education</a>
            <a href="#contact" className="hover:text-theme-heading transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-theme-card hover:bg-theme-input text-theme-text border border-theme-border rounded-xl transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-500 animate-pulse" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

            <button
              onClick={() => setShowPDF(true)}
              className="flex items-center gap-1.5 bg-theme-card hover:bg-theme-input text-theme-text text-xs font-semibold px-4 py-2 rounded-xl border border-theme-border transition-all duration-300"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Print/Export CV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative z-10">
        
        {/* HERO SECTION - BENTO GRID START */}
        <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-6 fade-in">
          
          {/* PROFILE / DETAILS CARD (5 Cols) */}
          <div className="lg:col-span-5 bg-theme-card border border-theme-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-6">
              {/* Profile Pic & Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-2xl border-2 border-theme-border shadow-md object-cover bg-theme-input"
                />
                <div className="text-center sm:text-left space-y-1">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <span className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-pulse shrink-0" />
                    Available for Role
                  </span>
                  <h1 className="text-2xl font-extrabold tracking-tight text-theme-heading mt-1.5 font-display">
                    {DATA.name}
                  </h1>
                  <p className="text-xs text-theme-text-muted leading-relaxed font-light">
                    Full Stack Developer & Frontend Lead
                  </p>
                </div>
              </div>

              {/* Bio description */}
              <p className="text-xs text-theme-text font-light leading-relaxed">
                {DATA.description}
              </p>

              {/* Quick Details List */}
              <div className="space-y-3 pt-4 border-t border-theme-border text-xs">
                <div className="flex items-center gap-3 text-theme-text-muted">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <a
                    href={DATA.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors flex items-center gap-1"
                  >
                    {DATA.location}
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
                <div className="flex items-center gap-3 text-theme-text-muted">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <a href={`mailto:${DATA.contact.email}`} className="hover:text-blue-400 transition-colors">
                    {DATA.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-theme-text-muted">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <a href={`tel:${DATA.contact.tel}`} className="hover:text-blue-400 transition-colors">
                    {DATA.contact.tel}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links Panel */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-theme-border">
              <div className="flex items-center gap-3">
                <a
                  href={DATA.contact.social.GitHub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-theme-input hover:bg-theme-card text-theme-text-muted hover:text-theme-heading rounded-xl border border-theme-border transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-theme-input hover:bg-theme-card text-theme-text-muted hover:text-theme-heading rounded-xl border border-theme-border transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href={DATA.contact.social.googleDrive.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-theme-input hover:bg-theme-card text-theme-text-muted hover:text-theme-heading rounded-xl border border-theme-border transition-colors"
                  title="View Resume Document"
                >
                  <FileText className="w-4.5 h-4.5" />
                </a>
              </div>
              <a
                href="#contact"
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                Hire Renga
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* DETAILED PROFESSIONAL SUMMARY (7 Cols) */}
          <div className="lg:col-span-7 bg-theme-card border border-theme-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-theme-heading flex items-center gap-2 font-display">
                <Briefcase className="w-5 h-5 text-blue-500" />
                Professional Summary & Focus
              </h2>
              <div className="space-y-4">
                <p className="text-sm text-theme-text font-light leading-relaxed">
                  {DATA.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-theme-input border border-theme-border p-4 rounded-2xl space-y-1 text-center sm:text-left">
                    <span className="text-2xl font-bold text-blue-500 font-mono">3+</span>
                    <span className="block text-[11px] text-theme-text-muted font-mono">YEARS EXPERIENCE</span>
                  </div>
                  <div className="bg-theme-input border border-theme-border p-4 rounded-2xl space-y-1 text-center sm:text-left">
                    <span className="text-2xl font-bold text-indigo-400 font-mono">10+</span>
                    <span className="block text-[11px] text-theme-text-muted font-mono">TEAM MEMBERS LED</span>
                  </div>
                  <div className="bg-theme-input border border-theme-border p-4 rounded-2xl space-y-1 text-center sm:text-left">
                    <span className="text-2xl font-bold text-emerald-400 font-mono">9+</span>
                    <span className="block text-[11px] text-theme-text-muted font-mono">AI & WEB PRODUCTS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio FAQ Callout Box */}
            <div className="mt-6 p-4 bg-theme-input border border-theme-border rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                  <HelpCircle className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-theme-heading">Have specific questions?</h4>
                  <p className="text-[11px] text-theme-text-muted">Explore the interactive Portfolio FAQ Guide.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const btn = document.getElementById("ai-floating-btn");
                  if (btn) btn.click();
                }}
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-2 rounded-xl transition-colors w-full sm:w-auto"
              >
                Open Portfolio FAQ
              </button>
            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE SECTION */}
        <section id="experience" className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-theme-border pb-3">
            <h2 className="text-xl font-bold tracking-tight text-theme-heading flex items-center gap-2 font-display">
              <Briefcase className="w-5.5 h-5.5 text-blue-500" />
              Professional Timeline
            </h2>
            <span className="text-xs text-theme-text-muted font-mono">1 ROLE / LEADERSHIP</span>
          </div>

          <div className="bg-theme-card border border-theme-border rounded-3xl p-6 sm:p-8 space-y-6">
            {DATA.work.map((w) => (
              <div key={w.company} className="relative pl-0 sm:pl-4 space-y-4">
                {/* Job header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border pb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={w.logoUrl}
                      alt={w.company}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-contain bg-theme-input border border-theme-border p-1"
                    />
                    <div>
                      <h3 className="font-bold text-base text-theme-heading">{w.title}</h3>
                      <p className="text-xs text-theme-text-muted font-medium">
                        <a href={w.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                          {w.company}
                        </a>{" "}
                        | {w.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-0">
                    <span className="text-[11px] font-mono text-theme-text-muted bg-theme-input border border-theme-border px-3 py-1 rounded-full shrink-0">
                      {w.start} — {w.end}
                    </span>
                    {w.badges?.map((badge) => (
                      <span
                        key={badge}
                        className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full shrink-0"
                      >
                        <Award className="w-3.5 h-3.5" />
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description details */}
                <div className="space-y-4">
                  <p className="text-xs text-theme-text leading-relaxed font-light">
                    As Frontend Team Lead, I owned features end-to-end and coordinated agile releases. Below is an overview of the key impact highlights:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li className="bg-theme-input border border-theme-border p-4 rounded-2xl flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-theme-text-muted leading-normal font-light">
                        <strong className="text-theme-heading block mb-0.5">Team Leadership (10 Devs)</strong>
                        Conducted code reviews, defined UI architecture standards, and improved sprint delivery speed by 30%.
                      </p>
                    </li>
                    <li className="bg-theme-input border border-theme-border p-4 rounded-2xl flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-theme-text-muted leading-normal font-light">
                        <strong className="text-theme-heading block mb-0.5">AI chatbot & OCR parsing</strong>
                        Architected an AI-powered chatbot for insurance domain integrating OpenAI API and OCR-based parsing, reducing manual data entry effort by 40%.
                      </p>
                    </li>
                    <li className="bg-theme-input border border-theme-border p-4 rounded-2xl flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-theme-text-muted leading-normal font-light">
                        <strong className="text-theme-heading block mb-0.5">Performance (96 Lighthouse)</strong>
                        Optimized application loads using code splitting, lazy loading, and rendering optimizations, reaching Lighthouse scores of 96.
                      </p>
                    </li>
                    <li className="bg-theme-input border border-theme-border p-4 rounded-2xl flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-theme-text-muted leading-normal font-light">
                        <strong className="text-theme-heading block mb-0.5">IAM access governance</strong>
                        Built role-based access control systems implemented company-wide for secure access management.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE SKILL MATRIX */}
        <section id="skills" className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-theme-border pb-3">
            <h2 className="text-xl font-bold tracking-tight text-theme-heading flex items-center gap-2 font-display">
              <Award className="w-5.5 h-5.5 text-blue-500" />
              Technical Skill Matrix
            </h2>
            <span className="text-xs text-theme-text-muted font-mono">INTERACTIVE FILTERING</span>
          </div>

          <div className="bg-theme-card border border-theme-border rounded-3xl p-6 sm:p-8">
            <SkillCluster skills={DATA.skills} />
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-theme-border pb-3 gap-4">
            <h2 className="text-xl font-bold tracking-tight text-theme-heading flex items-center gap-2 font-display">
              <Flame className="w-5.5 h-5.5 text-blue-500" />
              Developer Project Showroom
            </h2>
            
            {/* Filters */}
            <div className="flex md:flex-wrap items-center gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 no-print scrollbar-none w-full md:w-auto">
              {(["all", "ai", "fullstack", "client"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setProjectFilter(filter)}
                  className={`text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                    projectFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-theme-input text-theme-text-muted hover:text-theme-heading"
                  }`}
                >
                  {filter === "all" ? "All Works" : filter === "ai" ? "AI/ML Integrations" : filter === "fullstack" ? "Full Stack" : "Client-Side SPAs"}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS BENTO */}
        <section id="education" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Education Columns (7 Cols) */}
          <div className="lg:col-span-7 bg-theme-card border border-theme-border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-theme-heading flex items-center gap-2 border-b border-theme-border pb-3 font-display">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              Academic Foundations
            </h2>
            <div className="space-y-6">
              {DATA.education.map((edu) => (
                <div key={edu.school} className="flex gap-4">
                  {edu.logoUrl && (
                    <div className="w-11 h-11 rounded-xl bg-theme-input border border-theme-border overflow-hidden flex items-center justify-center shrink-0">
                      {edu.logoUrl.startsWith("data:") ? (
                        <div className="w-7 h-7 bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold rounded text-sm">CS</div>
                      ) : (
                        <img src={edu.logoUrl} alt={edu.school} referrerPolicy="no-referrer" className="w-8 h-8 object-contain" />
                      )}
                    </div>
                  )}
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-theme-heading">{edu.degree}</h3>
                    <p className="text-xs text-theme-text-muted">
                      <a href={edu.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                        {edu.school}
                      </a>
                    </p>
                    <span className="text-[10px] font-mono text-theme-text-muted block">
                      {edu.start} — {edu.end}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications (5 Cols) */}
          <div className="lg:col-span-5 bg-theme-card border border-theme-border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-theme-heading flex items-center gap-2 border-b border-theme-border pb-3 font-display">
              <Award className="w-5 h-5 text-blue-500" />
              Certifications
            </h2>
            <div className="space-y-5">
              {DATA.certifications.map((cert) => (
                <div key={cert.title} className="flex items-start gap-3">
                  <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-theme-heading">{cert.title}</h3>
                    <p className="text-[11px] text-theme-text-muted">{cert.issuer}</p>
                    <span className="text-[9px] font-mono text-theme-text-muted">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUICK SECURE CONTACT & MESSAGE SENDER */}
        <section id="contact" className="bg-theme-card border border-theme-border rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            
            {/* Direct Channels (2 Cols) */}
            <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Info className="w-3 h-3" />
                  No Backend Required
                </span>
                <h2 className="text-xl font-bold tracking-tight text-theme-heading font-display">Get in touch with Renga</h2>
                <p className="text-xs text-theme-text-muted leading-relaxed">
                  Want to collaborate, discuss a Full Stack role, or hire Renga? 
                  Use this secure form to compile a draft directly inside your favorite local or web mail application.
                </p>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-theme-input border border-theme-border p-4 rounded-2xl space-y-3.5">
                <span className="block text-[9px] font-mono text-theme-text-muted uppercase tracking-wider">
                  DIRECT CONTACT INFO
                </span>
                
                <div className="space-y-2">
                  <button
                    onClick={handleCopyEmail}
                    className="w-full flex items-center justify-between gap-2.5 text-xs bg-theme-card hover:bg-theme-input text-theme-text hover:text-theme-heading border border-theme-border hover:border-blue-400/40 px-3.5 py-2.5 rounded-xl transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="font-mono text-[11px] truncate">{DATA.contact.email}</span>
                    </span>
                    {copiedEmail ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 font-mono">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-theme-text-muted hover:text-theme-heading transition-colors shrink-0" />
                    )}
                  </button>

                  <a
                    href={`tel:${DATA.contact.tel}`}
                    className="w-full flex items-center justify-between gap-2.5 text-xs bg-theme-card hover:bg-theme-input text-theme-text hover:text-theme-heading border border-theme-border hover:border-blue-400/40 px-3.5 py-2.5 rounded-xl transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-indigo-400" />
                      <span className="font-mono text-[11px]">{DATA.contact.tel}</span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-theme-text-muted" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Prefilled Draft Form (3 Cols) */}
            <form onSubmit={handleContactSubmit} className="md:col-span-3 space-y-4 bg-theme-card/30 border border-theme-border p-5 sm:p-6 rounded-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-theme-text-muted uppercase tracking-wide">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-theme-input border border-theme-border rounded-xl px-3.5 py-2.5 text-xs text-theme-heading placeholder-theme-text-muted/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-theme-text-muted uppercase tracking-wide">Your Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-theme-input border border-theme-border rounded-xl px-3.5 py-2.5 text-xs text-theme-heading placeholder-theme-text-muted/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-theme-text-muted uppercase tracking-wide">Write Message</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Tell me what you're working on..."
                  className="w-full bg-theme-input border border-theme-border rounded-xl px-3.5 py-2.5 text-xs text-theme-heading placeholder-theme-text-muted/60 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-light"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.99]"
              >
                <Send className="w-3.5 h-3.5" />
                Draft & Open Email Client
              </button>

              {contactSuccess && (
                <div className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-xl text-center text-emerald-400 text-xs leading-normal">
                  <p className="font-semibold">✉️ Draft compiled successfully!</p>
                  <p className="text-[11px] text-emerald-500 mt-0.5">
                    Your local email client has been launched with the pre-filled inquiry.
                  </p>
                </div>
              )}
            </form>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-theme-input border-t border-theme-border py-8 text-center text-theme-text-muted text-xs font-mono no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Renga Nathan A. All rights reserved.</p>
          <div className="flex gap-4">
            <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noopener noreferrer" className="hover:text-theme-heading">GitHub</a>
            <a href={DATA.contact.social.LinkedIn.url} target="_blank" rel="noopener noreferrer" className="hover:text-theme-heading">LinkedIn</a>
            <a href={`mailto:${DATA.contact.email}`} className="hover:text-theme-heading">Email</a>
          </div>
        </div>
      </footer>

      {/* AI Bot and Printable CV Overlays */}
      <AIAssistant />
      
      {showPDF && (
        <ResumePDFView data={DATA} onClose={() => setShowPDF(false)} />
      )}
    </div>
  );
}
