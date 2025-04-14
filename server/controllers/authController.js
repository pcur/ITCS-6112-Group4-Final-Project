const User = require('../models/User');

// POST: Register a new user (plaintext password for simplicity)
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password, // No encryption for simplicity in demo
      role: role || 'student'  // default role is 'student'
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered', newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Login user (plaintext password match)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the plaintext password matches
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ Return just the user object
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// POST: Logout user (no session handling)
exports.logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// GET: Get current logged-in user info (simplified for demo)
exports.getCurrentUser = async (req, res) => {
  const { email } = req.body;  // Simulate getting the logged-in user's email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

// PATCH: Update user password (plaintext password update)
exports.updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // For simplicity, directly update password without hashing
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH: Update user role (no role validation)
exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.json({ message: 'Role updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
