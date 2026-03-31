import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Clock, MapPin, TrendingUp, TrendingDown,
  Shield, Activity, Layers, Filter, X
} from 'lucide-react';
import { MOCK_INCIDENTS, MOCK_NEIGHBORHOODS, CATEGORY_CONFIG, formatTimeAgo } from '@/lib/mock-data';
import { CategoryBadge, SourceBadge, ConfidenceBadge, StatCard } from './Badges';
import type { IncidentCategory, DataSource } from '@/types/vigia';

const CATEGORIES: IncidentCategory[] = ['robbery', 'theft', 'extortion', 'assault', 'fraud', 'vehicle_theft', 'harassment'];
const TIME_RANGES = ['Today', '7d', '30d', '90d', '1yr'];
const DATA_SOURCES: { key: DataSource; label: string }[] = [
  { key: 'official', label: 'Official Data' },
  { key: 'community', label: 'Community' },
  { key: 'perception', label: 'Perception' },
];

// Simulated map markers
const MAP_MARKERS = [
  { id: '1', x: 28, y: 42, category: 'robbery' as IncidentCategory, recent: true, size: 'lg' },
  { id: '2', x: 45, y: 58, category: 'theft' as IncidentCategory, recent: true, size: 'md' },
  { id: '3', x: 62, y: 35, category: 'fraud' as IncidentCategory, recent: false, size: 'sm' },
  { id: '4', x: 35, y: 70, category: 'assault' as IncidentCategory, recent: false, size: 'md' },
  { id: '5', x: 72, y: 62, category: 'vehicle_theft' as IncidentCategory, recent: false, size: 'sm' },
  { id: '6', x: 55, y: 25, category: 'theft' as IncidentCategory, recent: true, size: 'lg' },
  { id: '7', x: 18, y: 60, category: 'extortion' as IncidentCategory, recent: false, size: 'sm' },
  { id: '8', x: 80, y: 44, category: 'harassment' as IncidentCategory, recent: false, size: 'sm' },
  { id: '9', x: 52, y: 75, category: 'robbery' as IncidentCategory, recent: false, size: 'md' },
];

