export enum ProjectStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}

export interface Bid {
  id: string;
  userId: string;
  userName: string;
  proposedPoints: number;
  comment: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  department: string; // e.g., "CMP Team", "Wet Process"
  requesterName: string;
  bravoPoints: number;
  skills: string[];
  status: ProjectStatus;
  bids: Bid[];
  postedDate: Date;
}

export interface User {
  id: string;
  name: string;
  role: string;
  bravoBalance: number;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  reason: string;
  similarProjectIds: string[];
}