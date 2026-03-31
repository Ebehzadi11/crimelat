import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, TrendingUp, TrendingDown, Clock, Shield, AlertCircle, ChevronRight
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  MOCK_NEIGHBORHOODS, MOCK_INCIDENTS, TREND_DATA, DAY_OF_WEEK_DATA,
  CATEGORY_BREAKDOWN, CATEGORY_CONFIG, formatTimeAgo
} from '@/lib/mock-data';
import { CategoryBadge, ConfidenceBadge, StatCard } from './Badges';

const NeighborhoodPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const neighborhood = MOCK_NEIGHBORHOODS.find(n => n.id === id) || MOCK_NEIGHBORHOODS[0];

  const trendData90 = TREND_DATA.slice(-30).map(d => ({ ...d, date: d.date.split(',')[0] }));

  const peakHoursData = Array.from({ length: 7 }, (_, day) =>
    Array.from({ length: 24 }, (_, hour) => ({
      day,
      hour,
      value: Math.random() > 0.7 ? Math.floor(Math.random() * 10) + 1 : 0,
    }))
  ).flat();

  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div className="glass-panel rounded-lg px-3 py-2">
          <p className="text-xs font-mono-custom" style={{ color: '#E8EAF0' }}>{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E1117', paddingTop: '56px' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-sm font-body hover:opacity-80 transition-opacity"
          style={{ color: '#8B95A8' }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        {/* Area Header */}
        <div className="flex items-start justify-between mb-8 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-3 mb-2" style={{ color: '#8B95A8' }}>
              <MapPin size={13} />
              <span className="text-sm font-body">{neighborhood.city} › {neighborhood.district} › </span>
              <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>{neighborhood.name}</span>
            </div>
            <h1 className="text-5xl font-display font-bold mb-3" style={{ color: '#E8EAF0' }}>
              {neighborhood.name}
            </h1>
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-sm font-mono-custom"
                style={{
                  backgroundColor: neighborhood.signalConfidence >= 75 ? 'rgba(45,212,191,0.1)' : 'rgba(245,166,35,0.1)',
                  color: neighborhood.signalConfidence >= 75 ? '#2DD4BF' : '#F5A623',
                  border: `1px solid ${neighborhood.signalConfidence >= 75 ? 'rgba(45,212,191,0.2)' : 'rgba(245,166,35,0.2)'}`,
                }}
              >
                Signal Confidence: {neighborhood.signalConfidence}
              </span>
              <span className="text-sm font-body" style={{ color: '#8B95A8' }}>{neighborhood.city}, Colombia</span>
            </div>
          </div>

          {/* Inline map snippet */}
          <div
            className="w-48 h-32 rounded-xl overflow-hidden map-bg map-grid flex items-center justify-center shrink-0"
            style={{ border: '1px solid #252D3D' }}
          >
            <div className="w-3 h-3 rounded-full pulse-amber" style={{ backgroundColor: '#F5A623' }} />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Incidents This Month', value: neighborhood.incidentsThisMonth, accent: 'amber' as const },
            {
              label: 'Week-over-Week', value: `${neighborhood.weekOverWeekChange > 0 ? '+' : ''}${neighborhood.weekOverWeekChange}%`,
              accent: neighborhood.weekOverWeekChange > 0 ? 'danger' as const : 'teal' as const,
              delta: neighborhood.weekOverWeekChange,
            },
            { label: 'Top Pattern', value: neighborhood.topPattern, accent: 'amber' as const },
            { label: 'Peak Hour', value: neighborhood.peakHour, accent: 'teal' as const, mono: true },
          ].map((card, i) => (
            <div key={i} className={`animate-fade-in-up stagger-${i + 1}`}>
              <StatCard {...card} />
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

          {/* Line chart — 90 days */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-1">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Incident Trend — Last 30 Days</h3>
              <span className="text-xs font-mono-custom" style={{ color: '#8B95A8' }}>daily count</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trendData90}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#4A5568' }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: '#4A5568' }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="incidents" stroke="#F5A623" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="official" stroke="#2DD4BF" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: '#8B95A8' }}>
                <span className="w-3 h-0.5 rounded" style={{ backgroundColor: '#F5A623', display: 'inline-block' }} /> Total
              </span>
              <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: '#8B95A8' }}>
                <span className="w-3 h-0.5 rounded" style={{ backgroundColor: '#2DD4BF', display: 'inline-block' }} /> Official
              </span>
            </div>
          </div>

          {/* Donut — Category breakdown */}
          <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-2">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Crime Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={CATEGORY_BREAKDOWN} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {CATEGORY_BREAKDOWN.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => active && payload?.length ? (
                    <div className="glass-panel rounded px-2 py-1">
                      <p className="text-xs font-body" style={{ color: payload[0].payload.color }}>{payload[0].name}: {payload[0].value}%</p>
                    </div>
                  ) : null}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-1.5">
              {CATEGORY_BREAKDOWN.slice(0, 4).map(cat => (
                <div key={cat.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-body" style={{ color: '#8B95A8' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="text-xs font-mono-custom" style={{ color: '#E8EAF0' }}>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar — by day of week */}
          <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-3">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>By Day of Week</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={DAY_OF_WEEK_DATA} barCategoryGap="35%">
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#4A5568' }} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="incidents" radius={[3, 3, 0, 0]}>
                  {DAY_OF_WEEK_DATA.map((_, index) => (
                    <Cell key={index} fill={index >= 4 ? '#E05C6B' : index === 3 ? '#F5A623' : '#2DD4BF'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Peak hours heatmap grid */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-4">
            <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Peak Hours Heatmap</h3>
            <div className="flex gap-1 mb-2">
              <div className="w-8" />
              {Array.from({ length: 24 }, (_, h) => (
                h % 4 === 0 ? (
                  <div key={h} className="text-[9px] font-mono-custom text-center" style={{ flex: 1, color: '#4A5568' }}>
                    {h}h
                  </div>
                ) : <div key={h} style={{ flex: 1 }} />
              ))}
            </div>
            {DAY_LABELS.map((day, dayIdx) => (
              <div key={day} className="flex gap-1 mb-1 items-center">
                <span className="w-8 text-[10px] font-body shrink-0" style={{ color: '#4A5568' }}>{day}</span>
                {Array.from({ length: 24 }, (_, hour) => {
                  const val = Math.random();
                  const intensity = val > 0.85 ? 1 : val > 0.7 ? 0.6 : val > 0.5 ? 0.3 : 0.05;
                  const color = intensity > 0.7 ? '#E05C6B' : intensity > 0.4 ? '#F5A623' : intensity > 0.1 ? '#2DD4BF' : '#1C2230';
                  return (
                    <div
                      key={hour}
                      className="rounded-sm"
                      style={{ flex: 1, height: '16px', backgroundColor: color, opacity: intensity + 0.1 }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Community vs Official Ratio */}
        <div className="glass-card rounded-xl p-6 mb-8 card-shadow animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Community vs Official Signal</h3>
            <span className="text-xs font-mono-custom" style={{ color: '#8B95A8' }}>34% official · 66% community</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            <div className="h-full rounded-l-full" style={{ width: '34%', backgroundColor: '#2DD4BF' }} />
            <div className="h-full rounded-r-full" style={{ width: '66%', backgroundColor: '#F5A623' }} />
          </div>
          <div className="flex gap-6 mt-3">
            <span className="flex items-center gap-2 text-xs font-body" style={{ color: '#8B95A8' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2DD4BF' }} /> Official (34%)
            </span>
            <span className="flex items-center gap-2 text-xs font-body" style={{ color: '#8B95A8' }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F5A623' }} /> Community (66%)
            </span>
          </div>
        </div>

        {/* Pattern/TTP Frequency */}
        <div className="glass-card rounded-xl p-6 mb-8 card-shadow animate-fade-in-up">
          <h3 className="text-sm font-display font-semibold mb-4" style={{ color: '#E8EAF0' }}>Pattern / TTP Frequency</h3>
          <div className="space-y-3">
            {[
              { pattern: 'Motorcycle snatch', count: 18, pct: 100 },
              { pattern: 'ATM robbery', count: 12, pct: 67 },
              { pattern: 'Phone snatching', count: 9, pct: 50 },
              { pattern: 'Night district robbery', count: 6, pct: 33 },
              { pattern: 'Vehicle window smash', count: 4, pct: 22 },
            ].map(({ pattern, count, pct }) => (
              <div key={pattern} className="flex items-center gap-4">
                <p className="w-44 text-sm font-body" style={{ color: '#E8EAF0' }}>{pattern}</p>
                <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: '#252D3D' }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#E05C6B' : '#F5A623' }} />
                </div>
                <p className="w-8 text-right text-xs font-mono-custom" style={{ color: '#8B95A8' }}>{count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents Feed */}
        <div className="glass-card rounded-xl overflow-hidden card-shadow animate-fade-in-up">
          <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: '#252D3D' }}>
            <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Recent Incidents</h3>
            <span className="text-xs font-body" style={{ color: '#8B95A8' }}>Last 20 in {neighborhood.name}</span>
          </div>
          {MOCK_INCIDENTS.slice(0, 7).map((incident) => (
            <button
              key={incident.id}
              onClick={() => navigate(`/incident/${incident.id}`)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors text-left border-b group"
              style={{ borderColor: '#252D3D' }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: CATEGORY_CONFIG[incident.category].bg }}
              >
                <span className="text-sm">{CATEGORY_CONFIG[incident.category].icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body truncate group-hover:text-white transition-colors" style={{ color: '#E8EAF0' }}>
                  {incident.title}
                </p>
                <p className="text-xs font-body mt-0.5" style={{ color: '#8B95A8' }}>
                  {incident.location.address || incident.location.neighborhood}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <ConfidenceBadge level={incident.confidence} />
                <span className="text-xs font-mono-custom" style={{ color: '#4A5568' }}>{formatTimeAgo(incident.timestamp)}</span>
                <ChevronRight size={12} style={{ color: '#4A5568' }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodPage;
