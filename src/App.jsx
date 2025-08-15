import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ExpertSignupPage from './pages/ExpertSignupPage'
import MatchingPage from './pages/MatchingPage'
import ExpertListPage from './pages/ExpertListPage'
import MatchedExpertListPage from './pages/MatchedExpertListPage'
import ChatPage from './pages/ChatPage'
import ExpertChatPage from './pages/ExpertChatPage'
import './styles/design-system.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/expert" element={<ExpertSignupPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/experts" element={<ExpertListPage />} />
        <Route path="/experts/matched" element={<MatchedExpertListPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/expert/:expertId" element={<ExpertChatPage />} />
      </Routes>
    </Router>
  )
}

export default App