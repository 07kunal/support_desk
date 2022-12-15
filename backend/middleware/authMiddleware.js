const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../modals/userModels')


const protect = asyncHandler(async (req, res, next) => {
    let token


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from token 
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: 'Not Authorized' })
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Not Authorized' })
    }

})

module.exports = { protect }