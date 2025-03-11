import express from "express";
import User from "../model/user";

const router = express.Router();

// Get all users
router.get('/', async (req, res): Promise<void> => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get user by Email
router.get('/:email', async (req, res): Promise<void> => {
    try {
        const user = await User.findOne({email: req.params.email}).select('-password');

        if (!user) {
            res.status(400).json({ error: 'User not found' });
            return;
        }

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Register user
router.post("/register", async (req, res): Promise<void> => {
    try {
        console.log(req.body)
        const existingUser = await User.findOne({email: req.body.email});

        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

       const user = new User(req.body);

       let savedUser = await user.save();
       res.send(savedUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login
router.post("/login", async (req, res): Promise<void> => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            res.status(400).json({ error: 'User not found' });
            return;
        }

        const sendingUser = {
            email: user.email,
            name: user.name
        }

        if (user.password == req.body.password) {
            res.status(200).json(sendingUser);
        } else {
            res.status(401).json({ error: 'Invalid password' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update user
router.put("/:email", async (req, res): Promise<void> => {
    try {
        const updateUser = await User.findOneAndUpdate({email: req.params.email}, req.body);

        if (!updateUser) {
            res.status(400).json({ error: 'User not found' });
            return;
        }

        res.status(204).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete("/:email", async (req, res): Promise<void> => {
    try {
        const user = await User.findOneAndDelete({email: req.params.email});

        if (!user) {
            res.status(400).json({ error: 'User not found' });
            return;
        }

        res.status(204).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
