import { contentRepository } from '../../data/repositories/contentRepository.js';

export async function getTestimonials() {
  return contentRepository.getTestimonials();
}

export async function getTeam() {
  return contentRepository.getTeam();
}

export async function getPricingPlans() {
  return contentRepository.getPricingPlans();
}

export async function getBlogPosts() {
  return contentRepository.getBlogPosts();
}

export async function getBlogPostBySlug(slug) {
  return contentRepository.getBlogPostBySlug(slug);
}

export async function getRelatedPosts(slug) {
  return contentRepository.getRelatedPosts(slug);
}

export async function getFaqs() {
  return contentRepository.getFaqs();
}

export async function getCareers() {
  return contentRepository.getCareers();
}

export async function getMilestones() {
  return contentRepository.getMilestones();
}

export async function getTrustLogos() {
  return contentRepository.getTrustLogos();
}
