import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Award, CheckCircle2, Clock, Globe, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, CtaSection } from "@/components/site/sections";
import { BadgeRow, OrangeButton, RollText } from "@/components/site/ui-bits";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/agency")({
  head: () => ({
    meta: [
      { title: "Agency Manifesto & Leadership — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Discover how Axionis was built in India to eliminate the bloat of traditional agency retainers and deliver senior-led growth systems for category leaders worldwide.",
      },
    ],
  }),
  component: AgencyPage,
});

const TEAM = [
  {
    name: "Aarav Sharma",
    role: "Managing Partner & Head of Strategy",
    bio: "Scaled 4 venture-backed SaaS and DTC brands from early product-market fit to category leaders.",
    location: "Bengaluru, India",
    badge: "Strategy",
  },
  {
    name: "Ananya Iyer",
    role: "VP Conversion Architecture",
    bio: "Ex-Stripe and fintech design lead. Architected conversion funnels generating over ₹800Cr in revenue.",
    location: "Mumbai, India",
    badge: "Design Systems",
  },
  {
    name: "Rohan Malhotra",
    role: "Director of Performance Media",
    bio: "Managed over ₹250Cr in direct response ad spend across Meta, Google Ads, and programmatic channels.",
    location: "Bengaluru, India",
    badge: "Paid Media",
  },
  {
    name: "Dr. Priya Nair",
    role: "Lead Data & Attribution Architect",
    bio: "PhD in Econometrics from IIT/Cambridge. Builds warehouse-native attribution and predictive forecasting.",
    location: "New Delhi, India",
    badge: "Attribution",
  },
];

const PILLARS = [
  {
    number: "01",
    title: "Senior Squads Only",
    copy: "We do not hire junior account managers to learn on your budget. Every squad is led by operators who have personally scaled category-defining brands.",
  },
  {
    number: "02",
    title: "Deterministic Forecasting",
    copy: "No vanity impressions or vague brand metrics. Every sprint ties directly to your unit economics: blended CAC, payback period, and net revenue velocity.",
  },
  {
    number: "03",
    title: "Shipping Cadence",
    copy: "Speed of execution is the only enduring moat. We ship live experiments, landing pages, and creative iterations weekly.",
  },
  {
    number: "04",
    title: "Zero Lock-In Retainers",
    copy: "After the initial 90-day sprint, our contracts roll monthly with 30 days notice. We earn our seat at your table every single quarter.",
  },
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
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function AgencyPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const istTime = useIndiaTime();

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-14 sm:pb-20 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="Agency Manifesto" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            We built Axionis to replace
            <br className="hidden sm:block" /> the broken agency model.
          </h1>
          <p className="mt-6 text-[17px] sm:text-[20px] text-gray-700 leading-relaxed font-normal">
            Traditional agencies sell billable hours and hand your account to junior graduates.
            Axionis embeds senior operators from India who take full accountability for your revenue
            trajectory across domestic and global markets.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white py-16 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <BadgeRow number="2" label="Our Operating Principles" borderClass="border-gray-200" />
          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900 mb-12">
            Engineered around conviction,
            <br className="hidden sm:block" /> speed, and compounding impact.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {PILLARS.map((p) => (
              <div
                key={p.number}
                className="p-8 rounded-[32px] bg-[#FAFAFA] border border-gray-200/80 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-500 shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)]"
              >
                <div>
                  <span className="text-[12px] font-bold tracking-[0.2em] text-[#F26522] bg-[#F26522]/10 px-3 py-1 rounded-full">
                    {p.number}
                  </span>
                  <h3 className="mt-6 text-[20px] font-bold text-gray-900 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-gray-600 font-normal">{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="3" label="Senior Leadership" borderClass="border-gray-300" />
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-gray-900">
              The operators in your corner.
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] text-gray-600 max-w-lg">
              No middle managers. You work directly with specialists who own the strategy and execution.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="p-7 sm:p-8 rounded-[32px] bg-white border border-gray-200/90 shadow-[0_15px_35px_-12px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-3 py-1 rounded-full">
                    {member.badge}
                  </span>
                  <span className="text-[12px] text-gray-500 font-medium flex items-center gap-1">
                    <MapPin size={12} className="text-[#F26522]" />
                    {member.location}
                  </span>
                </div>
                <h3 className="text-[19px] font-bold text-gray-900">{member.name}</h3>
                <p className="text-[13px] text-gray-500 font-medium mt-0.5">{member.role}</p>
                <p className="mt-4 text-[13.5px] leading-relaxed text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Studios in India */}
      <section className="bg-[#0E1015] text-white py-16 sm:py-24 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#F26522]/20 blur-[100px]" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-7 h-7 rounded-full bg-white text-gray-900 text-[12px] font-bold flex items-center justify-center shadow-sm">
              4
            </span>
            <span className="text-[12px] font-medium border border-white/20 rounded-full px-3.5 py-1 text-white/80 bg-white/5 backdrop-blur-md">
              India Presence
            </span>
          </div>

          <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-12">
            Headquartered in India.
            <br />
            <span className="text-white/60">Executing for category leaders worldwide.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {/* Bengaluru Flagship */}
            <div className="p-8 sm:p-10 rounded-[36px] bg-white/5 border border-white/10 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1.5 transition-all duration-500">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/15 px-3 py-1 rounded-full border border-[#F26522]/30">
                    Flagship HQ & Tech Lab
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-white/80 bg-white/10 px-3.5 py-1 rounded-full">
                    <Clock size={12} className="text-[#F26522]" />
                    {istTime} Bengaluru (IST)
                  </span>
                </div>
                <h3 className="text-[26px] font-bold text-white">Indiranagar, Bengaluru</h3>
                <p className="mt-2 text-[14px] text-white/70">
                  100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[13px] text-white/60">
                <span>Data Infrastructure & CRO Labs</span>
                <span className="text-[#F26522] font-semibold">bengaluru@axionis.agency</span>
              </div>
            </div>

            {/* Mumbai Hub */}
            <div className="p-8 sm:p-10 rounded-[36px] bg-white/5 border border-white/10 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:-translate-y-1.5 transition-all duration-500">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/15 px-3 py-1 rounded-full border border-[#F26522]/30">
                    Media & Creative Studio
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-white/80 bg-white/10 px-3.5 py-1 rounded-full">
                    <Clock size={12} className="text-[#F26522]" />
                    {istTime} Mumbai (IST)
                  </span>
                </div>
                <h3 className="text-[26px] font-bold text-white">Bandra Kurla Complex (BKC)</h3>
                <p className="mt-2 text-[14px] text-white/70">
                  BKC One, G Block, Bandra Kurla Complex, Mumbai, Maharashtra 400051
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[13px] text-white/60">
                <span>Performance Media & Brand Scaling</span>
                <span className="text-[#F26522] font-semibold">mumbai@axionis.agency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
