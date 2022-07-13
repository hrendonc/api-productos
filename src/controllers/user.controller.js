const createUser = (req, res, next)=>{
    res.json('Creating user')
    next()
}

module.exports = {
    createUser
}