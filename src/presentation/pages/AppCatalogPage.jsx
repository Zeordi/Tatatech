import { useEffect, useState, useTransition } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { filterAppCatalog } from '../../domain/usecases/filterAppCatalog.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { Breadcrumbs } from '../components/layout/Breadcrumbs.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { Section } from '../components/layout/Section.jsx';
import { AppCard } from '../components/shared/AppCard.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Select } from '../components/ui/Select.jsx';
import { Skeleton } from '../components/ui/Skeleton.jsx';
import { Modal } from '../components/ui/Modal.jsx';

const defaultFilters = {
  search: '',
  categories: [],
  minPrice: 0,
  maxPrice: 1000,
  sort: 'featured',
  page: 1,
  pageSize: 12,
};

function FilterPanel({
  categories,
  filters,
  onToggleCategory,
  onPriceChange,
  onClear,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.08em]">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.name}>
              <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 text-sm text-text-secondary">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat.name)}
                    onChange={() => onToggleCategory(cat.name)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  {cat.name}
                </span>
                <span className="text-text-muted">{cat.count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.08em]">Price range</h3>
        <div className="space-y-3">
          <label className="block text-sm text-text-secondary">
            Max: ${filters.maxPrice >= 1000 ? '1000+' : filters.maxPrice}
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={filters.maxPrice}
              onChange={(e) => onPriceChange(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </label>
        </div>
      </div>
      <Button type="button" variant="outline" className="w-full" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}

export function AppCatalogPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [result, setResult] = useState({ items: [], total: 0, categories: [], hasMore: false });
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    filterAppCatalog(filters).then((data) => {
      if (!alive) return;
      setResult(data);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [filters]);

  const updateFilters = (patch) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, page: 1, ...patch }));
    });
  };

  const toggleCategory = (name) => {
    updateFilters({
      categories: filters.categories.includes(name)
        ? filters.categories.filter((c) => c !== name)
        : [...filters.categories, name],
    });
  };

  return (
    <>
      {usePageMeta({
        title: '300+ Ready-to-Deploy Apps',
        description: 'Browse the TATATECH app catalog — CRM, ecommerce, HR, education, and more.',
        path: '/apps',
      })}
      <div className="border-b border-border bg-surface py-12 md:py-16">
        <PageContainer>
          <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'App Catalog' }]} />
          <h1>300+ Ready-to-Deploy Apps</h1>
          <div className="relative mt-6 max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <Input
              aria-label="Search apps"
              placeholder="Search apps…"
              className="pl-10"
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
            />
          </div>
        </PageContainer>
      </div>

      <Section>
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="hidden lg:block">
              <FilterPanel
                categories={result.categories}
                filters={filters}
                onToggleCategory={toggleCategory}
                onPriceChange={(maxPrice) => updateFilters({ maxPrice })}
                onClear={() => setFilters(defaultFilters)}
              />
            </aside>

            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-text-secondary">
                  {result.total} result{result.total === 1 ? '' : 's'}
                  {isPending ? ' · updating…' : ''}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="lg:hidden"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                  <Select
                    aria-label="Sort apps"
                    value={filters.sort}
                    onChange={(e) => updateFilters({ sort: e.target.value })}
                    className="w-44"
                  >
                    <option value="featured">Featured</option>
                    <option value="name">Name</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-72" />
                  ))}
                </div>
              ) : result.items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
                  <X className="mx-auto mb-4 h-10 w-10 text-text-muted" />
                  <h2 className="text-xl">No apps match your filters</h2>
                  <p className="mt-2 text-text-secondary">Try clearing filters or searching a different keyword.</p>
                  <Button
                    type="button"
                    variant="accent"
                    className="mt-6"
                    onClick={() => setFilters(defaultFilters)}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {result.items.map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                  {result.hasMore || filters.page > 1 ? (
                    <div className="mt-10 flex justify-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={filters.page <= 1}
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                        }
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        disabled={!result.hasMore}
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                        }
                      >
                        Load more
                      </Button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </PageContainer>
      </Section>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <FilterPanel
          categories={result.categories}
          filters={filters}
          onToggleCategory={toggleCategory}
          onPriceChange={(maxPrice) => updateFilters({ maxPrice })}
          onClear={() => {
            setFilters(defaultFilters);
            setFiltersOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
