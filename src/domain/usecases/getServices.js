import { serviceRepository } from '../../data/repositories/serviceRepository.js';

export async function getServices() {
  return serviceRepository.getAll();
}

export async function getServiceBySlug(slug) {
  return serviceRepository.getBySlug(slug);
}

export async function getRelatedServices(slug) {
  return serviceRepository.getRelated(slug);
}
