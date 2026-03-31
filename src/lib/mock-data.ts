import type { Incident, Neighborhood } from '@/types/vigia';

export const CATEGORY_CONFIG = {
  robbery: { label: 'Robbery', color: '#E05C6B', bg: 'rgba(224,92,107,0.12)', border: 'rgba(224,92,107,0.3)', icon: '🔴' },
  theft: { label: 'Theft', color: '#F5A623', bg: 'rgba(245,166,35,0.12)', border: 'rgba(245,166,35,0.3)', icon: '🟠' },
  extortion: { label: 'Extortion', color: '#9B59B6', bg: 'rgba(155,89,182,0.12)', border: 'rgba(155,89,182,0.3)', icon: '🟣' },
  assault: { label: 'Assault', color: '#E05C6B', bg: 'rgba(224,92,107,0.15)', border: 'rgba(224,92,107,0.4)', icon: '🔴' },
  fraud: { label: 'Fraud', color: '#3498DB', bg: 'rgba(52,152,219,0.12)', border: 'rgba(52,152,219,0.3)', icon: '🔵' },
  vehicle_theft: { label: 'Vehicle Theft', color: '#F39C12', bg: 'rgba(243,156,18,0.12)', border: 'rgba(243,156,18,0.3)', icon: '🟡' },
  harassment: { label: 'Harassment', color: '#2DD4BF', bg: 'rgba(45,212,191,0.12)', border: 'rgba(45,212,191,0.3)', icon: '🟦' },
} as const;

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: '1',
    title: 'Motorcycle snatch near Parque Lleras',
    category: 'theft',
    subType: 'Motorcycle snatch',
    location: { lat: 6.2088, lng: -75.5695, neighborhood: 'El Poblado', city: 'Medellín', address: 'Cra 37 #8-12' },
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    narrative: 'Phone snatched by motorcycle riders at traffic light',
    source: 'community',
    confidence: 'high',
    visibility: 'public',
    officiallyReported: false,
    evidencePresent: false,
    ttpTags: ['motorcycle snatch', 'phone theft', 'traffic light'],
    corroborations: 3,
    reportedAt: new Date(Date.now() - 40 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Armed robbery at ATM',
    category: 'robbery',
    subType: 'ATM robbery',
    location: { lat: 6.2518, lng: -75.5636, neighborhood: 'Laureles', city: 'Medellín' },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    narrative: 'Victim approached by two individuals while using ATM',
    source: 'community',
    confidence: 'high',
    visibility: 'public',
    officiallyReported: true,
    evidencePresent: true,
    ttpTags: ['ATM robbery', 'armed', 'duo modus'],
    corroborations: 7,
    reportedAt: new Date(Date.now() - 100 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Scopolamine robbery — Zona Rosa',
    category: 'robbery',
    subType: 'Scopolamine robbery',
    location: { lat: 4.6534, lng: -74.0559, neighborhood: 'Zona Rosa', city: 'Bogotá' },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    source: 'community',
    confidence: 'medium',
    visibility: 'public',
    officiallyReported: false,
    evidencePresent: false,
    ttpTags: ['scopolamine', 'drugging', 'night district'],
    corroborations: 2,
    reportedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Vehicle break-in — Chapinero Alto',
    category: 'vehicle_theft',
    location: { lat: 4.6487, lng: -74.0616, neighborhood: 'Chapinero', city: 'Bogotá' },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    source: 'community',
    confidence: 'medium',
    visibility: 'public',
    officiallyReported: false,
    evidencePresent: false,
    ttpTags: ['window smash', 'parked vehicle'],
    corroborations: 1,
    reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '5',
    title: 'Digital fraud — fake investment scheme',
    category: 'fraud',
    location: { lat: 3.4516, lng: -76.5320, neighborhood: 'Ciudad Jardín', city: 'Cali' },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    source: 'official',
    confidence: 'high',
    visibility: 'public',
    officiallyReported: true,
    evidencePresent: true,
    ttpTags: ['digital fraud', 'investment scam', 'social media'],
    corroborations: 12,
    reportedAt: new Date(Date.now() - 11 * 60 * 60 * 1000),
  },
  {
    id: '6',
    title: 'Street harassment — Parque Berrio',
    category: 'harassment',
    location: { lat: 6.2517, lng: -75.5636, neighborhood: 'Centro', city: 'Medellín' },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    source: 'community',
    confidence: 'low',
    visibility: 'public',
    officiallyReported: false,
    evidencePresent: false,
    ttpTags: ['street harassment'],
    corroborations: 0,
    reportedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
  },
  {
    id: '7',
    title: 'Extortion attempt — small business',
    category: 'extortion',
    location: { lat: 6.2488, lng: -75.5680, neighborhood: 'Belén', city: 'Medellín' },
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    source: 'community',
    confidence: 'high',
    visibility: 'private',
    officiallyReported: true,
    evidencePresent: true,
    ttpTags: ['extortion', 'business', 'vacuna'],
    corroborations: 4,
    reportedAt: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000),
  },
];

