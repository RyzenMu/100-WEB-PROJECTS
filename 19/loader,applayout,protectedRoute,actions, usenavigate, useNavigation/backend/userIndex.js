require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI_USER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const userModel = mongoose.model("users", userSchema);

//API route to register new user
app.post("/signup", async function (req, res) {
  const userName = req.body.userName;
  const password = req.body.password;
  const retypePassword = req.body.retypePassword;
  if (!userName || !password || !retypePassword) {
    return res.status(400).json({ message: "please fill all the fields" });
  }
  try {
    if (password === retypePassword) {
      const newUser = new userModel({
        name: userName,
        password,
      });
      await newUser.save();
      res.status(201).json({ message: "user created" });
    } else {
      res.status(400).json({ message: "passwords does not match" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
