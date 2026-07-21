import { projectRepository } from '../../data/repositories/projectRepository.js';

export async function getProjects(category = 'All') {
  const projects = await projectRepository.getAll();
  if (!category || category === 'All') return projects;
  return projects.filter(
    (project) => project.category.toLowerCase() === category.toLowerCase(),
  );
}

export async function getFeaturedProjects(limit = 3) {
  return projectRepository.getFeatured(limit);
}

export async function getProjectBySlug(slug) {
  return projectRepository.getBySlug(slug);
}

export async function getAdjacentProjects(slug) {
  return projectRepository.getAdjacent(slug);
}
