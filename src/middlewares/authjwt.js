const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User.model')
const Role = require('../models/Role.model')

const verifyToken = async (req, res, next)=>{
    try {
        const token = req.headers['x-access-token']

        if(!token) return res.status(403).json({Message: 'No token provided'})
        
        const decoded = jwt.verify(token, process.env.SECRET)

        req.userId = decoded.id // Util dejarloo en un request para poder usarlo despues

        const userFound = await User.findById(req.userId, {password: 0})

        if(!userFound) return res.status(400).json({message: 'No user found'})

        console.log(userFound.username)

        next() 
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Unauthorized'})        
    } 
}

const isAdmin = async (req, res, next)=>{
    const userFound = await User.findById(req.userId)    
    //Comprobar los roles
    const rolesFound = await Role.find({_id: {$in: userFound.roles}})

    for (let i = 0; i < rolesFound.length; i++) {
        if(rolesFound[i].name === 'admin'){
            console.log('Welcome admin!')
            next()
            return
        }
    }
    console.log('No es admin')
    return res.status(401).json({message: 'Require privilegios de Administrador'})
}

module.exports = {verifyToken, isAdmin}