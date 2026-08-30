import React from "react";
import { ArrowRight, Check, ExternalLink, Sparkles, TrendingUp, X } from "lucide-react";
import { RollText } from "./ui-bits";

export interface CaseStudyData {
  id: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  videoUrl?: string;
  imageUrl?: string;
  metrics: { label: string; value: string; change: string }[];
  challenge: string;
  solution: string;
  outcomes: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

interface CaseStudyModalProps {
  study: CaseStudyData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
}

export function CaseStudyModal({ study, isOpen, onClose, onBookCall }: CaseStudyModalProps) {
  if (!isOpen || !study) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[28px] sm:rounded-[38px] bg-[#0E1015] border border-white/15 text-white shadow-[0_35px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#F26522]/20 blur-[100px]" />

        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0E1015]/95 backdrop-blur-md px-5 sm:px-8 py-3.5 sm:py-4">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F26522] px-3 py-1 rounded-full bg-[#F26522]/15 border border-[#F26522]/30 shadow-sm">
              {study.category}
            </span>
            <span className="text-white/40">•</span>
            <span className="text-[13px] font-medium text-white/70">{study.title}</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Media / Video */}
          <div className="relative aspect-video w-full rounded-[30px] overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
            {study.videoUrl ? (
              <video
                src={study.videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : study.imageUrl ? (
              <img src={study.imageUrl} alt={study.title} className="w-full h-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
              <div>
                <h3 className="text-[22px] sm:text-[28px] font-bold text-white tracking-tight">
                  {study.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-white/80">{study.tagline}</p>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="p-5 rounded-[26px] bg-white/5 border border-white/10 flex flex-col justify-between shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-white/60 font-medium">{m.label}</span>
                  <span className="flex items-center text-[11px] font-bold text-[#F26522] bg-[#F26522]/10 px-2 py-0.5 rounded-full">
                    <TrendingUp size={11} className="mr-1" />
                    {m.change}
                  </span>
                </div>
                <p className="mt-3 text-[26px] font-extrabold text-white tracking-tight">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/10 space-y-3 shadow-inner">
              <h4 className="text-[14px] font-semibold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm" />
                The Constraint & Challenge
              </h4>
              <p className="text-[13px] leading-relaxed text-white/70">{study.challenge}</p>
            </div>
            <div className="p-6 rounded-[28px] bg-white/[0.03] border border-white/10 space-y-3 shadow-inner">
              <h4 className="text-[14px] font-semibold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26522] shadow-sm" />
                The Axionis Architecture
              </h4>
              <p className="text-[13px] leading-relaxed text-white/70">{study.solution}</p>
            </div>
          </div>

          {/* Key Deliverables & Outcomes */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-white">Impact & Execution Cadence</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {study.outcomes.map((o) => (
                <div
                  key={o}
                  className="flex items-center gap-3 text-[13px] text-white/80 p-3.5 rounded-full bg-white/5 border border-white/5"
                >
                  <span className="h-5 w-5 rounded-full bg-[#F26522]/15 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-[#F26522]" />
                  </span>
                  <span>{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote if present */}
          {study.testimonial && (
            <div className="p-6 rounded-[28px] bg-[#F26522]/10 border border-[#F26522]/20 shadow-[0_10px_30px_-10px_rgba(242,101,34,0.3)]">
              <div className="flex items-center gap-2 text-[#F26522] mb-2">
                <Sparkles size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Client Verdict
                </span>
              </div>
              <p className="text-[14px] font-medium text-white italic">
                “{study.testimonial.quote}”
              </p>
              <p className="mt-3 text-[12px] text-white/60">
                <strong className="text-white">{study.testimonial.author}</strong> —{" "}
                {study.testimonial.role}
              </p>
            </div>
          )}

          {/* CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-[13.5px] font-semibold text-white">
                Ready to replicate these outcomes?
              </p>
              <p className="text-[12px] text-white/50">
                Schedule a teardown of your current funnel.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] font-semibold rounded-full pl-6 pr-2 py-2.5 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all w-full sm:w-auto justify-center"
            >
              <RollText label="Book a Strategy Call" />
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:-rotate-45 transition-transform shadow-sm">
                <ArrowRight size={13} className="text-[#F26522]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
