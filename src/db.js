const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB)
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))