import express from 'express';
import Item from '../model/item';

const router = express.Router();

// Get all items
router.get('/', async (req, res): Promise<void> => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving items", error });
  }
});

// Get item by ID
router.get('/:id', async (req, res): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      res.status(404).json({message: 'Item not found'});
      return
    }

    res.json(item);

  } catch (error) {
    res.status(500).json({ message: "Error retrieving item" });
  }
});


// Create a new item
router.post('/', async (req, res): Promise<void> => {
  const item = new Item(req.body);

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);   //201 - created
  } catch (error) {
    res.status(400).json({ message: 'Error creating Item' });
  }
});


// Update an item
router.put('/:id', async (req, res): Promise<void> => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!item) {
      res.status(404).json({message: 'Item not found'});
      return
    }

    res.status(204).json();  //204 - no content
    // res.status(200).json(item);  //200 - ok

  } catch (error) {
    res.status(400).json({ message: "Item Update error" });
  }
});

// Delete an item
router.delete('/:id', async (req, res): Promise<void> => {
  try {
    const id  = req.params.id;

    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return
    }

    res.status(204).json();

  } catch (error) {
    res.status(500).json({ message: "Item delete error" });
  }
});

export default router;
