import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import Sessions from './components/Sessions';
import OORSessions from './components/OORSessions';
import LiveTelemetry from './components/LiveTelemetry';
import TTClassifications from './components/TTClassifications';

const App = () => {
  const [currentSession, setCurrentSession] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute element={
              <div style={{ padding: 0, margin: 0 }}>
                <NavBar />
                <Dashboard />
              </div>
            } />
          }
        >
          <Route path="sessions" element={<Sessions setCurrentSession={setCurrentSession} />} />
          <Route path="oor-sessions" element={<OORSessions />} />
          <Route path="live-telemetry" element={<LiveTelemetry />} />
          <Route path="tt-classification" element={<TTClassifications />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
