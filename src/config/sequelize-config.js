const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'e_commerce',
  username: 'root',
  password: 'experion@123',
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;