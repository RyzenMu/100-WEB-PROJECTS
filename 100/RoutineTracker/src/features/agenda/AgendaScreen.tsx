// src/features/agenda/AgendaScreen.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../providers/DataProvider';
import { useTheme } from '../../providers/ThemeProvider';
import { Habit, CompletionRecord } from '../../types/models';
import { HabitCard } from './components/HabitCard';
import { Plus, Sun, Moon } from 'lucide-react';

export const AgendaScreen: React.FC = () => {
  const navigate = useNavigate();
  const { habits, completionRepository, isLoading } = useData();
  const { isDarkMode, toggleTheme } = useTheme();
  const [todayCompletions, setTodayCompletions] = useState<Map<number, CompletionRecord>>(new Map());

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadTodayCompletions = async () => {
      const completions = new Map<number, CompletionRecord>();
      
      for (const habit of habits) {
        try {
          const records = await completionRepository.getRecordsInPeriod(habit, {
            start: today,
            endInclusive: today
          });
          
          if (records.length > 0) {
            completions.set(habit.id!, records[0]);
          }
        } catch (error) {
          console.error('Error loading completions for habit:', habit.id, error);
        }
      }
      
      setTodayCompletions(completions);
    };

    if (habits.length > 0) {
      loadTodayCompletions();
    }
  }, [habits, completionRepository, today]);

  const handleHabitToggle = async (habit: Habit) => {
    const currentCompletion = todayCompletions.get(habit.id!);
    const newCompletionValue = currentCompletion?.numOfTimesCompleted > 0 ? 0 : 1;
    
    const completionRecord: CompletionRecord = {
      date: today,
      numOfTimesCompleted: newCompletionValue,
    };

    try {
      await completionRepository.insertCompletion(habit.id!, completionRecord);
      
      const newCompletions = new Map(todayCompletions);
      if (newCompletionValue > 0) {
        newCompletions.set(habit.id!, completionRecord);
      } else {
        newCompletions.delete(habit.id!);
      }
      setTodayCompletions(newCompletions);
    } catch (error) {
      console.error('Error updating completion:', error);
    }
  };

  const handleRoutineClick = (habitId: number) => {
    navigate(`/routine/${habitId}`);
  };

  const handleAddRoutineClick = () => {
    navigate('/add-routine');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Today's Routines
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              
              <button
                onClick={handleAddRoutineClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Plus className="h-4 w-4" />
                Add Routine
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {habits.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Plus className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No routines yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Get started by adding your first routine
            </p>
            <button
              onClick={handleAddRoutineClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Your First Routine
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={todayCompletions.has(habit.id!) && 
                             todayCompletions.get(habit.id!)!.numOfTimesCompleted > 0}
                onToggle={() => handleHabitToggle(habit)}
                onClick={() => handleRoutineClick(habit.id!)}
              />
            ))}
          </div>
        )}
        
        {/* Stats Summary */}
        {habits.length > 0 && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Today's Progress
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {