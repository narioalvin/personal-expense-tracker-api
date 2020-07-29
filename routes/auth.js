const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { signUpValidation, signInValidation } = require('../validation');

router.post('/signup', async (req, res) => {
  const { error } = signUpValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const dbUser = await User.findOne({ name: req.body.name });

  if (dbUser) return res.status(400).json('Name already exist.');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.passcode, salt);

  //Create new user
  const user = new User({
    name: req.body.name.trim().toLowerCase(),
    passcode: hashedPassword,
    avatar: req.body.avatar,
    modificationDate: new Date(),
  });

  try {
    user.save();
    res.json({ user: user._id });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/signin', async (req, res) => {
  //Validation before loggin in
  const { error } = signInValidation(req.body);

  if (error) return res.status(400).json(error.details[0].message);

  const user = await User.findOne({ name: req.body.name.trim().toLowerCase() });

  //Check if the email exists
  if (!user) return res.status(400).json('User does not exist');

  //Check if the user is correct
  const validPass = await bcrypt.compare(req.body.passcode, user.passcode);
  if (!validPass) return res.status(400).json('Password is incorrect');

  res.json({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    modificationDate: user.modificationDate,
  });
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { modificationDate: new Date() } }
    );

    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      avatar: updatedUser.avatar,
      modificationDate: new Date(),
    });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports = router;
