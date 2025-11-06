import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Welcome, {user?.username}!</h3>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
        
        <div className="card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/doctors" className="btn btn-primary">Browse Doctors</Link>
            <Link to="/appointments" className="btn btn-secondary">View Appointments</Link>
            <Link to="/appointments/new" className="btn btn-success">Book Appointment</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
