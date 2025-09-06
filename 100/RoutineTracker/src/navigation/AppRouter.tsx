// src/navigation/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AgendaScreen } from '../features/agenda/AgendaScreen';
import { AddRoutineScreen } from '../features/add-edit-routine/AddRoutineScreen';
import { RoutineDetailsScreen } from '../features/routine-details/RoutineDetailsScreen';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          {/* Default route redirects to agenda */}
          <Route path="/" element={<Navigate to="/agenda" replace />} />
          
          {/* Main agenda/dashboard screen */}
          <Route path="/agenda" element={<AgendaScreen />} />
          
          {/* Add/Edit routine screen */}
          <Route path="/add-routine" element={<AddRoutineScreen />} />
          <Route path="/edit-routine/:id" element={<AddRoutineScreen />} />
          
          {/* Routine details screen */}
          <Route path="/routine/:id" element={<RoutineDetailsScreen />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/agenda" replace />} />
        </Routes>
      </div>
    </Router>
  );
};