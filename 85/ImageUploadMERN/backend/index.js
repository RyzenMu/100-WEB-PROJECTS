const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Passport Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const { data: user, error } = await supabase
        .from('users_photo_vault')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        return done(null, false, { message: 'User not found' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Passport Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      const { data: existingUser, error } = await supabase
        .from('users_photo_vault')
        .select('*')
        .eq('email', profile.emails[0].value)
        .single();

      if (existingUser) {
        return done(null, existingUser);
      }

      // Create new user
      const { data: newUser, error: insertError } = await supabase
        .from('users_photo_vault')
        .insert([
          {
            name: profile.displayName,
            email: profile.emails[0].value,
            google_id: profile.id,
            password: null // No password for Google users
          }
        ])
        .select()
        .single();

      if (insertError) {
        return done(insertError);
      }

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));

// Passport serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from('users_photo_vault')
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
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
};

// Routes

// Register route
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users_photo_vault')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: newUser, error } = await supabase
      .from('users_photo_vault')
      .insert([
        {
          name,
          email,
          password: hashedPassword
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Log the user in
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed after registration' });
      }
      res.json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: { id: req.user.id, name: req.user.name, email: req.user.email } });
});

// Google Auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    res.redirect('http://localhost:5173/photos');
  }
);

// Logout route
app.post('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: { id: req.user.id, name: req.user.name, email: req.user.email } });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Upload photo route
app.post('/api/upload', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { folder } = req.body;
    const userId = req.user.id;
    const fileName = `${userId}/${folder || 'default'}/${Date.now()}_${req.file.originalname}`;

    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('proteinPhotos')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (uploadError) {
      return res.status(400).json({ error: uploadError.message });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('proteinPhotos')
      .getPublicUrl(fileName);

    // Save photo metadata to database
    const { data: photoData, error: dbError } = await supabase
      .from('photos_vault')
      .insert([
        {
          user_id: userId,
          filename: req.file.originalname,
          storage_path: fileName,
          folder: folder || 'default',
          url: publicUrl,
          size: req.file.size,
          mimetype: req.file.mimetype
        }
      ])
      .select()
      .single();

    if (dbError) {
      return res.status(400).json({ error: dbError.message });
    }

    res.json({ photo: photoData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user photos
app.get('/api/photos', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { folder } = req.query;

    let query = supabase
      .from('photos_vault')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (folder) {
      query = query.eq('folder', folder);
    }

    const { data: photos, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ photos });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete photo
app.delete('/api/photos/:id', requireAuth, async (req, res) => {
  try {
    const photoId = req.params.id;
    const userId = req.user.id;

    // Get photo details
    const { data: photo, error: fetchError } = await supabase
      .from('photos_vault')
      .select('*')
      .eq('id', photoId)
      .eq('user_id', userId)
      .single();

    if (fetchError || !photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('proteinPhotos')
      .remove([photo.storage_path]);

    if (storageError) {
      console.warn('Storage deletion failed:', storageError.message);
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('photos_vault')
      .delete()
      .eq('id', photoId)
      .eq('user_id', userId);

    if (dbError) {
      return res.status(400).json({ error: dbError.message });
    }

    res.json({ message: 'Photo deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get folders
app.get('/api/folders', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: folders, error } = await supabase
      .from('photos_vault')
      .select('folder')
      .eq('user_id', userId)
      .order('folder');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get unique folders
    const uniqueFolders = [...new Set(folders.map(f => f.folder))];

    res.json({ folders: uniqueFolders });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});