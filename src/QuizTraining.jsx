import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/SideNav';
import MemberApprove from './components/MemberApprove';
import Form from './components/pages/Formpage';
import FormPreview from './components/forms/formPreview';
import MemberList from './components/MemberList';
import ContentPage from './components/Content';
import Navbar2 from './components/Navbar2';
import HodPage from './components/HodPage';
import TrainingPage from './components/Training';
import QuizPage from './components/Quiz';
import { AdminRoute } from './components/Auth/ProtectedRoutes';
import './assets/css/everesthealth.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function QuizTraining({handleAlert}) {
  const UserData= JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <>
      {/* Navbar2 - Mobile only */}
      <Navbar2 />
      
      {/* Sidebar - Always visible on desktop, toggleable on mobile */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          <Route path="odp" element={<ContentPage user={UserData} />} />
          <Route path="hab" element={<HodPage user={UserData} />} />
                <Route 
            path="member-approval" 
            element={
              <AdminRoute>
                <MemberApprove />
              </AdminRoute>
            } 
          />
          <Route 
            path="member-list" 
            element={
              <AdminRoute>
                <MemberList />
              </AdminRoute>
            } 
          />
          <Route path="form/:formType" element={<Form />} />
          <Route path="training/:type/:option" element={<TrainingPage />} />
          <Route path="quiz/:type/:option" element={<QuizPage handleAlert={handleAlert} user={UserData} />} />
          <Route path="/" element={<Navigate to="odp" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default QuizTraining;