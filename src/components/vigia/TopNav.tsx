import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, User, Settings, Command, MapPin, TrendingUp, Home, FileText, AlertTriangle } from 'lucide-react';
import CommandBar from './CommandBar';

interface TopNavProps {
  onAddIncident: () => void;
}

const NAV_LINKS = [
  { to: '/', label: 'Map', icon: <Home size={14} /> },
  { to: '/trends', label: 'Trends', icon: <TrendingUp size={14} /> },
  { to: '/neighborhoods', label: 'Neighborhoods', icon: <MapPin size={14} /> },
  { to: '/my-reports', label: 'My Reports', icon: <FileText size={14} /> },
];

const TopNav: React.FC<TopNavProps> = ({ onAddIncident }) => {
  const location = useLocation();
  const [commandOpen, setCommandOpen] = useState(false);

  // Global ⌘K listener
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel h-14 flex items-center px-6 gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5A623 0%, #E8951A 100%)' }}>
            <AlertTriangle size={14} className="text-black" />
          </div>
          <span className="font-display font-800 text-base tracking-tight" style={{ color: '#E8EAF0' }}>
            Vigía
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 shrink-0" style={{ backgroundColor: '#252D3D' }} />

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-body transition-all duration-200 ${
                  active
                    ? 'text-white'
                    : 'hover:text-white'
                }`}
                style={{
                  color: active ? '#E8EAF0' : '#8B95A8',
                  backgroundColor: active ? 'rgba(45,212,191,0.08)' : undefined,
                  borderBottom: active ? '1px solid rgba(45,212,191,0.4)' : '1px solid transparent',
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search / Command */}
        <button
          onClick={() => setCommandOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-body transition-all duration-200 hover:bg-white/5"
          style={{ color: '#8B95A8', border: '1px solid #252D3D', backgroundColor: 'rgba(28,34,48,0.5)' }}
        >
          <Search size={13} />
          <span className="hidden md:inline text-xs">Search</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono-custom px-1.5 py-0.5 rounded" style={{ backgroundColor: '#252D3D', color: '#4A5568' }}>
            ⌘K
          </kbd>
        </button>

        {/* Report Incident */}
        <button
          onClick={onAddIncident}
          className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-body font-medium transition-all duration-200 active:scale-95"
          style={{ backgroundColor: '#F5A623', color: '#0E1117' }}
        >
          + Report Incident
        </button>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/5 transition-colors relative" style={{ color: '#8B95A8' }}>
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F5A623' }} />
          </button>
          <Link to="/my-reports" className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/5 transition-colors" style={{ color: '#8B95A8' }}>
            <User size={15} />
          </Link>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/5 transition-colors" style={{ color: '#8B95A8' }}>
            <Settings size={15} />
          </button>
        </div>
      </nav>

      <CommandBar open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
};

export default TopNav;
