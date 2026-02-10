import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/everestcare.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import PreviewForm from "./components/forms/formPreview";
import MissedEvv from './components/forms/MissedEvv';
import Policy from './components/Policy';
// import Form from "./components/pages/Formpage"
import Main from './MainPage';
import QuizTraining from './QuizTraining';
import { useState } from 'react';
import { ProtectedRoute } from './components/Auth/ProtectedRoutes';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
 
  
  
  const handleAlert = (message, type) => {
    setAlert({
      message,
      type
    })
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }





  return (
    <Router>
       <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/policy" element={<Policy />} />
        {/* <Route path="/form/:formType" element={<Form />} />
        <Route path="/preview/:formType" element={<PreviewForm />} /> */}

       
        <Route path="/login" element={<LoginPage handleAlert={handleAlert} />} />
        <Route path="/signup" element={<SignupPage handleAlert={handleAlert} />} />
    <Route path="/preview/:formType" element={<PreviewForm />} />
    <Route path="/miss-evv" element={<MissedEvv />} />
        <Route path="/forgot-password" element={<ForgetPassword handleAlert={handleAlert} />} />
        <Route path="/reset-password" element={<ResetPassword handleAlert={handleAlert} />} />
        
        {/* This route catches /home and all sub-routes like /home/odp */}
         <Route 
          path="/home/*" 
          element={
            <ProtectedRoute>
              <QuizTraining handleAlert={handleAlert} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;