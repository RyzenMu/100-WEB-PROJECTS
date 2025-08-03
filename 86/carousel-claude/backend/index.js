const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const multer = require('multer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173', // React app URL
  credentials: true // Allow cookies to be sent
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

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure multer for file uploads (store in memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Passport Local Strategy Configuration
// Passport Local Strategy Configuration
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Use email instead of username
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      console.log('Attempting login for email:', email); // Debug log
      
      // Find user in Supabase database - FIXED: Using carousel_users table
      const { data: user, error } = await supabase
        .from('carousel_users') // Changed from 'users' to 'carousel_users'
        .select('*')
        .eq('email', email)
        .single();

      console.log('Database query result:', { user, error }); // Debug log

      if (error || !user) {
        console.log('User not found or database error'); // Debug log
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Compare provided password with hashed password
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('Password validation result:', isValidPassword); // Debug log
      
      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Return user object without password
      const { password: _, ...userWithoutPassword } = user;
      return done(null, userWithoutPassword);
    } catch (error) {
      console.error('Passport strategy error:', error); // Debug log
      return done(error);
    }
  }
));

// Serialize user for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session - FIXED: Using carousel_users table
passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from('carousel_users') // Changed from 'users' to 'carousel_users'
      .select('id, email, created_at')
      .eq('id', id)
      .single();

    if (error) {
      return done(error, null);
    }

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Authentication required' });
};

// Routes

// Register route
app.post('/api/register', async (req, res) => {
  // Set JSON content type
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('carousel_users') // Updated table name
      .select('id')
      .eq('email', email)
      .single();
    
    // Handle the check error - PGRST116 means no rows found, which is expected for new users
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing user:', checkError);
      return res.status(500).json({ message: 'Failed to check existing user' });
    }
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user in Supabase
    const { data: newUser, error } = await supabase
      .from('carousel_users') // Updated table name
      .insert([
        {
          email: email,
          password: hashedPassword,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select('id, email, created_at')
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      // Handle unique constraint violation
      if (error.code === '23505') {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      return res.status(500).json({ message: 'Failed to create user' });
    }
    
    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      redirect: 'http://localhost:5173/login'
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Login route
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }
    // Log in the user
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      res.json({
        message: 'Login successful',
        user: user,
        redirect: 'http://localhost:5173/upload'
      });
    });
  })(req, res, next);
});

// Logout route
app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Session destruction failed' });
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({ message: 'Logout successful' });
    });
  });
});

// Get current user route
app.get('/api/user', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// Upload photo route
app.post('/api/photos/upload', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const userId = req.user.id;
    const fileName = `${userId}/${Date.now()}-${file.originalname}`;

    // Upload file to Supabase storage bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('couselphotos')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return res.status(500).json({ message: 'Failed to upload photo' });
    }

    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('couselphotos')
      .getPublicUrl(fileName);

    // Save photo metadata to database
    const { data: photoData, error: dbError } = await supabase
      .from('photos')
      .insert([
        {
          user_id: userId,
          filename: fileName,
          original_name: file.originalname,
          url: urlData.publicUrl,
          size: file.size,
          mimetype: file.mimetype
        }
      ])
      .select('*')
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Try to delete the uploaded file since DB insert failed
      await supabase.storage.from('couselphotos').remove([fileName]);
      return res.status(500).json({ message: 'Failed to save photo metadata' });
    }

    res.status(201).json({
      message: 'Photo uploaded successfully',
      photo: photoData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's photos route
app.get('/api/photos', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user's photos from database
    const { data: photos, error } = await supabase
      .from('photos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Failed to fetch photos' });
    }

    res.json({ photos: photos || [] });
  } catch (error) {
    console.error('Fetch photos error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete photo route
app.delete('/api/photos/:id', requireAuth, async (req, res) => {
  try {
    const photoId = req.params.id;
    const userId = req.user.id;

    // First, get the photo details to ensure it belongs to the user
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('*')
      .eq('id', photoId)
      .eq('user_id', userId)
      .single();

    if (fetchError || !photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    // Delete file from Supabase storage
    const { error: storageError } = await supabase.storage
      .from('couselphotos')
      .remove([photo.filename]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
      // Continue with database deletion even if storage deletion fails
    }

    // Delete photo record from database
    const { error: deleteError } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId)
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Database deletion error:', deleteError);
      return res.status(500).json({ message: 'Failed to delete photo' });
    }

    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;