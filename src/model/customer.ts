import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer;