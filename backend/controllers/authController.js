const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Handle Google OAuth login
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        googleId,
        name,
        email,
        avatar: picture,
      });
      await user.save();
    }

    res.status(200).json({ user, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  googleLogin,
};
