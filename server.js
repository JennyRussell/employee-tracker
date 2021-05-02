const path = require('path');
const express = require('express');
const inquirer = require('inquirer');
// const cTable = require('console.table');
const sequelize = require('./config/connection');
const Employee = require('./models/Employee');
const Role = require('./models/Role');
const Department = require('./models/Department');
const menu = require('./app');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./controllers'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Now listening')
        menu.mainMenu();
    });
});