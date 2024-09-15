# BRICS Payment System (Backend)

This repository contains the backend implementation of the BRICS Payment System. The project is designed to facilitate secure and efficient cross-border payments within BRICS countries using the Stellar blockchain. It enables users to perform transactions with the BRIC token, which serves as a common payment method for cross-border trade.


## Overview

The BRICS Payment System Backend is developed using Node.js and Stellar SDK. It provides REST APIs to manage user accounts, facilitate transactions, and handle BRIC token payments between different users in BRICS countries. MongoDB is used as the database to store user information, transaction history, and other relevant data.

### Key Features:
- User account creation with wallet generation (Stellar public and private keys).
- Secure transfer of BRIC tokens between users.
- Fetch account balances and transaction history.
- User authentication using JWT.
- Robust error handling and validation.

## Technologies

- **Node.js**: Backend framework for building REST APIs.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing user data and transaction history.
- **Stellar SDK**: Used for interacting with the Stellar blockchain network.

## Features

- **User Wallet Creation**: Automatically generate Stellar wallets (public/private keys) for users during registration.
- **Token Transfer**: Users can send and receive BRIC tokens via Stellar blockchain.
- **Transaction History**: Retrieve transaction history and account balance.
- **Cross-Border Payments**: Designed for seamless payment transactions across BRICS countries.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AnjanaKJ/stellar.git
    cd stellar/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory with the following:
    ```bash
    JWT_SECRET=your_jwt_secret
    ISSUER_SECRET_KEY=your_stellar_issuer_secret_key
    DISTRIBUTOR_SECRET_KEY=your_stellar_distributor_secret_key
    ISSUER_PUBLIC_KEY=your_stellar_issuer_public_key
    DISTRIBUTOR_PUBLIC_KEY=your_stellar_distributor_public_key
    ```

4. Start the application:
    ```bash
    npm start
    ```
