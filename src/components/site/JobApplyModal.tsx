import React, { useState } from "react";
import { ArrowRight, Check, Sparkles, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { RollText } from "./ui-bits";

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  overview: string;
  requirements: string[];
}

interface JobApplyModalProps {
  job: JobPosition | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [pitch, setPitch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Application received! We'll review and respond within 48 hours.");
    }, 900);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[28px] sm:rounded-[38px] bg-[#0E1015] border border-white/15 text-white shadow-[0_35px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#F26522]/20 blur-[100px]" />

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0E1015]/95 backdrop-blur-md px-5 sm:px-8 py-4 sm:py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F26522]/20 text-[#F26522] shadow-inner">
              <Sparkles size={15} />
            </span>
            <div>
              <h3 className="text-[16px] sm:text-[17px] font-bold text-white tracking-tight">
                {submitted ? "Application Sent" : `Apply: ${job.title}`}
              </h3>
              <p className="text-[12px] text-white/50">
                {job.department} • {job.location}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F26522]/20 text-[#F26522] shadow-lg">
                <Check size={32} />
              </div>
              <h4 className="text-[22px] font-bold text-white">Application Received</h4>
              <p className="text-[14px] text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you for applying for the{" "}
                <span className="text-[#F26522] font-semibold">{job.title}</span> role. Our
                leadership squad reviews all applications directly.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleClose}
                  className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-semibold rounded-full px-8 py-2.5 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Priya Verma"
                    className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-white/80 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@domain.com"
                    className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[12px] font-medium text-white/80 mb-1">
                    LinkedIn / Twitter URL
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="linkedin.com/in/..."
                    className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-white/80 mb-1">
                    Portfolio / Github URL
                  </label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="portfolio.com"
                    className="w-full rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-white/80 mb-1">
                  Tell us about the highest impact growth project you've owned
                </label>
                <textarea
                  rows={3}
                  required
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="Context, the core constraint you identified, and the specific metrics moved..."
                  className="w-full rounded-[24px] bg-white/5 border border-white/10 px-4 py-2.5 text-[13px] text-white placeholder:text-white/30 focus:border-[#F26522] focus:outline-none resize-none"
                />
              </div>

              <div className="p-4 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-between text-[12.5px] text-white/70">
                <div className="flex items-center gap-2.5">
                  <Upload size={16} className="text-[#F26522]" />
                  <span>Resume upload optional (LinkedIn profile is sufficient)</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-white/40">
                  PDF / DOC
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-[13px] text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] disabled:opacity-50 text-white text-[13px] font-semibold rounded-full pl-6 pr-2 py-2.5 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all"
                >
                  <RollText label={submitting ? "Submitting..." : "Submit Application"} />
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center group-hover:-rotate-45 transition-transform shadow-sm">
                    <ArrowRight size={14} className="text-[#F26522]" />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
