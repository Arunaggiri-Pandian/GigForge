import { Project, ProjectStatus, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Arun K',
  role: 'Sr. Data Scientist',
  bravoBalance: 1250
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Recipe Comparison UI',
    description: 'We need a simple React frontend that allows engineers to upload two XML recipe files and highlights the differences in parameters visually. Currently doing this manually via diff checkers which are hard to read.',
    department: 'CMP Team',
    requesterName: 'Sarah Jenkins',
    bravoPoints: 500,
    skills: ['React', 'XML Parsing', 'UI/UX'],
    status: ProjectStatus.OPEN,
    bids: [],
    postedDate: new Date('2023-10-25')
  },
  {
    id: 'p2',
    title: 'Wafer Map Heatmap Script',
    description: 'Python script needed to generate heatmaps from defect coordinate logs. The output should be a PNG overlay on the standard wafer map template.',
    department: 'Metrology',
    requesterName: 'Mike Ross',
    bravoPoints: 300,
    skills: ['Python', 'Matplotlib', 'Pandas'],
    status: ProjectStatus.OPEN,
    bids: [
      {
        id: 'b1',
        userId: 'u99',
        userName: 'John Doe',
        proposedPoints: 300,
        comment: 'I have a similar script from a previous project.',
        timestamp: new Date()
      }
    ],
    postedDate: new Date('2023-10-24')
  },
  {
    id: 'p3',
    title: 'Equipment Log Parser for Yield',
    description: 'Automated parsing of legacy equipment logs to extract error codes and correlate them with yield loss events in the SQL database.',
    department: 'Yield Enhancement',
    requesterName: 'David Kim',
    bravoPoints: 800,
    skills: ['SQL', 'Python', 'ETL'],
    status: ProjectStatus.IN_PROGRESS,
    bids: [],
    postedDate: new Date('2023-10-20')
  },
  {
    id: 'p4',
    title: 'SSD Firmware Regression Analyzer',
    description: 'We have thousands of regression logs generated nightly. Need a tool to parse these text logs and classify failures as "Infrastructure Issue", "Known Bug", or "New Regression" using basic pattern matching.',
    department: 'SSD Firmware',
    requesterName: 'Priya Patel',
    bravoPoints: 600,
    skills: ['Python', 'RegEx', 'Jenkins'],
    status: ProjectStatus.OPEN,
    bids: [],
    postedDate: new Date('2023-10-26')
  },
  {
    id: 'p5',
    title: 'Spare Parts Inventory Dashboard',
    description: 'A PowerBI or simple web dashboard to visualize consumption rates of critical O-rings and valves for Fab 10 tools to prevent unexpected stockouts.',
    department: 'Supply Chain',
    requesterName: 'Marcus Johnson',
    bravoPoints: 450,
    skills: ['PowerBI', 'SQL', 'Data Viz'],
    status: ProjectStatus.OPEN,
    bids: [],
    postedDate: new Date('2023-10-25')
  },
  {
    id: 'p6',
    title: 'RMA Failure Analysis Tracker',
    description: 'Digitize the manual Excel tracking sheet used by FA lab technicians for customer returned units. Needs a simple form entry and status update view.',
    department: 'Global Quality',
    requesterName: 'Lisa Wong',
    bravoPoints: 700,
    skills: ['React', 'Node.js', 'Forms'],
    status: ProjectStatus.OPEN,
    bids: [],
    postedDate: new Date('2023-10-23')
  },
  {
    id: 'p7',
    title: 'Chiller Power Anomaly Detection',
    description: 'We have CSV dumps of chiller power usage. Need a script to detect spikes that correlate with ambient temperature changes outside of expected operating ranges.',
    department: 'Facilities',
    requesterName: 'Tom Baker',
    bravoPoints: 400,
    skills: ['Python', 'Scikit-learn', 'Time-series'],
    status: ProjectStatus.OPEN,
    bids: [
      {
        id: 'b2',
        userId: 'u88',
        userName: 'Elena Rodriguez',
        proposedPoints: 400,
        comment: 'I did something similar for the HVAC team last year.',
        timestamp: new Date('2023-10-24')
      }
    ],
    postedDate: new Date('2023-10-22')
  },
  {
    id: 'p8',
    title: 'Wafer Sort Bin Map Overlay',
    description: 'Tool to overlay sort bin maps from different test insertion steps (Probe 1 vs Probe 2) to find common failing die locations visually.',
    department: 'DRAM Product Engineering',
    requesterName: 'Karthik S',
    bravoPoints: 550,
    skills: ['Python', 'Image Processing', 'Data Analysis'],
    status: ProjectStatus.OPEN,
    bids: [],
    postedDate: new Date('2023-10-26')
  }
];

export const DEPARTMENTS = [
  'CMP Team',
  'Wet Process',
  'Metrology',
  'Yield Enhancement',
  'Photolithography',
  'IT Support',
  'SSD Firmware',
  'Supply Chain',
  'Global Quality',
  'Facilities',
  'DRAM Product Engineering'
];