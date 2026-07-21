/**
 * @typedef {Object} AppItem
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} category
 * @property {string} description
 * @property {number} price
 * @property {string} icon
 * @property {string} demoUrl
 * @property {boolean} featured
 */

export function createAppItem(data) {
  return {
    id: data.id,
    slug: data.slug,
    name: data.name,
    category: data.category,
    description: data.description,
    price: data.price,
    icon: data.icon,
    demoUrl: data.demoUrl ?? '#',
    featured: data.featured ?? false,
  };
}
