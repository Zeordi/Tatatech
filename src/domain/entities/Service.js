/**
 * @typedef {Object} Service
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 * @property {string} shortDescription
 * @property {string} description
 * @property {string} icon
 * @property {number} startingPrice
 * @property {string} timeline
 * @property {string[]} features
 * @property {string[]} deliverables
 * @property {string[]} techStack
 * @property {{ title: string, description: string }[]} process
 */

export function createService(data) {
  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    shortDescription: data.shortDescription,
    description: data.description,
    icon: data.icon,
    startingPrice: data.startingPrice,
    timeline: data.timeline,
    features: data.features ?? [],
    deliverables: data.deliverables ?? [],
    techStack: data.techStack ?? [],
    process: data.process ?? [],
  };
}
