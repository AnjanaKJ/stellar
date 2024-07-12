const User = require('../models/User');
const { performPayment } = require('../services/tokenService');

exports.createTransaction = async (req, res) => {
  const { senderSecretKey, email, amount } = req.body;

  try {
    if (!senderSecretKey || !email || !amount) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res.status(400).json({ error: 'Invalid amount. Must be a positive number.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const receiverPublicKey = user.wallet.publicKey;
    const receiverSecretKey = user.wallet.secret;

    try {
      const transactionResult = await performPayment(senderSecretKey, receiverPublicKey, receiverSecretKey, amount);
      console.log('Transaction successful');
      res.status(200).json({ message: 'Transaction successful' });
    } catch (error) {
      console.error('Error in performPayment:', error.message);
      if (error.message === 'Receiver account not found') {
        return res.status(404).json({ error: 'Receiver account not found' });
      } else if (error.message === 'Sender account does not have enough BRIC balance') {
        return res.status(400).json({ error: 'Sender account does not have enough BRIC balance' });
      }
      res.status(500).json({ error: 'Transaction failed', message: error.message });
    }
  } catch (error) {
    console.error('Error in transaction endpoint:', error);
    res.status(500).json({ error: 'Transaction failed', message: error.message });
  }
};
