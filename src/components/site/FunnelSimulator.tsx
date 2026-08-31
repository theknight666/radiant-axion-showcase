import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cpu,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Zap,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-fx";
import { RollText } from "./ui-bits";

interface Lever {
  id: string;
  name: string;
  category: string;
  description: string;
  impact: string;
  enabled: boolean;
}

interface FunnelSimulatorProps {
  onBookCall?: () => void;
  className?: string;
}

export function FunnelSimulator({ onBookCall, className = "" }: FunnelSimulatorProps) {
  const [levers, setLevers] = useState<Lever[]>([
    {
      id: "creative",
      name: "40 Weekly Creative Sprint Variations",
      category: "Paid Media Engine",
      description: "Direct-response motion hooks, pain-frame teardowns, and creator assets.",
      impact: "+140% Top-of-Funnel CTR",
      enabled: true,
    },
    {
      id: "webgl",
      name: "Sub-Second WebGL High-Intent Storefront",
      category: "Conversion Engineering",
      description: "Progressive WebGL product showcase with 99 Core Web Vitals.",
      impact: "+85% On-Site Conversion",
      enabled: true,
    },
    {
      id: "capi",
      name: "Snowflake Server-Side CAPI Infrastructure",
      category: "Attribution & Data",
      description: "Zero post-iOS signal loss; first-party event warehouse streaming.",
      impact: "+32% Signal Recovery",
      enabled: true,
    },
    {
      id: "retention",
      name: "Predictive Churn & VIP Lifecycle Flows",
      category: "Retention & LTV",
      description: "Algorithmic RFM tiering and dynamic conversational commerce.",
      impact: "+42% Repeat ARR",
      enabled: false,
    },
  ]);

  const toggleLever = (id: string) => {
    soundEngine.playSwitch();
    setLevers((prev) => prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l)));
  };

  // Funnel calculations based on active levers
  const creativeActive = levers.find((l) => l.id === "creative")?.enabled ?? false;
  const webglActive = levers.find((l) => l.id === "webgl")?.enabled ?? false;
  const capiActive = levers.find((l) => l.id === "capi")?.enabled ?? false;
  const retentionActive = levers.find((l) => l.id === "retention")?.enabled ?? false;

  const baseImpressions = 1500000;
  const impressions = creativeActive ? 3200000 : baseImpressions;
  const ctr = creativeActive ? 0.038 : 0.016;
  const traffic = Math.round(impressions * ctr);

  const baseCvr = 0.018;
  const cvr = webglActive ? 0.036 : baseCvr;
  const conversions = Math.round(traffic * cvr * (capiActive ? 1.25 : 1.0));

  const aov = 45000; // ₹45k average transaction value
  const netRevenue = conversions * aov;
  const finalArr = retentionActive ? Math.round(netRevenue * 1.48) : netRevenue;

  const formatCr = (val: number) => {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  };

  return (
    <section
      className={`relative overflow-hidden rounded-[40px] bg-gradient-to-b from-[#141720] via-[#0E1015] to-[#0A0B0E] p-6 sm:p-10 lg:p-14 text-white border border-white/12 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.9),inset_0_1px_1.5px_rgba(255,255,255,0.25)] ${className}`}
    >
      {/* Background radial glows */}
      <div className="pointer-events-none absolute -top-36 -left-36 h-[460px] w-[460px] rounded-full bg-[#F26522]/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-36 -right-36 h-[460px] w-[460px] rounded-full bg-indigo-500/15 blur-[140px]" />

      {/* Header */}
      <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 bg-white/5 backdrop-blur-md text-[12px] font-semibold text-[#F26522] mb-3">
            <Cpu size={13} />
            <span>Interactive Funnel Engine</span>
          </div>
          <h2 className="text-[clamp(1.75rem,4.5vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white">
            The Axionis Growth Engine Simulator
          </h2>
          <p className="mt-2 text-[14.5px] text-white/65 max-w-xl leading-relaxed">
            Toggle our specialized growth levers to watch pipeline velocity and compound revenue
            cascade through the entire funnel.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[12.5px] font-mono text-white/80 self-start lg:self-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Simulation Mode: Active</span>
        </div>
      </div>

      <div className="relative mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Growth Lever Switches */}
        <div className="lg:col-span-6 space-y-3.5">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/40 block mb-2">
            Engine Controls (Click to Toggle)
          </span>

          {levers.map((lever) => (
            <div
              key={lever.id}
              onClick={() => toggleLever(lever.id)}
              className={`cursor-pointer p-5 rounded-[26px] border transition-all duration-300 flex items-center justify-between group select-none ${
                lever.enabled
                  ? "bg-white/[0.08] border-[#F26522]/40 shadow-[0_12px_30px_-6px_rgba(242,101,34,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.02] border-white/5 opacity-60 hover:opacity-90 hover:bg-white/[0.04]"
              }`}
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#F26522] uppercase tracking-wider">
                    {lever.category}
                  </span>
                  <span
                    className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${
                      lever.enabled
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {lever.impact}
                  </span>
                </div>
                <h4 className="text-[15px] font-bold text-white tracking-tight">{lever.name}</h4>
                <p className="text-[13px] text-white/60 leading-relaxed font-normal">
                  {lever.description}
                </p>
              </div>

              <button
                type="button"
                className={`w-12 h-6 rounded-full transition-all duration-300 relative shrink-0 p-0.5 ${
                  lever.enabled ? "bg-[#F26522]" : "bg-white/20"
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    lever.enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Right: Real-time Funnel Visualizer */}
        <div className="lg:col-span-6">
          <div className="rounded-[34px] bg-white/[0.05] border border-white/15 p-6 sm:p-8 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.25)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[12px] font-bold uppercase tracking-wider text-white/50">
                Simulated Funnel Pipeline
              </span>
              <span className="text-[12px] font-mono text-[#F26522] font-semibold">
                {levers.filter((l) => l.enabled).length} / 4 Levers Engaged
              </span>
            </div>

            {/* Funnel Stages */}
            <div className="space-y-3">
              {/* Stage 1 */}
              <div className="bg-black/30 p-3.5 sm:p-4 rounded-[20px] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-white text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">Paid Ad Impressions</p>
                    <p className="text-[11px] text-white/40">Targeted Audience Reach</p>
                  </div>
                </div>
                <span className="text-[16px] font-bold font-mono text-white">
                  {impressions.toLocaleString()}
                </span>
              </div>

              {/* Stage 2 */}
              <div className="bg-black/30 p-3.5 sm:p-4 rounded-[20px] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-white text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">High-Intent Web Traffic</p>
                    <p className="text-[11px] text-white/40">
                      Effective CTR: {(ctr * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <span className="text-[16px] font-bold font-mono text-white">
                  {traffic.toLocaleString()} visitors
                </span>
              </div>

              {/* Stage 3 */}
              <div className="bg-black/30 p-3.5 sm:p-4 rounded-[20px] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#F26522] text-white text-[11px] font-bold flex items-center justify-center">
                    3
                  </span>
                  <div>
                    <p className="text-[13px] font-bold text-white">
                      Validated Pipeline Transactions
                    </p>
                    <p className="text-[11px] text-white/40">
                      CVR Index: {(cvr * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <span className="text-[16px] font-bold font-mono text-[#F26522]">
                  {conversions.toLocaleString()} orders
                </span>
              </div>
            </div>

            {/* Simulated Revenue Output Box */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11.5px] font-semibold text-white/50 block uppercase tracking-wider">
                    Compounded 12-Month Net ARR
                  </span>
                  <p className="text-[clamp(2.1rem,4.2vw,3rem)] font-bold text-white tracking-tight drop-shadow-[0_4px_16px_rgba(242,101,34,0.4)]">
                    {formatCr(finalArr)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full font-bold">
                    +{(finalArr / (1200000 * 12)).toFixed(1)}x Baseline
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onBookCall?.();
                }}
                className="mt-6 w-full group inline-flex items-center justify-between bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-semibold rounded-full pl-6 pr-2.5 py-3 shadow-[0_14px_30px_-6px_rgba(242,101,34,0.55),inset_0_1px_1.5px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <RollText label="Deploy this growth stack for your brand" />
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                  <ArrowRight size={14} className="text-[#F26522]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
