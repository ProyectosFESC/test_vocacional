const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estudiante = require('./estudiante'); 

const RespuestaEstudiante = sequelize.define('RespuestaEstudiante', {
  estudianteDocumento: { // Clave foránea que referencia el documento del estudiante
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Estudiante, 
      key: 'documento' 
    }
  },
  carreraElegida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Asociación con el modelo Estudiante (uno a uno)
Estudiante.hasOne(RespuestaEstudiante, { foreignKey: 'estudianteDocumento' }); 
RespuestaEstudiante.belongsTo(Estudiante, { foreignKey: 'estudianteDocumento' });

module.exports = RespuestaEstudiante;