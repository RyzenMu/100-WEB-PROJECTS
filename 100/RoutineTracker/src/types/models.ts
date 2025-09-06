// src/types/models.ts

export interface LocalDateRange {
  start: string; // ISO date string (YYYY-MM-DD)
  endInclusive: string; // ISO date string (YYYY-MM-DD)
}

export interface CompletionRecord {
  date: string; // ISO date string (YYYY-MM-DD)
  numOfTimesCompleted: number;
}

export interface Streak {
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}

export interface BaseHabit {
  id?: number;
  name: string;
  description?: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface YesNoHabit extends BaseHabit {
  type: 'yes_no';
}

// Union type for all habit types (extensible)
export type Habit = YesNoHabit;

export interface HabitWithCompletions extends Habit {
  completions: CompletionRecord[];
  streaks?: Streak[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Local storage keys
export const STORAGE_KEYS = {
  HABITS: 'routine_tracker_habits',
  COMPLETIONS: 'routine_tracker_completions',
  THEME: 'routine_tracker_theme',
} as const;