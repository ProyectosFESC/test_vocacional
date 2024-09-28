const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testvocacional', 'testvocacional_a', 'tsaYedub0jh68q7D', {
  host: 'mysql.ingsoftwarefesc.com',
  dialect: 'mysql', 
});

module.exports = sequelize;
