const StellarSdk = require('stellar-sdk');
const User = require('../models/User');

const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

async function checkBricTokenBalance(publicKey) {
    try {
        const account = await server.loadAccount(publicKey);
        if (!account) {
            console.log("Account not found");
            throw new Error('Account not found');
        }

        const bricBalance = account.balances.find(balance => balance.asset_code === 'BRIC');

        if (!bricBalance) {
            console.log('No BRIC token balance found for account:', publicKey);
            return { type: 'BRIC', balance: '0' };
        }

        return { balance: bricBalance.balance };
    } catch (error) {
        console.error('Error loading account:', error);
        throw error;
    }
}

exports.getBricTokenBalance = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const publicKey = user.wallet.publicKey;

        const bricBalance = await checkBricTokenBalance(publicKey);
        res.status(200).json({ bricBalance });
    } catch (error) {
        console.error('Error retrieving BRIC token balance:', error);
        res.status(500).json({ error: 'Failed to load BRIC token balance' });
    }
};
