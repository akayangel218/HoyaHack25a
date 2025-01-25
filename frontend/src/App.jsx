import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import LandingPage from './pages/LandingPage/LandingPage'
import ApiClassifier from './pages/ApiPage/ApiClassifier'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={LandingPage}/>
        <Route path="/apiClassifier" element={ApiClassifier} />
      </Routes>
    </Router>
    </>
  )
}

export default App
