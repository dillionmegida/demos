import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import Amsterdam from "./pages/Amsterdam"
import Rotterdam from "./pages/Rotterdam"
import TheHague from "./pages/TheHague"
import Home from "./pages/Home"
import Analytics from "./pages/Analytics"
import { BrowserInfo } from "./components/BrowserInfo"

function App() {
  return (
    <Router>
      <div className="app">
        <BrowserInfo />
        <nav className="navbar">
          <div className="nav-links">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/amsterdam" className="nav-link">
              Amsterdam
            </a>
            <a href="/rotterdam" className="nav-link">
              Rotterdam
            </a>
            <a href="/the-hague" className="nav-link">
              The Hague
            </a>
            <a href="/analytics" className="nav-link">
              Analytics
            </a>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/amsterdam" element={<Amsterdam />} />
            <Route path="/rotterdam" element={<Rotterdam />} />
            <Route path="/the-hague" element={<TheHague />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 Dutch Cities Explorer</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
