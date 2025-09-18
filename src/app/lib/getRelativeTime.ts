function getRelativeTime (date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime(); // Difference in milliseconds
  const diffSeconds = Math.round(diffMs / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // @ts-expect-error complexity
  const ranges: Record<Intl.RelativeTimeFormatUnit, number> = {
    year: 3600 * 24 * 365,
    month: 3600 * 24 * 30,
    week: 3600 * 24 * 7,
    day: 3600 * 24,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const unit of Object.keys(ranges) as Intl.RelativeTimeFormatUnit[]) {
    const seconds = ranges[unit];
    if (Math.abs(diffSeconds) >= seconds || unit === 'second') {
      const value = Math.round(diffSeconds / seconds);
      return rtf.format(value, unit);
    }
  }

  return 'just now';
}

export default getRelativeTime;
