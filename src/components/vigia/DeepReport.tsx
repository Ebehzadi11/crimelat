import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronDown, ChevronUp, MessageSquare, Upload, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MODULES = [
  { id: 1, title: 'Incident Basics', desc: 'Type, date, time, location' },
  { id: 2, title: 'What Was Taken/Damaged', desc: 'Property, valuables, vehicles' },
  { id: 3, title: 'Suspect/Actor Details', desc: 'Description, count, behavior' },
  { id: 4, title: 'Vehicle & Location Context', desc: 'Escape vehicles, route, area' },
  { id: 5, title: 'Payment Rail / Financial', desc: 'Bank, crypto, amount, method' },
  { id: 6, title: 'Witnesses & Third Parties', desc: 'Bystanders, contacts, officials' },
  { id: 7, title: 'Evidence Uploads', desc: 'Photos, video, audio, documents' },
  { id: 8, title: 'Official Filing Readiness', desc: 'Denuncia, denuncia number, agency' },
];

const MODULE_FIELDS: Record<number, { label: string; type: string; placeholder?: string }[]> = {
  1: [
    { label: 'Incident Type', type: 'select', placeholder: 'Select category...' },
    { label: 'Sub-type / Modus Operandi', type: 'text', placeholder: 'e.g. Motorcycle snatch' },
    { label: 'Date of Incident', type: 'date' },
    { label: 'Time of Day', type: 'text', placeholder: 'e.g. 19:30' },
    { label: 'Precise Location', type: 'text', placeholder: 'Street address or landmark' },
    { label: 'Neighborhood', type: 'text', placeholder: 'e.g. El Poblado' },
  ],
  2: [
    { label: 'Items Taken', type: 'text', placeholder: 'e.g. iPhone 14 Pro, wallet' },
    { label: 'Estimated Value (COP)', type: 'text', placeholder: '0' },
    { label: 'Damage Description', type: 'textarea', placeholder: 'Describe any property damage...' },
  ],
  3: [
    { label: 'Number of Suspects', type: 'text', placeholder: '1' },
    { label: 'Physical Description', type: 'textarea', placeholder: 'Height, clothing, distinctive features...' },
    { label: 'Suspect Behavior', type: 'textarea', placeholder: 'How did they approach? What did they say?' },
    { label: 'Armed', type: 'select' },
  ],
  4: [
    { label: 'Escape Vehicle Type', type: 'text', placeholder: 'e.g. Motorcycle, car' },
    { label: 'Vehicle Color', type: 'text', placeholder: 'e.g. Black' },
    { label: 'Partial Plate', type: 'text', placeholder: 'e.g. ABC-123' },
    { label: 'Escape Direction', type: 'text', placeholder: 'e.g. North on Cra 37' },
  ],
  5: [
    { label: 'Bank / Financial Institution', type: 'text', placeholder: 'e.g. Bancolombia' },
    { label: 'Amount Stolen (COP)', type: 'text', placeholder: '0' },
    { label: 'Payment Method', type: 'select' },
    { label: 'Transfer Reference', type: 'text', placeholder: 'Transaction ID if available' },
  ],
  6: [
    { label: 'Number of Witnesses', type: 'text', placeholder: '0' },
    { label: 'Witness Contact (Optional)', type: 'text', placeholder: 'Phone or email' },
    { label: 'Police/Emergency Called?', type: 'select' },
    { label: 'Response Notes', type: 'textarea', placeholder: 'What happened when you called?' },
  ],
  7: [{ label: 'Upload Evidence', type: 'upload' }],
  8: [
    { label: 'Filed Official Denuncia?', type: 'select' },
    { label: 'Denuncia Number', type: 'text', placeholder: 'e.g. 2024-MED-123456' },
    { label: 'Filing Agency', type: 'text', placeholder: 'e.g. Fiscalía, Policía' },
    { label: 'Case Officer Name', type: 'text', placeholder: 'Optional' },
  ],
};

