import React, { useState } from "react";
import { ArrowRight, Calendar, Check, Clock, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { RollText } from "./ui-bits";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialGoal?: string;
}

const OBJECTIVES = [
  "Performance Media & Paid Scaling",
  "Conversion Rate Optimization & Web",
  "SEO & Topical Authority Systems",
  "Full-Stack Growth Retainer (Engine)",
  "Growth Audit & Sprint Diagnostic",
  "Fractional CMO & Strategy",
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

const BUDGETS = [
  "₹5L - ₹10L / mo",
  "₹10L - ₹25L / mo",
  "₹25L - ₹50L / mo",
  "₹50L+ / mo",
  "Sprint Diagnostic (One-off Audit)",
];

export function BookingModal({
  isOpen,
  onClose,
  initialPlan,
  initialGoal,
}: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedObjective, setSelectedObjective] = useState<string>(
    initialPlan ? `${initialPlan} Engagement` : initialGoal || OBJECTIVES[0]
  );
  const [selectedDate, setSelectedDate] = useState<string>("Tomorrow");
  const [selectedTime, setSelectedTime] = useState<string>("02:00 PM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and work email");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Strategy call requested! We will send a calendar invite within 2 hours.", {
        duration: 5000,
      });
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with frosted blur */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[38px] bg-[#0E1015] border border-white/15 text-white shadow-[0_35px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#F26522]/25 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-600/15 blur-[90px]" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-6 sm:px-8 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F26522]/20 text-[#F26522] shadow-inner">
              <Sparkles size={15} />
            </span>
            <div>
              <h3 className="text-[16px] sm:text-[17px] font-bold text-white tracking-tight">
                {submitted
                  ? "Call Scheduled"
                  : initialPlan
                  ? `Enquire: ${initialPlan} Plan`
                  : "Book a 30-Min Strategy Call"}
              </h3>
              <p className="text-[12px] text-white/50">
                {submitted
                  ? "Confirmation sent to your inbox"
                  : "Direct with a Senior Growth Partner — no sales reps"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F26522]/20 text-[#F26522] mb-5 shadow-lg">
                <Check size={32} />
              </div>
              <h4 className="text-[22px] font-bold text-white">You're booked in!</h4>
              <p className="mt-2 text-[14px] text-white/70 max-w-md mx-auto leading-relaxed">
                We've reserved your slot for{" "}
                <span className="text-[#F26522] font-semibold">
                  {selectedDate} at {selectedTime} (IST / India Time)
                </span>
                . An invite with video link has been dispatched to{" "}
                <span className="text-white font-medium">{email}</span>.
              </p>
              <div className="mt-6 p-5 rounded-[24px] bg-white/5 border border-white/10 text-left max-w-md mx-auto text-[13px] text-white/75 space-y-1.5 shadow-sm">
                <p>
                  <strong className="text-white">Topic:</strong> {selectedObjective}
                </p>
                <p>
                  <strong className="text-white">Partner Assigned:</strong> Senior Growth Strategist
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleReset}
                  className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-semibold rounded-full px-8 py-2.5 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 text-[12px] font-medium">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      step === 1 ? "bg-[#F26522] text-white shadow-sm" : "bg-white/20 text-white/70"
                    }`}
                  >
                    1
                  </span>
                  <span className={step === 1 ? "text-white font-semibold" : "text-white/50"}>
                    Objective
                  </span>
                </div>
                <div className="h-0.5 w-8 bg-white/10 rounded-full" />
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      step === 2 ? "bg-[#F26522] text-white shadow-sm" : "bg-white/20 text-white/70"
                    }`}
                  >
                    2
                  </span>
                  <span className={step === 2 ? "text-white font-semibold" : "text-white/50"}>
                    Time & Date
                  </span>
                </div>
                <div className="h-0.5 w-8 bg-white/10 rounded-full" />
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      step === 3 ? "bg-[#F26522] text-white shadow-sm" : "bg-white/20 text-white/70"
                    }`}
                  >
                    3
                  </span>
                  <span className={step === 3 ? "text-white font-semibold" : "text-white/50"}>
                    Your Details
                  </span>
                </div>
              </div>

              {/* STEP 1: Select Objective */}
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-[14px] font-semibold text-white/90">
                    What is the primary constraint holding back your revenue?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {OBJECTIVES.map((obj) => {
                      const active = selectedObjective === obj;
                      return (
                        <button
                          key={obj}
                          type="button"
                          onClick={() => setSelectedObjective(obj)}
                          className={`flex items-center justify-between p-4 rounded-[22px] border text-left text-[13px] font-medium transition-all ${
                            active
                              ? "border-[#F26522] bg-[#F26522]/15 text-white shadow-[0_4px_16px_rgba(242,101,34,0.25)]"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span>{obj}</span>
                          {active && (
                            <span className="h-5 w-5 rounded-full bg-[#F26522] flex items-center justify-center shrink-0">
                              <Check size={12} className="text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="group inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] font-semibold rounded-full pl-5 pr-2 py-2 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all"
                    >
                      <RollText label="Next: Select Time" />
                      <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:-rotate-45 transition-transform shadow-sm">
                        <ArrowRight size={13} className="text-[#F26522]" />
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Pick Time */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-semibold text-white/90 mb-2.5">
                      Preferred Day
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {["Tomorrow", "This Thursday", "Next Tuesday"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-[22px] border text-center transition-all ${
                            selectedDate === d
                              ? "border-[#F26522] bg-[#F26522]/15 text-white shadow-[0_4px_16px_rgba(242,101,34,0.25)]"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <Calendar size={16} className="mb-1 text-white/60" />
                          <span className="text-[13px] font-semibold">{d}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-semibold text-white/90 mb-2.5">
                      Available Slots (30 mins IST)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`flex items-center justify-center gap-2 p-3 rounded-full border text-[13px] font-medium transition-all ${
                            selectedTime === t
                              ? "border-[#F26522] bg-[#F26522]/15 text-white shadow-[0_4px_16px_rgba(242,101,34,0.25)]"
                              : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <Clock size={13} />
                          <span>{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[13px] text-white/60 hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="group inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] font-semibold rounded-full pl-5 pr-2 py-2 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all"
                    >
                      <RollText label="Next: Your Details" />
                      <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:-rotate-45 transition-transform shadow-sm">
                        <ArrowRight size={13} className="text-[#F26522]" />
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Company & Contact details */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[12px] font-medium text-white/80 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rohan Sharma"
                        className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-white/80 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rohan@company.com"
                        className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[12px] font-medium text-white/80 mb-1">
                        Company URL
                      </label>
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="company.com"
                        className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-white/80 mb-1">
                        Monthly Growth Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-full bg-[#141720] border border-white/10 px-4 py-2.5 text-[13px] text-white focus:border-[#F26522] focus:outline-none"
                      >
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-white/80 mb-1">
                      Anything specific you'd like us to look into prior to the call?
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Scaling Meta & Google ads profitably while lifting retention..."
                      className="w-full rounded-[24px] bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-[13px] text-white/60 hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] disabled:opacity-50 text-white text-[13px] font-semibold rounded-full pl-6 pr-2 py-2.5 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all"
                    >
                      <RollText label={submitting ? "Booking slot..." : "Confirm Booking"} />
                      <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:-rotate-45 transition-transform shadow-sm">
                        <ArrowRight size={14} className="text-[#F26522]" />
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
