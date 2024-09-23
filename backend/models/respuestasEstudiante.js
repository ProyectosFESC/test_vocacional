const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./estudiante'); // Importa el modelo Estudiante

const RespuestaEstudiante = sequelize.define('RespuestaEstudiante', {
  pregunta1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta3: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta4: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta5: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta6: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta7: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta8: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta9: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  carreraElegida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RespuestaEstudiante;