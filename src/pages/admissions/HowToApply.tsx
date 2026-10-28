import { useState } from "react";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { Container } from "@/components/ui/Primitives";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const tabs = [
  {
    id: "junior",
    label: "Junior School (JK–Gr. 6)",
    steps: [
      "Submit an online application and application fee.",
      "Attend a Junior School Open House and schedule a playdate/visit.",
      "Submit school reports and complete any requested assessments.",
      "Receive your admissions decision on Decision Day.",
    ],
  },
  {
    id: "middle",
    label: "Middle School (Gr. 7–10)",
    steps: [
      "Submit an online application, transcripts and a reference form.",
      "Attend a Middle School Open House.",
      "Complete an entrance assessment and a student interview.",
      "Receive your admissions decision on Decision Day.",
    ],
  },
  {
    id: "senior",
    label: "Senior School (Gr. 11–12)",
    steps: [
      "Submit an online application, transcripts and reference forms.",
      "Attend a Senior School Open House and plan your IB Diploma or IB Select pathway.",
      "Complete an interview and any outstanding assessments.",
      "Receive your admissions decision on Decision Day.",
    ],
  },
  {
    id: "boarding",
    label: "Boarding",
    steps: [
      "Boarding applications are accepted on a rolling basis.",
      "Submit an online application with guardian and health documentation.",
      "Complete a virtual or in-person interview with the Boarding team.",
      "Receive your admissions decision and residence placement.",
    ],
  },
];

export default function HowToApply() {
  const [active, setActive] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === active)!;

  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="How to Apply"
        description="Important dates, entry grades and the application process by grade — everything you need to apply to Branksome Hall."
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "How to Apply" }]}
        tone="green"
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div role="tablist" aria-label="Application process by grade" className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={active === tab.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "focus-ring rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active === tab.id
                    ? "border-brand-coral bg-brand-coral text-ink"
                    : "border-brand-green-900/20 text-brand-green-900 hover:border-brand-coral",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`panel-${activeTab.id}`}
            aria-labelledby={`tab-${activeTab.id}`}
            className="mt-8 max-w-2xl rounded-lg border border-black/5 bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="font-display text-xl font-bold text-brand-green-900">{activeTab.label}</h2>
            <ol className="mt-4 space-y-3">
              {activeTab.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink/80 sm:text-base">
                  <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-green-900 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <LinkButton to="/admissions/connect-with-admissions" className="mt-6">
              Connect with Admissions
            </LinkButton>
          </div>
        </Container>
      </section>

      <CTABanner
        tone="gold"
        title="Questions about tuition or financial assistance?"
        description="We offer financial assistance, entrance scholarships and flexible payment plans."
        actions={
          <LinkButton to="/admissions/tuition-and-financial-support" variant="outline-green">
            Tuition & Financial Support
          </LinkButton>
        }
      />
    </>
  );
}
