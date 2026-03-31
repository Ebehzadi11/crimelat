import React from 'react';
import { CATEGORY_CONFIG } from '@/lib/mock-data';
import type { IncidentCategory, ConfidenceLevel, DataSource } from '@/types/vigia';

interface CategoryBadgeProps {
  category: IncidentCategory;
  size?: 'sm' | 'md';
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'sm' }) => {
  const config = CATEGORY_CONFIG[category];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded font-body font-medium ${padding}`}
      style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}
    >
      <span className="text-[10px]">{config.icon}</span>
      {config.label}
    </span>
  );
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  size?: 'sm' | 'md';
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ level, size = 'sm' }) => {
  const configs = {
    high: { label: 'High Confidence', color: '#2DD4BF', bg: 'rgba(45,212,191,0.1)', border: 'rgba(45,212,191,0.25)' },
    medium: { label: 'Medium Confidence', color: '#F5A623', bg: 'rgba(245,166,35,0.1)', border: 'rgba(245,166,35,0.25)' },
    low: { label: 'Low Confidence', color: '#8B95A8', bg: 'rgba(139,149,168,0.1)', border: 'rgba(139,149,168,0.25)' },
  };
  const config = configs[level];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded font-mono-custom ${padding}`}
      style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}
    >
      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      {level.toUpperCase()}
    </span>
  );
};

interface SourceBadgeProps {
  source: DataSource;
  size?: 'sm' | 'md';
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ source, size = 'sm' }) => {
  const configs = {
    official: { label: 'Official', color: '#2DD4BF', bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.2)' },
    community: { label: 'Community', color: '#F5A623', bg: 'rgba(245,166,35,0.08)', border: 'rgba(245,166,35,0.2)' },
    perception: { label: 'Survey', color: '#8B95A8', bg: 'rgba(139,149,168,0.08)', border: 'rgba(139,149,168,0.2)' },
  };
  const config = configs[source];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span
      className={`inline-flex items-center rounded font-body ${padding}`}
      style={{ backgroundColor: config.bg, color: config.color, border: `1px solid ${config.border}` }}
    >
      {config.label}
    </span>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: number;
  mono?: boolean;
  accent?: 'amber' | 'teal' | 'danger';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, delta, mono, accent, className = '' }) => {
  const accentColor = accent === 'amber' ? '#F5A623' : accent === 'teal' ? '#2DD4BF' : accent === 'danger' ? '#E05C6B' : '#E8EAF0';
  return (
    <div className={`glass-card rounded-lg p-5 card-shadow ${className}`}>
      <p className="text-xs font-body uppercase tracking-widest mb-2" style={{ color: '#8B95A8' }}>{label}</p>
      <p
        className={`text-2xl font-display font-bold leading-none ${mono ? 'font-mono-custom' : ''}`}
        style={{ color: accentColor }}
      >
        {value}
      </p>
      {delta !== undefined && (
        <p className={`text-xs mt-1.5 font-body ${delta > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
          {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}% vs last week
        </p>
      )}
    </div>
  );
};
