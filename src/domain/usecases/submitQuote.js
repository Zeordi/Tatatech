import { contactRepository } from '../../data/repositories/contactRepository.js';

export async function submitQuote(payload) {
  if (!payload?.name || !payload?.email || !payload?.message) {
    throw new Error('Name, email, and message are required.');
  }
  return contactRepository.submitQuote(payload);
}

export async function submitTicket(payload) {
  return contactRepository.submitTicket(payload);
}

export async function submitNewsletter(email) {
  if (!email) throw new Error('Email is required.');
  return contactRepository.submitNewsletter(email);
}
