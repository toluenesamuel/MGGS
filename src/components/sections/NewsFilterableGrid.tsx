import { useMemo, useState } from "react";
import { newsArticles, newsTypes, newsTopics, type NewsArticle } from "@/data/news";
import { NewsCard } from "@/components/sections/NewsCard";
import { Container } from "@/components/ui/Primitives";
import { cn } from "@/utils/cn";

const PAGE_SIZE = 6;

export function NewsFilterableGrid({ initialQuery = "" }: { initialQuery?: string }) {
  const [types, setTypes] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setPage(1);
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    return newsArticles.filter((article: NewsArticle) => {
      const matchesType = types.length === 0 || types.includes(article.category);
      const matchesTopic = topics.length === 0 || (article.topic && topics.includes(article.topic));
      const matchesQuery =
        query.trim() === "" ||
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesTopic && matchesQuery;
    });
  }, [types, topics, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetFilters() {
    setTypes([]);
    setTopics([]);
    setQuery("");
    setPage(1);
  }

  return (
    <Container className="py-14">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Filters" className="space-y-8">
          <div>
            <label htmlFor="news-filter-query" className="font-display block text-xs font-bold uppercase tracking-wide text-brand-green-900">
              Keyword
            </label>
            <input
              id="news-filter-query"
              type="search"
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              placeholder="Search headlines…"
              className="focus-ring mt-2 w-full rounded border border-brand-green-900/20 px-3 py-2 text-sm"
            />
          </div>
          <fieldset>
            <legend className="font-display text-xs font-bold uppercase tracking-wide text-brand-green-900">Type</legend>
            <div className="mt-3 space-y-2">
              {newsTypes.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-ink/80">
                  <input
                    type="checkbox"
                    checked={types.includes(t)}
                    onChange={() => toggle(types, setTypes, t)}
                    className="h-4 w-4 accent-brand-coral"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-display text-xs font-bold uppercase tracking-wide text-brand-green-900">Topic</legend>
            <div className="mt-3 space-y-2">
              {newsTopics.map((t) => (
                <label key={t} className="flex items-center gap-2 text-sm text-ink/80">
                  <input
                    type="checkbox"
                    checked={topics.includes(t)}
                    onChange={() => toggle(topics, setTopics, t)}
                    className="h-4 w-4 accent-brand-coral"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          {(types.length > 0 || topics.length > 0 || query) && (
            <button type="button" onClick={resetFilters} className="focus-ring text-sm font-bold text-brand-coral-ink hover:underline">
              Clear filters
            </button>
          )}
        </aside>

        <div>
          <p className="mb-4 text-sm text-ink/60" aria-live="polite">
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} articles
          </p>
          {pageItems.length === 0 ? (
            <div className="rounded-lg border border-dashed border-brand-green-900/30 p-10 text-center">
              <p className="font-display text-lg font-bold text-brand-green-900">No articles match these filters</p>
              <button type="button" onClick={resetFilters} className="focus-ring mt-3 text-sm font-bold text-brand-coral-ink hover:underline">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((article) => (
                <NewsCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={cn(
                    "focus-ring flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
                    p === page ? "bg-brand-green-900 text-white" : "text-brand-green-900 hover:bg-brand-green-100",
                  )}
                >
                  {p}
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </Container>
  );
}
