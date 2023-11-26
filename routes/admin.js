// routes/admin.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', (req, res) => {
  const isAdmin = req.session.isAdmin;

  if (isAdmin) {
    res.render('admin', { title: 'Admin Page' });
  } else {
    res.redirect('/admin/login');
  }
});

router.get('/login', (req, res) => {
  req.session.isAdmin = true;
  res.render('admin.auth.ejs', { title: 'Admin Login Page' });
});

router.post('/add-product', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.send('Product added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Add other routes for CRUD operations as needed

module.exports = router;
