import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/everestcare.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PreviewForm from "./components/forms/formPreview";
import Form from "./components/pages/Formpage"
import Main from './MainPage';
import QuizTraining from './QuizTraining';
import { useState } from 'react';
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
        <Route path="/form/:formType" element={<Form />} />
        <Route path="/preview/:formType" element={<PreviewForm />} />

       
        <Route path="/login" element={<LoginPage handleAlert={handleAlert} />} />
        <Route path="/signup" element={<SignupPage handleAlert={handleAlert} />} />
        
        {/* This route catches /home and all sub-routes like /home/odp */}
        <Route path="/home/*" element={<QuizTraining />} />
      </Routes>
    </Router>
  );
}

export default App;