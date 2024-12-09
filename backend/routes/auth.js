const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, 'customer'],
        (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send('User registered!');
        }
    );
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) return res.status(401).send('User not found');

        const validPassword = await bcrypt.compare(password, results[0].password);
        if (!validPassword) return res.status(403).send('Invalid credentials');

        const token = jwt.sign({ id: results[0].id, role: results[0].role }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    });
});

module.exports = router;

