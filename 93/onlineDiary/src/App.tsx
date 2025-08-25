import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, X, Check } from 'lucide-react';

// Types
interface Task {
  id: string;
  text: string;
  createdOn: string;
}

// Local Storage Helper
const TaskStorage = {
  saveAllTasks: (tasks: Task[]): void => {
    localStorage.setItem('diary_tasks', JSON.stringify(tasks));
  },
  
  getAllTasks: (): Task[] => {
    const stored = localStorage.getItem('diary_tasks');
    return stored ? JSON.parse(stored) : [];
  }
};

// Date utilities
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month];
};

const getDayNames = (): string[] => {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
};

// Monthly Calendar Component
const MonthlyCalendar: React.FC<{ onDateSelect: (date: string) => void }> = ({ onDateSelect }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const todayString = formatDate(today);
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0
  
  const generateCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }
  
  return (
    <div className="pt-12 px-4 pb-4 max-w-md mx-auto">
      {/* Month Title */}
      <h1 className="text-2xl font-bold mb-4">
        {getMonthName(currentMonth)} {currentYear}
      </h1>
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {getDayNames().map((day) => (
          <div key={day} className="text-center font-semibold text-sm py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="space-y-0">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day, dayIndex) => {
              if (day === null) {
                return <div key={dayIndex} className="aspect-square p-1"></div>;
              }
              
              const date = new Date(currentYear, currentMonth, day);
              const dateString = formatDate(date);
              const isToday = dateString === todayString;
              
              return (
                <div key={dayIndex} className="aspect-square p-1">
                  <button
                    onClick={() => onDateSelect(dateString)}
                    className="w-full h-full flex items-center justify-center rounded-lg bg-transparent hover:bg-gray-100 transition-colors"
                  >
                    <span className={`text-base ${isToday ? 'font-bold' : 'font-normal'}`}>
                      {day}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// Task Details Screen Component
const TaskDetailsScreen: React.FC<{ 
  date: string; 
  onBack: () => void;
}> = ({ date, onBack }) => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  
  const selectedDate = parseDate(date);
  const displayDate = `${selectedDate.getDate()} ${getMonthName(selectedDate.getMonth())}`;
  
  // Load tasks on mount and when date changes
  useEffect(() => {
    const loadedTasks = TaskStorage.getAllTasks();
    setAllTasks(loadedTasks);
    
    // Filter tasks for the selected date and earlier
    const filteredTasks = loadedTasks.filter(task => {
      const taskDate = parseDate(task.createdOn);
      return taskDate <= selectedDate;
    });
    setTasks(filteredTasks);
  }, [date, selectedDate]);
  
  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        createdOn: date
      };
      
      const updatedAllTasks = [...allTasks, newTask];
      setAllTasks(updatedAllTasks);
      setTasks([...tasks, newTask]);
      TaskStorage.saveAllTasks(updatedAllTasks);
      
      setNewTaskText('');
      setShowAddDialog(false);
    }
  };
  
  const handleCompleteTask = (taskId: string) => {
    const updatedAllTasks = allTasks.filter(task => task.id !== taskId);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    setAllTasks(updatedAllTasks);
    setTasks(updatedTasks);
    TaskStorage.saveAllTasks(updatedAllTasks);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold">Tasks for {displayDate}</h1>
        </div>
        
        {/* Tasks List */}
        <div className="space-y-3 mb-20">
          {tasks.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500 text-lg">No tasks yet</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-100 rounded-lg p-3"
              >
                <span className="text-lg flex-1 mr-3">{task.text}</span>
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Complete
                </button>
              </div>
            ))
          )}
        </div>
        
        {/* Back Button */}
        <div className="text-center mb-4">
          <button
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Back to Calendar
          </button>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <button
        onClick={() => setShowAddDialog(true)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-colors"
      >
        <Plus size={24} />
      </button>
      
      {/* Add Task Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-sm">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Add Task</h2>
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Task"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewTaskText('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const DiaryApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'calendar' | 'details'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setCurrentScreen('details');
  };
  
  const handleBackToCalendar = () => {
    setCurrentScreen('calendar');
    setSelectedDate('');
  };
  
  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'calendar' ? (
        <MonthlyCalendar onDateSelect={handleDateSelect} />
      ) : (
        <TaskDetailsScreen 
          date={selectedDate} 
          onBack={handleBackToCalendar}
        />
      )}
    </div>
  );
};

export default DiaryApp;