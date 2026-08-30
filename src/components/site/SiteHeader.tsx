import React, { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Clock, Menu, X } from "lucide-react";
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
      <header className={`relative z-30 max-w-[1440px] mx-auto w-full p-2.5 sm:p-3.5 ${className}`}>
        <nav className="bg-white/95 backdrop-blur-md rounded-full p-[6px] sm:px-6 flex items-center justify-between shadow-[0_16px_36px_-10px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] border border-black/[0.04] transition-all duration-300 hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.09)]">
          <div className="flex items-center gap-8">
            <Link to="/" className="hover:opacity-90 transition-opacity">
              <AxionisLogo variant="light" size="sm" showTagline={true} />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  currentPath === item.href ||
                  (item.href !== "/" && currentPath.startsWith(item.href));
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-[14px] font-medium transition-colors duration-200 relative py-1 ${
                      isActive
                        ? "text-[#F26522] font-semibold"
                        : "text-gray-800 hover:text-[#F26522]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F26522] rounded-full shadow-sm" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <span className="hidden lg:inline text-[13px] text-gray-600 font-medium">
              Taking on partner clients for Q1 2026
            </span>
            <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border-l border-gray-200/80 pl-4 font-medium">
              <Clock size={14} className="text-[#F26522]" />
              {time} in India (IST)
            </span>
            <button
              onClick={onBookCall}
              className="group inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 shadow-[0_8px_20px_-4px_rgba(15,18,25,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_24px_-4px_rgba(15,18,25,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <RollText label="Book a strategy call" />
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                <ArrowRight size={13} className="text-gray-900" />
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center gap-2 bg-gray-900 text-white text-[13px] rounded-full px-4 py-2 shadow-sm"
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
            <div className="bg-white rounded-[36px] mx-3 mb-3 p-7 border border-gray-100 shadow-[0_30px_90px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,1)] animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <AxionisLogo variant="light" size="sm" />
                </Link>
                <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-600 border border-gray-200/80 rounded-full px-3.5 py-1 font-medium bg-gray-50">
                  <Clock size={12} className="text-[#F26522]" />
                  {time} IST (India)
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-3.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-[26px] font-semibold leading-tight transition-colors ${
                        isActive
                          ? "text-[#F26522] pl-3 border-l-3 border-[#F26522]"
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
                className="group mt-7 w-full inline-flex items-center justify-between bg-gray-900 hover:bg-black text-white text-[14px] font-semibold rounded-full pl-6 pr-2 py-3 shadow-[0_12px_28px_-6px_rgba(15,18,25,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]"
              >
                <RollText label="Book a strategy call" />
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:-rotate-45 shadow-sm">
                  <ArrowRight size={14} className="text-gray-900" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
