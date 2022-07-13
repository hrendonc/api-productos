const User =  require('../models/User.model')
const jwt = require('jsonwebtoken')
const Role = require('../models/Role.model')
require('dotenv').config()

const signup = async (req, res)=>{
    const {username, email, password, roles} = req.body

    const newUser = new User({
        username,
        email,
        password: await User.encryptPass(password)
    })

    // Asignación de roles
    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    }else {
        const role = await Role.findOne({name: 'user'})
        console.log(role._id)
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()
    console.log(newUser)

    const token = jwt.sign({id: savedUser._id}, process.env.SECRET, {expiresIn: '1d'})

    res.status(200).json({token})
}

const signin = async (req, res)=>{
    const userFound = await User.findOne({email: req.body.email}).populate('roles')

    if(!userFound) return res.status(400).json({message: 'User not found'})

    const matchPass = await User.comparePass(req.body.password, userFound.password)

    if(!matchPass) return res.status(400).json({token: 'Null', message: 'Invalid Pass'})

    const token = jwt.sign({id: userFound._id}, process.env.SECRET, {expiresIn: '1d'})

    console.log(userFound)
    res.json({token})
}

module.exports = {
    signup,
    signin
}