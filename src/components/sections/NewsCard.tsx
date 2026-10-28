import { Link } from "@/router/router";
import { Tag } from "@/components/ui/Primitives";
import type { NewsArticle } from "@/data/news";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link to={`/branksome-news/${article.slug}`} className="focus-ring block">
        <div className="aspect-[16/10] w-full overflow-hidden bg-brand-green-100">
          <img src={article.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="gold">{article.category}</Tag>
          {article.topic && <Tag tone="outline">{article.topic}</Tag>}
          <span className="ml-auto text-xs font-medium text-ink/50">{article.readTime}</span>
        </div>
        <h3 className="font-display mt-3 text-base font-bold leading-snug text-brand-green-900">
          <Link to={`/branksome-news/${article.slug}`} className="focus-ring hover:text-brand-coral">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">{article.excerpt}</p>
        <Link
          to={`/branksome-news/${article.slug}`}
          className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-coral hover:underline"
        >
          Read More
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5">
            <path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
