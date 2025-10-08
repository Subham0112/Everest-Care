import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/SideNav';
import MemberApprove from './components/MemberApprove';
import ContentPage from './components/Content';
import Navbar2 from './components/Navbar2';
import HodPage from './components/HodPage';
import TrainingPage from './components/Training';
import QuizPage from './components/Quiz';
import './assets/css/everesthealth.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function QuizTraining() {
  return (
    <>
      {/* Navbar2 - Mobile only */}
      <Navbar2 />
      
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          <Route path="odp" element={<ContentPage />} />
          <Route path="hab" element={<HodPage />} />
          <Route path="member-approval" element={<MemberApprove />} />
          <Route path="training/:type/:option" element={<TrainingPage />} />
          <Route path="quiz/:type/:option" element={<QuizPage />} />
          <Route path="/" element={<Navigate to="odp" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default QuizTraining;