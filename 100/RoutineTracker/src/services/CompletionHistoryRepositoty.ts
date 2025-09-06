// src/services/CompletionHistoryRepository.ts
import { Habit, CompletionRecord, LocalDateRange, Streak } from '../types/models';

export interface CompletionHistoryRepository {
  getRecordsInPeriod(habit: Habit, period: LocalDateRange): Promise<CompletionRecord[]>;
  
  getMultiHabitRecords(
    habitsToPeriods: Array<[Habit[], LocalDateRange]>
  ): Promise<Map<number, CompletionRecord[]>>;
  
  getRecordsWithoutStreaks(habit: Habit): Promise<CompletionRecord[]>;
  
  insertCompletion(habitId: number, completionRecord: CompletionRecord): Promise<void>;
  
  insertCompletions(completions: Map<number, CompletionRecord[]>): Promise<void>;
  
  insertCompletionAndCacheStreaks(
    habitId: number,
    completionRecord: CompletionRecord,
    period: LocalDateRange,
    streaks: Streak[]
  ): Promise<void>;
  
  deleteCompletionByDate(habitId: number, date: string): Promise<void>;
}

// src/services/HabitRepository.ts
export interface HabitRepository {
  insertHabit(habit: Habit): Promise<void>;
  insertHabits(habits: Habit[]): Promise<void>;
  getHabitById(id: number): Promise<Habit>;
  getAllOngoingHabits(currentDate: string): Promise<Habit[]>;
  getAllHabits(): Promise<Habit[]>;
  deleteHabit(id: number): Promise<void>;
}

// src/services/LocalStorageService.ts
import { STORAGE_KEYS } from '../types/models';

export class LocalStorageService {
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// src/services/LocalCompletionHistoryRepository.ts
export class LocalCompletionHistoryRepository implements CompletionHistoryRepository {
  private getCompletions(): Map<number, CompletionRecord[]> {
    const data = LocalStorageService.get(STORAGE_KEYS.COMPLETIONS, {});
    const completions = new Map<number, CompletionRecord[]>();
    
    for (const [habitId, records] of Object.entries(data)) {
      completions.set(parseInt(habitId), records as CompletionRecord[]);
    }
    
    return completions;
  }

  private saveCompletions(completions: Map<number, CompletionRecord[]>): void {
    const data: Record<string, CompletionRecord[]> = {};
    for (const [habitId, records] of completions) {
      data[habitId.toString()] = records;
    }
    LocalStorageService.set(STORAGE_KEYS.COMPLETIONS, data);
  }

  async getRecordsInPeriod(habit: Habit, period: LocalDateRange): Promise<CompletionRecord[]> {
    const completions = this.getCompletions();
    const habitCompletions = completions.get(habit.id!) || [];
    
    return habitCompletions.filter(record => 
      record.date >= period.start && record.date <= period.endInclusive
    );
  }

  async getMultiHabitRecords(
    habitsToPeriods: Array<[Habit[], LocalDateRange]>
  ): Promise<Map<number, CompletionRecord[]>> {
    const result = new Map<number, CompletionRecord[]>();
    const completions = this.getCompletions();
    
    for (const [habits, period] of habitsToPeriods) {
      for (const habit of habits) {
        const habitCompletions = completions.get(habit.id!) || [];
        const filtered = habitCompletions.filter(record => 
          record.date >= period.start && record.date <= period.endInclusive
        );
        result.set(habit.id!, filtered);
      }
    }
    
    return result;
  }

  async getRecordsWithoutStreaks(habit: Habit): Promise<CompletionRecord[]> {
    const completions = this.getCompletions();
    return completions.get(habit.id!) || [];
  }

  async insertCompletion(habitId: number, completionRecord: CompletionRecord): Promise<void> {
    const completions = this.getCompletions();
    const habitCompletions = completions.get(habitId) || [];
    
    if (completionRecord.numOfTimesCompleted > 0) {
      // Remove existing record for the date if any
      const filtered = habitCompletions.filter(r => r.date !== completionRecord.date);
      filtered.push(completionRecord);
      completions.set(habitId, filtered);
    } else {
      // Remove completion for this date
      const filtered = habitCompletions.filter(r => r.date !== completionRecord.date);
      completions.set(habitId, filtered);
    }
    
    this.saveCompletions(completions);
  }

  async insertCompletions(newCompletions: Map<number, CompletionRecord[]>): Promise<void> {
    const completions = this.getCompletions();
    
    for (const [habitId, records] of newCompletions) {
      const existing = completions.get(habitId) || [];
      const combined = [...existing];
      
      for (const record of records) {
        const existingIndex = combined.findIndex(r => r.date === record.date);
        if (existingIndex >= 0) {
          combined[existingIndex] = record;
        } else {
          combined.push(record);
        }
      }
      
      completions.set(habitId, combined);
    }
    
    this.saveCompletions(completions);
  }

  async insertCompletionAndCacheStreaks(
    habitId: number,
    completionRecord: CompletionRecord,
    period: LocalDateRange,
    streaks: Streak[]
  ): Promise<void> {
    // For now, just insert the completion (streaks could be cached separately)
    await this.insertCompletion(habitId, completionRecord);
  }

  async deleteCompletionByDate(habitId: number, date: string): Promise<void> {
    const completions = this.getCompletions();
    const habitCompletions = completions.get(habitId) || [];
    const filtered = habitCompletions.filter(r => r.date !== date);
    completions.set(habitId, filtered);
    this.saveCompletions(completions);
  }
}