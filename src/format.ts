export const shortDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });

export const longDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
