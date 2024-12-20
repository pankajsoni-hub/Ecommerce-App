const express = require('express');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto =require('crypto');
const Cart = require('./models/cart');
const Order = require('./models/Order'); // Import your Order model
const sendOrderConfirmation = require('./utils/sendOrderConfirmation'); 
// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shoppingApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));
const razorpay = new Razorpay({
    key_id: 'rzp_test_sViQfriq16A7IA', // Replace with your Razorpay key ID
    key_secret: 'MjIy5Slcn0NJ548HDjkZEblW' // Replace with your Razorpay key secret
  });
  
// Route to add product to cart
app.post('/api/cart', async (req, res) => {
  const { productId, name, price, description, quantity, image } = req.body;
  try {
    const newProduct = new Cart({
      productId,
      name,
      price,
      image,
      description,
      quantity,
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product added to cart', product: newProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error adding product to cart', error });
  }
});
// Route to get all products in the cart (Admin portal)
app.get('/api/cart', async (req, res) => {
  try {
    const products = await Cart.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching cart products', error });
  }
});
// Route to update cart item quantity
app.put('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
});
app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Cart.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error });
  }
});
app.delete('/api/cart', async (req, res) => {
  try {
    const result = await Cart.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No cart items to delete' });
    }
    res.status(200).json({ message: 'All cart items removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart items', error });
  }
});
app.post('/api/order', async (req, res) => {
  const { name, email, address,products } = req.body;
  if (!name || !email || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const order = await Order.create({ name, email, address,products });
    await sendOrderConfirmation({ name, email }, order);
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error });
  }
});
app.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // Amount in paise (100 paise = 1 INR)
    currency: 'INR',
    receipt: 'receipt#1',
    payment_capture: 1
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Route to verify payment signature
app.post('/verify-signature', (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const body = order_id + '|' + payment_id;
  const expected_signature = crypto
    .createHmac('sha256', 'MjIy5Slcn0NJ548HDjkZEblW')
    .update(body.toString())
    .digest('hex');

  if (expected_signature === signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});
// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
