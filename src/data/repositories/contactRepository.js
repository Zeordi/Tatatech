const submissions = [];

export const contactRepository = {
  async submitQuote(payload) {
    await delay(700);
    const record = {
      id: crypto.randomUUID(),
      type: 'quote',
      createdAt: new Date().toISOString(),
      ...payload,
    };
    submissions.push(record);
    return { success: true, id: record.id };
  },

  async submitTicket(payload) {
    await delay(700);
    const record = {
      id: crypto.randomUUID(),
      type: 'ticket',
      createdAt: new Date().toISOString(),
      ...payload,
    };
    submissions.push(record);
    return { success: true, id: record.id };
  },

  async submitNewsletter(email) {
    await delay(400);
    submissions.push({
      id: crypto.randomUUID(),
      type: 'newsletter',
      email,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
