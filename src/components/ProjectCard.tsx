import React from "react";
import { FolderGit2, ExternalLink, Sparkles, Flame, CheckCircle, Clock } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  key?: string;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Check if project has links
  const hasLinks = project.links && project.links.length > 0;
  
  // Custom project badges for outstanding items
  const isAI = project.technologies.some(t => 
    t.includes("Gemini") || t.includes("OpenAI") || t.includes("BERT") || t.includes("OCR")
  ) || project.title.toLowerCase().includes("ai") || project.title.toLowerCase().includes("story");
  
  const isHot = project.title === "Node Hub" || project.title === "Racket Hub";

  return (
    <div
      id={`project-card-${project.title.toLowerCase().replace(/\s+/g, "-")}`}
      className="group relative flex flex-col justify-between bg-theme-card border border-theme-border rounded-2xl p-5 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-950/10 transition-all duration-300"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

      <div className="space-y-4 relative z-10">
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-theme-input text-blue-500 rounded-xl border border-theme-border group-hover:text-blue-600 transition-colors">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-theme-heading text-base leading-snug tracking-tight group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-[11px] font-mono text-theme-text-muted flex items-center gap-1 mt-0.5">
                {project.dates.includes("Development") || project.dates.includes("Upcoming") ? (
                  <Clock className="w-3 h-3 text-amber-500" />
                ) : (
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                )}
                {project.dates}
              </p>
            </div>
          </div>

          {/* Badge Indicators */}
          <div className="flex gap-1.5">
            {isAI && (
              <span className="flex items-center gap-0.5 text-[9px] font-semibold font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                AI
              </span>
            )}
            {isHot && (
              <span className="flex items-center gap-0.5 text-[9px] font-semibold font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Flame className="w-2.5 h-2.5 animate-pulse" />
                Feature
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-theme-text leading-relaxed font-light">
          {project.description}
        </p>
      </div>

      {/* Tech Stack & Links */}
      <div className="mt-5 space-y-4 relative z-10">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-theme-input text-theme-text-muted border border-theme-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        {(project.href || hasLinks) && (
          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-theme-border no-print">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {project.links &&
              project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-theme-text-muted hover:text-theme-heading transition-colors"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  {link.type}
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
