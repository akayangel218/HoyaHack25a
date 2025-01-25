import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage'
import ApiClassifier from './pages/ApiPage/ApiClassifier'
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import Scanner from './pages/Scanner/Scanner'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        <Route path="/apiClassifier" element={<ApiClassifier />} />
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
