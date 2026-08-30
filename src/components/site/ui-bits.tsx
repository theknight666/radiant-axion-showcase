import React from "react";
import { ArrowRight } from "lucide-react";

export const EASE = "ease-[cubic-bezier(0.25,0.1,0.25,1)]";

export function RollText({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`overflow-hidden h-[20px] flex flex-col ${className}`}>
      <span
        className={`flex flex-col transition-transform duration-500 ${EASE} group-hover:-translate-y-1/2`}
      >
        <span className="h-[20px] leading-[20px]">{label}</span>
        <span className="h-[20px] leading-[20px]">{label}</span>
      </span>
    </span>
  );
}

export function OrangeButton({
  label,
  className = "",
  arrowSize = "w-7 h-7 sm:w-8 sm:h-8",
  onClick,
}: {
  label: string;
  className?: string;
  arrowSize?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-3 bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-[0_12px_28px_-6px_rgba(242,101,34,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_18px_36px_-6px_rgba(242,101,34,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 transition-all duration-300 ${EASE} ${className}`}
    >
      <RollText label={label} />
      <span
        className={`${arrowSize} rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-500 ${EASE} group-hover:-rotate-45`}
      >
        <ArrowRight size={14} className="text-[#F26522]" />
      </span>
    </button>
  );
}

export function DarkButton({
  label,
  className = "",
  onClick,
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-[0_12px_28px_-8px_rgba(15,18,25,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_18px_36px_-6px_rgba(15,18,25,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all duration-300 ${EASE} ${className}`}
    >
      <RollText label={label} />
      <span
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform duration-500 ${EASE} group-hover:-rotate-45`}
      >
        <ArrowRight size={14} className="text-gray-900" />
      </span>
    </button>
  );
}

export function BadgeRow({
  number,
  label,
  borderClass = "border-gray-200",
}: {
  number: string;
  label: string;
  borderClass?: string;
}) {
  return (
    <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]">
        {number}
      </span>
      <span
        className={`text-[12px] sm:text-[13px] font-medium border ${borderClass} rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] bg-white/60 backdrop-blur-sm`}
      >
        {label}
      </span>
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-panel rounded-[28px] transition-all duration-500 ${EASE} hover:-translate-y-1.5 ${className}`}
    >
      {children}
    </div>
  );
}
