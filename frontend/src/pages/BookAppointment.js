import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doctorService, appointmentService } from '../services';
import './BookAppointment.css';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadDoctors();
    if (location.state?.doctorId) {
      setFormData(prev => ({
        ...prev,
        doctor_id: location.state.doctorId
      }));
    }
  }, [location.state]);

  const loadDoctors = async () => {
    try {
      const data = await doctorService.getAll();
      setDoctors(data);
    } catch (err) {
      console.error('Failed to load doctors', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await appointmentService.create(formData);
      alert('Appointment booked successfully!');
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="book-appointment-container">
        <h1>Book Appointment</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label>Select Doctor *</label>
            <select
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleChange}
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Appointment Date *</label>
            <input
              type="date"
              name="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-group">
            <label>Appointment Time *</label>
            <input
              type="time"
              name="appointment_time"
              value={formData.appointment_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Reason for Visit *</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Describe your symptoms or reason for consultation"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/appointments')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
