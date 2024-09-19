const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./estudiante'); // Importa el modelo Estudiante

const RespuestaEstudiante = sequelize.define('RespuestaEstudiante', {

  respuestas: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
  carreraElegida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Asociación con el modelo Estudiante (uno a uno)
Estudiante.hasOne(RespuestaEstudiante);
RespuestaEstudiante.belongsTo(Estudiante);

module.exports = RespuestaEstudiante;