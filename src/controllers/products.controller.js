const Product = require('../models/Product.model')

const createProduct = async (req, res)=>{
    const {name, category, price, img} = req.body

    const newProduct = new Product({name, category, price, img})
    const productSaved = await newProduct.save()

    res.status(201).json(productSaved)
}

const getProducts = async (req, res)=>{
    const products = await Product.find()
    res.json(products)
}

const getProductById = async (req, res)=>{
    const product = await Product.findById(req.params.idProduct)
    res.json(product)
}

const updateProductById = async (req, res)=>{
    const updated = await Product.findByIdAndUpdate(req.params.idProduct, req.body, {new: true})
    res.json(updated)
}

const deleteProductById = async (req, res)=>{
    await Product.findByIdAndDelete(req.params.idProduct)
    res.status(204).json()
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}