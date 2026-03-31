import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopNav from "./components/vigia/TopNav";
import MapHero from "./components/vigia/MapHero";
import MapExplorer from "./components/vigia/MapExplorer";
import NeighborhoodsIndex from "./components/vigia/NeighborhoodsIndex";
import NeighborhoodPage from "./components/vigia/NeighborhoodPage";
import IncidentDetail from "./components/vigia/IncidentDetail";
import TrendsDashboard from "./components/vigia/TrendsDashboard";
import QuickAddIncident from "./components/vigia/QuickAddIncident";
import DeepReport from "./components/vigia/DeepReport";
import UserProfile from "./components/vigia/UserProfile";

function App() {
  const [addIncidentOpen, setAddIncidentOpen] = useState(false);
  const [deepReportOpen, setDeepReportOpen] = useState(false);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0E1117' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#F5A623', borderTopColor: 'transparent' }} />
          <p className="text-sm font-body" style={{ color: '#8B95A8' }}>Loading Vigía...</p>
        </div>
      </div>
    }>
      <div className="min-h-screen" style={{ backgroundColor: '#0E1117' }}>
        <TopNav onAddIncident={() => setAddIncidentOpen(true)} />

        <Routes>
          <Route path="/" element={<MapHero />} />
          <Route path="/map" element={<MapExplorer />} />
          <Route path="/neighborhoods" element={<NeighborhoodsIndex />} />
          <Route path="/neighborhoods/:id" element={<NeighborhoodPage />} />
          <Route path="/incident/:id" element={<IncidentDetail />} />
          <Route path="/trends" element={<TrendsDashboard />} />
          <Route path="/report" element={
            <div style={{ paddingTop: '56px', minHeight: '100vh', backgroundColor: '#0E1117' }}>
              <QuickAddIncident
                open={true}
                onClose={() => window.history.back()}
                onDeepReport={() => { window.history.back(); setDeepReportOpen(true); }}
              />
            </div>
          } />
          <Route path="/deep-report" element={<DeepReport />} />
          <Route path="/my-reports" element={<UserProfile />} />
        </Routes>

        {/* Global Quick Add Modal */}
        <QuickAddIncident
          open={addIncidentOpen}
          onClose={() => setAddIncidentOpen(false)}
          onDeepReport={() => { setAddIncidentOpen(false); setDeepReportOpen(true); }}
        />

        {/* Global Deep Report (opened from modal CTA) */}
        {deepReportOpen && (
          <div className="fixed inset-0 z-50" style={{ backgroundColor: '#0E1117' }}>
            <DeepReport />
            <button
              onClick={() => setDeepReportOpen(false)}
              className="fixed top-4 right-4 z-[60] w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: '#252D3D' }}
            >
              ×
            </button>
          </div>
        )}

        {/* Mobile FAB */}
        <button
          onClick={() => setAddIncidentOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl transition-transform active:scale-95"
          style={{ backgroundColor: '#F5A623', color: '#0E1117', boxShadow: '0 0 20px rgba(245,166,35,0.4)' }}
        >
          +
        </button>
      </div>
    </Suspense>
  );
}

export default App;
