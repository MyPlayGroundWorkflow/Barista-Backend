import express from 'express';
import Customer from '../model/customer';

const router = express.Router();

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customers', error });
    }
});


// Create a new customer
router.post('/', async (req, res) => {
    try {
        const { name, email, telephone } = req.body;
        const newCustomer = new Customer({ name, email, telephone });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({ message: 'Error creating customer', error });
    }
});


export default router;
