import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import MatchingPage from './pages/MatchingPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ExpertPage from './pages/ExpertPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/expert" element={<ExpertPage />} />
      </Routes>
    </Router>
  );
}

export default App;