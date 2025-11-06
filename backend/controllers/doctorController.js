const Doctor = require('../models/Doctor');

exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, email, phone, availability } = req.body;
    
    const doctorId = await Doctor.create({
      name,
      specialization,
      email,
      phone,
      availability
    });

    res.status(201).json({ 
      message: 'Doctor created successfully',
      doctorId 
    });
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ message: 'Failed to create doctor. Please try again.' });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.getAll();
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Failed to get doctors. Please try again.' });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Failed to get doctor. Please try again.' });
  }
};

exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    const doctors = await Doctor.findBySpecialization(req.params.specialization);
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors by specialization error:', error);
    res.status(500).json({ message: 'Failed to get doctors. Please try again.' });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { name, specialization, email, phone, availability } = req.body;
    
    const affectedRows = await Doctor.update(req.params.id, {
      name,
      specialization,
      email,
      phone,
      availability
    });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor updated successfully' });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ message: 'Failed to update doctor. Please try again.' });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const affectedRows = await Doctor.delete(req.params.id);
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ message: 'Failed to delete doctor. Please try again.' });
  }
};
