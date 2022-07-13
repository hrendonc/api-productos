const User = require('../models/User.model')

const ROLES = ['user', 'admin']

const checkRole = (req, res, next)=>{   
    if(req.body.roles){
        for(let i=0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `${req.body.roles[i]} no existe!`
                })
            }
        }
        
    }
    next()
}

const checkDuplicateUserOrEmail = async (req, res, next)=>{
    const userFound = await User.findOne({username: req.body.username})
    if(userFound) return res.status(400).json({message: 'El usuario ya existe'})

    const emailFound = await User.findOne({email: req.body.email})
    if(emailFound) return res.status(400).json({message: 'El email ya existe'})

    next()
}

module.exports = {
    checkRole,
    checkDuplicateUserOrEmail
}