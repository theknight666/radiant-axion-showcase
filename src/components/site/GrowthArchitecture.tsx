import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

interface NodeData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tech: string[];
  metrics: { label: string; value: string }[];
  deliverables: string[];
}

const NODES: NodeData[] = [
  {
    id: "strategy",
    number: "01",
    title: "Category Positioning & ICP Diagnostic",
    subtitle: "Reverse-engineering the mathematical constraint on pipeline scale",
    icon: Target,
    tech: ["Amplitude", "Segment", "FullStory", "Gong Teardowns"],
    metrics: [
      { label: "Audit Timeline", value: "10 Business Days" },
      { label: "Predictive Accuracy", value: "94.2%" },
    ],
    deliverables: [
      "Competitor Unit Economics Map",
      "Offer Architecture & Pricing Matrix",
      "12-Month Deterministic Growth Forecast",
    ],
  },
  {
    id: "creative",
    number: "02",
    title: "High-Velocity Creative Testing Engine",
    subtitle: "Rapid modular asset iteration across motion, static, and UGC",
    icon: Sparkles,
    tech: ["After Effects", "Figma", "Blender 3D", "Runway Gen-3"],
    metrics: [
      { label: "Weekly Iterations", value: "35-50 Variants" },
      { label: "Hit Rate Over Baseline", value: "4.2x" },
    ],
    deliverables: [
      "Direct-Response Motion Ad Sprints",
      "Native UGC Creator Pipelines",
      "Angle Matrix (Pain, Greed, Social Proof)",
    ],
  },
  {
    id: "media",
    number: "03",
    title: "Full-Funnel Performance Media",
    subtitle: "Multi-channel budget scaling governed by incrementality testing",
    icon: Rocket,
    tech: ["Meta Ads API", "Google Ads 360", "TikTok Ads", "The Trade Desk"],
    metrics: [
      { label: "Median Blended ROAS", value: "3.85x" },
      { label: "Ad Spend Managed", value: "₹250Cr+" },
    ],
    deliverables: [
      "Multi-Account Media Scaling Architecture",
      "Geo-Lift & Postcode Incrementality Tests",
      "Real-Time Bid & Budget Autopilot Rules",
    ],
  },
  {
    id: "attribution",
    number: "04",
    title: "Server-Side Attribution & Warehouse",
    subtitle: "Eliminating signal loss with warehouse-native truth metrics",
    icon: Database,
    tech: ["Snowflake", "dbt", "Google Cloud BigQuery", "Meta CAPI"],
    metrics: [
      { label: "Match Quality Score", value: "9.6 / 10" },
      { label: "Signal Recovery", value: "+32% Lift" },
    ],
    deliverables: [
      "Server-Side CAPI & Enhanced Conversions",
      "Marketing Mix Modelling (MMM) Dashboard",
      "First-Party Customer Data Platform",
    ],
  },
  {
    id: "cro",
    number: "05",
    title: "High-Conversion WebGL Systems",
    subtitle: "Sub-second digital storefronts engineered to maximize session value",
    icon: Code2,
    tech: ["React 19", "Vite", "TanStack", "Cloudflare Workers", "WebGL"],
    metrics: [
      { label: "Average CVR Lift", value: "+85% Relative" },
      { label: "Core Web Vitals", value: "99 / 100" },
    ],
    deliverables: [
      "High-Intent Headless Funnel Builds",
      "Predictive Bundle & Checkout Optimizations",
      "Bi-Weekly Multivariate A/B Testing Sprints",
    ],
  },
  {
    id: "retention",
    number: "06",
    title: "Lifecycle & LTV Compounding",
    subtitle: "Transforming single transactions into compounding repeat purchase engines",
    icon: Zap,
    tech: ["Klaviyo", "Attentive", "Postscript", "Recharge Payments"],
    metrics: [
      { label: "Repeat Purchase Rate", value: "+42%" },
      { label: "Lifecycle Revenue Share", value: "34%+" },
    ],
    deliverables: [
      "Predictive Churn Interception Flows",
      "VIP Tier & Cohort Loyalty Architecture",
      "Multi-Trigger SMS & Push Reactivations",
    ],
  },
];

