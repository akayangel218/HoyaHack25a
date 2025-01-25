import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage'
import ApiClassifier from './pages/ApiPage/ApiClassifier'
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import Scanner from './pages/Scanner/Scanner'
import ChengModel from './pages/ChengModel/ChengModel';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        <Route path="/apiClassifier" element={<ApiClassifier />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="chengMl" element={<ChengModel />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
