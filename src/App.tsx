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
import MGGSDifference from "@/pages/about/MGGSDifference";
import OurValues from "@/pages/about/OurValues";
import OurStory from "@/pages/about/OurStory";
import ContactUs from "@/pages/about/ContactUs";
import StartHere from "@/pages/admissions/StartHere";
import HowToApply from "@/pages/admissions/HowToApply";
import VisitUs from "@/pages/admissions/VisitUs";
import FeesAndFinancialInformation from "@/pages/admissions/FeesAndFinancialInformation";
import ParentPartnership from "@/pages/admissions/ParentPartnership";

const pages: Record<string, () => React.JSX.Element> = {
  "/": Home,
  "/about/the-mggs-difference": MGGSDifference,
  "/about/our-values": OurValues,
  "/about/our-story": OurStory,
  "/about/contact-us": ContactUs,
  "/admissions/start-here": StartHere,
  "/admissions/how-to-apply": HowToApply,
  "/admissions/visit-us": VisitUs,
  "/admissions/fees-and-financial-information": FeesAndFinancialInformation,
  "/admissions/parent-partnership": ParentPartnership,
};

function SiteContent() {
  const { path, query } = useRouter();
  useScrollReveal(path);
  const Page = pages[path];
  if (Page) return <Page />;
  if (path === "/mggs-news") return <><InteriorHero title="MGGS News" trail={[{ label: "News" }]} tone="gold" /><NewsFilterableGrid /></>;
  if (path.startsWith("/mggs-news/")) {
    const article = newsArticles.find(a => a.slug === path.split("/").pop());
    if (article) return <><InteriorHero eyebrow={article.category} title={article.title} trail={[{ label: "MGGS News", to: "/mggs-news" }, { label: article.title }]} tone="sky" /><Container className="max-w-4xl py-16"><img src={article.image} alt="" className="mb-8 w-full rounded-lg object-cover" /><p className="text-sm text-ink/60">{article.readTime}</p><p className="mt-4 text-lg leading-relaxed">{article.excerpt}</p><p className="mt-8 text-sm text-ink/60">The full notice will be published here shortly. Please contact the school office if you would like more detail.</p><Link className="focus-ring mt-8 inline-block font-bold text-brand-green-900 underline" to="/mggs-news">Back to news</Link></Container></>;
  }
  if (path === "/giving/donate-now") return <><InteriorHero title="Donate Now" trail={[{label:"Giving"}, {label:"Donate Now"}]} tone="green" /><section className="bg-brand-green-900 pb-16 text-white"><Container className="max-w-3xl"><p className="mb-6">This demonstration form does not process payments.</p><DonationForm /></Container></section></>;
  if (path === "/admissions/connect-with-admissions") return <><InteriorHero title="Connect with Admissions" trail={[{label:"Admissions"}, {label:"Connect with Admissions"}]} tone="sky" /><Container className="max-w-3xl py-16"><InquiryForm heading="Contact our admissions team" description="This form is a demonstration and does not send your information." /></Container></>;
  if (path === "/search") {
    const q = (query.get("q") || "").trim().toLowerCase();
    const searchable = [...Object.entries(genericPages).map(([to, p]) => ({to, title: p.title, summary: p.summary})), ...primaryNav.flatMap(g => g.links.map(l => ({to: l.to, title: l.label, summary: g.description || ""}))), ...newsArticles.map(a => ({to: `/mggs-news/${a.slug}`, title: a.title, summary: a.excerpt}))];
    const results = searchable.filter((item, index, all) => q && `${item.title} ${item.summary}`.toLowerCase().includes(q) && all.findIndex(x => x.to === item.to) === index);
    return <><InteriorHero title="Search" trail={[{label:"Search"}]} tone="sky" /><Container className="max-w-3xl py-16"><h2 className="font-display text-2xl font-bold">{q ? `Results for “${query.get("q")}”` : "Enter a search term"}</h2><ul className="mt-8 space-y-6">{results.map(r => <li key={r.to}><Link className="focus-ring text-lg font-bold text-brand-green-900 underline" to={r.to}>{r.title}</Link><p className="mt-1 text-ink/70">{r.summary}</p></li>)}</ul>{q && !results.length && <p className="mt-6">No results found. Try another search term.</p>}</Container></>;
  }
  const content: GenericPageContent | undefined = genericPages[path];
  if (content) return <SectionPage content={content} />;
  return <><InteriorHero title="Page not found" trail={[{label:"Page not found"}]} /><Container className="py-16"><p>We couldn’t find that page.</p><Link to="/" className="focus-ring mt-4 inline-block font-bold underline">Return home</Link></Container></>;
}

export default function App() {
  return <RouterProvider><Layout><SiteContent /></Layout></RouterProvider>;
}
