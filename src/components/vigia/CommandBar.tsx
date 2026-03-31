import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, TrendingUp, FileText, X, Hash } from 'lucide-react';
import { MOCK_NEIGHBORHOODS, MOCK_INCIDENTS } from '@/lib/mock-data';

interface CommandBarProps {
  open: boolean;
  onClose: () => void;
}

const CommandBar: React.FC<CommandBarProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [open]);

  const filteredNeighborhoods = MOCK_NEIGHBORHOODS.filter(n =>
    query.length > 0 && n.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredIncidents = MOCK_INCIDENTS.filter(i =>
    query.length > 0 && i.title.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const showRecent = query.length === 0;
  const recentSearches = ['El Poblado', 'Chapinero', 'Robbery patterns'];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center pt-16 px-4"
      style={{ backgroundColor: 'rgba(14,17,23,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden animate-slide-down"
        style={{ backgroundColor: '#141820', border: '1px solid #252D3D', boxShadow: '0 25px 80px rgba(0,0,0,0.7)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: '#252D3D' }}>
          <Search size={18} style={{ color: '#8B95A8' }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search neighborhoods, incidents, patterns..."
            className="flex-1 bg-transparent text-base font-body outline-none placeholder:text-[#4A5568]"
            style={{ color: '#E8EAF0' }}
          />
          {query && (
            <button onClick={() => setQuery('')} className="hover:opacity-70 transition-opacity" style={{ color: '#8B95A8' }}>
              <X size={15} />
            </button>
          )}
          <kbd className="text-[10px] font-mono-custom px-2 py-1 rounded" style={{ backgroundColor: '#252D3D', color: '#4A5568' }}>ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto py-2">
          {showRecent && (
            <div>
              <p className="px-5 py-2 text-[11px] font-body uppercase tracking-widest" style={{ color: '#4A5568' }}>Recent Searches</p>
              {recentSearches.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 transition-colors text-left"
                >
                  <Hash size={13} style={{ color: '#4A5568' }} />
                  <span className="text-sm font-body" style={{ color: '#8B95A8' }}>{s}</span>
                </button>
              ))}
              <div className="mt-3 border-t" style={{ borderColor: '#252D3D' }} />
              <p className="px-5 py-2 text-[11px] font-body uppercase tracking-widest" style={{ color: '#4A5568' }}>Quick Actions</p>
              <button
                onClick={() => { navigate('/'); onClose(); }}
                className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 transition-colors text-left"
              >
                <MapPin size={13} style={{ color: '#2DD4BF' }} />
                <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>Open Map Explorer</span>
              </button>
              <button
                onClick={() => { navigate('/trends'); onClose(); }}
                className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 transition-colors text-left"
              >
                <TrendingUp size={13} style={{ color: '#F5A623' }} />
                <span className="text-sm font-body" style={{ color: '#E8EAF0' }}>View Trends Dashboard</span>
              </button>
            </div>
          )}

          {!showRecent && (
            <>
              {filteredNeighborhoods.length > 0 && (
                <div>
                  <p className="px-5 py-2 text-[11px] font-body uppercase tracking-widest" style={{ color: '#4A5568' }}>Neighborhoods</p>
                  {filteredNeighborhoods.map(n => (
                    <button
                      key={n.id}
                      onClick={() => { navigate(`/neighborhoods/${n.id}`); onClose(); }}
                      className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 transition-colors text-left"
                    >
                      <MapPin size={13} style={{ color: '#2DD4BF' }} />
                      <div>
                        <p className="text-sm font-body" style={{ color: '#E8EAF0' }}>{n.name}</p>
                        <p className="text-xs font-body" style={{ color: '#8B95A8' }}>{n.city} · {n.incidentsThisMonth} incidents this month</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {filteredIncidents.length > 0 && (
                <div className="mt-2 border-t pt-2" style={{ borderColor: '#252D3D' }}>
                  <p className="px-5 py-2 text-[11px] font-body uppercase tracking-widest" style={{ color: '#4A5568' }}>Recent Incidents</p>
                  {filteredIncidents.map(i => (
                    <button
                      key={i.id}
                      onClick={() => { navigate(`/incident/${i.id}`); onClose(); }}
                      className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 transition-colors text-left"
                    >
                      <FileText size={13} style={{ color: '#F5A623' }} />
                      <div>
                        <p className="text-sm font-body" style={{ color: '#E8EAF0' }}>{i.title}</p>
                        <p className="text-xs font-body" style={{ color: '#8B95A8' }}>{i.location.neighborhood} · {i.location.city}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {filteredNeighborhoods.length === 0 && filteredIncidents.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm font-body" style={{ color: '#4A5568' }}>No results for "{query}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
