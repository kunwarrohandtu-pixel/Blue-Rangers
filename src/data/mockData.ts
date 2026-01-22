export type MarkerStatus = 'healthy' | 'warning' | 'critical';

export interface MapMarker {
  id: string;
  x: number;
  y: number;
  status: MarkerStatus;
  siteName: string;
  location: string;
}

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  siteName: string;
  siteCode: string;
  message: string;
  timestamp: string;
  biomarkers?: {
    name: string;
    level: 'high' | 'elevated' | 'normal' | 'declining';
  }[];
}

export interface RangerLog {
  id: string;
  rangerName: string;
  rangerInitials: string;
  avatarColor: string;
  site: string;
  siteCode: string;
  timestamp: string;
  action: string;
  status: MarkerStatus;
  coordinates: { x: number; y: number };
}

export interface ChartDataPoint {
  day: number;
  temperature: number;
  hasEvent?: boolean;
}

export const mapMarkers: MapMarker[] = [
  { id: '1', x: 12, y: 18, status: 'healthy', siteName: 'North Andaman', location: 'Diglipur Point' },
  { id: '2', x: 15, y: 32, status: 'healthy', siteName: 'Interview Island', location: 'West Shore' },
  { id: '3', x: 10, y: 48, status: 'healthy', siteName: 'Mayabunder', location: 'Karmatang Beach' },
  { id: '4', x: 18, y: 55, status: 'warning', siteName: 'Rangat Bay', location: 'Amkunj Beach' },
  { id: '5', x: 25, y: 62, status: 'healthy', siteName: 'Baratang', location: 'Mud Volcano Point' },
  { id: '6', x: 35, y: 45, status: 'healthy', siteName: 'Middle Andaman', location: 'Strait Island' },
  { id: '7', x: 42, y: 52, status: 'warning', siteName: 'Long Island', location: 'Lalaji Bay' },
  { id: '8', x: 48, y: 58, status: 'healthy', siteName: 'Neil Island', location: 'Bharatpur Beach' },
  { id: '9', x: 55, y: 65, status: 'healthy', siteName: 'Havelock South', location: 'Radhanagar Beach' },
  { id: '10', x: 62, y: 55, status: 'critical', siteName: 'Havelock North', location: 'Elephant Beach' },
  { id: '11', x: 70, y: 20, status: 'critical', siteName: 'Smith Island', location: 'Coral Reef Zone' },
  { id: '12', x: 75, y: 35, status: 'healthy', siteName: 'Ross Island', location: 'Historic Point' },
  { id: '13', x: 80, y: 50, status: 'warning', siteName: 'Port Blair', location: 'Corbyn Cove' },
  { id: '14', x: 72, y: 70, status: 'critical', siteName: 'Rutland Island', location: 'South Bay' },
  { id: '15', x: 60, y: 80, status: 'healthy', siteName: 'Cinque Island', location: 'Passage Rock' },
];

export const alerts: Alert[] = [
  {
    id: '1',
    severity: 'critical',
    siteName: 'Site HVL-04',
    siteCode: 'Havelock North',
    message: 'High HSP70 Detected',
    timestamp: '10 min ago',
    biomarkers: [
      { name: 'HSP70', level: 'high' },
      { name: 'MnSOD', level: 'elevated' },
      { name: 'Symbiodiniaceae', level: 'declining' },
    ],
  },
  {
    id: '2',
    severity: 'warning',
    siteName: 'Site NBY-12',
    siteCode: 'Neil Bay',
    message: 'Elevated MnSOD',
    timestamp: '1 hour ago',
    biomarkers: [
      { name: 'MnSOD', level: 'elevated' },
      { name: 'HSP70', level: 'normal' },
    ],
  },
  {
    id: '3',
    severity: 'critical',
    siteName: 'Site SMI-01',
    siteCode: 'Smith Island',
    message: 'Coral bleaching detected',
    timestamp: '25 min ago',
  },
  {
    id: '4',
    severity: 'warning',
    siteName: 'Site RNG-08',
    siteCode: 'Rangat Bay',
    message: 'Temperature anomaly',
    timestamp: '2 hours ago',
  },
  {
    id: '5',
    severity: 'info',
    siteName: 'Site CIN-03',
    siteCode: 'Cinque Island',
    message: 'Routine check complete',
    timestamp: '3 hours ago',
  },
];

export const rangerLogs: RangerLog[] = [
  {
    id: '1',
    rangerName: 'Ranger Singh',
    rangerInitials: 'RS',
    avatarColor: '#64ffda',
    site: 'Havelock B-12',
    siteCode: 'HVL-12',
    timestamp: '2 hours ago',
    action: 'Water sample collected',
    status: 'healthy',
    coordinates: { x: 55, y: 65 },
  },
  {
    id: '2',
    rangerName: 'Ranger Patel',
    rangerInitials: 'RP',
    avatarColor: '#ffd700',
    site: 'Neil Island N-05',
    siteCode: 'NBY-05',
    timestamp: '3 hours ago',
    action: 'Visual inspection completed',
    status: 'warning',
    coordinates: { x: 48, y: 58 },
  },
  {
    id: '3',
    rangerName: 'Ranger Sharma',
    rangerInitials: 'AS',
    avatarColor: '#ff3366',
    site: 'Smith Island S-01',
    siteCode: 'SMI-01',
    timestamp: '4 hours ago',
    action: 'Emergency protocol deployed',
    status: 'critical',
    coordinates: { x: 70, y: 20 },
  },
  {
    id: '4',
    rangerName: 'Ranger Kumar',
    rangerInitials: 'VK',
    avatarColor: '#00ff88',
    site: 'Diglipur D-02',
    siteCode: 'DIG-02',
    timestamp: '5 hours ago',
    action: 'Shade structure installed',
    status: 'healthy',
    coordinates: { x: 12, y: 18 },
  },
  {
    id: '5',
    rangerName: 'Ranger Reddy',
    rangerInitials: 'SR',
    avatarColor: '#64ffda',
    site: 'Baratang B-03',
    siteCode: 'BAR-03',
    timestamp: '6 hours ago',
    action: 'Biomarker samples sent to lab',
    status: 'healthy',
    coordinates: { x: 25, y: 62 },
  },
];

export const temperatureData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  temperature: 29 + Math.sin(i / 5) * 1.5 + Math.random() * 0.5,
  hasEvent: [8, 15, 22, 28].includes(i + 1),
}));

export const healthDistribution = [
  { name: 'Healthy Reefs', value: 60, color: 'hsl(150, 100%, 50%)' },
  { name: 'Moderate Stress', value: 25, color: 'hsl(45, 100%, 50%)' },
  { name: 'Critical Stress', value: 15, color: 'hsl(344, 100%, 60%)' },
];

export const activityData = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  checkIns: Math.floor(Math.random() * 12) + 3,
}));

export const stressPredictionData = [
  { day: 1, stress: 20, prediction: 22 },
  { day: 2, stress: 25, prediction: 28 },
  { day: 3, stress: 30, prediction: 35 },
  { day: 4, stress: 28, prediction: 40 },
  { day: 5, stress: 35, prediction: 50 },
  { day: 6, stress: 45, prediction: 60 },
  { day: 7, stress: 55, prediction: 70 },
];

export const tickerMessages = [
  "Ranger Singh uploaded data from Site B-12",
  "Temperature spike detected at Neil Island",
  "Shade protocol deployed at Havelock-04",
  "Lab results received for Smith Island samples",
  "New coral bleaching alert issued for Rutland Island",
  "Weekly report generated for Andaman Sector",
];
