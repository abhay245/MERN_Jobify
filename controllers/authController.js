const User = require('../models/User.js');
const authenticateUser = require('../middleware/auth.js');
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error('Please provide all values.');
  }
  const user = await User.create({ name, email, password });
  const token = await user.createJWT();

  res.status(201).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name
    },
    token,
    location: user.location
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error('Please provide all values.');
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(400).json({ msg: 'Invalid Credentials' });
    return;
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(400).json({ msg: 'Invalid Credentials' });
    return;
  }
  const token = await user.createJWT();
  user.password = undefined;
  res.json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new Error("Please provide all values.");
  }
  try {
    const user = await User.findOne({ _id: req.user.userId });
    if (!user) {
      throw new Error("User not found.");
    }
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;
    user.markModified('email');
    user.markModified('name');
    user.markModified('lastName');
    user.markModified('location');
    await user.save();
    const token = await user.createJWT();
    res.json({ user, token, location });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = { register, login, updateUser };
