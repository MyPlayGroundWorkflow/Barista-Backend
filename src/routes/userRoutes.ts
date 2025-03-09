import express from "express";
import User from "../model/user";

const router = express.Router();

// Get all users
router.get('/', async (req, res): Promise<void> => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/register", (req, res) => {
    try {
        console.log(req.body)
       const user = new User(req.body);

       // user.save()
       //     .then(r => res.send(r))
       //     .catch(e => res.send(e));

       let savedUser = user.save();
       res.send(savedUser);

    } catch (error) {
        console.log(error);
    }
});

router.put("/", (req, res) => {
    res.send("user get");
});

router.delete("/", (req, res) => {
    res.send("user get");
});

export default router;
