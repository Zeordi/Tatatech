import { createProject } from '../../domain/entities/Project.js';
import { projectsData } from '../sources/projects.json.js';

export const projectRepository = {
  async getAll() {
    return projectsData.map(createProject);
  },

  async getBySlug(slug) {
    const found = projectsData.find((item) => item.slug === slug);
    return found ? createProject(found) : null;
  },

  async getFeatured(limit = 3) {
    return projectsData.slice(0, limit).map(createProject);
  },

  async getAdjacent(slug) {
    const index = projectsData.findIndex((item) => item.slug === slug);
    if (index === -1) return { prev: null, next: null };
    const prev = index > 0 ? createProject(projectsData[index - 1]) : null;
    const next =
      index < projectsData.length - 1
        ? createProject(projectsData[index + 1])
        : null;
    return { prev, next };
  },
};
