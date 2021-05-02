const inquirer = require('inquirer');
const Employee = require('./models/Employee');
const Role = require('./models/Role');
const Department = require('./models/Department');
const cTable = require('console.table');


module.exports = {
    mainMenu: function() {
        inquirer.prompt({
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View', 'Update', 'Add', 'Quit'],
            name: 'menuChoices'
        }).then(data => {
            switch (data.menuChoices) {
                case 'View':
                    this.viewMenu();
                    break;
                case 'Update':
                    this.updateMenu();
                    break;
                case 'Add':
                    this.addMenu();
                    break;

                case 'Quit':
                    process.exit();



            }
        })
    },


    viewMenu: function() {
        inquirer.prompt({
            type: 'list',
            message: 'What would you like to view?',
            choices: ['Departments', 'Roles', 'Employees', 'Back'],
            name: 'viewChoices'
        }).then(data => {
            switch (data.viewChoices) {
                case 'Departments':
                    Department.findAll().then(data => {
                        console.table(data, ['dataValues']);
                    })
                    break;
                case 'Roles':
                    Role.findAll().then(data => {
                        console.table(data, ['dataValues']);
                    })
                    break;
                case 'Employees':
                    Employee.findAll().then(data => {
                        console.table(data, ['dataValues']);
                    })
                    break;

                case 'Back':
                    this.mainMenu();



            }
        })
    },

    addMenu: function() {
        inquirer.prompt({
            type: 'list',
            message: 'What would you like to add?',
            choices: ['Departments', 'Roles', 'Employees', 'Back'],
            name: 'addChoices'
        }).then(async(data) => {
            switch (data.addChoices) {
                case 'Departments':
                    inquirer.prompt({
                        type: 'input',
                        message: 'Please enter a new department name.',
                        name: 'newDepartment'

                    }).then(async(answer) => {
                        const department = await Department.create({
                            name: answer.newDepartment
                        }).then(data => {
                            console.log(`Successfully added a new department called ${answer.newDepartment}`);
                        })
                    })

                    break;

                case 'Roles':
                    let departments = [];
                    let userDepartment
                    try {
                        const allDepartments = await Department.findAll({
                            raw: true
                        })

                        for (let i = 0; i < allDepartments.length; i++) {
                            departments.push(allDepartments[i].name)
                        }

                        inquirer.prompt([{
                                type: 'input',
                                message: 'Please enter the role title.',
                                name: 'roleTitle'

                            },
                            {
                                type: 'input',
                                message: 'Please enter role salary.',
                                name: 'roleSalary'

                            },
                            {
                                type: "list",
                                message: "Please select role department from list",
                                name: "roleDepartment",
                                choices: departments
                            }
                        ]).then(async(answer) => {

                            for (let i = 0; i < allDepartments.length; i++) {
                                if (answer.department === allDepartments[i].name) {
                                    userDepartment = allDepartments[i].id;
                                }
                            }

                            const role = await Role.create({
                                title: answer.roleTitle,
                                salary: answer.roleSalary,
                                department_id: userDepartment
                            });
                            console.log(`Successfully added a new role title: ${answer.roleTitle}`);
                        })
                    } catch (error) {
                        console.log(error)
                    };

                    break;
                case 'Employees':
                    let roles = [];
                    let userRole;
                    try {
                        const allRoles = await Role.findAll({
                            raw: true
                        })

                        for (let i = 0; i < allRoles.length; i++) {
                            roles.push(allRoles[i].name)
                        }

                        inquirer.prompt([{
                                type: 'input',
                                message: 'Please enter the first name of the employee',
                                name: 'firstName'

                            },
                            {
                                type: 'input',
                                message: 'Please enter the last name of the employee',
                                name: 'lastName'

                            },
                            {
                                type: "list",
                                message: "Please select employee role from the list",
                                name: "employeeRole",
                                choices: roles
                            }
                        ]).then(async(answer) => {

                            for (let i = 0; i < allRoles.length; i++) {
                                if (answer.role === allRoles[i].title) {
                                    userRole = allRoles[i].id;
                                }
                            }

                            const employee = await Employee.create({
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: userRole
                            });
                            console.log(`Successfully added a new employee named: ${answer.firstName} ${answer.lastName}`);
                        })
                    } catch (error) {
                        console.log(error)
                    };
                    break;

                case 'Back':
                    this.mainMenu();



            }
        })
    },


    updateMenu: function() {
        inquirer.prompt({
            type: 'list',
            message: 'Please select what you would like to update.',
            choices: ['Employee Role', 'Employee Manager', 'Back'],
            name: 'updateChoices'
        }).then(async(data) => {
            switch (data.updateChoices) {
                case 'Employee Role':

                    inquirer.prompt({
                        type: 'input',
                        message: 'Please enter the id of the employee whose role you wish to update.',
                        name: 'id'
                    }).then(async(answer) => {

                    })


                    console.log("works!");
                    break;
                case 'Employee Manager':
                    console.log("works!");
                    break;
                case 'Back':
                    this.mainMenu();


            }
        })
    }

};