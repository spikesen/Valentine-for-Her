import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse an ISO date string (YYYY-MM-DD) as midnight in Finland (Europe/Helsinki) timezone.
 * Handles daylight saving automatically.
 */
export function parseFinlandDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  const timeZone = 'Europe/Helsinki';

  // Determine the timezone offset at the given date, then back-calculate UTC midnight.
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Start from UTC midnight of that calendar date
  const utcBase = Date.UTC(year, month - 1, day, 0, 0, 0);

  // What clock time does that UTC instant correspond to in Helsinki?
  const parts = formatter.formatToParts(new Date(utcBase));

  const get = (type: string) => Number(parts.find(p => p.type === type)?.value);

  const tzYear = get('year');
  const tzMonth = get('month');
  const tzDay = get('day');
  const tzHour = get('hour');
  const tzMinute = get('minute');
  const tzSecond = get('second');

  // This represents the same instant as utcBase, expressed as UTC using Helsinki wall time components
  const zonedAsUtc = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond, 0);

  // Offset = (UTC instant displayed in zone) - (raw UTC instant)
  const offsetMs = zonedAsUtc - utcBase;

  // Midnight in Helsinki is UTC minus that offset
  return new Date(utcBase - offsetMs);
}
