const asyncHandler = require('express-async-handler')
// for password encrypt import bcrypt
const bcrypt = require('bcryptjs')
const User = require('../modals/userModels')


// @desc Register a new user
// @dsec /api/users
// @access Public


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // validation
    if (!name || !email || !password) {
        // return res.status(400).json({ message: "Please include all fields" })
        res.status(400)
        throw new Error("Please include all fields")

    }
    // find if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password ( actually we want user encrypt password) and what is salt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Inavalid user data')
    }


})
// @desc Login user
// @dsec /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser
}