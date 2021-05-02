const inquirer = require('inquirer');
const Employee = require('./models/Employee');
const Role = require('./models/Role');
const Department = require('./models/Department');


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
                    console.log('Update');
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
                        console.table(data);
                    })
                    break;
                case 'Roles':
                    console.log('Roles');
                    break;
                case 'Employees':
                    console.log('Employees');
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
        }).then(data => {
            switch (data.addChoices) {
                case 'Departments':
                    // create a new inquirer prompt asking what do you waant to call the department
                    //
                    Department.create({
                        name: 'Class 1B' // replace with inquirer name
                    }).then(data => {
                        console.log('Department successfully added');
                    })

                    break;
                case 'Roles':
                    console.log('Roles');
                    break;
                case 'Employees':
                    console.log('Employees');
                    break;

                case 'Back':
                    this.mainMenu();



            }
        })
    },


    // // Department.update({
    //     name: 'what you want to update name to' // replace with inquirer name
    // // },{
    //      where: {id:3} or {name:'Top Heroes'}
    // }).then(data => {

}