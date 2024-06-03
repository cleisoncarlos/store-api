import express from 'express'

import ProductController from '../controllers/product.controller.js';

const router = express.Router()

router.post('/', ProductController.createProduct)
router.post('/info', ProductController.createProductInfo)
router.put('/info', ProductController.updateProductInfo)
router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProduct)
router.put('/', ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)


export default router;