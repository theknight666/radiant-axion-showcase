import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Bookmark, Check, Clock, Mail, Search, Share2, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter, CtaSection } from "@/components/site/sections";
import { BadgeRow, OrangeButton, RollText } from "@/components/site/ui-bits";
import { ArticleModal, ArticleData } from "@/components/site/ArticleModal";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Axionis Journal — Growth & Economics Field Notes" },
      {
        name: "description",
        content:
          "Candid, tactical essays on paid acquisition, attribution modeling, landing page conversion systems, and agency economics from senior operators in India and worldwide.",
      },
    ],
  }),
  component: JournalPage,
});

const ARTICLES: ArticleData[] = [
  {
    id: "death-of-last-click",
    title: "The Mathematical Illusion of Last-Click Attribution in 2026",
    category: "Attribution & Data",
    readTime: "7 min read",
    date: "Feb 14, 2026",
    author: {
      name: "Dr. Priya Nair",
      role: "Lead Data & Attribution Architect",
    },
    summary:
      "Why relying on platform-reported ROAS is mathematically misleading, and how warehouse-native MMM restores capital efficiency.",
    content: [
      "For over a decade, digital marketers have operated under the comfortable delusion of deterministic last-click attribution. An ad was served, a click was registered, a checkout occurred within a 7-day window, and the platform claimed 100% of the credit. In the post-privacy, multi-touch world of 2026, this model is not just inaccurate — it is actively destructive to capital allocation.",
      "When we audit eight-figure scaleups, we consistently find between 25% and 40% of reported paid spend is claiming organic or brand-search intent that would have converted regardless. Platforms are incentivized to claim credit, not discover incrementality.",
      "The solution lies in decoupling measurement from the ad networks themselves. By streaming first-party server-side events directly to Snowflake or BigQuery and running daily regression-based Marketing Mix Modelling (MMM), growth leaders gain true visibility into channel incrementality and diminishing marginal returns.",
    ],
    keyTakeaways: [
      "Platform-reported ROAS routinely overstates incrementality by 25-40% on brand-heavy channels.",
      "Server-side event streaming (CAPI) is the foundational requirement for signal recovery.",
      "Geo-lift experiments remain the gold standard for measuring true paid incrementality.",
    ],
  },
  {
    id: "creative-velocity-moat",
    title: "Why Creative Testing Cadence is the Only Enduring Acquisition Moat",
    category: "Performance Media",
    readTime: "5 min read",
    date: "Jan 28, 2026",
    author: {
      name: "Rohan Malhotra",
      role: "Director of Performance Media",
    },
    summary:
      "Algorithmic bidding has commoditized media buying. The only sustainable advantage is how fast you can validate differentiated creative concepts.",
    content: [
      "Media buying in 2026 is no longer about secret audience hacks, bid manual capping, or complex account structures. Machine learning engines on Meta Advantage+ and Google Demand Gen have commoditized distribution. If you and your competitor have the same algorithm, the differentiator is the asset that feeds it.",
      "The winning brands are shipping 15 to 30 net-new creative angles every week. Not micro-variations of a button color, but fundamentally distinct emotional hooks, problem frames, and direct response angles.",
      "At Axionis, our creative velocity sprint tests angles in small, controlled sandboxes before graduating winning hooks to multi-crore scale campaigns with predictable efficiency.",
    ],
    keyTakeaways: [
      "Audience targeting is largely automated; creative is the new targeting parameter.",
      "Aim for a minimum velocity of 15 unique direct response angles per squad per week.",
      "Separate the concept validation sandbox from your core scale campaigns to protect ROAS.",
    ],
  },
  {
    id: "high-converting-webgl",
    title: "Interactive WebGL Without Core Web Vitals Penalties",
    category: "Conversion & Tech",
    readTime: "9 min read",
    date: "Jan 12, 2026",
    author: {
      name: "Ananya Iyer",
      role: "VP Conversion Architecture",
    },
    summary:
      "A deep-dive into lazy shader compilation, offscreen canvas rendering, and how to deliver cinematic 3D experiences that still pass Google PageSpeed with flying colors.",
    content: [
      "For years, web designers faced a painful compromise: build a stunning, interactive 3D website that takes 6 seconds to load, or build a boring, static page that loads instantly. That tradeoff is officially obsolete.",
      "By utilizing modern progressive enhancement, dynamic viewport-triggered shader compilation, and OffscreenCanvas in dedicated Web Workers, you can deliver 60fps WebGL showcases that score 95+ on mobile Lighthouse.",
      "When we engineered the Narrativ showcase, enterprise demo requests jumped by 340% because buyers could interactively experience the product's speed in real time right in the hero viewport.",
    ],
    keyTakeaways: [
      "Never block the main thread for WebGL shader compilation.",
      "Use OffscreenCanvas to decouple heavy physics from touch event scrolling.",
      "Progressive hydration ensures mobile users get instantaneous interactivity.",
    ],
  },
];

const CATEGORIES = ["All", "Attribution & Data", "Performance Media", "Conversion & Tech"];

