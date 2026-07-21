/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {string} category
 * @property {string} image
 * @property {string} author
 * @property {string} authorRole
 * @property {string} authorInitials
 * @property {string} date
 * @property {number} readTime
 * @property {boolean} featured
 */

export function createBlogPost(data) {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    image: data.image,
    author: data.author,
    authorRole: data.authorRole ?? 'Contributor',
    authorInitials: data.authorInitials,
    date: data.date,
    readTime: data.readTime,
    featured: data.featured ?? false,
  };
}
