import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/sections";
import { BadgeRow, RollText } from "@/components/site/ui-bits";
import { BookingModal } from "@/components/site/BookingModal";
import { StudioRadar } from "@/components/site/StudioRadar";
import { soundEngine } from "@/lib/sound-fx";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect & Strategy Brief — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Schedule a 30-minute strategy teardown or submit a confidential RFP directly to the managing partners at Axionis Growth Agency in India.",
      },
    ],
  }),
  component: ConnectPage,
});

const BUDGET_OPTIONS = [
  "₹5 Lakhs - ₹15 Lakhs / mo",
  "₹15 Lakhs - ₹40 Lakhs / mo",
  "₹40 Lakhs+ / mo",
  "Sprint Diagnostic (One-Off Audit)",
];

const TIMELINE_OPTIONS = ["Immediate (Within 2 weeks)", "Next Quarter", "Exploratory / RFP"];

function ConnectPage() {
  const [activeTab, setActiveTab] = useState<"book" | "rfp">("book");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // RFP Form State
  const [rfpName, setRfpName] = useState("");
  const [rfpEmail, setRfpEmail] = useState("");
  const [rfpCompany, setRfpCompany] = useState("");
  const [rfpBudget, setRfpBudget] = useState(BUDGET_OPTIONS[0]);
  const [rfpTimeline, setRfpTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [rfpMessage, setRfpMessage] = useState("");
  const [submittingRfp, setSubmittingRfp] = useState(false);
  const [rfpSuccess, setRfpSuccess] = useState(false);

  const handleRfpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfpName.trim() || !rfpEmail.trim() || !rfpMessage.trim()) {
      toast.error("Please fill in your name, work email, and brief details.");
      return;
    }

    soundEngine.playClick();
    setSubmittingRfp(true);
    setTimeout(() => {
      setSubmittingRfp(false);
      setRfpSuccess(true);
      soundEngine.playSuccessChime();
      toast.success("RFP Received! Managing Partner will reply within 4 hours.");
    }, 900);
  };

  const handleTabChange = (tab: "book" | "rfp") => {
    soundEngine.playSwitch();
    setActiveTab(tab);
  };

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="Direct Partner Access" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            Let's dissect your
            <br className="hidden sm:block" /> biggest
            <span className="text-[#F26522]"> growth constraint.</span>
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal">
            No junior pitch reps or scripted presentations. You speak directly with senior growth
            operators who have scaled eight-figure brands across India and global markets.
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Contacts + Interactive Form */}
      <section className="px-5 sm:px-8 lg:px-12 pb-14 sm:pb-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-10">
          {/* Left Column: Direct Info Cards */}
          <div className="space-y-6">
            {/* Direct Details Card */}
            <div className="p-8 rounded-[38px] bg-white border border-black/[0.04] shadow-[0_18px_40px_-15px_rgba(15,18,25,0.06),inset_0_1px_1.5px_rgba(255,255,255,1)] space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F26522]/10 text-[#F26522] shadow-inner">
                  <Sparkles size={18} />
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-gray-900">Direct Inquiries</h3>
                  <p className="text-[12px] text-gray-500 font-medium">
                    Guaranteed response within 4 hours
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-[14px]">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={16} className="text-[#F26522]" />
                  <a
                    href="mailto:partners@axionis.agency"
                    className="hover:text-[#F26522] transition-colors font-medium"
                  >
                    partners@axionis.agency
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={16} className="text-[#F26522]" />
                  <a
                    href="tel:+918049202600"
                    className="hover:text-[#F26522] transition-colors font-medium"
                  >
                    +91 (080) 4920-2600
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[12.5px] text-gray-500 leading-relaxed">
                  We are currently accepting <strong>two partner clients</strong> for Q1 2026
                  sprints to maintain our senior squad ratios.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="p-6 sm:p-12 rounded-[34px] sm:rounded-[40px] bg-white border border-black/[0.04] shadow-[0_20px_45px_-15px_rgba(15,18,25,0.06),inset_0_1px_1.5px_rgba(255,255,255,1)]">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-gray-100 mb-8 w-full sm:max-w-sm border border-black/[0.04] shadow-inner">
              <button
                type="button"
                onClick={() => handleTabChange("book")}
                className={`flex-1 text-[13px] font-semibold py-2 rounded-full transition-all duration-300 ${
                  activeTab === "book"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Book Strategy Call
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("rfp")}
                className={`flex-1 text-[13px] font-semibold py-2 rounded-full transition-all duration-300 ${
                  activeTab === "rfp"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Submit RFP Brief
              </button>
            </div>

            {activeTab === "book" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[22px] font-bold text-gray-900 tracking-tight">
                    Instant 30-Minute Growth Teardown
                  </h3>
                  <p className="mt-2 text-[14px] text-gray-600 leading-relaxed font-normal">
                    Reserve a slot directly on our partner calendar. We review your live funnel, ad
                    creative, and attribution health prior to the call.
                  </p>
                </div>

                <div className="p-6 rounded-[28px] bg-[#FAFAFC] border border-black/[0.04] space-y-3">
                  <div className="flex items-center gap-2 text-[#F26522] font-bold text-[12px] uppercase tracking-wider">
                    <Calendar size={14} />
                    <span>What happens on the call</span>
                  </div>
                  <ul className="space-y-2 text-[13.5px] text-gray-700 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#F26522]" />
                      </span>
                      <span>15-min teardown of your primary bottleneck</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#F26522]" />
                      </span>
                      <span>Review of current CAC payback and blended ROAS</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-5 w-5 rounded-full bg-[#F26522]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-[#F26522]" />
                      </span>
                      <span>Clear actionable recommendation, whether we work together or not</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setIsBookingOpen(true);
                  }}
                  className="w-full group inline-flex items-center justify-between bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-semibold rounded-full pl-6 pr-2.5 py-3 shadow-[0_14px_30px_-6px_rgba(242,101,34,0.55),inset_0_1px_1.5px_rgba(255,255,255,0.45)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <RollText label="Open Partner Calendar & Choose Time" />
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                    <ArrowRight size={14} className="text-[#F26522]" />
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleRfpSubmit} className="space-y-4">
                {rfpSuccess ? (
                  <div className="p-8 rounded-[28px] bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                      <Check size={24} />
                    </div>
                    <h4 className="text-[20px] font-bold text-emerald-950">RFP Received</h4>
                    <p className="text-[14px] text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Our managing partners have received your brief and will reply with an initial
                      scope breakdown within 4 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setRfpSuccess(false)}
                      className="mt-4 text-[13px] font-bold text-[#F26522] underline"
                    >
                      Submit another brief
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={rfpName}
                          onChange={(e) => setRfpName(e.target.value)}
                          placeholder="e.g. Rahul Verma"
                          className="w-full px-4 py-2.5 rounded-full border border-black/[0.08] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/40 text-[14px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={rfpEmail}
                          onChange={(e) => setRfpEmail(e.target.value)}
                          placeholder="rahul@company.com"
                          className="w-full px-4 py-2.5 rounded-full border border-black/[0.08] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/40 text-[14px]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
                        Company Name & Website
                      </label>
                      <input
                        type="text"
                        value={rfpCompany}
                        onChange={(e) => setRfpCompany(e.target.value)}
                        placeholder="e.g. Acme Tech (acme.com)"
                        className="w-full px-4 py-2.5 rounded-full border border-black/[0.08] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/40 text-[14px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
                        Estimated Monthly Ad / Growth Budget
                      </label>
                      <select
                        value={rfpBudget}
                        onChange={(e) => setRfpBudget(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full border border-black/[0.08] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/40 text-[14px]"
                      >
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
                        Core Objectives & Primary Bottleneck *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={rfpMessage}
                        onChange={(e) => setRfpMessage(e.target.value)}
                        placeholder="Tell us about your current CAC, conversion rate, and revenue goals..."
                        className="w-full px-4 py-3 rounded-[24px] border border-black/[0.08] bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/40 text-[14px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingRfp}
                      className="w-full group inline-flex items-center justify-between bg-[#0E1015] hover:bg-black text-white text-[14px] font-semibold rounded-full pl-6 pr-2.5 py-3 shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <RollText
                        label={
                          submittingRfp ? "Submitting Brief..." : "Submit Confidential RFP Brief"
                        }
                      />
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                        <Send size={14} className="text-gray-900" />
                      </span>
                    </button>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Studio Command Radar */}
      <section className="bg-[#0A0B0E] py-14 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <StudioRadar />
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
