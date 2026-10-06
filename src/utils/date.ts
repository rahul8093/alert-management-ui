export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const pad = (n: number) => String(n).padStart(2, '0');
export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const formatShort = (d: Date) => `${pad(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
export const formatRange = (s: Date, e: Date) =>
  isSameDay(s, e) ? formatShort(s) : `${pad(s.getDate())} ${MONTHS[s.getMonth()]} - ${formatShort(e)}`;
// Matches the report sheet: 01/04/2026 0:15
export const formatLogDate = (d: Date) =>
  `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${pad(d.getMinutes())}`;

export function monthMatrix(year: number, month: number): (Date | null)[][] {
  const offset = new Date(year, month, 1).getDay();
  const daysIn = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysIn; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
