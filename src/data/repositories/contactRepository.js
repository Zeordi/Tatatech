import { SITE } from '../../utils/constants.js';

// Emails are delivered through FormSubmit (https://formsubmit.co) — no backend
// or API key required. On the first submission FormSubmit sends a one-time
// confirmation link to SITE.supportEmail that the mailbox owner must click to
// activate delivery. The AJAX endpoint returns JSON instead of redirecting.
const DESTINATION_EMAIL = SITE.supportEmail;
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(DESTINATION_EMAIL)}`;

const submissions = [];

async function sendEmail(fields, { subject, replyTo } = {}) {
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      ...(replyTo ? { _replyto: replyTo } : {}),
      ...fields,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed with status ${response.status}`);
  }

  const data = await response.json().catch(() => ({}));
  if (data.success === 'false' || data.success === false) {
    const message = data.message || 'Email delivery failed.';
    const error = new Error(message);
    // FormSubmit returns this until the destination inbox owner clicks the
    // one-time "Activate Form" link it emails on the first submission.
    error.needsActivation = /activation/i.test(message);
    throw error;
  }
  return data;
}

export const contactRepository = {
  async submitQuote(payload) {
    const record = {
      id: crypto.randomUUID(),
      type: 'quote',
      createdAt: new Date().toISOString(),
      ...payload,
    };

    await sendEmail(
      {
        ticketId: record.id,
        name: payload.name,
        email: payload.email,
        company: payload.company || '—',
        service: payload.service || '—',
        budget: payload.budget || '—',
        message: payload.message,
      },
      {
        subject: `New project inquiry from ${payload.name}`,
        replyTo: payload.email,
      },
    );

    submissions.push(record);
    return { success: true, id: record.id };
  },

  async submitTicket(payload) {
    const record = {
      id: crypto.randomUUID(),
      type: 'ticket',
      createdAt: new Date().toISOString(),
      ...payload,
    };

    await sendEmail(
      {
        ticketId: record.id,
        name: payload.name,
        email: payload.email,
        company: payload.company || '—',
        category: payload.category,
        priority: payload.priority,
        subject: payload.subject,
        description: payload.description,
      },
      {
        subject: `[Support] ${payload.priority?.toUpperCase() || 'NEW'} — ${payload.subject}`,
        replyTo: payload.email,
      },
    );

    submissions.push(record);
    return { success: true, id: record.id };
  },

  async submitNewsletter(email) {
    await sendEmail(
      { email },
      { subject: 'New newsletter subscription', replyTo: email },
    );

    submissions.push({
      id: crypto.randomUUID(),
      type: 'newsletter',
      email,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  },
};
