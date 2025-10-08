import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/everestcare.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Main from './MainPage';
import QuizTraining from './QuizTraining';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* This route catches /home and all sub-routes like /home/odp */}
        <Route path="/home/*" element={<QuizTraining />} />
      </Routes>
    </Router>
  );
}

export default App;