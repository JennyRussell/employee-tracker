const sequelize = require('../config/connection');
const Employee = require('../models/Employee');
const Role = require('../models/Role');
const Department = require('../models/Department');
const employeeData = require('./employee-seeds.json');
const roleData = require('./role-seeds.json');
const departmentData = require('./department-seeds.json');

const seedDatabase = async() => {
    await sequelize.sync({ force: true });

    await Department.bulkCreate(departmentData, {
        individualHooks: true,
        returning: true,
    });

    await Role.bulkCreate(roleData, {
        individualHooks: true,
        returning: true,
    });

    await Employee.bulkCreate(employeeData, {
        individualHooks: true,
        returning: true,
    });






    process.exit(0);
};

seedDatabase();