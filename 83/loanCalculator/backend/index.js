const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { data, error } = await supabase
      .from('google_users') // Changed from 'loan calculator' to 'users'
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Deserialize user error:', error);
      return done(error, null);
    }
    done(null, data);
  } catch (error) {
    console.error('Deserialize user catch error:', error);
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Google OAuth - Profile:', profile.id);
    
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('google_users') // Changed from 'loan calculator' to 'users'
      .select('*')
      .eq('google_id', profile.id)
      .single();

    if (existingUser && !fetchError) {
      console.log('Existing Google user found:', existingUser.id);
      return done(null, existingUser);
    }

    console.log('Creating new Google user...');
    const userData = {
      google_id: profile.id,
      name: profile.displayName,
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
      provider: 'google'
    };
    console.log('User data to insert:', JSON.stringify(userData, null, 2));
    
    // Create new user
    const { data: newUser, error: insertError } = await supabase
      .from('google_users') // Changed from 'loan calculator' to 'users'
      .insert([userData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error details:', JSON.stringify(insertError, null, 2));
      console.error('Insert error message:', insertError.message);
      console.error('Insert error code:', insertError.code);
      throw insertError;
    }
    
    console.log('New Google user created:', newUser.id);
    return done(null, newUser);
  } catch (error) {
    console.error('Google OAuth error details:', JSON.stringify(error, null, 2));
    console.error('Google OAuth error message:', error.message);
    console.error('Google OAuth error code:', error.code);
    return done(error, null);
  }
}));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'email', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('Facebook OAuth - Profile:', profile.id);
    
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('google_users') // Changed from 'loan calculator' to 'users'
      .select('*')
      .eq('facebook_id', profile.id)
      .single();

    if (existingUser && !fetchError) {
      console.log('Existing Facebook user found:', existingUser.id);
      return done(null, existingUser);
    }

    console.log('Creating new Facebook user...');
    // Create new user
    const { data: newUser, error: insertError } = await supabase
      .from('google_users') // Changed from 'loan calculator' to 'users'
      .insert([
        {
          facebook_id: profile.id,
          name: profile.displayName,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
          avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
          provider: 'facebook'
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }
    
    console.log('New Facebook user created:', newUser.id);
    return done(null, newUser);
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return done(error, null);
  }
}));

// Auth middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
};

// Routes

// Regular registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // In a real app, hash the password
    const { data, error } = await supabase
      .from('google_users') // Changed from 'loan calculator' to 'users'
      .insert([
        {
          name,
          email,
          password, // Remember to hash this in production
          provider: 'local'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Registration error:', error);
      throw error;
    }
    
    req.login(data, (err) => {
      if (err) {
        console.error('Login after registration error:', err);
        throw err;
      }
      res.json({ success: true, user: data });
    });
  } catch (error) {
    console.error('Registration catch error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Regular login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase
      .from('google_users') // Changed from 'loan calculator' to 'users'
      .select('*')
      .eq('email', email)
      .eq('password', password) // In production, compare hashed passwords
      .single();

    if (error || !data) {
      console.error('Login error:', error);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.login(data, (err) => {
      if (err) {
        console.error('Login session error:', err);
        throw err;
      }
      res.json({ success: true, user: data });
    });
  } catch (error) {
    console.error('Login catch error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  (req, res, next) => {
    console.log('Google callback initiated...');
    next();
  },
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:5173/login', 
    session: true,
    failureFlash: false
  }),
  (req, res) => {
    try {
      console.log('Google callback success, user:', req.user?.id);
      console.log('Session:', req.session);
      res.redirect('http://localhost:5173/calculate'); // Fixed redirect URL
    } catch (err) {
      console.error('Callback Error:', err);
      res.status(500).send('Authentication failed: ' + err.message);
    }
  }
);

// Test routes for debugging
app.get('/api/test', async (req, res) => {
  try {
    console.log('Testing Supabase connection...');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
    console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('google_users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Supabase test error details:', JSON.stringify(error, null, 2));
      return res.status(500).json({ error: 'Supabase connection failed', details: error });
    }
    
    // Test insert to see what fails
    const testUser = {
      google_id: 'test_' + Date.now(),
      name: 'Test User',
      email: 'test@example.com',
      provider: 'google'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('google_users')
      .insert([testUser])
      .select()
      .single();
    
    if (insertError) {
      console.error('Test insert error:', JSON.stringify(insertError, null, 2));
      return res.status(500).json({ 
        error: 'Insert test failed', 
        details: insertError,
        testData: testUser 
      });
    }
    
    // Clean up test user
    await supabase
      .from('google_users')
      .delete()
      .eq('id', insertData.id);
    
    res.json({ 
      message: 'Supabase connection and insert test successful', 
      userCount: data?.length || 0,
      testInsertId: insertData.id,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test route error:', JSON.stringify(error, null, 2));
    res.status(500).json({ error: 'Test failed', details: error.message });
  }
});

app.get('/calculate', (req, res) => {
    res.send('Calculate')
})

// Facebook OAuth routes
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    console.log('Facebook callback success, redirecting...');
    res.redirect('http://localhost:5173/calculate'); // Fixed redirect URL
  }
);

// Get current user
app.get('/api/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Logout
app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Protected route example
app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler details:', JSON.stringify(err, null, 2));
  console.error('Global error handler message:', err.message);
  console.error('Global error handler stack:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error', 
    details: err.message,
    code: err.code,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});