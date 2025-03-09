import express from 'express';
import Item from '../model/item';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const item = new Item(req.body);

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
      // @ts-ignore
      res.status(400).json({ message: error.message });
  }
});

export default router;
