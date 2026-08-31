import React from "react";
import { Check, X, Sparkles, Shield, Zap } from "lucide-react";

interface ComparisonRow {
  aspect: string;
  traditional: string;
  axionis: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    aspect: "Team Composition",
    traditional: "Pitched by executives, handed off to junior coordinators.",
    axionis: "100% senior operators with audited 8+ figure track records.",
  },
  {
    aspect: "Measurement & Truth",
    traditional: "Vanity impressions, blended ROAS guesswork, fragmented dashboards.",
    axionis: "Warehouse-native attribution (Snowflake/BigQuery) & first-order contribution margin.",
  },
  {
    aspect: "Shipping Cadence",
    traditional: "Slow monthly reviews and bureaucratic change approvals.",
    axionis: "Weekly rapid experiment & creative production sprints.",
  },
  {
    aspect: "Stack Ownership",
    traditional: "Disjointed vendors for media, creative, SEO, and web engineering.",
    axionis: "One synchronized squad owning the entire full-funnel growth engine.",
  },
  {
    aspect: "Commercial Terms",
    traditional: "Rigid 12-month lock-ins with hidden percentage-of-spend markups.",
    axionis: "Deterministic 90-day diagnostic sprints rolling monthly thereafter.",
  },
];

export function ComparisonMatrix({ className = "" }: { className?: string }) {
  return (
    <section
      className={`relative overflow-hidden rounded-[38px] bg-[#0E1015] text-white p-6 sm:p-10 lg:p-14 border border-white/10 shadow-[0_35px_90px_-25px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.2)] ${className}`}
    >
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#F26522]/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-[130px]" />

      <div className="relative max-w-2xl mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 bg-white/5 backdrop-blur-md text-[12px] font-semibold text-[#F26522] mb-4">
          <Shield size={13} />
          <span>The Operator Advantage</span>
        </div>
        <h2 className="text-[clamp(1.7rem,4.5vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
          Why Category Leaders Choose Axionis
        </h2>
        <p className="mt-4 text-[15px] text-white/65 leading-relaxed">
          We eliminated the overhead, junior hand-offs, and vanity metrics of traditional agencies
          to build a high-velocity revenue engine.
        </p>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="relative overflow-x-auto">
        <div className="min-w-[680px] space-y-3">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white/40">
            <div className="col-span-3">Dimension</div>
            <div className="col-span-4">Traditional Agency Model</div>
            <div className="col-span-5 text-[#F26522]">Axionis Growth Squad</div>
          </div>

          {/* Rows */}
          {COMPARISONS.map((row, idx) => (
            <div
              key={row.aspect}
              className={`grid grid-cols-12 gap-4 items-center p-5 sm:p-6 rounded-[24px] border transition-all duration-300 ${
                idx % 2 === 0 ? "bg-white/[0.04] border-white/10" : "bg-white/[0.02] border-white/5"
              } hover:bg-white/[0.07] hover:border-white/20`}
            >
              <div className="col-span-3 font-semibold text-[14.5px] text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                {row.aspect}
              </div>
              <div className="col-span-4 text-[13.5px] text-white/50 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                  <X size={12} />
                </span>
                <span>{row.traditional}</span>
              </div>
              <div className="col-span-5 text-[14px] font-medium text-white/95 flex items-start gap-2.5 bg-[#F26522]/10 p-3 rounded-[18px] border border-[#F26522]/20">
                <span className="w-5 h-5 rounded-full bg-[#F26522] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                <span>{row.axionis}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
