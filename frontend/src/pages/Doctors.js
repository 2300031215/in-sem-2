import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorService } from '../services';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await doctorService.getAll();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading doctors...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="container">
      <h1>Our Doctors</h1>
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p className="specialization">{doctor.specialization}</p>
            <p>📧 {doctor.email}</p>
            <p>📞 {doctor.phone}</p>
            <p className="availability">🕒 {doctor.availability}</p>
            <Link 
              to="/appointments/new" 
              state={{ doctorId: doctor.id, doctorName: doctor.name }}
              className="btn btn-primary"
            >
              Book Appointment
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
