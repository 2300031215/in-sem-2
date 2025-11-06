CREATE DATABASE IF NOT EXISTS medical_appointment_db;

USE medical_appointment_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('patient', 'admin', 'doctor') DEFAULT 'patient',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  specialization VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  availability TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_specialization (specialization)
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  reason TEXT,
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_doctor_id (doctor_id),
  INDEX idx_appointment_date (appointment_date),
  INDEX idx_status (status)
);

-- Insert sample doctors
INSERT INTO doctors (name, specialization, email, phone, availability) VALUES
('Dr. Sarah Johnson', 'Cardiology', 'sarah.johnson@hospital.com', '555-0101', 'Monday-Friday 9AM-5PM'),
('Dr. Michael Chen', 'Neurology', 'michael.chen@hospital.com', '555-0102', 'Monday-Wednesday 10AM-6PM'),
('Dr. Emily Rodriguez', 'Pediatrics', 'emily.rodriguez@hospital.com', '555-0103', 'Tuesday-Saturday 8AM-4PM'),
('Dr. James Wilson', 'Orthopedics', 'james.wilson@hospital.com', '555-0104', 'Monday-Friday 11AM-7PM'),
('Dr. Lisa Anderson', 'Dermatology', 'lisa.anderson@hospital.com', '555-0105', 'Wednesday-Friday 9AM-3PM');
