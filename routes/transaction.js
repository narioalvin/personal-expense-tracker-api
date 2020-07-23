const router = require('express').Router();
const Transaction = require('../model/Transaction');

router.post('/create', async (req, res) => {
  //Create new transaction
  const transaction = new Transaction({
    userId: req.body.userId,
    type: req.body.type,
    category: req.body.category,
    amount: req.body.amount,
    icon: req.body.icon,
    creationDate: new Date(),
  });

  try {
   await transaction.save();
    res.json('Transcation Created');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/all/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const transactions = await Transaction.deleteOne({ _id: req.params.id });
    res.json(transactions);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

router.get('/deleteAll', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    // console.log(transactions);
    // transactions.forEach(transaction => {
    //     Transaction.deleteOne({ _id: Transaction._id })
    // });
    res.json(transactions);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports = router;
