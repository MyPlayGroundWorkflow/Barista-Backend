import express from 'express';
import Customer from '../model/customer';

const router = express.Router();

// Get all customers
router.get('/', async (req, res): Promise<void> => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving customers' });
    }
});


// Get customer by ID
router.get("/:id", async (req, res): Promise<void> => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            res.status(400).json({ message: 'Customer not found' });
            return;
        }

        res.json(customer);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving customer' });
    }
})

// Create a new customer
router.post('/', async (req, res): Promise<void> => {
    try {
        const { name, email, telephone } = req.body;
        const newCustomer = new Customer({ name, email, telephone });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({ message: 'Error creating customer' });
    }
});

// Update a customer
router.put("/:id", async (req, res): Promise<void> => {
    try {
        const id = req.params.id;
        const updateBody = req.body;

        const updatedCustomer =
            await Customer.findByIdAndUpdate(id, updateBody, { new: true });

        if (!updatedCustomer) {
            res.status(400).json({ message: 'Customer not found' });
            return;
        }

        res.status(204).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating customer' });
    }
})

// Delete a customer
router.delete("/:id", async (req, res): Promise<void> => {
    try {
        const id = req.params.id;
        const deletedCustomer = await Customer.findByIdAndDelete(id)

        console.log("delete customer - ", deletedCustomer);

        if (!deletedCustomer) {
            res.status(400).json({ message: 'Customer not found' });
            return;
        }

        res.status(204).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting customer' });
    }
})


export default router;
