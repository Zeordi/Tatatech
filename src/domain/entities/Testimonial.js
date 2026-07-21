/**
 * @typedef {Object} Testimonial
 * @property {string} id
 * @property {string} quote
 * @property {string} name
 * @property {string} role
 * @property {string} initials
 * @property {number} rating
 */

export function createTestimonial(data) {
  return {
    id: data.id,
    quote: data.quote,
    name: data.name,
    role: data.role,
    initials: data.initials,
    rating: data.rating ?? 5,
  };
}
