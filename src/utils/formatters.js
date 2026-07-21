export function formatCurrency(amount, { freeLabel = 'Free' } = {}) {
  if (amount === 0 || amount === null || amount === undefined) return freeLabel;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function clampText(text, max = 120) {
  if (!text || text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
