const router = require('express').Router();
const bookRoutes = require('./employeeRoutes');

// Prefix all routes defined in `employeeRoutes.js` with `/books
router.use('/employee', employeeRoutes);

module.exports = router;