export function GrowthArchitecture({ className = "" }: { className?: string }) {
  const [selectedId, setSelectedId] = useState<string>("cro");
  const activeNode = NODES.find((n) => n.id === selectedId) || NODES[0];

  return (
    <section
      className={`relative overflow-hidden rounded-[38px] bg-white border border-black/[0.05] p-6 sm:p-10 lg:p-14 shadow-[0_25px_70px_-15px_rgba(15,18,25,0.08),inset_0_1px_1.5px_rgba(255,255,255,1)] ${className}`}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#F26522]/10 blur-[120px]" />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-1 bg-gray-50 text-[12px] font-semibold text-gray-800 mb-3">
            <Activity size={13} className="text-[#F26522]" />
            <span>Architecture Telemetry</span>
          </div>
          <h2 className="text-[clamp(1.6rem,4.4vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-gray-900">
            The 6-Pillar Growth Engine Architecture
          </h2>
        </div>
        <p className="max-w-md text-[14.5px] leading-relaxed text-gray-600">
          Every layer operates in continuous synchronization — eliminating data silos between media,
          creative, and engineering.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Node selector buttons */}
        <div className="lg:col-span-5 space-y-2.5">
          {NODES.map((node) => {
            const isSelected = selectedId === node.id;
            const Icon = node.icon;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-[24px] transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? "bg-[#0E1015] text-white shadow-[0_15px_35px_-8px_rgba(15,18,25,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10"
                    : "bg-gray-50/80 hover:bg-gray-100/90 text-gray-800 border border-black/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-[#F26522] text-white shadow-sm"
                        : "bg-white text-gray-700 shadow-sm group-hover:bg-[#F26522]/10 group-hover:text-[#F26522]"
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold font-mono tracking-wider ${
                          isSelected ? "text-[#F26522]" : "text-gray-400"
                        }`}
                      >
                        {node.number}
                      </span>
                      <p className="text-[14.5px] font-semibold tracking-[-0.01em]">{node.title}</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    isSelected ? "bg-[#F26522] shadow-[0_0_8px_#F26522]" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Selected Node Details Display */}
        <div className="lg:col-span-7">
          <div className="rounded-[32px] bg-gradient-to-b from-[#141720] via-[#0E1015] to-[#0A0B0E] p-7 sm:p-9 text-white border border-white/12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.25)] relative overflow-hidden">
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#F26522]/20 blur-[80px]" />

            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-[12px] font-bold tracking-widest text-[#F26522] bg-[#F26522]/15 px-3 py-1 rounded-full border border-[#F26522]/25">
                  SYSTEM TIER {activeNode.number}
                </span>
                <span className="text-[11px] text-white/50 font-mono">LIVE PRODUCTION GRADE</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold bg-emerald-400/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Telemetry
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-white">
                {activeNode.title}
              </h3>
              <p className="mt-2 text-[14px] text-white/70 leading-relaxed">
                {activeNode.subtitle}
              </p>
            </div>

            {/* Metrics Callout */}
            <div className="mt-6 grid grid-cols-2 gap-3.5">
              {activeNode.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-white/5 p-4 rounded-[22px] border border-white/10 backdrop-blur-md"
                >
                  <span className="text-[11.5px] text-white/50 font-medium block">{m.label}</span>
                  <span className="text-[20px] font-bold text-[#F26522] mt-1 block">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Deliverables Checklist */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/50 block mb-3.5">
                Core Deliverables
              </span>
              <ul className="space-y-2.5">
                {activeNode.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[13.5px] text-white/85 font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#F26522]/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={13} className="text-[#F26522]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Integration Chips */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-white/40 font-mono uppercase mr-2">
                Tech Integrations:
              </span>
              {activeNode.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-[11.5px] font-semibold border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
