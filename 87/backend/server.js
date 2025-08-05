// server.js - Node.js Express Backend with Authentication
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React dev servers
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        console.log('Attempting login for:', email);
        
        // Find user in Supabase
        const { data: user, error } = await supabase
            .from('linkedin_user')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            console.log('User not found:', error);
            return done(null, false, { message: 'Invalid email or password' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            console.log('Invalid password for user:', email);
            return done(null, false, { message: 'Invalid email or password' });
        }

        console.log('Login successful for:', email);
        return done(null, user);
    } catch (error) {
        console.error('Login error:', error);
        return done(error);
    }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user exists
        const { data: existingUser, error: findError } = await supabase
            .from('linkedin_user')
            .select('*')
            .eq('email', profile.emails[0].value)
            .single();

        if (existingUser) {
            return done(null, existingUser);
        }

        // Create new user
        const { data: newUser, error: createError } = await supabase
            .from('linkedin_user')
            .insert([{
                username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
                email: profile.emails[0].value,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                profile_picture_url: profile.photos[0].value,
                oauth_provider: 'google',
                oauth_id: profile.id,
                is_email_verified: true
            }])
            .select()
            .single();

        if (createError) {
            console.error('Error creating Google user:', createError);
            return done(createError);
        }

        return done(null, newUser);
    } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error);
    }
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID || 'dummy_facebook_id',
  clientSecret: process.env.FACEBOOK_APP_SECRET || 'dummy_facebook_secret',
  callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
  // OAuth logic
}));
// Passport serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { data: user, error } = await supabase
            .from('linkedin_user')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return done(error);
        }
        
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'LinkedIn Clone API is running' });
});

// Register endpoint
// Register endpoint (corrected)
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body; // Added firstName, lastName
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('linkedin_user')
      .select('id')
      .or(`email.eq.${email},username.eq.${username}`)
      .single();
      
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email or username' });
    }
    
    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const { data: newUser, error } = await supabase
      .from('linkedin_user')
      .insert([{
        username,
        email,
        password_hash: passwordHash,
        first_name: firstName || '',
        last_name: lastName || '',
        is_email_verified: false
      }])
      .select('id, username, email, first_name, last_name, created_at')
      .single();
      
    if (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ message: 'Registration failed' });
    }
    
    res.status(201).json({
      message: 'Registration successful',
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        if (!user) {
            return res.status(401).json({ message: info.message || 'Login failed' });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('Session error:', err);
                return res.status(500).json({ message: 'Session creation failed' });
            }

            // Remove password hash from response
            const userResponse = { ...user };
            delete userResponse.password_hash;

            res.json({
                message: 'Login successful',
                user: userResponse
            });
        });
    })(req, res, next);
});

app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Session cleanup failed' });
      }
      res.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      res.json({ message: 'Logout successful' });
    });
  });
});

// Get current user
app.get('/api/user', isAuthenticated, (req, res) => {
    const userResponse = { ...req.user };
    delete userResponse.password_hash;
    res.json({ user: userResponse });
});

// Get all jobs (protected route)
app.get('/api/jobs', isAuthenticated, async (req, res) => {
    try {
        const { data: jobs, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Jobs fetch error:', error);
            return res.status(500).json({ message: 'Failed to fetch jobs' });
        }

        res.json({ jobs });
    } catch (error) {
        console.error('Jobs API error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Apply for a job
app.post('/api/jobs/:jobId/apply', isAuthenticated, async (req, res) => {
    try {
        const { jobId } = req.params;
        const { coverLetter, resumeUrl } = req.body;
        const userId = req.user.id;

        // Check if job exists
        const { data: job, error: jobError } = await supabase
            .from('jobs')
            .select('id')
            .eq('id', jobId)
            .eq('is_active', true)
            .single();

        if (jobError || !job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if already applied
        const { data: existingApplication } = await supabase
            .from('job_applications')
            .select('id')
            .eq('job_id', jobId)
            .eq('user_id', userId)
            .single();

        if (existingApplication) {
            return res.status(409).json({ message: 'You have already applied for this job' });
        }

        // Create application
        const { data: application, error } = await supabase
            .from('job_applications')
            .insert([{
                job_id: jobId,
                user_id: userId,
                cover_letter: coverLetter || '',
                resume_url: resumeUrl || '',
                status: 'applied'
            }])
            .select()
            .single();

        if (error) {
            console.error('Application error:', error);
            return res.status(500).json({ message: 'Failed to submit application' });
        }

        res.status(201).json({
            message: 'Application submitted successfully',
            application
        });

    } catch (error) {
        console.error('Job application error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user's job applications
app.get('/api/user/applications', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;

        const { data: applications, error } = await supabase
            .from('job_applications')
            .select(`
                *,
                jobs (
                    company_name,
                    role_title,
                    location,
                    salary_range
                )
            `)
            .eq('user_id', userId)
            .order('applied_at', { ascending: false });

        if (error) {
            console.error('Applications fetch error:', error);
            return res.status(500).json({ message: 'Failed to fetch applications' });
        }

        res.json({ applications });
    } catch (error) {
        console.error('User applications error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user profile
app.put('/api/user/profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            first_name,
            last_name,
            bio,
            location,
            skills,
            experience_years,
            github_url,
            linkedin_url,
            portfolio_url
        } = req.body;

        const { data: updatedUser, error } = await supabase
            .from('linkedin_user')
            .update({
                first_name,
                last_name,
                bio,
                location,
                skills,
                experience_years,
                github_url,
                linkedin_url,
                portfolio_url
            })
            .eq('id', userId)
            .select('id, username, email, first_name, last_name, bio, location, skills, experience_years, github_url, linkedin_url, portfolio_url')
            .single();

        if (error) {
            console.error('Profile update error:', error);
            return res.status(500).json({ message: 'Failed to update profile' });
        }

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login?error=oauth_failed' }),
  (req, res) => {
    // Successful authentication
    // You might want to generate a JWT token here and pass it to the frontend
    
    // Option 1: Redirect with success parameter
    res.redirect('http://localhost:5173/jobs');
    
    // Option 2: If you want to redirect to a specific jobs page
    // res.redirect('http://localhost:5173/jobs?oauth_success=true');
    
    // Option 3: Generate JWT and redirect with token (recommended for production)
    // const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET);
    // res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

// Facebook OAuth routes
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect to frontend
        res.redirect('http://localhost:5173/jobs'); // Adjust URL as needed
    }
);

// Search jobs endpoint
app.get('/api/jobs/search', isAuthenticated, async (req, res) => {
    try {
        const { q, skills, location, experience } = req.query;
        
        let query = supabase
            .from('jobs')
            .select('*')
            .eq('is_active', true);

        // Add search filters
        if (q) {
            query = query.or(`role_title.ilike.%${q}%,company_name.ilike.%${q}%`);
        }
        
        if (location) {
            query = query.ilike('location', `%${location}%`);
        }
        
        if (skills) {
            query = query.contains('required_skills', [skills]);
        }
        
        if (experience) {
            query = query.ilike('experience_required', `%${experience}%`);
        }

        const { data: jobs, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error('Job search error:', error);
            return res.status(500).json({ message: 'Search failed' });
        }

        res.json({ jobs });
    } catch (error) {
        console.error('Job search error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 LinkedIn Clone Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Make sure to set up your environment variables:`);
    console.log(`   - SUPABASE_URL`);
    console.log(`   - SUPABASE_ANON_KEY`);
    console.log(`   - SESSION_SECRET`);
    console.log(`   - GOOGLE_CLIENT_ID (optional)`);
    console.log(`   - GOOGLE_CLIENT_SECRET (optional)`);
    console.log(`   - FACEBOOK_APP_ID (optional)`);
    console.log(`   - FACEBOOK_APP_SECRET (optional)`);
});

module.exports = app;