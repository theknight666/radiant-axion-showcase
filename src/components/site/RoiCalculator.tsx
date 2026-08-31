import React, { useState } from "react";
import { ArrowRight, Calculator, Sparkles, TrendingUp, Zap, ShieldCheck } from "lucide-react";
import { RollText } from "./ui-bits";
import { soundEngine } from "@/lib/sound-fx";
import { TiltCard } from "./TiltCard";

interface RoiCalculatorProps {
  onBookCall?: () => void;
  className?: string;
}

export function RoiCalculator({ onBookCall, className = "" }: RoiCalculatorProps) {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(5000000); // 50 Lakhs default
  const [adSpend, setAdSpend] = useState<number>(1200000); // 12 Lakhs default
  const [cvr, setCvr] = useState<number>(1.8); // 1.8%

  const isINR = currency === "INR";

  // Calculations based on historical Axionis benchmark lifts:
  const modeledCvrLift = cvr * 1.85;
  const cvrDelta = (modeledCvrLift - cvr).toFixed(2);
  const revenueMultiplier = 2.4; // 2.4x compounding growth over 12 months
  const projected12MoRevenue = Math.round(monthlyRevenue * 12 * revenueMultiplier);
  const projectedNetLift = Math.round(projected12MoRevenue - monthlyRevenue * 12);
  const projectedCacReduction = "38.5%";
  const medianPaybackDays = 28;

  const formatMoney = (amount: number) => {
    if (isINR) {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(1)} Cr`;
      }
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(0)} L`;
      }
      return `₹${amount.toLocaleString("en-IN")}`;
    } else {
      if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(2)}M`;
      }
      if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}k`;
      }
      return `$${amount.toLocaleString("en-US")}`;
    }
  };

  const handleCurrencyChange = (curr: "INR" | "USD") => {
    soundEngine.playSwitch();
    setCurrency(curr);
    if (curr === "INR") {
      setMonthlyRevenue(5000000);
      setAdSpend(1200000);
    } else {
      setMonthlyRevenue(150000);
      setAdSpend(40000);
    }
  };

  const handleSliderChange = (type: "rev" | "spend" | "cvr", val: number) => {
    soundEngine.playSliderTick(Math.round(val));
    if (type === "rev") setMonthlyRevenue(val);
    if (type === "spend") setAdSpend(val);
    if (type === "cvr") setCvr(val);
  };

  return (
    <TiltCard maxTilt={4} scale={1.008}>
      <div
        className={`relative overflow-hidden rounded-[38px] bg-gradient-to-b from-[#141720] via-[#0E1015] to-[#0A0B0E] p-6 sm:p-10 lg:p-12 text-white border border-white/12 shadow-[0_35px_90px_-20px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.25)] ${className}`}
      >
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[#F26522]/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-indigo-500/15 blur-[120px]" />

        {/* Header Bar */}
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1 bg-white/5 backdrop-blur-md text-[12px] font-semibold text-[#F26522] mb-3">
              <Calculator size={13} />
              <span>Interactive Growth Model</span>
            </div>
            <h3 className="text-[24px] sm:text-[30px] font-medium tracking-[-0.02em] text-white">
              Simulate Your 12-Month Compounding Revenue
            </h3>
            <p className="text-[14px] text-white/65 mt-1">
              Calibrated against ₹240M+ in audited enterprise client outcomes.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center self-start md:self-auto gap-1 bg-black/40 p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button
              onClick={() => handleCurrencyChange("INR")}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                isINR ? "bg-[#F26522] text-white shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => handleCurrencyChange("USD")}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                !isINR ? "bg-[#F26522] text-white shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Main Grid: Sliders & Live Visual Telemetry */}
        <div className="relative mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-7">
            {/* Slider 1: Monthly Revenue */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-[13.5px] font-medium text-white/80">
                  Current Monthly Revenue
                </label>
                <span className="text-[16px] font-bold text-white bg-white/10 px-3.5 py-0.5 rounded-full border border-white/10 font-mono">
                  {formatMoney(monthlyRevenue)} / mo
                </span>
              </div>
              <input
                type="range"
                min={isINR ? 1000000 : 30000}
                max={isINR ? 50000000 : 1500000}
                step={isINR ? 500000 : 10000}
                value={monthlyRevenue}
                onChange={(e) => handleSliderChange("rev", Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/15 accent-[#F26522]"
              />
              <div className="flex justify-between text-[11px] text-white/40 font-mono">
                <span>{isINR ? "₹10 Lakhs" : "$30k"}</span>
                <span>{isINR ? "₹5 Crore+" : "$1.5M+"}</span>
              </div>
            </div>

            {/* Slider 2: Monthly Paid Ad Spend */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-[13.5px] font-medium text-white/80">
                  Current Monthly Ad Spend
                </label>
                <span className="text-[16px] font-bold text-white bg-white/10 px-3.5 py-0.5 rounded-full border border-white/10 font-mono">
                  {formatMoney(adSpend)} / mo
                </span>
              </div>
              <input
                type="range"
                min={isINR ? 300000 : 10000}
                max={isINR ? 15000000 : 400000}
                step={isINR ? 100000 : 5000}
                value={adSpend}
                onChange={(e) => handleSliderChange("spend", Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/15 accent-[#F26522]"
              />
              <div className="flex justify-between text-[11px] text-white/40 font-mono">
                <span>{isINR ? "₹3 Lakhs" : "$10k"}</span>
                <span>{isINR ? "₹1.5 Crore" : "$400k"}</span>
              </div>
            </div>

            {/* Slider 3: Current Conversion Rate */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-[13.5px] font-medium text-white/80">
                  Current On-Site Conversion Rate
                </label>
                <span className="text-[16px] font-bold text-[#F26522] bg-[#F26522]/15 px-3.5 py-0.5 rounded-full border border-[#F26522]/30 font-mono">
                  {cvr}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.5"
                step="0.1"
                value={cvr}
                onChange={(e) => handleSliderChange("cvr", Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/15 accent-[#F26522]"
              />
              <div className="flex justify-between text-[11px] text-white/40 font-mono">
                <span>0.5% (Low)</span>
                <span>2.0% (Average)</span>
                <span>4.5% (Elite)</span>
              </div>
            </div>
          </div>

          {/* Live Output Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] bg-white/[0.06] border border-white/15 p-6 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/50">
                  12-Month Impact Forecast
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
                  <Sparkles size={11} />
                  High Confidence
                </span>
              </div>

              <div className="mt-5">
                <p className="text-[12px] text-white/60">Estimated Net New Revenue Lift</p>
                <p className="text-[clamp(2.2rem,4vw,3.2rem)] font-bold tracking-tight text-[#F26522] drop-shadow-[0_4px_12px_rgba(242,101,34,0.4)]">
                  +{formatMoney(projectedNetLift)}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="bg-black/30 p-3.5 rounded-[20px] border border-white/5">
                  <span className="text-[11px] text-white/50 block">Target CVR Lift</span>
                  <span className="text-[17px] font-bold text-white mt-1 block">
                    {cvr}% → {modeledCvrLift.toFixed(2)}%
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium">
                    +{cvrDelta}% delta
                  </span>
                </div>
                <div className="bg-black/30 p-3.5 rounded-[20px] border border-white/5">
                  <span className="text-[11px] text-white/50 block">Blended CAC Drop</span>
                  <span className="text-[17px] font-bold text-white mt-1 block">
                    -{projectedCacReduction}
                  </span>
                  <span className="text-[10px] text-white/60 font-medium">
                    {medianPaybackDays}d payback
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onBookCall?.();
                }}
                className="mt-6 w-full group inline-flex items-center justify-between bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13.5px] font-semibold rounded-full pl-6 pr-2 py-2.5 shadow-[0_12px_28px_-6px_rgba(242,101,34,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <RollText label="Review your roadmap on a call" />
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                  <ArrowRight size={14} className="text-[#F26522]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
