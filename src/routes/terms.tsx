import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/sections";
import { BadgeRow } from "@/components/site/ui-bits";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Terms of Service governing strategic consulting, performance media execution, and retainer agreements with Axionis Growth Agency.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader />

      <section className="pt-12 sm:pt-16 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12 max-w-[1000px] mx-auto">
        <BadgeRow number="1" label="Legal & Governance" borderClass="border-gray-300" />
        <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-[14px] text-gray-500 mb-12 font-medium">
          Effective Date: February 2026 • Axionis Growth Agency Pvt Ltd
        </p>

        <div className="space-y-10 text-[15px] leading-[1.75] text-gray-700 bg-white p-8 sm:p-12 rounded-[38px] border border-gray-200/90 shadow-[0_20px_45px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)]">
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">1. Scope of Engagement</h2>
            <p>
              Axionis provides senior-led growth consulting, performance media buying, conversion
              engineering, and data infrastructure advisory. All specific project deliverables,
              schedules, and commercial terms are defined within mutually agreed Statements of Work
              (SOW).
            </p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">2. Intellectual Property</h2>
            <p>
              Upon full settlement of contracted invoices, all custom creative assets, landing page
              code, and proprietary attribution models built specifically for the client transfer
              fully to the client. Axionis retains ownership of foundational frameworks and reusable
              agency tooling.
            </p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">3. Retainers & Termination</h2>
            <p>
              Following the standard 90-day initial acceleration sprint, ongoing retainers roll on a
              month-to-month basis cancellable with thirty (30) days written notice by either party.
            </p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">4. Media Budget & Platform Direct Billing</h2>
            <p>
              Media budgets for platforms including Meta, Google, TikTok, and programmatic networks
              are funded directly by the client via their owned advertising accounts. Axionis never
              acts as a media billing intermediary or marks up platform fees.
            </p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">5. Governing Law & Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of India, with exclusive jurisdiction in the
              competent courts of Bengaluru or Mumbai, India.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
