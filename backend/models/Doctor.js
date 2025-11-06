const pool = require('../config/database');

class Doctor {
  static async create(doctorData) {
    const { name, specialization, email, phone, availability } = doctorData;
    const [result] = await pool.query(
      'INSERT INTO doctors (name, specialization, email, phone, availability) VALUES (?, ?, ?, ?, ?)',
      [name, specialization, email, phone, availability]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM doctors ORDER BY name');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE id = ?', [id]);
    return rows[0];
  }

  static async findBySpecialization(specialization) {
    const [rows] = await pool.query('SELECT * FROM doctors WHERE specialization = ?', [specialization]);
    return rows;
  }

  static async update(id, doctorData) {
    const { name, specialization, email, phone, availability } = doctorData;
    const [result] = await pool.query(
      'UPDATE doctors SET name = ?, specialization = ?, email = ?, phone = ?, availability = ? WHERE id = ?',
      [name, specialization, email, phone, availability, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM doctors WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Doctor;
