import { Container, SectionHeading } from "@/components/ui/Primitives";
import { LinkButton } from "@/components/ui/Button";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { StatGrid } from "@/components/sections/StatGrid";
import { StoryCarousel } from "@/components/sections/StoryCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { NewsCard } from "@/components/sections/NewsCard";
import { Link } from "@/router/router";
import { bySheNumbers } from "@/data/site";
import { newsArticles } from "@/data/news";

const storyCards = [
  {
    name: "Elpida",
    role: "Grade 12, Prefect",
    blurb: "On finding her voice through the IB Diploma and the Model UN programme.",
    image: "/images/portrait-student-duotone.jpg",
    tone: "sky" as const,
    to: "/community/alums/alum-stories",
  },
  {
    name: "Jaime",
    role: "Alum, Class of 2016",
    blurb: "On how Branksome's Noodle accelerator shaped her path into entrepreneurship.",
    image: "/images/portrait-student-duotone.jpg",
    tone: "gold" as const,
    to: "/community/alums/alum-stories",
  },
  {
    name: "Little",
    role: "Grade 9, Clan Captain",
    blurb: "On what the Clan system taught her about leadership and belonging.",
    image: "/images/portrait-student-duotone.jpg",
    tone: "lime" as const,
    to: "/community/alums/alum-stories",
  },
  {
    name: "Tiffany",
    role: "Alum, Class of 2004",
    blurb: "On staying true to yourself long after graduation.",
    image: "/images/portrait-student-duotone.jpg",
    tone: "coral" as const,
    to: "/community/alums/alum-stories",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-green-900 text-white">
        <div className="absolute inset-0">
          <img src="/images/hero-campus.jpg" alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-900 via-brand-green-900/80 to-brand-green-900/40" />
        </div>
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Leading the way in girls' education
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            A Toronto IB World School, Reimagined as a Design Study
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            This reconstruction is informed by publicly observable content and design patterns from
            branksome.on.ca — Toronto's leading independent IB World School for girls — rebuilt here as a
            front-end architecture and accessibility case study.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton to="/about/the-branksome-difference" variant="solid-coral">
              Why Branksome Hall
            </LinkButton>
            <LinkButton to="/admissions/how-to-apply" variant="outline-white">
              How to Apply
            </LinkButton>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow="Welcome to Branksome Hall"
            title="Toronto's Leading Independent IB World School for Girls"
            description="Our curriculum is globally focused. Our faculty, international. And our technology and facilities, state-of-the-art. We believe that intellectual curiosity and advanced problem-solving are key to thriving in a complex, changing world."
            align="center"
          />
        </Container>
      </section>

      <ImageTextSplit
        eyebrow="Applications for 2027–28 now open"
        title="Discover Our IB Program"
        image="/images/classroom-science.jpg"
        imageAlt="Students working together on a hands-on science project in a bright classroom."
        tone="sky"
        actions={
          <LinkButton to="/learning/our-ib-advantage" variant="outline-green">
            Our IB Advantage
          </LinkButton>
        }
      >
        <p>
          Every Branksome Hall student from Junior Kindergarten to Grade 12 benefits from the IB curriculum.
          Cultivating curiosity, creative and critical thinking, and facilitating regular assessments and
          feedback, the IB offers unparalleled university preparation.
        </p>
        <p>
          Based on their post-secondary goals, students in Grades 11 and 12 choose between two Diploma program
          options — because personalized course selection plays to each student's unique strengths.
        </p>
      </ImageTextSplit>

      <div className="grid gap-px bg-brand-green-900/10 sm:grid-cols-3">
        {[
          { title: "Primary Years Programme JK–Gr. 6", to: "/learning/our-ib-advantage/primary-years-programme", copy: "Nurturing a lifelong love of learning through critical thinking and global perspectives." },
          { title: "Middle Years Programme Gr. 7–10", to: "/learning/our-ib-advantage/middle-years-programme", copy: "Focused on the whole girl — inquiry, real-world application and problem solving." },
          { title: "Diploma or IB Select Gr. 11–12", to: "/learning/our-ib-advantage/ib-pathways-in-grades-11-12", copy: "International-mindedness and intercultural understanding for a connected world." },
        ].map((p) => (
          <div key={p.title} className="bg-white p-8">
            <h3 className="font-display text-lg font-bold text-brand-green-900">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.copy}</p>
            <Link to={p.to} className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-coral hover:underline">
              Learn More →
            </Link>
          </div>
        ))}
      </div>

      <StatGrid title="Branksome by the Numbers" stats={bySheNumbers} tone="green" />

      <ImageTextSplit
        eyebrow="Ideas come to life"
        title="Innovation in Action"
        image="/images/innovation-studio.jpg"
        imageAlt="Students working at benches with laptops in a bright innovation studio."
        tone="gold"
        reverse
        actions={
          <LinkButton to="/innovation/icast" variant="outline-green">
            About iCAST
          </LinkButton>
        }
      >
        <p>
          Inspiring community and sparking interdisciplinary learning, the Karen L. Jurjevich Innovation Centre
          and Studio Theatre (iCAST) embodies our commitment to arts and innovation, uniting scholars, experts
          and our community under one roof.
        </p>
      </ImageTextSplit>

      <StoryCarousel
        title="Make Way for the Next Generation"
        description="Meet the Branksome Hall students and alums learning the skills to change the world."
        cards={storyCards}
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Branksome news" title="Headlines from Campus" />
            <Link to="/branksome-news" className="focus-ring text-sm font-bold text-brand-coral hover:underline">
              View All →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {newsArticles.slice(0, 4).map((article) => (
              <NewsCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        tone="green"
        eyebrow="Make a gift today"
        title="Each day, more than 900 students benefit from your generosity."
        description="At Branksome Hall, we're not just enriching students' minds – we're giving them minds of their own, so they can challenge the status quo and carve their own path to success."
        image="/images/giving-community.jpg"
        actions={
          <LinkButton to="/giving/donate-now" variant="solid-coral">
            Make a Donation
          </LinkButton>
        }
      />

      <CTABanner
        tone="coral"
        title="Start Your Journey"
        description="From important dates, entry grades and details on the application process by grade, find everything you need to get ready to apply to Branksome Hall."
        actions={
          <LinkButton to="/admissions/how-to-apply" variant="outline-white">
            How to Apply
          </LinkButton>
        }
      />
    </>
  );
}
