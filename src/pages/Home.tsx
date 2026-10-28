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
    role: "Student",
    blurb: "She built two apps by Grade 6. Her next big idea is already loading.",
    image: "/images/story-cutout.png",
    tone: "sky" as const,
    to: "/community/alums/alum-stories",
  },
  {
    name: "Jaime",
    role: "Alum",
    blurb: "She leads on the water and in the community. Duke is just the beginning.",
    image: "/images/story-alum-cutout.png",
    tone: "gold" as const,
    to: "/community/alums/alum-stories",
  },
  {
    name: "Titoluwa",
    role: "Student",
    blurb: "She built a home away from home, and a voice that reaches far beyond it.",
    image: "/images/story-student-alt-cutout.png",
    tone: "green" as const,
    to: "/community/alums/alum-stories",
  },
  {
    name: "Milla",
    role: "Alum",
    blurb: "Her goal is to become one of the few female pilots in the industry.",
    image: "/images/story-alum-cutout.png",
    tone: "coral" as const,
    to: "/community/alums/alum-stories",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero-entrance relative overflow-hidden bg-brand-green-900 text-white">
        <div className="absolute inset-0">
          <img src="/images/aerial-campus.jpg" alt="" className="hero-visual h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-900 via-brand-green-900/70 to-brand-green-900/30" />
        </div>
        <Container className="relative flex min-h-[70svh] flex-col justify-end pb-14 pt-24 sm:pb-20 lg:min-h-[78svh]">
          <p className="hero-item hero-eyebrow font-display text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Branksome Hall
          </p>
          <h1 className="hero-item hero-heading font-display mt-3 max-w-3xl text-5xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            Leading the Way in Girls' Education
          </h1>
          <p className="hero-item hero-copy mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            An independent IB World School for girls, where curiosity, creativity and a global perspective make way for extraordinary possibilities.
          </p>
          <div className="hero-item hero-actions mt-8 flex flex-wrap gap-4">
            <LinkButton to="/about/the-branksome-difference" variant="solid-coral">
              Why Branksome Hall
            </LinkButton>
            <LinkButton to="/admissions/how-to-apply" variant="outline-white">
              How to Apply
            </LinkButton>
          </div>
        </Container>
      </section>

      <section data-reveal className="bg-paper py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <SectionHeading
            eyebrow="Welcome to Branksome Hall"
            title="Toronto's Leading Independent IB World School for Girls"
            description="Our curriculum is globally focused. Our faculty, international. And our technology and facilities, state-of-the-art. We believe that intellectual curiosity and advanced problem-solving are key to thriving in a complex, changing world."
            align="center"
          />
        </Container>
      </section>

      <section data-reveal className="admissions-feature overflow-hidden bg-[#1db8e0] text-brand-green-900">
        <Container className="grid items-end gap-5 pt-12 md:grid-cols-2 md:gap-10 md:pt-16">
          <div className="admissions-visual order-2 mx-auto w-full max-w-md md:order-1">
            <img src="/images/admissions-cutout.png" alt="" className="block h-72 w-full object-contain object-bottom sm:h-96 md:h-[32rem]" loading="lazy" />
          </div>
          <div className="admissions-copy order-1 pb-4 md:order-2 md:pb-20">
            <p className="text-sm font-bold uppercase tracking-wider">Your journey starts here</p>
            <h2 className="font-display mt-3 text-4xl font-extrabold uppercase leading-none sm:text-5xl lg:text-6xl">Applications for 2027–28 now open!</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed">Explore all that Branksome has to offer. Learn about our school, join an event or take a virtual tour.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton to="/admissions/how-to-apply" variant="solid-green">How to Apply</LinkButton>
              <LinkButton to="/admissions/visit-us" variant="outline-green">Visit Us</LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <ImageTextSplit
        eyebrow="The IB advantage"
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
            <Link to={p.to} className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-coral-ink hover:underline">
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

      <section data-reveal className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Branksome news" title="Headlines from Campus" />
            <Link to="/branksome-news" className="focus-ring text-sm font-bold text-brand-coral-ink hover:underline">
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
          <LinkButton to="/admissions/how-to-apply" variant="outline-green" className="border-ink text-ink">
            How to Apply
          </LinkButton>
        }
      />
    </>
  );
}
