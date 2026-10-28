import { Container, SectionHeading } from "@/components/ui/Primitives";
import { LinkButton } from "@/components/ui/Button";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { IconFeatureGrid } from "@/components/sections/IconFeatureGrid";
import { StoryCarousel } from "@/components/sections/StoryCarousel";
import { CTABanner } from "@/components/sections/CTABanner";
import { NewsCard } from "@/components/sections/NewsCard";
import { HeroBackdrop } from "@/components/sections/HeroBackdrop";
import { Link } from "@/router/router";
import { schoolValues, siteInfo } from "@/data/site";
import { newsArticles } from "@/data/news";

const storyCards = [
  {
    name: "Learning",
    title: "Learning",
    role: "Academics",
    linkLabel: "Our academic approach",
    blurb: "Clear teaching, steady practice and feedback that moves every pupil forward.",
    image: "/images/story-cutout.png",
    tone: "sky" as const,
    to: "/academics/our-academic-approach",
  },
  {
    name: "Character",
    title: "Character",
    role: "Values",
    linkLabel: "Our values",
    blurb: "Discipline, honesty and respect are taught, practised and noticed every day.",
    image: "/images/story-alum-cutout.png",
    tone: "gold" as const,
    to: "/about/our-values",
  },
  {
    name: "Community",
    title: "Community",
    role: "Families",
    linkLabel: "For families",
    blurb: "Teachers and families working closely together, because pupils do best when we do.",
    image: "/images/story-student-alt-cutout.png",
    tone: "green" as const,
    to: "/community/parents-and-families",
  },
  {
    name: "Ambition",
    title: "Ambition",
    role: "Student Life",
    linkLabel: "Student life",
    blurb: "Clubs, sport, creativity and service that build confidence beyond the classroom.",
    image: "/images/story-alum-cutout.png",
    tone: "coral" as const,
    to: "/student-life",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero-entrance relative overflow-hidden bg-brand-green-900 text-white">
        <HeroBackdrop />
        <Container className="relative flex min-h-[70svh] flex-col justify-end pb-14 pt-24 sm:pb-20 lg:min-h-[78svh]">
          <p className="hero-item hero-eyebrow font-display text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gold sm:text-xs">
            {siteInfo.name}
          </p>
          <h1 className="hero-item hero-heading font-display mt-3 max-w-3xl text-5xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            Building Greatness in Every Child
          </h1>
          <p className="hero-item hero-copy mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            A caring school in {siteInfo.location.area}, {siteInfo.location.city}, where quality education, moral
            instruction and strong character help every pupil grow in confidence.
          </p>
          <div className="hero-item hero-actions mt-8 flex flex-wrap gap-4">
            <LinkButton to="/about/the-mggs-difference" variant="solid-coral">
              Why MGGS
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
            eyebrow={`Welcome to ${siteInfo.name}`}
            title="A School Where Every Pupil Moves Towards Greatness"
            description="We believe that a good education develops the whole child. Our pupils are taught to think clearly, work hard, conduct themselves well and keep learning for life — supported by dedicated teachers and families who share those expectations."
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
            <h2 className="font-display mt-3 text-4xl font-extrabold uppercase leading-none sm:text-5xl lg:text-6xl">Join the MGGS Family</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed">Explore what Marvelous Greatness Schools offers your child. Learn about our school, arrange a visit or ask us about joining.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LinkButton to="/admissions/how-to-apply" variant="solid-green">How to Apply</LinkButton>
              <LinkButton to="/admissions/visit-us" variant="outline-green">Visit Us</LinkButton>
            </div>
          </div>
        </Container>
      </section>

      <ImageTextSplit
        eyebrow="Academic excellence"
        title="Strong Foundations for a Confident Future"
        image="/images/classroom-science.jpg"
        imageAlt="Pupils working together on a hands-on science activity in a bright classroom."
        tone="sky"
        actions={
          <LinkButton to="/academics/our-academic-approach" variant="outline-green">
            Our Academic Approach
          </LinkButton>
        }
      >
        <p>
          Every pupil at Marvelous Greatness Schools is taught a well-planned curriculum, with careful
          attention to literacy, numeracy and reasoning. Regular assessment and constructive feedback make
          sure that progress is real and that no child is left quietly behind.
        </p>
        <p>
          High expectations are matched with genuine support. Pupils are encouraged to ask questions, explain
          their thinking and take pride in work done well — the habits that carry a learner through school and
          beyond it.
        </p>
      </ImageTextSplit>

      <div className="grid gap-px bg-brand-green-900/10 sm:grid-cols-3">
        {[
          { title: "Academic Development", to: "/academics/our-academic-approach", copy: "A sequenced curriculum, strong teaching and feedback that drives real progress." },
          { title: "Moral Instruction & Character", to: "/academics/character-and-moral-instruction", copy: "Discipline, honesty and responsibility taught through lessons and daily example." },
          { title: "Co-Curricular & Personal Growth", to: "/academics/co-curricular-activities", copy: "Activities that build confidence, teamwork and a wider view of the world." },
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

      <IconFeatureGrid
        eyebrow="What we stand for"
        title="Our Guiding Values"
        description={`Motto: “${siteInfo.motto}” — the standard our pupils, teachers and families work towards together.`}
        features={schoolValues}
        tone="green"
      />

      <ImageTextSplit
        eyebrow="Life beyond the lesson"
        title="Confidence, Curiosity and Contribution"
        image="/images/innovation-studio.jpg"
        imageAlt="Pupils working together at tables in a bright, well-resourced classroom."
        tone="gold"
        reverse
        actions={
          <LinkButton to="/student-life" variant="outline-green">
            Explore Student Life
          </LinkButton>
        }
      >
        <p>
          Learning at MGGS does not stop at the classroom door. Clubs, sport, creative work and service give
          pupils the chance to discover what they enjoy, work with others and take responsibility for
          something bigger than themselves.
        </p>
        <p>
          Our teachers know their pupils well, so encouragement is specific and support arrives early — the
          foundation of a happy, confident learner.
        </p>
      </ImageTextSplit>

      <StoryCarousel
        title="Towards Greatness"
        description="The values our pupils live out every day — in class, on the field and at home."
        cards={storyCards}
      />

      <section data-reveal className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="MGGS news" title="News & Announcements" />
            <Link to="/mggs-news" className="focus-ring text-sm font-bold text-brand-coral-ink hover:underline">
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
        eyebrow="Support our pupils"
        title="Every child deserves the chance to do well."
        description="Friends of Marvelous Greatness Schools help us strengthen teaching resources, learning materials and the school environment our pupils depend on."
        image="/images/giving-community.jpg"
        actions={
          <LinkButton to="/giving/donate-now" variant="solid-coral">
            Explore Giving
          </LinkButton>
        }
      />

      <CTABanner
        tone="coral"
        title="Begin Your Child's Journey"
        description="Find out how admissions work at MGGS, arrange a visit and meet the teachers who will guide your child's progress."
        actions={
          <LinkButton to="/admissions/how-to-apply" variant="outline-green" className="border-ink text-ink">
            How to Apply
          </LinkButton>
        }
      />
    </>
  );
}
