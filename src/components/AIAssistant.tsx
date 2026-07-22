import React, { useState, useRef, useEffect } from "react";
import { X, HelpCircle, Loader2, RefreshCw, ChevronRight, ArrowRight, CornerDownRight } from "lucide-react";
import { ChatMessage } from "../types";

interface InteractiveQA {
  question: string;
  answer: string;
  actionText?: string;
  targetAnchor?: string;
}

const FAQ_DATA: InteractiveQA[] = [
  {
    question: "What is Renga's core technical expertise?",
    answer: "Renga is a highly skilled Full Stack Developer specializing in the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Next.js. He excels in building high-performance, responsive frontends paired with resilient, scalable backend REST APIs.",
    actionText: "View Technical Skills Matrix",
    targetAnchor: "#skills",
  },
  {
    question: "Tell me about his frontend team leadership role.",
    answer: "At Vivant360 Software Services, Renga leads a frontend engineering team of 10 developers. He sets UI architecture standards, conducts rigorous code reviews, and mentors junior devs, which improved sprint delivery consistency by 30%.",
    actionText: "View Work Experience Detail",
    targetAnchor: "#experience",
  },
  {
    question: "What major AI & ML products has he built?",
    answer: "He architected an AI-powered chatbot for the insurance domain integrating OpenAI APIs and OCR-based document parsing, reducing manual data entry by 40%. He also built 'Story Forge', which utilizes Google Gemini API for dynamic story creation.",
    actionText: "View Story Forge Project",
    targetAnchor: "#project-card-story-forge",
  },
  {
    question: "What is the 'Node Hub' project?",
    answer: "Node Hub is a relationship-first group task and expense tracker PWA where groups (families, roommates) manage shared tasks and expense splits. It is built with React, Tailwind, Node.js, and Supabase (Postgres, Auth, Storage).",
    actionText: "View Node Hub in Showroom",
    targetAnchor: "#project-card-node-hub",
  },
  {
    question: "How can I contact Renga for hire or collaboration?",
    answer: "You can send an email directly to sathishsatish2002@gmail.com, call him at +91 8072740113, or fill out the quick contact form right below on this portfolio.",
    actionText: "Go to Contact Form",
    targetAnchor: "#contact",
  },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! I am Renga's automated portfolio representative. Click any of the topics below to instantly find specific answers, or scroll directly to my sections!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSelectQuestion = (qa: InteractiveQA) => {
    if (isLoading) return;

    // 1. Add User Question
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      text: qa.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // 2. Simulate short lag delay to look dynamic and premium
    setTimeout(() => {
      // Create a text payload that might include the custom action metadata
      let answerText = qa.answer;
      if (qa.actionText && qa.targetAnchor) {
        // We append a special suffix to parse out or render
        answerText += `\n\n[ACTION:${qa.actionText}:${qa.targetAnchor}]`;
      }

      const modelMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: "model",
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
      setIsLoading(false);
    }, 450);
  };

  const handleScrollToSection = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Add a subtle highlight flash or scale class if needed
      element.classList.add("ring-2", "ring-blue-500/50", "duration-1000");
      setTimeout(() => {
        element.classList.remove("ring-2", "ring-blue-500/50");
      }, 1500);
      
      // Close chatbot window for clear view
      setIsOpen(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "Hello! I am Renga's portfolio interactive guide. Click any of the frequently asked questions below to instantly find specific answers, or navigate directly to different sections of the portfolio!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Backdrop overlay to prevent covering details and allow quick dismiss by clicking outside */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#07090e]/70 backdrop-blur-[2px] z-[45] no-print animate-in fade-in duration-200"
        />
      )}

      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[50] no-print transition-all duration-300 ${isOpen ? "left-4 sm:left-auto" : ""}`}>
        {/* Floating Action Button */}
        {!isOpen && (
        <button
          id="ai-floating-btn"
          onClick={() => setIsOpen(true)}
          className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium w-12 h-12 sm:w-auto sm:h-auto sm:px-5 sm:py-3.5 rounded-full shadow-lg shadow-blue-900/40 hover:shadow-blue-500/30 transition-all duration-300 scale-100 hover:scale-105 active:scale-95 border border-blue-400/20 shrink-0"
        >
          <HelpCircle className="w-5 h-5 text-blue-100 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
          <span className="text-sm font-semibold tracking-wide hidden sm:inline shrink-0">Quick Portfolio FAQ</span>
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </button>
      )}

      {/* Slide-out Chat Drawer / Dialog - Viewport Heights strictly limited */}
      {isOpen && (
        <div
          id="ai-chat-panel"
          className="flex flex-col w-full sm:w-[400px] h-[min(500px,75vh)] bg-theme-card border border-theme-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-theme-input border-b border-theme-border">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg">
                <HelpCircle className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-theme-heading">Interactive FAQ Guide</h3>
                <span className="text-[10px] text-blue-400 font-mono flex items-center gap-1">
                  Interactive Quick Guide
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={clearChat}
                title="Reset conversation history"
                className="p-1.5 text-theme-text-muted hover:text-theme-heading rounded-lg hover:bg-theme-input transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-theme-text-muted hover:text-theme-heading rounded-lg hover:bg-theme-input transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-theme-bg">
            {messages.map((m) => {
              // Parse out custom Action buttons if present in text
              let displayBody = m.text;
              let actionData: { text: string; anchor: string } | null = null;
              
              if (m.text.includes("[ACTION:")) {
                const parts = m.text.split("[ACTION:");
                displayBody = parts[0].trim();
                const actionMeta = parts[1].replace("]", "").trim().split(":");
                if (actionMeta.length >= 2) {
                  actionData = {
                    text: actionMeta[0],
                    anchor: actionMeta[1],
                  };
                }
              }

              return (
                <div
                  key={m.id}
                  className={`flex flex-col max-w-[90%] ${
                    m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-theme-card text-theme-text border border-theme-border rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{displayBody}</p>

                    {/* Quick navigation anchor trigger inside answers */}
                    {actionData && (
                      <button
                        onClick={() => handleScrollToSection(actionData!.anchor)}
                        className="mt-3.5 w-full flex items-center justify-between gap-2 text-[11px] font-semibold font-mono bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-500/30 px-3 py-2 rounded-lg transition-all text-left"
                      >
                        <span className="flex items-center gap-1">
                          <CornerDownRight className="w-3.5 h-3.5 shrink-0" />
                          {actionData.text}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                      </button>
                    )}
                  </div>
                  <span className="text-[8px] text-theme-text-muted mt-1 font-mono">{m.timestamp}</span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-theme-text-muted text-xs px-3 py-2 bg-theme-card border border-theme-border rounded-xl w-max">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span className="text-[11px]">Finding matching response...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick FAQ Interactive Options (Replacing manual typing form completely) */}
          <div className="p-3 bg-theme-input border-t border-theme-border flex flex-col gap-1.5 shrink-0">
            <span className="text-[9px] font-bold font-mono text-theme-text-muted uppercase tracking-wider px-1">
              CHOOSE A TOPIC TO ASK
            </span>
            <div className="max-h-[140px] overflow-y-auto space-y-1.5 pr-1">
              {FAQ_DATA.map((faq) => {
                const alreadyAsked = messages.some((m) => m.role === "user" && m.text === faq.question);
                return (
                  <button
                    key={faq.question}
                    onClick={() => handleSelectQuestion(faq)}
                    disabled={isLoading || alreadyAsked}
                    className={`w-full text-left text-[11px] px-3 py-2 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                      alreadyAsked
                        ? "bg-theme-bg/40 text-theme-text-muted/60 border-theme-border/50 cursor-not-allowed"
                        : "bg-theme-card hover:bg-theme-input text-theme-text hover:text-theme-heading border-theme-border hover:border-blue-500/30 active:scale-[0.98]"
                    }`}
                  >
                    <span className="truncate">{faq.question}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-theme-text-muted shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

