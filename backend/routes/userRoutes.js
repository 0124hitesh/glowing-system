const express = require('express')
const { registerUser, authUser } = require('../controllers/userControllers')

const userRoutes = express.Router()

userRoutes.route('/signup').post(registerUser)
userRoutes.route('/login').post(authUser)

module.exports = {userRoutes}