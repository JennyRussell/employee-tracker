const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(30),

        allowNull: false,
    },
    salary: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        references: {
            model: 'Department'
        }
    },

}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Role',
});

module.exports = Role;