// src/services/LocalHabitRepository.ts
import { Habit, STORAGE_KEYS } from '../types/models';
import { LocalStorageService } from './LocalStorageService';
import { HabitRepository } from './CompletionHistoryRepository';

export class LocalHabitRepository implements HabitRepository {
  private getHabits(): Habit[] {
    return LocalStorageService.get(STORAGE_KEYS.HABITS, []);
  }

  private saveHabits(habits: Habit[]): void {
    LocalStorageService.set(STORAGE_KEYS.HABITS, habits);
  }

  private generateId(): number {
    const habits = this.getHabits();
    return habits.length > 0 ? Math.max(...habits.map(h => h.id || 0)) + 1 : 1;
  }

  async insertHabit(habit: Habit): Promise<void> {
    const habits = this.getHabits();
    const newHabit = { ...habit, id: habit.id || this.generateId() };
    habits.push(newHabit);
    this.saveHabits(habits);
  }

  async insertHabits(newHabits: Habit[]): Promise<void> {
    const habits = this.getHabits();
    let nextId = habits.length > 0 ? Math.max(...habits.map(h => h.id || 0)) + 1 : 1;
    
    const habitsWithIds = newHabits.map(habit => ({
      ...habit,
      id: habit.id || nextId++,
    }));
    
    habits.push(...habitsWithIds);
    this.saveHabits(habits);
  }

  async getHabitById(id: number): Promise<Habit> {
    const habits = this.getHabits();
    const habit = habits.find(h => h.id === id);
    if (!habit) {
      throw new Error(`Habit with id ${id} not found`);
    }
    return habit;
  }

  async getAllOngoingHabits(currentDate: string): Promise<Habit[]> {
    const habits = this.getHabits();
    return habits.filter(habit => {
      const isStarted = habit.startDate <= currentDate;
      const isNotFinished = !habit.endDate || habit.endDate >= currentDate;
      return isStarted && isNotFinished;
    });
  }

  async getAllHabits(): Promise<Habit[]> {
    return this.getHabits();
  }

  async deleteHabit(id: number): Promise<void> {
    const habits = this.getHabits();
    const filtered = habits.filter(h => h.id !== id);
    this.saveHabits(filtered);
    
    // Also remove completions for this habit
    const completionsData = LocalStorageService.get(STORAGE_KEYS.COMPLETIONS, {});
    delete completionsData[id.toString()];
    LocalStorageService.set(STORAGE_KEYS.COMPLETIONS, completionsData);
  }

  async updateHabit(habit: Habit): Promise<void> {
    const habits = this.getHabits();
    const index = habits.findIndex(h => h.id === habit.id);
    if (index >= 0) {
      habits[index] = { ...habit, updatedAt: new Date().toISOString() };
      this.saveHabits(habits);
    } else {
      throw new Error(`Habit with id ${habit.id} not found`);
    }
  }
}