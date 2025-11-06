import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Medical Appointment System</h1>
        <p>Book appointments with top doctors and manage your medical records efficiently</p>
        {!user && (
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        )}
        {user && (
          <div className="hero-buttons">
            <Link to="/doctors" className="btn btn-primary">Find Doctors</Link>
            <Link to="/appointments" className="btn btn-secondary">My Appointments</Link>
          </div>
        )}
      </div>

      <div className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🩺 Expert Doctors</h3>
            <p>Connect with qualified specialists across various medical fields</p>
          </div>
          <div className="feature-card">
            <h3>📅 Easy Booking</h3>
            <p>Book appointments quickly and manage them with ease</p>
          </div>
          <div className="feature-card">
            <h3>📋 Medical Records</h3>
            <p>Keep track of all your appointments and medical history</p>
          </div>
          <div className="feature-card">
            <h3>⏰ 24/7 Access</h3>
            <p>Access your appointments and records anytime, anywhere</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
