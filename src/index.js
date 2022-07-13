const app = require('./app')
const db = require('./db')
require('dotenv').config()
const PORT = process.env.PORT

app.listen(PORT)
console.log('Server listen on port:', PORT)

