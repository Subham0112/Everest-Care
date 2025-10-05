import { useState } from 'react'


import './App.css'
import LogInPage from './components/LogInPage'
import SignupPage from './components/SignupPage'
// importing routers for routing 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from './Content'

function App() {

  return (
    <>
      <Router>
     
        <Routes>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignupPage />} />
       <Route path="/" element={<Content />} />
        </Routes>
  
      </Router>
    </>
  )
}

export default App
