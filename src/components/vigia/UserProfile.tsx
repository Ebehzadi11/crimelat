import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Bookmark, Upload, Settings, ChevronRight, Plus, Clock } from 'lucide-react';
import { MOCK_INCIDENTS, CATEGORY_CONFIG, formatTimeAgo } from '@/lib/mock-data';
import { CategoryBadge, ConfidenceBadge } from './Badges';

const TABS = [
  { key: 'reports', label: 'My Reports', icon: <FileText size={13} /> },
  { key: 'drafts', label: 'Drafts', icon: <Clock size={13} /> },
  { key: 'saved', label: 'Saved', icon: <Bookmark size={13} /> },
  { key: 'uploads', label: 'Uploads', icon: <Upload size={13} /> },
];

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reports');
  const [anonymousDefault, setAnonymousDefault] = useState(true);
  const [publicContrib, setPublicContrib] = useState(true);

  const myReports = MOCK_INCIDENTS.filter(i => i.visibility !== 'private').slice(0, 5);
  const drafts = MOCK_INCIDENTS.filter(i => i.visibility === 'draft').slice(0, 2);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E1117', paddingTop: '56px' }}>
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Profile Header */}
        <div className="glass-card rounded-2xl p-8 mb-8 card-shadow animate-fade-in-up">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ backgroundColor: '#1C2230', border: '2px solid #252D3D' }}
            >
              🥷
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-display font-bold" style={{ color: '#E8EAF0' }}>Anonymous Contributor</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-body" style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2DD4BF', border: '1px solid rgba(45,212,191,0.2)' }}>
                  Active Member
                </span>
              </div>
              <p className="text-sm font-body mb-5" style={{ color: '#8B95A8' }}>
                Your identity is protected. All contributions are linked to this anonymous profile.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Reports', value: '12' },
                  { label: 'Public', value: '8' },
                  { label: 'Private', value: '2' },
                  { label: 'Drafts', value: '2' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-xl text-center" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                    <p className="text-xl font-display font-bold mb-0.5" style={{ color: '#F5A623' }}>{value}</p>
                    <p className="text-xs font-body" style={{ color: '#8B95A8' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: Tabs + Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex items-center gap-1 mb-5 glass-panel rounded-xl p-1">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200"
                  style={{
                    backgroundColor: activeTab === tab.key ? '#1C2230' : 'transparent',
                    color: activeTab === tab.key ? '#E8EAF0' : '#8B95A8',
                    border: activeTab === tab.key ? '1px solid #252D3D' : '1px solid transparent',
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* My Reports */}
            {activeTab === 'reports' && (
              <div className="space-y-3 animate-fade-in-up">
                {myReports.map(incident => (
                  <button
                    key={incident.id}
                    onClick={() => navigate(`/incident/${incident.id}`)}
                    className="w-full glass-card rounded-xl p-4 text-left hover:bg-white/5 transition-colors group card-shadow card-hover"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryBadge category={incident.category} />
                          <ConfidenceBadge level={incident.confidence} />
                        </div>
                        <p className="text-sm font-body font-medium group-hover:text-white transition-colors" style={{ color: '#E8EAF0' }}>
                          {incident.title}
                        </p>
                        <p className="text-xs font-body mt-1" style={{ color: '#8B95A8' }}>
                          {incident.location.neighborhood}, {incident.location.city} · {formatTimeAgo(incident.timestamp)}
                        </p>
                      </div>
                      <ChevronRight size={14} style={{ color: '#4A5568' }} className="mt-1 shrink-0" />
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t" style={{ borderColor: '#252D3D' }}>
                      <span className="text-xs font-body" style={{ color: '#8B95A8' }}>
                        👥 {incident.corroborations || 0} corroborations
                      </span>
                      <span
                        className="text-xs font-body px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: incident.visibility === 'public' ? 'rgba(45,212,191,0.08)' : '#1C2230',
                          color: incident.visibility === 'public' ? '#2DD4BF' : '#8B95A8',
                        }}
                      >
                        {incident.visibility}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Drafts */}
            {activeTab === 'drafts' && (
              <div className="space-y-3 animate-fade-in-up">
                {/* Resume draft cards */}
                {[
                  { title: 'Vehicle theft near Parque Bello', step: 3, total: 5, type: 'quick', category: 'vehicle_theft' as const },
                  { title: 'Fraud — structured report', module: 4, total: 8, type: 'structured', category: 'fraud' as const },
                ].map((draft, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-xl p-5 card-shadow"
                    style={{ borderLeft: '2px solid #F5A623' }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CategoryBadge category={draft.category} />
                          <span className="text-xs font-body px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(245,166,35,0.1)', color: '#F5A623' }}>
                            Draft
                          </span>
                        </div>
                        <p className="text-sm font-body font-medium" style={{ color: '#E8EAF0' }}>{draft.title}</p>
                        <p className="text-xs font-body mt-1" style={{ color: '#8B95A8' }}>
                          {draft.type === 'quick'
                            ? `Quick report — step ${draft.step} of ${draft.total}`
                            : `Structured report — module ${draft.module} of ${draft.total}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: '#252D3D' }}>
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${((draft.step || draft.module || 1) / draft.total) * 100}%`,
                            backgroundColor: '#F5A623',
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono-custom" style={{ color: '#8B95A8' }}>
                        {Math.round(((draft.step || draft.module || 1) / draft.total) * 100)}%
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(draft.type === 'quick' ? '/report' : '/deep-report')}
                      className="w-full py-2.5 rounded-lg text-sm font-body font-medium transition-all active:scale-95"
                      style={{ backgroundColor: '#F5A623', color: '#0E1117' }}
                    >
                      Continue Report →
                    </button>
                  </div>
                ))}

                {drafts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-4">📝</p>
                    <p className="text-sm font-body" style={{ color: '#8B95A8' }}>No drafts yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Saved */}
            {activeTab === 'saved' && (
              <div className="animate-fade-in-up">
                {MOCK_INCIDENTS.slice(2, 5).map(incident => (
                  <button
                    key={incident.id}
                    onClick={() => navigate(`/incident/${incident.id}`)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl mb-3 glass-card hover:bg-white/5 transition-colors text-left group card-shadow"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: CATEGORY_CONFIG[incident.category].bg }}
                    >
                      <span className="text-sm">{CATEGORY_CONFIG[incident.category].icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body truncate group-hover:text-white transition-colors" style={{ color: '#E8EAF0' }}>
                        {incident.title}
                      </p>
                      <p className="text-xs font-body mt-0.5" style={{ color: '#8B95A8' }}>
                        {incident.location.neighborhood} · {formatTimeAgo(incident.timestamp)}
                      </p>
                    </div>
                    <Bookmark size={13} style={{ color: '#F5A623' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Uploads */}
            {activeTab === 'uploads' && (
              <div className="animate-fade-in-up text-center py-16">
                <Upload size={32} className="mx-auto mb-4" style={{ color: '#252D3D' }} />
                <p className="text-sm font-body mb-2" style={{ color: '#8B95A8' }}>No uploads yet</p>
                <p className="text-xs font-body" style={{ color: '#4A5568' }}>Attach evidence to a structured report to see it here</p>
              </div>
            )}
          </div>

          {/* Right: Settings Panel */}
          <div className="space-y-5">
            {/* Settings */}
            <div className="glass-card rounded-xl p-5 card-shadow animate-fade-in-up">
              <div className="flex items-center gap-2 mb-5">
                <Settings size={14} style={{ color: '#2DD4BF' }} />
                <h3 className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Privacy & Settings</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Anonymous by default', value: anonymousDefault, toggle: () => setAnonymousDefault(!anonymousDefault), desc: 'All new reports default to anonymous' },
                  { label: 'Public contributions', value: publicContrib, toggle: () => setPublicContrib(!publicContrib), desc: 'Allow your reports to appear in public feeds' },
                ].map(setting => (
                  <div key={setting.label} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-body" style={{ color: '#E8EAF0' }}>{setting.label}</p>
                      <p className="text-xs font-body mt-0.5" style={{ color: '#8B95A8' }}>{setting.desc}</p>
                    </div>
                    <button
                      onClick={setting.toggle}
                      className="relative w-10 h-5.5 rounded-full shrink-0 transition-colors duration-200"
                      style={{
                        backgroundColor: setting.value ? 'rgba(45,212,191,0.3)' : '#252D3D',
                        height: '22px',
                        width: '40px',
                      }}
                    >
                      <span
                        className="absolute top-0.5 w-4 h-4 rounded-full transition-transform duration-200"
                        style={{
                          backgroundColor: setting.value ? '#2DD4BF' : '#4A5568',
                          left: setting.value ? '20px' : '2px',
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="glass-card rounded-xl p-5 card-shadow animate-fade-in-up stagger-1">
              <h3 className="text-sm font-display font-semibold mb-4" style={{ color: '#E8EAF0' }}>Notifications</h3>
              <div className="space-y-3">
                {[
                  'Safety alerts in my neighborhoods',
                  'New incidents near my location',
                  'Corroborations on my reports',
                  'Weekly neighborhood digest',
                ].map(pref => (
                  <label key={pref} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded" />
                    <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* New Report CTA */}
            <button
              onClick={() => navigate('/report')}
              className="w-full py-4 rounded-xl text-sm font-body font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#F5A623', color: '#0E1117' }}
            >
              <Plus size={16} />
              + New Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
