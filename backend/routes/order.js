const express = require('express');
const db = require('../database');
const router = express.Router();

// Place an order
router.post('/', (req, res) => {
    const { userId, productId, quantity } = req.body;

    db.query(
        'INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity],
        (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('Order placed!');
        }
    );
});

// Get user orders
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

module.exports = router;

