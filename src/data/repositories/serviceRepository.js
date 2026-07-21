import { createService } from '../../domain/entities/Service.js';
import { servicesData } from '../sources/services.json.js';

export const serviceRepository = {
  async getAll() {
    return servicesData.map(createService);
  },

  async getBySlug(slug) {
    const found = servicesData.find((item) => item.slug === slug);
    return found ? createService(found) : null;
  },

  async getRelated(slug, limit = 3) {
    return servicesData
      .filter((item) => item.slug !== slug)
      .slice(0, limit)
      .map(createService);
  },
};
