import React, { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Clock,
  Compass,
  Globe2,
  MapPin,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";
import { soundEngine } from "@/lib/sound-fx";

interface StudioLocation {
  id: "bengaluru" | "mumbai";
  city: string;
  name: string;
  address: string;
  coordinates: string;
  specialization: string;
  lead: string;
  leadRole: string;
  activeSquads: number;
  openSlots: number;
  latencyMs: number;
}

const STUDIOS: StudioLocation[] = [
  {
    id: "bengaluru",
    city: "Bengaluru",
    name: "Bengaluru Flagship HQ & Tech Lab",
    address: "100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038",
    coordinates: "12.9716° N, 77.5946° E",
    specialization: "Attribution Infrastructure, dbt Pipelines & WebGL CRO",
    lead: "Aarav Sharma",
    leadRole: "Managing Partner",
    activeSquads: 8,
    openSlots: 1,
    latencyMs: 6,
  },
  {
    id: "mumbai",
    city: "Mumbai",
    name: "Mumbai Performance Media & Creative Studio",
    address: "BKC One, G Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    coordinates: "19.0674° N, 72.8687° E",
    specialization: "Full-Funnel Media Buying, Motion Lab & Creator Sprints",
    lead: "Ananya Iyer",
    leadRole: "VP Conversion Architecture",
    activeSquads: 6,
    openSlots: 1,
    latencyMs: 9,
  },
];

export function StudioRadar({ className = "" }: { className?: string }) {
  const [activeStudioId, setActiveStudioId] = useState<"bengaluru" | "mumbai">("bengaluru");
  const [msTime, setMsTime] = useState("");

  const activeStudio = STUDIOS.find((s) => s.id === activeStudioId) || STUDIOS[0];

  useEffect(() => {
    let animId: number;
    const tick = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      const ms = String(now.getMilliseconds()).padStart(3, "0");
      setMsTime(`${timeStr}.${ms}`);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSelectStudio = (id: "bengaluru" | "mumbai") => {
    soundEngine.playSwitch();
    setActiveStudioId(id);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[38px] bg-gradient-to-b from-[#141720] via-[#0E1015] to-[#0A0B0E] p-6 sm:p-10 lg:p-12 text-white border border-white/12 shadow-[0_35px_90px_-20px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.25)] ${className}`}
    >
      {/* Background radial aura */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#F26522]/20 blur-[130px]" />

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 bg-white/5 backdrop-blur-md text-[12px] font-semibold text-[#F26522] mb-3">
            <Radio size={13} className="animate-pulse" />
            <span>Live Studio Command Radar</span>
          </div>
          <h3 className="text-[26px] sm:text-[32px] font-medium tracking-tight text-white">
            India Flagship Operations & Telemetry
          </h3>
          <p className="text-[14.5px] text-white/65 mt-1 max-w-xl">
            Live telemetry from our primary engineering and media hubs operating on India Standard
            Time.
          </p>
        </div>

        {/* Studio Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-full border border-white/10 backdrop-blur-md self-start lg:self-auto">
          <button
            onClick={() => handleSelectStudio("bengaluru")}
            className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
              activeStudioId === "bengaluru"
                ? "bg-[#F26522] text-white shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Bengaluru HQ
          </button>
          <button
            onClick={() => handleSelectStudio("mumbai")}
            className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
              activeStudioId === "mumbai"
                ? "bg-[#F26522] text-white shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Mumbai Studio
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Studio Info */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#F26522] bg-[#F26522]/15 px-3 py-1 rounded-full border border-[#F26522]/25">
                {activeStudio.city}
              </span>
              <span className="text-[12px] text-white/50 font-mono">
                {activeStudio.coordinates}
              </span>
            </div>
            <h4 className="text-[22px] sm:text-[26px] font-bold text-white tracking-tight">
              {activeStudio.name}
            </h4>
            <p className="text-[14px] text-white/70 mt-1.5 flex items-center gap-2">
              <MapPin size={14} className="text-[#F26522] shrink-0" />
              {activeStudio.address}
            </p>
          </div>

          <div className="p-5 rounded-[24px] bg-white/[0.04] border border-white/10 space-y-2">
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-white/40 block">
              Core Focus & Specialization
            </span>
            <p className="text-[14.5px] font-semibold text-white/95">
              {activeStudio.specialization}
            </p>
            <p className="text-[13px] text-white/60 pt-2 border-t border-white/5">
              Squad Lead: <strong className="text-white">{activeStudio.lead}</strong> (
              {activeStudio.leadRole})
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/30 p-3.5 rounded-[20px] border border-white/5">
              <span className="text-[11px] text-white/50 block">Active Sprints</span>
              <span className="text-[19px] font-bold text-white mt-1 block">
                {activeStudio.activeSquads} Squads
              </span>
            </div>
            <div className="bg-black/30 p-3.5 rounded-[20px] border border-white/5">
              <span className="text-[11px] text-white/50 block">Q1 2026 Slots</span>
              <span className="text-[19px] font-bold text-[#F26522] mt-1 block">
                {activeStudio.openSlots} Available
              </span>
            </div>
            <div className="bg-black/30 p-3.5 rounded-[20px] border border-white/5">
              <span className="text-[11px] text-white/50 block">Network Ping</span>
              <span className="text-[19px] font-bold text-emerald-400 mt-1 block">
                {activeStudio.latencyMs}ms
              </span>
            </div>
          </div>
        </div>

        {/* Right: Radar Visualizer Scope */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/15 bg-black/40 backdrop-blur-xl flex items-center justify-center p-4 shadow-[0_0_50px_rgba(242,101,34,0.15)]">
            {/* Concentric rings */}
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full border border-white/10" />
            <div className="absolute inset-24 rounded-full border border-white/10" />

            {/* Radar crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/10" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/10" />

            {/* Rotating radar beam */}
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                animationDuration: "4s",
                background:
                  "conic-gradient(from 0deg at 50% 50%, rgba(242, 101, 34, 0.35) 0deg, transparent 60deg, transparent 360deg)",
              }}
            />

            {/* Blip 1: Studio */}
            <div className="absolute top-1/3 left-1/3 flex items-center gap-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F26522]" />
              </span>
              <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                {activeStudio.city} HQ
              </span>
            </div>

            {/* Central Clock Display */}
            <div className="relative z-10 text-center bg-black/70 p-3 rounded-full border border-white/15 shadow-xl backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">
                IST Telemetry
              </span>
              <span className="text-[15px] sm:text-[16px] font-mono font-bold text-white tracking-wider">
                {msTime || "18:00:00.000"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
