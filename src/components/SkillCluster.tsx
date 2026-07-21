import React, { useState } from "react";
import { Sparkles, Code2, Server, Database, Hammer, ShieldCheck, Terminal, Award } from "lucide-react";

interface SkillClusterProps {
  skills: string[];
}

export default function SkillCluster({ skills }: SkillClusterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "All Skills", icon: Terminal },
    { id: "AI", label: "AI & ML", icon: Sparkles },
    { id: "Frontend", label: "Frontend & UI", icon: Code2 },
    { id: "Backend", label: "Backend & API", icon: Server },
    { id: "Database", label: "Database & Cloud", icon: Database },
    { id: "DevOps", label: "DevOps & Tools", icon: Hammer },
    { id: "Other", label: "Languages & Lead", icon: ShieldCheck },
  ];

  // Logic to categorize skills
  const getSkillCategory = (skill: string): string => {
    const s = skill.toLowerCase();
    
    if (s.includes("openai") || s.includes("dialogflow") || s.includes("bert") || s.includes("ocr")) {
      return "AI";
    }
    if (
      s.includes("react") ||
      s.includes("next.js") ||
      s.includes("redux") ||
      s.includes("context api") ||
      s.includes("query") ||
      s.includes("tailwind") ||
      s.includes("bootstrap") ||
      s.includes("mui") ||
      s.includes("html5") ||
      s.includes("css3") ||
      s.includes("javascript") ||
      s.includes("typescript") ||
      s.includes("primereact")
    ) {
      return "Frontend";
    }
    if (
      s.includes("node") ||
      s.includes("express") ||
      s.includes("rest api") ||
      s.includes("websocket") ||
      s.includes("socket.io") ||
      s.includes("graphql") ||
      s.includes("spring boot")
    ) {
      return "Backend";
    }
    if (
      s.includes("mongodb") ||
      s.includes("postgresql") ||
      s.includes("sql") ||
      s.includes("firebase") ||
      s.includes("supabase") ||
      s.includes("azure")
    ) {
      return "Database";
    }
    if (
      s.includes("git") ||
      s.includes("vite") ||
      s.includes("docker") ||
      s.includes("ci/cd") ||
      s.includes("postman") ||
      s.includes("agile") ||
      s.includes("code review") ||
      s.includes("optimization")
    ) {
      return "DevOps";
    }
    return "Other"; // Includes Java, Python, Team Leadership, etc.
  };

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === "All") return true;
    return getSkillCategory(skill) === activeCategory;
  });

  return (
    <div id="skills-section" className="space-y-6">
      {/* Category Tabs */}
      <div className="flex md:flex-wrap items-center gap-2 pb-3 overflow-x-auto md:overflow-x-visible no-print scrollbar-none">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium tracking-wide transition-all shrink-0 ${
                isActive
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm shadow-blue-500/10"
                  : "bg-slate-900 text-slate-400 border border-slate-800/80 hover:bg-slate-850 hover:text-slate-200"
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredSkills.map((skill) => {
          const cat = getSkillCategory(skill);
          
          // Custom tag colors depending on categorized tag
          let tagColor = "border-slate-800 bg-[#121620] text-slate-300";
          let badgeText = "";
          
          if (cat === "AI") {
            tagColor = "border-amber-500/20 bg-amber-950/10 text-amber-300";
            badgeText = "AI/ML";
          } else if (cat === "Frontend") {
            tagColor = "border-sky-500/20 bg-sky-950/10 text-sky-300";
          } else if (cat === "Backend") {
            tagColor = "border-indigo-500/20 bg-indigo-950/10 text-indigo-300";
          } else if (cat === "Database") {
            tagColor = "border-emerald-500/20 bg-emerald-950/10 text-emerald-300";
          } else if (skill.includes("Team Leadership") || skill.includes("Rising Star")) {
            tagColor = "border-rose-500/20 bg-rose-950/10 text-rose-300";
            badgeText = "Lead";
          }

          return (
            <div
              key={skill}
              className={`flex flex-col justify-between p-3 rounded-xl border text-xs font-medium transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-950/50 ${tagColor}`}
            >
              <span className="text-[12px]">{skill}</span>
              {badgeText && (
                <span className="mt-1.5 inline-block w-max text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
                  {badgeText}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
