const express = require('express')
const router = express.Router()

const { login, dashboard,register } = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.route('/register').post(register)
router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/login').post(login)

module.exports = router
