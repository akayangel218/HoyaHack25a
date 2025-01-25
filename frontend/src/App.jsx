import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage'
import ApiClassifier from './pages/ApiPage/ApiClassifier'
import SignInPage from './pages/SignInPage/SignInPage.jsx';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        <Route path="/apiClassifier" element={<ApiClassifier />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
