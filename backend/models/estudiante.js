const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
  documento: { // Clave primaria
    type: DataTypes.STRING,
    allowNull: false, 
    primaryKey: true,
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
    unique: true, 
    validate: {
      isEmail: true, 
    },
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colegio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    carreraElegida: { 
    type: DataTypes.STRING,
 },
});

module.exports = Estudiante;