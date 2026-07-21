import { appRepository } from '../../data/repositories/appRepository.js';

/**
 * @param {{ search?: string, categories?: string[], minPrice?: number, maxPrice?: number, sort?: string, page?: number, pageSize?: number }} filters
 */
export async function filterAppCatalog(filters = {}) {
  const {
    search = '',
    categories = [],
    minPrice = 0,
    maxPrice = Infinity,
    sort = 'featured',
    page = 1,
    pageSize = 12,
  } = filters;

  let apps = await appRepository.getAll();
  const categoryMeta = await appRepository.getCategories();

  const query = search.trim().toLowerCase();
  if (query) {
    apps = apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query),
    );
  }

  if (categories.length > 0) {
    apps = apps.filter((app) => categories.includes(app.category));
  }

  apps = apps.filter((app) => app.price >= minPrice && app.price <= maxPrice);

  apps = [...apps].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return Number(b.featured) - Number(a.featured);
    }
  });

  const total = apps.length;
  const start = (page - 1) * pageSize;
  const items = apps.slice(start, start + pageSize);
  const hasMore = start + pageSize < total;

  return {
    items,
    total,
    page,
    pageSize,
    hasMore,
    categories: categoryMeta,
  };
}
