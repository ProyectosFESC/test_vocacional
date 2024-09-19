const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
  colegio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegurarse de que el correo sea único
    validate: {
      isEmail: true, // Validar que sea un correo electrónico válido
    },
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
});

module.exports = Estudiante;