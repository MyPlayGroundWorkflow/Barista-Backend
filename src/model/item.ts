import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  remark: { type: String, required: true }
});

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;