function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeArticle, setActiveArticle] = useState<ArticleData | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Subscribed! You'll receive our monthly field notes.");
    setNewsletterEmail("");
  };

  const filteredArticles =
    selectedCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader onBookCall={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 max-w-[1440px] mx-auto">
        <BadgeRow number="1" label="The Axionis Journal" borderClass="border-gray-300" />
        <div className="max-w-4xl">
          <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-gray-900">
            Perspectives on growth,
            <br className="hidden sm:block" />
            <span className="text-[#F26522]"> economics, and scale.</span>
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 leading-relaxed font-normal">
            Candid field notes from operators actively managing multi-crore revenue engines across
            India, the US, and international markets.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5 border-b border-gray-300/80 pb-4">
          <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mr-2 flex items-center gap-1.5">
            <Search size={13} />
            Filter:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gray-900 text-white shadow-[0_8px_20px_-4px_rgba(15,18,25,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Lead Article */}
      <section className="px-5 sm:px-8 lg:px-12 pb-12 max-w-[1440px] mx-auto">
        <div
          onClick={() => setActiveArticle(ARTICLES[0])}
          className="group cursor-pointer rounded-[38px] bg-white p-8 sm:p-12 border border-gray-200/90 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_30px_65px_-15px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-3.5 py-1 rounded-full">
                Featured Essay
              </span>
              <span className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium">
                <Clock size={13} />
                {ARTICLES[0].readTime}
              </span>
            </div>
            <h2 className="text-[clamp(1.6rem,3.8vw,2.8rem)] font-bold text-gray-900 leading-[1.12] tracking-tight group-hover:text-[#F26522] transition-colors max-w-3xl">
              {ARTICLES[0].title}
            </h2>
            <p className="mt-4 text-[16px] sm:text-[17px] text-gray-600 leading-relaxed max-w-3xl font-normal">
              {ARTICLES[0].summary}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#F26522]/10 border border-[#F26522]/20 flex items-center justify-center font-bold text-[13px] text-[#F26522] shadow-sm">
                {ARTICLES[0].author.name.charAt(0)}
              </div>
              <div>
                <p className="text-[13.5px] font-bold text-gray-900">{ARTICLES[0].author.name}</p>
                <p className="text-[12px] text-gray-500">{ARTICLES[0].author.role}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-[13px] font-bold text-[#F26522]">
              <span>Read complete essay</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Remaining Articles Grid */}
      <section className="px-5 sm:px-8 lg:px-12 pb-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8">
          {filteredArticles.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group cursor-pointer rounded-[38px] bg-white p-8 border border-gray-200/90 shadow-[0_18px_40px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_28px_65px_-15px_rgba(15,18,25,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F26522] bg-[#F26522]/10 px-3 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[12px] text-gray-500 font-medium">{article.readTime}</span>
                </div>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-gray-900 leading-tight group-hover:text-[#F26522] transition-colors">
                  {article.title}
                </h3>
                <p className="mt-3 text-[14px] text-gray-600 leading-relaxed font-normal">
                  {article.summary}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[12.5px] text-gray-500 font-semibold">{article.author.name}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#F26522]">
                  <span>Read Note</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Banner */}
      <section className="px-5 sm:px-8 lg:px-12 pb-20 max-w-[1440px] mx-auto">
        <div className="p-8 sm:p-12 rounded-[38px] bg-[#0E1015] text-white shadow-[0_35px_90px_-25px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#F26522]/25 blur-[90px]" />
          <div className="max-w-xl relative z-10">
            <div className="flex items-center gap-2 text-[#F26522] mb-3">
              <Mail size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Monthly Operator Dispatch
              </span>
            </div>
            <h3 className="text-[24px] sm:text-[30px] font-bold tracking-tight text-white">
              No fluff. Just the frameworks we use to scale eight-figure revenue engines.
            </h3>
            <p className="mt-2 text-[14px] text-white/70">
              Delivered on the first Tuesday of every month. Read by over 14,000 founders and growth
              executives.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative z-10 w-full lg:max-w-md">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="founder@company.com"
                className="w-full rounded-full bg-white/10 border border-white/20 px-5 py-3 text-[14px] text-white placeholder:text-white/40 focus:border-[#F26522] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#F26522] hover:bg-[#e05a1a] text-white text-[13px] font-semibold rounded-full px-6 py-3 shadow-[0_10px_25px_rgba(242,101,34,0.4)] transition-colors shrink-0"
              >
                Join Dispatch
              </button>
            </div>
            <p className="mt-2 text-[11px] text-white/45">
              Strictly zero spam. Unsubscribe with one click anytime.
            </p>
          </form>
        </div>
      </section>

      {/* Article Detail Modal */}
      <ArticleModal
        article={activeArticle}
        isOpen={Boolean(activeArticle)}
        onClose={() => setActiveArticle(null)}
        onBookCall={() => {
          setActiveArticle(null);
          setIsBookingOpen(true);
        }}
      />

      {/* Global Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      <CtaSection onBookCall={() => setIsBookingOpen(true)} />
      <SiteFooter onStartProject={() => setIsBookingOpen(true)} />
    </main>
  );
}
