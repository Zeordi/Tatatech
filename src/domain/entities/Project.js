/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} category
 * @property {string} client
 * @property {string} industry
 * @property {number} year
 * @property {string} result
 * @property {string} image
 * @property {string} challenge
 * @property {string} solution
 * @property {{ label: string, value: string }[]} results
 * @property {string[]} gallery
 * @property {string[]} services
 * @property {{ quote: string, author: string, role: string }} testimonial
 */

export function createProject(data) {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    category: data.category,
    client: data.client,
    industry: data.industry,
    year: data.year,
    result: data.result,
    image: data.image,
    challenge: data.challenge,
    solution: data.solution,
    results: data.results ?? [],
    gallery: data.gallery ?? [],
    services: data.services ?? [],
    testimonial: data.testimonial ?? null,
  };
}
