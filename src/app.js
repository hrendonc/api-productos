const express = require('express')
const morgan = require('morgan')

const pkg = require('../package.json')
const productsRoutes = require('./routes/products.router')
const authRoutes = require('./routes/auth.router')
const usersRouter = require('./routes/user.router')
const { createRoles } = require('./libs/initialSetup')

const app = express()
createRoles()

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res)=>{
    res.json({
        "name": pkg.name,
        "version": pkg.version,
        "description": pkg.description,
        "author": pkg.author
    })
})

app.use('/products', productsRoutes)
app.use('/auth', authRoutes)
app.use('/users', usersRouter)

module.exports = app