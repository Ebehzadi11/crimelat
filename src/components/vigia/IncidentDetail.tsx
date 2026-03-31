import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Clock, ExternalLink, Users,
  ChevronRight, Plus, MessageSquare, Shield
} from 'lucide-react';
import { MOCK_INCIDENTS, CATEGORY_CONFIG, formatTimeAgo } from '@/lib/mock-data';
import { CategoryBadge, ConfidenceBadge, SourceBadge } from './Badges';

const IncidentDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = MOCK_INCIDENTS.find(i => i.id === id) || MOCK_INCIDENTS[0];
  const config = CATEGORY_CONFIG[incident.category];

  const TIMELINE = [
    { label: 'Incident occurred', time: incident.timestamp, icon: '⚡' },
    { label: 'First report submitted', time: incident.reportedAt, icon: '📝' },
    { label: '3 community corroborations', time: new Date(incident.reportedAt.getTime() + 2 * 60 * 60 * 1000), icon: '👥' },
    ...(incident.officiallyReported ? [{ label: 'Official denuncia filed', time: new Date(incident.reportedAt.getTime() + 5 * 60 * 60 * 1000), icon: '🏛️' }] : []),
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E1117', paddingTop: '56px' }}>
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-sm font-body hover:opacity-80 transition-opacity"
          style={{ color: '#8B95A8' }}
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Hero section */}
            <div className="glass-card rounded-xl p-7 card-shadow animate-fade-in-up">
              <div className="flex flex-wrap gap-2 mb-4">
                <CategoryBadge category={incident.category} size="md" />
                <ConfidenceBadge level={incident.confidence} size="md" />
                <SourceBadge source={incident.source} size="md" />
                {incident.officiallyReported && (
                  <span className="px-3 py-1 rounded text-sm font-body" style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)' }}>
                    ✓ Officially Reported
                  </span>
                )}
                {incident.evidencePresent && (
                  <span className="px-3 py-1 rounded text-sm font-body" style={{ backgroundColor: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}>
                    📎 Evidence Present
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-display font-bold mb-4" style={{ color: '#E8EAF0' }}>
                {incident.title}
              </h1>

              {/* TTP Tags */}
              {incident.ttpTags && incident.ttpTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {incident.ttpTags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-body"
                      style={{ backgroundColor: '#1C2230', color: '#8B95A8', border: '1px solid #252D3D' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-2 text-sm font-body mb-5" style={{ color: '#8B95A8' }}>
                <div className="flex items-center gap-2">
                  <MapPin size={13} />
                  <span>{incident.location.address || incident.location.neighborhood}, {incident.location.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} />
                  <span className="font-mono-custom text-xs">{formatTimeAgo(incident.timestamp)} · {incident.timestamp.toLocaleString('es-CO')}</span>
                </div>
              </div>

              {/* Inline map snippet */}
              <div
                className="w-full h-32 rounded-xl overflow-hidden map-bg map-grid relative flex items-center justify-center mb-5"
                style={{ border: '1px solid #252D3D' }}
              >
                {/* Privacy radius blur */}
                <div
                  className="absolute w-24 h-24 rounded-full"
                  style={{
                    backgroundColor: `${config.color}15`,
                    border: `2px solid ${config.color}30`,
                    backdropFilter: 'blur(2px)',
                  }}
                />
                <div className="absolute w-3 h-3 rounded-full" style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }} />
                <span className="absolute bottom-2 left-2 text-xs font-body" style={{ color: '#4A5568' }}>
                  Approximate location only
                </span>
              </div>

              {/* Narrative */}
              {incident.narrative && (
                <div>
                  <p className="text-xs font-body uppercase tracking-widest mb-3" style={{ color: '#4A5568' }}>Narrative</p>
                  <p className="text-sm font-body leading-relaxed p-4 rounded-lg" style={{ color: '#8B95A8', backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                    {incident.narrative}
                  </p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-1">
              <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Event Timeline</h3>
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-px" style={{ backgroundColor: '#252D3D' }} />
                {TIMELINE.map((event, i) => (
                  <div key={i} className="relative mb-5 last:mb-0">
                    <div
                      className="absolute -left-4 top-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px]"
                      style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}
                    >
                      {event.icon}
                    </div>
                    <p className="text-sm font-body" style={{ color: '#E8EAF0' }}>{event.label}</p>
                    <p className="text-xs font-mono-custom mt-0.5" style={{ color: '#4A5568' }}>
                      {event.time.toLocaleString('es-CO')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured fields */}
            <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-2">
              <h3 className="text-sm font-display font-semibold mb-5" style={{ color: '#E8EAF0' }}>Incident Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Category', value: config.label },
                  { label: 'Sub-type', value: incident.subType || '—' },
                  { label: 'Location', value: `${incident.location.neighborhood}, ${incident.location.city}` },
                  { label: 'Timestamp', value: formatTimeAgo(incident.timestamp) },
                  { label: 'Source', value: incident.source },
                  { label: 'Corroborations', value: `${incident.corroborations || 0} reports` },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                    <p className="text-[10px] font-body uppercase tracking-widest mb-1" style={{ color: '#4A5568' }}>{label}</p>
                    <p className="text-sm font-body" style={{ color: '#E8EAF0' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Validation */}
            <div className="glass-card rounded-xl p-6 card-shadow animate-fade-in-up stagger-3">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Community Validation</h3>
                  <p className="text-xs font-body mt-1" style={{ color: '#8B95A8' }}>
                    <span className="font-mono-custom" style={{ color: '#2DD4BF' }}>{incident.corroborations || 0}</span> people reported something similar
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-display font-bold"
                  style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)' }}
                >
                  {incident.corroborations || 0}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/report')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-body font-medium transition-colors"
                  style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)' }}
                >
                  <Users size={14} />
                  I Witnessed Something Similar
                </button>
                <button
                  onClick={() => navigate('/deep-report')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-body font-medium transition-colors"
                  style={{ backgroundColor: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}
                >
                  <Plus size={14} />
                  Add Related Incident
                </button>
                <button
                  onClick={() => navigate('/deep-report')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-body font-medium transition-colors"
                  style={{ backgroundColor: '#1C2230', color: '#E8EAF0', border: '1px solid #252D3D' }}
                >
                  <MessageSquare size={14} />
                  Contribute Info
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Similar incidents */}
            <div className="glass-card rounded-xl overflow-hidden card-shadow animate-fade-in-up">
              <div className="px-5 py-4 border-b" style={{ borderColor: '#252D3D' }}>
                <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Similar Incidents Nearby</h3>
              </div>
              {MOCK_INCIDENTS.filter(i => i.id !== incident.id).slice(0, 4).map(inc => (
                <button
                  key={inc.id}
                  onClick={() => navigate(`/incident/${inc.id}`)}
                  className="w-full flex items-start gap-3 px-5 py-4 hover:bg-white/5 transition-colors text-left border-b group"
                  style={{ borderColor: '#252D3D' }}
                >
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: CATEGORY_CONFIG[inc.category].color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-body truncate group-hover:text-white transition-colors" style={{ color: '#E8EAF0' }}>
                      {inc.title}
                    </p>
                    <p className="text-[10px] font-body mt-0.5" style={{ color: '#8B95A8' }}>
                      {inc.location.neighborhood} · {formatTimeAgo(inc.timestamp)}
                    </p>
                  </div>
                  <ChevronRight size={11} style={{ color: '#4A5568' }} />
                </button>
              ))}
            </div>

            {/* Report actions */}
            <div className="glass-card rounded-xl p-5 card-shadow animate-fade-in-up stagger-1">
              <h3 className="text-sm font-display font-semibold mb-4" style={{ color: '#E8EAF0' }}>Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/deep-report')}
                  className="w-full py-2.5 rounded-lg text-sm font-body font-medium transition-all active:scale-95"
                  style={{ backgroundColor: '#F5A623', color: '#0E1117' }}
                >
                  <Shield size={13} className="inline mr-2" />
                  File Detailed Report
                </button>
                <button className="w-full py-2.5 rounded-lg text-sm font-body transition-colors" style={{ backgroundColor: '#1C2230', color: '#8B95A8', border: '1px solid #252D3D' }}>
                  <ExternalLink size={13} className="inline mr-2" />
                  Share Incident
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
