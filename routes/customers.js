const { Router } = require('express');
const router = Router();
const axios = require('axios');
const base_url = 'http://localhost:3000';

// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await axios.get(`${base_url}/customers`);
        res.render('customers', { customers: customers.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a customer by ID
router.get('/:customerId', async (req, res) => {
    try {
        const customer = await axios.get(`${base_url}/customers/${req.params.customerId}`);
        res.render('customer', { customer: customer.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new customer
router.post('/', async (req, res) => {
    try {
        await axios.post(`${base_url}/customers`, req.body);
        res.redirect('/customers');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a customer by ID
router.put('/:customerId', async (req, res) => {
    try {
        await axios.put(`${base_url}/customers/${req.params.customerId}`, req.body);
        res.redirect('/customers');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a customer by ID
router.delete('/:customerId', async (req, res) => {
    try {
        await axios.delete(`${base_url}/customers/${req.params.customerId}`);
        res.redirect('/customers');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;