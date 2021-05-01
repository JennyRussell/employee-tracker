const router = require('express').Router();

// Import the model
const Employee = require('../../models/Employee');

// CREATE a book
router.post('/', (req, res) => {
    // Use Sequelize's `create()` method to add a row to the table
    // Similar to `INSERT INTO` in plain SQL
    Employee.create({
            title: req.body.title,
            author: req.body.author,
            is_paperback: true
        })
        .then((newEmployee) => {
            // Send the newly created row as a JSON object
            res.json(newEmployee);
        })
        .catch((err) => {
            res.json(err);
        });
});