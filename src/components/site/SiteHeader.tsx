import React, { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Clock, Menu, Sparkles, X } from "lucide-react";
import { AxionisLogo } from "./AxionisLogo";
import { RollText } from "./ui-bits";

interface SiteHeaderProps {
  onBookCall?: () => void;
  className?: string;
}

const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "Agency", href: "/agency" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "Connect", href: "/connect" },
];

function useIndiaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function SiteHeader({ onBookCall, className = "" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useIndiaTime();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <>
      <header className={`relative z-30 max-w-[1440px] mx-auto w-full p-2.5 sm:p-4 ${className}`}>
        <nav className="bg-white/85 backdrop-blur-xl rounded-full p-[6px] sm:px-6 flex items-center justify-between shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08),inset_0_1px_1.5px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.03)] border border-black/[0.05] transition-all duration-300 hover:shadow-[0_25px_55px_-10px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-7 lg:gap-10">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <AxionisLogo variant="light" size="sm" showTagline={true} />
            </Link>
            <div className="hidden md:flex items-center gap-1 bg-gray-100/70 p-1 rounded-full border border-black/[0.04] backdrop-blur-sm">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  currentPath === item.href ||
                  (item.href !== "/" && currentPath.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-[13.5px] font-semibold px-4 py-1.5 rounded-full transition-all duration-300 relative ${
                      isActive
                        ? "bg-white text-[#F26522] shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)]"
                        : "text-gray-700 hover:text-gray-900 hover:bg-white/40"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-5">
            {/* Live Capacity Pill */}
            <div className="hidden xl:flex items-center gap-2 text-[12.5px] text-gray-700 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>2 Partner Slots Left (Q1 2026)</span>
            </div>

            {/* Live IST Clock */}
            <span className="flex items-center gap-2 text-[12.5px] text-gray-700 bg-gray-100/80 border border-black/[0.04] px-3.5 py-1.5 rounded-full font-mono font-medium shadow-inner">
              <Clock size={13} className="text-[#F26522]" />
              {time || "18:00:00"} IST
            </span>

            {/* Strategy Call Button */}
            <button
              onClick={onBookCall}
              className="group relative overflow-hidden inline-flex items-center gap-3 bg-gradient-to-b from-[#1b1e28] to-[#0c0e14] hover:from-[#11131a] hover:to-[#040507] text-white text-[13px] font-semibold rounded-full pl-5 pr-2 py-2 shadow-[0_10px_24px_-4px_rgba(15,18,25,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_16px_32px_-4px_rgba(15,18,25,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <RollText label="Book strategy call" />
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                <ArrowRight size={13} className="text-gray-900" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center gap-2 bg-gray-900 text-white text-[13px] font-semibold rounded-full px-4 py-2 shadow-sm"
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
            {menuOpen ? "Close" : "Menu"}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end">
            <div className="bg-white rounded-[36px] mx-3 mb-3 p-7 border border-gray-100 shadow-[0_30px_90px_rgba(0,0,0,0.4),inset_0_1px_1.5px_rgba(255,255,255,1)] animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <AxionisLogo variant="light" size="sm" />
                </Link>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 border border-gray-200/80 rounded-full px-3.5 py-1 font-mono font-medium bg-gray-50">
                  <Clock size={12} className="text-[#F26522]" />
                  {time} IST
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-[24px] font-bold py-1 leading-tight transition-colors ${
                        isActive
                          ? "text-[#F26522] pl-3 border-l-4 border-[#F26522]"
                          : "text-gray-900 hover:text-[#F26522]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBookCall?.();
                }}
                className="group mt-6 w-full inline-flex items-center justify-between bg-[#F26522] hover:bg-[#e05a1a] text-white text-[14px] font-semibold rounded-full pl-6 pr-2 py-3 shadow-[0_12px_28px_-6px_rgba(242,101,34,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]"
              >
                <RollText label="Book a strategy call" />
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                  <ArrowRight size={14} className="text-[#F26522]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
