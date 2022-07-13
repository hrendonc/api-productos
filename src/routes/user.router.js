const {Router} = require('express')
const router = Router()

const userCtrl = require('../controllers/user.controller')
const check = require('../middlewares/authjwt')
const {checkRole} = require('../middlewares/verifySignup')

router.post('/', check.verifyToken, check.isAdmin, checkRole, userCtrl.createUser)

router.get('/', (req, res)=>{})

module.exports = router