import React, { useState } from 'react';
import { X, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { CATEGORY_CONFIG } from '@/lib/mock-data';
import type { IncidentCategory, VisibilityPreference } from '@/types/vigia';

interface QuickAddIncidentProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onDeepReport?: () => void;
}

const CATEGORIES: { key: IncidentCategory; emoji: string; label: string; desc: string }[] = [
  { key: 'robbery', emoji: '🔴', label: 'Robbery', desc: 'Armed or forced theft of property' },
  { key: 'theft', emoji: '🟠', label: 'Theft', desc: 'Phone snatch, pickpocket, bag grab' },
  { key: 'extortion', emoji: '🟣', label: 'Extortion', desc: 'Threats, vacuna, coercion' },
  { key: 'assault', emoji: '🔴', label: 'Assault', desc: 'Physical attack or violence' },
  { key: 'fraud', emoji: '🔵', label: 'Fraud', desc: 'Scam, fake investment, digital fraud' },
  { key: 'vehicle_theft', emoji: '🟡', label: 'Vehicle Theft', desc: 'Car, motorcycle, or bike theft' },
  { key: 'harassment', emoji: '🟦', label: 'Harassment', desc: 'Verbal, sexual, or stalking' },
];

const TIME_OF_DAY = [
  { key: 'morning', label: 'Morning', desc: '6am – 12pm' },
  { key: 'afternoon', label: 'Afternoon', desc: '12pm – 6pm' },
  { key: 'evening', label: 'Evening', desc: '6pm – 10pm' },
  { key: 'night', label: 'Night', desc: '10pm – 6am' },
];

const VISIBILITY_OPTIONS: { key: VisibilityPreference; label: string; desc: string; icon: string }[] = [
  { key: 'public', label: 'Public Anonymous', desc: 'Visible to all users. Your identity is hidden.', icon: '🌐' },
  { key: 'private', label: 'Private', desc: 'Only visible to you and verified officials.', icon: '🔒' },
  { key: 'draft', label: 'Save as Draft', desc: 'Saved to your account. Complete later.', icon: '📝' },
];

