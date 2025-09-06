// src/providers/ThemeProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  isDarkMode,
  setIsDarkMode,
}) => {
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// src/providers/DataProvider.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Habit, CompletionRecord, STORAGE_KEYS } from '../types/models';
import { LocalStorageService } from '../services/LocalStorageService';
import { LocalCompletionHistoryRepository } from '../services/LocalCompletionHistoryRepository';
import { LocalHabitRepository } from '../services/LocalHabitRepository';

interface DataContextType {
  habits: Habit[];
  completions: Map<number, CompletionRecord[]>;
  habitRepository: LocalHabitRepository;
  completionRepository: LocalCompletionHistoryRepository;
  refreshHabits: () => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<Map<number, CompletionRecord[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  const habitRepository = new LocalHabitRepository();
  const completionRepository = new LocalCompletionHistoryRepository();

  const refreshHabits = async () => {
    setIsLoading(true);
    try {
      const allHabits = await habitRepository.getAllHabits();
      setHabits(allHabits);
      
      // Load completions for all habits
      const completionsData = LocalStorageService.get(STORAGE_KEYS.COMPLETIONS, {});
      const completionsMap = new Map<number, CompletionRecord[]>();
      
      for (const [habitId, records] of Object.entries(completionsData)) {
        completionsMap.set(parseInt(habitId), records as CompletionRecord[]);
      }
      
      setCompletions(completionsMap);
    } catch (error) {
      console.error('Error refreshing habits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize with sample data if none exists
    const initializeData = async () => {
      const existingHabits = await habitRepository.getAllHabits();
      if (existingHabits.length === 0) {
        // Create sample habits
        const sampleHabits: Habit[] = [
          {
            id: 1,
            name: 'Morning Exercise',
            description: '30 minutes of exercise',
            type: 'yes_no',
            startDate: '2024-01-01',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Read Books',
            description: 'Read for at least 20 minutes',
            type: 'yes_no',
            startDate: '2024-01-01',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 3,
            name: 'Drink Water',
            description: '8 glasses of water per day',
            type: 'yes_no',
            startDate: '2024-01-01',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
        
        await habitRepository.insertHabits(sampleHabits);
      }
      await refreshHabits();
    };

    initializeData();
  }, []);

  return (
    <DataContext.Provider value={{
      habits,
      completions,
      habitRepository,
      completionRepository,
      refreshHabits,
      isLoading,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};