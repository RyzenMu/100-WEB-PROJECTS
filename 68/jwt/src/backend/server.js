import express from 'express';
import authRoutes from './routes/auth.js'
import cors from 'cors';
const app = express();

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.listen(5000, ()=>console.log('server started'))

