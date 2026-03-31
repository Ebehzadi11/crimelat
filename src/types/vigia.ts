export type IncidentCategory =
  | 'robbery'
  | 'theft'
  | 'extortion'
  | 'assault'
  | 'fraud'
  | 'vehicle_theft'
  | 'harassment';

export type DataSource = 'official' | 'community' | 'perception';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type VisibilityPreference = 'public' | 'private' | 'draft';

export interface Incident {
  id: string;
  title: string;
  category: IncidentCategory;
  subType?: string;
  location: {
    lat: number;
    lng: number;
    neighborhood: string;
    city: string;
    address?: string;
  };
  timestamp: Date;
  narrative?: string;
  source: DataSource;
  confidence: ConfidenceLevel;
  visibility: VisibilityPreference;
  officiallyReported: boolean;
  evidencePresent: boolean;
  ttpTags?: string[];
  corroborations?: number;
  reportedAt: Date;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  district: string;
  signalConfidence: number;
  incidentsThisMonth: number;
  weekOverWeekChange: number;
  topPattern: string;
  peakHour: string;
}
