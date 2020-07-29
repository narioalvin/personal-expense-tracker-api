const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//IMPORT ROUTES
const authRoute = require('./routes/auth');
const transactionRoute = require('./routes/transaction');

const app = express();

dotenv.config();

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log('Connected to DB')
);

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//ROUTE MIDDLEWARES
app.use('/api/user', authRoute);
app.use('/api/transaction', transactionRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running in port ${port}`));
