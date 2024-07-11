const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const buytokenRoute = require('./routes/buytokenRoute');
const transactionRoute = require('./routes/transactionRoute')

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Basic route
app.get('/', (req, res) => {
  res.send('BRICS Blockchain Platform API');
});

// Routes
app.use('/api/users', userRoute);
app.use('/api/token', buytokenRoute);
app.use('/api', transactionRoute);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/stellar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});
