const {Router} = require('express')
const router = Router()

const authCtrl = require('../controllers/auth.controller')
const mid = require('../middlewares/verifySignup')

router.post('/signup', mid.checkDuplicateUserOrEmail, mid.checkRole, authCtrl.signup)
router.get('/signin', authCtrl.signin)

module.exports = router