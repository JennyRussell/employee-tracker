const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING(30),

        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        references: {
            model: 'Role'
        }
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        references: {
            model: 'Role'
        }
    },

}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Employee',
});

module.exports = Employee;