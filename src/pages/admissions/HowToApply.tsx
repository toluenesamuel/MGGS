import { useState } from "react";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { Container } from "@/components/ui/Primitives";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { siteInfo } from "@/data/site";

const tabs = [
  {
    id: "before",
    label: "Before You Apply",
    steps: [
      "Read about our academic approach and the values your child will be taught.",
      "Arrange a visit so you can see the school at work and meet our teachers.",
      "Speak with the school office about the class you are considering for your child.",
      "Ask about fees, payment arrangements and the documents the school will need.",
    ],
  },
  {
    id: "application",
    label: "Completing Your Application",
    steps: [
      "Collect the school's application form from the office, or ask us to guide you through it.",
      "Complete every section, including details of your child's previous school where applicable.",
      "Attach the documents requested by the school office.",
      "Submit your completed application to the office and keep the acknowledgement you are given.",
    ],
  },
  {
    id: "after",
    label: "After You Apply",
    steps: [
      "The school reviews each application carefully and may invite your child for an assessment or conversation.",
      "Where an assessment is needed, the office will agree a convenient time with your family.",
      "You will be contacted with the outcome of your child's application.",
      "Once you accept an offer, the office will explain fees, resumption arrangements and what to prepare.",
    ],
  },
  {
    id: "visit",
    label: "Visiting the School",
    steps: [
      "Contact the school office to agree a day and time that suits your family.",
      "Bring your child if you can — seeing the school helps them feel at home.",
      "Come with your questions about teaching, discipline, activities and daily routines.",
      "Ask us anything. A good decision is an informed one.",
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
        description={`A clear, unhurried route into ${siteInfo.name} — from your first enquiry through to your child's first day.`}
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "How to Apply" }]}
        tone="green"
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div role="tablist" aria-label="Application process" className="flex flex-wrap gap-2">
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

          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink/60">
            Dates, assessment arrangements and document requirements are confirmed by the school office. Please
            speak with us before submitting an application so that nothing is missed.
          </p>
        </Container>
      </section>

      <CTABanner
        tone="gold"
        title="Questions about fees or financial information?"
        description="The school office can explain current fees, payment arrangements and any support available to families."
        actions={
          <LinkButton to="/admissions/fees-and-financial-information" variant="outline-green">
            Fees & Financial Information
          </LinkButton>
        }
      />
    </>
  );
}