const DeepReport: React.FC = () => {
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1]));
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [chatOpen, setChatOpen] = useState(true);

  const toggleModule = (id: number) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const markComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completionPct = Math.round((completedModules.size / MODULES.length) * 100);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E1117', paddingTop: '56px' }}>
      {/* Top Progress Bar */}
      <div
        className="sticky z-10 px-6 py-3 border-b"
        style={{ top: '56px', backgroundColor: '#141820', borderColor: '#252D3D' }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm font-body hover:opacity-80 transition-opacity"
            style={{ color: '#8B95A8' }}
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-body" style={{ color: '#8B95A8' }}>
                Structured Report — {completedModules.size} of {MODULES.length} modules complete
              </span>
              <span className="text-xs font-mono-custom" style={{ color: '#2DD4BF' }}>{completionPct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: '#252D3D' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${completionPct}%`, background: 'linear-gradient(90deg, #2DD4BF, #F5A623)' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Help Panel */}
        {chatOpen && (
          <div
            className="w-72 shrink-0 border-r h-screen sticky"
            style={{ top: '120px', borderColor: '#252D3D', backgroundColor: '#141820' }}
          >
            <div className="p-5">
              <div className="flex items-center gap-2 mb-5">
                <MessageSquare size={14} style={{ color: '#2DD4BF' }} />
                <p className="text-sm font-display font-semibold" style={{ color: '#E8EAF0' }}>Report Guide</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                  <p className="text-xs font-body font-medium mb-2" style={{ color: '#2DD4BF' }}>💡 Why detailed reports matter</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: '#8B95A8' }}>
                    Structured reports help identify patterns, link related incidents, and provide actionable intelligence for officials and the community.
                  </p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                  <p className="text-xs font-body font-medium mb-2" style={{ color: '#F5A623' }}>🔒 Your privacy</p>
                  <p className="text-xs font-body leading-relaxed" style={{ color: '#8B95A8' }}>
                    All reports are anonymized by default. You control what's shared publicly. Location data is only stored as an approximate area.
                  </p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D' }}>
                  <p className="text-xs font-body font-medium mb-2" style={{ color: '#E8EAF0' }}>📋 Module overview</p>
                  <div className="space-y-1.5">
                    {MODULES.map(m => (
                      <div key={m.id} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: completedModules.has(m.id) ? 'rgba(45,212,191,0.2)' : '#252D3D',
                          }}
                        >
                          {completedModules.has(m.id) && <Check size={9} style={{ color: '#2DD4BF' }} />}
                        </div>
                        <p className="text-xs font-body" style={{ color: completedModules.has(m.id) ? '#2DD4BF' : '#8B95A8' }}>
                          {m.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Form Panel */}
        <div className="flex-1 px-6 py-8 max-w-2xl">
          <div className="mb-6">
            <h1 className="text-3xl font-display font-bold mb-2" style={{ color: '#E8EAF0' }}>Structured Incident Report</h1>
            <p className="text-sm font-body" style={{ color: '#8B95A8' }}>
              Complete as many sections as you can. All information helps build a clearer picture of what happened.
            </p>
          </div>

          <div className="space-y-3">
            {MODULES.map(module => {
              const isExpanded = expandedModules.has(module.id);
              const isComplete = completedModules.has(module.id);
              const fields = MODULE_FIELDS[module.id] || [];

              return (
                <div
                  key={module.id}
                  className="rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    backgroundColor: '#141820',
                    border: isComplete ? '1px solid rgba(45,212,191,0.25)' : '1px solid #252D3D',
                    boxShadow: isExpanded ? '0 4px 20px rgba(0,0,0,0.3)' : undefined,
                  }}
                >
                  {/* Module header */}
                  <button
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono-custom text-sm font-medium"
                      style={{
                        backgroundColor: isComplete ? 'rgba(45,212,191,0.12)' : '#1C2230',
                        color: isComplete ? '#2DD4BF' : '#8B95A8',
                        border: isComplete ? '1px solid rgba(45,212,191,0.2)' : '1px solid #252D3D',
                      }}
                    >
                      {isComplete ? <Check size={14} /> : module.id}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-body font-medium" style={{ color: isComplete ? '#2DD4BF' : '#E8EAF0' }}>
                        {module.title}
                      </p>
                      <p className="text-xs font-body mt-0.5" style={{ color: '#8B95A8' }}>{module.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {isComplete && (
                        <span className="text-xs font-body px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(45,212,191,0.1)', color: '#2DD4BF' }}>
                          Complete
                        </span>
                      )}
                      <div style={{ color: '#8B95A8' }}>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </div>
                    </div>
                  </button>

                  {/* Module fields */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t animate-fade-in-up" style={{ borderColor: '#252D3D' }}>
                      <div className="grid grid-cols-1 gap-4 pt-4">
                        {module.id === 7 ? (
                          <div
                            className="border-2 border-dashed rounded-xl p-8 text-center"
                            style={{ borderColor: '#252D3D' }}
                          >
                            <Upload size={24} className="mx-auto mb-3" style={{ color: '#8B95A8' }} />
                            <p className="text-sm font-body mb-1" style={{ color: '#E8EAF0' }}>Upload evidence files</p>
                            <p className="text-xs font-body mb-4" style={{ color: '#8B95A8' }}>Photos, video, audio, or documents. Max 50MB each.</p>
                            <button
                              className="px-4 py-2 rounded-lg text-sm font-body transition-colors"
                              style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D', color: '#E8EAF0' }}
                            >
                              Choose files
                            </button>
                          </div>
                        ) : (
                          fields.map(field => (
                            <div key={field.label}>
                              <label className="text-xs font-body uppercase tracking-widest mb-2 block" style={{ color: '#8B95A8' }}>
                                {field.label}
                              </label>
                              {field.type === 'textarea' ? (
                                <textarea
                                  placeholder={field.placeholder}
                                  rows={3}
                                  className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none resize-none"
                                  style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D', color: '#E8EAF0' }}
                                />
                              ) : field.type === 'select' ? (
                                <select
                                  className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none"
                                  style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D', color: '#8B95A8' }}
                                >
                                  <option value="">Select...</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                  <option>Unknown</option>
                                </select>
                              ) : (
                                <input
                                  type={field.type}
                                  placeholder={field.placeholder}
                                  className="w-full px-4 py-3 rounded-lg text-sm font-body outline-none"
                                  style={{ backgroundColor: '#1C2230', border: '1px solid #252D3D', color: '#E8EAF0' }}
                                />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                      <div className="flex justify-end mt-5">
                        <button
                          onClick={e => markComplete(module.id, e)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors"
                          style={{
                            backgroundColor: isComplete ? '#1C2230' : 'rgba(45,212,191,0.1)',
                            color: isComplete ? '#8B95A8' : '#2DD4BF',
                            border: isComplete ? '1px solid #252D3D' : '1px solid rgba(45,212,191,0.2)',
                          }}
                        >
                          {isComplete ? 'Mark Incomplete' : (
                            <><Check size={13} /> Mark Complete</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit */}
          <div className="mt-8 flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl text-sm font-body font-medium transition-all active:scale-95"
              style={{ backgroundColor: '#F5A623', color: '#0E1117' }}
            >
              <Shield size={14} className="inline mr-2" />
              Submit Full Report
            </button>
            <button
              className="px-6 py-3 rounded-xl text-sm font-body transition-colors"
              style={{ backgroundColor: '#1C2230', color: '#8B95A8', border: '1px solid #252D3D' }}
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepReport;
