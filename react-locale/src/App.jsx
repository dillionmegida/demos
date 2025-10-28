import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Feedback } from "./pages/Feedback"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/en" element={<Home />} />
        <Route path="/nl" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/en/feedback" element={<Feedback />} />
        <Route path="/nl/feedback" element={<Feedback />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
