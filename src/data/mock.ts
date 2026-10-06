import { addDays, startOfDay } from '../utils/date';

export const COMPANIES = ['Prashitech Industries', 'Greenfield Textiles', 'Riverbend Chemicals'];
export const SITES = ['Matrix', 'North Plant', 'East Plant', 'South Plant', 'West Plant'];

export type Status = 'normal' | 'warning' | 'critical';
export interface Parameter {
  key: string;
  name: string;
  value: string;
  unit: string;
  limit: string;
  avg: string;
  received: string;
  status: Status;
  trend: number[];
}

export const PARAMETERS: Parameter[] = [
  { key: 'bod', name: 'BOD', value: '17.3', unit: 'mg/L', limit: '30 mg/L', avg: '17.1', received: '3:00 PM', status: 'normal', trend: [14, 15, 15.5, 16, 15.2, 16.8, 17.5, 16.9, 17.3] },
  { key: 'flow', name: 'Flow Volume', value: '15.8', unit: 'm³/day', limit: '80 m³/day', avg: '10.2', received: '3:00 PM', status: 'normal', trend: [6, 8, 7, 10, 12, 9, 13, 14.5, 15.8] },
  { key: 'tss', name: 'TSS', value: '27.1', unit: 'mg/L', limit: '100 mg/L', avg: '28.9', received: '3:00 PM', status: 'normal', trend: [30, 29, 28, 29.5, 27, 28, 26.5, 27.5, 27.1] },
  { key: 'cod', name: 'COD', value: '52.5', unit: 'mg/L', limit: '250 mg/L', avg: '51.7', received: '3:00 PM', status: 'normal', trend: [48, 50, 53, 51, 55, 52, 50.5, 53, 52.5] },
  { key: 'ph', name: 'pH', value: '7.5', unit: 'pH', limit: '5.5-9.0', avg: '7.52', received: '3:00 PM', status: 'normal', trend: [7.4, 7.6, 7.5, 7.55, 7.45, 7.6, 7.5, 7.52, 7.5] },
  { key: 'flowout', name: 'Flow Out', value: '1.6', unit: 'm³/hr', limit: 'Configured limit', avg: '2.29', received: '3:00 PM', status: 'normal', trend: [2.8, 2.5, 2.9, 2.2, 1.9, 2.1, 1.7, 1.5, 1.6] },
  { key: 'pm25', name: 'PM2.5', value: '31', unit: 'µg/m³', limit: 'Site limit', avg: '29', received: '3:00 PM', status: 'normal', trend: [27, 29, 28, 30, 32, 29, 30, 31.5, 31] },
  { key: 'pm10', name: 'PM10', value: '48', unit: 'µg/m³', limit: 'Site limit', avg: '46', received: '3:00 PM', status: 'normal', trend: [44, 46, 45, 47, 49, 46, 47.5, 48.5, 48] },
];
export const DASHBOARD_KEYS = ['bod', 'flow'];
export const TREND_KEYS = ['tss', 'cod', 'ph', 'flowout', 'pm25', 'pm10'];

export type AlertType = 'critical' | 'warning' | 'offline' | 'sensor' | 'resolved';
export interface AlertItem { id: string; type: AlertType; title: string; meta: string; time: string }

export const ALERTS: AlertItem[] = [
  { id: '1', type: 'critical', title: 'COD high at North Plant', meta: 'Value 252 mg/L · limit 250 mg/L', time: '2 min ago' },
  { id: '2', type: 'warning', title: 'BOD approaching limit', meta: 'North Plant · 27.1 mg/L', time: '15 min ago' },
  { id: '3', type: 'offline', title: 'Site not communicating', meta: 'East Plant · last seen 30 min ago', time: '30 min ago' },
  { id: '4', type: 'sensor', title: 'pH sensor unavailable', meta: 'South Plant · no reading', time: '45 min ago' },
  { id: '5', type: 'resolved', title: 'Flow returned to normal', meta: 'West Plant · Flow Out', time: '1 hr ago' },
];

export const STATS = [
  { label: 'Total', value: 12, color: '#0B2A43' },
  { label: 'Critical', value: 2, color: '#E5484D' },
  { label: 'Warning', value: 5, color: '#F5A524' },
  { label: 'Resolved', value: 18, color: '#22A06B' },
];

// ---- Report table -------------------------------------------------------
export interface ReportRow {
  site: string;
  logDate: Date;
  bod: number; tss: number; cod: number; ph: number; flowVolume: number; flowOut: number; pm: number;
}
export const REPORT_COLUMNS: { key: keyof Omit<ReportRow, 'site' | 'logDate'>; title: string; width: number; decimals: number }[] = [
  { key: 'bod', title: 'BOD', width: 70, decimals: 1 },
  { key: 'tss', title: 'TSS', width: 70, decimals: 1 },
  { key: 'cod', title: 'COD', width: 70, decimals: 1 },
  { key: 'ph', title: 'pH', width: 64, decimals: 2 },
  { key: 'flowVolume', title: 'Flow Volume', width: 104, decimals: 1 },
  { key: 'flowOut', title: 'Flow Out', width: 84, decimals: 2 },
  { key: 'pm', title: 'PM', width: 64, decimals: 0 },
];
export const isOutOfRange = (key: string, v: number) =>
  (key === 'bod' && v > 30) || (key === 'tss' && v > 100) || (key === 'cod' && v > 250) ||
  (key === 'ph' && (v < 5.5 || v > 9)) || (key === 'flowVolume' && v > 80);

const noise = (s: number) => { const x = Math.sin(s * 12.9898) * 43758.5453; return x - Math.floor(x); };

// Placeholder data: one row every 15 minutes (96 per day). Replace with API data later.
export function generateRows(start: Date, days: number, site: string): ReportRow[] {
  const rows: ReportRow[] = [];
  const base = startOfDay(start);
  for (let i = 0; i < days * 96; i++) {
    const t = new Date(base.getFullYear(), base.getMonth(), base.getDate(), 0, i * 15);
    const r = (k: number) => noise(i * 1.7 + k) - 0.5;
    rows.push({
      site, logDate: t,
      bod: 17 + r(1) * 2,
      tss: 27 + r(2) * 2,
      cod: i % 37 === 3 ? 252.4 : 52 + r(3) * 3,
      ph: 7.5 + r(4) * 0.4,
      flowVolume: 15 + r(5) * 6,
      flowOut: 1.6 + r(6) * 0.8,
      pm: 31 + r(7) * 8,
    });
  }
  return rows;
}
export const lastDays = (n: number) => addDays(startOfDay(new Date()), -(n - 1));
