const express = require('express')
const router = express.Router()

const { login, dashboard,register, admin } = require('../controllers/main')

//use for token is sent with header
// const authMiddleware = require('../middleware/auth')

//user for token is  attach in cookie
const {authen,authorized} = require('../middleware/authCookie')

router.route('/register').post(register)
router.route('/dashboard').get(authen,authorized('user','admin'), dashboard)
router.route('/admin').get(authen,authorized('admin'),admin)
router.route('/login').post(login)

module.exports = router
