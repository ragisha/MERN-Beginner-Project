const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize(
  'postgres',
  'postgres', 
  '1234', {
  host: 'localhost',
  dialect: 'postgres'
});
const Person = sequelize.define('Person', {
  // Model attributes are defined here
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'people'
});

module.exports = Person;