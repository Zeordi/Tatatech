import { createAppItem } from '../../domain/entities/AppItem.js';
import { appsData, appCategories } from '../sources/apps.json.js';

export const appRepository = {
  async getAll() {
    return appsData.map(createAppItem);
  },

  async getCategories() {
    return appCategories.map((name) => ({
      name,
      count: appsData.filter((app) => app.category === name).length,
    }));
  },
};
