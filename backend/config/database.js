const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('project', 'root', '1304', {
  host: 'localhost',
  dialect: 'mysql', 
});

module.exports = sequelize;
