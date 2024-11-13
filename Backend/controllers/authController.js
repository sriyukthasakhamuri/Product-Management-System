const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/nodemailer'); // Import sendEmail function

// Register a new user
exports.register = async (req, res) => {
  try {
    console.log('inside register');
    
    const { username, email, password, role } = req.body;
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    

    // Send welcome email
    // await sendEmail(email, 'Welcome to Asset Control System', 'You have successfully registered!');

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
