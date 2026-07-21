import React from "react";
import { Download, Printer, X, Mail, Phone, MapPin, Globe, Award } from "lucide-react";
import { PortfolioData } from "../types";

interface ResumePDFViewProps {
  data: PortfolioData;
  onClose: () => void;
}

export default function ResumePDFView({ data, onClose }: ResumePDFViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-[#07090ebd]/90 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex flex-col items-center">
      {/* Control Buttons */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 no-print">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-sm font-semibold text-white tracking-wide">Interactive Printable Resume Sheet</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-900/30 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* The Paper Resume Container */}
      <div
        id="printable-resume-container"
        className="w-full max-w-4xl bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl relative border border-slate-200 card-print animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-200 pb-6 mb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
              {data.name}
            </h1>
            <p className="text-blue-600 font-semibold text-sm tracking-wide">
              Full Stack Developer & Frontend Team Lead
            </p>
            <p className="text-slate-500 text-xs flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {data.location}
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-left md:text-right space-y-1 text-xs text-slate-600 font-mono">
            <p className="flex items-center md:justify-end gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <a href={`mailto:${data.contact.email}`} className="hover:underline">{data.contact.email}</a>
            </p>
            <p className="flex items-center md:justify-end gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <a href={`tel:${data.contact.tel}`} className="hover:underline">{data.contact.tel}</a>
            </p>
            <p className="flex items-center md:justify-end gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <a href={data.url} target="_blank" rel="noopener noreferrer" className="hover:underline">renganathan21.github.io</a>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Professional Summary */}
            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-display">
                Professional Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {data.summary}
              </p>
            </section>

            {/* Work Experience */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-display">
                Professional Experience
              </h2>
              {data.work.map((w) => (
                <div key={w.company} className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{w.title}</h3>
                      <p className="text-xs text-slate-600 font-medium">{w.company} | {w.location}</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                      {w.start} — {w.end}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-2 border-l-2 border-blue-100">
                    {w.description}
                  </p>
                </div>
              ))}
            </section>

            {/* Featured Projects */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-display">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.projects.slice(0, 4).map((p) => (
                  <div key={p.title} className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-xs font-bold text-slate-900">{p.title}</h3>
                      <span className="text-[9px] font-mono text-slate-500">{p.dates}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {p.description}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500">
                      Technologies: {p.technologies.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Skills */}
            <section className="space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-display">
                Key Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200/60 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-display">
                Education
              </h2>
              {data.education.map((e) => (
                <div key={e.school} className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-900 leading-snug">{e.degree}</h3>
                  <p className="text-[11px] text-slate-600 leading-tight">{e.school}</p>
                  <p className="text-[10px] font-mono text-slate-400">
                    {e.start} — {e.end}
                  </p>
                </div>
              ))}
            </section>

            {/* Certifications */}
            <section className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 font-display">
                Certifications
              </h2>
              {data.certifications.map((c) => (
                <div key={c.title} className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">{c.title}</h3>
                  <p className="text-[11px] text-slate-500">{c.issuer} | {c.date}</p>
                </div>
              ))}
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono flex items-center justify-between">
          <span>Generated via Renga Nathan A Portfolio App</span>
          <span>Tirunelveli, Tamil Nadu</span>
        </div>
      </div>
    </div>
  );
}