const MapHero: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategories, setActiveCategories] = useState<IncidentCategory[]>([]);
  const [activeTimeRange, setActiveTimeRange] = useState('7d');
  const [activeSource, setActiveSource] = useState<DataSource>('community');
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const toggleCategory = (cat: IncidentCategory) => {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const visibleMarkers = MAP_MARKERS.filter(m =>
    activeCategories.length === 0 || activeCategories.includes(m.category)
  );

  const selectedIncident = selectedMarker ? MOCK_INCIDENTS[0] : null;

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ paddingTop: '56px' }}>
      {/* Map Background */}
      <div className="absolute inset-0 map-bg map-grid" style={{ top: '56px' }}>
        {/* Heatmap zones */}
        <div
          className="absolute animate-heatmap"
          style={{
            left: '25%', top: '35%', width: '220px', height: '180px',
            background: 'radial-gradient(ellipse, rgba(224,92,107,0.25) 0%, transparent 70%)',
            borderRadius: '50%', transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute animate-heatmap"
          style={{
            left: '50%', top: '55%', width: '280px', height: '200px',
            background: 'radial-gradient(ellipse, rgba(245,166,35,0.2) 0%, transparent 70%)',
            borderRadius: '50%', transform: 'translate(-50%, -50%)',
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute animate-heatmap"
          style={{
            left: '68%', top: '40%', width: '160px', height: '140px',
            background: 'radial-gradient(ellipse, rgba(45,212,191,0.15) 0%, transparent 70%)',
            borderRadius: '50%', transform: 'translate(-50%, -50%)',
            animationDelay: '2s',
          }}
        />

        {/* Map Markers */}
        {visibleMarkers.map(marker => {
          const config = CATEGORY_CONFIG[marker.category];
          const sizes = { lg: 'w-4 h-4', md: 'w-3 h-3', sm: 'w-2.5 h-2.5' };
          const pulseClass = marker.recent && marker.category === 'robbery' ? 'pulse-danger' : marker.recent ? 'pulse-amber' : '';
          return (
            <button
              key={marker.id}
              onClick={() => setSelectedMarker(selectedMarker === marker.id ? null : marker.id)}
              className={`absolute rounded-full transition-transform hover:scale-125 ${sizes[marker.size as keyof typeof sizes]} ${pulseClass}`}
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                backgroundColor: config.color,
                transform: `translate(-50%, -50%) ${selectedMarker === marker.id ? 'scale(1.3)' : ''}`,
                border: selectedMarker === marker.id ? '2px solid white' : '1.5px solid rgba(255,255,255,0.3)',
                boxShadow: `0 0 8px ${config.color}80`,
                zIndex: selectedMarker === marker.id ? 10 : 1,
              }}
            />
          );
        })}

        {/* Quick Peek Card */}
        {selectedMarker && selectedIncident && (
          <div
            className="absolute glass-card rounded-xl p-4 w-72 animate-fade-in-up card-shadow"
            style={{
              left: `${(MAP_MARKERS.find(m => m.id === selectedMarker)?.x || 50)}%`,
              top: `${(MAP_MARKERS.find(m => m.id === selectedMarker)?.y || 50)}%`,
              transform: 'translate(12px, -50%)',
              zIndex: 20,
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <CategoryBadge category={selectedIncident.category} />
              <button onClick={() => setSelectedMarker(null)} style={{ color: '#8B95A8' }}>
                <X size={14} />
              </button>
            </div>
            <p className="text-sm font-body font-medium mb-1" style={{ color: '#E8EAF0' }}>{selectedIncident.title}</p>
            <p className="text-xs font-body mb-3" style={{ color: '#8B95A8' }}>
              {selectedIncident.location.neighborhood} · {formatTimeAgo(selectedIncident.timestamp)}
            </p>
            <div className="flex gap-2 mb-3">
              <ConfidenceBadge level={selectedIncident.confidence} />
              <SourceBadge source={selectedIncident.source} />
            </div>
            <button
              onClick={() => navigate(`/incident/${selectedIncident.id}`)}
              className="w-full text-center text-xs font-body font-medium py-2 rounded transition-colors"
              style={{ color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)', backgroundColor: 'rgba(45,212,191,0.05)' }}
            >
              View Full Incident →
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="absolute left-0 right-0 z-20 animate-slide-down" style={{ top: '80px', padding: '0 16px' }}>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORIES.map(cat => {
              const config = CATEGORY_CONFIG[cat];
              const active = activeCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 flex items-center gap-1"
                  style={{
                    backgroundColor: active ? config.bg : 'rgba(20,24,32,0.85)',
                    color: active ? config.color : '#8B95A8',
                    border: active ? `1px solid ${config.border}` : '1px solid #252D3D',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {config.label}
                  {active && <X size={10} />}
                </button>
              );
            })}
          </div>

          <div className="w-px h-5" style={{ backgroundColor: '#252D3D' }} />

          {/* Time range */}
          <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid #252D3D', backgroundColor: 'rgba(20,24,32,0.85)', backdropFilter: 'blur(8px)' }}>
            {TIME_RANGES.map(range => (
              <button
                key={range}
                onClick={() => setActiveTimeRange(range)}
                className="px-3 py-1.5 text-xs font-body transition-colors"
                style={{
                  backgroundColor: activeTimeRange === range ? 'rgba(45,212,191,0.12)' : 'transparent',
                  color: activeTimeRange === range ? '#2DD4BF' : '#8B95A8',
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Data Source Toggle */}
      <div className="absolute left-4 z-20 animate-slide-in-left" style={{ bottom: '32px' }}>
        <div className="flex flex-col gap-1 glass-panel rounded-xl p-1.5">
          {DATA_SOURCES.map(src => (
            <button
              key={src.key}
              onClick={() => setActiveSource(src.key)}
              className="px-4 py-2 rounded-lg text-xs font-body transition-all duration-200"
              style={{
                backgroundColor: activeSource === src.key ? 'rgba(245,166,35,0.12)' : 'transparent',
                color: activeSource === src.key ? '#F5A623' : '#8B95A8',
              }}
            >
              {src.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute z-20" style={{ left: '16px', top: '128px' }}>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => navigate('/map')}
            className="w-9 h-9 glass-panel rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
            style={{ color: '#8B95A8' }}
            title="Map Explorer"
          >
            <Layers size={14} />
          </button>
          <button
            className="w-9 h-9 glass-panel rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
            style={{ color: '#8B95A8' }}
            title="Filters"
          >
            <Filter size={14} />
          </button>
        </div>
      </div>

      {/* Right Panel Toggle */}
      <button
        onClick={() => setRightPanelOpen(!rightPanelOpen)}
        className="absolute z-30 w-6 h-12 flex items-center justify-center rounded-l-lg transition-all duration-300"
        style={{
          right: rightPanelOpen ? '364px' : '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#141820',
          border: '1px solid #252D3D',
          borderRight: 'none',
          color: '#8B95A8',
        }}
      >
        {rightPanelOpen ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Right Side Panel */}
      <div
        className="absolute right-0 z-20 h-full overflow-y-auto transition-all duration-300"
        style={{
          top: '0',
          width: '360px',
          transform: rightPanelOpen ? 'translateX(0)' : 'translateX(100%)',
          backgroundColor: 'rgba(20,24,32,0.92)',
          backdropFilter: 'blur(16px)',
          borderLeft: '1px solid #252D3D',
        }}
      >
        <div className="p-5 space-y-5">
          {/* Stat micro-cards */}
          <div className="animate-fade-in-up stagger-1">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Incidents This Week" value="247" delta={12} accent="amber" />
              <StatCard label="Top Neighborhood" value="El Poblado" accent="teal" />
              <StatCard label="Most Common" value="Theft" accent="amber" />
              <StatCard label="Official vs Community" value="34% / 66%" mono accent="teal" />
            </div>
          </div>

          {/* Community Signal Score */}
          <div className="animate-fade-in-up stagger-2 glass-card rounded-xl p-5 card-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-body uppercase tracking-widest" style={{ color: '#8B95A8' }}>
                <Activity size={10} className="inline mr-1" />
                Community Signal
              </p>
              <span className="text-lg font-display font-bold" style={{ color: '#2DD4BF' }}>78</span>
            </div>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#252D3D' }}>
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{ width: '78%', background: 'linear-gradient(90deg, #2DD4BF, #F5A623)' }}
              />
            </div>
            <p className="text-xs font-body mt-2" style={{ color: '#8B95A8' }}>
              Based on 1,284 verified community reports
            </p>
          </div>

          {/* Trending Hotspots */}
          <div className="animate-fade-in-up stagger-3 glass-card rounded-xl card-shadow overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: '#252D3D' }}>
              <div className="flex items-center gap-2">
                <TrendingUp size={13} style={{ color: '#F5A623' }} />
                <p className="text-xs font-body font-medium uppercase tracking-widest" style={{ color: '#8B95A8' }}>Trending Hotspots</p>
              </div>
            </div>
            {MOCK_NEIGHBORHOODS.slice(0, 4).map((n, i) => (
              <button
                key={n.id}
                onClick={() => navigate(`/neighborhoods/${n.id}`)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-left border-b"
                style={{ borderColor: '#252D3D', animationDelay: `${i * 0.05}s` }}
              >
                <span className="text-sm font-mono-custom" style={{ color: '#4A5568', minWidth: '16px' }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body truncate" style={{ color: '#E8EAF0' }}>{n.name}</p>
                  <p className="text-xs font-body" style={{ color: '#8B95A8' }}>{n.city}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono-custom" style={{ color: '#E8EAF0' }}>{n.incidentsThisMonth}</p>
                  <p className={`text-xs font-body ${n.weekOverWeekChange > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {n.weekOverWeekChange > 0 ? '▲' : '▼'} {Math.abs(n.weekOverWeekChange)}%
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Recent Incidents Feed */}
          <div className="animate-fade-in-up stagger-4 glass-card rounded-xl card-shadow overflow-hidden">
            <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: '#252D3D' }}>
              <div className="flex items-center gap-2">
                <Clock size={13} style={{ color: '#2DD4BF' }} />
                <p className="text-xs font-body font-medium uppercase tracking-widest" style={{ color: '#8B95A8' }}>Recent Incidents</p>
              </div>
            </div>
            {MOCK_INCIDENTS.slice(0, 5).map((incident, i) => {
              const config = CATEGORY_CONFIG[incident.category];
              return (
                <button
                  key={incident.id}
                  onClick={() => navigate(`/incident/${incident.id}`)}
                  className="w-full text-left px-5 py-3 hover:bg-white/5 transition-colors border-b group"
                  style={{ borderColor: '#252D3D' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${i < 2 ? 'pulse-amber' : ''}`}
                      style={{ backgroundColor: config.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body leading-snug truncate group-hover:text-white transition-colors" style={{ color: '#E8EAF0' }}>
                        {incident.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={10} style={{ color: '#4A5568' }} />
                        <p className="text-xs font-body truncate" style={{ color: '#8B95A8' }}>{incident.location.neighborhood}</p>
                        <span style={{ color: '#4A5568' }}>·</span>
                        <p className="text-xs font-mono-custom" style={{ color: '#4A5568' }}>{formatTimeAgo(incident.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Most Reported Patterns */}
          <div className="animate-fade-in-up stagger-5 glass-card rounded-xl p-5 card-shadow">
            <p className="text-xs font-body font-medium uppercase tracking-widest mb-4" style={{ color: '#8B95A8' }}>
              <Shield size={10} className="inline mr-1" />
              Top Patterns This Week
            </p>
            {[
              { pattern: 'Motorcycle snatch', count: 34, pct: 100 },
              { pattern: 'ATM robbery', count: 28, pct: 82 },
              { pattern: 'Vehicle window smash', count: 19, pct: 56 },
              { pattern: 'Phone snatching', count: 15, pct: 44 },
              { pattern: 'Scopolamine', count: 9, pct: 26 },
            ].map(({ pattern, count, pct }) => (
              <div key={pattern} className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-body" style={{ color: '#E8EAF0' }}>{pattern}</p>
                  <p className="text-xs font-mono-custom" style={{ color: '#8B95A8' }}>{count}</p>
                </div>
                <div className="w-full h-1 rounded-full" style={{ backgroundColor: '#252D3D' }}>
                  <div
                    className="h-1 rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#E05C6B' : pct > 70 ? '#F5A623' : '#2DD4BF' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAB — Mobile */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg amber-glow transition-transform active:scale-95"
        style={{ backgroundColor: '#F5A623', color: '#0E1117' }}
      >
        +
      </button>
    </div>
  );
};

export default MapHero;
