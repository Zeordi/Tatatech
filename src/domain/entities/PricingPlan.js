/**
 * @typedef {Object} PricingPlan
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number|null} monthlyPrice
 * @property {number|null} oneTimePrice
 * @property {boolean} popular
 * @property {{ label: string, included: boolean }[]} features
 * @property {string} cta
 */

export function createPricingPlan(data) {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    monthlyPrice: data.monthlyPrice,
    oneTimePrice: data.oneTimePrice,
    popular: data.popular ?? false,
    features: data.features ?? [],
    cta: data.cta ?? 'Get Started',
  };
}
