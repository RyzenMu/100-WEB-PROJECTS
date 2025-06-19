import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authenticate from '../middleware/authenticate.js';
import users from '../users.js';

const router = express.Router();
const JWT_SECRET = 'thbt';

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const existing = users.find((u) => u.username === username); 

    if(existing) return res.status(400).json({msg: "user already exists"});

    const hashed = await bcrypt.hash(password, 10)    ;

    users.push({username, password:hashed});

    res.json({msg: "Registered successfully"});
})

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const user = users.find((u)=> u.username === username);
    if (!user) return res.status(400).json({msg: 'invalid credentials'});

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).json({msg: 'invalid credentials'});

    const token = jwt.sign({username}, JWT_SECRET, {expiresIn: '15m'});
    res.json({token});
})

router.get('/profile', authenticate, (req, res)=> {
    res.json({msg:`Hello ${req.user.username} , welcome to your profile`}, )
})

export default router;

