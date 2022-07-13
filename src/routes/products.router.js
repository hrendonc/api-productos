const {Router} = require('express')
const router = Router()

const {createProduct, getProducts, getProductById, updateProductById, deleteProductById} = require('../controllers/products.controller')
const check = require('../middlewares/authjwt')

router.post('/', check.verifyToken, check.isAdmin, createProduct)
router.get('/', check.verifyToken, getProducts)
router.get('/:idProduct', check.verifyToken, getProductById)
router.put('/:idProduct', check.verifyToken, check.isAdmin, updateProductById)
router.delete('/:idProduct', check.verifyToken, check.isAdmin, deleteProductById)

module.exports = router