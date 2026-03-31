import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, BarChart2, Map
} from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TREND_DATA, CATEGORY_BREAKDOWN, DAY_OF_WEEK_DATA, MOCK_NEIGHBORHOODS } from '@/lib/mock-data';
import { StatCard } from './Badges';

const CITIES = ['All Cities', 'Medellín', 'Bogotá', 'Cali'];
const TIME_RANGES = ['7d', '30d', '90d', '1yr'];
const DATA_SOURCES = ['All Sources', 'Official', 'Community', 'Perception'];

const TrendsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('All Cities');
  const [range, setRange] = useState('30d');
  const [source, setSource] = useState('All Sources');

  const trendSlice = range === '7d' ? TREND_DATA.slice(-7)
    : range === '30d' ? TREND_DATA.slice(-30)
    : range === '90d' ? TREND_DATA
    : TREND_DATA;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload?.length) {
      return (
        <div className="glass-panel rounded-lg px-3 py-2 text-xs font-body">
          <p className="mb-1" style={{ color: '#8B95A8' }}>{label}</p>
          {payload.map((p: any) => (
            <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E1117', paddingTop: '56px' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2" style={{ color: '#E8EAF0' }}>Public Trends</h1>
            <p className="text-sm font-body" style={{ color: '#8B95A8' }}>Crime intelligence analytics across Colombia</p>
          </div>

          {/* Comparison Toggles */}
          <div className="flex items-center gap-3">
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm font-body outline-none"
              style={{ backgroundColor: '#141820', border: '1px solid #252D3D', color: '#E8EAF0' }}
            >
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid #252D3D', backgroundColor: '#141820' }}>
              {TIME_RANGES.map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className="px-3 py-2 text-xs font-body transition-colors"
                  style={{ backgroundColor: range === r ? 'rgba(45,212,191,0.12)' : 'transparent', color: range === r ? '#2DD4BF' : '#8B95A8' }}
                >
                  {r}
                </button>
              ))}
            </div>
            <select
              value={source}
              onChange={e => setSource(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm font-body outline-none"
              style={{ backgroundColor: '#141820', border: '1px solid #252D3D', color: '#E8EAF0' }}
            >
              {DATA_SOURCES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Reports (30d)', value: '1,284', accent: 'amber' as const },
            { label: 'Week-over-Week Delta', value: '+8.3%', delta: 8, accent: 'danger' as const },
            { label: 'Most Active', value: 'Chapinero', accent: 'teal' as const },
            { label: 'Top Pattern', value: 'Moto theft', accent: 'amber' as const },
            { label: 'Official Coverage', value: '34%', accent: 'teal' as const, mono: true },
          ].map((card, i) => (
            <div key={i} className={`animate-fade-in-up stagger-${i + 1}`}>
              <StatCard {...card} />
            </div>
          ))}
        </div>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

          {/* Incident trend line — wide */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-1">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Incident Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={trendSlice}>
                <defs>
                  <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5A623" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="teal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#4A5568' }} tickLine={false} axisLine={false} interval={Math.floor(trendSlice.length / 5)} />
                <YAxis tick={{ fontSize: 9, fill: '#4A5568' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="incidents" stroke="#F5A623" strokeWidth={2} fill="url(#amber)" name="Total" />
                <Area type="monotone" dataKey="official" stroke="#2DD4BF" strokeWidth={1.5} fill="url(#teal)" name="Official" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category bar */}
          <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-2">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>By Category</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={CATEGORY_BREAKDOWN} layout="vertical" barCategoryGap="30%">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#8B95A8' }} tickLine={false} axisLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {CATEGORY_BREAKDOWN.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Time of day area */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-3">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Incidents by Time of Day</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={Array.from({ length: 24 }, (_, h) => ({
                hour: `${h}h`,
                incidents: Math.floor(5 + Math.sin((h - 14) * 0.4) * 15 + Math.random() * 8 + (h >= 18 && h <= 23 ? 20 : 0)),
              }))}>
                <defs>
                  <linearGradient id="danger" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E05C6B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#E05C6B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fontSize: 9, fill: '#4A5568' }} tickLine={false} axisLine={false} interval={3} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="incidents" stroke="#E05C6B" strokeWidth={2} fill="url(#danger)" name="Incidents" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Day of week */}
          <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-4">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>By Day of Week</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={DAY_OF_WEEK_DATA} barCategoryGap="35%">
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#4A5568' }} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="incidents" radius={[3, 3, 0, 0]}>
                  {DAY_OF_WEEK_DATA.map((_, i) => (
                    <Cell key={i} fill={i >= 4 ? '#E05C6B' : '#2DD4BF'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Official vs Community stacked area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Official vs Community Signal</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={trendSlice.slice(-14)}>
                <defs>
                  <linearGradient id="comm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5A623" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#4A5568' }} tickLine={false} axisLine={false} interval={2} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="community" stackId="1" stroke="#F5A623" fill="url(#comm)" name="Community" />
                <Area type="monotone" dataKey="official" stackId="1" stroke="#2DD4BF" fill="rgba(45,212,191,0.2)" name="Official" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* WoW trend line */}
          <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-1">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Week-over-Week Trend</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={Array.from({ length: 12 }, (_, i) => ({
                week: `W${i + 1}`,
                delta: Math.floor(-10 + Math.random() * 25),
              }))}>
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#4A5568' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: '#4A5568' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="delta" stroke="#2DD4BF" strokeWidth={2} dot={{ fill: '#2DD4BF', r: 3 }} name="WoW %Δ" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Neighborhood comparison table */}
        <div className="glass-card rounded-xl overflow-hidden card-shadow animate-fade-in-up">
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#252D3D' }}>
            <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Neighborhood Comparison</h3>
            <BarChart2 size={14} style={{ color: '#8B95A8' }} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #252D3D' }}>
                  {['Neighborhood', 'City', 'Incidents (30d)', 'WoW Change', 'Top Pattern', 'Signal Confidence'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-[10px] font-body uppercase tracking-widest" style={{ color: '#4A5568' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_NEIGHBORHOODS.map(n => (
                  <tr
                    key={n.id}
                    onClick={() => navigate(`/neighborhoods/${n.id}`)}
                    className="border-b cursor-pointer hover:bg-white/5 transition-colors"
                    style={{ borderColor: '#252D3D' }}
                  >
                    <td className="px-6 py-4 text-sm font-body font-medium" style={{ color: '#E8EAF0' }}>{n.name}</td>
                    <td className="px-6 py-4 text-sm font-body" style={{ color: '#8B95A8' }}>{n.city}</td>
                    <td className="px-6 py-4 text-sm font-mono-custom" style={{ color: '#E8EAF0' }}>{n.incidentsThisMonth}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 text-xs font-body ${n.weekOverWeekChange > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {n.weekOverWeekChange > 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {n.weekOverWeekChange > 0 ? '+' : ''}{n.weekOverWeekChange}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-body" style={{ color: '#8B95A8' }}>{n.topPattern}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full" style={{ backgroundColor: '#252D3D' }}>
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${n.signalConfidence}%`,
                              backgroundColor: n.signalConfidence >= 75 ? '#2DD4BF' : '#F5A623',
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono-custom" style={{ color: n.signalConfidence >= 75 ? '#2DD4BF' : '#F5A623' }}>
                          {n.signalConfidence}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsDashboard;
