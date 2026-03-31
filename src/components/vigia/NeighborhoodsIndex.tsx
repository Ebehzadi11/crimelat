import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { MOCK_NEIGHBORHOODS } from '@/lib/mock-data';

const NeighborhoodsIndex: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All');

  const filtered = MOCK_NEIGHBORHOODS.filter(n =>
    (city === 'All' || n.city === city) &&
    (query === '' || n.name.toLowerCase().includes(query.toLowerCase()))
  );

  const cities = ['All', ...Array.from(new Set(MOCK_NEIGHBORHOODS.map(n => n.city)))];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E1117', paddingTop: '56px' }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-display font-bold mb-2" style={{ color: '#E8EAF0' }}>Neighborhoods</h1>
          <p className="text-sm font-body" style={{ color: '#8B95A8' }}>Browse safety intelligence by neighborhood across Colombia</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 animate-fade-in-up stagger-1">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#8B95A8' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search neighborhoods..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm font-body outline-none"
              style={{ backgroundColor: '#141820', border: '1px solid #252D3D', color: '#E8EAF0' }}
            />
          </div>
          <div className="flex items-center gap-1 glass-panel rounded-lg p-1">
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className="px-3 py-1.5 rounded text-sm font-body transition-colors"
                style={{
                  backgroundColor: city === c ? '#1C2230' : 'transparent',
                  color: city === c ? '#E8EAF0' : '#8B95A8',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((n, i) => (
            <button
              key={n.id}
              onClick={() => navigate(`/neighborhoods/${n.id}`)}
              className={`glass-card rounded-xl p-5 text-left card-shadow card-hover animate-fade-in-up stagger-${(i % 5) + 1} group`}
              style={{ borderLeft: n.weekOverWeekChange > 10 ? '2px solid #E05C6B' : n.weekOverWeekChange < 0 ? '2px solid #2DD4BF' : '1px solid #252D3D' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-display font-bold mb-0.5" style={{ color: '#E8EAF0' }}>{n.name}</h2>
                  <p className="text-xs font-body" style={{ color: '#8B95A8' }}>{n.city} · {n.district}</p>
                </div>
                <ChevronRight size={14} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#2DD4BF' }} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 rounded-lg" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                  <p className="text-xs font-body mb-0.5" style={{ color: '#4A5568' }}>Incidents (30d)</p>
                  <p className="text-xl font-display font-bold" style={{ color: '#F5A623' }}>{n.incidentsThisMonth}</p>
                </div>
                <div className="p-2.5 rounded-lg" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                  <p className="text-xs font-body mb-0.5" style={{ color: '#4A5568' }}>Signal</p>
                  <p className="text-xl font-display font-bold" style={{ color: n.signalConfidence >= 75 ? '#2DD4BF' : '#F5A623' }}>
                    {n.signalConfidence}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-body" style={{ color: '#8B95A8' }}>{n.topPattern}</span>
                <span className={`flex items-center gap-1 text-xs font-body ${n.weekOverWeekChange > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {n.weekOverWeekChange > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {n.weekOverWeekChange > 0 ? '+' : ''}{n.weekOverWeekChange}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodsIndex;
