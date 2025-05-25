
// create a mongo connection

import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected to mongo db")
    } catch (error) {
        console.error("Mongodb connection failed", error);
    }
}

connectDB();

// user Schema
const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    password1 : {type: String, required: true},
    password2 : {type: String, required: true},
});

const User = mongoose.model("User", userSchema);

// Define a simple API endpoint
app.post("/api/register", async (req, res) => {
    try {
        const {username, password1, password2} = req.body;
        if (password1 != password2) {
            return res.status(400).json({error: "passwords do not match"})
        }

        // check if username already exists
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({error: "user name alreaddy exists"});
        }

        // Save user to MongoDb
        const newUser = new User({username, password1: password1, password2: password2});
        await newUser.save();

        res.status(201).json({message : "User registered successfully"})
    
    } catch (error) {
        res.status(500).json({error : "internal server error"});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("server running on port ", PORT));