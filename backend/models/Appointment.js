const pool = require('../config/database');

class Appointment {
  static async create(appointmentData) {
    const { user_id, doctor_id, appointment_date, appointment_time, reason, status = 'scheduled' } = appointmentData;
    const [result] = await pool.query(
      'INSERT INTO appointments (user_id, doctor_id, appointment_date, appointment_time, reason, status) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, doctor_id, appointment_date, appointment_time, reason, status]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.query(`
      SELECT a.*, u.username, u.email, d.name as doctor_name, d.specialization 
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(`
      SELECT a.*, u.username, u.email, d.name as doctor_name, d.specialization 
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await pool.query(`
      SELECT a.*, d.name as doctor_name, d.specialization, d.email as doctor_email
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.user_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [userId]);
    return rows;
  }

  static async findByDoctorId(doctorId) {
    const [rows] = await pool.query(`
      SELECT a.*, u.username, u.email
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      WHERE a.doctor_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [doctorId]);
    return rows;
  }

  static async update(id, appointmentData) {
    const { appointment_date, appointment_time, reason, status } = appointmentData;
    const [result] = await pool.query(
      'UPDATE appointments SET appointment_date = ?, appointment_time = ?, reason = ?, status = ? WHERE id = ?',
      [appointment_date, appointment_time, reason, status, id]
    );
    return result.affectedRows;
  }

  static async updateStatus(id, status) {
    const [result] = await pool.query(
      'UPDATE appointments SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM appointments WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Appointment;
