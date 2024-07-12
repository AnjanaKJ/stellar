const express = require('express');
const router = express.Router();
const { buyToken } = require('../controllers/buyTokenController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createTransaction } = require('../controllers/transactionController');

router.post('/buy-token', authenticateToken, buyToken);
router.post('/transactions', authenticateToken, createTransaction);

module.exports = router;
