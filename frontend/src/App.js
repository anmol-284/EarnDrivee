import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Main';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Document from './pages/Document';
import Bikes from './pages/BookBikes';
import PaySuccess from './pages/PaySuccess';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import BookBikes from './pages/BookBikes';
import MyBikes from './pages/MyBikes';
import MyRides from './pages/MyRides';
import Demo from './pages/Demo';

function App() {
  return (
    <Router>
      <div className="relative flex min-h-screen flex-col bg-white overflow-x-hidden" style={{ fontFamily: "Ubuntu" }}>
        <div className="layout-container flex h-full grow flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
              <Route path="/book" element={<ProtectedRoute component={BookBikes} />} />
              <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
              <Route path="/info" element={<ProtectedRoute component={Info} />} />
              <Route path="/listBikes" element={<ProtectedRoute component={Demo} />} />
              <Route path="/document" element={<ProtectedRoute component={Document} />} />
              <Route path="/paymentsuccess" element={<ProtectedRoute component={PaySuccess} />} />
              <Route path="/mybikes" element={<ProtectedRoute component={MyBikes} />} />
              <Route path="/myrides" element={<ProtectedRoute component={MyRides} />} />
              <Route path="/about" element={<About />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset_password/:id/:token"  element={<ResetPassword />} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
