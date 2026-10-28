import { Container, SectionHeading } from "@/components/ui/Primitives";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";

export function Timeline({
  id,
  eyebrow,
  title,
  description,
  items,
  tone = "white",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: AccordionItemData[];
  tone?: "white" | "green";
}) {
  const isDark = tone === "green";
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${isDark ? "bg-brand-green-900" : "bg-paper"}`}>
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} light={isDark} />
        <div className="mt-8">
          <Accordion items={items} dark={isDark} />
        </div>
      </Container>
    </section>
  );
}