export const MOCK_NEIGHBORHOODS: Neighborhood[] = [
  { id: 'n1', name: 'El Poblado', city: 'Medellín', district: 'Sur', signalConfidence: 87, incidentsThisMonth: 42, weekOverWeekChange: -8, topPattern: 'Motorcycle snatch', peakHour: '18:00–20:00' },
  { id: 'n2', name: 'Laureles', city: 'Medellín', district: 'Occidente', signalConfidence: 79, incidentsThisMonth: 28, weekOverWeekChange: 12, topPattern: 'ATM robbery', peakHour: '20:00–23:00' },
  { id: 'n3', name: 'Zona Rosa', city: 'Bogotá', district: 'Chapinero', signalConfidence: 71, incidentsThisMonth: 61, weekOverWeekChange: 5, topPattern: 'Scopolamine', peakHour: '23:00–02:00' },
  { id: 'n4', name: 'Chapinero', city: 'Bogotá', district: 'Chapinero', signalConfidence: 83, incidentsThisMonth: 35, weekOverWeekChange: -3, topPattern: 'Vehicle theft', peakHour: '14:00–16:00' },
  { id: 'n5', name: 'Ciudad Jardín', city: 'Cali', district: 'Sur', signalConfidence: 65, incidentsThisMonth: 19, weekOverWeekChange: 22, topPattern: 'Digital fraud', peakHour: '12:00–14:00' },
  { id: 'n6', name: 'Centro', city: 'Medellín', district: 'Centro', signalConfidence: 58, incidentsThisMonth: 89, weekOverWeekChange: 2, topPattern: 'Pickpocketing', peakHour: '07:00–09:00' },
];

export const TREND_DATA = Array.from({ length: 90 }, (_, i) => ({
  day: i,
  date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO', { month: 'short', day: 'numeric' }),
  incidents: Math.floor(20 + Math.random() * 40 + Math.sin(i / 7) * 10),
  official: Math.floor(8 + Math.random() * 15),
  community: Math.floor(12 + Math.random() * 25 + Math.sin(i / 7) * 8),
}));

export const CATEGORY_BREAKDOWN = [
  { name: 'Theft', value: 32, color: '#F5A623' },
  { name: 'Robbery', value: 28, color: '#E05C6B' },
  { name: 'Vehicle Theft', value: 15, color: '#F39C12' },
  { name: 'Fraud', value: 12, color: '#3498DB' },
  { name: 'Extortion', value: 8, color: '#9B59B6' },
  { name: 'Harassment', value: 5, color: '#2DD4BF' },
];

export const DAY_OF_WEEK_DATA = [
  { day: 'Mon', incidents: 48 },
  { day: 'Tue', incidents: 39 },
  { day: 'Wed', incidents: 42 },
  { day: 'Thu', incidents: 51 },
  { day: 'Fri', incidents: 78 },
  { day: 'Sat', incidents: 92 },
  { day: 'Sun', incidents: 63 },
];

export const formatTimeAgo = (date: Date): string => {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};
