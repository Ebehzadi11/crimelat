import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, X, SlidersHorizontal, Layers,
  Play, MapPin, Shield, Clock, ExternalLink, ChevronDown
} from 'lucide-react';
import { MOCK_INCIDENTS, CATEGORY_CONFIG, formatTimeAgo } from '@/lib/mock-data';
import { CategoryBadge, ConfidenceBadge, SourceBadge } from './Badges';
import type { IncidentCategory } from '@/types/vigia';

const CATEGORIES: IncidentCategory[] = ['robbery', 'theft', 'extortion', 'assault', 'fraud', 'vehicle_theft', 'harassment'];

const MAP_POINTS = [
  { id: '1', x: 28, y: 42, category: 'robbery' as IncidentCategory },
  { id: '2', x: 45, y: 58, category: 'theft' as IncidentCategory },
  { id: '3', x: 62, y: 35, category: 'fraud' as IncidentCategory },
  { id: '4', x: 35, y: 70, category: 'assault' as IncidentCategory },
  { id: '5', x: 72, y: 62, category: 'vehicle_theft' as IncidentCategory },
  { id: '6', x: 55, y: 25, category: 'theft' as IncidentCategory },
  { id: '7', x: 22, y: 55, category: 'extortion' as IncidentCategory },
  { id: '8', x: 78, y: 44, category: 'harassment' as IncidentCategory },
  { id: '9', x: 50, y: 75, category: 'robbery' as IncidentCategory },
  { id: '10', x: 38, y: 30, category: 'theft' as IncidentCategory },
];

const MapExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [leftOpen, setLeftOpen] = useState(true);
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);
  const [activeCategories, setActiveCategories] = useState<IncidentCategory[]>([]);
  const [heatmapOn, setHeatmapOn] = useState(true);
  const [clustersOn, setClustersOn] = useState(true);
  const [timeValue, setTimeValue] = useState(75);
  const [confidenceFilter, setConfidenceFilter] = useState<string[]>([]);

  const toggleCategory = (cat: IncidentCategory) => {
    setActiveCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const visiblePoints = MAP_POINTS.filter(p =>
    activeCategories.length === 0 || activeCategories.includes(p.category)
  );

  const selectedIncident = selectedPointId
    ? MOCK_INCIDENTS[parseInt(selectedPointId) - 1] || MOCK_INCIDENTS[0]
    : null;

  return (
    <div className="flex h-screen" style={{ paddingTop: '56px' }}>
      {/* Left Filter Panel */}
      <div
        className="relative flex-shrink-0 h-full overflow-y-auto transition-all duration-300"
        style={{
          width: leftOpen ? '280px' : '0px',
          overflow: leftOpen ? 'auto' : 'hidden',
          backgroundColor: '#141820',
          borderRight: '1px solid #252D3D',
        }}
      >
        <div className="p-5" style={{ minWidth: '280px' }}>
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal size={14} style={{ color: '#2DD4BF' }} />
            <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Filters</h3>
          </div>

          {/* Crime Categories */}
          <div className="mb-6">
            <p className="text-xs font-body uppercase tracking-widest mb-3" style={{ color: '#8B95A8' }}>Crime Category</p>
            <div className="space-y-1">
              {CATEGORIES.map(cat => {
                const config = CATEGORY_CONFIG[cat];
                const active = activeCategories.includes(cat);
                return (
                  <label key={cat} className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-white/5 transition-colors">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleCategory(cat)}
                      className="w-3.5 h-3.5 rounded accent-teal-400"
                    />
                    <span className="flex items-center gap-2 text-sm font-body" style={{ color: active ? config.color : '#E8EAF0' }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                      {config.label}
                    </span>
                  </label>
                );
              })}
            </div>
            {/* Sub-types */}
            <div className="mt-3 space-y-1 ml-6">
              {['Motorcycle snatch', 'Scopolamine robbery', 'ATM robbery', 'Window smash'].map(sub => (
                <label key={sub} className="flex items-center gap-3 px-2 py-1.5 rounded cursor-pointer hover:bg-white/5 transition-colors">
                  <input type="checkbox" className="w-3 h-3 rounded" />
                  <span className="text-xs font-body" style={{ color: '#8B95A8' }}>{sub}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-b mb-5" style={{ borderColor: '#252D3D' }} />

          {/* Date Range */}
          <div className="mb-6">
            <p className="text-xs font-body uppercase tracking-widest mb-3" style={{ color: '#8B95A8' }}>Date Range</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded px-3 py-2 text-xs font-body" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D', color: '#8B95A8' }}>
                Dec 1, 2024
              </div>
              <div className="rounded px-3 py-2 text-xs font-body" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D', color: '#8B95A8' }}>
                Jan 6, 2025
              </div>
            </div>
          </div>

          {/* Time of Day */}
          <div className="mb-6">
            <p className="text-xs font-body uppercase tracking-widest mb-3" style={{ color: '#8B95A8' }}>Time of Day</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono-custom" style={{ color: '#8B95A8' }}>00:00</span>
              <input type="range" className="flex-1" min={0} max={24} defaultValue={0} />
              <span className="text-xs font-mono-custom" style={{ color: '#8B95A8' }}>23:59</span>
            </div>
          </div>

          <div className="border-b mb-5" style={{ borderColor: '#252D3D' }} />

          {/* Source Type */}
          <div className="mb-6">
            <p className="text-xs font-body uppercase tracking-widest mb-3" style={{ color: '#8B95A8' }}>Source Type</p>
            {['Official', 'Community', 'Perception/Survey'].map(src => (
              <label key={src} className="flex items-center gap-3 px-2 py-2 rounded cursor-pointer hover:bg-white/5 transition-colors">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded" />
                <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>{src}</span>
              </label>
            ))}
          </div>

          {/* Confidence Filter */}
          <div className="mb-6">
            <p className="text-xs font-body uppercase tracking-widest mb-3" style={{ color: '#8B95A8' }}>Confidence</p>
            {['High', 'Medium', 'Low'].map(c => (
              <label key={c} className="flex items-center gap-3 px-2 py-2 rounded cursor-pointer hover:bg-white/5 transition-colors">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded" />
                <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>{c}</span>
              </label>
            ))}
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>Officially Reported Only</span>
              <div
                onClick={() => {}}
                className="w-9 h-5 rounded-full cursor-pointer relative transition-colors"
                style={{ backgroundColor: '#252D3D' }}
              >
                <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full transition-transform" style={{ backgroundColor: '#4A5568' }} />
              </div>
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>Evidence Present</span>
              <div
                className="w-9 h-5 rounded-full cursor-pointer relative transition-colors"
                style={{ backgroundColor: '#252D3D' }}
              >
                <span className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full" style={{ backgroundColor: '#4A5568' }} />
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Left Panel Toggle */}
      <button
        onClick={() => setLeftOpen(!leftOpen)}
        className="absolute z-30 w-6 h-12 flex items-center justify-center rounded-r-lg transition-all duration-300"
        style={{
          left: leftOpen ? '280px' : '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#141820',
          border: '1px solid #252D3D',
          borderLeft: 'none',
          color: '#8B95A8',
        }}
      >
        {leftOpen ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>

      {/* Center Map */}
      <div className="flex-1 relative map-bg map-grid overflow-hidden">
        {/* Heatmap zones */}
        {heatmapOn && (
          <>
            <div className="absolute animate-heatmap" style={{
              left: '30%', top: '40%', width: '240px', height: '200px',
              background: 'radial-gradient(ellipse, rgba(224,92,107,0.2) 0%, transparent 70%)',
              borderRadius: '50%', transform: 'translate(-50%, -50%)',
            }} />
            <div className="absolute animate-heatmap" style={{
              left: '55%', top: '60%', width: '300px', height: '220px',
              background: 'radial-gradient(ellipse, rgba(245,166,35,0.18) 0%, transparent 70%)',
              borderRadius: '50%', transform: 'translate(-50%, -50%)',
              animationDelay: '1.5s',
            }} />
          </>
        )}

        {/* Points */}
        {visiblePoints.map(point => {
          const config = CATEGORY_CONFIG[point.category];
          return (
            <button
              key={point.id}
              onClick={() => setSelectedPointId(selectedPointId === point.id ? null : point.id)}
              className="absolute w-3 h-3 rounded-full hover:scale-150 transition-transform"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                backgroundColor: config.color,
                transform: `translate(-50%, -50%) ${selectedPointId === point.id ? 'scale(1.5)' : ''}`,
                border: selectedPointId === point.id ? '2px solid white' : '1px solid rgba(255,255,255,0.3)',
                boxShadow: `0 0 6px ${config.color}80`,
                zIndex: selectedPointId === point.id ? 10 : 1,
              }}
            />
          );
        })}

        {/* Map Controls Toolbar */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => setHeatmapOn(!heatmapOn)}
            className="px-3 py-1.5 rounded text-xs font-body transition-colors glass-panel"
            style={{ color: heatmapOn ? '#2DD4BF' : '#8B95A8' }}
          >
            Heatmap
          </button>
          <button
            onClick={() => setClustersOn(!clustersOn)}
            className="px-3 py-1.5 rounded text-xs font-body transition-colors glass-panel"
            style={{ color: clustersOn ? '#2DD4BF' : '#8B95A8' }}
          >
            Clusters
          </button>
          <button className="px-3 py-1.5 rounded text-xs font-body transition-colors glass-panel" style={{ color: '#8B95A8' }}>
            Polygons
          </button>
          <button className="px-3 py-1.5 rounded text-xs font-body transition-colors glass-panel flex items-center gap-1" style={{ color: '#8B95A8' }}>
            <Layers size={11} /> Layers
          </button>
        </div>

        {/* Time Slider */}
        <div className="absolute bottom-4 left-4 right-4 z-10 glass-panel rounded-xl px-5 py-3">
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-white/10 transition-colors" style={{ color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)' }}>
              <Play size={12} />
            </button>
            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={100}
                value={timeValue}
                onChange={e => setTimeValue(parseInt(e.target.value))}
                className="w-full accent-teal-400"
              />
            </div>
            <span className="text-xs font-mono-custom whitespace-nowrap" style={{ color: '#8B95A8' }}>
              Jan 1 – Jan 6, 2025
            </span>
          </div>
        </div>
      </div>

      {/* Right Inspector Panel */}
      {selectedIncident && (
        <div
          className="flex-shrink-0 h-full overflow-y-auto animate-slide-in-right"
          style={{
            width: '380px',
            backgroundColor: '#141820',
            borderLeft: '1px solid #252D3D',
          }}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <CategoryBadge category={selectedIncident.category} size="md" />
              <button onClick={() => setSelectedPointId(null)} style={{ color: '#8B95A8' }}>
                <X size={16} />
              </button>
            </div>

            <h2 className="text-lg font-display font-bold mb-2" style={{ color: '#E8EAF0' }}>
              {selectedIncident.title}
            </h2>

            <div className="flex items-center gap-2 mb-4" style={{ color: '#8B95A8' }}>
              <MapPin size={12} />
              <span className="text-sm font-body">{selectedIncident.location.neighborhood}, {selectedIncident.location.city}</span>
            </div>

            <div className="flex items-center gap-2 mb-5" style={{ color: '#8B95A8' }}>
              <Clock size={12} />
              <span className="text-xs font-mono-custom">{formatTimeAgo(selectedIncident.timestamp)}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <ConfidenceBadge level={selectedIncident.confidence} size="md" />
              <SourceBadge source={selectedIncident.source} size="md" />
              {selectedIncident.officiallyReported && (
                <span className="px-3 py-1 rounded text-sm font-body" style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)' }}>
                  Official ✓
                </span>
              )}
            </div>

            {/* TTP Tags */}
            {selectedIncident.ttpTags && selectedIncident.ttpTags.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-body uppercase tracking-widest mb-2" style={{ color: '#4A5568' }}>TTP / Pattern Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedIncident.ttpTags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs font-body" style={{ backgroundColor: '#1C2230', color: '#8B95A8', border: '1px solid #252D3D' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedIncident.narrative && (
              <div className="mb-5 p-4 rounded-lg" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                <p className="text-sm font-body leading-relaxed" style={{ color: '#8B95A8' }}>
                  {selectedIncident.narrative}
                </p>
              </div>
            )}

            {/* Similar incidents nearby */}
            <div className="mb-5">
              <p className="text-xs font-body uppercase tracking-widest mb-3" style={{ color: '#4A5568' }}>Similar Nearby</p>
              {MOCK_INCIDENTS.slice(1, 3).map(inc => (
                <button
                  key={inc.id}
                  onClick={() => navigate(`/incident/${inc.id}`)}
                  className="w-full text-left p-3 rounded-lg mb-2 hover:bg-white/5 transition-colors"
                  style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}
                >
                  <p className="text-sm font-body truncate" style={{ color: '#E8EAF0' }}>{inc.title}</p>
                  <p className="text-xs font-body mt-1" style={{ color: '#8B95A8' }}>{inc.location.neighborhood} · {formatTimeAgo(inc.timestamp)}</p>
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button
                onClick={() => navigate(`/incident/${selectedIncident.id}`)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-body font-medium transition-colors"
                style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)' }}
              >
                <ExternalLink size={14} />
                Open Full Page
              </button>
              <button
                className="w-full py-2.5 rounded-lg text-sm font-body font-medium transition-colors"
                style={{ backgroundColor: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}
              >
                + Contribute More Info
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapExplorer;
