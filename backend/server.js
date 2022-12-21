const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

// connect to database
connectDB()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// method GET 
app.get('/', (req, res) => {
    // res.send('Hello')
    // sending the data in json format
    // res.status(200).json({message:'welcome to kunal support desk api'})
    res.json({ message: 'welcome to Kunal Support Desk API' })

})
// adding the another folder file in this way . Routes, here app is connected to the route file so it's working for the api urls

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))