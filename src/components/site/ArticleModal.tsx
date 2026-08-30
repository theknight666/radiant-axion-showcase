import React, { useState } from "react";
import { ArrowRight, Bookmark, Check, Clock, Share2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

export interface ArticleData {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

interface ArticleModalProps {
  article: ArticleData | null;
  isOpen: boolean;
  onClose: () => void;
  onBookCall?: () => void;
}

export function ArticleModal({ article, isOpen, onClose, onBookCall }: ArticleModalProps) {
  const [saved, setSaved] = useState(false);

  if (!isOpen || !article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Article link copied to clipboard!");
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Removed from saved articles" : "Article saved to reading list");
  };

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-[28px] sm:rounded-[38px] bg-[#0E1015] border border-white/15 text-white shadow-[0_35px_90px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#F26522]/20 blur-[100px]" />

        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0E1015]/95 backdrop-blur-md px-5 sm:px-8 py-3.5 sm:py-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F26522] px-3 py-1 rounded-full bg-[#F26522]/15 border border-[#F26522]/30 shadow-sm">
              {article.category}
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5 text-[12px] text-white/60 font-medium">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                saved
                  ? "bg-[#F26522] text-white shadow-sm"
                  : "bg-white/5 hover:bg-white/10 text-white/70"
              }`}
              title="Bookmark article"
            >
              <Bookmark size={14} />
            </button>
            <button
              onClick={handleShare}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
              title="Share article"
            >
              <Share2 size={14} />
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-7">
          <div>
            <h2 className="text-[24px] sm:text-[32px] font-bold leading-[1.18] tracking-tight text-white">
              {article.title}
            </h2>
            <div className="mt-5 flex items-center gap-3.5 border-b border-white/10 pb-5">
              <div className="h-10 w-10 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 flex items-center justify-center text-[14px] font-bold text-[#F26522] shadow-sm">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-bold text-white">{article.author.name}</p>
                <p className="text-[12px] text-white/50 font-medium">
                  {article.author.role} • {article.date}
                </p>
              </div>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="p-6 rounded-[28px] bg-white/5 border border-white/10 space-y-3.5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-2 text-[#F26522]">
              <Sparkles size={14} />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Executive Takeaways
              </span>
            </div>
            <div className="space-y-2.5">
              {article.keyTakeaways.map((t, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-[13.5px] text-white/85">
                  <span className="h-5 w-5 rounded-full bg-[#F26522]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-[#F26522]" />
                  </span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-[14px] sm:text-[15px] leading-[1.75] text-white/75">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* CTA footer */}
          <div className="p-7 rounded-[30px] bg-gradient-to-r from-[#F26522]/20 to-transparent border border-[#F26522]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <p className="text-[15px] font-bold text-white">
                Want to implement these systems in your growth stack?
              </p>
              <p className="text-[12px] text-white/60">
                Let's review your unit economics on a strategy call.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookCall?.();
              }}
              className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] font-semibold rounded-full px-6 py-2.5 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-all whitespace-nowrap"
            >
              Book Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
