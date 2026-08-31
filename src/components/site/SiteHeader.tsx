import React, { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Clock, Menu, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { AxionisLogo } from "./AxionisLogo";
import { RollText } from "./ui-bits";
import { soundEngine } from "@/lib/sound-fx";

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
  const [soundActive, setSoundActive] = useState(soundEngine.isEnabled());
  const time = useIndiaTime();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Liquid Water Droplet State
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [dropletStyle, setDropletStyle] = useState<{
    left: number;
    width: number;
    height: number;
    opacity: number;
    isMoving: boolean;
  }>({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
    isMoving: false,
  });

  useEffect(() => {
    return soundEngine.subscribe((val) => setSoundActive(val));
  }, []);

  const targetHref =
    hoveredHref ||
    NAV_ITEMS.find(
      (item) =>
        currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href)),
    )?.href ||
    NAV_ITEMS[0].href;

  // Recalculate droplet position on target change or window resize
  useEffect(() => {
    const updateDroplet = () => {
      const container = navContainerRef.current;
      const targetEl = itemRefs.current.get(targetHref);

      if (container && targetEl) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();

        setDropletStyle((prev) => ({
          left: targetRect.left - containerRect.left,
          width: targetRect.width,
          height: targetRect.height,
          opacity: 1,
          isMoving: true,
        }));

        const timer = setTimeout(() => {
          setDropletStyle((prev) => ({ ...prev, isMoving: false }));
        }, 400);

        return () => clearTimeout(timer);
      }
    };

    updateDroplet();
    window.addEventListener("resize", updateDroplet);
    return () => window.removeEventListener("resize", updateDroplet);
  }, [targetHref, currentPath]);

  const handleToggleSound = () => {
    const next = soundEngine.toggle();
    setSoundActive(next);
  };

  const handleItemHover = (href: string) => {
    if (href !== targetHref) {
      soundEngine.playDroplet();
    }
    setHoveredHref(href);
  };

  const handleItemLeave = () => {
    setHoveredHref(null);
  };

  const handleNavClick = () => {
    soundEngine.playDroplet();
  };

  return (
    <>
      <header className={`relative z-30 max-w-[1440px] mx-auto w-full p-2.5 sm:p-4 ${className}`}>
        <nav className="bg-white/85 backdrop-blur-xl rounded-full p-[6px] sm:px-6 flex items-center justify-between shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08),inset_0_1px_1.5px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.03)] border border-black/[0.05] transition-all duration-300 hover:shadow-[0_25px_55px_-10px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-7 lg:gap-10">
            <Link
              to="/"
              onClick={() => soundEngine.playClick()}
              className="hover:opacity-90 transition-opacity"
            >
              <AxionisLogo variant="light" size="sm" showTagline={true} />
            </Link>

            {/* Desktop Navigation with Water Droplet Animation */}
            <div
              ref={navContainerRef}
              onMouseLeave={handleItemLeave}
              className="hidden md:flex items-center gap-1 bg-gray-100/75 p-1 rounded-full border border-black/[0.04] backdrop-blur-md relative select-none"
            >
              {/* LIQUID WATER DROPLET INDICATOR */}
              <div
                aria-hidden="true"
                style={{
                  transform: `translateX(${dropletStyle.left}px) scaleX(${
                    dropletStyle.isMoving ? 1.08 : 1
                  }) scaleY(${dropletStyle.isMoving ? 0.94 : 1})`,
                  width: dropletStyle.width || 0,
                  height: dropletStyle.height || 0,
                  opacity: dropletStyle.opacity,
                  transition:
                    "transform 0.42s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.35s ease, height 0.35s ease, opacity 0.2s ease",
                }}
                className="absolute top-1 left-0 pointer-events-none rounded-full z-0 overflow-hidden"
              >
                {/* 1. Droplet Body with Water Refraction Gradient */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-white via-white/95 to-orange-50/70 border border-black/[0.04] shadow-[0_8px_20px_-4px_rgba(242,101,34,0.3),0_2px_8px_-2px_rgba(15,18,25,0.08),inset_0_1.5px_2px_0_rgba(255,255,255,1),inset_0_-1.5px_2px_0_rgba(242,101,34,0.2)]" />

                {/* 2. Top Specular Water Glare Arc */}
                <div className="absolute top-1 inset-x-3 h-2 rounded-full bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />

                {/* 3. Fluid Droplet Center Caustic Bead */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-[#F26522]/40 blur-[0.5px]" />
              </div>

              {/* Navigation Link Items */}
              {NAV_ITEMS.map((item) => {
                const isActive =
                  currentPath === item.href ||
                  (item.href !== "/" && currentPath.startsWith(item.href));
                const isHovered = hoveredHref === item.href;

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.href, el);
                      else itemRefs.current.delete(item.href);
                    }}
                    onMouseEnter={() => handleItemHover(item.href)}
                    onClick={handleNavClick}
                    className={`relative z-10 text-[13.5px] font-semibold px-4 py-1.5 rounded-full transition-colors duration-300 ${
                      isActive || isHovered ? "text-[#F26522]" : "text-gray-700 hover:text-gray-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            {/* Audio Synthesizer Toggle */}
            <button
              onClick={handleToggleSound}
              title={
                soundActive
                  ? "Mute synthesized audio feedback"
                  : "Enable synthesized luxury audio haptics"
              }
              className={`flex items-center gap-2 text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-300 ${
                soundActive
                  ? "bg-[#F26522]/10 border-[#F26522]/30 text-[#F26522]"
                  : "bg-gray-100/80 border-black/[0.05] text-gray-500 hover:text-gray-900"
              }`}
            >
              {soundActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span className="hidden xl:inline">Sound</span>
              {soundActive && (
                <span className="flex items-center gap-0.5 h-2.5">
                  <span className="w-0.5 h-full bg-[#F26522] animate-pulse" />
                  <span className="w-0.5 h-2 bg-[#F26522] animate-pulse delay-75" />
                  <span className="w-0.5 h-3 bg-[#F26522] animate-pulse delay-150" />
                </span>
              )}
            </button>

            {/* Live IST Clock */}
            <span className="flex items-center gap-2 text-[12.5px] text-gray-700 bg-gray-100/80 border border-black/[0.04] px-3.5 py-1.5 rounded-full font-mono font-medium shadow-inner">
              <Clock size={13} className="text-[#F26522]" />
              {time || "18:00:00"} IST
            </span>

            {/* Strategy Call Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onBookCall?.();
              }}
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
            onClick={() => {
              soundEngine.playSwitch();
              setMenuOpen((v) => !v);
            }}
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
                <Link
                  to="/"
                  onClick={() => {
                    handleNavClick();
                    setMenuOpen(false);
                  }}
                >
                  <AxionisLogo variant="light" size="sm" />
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleSound}
                    className="p-2 rounded-full bg-gray-100 text-gray-700"
                  >
                    {soundActive ? (
                      <Volume2 size={14} className="text-[#F26522]" />
                    ) : (
                      <VolumeX size={14} />
                    )}
                  </button>
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-gray-700 border border-gray-200/80 rounded-full px-3.5 py-1 font-mono font-medium bg-gray-50">
                    <Clock size={12} className="text-[#F26522]" />
                    {time} IST
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => {
                        handleNavClick();
                        setMenuOpen(false);
                      }}
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
                  soundEngine.playClick();
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
