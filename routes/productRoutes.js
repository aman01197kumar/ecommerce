import express from 'express';
import { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', createProduct); // Create a product
router.get('/', getProducts); // Get all products
router.get('/:id', getProductById); // Get a product by ID
router.put('/:id', updateProduct); // Update a product
router.delete('/:id', deleteProduct); // Delete a product

export default router;
