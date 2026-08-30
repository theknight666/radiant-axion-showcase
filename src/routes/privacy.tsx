import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/sections";
import { BadgeRow } from "@/components/site/ui-bits";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Axionis Growth Agency" },
      {
        name: "description",
        content:
          "Official Privacy Policy of Axionis Growth Agency in compliance with the DPDP Act (India), GDPR, and global data privacy standards.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#EFEFEF] text-gray-900 selection:bg-[#F26522] selection:text-white">
      <SiteHeader />

      <section className="pt-12 sm:pt-16 pb-20 sm:pb-28 px-5 sm:px-8 lg:px-12 max-w-[1000px] mx-auto">
        <BadgeRow number="1" label="Legal & Governance" borderClass="border-gray-300" />
        <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-[14px] text-gray-500 mb-12 font-medium">
          Effective Date: February 2026 • Axionis Growth Agency Pvt Ltd (Bengaluru & Mumbai, India)
        </p>

        <div className="space-y-10 text-[15px] leading-[1.75] text-gray-700 bg-white p-8 sm:p-12 rounded-[38px] border border-gray-200/90 shadow-[0_20px_45px_-15px_rgba(15,18,25,0.06),inset_0_1px_1px_rgba(255,255,255,1)]">
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">1. Executive Summary</h2>
            <p>
              Axionis Growth Agency ("Axionis", "we", "us", or "our") respects your privacy and is
              committed to protecting the personal data of our website visitors, clients, and
              partners. This Privacy Policy explains how we collect, process, and safeguard
              information in compliance with the Digital Personal Data Protection Act 2023 (DPDP
              Act, India), the General Data Protection Regulation (GDPR), and applicable global data
              standards.
            </p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">
              We collect information that you provide directly to us through strategy inquiries, RFP
              submissions, job applications, or newsletter subscriptions:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li>Contact details: Name, corporate email address, phone number.</li>
              <li>
                Business data: Company website URL, current revenue stage, ad budget estimations.
              </li>
              <li>Recruitment data: Resumes, LinkedIn profiles, and portfolio submissions.</li>
              <li>Technical analytics: Anonymized page telemetry and interaction events.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">3. How We Use Information</h2>
            <p>
              Collected data is strictly used to evaluate growth suitability, deliver contracted
              advisory services, prepare customized performance diagnostics, and maintain client
              communication. We never sell, rent, or trade your personal data to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">4. Cookies & Analytics</h2>
            <p>
              We use minimal, privacy-centric analytics to monitor website performance and Core Web
              Vitals. You may adjust your browser preferences at any time to disable cookies without
              restricting access to our content.
            </p>
          </div>

          <div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-3">5. Data Protection Officer</h2>
            <p>
              For data access requests, deletion, or privacy inquiries, contact our Data Governance
              team directly at{" "}
              <a
                href="mailto:privacy@axionis.agency"
                className="text-[#F26522] font-semibold underline underline-offset-4"
              >
                privacy@axionis.agency
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
