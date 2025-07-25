const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'photoCloudSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true in production
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
