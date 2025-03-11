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


router.put("/", (req, res) => {
    res.send("user get");
});

router.delete("/", (req, res) => {
    res.send("user get");
});

export default router;
