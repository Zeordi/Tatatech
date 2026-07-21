import { createBlogPost } from '../../domain/entities/BlogPost.js';
import { createPricingPlan } from '../../domain/entities/PricingPlan.js';
import { createTeamMember } from '../../domain/entities/TeamMember.js';
import { createTestimonial } from '../../domain/entities/Testimonial.js';
import {
  blogData,
  careersData,
  faqsData,
  milestonesData,
  pricingData,
  teamData,
  testimonialsData,
  trustLogos,
} from '../sources/content.json.js';

export const contentRepository = {
  async getTestimonials() {
    return testimonialsData.map(createTestimonial);
  },

  async getTeam() {
    return teamData.map(createTeamMember);
  },

  async getPricingPlans() {
    return pricingData.map(createPricingPlan);
  },

  async getBlogPosts() {
    return blogData.map(createBlogPost);
  },

  async getBlogPostBySlug(slug) {
    const found = blogData.find((post) => post.slug === slug);
    return found ? createBlogPost(found) : null;
  },

  async getRelatedPosts(slug, limit = 3) {
    return blogData
      .filter((post) => post.slug !== slug)
      .slice(0, limit)
      .map(createBlogPost);
  },

  async getFaqs() {
    return faqsData;
  },

  async getCareers() {
    return careersData;
  },

  async getMilestones() {
    return milestonesData;
  },

  async getTrustLogos() {
    return trustLogos;
  },
};