const QuickAddIncident: React.FC<QuickAddIncidentProps> = ({ open, onClose, onSuccess, onDeepReport }) => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<IncidentCategory | null>(null);
  const [neighborhood, setNeighborhood] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [narrative, setNarrative] = useState('');
  const [visibility, setVisibility] = useState<VisibilityPreference | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleSubmit = () => {
    setSubmitted(true);
    setStep(6);
  };
  const handleClose = () => {
    setStep(1);
    setCategory(null);
    setNeighborhood('');
    setTimeOfDay('');
    setNarrative('');
    setVisibility(null);
    setSubmitted(false);
    onClose();
  };

  const canProceed = () => {
    if (step === 1) return category !== null;
    if (step === 2) return neighborhood.length > 0;
    if (step === 3) return timeOfDay !== '';
    if (step === 5) return visibility !== null;
    return true;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(14,17,23,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden animate-fade-in-up"
        style={{ backgroundColor: '#141820', border: '1px solid #252D3D', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#252D3D' }}>
          <div>
            <h2 className="text-lg font-display font-bold" style={{ color: '#E8EAF0' }}>Report Incident</h2>
            {step < 6 && (
              <p className="text-xs font-body mt-0.5" style={{ color: '#8B95A8' }}>Step {step} of 5</p>
            )}
          </div>
          <button onClick={handleClose} className="hover:opacity-70 transition-opacity" style={{ color: '#8B95A8' }}>
            <X size={18} />
          </button>
        </div>

        {/* Progress dots */}
        {step < 6 && (
          <div className="flex items-center justify-center gap-2 py-3 border-b" style={{ borderColor: '#252D3D' }}>
            {[1, 2, 3, 4, 5].map(s => (
              <div
                key={s}
                className="rounded-full transition-all duration-300"
                style={{
                  width: s === step ? '20px' : '6px',
                  height: '6px',
                  backgroundColor: s < step ? '#2DD4BF' : s === step ? '#F5A623' : '#252D3D',
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6" style={{ minHeight: '320px' }}>

          {/* Step 1: Category */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#E8EAF0' }}>What happened?</h3>
              <p className="text-sm font-body mb-5" style={{ color: '#8B95A8' }}>Select the incident category that best describes what you experienced.</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setCategory(cat.key)}
                    className="flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 hover:bg-white/5"
                    style={{
                      backgroundColor: category === cat.key ? CATEGORY_CONFIG[cat.key].bg : '#1C2230',
                      border: category === cat.key ? `1px solid ${CATEGORY_CONFIG[cat.key].border}` : '1px solid #252D3D',
                    }}
                  >
                    <span className="text-xl">{cat.emoji}</span>
                    <div>
                      <p className="text-sm font-body font-medium" style={{ color: category === cat.key ? CATEGORY_CONFIG[cat.key].color : '#E8EAF0' }}>
                        {cat.label}
                      </p>
                      <p className="text-xs font-body leading-tight mt-0.5" style={{ color: '#8B95A8' }}>{cat.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#E8EAF0' }}>Where did this happen?</h3>
              <p className="text-sm font-body mb-5" style={{ color: '#8B95A8' }}>Drop a pin or select a neighborhood. Your exact location is never stored.</p>
              <div
                className="w-full h-40 rounded-xl mb-4 map-bg map-grid flex items-center justify-center cursor-pointer relative overflow-hidden"
                style={{ border: '1px solid #252D3D' }}
              >
                <div className="flex flex-col items-center gap-2" style={{ color: '#8B95A8' }}>
                  <MapPin size={24} style={{ color: '#F5A623' }} />
                  <p className="text-sm font-body">Click to drop pin</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-body uppercase tracking-widest mb-2 block" style={{ color: '#8B95A8' }}>Neighborhood</label>
                <input
                  value={neighborhood}
                  onChange={e => setNeighborhood(e.target.value)}
                  placeholder="e.g. El Poblado, Medellín"
                  className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none transition-colors"
                  style={{
                    backgroundColor: '#1C2230',
                    border: `1px solid ${neighborhood ? '#2DD4BF' : '#252D3D'}`,
                    color: '#E8EAF0',
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 3: When */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#E8EAF0' }}>When did this happen?</h3>
              <p className="text-sm font-body mb-5" style={{ color: '#8B95A8' }}>Select the approximate date and time of day.</p>
              <div className="mb-5">
                <label className="text-xs font-body uppercase tracking-widest mb-2 block" style={{ color: '#8B95A8' }}>Date</label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none"
                  style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D', color: '#E8EAF0' }}
                />
              </div>
              <div>
                <label className="text-xs font-body uppercase tracking-widest mb-3 block" style={{ color: '#8B95A8' }}>Time of Day</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_OF_DAY.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setTimeOfDay(t.key)}
                      className="p-3 rounded-xl text-left transition-all duration-200"
                      style={{
                        backgroundColor: timeOfDay === t.key ? 'rgba(245,166,35,0.1)' : '#1C2230',
                        border: timeOfDay === t.key ? '1px solid rgba(245,166,35,0.3)' : '1px solid #252D3D',
                      }}
                    >
                      <p className="text-sm font-body font-medium" style={{ color: timeOfDay === t.key ? '#F5A623' : '#E8EAF0' }}>{t.label}</p>
                      <p className="text-xs font-body" style={{ color: '#8B95A8' }}>{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Narrative */}
          {step === 4 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#E8EAF0' }}>What happened?</h3>
              <p className="text-sm font-body mb-5" style={{ color: '#8B95A8' }}>Describe what happened in your own words. Include details that might help others stay safe.</p>
              <textarea
                value={narrative}
                onChange={e => setNarrative(e.target.value)}
                placeholder="Describe the incident... (e.g. Two people on a motorcycle snatched my phone while I was walking near the intersection of...)"
                rows={7}
                className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none resize-none"
                style={{
                  backgroundColor: '#1C2230',
                  border: `1px solid ${narrative.length > 10 ? '#2DD4BF' : '#252D3D'}`,
                  color: '#E8EAF0',
                  lineHeight: '1.6',
                }}
              />
              <p className="text-xs font-body mt-2 text-right" style={{ color: '#4A5568' }}>{narrative.length} characters</p>
            </div>
          )}

          {/* Step 5: Visibility */}
          {step === 5 && (
            <div className="animate-fade-in-up">
              <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#E8EAF0' }}>Visibility preference</h3>
              <p className="text-sm font-body mb-5" style={{ color: '#8B95A8' }}>How would you like this report to be shared?</p>
              <div className="space-y-3">
                {VISIBILITY_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setVisibility(opt.key)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200"
                    style={{
                      backgroundColor: visibility === opt.key ? 'rgba(45,212,191,0.08)' : '#1C2230',
                      border: visibility === opt.key ? '1px solid rgba(45,212,191,0.3)' : '1px solid #252D3D',
                    }}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-body font-medium" style={{ color: visibility === opt.key ? '#2DD4BF' : '#E8EAF0' }}>{opt.label}</p>
                      <p className="text-xs font-body mt-0.5" style={{ color: '#8B95A8' }}>{opt.desc}</p>
                    </div>
                    {visibility === opt.key && <Check size={16} style={{ color: '#2DD4BF' }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <div className="animate-fade-in-up flex flex-col items-center text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(45,212,191,0.12)', border: '2px solid rgba(45,212,191,0.3)' }}
              >
                <Check size={28} style={{ color: '#2DD4BF' }} />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2" style={{ color: '#E8EAF0' }}>Report Submitted</h3>
              <p className="text-sm font-body mb-6" style={{ color: '#8B95A8' }}>
                Thank you. Your report has been anonymously submitted and will help keep the community safer.
              </p>
              <div className="w-full space-y-3">
                {onDeepReport && (
                  <button
                    onClick={onDeepReport}
                    className="w-full py-3 rounded-xl text-sm font-body font-medium transition-colors"
                    style={{ backgroundColor: '#F5A623', color: '#0E1117' }}
                  >
                    Add More Detail (Structured Report)
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-xl text-sm font-body font-medium transition-colors"
                  style={{ backgroundColor: '#1C2230', color: '#E8EAF0', border: '1px solid #252D3D' }}
                >
                  Back to Map
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 6 && (
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#252D3D' }}>
            <button
              onClick={step === 1 ? handleClose : handleBack}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body transition-colors hover:bg-white/5"
              style={{ color: '#8B95A8' }}
            >
              <ChevronLeft size={14} />
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={step === 5 ? handleSubmit : handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 px-6 py-2 rounded-lg text-sm font-body font-medium transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: canProceed() ? '#F5A623' : '#252D3D',
                color: canProceed() ? '#0E1117' : '#4A5568',
              }}
            >
              {step === 5 ? 'Submit Report' : 'Continue'}
              {step < 5 && <ChevronRight size={14} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickAddIncident;
