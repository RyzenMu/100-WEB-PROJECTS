const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_j6z9qAIJNWpM@ep-square-smoke-a14inpk7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
});

// Create table if it doesn't exist
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dentalkart_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log('✅ Database table initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
}

// Routes
app.post('/register', async (req, res) => {
  console.log('➡️ Incoming request: POST /register');
  const { name, email, password } = req.body;
  console.log('📩 Received user:', { name, email, password: '***' });

  try {
    const result = await pool.query(
      'INSERT INTO dentalkart_users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, password]
    );
    
    console.log('✅ User inserted into DB:', email);
    res.status(201).send('User registered successfully!');
  } catch (error) {
    console.error('❌ Registration error:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      res.status(400).send('Email already exists');
    } else {
      res.status(500).send('Internal server error');
    }
  }
});

app.post('/login', async (req, res) => {
  console.log('➡️ Incoming request: POST /login');
  const { email, password } = req.body;
  console.log('📩 Login attempt:', email);

  try {
    const result = await pool.query(
      'SELECT id, name FROM dentalkart_users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      console.log('✅ Login success:', email);
      res.send('Login successful!');
    } else {
      console.log('❌ Login failed:', email);
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/users', async (req, res) => {
  console.log('➡️ Incoming request: GET /users');

  try {
    const result = await pool.query('SELECT id, name, email FROM dentalkart_users');
    console.log(`✅ Returning ${result.rows.length} users`);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Get users error:', error);
    res.status(500).send('Internal server error');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);