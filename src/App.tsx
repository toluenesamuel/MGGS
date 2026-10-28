import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RouterProvider, useRouter, Link } from "@/router/router";
import { Layout } from "@/components/layout/Layout";
import { InteriorHero } from "@/components/sections/InteriorHero";
import { NewsFilterableGrid } from "@/components/sections/NewsFilterableGrid";
import { Container } from "@/components/ui/Primitives";
import { DonationForm } from "@/components/forms/DonationForm";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { genericPages, type GenericPageContent } from "@/data/genericPages";
import { primaryNav } from "@/data/navigation";
import { newsArticles } from "@/data/news";
import Home from "@/pages/Home";
import SectionPage from "@/pages/SectionPage";
import BranksomeDifference from "@/pages/about/BranksomeDifference";
import OurHistory from "@/pages/about/OurHistory";
import ContactUs from "@/pages/about/ContactUs";
import StartHere from "@/pages/admissions/StartHere";
import HowToApply from "@/pages/admissions/HowToApply";
import VisitUs from "@/pages/admissions/VisitUs";
import TuitionFinancialSupport from "@/pages/admissions/TuitionFinancialSupport";
import BoardingProgram from "@/pages/admissions/BoardingProgram";

const pages: Record<string, () => React.JSX.Element> = {
  "/": Home,
  "/about/the-branksome-difference": BranksomeDifference,
  "/about/our-history": OurHistory,
  "/about/contact-us": ContactUs,
  "/admissions/start-here": StartHere,
  "/admissions/how-to-apply": HowToApply,
  "/admissions/visit-us": VisitUs,
  "/admissions/tuition-and-financial-support": TuitionFinancialSupport,
  "/admissions/boarding-program": BoardingProgram,
};

const extraPages: Record<string, GenericPageContent> = Object.fromEntries([
  ["/learning/our-ib-advantage", "Learning", "Our IB Advantage", "Every student from Junior Kindergarten to Grade 12 benefits from the International Baccalaureate curriculum, cultivating curiosity, critical thinking and a global perspective."],
  ["/learning/our-ib-advantage/primary-years-programme", "Learning", "Primary Years Programme JK–6", "The Primary Years Programme nurtures curiosity, inquiry and a lifelong love of learning."],
  ["/learning/our-ib-advantage/middle-years-programme", "Learning", "Middle Years Programme 7–10", "The Middle Years Programme connects classroom learning with real-world questions and encourages independent thinking."],
  ["/learning/our-ib-advantage/ib-pathways-in-grades-11-12", "Learning", "IB Pathways in Grades 11–12", "Students in Grades 11 and 12 choose between two Diploma program options based on their strengths and post-secondary goals."],
  ["/learning/student-life", "Learning", "Student Life", "Discover opportunities to connect, create and lead through the arts, athletics, clubs and co-curricular activities."],
  ["/innovation/icast", "Innovation", "iCAST", "The Karen L. Jurjevich Innovation Centre and Studio Theatre brings arts, innovation and community together under one roof."],
  ["/the-campus/our-campus", "The Campus", "Our Campus", "Explore a 13-acre campus in the heart of Toronto, where heritage buildings and modern learning spaces come together."],
  ["/community/alums", "Community", "Alums", "Our community of graduates stays connected through shared experiences, stories and opportunities to make an impact."],
  ["/giving/giving-opportunities", "Giving", "Giving Opportunities", "Explore ways to support students, programs and spaces at Branksome Hall."],
].map(([path, section, title, summary]) => [path, { section, trailLabel: section, title, summary, tone: "sky", relatedLabel: "Explore more", related: primaryNav.find(g => g.label === section)?.links.filter(l => l.to !== path).slice(0, 4) ?? [] }]));

function SiteContent() {
  const { path, query } = useRouter();
  useScrollReveal(path);
  const Page = pages[path];
  if (Page) return <Page />;
  if (path === "/branksome-news") return <><InteriorHero title="Branksome News" trail={[{ label: "News" }]} tone="gold" /><NewsFilterableGrid /></>;
  if (path.startsWith("/branksome-news/")) {
    const article = newsArticles.find(a => a.slug === path.split("/").pop());
    if (article) return <><InteriorHero eyebrow={article.category} title={article.title} trail={[{ label: "Branksome News", to: "/branksome-news" }, { label: article.title }]} tone="sky" /><Container className="max-w-4xl py-16"><img src={article.image} alt="" className="mb-8 w-full rounded-lg object-cover" /><p className="text-sm text-ink/60">{article.readTime}</p><p className="mt-4 text-lg leading-relaxed">{article.excerpt}</p><p className="mt-8 text-sm text-ink/60">This design study includes an excerpt rather than the full article.</p><Link className="focus-ring mt-8 inline-block font-bold text-brand-green-900 underline" to="/branksome-news">Back to news</Link></Container></>;
  }
  if (path === "/giving/donate-now") return <><InteriorHero title="Donate Now" trail={[{label:"Giving"}, {label:"Donate Now"}]} tone="green" /><section className="bg-brand-green-900 pb-16 text-white"><Container className="max-w-3xl"><p className="mb-6">This demonstration form does not process payments.</p><DonationForm /></Container></section></>;
  if (path === "/admissions/connect-with-admissions") return <><InteriorHero title="Connect with Admissions" trail={[{label:"Admissions"}, {label:"Connect with Admissions"}]} tone="sky" /><Container className="max-w-3xl py-16"><InquiryForm heading="Contact our admissions team" description="This form is a demonstration and does not send your information." /></Container></>;
  if (path === "/search") {
    const q = (query.get("q") || "").trim().toLowerCase();
    const searchable = [...Object.entries({...genericPages, ...extraPages}).map(([to, p]) => ({to, title: p.title, summary: p.summary})), ...primaryNav.flatMap(g => g.links.map(l => ({to: l.to, title: l.label, summary: g.description || ""}))), ...newsArticles.map(a => ({to: `/branksome-news/${a.slug}`, title: a.title, summary: a.excerpt}))];
    const results = searchable.filter((item, index, all) => q && `${item.title} ${item.summary}`.toLowerCase().includes(q) && all.findIndex(x => x.to === item.to) === index);
    return <><InteriorHero title="Search" trail={[{label:"Search"}]} tone="sky" /><Container className="max-w-3xl py-16"><h2 className="font-display text-2xl font-bold">{q ? `Results for “${query.get("q")}”` : "Enter a search term"}</h2><ul className="mt-8 space-y-6">{results.map(r => <li key={r.to}><Link className="focus-ring text-lg font-bold text-brand-green-900 underline" to={r.to}>{r.title}</Link><p className="mt-1 text-ink/70">{r.summary}</p></li>)}</ul>{q && !results.length && <p className="mt-6">No results found. Try another search term.</p>}</Container></>;
  }
  const content = genericPages[path] || extraPages[path];
  if (content) return <SectionPage content={content} />;
  return <><InteriorHero title="Page not found" trail={[{label:"Page not found"}]} /><Container className="py-16"><p>We couldn’t find that page.</p><Link to="/" className="focus-ring mt-4 inline-block font-bold underline">Return home</Link></Container></>;
}

export default function App() {
  return <RouterProvider><Layout><SiteContent /></Layout></RouterProvider>;
}
