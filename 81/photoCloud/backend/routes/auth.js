const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const supabase = require('../supabase/client');

const router = express.Router();

// Passport local strategy
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const { data: user, error } = await supabase
        .from('photoCloudUsers')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) return done(null, false, { message: 'Invalid email' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return done(null, false, { message: 'Invalid password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Session handling
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const { data: user, error } = await supabase
    .from('photoCloudUsers')
    .select('*')
    .eq('id', id)
    .single();
  done(error, user);
});

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('photoCloudUsers')
      .insert([{ name, email, password: hashedPassword }]);

    if (error) return res.status(500).json({ message: 'Signup failed', error });
    res.status(201).json({ message: 'Signup successful', user: data });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout error' });
    res.status(200).json({ message: 'Logged out' });
  });
});

module.exports = router;
