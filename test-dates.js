const parseFinlandDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const timeZone = 'Europe/Helsinki';
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
  const utcBase = Date.UTC(year, month - 1, day, 0, 0, 0);
  const parts = formatter.formatToParts(new Date(utcBase));
  const get = (type) => Number(parts.find(p => p.type === type)?.value);
  const tzYear = get('year');
  const tzMonth = get('month');
  const tzDay = get('day');
  const tzHour = get('hour');
  const tzMinute = get('minute');
  const tzSecond = get('second');
  const zonedAsUtc = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond, 0);
  const offsetMs = zonedAsUtc - utcBase;
  return new Date(utcBase - offsetMs);
};

const now = new Date();
console.log('Current date/time:', now);
console.log('Current timezone:', Intl.DateTimeFormat().resolvedOptions().timeZone);
console.log('');

const roseDayDate = parseFinlandDate('2026-02-07');
const roseDayNext = new Date(roseDayDate);
roseDayNext.setDate(roseDayNext.getDate() + 1);
console.log('Rose Day (2026-02-07):', roseDayDate);
console.log('Rose Day next day start:', roseDayNext);
console.log('Is Rose Day passed?', now >= roseDayNext);
console.log('');

const proposeDayDate = parseFinlandDate('2026-02-08');
const proposeDayNext = new Date(proposeDayDate);
proposeDayNext.setDate(proposeDayNext.getDate() + 1);
console.log('Propose Day (2026-02-08):', proposeDayDate);
console.log('Propose Day next day start:', proposeDayNext);
console.log('Is Propose Day passed?', now >= proposeDayNext);
console.log('');

const chocolateDayDate = parseFinlandDate('2026-02-09');
const chocolateDayNext = new Date(chocolateDayDate);
chocolateDayNext.setDate(chocolateDayNext.getDate() + 1);
console.log('Chocolate Day (2026-02-09):', chocolateDayDate);
console.log('Chocolate Day next day start:', chocolateDayNext);
console.log('Is Chocolate Day passed?', now >= chocolateDayNext);
