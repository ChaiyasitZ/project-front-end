const { Router } = require('express');
const router = Router();
const axios = require('axios');
const base_url = 'http://localhost:3000';

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await axios.get(`${base_url}/orders`);
        res.render('orders', { orders: orders.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an order by id
router.get('/:orderId', async (req, res) => {
    try {
        const order = await axios.get(`${base_url}/orders/${req.params.orderId}`);
        res.render('order', { order: order.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    try {
        await axios.post(`${base_url}/orders`, req.body);
        res.redirect('/orders');
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an order by id
router.put('/:orderId', async (req, res) => {
    try {
        const order = await axios.put(`${base_url}/orders/${req.params.orderId}`, req.body);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an order by id
router.delete('/:orderId', async (req, res) => {
    try {
        await axios.delete(`${base_url}/orders/${req.params.orderId}`);
        res.redirect('/orders');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;